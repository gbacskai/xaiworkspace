export const AUTHORIZE_NL = `
## Wat is /authorize?

Het commando \`/authorize\` koppelt externe diensten (zoals Google, GitHub of Microsoft) aan je OpenClaw AI-agent. Eenmaal gekoppeld kan je agent namens jou met deze diensten communiceren.

---

## Hoe het werkt

1. Stuur \`/authorize\` in je xAI Workspace-chat
2. Kies een provider uit de knoppen (bijv. Google)
3. Je agent ontvangt het verzoek en stuurt je een autorisatielink
4. Klik op de link, log in bij de provider en verleen toegang
5. Het token wordt bezorgd bij je agent en opgeslagen in \`OAUTH.md\`

Je agent kan vervolgens het opgeslagen token gebruiken om de gekoppelde dienst te benaderen.

---

## Beschikbare providers

De volgende providers zijn standaard beschikbaar (wanneer geconfigureerd door het platform):

| Provider | Wat je agent kan doen |
|---|---|
| **Google** | Toegang tot Google Drive, Gmail, Calendar en andere Google API's |
| **GitHub** | Repositories lezen/schrijven, issues beheren, pull requests |
| **Microsoft** | Toegang tot OneDrive, Outlook, Microsoft 365 API's |

Als een providerknop niet verschijnt, betekent dit dat deze nog niet is geconfigureerd.

---

## Aangepaste OAuth-apps

Je agent kan ook verbinding maken met **elke OAuth-provider** met je eigen app-inloggegevens. Dit is handig wanneer je:

- Je eigen OAuth-app wilt gebruiken in plaats van de gedeelde
- Verbinding wilt maken met een provider die hierboven niet staat (bijv. Slack, GitLab, Bitbucket)
- Specifieke OAuth-scopes nodig hebt voor jouw gebruikssituatie

### Een aangepaste OAuth-app instellen

1. **Registreer een OAuth-app** bij je provider (bijv. Google Cloud Console, GitHub Developer Settings)

2. **Stel de redirect URI in** op:
   \`\`\`
   https://router.xaiworkspace.com/oauth/callback
   \`\`\`

3. **Vertel je agent** de inloggegevens. Stuur een bericht zoals:
   > Stel OAuth in voor GitHub met client ID \`your-client-id\` en client secret \`your-client-secret\`

4. Je agent roept de router aan om een state-token te genereren, bouwt de autorisatie-URL en stuurt je de link

5. Na autorisatie wordt het token uitgewisseld en opgeslagen in \`OAUTH.md\` op de instantie van je agent

### Hoe het onder de motorkap werkt

Wanneer je agent een aangepaste OAuth-flow initieert, roept het het \`/oauth/state\`-eindpunt van de router aan met je aangepaste \`clientId\`, \`clientSecret\` en \`tokenUrl\`. De router slaat deze per client op en gebruikt ze wanneer de OAuth-provider terugverwijst naar de callback-URL.

---

## Beveiliging

- **OAuth-app-geheimen verlaten nooit de router** -- voor globale providers wordt het client secret opgeslagen in AWS Secrets Manager en nooit naar de instantie van je agent gestuurd
- **Aangepaste inloggegevens worden per client opgeslagen** in de database en alleen gebruikt voor jouw tokenuitwisseling
- **State-tokens verlopen na 10 minuten** om replay-aanvallen te voorkomen
- **Tokens worden lokaal opgeslagen** op de instantie van je agent in \`OAUTH.md\` -- ze worden niet gedeeld met andere gebruikers

---

## Probleemoplossing

| Probleem | Oplossing |
|---|---|
| Er verschijnen geen providerknoppen | Het platform heeft nog geen OAuth-providers geconfigureerd |
| "Je agent moet actief zijn" | Stuur eerst \`/start\` om je instantie te activeren |
| Autorisatielink komt niet aan | Je agent is mogelijk bezig — wacht even en probeer het opnieuw |
| "State verlopen" na het klikken op de link | De link is verlopen (10 min). Voer \`/authorize\` opnieuw uit |
| Tokenuitwisseling mislukt | Controleer of de redirect URI exact overeenkomt: \`https://router.xaiworkspace.com/oauth/callback\` |
`;
