'use client';

import { useRef, useState } from 'react';
import { RotateCcw, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Panel } from '@/components/ds';
import { MinoVerdictPanel } from '@/components/mino-eval/MinoVerdictPanel';
import { useMinoEvaluation } from '@/components/mino-eval/useMinoEvaluation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { STATUS_TEXT } from '@/lib/mino-eval/labels';
import { buildLearnerContext } from '@/lib/mino-eval/context';
import type { WriteEvaluateBlock } from '@/lib/writing-studio/types';

/**
 * A short piece of writing inside a lesson step. The learner writes, Mino
 * evaluates the actual writing (meaning, accuracy, position…) and says why and
 * what to do next — there is no model answer to compare against. The learner
 * can revise and check again; the step unlocks once Mino has evaluated an
 * answer. The answer is kept through the wait, a failure and a retry.
 */
export function EvaluatedWriteBoard({
  block,
  lessonId,
  objective,
  onEvaluated,
}: {
  block: WriteEvaluateBlock;
  lessonId?: string;
  objective?: string;
  /** Called each time Mino returns an evaluation for this step. */
  onEvaluated?: () => void;
}) {
  const { locale } = useLocale();
  const { profile } = useProfile();
  const language = locale === 'bn' ? 'bn' : 'en';
  const [answer, setAnswer] = useState('');
  const { state, run, retry, busy } = useMinoEvaluation();
  const evaluatedAnswer = useRef('');
  const tx = STATUS_TEXT[language];

  const submit = async () => {
    const text = answer.trim();
    if (text.length < 3) return;
    evaluatedAnswer.current = text;
    const evaluation = await run({
      answerType: block.answerType,
      language,
      question: block.question,
      answer: text,
      requiresPosition: block.requiresPosition,
      keyPoints: block.keyPoints,
      learner: buildLearnerContext({ mistakes: profile?.writingStudio?.mistakes, task: 2, lessonId, objective }),
    });
    if (evaluation) onEvaluated?.();
  };

  const retryAndNotify = async () => {
    const evaluation = await retry();
    if (evaluation) onEvaluated?.();
  };

  const changedSinceCheck = state.status === 'done' && answer.trim() !== evaluatedAnswer.current;

  return (
    <div className="space-y-3" data-testid="write-evaluate">
      <Panel variant="muted" className="space-y-1 p-3.5">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">The question</p>
        <p className="text-sm" lang="en">{block.question}</p>
      </Panel>
      <Panel className="space-y-2.5">
        <p className="text-sm font-medium">{block.prompt}</p>
        <Textarea
          rows={4}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={block.placeholder ?? 'Write your answer here…'}
          className="rounded-lg bg-card text-sm"
          lang="en"
          id="ws-evaluate-answer"
          aria-label={block.prompt}
          disabled={busy}
        />
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={submit} disabled={busy || answer.trim().length < 3} data-testid="write-evaluate-submit">
            {state.status === 'done' ? <RotateCcw /> : <Send />} {state.status === 'done' ? tx.revise : 'Ask Mino to check it'}
          </Button>
          {changedSinceCheck && <span className="text-xs text-muted-foreground">You changed your answer — check it again to hear Mino's view.</span>}
        </div>
      </Panel>
      <MinoVerdictPanel state={state} language={language} onRetry={retryAndNotify} />
    </div>
  );
}
