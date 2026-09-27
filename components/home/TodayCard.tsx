'use client';

import Link from 'next/link';
import { ArrowRight, BookText, BrainCircuit, Check, Clock, Mic, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel, StatusChip } from '@/components/ds';
import { useBrainContext } from '@/components/brain/useBrainContext';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { buildDailyPlan, dailyPlanState, setPlanMode, type DailyPlanState, type DailyTaskKind } from '@/lib/engine';
import type { UserProfile } from '@/lib/models';
import { cn } from '@/lib/utils';

const ICONS: Record<DailyTaskKind, typeof BookText> = {
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

/** "What should I do today?" Tasks tick themselves off as the student completes them. */
export function TodayCard({ profile }: { profile: UserProfile }) {
  const { t, n } = useLocale();
  const { updateProfile } = useProfile();
  const brain = useBrainContext();
  const plan = buildDailyPlan(profile, brain);
  const doneCount = plan.tasks.filter((task) => task.done).length;
  const next = plan.tasks.find((task) => !task.done);
  const state = dailyPlanState(plan, profile);
  // After today's plan: the next useful thing (words due for review, else more IELTS practice).
  const after = brain.due > 0 ? { href: '/review', key: 'home.todayNextReview' } : { href: '/ielts', key: 'home.todayNextPractice' };

  return (
    <Panel className="space-y-4 p-0">
      <div className="flex items-center justify-between gap-3 px-5 pt-5">
        <h2 className="text-lg font-semibold">{t('home.today')}</h2>
        {plan.mode !== 'normal' ? (
          <StatusChip tone="brand">{t(`plan.mode.${plan.mode}`)}</StatusChip>
        ) : (
          <span className="text-sm text-muted-foreground tabular-nums">
            {n(doneCount)}/{n(plan.tasks.length)}
          </span>
        )}
      </div>

      <ul className="divide-y border-y">
        {plan.tasks.map((task) => {
          const Icon = ICONS[task.kind];
          return (
            <li key={task.kind}>
              <Link href={task.href} className="flex items-center gap-3.5 px-5 py-3 transition-colors hover:bg-muted/60">
                <span
                  className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-full',
                    task.done ? 'bg-success text-white' : 'bg-brand-soft text-brand',
                  )}
                  aria-hidden
                >
                  {task.done ? <Check className="size-4" /> : <Icon className="size-4" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={cn('block font-medium', task.done && 'text-muted-foreground line-through')}>{t(task.titleKey)}</span>
                  <span className="block text-sm text-muted-foreground">{t(task.detailKey, task.detailVars)}</span>
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

      <div className="space-y-3 px-5 pb-5">
        <p className={cn('text-sm', state === 'completed' ? 'font-medium text-success' : 'text-muted-foreground')} aria-live="polite" data-testid="today-status">
          {state === 'completed' ? t('home.todayCompleted') : t('home.todaySummary', { done: doneCount, total: plan.tasks.length })}
        </p>
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
        <Button
          variant="ghost"
          className="w-full text-muted-foreground"
          onClick={() => updateProfile((p) => setPlanMode(p, plan.mode === 'minimum' ? 'normal' : 'minimum'))}
        >
          {plan.mode === 'minimum' ? t('home.fullPlan') : t('home.minimumDay')}
        </Button>
      </div>
    </Panel>
  );
}
