import { LocalizedArticle } from '../../i18n.types';

export const ARTICLES_ID: Record<string, LocalizedArticle> = {
  welcome: {
    title: 'Selamat Datang di xAI Workspace',
    subtitle: 'Agen AI pribadi Anda',
    content: `
**xAI Workspace** memberi Anda agen AI khusus yang dapat diakses langsung di dalam xAI Workspace — tanpa perlu menginstal aplikasi, tanpa perlu membuat akun.

## Cara kerjanya

1. **Mulai bot** — Kirim \`/start\` untuk memulai. Anda langsung mendapatkan uji coba gratis.
2. **Langsung chat** — Kirim pesan apa saja dan agen AI Anda akan merespons. Agen ini memahami konteks, dapat membantu riset, menulis, membuat kode, dan banyak lagi.
3. **Instance Anda sendiri** — Berbeda dengan chatbot AI bersama, Anda mendapatkan agen khusus yang berjalan di servernya sendiri dengan memori persisten.

## Apa yang membuat xAI Workspace berbeda

- **Privat** — Percakapan Anda tetap berada di instance khusus Anda
- **Persisten** — Agen Anda mengingat konteks di seluruh sesi
- **Powerful** — Didukung oleh Claude, salah satu model AI paling canggih
- **Simpel** — Hanya menggunakan xAI Workspace. Tanpa aplikasi baru, tanpa kurva pembelajaran
    `,
  },
  'first-steps': {
    title: 'Langkah Pertama',
    subtitle: 'Siapkan agen Anda dalam 60 detik',
    content: `
## 1. Mulai bot

Buka xAI Workspace dan kirim \`/start\` ke **@xAIWorkspaceBot**. Uji coba gratis Anda langsung dimulai — tanpa perlu kartu kredit.

## 2. Tunggu proses penyiapan

Instance AI khusus Anda membutuhkan sekitar 2 menit untuk disiapkan. Anda akan menerima notifikasi ketika sudah siap.

## 3. Kirim pesan pertama Anda

Cukup ketik apa saja! Coba:
- "Apa yang bisa kamu bantu?"
- "Rangkum berita terbaru tentang AI"
- "Tulis skrip Python yang mengurutkan sebuah daftar"

## 4. Jelajahi perintah

- \`/authorize\` — Hubungkan Google, Microsoft, GitHub dan lainnya
- \`/usage\` — Cek sisa penggunaan Anda
- \`/billing\` — Kelola langganan Anda
- \`/language\` — Ubah bahasa pilihan Anda
- \`/ssh\` — Hubungkan ke workspace Anda untuk akses file
- \`/help\` — Lihat semua perintah yang tersedia
- \`/models\` — Beralih antar model AI
    `,
  },
  models: {
    title: 'Model AI',
    subtitle: 'Pilih model yang tepat untuk tugas Anda',
    content: `
xAI Workspace mendukung beberapa model AI dari berbagai penyedia. Beralih antar model dengan \`/models\`.

## Model yang Tersedia

| Model | Paling cocok untuk |
|-------|----------|
| **Claude Sonnet** | Tugas sehari-hari — cepat, mumpuni, seimbang |
| **Claude Opus** | Penalaran kompleks, riset, dokumen panjang |
| **Claude Haiku** | Jawaban cepat, tugas sederhana, biaya terendah |
| **GPT-4o** | Serbaguna, bagus untuk output terstruktur |
| **DeepSeek** | Penalaran dan coding hemat biaya |
| **Gemini** | Tugas multimodal, jendela konteks besar |

## Mengganti model

1. Kirim \`/models\` di chat
2. Ketuk model yang ingin Anda gunakan
3. Tanda ✓ muncul di samping model aktif Anda

Pilihan Anda bertahan di seluruh sesi. Anda bisa beralih kapan saja.

## Penggunaan token

Model yang berbeda mengonsumsi token dengan tingkat yang berbeda. Opus menggunakan lebih banyak token per respons dibandingkan Haiku. Cek sisa penggunaan Anda dengan \`/usage\`.
    `,
  },
  'remote-access': {
    title: 'Akses Jarak Jauh',
    subtitle: 'Akses SSH dan SFTP ke workspace Anda',
    content: `
Setiap instance xAI Workspace adalah mesin khusus milik Anda. Anda dapat terhubung melalui SSH atau SFTP untuk mengelola file, menjalankan alat, dan menyesuaikan lingkungan Anda.

## Mendapatkan kunci Anda

1. Kirim \`/ssh\` di chat xAI Workspace
2. Bot akan mengirimkan file kunci \`.pem\` beserta detail koneksi
3. Simpan file tersebut dan atur izin sebelum terhubung

## SSH — Akses terminal

\`\`\`bash
# Atur izin pada file kunci (wajib, sekali saja)
chmod 600 <chatId>-xaiworkspace.pem

# Hubungkan melalui bastion host
ssh -i <chatId>-xaiworkspace.pem xai<chatId>@ssh.xaiworkspace.com
\`\`\`

Ganti \`<chatId>\` dengan ID chat xAI Workspace Anda (tertera pada nama file kunci).

> Jika Anda mendapat error "permission denied", pastikan Anda sudah menjalankan \`chmod 600\` pada file kunci.

## SFTP — Transfer file

Anda dapat menggunakan klien SFTP apa saja untuk mengunggah dan mengunduh file:

\`\`\`bash
# SFTP melalui command-line
sftp -i <chatId>-xaiworkspace.pem xai<chatId>@ssh.xaiworkspace.com
\`\`\`

### FileZilla — Panduan langkah demi langkah

FileZilla adalah klien SFTP gratis dan lintas platform. Ikuti langkah-langkah berikut untuk terhubung ke workspace Anda:

#### 1. Unduh dan instal FileZilla

Unduh FileZilla Client (bukan Server) dari [filezilla-project.org](https://filezilla-project.org). Tersedia untuk Windows, macOS, dan Linux.

#### 2. Buka Site Manager

Jalankan FileZilla dan buka **File → Site Manager** (atau tekan **Ctrl+S** di Windows/Linux, **Cmd+S** di macOS).

#### 3. Buat site baru

1. Klik **New Site**
2. Beri nama **xAI Workspace**

#### 4. Masukkan pengaturan koneksi

Isi panel sebelah kanan:

| Pengaturan | Nilai |
|---|---|
| **Protocol** | SFTP - SSH File Transfer Protocol |
| **Host** | ssh.xaiworkspace.com |
| **Port** | 22 |
| **Logon Type** | Key file |
| **User** | xai\`<chatId>\` |

#### 5. Tambahkan file kunci Anda

1. Di kolom **Key file**, klik **Browse...**
2. Pilih file \`.pem\` yang Anda unduh dari \`/ssh\`
3. Jika FileZilla meminta untuk mengonversi kunci ke format PPK, klik **Yes** — file yang dikonversi akan disimpan secara otomatis

> Di macOS atau Linux, pastikan Anda sudah menjalankan \`chmod 600\` pada file .pem terlebih dahulu.

#### 6. Hubungkan

1. Klik **Connect**
2. Pada koneksi pertama, FileZilla menampilkan dialog "Unknown host key" — periksa detailnya dan klik **OK** untuk mempercayai server

#### 7. Transfer file

- **Panel kiri** menampilkan file lokal Anda
- **Panel kanan** menampilkan file workspace Anda
- **Seret dan lepas** file antar panel untuk mengunggah atau mengunduh
- **Klik kanan** untuk opsi ganti nama, hapus, dan izin

> **Tips:** Site Anda tersimpan di Site Manager. Lain kali, buka Site Manager dan klik dua kali **xAI Workspace** untuk langsung terhubung kembali.

Klien SFTP grafis lainnya seperti **Cyberduck** dan **WinSCP** juga dapat digunakan — gunakan pengaturan host, port, username, dan file kunci yang sama seperti di atas.

## Yang dapat Anda lakukan

Setelah terhubung, workspace Anda sepenuhnya milik Anda:

- **Kelola file** — jelajahi, edit, unggah, dan unduh dokumen
- **Pantau aktivitas** — lihat log agen Anda secara real time
- **Instal alat** — tambahkan perangkat lunak atau runtime apa pun yang Anda butuhkan
- **Jalankan otomatisasi** — atur tugas terjadwal atau layanan latar belakang
- **Transfer file** — gunakan \`scp\`, \`rsync\`, atau SFTP untuk memindahkan file

## Jika workspace Anda masih dalam proses penyiapan

Jika workspace Anda masih dalam proses provisi, bot akan memberi tahu Anda. Tunggu beberapa menit dan coba \`/ssh\` lagi.

## Keamanan

- Semua koneksi melalui **bastion host** — instance Anda tidak pernah terekspos langsung ke internet
- Kunci enkripsi ed25519 unik dihasilkan untuk setiap workspace saat penyiapan
- Login dengan kata sandi dinonaktifkan — hanya file kunci pribadi Anda yang dapat digunakan
- Akses root dibatasi untuk keamanan
- Kunci Anda disimpan terenkripsi di S3 dan hanya dikirimkan ke chat xAI Workspace Anda
    `,
  },
  billing: {
    title: 'Paket & Tagihan',
    subtitle: 'Langganan, token, dan pembayaran',
    content: `
## Paket

| Paket | Harga | Keunggulan |
|------|-------|------------|
| **Trial** | Gratis | Bebas iklan, undang teman |
| **Essential** | $100/bln | Bebas iklan, undang teman, model lebih baik |
| **Professional** | $300/bln | Model prioritas, tanpa perlu undangan |
| **Enterprise** | $600/bln | Model premium, instance khusus |
| **Ultimate** | $2.500/bln | Model & tarif terbaik, instance khusus |

Tingkat yang lebih tinggi membuka tarif lebih baik dan akses ke model yang lebih canggih.

## Mengelola langganan Anda

Kirim \`/billing\` untuk membuka dasbor tagihan di mana Anda dapat:
- Melihat paket saat ini dan tanggal perpanjangan
- Upgrade atau downgrade
- Mengaktifkan isi ulang otomatis untuk penggunaan tambahan
- Memperbarui metode pembayaran

## Penggunaan tambahan

Hampir habis? Aktifkan **isi ulang otomatis** di \`/billing\` untuk membeli penggunaan tambahan secara otomatis saat Anda mencapai batas.

## Riwayat pembayaran

Kirim \`/invoices\` untuk melihat semua pembayaran dan tanda terima sebelumnya.
    `,
  },
  productivity: {
    title: 'Tips Produktivitas',
    subtitle: 'Dapatkan hasil maksimal dari agen AI Anda',
    content: `
## Berikan instruksi yang spesifik

Alih-alih "bantu saya menulis email", coba:
> "Tulis email profesional kepada klien saya John untuk menolak rapat hari Jumat. Sarankan hari Selasa atau Rabu sebagai gantinya. Buat singkat dan ramah."

## Manfaatkan konteks

Agen Anda mengingat percakapan. Bangun dari pesan-pesan sebelumnya:
1. "Analisis data CSV ini: ..."
2. "Sekarang buat grafik yang menunjukkan tren bulanan"
3. "Tambahkan paragraf ringkasan untuk tim eksekutif"

## Pilih model yang tepat

- **Pertanyaan cepat?** → Haiku (tercepat, termurah)
- **Pekerjaan sehari-hari?** → Sonnet (default, seimbang)
- **Analisis kompleks?** → Opus (paling canggih)

Beralih dengan \`/models\`.

## Pantau penggunaan

Cek \`/usage\` secara rutin untuk melacak konsumsi token Anda. Bilah progres menunjukkan alokasi bulanan Anda.
    `,
  },
  'language-region': {
    title: 'Bahasa & Wilayah',
    subtitle: 'Ubah bahasa dan lokasi server',
    content: `
## Ubah bahasa

Kirim \`/language\` untuk memilih dari 10 bahasa yang didukung:

| | |
|---|---|
| 🇬🇧 English | 🇨🇳 中文 |
| 🇪🇸 Español | 🇸🇦 العربية |
| 🇧🇷 Português | 🇩🇪 Deutsch |
| 🇫🇷 Français | 🇯🇵 日本語 |
| 🇷🇺 Русский | 🇮🇳 हिन्दी |

Preferensi bahasa Anda terdeteksi secara otomatis dari pengaturan xAI Workspace Anda pada penggunaan pertama, tetapi Anda dapat mengubahnya kapan saja. Semua pesan bot akan ditampilkan dalam bahasa yang Anda pilih.

## Ubah wilayah

Kirim \`/region\` untuk memindahkan instance AI Anda ke wilayah server yang berbeda. Ini dapat mengurangi latensi jika Anda lebih dekat ke pusat data lain.

Wilayah yang tersedia ditampilkan dengan pilihan Anda saat ini yang disorot.
    `,
  },
  'privacy-data': {
    title: 'Data & Privasi Anda',
    subtitle: 'Akses, ekspor, atau hapus data Anda',
    content: `
## Kontrol privasi

xAI Workspace memberi Anda kendali penuh atas data pribadi Anda, langsung di dalam xAI Workspace:

- \`/privacy\` — Lihat Kebijakan Privasi dan Ketentuan Layanan
- \`/my_data\` — Ekspor semua data pribadi Anda sebagai file JSON
- \`/delete_my_data\` — Hapus semua data pribadi Anda secara permanen

## Yang diekspor

Perintah \`/my_data\` mengekspor:

- Detail akun Anda (paket, email, wilayah)
- Riwayat pembayaran
- Statistik penggunaan
- Informasi instance server

## Yang dihapus

Perintah \`/delete_my_data\` menghapus:

- Catatan klien Anda dan semua data akun
- Riwayat pembayaran
- Log penggunaan dan pelacakan pengeluaran
- Instance AI Anda dan semua file di dalamnya
- Kunci akses dan catatan koneksi

Tindakan ini **bersifat permanen dan tidak dapat dibatalkan**. Anda akan diminta untuk mengonfirmasi sebelum penghapusan dilanjutkan.

## Kontak

Untuk pertanyaan privasi: privacy@xshopper.com
    `,
  },
  referrals: {
    title: 'Undang Teman',
    subtitle: 'Dapatkan bonus token dengan referral',
    content: `
## Cara kerjanya

1. Kirim \`/invite email@example.com\` untuk mengundang teman
2. Anda mendapat **200K bonus token** langsung untuk setiap undangan yang dikirim
3. Ketika teman Anda berlangganan, Anda mendapat bonus referral tambahan

## Aturan

- Maksimal **5 kredit undangan per bulan**
- Maksimal **10 undangan tertunda** (belum digunakan) pada satu waktu
- Email yang sama tidak dapat diundang ulang dalam waktu **4 minggu**
- Orang yang diundang belum boleh memiliki akun xAI Workspace

## Melacak undangan Anda

Kirim \`/invites\` untuk melihat semua undangan yang telah Anda kirim beserta statusnya:
- **waiting** — undangan terkirim, belum mendaftar
- **signed up** — orang yang diundang telah membuat akun
- **subscribed** — orang yang diundang telah melakukan pembayaran pertama (bonus referral didapat)
    `,
  },
};
