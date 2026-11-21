import Stripe from 'stripe';

let client: Stripe | null = null;

/**
 * Lazily creates the Stripe client so builds and routes that never touch
 * payments don't require STRIPE_SECRET_KEY at module load.
 */
export function getStripe(): Stripe {
  if (!client) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY is not configured');
    client = new Stripe(key, { apiVersion: '2024-11-20' as any });
  }
  return client;
}

/**
 * Server-side checkout kill switch. Checkout is OFF unless the server
 * environment variable STRIPE_CHECKOUT_ENABLED is exactly "true". Any other
 * value, or no value, keeps it off. Hiding the button is not enough, so the
 * checkout route checks this before it reads the request or calls Stripe.
 */
export function isCheckoutEnabled(): boolean {
  return process.env.STRIPE_CHECKOUT_ENABLED === 'true';
}

// Types for Stripe integration
export interface CheckoutSessionData {
  userId: string;
  email: string;
  plan: 'monthly' | 'yearly';
}

export interface UpgradeResponse {
  sessionId: string;
  clientSecret?: string;
}
