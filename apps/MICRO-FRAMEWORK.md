# Sauvia Micro-Framework

> Design system utilities, hooks, and constants for consistent frontend development

## Overview

This micro-framework provides the foundation for building consistent, maintainable, and scalable applications across both web and mobile platforms. It includes design tokens, custom hooks, utility functions, and application constants.

## Structure

```
apps/
├── web/
│   └── src/
│       ├── styles/         # Design tokens (colors, typography, spacing, etc.)
│       ├── hooks/          # Custom React hooks for web
│       ├── utils/          # Utility functions
│       └── constants/      # Application constants
│
└── mobile/
    └── src/
        ├── styles/         # Design tokens (mobile-optimized)
        ├── hooks/          # Custom React hooks for mobile
        ├── utils/          # Utility functions
        └── constants/      # Application constants
```

## Design Tokens

Design tokens are the atomic building blocks of our design system. They provide a single source of truth for colors, typography, spacing, and other visual properties.

### Web (`apps/web/src/styles/tokens.ts`)

```typescript
import { colors, spacing, shadows } from '@/styles/tokens';

// Usage in components
<div style={{ 
  backgroundColor: colors.primary.DEFAULT,
  padding: spacing.md,
  boxShadow: shadows.md 
}}>
  Content
</div>
```

### Mobile (`apps/mobile/src/styles/tokens.ts`)

```typescript
import { colors, spacing, shadows } from '@/styles/tokens';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    ...shadows.md,
  },
});
```

### Available Tokens

#### Colors
- **Primary**: Green brand colors (`#006b2c`, `#00a847`, `#004d1f`)
- **Secondary**: Orange accent colors (`#F97316`, `#fb923c`)
- **Surface**: Mint/teal backgrounds (`#e4fff9`, `#c5fff5`, `#a8f5e5`)
- **Text**: Primary and secondary text colors
- **Semantic**: Error, success, warning colors

#### Typography
- Font families: Manrope (display), Plus Jakarta Sans (body)
- Sizes: xs (12px) to 4xl (36px)
- Weights: normal (400), medium (500), semibold (600), bold (700)

#### Spacing
Consistent spacing scale from xs (4px) to 3xl (48px)

#### Shadows
Green-tinted shadows (never pure black!)
- sm: Subtle elevation
- md: Card elevation
- lg: Modal elevation

#### Border Radius
Consistent corner radius from sm (8px) to full (9999px)

## Custom Hooks

### Web Hooks (`apps/web/src/hooks/`)

#### useMediaQuery
```typescript
import { useMediaQuery } from '@/hooks';

const isMobile = useMediaQuery('(max-width: 768px)');
```

#### useLocalStorage
```typescript
import { useLocalStorage } from '@/hooks';

const [theme, setTheme] = useLocalStorage('theme', 'light');
```

#### useDebounce
```typescript
import { useDebounce } from '@/hooks';

const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 500);
```

### Mobile Hooks (`apps/mobile/src/hooks/`)

#### useAppState
```typescript
import { useAppState } from '@/hooks';

const appState = useAppState();
// Returns: 'active', 'background', 'inactive'
```

#### useKeyboard
```typescript
import { useKeyboard } from '@/hooks';

const { visible, height } = useKeyboard();
```

## Utility Functions

### Web Utilities (`apps/web/src/utils/`)

#### cn (Class Name Merger)
```typescript
import { cn } from '@/utils';

<div className={cn('px-4', isActive && 'bg-primary', 'rounded-lg')} />
```

#### formatDate
```typescript
import { formatDate, formatTime, formatRelativeTime } from '@/utils';

formatDate(new Date()) // "15/03/2024"
formatTime(new Date()) // "09:00"
formatRelativeTime(new Date(Date.now() - 3600000)) // "1h atrás"
```

#### formatCurrency
```typescript
import { formatCurrency } from '@/utils';

formatCurrency(1234.56) // "R$ 1.234,56"
```

### Mobile Utilities (`apps/mobile/src/utils/`)

Same formatting utilities as web, optimized for React Native.

## Constants

### Web Constants (`apps/web/src/constants/`)

```typescript
import { ROUTES, API_ENDPOINTS, STORAGE_KEYS, BREAKPOINTS } from '@/constants';

// Navigation
<Link href={ROUTES.DASHBOARD}>Dashboard</Link>

// API calls
fetch(API_ENDPOINTS.PATIENTS)

// LocalStorage
localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
```

### Mobile Constants (`apps/mobile/src/constants/`)

```typescript
import { ROUTES, STORAGE_KEYS } from '@/constants';

// Navigation
navigation.navigate(ROUTES.PATIENTS);

// AsyncStorage
await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
```

## Best Practices

### 1. Always Use Design Tokens

❌ **Don't** hardcode values:
```typescript
backgroundColor: '#006b2c'
```

✅ **Do** use tokens:
```typescript
backgroundColor: colors.primary // mobile
className="bg-primary" // web (Tailwind)
```

### 2. Use Utility Functions

❌ **Don't** repeat formatting logic:
```typescript
const formatted = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format(value);
```

✅ **Do** use utilities:
```typescript
const formatted = formatCurrency(value);
```

### 3. Leverage Hooks

❌ **Don't** reimplement state logic:
```typescript
const [value, setValue] = useState(() => {
  const stored = localStorage.getItem('key');
  return stored ? JSON.parse(stored) : initialValue;
});

useEffect(() => {
  localStorage.setItem('key', JSON.stringify(value));
}, [value]);
```

✅ **Do** use hooks:
```typescript
const [value, setValue] = useLocalStorage('key', initialValue);
```

### 4. Use Constants for Routes

❌ **Don't** hardcode routes:
```typescript
router.push('/dashboard/patients')
```

✅ **Do** use constants:
```typescript
router.push(ROUTES.PATIENTS)
```

## Extending the Framework

### Adding New Tokens

1. Update the appropriate `tokens.ts` file
2. Update Tailwind config (web) or StyleSheet helpers (mobile)
3. Document the new token in this README

### Adding New Hooks

1. Create a new file in the `hooks/` directory
2. Add JSDoc documentation with examples
3. Export from `hooks/index.ts`
4. Document in this README

### Adding New Utilities

1. Create a new file in the `utils/` directory
2. Add JSDoc documentation with examples
3. Export from `utils/index.ts`
4. Document in this README

## Platform-Specific Notes

### Web (Next.js)

- Uses Tailwind CSS v4 for styling
- Tokens are available as CSS variables
- Prefer Tailwind classes over inline styles
- Use `cn()` utility for conditional classes

### Mobile (React Native)

- Uses StyleSheet for styling
- Tokens are plain JavaScript objects
- Prefer creating stylesheet variables
- Use platform-specific shadows from tokens

## Migration Guide

If you're updating existing components to use the micro-framework:

1. **Replace hardcoded colors** with token references
2. **Replace hardcoded spacing** with token references
3. **Replace custom date/currency formatting** with utilities
4. **Extract state logic** into custom hooks
5. **Replace hardcoded routes** with constants

## Contributing

1. Follow existing naming conventions
2. Add comprehensive JSDoc documentation
3. Include usage examples
4. Update this README when adding new features
5. Test on both platforms before merging

## Support

For questions or issues:
1. Check this documentation
2. Review existing implementations in the codebase
3. Ask the team for guidance

---

**Maintained by:** Sauvia Development Team  
**Last Updated:** March 2024
