export const PRIVACY_HU = `
## Kik vagyunk

Az xShopper Pty Ltd ("xShopper", "mi", "bennünket") üzemelteti az OpenClaw AI szolgáltatást, amely xAI Workspace-en keresztül érhető el.
Adatkezelő: xShopper Pty Ltd, Ausztrália.
Kapcsolat: privacy@xshopper.com

---

## Milyen személyes adatokat gyűjtünk

Az OpenClaw AI használata során a következő adatokat gyűjtjük:

- **xAI Workspace felhasználói azonosító** (chat_id) — az egyedi xAI Workspace azonosítód, amelyet a fiókod azonosítására használunk a szolgáltatás egészében
- **Email cím** — ha regisztrálsz vagy meghívást kapsz, tároljuk az email címedet a fiókod kezeléséhez és szolgáltatási kommunikációhoz
- **IP-címek** — a dedikált szerverpéldányod IP-címei, amelyeket az üzenetek irányítására használunk
- **Fizetési adatok** — előfizetési összegek, dátumok, Stripe ügyfél-azonosító és a fizetési kártya utolsó 4 számjegye (a fizetési kártya adatait a Stripe tárolja, nem mi)
- **Tokenfelhasználási adatok** — napi és havi AI tokenfogyasztás
- **AI beszélgetés tartalma** — az AI ügynöködnek küldött üzenetek

---

## Miért kezeljük az adataidat és a jogalap

| Cél | Jogalap (GDPR 6. cikk) |
|---|---|
| Az AI ügynök szolgáltatás nyújtása (fiók beállítása, üzenetek irányítása, előfizetés kezelése) | 6. cikk (1)(b) — szerződés teljesítése |
| Számlázás és fizetésfeldolgozás | 6. cikk (1)(b) — szerződés teljesítése |
| Felhasználás figyelése és költségkeret betartatása | 6. cikk (1)(b) — szerződés teljesítése |
| Szolgáltatási értesítések küldése (felhasználási figyelmeztetések, megújítási emlékeztetők) | 6. cikk (1)(b) — szerződés teljesítése |
| Meghívó emailek küldése a nevedben | 6. cikk (1)(a) — hozzájárulás (te kezdeményezed a /invite parancsot) |
| Biztonsági felügyelet és visszaélésmegakadályozás | 6. cikk (1)(f) — jogos érdek |

---

## Kivel osztjuk meg az adataidat

A következő harmadik fél adatfeldolgozókat vesszük igénybe a szolgáltatás nyújtásához:

- **Telegram** (Hollandia) — közvetíti az üzeneteket közted és az AI ügynököd között
- **Anthropic** (Egyesült Államok) — feldolgozza a beszélgetés tartalmát az AI válaszok generálásához. Adattovábbítási mechanizmus: Standard Szerződési Záradékok
- **Stripe** (Egyesült Államok) — kezeli az összes fizetésfeldolgozást. Adattovábbítási mechanizmus: Standard Szerződési Záradékok / EU-US Adatvédelmi Keretrendszer
- **Neon** (Egyesült Államok) — az adatbázisunkat tárolja. Adattovábbítási mechanizmus: Standard Szerződési Záradékok
- **Amazon Web Services** (Ausztrália, ap-southeast-2) — az összes infrastruktúrát tárolja
- **Cloudflare** (Globális) — DNS szolgáltatásokat nyújt

Nem értékesítjük a személyes adataidat.

---

## Nemzetközi adattovábbítás

Az AI beszélgetés tartalmát az Anthropic az Egyesült Államokban dolgozza fel. Ezt az adattovábbítást Standard Szerződési Záradékok fedik. A fizetési adatokat a Stripe dolgozza fel az Egyesült Államokban, amelyet az EU-US Adatvédelmi Keretrendszer és Standard Szerződési Záradékok fednek.

---

## Mennyi ideig őrizzük meg az adataidat

- Fiókadatok: amíg a fiókod aktív, és a törlés után még 30 napig
- Fizetési rekordok: 7 évig az ausztrál adójogszabályok előírásai szerint
- AI beszélgetés tartalma: a dedikált szerverpéldányodon tárolva; a példány leállításakor törlésre kerül
- Felhasználási naplók: 90 napig megőrizve

---

## Jogaid

Ha az EU/EGT-ben vagy az Egyesült Királyságban tartózkodsz, a GDPR alapján a következő jogaid vannak:

- **Hozzáféréshez való jog** — személyes adataid másolatának igénylése
- **Helyesbítéshez való jog** — pontatlan adatok javításának kérése
- **Törléshez való jog** — személyes adataid törlésének kérése
- **Korlátozáshoz való jog** — az adatkezelés korlátozásának kérése
- **Adathordozhatósághoz való jog** — adataid strukturált, géppel olvasható formátumban történő megkapása
- **Tiltakozáshoz való jog** — tiltakozás a jogos érdeken alapuló adatkezelés ellen

Ezen jogok közül többet közvetlenül az xAI Workspace-en belül gyakorolhatsz:

- Küldj \`/my_data\` üzenetet a személyes adataid exportálásához
- Küldj \`/delete_my_data\` üzenetet az összes adatod törlésének kéréséhez

Egyéb kérésekhez írj nekünk a privacy@xshopper.com címre. 30 napon belül válaszolunk.

Jogodban áll panaszt benyújtani a helyi felügyeleti hatóságnál is.

---

## Kapcsolat

Adatvédelmi megkeresések: privacy@xshopper.com
xShopper Pty Ltd, Ausztrália
Australian Trademark No. 1749660 (Class 35)
`;
