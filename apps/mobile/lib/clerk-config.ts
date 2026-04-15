type MobileClerkEnv = Record<string, string | undefined>;

const CLERK_PUBLISHABLE_KEY_PATTERN = /^pk_(test|live)_[A-Za-z0-9_-]+$/;
const PLACEHOLDER_VALUES = new Set([
  "keyless_mode",
  "your-clerk-publishable-key",
  "your_publishable_key",
  "pk_test_your_key",
  "pk_test_your-clerk-publishable-key",
  "pk_live_your-clerk-publishable-key",
]);

export function isValidClerkPublishableKey(value: string | null): boolean {
  if (!value) {
    return false;
  }

  return (
    !PLACEHOLDER_VALUES.has(value) &&
    CLERK_PUBLISHABLE_KEY_PATTERN.test(value)
  );
}

export function getClerkPublishableKey(
  env: MobileClerkEnv = process.env,
): string | null {
  const publishableKey = env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim() ?? null;
  return isValidClerkPublishableKey(publishableKey) ? publishableKey : null;
}
