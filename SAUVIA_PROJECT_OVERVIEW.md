# 🌿 Sauvia — Visão Geral Completa do Projeto

> **Documento gerado em:** 12 de Abril de 2026
> **Versão:** 3.0 — Consolidado de todos os docs + design Pencil
> **Status geral:** MVP em execução — 14 dias para entrega

---

## 1. O que é o Sauvia?

Sauvia é um **CRM SaaS multi-tenant para nutricionistas**. O produto tem duas faces:

- **Nutricionista (B2B):** Gerencia pacientes, consultas, planos alimentares, prontuários e biblioteca de exercícios em uma única plataforma web e mobile.
- **Paciente (B2C):** Acessa seu plano alimentar, histórico de saúde, vídeos prescritos e comunicação com o nutricionista pelo app.

O diferencial do produto está na **integração entre nutrição e movimento** (biblioteca de vídeos de calistenia) dentro do mesmo ecossistema, algo que os concorrentes não fazem.

### Modelo de Negócio

SaaS com 3 planos (definidos nas landing pages):

| Plano | Preço/mês | Público |
|-------|-----------|---------|
| Starter | R$ 97 | Nutricionista solo |
| Pro | R$ 197 | Consultório pequeno |
| Clínica | R$ 397 | Clínicas e grupos |

---

## 2. Stack Tecnológico

### Estrutura de Repositório

Monorepo gerenciado com **pnpm workspaces + Turborepo**:

```
sauvia-app/                    ← Raiz do monorepo
├── apps/
│   ├── web/                   ← Next.js 16 (frontend)
│   ├── mobile/                ← Expo SDK 55 (iOS/Android)
│   └── backend/               ← FastAPI Python (API)
├── packages/
│   ├── ui/                    ← Design System compartilhado
│   ├── ui-icons/              ← Ícones
│   └── shared-types/          ← Tipos TypeScript compartilhados
├── render.yaml                ← Config deploy backend
├── pnpm-workspace.yaml
└── CLAUDE.md                  ← Documentação técnica
```

### Frontend — Next.js 16

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| Next.js | 16.2.2 | Framework (App Router) |
| TypeScript | 5 | Tipagem |
| Tailwind CSS | 4 | Estilização |
| Framer Motion | — | Animações |
| Chart.js | — | Gráficos |
| Lucide React | — | Ícones |

### Backend — FastAPI Python

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| FastAPI | — | Framework API |
| Python | 3.11 | Linguagem |
| SQLAlchemy + asyncpg | — | ORM + driver async |
| Pydantic | — | Validação / DTOs |
| Alembic | — | Migrations |
| cryptography (Fernet) | — | Criptografia prontuários |

### Mobile — React Native + Expo

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| Expo | SDK 55 | Framework mobile |
| React Native | — | UI nativa |
| EAS Build | — | Build CI/CD |
| Bundle ID | `com.sauvia.app` | Identificador App Stores |
| EAS Project ID | `461e7642-fc27-4813-9341-b76459b28fd4` | Expo Cloud |

### Autenticação (decisão pendente)

> ⚠️ **Cognito está configurado mas não totalmente testado.** Avaliar migração para Clerk para MVP.

| Opção | Status | Prós |
|-------|--------|------|
| AWS Cognito | Configurado, não testado | Já pago na AWS |
| Clerk (recomendado para MVP) | Não implementado | SDK pronto Next.js + Expo, multi-tenant nativo, grátis até 10k usuários |
| JWT próprio | Não implementado | Zero custo, zero dependência |

---

## 3. Infraestrutura AWS

**Account ID:** `026544697783`
**Region principal:** `us-east-1` (N. Virginia)
**Região dados sensíveis:** `sa-east-1` (São Paulo) — LGPD

### Recursos Ativos

| Serviço | Recurso | Status | Custo/mês |
|---------|---------|--------|-----------|
| RDS | `sauviadb` (PostgreSQL) | ✅ Ativo | ~$15-20 |
| ElastiCache | Redis | ✅ Ativo | incluso |
| ECR | 5 repositórios Docker | ✅ Ativo | ~$1-2 |
| ECS | 5 clusters (Fargate) | ✅ Infra pronta | ~$30-50 |
| ALB | 3 load balancers | ✅ Ativo | ~$50-60 |
| S3 | 5 buckets | ✅ Ativo | ~$3-5 |
| Secrets Manager | 2 secrets | ✅ Ativo | ~$1 |
| CloudWatch | 2 log groups | ✅ Ativo | free tier |
| CodePipeline | 1 pipeline | ⚠️ Legacy | ~$1 |
| CodeBuild | 1 projeto | ⚠️ Legacy | ~$5 |
| **Total atual** | | | **~$106-144** |
| **Total otimizado** | | | **~$50-70** |

### S3 Buckets (uso planejado)

| Bucket | Finalidade |
|--------|------------|
| `sauvia-media-staging-us-east-1` | Uploads de mídia geral |
| `sauvia-static-staging-us-east-1` | Assets estáticos |
| `sauvia-perfis-imagens` | Fotos de perfil |
| `sauvia-prontuarios-pdf` | PDFs de prontuários (criptografados) |
| `sauvia-codepipeline-artifacts` | Artefatos CI/CD |

### Otimizações de Custo Identificadas

1. **Consolidar 3 ALBs em 1** com path-based routing → economiza ~$35/mês
2. **Usar Fargate Spot** em vez de Fargate on-demand → economiza ~70% em compute
3. **Remover CodePipeline/CodeBuild** (legado) se usar GitHub Actions → economiza ~$6/mês
4. **S3 lifecycle policies** para versões antigas → economia menor mas real

---

## 4. Ambientes e Domínios

### URLs Ativas Hoje

| Ambiente | URL | Status |
|----------|-----|--------|
| Frontend (Vercel) | `https://sauvia-app.vercel.app` | ✅ Online |
| Backend (Render) | `https://sauvia-crm-backend-service.onrender.com` | ✅ Online |
| API Docs (Swagger) | `https://sauvia-crm-backend-service.onrender.com/docs` | ✅ Online |
| Staging (Cloudflare) | `https://app.sauvia.qzz.io` | ✅ Configurado |
| API Staging | `https://api.sauvia.qzz.io` | ✅ Configurado |
| Domínio final | `sauvia.com.br` (GoDaddy) | ⏳ Não apontado |

### DNS / CDN — Cloudflare

- **Zona:** `sauvia.qzz.io` (Zone ID: `0e75bef8e8dab2a320711e525e4c8a01`)
- SSL/TLS Full (strict) ativo
- Brotli + HTTP/2 ativados
- DDoS protection ativo
- Custo: **$0/mês** (plano gratuito)

### Fluxo de tráfego

```
Usuário → Cloudflare (CDN + DDoS + SSL)
        → AWS ALB (load balancing)
        → ECS Fargate
             ├── Web (Next.js :3000)
             └── API (FastAPI :8000)
                  └── RDS PostgreSQL
                  └── ElastiCache Redis
```

---

## 5. CI/CD

### Estratégia de Branches

```
feature/* → main → staging → production
```

| Branch | Trigger | Ação |
|--------|---------|------|
| `main` | push | Deploy automático → Staging (Vercel + Render) |
| `staging` | push | Testes + Build ECS |
| `production` | push | Deploy ECS produção + EAS build mobile |

### CI/CD por plataforma (sem custo adicional)

| Plataforma | CI/CD | Custo |
|-----------|-------|-------|
| Vercel | Auto-deploy no push | $0 |
| Render | Auto-deploy no push | $0 |
| Expo EAS | Build na nuvem | $0 (free tier) |
| GitHub Actions | 2.000 min/mês | $0 (free tier) |

---

## 6. Design System

### Paleta de Cores

| Token | Cor | Hex | Uso |
|-------|-----|-----|-----|
| Primary | Roxo | `#7C3AED` | Botões primários, CTAs |
| Primary Light | Roxo claro | `#8B5CF6` | Hover, destaques |
| Primary Dark | Roxo escuro | `#5B21B6` | Texto sobre claro |
| Secondary | Lavanda | `#A78BFA` | Energia, ação, badges |
| Surface | Neutro quente | `hsl(40, 20%, 98%)` | Background geral |
| Surface Low | Neutro quente suave | `hsl(40, 15%, 94%)` | Cards |
| On Surface | Quase preto | `hsl(210, 20%, 12%)` | Texto principal |
| On Surface Var | Cinza azulado | `hsl(210, 10%, 40%)` | Texto secundário |

### Tipografia

| Uso | Fonte |
|-----|-------|
| Headings / Brand | Manrope |
| Body / Descritivo | Plus Jakarta Sans |

### Regras de Design

- **Nunca** usar borders 1px — usar variação de cor de fundo
- Corner radius: `1rem` em cards, `full` em botões
- Sombras com tint roxo: `rgba(124, 58, 237, 0.06)` — nunca preto puro
- Glassmorphism: `background: rgba(255,255,255,0.7)` + `backdrop-filter: blur(20px)`
- Animações: blobs de fundo em loop 20s, scroll reveal, floating cards

---

## 7. Telas — Estado do Design (Pencil)

O arquivo `layout_full.pen` contém **47 frames** organizados em grupos:

### Telas Identificadas (mapeamento parcial)

| Frame | Tela | Grupo |
|-------|------|-------|
| Design System | Sistema de Design | — |
| Navigation Map | Mapa de navegação | — |
| Tela 1 | Splash Screen | App Mobile |
| Tela 2 | Login | App Mobile |
| Tela 3 | Cadastro Paciente | App Mobile |
| G2 — Dados Pessoais | Onboarding passo 1 | Mobile — Cadastro |
| G2 — Preferências | Onboarding passo 2 | Mobile — Cadastro |
| G2 — Foto e Conclusão | Onboarding passo 3 | Mobile — Cadastro |
| G3 — Home Dashboard | Dashboard principal | Mobile — Home |
| G3 — Buscar Profissional | Busca de nutricionista | Mobile — Descoberta |
| + 37 outros frames | ... | ... |

> 💡 **Status real do design:** Muito mais avançado do que os "4 telas" mencionados. O Pencil já tem um fluxo completo de onboarding, home e busca. Precisa de levantamento completo dos 47 frames para mapear o que falta.

---

## 8. API — Endpoints Implementados

### Auth

```
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
GET  /api/v1/auth/me
GET  /api/v1/auth/callback         ← OAuth Cognito (pendente config)
```

### Pacientes

```
GET    /api/v1/patients            ← Lista paginada
POST   /api/v1/patients            ← Criar
GET    /api/v1/patients/{id}       ← Detalhes
PUT    /api/v1/patients/{id}       ← Atualizar
DELETE /api/v1/patients/{id}       ← Soft delete
```

### LGPD (implementado)

```
GET    /api/v1/lgpd/export
GET    /api/v1/lgpd/consents
PUT    /api/v1/lgpd/consents
GET    /api/v1/lgpd/audit-logs
DELETE /api/v1/lgpd/delete-account
```

### Ainda não implementados (MVP)

```
# Agenda
GET/POST/PUT/DELETE /api/v1/appointments

# Planos Alimentares
GET/POST /api/v1/meal-plans
GET/POST /api/v1/patients/{id}/meal-plans

# Vídeos
GET/POST /api/v1/videos
POST     /api/v1/videos/upload
GET/POST /api/v1/patients/{id}/videos

# Prontuário
GET/POST /api/v1/patients/{id}/records
GET/POST /api/v1/patients/{id}/notes
GET/PUT  /api/v1/patients/{id}/vitals

# WhatsApp
POST /api/v1/appointments/{id}/notify-whatsapp
```

---

## 9. LGPD

### Implementado

- Audit log de todas as operações (entidade, ação, IP, timestamp)
- Consentimento granular por tipo (marketing, analytics, etc)
- Export completo de dados do usuário em JSON
- Deletar conta e todos os dados associados
- Data residency configurado para São Paulo (`sa-east-1`)

### Modelo de Dados

```python
AuditLog:     id, user_id, action, entity, entity_id, ip_address, metadata, created_at
UserConsent:  id, user_id, consent_type, granted, granted_at, revoked_at
```

---

## 10. O que já está PRONTO

| Módulo | Status | Onde |
|--------|--------|------|
| Landing B2B (nutricionista) | ✅ Completo | `/landing-nutritionist` |
| Landing B2C (paciente) | ✅ Completo | `/landing-client` |
| Design System page | ✅ Completo | `/design-system` |
| Micro-framework (tokens, hooks, utils) | ✅ Completo | `packages/ui` |
| Backend FastAPI rodando | ✅ Online | Render |
| Auth Cognito (configurado) | ⚠️ Não testado | — |
| Patients CRUD (backend) | ✅ Implementado | FastAPI |
| LGPD endpoints | ✅ Implementado | FastAPI |
| CI/CD GitHub Actions | ✅ Configurado | `.github/workflows/` |
| Infraestrutura AWS (staging) | ✅ Criada | us-east-1 |
| Cloudflare CDN + SSL | ✅ Ativo | sauvia.qzz.io |
| Design Pencil (47 frames) | ✅ Em progresso | layout_full.pen |
| Expo mobile (setup) | ✅ Configurado | EAS + bundle ID |

---

## 11. O que está PENDENTE para o MVP

### 🔴 Bloqueadores (sem isso não lança)

| Item | Prioridade | Estimativa |
|------|-----------|------------|
| Auth funcionando (Cognito callback OU migrar para Clerk) | P0 | 1-2 dias |
| Agenda / Consultas (backend + frontend + mobile) | P0 | 2 dias |
| Plano alimentar básico | P0 | 2 dias |
| WhatsApp notificação (Evolution API) | P0 | 1 dia |
| Biblioteca de vídeos (S3 + player mobile) | P1 | 2 dias |
| Prontuário criptografado (PDF + anotações) | P1 | 2 dias |

### 🟡 Importantes mas não bloqueadores

| Item | Prioridade | Estimativa |
|------|-----------|------------|
| Dashboard com stats | P2 | 1 dia |
| Domínio sauvia.com.br apontando | P2 | 30 min |
| Build Android EAS | P2 | 1 dia |
| Cognito Callback URL configurada | P2 | 30 min |

### 🟢 V2 (depois do MVP)

| Item | Versão |
|------|--------|
| Streaming Go/HLS para vídeos | V2 |
| Integração com Memed API | V2 |
| Dados estruturados de laboratório | V2 |
| ECS em produção (hoje roda Render + Vercel) | V2 |
| Multi-language (EN, ES) | V3 |

---

## 12. Cronograma MVP — 14 dias

| Dias | Foco | Entregável |
|------|------|------------|
| 1-2 | Auth + Setup multi-tenant | Login funcionando em 3 plataformas |
| 3-5 | Pacientes CRUD | CRUD completo web + mobile |
| 6-7 | Agenda + WhatsApp | Consulta agendada → WhatsApp disparado |
| 8-9 | Biblioteca Vídeos | Upload S3 + player no mobile |
| 10-11 | Prontuário | PDF criptografado + anotações |
| 12-13 | Design + Dashboard | Telas do Pencil aplicadas |
| 14 | Deploy + Testes | Tudo no ar, testado manualmente |

**Critério de sucesso no Dia 14:**
> Nutricionista consegue logar, criar 5 pacientes, agendar 2 consultas (paciente recebe WhatsApp), fazer upload de 1 vídeo e 1 PDF de prontuário.

---

## 13. Decisões em Aberto

| Decisão | Opções | Recomendação |
|---------|--------|-------------|
| Auth para MVP | Cognito (atual) vs Clerk | **Clerk** — menos config, SDK pronto para Next.js + Expo |
| Vídeos MVP | Streaming Go/HLS vs S3 direto | **S3 direto** agora, Go/HLS em V2 |
| ECS vs Render/Vercel | ECS em staging | **Manter Render + Vercel** para MVP, ECS em V2 |
| Cognito vs deprecar | Cognito já configurado | Avaliar custo de manter vs migrar |

---

## 14. Contatos e Credenciais de Serviço

> ⚠️ **Atenção:** Mover todas as credenciais para AWS Secrets Manager ou .env seguro. Os documentos do projeto contêm credenciais expostas que precisam ser rotacionadas.

| Serviço | Localização das credenciais |
|---------|----------------------------|
| AWS | Secrets Manager: `sauvia/api-keys/staging` |
| Banco de dados | Secrets Manager: `sauvia/database/staging` |
| Cognito | render.yaml (mover para env vars seguras) |
| Cloudflare | Dashboard Cloudflare |
| Expo | expo.dev → conta Bruno |

### ⚠️ Ação urgente: Rotacionar credenciais

As seguintes credenciais foram encontradas expostas em documentos de texto puro e **devem ser rotacionadas imediatamente**:

- AWS Access Key (encontrada em múltiplos arquivos `.md`)
- RDS password (encontrada em `INTEGRACAO_COMPLETA`)
- Cognito Client Secret (encontrado em `INTEGRACAO_COMPLETA`)
- Cloudflare API Token (encontrado em `CLOUDFLARE_SETUP.md`)

---

## 15. Convenções do Projeto

### Commits (Conventional Commits)

```
feat: add patient search filter
fix: resolve appointment booking conflict
chore: update dependencies
docs: update API documentation
refactor: simplify nutrition plan logic
```

### Código

- Server Components por padrão no Next.js
- `'use client'` apenas quando necessário (interatividade)
- Componentes base em `/components/primitives/`
- Hooks customizados em `/hooks/`
- Constantes centralizadas em `/constants/`
- Utilitários em `/utils/`

### Banco de Dados

- Todas as tabelas com `tenant_id` (isolamento multi-tenant)
- Soft delete (campo `deleted_at`) em vez de hard delete
- Timestamps em UTC
- Migrations via Alembic

---

## 16. Comandos Rápidos

```bash
# Dev local — Web
pnpm --filter web dev

# Dev local — Backend
cd apps/backend && uvicorn src.main:app --reload

# Dev local — Mobile
cd apps/mobile && npx expo start --ios

# Build tudo
pnpm build

# Deploy manual backend (Render faz automático no push)
git push origin main

# Build mobile Android
cd apps/mobile && npx eas build --platform android --profile preview

# Ver logs AWS backend
aws logs tail /ecs/sauvia-backend-staging --follow

# Rodar migrations
cd apps/backend && alembic upgrade head
```

---

**Versão:** 3.0
**Gerado por:** Claude (Cowork) em 12 de Abril de 2026
**Próxima revisão:** 26 de Abril de 2026 (Dia 14 do MVP)
