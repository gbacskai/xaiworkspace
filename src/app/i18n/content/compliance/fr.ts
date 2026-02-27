export const COMPLIANCE_FR = `
## Enregistrement de la société

**xShopper Pty Ltd** est une société enregistrée en Australie.

- **Marque déposée en Australie :** No. 1749660 (Classe 35)
- **Nom commercial :** xAI Workspace
- **Juridiction :** Australie

---

## Protection des données

xAI Workspace est conforme aux cadres de protection des données suivants :

- **Règlement Général sur la Protection des Données (GDPR)** — pour les utilisateurs dans l'UE/EEE et au Royaume-Uni
- **Loi australienne sur la vie privée de 1988** — y compris les Principes australiens de protection de la vie privée (APPs)

Nous maintenons une base légale pour tout traitement de données personnelles et fournissons des mécanismes permettant aux utilisateurs d'exercer leurs droits dans le cadre des deux réglementations. Les détails complets sont disponibles dans notre [Politique de confidentialité](/privacy).

---

## Sécurité de l'infrastructure

Toutes les données sont chiffrées en transit et au repos :

- **En transit :** TLS 1.3 pour toutes les connexions entre les clients, les serveurs et les services tiers
- **Au repos :** Chiffrement AES-256 pour les données stockées
- **Hébergement principal :** Amazon Web Services (AWS), région de Sydney (ap-southeast-2)
- **Région secondaire :** AWS Virginie du Nord (us-east-1) pour des services spécifiques

L'infrastructure est surveillée 24h/24 et 7j/7 avec des alertes automatisées pour les anomalies et les événements de sécurité potentiels.

---

## Conformité des paiements

L'ensemble du traitement des paiements est assuré par **Stripe**, qui est certifié en tant que **Prestataire de services PCI DSS de niveau 1** — le plus haut niveau de certification dans l'industrie des cartes de paiement.

- xAI Workspace **ne** stocke, ne traite et ne transmet **pas** les numéros de cartes de crédit
- Les données des cartes de paiement sont entièrement gérées par l'infrastructure conforme PCI de Stripe
- Nous ne conservons que l'identifiant client Stripe et les 4 derniers chiffres de la carte à titre de référence

---

## Traitement des données par les fournisseurs d'IA

Lorsque vous utilisez xAI Workspace, le contenu de votre conversation est envoyé au fournisseur d'IA que vous sélectionnez. Chaque fournisseur a ses propres engagements en matière de traitement des données :

| Fournisseur | Région | Politique de conservation des données |
|---|---|---|
| **Anthropic** (Claude) | États-Unis | N'entraîne pas sur les entrées API ; conservation de 30 jours |
| **OpenAI** (GPT) | États-Unis | N'entraîne pas sur les entrées API ; conservation de 30 jours |
| **Google** (Gemini) | États-Unis | N'entraîne pas sur les entrées API |
| **Mistral AI** | France (UE) | N'entraîne pas sur les entrées API |
| **Groq** (Llama, Mixtral) | États-Unis | Ne stocke pas les requêtes après le traitement |
| **Amazon Bedrock** | Australie / États-Unis | Les données restent dans la région AWS sélectionnée |

Nous utilisons uniquement un accès de niveau API avec tous les fournisseurs, ce qui exclut universellement l'entraînement sur les données des clients.

---

## Sous-traitants

Les tiers suivants traitent des données personnelles pour notre compte :

| Sous-traitant | Finalité | Localisation |
|---|---|---|
| **Amazon Web Services** | Hébergement d'infrastructure | Australie (Sydney), États-Unis (Virginie du Nord) |
| **Stripe** | Traitement des paiements | États-Unis |
| **Neon** | Hébergement de base de données | États-Unis |
| **Telegram** | Distribution de messages | Pays-Bas / EAU |
| **Google** | Fournisseur d'identité OAuth, IA (Gemini) | États-Unis |
| **Anthropic** | Fournisseur de modèles d'IA (Claude) | États-Unis |
| **OpenAI** | Fournisseur de modèles d'IA (GPT) | États-Unis |
| **Mistral AI** | Fournisseur de modèles d'IA | France |
| **Groq** | Fournisseur de modèles d'IA | États-Unis |

---

## Réponse aux incidents

xShopper maintient un processus documenté de réponse aux incidents :

- **Détection :** Surveillance automatisée et alertes sur l'ensemble de l'infrastructure
- **Réponse :** Les incidents sont triés et examinés dans un délai de 4 heures
- **Notification :** Les utilisateurs concernés sont informés dans les 72 heures suivant la confirmation d'une violation de données personnelles, conformément aux exigences du GDPR et aux recommandations du Principe australien de protection de la vie privée 11
- **Remédiation :** L'analyse des causes profondes et les actions correctives sont documentées pour chaque incident

---

## Résidence des données

- **Stockage principal des données :** AWS Sydney (ap-southeast-2), Australie
- **Base de données :** Neon, hébergée aux États-Unis
- **Traitement IA :** Varie selon le fournisseur — voir la section Traitement des données par les fournisseurs d'IA ci-dessus
- **Paiements :** Traités par Stripe aux États-Unis

Pour les utilisateurs nécessitant une résidence stricte des données en Australie, la sélection des modèles Amazon Bedrock garantit que le traitement IA s'effectue au sein de l'infrastructure AWS australienne.

---

## Contact

Pour les demandes de conformité : **privacy@xshopper.com**

xShopper Pty Ltd, Australie
Marque déposée en Australie No. 1749660 (Classe 35)

*Version de la page de conformité : 2026-02-27*
`;
