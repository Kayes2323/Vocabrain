'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Headphones, Mic, PenLine, RotateCcw, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel, ProgressBar, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import {
  expectedAnswer, lessonOutcome, nextLesson, recordLesson,
  type ErrorTag, type Exercise, type Lesson, type LessonStep, type Module,
} from '@/lib/foundation';
import { cn } from '@/lib/utils';
import { ExerciseView, type ExerciseResult } from './ExerciseView';
import { useFoundation, useText } from './useFoundation';

type Page = { step: LessonStep; exercise?: Exercise; exerciseIndex?: number; exerciseCount?: number };

const SKILL_ICON = { listening: Headphones, reading: BookOpen, writing: PenLine, speaking: Mic } as const;

/** Practice steps become one page per exercise; every other step is one page. */
function pagesOf(lesson: Lesson): Page[] {
  return lesson.steps.flatMap((step): Page[] =>
    step.kind === 'practice'
      ? step.exercises.map((exercise, i) => ({ step, exercise, exerciseIndex: i, exerciseCount: step.exercises.length }))
      : [{ step }],
  );
}

export function LessonPlayer({ module, lesson }: { module: Module; lesson: Lesson }) {
  const { t } = useLocale();
  const text = useText();
  const { fp, update } = useFoundation();
  const pages = useMemo(() => pagesOf(lesson), [lesson]);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<Record<string, ExerciseResult>>({});
  const [finished, setFinished] = useState<{ score: number; correct: number; total: number } | null>(null);
  const [attempt, setAttempt] = useState(0);

  const exercises = pages.flatMap((p) => (p.exercise ? [p.exercise] : []));
  const page = pages[index];
  const last = index === pages.length - 1;

  const finish = (all: Record<string, ExerciseResult>) => {
    const graded = exercises.filter((e) => all[e.id]?.correct !== null && all[e.id] !== undefined);
    const correct = graded.filter((e) => all[e.id].correct).length;
    const score = graded.length ? Math.round((correct / graded.length) * 100) : 100;
    const wrongTags = graded.filter((e) => !all[e.id].correct).map((e) => e.tag as ErrorTag);
    update((p) => recordLesson(p, lesson.id, score, wrongTags));
    setFinished({ score, correct, total: graded.length });
    window.scrollTo({ top: 0 });
  };

  const advance = (all = results) => {
    if (last) finish(all);
    else {
      setIndex((i) => i + 1);
      window.scrollTo({ top: 0 });
    }
  };

  const restart = () => {
    setResults({});
    setFinished(null);
    setIndex(0);
    setAttempt((a) => a + 1);
  };

  const askHref = `/mino?${new URLSearchParams({ ask: 'lesson', lesson: text(lesson.title) })}`;

  if (finished) {
    const outcome = lessonOutcome(finished.score);
    const next = fp ? nextLesson(fp) : undefined;
    const missed = exercises.filter((e) => results[e.id]?.correct === false);
    return (
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <Panel variant={outcome === 'practice' ? 'muted' : 'brand'} className="space-y-3 text-center">
          <p className="text-sm text-muted-foreground">{text(lesson.title)}</p>
          <h1 className="text-2xl font-semibold">{t(`foundation.lesson.resultTitle.${outcome}`)}</h1>
          {finished.total > 0 && <p className="text-lg font-semibold tabular-nums">{t('foundation.lesson.score', { correct: finished.correct, total: finished.total })}</p>}
          <p className="text-sm text-muted-foreground">{t(`foundation.lesson.resultBody.${outcome}`)}</p>
        </Panel>

        {missed.length > 0 && (
          <Panel className="space-y-3">
            <p className="font-semibold">{t('foundation.lesson.reviewMistakes')}</p>
            <ul className="space-y-3 text-sm">
              {missed.map((e) => (
                <li key={e.id} className="space-y-1 border-l-2 border-amber-500/60 pl-3">
                  {e.sentence && <p lang="en" className="text-muted-foreground">{e.sentence}</p>}
                  <p lang="en" className="font-medium">→ {expectedAnswer(e)}</p>
                  <p className="text-foreground/80">{text(e.explanation)}</p>
                </li>
              ))}
            </ul>
          </Panel>
        )}

        <div className="flex flex-col gap-2 sm:flex-row">
          {outcome === 'practice' ? (
            <Button size="lg" className="flex-1" onClick={restart}>
              <RotateCcw /> {t('foundation.lesson.tryAgain')}
            </Button>
          ) : next ? (
            <Button asChild size="lg" className="flex-1">
              <Link href={`/ielts/foundation/lesson/${next.lesson.id}`}>
                {t('foundation.lesson.nextLesson')} <ArrowRight />
              </Link>
            </Button>
          ) : null}
          {outcome !== 'practice' && (
            <Button size="lg" variant="outline" className="flex-1" onClick={restart}>
              <RotateCcw /> {t('foundation.lesson.tryAgain')}
            </Button>
          )}
          <Button asChild size="lg" variant="outline" className="flex-1">
            <Link href={askHref}>
              <Sparkles /> {t('foundation.lesson.askMino')}
            </Link>
          </Button>
        </div>
        <Button asChild variant="ghost" className="w-full">
          <Link href={`/ielts/foundation/${module.id}`}>{t('foundation.lesson.exit')}</Link>
        </Button>
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
              doneLabel={last ? t('foundation.lesson.complete') : t('foundation.lesson.next')}
              onDone={(r) => {
                const all = { ...results, [page.exercise!.id]: r };
                setResults(all);
                advance(all);
              }}
            />
          </Panel>
        )}
      </section>

      {!page.exercise && (
        <div className={cn('flex gap-2', index > 0 ? 'justify-between' : 'justify-end')}>
          {index > 0 && (
            <Button variant="ghost" size="lg" onClick={() => setIndex((i) => i - 1)}>
              <ArrowLeft /> {t('foundation.lesson.back')}
            </Button>
          )}
          <Button size="lg" onClick={() => advance()}>
            {last ? t('foundation.lesson.complete') : t('foundation.lesson.continue')} <ArrowRight />
          </Button>
        </div>
      )}
    </div>
  );
}
