export const COMPLIANCE_IT = `
## Registrazione della società

**xShopper Pty Ltd** è una società australiana registrata.

- **Marchio australiano:** No. 1749660 (Class 35)
- **Nome operativo:** xAI Workspace
- **Giurisdizione:** Australia

---

## Protezione dei dati

xAI Workspace è conforme ai seguenti quadri normativi sulla protezione dei dati:

- **General Data Protection Regulation (GDPR)** — per gli utenti nell'EU/EEA e nel Regno Unito
- **Australian Privacy Act 1988** — inclusi gli Australian Privacy Principles (APPs)

Manteniamo una base giuridica per tutto il trattamento dei dati personali e forniamo meccanismi affinché gli utenti possano esercitare i propri diritti in entrambi i quadri normativi. I dettagli completi sono disponibili nella nostra [Informativa sulla privacy](/privacy).

---

## Sicurezza dell'infrastruttura

Tutti i dati sono crittografati sia in transito che a riposo:

- **In transito:** TLS 1.3 per tutte le connessioni tra client, server e servizi di terze parti
- **A riposo:** Crittografia AES-256 per i dati memorizzati
- **Hosting primario:** Amazon Web Services (AWS), regione Sydney (ap-southeast-2)
- **Regione secondaria:** AWS N. Virginia (us-east-1) per servizi specifici

L'infrastruttura è monitorata 24 ore su 24, 7 giorni su 7, con avvisi automatici per anomalie e potenziali eventi di sicurezza.

---

## Conformità dei pagamenti

Tutta l'elaborazione dei pagamenti è gestita da **Stripe**, certificato come **PCI DSS Level 1 Service Provider** — il livello più alto di certificazione nel settore delle carte di pagamento.

- xAI Workspace **non** memorizza, elabora o trasmette numeri di carte di credito
- I dati delle carte di pagamento sono gestiti interamente dall'infrastruttura conforme PCI di Stripe
- Conserviamo solo l'ID cliente Stripe e le ultime 4 cifre della carta come riferimento

---

## Gestione dei dati dei fornitori AI

Quando utilizzi xAI Workspace, il contenuto della tua conversazione viene inviato al fornitore AI che selezioni. Ogni fornitore ha i propri impegni sulla gestione dei dati:

| Fornitore | Regione | Politica di conservazione dei dati |
|---|---|---|
| **Anthropic** (Claude) | Stati Uniti | Non addestra sui dati API; conservazione 30 giorni |
| **OpenAI** (GPT) | Stati Uniti | Non addestra sui dati API; conservazione 30 giorni |
| **Google** (Gemini) | Stati Uniti | Non addestra sui dati API |
| **Mistral AI** | Francia (EU) | Non addestra sui dati API |
| **Groq** (Llama, Mixtral) | Stati Uniti | Non memorizza i prompt dopo l'elaborazione |
| **Amazon Bedrock** | Australia / US | I dati rimangono nella regione AWS selezionata |

Utilizziamo esclusivamente l'accesso a livello API con tutti i fornitori, il che esclude universalmente l'addestramento sui dati dei clienti.

---

## Sub-responsabili del trattamento

I seguenti terzi trattano dati personali per nostro conto:

| Sub-responsabile | Finalità | Ubicazione |
|---|---|---|
| **Amazon Web Services** | Hosting dell'infrastruttura | Australia (Sydney), US (N. Virginia) |
| **Stripe** | Elaborazione dei pagamenti | Stati Uniti |
| **Neon** | Hosting del database | Stati Uniti |
| **Telegram** | Consegna dei messaggi | Paesi Bassi / EAU |
| **Google** | Fornitore di identità OAuth, AI (Gemini) | Stati Uniti |
| **Anthropic** | Fornitore di modelli AI (Claude) | Stati Uniti |
| **OpenAI** | Fornitore di modelli AI (GPT) | Stati Uniti |
| **Mistral AI** | Fornitore di modelli AI | Francia |
| **Groq** | Fornitore di modelli AI | Stati Uniti |

---

## Risposta agli incidenti

xShopper mantiene un processo documentato di risposta agli incidenti:

- **Rilevamento:** Monitoraggio automatico e avvisi su tutta l'infrastruttura
- **Risposta:** Gli incidenti vengono classificati e indagati entro 4 ore
- **Notifica:** Gli utenti interessati vengono informati entro 72 ore dalla conferma di una violazione dei dati personali, come richiesto dal GDPR e raccomandato dall'Australian Privacy Principle 11
- **Rimedio:** L'analisi delle cause principali e le azioni correttive sono documentate per ogni incidente

---

## Residenza dei dati

- **Archiviazione primaria dei dati:** AWS Sydney (ap-southeast-2), Australia
- **Database:** Neon, ospitato negli Stati Uniti
- **Elaborazione AI:** Varia in base al fornitore — consulta la sezione Gestione dei dati dei fornitori AI sopra
- **Pagamenti:** Elaborati da Stripe negli Stati Uniti

Per gli utenti che richiedono una rigorosa residenza dei dati in Australia, la selezione dei modelli Amazon Bedrock garantisce che l'elaborazione AI avvenga all'interno dell'infrastruttura AWS australiana.

---

## Contatti

Per richieste di conformità: **privacy@xshopper.com**

xShopper Pty Ltd, Australia
Australian Trademark No. 1749660 (Class 35)

*Versione della pagina di conformità: 2026-02-27*
`;
