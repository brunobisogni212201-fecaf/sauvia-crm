# 🚀 Migração Cognito → Clerk (com MCP Server)

## Resumo Executivo

- **Custo Cognito (mensal)**: ~$50-100 (por usuário ativo)
- **Custo Clerk (mensal)**: $0-25 (primeiros 5k usuários grátis)
- **Economia**: ~$400-1000/ano
- **Benefício Extra**: MCP Server nativo com OAuth protegido
- **Tempo Total**: ~2 horas

## Fases de Migração

### ✅ Fase 1: Setup Clerk Dashboard (5 min)

1. Acesse [dashboard.clerk.com](https://dashboard.clerk.com)
2. Crie novo app ou use o existente "sauvia"
3. Em **Settings → API Keys**, copie:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `CLERK_JWT_KEY` (para backend validação)

4. Em **Settings → OAuth Applications**, habilite:
   - ✅ **Dynamic client registration** (necessário para MCP)
   - Scopes: `profile`, `email`, `openid`

5. Em **Dashboard → API Keys**, habilite:
   - ✅ **Enable User API keys**
   - ✅ **Enable Organization API keys**

6. Adicione a organização JSON fornecida:
   ```json
   {
     "object": "organization",
     "id": "org_3CJ7hMRk5IvlDjDpEB3a0kuNaT0",
     "name": "sauvia",
     "slug": "sauvia-1776091936892038127"
   }
   ```

### ✅ Fase 2: Backend FastAPI - Validação JWT com Clerk

#### 2.1 Instalar dependências Python

```bash
cd apps/backend
pip install pyjwt cryptography
```

#### 2.2 Criar módulo de autenticação Clerk

**`apps/backend/app/core/security.py`**

```python
import jwt
import os
from datetime import datetime
from typing import Optional, Dict, Any
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from functools import lru_cache
import httpx

CLERK_JWT_KEY = os.getenv("CLERK_JWT_KEY", "")
CLERK_PUBLISHABLE_KEY = os.getenv("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", "")
CLERK_API_URL = "https://api.clerk.com/v1"

security = HTTPBearer()

class ClerkAuthError(HTTPException):
    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            headers={"WWW-Authenticate": "Bearer"}
        )

@lru_cache(maxsize=1)
def get_clerk_public_keys() -> Dict[str, Any]:
    """Fetch Clerk's public keys for JWT verification (cached)"""
    try:
        with httpx.Client() as client:
            resp = client.get(f"{CLERK_API_URL}/jwks")
            resp.raise_for_status()
            return resp.json()
    except httpx.RequestError as e:
        raise ClerkAuthError(f"Erro ao obter chaves públicas Clerk: {str(e)}")

def verify_clerk_token(token: str) -> Dict[str, Any]:
    """
    Verify Clerk JWT token using RS256 algorithm

    Args:
        token: JWT token from Clerk

    Returns:
        Decoded token payload

    Raises:
        ClerkAuthError: If token is invalid/expired
    """
    if not token:
        raise ClerkAuthError("Token ausente")

    try:
        # Remove 'Bearer ' prefix if present
        if token.startswith("Bearer "):
            token = token[7:]

        # First decode without verification to get kid
        unverified = jwt.decode(token, options={"verify_signature": False})

        # Get public keys and verify
        keys_response = get_clerk_public_keys()
        public_keys = {key["kid"]: key for key in keys_response.get("keys", [])}

        # Get the key ID from header
        header = jwt.get_unverified_header(token)
        kid = header.get("kid")

        if not kid or kid not in public_keys:
            raise ClerkAuthError("Key ID inválido no token")

        # Verify with correct public key
        decoded = jwt.decode(
            token,
            public_keys[kid]["x"],
            algorithms=["RS256"],
            options={"verify_signature": True}
        )

        return decoded

    except jwt.ExpiredSignatureError:
        raise ClerkAuthError("Token expirado")
    except jwt.InvalidTokenError as e:
        raise ClerkAuthError(f"Token inválido: {str(e)}")
    except Exception as e:
        raise ClerkAuthError(f"Erro ao verificar token: {str(e)}")

async def get_current_user(credentials: HTTPAuthCredentials = Depends(security)) -> Dict[str, Any]:
    """
    Dependency para extrair usuário do token Bearer

    Returns:
        Decoded token com informações do usuário
    """
    token = credentials.credentials
    return verify_clerk_token(token)

async def get_optional_user(request) -> Optional[Dict[str, Any]]:
    """
    Opcional: obter usuário se token estiver presente
    """
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return None

    token = auth_header[7:]
    try:
        return verify_clerk_token(token)
    except ClerkAuthError:
        return None
```

#### 2.3 Remover dependências Cognito

```bash
# Remover referências em requirements.txt
grep -r "cognito\|boto3" apps/backend/ --include="*.py" | grep -v ".pyc"

# Se houver, remover do requirements.txt
sed -i '/amazon-cognito/d' apps/backend/requirements.txt
sed -i '/boto3/d' apps/backend/requirements.txt
```

#### 2.4 Atualizar rotas FastAPI

**`apps/backend/app/api/v1/routers/auth.py`**

```python
from fastapi import APIRouter, Depends, HTTPException, status
from app.core.security import get_current_user, verify_clerk_token
from app.schemas.user import UserResponse
from typing import Dict, Any

router = APIRouter(prefix="/auth", tags=["auth"])

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(user: Dict[str, Any] = Depends(get_current_user)):
    """
    Obter informações do usuário autenticado
    """
    return {
        "id": user.get("sub"),
        "email": user.get("email"),
        "firstName": user.get("first_name"),
        "lastName": user.get("last_name"),
        "imageUrl": user.get("picture"),
        "role": user.get("role", "patient"),
    }

@router.post("/verify-token")
async def verify_token(user: Dict[str, Any] = Depends(get_current_user)):
    """
    Verificar se token é válido (útil para health checks)
    """
    return {
        "valid": True,
        "user_id": user.get("sub"),
        "email": user.get("email"),
    }
```

### ✅ Fase 3: Frontend Web (Next.js) - Remover Cognito

#### 3.1 Remover pacote Cognito

```bash
cd apps/web
pnpm remove amazon-cognito-identity-js
```

#### 3.2 Remover arquivo antigo

```bash
rm -f src/lib/cognito.ts
rm -f src/lib/cognito.test.ts
```

#### 3.3 Atualizar API Client

**`apps/web/src/lib/api-client.ts`** (antes)
```typescript
import { getCurrentSession } from "./cognito";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, skipAuth, headers, ...rest } = options;

  // Auto-inject JWT from Cognito session
  let bearerToken = token;
  if (!bearerToken && !skipAuth) {
    const session = await getCurrentSession();
    bearerToken = session?.accessToken;
  }
  // ... resto do código
}
```

**`apps/web/src/lib/api-client.ts`** (depois - com Clerk)
```typescript
import { useAuth } from "@clerk/nextjs";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, skipAuth, headers, ...rest } = options;

  // Auto-inject JWT from Clerk
  let bearerToken = token;
  if (!bearerToken && !skipAuth) {
    // Nota: Em client components, use useAuth hook
    // Para server components, use auth() helper
    // Para API routes, use getAuth()
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
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || `API error: ${res.status}`);
  }

  return res.json();
}

export { request };
```

#### 3.4 Atualizar página de login

**`apps/web/src/app/(auth)/login/page.tsx`** (depois - com Clerk)
```typescript
"use client";

import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-green-600 hover:bg-green-700",
            footerActionLink: "text-green-600 hover:text-green-700",
          },
        }}
        redirectUrl="/dashboard"
      />
    </div>
  );
}
```

#### 3.5 Atualizar middleware Clerk

**`apps/web/src/proxy.ts`** (antes)
```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/auth(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});
```

**`apps/web/src/proxy.ts`** (depois - com MCP)
```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/auth(.*)",
  "/.well-known/oauth-authorization-server(.*)",
  "/.well-known/oauth-protected-resource(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc|mcp)(.*)",
  ],
};
```

### ✅ Fase 4: Frontend Mobile (React Native/Expo) - Remover Cognito

#### 4.1 Remover pacote Cognito

```bash
cd apps/mobile
pnpm remove amazon-cognito-identity-js
```

#### 4.2 Remover arquivo antigo

```bash
rm -f lib/cognito.ts
```

#### 4.3 Usar Clerk Expo

O `@clerk/clerk-expo` já está instalado, basta usar:

**`apps/mobile/lib/auth.ts`** (novo)
```typescript
import * as SecureStore from "expo-secure-store";
import { useAuth, useUser, useClerk } from "@clerk/clerk-expo";

const TOKEN_KEY = "sauvia_clerk_token";

export async function getStoredToken(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch {
    return null;
  }
}

export async function storeToken(token: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (err) {
    console.error("Erro ao armazenar token:", err);
  }
}

export async function clearToken(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (err) {
    console.error("Erro ao limpar token:", err);
  }
}
```

### ✅ Fase 5: AWS - Desabilitar Cognito

#### 5.1 Backup do Cognito (segurança)

```bash
# Exportar todos os usuários
aws cognito-idp list-users \
  --user-pool-id us-east-1_XXXXXXXXX \
  --region us-east-1 > cognito_users_backup_$(date +%Y%m%d).json

# Colocar em backup seguro (S3, etc)
aws s3 cp cognito_users_backup_*.json s3://seu-bucket-backup/cognito-backup/
```

#### 5.2 Deletar User Pool Cognito

```bash
# Listar pools
aws cognito-idp list-user-pools --max-results 60 --region us-east-1

# Deletar específico
aws cognito-idp delete-user-pool \
  --user-pool-id us-east-1_XXXXXXXXX \
  --region us-east-1

# Verificar se foi deletado (não deve aparecer mais)
aws cognito-idp describe-user-pool \
  --user-pool-id us-east-1_XXXXXXXXX \
  --region us-east-1
```

#### 5.3 Verificar faturação

```bash
# Ver custos Cognito no período (deve zerar após 24h)
aws ce get-cost-and-usage \
  --time-period Start=2024-04-01,End=2024-05-01 \
  --granularity DAILY \
  --metrics "UnblendedCost" \
  --filter file://cognito-filter.json \
  --region us-east-1
```

**`cognito-filter.json`:**
```json
{
  "Dimensions": {
    "Key": "SERVICE",
    "Values": ["Amazon Cognito"]
  }
}
```

### ✅ Fase 6: Variáveis de Ambiente

#### Web Frontend (`.env.local`)

```bash
# REMOVER (antigo Cognito):
# NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
# NEXT_PUBLIC_COGNITO_CLIENT_ID=XXXXXXXXXXXXXXXXXXXX

# ADICIONAR (novo Clerk):
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_API_URL_PROD=https://api.sauvia.com.br/api/v1
```

#### Backend FastAPI (`.env`)

```bash
# REMOVER (antigo Cognito):
# COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
# COGNITO_CLIENT_ID=XXXXXXXXXXXXXXXXXXXX
# COGNITO_REGION=us-east-1

# ADICIONAR (novo Clerk):
CLERK_JWT_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
```

#### Mobile (`.env`)

```bash
# REMOVER:
# EXPO_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
# EXPO_PUBLIC_COGNITO_CLIENT_ID=XXXXXXXXXXXXXXXXXXXX

# ADICIONAR:
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
```

### ✅ Fase 7: Testes End-to-End

```bash
# 1. Testar login web
cd apps/web
pnpm dev
# Acessar http://localhost:3000/sign-in

# 2. Testar backend
cd apps/backend
python -m uvicorn app.main:app --reload
# curl http://localhost:8000/api/v1/auth/me -H "Authorization: Bearer <token>"

# 3. Testar mobile
cd apps/mobile
pnpm start
# Testar fluxo de autenticação no Expo Go
```

### ✅ Fase 8: Deploy Produção

```bash
# 1. Update production env vars no Vercel
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
vercel env add CLERK_SECRET_KEY

# 2. Update backend env vars (Docker/ECS)
# Atualizar AWS Secrets Manager
aws secretsmanager update-secret \
  --secret-id sauvia-backend-secrets \
  --secret-string file://new-secrets.json

# 3. Deploy web
cd apps/web
pnpm run build
vercel deploy --prod

# 4. Deploy backend
cd apps/backend
docker build -t sauvia-backend .
docker push your-registry/sauvia-backend:latest
# Atualizar ECS task definition
```

## Checklist de Migração

```
[  ] Fase 1: Setup Clerk Dashboard
     [  ] Copiar API keys
     [  ] Habilitar Dynamic client registration
     [  ] Habilitar User & Organization API keys

[  ] Fase 2: Backend FastAPI
     [  ] Instalar pyjwt + cryptography
     [  ] Criar app/core/security.py com Clerk validation
     [  ] Remover dependências Cognito
     [  ] Testar endpoints com Clerk token

[  ] Fase 3: Web Frontend
     [  ] pnpm remove amazon-cognito-identity-js
     [  ] Remover src/lib/cognito.ts
     [  ] Atualizar API client
     [  ] Atualizar página de login
     [  ] Atualizar middleware Clerk

[  ] Fase 4: Mobile
     [  ] pnpm remove amazon-cognito-identity-js
     [  ] Remover lib/cognito.ts
     [  ] Usar @clerk/clerk-expo existing

[  ] Fase 5: AWS Cleanup
     [  ] Backup Cognito users
     [  ] Deletar User Pool Cognito
     [  ] Verificar cobrança zerou

[  ] Fase 6: Variáveis de Ambiente
     [  ] Atualizar .env.local (web)
     [  ] Atualizar .env (backend)
     [  ] Atualizar .env (mobile)

[  ] Fase 7: Testes
     [  ] Testar login web
     [  ] Testar API backend
     [  ] Testar mobile auth
     [  ] Testar MCP server (próximo passo)

[  ] Fase 8: Deploy Produção
     [  ] Update Vercel secrets
     [  ] Update ECS task definition
     [  ] Deploy web
     [  ] Deploy backend
     [  ] Monitor logs por 24h

[  ] Fase 9: Monitorar
     [  ] Verificar logs de erro
     [  ] Confirmar cobrança Cognito = $0
     [  ] Validar performance MCP server

[  ] Fase 10: Limpeza Final
     [  ] Remover referencias Cognito do código (grep)
     [  ] Remover backup local (manter em S3)
     [  ] Atualizar CLAUDE.md
```

## Economia Calculada

| Serviço | Antes (Cognito) | Depois (Clerk) | Economia |
|---------|-----------------|---|----------|
| Auth (5k users/mês) | $50-100 | $0 (free tier) | $50-100 |
| MFA | $10-20 | Incluído | $10-20 |
| Suporte | - | Community | - |
| **Total/mês** | **~$60-120** | **~$0-5** | **$55-115** |
| **Total/ano** | **~$720-1440** | **~$0-60** | **$660-1380** |

## Rollback (Se necessário)

Se precisar voltar para Cognito:

```bash
# 1. Restaurar User Pool (criar novo)
aws cognito-idp create-user-pool \
  --pool-name "sauvia" \
  --region us-east-1

# 2. Restaurar usuários do backup
# (Usar script customizado para cada user)

# 3. Reverter código
git checkout HEAD~1 -- apps/web/src/lib/cognito.ts
git checkout HEAD~1 -- apps/mobile/lib/cognito.ts
git checkout HEAD~1 -- apps/backend/app/core/security.py

# 4. Reinstalar dependências
cd apps/web && pnpm install
cd apps/mobile && pnpm install
cd apps/backend && pip install -r requirements.txt

# 5. Atualizar .env com valores Cognito antigos
```

## Próximos Passos

1. ✅ Migração Cognito → Clerk (este documento)
2. ⏭️ [Implementar MCP Server](./MCP_SERVER_SETUP.md)
3. ⏭️ [Integrar API Keys Clerk](./CLERK_API_KEYS_INTEGRATION.md)
4. ⏭️ [Configurar MCP Tools](./MCP_TOOLS_CONFIGURATION.md)

## Referências

- [Clerk Docs](https://clerk.com/docs)
- [Clerk vs Cognito Comparison](https://clerk.com/docs/guides/comparison/cognito)
- [AWS Cognito Pricing](https://aws.amazon.com/cognito/pricing/)
- [JWT Verification Best Practices](https://tools.ietf.org/html/rfc7519)
- [MCP Server Specification](https://modelcontextprotocol.io/)

## Suporte

Dúvidas?
- Slack: #engineering-sauvia
- Email: tech@sauvia.com.br
- Docs: https://docs.sauvia.com.br