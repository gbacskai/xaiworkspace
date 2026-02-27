export const PRIVACY_NL = `
## Wie wij zijn

xShopper Pty Ltd ("xShopper", "wij", "ons") exploiteert de xAI Workspace-dienst, toegankelijk via xAI Workspace.
Verwerkingsverantwoordelijke: xShopper Pty Ltd, Australië.
Contact: privacy@xshopper.com

---

## Welke persoonsgegevens wij verzamelen

Wanneer je xAI Workspace gebruikt, verzamelen wij:

- **xAI Workspace-gebruikersidentificatie** (chat_id) — je unieke xAI Workspace-ID, gebruikt om je account te identificeren in de gehele dienst
- **Google-accountgegevens** — als je inlogt met Google, ontvangen wij je e-mailadres, weergavenaam en profielfoto van Google via OAuth 2.0. Wij gebruiken deze gegevens uitsluitend om je account aan te maken en te identificeren. Wij hebben geen toegang tot je Google-contacten, bestanden of andere Google-servicegegevens.
- **E-mailadres** — als je je registreert, inlogt met Google of wordt uitgenodigd, slaan wij je e-mail op om je account te beheren en servicecommunicatie te verzenden
- **IP-adressen** — de IP-adressen van je dedicated serverinstantie, gebruikt om je berichten te routeren
- **Betalingsgegevens** — abonnementsbedragen, data, Stripe-klant-ID en de laatste 4 cijfers van je betaalkaart (betaalkaartgegevens worden bewaard door Stripe, niet door ons)
- **Tokenverbruiksgegevens** — dagelijks en maandelijks AI-tokenverbruik
- **AI-gespreksinhoud** — de berichten die je naar je AI-agent stuurt
- **Taalvoorkeur** — je Telegram-taalinstelling, automatisch gedetecteerd om de communicatietaal van de bot in te stellen

---

## Anonimiteit

Wij kunnen geen anonieme of pseudonieme toegang tot xAI Workspace bieden. Het platform voorziet in dedicated serverinfrastructuur en verwerkt abonnementsbetalingen, waarvoor persistente identificatie vereist is. Dit is toegestaan op grond van Australian Privacy Principle 2.2 (uitzondering onuitvoerbaarheid).

---

## Waarom wij je gegevens verwerken en de rechtsgrondslag

| Doel | Rechtsgrondslag |
|---|---|
| Het leveren van de AI-agentdienst (accountinrichting, berichten routeren, je abonnement beheren) | AVG Art. 6(1)(b) — uitvoering van een overeenkomst; APP 3 — redelijkerwijs noodzakelijk voor de dienst |
| Facturering en betalingsverwerking | AVG Art. 6(1)(b) — uitvoering van een overeenkomst; APP 3 — redelijkerwijs noodzakelijk |
| Verbruiksmonitoring en budgethandhaving | AVG Art. 6(1)(b) — uitvoering van een overeenkomst; APP 3 — redelijkerwijs noodzakelijk |
| Verzenden van servicemeldingen (verbruikswaarschuwingen, verlengingsherinneringen) | AVG Art. 6(1)(b) — uitvoering van een overeenkomst |
| Verificatie van je identiteit via Google OAuth | AVG Art. 6(1)(b) — uitvoering van een overeenkomst; APP 3 — redelijkerwijs noodzakelijk voor de dienst |
| Verzenden van uitnodigings-e-mails namens jou | AVG Art. 6(1)(a) — toestemming (jij initieert het /invite-commando) |
| Beveiligingsmonitoring en misbruikpreventie | AVG Art. 6(1)(f) — gerechtvaardigde belangen |

---

## Met wie wij je gegevens delen

Wij gebruiken de volgende externe verwerkers om de dienst te leveren:

- **Google** (Verenigde Staten) — identiteitsprovider voor Google Aanmelden (OAuth 2.0); wij ontvangen je e-mailadres, naam en profielfoto om je account te verifiëren. Google kan ook gespreksinhoud verwerken als je een Gemini-model selecteert.
- **Telegram** (Nederland / VAE) — bezorgt berichten tussen jou en je AI-agent
- **Anthropic** (Verenigde Staten) — primaire AI-modelprovider; verwerkt je gespreksinhoud om AI-antwoorden te genereren
- **OpenAI** (Verenigde Staten) — optionele AI-modelprovider; verwerkt gespreksinhoud als je een OpenAI-model selecteert
- **Groq** (Verenigde Staten) — optionele AI-modelprovider; verwerkt gespreksinhoud als je een Groq-model selecteert
- **Mistral AI** (Frankrijk) — optionele AI-modelprovider; verwerkt gespreksinhoud als je een Mistral-model selecteert
- **Stripe** (Verenigde Staten) — verwerkt alle betalingen
- **Neon** (Verenigde Staten) — host onze database
- **Amazon Web Services** (Australië en Verenigde Staten) — host infrastructuur in Sydney (ap-southeast-2) en N. Virginia (us-east-1)

Wij verkopen je persoonsgegevens niet.

---

## Internationale overdrachten en openbaarmaking in het buitenland

xShopper Pty Ltd is een Australisch bedrijf. Je persoonsgegevens worden overgedragen aan en verwerkt in de volgende landen:

| Land | Ontvangers | Overgedragen gegevens |
|---|---|---|
| **Australië** | AWS (Sydney, ap-southeast-2) | Alle gegevens — primaire hostingregio |
| **Verenigde Staten** | Google (OAuth, Gemini), Anthropic, OpenAI, Groq, AWS (us-east-1), Neon, Stripe | Google-accountgegevens (aanmelding), AI-gesprekken, accountgegevens, betalingsgegevens |
| **Frankrijk** | Mistral AI | AI-gesprekken (als Mistral-model geselecteerd) |
| **Nederland / VAE** | Telegram | Berichten, gebruikersidentificatoren |

**Voor Australische gebruikers (Privacy Act 1988):** Op grond van Australian Privacy Principle 8 neemt xShopper redelijke stappen om te waarborgen dat ontvangers in het buitenland je persoonlijke informatie behandelen in overeenstemming met de APPs. Door gebruik te maken van deze dienst en bij aanmelding in te stemmen, erken je dat je gegevens worden overgedragen aan de hierboven genoemde landen en dat de Australische privacybeginselen mogelijk niet van toepassing zijn op gegevens die worden bewaard door ontvangers in het buitenland. Je kunt een klacht indienen bij het Office of the Australian Information Commissioner (OAIC) als je van mening bent dat je informatie onjuist is behandeld.

**Voor EU/EER-gebruikers (AVG):** Overdrachten naar de Verenigde Staten worden gedekt door Standaard Contractbepalingen en, waar beschikbaar, het EU-VS Gegevensprivacykader. Overdrachten naar Frankrijk (Mistral AI) vereisen geen aanvullende waarborgen (EU-lidstaat).

---

## Hoe lang wij je gegevens bewaren

- Accountgegevens (inclusief Google-profielgegevens): bewaard zolang je account actief is en tot 30 dagen na opzegging
- Google OAuth-tokens: versleuteld opgeslagen; onmiddellijk verwijderd bij accountverwijdering of wanneer je Google loskoppelt
- Betalingsrecords: bewaard gedurende 7 jaar zoals vereist door de Australische belastingwetgeving
- AI-gespreksinhoud: opgeslagen op je dedicated serverinstantie; verwijderd wanneer je instantie wordt beëindigd
- Gebruikslogs: bewaard gedurende 90 dagen
- API-gebruiksrecords: bewaard gedurende 90 dagen

---

## Persoonsgegevens van derden

Bij het gebruik van xAI Workspace kun je in je gesprekken met de AI-agent persoonlijke informatie over andere personen (zoals collega's, klanten of contacten) delen.

- xShopper Pty Ltd verzamelt of vraagt niet actief om persoonlijke informatie over derden. Dergelijke informatie wordt uitsluitend naar eigen goeddunken verstrekt.
- Jij bent verantwoordelijk voor het waarborgen dat je de juiste bevoegdheid, toestemming of rechtsgrondslag hebt om persoonsgegevens van derden met de dienst te delen.
- Gespreksgegevens die persoonlijke informatie van derden bevatten, worden uitsluitend verwerkt om de AI-agentdienst te leveren en worden niet voor andere doeleinden gebruikt.
- Persoonsgegevens van derden die in gesprekken worden gedeeld, zijn onderworpen aan dezelfde bewaar- en verwijderingsbeleid als je eigen gegevens (zie "Hoe lang wij je gegevens bewaren" hierboven).
- Om verwijdering te verzoeken van gesprekken die persoonlijke informatie van derden bevatten, gebruik je het commando \`/workspace reset\` in xAI Workspace, of neem je contact met ons op via privacy@xshopper.com.

---

## Je rechten

### Australische gebruikers (Privacy Act 1988)

Op grond van de Australian Privacy Principles heb je het recht om:

- **Toegang** te krijgen tot je persoonlijke informatie (APP 12)
- **Onjuiste of verouderde informatie te corrigeren** (APP 13)
- **Verwijdering** van je persoonlijke informatie te verzoeken
- Een **klacht in te dienen** bij het Office of the Australian Information Commissioner (OAIC) — [oaic.gov.au](https://www.oaic.gov.au)

### EU/EER- en VK-gebruikers (AVG)

Je hebt de volgende rechten onder de AVG:

- **Recht op inzage** — vraag een kopie van je persoonsgegevens op
- **Recht op rectificatie** — vraag correctie van onjuiste gegevens
- **Recht op wissing** — vraag verwijdering van je persoonsgegevens
- **Recht op beperking** — vraag dat wij de verwerking van je gegevens beperken
- **Recht op gegevensoverdraagbaarheid** — ontvang je gegevens in een gestructureerd, machineleesbaar formaat
- **Recht van bezwaar** — maak bezwaar tegen verwerking op basis van gerechtvaardigde belangen

Je hebt ook het recht om een klacht in te dienen bij je lokale toezichthoudende autoriteit.

### Hoe je je rechten uitoefent

Je kunt meerdere van deze rechten rechtstreeks in xAI Workspace uitoefenen:

- Stuur \`/my_data\` om je persoonsgegevens te exporteren
- Stuur \`/delete_my_data\` om verwijdering van al je gegevens aan te vragen
- Stuur \`/email\` om je e-mailadres bij te werken

Voor overige verzoeken kun je contact met ons opnemen via privacy@xshopper.com. Wij reageren binnen 30 dagen.

---

## Contact en rectificatierechten

Voor privacyvragen of het uitoefenen van je rechten kun je contact met ons opnemen via:

**privacy@xshopper.com**
xShopper Pty Ltd, Australië

**Recht op rectificatie (APP 13):** Op grond van Australian Privacy Principle 13 heb je het recht te verzoeken om correctie van persoonsgegevens die wij over jou bewaren en die onjuist, verouderd, onvolledig, irrelevant of misleidend zijn. Om een correctie te verzoeken, stuur een e-mail naar privacy@xshopper.com met een beschrijving van de te corrigeren informatie en de juiste informatie. Wij reageren binnen 30 dagen.

---

## Klachten

- **Australië:** Office of the Australian Information Commissioner (OAIC), [oaic.gov.au](https://www.oaic.gov.au), Telefoon: 1300 363 992
- **EU/EER:** Jouw lokale toezichthoudende autoriteit

---

## Contact

Privacyvragen: privacy@xshopper.com
xShopper Pty Ltd, Australië
Australian Trademark No. 1749660 (Class 35)

*Versie privacybeleid: 2026-02-28*
`;
