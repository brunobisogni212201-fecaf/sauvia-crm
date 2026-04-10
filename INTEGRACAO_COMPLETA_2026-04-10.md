# 📋 Sauvia CRM - Resumo da Integração Completa

## Data: 10 de Abril de 2026

---

## 🎯 Objetivo Final

Criar um CRM completo para nutricionistas com:

- **Frontend**: Next.js 16 no Vercel
- **Backend**: FastAPI no Render
- **Mobile**: Expo (iOS/Android)
- **Auth**: AWS Cognito com OAuth centralizado
- **Dados**: AWS RDS PostgreSQL + ElastiCache Redis
- **Domínio**: sau via.qzz.io

---

## 🔗 Links dos Serviços

| Serviço          | URL                                                    | Status         |
| ---------------- | ------------------------------------------------------ | -------------- |
| **Frontend Web** | `https://sauvia-app.vercel.app`                        | ✅ Online      |
| **Backend API**  | `https://sauvia-crm-backend-service.onrender.com`      | ✅ Online      |
| **API Docs**     | `https://sauvia-crm-backend-service.onrender.com/docs` | ✅ Online      |
| **Domínio**      | `https://sauvia.qzz.io`                                | ✅ Configurado |

---

## 🏗️ Infraestrutura AWS

### RDS PostgreSQL (São Paulo)

- **Endpoint**: `sauviadb.catawsu2siuo.us-east-1.rds.amazonaws.com`
- **Porta**: 5432
- **Database**: sau via
- **Usuário**: sauviauser
- **Senha**: `sqVKbxbiFUHmFP6nPW6k`

### ElastiCache Redis (São Paulo)

- **Endpoint**: `sauvia-redis.d6eflw.ng.0001.use1.cache.amazonaws.com`
- **Porta**: 6379

### Cognito User Pool

- **Pool ID**: `us-east-1_Zftb4N8wn`
- **Client ID**: `2fs7g0dd2c7rp3n4aas53c18p0`
- **Client Secret**: `1vgb8sjiu3j2tlkkg7b3epfcunhtda08iu6rdjmi75pr71s2gadv`
- **Região**: us-east-1

### Credenciais AWS

- **Access Key**: `AKIAQMLRP6G3SHI2AOFI`
- **Secret Key**: `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`
- **Account ID**: `026544697783`

---

## 📁 Estrutura do Projeto

```
sauvia-crm/
├── apps/
│   ├── web/           # Next.js 16 (App Router)
│   ├── mobile/        # Expo SDK 55
│   └── backend/       # FastAPI (Python)
├── packages/
│   ├── ui/           # Design System
│   ├── ui-icons/     # Ícones
│   └── shared-types/ # Tipos TypeScript
├── docs/             # Documentação
├── render.yaml       # Deploy Backend
└── pnpm-workspace.yaml
```

---

## 🔐 Configuração OAuth (Callback Centralizado)

### URL de Callback

```
https://api.sauvia.com.br/api/v1/auth/callback
```

### Fluxo de Autenticação

1. **Web**: Login com `state=web` → Cognito → Callback → Backend → Redireciona para Frontend
2. **Mobile**: Login com `state=mobile` → Cognito → Callback → Backend → Deep link para App

### Variáveis no Render

| Variável                | Valor                                                                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `COGNITO_CLIENT_ID`     | `2fs7g0dd2c7rp3n4aas53c18p0`                                                                                                       |
| `COGNITO_USER_POOL_ID`  | `us-east-1_Zftb4N8wn`                                                                                                              |
| `COGNITO_REGION`        | `us-east-1`                                                                                                                        |
| `COGNITO_DOMAIN`        | `https://us-east-1_Zftb4N8wn.auth.us-east-1.amazoncognito.com`                                                                     |
| `AWS_ACCESS_KEY_ID`     | `AKIAQMLRP6G3SHI2AOFI`                                                                                                             |
| `AWS_SECRET_ACCESS_KEY` | `55VG2W5NSbHd9NByRYD84VMGGH2RZtSn4t3x7b6y`                                                                                         |
| `DATABASE_URL`          | `postgresql+asyncpg://sauviauser:sqVKbxbiFUHmFP6nPW6k@sauviadb.catawsu2siuo.us-east-1.rds.amazonaws.com:5432/sauvia`               |
| `REDIS_URL`             | `redis://sauvia-redis.d6eflw.ng.0001.use1.cache.amazonaws.com:6379`                                                                |
| `SECRET_KEY`            | `1483e9de56ce5f9c16dcfda7072d46645728b66bde8f775165d43ecdc1f7e340dff4e215918f0759d64830c9a923c18dc0c448e511d03a7cf5deac703f3c9ea7` |
| `CORS_ORIGINS`          | `https://sauvia.qzz.io,https://sauvia-app.vercel.app,http://localhost:3000`                                                        |

---

## 📱 Mobile (Expo)

### Configuração

- **Project ID EAS**: `461e7642-fc27-4813-9341-b76459b28fd4`
- **Bundle ID**: `com.sauvia.app`
- **API URL**: `https://sauvia-crm-backend-service.onrender.com/api/v1`

### Para Rodar no Emulador

```bash
cd apps/mobile
npx expo start --ios
```

### Para Build Android (EAS)

```bash
cd apps/mobile
npx eas build --platform android --profile preview
```

---

## 🌐 Frontend (Next.js + Vercel)

### Variáveis de Ambiente no Vercel

| Variável              | Valor                                                    |
| --------------------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | `https://sauvia-crm-backend-service.onrender.com/api/v1` |

### Páginas

- `/` - Landing Page
- `/design-system` - Showcase de componentes
- `/landing-client` - Landing para pacientes
- `/landing-nutritionist` - Landing para nutricionistas

---

## 🛠️ Comandos Úteis

### Desenvolvimento Local

```bash
# Web
cd apps/web && pnpm dev

# Mobile
cd apps/mobile && npx expo start --ios

# Backend
cd apps/backend && uvicorn src.main:app --reload
```

### Deploy

```bash
# Backend (Render) - automático ao fazer push para main
git push origin main

# Frontend (Vercel) - automático
git push origin main
```

---

## ✅ Checklist de Funcionalidades

- [x] Backend FastAPI no Render
- [x] Frontend Next.js no Vercel
- [x] Auth com AWS Cognito
- [x] Patients CRUD
- [x] LGPD endpoints (export, consent, delete)
- [x] Mobile Expo configurado
- [x] Splash screen configurada
- [x] RDS PostgreSQL conectado
- [x] ElastiCache Redis conectado
- [ ] Callback URL no Cognito (precisa configurar)
- [ ] Teste de login Web
- [ ] Teste de login Mobile
- [ ] Build Android no EAS

---

## 📝 Configurar Callback no Cognito

**Arquivo com instruções**: `docs/COGNITO_CALLBACK_SETUP.md`

### Resumo Rápido:

1. Acesse o Console AWS Cognito
2. Selecione o User Pool `us-east-1_Zftb4N8wn`
3. Vá em **App integration** → **App clients**
4. Edite o client `2fs7g0dd2c7rp3n4aas53c18p0`
5. Adicione em **Callback URLs**:
   ```
   https://api.sauvia.com.br/api/v1/auth/callback
   http://localhost:3000/api/auth/callback
   exp://localhost:8081
   ```
6. Em **OAuth flows**, selecione "Authorization code grant"
7. Em **OAuth scopes**, selecione: `openid`, `email`, `profile`
8. Salve

---

## 🚀 Próximos Passos

1. ✅ Configurar URL de callback no Cognito
2. ⏳ Testar login Web
3. ⏳ Testar login Mobile
4. ⏳ Fazer build Android no EAS
5. ⏳ Publicar na App Store / Play Store

---

## 📄 Arquivos Importantes

| Arquivo                          | Descrição                       |
| -------------------------------- | ------------------------------- |
| `CLAUDE.md`                      | Documentação técnica completa   |
| `docs/COGNITO_CALLBACK_SETUP.md` | Guia de configuração do Cognito |
| `AWS_SERVICES_INVENTORY.md`      | Inventário de recursos AWS      |
| `render.yaml`                    | Blueprint do Render             |

---

**Última atualização**: 2026-04-10
**Status**: Integração concluída, aguardando configuração do Cognito para testar login
