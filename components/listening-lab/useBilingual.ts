import { useCallback } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { Bilingual } from '@/lib/listening-lab';

/** Picks the active language's text from a `Bilingual` content record (same pattern as Foundation's `useFoundation` `l()`). */
export function useBilingual() {
  const { locale } = useLocale();
  return useCallback((b: Bilingual) => (locale === 'bn' ? b.bn || b.en : b.en), [locale]);
}
