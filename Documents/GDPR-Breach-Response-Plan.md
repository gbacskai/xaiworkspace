# Data Breach Response Plan

**Platform:** OpenClaw SME
**Controller:** xShopper Pty Ltd, Sydney, Australia
**Document version:** 1.0
**Prepared:** 2026-02-22
**Review date:** 2027-02-22 (annual review required; also review after any actual breach)
**GDPR Articles:** Art. 33 — Notification to supervisory authority; Art. 34 — Communication to data subjects
**Australian law:** Privacy Act 1988 (Cth), Part IIIC — Notifiable Data Breaches (NDB) Scheme

---

> **Legal disclaimer:** This document is a technical compliance assessment and does not constitute legal advice. Breach response procedures involving regulatory notification require immediate engagement of qualified legal counsel. The 72-hour GDPR notification window begins from the moment the controller has reasonable grounds to believe a breach has occurred — not from the moment it is confirmed.

---

## 1. Purpose and Scope

GDPR Art. 33 requires that xShopper Pty Ltd notify the relevant supervisory authority of a personal data breach without undue delay and, where feasible, not later than 72 hours after becoming aware of it, unless the breach is unlikely to result in a risk to the rights and freedoms of natural persons.

GDPR Art. 34 requires that xShopper notify affected data subjects without undue delay when a breach is likely to result in a high risk to their rights and freedoms.

The Australian Notifiable Data Breaches (NDB) Scheme (Privacy Act 1988, Part IIIC) requires notification to the Australian Information Commissioner and to affected individuals when a data breach is likely to result in serious harm to any of the individuals to whom the data relates, where the breach has not been remediated to prevent serious harm.

This plan provides the procedures, escalation contacts, notification templates, and decision framework for responding to data breaches affecting OpenClaw SME.

---

## 2. Definitions

**Personal data breach (GDPR Art. 4(12)):** A breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to, personal data transmitted, stored, or otherwise processed.

**Notifiable breach (NDB Scheme):** A breach that is likely to result in serious harm to any individual whose personal data is involved.

**Serious harm (NDB Scheme):** Physical, psychological, emotional, financial, or reputational harm; serious harm to relationships; identity theft; professional or social harm.

---

## 3. Breach Detection Sources

### 3.1 Technical Detection Channels

| Channel | What It Detects | Responsible Party |
|---|---|---|
| AWS CloudWatch Alarms | Unusual API call volumes, failed authentication spikes, unexpected EC2 state changes | Technical lead |
| AWS CloudTrail | Unauthorised IAM access, unusual S3 access patterns, unexpected Secrets Manager reads | Technical lead |
| Neon PostgreSQL query anomalies | Unusual query volumes, large data exports, unexpected access patterns | Technical lead |
| Stripe webhook failures or anomalies | Unusual payment activity, webhook delivery failures | Technical lead |
| Anthropic API error rates | Unusual API key usage patterns | Technical lead |
| LiteLLM spend anomalies | Unexpected spend spikes that could indicate key compromise or unauthorised usage | Technical lead |
| User reports | Users contacting the bot or email with suspicious activity reports | Support/Admin |
| Processor breach notifications | AWS, Stripe, Anthropic, Neon, Cloudflare notify xShopper of a breach affecting xShopper data | Technical/Legal lead |

### 3.2 Log Sources

Primary log sources for breach investigation:
- AWS CloudWatch Logs (`/aws/elasticbeanstalk/*`, `/openclaw/clients`, `/openclaw/router`) — 90-day retention
- AWS CloudTrail — API activity logs
- Neon PostgreSQL query logs
- LiteLLM spend logs
- EC2 syslog (per-client CloudWatch streams)

---

## 4. Escalation Contacts

| Role | Name | Contact Method | Availability |
|---|---|---|---|
| **Primary breach lead** | [Technical Lead name] | [Mobile], [Email] | 24/7 |
| **Legal counsel** | [External legal counsel — to be retained before launch] | [Mobile], [Email] | On-call |
| **Business owner** | [Business owner name] | [Mobile], [Email] | 24/7 |
| **Privacy contact / designated representative** | [To be designated before launch] | [Email] | Business hours |
| **AWS Support** | AWS Business/Enterprise Support | support.console.aws.amazon.com | 24/7 |
| **Stripe** | Stripe support (support.stripe.com) | 24/7 |
| **Anthropic** | legal@anthropic.com | Business hours |
| **Neon** | support@neon.tech | Business hours |

**Important:** Legal counsel must be engaged immediately upon suspected breach involving personal data of EU/EEA data subjects. The 72-hour GDPR notification clock starts from awareness, not confirmation.

---

## 5. Breach Response Procedure

### Phase 1: Detection and Initial Assessment (0–4 hours)

**Step 1.1 — Log the potential incident**

Record the following in the Incident Log (see Section 9):
- Date and time the potential breach was identified
- Who identified it
- How it was identified (automated alert, user report, processor notification, etc.)
- Initial description of what occurred or may have occurred

**Step 1.2 — Escalate immediately**

Notify the Primary Breach Lead immediately. The Primary Breach Lead must notify Legal Counsel and the Business Owner within 2 hours of identification.

**Step 1.3 — Preserve evidence**

- Do NOT delete any logs, database records, or access credentials until forensic preservation is complete
- Take a snapshot of the current state of affected systems
- Enable enhanced logging if not already active
- Preserve CloudWatch log exports covering the suspected breach window

**Step 1.4 — Contain the immediate threat**

Based on breach type, take immediate containment actions:
- Compromised API key: rotate immediately via AWS Secrets Manager / Stripe / Anthropic dashboards
- Unauthorised database access: revoke compromised DB credentials; enable Neon IP allowlisting if not active
- Compromised EC2 instance: isolate the instance (modify security group to deny all inbound/outbound); do not terminate yet (preserve forensics)
- Compromised S3 SSH keys: rotate all S3 bucket access policies; notify affected clients to generate new SSH keys
- Telegram webhook compromise: rotate `TELEGRAM_WEBHOOK_SECRET` and re-register webhook

---

### Phase 2: Assessment and Classification (4–24 hours)

**Step 2.1 — Investigate the breach**

Determine:
1. What personal data was accessed, modified, or destroyed?
2. How many data subjects are affected?
3. Which data categories are involved (conversation content, payment data, email addresses, credentials)?
4. What is the likely consequence for affected data subjects?
5. Was the breach caused by an internal failure, external attack, or processor failure?
6. Has the breach been remediated, or is it ongoing?

**Step 2.2 — Classify the breach severity**

Use the following classification matrix:

| Severity | Criteria | Examples for OpenClaw SME |
|---|---|---|
| **Critical** | High risk of significant harm; large-scale; sensitive data categories; ongoing or uncontained | Anthropic API key exposed publicly; conversation content of all clients exfiltrated; production DB credentials on GitHub |
| **High** | Risk of harm to individuals; moderately large scale; sensitive categories; contained | Single client's conversation history exfiltrated; Stripe customer data disclosed; SSH private keys for multiple clients exposed |
| **Medium** | Possible risk of harm; limited scale; lower sensitivity categories | Email addresses of invite recipients exposed; operational logs with `chat_id` disclosed; single client's metadata accessed |
| **Low** | Unlikely to result in risk to rights and freedoms; very limited scope; non-sensitive data | Temporary exposure of a `chat_id` in a server log to a privileged internal viewer; brief misconfiguration corrected within minutes |

**Step 2.3 — Determine notification obligations**

| Threshold | Action Required |
|---|---|
| Breach of any severity (GDPR) | Document in internal breach register (always required) |
| Breach unlikely to result in risk to rights and freedoms (GDPR Art. 33(1)) | No supervisory authority notification required; document reasoning |
| Breach likely to result in risk (GDPR Art. 33) | Notify relevant supervisory authority within 72 hours of awareness |
| Breach likely to result in HIGH risk (GDPR Art. 34) | Notify affected data subjects without undue delay |
| Breach likely to result in serious harm (NDB Scheme) | Notify Australian Information Commissioner and affected individuals within 30 days of becoming aware |

---

### Phase 3: Regulatory Notification — GDPR (24–72 hours from awareness)

**Step 3.1 — Identify the lead supervisory authority**

For EU/EEA data subjects, the lead supervisory authority (LSA) is determined by the location of xShopper's EU/EEA establishment (if any) or by the home country of the largest group of affected EU/EEA data subjects.

Since xShopper has no EU/EEA establishment as of this plan:
- Identify the country of residence of the largest group of affected EU/EEA data subjects
- Notify the supervisory authority in that country
- Common supervisory authorities for internet services: Data Protection Commission (Ireland — `www.dataprotection.ie`), CNIL (France — `www.cnil.fr`), BfDI (Germany — `www.bfdi.bund.de`), ICO (UK — `ico.org.uk` — note UK GDPR post-Brexit)

If an Art. 27 EU representative has been appointed, they should be the point of contact.

**Step 3.2 — Prepare the supervisory authority notification**

Use the GDPR Art. 33(3) notification template in Section 8.1 below. The notification must include:
- Description of the nature of the breach (categories and approximate number of records/data subjects)
- Name and contact details of the data protection officer or other contact point
- Likely consequences of the breach
- Measures taken or proposed to address the breach

If all information is not yet available within 72 hours, submit what is known and provide updates as further information becomes available. GDPR Art. 33(4) explicitly permits phased notification.

**Step 3.3 — Submit the notification**

Submit the notification via the supervisory authority's online portal or by email, as required by that authority. Record the submission reference number and timestamp in the Incident Log.

---

### Phase 4: Data Subject Notification (if high risk)

**Step 4.1 — Determine if data subject notification is required**

Notification to data subjects is NOT required (GDPR Art. 34(3)) where:
- The data was encrypted in a way that renders it unintelligible to unauthorised persons (e.g., encrypted keys were exposed but without the decryption key)
- The controller has taken subsequent measures to prevent the high risk from materialising
- Individual notification would require disproportionate effort — in which case a public communication may be made instead

**Step 4.2 — Identify affected data subjects**

From the breach investigation, identify the `chat_id` values of affected clients. Retrieve their email addresses from `oc_users` and/or from Stripe customer records.

**Step 4.3 — Send notification**

Use the data subject notification template in Section 8.2 below. Notify affected data subjects:
- Via Telegram bot message (primary channel — all clients have bot access)
- Via email if email address is registered

---

### Phase 5: Remediation and Post-Incident Review

**Step 5.1 — Implement remediation**

Document all remediation steps taken. Remediation must address:
- Closing the vulnerability that caused the breach
- Preventing recurrence
- Restoring data integrity if data was modified

**Step 5.2 — Post-incident review**

Within 14 days of breach containment, conduct a post-incident review covering:
- Root cause analysis
- Timeline of events
- Effectiveness of detection and response
- Lessons learned
- DPIA update required? (if the breach reveals a new risk not captured in the current DPIA)
- Policy or technical changes required

**Step 5.3 — Update breach register**

Record the completed incident in the internal breach register (Section 9) with all details including resolution.

---

## 6. Processor Breach Notifications Received by xShopper

When xShopper receives a breach notification from a processor (e.g., AWS, Anthropic, Stripe, Neon):

1. Log receipt of notification immediately (time is critical for GDPR 72-hour window)
2. Assess whether personal data of xShopper's data subjects is affected
3. If affected: treat as an internally detected breach and follow Phases 1–5 above
4. The 72-hour GDPR window begins when xShopper becomes aware — the processor's notification constitutes awareness

---

## 7. Severity-Specific Guidance for OpenClaw SME

### 7.1 Scenario: Anthropic API Key Compromise

**Description:** The Anthropic API key (`ANTHROPIC_API_KEY`) is exposed (e.g., leaked to GitHub, accessed via compromised Secrets Manager, or disclosed by a sub-processor).

**Impact:** All conversation content processed by Anthropic is at risk if an attacker uses the key to replay historical prompts (if Anthropic caches them), or if the key allows access to Anthropic's API logs.

**Immediate response:**
1. Rotate the API key immediately via Anthropic console
2. Update AWS Secrets Manager with the new key
3. Deploy updated key to EB environment
4. Contact Anthropic security team to report compromise and request audit of any API activity under the compromised key
5. Assess whether Anthropic's API logs (if any) constitute a personal data breach

**GDPR classification:** Likely Medium to High severity depending on Anthropic's API log retention.

---

### 7.2 Scenario: Neon PostgreSQL Credentials Exposed

**Description:** The `DATABASE_URL` connection string is exposed (e.g., leaked to a repository, logged, or stolen from Secrets Manager).

**Impact:** Full access to all 8 database tables — `oc_clients`, `oc_users`, `oc_invites`, `oc_payments`, `oc_spend_daily`, `oc_token_packs`, `oc_tiers`, `oc_currencies` — containing `chat_id` values, email addresses, Stripe IDs, payment amounts, IP addresses, and all client records.

**Immediate response:**
1. Rotate the Neon database credentials immediately via Neon console
2. Update AWS Secrets Manager with new `DATABASE_URL`
3. Enable Neon IP allowlisting to restrict access to EB IP ranges only
4. Review Neon query logs for evidence of unauthorised queries
5. Assess whether any data was exfiltrated

**GDPR classification:** Critical — full client registry exposed. Supervisory authority notification likely required.

---

### 7.3 Scenario: S3 SSH Keys Publicly Accessible

**Description:** The S3 bucket containing SSH private keys (`ssh-keys/`) has misconfigured ACLs or bucket policy making keys publicly accessible.

**Impact:** Private SSH keys for all affected EC2 instances exposed. An attacker could gain SSH access to any client's dedicated EC2 instance, accessing conversation history and workspace files on EFS.

**Immediate response:**
1. Immediately restrict S3 bucket ACLs / bucket policy (remove any public access)
2. For each exposed key: terminate the affected EC2 instance (this invalidates the key's access) and provision a replacement instance with a new keypair
3. Notify affected clients via Telegram that they should use `/ssh` to obtain a new key after their instance is reprovisioned
4. Review CloudTrail for evidence of any S3 GetObject calls on key objects from unexpected IPs

**GDPR classification:** High — SSH key exposure enabling downstream access to conversation content on EFS.

---

### 7.4 Scenario: TELEGRAM_WEBHOOK_SECRET Exposed

**Description:** The webhook secret is exposed, allowing an attacker to forge Telegram webhook requests to the router.

**Impact:** Attacker can impersonate any `chat_id` and send commands or messages as that user. This could trigger provisioning, billing actions, or access to usage data.

**Immediate response:**
1. Rotate `TELEGRAM_WEBHOOK_SECRET` in AWS Secrets Manager and EB environment
2. Re-register the Telegram webhook with the new secret (`/deploy.sh` triggers webhook re-registration, or call Telegram's `setWebhook` API directly)
3. Review CloudWatch logs for any suspicious webhook calls
4. Assess whether any data subject was harmed by forged messages

**GDPR classification:** Medium — depends on what actions were taken via forged requests.

---

## 8. Notification Templates

### 8.1 Supervisory Authority Notification (GDPR Art. 33)

**Subject:** Personal Data Breach Notification — xShopper Pty Ltd / OpenClaw SME — [Incident Reference]

---

Dear [Supervisory Authority],

xShopper Pty Ltd (Sydney, Australia) — operator of the OpenClaw SME platform — hereby notifies the [Authority name] of a personal data breach pursuant to Article 33 of the General Data Protection Regulation (EU) 2016/679.

**1. Nature of the breach**

[Describe the nature of the breach: e.g., "Unauthorised access was gained to the platform's Neon PostgreSQL database containing client records." Include the date and time the breach occurred (if known) and the date and time xShopper became aware.]

**2. Categories and approximate number of data subjects**

[e.g., "Approximately [X] data subjects, comprising OpenClaw SME clients, are affected. The affected categories of personal data are: Telegram chat IDs, email addresses, Stripe customer identifiers, and subscription status records."]

**3. Likely consequences of the breach**

[e.g., "The likely consequences are [describe: e.g., risk of identity phishing using email addresses; unauthorised access to payment identifiers]."]

**4. Measures taken or proposed**

[e.g., "Immediately upon discovery, xShopper: (1) rotated the compromised database credentials; (2) restricted database access via IP allowlisting; (3) engaged forensic investigation to assess the scope of any data exfiltration. Proposed measures include [list preventive measures]."]

**5. Contact details**

[Name of privacy contact or legal counsel], [email], [telephone]

xShopper Pty Ltd does not currently have a Data Protection Officer. Correspondence should be directed to the above contact.

We commit to providing updates as the investigation progresses, including if the number of affected data subjects or the scope of affected data changes from the initial assessment above.

[Signature]
[Name]
[Title]
[Date]
[Incident Reference Number]

---

### 8.2 Data Subject Notification (GDPR Art. 34) — Telegram Message

**Template for Telegram bot message to affected clients:**

---

IMPORTANT SECURITY NOTICE — OpenClaw SME

We are writing to inform you of a security incident that may have affected your account data.

WHAT HAPPENED:
[Brief plain-language description: e.g., "On [date], we discovered that [brief description of the incident]."]

WHAT DATA IS AFFECTED:
[Specify: e.g., "Your account identifier and email address were potentially accessed by an unauthorised party. Your payment card details were NOT affected — card data is held by Stripe and was not part of this incident."]

WHAT WE HAVE DONE:
[e.g., "We have immediately [rotated credentials / isolated affected systems / restricted access]. We are conducting a full investigation and have notified the relevant data protection authority."]

WHAT YOU SHOULD DO:
[If applicable: e.g., "We recommend you change any passwords you may use that are the same as your OpenClaw service credentials. If you use SSH access to your instance, please use /ssh to retrieve a new SSH key after your instance is reprovisioned."]

YOUR RIGHTS:
You have the right to lodge a complaint with the relevant data protection authority. You also have the right to request access to, or erasure of, your personal data at any time by using the /my_data or /delete_my_data commands.

If you have questions, please contact us at [privacy contact email].

We sincerely apologise for this incident.

xShopper Pty Ltd — OpenClaw SME

---

### 8.3 Data Subject Notification — Email Version

**Subject:** [URGENT] Security Notice — Your OpenClaw Account — Action May Be Required

---

Dear OpenClaw Customer,

We are writing to inform you of a security incident that may have affected your account data on the OpenClaw SME platform, operated by xShopper Pty Ltd.

[Continue with the same content as the Telegram message template above, adjusted for email format.]

Kind regards,
[Name]
xShopper Pty Ltd
[privacy contact email]

This email was sent to you because you are a registered user of the OpenClaw SME platform. If you believe you received this in error, please contact us at [privacy contact email].

---

## 9. Internal Breach Register

Maintain a record of all incidents (including those that do not require notification) in a confidential internal register. GDPR Art. 33(5) requires controllers to document all personal data breaches, including those that do not result in supervisory authority notification, and the reasons for decisions not to notify.

| Field | Detail |
|---|---|
| Incident reference | [Generate: OC-BREACH-YYYY-NNN] |
| Date/time detected | |
| Detected by | |
| Detection method | |
| Date/time breach occurred (if known) | |
| Brief description of breach | |
| Data categories affected | |
| Approximate number of records | |
| Approximate number of data subjects | |
| Severity classification | Critical / High / Medium / Low |
| Containment actions taken | |
| Date/time contained | |
| Notifiable under GDPR Art. 33? | Yes / No / Under assessment |
| Notifiable under NDB Scheme? | Yes / No / Under assessment |
| Reason if not notified (GDPR) | |
| Supervisory authority notified | |
| Notification date/time | |
| Notification reference | |
| Data subject notification sent? | Yes / No / Not required |
| Date/time sent | |
| Post-incident review date | |
| Root cause | |
| Remediation measures | |
| Closed date | |

---

## 10. Testing and Review

- **Annual tabletop exercise:** Conduct an annual simulated breach scenario to test the effectiveness of this plan and ensure all escalation contacts are current.
- **Review triggers:** This plan must be reviewed after any actual breach incident, after any significant change to the platform architecture or processor list, or if relevant regulations change.
- **Contact verification:** Verify all escalation contacts are current before annual review date.

---

*This document is a technical compliance assessment and does not constitute legal advice. Regulatory notifications under GDPR Art. 33 and the Australian NDB Scheme carry significant legal obligations and should be prepared and submitted with the involvement of qualified legal counsel.*
