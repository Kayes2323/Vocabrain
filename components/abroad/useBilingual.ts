'use client';

import { useCallback } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { Bilingual } from '@/lib/models';

/** Picks the student's language from Study Abroad content (English when Bangla is missing). */
export function useBilingual() {
  const { locale } = useLocale();
  return useCallback((b: Bilingual) => (locale === 'bn' ? b.bn || b.en : b.en), [locale]);
}
