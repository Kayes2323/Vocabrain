'use client';

import { notFound, useParams } from 'next/navigation';
import { ScreenSkeleton } from '@/components/ds';
import { LessonPlayer } from '@/components/foundation/LessonPlayer';
import { UnitView } from '@/components/foundation/UnitView';
import { useFoundation } from '@/components/foundation/useFoundation';
import { findLesson, getModule, getTopic, lessonBySlug } from '@/lib/foundation';

/** A lesson inside its topic (/ielts/foundation/<topic>/<lesson>), or a Parts of Speech unit page. */
export default function FoundationUnitPage() {
  const { moduleId, unitId } = useParams<{ moduleId: string; unitId: string }>();
  const { fp } = useFoundation();
  const topic = getTopic(moduleId);
  const lessonId = topic ? lessonBySlug(topic, unitId) : undefined;
  if (lessonId) {
    const found = findLesson(lessonId)!;
    if (!fp) return <ScreenSkeleton />;
    return <LessonPlayer key={lessonId} module={found.module} lesson={found.lesson} />;
  }
  const module = getModule(moduleId);
  const unit = module?.units?.find((u) => u.id === unitId);
  if (!module || !unit) notFound();
  return <UnitView module={module} unit={unit} />;
}
