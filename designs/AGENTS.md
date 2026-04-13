# Sauvia Design System - Especificações para Agentes

> Guia completo de implementação do Design System para o CRM de Nutricionistas

---

## 1. Visão Geral do Projeto

### Stack Tecnológico

- **Frontend Web**: Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Framer Motion
- **Frontend Mobile**: React Native (Expo), TypeScript
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL (AWS RDS São Paulo)
- **Design Tool**: Pencil (MCP)

### Estrutura de Diretórios

```
sauvia-app/
├── designs/                    ← Especificações de design
│   ├── AGENTS.md              ← Este arquivo (guia para agentes)
│   ├── DESIGN-SYSTEM.md       ← Tokens de design
│   ├── MVP-LAYOUTS.md         ← Layouts de implementação
│   ├── SCREEN-TEMPLATES.md    ← Wireframes visuais
│   └── [projeto].pen          ← Arquivos de design Pencil
│
├── apps/
│   ├── web/src/
│   │   └── components/
│   │       ├── primitives/    ← Button, Input, Card...
│   │       ├── layout/       ← Container, Grid, Flex...
│   │       ├── feedback/     ← Alert, Skeleton, Modal...
│   │       └── navigation/   ← Sidebar, Tabs...
│   │
│   └── mobile/
│       └── src/
│           └── components/
│               ├── primitives/   ← Componentes base
│               ├── svg/          ← SVG components
│               └── animations/   ← Animações CSS
│
└── packages/
    └── ui/src/
        └── index.ts            ← Export único (@sauvia/ui)
```

---

## 2. Design Tokens (Extraídos do Pencil)

### Cores - Primary (Roxo)

```css
--color-primary: #7C3AED /* Principal */ --color-primary-light: #8B5CF6
  /* Hover/active */ --color-primary-dark: #5B21B6 /* Backgrounds escuros */;
```

### Cores - Secondary (Lavanda)

```css
--color-secondary: #A78BFA /* CTA/Accent */ --color-secondary-light: #C4B5FD
  /* Hover */;
```

### Cores - Surface (Neutro quente)

```css
--color-surface: hsl(40, 20%, 98%) /* Background principal */
  --color-surface-container: hsl(40, 15%, 94%) /* Cards */
  --color-surface-container-high: hsl(40, 10%, 90%) /* Elementos elevados */;
```

### Cores - Texto

```css
--color-on-surface: hsl(210, 20%, 12%) /* Texto primário */
  --color-on-surface-variant: hsl(210, 10%, 40%) /* Texto secundário */;
```

### Cores - Semânticas

```css
--color-error: #ba1a1a --color-success: #16a34a --color-warning: #f59e0b;
```

### Tipografia

```css
--font-display:
  "Manrope",
  sans-serif /* Headings */ --font-body: "Plus Jakarta Sans" /* Body/UI */
    /* Hierarchy */ h1: 2.5rem (40px) - Page titles h2: 2rem (32px) - Section
    titles h3: 1.5rem (24px) - Card titles h4: 1.25rem (20px) - Subtitles
    body: 1rem (16px) - Default text small: 0.875rem (14px) - Secondary;
```

### Sombras (Sempre roxo-tinted!)

```css
--shadow-sm: 0 1px 3px rgba(124, 58, 237, 0.06) --shadow-md: 0 4px 12px
  rgba(124, 58, 237, 0.08) --shadow-lg: 0 8px 24px rgba(124, 58, 237, 0.12);
```

### Border Radius

```css
--radius-cards: 1rem (16px) --radius-buttons: 9999px (full/pill)
  --radius-inputs: 0.75rem (12px) --radius-images: 0.5rem (8px);
```

### Glassmorphism

```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
```

---

## 3. Regras de Design

### ❌ Proibido

1. **NUNCA usar borders de 1px** - Usar mudança de cor para separação
2. **NUNCA usar sombras pretas** - Sempre roxo-tinted (rgba(124, 58, 237, x))
3. **NUNCA hardcoded dimensions em texto** - Usar textGrowth e layout

### ✅ Obrigatório

1. Corner radius: `1rem` para cards, `full` para botões
2. Shady: Always usar tokens de `--shadow-*`
3. Glassmorphism: `backdrop-blur: 20px` para overlays/nav
4. Acessibilidade: Manter WCAG AA contrast ratios

---

## 4. Componentes (24+)

### 4.1 Primitives (Base)

| #   | Componente | Props Principais                            |
| --- | ---------- | ------------------------------------------- |
| 1   | Button     | variant, size, loading, icon, iconPosition  |
| 2   | Input      | label, error, icon, type, placeholder       |
| 3   | Card       | variant (default\|elevated\|glass), padding |
| 4   | Badge      | variant, size, dot                          |
| 5   | Avatar     | src, alt, size, fallback                    |
| 6   | IconButton | icon, variant, size                         |
| 7   | Checkbox   | checked, label, disabled                    |
| 8   | Radio      | options, value, onChange                    |
| 9   | Switch     | checked, label, disabled                    |
| 10  | Select     | options, value, placeholder                 |

### 4.2 Layout

| #   | Componente | Descrição                      |
| --- | ---------- | ------------------------------ |
| 11  | Container  | Wrapper responsivo (max-width) |
| 12  | Grid       | Sistema de grid (12 colunas)   |
| 13  | Flex       | Alinhamento flex com gap       |
| 14  | Stack      | Controle de gap/spacing        |
| 15  | Divider    | Separador horizontal/vertical  |
| 16  | Spacer     | Gap visual                     |

### 4.3 Feedback

| #   | Componente | Props                                    |
| --- | ---------- | ---------------------------------------- |
| 17  | Alert      | variant, title, description, dismissible |
| 18  | Skeleton   | variant, width, height, animated         |
| 19  | Modal      | open, title, children, onClose           |
| 20  | Toast      | variant, message, duration, onDismiss    |
| 21  | Progress   | variant (linear\|circular), value, label |
| 22  | Tooltip    | content, children, position              |
| 23  | EmptyState | icon, title, description, action         |

### 4.4 Navegação

| #   | Componente | Descrição                    |
| --- | ---------- | ---------------------------- |
| 24  | Sidebar    | Nav desktop com glass effect |
| 25  | BottomTabs | Nav mobile bottom            |
| 26  | Breadcrumb | Trilha de navegação          |
| 27  | Pagination | Controles de paginação       |
| 28  | Tabs       | Abas horizontais             |

### 4.5 Dados

| #   | Componente | Descrição                   |
| --- | ---------- | --------------------------- |
| 29  | Table      | Dados tabulares com sorting |
| 30  | List       | Lista de itens              |
| 31  | ListItem   | Item individual de lista    |

---

## 5. Web vs Mobile - Separação

### 5.1 Pasta Web (`apps/web/src/components/`)

**Estrutura:**

```
web/
├── primitives/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Avatar.tsx
│   ├── IconButton.tsx
│   └── index.ts
│
├── layout/
│   ├── Container.tsx
│   ├── Grid.tsx
│   ├── Flex.tsx
│   ├── Stack.tsx
│   ├── Divider.tsx
│   └── index.ts
│
├── feedback/
│   ├── Alert.tsx
│   ├── Skeleton.tsx
│   ├── Modal.tsx
│   ├── Toast.tsx
│   ├── Progress.tsx
│   ├── Tooltip.tsx
│   ├── EmptyState.tsx
│   └── index.ts
│
└── navigation/
    ├── Sidebar.tsx
    ├── Breadcrumb.tsx
    ├── Pagination.tsx
    ├── Tabs.tsx
    └── index.ts
```

**Características Web:**

- Tailwind CSS v4 para estilos
- Framer Motion para animações complexas
- Lucide React para ícones
- Suporte a `:hover`, `:focus`, `:active`
- Responsive breakpoints: sm/md/lg/xl

### 5.2 Pasta Mobile (`apps/mobile/src/components/`)

**Estrutura:**

```
mobile/
├── primitives/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Avatar.tsx
│   └── index.ts
│
├── svg/
│   ├── Icon.tsx          ← Wrapper para SVGs inline
│   ├── icons/            ← Ícones como componentes
│   │   ├── Home.tsx
│   │   ├── Users.tsx
│   │   ├── Calendar.tsx
│   │   └── ...
│   └── index.ts
│
├── animations/
│   ├── fade.ts          ← Animações fade
│   ├── slide.ts          ← Animações slide
│   ├── scale.ts          ← Animações scale
│   ├── index.ts
│   └── types.ts
│
└── index.ts
```

**Características Mobile:**

- React Native StyleSheet
- **Apenas SVGs inline** (nenhuma imagem raster)
- Animações via Reanimated ou CSS-in-JS
- Densidade adaptável (mdpi/hdpi/xhdpi/xxhdpi)

---

## 6. Imagens - Estratégia

### 6.1 Web - Componente Image CDN

```tsx
// apps/web/src/components/primitives/Image.tsx

interface ImageProps {
  src: string; // URL do CDN
  alt: string;
  width?: number;
  height?: number;
  aspectRatio?: string; // "16/9", "4/3", etc.
  objectFit?: "cover" | "contain" | "fill";
  lazy?: boolean; // default: true
  placeholder?: boolean; // Shimmer effect
  className?: string;
}

export function Image({
  src,
  alt,
  width,
  height,
  aspectRatio,
  objectFit = "cover",
  lazy = true,
  placeholder = true,
  className,
}: ImageProps) {
  // Implementação com next/image
  // Suporte a CDN externo via hostname configurado
  // Shimmer effect durante loading
}
```

**Configuração Next.js:**

```js
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sauvia.com.br",
      },
    ],
  },
};
```

### 6.2 Mobile - Componente SVG

```tsx
// apps/mobile/src/components/svg/Icon.tsx

interface IconProps {
  name: string; // Nome do ícone (sem extensão)
  size?: number; // default: 24
  color?: string; // Cor do ícone
  onPress?: () => void;
}

export function Icon({ name, size = 24, color, onPress }: IconProps) {
  // Renderiza SVG inline baseado no nome
  // Suporta touchable se onPress definido
}
```

**Estrutura de SVGs Mobile:**

```
mobile/src/components/svg/icons/
├── Home.tsx
├── Users.tsx
├── Calendar.tsx
├── Settings.tsx
├── Plus.tsx
├── Search.tsx
├── Filter.tsx
├── ChevronRight.tsx
├── Check.tsx
├── X.tsx
└── index.ts
```

### 6.3 Pasta de Assets

```
sauvia-app/
├── public/
│   └── images/                 ← Fallback/estático
│       ├── logo.svg
│       ├── icons/
│       └── illustrations/
│
└── Bucket S3 (externo)
    └──cdn.sauvia.com.br/
        ├── patients/          ← Fotos pacientes
        ├── nutrition-plans/    ← Planilhas
        └── documents/         ← PDFs, imagens
```

---

## 7. Animações

### 7.1 CSS Utilities (Web)

```css
/* apps/web/src/app/globals.css */

@layer utilities {
  /* Fade */
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }
  .animate-fade-out {
    animation: fadeOut 0.3s ease-out;
  }

  /* Slide */
  .animate-slide-up {
    animation: slideUp 0.3s ease-out;
  }
  .animate-slide-down {
    animation: slideDown 0.3s ease-out;
  }
  .animate-slide-left {
    animation: slideLeft 0.3s ease-out;
  }
  .animate-slide-right {
    animation: slideRight 0.3s ease-out;
  }

  /* Scale */
  .animate-scale-in {
    animation: scaleIn 0.2s ease-out;
  }
  .animate-scale-out {
    animation: scaleOut 0.2s ease-out;
  }

  /* Special */
  .animate-shimmer {
    animation: shimmer 1.5s infinite;
  }
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .animate-bounce {
    animation: bounce 1s infinite;
  }

  /* Transitions */
  .transition-colors {
    transition:
      color 0.2s,
      background-color 0.2s,
      border-color 0.2s;
  }
  .transition-transform {
    transition: transform 0.2s;
  }
  .transition-all {
    transition: all 0.2s;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
```

### 7.2 Animações Mobile (React Native)

```tsx
// apps/mobile/src/components/animations/fade.ts
import { Animated } from "react-native";

export function fadeIn(duration: number = 300): Animated.Value {
  return Animated.timing(new Animated.Value(0), {
    toValue: 1,
    duration,
    useNativeDriver: true,
  });
}

export function slideUp(duration: number = 300): Animated.Value {
  const translateY = new Animated.Value(50);
  Animated.timing(translateY, {
    toValue: 0,
    duration,
    useNativeDriver: true,
  });
  return translateY;
}
```

### 7.3 Uso nos Componentes

```tsx
// Web - com classes utilitárias
<Card className="animate-fade-in animate-slide-up">
  <h3>Card com animação</h3>
</Card>;

// Mobile - com hooks
const fadeAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
  fadeIn(fadeAnim).start();
}, []);

<Animated.View style={{ opacity: fadeAnim }}>
  <Card>Card com animação</Card>
</Animated.View>;
```

---

## 8. Tamanhos de Tela e Layouts

### 8.1 Breakpoints Web

| Breakpoint | Largura | Uso              |
| ---------- | ------- | ---------------- |
| sm         | 640px   | Mobile landscape |
| md         | 768px   | Tablet portrait  |
| lg         | 1024px  | Tablet landscape |
| xl         | 1280px  | Desktop          |
| 2xl        | 1536px  | Large desktop    |

### 8.2 Layout de Páginas

**Dashboard (Web)**

- Sidebar: 256px fixed
- Main content: fluid
- Stats grid: 4 colunas (lg), 2 colunas (md)
- Cards: max-width 384px

**Patients List (Web)**

- Search bar: full width
- Table: scrollable horizontal
- Pagination: bottom right

**Mobile Layout**

- Safe area: respectar notch/DIN
- Bottom tabs: 56px height
- Content padding: 16px horizontal

### 8.3 Componente PageLayout (Web)

```tsx
interface PageLayoutProps {
  children: React.ReactNode;
  sidebar?: boolean; // Include sidebar
  maxWidth?: string; // max-width container
  padding?: string; // padding custom
}

export function PageLayout({
  children,
  sidebar = true,
  maxWidth = "1280px",
  padding = "24px",
}: PageLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {sidebar && <Sidebar />}
      <main className="flex-1" style={{ maxWidth, padding }}>
        {children}
      </main>
    </div>
  );
}
```

---

## 9. Página de Showcase

### 9.1 Localização

```
apps/web/src/app/design-system/page.tsx
```

### 9.2 Estrutura

```tsx
export default function DesignSystemPage() {
  return (
    <PageLayout sidebar={false}>
      <div className="space-y-12">
        {/* Cores */}
        <section>
          <h2>Cores</h2>
          <ColorPalette />
        </section>

        {/* Tipografia */}
        <section>
          <h2>Tipografia</h2>
          <TypographyDemo />
        </section>

        {/* Botões */}
        <section>
          <h2>Buttons</h2>
          <ButtonShowcase />
        </section>

        {/* Inputs */}
        <section>
          <h2>Inputs</h2>
          <InputShowcase />
        </section>

        {/* Cards */}
        <section>
          <h2>Cards</h2>
          <CardShowcase />
        </section>

        {/* Feedback */}
        <section>
          <h2>Feedback</h2>
          <FeedbackShowcase />
        </section>

        {/* Animações */}
        <section>
          <h2>Animações</h2>
          <AnimationDemo />
        </section>
      </div>
    </PageLayout>
  );
}
```

---

## 10. Padrões de Implementação

### 10.1 Nomenclatura

**Arquivos:** kebab-case (`button.tsx`, `sidebar.tsx`)
**Componentes:** PascalCase (`Button`, `Sidebar`)
**Props:** camelCase (`onClick`, `isLoading`)

### 10.2 Exports

```ts
// packages/ui/src/index.ts
export * from "./buttons";
export * from "./inputs";
export * from "./cards";
export * from "./layout";
export * from "./feedback";
export * from "./navigation";
```

### 10.3 Testes

```
__tests__/
├── components/
│   ├── Button.test.tsx
│   ├── Input.test.tsx
│   └── Card.test.tsx
└── fixtures/
    └── mockData.ts
```

---

## 11. Workflow de Desenvolvimento

### 11.1 Adicionar Novo Componente

1. Criar arquivo em `apps/web/src/components/primitives/[Component].tsx`
2. Implementar com tokens do design system
3. Adicionar ao `index.ts` do diretório
4. Exportar em `packages/ui/src/index.ts`
5. Adicionar ao showcase em `/design-system`

### 11.2 Adicionar Componente Mobile

1. Criar arquivo em `apps/mobile/src/components/primitives/[Component].tsx`
2. Usar StyleSheet.create com tokens
3. Converter para SVG se necessário
4. Adicionar ao `index.ts` do diretório

### 11.3 Atualizar Design System (Pencil)

1. Abrir arquivo `.pen` no Pencil MCP
2. Modificar componentes/tokens
3. Sincronizar mudanças nos componentes React
4. Atualizar este AGENTS.md se necessário

---

## 12. Referências

- **Design Tokens**: `designs/DESIGN-SYSTEM.md`
- **Layouts MVP**: `designs/MVP-LAYOUTS.md`
- **Wireframes**: `designs/SCREEN-TEMPLATES.md`
- **Globals CSS**: `apps/web/src/app/globals.css`
- **Package UI**: `packages/ui/`

---

**Última atualização**: 2026-04-10
**Versão**: 1.0
