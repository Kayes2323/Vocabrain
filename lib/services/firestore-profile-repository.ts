import { doc, getDoc, serverTimestamp, setDoc, type Firestore } from 'firebase/firestore';
import type { UserProfile } from '@/lib/models';
import { withProfileDefaults, type ProfileRepository } from './profile-repository';
import { summaryFields } from './user-document';

const SAVE_DELAY_MS = 800;

/**
 * Stores the app profile in users/{uid}. Rapid updates (e.g. answering
 * flashcards) are coalesced into one write; pending writes flush when the tab
 * is hidden so nothing is lost.
 */
export function createFirestoreProfileRepository(db: Firestore): ProfileRepository {
  let pending: UserProfile | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const flush = async () => {
    if (timer) clearTimeout(timer);
    timer = null;
    const profile = pending;
    pending = null;
    if (!profile) return;
    const { userId, ...app } = profile;
    try {
      await setDoc(
        doc(db, 'users', userId),
        { ...summaryFields(profile), app: JSON.parse(JSON.stringify(app)), updatedAt: serverTimestamp() },
        { merge: true },
      );
    } catch (error) {
      console.error('[profile] Save failed', error);
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('pagehide', () => void flush());
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') void flush();
    });
  }

  return {
    async load(userId) {
      const snap = await getDoc(doc(db, 'users', userId));
      const data = snap.data() as { app?: Partial<UserProfile>; name?: string; preferredLanguage?: UserProfile['language'] } | undefined;
      const profile = withProfileDefaults(userId, data?.app);
      return {
        ...profile,
        displayName: profile.displayName ?? (data?.name || undefined),
        language: profile.language ?? data?.preferredLanguage,
      };
    },
    async save(profile) {
      pending = profile;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => void flush(), SAVE_DELAY_MS);
    },
  };
}
