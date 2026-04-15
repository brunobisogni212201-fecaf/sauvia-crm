import { describe, expect, it } from "vitest";
import { getClerkPublishableKey } from "./clerk-env";

describe("getClerkPublishableKey", () => {
  it("rejects an empty publishable key before Clerk receives it", () => {
    expect(() => getClerkPublishableKey({})).toThrow(
      "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not configured",
    );
  });

  it("rejects placeholder values before Clerk receives them", () => {
    expect(() =>
      getClerkPublishableKey({
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
          "pk_test_your-clerk-publishable-key",
      }),
    ).toThrow("Invalid NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
  });

  it("accepts Clerk publishable keys", () => {
    expect(
      getClerkPublishableKey({
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
          "pk_test_Y29tbW9uLXB1Ymxpc2hhYmxlLWtleQ",
      }),
    ).toBe("pk_test_Y29tbW9uLXB1Ymxpc2hhYmxlLWtleQ");
  });
});
