export const COMPLIANCE_NL = `
## Bedrijfsregistratie

**xShopper Pty Ltd** is een geregistreerd Australisch bedrijf.

- **Australisch handelsmerk:** No. 1749660 (Class 35)
- **Handelsnaam:** xAI Workspace
- **Jurisdictie:** Australië

---

## Gegevensbescherming

xAI Workspace voldoet aan de volgende kaders voor gegevensbescherming:

- **General Data Protection Regulation (GDPR)** — voor gebruikers in de EU/EER en het Verenigd Koninkrijk
- **Australian Privacy Act 1988** — inclusief de Australian Privacy Principles (APPs)

Wij handhaven een rechtmatige grondslag voor alle verwerking van persoonsgegevens en bieden mechanismen waarmee gebruikers hun rechten onder beide kaders kunnen uitoefenen. Volledige details zijn beschikbaar in ons [Privacybeleid](/privacy).

---

## Infrastructuurbeveiliging

Alle gegevens worden zowel tijdens verzending als in rust versleuteld:

- **Tijdens verzending:** TLS 1.3 voor alle verbindingen tussen clients, servers en diensten van derden
- **In rust:** AES-256-versleuteling voor opgeslagen gegevens
- **Primaire hosting:** Amazon Web Services (AWS), regio Sydney (ap-southeast-2)
- **Secundaire regio:** AWS N. Virginia (us-east-1) voor specifieke diensten

De infrastructuur wordt 24/7 bewaakt met geautomatiseerde waarschuwingen voor afwijkingen en mogelijke beveiligingsincidenten.

---

## Betalingscompliance

Alle betalingsverwerking wordt uitgevoerd door **Stripe**, dat gecertificeerd is als **PCI DSS Level 1 Service Provider** — het hoogste certificeringsniveau in de betaalkaartindustrie.

- xAI Workspace slaat creditcardnummers **niet** op, verwerkt ze niet en verzendt ze niet
- Betaalkaartgegevens worden volledig verwerkt door de PCI-conforme infrastructuur van Stripe
- Wij bewaren alleen de Stripe-klant-ID en de laatste 4 cijfers van de kaart ter referentie

---

## Gegevensverwerking door AI-providers

Wanneer u xAI Workspace gebruikt, wordt uw gespreksinhoud verzonden naar de AI-provider die u selecteert. Elke provider heeft eigen toezeggingen voor gegevensverwerking:

| Provider | Regio | Beleid voor gegevensbewaring |
|---|---|---|
| **Anthropic** (Claude) | Verenigde Staten | Traint niet op API-invoer; 30 dagen bewaring |
| **OpenAI** (GPT) | Verenigde Staten | Traint niet op API-invoer; 30 dagen bewaring |
| **Google** (Gemini) | Verenigde Staten | Traint niet op API-invoer |
| **Mistral AI** | Frankrijk (EU) | Traint niet op API-invoer |
| **Groq** (Llama, Mixtral) | Verenigde Staten | Slaat prompts niet op na verwerking |
| **Amazon Bedrock** | Australië / US | Gegevens blijven binnen uw geselecteerde AWS-regio |

Wij gebruiken uitsluitend API-niveau toegang bij alle providers, wat universeel training op klantgegevens uitsluit.

---

## Subverwerkers

De volgende derden verwerken persoonsgegevens namens ons:

| Subverwerker | Doel | Locatie |
|---|---|---|
| **Amazon Web Services** | Infrastructuurhosting | Australië (Sydney), US (N. Virginia) |
| **Stripe** | Betalingsverwerking | Verenigde Staten |
| **Neon** | Databasehosting | Verenigde Staten |
| **Telegram** | Berichtbezorging | Nederland / VAE |
| **Google** | OAuth-identiteitsprovider, AI (Gemini) | Verenigde Staten |
| **Anthropic** | AI-modelprovider (Claude) | Verenigde Staten |
| **OpenAI** | AI-modelprovider (GPT) | Verenigde Staten |
| **Mistral AI** | AI-modelprovider | Frankrijk |
| **Groq** | AI-modelprovider | Verenigde Staten |

---

## Incidentrespons

xShopper hanteert een gedocumenteerd incidentresponsproces:

- **Detectie:** Geautomatiseerde monitoring en waarschuwingen over de gehele infrastructuur
- **Respons:** Incidenten worden binnen 4 uur getriageerd en onderzocht
- **Melding:** Getroffen gebruikers worden binnen 72 uur na een bevestigde inbreuk op persoonsgegevens geïnformeerd, zoals vereist door GDPR en aanbevolen onder Australian Privacy Principle 11
- **Herstel:** Oorzaakanalyse en corrigerende maatregelen worden voor elk incident gedocumenteerd

---

## Gegevensresidentie

- **Primaire gegevensopslag:** AWS Sydney (ap-southeast-2), Australië
- **Database:** Neon, gehost in de Verenigde Staten
- **AI-verwerking:** Verschilt per provider — zie de sectie Gegevensverwerking door AI-providers hierboven
- **Betalingen:** Verwerkt door Stripe in de Verenigde Staten

Voor gebruikers die strikte Australische gegevensresidentie vereisen, zorgt het selecteren van Amazon Bedrock-modellen ervoor dat AI-verwerking plaatsvindt binnen de Australische AWS-infrastructuur.

---

## Contact

Voor compliance-vragen: **privacy@xshopper.com**

xShopper Pty Ltd, Australië
Australian Trademark No. 1749660 (Class 35)

*Versie compliancepagina: 2026-02-27*
`;
