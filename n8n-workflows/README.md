# Workflows n8n - Sauvia CRM

## Visão Geral

Este diretório contém os workflows de automação do n8n que se integram ao Sauvia CRM.

## Como Importar

1. Acesse o painel do n8n (`n8n.dev.sauvia.com.br`)
2. Vá em **Workflows** → **Import from File**
3. Selecione o arquivo JSON do workflow desejado

## Workflows Disponíveis

### 1. Cadastro Nutricionista (`01-cadastro-nutricionista.json`)
- **Trigger:** Webhook POST `/cadastro-nutricionista`
- **Ações:**
  - Criar usuário no banco de dados
  - Enviar email de boas-vindas via AWS SES
  - Enviar mensagem de boas-vindas via WhatsApp

### 2. Agendamento de Consulta (`02-agendamento-consulta.json`)
- **Trigger:** Webhook POST `/agendamento`
- **Ações:**
  - Criar agendamento no banco
  - Buscar dados do paciente
  - Enviar confirmação via WhatsApp

### 3. Lembretes Diários (`03-lembretes-diarios.json`)
- **Trigger:** Schedule (todo dia às 9h)
- **Ações:**
  - Buscar consultas do dia seguinte
  - Enviar lembrete via WhatsApp para cada paciente

### 4. Base de Conhecimento WhatsApp (`04-base-conhecimento-whatsapp.json`)
- **Trigger:** Webhook POST `/whatsapp-kb`
- **Ações:**
  - Detectar palavras-chave na mensagem
  - Buscar artigos relevantes no banco
  - Enviar artigos encontrados via WhatsApp

### 5. Automação de Suporte (`05-automacao-suporte.json`)
- **Trigger:** Webhook POST `/novo-ticket`
- **Ações:**
  - Criar ticket no banco
  - Verificar prioridade (urgente → notificar Slack)
  - Enviar email de confirmação

---

## Variáveis de Ambiente (no n8n)

Configure as seguintes variáveis no seu n8n:

```
FROM_EMAIL=noreply@sauvia.com.br
EVOLUTE_API_URL=http://evolute-api:8080
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx
```

---

## Webhooks para o Frontend

O Next.js pode chamar esses workflows:

```javascript
// Exemplo: criar agendamento via n8n
const response = await fetch('https://n8n.dev.sauvia.com.br/webhook/agendamento', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user-123',
    patientId: 'patient-456',
    dateTime: '2024-01-20T14:00:00Z',
    duration: 60,
    type: 'RETURN'
  })
})
```

---

## Próximos Passos

1. Configurar credenciais do AWS SES no n8n
2. Configurar credenciais do PostgreSQL no n8n
3. Configurar webhook da Evolute API
4. Testar cada workflow individualmente