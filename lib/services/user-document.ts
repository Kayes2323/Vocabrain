import { doc, getDoc, serverTimestamp, setDoc, updateDoc, type Firestore } from 'firebase/firestore';
import { overallBand } from '@/lib/engine/ielts';
import type { Locale, UserProfile } from '@/lib/models';

/**
 * users/{uid}: the student's account document. Top-level fields are a small,
 * queryable summary; `app` holds the full app profile (goals, plan, progress).
 * Firestore rules only let the owner read or write it.
 */
export interface UserDocument {
  uid: string;
  name: string;
  email: string;
  preferredLanguage: Locale;
  createdAt: unknown;
  updatedAt: unknown;
  onboardingCompleted: boolean;
  targetIELTSScore: number | null;
  currentIELTSLevel: number | null;
  studyAbroadGoal: string | null;
  app?: Omit<UserProfile, 'userId'>;
}

export function summaryFields(profile: UserProfile) {
  return {
    preferredLanguage: profile.language ?? 'en',
    onboardingCompleted: Boolean(profile.onboardedAt),
    targetIELTSScore: profile.ielts.targetBand ?? null,
    currentIELTSLevel: overallBand(profile.ielts.currentBands) ?? null,
    studyAbroadGoal:
      profile.goal === 'abroad' || profile.abroad.degreeLevel || profile.abroad.targetIntake
        ? [profile.abroad.degreeLevel, profile.abroad.subject].filter(Boolean).join(' · ') || 'study-abroad'
        : null,
  };
}

/**
 * Creates users/{uid} on first sign-in. For an existing document it only
 * fills in a missing name (sign-up sets the name just after the auth listener
 * has already created the document).
 */
export async function ensureUserDocument(
  db: Firestore,
  user: { uid: string; email: string | null; displayName: string | null },
  language: Locale,
): Promise<void> {
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    if (user.displayName && !snap.data().name) {
      await updateDoc(ref, { name: user.displayName, updatedAt: serverTimestamp() });
    }
    return;
  }
  await setDoc(ref, {
    uid: user.uid,
    name: user.displayName ?? '',
    email: user.email ?? '',
    preferredLanguage: language,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    onboardingCompleted: false,
    targetIELTSScore: null,
    currentIELTSLevel: null,
    studyAbroadGoal: null,
  });
}
