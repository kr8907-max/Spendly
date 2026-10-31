import { describe, expect, it } from "vitest";

import { DEFAULT_CATEGORIES, registerSchema } from "../src/lib/auth-validation";

describe("auth validation", () => {
  it("accepts a valid account payload", () => {
    const parsed = registerSchema.parse({
      name: "Ada Lovelace",
      email: "ada@example.com",
      password: "supersecret",
    });

    expect(parsed.email).toBe("ada@example.com");
    expect(parsed.name).toBe("Ada Lovelace");
  });

  it("rejects invalid sign-up data", () => {
    expect(() =>
      registerSchema.parse({
        name: "A",
        email: "not-an-email",
        password: "short",
      }),
    ).toThrow();

    expect(DEFAULT_CATEGORIES).toHaveLength(12);
  });
});
