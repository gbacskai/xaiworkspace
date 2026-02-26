import { LocalizedArticle } from '../../i18n.types';

export const ARTICLES_IT: Record<string, LocalizedArticle> = {
  welcome: {
    title: 'Benvenuto su xAI Workspace',
    subtitle: 'Il tuo agente AI personale',
    content: `
**xAI Workspace** ti offre un agente AI dedicato accessibile direttamente da xAI Workspace — nessuna app da installare, nessun account da creare.

## Come funziona

1. **Avvia il bot** — Invia \`/start\` per iniziare. Riceverai una prova gratuita all'istante.
2. **Chatta e basta** — Invia un qualsiasi messaggio e il tuo agente AI risponderà. Comprende il contesto e può aiutarti con ricerche, scrittura, programmazione e molto altro.
3. **La tua istanza personale** — A differenza dei chatbot AI condivisi, ottieni un agente dedicato che funziona su un proprio server con memoria persistente.

## Cosa rende diverso xAI Workspace

- **Privato** — Le tue conversazioni restano sulla tua istanza dedicata
- **Persistente** — Il tuo agente ricorda il contesto tra le sessioni
- **Potente** — Basato su Claude, uno dei modelli AI più capaci
- **Semplice** — È solo xAI Workspace. Nessuna nuova app, nessuna curva di apprendimento
    `,
  },
  'first-steps': {
    title: 'Primi passi',
    subtitle: 'Configura il tuo agente in 60 secondi',
    content: `
## 1. Avvia il bot

Apri xAI Workspace e invia \`/start\` a **@xAIWorkspaceBot**. La tua prova gratuita inizia subito — nessuna carta di credito richiesta.

## 2. Attendi il provisioning

La tua istanza AI dedicata richiede circa 2 minuti per la configurazione. Riceverai una notifica quando sarà pronta.

## 3. Invia il tuo primo messaggio

Scrivi qualsiasi cosa! Prova:
- "Con cosa puoi aiutarmi?"
- "Riassumi le ultime notizie sull'AI"
- "Scrivi uno script Python che ordina una lista"

## 4. Esplora i comandi

- \`/authorize\` — Collega Google, Microsoft, GitHub e altro
- \`/usage\` — Controlla il tuo saldo di utilizzo
- \`/billing\` — Gestisci il tuo abbonamento
- \`/language\` — Cambia la tua lingua preferita
- \`/ssh\` — Connettiti al tuo workspace per accedere ai file
- \`/help\` — Visualizza tutti i comandi disponibili
- \`/models\` — Cambia modello AI
    `,
  },
  models: {
    title: 'Modelli AI',
    subtitle: 'Scegli il modello giusto per il tuo compito',
    content: `
xAI Workspace supporta diversi modelli AI di vari provider. Passa da uno all'altro con \`/models\`.

## Modelli disponibili

| Modello | Ideale per |
|---------|-----------|
| **Claude Sonnet** | Attività quotidiane — veloce, capace, bilanciato |
| **Claude Opus** | Ragionamento complesso, ricerca, documenti lunghi |
| **Claude Haiku** | Risposte rapide, attività semplici, costo minimo |
| **GPT-4o** | Uso generico, buono per output strutturato |
| **DeepSeek** | Ragionamento e programmazione a costi contenuti |
| **Gemini** | Attività multimodali, finestre di contesto ampie |

## Cambiare modello

1. Invia \`/models\` nella chat
2. Tocca il modello che desideri utilizzare
3. Un segno di spunta appare accanto al modello attivo

La tua selezione viene mantenuta tra le sessioni. Puoi cambiare in qualsiasi momento.

## Consumo di utilizzo

Modelli diversi consumano utilizzo a velocità diverse. Opus utilizza più risorse per risposta rispetto a Haiku. Controlla il tuo saldo con \`/usage\`.
    `,
  },
  'remote-access': {
    title: 'Accesso remoto',
    subtitle: 'Accesso SSH e SFTP al tuo workspace',
    content: `
Ogni istanza xAI Workspace è una macchina dedicata tutta tua. Puoi connetterti tramite SSH o SFTP per gestire file, eseguire strumenti e personalizzare il tuo ambiente.

## Ottenere la tua chiave

1. Invia \`/ssh\` nella chat xAI Workspace
2. Il bot ti invia un file chiave \`.pem\` con i dettagli di connessione
3. Salva il file e imposta i permessi prima di connetterti

## SSH — Accesso terminale

\`\`\`bash
# Imposta i permessi sul file chiave (necessario, una sola volta)
chmod 600 <chatId>-xaiworkspace.pem

# Connettiti tramite il bastion host
ssh -i <chatId>-xaiworkspace.pem xai<chatId>@ssh.xaiworkspace.com
\`\`\`

Sostituisci \`<chatId>\` con il tuo ID chat xAI Workspace (mostrato nel nome del file chiave).

> Se ricevi un errore "permission denied", verifica di aver eseguito \`chmod 600\` sul file chiave.

## SFTP — Trasferimento file

Puoi usare qualsiasi client SFTP per caricare e scaricare file:

\`\`\`bash
# SFTP da riga di comando
sftp -i <chatId>-xaiworkspace.pem xai<chatId>@ssh.xaiworkspace.com
\`\`\`

### FileZilla — Configurazione passo per passo

FileZilla è un client SFTP gratuito e multipiattaforma. Segui questi passaggi per connetterti al tuo workspace:

#### 1. Scarica e installa FileZilla

Scarica FileZilla Client (non Server) da [filezilla-project.org](https://filezilla-project.org). Disponibile per Windows, macOS e Linux.

#### 2. Apri il Gestore siti

Avvia FileZilla e vai su **File → Gestore siti** (o premi **Ctrl+S** su Windows/Linux, **Cmd+S** su macOS).

#### 3. Crea un nuovo sito

1. Clicca **Nuovo sito**
2. Chiamalo **xAI Workspace**

#### 4. Inserisci le impostazioni di connessione

Compila il pannello a destra:

| Impostazione | Valore |
|---|---|
| **Protocollo** | SFTP - SSH File Transfer Protocol |
| **Host** | ssh.xaiworkspace.com |
| **Porta** | 22 |
| **Tipo di accesso** | File chiave |
| **Utente** | xai\`<chatId>\` |

#### 5. Aggiungi il tuo file chiave

1. Nel campo **File chiave**, clicca **Sfoglia...**
2. Seleziona il file \`.pem\` scaricato da \`/ssh\`
3. Se FileZilla chiede di convertire la chiave in formato PPK, clicca **Sì** — salverà automaticamente una copia convertita

> Su macOS o Linux, assicurati di aver eseguito \`chmod 600\` sul file .pem prima.

#### 6. Connettiti

1. Clicca **Connetti**
2. Alla prima connessione, FileZilla mostra una finestra "Chiave host sconosciuta" — verifica i dettagli e clicca **OK** per considerare attendibile il server

#### 7. Trasferisci file

- Il **pannello sinistro** mostra i tuoi file locali
- Il **pannello destro** mostra i file del tuo workspace
- **Trascina e rilascia** i file tra i pannelli per caricare o scaricare
- **Tasto destro** per rinominare, eliminare e opzioni di permessi

> **Suggerimento:** Il tuo sito è salvato nel Gestore siti. La prossima volta, apri il Gestore siti e fai doppio clic su **xAI Workspace** per riconnetterti istantaneamente.

Altri client SFTP grafici come **Cyberduck** e **WinSCP** funzionano altrettanto bene — usa le stesse impostazioni di host, porta, nome utente e file chiave indicate sopra.

## Cosa puoi fare

Una volta connesso, il tuo workspace è completamente tuo:

- **Gestisci file** — sfoglia, modifica, carica e scarica documenti
- **Monitora l'attività** — visualizza i log del tuo agente in tempo reale
- **Installa strumenti** — aggiungi qualsiasi software o runtime di cui hai bisogno
- **Esegui automazioni** — configura attività pianificate o servizi in background
- **Trasferisci file** — usa \`scp\`, \`rsync\` o SFTP per spostare file

## Se il tuo workspace è ancora in fase di configurazione

Se il tuo workspace è ancora in fase di provisioning, il bot te lo farà sapere. Attendi un paio di minuti e riprova con \`/ssh\`.

## Sicurezza

- Tutte le connessioni passano attraverso un **bastion host** — la tua istanza non è mai esposta direttamente a internet
- Una chiave di crittografia ed25519 unica viene generata per ogni workspace durante la configurazione
- L'accesso con password è disabilitato — funziona solo il tuo file chiave personale
- L'accesso root è limitato per sicurezza
- La tua chiave è conservata crittografata in S3 e consegnata solo alla tua chat xAI Workspace
    `,
  },
  billing: {
    title: 'Piani e fatturazione',
    subtitle: 'Abbonamenti, utilizzo e pagamenti',
    content: `
## Piani

| Piano | Prezzo | Punti chiave |
|-------|--------|-------------|
| **Trial** | Gratuito | Senza pubblicità, invita amici |
| **Essential** | $100/mese | Senza pubblicità, invita amici, modelli migliori |
| **Professional** | $300/mese | Modelli prioritari, nessun invito necessario |
| **Enterprise** | $600/mese | Modelli premium, istanza dedicata |
| **Ultimate** | $2.500/mese | Modelli e tariffe migliori, istanza dedicata |

I piani superiori sbloccano tariffe migliori e accesso a modelli più capaci.

## Gestire il tuo abbonamento

Invia \`/billing\` per aprire il pannello di fatturazione dove puoi:
- Visualizzare il tuo piano attuale e la data di rinnovo
- Effettuare upgrade o downgrade
- Attivare la ricarica automatica per utilizzo extra
- Aggiornare il tuo metodo di pagamento

## Utilizzo extra

Stai esaurendo le risorse? Attiva la **ricarica automatica** in \`/billing\` per acquistare automaticamente utilizzo extra quando raggiungi il tuo limite.

## Storico pagamenti

Invia \`/invoices\` per visualizzare tutti i pagamenti passati e le ricevute.
    `,
  },
  productivity: {
    title: 'Consigli di produttività',
    subtitle: 'Ottieni il massimo dal tuo agente AI',
    content: `
## Sii specifico

Invece di "aiutami a scrivere un'email", prova:
> "Scrivi un'email professionale al mio cliente Giovanni per declinare la riunione di venerdì. Suggerisci martedì o mercoledì come alternativa. Mantienila breve e cordiale."

## Usa il contesto

Il tuo agente ricorda la conversazione. Costruisci sui messaggi precedenti:
1. "Analizza questi dati CSV: ..."
2. "Ora crea un grafico che mostra il trend mensile"
3. "Aggiungi un paragrafo riepilogativo per il team dirigenziale"

## Scegli il modello giusto

- **Domanda veloce?** → Haiku (il più rapido, il più economico)
- **Lavoro quotidiano?** → Sonnet (predefinito, bilanciato)
- **Analisi complessa?** → Opus (il più capace)

Cambia con \`/models\`.

## Monitora l'utilizzo

Controlla regolarmente \`/usage\` per tenere traccia del tuo consumo. La barra di progresso mostra la tua allocazione mensile.
    `,
  },
  'language-region': {
    title: 'Lingua e area geografica',
    subtitle: 'Cambia lingua e posizione del server',
    content: `
## Cambia lingua

Invia \`/language\` per scegliere tra 10 lingue supportate:

| | |
|---|---|
| 🇬🇧 English | 🇨🇳 中文 |
| 🇪🇸 Español | 🇸🇦 العربية |
| 🇧🇷 Português | 🇩🇪 Deutsch |
| 🇫🇷 Français | 🇯🇵 日本語 |
| 🇷🇺 Русский | 🇮🇳 हिन्दी |

La tua preferenza linguistica viene rilevata automaticamente dalle impostazioni di xAI Workspace al primo utilizzo, ma puoi cambiarla in qualsiasi momento. Tutti i messaggi del bot appariranno nella lingua selezionata.

## Cambia area geografica

Invia \`/region\` per spostare la tua istanza AI in un'altra regione server. Questo può ridurre la latenza se ti trovi più vicino a un altro data center.

Le regioni disponibili vengono mostrate con la tua selezione attuale evidenziata.
    `,
  },
  'privacy-data': {
    title: 'I tuoi dati e la privacy',
    subtitle: 'Accedi, esporta o elimina i tuoi dati',
    content: `
## Controlli sulla privacy

xAI Workspace ti offre il pieno controllo sui tuoi dati personali, direttamente da xAI Workspace:

- \`/privacy\` — Visualizza l'Informativa sulla privacy e i Termini di servizio
- \`/my_data\` — Esporta tutti i tuoi dati personali come file JSON
- \`/delete_my_data\` — Elimina permanentemente tutti i tuoi dati personali

## Cosa viene esportato

Il comando \`/my_data\` esporta:

- I dettagli del tuo account (piano, email, area geografica)
- Lo storico dei pagamenti
- Le statistiche di utilizzo
- Le informazioni sull'istanza server

## Cosa viene eliminato

Il comando \`/delete_my_data\` rimuove:

- Il tuo record cliente e tutti i dati dell'account
- Lo storico dei pagamenti
- I log di utilizzo e il tracciamento della spesa
- La tua istanza AI e tutti i file presenti
- Le chiavi di accesso e i record di connessione

Questa azione è **permanente e non può essere annullata**. Ti verrà chiesto di confermare prima di procedere con l'eliminazione.

## Contatto

Per qualsiasi domanda sulla privacy: privacy@xshopper.com
    `,
  },
  referrals: {
    title: 'Invita amici',
    subtitle: 'Guadagna utilizzo bonus con i referral',
    content: `
## Come funziona

1. Invia \`/invite email@example.com\` per invitare un amico
2. Ricevi **200K di utilizzo bonus** istantaneamente per ogni invito inviato
3. Quando il tuo amico si abbona, guadagni un bonus referral aggiuntivo

## Regole

- Fino a **5 crediti invito al mese**
- Massimo **10 inviti in sospeso** (non utilizzati) alla volta
- Lo stesso indirizzo email non può essere reinvitato entro **4 settimane**
- L'invitato non deve già avere un account xAI Workspace

## Tracciamento dei tuoi inviti

Invia \`/invites\` per vedere tutti i tuoi inviti inviati con il relativo stato:
- **in attesa** — invito inviato, non ancora iscritto
- **iscritto** — l'invitato ha creato un account
- **abbonato** — l'invitato ha effettuato il primo pagamento (bonus referral guadagnato)
    `,
  },
};
