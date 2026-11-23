'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, PartyPopper, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, Panel, ProgressBar, StatusChip } from '@/components/ds';
import { EvaluationView, MinoVerdictPanel } from '@/components/mino-eval/MinoVerdictPanel';
import { useMinoEvaluation } from '@/components/mino-eval/useMinoEvaluation';
import { MinoMark } from '@/components/shell/MinoMark';
import { minoReact } from '@/components/mino/Mino';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { writingStudioFeedback } from '@/lib/ai/client';
import { cn } from '@/lib/utils';
import { CHART_DATASETS, chartToTable } from '@/lib/writing-studio/charts';
import { checkEssay, deriveScope, fromAI, fromLocal, type UnifiedFeedback } from '@/lib/writing-studio/feedback';
import { buildLearnerContext } from '@/lib/mino-eval/context';
import { evaluateObjective } from '@/lib/mino-eval/objective';
import type { MinoEvaluation } from '@/lib/mino-eval/types';
import { recordLesson, recordMistakes } from '@/lib/writing-studio/progress';
import type { Lesson } from '@/lib/writing-studio/types';
import { FeedbackPanel } from './FeedbackPanel';
import { MaterialPanel } from './MaterialPanel';
import { TrainerPanel } from './TrainerPanel';
import { WSChart } from './WSChart';
import { WritingEditor } from './WritingEditor';

type Phase = 'learn' | 'write' | 'assessing' | 'feedback' | 'done';

/** Maps one of Mino's error tags to the criterion-style category Mistake Revision groups by. */
export function categoryFromTag(tag: string | undefined, answerType: string): string {
  const t = (tag ?? '').toLowerCase();
  if (/grammar|tense|agreement|article|preposition|punctuation|word-order|spelling/.test(t)) return 'Grammar';
  if (/vocab|word-choice|collocation|wrong-meaning|register/.test(t)) return 'Vocabulary';
  if (/link|cohes|coheren|organis|paragraph-structure/.test(t)) return 'Coherence & cohesion';
  return answerType === 'vocab_meaning' || answerType === 'vocab_usage' ? 'Vocabulary' : 'Task response';
}

function CheckBlock({
  question,
  selected,
  onSelect,
  language,
}: {
  question: NonNullable<Lesson['steps'][number]['check']>;
  selected: number | null;
  onSelect: (i: number) => void;
  language: 'en' | 'bn';
}) {
  // Objective answers are checked instantly against the trusted answer data and
  // Mino says why — option-specific where the lesson provides it — so the learner
  // never has to compare their pick with an answer key.
  const evaluation = useMemo(
    () =>
      selected === null
        ? null
        : evaluateObjective({
            options: question.options,
            correctIndex: question.correctIndex,
            selectedIndex: selected,
            explain: question.explain,
            optionFeedback: question.optionFeedback,
            language,
          }),
    [question, selected, language],
  );
  return (
    <div className="space-y-2.5">
      <p className="font-medium">{question.prompt}</p>
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
              <span>{opt}</span>
              {showState && isCorrect && <Check className="size-4 shrink-0 text-success" />}
              {showState && isSelected && !isCorrect && <X className="size-4 shrink-0 text-destructive" />}
            </button>
          );
        })}
      </div>
      {evaluation && (
        <Panel className="p-4" data-testid="mino-evaluation">
          <EvaluationView evaluation={evaluation} language={language} />
        </Panel>
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
  const { locale } = useLocale();
  const { profile, updateProfile } = useProfile();
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('learn');
  const [checkAnswer, setCheckAnswer] = useState<number | null>(null);
  const [boardDone, setBoardDone] = useState(false);
  const [essay, setEssay] = useState('');
  const [feedback, setFeedback] = useState<UnifiedFeedback | null>(null);
  const [submissions, setSubmissions] = useState(0);
  // Final tasks marked `evaluate` go through the Mino Answer Evaluation Engine (skill drills: never a band).
  const finalEval = useMinoEvaluation();

  const step = lesson.steps[stepIndex];
  const isLastStep = stepIndex === lesson.steps.length - 1;

  useEffect(() => {
    setCheckAnswer(null);
    setBoardDone(false);
  }, [stepIndex]);

  const needsCheckAnswer = !!step.check && checkAnswer === null;
  const needsBoard = (step.material?.type === 'chart-board' || step.material?.type === 'idea-board' || step.material?.type === 'write-evaluate') && !boardDone;
  const nextDisabled = needsCheckAnswer || needsBoard;

  const goNext = () => {
    minoReact('success');
    if (isLastStep) setPhase('write');
    else setStepIndex((i) => i + 1);
  };
  const goBack = () => setStepIndex((i) => Math.max(0, i - 1));

  const scope = deriveScope(lesson);

  const taskNum: 1 | 2 = lesson.task === 'task1' ? 1 : 2;

  const language: 'en' | 'bn' = locale === 'bn' ? 'bn' : 'en';

  /** Records a successful evaluated attempt: lesson completion (never a band) and the mistakes Mino found. */
  const recordEvaluated = (evaluation: MinoEvaluation) => {
    const rows = evaluation.issues.map((i) => ({
      category: categoryFromTag(i.tag, evaluation.answerType),
      quote: i.quote ?? '',
      fix: i.fix ?? evaluation.correction ?? '',
      why: i.why,
    }));
    updateProfile((p) => ({
      ...p,
      writingStudio: recordMistakes(recordLesson(p.writingStudio, lesson.id, taskNum, null), taskNum, 'ai', rows),
    }));
  };

  const submitEvaluated = async () => {
    const spec = lesson.finalPrompt.evaluate!;
    setSubmissions((n) => n + 1);
    setPhase('assessing');
    const evaluation = await finalEval.run({
      answerType: spec.answerType,
      language,
      question: spec.question,
      answer: essay.trim(),
      requiresPosition: spec.requiresPosition,
      keyPoints: spec.keyPoints,
      learner: buildLearnerContext({ mistakes: profile?.writingStudio?.mistakes, task: taskNum, lessonId: lesson.id, objective: lesson.objective }),
    });
    setPhase('feedback');
    if (evaluation) recordEvaluated(evaluation);
  };

  const retryEvaluated = async () => {
    setPhase('assessing');
    const evaluation = await finalEval.retry();
    setPhase('feedback');
    if (evaluation) recordEvaluated(evaluation);
  };

  const submit = async () => {
    if (lesson.finalPrompt.evaluate) {
      await submitEvaluated();
      return;
    }
    const local = checkEssay(essay, lesson.finalPrompt.minWords, lesson.task, scope, !!lesson.finalPrompt.skillFocus);
    setSubmissions((n) => n + 1);
    setPhase('assessing');

    const chart = lesson.finalPrompt.chartId ? CHART_DATASETS[lesson.finalPrompt.chartId] : undefined;
    const res = await writingStudioFeedback(
      {
        task: taskNum,
        prompt: `${lesson.finalPrompt.title}. ${lesson.finalPrompt.instructions}`,
        minWords: lesson.finalPrompt.minWords,
        chart: chart ? chartToTable(chart) : undefined,
        skillFocus: lesson.finalPrompt.skillFocus,
        checkScope: lesson.finalPrompt.checkScope,
      },
      essay,
      locale === 'bn' ? 'bn' : 'en',
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
            "{lesson.title}" is done. Mino has logged this lesson and your {submissions > 1 ? `${submissions} attempts` : 'attempt'} toward your progress.
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
              finalEval.reset();
            }}
          >
            Practise this lesson again
          </Button>
        </div>
      </div>
    );
  }

  if (phase === 'assessing' && lesson.finalPrompt.evaluate) {
    return (
      <div className="mx-auto max-w-xl py-16">
        <MinoVerdictPanel state={finalEval.state} language={language} />
      </div>
    );
  }

  if (phase === 'assessing') {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 py-16 text-center">
        <MinoMark size="xl" thinking />
        <p className="font-medium">Mino is reading your answer against the IELTS criteria…</p>
        <p className="text-sm text-muted-foreground">This usually takes a few seconds.</p>
      </div>
    );
  }

  if (phase === 'feedback' && lesson.finalPrompt.evaluate) {
    const done = finalEval.state.status === 'done' ? finalEval.state.evaluation : null;
    return (
      <div className="mx-auto max-w-2xl space-y-5">
        <TrainerPanel
          lessonTitle={lesson.title}
          stepTitle="Mino's evaluation"
          message={
            done?.verdict === 'correct'
              ? 'This does what the task asked. Read the notes below, then we will move on.'
              : done
                ? "Here is what I noticed and what to do next. Revise your answer and check it again — you'll learn more from the second attempt."
                : 'I could not finish checking your answer this time. Your answer is safe — try again.'
          }
        />
        <Callout tone="neutral" icon={Sparkles} title={`Skill check: ${lesson.finalPrompt.skillFocus ?? lesson.finalPrompt.title}`}>
          This short exercise targets one skill, not a complete Task {taskNum} response, so there is no IELTS band — only Mino's evaluation of this skill.
        </Callout>
        <MinoVerdictPanel state={finalEval.state} language={language} onRetry={retryEvaluated} />
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => setPhase('write')} data-testid="eval-revise">
            {done ? 'Revise and check again' : 'Edit my answer'}
          </Button>
          {done && (
            <Button onClick={() => setPhase('done')} data-testid="eval-continue">
              Continue <ArrowRight />
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (phase === 'feedback' && feedback) {
    return (
      <div className="mx-auto max-w-2xl space-y-5">
        <TrainerPanel
          lessonTitle={lesson.title}
          stepTitle="Feedback"
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
          lessonTitle={lesson.title}
          stepTitle="Independent practice"
          message="Now it's your turn — no more hints. Use what you worked out above and write it in your own words."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-4">
            <Panel className="space-y-2">
              <p className="font-semibold">{lesson.finalPrompt.title}</p>
              <p className="text-[15px] text-muted-foreground">{lesson.finalPrompt.instructions}</p>
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
      <TrainerPanel lessonTitle={lesson.title} stepTitle={step.title} message={step.trainerMessage} hint={step.hint} />

      {step.material && <MaterialPanel block={step.material} onBoardComplete={() => setBoardDone(true)} lessonId={lesson.id} objective={lesson.objective} />}
      {step.check && <CheckBlock question={step.check} selected={checkAnswer} onSelect={setCheckAnswer} language={locale === 'bn' ? 'bn' : 'en'} />}

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
