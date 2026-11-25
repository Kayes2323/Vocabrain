'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { TASK1_MODULES, TASK1_VISUALS, TASK2_MODULES } from '@/lib/writing-studio/content';
import { getLesson } from '@/lib/writing-studio/lessons';
import { localize, type TaskId } from '@/lib/writing-studio/types';
import { LessonPreview } from './LessonPreview';
import { LessonRunner } from './LessonRunner';

const BUILT_LESSON: Record<TaskId, { id: string; label: string }> = {
  task1: { id: 'overview-writing', label: 'Writing a Strong Overview' },
  task2: { id: 'idea-development', label: 'Developing One Idea Fully' },
};

/** Resolves `[lessonId]` to a fully built lesson, a module/visual-area preview, or 404. */
export function LessonRouteContent({ task, lessonId }: { task: TaskId; lessonId: string }) {
  const lesson = getLesson(lessonId);
  const { locale, hasChosen } = useLocale();
  const contentLocale: 'en' | 'bn' = task === 'task1' && !hasChosen ? 'bn' : locale;
  const academyHref = `/ielts/writing-studio/${task}`;
  const academyLabel = task === 'task1' ? 'Task 1 Academy' : 'Task 2 Academy';

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
    return <LessonRunner lesson={lesson} academyHref={academyHref} />;
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
