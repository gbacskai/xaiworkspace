import { test, expect } from '../fixtures/auth.fixture';

/** Check if the chat bottom sheet is open (mobile only). */
async function isChatOpen(page: import('@playwright/test').Page): Promise<boolean> {
  return page.evaluate(() =>
    document.querySelector('.chat-frame')?.classList.contains('chat-frame--open') ?? false
  );
}

/** Ensure chat panel is visible — uses FAB on mobile, already visible on desktop. */
async function ensureChatOpen(page: import('@playwright/test').Page) {
  const fab = page.locator('.chat-fab');
  if (await fab.isVisible() && !(await isChatOpen(page))) {
    await fab.click();
    await page.waitForTimeout(400);
  }
}

/**
 * Switch language via the home page language picker.
 * Desktop: uncollapses the left sidebar if needed.
 * Mobile: closes the chat bottom sheet so the picker is accessible.
 */
async function switchLanguage(page: import('@playwright/test').Page, langLabel: string) {
  const collapseToggle = page.locator('.collapse-toggle');
  const isDesktop = await collapseToggle.isVisible();

  if (isDesktop) {
    // When the sidebar is collapsed the router-outlet (and lang picker) is destroyed.
    // Wait for the auto-collapse (3 s timer), then uncollapse.
    if (await page.locator('.lang-btn').count() === 0) {
      await page.locator('.content-frame--collapsed').waitFor({ state: 'attached', timeout: 6000 });
      await collapseToggle.click();
      await page.waitForTimeout(1600); // 1.5 s slide transition
    }
  } else {
    // Mobile: close the chat bottom sheet — its backdrop blocks the language picker.
    if (await isChatOpen(page)) {
      await page.locator('.chat-fab').click();
      await page.waitForTimeout(400);
    }
  }

  await page.locator('.lang-btn').click();
  await page.locator('.lang-option').filter({ hasText: langLabel }).click();
}

test.describe('Language Switching', () => {
  test('switching language updates chat placeholder, send button, and connection status', async ({ connectedPage: page }) => {
    await ensureChatOpen(page);

    const status = page.locator('.chat-header-status');
    const chatInput = page.locator('.chat-input');
    const sendBtn = page.locator('.chat-send');

    // Wait for WebSocket connection
    await expect(status).toContainText('Connected', { timeout: 5000 });

    // Verify initial English UI
    await expect(chatInput).toHaveAttribute('placeholder', 'Type a message...');
    await expect(sendBtn).toContainText('Send');

    // Switch to Spanish
    await switchLanguage(page, 'Español');
    await ensureChatOpen(page);

    await expect(chatInput).toHaveAttribute('placeholder', 'Escribe un mensaje...');
    await expect(sendBtn).toContainText('Enviar');
    await expect(status).toContainText('Conectado');

    // Switch to German
    await switchLanguage(page, 'Deutsch');
    await ensureChatOpen(page);

    await expect(chatInput).toHaveAttribute('placeholder', 'Nachricht eingeben...');
    await expect(sendBtn).toContainText('Senden');
    await expect(status).toContainText('Verbunden');
  });

  test('conversation continues after language switch with all messages preserved', async ({ connectedPage: page }) => {
    await ensureChatOpen(page);
    await expect(page.locator('.chat-header-status')).toContainText('Connected', { timeout: 5000 });

    const chatInput = page.locator('.chat-input');

    // Send a message in English (use Enter key — on mobile the FAB overlaps the send button)
    await chatInput.fill('Hello world');
    await chatInput.press('Enter');

    await expect(page.locator('.chat-bubble--user').last()).toContainText('Hello world');
    await expect(page.locator('.chat-bubble--bot').last()).toContainText('Echo: Hello world', { timeout: 5000 });

    // Switch to Spanish
    await switchLanguage(page, 'Español');
    await ensureChatOpen(page);

    // UI is now Spanish
    await expect(chatInput).toHaveAttribute('placeholder', 'Escribe un mensaje...');

    // Previous messages are preserved
    await expect(page.locator('.chat-bubble--user').first()).toContainText('Hello world');
    await expect(page.locator('.chat-bubble--bot').first()).toContainText('Echo: Hello world');

    // Send a new message
    await chatInput.fill('Hola mundo');
    await chatInput.press('Enter');

    await expect(page.locator('.chat-bubble--user').last()).toContainText('Hola mundo');
    await expect(page.locator('.chat-bubble--bot').last()).toContainText('Echo: Hola mundo', { timeout: 5000 });

    // All 4 messages present (2 user + 2 bot)
    await expect(page.locator('.chat-bubble')).toHaveCount(4);
  });

  test('home page section headers update on language switch', async ({ connectedPage: page }) => {
    // Ensure sidebar is open on desktop so the home page renders
    const collapseToggle = page.locator('.collapse-toggle');
    if (await collapseToggle.isVisible()) {
      if (await page.locator('.lang-btn').count() === 0) {
        await page.locator('.content-frame--collapsed').waitFor({ state: 'attached', timeout: 6000 });
        await collapseToggle.click();
        await page.waitForTimeout(1600);
      }
    }

    const firstHeader = page.locator('.section-header').first();
    await expect(firstHeader).toContainText('Essentials');

    // Switch to French
    await page.locator('.lang-btn').click();
    await page.locator('.lang-option').filter({ hasText: 'Français' }).click();
    await expect(firstHeader).toContainText('Essentiels');

    // Switch to German
    await page.locator('.lang-btn').click();
    await page.locator('.lang-option').filter({ hasText: 'Deutsch' }).click();
    await expect(firstHeader).toContainText('Grundlagen');
  });
});
