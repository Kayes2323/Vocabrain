'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
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
  /** Using the app without an account. Progress stays on this device. */
  isGuest: boolean;
  /** False when Firebase isn't configured, so only guest mode is possible. */
  canSignIn: boolean;
  isPremium: boolean;
  maxLessonAccess: number;
  continueAsGuest: () => void;
  /** Signs out, or leaves guest mode and returns to the login screen. */
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

const GUEST_USER: AppUser = { uid: 'guest', email: null, displayName: 'Guest' };
const GUEST_KEY = 'vocabbrain:guest';

function rememberGuest(on: boolean) {
  try {
    if (on) window.localStorage.setItem(GUEST_KEY, '1');
    else window.localStorage.removeItem(GUEST_KEY);
  } catch {
    // Storage unavailable: guest mode lasts for this visit only.
  }
}

function wasGuest(): boolean {
  try {
    return window.localStorage.getItem(GUEST_KEY) === '1';
  } catch {
    return false;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const canSignIn = Boolean(auth);
  const [user, setUser] = useState<AppUser | null>(canSignIn ? null : GUEST_USER);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(canSignIn);

  useEffect(() => {
    if (!canSignIn) return;
    return onAuthStateChanged(auth, async (current) => {
      if (current?.email) {
        rememberGuest(false);
        setUser({ uid: current.uid, email: current.email, displayName: current.displayName });
        try {
          setSubscription(await getOrCreateSubscription(current.uid, current.email));
        } catch (error) {
          console.error('[auth] Error loading subscription:', error);
        }
      } else {
        setUser(wasGuest() ? GUEST_USER : null);
        setSubscription(null);
      }
      setLoading(false);
    });
  }, [canSignIn]);

  const continueAsGuest = useCallback(() => {
    rememberGuest(true);
    setUser(GUEST_USER);
  }, []);

  const signOut = useCallback(async () => {
    if (user?.uid === GUEST_USER.uid) {
      if (!canSignIn) return;
      rememberGuest(false);
      setUser(null);
      return;
    }
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('[auth] Sign-out error:', error);
    }
  }, [user, canSignIn]);

  const value = useMemo<AuthState>(
    () => ({
      user,
      subscription,
      loading,
      isGuest: user?.uid === GUEST_USER.uid,
      canSignIn,
      isPremium: hasPremiumAccess(subscription),
      maxLessonAccess: getMaxLessonAccess(subscription),
      continueAsGuest,
      signOut,
    }),
    [user, subscription, loading, canSignIn, continueAsGuest, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
