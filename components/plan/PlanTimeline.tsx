'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { ProgressBar, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { planDay, planDates, planProgress, type ActivityContext } from '@/lib/engine';
import type { MyPlan } from '@/lib/models';
import { cn } from '@/lib/utils';
import { nextStudyDay, STATE_TONE, useDayText } from './PlanDay';
import { usePlanText } from './PlanParts';

/** "What do I do today?": today's tasks at a glance, with the way in. */
export function TodayCard({ plan, ctx }: { plan: MyPlan; ctx: ActivityContext }) {
  const { t, n } = useLocale();
  const { weekday, dayMonth } = useDayText();
  const { duration } = usePlanText();
  const inPlan = planDates(plan).includes(ctx.today);
  if (!inPlan) return null;
  const view = planDay(plan, ctx.today, ctx);
  const href = `/ielts/plan/day/${ctx.today}`;
  const study = view.tasks.length > 0;
  const upcoming = !study ? nextStudyDay(plan, ctx.today) : undefined;
  return (
    <Link href={href} className="block rounded-2xl border border-brand/30 bg-brand-soft/40 p-4 transition-colors hover:bg-brand-soft/70" data-testid="plan-today" data-state={view.state}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-lg font-semibold">{t('planDay.todayTitle')}</p>
          <p className="text-sm text-muted-foreground">
            {weekday(ctx.today)}, {dayMonth(ctx.today)}
            {study && <span className="tabular-nums"> • {duration(view.minutes)}</span>}
          </p>
        </div>
        <StatusChip tone={STATE_TONE[view.state]}>{t(`planDay.states.${view.state}`)}</StatusChip>
      </div>
      {study ? (
        <>
          <ul className="mt-3 space-y-1.5">
            {view.tasks.map((task, i) => (
              <li key={i} className="flex items-center gap-2 text-sm" data-today-task={task.kind} data-status={task.status}>
                <span aria-hidden className="w-4 text-center">
                  {task.status === 'done' ? <Check className="size-4 text-success" /> : task.status === 'partial' ? '◐' : '○'}
                </span>
                <span className={cn('flex-1 truncate', task.status === 'done' && 'text-muted-foreground line-through')}>{t(`planDay.kinds.${task.kind}`)}</span>
                <span className="text-muted-foreground tabular-nums">{t('myPlan.dur.min', { n: n(task.minutes) })}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex items-center justify-between gap-2 text-sm font-semibold text-brand">
            <span className="tabular-nums">{t('planDay.tasksDone', { done: n(view.done), total: n(view.tasks.length) })}</span>
            {view.state !== 'done' && (
              <span className="flex items-center gap-1">
                {view.done > 0 || view.tasks.some((x) => x.status === 'partial') ? t('planDay.continue') : t('planDay.start')} <ArrowRight className="size-4" aria-hidden />
              </span>
            )}
          </p>
        </>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">
          {view.state === 'test' ? t('planDay.testDayBody') : t('planDay.restToday')}
          {upcoming && ` ${t('planDay.nextStudy', { date: `${weekday(upcoming)}, ${dayMonth(upcoming)}` })}`}
        </p>
      )}
    </Link>
  );
}

/** Tasks done so far across the plan. */
export function PlanProgressLine({ plan, ctx }: { plan: MyPlan; ctx: ActivityContext }) {
  const { t, n } = useLocale();
  const p = planProgress(plan, ctx);
  if (!p.total) return null;
  return (
    <div className="space-y-1.5 px-1" data-testid="plan-progress" data-done={p.done} data-total={p.total}>
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="font-medium tabular-nums">{t('planDay.progress', { done: n(p.done), total: n(p.total) })}</span>
        <span className="text-muted-foreground tabular-nums">{t('planDay.daysDone', { n: n(p.daysStudied) })}</span>
      </div>
      <ProgressBar value={(p.done / p.total) * 100} label={t('planDay.progress', { done: n(p.done), total: n(p.total) })} size="sm" />
    </div>
  );
}

const PAST = 3;
const AHEAD = 7;
const STEP = 14;

/** Day by day from the start to the test: a window around today that can be widened. */
export function PlanTimeline({ plan, ctx }: { plan: MyPlan; ctx: ActivityContext }) {
  const { t, n } = useLocale();
  const { shortWeekday, dayMonth } = useDayText();
  const dates = planDates(plan);
  const anchor = Math.max(0, dates.findIndex((d) => d >= ctx.today));
  const at = dates.includes(ctx.today) ? anchor : ctx.today > plan.targetDate ? dates.length - 1 : 0;
  const [range, setRange] = useState({ before: PAST, after: AHEAD });
  const from = Math.max(0, at - range.before);
  const to = Math.min(dates.length, at + range.after);
  const shown = dates.slice(from, to);

  return (
    <section className="space-y-2" aria-labelledby="plan-timeline" data-testid="plan-timeline">
      <h2 id="plan-timeline" className="px-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {t('planDay.timeline')}
      </h2>
      {from > 0 && (
        <button type="button" className="h-10 w-full rounded-xl text-sm font-medium text-brand hover:bg-muted/60" onClick={() => setRange((r) => ({ ...r, before: r.before + STEP }))} data-testid="timeline-earlier">
          {t('planDay.earlier')}
        </button>
      )}
      <ol className="relative space-y-1.5 before:absolute before:top-3 before:bottom-3 before:left-[23px] before:w-px before:bg-border">
        {shown.map((date) => {
          const v = planDay(plan, date, ctx);
          const quiet = v.state === 'rest';
          const today = date === ctx.today;
          return (
            <li key={date} className="relative">
              <Link
                href={`/ielts/plan/day/${date}`}
                className={cn(
                  'flex min-h-14 items-center gap-3 rounded-2xl border bg-card px-3 py-2 transition-colors hover:bg-muted/60',
                  today && 'border-brand/50 ring-1 ring-brand/30',
                  quiet && 'border-transparent bg-transparent',
                  v.state === 'test' && 'border-brand/40 bg-brand-soft/40',
                )}
                data-day={date}
                data-state={v.state}
              >
                <span className={cn('z-10 flex w-6 shrink-0 flex-col items-center text-center text-[11px] leading-tight font-semibold uppercase', today ? 'text-brand' : 'text-muted-foreground')}>
                  {shortWeekday(date)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={cn('text-sm font-semibold tabular-nums', quiet && 'font-normal text-muted-foreground')}>
                    {dayMonth(date)}
                    {today && <span className="ml-2 text-brand">• {t('planDay.states.today')}</span>}
                  </p>
                  {v.tasks.length > 0 ? (
                    <p className="text-xs text-muted-foreground tabular-nums">
                      {t('myPlan.dur.min', { n: n(v.minutes) })} • {v.done > 0 ? t('planDay.tasksDone', { done: n(v.done), total: n(v.tasks.length) }) : t('planDay.tasksN', { n: n(v.tasks.length) })}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">{v.state === 'test' ? t('planDay.testDay') : t('planDay.rest')}</p>
                  )}
                </div>
                {today && v.tasks.length > 0 && v.state !== 'done' ? (
                  <span className="shrink-0 text-sm font-semibold text-brand">{v.done > 0 ? t('planDay.continue') : t('planDay.start')}</span>
                ) : (
                  !quiet && v.state !== 'upcoming' && <StatusChip tone={STATE_TONE[v.state]}>{t(`planDay.states.${v.state}`)}</StatusChip>
                )}
                <ChevronRight className="size-4 shrink-0 text-muted-foreground/70" aria-hidden />
              </Link>
            </li>
          );
        })}
      </ol>
      {to < dates.length && (
        <button type="button" className="h-10 w-full rounded-xl text-sm font-medium text-brand hover:bg-muted/60" onClick={() => setRange((r) => ({ ...r, after: r.after + STEP }))} data-testid="timeline-later">
          {t('planDay.later')}
        </button>
      )}
    </section>
  );
}
