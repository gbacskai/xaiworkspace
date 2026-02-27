#!/usr/bin/env node

/**
 * AWS Device Farm iOS Test Runner
 *
 * Builds an unsigned IPA, uploads to Device Farm, and schedules a test run
 * on real iOS devices.
 *
 * Prerequisites:
 *   1. AWS CLI configured with profile aws_amplify_docflow4
 *   2. Device Farm permissions (run scripts/device-farm-iam-setup.sh)
 *   3. Xcode + xcodebuild CLI tools
 *
 * Usage:
 *   node scripts/device-farm-ios.mjs                 # Build + upload + run fuzz test
 *   node scripts/device-farm-ios.mjs --upload-only   # Upload IPA without running tests
 *   node scripts/device-farm-ios.mjs --skip-build    # Use existing IPA
 *   node scripts/device-farm-ios.mjs --status <arn>  # Check status of a run
 *   node scripts/device-farm-ios.mjs --list-runs     # List recent test runs
 *   node scripts/device-farm-ios.mjs --list-pools    # List available device pools
 */

import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { mkdirSync } from 'node:fs';

// ── Config ──────────────────────────────────────────────────────────────────

const PROJECT_ARN = 'arn:aws:devicefarm:us-west-2:695829630004:project:34d45d4e-2bd1-4a07-b217-e8796c1b4802';
const AWS_PROFILE = 'aws_amplify_docflow4';
const AWS_REGION = 'us-west-2';
const PROJECT_ROOT = resolve(import.meta.dirname, '..');
const IOS_DIR = join(PROJECT_ROOT, 'ios');
const IPA_PATH = join(IOS_DIR, 'App/build/xAIWorkspace.ipa');

// Derived data and build products paths
const DERIVED_DATA_PATH = join(IOS_DIR, 'App/build/derived');
const APP_PRODUCT_PATH = join(DERIVED_DATA_PATH, 'Build/Products/Debug-iphoneos/App.app');

// Default test device pool: iOS 16+ devices
const DEFAULT_DEVICE_POOL_NAME = 'xAIWorkspace-iOS-TestDevices';

// ── Helpers ─────────────────────────────────────────────────────────────────

function log(msg) { console.log(`[device-farm-ios] ${msg}`); }
function die(msg) { console.error(`\n[ERROR] ${msg}\n`); process.exit(1); }

function aws(command) {
  const fullCmd = `aws ${command} --profile ${AWS_PROFILE} --region ${AWS_REGION} --output json`;
  try {
    const result = execSync(fullCmd, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
    return JSON.parse(result);
  } catch (err) {
    const stderr = err.stderr?.toString() || '';
    if (stderr.includes('UnrecognizedClientException') || stderr.includes('AccessDeniedException')) {
      die(`AWS auth failed. Check profile "${AWS_PROFILE}" and Device Farm permissions.\n${stderr}`);
    }
    throw err;
  }
}

function awsRaw(command) {
  const fullCmd = `aws ${command} --profile ${AWS_PROFILE} --region ${AWS_REGION}`;
  return execSync(fullCmd, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
}

function run(cmd, opts = {}) {
  console.log(`\n→ ${cmd}\n`);
  return execSync(cmd, { stdio: 'inherit', cwd: PROJECT_ROOT, ...opts });
}

// ── Find or Build App ───────────────────────────────────────────────────────

function findExistingArtifact() {
  if (existsSync(IPA_PATH)) return { path: IPA_PATH, type: 'IOS_APP', name: 'xAIWorkspace.ipa' };
  return null;
}

function buildIpa() {
  log('Building Angular app for production...');
  run('npx ng build --configuration production');

  log('Syncing Capacitor...');
  run('npx cap sync ios');

  log('Building unsigned iOS app for Device Farm...');

  // Build the .app using xcodebuild (unsigned — Device Farm handles signing)
  run(
    `xcodebuild build ` +
    `-project ios/App/App.xcodeproj ` +
    `-scheme App ` +
    `-configuration Debug ` +
    `-sdk iphoneos ` +
    `-derivedDataPath "${DERIVED_DATA_PATH}" ` +
    `CODE_SIGN_IDENTITY="-" ` +
    `CODE_SIGNING_REQUIRED=NO ` +
    `CODE_SIGNING_ALLOWED=NO`
  );

  if (!existsSync(APP_PRODUCT_PATH)) {
    die(`App bundle not found at ${APP_PRODUCT_PATH}. Check the xcodebuild output.`);
  }

  log('Packaging .app into unsigned IPA...');

  // Create Payload directory structure and zip as .ipa
  const buildDir = join(IOS_DIR, 'App/build');
  const payloadDir = join(buildDir, 'Payload');

  // Clean up previous Payload directory if it exists
  if (existsSync(payloadDir)) {
    run(`rm -rf "${payloadDir}"`);
  }

  mkdirSync(payloadDir, { recursive: true });

  // Copy the .app bundle into Payload/
  run(`cp -R "${APP_PRODUCT_PATH}" "${payloadDir}/"`);

  // Remove old IPA if it exists
  if (existsSync(IPA_PATH)) {
    unlinkSync(IPA_PATH);
  }

  // Zip the Payload directory as .ipa
  run(`cd "${buildDir}" && zip -r -y "${IPA_PATH}" Payload/`);

  // Clean up Payload directory
  run(`rm -rf "${payloadDir}"`);

  if (!existsSync(IPA_PATH)) {
    die(`IPA not found at ${IPA_PATH}. Packaging failed.`);
  }

  const size = (readFileSync(IPA_PATH).length / 1024 / 1024).toFixed(1);
  log(`IPA built: ${IPA_PATH} (${size} MB)`);
  return { path: IPA_PATH, type: 'IOS_APP', name: 'xAIWorkspace.ipa' };
}

// ── Upload to Device Farm ───────────────────────────────────────────────────

function uploadIpa({ path: ipaPath, type, name }) {
  log(`Creating upload in Device Farm (${name})...`);

  const upload = aws(
    `devicefarm create-upload --project-arn "${PROJECT_ARN}" --name "${name}" --type ${type}`
  );

  const uploadArn = upload.upload.arn;
  const presignedUrl = upload.upload.url;

  log(`Upload ARN: ${uploadArn}`);
  log('Uploading IPA to Device Farm...');

  // Use curl for presigned URL upload (aws cli doesn't handle this directly)
  execSync(`curl -sS -T "${ipaPath}" "${presignedUrl}"`, { stdio: 'inherit' });

  // Poll until upload processing completes
  log('Waiting for upload processing...');
  let status = 'PROCESSING';
  while (status === 'INITIALIZED' || status === 'PROCESSING') {
    const check = aws(`devicefarm get-upload --arn "${uploadArn}"`);
    status = check.upload.status;
    if (status === 'FAILED') {
      die(`Upload processing failed: ${check.upload.message || 'unknown error'}`);
    }
    if (status !== 'SUCCEEDED') {
      execSync('sleep 3');
    }
  }

  log('Upload processed successfully!');
  return uploadArn;
}

// ── Device Pool ─────────────────────────────────────────────────────────────

function getOrCreateDevicePool() {
  // Check for existing pools
  const pools = aws(`devicefarm list-device-pools --arn "${PROJECT_ARN}" --type PRIVATE`);

  const existing = pools.devicePools?.find((p) => p.name === DEFAULT_DEVICE_POOL_NAME);
  if (existing) {
    log(`Using existing device pool: ${existing.name} (${existing.arn})`);
    return existing.arn;
  }

  // Create a device pool: iOS 16+ devices
  log(`Creating device pool: ${DEFAULT_DEVICE_POOL_NAME}...`);

  // Write rules to temp file to avoid shell quoting issues with nested JSON strings
  const rules = [
    { attribute: 'PLATFORM', operator: 'EQUALS', value: '"IOS"' },
    { attribute: 'OS_VERSION', operator: 'GREATER_THAN_OR_EQUALS', value: '"16"' },
  ];
  const rulesFile = join(tmpdir(), 'devicefarm-ios-rules.json');
  writeFileSync(rulesFile, JSON.stringify(rules), 'utf-8');

  let pool;
  try {
    pool = aws(
      `devicefarm create-device-pool --project-arn "${PROJECT_ARN}" ` +
      `--name "${DEFAULT_DEVICE_POOL_NAME}" ` +
      `--description "iOS 16+ devices for xAI Workspace testing" ` +
      `--rules file://${rulesFile} ` +
      `--max-devices 5`
    );
  } finally {
    try { unlinkSync(rulesFile); } catch {}
  }

  log(`Device pool created: ${pool.devicePool.arn}`);
  return pool.devicePool.arn;
}

// ── Schedule Test Run ───────────────────────────────────────────────────────

function scheduleRun(uploadArn, devicePoolArn) {
  log('Scheduling test run (built-in fuzz test)...');

  // Use built-in fuzz testing — exercises the app with random UI events,
  // good for catching crashes and basic compatibility issues.
  const result = aws(
    `devicefarm schedule-run ` +
    `--project-arn "${PROJECT_ARN}" ` +
    `--app-arn "${uploadArn}" ` +
    `--device-pool-arn "${devicePoolArn}" ` +
    `--name "xAIWorkspace-iOS-fuzz-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}" ` +
    `--test '{"type":"BUILTIN_FUZZ","parameters":{"event_count":"6000","throttle":"50","seed":"1234"}}'`
  );

  const runArn = result.run.arn;
  log(`Test run scheduled!`);
  log(`Run ARN: ${runArn}`);
  log(`Status: ${result.run.status}`);
  log('');
  log(`Check status:  node scripts/device-farm-ios.mjs --status "${runArn}"`);
  log(`List runs:     node scripts/device-farm-ios.mjs --list-runs`);
  log(`Console:       https://us-west-2.console.aws.amazon.com/devicefarm/home?region=us-west-2#/projects/${PROJECT_ARN.split(':').pop()}/runs`);

  return runArn;
}

// ── Status & Listing ────────────────────────────────────────────────────────

function checkStatus(runArn) {
  const result = aws(`devicefarm get-run --arn "${runArn}"`);
  const r = result.run;

  log(`Run: ${r.name}`);
  log(`Status: ${r.status}`);
  log(`Result: ${r.result || 'pending'}`);
  log(`Platform: ${r.platform}`);

  if (r.counters) {
    const c = r.counters;
    log(`Tests: ${c.total} total, ${c.passed} passed, ${c.failed} failed, ${c.errored} errored, ${c.skipped} skipped`);
  }

  if (r.deviceMinutes) {
    log(`Device minutes: ${r.deviceMinutes.total} total (${r.deviceMinutes.metered} metered)`);
  }

  return r;
}

function listRuns() {
  const result = aws(`devicefarm list-runs --arn "${PROJECT_ARN}"`);
  const runs = result.runs || [];

  if (runs.length === 0) {
    log('No test runs found.');
    return;
  }

  log(`Recent test runs (${runs.length}):\n`);
  for (const r of runs.slice(0, 10)) {
    const date = new Date(r.created * 1000).toISOString().slice(0, 16);
    const result = r.result || r.status;
    const minutes = r.deviceMinutes?.total || 0;
    console.log(`  ${date}  ${result.padEnd(10)}  ${minutes}min  ${r.name}`);
    console.log(`    ${r.arn}`);
  }
}

function listPools() {
  const privatePools = aws(`devicefarm list-device-pools --arn "${PROJECT_ARN}" --type PRIVATE`);
  const curatedPools = aws(`devicefarm list-device-pools --arn "${PROJECT_ARN}" --type CURATED`);

  log('Private device pools:');
  for (const p of privatePools.devicePools || []) {
    console.log(`  ${p.name} — ${p.description || 'no description'}`);
    console.log(`    ${p.arn}`);
  }

  log('\nCurated device pools:');
  for (const p of curatedPools.devicePools || []) {
    console.log(`  ${p.name} — ${p.description || 'no description'}`);
    console.log(`    ${p.arn}`);
  }
}

// ── Main ────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('help')) {
  console.log(`
AWS Device Farm iOS Test Runner for xAI Workspace

Usage:
  node scripts/device-farm-ios.mjs                 Build IPA + upload + run fuzz test
  node scripts/device-farm-ios.mjs --upload-only   Upload IPA without scheduling a test
  node scripts/device-farm-ios.mjs --skip-build    Use existing IPA
  node scripts/device-farm-ios.mjs --status <arn>  Check status of a test run
  node scripts/device-farm-ios.mjs --list-runs     List recent test runs
  node scripts/device-farm-ios.mjs --list-pools    List available device pools

Config:
  Project:  ${PROJECT_ARN}
  Profile:  ${AWS_PROFILE}
  Region:   ${AWS_REGION}
`);
  process.exit(0);
}

if (args.includes('--status')) {
  const arn = args[args.indexOf('--status') + 1];
  if (!arn) die('Provide a run ARN: --status <arn>');
  checkStatus(arn);
} else if (args.includes('--list-runs')) {
  listRuns();
} else if (args.includes('--list-pools')) {
  listPools();
} else {
  // Full flow: build → upload → test
  log('AWS Device Farm iOS Test Runner');
  log(`Project: ${PROJECT_ARN}`);
  log('');

  // Verify AWS access
  log('Verifying AWS access...');
  try {
    aws(`devicefarm get-project --arn "${PROJECT_ARN}"`);
    log('AWS access verified.');
  } catch (err) {
    die(
      `Cannot access Device Farm project. Ensure:\n` +
      `  1. AWS CLI profile "${AWS_PROFILE}" is configured\n` +
      `  2. Device Farm permissions are granted (run scripts/device-farm-iam-setup.sh in CloudShell)\n` +
      `  3. The project ARN is correct`
    );
  }

  // Try to build; if xcodebuild unavailable, use existing artifact
  let artifact;
  if (args.includes('--skip-build')) {
    artifact = findExistingArtifact();
    if (!artifact) die('No existing IPA found. Build with Xcode first, or remove --skip-build.');
    log(`Using existing artifact: ${artifact.name}`);
  } else {
    try {
      artifact = buildIpa();
    } catch (err) {
      log('xcodebuild failed — checking for existing artifact...');
      artifact = findExistingArtifact();
      if (!artifact) die('No IPA found and xcodebuild failed. Install Xcode or build manually first.');
      log(`Using existing artifact: ${artifact.name}`);
    }
  }

  const size = (readFileSync(artifact.path).length / 1024 / 1024).toFixed(1);
  log(`Artifact: ${artifact.name} (${size} MB)`);
  const uploadArn = uploadIpa(artifact);

  if (args.includes('--upload-only')) {
    log(`\nIPA uploaded: ${uploadArn}`);
    log('Skipping test run (--upload-only).');
  } else {
    const devicePoolArn = getOrCreateDevicePool();
    scheduleRun(uploadArn, devicePoolArn);
  }
}
