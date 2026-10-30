import Decimal from "decimal.js";

export const daysInMonth = (year: number, month1: number) => new Date(year, month1, 0).getDate();

/** Days left in the month, counting today. */
export const remainingDays = (today: Date) =>
  daysInMonth(today.getFullYear(), today.getMonth() + 1) - today.getDate() + 1;

/** Allowance = remaining budget / remaining days. Under/overspending self-adjusts future days. */
export function dailyAllowance(totalBudget: Decimal.Value, spent: Decimal.Value, today: Date) {
  const remaining = new Decimal(totalBudget).minus(spent);
  const days = remainingDays(today);
  const overBudget = remaining.lt(0);
  const allowance = overBudget ? new Decimal(0) : remaining.div(days).toDecimalPlaces(2, Decimal.ROUND_DOWN);
  return { remaining, days, allowance, overBudget };
}

export function utilization(totalBudget: Decimal.Value, spent: Decimal.Value): number {
  const b = new Decimal(totalBudget);
  return b.lte(0) ? 0 : new Decimal(spent).div(b).times(100).toDecimalPlaces(1).toNumber();
}

/** Convert using a rate frozen at entry time (1 original unit = rate budget-currency units). */
export const convert = (amount: Decimal.Value, rate: Decimal.Value) =>
  new Decimal(amount).times(rate).toDecimalPlaces(2, Decimal.ROUND_HALF_UP);
