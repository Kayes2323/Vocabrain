/**
 * Secure checkout (pure): every rule of lib/billing/checkout.ts with fake dependencies.
 * No Firebase, no Stripe network. Run: pnpm test:checkout
 */
import assert from 'node:assert/strict';
import {
  BLOCKING_SUBSCRIPTION_STATUSES,
  CHECKOUT_COOLDOWN_MS,
  CheckoutAuthError,
  appOrigin,
  handleCheckout,
  type BillingStore,
  type CheckoutDeps,
  type CheckoutResult,
  type CustomerLookup,
  type StripeCheckoutClient,
  type VerifiedUser,
} from '../lib/billing/checkout.ts';
import { evaluateCheckoutGate, isCheckoutEnabled, stripeKeyMode } from '../lib/billing/checkout-gate.ts';
import { mapAuthError } from '../lib/server/checkout-auth.ts';
import { AdminConfigError } from '../lib/server/firebase-admin.ts';

let passed = 0;
async function test(name: string, fn: () => void | Promise<void>) {
  try {
    await fn();
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
const TEST_KEY = 'sk_test_SECRETKEYSHOULDNEVERLEAK123';
const TOKEN = 'verified-token-SECRET-abc';
const ALICE: VerifiedUser = { uid: 'uid-alice', email: 'alice@example.com' };
const GOOD_ENV = {
  STRIPE_CHECKOUT_ENABLED: 'true',
  STRIPE_SECRET_KEY: TEST_KEY,
  STRIPE_PRICE_ID_MONTHLY: MONTHLY,
  STRIPE_PRICE_ID_YEARLY: YEARLY,
  NEXT_PUBLIC_APP_URL: 'https://app.example.com',
};

interface Harness {
  deps: CheckoutDeps;
  calls: string[];
  logs: string[];
  stripeCalls: { createCustomer: unknown[]; createSession: { input: Parameters<StripeCheckoutClient['createCheckoutSession']>[0]; key: string }[] };
  store: { customers: Map<string, string>; lastClaim: Map<string, number>; writes: string[] };
  set: { customerLookup?: CustomerLookup; statuses?: string[]; sessionUrl?: string | null; now?: number };
}

function harness(over: { env?: Record<string, string | undefined>; verify?: (t: string) => Promise<VerifiedUser>; stripe?: Partial<StripeCheckoutClient>; storeOver?: Partial<BillingStore> } = {}): Harness {
  const calls: string[] = [];
  const logs: string[] = [];
  const set: Harness['set'] = { now: 1_000_000 };
  const stripeCalls: Harness['stripeCalls'] = { createCustomer: [], createSession: [] };
  const store = { customers: new Map<string, string>(), lastClaim: new Map<string, number>(), writes: [] as string[] };
  let nextCustomer = 1;

  const fakeStore: BillingStore = {
    async claimCheckout(uid, nowMs, cooldownMs) {
      calls.push('store.claim');
      const last = store.lastClaim.get(uid);
      if (last !== undefined && nowMs - last < cooldownMs) return { ok: false, retryAfterMs: cooldownMs - (nowMs - last) };
      store.lastClaim.set(uid, nowMs);
      store.writes.push(`billing/${uid}`);
      return { ok: true, customerId: store.customers.get(uid) ?? null };
    },
    async saveCustomer(uid, customerId, expectedCurrent) {
      calls.push('store.saveCustomer');
      const current = store.customers.get(uid) ?? null;
      if (current !== expectedCurrent && current !== null) return current;
      store.customers.set(uid, customerId);
      store.writes.push(`billing/${uid}`, `stripeCustomers/${customerId}`);
      return customerId;
    },
  };
  const fakeStripe: StripeCheckoutClient = {
    async retrieveCustomer() {
      calls.push('stripe.retrieveCustomer');
      return set.customerLookup ?? { state: 'active', firebaseUid: 'uid-alice' };
    },
    async createCustomer(input) {
      calls.push('stripe.createCustomer');
      stripeCalls.createCustomer.push(input);
      return `cus_new${nextCustomer++}`;
    },
    async listSubscriptionStatuses() {
      calls.push('stripe.listSubscriptions');
      return set.statuses ?? [];
    },
    async createCheckoutSession(input, key) {
      calls.push('stripe.createSession');
      stripeCalls.createSession.push({ input, key });
      return { url: set.sessionUrl === undefined ? 'https://checkout.stripe.com/c/pay/cs_test_abc' : set.sessionUrl };
    },
  };
  const deps: CheckoutDeps = {
    env: over.env ?? GOOD_ENV,
    now: () => set.now ?? 0,
    verifyIdToken: over.verify ?? (async (t) => {
      calls.push('verify');
      if (t !== TOKEN) throw new CheckoutAuthError('invalid');
      return ALICE;
    }),
    store: { ...fakeStore, ...over.storeOver },
    stripe: { ...fakeStripe, ...over.stripe },
    log: (event, fields) => logs.push(JSON.stringify({ event, ...fields })),
  };
  return { deps, calls, logs, stripeCalls, store, set };
}

const call = (h: Harness, body: unknown = { plan: 'monthly' }, authorization: string | null = `Bearer ${TOKEN}`) =>
  handleCheckout({ authorization, readBody: async () => (typeof body === 'string' ? body : JSON.stringify(body)) }, h.deps);

const code = (r: CheckoutResult) => ('code' in r.body ? r.body.code : undefined);
const noSideEffects = (h: Harness) => assert.deepEqual(h.calls.filter((c) => c.startsWith('store') || c.startsWith('stripe')), [], 'no store or Stripe call may happen');

// =====================================================================
// kill switch and live guard
// =====================================================================
await test('gate: disabled by default (no flag) -> 503, nothing else runs (no token check, no body read, no store, no Stripe)', async () => {
  let bodyRead = false;
  const h = harness({ env: { ...GOOD_ENV, STRIPE_CHECKOUT_ENABLED: undefined } });
  const r = await handleCheckout({ authorization: `Bearer ${TOKEN}`, readBody: async () => ((bodyRead = true), '{}') }, h.deps);
  assert.equal(r.status, 503);
  assert.equal(code(r), 'checkout_disabled');
  assert.equal(bodyRead, false);
  assert.deepEqual(h.calls, []);
});

for (const v of ['', 'false', '1', 'TRUE', 'True', 'yes', ' true', 'true ']) {
  await test(`gate: STRIPE_CHECKOUT_ENABLED="${v}" does not enable checkout`, async () => {
    const h = harness({ env: { ...GOOD_ENV, STRIPE_CHECKOUT_ENABLED: v } });
    assert.equal(code(await call(h)), 'checkout_disabled');
    assert.deepEqual(h.calls, []);
  });
}

await test('live guard: a live key without STRIPE_ALLOW_LIVE="true" is refused (default off)', async () => {
  for (const key of ['sk_live_ABCDEF123456', 'rk_live_ABCDEF123456']) {
    for (const allow of [undefined, '', 'false', '1', 'TRUE', ' true']) {
      const h = harness({ env: { ...GOOD_ENV, STRIPE_SECRET_KEY: key, STRIPE_ALLOW_LIVE: allow } });
      const r = await call(h);
      assert.equal(r.status, 503);
      assert.equal(code(r), 'live_payments_disabled', `${key} allow=${allow}`);
      assert.deepEqual(h.calls, []);
    }
  }
});

await test('live guard: a live key with STRIPE_ALLOW_LIVE="true" passes the gate; a test key never needs it', async () => {
  const live = harness({ env: { ...GOOD_ENV, STRIPE_SECRET_KEY: 'sk_live_ABCDEF123456', STRIPE_ALLOW_LIVE: 'true' } });
  assert.equal((await call(live)).status, 200);
  const test_ = harness({ env: { ...GOOD_ENV, STRIPE_ALLOW_LIVE: 'false' } });
  assert.equal((await call(test_)).status, 200);
});

await test('gate: a missing or non-Stripe key is billing_unavailable (never proceeds)', async () => {
  for (const key of [undefined, '', '   ', 'whsec_notasecretkey', 'pk_test_publishable', 'sk_prod_x', 'sk_test', 'SK_TEST_x']) {
    const h = harness({ env: { ...GOOD_ENV, STRIPE_SECRET_KEY: key } });
    assert.equal(code(await call(h)), 'billing_unavailable', String(key));
    assert.deepEqual(h.calls, []);
  }
});

await test('gate helpers: key modes by prefix only, and the gate result carries no key', () => {
  assert.deepEqual(['sk_test_a', 'rk_test_a', 'sk_live_a', 'rk_live_a', 'x', undefined].map((k) => stripeKeyMode(k)), ['test', 'test', 'live', 'live', 'unknown', 'unknown']);
  assert.equal(isCheckoutEnabled({ STRIPE_CHECKOUT_ENABLED: 'true' }), true);
  assert.equal(isCheckoutEnabled({}), false);
  assert.ok(!JSON.stringify(evaluateCheckoutGate(GOOD_ENV)).includes(TEST_KEY));
});

// =====================================================================
// authentication
// =====================================================================
await test('auth: missing / malformed Authorization header -> 401 and nothing else runs', async () => {
  for (const header of [null, '', 'Bearer', 'Bearer ', 'Basic abc', TOKEN, `Token ${TOKEN}`, `Bearer ${TOKEN} extra`]) {
    const h = harness();
    const r = await call(h, undefined, header);
    assert.equal(r.status, 401, String(header));
    assert.equal(code(r), 'unauthenticated');
    noSideEffects(h);
  }
});

await test('auth: an invalid token -> 401 unauthenticated, no store or Stripe call', async () => {
  const h = harness();
  const r = await call(h, undefined, 'Bearer some-other-token');
  assert.deepEqual([r.status, code(r)], [401, 'unauthenticated']);
  noSideEffects(h);
});

await test('auth: an expired token -> 401 token_expired', async () => {
  const h = harness({ verify: async () => { throw new CheckoutAuthError('expired'); } });
  const r = await call(h);
  assert.deepEqual([r.status, code(r)], [401, 'token_expired']);
  noSideEffects(h);
});

await test('auth: Admin not configured or unreachable is a server problem (503), not a 401', async () => {
  for (const kind of ['config', 'unavailable'] as const) {
    const h = harness({ verify: async () => { throw new CheckoutAuthError(kind); } });
    const r = await call(h);
    assert.deepEqual([r.status, code(r)], [503, 'billing_unavailable'], kind);
    noSideEffects(h);
  }
});

await test('auth: an unexpected verifier crash is a safe 500', async () => {
  const h = harness({ verify: async () => { throw new Error(`boom ${TOKEN} ${TEST_KEY}`); } });
  const r = await call(h);
  assert.deepEqual([r.status, code(r)], [500, 'internal_error']);
  assert.ok(!JSON.stringify(r).includes(TOKEN) && !JSON.stringify(r).includes(TEST_KEY));
  assert.ok(!h.logs.join('\n').includes(TOKEN) && !h.logs.join('\n').includes(TEST_KEY), 'not logged either');
});

await test('auth: a verifier that returns no uid is rejected', async () => {
  for (const user of [{ uid: '' }, {}, null, undefined, { uid: 5 }]) {
    const h = harness({ verify: async () => user as unknown as VerifiedUser });
    assert.equal(code(await call(h)), 'unauthenticated', JSON.stringify(user));
    noSideEffects(h);
  }
});

await test('auth: mapAuthError turns Admin SDK errors into the right kind (and never keeps the message)', () => {
  const kind = (e: unknown) => mapAuthError(e).kind;
  assert.equal(kind(new AdminConfigError('missing_credentials')), 'config');
  assert.equal(kind({ code: 'auth/id-token-expired', message: 'secret' }), 'expired');
  for (const c of ['auth/id-token-revoked', 'auth/argument-error', 'auth/invalid-id-token', 'auth/user-disabled', 'auth/user-not-found', 'auth/invalid-user-token']) assert.equal(kind({ code: c }), 'invalid', c);
  for (const c of ['auth/internal-error', 'auth/network-request-failed', 'auth/service-unavailable', 'app/network-error', 'ECONNRESET', '']) assert.equal(kind({ code: c }), 'unavailable', c);
  assert.equal(kind(new Error('plain')), 'unavailable');
  assert.equal(kind(null), 'unavailable');
  assert.ok(!mapAuthError({ code: 'auth/argument-error', message: 'TOP-SECRET' }).message.includes('TOP-SECRET'));
});

// =====================================================================
// spoofing and request shape
// =====================================================================
await test('spoofing: userId / email / uid in the body is rejected with 400, never used', async () => {
  for (const extra of [{ userId: 'uid-bob' }, { email: 'bob@example.com' }, { uid: 'uid-bob' }, { userId: 'uid-bob', email: 'bob@example.com' }, { user: { uid: 'uid-bob' } }, { firebaseUid: 'uid-bob' }]) {
    const h = harness();
    const r = await call(h, { plan: 'monthly', ...extra });
    assert.deepEqual([r.status, code(r)], [400, 'invalid_request'], JSON.stringify(extra));
    noSideEffects(h);
  }
});

await test('spoofing: the claimed uid is the verified token uid, even if the browser names someone else', async () => {
  const h = harness();
  // A body naming Bob is refused outright; with a clean body the session is created for the token's user only.
  assert.equal((await call(h, { plan: 'monthly', userId: 'uid-bob' })).status, 400);
  const ok = await call(h, { plan: 'monthly' });
  assert.equal(ok.status, 200);
  const { input } = h.stripeCalls.createSession[0];
  assert.equal(input.uid, 'uid-alice');
  assert.deepEqual(h.stripeCalls.createCustomer, [{ uid: 'uid-alice', email: 'alice@example.com' }], 'customer carries the token uid and token email');
  assert.ok(!JSON.stringify([...h.store.writes]).includes('bob'));
});

await test('spoofing: a Price ID from the browser is rejected (as an extra field or as the plan)', async () => {
  for (const body of [{ plan: 'monthly', priceId: YEARLY }, { plan: 'monthly', price: 'price_evil' }, { priceId: YEARLY }]) {
    const h = harness();
    assert.equal(code(await call(h, body)), 'invalid_request', JSON.stringify(body));
    noSideEffects(h);
  }
  for (const plan of [MONTHLY, YEARLY, 'price_evil12345678']) {
    const h = harness();
    assert.equal(code(await call(h, { plan })), 'invalid_plan', plan);
    noSideEffects(h);
  }
});

await test('request shape: malformed bodies are 400 invalid_request', async () => {
  const bad: string[] = ['', '   ', 'not json', '{', '[]', 'null', '"monthly"', '123', 'true', '{}', '[{"plan":"monthly"}]', '{"plan":"monthly","plan":"yearly","x":1}', `{"plan":"monthly","pad":"${'a'.repeat(2000)}"}`];
  for (const body of bad) {
    const h = harness();
    const r = await call(h, body);
    assert.deepEqual([r.status, code(r)], [400, 'invalid_request'], body.slice(0, 40));
    noSideEffects(h);
  }
});

await test('request shape: invalid plan values are 400 invalid_plan', async () => {
  for (const plan of ['weekly', '', 'MONTHLY', 'Yearly', ' monthly', 'monthly ', 'premium', 'free', null, 0, 1, true, {}, [], ['monthly'], '__proto__', 'constructor']) {
    const h = harness();
    const r = await call(h, { plan });
    assert.deepEqual([r.status, code(r)], [400, 'invalid_plan'], JSON.stringify(plan));
    noSideEffects(h);
  }
});

// =====================================================================
// configuration
// =====================================================================
await test('config: missing, blank, malformed or duplicate Price IDs -> 503 billing_unavailable, no store or Stripe call', async () => {
  const cases: Record<string, string | undefined>[] = [
    { STRIPE_PRICE_ID_MONTHLY: undefined },
    { STRIPE_PRICE_ID_YEARLY: '' },
    { STRIPE_PRICE_ID_MONTHLY: 'prod_123456789' },
    { STRIPE_PRICE_ID_YEARLY: 'price_' },
    { STRIPE_PRICE_ID_YEARLY: MONTHLY },
    { STRIPE_PRICE_ID_MONTHLY: undefined, STRIPE_PRICE_ID_YEARLY: undefined },
  ];
  for (const c of cases) {
    const h = harness({ env: { ...GOOD_ENV, ...c } });
    const r = await call(h);
    assert.deepEqual([r.status, code(r)], [503, 'billing_unavailable'], JSON.stringify(c));
    noSideEffects(h);
    assert.ok(h.logs.some((l) => l.includes('price_config')), 'logged as a configuration problem');
    assert.ok(!h.logs.join('').includes(MONTHLY), 'Price IDs are not logged');
  }
});

await test('ordering: a bad plan is the caller\'s error (400) even while the server Price config is broken', async () => {
  const h = harness({ env: { ...GOOD_ENV, STRIPE_PRICE_ID_MONTHLY: undefined } });
  const r = await call(h, { plan: 'weekly' });
  assert.deepEqual([r.status, code(r)], [400, 'invalid_plan']);
  noSideEffects(h);
});

await test('config: appOrigin accepts https (and localhost over http off Vercel); anything else is refused', async () => {
  assert.equal(appOrigin({ NEXT_PUBLIC_APP_URL: 'https://app.example.com/some/path?x=1' }), 'https://app.example.com');
  assert.equal(appOrigin({ NEXT_PUBLIC_APP_URL: 'http://localhost:3000' }), 'http://localhost:3000');
  for (const v of [undefined, '', 'app.example.com', 'http://app.example.com', 'javascript:alert(1)', 'ftp://x.com', 'https://', 'not a url']) assert.equal(appOrigin({ NEXT_PUBLIC_APP_URL: v }), null, String(v));
  assert.equal(appOrigin({ NEXT_PUBLIC_APP_URL: 'http://localhost:3000', VERCEL: '1' }), null, 'no plain http on Vercel');
  const h = harness({ env: { ...GOOD_ENV, NEXT_PUBLIC_APP_URL: 'http://evil.example.com' } });
  assert.equal(code(await call(h)), 'billing_unavailable');
  noSideEffects(h);
});

await test('config: success and cancel URLs come from the server, with no session_id and no way to carry a granted state', async () => {
  const h = harness({ env: { ...GOOD_ENV, NEXT_PUBLIC_APP_URL: 'https://app.example.com/ignored/path' } });
  await call(h);
  const { input } = h.stripeCalls.createSession[0];
  assert.equal(input.successUrl, 'https://app.example.com/profile?checkout=success');
  assert.equal(input.cancelUrl, 'https://app.example.com/profile?checkout=cancelled');
  assert.ok(!/session_id|premium|plan=/.test(input.successUrl));
});

// =====================================================================
// the session itself
// =====================================================================
await test('success: monthly and yearly resolve to the server Price ID and the session is bound to the verified uid', async () => {
  for (const [plan, priceId] of [['monthly', MONTHLY], ['yearly', YEARLY]] as const) {
    const h = harness();
    const r = await call(h, { plan });
    assert.equal(r.status, 200);
    assert.deepEqual(r.body, { url: 'https://checkout.stripe.com/c/pay/cs_test_abc' });
    const { input, key } = h.stripeCalls.createSession[0];
    assert.deepEqual([input.priceId, input.interval, input.uid, input.customerId], [priceId, plan, 'uid-alice', 'cus_new1']);
    assert.match(key, /^mino-checkout-uid-alice-\d+$/);
  }
});

await test('customer: a new student gets a customer tagged with the Firebase uid, saved by uid; email is only a prefill', async () => {
  const h = harness();
  await call(h);
  assert.deepEqual(h.calls, ['verify', 'store.claim', 'stripe.createCustomer', 'store.saveCustomer', 'stripe.createSession'], 'no subscription lookup for a brand-new customer');
  assert.equal(h.store.customers.get('uid-alice'), 'cus_new1');
});

await test('customer: there is no email-based lookup anywhere (the Stripe client has no such method)', async () => {
  const h = harness();
  await call(h);
  assert.ok(!Object.keys(h.deps.stripe).some((k) => /list(Customers|ByEmail)|search|findByEmail/i.test(k)));
  assert.ok(!h.calls.some((c) => /email|search/i.test(c)));
});

await test('customer: a token without an email still works (no email sent to Stripe)', async () => {
  const h = harness({ verify: async () => ({ uid: 'uid-alice' }) });
  assert.equal((await call(h)).status, 200);
  assert.deepEqual(h.stripeCalls.createCustomer, [{ uid: 'uid-alice', email: undefined }]);
});

await test('customer: an existing mapped customer is verified (uid tag) and reused, not recreated', async () => {
  const h = harness();
  h.store.customers.set('uid-alice', 'cus_existing');
  const r = await call(h);
  assert.equal(r.status, 200);
  assert.ok(!h.calls.includes('stripe.createCustomer'));
  assert.equal(h.stripeCalls.createSession[0].input.customerId, 'cus_existing');
});

await test('customer: a stored customer tagged with ANOTHER uid (or untagged) is never used -> safe 500, no session', async () => {
  for (const firebaseUid of ['uid-bob', null]) {
    const h = harness();
    h.store.customers.set('uid-alice', 'cus_other');
    h.set.customerLookup = { state: 'active', firebaseUid };
    const r = await call(h);
    assert.deepEqual([r.status, code(r)], [500, 'internal_error'], String(firebaseUid));
    assert.ok(!h.calls.includes('stripe.createSession') && !h.calls.includes('stripe.listSubscriptions'));
    assert.ok(h.logs.some((l) => l.includes('checkout_customer_mismatch')));
  }
});

await test('customer: a customer deleted in Stripe is replaced by a new one (mapping updated, old id passed as expected)', async () => {
  const h = harness();
  h.store.customers.set('uid-alice', 'cus_deleted');
  h.set.customerLookup = { state: 'gone' };
  const r = await call(h);
  assert.equal(r.status, 200);
  assert.equal(h.store.customers.get('uid-alice'), 'cus_new1');
  assert.equal(h.stripeCalls.createSession[0].input.customerId, 'cus_new1');
});

await test('customer: if a concurrent request mapped a customer first, ours is dropped and the winner is used (and checked for duplicates)', async () => {
  const h = harness({
    storeOver: {
      async saveCustomer() {
        h.calls.push('store.saveCustomer');
        return 'cus_winner';
      },
    },
  });
  h.set.statuses = ['active'];
  const r = await call(h);
  assert.deepEqual([r.status, code(r)], [409, 'already_subscribed'], 'the winner is an existing customer, so subscriptions are checked');
  assert.ok(h.logs.some((l) => l.includes('race_lost')));
  assert.ok(!h.calls.includes('stripe.createSession'));
});

// ---------- duplicate subscriptions ----------
await test('duplicate: active, trialing or past_due blocks checkout (409) and creates no session', async () => {
  for (const status of BLOCKING_SUBSCRIPTION_STATUSES) {
    const h = harness();
    h.store.customers.set('uid-alice', 'cus_existing');
    h.set.statuses = ['canceled', status];
    const r = await call(h);
    assert.deepEqual([r.status, code(r)], [409, 'already_subscribed'], status);
    assert.ok(!h.calls.includes('stripe.createSession'));
  }
});

await test('duplicate: canceled, unpaid, incomplete, incomplete_expired, paused or none do NOT block a new checkout', async () => {
  for (const statuses of [[], ['canceled'], ['unpaid'], ['incomplete'], ['incomplete_expired'], ['paused'], ['canceled', 'incomplete_expired', 'unpaid']]) {
    const h = harness();
    h.store.customers.set('uid-alice', 'cus_existing');
    h.set.statuses = statuses;
    assert.equal((await call(h)).status, 200, statuses.join(','));
  }
});

await test('duplicate: the blocking statuses are exactly the ones that grant Premium access', () => {
  assert.deepEqual([...BLOCKING_SUBSCRIPTION_STATUSES], ['active', 'trialing', 'past_due']);
});

// ---------- cooldown ----------
await test('cooldown: a second request inside the window is 429 with Retry-After, and creates nothing', async () => {
  const h = harness();
  assert.equal((await call(h)).status, 200);
  h.set.now! += 3_000;
  const sessions = h.stripeCalls.createSession.length;
  const r = await call(h);
  assert.deepEqual([r.status, code(r)], [429, 'too_many_requests']);
  assert.equal(r.headers['Retry-After'], String(Math.ceil((CHECKOUT_COOLDOWN_MS - 3_000) / 1000)));
  assert.equal(h.stripeCalls.createSession.length, sessions);
});

await test('cooldown: allowed again after the window; and each student has their own window', async () => {
  const h = harness();
  assert.equal((await call(h)).status, 200);
  h.set.now! += CHECKOUT_COOLDOWN_MS;
  assert.equal((await call(h)).status, 200);
  const bob = harness({ verify: async () => ({ uid: 'uid-bob' }) });
  bob.store.lastClaim.set('uid-alice', bob.set.now!); // Alice just started one
  assert.equal((await call(bob)).status, 200, "Alice's cooldown does not block Bob");
});

await test('cooldown: invalid requests do not use up the cooldown', async () => {
  const h = harness();
  for (let i = 0; i < 3; i++) assert.equal((await call(h, { plan: 'weekly' })).status, 400);
  assert.equal((await call(h)).status, 200);
});

await test('cooldown: the check runs BEFORE any Stripe call', async () => {
  const h = harness();
  h.store.lastClaim.set('uid-alice', h.set.now!);
  await call(h);
  assert.ok(!h.calls.some((c) => c.startsWith('stripe')));
});

// ---------- Stripe errors and safe responses ----------
const stripeError = (type: string, extra: Record<string, unknown> = {}) => Object.assign(new Error(`RAW STRIPE MESSAGE ${TEST_KEY} alice@example.com cus_secret`), { type, requestId: 'req_123', statusCode: 500, ...extra });

await test('stripe errors: each failure maps to a safe code and never leaks the Stripe message, key or email', async () => {
  const cases: [string, number, string, Record<string, unknown>?][] = [
    ['StripeConnectionError', 503, 'payment_provider_unavailable'],
    ['StripeRateLimitError', 503, 'payment_provider_unavailable'],
    ['StripeAPIError', 502, 'payment_provider_error'],
    ['StripeInvalidRequestError', 502, 'payment_provider_error', { code: 'resource_missing' }],
    ['StripeCardError', 502, 'payment_provider_error'],
    ['StripeIdempotencyError', 502, 'payment_provider_error'],
    ['StripeAuthenticationError', 503, 'billing_unavailable'],
    ['StripePermissionError', 503, 'billing_unavailable'],
  ];
  for (const [type, status, expected, extra] of cases) {
    const h = harness({ stripe: { async createCheckoutSession() { throw stripeError(type, extra); } } });
    const r = await call(h);
    assert.deepEqual([r.status, code(r)], [status, expected], type);
    const shown = JSON.stringify(r) + h.logs.join('\n');
    for (const secret of [TEST_KEY, 'alice@example.com', 'cus_secret', 'RAW STRIPE MESSAGE', TOKEN]) assert.ok(!shown.includes(secret), `${type} leaked ${secret}`);
    assert.ok(h.logs.some((l) => l.includes('req_123')), 'the Stripe request id is logged for support');
    if (expected === 'payment_provider_unavailable') assert.equal(r.headers['Retry-After'], '5');
  }
});

await test('stripe errors: a failure at any Stripe step is handled (retrieve, create customer, list, session)', async () => {
  for (const step of ['retrieveCustomer', 'createCustomer', 'listSubscriptionStatuses', 'createCheckoutSession'] as const) {
    const h = harness({ stripe: { [step]: async () => { throw stripeError('StripeConnectionError'); } } });
    h.store.customers.set('uid-alice', 'cus_existing');
    if (step === 'createCustomer') h.store.customers.delete('uid-alice');
    const r = await call(h);
    assert.deepEqual([r.status, code(r)], [503, 'payment_provider_unavailable'], step);
  }
});

await test('stripe errors: a non-Stripe crash is a generic 500 that carries no detail', async () => {
  const h = harness({ stripe: { async createCheckoutSession() { throw new Error(`db password=hunter2 ${TEST_KEY}`); } } });
  const r = await call(h);
  assert.deepEqual([r.status, code(r)], [500, 'internal_error']);
  assert.ok(!JSON.stringify(r).includes('hunter2') && !h.logs.join('').includes('hunter2'));
});

await test('stripe errors: a session without a Stripe checkout URL is refused (no open redirect)', async () => {
  for (const url of [null, '', 'http://checkout.stripe.com/x', 'https://evil.example.com/pay', 'https://checkout.stripe.com.evil.com/x', 'javascript:alert(1)']) {
    const h = harness();
    h.set.sessionUrl = url;
    const r = await call(h);
    assert.deepEqual([r.status, code(r)], [502, 'payment_provider_error'], String(url));
  }
});

await test('store errors: a Firestore failure is a safe 500 and no session is created', async () => {
  for (const method of ['claimCheckout', 'saveCustomer'] as const) {
    const h = harness({ storeOver: { [method]: async () => { throw new Error('PERMISSION_DENIED: secret path billing/uid-alice'); } } });
    const r = await call(h);
    assert.deepEqual([r.status, code(r)], [500, 'internal_error'], method);
    assert.ok(!h.calls.includes('stripe.createSession'));
    assert.ok(!JSON.stringify(r).includes('billing/'));
  }
});

// ---------- no entitlement is ever written ----------
await test('NO ENTITLEMENT: checkout never touches subscriptions/* or any Premium field; only billing/* and stripeCustomers/*', async () => {
  const h = harness();
  const r = await call(h);
  assert.equal(r.status, 200);
  assert.ok(h.store.writes.length > 0);
  for (const w of h.store.writes) assert.match(w, /^(billing|stripeCustomers)\//, w);
  assert.ok(!h.store.writes.some((w) => w.startsWith('subscriptions/')));
  assert.ok(!JSON.stringify(r.body).match(/premium|plan|entitlement|granted/i), 'the response only carries a Stripe URL');
  // The deps interface has no way to write a subscription at all.
  assert.deepEqual(Object.keys(h.deps.store).sort(), ['claimCheckout', 'saveCustomer']);
});

await test('NO ENTITLEMENT: a success response, a redirect URL or any client value cannot grant Premium', async () => {
  const h = harness();
  const r = await call(h, { plan: 'yearly' });
  assert.deepEqual(Object.keys(r.body), ['url']);
  assert.ok(!h.calls.some((c) => /entitle|premium|subscriptions\//i.test(c)));
});

await test('logs: success and failure logs contain only codes, never tokens, keys, emails, uids or price ids', async () => {
  const ok = harness();
  await call(ok);
  const bad = harness({ stripe: { async createCheckoutSession() { throw stripeError('StripeAPIError'); } } });
  await call(bad);
  const all = [...ok.logs, ...bad.logs].join('\n');
  for (const secret of [TOKEN, TEST_KEY, 'alice@example.com', 'uid-alice', MONTHLY, YEARLY, 'cus_']) assert.ok(!all.includes(secret), `log contains ${secret}`);
});

console.log(`\n${passed} passed`);
