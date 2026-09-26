'use client';

import { notFound, useParams } from 'next/navigation';
import { ScreenSkeleton } from '@/components/ds';
import { LessonPlayer } from '@/components/foundation/LessonPlayer';
import { useProfile } from '@/components/providers/ProfileProvider';
import { findLesson } from '@/lib/foundation';

export default function FoundationLessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { profile } = useProfile();
  const found = findLesson(lessonId);
  if (!found) notFound();
  if (!profile) return <ScreenSkeleton />;
  return <LessonPlayer key={lessonId} module={found.module} lesson={found.lesson} />;
}
