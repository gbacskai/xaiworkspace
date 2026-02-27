import { test as base, Page } from '@playwright/test';
import { injectAuth } from '../helpers/auth.helpers';
import {
  mockWebSocket,
  mockWebSocketConnected,
  mockWebSocketWithAgents,
  mockWebSocketWithEmptyAgents,
  mockWebSocketWithAgentsTrial,
} from '../helpers/websocket.helpers';

type AuthFixtures = {
  authenticatedPage: Page;
  connectedPage: Page;
  agentPage: Page;
  emptyAgentPage: Page;
  trialPage: Page;
};

export const test = base.extend<AuthFixtures>({
  /** Page with Telegram auth injected and WebSocket mocked (disconnected). */
  authenticatedPage: async ({ page }, use) => {
    await injectAuth(page, ['telegram']);
    await mockWebSocket(page);
    await page.route('**/router.xaiworkspace.com/**', (route) => route.abort());
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await use(page);
  },

  /** Page with Telegram auth + WebSocket connected (echoes messages). */
  connectedPage: async ({ page }, use) => {
    await injectAuth(page, ['telegram']);
    await mockWebSocketConnected(page);
    await page.route('**/router.xaiworkspace.com/**', (route) => route.abort());
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await use(page);
  },

  /** Page with Telegram auth + WebSocket with 5 mock agents (pro tier). */
  agentPage: async ({ page }, use) => {
    await injectAuth(page, ['telegram']);
    await mockWebSocketWithAgents(page);
    await page.route('**/router.xaiworkspace.com/**', (route) => route.abort());
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await use(page);
  },

  /** Page with Telegram auth + WebSocket with 0 agents (pro tier). */
  emptyAgentPage: async ({ page }, use) => {
    await injectAuth(page, ['telegram']);
    await mockWebSocketWithEmptyAgents(page);
    await page.route('**/router.xaiworkspace.com/**', (route) => route.abort());
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await use(page);
  },

  /** Page with Telegram auth + WebSocket with 5 agents (trial tier). */
  trialPage: async ({ page }, use) => {
    await injectAuth(page, ['telegram']);
    await mockWebSocketWithAgentsTrial(page);
    await page.route('**/router.xaiworkspace.com/**', (route) => route.abort());
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await use(page);
  },
});

export { expect } from '@playwright/test';
