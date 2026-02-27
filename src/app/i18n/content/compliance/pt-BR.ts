export const COMPLIANCE_PT_BR = `
## Registro da empresa

**xShopper Pty Ltd** é uma empresa registrada na Austrália.

- **Marca registrada na Austrália:** No. 1749660 (Classe 35)
- **Nome comercial:** xAI Workspace
- **Jurisdição:** Austrália

---

## Proteção de dados

O xAI Workspace está em conformidade com os seguintes frameworks de proteção de dados:

- **Regulamento Geral sobre a Proteção de Dados (GDPR)** — para usuários na UE/EEE e no Reino Unido
- **Lei de Privacidade da Austrália de 1988** — incluindo os Princípios de Privacidade Australianos (APPs)

Mantemos uma base legal para todo o processamento de dados pessoais e fornecemos mecanismos para que os usuários exerçam seus direitos sob ambos os frameworks. Os detalhes completos estão disponíveis em nossa [Política de Privacidade](/privacy).

---

## Segurança da infraestrutura

Todos os dados são criptografados tanto em trânsito quanto em repouso:

- **Em trânsito:** TLS 1.3 para todas as conexões entre clientes, servidores e serviços de terceiros
- **Em repouso:** Criptografia AES-256 para dados armazenados
- **Hospedagem principal:** Amazon Web Services (AWS), região de Sydney (ap-southeast-2)
- **Região secundária:** AWS Norte da Virgínia (us-east-1) para serviços específicos

A infraestrutura é monitorada 24 horas por dia, 7 dias por semana, com alertas automatizados para anomalias e possíveis eventos de segurança.

---

## Conformidade de pagamentos

Todo o processamento de pagamentos é realizado pelo **Stripe**, que é certificado como **Provedor de Serviços PCI DSS Nível 1** — o mais alto nível de certificação na indústria de cartões de pagamento.

- O xAI Workspace **não** armazena, processa ou transmite números de cartão de crédito
- Os dados de cartões de pagamento são tratados inteiramente pela infraestrutura compatível com PCI do Stripe
- Retemos apenas o ID do cliente Stripe e os últimos 4 dígitos do cartão para referência

---

## Tratamento de dados por provedores de IA

Quando você usa o xAI Workspace, o conteúdo da sua conversa é enviado ao provedor de IA que você selecionar. Cada provedor tem seus próprios compromissos de tratamento de dados:

| Provedor | Região | Política de retenção de dados |
|---|---|---|
| **Anthropic** (Claude) | Estados Unidos | Não treina com entradas de API; retenção de 30 dias |
| **OpenAI** (GPT) | Estados Unidos | Não treina com entradas de API; retenção de 30 dias |
| **Google** (Gemini) | Estados Unidos | Não treina com entradas de API |
| **Mistral AI** | França (UE) | Não treina com entradas de API |
| **Groq** (Llama, Mixtral) | Estados Unidos | Não armazena prompts após o processamento |
| **Amazon Bedrock** | Austrália / EUA | Os dados permanecem na região AWS selecionada |

Utilizamos apenas acesso de nível API com todos os provedores, o que universalmente exclui o treinamento com dados de clientes.

---

## Subprocessadores

Os seguintes terceiros processam dados pessoais em nosso nome:

| Subprocessador | Finalidade | Localização |
|---|---|---|
| **Amazon Web Services** | Hospedagem de infraestrutura | Austrália (Sydney), EUA (Norte da Virgínia) |
| **Stripe** | Processamento de pagamentos | Estados Unidos |
| **Neon** | Hospedagem de banco de dados | Estados Unidos |
| **Telegram** | Entrega de mensagens | Países Baixos / EAU |
| **Google** | Provedor de identidade OAuth, IA (Gemini) | Estados Unidos |
| **Anthropic** | Provedor de modelos de IA (Claude) | Estados Unidos |
| **OpenAI** | Provedor de modelos de IA (GPT) | Estados Unidos |
| **Mistral AI** | Provedor de modelos de IA | França |
| **Groq** | Provedor de modelos de IA | Estados Unidos |

---

## Resposta a incidentes

A xShopper mantém um processo documentado de resposta a incidentes:

- **Detecção:** Monitoramento automatizado e alertas em toda a infraestrutura
- **Resposta:** Os incidentes são triados e investigados em até 4 horas
- **Notificação:** Os usuários afetados são notificados dentro de 72 horas após a confirmação de uma violação de dados pessoais, conforme exigido pelo GDPR e recomendado pelo Princípio de Privacidade Australiano 11
- **Remediação:** Análise de causa raiz e ações corretivas são documentadas para cada incidente

---

## Residência de dados

- **Armazenamento principal de dados:** AWS Sydney (ap-southeast-2), Austrália
- **Banco de dados:** Neon, hospedado nos Estados Unidos
- **Processamento de IA:** Varia por provedor — consulte a seção de Tratamento de dados por provedores de IA acima
- **Pagamentos:** Processados pelo Stripe nos Estados Unidos

Para usuários que exigem residência estrita de dados na Austrália, selecionar os modelos Amazon Bedrock garante que o processamento de IA ocorra dentro da infraestrutura AWS na Austrália.

---

## Contato

Para consultas de conformidade: **privacy@xshopper.com**

xShopper Pty Ltd, Austrália
Marca registrada na Austrália No. 1749660 (Classe 35)

*Versão da página de conformidade: 2026-02-27*
`;
