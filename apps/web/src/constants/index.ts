// Application constants
// This file contains all constants used across the web application

export const APP_NAME = 'Sauvia' as const;
export const APP_TAGLINE = 'CRM para Nutricionistas' as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PATIENTS: '/patients',
  APPOINTMENTS: '/appointments',
  NUTRITION_PLANS: '/nutrition-plans',
  MESSAGES: '/messages',
  SUPPORT: '/support',
  SETTINGS: '/settings',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  PATIENTS: '/patients',
  APPOINTMENTS: '/appointments',
  NUTRITION_PLANS: '/nutrition-plans',
  MESSAGES: '/messages',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'sauvia_auth_token',
  USER_DATA: 'sauvia_user_data',
  THEME: 'sauvia_theme',
  LOCALE: 'sauvia_locale',
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;
