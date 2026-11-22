'use client';

import { notFound, useParams, useRouter } from 'next/navigation';
import { ScreenSkeleton } from '@/components/ds';
import { findLesson } from '@/lib/listening';
import { LessonStageRunner } from '@/components/listening/LessonStageRunner';
import { useListening } from '@/components/listening/useListening';

export default function ListeningLessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const router = useRouter();
  const { progress, visitStage } = useListening();
  if (!lessonId || !progress) return <ScreenSkeleton />;
  const found = findLesson(lessonId);
  if (!found) notFound();

  return (
    <LessonStageRunner
      lesson={found.lesson}
      onStageVisited={(stageId) => visitStage(found.lesson.id, stageId)}
      onLessonComplete={() => router.push(`/ielts/listening/module/${found.module.id}`)}
    />
  );
}
