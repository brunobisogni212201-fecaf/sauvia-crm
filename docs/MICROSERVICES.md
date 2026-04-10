# Sauvia CRM - Arquitetura de Microsserviços

## Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SAUVIA CRM - ARQUITETURA                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐               │
│  │   FRONTEND   │     │    MOBILE    │     │   N8N (Auto) │               │
│  │   (Vercel)   │     │   (Expo)     │     │   (Cloud)    │               │
│  └──────┬───────┘     └──────┬───────┘     └──────────────┘               │
│         │                    │                                           │
│         └────────┬───────────┘                                           │
│                  ▼                                                        │
│         ┌────────────────┐                                                 │
│         │   API GATEWAY  │                                                 │
│         │   (Optional)   │                                                 │
│         └────────┬───────┘                                                 │
│                  │                                                         │
│    ┌─────────────┼─────────────┬────────────────┐                         │
│    ▼             ▼             ▼                ▼                         │
│ ┌────────┐  ┌──────────┐  ┌─────────┐   ┌──────────┐                     │
│ │ Auth   │  │ Patients │  │ Appts   │   │ WhatsApp │                     │
│ │ Svc    │  │  Svc     │  │  Svc    │   │  Svc     │                     │
│ └────┬───┘  └────┬─────┘  └────┬────┘   └────┬─────┘                     │
│      │           │              │              │                          │
│      └───────────┴──────────────┴──────────────┘                          │
│                            │                                              │
│         ┌──────────────────┼──────────────────┐                           │
│         ▼                  ▼                  ▼                           │
│   ┌───────────┐     ┌───────────┐     ┌────────────┐                    │
│   │   RDS     │     │   Redis   │     │   S3       │                    │
│   │ Postgres  │     │ (Cache)   │     │ (Files)    │                    │
│   └───────────┘     └───────────┘     └────────────┘                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Estrutura de Microsserviços

```
sauvia-crm/
├── services/
│   ├── auth-service/          # Auth + Cognito (FastAPI)
│   │   ├── src/
│   │   │   ├── main.py
│   │   │   ├── config.py
│   │   │   ├── domain/
│   │   │   ├── application/
│   │   │   └── adapters/
│   │   ├── requirements.txt
│   │   ├── Dockerfile
│   │   └── Procfile
│   │
│   ├── patients-service/      # Gerenciamento pacientes
│   │   ├── src/
│   │   ├── requirements.txt
│   │   ├── Dockerfile
│   │   └── Procfile
│   │
│   ├── appointments-service/  # Agenda e consultas
│   │   ├── src/
│   │   ├── requirements.txt
│   │   ├── Dockerfile
│   │   └── Procfile
│   │
│   └── whatsapp-service/      # Integração WhatsApp
│       ├── src/
│       ├── requirements.txt
│       ├── Dockerfile
│       └── Procfile
│
├── apps/
│   ├── web/                   # Next.js Frontend (Vercel)
│   └── mobile/                # React Native Mobile (Expo)
│
├── shared/
│   ├── libs/                  # Bibliotecas compartilhadas
│   ├── proto/                # Protocol Buffers (se usado)
│   └── docker-compose.yml    # Desenvolvimento local
│
└── infra/
    ├── terraform/             # Infraestrutura como código
    └── kubernetes/            # K8s manifests (futuro)
```

## Configuração por Ambiente

### Desenvolvimento Local

```yaml
# docker-compose.yml
services:
  auth-service:
    build: ./services/auth-service
    ports: [8001:8000]

  patients-service:
    build: ./services/patients-service
    ports: [8002:8000]

  appointments-service:
    build: ./services/appointments-service
    ports: [8003:8000]

  postgres:
    image: postgres:15
    ports: [5432:5432]

  redis:
    image: redis:7
    ports: [6379:6379]
```

### Produção

| Componente       | Serviço                   | URL                                      |
| ---------------- | ------------------------- | ---------------------------------------- |
| Frontend         | Vercel                    | https://sauvia-app.vercel.app            |
| Mobile           | Expo                      | EAS Build                                |
| Auth API         | Render                    | https://sauvia-auth.onrender.com         |
| Patients API     | Render                    | https://sauvia-patients.onrender.com     |
| Appointments API | Render                    | https://sauvia-appointments.onrender.com |
| WhatsApp Service | EC2                       | http://ec2-ip:8080                       |
| Database         | AWS RDS                   | salvadb.catawsu2siuo...                  |
| Cache            | AWS ElastiCache / Upstash | TBD                                      |
| Files            | AWS S3                    | TBD                                      |

## Próximos Passos

1. **Auth Service** - Extrair lógica de auth do backend atual
2. **Patients Service** - Separar em microsserviço independente
3. **Appointments Service** - Criar serviço dedicado
4. **WhatsApp Service** - Criar Evolution API wrapper

## Decisões Técnicas

### Por que não API Gateway agora?

- Adiciona complexidade desnecessária para MVP
- Render já fornece load balancing básico

### Quando usar API Gateway?

- Quando houver 3+ serviços
- Precisarem de rate limiting
- Precisarem de caching centralizado

### Comunicação entre serviços

- **Síncrona**: REST/gRPC para operações principais
- **Assíncrona**: AWS SQS/SNS para eventos (futuro)
