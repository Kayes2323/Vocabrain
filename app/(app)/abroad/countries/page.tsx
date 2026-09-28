'use client';

import { useProfile } from '@/components/providers/ProfileProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { PageHeader, ScreenSkeleton } from '@/components/ds';
import { HubBar } from '@/components/abroad/HubBar';
import { StudyDestinations } from '@/components/abroad/StudyDestinations';
import { TrustNote } from '@/components/abroad/TrustNote';

export default function CountryExplorerPage() {
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
      <TrustNote />
    </div>
  );
}
