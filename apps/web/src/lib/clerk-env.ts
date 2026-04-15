type ClerkEnv = Record<string, string | undefined>;

const CLERK_PUBLISHABLE_KEY_PATTERN = /^pk_(test|live)_[A-Za-z0-9_-]+$/;
const PLACEHOLDER_VALUES = new Set([
  "keyless_mode",
  "your-clerk-publishable-key",
  "your_publishable_key",
  "pk_test_your_key",
  "pk_test_your-clerk-publishable-key",
  "pk_live_your-clerk-publishable-key",
]);

export function getClerkPublishableKey(env: ClerkEnv = process.env): string {
  const publishableKey = env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();

  if (!publishableKey) {
    throw new Error(
      "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not configured. Add it to apps/web/.env.local locally and to Vercel environment variables in production.",
    );
  }

  if (
    PLACEHOLDER_VALUES.has(publishableKey) ||
    !CLERK_PUBLISHABLE_KEY_PATTERN.test(publishableKey)
  ) {
    throw new Error(
      "Invalid NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY. Use the pk_test_ or pk_live_ key from the same Clerk application that owns this deployment host.",
    );
  }

  return publishableKey;
}
