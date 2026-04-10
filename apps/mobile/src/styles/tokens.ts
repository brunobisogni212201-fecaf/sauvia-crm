// Sauvia Design Tokens - Mobile
// This file contains all design tokens for the Sauvia mobile app
// Use these tokens to ensure consistency across the application

export const colors = {
  // Primary (Green)
  primary: '#006b2c',
  primaryLight: '#00a847',
  primaryDark: '#004d1f',
  
  // Secondary (Orange)
  secondary: '#F97316',
  secondaryLight: '#fb923c',
  
  // Surface (Teal/Mint)
  surface: '#e4fff9',
  surfaceContainer: '#c5fff5',
  surfaceContainerHigh: '#a8f5e5',
  
  // Text
  onSurface: '#00201d',
  onSurfaceVariant: '#3f6b62',
  
  // Semantic
  error: '#ba1a1a',
  success: '#006b2c',
  warning: '#F97316',
  
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
    shadowColor: '#003732',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: '#003732',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#003732',
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
