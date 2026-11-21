import { NextRequest, NextResponse } from 'next/server';
import { handleCheckout } from '@/lib/billing/checkout';
import { createCheckoutDeps } from '@/lib/server/checkout-deps';

// This is an API route, not a page - don't try to generate static HTML
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Starts a Stripe Checkout session for the signed-in student. All rules live in lib/billing/checkout.ts:
 * payments are off unless STRIPE_CHECKOUT_ENABLED === "true" (and STRIPE_ALLOW_LIVE === "true" for a live key);
 * the student is identified only by the verified Firebase ID token; the body is exactly { plan }.
 * This route never grants Premium.
 */
export async function POST(request: NextRequest) {
  const result = await handleCheckout(
    { authorization: request.headers.get('authorization'), readBody: () => request.text() },
    createCheckoutDeps(),
  );
  return NextResponse.json(result.body, { status: result.status, headers: { ...result.headers, 'Cache-Control': 'no-store' } });
}
