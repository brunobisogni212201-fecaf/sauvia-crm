# Product Requirements Document (PRD) - Sauvia CRM & App

## 1. Visão Geral do Produto
**Nome do Produto:** Sauvia
**Propósito:** Um ecossistema completo para nutricionistas gerenciarem suas clínicas, pacientes, agendas e planos alimentares. Inclui também uma plataforma voltada para o paciente final, focada na aderência ao tratamento e na descoberta de novos profissionais na sua região.
**Problemas a resolver:**
1. Nutricionistas perdem tempo com gestão manual de agenda, planilhas e falta de comunicação automatizada.
2. Pacientes têm dificuldade em encontrar nutricionistas próximos e manter o engajamento na dieta.
**Público-Alvo:**
* **B2B:** Nutricionistas (Clínicos, Esportivos, Materno-Infantis) - *Usuários Pagantes*
* **B2C:** Pacientes - *Usuários Finais (Gratuitos)*

---

## 2. Escopo do Produto (Core Features)

### 2.1. Portal do Nutricionista (Web - Next.js)
* **Gestão de Pacientes (CRUD):** Anamnese, histórico de evolução, biometria.
* **Construtor de Plano Alimentar:** Montagem de dieta com cálculo automático de macros (banco TACO/IBGE).
* **Agenda Inteligente (Integração Google Calendar):**
  * Nutricionista sincroniza sua conta Google no Sauvia.
  * O Sauvia lê horários livres e insere novas consultas diretamente na agenda do profissional.
* **Automação de WhatsApp (Integração Oficial Meta API):**
  * Disparo automático de mensagens para confirmação de consulta.
  * Envio de link de acesso ao plano alimentar quando finalizado.
  * Mensagens de boas-vindas.
* **Assinatura e Pagamentos:** Checkout nativo para que o nutricionista pague a assinatura (Plano Starter/Pro) via API (Cartão/PIX).
* **Módulo de Calistenia:** Prescrição de treinos corporais com upload/inclusão de links de vídeos demonstrativos.

### 2.2. App / Portal do Paciente (Mobile & Web)
* **Descoberta (Integração Google Maps):**
  * Paciente abre o app e permite localização (ou digita CEP).
  * O sistema exibe um mapa com os nutricionistas do Sauvia mais próximos (buscando pela latitude/longitude gravada no perfil do profissional).
  * O paciente pode visualizar o perfil do nutricionista, os horários livres e realizar o agendamento diretamente no app.
* **Acompanhamento de Dieta:** Visualização interativa das refeições diárias.
* **Acompanhamento de Evolução:** Inserção de peso atual e visualização de gráficos.
* **Treino de Calistenia (Video Player):** Aba dedicada para treinos, onde o paciente pode assistir aos vídeos dos exercícios usando um player nativo e marcar o que já executou.

---

## 3. Arquitetura e Stack Tecnológica

* **Frontend Web:** Next.js 16 (App Router), TailwindCSS, Framer Motion, `@react-google-maps/api`.
* **Backend API:** Python FastAPI, SQLAlchemy (Async), Pydantic.
* **Mobile:** React Native com Expo SDK 55, `react-native-maps`.
* **Banco de Dados:** PostgreSQL (RDS AWS).
* **Cache/Fila:** Redis (ElastiCache AWS) - vital para gerir os webhooks do WhatsApp e rate limits do Google.
* **Autenticação:** AWS Cognito.
* **Pagamentos:** API nativa de pagamento (Stripe ou Asaas).
* **Player de Vídeo:** `expo-video` no Mobile e `react-player` no Web, consumindo arquivos de vídeo do AWS S3 ou links externos.

---

## 4. Integrações de Terceiros (Direto no Código)

### 4.1. Google Maps API
* **Geocoding API:** No cadastro do nutricionista, converte o endereço físico (Rua, Cidade, Estado) em coordenadas (Latitude e Longitude) e salva no banco.
* **Places / Maps JavaScript API:** Exibe o mapa no Frontend Web e Mobile para os pacientes.
* **Distance Matrix API:** Calcula a distância real e o tempo de deslocamento entre o paciente e o consultório do nutricionista.

### 4.2. Google Calendar API (Agenda)
* **Fluxo OAuth2:** Nutricionista acessa "Configurações > Integrações" e faz login com o Google. O FastAPI armazena o `refresh_token` de forma segura.
* **Two-Way Sync:**
  1. Paciente agenda no app -> FastAPI chama Google Calendar API -> Cria evento na agenda do nutricionista.
  2. Nutricionista bloqueia horário direto no Google Agenda -> FastAPI identifica o bloqueio e não exibe aquele horário no app do paciente.

### 4.3. WhatsApp Cloud API (Meta)
* **Sem n8n / Sem Evolute:** Uso direto da API oficial da Meta (graph.facebook.com).
* **Webhooks:** O FastAPI recebe os webhooks da Meta em `/api/v1/webhooks/whatsapp` para rastrear status de mensagem (entregue, lida).
* **Templates Pré-Aprovados:** Configuração de HSM (Highly Structured Messages) na Meta, por exemplo:
  * `ola_paciente`: "Olá {{1}}, sua consulta com {{2}} está confirmada para {{3}}."
  * `plano_disponivel`: "Olá {{1}}, seu plano alimentar já está disponível no app Sauvia! Acesse: {{2}}"

### 4.4. Gateway de Pagamento (Stripe/Asaas)
* **Checkout Transparente:** O Frontend consome a API do gateway para gerar o token de pagamento, PIX copia e cola ou Boleto diretamente na interface do CRM, sem redirecionamentos.
* **Webhooks:** FastAPI recebe callbacks do status de pagamento (`/api/v1/webhooks/payments`) e atualiza o status de assinatura do nutricionista para liberar ou bloquear o acesso.

### 4.5. Módulo de Vídeo e Hospedagem
* **Armazenamento:** Os vídeos curtos demonstrativos dos exercícios de calistenia serão hospedados no S3 (`sauvia-media-staging-us-east-1`), através de URLs pré-assinadas para proteção.
* **Player Otimizado:** Uso das bibliotecas de reprodução nativas do Expo e HTML5 para buffering eficiente, garantindo que o paciente não consuma a franquia de dados atoa.

---

## 5. Esquema de Banco de Dados (PostgreSQL / SQLAlchemy)

Abaixo estão os esquemas relacionais core necessários para suportar as funcionalidades mapeadas.

### 5.1. `nutritionists` (Profissionais)
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID (PK) | Identificador único |
| `cognito_sub` | String | ID do AWS Cognito |
| `name` | String | Nome completo |
| `email` | String | Email de contato |
| `phone` | String | Telefone/WhatsApp (com código país) |
| `crn` | String | Registro profissional |
| `address` | String | Endereço completo formatado |
| `latitude` | Float | Para busca via Google Maps |
| `longitude` | Float | Para busca via Google Maps |
| `google_refresh_token` | String | Token OAuth para Calendar API |
| `is_active` | Boolean | Se está aceitando pacientes no app |

### 5.2. `patients` (Pacientes)
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID (PK) | Identificador único |
| `cognito_sub` | String | ID do AWS Cognito (se usar o app) |
| `nutritionist_id` | UUID (FK) | Vínculo principal (se houver) |
| `name` | String | Nome completo |
| `email` | String | Email do paciente |
| `phone` | String | WhatsApp para disparo de API Meta |
| `birth_date` | Date | Data de nascimento |

### 5.3. `appointments` (Agenda/Consultas)
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID (PK) | Identificador da consulta |
| `nutritionist_id` | UUID (FK) | Profissional |
| `patient_id` | UUID (FK) | Paciente |
| `start_time` | Timestamp | Início da consulta |
| `end_time` | Timestamp | Fim da consulta |
| `status` | Enum | `scheduled`, `canceled`, `completed` |
| `google_event_id` | String | ID retornado pela Google Calendar API |
| `type` | Enum | `in_person`, `online` |

### 5.4. `diet_plans` (Planos Alimentares)
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID (PK) | Identificador do plano |
| `patient_id` | UUID (FK) | Dono do plano |
| `title` | String | Ex: "Plano Hipertrofia - Mês 1" |
| `status` | Enum | `draft`, `published` |
| `created_at` | Timestamp | Data de criação |

### 5.5. `meals` & `meal_items` (Refeições e Alimentos)
**Tabela: `meals`**
* `id` (UUID)
* `diet_plan_id` (UUID FK)
* `name` (String) - Ex: "Café da Manhã"
* `time` (Time) - Ex: "08:00"

**Tabela: `meal_items`**
* `id` (UUID)
* `meal_id` (UUID FK)
* `food_id` (Integer) - ID no banco do TACO/IBGE
* `quantity` (Float) - Ex: 100
* `unit` (String) - Ex: "gramas", "colheres"

### 5.6. `subscriptions` (Assinaturas dos Nutricionistas)
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID (PK) | Identificador único |
| `nutritionist_id` | UUID (FK) | Profissional que está pagando |
| `gateway_customer_id` | String | ID no provedor de pagamento (Ex: `cus_xxx`) |
| `plan_tier` | String | Ex: `starter`, `professional` |
| `status` | Enum | `active`, `past_due`, `canceled` |
| `expires_at` | Timestamp | Data de expiração do ciclo de cobrança atual |

### 5.7. `workouts` & `exercises` (Módulo Calistenia)
**Tabela: `workouts`**
* `id` (UUID PK), `patient_id` (UUID FK), `title` (String)

**Tabela: `exercises`**
* `id` (UUID PK), `workout_id` (UUID FK), `name` (String)
* `video_url` (String) - URL do AWS S3, `sets` (Integer), `reps` (String)

---

## 6. Fluxos de Interação (User Journeys)

### Fluxo 1: Descoberta e Agendamento (Paciente)
1. Paciente sem nutricionista abre o **App Sauvia** ou **Web**.
2. Permite o uso do GPS. O Frontend chama o FastAPI `/api/v1/nutritionists/nearby?lat=X&lng=Y`.
3. O FastAPI usa extensão *PostGIS* (ou lógica Haversine) para buscar nutricionistas em um raio de 15km.
4. O App exibe o mapa (via Google Maps API) com pinos dos profissionais.
5. Paciente escolhe um nutricionista, vê os horários disponíveis (trazidos via Google Calendar API sincronizada) e agenda.
6. O Backend salva em `appointments`, cria no Google Agenda do profissional e dispara webhook pro Meta WhatsApp.
7. O Paciente e o Nutricionista recebem notificação oficial no WhatsApp confirmando a consulta.

### Fluxo 2: Entrega de Dieta via WhatsApp
1. Nutricionista finaliza o plano alimentar na aba Web e clica em "Publicar".
2. O status em `diet_plans` muda de `draft` para `published`.
3. O FastAPI enfileira um Job (usando Celery ou Redis Queue).
4. O Job faz um POST request nativo para a API Cloud do Meta com o template HSM de entrega de dieta.
5. O paciente recebe no WhatsApp: "Olá, sua dieta está pronta. Acesse o app Sauvia".

### Fluxo 3: Pagamento de Assinatura (Nutricionista)
1. Nutricionista finaliza o trial e acessa "Minha Assinatura" no portal Web.
2. Escolhe pagar com PIX (via Asaas/Stripe).
3. O Frontend chama o FastAPI, que se comunica com o Gateway gerando o Payload e retorna o QR Code.
4. O Nutricionista escaneia e paga. Segundos depois, o Gateway bate no Webhook do FastAPI.
5. O FastAPI altera `subscriptions.status` para `active` e manda notificação de sucesso.

### Fluxo 4: Treino de Calistenia (Paciente)
1. Paciente abre o app e acessa a nova aba "Treinos".
2. Seleciona o primeiro exercício. O player de vídeo nativo abre em tela cheia carregando a demonstração em MP4 do S3.
3. Ao terminar, o paciente marca o exercício como concluído no app.

---

## 7. Requisitos Não Funcionais Críticos

* **Tratamento de Rate Limit (Google/Meta):**
  * O disparo de mensagens de WhatsApp e sincronização de agendas não pode bloquear a UI. Devem ser processadas assincronamente (Background Tasks no FastAPI).
* **Privacidade e LGPD:**
  * O número de telefone do paciente só deve receber mensagens WhatsApp se houver `consentimento` marcado no banco de dados.
  * A API de localização no mapa não deve vazar dados exatos do paciente, apenas o endereço comercial do nutricionista (que é dado público/profissional).
* **Banco de Dados Espacial:**
  * Configurar o PostgreSQL para habilitar e utilizar o módulo `PostGIS` ou funções geoespaciais básicas para busca de raios de distância (Latitude/Longitude).

---

## 8. Próximos Passos de Desenvolvimento

1. **Infraestrutura Cloud:**
   * Registrar App no Google Cloud Console (ativar Maps JavaScript API, Geocoding API e Calendar API). Obter credenciais OAuth 2.0.
   * Registrar App no Facebook Developers (Meta for Developers) para obter o Token Permanente da WhatsApp Cloud API e aprovar os templates de mensagem iniciais.
2. **Backend (FastAPI):**
   * Expandir os Models do SQLAlchemy para incluir os campos de Latitude, Longitude e tokens do Google.
   * Implementar o roteador de integração do WhatsApp (`/api/v1/whatsapp`).
3. **Frontend / Mobile:**
   * Integrar biblioteca `@react-google-maps/api` no frontend web e `react-native-maps` no Expo.
   * Criar a UI de agendamento (Slot Picker) consumindo a disponibilidade calculada.
