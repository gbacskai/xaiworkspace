# Transfer Impact Assessment — Anthropic API (United States)

**Platform:** OpenClaw SME
**Controller:** xShopper Pty Ltd, Sydney, Australia
**Document version:** 1.0
**Prepared:** 2026-02-22
**Review date:** 2027-02-22 (or upon change to transfer mechanism, Anthropic's legal entity, or relevant legal landscape)
**GDPR Articles:** Art. 44–46, Art. 13(1)(f)
**Transfer type:** Controller-to-Processor (Art. 28 + Art. 46)

---

> **Legal disclaimer:** This document is a technical compliance assessment and does not constitute legal advice. Transfer Impact Assessments involve legal analysis of foreign laws and should be reviewed by qualified legal counsel admitted in a relevant EU/EEA jurisdiction before the transfer is commenced.

---

## 1. Purpose and Scope

GDPR Art. 44 prohibits the transfer of personal data to a third country unless that country ensures an adequate level of data protection or one of the safeguards in Art. 46 applies. The European Court of Justice in *Schrems II* (C-311/18, 16 July 2020) confirmed that controllers must conduct a Transfer Impact Assessment (TIA) to verify that transferred data will be afforded equivalent protection to that guaranteed under EU law.

This TIA assesses the transfer of personal data from the OpenClaw SME platform (operated by xShopper Pty Ltd from Australia, processing data on behalf of EU/EEA data subjects) to **Anthropic, PBC** (registered in Delaware, operating from San Francisco, California, United States) via the Anthropic Claude API.

**This is the highest-priority transfer to assess** because:
- Anthropic is the primary AI model provider — every conversation message is transmitted to Anthropic unless the user has explicitly selected an alternative model
- The data transmitted is the most sensitive in the system (full unstructured conversation content)
- The volume is potentially high (every interaction generates an API call)
- No transfer safeguard is currently documented

---

## 2. Transfer Details

### 2.1 Data Exporter

| Attribute | Detail |
|---|---|
| Name | xShopper Pty Ltd |
| Address | Sydney, Australia |
| Role | Controller (also Processor for conversations forwarded to LiteLLM on client's behalf) |
| Contact | [Privacy contact email — to be designated] |

### 2.2 Data Importer

| Attribute | Detail |
|---|---|
| Name | Anthropic, PBC |
| Address | 548 Market St PMB 90375, San Francisco, California 94104-5401, USA |
| Legal entity type | Public Benefit Corporation, incorporated in Delaware |
| Role | Processor (processes conversation data to generate AI model responses) |
| Contact | legal@anthropic.com (verify current contact before execution) |
| Anthropic privacy policy | https://www.anthropic.com/privacy |
| Anthropic terms of service | https://www.anthropic.com/terms |

### 2.3 Transfer Mechanism

| Attribute | Detail |
|---|---|
| Proposed mechanism | Standard Contractual Clauses (SCCs) — European Commission Decision 2021/914 |
| Applicable module | Module Two (Controller-to-Processor) |
| Adequacy decision | None — the United States does not have a general adequacy decision covering this transfer. Note: Anthropic's DPF certification status should be verified at the EU DPF list (https://www.dataprivacyframework.gov) before this document is finalised. If Anthropic is DPF-certified for the relevant data categories, DPF certification can serve as the primary mechanism with SCCs as backup. |
| Supplementary measures | See Section 6 |

### 2.4 Nature of Transfer

| Attribute | Detail |
|---|---|
| Data categories | Full unstructured conversation content (text messages); AI model request metadata (model name, parameters); may incidentally include: email addresses, financial information, health information, legal matters, or any other information the user chooses to share with their AI agent |
| Data subjects | OpenClaw SME clients who are natural persons; may include EU/EEA residents |
| Frequency | Continuous — every AI interaction generates an API call to Anthropic |
| Volume | Potentially high — depends on number of clients and their usage patterns |
| Transfer route | OpenClaw (on EC2, ap-southeast-2) -> HTTPS -> LiteLLM proxy (on EB, ap-southeast-2) -> HTTPS -> api.anthropic.com |
| Encryption in transit | TLS — the connection from LiteLLM to api.anthropic.com uses HTTPS (TLS 1.2+) |

---

## 3. Assessment of US Legal Framework (Destination Country Assessment)

This section assesses whether the legal framework in the United States provides a level of data protection essentially equivalent to that guaranteed in the EU/EEA, following the methodology established by *Schrems II* and the EDPB Recommendations 01/2020 on supplementary measures.

### 3.1 Relevant US Surveillance Laws

#### 3.1.1 Foreign Intelligence Surveillance Act (FISA) Section 702

FISA Section 702 permits the US government to compel electronic communication service providers to provide access to the communications of non-US persons located outside the United States for foreign intelligence purposes. The surveillance may occur without individual judicial authorisation (it operates under court-approved certifications covering categories of targets).

**Assessment for Anthropic:** Anthropic receives electronic communications (conversation content) via its API. As an electronic communication service provider under FISA, Anthropic would be subject to Section 702 orders if the target is a non-US person and the communication is foreign intelligence information. EU/EEA data subjects using OpenClaw are non-US persons; their conversations could theoretically be subject to FISA Section 702 surveillance.

**Mitigating factor — Executive Order 14086:** On 7 October 2022, President Biden signed Executive Order 14086 on "Enhancing Safeguards for United States Signals Intelligence Activities." This EO introduced a two-tier redress mechanism for EU/EEA individuals and established proportionality requirements for US signals intelligence collection. The European Commission issued its adequacy decision for the EU-US Data Privacy Framework (DPF) on 10 July 2023 (Decision 2023/1795), partially relying on EO 14086.

**Qualification:** The DPF adequacy decision covers transfers to DPF-certified organisations. If Anthropic is DPF-certified, the DPF is the primary transfer mechanism and this detailed FISA analysis is somewhat mitigated. If Anthropic is not DPF-certified, the FISA Section 702 risk remains the primary legal concern.

**Action required:** Verify Anthropic's DPF certification status at https://www.dataprivacyframework.gov/list. If certified for the "HR Data" or "Non-HR Data" category relevant to this transfer, document the certification date and scope.

#### 3.1.2 Executive Order 12333

EO 12333 provides authority for bulk collection of data outside the US (e.g., collection of data in transit on undersea cables). It does not apply to data stored within the United States (where Anthropic processes the data). Its relevance here is limited to the in-transit phase, which is mitigated by TLS encryption.

#### 3.1.3 National Security Letters (NSLs)

NSLs (18 U.S.C. § 2709) allow the FBI to compel disclosure of subscriber information and transaction records without judicial review, with a gag order on the recipient. They cannot compel disclosure of content (unlike FISA Section 702). Their relevance to conversation content is limited.

#### 3.1.4 Cloud Act

The CLOUD Act (Clarifying Lawful Overseas Use of Data Act, 2018) allows US law enforcement to compel US-based providers to produce data stored anywhere in the world. Anthropic's data processing occurs in the US. This creates a risk that US law enforcement could compel Anthropic to produce conversation content of non-US persons without notification to those persons or their controller.

### 3.2 Anthropic's Corporate Governance

Anthropic is incorporated as a Public Benefit Corporation in Delaware. Its stated mission includes responsible AI development and safety. Anthropic has published:
- API usage policies limiting use of its API for harmful purposes
- A privacy policy addressing data handling
- Commitments (at the time of drafting) that API inputs are not used to train models for API customers

**Note:** These are contractual and policy commitments, not statutory obligations. They do not preclude Anthropic from complying with a valid FISA Section 702 or CLOUD Act demand.

### 3.3 Overall Destination Country Assessment

The United States does not have an adequacy decision covering all transfers. For transfers to DPF-certified organisations, the DPF provides a transfer mechanism but the European Parliament has raised concerns about the robustness of the DPF (noting ongoing risks from FISA Section 702). For non-DPF-certified organisations, SCCs with supplementary measures are required.

**Assessment outcome:** The US legal framework does not provide protection essentially equivalent to EU GDPR, primarily due to FISA Section 702 and the CLOUD Act. Supplementary measures are required in addition to the contractual safeguard (SCCs or DPF), as recommended by EDPB Recommendations 01/2020.

---

## 4. Assessment of Anthropic's Practices

### 4.1 Data Retention

Anthropic's privacy policy (as of knowledge cutoff, August 2025) states that for API customers, inputs and outputs are not used to train Anthropic's models by default. However, Anthropic's default data retention period for API interactions should be confirmed in the DPA:
- Verify the retention period for API request/response data
- Verify whether conversation content is stored at all, and for what period
- Verify whether sub-processors (e.g., cloud hosting, GPU providers) also store conversation data

**Action required:** The DPA must specify Anthropic's data retention and deletion obligations, including sub-processor retention.

### 4.2 Sub-processors

Anthropic is likely to use sub-processors for cloud infrastructure (possibly AWS or Google Cloud) and possibly for GPU compute (various providers). The DPA must:
- List all sub-processors who may receive conversation content
- Confirm sub-processors are bound by equivalent data protection obligations
- Provide a mechanism for xShopper to be notified of sub-processor changes

### 4.3 Security Measures

Anthropic uses HTTPS/TLS for API communications. Internal security practices should be documented in the DPA or confirmed via Anthropic's security whitepaper or SOC 2 report.

---

## 5. Effectiveness Assessment

### 5.1 If DPF Certification Applies

If Anthropic is DPF-certified for the relevant data categories, the DPF adequacy decision provides a formal legal basis for the transfer. The assessment of effectiveness is:
- The DPF provides a redress mechanism for EU/EEA individuals (Data Privacy Framework Panel)
- EO 14086 introduces proportionality requirements for US intelligence collection
- Anthropic would be subject to FTC enforcement for DPF non-compliance
- Residual risk from FISA Section 702 exists but is mitigated by the DPF framework

**Conclusion if DPF applies:** The DPF provides a sufficient transfer mechanism, subject to annual recertification verification. Supplementary measures (Section 6) should still be implemented as a defence-in-depth posture.

### 5.2 If DPF Certification Does Not Apply (SCCs Only)

The 2021 SCCs (Module Two, Controller-to-Processor) impose obligations on Anthropic to:
- Process data only on xShopper's instructions
- Notify xShopper if it receives a legally binding request from a public authority for data
- Challenge requests for data disclosure where legally possible
- Use technical and organisational measures to protect data

However, SCCs are contractual obligations. If Anthropic receives a legally binding FISA Section 702 order, it is legally prohibited from disclosing the order to xShopper and may be compelled to comply. The SCC obligation to notify the controller would be overridden by the legal prohibition on disclosure.

**Conclusion if SCCs only:** SCCs alone do not fully address the FISA Section 702 risk. Supplementary measures (Section 6) are essential to improve the assessment outcome.

---

## 6. Supplementary Measures

The following supplementary measures are recommended to strengthen the protection of personal data transferred to Anthropic.

### 6.1 Technical Supplementary Measures

**SM-T1: Encryption in Transit**
All API calls to api.anthropic.com use HTTPS with TLS 1.2+. This mitigates EO 12333 bulk collection risks during transit. Status: Implemented (HTTPS used by LiteLLM proxy).

**SM-T2: Pseudonymisation of Conversation Content**
Where technically feasible, replace the user's `chat_id` in conversation context passed to Anthropic with a pseudonymous identifier. This limits the ability to re-identify conversations in isolation if data is disclosed under a FISA order.
Status: Not yet implemented. Partial — conversations are forwarded without a direct `chat_id` field in the prompt, but the AI agent's MEMORY.md and workspace files may contain identifying information if the user has volunteered it.

**SM-T3: Data Minimisation in Prompts**
Instruct users (via documentation and the first-run consent gate) not to include personal identification information in their AI conversations unless necessary. This reduces the sensitivity of the data at rest at Anthropic.
Status: Not yet implemented — add to Privacy Policy and first-run disclosure.

### 6.2 Contractual Supplementary Measures

**SM-C1: Transparency Obligations**
The DPA with Anthropic should require Anthropic to: (a) maintain a transparency report disclosing the number of government requests received, to the extent permitted by law; (b) commit to challenging overly broad government requests; (c) notify xShopper as soon as legally permitted if data is disclosed to a government authority.

**SM-C2: Sub-processor Control**
The DPA must grant xShopper the right to object to new sub-processors and to audit sub-processor compliance.

**SM-C3: Data Deletion Guarantee**
The DPA must specify that Anthropic deletes all conversation content within a defined period after processing (ideally immediately after generating a response, unless a longer retention is technically necessary). Anthropic should confirm in writing the maximum retention period.

### 6.3 Organisational Supplementary Measures

**SM-O1: User Disclosure at Consent Gate**
The first-run consent gate should explicitly disclose: "Your AI conversation messages are processed by Anthropic (United States) to generate responses. Anthropic is our primary AI model provider. This involves the transfer of your conversation content to the United States. By using this service, you acknowledge this transfer. You can select alternative AI models via /models."

**SM-O2: Model Selection Transparency**
At the `/models` command, display the processor name and jurisdiction alongside each model option, so users can make informed choices about where their data is processed.

**SM-O3: Privacy Policy Disclosure**
The Privacy Policy at xaiworkspace.com/privacy must disclose: (a) Anthropic as a third-country processor; (b) the transfer mechanism (DPF if certified, otherwise SCCs); (c) the fact that the US does not have an adequacy decision; (d) a reference to the safeguards in place; (e) how to obtain a copy of the SCCs.

---

## 7. Transfer Mechanism Conclusion

| Scenario | Mechanism | Sufficiency |
|---|---|---|
| Anthropic holds current DPF certification | EU-US DPF adequacy decision (Commission Decision 2023/1795) + DPF-certified entity | Sufficient, subject to annual recertification check and SM-O1, SM-O2, SM-O3 |
| Anthropic not DPF-certified | SCCs (Module Two) + supplementary measures SM-T1 through SM-T3, SM-C1 through SM-C3, SM-O1 through SM-O3 | Sufficient on balance, noting residual FISA Section 702 risk that cannot be fully eliminated by technical or contractual means |

---

## 8. Required Actions Before Transfer Can Lawfully Commence (for EU/EEA Data Subjects)

| Action | Responsibility | Deadline |
|---|---|---|
| 1. Verify Anthropic's DPF certification status at dataprivacyframework.gov | Technical/Legal lead | Before launch |
| 2. If DPF-certified: document certification date, scope, and coverage in DPA Tracker | Legal lead | Before launch |
| 3. If not DPF-certified: initiate SCC execution with Anthropic (Module Two) | Legal lead | Before launch |
| 4. Execute Anthropic DPA (see DPA Tracker — Processor 2.4) | Legal lead | Before launch |
| 5. Confirm Anthropic's data retention policy for API inputs in writing via DPA | Legal lead | Before launch |
| 6. Update Privacy Policy to disclose Anthropic transfer, mechanism, and safeguards | Technical lead | Before launch |
| 7. Add Anthropic disclosure to first-run consent gate (SM-O1) | Technical lead | Before launch |
| 8. Add processor jurisdiction labels to `/models` command (SM-O2) | Technical lead | Before launch |
| 9. Document this TIA in the RoPA and link from the DPIA | Compliance lead | Before launch |
| 10. Set annual review date for TIA (DPF recertification, legal landscape changes) | Compliance lead | 2027-02-22 |

---

## 9. Monitoring and Review

This TIA must be reviewed:
- Annually (next review: 2027-02-22)
- If Anthropic changes its DPF certification status or legal entity
- If the European Court of Justice or EDPB issues new guidance on US transfers
- If the EU-US DPF is invalidated by a future court decision (a risk noted by privacy advocates)
- If Anthropic materially changes its data processing practices, privacy policy, or sub-processors

---

*This document is a technical compliance assessment and does not constitute legal advice. The legal analysis of foreign surveillance laws is inherently uncertain and evolving. This TIA should be reviewed by qualified legal counsel admitted in a relevant EU/EEA jurisdiction before the Anthropic transfer is commenced for EU/EEA data subjects.*
