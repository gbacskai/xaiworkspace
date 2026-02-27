#!/usr/bin/env node

/**
 * AWS Device Farm Desktop Browser Testing
 *
 * Runs smoke tests on real desktop browsers (Chrome, Firefox, Edge)
 * hosted by AWS Device Farm, against the live xAI Workspace site.
 *
 * Uses Selenium WebDriver with Device Farm's test grid endpoint.
 *
 * Prerequisites:
 *   1. AWS CLI profile aws_amplify_docflow4 with devicefarm permissions
 *   2. selenium-webdriver installed (npm install --save-dev selenium-webdriver)
 *
 * Usage:
 *   node scripts/device-farm-browser.mjs                          # All browsers
 *   node scripts/device-farm-browser.mjs --browser chrome         # Chrome only
 *   node scripts/device-farm-browser.mjs --browser firefox        # Firefox only
 *   node scripts/device-farm-browser.mjs --url http://localhost:4200  # Test local dev
 *   node scripts/device-farm-browser.mjs --list-sessions          # List recent sessions
 */

import { execSync } from 'node:child_process';
import { Builder, By, until } from 'selenium-webdriver';

// ── Config ──────────────────────────────────────────────────────────────────

const TEST_GRID_ARN = 'arn:aws:devicefarm:us-west-2:695829630004:testgrid-project:ae6b7a7a-6d02-4313-86a6-f3076f5e64f1';
const AWS_PROFILE = 'aws_amplify_docflow4';
const AWS_REGION = 'us-west-2';
const DEFAULT_URL = 'https://xaiworkspace.com';

const args = process.argv.slice(2);
const BROWSER_ARG = args.includes('--browser') ? args[args.indexOf('--browser') + 1] : null;
const TEST_URL = args.includes('--url') ? args[args.indexOf('--url') + 1] : DEFAULT_URL;
const BROWSERS = BROWSER_ARG ? [BROWSER_ARG] : ['chrome', 'firefox'];

// ── Helpers ─────────────────────────────────────────────────────────────────

function log(msg) { console.log(`[browser-test] ${msg}`); }
function pass(msg) { console.log(`  \x1b[32m✓\x1b[0m ${msg}`); }
function fail(msg) { console.log(`  \x1b[31m✗\x1b[0m ${msg}`); }

function aws(command) {
  const fullCmd = `aws ${command} --profile ${AWS_PROFILE} --region ${AWS_REGION} --output json`;
  const result = execSync(fullCmd, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
  return JSON.parse(result);
}

// ── Get Selenium Hub URL ────────────────────────────────────────────────────

function getTestGridUrl() {
  log('Generating Device Farm test grid URL...');
  const result = aws(
    `devicefarm create-test-grid-url --project-arn "${TEST_GRID_ARN}" --expires-in-seconds 900`
  );
  return result.url;
}

// ── Smoke Tests ─────────────────────────────────────────────────────────────

/**
 * Each test returns { name, passed, error? }
 */
const TESTS = [
  {
    name: 'Home page loads with hero and title',
    run: async (driver) => {
      await driver.get(TEST_URL);
      await driver.wait(until.elementLocated(By.css('.hero h1')), 15000);
      const title = await driver.findElement(By.css('.hero h1')).getText();
      assert(title === 'xAI Workspace', `Expected title "xAI Workspace", got "${title}"`);

      const logo = await driver.findElement(By.css('.hero-logo'));
      assert(await logo.isDisplayed(), 'Hero logo not visible');
    },
  },
  {
    name: 'Login box shows OAuth provider buttons',
    run: async (driver) => {
      await driver.get(TEST_URL);
      await driver.wait(until.elementLocated(By.css('.login-box')), 15000);

      const providers = ['telegram', 'google', 'github', 'linkedin'];
      for (const p of providers) {
        const btn = await driver.findElement(By.css(`.login-box-item--${p}`));
        assert(await btn.isDisplayed(), `${p} login button not visible`);
      }
    },
  },
  {
    name: 'Footer renders with navigation links',
    run: async (driver) => {
      await driver.get(TEST_URL);
      await driver.wait(until.elementLocated(By.css('.footer')), 15000);

      const aboutLink = await driver.findElement(By.css('.footer-links a[href="/about"]'));
      assert(await aboutLink.isDisplayed(), 'About link not visible');

      const privacyLink = await driver.findElement(By.css('.footer-links a[href="/privacy"]'));
      assert(await privacyLink.isDisplayed(), 'Privacy link not visible');

      const termsLink = await driver.findElement(By.css('.footer-links a[href="/terms"]'));
      assert(await termsLink.isDisplayed(), 'Terms link not visible');
    },
  },
  {
    name: 'Navigation to /about works',
    run: async (driver) => {
      await driver.get(TEST_URL);
      await driver.wait(until.elementLocated(By.css('.footer-links a[href="/about"]')), 15000);
      await driver.findElement(By.css('.footer-links a[href="/about"]')).click();
      await driver.wait(until.urlContains('/about'), 10000);
      await driver.wait(until.elementLocated(By.css('.about-header')), 10000);
      const header = await driver.findElement(By.css('.about-header'));
      assert(await header.isDisplayed(), 'About header not visible');
    },
  },
  {
    name: 'Navigation to /privacy works',
    run: async (driver) => {
      await driver.get(TEST_URL);
      await driver.wait(until.elementLocated(By.css('.footer-links a[href="/privacy"]')), 15000);
      await driver.findElement(By.css('.footer-links a[href="/privacy"]')).click();
      await driver.wait(until.urlContains('/privacy'), 10000);
      await driver.wait(until.elementLocated(By.css('.privacy-header')), 10000);
      const header = await driver.findElement(By.css('.privacy-header'));
      assert(await header.isDisplayed(), 'Privacy header not visible');
    },
  },
  {
    name: 'Three section headers on home page',
    run: async (driver) => {
      await driver.get(TEST_URL);
      await driver.wait(until.elementLocated(By.css('.section-header')), 15000);
      const headers = await driver.findElements(By.css('.section-header'));
      assert(headers.length === 3, `Expected 3 section headers, got ${headers.length}`);
    },
  },
  {
    name: 'Wildcard route redirects to home',
    run: async (driver) => {
      await driver.get(`${TEST_URL}/nonexistent-page-12345`);
      await driver.wait(until.urlMatches(/\/$/), 10000);
      await driver.wait(until.elementLocated(By.css('.hero')), 10000);
      const hero = await driver.findElement(By.css('.hero'));
      assert(await hero.isDisplayed(), 'Home page hero not visible after redirect');
    },
  },
  {
    name: 'Page title is set correctly',
    run: async (driver) => {
      await driver.get(TEST_URL);
      await driver.wait(until.elementLocated(By.css('.hero')), 15000);
      const pageTitle = await driver.getTitle();
      assert(pageTitle.includes('xAI'), `Expected page title containing "xAI", got "${pageTitle}"`);
    },
  },
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

// ── Run Tests ───────────────────────────────────────────────────────────────

async function runTestsOnBrowser(hubUrl, browserName) {
  log(`\n── ${browserName.toUpperCase()} ──`);

  let driver;
  try {
    driver = await new Builder()
      .usingServer(hubUrl)
      .forBrowser(browserName)
      .build();

    // Set reasonable timeouts
    await driver.manage().setTimeouts({ implicit: 5000, pageLoad: 30000 });
    // Set desktop viewport
    await driver.manage().window().setRect({ width: 1280, height: 800 });
  } catch (err) {
    fail(`Failed to create ${browserName} session: ${err.message}`);
    return { browser: browserName, passed: 0, failed: TESTS.length, results: [] };
  }

  let passed = 0;
  let failed = 0;
  const results = [];

  for (const test of TESTS) {
    try {
      await test.run(driver);
      pass(test.name);
      passed++;
      results.push({ name: test.name, passed: true });
    } catch (err) {
      fail(`${test.name} — ${err.message}`);
      failed++;
      results.push({ name: test.name, passed: false, error: err.message });
    }
  }

  try {
    await driver.quit();
  } catch {}

  log(`  ${passed} passed, ${failed} failed`);
  return { browser: browserName, passed, failed, results };
}

// ── List Sessions ───────────────────────────────────────────────────────────

function listSessions() {
  const result = aws(`devicefarm list-test-grid-sessions --project-arn "${TEST_GRID_ARN}"`);
  const sessions = result.testGridSessions || [];

  if (sessions.length === 0) {
    log('No recent browser test sessions.');
    return;
  }

  log(`Recent browser test sessions (${sessions.length}):\n`);
  for (const s of sessions.slice(0, 10)) {
    const created = new Date(s.created * 1000).toISOString().slice(0, 16);
    const status = s.status || 'unknown';
    const mins = s.billingMinutes || 0;
    console.log(`  ${created}  ${status.padEnd(10)}  ${mins}min  ${s.arn}`);
  }
}

// ── Main ────────────────────────────────────────────────────────────────────

if (args.includes('--help') || args.includes('help')) {
  console.log(`
AWS Device Farm Desktop Browser Testing for xAI Workspace

Usage:
  node scripts/device-farm-browser.mjs                          Run on all browsers
  node scripts/device-farm-browser.mjs --browser chrome         Chrome only
  node scripts/device-farm-browser.mjs --browser firefox        Firefox only
  node scripts/device-farm-browser.mjs --url http://localhost:4200  Test local URL
  node scripts/device-farm-browser.mjs --list-sessions          List recent sessions

Config:
  Test Grid:  ${TEST_GRID_ARN}
  Profile:    ${AWS_PROFILE}
  Region:     ${AWS_REGION}
  Target URL: ${TEST_URL}
  Browsers:   ${BROWSERS.join(', ')}
  Tests:      ${TESTS.length} smoke tests
`);
  process.exit(0);
}

if (args.includes('--list-sessions')) {
  listSessions();
  process.exit(0);
}

log('AWS Device Farm Desktop Browser Testing');
log(`Target: ${TEST_URL}`);
log(`Browsers: ${BROWSERS.join(', ')}`);
log(`Tests: ${TESTS.length} smoke tests`);

const hubUrl = getTestGridUrl();
log('Test grid URL obtained (expires in 15 min)');

const allResults = [];
for (const browser of BROWSERS) {
  const result = await runTestsOnBrowser(hubUrl, browser);
  allResults.push(result);
}

// Summary
log('\n── SUMMARY ──');
let totalPassed = 0;
let totalFailed = 0;
for (const r of allResults) {
  const icon = r.failed === 0 ? '\x1b[32m✓\x1b[0m' : '\x1b[31m✗\x1b[0m';
  console.log(`  ${icon} ${r.browser}: ${r.passed}/${r.passed + r.failed} passed`);
  totalPassed += r.passed;
  totalFailed += r.failed;
}

log(`\nTotal: ${totalPassed} passed, ${totalFailed} failed across ${allResults.length} browser(s)`);
log(`Console: https://us-west-2.console.aws.amazon.com/devicefarm/home?region=us-west-2#/testgrid/projects/${TEST_GRID_ARN.split(':').pop()}`);

process.exit(totalFailed > 0 ? 1 : 0);
