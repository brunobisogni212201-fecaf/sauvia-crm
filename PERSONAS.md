# 👥 Sauvia — Personas do Produto

> **Documento:** Product Management · Personas
> **Versão:** 1.0 · Abril 2026
> **Metodologia:** Jobs to be Done (JTBD) + Empathy Map + User Journey
> **Autor:** PM Sauvia

---

## Contexto Estratégico

O Sauvia serve **dois lados de um marketplace** com necessidades completamente diferentes:

- **Lado Oferta (B2B):** Nutricionistas que precisam de uma ferramenta para gerenciar seu negócio, reduzir trabalho operacional e entregar mais valor aos pacientes.
- **Lado Demanda (B2C):** Pacientes que buscam acompanhamento nutricional com mais praticidade, clareza e motivação para manter a jornada.

O produto só funciona quando **ambos os lados estão satisfeitos**: sem nutricionista engajado, o paciente não tem por que usar o app. Sem paciente ativo, o nutricionista não renova a assinatura.

---

## Mapa de Personas

| Persona | Lado | Plano Esperado | Prioridade |
|---------|------|---------------|------------|
| Ana Paula — Nutricionista Solo | B2B | Starter (R$97) | 🔴 Principal |
| Rafael — Nutri Esportivo | B2B | Pro (R$197) | 🟡 Secundária |
| Dra. Carla — Gestora de Clínica | B2B | Clínica (R$397) | 🟢 Terciária |
| Marcos — Paciente Ativo | B2C | Gratuito/Convite | 🔴 Principal |
| Fernanda — Paciente Comprometida | B2C | Gratuito/Convite | 🟡 Secundária |
| Carlos — Paciente Crônico | B2C | Gratuito/Convite | 🟢 Terciária |

---

---

# 🟢 LADO B2B — NUTRICIONISTAS

---

## Persona 1 — Ana Paula Ribeiro

### Quem é ela

```
Nome:          Ana Paula Ribeiro
Idade:         29 anos
Localização:   São Paulo, SP (Zona Sul)
Formação:      Nutrição (PUC-SP, 2019) + Pós em Nutrição Clínica (2022)
CRN:           CRN-3 ativo
Regime:        Autônoma — consultório próprio em casa (sala adaptada)
Experiência:   4 anos de atuação
Renda mensal:  R$ 5.500 a R$ 8.000 (variável conforme volume de consultas)
Pacientes:     23 pacientes ativos
Especialidade: Emagrecimento + Nutrição Clínica
Ferramentas:   WhatsApp pessoal, planilhas Google, Canva, Google Agenda
Dispositivos:  iPhone 14, MacBook Air M1
Redes:         Instagram ativo (2.100 seguidores), LinkedIn básico
```

### Contexto

Ana Paula é uma nutricionista recém-estabelecida que saiu do emprego em uma clínica de saúde corporativa há 1 ano para montar seu próprio consultório. Ela atende por videochamada (Zoom) e presencialmente (sala em casa, 2 dias por semana). Cobra R$180/consulta e R$80/mês por acompanhamento mensal com envio de plano via PDF.

Ela é dedicada, caprichosa com seus pacientes e tem ótima relação com eles — mas passa horas toda semana fazendo trabalho manual que não é nutrição: copiar planos alimentares em PDF, mandar mensagens lembrando de consulta, responder "posso comer X?" no WhatsApp às 22h, e montar planilhas de controle de peso no Google Sheets.

### Goals (O que ela quer alcançar)

1. **Crescer para 40 pacientes ativos** sem trabalhar mais horas — precisa de escala, não de mais esforço
2. **Parecer mais profissional** perante os pacientes — um app próprio eleva a percepção de valor
3. **Reduzir o tempo de administração** (hoje leva 3-4h/semana em tarefas operacionais)
4. **Cobrar mais** — sente que não consegue aumentar o preço sem entregar algo "a mais"
5. **Parar de usar o WhatsApp pessoal** para trabalho — mistura muito com vida pessoal

### Frustrações (Pain Points)

| Dor | Intensidade | Contexto |
|-----|------------|---------|
| WhatsApp pessoal para trabalho | 🔴 Crítica | Recebe mensagem de paciente às 23h, se sente culpada se não responder |
| Montar plano alimentar em PDF | 🔴 Crítica | Leva 1-2h por plano, faz no Canva/Word |
| Lembrete de consulta manual | 🟠 Alta | Manda mensagem uma a uma no WhatsApp |
| Controle de peso em planilha | 🟠 Alta | Atualiza manualmente após cada consulta |
| Sem repositório de prontuário | 🟠 Alta | Anotações em caderno ou Word separado por paciente |
| Perda de pacientes por falta de contato | 🟡 Média | Paciente some e ela não tem ferramenta de reativação |
| Vergonha de cobrar mais sem entregar mais | 🟡 Média | Quer aumentar para R$220 mas não tem argumento de valor |

### Comportamento Tecnológico

- **Adoção:** Alta — usa bem apps e está disposta a aprender ferramentas novas
- **Disposição a pagar:** Moderada — precisa ver ROI claro antes de assinar
- **Bloqueio principal:** Medo de "complicar demais" — quer que funcione sem configuração extensa
- **Canal de descoberta provável:** Instagram (stories de outros nutris) + indicação de colega de pós-graduação

### Jobs to Be Done (JTBD)

> **Job principal:** "Quando estou gerenciando meus pacientes, quero ter tudo em um lugar só para não perder tempo pulando entre WhatsApp, planilha e Google Drive."

> **Job motivacional:** "Quando entrego meu serviço, quero que meus pacientes percebam que sou uma nutricionista moderna e profissional, para que se sintam mais seguros e me indiquem para amigos."

> **Job funcional 1:** "Quando crio um plano alimentar, quero usar um builder visual para que eu faça isso em 20 minutos em vez de 2 horas."

> **Job funcional 2:** "Quando tenho uma consulta marcada, quero que o sistema avise o paciente automaticamente para que eu não precise mandar mensagem manual."

> **Job emocional:** "Quando termino o dia de trabalho, quero sentir que cuidei dos meus pacientes e não que passei o dia em burocracia."

### Jornada no Produto (Semana típica com Sauvia)

```
Segunda-feira
├── 08h: Abre o Dashboard Web → vê agenda da semana
├── 08h15: Cria plano alimentar da semana para 2 pacientes novos (Builder Web)
└── 08h45: Pacientes recebem WhatsApp automático com novo plano

Quarta-feira
├── 14h: Consulta com Maria (presencial)
├── 14h50: Registra peso e medidas no prontuário web
├── 14h55: Atualiza anotações da consulta (TipTap editor)
└── 15h00: Sistema envia confirmação da próxima consulta via WhatsApp

Quinta-feira
├── 19h: App mobile — checa métricas dos pacientes (gráfico de peso)
├── 19h10: Vê que João não registrou refeição há 3 dias
└── 19h15: Envia mensagem pelo chat do app (não usa WhatsApp pessoal)

Sexta-feira
└── 17h: Vê no dashboard que 5 pacientes têm consulta na semana que vem
    └── Todos receberão lembrete automático na quinta
```

### Features que mais importam para ela

| Feature | Prioridade | Por quê |
|---------|-----------|---------|
| Builder de Plano Alimentar | 🔴 P0 | Maior gasto de tempo hoje |
| Agenda com lembrete WhatsApp | 🔴 P0 | Elimina trabalho manual de lembrete |
| Prontuário + anotações | 🟠 P1 | Substitui caderno e Word |
| Dashboard de métricas do paciente | 🟠 P1 | Mostra evolução de forma visual |
| Chat interno (sem WhatsApp pessoal) | 🟡 P2 | Separa vida pessoal do trabalho |

### Métricas de Sucesso (para ela)

- Passou de 23 para 35 pacientes ativos em 3 meses
- Reduziu tempo de admin de 4h para 45min por semana
- Aumentou preço da consulta de R$180 para R$220 (argumento: "tenho um app")
- Taxa de no-show de consultas caiu de 22% para 8% com lembretes automáticos

### Quote representativo

> *"Eu virei nutricionista para ajudar pessoas a comer melhor, não para passar hora montando PDF e mandando mensagem no WhatsApp. Quando eu souber que o app faz isso por mim, eu assino na hora."*

---

## Persona 2 — Rafael Monteiro

### Quem é ele

```
Nome:          Rafael Monteiro
Idade:         41 anos
Localização:   Campinas, SP
Formação:      Nutrição (Unicamp, 2006) + MBA Gestão em Saúde (FGV, 2015)
CRN:           CRN-3 ativo
Regime:        Sócio de clínica esportiva (2 nutricionistas + 1 personal)
Experiência:   15 anos de atuação
Renda mensal:  R$ 18.000 a R$ 24.000
Pacientes:     65 pacientes ativos (35 seu, 30 do sócio nutri)
Especialidade: Nutrição Esportiva + Performance
Ferramentas:   Dietbox (insatisfeito), WhatsApp Business, Excel, Google Calendar
Dispositivos:  iPhone 15 Pro, iPad Pro, Dell notebook
Redes:         Instagram (12.000 seguidores), YouTube (canal de nutrição esportiva)
```

### Contexto

Rafael é um nutricionista experiente e referência na área esportiva em Campinas. Atende atletas amadores e profissionais, corredores, ciclistas e frequentadores de academia. Tem uma clínica pequena com mais um nutricionista sócio e um personal trainer parceiro.

Ele usa o Dietbox atualmente mas está insatisfeito: sistema é lento, interface ultrapassada, relatórios ruins e o app do paciente é "feio e ninguém usa". Paga R$380/mês pelo Dietbox e recentemente começou a avaliar alternativas. Rafael é analítico, gosta de dados e quer que o produto mostre **resultados mensuráveis** dos pacientes.

### Goals

1. **Ter relatórios de evolução mais visuais** para usar nas consultas como ferramenta de motivação
2. **Unificar ele e o sócio** na mesma plataforma (hoje cada um usa suas próprias planilhas + Dietbox)
3. **Aumentar a adesão do paciente** ao plano — maior parte dos pacientes não abre o app do Dietbox
4. **Reduzir churn de pacientes** — perde em média 3 pacientes/mês por falta de engajamento
5. **Ter algo que se integre com a rotina de treino** — quer prescrever vídeos de preparação física junto com o plano

### Frustrações

| Dor | Intensidade | Contexto |
|-----|------------|---------|
| App do Dietbox que ninguém usa | 🔴 Crítica | Paciente não engaja → deixa de perceber valor |
| Relatórios sem design | 🔴 Crítica | Leva os dados em PDF feio para a consulta |
| Sem módulo de treino/vídeo | 🟠 Alta | Precisa prescrever exercícios via PDF separado |
| Custo alto do Dietbox | 🟠 Alta | R$380/mês para funcionalidade que não usa 60% |
| Multi-usuário confuso | 🟠 Alta | Ele e o sócio gerenciam pacientes em silos separados |
| Sem visão do engajamento do paciente | 🟡 Média | Não sabe se o paciente está seguindo o plano |

### Jobs to Be Done

> **Job principal:** "Quando monitoro meus pacientes atletas, quero ver dados de evolução em tempo real para usar na consulta como ferramenta de coaching, não só de nutrição."

> **Job diferencial:** "Quando prescrevo um protocolo de performance, quero incluir vídeos de exercícios junto com a dieta para que o paciente tenha tudo em um lugar e sinta que estou cuidando do corpo inteiro."

> **Job de negócio:** "Quando avalio as ferramentas que uso, quero pagar menos por algo que meus pacientes realmente abram e usem, para que eu possa justificar o custo com resultado."

### Jornada no Produto

```
Fluxo de onboarding de novo atleta:
├── 1. Cadastro completo do atleta (dados + métricas iniciais)
├── 2. Definição de objetivo (performance, definição, ganho)
├── 3. Criação do plano alimentar periodizado (semana A e B)
├── 4. Prescrição de vídeos de ativação/recuperação da biblioteca
├── 5. Atleta recebe WhatsApp: "Seu protocolo está pronto no Sauvia"
├── 6. Atleta abre app, vê plano + vídeos prescritos
└── 7. Rafael acompanha evolução de peso/bioimpedância no dashboard

Durante a semana:
├── Atleta registra refeições no diário
├── Assiste vídeos prescritos (player mobile)
├── Rafael recebe alertas se atleta não registrou por 2+ dias
└── Rafael acessa métricas antes da consulta (sem precisar pedir dados)
```

### Features que mais importam para ele

| Feature | Prioridade | Por quê |
|---------|-----------|---------|
| Biblioteca de vídeos (prescrição) | 🔴 P0 | Diferencial único vs. Dietbox |
| Gráficos de evolução do paciente | 🔴 P0 | Usa na consulta como coaching tool |
| Multi-usuário na mesma clínica | 🟠 P1 | Ele + sócio no mesmo tenant |
| App mobile atraente (paciente) | 🟠 P1 | Principal razão de sair do Dietbox |
| Diário alimentar do paciente | 🟡 P2 | Saber se o paciente segue o plano |

### Quote representativo

> *"O Dietbox me custa R$380 por mês e meus pacientes não usam o app. Se o Sauvia tiver um app que eles realmente abram — com os vídeos de treino que eu prescrevo — eu migro todo mundo amanhã."*

---

## Persona 3 — Dra. Carla Fonseca

### Quem é ela

```
Nome:          Carla Fonseca
Idade:         44 anos
Localização:   Belo Horizonte, MG
Formação:      Nutrição (UFMG, 2005) + Doutorado em Saúde Pública (2012)
CRN:           CRN-4 ativo
Regime:        Sócia-fundadora — Clínica NutriVida (4 nutricionistas, 2 recepcionistas)
Experiência:   19 anos
Pacientes:     180 pacientes ativos (distribuídos entre 4 nutricionistas)
Especialidade: Nutrição Clínica + Gestão de Saúde
Ferramentas:   Mix de sistemas (cada nutri usa o que quer), planilhas, e-mail
Dispositivos:  Samsung Galaxy S24, notebook Windows
Redes:         LinkedIn ativo, pouco no Instagram
```

### Contexto

Carla fundou a clínica NutriVida há 8 anos. Hoje tem 4 nutricionistas (incluindo ela), uma recepcionista e uma estagiária. O maior problema é **gestão**: cada nutricionista usa um sistema diferente (uma usa Dietbox, outra usa planilha, outra usa uma ferramenta própria), e Carla não tem visão consolidada de nada.

Ela não atende mais de 20 pacientes próprios — a maior parte do tempo é gestão. Precisa de uma plataforma que unifique toda a equipe, padronize o atendimento e dê a ela uma visão gerencial da clínica. Está disposta a pagar bem por isso, mas exige onboarding guiado e suporte.

### Goals

1. **Unificar toda a equipe** em um único sistema — acabar com o caos de ferramentas diferentes
2. **Visibilidade gerencial** — quantos pacientes, quantas consultas, receita estimada, performance por nutricionista
3. **Padronizar a qualidade do atendimento** — todos os nutris entregando planos no mesmo formato, pelo mesmo app
4. **Reduzir trabalho da recepção** — hoje agenda consultas manualmente pelo telefone + WhatsApp
5. **LGPD compliant** — já foi questionada por paciente sobre armazenamento de dados e ficou preocupada

### Frustrações

| Dor | Intensidade | Contexto |
|-----|------------|---------|
| Cada nutri usa um sistema diferente | 🔴 Crítica | Impossível ter visão consolidada da clínica |
| Sem dashboard gerencial | 🔴 Crítica | Não sabe em tempo real quantos pacientes têm |
| Risco de LGPD | 🔴 Crítica | Dados de pacientes em planilhas sem criptografia |
| Agenda manual pela recepção | 🟠 Alta | Receptionista passa 40% do tempo marcando consultas |
| Sem padronização de atendimento | 🟠 Alta | Qualidade varia muito entre os nutricionistas |
| Onboarding de novos nutris difícil | 🟡 Média | Cada nutricionista novo aprende o sistema do anterior |

### Jobs to Be Done

> **Job principal:** "Quando gerencio minha clínica, quero ter uma visão centralizada de todos os pacientes e nutricionistas para tomar decisões de negócio sem precisar perguntar para cada uma."

> **Job de conformidade:** "Quando armazeno dados de pacientes, quero ter certeza de que estamos dentro da LGPD para que eu não me preocupe com multas ou problemas legais."

> **Job de liderança:** "Quando integro uma nova nutricionista, quero que ela aprenda o sistema em um dia para que eu não perca tempo treinando operação."

### Features que mais importam para ela

| Feature | Prioridade | Por quê |
|---------|-----------|---------|
| Multi-tenant / multi-usuário | 🔴 P0 | Razão de existir para ela |
| Dashboard admin / gerencial | 🔴 P0 | Visão de negócio, não de paciente |
| LGPD (prontuário criptografado, audit) | 🔴 P0 | Preocupação de conformidade real |
| Agenda com auto-confirmação | 🟠 P1 | Reduz carga da recepção |
| Plano Clínica (R$397) | 🟠 P1 | Está no plano de maior valor |

### Quote representativo

> *"Hoje cada nutricionista da minha clínica usa uma ferramenta diferente e eu não sei o que está acontecendo com os pacientes. Preciso de um sistema único que dê a mim uma visão de CEO e a elas uma ferramenta boa de trabalho."*

---
---

# 🔵 LADO B2C — PACIENTES

---

## Persona 4 — Marcos Oliveira

### Quem é ele

```
Nome:          Marcos Oliveira
Idade:         27 anos
Localização:   São Paulo, SP (Moema)
Profissão:     Analista de TI (trabalho remoto)
Renda:         R$ 7.200/mês CLT
Estado civil:  Solteiro
Nível de saúde: Sobrepeso (IMC 28.4), sem condições crônicas
Objetivo:      Emagrecer 12kg, melhorar disposição
Nutricionista: Acabou de contratar a Ana Paula (indica)
Rotina:        Trabalha das 9h às 18h em casa, academia 3x/semana (iniciante)
Dispositivos:  iPhone 15, Mac no trabalho
Apps que usa:  iFood, Spotify, Strava, MyFitnessPal (tentou, desistiu)
```

### Contexto

Marcos trabalha de home office desde a pandemia e ganhou peso gradualmente — come mal porque é preguiçoso para cozinhar, pede delivery com frequência e fica sentado o dia todo. Decidiu procurar uma nutricionista depois de tentar sozinho por 6 meses sem resultado.

Ele é da geração que **espera que o app faça o trabalho pesado** por ele. Não tem paciência para anotar tudo manualmente, mas responde bem quando há gamificação e progresso visual. Tende a desistir quando não vê resultados em 3 semanas.

### Goals

1. **Perder 12kg em 6 meses** de forma sustentável (sem passar fome)
2. **Saber exatamente o que comer** sem precisar pensar — quer o plano mastigado
3. **Ver progresso visual** — gráfico de peso descendente o motiva muito
4. **Não precisar cozinhar muito** — quer opções práticas e rápidas no plano
5. **Aprender exercícios novos** para variar além da academia

### Frustrações

| Dor | Intensidade | Contexto |
|-----|------------|---------|
| Plano alimentar só em PDF | 🔴 Crítica | Esquece de abrir, abre errado, perde o arquivo |
| Não sabe se está progredindo | 🔴 Crítica | Sem gráfico, pesa e não sabe comparar com semana anterior |
| Nutricionista só disponível na consulta | 🟠 Alta | Tem dúvida às 12h e não sabe o que comer no almoço |
| Anotar refeições é chato | 🟠 Alta | Tentou o MyFitnessPal, desistiu na semana 2 |
| Academia repetitiva | 🟡 Média | Quer variedade de exercícios, não só musculação |

### Comportamento Tecnológico

- **Padrão de uso:** Abre app pela manhã (checar plano) e à noite (registrar)
- **Engajamento:** Alto nas primeiras 2 semanas, cai se não ver resultado
- **Trigger de reengajamento:** Notificação personalizada com resultado ("Você perdeu 1.3kg esta semana!")
- **Deal breaker:** App lento, UI confusa, muitos cliques para registrar uma refeição

### Jobs to Be Done

> **Job principal:** "Quando acordo de manhã, quero abrir o app e ver exatamente o que posso comer hoje para não ter que pensar no assunto."

> **Job motivacional:** "Quando pesoi na balança, quero ver meu gráfico atualizado para sentir que estou no caminho certo e não desistir."

> **Job de aprendizado:** "Quando não tenho aula na academia, quero encontrar um exercício novo no app para fazer em casa sem precisar pesquisar no YouTube."

### Jornada semanal no produto

```
Segunda (início da semana)
├── 07h: Abre app → Home Dashboard → "Plano da semana disponível"
├── 07h05: Vê refeições do dia no plano alimentar
└── 07h15: Registra café da manhã no diário (2 toques)

Durante a semana
├── Push: "Lembrete — você ainda não registrou o almoço de hoje"
├── Check-in de peso na quarta: vê gráfico descendente → 😊 motivado
└── Browsing da biblioteca de vídeos → assiste vídeo de core training

Sábado
├── Consulta com Ana Paula (videoconferência)
├── Ana Paula já tem os dados da semana no dashboard
├── Consulta foca em ajustes, não em "como foi a semana?" manual
└── Novo plano da próxima semana disponível no app em 10 minutos

Domingo
└── WhatsApp automático: "Você registrou 5 dos 7 dias esta semana! 🎉 Continue assim"
```

### Features que mais importam para ele

| Feature | Prioridade | Por quê |
|---------|-----------|---------|
| Plano alimentar no app (não PDF) | 🔴 P0 | Razão #1 de ele usar o app |
| Gráfico de peso / evolução visual | 🔴 P0 | Motivação direta |
| Biblioteca de vídeos (calistenia) | 🟠 P1 | Diferencial que outros apps não têm |
| Notificações de lembrete | 🟠 P1 | Mantém ele no caminho sem esforço |
| Registro fácil de refeições | 🟡 P2 | Máximo 3 toques para registrar |

### Métricas de Sucesso (para ele)

- Perdeu 4kg no primeiro mês
- Usa o app todos os dias nas primeiras 3 semanas
- Taxa de registro de refeições > 70% dos dias
- Indicou a Ana Paula para 2 amigos ("minha nutri tem um app incrível")

### Quote representativo

> *"Já tentei vários apps de dieta mas eu desisto sempre. O que precisa é que o plano da minha nutricionista já esteja lá, que eu não precise montar nada, só seguir. E que apareça um gráfico me dizendo que estou indo bem."*

---

## Persona 5 — Fernanda Costa

### Quem é ela

```
Nome:          Fernanda Costa
Idade:         36 anos
Localização:   Curitiba, PR
Profissão:     Gerente de RH (presencial, 44h/semana)
Renda:         R$ 11.000/mês CLT
Estado civil:  Casada, 2 filhos (8 e 11 anos)
Nível de saúde: Peso saudável mas alimentação desequilibrada, intestino irritável
Objetivo:      Melhorar qualidade da alimentação, mais energia, menos inflamação
Nutricionista: Segunda consulta com a nutricionista da clínica da Dra. Carla
Rotina:        Manhãs corridas, almoço rápido na empresa, fins de semana em família
Dispositivos:  Android (Samsung Galaxy A54), tablet da família
```

### Contexto

Fernanda não tem problema de peso, mas sabe que come mal — muito processado, café no lugar de refeição, intestino sempre desregulado. O médico sugeriu nutricionista. Ela é organizada profissionalmente mas caótica na alimentação.

Ela tem **pouco tempo** e **muita responsabilidade** — é mãe, gerente e cuida da casa com o marido. Quer uma solução que caiba na sua rotina, não que crie mais trabalho. Já tentou aplicativos de dieta e achou que davam muito trabalho de configuração.

### Goals

1. **Melhorar energia no trabalho** — sente muito cansaço entre 14h e 16h
2. **Resolver o intestino irritável** — principal queixa que a trouxe ao nutricionista
3. **Ter um guia prático de o que comer** sem precisar pensar muito
4. **Incluir a família na alimentação saudável** — quer que o marido e filhos comam melhor também
5. **Consultas que valham o tempo** — não quer ir à consulta e ficar respondendo "o que comi na semana"

### Frustrações

| Dor | Intensidade | Contexto |
|-----|------------|---------|
| Falta de tempo para pensar em comida | 🔴 Crítica | Trabalho + filhos + casa = zero headspace para nutrição |
| Consulta gasta tempo em anamnese manual | 🟠 Alta | "Conto o que comi de novo toda consulta" |
| Plano em PDF inacessível na correria | 🟠 Alta | Imprimiu, perdeu, abriu no celular e não encontrou |
| App de dieta difícil de usar | 🟠 Alta | Cadastrou alimentos por 3 dias e desistiu |
| Falta de comunicação entre consultas | 🟡 Média | Dúvidas simples que não valem ligar para o consultório |

### Jobs to Be Done

> **Job principal:** "Quando estou no almoço rápido na empresa, quero abrir o app e ver em 5 segundos o que posso pedir/comer de acordo com meu plano."

> **Job relacional:** "Quando vou à consulta, quero que a nutricionista já saiba como foi minha semana para que possamos falar de ajustes, não de relatório."

> **Job de saúde:** "Quando sigo o plano por uma semana, quero perceber que meu intestino melhorou para ter motivação de continuar."

### Features que mais importam para ela

| Feature | Prioridade | Por quê |
|---------|-----------|---------|
| Plano alimentar simplificado (rápido de consultar) | 🔴 P0 | Não tem tempo para app complexo |
| Chat com nutricionista | 🟠 P1 | Dúvida rápida sem precisar marcar consulta |
| Registro de sintomas (intestino, energia) | 🟠 P1 | Quer mostrar padrão na consulta |
| Notificação de refeição discreta | 🟡 P2 | Lembrete no horário do almoço sem intrusão |

### Quote representativo

> *"Não tenho tempo para ficar digitando o que comi. Quero abrir o app e ver 'no almoço você pode comer isso'. Simples assim. E que quando eu for à consulta, a nutricionista já saiba minha semana."*

---

## Persona 6 — Carlos Eduardo Pimentel

### Quem é ele

```
Nome:          Carlos Eduardo Pimentel
Idade:         54 anos
Localização:   Porto Alegre, RS
Profissão:     Aposentado (ex-contador)
Renda:         R$ 8.500/mês (aposentadoria + aluguéis)
Estado civil:  Casado, 3 filhos adultos
Condição:      Diabetes tipo 2 (5 anos) + Hipertensão controlada + Sobrepeso
Objetivo:      Controlar glicemia com dieta, reduzir medicação com autorização médica
Nutricionista: Indicado pelo endocrinologista — consulta na clínica da Dra. Carla
Dispositivos:  Android (Motorola G), tablet que os filhos instalaram
Habilidade tech: Baixa/Média — usa WhatsApp, YouTube, Instagram
```

### Contexto

Carlos descobriu o diabetes há 5 anos e desde então tenta controlar com medicação e alimentação. Seu endocrinologista pediu que ele procurasse um nutricionista para ter mais controle. Ele é motivado mas tem **medo de errar** — qualquer alimento fora do plano gera ansiedade. Não é tecnológico mas os filhos o ajudam.

Ele tem **alta adesão quando confia no sistema** — o problema é que sem feedback constante, fica ansioso. Quer saber se o que comeu foi "certo" ou "errado". Precisa de simplicidade extrema: o app deve ser intuitivo o suficiente para ele usar sem chamar o filho.

### Goals

1. **Controlar a glicemia com dieta** — reduzir HbA1c de 8.2 para menos de 7
2. **Saber se está comendo certo** — feedback constante, não só na consulta mensal
3. **Perder 8kg** sem comprometer a saúde cardiovascular
4. **Reduzir a metformina** com autorização do médico — objetivo maior
5. **Ter histórico organizado para mostrar ao endocrinologista** — tudo em um lugar

### Frustrações

| Dor | Intensidade | Contexto |
|-----|------------|---------|
| Ansiedade sobre "posso comer isso?" | 🔴 Crítica | Liga para o consultório por dúvidas simples |
| Consulta mensal é pouco para ele | 🔴 Crítica | Um mês é muito tempo sem feedback profissional |
| Plano em PDF difícil de ler | 🟠 Alta | Letra pequena, imprime, perde |
| Sem histórico organizado | 🟠 Alta | Leva anotações em caderninho para o médico |
| App complexo demais | 🟠 Alta | Já desinstalou 2 apps por não conseguir usar |
| Filhos que precisam ajudar | 🟡 Média | Depende do filho para configurar coisas novas |

### Comportamento Tecnológico

- **Padrão:** Usa o celular muito para WhatsApp e YouTube, pouco para outros apps
- **Adoção:** Lenta mas consistente — uma vez que aprende, não muda
- **Precisa de:** Fonte grande, fluxo simples, sem terminologia técnica
- **Trigger de uso:** "Minha nutricionista me mandou mensagem falando para eu abrir o app"

### Jobs to Be Done

> **Job principal:** "Quando vou comer algo diferente, quero poder verificar rapidamente no app se está dentro do meu plano para não ter ansiedade."

> **Job de controle:** "Quando vou à consulta com o endocrinologista, quero mostrar meu histórico de alimentação e métricas registradas no app para que ele veja minha evolução de forma organizada."

> **Job emocional:** "Quando sigo o plano por uma semana, quero receber uma mensagem da nutricionista dizendo que estou indo bem para me sentir seguro de que estou no caminho certo."

### Features que mais importam para ele

| Feature | Prioridade | Por quê |
|---------|-----------|---------|
| Plano alimentar ultra-simples | 🔴 P0 | Fonte grande, linguagem simples, poucos toques |
| Notificações de refeição com lembrete | 🔴 P0 | Sem lembrete, ele esquece de registrar |
| Chat com nutricionista | 🟠 P1 | "Posso comer isso?" sem precisar ligar |
| Gráfico de métricas (peso, glicemia) | 🟠 P1 | Para mostrar ao endocrinologista |
| Prontuário / exportar dados | 🟡 P2 | Histórico para o médico |

### Requisitos de UX (específicos desta persona)

- **Fonte mínima:** 16px no app mobile (sem opção de letra pequena)
- **Fluxo máximo:** 3 toques para qualquer ação principal
- **Linguagem:** Sem jargão ("kcal" → "calorias", "macro" → explicar)
- **Onboarding:** Guiado passo a passo, com vídeo curto explicando cada tela
- **Acessibilidade:** Suporte a zoom do sistema operacional, contraste alto

### Quote representativo

> *"Sou velho para essas tecnologias mas meus filhos disseram que esse app vai me ajudar. Se for fácil de usar como o WhatsApp, eu uso todo dia. Se for complicado, vou precisar chamar o João toda hora."*

---

---

# 📊 ANÁLISE CRUZADA DAS PERSONAS

---

## Matrix de Features × Personas

| Feature | Ana Paula | Rafael | Dra. Carla | Marcos | Fernanda | Carlos |
|---------|-----------|--------|------------|--------|----------|--------|
| Plano alimentar no app | 🔴 Critica | 🔴 Critica | 🟠 Alta | 🔴 Critica | 🔴 Critica | 🔴 Critica |
| Lembrete WhatsApp | 🔴 Critica | 🟡 Média | 🟠 Alta | 🟠 Alta | 🟠 Alta | 🔴 Critica |
| Agenda web | 🔴 Critica | 🟠 Alta | 🔴 Critica | ○ | ○ | ○ |
| Biblioteca vídeos | ○ | 🔴 Critica | 🟡 Média | 🟠 Alta | 🟡 Média | ○ |
| Gráficos evolução | 🟠 Alta | 🔴 Critica | 🔴 Critica | 🔴 Critica | 🟡 Média | 🟠 Alta |
| Chat interno | 🟠 Alta | 🟡 Média | ○ | 🟡 Média | 🟠 Alta | 🔴 Critica |
| Prontuário criptografado | 🟠 Alta | 🟠 Alta | 🔴 Critica | ○ | ○ | 🟡 Média |
| Multi-usuário | ○ | 🟠 Alta | 🔴 Critica | ○ | ○ | ○ |
| Dashboard admin | ○ | 🟡 Média | 🔴 Critica | ○ | ○ | ○ |
| LGPD / exportar dados | 🟡 Média | 🟡 Média | 🔴 Critica | ○ | ○ | 🟡 Média |

---

## Features com maior impacto (por cobertura)

| Prioridade | Feature | Personas atendidas |
|-----------|---------|-------------------|
| 🥇 #1 | Plano alimentar no app (não PDF) | 6/6 |
| 🥇 #2 | Lembrete via WhatsApp automático | 5/6 |
| 🥈 #3 | Gráficos de evolução visual | 5/6 |
| 🥈 #4 | Agenda web + confirmação automática | 3/6 (B2B completo) |
| 🥉 #5 | Biblioteca de vídeos | 3/6 |
| 🥉 #6 | Chat interno (sem WhatsApp pessoal) | 3/6 |

---

## Riscos de Abandono por Persona

| Persona | Risco de Churn | Gatilho | Mitigação |
|---------|---------------|---------|-----------|
| Ana Paula | Médio | "Configurei mas é complicado demais" | Onboarding em 15 min, template de plano pronto |
| Rafael | Alto | "Meus pacientes não abrem o app" | App bonito + notificações do paciente visíveis para ele |
| Dra. Carla | Baixo | "O suporte sumiu" | SLA de suporte + customer success dedicado |
| Marcos | Alto | "Não vi resultado em 3 semanas" | Gráfico de progresso + mensagem de parabéns automática |
| Fernanda | Médio | "É trabalhoso demais" | Simplicidade extrema, máximo 3 toques para registrar |
| Carlos | Médio | "Não consigo usar" | Fonte grande, tutoriais em vídeo, onboarding guiado |

---

## Momento de Aquisição (Quando cada persona decide usar)

| Persona | Gatilho de adoção | Canal de aquisição |
|---------|------------------|--------------------|
| Ana Paula | Colega de pós indicou, cansada do WhatsApp pessoal | Instagram + indicação boca a boca |
| Rafael | Quer migrar do Dietbox, paciente reclama do app atual | Google "alternativa Dietbox" + LinkedIn |
| Dra. Carla | Problemas de gestão da equipe atingiram limite | LinkedIn + cold email de vendas |
| Marcos | A nutricionista dele adotou o Sauvia | Convite da Ana Paula pelo app |
| Fernanda | A clínica da Dra. Carla migrou para o Sauvia | Convite da nutricionista |
| Carlos | Nutricionista enviou link de onboarding | Convite via WhatsApp da nutricionista |

> **Insight crítico:** Os pacientes B2C são adquiridos 100% por meio do nutricionista B2B. Isso significa que **a qualidade da experiência do nutricionista é a variável mais importante para crescimento do produto**. Se o nutricionista não engajar, o paciente nunca entra.

---

## Resumo Executivo das Personas

**Para o MVP de 14 dias, foque em:**

1. **Ana Paula** como a persona central do lado B2B — ela é o nutricionista solo que vai ser o early adopter, paga o Starter e indica para colegas.

2. **Marcos** como a persona central do lado B2C — ele é o paciente que vai ou não usar o app que Ana Paula entrega para ele.

3. **A jornada crítica** que deve funcionar no MVP: Ana Paula cria plano → Marcos recebe no app → Marcos usa → Ana Paula vê no dashboard → Marcos vai na consulta feliz → Ana Paula renova.

**Rafael e Dra. Carla** são o produto maduro (Pro e Clínica). Não tente agradá-las no MVP ou você vai complicar demais.

**Fernanda e Carlos** entram naturalmente quando o produto funcionar para Marcos — não precisam de features especiais no MVP, precisam que o básico funcione bem.

---

**Versão:** 1.0
**Data:** 12 de Abril de 2026
**Próxima revisão:** Após 3 meses de produto em produção com dados reais de uso
