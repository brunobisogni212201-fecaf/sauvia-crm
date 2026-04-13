# Sauvia MVP - Quick Start Guide

## What Was Built

A complete MVP layout system for the Sauvia CRM (Nutritionist platform) with:

✅ **Design System** - Complete tokens, colors, typography, shadows  
✅ **UI Component Library** - 20+ reusable components in `packages/ui/`  
✅ **Web App Layouts** - Dashboard with sidebar, 3 complete pages  
✅ **Mobile App Screens** - Tab navigation, 4 complete screens  
✅ **Documentation** - Design system guide, screen templates, usage examples  

## File Structure Created

```
sauvia-app/
├── designs/
│   ├── DESIGN-SYSTEM.md          ← Color tokens, typography, guidelines
│   ├── MVP-LAYOUTS.md            ← Implementation guide & examples
│   └── SCREEN-TEMPLATES.md       ← Visual wireframes & layouts
│
├── packages/
│   └── ui/                       ← NEW: Shared UI component library
│       ├── src/
│       │   ├── buttons/          ← Button component
│       │   ├── inputs/           ← Input component
│       │   ├── cards/            ← Card + subcomponents
│       │   ├── navigation/       ← Sidebar, BottomTabs
│       │   ├── feedback/         ← Alert, Badge, Skeleton
│       │   ├── layout/           ← Container, PageLayout, etc.
│       │   └── index.ts          ← Main export
│       ├── package.json
│       └── tsconfig.json
│
├── apps/
│   ├── web/                      ← UPDATED with new components
│   │   └── src/app/(dashboard)/
│   │       ├── layout.tsx        ← Sidebar navigation
│   │       ├── dashboard/page.tsx
│   │       ├── patients/page.tsx
│   │       └── appointments/page.tsx
│   │
│   └── mobile/                   ← UPDATED with new screens
│       └── app/(tabs)/
│           ├── _layout.tsx       ← Tab navigation with icons
│           ├── dashboard.tsx
│           ├── patients.tsx
│           ├── appointments.tsx
│           └── profile.tsx
```

## Quick Start

### 1. Install Dependencies

```bash
cd /Users/brunobisogni/Desktop/sauvia-app
pnpm install
```

### 2. Run Web App

```bash
pnpm --filter web dev
```

Visit: http://localhost:3000

**Routes:**
- `/dashboard` - Main dashboard with stats
- `/patients` - Patients list with search
- `/appointments` - Appointments with calendar

### 3. Run Mobile App

```bash
pnpm --filter mobile start
```

Then press:
- `i` for iOS Simulator
- `a` for Android Emulator

## Components Available

### From `@sauvia/ui` (Web)

```tsx
import { 
  Button,           // Primary, Secondary, Ghost, Danger
  Input,            // With labels, errors, icons
  Card,             // Default, Elevated, Glass variants
  CardHeader, 
  CardTitle, 
  CardContent,
  CardFooter,
  PageHeader,       // Page titles with actions
  StatsGrid,        // Dashboard stats grid
  Sidebar,          // Desktop navigation
  BottomTabs,       // Mobile tab navigation
  Alert,            // Info, Success, Warning, Error
  Badge,            // Status indicators
  Skeleton,         // Loading placeholders
  CardSkeleton,     // Loading card templates
  Container,        // Responsive wrappers
  Header,           // Sticky headers
  PageLayout,       // Full page wrapper
} from '@sauvia/ui';
```

### Icons (Web)

```tsx
import { 
  Users, CalendarDays, FileText, TrendingUp,
  Search, Plus, Filter, MoreVertical,
  Clock, Video, MapPin,
  LayoutDashboard, MessageSquare, LifeBuoy, Settings
} from 'lucide-react';
```

### Icons (Mobile)

```tsx
import { 
  Home, Users, CalendarDays, User,
  Search, Plus, Filter,
  Clock, Video, MapPin,
  Settings, Bell, Shield, HelpCircle, LogOut
} from 'lucide-react-native';
```

## Design System Quick Reference

### Colors
```css
Primary:        #7C3AED  (Purple)
Primary Light:  #8B5CF6
Primary Dark:   #5B21B6
Secondary:      #A78BFA  (Lavender)
Surface:        hsl(40, 20%, 98%)  (Warm neutral background)
On Surface:     hsl(210, 20%, 12%)  (Primary text)
On Surface Var: hsl(210, 10%, 40%)  (Secondary text)
```

### Shadows (Always purple-tinted!)
```css
sm: 0 1px 3px rgba(124, 58, 237, 0.06)
md: 0 4px 12px rgba(124, 58, 237, 0.08)
lg: 0 8px 24px rgba(124, 58, 237, 0.12)
```

### Border Radius
```css
Cards:     1rem (16px)
Buttons:   9999px (full/pill)
Inputs:    0.75rem (12px)
```

### Glass Effect
```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(20px);
```

## Example Usage

### Web Dashboard Page

```tsx
import { PageHeader, StatsGrid, Card, CardContent, Button } from '@sauvia/ui';

export default function MyPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Page" 
        description="Description here"
        actions={<Button>Action</Button>}
      />
      
      <StatsGrid items={[
        { label: 'Users', value: 100, icon: <Users /> },
        { label: 'Active', value: 85, icon: <TrendingUp /> },
      ]} />
      
      <Card>
        <CardContent>
          Content here
        </CardContent>
      </Card>
    </div>
  );
}
```

### Mobile Patient Card

```tsx
import { View, Text, StyleSheet } from "react-native";

export default function PatientCard() {
  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>M</Text>
      </View>
      <Text style={styles.name}>Maria Silva</Text>
      <View style={[styles.badge, styles.badgeActive]}>
        <Text>Ativo</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: 'hsl(210, 20%, 12%)',
    marginTop: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 8,
  },
  badgeActive: {
    backgroundColor: 'hsl(40, 10%, 90%)',
  },
});
```

## Design Rules

1. ❌ **NO 1px borders** - Use color changes for separation
2. ✅ **Corner radius** - 1rem for cards, full for buttons
3. ✅ **Purple shadows** - Never use pure black shadows
4. ✅ **Glassmorphism** - Use for overlays and navigation
5. ✅ **Accessibility** - Maintain WCAG AA contrast

## Next Steps

To continue building:

1. **Add More Pages**
   - Nutrition Plans CRUD
   - Messages/Chat interface
   - Settings pages
   - Patient details view

2. **Connect to Backend**
   - Replace mock data with API calls
   - Add React Query or SWR for data fetching
   - Implement optimistic updates

3. **Add Authentication**
   - Login/Register screens
   - Password recovery
   - Protected routes

4. **Enhance UX**
   - Loading states with Skeleton
   - Error handling with Alert
   - Success notifications
   - Animations with Framer Motion (web)

## Troubleshooting

### Components not found?
```bash
# Reinstall dependencies
pnpm install

# Check workspace configuration
cat pnpm-workspace.yaml
```

### Styles not applying?
- Web: Ensure Tailwind CSS v4 is configured
- Mobile: Check StyleSheet syntax

### Icons not showing?
```bash
# Web
pnpm add lucide-react --filter web

# Mobile
pnpm add lucide-react-native --filter mobile
```

## Documentation Files

- 📐 **DESIGN-SYSTEM.md** - Complete design tokens and guidelines
- 📱 **MVP-LAYOUTS.md** - Implementation guide with examples
- 🎨 **SCREEN-TEMPLATES.md** - Visual wireframes and layouts

## Support

For questions about the implementation:
1. Check component props in `packages/ui/src/`
2. Review examples in `apps/web/src/app/(dashboard)/`
3. Reference mobile examples in `apps/mobile/app/(tabs)/`

---

**Built with:** Next.js 15, React 19, React Native, Tailwind CSS v4, pnpm workspaces, Turborepo
