# Lawful Basis Mapping and Legitimate Interest Assessment

**Platform:** OpenClaw SME
**Operator:** xShopper Pty Ltd (ABN required), Sydney, Australia
**Document version:** 1.0
**Prepared:** 2026-02-22
**Review date:** 2027-02-22 (annual review required)
**GDPR Articles:** Art. 5(1)(a), Art. 6, Art. 7, Art. 9, Art. 13

---

> **Legal disclaimer:** This document is a technical compliance assessment prepared to support legal review. It does not constitute legal advice. It should be reviewed by qualified legal counsel admitted in a relevant EU/EEA jurisdiction and in Australia before being relied upon for compliance purposes.

---

## 1. Introduction

This document records the lawful basis relied upon for each personal data processing activity conducted by xShopper Pty Ltd ("xShopper", "we", "the Controller") in operating the OpenClaw SME platform. It also contains the Legitimate Interest Assessment (LIA) required wherever Art. 6(1)(f) is relied upon.

GDPR Art. 6 requires that every processing activity have at least one valid lawful basis from the following list:
- **(a)** Consent of the data subject
- **(b)** Necessary for performance of a contract with the data subject
- **(c)** Compliance with a legal obligation
- **(d)** Protection of vital interests
- **(e)** Public task
- **(f)** Legitimate interests of the Controller or a third party

Where Art. 6(1)(f) is relied upon, a three-part Legitimate Interest Assessment is required: (1) purpose test — is the interest legitimate? (2) necessity test — is processing necessary to achieve it? (3) balancing test — do the data subject's interests override the Controller's?

---

## 2. Lawful Basis Mapping Table

### 2.1 Service Delivery — Account Provisioning and Management

| Attribute | Detail |
|---|---|
| Processing activity | Creating and managing a client account: recording Telegram `chat_id`, allocating a dedicated EC2 instance and port, storing status, tier, and subscription lifecycle data in `oc_clients` |
| Personal data involved | `chat_id` (primary identifier), EC2 instance ID, private IP, public IP, port, status, tier, subscription dates, region |
| Data subjects | OpenClaw SME clients (natural persons) |
| **Lawful basis** | **Art. 6(1)(b) — Necessary for the performance of a contract to which the data subject is a party** |
| Rationale | The Terms of Service constitute a contract for the provision of the OpenClaw AI agent service. It is technically impossible to provision an isolated agent instance without recording these identifiers and infrastructure details. This processing is intrinsic to service delivery. |
| Dependency | Requires a valid, accepted Terms of Service before any processing commences. The first-run consent gate in `src/webhook/user-flow.js` implements this acceptance. |

---

### 2.2 Service Delivery — Authentication and Message Routing

| Attribute | Detail |
|---|---|
| Processing activity | Validating the Telegram webhook secret, routing incoming messages to the correct client's OpenClaw gateway via WebSocket, returning responses to the correct Telegram chat |
| Personal data involved | `chat_id`, message content (chat messages forwarded to OpenClaw), gateway password (`gw_password`), instance token (`instance_token`) |
| Data subjects | OpenClaw SME clients |
| **Lawful basis** | **Art. 6(1)(b) — Necessary for the performance of a contract** |
| Rationale | The core contracted service is the delivery of AI agent responses to the client in their Telegram chat. This processing is the direct technical mechanism by which that service is delivered; it cannot be separated from service performance. |

---

### 2.3 AI Conversation Processing

| Attribute | Detail |
|---|---|
| Processing activity | Forwarding chat message content to the OpenClaw gateway, which in turn submits it to LiteLLM and then to the selected AI model provider (primarily Anthropic, optionally Groq, OpenAI, Mistral, or Google Gemini) to generate a response |
| Personal data involved | Full conversation content (may include any information the user chooses to share with their AI agent, including business data, personal information, and sensitive topics) |
| Data subjects | OpenClaw SME clients |
| **Lawful basis** | **Art. 6(1)(b) — Necessary for the performance of a contract** |
| Rationale | The entire purpose of the contracted service is to provide AI-powered agent responses. Transmitting the user's message to an AI model and returning the response is the core contractual obligation. No alternative lawful basis is available or appropriate; the user enters the conversation specifically to receive AI processing of their input. |
| Special category data risk | Conversations may inadvertently contain special category data (Art. 9) such as health information, political opinions, or data concerning the user's professional matters. No special category processing is actively solicited. The Privacy Policy should note this risk and disclaim systematic processing of special category data. A supplementary Art. 9(2)(a) explicit consent mechanism should be considered before launching (see Section 4 below). |
| Retention | Conversation history is stored on EFS at `/mnt/efs/{chatId}/` for the duration of the service contract. Deleted on account termination. |

---

### 2.4 Billing — Payment Processing and Subscription Management

| Attribute | Detail |
|---|---|
| Processing activity | Creating a Stripe customer and subscription, recording Stripe customer ID, subscription ID, payment intent ID, payment amounts, currencies, and periods in `oc_payments` and `oc_clients`; processing Stripe webhooks for subscription lifecycle events |
| Personal data involved | `chat_id`, Stripe customer ID, Stripe subscription ID, Stripe payment intent ID, payment amounts, currencies, subscription periods; email address transmitted to Stripe for customer creation |
| Data subjects | OpenClaw SME clients |
| **Lawful basis** | **Art. 6(1)(b) — Necessary for the performance of a contract** (subscription tiers require payment); **Art. 6(1)(c) — Compliance with a legal obligation** (financial record-keeping under Australian tax law — Taxation Administration Act 1953, GST Act 1999) |
| Retention | Payment records retained for 7 years under Art. 6(1)(c) / Australian tax law, even if Art. 6(1)(b) purpose ends. Automated deletion at 7 years via `billing.purgeOldPayments()`. |

---

### 2.5 Spend and Usage Tracking

| Attribute | Detail |
|---|---|
| Processing activity | Recording daily AI model spend (in USD) and request counts per client in `oc_spend_daily`; syncing LiteLLM spend data to Neon DB every 60 seconds via the spend-sync scheduler |
| Personal data involved | `chat_id`, daily spend (USD), token counts, request counts |
| Data subjects | OpenClaw SME clients |
| **Lawful basis** | **Art. 6(1)(b) — Necessary for the performance of a contract** (spend tracking is necessary to enforce tier budget limits and trigger auto-renewals, which are contractual obligations) and **Art. 6(1)(f) — Legitimate interests** (see LIA-1 below for the Art. 6(1)(f) analysis) |
| Retention | 90 days, purged automatically by `billing.purgeOldSpendRecords()` |

**LIA-1: Spend Tracking — Legitimate Interest Assessment**

*Purpose test:* xShopper has a legitimate commercial interest in accurately tracking AI model spend per client to: (i) prevent over-spend beyond contracted budgets, (ii) enforce fair usage (daily and weekly caps), (iii) trigger budget alerts and auto-top-up, (iv) generate accurate invoice data, and (v) detect and prevent fraudulent or abusive usage patterns. These are genuine operational and financial management interests of a SaaS provider.

*Necessity test:* The processing is necessary. The spend data is derived directly from LiteLLM's usage reporting and cannot practically be aggregated at a less granular level while still enforcing per-client daily and weekly caps. Aggregation at a longer interval would defeat the purpose. No less intrusive alternative exists given the technical architecture.

*Balancing test:* The spend data is not sensitive personal data (it reveals financial consumption within the service, not health, beliefs, or other sensitive attributes). Data subjects are informed of this tracking in the Privacy Policy. They would reasonably expect a paid SaaS service to track their consumption. The data is retained for only 90 days. The processing does not cause adverse effects on data subjects — it operates in their interest (prevents unexpected charges). The Controller's interests are not overridden by data subject interests. **Assessment: legitimate interest prevails.**

---

### 2.6 Budget Alerts

| Attribute | Detail |
|---|---|
| Processing activity | Sending Telegram messages to clients when their token usage reaches 85%, 95%, and 100% of their monthly budget; recording alert flags in `oc_clients` to prevent duplicate alerts |
| Personal data involved | `chat_id`, alert flag fields (`alert_85_sent`, `alert_95_sent`, `alert_100_sent`), current spend percentage |
| Data subjects | OpenClaw SME clients |
| **Lawful basis** | **Art. 6(1)(b) — Necessary for the performance of a contract** (the contract includes budget management; alerts are service notifications required to prevent service interruption) and **Art. 6(1)(f) — Legitimate interests** (see LIA-2) |

**LIA-2: Budget Alerts — Legitimate Interest Assessment**

*Purpose test:* Both xShopper and the client have a legitimate interest in the client being informed before their budget is exhausted. xShopper's interests: reduce support burden, prevent silent service interruption, enable voluntary top-up. Client's interests: avoid unexpected service cutoff.

*Necessity test:* Alert flags must be stored per client to prevent the client receiving identical alerts repeatedly. This is minimal and necessary processing.

*Balancing test:* The processing is transparently disclosed. It benefits the data subject. No adverse effects. **Assessment: legitimate interest prevails.**

---

### 2.7 Subscription Lifecycle Management

| Attribute | Detail |
|---|---|
| Processing activity | Automated renewal checking (1-hour scheduler), sending 3-day and 1-day renewal reminder messages, attempting Stripe invoice charges, suspending accounts after 7 days of non-payment, terminating accounts after 37 days |
| Personal data involved | `chat_id`, subscription dates, payment status flags, renewal attempt count |
| Data subjects | OpenClaw SME clients |
| **Lawful basis** | **Art. 6(1)(b) — Necessary for the performance of a contract** (the subscription Terms of Service define renewal, suspension, and termination as contractual terms) |

---

### 2.8 Referral / Invite System

| Attribute | Detail |
|---|---|
| Processing activity | Creating an invite record linking an inviter's `chat_id` to a recipient's email address in `oc_invites`; sending the invite email via AWS SES; recording when an invite is used and when the referral reward credit is applied |
| Personal data involved | Inviter `chat_id` (`invited_by`); recipient email address; claimant `chat_id` (`used_by`); invite timestamps and credit status |
| Data subjects | OpenClaw SME clients (inviters); third-party email recipients (potential new clients) |
| **Lawful basis — inviter data** | **Art. 6(1)(b) — Necessary for the performance of a contract** (the invite/reward system is a contractual feature; tracking is required to apply the 200K token credit correctly and enforce the 5/month cap) |
| **Lawful basis — recipient email** | **Art. 6(1)(f) — Legitimate interests** (see LIA-3) |
| Retention | Invite records retained while either party has an active account; deleted on GDPR erasure of inviter or claimant. |

**LIA-3: Invite Recipient Email Address — Legitimate Interest Assessment**

*Purpose test:* xShopper processes the recipient's email address solely to deliver a single invite email and to verify that the same address is not repeatedly invited. This is a standard commercial communication practice.

*Necessity test:* The email address is the only practically available identifier for a third party who is not yet a user. Storage is limited to the minimum needed.

*Balancing test:* The recipient is being contacted at the specific request of someone they know (the inviter). The email is a single transactional message with clear origin. Recipients retain a right to object (Art. 21) and to erasure (Art. 17). The Privacy Policy must disclose this processing and provide a contact for opt-out. The processing does not cause significant adverse effects. **Assessment: legitimate interest prevails, subject to providing a clear opt-out mechanism in the invite email.**

*Safeguard required:* The invite email (sent by `emailer.js`) must include an opt-out mechanism and a statement that the recipient's email address will not be further used for marketing without consent. This is already partially addressed by the email footer update.

---

### 2.9 Email Address Collection

| Attribute | Detail |
|---|---|
| Processing activity | Collecting and storing a client's email address in `oc_users` via the `/email` Telegram command; associating the email with their `chat_id`; transmitting the email to Stripe for customer creation |
| Personal data involved | `chat_id`, email address |
| Data subjects | OpenClaw SME clients |
| **Lawful basis** | **Art. 6(1)(b) — Necessary for the performance of a contract** (email is required for Stripe customer creation and for service-related communications including subscription receipts); **Art. 6(1)(f) — Legitimate interests** for the invite/referral function (see LIA-3) |

---

### 2.10 SSH Key Generation and Delivery

| Attribute | Detail |
|---|---|
| Processing activity | Generating an ed25519 SSH keypair during EC2 cloud-init; uploading the private key to S3 (`ssh-keys/{region}/{chatId}.pem`); creating a Route 53 DNS record (`{chatId}.ssh.xaiworkspace.com`); delivering the private key to the client via Telegram on `/ssh` command |
| Personal data involved | SSH private key (credential), Route 53 DNS hostname (contains `chat_id`) |
| Data subjects | OpenClaw SME clients |
| **Lawful basis** | **Art. 6(1)(b) — Necessary for the performance of a contract** (SSH access to the dedicated instance is a contracted technical feature of the service; the key is the access credential) |
| Security note | SSH keys deleted from S3 on EC2 termination and on GDPR erasure. DNS records removed on termination. |

---

### 2.11 Infrastructure Logging — CloudWatch

| Attribute | Detail |
|---|---|
| Processing activity | Logging operational events (client provisioning events, errors, spend sync results) to AWS CloudWatch Logs; log streams keyed by `chatId` |
| Personal data involved | `chat_id` (in log stream names), operational status messages; IP addresses were previously logged but have been removed |
| Data subjects | OpenClaw SME clients |
| **Lawful basis** | **Art. 6(1)(f) — Legitimate interests** (see LIA-4) |
| Retention | 90 days, enforced by CloudWatch log group retention policy in `.ebextensions/03_cloudwatch_retention.config` |

**LIA-4: Operational Logging — Legitimate Interest Assessment**

*Purpose test:* Operational logging is a legitimate interest of xShopper for: diagnosing service failures, investigating security incidents, auditing provisioning workflows, and maintaining service quality. It is also a standard expectation of any cloud-hosted service.

*Necessity test:* Identifying log entries by client is necessary to diagnose client-specific issues. The `chatId` is the only available identifier for this purpose. No less intrusive alternative exists.

*Balancing test:* Clients are informed of this logging via the Privacy Policy. The data logged is operational status rather than conversation content. 90-day retention limits the data lifecycle. IP addresses have been removed. **Assessment: legitimate interest prevails.**

---

### 2.12 Service Improvement and Abuse Prevention

| Attribute | Detail |
|---|---|
| Processing activity | Monitoring aggregate spend patterns, detecting anomalous usage, managing rate limits via LiteLLM |
| Personal data involved | Aggregated spend data, request rates |
| Data subjects | OpenClaw SME clients |
| **Lawful basis** | **Art. 6(1)(f) — Legitimate interests** (see LIA-5) |

**LIA-5: Abuse Prevention — Legitimate Interest Assessment**

*Purpose test:* xShopper has a legitimate interest in preventing misuse of the platform (e.g., excessive automated requests, attempts to circumvent spend limits, fraudulent account creation). This protects both xShopper's commercial interests and the interests of legitimate clients who share the infrastructure.

*Necessity test:* Rate limit enforcement requires per-client request rate data (handled by LiteLLM natively). Minimal additional processing.

*Balancing test:* Processing is proportionate and disclosed. Adverse effects on legitimate users are absent — rate limiting only affects excessive usage. **Assessment: legitimate interest prevails.**

---

### 2.13 Marketing Communications

| Attribute | Detail |
|---|---|
| Processing activity | Sending email communications about new features, promotional offers, or service updates to registered email addresses |
| Personal data involved | Email address, `chat_id` |
| Data subjects | OpenClaw SME clients |
| **Lawful basis** | **Art. 6(1)(a) — Consent** |
| Consent requirement | Explicit opt-in is required before sending any marketing email. This consent must be separate from the Terms of Service acceptance. **As of this document, no marketing email functionality exists in the codebase** (only transactional invite emails are sent). This row is prospective: if marketing emails are ever introduced, a consent mechanism must be implemented before they are sent. |
| Note | The existing invite email sent by `emailer.js` is a transactional service communication (at the request of an existing client), not a marketing email. It does not require separate consent but must include an opt-out mechanism. |

---

### 2.14 Financial Record-Keeping

| Attribute | Detail |
|---|---|
| Processing activity | Retaining payment records in `oc_payments` for financial reporting and tax compliance |
| Personal data involved | `chat_id`, payment amounts, currencies, Stripe identifiers, periods |
| Data subjects | OpenClaw SME clients |
| **Lawful basis** | **Art. 6(1)(c) — Compliance with a legal obligation** (Australian Taxation Administration Act 1953; GST Act 1999 — financial records must be retained for 5 years minimum; 7-year retention applied as a conservative standard) |
| Note | This basis continues after the service contract ends. Payment records may therefore be retained after account deletion, for up to 7 years from the date of the transaction. |

---

## 3. Special Category Data Assessment

GDPR Art. 9 applies to processing of "special categories" of personal data: health data, racial or ethnic origin, political opinions, religious beliefs, trade union membership, genetic data, biometric data, sex life or sexual orientation, and data relating to criminal convictions.

**Assessment:** xShopper does not actively solicit, collect, or process special category data. However, AI conversation content is unstructured user input and may contain special category data if a user volunteers it (e.g., asking the AI about a health condition, or discussing political matters). This creates a risk of incidental processing.

**Recommendation:** The Privacy Policy should:
1. Expressly note that users should not share special category data through the service.
2. State that xShopper does not purposefully process special category data.
3. Note that any special category data shared by the user is processed under Art. 9(2)(a) — explicit consent, which is inferred from the deliberate act of the user inputting that data into their private agent.

**Action required before launch:** Add a specific clause to the Privacy Policy and Terms of Service regarding special category data and AI conversation content.

---

## 4. Consent Mechanism Assessment (Where Art. 6(1)(a) Is Relied Upon)

The first-run consent gate implemented in `src/webhook/user-flow.js` presents the Privacy Policy and Terms of Service to new users via Telegram inline keyboard buttons ("Accept & Continue" / "Decline"). This consent mechanism is assessed against GDPR Art. 7 requirements:

| GDPR Art. 7 Requirement | Assessment |
|---|---|
| Freely given | Compliant — user can decline without consequence; the "Decline" path sends a polite rejection message and does not provision any resources. |
| Specific | Partially compliant — the consent covers the ToS and Privacy Policy as a whole. Separate granular consent for each processing purpose is not implemented. For the primary purposes (Art. 6(1)(b) — contract), this is acceptable as consent is not the relied-upon basis. |
| Informed | Compliant — the Privacy Policy discloses all processing activities, processors, and data subject rights. |
| Unambiguous | Compliant — the user must actively tap "Accept & Continue"; pre-ticked checkboxes or passive consent are not used. |
| Withdrawal | Requires verification — the `/delete_my_data` command constitutes withdrawal of consent and erasure. The Privacy Policy should expressly state that withdrawal of consent can be achieved by using `/delete_my_data`. |
| Records of consent | Gap — there is no mechanism to record the timestamp or version of the Privacy Policy at which consent was given. This must be added (see Recommendations below). |

---

## 5. Recommendations and Required Actions

### Immediate (Before Launch)

1. **Record consent timestamps:** When a user taps "Accept & Continue" in the first-run gate, record in `oc_clients` or `oc_users`: the timestamp, and the version of the Privacy Policy accepted. Add a `consent_accepted_at TIMESTAMPTZ` and `privacy_policy_version TEXT` column.

2. **Special category data clause:** Add to Privacy Policy and Terms of Service: explicit notice that special category data should not be submitted and that any submitted is processed incidentally under Art. 9(2)(a) explicit consent.

3. **Invite email opt-out:** Ensure the invite email sent by `emailer.js` includes a statement that the recipient's email address was provided by a mutual contact and that no further use will be made without their own consent. Include a contact email for erasure requests.

4. **Marketing consent gate:** If any marketing communications are ever introduced, implement a separate opt-in checkbox at the point of email collection (`/email` command flow) — not bundled with the ToS acceptance.

5. **Withdrawal of consent wording:** The Privacy Policy should state clearly that withdrawing consent for data processing can be done at any time by using `/delete_my_data`, and that withdrawal does not affect the lawfulness of processing before the withdrawal.

### Within 30 Days of Launch

6. **Art. 6(1)(c) retention notice:** The Privacy Policy should note that payment records are retained for 7 years after the contract ends to comply with Australian tax law, notwithstanding any erasure request for other data.

7. **Annual LIA review:** Schedule an annual review of all LIA assessments (LIA-1 through LIA-5) to ensure the balancing test conclusions remain valid as the platform scales.

---

*This document is a technical compliance assessment and does not constitute legal advice. It should be reviewed by qualified legal counsel before being relied upon for compliance purposes.*
