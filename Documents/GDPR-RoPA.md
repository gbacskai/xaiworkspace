# Records of Processing Activities (RoPA)

**Controller:** xShopper Pty Ltd, Sydney, Australia
**Platform:** OpenClaw SME
**Document version:** 1.0
**Prepared:** 2026-02-22
**Review date:** 2027-02-22 (annual review required; also review upon material change)
**GDPR Article:** Art. 30 — Records of processing activities

---

> **Legal disclaimer:** This document is a technical compliance assessment and does not constitute legal advice. It should be reviewed by qualified legal counsel. GDPR Art. 30(4) requires that the RoPA be made available to the supervisory authority on request.

---

## 1. Controller Details

| Field | Detail |
|---|---|
| Controller name | xShopper Pty Ltd |
| ABN | [To be confirmed] |
| Registered address | Sydney, New South Wales, Australia |
| Privacy contact | [To be designated before launch — email required] |
| Data Protection Officer | Not appointed — see `Documents/GDPR-DPO-Assessment.md` |
| Representative in EU/EEA | Not yet appointed — required under Art. 27 if offering services to EU/EEA data subjects systematically |

**Note on Art. 27 Representative:** If the platform serves EU/EEA data subjects, xShopper must designate a representative in the EU/EEA under GDPR Art. 27. This is distinct from a DPO. An Art. 27 representative is the point of contact for EU/EEA supervisory authorities and data subjects. This is a pre-launch requirement if EU/EEA users are to be accepted.

---

## 2. Records of Processing Activities

### RoPA-1: Service Delivery — Account Provisioning and Management

| Field | Detail |
|---|---|
| **Record ID** | RoPA-1 |
| **Processing activity name** | Account Provisioning and Management |
| **Purpose** | Create and manage a dedicated AI agent instance for each client; record account status, tier, and subscription lifecycle |
| **Legal basis** | Art. 6(1)(b) — Performance of a contract |
| **Categories of data subjects** | OpenClaw SME clients — SME business operators who are natural persons |
| **Categories of personal data** | Telegram `chat_id`, EC2 instance ID, private IP address, public IP address, port number, account status, subscription tier, subscription start/end dates, LiteLLM virtual key, gateway password, instance token, preferred AI model, region, auto-purchase flag, currency preference, renewal attempt count, renewal notification flags |
| **Recipients** | AWS (EC2, EFS, S3, CloudWatch, Route 53, Secrets Manager) — processor; Neon PostgreSQL — processor |
| **Third-country transfers** | AWS us-east-1 (US) for Americas region clients. Transfer mechanism: AWS DPA + SCCs or DPF. |
| **Retention period** | Duration of service contract. On account termination: EC2 instance terminated, EFS data deleted, database record deleted, S3 SSH key deleted. |
| **Security measures** | AWS VPC isolation; IMDSv2 enforced on EC2; EBS encryption at rest; HTTPS for all API communications; AWS Secrets Manager for production secrets; access controls via IAM; admin endpoint requires `x-admin-key` |
| **Relevant document** | `Documents/GDPR-Lawful-Basis-Mapping.md` — Section 2.1 |

---

### RoPA-2: Message Routing and AI Conversation Processing

| Field | Detail |
|---|---|
| **Record ID** | RoPA-2 |
| **Processing activity name** | AI Conversation Processing |
| **Purpose** | Receive chat messages from Telegram, forward to the client's dedicated OpenClaw AI agent, submit to the selected AI model provider via LiteLLM, and return the AI response to the client via Telegram |
| **Legal basis** | Art. 6(1)(b) — Performance of a contract (the contracted service is AI agent delivery) |
| **Categories of data subjects** | OpenClaw SME clients |
| **Categories of personal data** | `chat_id`; full unstructured conversation content (may include any personal, business, financial, health, or legal information the data subject chooses to share); AI model responses; conversation history stored on EFS |
| **Recipients** | Anthropic (US) — primary AI model processor; Groq (US) — optional; OpenAI (US) — optional; Mistral (France, EU) — optional; Google (US) — optional; AWS EFS (ap-southeast-2 / us-east-1) — storage processor; Telegram (Netherlands) — platform through which messages are delivered |
| **Third-country transfers** | Anthropic (US): DPA + SCCs or DPF required — see `Documents/GDPR-Transfer-Impact-Assessment.md`. Groq (US), OpenAI (US), Google (US): SCCs or DPF. Mistral (France): no transfer issue for EU/EEA data subjects. |
| **Retention period** | Conversation history on EFS: duration of service contract. Deleted on account termination (`/delete_my_data`) or service cancellation. Anthropic's API: per Anthropic DPA — verify retention period. |
| **Security measures** | HTTPS to Anthropic API (TLS in transit); EFS per-client isolation (bind-mounted per `chat_id`); Telegram webhook validation (`X-Telegram-Bot-Api-Secret-Token`); gateway authentication (random password per client); IMDSv2 on EC2 instances. Note: internal WebSocket (router to gateway) currently unencrypted — remediation pending (HIGH-2). |
| **Special category data risk** | Conversations may incidentally contain special category data. Not actively solicited. Assessed under Art. 9(2)(a) as explicit consent inferred from deliberate user input. Privacy Policy should disclose this. |
| **Relevant document** | `Documents/GDPR-DPIA.md` Risk 1 and Risk 2; `Documents/GDPR-Transfer-Impact-Assessment.md` |

---

### RoPA-3: Billing and Payment Processing

| Field | Detail |
|---|---|
| **Record ID** | RoPA-3 |
| **Processing activity name** | Payment Processing and Subscription Management |
| **Purpose** | Process subscription payments, manage subscription lifecycle (renewal, suspension, termination), maintain payment records for financial reporting and tax compliance |
| **Legal basis** | Art. 6(1)(b) — Performance of a contract (payment is required for paid tiers); Art. 6(1)(c) — Legal obligation (financial record retention under Australian tax law) |
| **Categories of data subjects** | OpenClaw SME clients |
| **Categories of personal data** | `chat_id`, email address, Stripe customer ID, Stripe subscription ID, Stripe payment intent ID, payment amounts, currencies, subscription periods, card last 4 digits (fetched from Stripe, never stored in application DB), auto-purchase preference |
| **Recipients** | Stripe (US) — payment processor; Neon PostgreSQL (US) — database processor; AWS SES (ap-southeast-2) — email service for transaction-related notifications |
| **Third-country transfers** | Stripe (US): DPA + DPF or SCCs. Neon (US): DPA + SCCs. |
| **Retention period** | Stripe subscription records: retained by Stripe per Stripe's data retention policy (verify in DPA). Internal payment records (`oc_payments`): 7 years from transaction date (tax compliance), then automated deletion via `billing.purgeOldPayments()`. Payment records are retained for the legal obligation period even after account deletion. |
| **Security measures** | Stripe Checkout — card data never touches xShopper servers; PCI-DSS scope limited to Stripe's infrastructure; Stripe webhook signature verification (`stripe.webhooks.constructEvent()`); Stripe webhook secret required (fail-closed); idempotency key for extra pack charges to prevent double-billing |
| **Relevant document** | `Documents/GDPR-Lawful-Basis-Mapping.md` — Sections 2.4 and 2.14 |

---

### RoPA-4: Spend and Usage Tracking

| Field | Detail |
|---|---|
| **Record ID** | RoPA-4 |
| **Processing activity name** | AI Model Spend and Usage Tracking |
| **Purpose** | Track per-client daily AI model spend and request counts to enforce budget limits, generate usage dashboards, trigger budget alerts, and support subscription renewal decisions |
| **Legal basis** | Art. 6(1)(b) — Performance of a contract (budget enforcement is a contractual feature); Art. 6(1)(f) — Legitimate interests (see `Documents/GDPR-Lawful-Basis-Mapping.md` LIA-1) |
| **Categories of data subjects** | OpenClaw SME clients |
| **Categories of personal data** | `chat_id`, date, spend in USD, token count, request count |
| **Recipients** | Neon PostgreSQL (US) — database processor; LiteLLM (local process on EB) — generates spend data |
| **Third-country transfers** | Neon (US): DPA + SCCs. |
| **Retention period** | 90 days from the date of the spend record. Automated deletion via `billing.purgeOldSpendRecords()` (daily scheduler). Deleted immediately on GDPR erasure request. |
| **Security measures** | Neon PostgreSQL with TLS (`rejectUnauthorized: true`); access restricted to application DB user; admin endpoint access requires `x-admin-key` |
| **Relevant document** | `Documents/GDPR-Lawful-Basis-Mapping.md` — Section 2.5 |

---

### RoPA-5: Budget Alert Processing

| Field | Detail |
|---|---|
| **Record ID** | RoPA-5 |
| **Processing activity name** | Budget Alert Notifications |
| **Purpose** | Send Telegram messages to clients when token usage reaches 85%, 95%, and 100% of monthly budget; prevent duplicate alerts via flag fields |
| **Legal basis** | Art. 6(1)(b) — Performance of a contract; Art. 6(1)(f) — Legitimate interests (see LIA-2) |
| **Categories of data subjects** | OpenClaw SME clients |
| **Categories of personal data** | `chat_id`, alert flag fields (`alert_85_sent`, `alert_95_sent`, `alert_100_sent`), current spend percentage |
| **Recipients** | Telegram (Netherlands) — message delivery platform; Neon PostgreSQL (US) — database |
| **Third-country transfers** | Neon (US): DPA + SCCs. Telegram (Netherlands): assessed separately — platform routing. |
| **Retention period** | Alert flags stored in `oc_clients` for duration of subscription period; reset at each subscription renewal. Deleted on GDPR erasure. |
| **Security measures** | Same as RoPA-1 (account management security) |

---

### RoPA-6: Subscription Lifecycle Management

| Field | Detail |
|---|---|
| **Record ID** | RoPA-6 |
| **Processing activity name** | Subscription Renewal, Suspension, and Termination |
| **Purpose** | Automated renewal checking, sending renewal reminder messages, initiating Stripe invoice charges, suspending accounts on non-payment, terminating accounts after extended non-payment |
| **Legal basis** | Art. 6(1)(b) — Performance of a contract (subscription lifecycle is defined in the Terms of Service) |
| **Categories of data subjects** | OpenClaw SME clients |
| **Categories of personal data** | `chat_id`, subscription dates, renewal notification flags, renewal attempt count, payment status |
| **Recipients** | Stripe (US) — payment retry; Neon PostgreSQL (US) — database; Telegram (Netherlands) — notification delivery |
| **Third-country transfers** | Stripe (US), Neon (US): DPAs required. |
| **Retention period** | Duration of subscription; flags reset on renewal. Deleted on account termination or GDPR erasure. |
| **Security measures** | Same as RoPA-1; Stripe API key stored in AWS Secrets Manager |
| **Automated decision-making** | Yes — accounts are automatically suspended (day 7) and terminated (day 37) without individual human review. Multi-warning period (3-day, 1-day notifications) precedes automated action. Disclosed in Terms of Service. |
| **Relevant document** | `Documents/GDPR-DPIA.md` Risk 3 |

---

### RoPA-7: Referral and Invite System

| Field | Detail |
|---|---|
| **Record ID** | RoPA-7 |
| **Processing activity name** | Referral Invite Creation and Reward Processing |
| **Purpose** | Enable existing clients to invite contacts via email; track invite status; apply 200K token referral reward credit when an invited user makes their first payment |
| **Legal basis** | Art. 6(1)(b) — Contract (for inviter's data and reward tracking); Art. 6(1)(f) — Legitimate interests (for recipient's email — see LIA-3) |
| **Categories of data subjects** | OpenClaw SME clients (inviters); email recipients (potential new clients — not yet platform users) |
| **Categories of personal data** | Inviter `chat_id`, recipient email address (normalised), claimant `chat_id`, invite timestamps, credit application status and date |
| **Recipients** | AWS SES (ap-southeast-2) — email delivery; Neon PostgreSQL (US) — database |
| **Third-country transfers** | Neon (US): DPA + SCCs. SES in ap-southeast-2: no transfer (Australia). |
| **Retention period** | Invite records retained while either party has an active account. On inviter's GDPR erasure: all invites sent by that user deleted. On claimant's GDPR erasure: `used_by` and `used_at` fields anonymised (set to NULL). |
| **Security measures** | Email normalisation to prevent duplicate invites; invite ID is a UUID; invite emails do not disclose inviter's identity (remediated — HIGH-6) |
| **Opt-out mechanism** | Invite email includes contact email for erasure requests. Recipients who do not sign up have no further data use. |
| **Relevant document** | `Documents/GDPR-Lawful-Basis-Mapping.md` — Section 2.8 |

---

### RoPA-8: Email Address Collection

| Field | Detail |
|---|---|
| **Record ID** | RoPA-8 |
| **Processing activity name** | Client Email Address Collection and Storage |
| **Purpose** | Collect and store client email address for Stripe customer creation and service-related communications |
| **Legal basis** | Art. 6(1)(b) — Performance of a contract |
| **Categories of data subjects** | OpenClaw SME clients |
| **Categories of personal data** | `chat_id`, email address (normalised) |
| **Recipients** | Stripe (US) — email transmitted for customer creation; Neon PostgreSQL (US) — database; AWS SES (ap-southeast-2) — for any service emails |
| **Third-country transfers** | Stripe (US): DPA + DPF or SCCs. Neon (US): DPA + SCCs. |
| **Retention period** | Duration of service contract. Deleted on GDPR erasure. |
| **Security measures** | Database access controls; Neon TLS |

---

### RoPA-9: SSH Key Generation and Delivery

| Field | Detail |
|---|---|
| **Record ID** | RoPA-9 |
| **Processing activity name** | SSH Keypair Generation, Storage, and Delivery |
| **Purpose** | Generate an SSH keypair per client EC2 instance; store private key in S3 for retrieval; deliver private key to client on `/ssh` command; create DNS record for SSH hostname |
| **Legal basis** | Art. 6(1)(b) — Performance of a contract (SSH access is a technical feature of the service) |
| **Categories of data subjects** | OpenClaw SME clients |
| **Categories of personal data** | SSH private key (credential); `chat_id` embedded in S3 key path (`ssh-keys/{region}/{chatId}.pem`) and Route 53 hostname (`{chatId}.ssh.xaiworkspace.com`) |
| **Recipients** | AWS S3 (ap-southeast-2 / us-east-1) — key storage; AWS Route 53 — DNS; Telegram — file delivery channel |
| **Third-country transfers** | AWS us-east-1 (US) for Americas region: DPA + SCCs. |
| **Retention period** | SSH key deleted from S3 on EC2 termination or GDPR erasure. Route 53 record deleted on termination. |
| **Security measures** | S3 bucket access restricted to EB role via IAM; private key transmitted via Telegram HTTPS; ed25519 key type; SSH hardening: password auth disabled, pubkey only, root login disabled |
| **Residual risk** | Key stored in S3 between provisioning and termination. Improvement recommended: delete key from S3 immediately after successful delivery. |
| **Relevant document** | `Documents/GDPR-DPIA.md` Risk 5 |

---

### RoPA-10: Operational Logging — CloudWatch

| Field | Detail |
|---|---|
| **Record ID** | RoPA-10 |
| **Processing activity name** | CloudWatch Operational Log Collection |
| **Purpose** | Record operational events (provisioning, billing, spend sync, errors) for service monitoring, debugging, and incident response |
| **Legal basis** | Art. 6(1)(f) — Legitimate interests (see LIA-4) |
| **Categories of data subjects** | OpenClaw SME clients |
| **Categories of personal data** | `chat_id` (in log stream names and some log events); operational status messages; timestamps |
| **Recipients** | AWS CloudWatch Logs (ap-southeast-2) — storage processor |
| **Third-country transfers** | None for ap-southeast-2. If CloudWatch data is accessed from us-east-1: AWS DPA covers. |
| **Retention period** | 90 days, enforced by CloudWatch log group retention policy (`.ebextensions/03_cloudwatch_retention.config`) |
| **Security measures** | IAM access controls on CloudWatch; logs do not contain conversation content; IP addresses removed from logs (remediated — HIGH-3) |
| **Relevant document** | `Documents/GDPR-Lawful-Basis-Mapping.md` — Section 2.11 |

---

### RoPA-11: Data Subject Rights Fulfillment

| Field | Detail |
|---|---|
| **Record ID** | RoPA-11 |
| **Processing activity name** | Data Subject Rights Request Processing |
| **Purpose** | Process and fulfil requests under GDPR Chapter III: access (Art. 15), portability (Art. 20), erasure (Art. 17), rectification (Art. 16) |
| **Legal basis** | Art. 6(1)(c) — Legal obligation (GDPR requires rights fulfilment) |
| **Categories of data subjects** | Any data subject who submits a rights request |
| **Categories of personal data** | All personal data held for that data subject across all RoPA entries |
| **Recipients** | None (rights requests are internal processing only) |
| **Third-country transfers** | None |
| **Retention period** | Log of rights requests retained for documentation purposes for 3 years (evidence of compliance) |
| **Mechanisms** | `/my_data` — Art. 15 access and Art. 20 portability (JSON export); `/delete_my_data` — Art. 17 erasure with confirmation dialog; `/email` — Art. 16 rectification for email address; admin `DELETE /admin/client/:chatId` — admin-side erasure |
| **Security measures** | Commands require authentication via Telegram bot session (`chat_id` must match); erasure requires explicit confirmation dialog |

---

## 3. Third-Party Processor Summary

| Processor | RoPA Records | Jurisdiction | DPA Status | Transfer Mechanism |
|---|---|---|---|---|
| AWS | RoPA-1, 2, 3, 9, 10 | ap-southeast-2 + us-east-1 | Not started | DPA + SCCs / DPF |
| Neon PostgreSQL | RoPA-1, 3, 4, 5, 6, 7, 8 | US | Not started (DPA available at neon.tech/dpa) | SCCs |
| Anthropic | RoPA-2 | US | Not started | SCCs / DPF (verify certification) |
| Stripe | RoPA-3, 6, 8 | US | Not started | DPF + SCCs |
| Telegram | RoPA-2, 5, 6, 9 | Netherlands / Global | Not started | Independent controller assessment pending |
| Cloudflare | RoPA-1 (DNS) | US / Global | Not started | DPF + SCCs |
| Groq | RoPA-2 (optional) | US | Not started | SCCs |
| OpenAI | RoPA-2 (optional) | US | Not started | DPF + SCCs |
| Mistral | RoPA-2 (optional) | France (EU) | Not started | No transfer required (EU) |
| Google (Gemini) | RoPA-2 (optional) | US | Not started | DPF + SCCs |
| AWS SES | RoPA-7 | ap-southeast-2 | Covered by AWS DPA | No transfer (AU) |

---

## 4. Data Retention Summary

| Data Category | Table / Storage | Retention | Mechanism |
|---|---|---|---|
| Client account data | `oc_clients` | Duration of service contract | Deleted via `/delete_my_data` or admin erasure |
| User email | `oc_users` | Duration of service contract | Deleted via `/delete_my_data` |
| Invite records | `oc_invites` | While either party has active account | Deleted/anonymised on erasure |
| Payment records | `oc_payments` | 7 years from transaction date | Automated via `billing.purgeOldPayments()` |
| Daily spend | `oc_spend_daily` | 90 days | Automated via `billing.purgeOldSpendRecords()` |
| Token packs | `oc_token_packs` | 7 years (financial records) | Automated via `billing.purgeOldPayments()` |
| CloudWatch logs | Log groups | 90 days | CloudWatch retention policy |
| S3 backups | EFS backup bucket | 90 days | S3 lifecycle rule |
| SSH private keys | S3 `ssh-keys/` | Until termination | `provisioner.terminate()` deletes |
| EFS workspace | `/mnt/efs/{chatId}/` | Duration of service contract | Deleted on termination/erasure |
| Conversation content (Anthropic) | Anthropic systems | Per Anthropic DPA — TBC | Anthropic data deletion |

---

## 5. Maintenance Requirements

This RoPA must be updated:
- When a new processing activity is introduced
- When a processor is added, removed, or changed
- When data categories change
- When retention periods change
- When transfer mechanisms change
- At minimum annually

**RoPA owner:** xShopper Pty Ltd — designated privacy contact (to be appointed before launch)
**Next mandatory review:** 2027-02-22

---

*This document is a technical compliance assessment and does not constitute legal advice. The RoPA must be made available to supervisory authorities on request under GDPR Art. 30(4).*
