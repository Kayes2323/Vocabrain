'use client';

import Link from 'next/link';
import { ArrowRight, Check, ClipboardCheck, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ListRow, PageHeader, ProgressBar, RowGroup, ScreenSkeleton, Section } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { ieltsJourney } from '@/lib/engine';
import { canQuiz, findLesson, getModule, lessonHref, lessonState, nextLesson, stepBeforeLesson, type CurriculumStep } from '@/lib/foundation';
import { cn } from '@/lib/utils';
import { ModuleExtras } from './ModuleView';
import { CARD } from './TopicCards';
import { UnitsDashboard } from './UnitsDashboard';
import { useFoundation, useText } from './useFoundation';

/**
 * A Foundation topic page: its lessons as cards, in order. One tap on a card
 * opens the lesson. Below: the extra practice of the module behind the topic.
 */
export function TopicView({ topic }: { topic: CurriculumStep }) {
  const { t, n } = useLocale();
  const text = useText();
  const { profile, fp } = useFoundation();
  if (!profile || !fp) return <ScreenSkeleton />;

  const status = ieltsJourney(profile)
    .stages.flatMap((s) => s.steps)
    .find((s) => s.step.id === topic.id)!;
  const lessons = topic.lessons ?? [];
  const next = nextLesson(fp);
  const skipped = new Set(fp.diagnostic?.skippedLessons ?? []);
  // The lesson to do next here: the path's next lesson, else the first one not done.
  const nextHere = lessons.includes(next?.lesson.id ?? '') ? next!.lesson.id : lessons.find((id) => !fp.lessons[id] && !skipped.has(id));
  const pct = Math.round(status.progress * 100);

  // Extra practice: the module with this topic's name, and Parts of Speech units the lessons come from.
  const module = getModule(topic.id);
  const units = [
    ...new Map(
      lessons
        .map((id) => findLesson(id)!)
        .filter((f) => f.module.units && f.lesson.unit && f.module.id !== topic.id)
        .map((f) => [f.lesson.unit!, { module: f.module, unit: f.module.units!.find((u) => u.id === f.lesson.unit)! }]),
    ).values(),
  ];

  return (
    <div className="space-y-6" data-testid="topic-page" data-topic={topic.id}>
      <PageHeader title={text(topic.title)} subtitle={text(topic.why)} backHref="/ielts/foundation" backLabel={t('foundation.topicPage.back')} />

      <div className="-mt-2 space-y-2" data-testid="topic-progress">
        <div className="flex items-baseline justify-between gap-3 text-sm tabular-nums">
          <span className="text-muted-foreground">{t('foundation.topicCards.lessons', { done: n(status.lessonsDone), total: n(status.lessonsTotal) })}</span>
          <span className="font-semibold">{status.state === 'done' ? t('foundation.topicCards.completed') : `${n(pct)}%`}</span>
        </div>
        <ProgressBar value={pct} label={text(topic.title)} size="sm" />
      </div>

      <ol className="space-y-2.5" data-testid="lesson-cards">
        {lessons.map((id) => {
          const { module: m, lesson } = findLesson(id)!;
          const state = lessonState(m, lesson, fp);
          const isNext = id === nextHere;
          const locked = state === 'locked' && !isNext;
          const before = locked ? stepBeforeLesson(m, lesson, fp) : undefined;
          const done = state === 'done' || state === 'skipped';
          return (
            <li key={id}>
              <Link
                href={lessonHref(id)}
                className={cn(CARD, 'flex items-center gap-3.5 px-4 py-3.5', isNext && 'border-brand/35 ring-1 ring-brand/10')}
                data-lesson-card={id}
                data-state={isNext && !done ? 'current' : state}
              >
                <span
                  aria-hidden
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-full',
                    state === 'done' && 'bg-success-soft text-success',
                    state === 'skipped' && 'bg-muted text-muted-foreground',
                    !done && isNext && 'bg-brand-soft text-brand',
                    !done && !isNext && 'bg-muted text-muted-foreground',
                  )}
                >
                  {done ? <Check className="size-4" /> : locked ? <Lock className="size-3.5" /> : lesson.kind === 'test' ? <ClipboardCheck className="size-4" /> : <span className={cn('size-2.5 rounded-full border-2', isNext ? 'border-brand bg-brand' : 'border-muted-foreground/50')} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={cn('block text-[15px] leading-snug', isNext ? 'font-semibold' : done ? 'text-foreground/75' : 'font-medium', locked && 'text-foreground/70')}>{text(lesson.title)}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {locked && before
                      ? t('foundation.topicPage.after', { lesson: text(before.title) })
                      : state === 'skipped'
                        ? t('foundation.topicCards.skipped')
                        : `${t('common.minutes', { n: n(lesson.minutes) })}${lesson.kind === 'test' ? ` · ${t('foundation.topicCards.test')}` : ''}`}
                  </span>
                </span>
                {isNext && !done && <span className="shrink-0 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand">{fp.inProgress?.lessonId === id || status.lessonsDone > 0 ? t('foundation.topicCards.continue') : t('foundation.topicCards.start')}</span>}
                <ArrowRight aria-hidden className="size-5 shrink-0 text-muted-foreground" />
              </Link>
            </li>
          );
        })}
      </ol>

      {module && !module.units && (
        <div className="space-y-3" data-testid="topic-more">
          <ModuleExtras module={module} part="pattern" />
          {canQuiz(fp, module) && (
            <Button asChild variant="outline" className="h-11 w-full sm:w-auto">
              <Link href={`/ielts/foundation/quiz/${module.id}`}>{t('foundation.action.takeQuiz')}</Link>
            </Button>
          )}
          <ModuleExtras module={module} part="more" />
        </div>
      )}

      {units.length > 0 && (
        <Section title={t('foundation.topicPage.more')} variant="label">
          <RowGroup>
            {units.map(({ module: m, unit }) => (
              <ListRow key={unit.id} href={`/ielts/foundation/${m.id}/${unit.id}`} icon={ClipboardCheck} iconTone="brand" title={t('foundation.topicPage.unit', { unit: text(unit.title) })} />
            ))}
          </RowGroup>
        </Section>
      )}

      {module?.units && (
        <Section title={t('foundation.topicPage.allUnits')} variant="label">
          <UnitsDashboard module={module} embedded />
        </Section>
      )}
    </div>
  );
}
