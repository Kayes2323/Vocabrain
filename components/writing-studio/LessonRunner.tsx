'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, PartyPopper, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, Panel, ProgressBar, StatusChip } from '@/components/ds';
import { minoReact } from '@/components/mino/Mino';
import { MinoCoachMascot } from '@/components/mino/MinoCoachMascot';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { writingStudioFeedback } from '@/lib/ai/client';
import { cn } from '@/lib/utils';
import { findLessonStepAudio } from '@/lib/writing-studio/audio-manifest';
import { CHART_DATASETS, chartToTable } from '@/lib/writing-studio/charts';
import { checkEssay, deriveScope, fromAI, fromLocal, type UnifiedFeedback } from '@/lib/writing-studio/feedback';
import { recordLesson, recordMistakes } from '@/lib/writing-studio/progress';
import { localize, type Lesson } from '@/lib/writing-studio/types';
import { FeedbackPanel } from './FeedbackPanel';
import { LessonAudioControls } from './LessonAudioControls';
import { MaterialPanel } from './MaterialPanel';
import { TrainerPanel } from './TrainerPanel';
import { useLessonStepAudio } from './useLessonStepAudio';
import { WSChart } from './WSChart';
import { WritingEditor } from './WritingEditor';

type Phase = 'learn' | 'write' | 'assessing' | 'feedback' | 'done';

function CheckBlock({
  question,
  selected,
  onSelect,
  locale,
}: {
  question: NonNullable<Lesson['steps'][number]['check']>;
  selected: number | null;
  onSelect: (i: number) => void;
  locale: 'en' | 'bn';
}) {
  return (
    <div className="space-y-2.5">
      <p className="font-medium">{localize(locale, question.prompt)}</p>
      <div className="space-y-2">
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === question.correctIndex;
          const showState = selected !== null;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              disabled={selected !== null}
              className={cn(
                'flex w-full items-center justify-between gap-3 rounded-xl border bg-card px-4 py-3 text-left text-sm transition-colors',
                showState && isCorrect && 'border-success bg-success-soft',
                showState && isSelected && !isCorrect && 'border-destructive bg-destructive-soft',
                !showState && 'hover:border-foreground/20',
              )}
            >
              <span lang="en">{opt}</span>
              {showState && isCorrect && <Check className="size-4 shrink-0 text-success" />}
              {showState && isSelected && !isCorrect && <X className="size-4 shrink-0 text-destructive" />}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <Callout tone={selected === question.correctIndex ? 'success' : 'warning'}>{localize(locale, question.explain)}</Callout>
      )}
    </div>
  );
}

/**
 * The lesson runner for a fully-authored lesson: walks the ten-step teaching
 * loop (spec §8), then hands off to the dedicated Writing Zone and Feedback
 * Zone for the lesson's final task.
 */
export function LessonRunner({ lesson, academyHref }: { lesson: Lesson; academyHref: string }) {
  const { locale, hasChosen } = useLocale();
  // Bangla is the default learning language for the Task 1 curriculum until a
  // student has explicitly picked a UI language on this device; Task 2 (and
  // every other screen) keeps following the student's normal locale choice,
  // unchanged, so this never alters Task 2's behaviour.
  const contentLocale: 'en' | 'bn' = lesson.task === 'task1' && !hasChosen ? 'bn' : locale;
  const { updateProfile } = useProfile();
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('learn');
  const [checkAnswer, setCheckAnswer] = useState<number | null>(null);
  const [boardDone, setBoardDone] = useState(false);
  const [essay, setEssay] = useState('');
  const [feedback, setFeedback] = useState<UnifiedFeedback | null>(null);
  const [submissions, setSubmissions] = useState(0);

  const step = lesson.steps[stepIndex];
  const isLastStep = stepIndex === lesson.steps.length - 1;

  const audio = useLessonStepAudio({ lessonId: lesson.id, stepId: step.id, active: phase === 'learn' });

  useEffect(() => {
    setCheckAnswer(null);
    setBoardDone(false);
  }, [stepIndex]);

  // Warm the browser's own HTTP cache for the next slide's clip while the
  // current one plays, without holding a second Audio instance or any
  // component state — a failed/absent prefetch is silently ignored, it
  // only means the next slide loads at normal speed instead of instantly.
  useEffect(() => {
    if (phase !== 'learn' || isLastStep) return;
    const next = lesson.steps[stepIndex + 1];
    const asset = next ? findLessonStepAudio(lesson.id, next.id) : undefined;
    if (!asset) return;
    const controller = new AbortController();
    fetch(asset.path, { signal: controller.signal }).catch(() => {});
    return () => controller.abort();
  }, [phase, isLastStep, lesson.id, lesson.steps, stepIndex]);

  const needsCheckAnswer = !!step.check && checkAnswer === null;
  const needsBoard = (step.material?.type === 'chart-board' || step.material?.type === 'idea-board') && !boardDone;
  const nextDisabled = needsCheckAnswer || needsBoard;

  const goNext = () => {
    minoReact('success');
    if (isLastStep) setPhase('write');
    else setStepIndex((i) => i + 1);
  };
  const goBack = () => setStepIndex((i) => Math.max(0, i - 1));

  const scope = deriveScope(lesson);

  const taskNum: 1 | 2 = lesson.task === 'task1' ? 1 : 2;

  const submit = async () => {
    const local = checkEssay(essay, lesson.finalPrompt.minWords, lesson.task, scope, !!lesson.finalPrompt.skillFocus, contentLocale);
    setSubmissions((n) => n + 1);
    setPhase('assessing');

    const chart = lesson.finalPrompt.chartId ? CHART_DATASETS[lesson.finalPrompt.chartId] : undefined;
    const res = await writingStudioFeedback(
      {
        task: taskNum,
        // The AI only ever receives the English prompt — it is the instruction
        // sent to the model, not learner-facing display text.
        prompt: `${localize('en', lesson.finalPrompt.title)}. ${localize('en', lesson.finalPrompt.instructions)}`,
        minWords: lesson.finalPrompt.minWords,
        chart: chart ? chartToTable(chart) : undefined,
        skillFocus: lesson.finalPrompt.skillFocus,
        checkScope: lesson.finalPrompt.checkScope,
      },
      essay,
      contentLocale,
    );
    const unified = res.ok
      ? fromAI(res.feedback, local.wordCount, lesson.finalPrompt.minWords, lesson.finalPrompt.skillFocus)
      : fromLocal(local, res.error, lesson.finalPrompt.skillFocus);
    setFeedback(unified);
    setPhase('feedback');

    const weakest = unified.criteria?.slice().sort((a, b) => (a.band ?? 9) - (b.band ?? 9))[0]?.criterion;
    const mistakeRows = unified.mistakes.map((m) => ({ category: m.category ?? weakest ?? 'General', quote: m.quote, fix: m.fix, why: m.why }));
    // A skill drill (lesson.finalPrompt.skillFocus set) is never a full Task 1/2
    // response, so it must never write an IELTS band into the student's lesson
    // progress — that would silently contaminate bestBand/lastBand and every
    // trend/independence calculation derived from them. Lesson completion and
    // attempt counting still happen; only the band is withheld.
    updateProfile((p) => ({
      ...p,
      writingStudio: recordMistakes(
        recordLesson(p.writingStudio, lesson.id, taskNum, lesson.finalPrompt.skillFocus ? null : unified.band),
        taskNum,
        unified.source,
        mistakeRows,
      ),
    }));
  };

  if (phase === 'done') {
    return (
      <div className="mx-auto max-w-xl space-y-6 py-8 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-success-soft text-success">
          <PartyPopper className="size-7" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-2xl font-semibold">Lesson complete</h2>
          <p className="text-muted-foreground">
            "{localize(contentLocale, lesson.title)}" is done. Mino has logged this lesson and your {submissions > 1 ? `${submissions} attempts` : 'attempt'} toward your progress.
          </p>
        </div>
        <Panel className="mx-auto max-w-sm text-left text-sm">
          <p className="font-medium">What's next</p>
          <p className="mt-1 text-muted-foreground">
            Revisit this lesson any time from Mistake Revision if the same issue comes up again, or move on to the next module in the Academy.
          </p>
        </Panel>
        <div className="flex flex-col justify-center gap-2 sm:flex-row">
          <Button asChild variant="outline">
            <Link href={academyHref}>
              <ArrowLeft /> Back to Academy
            </Link>
          </Button>
          <Button
            onClick={() => {
              setPhase('learn');
              setStepIndex(0);
              setEssay('');
              setFeedback(null);
            }}
          >
            Practise this lesson again
          </Button>
        </div>
      </div>
    );
  }

  if (phase === 'assessing') {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 py-16 text-center">
        {/* Mino writing in its notebook while it reads the answer (shared rig 'writing' state) in the violet aura */}
        <span className="mino-aura mino-aura--pulse">
          <MinoCoachMascot pose="writing" size="lg" />
        </span>
        <p className="font-medium">Mino is reading your answer against the IELTS criteria…</p>
        <p className="text-sm text-muted-foreground">This usually takes a few seconds.</p>
      </div>
    );
  }

  if (phase === 'feedback' && feedback) {
    return (
      <div className="mx-auto max-w-2xl space-y-5">
        <TrainerPanel
          area={lesson.task}
          lessonTitle={localize(contentLocale, lesson.title)}
          stepTitle="Feedback"
          event={feedback.mistakes.length === 0 ? 'success' : 'struggle'}
          message={
            feedback.mistakes.length === 0
              ? "This is in good shape. Read the notes below, then we'll move on."
              : "Here's what I noticed. Fix what you can, then try again — you'll learn more from the second attempt than from reading a perfect answer."
          }
        />
        <FeedbackPanel feedback={feedback} onRetry={() => setPhase('write')} onContinue={() => setPhase('done')} />
      </div>
    );
  }

  if (phase === 'write') {
    const chart = lesson.finalPrompt.chartId ? CHART_DATASETS[lesson.finalPrompt.chartId] : undefined;
    return (
      <div className="mx-auto max-w-5xl space-y-5">
        <TrainerPanel
          area={lesson.task}
          lessonTitle={localize(contentLocale, lesson.title)}
          stepTitle="Independent practice"
          message="Now it's your turn — no more hints. Use what you worked out above and write it in your own words."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-4">
            <Panel className="space-y-2">
              <p className="font-semibold">{localize(contentLocale, lesson.finalPrompt.title)}</p>
              <p className="text-[15px] text-muted-foreground">{localize(contentLocale, lesson.finalPrompt.instructions)}</p>
              {/* A skillFocus drill (e.g. an introduction-only paraphrase exercise) isn't
                  a full Task response — its word count is a guideline, not a hard
                  minimum, so it must not be worded as one. */}
              <StatusChip>
                {lesson.finalPrompt.skillFocus ? `Suggested length: around ${lesson.finalPrompt.minWords} words` : `Minimum ${lesson.finalPrompt.minWords} words`}
              </StatusChip>
            </Panel>
            {chart && (
              <Panel className="space-y-2">
                <p className="text-sm font-medium">{chart.title}</p>
                <WSChart dataset={chart} height={200} />
              </Panel>
            )}
          </div>
          <WritingEditor
            value={essay}
            onChange={setEssay}
            minWords={lesson.finalPrompt.minWords}
            onSubmit={submit}
            submitLabel="Get feedback from Mino"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <ProgressBar value={((stepIndex + 1) / lesson.steps.length) * 100} label={`Step ${stepIndex + 1} of ${lesson.steps.length}`} size="sm" />
      <TrainerPanel
        area={lesson.task}
        lessonTitle={localize(contentLocale, lesson.title)}
        stepTitle={localize(contentLocale, step.title)}
        message={localize(contentLocale, step.trainerMessage)}
        hint={step.hint ? localize(contentLocale, step.hint) : undefined}
      />
      {!!findLessonStepAudio(lesson.id, step.id) && (
        <LessonAudioControls
          status={audio.status}
          audioOn={audio.audioOn}
          onToggleAudio={audio.setAudioOn}
          onPlay={audio.play}
          onPause={audio.pause}
          onReplay={audio.replay}
        />
      )}

      {step.material && <MaterialPanel block={step.material} locale={contentLocale} onBoardComplete={() => setBoardDone(true)} />}
      {step.check && <CheckBlock question={step.check} selected={checkAnswer} onSelect={setCheckAnswer} locale={contentLocale} />}

      <div className="flex items-center justify-between gap-2 border-t pt-4">
        <Button variant="ghost" onClick={goBack} disabled={stepIndex === 0}>
          <ArrowLeft /> Back
        </Button>
        <Button onClick={goNext} disabled={nextDisabled}>
          {isLastStep ? 'Start writing' : 'Continue'} <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
