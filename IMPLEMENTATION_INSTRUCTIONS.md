# 🚀 Implementação: Cognito → Clerk + MCP Server

## PASSO A PASSO PRÁTICO

### PASSO 1: Backend - Adicionar Clerk Auth

**Arquivo: `apps/backend/src/adapters/driven/security/clerk_auth.py`** (CRIAR NOVO)

```python
import jwt
import httpx
from typing import Dict, Any, Optional
from fastapi import HTTPException, status
from functools import lru_cache

CLERK_API_URL = "https://api.clerk.com/v1"

class ClerkAuthError(HTTPException):
    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            headers={"WWW-Authenticate": "Bearer"}
        )

@lru_cache(maxsize=1)
def get_clerk_jwks() -> Dict[str, Any]:
    """Fetch Clerk's public keys (cached)"""
    try:
        with httpx.Client(timeout=10.0) as client:
            resp = client.get(f"{CLERK_API_URL}/jwks")
            resp.raise_for_status()
            return resp.json()
    except httpx.RequestError as e:
        raise ClerkAuthError(f"Failed to fetch Clerk JWKS: {str(e)}")

def verify_clerk_token(token: str) -> Dict[str, Any]:
    """Verify Clerk JWT token (RS256)"""
    if not token:
        raise ClerkAuthError("Token missing")

    if token.startswith("Bearer "):
        token = token[7:]

    try:
        header = jwt.get_unverified_header(token)
        kid = header.get("kid")

        if not kid:
            raise ClerkAuthError("No key ID in token")

        jwks = get_clerk_jwks()
        keys = {key["kid"]: key for key in jwks.get("keys", [])}

        if kid not in keys:
            raise ClerkAuthError("Unknown key ID")

        key_data = keys[kid]
        public_key = jwt.algorithms.RSAAlgorithm.from_jwk(key_data)

        decoded = jwt.decode(
            token,
            public_key,
            algorithms=["RS256"],
            options={"verify_signature": True}
        )

        return decoded

    except jwt.ExpiredSignatureError:
        raise ClerkAuthError("Token expired")
    except jwt.InvalidTokenError as e:
        raise ClerkAuthError(f"Invalid token: {str(e)}")
```

---

### PASSO 2: Backend - Atualizar Dependências

**Arquivo: `apps/backend/requirements.txt` - ADICIONAR:**

```
pyjwt==2.8.1
cryptography==41.0.7
httpx==0.25.1
```

**Arquivo: `apps/backend/src/config.py` - ADICIONAR ao Settings:**

```python
# Clerk Auth
clerk_secret_key: str = ""
clerk_publishable_key: str = ""
clerk_jwt_key: str = ""
```

---

### PASSO 3: Frontend Web - Instalar Pacotes

```bash
cd apps/web
pnpm add mcp-handler @clerk/mcp-tools
```

---

### PASSO 4: Frontend Web - Criar MCP Types

**Arquivo: `apps/web/src/lib/mcp/types.ts`** (CRIAR NOVO)

```typescript
export interface PatientDTO {
  id: string
  name: string
  email: string
  phone?: string
  status: 'active' | 'inactive' | 'archived'
  createdAt: string
}

export interface PlanDTO {
  id: string
  patientId: string
  title: string
  type: 'DIET' | 'EXERCISE' | 'MEDICATION' | 'HABIT'
  status: 'active' | 'inactive'
  createdAt: string
}

export interface DashboardDTO {
  totalPatients: number
  activePatients: number
  averageAdherence: number
  appointmentsToday: number
}
```

---

### PASSO 5: Frontend Web - Criar MCP Route Handler

**Arquivo: `apps/web/src/app/mcp/[transport]/route.ts`** (CRIAR NOVO)

```typescript
import { verifyClerkToken } from '@clerk/mcp-tools/next'
import { createMcpHandler, withMcpAuth } from 'mcp-handler'
import { auth, clerkClient } from '@clerk/nextjs/server'

const clerk = await clerkClient()

const handler = createMcpHandler((server) => {
  server.tool(
    'get-sauvia-user',
    'Get current authenticated user',
    {},
    async (_, { authInfo }) => {
      try {
        const userId = authInfo!.extra!.userId as string
        const user = await clerk.users.getUser(userId)

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              id: user.id,
              email: user.emailAddresses[0]?.emailAddress,
              name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
            })
          }]
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: `Error: ${error instanceof Error ? error.message : 'Unknown'}`
          }]
        }
      }
    }
  )

  server.tool(
    'list-patients',
    'List all patients',
    { type: 'object', properties: { page: { type: 'number' } } },
    async ({ page = 1 }, { authInfo }) => {
      try {
        const token = authInfo!.extra!.token as string
        const apiUrl = process.env.NEXT_PUBLIC_API_URL

        const res = await fetch(
          `${apiUrl}/patients?page=${page}&limit=20`,
          {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        )

        const data = await res.json()
        return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: `Error: ${error instanceof Error ? error.message : 'Unknown'}`
          }]
        }
      }
    }
  )

  server.tool(
    'get-dashboard-metrics',
    'Get dashboard metrics',
    {},
    async (_, { authInfo }) => {
      try {
        const token = authInfo!.extra!.token as string
        const apiUrl = process.env.NEXT_PUBLIC_API_URL

        const res = await fetch(`${apiUrl}/dashboard/metrics`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })

        const data = await res.json()
        return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: `Error: ${error instanceof Error ? error.message : 'Unknown'}`
          }]
        }
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
  { required: true, resourceMetadataPath: '/.well-known/oauth-protected-resource/mcp' }
)

export { authHandler as GET, authHandler as POST }
```

---

### PASSO 6: Frontend Web - OAuth Metadata Endpoints

**Arquivo: `apps/web/src/app/.well-known/oauth-authorization-server/route.ts`** (CRIAR NOVO)

```typescript
import {
  authServerMetadataHandlerClerk,
  metadataCorsOptionsRequestHandler,
} from '@clerk/mcp-tools/next'

const handler = authServerMetadataHandlerClerk()
const corsHandler = metadataCorsOptionsRequestHandler()

export { handler as GET, corsHandler as OPTIONS }
```

**Arquivo: `apps/web/src/app/.well-known/oauth-protected-resource/mcp/route.ts`** (CRIAR NOVO)

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

---

### PASSO 7: Frontend Web - Atualizar Middleware

**Arquivo: `apps/web/src/proxy.ts` - ADICIONAR ao isPublicRoute:**

```typescript
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/auth(.*)",
  // MCP metadata endpoints MUST be public
  "/.well-known/oauth-authorization-server(.*)",
  "/.well-known/oauth-protected-resource(.*)",
]);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc|mcp)(.*)",
  ],
};
```

---

### PASSO 8: Frontend Web - Atualizar API Client

**Arquivo: `apps/web/src/lib/api-client.ts` - SUBSTITUA:**

```typescript
import { auth } from "@clerk/nextjs/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export async function request<T>(
  endpoint: string,
  options: RequestInit & { token?: string; skipAuth?: boolean } = {}
): Promise<T> {
  const { token, skipAuth, headers, ...rest } = options as any;

  let bearerToken = token;
  if (!bearerToken && !skipAuth) {
    try {
      const { getToken } = await auth();
      bearerToken = await getToken() ?? undefined;
    } catch {
      // Silent fail
    }
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(bearerToken && { Authorization: `Bearer ${bearerToken}` }),
      ...headers,
    },
    ...rest,
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
}
```

---

### PASSO 9: Frontend Web - Remover Cognito

```bash
cd apps/web
pnpm remove amazon-cognito-identity-js
rm -f src/lib/cognito.ts src/lib/cognito.test.ts
```

---

### PASSO 10: Variáveis de Ambiente

**Arquivo: `.env.local` (WEB)** - CRIAR/ATUALIZAR:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx_COLE_SUA_CHAVE_AQUI
CLERK_SECRET_KEY=sk_test_xxxxx_COLE_SUA_CHAVE_AQUI
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

**Arquivo: `.env` (BACKEND)** - ADICIONAR:

```bash
CLERK_JWT_KEY=sk_test_xxxxx_COLE_SUA_CHAVE_AQUI
CLERK_PUBLISHABLE_KEY=pk_test_xxxxx_COLE_SUA_CHAVE_AQUI
```

---

### PASSO 11: Testes Locais

```bash
# Terminal 1: Backend
cd apps/backend
python -m uvicorn src.main:app --reload

# Terminal 2: Web
cd apps/web
pnpm dev

# Terminal 3: Teste
curl http://localhost:3000/.well-known/oauth-protected-resource/mcp
```

**Resposta esperada: JSON com scopes_supported**

---

### PASSO 12: AWS Cleanup (Opcional)

```bash
# Backup Cognito
aws cognito-idp list-users \
  --user-pool-id us-east-1_XXXXXXXXX \
  --region us-east-1 > cognito_backup.json

# Deletar User Pool (via AWS Console ou CLI)
aws cognito-idp delete-user-pool \
  --user-pool-id us-east-1_XXXXXXXXX \
  --region us-east-1
```

---

## ✅ CHECKLIST RÁPIDO

- [ ] Criar clerk_auth.py no backend
- [ ] Adicionar deps (pyjwt, cryptography, httpx)
- [ ] Instalar pnpm packages (mcp-handler, @clerk/mcp-tools)
- [ ] Criar MCP types.ts
- [ ] Criar MCP route handler
- [ ] Criar OAuth metadata endpoints (2 arquivos)
- [ ] Atualizar proxy.ts
- [ ] Atualizar api-client.ts
- [ ] Remover Cognito files
- [ ] Adicionar .env vars
- [ ] Testar localmente
- [ ] Deploy e verificar

---

## 🔍 TROUBLESHOOTING

**"Token inválido"**
→ Verificar CLERK_JWT_KEY está correto em .env

**"MCP endpoint não carrega"**
→ Certificar que /.well-known/ é público no middleware

**"API retorna 401"**
→ Verificar token está sendo passado como "Bearer TOKEN"

---

## 📞 PRÓXIMAS REFERÊNCIAS

1. Veja `QUICK_START_CLERK_MCP.md` para teste completo
2. Veja `MIGRATION_SUMMARY.md` para contexto
3. Veja `MCP_SERVER_SETUP.md` para explicações detalhadas

---

**Total de tempo: ~1 hora para implementação completa**
**Status: Pronto para começar!** 🚀