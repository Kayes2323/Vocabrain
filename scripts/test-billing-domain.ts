/**
 * Billing domain (pure): plans and the Price ID allowlist, the Stripe-status -> Free/Premium
 * entitlement policy, and the Stripe type helpers. No Stripe network, no Firebase.
 * Run: pnpm test:billing
 */
import assert from 'node:assert/strict';
import Stripe from 'stripe';
import {
  BILLING_INTERVALS,
  INTERVALS,
  PLANS,
  intervalForPriceId,
  isPriceIdFormat,
  loadPriceConfig,
  resolveCheckoutPrice,
  type PriceConfig,
} from '../lib/billing/plans';
import { FREE_ENTITLEMENT, entitlementFromSubscription, hasPremiumAccess, type Entitlement, type SubscriptionLike } from '../lib/billing/entitlement';
import {
  HANDLED_EVENT_TYPES,
  STRIPE_API_VERSION,
  STRIPE_SUBSCRIPTION_STATUSES,
  getCustomerId,
  getInvoiceSubscriptionId,
  getSessionSubscriptionId,
  getSubscriptionPeriodEnd,
  getSubscriptionPriceIds,
  idOf,
  isHandledEventType,
  isStripeSubscriptionStatus,
} from '../lib/billing/stripe-types';

let passed = 0;
function test(name: string, fn: () => void) {
  try {
    fn();
    passed++;
    console.log(`PASS ${name}`);
  } catch (error) {
    console.log(`FAIL ${name}\n  ${(error as Error).message}`);
    process.exitCode = 1;
  }
}

// ---------- fixtures ----------
const MONTHLY = 'price_1MonthlyTestAAAA1111';
const YEARLY = 'price_1YearlyTestBBBB2222';
const OTHER = 'price_1SomeOtherProductCC33';
const env = (extra: Record<string, string | undefined> = {}) => ({ STRIPE_PRICE_ID_MONTHLY: MONTHLY, STRIPE_PRICE_ID_YEARLY: YEARLY, ...extra });
const loaded = loadPriceConfig(env());
assert.ok(loaded.ok);
const PRICES: PriceConfig = loaded.config;

const NOW = 1_800_000_000; // fixed clock (Unix seconds)
const HOUR = 3600;
const sub = (over: Record<string, unknown> = {}, priceId: string = MONTHLY, periodEnd: number | null = NOW + 20 * 24 * HOUR): SubscriptionLike => ({
  status: 'active',
  cancel_at_period_end: false,
  cancel_at: null,
  items: { data: [{ price: { id: priceId }, ...(periodEnd === null ? {} : { current_period_end: periodEnd }) }] },
  ...over,
});
const ent = (s: SubscriptionLike | null | undefined, now = NOW) => entitlementFromSubscription(s, PRICES, now);

// =====================================================================
// plans
// =====================================================================
test('Free and Premium are defined; only Premium is paid', () => {
  assert.deepEqual(Object.keys(PLANS).sort(), ['free', 'premium']);
  assert.equal(PLANS.free.paid, false);
  assert.equal(PLANS.premium.paid, true);
  assert.ok(Object.isFrozen(PLANS) && Object.isFrozen(PLANS.premium));
});

test('monthly and yearly map to Stripe month/year and to their own environment variables', () => {
  assert.deepEqual([...BILLING_INTERVALS], ['monthly', 'yearly']);
  assert.deepEqual([INTERVALS.monthly.stripeInterval, INTERVALS.yearly.stripeInterval], ['month', 'year']);
  assert.deepEqual([INTERVALS.monthly.priceEnvVar, INTERVALS.yearly.priceEnvVar], ['STRIPE_PRICE_ID_MONTHLY', 'STRIPE_PRICE_ID_YEARLY']);
});

test('loadPriceConfig: two valid Price IDs load (surrounding whitespace is trimmed) and the result is frozen', () => {
  const r = loadPriceConfig(env({ STRIPE_PRICE_ID_MONTHLY: `  ${MONTHLY}\n` }));
  assert.ok(r.ok && r.config.monthly === MONTHLY && r.config.yearly === YEARLY);
  assert.ok(Object.isFrozen(PRICES));
});

test('loadPriceConfig: missing, blank or whitespace-only values are missing_price (per variable)', () => {
  for (const bad of [undefined, '', '   ', '\n']) {
    const r = loadPriceConfig(env({ STRIPE_PRICE_ID_YEARLY: bad }));
    assert.ok(!r.ok);
    assert.deepEqual(r.issues, [{ envVar: 'STRIPE_PRICE_ID_YEARLY', code: 'missing_price' }]);
  }
  const both = loadPriceConfig({});
  assert.ok(!both.ok);
  assert.deepEqual(both.issues.map((i) => `${i.envVar}:${i.code}`), ['STRIPE_PRICE_ID_MONTHLY:missing_price', 'STRIPE_PRICE_ID_YEARLY:missing_price']);
});

test('loadPriceConfig: wrong formats are invalid_price_format', () => {
  for (const bad of ['prod_123456789', 'price_', 'price_short', 'PRICE_1ABCDEFGH', 'price_has space1', 'price_1ABC-DEFGH', 'sk_test_1234567890', 'price_1ABCDEFGH\nprice_2ABCDEFGH', 'price_' + 'a'.repeat(65)]) {
    const r = loadPriceConfig(env({ STRIPE_PRICE_ID_MONTHLY: bad }));
    assert.ok(!r.ok, bad);
    assert.deepEqual(r.issues, [{ envVar: 'STRIPE_PRICE_ID_MONTHLY', code: 'invalid_price_format' }], bad);
  }
});

test('loadPriceConfig: the same Price ID for both intervals is rejected (ambiguous)', () => {
  const r = loadPriceConfig(env({ STRIPE_PRICE_ID_YEARLY: MONTHLY }));
  assert.ok(!r.ok);
  assert.deepEqual(r.issues.map((i) => i.code), ['duplicate_price', 'duplicate_price']);
});

test('loadPriceConfig: a failure never echoes a configured value', () => {
  const secretish = 'sk_live_ABCDEF1234567890';
  const r = loadPriceConfig(env({ STRIPE_PRICE_ID_MONTHLY: secretish }));
  assert.ok(!r.ok);
  assert.ok(!JSON.stringify(r).includes(secretish));
});

test('isPriceIdFormat accepts real-looking IDs and rejects non-strings', () => {
  assert.ok(isPriceIdFormat('price_1MowQVLkdIwHu7ixraBm864M'));
  for (const v of [undefined, null, 1, {}, ['price_1MowQVLkdIwHu7ixraBm864M']]) assert.ok(!isPriceIdFormat(v));
});

test('resolveCheckoutPrice: monthly and yearly resolve to the server Price ID', () => {
  assert.deepEqual(resolveCheckoutPrice(PRICES, 'monthly'), { ok: true, interval: 'monthly', priceId: MONTHLY });
  assert.deepEqual(resolveCheckoutPrice(PRICES, 'yearly'), { ok: true, interval: 'yearly', priceId: YEARLY });
});

test('resolveCheckoutPrice: anything else is invalid_plan, including a client-sent Price ID', () => {
  const bad: unknown[] = [
    'weekly', '', 'MONTHLY', 'Yearly', ' monthly', 'monthly ', 'monthly\n', undefined, null, 0, 1, true, {}, [], ['monthly'], { plan: 'monthly' },
    MONTHLY, YEARLY, OTHER, 'price_anything', '__proto__', 'constructor', 'toString', 'hasOwnProperty', 'premium', 'free',
  ];
  for (const v of bad) assert.deepEqual(resolveCheckoutPrice(PRICES, v), { ok: false, code: 'invalid_plan' }, String(v));
});

test('resolveCheckoutPrice never returns a Price ID that was not configured on the server', () => {
  for (const interval of ['monthly', 'yearly']) {
    const r = resolveCheckoutPrice(PRICES, interval);
    assert.ok(r.ok && [MONTHLY, YEARLY].includes(r.priceId));
  }
});

test('intervalForPriceId: allowlisted IDs map to their interval; everything else is null', () => {
  assert.equal(intervalForPriceId(PRICES, MONTHLY), 'monthly');
  assert.equal(intervalForPriceId(PRICES, YEARLY), 'yearly');
  for (const v of [OTHER, '', undefined, null, 5, {}, MONTHLY.toUpperCase(), ` ${MONTHLY}`]) assert.equal(intervalForPriceId(PRICES, v), null);
});

// =====================================================================
// entitlement: the approved status policy
// =====================================================================
test('active -> Premium (monthly and yearly resolve their interval)', () => {
  const m = ent(sub());
  assert.deepEqual([m.plan, m.status, m.reason, m.interval, m.paymentIssue, m.cancelScheduled, m.needsReview], ['premium', 'active', 'active', 'monthly', false, false, false]);
  assert.equal(ent(sub({}, YEARLY)).interval, 'yearly');
  assert.equal(m.currentPeriodEnd, NOW + 20 * 24 * HOUR);
});

test('trialing -> Premium', () => {
  const e = ent(sub({ status: 'trialing' }));
  assert.deepEqual([e.plan, e.status, e.reason], ['premium', 'trialing', 'trialing']);
});

test('past_due -> Premium while Stripe retries, flagged as a payment issue (no grace period of our own)', () => {
  const e = ent(sub({ status: 'past_due' }));
  assert.deepEqual([e.plan, e.status, e.reason, e.paymentIssue, e.needsReview], ['premium', 'past_due', 'past_due_retrying', true, false]);
});

test('past_due makes no time-based decision: it stays Premium however long it has been, until Stripe changes the status', () => {
  assert.equal(ent(sub({ status: 'past_due' }), NOW + 400 * 24 * HOUR).plan, 'premium');
});

test('canceled, unpaid, incomplete, incomplete_expired, paused -> Free, with their own reason', () => {
  for (const status of ['canceled', 'unpaid', 'incomplete', 'incomplete_expired', 'paused'] as const) {
    const e = ent(sub({ status }));
    assert.deepEqual([e.plan, e.status, e.reason, e.interval, e.needsReview], ['free', status, status, null, false], status);
  }
});

test('a Free status stays Free whatever else is on the subscription (valid price, cancel flags, future period)', () => {
  for (const status of ['canceled', 'unpaid', 'incomplete', 'incomplete_expired', 'paused']) {
    for (const extra of [{}, { cancel_at_period_end: true }, { cancel_at: NOW + 10 * HOUR }, { cancel_at_period_end: false }]) {
      assert.equal(ent(sub({ status, ...extra }, YEARLY)).plan, 'free', `${status} ${JSON.stringify(extra)}`);
    }
  }
});

test('active + cancel_at_period_end -> Premium until the period ends, then Free', () => {
  const end = NOW + 5 * 24 * HOUR;
  const before = ent(sub({ cancel_at_period_end: true }, MONTHLY, end), end - 1);
  assert.deepEqual([before.plan, before.reason, before.cancelScheduled, before.accessEndsAt], ['premium', 'cancel_scheduled', true, end]);
  const at = ent(sub({ cancel_at_period_end: true }, MONTHLY, end), end);
  assert.deepEqual([at.plan, at.reason, at.cancelScheduled, at.accessEndsAt], ['free', 'period_ended', true, end]);
  assert.equal(ent(sub({ cancel_at_period_end: true }, MONTHLY, end), end + 10 * HOUR).plan, 'free');
});

test('a scheduled cancellation with an unknown period end stays Premium (Stripe will send the final event)', () => {
  const e = ent(sub({ cancel_at_period_end: true }, MONTHLY, null));
  assert.deepEqual([e.plan, e.reason, e.cancelScheduled, e.accessEndsAt, e.currentPeriodEnd], ['premium', 'cancel_scheduled', true, null, null]);
});

test('cancel_at (a specific end time) behaves like a scheduled cancellation', () => {
  const at = NOW + 3 * HOUR;
  assert.equal(ent(sub({ cancel_at: at }), at - 1).plan, 'premium');
  assert.equal(ent(sub({ cancel_at: at }), at - 1).accessEndsAt, at);
  assert.equal(ent(sub({ cancel_at: at }), at).plan, 'free');
  assert.equal(ent(sub({ cancel_at: NOW - 5 }), NOW).reason, 'period_ended');
});

test('cancel_at wins over the period end when both are set', () => {
  const e = ent(sub({ cancel_at_period_end: true, cancel_at: NOW + HOUR }, MONTHLY, NOW + 30 * 24 * HOUR));
  assert.equal(e.accessEndsAt, NOW + HOUR);
});

test('trialing and past_due with a scheduled cancellation end on schedule too; past_due keeps its payment-issue flag', () => {
  const end = NOW + 2 * HOUR;
  assert.equal(ent(sub({ status: 'trialing', cancel_at_period_end: true }, MONTHLY, end), end - 1).plan, 'premium');
  assert.equal(ent(sub({ status: 'trialing', cancel_at_period_end: true }, MONTHLY, end), end).plan, 'free');
  const pd = ent(sub({ status: 'past_due', cancel_at_period_end: true }, MONTHLY, end), end - 1);
  assert.deepEqual([pd.plan, pd.reason, pd.paymentIssue, pd.cancelScheduled], ['premium', 'past_due_retrying', true, true]);
  assert.equal(ent(sub({ status: 'past_due', cancel_at_period_end: true }, MONTHLY, end), end).plan, 'free');
});

test('a normal active subscription is NOT cut off just because its period end passed (renewal events can lag)', () => {
  const e = ent(sub({}, MONTHLY, NOW - 3 * HOUR));
  assert.deepEqual([e.plan, e.reason], ['premium', 'active']);
});

test('cancel flags only count when they are exactly true / a valid timestamp', () => {
  for (const flag of ['true', 1, 'yes', {}, null, undefined]) assert.equal(ent(sub({ cancel_at_period_end: flag })).cancelScheduled, false, String(flag));
  for (const at of [0, -1, 1.5, '1800000000', NaN, null, Infinity]) assert.equal(ent(sub({ cancel_at: at })).cancelScheduled, false, String(at));
});

// ---------- unknown / invalid input is never Premium ----------
test('unknown or malformed status -> Free, needsReview', () => {
  for (const status of ['weird', 'ACTIVE', 'Active', ' active', 'active ', '', 'unknown', 'none', undefined, null, 1, true, {}, ['active']]) {
    const e = ent(sub({ status }));
    assert.deepEqual([e.plan, e.reason, e.needsReview, e.status], ['free', 'unknown_status', true, 'unknown'], String(status));
  }
});

test('missing or invalid input -> Free, needsReview, never throws', () => {
  for (const v of [null, undefined, 'active', 42, true, [], () => undefined] as unknown[]) {
    const e = ent(v as SubscriptionLike);
    assert.deepEqual([e.plan, e.reason, e.needsReview], ['free', 'invalid_subscription', true]);
  }
  const noItems = ent({ status: 'active' });
  assert.deepEqual([noItems.plan, noItems.reason, noItems.needsReview], ['free', 'invalid_subscription', true]);
  assert.equal(ent({ status: 'active', items: null }).plan, 'free');
  assert.equal(ent({ status: 'active', items: { data: 'x' as never } }).plan, 'free');
  assert.equal(ent({}).plan, 'free');
});

test('a Price that is not on the allowlist is never Premium (even if active)', () => {
  const e = ent(sub({}, OTHER));
  assert.deepEqual([e.plan, e.reason, e.needsReview, e.interval], ['free', 'unsupported_price', true, null]);
  for (const items of [{ data: [] }, { data: [{}] }, { data: [{ price: null }] }, { data: [{ price: { id: 5 } }] }, { data: [{ price: '' }] }]) {
    const x = ent({ status: 'active', items: items as never });
    assert.deepEqual([x.plan, x.reason], ['free', 'unsupported_price'], JSON.stringify(items));
  }
});

test('a price given as a plain string id, or an expanded object, both resolve', () => {
  assert.equal(ent({ status: 'active', items: { data: [{ price: YEARLY }] } }).interval, 'yearly');
  assert.equal(ent({ status: 'active', items: { data: [{ price: { id: YEARLY, unit_amount: 1 } }] } }).plan, 'premium');
});

test('several items: Premium only if one is allowlisted; the unlisted one does not block it', () => {
  const mixed = ent({ status: 'active', items: { data: [{ price: { id: OTHER } }, { price: { id: YEARLY } }] } });
  assert.deepEqual([mixed.plan, mixed.interval], ['premium', 'yearly']);
  assert.equal(ent({ status: 'active', items: { data: [{ price: { id: OTHER } }, { price: { id: OTHER } }] } }).plan, 'free');
});

test('NO ACCIDENTAL PREMIUM: across status x price x cancel-flag combinations, Premium needs a granting status, an allowlisted price and time left', () => {
  const statuses = [...STRIPE_SUBSCRIPTION_STATUSES, 'weird', '', undefined, null, 7];
  const prices = [MONTHLY, YEARLY, OTHER, '', undefined];
  const cancels = [{}, { cancel_at_period_end: true }, { cancel_at: NOW + HOUR }, { cancel_at: NOW - HOUR }];
  let premium = 0;
  let total = 0;
  for (const status of statuses) {
    for (const price of prices) {
      for (const cancel of cancels) {
        total++;
        const e = ent({ status, cancel_at_period_end: false, ...cancel, items: { data: [{ price: price === undefined ? undefined : { id: price }, current_period_end: NOW - HOUR }] } });
        const grants = status === 'active' || status === 'trialing' || status === 'past_due';
        const allowlisted = price === MONTHLY || price === YEARLY;
        const ended = ('cancel_at' in cancel && (cancel as { cancel_at: number }).cancel_at <= NOW) || (cancel.cancel_at_period_end === true); // period end is already past
        const expectPremium = grants && allowlisted && !ended;
        assert.equal(e.plan === 'premium', expectPremium, `${String(status)} / ${String(price)} / ${JSON.stringify(cancel)}`);
        if (e.plan === 'premium') premium++;
      }
    }
  }
  assert.ok(premium > 0 && premium < total, `premium ${premium} of ${total}`);
});

test('the input is not mutated and the result is a fresh object each time', () => {
  const input = sub({ cancel_at_period_end: true }, YEARLY);
  const frozen = JSON.parse(JSON.stringify(input));
  const deepFreeze = (o: unknown): void => {
    if (o && typeof o === 'object') {
      Object.freeze(o);
      Object.values(o).forEach(deepFreeze);
    }
  };
  deepFreeze(input);
  const a = ent(input);
  const b = ent(input);
  assert.notEqual(a, b);
  assert.deepEqual(input, frozen);
  assert.deepEqual(a, b);
});

test('FREE_ENTITLEMENT is frozen, Free, and not Premium', () => {
  assert.ok(Object.isFrozen(FREE_ENTITLEMENT));
  assert.deepEqual([FREE_ENTITLEMENT.plan, FREE_ENTITLEMENT.status, FREE_ENTITLEMENT.reason, FREE_ENTITLEMENT.needsReview], ['free', 'none', 'no_subscription', false]);
  assert.equal(hasPremiumAccess(FREE_ENTITLEMENT), false);
});

test('hasPremiumAccess: only an explicit Premium plan; missing data is not Premium', () => {
  assert.equal(hasPremiumAccess(ent(sub())), true);
  assert.equal(hasPremiumAccess(ent(sub({ status: 'canceled' }))), false);
  for (const v of [null, undefined, {}, { plan: 'PREMIUM' }, { plan: 'paid' }, { plan: true }] as unknown[]) assert.equal(hasPremiumAccess(v as Entitlement), false);
});

test('a Free result has no blocking fields: Free is the ordinary app, not a locked state', () => {
  const keys = Object.keys(FREE_ENTITLEMENT).sort();
  assert.deepEqual(keys, ['accessEndsAt', 'cancelScheduled', 'currentPeriodEnd', 'interval', 'needsReview', 'paymentIssue', 'plan', 'reason', 'status']);
  assert.ok(!keys.some((k) => /block|lock|paywall|deny/i.test(k)));
});

// =====================================================================
// Stripe type helpers
// =====================================================================
test('STRIPE_API_VERSION equals the installed SDK default (types and runtime shapes agree)', () => {
  assert.equal(STRIPE_API_VERSION, Stripe.API_VERSION);
  assert.match(STRIPE_API_VERSION, /^\d{4}-\d{2}-\d{2}\.[a-z]+$/);
});

test('the status list is the 8 documented Stripe statuses, and isStripeSubscriptionStatus is exact', () => {
  assert.equal(STRIPE_SUBSCRIPTION_STATUSES.length, 8);
  for (const s of STRIPE_SUBSCRIPTION_STATUSES) assert.ok(isStripeSubscriptionStatus(s));
  for (const v of ['ACTIVE', 'all', 'ended', '', undefined, null, 0, 'toString', '__proto__']) assert.ok(!isStripeSubscriptionStatus(v), String(v));
});

test('handled webhook events are exactly the four approved types', () => {
  assert.deepEqual([...HANDLED_EVENT_TYPES], ['checkout.session.completed', 'customer.subscription.updated', 'customer.subscription.deleted', 'invoice.payment_failed']);
  for (const t of HANDLED_EVENT_TYPES) assert.ok(isHandledEventType(t));
  for (const t of ['invoice.paid', 'customer.subscription.created', 'charge.refunded', 'customer.created', '', undefined, 5, 'CHECKOUT.SESSION.COMPLETED']) assert.ok(!isHandledEventType(t), String(t));
});

test('getSubscriptionPeriodEnd: current API reads the items; takes the latest; ignores invalid values', () => {
  assert.equal(getSubscriptionPeriodEnd({ items: { data: [{ current_period_end: 100 }] } }), 100);
  assert.equal(getSubscriptionPeriodEnd({ items: { data: [{ current_period_end: 100 }, { current_period_end: 300 }, { current_period_end: 200 }] } }), 300);
  assert.equal(getSubscriptionPeriodEnd({ items: { data: [{ current_period_end: 'x' }, { current_period_end: -4 }, { current_period_end: NaN }, { current_period_end: 1.5 }, {}] } }), null);
  assert.equal(getSubscriptionPeriodEnd({ items: { data: [{ current_period_end: 'x' }, { current_period_end: 50 }] } }), 50);
});

test('getSubscriptionPeriodEnd: an older payload (API before 2025-03-31.basil) carries it on the subscription', () => {
  assert.equal(getSubscriptionPeriodEnd({ current_period_end: 777, items: { data: [{ price: { id: MONTHLY } }] } }), 777);
  assert.equal(getSubscriptionPeriodEnd({ current_period_end: 777, items: { data: [{ current_period_end: 100 }] } }), 100, 'the item value wins when present');
  assert.equal(getSubscriptionPeriodEnd({ current_period_end: 'tomorrow' }), null);
});

test('getSubscriptionPeriodEnd: junk input is null', () => {
  for (const v of [null, undefined, 1, 'x', [], {}, { items: null }, { items: { data: 'x' } }]) assert.equal(getSubscriptionPeriodEnd(v), null);
});

test('an older-API subscription payload still maps correctly end to end', () => {
  const legacy = { status: 'active', cancel_at_period_end: true, current_period_end: NOW + HOUR, items: { data: [{ price: { id: MONTHLY } }] } };
  const e = ent(legacy, NOW);
  assert.deepEqual([e.plan, e.accessEndsAt, e.currentPeriodEnd], ['premium', NOW + HOUR, NOW + HOUR]);
  assert.equal(ent(legacy, NOW + HOUR).plan, 'free');
});

test('getSubscriptionPriceIds: string or expanded prices; junk ignored', () => {
  assert.deepEqual(getSubscriptionPriceIds({ items: { data: [{ price: { id: MONTHLY } }, { price: YEARLY }, { price: null }, {}, { price: { id: 5 } }, 'x'] } }), [MONTHLY, YEARLY]);
  for (const v of [null, undefined, {}, { items: {} }, { items: { data: 1 } }]) assert.deepEqual(getSubscriptionPriceIds(v), []);
});

test('getInvoiceSubscriptionId: current shape (parent.subscription_details), expanded object, and the older top-level field', () => {
  assert.equal(getInvoiceSubscriptionId({ parent: { type: 'subscription_details', subscription_details: { subscription: 'sub_123' } } }), 'sub_123');
  assert.equal(getInvoiceSubscriptionId({ parent: { subscription_details: { subscription: { id: 'sub_456' } } } }), 'sub_456');
  assert.equal(getInvoiceSubscriptionId({ subscription: 'sub_old' }), 'sub_old');
  assert.equal(getInvoiceSubscriptionId({ subscription: { id: 'sub_old2' } }), 'sub_old2');
  assert.equal(getInvoiceSubscriptionId({ parent: { subscription_details: { subscription: 'sub_new' } }, subscription: 'sub_old' }), 'sub_new', 'current shape wins');
});

test('getInvoiceSubscriptionId: an invoice that is not for a subscription is null', () => {
  for (const v of [null, undefined, 'x', {}, { parent: null }, { parent: { type: 'quote_details', quote_details: {}, subscription_details: null } }, { parent: { subscription_details: {} } }, { subscription: null }, { subscription: '' }]) {
    assert.equal(getInvoiceSubscriptionId(v), null, JSON.stringify(v));
  }
});

test('idOf / getCustomerId / getSessionSubscriptionId: string, expanded object, or null', () => {
  assert.equal(idOf('cus_1'), 'cus_1');
  assert.equal(idOf({ id: 'cus_2', deleted: true }), 'cus_2');
  for (const v of [null, undefined, '', {}, { id: 5 }, 5, []]) assert.equal(idOf(v), null);
  assert.equal(getCustomerId({ customer: 'cus_3' }), 'cus_3');
  assert.equal(getCustomerId({ customer: { id: 'cus_4' } }), 'cus_4');
  assert.equal(getCustomerId({}), null);
  assert.equal(getCustomerId('cus_5'), null);
  assert.equal(getSessionSubscriptionId({ subscription: 'sub_9' }), 'sub_9');
  assert.equal(getSessionSubscriptionId({ subscription: null }), null);
});

test('realistic event payloads: only stable fields are needed from the event itself', () => {
  const updated = { id: 'evt_1', type: 'customer.subscription.updated', created: NOW, data: { object: { id: 'sub_1', object: 'subscription', customer: 'cus_1', ...sub({ status: 'past_due' }) } } };
  assert.ok(isHandledEventType(updated.type));
  assert.equal(getCustomerId(updated.data.object), 'cus_1');
  assert.equal(ent(updated.data.object).plan, 'premium');
  const failed = { id: 'evt_2', type: 'invoice.payment_failed', data: { object: { id: 'in_1', customer: 'cus_1', parent: { type: 'subscription_details', subscription_details: { subscription: 'sub_1' } } } } };
  assert.equal(getInvoiceSubscriptionId(failed.data.object), 'sub_1');
  const deleted = { id: 'evt_3', type: 'customer.subscription.deleted', data: { object: { id: 'sub_1', customer: 'cus_1', ...sub({ status: 'canceled' }) } } };
  assert.equal(ent(deleted.data.object).plan, 'free');
});

// =====================================================================
// compile-time evidence about the installed SDK (checked by `pnpm typecheck`, never run)
// =====================================================================
export function _sdkTypeEvidence(s: Stripe.Subscription, i: Stripe.Invoice, e: Stripe.CustomerSubscriptionUpdatedEvent, c: Stripe.Checkout.Session) {
  // @ts-expect-error API 2025-03-31.basil moved current_period_end off the Subscription (SDK 18.0.0 changelog).
  void s.current_period_end;
  const itemEnd: number = s.items.data[0].current_period_end; // ...onto each subscription item.
  // @ts-expect-error an Invoice no longer has a top-level `subscription`.
  void i.subscription;
  const viaParent: string | Stripe.Subscription | undefined = i.parent?.subscription_details?.subscription;
  const status: StripeSubscriptionStatusAlias = s.status;
  const eventObject: Stripe.Subscription = e.data.object;
  const sessionSub: string | Stripe.Subscription | null = c.subscription;
  // The real SDK types are accepted by the domain functions without casts.
  const result: Entitlement = entitlementFromSubscription(s, PRICES);
  getSubscriptionPeriodEnd(s);
  getInvoiceSubscriptionId(i);
  // The SDK only accepts its own pinned version, which is why the old '2024-11-20' pin needed `as any`.
  new Stripe('sk_test_not_used', { apiVersion: STRIPE_API_VERSION });
  // @ts-expect-error a different version is a type error against these SDK types.
  new Stripe('sk_test_not_used', { apiVersion: '2024-11-20' });
  return [itemEnd, viaParent, status, eventObject, sessionSub, result];
}
type StripeSubscriptionStatusAlias = Stripe.Subscription.Status;

console.log(`\n${passed} passed`);
