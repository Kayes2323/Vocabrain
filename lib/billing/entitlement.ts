import { intervalForPriceId, type BillingInterval, type PlanId, type PriceConfig } from './plans';
import {
  getSubscriptionPeriodEnd,
  getSubscriptionPriceIds,
  isStripeSubscriptionStatus,
  type StripeSubscriptionStatus,
} from './stripe-types';

/**
 * Maps a Stripe subscription to what the student may use. Pure: no Stripe SDK
 * instance, no Firebase, no network, no clock except the `now` argument.
 *
 * POLICY (approved, Task 3 design D3/D4). Premium only ever comes from a paid
 * Stripe subscription whose Price is on the server allowlist:
 *
 *   active                        -> Premium
 *   trialing                      -> Premium
 *   past_due                      -> Premium while Stripe is still retrying the payment.
 *                                    No grace period of our own: when Stripe gives up it
 *                                    moves the subscription to canceled/unpaid, and then Free.
 *   active/trialing/past_due with a scheduled cancellation
 *                                 -> Premium until the scheduled end (cancel_at, or the end of
 *                                    the current period for cancel_at_period_end), then Free
 *   canceled, unpaid, incomplete, incomplete_expired, paused
 *                                 -> Free
 *   unknown status, unknown Price, malformed input
 *                                 -> Free, and flagged `needsReview`
 *
 * Free is the ordinary app, not a locked state: this module never blocks a free
 * student from anything. It only answers "is Premium on or off".
 */

export interface Entitlement {
  plan: PlanId;
  /** The Stripe status, 'unknown' for a status we do not recognise, 'none' for no subscription. */
  status: StripeSubscriptionStatus | 'unknown' | 'none';
  /** Why this plan, for logs and the account screen. Stable codes, not sentences. */
  reason: EntitlementReason;
  /** The interval of the allowlisted Price; null when Free. */
  interval: BillingInterval | null;
  /** A cancellation is scheduled: access continues until `accessEndsAt`. */
  cancelScheduled: boolean;
  /** Unix seconds when a scheduled cancellation takes effect; null if none is scheduled or the end is unknown. */
  accessEndsAt: number | null;
  /** End of the current billing period, Unix seconds, when known. */
  currentPeriodEnd: number | null;
  /** The latest payment failed and Stripe is retrying (status past_due). */
  paymentIssue: boolean;
  /** Something unexpected: do not trust this result silently (unknown status or Price, malformed data). */
  needsReview: boolean;
}

export type EntitlementReason =
  | 'no_subscription'
  | 'active'
  | 'trialing'
  | 'past_due_retrying'
  | 'cancel_scheduled'
  | 'period_ended'
  | 'canceled'
  | 'unpaid'
  | 'incomplete'
  | 'incomplete_expired'
  | 'paused'
  | 'unknown_status'
  | 'unsupported_price'
  | 'invalid_subscription';

/** Statuses that grant Premium (subject to the Price and scheduled-end checks). */
const PREMIUM_STATUSES = {
  active: 'active',
  trialing: 'trialing',
  past_due: 'past_due_retrying',
} as const satisfies Partial<Record<StripeSubscriptionStatus, EntitlementReason>>;

/** Statuses that never grant Premium. */
const FREE_STATUSES = {
  canceled: 'canceled',
  unpaid: 'unpaid',
  incomplete: 'incomplete',
  incomplete_expired: 'incomplete_expired',
  paused: 'paused',
} as const satisfies Partial<Record<StripeSubscriptionStatus, EntitlementReason>>;

// Compile-time exhaustiveness: if a newer Stripe SDK adds a status, this line stops compiling
// until someone decides, on purpose, whether it grants Premium.
type Unclassified = Exclude<StripeSubscriptionStatus, keyof typeof PREMIUM_STATUSES | keyof typeof FREE_STATUSES>;
const _allStatusesClassified: [Unclassified] extends [never] ? true : never = true;
void _allStatusesClassified;

/** Free with no subscription. */
export const FREE_ENTITLEMENT: Readonly<Entitlement> = Object.freeze({
  plan: 'free',
  status: 'none',
  reason: 'no_subscription',
  interval: null,
  cancelScheduled: false,
  accessEndsAt: null,
  currentPeriodEnd: null,
  paymentIssue: false,
  needsReview: false,
});

const free = (over: Partial<Entitlement>): Entitlement => ({ ...FREE_ENTITLEMENT, ...over });

/**
 * The fields of a Stripe Subscription this module reads. Every field is
 * optional/unknown so a real `Stripe.Subscription`, an older payload or garbage
 * can all be passed in; anything unusable ends as Free, never as Premium.
 */
export interface SubscriptionLike {
  status?: unknown;
  cancel_at_period_end?: unknown;
  cancel_at?: unknown;
  current_period_end?: unknown;
  items?: { data?: ReadonlyArray<{ price?: unknown; current_period_end?: unknown }> } | null;
}

const isUnixSeconds = (v: unknown): v is number => typeof v === 'number' && Number.isInteger(v) && v > 0;

/** Unix seconds for "now"; the single place time enters, so tests can fix it. */
export const nowInSeconds = (): number => Math.floor(Date.now() / 1000);

/**
 * The entitlement for one subscription. Never throws and never mutates its input.
 *
 * @param subscription a retrieved Stripe subscription (never the checkout redirect)
 * @param prices the validated server allowlist from loadPriceConfig
 * @param now Unix seconds; defaults to the current time
 */
export function entitlementFromSubscription(subscription: SubscriptionLike | null | undefined, prices: PriceConfig, now: number = nowInSeconds()): Entitlement {
  if (typeof subscription !== 'object' || subscription === null || Array.isArray(subscription)) {
    return free({ reason: 'invalid_subscription', needsReview: true });
  }

  const { status } = subscription;
  if (!isStripeSubscriptionStatus(status)) return free({ status: 'unknown', reason: 'unknown_status', needsReview: true });

  const currentPeriodEnd = getSubscriptionPeriodEnd(subscription);

  if (status in FREE_STATUSES) {
    return free({ status, reason: FREE_STATUSES[status as keyof typeof FREE_STATUSES], currentPeriodEnd });
  }

  // From here the status could grant Premium, so the subscription must be one of ours.
  if (!subscription.items || typeof subscription.items !== 'object' || !Array.isArray(subscription.items.data)) {
    return free({ status, reason: 'invalid_subscription', currentPeriodEnd, needsReview: true });
  }
  const interval = getSubscriptionPriceIds(subscription)
    .map((id) => intervalForPriceId(prices, id))
    .find((i): i is BillingInterval => i !== null);
  if (!interval) return free({ status, reason: 'unsupported_price', currentPeriodEnd, needsReview: true });

  const cancelAtPeriodEnd = subscription.cancel_at_period_end === true;
  const cancelAt = isUnixSeconds(subscription.cancel_at) ? subscription.cancel_at : null;
  const cancelScheduled = cancelAtPeriodEnd || cancelAt !== null;
  const accessEndsAt = cancelAt ?? (cancelAtPeriodEnd ? currentPeriodEnd : null);
  const paymentIssue = status === 'past_due';

  // Access lasts "until period end" for a scheduled cancellation, so once that time has passed
  // it is over even if Stripe's final canceled event is late.
  if (accessEndsAt !== null && now >= accessEndsAt) {
    return free({ status, reason: 'period_ended', currentPeriodEnd, cancelScheduled, accessEndsAt, paymentIssue });
  }

  const statusReason = PREMIUM_STATUSES[status as keyof typeof PREMIUM_STATUSES];
  return {
    plan: 'premium',
    status,
    reason: cancelScheduled && !paymentIssue ? 'cancel_scheduled' : statusReason,
    interval,
    cancelScheduled,
    accessEndsAt,
    currentPeriodEnd,
    paymentIssue,
    needsReview: false,
  };
}

export const hasPremiumAccess = (entitlement: Pick<Entitlement, 'plan'> | null | undefined): boolean => entitlement?.plan === 'premium';
