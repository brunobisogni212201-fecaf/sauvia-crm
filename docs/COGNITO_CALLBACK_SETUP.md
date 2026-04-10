# 🔐 Como Configurar a URL de Callback no AWS Cognito

## URL de Callback para Sauvia

```
https://api.sauvia.com.br/api/v1/auth/callback
```

---

## Passo a Passo no Console AWS

### 1. Acesse o Cognito

- Vá para: https://us-east-1.console.aws.amazon.com/cognito/
- Selecione o User Pool: `us-east-1_Zftb4N8wn`

### 2. Configure o App Client

1. Clique em **App integration** → **App clients and analytics**
2. Selecione o client: `2fs7g0dd2c7rp3n4aas53c18p0`
3. Clique em **Edit** (ou **Edit callback URLs**)

### 3. Adicione as URLs de Callback

Adicione estas URLs (uma por linha):

```
https://api.sauvia.com.br/api/v1/auth/callback
http://localhost:3000/api/auth/callback
exp://localhost:8081
```

### 4. Configure o Allowed OAuth Flows

Em **OAuth flows**, selecione:

- ✅ Authorization code grant
- ⬜ Implicit grant

### 5. Configure os Allowed OAuth Scopes

Selecione:

- ✅ `openid`
- ✅ `email`
- ✅ `profile`

### 6. Salvar

Clique em **Save changes**

---

## URLs de Login (para testar)

### Web

```
https://us-east-1_Zftb4N8wn.auth.us-east-1.amazoncognito.com/login?client_id=2fs7g0dd2c7rp3n4aas53c18p0&response_type=code&scope=openid+email+profile&redirect_uri=https://api.sauvia.com.br/api/v1/auth/callback&state=web
```

### Mobile (Expo)

```
https://us-east-1_Zftb4N8wn.auth.us-east-1.amazoncognito.com/login?client_id=2fs7g0dd2c7rp3n4aas53c18p0&response_type=code&scope=openid+email+profile&redirect_uri=exp://localhost:8081&state=mobile
```

---

## Variáveis de Ambiente no Backend (Render)

No Dashboard do Render, configure estas variáveis:

| Variável                | Valor                                                                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `COGNITO_CLIENT_ID`     | `2fs7g0dd2c7rp3n4aas53c18p0`                                                                                                       |
| `COGNITO_USER_POOL_ID`  | `us-east-1_Zftb4N8wn`                                                                                                              |
| `COGNITO_REGION`        | `us-east-1`                                                                                                                        |
| `COGNITO_CLIENT_SECRET` | `1vgb8sjiu3j2tlkkg7b3epfcunhtda08iu6rdjmi75pr71s2gadv`                                                                             |
| `COGNITO_DOMAIN`        | `https://us-east-1_Zftb4N8wn.auth.us-east-1.amazoncognito.com`                                                                     |
| `AWS_ACCESS_KEY_ID`     | `AKIAQMLRP6G3SHI2AOFI`                                                                                                             |
| `AWS_SECRET_ACCESS_KEY` | `55VG2W5NSbHd9NByRYD84VMGGH2RZtSn4t3x7b6y`                                                                                         |
| `AWS_REGION`            | `us-east-1`                                                                                                                        |
| `DATABASE_URL`          | `postgresql+asyncpg://sauviauser:sqVKbxbiFUHmFP6nPW6k@sauviadb.catawsu2siuo.us-east-1.rds.amazonaws.com:5432/sauvia`               |
| `REDIS_URL`             | `redis://sauvia-redis.d6eflw.ng.0001.use1.cache.amazonaws.com:6379`                                                                |
| `SECRET_KEY`            | `1483e9de56ce5f9c16dcfda7072d46645728b66bde8f775165d43ecdc1f7e340dff4e215918f0759d64830c9a923c18dc0c448e511d03a7cf5deac703f3c9ea7` |
| `CORS_ORIGINS`          | `https://sauvia.qzz.io,https://sauvia-app.vercel.app,http://localhost:3000`                                                        |

---

## Testar o Login

Após configurar o Cognito:

1. **Frontend Web**: Acesse `https://sauvia-app.vercel.app`
2. **Backend**: `https://sauvia-crm-backend-service.onrender.com`
3. **API Docs**: `https://sauvia-crm-backend-service.onrender.com/docs`

O fluxo OAuth vai:

1. Usuário clica em "Login com Cognito"
2. Redireciona para Cognito com `state=web` ou `state=mobile`
3. Após login, Cognito retorna para `https://api.sauvia.com.br/api/v1/auth/callback`
4. Backend identifica o tipo (web/mobile) e redireciona corretamente
