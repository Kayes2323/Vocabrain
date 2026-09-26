'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, PageHeader, Panel, ProgressBar, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { useBrain } from '@/components/providers/BrainProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { useTestSessions } from '@/components/test/useTestSessions';
import { brainSummary, buildStudyPlan, PLAN_HORIZONS, type StudyPlan } from '@/lib/engine';
import { analyseTests, type TestSession } from '@/lib/ielts';
import { getTest } from '@/lib/ielts/content';
import { cn } from '@/lib/utils';

type Horizon = (typeof PLAN_HORIZONS)[number] | 'test';

export default function StudyPlanPage() {
  const { t, m, n } = useLocale();
  const { profile } = useProfile();
  const brain = useBrain();
  const { repository, userId } = useTestSessions();
  const [sessions, setSessions] = useState<TestSession[] | null>(null);
  const [horizon, setHorizon] = useState<Horizon>(() => (profile?.ielts.testDate ? 'test' : 30));
  const [week, setWeek] = useState(0);

  useEffect(() => {
    repository.list(userId).then(setSessions, () => setSessions([]));
  }, [repository, userId]);

  const plan: StudyPlan | null = useMemo(() => {
    if (!profile || brain.loading || !sessions) return null;
    const analysis = analyseTests(sessions, getTest);
    return buildStudyPlan(profile, horizon, {
      weakAreas: analysis.weakAreas.map((w) => ({ skill: w.skill, label: w.label, accuracy: w.accuracy })),
      brain: brainSummary(brain.words),
      testedSkills: [...new Set(analysis.attempts.map((a) => a.skill))],
    });
  }, [profile, brain.loading, brain.words, sessions, horizon]);

  if (!profile || !plan) return <ScreenSkeleton />;

  const weeks = Math.ceil(plan.days.length / 7);
  const shown = plan.days.slice(week * 7, week * 7 + 7);
  const horizons: Horizon[] = [...(profile.ielts.testDate ? (['test'] as const) : []), ...PLAN_HORIZONS];

  return (
    <div className="space-y-8">
      <PageHeader title={t('studyPlan.title')} subtitle={t('studyPlan.subtitle')} backHref="/ielts" backLabel="IELTS" />

      <div role="radiogroup" aria-label={t('studyPlan.title')} className="flex flex-wrap gap-2">
        {horizons.map((h) => (
          <button
            key={h}
            role="radio"
            aria-checked={horizon === h}
            onClick={() => {
              setHorizon(h);
              setWeek(0);
            }}
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
              horizon === h ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:bg-muted',
            )}
          >
            {h === 'test' ? t('studyPlan.untilTest') : t('studyPlan.days', { n: h })}
          </button>
        ))}
      </div>

      <Panel className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          [t('studyPlan.perDay', { n: plan.minutesPerDay }), ''],
          [t('studyPlan.studyDays', { n: plan.studyDaysPerWeek }), ''],
          [t('studyPlan.days', { n: plan.horizonDays }), t('studyPlan.range', { from: plan.startDate.slice(5), to: plan.endDate.slice(5) })],
          [plan.testDate ? t('studyPlan.testOn', { date: plan.testDate }) : '–', plan.target !== undefined ? `Target ${plan.target.toFixed(1)}` : ''],
        ].map(([main, sub], i) => (
          <div key={i}>
            <p className="font-semibold">{main}</p>
            {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
          </div>
        ))}
      </Panel>

      {plan.assumptions.length > 0 && (
        <Callout tone="warning" title={t('studyPlan.assumptionsTitle')}>
          <ul className="list-disc space-y-1 pl-4">
            {plan.assumptions.map((a, i) => (
              <li key={i}>{m(a)}</li>
            ))}
          </ul>
          <Link href="/setup/ielts" className="mt-2 inline-block font-medium underline underline-offset-4">
            {t('studyPlan.updateGoal')}
          </Link>
        </Callout>
      )}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <Section title={t('studyPlan.daysTitle')}>
          {weeks > 1 && (
            <div className="mb-3 flex gap-1 overflow-x-auto pb-1">
              {Array.from({ length: weeks }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setWeek(i)}
                  className={cn('shrink-0 rounded-md px-3 py-1 text-sm', week === i ? 'bg-muted font-semibold' : 'text-muted-foreground')}
                >
                  {t('studyPlan.weekN', { n: i + 1 })}
                </button>
              ))}
            </div>
          )}
          <ol className="space-y-3">
            {shown.map((d) => (
              <li key={d.date}>
                <Panel className={cn('space-y-2', d.rest && 'bg-muted/40')}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold">
                      {t('studyPlan.dayN', { n: d.day })} · {new Date(`${d.date}T00:00`).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}
                    </p>
                    {d.day === 1 && <StatusChip tone="brand">{t('studyPlan.today')}</StatusChip>}
                    {d.rest && <StatusChip>{t('studyPlan.rest')}</StatusChip>}
                  </div>
                  {d.blocks.map((b, i) => (
                    <div key={i} className="flex items-center justify-between gap-3 text-sm">
                      <span className="min-w-0">{m(b.title)}</span>
                      <span className="flex shrink-0 items-center gap-2">
                        <span className="text-muted-foreground tabular-nums">{t('common.minutes', { n: b.minutes })}</span>
                        {b.href ? (
                          <Link href={b.href} aria-label={m(b.title)} className="rounded-md p-1 hover:bg-muted">
                            <ArrowRight className="size-4" />
                          </Link>
                        ) : (
                          <span className="text-xs text-muted-foreground">{t('studyPlan.outsideApp')}</span>
                        )}
                      </span>
                    </div>
                  ))}
                </Panel>
              </li>
            ))}
          </ol>
        </Section>

        <div className="space-y-8">
          <Section title={t('studyPlan.focusTitle')}>
            <Panel className="space-y-4">
              {plan.focus.map((f) => (
                <div key={f.kind} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{t(`studyPlan.kinds.${f.kind}`)}</span>
                    <span className="tabular-nums">{n(f.weight)}%</span>
                  </div>
                  <ProgressBar value={f.weight * 2} label={t(`studyPlan.kinds.${f.kind}`)} size="sm" />
                  <p className="text-xs text-muted-foreground">{f.reason.map((r) => m(r)).join(' ')}</p>
                </div>
              ))}
            </Panel>
          </Section>

          <Section title={t('studyPlan.phasesTitle')}>
            <Panel className="space-y-2 text-sm">
              {plan.phases.map((p) => (
                <div key={p.id} className="flex justify-between gap-2">
                  <span>{t(`studyPlan.phase.${p.id}`)}</span>
                  <span className="text-muted-foreground tabular-nums">
                    {t('studyPlan.dayN', { n: p.fromDay })}–{n(p.toDay)}
                  </span>
                </div>
              ))}
            </Panel>
          </Section>

          <Button asChild variant="brand" className="w-full">
            <Link href={`/mino?${new URLSearchParams({ ask: 'plan', days: String(plan.horizonDays) })}`}>
              <Sparkles /> {t('studyPlan.askMino')}
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground">{t('studyPlan.notAGuarantee')}</p>
        </div>
      </div>
    </div>
  );
}
