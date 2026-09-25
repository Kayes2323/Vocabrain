'use client';

import Link from 'next/link';
import { ArrowRight, Check, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { buildDailyPlan, setPlanMode, toggleTask } from '@/lib/engine';
import type { UserProfile } from '@/lib/models';
import { cn } from '@/lib/utils';

/** "What should I do today?" A short checklist the student ticks off. */
export function TodayCard({ profile }: { profile: UserProfile }) {
  const { t } = useLocale();
  const { updateProfile } = useProfile();
  const plan = buildDailyPlan(profile);
  const doneCount = plan.tasks.filter((task) => plan.done.includes(task.kind)).length;
  const next = plan.tasks.find((task) => !plan.done.includes(task.kind));

  return (
    <Panel className="space-y-4 p-0">
      <div className="flex items-center justify-between gap-3 px-5 pt-5">
        <h2 className="text-lg font-semibold">{t('home.today')}</h2>
        {plan.mode !== 'normal' && <StatusChip tone="brand">{t(`plan.mode.${plan.mode}`)}</StatusChip>}
      </div>

      <ul className="divide-y border-y">
        {plan.tasks.map((task) => {
          const done = plan.done.includes(task.kind);
          const title = t(task.titleKey);
          return (
            <li key={task.kind} className="flex items-center gap-3 px-5 py-3">
              <button
                type="button"
                role="checkbox"
                aria-checked={done}
                aria-label={t('home.markDone', { task: title })}
                onClick={() => updateProfile((p) => toggleTask(p, buildDailyPlan(p), task.kind))}
                className={cn(
                  'flex size-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40',
                  done ? 'border-success bg-success text-white' : 'border-input hover:border-foreground/40',
                )}
              >
                {done && <Check className="size-4" />}
              </button>
              <Link href={task.href} className="flex min-w-0 flex-1 items-center justify-between gap-3">
                <span className={cn('font-medium', done && 'text-muted-foreground line-through')}>{title}</span>
                <span className="inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground tabular-nums">
                  <Clock className="size-3.5" aria-hidden />
                  {t('common.minutes', { n: task.minutes })}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="space-y-3 px-5 pb-5">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {next ? t('home.todaySummary', { done: doneCount, total: plan.tasks.length }) : t('home.allDone')}
        </p>
        {next && (
          <Button asChild size="lg" className="w-full">
            <Link href={next.href}>
              {doneCount === 0 ? t('home.startPlan') : t('home.continuePlan')} <ArrowRight />
            </Link>
          </Button>
        )}
        <Button
          variant="ghost"
          className="w-full text-muted-foreground"
          onClick={() =>
            updateProfile((p) => setPlanMode(p, buildDailyPlan(p), plan.mode === 'minimum' ? 'normal' : 'minimum'))
          }
        >
          {plan.mode === 'minimum' ? t('home.fullPlan') : t('home.minimumDay')}
        </Button>
      </div>
    </Panel>
  );
}
