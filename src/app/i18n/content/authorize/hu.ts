export const AUTHORIZE_HU = `
## Mi az a /authorize?

Az \`/authorize\` parancs harmadik fél szolgáltatásokat (mint a Google, GitHub vagy Microsoft) csatlakoztat az OpenClaw AI ügynöködhöz. A csatlakozás után az ügynököd a nevedben léphet kapcsolatba ezekkel a szolgáltatásokkal.

---

## Hogyan működik

1. Küldj \`/authorize\` üzenetet a Telegram chatben
2. Válassz egy szolgáltatót a gombok közül (pl. Google)
3. Az ügynököd fogadja a kérést, és küld egy engedélyezési hivatkozást
4. Kattints a hivatkozásra, jelentkezz be a szolgáltatónál, és add meg a hozzáférést
5. A token eljut az ügynökhöz, és mentésre kerül az \`OAUTH.md\` fájlba

Ezután az ügynököd a tárolt tokent használhatja a csatlakoztatott szolgáltatás eléréséhez.

---

## Elérhető szolgáltatók

A következő szolgáltatók érhetők el alapértelmezetten (ha a platform konfigurálja):

| Szolgáltató | Mit tud az ügynököd |
|---|---|
| **Google** | Google Drive, Gmail, Calendar és más Google API-k elérése |
| **GitHub** | Tárolók olvasása/írása, issue-k és pull requestek kezelése |
| **Microsoft** | OneDrive, Outlook, Microsoft 365 API-k elérése |

Ha egy szolgáltató gombja nem jelenik meg, az azt jelenti, hogy még nincs konfigurálva.

---

## Egyéni OAuth alkalmazások

Az ügynököd **bármilyen OAuth szolgáltatóhoz** csatlakozhat a saját alkalmazás hitelesítő adataiddal. Ez hasznos, ha:

- A saját OAuth alkalmazásodat szeretnéd használni a megosztott helyett
- Egy fent nem szereplő szolgáltatóhoz kell csatlakoznod (pl. Slack, GitLab, Bitbucket)
- Speciális OAuth scope-okra van szükséged a felhasználási esetedhez

### Egyéni OAuth alkalmazás beállítása

1. **Regisztrálj egy OAuth alkalmazást** a szolgáltatónál (pl. Google Cloud Console, GitHub Developer Settings)

2. **Állítsd be az átirányítási URI-t** a következőre:
   \`\`\`
   https://router.xaiworkspace.com/oauth/callback
   \`\`\`

3. **Közöld az ügynököddel** a hitelesítő adatokat. Küldj egy ilyen üzenetet:
   > Állíts be OAuth-ot a GitHubhoz \`a-te-client-id-d\` client ID-val és \`a-te-client-secret-ed\` client secret-tel

4. Az ügynököd meghívja a routert egy state token generálásához, felépíti az engedélyezési URL-t, és elküldi neked a hivatkozást

5. Az engedélyezés után a token kicserélődik és mentésre kerül az \`OAUTH.md\` fájlba az ügynököd példányán

### Hogyan működik a háttérben

Amikor az ügynököd egyéni OAuth folyamatot indít, meghívja a router \`/oauth/state\` végpontját az egyéni \`clientId\`, \`clientSecret\` és \`tokenUrl\` adatokkal. A router ezeket ügyfelenként tárolja, és akkor használja, amikor az OAuth szolgáltató visszairányít a callback URL-re.

---

## Biztonság

- **Az OAuth alkalmazás titkai soha nem hagyják el a routert** -- globális szolgáltatók esetén a client secret az AWS Secrets Managerben van tárolva, és soha nem kerül az ügynököd példányára
- **Az egyéni hitelesítő adatok ügyfelenként vannak tárolva** az adatbázisban, és csak a te token cserédhez használatosak
- **A state tokenek 10 perc után lejárnak** az ismétléses támadások megelőzésére
- **A tokenek helyben vannak mentve** az ügynököd példányán az \`OAUTH.md\` fájlban -- nem kerülnek megosztásra más felhasználókkal

---

## Hibaelhárítás

| Probléma | Megoldás |
|---|---|
| Nem jelennek meg szolgáltató gombok | A platform még nem konfigurált OAuth szolgáltatókat |
| "Your agent must be running" | Küldj \`/start\` üzenetet a példányod felébresztéséhez |
| Nem érkezik meg az engedélyezési hivatkozás | Az ügynököd elfoglalt lehet — várj egy pillanatot, és próbáld újra |
| "State expired" a hivatkozásra kattintás után | A hivatkozás lejárt (10 perc). Futtasd újra az \`/authorize\` parancsot |
| A token csere sikertelen | Ellenőrizd, hogy az átirányítási URI pontosan egyezik: \`https://router.xaiworkspace.com/oauth/callback\` |
`;
