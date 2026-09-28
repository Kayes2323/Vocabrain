'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { PageHeader, ScreenSkeleton } from '@/components/ds';
import { HubBar } from '@/components/abroad/HubBar';
import { StudyDestinations } from '@/components/abroad/StudyDestinations';

/** Study Abroad: the countries first. Each card opens that country's guide. */
export default function AbroadPage() {
  const { t } = useLocale();
  const { profile } = useProfile();
  if (!profile) return <ScreenSkeleton />;
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <PageHeader title={t('sa.home.title')} />
        <HubBar />
      </div>
      <StudyDestinations />
    </div>
  );
}
