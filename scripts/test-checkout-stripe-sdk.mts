/**
 * Checkout through the REAL Stripe SDK against a LOCAL mock Stripe server (no Stripe network, no real key).
 * Proves what is actually sent over HTTP: the pinned API version, idempotency keys, the exact session
 * parameters, and that no customer is ever searched by email. It does NOT prove real Stripe behaviour.
 * Run: pnpm test:checkout-sdk
 */
import assert from 'node:assert/strict';
import http from 'node:http';
import type { AddressInfo } from 'node:net';
import { handleCheckout, type BillingStore, type CheckoutDeps } from '../lib/billing/checkout.ts';
import { createStripeCheckoutClient } from '../lib/billing/stripe-checkout-client.ts';
import { STRIPE_API_VERSION } from '../lib/billing/stripe-types.ts';
import { createStripe } from '../lib/stripe-server.ts';

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
const KEY = 'sk_test_MOCKSERVERKEY_NOT_REAL_123';

interface Seen {
  method: string;
  path: string;
  query: URLSearchParams;
  headers: http.IncomingHttpHeaders;
  form: URLSearchParams;
}

// ---------- a tiny mock of the four Stripe endpoints checkout uses ----------
let seen: Seen[] = [];
let respond: (req: Seen) => { status: number; body: unknown } = defaultResponder;

function defaultResponder(req: Seen) {
  if (req.method === 'GET' && req.path === '/v1/customers/cus_existing') return { status: 200, body: { id: 'cus_existing', object: 'customer', metadata: { firebaseUid: 'uid-alice' } } };
  if (req.method === 'GET' && req.path === '/v1/customers/cus_gone') return { status: 404, body: { error: { type: 'invalid_request_error', code: 'resource_missing', message: 'No such customer: cus_gone' } } };
  if (req.method === 'GET' && req.path === '/v1/customers/cus_deleted') return { status: 200, body: { id: 'cus_deleted', object: 'customer', deleted: true } };
  if (req.method === 'POST' && req.path === '/v1/customers') return { status: 200, body: { id: 'cus_mock1', object: 'customer', metadata: { firebaseUid: req.form.get('metadata[firebaseUid]') } } };
  if (req.method === 'GET' && req.path === '/v1/subscriptions') return { status: 200, body: { object: 'list', url: '/v1/subscriptions', has_more: false, data: [{ id: 'sub_1', object: 'subscription', status: 'canceled' }] } };
  if (req.method === 'POST' && req.path === '/v1/checkout/sessions') return { status: 200, body: { id: 'cs_test_1', object: 'checkout.session', url: 'https://checkout.stripe.com/c/pay/cs_test_1' } };
  return { status: 404, body: { error: { type: 'invalid_request_error', message: `unexpected ${req.method} ${req.path}` } } };
}

const server = http.createServer((req, res) => {
  const chunks: Buffer[] = [];
  req.on('data', (c) => chunks.push(c));
  req.on('end', () => {
    const url = new URL(req.url ?? '/', 'http://x');
    const entry: Seen = { method: req.method ?? '', path: url.pathname, query: url.searchParams, headers: req.headers, form: new URLSearchParams(Buffer.concat(chunks).toString()) };
    seen.push(entry);
    const { status, body } = respond(entry);
    res.writeHead(status, { 'Content-Type': 'application/json', 'Request-Id': 'req_mock_123' });
    res.end(JSON.stringify(body));
  });
});
await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address() as AddressInfo;

const sdk = (opts: Record<string, unknown> = {}) => createStripe(KEY, { host: '127.0.0.1', port, protocol: 'http', maxNetworkRetries: 0, ...opts } as never);

function deps(over: { stripe?: ReturnType<typeof createStripe>; customerId?: string | null; env?: Record<string, string | undefined> } = {}): { deps: CheckoutDeps; logs: string[]; saved: string[] } {
  const logs: string[] = [];
  const saved: string[] = [];
  const store: BillingStore = {
    async claimCheckout() {
      return { ok: true, customerId: over.customerId ?? null };
    },
    async saveCustomer(_uid, customerId) {
      saved.push(customerId);
      return customerId;
    },
  };
  return {
    logs,
    saved,
    deps: {
      env: over.env ?? { STRIPE_CHECKOUT_ENABLED: 'true', STRIPE_SECRET_KEY: KEY, STRIPE_PRICE_ID_MONTHLY: MONTHLY, STRIPE_PRICE_ID_YEARLY: YEARLY, NEXT_PUBLIC_APP_URL: 'https://app.example.com' },
      now: () => 1_700_000_000_000,
      verifyIdToken: async () => ({ uid: 'uid-alice', email: 'alice@example.com' }),
      store,
      stripe: createStripeCheckoutClient(over.stripe ?? sdk()),
      log: (event, fields) => logs.push(JSON.stringify({ event, ...fields })),
    },
  };
}

const run = (d: CheckoutDeps, plan: unknown = 'monthly') => handleCheckout({ authorization: 'Bearer t', readBody: async () => JSON.stringify({ plan }) }, d);

// ---------- API version ----------
await test('every request carries the approved Stripe-Version (2026-04-22.dahlia), and the key only in the Authorization header', async () => {
  seen = [];
  respond = defaultResponder;
  const r = await run(deps().deps);
  assert.equal(r.status, 200);
  assert.ok(seen.length >= 2);
  for (const s of seen) {
    assert.equal(s.headers['stripe-version'], STRIPE_API_VERSION, `${s.method} ${s.path}`);
    assert.equal(s.headers.authorization, `Bearer ${KEY}`);
    assert.ok(!s.path.includes(KEY) && !s.query.toString().includes(KEY) && !s.form.toString().includes(KEY));
  }
  assert.equal(STRIPE_API_VERSION, '2026-04-22.dahlia');
});

await test('createStripe cannot be pushed back to the old 2024-11-20 pin by options', async () => {
  seen = [];
  respond = defaultResponder;
  await run(deps({ stripe: sdk({ apiVersion: '2024-11-20' }) }).deps);
  assert.ok(seen.length > 0);
  for (const s of seen) assert.equal(s.headers['stripe-version'], '2026-04-22.dahlia');
});

// ---------- what is sent ----------
await test('new student: customer is created tagged with the verified uid (email only as a prefill), then the session', async () => {
  seen = [];
  respond = defaultResponder;
  const { deps: d, saved } = deps();
  assert.equal((await run(d, 'yearly')).status, 200);
  assert.deepEqual(seen.map((s) => `${s.method} ${s.path}`), ['POST /v1/customers', 'POST /v1/checkout/sessions'], 'no subscription lookup for a brand-new customer');
  const [customer, session] = seen;
  assert.equal(customer.form.get('metadata[firebaseUid]'), 'uid-alice');
  assert.equal(customer.form.get('email'), 'alice@example.com');
  assert.match(String(customer.headers['idempotency-key']), /^mino-customer-uid-alice-[0-9a-f]{12}$/);
  assert.deepEqual(saved, ['cus_mock1']);

  const f = session.form;
  assert.equal(f.get('mode'), 'subscription');
  assert.equal(f.get('customer'), 'cus_mock1');
  assert.equal(f.get('client_reference_id'), 'uid-alice');
  assert.equal(f.get('line_items[0][price]'), YEARLY, 'the Price ID comes from the server allowlist');
  assert.equal(f.get('line_items[0][quantity]'), '1');
  assert.equal(f.get('metadata[firebaseUid]'), 'uid-alice');
  assert.equal(f.get('metadata[plan]'), 'yearly');
  assert.equal(f.get('subscription_data[metadata][firebaseUid]'), 'uid-alice');
  assert.equal(f.get('subscription_data[metadata][plan]'), 'yearly');
  assert.equal(f.get('payment_method_types[0]'), 'card');
  assert.equal(f.get('success_url'), 'https://app.example.com/profile?checkout=success');
  assert.equal(f.get('cancel_url'), 'https://app.example.com/profile?checkout=cancelled');
  assert.match(String(session.headers['idempotency-key']), /^mino-checkout-uid-alice-\d+$/);
  for (const forbidden of ['price_data', 'unit_amount', 'trial', 'discounts', 'allow_promotion_codes']) {
    assert.ok(![...f.keys()].some((k) => k.includes(forbidden)), `unexpected parameter ${forbidden}`);
  }
});

await test('NO email lookup: across plans and customer states, Stripe is never asked to list or search customers', async () => {
  for (const customerId of [null, 'cus_existing', 'cus_gone', 'cus_deleted']) {
    for (const plan of ['monthly', 'yearly']) {
      seen = [];
      respond = defaultResponder;
      const r = await run(deps({ customerId }).deps, plan);
      assert.equal(r.status, 200, `${customerId} ${plan}`);
      for (const s of seen) {
        assert.ok(!(s.method === 'GET' && s.path === '/v1/customers'), 'no customer list');
        assert.ok(!s.path.includes('/search'), 'no search');
        assert.ok(!s.query.has('email') && !s.form.has('query'), 'no email query');
      }
    }
  }
});

await test('existing student: the customer is retrieved and verified, then subscriptions are checked, then the session is created', async () => {
  seen = [];
  respond = defaultResponder;
  assert.equal((await run(deps({ customerId: 'cus_existing' }).deps)).status, 200);
  assert.deepEqual(seen.map((s) => `${s.method} ${s.path}`), ['GET /v1/customers/cus_existing', 'GET /v1/subscriptions', 'POST /v1/checkout/sessions']);
  assert.equal(seen[1].query.get('customer'), 'cus_existing');
  assert.equal(seen[1].query.get('status'), 'all');
});

await test('duplicate: an active subscription from Stripe blocks the session (409) and no session request is sent', async () => {
  seen = [];
  respond = (req) =>
    req.path === '/v1/subscriptions'
      ? { status: 200, body: { object: 'list', url: '/v1/subscriptions', has_more: false, data: [{ id: 'sub_1', object: 'subscription', status: 'active' }] } }
      : defaultResponder(req);
  const r = await run(deps({ customerId: 'cus_existing' }).deps);
  assert.deepEqual([r.status, 'code' in r.body && r.body.code], [409, 'already_subscribed']);
  assert.ok(!seen.some((s) => s.path === '/v1/checkout/sessions'));
});

await test('deleted customers (404 resource_missing and deleted:true) are replaced by a new customer', async () => {
  for (const id of ['cus_gone', 'cus_deleted']) {
    seen = [];
    respond = defaultResponder;
    const { deps: d, saved } = deps({ customerId: id });
    assert.equal((await run(d)).status, 200, id);
    assert.deepEqual(saved, ['cus_mock1'], id);
    assert.ok(seen.some((s) => s.method === 'POST' && s.path === '/v1/customers'));
  }
});

// ---------- real SDK errors -> safe responses ----------
const failWith = (status: number, error: Record<string, unknown>) => {
  respond = (req) => (req.path === '/v1/checkout/sessions' ? { status, body: { error } } : defaultResponder(req));
};
const leaky = `Invalid API Key provided: ${KEY} for alice@example.com`;

await test('real SDK errors map to safe codes and never leak the Stripe message, key or email', async () => {
  const cases: [number, Record<string, unknown>, number, string][] = [
    [401, { type: 'invalid_request_error', message: leaky }, 503, 'billing_unavailable'],
    [403, { type: 'invalid_request_error', message: leaky }, 503, 'billing_unavailable'],
    [429, { type: 'invalid_request_error', code: 'rate_limit', message: leaky }, 503, 'payment_provider_unavailable'],
    [400, { type: 'invalid_request_error', code: 'resource_missing', param: 'line_items[0][price]', message: leaky }, 502, 'payment_provider_error'],
    [402, { type: 'card_error', code: 'card_declined', message: leaky }, 502, 'payment_provider_error'],
    [500, { type: 'api_error', message: leaky }, 502, 'payment_provider_error'],
  ];
  for (const [httpStatus, error, status, code] of cases) {
    seen = [];
    failWith(httpStatus, error);
    const d = deps();
    const r = await run(d.deps);
    assert.deepEqual([r.status, 'code' in r.body && r.body.code], [status, code], `Stripe HTTP ${httpStatus}`);
    const shown = JSON.stringify(r) + d.logs.join('\n');
    for (const secret of [KEY, 'alice@example.com', 'Invalid API Key']) assert.ok(!shown.includes(secret), `HTTP ${httpStatus} leaked ${secret}`);
    assert.ok(d.logs.join('').includes('req_mock_123'), 'Stripe request id is logged');
  }
  respond = defaultResponder;
});

await test('a connection failure (nothing listening) -> 503 payment_provider_unavailable with Retry-After', async () => {
  const dead = http.createServer();
  await new Promise<void>((resolve) => dead.listen(0, '127.0.0.1', resolve));
  const deadPort = (dead.address() as AddressInfo).port;
  await new Promise<void>((resolve) => dead.close(() => resolve()));
  const d = deps({ stripe: sdk({ port: deadPort }) });
  const r = await run(d.deps);
  assert.deepEqual([r.status, 'code' in r.body && r.body.code, r.headers['Retry-After']], [503, 'payment_provider_unavailable', '5']);
  assert.ok(!JSON.stringify(r).includes(KEY));
});

await test('the live guard blocks before any request reaches Stripe', async () => {
  seen = [];
  respond = defaultResponder;
  const d = deps({ env: { STRIPE_CHECKOUT_ENABLED: 'true', STRIPE_SECRET_KEY: 'sk_live_NOTREAL123456', STRIPE_PRICE_ID_MONTHLY: MONTHLY, STRIPE_PRICE_ID_YEARLY: YEARLY, NEXT_PUBLIC_APP_URL: 'https://app.example.com' } });
  const r = await run(d.deps);
  assert.deepEqual([r.status, 'code' in r.body && r.body.code], [503, 'live_payments_disabled']);
  assert.equal(seen.length, 0);
});

await new Promise<void>((resolve) => server.close(() => resolve()));
console.log(`\n${passed} passed`);
