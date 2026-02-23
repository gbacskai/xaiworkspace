# Data Protection Impact Assessment (DPIA)

**Platform:** OpenClaw SME
**Operator / Controller:** xShopper Pty Ltd, Sydney, Australia
**Document version:** 1.0
**Prepared:** 2026-02-22
**Review date:** 2027-02-22 (or upon material change to processing activities)
**GDPR Article:** Art. 35 — Data Protection Impact Assessment

---

> **Legal disclaimer:** This document is a technical compliance assessment prepared to support legal review. It does not constitute legal advice. Critical findings should be reviewed by qualified legal counsel admitted in a relevant EU/EEA jurisdiction and in Australia before this platform goes live with EU/EEA data subjects.

---

## 1. Introduction and Scope

GDPR Art. 35(1) requires a DPIA where a type of processing is "likely to result in a high risk to the rights and freedoms of natural persons." Art. 35(3) specifies that a DPIA is required in particular where there is:

- Systematic and extensive evaluation of personal aspects based on automated processing (Art. 35(3)(a))
- Large-scale processing of special categories of data (Art. 35(3)(b))
- Systematic monitoring of a publicly accessible area (Art. 35(3)(c))

The European Data Protection Board (EDPB) Guidelines 09/2022 on DPIA also identify "innovative use of new technological solutions" as a high-risk trigger, which applies to AI agent processing.

This DPIA covers the following processing operations conducted by OpenClaw SME:

1. Large-scale automated AI processing of personal data (conversation content)
2. Payment data processing and international transfer to Stripe (US)
3. International transfer of conversation content to Anthropic (US) and optional AI model providers
4. Automated subscription lifecycle decisions (suspension and termination)
5. SSH credential generation, storage, and delivery

---

## 2. Description of Processing Operations

### 2.1 Controller Details

**Controller:** xShopper Pty Ltd
**Address:** Sydney, Australia
**Contact:** To be confirmed — privacy contact email required before launch
**Jurisdiction:** Australia (Australian Privacy Act 1988 applies); GDPR applies for EU/EEA data subjects

### 2.2 Nature of Processing

OpenClaw SME operates a managed SaaS platform that assigns each business client a dedicated AI agent powered by Anthropic Claude (or alternative models) accessible through a Telegram bot interface. The service involves:

- **Automated processing at scale:** Every conversation is processed by an AI language model. The system generates responses without human review. This constitutes systematic and automated processing under Art. 35(3)(a).
- **Unstructured personal data input:** Conversation content is freeform and may contain any personal, financial, health, legal, or business-sensitive information the user chooses to share with their agent.
- **Persistent storage of conversation history:** Agent memory and project files are stored indefinitely on AWS EFS at `/mnt/efs/{chatId}/` for the duration of the service, and may include MEMORY.md files, project files, and other AI-generated outputs referencing personal matters.
- **Cross-border transmission:** Conversation content is transmitted to Anthropic's US API for processing on every interaction.
- **Automated financial decisions:** The subscription lifecycle scheduler automatically suspends and terminates accounts based on payment status without human review.

### 2.3 Purpose of Processing

- Primary purpose: Deliver AI agent assistance to SME business clients via Telegram
- Secondary purposes: Billing, spend tracking, subscription management, service integrity, abuse prevention

### 2.4 Data Subjects

SME business clients who are natural persons using Telegram. The platform is B2B; data subjects are the individual business operators or employees using the service, not their end customers. Invite recipients are a secondary category of data subject.

### 2.5 Personal Data Categories Processed

| Category | Data Elements | Sensitivity |
|---|---|---|
| Identity / Contact | Telegram `chat_id`, email address | Low–Medium |
| Financial / Payment | Stripe customer ID, subscription ID, payment intent ID, amounts, currencies, periods | Medium |
| Network / Infrastructure | Private IP, public IP, port assignments | Low |
| Behavioral / Usage | Daily spend, token counts, request counts, preferred AI model, subscription lifecycle timestamps | Low |
| AI Conversation Content | Full unstructured conversation text — may contain anything the user types | Medium–High (unpredictable) |
| Credentials | SSH private key (temporary), LiteLLM API key, gateway password | High (credential) |
| EFS Workspace | Persisted agent memory files, project files, MEMORY.md — content is AI-generated but may reference personal information disclosed in conversation | Medium–High |

### 2.6 Recipients / Processors

| Processor | Data Received | Jurisdiction |
|---|---|---|
| Anthropic | Full conversation content | United States |
| AWS | Infrastructure data, all personal data at rest | ap-southeast-2 + us-east-1 |
| Neon PostgreSQL | All DB tables (oc_clients, oc_users, oc_invites, oc_payments, oc_spend_daily, oc_token_packs) | United States (AWS) |
| Stripe | Email, Stripe IDs, payment data, `chat_id` in metadata | United States |
| Telegram | `chat_id`, message content (bot API) | Netherlands (Global) |
| Cloudflare | IP addresses, DNS traffic | Global |
| Groq | Conversation content (if user selects Groq model) | United States |
| OpenAI | Conversation content (if user selects OpenAI model) | United States |
| Mistral | Conversation content (if user selects Mistral model) | France (EU) |
| Google Gemini | Conversation content (if user selects Gemini model) | United States |
| AWS SES | Inviter and recipient email addresses | ap-southeast-2 |

---

## 3. High-Risk Trigger Assessment

### 3.1 EDPB Nine-Criteria Checklist

The EDPB DPIA Guidelines state that if a processing operation satisfies two or more of the following criteria, a DPIA should be conducted as a rule.

| Criterion | Applies? | Evidence |
|---|---|---|
| 1. Evaluation or scoring (profiling) | Partial | Spend tracking and tier management create a basic behavioral profile per client |
| 2. Automated decision-making with significant effects | Yes | Automated subscription suspension and termination without human review (`src/schedulers/renewal.js`) |
| 3. Systematic monitoring | No | No monitoring of public areas |
| 4. Sensitive data or data of a highly personal nature | Partial | AI conversations may contain health, financial, or legal information |
| 5. Data processed at large scale | Yes | Platform designed to serve multiple SME clients simultaneously; AI model API calls are large-scale automated processing |
| 6. Matching or combining datasets | No | No cross-system dataset matching |
| 7. Data concerning vulnerable data subjects | No | B2B service for business operators |
| 8. Innovative use or application of new technological solutions | Yes | Deploying AI large language models to process personal conversations is a new technology application |
| 9. Data transfers across borders preventing exercise of rights | Yes | Conversation content transferred to US-based Anthropic; data subjects may be in EU/EEA |

**Score: 5 out of 9 criteria satisfied. DPIA is mandatory.**

---

## 4. Necessity and Proportionality Assessment

### 4.1 Purposes are Legitimate and Specified

The processing serves specific, explicit, and legitimate purposes (see `Documents/GDPR-Lawful-Basis-Mapping.md`). There is no purpose that lacks a clear legitimate basis.

### 4.2 Data Minimisation Assessment

| Processing Activity | Data Collected | Minimisation Assessment |
|---|---|---|
| Account provisioning | `chat_id`, IP, port, tier, status | Compliant — minimum required for service |
| Billing | Stripe IDs, amounts, currency | Compliant — minimum required for payment processing |
| Conversation forwarding | Full message text | Compliant — the AI model requires the full message; no reduction is possible without defeating the service purpose |
| Logging | `chat_id`, event type, timestamps | Compliant — IP addresses removed from logs per remediation |
| Invite system | Recipient email, inviter `chat_id` | Compliant — email is the only available contact method |
| SSH key storage | Private key, `chat_id` in path | Marginal risk — key is deleted after delivery or on termination. Consider extending the auto-delete to occur upon delivery (immediately after the `/ssh` command completes), rather than only on termination |

### 4.3 Proportionality of AI Processing

AI conversation content processing is proportionate because:
- The user actively initiates each conversation
- The user chose the service specifically to benefit from AI processing of their input
- No conversation content is retained by the AI model provider beyond what their DPA allows
- Conversation history on EFS is isolated per client (no cross-client data access)
- The user can delete all stored data at any time via `/delete_my_data`

### 4.4 Retention Proportionality

| Data | Retention Period | Basis | Assessment |
|---|---|---|---|
| `oc_spend_daily` | 90 days | Art. 5(1)(e) | Proportionate |
| `oc_payments` | 7 years | Legal obligation (tax) | Proportionate |
| CloudWatch logs | 90 days | Art. 5(1)(e) | Proportionate |
| S3 backups | 90 days | Art. 5(1)(e) | Proportionate |
| SSH keys | Until termination | Service contract | Marginal — consider earlier deletion |
| EFS workspace | Duration of contract | Art. 6(1)(b) | Acceptable with clear termination policy |
| Conversation history (EFS) | Duration of contract | Art. 6(1)(b) | Acceptable — deleted on erasure request |

---

## 5. Risk Identification and Assessment

### Risk Assessment Methodology

Risks are scored on two axes: **likelihood** (1=remote, 2=possible, 3=likely) and **severity** (1=minor, 2=significant, 3=severe). A **risk score** is likelihood × severity (1–9). Risks scoring 6+ are high risk.

---

### Risk 1: Conversation Content Exposure via Unencrypted Internal WebSocket

**Description:** Conversation content is forwarded from the router to the OpenClaw gateway via an unencrypted WebSocket (`ws://` not `wss://`) over the VPC private network. An attacker who gains access to the VPC network (e.g., via a compromised adjacent EC2 instance or VPC Flow Log capture) could intercept conversation content.

| Attribute | Value |
|---|---|
| Likelihood | 2 — Possible (requires VPC access) |
| Severity | 3 — Severe (conversation content may include sensitive business and personal data) |
| **Risk Score** | **6 — High** |
| Current mitigation | Traffic is within AWS VPC (not public internet); VPC network isolation provides partial protection |
| Residual risk | Elevated — VPC is not equivalent to end-to-end encryption |
| **Recommendation** | Upgrade to `wss://` with TLS on the OpenClaw gateway. This is recorded as HIGH-2 in the GDPR Audit. This is a pre-launch blocker for EU/EEA data subjects. |

---

### Risk 2: International Transfer of Conversation Content to Anthropic (US) Without Documented Safeguard

**Description:** Every conversation processed by the primary AI model (Anthropic Claude) is transmitted to Anthropic's US API. No signed DPA or Standard Contractual Clauses (SCCs) are in place. Without a valid transfer mechanism, this violates GDPR Art. 44–46 for EU/EEA data subjects.

| Attribute | Value |
|---|---|
| Likelihood | 3 — Likely (this occurs on every conversation) |
| Severity | 3 — Severe (GDPR Art. 83(5)(c) — fines up to 4% global turnover or EUR 20M) |
| **Risk Score** | **9 — Critical** |
| Current mitigation | None documented |
| Residual risk | Critical — no lawful transfer mechanism in place |
| **Recommendation** | Execute Anthropic's DPA and SCCs immediately. See `Documents/GDPR-Transfer-Impact-Assessment.md`. Pre-launch blocker. |

---

### Risk 3: Automated Termination Decisions Without Human Review

**Description:** The renewal scheduler (`src/schedulers/renewal.js`) automatically suspends accounts after 7 days of non-payment and terminates accounts after 37 days, including deleting all data. These are automated decisions with significant effect on the data subject (loss of all AI agent data, access, and subscription).

| Attribute | Value |
|---|---|
| Likelihood | 2 — Possible (occurs for any failed payment) |
| Severity | 2 — Significant (loss of service and data) |
| **Risk Score** | **4 — Medium** |
| Current mitigation | Multi-day warning progression (3-day and 1-day renewal reminder messages sent first) |
| Residual risk | Medium |
| **Recommendation** | (1) Terms of Service must clearly disclose the termination timeline and its consequences, including data deletion. (2) At the point of automated termination, offer the user one final 24-hour warning before data deletion. (3) Consider S3 backup export before final deletion as a grace mechanism. |

---

### Risk 4: EFS Workspace Data Persistence Beyond User Expectation

**Description:** The EFS workspace at `/mnt/efs/{chatId}/` stores AI agent memory files, project files, and conversation history. Users may not understand that their conversations are persisted as structured files (MEMORY.md, Projects/) rather than being ephemeral. This creates a risk of disclosure if the EFS volume is improperly accessed or if a backup is compromised.

| Attribute | Value |
|---|---|
| Likelihood | 2 — Possible |
| Severity | 2 — Significant |
| **Risk Score** | **4 — Medium** |
| Current mitigation | EFS is per-client (bind-mounted as `/home/ubuntu` on dedicated EC2); not shared. 90-day S3 backup retention. S3 backups deleted on GDPR erasure. |
| Residual risk | Medium |
| **Recommendation** | Privacy Policy should explicitly describe EFS workspace storage and what files are created. Users should be informed in the consent gate that their AI agent retains a persistent memory. |

---

### Risk 5: SSH Private Key Exposure via Telegram Delivery

**Description:** The `/ssh` command retrieves the client's EC2 SSH private key from S3 and delivers it as a Telegram file attachment. This means the private key traverses Telegram's infrastructure (Netherlands HQ, global CDN). If Telegram's infrastructure is compromised, the private key could be intercepted.

| Attribute | Value |
|---|---|
| Likelihood | 1 — Remote |
| Severity | 3 — Severe (SSH key allows full access to the client's EC2 instance) |
| **Risk Score** | **3 — Low–Medium** |
| Current mitigation | Telegram uses HTTPS for API; keys are delivered to the authenticated bot session only. Key deleted on termination. |
| Residual risk | Low–Medium |
| **Recommendation** | (1) Delete the S3 key immediately after delivery (not just on termination). (2) Document this delivery mechanism in the Privacy Policy. (3) Consider whether SSH key delivery via Telegram is an appropriate channel for the risk level, or whether an alternative (e.g., authenticated web download) would be more appropriate. |

---

### Risk 6: Personal Data in EC2 UserData (LiteLLM API Key)

**Description:** The LiteLLM virtual API key for each client is injected into the EC2 instance via cloud-init UserData. UserData is stored in EC2 metadata and accessible via the instance metadata service. Although IMDSv2 is enforced, the key remains in UserData in base64-encoded form.

| Attribute | Value |
|---|---|
| Likelihood | 2 — Possible (requires access to instance metadata or EC2 API) |
| Severity | 2 — Significant (API key could allow impersonation of the client's spend budget) |
| **Risk Score** | **4 — Medium** |
| Current mitigation | IMDSv2 enforced. Key variable unset after use in cloud-init. Init log truncated. |
| Residual risk | Medium — UserData remains in EC2 metadata after completion |
| **Recommendation** | Migrate to AWS Secrets Manager per-client secret injection. This is documented as a medium-term action in the remediation roadmap. |

---

### Risk 7: Data Breach Notification Capability

**Description:** The platform currently has no documented breach detection or notification procedure. GDPR Art. 33 requires notification to the supervisory authority within 72 hours of becoming aware of a breach.

| Attribute | Value |
|---|---|
| Likelihood | 2 — Possible (any SaaS may experience a breach) |
| Severity | 3 — Severe (regulatory non-compliance; potential fines up to EUR 10M or 2% global turnover under Art. 83(4)) |
| **Risk Score** | **6 — High** |
| Current mitigation | None |
| Residual risk | High |
| **Recommendation** | Implement breach response plan. See `Documents/GDPR-Breach-Response-Plan.md`. |

---

### Risk 8: Optional AI Model Providers — Varying Compliance Postures

**Description:** Users can select alternative AI models (Groq, OpenAI, Mistral, Google Gemini). Each involves an international transfer to a different processor. The compliance posture (DPA existence, data retention policies, SCC status) of each varies. Users selecting non-default models may trigger transfers without an established safeguard.

| Attribute | Value |
|---|---|
| Likelihood | 2 — Possible |
| Severity | 2 — Significant |
| **Risk Score** | **4 — Medium** |
| Current mitigation | DeepSeek and Alibaba DashScope removed entirely from model list. |
| Residual risk | Medium |
| **Recommendation** | (1) Execute DPAs with all remaining optional providers. (2) Disclose in Privacy Policy that model selection affects which processor receives conversation content. (3) At the point of model selection (via `/models`), present a brief disclosure of the destination processor. |

---

## 6. Risk Summary and Residual Risk Register

| Risk | Score | Residual After Mitigation | Status |
|---|---|---|---|
| R1: Unencrypted internal WebSocket | 6 — High | Medium (if TLS implemented) | Open — pre-launch blocker for EU/EEA |
| R2: Anthropic transfer without safeguard | 9 — Critical | Low (if DPA + SCCs executed) | Open — pre-launch blocker |
| R3: Automated termination decisions | 4 — Medium | Low (with ToS disclosure + grace period) | Partially mitigated |
| R4: EFS workspace data persistence | 4 — Medium | Low (with Privacy Policy disclosure) | Partially mitigated |
| R5: SSH key delivery via Telegram | 3 — Low–Medium | Low (with immediate S3 deletion) | Partially mitigated |
| R6: LiteLLM key in EC2 UserData | 4 — Medium | Low (with Secrets Manager migration) | Partially mitigated |
| R7: No breach notification procedure | 6 — High | Low (with breach plan implemented) | Open |
| R8: Optional model provider transfers | 4 — Medium | Low (with DPAs executed) | Open |

---

## 7. Measures to Address Identified Risks

### Measure M1: Encrypted Internal WebSocket (GDPR Art. 32(1)(a))
**Risk addressed:** R1
**Action:** Implement TLS on the OpenClaw gateway process. Change `gateway.js` to connect via `wss://`. This requires generating and installing a TLS certificate on each client EC2 instance during provisioning.
**Priority:** High — pre-launch blocker for EU/EEA data subjects.

### Measure M2: Anthropic DPA and SCCs (GDPR Art. 44–46)
**Action:** Execute Anthropic's Data Processing Agreement and Standard Contractual Clauses. Complete Transfer Impact Assessment (see `Documents/GDPR-Transfer-Impact-Assessment.md`). Disclose transfer mechanism in Privacy Policy.
**Priority:** Critical — pre-launch blocker.

### Measure M3: Termination Grace Period and Data Export
**Action:** Implement final 24-hour warning before data deletion on account termination. Offer one-click data export before deletion. Disclose timeline in Privacy Policy and Terms of Service.
**Priority:** Medium — implement before or shortly after launch.

### Measure M4: Privacy Policy — EFS and Conversation Persistence Disclosure
**Action:** Add explicit description of EFS workspace storage in Privacy Policy, including that the AI agent retains persistent memory and project files. Disclose this at the first-run consent gate.
**Priority:** Medium — before launch.

### Measure M5: SSH Key Immediate Deletion After Delivery
**Action:** Modify `src/webhook/commands.js` `/ssh` handler to delete the S3 key object immediately after successful Telegram delivery, rather than only on termination.
**Priority:** Medium — within 30 days of launch.

### Measure M6: Secrets Manager for Per-Client API Key Injection
**Action:** Migrate LiteLLM virtual key injection from cloud-init UserData to AWS Secrets Manager. This is already on the medium-term remediation roadmap.
**Priority:** Medium — within 30 days of launch.

### Measure M7: Breach Response Plan
**Action:** Implement documented breach response plan. See `Documents/GDPR-Breach-Response-Plan.md`.
**Priority:** High — before launch.

### Measure M8: Model Provider DPAs and User Disclosure
**Action:** Execute DPAs with Groq, OpenAI, Mistral, Google. Add model selection disclosure in `/models` command. Disclose all processors in Privacy Policy.
**Priority:** Medium — before launch.

---

## 8. Consultation

### 8.1 Data Subjects
No formal data subject consultation has been conducted, as the platform is not yet live. Upon launch, feedback mechanisms (e.g., the `/help` command, bot menu, and Privacy Policy contact) should be available for data subjects to raise concerns.

### 8.2 Supervisory Authority
This DPIA does not indicate a residual high risk that requires mandatory prior consultation under GDPR Art. 36, provided all measures in Section 7 are implemented before the platform goes live with EU/EEA data subjects. If the unencrypted WebSocket (R1) is not remediated before launch, prior consultation with the relevant supervisory authority (the Data Protection Commission in Ireland, where Telegram is headquartered, or the authority in the home country of the first EU/EEA data subject) would be required.

### 8.3 Data Protection Officer
The DPO assessment in `Documents/GDPR-DPO-Assessment.md` concludes that a DPO is not mandatory at the current scale. However, the Privacy Policy should designate a named privacy contact with an email address.

---

## 9. Sign-Off

This DPIA was prepared by the GDPR Compliance Reviewer agent on behalf of xShopper Pty Ltd. It should be reviewed and approved by:

| Role | Name | Date | Signature |
|---|---|---|---|
| Legal Counsel | _______________ | _______________ | _______________ |
| Technical Lead | _______________ | _______________ | _______________ |
| Business Owner | _______________ | _______________ | _______________ |

**Next review:** 2027-02-22, or upon any material change to: the categories of data processed, the processors used, the jurisdiction of data subjects, or the technical architecture.

---

*This document is a technical compliance assessment and does not constitute legal advice. Critical findings — in particular Risk 2 (Anthropic transfer) and Risk 7 (breach notification) — require action by qualified legal counsel before the platform goes live with EU/EEA data subjects.*
