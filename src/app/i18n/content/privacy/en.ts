export const PRIVACY_EN = `
## Who We Are

xShopper Pty Ltd ("xShopper", "we", "us") operates the xAI Workspace service, accessible via xAI Workspace.
Data controller: xShopper Pty Ltd, Australia.
Contact: privacy@xshopper.com

---

## What Personal Data We Collect

When you use xAI Workspace, we collect:

- **xAI Workspace user identifier** (chat_id) — your unique xAI Workspace ID, used to identify your account throughout the service
- **Google account data** — if you sign in with Google, we receive your email address, display name, and profile picture from Google via OAuth 2.0. We use this data solely to create and identify your account. We do not access your Google contacts, files, or any other Google service data.
- **Email address** — if you register, sign in with Google, or are invited, we store your email to manage your account and send service communications
- **IP addresses** — your dedicated server instance's IP addresses, used to route your messages
- **Payment data** — subscription amounts, dates, Stripe customer ID, and last 4 digits of payment card (payment card details are held by Stripe, not by us)
- **Token usage data** — daily and monthly AI token consumption
- **AI conversation content** — the messages you send to your AI agent
- **Language preference** — your Telegram language setting, detected automatically to set the bot's communication language

---

## Anonymity

We cannot provide anonymous or pseudonymous access to xAI Workspace. The platform provisions dedicated server infrastructure and processes subscription payments, which require persistent identification. This is permitted under Australian Privacy Principle 2.2 (impracticability exception).

---

## Why We Process Your Data and the Legal Basis

| Purpose | Legal basis |
|---|---|
| Providing the AI agent service (account setup, routing messages, managing your subscription) | GDPR Art. 6(1)(b) — performance of a contract; APP 3 — reasonably necessary for service |
| Billing and payment processing | GDPR Art. 6(1)(b) — performance of a contract; APP 3 — reasonably necessary |
| Usage monitoring and budget enforcement | GDPR Art. 6(1)(b) — performance of a contract; APP 3 — reasonably necessary |
| Sending service notifications (usage alerts, renewal reminders) | GDPR Art. 6(1)(b) — performance of a contract |
| Authenticating your identity via Google OAuth | GDPR Art. 6(1)(b) — performance of a contract; APP 3 — reasonably necessary for service |
| Sending invite emails on your behalf | GDPR Art. 6(1)(a) — consent (you initiate the /invite command) |
| Security monitoring and abuse prevention | GDPR Art. 6(1)(f) — legitimate interests |

---

## Who We Share Your Data With

We use the following third-party processors to deliver the service:

- **Google** (United States) — identity provider for Google Sign-In (OAuth 2.0); we receive your email, name, and profile picture to authenticate your account. Google may also process conversation content if you select a Gemini model.
- **Telegram** (Netherlands / UAE) — delivers messages between you and your AI agent
- **Anthropic** (United States) — primary AI model provider; processes your conversation content to generate AI responses
- **OpenAI** (United States) — optional AI model provider; processes conversation content if you select an OpenAI model
- **Groq** (United States) — optional AI model provider; processes conversation content if you select a Groq model
- **Mistral AI** (France) — optional AI model provider; processes conversation content if you select a Mistral model
- **Stripe** (United States) — handles all payment processing
- **Neon** (United States) — hosts our database
- **Amazon Web Services** (Australia and United States) — hosts infrastructure in Sydney (ap-southeast-2) and N. Virginia (us-east-1)

We do not sell your personal data.

---

## International Transfers and Overseas Disclosure

xShopper Pty Ltd is an Australian company. Your personal data is transferred to, and processed in, the following countries:

| Country | Recipients | Data transferred |
|---|---|---|
| **Australia** | AWS (Sydney, ap-southeast-2) | All data — primary hosting region |
| **United States** | Google (OAuth, Gemini), Anthropic, OpenAI, Groq, AWS (us-east-1), Neon, Stripe | Google account data (login), AI conversations, account data, payment data |
| **France** | Mistral AI | AI conversations (if Mistral model selected) |
| **Netherlands / UAE** | Telegram | Messages, user identifiers |

**For Australian users (Privacy Act 1988):** Under Australian Privacy Principle 8, xShopper takes reasonable steps to ensure overseas recipients handle your personal information in accordance with the APPs. By using this service and consenting at signup, you acknowledge that your data will be transferred to the countries listed above, and that Australian Privacy Principles may not apply to data held by overseas recipients. You may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) if you believe your information has been mishandled.

**For EU/EEA users (GDPR):** Transfers to the United States are covered by Standard Contractual Clauses and, where available, the EU-US Data Privacy Framework. Transfers to France (Mistral AI) do not require additional safeguards (EU member state).

---

## How Long We Keep Your Data

- Account data (including Google profile data): retained while your account is active and for 30 days after cancellation
- Google OAuth tokens: stored encrypted; deleted immediately upon account deletion or when you disconnect Google
- Payment records: retained for 7 years as required by Australian tax law
- AI conversation content: stored on your dedicated server instance; deleted when your instance is terminated
- Usage logs: retained for 90 days
- API usage records: retained for 90 days

---

## Third-Party Personal Information

When using xAI Workspace, you may share personal information about other individuals (such as colleagues, clients, or contacts) in your conversations with the AI agent.

- xShopper Pty Ltd does not actively collect or solicit personal information about third parties. Any such information is provided solely at your discretion.
- You are responsible for ensuring you have appropriate authority, consent, or legal basis to share any third-party personal data with the service.
- Conversation data containing third-party personal information is processed solely to deliver the AI agent service and is not used for any other purpose.
- Third-party personal data shared in conversations is subject to the same retention and deletion policies as your own data (see "How Long We Keep Your Data" above).
- To request deletion of conversations containing third-party personal information, use the \`/workspace reset\` command inside xAI Workspace, or contact us at privacy@xshopper.com.

---

## Your Rights

### Australian Users (Privacy Act 1988)

Under the Australian Privacy Principles, you have the right to:

- **Access** your personal information (APP 12)
- **Correct** inaccurate or out-of-date information (APP 13)
- **Request deletion** of your personal information
- **Complain** to the Office of the Australian Information Commissioner (OAIC) — [oaic.gov.au](https://www.oaic.gov.au)

### EU/EEA and UK Users (GDPR)

You have the following rights under GDPR:

- **Right to access** — request a copy of your personal data
- **Right to rectification** — request correction of inaccurate data
- **Right to erasure** — request deletion of your personal data
- **Right to restriction** — request that we limit how we process your data
- **Right to data portability** — receive your data in a structured, machine-readable format
- **Right to object** — object to processing based on legitimate interests

You also have the right to lodge a complaint with your local supervisory authority.

### How to Exercise Your Rights

You can exercise several of these rights directly inside xAI Workspace:

- Send \`/my_data\` to export your personal data
- Send \`/delete_my_data\` to request deletion of all your data
- Send \`/email\` to update your email address

For other requests, contact us at privacy@xshopper.com. We will respond within 30 days.

---

## Contact & Correction Rights

For privacy enquiries or to exercise your rights, contact us at:

**privacy@xshopper.com**
xShopper Pty Ltd, Australia

**Correction rights (APP 13):** Under Australian Privacy Principle 13, you have the right to request correction of personal data we hold about you that is inaccurate, out-of-date, incomplete, irrelevant, or misleading. To request a correction, email privacy@xshopper.com with a description of the information to be corrected and the correct information. We will respond within 30 days.

---

## Complaints

- **Australia:** Office of the Australian Information Commissioner (OAIC), [oaic.gov.au](https://www.oaic.gov.au), Phone: 1300 363 992
- **EU/EEA:** Your local supervisory authority

---

## Contact

Privacy enquiries: privacy@xshopper.com
xShopper Pty Ltd, Australia
Australian Trademark No. 1749660 (Class 35)

*Privacy Policy version: 2026-02-28*
`;
