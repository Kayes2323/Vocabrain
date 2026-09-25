'use client';

import { notFound, useParams } from 'next/navigation';
import { PlannedSection } from '@/components/sections/PlannedSection';
import { IELTS_SECTIONS, findSection } from '@/lib/navigation';

export default function IELTSSectionPage() {
  const { section: id } = useParams<{ section: string }>();
  const section = findSection(IELTS_SECTIONS, id);
  if (!section) notFound();

  return (
    <PlannedSection
      section={section}
      backHref="/ielts"
      backLabel="IELTS"
      meanwhile={{ label: 'Practise vocabulary', href: '/ielts/vocabulary' }}
    />
  );
}
