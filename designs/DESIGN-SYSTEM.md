# Sauvia Design System

> CRM para Nutricionistas - MVP Layout Guide

## Color Palette

### Primary (Purple)
- `--color-primary`: `#7C3AED` - Main brand color
- `--color-primary-light`: `#8B5CF6` - Hover/active states
- `--color-primary-dark`: `#5B21B6` - Dark backgrounds

### Secondary (Lavender)
- `--color-secondary`: `#A78BFA` - Accent/CTA
- `--color-secondary-light`: `#C4B5FD` - Hover states

### Surface (Warm neutral)
- `--color-surface`: `hsl(40, 20%, 98%)` - Main background
- `--color-surface-container`: `hsl(40, 15%, 94%)` - Card backgrounds
- `--color-surface-container-high`: `hsl(40, 10%, 90%)` - Elevated elements

### Text
- `--color-on-surface`: `hsl(210, 20%, 12%)` - Primary text
- `--color-on-surface-variant`: `hsl(210, 10%, 40%)` - Secondary text

### Semantic
- `--color-error`: `#ba1a1a`
- `--color-success`: `#16a34a`
- `--color-warning`: `#f59e0b`

## Typography

### Fonts
- **Display**: `Manrope` - Headings, brand elements
- **Body**: `Plus Jakarta Sans` - Body text, UI elements

### Hierarchy
```
h1: 2.5rem (40px) - Page titles
h2: 2rem (32px) - Section titles
h3: 1.5rem (24px) - Card titles
h4: 1.25rem (20px) - Subtitles
body: 1rem (16px) - Default text
small: 0.875rem (14px) - Secondary text
```

## Spacing

Based on Tailwind's default spacing scale:
- `0.25rem` (4px) - Tight spacing
- `0.5rem` (8px) - Icon gaps
- `1rem` (16px) - Component padding
- `1.5rem` (24px) - Section gaps
- `2rem` (32px) - Page margins

## Shadows

All shadows use `rgba(124, 58, 237, 0.06)` base - **never pure black**

- **sm**: `0 1px 3px rgba(124, 58, 237, 0.06)` - Subtle elevation
- **md**: `0 4px 12px rgba(124, 58, 237, 0.08)` - Cards, dropdowns
- **lg**: `0 8px 24px rgba(124, 58, 237, 0.12)` - Modals, popovers

## Border Radius

- **Cards**: `1rem` (16px)
- **Buttons**: `9999px` (full/pill)
- **Inputs**: `0.75rem` (12px)
- **Images**: `0.5rem` (8px)

## Glassmorphism

```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
```

## Design Rules

1. **NO 1px borders** - Use color changes for separation
2. **Corner radius**: `1rem` for cards, full for buttons
3. **Shadows**: Always use purple-tinted shadows
4. **Glassmorphism**: `backdrop-blur: 20px` for overlays
5. **Accessibility**: Maintain WCAG AA contrast ratios

## Component Guidelines

### Buttons
- Primary: Purple background, white text
- Secondary: White background, purple border
- Ghost: Transparent, purple text
- Full rounded (`rounded-full`)

### Cards
- White/surface background
- `rounded-2xl` (1rem)
- `shadow-md` elevation
- Padding: `p-6`

### Inputs
- Light background
- `rounded-xl` 
- Focus: Purple ring
- Padding: `px-4 py-3`

### Navigation
- Sidebar (web): Glass effect, 256px width
- Tabs (mobile): Bottom navigation, active indicator
