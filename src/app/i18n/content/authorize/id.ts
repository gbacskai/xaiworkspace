export const AUTHORIZE_ID = `
## Apa itu /authorize?

Perintah \`/authorize\` menghubungkan layanan pihak ketiga (seperti Google, GitHub, atau Microsoft) ke agen xAI Workspace Anda. Setelah terhubung, agen Anda dapat berinteraksi dengan layanan-layanan tersebut atas nama Anda.

---

## Cara Kerjanya

1. Kirim \`/authorize\` di chat xAI Workspace Anda
2. Pilih penyedia dari tombol-tombol yang tersedia (misalnya Google)
3. Agen Anda menerima permintaan dan mengirimkan tautan otorisasi
4. Klik tautan tersebut, masuk ke akun penyedia, dan berikan akses
5. Token dikirimkan ke agen Anda dan disimpan di \`OAUTH.md\`

Agen Anda kemudian dapat menggunakan token yang tersimpan untuk mengakses layanan yang terhubung.

---

## Penyedia yang Tersedia

Penyedia berikut tersedia secara langsung (jika telah dikonfigurasi oleh platform):

| Penyedia | Yang dapat dilakukan agen Anda |
|---|---|
| **Google** | Mengakses Google Drive, Gmail, Calendar, dan Google API lainnya |
| **GitHub** | Membaca/menulis repositori, mengelola issue, pull request |
| **Microsoft** | Mengakses OneDrive, Outlook, Microsoft 365 API |

Jika tombol penyedia tidak muncul, berarti penyedia tersebut belum dikonfigurasi.

---

## Custom OAuth App

Agen Anda juga dapat terhubung ke **penyedia OAuth apa saja** menggunakan kredensial aplikasi Anda sendiri. Ini berguna ketika Anda:

- Ingin menggunakan aplikasi OAuth Anda sendiri alih-alih yang dibagikan
- Perlu terhubung ke penyedia yang tidak tercantum di atas (misalnya Slack, GitLab, Bitbucket)
- Memerlukan scope OAuth tertentu untuk kebutuhan Anda

### Cara menyiapkan custom OAuth app

1. **Daftarkan OAuth app** pada penyedia Anda (misalnya Google Cloud Console, GitHub Developer Settings)

2. **Atur redirect URI** ke:
   \`\`\`
   https://router.xaiworkspace.com/oauth/callback
   \`\`\`

3. **Beritahu agen Anda** kredensialnya. Kirim pesan seperti:
   > Set up OAuth for GitHub with client ID \`your-client-id\` and client secret \`your-client-secret\`

4. Agen Anda akan memanggil router untuk menghasilkan state token, membuat URL otorisasi, dan mengirimkan tautan kepada Anda

5. Setelah Anda mengotorisasi, token ditukar dan disimpan ke \`OAUTH.md\` di instance agen Anda

### Cara kerja di balik layar

Ketika agen Anda memulai alur custom OAuth, agen memanggil endpoint \`/oauth/state\` di router dengan \`clientId\`, \`clientSecret\`, dan \`tokenUrl\` kustom Anda. Router menyimpan informasi ini per klien dan menggunakannya saat penyedia OAuth mengarahkan kembali ke URL callback.

---

## Keamanan

- **Rahasia OAuth app tidak pernah meninggalkan router** -- untuk penyedia global, client secret disimpan di AWS Secrets Manager dan tidak pernah dikirim ke instance agen Anda
- **Kredensial kustom disimpan per klien** di database dan hanya digunakan untuk pertukaran token Anda
- **State token kedaluwarsa setelah 10 menit** untuk mencegah serangan replay
- **Token disimpan secara lokal** di instance agen Anda dalam \`OAUTH.md\` -- token tidak dibagikan dengan pengguna lain

---

## Pemecahan Masalah

| Masalah | Solusi |
|---|---|
| Tombol penyedia tidak muncul | Platform belum mengkonfigurasi penyedia OAuth apa pun |
| "Your agent must be running" | Kirim \`/start\` untuk membangunkan instance Anda terlebih dahulu |
| Tautan otorisasi tidak datang | Agen Anda mungkin sedang sibuk -- tunggu sebentar dan coba lagi |
| "State expired" setelah mengklik tautan | Tautan telah kedaluwarsa (10 menit). Jalankan \`/authorize\` lagi |
| Pertukaran token gagal | Pastikan redirect URI sama persis: \`https://router.xaiworkspace.com/oauth/callback\` |
`;
