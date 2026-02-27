export const COMPLIANCE_ES = `
## Registro de la empresa

**xShopper Pty Ltd** es una empresa registrada en Australia.

- **Marca registrada en Australia:** No. 1749660 (Clase 35)
- **Nombre comercial:** xAI Workspace
- **Jurisdicción:** Australia

---

## Protección de datos

xAI Workspace cumple con los siguientes marcos de protección de datos:

- **Reglamento General de Protección de Datos (GDPR)** — para usuarios en la UE/EEE y el Reino Unido
- **Ley de Privacidad de Australia de 1988** — incluidos los Principios de Privacidad Australianos (APPs)

Mantenemos una base legal para todo el procesamiento de datos personales y proporcionamos mecanismos para que los usuarios ejerzan sus derechos bajo ambos marcos. Los detalles completos están disponibles en nuestra [Política de Privacidad](/privacy).

---

## Seguridad de la infraestructura

Todos los datos se cifran tanto en tránsito como en reposo:

- **En tránsito:** TLS 1.3 para todas las conexiones entre clientes, servidores y servicios de terceros
- **En reposo:** Cifrado AES-256 para los datos almacenados
- **Alojamiento principal:** Amazon Web Services (AWS), región de Sídney (ap-southeast-2)
- **Región secundaria:** AWS Norte de Virginia (us-east-1) para servicios específicos

La infraestructura se monitorea las 24 horas del día, los 7 días de la semana, con alertas automatizadas para anomalías y posibles eventos de seguridad.

---

## Cumplimiento de pagos

Todo el procesamiento de pagos es gestionado por **Stripe**, que está certificado como **Proveedor de Servicios PCI DSS Nivel 1** — el nivel más alto de certificación en la industria de tarjetas de pago.

- xAI Workspace **no** almacena, procesa ni transmite números de tarjetas de crédito
- Los datos de las tarjetas de pago son gestionados en su totalidad por la infraestructura compatible con PCI de Stripe
- Solo conservamos el ID de cliente de Stripe y los últimos 4 dígitos de la tarjeta como referencia

---

## Manejo de datos por proveedores de IA

Cuando utiliza xAI Workspace, el contenido de su conversación se envía al proveedor de IA que seleccione. Cada proveedor tiene sus propios compromisos de manejo de datos:

| Proveedor | Región | Política de retención de datos |
|---|---|---|
| **Anthropic** (Claude) | Estados Unidos | No entrena con las entradas de API; retención de 30 días |
| **OpenAI** (GPT) | Estados Unidos | No entrena con las entradas de API; retención de 30 días |
| **Google** (Gemini) | Estados Unidos | No entrena con las entradas de API |
| **Mistral AI** | Francia (UE) | No entrena con las entradas de API |
| **Groq** (Llama, Mixtral) | Estados Unidos | No almacena las consultas después del procesamiento |
| **Amazon Bedrock** | Australia / EE. UU. | Los datos permanecen dentro de la región de AWS seleccionada |

Utilizamos únicamente acceso de nivel API con todos los proveedores, lo que excluye universalmente el entrenamiento con datos de clientes.

---

## Subprocesadores

Los siguientes terceros procesan datos personales en nuestro nombre:

| Subprocesador | Propósito | Ubicación |
|---|---|---|
| **Amazon Web Services** | Alojamiento de infraestructura | Australia (Sídney), EE. UU. (Norte de Virginia) |
| **Stripe** | Procesamiento de pagos | Estados Unidos |
| **Neon** | Alojamiento de base de datos | Estados Unidos |
| **Telegram** | Entrega de mensajes | Países Bajos / EAU |
| **Google** | Proveedor de identidad OAuth, IA (Gemini) | Estados Unidos |
| **Anthropic** | Proveedor de modelos de IA (Claude) | Estados Unidos |
| **OpenAI** | Proveedor de modelos de IA (GPT) | Estados Unidos |
| **Mistral AI** | Proveedor de modelos de IA | Francia |
| **Groq** | Proveedor de modelos de IA | Estados Unidos |

---

## Respuesta ante incidentes

xShopper mantiene un proceso documentado de respuesta ante incidentes:

- **Detección:** Monitoreo y alertas automatizadas en toda la infraestructura
- **Respuesta:** Los incidentes se clasifican e investigan en un plazo de 4 horas
- **Notificación:** Los usuarios afectados son notificados dentro de las 72 horas posteriores a la confirmación de una violación de datos personales, según lo requiere el GDPR y lo recomienda el Principio de Privacidad Australiano 11
- **Remediación:** El análisis de causa raíz y las acciones correctivas se documentan para cada incidente

---

## Residencia de datos

- **Almacenamiento principal de datos:** AWS Sídney (ap-southeast-2), Australia
- **Base de datos:** Neon, alojada en Estados Unidos
- **Procesamiento de IA:** Varía según el proveedor — consulte la sección de Manejo de datos por proveedores de IA más arriba
- **Pagos:** Procesados por Stripe en Estados Unidos

Para los usuarios que requieren una estricta residencia de datos en Australia, seleccionar los modelos de Amazon Bedrock garantiza que el procesamiento de IA se realice dentro de la infraestructura de AWS en Australia.

---

## Contacto

Para consultas de cumplimiento: **privacy@xshopper.com**

xShopper Pty Ltd, Australia
Marca registrada en Australia No. 1749660 (Clase 35)

*Versión de la página de cumplimiento: 2026-02-27*
`;
