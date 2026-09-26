'use client';

import { useCallback } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import type { L } from '@/lib/foundation';
import type { FoundationProgress } from '@/lib/models';

/** Picks the student's language from bilingual content (English as fallback). */
export function useText() {
  const { locale } = useLocale();
  return useCallback((l: L) => (locale === 'bn' ? l.bn || l.en : l.en), [locale]);
}

/** Foundation progress from the profile, and an updater that saves it. */
export function useFoundation() {
  const { profile, updateProfile } = useProfile();
  const update = useCallback(
    (fn: (fp: FoundationProgress) => FoundationProgress) => updateProfile((p) => ({ ...p, foundation: fn(p.foundation) })),
    [updateProfile],
  );
  return { profile, fp: profile?.foundation, update };
}
