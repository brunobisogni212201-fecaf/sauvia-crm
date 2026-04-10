# Sauvia Design System

> CRM para Nutricionistas - MVP Layout Guide

## Color Palette

### Primary (Green)
- `--color-primary`: `#006b2c` - Main brand color
- `--color-primary-light`: `#00a847` - Hover/active states
- `--color-primary-dark`: `#004d1f` - Dark backgrounds

### Secondary (Orange)
- `--color-secondary`: `#F97316` - Accent/CTA
- `--color-secondary-light`: `#fb923c` - Hover states

### Surface (Teal/Mint)
- `--color-surface`: `#e4fff9` - Main background
- `--color-surface-container`: `#c5fff5` - Card backgrounds
- `--color-surface-container-high`: `#a8f5e5` - Elevated elements

### Text
- `--color-on-surface`: `#00201d` - Primary text
- `--color-on-surface-variant`: `#3f6b62` - Secondary text

### Semantic
- `--color-error`: `#ba1a1a`
- `--color-success`: `#006b2c`
- `--color-warning`: `#F97316`

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

All shadows use `rgba(0, 55, 50, 0.06)` base - **never pure black**

- **sm**: `0 1px 3px rgba(0, 55, 50, 0.06)` - Subtle elevation
- **md**: `0 4px 12px rgba(0, 55, 50, 0.08)` - Cards, dropdowns
- **lg**: `0 8px 24px rgba(0, 55, 50, 0.12)` - Modals, popovers

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
3. **Shadows**: Always use green-tinted shadows
4. **Glassmorphism**: `backdrop-blur: 20px` for overlays
5. **Accessibility**: Maintain WCAG AA contrast ratios

## Component Guidelines

### Buttons
- Primary: Green background, white text
- Secondary: White background, green border
- Ghost: Transparent, green text
- Full rounded (`rounded-full`)

### Cards
- White/surface background
- `rounded-2xl` (1rem)
- `shadow-md` elevation
- Padding: `p-6`

### Inputs
- Light background
- `rounded-xl` 
- Focus: Green ring
- Padding: `px-4 py-3`

### Navigation
- Sidebar (web): Glass effect, 256px width
- Tabs (mobile): Bottom navigation, active indicator
