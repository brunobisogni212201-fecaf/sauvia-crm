# Sauvia CRM - Documentação Técnica Completa

## 1. Visão Geral do Projeto

**Sauvia** é um CRM completo para nutricionistas com:
- Frontend: Next.js 16 (App Router)
- Backend: FastAPI (Python) - NOVO!
- Database: PostgreSQL (RDS São Paulo)
- Cache: Redis
- Automação: n8n
- WhatsApp: Evolute API
- Auth: AWS Cognito + JWT
- LGPD: Completo (audit, consent, export, data residency)

---

## 2. Stack Tecnológico

### Frontend (Next.js 16)
- Next.js 16.2.2 - App Router
- TypeScript 5
- Tailwind CSS 4
- Framer Motion (animações)
- Chart.js (gráficos)
- Lucide React (ícones)

### Backend (FastAPI) - NOVO!
- FastAPI (Python 3.11)
- SQLAlchemy + asyncpg
- Pydantic (DTOs/validação)
- JWT + AWS Cognito
- Redis para cache/sessions

### Infraestrutura AWS
- EC2 (t3.small) - Docker containers
- RDS PostgreSQL (São Paulo)
- ElastiCache Redis (opcional)
- Route53 (DNS)
- Cognito (Auth)
- SES (Email)

---

## 3. Estrutura de Diretórios

```
sauvia-crm/
├── frontend/                    # Next.js (existente)
│   ├── src/
│   │   ├── app/               # App Router pages
│   │   ├── components/        # UI components
│   │   └── lib/              # Utils
│   └── Dockerfile
│
├── backend/                    # FastAPI - NOVO!
│   ├── app/
│   │   ├── main.py           # Entry point
│   │   ├── config.py         # Settings
│   │   ├── deps.py           # Dependencies
│   │   ├── api/v1/           # Routers
│   │   ├── models/           # SQLAlchemy
│   │   ├── schemas/          # Pydantic DTOs
│   │   ├── services/         # Business logic
│   │   └── core/            # Security, exceptions
│   ├── alembic/             # Migrations
│   ├── tests/
│   └── Dockerfile
│
├── docker/                    # Docker Compose
│   ├── docker-compose.yml
│   └── traefik/
│
├── n8n-workflows/           # JSON workflows
└── CLAUDE.md                # Este arquivo
```

---

## 4. Configuração de Domínio - GoDaddy → AWS

### Objetivo
Apontar `sauvia.com.br` (GoDaddy) → AWS (EC2) sem perder apontamentos existentes (email, etc).

### Opção Recomendada: Migration Total (Route53 como DNS)

#### Passo 1: Exportar registros do GoDaddy
1. Acesse GoDaddy → Meus Produtos → Domínios
2. Selecione `sauvia.com.br` → Configurações de DNS
3. **Anote todos os registros existentes**:
   - A records (CNAME, etc)
   - MX records (email)
   - TXT records (SPF, DKIM, etc)
   - CNAMEs

#### Passo 2: Criar Hosted Zone no Route53
1. Acesse AWS Console → Route53 → Hosted Zones
2. Crie hosted zone: `sauvia.com.br`
3. Copie os 4 nameservers (ex: ns1.xxx, ns2.xxx...)

#### Passo 3: Importar registros no Route53
1. Na hosted zone, clique em "Import zone file"
2. Cole todos os registros do GoDaddy
3. Adicione novos registros para Sauvia:

```
# Sauvia App (Frontend)
sauvia.com.br → A → IP-DO-EC2-OU-ELB

# API Backend (opcional)
api.sauvia.com.br → A → IP-DO-EC2-OU-ELB
```

#### Passo 4: Alterar Nameservers no GoDaddy
1. GoDaddy → Domínios → sau via.com.br → Nameservers
2. Substitua pelos 4 nameservers do Route53
3. **aguarde propagation** (5 min a 48h)

### Opção Alternativa: Mantém GoDaddy como DNS

Se não quiser migrar nameservers:

1. **No GoDaddy, adicionar apenas:**
   ```
   Type: A
   Nome: @ ou sau via
   Valor: IP-DO-EC2-AWS
   ```

2. **No EC2, configurar SSL com Let's Encrypt via Traefik**

---

## 5. Variáveis de Ambiente

### Backend FastAPI (.env)
```bash
# App
APP_ENV=production
APP_HOST=0.0.0.0
APP_PORT=8000

# Database
DATABASE_URL=postgresql+asyncpg://user:pass@rds-endpoint:5432/sauvia

# Redis
REDIS_URL=redis://redis:6379/0

# JWT
SECRET_KEY=generate-com-openssl-rand-hex-64
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# AWS Cognito
COGNITO_USER_POOL_ID=us-east-1_xxxxx
COGNITO_CLIENT_ID=xxxxx
COGNITO_CLIENT_SECRET=xxxxx
COGNITO_REGION=us-east-1

# AWS SES
AWS_ACCESS_KEY_ID=AKIAQMLRP6G3SHI2AOFI
AWS_SECRET_ACCESS_KEY=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
AWS_REGION=us-east-1
FROM_EMAIL=noreply@sauvia.com.br

# Evolute API
EVOLUTE_API_URL=http://evolute-api:8080
EVOLUTE_API_KEY=xxxxx
EVOLUTE_INSTANCE=xxxxx
```

### Frontend Next.js
```bash
NEXT_PUBLIC_API_URL=http://backend:8000/api/v1
NEXTAUTH_URL=https://sauvia.com.br
NEXTAUTH_SECRET=xxxxx
COGNITO_CLIENT_ID=xxxxx
COGNITO_REGION=us-east-1
COGNITO_USER_POOL_ID=us-east-1_xxxxx
```

---

## 6. Docker Compose (EC2)

```yaml
version: '3.8'

services:
  traefik:
    image: traefik:v3.0
    ports: [80, 443, 8080]
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./traefik/traefik.yml:/traefik.yml
    network_mode: host

  redis:
    image: redis:7-alpine
    ports: [6379]
    volumes: [redis_data:/data]
    networks: [sauvia-network]

  backend:
    build: ./backend
    ports: [8000:8000]
    env_file: [.env]
    depends_on: [redis]
    networks: [sauvia-network]

  frontend:
    build: ./frontend
    ports: [3000:3000]
    depends_on: [backend]
    networks: [sauvia-network]

  n8n:
    image: n8nio/n8n:latest
    ports: [5678]
    volumes: [n8n_data:/home/node/.n8n]
    networks: [sauvia-network]

  evolute-api:
    image: atendai/evolution:latest
    ports: [8080]
    networks: [sauvia-network]

networks:
  sau via-network:
    driver: bridge

volumes:
  redis_data:
  n8n_data:
```

---

## 7. API Endpoints (FastAPI)

### Auth
- `POST /api/v1/auth/register` - Cadastro
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/refresh` - Refresh token
- `POST /api/v1/auth/logout` - Logout
- `GET /api/v1/auth/me` - Dados usuário

### Pacientes
- `GET /api/v1/patients` - Lista (paginado)
- `POST /api/v1/patients` - Criar
- `GET /api/v1/patients/{id}` - Detalhes
- `PUT /api/v1/patients/{id}` - Atualizar
- `DELETE /api/v1/patients/{id}` - Deletar

### Appointments
- `GET /api/v1/appointments` - Lista
- `POST /api/v1/appointments` - Criar
- `PUT /api/v1/appointments/{id}` - Atualizar
- `DELETE /api/v1/appointments/{id}` - Cancelar

### LGPD (NOVO!)
- `GET /api/v1/lgpd/export` - Export dados
- `GET /api/v1/lgpd/consents` - Ver consentimentos
- `PUT /api/v1/lgpd/consents` - Atualizar
- `GET /api/v1/lgpd/audit-logs` - Logs auditoria
- `DELETE /api/v1/lgpd/delete-account` - Deletar conta

---

## 8. LGPD - Implementação

### Modelos
```python
# Audit Log - Todas operações
class AuditLog:
    id, user_id, action, entity, entity_id, ip_address, metadata, created_at

# Consentimento Granular
class UserConsent:
    id, user_id, consent_type, granted, granted_at, revoked_at
```

### Funcionalidades
- [x] Audit logging de todas operações
- [x] Consentimento granular (marketing, analytics, etc)
- [x] Export dados usuário (JSON)
- [x] Deletar conta e dados
- [x] Data residency São Paulo (AWS sa-east-1)

---

## 9. Comandos Úteis

### Desenvolvimento
```bash
# Frontend
cd frontend && npm run dev

# Backend
cd backend && uvicorn app.main:app --reload

# Docker (produção)
cd docker && docker-compose up -d --build
```

### AWS
```bash
# SSM Session (sem SSH)
aws ssm start-session --target i-xxxxx

# Logs CloudWatch
aws logs tail /aws/ec2/sauvia-server --follow

# RDS Connection
aws ssm start-session --target i-xxxxx
psql -h rds-endpoint.rds.amazonaws.com -U admin -d sau via
```

---

## 10. Design System

### Cores
```css
--primary: #7C3AED      /* Roxo principal */
--secondary: #A78BFA    /* Lavanda */
--surface: hsl(40, 20%, 98%)      /* Background */
--surface-container-low: hsl(40, 15%, 94%)  /* Cards */
--on-surface: hsl(210, 20%, 12%)   /* Texto */
```

### Regras
- **NUNCA** usar borders 1px - usar mudança de cor
- Corner radius: 1rem cards, full botões
- Sombras: `rgba(124, 58, 237, 0.06)` - nunca preto
- Glassmorphism: `backdrop-blur: 20px`

---

## 11. Convenções de Código

### Commits
```
feat: add patient search filter
fix: resolve appointment booking conflict
chore: update prisma client
docs: update API documentation
refactor: simplify nutrition plan logic
```

### Estrutura
- Server Components por padrão
- 'use client' apenas para interatividade
- Componentes em `/components/primitives/`
- Tailwind CSS para styling

---

## 12. Troubleshooting

```bash
# Docker
docker logs container_name
docker-compose logs -f
docker-compose up -d --build

# API
curl http://localhost:8000/health
http://localhost:8000/docs  # Swagger

# Frontend
npm run build
npm run lint
```

---

## 13. Links Úteis

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- Backend Docs: `http://localhost:8000/docs`
- n8n: `http://localhost:5678`

---

**Última atualização**: 2026-04-08
**Versão**: 2.0 (FastAPI + LGPD


criado pelo claude

# SaúdeApp MVP1 — Biblioteca Completa de Prompts
## OpenCode (Claude Code) + Zed IDE + AWS + Evolution API

> **Projeto:** CRM SaaS para Nutricionistas (B2B2C)
> **Stack:** NestJS · Next.js · React Native (Expo) · PostgreSQL · Prisma · Firebase Auth · Evolution API · AWS (ECS Fargate)
> **IDE:** Zed · **AI Coding:** OpenCode (Claude Code)

---

## 0. PROMPT DE SISTEMA (CLAUDE.md)

> Coloque este arquivo na raiz do repositório como `CLAUDE.md`. O OpenCode lê automaticamente.

```markdown
# CLAUDE.md — SaúdeApp MVP1

## Contexto do Projeto
SaúdeApp é um CRM SaaS B2B2C para nutricionistas.
- O NUTRICIONISTA é o cliente pagante (assina via dashboard web Next.js).
- O PACIENTE usa o app mobile React Native gratuitamente (custo embutido na assinatura).
- A comunicação Nutri↔Paciente usa Evolution API (WhatsApp).

## Stack Técnico
- **Backend:** NestJS 10+ com TypeScript strict, Prisma ORM, PostgreSQL 16
- **Dashboard Web:** Next.js 14+ App Router, Standalone output, Tailwind CSS
- **App Mobile:** React Native (Expo SDK 51+), TypeScript
- **Auth:** Firebase Auth (idToken → JWT via NestJS)
- **WhatsApp:** Evolution API v2 (Docker, Baileys)
- **Infra:** AWS ECS Fargate, RDS PostgreSQL, ElastiCache Redis, S3, CloudFront
- **CI/CD:** GitHub Actions → ECR → ECS

## Padrões de Código
- TypeScript strict em TODOS os projetos (sem `any`)
- NestJS: Arquitetura Hexagonal (ports/adapters), módulos independentes
- Prisma: migrações versionadas, sem `directUrl`, usar `prisma.config.ts`
- Testes: Jest para unit, Supertest para e2e
- Variáveis de ambiente via `.env` validadas com `@nestjs/config` + Zod
- Commits: Conventional Commits (feat:, fix:, chore:)
- Sem código morto, sem console.log em produção
- Erros tratados com filtros globais NestJS (HttpExceptionFilter)

## Design System (Mobile)
- Primary: #1B6CA8 | Secondary: #4CAF8E | Background: #F5F7FA
- Font: Inter (H1: 28px Bold, Body: 15px Regular)
- Buttons: 52px altura, radius 14px
- Cards: radius 16px, border 1px #E5E7EB, padding 16px
- Tab Bar Paciente: 5 itens (Home/Buscar/Consultas/Saúde/Perfil)
- Tab Bar Profissional: 4 itens (Dashboard/Agenda/Pacientes/Perfil)

## Banco de Dados (Entidades Core)
- User (roles: NUTRITIONIST, PATIENT, ADMIN)
- Plan (plano de saúde do nutri para paciente)
- RoutineLog (log diário: refeições, hábitos, exercícios)
- NutritionalInput (input nutricional do paciente)
- MedicalRecord (anamnese/prontuário)
- Video (biblioteca de treinos calistenia)
- WhatsAppSession (instância Evolution API por nutri)
- WhatsAppMessage (mensagens enviadas/recebidas)
- MessageTemplate (templates de lembrete, cardápio, etc.)

## Regras de Negócio
- Nutricionista Starter: até 30 pacientes, R$97/mês
- Nutricionista Pro: ilimitado + AI, R$197/mês
- Free trial: 14 dias sem cartão
- Paciente NUNCA paga diretamente
- Dados de saúde: LGPD compliance obrigatório
- WhatsApp: nutricionista escaneia QR code próprio via Evolution API
```

---

## 1. INFRAESTRUTURA AWS

### 1.1 Setup inicial do projeto (monorepo)

```
Crie a estrutura de um monorepo com Turborepo para o SaúdeApp com 3 workspaces:

1. apps/api — NestJS backend (porta 3000)
2. apps/web — Next.js dashboard do nutricionista (porta 3001)
3. apps/mobile — React Native Expo app do paciente

Inclua:
- turbo.json com pipelines de build, dev, test e lint
- tsconfig.base.json compartilhado com strict: true
- packages/shared — types TypeScript compartilhados entre os 3 apps
- packages/prisma — schema Prisma + client gerado
- .env.example com todas as variáveis necessárias
- docker-compose.yml para dev local (PostgreSQL 16, Redis 7, Evolution API v2)
- Dockerfile multi-stage otimizado para NestJS e Next.js Standalone
- .github/workflows/ci.yml com lint, test e build

O docker-compose deve incluir:
- postgres:16 na porta 5432
- redis:7 na porta 6379
- evolution-api (atrevidal/evolution-api:v2.3.7) na porta 8080
- Volumes nomeados para persistência
```

### 1.2 Terraform AWS

```
Gere os arquivos Terraform para provisionar a infra AWS do SaúdeApp MVP1:

Recursos necessários:
- VPC com 2 subnets públicas e 2 privadas em us-east-1
- ECS Cluster com Fargate
- 3 ECS Services: api (NestJS), web (Next.js), evolution-api
  - api: 0.25 vCPU, 512MB, min 1 / max 3 tasks, auto-scaling por CPU 70%
  - web: 0.25 vCPU, 512MB, min 1 / max 2 tasks
  - evolution: 0.5 vCPU, 1GB, min 1 / max 1 task (stateful)
- RDS PostgreSQL 16 (db.t4g.micro, 20GB, subnet privada)
- ElastiCache Redis 7 (cache.t4g.micro, subnet privada)
- S3 bucket para mídia (vídeos de treino + mídia WhatsApp)
- CloudFront distribution apontando para ALB
- ALB com path-based routing: /api/* → api, /* → web
- ECR repositories para as 3 imagens
- Security groups: ALB público, ECS apenas do ALB, RDS apenas do ECS
- Secrets Manager para DATABASE_URL, REDIS_URL, EVOLUTION_API_KEY, FIREBASE_CONFIG
- IAM roles com least privilege

Variáveis: region, environment (dev/staging/prod), domain_name.
Use módulos separados: networking, database, compute, cdn.
Output: ALB DNS, CloudFront URL, RDS endpoint, Redis endpoint.
```

### 1.3 GitHub Actions CI/CD

```
Crie o workflow .github/workflows/deploy.yml para CI/CD do SaúdeApp:

Trigger: push na branch main (produção) ou develop (staging).

Jobs:
1. test — roda lint + testes em paralelo para api, web e mobile
2. build-api — build Docker, push para ECR, deploy ECS (api service)
3. build-web — build Docker, push para ECR, deploy ECS (web service)
4. build-evolution — build Docker, push para ECR, deploy ECS (evolution service)
5. migrate — roda prisma migrate deploy no RDS via ECS run-task

Secrets necessários: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, ECR_REGISTRY.

Usar:
- aws-actions/amazon-ecr-login
- aws-actions/amazon-ecs-deploy-task-definition
- Cache de node_modules e .turbo
- Build condicional (só rebuilda o que mudou via turbo --filter)
```

---

## 2. BACKEND (NestJS API)

### 2.1 Schema Prisma completo

```
Gere o schema.prisma completo para o SaúdeApp MVP1 com as seguintes entidades:

CORE:
- User (id uuid, email, name, role enum NUTRITIONIST/PATIENT/ADMIN, firebaseUid, avatarUrl, phone, createdAt, updatedAt, onboardingCompleted boolean)
- NutritionistProfile (userId FK, crn string, specialties string[], maxPatients int, subscriptionTier enum STARTER/PRO/TRIAL, subscriptionExpiresAt, stripeCustomerId?)
- PatientProfile (userId FK, nutritionistId FK, birthDate, gender, height, weight, conditions string[], allergies string[], goals string[], inviteToken)

PLANOS E ACOMPANHAMENTO:
- Plan (id, nutritionistId FK, patientId FK, title, description, type enum DIET/EXERCISE/MEDICATION/HABIT, startDate, endDate, isActive, items Json)
- RoutineLog (id, patientId FK, planId FK?, type enum MEAL/EXERCISE/MEDICATION/HABIT/WATER, data Json, completedAt, notes?)
- NutritionalInput (id, patientId FK, date, meals Json, symptoms string[], mood enum, waterIntake int, notes?)
- MedicalRecord (id, patientId FK, nutritionistId FK, type enum ANAMNESIS/FOLLOWUP/EXAM, data Json, createdAt)

CONTEÚDO:
- Video (id, title, description, url, thumbnailUrl, category enum, difficulty enum BEGINNER/INTERMEDIATE/ADVANCED, duration int seconds, tags string[], isActive)
- HealthCalculator (id, type enum IMC/TMB/HYDRATION/BODY_FAT, name, description, formula string)

WHATSAPP (Evolution API):
- WhatsAppSession (id, nutritionistId FK unique, instanceName, status enum CONNECTED/DISCONNECTED/QR_PENDING, qrCode?, lastConnectedAt?)
- WhatsAppMessage (id, sessionId FK, patientId FK?, direction enum INBOUND/OUTBOUND, type enum TEXT/IMAGE/DOCUMENT/AUDIO, content string, mediaUrl?, status enum SENT/DELIVERED/READ/FAILED, whatsappMessageId?, sentAt, deliveredAt?, readAt?)
- MessageTemplate (id, nutritionistId FK, name, category enum REMINDER/DIET/APPOINTMENT/WELCOME/PROGRESS, content string com {{variáveis}}, isActive)

NOTIFICAÇÕES:
- Notification (id, userId FK, type enum, title, body, data Json?, readAt?, createdAt)

Use @@index nos campos mais consultados. Adicione @@map para snake_case nas tabelas.
Prisma config moderno sem directUrl.
```

### 2.2 Módulo Auth

```
Crie o módulo de autenticação do NestJS para o SaúdeApp:

Fluxo:
1. Usuário faz login com Firebase Auth (email/senha ou Google/Apple OAuth)
2. Frontend envia o idToken do Firebase para POST /auth/login
3. Backend verifica o idToken com firebase-admin
4. Faz findOrCreate do User no PostgreSQL (por firebaseUid)
5. Gera JWT próprio (com userId, role, nutritionistId se aplicável)
6. Retorna { accessToken, user }

Arquivos necessários:
- auth.module.ts (imports: JwtModule, PrismaModule, FirebaseModule)
- auth.controller.ts (POST /auth/login, POST /auth/register, GET /auth/me)
- auth.service.ts (validateFirebaseToken, generateJwt, findOrCreateUser)
- firebase.service.ts (wrapper do firebase-admin, verify idToken)
- jwt.strategy.ts (PassportStrategy com JWT)
- jwt-auth.guard.ts (guard global)
- roles.guard.ts (guard por role: @Roles('NUTRITIONIST'))
- roles.decorator.ts (custom decorator)
- auth.dto.ts (LoginDto com class-validator)

Regras:
- JWT expira em 7 dias
- Refresh token via Firebase (não implementar refresh próprio no MVP)
- Guard global: todas as rotas são protegidas exceto /auth/login e /auth/register
- O idToken do Firebase é validado a cada login, não cacheado
```

### 2.3 Módulo Pacientes (CRUD)

```
Crie o módulo de gestão de pacientes para o NestJS:

Endpoints:
- POST /patients/invite — nutricionista envia convite (gera inviteToken, envia via WhatsApp)
- GET /patients — lista pacientes do nutricionista logado (paginado, filtro por nome/status)
- GET /patients/:id — detalhe com últimos logs e inputs nutricionais
- PATCH /patients/:id — atualiza dados do paciente
- DELETE /patients/:id — soft delete (desativa vínculo)
- POST /patients/accept-invite/:token — paciente aceita convite e vincula ao nutri
- GET /patients/:id/timeline — timeline de RoutineLogs + NutritionalInputs (paginado, por data)

Regras de negócio:
- Nutricionista STARTER não pode ter mais de 30 pacientes ativos
- Cada paciente pertence a apenas 1 nutricionista por vez
- O convite expira em 7 dias
- Ao aceitar convite, verificar se o paciente já tem conta (merge) ou criar nova
- Timeline é ordenada por data DESC, agrupada por dia

Inclua:
- patients.module.ts, patients.controller.ts, patients.service.ts
- DTOs com class-validator (CreatePatientInviteDto, UpdatePatientDto, PaginationQueryDto)
- patients.service.spec.ts com testes unitários (mock Prisma)
- Swagger decorators em todos os endpoints
```

### 2.4 Módulo Planos de Saúde

```
Crie o módulo de Planos para o NestJS:

Endpoints:
- POST /plans — nutricionista cria plano para paciente
- GET /plans — lista planos (filtro: patientId, type, isActive)
- GET /plans/:id — detalhe do plano com items
- PATCH /plans/:id — atualiza plano
- DELETE /plans/:id — desativa plano
- POST /plans/:id/duplicate — duplica plano para outro paciente

Tipos de plano e estrutura do campo items (Json):
- DIET: { meals: [{ name: "Café da manhã", time: "07:00", foods: [{ name, quantity, unit, calories?, substitutions? }] }] }
- EXERCISE: { routines: [{ day: "monday", exercises: [{ videoId?, name, sets, reps, rest }] }] }
- MEDICATION: { medications: [{ name, dosage, frequency, times: ["08:00", "20:00"], interactions?: string[] }] }
- HABIT: { habits: [{ name, frequency: "daily", target: number, unit: "copos de água" }] }

Regras:
- Apenas o nutricionista dono pode editar
- Ao criar plano DIET, enviar cardápio resumido via WhatsApp (se sessão ativa)
- Ao criar plano MEDICATION, criar notificações agendadas (via Bull queue)
```

### 2.5 Módulo RoutineLog (Input do Paciente)

```
Crie o módulo de RoutineLog para registros diários do paciente:

Endpoints (paciente):
- POST /routine-logs — paciente registra ação (refeição, exercício, medicação tomada, água)
- GET /routine-logs — lista por data range (default: últimos 7 dias)
- GET /routine-logs/summary — resumo semanal (% de adesão por tipo de plano)
- GET /routine-logs/streak — dias consecutivos de registros

Endpoints (nutricionista):
- GET /routine-logs/patient/:patientId — logs do paciente (paginado)
- GET /routine-logs/patient/:patientId/adherence — taxa de adesão por plano

Estrutura do campo data (Json) por type:
- MEAL: { planMealId?, foods: [{ name, quantity }], photo?: url, satisfaction: 1-5 }
- EXERCISE: { planExerciseId?, exerciseName, duration, sets?, reps?, difficulty: 1-5 }
- MEDICATION: { planMedicationId?, medicationName, taken: boolean, skippedReason? }
- WATER: { amount: ml }
- HABIT: { habitName, completed: boolean, value?: number }

Regras:
- Paciente só pode registrar logs próprios
- Nutricionista só vê logs dos seus pacientes
- Streak é calculado em tempo real (sem cache no MVP)
- Ao completar todos os itens do dia, enviar WhatsApp de parabéns (se template ativo)
```

### 2.6 Módulo WhatsApp (Evolution API)

```
Crie o módulo de integração WhatsApp via Evolution API para o NestJS:

Endpoints:
- POST /whatsapp/sessions — cria instância Evolution para o nutricionista logado
- GET /whatsapp/sessions/qr — retorna QR code para escanear
- GET /whatsapp/sessions/status — status da conexão
- DELETE /whatsapp/sessions — desconecta instância
- POST /whatsapp/send — envia mensagem para paciente
- POST /whatsapp/send-template — envia template com variáveis preenchidas
- POST /whatsapp/webhook — recebe webhooks da Evolution API (público, validado por apikey)
- GET /whatsapp/messages/:patientId — histórico de mensagens com paciente

Service Evolution API (evolution.service.ts):
- createInstance(instanceName: string): POST /instance/create
- getQrCode(instanceName: string): GET /instance/connect/{instance}
- getStatus(instanceName: string): GET /instance/connectionState/{instance}
- sendText(instance, to, text): POST /message/sendText/{instance}
- sendMedia(instance, to, mediaUrl, caption): POST /message/sendMedia/{instance}
- deleteInstance(instanceName: string): DELETE /instance/delete/{instance}

Webhook handler (whatsapp-webhook.service.ts):
- Valida apikey no header
- Processa eventos: messages.upsert, connection.update, qrcode.updated
- messages.upsert: salva WhatsAppMessage, notifica nutricionista
- connection.update: atualiza WhatsAppSession.status
- qrcode.updated: atualiza WhatsAppSession.qrCode

Template engine (template.service.ts):
- Substitui {{paciente_nome}}, {{nutri_nome}}, {{data}}, {{cardapio_resumo}} etc.
- Valida que todas as variáveis foram preenchidas antes de enviar

Config:
- EVOLUTION_API_URL=http://evolution-api:8080
- EVOLUTION_API_KEY=sua-api-key
- EVOLUTION_WEBHOOK_URL=https://api.saudeapp.com/whatsapp/webhook

Inclua testes unitários mockando as chamadas HTTP para a Evolution API.
```

### 2.7 Módulo Notificações (Push + WhatsApp)

```
Crie o módulo de Notificações do NestJS usando Bull queues com Redis:

Filas:
- medication-reminders — dispara lembretes de medicação nos horários definidos
- whatsapp-messages — fila para envio de mensagens WhatsApp (rate limit)
- push-notifications — fila para Firebase Cloud Messaging

Jobs:
- MedicationReminderJob: cron a cada minuto, busca medicações com reminder no próximo minuto, envia push + WhatsApp
- DailyDigestJob: cron às 20h, envia resumo do dia para o paciente via push
- WeeklyReportJob: cron segunda 9h, envia relatório semanal para o nutricionista via WhatsApp
- InactivityAlertJob: cron diário, detecta pacientes sem log há 3+ dias, notifica nutricionista

Endpoints:
- GET /notifications — lista notificações do usuário logado (paginado)
- PATCH /notifications/:id/read — marca como lida
- PATCH /notifications/read-all — marca todas como lidas
- POST /notifications/register-device — registra FCM token do dispositivo

Regras:
- WhatsApp: máximo 1 mensagem a cada 5 minutos por paciente (rate limit na fila)
- Push: sem rate limit
- Notificações são criadas no banco + enviadas via push/WhatsApp
- Se WhatsApp falhar, criar Notification de fallback
```

### 2.8 Módulo Calculadoras de Saúde

```
Crie o módulo de Calculadoras de Saúde (ferramentas gratuitas do app):

Endpoints (públicos, sem auth):
- POST /calculators/imc — Índice de Massa Corporal
  Input: { weight: kg, height: cm }
  Output: { imc: number, classification: string, range: string }

- POST /calculators/tmb — Taxa Metabólica Basal (Harris-Benedict)
  Input: { weight: kg, height: cm, age: years, gender: "M"|"F", activityLevel: 1-5 }
  Output: { tmb: kcal, tdee: kcal, macros: { protein, carbs, fat } }

- POST /calculators/hydration — Necessidade Hídrica
  Input: { weight: kg, activityLevel: 1-5, climate: "hot"|"mild"|"cold" }
  Output: { dailyWater: ml, glasses: number }

- POST /calculators/body-fat — Estimativa de Gordura Corporal (Navy method)
  Input: { gender, waist: cm, neck: cm, height: cm, hip?: cm }
  Output: { bodyFatPercentage: number, classification: string, leanMass: kg, fatMass: kg }

Cada calculadora deve:
- Validar inputs com class-validator (min, max ranges fisiológicos)
- Retornar classificação textual em português
- Ser stateless (sem salvar no banco)
- Ter testes unitários com valores de referência médica
```

---

## 3. DASHBOARD WEB (Next.js)

### 3.1 Setup Next.js Dashboard

```
Crie o projeto Next.js para o Dashboard do Nutricionista:

Config:
- Next.js 14+ App Router com output: 'standalone'
- TypeScript strict, Tailwind CSS, shadcn/ui como component library
- next-auth ou Firebase Auth client-side (token passado para API NestJS)
- Axios instance configurado com baseURL da API e interceptor de token JWT
- Layout: sidebar fixa à esquerda (Dashboard, Agenda, Pacientes, Planos, WhatsApp, Configurações)

Páginas:
- /login — login com email/senha ou Google
- /onboarding — wizard de primeiro acesso (dados do nutri, CRN, especialidades)
- /dashboard — métricas: total pacientes, adesão média, consultas hoje, alertas
- /patients — lista com busca, filtro por status, card com avatar + último log
- /patients/[id] — detalhe: timeline, planos ativos, gráfico de adesão, chat WhatsApp
- /patients/[id]/plans/new — criador de plano (wizard: tipo → itens → revisão → salvar)
- /whatsapp — painel: QR code (se não conectado), lista de conversas, chat
- /whatsapp/templates — CRUD de templates de mensagem
- /settings — perfil, assinatura, notificações

Componentes reutilizáveis:
- PatientCard, PlanBuilder, TimelineItem, AdherenceChart (Recharts)
- WhatsAppChat (estilo bolha, tempo real via polling no MVP)
- QRCodeDisplay (mostra QR da Evolution API, atualiza a cada 30s)
```

### 3.2 Página de Chat WhatsApp

```
Crie a página /whatsapp do dashboard Next.js:

Layout:
- Coluna esquerda (300px): lista de conversas (avatar, nome, última mensagem, horário, badge unread)
- Coluna direita (flex): chat selecionado

Chat component:
- Header: nome do paciente, foto, status (online/offline), botão "Ver perfil"
- Corpo: mensagens em bolhas (outbound à direita azul, inbound à esquerda cinza)
  - Cada bolha: texto, horário, status (✓ sent, ✓✓ delivered, ✓✓ azul read)
  - Suporte a imagens inline (expandir ao clicar)
- Footer: input de texto, botão enviar, botão "Usar template" (abre modal com lista)
  - Ao selecionar template, preenche variáveis automaticamente e permite editar antes de enviar

Funcionalidade:
- Polling a cada 5 segundos para novas mensagens (GET /whatsapp/messages/:patientId?after=lastTimestamp)
- Marcar como lidas ao abrir conversa
- Scroll automático para última mensagem
- Lista de conversas: polling a cada 10s para atualizar preview

Se não houver sessão WhatsApp ativa:
- Mostrar tela de setup: "Conecte seu WhatsApp" com QR code grande
- Polling a cada 3s para verificar conexão
- Ao conectar, redirecionar para lista de conversas
```

---

## 4. APP MOBILE (React Native Expo)

### 4.1 Setup React Native

```
Crie o setup do app React Native (Expo) para o SaúdeApp paciente:

Config:
- Expo SDK 51+, TypeScript strict
- expo-router para navegação (file-based routing)
- Zustand para state management
- React Query (TanStack Query) para data fetching + cache
- Axios instance com token JWT no header
- expo-secure-store para guardar tokens
- expo-notifications para push (FCM)
- Tema com tokens do Design System: cores (#1B6CA8, #4CAF8E, #F5F7FA), Inter font

Estrutura de pastas:
app/
├── (auth)/
│   ├── login.tsx
│   └── register.tsx
├── (onboarding)/
│   ├── step1-profile.tsx
│   ├── step2-health.tsx
│   ├── step3-goals.tsx
│   └── step4-terms.tsx
├── (tabs)/
│   ├── _layout.tsx (Tab Bar: Home, Buscar, Consultas, Saúde, Perfil)
│   ├── index.tsx (Home/Dashboard)
│   ├── search.tsx (buscar exercícios/receitas)
│   ├── appointments.tsx (consultas e lembretes)
│   ├── health.tsx (calculadoras + logs)
│   └── profile.tsx
├── plans/[id].tsx (detalhe do plano)
├── exercises/[id].tsx (player de vídeo)
└── log/new.tsx (registrar ação: refeição, exercício, medicação)

Componentes base:
- HeroCard (gradiente primary, texto branco)
- MetricCard (valor grande + label + ícone)
- ActionCard (ação do dia: exercício, refeição, medicação)
- ProgressRing (círculo animado de progresso)
- BottomSheet (para formulários rápidos)
```

### 4.2 Tela Home (Dashboard Paciente)

```
Crie a tela Home do app do paciente (tabs/index.tsx):

Layout (scroll vertical):
1. Header: "Olá, {{nome}}" + avatar + ícone notificação com badge
2. HeroCard: "Dia {{N}} da sua jornada" + barra de progresso semanal
3. Seção "Ações de Hoje" (horizontal scroll):
   - ActionCard para cada item pendente do plano ativo:
     - Refeição: ícone prato, "Café da manhã", "07:00", botão "Registrar"
     - Exercício: ícone haltere, "Treino A - Calistenia", "30min", botão "Iniciar"
     - Medicação: ícone pílula, "Metformina 500mg", "08:00", botão "Tomei ✓"
   - Itens completados ficam com opacity 0.5 e check verde
4. Seção "Meu Progresso" (grid 2x2 de MetricCards):
   - IMC atual, Água hoje (ml/meta), Streak (dias), Adesão semanal (%)
5. Seção "Calculadoras Grátis" (horizontal scroll de cards):
   - IMC, TMB, Hidratação, Gordura Corporal
   - Cada card abre modal com formulário inline

Data fetching:
- useQuery('dashboard') → GET /patients/me/dashboard (combina planos ativos, logs de hoje, métricas)
- Refetch ao voltar para a tab (onFocus)
- Skeleton loading enquanto carrega
- Pull-to-refresh
```

### 4.3 Tela de Registro de Log

```
Crie a tela de registro de ação diária (log/new.tsx):

Acessada via botão "Registrar" em qualquer ActionCard da Home.
Recebe params: { type: 'MEAL'|'EXERCISE'|'MEDICATION'|'WATER', planItemId? }

Formulário por tipo:

MEAL:
- Select: qual refeição (pré-populado se veio do plano)
- Lista de alimentos: nome + quantidade (campo de texto livre)
- Botão "Tirar foto" (expo-image-picker → upload S3 → URL)
- Slider satisfação (1-5 carinhas)
- Campo notas (opcional)

EXERCISE:
- Nome do exercício (pré-populado se veio do plano)
- Input: duração (minutos)
- Inputs opcionais: séries, repetições
- Slider dificuldade percebida (1-5)
- Botão play se houver vídeo associado

MEDICATION:
- Nome do medicamento (pré-populado)
- Toggle: "Tomei" / "Não tomei"
- Se não tomou: select motivo (esqueci, efeito colateral, acabou, outro)

WATER:
- Selector rápido: 200ml, 300ml, 500ml, custom
- Animação de copo enchendo

Submit:
- POST /routine-logs com { type, data, completedAt: now }
- Feedback háptico + animação de confete se completou todas do dia
- Navega de volta para Home
```

### 4.4 Tela de Exercícios (Netflix da Calistenia)

```
Crie o módulo de Exercícios no app:

Tela search.tsx (tab Buscar):
- Search bar com debounce 300ms
- Filtros: categoria (upper, lower, core, full body, stretching), nível (iniciante, intermediário, avançado)
- Grid de VideoCards: thumbnail, título, duração, nível badge
- GET /videos com query params (search, category, difficulty, page)

Tela exercises/[id].tsx:
- Player de vídeo (expo-av) com controles nativos
- Abaixo: título, descrição, tags, nível, duração
- Seção "Instruções" com steps numerados
- Botão "Completar Exercício" → abre BottomSheet para registrar log
- Seção "Relacionados" (GET /videos/:id/related)

Componentes:
- VideoCard (thumbnail 16:9, play icon overlay, título, duração pill)
- VideoPlayer (expo-av, fullscreen support, auto-pause ao sair)
- ExerciseTimer (countdown configurable, vibração ao acabar)

Cache:
- Thumbnails em cache com expo-image
- Dados do vídeo em cache React Query (staleTime: 5min)
```

---

## 5. EVOLUTION API — CONFIGURAÇÃO

### 5.1 Docker Compose Evolution API

```
Gere o docker-compose.yml otimizado para a Evolution API v2 em desenvolvimento local:

Serviços:
- evolution-api:
  - image: atrevidal/evolution-api:v2.3.7
  - ports: 8080:8080
  - environment:
    - AUTHENTICATION_API_KEY=dev-api-key-placeholder
    - DATABASE_PROVIDER=postgresql
    - DATABASE_CONNECTION_URI=postgresql://postgres:postgres@postgres:5432/evolution
    - DATABASE_SAVE_DATA_INSTANCE=true
    - DATABASE_SAVE_DATA_NEW_MESSAGE=true
    - DATABASE_SAVE_MESSAGE_UPDATE=true
    - DATABASE_SAVE_DATA_CONTACTS=true
    - CACHE_REDIS_ENABLED=true
    - CACHE_REDIS_URI=redis://redis:6379/1
    - WEBHOOK_GLOBAL_URL=http://host.docker.internal:3000/whatsapp/webhook
    - WEBHOOK_GLOBAL_ENABLED=true
    - WEBHOOK_GLOBAL_WEBHOOK_BY_EVENTS=true
    - WEBHOOK_EVENTS_MESSAGES_UPSERT=true
    - WEBHOOK_EVENTS_CONNECTION_UPDATE=true
    - WEBHOOK_EVENTS_QRCODE_UPDATED=true
    - LOG_LEVEL=WARN
  - depends_on: [postgres, redis]
  - extra_hosts: ["host.docker.internal:host-gateway"]

Inclua notas sobre:
- Como o webhook aponta para host.docker.internal para alcançar o NestJS local
- Como acessar o manager: http://localhost:8080/manager
- Como criar primeira instância via curl
```

### 5.2 Script de Setup da Evolution API

```
Crie um script bash scripts/setup-evolution.sh que:

1. Espera a Evolution API estar healthy (curl retry com backoff)
2. Cria uma instância de teste chamada "dev-nutri-1"
3. Obtém o QR code e exibe na console como texto (usando qrcode-terminal)
4. Configura o webhook da instância para apontar para http://host.docker.internal:3000/whatsapp/webhook
5. Verifica o status da conexão em loop até conectar
6. Envia mensagem de teste para um número configurado via variável de ambiente

Inclua tratamento de erro e mensagens coloridas no terminal.
O script deve funcionar tanto para setup inicial quanto para reconexão.
```

---

## 6. TESTES

### 6.1 Testes E2E da API

```
Crie testes e2e com Jest + Supertest para o NestJS:

Setup:
- test/setup.ts: cria módulo de teste com banco PostgreSQL de teste (via Prisma), seed de dados
- test/helpers.ts: funções para gerar JWT fake, criar user fake, criar paciente vinculado

Arquivos de teste:
- test/auth.e2e-spec.ts: login com Firebase token mock, registro, /me
- test/patients.e2e-spec.ts: CRUD de pacientes, convite, aceitar convite, verificar limite Starter
- test/plans.e2e-spec.ts: criar plano DIET, listar por paciente, duplicar
- test/routine-logs.e2e-spec.ts: registrar log, verificar timeline, calcular streak
- test/whatsapp.e2e-spec.ts: criar sessão (mock Evolution), webhook de mensagem recebida, enviar template
- test/calculators.e2e-spec.ts: IMC, TMB, hidratação com valores conhecidos

Cada teste:
- Usa transação isolada (rollback após cada test)
- Verifica status HTTP + body shape
- Testa autorização (nutri não vê paciente de outro nutri)
- Testa validação (inputs inválidos retornam 400 com mensagem clara)
```

---

## 7. LGPD E SEGURANÇA

### 7.1 Middleware LGPD

```
Crie o módulo de compliance LGPD para o NestJS:

Funcionalidades:
1. ConsentService:
   - POST /consent — registra aceite do termo (userId, version, ipAddress, userAgent, acceptedAt)
   - GET /consent/status — verifica se usuário aceitou versão atual
   - Bloqueia acesso a rotas protegidas se consentimento não aceito (guard)

2. DataExportService:
   - POST /privacy/export — paciente solicita exportação de todos os seus dados
   - Gera JSON com: perfil, logs, inputs nutricionais, mensagens, planos
   - Envia link para download via email (expira em 24h)
   - Log de auditoria da solicitação

3. DataDeletionService:
   - POST /privacy/delete — paciente solicita exclusão (soft delete com 30 dias de carência)
   - DELETE /privacy/confirm-delete/:token — confirma exclusão permanente
   - Remove: logs, inputs, mensagens WhatsApp, planos, perfil
   - Mantém: dados anonimizados para métricas agregadas do nutri

4. AuditLogService:
   - Registra em tabela AuditLog: quem, quando, ação, entidade, ip
   - Interceptor global que logga todas as mutações (POST, PATCH, DELETE)

5. DataEncryption:
   - Campos sensíveis (conditions, allergies, medications) criptografados com AES-256 no Prisma middleware
   - Chave em AWS Secrets Manager
```

---

## 8. PROMPTS DE PRODUTIVIDADE (Zed + OpenCode)

### 8.1 Prompt para Code Review

```
Faça code review deste arquivo seguindo os padrões do SaúdeApp:

Checklist:
- [ ] TypeScript strict (sem `any`, sem `as` desnecessário)
- [ ] DTOs com class-validator em todos os inputs
- [ ] Guards de autorização nos endpoints corretos
- [ ] Tratamento de erros com exceções NestJS (NotFoundException, ForbiddenException)
- [ ] Queries Prisma otimizadas (select específico, include apenas necessário)
- [ ] Sem N+1 queries
- [ ] Logs estruturados (Logger do NestJS, não console.log)
- [ ] Testes unitários para o service
- [ ] Swagger decorators (@ApiOperation, @ApiResponse)
- [ ] Variáveis de ambiente tipadas (não process.env direto)

Reporte: problemas por severidade (critical, warning, info) com sugestão de fix.
```

### 8.2 Prompt para Debugging

```
Estou com um bug no SaúdeApp. Ajude a diagnosticar:

Contexto:
- Módulo: [nome do módulo]
- Erro: [mensagem de erro ou comportamento inesperado]
- Quando ocorre: [passo a passo para reproduzir]
- Logs relevantes: [colar logs]

Analise:
1. Qual a causa raiz mais provável?
2. Quais arquivos provavelmente precisam de fix?
3. Gere o fix com explicação do porquê
4. Gere teste que previne regressão
5. Verifique se o mesmo padrão existe em outros módulos
```

### 8.3 Prompt para Gerar Módulo Novo

```
Gere um novo módulo NestJS completo para [NOME_DO_MÓDULO] no SaúdeApp:

Seguindo a arquitetura padrão do projeto:
1. [module].module.ts — imports, providers, controllers
2. [module].controller.ts — endpoints REST com Swagger
3. [module].service.ts — lógica de negócio
4. dto/ — DTOs com class-validator
5. [module].service.spec.ts — testes unitários
6. entities/ — interfaces TypeScript (não classes, Prisma cuida do ORM)

Funcionalidade esperada:
[Descrever os endpoints, regras de negócio e relações com outros módulos]

Regras:
- Seguir padrões do CLAUDE.md
- Injetar PrismaService, não usar Repository pattern (Prisma já é suficiente)
- Guards: JwtAuthGuard + RolesGuard onde necessário
- Paginação com cursor-based (não offset) para listas grandes
- Response DTOs com @Exclude() para campos sensíveis (class-transformer)
```

### 8.4 Prompt para Migração Prisma

```
Preciso adicionar/alterar o schema Prisma do SaúdeApp.

Mudança necessária: [descrever a mudança]

Faça:
1. Edite o schema.prisma com a mudança
2. Gere o nome da migração (formato: YYYYMMDD_descricao_snake_case)
3. Verifique se há breaking changes (campos não-null sem default em tabela com dados)
4. Se houver breaking change, gere migration SQL customizada com data backfill
5. Atualize os DTOs e Services afetados
6. Atualize os testes
7. Liste todos os endpoints que podem ser afetados pela mudança
```

---

## 9. DEPLOY E OPERAÇÕES

### 9.1 Checklist de Go-Live

```
Execute o checklist de go-live do SaúdeApp MVP1:

Segurança:
- [ ] Todas as env vars em Secrets Manager (não hardcoded)
- [ ] CORS configurado apenas para domínios da app
- [ ] Rate limiting global (express-rate-limit: 100 req/min)
- [ ] Helmet.js configurado
- [ ] Input sanitization (class-validator + class-transformer)
- [ ] SQL injection: Prisma parametriza por padrão (verificar raw queries)
- [ ] Firebase Auth rules revisadas
- [ ] WAF rules no CloudFront

Performance:
- [ ] Prisma connection pooling configurado (connection_limit=10)
- [ ] Redis cache para queries frequentes (dashboard, lista pacientes)
- [ ] Next.js ISR para páginas estáticas
- [ ] Imagens em S3 servidas via CloudFront
- [ ] Gzip/Brotli no ALB

Monitoring:
- [ ] CloudWatch logs em todos os ECS tasks
- [ ] CloudWatch alarms: CPU > 80%, erros 5xx > 10/min, RDS connections > 80%
- [ ] Health check endpoints: /health (api), / (web)
- [ ] Sentry ou similar para error tracking

Dados:
- [ ] RDS backup automático (7 dias retention)
- [ ] Prisma migrations rodaram sem erro
- [ ] Seed de dados iniciais (vídeos de calistenia, templates WhatsApp padrão)

App Stores:
- [ ] Apple Developer account configurada
- [ ] Google Play Console configurada
- [ ] Expo EAS Build configurado
- [ ] Certificates e provisioning profiles gerados
```)
