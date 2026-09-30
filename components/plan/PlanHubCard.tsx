'use client';

import Link from 'next/link';
import { ArrowRight, ChevronRight, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { daysUntil, formatBand, planDates, planDay } from '@/lib/engine';
import type { UserProfile } from '@/lib/models';
import { usePlanText } from './PlanParts';
import { usePlanActivity } from './usePlanActivity';

/**
 * The first thing on the IELTS page: My IELTS Plan. Without a plan, one
 * action — create it. With a plan: target, test date, today's progress and
 * Continue (today's plan). Progress has its own link underneath.
 */
export function PlanHubCard({ profile }: { profile: UserProfile }) {
  // Test history (for today's progress) is loaded only when there is a plan to show it for.
  return profile.ielts.plan ? <WithPlan profile={profile} /> : <NoPlan />;
}

function ProgressLink() {
  const { t } = useLocale();
  return (
    <Link href="/ielts/progress" className="flex min-h-11 items-center justify-between gap-2 px-1 text-sm font-medium text-brand" data-testid="hub-progress">
      <span className="flex items-center gap-2">
        <TrendingUp className="size-4" aria-hidden /> {t('ielts.hub.progress')}
      </span>
      <ChevronRight className="size-4" aria-hidden />
    </Link>
  );
}

function NoPlan() {
  const { t } = useLocale();
  return (
    <div className="space-y-1" data-testid="hub-plan-card" data-state="none">
      <div className="space-y-3 rounded-2xl border border-brand/30 bg-brand-soft/40 p-4">
        <div className="flex items-start gap-3">
          <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-brand-foreground">
            <Target className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="font-semibold">{t('ielts.hub.createTitle')}</p>
            <p className="text-sm text-muted-foreground">{t('ielts.hub.createBody')}</p>
          </div>
        </div>
        <Button asChild className="h-11 w-full sm:w-auto">
          <Link href="/ielts/plan" data-testid="hub-plan-create">
            {t('ielts.hub.create')} <ArrowRight />
          </Link>
        </Button>
      </div>
      <ProgressLink />
    </div>
  );
}

function WithPlan({ profile }: { profile: UserProfile }) {
  const { t, n } = useLocale();
  const { date } = usePlanText();
  const ctx = usePlanActivity();
  const plan = profile.ielts.plan!;
  const today = ctx && planDates(plan).includes(ctx.today) ? planDay(plan, ctx.today, ctx) : undefined;
  const left = daysUntil(plan.targetDate);
  return (
    <div className="space-y-1" data-testid="hub-plan-card" data-state="plan">
      <div className="space-y-3 rounded-2xl border border-brand/30 bg-brand-soft/40 p-4">
        <Link href="/ielts/plan" className="flex items-center justify-between gap-3" data-testid="hub-plan-open">
          <span className="flex items-center gap-2 font-semibold">
            <Target className="size-4.5 text-brand" aria-hidden /> {t('myPlan.title')}
          </span>
          <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
        </Link>
        <dl className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-card px-3 py-2">
            <dt className="text-xs text-muted-foreground">{t('ielts.hub.target')}</dt>
            <dd className="text-lg font-semibold tabular-nums" data-testid="hub-plan-target">{formatBand(plan.targetBand)}</dd>
          </div>
          <div className="rounded-xl bg-card px-3 py-2">
            <dt className="text-xs text-muted-foreground">{t('ielts.hub.testDate')}</dt>
            <dd className="text-sm font-semibold tabular-nums" data-testid="hub-plan-date">
              {date(plan.targetDate)}
              {left > 0 && <span className="block text-xs font-normal text-muted-foreground">{t('myPlan.daysLeft', { n: n(left) })}</span>}
            </dd>
          </div>
        </dl>
        {!ctx ? (
          <div className="h-10 animate-pulse rounded-xl bg-muted/70" />
        ) : today && today.tasks.length > 0 ? (
          <div className="space-y-1.5" data-testid="hub-plan-today" data-done={today.done} data-total={today.tasks.length}>
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="text-muted-foreground">{t('ielts.hub.today')}</span>
              <span className="font-medium tabular-nums">{t('planDay.tasksDone', { done: n(today.done), total: n(today.tasks.length) })}</span>
            </div>
            <ProgressBar value={(today.done / today.tasks.length) * 100} label={t('ielts.hub.today')} size="sm" tone={today.done === today.tasks.length ? 'success' : 'brand'} />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground" data-testid="hub-plan-today" data-done="0" data-total="0">
            {today?.state === 'test' ? t('planDay.testDay') : t('planDay.restToday')}
          </p>
        )}
        <Button asChild className="h-11 w-full sm:w-auto">
          <Link href={ctx ? `/ielts/plan/day/${ctx.today}` : '/ielts/plan'} data-testid="hub-plan-continue">
            {t('ielts.hub.continue')} <ArrowRight />
          </Link>
        </Button>
      </div>
      <ProgressLink />
    </div>
  );
}
