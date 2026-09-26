'use client';

import { notFound, useParams } from 'next/navigation';
import { ScreenSkeleton } from '@/components/ds';
import { PracticeSession } from '@/components/foundation/PracticeSession';
import { useFoundation } from '@/components/foundation/useFoundation';
import { getConcept } from '@/lib/foundation';

export default function FoundationReviewPage() {
  const { concept } = useParams<{ concept: string }>();
  const { fp } = useFoundation();
  if (!getConcept(concept)) notFound();
  if (!fp) return <ScreenSkeleton />;
  return <PracticeSession key={concept} mode={{ kind: 'review', concept }} fp={fp} />;
}
