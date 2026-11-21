import Stripe from 'stripe';
import { STRIPE_API_VERSION } from '@/lib/billing/stripe-types';

let client: Stripe | null = null;
let clientKey: string | null = null;

/**
 * Builds a Stripe client pinned to the approved API version (see docs/BILLING_STRIPE_API.md).
 * The version is set last so `options` can never override it. Short timeout and one retry keep a
 * slow Stripe from holding a serverless request open; POSTs get idempotency keys from the SDK
 * (or from the caller) so a retry cannot create a second object.
 */
type StripeOptions = NonNullable<ConstructorParameters<typeof Stripe>[1]>;

export function createStripe(secretKey: string, options: StripeOptions = {}): Stripe {
  return new Stripe(secretKey, { timeout: 15_000, maxNetworkRetries: 1, ...options, apiVersion: STRIPE_API_VERSION });
}

/**
 * Lazily creates the Stripe client so builds and routes that never touch
 * payments don't require STRIPE_SECRET_KEY at module load.
 */
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not configured');
  if (!client || clientKey !== key) {
    client = createStripe(key);
    clientKey = key;
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
