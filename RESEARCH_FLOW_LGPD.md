# 🔬 Sauvia — Fluxo de Pesquisa de Mercado com LGPD

> **Objetivo:** Validar disposição de pagamento e dores reais de nutricionistas no Estado de SP  
> **Universo:** Nutricionistas ativos no Estado de São Paulo (~18.000 profissionais registrados no CRN-3)  
> **Amostra mínima significativa:** 385 respostas completas (IC 95%, margem 5%)  
> **Metodologia:** Opt-in LGPD → Pesquisa quantitativa + qualitativa → Beta access como incentivo  
> **Versão:** 1.0 — Abril 2026

---

## 1. Visão Geral do Funil

```
Lead Gerado
    ↓
[Email 1] Autorização LGPD — opt-in explícito
    ↓
┌── NÃO → Arquivado (sem follow-up, LGPD)
└── SIM → Aguarda 48h
           ↓
        [Email 2] Envio da Pesquisa
           ↓
     ┌── Respondeu 100% → Beta App Gratuito 6 meses ✅
     └── Parou no meio ou não abriu
              ↓
           [Email 3] Cadência Reforço (48h após email 2)
              ↓
           [Email 4] Final Urgência (72h após email 3)
              ↓
           Archivado após 7 dias sem resposta
```

---

## 2. Origem dos Leads

**Fontes para captura:**
- LinkedIn (busca por "nutricionista" + localização SP)
- Instagram (bio com CRN-3)
- Google Maps (consultórios de nutrição SP)
- CFN / CRN-3 (dados públicos de profissionais ativos)
- Indicação direta (snowball sampling)

**Dados necessários por lead:**
- Nome completo
- Email profissional
- Cidade (SP interior ou capital)
- Fonte de origem (para tracking)

---

## 3. Emails da Cadência

---

### 📧 Email 1 — Autorização LGPD (Opt-In)

**Assunto:** `Posso te mandar uma pesquisa sobre nutrição digital? (1 pergunta)`  
**Remetente:** `Bruno Bisogni <pesquisa@sauvia.com.br>`  
**Timing:** Envio imediato após lead gerado

---

**Corpo:**

> Oi, [NOME]!
>
> Me chamo Bruno, cofundador da Sauvia — estamos construindo um CRM para nutricionistas aqui no Brasil.
>
> Antes de qualquer coisa, quero fazer isso do jeito certo: posso te enviar uma pesquisa rápida (5 minutos) sobre como você gerencia seus pacientes hoje?
>
> Todos os dados são anônimos, usados apenas para desenvolvimento do produto, e você pode cancelar a qualquer momento — conforme a LGPD.
>
> → **[SIM, PODE MANDAR]**  _(botão verde)_
> → **[NÃO, OBRIGADO]**  _(link texto)_
>
> Abraços,  
> Bruno Bisogni  
> Sauvia — CRM para Nutricionistas  
> pesquisa@sauvia.com.br

---

**Tracking:**
- `?utm_source=leadlist&utm_medium=email&utm_campaign=lgpd_optin&lead_id={{ID}}`
- Evento: `optin_yes` / `optin_no`
- Se `optin_yes` → status do lead = `AUTHORIZED`, aguardar 48h para email 2
- Se `optin_no` → status = `OPTED_OUT`, nunca mais contatar
- Sem resposta em 7 dias → status = `NO_RESPONSE`, arquivar

---

### 📧 Email 2 — Envio da Pesquisa (apenas quem disse SIM)

**Assunto:** `Sua pesquisa está aqui — 5 min que te dão acesso ao beta`  
**Timing:** 48 horas após confirmação do opt-in

---

**Corpo:**

> Oi, [NOME]! Obrigado por aceitar participar 🙏
>
> A pesquisa tem 18 perguntas e leva em média **5 minutos**.
>
> **Por que vale responder:**  
> Todos que completarem 100% ganham **acesso gratuito por 6 meses ao beta do Sauvia** — sem cartão de crédito, sem compromisso.
>
> Suas respostas moldam diretamente como construímos o produto. Literalmente.
>
> → **[RESPONDER PESQUISA AGORA]**
>
> A pesquisa fica disponível por **7 dias** a partir de hoje.
>
> Abraços,  
> Bruno

---

**Tracking:**
- Link com `?lead_id={{ID}}&email_sequence=2`
- Evento: `survey_opened` / `survey_completed` / `survey_partial_{{last_question}}`

---

### 📧 Email 3 — Cadência Reforço (quem abriu mas não completou)

**Assunto:** `Você começou... faltam só [X] perguntas para ganhar o beta`  
**Timing:** 48 horas após email 2, apenas para `survey_partial` ou `survey_not_opened`

---

**Corpo:**

> Oi, [NOME]!
>
> Vi que você começou a pesquisa mas ainda não terminou — sem julgamento, a vida de nutricionista é corrida mesmo.
>
> Faltam só **[X perguntas restantes]** para você garantir o acesso gratuito de 6 meses.
>
> Pode continuar de onde parou:
>
> → **[CONTINUAR DE ONDE PAREI]**
>
> Se preferir começar do zero:  
> → [Responder desde o início]
>
> Abraços,  
> Bruno

---

**Variação para quem nem abriu o email 2:**

> Assunto: `[NOME], sua pesquisa expira em 5 dias`
>
> Oi, [NOME]! Semana passada te mandei uma pesquisa sobre gestão de pacientes.
>
> Ainda dá tempo de responder e garantir 6 meses gratuitos no beta.
>
> → **[ABRIR PESQUISA]**

---

### 📧 Email 4 — Urgência Final

**Assunto:** `Última chamada — pesquisa fecha amanhã às 23h59`  
**Timing:** 72 horas após email 3

---

**Corpo:**

> Oi, [NOME],
>
> A pesquisa fecha **amanhã, [DATA], às 23h59**.
>
> [X nutricionistas] já responderam e estão na lista do beta.
>
> Se você não responder até lá, infelizmente não conseguirei garantir seu acesso.
>
> → **[QUERO GARANTIR MEU ACESSO]**
>
> PS: São só 5 minutos. Prometo que vale.

---

## 4. Frase Introdutória no Site (Landing da Pesquisa)

**URL:** `sauvia.com.br/pesquisa`

**Bloco hero acima do formulário:**

---

> ### Por que estamos fazendo esta pesquisa?
>
> Estamos construindo o Sauvia do zero — e queremos construir **com** nutricionistas, não **para** nutricionistas.
>
> Esta pesquisa leva 5 minutos e responde uma pergunta simples:  
> **"Qual é a maior dor de quem trabalha com nutrição no Brasil hoje?"**
>
> Todos os dados são completamente anônimos. Nenhuma informação pessoal sua será compartilhada. Conforme a LGPD, você pode solicitar exclusão a qualquer momento em `privacidade@sauvia.com.br`.
>
> **Quem completar 100% das perguntas ganha 6 meses de acesso gratuito ao beta.**

---

## 5. Regras de Acesso ao Beta

| Condição | Ação |
|----------|------|
| Completou 100% da pesquisa | Email automático com link de cadastro beta + código exclusivo |
| Completou 80-99% | Acesso beta, mas sem prioridade de suporte |
| Completou < 80% | Sem acesso beta (mas pode solicitar na lista de espera) |
| Não completou após 4 emails | Status = COLD, nunca mais contatar |

**Email de confirmação de acesso beta:**

> Assunto: `🎉 Você está dentro — seu acesso beta ao Sauvia`
>
> Oi, [NOME]! Você completou a pesquisa e garantiu seu acesso.
>
> Seu código exclusivo: `BETA-{{UUID}}`
>
> Acesse: `sauvia.com.br/beta?code=BETA-{{UUID}}`
>
> O beta abre em [DATA]. Você será o primeiro a saber.

---

## 6. KPIs da Pesquisa — O que medir

### Bloco 1 — Perfil Profissional

| # | Pergunta | Tipo | Por que medir |
|---|----------|------|---------------|
| 1 | Qual seu regime de trabalho? | Select: Autônomo / CLT Clínica / Sócio / Outro | Segmenta persona (Ana Paula vs Dra. Carla) |
| 2 | Há quantos anos você atua como nutricionista? | Select: <2 / 2-5 / 5-10 / 10+ | Maturidade digital e disposição para mudar ferramenta |
| 3 | Qual sua principal especialidade? | Multi-select | Define verticais do produto |
| 4 | Em qual cidade você atua? | Text | Densidade geográfica para crescimento |
| 5 | Quantos pacientes ativos você tem hoje? | Select: <10 / 10-30 / 31-60 / 61-100 / 100+ | Define plano-alvo (Starter vs Pro vs Clínica) |

---

### Bloco 2 — Dores e Rotina Operacional (⭐ CRÍTICO)

| # | Pergunta | Tipo | KPI gerado |
|---|----------|------|-----------|
| 6 | Quantas horas por semana você gasta em tarefas administrativas? | Select: <1h / 1-3h / 3-5h / 5-10h / 10h+ | ROI do produto (horas economizadas) |
| 7 | Quais são suas 3 maiores dores hoje? | Multi-select ranqueado (drag) | Feature priority map |
| 8 | Como você envia planos alimentares hoje? | Multi-select: PDF manual / Word / Planilha / App / Outro | Gap de digitalização |
| 9 | Como você se comunica com pacientes? | Multi-select: WhatsApp pessoal / WhatsApp Business / Email / Telefone / App | Validação do módulo WhatsApp |
| 10 | Você usa alguma ferramenta de gestão hoje? | Select: Sim/Não → Se sim, qual? | Concorrência e benchmark |

**Opções para pergunta 7 (Principais Dores):**
- Montar planos alimentares é demorado
- Não tenho separação entre WhatsApp pessoal e profissional
- Perco tempo com lembretes e cobranças manuais
- Não tenho visão do progresso do paciente ao longo do tempo
- Controle financeiro é caótico
- Prontuários não são seguros
- Falta integração com receitas e cálculo nutricional
- Dificuldade em acompanhar múltiplos pacientes simultaneamente

---

### Bloco 3 — Poder de Pagamento (⭐⭐ FUNDAMENTAL — van Westendorp)

| # | Pergunta | Tipo | KPI gerado |
|---|----------|------|-----------|
| 11 | Qual valor você paga hoje em softwares/ferramentas de trabalho por mês? | Select: R$0 / R$1-50 / R$51-100 / R$101-200 / R$200+ | Benchmark atual |
| 12 | Pensando em uma ferramenta que resolve suas 3 maiores dores, qual valor seria **muito barato** (a ponto de desconfiar)? | Slider R$0-500 | Floor de preço psicológico |
| 13 | Qual valor seria **barato e bom negócio**? | Slider R$0-500 | Preço ótimo de entrada |
| 14 | Qual valor seria **caro mas ainda pagaria**? | Slider R$0-500 | Teto de aceitação |
| 15 | Qual valor seria **muito caro e você não pagaria**? | Slider R$0-500 | Hard ceiling |

> **Análise:** Cruzar as 4 respostas para encontrar o Acceptable Price Range (APR) e o Optimal Price Point (OPP). Validar se R$97 / R$197 / R$397 estão dentro do APR.

---

### Bloco 4 — Adoção Digital e IA

| # | Pergunta | Tipo | KPI gerado |
|---|----------|------|-----------|
| 16 | Como você se descreve digitalmente? | Select: Pouco digital / Moderado / Bastante digital / Early adopter | Segmentação de perfil |
| 17 | Você usaria IA para sugerir planos alimentares baseados no perfil do paciente? | Scale 1-5 (Jamais → Com certeza) | Validação feature Pro |
| 18 | O que mais te impediria de adotar uma nova ferramenta? | Multi-select: Preço / Curva de aprendizado / Migração de dados / Confiança na empresa / Já estou satisfeito | Objeções de venda |

---

### Bloco 5 — NPS Preventivo e Contato

| # | Pergunta | Tipo | KPI gerado |
|---|----------|------|-----------|
| (opc) | Você toparia uma call de 15 min para aprofundar? | Yes/No + campo telefone/WhatsApp | Geração de leads qualitativos |

---

## 7. KPIs de Análise Pós-Pesquisa

### Métricas do Funil de Emails

| Métrica | Target | Ação se abaixo |
|---------|--------|----------------|
| Taxa de abertura Email 1 | ≥ 45% | Testar subject line |
| Taxa de opt-in (SIM/total aberturas) | ≥ 35% | Melhorar copy do email 1 |
| Taxa de abertura Email 2 | ≥ 55% | Testar timing (48h vs 24h) |
| Taxa de início da pesquisa | ≥ 50% | Reduzir fricção da landing page |
| Taxa de conclusão (100%) | ≥ 65% | Reduzir número de perguntas |
| Taxa de reativação Email 3 | ≥ 20% | Personalizar deeplink |

### Métricas da Pesquisa em Si

| KPI | Benchmark esperado | Insight se diferente |
|-----|--------------------|---------------------|
| Horas/semana em admin | Esperado: 3-5h | >5h = oportunidade enorme de ROI |
| % usando ferramenta hoje | Esperado: 40-60% | <40% = mercado virgem |
| WTP (preço ótimo) | Esperado: R$80-120 | <R$80 = revisar plano Starter |
| Interesse em IA (≥4/5) | Esperado: 55-70% | <50% = não priorizar IA no MVP |
| Principal dor #1 | Esperado: WhatsApp ou PDF | Define feature de lançamento |

---

## 8. Ferramenta Recomendada para a Pesquisa

**Typeform** (plano básico R$99/mês) por:
- UI mobile-first (maioria abrirá no celular)
- Deeplink para continuar de onde parou (email 3)
- Integração nativa com n8n para automação da cadência
- Export CSV/JSON para análise
- Lógica condicional para adaptar fluxo por perfil

**Alternativa gratuita:** Google Forms + n8n para automação de emails

---

## 9. Integração Técnica

```
Lead Criado (PostgreSQL)
    ↓
n8n Workflow: "Research Cadence"
    ├── Trigger: novo lead com status = NEW
    ├── Action 1: enviar Email 1 via AWS SES
    ├── Wait for webhook: optin_yes / optin_no
    │       ├── optin_no → update lead status = OPTED_OUT, stop
    │       └── optin_yes → update status = AUTHORIZED
    ├── Wait 48h
    ├── Action 2: enviar Email 2 com link Typeform + lead_id
    ├── Wait for webhook: survey_completed / survey_partial
    │       └── survey_completed → enviar email beta access
    ├── Wait 48h (sem completion)
    ├── Action 3: enviar Email 3 (reforço)
    ├── Wait 72h
    └── Action 4: enviar Email 4 (urgência final)
```

**Webhooks Typeform → n8n:**
- `survey_started` → update lead.survey_status = IN_PROGRESS
- `survey_partial` → update lead.survey_last_question = N
- `survey_completed` → update lead.survey_status = COMPLETED, trigger beta email

---

*Documento criado como parte da estratégia de product-market fit do Sauvia — Abril 2026*
