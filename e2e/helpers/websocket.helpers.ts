import { Page } from '@playwright/test';

/**
 * Mock WebSocket that fires onclose after 100ms.
 * Useful for tests that only need auth state but not a live connection.
 */
export async function mockWebSocket(page: Page): Promise<void> {
  await page.addInitScript(() => {
    (window as any).__OriginalWebSocket = window.WebSocket;
    (window as any).WebSocket = class MockWebSocket {
      static readonly CONNECTING = 0;
      static readonly OPEN = 1;
      static readonly CLOSING = 2;
      static readonly CLOSED = 3;
      readonly CONNECTING = 0;
      readonly OPEN = 1;
      readonly CLOSING = 2;
      readonly CLOSED = 3;

      readyState = 0;
      url: string;
      onopen: ((ev: Event) => void) | null = null;
      onclose: ((ev: CloseEvent) => void) | null = null;
      onmessage: ((ev: MessageEvent) => void) | null = null;
      onerror: ((ev: Event) => void) | null = null;

      constructor(url: string) {
        this.url = url;
        setTimeout(() => {
          this.readyState = 3;
          this.onclose?.({ code: 1000, reason: 'mock', wasClean: true } as CloseEvent);
        }, 100);
      }

      send() {}
      close() {
        this.readyState = 3;
      }

      addEventListener() {}
      removeEventListener() {}
      dispatchEvent() { return false; }
    };
  });
}

/* ------------------------------------------------------------------ */
/*  Mock agents data used by the agent-aware WebSocket mocks below    */
/* ------------------------------------------------------------------ */

const MOCK_AGENTS_DATA = [
  {
    name: 'Generate Agents',
    filename: 'GenerateAgents.md',
    priority: 'high',
    content: `# Generate Agents\n**Model**: claude-sonnet-4-6\n**Priority**: high\n**Purpose**: Analyze workspace context and create/update agent definitions\n**Behavior**:\n- Read MEMORY.md and all files in the memory/ directory\n- Scan past chat sessions to identify recurring tasks\n- Create new agents or update existing ones\n**Run**: \`/subagents spawn main "Read and execute Agents/GenerateAgents.md" --model claude-sonnet-4-6\``,
  },
  {
    name: 'Email Triage',
    filename: 'EmailTriage.md',
    priority: 'high',
    content: `# Email Triage\n**Model**: claude-sonnet-4-6\n**Priority**: high\n**Purpose**: Categorize and prioritize incoming emails\n**Behavior**:\n- Scan inbox for new and unread messages\n- Label each by urgency\n- Produce a prioritized summary\n**Run**: \`/subagents spawn main "Read and execute Agents/EmailTriage.md" --model claude-sonnet-4-6\``,
  },
  {
    name: 'Code Reviewer',
    filename: 'CodeReviewer.md',
    priority: 'medium',
    content: `# Code Reviewer\n**Model**: gpt-4o\n**Priority**: medium\n**Purpose**: Review code changes for quality and issues\n**Behavior**:\n- Analyze the diff for bugs and security issues\n- Check for style violations\n- Provide constructive feedback\n**Run**: \`/subagents spawn main "Read and execute Agents/CodeReviewer.md" --model gpt-4o\``,
  },
  {
    name: 'Daily Planner',
    filename: 'DailyPlanner.md',
    priority: 'medium',
    content: `# Daily Planner\n**Model**: claude-sonnet-4-6\n**Priority**: medium\n**Purpose**: Create a structured plan for the day\n**Behavior**:\n- Review calendar events, pending tasks, and deadlines\n- Create a time-blocked daily schedule\n- Include buffer time for unexpected work\n**Run**: \`/subagents spawn main "Read and execute Agents/DailyPlanner.md" --model claude-sonnet-4-6\``,
  },
  {
    name: 'Wellness Check',
    filename: 'WellnessCheck.md',
    priority: 'low',
    content: `# Wellness Check\n**Model**: claude-sonnet-4-6\n**Priority**: low\n**Purpose**: Prompt healthy work habits and breaks\n**Behavior**:\n- Check how long since the last break\n- Suggest stretching or walking\n- Offer a brief mindfulness exercise\n**Run**: \`/subagents spawn main "Read and execute Agents/WellnessCheck.md" --model claude-sonnet-4-6\``,
  },
];

/**
 * Mock WebSocket with 5 agents, pro tier.
 * Handles all agent CRUD message types.
 */
export async function mockWebSocketWithAgents(page: Page): Promise<void> {
  await page.addInitScript((params: { tier: string; agents: typeof MOCK_AGENTS_DATA }) => {
    const { tier, agents: mockAgents } = params;

    (window as any).__OriginalWebSocket = window.WebSocket;
    (window as any).WebSocket = class MockAgentWebSocket {
      static readonly CONNECTING = 0;
      static readonly OPEN = 1;
      static readonly CLOSING = 2;
      static readonly CLOSED = 3;
      readonly CONNECTING = 0;
      readonly OPEN = 1;
      readonly CLOSING = 2;
      readonly CLOSED = 3;

      readyState = 0;
      url: string;
      onopen: ((ev: Event) => void) | null = null;
      onclose: ((ev: CloseEvent) => void) | null = null;
      onmessage: ((ev: MessageEvent) => void) | null = null;
      onerror: ((ev: Event) => void) | null = null;

      private _agents = [...mockAgents];

      constructor(url: string) {
        this.url = url;
        setTimeout(() => {
          this.readyState = 1;
          this.onopen?.({} as Event);
        }, 50);
      }

      private _respond(data: object, delay = 30) {
        setTimeout(() => {
          this.onmessage?.({ data: JSON.stringify(data) } as MessageEvent);
        }, delay);
      }

      send(data: string) {
        try {
          const msg = JSON.parse(data);

          if (msg.type === 'auth') {
            this._respond({ type: 'auth_ok', chatId: 'mock-chat-123', sessionToken: 'mock-session-token', tier, instance: { source: 'pool', startupMs: 487, region: 'us-east-1' } });
            return;
          }

          if (msg.type === 'agents_list') {
            this._respond({
              type: 'agents_list_result',
              agents: this._agents.map((a: any) => ({ name: a.name, filename: a.filename, priority: a.priority })),
            });
            return;
          }

          if (msg.type === 'agents_get') {
            const found = this._agents.find((a: any) => a.filename === msg.name || a.name === msg.name);
            if (found) {
              this._respond({ type: 'agents_get_result', name: found.name, filename: found.filename, content: found.content });
            }
            return;
          }

          if (msg.type === 'agents_save') {
            const idx = this._agents.findIndex((a: any) => a.filename === msg.name);
            if (idx !== -1) { this._agents[idx] = { ...this._agents[idx], content: msg.content }; }
            this._respond({ type: 'agents_save_result', content: msg.content });
            this._respond({
              type: 'agents_list_result',
              agents: this._agents.map((a: any) => ({ name: a.name, filename: a.filename, priority: a.priority })),
            }, 60);
            return;
          }

          if (msg.type === 'agents_delete') {
            this._agents = this._agents.filter((a: any) => a.filename !== msg.name);
            this._respond({ type: 'agents_delete_result' });
            this._respond({
              type: 'agents_list_result',
              agents: this._agents.map((a: any) => ({ name: a.name, filename: a.filename, priority: a.priority })),
            }, 60);
            return;
          }

          if (msg.type === 'agents_create') {
            const newAgent = { name: msg.name, filename: msg.name + '.md', priority: 'medium', content: msg.content };
            this._agents.push(newAgent);
            this._respond({ type: 'agents_create_result', filename: newAgent.filename });
            this._respond({
              type: 'agents_list_result',
              agents: this._agents.map((a: any) => ({ name: a.name, filename: a.filename, priority: a.priority })),
            }, 60);
            this._respond({ type: 'agents_get_result', name: newAgent.name, filename: newAgent.filename, content: newAgent.content }, 90);
            return;
          }

          if (msg.type === 'agents_sync_md') { return; }

          // Echo chat messages back as bot responses
          if (msg.text) {
            this._respond({ type: 'message', text: `Echo: ${msg.text}` }, 100);
          }
        } catch {
          // ignore non-JSON
        }
      }

      close() {
        this.readyState = 3;
        this.onclose?.({ code: 1000, reason: 'closed', wasClean: true } as CloseEvent);
      }

      addEventListener() {}
      removeEventListener() {}
      dispatchEvent() { return false; }
    };
  }, { tier: 'pro', agents: MOCK_AGENTS_DATA });
}

/**
 * Mock WebSocket with 0 agents, pro tier.
 */
export async function mockWebSocketWithEmptyAgents(page: Page): Promise<void> {
  await page.addInitScript((params: { tier: string; agents: any[] }) => {
    const { tier, agents: mockAgents } = params;

    (window as any).__OriginalWebSocket = window.WebSocket;
    (window as any).WebSocket = class MockEmptyAgentWebSocket {
      static readonly CONNECTING = 0;
      static readonly OPEN = 1;
      static readonly CLOSING = 2;
      static readonly CLOSED = 3;
      readonly CONNECTING = 0;
      readonly OPEN = 1;
      readonly CLOSING = 2;
      readonly CLOSED = 3;

      readyState = 0;
      url: string;
      onopen: ((ev: Event) => void) | null = null;
      onclose: ((ev: CloseEvent) => void) | null = null;
      onmessage: ((ev: MessageEvent) => void) | null = null;
      onerror: ((ev: Event) => void) | null = null;

      constructor(url: string) {
        this.url = url;
        setTimeout(() => {
          this.readyState = 1;
          this.onopen?.({} as Event);
        }, 50);
      }

      private _respond(data: object, delay = 30) {
        setTimeout(() => {
          this.onmessage?.({ data: JSON.stringify(data) } as MessageEvent);
        }, delay);
      }

      send(data: string) {
        try {
          const msg = JSON.parse(data);
          if (msg.type === 'auth') {
            this._respond({ type: 'auth_ok', chatId: 'mock-chat-123', sessionToken: 'mock-session-token', tier, instance: { source: 'pool', startupMs: 312, region: 'us-east-1' } });
            return;
          }
          if (msg.type === 'agents_list') {
            this._respond({ type: 'agents_list_result', agents: [] });
            return;
          }
          if (msg.text) {
            this._respond({ type: 'message', text: `Echo: ${msg.text}` }, 100);
          }
        } catch { /* ignore */ }
      }

      close() {
        this.readyState = 3;
        this.onclose?.({ code: 1000, reason: 'closed', wasClean: true } as CloseEvent);
      }

      addEventListener() {}
      removeEventListener() {}
      dispatchEvent() { return false; }
    };
  }, { tier: 'pro', agents: [] });
}

/**
 * Mock WebSocket with 5 agents, trial tier (shows invite section).
 */
export async function mockWebSocketWithAgentsTrial(page: Page): Promise<void> {
  await page.addInitScript((params: { tier: string; agents: typeof MOCK_AGENTS_DATA }) => {
    const { tier, agents: mockAgents } = params;

    (window as any).__OriginalWebSocket = window.WebSocket;
    (window as any).WebSocket = class MockTrialAgentWebSocket {
      static readonly CONNECTING = 0;
      static readonly OPEN = 1;
      static readonly CLOSING = 2;
      static readonly CLOSED = 3;
      readonly CONNECTING = 0;
      readonly OPEN = 1;
      readonly CLOSING = 2;
      readonly CLOSED = 3;

      readyState = 0;
      url: string;
      onopen: ((ev: Event) => void) | null = null;
      onclose: ((ev: CloseEvent) => void) | null = null;
      onmessage: ((ev: MessageEvent) => void) | null = null;
      onerror: ((ev: Event) => void) | null = null;

      private _agents = [...mockAgents];

      constructor(url: string) {
        this.url = url;
        setTimeout(() => {
          this.readyState = 1;
          this.onopen?.({} as Event);
        }, 50);
      }

      private _respond(data: object, delay = 30) {
        setTimeout(() => {
          this.onmessage?.({ data: JSON.stringify(data) } as MessageEvent);
        }, delay);
      }

      send(data: string) {
        try {
          const msg = JSON.parse(data);

          if (msg.type === 'auth') {
            this._respond({ type: 'auth_ok', chatId: 'mock-chat-123', sessionToken: 'mock-session-token', tier, instance: { source: 'cold_start', startupMs: 4200, region: 'us-east-1' } });
            return;
          }

          if (msg.type === 'agents_list') {
            this._respond({
              type: 'agents_list_result',
              agents: this._agents.map((a: any) => ({ name: a.name, filename: a.filename, priority: a.priority })),
            });
            return;
          }

          if (msg.type === 'agents_get') {
            const found = this._agents.find((a: any) => a.filename === msg.name || a.name === msg.name);
            if (found) {
              this._respond({ type: 'agents_get_result', name: found.name, filename: found.filename, content: found.content });
            }
            return;
          }

          if (msg.type === 'agents_save') {
            const idx = this._agents.findIndex((a: any) => a.filename === msg.name);
            if (idx !== -1) { this._agents[idx] = { ...this._agents[idx], content: msg.content }; }
            this._respond({ type: 'agents_save_result', content: msg.content });
            this._respond({
              type: 'agents_list_result',
              agents: this._agents.map((a: any) => ({ name: a.name, filename: a.filename, priority: a.priority })),
            }, 60);
            return;
          }

          if (msg.type === 'agents_delete') {
            this._agents = this._agents.filter((a: any) => a.filename !== msg.name);
            this._respond({ type: 'agents_delete_result' });
            this._respond({
              type: 'agents_list_result',
              agents: this._agents.map((a: any) => ({ name: a.name, filename: a.filename, priority: a.priority })),
            }, 60);
            return;
          }

          if (msg.type === 'agents_create') {
            const newAgent = { name: msg.name, filename: msg.name + '.md', priority: 'medium', content: msg.content };
            this._agents.push(newAgent);
            this._respond({ type: 'agents_create_result', filename: newAgent.filename });
            this._respond({
              type: 'agents_list_result',
              agents: this._agents.map((a: any) => ({ name: a.name, filename: a.filename, priority: a.priority })),
            }, 60);
            this._respond({ type: 'agents_get_result', name: newAgent.name, filename: newAgent.filename, content: newAgent.content }, 90);
            return;
          }

          if (msg.type === 'agents_sync_md') { return; }

          if (msg.text) {
            this._respond({ type: 'message', text: `Echo: ${msg.text}` }, 100);
          }
        } catch { /* ignore */ }
      }

      close() {
        this.readyState = 3;
        this.onclose?.({ code: 1000, reason: 'closed', wasClean: true } as CloseEvent);
      }

      addEventListener() {}
      removeEventListener() {}
      dispatchEvent() { return false; }
    };
  }, { tier: 'trial', agents: MOCK_AGENTS_DATA });
}

/**
 * Mock WebSocket that fires onopen + auth_ok, enabling full connected state.
 * Echoes user messages back as bot messages for chat testing.
 */
export async function mockWebSocketConnected(page: Page): Promise<void> {
  await page.addInitScript(() => {
    (window as any).__OriginalWebSocket = window.WebSocket;
    (window as any).WebSocket = class MockConnectedWebSocket {
      static readonly CONNECTING = 0;
      static readonly OPEN = 1;
      static readonly CLOSING = 2;
      static readonly CLOSED = 3;
      readonly CONNECTING = 0;
      readonly OPEN = 1;
      readonly CLOSING = 2;
      readonly CLOSED = 3;

      readyState = 0;
      url: string;
      onopen: ((ev: Event) => void) | null = null;
      onclose: ((ev: CloseEvent) => void) | null = null;
      onmessage: ((ev: MessageEvent) => void) | null = null;
      onerror: ((ev: Event) => void) | null = null;

      constructor(url: string) {
        this.url = url;
        setTimeout(() => {
          this.readyState = 1;
          this.onopen?.({} as Event);
        }, 50);
      }

      send(data: string) {
        try {
          const msg = JSON.parse(data);
          // Respond to auth with auth_ok
          if (msg.type === 'auth') {
            setTimeout(() => {
              this.onmessage?.({
                data: JSON.stringify({
                  type: 'auth_ok',
                  chatId: 'mock-chat-123',
                  sessionToken: 'mock-session-token',
                  tier: 'pro',
                  instance: { source: 'pool', startupMs: 487, region: 'us-east-1' },
                }),
              } as MessageEvent);
            }, 30);
            return;
          }
          // Echo chat messages back as bot responses
          if (msg.text) {
            setTimeout(() => {
              this.onmessage?.({
                data: JSON.stringify({
                  type: 'message',
                  text: `Echo: ${msg.text}`,
                }),
              } as MessageEvent);
            }, 100);
          }
        } catch {
          // ignore non-JSON
        }
      }

      close() {
        this.readyState = 3;
        this.onclose?.({ code: 1000, reason: 'closed', wasClean: true } as CloseEvent);
      }

      addEventListener() {}
      removeEventListener() {}
      dispatchEvent() { return false; }
    };
  });
}
