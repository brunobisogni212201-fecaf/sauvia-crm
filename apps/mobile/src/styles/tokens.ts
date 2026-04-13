// Sauvia Design Tokens - Mobile
// This file contains all design tokens for the Sauvia mobile app
// Use these tokens to ensure consistency across the application

export const colors = {
  // Primary (Purple)
  primary: '#7C3AED',
  primaryLight: '#8B5CF6',
  primaryDark: '#5B21B6',
  
  // Secondary (Lavender)
  secondary: '#A78BFA',
  secondaryLight: '#C4B5FD',
  
  // Surface (Warm neutral)
  surface: 'hsl(40, 20%, 98%)',
  surfaceContainer: 'hsl(40, 15%, 94%)',
  surfaceContainerHigh: 'hsl(40, 10%, 90%)',
  
  // Text
  onSurface: 'hsl(210, 20%, 12%)',
  onSurfaceVariant: 'hsl(210, 10%, 40%)',
  
  // Semantic
  error: '#ba1a1a',
  success: '#16a34a',
  warning: '#f59e0b',
  
  // Common
  white: '#ffffff',
  black: '#000000',
} as const;

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 36,
  },
  
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  families: {
    display: 'Manrope',
    body: 'Plus Jakarta Sans',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
} as const;

export const shadows = {
  sm: {
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const zIndex = {
  dropdown: 100,
  modal: 200,
  toast: 300,
} as const;

export const transitions = {
  fast: 150,
  base: 200,
  slow: 300,
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
