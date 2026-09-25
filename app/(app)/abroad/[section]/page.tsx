'use client';

import { notFound, useParams } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { PlannedSection } from '@/components/sections/PlannedSection';
import { ABROAD_SECTIONS, findSection } from '@/lib/navigation';

export default function AbroadSectionPage() {
  const { section: id } = useParams<{ section: string }>();
  const { t } = useLocale();
  const section = findSection(ABROAD_SECTIONS, id);
  if (!section) notFound();

  return (
    <PlannedSection
      section={section}
      backHref="/abroad"
      backLabel={t('nav.abroad')}
      meanwhile={{ labelKey: 'planned.meanwhileCountries', href: '/abroad/countries' }}
    />
  );
}
