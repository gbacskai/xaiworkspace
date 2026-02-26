import { LocalizedArticle } from '../../i18n.types';

export const ARTICLES_HU: Record<string, LocalizedArticle> = {
  welcome: {
    title: 'Üdvözlünk az xAI Workspace-ben',
    subtitle: 'Személyes AI ügynököd',
    content: `
Az **xAI Workspace** egy dedikált AI ügynököt biztosít számodra, közvetlenül az xAI Workspace-en belül — nem kell alkalmazást telepítened, nem kell fiókot létrehoznod.

## Hogyan működik

1. **Indítsd el a botot** — Küldj egy \`/start\` üzenetet a kezdéshez. Azonnal kapsz egy ingyenes próbaverziót.
2. **Csak írj** — Küldj bármilyen üzenetet, és az AI ügynököd válaszolni fog. Érti a kontextust, segíthet kutatásban, írásban, programozásban és még sok másban.
3. **Saját példány** — A megosztott AI chatbotokkal ellentétben te egy dedikált ügynököt kapsz, amely saját szerveren fut állandó memóriával.

## Mi teszi különlegessé az xAI Workspace-t

- **Privát** — A beszélgetéseid a dedikált példányodon maradnak
- **Állandó** — Az ügynököd megjegyzi a kontextust a munkamenetek között
- **Hatékony** — A Claude, az egyik legképesebb AI modell hajtja
- **Egyszerű** — Csak xAI Workspace. Nincs új alkalmazás, nincs tanulási görbe
    `,
  },
  'first-steps': {
    title: 'Első lépések',
    subtitle: 'Állítsd be az ügynöködet 60 másodperc alatt',
    content: `
## 1. Indítsd el a botot

Nyisd meg az xAI Workspace-t, és küldj egy \`/start\` üzenetet a **@xAIWorkspaceBot**-nak. Az ingyenes próbaverzió azonnal elindul — bankkártya nem szükséges.

## 2. Várd meg az üzembe helyezést

A dedikált AI példányod beállítása körülbelül 2 percet vesz igénybe. Értesítést kapsz, amikor elkészült.

## 3. Küldj egy üzenetet

Csak írj bármit! Próbáld ki:
- "Miben tudsz segíteni?"
- "Foglald össze a legfrissebb AI híreket"
- "Írj egy Python scriptet, ami rendez egy listát"

## 4. Fedezd fel a parancsokat

- \`/authorize\` — Google, Microsoft, GitHub és más szolgáltatások csatlakoztatása
- \`/usage\` — Felhasználási egyenleg ellenőrzése
- \`/billing\` — Előfizetés kezelése
- \`/language\` — Nyelv megváltoztatása
- \`/ssh\` — Csatlakozás a munkaterületedhez fájlhozzáféréshez
- \`/help\` — Összes elérhető parancs megtekintése
- \`/models\` — Váltás AI modellek között
    `,
  },
  models: {
    title: 'AI modellek',
    subtitle: 'Válaszd ki a megfelelő modellt a feladatodhoz',
    content: `
Az xAI Workspace több AI modellt támogat különböző szolgáltatóktól. Válts közöttük a \`/models\` paranccsal.

## Elérhető modellek

| Modell | Mire a legalkalmasabb |
|-------|----------|
| **Claude Sonnet** | Mindennapi feladatok — gyors, képes, kiegyensúlyozott |
| **Claude Opus** | Összetett gondolkodás, kutatás, hosszú dokumentumok |
| **Claude Haiku** | Gyors válaszok, egyszerű feladatok, legalacsonyabb költség |
| **GPT-4o** | Általános célú, jó strukturált kimenethez |
| **DeepSeek** | Költséghatékony gondolkodás és programozás |
| **Gemini** | Multimodális feladatok, nagy kontextusablakok |

## Modellváltás

1. Küldj \`/models\` üzenetet a chatben
2. Koppints a használni kívánt modellre
3. Egy ✓ jelenik meg az aktív modell mellett

A kiválasztásod megmarad a munkamenetek között. Bármikor válthatsz.

## Felhasználás

A különböző modellek eltérő mértékben használják a tokenjeidet. Az Opus több tokent használ válaszonként, mint a Haiku. Ellenőrizd az egyenlegedet a \`/usage\` paranccsal.
    `,
  },
  'remote-access': {
    title: 'Távoli hozzáférés',
    subtitle: 'SSH és SFTP hozzáférés a munkaterületedhez',
    content: `
Minden xAI Workspace példány a saját dedikált géped. SSH-n vagy SFTP-n keresztül csatlakozhatsz fájlok kezeléséhez, eszközök futtatásához és a környezeted testreszabásához.

## Kulcs beszerzése

1. Küldj \`/ssh\` üzenetet az xAI Workspace chatben
2. A bot küld egy \`.pem\` kulcsfájlt a csatlakozási adatokkal
3. Mentsd el a fájlt, és állítsd be a jogosultságokat csatlakozás előtt

## SSH — Terminál-hozzáférés

\`\`\`bash
# Jogosultságok beállítása a kulcsfájlon (kötelező, egyszeri)
chmod 600 <chatId>-xaiworkspace.pem

# Csatlakozás a bastion hoston keresztül
ssh -i <chatId>-xaiworkspace.pem xai<chatId>@ssh.xaiworkspace.com
\`\`\`

Cseréld ki a \`<chatId>\`-t az xAI Workspace chat azonosítódra (a kulcsfájl nevében látható).

> Ha "permission denied" hibát kapsz, ellenőrizd, hogy lefuttattad-e a \`chmod 600\` parancsot a kulcsfájlon.

## SFTP — Fájlátvitel

Bármilyen SFTP klienssel feltölthetsz és letölthetsz fájlokat:

\`\`\`bash
# Parancssori SFTP
sftp -i <chatId>-xaiworkspace.pem xai<chatId>@ssh.xaiworkspace.com
\`\`\`

### FileZilla — Lépésről lépésre beállítás

A FileZilla egy ingyenes, többplatformos SFTP kliens. Kövesd ezeket a lépéseket a munkaterületedhez való csatlakozáshoz:

#### 1. FileZilla letöltése és telepítése

Töltsd le a FileZilla Client-et (nem a Server-t) a [filezilla-project.org](https://filezilla-project.org) oldalról. Elérhető Windows, macOS és Linux rendszerekre.

#### 2. Helykiszolgáló megnyitása

Indítsd el a FileZilla-t, és válaszd a **File → Site Manager** menüpontot (vagy nyomd meg a **Ctrl+S** billentyűt Windows/Linux rendszeren, **Cmd+S** billentyűt macOS rendszeren).

#### 3. Új hely létrehozása

1. Kattints az **New Site** gombra
2. Nevezd el: **xAI Workspace**

#### 4. Csatlakozási beállítások megadása

Töltsd ki a jobb oldali panelt:

| Beállítás | Érték |
|---|---|
| **Protocol** | SFTP - SSH File Transfer Protocol |
| **Host** | ssh.xaiworkspace.com |
| **Port** | 22 |
| **Logon Type** | Key file |
| **User** | xai\`<chatId>\` |

#### 5. Kulcsfájl hozzáadása

1. A **Key file** mezőben kattints a **Browse...** gombra
2. Válaszd ki a \`/ssh\` paranccsal letöltött \`.pem\` fájlt
3. Ha a FileZilla kéri a kulcs PPK formátumba konvertálását, kattints az **Yes** gombra — automatikusan elmenti a konvertált másolatot

> macOS vagy Linux rendszeren előbb futtasd a \`chmod 600\` parancsot a .pem fájlon.

#### 6. Csatlakozás

1. Kattints a **Connect** gombra
2. Az első csatlakozáskor a FileZilla megjelenít egy "Unknown host key" párbeszédablakot — ellenőrizd az adatokat, és kattints az **OK** gombra a szerver megbízhatóként való elfogadásához

#### 7. Fájlok átvitele

- A **bal panel** mutatja a helyi fájljaidat
- A **jobb panel** mutatja a munkaterületed fájljait
- **Húzd és ejtsd** a fájlokat a panelek között feltöltéshez vagy letöltéshez
- **Jobb klikk** az átnevezés, törlés és jogosultság-beállítás opcióihoz

> **Tipp:** A helyed mentve van a Site Managerben. Legközelebb nyisd meg a Site Managert, és kattints duplán az **xAI Workspace** elemre az azonnali újracsatlakozáshoz.

Más grafikus SFTP kliensek, mint a **Cyberduck** és a **WinSCP** szintén működnek — használd ugyanazokat a host, port, felhasználónév és kulcsfájl beállításokat.

## Mit tehetsz

Csatlakozás után a munkaterületed teljesen a tiéd:

- **Fájlok kezelése** — böngészés, szerkesztés, feltöltés és letöltés
- **Tevékenység figyelése** — az ügynököd naplóinak valós idejű megtekintése
- **Eszközök telepítése** — bármilyen szoftver vagy futtatókörnyezet hozzáadása
- **Automatizálások futtatása** — ütemezett feladatok vagy háttérszolgáltatások beállítása
- **Fájlok átvitele** — használj \`scp\`-t, \`rsync\`-et vagy SFTP-t fájlok mozgatásához

## Ha a munkaterületed még beállítás alatt áll

Ha a munkaterületed még üzembe helyezés alatt van, a bot értesít erről. Várj pár percet, és próbáld újra az \`/ssh\` parancsot.

## Biztonság

- Minden kapcsolat egy **bastion hoston** keresztül megy — a példányod soha nincs közvetlenül kitéve az internetnek
- Minden munkaterülethez egyedi ed25519 titkosítási kulcs generálódik a beállítás során
- A jelszavas bejelentkezés le van tiltva — csak a személyes kulcsfájlod működik
- A root hozzáférés biztonsági okokból korlátozott
- A kulcsod titkosítva van tárolva az S3-ban, és csak az xAI Workspace chateden keresztül kerül kézbesítésre
    `,
  },
  billing: {
    title: 'Csomagok és számlázás',
    subtitle: 'Előfizetések, tokenek és fizetések',
    content: `
## Csomagok

| Csomag | Ár | Jellemzők |
|------|-------|------------|
| **Trial** | Ingyenes | Reklámmentes, barátok meghívása |
| **Essential** | $100/hó | Reklámmentes, barátok meghívása, jobb modellek |
| **Professional** | $300/hó | Prioritásos modellek, meghívó nem szükséges |
| **Enterprise** | $600/hó | Prémium modellek, dedikált példány |
| **Ultimate** | $2,500/hó | Legjobb modellek és árak, dedikált példány |

A magasabb szintek jobb árakat és hozzáférést biztosítanak a képesebb modellekhez.

## Előfizetés kezelése

Küldj \`/billing\` üzenetet a számlázási irányítópult megnyitásához, ahol:
- Megtekintheted a jelenlegi csomagodat és a megújítás dátumát
- Csomagot válthatsz (magasabbra vagy alacsonyabbra)
- Bekapcsolhatod az automatikus feltöltést extra felhasználáshoz
- Frissítheted a fizetési módodat

## Extra felhasználás

Elfogy a kereted? Kapcsold be az **automatikus feltöltést** a \`/billing\` menüben, hogy automatikusan vásároljon extra felhasználást, amikor eléred a limitedet.

## Fizetési előzmények

Küldj \`/invoices\` üzenetet az összes korábbi fizetés és nyugta megtekintéséhez.
    `,
  },
  productivity: {
    title: 'Termelékenységi tippek',
    subtitle: 'Hozd ki a legtöbbet az AI ügynöködből',
    content: `
## Légy konkrét

A "segíts írni egy emailt" helyett próbáld így:
> "Írj egy professzionális emailt az ügyfelemnek, Jánosnak, amelyben visszautasítom a pénteki megbeszélést. Javasold helyette a keddet vagy szerdát. Legyen rövid és barátságos."

## Használd a kontextust

Az ügynököd emlékszik a beszélgetésre. Építs az előző üzenetekre:
1. "Elemezd ezt a CSV adatot: ..."
2. "Most készíts egy diagramot, ami mutatja a havi trendet"
3. "Adj hozzá egy összefoglaló bekezdést a vezetőség számára"

## Válaszd ki a megfelelő modellt

- **Gyors kérdés?** → Haiku (leggyorsabb, legolcsóbb)
- **Mindennapi munka?** → Sonnet (alapértelmezett, kiegyensúlyozott)
- **Összetett elemzés?** → Opus (legképesebb)

Válts a \`/models\` paranccsal.

## Kísérd figyelemmel a felhasználást

Rendszeresen ellenőrizd a \`/usage\` parancsot a tokenfogyasztásod nyomon követéséhez. A folyamatjelző sáv mutatja a havi keretedet.
    `,
  },
  'language-region': {
    title: 'Nyelv és régió',
    subtitle: 'Nyelv és szerverhely megváltoztatása',
    content: `
## Nyelv megváltoztatása

Küldj \`/language\` üzenetet a 10 támogatott nyelv közüli választáshoz:

| | |
|---|---|
| 🇬🇧 English | 🇨🇳 中文 |
| 🇪🇸 Español | 🇸🇦 العربية |
| 🇧🇷 Português | 🇩🇪 Deutsch |
| 🇫🇷 Français | 🇯🇵 日本語 |
| 🇷🇺 Русский | 🇮🇳 हिन्दी |

A nyelvi beállításod automatikusan felismerésre kerül az xAI Workspace beállításaidból az első használatkor, de bármikor megváltoztathatod. Minden bot-üzenet a kiválasztott nyelven jelenik meg.

## Régió megváltoztatása

Küldj \`/region\` üzenetet az AI példányod áthelyezéséhez egy másik szerver régióba. Ez csökkentheti a késleltetést, ha közelebb vagy egy másik adatközponthoz.

Az elérhető régiók megjelennek, és a jelenlegi kijelölésed ki van emelve.
    `,
  },
  'privacy-data': {
    title: 'Adataid és adatvédelem',
    subtitle: 'Adataid elérése, exportálása vagy törlése',
    content: `
## Adatvédelmi beállítások

Az xAI Workspace teljes körű ellenőrzést biztosít személyes adataid felett, közvetlenül az xAI Workspace-en belül:

- \`/privacy\` — Adatvédelmi szabályzat és Szolgáltatási feltételek megtekintése
- \`/my_data\` — Összes személyes adatod exportálása JSON fájlként
- \`/delete_my_data\` — Összes személyes adatod végleges törlése

## Mi kerül exportálásra

A \`/my_data\` parancs exportálja:

- Fiókadataidat (csomag, email, régió)
- Fizetési előzményeket
- Felhasználási statisztikákat
- Szerver példány információkat

## Mi kerül törlésre

A \`/delete_my_data\` parancs eltávolítja:

- Az ügyfélrekordjaidat és az összes fiókadatot
- Fizetési előzményeket
- Felhasználási naplókat és költségkövetést
- Az AI példányodat és az összes rajta lévő fájlt
- Hozzáférési kulcsokat és csatlakozási rekordokat

Ez a művelet **végleges és nem vonható vissza**. A törlés előtt megerősítést kérünk.

## Kapcsolat

Adatvédelmi kérdésekben: privacy@xshopper.com
    `,
  },
  referrals: {
    title: 'Barátok meghívása',
    subtitle: 'Szerezz bónusz tokeneket ajánlásokkal',
    content: `
## Hogyan működik

1. Küldj \`/invite email@example.com\` üzenetet egy barátod meghívásához
2. Minden elküldött meghívóért azonnal **200K bónusz tokent** kapsz
3. Amikor a barátod előfizet, további ajánlói bónuszt kapsz

## Szabályok

- Havonta legfeljebb **5 meghívási keret**
- Egyszerre legfeljebb **10 függőben lévő** (felhasználatlan) meghívó
- Ugyanaz az email cím **4 héten belül** nem hívható meg újra
- A meghívottnak nem lehet már meglévő xAI Workspace fiókja

## Meghívóid követése

Küldj \`/invites\` üzenetet az összes elküldött meghívód állapotának megtekintéséhez:
- **waiting** — meghívó elküldve, még nem regisztrált
- **signed up** — a meghívott létrehozta a fiókját
- **subscribed** — a meghívott elvégezte az első fizetését (ajánlói bónusz jóváírva)
    `,
  },
};
