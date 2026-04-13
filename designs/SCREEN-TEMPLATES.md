# Sauvia MVP Screen Templates

> Visual guide for implemented layouts

## Web App Screens

### 1. Dashboard Layout
```
┌─────────────────────────────────────────────────────┐
│  Sidebar (256px)         │  Main Content Area      │
│  ┌─────────────────────┐ │  ┌───────────────────┐  │
│  │ Sauvia (Logo)       │ │  │ Page Header       │  │
│  │                     │ │  │ Title + Actions   │  │
│  │ ► Dashboard         │ │  └───────────────────┘  │
│  │ ► Pacientes         │ │                         │
│  │ ► Consultas (3)     │ │  ┌───────────────────┐  │
│  │ ► Planos            │ │  │ Stats Grid        │  │
│  │ ► Mensagens [2]     │ │  │ [4 stat cards]    │  │
│  │ ► Suporte           │ │  └───────────────────┘  │
│  │ ► Configurações     │ │                         │
│  │                     │ │  ┌──────┐ ┌──────┐      │
│  │                     │ │  │Card 1│ │Card 2│      │
│  │                     │ │  └──────┘ └──────┘      │
│  └─────────────────────┘ │                         │
└─────────────────────────────────────────────────────┘
```

### 2. Dashboard Page
```
┌────────────────────────────────────────────┐
│ Dashboard                            [+ New]│
│ Bem-vindo de volta!                        │
├────────────────────────────────────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐      │
│ │ 124  │ │  8   │ │  89  │ │ 94%  │      │
│ │Pac.  │ │Consult│Planos │Reten. │      │
│ └──────┘ └──────┘ └──────┘ └──────┘      │
│                                            │
│ ┌─────────────────┐ ┌─────────────────┐  │
│ │ Próximas Consultas│ │Planos Recentes│  │
│ │ • Maria 09:00   │ │ • Plano Q1    │  │
│ │ • João  10:30   │ │ • Low Carb    │  │
│ │ • Ana   14:00   │ │ • Emagrec.    │  │
│ └─────────────────┘ └─────────────────┘  │
└────────────────────────────────────────────┘
```

### 3. Patients Page
```
┌────────────────────────────────────────────┐
│ Pacientes                      [+ Patient] │
│ Gerencie seus pacientes                    │
├────────────────────────────────────────────┤
│ [🔍 Search patients...]        [Filters]   │
│                                            │
│ ┌──────────────────────────────────────┐  │
│ │ Nome  │ Email │ Status │ Last Vis.  │  │
│ ├───────┼───────┼────────┼────────────┤  │
│ │ [M] Maria Silva │ [Ativo] │ 15/03/24 │  │
│ │ [J] João Santos │ [Ativo] │ 14/03/24 │  │
│ │ [A] Ana Oliveira│ [Inativo]│ 20/02/24│  │
│ └──────────────────────────────────────┘  │
│                                            │
│ Showing 1-5 of 124      [Prev] [Next]     │
└────────────────────────────────────────────┘
```

### 4. Appointments Page
```
┌──────────────────────────────────────────────────┐
│ Consultas                          [+ New Appt]  │
│ Gerencie sua agenda                              │
├──────────────┬───────────────────────────────────┤
│ Março 2024   │ Consultas do Dia - 15 de Março   │
│              │                                   │
│ D  S  T ... │ ┌─────────────────────────────┐  │
│    1  2  3   │ │ [M] Maria Silva    [Conf.] │  │
│ 4  5  6  4   │ │ 09:00 (60 min) • Online   │  │
│ 7  8  9  10  │ │ [Start]    [Reschedule]    │  │
│11 12 13 14   │ └─────────────────────────────┘  │
│15 16 17 15   │ ┌─────────────────────────────┐  │
│17 18 19 19   │ │ [J] João Santos    [Pend.] │  │
│20 21 22 22   │ │ 10:30 (60 min) • Presencial│  │
│23 24 25 25   │ │ [View]     [Reschedule]    │  │
│26 27 28 28   │ └─────────────────────────────┘  │
│29 30 31      │                                   │
└──────────────┴───────────────────────────────────┘
```

## Mobile App Screens

### 1. Tab Navigation (Bottom)
```
┌──────────────────┐
│   Screen         │
│   Content        │
│                  │
│                  │
│                  │
├──────────────────┤
│ 🏠    👥   📅   👤│
│Dash Patic Appt Profile│
└──────────────────┘
```

### 2. Dashboard Screen (Mobile)
```
┌──────────────────────┐
│ Dashboard            │
│ Bem-vindo de volta!  │
├──────────────────────┤
│ ┌────────┐ ┌────────┐│
│ │👊  124 │ │📅   8  ││
│ │Pacient.│ │Consult.││
│ └────────┘ └────────┘│
│ ┌────────┐ ┌────────┐│
│ │📄  89  │ │📈  94% ││
│ │Planos  │ │Retenção││
│ └────────┘ └────────┘│
│                      │
│ Próximas Consultas   │
│ ┌──────────────────┐│
│ │[M] Maria  09:00 ││
│ └──────────────────┘│
│ ┌──────────────────┐│
│ │[J] João   10:30 ││
│ └──────────────────┘│
└──────────────────────┘
```

### 3. Patients Screen (Mobile)
```
┌──────────────────────┐
│ Pacientes            │
│ Gerencie seus pac.   │
├──────────────────────┤
│ [🔍 Search...]   [⚙] │
│                      │
│ ┌──────────────────┐│
│ │[M] Maria Silva   ││
│ │    maria@...     ││
│ │          [Ativo] ││
│ └──────────────────┘│
│ ┌──────────────────┐│
│ │[J] João Santos   ││
│ │    joao@...      ││
│ │          [Ativo] ││
│ └──────────────────┘│
│ ┌──────────────────┐│
│ │[A] Ana Oliveira  ││
│ │    ana@...       ││
│ │         [Inativo]││
│ └──────────────────┘│
│                      │
│                  [+] │ ← FAB
└──────────────────────┘
```

### 4. Appointments Screen (Mobile)
```
┌──────────────────────┐
│ Consultas            │
│ Gerencie sua agenda  │
├──────────────────────┤
│ S  T  Q  Q  S  S  D │
│ 11 12 13 14 15 16 17│
│       [═══]          │
├──────────────────────┤
│ Consultas do Dia     │
│ ┌──────────────────┐│
│ │[M] Maria  [Conf.]││
│ │ 🕐 09:00 (60min) ││
│ │ 📹 Online        ││
│ │ [Iniciar] [Reag.]││
│ └──────────────────┘│
│ ┌──────────────────┐│
│ │[J] João   [Pend.]││
│ │ 🕐 10:30 (60min) ││
│ │ 📍 Presencial    ││
│ │ [Ver]    [Reag.] ││
│ └──────────────────┘│
└──────────────────────┘
```

### 5. Profile Screen (Mobile)
```
┌──────────────────────┐
│ Perfil               │
├──────────────────────┤
│      [DR]            │
│  Dra. Regina Silva   │
│  regina@sauvia.com   │
│  Nutricionista CRN-3 │
├──────────────────────┤
│  124     8     4.9   │
│ Pacient. Hoje Aval.  │
├──────────────────────┤
│ ⚙ Configurações     ›│
│ 🔔 Notificações     ›│
│ 🛡 Privacidade      ›│
│ ❓ Ajuda            ›│
├──────────────────────┤
│ [🚪 Sair]            │
│                      │
│   Sauvia v1.0.0      │
└──────────────────────┘
```

## Component Hierarchy

```
Web App
├── DashboardLayout
│   ├── Sidebar (from @sauvia/ui)
│   └── Main Content
│       └── Pages
│           ├── DashboardPage
│           │   ├── PageHeader
│           │   ├── StatsGrid
│           │   └── Cards
│           ├── PatientsPage
│           │   ├── PageHeader
│           │   ├── Input (Search)
│           │   ├── Table
│           │   └── Badges
│           └── AppointmentsPage
│               ├── PageHeader
│               ├── Calendar Widget
│               └── Appointment Cards
└── 
Mobile App
├── TabsLayout
│   └── Bottom Tabs (from @sauvia/ui)
├── DashboardScreen
│   ├── Stats Cards
│   └── Appointment List
├── PatientsScreen
│   ├── Search Bar
│   ├── Patient Cards
│   └── FAB
├── AppointmentsScreen
│   ├── Calendar Strip
│   └── Appointment Cards
└── ProfileScreen
    ├── Profile Header
    ├── Stats
    └── Menu Items
```

## Responsive Breakpoints

### Web
- **sm**: 640px - Mobile
- **md**: 768px - Tablet
- **lg**: 1024px - Desktop
- **xl**: 1280px - Large Desktop

### Behavior
- **< 1024px**: Sidebar hidden, full-width content
- **>= 1024px**: Sidebar visible (256px), content alongside

## Color Usage Examples

### Primary Actions
```tsx
// Web (Tailwind)
<Button className="bg-primary text-white">Save</Button>

// Mobile (StyleSheet)
backgroundColor: '#7C3AED'
```

### Status Indicators
```tsx
// Success/Active
backgroundColor: 'hsl(40, 10%, 90%)' // surface-container-high
text: 'hsl(210, 20%, 12%)'

// Warning/Pending
backgroundColor: '#fef3c7'
text: '#92400e'

// Error/Cancelled
backgroundColor: '#fee2e2'
text: '#991b1b'
```

### Cards
```tsx
// Web (Tailwind)
<Card className="bg-white shadow-md rounded-2xl p-6" />

// Mobile (StyleSheet)
backgroundColor: '#fff',
borderRadius: 16,
shadowColor: '#7C3AED',
```
