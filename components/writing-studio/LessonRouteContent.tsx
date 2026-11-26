'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ScreenSkeleton } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { TASK1_MODULES, TASK1_VISUALS, TASK2_MODULES } from '@/lib/writing-studio/content';
import { getLesson } from '@/lib/writing-studio/lessons';
import { resolveLessonBack } from '@/lib/writing-studio/navigation';
import { localize, type TaskId } from '@/lib/writing-studio/types';
import { WsBackBar } from './nav/common';
import { LessonPreview } from './LessonPreview';
import { LessonRunner } from './LessonRunner';

const BUILT_LESSON: Record<TaskId, { id: string; label: string }> = {
  task1: { id: 'overview-writing', label: 'Writing a Strong Overview' },
  task2: { id: 'idea-development', label: 'Developing One Idea Fully' },
};

/** Resolves `[lessonId]` to a fully built lesson, a module/visual-area preview, or 404. (useSearchParams needs a Suspense boundary.) */
export function LessonRouteContent({ task, lessonId }: { task: TaskId; lessonId: string }) {
  return (
    <Suspense fallback={<ScreenSkeleton />}>
      <LessonRoute task={task} lessonId={lessonId} />
    </Suspense>
  );
}

function LessonRoute({ task, lessonId }: { task: TaskId; lessonId: string }) {
  const lesson = getLesson(lessonId);
  const { locale, hasChosen } = useLocale();
  const contentLocale: 'en' | 'bn' = task === 'task1' && !hasChosen ? 'bn' : locale;
  // The way back is the PARENT screen the lesson was opened from. `?from=` only ever selects one of a few fixed
  // destinations (never a URL), and a direct link with no origin returns to the lesson's own parent.
  const back = resolveLessonBack(task, lessonId, useSearchParams().get('from'));
  const academyHref = back.href;
  const academyLabel = localize(contentLocale, back.label);

  if (lesson) {
    if (lesson.task !== task) {
      return (
        <LessonPreview
          title={localize(contentLocale, lesson.title)}
          objective="This lesson belongs to the other Academy."
          academyHref={academyHref}
          academyLabel={academyLabel}
          builtLessonHref={`${academyHref}/lesson/${BUILT_LESSON[task].id}`}
          builtLessonLabel={BUILT_LESSON[task].label}
        />
      );
    }
    return (
      <div className="mx-auto max-w-3xl space-y-2">
        <WsBackBar href={academyHref} label={academyLabel} />
        <LessonRunner lesson={lesson} academyHref={academyHref} backLabel={`${contentLocale === 'bn' ? 'ফিরে যান' : 'Back to'} ${academyLabel}`} />
      </div>
    );
  }

  const candidates = task === 'task1' ? [...TASK1_MODULES, ...TASK1_VISUALS] : TASK2_MODULES;
  const found = candidates.find((c) => c.id === lessonId);
  if (!found) return <LessonPreview title="Lesson not found" objective="This lesson id does not exist in the prototype curriculum." academyHref={academyHref} academyLabel={academyLabel} builtLessonHref={`${academyHref}/lesson/${BUILT_LESSON[task].id}`} builtLessonLabel={BUILT_LESSON[task].label} />;

  return (
    <LessonPreview
      title={localize(contentLocale, found.title)}
      objective={localize(contentLocale, found.description)}
      academyHref={academyHref}
      academyLabel={academyLabel}
      builtLessonHref={`${academyHref}/lesson/${BUILT_LESSON[task].id}`}
      builtLessonLabel={BUILT_LESSON[task].label}
    />
  );
}
