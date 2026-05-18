import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20' as any,
});

export { stripe };

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
