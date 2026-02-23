# Data Processing Agreement Tracker

**Platform:** OpenClaw SME
**Controller:** xShopper Pty Ltd, Sydney, Australia
**Document version:** 1.0
**Prepared:** 2026-02-22
**GDPR Article:** Art. 28 — Processor

---

> **Legal disclaimer:** This document is a technical compliance assessment and does not constitute legal advice. DPA execution requires review by qualified legal counsel. Each processor's DPA is a binding legal contract; ensure terms are reviewed before signing.

---

## 1. Introduction

GDPR Art. 28 requires that any Controller who engages a third party to process personal data on its behalf must do so only pursuant to a binding written contract — a Data Processing Agreement (DPA) — that imposes the obligations prescribed by Art. 28(3) on the processor. Processing personal data through a processor without a valid Art. 28 DPA is a violation that may result in fines of up to EUR 10,000,000 or 2% of global annual turnover under Art. 83(4).

This document tracks the DPA status for all processors engaged by xShopper Pty Ltd in operating OpenClaw SME, and provides the minimum required contractual provisions for any DPA that must be negotiated rather than accepted on standard terms.

---

## 2. Processor Register

### 2.1 Status Legend

| Status | Meaning |
|---|---|
| Not started | DPA not yet reviewed or initiated |
| In progress | DPA process initiated with processor |
| Executed | DPA signed and in effect |
| Not applicable | Processor does not receive personal data of EU/EEA data subjects, or acts as an independent controller |

---

### 2.2 AWS (Amazon Web Services)

| Attribute | Detail |
|---|---|
| **Status** | Not started |
| **Priority** | Critical — pre-launch blocker |
| **Services used** | Elastic Beanstalk (router.js runtime), EC2 (per-client instances), EFS (per-client workspace storage), S3 (SSH keys, backups), SES (invite emails), CloudWatch Logs (operational logs), Route 53 (DNS), ACM (SSL certificates), Secrets Manager (production secrets) |
| **Personal data processed** | All personal data — `oc_clients`, `oc_users`, `oc_invites`, `oc_payments`, `oc_spend_daily`, `oc_token_packs` stored in Neon (on AWS infrastructure). EFS: full AI workspace content. S3: SSH private keys. CloudWatch: `chat_id` in log stream names and events. EC2 UserData: `chat_id` + LiteLLM key. |
| **Jurisdictions** | ap-southeast-2 (Sydney, Australia) — primary. us-east-1 (North Virginia, US) — secondary region (Americas clients) |
| **DPA location** | [AWS Data Processing Addendum](https://d1.awsstatic.com/legal/aws-gdpr/AWS_GDPR_DPA.pdf) — standard online DPA; can be accepted without negotiation |
| **Transfer mechanism** | For ap-southeast-2: EU-to-Australia — no adequacy decision; requires SCCs or alternative Art. 46 mechanism for EU/EEA data subjects. For us-east-1: AWS is DPF-certified (Data Privacy Framework). AWS SCCs available as addendum to DPA. |
| **Action required** | (1) Accept AWS DPA via the AWS console (Accounts > Data Privacy > GDPR Data Processing Addendum). (2) For EU/EEA data subjects using us-east-1, ensure AWS SCCs are activated. |
| **Owner** | xShopper technical/legal lead |
| **Target date** | Before launch |
| **Executed date** | _______________ |

---

### 2.3 Neon PostgreSQL

| Attribute | Detail |
|---|---|
| **Status** | Not started |
| **Priority** | Critical — pre-launch blocker |
| **Services used** | Managed PostgreSQL — stores all 8 DB tables: `oc_clients`, `oc_users`, `oc_invites`, `oc_payments`, `oc_spend_daily`, `oc_token_packs`, `oc_tiers`, `oc_currencies`, `oc_countries`. Also serves as LiteLLM spend tracking backend. |
| **Personal data processed** | All personal data in all tables — `chat_id`, email addresses, Stripe IDs, payment amounts, IP addresses, spend data, invite relationships |
| **Jurisdiction** | United States (runs on AWS; region determined by `DATABASE_URL` hostname, e.g., `*.us-east-2.aws.neon.tech`) |
| **DPA location** | [Neon DPA](https://neon.tech/dpa) — available online for acceptance |
| **Transfer mechanism** | Neon runs on AWS (DPF-certified). Transfer mechanism: EU Standard Contractual Clauses available via Neon's DPA. |
| **Action required** | (1) Navigate to neon.tech/dpa. (2) Accept DPA (Neon provides self-service DPA acceptance). (3) Document acceptance confirmation and date. |
| **Owner** | xShopper technical/legal lead |
| **Target date** | Before launch |
| **Executed date** | _______________ |

---

### 2.4 Anthropic

| Attribute | Detail |
|---|---|
| **Status** | Not started |
| **Priority** | Critical — pre-launch blocker |
| **Services used** | Claude AI API — receives every AI conversation message as primary model provider |
| **Personal data processed** | Full conversation content (may include any personal data the user submits); model request metadata |
| **Jurisdiction** | United States (San Francisco, CA) |
| **DPA location** | [Anthropic Privacy Policy](https://www.anthropic.com/privacy) — check for enterprise DPA / Business Associate Agreement options at [anthropic.com/legal](https://www.anthropic.com/legal). For API customers, Anthropic's usage policy governs data handling; a formal DPA may require direct contact. |
| **Transfer mechanism** | SCCs (EU-to-US) required. Anthropic is not currently listed as DPF-certified. See `Documents/GDPR-Transfer-Impact-Assessment.md`. |
| **Action required** | (1) Contact Anthropic enterprise sales/legal to request DPA and SCCs. (2) Review Anthropic's data retention policy for API inputs (as of knowledge cutoff: Anthropic states it does not use API inputs to train models for customers with API agreements; verify this is documented in the DPA). (3) Ensure the DPA includes: sub-processor list, data deletion timeline, breach notification timeline, and instruction binding. |
| **Owner** | xShopper legal lead |
| **Target date** | Before launch |
| **Executed date** | _______________ |

---

### 2.5 Stripe

| Attribute | Detail |
|---|---|
| **Status** | Not started |
| **Priority** | Critical — pre-launch blocker |
| **Services used** | Payment processing — Stripe Checkout for subscriptions and extra packs; Stripe webhooks for subscription lifecycle |
| **Personal data processed** | Email address (Stripe customer creation), `chat_id` (in Stripe metadata), payment amounts, currencies, Stripe customer ID, Stripe subscription ID, payment intent ID, card last 4 digits |
| **Jurisdiction** | United States (Stripe, Inc., South San Francisco, CA). Note: Stripe also has a European entity (Stripe Payments Europe Limited, Dublin) which may be relevant for EU/EEA processing. |
| **DPA location** | [Stripe Privacy Center](https://stripe.com/privacy) — Stripe's DPA is available as part of their standard services agreement. Navigate to Stripe Dashboard > Settings > Legal > Data Processing Agreement. |
| **Transfer mechanism** | Stripe is DPF-certified (Data Privacy Framework). SCCs also available via Stripe's DPA. |
| **Action required** | (1) Accept Stripe's DPA via the Stripe Dashboard. (2) Verify DPF certification is current at privacyshield.gov/ps/data-privacy-framework-list. (3) Document acceptance. |
| **Owner** | xShopper business/legal lead |
| **Target date** | Before launch |
| **Executed date** | _______________ |

---

### 2.6 Telegram

| Attribute | Detail |
|---|---|
| **Status** | Not started |
| **Priority** | High |
| **Services used** | Bot API — all messages between data subjects and OpenClaw are transmitted via Telegram's infrastructure. Telegram authenticates users and routes messages to the bot webhook. |
| **Personal data processed** | `chat_id`, message content (full conversation messages), bot commands, inline keyboard interactions |
| **Jurisdiction** | Telegram Messenger Inc. (UAE); Telegram FZ-LLC (UAE); EU data protection matters handled via Telegram's Netherlands address. |
| **DPA status** | Telegram's position on GDPR DPAs for bot operators is complex. Telegram is arguably an independent controller (not a processor) for the data it processes in its own systems. However, Telegram processes personal data on behalf of the bot operator when routing messages to the bot's webhook. Telegram has not published a standard DPA for bot operators. |
| **Transfer mechanism** | Telegram is not DPF-certified. Telegram's servers are globally distributed. No adequacy decision covers UAE. |
| **Action required** | (1) Assess whether Telegram acts as a processor or independent controller in the context of bot webhook message delivery. (2) Contact Telegram for DPA or review their Data Processing Terms at [telegram.org/privacy](https://telegram.org/privacy). (3) If Telegram will not execute a DPA, document the assessment that Telegram is an independent controller for its own processing and that the bot operator receives message content through Telegram's API under Telegram's own Terms of Service. (4) Disclose in Privacy Policy that Telegram is the platform operator and independently processes personal data subject to its own privacy policy. |
| **Owner** | xShopper legal lead |
| **Target date** | Before launch |
| **Executed date** | _______________ |

---

### 2.7 Cloudflare

| Attribute | Detail |
|---|---|
| **Status** | Not started |
| **Priority** | Medium |
| **Services used** | DNS/CDN for `xaiworkspace.com` (Telegram Mini App) and `router.xshopper.com` (router URL). Cloudflare handles DNS resolution and may terminate TLS for these domains. |
| **Personal data processed** | IP addresses of users and infrastructure nodes, HTTP request metadata (via Cloudflare CDN), DNS query data |
| **Jurisdiction** | United States (San Francisco, CA); global infrastructure |
| **DPA location** | [Cloudflare Data Processing Addendum](https://www.cloudflare.com/cloudflare-customer-dpa/) — standard online DPA |
| **Transfer mechanism** | Cloudflare is DPF-certified. SCCs also available via Cloudflare's DPA. |
| **Action required** | (1) Accept Cloudflare DPA via Cloudflare Dashboard > Account > Configurations > Data Processing Addendum. (2) Document acceptance. |
| **Owner** | xShopper technical lead |
| **Target date** | Before launch |
| **Executed date** | _______________ |

---

### 2.8 Groq

| Attribute | Detail |
|---|---|
| **Status** | Not started |
| **Priority** | Medium (only relevant when users select a Groq model) |
| **Services used** | AI model API — receives conversation content if user selects a Groq model via `/models` |
| **Personal data processed** | Full conversation content |
| **Jurisdiction** | United States (Groq, Inc., Mountain View, CA) |
| **DPA location** | Check [groq.com/legal](https://groq.com/legal) or contact Groq enterprise for DPA |
| **Transfer mechanism** | SCCs (EU-to-US) required. Verify DPF certification status. |
| **Action required** | (1) Obtain and execute DPA with Groq. (2) Verify data retention policy for API inputs. (3) If DPA cannot be obtained within a reasonable timeframe before launch, consider removing Groq from the available model list. |
| **Owner** | xShopper legal lead |
| **Target date** | Before launch |
| **Executed date** | _______________ |

---

### 2.9 OpenAI

| Attribute | Detail |
|---|---|
| **Status** | Not started |
| **Priority** | Medium (only relevant when users select an OpenAI model) |
| **Services used** | AI model API — receives conversation content if user selects an OpenAI model |
| **Personal data processed** | Full conversation content |
| **Jurisdiction** | United States (OpenAI, LLC, San Francisco, CA). Note: OpenAI Ireland Limited for EU/EEA. |
| **DPA location** | [OpenAI Data Processing Addendum](https://openai.com/policies/data-processing-addendum) — available online; can be accepted for API customers |
| **Transfer mechanism** | OpenAI is DPF-certified. SCCs also available via OpenAI DPA. |
| **Action required** | (1) Accept OpenAI DPA — navigate to platform.openai.com > Settings > Data Controls > Data Processing Addendum. (2) Document acceptance and date. |
| **Owner** | xShopper technical lead |
| **Target date** | Before launch |
| **Executed date** | _______________ |

---

### 2.10 Mistral AI

| Attribute | Detail |
|---|---|
| **Status** | Not started |
| **Priority** | Medium (only relevant when users select a Mistral model) |
| **Services used** | AI model API — receives conversation content if user selects a Mistral model |
| **Personal data processed** | Full conversation content |
| **Jurisdiction** | France (EU) — Mistral AI SAS, Paris. No adequacy issue for EU-to-EU/EEA transfer. However, the data originates from xShopper (Australia) and may involve non-EU data subjects. |
| **DPA location** | Check [mistral.ai/terms](https://mistral.ai/terms) for DPA or contact Mistral enterprise |
| **Transfer mechanism** | France is an EU member state — no GDPR Chapter V transfer issue for EU/EEA data subjects. For Australian controller processing: standard international transfer rules apply under Australian Privacy Act. |
| **Action required** | (1) Obtain and execute DPA with Mistral. (2) The DPA may be simpler given Mistral's EU location — standard GDPR Art. 28 DPA without SCCs. |
| **Owner** | xShopper legal lead |
| **Target date** | Before launch |
| **Executed date** | _______________ |

---

### 2.11 Google (Gemini API)

| Attribute | Detail |
|---|---|
| **Status** | Not started |
| **Priority** | Medium (only relevant when users select a Gemini model) |
| **Services used** | Gemini API — receives conversation content if user selects a Google Gemini model |
| **Personal data processed** | Full conversation content |
| **Jurisdiction** | United States (Google LLC, Mountain View, CA). Note: Google Ireland Limited for EU/EEA. |
| **DPA location** | [Google Cloud Data Processing Addendum](https://cloud.google.com/terms/data-processing-addendum) — relevant if using Gemini API via Google Cloud. Also see [ai.google.dev](https://ai.google.dev) for Gemini API terms. |
| **Transfer mechanism** | Google is DPF-certified. SCCs also available. |
| **Action required** | (1) Identify which Google entity and DPA applies to the Gemini API (Google Cloud DPA vs. separate Gemini API terms). (2) Accept or execute the appropriate DPA. (3) Document acceptance. |
| **Owner** | xShopper technical lead |
| **Target date** | Before launch |
| **Executed date** | _______________ |

---

### 2.12 AWS SES (Simple Email Service)

| Attribute | Detail |
|---|---|
| **Status** | Not started (covered under AWS DPA above, but noted separately for clarity) |
| **Priority** | Medium |
| **Services used** | Email delivery — sends invite emails to recipients |
| **Personal data processed** | Email addresses of invite recipients and inviters |
| **Jurisdiction** | ap-southeast-2 (Sydney) — email processing within Australia |
| **DPA location** | Covered by AWS DPA (see 2.2 above) |
| **Transfer mechanism** | No international transfer for ap-southeast-2 SES |
| **Action required** | Covered when AWS DPA is accepted. |

---

## 3. DPA Execution Priority Matrix

| Priority | Processors | Deadline |
|---|---|---|
| Critical (must execute before launch) | AWS, Neon, Anthropic, Stripe | Before any EU/EEA user can access the service |
| High (execute before or immediately after launch) | Cloudflare, Telegram (or document independent controller assessment) | Before launch |
| Medium (execute before offering optional models to EU/EEA users) | Groq, OpenAI, Mistral, Google | Before launch, or remove models from EU/EEA offering until DPAs executed |

---

## 4. Minimum DPA Contractual Requirements

Where xShopper cannot accept a processor's standard-form DPA (e.g., for a processor that requires a bespoke agreement), the following minimum provisions must be present in any DPA executed on behalf of xShopper Pty Ltd. These provisions implement GDPR Art. 28(3).

---

### Template DPA Minimum Clause Set

**Clause 1 — Subject Matter and Duration**

> The Processor shall process personal data on behalf of the Controller solely for the purposes set out in Schedule 1 (Processing Details) to this Agreement, for the duration of the service agreement between the parties, and for such further period as may be required to comply with the Controller's instructions for return or deletion of personal data.

---

**Clause 2 — Instructions**

> The Processor shall process personal data only on documented instructions from the Controller, including with regard to transfers of personal data to a third country or an international organisation. If the Processor is required by Union or Member State law to process personal data for other purposes, it shall inform the Controller of that legal requirement before processing, unless that law prohibits such information on grounds of public interest.

---

**Clause 3 — Confidentiality**

> The Processor shall ensure that persons authorised to process the personal data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality.

---

**Clause 4 — Security**

> The Processor shall take all measures required pursuant to Article 32 GDPR, including: (a) pseudonymisation and encryption of personal data; (b) ability to ensure ongoing confidentiality, integrity, availability and resilience of processing systems; (c) ability to restore availability and access to personal data in a timely manner in the event of a physical or technical incident; (d) a process for regularly testing, assessing, and evaluating the effectiveness of technical and organisational measures for ensuring security.

---

**Clause 5 — Sub-processors**

> The Processor shall not engage another processor (sub-processor) without prior specific or general written authorisation of the Controller. Where general written authorisation is relied upon, the Processor shall inform the Controller of any intended changes concerning the addition or replacement of sub-processors, thereby giving the Controller the opportunity to object to such changes. The Processor shall impose data protection obligations equivalent to those in this Agreement on any sub-processor by way of a binding written contract.

---

**Clause 6 — Data Subject Rights**

> The Processor shall, taking into account the nature of the processing, assist the Controller by appropriate technical and organisational measures, insofar as this is possible, for the fulfilment of the Controller's obligation to respond to requests for exercising the data subject's rights under Chapter III of the GDPR. The Processor shall promptly notify the Controller if it receives any request from a data subject that relates to personal data processed under this Agreement.

---

**Clause 7 — Assistance to Controller**

> The Processor shall assist the Controller in ensuring compliance with the obligations pursuant to Articles 32 to 36 GDPR, taking into account the nature of processing and the information available to the Processor. This includes assistance with: security of processing, notification of personal data breaches, data protection impact assessments, and prior consultation with supervisory authorities.

---

**Clause 8 — Deletion or Return**

> At the choice of the Controller, the Processor shall delete or return all personal data to the Controller after the end of the provision of services, and shall delete existing copies unless Union or Member State law requires storage of the personal data. The Processor shall confirm in writing to the Controller when deletion has been completed.

---

**Clause 9 — Audit**

> The Processor shall make available to the Controller all information necessary to demonstrate compliance with the obligations laid down in Article 28 GDPR and shall allow for and contribute to audits, including inspections, conducted by the Controller or another auditor mandated by the Controller. The Processor shall immediately inform the Controller if, in its opinion, an instruction infringes the GDPR or other applicable data protection provisions.

---

**Clause 10 — Breach Notification**

> The Processor shall notify the Controller without undue delay, and in any event within 48 hours, after becoming aware of a personal data breach affecting personal data processed under this Agreement. Such notification shall contain at minimum: (a) a description of the nature of the breach; (b) the categories and approximate number of data subjects concerned; (c) the categories and approximate number of records concerned; (d) the name and contact details of the data protection officer or other contact point; (e) the likely consequences of the breach; (f) the measures taken or proposed to address the breach.

---

**Clause 11 — International Transfers**

> The Processor shall not transfer personal data to a third country or international organisation without the Controller's prior written authorisation and the existence of an appropriate safeguard pursuant to Article 46 GDPR (or an adequacy decision under Article 45 GDPR). Where Standard Contractual Clauses are relied upon as the transfer mechanism, the Processor shall comply with the obligations of the relevant module as applicable.

---

**Schedule 1 — Processing Details (to be completed per processor)**

| Field | Detail |
|---|---|
| Subject matter | [Description of the processing] |
| Duration | [Duration of the service agreement] |
| Nature of processing | [Type of processing activities] |
| Purpose of processing | [The purpose for which personal data is processed] |
| Types of personal data | [Categories of personal data] |
| Categories of data subjects | [Data subjects whose data is processed] |
| Sub-processors | [List of authorised sub-processors] |

---

## 5. DPA Completion Tracker

Use this table to track DPA execution status. Update as each DPA is executed.

| Processor | DPA Source | Accepted/Executed Date | Mechanism | Confirmation Reference | Next Review |
|---|---|---|---|---|---|
| AWS | AWS DPA online | _______________ | SCCs (EU/EEA data subjects) | _______________ | Annual |
| Neon | neon.tech/dpa | _______________ | SCCs | _______________ | Annual |
| Anthropic | Direct negotiation | _______________ | SCCs | _______________ | Annual |
| Stripe | Stripe Dashboard | _______________ | DPF + SCCs | _______________ | Annual |
| Telegram | Direct / independent controller assessment | _______________ | N/A or SCCs | _______________ | Annual |
| Cloudflare | Cloudflare Dashboard | _______________ | DPF + SCCs | _______________ | Annual |
| Groq | Direct negotiation | _______________ | SCCs | _______________ | Annual |
| OpenAI | platform.openai.com | _______________ | DPF + SCCs | _______________ | Annual |
| Mistral | Direct negotiation | _______________ | N/A (EU) | _______________ | Annual |
| Google (Gemini) | Google Cloud DPA | _______________ | DPF + SCCs | _______________ | Annual |

---

*This document is a technical compliance assessment and does not constitute legal advice. DPA execution requires review by qualified legal counsel. All DPAs should be reviewed by a solicitor or barrister admitted in a relevant EU/EEA jurisdiction before execution.*
