import { db } from './firebase';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';

const ADMIN_EMAIL = 'aakayes99@gmail.com';

export interface UserSubscription {
  userId: string;
  email: string;
  plan: 'free' | 'premium';
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  createdAt: Date;
  renewalDate?: Date;
  isAdmin: boolean;
}

// Check if user is admin
export const isAdminUser = (email: string | null | undefined): boolean => {
  return email === ADMIN_EMAIL;
};

// Get or create user subscription
export const getOrCreateSubscription = async (userId: string, email: string): Promise<UserSubscription> => {
  try {
    const subDoc = doc(db, 'subscriptions', userId);
    const snapshot = await getDoc(subDoc);

    if (snapshot.exists()) {
      return snapshot.data() as UserSubscription;
    }

    // Create new free subscription
    const newSub: UserSubscription = {
      userId,
      email,
      plan: 'free',
      createdAt: new Date(),
      isAdmin: isAdminUser(email),
    };

    await setDoc(subDoc, newSub);
    return newSub;
  } catch (error) {
    console.error('[v0] Error getting/creating subscription:', error);
    throw error;
  }
};

// Update user subscription to premium
export const upgradeToPremium = async (
  userId: string,
  stripeCustomerId: string,
  stripeSubscriptionId: string
): Promise<void> => {
  try {
    const subDoc = doc(db, 'subscriptions', userId);
    await updateDoc(subDoc, {
      plan: 'premium',
      stripeCustomerId,
      stripeSubscriptionId,
      renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });
  } catch (error) {
    console.error('[v0] Error upgrading to premium:', error);
    throw error;
  }
};

// Check if user has premium access
export const hasPremiumAccess = (subscription: UserSubscription | null): boolean => {
  if (!subscription) return false;
  return subscription.isAdmin || subscription.plan === 'premium';
};

// Get lesson access level (how many lessons user can access)
export const getMaxLessonAccess = (subscription: UserSubscription | null): number => {
  if (!subscription) return 2; // Default: 2 lessons for free users
  if (subscription.isAdmin) return 999; // Admin: unlimited
  if (subscription.plan === 'premium') return 999; // Premium: unlimited
  return 2; // Free: 2 lessons
};
