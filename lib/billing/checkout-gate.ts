/**
 * Server-side switches that keep payments OFF unless an operator turns them on.
 * Pure: reads only the `env` argument. Hiding the button is not a control; these are.
 *
 *  1. STRIPE_CHECKOUT_ENABLED must be exactly "true"  (default: off).
 *  2. A LIVE Stripe key (sk_live_ / rk_live_) additionally needs STRIPE_ALLOW_LIVE exactly "true"
 *     (default: off). A test key never needs it.
 *
 * Any other value, including "TRUE", "1" or an empty string, keeps the switch off.
 */
type Env = Record<string, string | undefined>;

export const isCheckoutEnabled = (env: Env = process.env): boolean => env.STRIPE_CHECKOUT_ENABLED === 'true';
export const isLivePaymentAllowed = (env: Env = process.env): boolean => env.STRIPE_ALLOW_LIVE === 'true';

export type StripeKeyMode = 'test' | 'live' | 'unknown';

/** Classifies a Stripe secret/restricted key by its prefix only. The key itself is never returned or logged. */
export function stripeKeyMode(key: string | undefined): StripeKeyMode {
  const k = key?.trim() ?? '';
  if (/^(sk|rk)_live_/.test(k)) return 'live';
  if (/^(sk|rk)_test_/.test(k)) return 'test';
  return 'unknown';
}

export type CheckoutGateResult =
  | { ok: true; mode: 'test' | 'live' }
  | { ok: false; code: 'checkout_disabled' | 'live_payments_disabled' | 'billing_unavailable' };

/** Evaluated before anything else in the checkout route: before auth, before the body is read, before any Stripe call. */
export function evaluateCheckoutGate(env: Env = process.env): CheckoutGateResult {
  if (!isCheckoutEnabled(env)) return { ok: false, code: 'checkout_disabled' };
  const mode = stripeKeyMode(env.STRIPE_SECRET_KEY);
  if (mode === 'unknown') return { ok: false, code: 'billing_unavailable' }; // missing or not a Stripe secret key
  if (mode === 'live' && !isLivePaymentAllowed(env)) return { ok: false, code: 'live_payments_disabled' };
  return { ok: true, mode };
}
