'use client';

import Link from 'next/link';
import { ArrowRight, BookText, BrainCircuit, Check, Clock, GraduationCap, Mic, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel, ProgressBar, StatusChip } from '@/components/ds';
import { useBrainContext } from '@/components/brain/useBrainContext';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { buildDailyPlan, dailyPlanState, setPlanMode, type DailyPlanState, type DailyTaskKind, type PlanTask } from '@/lib/engine';
import { findLesson } from '@/lib/foundation';
import type { UserProfile } from '@/lib/models';
import { cn } from '@/lib/utils';

const ICONS: Record<DailyTaskKind, typeof BookText> = {
  lesson: GraduationCap,
  vocabulary: BrainCircuit,
  reading: BookText,
  writing: PenLine,
  speaking: Mic,
};

const CTA: Record<Exclude<DailyPlanState, 'completed'>, string> = {
  'not-started': 'home.todayStart',
  'in-progress': 'home.todayContinue',
  finishing: 'home.todayFinish',
};

/** Today's learning (its own page, opened from Quick access). Tasks tick themselves off as the student completes them. */
export function TodayCard({ profile }: { profile: UserProfile }) {
  const { t, n, locale } = useLocale();
  const { updateProfile } = useProfile();
  // Lesson tasks name the lesson in the student's language.
  const detail = (task: PlanTask) => {
    const title = task.lessonId ? findLesson(task.lessonId)?.lesson.title : undefined;
    return t(task.detailKey, title ? { ...task.detailVars, lesson: title[locale === 'bn' ? 'bn' : 'en'] } : task.detailVars);
  };
  const brain = useBrainContext();
  const plan = buildDailyPlan(profile, brain);
  const doneCount = plan.tasks.filter((task) => task.done).length;
  const next = plan.tasks.find((task) => !task.done);
  const state = dailyPlanState(plan, profile);
  // After today's plan: the next useful thing (words due for review, else more IELTS practice).
  const after = brain.due > 0 ? { href: '/review', key: 'home.todayNextReview' } : { href: '/ielts', key: 'home.todayNextPractice' };

  const minutes = plan.tasks.reduce((sum, task) => sum + task.minutes, 0);

  return (
    <div className="space-y-4" data-testid="today-card">
      <Panel className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground" data-testid="today-time">
              <Clock className="size-4" aria-hidden />
              {t('home.todayTime', { n: n(minutes) })}
            </span>
            {plan.mode !== 'normal' ? (
              <StatusChip tone="brand">{t(`plan.mode.${plan.mode}`)}</StatusChip>
            ) : (
              <span className="text-sm font-medium tabular-nums" data-testid="today-progress">
                {t('home.todayProgress', { done: n(doneCount), total: n(plan.tasks.length) })}
              </span>
            )}
          </div>
          <ProgressBar value={plan.tasks.length ? Math.round((doneCount / plan.tasks.length) * 100) : 0} label={t('home.today')} />
          {state === 'completed' && (
            <p className="text-sm font-medium text-success" aria-live="polite" data-testid="today-status">
              {t('home.todayCompleted')}
            </p>
          )}
        </div>

        {next && state !== 'completed' ? (
          <Button asChild size="lg" className="w-full">
            <Link href={next.href} data-testid="today-cta" data-state={state}>
              {t(CTA[state])} <ArrowRight />
            </Link>
          </Button>
        ) : (
          <Button asChild size="lg" variant="outline" className="w-full">
            <Link href={after.href} data-testid="today-cta" data-state="completed">
              {t(after.key)} <ArrowRight />
            </Link>
          </Button>
        )}
      </Panel>

      <Panel className="p-0">
        <ul className="divide-y">
          {plan.tasks.map((task) => {
            const Icon = ICONS[task.kind];
            return (
              <li key={task.kind}>
                <Link href={task.href} className="flex items-center gap-3.5 px-5 py-3.5 transition-colors hover:bg-muted/60" data-task={task.kind} data-done={task.done}>
                  <span
                    className={cn('flex size-10 shrink-0 items-center justify-center rounded-full', task.done ? 'bg-success text-white' : 'bg-brand-soft text-brand')}
                    aria-hidden
                  >
                    {task.done ? <Check className="size-5" /> : <Icon className="size-5" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={cn('block font-medium', task.done && 'text-muted-foreground line-through')}>{t(task.titleKey)}</span>
                    <span className="block text-sm text-muted-foreground">{detail(task)}</span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground tabular-nums">
                    <Clock className="size-3.5" aria-hidden />
                    {t('common.minutes', { n: task.minutes })}
                  </span>
                  <span className="sr-only">{task.done ? t('home.taskDone') : ''}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Panel>

      <Button
        variant="ghost"
        className="w-full text-muted-foreground"
        onClick={() => updateProfile((p) => setPlanMode(p, plan.mode === 'minimum' ? 'normal' : 'minimum'))}
      >
        {plan.mode === 'minimum' ? t('home.fullPlan') : t('home.minimumDay')}
      </Button>
    </div>
  );
}
