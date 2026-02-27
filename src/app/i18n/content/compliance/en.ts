export const COMPLIANCE_EN = `
## Company Registration

**xShopper Pty Ltd** is a registered Australian company.

- **Australian Trademark:** No. 1749660 (Class 35)
- **Operating name:** xAI Workspace
- **Jurisdiction:** Australia

---

## Data Protection

xAI Workspace complies with the following data protection frameworks:

- **General Data Protection Regulation (GDPR)** — for users in the EU/EEA and UK
- **Australian Privacy Act 1988** — including the Australian Privacy Principles (APPs)

We maintain a lawful basis for all personal data processing and provide mechanisms for users to exercise their rights under both frameworks. Full details are available in our [Privacy Policy](/privacy).

---

## Infrastructure Security

All data is encrypted both in transit and at rest:

- **In transit:** TLS 1.3 for all connections between clients, servers, and third-party services
- **At rest:** AES-256 encryption for stored data
- **Primary hosting:** Amazon Web Services (AWS), Sydney region (ap-southeast-2)
- **Secondary region:** AWS N. Virginia (us-east-1) for specific services

Infrastructure is monitored 24/7 with automated alerting for anomalies and potential security events.

---

## Payment Compliance

All payment processing is handled by **Stripe**, which is certified as a **PCI DSS Level 1 Service Provider** — the highest level of certification in the payment card industry.

- xAI Workspace **does not** store, process, or transmit credit card numbers
- Payment card data is handled entirely by Stripe's PCI-compliant infrastructure
- We retain only the Stripe customer ID and last 4 digits of the card for reference

---

## AI Provider Data Handling

When you use xAI Workspace, your conversation content is sent to the AI provider you select. Each provider has their own data handling commitments:

| Provider | Region | Data retention policy |
|---|---|---|
| **Anthropic** (Claude) | United States | Does not train on API inputs; 30-day retention |
| **OpenAI** (GPT) | United States | Does not train on API inputs; 30-day retention |
| **Google** (Gemini) | United States | Does not train on API inputs |
| **Mistral AI** | France (EU) | Does not train on API inputs |
| **Groq** (Llama, Mixtral) | United States | Does not store prompts after processing |
| **Amazon Bedrock** | Australia / US | Data stays within your selected AWS region |

We use only API-tier access with all providers, which universally excludes training on customer data.

---

## Sub-processors

The following third parties process personal data on our behalf:

| Sub-processor | Purpose | Location |
|---|---|---|
| **Amazon Web Services** | Infrastructure hosting | Australia (Sydney), US (N. Virginia) |
| **Stripe** | Payment processing | United States |
| **Neon** | Database hosting | United States |
| **Telegram** | Message delivery | Netherlands / UAE |
| **Google** | OAuth identity provider, AI (Gemini) | United States |
| **Anthropic** | AI model provider (Claude) | United States |
| **OpenAI** | AI model provider (GPT) | United States |
| **Mistral AI** | AI model provider | France |
| **Groq** | AI model provider | United States |

---

## Incident Response

xShopper maintains a documented incident response process:

- **Detection:** Automated monitoring and alerting across all infrastructure
- **Response:** Incidents are triaged and investigated within 4 hours
- **Notification:** Affected users are notified within 72 hours of a confirmed personal data breach, as required by GDPR and recommended under Australian Privacy Principle 11
- **Remediation:** Root cause analysis and corrective actions are documented for every incident

---

## Data Residency

- **Primary data storage:** AWS Sydney (ap-southeast-2), Australia
- **Database:** Neon, hosted in the United States
- **AI processing:** Varies by provider — see the AI Provider Data Handling section above
- **Payments:** Processed by Stripe in the United States

For users requiring strict Australian data residency, selecting Amazon Bedrock models ensures AI processing occurs within Australian AWS infrastructure.

---

## Contact

For compliance enquiries: **privacy@xshopper.com**

xShopper Pty Ltd, Australia
Australian Trademark No. 1749660 (Class 35)

*Compliance page version: 2026-02-27*
`;
