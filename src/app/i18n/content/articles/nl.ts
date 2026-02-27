import { LocalizedArticle } from '../../i18n.types';

export const ARTICLES_NL: Record<string, LocalizedArticle> = {
  welcome: {
    title: 'Welkom bij xAI Workspace',
    subtitle: 'Jouw persoonlijke AI-agent',
    content: `
**xAI Workspace** geeft je een eigen AI-agent die rechtstreeks in xAI Workspace werkt — geen apps om te installeren, geen accounts om aan te maken.

## Hoe het werkt

1. **Start de bot** — Stuur \`/start\` om te beginnen. Je krijgt direct een gratis proefversie.
2. **Gewoon chatten** — Stuur een bericht en je AI-agent antwoordt. Hij begrijpt context en kan helpen met onderzoek, schrijven, programmeren en meer.
3. **Je eigen instantie** — In tegenstelling tot gedeelde AI-chatbots krijg je een eigen agent die draait op een eigen server met persistent geheugen.

## Wat xAI Workspace anders maakt

- **Privé** — Je gesprekken blijven op jouw eigen instantie
- **Persistent** — Je agent onthoudt context over sessies heen
- **Krachtig** — Aangedreven door Claude, een van de krachtigste AI-modellen
- **Eenvoudig** — Het is gewoon xAI Workspace. Geen nieuwe apps, geen leercurve
    `,
  },
  'first-steps': {
    title: 'Eerste Stappen',
    subtitle: 'Stel je agent in 60 seconden in',
    content: `
## 1. Start de bot

Open xAI Workspace en stuur \`/start\` naar **@xAIWorkspaceBot**. Je gratis proefperiode begint direct — geen creditcard nodig.

## 2. Wacht op de inrichting

Het opzetten van je eigen AI-instantie duurt ongeveer 2 minuten. Je ontvangt een melding zodra deze klaar is.

## 3. Stuur je eerste bericht

Typ gewoon iets! Probeer:
- "Waar kun je me mee helpen?"
- "Vat het laatste nieuws over AI samen"
- "Schrijf een Python-script dat een lijst sorteert"

## 4. Ontdek de commando's

- \`/authorize\` — Koppel Google, Microsoft, GitHub en meer
- \`/usage\` — Bekijk je tokenbalans
- \`/billing\` — Beheer je abonnement
- \`/language\` — Wijzig je voorkeurstaal
- \`/ssh\` — Maak verbinding met je workspace voor bestandstoegang
- \`/help\` — Bekijk alle beschikbare commando's
- \`/models\` — Wissel tussen AI-modellen
    `,
  },
  models: {
    title: 'AI-modellen',
    subtitle: 'Kies het juiste model voor je taak',
    content: `
xAI Workspace ondersteunt meerdere AI-modellen van verschillende aanbieders. Wissel tussen modellen met \`/models\`.

## Beschikbare modellen

| Model | Beste voor |
|-------|------------|
| **Claude Sonnet** | Dagelijkse taken — snel, capabel, gebalanceerd |
| **Claude Opus** | Complexe redeneringen, onderzoek, lange documenten |
| **Claude Haiku** | Snelle antwoorden, eenvoudige taken, laagste kosten |
| **GPT-4o** | Algemeen gebruik, goed in gestructureerde output |
| **DeepSeek** | Kosteneffectief redeneren en programmeren |
| **Gemini** | Multimodale taken, grote contextvensters |

## Wisselen van model

1. Stuur \`/models\` in de chat
2. Tik op het model dat je wilt gebruiken
3. Er verschijnt een ✓ naast je actieve model

Je keuze blijft bewaard over sessies heen. Je kunt op elk moment wisselen.

## Tokenverbruik

Verschillende modellen verbruiken tokens in verschillende hoeveelheden. Opus gebruikt meer tokens per antwoord dan Haiku. Bekijk je saldo met \`/usage\`.
    `,
  },
  'remote-access': {
    title: 'Externe Toegang',
    subtitle: 'SSH- en SFTP-toegang tot je workspace',
    content: `
Elke xAI Workspace-instantie is je eigen dedicated machine. Je kunt verbinding maken via SSH of SFTP om bestanden te beheren, tools te draaien en je omgeving aan te passen.

## Je sleutel ophalen

1. Stuur \`/ssh\` in de xAI Workspace-chat
2. De bot stuurt je een \`.pem\`-sleutelbestand met verbindingsgegevens
3. Sla het bestand op en stel de machtigingen in voordat je verbinding maakt

## SSH — Terminaltoegang

\`\`\`bash
# Stel machtigingen in op het sleutelbestand (vereist, eenmalig)
chmod 600 <chatId>-xaiworkspace.pem

# Maak verbinding via de bastion host
ssh -i <chatId>-xaiworkspace.pem xai<chatId>@ssh.xaiworkspace.com
\`\`\`

Vervang \`<chatId>\` door je xAI Workspace chat-ID (te zien in de bestandsnaam van de sleutel).

> Als je een "permission denied"-fout krijgt, controleer dan of je \`chmod 600\` hebt uitgevoerd op het sleutelbestand.

## SFTP — Bestandsoverdracht

Je kunt elke SFTP-client gebruiken om bestanden te uploaden en downloaden:

\`\`\`bash
# Command-line SFTP
sftp -i <chatId>-xaiworkspace.pem xai<chatId>@ssh.xaiworkspace.com
\`\`\`

### FileZilla — Stap-voor-stap handleiding

FileZilla is een gratis, platformonafhankelijke SFTP-client. Volg deze stappen om verbinding te maken met je workspace:

#### 1. Download en installeer FileZilla

Download FileZilla Client (niet Server) van [filezilla-project.org](https://filezilla-project.org). Beschikbaar voor Windows, macOS en Linux.

#### 2. Open de Sitebeheerder

Start FileZilla en ga naar **Bestand → Sitebeheerder** (of druk op **Ctrl+S** op Windows/Linux, **Cmd+S** op macOS).

#### 3. Maak een nieuwe site aan

1. Klik op **Nieuwe Site**
2. Noem deze **xAI Workspace**

#### 4. Voer de verbindingsinstellingen in

Vul het rechterpaneel in:

| Instelling | Waarde |
|---|---|
| **Protocol** | SFTP - SSH File Transfer Protocol |
| **Host** | ssh.xaiworkspace.com |
| **Poort** | 22 |
| **Inlogtype** | Sleutelbestand |
| **Gebruiker** | xai\`<chatId>\` |

#### 5. Voeg je sleutelbestand toe

1. Klik in het veld **Sleutelbestand** op **Bladeren...**
2. Selecteer het \`.pem\`-bestand dat je hebt gedownload via \`/ssh\`
3. Als FileZilla vraagt om de sleutel te converteren naar PPK-formaat, klik op **Ja** — er wordt automatisch een geconverteerde kopie opgeslagen

> Op macOS of Linux moet je eerst \`chmod 600\` uitvoeren op het .pem-bestand.

#### 6. Verbinding maken

1. Klik op **Verbinden**
2. Bij de eerste verbinding toont FileZilla een dialoogvenster "Onbekende hostsleutel" — controleer de gegevens en klik op **OK** om de server te vertrouwen

#### 7. Bestanden overdragen

- Het **linkerpaneel** toont je lokale bestanden
- Het **rechterpaneel** toont je workspace-bestanden
- **Sleep bestanden** tussen de panelen om te uploaden of downloaden
- **Klik met de rechtermuisknop** voor opties zoals hernoemen, verwijderen en machtigingen

> **Tip:** Je site wordt opgeslagen in Sitebeheerder. De volgende keer open je Sitebeheerder en dubbelklik je op **xAI Workspace** om direct opnieuw te verbinden.

Andere grafische SFTP-clients zoals **Cyberduck** en **WinSCP** werken ook — gebruik dezelfde host, poort, gebruikersnaam en sleutelbestandsinstellingen als hierboven.

## Wat je kunt doen

Eenmaal verbonden is je workspace volledig van jou:

- **Bestanden beheren** — bladeren, bewerken, uploaden en downloaden van documenten
- **Activiteit monitoren** — bekijk de logs van je agent in realtime
- **Tools installeren** — voeg alle software of runtimes toe die je nodig hebt
- **Automatiseringen uitvoeren** — stel geplande taken of achtergronddiensten in
- **Bestanden overdragen** — gebruik \`scp\`, \`rsync\` of SFTP om bestanden te verplaatsen

## Als je workspace nog wordt ingericht

Als je workspace nog wordt ingericht, laat de bot je dat weten. Wacht een paar minuten en probeer \`/ssh\` opnieuw.

## Beveiliging

- Alle verbindingen gaan via een **bastion host** — je instantie is nooit direct blootgesteld aan het internet
- Er wordt een unieke ed25519-encryptiesleutel gegenereerd voor elke workspace tijdens de installatie
- Wachtwoordinlog is uitgeschakeld — alleen je persoonlijke sleutelbestand werkt
- Root-toegang is beperkt voor de veiligheid
- Je sleutel wordt versleuteld opgeslagen in S3 en alleen bezorgd in je xAI Workspace-chat
    `,
  },
  billing: {
    title: 'Abonnementen & Facturering',
    subtitle: 'Abonnementen, tokens en betalingen',
    content: `
## Abonnementen

| Abonnement | Prijs | Kenmerken |
|------|-------|------------|
| **Trial** | Gratis | Advertentievrij, vrienden uitnodigen |
| **Essential** | $100/mnd | Advertentievrij, vrienden uitnodigen, betere modellen |
| **Professional** | $300/mnd | Prioriteitsmodellen, geen uitnodiging nodig |
| **Enterprise** | $600/mnd | Premium modellen, eigen instantie |
| **Ultimate** | $2.500/mnd | Beste modellen & tarieven, eigen instantie |

Hogere niveaus ontgrendelen betere tarieven en toegang tot krachtigere modellen.

## Je abonnement beheren

Stuur \`/billing\` om het factureringsdashboard te openen waar je het volgende kunt doen:
- Je huidige abonnement en verlengingsdatum bekijken
- Upgraden of downgraden
- Automatisch bijvullen inschakelen voor extra gebruik
- Je betaalmethode bijwerken

## Extra gebruik

Bijna door je tegoed heen? Schakel **automatisch bijvullen** in via \`/billing\` om automatisch extra gebruik aan te schaffen wanneer je je limiet bereikt.

## Betalingsgeschiedenis

Stuur \`/invoices\` om al je eerdere betalingen en bonnetjes te bekijken.
    `,
  },
  productivity: {
    title: 'Productiviteitstips',
    subtitle: 'Haal het meeste uit je AI-agent',
    content: `
## Wees specifiek

In plaats van "help me een e-mail schrijven", probeer:
> "Schrijf een professionele e-mail aan mijn klant Jan waarin ik de vrijdagvergadering afzeg. Stel dinsdag of woensdag voor als alternatief. Houd het kort en vriendelijk."

## Gebruik context

Je agent onthoudt het gesprek. Bouw voort op eerdere berichten:
1. "Analyseer deze CSV-gegevens: ..."
2. "Maak nu een grafiek met de maandelijkse trend"
3. "Voeg een samenvattende alinea toe voor het managementteam"

## Kies het juiste model

- **Snelle vraag?** → Haiku (snelst, goedkoopst)
- **Dagelijks werk?** → Sonnet (standaard, gebalanceerd)
- **Complexe analyse?** → Opus (meest capabel)

Wissel met \`/models\`.

## Houd je verbruik bij

Controleer \`/usage\` regelmatig om je tokenverbruik te volgen. De voortgangsbalk toont je maandelijkse toewijzing.
    `,
  },
  'language-region': {
    title: 'Taal & Regio',
    subtitle: 'Wijzig taal en serverlocatie',
    content: `
## Taal wijzigen

Stuur \`/language\` om te kiezen uit 16 ondersteunde talen:

| | |
|---|---|
| 🇬🇧 English | 🇨🇳 中文 |
| 🇪🇸 Español | 🇸🇦 العربية |
| 🇧🇷 Português | 🇩🇪 Deutsch |
| 🇫🇷 Français | 🇯🇵 日本語 |
| 🇷🇺 Русский | 🇮🇳 हिन्दी |
| 🇰🇷 한국어 | 🇹🇷 Türkçe |
| 🇮🇹 Italiano | 🇮🇩 Bahasa Indonesia |
| 🇳🇱 Nederlands | 🇭🇺 Magyar |

Je taalvoorkeur wordt bij eerste gebruik automatisch gedetecteerd op basis van je xAI Workspace-instellingen, maar je kunt deze op elk moment wijzigen. Alle botberichten verschijnen in de door jou gekozen taal.

## Regio wijzigen

Stuur \`/region\` om je AI-instantie naar een andere serverregio te verplaatsen. Dit kan de latentie verlagen als je dichter bij een ander datacenter bent.

Beschikbare regio's worden getoond met je huidige selectie gemarkeerd.
    `,
  },
  'privacy-data': {
    title: 'Je Gegevens & Privacy',
    subtitle: 'Bekijk, exporteer of verwijder je gegevens',
    content: `
## Privacyinstellingen

xAI Workspace geeft je volledige controle over je persoonlijke gegevens, rechtstreeks in xAI Workspace:

- \`/privacy\` — Bekijk het Privacybeleid en de Servicevoorwaarden
- \`/my_data\` — Exporteer al je persoonlijke gegevens als JSON-bestand
- \`/delete_my_data\` — Verwijder al je persoonlijke gegevens permanent

## Wat er wordt geëxporteerd

Het commando \`/my_data\` exporteert:

- Je accountgegevens (abonnement, e-mail, regio)
- Betalingsgeschiedenis
- Gebruiksstatistieken
- Serverinstantie-informatie

## Wat er wordt verwijderd

Het commando \`/delete_my_data\` verwijdert:

- Je klantrecord en alle accountgegevens
- Betalingsgeschiedenis
- Gebruikslogs en uitgavenregistratie
- Je AI-instantie en alle bestanden erop
- Toegangssleutels en verbindingsrecords

Deze actie is **permanent en kan niet ongedaan worden gemaakt**. Er wordt om bevestiging gevraagd voordat de verwijdering wordt uitgevoerd.

## Contact

Voor vragen over privacy: privacy@xshopper.com
    `,
  },
  referrals: {
    title: 'Vrienden Uitnodigen',
    subtitle: 'Verdien bonustokens met verwijzingen',
    content: `
## Hoe het werkt

1. Stuur \`/invite email@example.com\` om een vriend uit te nodigen
2. Je krijgt direct **200K bonustokens** voor elke verzonden uitnodiging
3. Wanneer je vriend een abonnement neemt, verdien je een extra verwijzingsbonus

## Regels

- Maximaal **5 uitnodigingskredieten per maand**
- Maximaal **10 openstaande** (ongebruikte) uitnodigingen tegelijk
- Hetzelfde e-mailadres kan niet opnieuw worden uitgenodigd binnen **4 weken**
- De uitgenodigde mag nog geen xAI Workspace-account hebben

## Je uitnodigingen volgen

Stuur \`/invites\` om al je verzonden uitnodigingen met hun status te bekijken:
- **wachtend** — uitnodiging verzonden, nog niet aangemeld
- **aangemeld** — uitgenodigde heeft een account aangemaakt
- **geabonneerd** — uitgenodigde heeft de eerste betaling gedaan (verwijzingsbonus verdiend)
    `,
  },
};
