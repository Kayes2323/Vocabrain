'use client';

import { notFound, redirect, useParams } from 'next/navigation';
import { ScreenSkeleton } from '@/components/ds';
import { PracticeSession } from '@/components/foundation/PracticeSession';
import { useFoundation } from '@/components/foundation/useFoundation';
import { getModule, ownMistakeQuestions } from '@/lib/foundation';

/** Common Mistakes Lab: the student's own recent mistakes, before the stations. */
export default function FoundationOwnMistakesPage() {
  const { moduleId, unitId } = useParams<{ moduleId: string; unitId: string }>();
  const { fp } = useFoundation();
  const module = getModule(moduleId);
  const unit = module?.units?.find((u) => u.id === unitId);
  if (!module || unit?.id !== 'lab') notFound();
  if (!fp) return <ScreenSkeleton />;
  if (ownMistakeQuestions(fp).length < 3) redirect(`/ielts/foundation/${module.id}/${unit.id}`);
  return <PracticeSession key="mine" mode={{ kind: 'mine' }} fp={fp} />;
}
