'use client';

import Link from 'next/link';
import { Check, ChevronLeft, ChevronRight, Circle, CircleDot, Coffee, PartyPopper, SkipForward, Undo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader, Panel, ProgressBar, ScreenSkeleton, StatusChip } from '@/components/ds';
import type { Tone } from '@/components/ds/tone';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { addDays, isStudyDay, planDay, planDates, scheduleTo, setDaySkipped, taskHref, type DayState, type PlanDayView, type TaskStatus } from '@/lib/engine';
import { nextLesson } from '@/lib/foundation/progress';
import type { MyPlan, ScheduleTask, UserProfile } from '@/lib/models';
import { cn } from '@/lib/utils';
import { useText } from '@/components/foundation/useFoundation';
import { usePlanText } from './PlanParts';
import { usePlanActivity } from './usePlanActivity';

export const DATE_KEY = /^\d{4}-\d{2}-\d{2}$/;

export const STATE_TONE: Record<DayState, Tone> = {
  done: 'success',
  partial: 'warning',
  skipped: 'neutral',
  missed: 'danger',
  today: 'brand',
  upcoming: 'neutral',
  rest: 'neutral',
  test: 'brand',
};

/** Dates, weekdays and task wording for plan days. */
export function useDayText() {
  const { t, n, locale } = useLocale();
  const text = useText();
  const tag = locale === 'bn' ? 'bn-BD' : 'en-GB';
  const at = (key: string) => new Date(`${key}T00:00`);
  const weekday = (key: string) => at(key).toLocaleDateString(tag, { weekday: 'long' });
  const shortWeekday = (key: string) => at(key).toLocaleDateString(tag, { weekday: 'short' });
  const dayMonth = (key: string) => at(key).toLocaleDateString(tag, { day: 'numeric', month: 'short' });
  const detail = (task: ScheduleTask, profile: UserProfile, withNext = true) => {
    switch (task.kind) {
      case 'foundation': {
        const next = profile.foundation ? nextLesson(profile.foundation) : undefined;
        const count = task.count === 1 ? t('planDay.details.foundationOne') : t('planDay.details.foundation', { n: n(task.count) });
        return next && withNext ? `${count} • ${text(next.lesson.title)}` : count;
      }
      case 'mock':
        return task.full ? t('planDay.details.mockFull') : t('planDay.details.mockSection');
      default:
        return t(`planDay.details.${task.kind}`);
    }
  };
  return { weekday, shortWeekday, dayMonth, detail };
}

/** The first study day after `date`, if the plan has one. */
export function nextStudyDay(plan: MyPlan, date: string): string | undefined {
  for (let d = addDays(date, 1); d <= scheduleTo(plan); d = addDays(d, 1)) if (isStudyDay(plan, d)) return d;
  return undefined;
}

const STATUS_ICON: Record<TaskStatus, React.ReactNode> = {
  todo: <Circle className="size-5 text-muted-foreground/70" aria-hidden />,
  partial: <CircleDot className="size-5 text-warning" aria-hidden />,
  done: <Check className="size-5 text-success" aria-hidden />,
};

/** One task: status mark, what to do, minutes and (today) where to do it. */
function TaskCard({ task, date, today, profile }: { task: PlanDayView['tasks'][number]; date: string; today: boolean; profile: UserProfile }) {
  const { t, n } = useLocale();
  const { detail } = useDayText();
  return (
    <li className={cn('flex items-center gap-3 rounded-2xl border bg-card px-4 py-3', task.status === 'done' && 'bg-success-soft/40')} data-task={task.kind} data-status={task.status} data-date={date}>
      <span className="flex size-6 shrink-0 items-center justify-center" title={t(`planDay.status.${task.status}`)}>
        {STATUS_ICON[task.status]}
        <span className="sr-only">{t(`planDay.status.${task.status}`)}</span>
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex items-baseline gap-2 font-semibold">
          <span className="truncate">{t(`planDay.kinds.${task.kind}`)}</span>
          <span className="shrink-0 text-sm font-medium text-muted-foreground tabular-nums">{t('myPlan.dur.min', { n: n(task.minutes) })}</span>
        </p>
        <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{detail(task, profile, today && task.status !== 'done')}</p>
      </div>
      {today && task.status !== 'done' && (
        <Button asChild size="sm" variant={task.status === 'partial' ? 'default' : 'outline'} className="h-9 shrink-0">
          <Link href={taskHref(task, profile)} data-task-action={task.kind}>
            {task.status === 'partial' ? t('planDay.continue') : t('planDay.start')}
          </Link>
        </Button>
      )}
    </li>
  );
}

/** A day of the plan: tasks with live status, skip/undo for today, and day-to-day navigation. */
export function PlanDayScreen({ date }: { date: string }) {
  const { t, n } = useLocale();
  const { profile, updateProfile } = useProfile();
  const ctx = usePlanActivity();
  const { weekday, dayMonth } = useDayText();
  const { date: longDate, duration } = usePlanText();
  if (!profile || !ctx) return <ScreenSkeleton />;
  const plan = profile.ielts.plan;
  const back = <PageHeader title={t('myPlan.title')} backHref="/ielts/plan" backLabel={t('myPlan.title')} />;
  if (!plan) {
    return (
      <div className="max-w-2xl space-y-6">
        {back}
        <Panel className="space-y-4">
          <p>{t('planDay.notInPlan')}</p>
          <Button asChild>
            <Link href="/ielts/plan">{t('myPlan.create')}</Link>
          </Button>
        </Panel>
      </div>
    );
  }

  const dates = planDates(plan);
  const inPlan = DATE_KEY.test(date) && dates.includes(date);
  const isToday = date === ctx.today;
  const title = isToday ? t('planDay.todayTitle') : DATE_KEY.test(date) ? `${weekday(date)}, ${dayMonth(date)}` : t('myPlan.title');
  const header = <PageHeader title={title} subtitle={isToday ? `${weekday(date)}, ${longDate(date)}` : undefined} backHref="/ielts/plan" backLabel={t('myPlan.title')} />;
  const prev = inPlan && date > dates[0] ? addDays(date, -1) : undefined;
  const next = inPlan && date < plan.targetDate ? addDays(date, 1) : undefined;

  const nav = (
    <nav className="flex items-center justify-between gap-2" aria-label={t('planDay.timeline')}>
      {prev ? (
        <Button asChild variant="ghost" size="sm" className="h-10">
          <Link href={`/ielts/plan/day/${prev}`} data-testid="day-prev">
            <ChevronLeft /> {t('planDay.prevDay')}
          </Link>
        </Button>
      ) : (
        <span />
      )}
      {!isToday && (
        <Button asChild variant="ghost" size="sm" className="h-10">
          <Link href={`/ielts/plan/day/${ctx.today}`} data-testid="day-today">
            {t('planDay.states.today')}
          </Link>
        </Button>
      )}
      {next ? (
        <Button asChild variant="ghost" size="sm" className="h-10">
          <Link href={`/ielts/plan/day/${next}`} data-testid="day-next">
            {t('planDay.nextDay')} <ChevronRight />
          </Link>
        </Button>
      ) : (
        <span />
      )}
    </nav>
  );

  if (!inPlan) {
    return (
      <div className="max-w-2xl space-y-6" data-testid="plan-day" data-state="none">
        {header}
        <Panel>
          <p className="text-muted-foreground">{t('planDay.notInPlan')}</p>
        </Panel>
      </div>
    );
  }

  const view = planDay(plan, date, ctx);
  const skip = (on: boolean) => updateProfile((p) => setDaySkipped(p, date, on));

  let body: React.ReactNode;
  if (view.state === 'test') {
    body = (
      <Panel className="flex items-start gap-3" data-testid="day-test">
        <PartyPopper className="mt-0.5 size-6 shrink-0 text-brand" aria-hidden />
        <div>
          <p className="font-semibold">{t('planDay.testDay')}</p>
          <p className="text-sm text-muted-foreground">{t('planDay.testDayBody')}</p>
        </div>
      </Panel>
    );
  } else if (view.state === 'rest') {
    const upcoming = nextStudyDay(plan, date);
    body = (
      <Panel className="flex items-start gap-3" data-testid="day-rest">
        <Coffee className="mt-0.5 size-6 shrink-0 text-muted-foreground" aria-hidden />
        <div className="space-y-1">
          <p className="font-semibold">{isToday ? t('planDay.restToday') : t('planDay.rest')}</p>
          {upcoming && (
            <Link href={`/ielts/plan/day/${upcoming}`} className="text-sm font-medium text-brand">
              {t('planDay.nextStudy', { date: `${weekday(upcoming)}, ${dayMonth(upcoming)}` })}
            </Link>
          )}
        </div>
      </Panel>
    );
  } else {
    body = (
      <>
        <div className="space-y-2 rounded-2xl border bg-card px-4 py-3">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-muted-foreground">{isToday ? t('planDay.targetTime') : t(`planDay.states.${view.state}`)}</span>
            <span className="font-semibold tabular-nums" data-testid="day-minutes" data-minutes={view.minutes}>
              {duration(view.minutes)}
            </span>
          </div>
          <ProgressBar value={(view.done / view.tasks.length) * 100} label={t('planDay.tasksDone', { done: n(view.done), total: n(view.tasks.length) })} tone={view.state === 'done' ? 'success' : 'brand'} size="sm" />
          <p className="text-sm font-medium tabular-nums" data-testid="day-done" data-done={view.done} data-total={view.tasks.length}>
            {t('planDay.tasksDone', { done: n(view.done), total: n(view.tasks.length) })}
          </p>
        </div>
        {view.skipped && (
          <p className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-3 text-sm" data-testid="day-skipped">
            <SkipForward className="size-4 shrink-0" aria-hidden /> {t('planDay.skipped')}
          </p>
        )}
        <ul className="space-y-2" data-testid="day-tasks">
          {view.tasks.map((task, i) => (
            <TaskCard key={`${task.kind}-${i}`} task={task} date={date} today={isToday} profile={profile} />
          ))}
        </ul>
        <p className="px-1 text-sm text-muted-foreground">{date > ctx.today ? t('planDay.futureNote') : date < ctx.today ? t('planDay.pastNote') : t('planDay.honest')}</p>
        {isToday && view.state !== 'done' && (
          <div className="space-y-2 border-t pt-4">
            {view.skipped ? (
              <Button variant="outline" className="h-11 w-full sm:w-auto" onClick={() => skip(false)} data-testid="day-undo-skip">
                <Undo2 /> {t('planDay.undoSkip')}
              </Button>
            ) : (
              <>
                <Button variant="ghost" className="h-11 w-full text-muted-foreground sm:w-auto" onClick={() => skip(true)} data-testid="day-skip">
                  <SkipForward /> {t('planDay.skip')}
                </Button>
                <p className="px-1 text-xs text-muted-foreground">{t('planDay.skipHint')}</p>
              </>
            )}
          </div>
        )}
      </>
    );
  }

  return (
    <div className="max-w-2xl space-y-4" data-testid="plan-day" data-date={date} data-state={view.state}>
      {header}
      {!isToday && (
        <StatusChip tone={STATE_TONE[view.state]} className="-mt-2">
          {t(`planDay.states.${view.state}`)}
        </StatusChip>
      )}
      {body}
      {nav}
    </div>
  );
}
