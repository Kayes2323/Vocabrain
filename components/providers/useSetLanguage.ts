'use client';

import { useCallback } from 'react';
import type { Locale } from '@/lib/models';
import { useLocale } from './LocaleProvider';
import { useProfile } from './ProfileProvider';

/** Changes the UI language now and saves it to the student's profile. */
export function useSetLanguage() {
  const { setLocale } = useLocale();
  const { updateProfile } = useProfile();
  return useCallback(
    (language: Locale) => {
      setLocale(language);
      updateProfile((p) => ({ ...p, language }));
    },
    [setLocale, updateProfile],
  );
}
