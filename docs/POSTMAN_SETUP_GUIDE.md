# Sauvia CRM API - Guia Postman

## Configuração Inicial

### 1. Importar Collection

1. Abra o Postman
2. File → Import → selecione `docs/sauvia-crm-api-postman-collection.json`

### 2. Configurar Environment

1. Clique em **Environments** (sidebar)
2. Clique em **Import** → selecione `docs/sauvia-crm-api-postman-environment.json`
3. Ajuste a variável `baseUrl` se necessário:
   - Desenvolvimento: `http://localhost:8000`
   - Produção: `https://sauvia-crm-backend-service.onrender.com`

---

## Fluxo de Teste - passo a passo

### 1. Health Check

```
GET {{baseUrl}}/health
```

Retorna status da API.

---

### 2. Registrar Usuário (sem necessidade de confirmação)

**Endpoint:**

```
POST {{baseUrl}}/api/v1/auth/register
```

**Headers:**

```
Content-Type: application/json
```

**Body:**

```json
{
  "email": "bruno@oceanoazul.dev.br",
  "password": "Amor131313@",
  "name": "Bruno Bisogni",
  "cpf": "31603566805"
}
```

**Resposta esperada (200):**

```json
{
  "access_token": "pending_confirmation",
  "refresh_token": "pending_confirmation",
  "token_type": "bearer"
}
```

> ⚠️ **Nota**: O usuário precisa confirmar o email antes de fazer login.

---

### 3. Fazer Login (após confirmar email)

**Endpoint:**

```
POST {{baseUrl}}/api/v1/auth/login
```

**Headers:**

```
Content-Type: application/json
```

**Body:**

```json
{
  "email": "bruno@oceanoazul.dev.br",
  "password": "Amor131313@"
}
```

**Resposta esperada (200):**

```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "bearer"
}
```

**Copie o `access_token` e salve na variável `accessToken` do environment.**

---

### 4. Listar Pacientes (requer auth)

**Endpoint:**

```
GET {{baseUrl}}/api/v1/patients?page=1&page_size=20
```

**Headers:**

```
Authorization: Bearer {{accessToken}}
```

---

### 5. Criar Paciente (requer auth)

**Endpoint:**

```
POST {{baseUrl}}/api/v1/patients
```

**Headers:**

```
Content-Type: application/json
Authorization: Bearer {{accessToken}}
```

**Body:**

```json
{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "phone": "+5511999999999",
  "cpf": "12345678901",
  "birth_date": "1995-05-15",
  "gender": "female",
  "height": 1.6,
  "weight": 65.0,
  "goal": "Ganhar massa muscular",
  "address": {
    "street": "Rua das Flores",
    "city": "São Paulo",
    "state": "SP",
    "zip_code": "01234-567"
  },
  "emergency_contact": {
    "name": "João Silva",
    "phone": "+5511999999998",
    "relationship": "cônjuge"
  }
}
```

---

### 6. LGPD - Exportar Dados do Usuário

**Endpoint:**

```
GET {{baseUrl}}/api/v1/lgpd/export
```

**Headers:**

```
Authorization: Bearer {{accessToken}}
```

---

### 7. LGPD - Atualizar Consentimentos

**Endpoint:**

```
PUT {{baseUrl}}/api/v1/lgpd/consents
```

**Headers:**

```
Content-Type: application/json
Authorization: Bearer {{accessToken}}
```

**Body:**

```json
{
  "marketing": true,
  "analytics": false,
  "cookies": true
}
```

---

## Variáveis do Environment

| Variável       | Descrição           | Exemplo                                           |
| -------------- | ------------------- | ------------------------------------------------- |
| `baseUrl`      | URL base da API     | `https://sauvia-crm-backend-service.onrender.com` |
| `accessToken`  | Token de acesso JWT | (copiado após login)                              |
| `refreshToken` | Token de refresh    | (copiado após login)                              |
| `userId`       | ID do usuário       | (copiado após login)                              |

---

## Códigos de Status

| Código | Significado                              |
| ------ | ---------------------------------------- |
| 200    | Sucesso                                  |
| 201    | Criado com sucesso                       |
| 400    | Erro na requisição                       |
| 401    | Não autorizado (token inválido/expirado) |
| 404    | Recurso não encontrado                   |
| 500    | Erro interno do servidor                 |

---

## Dicas

1. **Salve o token**: Após fazer login, clique em "Save" para salvar o accessToken no environment
2. **Use variáveis**: Use `{{variableName}}` para reutilizar valores
3. **Teste incremental**: Siga a ordem: Health → Register → Login → Patients → LGPD
4. **Verifique erros**: Se receber 401, atualize o token de acesso
