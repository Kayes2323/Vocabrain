'use client';

import { useLocale } from '@/components/providers/LocaleProvider';

/** "later today" / "tomorrow" / "12 Oct" for the next review. */
export function useWhen() {
  const { t, locale } = useLocale();
  return (iso: string) => {
    const d = new Date(iso);
    const today = new Date();
    const days = Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() - new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()) / 86_400_000);
    if (days <= 0) return t('brain.page.when.today');
    if (days === 1) return t('brain.page.when.tomorrow');
    return t('brain.page.when.date', { date: d.toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'short' }) });
  };
}
