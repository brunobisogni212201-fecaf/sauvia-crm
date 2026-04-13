# 🚀 Sauvia MVP — Plano de 14 Dias

**Versão:** 1.0
**Data:** 2026-04-12
**Prazo:** 2 semanas (Dia 14 = Deploy)
**Modelo:** SaaS Multi-tenant
**Status:** EM EXECUÇÃO

---

## 📊 Escopo (Cortado e Viável)

### ✅ O que ENTRA
- Auth multi-tenant (Clerk)
- Cadastro de pacientes (CRUD)
- Agenda / Consultas
- Plano alimentar (básico)
- Biblioteca de vídeos (S3 simples)
- Prontuário criptografado (PDF + anotações)
- WhatsApp (notificação consulta)

### ❌ O que SAI (v2+)
- Streaming Go/HLS → Usa S3 direto
- Integração Memed → v2
- Dados estruturados avançados → v2

---

## 📅 Cronograma Detalhado (14 dias)

### **SEMANA 1: FUNDAÇÃO**

#### **Dias 1-2: Setup + Auth**
**Objetivo:** Ter login/register funcional em todas as 3 plataformas

**Backend (FastAPI)**
- [ ] Projeto base com SQLAlchemy
- [ ] Tabela `tenants` (id, slug, name)
- [ ] Tabela `users` (id, tenant_id, email, password_hash)
- [ ] Integração Clerk JWT (validar token Clerk no FastAPI)
- [ ] Endpoint `/api/v1/auth/me` (retorna user + tenant)

**Frontend (Next.js)**
- [ ] Setup Clerk (ID + Secret)
- [ ] Página `/login` e `/register`
- [ ] Middleware que redireciona não-auth
- [ ] Conexão ao FastAPI com Clerk token

**Mobile (Expo)**
- [ ] Setup Clerk no React Native
- [ ] Tela de login/register
- [ ] Armazenar token no AsyncStorage
- [ ] Fazer request ao FastAPI com token

**Deploy**
- [ ] Render: FastAPI pronto
- [ ] Vercel: Next.js pronto
- [ ] Expo: Testado localmente com `expo start`

**Checkpoint Dia 2:** Todo mundo consegue fazer login e ver `/dashboard` ou `/home` vazio.

---

#### **Dias 3-5: Módulo Pacientes**
**Objetivo:** CRUD completo de pacientes

**Banco de dados**
- [ ] Tabela `patients` (id, tenant_id, name, email, phone, data_nascimento, documento, created_at)
- [ ] Índices em (tenant_id, created_at)

**Backend (FastAPI)**
```
GET    /api/v1/patients                (list, paginated)
POST   /api/v1/patients                (create)
GET    /api/v1/patients/{id}           (detail)
PUT    /api/v1/patients/{id}           (update)
DELETE /api/v1/patients/{id}           (soft delete)
```

**Frontend (Next.js)**
- [ ] Página `/patients` (lista com tabela)
- [ ] Modal/página `/patients/new` (criar)
- [ ] Modal/página `/patients/{id}` (editar)
- [ ] Botão deletar com confirmação

**Mobile (Expo)**
- [ ] Tela de lista de pacientes (FlatList)
- [ ] Tela de criar paciente
- [ ] Tela de detalhe (tap na lista)

**Checkpoint Dia 5:** Consegue criar 5 pacientes fake e listar em todos os 3 apps.

---

#### **Dias 6-7: Módulo Agenda / Consultas**
**Objetivo:** Agendamento básico sem recorrência

**Banco de dados**
- [ ] Tabela `appointments` (id, tenant_id, patient_id, nutritionist_id, scheduled_for, duration, status, notes, created_at)
- [ ] Status: pending, confirmed, canceled, completed

**Backend (FastAPI)**
```
GET    /api/v1/appointments            (list, com filtro por patient_id ou data)
POST   /api/v1/appointments            (create)
GET    /api/v1/appointments/{id}       (detail)
PUT    /api/v1/appointments/{id}       (update status, notes)
DELETE /api/v1/appointments/{id}       (cancel)
POST   /api/v1/appointments/{id}/send-whatsapp (trigger notificação)
```

**Frontend (Next.js)**
- [ ] Página `/appointments` (calendário + lista)
- [ ] Modal criar consulta (paciente + data/hora)
- [ ] Integração com biblioteca de calendário (ex: react-big-calendar)

**Mobile (Expo)**
- [ ] Tela de calendário do paciente (suas consultas agendadas)
- [ ] Notificação de "Consulta em 1 dia" (background task)

**WhatsApp (Evolution API)**
- [ ] Webhook quando consulta criada → mensagem ao paciente
- [ ] Template: "Olá [patient], você tem consulta em [data]"

**Checkpoint Dia 7:** Cria consulta no app, paciente recebe WhatsApp, vê no app.

---

### **SEMANA 2: DIFERENCIAL + DEPLOY**

#### **Dias 8-9: Biblioteca de Vídeos**
**Objetivo:** Upload de vídeos, armazenar S3, exibir no app

**Banco de dados**
- [ ] Tabela `videos` (id, tenant_id, title, description, s3_key, duration, created_at)
- [ ] Tabela `video_prescriptions` (id, patient_id, video_id, prescribed_at)

**Backend (FastAPI)**
```
GET    /api/v1/videos                  (list biblioteca)
POST   /api/v1/videos/upload           (presigned URL S3)
GET    /api/v1/patients/{id}/videos    (vídeos prescritos)
POST   /api/v1/patients/{id}/videos    (prescrever vídeo)
DELETE /api/v1/videos/{id}             (deletar)
```

**Frontend (Next.js)**
- [ ] Página `/videos` (biblioteca com upload)
- [ ] Formulário: title, description, file
- [ ] Listar vídeos com botão "Prescrever para paciente X"

**Mobile (Expo)**
- [ ] Tela `/patient/{id}/videos` (vídeos prescritos)
- [ ] Player nativo (react-native-video)
- [ ] Botão play → abre player fullscreen

**S3 Setup**
- [ ] Bucket `sauvia-videos`
- [ ] Presigned URL para upload (expires 1h)
- [ ] CloudFront (optional, para CDN)

**Checkpoint Dia 9:** Upload vídeo, vê na biblioteca, prescreve pro paciente, paciente vê no mobile.

---

#### **Dias 10-11: Prontuário Criptografado**
**Objetivo:** Upload PDF + anotações, criptografia básica

**Banco de dados**
- [ ] Tabela `patient_records` (id, patient_id, title, s3_key_encrypted, is_encrypted, created_at, updated_at)
- [ ] Tabela `patient_notes` (id, patient_id, content, created_at, updated_at)
- [ ] Dados estruturados básicos: peso, altura, PA (Pressure), imc (campos na tabela patients ou nova tabela)

**Backend (FastAPI)**
```
# Uploads criptografados
POST   /api/v1/patients/{id}/records       (upload PDF + criptografa)
GET    /api/v1/patients/{id}/records       (list, descriptografa ao retornar)
DELETE /api/v1/patients/{id}/records/{rid} (deletar)

# Anotações
POST   /api/v1/patients/{id}/notes         (criar nota)
GET    /api/v1/patients/{id}/notes         (list)
PUT    /api/v1/patients/{id}/notes/{nid}   (editar)

# Dados estruturados
PUT    /api/v1/patients/{id}/vitals        (peso, altura, PA)
GET    /api/v1/patients/{id}/vitals        (histórico)
```

**Criptografia**
```python
from cryptography.fernet import Fernet
import os

# Em .env: ENCRYPTION_KEY = Fernet.generate_key()
cipher = Fernet(os.getenv("ENCRYPTION_KEY"))
encrypted = cipher.encrypt(file_bytes)
# Armazenar encrypted em S3
decrypted = cipher.decrypt(encrypted)  # ao retornar
```

**Frontend (Next.js)**
- [ ] Página `/patients/{id}/records` (upload + anotações)
- [ ] Upload arrastar PDF
- [ ] Campo de anotações livre
- [ ] Campos de peso/altura/PA com histórico

**Mobile (Expo)**
- [ ] Tela `/patient/{id}/health` (vitals + anotações)
- [ ] Botão "Adicionar nota"

**Checkpoint Dia 11:** Upload PDF, criptografa, vê na plataforma, edita anotações.

---

#### **Dias 12-13: Polimento + Links Extras**
**Objetivo:** Melhorar UX, design final, deploy

**Frontend (Next.js)**
- [ ] Aplicar design do Pencil (4 telas + home)
- [ ] Responsividade (mobile/tablet/desktop)
- [ ] Loading states e error handling
- [ ] Toast notifications (ex: "Paciente criado!")

**Mobile (Expo)**
- [ ] Aplicar design do Pencil
- [ ] Navegação (Tab Navigator)
- [ ] Deep links (ex: `sauvia://patient/123`)

**Dashboard**
- [ ] Página `/dashboard` com stats (X pacientes, Y consultas próximas, Z vídeos)
- [ ] Cards informativos

**Documentação**
- [ ] README de como fazer deploy
- [ ] .env.example preenchido
- [ ] Guia de setup Clerk

**Checkpoint Dia 13:** App pronto pra usar, design implementado, pronto pra ir ao ar.

---

#### **Dia 14: Deploy Final + Buffer**
**Objetivo:** Tudo rodando em produção

**Deploy Checklist**
- [ ] FastAPI em Render (variáveis de ambiente corretas)
- [ ] Next.js em Vercel (variáveis de ambiente corretas)
- [ ] Mobile EAS build (uma vez, testado localmente)
- [ ] Testes manuais: criar paciente, agendar, receber WhatsApp
- [ ] Bug fixes críticos
- [ ] Documentação final

**Pronto pra demo!**

---

## 🛠️ Stack Confirmado (MVP)

```
Frontend:
  - Next.js 16 (App Router)
  - Tailwind CSS 4
  - Clerk Auth
  - react-big-calendar (agenda)
  - Lucide React (ícones)

Backend:
  - FastAPI (Python 3.11)
  - SQLAlchemy + asyncpg
  - Pydantic (DTOs)
  - cryptography (Fernet)
  - httpx (HTTP client para WhatsApp)

Mobile:
  - React Native + Expo
  - Clerk Auth
  - @react-navigation (routing)
  - react-native-video (player)
  - AsyncStorage (local state)

Infraestrutura:
  - Clerk (auth SaaS)
  - PostgreSQL (AWS RDS)
  - Redis (AWS ElastiCache) — optional
  - S3 (AWS, vídeos/PDFs)
  - Evolution API (WhatsApp)
  - Render (backend)
  - Vercel (frontend)
  - Expo (mobile)
```

---

## 📝 Daily Standup (5 min)

**Formato:**
1. O que eu fiz ontem?
2. O que vou fazer hoje?
3. Tenho algum bloqueio?

**Exemplo Dia 3:**
```
✅ Fiz: Tabela patients criada, endpoints GET/POST funcionando
⏭️ Hoje: Listar pacientes no frontend (tabela)
🚧 Bloqueio: Paginar resultados — vou usar offset/limit
```

---

## 🚨 Sinais de Aviso (STOP e reavaliar)

- Dia 5 termina sem CRUD de pacientes funcional → corta features não-essenciais
- Dia 10 sem prontuário iniciado → deixa criptografia básica, foca em upload
- Dia 13 sem testes manuais → chama alguém pra testar enquanto você corrige bugs

---

## 🎯 Sucesso =

**No Dia 14:**
- Nutritionist consegue:
  1. Logar (Clerk)
  2. Criar 5 pacientes
  3. Agendar 2 consultas
  4. Pacientes recebem WhatsApp
  5. Upload 1 vídeo, prescrever
  6. Upload 1 PDF, escrever anotação

Se isso roda, **MVP está aprovado.**

---
