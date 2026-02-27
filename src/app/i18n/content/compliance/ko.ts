export const COMPLIANCE_KO = `
## 회사 등록

**xShopper Pty Ltd**는 등록된 호주 회사입니다.

- **호주 상표:** No. 1749660 (Class 35)
- **운영 이름:** xAI Workspace
- **관할권:** 호주

---

## 데이터 보호

xAI Workspace는 다음 데이터 보호 프레임워크를 준수합니다:

- **General Data Protection Regulation (GDPR)** — EU/EEA 및 영국 사용자를 위한
- **Australian Privacy Act 1988** — Australian Privacy Principles (APPs) 포함

당사는 모든 개인 데이터 처리에 대해 합법적인 근거를 유지하며, 두 프레임워크에 따라 사용자가 자신의 권리를 행사할 수 있는 메커니즘을 제공합니다. 자세한 내용은 [개인정보 처리방침](/privacy)에서 확인하실 수 있습니다.

---

## 인프라 보안

모든 데이터는 전송 중 및 저장 시 모두 암호화됩니다:

- **전송 중:** 클라이언트, 서버 및 타사 서비스 간의 모든 연결에 TLS 1.3 적용
- **저장 시:** 저장된 데이터에 AES-256 암호화 적용
- **기본 호스팅:** Amazon Web Services (AWS), 시드니 리전 (ap-southeast-2)
- **보조 리전:** 특정 서비스를 위한 AWS N. Virginia (us-east-1)

인프라는 이상 징후 및 잠재적 보안 이벤트에 대한 자동 알림과 함께 24시간 연중무휴로 모니터링됩니다.

---

## 결제 규정 준수

모든 결제 처리는 **Stripe**에서 처리하며, **PCI DSS Level 1 Service Provider**로 인증되어 있습니다 — 결제 카드 업계에서 가장 높은 수준의 인증입니다.

- xAI Workspace는 신용카드 번호를 저장, 처리 또는 전송하지 **않습니다**
- 결제 카드 데이터는 전적으로 Stripe의 PCI 준수 인프라에서 처리됩니다
- 참조용으로 Stripe 고객 ID와 카드 마지막 4자리만 보관합니다

---

## AI 제공업체 데이터 처리

xAI Workspace를 사용하면 대화 내용이 선택한 AI 제공업체로 전송됩니다. 각 제공업체는 자체 데이터 처리 약속을 가지고 있습니다:

| 제공업체 | 지역 | 데이터 보존 정책 |
|---|---|---|
| **Anthropic** (Claude) | 미국 | API 입력으로 학습하지 않음; 30일 보존 |
| **OpenAI** (GPT) | 미국 | API 입력으로 학습하지 않음; 30일 보존 |
| **Google** (Gemini) | 미국 | API 입력으로 학습하지 않음 |
| **Mistral AI** | 프랑스 (EU) | API 입력으로 학습하지 않음 |
| **Groq** (Llama, Mixtral) | 미국 | 처리 후 프롬프트를 저장하지 않음 |
| **Amazon Bedrock** | 호주 / US | 데이터는 선택한 AWS 리전 내에 유지됨 |

당사는 모든 제공업체와 API 등급 액세스만 사용하며, 이는 보편적으로 고객 데이터에 대한 학습을 배제합니다.

---

## 하위 처리자

다음 제3자가 당사를 대신하여 개인 데이터를 처리합니다:

| 하위 처리자 | 목적 | 위치 |
|---|---|---|
| **Amazon Web Services** | 인프라 호스팅 | 호주 (시드니), US (N. Virginia) |
| **Stripe** | 결제 처리 | 미국 |
| **Neon** | 데이터베이스 호스팅 | 미국 |
| **Telegram** | 메시지 전달 | 네덜란드 / UAE |
| **Google** | OAuth 신원 제공업체, AI (Gemini) | 미국 |
| **Anthropic** | AI 모델 제공업체 (Claude) | 미국 |
| **OpenAI** | AI 모델 제공업체 (GPT) | 미국 |
| **Mistral AI** | AI 모델 제공업체 | 프랑스 |
| **Groq** | AI 모델 제공업체 | 미국 |

---

## 사고 대응

xShopper는 문서화된 사고 대응 프로세스를 유지합니다:

- **탐지:** 모든 인프라에 대한 자동 모니터링 및 알림
- **대응:** 사고는 4시간 이내에 분류 및 조사됩니다
- **통지:** GDPR에서 요구하고 Australian Privacy Principle 11에서 권장하는 바와 같이, 확인된 개인 데이터 침해 후 72시간 이내에 영향을 받는 사용자에게 통지합니다
- **복구:** 모든 사고에 대해 근본 원인 분석 및 시정 조치가 문서화됩니다

---

## 데이터 거주지

- **기본 데이터 저장소:** AWS Sydney (ap-southeast-2), 호주
- **데이터베이스:** Neon, 미국에서 호스팅
- **AI 처리:** 제공업체에 따라 다름 — 위의 AI 제공업체 데이터 처리 섹션 참조
- **결제:** 미국에서 Stripe를 통해 처리

엄격한 호주 데이터 거주 요건이 필요한 사용자의 경우, Amazon Bedrock 모델을 선택하면 호주 AWS 인프라 내에서 AI 처리가 이루어집니다.

---

## 연락처

규정 준수 관련 문의: **privacy@xshopper.com**

xShopper Pty Ltd, 호주
Australian Trademark No. 1749660 (Class 35)

*규정 준수 페이지 버전: 2026-02-27*
`;
