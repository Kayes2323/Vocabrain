'use client';

import Link from 'next/link';
import { CalendarDays, Pencil, Sparkles, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader, Panel, ScreenSkeleton } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { daysUntil, ieltsJourney } from '@/lib/engine';
import { readJSON } from '@/lib/services/local-store';
import { PlanOverview, PlanSummary } from './PlanParts';
import { PlanProgressLine, PlanTimeline, TodayCard } from './PlanTimeline';
import { usePlanActivity } from './usePlanActivity';

/**
 * My IELTS Plan: an introduction and "Create my plan" when there is no plan,
 * else the saved plan — its answers and preparation overview — with Edit.
 */
export function MyPlanHome() {
  const { t, n } = useLocale();
  const { profile } = useProfile();
  const ctx = usePlanActivity();
  if (!profile) return <ScreenSkeleton />;
  const plan = profile.ielts.plan;

  const header = <PageHeader title={t('myPlan.title')} backHref="/ielts" backLabel="IELTS" action={plan ? <EditButton /> : undefined} />;

  if (!plan) {
    // A setup left half-way on this device can be continued.
    const draft = readJSON<{ edit?: boolean }>(`mino:plan-draft:${profile.userId}`);
    const resuming = Boolean(draft && !draft.edit);
    return (
      <div className="max-w-2xl space-y-6" data-testid="plan-intro">
        {header}
        <Panel className="space-y-5 text-center sm:text-left">
          <span aria-hidden className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-tint-green text-tint-green-fg sm:mx-0 [&_svg]:size-6">
            <Target />
          </span>
          <p className="text-[17px] leading-relaxed text-balance">{t('myPlan.introBody')}</p>
          <Button asChild size="lg" className="h-12 w-full sm:w-auto">
            <Link href="/ielts/plan/setup" data-testid="plan-create">
              {resuming ? t('myPlan.resume') : t('myPlan.create')}
            </Link>
          </Button>
        </Panel>
      </div>
    );
  }

  const left = daysUntil(plan.targetDate);
  const foundation = ieltsJourney(profile).stages.find((s) => s.id === 'english-foundation')!;
  const topics = foundation.steps.filter((s) => !s.step.parallel);

  return (
    <div className="max-w-2xl space-y-6" data-testid="plan-saved">
      {header}
      {left > 0 && (
        <p className="-mt-3 flex items-center gap-2 text-sm font-medium text-brand tabular-nums" data-testid="plan-days-left">
          <CalendarDays className="size-4" aria-hidden /> {t('myPlan.daysLeft', { n: n(left) })}
        </p>
      )}
      {ctx ? (
        <>
          <TodayCard plan={plan} ctx={ctx} />
          <PlanProgressLine plan={plan} ctx={ctx} />
          <PlanTimeline plan={plan} ctx={ctx} />
        </>
      ) : (
        <div className="h-40 animate-pulse rounded-2xl bg-muted" />
      )}
      <PlanSummary answers={plan} />
      <PlanOverview plan={plan} foundation={{ done: topics.filter((s) => s.state === 'done').length, total: topics.length }} />
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button asChild variant="outline" className="h-11">
          <Link href="/ielts/plan/setup?edit=1" data-testid="plan-edit">
            <Pencil /> {t('myPlan.edit')}
          </Link>
        </Button>
        <Button asChild variant="ghost" className="h-11 text-muted-foreground">
          <Link href={`/mino?${new URLSearchParams({ ask: 'plan' })}`}>
            <Sparkles /> {t('myPlan.askMino')}
          </Link>
        </Button>
      </div>
    </div>
  );
}

function EditButton() {
  const { t } = useLocale();
  return (
    <Button asChild variant="outline" size="sm">
      <Link href="/ielts/plan/setup?edit=1" aria-label={t('myPlan.edit')}>
        <Pencil /> <span className="hidden sm:inline">{t('myPlan.edit')}</span>
      </Link>
    </Button>
  );
}
