import { describe, expect, it, vi } from "vitest";

describe("cognito configuration", () => {
  it("does not throw while importing without Cognito environment variables", async () => {
    vi.unstubAllEnvs();
    vi.stubEnv("NEXT_PUBLIC_COGNITO_USER_POOL_ID", "");
    vi.stubEnv("NEXT_PUBLIC_COGNITO_CLIENT_ID", "");
    vi.resetModules();

    await expect(import("./cognito")).resolves.toBeDefined();
  });
});
