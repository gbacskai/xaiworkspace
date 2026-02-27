export const COMPLIANCE_TR = `
## Şirket Kaydı

**xShopper Pty Ltd** kayıtlı bir Avustralya şirketidir.

- **Avustralya Ticari Markası:** No. 1749660 (Class 35)
- **Faaliyet adı:** xAI Workspace
- **Yetki alanı:** Avustralya

---

## Veri Koruma

xAI Workspace aşağıdaki veri koruma çerçevelerine uygundur:

- **General Data Protection Regulation (GDPR)** — EU/EEA ve Birleşik Krallık'taki kullanıcılar için
- **Australian Privacy Act 1988** — Australian Privacy Principles (APPs) dahil

Tüm kişisel veri işleme için yasal dayanağı koruyoruz ve kullanıcılara her iki çerçeve kapsamındaki haklarını kullanmaları için mekanizmalar sağlıyoruz. Ayrıntılı bilgiler [Gizlilik Politikamızda](/privacy) mevcuttur.

---

## Altyapı Güvenliği

Tüm veriler hem aktarım sırasında hem de durağan haldeyken şifrelenir:

- **Aktarım sırasında:** İstemciler, sunucular ve üçüncü taraf hizmetler arasındaki tüm bağlantılar için TLS 1.3
- **Durağan halde:** Depolanan veriler için AES-256 şifreleme
- **Birincil barındırma:** Amazon Web Services (AWS), Sidney bölgesi (ap-southeast-2)
- **İkincil bölge:** Belirli hizmetler için AWS N. Virginia (us-east-1)

Altyapı, anormallikler ve olası güvenlik olayları için otomatik uyarılarla 7/24 izlenmektedir.

---

## Ödeme Uyumluluğu

Tüm ödeme işlemleri, ödeme kartı sektöründe en yüksek sertifikasyon seviyesi olan **PCI DSS Level 1 Service Provider** olarak sertifikalı **Stripe** tarafından gerçekleştirilir.

- xAI Workspace kredi kartı numaralarını depolamaz, işlemez veya iletmez
- Ödeme kartı verileri tamamen Stripe'ın PCI uyumlu altyapısı tarafından işlenir
- Referans amacıyla yalnızca Stripe müşteri kimliği ve kartın son 4 hanesi saklanır

---

## AI Sağlayıcı Veri İşleme

xAI Workspace kullandığınızda, konuşma içeriğiniz seçtiğiniz AI sağlayıcısına gönderilir. Her sağlayıcının kendi veri işleme taahhütleri vardır:

| Sağlayıcı | Bölge | Veri saklama politikası |
|---|---|---|
| **Anthropic** (Claude) | Amerika Birleşik Devletleri | API girdileri üzerinde eğitim yapmaz; 30 gün saklama |
| **OpenAI** (GPT) | Amerika Birleşik Devletleri | API girdileri üzerinde eğitim yapmaz; 30 gün saklama |
| **Google** (Gemini) | Amerika Birleşik Devletleri | API girdileri üzerinde eğitim yapmaz |
| **Mistral AI** | Fransa (EU) | API girdileri üzerinde eğitim yapmaz |
| **Groq** (Llama, Mixtral) | Amerika Birleşik Devletleri | İşleme sonrası istemleri saklamaz |
| **Amazon Bedrock** | Avustralya / US | Veriler seçtiğiniz AWS bölgesinde kalır |

Tüm sağlayıcılarla yalnızca API düzeyinde erişim kullanıyoruz; bu, müşteri verileri üzerinde eğitimi evrensel olarak dışlar.

---

## Alt İşleyiciler

Aşağıdaki üçüncü taraflar bizim adımıza kişisel verileri işlemektedir:

| Alt İşleyici | Amaç | Konum |
|---|---|---|
| **Amazon Web Services** | Altyapı barındırma | Avustralya (Sidney), US (N. Virginia) |
| **Stripe** | Ödeme işleme | Amerika Birleşik Devletleri |
| **Neon** | Veritabanı barındırma | Amerika Birleşik Devletleri |
| **Telegram** | Mesaj iletimi | Hollanda / BAE |
| **Google** | OAuth kimlik sağlayıcı, AI (Gemini) | Amerika Birleşik Devletleri |
| **Anthropic** | AI model sağlayıcı (Claude) | Amerika Birleşik Devletleri |
| **OpenAI** | AI model sağlayıcı (GPT) | Amerika Birleşik Devletleri |
| **Mistral AI** | AI model sağlayıcı | Fransa |
| **Groq** | AI model sağlayıcı | Amerika Birleşik Devletleri |

---

## Olay Müdahalesi

xShopper belgelenmiş bir olay müdahale sürecini yürütmektedir:

- **Tespit:** Tüm altyapıda otomatik izleme ve uyarı
- **Müdahale:** Olaylar 4 saat içinde önceliklendirilir ve soruşturulur
- **Bildirim:** GDPR tarafından zorunlu tutulan ve Australian Privacy Principle 11 kapsamında önerilen şekilde, onaylanmış bir kişisel veri ihlalinden sonraki 72 saat içinde etkilenen kullanıcılar bilgilendirilir
- **İyileştirme:** Her olay için kök neden analizi ve düzeltici eylemler belgelenir

---

## Veri İkameti

- **Birincil veri depolama:** AWS Sydney (ap-southeast-2), Avustralya
- **Veritabanı:** Neon, Amerika Birleşik Devletleri'nde barındırılmaktadır
- **AI işleme:** Sağlayıcıya göre değişir — yukarıdaki AI Sağlayıcı Veri İşleme bölümüne bakın
- **Ödemeler:** Amerika Birleşik Devletleri'nde Stripe tarafından işlenir

Katı Avustralya veri ikameti gerektiren kullanıcılar için Amazon Bedrock modellerini seçmek, AI işlemenin Avustralya AWS altyapısı içinde gerçekleşmesini sağlar.

---

## İletişim

Uyumluluk sorguları için: **privacy@xshopper.com**

xShopper Pty Ltd, Avustralya
Australian Trademark No. 1749660 (Class 35)

*Uyumluluk sayfası sürümü: 2026-02-27*
`;
