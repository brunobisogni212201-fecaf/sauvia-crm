// Application constants for mobile app
// This file contains all constants used across the mobile application

export const APP_NAME = 'Sauvia' as const;
export const APP_TAGLINE = 'CRM para Nutricionistas' as const;

export const ROUTES = {
  DASHBOARD: '/dashboard',
  PATIENTS: '/patients',
  APPOINTMENTS: '/appointments',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  LOGIN: '/login',
  REGISTER: '/register',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'sauvia_auth_token',
  USER_DATA: 'sauvia_user_data',
  THEME: 'sauvia_theme',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
} as const;
