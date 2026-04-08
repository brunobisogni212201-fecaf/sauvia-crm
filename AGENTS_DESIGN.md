# Sauvia Design System - Guía para Designers

## 🎨 Design System

Este documento estabelece os padrões visuais do Sauvia CRM baseados no arquivo `layout_full.pen` do Pencil.

### Cores Principais

```css
/* Superfícies (do mais claro ao mais escuro) */
--surface: #e4fff9;           /* Canvas base */
--surface-container-low: #c5fff5;    /* Sub-seções */
--surface-container-lowest: #ffffff; /* Cards interativos */
--surface-container-highest: #89f5e7; /* Overlays */

/* Primárias */
--primary: #006b2c;           /* Verde principal */
--primary-container: #00873a; /* Verde claro */
--on-primary: #ffffff;

/* Secundárias (Energia Orange) */
--secondary: #F97316;        /* Alertas críticos */
--secondary-container: #fed7aa;

/* Texto */
--on-surface: #00201d;        /* NÃO usar #000000 */
--on-surface-variant: #6b7280;

/* Bordas - Apenas 15% opacity! */
--outline-variant: rgba(0, 32, 29, 0.15);
```

### Tipografia

| Estilo | Fonte | Tamanho | Peso |
|--------|-------|---------|------|
| display-lg | Manrope | 3.5rem | 700 |
| title-lg | Plus Jakarta Sans | 1.5rem | 600 |
| body-md | Plus Jakarta Sans | 0.875rem | 400 |
| label-md | Plus Jakarta Sans | 0.75rem | 500 |

### Regras de Ouro

1. **Sem borders de 1px** - Use mudança de cor de fundo para separar áreas
2. **Glassmorphism** - backdrop-blur: 20px com cor semi-transparente
3. **Corner radius** - 1rem (lg) para cards, full para botões
4. **Sombras** - Use `rgba(0, 55, 50, 0.06)` - nunca preto
5. **Whitespace** - Use spacing.12 (3rem) quando sentir "cheio"

---

## 📁 Estrutura de Componentes

```
src/
├── components/
│   ├── primitives/           # Primitivos de UI (átomos)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Avatar.tsx
│   │   ├── Separator.tsx
│   │   ├── Typography.tsx
│   │   ├── LineChart.tsx      # Gráfico de linha (Chart.js)
│   │   ├── BarChart.tsx       # Gráfico de barra (Chart.js)
│   │   ├── Animation.tsx      # Animações (Framer Motion)
│   │   ├── Spinner.tsx
│   │   └── index.ts
│   │
│   ├── ui/                   # Componentes compostos (moléculas)
│   │   ├── ButtonGroup.tsx
│   │   ├── InputField.tsx
│   │   ├── SearchInput.tsx
│   │   ├── Modal.tsx
│   │   ├── Drawer.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Toast.tsx
│   │   ├── Table.tsx
│   │   ├── Tabs.tsx
│   │   └── index.ts
│   │
│   ├── landing/              # Componentes específicos da Landing
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   ├── Footer.tsx
│   │   └── CTASection.tsx
│   │
│   └── dashboard/            # Componentes específicos do Dashboard
│       ├── Sidebar.tsx
│       ├── Header.tsx
│       ├── StatCard.tsx
│       ├── PatientCard.tsx
│       ├── AppointmentCard.tsx
│       ├── Calendar.tsx
│       ├── DataTable.tsx
│       └── index.ts
```

---

## 🚀 Como Usar

### Primitivos
Use quando precisar de componentes atômicos básico:

```tsx
import { Button, Card, Badge } from '@/components/primitives'

<Button variant="primary">Agendar Consulta</Button>
<Card>Conteúdo</Card>
<Badge status="active">Ativo</Badge>
```

### Componentes UI
Use para padrões compostos reutilizáveis:

```tsx
import { Modal, SearchInput, Table } from '@/components/ui'

<Modal>
  <SearchInput placeholder="Buscar..." />
  <Table data={pacientes} />
</Modal>
```

### Componentes de Página
Use para seções completas:

```tsx
import { Hero, Features } from '@/components/landing'

<Hero 
  title="CRM para Nutricionistas"
  subtitle="Gestão completa de pacientes"
/>
<Features items={features} />
```

---

## 📋 Padrões de Design

### Botões
- Primary: fill primary, on_primary text, radius full
- Secondary: secondary_container, radius full
- Ghost: sem fill, hover com surface_tint 5%

### Inputs
- Fundo: surface_container_low
- Border: apenas bottom em primary quando em foco
- NÃO usar caixa de borda 4 lados

### Cards
- Fundo: surface_container_lowest
- Radius: 1rem
- Sem border - usar elevação tonal

### Glassmorphism
- Fundo: surface_dim com 50% opacity
- Backdrop-blur: 20px

---

## 🔗 Recursos

- **Figma**: [Link do projeto]
- **Pencil**: `layout_full.pen`
- **Documentação**: [Link interno]

---

**Importante**: Para qualquer novo componente reutilizável, primeiro verifique se já existe nos primitivos ou componentes UI. Se precisar criar algo novo, adicione no nível apropriado.