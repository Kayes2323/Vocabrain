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
