#!/usr/bin/env node

/**
 * Generate Google Play Feature Graphic (1024x500) and Store Icon (512x512)
 *
 * Uses `sharp` to create:
 *   - Feature graphic: blue gradient with X logo and text
 *   - Store icon: resized from public/icon-1024.png
 *
 * Usage:
 *   npm install sharp  # one-time
 *   node scripts/generate-feature-graphic.mjs
 */

import { resolve, join } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';

const PROJECT_ROOT = resolve(import.meta.dirname, '..');
const IMAGES_DIR = join(PROJECT_ROOT, 'fastlane/metadata/android/en-US/images');
const ICON_SOURCE = join(PROJECT_ROOT, 'public/icon-1024.png');

async function main() {
  // Dynamic import so the script fails gracefully if sharp isn't installed
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.error('Error: sharp is not installed. Run: npm install --save-dev sharp');
    process.exit(1);
  }

  if (!existsSync(IMAGES_DIR)) {
    mkdirSync(IMAGES_DIR, { recursive: true });
  }

  // ── Feature Graphic (1024x500) ──────────────────────────────────────────

  console.log('Generating feature graphic (1024x500)...');

  // Create SVG with gradient background, X logo, and text
  const svg = `
  <svg width="1024" height="500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#2D7AB8;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1B5A8E;stop-opacity:1" />
      </linearGradient>
    </defs>

    <!-- Background gradient -->
    <rect width="1024" height="500" fill="url(#bg)" />

    <!-- Subtle grid pattern for depth -->
    <g opacity="0.05">
      ${Array.from({ length: 20 }, (_, i) =>
        `<line x1="${i * 55}" y1="0" x2="${i * 55}" y2="500" stroke="white" stroke-width="1"/>`
      ).join('\n')}
      ${Array.from({ length: 10 }, (_, i) =>
        `<line x1="0" y1="${i * 55}" x2="1024" y2="${i * 55}" stroke="white" stroke-width="1"/>`
      ).join('\n')}
    </g>

    <!-- X logo mark (left side) -->
    <g transform="translate(180, 130)">
      <text font-family="Arial, Helvetica, sans-serif" font-size="220" font-weight="bold" fill="white" opacity="0.15">X</text>
    </g>

    <!-- Main text (right side) -->
    <text x="520" y="210" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="bold" fill="white" text-anchor="middle">
      xAI Workspace
    </text>

    <!-- Tagline -->
    <text x="520" y="270" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="white" opacity="0.9" text-anchor="middle">
      Multi-Model AI Platform for Business
    </text>

    <!-- Model badges -->
    <g transform="translate(280, 310)">
      <rect x="0" y="0" width="100" height="36" rx="18" fill="white" opacity="0.2"/>
      <text x="50" y="24" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="white" text-anchor="middle">Claude</text>

      <rect x="115" y="0" width="100" height="36" rx="18" fill="white" opacity="0.2"/>
      <text x="165" y="24" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="white" text-anchor="middle">GPT-4o</text>

      <rect x="230" y="0" width="100" height="36" rx="18" fill="white" opacity="0.2"/>
      <text x="280" y="24" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="white" text-anchor="middle">Gemini</text>

      <rect x="345" y="0" width="100" height="36" rx="18" fill="white" opacity="0.2"/>
      <text x="395" y="24" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="white" text-anchor="middle">20+ more</text>
    </g>

    <!-- Bottom accent line -->
    <rect x="0" y="490" width="1024" height="10" fill="white" opacity="0.1"/>
  </svg>`;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(IMAGES_DIR, 'featureGraphic.png'));

  console.log(`  ✓ ${join(IMAGES_DIR, 'featureGraphic.png')}`);

  // ── Store Icon (512x512) ──────────────────────────────────────────────

  console.log('Generating store icon (512x512)...');

  if (!existsSync(ICON_SOURCE)) {
    console.error(`  ✗ Source icon not found: ${ICON_SOURCE}`);
    process.exit(1);
  }

  await sharp(ICON_SOURCE)
    .resize(512, 512, { fit: 'cover' })
    .png()
    .toFile(join(IMAGES_DIR, 'icon.png'));

  console.log(`  ✓ ${join(IMAGES_DIR, 'icon.png')}`);

  console.log('\nDone! Graphics saved to fastlane/metadata/android/en-US/images/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
