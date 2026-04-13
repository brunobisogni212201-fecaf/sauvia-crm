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
**Versão**: 2.0 (FastAPI + LGPD)