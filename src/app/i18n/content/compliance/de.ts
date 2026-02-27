export const COMPLIANCE_DE = `
## Unternehmensregistrierung

**xShopper Pty Ltd** ist ein in Australien eingetragenes Unternehmen.

- **Australische Marke:** No. 1749660 (Klasse 35)
- **Betriebsname:** xAI Workspace
- **Gerichtsbarkeit:** Australien

---

## Datenschutz

xAI Workspace erfüllt die folgenden Datenschutzrahmenwerke:

- **Datenschutz-Grundverordnung (GDPR)** — für Nutzer in der EU/dem EWR und dem Vereinigten Königreich
- **Australisches Datenschutzgesetz von 1988** — einschließlich der Australischen Datenschutzgrundsätze (APPs)

Wir unterhalten eine Rechtsgrundlage für die gesamte Verarbeitung personenbezogener Daten und stellen Mechanismen bereit, mit denen Nutzer ihre Rechte unter beiden Rahmenwerken ausüben können. Vollständige Details sind in unserer [Datenschutzrichtlinie](/privacy) verfügbar.

---

## Infrastruktursicherheit

Alle Daten werden sowohl bei der Übertragung als auch im Ruhezustand verschlüsselt:

- **Bei der Übertragung:** TLS 1.3 für alle Verbindungen zwischen Clients, Servern und Drittanbieterdiensten
- **Im Ruhezustand:** AES-256-Verschlüsselung für gespeicherte Daten
- **Primäres Hosting:** Amazon Web Services (AWS), Region Sydney (ap-southeast-2)
- **Sekundäre Region:** AWS Nord-Virginia (us-east-1) für bestimmte Dienste

Die Infrastruktur wird rund um die Uhr überwacht, mit automatischen Warnmeldungen bei Anomalien und potenziellen Sicherheitsereignissen.

---

## Zahlungskonformität

Die gesamte Zahlungsabwicklung erfolgt durch **Stripe**, das als **PCI DSS Level 1 Service Provider** zertifiziert ist — die höchste Zertifizierungsstufe in der Zahlungskartenbranche.

- xAI Workspace speichert, verarbeitet oder überträgt **keine** Kreditkartennummern
- Zahlungskartendaten werden vollständig von der PCI-konformen Infrastruktur von Stripe verarbeitet
- Wir speichern lediglich die Stripe-Kunden-ID und die letzten 4 Ziffern der Karte als Referenz

---

## Datenverarbeitung durch KI-Anbieter

Wenn Sie xAI Workspace nutzen, wird Ihr Gesprächsinhalt an den von Ihnen ausgewählten KI-Anbieter gesendet. Jeder Anbieter hat eigene Verpflichtungen zur Datenverarbeitung:

| Anbieter | Region | Datenaufbewahrungsrichtlinie |
|---|---|---|
| **Anthropic** (Claude) | Vereinigte Staaten | Trainiert nicht mit API-Eingaben; 30-tägige Aufbewahrung |
| **OpenAI** (GPT) | Vereinigte Staaten | Trainiert nicht mit API-Eingaben; 30-tägige Aufbewahrung |
| **Google** (Gemini) | Vereinigte Staaten | Trainiert nicht mit API-Eingaben |
| **Mistral AI** | Frankreich (EU) | Trainiert nicht mit API-Eingaben |
| **Groq** (Llama, Mixtral) | Vereinigte Staaten | Speichert Prompts nach der Verarbeitung nicht |
| **Amazon Bedrock** | Australien / USA | Daten verbleiben in der ausgewählten AWS-Region |

Wir nutzen bei allen Anbietern ausschließlich API-Zugang, der universell das Training mit Kundendaten ausschließt.

---

## Unterauftragsverarbeiter

Die folgenden Drittanbieter verarbeiten personenbezogene Daten in unserem Auftrag:

| Unterauftragsverarbeiter | Zweck | Standort |
|---|---|---|
| **Amazon Web Services** | Infrastruktur-Hosting | Australien (Sydney), USA (Nord-Virginia) |
| **Stripe** | Zahlungsabwicklung | Vereinigte Staaten |
| **Neon** | Datenbank-Hosting | Vereinigte Staaten |
| **Telegram** | Nachrichtenzustellung | Niederlande / VAE |
| **Google** | OAuth-Identitätsanbieter, KI (Gemini) | Vereinigte Staaten |
| **Anthropic** | KI-Modellanbieter (Claude) | Vereinigte Staaten |
| **OpenAI** | KI-Modellanbieter (GPT) | Vereinigte Staaten |
| **Mistral AI** | KI-Modellanbieter | Frankreich |
| **Groq** | KI-Modellanbieter | Vereinigte Staaten |

---

## Reaktion auf Vorfälle

xShopper unterhält einen dokumentierten Prozess zur Reaktion auf Vorfälle:

- **Erkennung:** Automatisierte Überwachung und Warnmeldungen über die gesamte Infrastruktur
- **Reaktion:** Vorfälle werden innerhalb von 4 Stunden klassifiziert und untersucht
- **Benachrichtigung:** Betroffene Nutzer werden innerhalb von 72 Stunden nach Bestätigung einer Verletzung des Schutzes personenbezogener Daten benachrichtigt, wie von der GDPR vorgeschrieben und unter dem Australischen Datenschutzgrundsatz 11 empfohlen
- **Behebung:** Ursachenanalyse und Korrekturmaßnahmen werden für jeden Vorfall dokumentiert

---

## Datenspeicherort

- **Primärer Datenspeicher:** AWS Sydney (ap-southeast-2), Australien
- **Datenbank:** Neon, gehostet in den Vereinigten Staaten
- **KI-Verarbeitung:** Variiert je nach Anbieter — siehe den Abschnitt Datenverarbeitung durch KI-Anbieter oben
- **Zahlungen:** Verarbeitet von Stripe in den Vereinigten Staaten

Für Nutzer, die eine strikte Datenspeicherung in Australien benötigen, stellt die Auswahl von Amazon Bedrock-Modellen sicher, dass die KI-Verarbeitung innerhalb der australischen AWS-Infrastruktur erfolgt.

---

## Kontakt

Für Compliance-Anfragen: **privacy@xshopper.com**

xShopper Pty Ltd, Australien
Australische Marke No. 1749660 (Klasse 35)

*Version der Compliance-Seite: 2026-02-27*
`;
