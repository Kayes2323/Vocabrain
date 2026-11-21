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

// No Stripe key on purpose: if the route reached Stripe it would not return 503/400.
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

await test('flag "true": the gate opens (invalid request is then rejected by validation, not by the gate)', async () => {
  process.env.STRIPE_CHECKOUT_ENABLED = 'true';
  const res = await call({});
  assert.equal(res.status, 400);
});

console.log(`\n${passed} passed`);
