# 🚀 PLANO DE EXECUÇÃO - Clerk + MCP Integration

**Status**: Pronto para Executar  
**Tempo Total**: ~60 minutos  
**Data**: 2025-04-10

---

## 🎯 Objetivo Final
✅ Ter o MCP server funcionando localmente em http://localhost:3000/mcp/http
✅ Backend verificando tokens Clerk
✅ Pronto para conectar com Claude/ChatGPT

---

## ⏱️ FASES DE EXECUÇÃO

### FASE 1: Coleta de Informações (5 min)

**O que você precisa:**

1. **Clerk Organization ID** (você já tem):
   ```
   org_3CJ7hMRk5IvlDjDpEB3a0kuNaT0
   ```

2. **Clerk API Keys** (obter em https://dashboard.clerk.com):
   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (começa com `pk_test_`)
   - CLERK_SECRET_KEY (começa com `sk_test_`)

3. **Verificar estrutura do projeto:**
   ```bash
   # Rodar estes comandos
   ls -la apps/backend/src/adapters/driven/security/
   ls -la apps/web/src/lib/mcp/
   ls -la apps/web/src/app/mcp/
   ```

---

### FASE 2: Preparar Ambiente (10 min)

**Passo 1: Criar arquivo .env.local para web**
```bash
cd apps/web
cat > .env.local << 'ENVFILE'
# ===== CLERK CONFIGURATION =====
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_KEY_HERE

# ===== API CONFIGURATION =====
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
ENVFILE
```

**Passo 2: Criar arquivo .env para backend**
```bash
cd ../backend
cat > .env << 'ENVFILE'
# ===== CLERK CONFIGURATION =====
CLERK_JWT_KEY=sk_test_YOUR_KEY_HERE
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE

# ===== DATABASE (if needed) =====
# DATABASE_URL=postgresql://...

# ===== LOGGING =====
LOG_LEVEL=INFO
ENVFILE
```

**✓ Checklist:**
- [ ] Arquivo `apps/web/.env.local` criado com Clerk keys
- [ ] Arquivo `apps/backend/.env` criado com Clerk keys
- [ ] Nenhum arquivo .env commitado (no .gitignore)

---

### FASE 3: Instalar Dependências (10 min)

**Passo 1: Backend Python**
```bash
cd apps/backend

# Limpar cache anterior
rm -rf .venv __pycache__ 2>/dev/null

# Instalar dependências
pip install -r requirements.txt

# Verificar instalação
python -c "import PyJWT; import cryptography; import httpx; print('✓ All dependencies installed')"
```

**Passo 2: Frontend Node**
```bash
cd apps/web

# Instalar node modules
pnpm install

# Verificar instalação
pnpm list | grep -E "mcp-handler|@clerk|clerk-nextjs" || echo "Some packages might not be installed"
```

**✓ Checklist:**
- [ ] Backend: PyJWT, cryptography, httpx instalados
- [ ] Frontend: mcp-handler, @clerk/mcp-tools, @clerk/nextjs instalados
- [ ] Nenhum erro de instalação

---

### FASE 4: Testar Backend Localmente (15 min)

**Passo 1: Verificar importação do módulo Clerk**
```bash
cd apps/backend

# Testar importação
python -c "from src.adapters.driven.security.clerk_auth import verify_clerk_token; print('✓ Clerk auth module imported successfully')"
```

**Esperado**: `✓ Clerk auth module imported successfully`  
**Se falhar**: Rodar `pip install cryptography` novamente

---

**Passo 2: Iniciar Backend**
```bash
cd apps/backend

# Terminal dedicado para Backend
python -m uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

**Esperado**:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**✓ Checklist:**
- [ ] Backend iniciado sem erros
- [ ] Uvicorn rodando na porta 8000
- [ ] Nenhuma mensagem de erro sobre imports

---

### FASE 5: Testar Frontend Localmente (15 min)

**Passo 1: Iniciar Frontend**
```bash
cd apps/web

# Terminal dedicado para Frontend
pnpm dev
```

**Esperado**:
```
▲ Next.js X.X.X
  - Local:        http://localhost:3000
```

**✓ Checklist:**
- [ ] Frontend iniciado sem erros
- [ ] Next.js rodando na porta 3000

---

**Passo 2: Testar Endpoints Públicos (OAuth Metadata)**

Abrir **novo terminal** e rodar:

```bash
# Teste 1: OAuth Protected Resource Metadata
echo "Testing /.well-known/oauth-protected-resource/mcp..."
curl -s http://localhost:3000/.well-known/oauth-protected-resource/mcp | jq . || echo "Failed"

# Teste 2: OAuth Authorization Server Metadata
echo "Testing /.well-known/oauth-authorization-server..."
curl -s http://localhost:3000/.well-known/oauth-authorization-server | jq . || echo "Failed"
```

**Esperado**: Ambos retornam JSON com 200 OK

**Se falhar**: 
- Verificar que frontend está rodando
- Verificar proxy.ts includes .well-known routes
- Rodar `pnpm build` para rebuild

---

**Passo 3: Testar Login com Clerk (no browser)**

1. Abrir: http://localhost:3000
2. Você deve ver a página de login do Clerk
3. Clicar em "Sign In" ou "Sign Up"
4. Completar autenticação com Clerk
5. Redirecionado para dashboard

**✓ Checklist:**
- [ ] Página carrega sem erros JavaScript
- [ ] Modal Clerk aparece
- [ ] Pode fazer login/signup
- [ ] Redirecionado após autenticação

---

### FASE 6: Testar MCP Server (10 min)

**Passo 1: Obter um token Clerk válido**

No browser (após fazer login):
1. Abrir DevTools (F12)
2. Ir para aba "Network"
3. Procurar por requisição a `api.clerk.com`
4. Procurar pelo header: `Authorization: Bearer eyJ...`
5. Copiar o token (a parte depois de "Bearer ")

**Ou usar este comando:**
```bash
# Se você tem Clerk CLI instalado
clerk-cli token get
```

---

**Passo 2: Testar MCP endpoint com token**

```bash
# Salvar o token em variável
CLERK_TOKEN="cole_seu_token_aqui"

# Testar MCP endpoint
curl -X POST http://localhost:3000/mcp/http \
  -H "Authorization: Bearer $CLERK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
  }'
```

**Esperado**: Resposta MCP com lista de tools

**Se retornar 401**: Token inválido ou expirado - fazer login novamente

---

**Passo 3: Testar cada ferramenta MCP**

```bash
# Substituir TOKEN pelo seu token Clerk
TOKEN="seu_token_aqui"

# Tool 1: Get Current User
curl -X POST http://localhost:3000/mcp/http \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get-sauvia-user"}}'

# Tool 2: List Patients  
curl -X POST http://localhost:3000/mcp/http \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"list-patients","arguments":{"page":1}}}'
```

**✓ Checklist:**
- [ ] MCP endpoint retorna 200 com token válido
- [ ] MCP endpoint retorna 401 sem token
- [ ] Tools são listadas corretamente
- [ ] Cada tool responde com conteúdo esperado

---

### FASE 7: Integração Backend (20 min)

**Passo 1: Identificar routers no backend**

```bash
cd apps/backend

# Encontrar onde estão os routers
find . -name "*router*" -o -name "*routes*" | head -10

# Ou procurar por arquivos de rota
ls -la src/adapters/driving/api/routes/ 2>/dev/null || echo "Check your structure"
```

---

**Passo 2: Adicionar Clerk Auth a um router**

Encontre seu router principal e adicione:

```python
# No seu router (ex: src/adapters/driving/api/routes/auth.py)

from fastapi import Depends, APIRouter
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from src.adapters.driven.security.clerk_auth import verify_clerk_token

router = APIRouter(prefix="/auth", tags=["auth"])
security = HTTPBearer()

@router.get("/me")
async def get_current_user(credentials: HTTPAuthCredentials = Depends(security)):
    """Get current authenticated user from Clerk token"""
    user = verify_clerk_token(f"Bearer {credentials.credentials}")
    return {
        "user_id": user.get("sub"),
        "email": user.get("email"),
        "full_claims": user
    }
```

---

**Passo 3: Testar endpoint protegido**

Com backend rodando:

```bash
# Sem token (deve retornar 403)
curl http://localhost:8000/auth/me

# Com token válido
CLERK_TOKEN="seu_token_aqui"
curl -H "Authorization: Bearer $CLERK_TOKEN" http://localhost:8000/auth/me
```

**Esperado**:
- Sem token: HTTP 403 Forbidden
- Com token: HTTP 200 + user info JSON

**✓ Checklist:**
- [ ] Router importa verify_clerk_token
- [ ] HTTPBearer security scheme configurado
- [ ] GET /auth/me retorna 403 sem token
- [ ] GET /auth/me retorna user info com token válido

---

### FASE 8: Deploy (10 min)

**Passo 1: Git Commit**
```bash
cd sauvia-app

# Revisar mudanças
git status

# Add changes
git add -A

# Commit
git commit -m "feat: integrate Clerk auth and MCP server, remove Cognito"

# Push
git push origin main
```

---

**Passo 2: Deploy Web (Vercel)**
```bash
cd apps/web

# Adicionar env vars
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
vercel env add CLERK_SECRET_KEY
vercel env add NEXT_PUBLIC_API_URL

# Deploy
vercel deploy --prod
```

---

**Passo 3: Deploy Backend (ECS/Docker/seu host)**

Dependendo do seu setup:
```bash
# Build Docker image
cd apps/backend
docker build -t sauvia-backend:latest .

# Push para registry
docker tag sauvia-backend:latest YOUR_REGISTRY/sauvia-backend:latest
docker push YOUR_REGISTRY/sauvia-backend:latest

# Deploy no seu container service
# (específico do seu setup: ECS, Docker Swarm, Kubernetes, etc)
```

---

### FASE 9: Validação em Produção (5 min)

```bash
# Testar endpoints em produção
curl https://api.sauvia.com.br/.well-known/oauth-protected-resource/mcp

# Testar login
# Abrir https://app.sauvia.com.br
# Fazer login com Clerk
# Verificar se funciona
```

**✓ Checklist**:
- [ ] Web acessível em https://app.sauvia.com.br
- [ ] Backend respondendo em https://api.sauvia.com.br
- [ ] Clerk login funcionando
- [ ] MCP endpoints públicos respondendo

---

## ✅ RESUMO DAS FASES

| Fase | Descrição | Tempo | Status |
|------|-----------|-------|--------|
| 1 | Coletar informações (Clerk keys) | 5 min | ⏳ |
| 2 | Preparar ambiente (.env files) | 10 min | ⏳ |
| 3 | Instalar dependências | 10 min | ⏳ |
| 4 | Testar backend localmente | 15 min | ⏳ |
| 5 | Testar frontend localmente | 15 min | ⏳ |
| 6 | Testar MCP server | 10 min | ⏳ |
| 7 | Integração backend + teste | 20 min | ⏳ |
| 8 | Git commit + Deploy | 10 min | ⏳ |
| 9 | Validação produção | 5 min | ⏳ |
| **TOTAL** | | **100 min** | |

---

## 🚨 TROUBLESHOOTING RÁPIDO

### ❌ "ModuleNotFoundError: No module named 'cryptography'"
```bash
cd apps/backend
pip install cryptography==42.0.0 --force-reinstall
```

### ❌ ".well-known endpoints retornam 404"
```bash
# Verificar que arquivos existem
ls apps/web/src/app/.well-known/oauth-*/route.ts

# Rebuild Next.js
cd apps/web
pnpm build
pnpm dev
```

### ❌ "Token inválido" do backend
- Verificar token não expirou (tokens Clerk expiram em ~24h)
- Verificar `CLERK_JWT_KEY` está correto no `.env`
- Tentar fazer login novamente no browser

### ❌ MCP endpoint retorna 401
- Verificar token é válido e não expirou
- Verificar formato: `Bearer eyJ...`
- Verificar Clerk keys estão corretos

### ❌ "Cannot find module '@clerk/mcp-tools'"
```bash
cd apps/web
pnpm install @clerk/mcp-tools mcp-handler
```

---

## 🎯 SUCESSO = QUANDO VOCÊ TEM

✅ Backend iniciado sem erros  
✅ Frontend iniciado sem erros  
✅ Endpoints .well-known retornam JSON  
✅ MCP server responde com lista de tools  
✅ Backend verifica tokens Clerk  
✅ Tudo deployado em produção  

---

## 📞 PRÓXIMOS PASSOS

**Imediatamente após sucesso:**
1. ✅ Testar com Claude Desktop
2. ✅ Conectar MCP server no Claude
3. ✅ Executar um comando: "List my patients"

**Esta semana:**
1. ✅ Monitorar logs
2. ✅ Ajustar tools conforme necessário
3. ✅ Treinar equipe

**Este mês:**
1. ✅ Deletar Cognito do AWS (economizar $50-100/mês)
2. ✅ Criar custom tools adicionais
3. ✅ Integração com Zapier/n8n

---

**Estimado: 60-100 minutos para production completo! 🚀**

Comece pela FASE 1 agora!
