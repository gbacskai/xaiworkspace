export const PRIVACY_PT_BR = `
## Quem Somos

xShopper Pty Ltd ("xShopper", "nós", "nos") opera o serviço xAI Workspace, acessível via xAI Workspace.
Controlador de dados: xShopper Pty Ltd, Austrália.
Contato: privacy@xshopper.com

---

## Quais Dados Pessoais Coletamos

Ao usar o xAI Workspace, coletamos:

- **Identificador de usuário do xAI Workspace** (chat_id) — seu ID único no xAI Workspace, usado para identificar sua conta em todo o serviço
- **Dados da conta Google** — se você fizer login com o Google, recebemos seu endereço de e-mail, nome de exibição e foto de perfil do Google via OAuth 2.0. Usamos esses dados exclusivamente para criar e identificar sua conta. Não acessamos seus contatos do Google, arquivos ou quaisquer outros dados de serviços do Google.
- **Endereço de e-mail** — se você se cadastrar, fizer login com o Google ou for convidado, armazenamos seu e-mail para gerenciar sua conta e enviar comunicações do serviço
- **Endereços IP** — os endereços IP da sua instância de servidor dedicada, usados para rotear suas mensagens
- **Dados de pagamento** — valores de assinatura, datas, ID de cliente Stripe e os 4 últimos dígitos do cartão de pagamento (os dados completos do cartão são mantidos pelo Stripe, não por nós)
- **Dados de uso de tokens** — consumo diário e mensal de tokens de IA
- **Conteúdo das conversas com IA** — as mensagens que você envia ao seu agente de IA
- **Preferência de idioma** — sua configuração de idioma no Telegram, detectada automaticamente para definir o idioma de comunicação do bot

---

## Anonimato

Não podemos fornecer acesso anônimo ou pseudônimo ao xAI Workspace. A plataforma provisiona infraestrutura de servidor dedicada e processa pagamentos de assinatura, o que requer identificação persistente. Isso é permitido pelo Australian Privacy Principle 2.2 (exceção de impraticabilidade).

---

## Por Que Processamos Seus Dados e a Base Legal

| Finalidade | Base legal |
|---|---|
| Fornecimento do serviço de agente de IA (configuração de conta, roteamento de mensagens, gerenciamento de assinatura) | GDPR Art. 6(1)(b) — execução de contrato; APP 3 — razoavelmente necessário para o serviço |
| Cobrança e processamento de pagamentos | GDPR Art. 6(1)(b) — execução de contrato; APP 3 — razoavelmente necessário |
| Monitoramento de uso e controle de orçamento | GDPR Art. 6(1)(b) — execução de contrato; APP 3 — razoavelmente necessário |
| Envio de notificações do serviço (alertas de uso, lembretes de renovação) | GDPR Art. 6(1)(b) — execução de contrato |
| Autenticação de sua identidade via Google OAuth | GDPR Art. 6(1)(b) — execução de contrato; APP 3 — razoavelmente necessário para o serviço |
| Envio de e-mails de convite em seu nome | GDPR Art. 6(1)(a) — consentimento (você inicia o comando /invite) |
| Monitoramento de segurança e prevenção de abusos | GDPR Art. 6(1)(f) — interesses legítimos |

---

## Com Quem Compartilhamos Seus Dados

Utilizamos os seguintes processadores terceiros para fornecer o serviço:

- **Google** (Estados Unidos) — provedor de identidade para o Login com Google (OAuth 2.0); recebemos seu e-mail, nome e foto de perfil para autenticar sua conta. O Google também pode processar o conteúdo das conversas se você selecionar um modelo Gemini.
- **Telegram** (Países Baixos / EAU) — entrega mensagens entre você e seu agente de IA
- **Anthropic** (Estados Unidos) — fornecedor principal de modelo de IA; processa o conteúdo de suas conversas para gerar respostas de IA
- **OpenAI** (Estados Unidos) — fornecedor opcional de modelo de IA; processa o conteúdo das conversas se você selecionar um modelo OpenAI
- **Groq** (Estados Unidos) — fornecedor opcional de modelo de IA; processa o conteúdo das conversas se você selecionar um modelo Groq
- **Mistral AI** (França) — fornecedor opcional de modelo de IA; processa o conteúdo das conversas se você selecionar um modelo Mistral
- **Stripe** (Estados Unidos) — gerencia todo o processamento de pagamentos
- **Neon** (Estados Unidos) — hospeda nosso banco de dados
- **Amazon Web Services** (Austrália e Estados Unidos) — hospeda infraestrutura em Sydney (ap-southeast-2) e N. Virgínia (us-east-1)

Não vendemos seus dados pessoais.

---

## Transferências Internacionais e Divulgação no Exterior

xShopper Pty Ltd é uma empresa australiana. Seus dados pessoais são transferidos para, e processados nos, seguintes países:

| País | Destinatários | Dados transferidos |
|---|---|---|
| **Austrália** | AWS (Sydney, ap-southeast-2) | Todos os dados — região de hospedagem principal |
| **Estados Unidos** | Google (OAuth, Gemini), Anthropic, OpenAI, Groq, AWS (us-east-1), Neon, Stripe | Dados da conta Google (login), conversas de IA, dados de conta, dados de pagamento |
| **França** | Mistral AI | Conversas de IA (se o modelo Mistral for selecionado) |
| **Países Baixos / EAU** | Telegram | Mensagens, identificadores de usuário |

**Para usuários australianos (Privacy Act 1988):** De acordo com o Australian Privacy Principle 8, a xShopper toma medidas razoáveis para garantir que os destinatários no exterior tratem suas informações pessoais em conformidade com os APPs. Ao usar este serviço e consentir no cadastro, você reconhece que seus dados serão transferidos para os países listados acima e que os Princípios de Privacidade Australianos podem não se aplicar a dados mantidos por destinatários no exterior. Você pode registrar uma reclamação no Office of the Australian Information Commissioner (OAIC) se acreditar que suas informações foram tratadas de forma inadequada.

**Para usuários da UE/EEE (GDPR):** As transferências para os Estados Unidos são cobertas por Cláusulas Contratuais Padrão e, quando disponível, pelo EU-US Data Privacy Framework. As transferências para a França (Mistral AI) não requerem salvaguardas adicionais (Estado membro da UE).

---

## Por Quanto Tempo Guardamos Seus Dados

- Dados da conta (incluindo dados do perfil Google): retidos enquanto sua conta estiver ativa e por 30 dias após o cancelamento
- Tokens OAuth do Google: armazenados de forma criptografada; excluídos imediatamente após a exclusão da conta ou quando você desconectar o Google
- Registros de pagamento: retidos por 7 anos conforme exigido pela legislação tributária australiana
- Conteúdo das conversas com IA: armazenado na sua instância de servidor dedicada; excluído quando sua instância for encerrada
- Logs de uso: retidos por 90 dias
- Registros de uso de API: retidos por 90 dias

---

## Informações Pessoais de Terceiros

Ao usar o xAI Workspace, você pode compartilhar informações pessoais sobre outras pessoas (como colegas, clientes ou contatos) em suas conversas com o agente de IA.

- xShopper Pty Ltd não coleta nem solicita ativamente informações pessoais sobre terceiros. Tais informações são fornecidas exclusivamente a seu critério.
- Você é responsável por garantir que possui autoridade, consentimento ou base legal adequados para compartilhar dados pessoais de terceiros com o serviço.
- Os dados de conversas que contenham informações pessoais de terceiros são processados exclusivamente para fornecer o serviço de agente de IA e não são utilizados para nenhuma outra finalidade.
- Dados pessoais de terceiros compartilhados em conversas estão sujeitos às mesmas políticas de retenção e exclusão que seus próprios dados (consulte "Por Quanto Tempo Guardamos Seus Dados" acima).
- Para solicitar a exclusão de conversas que contenham informações pessoais de terceiros, utilize o comando \`/workspace reset\` dentro do xAI Workspace, ou entre em contato conosco pelo e-mail privacy@xshopper.com.

---

## Seus Direitos

### Usuários Australianos (Privacy Act 1988)

Nos termos dos Australian Privacy Principles, você tem o direito de:

- **Acessar** suas informações pessoais (APP 12)
- **Corrigir** informações imprecisas ou desatualizadas (APP 13)
- **Solicitar a exclusão** de suas informações pessoais
- **Registrar uma reclamação** no Office of the Australian Information Commissioner (OAIC) — [oaic.gov.au](https://www.oaic.gov.au)

### Usuários da UE/EEE e do Reino Unido (GDPR)

Você tem os seguintes direitos sob o GDPR:

- **Direito de acesso** — solicitar uma cópia dos seus dados pessoais
- **Direito de retificação** — solicitar a correção de dados imprecisos
- **Direito ao apagamento** — solicitar a exclusão dos seus dados pessoais
- **Direito à restrição** — solicitar que limitemos como processamos seus dados
- **Direito à portabilidade de dados** — receber seus dados em formato estruturado e legível por máquina
- **Direito de oposição** — opor-se ao processamento baseado em interesses legítimos

Você também tem o direito de apresentar uma reclamação à autoridade supervisora local.

### Como Exercer Seus Direitos

Você pode exercer vários desses direitos diretamente no xAI Workspace:

- Envie \`/my_data\` para exportar seus dados pessoais
- Envie \`/delete_my_data\` para solicitar a exclusão de todos os seus dados
- Envie \`/email\` para atualizar seu endereço de e-mail

Para outras solicitações, entre em contato pelo e-mail privacy@xshopper.com. Responderemos em até 30 dias.

---

## Contato e Direitos de Correção

Para dúvidas sobre privacidade ou para exercer seus direitos, entre em contato:

**privacy@xshopper.com**
xShopper Pty Ltd, Austrália

**Direito de correção (APP 13):** Nos termos do Australian Privacy Principle 13, você tem o direito de solicitar a correção de dados pessoais que mantemos sobre você e que sejam imprecisos, desatualizados, incompletos, irrelevantes ou enganosos. Para solicitar uma correção, envie um e-mail para privacy@xshopper.com descrevendo as informações a serem corrigidas e as informações corretas. Responderemos em até 30 dias.

---

## Reclamações

- **Austrália:** Office of the Australian Information Commissioner (OAIC), [oaic.gov.au](https://www.oaic.gov.au), Telefone: 1300 363 992
- **UE/EEE:** Sua autoridade supervisora local

---

## Contato

Dúvidas sobre privacidade: privacy@xshopper.com
xShopper Pty Ltd, Austrália
Marca Registrada Australiana nº 1749660 (Classe 35)

*Versão da Política de Privacidade: 2026-02-28*
`;
