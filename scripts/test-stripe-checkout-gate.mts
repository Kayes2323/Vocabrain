// Checkout kill switch: the route must refuse (503) unless STRIPE_CHECKOUT_ENABLED is exactly "true",
// and must not touch Stripe or read the request while disabled. Run: pnpm test:stripe-gate
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { POST } from '../app/api/stripe/checkout/route';

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

const call = (body: unknown = { userId: 'u1', email: 'a@b.c', plan: 'monthly' }) =>
  POST(new NextRequest('http://localhost/api/stripe/checkout', { method: 'POST', body: JSON.stringify(body) }));

// No Stripe key on purpose: while the switch is off the route must not need one.
delete process.env.STRIPE_SECRET_KEY;

await test('unset flag: 503 and checkout_disabled', async () => {
  delete process.env.STRIPE_CHECKOUT_ENABLED;
  const res = await call();
  assert.equal(res.status, 503);
  assert.equal((await res.json()).code, 'checkout_disabled');
  assert.equal(res.headers.get('cache-control'), 'no-store');
});

for (const value of ['', 'false', '1', 'TRUE', 'True', 'yes', ' true']) {
  await test(`flag "${value}" does not enable checkout`, async () => {
    process.env.STRIPE_CHECKOUT_ENABLED = value;
    assert.equal((await call()).status, 503);
  });
}

await test('disabled: an unreadable body still gets 503 (body is never read)', async () => {
  delete process.env.STRIPE_CHECKOUT_ENABLED;
  const res = await POST(new NextRequest('http://localhost/api/stripe/checkout', { method: 'POST', body: '{not json' }));
  assert.equal(res.status, 503);
});

await test('flag "true" but no Stripe key: refused as billing_unavailable (never reaches Stripe or Firebase)', async () => {
  process.env.STRIPE_CHECKOUT_ENABLED = 'true';
  delete process.env.STRIPE_SECRET_KEY;
  const res = await call();
  assert.equal(res.status, 503);
  assert.equal((await res.json()).code, 'billing_unavailable');
});

await test('flag "true" with a LIVE key but no STRIPE_ALLOW_LIVE: refused as live_payments_disabled', async () => {
  process.env.STRIPE_CHECKOUT_ENABLED = 'true';
  process.env.STRIPE_SECRET_KEY = 'sk_live_NOTAREALKEY1234567';
  for (const allow of [undefined, '', 'false', '1', 'TRUE']) {
    if (allow === undefined) delete process.env.STRIPE_ALLOW_LIVE;
    else process.env.STRIPE_ALLOW_LIVE = allow;
    const res = await call();
    assert.equal(res.status, 503, String(allow));
    assert.equal((await res.json()).code, 'live_payments_disabled');
  }
  delete process.env.STRIPE_ALLOW_LIVE;
});

await test('both switches on with a test key: the gate opens and the next check is the sign-in (401 without a token)', async () => {
  process.env.STRIPE_CHECKOUT_ENABLED = 'true';
  process.env.STRIPE_SECRET_KEY = 'sk_test_NOTAREALKEY1234567';
  const res = await call();
  assert.equal(res.status, 401);
  assert.equal((await res.json()).code, 'unauthenticated');
});

await test('an invalid request from a signed-out caller is never parsed: 401, not 400', async () => {
  const res = await POST(new NextRequest('http://localhost/api/stripe/checkout', { method: 'POST', body: '{not json' }));
  assert.equal(res.status, 401);
});

console.log(`\n${passed} passed`);
