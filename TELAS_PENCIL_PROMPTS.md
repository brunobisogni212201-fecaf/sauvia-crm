# 🖥️ Sauvia — Inventário Completo de Telas + Prompts de Desenvolvimento

> **Total:** 53 telas (excluindo Design System e Navigation Map)
> **Gerado em:** 12 de Abril de 2026
> **Fonte:** arquivo `fulll_app.pdf.pen`
> **Design System:**
  --color-primary: #7C3AED;
  --color-primary-light: #8B5CF6;
  --color-primary-dark: #5B21B6;
  --color-secondary: #A78BFA;
  --color-secondary-light: #C4B5FD;
  --color-surface: hsl(40, 20%, 98%);
  --color-surface-container: hsl(40, 15%, 94%);
  --color-surface-container-high: hsl(40, 10%, 90%);
  --color-on-surface:  hsl(210, 20%, 12%);
  --color-on-surface-variant: hsl(210, 10%, 40%);
  --color-error: #ba1a1a;
  --color-success: #16a34a;
  --color-warning: #f59e0b;

  Glassmorphism

---

## 📊 Visão Geral por Grupo

| Grupo | Plataforma | Telas | Status |
|-------|-----------|-------|--------|
| Auth / Onboarding Mobile | 📱 Mobile | 6 | 🟡 Em Design |
| Paciente — Navegação Principal | 📱 Mobile | 6 | 🟡 Em Design |
| Paciente — Agenda e Saúde | 📱 Mobile | 3 | 🟡 Em Design |
| Paciente — Diário e Plano Alimentar | 📱 Mobile | 2 | 🔴 Não Iniciado |
| Paciente — Biblioteca de Vídeos | 📱 Mobile | 4 | 🔴 Não Iniciado |
| Paciente — Pagamento | 📱 Mobile | 9 | 🔴 Não Iniciado |
| Paciente — WhatsApp | 📱 Mobile | 3 | 🔴 Não Iniciado |
| Nutricionista — Cadastro Mobile | 📱 Mobile | 3 | 🔴 Não Iniciado |
| Nutricionista — App Mobile | 📱 Mobile | 3 | 🔴 Não Iniciado |
| Web — Painel Nutricionista | 🌐 Web | 5 | 🔴 Não Iniciado |
| Web — Admin Panel | 🌐 Web | 4 | 🔴 Não Iniciado |
| Web — Landing Pages | 🌐 Web | 2 | ✅ Pronto |
| Web — Auth | 🌐 Web | 5 | 🔴 Não Iniciado |

---

## 📱 MOBILE — AUTH E ONBOARDING

---

### Tela 1 · Splash Screen
**ID Pencil:** `ADwPV` | **Dimensão:** 390×844 | **Status:** 🟡 Em Design

**Descrição:**
Tela de carregamento inicial do app. Exibe a logo Sauvia com animação de entrada. Fundo em verde primário (`#006b2c`) ou mint (`#e4fff9`). Aparece por 2-3 segundos enquanto o app inicializa e verifica o estado de autenticação.

**Prompt de Desenvolvimento:**
```
Crie um componente React Native (Expo) de Splash Screen para o app Sauvia CRM.

Especificações:
- Fundo: gradiente do #006b2c para #00a847 (verde, de cima para baixo)
- Centro: logo Sauvia (SVG ou imagem) com animação de fade-in + scale (0.8 → 1.0) usando Animated API
- Abaixo da logo: tagline "Nutrição que transforma" em Plus Jakarta Sans, 16px, branco, opacity 0.8
- Duração total: 2500ms, depois navega para /auth/login ou /dashboard conforme token existente
- Verificar AsyncStorage para token válido durante a animação
- Stack: React Native + Expo + React Navigation v6
- Design tokens: primary=#006b2c, surface=#e4fff9, fontFamily=PlusJakartaSans
```

---

### Tela 2 · Login
**ID Pencil:** `mH2LN` | **Dimensão:** 390×844 | **Status:** 🟡 Em Design

**Descrição:**
Tela de autenticação para usuários existentes. Campos de e-mail e senha com botão de login. Opção de "Entrar com Google" e link para cadastro. Layout com fundo mint claro e card glassmorphism central.

**Prompt de Desenvolvimento:**
```
Crie a tela de Login para o app Sauvia CRM em React Native (Expo).

Layout:
- Fundo: #e4fff9 (mint)
- Header: logo pequena + "Bem-vindo de volta" (Manrope Bold 24px, #00201d)
- Card central com glassmorphism: background rgba(255,255,255,0.7) + blur(20px), border-radius 16px
- Campo Email: TextInput com label flutuante, ícone de envelope (Lucide), border-radius 12px
- Campo Senha: TextInput password com toggle visibilidade, ícone cadeado
- Botão "Entrar": fundo #006b2c, texto branco, border-radius 999px (full), altura 52px
- Link "Esqueci minha senha" abaixo do botão
- Divisor "ou" com linhas laterais
- Botão Google OAuth: borda #E5E7EB, ícone Google, texto #374151
- Footer: "Não tem conta? Cadastre-se" com link em #006b2c

Integração:
- Conectar ao Clerk (useAuth, useSignIn)
- Validação com react-hook-form + zod
- Feedback de loading no botão (ActivityIndicator)
- Erros exibidos com toast (react-native-toast-message)
- Após sucesso: navegar para /dashboard
```

---

### Tela 3 · Escolha de Perfil (Cadastro)
**ID Pencil:** `JXKp0` | **Dimensão:** 390×844 | **Status:** 🟡 Em Design

**Descrição:**
Primeira tela do fluxo de cadastro. Usuário escolhe entre "Sou Paciente" ou "Sou Nutricionista". Cards grandes e visuais, com ícones representativos e descrição breve de cada perfil.

**Prompt de Desenvolvimento:**
```
Crie a tela de Escolha de Perfil do cadastro para o app Sauvia CRM em React Native (Expo).

Layout:
- Fundo: #e4fff9
- Header: "Como você vai usar o Sauvia?" (Manrope Bold 22px, #00201d)
- Subtítulo: "Escolha seu perfil para personalizar sua experiência"
- Dois cards grandes (390-32px largura, ~200px altura cada):
  - Card PACIENTE: ícone User (Lucide verde), título "Sou Paciente", descrição "Acompanhe seu plano alimentar, consultas e saúde"
  - Card NUTRICIONISTA: ícone Stethoscope verde, título "Sou Nutricionista", descrição "Gerencie seus pacientes, agenda e planos alimentares"
- Estado selecionado: borda 2px #006b2c, fundo rgba(0,107,44,0.06)
- Botão "Continuar": desabilitado até seleção, fundo #006b2c quando ativo
- Link "Já tenho conta" no rodapé

Lógica:
- State: profileType ('patient' | 'nutritionist')
- Salvar escolha e navegar para tela correspondente (G2 Dados Pessoais ou G6 Dados CRN)
```

---

### G2 · Dados Pessoais (Onboarding Passo 1)
**ID Pencil:** `YABYx` | **Dimensão:** 390×844 | **Status:** 🟡 Em Design

**Descrição:**
Segundo passo do cadastro. Coleta nome completo, data de nascimento, CPF e telefone. Barra de progresso mostra "Passo 1 de 3". Layout limpo com campos flutuantes.

**Prompt de Desenvolvimento:**
```
Crie a tela "Dados Pessoais" (passo 1/3 do onboarding) para o app Sauvia CRM em React Native (Expo).

Layout:
- Header com botão voltar (chevron-left) e progress bar (1/3 preenchida em #006b2c)
- Título: "Seus dados pessoais" (Manrope Bold 22px)
- Subtítulo: "Passo 1 de 3 — Dados básicos"
- Campos do formulário (label flutuante animado):
  - Nome completo (required)
  - Data de nascimento (DatePicker nativo)
  - CPF (máscara 000.000.000-00)
  - Telefone/WhatsApp (máscara (00) 00000-0000)
- Botão "Continuar" fixo no bottom (safe area), fundo #006b2c, full border-radius
- Validação em tempo real com indicador verde na borda do campo quando válido

Stack: react-hook-form + zod + react-native-mask-input
Salvar no contexto global de onboarding e navegar para G2 Preferências
```

---

### G2 · Preferências (Onboarding Passo 2)
**ID Pencil:** `RXby2` | **Dimensão:** 390×844 | **Status:** 🟡 Em Design

**Descrição:**
Terceiro passo. Usuário indica objetivos de saúde, restrições alimentares e frequência de atividade física. Chips selecionáveis com múltipla escolha.

**Prompt de Desenvolvimento:**
```
Crie a tela "Preferências" (passo 2/3 do onboarding) para o app Sauvia CRM em React Native (Expo).

Layout:
- Header com botão voltar e progress bar (2/3 preenchida)
- Título: "Suas preferências" | Subtítulo: "Passo 2 de 3"
- Seção "Objetivo principal" — chips de seleção única:
  Emagrecer · Ganhar massa · Manutenção · Saúde geral · Performance esportiva
- Seção "Restrições alimentares" — chips multi-seleção:
  Vegetariano · Vegano · Sem glúten · Sem lactose · Halal · Kosher · Nenhuma
- Seção "Frequência de exercícios" — chips de seleção única:
  Sedentário · 1-2x/semana · 3-4x/semana · 5+x/semana

Chips:
- Padrão: border 1px #E5E7EB, border-radius 999px, fundo branco
- Selecionado: fundo #006b2c, texto branco, sem border
- Padding: 8px 16px

Botão "Continuar" → navega para G2 Foto e Conclusão
```

---

### G2 · Foto e Conclusão (Onboarding Passo 3)
**ID Pencil:** `oIYDN` | **Dimensão:** 390×844 | **Status:** 🟡 Em Design

**Descrição:**
Último passo do onboarding. Upload de foto de perfil (opcional) e confirmação dos dados. Mostra resumo do que foi preenchido e botão para finalizar o cadastro.

**Prompt de Desenvolvimento:**
```
Crie a tela "Foto e Conclusão" (passo 3/3) para o app Sauvia CRM em React Native (Expo).

Layout:
- Header com botão voltar e progress bar (3/3 completa em #006b2c)
- Título: "Quase lá!" | Subtítulo: "Passo 3 de 3"
- Avatar circular grande (100px) centralizado:
  - Placeholder: ícone User em fundo #c5fff5
  - Ao tocar: bottom sheet com "Tirar foto" e "Escolher da galeria"
  - Ícone de câmera pequeno sobreposto no canto inferior direito em #006b2c
- Card resumo dos dados inseridos (nome, CPF mascarado, objetivos)
- Checkbox "Li e aceito os Termos de Uso e Política de Privacidade" (LGPD)
- Botão "Criar minha conta" (desabilitado sem aceite dos termos)

Ao confirmar:
- POST /api/v1/auth/register com todos os dados do contexto de onboarding
- Upload da foto para S3 se selecionada
- Loading state no botão
- Após sucesso: navegar para Home Dashboard com animação de celebração (confetti ou fade)

Stack: expo-image-picker, expo-camera, react-native-bottom-sheet
```

---

## 📱 MOBILE — PACIENTE (HOME E NAVEGAÇÃO)

---

### G3 · Home Dashboard (Paciente)
**ID Pencil:** `BvR31` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Tela principal do paciente. Exibe saudação personalizada, próxima consulta, progresso do plano alimentar do dia, métricas rápidas e acesso rápido aos módulos principais. Tab bar na base.

**Prompt de Desenvolvimento:**
```
Crie o Home Dashboard do paciente para o app Sauvia CRM em React Native (Expo).

Layout (ScrollView vertical):
- Header: "Olá, [Nome] 👋" (Manrope Bold 22px) + avatar do paciente (40px, topo direito)
- Card "Próxima consulta" (glassmorphism, borda esquerda 4px #006b2c):
  - Data, hora e nome do nutricionista
  - Botão "Ver detalhes" em texto #006b2c
- Card "Plano de hoje":
  - Progresso em kcal: barra horizontal verde (atual/meta)
  - 3 refeições do dia em chips: Café da manhã · Almoço · Jantar (check verde se concluído)
- Grid 2x2 "Acesso rápido":
  - Plano Alimentar · Minhas Consultas · Vídeos · Métricas
  - Cards com ícone Lucide + label, fundo branco, sombra rgba(0,55,50,0.06)
- Seção "Vídeos recomendados" (horizontal ScrollView):
  - Cards de vídeo com thumbnail, título e duração

Tab Bar (bottom):
- Home · Plano · Consultas · Vídeos · Perfil
- Ícone ativo em #006b2c, inativo em #9CA3AF

Stack: React Navigation (Tab + Stack), SWR para dados
```

---

### G3 · Buscar Profissional
**ID Pencil:** `Kn7Oj` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Tela de busca e descoberta de nutricionistas disponíveis na plataforma. Campo de busca com filtros por especialidade, localização e disponibilidade. Lista de cards de profissionais.

**Prompt de Desenvolvimento:**
```
Crie a tela "Buscar Profissional" para o app Sauvia CRM em React Native (Expo).

Layout:
- Header: título "Encontrar Nutricionista" + ícone de filtro (sliders) à direita
- SearchBar: campo com ícone de lupa, placeholder "Buscar por nome ou especialidade"
- Chips de filtro horizontal (ScrollView):
  Todos · Emagrecimento · Esportiva · Clínica · Vegetariana · Oncológica
- FlatList de cards de nutricionista:
  - Avatar (50px), Nome, CRN, Especialidade principal
  - Rating (estrelas + número de avaliações)
  - Próximo horário disponível
  - Botão "Agendar" em #006b2c (border-radius full, pequeno)
  - Toque no card → navega para Perfil do Profissional

Estados:
- Loading: skeleton cards
- Empty: ilustração + "Nenhum profissional encontrado"
- Error: botão de retry

Dados: GET /api/v1/nutritionists?specialty=&search=&available=
```

---

### G3 · Perfil do Paciente
**ID Pencil:** `ev7nJ` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Perfil do próprio paciente. Exibe foto, dados pessoais, métricas de saúde (IMC, peso, altura), histórico de consultas e configurações da conta.

**Prompt de Desenvolvimento:**
```
Crie a tela de Perfil do Paciente para o app Sauvia CRM em React Native (Expo).

Layout:
- Header com fundo #006b2c (ou gradiente), avatar grande (90px) centralizado com botão editar
- Nome do paciente (Manrope Bold 20px, branco) + email (12px, rgba(255,255,255,0.8))
- Cards de métricas em row (3 cards):
  - Peso atual (kg) · Altura (cm) · IMC
  - Cada card: valor grande + label pequena + ícone
- Seção "Meus dados":
  - ListItem: Data de nascimento, Telefone, CPF mascarado
  - ListItem: Objetivos, Restrições alimentares
- Seção "Conta":
  - Alterar senha, Notificações, Privacidade (LGPD), Exportar meus dados, Deletar conta
- Botão "Sair" no rodapé (texto vermelho, sem fundo)

Ao tocar "Editar": navega para formulário de edição de perfil
Dados: GET /api/v1/auth/me, GET /api/v1/patients/{id}/vitals
```

---

## 📱 MOBILE — PACIENTE (AGENDA E SAÚDE)

---

### G4 · Agendar Consulta
**ID Pencil:** `KTN1b` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Fluxo de agendamento. Calendário para selecionar data, lista de horários disponíveis do nutricionista escolhido, e confirmação do agendamento com opção de nota prévia.

**Prompt de Desenvolvimento:**
```
Crie a tela "Agendar Consulta" para o app Sauvia CRM em React Native (Expo).

Layout:
- Header: "Agendar Consulta" + nome do nutricionista selecionado
- Mini calendário horizontal (semana atual visível, scroll para mais):
  - Dia selecionado: círculo #006b2c com texto branco
  - Dia atual: border #006b2c
  - Dias sem disponibilidade: texto #9CA3AF
- Título "Horários disponíveis" (após selecionar data)
- Grid de chips de horário (2 colunas):
  - Disponível: borda #006b2c, fundo branco
  - Selecionado: fundo #006b2c, texto branco
  - Indisponível: fundo #F3F4F6, texto #9CA3AF, strike-through
- TextInput "Descreva o motivo da consulta" (opcional, 3 linhas)
- Botão "Confirmar Agendamento" fixo no bottom

Ao confirmar:
- POST /api/v1/appointments
- Trigger automático de notificação WhatsApp ao paciente
- Navegar para tela de confirmação com animação de sucesso

Dados: GET /api/v1/nutritionists/{id}/availability?date=YYYY-MM-DD
```

---

### G4 · Minhas Consultas
**ID Pencil:** `xc0mZ` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Lista de todas as consultas do paciente: próximas (agendadas/confirmadas) e histórico (concluídas/canceladas). Tabs para filtrar e cards com status visual.

**Prompt de Desenvolvimento:**
```
Crie a tela "Minhas Consultas" para o app Sauvia CRM em React Native (Expo).

Layout:
- Header: "Minhas Consultas"
- Tabs: "Próximas" · "Histórico"
- FlatList de cards de consulta:
  - Data e hora (destaque)
  - Nome do nutricionista + avatar pequeno
  - Badge de status:
    - Agendada: fundo amarelo claro, texto #92400E
    - Confirmada: fundo verde claro, texto #006b2c
    - Concluída: fundo cinza, texto #6B7280
    - Cancelada: fundo vermelho claro, texto #991B1B
  - Ações na consulta "Próxima": Cancelar | Reagendar
  - Ações na consulta "Concluída": Ver prontuário | Avaliar

Empty state:
- "Próximas" sem consultas: ilustração + "Nenhuma consulta agendada" + botão "Agendar agora"
- "Histórico" vazio: "Suas consultas passadas aparecerão aqui"

Dados: GET /api/v1/appointments?status=upcoming|past
```

---

### G4 · Métricas de Saúde
**ID Pencil:** `d0b4B` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Dashboard de saúde do paciente. Gráficos de evolução de peso ao longo do tempo, IMC, pressão arterial e outras métricas inseridas pelo nutricionista ou pelo próprio paciente.

**Prompt de Desenvolvimento:**
```
Crie a tela "Métricas de Saúde" para o app Sauvia CRM em React Native (Expo).

Layout:
- Header: "Minha Saúde" + botão "+" para adicionar medição
- Cards de destaque (2 colunas, 2 rows):
  - Peso atual: valor em kg grande, seta de tendência (↑↓)
  - IMC: valor + classificação (ex: "Normal 22.5")
  - Pressão Arterial: "120/80 mmHg"
  - Última medição: data relativa
- Gráfico de evolução de peso (últimos 30 dias):
  - Linha suave em #006b2c
  - Área preenchida com rgba(0,107,44,0.1)
  - Eixo X: datas; Eixo Y: peso
  - Usar react-native-chart-kit ou victory-native
- Seção "Registros recentes":
  - Lista de medições com data, peso, notas
  - Swipe left para deletar

Modal de "Adicionar medição":
- Campos: Peso, Pressão Sistólica, Diastólica, Nota livre
- Botão salvar → POST /api/v1/patients/{id}/vitals
```

---

## 📱 MOBILE — PACIENTE (ALIMENTAÇÃO)

---

### G5 · Diário Alimentar
**ID Pencil:** `rioyr` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Registro diário de refeições. Paciente registra o que comeu, com busca de alimentos, contagem de calorias e macros. Visual de progresso diário com meta de kcal.

**Prompt de Desenvolvimento:**
```
Crie a tela "Diário Alimentar" para o app Sauvia CRM em React Native (Expo).

Layout:
- Header: data do dia (navegável com setas ←→) + ícone de calendário
- Card de progresso diário:
  - Meta kcal: barra circular (progresso) com valor central
  - Row de macros: Proteína · Carboidratos · Gordura (barras lineares pequenas)
- Lista de refeições do dia (acordeão expansível):
  - Café da manhã · Lanche · Almoço · Lanche tarde · Jantar · Ceia
  - Cada refeição: kcal total + botão "+" para adicionar alimento
  - Alimentos registrados: nome, quantidade, kcal, macros
  - Swipe left em alimento: deletar

Modal "Adicionar Alimento":
- SearchBar com debounce (GET /api/v1/foods?search=)
- Resultado: lista com nome + kcal por 100g
- Ao selecionar: campo de quantidade (g ou porção)
- Cálculo automático de kcal e macros

Dados: GET /api/v1/patients/{id}/food-diary?date=YYYY-MM-DD
```

---

### G5 · Plano Alimentar
**ID Pencil:** `HpCvB` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Visualização do plano alimentar prescrito pelo nutricionista. Navegação por dias da semana, detalhes de cada refeição com alimentos, quantidades e orientações.

**Prompt de Desenvolvimento:**
```
Crie a tela "Plano Alimentar" para o app Sauvia CRM em React Native (Expo).

Layout:
- Header: "Meu Plano Alimentar" + nome do nutricionista + data de criação
- Tabs de dias: Dom · Seg · Ter · Qua · Qui · Sex · Sáb (scroll horizontal)
- Dia ativo com underline #006b2c
- Para cada dia, lista de refeições (acordeão):
  - Ícone de refeição + Nome (Café da manhã etc) + kcal total
  - Expandido: lista de alimentos com quantidade e preparação
  - Campo de orientações do nutricionista (texto livre, read-only)
- Botão flutuante "Ver no Diário" → abre Diário Alimentar no dia atual

Empty state (sem plano prescrito):
- "Nenhum plano alimentar ativo"
- "Aguarde seu nutricionista criar seu plano personalizado"

Dados: GET /api/v1/patients/{id}/meal-plans/active
```

---

## 📱 MOBILE — PACIENTE (VÍDEOS)

---

### G11 · Tela 1 Biblioteca de Vídeos
**ID Pencil:** `009oO` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Biblioteca de vídeos de calistenia e exercícios disponível para o paciente. Grid de thumbnails com filtros por grupo muscular e duração. Inclui seção "Recomendados para mim".

**Prompt de Desenvolvimento:**
```
Crie a tela "Biblioteca de Vídeos" para o app Sauvia CRM em React Native (Expo).

Layout:
- Header: "Exercícios" + ícone de busca
- SearchBar expansível
- Chips de filtro horizontal:
  Todos · Recomendados · Membros Superiores · Core · HIIT · Alongamento
- Seção "Recomendados para você" (horizontal FlatList):
  - Cards: thumbnail 120x80px, título, duração
- Seção "Biblioteca completa" (Grid 2 colunas):
  - Cards: thumbnail, título, duração, ícone de play sobreposto
  - Badge "NOVO" em cards recentes
  - Ícone de check verde em vídeos assistidos

Card de vídeo:
- Thumbnail com border-radius 12px
- Overlay escuro leve com ícone play branco centralizado
- Título (2 linhas máx), duração, nível de dificuldade

Ao tocar no card: navega para Tela 2 Detalhe
Dados: GET /api/v1/videos?prescribed=true&category=
```

---

### G11 · Tela 2 Detalhe do Vídeo
**ID Pencil:** `q1vpB` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Página de detalhes do vídeo. Thumbnail grande, título, descrição, duração, instruções e botão para assistir. Mostra se foi prescrito pelo nutricionista.

**Prompt de Desenvolvimento:**
```
Crie a tela "Detalhe do Vídeo" para o app Sauvia CRM em React Native (Expo).

Layout:
- Header: botão voltar + ícone de compartilhar
- Thumbnail grande (390x220px) com botão play centralizado:
  - Ao tocar: navega para Tela 3 Player
- Título do vídeo (Manrope Bold 20px)
- Row de metadados: duração · nível · grupo muscular
- Badge "Prescrito pelo seu nutricionista" (se aplicável, fundo verde claro)
- Descrição completa do exercício (expandível "ver mais")
- Seção "Como executar" (lista de passos numerados)
- Seção "Músculos trabalhados" (chips)
- Botão "Assistir agora" fixo no bottom (fundo #006b2c)
- Botão "Marcar como concluído" (outline, após assistir)

Dados: GET /api/v1/videos/{id}
Ao concluir: POST /api/v1/patients/{id}/videos/{videoId}/complete
```

---

### G11 · Tela 3 Player de Vídeo
**ID Pencil:** `OGYq7` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Player fullscreen para reprodução dos vídeos. Controles de play/pause, seek bar, volume, velocidade e modo fullscreen. Vídeo hospedado no AWS S3.

**Prompt de Desenvolvimento:**
```
Crie a tela de Player de Vídeo para o app Sauvia CRM em React Native (Expo).

Layout (fullscreen, landscape e portrait):
- Player ocupa toda a tela
- Overlay de controles (auto-hide em 3s):
  - Topo: botão voltar + título do vídeo
  - Centro: play/pause (ícone 60px)
  - Base: seek bar deslizável, tempo atual/total
  - Controles adicionais: volume, velocidade (0.5x/1x/1.5x/2x), fullscreen
- Indicador de loading (spinner #006b2c) enquanto buffer carrega

Stack:
- expo-av (Video component) ou react-native-video
- URL: presigned URL S3 obtida de GET /api/v1/videos/{id}/stream
- Orientação: StatusBar escondida, NavigationBar escondida
- Ao sair: salvar posição de progresso (POST /api/v1/patients/{id}/videos/{id}/progress)
- Ao completar 95% do vídeo: disparar evento "concluído"
```

---

### G11 · Tela 4 Resumo Pós-Vídeo
**ID Pencil:** `TFXTC` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Tela de feedback após assistir um vídeo. Mostra resumo do treino, campo de avaliação (estrelas) e sugestão de próximo vídeo. Celebração visual ao completar.

**Prompt de Desenvolvimento:**
```
Crie a tela "Resumo Pós-Vídeo" para o app Sauvia CRM em React Native (Expo).

Layout:
- Animação de confetti ou check animado no topo (Lottie)
- Título: "Ótimo trabalho! 💪"
- Card de resumo: nome do vídeo, duração assistida, calorias estimadas
- Avaliação do vídeo: 5 estrelas tocáveis (amarelas ao selecionar)
- Textarea "Como foi o treino?" (opcional)
- Card "Próximo vídeo recomendado" com thumbnail e botão "Assistir"
- Botão "Voltar para a biblioteca" no rodapé

Ao enviar avaliação: POST /api/v1/videos/{id}/rating
Após 2s: botão "Continuar" para navegar ao próximo ou voltar

Stack: lottie-react-native para animação de celebração
```

---

## 📱 MOBILE — PACIENTE (PAGAMENTO)

---

### Tela 13.1 · Planos e Preços
**ID Pencil:** `pn8Gr` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Tela de escolha de plano de assinatura para pacientes. Exibe os planos disponíveis com preços, benefícios e CTA de assinatura. Integrado com Stripe.

**Prompt de Desenvolvimento:**
```
Crie a tela "Planos e Preços" para o app Sauvia CRM em React Native (Expo).

Layout:
- Header: "Escolha seu plano"
- Toggle mensal/anual (anual com badge "Economize 20%")
- 3 cards de plano em ScrollView vertical:
  - Free: grátis, limitado a 1 nutricionista, sem vídeos
  - Pro: R$29,90/mês, nutricionistas ilimitados, biblioteca completa
  - Premium: R$49,90/mês, tudo do Pro + acompanhamento exclusivo
- Card recomendado: borda 2px #006b2c, badge "Mais popular" em laranja #F97316
- Cada card: lista de benefícios com ícone check verde
- Botão "Assinar [Plano]" → vai para Tela 13.2 Método de Pagamento
- Link "Termos de uso e política de cobrança" no rodapé

Dados: GET /api/v1/plans (lista de planos do Stripe)
```

---

### Tela 13.2 · Método de Pagamento
**ID Pencil:** `XFWKd` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Seleção do método de pagamento: Cartão de Crédito ou PIX. Cards de escolha com ícones e informações sobre cada método.

**Prompt de Desenvolvimento:**
```
Crie a tela "Método de Pagamento" para o app Sauvia CRM em React Native (Expo).

Layout:
- Header com botão voltar + "Pagamento" + indicador de etapa (2/3)
- Resumo do plano selecionado: nome, valor, período
- Título "Como deseja pagar?"
- Dois cards de método:
  - Cartão de Crédito/Débito: ícones Visa/Master/Amex, "Aprovação imediata"
  - PIX: logo do PIX, "Aprovação em até 30 minutos", "5% de desconto"
- Estado selecionado: borda #006b2c
- Botão "Continuar" → navega para tela correspondente (13.3 Cartão ou 13.4 PIX)

Segurança: badge "Pagamento seguro — SSL" no rodapé
```

---

### Tela 13.3 · Dados do Cartão
**ID Pencil:** `qJYH7` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Formulário de entrada de dados do cartão de crédito. Integrado com Stripe Elements para tokenização segura. Visualização do cartão em tempo real.

**Prompt de Desenvolvimento:**
```
Crie a tela "Dados do Cartão" para o app Sauvia CRM em React Native (Expo).

Layout:
- Header: botão voltar + "Cartão de Crédito" + etapa (3/3)
- Visualização do cartão (flip animado quando alterna frente/verso):
  - Fundo gradiente verde #006b2c → #00a847
  - Número mascarado: 0000 0000 0000 1234
  - Nome do titular, validade
- Campos abaixo do cartão:
  - Número do cartão (máscara, detecta bandeira automaticamente)
  - Nome do titular
  - Validade (MM/AA)
  - CVV (foca no verso do cartão visual)
- Checkbox "Salvar cartão para próximas compras"
- Botão "Finalizar pagamento — R$ XX,XX"
- Badge de segurança: ícone cadeado + "Powered by Stripe"

Integração: @stripe/stripe-react-native
POST /api/v1/payments/subscribe {planId, paymentMethodId}
```

---

### Tela 13.4 · PIX
**ID Pencil:** `5pqxD` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Geração e exibição do QR Code PIX para pagamento. Timer de expiração, botão para copiar código e instruções de como pagar.

**Prompt de Desenvolvimento:**
```
Crie a tela "Pagamento via PIX" para o app Sauvia CRM em React Native (Expo).

Layout:
- Header: "Pagar com PIX"
- Valor em destaque: "R$ 28,41" (com desconto 5% aplicado)
- Timer de expiração: "Válido por MM:SS" com barra de progresso decrescente em vermelho
- QR Code centralizado (200x200px) — usar react-native-qrcode-svg
- Instruções numeradas:
  1. Abra o app do seu banco
  2. Escolha pagar com PIX → QR Code ou Copia e Cola
  3. Escaneie o QR Code ou cole o código
  4. Confirme o pagamento
- Botão "Copiar código PIX" (Copia e Cola)
- Botão "Já paguei — Verificar pagamento" (outline)

Polling: GET /api/v1/payments/{id}/status a cada 5s até status = paid
Ao pagar: navega para Tela 13.5 Sucesso com animação
```

---

### Tela 13.5 · Sucesso
**ID Pencil:** `n80UX` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Confirmação de pagamento realizado com sucesso. Animação celebratória, resumo da assinatura e acesso ao app.

**Prompt de Desenvolvimento:**
```
Crie a tela "Pagamento Confirmado" para o app Sauvia CRM em React Native (Expo).

Layout:
- Fundo verde claro #e4fff9
- Animação Lottie de sucesso (check animado verde)
- Título: "Pagamento confirmado! 🎉" (Manrope Bold 24px, #006b2c)
- Subtítulo: "Bem-vindo ao Sauvia [Nome do Plano]"
- Card de resumo: plano, valor, próxima cobrança, método
- Botão "Começar a usar o Sauvia" (fundo #006b2c, full border-radius)
- Enviar e-mail de confirmação automaticamente (backend)

Navegar para: Home Dashboard
Limpar: stack de navegação de pagamento
```

---

### Tela 13.6 · Histórico de Pagamentos
**ID Pencil:** `LB3Ex` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Lista do histórico de cobranças e faturas do paciente. Filtros por período e opção de download de nota fiscal.

**Prompt de Desenvolvimento:**
```
Crie a tela "Histórico de Pagamentos" para o app Sauvia CRM em React Native (Expo).

Layout:
- Header: "Histórico de Pagamentos"
- Card "Assinatura atual":
  - Plano ativo, valor, próxima cobrança
  - Botão "Gerenciar plano" (mudar/cancelar)
- FlatList de faturas (ordenadas por data desc):
  - Data, descrição (ex: "Plano Pro — Março 2026"), valor
  - Badge status: Pago (verde) · Pendente (amarelo) · Falhou (vermelho)
  - Botão "Baixar comprovante" (PDF)
- Empty state: "Nenhuma cobrança ainda"

Dados: GET /api/v1/payments/history
Download: GET /api/v1/payments/{id}/receipt → abre PDF
```

---

## 📱 MOBILE — PACIENTE (WHATSAPP)

---

### Tela 14.1 · WhatsApp Opt-in
**ID Pencil:** `OfQJ0` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Tela de consentimento para receber notificações via WhatsApp. Mostra exemplos de mensagens que serão enviadas e solicita aceite de LGPD para comunicação.

**Prompt de Desenvolvimento:**
```
Crie a tela "Ativar WhatsApp" para o app Sauvia CRM em React Native (Expo).

Layout:
- Ilustração do WhatsApp no topo (ícone grande verde)
- Título: "Fique por dentro de tudo pelo WhatsApp"
- Subtítulo: "Receba lembretes e atualizações importantes"
- Preview de mensagens (3 cards tipo balão de chat):
  - "⏰ Lembrete: sua consulta é amanhã às 14h com Dra. Ana"
  - "📋 Seu novo plano alimentar está disponível!"
  - "💊 Hora de registrar sua refeição do almoço"
- Número de telefone pré-preenchido (editável)
- Checkbox LGPD: "Concordo em receber mensagens automáticas da Sauvia pelo WhatsApp"
- Botão "Ativar notificações" → verde
- Link "Não quero agora" → cinza, sem fundo

Ao ativar: PUT /api/v1/patients/{id}/whatsapp-consent {phone, consent: true}
```

---

### Tela 14.2 · WhatsApp Chat
**ID Pencil:** `sBKAV` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Interface de chat para comunicação direta entre paciente e nutricionista via mensagens no app (complementar ao WhatsApp externo).

**Prompt de Desenvolvimento:**
```
Crie a tela de Chat para o app Sauvia CRM em React Native (Expo).

Layout:
- Header: avatar do nutricionista + nome + status online (bolinha verde)
- FlatList de mensagens (invertida, mais recentes na base):
  - Mensagem do paciente: balão direita, fundo #006b2c, texto branco
  - Mensagem do nutri: balão esquerda, fundo branco, texto #00201d
  - Timestamp pequeno em cada mensagem
  - Indicador de leitura (✓✓ azul ou ✓ cinza)
- Mensagens especiais:
  - Compartilhamento de plano alimentar (card destacado)
  - Foto de refeição (miniatura tocável)
- Input bar na base (safe area):
  - TextInput "Escreva uma mensagem..."
  - Ícone de anexo (+ → câmera, galeria, arquivo)
  - Botão enviar (ícone send, #006b2c)

Stack: React Native FlatList com keyboardAvoidingView
WebSocket ou polling para mensagens em tempo real
GET /api/v1/conversations/{id}/messages
POST /api/v1/conversations/{id}/messages
```

---

### Tela 14.3 · WhatsApp Notificações
**ID Pencil:** `wZqDY` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Gerenciamento de preferências de notificações pelo WhatsApp. Toggle para cada tipo de mensagem (lembretes de consulta, plano alimentar, métricas, etc).

**Prompt de Desenvolvimento:**
```
Crie a tela "Notificações WhatsApp" para o app Sauvia CRM em React Native (Expo).

Layout:
- Header: "Notificações"
- Número do WhatsApp ativo em card verde claro
- Lista de categorias de notificação (SectionList):
  Consultas:
  - Lembrete 1 dia antes (Toggle)
  - Lembrete 2 horas antes (Toggle)
  - Confirmação de agendamento (Toggle)
  Plano Alimentar:
  - Lembretes de refeição (Toggle) + config de horários
  - Novo plano disponível (Toggle)
  Saúde:
  - Registro de métricas (Toggle) + frequência
  Marketing:
  - Dicas de nutrição (Toggle)
  - Novidades do app (Toggle)
- Cada toggle: Switch nativo (verde quando ativo)
- Botão "Desativar todas as notificações" no rodapé (texto vermelho)

Dados: GET/PUT /api/v1/patients/{id}/notification-preferences
```

---

## 📱 MOBILE — NUTRICIONISTA (CADASTRO)

---

### G6 · Dados e CRN (Cadastro Nutri)
**ID Pencil:** `neqII` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Tela de cadastro específica para nutricionistas. Coleta dados profissionais: CRN (Conselho Regional de Nutricionistas), especialidades e anos de experiência.

**Prompt de Desenvolvimento:**
```
Crie a tela "Dados Profissionais" do cadastro de Nutricionista para o app Sauvia CRM em React Native (Expo).

Layout:
- Header: progress bar (1/3) + "Dados profissionais"
- Título: "Suas informações como nutricionista"
- Campos:
  - Nome completo
  - CRN (máscara CRN-X 00000, validação de formato)
  - Estado de registro (Picker: SP, RJ, MG...)
  - Anos de experiência (Slider ou Picker: <1, 1-3, 3-5, 5-10, 10+)
  - Telefone profissional (WhatsApp para contato com pacientes)
  - LinkedIn ou site pessoal (opcional)
- Info box: "Seu CRN será verificado antes da aprovação da conta"
- Botão "Continuar" → G6 Especialidades

Validação: CRN regex + verificação formato pelo estado
```

---

### G6 · Especialidades
**ID Pencil:** `mEK3z` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Seleção das especialidades em nutrição do profissional. Chips multi-seleção com as principais áreas de atuação.

**Prompt de Desenvolvimento:**
```
Crie a tela "Especialidades" (passo 2/3 do cadastro de nutricionista) para o app Sauvia CRM em React Native (Expo).

Layout:
- Header: progress bar (2/3) + "Especialidades"
- Título: "Em quais áreas você atua?"
- Subtítulo: "Selecione todas que se aplicam (mín. 1)"
- Grid de chips de especialidade (3 por linha):
  Nutrição Clínica · Esportiva · Emagrecimento · Pediatria · Oncológica
  Gestacional · Vegetariana/Vegana · Comportamental · Funcional
  Renal · Cardíaca · Diabetes · Fitoterapia · Estética
- Chip selecionado: fundo #006b2c, texto branco
- Chip padrão: border #E5E7EB, fundo branco
- "Adicionar especialidade personalizada" (input livre)
- Contador: "X especialidades selecionadas"
- Botão "Continuar" → G6 Termos LGPD

Mínimo 1 especialidade para habilitar o botão
```

---

### G6 · Termos LGPD (Nutricionista)
**ID Pencil:** `KD924` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Tela de aceite dos termos de uso específicos para nutricionistas, incluindo responsabilidades profissionais, tratamento de dados de pacientes e conformidade com LGPD.

**Prompt de Desenvolvimento:**
```
Crie a tela "Termos e Responsabilidades" (passo 3/3 do cadastro nutri) para o app Sauvia CRM em React Native (Expo).

Layout:
- Header: progress bar (3/3) + "Termos"
- Título: "Antes de começar"
- ScrollView com texto dos termos (altura limitada com gradient fade no rodapé indicando mais conteúdo):
  - Responsabilidade profissional
  - Tratamento de dados de pacientes (LGPD)
  - Política de privacidade
  - Termos de uso da plataforma
- Checkboxes obrigatórios:
  - "Li e aceito os Termos de Uso"
  - "Confirmo que sou nutricionista registrado no CRN"
  - "Autorizo o tratamento dos dados dos meus pacientes conforme a LGPD"
  - "Aceito a Política de Privacidade"
- Botão "Criar conta profissional" (habilitado apenas com todos os checkboxes)
- Após criar: estado "Aguardando aprovação do CRN" (revisão manual)

POST /api/v1/auth/register/nutritionist {todos os dados das 3 etapas}
```

---

## 📱 MOBILE — NUTRICIONISTA (APP PRINCIPAL)

---

### G7 · Dashboard do Nutricionista
**ID Pencil:** `ySv0A` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Home do nutricionista no app mobile. Visão geral do dia: consultas de hoje, alertas de pacientes, tarefas pendentes e stats rápidos.

**Prompt de Desenvolvimento:**
```
Crie o Dashboard do Nutricionista para o app Sauvia CRM em React Native (Expo).

Layout:
- Header: "Olá, [Nome]" + data de hoje + avatar (topo direito)
- Card "Consultas de hoje" (destaque):
  - Número de consultas + barra do dia (horários ocupados visualizados)
  - Próxima: horário + nome do paciente + botão "Ver"
- Grid de stats (2x2):
  - Total de pacientes ativos
  - Consultas este mês
  - Planos ativos
  - Tarefas pendentes
- Seção "Alertas" (pacientes que precisam de atenção):
  - Badge vermelho em pacientes sem registro há X dias
  - Pacientes que cancelaram consulta
- Seção "Agenda do dia" (mini lista de consultas):
  - Horário, nome do paciente, tipo de consulta
  - Swipe right: "Confirmar" | Swipe left: "Cancelar"
- Tab bar: Home · Clientes · Agenda · Planos · Perfil

Dados: GET /api/v1/nutritionists/{id}/dashboard
```

---

### G7 · Clientes (Lista de Pacientes — Nutri)
**ID Pencil:** `72MEi` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Lista de todos os pacientes do nutricionista no app mobile. Busca, filtros por status (ativo/inativo) e acesso rápido ao perfil de cada paciente.

**Prompt de Desenvolvimento:**
```
Crie a tela "Clientes" do app do Nutricionista em React Native (Expo).

Layout:
- Header: "Meus Pacientes" + botão "+" para adicionar
- SearchBar com filtros:
  - Chips: Todos · Ativos · Inativos · Sem consulta recente
- FlatList de cards de paciente:
  - Avatar (40px) + Nome + última consulta (data relativa)
  - Badge de status: Ativo (verde) · Inativo (cinza)
  - Objetivo principal (chip pequeno)
  - Seta à direita → navega para perfil completo do paciente
- Ordenação: Alfabética / Mais recente / Próxima consulta
- Swipe actions no card:
  - Left: "Agendar consulta"
  - Right: "Ver prontuário"

Botão "+" → modal de busca/convite de novo paciente (enviar link via WhatsApp)
Dados: GET /api/v1/nutritionists/{id}/patients?status=&search=
```

---

### G7 · Tarefas
**ID Pencil:** `WS5nT` | **Dimensão:** 390×844 | **Status:** 🔴 Não Iniciado

**Descrição:**
Lista de tarefas e pendências do nutricionista. Criar planos alimentares, responder mensagens, revisar prontuários, etc.

**Prompt de Desenvolvimento:**
```
Crie a tela "Tarefas" do app do Nutricionista em React Native (Expo).

Layout:
- Header: "Tarefas" + contador de pendentes (badge vermelho)
- Tabs: "Pendentes" · "Concluídas"
- FlatList de tarefas agrupadas por prioridade:
  Alta (vermelho):
    - "Criar plano alimentar para João Silva" (prazo: hoje)
    - "Responder mensagem de Maria Costa"
  Normal (amarelo):
    - "Revisar métricas de 3 pacientes"
  Baixa (cinza):
    - "Atualizar especialidades do perfil"

Card de tarefa:
- Checkbox (ao marcar → move para Concluídas)
- Título da tarefa
- Nome do paciente vinculado (se houver)
- Prazo (badge vermelho se vencido)
- Ação rápida (botão "Ir" que navega diretamente ao contexto)

Criar tarefa: FAB (+) no canto inferior direito
Dados: GET/POST /api/v1/nutritionists/{id}/tasks
```

---

## 🌐 WEB — PAINEL DO NUTRICIONISTA (Next.js)

---

### G8 · Dashboard Web
**ID Pencil:** `s7OMB` | **Dimensão:** 1440×900 | **Status:** 🔴 Não Iniciado

**Descrição:**
Dashboard principal do CRM web para nutricionistas. Sidebar de navegação, KPIs em cards, gráfico de evolução de pacientes, agenda da semana e lista de atividades recentes.

**Prompt de Desenvolvimento:**
```
Crie o Dashboard Web do Nutricionista para o CRM Sauvia em Next.js 16 (App Router).

Layout (1440px):
- Sidebar esquerda fixa (240px):
  - Logo Sauvia + avatar do nutri
  - Navegação: Dashboard · Clientes · Agenda · Planos · Vídeos · Relatórios · Configurações
  - Item ativo: fundo rgba(0,107,44,0.1) + borda esquerda 3px #006b2c
- Área principal (1200px):
  - Top bar: título da página + busca global + notificações (sino) + avatar dropdown
  - Grid de KPIs (4 cards em row):
    - Total de pacientes · Consultas este mês · Receita · Taxa de retenção
    - Cada card: valor grande, trend (↑↓ com %), ícone Lucide
  - Gráfico de linha (Chart.js): "Evolução de pacientes — últimos 6 meses"
  - Row 2 colunas:
    - Agenda da semana (calendário mini)
    - Atividades recentes (feed de eventos)

Design: Tailwind CSS 4, glassmorphism em cards, sombra rgba(0,55,50,0.06)
Dados: GET /api/v1/nutritionists/{id}/dashboard
Server Component com fetch (ISR 60s)
```

---

### G8 · Clientes Web
**ID Pencil:** `hTyEx` | **Dimensão:** 1440×900 | **Status:** 🔴 Não Iniciado

**Descrição:**
Página de gestão de pacientes no CRM web. Tabela com filtros avançados, busca, paginação e ações rápidas por linha.

**Prompt de Desenvolvimento:**
```
Crie a página "Clientes" do CRM web Sauvia em Next.js 16.

Layout:
- Sidebar (mesmo do Dashboard) + área principal
- Top da página: título "Pacientes" + botão "Adicionar Paciente" (fundo #006b2c)
- Barra de filtros:
  - SearchInput (busca por nome, email, CPF)
  - Select: Status (Todos/Ativo/Inativo)
  - Select: Especialidade
  - DatePicker: Última consulta
  - Botão "Limpar filtros"
- Tabela de pacientes:
  Colunas: Avatar+Nome · Email · Telefone · Última Consulta · Próxima Consulta · Status · Ações
  - Status: badge colorido
  - Ações: olho (ver) · lápis (editar) · calendário (agendar) · três pontos (mais)
- Paginação (10/25/50 por página + nav de páginas)
- Linha hover: fundo rgba(0,107,44,0.04)

Modal "Adicionar Paciente":
- Formulário: nome, email, telefone, CPF, data nascimento, observações
- POST /api/v1/patients

Dados: GET /api/v1/patients?search=&status=&page=&limit=
Client Component (interatividade) com SWR
```

---

### G9 · Builder de Plano Alimentar Web
**ID Pencil:** `isSW6` | **Dimensão:** 1440×900 | **Status:** 🔴 Não Iniciado

**Descrição:**
Editor visual de planos alimentares. Interface drag-and-drop para organizar refeições e alimentos por dia da semana. Busca de alimentos com tabela nutricional automática.

**Prompt de Desenvolvimento:**
```
Crie o Builder de Plano Alimentar para o CRM web Sauvia em Next.js 16.

Layout:
- Header: "Novo Plano Alimentar" + campo de nome do plano + paciente selecionado
- Tabs de dias da semana: Seg · Ter · Qua · Qui · Sex · Sáb · Dom
- Para cada dia, coluna de refeições:
  - Café da manhã · Lanche manhã · Almoço · Lanche tarde · Jantar · Ceia
  - Cada refeição: título + kcal acumulado + lista de alimentos drag-and-drop
  - Botão "+ Adicionar alimento" em cada refeição
- Sidebar direita:
  - Busca de alimentos (TACO/IBGE database)
  - Resultado com nome, kcal/100g, macros
  - Arrastar para a refeição desejada
  - Painel de totais do dia: kcal, proteína, carbo, gordura (barras)
- Footer fixo: botão "Salvar rascunho" + botão "Enviar ao paciente"

Ao enviar: POST /api/v1/meal-plans {patientId, days: [{meals: [{foods: []}]}]}
Notificação automática WhatsApp ao paciente
```

---

### G10 · Agenda Web
**ID Pencil:** `0z9Kt` | **Dimensão:** 1440×900 | **Status:** 🔴 Não Iniciado

**Descrição:**
Calendário completo de agenda do nutricionista na versão web. Visualizações: semana e mês. Criar, editar e cancelar consultas com clique no calendário.

**Prompt de Desenvolvimento:**
```
Crie a página de Agenda para o CRM web Sauvia em Next.js 16.

Layout:
- Sidebar + top bar padrão
- Controles de calendário:
  - Botões: Hoje · ← → (semana/mês)
  - Toggle de view: Semana | Mês
  - Botão "Nova Consulta" (fundo #006b2c)
- Calendário (usar react-big-calendar ou FullCalendar):
  - View semana: colunas por dia, horários 07h-21h
  - Evento de consulta: bloco colorido com nome do paciente
  - Slot livre: fundo branco, hover cinza claro
  - Clicar em slot livre → modal de nova consulta
  - Clicar em evento → modal de detalhes/edição
- Mini calendário lateral (navegação rápida)
- Lista de consultas do dia selecionado

Modal de nova consulta:
- SearchInput de paciente (autocomplete)
- DateTimePicker + duração (30/45/60/90 min)
- Tipo: Presencial / Online (link)
- Observações
- Checkbox "Enviar WhatsApp de confirmação ao paciente"

Dados: GET /api/v1/appointments?start=&end=
POST /api/v1/appointments
```

---

### G10 · Cadastro Web (Ficha do Paciente)
**ID Pencil:** `IlBW9` | **Dimensão:** 1440×900 | **Status:** 🔴 Não Iniciado

**Descrição:**
Página completa de ficha do paciente no CRM web. Dados pessoais, histórico de consultas, prontuário, métricas de saúde e planos ativos em abas.

**Prompt de Desenvolvimento:**
```
Crie a página de Ficha do Paciente para o CRM web Sauvia em Next.js 16.

Layout (1440px):
- Sidebar padrão + área principal
- Header do paciente:
  - Avatar (80px) + nome + badge de status + botões: "Agendar" · "Enviar mensagem" · "…"
  - Row de dados rápidos: idade, último contato, plano ativo, próxima consulta
- Tabs principais:
  [Visão Geral] [Prontuário] [Consultas] [Planos Alimentares] [Métricas] [Documentos]

Tab "Visão Geral":
- Dados pessoais completos (editáveis inline)
- Card "Objetivos e restrições"
- Timeline de atividades recentes

Tab "Prontuário":
- Editor de texto rico (TipTap ou Quill) para anotações
- Upload de PDFs criptografados (drag & drop)
- Lista de documentos com preview e download
- Todos os PDFs criptografados com Fernet no backend

Tab "Métricas":
- Gráficos de evolução (Chart.js): peso, IMC, pressão
- Tabela de medições com data e valores
- Botão "Adicionar medição"

Dados: GET /api/v1/patients/{id} + /vitals + /records + /appointments + /meal-plans
```

---

## 🌐 WEB — ADMIN PANEL

---

### Admin · Tela 1 Dashboard Admin
**ID Pencil:** `mFUCT` | **Dimensão:** 1440×900 | **Status:** 🔴 Não Iniciado

**Descrição:**
Dashboard administrativo para gestão da plataforma SaaS. Métricas de negócio: MRR, churn, novos usuários, nutricionistas ativos, receita por plano.

**Prompt de Desenvolvimento:**
```
Crie o Dashboard Admin para o Sauvia em Next.js 16. Acesso restrito a role=admin.

Layout:
- Sidebar diferente (cor escura #00201d) + logo admin
- KPIs em cards (row de 5):
  - MRR (R$) · Usuários totais · Nutricionistas · Churn rate · NPS
- Gráfico de linha dupla: Receita vs. Novos usuários (últimos 12 meses)
- Tabela: Planos mais assinados (nome, quantidade, % do total, receita)
- Feed: últimas atividades da plataforma (novos cadastros, pagamentos, cancelamentos)
- Alertas do sistema: serviços down, erros críticos, high latency

Dados: GET /api/v1/admin/metrics (rota protegida, JWT com role admin)
Server Component com revalidação a cada 5 minutos
```

---

### Admin · Tela 2 Gestão de Vídeos
**ID Pencil:** `B6L8U` | **Dimensão:** 1440×900 | **Status:** 🔴 Não Iniciado

**Descrição:**
Painel para upload e gestão de vídeos da biblioteca. Upload múltiplo para S3, categorização, thumbnails e publicação.

**Prompt de Desenvolvimento:**
```
Crie a página de Gestão de Vídeos do Admin Sauvia em Next.js 16.

Layout:
- Sidebar admin + título "Biblioteca de Vídeos"
- Botão "Novo Vídeo" abre drawer lateral
- Filtros: categoria, status (publicado/rascunho/processando)
- Grid de vídeos (3 colunas):
  - Thumbnail + título + categoria + status badge + duração
  - Ações: editar, publicar/despublicar, deletar

Drawer "Novo Vídeo":
- Upload de arquivo (drag & drop) com progresso em barra
- Campos: título, descrição, categoria, nível, duração estimada
- Upload de thumbnail (crop 16:9)
- Status: Rascunho | Publicado
- Preview do vídeo após upload

Upload flow:
1. POST /api/v1/admin/videos/upload-url → retorna presigned URL S3
2. PUT diretamente para S3 (com progresso)
3. POST /api/v1/admin/videos {s3Key, metadata}
4. Backend processa thumbnail automaticamente

Dados: GET /api/v1/admin/videos?status=&category=
```

---

### Admin · Tela 3 Gestão de Usuários
**ID Pencil:** `8glcY` | **Dimensão:** 1440×900 | **Status:** 🔴 Não Iniciado

**Descrição:**
Tabela de todos os usuários da plataforma (nutricionistas e pacientes). Filtros, busca, aprovação de CRN, banimento e impersonação para suporte.

**Prompt de Desenvolvimento:**
```
Crie a página de Gestão de Usuários do Admin Sauvia em Next.js 16.

Layout:
- Tabs: "Nutricionistas" | "Pacientes" | "Pendente Aprovação"
- Tabela de usuários:
  Colunas: Avatar+Nome · Email · Tipo · Status · Plano · Criado em · Ações
  Ações por linha: Ver · Editar · Suspender · Deletar · Impersonar (ícone de olho)
- "Pendente Aprovação" (nutricionistas aguardando verificação CRN):
  - Nome, CRN informado, data de cadastro
  - Botão "Aprovar" (verde) / "Rejeitar" (vermelho)
  - Ao aprovar: usuário recebe e-mail e WhatsApp de boas-vindas

Modal de usuário:
- Dados completos
- Histórico de ações (log de auditoria LGPD)
- Alterar role, suspender, enviar reset de senha

POST /api/v1/admin/users/{id}/approve
POST /api/v1/admin/users/{id}/suspend
GET  /api/v1/admin/users/{id}/audit-log
```

---

### Admin · Tela 4 Disparos WhatsApp
**ID Pencil:** `0CFz5` | **Dimensão:** 1440×900 | **Status:** 🔴 Não Iniciado

**Descrição:**
Painel de gestão de campanhas e disparos automáticos de WhatsApp. Histórico de mensagens, templates, taxas de entrega e criação de novos fluxos.

**Prompt de Desenvolvimento:**
```
Crie a página de Disparos WhatsApp do Admin Sauvia em Next.js 16.

Layout:
- KPIs em cards: Mensagens enviadas hoje · Taxa de entrega · Opt-ins ativos · Falhas
- Tabs: "Histórico" | "Templates" | "Campanhas" | "Configurações"

Tab "Histórico":
- Tabela: Data · Destinatário · Tipo de mensagem · Status (Entregue/Falhou/Pendente)
- Filtros por data, tipo, status
- Exportar CSV

Tab "Templates":
- Lista de templates aprovados no WhatsApp Business
- Status de aprovação (aprovado/pendente/rejeitado)
- Botão "Criar template" (envia para revisão Meta)

Tab "Campanhas":
- Criar campanha de disparo em massa
- Segmentação: todos pacientes · por plano · por nutricionista · por inatividade
- Agendar envio (data e hora)
- Preview da mensagem

Tab "Configurações":
- Webhook URL da Evolution API
- Número de WhatsApp Business ativo
- Rate limits configurados

Integração: Evolution API (whatsapp microservice)
Dados: GET /api/v1/admin/whatsapp/messages
```

---

## 🌐 WEB — LANDING PAGES

---

### LP Nutricionistas — CRM
**ID Pencil:** `9W1XI` | **Dimensão:** 1440×900 | **Status:** ✅ Pronto

**Descrição:**
Landing page B2B para aquisição de nutricionistas. Já implementada em `/landing-nutritionist`.

**URL:** `/landing-nutritionist`
**Prompt:** Não necessário — já implementado.

---

### LP Pacientes — CRM
**ID Pencil:** `m0oES` | **Dimensão:** 1440×900 | **Status:** ✅ Pronto

**Descrição:**
Landing page B2C para aquisição de pacientes. Já implementada em `/landing-client`.

**URL:** `/landing-client`
**Prompt:** Não necessário — já implementado.

---

## 🌐 WEB — AUTH (Next.js)

---

### Auth Web · Escolha de Perfil
**ID Pencil:** `tTZ82` | **Dimensão:** 1440×900 | **Status:** 🔴 Não Iniciado

**Descrição:**
Tela web de seleção de tipo de usuário no início do cadastro. Layout dividido em dois painéis visuais (paciente e nutricionista).

**Prompt de Desenvolvimento:**
```
Crie a página de Escolha de Perfil do auth web para o Sauvia em Next.js 16.

Layout (1440px, split screen):
- Lado esquerdo (50%): fundo gradiente mint #e4fff9 → branco
  - Card grande centralizado com ícone User, título "Sou Paciente"
  - Descrição e benefícios listados
  - Botão "Começar como Paciente"
- Lado direito (50%): fundo gradiente verde suave
  - Card com ícone Stethoscope, "Sou Nutricionista"
  - Benefícios profissionais
  - Botão "Começar como Nutricionista"
- Logo Sauvia centralizada na divisão (absoluta)
- Link "Já tenho conta? Entrar" no rodapé centralizado

Responsividade: em mobile, vira layout vertical (2 cards empilhados)
Navega para: /auth/cadastro/nutricionista ou /auth/cadastro/paciente
```

---

### Auth Web · Cadastro Nutricionista
**ID Pencil:** `6FThs` | **Dimensão:** 1440×900 | **Status:** 🔴 Não Iniciado

**Descrição:**
Formulário de cadastro web para nutricionistas. Layout em 2 colunas: formulário à esquerda, benefícios/depoimento à direita.

**Prompt de Desenvolvimento:**
```
Crie a página de Cadastro do Nutricionista para o auth web Sauvia em Next.js 16.

Layout (1440px, 2 colunas):
- Coluna esquerda (60%): formulário de cadastro
  - Barra de progresso (3 etapas)
  - Etapa 1: nome, email, senha, CRN, telefone
  - Etapa 2: especialidades (chips)
  - Etapa 3: foto, termos e confirmação
  - Botões Anterior/Próximo + submit
- Coluna direita (40%): panel de benefícios
  - Fundo gradiente verde
  - Título: "Transforme sua prática"
  - 5 benefícios com ícone check
  - Depoimento de nutricionista real (foto, nome, CRN)
  - Stats: "2.500+ nutricionistas já usam"

Integração: Clerk SignUp customizado ou POST /api/v1/auth/register/nutritionist
Validação: react-hook-form + zod
```

---

### Auth Web · Cadastro Paciente
**ID Pencil:** `Pr6nQ` | **Dimensão:** 1440×900 | **Status:** 🔴 Não Iniciado

**Descrição:**
Formulário de cadastro web para pacientes. Mais simples que o do nutricionista, com foco em dados básicos e objetivos de saúde.

**Prompt de Desenvolvimento:**
```
Crie a página de Cadastro do Paciente para o auth web Sauvia em Next.js 16.

Layout (1440px):
- Coluna esquerda (55%): formulário
  - Etapa única (simplificado vs mobile):
    - Nome completo, email, senha
    - Data nascimento, telefone/WhatsApp
    - Objetivos de saúde (chips)
    - Restrições alimentares (chips)
    - Checkbox LGPD
  - Botão "Criar minha conta" (fundo #006b2c)
  - "Já tenho conta? Entrar"
- Coluna direita (45%): visual motivacional
  - Imagem ou ilustração de pessoa saudável
  - Stats: "50K+ pacientes · 4.9★ avaliação"
  - Depoimento de paciente

Após cadastro: redireciona para /dashboard/paciente
Integração: Clerk ou POST /api/v1/auth/register
```

---

### Auth Web · Cadastro Empresa
**ID Pencil:** `kRhFz` | **Dimensão:** 1440×900 | **Status:** 🔴 Não Iniciado

**Descrição:**
Cadastro para clínicas e empresas que querem usar o Sauvia para múltiplos nutricionistas. Dados de CNPJ, razão social e configuração do plano corporativo.

**Prompt de Desenvolvimento:**
```
Crie a página de Cadastro de Empresa para o auth web Sauvia em Next.js 16.

Layout (1440px):
- Header: logo + "Plano Empresarial"
- Formulário centralizado (600px max-width):
  - Seção "Dados da empresa":
    CNPJ (validação e máscara) · Razão Social · Nome Fantasia
    Telefone corporativo · Site
  - Seção "Responsável":
    Nome, Cargo, E-mail, Telefone direto
  - Seção "Configuração":
    Nº de nutricionistas estimados (Slider: 1-5, 6-20, 21-50, 50+)
    Especialidades de interesse (chips)
  - Checkbox termos de uso empresariais
  - Botão "Solicitar demonstração" (lead qualificado → vendas)

Após envio: página de confirmação + e-mail automático para o time comercial
POST /api/v1/leads/enterprise {dados da empresa}
```

---

### Auth Web · Login
**ID Pencil:** `g4QUK` | **Dimensão:** 1440×900 | **Status:** 🔴 Não Iniciado

**Descrição:**
Página de login web. Layout simples e limpo, com formulário à esquerda e visual à direita. Suporte a login social (Google) e recuperação de senha.

**Prompt de Desenvolvimento:**
```
Crie a página de Login para o auth web Sauvia em Next.js 16.

Layout (1440px, split):
- Coluna esquerda (50%): formulário de login
  - Logo Sauvia no topo
  - Título: "Bem-vindo de volta"
  - Campo: E-mail
  - Campo: Senha + toggle visibilidade
  - Checkbox "Lembrar de mim"
  - Botão "Entrar" (fundo #006b2c, full-width, 52px)
  - Divider "ou"
  - Botão Google OAuth (outline)
  - Links: "Esqueci minha senha" | "Criar conta"
- Coluna direita (50%): fundo verde gradiente
  - Logo grande em branco
  - Tagline: "Nutrição que transforma vidas"
  - 3 benefícios com ícone (Lucide, branco)

Integração: Clerk useSignIn + signInWithOAuth('oauth_google')
Recuperação de senha: /auth/reset-password
Após login: redirect baseado em role (paciente/nutricionista/admin)
```

---

## 📋 Resumo de Status para Importação no Notion

| Tela | Plataforma | Grupo | Status | Pencil ID |
|------|-----------|-------|--------|-----------|
| Splash Screen | Mobile | Auth | 🟡 Em Design | ADwPV |
| Login | Mobile | Auth | 🟡 Em Design | mH2LN |
| Escolha de Perfil | Mobile | Auth | 🟡 Em Design | JXKp0 |
| Dados Pessoais | Mobile | Onboarding | 🟡 Em Design | YABYx |
| Preferências | Mobile | Onboarding | 🟡 Em Design | RXby2 |
| Foto e Conclusão | Mobile | Onboarding | 🟡 Em Design | oIYDN |
| Home Dashboard | Mobile | Paciente | 🔴 Não Iniciado | BvR31 |
| Buscar Profissional | Mobile | Paciente | 🔴 Não Iniciado | Kn7Oj |
| Perfil do Paciente | Mobile | Paciente | 🔴 Não Iniciado | ev7nJ |
| Agendar Consulta | Mobile | Agenda | 🔴 Não Iniciado | KTN1b |
| Minhas Consultas | Mobile | Agenda | 🔴 Não Iniciado | xc0mZ |
| Métricas de Saúde | Mobile | Saúde | 🔴 Não Iniciado | d0b4B |
| Diário Alimentar | Mobile | Alimentação | 🔴 Não Iniciado | rioyr |
| Plano Alimentar | Mobile | Alimentação | 🔴 Não Iniciado | HpCvB |
| Biblioteca Vídeos | Mobile | Vídeos | 🔴 Não Iniciado | 009oO |
| Detalhe Vídeo | Mobile | Vídeos | 🔴 Não Iniciado | q1vpB |
| Player Vídeo | Mobile | Vídeos | 🔴 Não Iniciado | OGYq7 |
| Resumo Pós-Vídeo | Mobile | Vídeos | 🔴 Não Iniciado | TFXTC |
| Planos e Preços | Mobile | Pagamento | 🔴 Não Iniciado | pn8Gr |
| Método Pagamento | Mobile | Pagamento | 🔴 Não Iniciado | XFWKd |
| Dados do Cartão | Mobile | Pagamento | 🔴 Não Iniciado | qJYH7 |
| PIX | Mobile | Pagamento | 🔴 Não Iniciado | 5pqxD |
| Sucesso Pagamento | Mobile | Pagamento | 🔴 Não Iniciado | n80UX |
| Histórico Pagamentos | Mobile | Pagamento | 🔴 Não Iniciado | LB3Ex |
| WhatsApp Opt-in | Mobile | WhatsApp | 🔴 Não Iniciado | OfQJ0 |
| WhatsApp Chat | Mobile | WhatsApp | 🔴 Não Iniciado | sBKAV |
| WhatsApp Notificações | Mobile | WhatsApp | 🔴 Não Iniciado | wZqDY |
| Dados e CRN | Mobile | Nutri Cadastro | 🔴 Não Iniciado | neqII |
| Especialidades | Mobile | Nutri Cadastro | 🔴 Não Iniciado | mEK3z |
| Termos LGPD | Mobile | Nutri Cadastro | 🔴 Não Iniciado | KD924 |
| Dashboard Nutri | Mobile | Nutricionista | 🔴 Não Iniciado | ySv0A |
| Clientes (Mobile) | Mobile | Nutricionista | 🔴 Não Iniciado | 72MEi |
| Tarefas | Mobile | Nutricionista | 🔴 Não Iniciado | WS5nT |
| Dashboard Web | Web | Painel Nutri | 🔴 Não Iniciado | s7OMB |
| Clientes Web | Web | Painel Nutri | 🔴 Não Iniciado | hTyEx |
| Builder Plano Web | Web | Painel Nutri | 🔴 Não Iniciado | isSW6 |
| Agenda Web | Web | Painel Nutri | 🔴 Não Iniciado | 0z9Kt |
| Ficha Paciente Web | Web | Painel Nutri | 🔴 Não Iniciado | IlBW9 |
| Admin Dashboard | Web | Admin | 🔴 Não Iniciado | mFUCT |
| Admin Vídeos | Web | Admin | 🔴 Não Iniciado | B6L8U |
| Admin Usuários | Web | Admin | 🔴 Não Iniciado | 8glcY |
| Admin WhatsApp | Web | Admin | 🔴 Não Iniciado | 0CFz5 |
| LP Nutricionistas | Web | Landing | ✅ Pronto | 9W1XI |
| LP Pacientes | Web | Landing | ✅ Pronto | m0oES |
| Auth Escolha Perfil | Web | Auth | 🔴 Não Iniciado | tTZ82 |
| Auth Cadastro Nutri | Web | Auth | 🔴 Não Iniciado | 6FThs |
| Auth Cadastro Paciente | Web | Auth | 🔴 Não Iniciado | Pr6nQ |
| Auth Cadastro Empresa | Web | Auth | 🔴 Não Iniciado | kRhFz |
| Auth Login Web | Web | Auth | 🔴 Não Iniciado | g4QUK |

---

**Total de telas:** 49 (53 frames funcionais · 2 já prontas · 2 de infraestrutura)
**Gerado em:** 12 de Abril de 2026
**Fonte:** `fulll_app.pdf.pen` (55 frames mapeados via Pencil MCP)
