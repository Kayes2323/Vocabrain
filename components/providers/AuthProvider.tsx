'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth';
import { auth, db, isFirebaseConfigured } from '@/lib/firebase';
import { ensureUserDocument } from '@/lib/services/user-document';
import {
  getMaxLessonAccess,
  getOrCreateSubscription,
  hasPremiumAccess,
  type UserSubscription,
} from '@/lib/subscription-service';
import { withTimeout } from '@/lib/async';
import { useLocale } from './LocaleProvider';

/** App-level user, decoupled from the Firebase SDK type. */
export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthState {
  user: AppUser | null;
  subscription: UserSubscription | null;
  /** True while Firebase restores the session. */
  loading: boolean;
  /** Using the app without an account. Progress stays on this device. */
  isGuest: boolean;
  /** False when Firebase isn't configured, so only guest mode is possible. */
  canSignIn: boolean;
  isPremium: boolean;
  maxLessonAccess: number;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
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

const ACCOUNT_DATA_TIMEOUT_MS = 8000;

function requireAuth() {
  if (!auth || !db) throw Object.assign(new Error('Firebase is not configured'), { code: 'auth/not-configured' });
  return { auth, db };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { locale } = useLocale();
  const canSignIn = isFirebaseConfigured;
  const [user, setUser] = useState<AppUser | null>(canSignIn ? null : GUEST_USER);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(canSignIn);
  // While sign-up runs, it creates users/{uid} itself (with the name), so the
  // auth listener must not race it with a nameless document.
  const signingUp = useRef(false);

  useEffect(() => {
    if (!canSignIn) return;
    if (!auth || !db) {
      // Config present but initialisation failed: fall back to guest so the app still works.
      setUser(GUEST_USER);
      setLoading(false);
      return;
    }
    const firestore = db;
    return onAuthStateChanged(auth, async (current) => {
      if (current) {
        rememberGuest(false);
        const appUser = { uid: current.uid, email: current.email, displayName: current.displayName };
        try {
          // Bounded so a slow or blocked Firestore can never keep the app on the splash screen.
          await withTimeout(
            (async () => {
              if (!signingUp.current) await ensureUserDocument(firestore, appUser, locale);
              setSubscription(current.email ? await getOrCreateSubscription(firestore, current.uid, current.email) : null);
            })(),
            ACCOUNT_DATA_TIMEOUT_MS,
          );
        } catch (error) {
          console.error('[auth] Could not load account data', error);
        }
        setUser(appUser);
      } else {
        setUser(wasGuest() ? GUEST_USER : null);
        setSubscription(null);
      }
      setLoading(false);
    });
    // The listener is registered once; language only seeds new user documents.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canSignIn]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { auth } = requireAuth();
    await signInWithEmailAndPassword(auth, email.trim(), password);
  }, []);

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      const { auth, db } = requireAuth();
      signingUp.current = true;
      try {
        const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        const displayName = name.trim() || null;
        if (displayName) await updateProfile(credential.user, { displayName });
        await ensureUserDocument(db, { uid: credential.user.uid, email: credential.user.email, displayName }, locale);
        setUser({ uid: credential.user.uid, email: credential.user.email, displayName });
      } finally {
        signingUp.current = false;
      }
    },
    [locale],
  );

  const signInWithGoogle = useCallback(async () => {
    const { auth } = requireAuth();
    await signInWithPopup(auth, new GoogleAuthProvider());
  }, []);

  const resetPassword = useCallback(
    async (email: string) => {
      const { auth } = requireAuth();
      auth.languageCode = locale;
      await sendPasswordResetEmail(auth, email.trim());
    },
    [locale],
  );

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
    if (auth) await firebaseSignOut(auth);
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
      signIn,
      signUp,
      signInWithGoogle,
      resetPassword,
      continueAsGuest,
      signOut,
    }),
    [user, subscription, loading, canSignIn, signIn, signUp, signInWithGoogle, resetPassword, continueAsGuest, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
