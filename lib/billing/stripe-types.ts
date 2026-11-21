import type Stripe from 'stripe';

/**
 * Stripe helpers: the pinned API version, the subscription status list, and
 * readers for the few fields billing needs. Pure: types only, no SDK instance,
 * no network.
 *
 * API VERSION DECISION (verified against stripe@22.1.1, see docs/BILLING_STRIPE_API.md):
 * the SDK's types describe exactly one API version, 2026-04-22.dahlia. In that
 * version `current_period_end` lives on each subscription ITEM, not on the
 * Subscription, and an Invoice names its subscription at
 * `parent.subscription_details.subscription`. The old pin (2024-11-20) returns
 * the previous shapes, so code written against the SDK's types would read
 * undefined at runtime. Billing code must therefore construct the Stripe client
 * with STRIPE_API_VERSION below. (Applied to the client in Task 3.3; the
 * existing lib/stripe-server.ts is intentionally untouched by Task 3.2.)
 */
export const STRIPE_API_VERSION = '2026-04-22.dahlia' as const;

export type StripeSubscriptionStatus = Stripe.Subscription.Status;

/** Every status Stripe documents for a subscription (checked against the SDK type by the compiler). */
export const STRIPE_SUBSCRIPTION_STATUSES = [
  'active',
  'trialing',
  'past_due',
  'canceled',
  'unpaid',
  'incomplete',
  'incomplete_expired',
  'paused',
] as const satisfies readonly StripeSubscriptionStatus[];

export const isStripeSubscriptionStatus = (value: unknown): value is StripeSubscriptionStatus =>
  typeof value === 'string' && (STRIPE_SUBSCRIPTION_STATUSES as readonly string[]).includes(value);

/** The only webhook events billing acts on. Anything else is acknowledged and ignored. */
export const HANDLED_EVENT_TYPES = [
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.payment_failed',
] as const;
export type HandledEventType = (typeof HANDLED_EVENT_TYPES)[number];
export const isHandledEventType = (value: unknown): value is HandledEventType =>
  typeof value === 'string' && (HANDLED_EVENT_TYPES as readonly string[]).includes(value);

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const isUnixSeconds = (v: unknown): v is number => typeof v === 'number' && Number.isInteger(v) && v > 0;

/** An id that Stripe returns either as a string or as an expanded object. */
export function idOf(value: unknown): string | null {
  if (typeof value === 'string') return value.length ? value : null;
  if (isRecord(value) && typeof value.id === 'string' && value.id.length) return value.id;
  return null;
}

/**
 * When the current billing period ends, as Unix seconds, or null if unknown.
 * Current API: the latest `current_period_end` among the items. Older payloads
 * (API before 2025-03-31.basil) carry it on the subscription itself, so that is
 * the fallback. Invalid values are ignored.
 */
export function getSubscriptionPeriodEnd(subscription: unknown): number | null {
  if (!isRecord(subscription)) return null;
  const items = isRecord(subscription.items) && Array.isArray(subscription.items.data) ? subscription.items.data : [];
  const ends = items.map((item) => (isRecord(item) ? item.current_period_end : undefined)).filter(isUnixSeconds);
  if (ends.length) return Math.max(...ends);
  return isUnixSeconds(subscription.current_period_end) ? subscription.current_period_end : null;
}

/** The Price IDs on a subscription's items (an item may carry the price as a string or an object). */
export function getSubscriptionPriceIds(subscription: unknown): string[] {
  if (!isRecord(subscription) || !isRecord(subscription.items) || !Array.isArray(subscription.items.data)) return [];
  return subscription.items.data.flatMap((item) => {
    const id = isRecord(item) ? idOf(item.price) : null;
    return id ? [id] : [];
  });
}

/**
 * The subscription an invoice belongs to. Current API: parent.subscription_details.subscription.
 * Older payloads: invoice.subscription. Null when the invoice is not for a subscription.
 */
export function getInvoiceSubscriptionId(invoice: unknown): string | null {
  if (!isRecord(invoice)) return null;
  const parent = invoice.parent;
  if (isRecord(parent) && isRecord(parent.subscription_details)) {
    const id = idOf(parent.subscription_details.subscription);
    if (id) return id;
  }
  return idOf(invoice.subscription);
}

/** The customer id of any Stripe object that has `customer` (string, expanded object, or absent). */
export const getCustomerId = (object: unknown): string | null => (isRecord(object) ? idOf(object.customer) : null);

/** The subscription id on a Checkout Session. */
export const getSessionSubscriptionId = (session: unknown): string | null => (isRecord(session) ? idOf(session.subscription) : null);
