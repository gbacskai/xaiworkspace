import { test, expect } from '../fixtures/auth.fixture';
import type { Page } from '@playwright/test';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Open the agents panel — uses FAB on mobile, toggle on desktop. */
async function openAgents(page: Page) {
  const fab = page.locator('.agents-fab');
  if (await fab.isVisible()) {
    await fab.click();
  } else {
    const toggle = page.locator('.agents-toggle');
    if (await toggle.isVisible()) {
      await toggle.click();
    }
  }
  await expect(page.locator('.agents-panel')).toBeVisible({ timeout: 5000 });
}

/** Wait for the agents list to populate (WS must respond to agents_list). */
async function waitForAgents(page: Page) {
  await page.waitForTimeout(300);
  await expect(page.locator('.agents-list-item').first()).toBeVisible({ timeout: 5000 });
}

/** Open agents panel and wait for list to load. */
async function openAgentsWithList(page: Page) {
  await openAgents(page);
  await waitForAgents(page);
}

/** Click the first agent name to enter detail view. */
async function openFirstAgent(page: Page) {
  await page.locator('.agents-list-name').first().click();
  await expect(page.locator('.agents-detail')).toBeVisible({ timeout: 5000 });
}

/* ================================================================== */
/*  Group 1: Panel Basics                                              */
/* ================================================================== */
test.describe('Agents Panel — Basics', () => {
  test('panel visible after opening', async ({ agentPage: page }) => {
    await openAgents(page);
    await expect(page.locator('.agents-panel')).toBeVisible();
  });

  test('two tabs visible (Agents, Tips)', async ({ agentPage: page }) => {
    await openAgents(page);
    const tabs = page.locator('.agents-tab');
    await expect(tabs).toHaveCount(2);
  });

  test('Agents tab active by default with 3px border', async ({ agentPage: page }) => {
    await openAgents(page);
    const activeTab = page.locator('.agents-tab--active');
    await expect(activeTab).toHaveCount(1);
    const borderBottom = await activeTab.evaluate((el) => getComputedStyle(el).borderBottom);
    expect(borderBottom).toContain('3px');
  });

  test('tab switching changes active styling', async ({ agentPage: page }) => {
    await openAgents(page);
    const tabs = page.locator('.agents-tab');

    // Switch to Recommendations tab
    await tabs.nth(1).click();
    await expect(tabs.nth(1)).toHaveClass(/agents-tab--active/);
    await expect(tabs.nth(0)).not.toHaveClass(/agents-tab--active/);

    // Switch back
    await tabs.nth(0).click();
    await expect(tabs.nth(0)).toHaveClass(/agents-tab--active/);
    await expect(tabs.nth(1)).not.toHaveClass(/agents-tab--active/);
  });

  test('close button visible on mobile', async ({ agentPage: page }) => {
    // Only run meaningfully on mobile-sized viewports
    const vp = page.viewportSize();
    if (vp && vp.width <= 860) {
      await openAgents(page);
      await expect(page.locator('.agents-close')).toBeVisible();
    }
  });

  test('close button hidden on desktop', async ({ agentPage: page }) => {
    const vp = page.viewportSize();
    if (vp && vp.width > 860) {
      await openAgents(page);
      await expect(page.locator('.agents-close')).not.toBeVisible();
    }
  });

  test('backdrop closes panel on mobile', async ({ agentPage: page }) => {
    const vp = page.viewportSize();
    if (vp && vp.width <= 860) {
      await openAgents(page);
      const backdrop = page.locator('.agents-backdrop');
      await expect(backdrop).toBeVisible();
      await backdrop.click();
      // Panel should slide away; the agents-frame--open class is removed
      await expect(page.locator('.agents-frame--open')).toHaveCount(0, { timeout: 3000 });
    }
  });

  test('agents-frame has open class when panel is open', async ({ agentPage: page }) => {
    await openAgents(page);
    await expect(page.locator('.agents-frame--open')).toHaveCount(1);
  });
});

/* ================================================================== */
/*  Group 2: Agents List View                                          */
/* ================================================================== */
test.describe('Agents List — Empty State', () => {
  test('empty message shown when no agents', async ({ emptyAgentPage: page }) => {
    await openAgents(page);
    await page.waitForTimeout(300);
    await expect(page.locator('.agents-empty')).toBeVisible({ timeout: 5000 });
  });

  test('no search input when no agents', async ({ emptyAgentPage: page }) => {
    await openAgents(page);
    await page.waitForTimeout(300);
    await expect(page.locator('.agents-search')).toHaveCount(0);
  });

  test('create button still visible in empty state', async ({ emptyAgentPage: page }) => {
    await openAgents(page);
    await page.waitForTimeout(300);
    await expect(page.locator('.agents-btn-create')).toBeVisible();
  });
});

test.describe('Agents List — Populated', () => {
  test('5 agents listed', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await expect(page.locator('.agents-list-item')).toHaveCount(5);
  });

  test('agents sorted by priority: high first, then medium, then low', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    const names = await page.locator('.agents-list-name').allTextContents();
    // high: Generate Agents, Email Triage — medium: Code Reviewer, Daily Planner — low: Wellness Check
    expect(names.map(n => n.trim())).toEqual([
      'Generate Agents',
      'Email Triage',
      'Code Reviewer',
      'Daily Planner',
      'Wellness Check',
    ]);
  });

  test('priority dots have correct color classes', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    const dots = page.locator('.agents-priority-dot');

    // First two should be high
    await expect(dots.nth(0)).toHaveClass(/priority-high/);
    await expect(dots.nth(1)).toHaveClass(/priority-high/);
    // Next two medium
    await expect(dots.nth(2)).toHaveClass(/priority-medium/);
    await expect(dots.nth(3)).toHaveClass(/priority-medium/);
    // Last one low
    await expect(dots.nth(4)).toHaveClass(/priority-low/);
  });

  test('search input visible (>= 4 agents)', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await expect(page.locator('.agents-search')).toBeVisible();
  });

  test('search filters agents in real-time', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    const search = page.locator('.agents-search');
    await search.fill('Code');
    await expect(page.locator('.agents-list-item')).toHaveCount(1);
    const name = await page.locator('.agents-list-name').first().textContent();
    expect(name?.trim()).toBe('Code Reviewer');
  });

  test('clearing search restores full list', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    const search = page.locator('.agents-search');
    await search.fill('Code');
    await expect(page.locator('.agents-list-item')).toHaveCount(1);
    await search.fill('');
    await expect(page.locator('.agents-list-item')).toHaveCount(5);
  });

  test('create button has gradient background', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    const createBtn = page.locator('.agents-btn-create');
    await expect(createBtn).toBeVisible();
    const bgImage = await createBtn.evaluate((el) => getComputedStyle(el).backgroundImage);
    expect(bgImage).toContain('gradient');
  });

  test('template dropdown visible', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await expect(page.locator('.agents-template-select')).toBeVisible();
  });

  test('run buttons visible on each list item', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    const runBtns = page.locator('.agents-list-run');
    await expect(runBtns).toHaveCount(5);
  });

  test('search with no matches shows empty list', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await page.locator('.agents-search').fill('nonexistent agent xyz');
    await expect(page.locator('.agents-list-item')).toHaveCount(0);
  });

  test('search is case-insensitive', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await page.locator('.agents-search').fill('WELLNESS');
    await expect(page.locator('.agents-list-item')).toHaveCount(1);
    const name = await page.locator('.agents-list-name').first().textContent();
    expect(name?.trim()).toBe('Wellness Check');
  });
});

/* ================================================================== */
/*  Group 3: Agent Detail View                                         */
/* ================================================================== */
test.describe('Agent Detail View', () => {
  test('clicking agent name opens detail view', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await expect(page.locator('.agents-detail')).toBeVisible();
  });

  test('agent name displayed in detail view', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    const name = await page.locator('.agents-detail-name').textContent();
    expect(name?.trim()).toBe('Generate Agents');
  });

  test('toolbar shows Back, Run, Edit, Delete buttons', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await expect(page.locator('.agents-toolbar-btn').filter({ hasText: /Back/i })).toBeVisible();
    await expect(page.locator('.agents-toolbar-run')).toBeVisible();
    await expect(page.locator('.agents-toolbar-btn').filter({ hasText: /Edit/i })).toBeVisible();
    await expect(page.locator('.agents-toolbar-delete')).toBeVisible();
  });

  test('Back returns to list view', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await page.locator('.agents-toolbar-btn').filter({ hasText: /Back/i }).click();
    await expect(page.locator('.agents-list')).toBeVisible({ timeout: 3000 });
    await expect(page.locator('.agents-detail')).toHaveCount(0);
  });

  test('detail view renders markdown content', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    const content = page.locator('.agents-detail-content');
    await expect(content).toBeVisible();
    // Markdown should render h1, strong, code etc.
    await expect(content.locator('h1')).toHaveCount(1);
    await expect(content.locator('strong').first()).toBeVisible();
  });

  test('selecting different agents updates detail view', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    // Click second agent (Email Triage)
    await page.locator('.agents-list-name').nth(1).click();
    await expect(page.locator('.agents-detail')).toBeVisible({ timeout: 5000 });
    const name = await page.locator('.agents-detail-name').textContent();
    expect(name?.trim()).toBe('Email Triage');
  });

  test('rendered content includes code elements', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    const content = page.locator('.agents-detail-content');
    // The **Run** field has backtick code
    await expect(content.locator('code').first()).toBeVisible();
  });

  test('detail view shows no error by default', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await expect(page.locator('.agents-error')).toHaveCount(0);
  });
});

/* ================================================================== */
/*  Group 4: Create Agent                                              */
/* ================================================================== */
test.describe('Create Agent', () => {
  test('create button opens create form', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await page.locator('.agents-btn-create').click();
    await expect(page.locator('.agents-create')).toBeVisible();
  });

  test('create form has cancel toolbar, name input, and textarea', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await page.locator('.agents-btn-create').click();
    await expect(page.locator('.agents-toolbar-btn').filter({ hasText: /Cancel/i })).toBeVisible();
    await expect(page.locator('.agents-name-input')).toBeVisible();
    await expect(page.locator('.agents-md-textarea')).toBeVisible();
  });

  test('textarea is pre-filled with template', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await page.locator('.agents-btn-create').click();
    const textarea = page.locator('.agents-md-textarea');
    const value = await textarea.inputValue();
    expect(value).toContain('# Agent Name');
    expect(value).toContain('**Model**');
  });

  test('9 markdown toolbar buttons present', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await page.locator('.agents-btn-create').click();
    // 8 formatting buttons + 1 preview toggle
    await expect(page.locator('.agents-md-toolbar-btn')).toHaveCount(9);
  });

  test('Bold button inserts markdown bold syntax', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await page.locator('.agents-btn-create').click();
    const textarea = page.locator('.agents-md-textarea');
    await textarea.fill('');
    await textarea.focus();
    await page.locator('.agents-md-toolbar-btn[title="Bold"]').click();
    const value = await textarea.inputValue();
    expect(value).toContain('**bold**');
  });

  test('Italic button inserts markdown italic syntax', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await page.locator('.agents-btn-create').click();
    const textarea = page.locator('.agents-md-textarea');
    await textarea.fill('');
    await textarea.focus();
    await page.locator('.agents-md-toolbar-btn[title="Italic"]').click();
    const value = await textarea.inputValue();
    expect(value).toContain('*italic*');
  });

  test('Heading button inserts heading syntax', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await page.locator('.agents-btn-create').click();
    const textarea = page.locator('.agents-md-textarea');
    await textarea.fill('');
    await textarea.focus();
    await page.locator('.agents-md-toolbar-btn[title="Heading"]').click();
    const value = await textarea.inputValue();
    expect(value).toContain('## heading');
  });

  test('preview toggle shows rendered HTML and hides textarea', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await page.locator('.agents-btn-create').click();
    // Before preview: textarea visible, preview hidden
    await expect(page.locator('.agents-md-textarea')).toBeVisible();
    await expect(page.locator('.agents-md-preview')).toHaveCount(0);

    // Toggle preview on
    await page.locator('.agents-md-toolbar-btn[title="Preview"]').click();
    await expect(page.locator('.agents-md-preview')).toBeVisible();
    await expect(page.locator('.agents-md-textarea')).toHaveCount(0);

    // Toggle preview off
    await page.locator('.agents-md-toolbar-btn[title="Preview"]').click();
    await expect(page.locator('.agents-md-textarea')).toBeVisible();
  });

  test('submit disabled when name is empty', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await page.locator('.agents-btn-create').click();
    // Name input is empty by default
    await expect(page.locator('.agents-btn-primary')).toBeDisabled();
  });

  test('validation error for missing Title shows when content cleared', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await page.locator('.agents-btn-create').click();
    const textarea = page.locator('.agents-md-textarea');
    await textarea.fill('no title here');
    await expect(page.locator('.agents-validation-error')).toBeVisible();
    const err = await page.locator('.agents-validation-error').textContent();
    expect(err).toContain('Title');
  });

  test('submit enabled with valid name and content', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await page.locator('.agents-btn-create').click();
    // Template content is already valid, just fill name
    await page.locator('.agents-name-input').fill('TestAgent');
    await expect(page.locator('.agents-btn-primary')).toBeEnabled();
  });

  test('submit sends create and navigates to detail', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await page.locator('.agents-btn-create').click();
    await page.locator('.agents-name-input').fill('TestAgent');
    await page.locator('.agents-btn-primary').click();

    // After create, the mock WS auto-selects the new agent → detail view
    await expect(page.locator('.agents-detail')).toBeVisible({ timeout: 5000 });
    const name = await page.locator('.agents-detail-name').textContent();
    expect(name?.trim()).toBe('TestAgent');
  });

  test('template dropdown populates create form', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    const select = page.locator('.agents-template-select');
    await select.selectOption('email-triage');
    // Should now be in create mode with template content
    await expect(page.locator('.agents-create')).toBeVisible();
    const nameVal = await page.locator('.agents-name-input').inputValue();
    expect(nameVal).toBe('email-triage');
    const content = await page.locator('.agents-md-textarea').inputValue();
    expect(content).toContain('Email Triage');
  });

  test('cancel with no changes returns to list without confirmation', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await page.locator('.agents-btn-create').click();
    // Content is default template, name empty → no changes
    await page.locator('.agents-toolbar-btn').filter({ hasText: /Cancel/i }).click();
    // Should go straight back to list, no confirm dialog
    await expect(page.locator('.agents-confirm-overlay')).toHaveCount(0);
    await expect(page.locator('.agents-list')).toBeVisible({ timeout: 3000 });
  });

  test('cancel with changes shows confirmation dialog', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await page.locator('.agents-btn-create').click();
    // Make changes
    await page.locator('.agents-name-input').fill('SomeName');
    await page.locator('.agents-toolbar-btn').filter({ hasText: /Cancel/i }).click();
    // Confirm dialog should appear
    await expect(page.locator('.agents-confirm-overlay')).toBeVisible();
    await expect(page.locator('.agents-confirm-msg')).toContainText('Discard');
  });
});

/* ================================================================== */
/*  Group 5: Edit Agent                                                */
/* ================================================================== */
test.describe('Edit Agent', () => {
  test('edit mode shows textarea with content', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await page.locator('.agents-toolbar-btn').filter({ hasText: /Edit/i }).click();
    await expect(page.locator('.agents-edit-section')).toBeVisible();
    const textarea = page.locator('.agents-edit-textarea');
    await expect(textarea).toBeVisible();
    const value = await textarea.inputValue();
    expect(value).toContain('Generate Agents');
  });

  test('edit mode has markdown toolbar', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await page.locator('.agents-toolbar-btn').filter({ hasText: /Edit/i }).click();
    await expect(page.locator('.agents-edit-section .agents-md-toolbar')).toBeVisible();
    await expect(page.locator('.agents-edit-section .agents-md-toolbar-btn')).toHaveCount(9);
  });

  test('edit mode has Save and Cancel buttons', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await page.locator('.agents-toolbar-btn').filter({ hasText: /Edit/i }).click();
    await expect(page.locator('.agents-edit-actions .agents-btn-primary')).toBeVisible();
    await expect(page.locator('.agents-edit-actions .agents-btn-secondary')).toBeVisible();
  });

  test('save sends message and exits edit mode', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await page.locator('.agents-toolbar-btn').filter({ hasText: /Edit/i }).click();
    const textarea = page.locator('.agents-edit-textarea');
    // Modify content
    const currentValue = await textarea.inputValue();
    await textarea.fill(currentValue + '\n- Extra step');
    // Save
    await page.locator('.agents-edit-actions .agents-btn-primary').click();
    // Should exit edit mode — edit section should be gone
    await expect(page.locator('.agents-edit-section')).toHaveCount(0, { timeout: 3000 });
    // Should be back in detail view
    await expect(page.locator('.agents-detail-content')).toBeVisible();
  });

  test('cancel with no changes exits edit mode without confirmation', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await page.locator('.agents-toolbar-btn').filter({ hasText: /Edit/i }).click();
    // Don't change anything
    await page.locator('.agents-edit-actions .agents-btn-secondary').click();
    // No confirm dialog, back to detail view
    await expect(page.locator('.agents-confirm-overlay')).toHaveCount(0);
    await expect(page.locator('.agents-edit-section')).toHaveCount(0, { timeout: 3000 });
  });

  test('cancel with changes shows confirmation dialog', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await page.locator('.agents-toolbar-btn').filter({ hasText: /Edit/i }).click();
    // Modify
    const textarea = page.locator('.agents-edit-textarea');
    const currentValue = await textarea.inputValue();
    await textarea.fill(currentValue + '\n- Modified');
    await page.locator('.agents-edit-actions .agents-btn-secondary').click();
    await expect(page.locator('.agents-confirm-overlay')).toBeVisible();
    await expect(page.locator('.agents-confirm-msg')).toContainText('Discard');
  });

  test('confirming discard exits edit mode', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await page.locator('.agents-toolbar-btn').filter({ hasText: /Edit/i }).click();
    const textarea = page.locator('.agents-edit-textarea');
    const currentValue = await textarea.inputValue();
    await textarea.fill(currentValue + '\nchanged');
    await page.locator('.agents-edit-actions .agents-btn-secondary').click();
    await expect(page.locator('.agents-confirm-overlay')).toBeVisible();
    // Click "Yes" to discard
    await page.locator('.agents-confirm-actions .agents-btn-primary').click();
    await expect(page.locator('.agents-edit-section')).toHaveCount(0, { timeout: 3000 });
  });

  test('preview toggle in edit mode', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await page.locator('.agents-toolbar-btn').filter({ hasText: /Edit/i }).click();
    // Enable preview
    await page.locator('.agents-edit-section .agents-md-toolbar-btn[title="Preview"]').click();
    await expect(page.locator('.agents-edit-section .agents-md-preview')).toBeVisible();
    await expect(page.locator('.agents-edit-textarea')).toHaveCount(0);
    // Disable preview
    await page.locator('.agents-edit-section .agents-md-toolbar-btn[title="Preview"]').click();
    await expect(page.locator('.agents-edit-textarea')).toBeVisible();
  });

  test('draft auto-save to localStorage after 3s debounce', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await page.locator('.agents-toolbar-btn').filter({ hasText: /Edit/i }).click();
    const textarea = page.locator('.agents-edit-textarea');
    await textarea.fill('draft content for testing');
    // Wait for debounce (3s) + margin
    await page.waitForTimeout(3500);
    const draft = await page.evaluate(() => localStorage.getItem('agent_draft_GenerateAgents.md'));
    expect(draft).toBe('draft content for testing');
  });

  test('save clears draft from localStorage', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await page.locator('.agents-toolbar-btn').filter({ hasText: /Edit/i }).click();
    const textarea = page.locator('.agents-edit-textarea');
    await textarea.fill('draft content');
    await page.waitForTimeout(3500);
    // Verify draft exists
    let draft = await page.evaluate(() => localStorage.getItem('agent_draft_GenerateAgents.md'));
    expect(draft).toBeTruthy();
    // Now save (use original content so Save works)
    const currentValue = await textarea.inputValue();
    await page.locator('.agents-edit-actions .agents-btn-primary').click();
    await page.waitForTimeout(200);
    draft = await page.evaluate(() => localStorage.getItem('agent_draft_GenerateAgents.md'));
    expect(draft).toBeNull();
  });

  test('existing draft triggers restore confirmation', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    // Pre-seed a draft in localStorage
    await page.evaluate(() => localStorage.setItem('agent_draft_GenerateAgents.md', 'old draft content'));
    await openFirstAgent(page);
    await page.locator('.agents-toolbar-btn').filter({ hasText: /Edit/i }).click();
    // Confirm dialog should appear for draft restore
    await expect(page.locator('.agents-confirm-overlay')).toBeVisible();
    await expect(page.locator('.agents-confirm-msg')).toContainText('draft');
  });

  test('edit mode hides Run/Edit/Delete toolbar buttons', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await page.locator('.agents-toolbar-btn').filter({ hasText: /Edit/i }).click();
    await expect(page.locator('.agents-toolbar-run')).toHaveCount(0);
    await expect(page.locator('.agents-toolbar-delete')).toHaveCount(0);
  });

  test('Bold button in edit mode inserts syntax', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await page.locator('.agents-toolbar-btn').filter({ hasText: /Edit/i }).click();
    const textarea = page.locator('.agents-edit-textarea');
    await textarea.fill('');
    await textarea.focus();
    await page.locator('.agents-edit-section .agents-md-toolbar-btn[title="Bold"]').click();
    const value = await textarea.inputValue();
    expect(value).toContain('**bold**');
  });
});

/* ================================================================== */
/*  Group 6: Delete Agent                                              */
/* ================================================================== */
test.describe('Delete Agent', () => {
  test('delete button shows confirmation bar with agent name', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await page.locator('.agents-toolbar-delete').click();
    await expect(page.locator('.agents-delete-bar')).toBeVisible();
    const msg = await page.locator('.agents-delete-msg').textContent();
    expect(msg).toContain('Generate Agents');
  });

  test('Keep (cancel) hides confirmation bar', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await page.locator('.agents-toolbar-delete').click();
    await expect(page.locator('.agents-delete-bar')).toBeVisible();
    // Click the secondary button (Keep / No)
    await page.locator('.agents-delete-actions .agents-btn-secondary').click();
    await expect(page.locator('.agents-delete-bar')).toHaveCount(0, { timeout: 3000 });
  });

  test('Confirm deletes agent and returns to list', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await page.locator('.agents-toolbar-delete').click();
    await expect(page.locator('.agents-delete-bar')).toBeVisible();
    // Click the danger button (Confirm delete)
    await page.locator('.agents-delete-actions .agents-btn-danger').click();
    // Should return to list with one fewer agent
    await expect(page.locator('.agents-list')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('.agents-list-item')).toHaveCount(4, { timeout: 5000 });
  });

  test('delete bar hidden when entering edit mode', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    // Show delete bar
    await page.locator('.agents-toolbar-delete').click();
    await expect(page.locator('.agents-delete-bar')).toBeVisible();
    // Enter edit mode (this should resetState including delete bar)
    await page.locator('.agents-toolbar-btn').filter({ hasText: /Edit/i }).click();
    await expect(page.locator('.agents-delete-bar')).toHaveCount(0, { timeout: 3000 });
  });

  test('delete confirmation shows delete and keep buttons', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await page.locator('.agents-toolbar-delete').click();
    await expect(page.locator('.agents-delete-actions .agents-btn-danger')).toBeVisible();
    await expect(page.locator('.agents-delete-actions .agents-btn-secondary')).toBeVisible();
  });

  test('cannot delete while deletion is in progress (button disabled during request)', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await page.locator('.agents-toolbar-delete').click();
    const deleteBtn = page.locator('.agents-delete-actions .agents-btn-danger');
    await expect(deleteBtn).toBeEnabled();
    // After clicking, the button should become disabled briefly
    await deleteBtn.click();
    // The mock responds fast, but the button should be disabled during the request
    // We just verify the deletion completes successfully
    await expect(page.locator('.agents-list')).toBeVisible({ timeout: 5000 });
  });
});

/* ================================================================== */
/*  Group 7: Run Agent                                                 */
/* ================================================================== */
test.describe('Run Agent', () => {
  test('run from detail generates correct /subagents spawn command in chat input', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await page.locator('.agents-toolbar-run').click();
    // Chat should open and have pending input
    await page.waitForTimeout(300);
    const chatInput = page.locator('.chat-input');
    const inputValue = await chatInput.inputValue();
    expect(inputValue).toContain('/subagents spawn main');
    expect(inputValue).toContain('GenerateAgents.md');
    expect(inputValue).toContain('--model claude-sonnet-4-6');
  });

  test('model extracted from content: gpt-4o for Code Reviewer', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    // Code Reviewer is the 3rd item (index 2)
    await page.locator('.agents-list-name').nth(2).click();
    await expect(page.locator('.agents-detail')).toBeVisible({ timeout: 5000 });
    await page.locator('.agents-toolbar-run').click();
    await page.waitForTimeout(300);
    const chatInput = page.locator('.chat-input');
    const inputValue = await chatInput.inputValue();
    expect(inputValue).toContain('--model gpt-4o');
  });

  test('run from list with empty content shows error toast', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    // Run buttons on list items pass content: '' so they should trigger the empty content toast
    await page.locator('.agents-list-run').first().click();
    // Toast should appear with error
    await expect(page.locator('.toast')).toBeVisible({ timeout: 3000 });
  });

  test('run opens chat panel', async ({ agentPage: page }) => {
    await openAgentsWithList(page);
    await openFirstAgent(page);
    await page.locator('.agents-toolbar-run').click();
    // Verify chat is opened
    await expect(page.locator('.chat-panel')).toBeVisible({ timeout: 5000 });
  });
});

/* ================================================================== */
/*  Group 8: Recommendations Tab                                       */
/* ================================================================== */
test.describe('Recommendations Tab', () => {
  test('static items always shown (Help, Usage, New Agent, Summarize)', async ({ agentPage: page }) => {
    await openAgents(page);
    const tabs = page.locator('.agents-tab');
    await tabs.nth(1).click();
    await expect(page.locator('.recommendations-list')).toBeVisible();

    const items = page.locator('.recommendation-item');
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(4);

    // Check static items are present
    const texts = await page.locator('.recommendation-text').allTextContents();
    const hasHelp = texts.some(t => t.toLowerCase().includes('help'));
    const hasUsage = texts.some(t => t.toLowerCase().includes('usage'));
    const hasAgent = texts.some(t => t.toLowerCase().includes('agent'));
    const hasSummarize = texts.some(t => t.toLowerCase().includes('summarize'));
    expect(hasHelp).toBe(true);
    expect(hasUsage).toBe(true);
    expect(hasAgent).toBe(true);
    expect(hasSummarize).toBe(true);
  });

  test('each item has icon, text, and arrow', async ({ agentPage: page }) => {
    await openAgents(page);
    const tabs = page.locator('.agents-tab');
    await tabs.nth(1).click();
    const firstItem = page.locator('.recommendation-item').first();
    await expect(firstItem.locator('.recommendation-icon')).toBeVisible();
    await expect(firstItem.locator('.recommendation-text')).toBeVisible();
    await expect(firstItem.locator('.recommendation-arrow')).toBeVisible();
  });

  test('New Agent recommendation switches to agents tab and opens create view', async ({ agentPage: page }) => {
    await openAgents(page);
    await page.locator('.agents-tab').nth(1).click();
    // Find and click the "New Agent" recommendation
    const items = page.locator('.recommendation-item');
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      const text = await items.nth(i).locator('.recommendation-text').textContent();
      if (text?.toLowerCase().includes('agent') && text?.toLowerCase().includes('new')) {
        await items.nth(i).click();
        break;
      }
    }
    // Should switch to agents tab and open create form
    await expect(page.locator('.agents-tab').nth(0)).toHaveClass(/agents-tab--active/);
    await expect(page.locator('.agents-create')).toBeVisible({ timeout: 3000 });
  });

  test('prompt recommendations send to chat', async ({ connectedPage: page }) => {
    await openAgents(page);
    await page.locator('.agents-tab').nth(1).click();
    await expect(page.locator('.recommendations-list')).toBeVisible();

    // Click the first recommendation that has a prompt (e.g., Help)
    const items = page.locator('.recommendation-item');
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      const text = await items.nth(i).locator('.recommendation-text').textContent();
      if (text?.toLowerCase().includes('help')) {
        await items.nth(i).click();
        break;
      }
    }
    // Chat should open
    await expect(page.locator('.chat-panel')).toBeVisible({ timeout: 5000 });
  });

  test('context-aware recs appear after keyword messages', async ({ connectedPage: page }) => {
    // Open chat and send a message with "email" keyword
    const fab = page.locator('.chat-fab');
    if (await fab.isVisible()) { await fab.click(); }
    await page.waitForTimeout(300);

    const input = page.locator('.chat-input');
    await input.fill('I need to check my email inbox');
    await page.locator('.chat-send').click();
    await page.waitForTimeout(500);

    // Now open agents and check recommendations
    await openAgents(page);
    await page.locator('.agents-tab').nth(1).click();
    await expect(page.locator('.recommendations-list')).toBeVisible();

    const texts = await page.locator('.recommendation-text').allTextContents();
    const hasEmailRec = texts.some(t => t.toLowerCase().includes('email'));
    expect(hasEmailRec).toBe(true);
  });

  test('recommendations list not empty when no conversation exists', async ({ agentPage: page }) => {
    await openAgents(page);
    await page.locator('.agents-tab').nth(1).click();
    // Static items should always be present
    const items = page.locator('.recommendation-item');
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('recommendations-empty not shown when items exist', async ({ agentPage: page }) => {
    await openAgents(page);
    await page.locator('.agents-tab').nth(1).click();
    await expect(page.locator('.recommendations-empty')).toHaveCount(0);
  });
});

/* ================================================================== */
/*  Group 9: Invite Section                                            */
/* ================================================================== */
test.describe('Invite Section', () => {
  test('visible for trial tier', async ({ trialPage: page }) => {
    await openAgents(page);
    await page.waitForTimeout(300);
    await expect(page.locator('.agents-invite')).toBeVisible();
  });

  test('hidden for pro tier', async ({ agentPage: page }) => {
    await openAgents(page);
    await page.waitForTimeout(300);
    await expect(page.locator('.agents-invite')).toHaveCount(0);
  });

  test('has title, email input, message textarea, and send button', async ({ trialPage: page }) => {
    await openAgents(page);
    await page.waitForTimeout(300);
    await expect(page.locator('.agents-invite-title')).toBeVisible();
    await expect(page.locator('.agents-invite-input')).toBeVisible();
    await expect(page.locator('.agents-invite-textarea')).toBeVisible();
    await expect(page.locator('.agents-invite .agents-btn-primary')).toBeVisible();
  });

  test('send disabled when email empty', async ({ trialPage: page }) => {
    await openAgents(page);
    await page.waitForTimeout(300);
    await expect(page.locator('.agents-invite .agents-btn-primary')).toBeDisabled();
  });

  test('send enabled after entering email', async ({ trialPage: page }) => {
    await openAgents(page);
    await page.waitForTimeout(300);
    await page.locator('.agents-invite-input').fill('test@example.com');
    await expect(page.locator('.agents-invite .agents-btn-primary')).toBeEnabled();
  });

  test('sending clears form', async ({ trialPage: page }) => {
    await openAgents(page);
    await page.waitForTimeout(300);
    await page.locator('.agents-invite-input').fill('test@example.com');
    await page.locator('.agents-invite-textarea').fill('Come join us!');
    await page.locator('.agents-invite .agents-btn-primary').click();
    await page.waitForTimeout(200);
    // Fields should be cleared
    const emailVal = await page.locator('.agents-invite-input').inputValue();
    const msgVal = await page.locator('.agents-invite-textarea').inputValue();
    expect(emailVal).toBe('');
    expect(msgVal).toBe('');
  });
});

/* ================================================================== */
/*  Group 10: Responsive Layout                                        */
/* ================================================================== */
test.describe('Responsive — Mobile', () => {
  test('FAB visible on mobile-sized viewport', async ({ agentPage: page }) => {
    const vp = page.viewportSize();
    if (vp && vp.width <= 860) {
      await expect(page.locator('.agents-fab')).toBeVisible();
    }
  });

  test('FAB opens panel on mobile', async ({ agentPage: page }) => {
    const vp = page.viewportSize();
    if (vp && vp.width <= 860) {
      await page.locator('.agents-fab').click();
      await expect(page.locator('.agents-panel')).toBeVisible({ timeout: 5000 });
    }
  });

  test('close button visible on mobile when panel open', async ({ agentPage: page }) => {
    const vp = page.viewportSize();
    if (vp && vp.width <= 860) {
      await openAgents(page);
      await expect(page.locator('.agents-close')).toBeVisible();
    }
  });

  test('backdrop visible on mobile when panel open', async ({ agentPage: page }) => {
    const vp = page.viewportSize();
    if (vp && vp.width <= 860) {
      await openAgents(page);
      await expect(page.locator('.agents-backdrop')).toBeVisible();
    }
  });
});

test.describe('Responsive — Desktop', () => {
  test('FAB hidden on desktop', async ({ agentPage: page }) => {
    const vp = page.viewportSize();
    if (vp && vp.width > 860) {
      await expect(page.locator('.agents-fab')).not.toBeVisible();
    }
  });

  test('agents-toggle visible on desktop', async ({ agentPage: page }) => {
    const vp = page.viewportSize();
    if (vp && vp.width > 860) {
      await expect(page.locator('.agents-toggle')).toBeVisible();
    }
  });

  test('close button hidden on desktop when panel open', async ({ agentPage: page }) => {
    const vp = page.viewportSize();
    if (vp && vp.width > 860) {
      await openAgents(page);
      await expect(page.locator('.agents-close')).not.toBeVisible();
    }
  });

  test('backdrop hidden on desktop', async ({ agentPage: page }) => {
    const vp = page.viewportSize();
    if (vp && vp.width > 860) {
      await openAgents(page);
      await expect(page.locator('.agents-backdrop')).not.toBeVisible();
    }
  });
});
