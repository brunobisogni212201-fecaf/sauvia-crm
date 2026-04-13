# Sauvia MVP Layouts

> CRM para Nutricionistas - MVP Layout Implementation Guide

## Overview

This document describes the MVP layouts implemented for the Sauvia CRM platform. The implementation includes a complete design system, reusable UI components, and fully functional screens for both web (Next.js) and mobile (React Native) applications.

## What's Included

### 1. Design System (`/designs/DESIGN-SYSTEM.md`)
Complete design tokens and guidelines:
- **Colors**: Purple primary (#7C3AED), Lavender secondary (#A78BFA), warm neutral surfaces
- **Typography**: Manrope (display), Plus Jakarta Sans (body)
- **Shadows**: Purple-tinted shadows (never pure black)
- **Border Radius**: 1rem for cards, full for buttons
- **Glassmorphism**: backdrop-blur 20px for overlays

### 2. Shared UI Components (`packages/ui/`)
A comprehensive component library following the design system:

#### Buttons
- `Button` - Primary, Secondary, Ghost, Danger variants
- Sizes: SM, MD, LG
- Loading state support

#### Inputs
- `Input` - Text input with label, error, helper text
- Icon support (left/right)

#### Cards
- `Card` - Default, Elevated, Glass variants
- `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

#### Navigation
- `Sidebar` - Desktop navigation with active states
- `BottomTabs` - Mobile bottom tab navigation

#### Feedback
- `Alert` - Info, Success, Warning, Error variants
- `Badge` - Status indicators
- `Skeleton`, `CardSkeleton` - Loading states

#### Layout
- `Container` - Responsive width containers
- `Header` - Sticky header with glass effect
- `PageLayout` - Page wrapper with sidebar support
- `PageHeader` - Page titles with actions
- `StatsGrid` - Stats dashboard component

### 3. Web App Layouts (`apps/web/`)

#### Dashboard Layout
- Glassmorphic sidebar with navigation
- Active route highlighting
- Badge support for unread counts
- Responsive (hidden on mobile)

#### Dashboard Page
- Stats grid with 4 key metrics
- Upcoming appointments card
- Recent nutrition plans card
- Quick action buttons

#### Patients Page
- Search with icon
- Filter button
- Data table with:
  - Patient avatars
  - Status badges
  - Pagination
- "New Patient" action button

#### Appointments Page
- Calendar widget
- Appointment cards with:
  - Patient info
  - Time and duration
  - Online/Presencial indicators
  - Status badges
- Action buttons (Start/Reschedule)

### 4. Mobile App Screens (`apps/mobile/`)

#### Tab Navigation
- 4 tabs: Dashboard, Patients, Appointments, Profile
- Custom icons using lucide-react-native
- Active tab indicator
- Clean, borderless design

#### Dashboard Screen
- Welcome header
- Stats grid (2x2)
- Upcoming appointments list
- Patient avatars

#### Patients Screen
- Search bar with filter
- Patient cards with:
  - Avatars
  - Email
  - Status badges
- FAB (Floating Action Button)

#### Appointments Screen
- Calendar strip (7 days)
- Appointment cards with:
  - Patient details
  - Time and mode icons
  - Status indicators
  - Action buttons
- Online/Presencial differentiation

#### Profile Screen
- Profile avatar and info
- Stats (Patients, Today, Rating)
- Settings menu items
- Logout button
- Version footer

## Installation

The components are already set up as a workspace package. To use them:

```bash
# Install dependencies
pnpm install

# The @sauvia/ui package is linked automatically
```

## Usage Examples

### Web App

```tsx
import { Button, Card, PageHeader, StatsGrid } from '@sauvia/ui';

export default function MyPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Page" 
        description="Description here"
        actions={<Button>Actions</Button>}
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          Content here
        </CardContent>
      </Card>
    </div>
  );
}
```

### Mobile App

```tsx
import { View, Text } from "react-native";
import { Users } from "lucide-react-native";

export default function MyScreen() {
  return (
    <View style={styles.container}>
      <Users color="#7C3AED" size={24} />
      <Text>Content</Text>
    </View>
  );
}
```

## Design System Guidelines

### Colors
```css
--color-primary: #7C3AED        /* Main purple */
--color-primary-light: #8B5CF6  /* Hover states */
--color-primary-dark: #5B21B6   /* Active states */
--color-secondary: #A78BFA      /* Lavender accent */
--color-surface: hsl(40, 20%, 98%)        /* Background */
--color-on-surface: hsl(210, 20%, 12%)     /* Primary text */
--color-on-surface-variant: hsl(210, 10%, 40%)  /* Secondary text */
```

### Shadows
All shadows use purple-tinted rgba(124, 58, 237, X):
- **sm**: 0 1px 3px - Subtle elevation
- **md**: 0 4px 12px - Cards
- **lg**: 0 8px 24px - Modals

### Glass Effect
```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
}
```

### Rules
1. **NO 1px borders** - Use color changes for separation
2. **Corner radius**: 1rem for cards, full for buttons
3. **Shadows**: Always purple-tinted, never pure black
4. **Glassmorphism**: For overlays and navigation elements

## File Structure

```
sauvia-app/
├── designs/
│   └── DESIGN-SYSTEM.md          # Design tokens and guidelines
├── packages/
│   └── ui/
│       ├── src/
│       │   ├── buttons/          # Button components
│       │   ├── inputs/           # Input components
│       │   ├── cards/            # Card components
│       │   ├── navigation/       # Navigation components
│       │   ├── feedback/         # Alert, Badge, Skeleton
│       │   ├── layout/           # Layout components
│       │   └── index.ts          # Main export
│       ├── package.json
│       └── tsconfig.json
├── apps/
│   ├── web/
│   │   └── src/app/
│   │       └── (dashboard)/
│   │           ├── layout.tsx    # Dashboard layout with sidebar
│   │           ├── dashboard/    # Dashboard page
│   │           ├── patients/     # Patients page
│   │           └── appointments/ # Appointments page
│   └── mobile/
│       └── app/
│           └── (tabs)/
│               ├── _layout.tsx   # Tab navigation
│               ├── dashboard.tsx
│               ├── patients.tsx
│               ├── appointments.tsx
│               └── profile.tsx
└── pnpm-workspace.yaml
```

## Next Steps

To extend this MVP:

1. **Add Authentication Screens**
   - Login/Register forms
   - Password recovery
   - Email verification

2. **Implement More Pages**
   - Nutrition Plans (CRUD)
   - Messages/Chat
   - Settings pages
   - Patient details page

3. **Add Real Data**
   - Connect to backend API
   - Add data fetching with React Query/SWR
   - Implement optimistic updates

4. **Enhance Mobile**
   - Add pull-to-refresh
   - Implement offline support
   - Add push notifications

5. **Add Animations**
   - Page transitions
   - List animations
   - Micro-interactions

## Development

```bash
# Run web app
pnpm --filter web dev

# Run mobile app
pnpm --filter mobile start

# Build UI package
pnpm --filter @sauvia/ui build
```

## Technologies

- **Web**: Next.js 15, React 19, Tailwind CSS v4
- **Mobile**: React Native, Expo, Expo Router
- **UI Library**: Custom components in packages/ui/
- **Icons**: lucide-react (web), lucide-react-native (mobile)
- **Package Manager**: pnpm workspaces
- **Build**: Turborepo

## Design Principles

1. **Consistency**: Same design system across web and mobile
2. **Accessibility**: WCAG AA contrast ratios
3. **Performance**: Lightweight components, no unnecessary dependencies
4. **Scalability**: Monorepo structure for easy maintenance
5. **Developer Experience**: TypeScript, clear component APIs
