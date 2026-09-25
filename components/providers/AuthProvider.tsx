'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { AUTH_ENABLED } from '@/lib/constants';
import {
  getMaxLessonAccess,
  getOrCreateSubscription,
  hasPremiumAccess,
  type UserSubscription,
} from '@/lib/subscription-service';

/** App-level user, decoupled from the Firebase SDK type. */
export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthState {
  user: AppUser | null;
  subscription: UserSubscription | null;
  loading: boolean;
  /**
   * True when sign-in is turned off (AUTH_ENABLED) or Firebase isn't
   * configured. The app runs as a local guest so every screen stays reachable.
   */
  isDemo: boolean;
  isPremium: boolean;
  maxLessonAccess: number;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

const DEMO_USER: AppUser = { uid: 'demo', email: null, displayName: 'Guest' };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isDemo = !AUTH_ENABLED || !auth;
  const [user, setUser] = useState<AppUser | null>(isDemo ? DEMO_USER : null);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(!isDemo);

  useEffect(() => {
    if (isDemo) return;
    return onAuthStateChanged(auth, async (current) => {
      if (current?.email) {
        setUser({ uid: current.uid, email: current.email, displayName: current.displayName });
        try {
          setSubscription(await getOrCreateSubscription(current.uid, current.email));
        } catch (error) {
          console.error('[auth] Error loading subscription:', error);
        }
      } else {
        setUser(null);
        setSubscription(null);
      }
      setLoading(false);
    });
  }, [isDemo]);

  const signOut = useCallback(async () => {
    if (isDemo) return;
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('[auth] Sign-out error:', error);
    }
  }, [isDemo]);

  const value = useMemo<AuthState>(
    () => ({
      user,
      subscription,
      loading,
      isDemo,
      isPremium: hasPremiumAccess(subscription),
      maxLessonAccess: getMaxLessonAccess(subscription),
      signOut,
    }),
    [user, subscription, loading, isDemo, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
