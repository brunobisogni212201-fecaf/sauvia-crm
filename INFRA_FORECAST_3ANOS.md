# 📊 Sauvia — Forecast de Infraestrutura 3 Anos
## AWS vs GCP vs Azure · Por User · Por Plano · Tokens de IA

> **Versão:** 1.0 — Abril 2026  
> **Câmbio de referência:** USD/BRL = 5,10  
> **Premissas:** Multi-tenant, FastAPI backend, PostgreSQL, Redis, S3-equivalent, CDN  
> **IA:** Claude Haiku (Pro plan) / sem IA (Starter/Clínica base)

---

## 1. Premissas de Crescimento

### Projeção de Usuários Ativos (Nutricionistas Pagantes)

| Período | Usuários | Crescimento |
|---------|----------|-------------|
| MVP Launch (Mês 1-3) | 10–30 | — |
| Q4 Ano 1 | 150–300 | ~50/mês |
| Final Ano 1 | 300–500 | 15%/mês |
| Final Ano 2 | 1.500–3.000 | 20%/mês |
| Final Ano 3 | 5.000–15.000 | 15%/mês |

### Mix de Planos (premissa conservadora)

| Plano | Preço | % da Base | Receita/User |
|-------|-------|-----------|--------------|
| Starter | R$97 | 60% | ~$19/mês |
| Pro | R$197 | 30% | ~$39/mês |
| Clínica | R$397 | 10% | ~$78/mês |

> **Receita média por usuário (blended):** ~R$150/mês (~$29/mês)

---

## 2. Componentes de Infraestrutura

### Stack base (todos os clouds)

| Componente | Função |
|-----------|--------|
| Compute (Container) | FastAPI backend, Next.js frontend |
| Database (PostgreSQL) | Dados de pacientes, planos, prontuários |
| Cache (Redis) | Sessões, rate limit, filas n8n |
| Object Storage | PDFs prontuários, fotos, vídeos calistenia |
| CDN | Assets estáticos, vídeos, imagens |
| Load Balancer | Roteamento de tráfego |
| Email | AWS SES / SendGrid (custo fixo) |
| Secrets | Gerenciamento de credenciais |

---

## 3. Custo de Infra por Cloud — Ano 1 (300–500 users)

### 🟠 AWS (Stack Atual)

| Serviço | Config | Custo/mês |
|---------|--------|-----------|
| ECS Fargate (backend) | 2 tasks × 0.5 vCPU × 1GB | $30–50 |
| ECS Fargate (frontend) | 1 task × 0.25 vCPU × 512MB | $12–18 |
| RDS PostgreSQL | db.t3.micro → t3.small | $25–50 |
| ElastiCache Redis | cache.t4g.micro | $15–25 |
| S3 | 50GB storage + transfer | $5–15 |
| CloudFront | 100GB transfer/mês | $10–20 |
| ALB (1 consolidado) | — | $20–25 |
| SES (email) | 50k emails/mês | $5 |
| Secrets Manager | ~10 secrets | $4 |
| CloudWatch Logs | — | $5–10 |
| **TOTAL AWS** | | **$131–222/mês** |
| **Otimizado (Fargate Spot)** | -70% compute | **$80–150/mês** |

**Custo por usuário (400 users, otimizado):** ~$0,28/user/mês

---

### 🔵 GCP (Cloud Run + Cloud SQL)

| Serviço | Config | Custo/mês |
|---------|--------|-----------|
| Cloud Run (backend) | Pay-per-request, min 1 instance | $20–40 |
| Cloud Run (frontend) | Pay-per-request | $8–15 |
| Cloud SQL PostgreSQL | db-f1-micro → db-g1-small | $20–40 |
| Memorystore Redis | Basic 1GB | $25–35 |
| Cloud Storage | 50GB + transfer | $4–12 |
| Cloud CDN | 100GB | $8–15 |
| Cloud Load Balancing | — | $18–22 |
| Secret Manager | — | $1 |
| Cloud Logging | — | $3–8 |
| **TOTAL GCP** | | **$107–188/mês** |

**Custo por usuário (400 users):** ~$0,24/user/mês  
**Vantagem GCP:** Cloud Run escala para zero (ideal no MVP), billing por ms de execução.

---

### ⚪ Azure (Container Apps + Azure DB)

| Serviço | Config | Custo/mês |
|---------|--------|-----------|
| Container Apps (backend) | 2 replicas, 0.5 vCPU | $28–45 |
| Container Apps (frontend) | 1 replica | $10–18 |
| Azure Database PostgreSQL | Burstable B1ms | $25–45 |
| Azure Cache Redis | C0 Basic 250MB | $15–20 |
| Blob Storage | 50GB + transfer | $4–12 |
| Azure CDN | 100GB | $8–15 |
| Application Gateway | — | $22–30 |
| Key Vault | — | $1 |
| Log Analytics | — | $5–10 |
| **TOTAL Azure** | | **$118–196/mês** |

**Custo por usuário (400 users):** ~$0,26/user/mês

---

## 4. Scaling — Ano 2 (1.500–3.000 users)

### Mudanças de configuração necessárias

**AWS:**
- RDS: db.t3.small → db.t3.medium (+$50/mês)
- ECS: scale para 3-4 tasks (auto-scaling CPU 70%)
- S3: ~200GB (+$10/mês)
- CloudFront: 500GB transfer (+$40/mês)

| Cloud | Custo Ano 2 (2.000 users) | Por User |
|-------|---------------------------|----------|
| AWS (otimizado) | $200–350/mês | $0,13/user |
| GCP | $180–300/mês | $0,12/user |
| Azure | $195–320/mês | $0,12/user |

> **Economia de escala:** Custo por usuário cai 50% de Ano 1 para Ano 2.

---

## 5. Scaling — Ano 3 (5.000–15.000 users)

### Mudanças de arquitetura necessárias

- **Database:** RDS Multi-AZ + Read Replicas → db.r6g.large
- **Compute:** ECS Service Auto Scaling + Application Load Balancer por serviço
- **Storage:** S3 Intelligent Tiering (vídeos calistenia dominam)
- **Redis:** Cluster mode enabled
- **CDN:** Aumentar cache TTL, offload 80%+ do tráfego

| Cloud | Custo Ano 3 (8.000 users) | Por User |
|-------|---------------------------|----------|
| AWS | $800–1.500/mês | $0,10–0,19/user |
| GCP | $700–1.200/mês | $0,09–0,15/user |
| Azure | $750–1.300/mês | $0,09–0,16/user |

---

## 6. Custo de Tokens de IA (Por Plano)

### Plano Pro: Funcionalidades IA

| Feature IA | Tokens estimados/user/mês | Custo Haiku | Custo Sonnet |
|-----------|--------------------------|-------------|--------------|
| Sugestão de substituição alimentar | 8.000 tokens | $0,006 | $0,08 |
| Análise de adesão e recomendação | 5.000 tokens | $0,004 | $0,05 |
| Geração de variações do plano | 12.000 tokens | $0,009 | $0,12 |
| Resposta inteligente no chat | 10.000 tokens | $0,007 | $0,09 |
| Relatório automático de progresso | 6.000 tokens | $0,005 | $0,06 |
| **TOTAL Pro (Haiku)** | **41.000 tokens** | **~$0,031/user/mês** | — |
| **TOTAL Pro (Sonnet)** | **41.000 tokens** | — | **~$0,40/user/mês** |

> **Recomendação:** Claude Haiku para 90% das features, Sonnet apenas para relatórios mensais.  
> **Custo IA blended Pro:** ~$0,05/user/mês (imperceptível vs receita de $39/user).

### Plano Clínica: IA adicional

| Feature | Tokens extras | Custo adicional |
|---------|--------------|-----------------|
| Dashboard consolidado (4 nutris) | 15.000 | $0,012 |
| Alertas inteligentes de churn paciente | 5.000 | $0,004 |
| **TOTAL Clínica IA** | | **~$0,07/user/mês** |

---

## 7. Custo Total por Plano (Infra + IA)

### Ano 1 — 400 usuários (AWS otimizado)

| Plano | Receita/mês | Infra/mês | IA/mês | Total Custo | **Gross Margin** |
|-------|------------|-----------|--------|-------------|-----------------|
| Starter (R$97 ~$19) | $19 | $0,28 | $0 | $0,28 | **98,5%** |
| Pro (R$197 ~$39) | $39 | $0,28 | $0,05 | $0,33 | **99,2%** |
| Clínica (R$397 ~$78) | $78 | $0,35 | $0,07 | $0,42 | **99,5%** |
| **Blended** | $29 | $0,28 | $0,02 | $0,30 | **98,9%** |

> ⚡ **Insight crítico:** A infra representa menos de 1,5% da receita em todos os planos.  
> O custo dominante do negócio é **pessoal, não infraestrutura**.

### Ano 2 — 2.000 usuários

| Plano | Gross Margin (infra apenas) |
|-------|---------------------------|
| Starter | 99,3% |
| Pro | 99,5% |
| Clínica | 99,7% |

### Ano 3 — 8.000 usuários

| Plano | Gross Margin (infra apenas) |
|-------|---------------------------|
| Starter | 99,5% |
| Pro | 99,6% |
| Clínica | 99,8% |

---

## 8. Comparativo Total 3 Anos

### Total Investimento Infra (Acumulado 36 meses)

| Cloud | Ano 1 | Ano 2 | Ano 3 | Total 3 Anos | Custo em R$ |
|-------|-------|-------|-------|-------------|-------------|
| **AWS** (otimizado) | $1.200–1.800 | $2.400–4.200 | $9.600–18.000 | **$13.200–24.000** | ~R$67k–122k |
| **GCP** | $1.280–2.256 | $2.160–3.600 | $8.400–14.400 | **$11.840–20.256** | ~R$60k–103k |
| **Azure** | $1.416–2.352 | $2.340–3.840 | $9.000–15.600 | **$12.756–21.792** | ~R$65k–111k |

### Receita Projetada vs Custo de Infra

| Período | Receita Estimada | Custo Infra (AWS) | % da Receita |
|---------|-----------------|-------------------|-------------|
| Ano 1 (média 300 users) | R$540k/ano | R$12k/ano | **2,2%** |
| Ano 2 (média 2.000 users) | R$3,6M/ano | R$36k/ano | **1,0%** |
| Ano 3 (média 8.000 users) | R$14,4M/ano | R$144k/ano | **1,0%** |

---

## 9. Recomendação de Cloud por Fase

### MVP (Meses 1-6): AWS ✅ (manter atual)

**Motivo:** Stack já configurado, equipe conhece, RDS já existe. Otimizar ALBs (3→1) e usar Fargate Spot para reduzir de $131 para ~$80/mês. Não vale o custo de migração agora.

**Ação imediata de otimização:**
```bash
# Consolidar 3 ALBs em 1 — economia de ~$36/mês
# Usar Fargate Spot nas tasks não-críticas — economia de ~$25/mês
# Total: -$61/mês = -$732/ano sem mudar nenhum código
```

### Crescimento (Mês 7 → Ano 2): AWS ou GCP

Se a equipe crescer e tiver DevOps dedicado → **GCP** é 10-15% mais barato e tem melhor DX com Cloud Run.  
Se continuar equipe enxuta → **AWS** pela familiaridade.

**Break-even de migração AWS→GCP:**
- Custo de migração estimado: 2-3 semanas de DevOps = ~$3.000–5.000  
- Economia mensal GCP vs AWS: ~$20–40/mês  
- Payback: 75–250 meses ❌ Não compensa no MVP  

### Escala (Ano 3+): Reavaliar com dados reais

A partir de 5.000 usuários, negociar **Enterprise Discounts** com AWS (10-30% off) ou **GCP Committed Use** (até 55% off em Compute). A decisão muda completamente com volume.

---

## 10. Forecast de Storage — Vídeos de Calistenia

| Conteúdo | Tamanho estimado | Ano 1 | Ano 2 | Ano 3 |
|----------|-----------------|-------|-------|-------|
| Vídeos calistenia (biblioteca) | 500MB/vídeo × 100 vídeos | 50GB | 50GB | 100GB |
| Prontuários PDF por paciente | 500KB × 30 pacientes × 500 nutris | 7,5GB | 25GB | 75GB |
| Fotos progresso paciente | 200KB × 4/mês × 30 pac × 500 nutris | 12GB/mês | — | — |
| Total storage estimado | | ~70GB | ~200GB | ~500GB |
| **Custo S3 (AWS)** | $0,023/GB | **$1,6/mês** | **$4,6/mês** | **$11,5/mês** |

> **Vídeos de calistenia:** Hospedar na S3, servir via CloudFront com signed URLs (segurança). Custo de transfer CDN ~$0,085/GB. Para 1.000 usuários assistindo 5 vídeos/mês de 50MB = 250GB/mês = ~$21/mês em CDN.

---

## 11. Resumo Executivo

**O que este forecast prova:**

1. **Infraestrutura não é o problema** — custa menos de 2% da receita em qualquer escala.

2. **Manter AWS no MVP** — custo de migração não justifica. Otimizar ALBs e Fargate Spot agora para economizar ~$61/mês imediato.

3. **IA é quase gratuita** — Claude Haiku custa $0,03-0,07/user/mês mesmo com uso intensivo. Não limitar features de IA por medo de custo.

4. **O gargalo real de escala** será PostgreSQL e storage de vídeos/PDFs. Planejar Read Replicas e S3 Intelligent Tiering a partir de 2.000 usuários.

5. **Gross margin de infra ~99%** — o modelo de negócio é altamente escalável. O custo que importa é time, não servidor.

---

*Documento criado para planejamento estratégico do Sauvia — Abril 2026*
