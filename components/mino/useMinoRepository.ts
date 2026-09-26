'use client';

import { useMemo } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { db } from '@/lib/firebase';
import { createMinoRepository } from '@/lib/services/mino-repository';

/** Signed-in students only: guests can't chat with Mino. */
export function useMinoRepository() {
  const { user, isGuest } = useAuth();
  return useMemo(() => (!isGuest && db && user ? createMinoRepository(db, user.uid) : null), [isGuest, user]);
}
