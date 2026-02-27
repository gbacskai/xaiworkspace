export const COMPLIANCE_ID = `
## Pendaftaran Perusahaan

**xShopper Pty Ltd** adalah perusahaan Australia yang terdaftar.

- **Merek Dagang Australia:** No. 1749660 (Class 35)
- **Nama operasional:** xAI Workspace
- **Yurisdiksi:** Australia

---

## Perlindungan Data

xAI Workspace mematuhi kerangka perlindungan data berikut:

- **General Data Protection Regulation (GDPR)** — untuk pengguna di EU/EEA dan Inggris
- **Australian Privacy Act 1988** — termasuk Australian Privacy Principles (APPs)

Kami mempertahankan dasar hukum untuk semua pemrosesan data pribadi dan menyediakan mekanisme bagi pengguna untuk menggunakan hak mereka di bawah kedua kerangka tersebut. Detail lengkap tersedia di [Kebijakan Privasi](/privacy) kami.

---

## Keamanan Infrastruktur

Semua data dienkripsi baik saat transit maupun saat diam:

- **Saat transit:** TLS 1.3 untuk semua koneksi antara klien, server, dan layanan pihak ketiga
- **Saat diam:** Enkripsi AES-256 untuk data yang tersimpan
- **Hosting utama:** Amazon Web Services (AWS), wilayah Sydney (ap-southeast-2)
- **Wilayah sekunder:** AWS N. Virginia (us-east-1) untuk layanan tertentu

Infrastruktur dipantau 24/7 dengan peringatan otomatis untuk anomali dan potensi peristiwa keamanan.

---

## Kepatuhan Pembayaran

Semua pemrosesan pembayaran ditangani oleh **Stripe**, yang bersertifikat sebagai **PCI DSS Level 1 Service Provider** — tingkat sertifikasi tertinggi dalam industri kartu pembayaran.

- xAI Workspace **tidak** menyimpan, memproses, atau mengirimkan nomor kartu kredit
- Data kartu pembayaran ditangani sepenuhnya oleh infrastruktur Stripe yang sesuai PCI
- Kami hanya menyimpan ID pelanggan Stripe dan 4 digit terakhir kartu untuk referensi

---

## Penanganan Data Penyedia AI

Ketika Anda menggunakan xAI Workspace, konten percakapan Anda dikirim ke penyedia AI yang Anda pilih. Setiap penyedia memiliki komitmen penanganan data mereka sendiri:

| Penyedia | Wilayah | Kebijakan retensi data |
|---|---|---|
| **Anthropic** (Claude) | Amerika Serikat | Tidak melatih dari input API; retensi 30 hari |
| **OpenAI** (GPT) | Amerika Serikat | Tidak melatih dari input API; retensi 30 hari |
| **Google** (Gemini) | Amerika Serikat | Tidak melatih dari input API |
| **Mistral AI** | Prancis (EU) | Tidak melatih dari input API |
| **Groq** (Llama, Mixtral) | Amerika Serikat | Tidak menyimpan prompt setelah pemrosesan |
| **Amazon Bedrock** | Australia / US | Data tetap dalam wilayah AWS yang Anda pilih |

Kami hanya menggunakan akses tingkat API dengan semua penyedia, yang secara universal mengecualikan pelatihan pada data pelanggan.

---

## Sub-pemroses

Pihak ketiga berikut memproses data pribadi atas nama kami:

| Sub-pemroses | Tujuan | Lokasi |
|---|---|---|
| **Amazon Web Services** | Hosting infrastruktur | Australia (Sydney), US (N. Virginia) |
| **Stripe** | Pemrosesan pembayaran | Amerika Serikat |
| **Neon** | Hosting basis data | Amerika Serikat |
| **Telegram** | Pengiriman pesan | Belanda / UEA |
| **Google** | Penyedia identitas OAuth, AI (Gemini) | Amerika Serikat |
| **Anthropic** | Penyedia model AI (Claude) | Amerika Serikat |
| **OpenAI** | Penyedia model AI (GPT) | Amerika Serikat |
| **Mistral AI** | Penyedia model AI | Prancis |
| **Groq** | Penyedia model AI | Amerika Serikat |

---

## Respons Insiden

xShopper memelihara proses respons insiden yang terdokumentasi:

- **Deteksi:** Pemantauan otomatis dan peringatan di seluruh infrastruktur
- **Respons:** Insiden ditriase dan diselidiki dalam waktu 4 jam
- **Pemberitahuan:** Pengguna yang terdampak diberitahu dalam waktu 72 jam setelah pelanggaran data pribadi dikonfirmasi, sebagaimana diwajibkan oleh GDPR dan direkomendasikan berdasarkan Australian Privacy Principle 11
- **Perbaikan:** Analisis akar penyebab dan tindakan korektif didokumentasikan untuk setiap insiden

---

## Residensi Data

- **Penyimpanan data utama:** AWS Sydney (ap-southeast-2), Australia
- **Basis data:** Neon, dihosting di Amerika Serikat
- **Pemrosesan AI:** Bervariasi berdasarkan penyedia — lihat bagian Penanganan Data Penyedia AI di atas
- **Pembayaran:** Diproses oleh Stripe di Amerika Serikat

Untuk pengguna yang memerlukan residensi data Australia yang ketat, memilih model Amazon Bedrock memastikan pemrosesan AI terjadi dalam infrastruktur AWS Australia.

---

## Kontak

Untuk pertanyaan kepatuhan: **privacy@xshopper.com**

xShopper Pty Ltd, Australia
Australian Trademark No. 1749660 (Class 35)

*Versi halaman kepatuhan: 2026-02-27*
`;
