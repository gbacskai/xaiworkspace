export const AUTHORIZE_IT = `
## Cos'è /authorize?

Il comando \`/authorize\` collega servizi di terze parti (come Google, GitHub o Microsoft) al tuo agente OpenClaw AI. Una volta collegati, il tuo agente può interagire con questi servizi per tuo conto.

---

## Come funziona

1. Invia \`/authorize\` nella tua chat xAI Workspace
2. Scegli un provider dai pulsanti (es. Google)
3. Il tuo agente riceve la richiesta e ti invia un link di autorizzazione
4. Clicca il link, accedi al provider e concedi l'accesso
5. Il token viene consegnato al tuo agente e salvato in \`OAUTH.md\`

Il tuo agente può quindi utilizzare il token salvato per accedere al servizio collegato.

---

## Provider disponibili

I seguenti provider sono disponibili immediatamente (quando configurati dalla piattaforma):

| Provider | Cosa può fare il tuo agente |
|---|---|
| **Google** | Accedere a Google Drive, Gmail, Calendar e altre API Google |
| **GitHub** | Leggere/scrivere repository, gestire issue, pull request |
| **Microsoft** | Accedere a OneDrive, Outlook, API Microsoft 365 |

Se un pulsante provider non appare, significa che non è stato ancora configurato.

---

## App OAuth personalizzate

Il tuo agente può anche collegarsi a **qualsiasi provider OAuth** utilizzando le credenziali della tua app. Questo è utile quando:

- Vuoi usare la tua app OAuth invece di quella condivisa
- Hai bisogno di collegarti a un provider non elencato sopra (es. Slack, GitLab, Bitbucket)
- Hai bisogno di scope OAuth specifici per il tuo caso d'uso

### Come configurare un'app OAuth personalizzata

1. **Registra un'app OAuth** presso il tuo provider (es. Google Cloud Console, GitHub Developer Settings)

2. **Imposta l'URI di reindirizzamento** su:
   \`\`\`
   https://router.xaiworkspace.com/oauth/callback
   \`\`\`

3. **Comunica le credenziali al tuo agente**. Invia un messaggio come:
   > Configura OAuth per GitHub con client ID \`your-client-id\` e client secret \`your-client-secret\`

4. Il tuo agente chiamerà il router per generare un token di stato, costruire l'URL di autorizzazione e inviarti il link

5. Dopo l'autorizzazione, il token viene scambiato e salvato in \`OAUTH.md\` sull'istanza del tuo agente

### Come funziona internamente

Quando il tuo agente avvia un flusso OAuth personalizzato, chiama l'endpoint \`/oauth/state\` del router con il tuo \`clientId\`, \`clientSecret\` e \`tokenUrl\` personalizzati. Il router li memorizza per ogni client e li utilizza quando il provider OAuth reindirizza all'URL di callback.

---

## Sicurezza

- **I segreti delle app OAuth non lasciano mai il router** -- per i provider globali, il client secret è conservato in AWS Secrets Manager e non viene mai inviato all'istanza del tuo agente
- **Le credenziali personalizzate sono memorizzate per ogni client** nel database e utilizzate solo per lo scambio del tuo token
- **I token di stato scadono dopo 10 minuti** per prevenire attacchi di replay
- **I token sono salvati localmente** sull'istanza del tuo agente in \`OAUTH.md\` -- non vengono condivisi con altri utenti

---

## Risoluzione dei problemi

| Problema | Soluzione |
|---|---|
| Non appaiono pulsanti provider | La piattaforma non ha ancora configurato nessun provider OAuth |
| "Your agent must be running" | Invia \`/start\` per riattivare la tua istanza prima |
| Il link di autorizzazione non arriva | Il tuo agente potrebbe essere occupato — attendi un momento e riprova |
| "State expired" dopo aver cliccato il link | Il link è scaduto (10 min). Esegui di nuovo \`/authorize\` |
| Lo scambio del token fallisce | Verifica che l'URI di reindirizzamento corrisponda esattamente: \`https://router.xaiworkspace.com/oauth/callback\` |
`;
