'use client';

import { useEffect } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { ScreenSkeleton } from '@/components/ds';
import { LessonPlayer } from '@/components/foundation/LessonPlayer';
import { UnitView } from '@/components/foundation/UnitView';
import { useFoundation } from '@/components/foundation/useFoundation';
import { findLesson, getModule, getTopic, LEGACY_TOPICS, lessonBySlug, lessonBySlugAnywhere, lessonHref } from '@/lib/foundation';

/** A lesson inside its topic (/ielts/foundation/<topic>/<lesson>), or a Parts of Speech unit page. */
export default function FoundationUnitPage() {
  const { moduleId, unitId } = useParams<{ moduleId: string; unitId: string }>();
  const router = useRouter();
  const { fp } = useFoundation();
  const topic = getTopic(moduleId);
  const lessonId = topic ? lessonBySlug(topic, unitId) : undefined;
  const module = getModule(moduleId);
  const unit = module?.units?.find((u) => u.id === unitId);
  // A saved link to a lesson that has since moved to another topic opens it in its new place.
  const moved = !lessonId && !unit && (topic || LEGACY_TOPICS[moduleId]) ? lessonBySlugAnywhere(unitId) : undefined;
  useEffect(() => {
    if (moved) router.replace(lessonHref(moved));
  }, [moved, router]);
  if (lessonId) {
    const found = findLesson(lessonId)!;
    if (!fp) return <ScreenSkeleton />;
    return <LessonPlayer key={lessonId} module={found.module} lesson={found.lesson} />;
  }
  if (moved) return <ScreenSkeleton />;
  if (!module || !unit) notFound();
  return <UnitView module={module} unit={unit} />;
}
