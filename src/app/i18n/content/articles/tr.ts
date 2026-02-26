import { LocalizedArticle } from '../../i18n.types';

export const ARTICLES_TR: Record<string, LocalizedArticle> = {
  welcome: {
    title: 'xAI Workspace\'a Hosgeldiniz',
    subtitle: 'Kisisel AI ajansiniz',
    content: `
**xAI Workspace**, size dogrudan Telegram icinde erisilebilen ozel bir AI ajani sunar — uygulama yuklemenize veya hesap olusturmaniza gerek yok.

## Nasil calisir

1. **Botu baslatin** — Baslamak icin \`/start\` gonderin. Aninda ucretsiz deneme hakki kazanirsiniz.
2. **Sohbet edin** — Herhangi bir mesaj gonderin, AI ajaniniz yanit verecektir. Baglami anlar; arastirma, yazma, kodlama ve daha fazlasinda yardimci olabilir.
3. **Kendi ozel sunucunuz** — Paylasimli AI sohbet botlarinin aksine, kalici bellige sahip kendi sunucusunda calisan ozel bir ajana sahip olursunuz.

## xAI Workspace'i farkli kilan nedir

- **Gizli** — Konusmalariniz size ozel sunucunuzda kalir
- **Kalici** — Ajaniniz oturumlar arasinda baglami hatirlar
- **Guclu** — En yetenekli AI modellerinden biri olan Claude tarafindan desteklenir
- **Basit** — Sadece Telegram. Yeni uygulama yok, ogrenme sureci yok
    `,
  },
  'first-steps': {
    title: 'Ilk Adimlar',
    subtitle: 'Ajaninizi 60 saniyede kurun',
    content: `
## 1. Botu baslatin

Telegram'i acin ve **@xAIWorkspaceBot**'a \`/start\` gonderin. Ucretsiz denemeniz hemen baslar — kredi karti gerekmez.

## 2. Hazirlanmasini bekleyin

Ozel AI sunucunuzun kurulumu yaklasik 2 dakika surer. Hazir oldugunda bir bildirim alacaksiniz.

## 3. Ilk mesajinizi gonderin

Herhangi bir sey yazin! Deneyin:
- "Bana ne konuda yardimci olabilirsin?"
- "Yapay zeka hakkindaki son haberleri ozetle"
- "Bir listeyi siralayan bir Python scripti yaz"

## 4. Komutlari kesfedin

- \`/authorize\` — Google, Microsoft, GitHub ve daha fazlasini baglayIn
- \`/usage\` — Kullanim bakiyenizi kontrol edin
- \`/billing\` — Aboneliginizi yonetin
- \`/language\` — Tercih ettiginiz dili degistirin
- \`/ssh\` — Dosya erisimi icin calisma alaniniza baglanin
- \`/help\` — Tum kullanilabilir komutlari gorun
- \`/models\` — AI modelleri arasinda gecis yapin
    `,
  },
  models: {
    title: 'AI Modelleri',
    subtitle: 'Goreviniz icin dogru modeli secin',
    content: `
xAI Workspace, birden fazla saglayicidan birden fazla AI modelini destekler. \`/models\` ile aralarinda gecis yapin.

## Mevcut Modeller

| Model | En uygun oldugu alan |
|-------|----------|
| **Claude Sonnet** | Gunluk gorevler — hizli, yetenekli, dengeli |
| **Claude Opus** | Karmasik akil yurutme, arastirma, uzun belgeler |
| **Claude Haiku** | Hizli yanitlar, basit gorevler, en dusuk maliyet |
| **GPT-4o** | Genel amacli, yapilandirilmis ciktida iyi |
| **DeepSeek** | Uygun maliyetli akil yurutme ve kodlama |
| **Gemini** | Multimodal gorevler, genis baglam pencereleri |

## Model degistirme

1. Sohbette \`/models\` gonderin
2. Kullanmak istediginiz modele dokunun
3. Aktif modelinizin yaninda bir checkmark gorunur

Seciminiz oturumlar arasinda korunur. Istediginiz zaman degistirebilirsiniz.

## Token kullanimi

Farkli modeller farkli oranlarda token tuketir. Opus, Haiku'dan yanit basina daha fazla token kullanir. Bakiyenizi \`/usage\` ile kontrol edin.
    `,
  },
  'remote-access': {
    title: 'Uzaktan Erisim',
    subtitle: 'Calisma alaniniza SSH ve SFTP erisimi',
    content: `
Her xAI Workspace sunucusu size ozel bir makinedir. Dosyalari yonetmek, araclar calistirmak ve ortaminizi ozellestirmek icin SSH veya SFTP ile baglanabilirsiniz.

## Anahtarinizi alma

1. Telegram sohbetinde \`/ssh\` gonderin
2. Bot size baglanti detaylariyla birlikte bir \`.pem\` anahtar dosyasi gonderir
3. Baglanmadan once dosyayi kaydedin ve izinleri ayarlayin

## SSH — Terminal erisimi

\`\`\`bash
# Anahtar dosyasinda izinleri ayarlayin (gerekli, bir kerelik)
chmod 600 <chatId>-xaiworkspace.pem

# Bastion host uzerinden baglanin
ssh -i <chatId>-xaiworkspace.pem xai<chatId>@ssh.xaiworkspace.com
\`\`\`

\`<chatId>\` yerine Telegram sohbet kimliginizi yazin (anahtar dosya adinda gosterilir).

> "Permission denied" hatasi aliyorsaniz, anahtar dosyasinda \`chmod 600\` komutunu calistirdiginizdan emin olun.

## SFTP — Dosya transferi

Dosya yuklemek ve indirmek icin herhangi bir SFTP istemcisi kullanabilirsiniz:

\`\`\`bash
# Komut satiri SFTP
sftp -i <chatId>-xaiworkspace.pem xai<chatId>@ssh.xaiworkspace.com
\`\`\`

### FileZilla — Adim adim kurulum

FileZilla ucretsiz, coklu platform destekli bir SFTP istemcisidir. Calisma alaniniza baglanmak icin su adimlari izleyin:

#### 1. FileZilla'yi indirin ve yukleyin

FileZilla Client'i (Server degil) [filezilla-project.org](https://filezilla-project.org) adresinden indirin. Windows, macOS ve Linux icin mevcuttur.

#### 2. Site Manager'i acin

FileZilla'yi baslatin ve **File → Site Manager** yolunu izleyin (veya Windows/Linux'ta **Ctrl+S**, macOS'ta **Cmd+S** tuslarina basin).

#### 3. Yeni bir site olusturun

1. **New Site**'a tiklayin
2. Adi **xAI Workspace** olarak belirleyin

#### 4. Baglanti ayarlarini girin

Sag paneli doldurun:

| Ayar | Deger |
|---|---|
| **Protocol** | SFTP - SSH File Transfer Protocol |
| **Host** | ssh.xaiworkspace.com |
| **Port** | 22 |
| **Logon Type** | Key file |
| **User** | xai\`<chatId>\` |

#### 5. Anahtar dosyanizi ekleyin

1. **Key file** alaninda **Browse...** secenegine tiklayin
2. \`/ssh\` komutundan indirdiginiz \`.pem\` dosyasini secin
3. FileZilla anahtari PPK formatina donusturmeyi isterse, **Yes**'e tiklayin — otomatik olarak donusturulmus bir kopya kaydedecektir

> macOS veya Linux'ta, once .pem dosyasinda \`chmod 600\` komutunu calistirdiginizdan emin olun.

#### 6. Baglanin

1. **Connect**'e tiklayin
2. Ilk baglantigda FileZilla "Unknown host key" iletisi gosterir — detaylari kontrol edin ve sunucuya guvenmeek icin **OK**'e tiklayin

#### 7. Dosya aktarin

- **Sol panel** yerel dosyalarinizi gosterir
- **Sag panel** calisma alani dosyalarinizi gosterir
- Yuklemek veya indirmek icin paneller arasinda **surukleyip birakin**
- Yeniden adlandirma, silme ve izin secenekleri icin **sag tiklayin**

> **Ipucu:** Siteniz Site Manager'da kaydedilir. Bir dahaki sefere Site Manager'i acin ve aninda yeniden baglanmak icin **xAI Workspace**'e cift tiklayin.

**Cyberduck** ve **WinSCP** gibi diger grafiksel SFTP istemcileri de calisir — yukaridaki ayni host, port, kullanici adi ve anahtar dosyasi ayarlarini kullanin.

## Neler yapabilirsiniz

Baglandiginizda, calisma alaniniz tamamen sizindir:

- **Dosya yonetimi** — belgeleri goruntuleyIn, duzenleyin, yukleyin ve indirin
- **Aktivite izleme** — ajaninizin gunluklerini gercek zamanli goruntuleyIn
- **Arac yukleme** — ihtiyaciniz olan herhangi bir yazilimi veya calisma ortamini ekleyin
- **Otomasyon calistirma** — zamanlanmis gorevler veya arka plan hizmetleri kurun
- **Dosya aktarimi** — dosya tasimak icin \`scp\`, \`rsync\` veya SFTP kullanin

## Calisma alaniniz hala kuruluyorsa

Calisma alaniniz hala hazirlaniyorsa, bot size bildirecektir. Birka dakika bekleyin ve \`/ssh\` komutunu tekrar deneyin.

## Guvenlik

- Tum baglantilar bir **bastion host** uzerinden gider — sunucunuz asla dogrudan internete acik degildir
- Kurulum sirasinda her calisma alani icin benzersiz bir ed25519 sifreleme anahtari olusturulur
- Parola ile giris devre disi birakilmistir — yalnizca kisisel anahtar dosyaniz calisir
- Root erisimi guvenlik icin kisitlanmistir
- Anahtariniz S3'te sifrelenmis olarak saklanir ve yalnizca Telegram sohbetinize teslim edilir
    `,
  },
  billing: {
    title: 'Planlar ve Faturalama',
    subtitle: 'Abonelikler, tokenler ve odemeler',
    content: `
## Planlar

| Plan | Fiyat | One Cikanlar |
|------|-------|------------|
| **Trial** | Ucretsiz | Reklamsiz, arkadaslarini davet et |
| **Essential** | $100/ay | Reklamsiz, arkadaslarini davet et, daha iyi modeller |
| **Professional** | $300/ay | Oncelikli modeller, davetiye gerekmez |
| **Enterprise** | $600/ay | Premium modeller, ozel sunucu |
| **Ultimate** | $2,500/ay | En iyi modeller ve oranlar, ozel sunucu |

Daha yuksek katmanlar daha iyi oranlar ve daha yetenekli modellere erisim saglar.

## Aboneliginizi yonetme

Faturalama panelini acmak icin \`/billing\` gonderin, burada sunlari yapabilirsiniz:
- Mevcut planinizi ve yenileme tarihinizi gorun
- Yukseltme veya dusurme yapin
- Ekstra kullanim icin otomatik yuklemeyi etkinlestirin
- Odeme yontinizi guncelleyin

## Ekstra kullanim

Bakiyeniz mi azaliyor? Limitinize ulastiginizda otomatik olarak ekstra kullanim satin almak icin \`/billing\` icerisinde **otomatik yukleme** ozelligini etkinlestirin.

## Odeme gecmisi

Tum gecmis odemeleri ve makbuzlari goruntulemek icin \`/invoices\` gonderin.
    `,
  },
  productivity: {
    title: 'Verimlilik Ipuclari',
    subtitle: 'AI ajaninizdan en iyi sekilde yararlanin',
    content: `
## Spesifik olun

"Bir e-posta yazmama yardim et" yerine sunu deneyin:
> "Musterim Ahmet'e Cuma toplantisini reddeden profesyonel bir e-posta yaz. Alternatif olarak Sali veya Carsamba gunu oner. Kisa ve samimi tut."

## Baglami kullanin

Ajaniniz konusmayi hatirlar. Onceki mesajlar uzerine insaa edin:
1. "Bu CSV verisini analiz et: ..."
2. "Simdi aylik egilimi gosteren bir grafik olustur"
3. "Yonetim ekibi icin bir ozet paragraf ekle"

## Dogru modeli secin

- **Hizli soru mu?** → Haiku (en hizli, en ucuz)
- **Gunluk is mi?** → Sonnet (varsayilan, dengeli)
- **Karmasik analiz mi?** → Opus (en yetenekli)

\`/models\` ile degistirin.

## Kullanimi izleyin

Token tuketiminizi takip etmek icin duzenlii olarak \`/usage\` kontrol edin. Ilerleme cubugu aylik kotanizi gosterir.
    `,
  },
  'language-region': {
    title: 'Dil ve Bolge',
    subtitle: 'Dili ve sunucu konumunu degistirin',
    content: `
## Dil degistirme

10 desteklenen dil arasidan secim yapmak icin \`/language\` gonderin:

| | |
|---|---|
| 🇬🇧 English | 🇨🇳 中文 |
| 🇪🇸 Espanol | 🇸🇦 العربية |
| 🇧🇷 Portugues | 🇩🇪 Deutsch |
| 🇫🇷 Francais | 🇯🇵 日本語 |
| 🇷🇺 Русский | 🇮🇳 हिन्दी |

Dil tercihiniz ilk kullanimda Telegram ayarlarinizdan otomatik olarak alginlanir, ancak istediginiz zaman degistirebilirsiniz. Tum bot mesajlari sectiginiz dilde gorunecektir.

## Bolge degistirme

AI sunucunuzu farkli bir sunucu bolgesine tasimak icin \`/region\` gonderin. Baska bir veri merkezine daha yakinseniz bu gecikmeyi azaltabilir.

Mevcut bolgeniz vurgulanmis olarak mevcut bolgeler gosterilir.
    `,
  },
  'privacy-data': {
    title: 'Verileriniz ve Gizlilik',
    subtitle: 'Verilerinize erisin, disari aktarin veya silin',
    content: `
## Gizlilik kontrolleri

xAI Workspace, kisisel verileriniz uzerinde tam kontrol saglar, dogrudan Telegram icerisinde:

- \`/privacy\` — Gizlilik Politikasini ve Hizmet Sartlarini goruntuleyIn
- \`/my_data\` — Tum kisisel verilerinizi JSON dosyasi olarak disari aktarin
- \`/delete_my_data\` — Tum kisisel verilerinizi kalici olarak silin

## Neleer disari aktarilir

\`/my_data\` komutu sunlari disari aktarir:

- Hesap detaylariniz (plan, e-posta, bolge)
- Odeme gecmisi
- Kullanim istatistikleri
- Sunucu bilgileri

## Neler silinir

\`/delete_my_data\` komutu sunlari kaldirir:

- Musteri kaydiniz ve tum hesap verileriniz
- Odeme gecmisi
- Kullanim gunlukleri ve harcama takibi
- AI sunucunuz ve uzerindeki tum dosyalar
- Erisim anahtarlari ve baglanti kayitlari

Bu islem **kalici olup geri alinamaz**. Silme islemi baslamadan once onaylamaniz istenecektir.

## Iletisim

Gizlilik sorulariniz icin: privacy@xshopper.com
    `,
  },
  referrals: {
    title: 'Arkadaslarini Davet Et',
    subtitle: 'Davetlerle bonus token kazanin',
    content: `
## Nasil calisir

1. Bir arkadasi davet etmek icin \`/invite email@example.com\` gonderin
2. Gonderilen her davet icin aninda **200K bonus token** kazanirsiniz
3. Arkadasiniz abone oldugunda ek bir davet bonusu kazanirsiniz

## Kurallar

- Ayda en fazla **5 davet hakki**
- Ayni anda en fazla **10 bekleyen** (kullanilmamis) davet
- Ayni e-posta **4 hafta** icinde tekrar davet edilemez
- Davet edilen kisinin zaten bir xAI Workspace hesabi olmamasi gerekir

## Davetlerinizi takip etme

Durumlarini gormek icin \`/invites\` gonderin:
- **waiting** — davet gonderildi, henuz kaydolmadi
- **signed up** — davet edilen kisi hesap olusturdu
- **subscribed** — davet edilen kisi ilk odemesini yapti (davet bonusu kazanildi)
    `,
  },
};
