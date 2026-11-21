/**
 * Checkout against the Firebase emulators: the REAL Admin token verification and the REAL Firestore
 * billing store, with a fake Stripe. Proves token handling, the transactional cooldown, customer
 * mapping, and that checkout writes no entitlement (nothing under subscriptions/).
 * Run: pnpm test:checkout-api   (starts the Auth + Firestore emulators itself)
 */
import assert from 'node:assert/strict';
import { handleCheckout, type CheckoutDeps, type CheckoutResult, type StripeCheckoutClient } from '../lib/billing/checkout.ts';
import { verifyFirebaseIdToken } from '../lib/server/checkout-auth.ts';
import { createBillingStore } from '../lib/server/billing-store.ts';
import { getAdminAuth, getAdminDb, resetAdminForTests } from '../lib/server/firebase-admin.ts';

process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||= 'demo-vocabbrain';
const PROJECT = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const FIRESTORE = process.env.FIRESTORE_EMULATOR_HOST;
const AUTH = process.env.FIREBASE_AUTH_EMULATOR_HOST;
if (!FIRESTORE || !AUTH) {
  console.error('Run through `pnpm test:checkout-api` so the emulators are running.');
  process.exit(1);
}

let passed = 0;
async function test(name: string, fn: () => Promise<void>) {
  try {
    await fn();
    passed++;
    console.log(`PASS ${name}`);
  } catch (error) {
    console.log(`FAIL ${name}\n  ${(error as Error).message}`);
    process.exitCode = 1;
  }
}

const MONTHLY = 'price_1MonthlyTestAAAA1111';
const YEARLY = 'price_1YearlyTestBBBB2222';
const ENV = { STRIPE_CHECKOUT_ENABLED: 'true', STRIPE_SECRET_KEY: 'sk_test_NOTREALKEY123456', STRIPE_PRICE_ID_MONTHLY: MONTHLY, STRIPE_PRICE_ID_YEARLY: YEARLY, NEXT_PUBLIC_APP_URL: 'https://app.example.com' };

const db = () => getAdminDb();
const signUp = async (label: string) => {
  const res = await fetch(`http://${AUTH}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake-key`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: `${label}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}@example.com`, password: 'a-test-password-123', returnSecureToken: true }),
  });
  assert.ok(res.ok, `emulator sign-up failed: ${res.status}`);
  return (await res.json()) as { idToken: string; localId: string; email: string };
};

interface FakeStripe extends StripeCheckoutClient {
  log: { createCustomer: { uid: string; email?: string }[]; sessions: { uid: string; customerId: string; priceId: string }[]; lookups: number };
  statuses: string[];
  tag: (customerId: string) => string | null;
}
function fakeStripe(): FakeStripe {
  let n = 0;
  const owners = new Map<string, string>();
  const f: FakeStripe = {
    log: { createCustomer: [], sessions: [], lookups: 0 },
    statuses: [],
    tag: (id) => owners.get(id) ?? null,
    async retrieveCustomer(id) {
      f.log.lookups++;
      return { state: 'active', firebaseUid: owners.get(id) ?? null };
    },
    async createCustomer(input) {
      f.log.createCustomer.push(input);
      const id = `cus_emu${++n}${Math.random().toString(36).slice(2, 7)}`;
      owners.set(id, input.uid);
      return id;
    },
    async listSubscriptionStatuses() {
      return f.statuses;
    },
    async createCheckoutSession(input) {
      f.log.sessions.push({ uid: input.uid, customerId: input.customerId, priceId: input.priceId });
      return { url: 'https://checkout.stripe.com/c/pay/cs_test_emulator' };
    },
  };
  return f;
}

let clockOffset = 0;
const makeDeps = (stripe: StripeCheckoutClient, verify = verifyFirebaseIdToken): CheckoutDeps => ({
  env: ENV,
  now: () => Date.now() + clockOffset,
  verifyIdToken: verify,
  store: createBillingStore(),
  stripe,
  log: () => undefined,
});
const call = (deps: CheckoutDeps, token: string | null, body: unknown = { plan: 'monthly' }): Promise<CheckoutResult> =>
  handleCheckout({ authorization: token === null ? null : `Bearer ${token}`, readBody: async () => JSON.stringify(body) }, deps);
const code = (r: CheckoutResult) => ('code' in r.body ? r.body.code : undefined);
const doc = async (path: string) => (await db().doc(path).get());
const unsignedToken = (claims: Record<string, unknown>) => {
  const part = (o: unknown) => Buffer.from(JSON.stringify(o)).toString('base64url');
  return `${part({ alg: 'none', typ: 'JWT' })}.${part(claims)}.`;
};

// ---------- token handling with the real Admin SDK ----------
await test('missing Authorization -> 401; garbage token -> 401; nothing is written', async () => {
  const stripe = fakeStripe();
  const deps = makeDeps(stripe);
  assert.deepEqual([(await call(deps, null)).status, code(await call(deps, null))], [401, 'unauthenticated']);
  for (const bad of ['garbage', 'a.b.c', 'x'.repeat(50)]) {
    const r = await call(deps, bad);
    assert.deepEqual([r.status, code(r)], [401, 'unauthenticated'], bad);
  }
  assert.deepEqual(stripe.log, { createCustomer: [], sessions: [], lookups: 0 });
});

await test('an expired token -> 401 token_expired (real Admin error code)', async () => {
  const now = Math.floor(Date.now() / 1000);
  const token = unsignedToken({ iss: `https://securetoken.google.com/${PROJECT}`, aud: PROJECT, sub: 'someone', iat: now - 7200, auth_time: now - 7200, exp: now - 3600, firebase: { identities: {}, sign_in_provider: 'password' } });
  const r = await call(makeDeps(fakeStripe()), token);
  assert.deepEqual([r.status, code(r)], [401, 'token_expired']);
});

await test('a token for the wrong Firebase project is rejected -> 401', async () => {
  const now = Math.floor(Date.now() / 1000);
  const token = unsignedToken({ iss: 'https://securetoken.google.com/other-project', aud: 'other-project', sub: 'x', iat: now, auth_time: now, exp: now + 3600, firebase: { identities: {}, sign_in_provider: 'password' } });
  const r = await call(makeDeps(fakeStripe()), token);
  assert.equal(r.status, 401);
});

await test('a revoked token -> 401 (verification checks revocation)', async () => {
  const a = await signUp('revoked');
  await new Promise((r) => setTimeout(r, 1100)); // revocation is second-granular
  await getAdminAuth().revokeRefreshTokens(a.localId);
  const r = await call(makeDeps(fakeStripe()), a.idToken);
  assert.deepEqual([r.status, code(r)], [401, 'unauthenticated']);
});

// ---------- happy path and spoofing ----------
await test('a forged userId/email next to a valid token is 400 and writes nothing', async () => {
  const alice = await signUp('alice');
  const bob = await signUp('bob');
  const stripe = fakeStripe();
  const r = await call(makeDeps(stripe), alice.idToken, { plan: 'monthly', userId: bob.localId, email: bob.email });
  assert.deepEqual([r.status, code(r)], [400, 'invalid_request']);
  assert.equal((await doc(`billing/${alice.localId}`)).exists, false);
  assert.equal((await doc(`billing/${bob.localId}`)).exists, false);
  assert.deepEqual(stripe.log.sessions, []);
});

await test('a valid token -> 200; the customer and session belong to the TOKEN uid; the mapping is stored by uid', async () => {
  const alice = await signUp('alice2');
  const stripe = fakeStripe();
  const r = await call(makeDeps(stripe), alice.idToken, { plan: 'yearly' });
  assert.equal(r.status, 200);
  assert.deepEqual(r.body, { url: 'https://checkout.stripe.com/c/pay/cs_test_emulator' });
  assert.deepEqual(stripe.log.createCustomer, [{ uid: alice.localId, email: alice.email }]);
  assert.equal(stripe.log.sessions[0].uid, alice.localId);
  assert.equal(stripe.log.sessions[0].priceId, YEARLY);

  const billing = (await doc(`billing/${alice.localId}`)).data()!;
  const customerId = stripe.log.sessions[0].customerId;
  assert.equal(billing.stripeCustomerId, customerId);
  assert.equal(typeof billing.lastCheckoutAtMs, 'number');
  assert.equal((await doc(`stripeCustomers/${customerId}`)).data()?.uid, alice.localId);
});

await test('NO ENTITLEMENT: checkout writes nothing under subscriptions/, and only billing + stripeCustomers exist', async () => {
  const carol = await signUp('carol');
  assert.equal((await call(makeDeps(fakeStripe()), carol.idToken)).status, 200);
  assert.equal((await doc(`subscriptions/${carol.localId}`)).exists, false);
  const subs = await db().collection('subscriptions').get();
  assert.equal(subs.size, 0, 'the subscriptions collection is empty');
  const names = (await db().listCollections()).map((c) => c.id).sort();
  assert.deepEqual(names, ['billing', 'stripeCustomers'], 'checkout only ever creates these two server-only collections');
  const billing = (await doc(`billing/${carol.localId}`)).data()!;
  assert.ok(!JSON.stringify(billing).match(/premium|plan|entitle/i));
});

// ---------- cooldown (real transaction) ----------
await test('cooldown: two simultaneous requests -> exactly one session and one 429', async () => {
  const dan = await signUp('dan');
  const stripe = fakeStripe();
  const deps = makeDeps(stripe);
  const results = await Promise.all([call(deps, dan.idToken), call(deps, dan.idToken), call(deps, dan.idToken)]);
  const statuses = results.map((r) => r.status).sort();
  assert.deepEqual(statuses, [200, 429, 429]);
  assert.equal(stripe.log.sessions.length, 1);
  assert.equal(stripe.log.createCustomer.length, 1);
  const limited = results.find((r) => r.status === 429)!;
  assert.ok(Number(limited.headers['Retry-After']) >= 1);
});

await test('cooldown: a request whose clock is slightly EARLIER than the last claim is still limited; a far-future stored time never locks a student out', async () => {
  const store = createBillingStore();
  const uid = `skew-${Date.now()}`;
  const T = 5_000_000_000_000;
  assert.deepEqual(await store.claimCheckout(uid, T, 10_000), { ok: true, customerId: null });
  const behind = await store.claimCheckout(uid, T - 2_000, 10_000);
  assert.ok(!behind.ok && behind.retryAfterMs > 0 && behind.retryAfterMs <= 10_000, 'earlier clock is limited');
  assert.equal((await store.claimCheckout(uid, T + 3_000, 10_000)).ok, false, 'later clock inside the window is limited');
  assert.equal((await store.claimCheckout(uid, T + 10_000, 10_000)).ok, true, 'a full window later is allowed');
  // A stored time a whole window or more in the future (clock error) is ignored, not honoured.
  await db().doc(`billing/${uid}`).set({ lastCheckoutAtMs: T + 10_000_000 }, { merge: true });
  assert.equal((await store.claimCheckout(uid, T + 20_000, 10_000)).ok, true);
});

await test('cooldown: after the window the same student can start again and REUSES the same customer', async () => {
  const erin = await signUp('erin');
  const stripe = fakeStripe();
  assert.equal((await call(makeDeps(stripe), erin.idToken)).status, 200);
  const first = (await doc(`billing/${erin.localId}`)).data()!.stripeCustomerId;
  clockOffset = 11_000;
  try {
    assert.equal((await call(makeDeps(stripe), erin.idToken)).status, 200);
  } finally {
    clockOffset = 0;
  }
  assert.equal((await doc(`billing/${erin.localId}`)).data()!.stripeCustomerId, first);
  assert.equal(stripe.log.createCustomer.length, 1, 'no second customer');
  assert.deepEqual(stripe.log.sessions.map((s) => s.customerId), [first, first]);
});

await test('duplicate: a student with an active subscription gets 409 and no new session', async () => {
  const fay = await signUp('fay');
  const stripe = fakeStripe();
  assert.equal((await call(makeDeps(stripe), fay.idToken)).status, 200);
  clockOffset = 11_000;
  try {
    stripe.statuses = ['active'];
    const r = await call(makeDeps(stripe), fay.idToken);
    assert.deepEqual([r.status, code(r)], [409, 'already_subscribed']);
    assert.equal(stripe.log.sessions.length, 1);
    stripe.statuses = ['canceled'];
    assert.equal((await call(makeDeps(stripe), fay.idToken)).status, 429, 'the cooldown applies to the 409 attempt too');
    clockOffset = 22_000;
    assert.equal((await call(makeDeps(stripe), fay.idToken)).status, 200, 'a canceled subscription does not block');
  } finally {
    clockOffset = 0;
  }
});

// ---------- customer mapping integrity ----------
await test('a stored customer tagged with ANOTHER uid is never used (500) and no session is created', async () => {
  const gus = await signUp('gus');
  const stripe = fakeStripe();
  await db().doc(`billing/${gus.localId}`).set({ stripeCustomerId: 'cus_belongs_to_someone_else' });
  const r = await call(makeDeps(stripe), gus.idToken); // fake Stripe reports that customer has no uid tag
  assert.deepEqual([r.status, code(r)], [500, 'internal_error']);
  assert.deepEqual(stripe.log.sessions, []);
});

await test('saveCustomer race: concurrent writers agree on one customer; the loser leaves no mapping', async () => {
  const store = createBillingStore();
  const uid = `race-${Date.now()}`;
  const [a, b] = await Promise.all([store.saveCustomer(uid, 'cus_race_a', null), store.saveCustomer(uid, 'cus_race_b', null)]);
  assert.equal(a, b, 'both callers get the same winner');
  const winner = a;
  const loser = winner === 'cus_race_a' ? 'cus_race_b' : 'cus_race_a';
  assert.equal((await doc(`billing/${uid}`)).data()!.stripeCustomerId, winner);
  assert.equal((await doc(`stripeCustomers/${winner}`)).data()!.uid, uid);
  assert.equal((await doc(`stripeCustomers/${loser}`)).exists, false);
});

await test('saveCustomer refuses a customer id that is already mapped to a different uid', async () => {
  const store = createBillingStore();
  await db().doc('stripeCustomers/cus_taken').set({ uid: 'someone-else' });
  await assert.rejects(store.saveCustomer(`victim-${Date.now()}`, 'cus_taken', null));
  assert.equal((await doc('stripeCustomers/cus_taken')).data()!.uid, 'someone-else');
});

// ---------- clients cannot read or write any of it (Security Rules, real emulator) ----------
await test('a signed-in client cannot read billing/stripeCustomers, nor write them, nor grant itself Premium', async () => {
  const hank = await signUp('hank');
  assert.equal((await call(makeDeps(fakeStripe()), hank.idToken)).status, 200);
  const base = `http://${FIRESTORE}/v1/projects/${PROJECT}/databases/(default)/documents`;
  const headers = { Authorization: `Bearer ${hank.idToken}`, 'Content-Type': 'application/json' };
  const customerId = (await doc(`billing/${hank.localId}`)).data()!.stripeCustomerId as string;

  assert.equal((await fetch(`${base}/billing/${hank.localId}`, { headers })).status, 403, 'read own billing doc');
  assert.equal((await fetch(`${base}/stripeCustomers/${customerId}`, { headers })).status, 403, 'read own customer mapping');
  assert.equal((await fetch(`${base}/billing/${hank.localId}`, { method: 'PATCH', headers, body: JSON.stringify({ fields: { stripeCustomerId: { stringValue: 'cus_forged' } } }) })).status, 403, 'rewrite own mapping');
  const premium = { fields: { userId: { stringValue: hank.localId }, email: { stringValue: hank.email }, plan: { stringValue: 'premium' } } };
  assert.equal((await fetch(`${base}/subscriptions/${hank.localId}`, { method: 'PATCH', headers, body: JSON.stringify(premium) })).status, 403, 'self-grant Premium');
  assert.equal((await doc(`subscriptions/${hank.localId}`)).exists, false);
  assert.equal((await doc(`billing/${hank.localId}`)).data()!.stripeCustomerId, customerId, 'unchanged');
});

await resetAdminForTests();
console.log(`\n${passed} passed`);
