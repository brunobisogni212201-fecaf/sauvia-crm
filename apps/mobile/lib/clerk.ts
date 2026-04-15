import * as SecureStore from "expo-secure-store";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import {
  getClerkPublishableKey as getConfiguredClerkPublishableKey,
  isValidClerkPublishableKey,
} from "./clerk-config";

const CLERK_PUBLISHABLE_KEY = getConfiguredClerkPublishableKey({
  EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY:
    process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
});

const REDIRECT_URI = Linking.createURL("callback");
const APP_SCHEME = "sauvia";

export const CLERK_FALLBACK_REDIRECT_URI = "sauvia://callback";

export interface ClerkTokens {
  sessionToken: string;
  userId: string;
}

const TOKEN_KEY = "sauvia_clerk_token";
const USER_ID_KEY = "sauvia_clerk_user_id";

export async function initializeClerk(): Promise<boolean> {
  if (!CLERK_PUBLISHABLE_KEY) {
    console.warn("Clerk publishable key not configured");
    return false;
  }
  return true;
}

export async function signInWithClerk(): Promise<void> {
  const publishableKey = CLERK_PUBLISHABLE_KEY;

  if (!isValidClerkPublishableKey(publishableKey)) {
    throw new Error(
      "Clerk not configured. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY",
    );
  }

  const clerkBaseUrl = "https://clerk.clerk.com";
  const signInUrl = `${clerkBaseUrl}/sign-in?redirect_url=${encodeURIComponent(REDIRECT_URI)}&public_key=${publishableKey}`;

  const result = await WebBrowser.openAuthSessionAsync(signInUrl, REDIRECT_URI);

  if (result.type === "success") {
    const url = result.url;
    const tokenMatch = url.match(/token=([^&]+)/);
    if (tokenMatch) {
      await SecureStore.setItemAsync(TOKEN_KEY, tokenMatch[1]);
    }
  }
}

export async function signUpWithClerk(): Promise<void> {
  const publishableKey = CLERK_PUBLISHABLE_KEY;

  if (!isValidClerkPublishableKey(publishableKey)) {
    throw new Error(
      "Clerk not configured. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY",
    );
  }

  const clerkBaseUrl = "https://clerk.clerk.com";
  const signUpUrl = `${clerkBaseUrl}/sign-up?redirect_url=${encodeURIComponent(REDIRECT_URI)}&public_key=${publishableKey}`;

  const result = await WebBrowser.openAuthSessionAsync(signUpUrl, REDIRECT_URI);

  if (result.type === "success") {
    const url = result.url;
    const tokenMatch = url.match(/token=([^&]+)/);
    if (tokenMatch) {
      await SecureStore.setItemAsync(TOKEN_KEY, tokenMatch[1]);
    }
  }
}

export async function signOut(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(USER_ID_KEY);
}

export async function getStoredToken(): Promise<string | null> {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function getStoredUserId(): Promise<string | null> {
  return SecureStore.getItemAsync(USER_ID_KEY);
}

export function isClerkConfigured(): boolean {
  return isValidClerkPublishableKey(CLERK_PUBLISHABLE_KEY);
}

export function getClerkPublishableKey(): string | null {
  return CLERK_PUBLISHABLE_KEY;
}

export { REDIRECT_URI, APP_SCHEME };
