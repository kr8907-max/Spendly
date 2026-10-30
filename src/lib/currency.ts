/** All ISO 4217 currencies the runtime supports, loaded dynamically. */
export function listCurrencies(locale = "en") {
  const names = new Intl.DisplayNames([locale], { type: "currency" });
  const codes: string[] = (Intl as any).supportedValuesOf("currency");
  return codes.map((code) => ({ code, name: names.of(code) ?? code, symbol: symbolOf(code, locale) }));
}

export const symbolOf = (code: string, locale = "en") =>
  new Intl.NumberFormat(locale, { style: "currency", currency: code, currencyDisplay: "narrowSymbol" })
    .formatToParts(0).find((p) => p.type === "currency")?.value ?? code;

export const formatMoney = (amount: number | string, code: string, locale = "en-US") =>
  new Intl.NumberFormat(locale, { style: "currency", currency: code }).format(Number(amount));

/** Latest rates (open.er-api.com, no key). Save to ExchangeRate; copy the rate onto each Expense. */
export async function fetchRates(base: string) {
  const res = await fetch(`https://open.er-api.com/v6/latest/${base}`);
  if (!res.ok) throw new Error(`Rate fetch failed: ${res.status}`);
  return { rates: (await res.json()).rates as Record<string, number>, fetchedAt: new Date() };
}
