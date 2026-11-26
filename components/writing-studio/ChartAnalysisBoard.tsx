'use client';

import { useRef, useState } from 'react';
import { AlertTriangle, Check, ChevronRight, Loader2, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Panel, StatusChip } from '@/components/ds';
import { cn } from '@/lib/utils';
import { assessChartAnswer } from '@/lib/ai/client';
import { canSubmitChartAnswer, isSettledChartAnswer, revealTask, type ChartAnswerStatus } from '@/lib/writing-studio/chart-board';
import type { ChartAnswerFeedback } from '@/lib/ai/server/assess/chart-answer';
import { localize, type ChartBoardTask, type ChartDataset } from '@/lib/writing-studio/types';
import { WSChart } from './WSChart';

const CHROME = {
  en: {
    answerPlaceholder: 'Answer in your own words…',
    checkMyAnswer: 'Check my answer',
    checking: 'Mino is checking…',
    retry: 'Retry',
    unavailableTitle: "Mino couldn't check this just now",
    unavailableBody: 'Evaluation is temporarily unavailable — your answer has been kept. Try again in a moment.',
    modelAnswer: 'Model answer:',
    gotRight: "What you got right",
    stillNeeded: 'What this still needs',
    whatsWrong: 'What was wrong',
    betterExpression: 'A natural English expression:',
    belongsIn: (part: React.ReactNode) => (
      <>
        This belongs in the <span>{part}</span>, not the other way round.
      </>
    ),
    introduction: 'introduction',
    overview: 'overview',
    body: 'body paragraphs',
    done: "You've read the chart properly. Time to turn this into English.",
  },
  bn: {
    answerPlaceholder: 'নিজের ভাষায় উত্তর দাও…',
    checkMyAnswer: 'আমার উত্তর চেক করো',
    checking: 'Mino চেক করছে…',
    retry: 'আবার চেষ্টা করো',
    unavailableTitle: 'Mino এখন চেক করতে পারল না',
    unavailableBody: 'Evaluation সাময়িকভাবে unavailable — তোমার উত্তরটা রাখা আছে। একটু পরে আবার চেষ্টা করো।',
    modelAnswer: 'Model answer:',
    gotRight: 'যা ঠিক হয়েছে',
    stillNeeded: 'যা এখনও দরকার',
    whatsWrong: 'যা ভুল হয়েছে',
    betterExpression: 'একটা স্বাভাবিক English expression:',
    belongsIn: (part: React.ReactNode) => (
      <>
        এটা <span>{part}</span>-এ থাকা উচিত, উল্টোটা না।
      </>
    ),
    introduction: 'introduction',
    overview: 'overview',
    body: 'body paragraph',
    done: 'তুমি chart-টা ঠিকভাবে পড়ে ফেলেছ। এবার এটাকে English-এ রূপান্তর করার পালা।',
  },
} as const;

function verdictStatus(verdict: ChartAnswerFeedback['verdict']): ChartAnswerStatus {
  return verdict === 'correct' ? 'correct' : verdict === 'partially_correct' ? 'partial' : 'incorrect';
}

/**
 * Task 1's flagship interactive feature (spec §6, "Visual Analysis Board").
 * The student answers a sequence of chart-reading questions in their own
 * words, Mino evaluates the meaning of the answer against the real chart
 * facts (never just "did you submit something"), and the task is tagged for
 * whether it belongs in the overview or a body paragraph — before writing a
 * single sentence of the response itself.
 *
 * Submission, completion and answer accuracy are deliberately separate
 * states: `revealed` (and therefore `onComplete`) tracks only that a real
 * verdict was reached for every task, never that every answer was correct —
 * a student who answers everything wrong still finishes the board and can
 * move on, now having seen the real, useful correction for each one.
 */
export function ChartAnalysisBoard({
  dataset,
  tasks,
  locale = 'en',
  onComplete,
  compact,
  context,
}: {
  dataset: ChartDataset;
  tasks: ChartBoardTask[];
  locale?: 'en' | 'bn';
  /** Called exactly once, when the last previously-unsettled task reaches a real verdict. */
  onComplete?: () => void;
  /** Used when embedded inside a lesson step, to keep the board shorter. */
  compact?: boolean;
  /** Lesson/step this board is embedded in, sent with every evaluation request for context. Omit for a standalone practice board. */
  context?: { lessonId: string; stepId: string };
}) {
  const c = CHROME[locale];
  const ordered = [...tasks].sort((a, b) => a.order - b.order);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Record<string, ChartAnswerStatus>>({});
  const [results, setResults] = useState<Record<string, ChartAnswerFeedback>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const checkedCount = Object.keys(revealed).length;
  const allDone = checkedCount >= ordered.length;

  // Mirrors `revealed` synchronously so two settlements arriving close together
  // (or a StrictMode double-invoke) cannot read stale state and report
  // completion twice.
  const revealedRef = useRef<Record<string, boolean>>({});

  const settle = (task: ChartBoardTask, next: ChartAnswerStatus, feedback?: ChartAnswerFeedback) => {
    setStatus((s) => ({ ...s, [task.id]: next }));
    if (feedback) setResults((r) => ({ ...r, [task.id]: feedback }));
    if (!isSettledChartAnswer(next)) return;
    // onComplete sets state in the parent (LessonRunner), so it must run in the event
    // handler, not inside a setState updater — React warns about updating another
    // component while rendering, and (in StrictMode) the updater can run twice.
    const { next: nextRevealed, completedNow } = revealTask(revealedRef.current, task.id, ordered.length);
    if (nextRevealed === revealedRef.current) return;
    revealedRef.current = nextRevealed;
    setRevealed(nextRevealed);
    if (completedNow) onComplete?.();
  };

  const check = async (task: ChartBoardTask) => {
    const current = status[task.id] ?? 'unanswered';
    if (!canSubmitChartAnswer(current)) return; // already checking this one — never fire a duplicate evaluation
    const answer = (answers[task.id] ?? '').trim();
    if (answer.length < 2) return;
    setStatus((s) => ({ ...s, [task.id]: 'pending' }));
    const res = await assessChartAnswer({
      lessonId: context?.lessonId ?? dataset.id,
      stepId: context?.stepId ?? 'standalone',
      chartId: dataset.id,
      chartTitle: dataset.title,
      chartUnit: dataset.unit,
      questionId: task.id,
      question: localize('en', task.prompt),
      requiredLanguage: task.requiredLanguage ?? 'bn-or-en',
      referenceAnswer: task.modelAnswer,
      acceptableAlternatives: task.acceptableAlternatives ?? [],
      evaluationCriteria: task.evaluationCriteria ?? [],
      learnerAnswer: answer,
    });
    // A failed evaluation is its own state, never a false "correct" — the
    // student's answer stays exactly as they typed it, and they can retry.
    if (res.ok) settle(task, verdictStatus(res.feedback.verdict), res.feedback);
    else settle(task, 'unavailable');
  };

  return (
    <div className="space-y-4">
      <Panel className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold">{dataset.title}</p>
            <p className="text-xs text-muted-foreground">{dataset.unit}</p>
          </div>
          <StatusChip tone={allDone ? 'success' : 'neutral'}>
            {checkedCount}/{ordered.length} checked
          </StatusChip>
        </div>
        <WSChart dataset={dataset} height={compact ? 200 : 260} />
        {dataset.note && <p className="text-xs text-muted-foreground">{dataset.note}</p>}
      </Panel>

      <div className="space-y-3">
        {ordered.map((task, i) => {
          const taskStatus = status[task.id] ?? 'unanswered';
          const isSettled = isSettledChartAnswer(taskStatus);
          const isPending = taskStatus === 'pending';
          const value = answers[task.id] ?? '';
          const prevRevealed = i === 0 || !!revealed[ordered[i - 1].id];
          const result = results[task.id];
          const badgeTone =
            taskStatus === 'correct' ? 'bg-success-soft text-success'
            : taskStatus === 'partial' ? 'bg-tint-yellow text-tint-yellow-fg'
            : taskStatus === 'incorrect' ? 'bg-destructive-soft text-destructive'
            : taskStatus === 'unavailable' ? 'bg-muted text-muted-foreground'
            : 'bg-muted text-muted-foreground';
          return (
            <Panel key={task.id} className={cn('space-y-2.5', !prevRevealed && 'opacity-50')}>
              <div className="flex items-center gap-2">
                <span className={cn('flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold', badgeTone)}>
                  {taskStatus === 'correct' ? (
                    <Check className="size-3.5" />
                  ) : taskStatus === 'incorrect' ? (
                    <X className="size-3.5" />
                  ) : taskStatus === 'partial' ? (
                    <span>~</span>
                  ) : taskStatus === 'unavailable' ? (
                    <AlertTriangle className="size-3.5" />
                  ) : isPending ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    i + 1
                  )}
                </span>
                <p className="text-sm font-medium">{localize(locale, task.prompt)}</p>
              </div>
              {prevRevealed && (
                <>
                  <Textarea
                    rows={2}
                    value={value}
                    disabled={isSettled && taskStatus !== 'unavailable'}
                    onChange={(e) => setAnswers((a) => ({ ...a, [task.id]: e.target.value }))}
                    placeholder={c.answerPlaceholder}
                    className="rounded-lg bg-card text-sm"
                    lang="en"
                  />
                  {!isSettled ? (
                    <Button size="sm" variant="outline" onClick={() => check(task)} disabled={isPending || value.trim().length < 2}>
                      {isPending ? <Loader2 className="animate-spin" /> : <Check />} {isPending ? c.checking : c.checkMyAnswer}
                    </Button>
                  ) : taskStatus === 'unavailable' ? (
                    <div className="space-y-2 rounded-lg bg-muted/50 p-3 text-sm">
                      <p className="flex items-center gap-1.5 font-medium text-muted-foreground">
                        <AlertTriangle className="size-3.5 shrink-0" /> {c.unavailableTitle}
                      </p>
                      <p className="text-muted-foreground">{c.unavailableBody}</p>
                      <Button size="sm" variant="outline" onClick={() => check(task)} disabled={value.trim().length < 2}>
                        <RotateCcw /> {c.retry}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-1.5 rounded-lg bg-muted/50 p-3 text-sm">
                      {!!result?.identifiedFacts.length && (
                        <p>
                          <span className="font-medium text-success">{c.gotRight}:</span>{' '}
                          <span lang="en">{result.identifiedFacts.join(' ')}</span>
                        </p>
                      )}
                      {taskStatus === 'partial' && !!result?.missingFacts.length && (
                        <p>
                          <span className="font-medium text-tint-yellow-fg">{c.stillNeeded}:</span>{' '}
                          <span lang="en">{result.missingFacts.join(' ')}</span>
                        </p>
                      )}
                      {taskStatus === 'incorrect' && !!result?.incorrectClaims.length && (
                        <p>
                          <span className="font-medium text-destructive">{c.whatsWrong}:</span>{' '}
                          <span lang="en">{result.incorrectClaims.join(' ')}</span>
                        </p>
                      )}
                      {result?.explanationBn && <p className="text-muted-foreground">{result.explanationBn}</p>}
                      {result?.suggestedAnswerEn && (
                        <p>
                          <span className="font-medium">{c.betterExpression}</span> <span lang="en">{result.suggestedAnswerEn}</span>
                        </p>
                      )}
                      <p>
                        <span className="font-medium">{c.modelAnswer}</span> <span lang="en">{task.modelAnswer}</span>
                      </p>
                      <p className="text-muted-foreground">
                        {c.belongsIn(
                          <span className={cn('font-medium', task.belongsIn === 'body' ? 'text-tint-green-fg' : 'text-brand')}>
                            {task.belongsIn === 'introduction' ? c.introduction : task.belongsIn === 'overview' ? c.overview : c.body}
                          </span>,
                        )}
                      </p>
                    </div>
                  )}
                </>
              )}
            </Panel>
          );
        })}
      </div>

      {allDone && (
        <Panel variant="brand" className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium">{c.done}</p>
          <ChevronRight className="size-4 shrink-0 text-brand" aria-hidden />
        </Panel>
      )}
    </div>
  );
}
