export interface Article {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  category: 'getting-started' | 'features' | 'guides';
  content: string;
}

export const ARTICLES: Article[] = [
  // ── Getting Started ─────────────────────────────────────────────
  {
    id: 'welcome',
    title: 'Welcome to OpenClaw',
    subtitle: 'Your personal AI agent on Telegram',
    icon: '👋',
    category: 'getting-started',
    content: `
**OpenClaw** gives you a dedicated AI agent accessible right inside Telegram — no apps to install, no accounts to create.

## How it works

1. **Start the bot** — Send \`/start\` to begin. You'll get a free trial instantly.
2. **Just chat** — Send any message and your AI agent will respond. It understands context, can help with research, writing, coding, and more.
3. **Your own instance** — Unlike shared AI chatbots, you get a dedicated agent that runs on its own server with persistent memory.

## What makes OpenClaw different

- **Private** — Your conversations stay on your dedicated instance
- **Persistent** — Your agent remembers context across sessions
- **Powerful** — Powered by Claude, one of the most capable AI models
- **Simple** — It's just Telegram. No new apps, no learning curve
    `,
  },
  {
    id: 'first-steps',
    title: 'First Steps',
    subtitle: 'Set up your agent in 60 seconds',
    icon: '🚀',
    category: 'getting-started',
    content: `
## 1. Start the bot

Open Telegram and send \`/start\` to **@OpenClawBot**. Your free trial begins immediately — no credit card needed.

## 2. Wait for provisioning

Your dedicated AI instance takes about 2 minutes to set up. You'll receive a notification when it's ready.

## 3. Send your first message

Just type anything! Try:
- "What can you help me with?"
- "Summarise the latest news about AI"
- "Write a Python script that sorts a list"

## 4. Explore commands

- \`/usage\` — Check your token balance
- \`/models\` — Switch between AI models
- \`/billing\` — Manage your subscription
- \`/ssh\` — Get SSH access to your instance
- \`/help\` — See all available commands
    `,
  },

  // ── Features ────────────────────────────────────────────────────
  {
    id: 'models',
    title: 'AI Models',
    subtitle: 'Choose the right model for your task',
    icon: '🧠',
    category: 'features',
    content: `
OpenClaw supports multiple AI models. Switch between them with \`/models\`.

## Available Models

| Model | Best for |
|-------|----------|
| **Claude Sonnet** | Everyday tasks — fast, capable, balanced |
| **Claude Opus** | Complex reasoning, research, long documents |
| **Claude Haiku** | Quick answers, simple tasks, lowest cost |

## Switching models

1. Send \`/models\` in the chat
2. Tap the model you want to use
3. A ✓ appears next to your active model

Your selection persists across sessions. You can switch anytime.

## Token usage

Different models consume tokens at different rates. Opus uses more tokens per response than Haiku. Check your balance with \`/usage\`.
    `,
  },
  {
    id: 'ssh-access',
    title: 'SSH Access',
    subtitle: 'Connect directly to your instance',
    icon: '🔑',
    category: 'features',
    content: `
Every OpenClaw instance comes with SSH access for advanced users.

## Getting your key

1. Send \`/ssh\` in the Telegram chat
2. You'll receive a \`.pem\` private key file and connection details
3. Save the file to your computer

## Connecting

\`\`\`bash
# Set permissions (required)
chmod 600 openclaw.pem

# Connect
ssh -i openclaw.pem ubuntu@<your-host-ip>
\`\`\`

## What you can do

- Browse your persisted files in \`/home/ubuntu\`
- Check agent logs
- Install additional tools
- Run scripts alongside your AI agent

## Security

- Key-based authentication only — passwords are disabled
- Each client gets a unique ED25519 keypair
- Root login is disabled
    `,
  },
  {
    id: 'billing',
    title: 'Plans & Billing',
    subtitle: 'Subscriptions, tokens, and payments',
    icon: '💳',
    category: 'features',
    content: `
## Plans

| Plan | Price | Tokens |
|------|-------|--------|
| **Trial** | Free | 50K |
| **Essential** | $100/mo | 750K |
| **Professional** | $300/mo | 3M |
| **Enterprise** | $600/mo | 8M |

## Managing your subscription

Send \`/billing\` to open the billing dashboard where you can:
- View your current plan and renewal date
- Upgrade or downgrade
- Enable auto top-up for extra token packs
- Update your payment method

## Token packs

Running low? Enable **auto top-up** in \`/billing\` to automatically purchase extra tokens when you hit your limit.

## Payment history

Send \`/invoices\` to view all past payments and receipts.
    `,
  },

  // ── Guides ──────────────────────────────────────────────────────
  {
    id: 'productivity',
    title: 'Productivity Tips',
    subtitle: 'Get the most from your AI agent',
    icon: '⚡',
    category: 'guides',
    content: `
## Be specific

Instead of "help me write an email", try:
> "Write a professional email to my client John declining the Friday meeting. Suggest Tuesday or Wednesday instead. Keep it brief and friendly."

## Use context

Your agent remembers the conversation. Build on previous messages:
1. "Analyse this CSV data: ..."
2. "Now create a chart showing the monthly trend"
3. "Add a summary paragraph for the executive team"

## Choose the right model

- **Quick question?** → Haiku (fastest, cheapest)
- **Everyday work?** → Sonnet (default, balanced)
- **Complex analysis?** → Opus (most capable)

Switch with \`/models\`.

## Monitor usage

Check \`/usage\` regularly to track your token consumption. The progress bar shows your monthly allocation.

## Hibernation

Your instance hibernates automatically when idle to save resources. Just send any message to wake it up — it takes about 30 seconds.
    `,
  },
  {
    id: 'referrals',
    title: 'Invite Friends',
    subtitle: 'Earn bonus tokens with referrals',
    icon: '🎁',
    category: 'guides',
    content: `
## How it works

1. Send \`/invite\` to generate your personal referral link
2. Share the link with friends
3. When they make their first payment, you get **200K bonus tokens**

## Rules

- Up to **5 referrals per month**
- Bonus tokens are added to your current balance immediately
- Your friend gets the standard free trial
- Referral link never expires

## Sharing

Your referral link works as a standard Telegram deep link. Just forward it in any chat or post it anywhere.
    `,
  },
];
