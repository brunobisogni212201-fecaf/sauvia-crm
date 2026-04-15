import { describe, expect, it } from "vitest";
import {
  getClerkPublishableKey,
  isValidClerkPublishableKey,
} from "../../../mobile/lib/clerk-config";

describe("mobile Clerk config", () => {
  it("does not invent a fallback publishable key", () => {
    expect(getClerkPublishableKey({})).toBeNull();
  });

  it("rejects placeholder publishable keys", () => {
    expect(
      isValidClerkPublishableKey("pk_live_your-clerk-publishable-key"),
    ).toBe(false);
  });

  it("accepts Clerk publishable keys", () => {
    expect(
      getClerkPublishableKey({
        EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY:
          "pk_live_Y29tbW9uLXB1Ymxpc2hhYmxlLWtleQ",
      }),
    ).toBe("pk_live_Y29tbW9uLXB1Ymxpc2hhYmxlLWtleQ");
  });
});
