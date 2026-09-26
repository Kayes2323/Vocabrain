'use client';

import { notFound, useParams } from 'next/navigation';
import { ScreenSkeleton } from '@/components/ds';
import { LessonPlayer } from '@/components/foundation/LessonPlayer';
import { useFoundation } from '@/components/foundation/useFoundation';
import { findLesson } from '@/lib/foundation';

export default function FoundationLessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { fp } = useFoundation();
  const found = findLesson(lessonId);
  if (!found) notFound();
  if (!fp) return <ScreenSkeleton />;
  // Guide, don't block: every lesson opens. The module page reminds the
  // student when they jump ahead of the recommended order.
  return <LessonPlayer key={lessonId} module={found.module} lesson={found.lesson} />;
}
