// Sauvia Design Tokens - Web
// This file contains all design tokens for the Sauvia design system
// Use these tokens to ensure consistency across the application

export const colors = {
  // Primary (Green)
  primary: {
    DEFAULT: '#006b2c',
    light: '#00a847',
    dark: '#004d1f',
  },
  
  // Secondary (Orange)
  secondary: {
    DEFAULT: '#F97316',
    light: '#fb923c',
  },
  
  // Surface (Teal/Mint)
  surface: {
    DEFAULT: '#e4fff9',
    container: '#c5fff5',
    containerHigh: '#a8f5e5',
  },
  
  // Text
  onSurface: {
    DEFAULT: '#00201d',
    variant: '#3f6b62',
  },
  
  // Semantic
  error: '#ba1a1a',
  success: '#006b2c',
  warning: '#F97316',
} as const;

export const typography = {
  fonts: {
    display: 'var(--font-display)', // Manrope
    body: 'var(--font-body)', // Plus Jakarta Sans
  },
  
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
  },
  
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '2.5rem',  // 40px
  '3xl': '3rem',    // 48px
} as const;

export const shadows = {
  sm: '0 1px 3px rgba(0, 55, 50, 0.06)',
  md: '0 4px 12px rgba(0, 55, 50, 0.08)',
  lg: '0 8px 24px rgba(0, 55, 50, 0.12)',
} as const;

export const borderRadius = {
  sm: '0.5rem',    // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  full: '9999px',
} as const;

export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

export const transitions = {
  fast: '150ms ease-in-out',
  base: '200ms ease-in-out',
  slow: '300ms ease-in-out',
} as const;

export const designTokens = {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  zIndex,
  transitions,
} as const;

export type DesignTokens = typeof designTokens;
