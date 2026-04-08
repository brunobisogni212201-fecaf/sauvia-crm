<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing code. Heed deprecation notices.

## Sauvia CRM - Project Context

### Tech Stack
- **Next.js 16** (App Router, TypeScript)
- **Prisma** + PostgreSQL
- **NextAuth.js** + AWS Cognito
- **Chart.js** para gráficos
- **Framer Motion** para animações
- **Tailwind CSS** com design system customizado

### Design System
O projeto usa um design system baseado no arquivo `layout_full.pen` (Pencil) com:
- Cores primárias: `#006b2c` (verde), `#00873a`
- Cores secundárias: `#F97316` (laranja energia)
- Superfícies: `#e4fff9`, `#c5fff5`, `#ffffff`
- Tipografia: Manrope (display) + Plus Jakarta Sans (body)
- Sem borders de 1px - usar mudança de cor de fundo
- Glassmorphism com backdrop-blur: 20px

### Estrutura de Componentes
```
src/
├── components/
│   ├── primitives/     # Átomos: Button, Input, Card, Badge, Typography, Charts, Animation
│   ├── ui/            # Moléculas: Modal, Dropdown, Table, etc
│   ├── landing/       # Landing page: Hero, Features, Footer, Navbar
│   └── dashboard/     # Dashboard: Sidebar, StatCard, etc
├── app/
│   ├── (auth)/        # Login, Register
│   ├── (dashboard)/   # Dashboard, Patients, Appointments
│   └── api/           # API routes
└── lib/               # Utils, Prisma, Auth
```

### Regras de Design
- NÃO usar borders de 1px para separar seções
- Usar `surface_container_low` para sub-seções
- Corner radius: 1rem para cards, full para botões
- Sombras usar cor `rgba(0, 55, 50, 0.06)` - nunca preto
- Whitespace generoso - usar spacing.12 (3rem) quando feeling "cheio"

### Commits
- Usar conventional commits: `feat:`, `fix:`, `chore:`, `docs:`
- Commits frequentes e pequenos
- Testar build antes de commit (`npm run build`)

<!-- END:nextjs-agent-rules -->