export const AUTHORIZE_TR = `
## /authorize nedir?

\`/authorize\` komutu, ucuncu taraf hizmetlerini (Google, GitHub veya Microsoft gibi) xAI Workspace ajaniniza baglar. Baglandiktan sonra ajaniniz bu hizmetlerle sizin adiniza etkilesimde bulunabilir.

---

## Nasil Calisir

1. xAI Workspace sohbetinizde \`/authorize\` gonderin
2. Dugmelerden bir saglayici secin (ornegin Google)
3. Ajaniniz istegi alir ve size bir yetkilendirme baglantisi gonderir
4. Baglantiya tiklayin, saglayicida oturum acin ve erisim izni verin
5. Token ajaniniza iletilir ve \`OAUTH.md\` dosyasina kaydedilir

Ajaniniz daha sonra bagli hizmete erismek icin kaydedilmis tokeni kullanabilir.

---

## Mevcut Saglayicilar

Asagidaki saglayicilar hazir olarak mevcuttur (platform tarafindan yapilandirildiginda):

| Saglayici | Ajaninizin yapabilecekleri |
|---|---|
| **Google** | Google Drive, Gmail, Calendar ve diger Google API'lerine erisim |
| **GitHub** | Depolari okuma/yazma, sorunlari ve pull requestleri yonetme |
| **Microsoft** | OneDrive, Outlook, Microsoft 365 API'lerine erisim |

Bir saglayici dugmesi gorunmuyorsa, henuz yapilandirilmamis demektir.

---

## Ozel OAuth Uygulamalari

Ajaniniz kendi uygulama kimlik bilgilerinizi kullanarak **herhangi bir OAuth saglayicisina** da baglanabilir. Bu asagidaki durumlarda faydalidir:

- Paylasilan uygulama yerine kendi OAuth uygulamanizi kullanmak istiyorsaniz
- Yukarida listelenmemis bir saglayiciya baglanmaniz gerekiyorsa (ornegin Slack, GitLab, Bitbucket)
- Kullanim durumunuz icin belirli OAuth kapsamlarina ihtiyaciniz varsa

### Ozel OAuth uygulamasi nasil kurulur

1. **Bir OAuth uygulamasi kaydedin** saglayicinizla (ornegin Google Cloud Console, GitHub Developer Settings)

2. **Yonlendirme URI'sini ayarlayin:**
   \`\`\`
   https://router.xaiworkspace.com/oauth/callback
   \`\`\`

3. **Ajaniniza kimlik bilgilerini bildirin.** Su sekilde bir mesaj gonderin:
   > GitHub icin client ID \`your-client-id\` ve client secret \`your-client-secret\` ile OAuth kur

4. Ajaniniz bir durum tokeni olusturmak, yetkilendirme URL'sini insaa etmek ve size bagllantiyi gondermek icin yonlendiriciyi cagiracaktir

5. Yetkilendirdikten sonra token degistirilir ve ajaninizin sunucusundaki \`OAUTH.md\` dosyasina kaydedilir

### Perde arkasinda nasil calisir

Ajaniniz ozel bir OAuth akisi baslattiiinda, ozel \`clientId\`, \`clientSecret\` ve \`tokenUrl\` bilgilerinizle yonlendiricinin \`/oauth/state\` ucnoktasini cagirir. Yonlendirici bunlari istemci bazinda saklar ve OAuth saglayicisi geri donus URL'sine yonlendirdiginde kullanir.

---

## Guvenlik

- **OAuth uygulama sirlari yonlendiriciden asla cikmaz** -- genel saglayicilar icin client secret AWS Secrets Manager'da saklanir ve asla ajaninizin sunucusuna gonderilmez
- **Ozel kimlik bilgileri istemci bazinda** veritabaninda saklanir ve yalnizca sizin token degisiiminiz icin kullanilir
- **Durum tokenleri 10 dakika sonra sona erer** ve tekrar saldirilarini onler
- **Tokenler yerel olarak** ajaninizin sunucusunda \`OAUTH.md\` dosyasinda kaydedilir -- diger kullanicilarla paylasilmaz

---

## Sorun Giderme

| Sorun | Cozum |
|---|---|
| Saglayici dugmeleri gorunmuyor | Platform henuz hicbir OAuth saglayicisi yapilandirmamis |
| "Your agent must be running" | Once sunucunuzu uyandirmak icin \`/start\` gonderin |
| Yetkilendirme baglantisi gelmiyor | Ajaniniz mesgul olabilir -- biraz bekleyin ve tekrar deneyin |
| Baglantiya tikladiktan sonra "State expired" | Baglantinin suresi dolmus (10 dakika). \`/authorize\` komutunu tekrar calistirin |
| Token degisimi basarisiz oluyor | Yonlendirme URI'sinin tam olarak eslesitp eslessmedigini kontrol edin: \`https://router.xaiworkspace.com/oauth/callback\` |
`;
