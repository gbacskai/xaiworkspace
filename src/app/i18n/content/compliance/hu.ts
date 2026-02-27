export const COMPLIANCE_HU = `
## Cégregisztráció

Az **xShopper Pty Ltd** egy bejegyzett ausztrál vállalat.

- **Ausztrál védjegy:** No. 1749660 (Class 35)
- **Működési név:** xAI Workspace
- **Joghatóság:** Ausztrália

---

## Adatvédelem

Az xAI Workspace megfelel az alábbi adatvédelmi keretrendszereknek:

- **General Data Protection Regulation (GDPR)** — az EU/EGT és az Egyesült Királyság felhasználói számára
- **Australian Privacy Act 1988** — beleértve az Australian Privacy Principles (APPs) elveket

Minden személyes adatkezeléshez jogalapot biztosítunk, és mechanizmusokat nyújtunk a felhasználóknak jogaik gyakorlásához mindkét keretrendszer szerint. A teljes részletek az [Adatvédelmi szabályzatunkban](/privacy) találhatók.

---

## Infrastruktúra-biztonság

Minden adat titkosítva van mind átvitel közben, mind nyugalmi állapotban:

- **Átvitel közben:** TLS 1.3 az ügyfelek, szerverek és harmadik féltől származó szolgáltatások közötti összes kapcsolathoz
- **Nyugalmi állapotban:** AES-256 titkosítás a tárolt adatokhoz
- **Elsődleges tárhely:** Amazon Web Services (AWS), Sydney régió (ap-southeast-2)
- **Másodlagos régió:** AWS N. Virginia (us-east-1) meghatározott szolgáltatásokhoz

Az infrastruktúrát a nap 24 órájában, a hét minden napján figyelik, automatikus riasztásokkal az anomáliák és lehetséges biztonsági események esetén.

---

## Fizetési megfelelőség

Minden fizetésfeldolgozást a **Stripe** végez, amely **PCI DSS Level 1 Service Provider** tanúsítvánnyal rendelkezik — ez a fizetésikártya-ipar legmagasabb szintű tanúsítása.

- Az xAI Workspace **nem** tárol, dolgoz fel vagy továbbít hitelkártyaszámokat
- A fizetésikártya-adatokat teljes egészében a Stripe PCI-kompatibilis infrastruktúrája kezeli
- Csak a Stripe ügyfél-azonosítót és a kártya utolsó 4 számjegyét őrizzük meg referenciaként

---

## AI-szolgáltatói adatkezelés

Amikor az xAI Workspace-t használja, a beszélgetés tartalma a kiválasztott AI-szolgáltatóhoz kerül. Minden szolgáltatónak saját adatkezelési kötelezettségvállalásai vannak:

| Szolgáltató | Régió | Adatmegőrzési szabályzat |
|---|---|---|
| **Anthropic** (Claude) | Egyesült Államok | Nem tanít API-bemenetekből; 30 napos megőrzés |
| **OpenAI** (GPT) | Egyesült Államok | Nem tanít API-bemenetekből; 30 napos megőrzés |
| **Google** (Gemini) | Egyesült Államok | Nem tanít API-bemenetekből |
| **Mistral AI** | Franciaország (EU) | Nem tanít API-bemenetekből |
| **Groq** (Llama, Mixtral) | Egyesült Államok | Nem tárolja a promptokat feldolgozás után |
| **Amazon Bedrock** | Ausztrália / US | Az adatok a kiválasztott AWS-régióban maradnak |

Minden szolgáltatóval kizárólag API-szintű hozzáférést használunk, ami egyetemesen kizárja az ügyféladatokon történő tanítást.

---

## Alfeldolgozók

A következő harmadik felek dolgoznak fel személyes adatokat a nevünkben:

| Alfeldolgozó | Cél | Helyszín |
|---|---|---|
| **Amazon Web Services** | Infrastruktúra-tárhely | Ausztrália (Sydney), US (N. Virginia) |
| **Stripe** | Fizetésfeldolgozás | Egyesült Államok |
| **Neon** | Adatbázis-tárhely | Egyesült Államok |
| **Telegram** | Üzenetkézbesítés | Hollandia / EAE |
| **Google** | OAuth identitásszolgáltató, AI (Gemini) | Egyesült Államok |
| **Anthropic** | AI-modell szolgáltató (Claude) | Egyesült Államok |
| **OpenAI** | AI-modell szolgáltató (GPT) | Egyesült Államok |
| **Mistral AI** | AI-modell szolgáltató | Franciaország |
| **Groq** | AI-modell szolgáltató | Egyesült Államok |

---

## Incidenskezelés

Az xShopper dokumentált incidenskezelési folyamatot tart fenn:

- **Észlelés:** Automatikus felügyelet és riasztás a teljes infrastruktúrában
- **Reagálás:** Az incidenseket 4 órán belül osztályozzák és kivizsgálják
- **Értesítés:** Az érintett felhasználókat a megerősített személyes adatsértés után 72 órán belül értesítik, a GDPR követelményeinek és az Australian Privacy Principle 11 ajánlásainak megfelelően
- **Helyreállítás:** Minden incidenshez dokumentálják a kiváltó ok elemzését és a javító intézkedéseket

---

## Adatrezidencia

- **Elsődleges adattárolás:** AWS Sydney (ap-southeast-2), Ausztrália
- **Adatbázis:** Neon, az Egyesült Államokban üzemeltetett
- **AI-feldolgozás:** Szolgáltatónként változik — lásd a fenti AI-szolgáltatói adatkezelés szakaszt
- **Fizetések:** A Stripe dolgozza fel az Egyesült Államokban

A szigorú ausztrál adatrezidenciát igénylő felhasználók számára az Amazon Bedrock modellek kiválasztása biztosítja, hogy az AI-feldolgozás az ausztrál AWS-infrastruktúrán belül történjen.

---

## Kapcsolat

Megfelelőségi kérdésekhez: **privacy@xshopper.com**

xShopper Pty Ltd, Ausztrália
Australian Trademark No. 1749660 (Class 35)

*Megfelelőségi oldal verzió: 2026-02-27*
`;
