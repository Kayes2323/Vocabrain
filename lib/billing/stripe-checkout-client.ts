import type Stripe from 'stripe';
import type { StripeCheckoutClient } from './checkout';

/**
 * The only place checkout talks to Stripe. It maps what the pure checkout function needs onto the SDK.
 * There is deliberately NO method that searches customers by email: the mapping is by Firebase UID.
 */
export function createStripeCheckoutClient(stripe: Stripe): StripeCheckoutClient {
  return {
    async retrieveCustomer(customerId) {
      try {
        const customer = await stripe.customers.retrieve(customerId);
        if (customer.deleted) return { state: 'gone' };
        return { state: 'active', firebaseUid: customer.metadata?.firebaseUid || null };
      } catch (error) {
        if ((error as { code?: unknown }).code === 'resource_missing') return { state: 'gone' };
        throw error;
      }
    },

    async createCustomer({ uid, email }, idempotencyKey) {
      const customer = await stripe.customers.create({ metadata: { firebaseUid: uid }, ...(email ? { email } : {}) }, { idempotencyKey });
      return customer.id;
    },

    async listSubscriptionStatuses(customerId) {
      const subscriptions = await stripe.subscriptions.list({ customer: customerId, status: 'all', limit: 100 });
      return subscriptions.data.map((s) => s.status);
    },

    async createCheckoutSession({ customerId, uid, interval, priceId, successUrl, cancelUrl }, idempotencyKey) {
      const session = await stripe.checkout.sessions.create(
        {
          mode: 'subscription',
          customer: customerId,
          client_reference_id: uid,
          payment_method_types: ['card'],
          line_items: [{ price: priceId, quantity: 1 }],
          // The verified UID travels on the session and on the subscription, so every later event can be tied back.
          metadata: { firebaseUid: uid, plan: interval },
          subscription_data: { metadata: { firebaseUid: uid, plan: interval } },
          success_url: successUrl,
          cancel_url: cancelUrl,
        },
        { idempotencyKey },
      );
      return { url: session.url };
    },
  };
}
