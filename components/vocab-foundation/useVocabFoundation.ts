'use client';

import { useCallback } from 'react';
import { useProfile } from '@/components/providers/ProfileProvider';
import type { VocabFoundationProgress } from '@/lib/models';

/** Vocabulary Foundation progress from the profile, and an updater that saves it. */
export function useVocabFoundation() {
  const { profile, updateProfile } = useProfile();
  const update = useCallback(
    (fn: (vf: VocabFoundationProgress) => VocabFoundationProgress) => updateProfile((p) => ({ ...p, vocabFoundation: fn(p.vocabFoundation) })),
    [updateProfile],
  );
  return { profile, vf: profile?.vocabFoundation, update };
}
