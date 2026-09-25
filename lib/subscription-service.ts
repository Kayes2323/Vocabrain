import { doc, getDoc, serverTimestamp, setDoc, type Firestore } from 'firebase/firestore';
import { FREE_LESSON_LIMIT } from './constants';

const ADMIN_EMAIL = 'aakayes99@gmail.com';

export interface UserSubscription {
  userId: string;
  email: string;
  plan: 'free' | 'premium';
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  /** Derived from the signed-in email; never stored or trusted from Firestore. */
  isAdmin: boolean;
}

export const isAdminUser = (email: string | null | undefined): boolean => email === ADMIN_EMAIL;

/**
 * Reads subscriptions/{uid}, creating a free one on first sign-in. Clients may
 * only ever create `plan: 'free'` (enforced by firestore.rules); upgrades are
 * written server-side by the Stripe webhook.
 */
export async function getOrCreateSubscription(db: Firestore, userId: string, email: string): Promise<UserSubscription> {
  const ref = doc(db, 'subscriptions', userId);
  const snapshot = await getDoc(ref);
  const isAdmin = isAdminUser(email);

  if (snapshot.exists()) {
    const data = snapshot.data();
    return {
      userId,
      email,
      plan: data.plan === 'premium' ? 'premium' : 'free',
      stripeCustomerId: data.stripeCustomerId,
      stripeSubscriptionId: data.stripeSubscriptionId,
      isAdmin,
    };
  }

  await setDoc(ref, { userId, email, plan: 'free', createdAt: serverTimestamp() });
  return { userId, email, plan: 'free', isAdmin };
}

export const hasPremiumAccess = (subscription: UserSubscription | null): boolean =>
  Boolean(subscription && (subscription.isAdmin || subscription.plan === 'premium'));

/** How many topic lessons the student can open. */
export const getMaxLessonAccess = (subscription: UserSubscription | null): number =>
  hasPremiumAccess(subscription) ? 999 : FREE_LESSON_LIMIT;
