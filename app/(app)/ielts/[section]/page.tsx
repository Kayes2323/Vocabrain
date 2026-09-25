'use client';

import { notFound, useParams } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { PlannedSection } from '@/components/sections/PlannedSection';
import { IELTS_SECTIONS, findSection } from '@/lib/navigation';

export default function IELTSSectionPage() {
  const { section: id } = useParams<{ section: string }>();
  const { t } = useLocale();
  const section = findSection(IELTS_SECTIONS, id);
  if (!section) notFound();

  return (
    <PlannedSection
      section={section}
      backHref="/ielts"
      backLabel={t('nav.ielts')}
      meanwhile={{ labelKey: 'planned.meanwhileVocabulary', href: '/ielts/vocabulary' }}
    />
  );
}
