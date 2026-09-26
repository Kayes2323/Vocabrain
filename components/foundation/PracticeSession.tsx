'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel, ProgressBar } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import {
  expectedAnswer, findLesson, getConcept, nextAction, PASS_SCORE, quizQuestions, recentConceptMistakes, recordAnswer, recordQuiz,
  recordReview, reviewQuestions, type Exercise, type Module,
} from '@/lib/foundation';
import type { FoundationProgress } from '@/lib/models';
import { ExerciseView, type ExerciseResult } from './ExerciseView';
import { useFoundation, useText } from './useFoundation';

type Mode = { kind: 'review'; concept: string } | { kind: 'quiz'; module: Module };

/**
 * A short practice session. Review: 5-minute explanation of one concept, then
 * 5 questions (a retest that includes recently missed ones). Quiz: questions
 * from the lessons finished in a module.
 */
export function PracticeSession({ mode, fp }: { mode: Mode; fp: FoundationProgress }) {
  const { t } = useLocale();
  const text = useText();
  const { update, fp: live } = useFoundation();
  const [round, setRound] = useState(0);
  // Questions are fixed for the session and recomputed (from the latest data) only on retry.
  const questions = useMemo<Exercise[]>(() => {
    const data = live ?? fp;
    return mode.kind === 'review' ? reviewQuestions(data, mode.concept) : quizQuestions(data, mode.module);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);
  const source = mode.kind === 'review' ? `review:${mode.concept}` : `quiz:${mode.module.id}`;
  const concept = mode.kind === 'review' ? getConcept(mode.concept) : undefined;
  const conceptStep = concept ? findLesson(concept.lessonId)?.lesson.steps.find((s) => s.kind === 'concept') : undefined;
  const recent = mode.kind === 'review' ? recentConceptMistakes(fp, mode.concept).length : 0;

  const [phase, setPhase] = useState<'learn' | 'questions' | 'result'>(mode.kind === 'review' ? 'learn' : 'questions');
  const [index, setIndex] = useState(0);
  const results = useRef<Record<string, ExerciseResult>>({});
  const [score, setScore] = useState(0);

  const title = mode.kind === 'review' ? t('foundation.review.title', { topic: text(concept!.title) }) : t('foundation.quiz.title', { module: text(mode.module.title) });
  const exitHref = '/ielts/foundation';

  const finish = () => {
    const graded = questions.filter((q) => results.current[q.id]?.correct !== null);
    const correct = graded.filter((q) => results.current[q.id]?.correct).length;
    const s = graded.length ? Math.round((correct / graded.length) * 100) : 0;
    setScore(s);
    update((p) => (mode.kind === 'review' ? recordReview(p, mode.concept, s) : recordQuiz(p)));
    setPhase('result');
    window.scrollTo({ top: 0 });
  };

  if (phase === 'learn' && conceptStep && conceptStep.kind === 'concept') {
    return (
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <Header title={title} exitHref={exitHref} progress={0} />
        {recent > 0 && <p className="text-sm text-muted-foreground">{t('foundation.review.why', { n: recent, topic: text(concept!.title) })}</p>}
        <Panel className="space-y-3">
          <p className="font-semibold">{text(conceptStep.title)}</p>
          <p className="leading-7">{text(conceptStep.body)}</p>
          {conceptStep.points && (
            <ul className="space-y-1.5 text-[15px]">
              {conceptStep.points.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-brand">•</span> {text(p)}
                </li>
              ))}
            </ul>
          )}
        </Panel>
        <div className="flex justify-end">
          <Button size="lg" onClick={() => setPhase('questions')}>
            {t('foundation.review.start', { n: questions.length })} <ArrowRight />
          </Button>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const passed = score >= PASS_SCORE;
    const missed = questions.filter((q) => results.current[q.id]?.correct === false);
    const action = live ? nextAction(live) : undefined;
    return (
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <Panel variant={passed ? 'brand' : 'muted'} className="space-y-2 text-center">
          <p className="text-sm text-muted-foreground">{title}</p>
          <h1 className="text-2xl font-semibold">{t(passed ? 'foundation.review.passed' : 'foundation.review.notYet')}</h1>
          <p className="text-lg font-semibold tabular-nums">{score}%</p>
          <p className="text-sm text-muted-foreground">{t(passed ? 'foundation.review.passedBody' : 'foundation.review.notYetBody')}</p>
        </Panel>
        {missed.length > 0 && (
          <Panel className="space-y-3">
            <p className="font-semibold">{t('foundation.lesson.reviewMistakes')}</p>
            <ul className="space-y-3 text-sm">
              {missed.map((q) => (
                <li key={q.id} className="space-y-1 border-l-2 border-amber-500/60 pl-3">
                  {q.sentence && <p lang="en" className="text-muted-foreground">{q.sentence}</p>}
                  <p lang="en" className="font-medium">→ {expectedAnswer(q)}</p>
                  <p className="text-foreground/80">{text(q.explanation)}</p>
                </li>
              ))}
            </ul>
          </Panel>
        )}
        <div className="flex flex-col gap-2 sm:flex-row">
          {passed ? (
            <Button asChild size="lg" className="flex-1">
              <Link href={action?.kind === 'lesson' || action?.kind === 'resume' ? `/ielts/foundation/lesson/${action.lessonId}` : exitHref}>
                {t('foundation.action.continueJourney')} <ArrowRight />
              </Link>
            </Button>
          ) : (
            <Button
              size="lg"
              className="flex-1"
              onClick={() => {
                results.current = {};
                setIndex(0);
                setRound((r) => r + 1);
                setPhase(mode.kind === 'review' ? 'learn' : 'questions');
              }}
            >
              <RotateCcw /> {t('foundation.review.retest')}
            </Button>
          )}
          {mode.kind === 'review' && concept && (
            <Button asChild size="lg" variant="outline" className="flex-1">
              <Link href={`/ielts/foundation/lesson/${concept.lessonId}`}>{t('foundation.review.fullLesson')}</Link>
            </Button>
          )}
        </div>
      </div>
    );
  }

  const q = questions[index];
  const last = index === questions.length - 1;
  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <Header title={title} exitHref={exitHref} progress={((index + 1) / questions.length) * 100} counter={t('foundation.lesson.exerciseOf', { n: index + 1, total: questions.length })} />
      <Panel>
        <ExerciseView
          key={`${q.id}-${round}`}
          exercise={q}
          doneLabel={last ? t('foundation.review.finish') : t('foundation.lesson.next')}
          onAnswer={(r) => {
            results.current[q.id] = r;
            update((p) => recordAnswer(p, { source, exercise: q, answer: r.answer, correct: r.correct, attempt: round + 1 }));
          }}
          onDone={() => {
            if (last) finish();
            else {
              setIndex((i) => i + 1);
              window.scrollTo({ top: 0 });
            }
          }}
        />
      </Panel>
    </div>
  );
}

function Header({ title, exitHref, progress, counter }: { title: string; exitHref: string; progress: number; counter?: string }) {
  const { t } = useLocale();
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="icon" aria-label={t('foundation.lesson.exit')}>
          <Link href={exitHref}>
            <X />
          </Link>
        </Button>
        <h1 className="min-w-0 flex-1 truncate text-lg font-semibold">{title}</h1>
        {counter && <span className="text-xs text-muted-foreground tabular-nums">{counter}</span>}
      </div>
      <ProgressBar value={progress} label={title} size="sm" />
    </div>
  );
}
