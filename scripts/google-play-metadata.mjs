#!/usr/bin/env node

/**
 * Google Play Store Listing Metadata Uploader
 *
 * Reads fastlane/metadata/android/{locale}/ files and uploads them to
 * Google Play via the Android Publisher API v3.
 *
 * Reuses service account JWT auth from google-play-publish.mjs.
 *
 * Prerequisites:
 *   1. Service account key at ~/.config/xaiworkspace/xaiworkspace-c7e88e486380.json
 *   2. Feature graphic + icon generated: node scripts/generate-feature-graphic.mjs
 *
 * Usage:
 *   node scripts/google-play-metadata.mjs                # Upload listings + images
 *   node scripts/google-play-metadata.mjs --listings     # Upload listings only
 *   node scripts/google-play-metadata.mjs --images       # Upload images only
 *   node scripts/google-play-metadata.mjs --dry-run      # Show what would be uploaded
 */

import { createSign } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { homedir } from 'node:os';

// ── Config ──────────────────────────────────────────────────────────────────

const PACKAGE_NAME = 'com.xshopper.xaiworkspace';
const PROJECT_ROOT = resolve(import.meta.dirname, '..');
const METADATA_DIR = join(PROJECT_ROOT, 'fastlane/metadata/android');
const SERVICE_ACCOUNT_PATH = join(homedir(), '.config', 'xaiworkspace', 'xaiworkspace-c7e88e486380.json');
const SCOPE = 'https://www.googleapis.com/auth/androidpublisher';
const API_BASE = 'https://androidpublisher.googleapis.com/androidpublisher/v3/applications';

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const LISTINGS_ONLY = args.includes('--listings');
const IMAGES_ONLY = args.includes('--images');
const UPLOAD_LISTINGS = !IMAGES_ONLY;
const UPLOAD_IMAGES = !LISTINGS_ONLY;

// ── Helpers ─────────────────────────────────────────────────────────────────

function log(msg) { console.log(`[metadata] ${msg}`); }
function die(msg) { console.error(`\n[ERROR] ${msg}\n`); process.exit(1); }

function base64url(data) {
  return Buffer.from(data).toString('base64url');
}

// ── Service Account JWT Auth ────────────────────────────────────────────────

async function getAccessToken() {
  if (!existsSync(SERVICE_ACCOUNT_PATH)) {
    die(`Service account key not found at ${SERVICE_ACCOUNT_PATH}`);
  }

  const sa = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, 'utf-8'));
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = base64url(JSON.stringify({
    iss: sa.client_email,
    scope: SCOPE,
    aud: sa.token_uri,
    iat: now,
    exp: now + 3600,
  }));

  const sign = createSign('RSA-SHA256');
  sign.update(`${header}.${payload}`);
  const signature = sign.sign(sa.private_key, 'base64url');
  const jwt = `${header}.${payload}.${signature}`;

  const res = await fetch(sa.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    die(`Token exchange failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.access_token;
}

// ── Read Metadata ───────────────────────────────────────────────────────────

function readLocaleFile(locale, filename) {
  const filepath = join(METADATA_DIR, locale, filename);
  if (!existsSync(filepath)) return null;
  return readFileSync(filepath, 'utf-8').trim();
}

function getLocales() {
  return readdirSync(METADATA_DIR).filter((entry) => {
    const fullPath = join(METADATA_DIR, entry);
    return statSync(fullPath).isDirectory() && existsSync(join(fullPath, 'title.txt'));
  });
}

// Image type mapping for Google Play API
const IMAGE_TYPE_MAP = {
  'featureGraphic.png': 'featureGraphic',
  'icon.png': 'icon',
  'phoneScreenshots': 'phoneScreenshots',
  'sevenInchScreenshots': 'sevenInchScreenshots',
  'tenInchScreenshots': 'tenInchScreenshots',
  'tvBanner.png': 'tvBanner',
  'tvScreenshots': 'tvScreenshots',
  'wearScreenshots': 'wearScreenshots',
};

// ── API Calls ───────────────────────────────────────────────────────────────

async function createEdit(headers) {
  const res = await fetch(`${API_BASE}/${PACKAGE_NAME}/edits`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  if (!res.ok) {
    const text = await res.text();
    die(`Failed to create edit: ${res.status} ${text}`);
  }
  const edit = await res.json();
  return edit.id;
}

async function uploadListing(headers, editId, locale) {
  const title = readLocaleFile(locale, 'title.txt');
  const shortDesc = readLocaleFile(locale, 'short_description.txt');
  const fullDesc = readLocaleFile(locale, 'full_description.txt');

  if (!title) {
    log(`  Skipping ${locale} — no title.txt`);
    return false;
  }

  const body = {};
  if (title) body.title = title;
  if (shortDesc) body.shortDescription = shortDesc;
  if (fullDesc) body.fullDescription = fullDesc;

  if (DRY_RUN) {
    log(`  [dry-run] Would upload listing for ${locale}: title="${title}", short=${shortDesc?.length || 0} chars, full=${fullDesc?.length || 0} chars`);
    return true;
  }

  const res = await fetch(
    `${API_BASE}/${PACKAGE_NAME}/edits/${editId}/listings/${locale}`,
    {
      method: 'PUT',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    log(`  WARNING: Listing upload failed for ${locale}: ${res.status} ${text}`);
    return false;
  }

  log(`  Uploaded listing for ${locale}`);
  return true;
}

async function uploadImage(headers, editId, locale, imageType, imagePath) {
  const imageData = readFileSync(imagePath);

  if (DRY_RUN) {
    const size = (imageData.length / 1024).toFixed(0);
    log(`  [dry-run] Would upload ${imageType} for ${locale} (${size} KB)`);
    return true;
  }

  // Delete existing images of this type first
  await fetch(
    `${API_BASE}/${PACKAGE_NAME}/edits/${editId}/listings/${locale}/images/${imageType}`,
    { method: 'DELETE', headers },
  );

  const res = await fetch(
    `https://androidpublisher.googleapis.com/upload/androidpublisher/v3/applications/${PACKAGE_NAME}/edits/${editId}/listings/${locale}/images/${imageType}?uploadType=media`,
    {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'image/png',
        'Content-Length': String(imageData.length),
      },
      body: imageData,
    },
  );

  if (!res.ok) {
    const text = await res.text();
    log(`  WARNING: Image upload failed for ${locale}/${imageType}: ${res.status} ${text}`);
    return false;
  }

  log(`  Uploaded ${imageType} for ${locale}`);
  return true;
}

async function commitEdit(headers, editId) {
  const res = await fetch(`${API_BASE}/${PACKAGE_NAME}/edits/${editId}:commit`, {
    method: 'POST',
    headers,
  });
  if (!res.ok) {
    const text = await res.text();
    die(`Commit failed: ${res.status} ${text}`);
  }
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  log('Google Play Store Listing Metadata Uploader');
  log(`Package: ${PACKAGE_NAME}`);
  log(`Metadata dir: ${METADATA_DIR}`);
  if (DRY_RUN) log('DRY RUN — no changes will be made');
  log('');

  const locales = getLocales();
  log(`Found ${locales.length} locales: ${locales.join(', ')}`);

  // Authenticate (skip for dry-run)
  let headers = {};
  let editId = null;

  if (!DRY_RUN) {
    log('\nAuthenticating via service account...');
    const accessToken = await getAccessToken();
    headers = { Authorization: `Bearer ${accessToken}` };

    log('Creating edit...');
    editId = await createEdit(headers);
    log(`Edit created: ${editId}`);
  }

  let successCount = 0;
  let failCount = 0;

  // Upload listings
  if (UPLOAD_LISTINGS) {
    log('\n── Uploading store listings ──');
    for (const locale of locales) {
      const ok = await uploadListing(headers, editId, locale);
      if (ok) successCount++; else failCount++;
    }
  }

  // Upload images (only en-US has images currently)
  if (UPLOAD_IMAGES) {
    log('\n── Uploading images ──');
    for (const locale of locales) {
      const imagesDir = join(METADATA_DIR, locale, 'images');
      if (!existsSync(imagesDir)) continue;

      const files = readdirSync(imagesDir).filter((f) => f.endsWith('.png'));
      for (const file of files) {
        const imageType = IMAGE_TYPE_MAP[file];
        if (!imageType) {
          log(`  Skipping unknown image type: ${file}`);
          continue;
        }
        const ok = await uploadImage(headers, editId, locale, imageType, join(imagesDir, file));
        if (ok) successCount++; else failCount++;
      }
    }
  }

  // Commit
  if (!DRY_RUN && editId) {
    log('\nCommitting edit...');
    await commitEdit(headers, editId);
    log('Edit committed successfully!');
  }

  log(`\nDone! ${successCount} uploads succeeded, ${failCount} failed.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
