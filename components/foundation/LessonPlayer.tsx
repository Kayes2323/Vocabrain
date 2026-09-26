'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Headphones, Mic, PenLine, RotateCcw, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel, ProgressBar, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import {
  completeLesson, conceptMastery, expectedAnswer, getConcept, lessonOutcome, nextAction, PASS_SCORE, recordAnswer, recordApplication, saveInProgress,
  type Exercise, type Lesson, type LessonStep, type Module,
} from '@/lib/foundation';
import { DiscoverStep, HookStep, MistakeLab, TimelineCards } from './LessonSteps';
import type { FoundationInProgress } from '@/lib/models';
import { cn } from '@/lib/utils';
import { ExerciseView, type ExerciseResult } from './ExerciseView';
import { useFoundation, useText } from './useFoundation';

type Page = { step: LessonStep; exercise?: Exercise; exerciseIndex?: number; exerciseCount?: number };
type Answers = FoundationInProgress['answers'];

const SKILL_ICON = { listening: Headphones, reading: BookOpen, writing: PenLine, speaking: Mic } as const;

/** Practice steps become one page per exercise; every other step is one page. */
function pagesOf(lesson: Lesson): Page[] {
  return lesson.steps.flatMap((step): Page[] =>
    step.kind === 'practice'
      ? step.exercises.map((exercise, i) => ({ step, exercise, exerciseIndex: i, exerciseCount: step.exercises.length }))
      : [{ step }],
  );
}

/** Score over auto-graded answers (writing is self-checked and not counted). */
function scoreOf(exercises: Exercise[], answers: Answers) {
  const graded = exercises.filter((e) => answers[e.id] && answers[e.id].correct !== null);
  const correct = graded.filter((e) => answers[e.id].correct).length;
  return { correct, total: graded.length, score: graded.length ? Math.round((correct / graded.length) * 100) : 100 };
}

export function LessonPlayer({ module, lesson }: { module: Module; lesson: Lesson }) {
  const { t } = useLocale();
  const text = useText();
  const { fp, update } = useFoundation();
  const pages = useMemo(() => pagesOf(lesson), [lesson]);
  const exercises = useMemo(() => pages.flatMap((p) => (p.exercise ? [p.exercise] : [])), [pages]);

  // Resume where the student left this lesson (on any device), else start a new attempt.
  const resume = fp?.inProgress?.lessonId === lesson.id ? fp.inProgress : undefined;
  const [index, setIndex] = useState(() => Math.min(resume?.page ?? 0, pages.length - 1));
  const [answers, setAnswers] = useState<Answers>(() => resume?.answers ?? {});
  const [attempt, setAttempt] = useState(() => resume?.attempt ?? (fp?.lessons[lesson.id]?.attempts ?? 0) + 1);
  const [finished, setFinished] = useState<ReturnType<typeof scoreOf> | null>(null);
  // Hook / discover choices (not graded), by page.
  const [picks, setPicks] = useState<Record<number, string | number>>({});
  const answersRef = useRef(answers);
  answersRef.current = answers;

  const page = pages[index];
  const last = index === pages.length - 1;
  const isTest = lesson.kind === 'test';

  const goTo = (i: number) => {
    setIndex(i);
    update((p) => saveInProgress(p, lesson.id, i, answersRef.current, attempt));
    window.scrollTo({ top: 0 });
  };

  const finish = () => {
    const result = scoreOf(exercises, answersRef.current);
    update((p) => completeLesson(p, lesson.id, result.score));
    setFinished(result);
    window.scrollTo({ top: 0 });
  };

  const onAnswer = (exercise: Exercise, r: ExerciseResult) => {
    const next = { ...answersRef.current, [exercise.id]: r };
    answersRef.current = next;
    setAnswers(next);
    update((p) => saveInProgress(recordAnswer(p, { source: lesson.id, exercise, answer: r.answer, correct: r.correct, attempt }), lesson.id, index, next, attempt));
  };

  const restart = () => {
    const nextAttempt = attempt + 1;
    answersRef.current = {};
    setAnswers({});
    setFinished(null);
    setIndex(0);
    setAttempt(nextAttempt);
    update((p) => saveInProgress(p, lesson.id, 0, {}, nextAttempt));
  };

  const askHref = `/mino?${new URLSearchParams({ ask: 'lesson', lesson: text(lesson.title) })}`;

  if (finished) {
    const outcome = lessonOutcome(finished.score);
    const missed = exercises.filter((e) => answers[e.id]?.correct === false);
    const missedConcepts = [...new Set(missed.map((e) => e.concept).filter(Boolean) as string[])];
    const action = fp ? nextAction(fp) : undefined;
    const primary =
      outcome === 'practice'
        ? { href: undefined, label: t('foundation.lesson.tryAgain') }
        : action?.kind === 'review'
          ? { href: `/ielts/foundation/review/${action.concept}`, label: t('foundation.action.review', { topic: text(getConcept(action.concept)!.title) }) }
          : action?.kind === 'lesson' || action?.kind === 'resume'
            ? { href: `/ielts/foundation/lesson/${action.lessonId}`, label: t('foundation.lesson.nextLesson') }
            : { href: '/ielts/foundation', label: t('foundation.action.continueJourney') };
    return (
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <Panel variant={outcome === 'practice' ? 'muted' : 'brand'} className="space-y-3 text-center">
          <p className="text-sm text-muted-foreground">{text(lesson.title)}</p>
          <h1 className="text-2xl font-semibold">
            {isTest ? t(finished.score >= PASS_SCORE ? 'foundation.lesson.testPassed' : 'foundation.lesson.testNotYet') : t(`foundation.lesson.resultTitle.${outcome}`)}
          </h1>
          {finished.total > 0 && (
            <p className="text-lg font-semibold tabular-nums">
              {t('foundation.lesson.score', { correct: finished.correct, total: finished.total })} · {finished.score}%
            </p>
          )}
          <p className="text-sm text-muted-foreground">{t(`foundation.lesson.resultBody.${outcome}`)}</p>
        </Panel>

        {lesson.concept && fp && <MasteryPanel concept={lesson.concept} />}

        {missed.length > 0 && (
          <Panel className="space-y-3">
            <p className="font-semibold">{t('foundation.lesson.reviewMistakes')}</p>
            <ul className="space-y-3 text-sm">
              {missed.map((e) => (
                <li key={e.id} className="space-y-1 border-l-2 border-amber-500/60 pl-3">
                  {e.sentence && <p lang="en" className="text-muted-foreground">{e.sentence}</p>}
                  <p lang="en">
                    <span className="text-muted-foreground line-through decoration-destructive/60">{answers[e.id].answer}</span>{' '}
                    <span className="font-medium">→ {expectedAnswer(e)}</span>
                  </p>
                  <p className="text-foreground/80">{text(e.explanation)}</p>
                </li>
              ))}
            </ul>
            {isTest && missedConcepts.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {missedConcepts.map((c) => (
                  <Button key={c} asChild size="sm" variant="outline">
                    <Link href={`/ielts/foundation/review/${c}`}>{t('foundation.action.review', { topic: text(getConcept(c)!.title) })}</Link>
                  </Button>
                ))}
              </div>
            )}
          </Panel>
        )}

        <div className="flex flex-col gap-2 sm:flex-row">
          {primary.href ? (
            <Button asChild size="lg" className="flex-1">
              <Link href={primary.href}>
                {primary.label} <ArrowRight />
              </Link>
            </Button>
          ) : (
            <Button size="lg" className="flex-1" onClick={restart}>
              <RotateCcw /> {primary.label}
            </Button>
          )}
          {primary.href && (
            <Button size="lg" variant="outline" className="flex-1" onClick={restart}>
              <RotateCcw /> {t('foundation.lesson.tryAgain')}
            </Button>
          )}
        </div>
        <div className="flex justify-center gap-2">
          <Button asChild variant="ghost">
            <Link href={askHref}>
              <Sparkles /> {t('foundation.lesson.askMino')}
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href={`/ielts/foundation/${module.id}`}>{t('foundation.lesson.exit')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const step = page.step;
  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      {/* Header: where am I in this lesson */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <Button asChild variant="ghost" size="icon" aria-label={t('foundation.lesson.exit')}>
            <Link href={`/ielts/foundation/${module.id}`}>
              <X />
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" /> {t('foundation.lesson.minutes', { n: lesson.minutes })}
            </span>
            <StatusChip>{t(`foundation.lesson.difficulty.${lesson.difficulty}`)}</StatusChip>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href={askHref}>
              <Sparkles /> <span className="hidden sm:inline">{t('foundation.lesson.askMino')}</span>
            </Link>
          </Button>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="truncate">{text(module.title)} · {text(lesson.title)}</span>
            <span className="shrink-0 tabular-nums">{t('foundation.lesson.stepOf', { n: index + 1, total: pages.length })}</span>
          </div>
          <ProgressBar value={((index + 1) / pages.length) * 100} label={text(lesson.title)} size="sm" />
        </div>
      </div>

      {index === 0 && (
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">{text(lesson.title)}</h1>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{t('foundation.lesson.why')}: </span>
            {text(lesson.why)}
          </p>
        </div>
      )}

      <section className="space-y-4" aria-live="polite">
        <h2 className="text-lg font-semibold">
          {text(step.title)}
          {page.exercise && page.exerciseCount! > 1 && (
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              {t('foundation.lesson.exerciseOf', { n: page.exerciseIndex! + 1, total: page.exerciseCount! })}
            </span>
          )}
        </h2>

        {step.kind === 'hook' && <HookStep step={step} picked={picks[index] as string | undefined} onPick={(o) => setPicks((p) => ({ ...p, [index]: o }))} />}
        {step.kind === 'discover' && <DiscoverStep step={step} picked={picks[index] as number | undefined} onPick={(i) => setPicks((p) => ({ ...p, [index]: i }))} />}
        {step.kind === 'mistakes' && <MistakeLab step={step} />}
        {step.kind === 'practice' && step.mode && step.mode !== 'practice' && (
          <p className="text-sm text-muted-foreground">{t(`foundation.lesson.mode.${step.mode}`)}</p>
        )}

        {step.kind === 'concept' && (
          <Panel className="space-y-3">
            <p className="leading-7">{text(step.body)}</p>
            {step.points && (
              <ul className="space-y-1.5 text-[15px]">
                {step.points.map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-brand">•</span> {text(p)}
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        )}
        {step.kind === 'concept' && step.timeline && <TimelineCards items={step.timeline} />}

        {step.kind === 'examples' && (
          <div className="space-y-3">
            {step.items.map((item, i) => (
              <Panel key={i} className="space-y-1.5 p-4">
                <p className="text-lg" lang="en">{item.en}</p>
                <p className="text-sm text-muted-foreground">{text(item.note)}</p>
              </Panel>
            ))}
          </div>
        )}

        {step.kind === 'ielts' && (
          <div className="space-y-3">
            {step.uses.map((u, i) => {
              const Icon = SKILL_ICON[u.skill];
              return (
                <Panel key={i} className="space-y-2 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-brand">
                    <Icon className="size-4" /> {t(`foundation.lesson.skill.${u.skill}`)}
                  </p>
                  <p className="text-[17px]" lang="en">“{u.example}”</p>
                  <p className="text-sm text-muted-foreground">{text(u.note)}</p>
                </Panel>
              );
            })}
          </div>
        )}

        {step.kind === 'recall' && (
          <Panel variant="brand" className="space-y-2">
            {step.points.map((p, i) => (
              <p key={i} className="flex gap-2">
                <span className="text-brand">✓</span> {text(p)}
              </p>
            ))}
          </Panel>
        )}

        {page.exercise && (
          <Panel>
            <ExerciseView
              key={`${page.exercise.id}-${attempt}`}
              exercise={page.exercise}
              initial={answers[page.exercise.id]}
              lessonId={lesson.id}
              onApplied={(fb, text) =>
                update((p) => recordApplication(p, { source: lesson.id, exercise: page.exercise!, text, verdict: fb.verdict, corrected: fb.corrected, attempt }))
              }
              doneLabel={last ? t('foundation.lesson.complete') : t('foundation.lesson.next')}
              onAnswer={(r) => onAnswer(page.exercise!, r)}
              onDone={() => (last ? finish() : goTo(index + 1))}
            />
          </Panel>
        )}
      </section>

      {!page.exercise && (
        <div className={cn('flex gap-2', index > 0 ? 'justify-between' : 'justify-end')}>
          {index > 0 && (
            <Button variant="ghost" size="lg" onClick={() => goTo(index - 1)}>
              <ArrowLeft /> {t('foundation.lesson.back')}
            </Button>
          )}
          <Button
            size="lg"
            disabled={(step.kind === 'hook' || step.kind === 'discover') && picks[index] === undefined}
            onClick={() => (last ? finish() : goTo(index + 1))}
          >
            {(step.kind === 'hook' || step.kind === 'discover') && picks[index] === undefined
              ? t('foundation.lesson.pickFirst')
              : last
                ? t('foundation.lesson.complete')
                : t('foundation.lesson.continue')}{' '}
            <ArrowRight />
          </Button>
        </div>
      )}
    </div>
  );
}

/** Evidence of mastery for a concept (not just "lesson completed") and when it comes back for review. */
function MasteryPanel({ concept }: { concept: string }) {
  const { t } = useLocale();
  const text = useText();
  const { fp } = useFoundation();
  if (!fp) return null;
  const m = conceptMastery(fp, concept);
  const srs = fp.concepts[concept]?.srs;
  const hours = srs ? (Date.parse(srs.dueAt) - Date.now()) / 3_600_000 : undefined;
  const when = hours === undefined ? undefined : hours < 20 ? t('foundation.lesson.when.soon') : hours < 36 ? t('foundation.lesson.when.tomorrow') : t('foundation.lesson.when.days', { n: Math.round(hours / 24) });
  return (
    <Panel className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">{t('foundation.lesson.masteryTitle', { topic: text(getConcept(concept)!.title) })}</p>
        <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium">{t(`foundation.lesson.masteryLevel.${m.level}`)}</span>
      </div>
      <ul className="space-y-1.5 text-sm">
        {(['recognition', 'recall', 'application', 'consistency'] as const).map((k) => (
          <li key={k} className="flex items-center gap-2">
            <span className={cn('flex size-4 items-center justify-center rounded-full border', m[k] ? 'border-success bg-success text-white' : 'border-border')} aria-hidden>
              {m[k] && <span className="text-[10px]">✓</span>}
            </span>
            <span className={cn(!m[k] && 'text-muted-foreground')}>{t(`foundation.lesson.mastery.${k}`)}</span>
          </li>
        ))}
      </ul>
      {when && <p className="text-sm text-muted-foreground">{t('foundation.lesson.nextReview', { when })}</p>}
    </Panel>
  );
}
