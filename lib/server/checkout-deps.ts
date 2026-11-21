import type { CheckoutDeps, LogFields, StripeCheckoutClient } from '@/lib/billing/checkout';
import { createStripeCheckoutClient } from '@/lib/billing/stripe-checkout-client';
import { getStripe } from '@/lib/stripe-server';
import { createBillingStore } from './billing-store';
import { verifyFirebaseIdToken } from './checkout-auth';

/** Secret-free logging: only the event name and the plain fields the checkout code passes (codes, never values). */
function log(event: string, fields: LogFields = {}) {
  const line = JSON.stringify({ event, ...fields });
  if (event === 'checkout_session_created') console.info('[billing]', line);
  else console.warn('[billing]', line);
}

/** Wires the real Firebase Admin, Firestore and Stripe. Everything is created lazily, on first use. */
export function createCheckoutDeps(): CheckoutDeps {
  let stripe: StripeCheckoutClient | undefined;
  const lazyStripe = (): StripeCheckoutClient => (stripe ??= createStripeCheckoutClient(getStripe()));
  return {
    env: process.env,
    now: () => Date.now(),
    verifyIdToken: verifyFirebaseIdToken,
    store: createBillingStore(),
    stripe: {
      retrieveCustomer: (id) => lazyStripe().retrieveCustomer(id),
      createCustomer: (input, key) => lazyStripe().createCustomer(input, key),
      listSubscriptionStatuses: (id) => lazyStripe().listSubscriptionStatuses(id),
      createCheckoutSession: (input, key) => lazyStripe().createCheckoutSession(input, key),
    },
    log,
  };
}
