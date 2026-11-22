'use client';

import { useParams } from 'next/navigation';
import { LessonRouteContent } from '@/components/writing-studio/LessonRouteContent';

export default function Task1LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  return <LessonRouteContent task="task1" lessonId={lessonId} />;
}
