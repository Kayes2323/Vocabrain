'use client';

import Link from 'next/link';
import {
  AlignLeft, ArrowRight, BookOpen, BookText, Check, Clock3, Equal, GitMerge, Headphones, Info, Link2, MapPin, Mic, PenLine, Quote, Shapes, Sparkles,
  SpellCheck, Type, type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardGrid, ModuleCard, PageHeader, Panel, ProgressBar, ScreenSkeleton, Section, StatusChip, useGuideReminder, type Tint } from '@/components/ds';
import { useBrainContext } from '@/components/brain/useBrainContext';
import { useLocale } from '@/components/providers/LocaleProvider';
import {
  dailyGoal, findLesson, foundationDailyPlan, getConcept, getModule, isComingSoon, lessonsDone, lessonTotal, levelProgress, modulesForLevel,
  moduleProgress, nextAction, nextLesson, skillProgress, stepBeforeModule, topicSummary,
  type Module, type NextAction, type PlanItem,
} from '@/lib/foundation';
import type { FoundationProgress, UserProfile } from '@/lib/models';
import { FOUNDATION_WORDS } from '@/lib/vocab-foundation/words';
import { cn } from '@/lib/utils';
import { useFoundation, useText } from './useFoundation';

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

const MODULE_ICON: Record<string, LucideIcon> = {
  'sentence-basics': AlignLeft,
  tenses: Clock3,
  'parts-of-speech': Shapes,
  articles: Type,
  agreement: Equal,
  prepositions: MapPin,
  connectors: Link2,
  'complex-sentences': GitMerge,
  punctuation: Quote,
  'common-errors': SpellCheck,
  'vocabulary-foundation': BookOpen,
  'ielts-intro': Info,
  'listening-foundation': Headphones,
  'reading-foundation': BookText,
  'writing-foundation': PenLine,
  'speaking-foundation': Mic,
};

function FoundationHome({ profile, fp }: { profile: UserProfile; fp: FoundationProgress }) {
  const { t } = useLocale();
  const text = useText();
  const { update } = useFoundation();
  const brain = useBrainContext();
  const { intercept, dialog } = useGuideReminder();
  const action = nextAction(fp);
  const step = useNextStep(fp, action);
  const progress = levelProgress(1, fp);
  const completed = Object.keys(fp.lessons).length;
  const goal = dailyGoal(profile);
  const plan = foundationDailyPlan(profile, brain);
  const topics = topicSummary(fp).filter((x) => x.status !== 'learning');
  const next = nextLesson(fp);
  const wordsFound = Object.keys(profile.vocabFoundation?.discovered ?? {}).length;
  const vocabPct = Math.round((wordsFound / FOUNDATION_WORDS.length) * 100);

  const grammar = modulesForLevel(1).filter((m) => m.skill === 'grammar');
  const vocabulary = modulesForLevel(1).filter((m) => m.skill === 'vocabulary');
  const basics = modulesForLevel(2);

  const card = (m: Module, tint: Tint) => {
    const soon = isComingSoon(m);
    const pct = m.href ? vocabPct : moduleProgress(m, fp);
    const before = stepBeforeModule(m, fp);
    const href = m.href ?? `/ielts/foundation/${m.id}`;
    return (
      <ModuleCard
        key={m.id}
        icon={MODULE_ICON[m.id] ?? BookOpen}
        tint={tint}
        title={text(m.short ?? m.title)}
        subtitle={
          soon
            ? t('foundation.soon')
            : m.href
              ? t('foundation.wordsCount', { done: wordsFound, total: FOUNDATION_WORDS.length })
              : pct > 0
                ? t('foundation.lessonsCount', { done: lessonsDone(m, fp), total: lessonTotal(m) })
                : t('foundation.lessonsN', { n: lessonTotal(m) })
        }
        progress={!soon && pct > 0 ? pct : undefined}
        highlight={next?.module.id === m.id}
        href={href}
        onClick={(e) => intercept(href, before && `/ielts/foundation/lesson/${before.lesson.id}`, `module:${m.id}`) && e.preventDefault()}
      />
    );
  };

  const skills = skillProgress(fp).map((s) => (s.skill === 'vocabulary' ? { ...s, percent: vocabPct } : s));

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('foundation.title')}
        subtitle={t('foundation.subtitle')}
        backHref="/ielts"
        backLabel="IELTS"
        action={fp.diagnostic ? <StatusChip tone={fp.diagnostic.level === 'strong' ? 'success' : 'brand'}>{t(`foundation.level.${fp.diagnostic.level}`)}</StatusChip> : undefined}
      />

      {/* Where am I? One thin bar. */}
      <div className="-mt-2 flex items-center gap-3">
        <ProgressBar value={progress} label={t('foundation.progressLabel')} size="sm" className="flex-1" />
        <span className="shrink-0 text-sm text-muted-foreground tabular-nums">
          <span className="font-semibold text-foreground">{progress}%</span> · {t('foundation.lessonsN', { n: completed })}
        </span>
      </div>

      {/* What next? One card, one button. */}
      <Panel variant="brand" className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-1">
          <p className="text-xs font-semibold tracking-wider text-brand uppercase">{t('foundation.nextLabel')}</p>
          <p className="text-lg font-semibold tracking-tight text-balance">{step.title}</p>
          <p className="flex gap-1.5 text-sm text-muted-foreground">
            <Sparkles className="mt-0.5 size-3.5 shrink-0 text-brand" aria-hidden />
            <span className="line-clamp-2">{step.mino}</span>
          </p>
        </div>
        <Button asChild size="lg" className="h-12 shrink-0" onClick={() => !fp.introSeenAt && update((p) => ({ ...p, introSeenAt: new Date().toISOString() }))}>
          <Link href={step.href}>
            {step.cta} <ArrowRight />
          </Link>
        </Button>
      </Panel>

      <Section title={t('foundation.groups.grammar')} variant="label">
        <CardGrid>{grammar.map((m) => card(m, 'lavender'))}</CardGrid>
      </Section>

      <Section title={t('foundation.groups.vocabulary')} variant="label">
        <CardGrid>{vocabulary.map((m) => card(m, 'green'))}</CardGrid>
      </Section>

      <Section title={t('foundation.groups.basics')} variant="label">
        <CardGrid>{basics.map((m) => card(m, 'blue'))}</CardGrid>
      </Section>

      <Section title={t('foundation.groups.progress')} variant="label">
        <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2 lg:items-start">
          <Panel className="grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
            {skills.map((s) => (
              <div key={s.skill} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span>{t(`foundation.skills.${s.skill}`)}</span>
                  <span className="text-xs text-muted-foreground tabular-nums">{s.percent === null ? t('foundation.soon') : `${s.percent}%`}</span>
                </div>
                <ProgressBar value={s.percent ?? 0} label={t(`foundation.skills.${s.skill}`)} size="sm" tone={s.percent === null ? 'neutral' : 'brand'} />
              </div>
            ))}
          </Panel>

          <Panel className="p-0">
            <div className="flex items-center justify-between gap-3 px-5 pt-4 pb-2">
              <p className="font-medium">{t('foundation.today.title')}</p>
              <p className="text-xs text-muted-foreground tabular-nums">
                {t('foundation.today.lessons', { done: Math.min(goal.doneLessons, goal.lessons), total: goal.lessons })} ·{' '}
                {t('foundation.today.questions', { done: Math.min(goal.doneQuestions, goal.questions), total: goal.questions })}
              </p>
            </div>
            <div className="divide-y border-t">
              {plan.map((item) => (
                <PlanRow key={`${item.kind}-${item.ref ?? ''}`} item={item} />
              ))}
            </div>
          </Panel>
        </div>

        {topics.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {topics.map((x) => (
              <Link key={x.concept} href={x.status === 'strong' ? `/ielts/foundation/lesson/${getConcept(x.concept)!.lessonId}` : `/ielts/foundation/review/${x.concept}`}>
                <StatusChip tone={x.status === 'strong' ? 'success' : 'warning'} className="h-8 px-3 text-sm">
                  {text(getConcept(x.concept)!.title)} · {x.accuracy}%
                </StatusChip>
              </Link>
            ))}
          </div>
        )}
      </Section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">{t('foundation.honesty')}</p>
        {fp.diagnostic && (
          <Button asChild variant="ghost" size="sm">
            <Link href="/ielts/foundation/diagnostic">{t('foundation.diagnosticRetake')}</Link>
          </Button>
        )}
      </div>
      {dialog}
    </div>
  );
}

export function FoundationDashboard() {
  const { profile, fp } = useFoundation();
  if (!profile || !fp) return <ScreenSkeleton />;
  return <FoundationHome profile={profile} fp={fp} />;
}
