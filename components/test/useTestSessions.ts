'use client';

import { useMemo } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { db } from '@/lib/firebase';
import { createFirestoreTestSessionRepository, localTestSessionRepository } from '@/lib/services/test-session-repository';

/** Test attempts: Firestore for signed-in students, this device for guests. */
export function useTestSessions() {
  const { user, isGuest } = useAuth();
  const repository = useMemo(() => (!isGuest && db ? createFirestoreTestSessionRepository(db) : localTestSessionRepository), [isGuest]);
  return { repository, userId: user?.uid ?? 'guest' };
}
