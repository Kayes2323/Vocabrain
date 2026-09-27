'use client';

import Link from 'next/link';
import { ArrowRight, BookText, BrainCircuit, Check, ChevronDown, Clock, Mic, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel, ProgressBar, StatusChip } from '@/components/ds';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
    <Panel className="space-y-4" data-testid="today-card">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">{t('home.today')}</h2>
          {plan.mode !== 'normal' ? (
            <StatusChip tone="brand">{t(`plan.mode.${plan.mode}`)}</StatusChip>
          ) : (
            <span className="text-sm text-muted-foreground tabular-nums" data-testid="today-progress">
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

      {/* The four tasks stay one tap away instead of filling the screen. */}
      <Collapsible>
        <CollapsibleTrigger className="group flex w-full items-center justify-between gap-3 text-left text-sm font-medium text-muted-foreground hover:text-foreground" data-testid="today-details">
          <span>{t('home.todayDetails')}</span>
          <ChevronDown className="size-4 shrink-0 transition-transform group-data-[state=open]:rotate-180" aria-hidden />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          <ul className="-mx-2 space-y-0.5">
            {plan.tasks.map((task) => {
              const Icon = ICONS[task.kind];
              return (
                <li key={task.kind}>
                  <Link href={task.href} className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-muted/60" data-task={task.kind}>
                    <span
                      className={cn('flex size-8 shrink-0 items-center justify-center rounded-full', task.done ? 'bg-success text-white' : 'bg-brand-soft text-brand')}
                      aria-hidden
                    >
                      {task.done ? <Check className="size-4" /> : <Icon className="size-4" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn('block text-[15px] font-medium', task.done && 'text-muted-foreground line-through')}>{t(task.titleKey)}</span>
                      <span className="block text-xs text-muted-foreground">{t(task.detailKey, task.detailVars)}</span>
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground tabular-nums">
                      <Clock className="size-3.5" aria-hidden />
                      {t('common.minutes', { n: task.minutes })}
                    </span>
                    <span className="sr-only">{task.done ? t('home.taskDone') : ''}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 w-full text-muted-foreground"
            onClick={() => updateProfile((p) => setPlanMode(p, plan.mode === 'minimum' ? 'normal' : 'minimum'))}
          >
            {plan.mode === 'minimum' ? t('home.fullPlan') : t('home.minimumDay')}
          </Button>
        </CollapsibleContent>
      </Collapsible>
    </Panel>
  );
}
