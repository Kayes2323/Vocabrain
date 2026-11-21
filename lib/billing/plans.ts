/**
 * Plans, billing intervals and the server-side Price ID allowlist.
 *
 * Pure: no Stripe SDK, no Firebase, no network, no reading of process.env except
 * through the `env` argument. Amounts are NOT stored here: the Stripe Price is
 * the single source of truth for what a plan costs.
 *
 * The browser only ever names an interval ("monthly" | "yearly"). The Price ID
 * comes from server environment variables and is never taken from a request.
 */

export type PlanId = 'free' | 'premium';
export type BillingInterval = 'monthly' | 'yearly';

export const BILLING_INTERVALS = ['monthly', 'yearly'] as const satisfies readonly BillingInterval[];

export interface PlanDefinition {
  id: PlanId;
  /** Premium needs a paid Stripe subscription; Free never does. */
  paid: boolean;
}

export const PLANS: Readonly<Record<PlanId, PlanDefinition>> = Object.freeze({
  free: Object.freeze({ id: 'free', paid: false }),
  premium: Object.freeze({ id: 'premium', paid: true }),
});

export interface IntervalDefinition {
  id: BillingInterval;
  /** Stripe's name for the same interval. */
  stripeInterval: 'month' | 'year';
  /** Server environment variable that holds this interval's Stripe Price ID. */
  priceEnvVar: 'STRIPE_PRICE_ID_MONTHLY' | 'STRIPE_PRICE_ID_YEARLY';
}

export const INTERVALS: Readonly<Record<BillingInterval, IntervalDefinition>> = Object.freeze({
  monthly: Object.freeze({ id: 'monthly', stripeInterval: 'month', priceEnvVar: 'STRIPE_PRICE_ID_MONTHLY' }),
  yearly: Object.freeze({ id: 'yearly', stripeInterval: 'year', priceEnvVar: 'STRIPE_PRICE_ID_YEARLY' }),
});

/** Stripe Price IDs are "price_" followed by letters and digits (test and live alike). */
const PRICE_ID = /^price_[A-Za-z0-9]{8,64}$/;
export const isPriceIdFormat = (value: unknown): value is string => typeof value === 'string' && PRICE_ID.test(value);

/** The validated allowlist: exactly one Price ID per interval, all different. */
export interface PriceConfig {
  readonly monthly: string;
  readonly yearly: string;
}

export type PriceConfigIssueCode = 'missing_price' | 'invalid_price_format' | 'duplicate_price';

export interface PriceConfigIssue {
  /** Which variable is wrong. Names only: the value is never echoed. */
  envVar: IntervalDefinition['priceEnvVar'];
  code: PriceConfigIssueCode;
}

export type PriceConfigResult = { ok: true; config: PriceConfig } | { ok: false; issues: PriceConfigIssue[] };

/**
 * Reads and validates the two Price ID variables. Explicit result instead of an
 * exception so callers decide the HTTP answer (a bad configuration is a 503, not
 * a crash) and tests can assert every failure.
 */
export function loadPriceConfig(env: Record<string, string | undefined> = process.env): PriceConfigResult {
  const issues: PriceConfigIssue[] = [];
  const values = {} as Record<BillingInterval, string>;

  for (const interval of BILLING_INTERVALS) {
    const { priceEnvVar } = INTERVALS[interval];
    const value = env[priceEnvVar]?.trim();
    if (!value) issues.push({ envVar: priceEnvVar, code: 'missing_price' });
    else if (!isPriceIdFormat(value)) issues.push({ envVar: priceEnvVar, code: 'invalid_price_format' });
    else values[interval] = value;
  }

  // One Price ID for both intervals would make "which interval is this?" ambiguous.
  if (!issues.length && values.monthly === values.yearly) {
    issues.push({ envVar: INTERVALS.monthly.priceEnvVar, code: 'duplicate_price' }, { envVar: INTERVALS.yearly.priceEnvVar, code: 'duplicate_price' });
  }

  return issues.length ? { ok: false, issues } : { ok: true, config: Object.freeze({ monthly: values.monthly, yearly: values.yearly }) };
}

export type ResolvedCheckoutPrice = { ok: true; interval: BillingInterval; priceId: string } | { ok: false; code: 'invalid_plan' };

/**
 * Turns what the browser sent (an interval name) into the server's Price ID.
 * Only the two exact strings are accepted: a Price ID, a different case, extra
 * whitespace, or an object key such as "__proto__" all fail.
 */
export function resolveCheckoutPrice(config: PriceConfig, requested: unknown): ResolvedCheckoutPrice {
  if (requested === 'monthly') return { ok: true, interval: 'monthly', priceId: config.monthly };
  if (requested === 'yearly') return { ok: true, interval: 'yearly', priceId: config.yearly };
  return { ok: false, code: 'invalid_plan' };
}

/** Which interval a Stripe Price ID belongs to, or null if it is not on the allowlist. */
export function intervalForPriceId(config: PriceConfig, priceId: unknown): BillingInterval | null {
  if (typeof priceId !== 'string') return null;
  if (priceId === config.monthly) return 'monthly';
  if (priceId === config.yearly) return 'yearly';
  return null;
}
