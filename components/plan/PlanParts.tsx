'use client';

import { Check } from 'lucide-react';
import { ProgressBar } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { formatBand, phaseStatus } from '@/lib/engine';
import { IELTS_SKILLS } from '@/lib/constants';
import type { MyPlan, PlanAnswers } from '@/lib/models';
import { cn } from '@/lib/utils';

/** Labels for plan answers, in the student's language. */
export function usePlanText() {
  const { t, n, locale } = useLocale();
  const duration = (m: number) =>
    m >= 240 ? t('myPlan.dur.max') : m < 60 ? t('myPlan.dur.min', { n: n(m) }) : m === 60 ? t('myPlan.dur.hour') : t('myPlan.dur.hours', { n: n(m / 60) });
  const date = (key: string) => new Date(`${key}T00:00`).toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const shortDate = (key: string) => new Date(`${key}T00:00`).toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'short' });
  const skills = (a: Pick<PlanAnswers, 'weakSkills'>) =>
    a.weakSkills.length === 0 || a.weakSkills.length === IELTS_SKILLS.length ? t('myPlan.balanced') : a.weakSkills.map((s) => t(`skills.${s}`)).join(' • ');
  const value = (field: keyof PlanAnswers, a: PlanAnswers): string => {
    switch (field) {
      case 'targetBand':
        return formatBand(a.targetBand);
      case 'targetDate':
        return date(a.targetDate);
      case 'dailyStudyMinutes':
        return duration(a.dailyStudyMinutes);
      case 'studyDaysPerWeek':
        return t('myPlan.perWeek', { n: n(a.studyDaysPerWeek) });
      case 'weakSkills':
        return skills(a);
      case 'currentLevel':
        return t(`myPlan.levels.${a.currentLevel}`);
      case 'studyPreference':
        return t(`myPlan.prefs.${a.studyPreference}`);
    }
  };
  return { duration, date, shortDate, skills, value };
}

export const SUMMARY_FIELDS: (keyof PlanAnswers)[] = ['targetBand', 'targetDate', 'dailyStudyMinutes', 'studyDaysPerWeek', 'weakSkills', 'currentLevel', 'studyPreference'];

/** The plan's key facts as a compact two-column list. `onChange` adds a "Change" link per row. */
export function PlanSummary({ answers, onChange }: { answers: PlanAnswers; onChange?: (field: keyof PlanAnswers) => void }) {
  const { t } = useLocale();
  const { value } = usePlanText();
  return (
    <dl className="divide-y rounded-2xl border bg-card" data-testid="plan-summary">
      {SUMMARY_FIELDS.map((f) => (
        <div key={f} className="flex min-h-12 items-center justify-between gap-3 px-4 py-2.5" data-field={f}>
          <dt className="shrink-0 text-sm text-muted-foreground">{t(`myPlan.fields.${f}`)}</dt>
          <dd className="flex min-w-0 items-center gap-3 text-right">
            <span className="font-semibold" data-value={f}>
              {value(f, answers)}
            </span>
            {onChange && (
              <button type="button" onClick={() => onChange(f)} className="h-9 shrink-0 text-sm font-medium text-brand" data-change={f}>
                {t('myPlan.change')}
              </button>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Phases in order with dates and status, the time totals and the skill split. */
export function PlanOverview({ plan, foundation }: { plan: MyPlan; foundation?: { done: number; total: number } }) {
  const { t, n } = useLocale();
  const { shortDate } = usePlanText();
  const weeks = Math.max(1, Math.round(plan.totals.days / 7));
  const length = (days: number) => (days < 7 ? t('myPlan.overview.daysOnly', { n: n(days) }) : days < 11 ? t('myPlan.overview.oneWeek') : t('myPlan.overview.weeks', { n: n(Math.round(days / 7)) }));
  return (
    <section className="space-y-3" aria-labelledby="plan-overview" data-testid="plan-overview">
      <div className="space-y-0.5 px-1">
        <h2 id="plan-overview" className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          {t('myPlan.overview.title')}
        </h2>
        <p className="text-sm text-muted-foreground tabular-nums">
          {t('myPlan.overview.totals', { weeks: n(weeks), days: n(plan.totals.studyDays), hours: n(plan.totals.hours) })}
        </p>
      </div>
      <ol className="space-y-2">
        {plan.phases.map((p) => {
          const status = phaseStatus(p);
          return (
            <li key={p.id} className={cn('rounded-2xl border bg-card px-4 py-3', status === 'current' && 'border-brand/35 ring-1 ring-brand/10')} data-phase={p.id} data-status={status}>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className={cn(
                    'flex size-6 shrink-0 items-center justify-center rounded-full border-2',
                    status === 'done' && 'border-success bg-success text-white',
                    status === 'current' && 'border-brand bg-brand-soft',
                    status === 'upcoming' && 'border-border',
                  )}
                >
                  {status === 'done' && <Check className="size-3.5" />}
                  {status === 'current' && <span className="size-2 rounded-full bg-brand" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold">{t(`myPlan.phases.${p.id}`)}</span>
                    <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{length(p.days)}</span>
                  </span>
                  <span className="block text-sm text-muted-foreground">{t(`myPlan.phaseWhy.${p.id}`)}</span>
                  <span className="mt-0.5 flex items-center justify-between gap-2 text-xs text-muted-foreground tabular-nums">
                    <span>
                      {shortDate(p.startDate)} – {shortDate(p.endDate)}
                    </span>
                    <span className={cn(status === 'current' && 'font-medium text-brand')}>{t(`myPlan.status.${status}`)}</span>
                  </span>
                </span>
              </div>
              {p.id === 'foundation' && foundation && (
                <div className="mt-2.5 space-y-1 pl-9">
                  <p className="text-xs text-muted-foreground tabular-nums">{t('myPlan.foundationProgress', { done: n(foundation.done), total: n(foundation.total) })}</p>
                  <ProgressBar value={(foundation.done / foundation.total) * 100} label={t('myPlan.phases.foundation')} size="sm" />
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <div className="space-y-2 rounded-2xl border bg-card px-4 py-3" data-testid="plan-skills">
        <div className="flex items-baseline justify-between gap-2 text-sm">
          <span className="font-medium">{t('myPlan.overview.skillTime')}</span>
          <span className="text-xs text-muted-foreground tabular-nums">{t('myPlan.overview.sessions', { n: n(plan.sessionsPerDay), m: n(plan.sessionMinutes) })}</span>
        </div>
        {IELTS_SKILLS.map((s) => (
          <div key={s} className="flex items-center gap-3 text-sm" data-skill={s}>
            <span className="w-20 shrink-0">{t(`skills.${s}`)}</span>
            <ProgressBar value={plan.skillShare[s]} label={t(`skills.${s}`)} size="sm" className="flex-1" />
            <span className="w-10 shrink-0 text-right text-xs text-muted-foreground tabular-nums">{n(plan.skillShare[s])}%</span>
          </div>
        ))}
      </div>
      {plan.notes.map((k) => (
        <p key={k} className="px-1 text-sm text-foreground/80" data-note={k}>
          {t(`myPlan.notes.${k}`)}
        </p>
      ))}
      <p className="px-1 text-xs text-muted-foreground">{t('myPlan.disclaimer')}</p>
    </section>
  );
}
