'use client';

import { PageHeader, ScreenSkeleton } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { TodayCard } from '@/components/home/TodayCard';

/** Today's learning: the daily tasks, their status and time, opened from Home's Quick access. */
export default function TodayPage() {
  const { t } = useLocale();
  const { profile } = useProfile();
  if (!profile) return <ScreenSkeleton />;
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title={t('home.today')} backHref="/" backLabel={t('nav.home')} />
      <TodayCard profile={profile} />
    </div>
  );
}
