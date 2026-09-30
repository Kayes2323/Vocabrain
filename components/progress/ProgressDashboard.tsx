'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, BookText, ClipboardCheck, Dumbbell, Headphones, Mic, Minus, PenLine, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader, ProgressBar, ScreenSkeleton, StatusChip } from '@/components/ds';
import { useText } from '@/components/foundation/useFoundation';
import { useBrain } from '@/components/providers/BrainProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { useTestSessions } from '@/components/test/useTestSessions';
import { getLibraryPassage, LIBRARY } from '@/lib/content/reading-library';
import type { IELTSSkill } from '@/lib/constants';
import { brainSummary, daysUntil, formatBand, learningStats, localDateKey, planDates, planDay, planProgress, sectionsByDate, type ActivityContext } from '@/lib/engine';
import { ieltsProgress, type HistoryItem, type IELTSProgress, type ScoredResult, type SkillProgressView } from '@/lib/engine/ielts-progress';
import { findLesson } from '@/lib/foundation/content';
import type { TestSession } from '@/lib/ielts';
import { getTest, testSkills } from '@/lib/ielts/content';
import type { UserProfile } from '@/lib/models';
import { cn } from '@/lib/utils';

const SKILL_ICON: Record<IELTSSkill, typeof Headphones> = { listening: Headphones, reading: BookText, writing: PenLine, speaking: Mic };
const LOOKUPS = { test: getTest, passage: getLibraryPassage, testSkills, librarySize: LIBRARY.length };

function Card({ title, icon: Icon, action, children, testId }: { title: string; icon?: typeof Headphones; action?: React.ReactNode; children: React.ReactNode; testId: string }) {
  return (
    <section className="space-y-3 rounded-2xl border bg-card p-4" data-testid={testId}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-semibold">
          {Icon && <Icon className="size-4 text-brand" aria-hidden />}
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Stat({ label, value, testId }: { label: string; value: string; testId?: string }) {
  return (
    <div className="rounded-xl bg-muted/60 px-2 py-2.5 text-center" data-testid={testId}>
      <p className="text-base font-semibold tabular-nums">{value}</p>
      <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{label}</p>
    </div>
  );
}

function Row({ label, value, testId }: { label: string; value: React.ReactNode; testId?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-sm" data-testid={testId}>
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium tabular-nums">{value}</span>
    </div>
  );
}

function useResultText() {
  const { t, n } = useLocale();
  return (r: ScoredResult) => {
    const parts: string[] = [];
    if (r.correct !== undefined) parts.push(`${n(r.correct)}/${n(r.total!)}`);
    if (r.band !== undefined) parts.push(r.correct !== undefined ? `Band ${formatBand(r.band)}` : `Band ${formatBand(r.band)} (${t('progressDash.skills.estimate')})`);
    return parts.join(' • ');
  };
}

/** Plan: today's tasks, how much of the plan is done so far, the target. */
function PlanCard({ profile, ctx }: { profile: UserProfile; ctx: ActivityContext }) {
  const { t, n, locale } = useLocale();
  const plan = profile.ielts.plan;
  const action = plan ? (
    <Link href={`/ielts/plan/day/${ctx.today}`} className="text-sm font-medium text-brand" data-testid="progress-plan-open">
      {t('progressDash.plan.open')}
    </Link>
  ) : undefined;
  if (!plan) {
    return (
      <Card title={t('progressDash.plan.title')} icon={Target} testId="progress-plan">
        <p className="text-sm text-muted-foreground">{t('progressDash.plan.none')}</p>
        <Button asChild size="sm" variant="outline" className="h-10">
          <Link href="/ielts/plan">{t('progressDash.plan.create')}</Link>
        </Button>
      </Card>
    );
  }
  const today = planDates(plan).includes(ctx.today) ? planDay(plan, ctx.today, ctx) : undefined;
  const prog = planProgress(plan, ctx);
  const left = daysUntil(plan.targetDate);
  const date = new Date(`${plan.targetDate}T00:00`).toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  return (
    <Card title={t('progressDash.plan.title')} icon={Target} action={action} testId="progress-plan">
      {today && (
        <div className="space-y-1.5" data-testid="progress-plan-today" data-done={today.done} data-total={today.tasks.length}>
          <Row label={t('progressDash.plan.today')} value={today.tasks.length ? t('progressDash.plan.tasks', { done: n(today.done), total: n(today.tasks.length) }) : t('progressDash.plan.rest')} />
          {today.tasks.length > 0 && <ProgressBar value={(today.done / today.tasks.length) * 100} label={t('progressDash.plan.today')} size="sm" tone={today.done === today.tasks.length ? 'success' : 'brand'} />}
        </div>
      )}
      {prog.total > 0 && (
        <div className="space-y-1.5" data-testid="progress-plan-completion" data-done={prog.done} data-total={prog.total}>
          <Row label={t('progressDash.plan.completion')} value={t('progressDash.plan.completionValue', { done: n(prog.done), total: n(prog.total) })} />
          <ProgressBar value={(prog.done / prog.total) * 100} label={t('progressDash.plan.completion')} size="sm" />
        </div>
      )}
      <Row label={t('progressDash.plan.target')} value={`${t('progressDash.plan.targetValue', { band: formatBand(plan.targetBand), date })}${left > 0 ? ` • ${t('progressDash.plan.daysLeft', { n: n(left) })}` : ''}`} testId="progress-plan-target" />
    </Card>
  );
}

function SkillCard({ s }: { s: SkillProgressView }) {
  const { t, n } = useLocale();
  const result = useResultText();
  const name = t(`skills.${s.skill}`);
  return (
    <Card title={name} icon={SKILL_ICON[s.skill]} testId={`progress-skill-${s.skill}`}>
      <div className="space-y-1.5" data-testid={`skill-lessons-${s.skill}`} data-done={s.lessons.done} data-total={s.lessons.total}>
        <p className="text-sm">{t('progressDash.skills.lessons', { skill: name, done: n(s.lessons.done), total: n(s.lessons.total) })}</p>
        <ProgressBar value={s.lessons.percent} label={name} size="sm" />
      </div>
      <div className="space-y-1.5">
        <Row label={t('progressDash.skills.sections')} value={n(s.sections)} testId={`skill-sections-${s.skill}`} />
        {s.passages && <Row label={t('progressDash.skills.passages')} value={`${n(s.passages.done)}/${n(s.passages.total)}`} testId="skill-passages-reading" />}
        {s.skill !== 'listening' && <Row label={t('progressDash.skills.practiceDays')} value={n(s.practiceDays)} testId={`skill-days-${s.skill}`} />}
        {s.latest ? (
          <>
            <Row label={t('progressDash.skills.latest')} value={result(s.latest)} testId={`skill-latest-${s.skill}`} />
            {s.average && s.average.n > 1 && (
              <Row
                label={`${t('progressDash.skills.average')} (${t('progressDash.skills.averageOf', { n: n(s.average.n) })})`}
                value={[s.average.accuracy !== undefined ? `${n(s.average.accuracy)}%` : '', s.average.band !== undefined ? `Band ${formatBand(s.average.band)}` : ''].filter(Boolean).join(' • ')}
                testId={`skill-average-${s.skill}`}
              />
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground" data-testid={`skill-noscore-${s.skill}`}>
            {t('progressDash.skills.noScore')}
          </p>
        )}
        {s.weak.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1" data-testid={`skill-weak-${s.skill}`}>
            <span className="text-xs text-muted-foreground">{t('progressDash.skills.weak')}:</span>
            {s.weak.map((w) => (
              <StatusChip key={w} tone="warning">
                {w}
              </StatusChip>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

function MockCard({ p }: { p: IELTSProgress['mock'] }) {
  const { t, n } = useLocale();
  const result = useResultText();
  const Dir = p.direction === 'up' ? ArrowUpRight : p.direction === 'down' ? ArrowDownRight : Minus;
  const action = (
    <Link href="/ielts/tests" className="text-sm font-medium text-brand">
      {t('progressDash.mock.open')}
    </Link>
  );
  return (
    <Card title={t('progressDash.mock.title')} icon={ClipboardCheck} action={action} testId="progress-mock">
      <div className="grid grid-cols-2 gap-2">
        <Stat label={t('progressDash.mock.full')} value={n(p.fullTests)} testId="mock-full" />
        <Stat label={t('progressDash.mock.sections')} value={n(p.sections)} testId="mock-sections" />
      </div>
      {p.latest ? (
        <div className="space-y-1.5">
          <Row label={t('progressDash.mock.latest')} value={`${t(`skills.${p.latest.skill}`)} • ${result(p.latest)}`} testId="mock-latest" />
          <div className="space-y-1" data-testid="mock-best">
            <p className="text-sm text-muted-foreground">{t('progressDash.mock.best')}</p>
            {p.best.map((b) => (
              <Row key={b.skill} label={t(`skills.${b.skill}`)} value={result(b.result)} testId={`mock-best-${b.skill}`} />
            ))}
          </div>
          {p.trend.length >= 2 && (
            <div className="space-y-1 pt-1" data-testid="mock-trend" data-direction={p.direction}>
              <p className="text-sm text-muted-foreground">{t('progressDash.mock.trend')}</p>
              <p className="flex flex-wrap items-center gap-1 text-sm font-medium tabular-nums">
                {p.trend.map((x, i) => (
                  <span key={i} className="flex items-center gap-1">
                    {i > 0 && <ArrowRight className="size-3 text-muted-foreground" aria-hidden />}
                    {n(x.accuracy)}%
                  </span>
                ))}
              </p>
              <p className={cn('flex items-center gap-1 text-xs', p.direction === 'up' ? 'text-success' : p.direction === 'down' ? 'text-destructive' : 'text-muted-foreground')}>
                <Dir className="size-3.5" aria-hidden /> {t(`progressDash.mock.${p.direction}`)}
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">{t('progressDash.mock.none')}</p>
      )}
      <p className="text-xs text-muted-foreground">{t('progressDash.mock.note')}</p>
    </Card>
  );
}

function History({ items }: { items: HistoryItem[] }) {
  const { t, n, locale } = useLocale();
  const text = useText();
  const [limit, setLimit] = useState(8);
  const today = localDateKey();
  const yesterday = localDateKey(new Date(Date.now() - 86_400_000));
  const dayLabel = (d: string) =>
    d === today ? t('progressDash.history.today') : d === yesterday ? t('progressDash.history.yesterday') : new Date(`${d}T00:00`).toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'short' });
  const label = (h: HistoryItem) => {
    switch (h.kind) {
      case 'lesson': {
        const l = h.ref ? findLesson(h.ref) : undefined;
        return t('progressDash.history.lesson', { title: l ? text(l.lesson.title) : (h.ref ?? '') });
      }
      case 'test':
        return t('progressDash.history.test', { title: h.title ?? '', skill: t(`skills.${h.skill}`) });
      case 'passage':
        return t('progressDash.history.passage', { title: h.title ?? '' });
      case 'grammar':
        return t('progressDash.history.grammar', { n: n(h.n ?? 0) });
      case 'practice':
        return t('progressDash.history.practice', { skill: t(`skills.${h.skill}`) });
      case 'vocabulary':
        return t('progressDash.history.vocabulary');
    }
  };
  const shown = items.slice(0, limit);
  return (
    <Card title={t('progressDash.history.title')} icon={BookOpen} testId="progress-history">
      {shown.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t('progressDash.history.none')}</p>
      ) : (
        <ol className="space-y-2">
          {shown.map((h, i) => (
            <li key={i} className="flex items-baseline gap-3 text-sm" data-history={h.kind} data-date={h.date}>
              <span className={cn('w-16 shrink-0 text-xs text-muted-foreground', i > 0 && shown[i - 1].date === h.date && 'invisible')}>{dayLabel(h.date)}</span>
              <span className="min-w-0 flex-1 truncate">{label(h)}</span>
              {h.score && <span className="shrink-0 text-xs font-medium text-muted-foreground tabular-nums">{h.score}</span>}
            </li>
          ))}
        </ol>
      )}
      {items.length > limit && (
        <button type="button" className="h-9 text-sm font-medium text-brand" onClick={() => setLimit((l) => l + 10)} data-testid="history-more">
          {t('progressDash.history.more')}
        </button>
      )}
    </Card>
  );
}

/** The IELTS Progress dashboard: overall, plan, Foundation, skills, practice, mock tests, recent activity. */
export function ProgressDashboard() {
  const { t, n } = useLocale();
  const { profile } = useProfile();
  const brain = useBrain();
  const { repository, userId } = useTestSessions();
  const [sessions, setSessions] = useState<TestSession[] | null>(null);
  useEffect(() => {
    let live = true;
    repository.list(userId).then(
      (s) => live && setSessions(s),
      (e) => {
        console.error('[progress] Test history failed', e);
        if (live) setSessions([]);
      },
    );
    return () => {
      live = false;
    };
  }, [repository, userId]);

  const progress = useMemo(() => (profile && sessions ? ieltsProgress(profile, sessions, LOOKUPS) : undefined), [profile, sessions]);
  const ctx = useMemo<ActivityContext | undefined>(() => {
    if (!profile || !sessions) return undefined;
    const s = brain.loading ? undefined : brainSummary(brain.words);
    return { profile, sections: sectionsByDate(sessions), today: localDateKey(), brain: s ? { total: s.total, due: s.due } : undefined };
  }, [profile, sessions, brain.words, brain.loading]);

  if (!profile || !progress || !ctx) return <ScreenSkeleton />;
  const stats = learningStats(profile);
  const f = progress.foundation;
  const pr = progress.practice;

  return (
    <div className="max-w-2xl space-y-4" data-testid="ielts-progress">
      <PageHeader title={t('progressDash.title')} subtitle={t('progressDash.subtitle')} backHref="/ielts" backLabel="IELTS" />

      <section className="space-y-3 rounded-2xl border border-brand/30 bg-brand-soft/40 p-4" data-testid="progress-overall" data-percent={progress.overall}>
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-semibold">{t('progressDash.overall')}</h2>
          <span className="text-2xl font-semibold text-brand tabular-nums">{n(progress.overall)}%</span>
        </div>
        <ProgressBar value={progress.overall} label={t('progressDash.overall')} />
        <p className="text-xs text-muted-foreground">{t('progressDash.overallHint')}</p>
        <dl className="grid grid-cols-3 gap-2" data-testid="learning-stats">
          <Stat label={t('progressDash.lessonsAll')} value={`${n(stats.lessonsDone)}/${n(stats.lessonsTotal)}`} testId="stat-lessons" />
          <Stat label={t('progressDash.practiceAll')} value={n(stats.practiceSessions)} testId="stat-practice" />
          <Stat label={t('progressDash.mastered')} value={n(stats.topicsMastered)} testId="stat-mastered" />
        </dl>
        {!progress.started && <p className="text-sm text-muted-foreground" data-testid="progress-empty">{t('progressDash.empty')}</p>}
      </section>

      <PlanCard profile={profile} ctx={ctx} />

      <Card
        title={t('progressDash.foundation.title')}
        icon={BookOpen}
        action={<span className="text-sm font-semibold text-brand tabular-nums">{t('progressDash.foundation.complete', { n: n(f.percent) })}</span>}
        testId="progress-foundation"
      >
        <div className="space-y-1.5" data-testid="foundation-lessons" data-done={f.done} data-total={f.total}>
          <p className="text-lg font-semibold tabular-nums">{t('progressDash.foundation.lessons', { done: n(f.done), total: n(f.total) })}</p>
          <ProgressBar value={f.percent} label={t('progressDash.foundation.title')} />
        </div>
        <Row label={t('progressDash.foundation.remaining', { n: n(f.total - f.done) })} value={t('progressDash.foundation.topics', { done: n(f.topics.done), total: n(f.topics.total) })} />
      </Card>

      <h2 className="px-1 pt-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">{t('progressDash.skills.title')}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {progress.skills.map((s) => (
          <SkillCard key={s.skill} s={s} />
        ))}
      </div>

      <Card title={t('progressDash.practice.title')} icon={Dumbbell} testId="progress-practice">
        <div className="space-y-1.5" data-testid="practice-stage" data-percent={pr.stage.percent}>
          <p className="text-sm font-medium tabular-nums">{t('progressDash.practice.stage', { n: n(pr.stage.percent) })}</p>
          <ProgressBar value={pr.stage.percent} label={t('progressDash.practice.title')} size="sm" />
          <p className="text-xs text-muted-foreground">{t('progressDash.practice.stageHint')}</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Stat label={t('progressDash.practice.grammar')} value={n(pr.grammar)} testId="practice-grammar" />
          <Stat label={t('progressDash.practice.vocabulary')} value={n(pr.vocabularyDays)} testId="practice-vocabulary" />
          <Stat label={t('progressDash.practice.reading')} value={n(pr.reading)} testId="practice-reading" />
          <Stat label={t('progressDash.practice.listening')} value={n(pr.listening)} testId="practice-listening" />
          <Stat label={t('progressDash.practice.writing')} value={n(pr.writing)} testId="practice-writing" />
          <Stat label={t('progressDash.practice.speaking')} value={n(pr.speaking)} testId="practice-speaking" />
        </div>
      </Card>

      <MockCard p={progress.mock} />
      <History items={progress.history} />
    </div>
  );
}
