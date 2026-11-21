import { FieldValue, type Firestore } from 'firebase-admin/firestore';
import type { BillingStore } from '@/lib/billing/checkout';
import { getAdminDb } from './firebase-admin';

/**
 * Server-only Firestore storage for checkout, through the Admin SDK (which bypasses Security Rules,
 * and which clients can never reach: both collections stay closed by the default deny rule).
 *
 *   billing/{uid}              stripeCustomerId, lastCheckoutAtMs, createdAt, updatedAt
 *   stripeCustomers/{custId}   uid, createdAt        (reverse lookup for the webhook, Task 3.4)
 *
 * Checkout never writes `subscriptions/*`: it cannot grant Premium.
 */
export function createBillingStore(getDb: () => Firestore = getAdminDb): BillingStore {
  return {
    async claimCheckout(uid, nowMs, cooldownMs) {
      const db = getDb();
      const ref = db.doc(`billing/${uid}`);
      return db.runTransaction(async (tx) => {
        const snap = await tx.get(ref);
        const data = snap.data();
        const last = typeof data?.lastCheckoutAtMs === 'number' ? data.lastCheckoutAtMs : null;
        // `now` is read by each request before it reaches this transaction, so a request that commits second
        // can carry a slightly EARLIER time. Both a small positive and a small negative gap are "too soon".
        // A gap of a whole window or more in either direction (for example a stored time far in the future)
        // is ignored, so a bad clock can never lock a student out.
        const elapsed = last === null ? null : nowMs - last;
        if (elapsed !== null && elapsed < cooldownMs && elapsed > -cooldownMs) {
          return { ok: false as const, retryAfterMs: Math.min(cooldownMs, cooldownMs - elapsed) };
        }
        tx.set(ref, { lastCheckoutAtMs: nowMs, updatedAt: FieldValue.serverTimestamp(), ...(snap.exists ? {} : { createdAt: FieldValue.serverTimestamp() }) }, { merge: true });
        return { ok: true as const, customerId: typeof data?.stripeCustomerId === 'string' && data.stripeCustomerId ? data.stripeCustomerId : null };
      });
    },

    async saveCustomer(uid, customerId, expectedCurrent) {
      const db = getDb();
      const billing = db.doc(`billing/${uid}`);
      const mapping = db.doc(`stripeCustomers/${customerId}`);
      return db.runTransaction(async (tx) => {
        const [b, m] = [await tx.get(billing), await tx.get(mapping)];
        const current = typeof b.data()?.stripeCustomerId === 'string' && b.data()?.stripeCustomerId ? (b.data()?.stripeCustomerId as string) : null;
        if (current !== expectedCurrent && current !== null) return current; // a concurrent request mapped one first
        if (m.exists && m.data()?.uid !== uid) throw new Error('customer mapping belongs to another user');
        tx.set(billing, { stripeCustomerId: customerId, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
        if (!m.exists) tx.set(mapping, { uid, createdAt: FieldValue.serverTimestamp() });
        return customerId;
      });
    },
  };
}
