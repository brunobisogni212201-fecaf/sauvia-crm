  # Histórico de Migração: Cognito → Clerk

  ## Visão Geral do Projeto

  **Sauvia** é um CRM completo para nutricionistas com:

  - Frontend: Next.js 16 (App Router)
  - Backend: FastAPI (Python)
  - Database: PostgreSQL (RDS São Paulo)
  - Cache: Redis
  - Auth: AWS Cognito → **Clerk** (em migração)
  - WhatsApp: Evolution API

  ---

  ## Cronologia das Alterações

  ### 1. Setup Inicial Clerk (2026-04-13)

  #### Objetivo

  Substituir AWS Cognito por Clerk para autenticação.

  #### Requisitos do Prompt

  - Usar `clerkMiddleware()` em `proxy.ts`
  - `<ClerkProvider>` dentro de `<body>` em `layout.tsx`
  - Usar `<Show>` em vez de `<SignedIn>/<SignedOut>`
  - Usar App Router, não Pages Router
  - Modo Keyless (sem API keys necessárias)

  #### Instalação Frontend

  ```bash
  cd apps/web
  pnpm add @clerk/nextjs
  ```

  #### Arquivos Criados/Modificados

  | Arquivo                                            | Ação                           |
  | -------------------------------------------------- | ------------------------------ |
  | `apps/web/package.json`                            | Adicionado `@clerk/nextjs`     |
  | `apps/web/src/proxy.ts`                            | **NOVO** - clerkMiddleware     |
  | `apps/web/src/app/layout.tsx`                      | **MODIFICADO** - ClerkProvider |
  | `apps/web/src/app/sign-in/[[...sign-in]]/page.tsx` | **NOVO** - Página sign-in      |
  | `apps/web/src/app/sign-up/[[...sign-up]]/page.tsx` | **NOVO** - Página sign-up      |

  #### Código do proxy.ts

  ```typescript
  import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

  const isPublicRoute = createRouteMatcher([
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/auth(.*)",
  ]);

  export default clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
  });

  export const config = {
    matcher: [
      "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
      "/(api|trpc)(.*)",
    ],
  };
  ```

  ---

  ### 2. Diseño - Telas de Login (Pencil)

  #### Node IDs do Design

  - **Tela Login Web**: `a8v9W`, `zH3jq`, `2ubGL`, `yiiku`, `nVuea`
  - **Tela Splash Mobile**: `ADwPV`
  - **Tela Login Mobile**: `mH2LN`
  - **Tela Cadastro Mobile**: `JXKp0`

  #### Elementos do Design - Web

  - **Brand**: "Saúde+" (roxo, 28px, bold)
  - **Eyebrow**: "ACESSO PERSONALIZADO" (roxo, 12px)
  - **Título**: "Como você quer entrar na plataforma?" (64px, bold)
  - **Subtítulo**: Explicação sobre perfis separados
  - **3 Cards de Perfil**:
    - Nutricionista (ícone roxo, botão roxo)
    - Paciente (ícone teal, botão teal)
    - Empresa (fundo escuro, botão branco)
  - **Login Pill**: "Já tenho conta" (canto superior direito)

  #### Elementos do Design - Mobile

  - **Splash**: Gradiente roxo, logo + tagline
  - **Login**: Campos email/senha, botão Entrar, Google, link cadastro
  - **Cadastro**: 3 passos (Dados → Perfil → Confirmação)

  ---

  ### 3. Implementação Web - Página Sign-In

  #### Arquivo: `apps/web/src/app/sign-in/[[...sign-in]]/page.tsx`

  Funcionalidades implementadas:

  1. **Seleção de Perfil**: 3 botões para Nutricionista/Paciente/Empresa
  2. **Clerk SignIn**: Componente Clerk integrado com aparência customizada
  3. **Animações**: Framer Motion para transições
  4. **Background**: Glows em roxo e mint

  #### Estrutura

  - Step 1: Seleção de perfil (cards)
  - Step 2: Clerk SignIn component
  - Botão "Voltar" entre steps

  #### Estilos Clerk Customizados

  ```typescript
  appearance={{
    elements: {
      formButtonPrimary: 'bg-primary hover:bg-primary-dark text-white rounded-full py-3 font-semibold',
      input: 'border border-secondary/30 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary',
      dividerLine: 'bg-secondary/30',
    },
  }}
  ```

  ---

  ### 4. Implementação Mobile (Expo)

  #### Arquivo: `apps/mobile/app/(auth)/login.tsx`

  Telas implementadas:

  1. **Splash Screen** (2 segundos)
  2. **Seleção de Tipo** (Nutricionista/Paciente/Empresa)
  3. **Login** (email + senha + Google)
  4. **Registro** (3 passos com progress indicator)

  #### Arquivo: `apps/mobile/lib/clerk.ts`

  Funções para integração Clerk:

  - `signInWithClerk()` - Login via WebBrowser
  - `signUpWithClerk()` - Registro via WebBrowser
  - `signOut()` - Logout
  - `getStoredToken()` - Pegar token do SecureStore

  #### Arquivo: `apps/mobile/app/_layout.tsx`

  ClerkProvider wrapping:

  ```typescript
  <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
    {/* app content */}
  </ClerkProvider>
  ```

  ---

  ### 5. Backend FastAPI

  #### Arquivo: `apps/backend/pyproject.toml`

  Adicionado:

  ```toml
  "clerk-sdk>=0.3.0",
  "httpx>=0.28.0",
  ```

  #### Arquivo: `apps/backend/src/config.py`

  Adicionado settings:

  ```python
  # Clerk
  clerk_secret_key: str = ""
  clerk_publishable_key: str = ""
  ```

  #### Arquivo: `apps/backend/src/adapters/driving/api/v1/auth_router.py`

  - Substituído boto3 (Cognito) por Clerk SDK
  - Mantido JWT próprio para sessões backend
  - Endpoints: `/register`, `/login`, `/refresh`, `/logout`, `/me`

  #### Arquivo: `apps/backend/src/adapters/driving/api/v1/oauth_router.py`

  - Simplificado para Clerk
  - `/auth/login` → redireciona para sign-in
  - `/auth/callback` → handle Clerk callback

  ---

  ### 6. Variáveis de Ambiente

  #### `.env.local`

  ```bash
  # CLERK AUTHENTICATION
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c2hpbmluZy1tZWVya2F0LTUxLmNsZXJrLmFjY291bnRzLmRldiQ
  CLERK_SECRET_KEY=sk_test_T8wzZ8u1hgRdoq4gSUrXHSVTw61gvFJqKwm3sg5GZG
  NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
  NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
  NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

  # MOBILE
  EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c2hpbmluZy1tZWVya2F0LTUxLmNsZXJrLmFjY291bnRzLmRldiQ
  CLERK_REDIRECT_URL=sauvia://callback

  # Deprecated (Cognito)
  # COGNITO_USER_POOL_ID=us-east-1_Zftb4N8wn
  # COGNITO_REGION=us-east-1
  # COGNITO_CLIENT_ID=...
  ```

  ---

  ### 7. Configuração Clerk Dashboard

  #### URLs de Redirect (adicionar no dashboard.clerk.com)

  **Desenvolvimento:**

  ```
  http://localhost:3000/sign-in
  http://localhost:3000/sign-up
  http://localhost:3000/
  ```

  **Produção:**

  ```
  https://sauvia.qzz.io/sign-in
  https://sauvia.qzz.io/sign-up
  https://sauvia.qzz.io/
  ```

  **Mobile:**

  ```
  sauvia://callback
  ```

  ---

  ## Status atual

  | Componente             | Status          |
  | ---------------------- | --------------- |
  | Frontend Web (Next.js) | ✅ Configurado  |
  | Clerk Provider         | ✅ Configurado  |
  | Sign-In Page Web       | ✅ Implementado |
  | Sign-Up Page Web       | ✅ Implementado |
  | Mobile (Expo)          | ✅ Implementado |
  | Backend (FastAPI)      | ✅ Configurado  |
  | Clerk Keys             | ✅ Inseridas    |
  | Teste Sign-In/Sign-Up  | ⏳ Pendente     |

  ---

  ## Próximos Passos

  1. **Testar autenticação** no navegador
  2. **Adicionar redirect URLs** no Clerk Dashboard
  3. **Limpar AWS** (CodePipeline, CodeBuild, ALBs extras)
  4. **Migrar usuários existentes** do Cognito para Clerk (se necessário)

  ---

  ## Links Úteis

  - Clerk Dashboard: https://dashboard.clerk.com
  - Clerk Docs: https://clerk.com/docs/nextjs/quickstart
  - Frontend: http://localhost:3000
  - Mobile: `cd apps/mobile && pnpm start`

  ---

  **Última atualização**: 2026-04-13
  **Versão**: 1.0 (Migração Cognito → Clerk)
