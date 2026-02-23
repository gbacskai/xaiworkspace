# Data Protection Officer Necessity Assessment

**Platform:** OpenClaw SME
**Controller:** xShopper Pty Ltd, Sydney, Australia
**Document version:** 1.0
**Prepared:** 2026-02-22
**Review date:** 2027-02-22 (annual review required, or upon significant change in processing scale or nature)
**GDPR Article:** Art. 37 — Designation of the data protection officer

---

> **Legal disclaimer:** This document is a technical compliance assessment and does not constitute legal advice. The determination of whether a DPO is mandatory involves legal judgment and should be confirmed by qualified legal counsel admitted in a relevant EU/EEA jurisdiction.

---

## 1. Purpose

GDPR Art. 37 sets out three circumstances in which designation of a Data Protection Officer (DPO) is mandatory:

1. **Art. 37(1)(a):** Processing is carried out by a public authority or body
2. **Art. 37(1)(b):** Core activities of the controller or processor consist of processing operations which, by virtue of their nature, scope, or purposes, require regular and systematic monitoring of data subjects on a large scale
3. **Art. 37(1)(c):** Core activities of the controller or processor consist of processing of special categories of data pursuant to Article 9 or personal data relating to criminal convictions and offences referred to in Article 10 on a large scale

This assessment applies each criterion to xShopper Pty Ltd as it operates OpenClaw SME.

---

## 2. Assessment Against Each Mandatory Trigger

### 2.1 Criterion (a): Public Authority or Body

**GDPR Art. 37(1)(a):** "the controller or the processor is a public authority or body"

xShopper Pty Ltd is a private company incorporated in Australia. It is not a government agency, statutory authority, or any form of public body.

**Assessment: Does NOT apply.**

---

### 2.2 Criterion (b): Regular and Systematic Monitoring of Data Subjects at Large Scale

**GDPR Art. 37(1)(b):** Core activities consist of "processing operations which, by virtue of their nature, scope or purposes, require regular and systematic monitoring of data subjects on a large scale"

This criterion applies primarily to behavioural advertising platforms, employee monitoring systems, credit scoring services, and similar tracking-intensive businesses. The EDPB WP243 Guidelines on DPOs note that "monitoring the behaviour of data subjects" includes processing used to build profiles, track movements, or analyse behaviour for commercial purposes.

**Analysis:**

*Does xShopper's processing constitute "monitoring"?*

OpenClaw SME tracks AI model spend per client (daily token counts, request counts). This is operational consumption tracking — analogous to a mobile carrier tracking data usage for billing purposes — not behavioural monitoring of the type envisaged by Art. 37(1)(b). The platform does not:
- Build behavioural profiles for advertising, scoring, or profiling purposes
- Analyse user behaviour for targeting or predictive modelling
- Track user movements, locations, or activities beyond the service scope
- Systematically monitor data subjects for any purpose other than service delivery and billing

*Is it "large scale"?*

OpenClaw SME is a B2B SaaS platform described as "plan only — not yet active" at the time of this assessment. The intended customer base is SME clients in the dozens to low hundreds range in the initial phase. The EDPB's WP29 Guidelines on DPOs identify the following indicative factors for "large scale":
- Number of data subjects affected — a specific large number, or a significant portion of the population
- Volume of data processed
- Duration or permanence of processing
- Geographical extent

At launch scale, OpenClaw SME does not meet the "large scale" threshold. The platform is not designed to serve the general public; it serves SME businesses who individually sign up.

**Assessment: Does NOT currently apply.** Monitoring of consumption data is incidental to service delivery, not a core business activity. The scale is not large. However, this assessment should be revisited if the platform scales to thousands of clients or introduces new analytical or profiling features.

---

### 2.3 Criterion (c): Large-Scale Processing of Special Category Data

**GDPR Art. 37(1)(c):** Core activities consist of processing of "special categories of data pursuant to Article 9 on a large scale"

Special categories of data under Art. 9 include: health data, racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, genetic data, biometric data, data concerning sex life or sexual orientation.

**Analysis:**

*Does xShopper process special category data?*

OpenClaw SME does not actively solicit, collect, or process special category data as a defined business activity. The platform collects:
- `chat_id` — a platform identifier, not a special category
- Email addresses — not a special category
- Usage/spend data — not a special category
- AI conversation content — freeform text that may *incidentally* contain special category data if the user volunteers it

The AI conversation content is the primary area of concern. Users interacting with their AI agent may disclose health information, political views, or other special category data in the natural course of using the service. However:
- This disclosure is incidental, not solicited
- xShopper does not process this data for the *purpose* of processing special category data
- The AI model (Anthropic Claude) receives the content for the purpose of generating a response, not for categorisation or profiling of special categories
- xShopper's core activity is AI agent service delivery, not health data processing or political profiling

*Is it "large scale"?*

As assessed in 2.2 above, the platform does not currently meet the large-scale threshold.

**Assessment: Does NOT currently apply.** The incidental receipt of special category data in unstructured conversation content, where the controller does not solicit or process it as a defined category, does not trigger this criterion. However, if the platform were to expand into health-related AI services or other contexts where special category data is systematically processed, this assessment would change.

---

## 3. Optional DPO Designation

While a DPO is not mandatory, GDPR Art. 37(4) provides that controllers who are not required to designate a DPO "may or shall, in accordance with Union or Member State law, designate a data protection officer." The EDPB Guidelines on DPOs strongly recommend voluntary designation where complex data processing occurs.

**Factors supporting voluntary designation:**
- xShopper processes AI conversation content, which is inherently unpredictable in content and may include sensitive personal data
- International transfers to multiple US processors create ongoing compliance monitoring obligations
- The platform serves business clients who may themselves be subject to GDPR and will expect their service providers to have robust data protection governance
- GDPR compliance is an ongoing obligation, not a one-time exercise; a designated person provides accountability

**Factors against mandatory or full-time DPO:**
- The platform is a startup at early stage ("plan only — not yet active")
- The number of data subjects at launch is expected to be small
- Full-time DPO employment is disproportionate to scale at this stage
- The processing activities, while international, are standard SaaS patterns (payments, logging, AI API calls)

---

## 4. Recommendation

### 4.1 Mandatory DPO

**A DPO is NOT mandatory** for xShopper Pty Ltd operating OpenClaw SME at its current stage and intended scale. None of the three Art. 37(1) triggers are satisfied.

### 4.2 Designated Privacy Contact (Strongly Recommended)

xShopper Pty Ltd should designate a **named Privacy Contact** before the platform goes live. This is not a DPO but serves several essential functions:

1. **GDPR Art. 13(1)(b) compliance:** The Privacy Policy and first-run consent gate must include contact details for the controller. A generic email address is insufficient — a named individual or dedicated privacy email address is required.

2. **Data subject rights handling:** The `/my_data` and `/delete_my_data` commands provide automated self-service rights fulfilment, but complex requests (rectification, restriction, objections) require a human to assess and respond.

3. **Supervisory authority contact:** If a supervisory authority contacts xShopper (e.g., following a complaint or a breach notification), there must be a specific person to respond.

4. **Processor DPA contact:** All DPAs require a named contact on the controller side.

5. **Breach response:** The breach response plan requires a designated primary contact.

**Recommendation:** Designate an individual (could be the founder/technical lead) as the Privacy Contact. Create a dedicated email address (e.g., `privacy@xshopper.com.au`). Publish this email in the Privacy Policy, Terms of Service, and consent gate.

### 4.3 External Privacy Counsel

Given the complexity of operating a GDPR-compliant international AI platform from Australia, xShopper should retain external data protection counsel on an advisory basis to:
- Review this and other GDPR compliance documents before launch
- Advise on DPA negotiations with processors (Anthropic, Stripe)
- Provide advice on breach notifications if they occur
- Conduct annual compliance reviews

This is more cost-effective and appropriate for a startup than a full-time DPO.

### 4.4 Review Triggers for DPO Necessity

This assessment must be revisited, and DPO designation reconsidered, if any of the following occur:

| Trigger | Why it changes the assessment |
|---|---|
| Platform scales to >500 active clients | Approaches "large scale" threshold under EDPB guidance |
| New feature: systematic health or HR data processing | Would trigger Art. 37(1)(c) |
| New feature: behavioural analytics, user profiling, or credit scoring | Would trigger Art. 37(1)(b) |
| Platform expands to serve EU/EEA clients at scale | Some EU/EEA member states have lower thresholds or additional DPO requirements under national law (e.g., Germany's BDSG) |
| Processing of special category data becomes a core business activity | Triggers Art. 37(1)(c) |
| Applicable law in a served jurisdiction mandates DPO for the data processing scale | National law may impose stricter requirements |

---

## 5. GDPR Art. 37 Representative Distinction (Art. 27)

A **GDPR Art. 27 Representative** is a separate and distinct requirement from a DPO. While a DPO is not mandatory for xShopper, an **EU/EEA Representative under Art. 27 IS required** if xShopper offers services to EU/EEA data subjects or monitors their behaviour.

Art. 27 requires controllers established outside the EU/EEA (xShopper is in Australia) who process data of EU/EEA data subjects to designate a representative in the EU/EEA in writing. This representative:
- Is the contact point for EU/EEA supervisory authorities
- Is the contact point for EU/EEA data subjects
- Can be held liable alongside the controller for GDPR violations
- Must be located in the EU/EEA member state where the data subjects are located (if multiple, can be a single representative in any EU/EEA state)

**Recommendation:** If OpenClaw SME will serve EU/EEA data subjects, appoint an Art. 27 EU Representative before launch. Services such as VeraSafe (https://verasafe.com) or DataRep (https://datarep.com) provide EU representative services for a monthly fee and are a cost-effective option for startups.

The Art. 27 Representative's contact details must appear in the Privacy Policy.

---

## 6. Australian Privacy Act Considerations

Under the Australian Privacy Act 1988, there is no equivalent to a GDPR DPO requirement. However, the Office of the Australian Information Commissioner (OAIC) recommends that organisations handling personal data appoint a dedicated Privacy Officer. As a business handling personal data under the Privacy Act (as xShopper will be once the platform is live), a Privacy Officer designation is recommended best practice.

The designated Privacy Contact (Section 4.2 above) can serve in this role for Australian Privacy Act purposes as well.

---

## 7. Summary

| Question | Answer |
|---|---|
| Is a DPO mandatory under GDPR Art. 37? | No |
| Criterion (a) — public authority? | No |
| Criterion (b) — regular systematic monitoring at large scale? | No (at current stage) |
| Criterion (c) — large-scale special category processing? | No (at current stage) |
| Is voluntary DPO designation recommended? | No — disproportionate at startup scale |
| Is a Privacy Contact designation required? | Yes — required for GDPR Art. 13, breach response, and rights handling |
| Is an EU/EEA Art. 27 Representative required? | Yes — if serving EU/EEA data subjects |
| Recommended privacy contact email | privacy@xshopper.com.au (or equivalent) |
| Next DPO assessment review | 2027-02-22 or upon scale/feature change |

---

*This document is a technical compliance assessment and does not constitute legal advice. The mandatory DPO analysis involves legal judgment and should be confirmed by qualified legal counsel in a relevant EU/EEA jurisdiction before the platform goes live with EU/EEA data subjects.*
