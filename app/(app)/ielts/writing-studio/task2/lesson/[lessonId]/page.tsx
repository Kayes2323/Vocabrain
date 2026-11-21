'use client';

import { useParams } from 'next/navigation';
import { LessonRouteContent } from '@/components/writing-studio/LessonRouteContent';

export default function Task2LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  return <LessonRouteContent task="task2" lessonId={lessonId} />;
}
