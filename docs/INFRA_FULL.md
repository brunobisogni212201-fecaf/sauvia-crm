# ========================================

# SAUVIA - CONFIGURAÇÃO COMPLETA DE INFRAESTRUTURA

# ========================================

# Generated: 2026-04-10

## 📋 RESUMO DOS SERVIÇOS CONFIGURADOS

### ✅ JA CONFIGURADO

| Serviço               | Status          | Endpoint/Detalhes                                                 |
| --------------------- | --------------- | ----------------------------------------------------------------- |
| **RDS PostgreSQL**    | Iniciando       | `sauviadb.catawsu2siuo.us-east-1.rds.amazonaws.com`               |
| **ElastiCache Redis** | Criando         | `sauvia-redis` (2 nodes, Multi-AZ)                                |
| **Cognito**           | ✅ Ativo        | Pool: `us-east-1_Zftb4N8wn`, Client: `2fs7g0dd2c7rp3n4aas53c18p0` |
| **Vercel**            | ✅ Deploy ok    | `https://sauvia-app.vercel.app`                                   |
| **Backend (FastAPI)** | ✅ OAuth pronto | `apps/backend/src/adapters/driving/api/v1/oauth_router.py`        |

### ⚠️ PRECISA CONFIGURAR

| Serviço                   | Ação Necessária                       |
| ------------------------- | ------------------------------------- |
| **Cloudflare DNS**        | Criar registros para `sauvia.qzz.io`  |
| **S3 Bucket**             | Criar manualmente (sem permissão IAM) |
| **SES Email**             | Verificar email manualmente           |
| **Cognito Client Secret** | Obter do console                      |

---

## 🌐 CLOUDFLARE - CONFIGURAÇÃO DNS

### Para configurar, você precisa:

1. **Gerar Token API no Cloudflare**:
   - Acesse: https://dash.cloudflare.com/profile/api-tokens
   - Create Custom Token
   - Permissões:
     - Zone: Read
     - Zone: Edit
     - DNS: Read
     - DNS: Edit
   - Copie o token

2. **Registros DNS a criar**:

   ```
   # Frontend (Vercel)
   Type: A
   Name: sau via
   Content: 76.76.21.21
   Proxy: true

   # Backend (Render)
   Type: CNAME
   Name: api
   Content: [seu-backend].onrender.com
   Proxy: true

   # Redirect www
   Type: CNAME
   Name: www
   Content: sauvia.qzz.io
   Proxy: true
   ```

3. **SSL/TLS**:
   - Mode: Full (strict)
   - Automatic HTTPS Rewrites: ON

---

## 🚀 VERCEL + RENDER + AWS - INTEGRAÇÃO

### URLs de Produção:

```
Frontend (Vercel):    https://sauvia.qzz.io
Backend (Render):     https://api.sauvia.qzz.io
Mobile (Expo):        exp://sauvia.qzz.io (ou EAS)

API Base:             https://api.sauvia.qzz.io/api/v1
Health:              https://api.sauvia.qzz.io/health
Docs:                https://api.sauvia.qzz.io/docs
```

### Fluxo de Autenticação:

```
User -> Vercel (Frontend) -> Render (Backend) -> Cognito
                            -> RDS (PostgreSQL)
                            -> ElastiCache (Redis)
                            -> S3 (Files)
                            -> SES (Email)
```

---

## 📱 MOBILE - EXPO

### Configuração (já aplicada):

- Bundle ID: `com.sauvia.app`
- Scheme: `sauvia`
- Splash: verde (#006b2c)

### Para build de produção:

```bash
cd apps/mobile
npx expo build:android --release
npx expo build:ios --release
```

### Para EAS Build (recomendado):

```bash
npx eas login
npx eas configure
npx eas build --platform ios --profile production
```

---

## 🔧 PRÓXIMOS PASSOS

1. **Obter Cloudflare API Token** (novo)
2. **Configurar DNS no Cloudflare**
3. **Obter Cognito Client Secret**
4. **Fazer deploy do backend no Render**
5. **Atualizar .env com URLs definitivas**
6. **Configurar S3 e SES manualmente**

---

## 📁 ARQUIVOS CRIADOS

- `.env.production` - Variáveis de produção
- `apps/backend/src/adapters/driving/api/v1/oauth_router.py` - Router OAuth
- `apps/backend/requirements.txt` - Dependências atualizadas
- `apps/backend/Procfile` - Deploy no Render
- `render.yaml` - Blueprint do Render
- `docs/MICROSERVICES.md` - Arquitetura de microsserviços
- `docs/DNS_CONFIG.md` - Script de configuração DNS
- `docs/INFRA_FULL.md` - Este arquivo
