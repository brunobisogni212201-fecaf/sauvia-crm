# ⚡ Quick Start: Cognito → Clerk + MCP Server (30 min setup)

## 🎯 O que vamos fazer

1. ✅ Desabilitar Cognito no AWS (economizar ~$800/ano)
2. ✅ Setup Clerk para autenticação
3. ✅ Implementar MCP Server para IA acessar CRM
4. ✅ Deploy tudo em produção

**Tempo Total**: ~30 minutos

---

## Etapa 1: Setup Clerk Dashboard (5 min)

### 1.1 Acessar Clerk

```bash
# Abrir em seu navegador
https://dashboard.clerk.com
```

### 1.2 Usar organizacão Sauvia existente

```json
{
  "organization_id": "org_3CJ7hMRk5IvlDjDpEB3a0kuNaT0",
  "name": "sauvia",
  "slug": "sauvia-1776091936892038127"
}
```

### 1.3 Copiar API Keys

Em **Dashboard → Settings → API Keys**:

```bash
# Criar arquivo .env.local na raiz
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
CLERK_JWT_KEY=sk_test_xxxxx
```

### 1.4 Habilitar funcionalidades

```bash
# Settings → OAuth Applications
✅ Dynamic client registration (necessário para MCP)
✅ Scopes: profile, email, openid

# Settings → API Keys
✅ Enable User API keys
✅ Enable Organization API keys

# Settings → Email
✅ Verificação de email automática
```

---

## Etapa 2: Backend FastAPI - Adicionar Clerk Auth (3 min)

### 2.1 Instalar dependências

```bash
cd apps/backend
pip install pyjwt cryptography httpx
```

### 2.2 Criar arquivo `app/core/clerk_auth.py`

```python
import jwt
import os
import httpx
from datetime import datetime
from typing import Optional
from fastapi import HTTPException, status
from functools import lru_cache

CLERK_JWT_KEY = os.getenv("CLERK_JWT_KEY", "")

@lru_cache
def get_clerk_public_keys():
    """Fetch Clerk's JWKS public keys"""
    try:
        with httpx.Client() as client:
            resp = client.get("https://api.clerk.com/v1/jwks")
            resp.raise_for_status()
            return resp.json()
    except Exception as e:
        raise Exception(f"Error fetching Clerk JWKS: {e}")

def verify_clerk_token(token: str) -> dict:
    """Verify Clerk JWT token and return user info"""
    if not token or not token.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token format"
        )

    token = token[7:]  # Remove "Bearer " prefix

    try:
        # Decode without verification to get kid
        unverified = jwt.decode(token, options={"verify_signature": False})
        kid = jwt.get_unverified_header(token).get("kid")

        # Get public keys
        jwks = get_clerk_public_keys()
        key = None
        for k in jwks.get("keys", []):
            if k.get("kid") == kid:
                key = jwt.algorithms.RSAAlgorithm.from_jwk(k)
                break

        if not key:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Key not found"
            )

        # Verify token
        decoded = jwt.decode(token, key, algorithms=["RS256"])
        return decoded

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired"
        )
    except jwt.InvalidTokenError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token: {str(e)}"
        )
```

### 2.3 Atualizar `app/deps.py`

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from app.core.clerk_auth import verify_clerk_token

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthCredentials = Depends(security)
) -> dict:
    """Extract and verify Clerk user from Bearer token"""
    return verify_clerk_token(f"Bearer {credentials.credentials}")
```

### 2.4 Adicionar variáveis de ambiente

```bash
# .env no backend
CLERK_JWT_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
```

### 2.5 Remover Cognito (opcional mas recomendado)

```bash
# Remover referências
grep -r "cognito\|boto3" apps/backend/ --include="*.py"

# Se houver, remover do requirements.txt
sed -i '/cognito\|boto3/d' apps/backend/requirements.txt
```

---

## Etapa 3: Frontend Web - Setup MCP Server (10 min)

### 3.1 Instalar dependências

```bash
cd apps/web
pnpm add mcp-handler @clerk/mcp-tools
```

### 3.2 Criar estrutura MCP

```bash
# Diretórios (usar ferramentas do projeto)
mkdir -p src/app/mcp/[transport]
mkdir -p src/app/.well-known/oauth-authorization-server
mkdir -p src/app/.well-known/oauth-protected-resource/mcp
mkdir -p src/lib/mcp
```

### 3.3 Criar tipos (`src/lib/mcp/types.ts`)

```typescript
export interface MCPAuthInfo {
  userId: string
  organizationId: string
  email: string
  scopes: string[]
}

export interface PatientDTO {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive' | 'archived'
  createdAt: string
}

export interface DashboardDTO {
  totalPatients: number
  activePatients: number
  averageAdherence: number
  appointmentsToday: number
}
```

### 3.4 Criar MCP Route Handler (`src/app/mcp/[transport]/route.ts`)

```typescript
import { verifyClerkToken } from '@clerk/mcp-tools/next'
import { createMcpHandler, withMcpAuth } from 'mcp-handler'
import { auth, clerkClient } from '@clerk/nextjs/server'

const clerk = await clerkClient()

const handler = createMcpHandler((server) => {
  // Tool 1: Get Current User
  server.tool(
    'get-sauvia-user',
    'Get current authenticated user',
    {},
    async (_, { authInfo }) => {
      const userId = authInfo!.extra!.userId as string
      const user = await clerk.users.getUser(userId)

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            id: user.id,
            email: user.emailAddresses[0]?.emailAddress,
            name: `${user.firstName} ${user.lastName}`,
          })
        }]
      }
    }
  )

  // Tool 2: List Patients
  server.tool(
    'list-patients',
    'List all patients',
    { type: 'object', properties: { page: { type: 'number' } } },
    async ({ page = 1 }, { authInfo }) => {
      const token = authInfo!.extra!.token as string
      const apiUrl = process.env.NEXT_PUBLIC_API_URL

      const res = await fetch(`${apiUrl}/patients?page=${page}&limit=20`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      const data = await res.json()
      return {
        content: [{ type: 'text', text: JSON.stringify(data, null, 2) }]
      }
    }
  )

  // Tool 3: Get Dashboard Metrics
  server.tool(
    'get-dashboard-metrics',
    'Get dashboard summary',
    {},
    async (_, { authInfo }) => {
      const token = authInfo!.extra!.token as string
      const apiUrl = process.env.NEXT_PUBLIC_API_URL

      const res = await fetch(`${apiUrl}/dashboard/metrics`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      const data = await res.json()
      return {
        content: [{ type: 'text', text: JSON.stringify(data, null, 2) }]
      }
    }
  )
})

const authHandler = withMcpAuth(
  handler,
  async (_, token) => {
    const clerkAuth = await auth({ acceptsToken: 'oauth_token' })
    return verifyClerkToken(clerkAuth, token)
  },
  {
    required: true,
    resourceMetadataPath: '/.well-known/oauth-protected-resource/mcp'
  }
)

export { authHandler as GET, authHandler as POST }
```

### 3.5 Criar OAuth Metadata Endpoints

**`src/app/.well-known/oauth-authorization-server/route.ts`:**

```typescript
import {
  authServerMetadataHandlerClerk,
  metadataCorsOptionsRequestHandler,
} from '@clerk/mcp-tools/next'

const handler = authServerMetadataHandlerClerk()
const corsHandler = metadataCorsOptionsRequestHandler()

export { handler as GET, corsHandler as OPTIONS }
```

**`src/app/.well-known/oauth-protected-resource/mcp/route.ts`:**

```typescript
import {
  metadataCorsOptionsRequestHandler,
  protectedResourceHandlerClerk,
} from '@clerk/mcp-tools/next'

const handler = protectedResourceHandlerClerk({
  scopes_supported: ['profile', 'email', 'openid', 'read:patients', 'write:patients'],
})
const corsHandler = metadataCorsOptionsRequestHandler()

export { handler as GET, corsHandler as OPTIONS }
```

### 3.6 Atualizar Middleware (`src/proxy.ts`)

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/.well-known/oauth-authorization-server(.*)",
  "/.well-known/oauth-protected-resource(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc|mcp)(.*)",
  ],
}
```

### 3.7 Atualizar API Client (`src/lib/api-client.ts`)

```typescript
import { auth } from "@clerk/nextjs/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1"

export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const { headers, ...rest } = options

  // Get token from Clerk
  let bearerToken: string | undefined
  try {
    const { getToken } = await auth()
    bearerToken = await getToken() ?? undefined
  } catch {
    // Silent fail for client-side calls
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(bearerToken && { Authorization: `Bearer ${bearerToken}` }),
      ...headers,
    },
    ...rest,
  })

  if (!res.ok) {
    throw new Error(`API ${res.status}: ${res.statusText}`)
  }

  return res.json()
}
```

### 3.8 Remover Cognito

```bash
# Remover pacote antigo
pnpm remove amazon-cognito-identity-js

# Remover arquivos antigos
rm -f src/lib/cognito.ts src/lib/cognito.test.ts
```

---

## Etapa 4: AWS - Desabilitar Cognito (2 min)

### 4.1 Fazer backup (segurança)

```bash
aws cognito-idp list-users \
  --user-pool-id us-east-1_XXXXXXXXX \
  --region us-east-1 > cognito_backup_$(date +%Y%m%d).json
```

### 4.2 Deletar User Pool no Console AWS

```bash
# AWS Console → Cognito → User Pools
# 1. Selecione "sauvia" pool
# 2. Clique "Delete"
# 3. Digite "delete" para confirmar
# ⏳ Aguarde ~5 minutos
```

### 4.3 Verificar economia

```bash
# Verificar faturação
aws ce get-cost-and-usage \
  --time-period Start=2024-04-01,End=2024-05-01 \
  --granularity MONTHLY \
  --metrics "UnblendedCost" \
  --filter file://cognito-filter.json

# Criar cognito-filter.json:
# {
#   "Dimensions": {
#     "Key": "SERVICE",
#     "Values": ["Amazon Cognito"]
#   }
# }
```

---

## Etapa 5: Variáveis de Ambiente

### 5.1 Web Frontend (`.env.local`)

```bash
# REMOVER (antigo):
# NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
# NEXT_PUBLIC_COGNITO_CLIENT_ID=XXXX

# ADICIONAR (novo Clerk):
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### 5.2 Backend FastAPI (`.env`)

```bash
# REMOVER:
# COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
# COGNITO_CLIENT_ID=XXXX

# ADICIONAR:
CLERK_JWT_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
```

### 5.3 Mobile React Native (`.env`)

```bash
# REMOVER:
# EXPO_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
# EXPO_PUBLIC_COGNITO_CLIENT_ID=XXXX

# ADICIONAR:
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
```

---

## Etapa 6: Testar Tudo (5 min)

### 6.1 Testar Backend

```bash
cd apps/backend
python -m uvicorn app.main:app --reload

# Em outro terminal, testar com token
curl http://localhost:8000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN"
```

### 6.2 Testar Frontend

```bash
cd apps/web
pnpm dev

# Abrir http://localhost:3000
# Fazer login com Clerk
# Verificar se lista pacientes
```

### 6.3 Testar MCP Metadata

```bash
# Verificar se metadata endpoint está público
curl http://localhost:3000/.well-known/oauth-protected-resource/mcp
```

### 6.4 Testar com Claude (Opcional)

1. Abrir [claude.ai](https://claude.ai)
2. **Settings → Beta → MCP Servers**
3. Adicionar novo MCP server:
   - URL: `http://localhost:3000/mcp/http`
   - Transport: HTTP Streaming
4. Autenticar com Clerk
5. Testar: "List my patients"

---

## Etapa 7: Deploy Produção (5 min)

### 7.1 Deploy Web (Vercel)

```bash
cd apps/web

# Adicionar environment variables
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
vercel env add CLERK_SECRET_KEY
vercel env add NEXT_PUBLIC_API_URL

# Deploy
vercel deploy --prod
```

### 7.2 Deploy Backend (ECS/Docker)

```bash
cd apps/backend

# Build Docker image
docker build -t sauvia-backend:latest .

# Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ECR_URI
docker tag sauvia-backend:latest YOUR_ECR_URI/sauvia-backend:latest
docker push YOUR_ECR_URI/sauvia-backend:latest

# Update ECS task definition e deploy
# (ou usar seu CI/CD pipeline)
```

### 7.3 Testar em Produção

```bash
# Testar MCP endpoint
curl https://api.sauvia.com.br/mcp/http \
  -H "Authorization: Bearer YOUR_TOKEN"

# Verificar logs
vercel logs --prod
```

---

## ✅ Checklist Rápido

```
[ ] Etapa 1: Setup Clerk
    [ ] Copiar API Keys
    [ ] Habilitar Dynamic client registration
    [ ] Habilitar API Keys

[ ] Etapa 2: Backend FastAPI
    [ ] pip install pyjwt cryptography
    [ ] Adicionar clerk_auth.py
    [ ] Atualizar deps.py
    [ ] Adicionar env vars

[ ] Etapa 3: Frontend Web + MCP
    [ ] pnpm add mcp-handler @clerk/mcp-tools
    [ ] Criar MCP route handler
    [ ] Criar OAuth metadata endpoints
    [ ] Atualizar middleware
    [ ] pnpm remove amazon-cognito-identity-js

[ ] Etapa 4: AWS Cleanup
    [ ] Backup Cognito
    [ ] Deletar User Pool
    [ ] Verificar cobrança zerou

[ ] Etapa 5: Env Vars
    [ ] .env.local (web)
    [ ] .env (backend)
    [ ] .env (mobile)

[ ] Etapa 6: Testes
    [ ] Backend: GET /auth/me
    [ ] Frontend: Login + List Patients
    [ ] MCP: Metadata endpoint
    [ ] Claude: Conectar e testar tool

[ ] Etapa 7: Deploy
    [ ] Vercel deploy web
    [ ] Docker push backend
    [ ] Verificar em produção
    [ ] Monitor por 24h
```

---

## 💰 Economia Calculada

| Serviço | Antes | Depois | Economia |
|---------|-------|--------|----------|
| Cognito (5k users) | $50-100/mês | $0 | $50-100/mês |
| MFA | $10-20/mês | Incluído | $10-20/mês |
| **Total/mês** | **$60-120** | **$0-5** | **$55-115** |
| **Total/ano** | **$720-1440** | **$0-60** | **$660-1380** |

---

## 🆘 Troubleshooting Rápido

### Erro: "Token inválido"
```bash
# Verificar CLERK_JWT_KEY está correto
echo $CLERK_JWT_KEY

# Verificar token não expirou (JWT expira 7 dias)
# Re-fazer login
```

### Erro: "CORS error"
```bash
# Verificar OPTIONS endpoint
curl -X OPTIONS http://localhost:3000/mcp/http -v

# Deve retornar headers CORS
```

### Erro: "MCP Client não conecta"
```bash
# Verificar Dynamic client registration está habilitado
# Verificar /.well-known/oauth-protected-resource/mcp retorna JSON
curl http://localhost:3000/.well-known/oauth-protected-resource/mcp
```

---

## 📚 Documentação Completa

Para detalhes avançados, veja:

- **[COGNITO_TO_CLERK_MIGRATION.md](./COGNITO_TO_CLERK_MIGRATION.md)** - Migração detalhada
- **[MCP_SERVER_SETUP.md](./MCP_SERVER_SETUP.md)** - Setup completo MCP
- **[CLAUDE.md](./CLAUDE.md)** - Padrões do projeto
- **[Clerk Docs](https://clerk.com/docs)** - Documentação oficial

---

## 🎉 Pronto!

Sua aplicação Sauvia agora tem:

✅ Autenticação via Clerk (segura, escalável, $800/ano mais barato)
✅ MCP Server (qualquer IA pode acessar seu CRM)
✅ OAuth 2.0 protected (sem expor dados)
✅ API pronta para integração com Claude, ChatGPT, etc

**Próximas ideias:**
- Integrar com Zapier via MCP
- Criar assistentes IA customizados
- Adicionar automações no n8n
- Expandir tools (WhatsApp, Email, etc)

Quer ajuda com algum desses próximos passos? 🚀