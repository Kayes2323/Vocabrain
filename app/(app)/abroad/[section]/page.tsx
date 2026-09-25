'use client';

import { notFound, useParams } from 'next/navigation';
import { PlannedSection } from '@/components/sections/PlannedSection';
import { ABROAD_SECTIONS, findSection } from '@/lib/navigation';

export default function AbroadSectionPage() {
  const { section: id } = useParams<{ section: string }>();
  const section = findSection(ABROAD_SECTIONS, id);
  if (!section) notFound();

  return (
    <PlannedSection
      section={section}
      backHref="/abroad"
      backLabel="Study Abroad"
      meanwhile={{ label: 'Explore destinations', href: '/abroad/countries' }}
    />
  );
}
