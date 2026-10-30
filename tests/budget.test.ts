import { describe, it, expect } from "vitest";
import Decimal from "decimal.js";
import { dailyAllowance, utilization, convert, daysInMonth } from "../src/lib/budget";

describe("budget math", () => {
  it("matches spec example: 12000-3000 over 20 days = 450", () => {
    const r = dailyAllowance(12000, 3000, new Date(2026, 5, 11));
    expect(r.days).toBe(20);
    expect(r.allowance.toString()).toBe("450");
  });
  it("clamps to 0 when over budget", () => {
    const r = dailyAllowance(1000, 1500, new Date(2026, 5, 11));
    expect(r.overBudget).toBe(true);
    expect(r.allowance.toNumber()).toBe(0);
  });
  it("handles zero budget and leap February", () => {
    expect(utilization(0, 50)).toBe(0);
    expect(daysInMonth(2028, 2)).toBe(29);
  });
  it("converts with a frozen rate", () => {
    expect(convert("10.10", new Decimal("83.12345678")).toString()).toBe("839.55");
  });
});
