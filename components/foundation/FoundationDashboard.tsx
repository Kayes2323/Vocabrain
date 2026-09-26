'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Check, Circle, Headphones, Layers, Lock, Mic, PenLine, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ListRow, PageHeader, Panel, ProgressBar, RowGroup, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { useBrainContext } from '@/components/brain/useBrainContext';
import { useLocale } from '@/components/providers/LocaleProvider';
import {
  dailyGoal, findLesson, foundationDailyPlan, foundationJourney, getConcept, getModule, isComingSoon, LEVELS, lessonsDone, lessonTotal,
  levelProgress, modulesForLevel, moduleProgress, nextAction, recommendedModule, skillProgress, topicSummary,
  type NextAction, type PlanItem,
} from '@/lib/foundation';
import type { FoundationProgress, UserProfile } from '@/lib/models';
import { cn } from '@/lib/utils';
import { useFoundation, useText } from './useFoundation';

const SKILL_ICON = { grammar: Layers, vocabulary: BookOpen, listening: Headphones, reading: BookOpen, writing: PenLine, speaking: Mic } as const;

/** The one next step: title, Mino's message and the button. */
function useNextStep(fp: FoundationProgress, action: NextAction) {
  const { t } = useLocale();
  const text = useText();
  const lessonTitle = (id: string) => text(findLesson(id)!.lesson.title);
  switch (action.kind) {
    case 'check':
      return { title: t('foundation.next.check'), mino: t('foundation.mino.check'), cta: t('foundation.action.takeCheck'), href: '/ielts/foundation/diagnostic' };
    case 'resume': {
      return {
        title: t('foundation.next.resume', { lesson: lessonTitle(action.lessonId) }),
        mino: t('foundation.mino.resume', { lesson: lessonTitle(action.lessonId) }),
        cta: t('foundation.action.continueLesson'),
        href: `/ielts/foundation/lesson/${action.lessonId}`,
      };
    }
    case 'review': {
      const topic = text(getConcept(action.concept)!.title);
      return {
        title: t('foundation.next.review', { topic }),
        mino: action.reason === 'scheduled' ? t('foundation.mino.scheduled', { topic }) : t('foundation.mino.review', { n: action.count, topic }),
        cta: t('foundation.action.review', { topic }),
        href: `/ielts/foundation/review/${action.concept}`,
      };
    }
    case 'lesson': {
      const lesson = findLesson(action.lessonId)!.lesson;
      const skills = [...new Set(lesson.steps.flatMap((s) => (s.kind === 'ielts' ? s.uses.map((u) => u.skill) : [])))]
        .slice(0, 2)
        .map((s) => t(`foundation.lesson.skill.${s}`))
        .join(t('foundation.mino.and'));
      return {
        title: t('foundation.next.lesson', { lesson: text(lesson.title) }),
        mino: t('foundation.mino.lesson', { lesson: text(lesson.title), skills: skills || 'IELTS' }),
        cta: t('foundation.action.startLesson'),
        href: `/ielts/foundation/lesson/${lesson.id}`,
      };
    }
    case 'quiz': {
      const module = getModule(action.moduleId)!;
      return { title: t('foundation.next.quiz', { module: text(module.title) }), mino: t('foundation.mino.quiz'), cta: t('foundation.action.takeQuiz'), href: `/ielts/foundation/quiz/${module.id}` };
    }
    case 'done':
      return { title: t('foundation.next.done'), mino: t('foundation.mino.done'), cta: t('foundation.action.practiceTests'), href: '/ielts/tests' };
  }
}

function PlanRow({ item }: { item: PlanItem }) {
  const { t } = useLocale();
  const text = useText();
  const label =
    item.kind === 'review'
      ? t('foundation.today.items.review', { topic: text(getConcept(item.ref!)!.title) })
      : item.kind === 'lesson'
        ? text(findLesson(item.ref!)!.lesson.title)
        : item.kind === 'quiz'
          ? t('foundation.today.items.quiz', { module: text(getModule(item.ref!)!.title) })
          : item.kind === 'vocabulary' && item.href === '/ielts/reading'
            ? t('foundation.today.items.vocabularyNew')
            : t(`foundation.today.items.${item.kind}`);
  return (
    <Link href={item.href} className="flex min-h-12 items-center gap-3 px-4 py-2.5 hover:bg-muted/60">
      <span
        className={cn('flex size-5 shrink-0 items-center justify-center rounded-full border-2', item.done ? 'border-success bg-success text-white' : 'border-border')}
        aria-hidden
      >
        {item.done && <Check className="size-3" />}
      </span>
      <span className={cn('min-w-0 flex-1 text-[15px]', item.done && 'text-muted-foreground line-through')}>{label}</span>
      <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{t('foundation.today.minutes', { n: item.minutes })}</span>
    </Link>
  );
}

function FoundationHome({ profile, fp }: { profile: UserProfile; fp: FoundationProgress }) {
  const { t } = useLocale();
  const text = useText();
  const { update } = useFoundation();
  const brain = useBrainContext();
  const action = nextAction(fp);
  const step = useNextStep(fp, action);
  const progress = levelProgress(1, fp);
  const completed = Object.keys(fp.lessons).length;
  const goal = dailyGoal(profile);
  const plan = foundationDailyPlan(profile, brain);
  const journey = foundationJourney(fp);
  const topics = topicSummary(fp).filter((x) => x.status !== 'learning');
  const rec = recommendedModule(fp);

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('foundation.title')}
        subtitle={t('foundation.currentLevel', { n: 1, title: text(LEVELS[0].title) })}
        backHref="/ielts"
        backLabel="IELTS"
        action={fp.diagnostic ? <StatusChip tone={fp.diagnostic.level === 'strong' ? 'success' : 'brand'}>{t(`foundation.level.${fp.diagnostic.level}`)}</StatusChip> : undefined}
      />

      {/* Where am I? */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-3 text-sm">
          <span className="font-medium">{t('foundation.progressLabel')}</span>
          <span className="text-muted-foreground">
            <span className="font-semibold text-foreground tabular-nums">{progress}%</span> · {t('foundation.completedLessons', { n: completed })}
          </span>
        </div>
        <ProgressBar value={progress} label={t('foundation.progressLabel')} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        {/* What should I do next? One obvious action, with Mino's reason. */}
        <Panel variant="brand" className="space-y-4">
          {!fp.introSeenAt && action.kind === 'check' && (
            <p className="leading-7">{t('foundation.introBody')}</p>
          )}
          <p className="text-xl font-semibold tracking-tight">{step.title}</p>
          <div className="flex gap-2.5 rounded-xl bg-background/70 p-3 text-[15px]">
            <Sparkles className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
            <p>
              <span className="font-semibold">{t('foundation.mino.says')}: </span>
              {step.mino}
            </p>
          </div>
          <Button asChild size="lg" className="w-full sm:w-auto" onClick={() => !fp.introSeenAt && update((p) => ({ ...p, introSeenAt: new Date().toISOString() }))}>
            <Link href={step.href}>
              {step.cta} <ArrowRight />
            </Link>
          </Button>
        </Panel>

        {/* Today */}
        <Panel className="space-y-4 p-0">
          <div className="space-y-3 px-5 pt-5">
            <p className="font-semibold">{t('foundation.today.title')}</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                [t('foundation.today.lessons', { done: Math.min(goal.doneLessons, goal.lessons), total: goal.lessons }), goal.doneLessons / goal.lessons],
                [t('foundation.today.questions', { done: Math.min(goal.doneQuestions, goal.questions), total: goal.questions }), goal.doneQuestions / goal.questions],
              ].map(([label, ratio]) => (
                <div key={label as string} className="space-y-1.5">
                  <ProgressBar value={Math.min(1, ratio as number) * 100} label={label as string} size="sm" tone={(ratio as number) >= 1 ? 'success' : 'brand'} />
                  <p className="text-xs text-muted-foreground tabular-nums">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="px-5 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">{t('foundation.today.plan')}</p>
            <div className="divide-y border-t">
              {plan.map((item) => (
                <PlanRow key={`${item.kind}-${item.ref ?? ''}`} item={item} />
              ))}
            </div>
          </div>
        </Panel>
      </div>

      {/* The guided journey */}
      <Section title={t('foundation.journeyTitle')}>
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {journey.map((s, i) => (
            <li
              key={s.id}
              aria-current={s.state === 'current' ? 'step' : undefined}
              className={cn(
                'flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm',
                s.state === 'done' && 'border-success/40 bg-success/10',
                s.state === 'current' && 'border-brand bg-brand-soft',
                s.state === 'locked' && 'text-muted-foreground',
              )}
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full border text-xs tabular-nums" aria-hidden>
                {s.state === 'done' ? <Check className="size-3.5 text-success" /> : s.state === 'locked' ? <Lock className="size-3" /> : i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn('block truncate', s.state === 'current' && 'font-semibold')}>{t(`foundation.stage.${s.id}`)}</span>
                <span className="block text-xs text-muted-foreground">
                  {s.soon && s.state !== 'locked' ? t('foundation.soon') : t(`foundation.stageState.${s.state}`)}
                  {s.state === 'current' && s.progress !== undefined && !s.soon ? ` · ${s.progress}%` : ''}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </Section>

      {topics.length > 0 && (
        <Section title={t('foundation.topics.title')}>
          <div className="flex flex-wrap gap-2">
            {topics.map((x) => (
              <Link key={x.concept} href={x.status === 'strong' ? `/ielts/foundation/lesson/${getConcept(x.concept)!.lessonId}` : `/ielts/foundation/review/${x.concept}`}>
                <StatusChip tone={x.status === 'strong' ? 'success' : 'warning'} className="h-8 px-3 text-sm">
                  {text(getConcept(x.concept)!.title)} · {t(`foundation.topics.${x.status}`)} · {x.accuracy}%
                </StatusChip>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <Section title={t('foundation.allModules')}>
          <RowGroup>
            {[...modulesForLevel(1), ...modulesForLevel(2)].map((m) => {
              const soon = isComingSoon(m);
              const pct = moduleProgress(m, fp);
              return (
                <ListRow
                  key={m.id}
                  href={soon ? undefined : `/ielts/foundation/${m.id}`}
                  icon={soon ? Lock : SKILL_ICON[m.skill]}
                  iconTone={soon ? 'neutral' : 'brand'}
                  muted={soon}
                  title={text(m.title)}
                  description={soon ? t('foundation.soon') : t('foundation.lessonsCount', { done: lessonsDone(m, fp), total: lessonTotal(m) })}
                  trailing={
                    soon ? undefined : m.id === rec?.id && pct < 100 ? (
                      <StatusChip tone="brand">{t('foundation.recommended')}</StatusChip>
                    ) : pct >= 100 && lessonsDone(m, fp) === 0 ? (
                      <StatusChip>{t('foundation.testedOut')}</StatusChip>
                    ) : pct > 0 ? (
                      <StatusChip tone={pct >= 100 ? 'success' : 'neutral'}>{pct}%</StatusChip>
                    ) : (
                      <Circle className="size-4 text-muted-foreground" aria-hidden />
                    )
                  }
                />
              );
            })}
          </RowGroup>
        </Section>

        <div className="space-y-8">
          <Section title={t('foundation.skillsTitle')}>
            <Panel className="space-y-3">
              {skillProgress(fp).map((s) => (
                <div key={s.skill} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{t(`foundation.skills.${s.skill}`)}</span>
                    <span className="text-xs text-muted-foreground tabular-nums">{s.percent === null ? t('foundation.soon') : `${s.percent}%`}</span>
                  </div>
                  <ProgressBar value={s.percent ?? 0} label={t(`foundation.skills.${s.skill}`)} size="sm" tone={s.percent === null ? 'neutral' : 'brand'} />
                </div>
              ))}
            </Panel>
          </Section>
          {fp.diagnostic && (
            <Button asChild variant="ghost" size="sm">
              <Link href="/ielts/foundation/diagnostic">{t('foundation.diagnosticRetake')}</Link>
            </Button>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">{t('foundation.honesty')}</p>
    </div>
  );
}

export function FoundationDashboard() {
  const { profile, fp } = useFoundation();
  if (!profile || !fp) return <ScreenSkeleton />;
  return <FoundationHome profile={profile} fp={fp} />;
}
