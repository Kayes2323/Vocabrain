'use client';

import { useRef, useState } from 'react';
import { ArrowRight, Check, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Callout, Panel, ProgressBar } from '@/components/ds';
import { MinoVerdictPanel } from '@/components/mino-eval/MinoVerdictPanel';
import { useMinoEvaluation } from '@/components/mino-eval/useMinoEvaluation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { buildLearnerContext } from '@/lib/mino-eval/context';
import { STATUS_TEXT } from '@/lib/mino-eval/labels';
import type { IdeaBoardQuestion } from '@/lib/writing-studio/types';

/**
 * Task 2's flagship interactive feature (spec §7, "Idea Development
 * Trainer"). One rung of the ladder at a time. Mino never writes the paragraph
 * for the student; it EVALUATES each answer: does this rung do the job its
 * question asks for (a mechanism, not a restatement; a specific example that
 * supports the explanation; a result that follows)? A rung that merely reuses
 * words from the previous one is not penalised — only one that adds nothing.
 * If the evaluation cannot be completed there is no verdict: the learner can
 * retry, or move on explicitly without Mino's check.
 */
export function IdeaDevelopmentBoard({
  question,
  onComplete,
  lessonId,
  objective,
}: {
  question: IdeaBoardQuestion;
  onComplete?: (answers: string[]) => void;
  lessonId?: string;
  objective?: string;
}) {
  const { locale } = useLocale();
  const { profile } = useProfile();
  const language = locale === 'bn' ? 'bn' : 'en';
  const tx = STATUS_TEXT[language];
  const ladder = [...question.ladder].sort((a, b) => a.order - b.order);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(ladder.length).fill(''));
  const [draft, setDraft] = useState('');
  const [done, setDone] = useState(false);
  const { state, run, retry, reset, busy } = useMinoEvaluation();
  const checkedDraft = useRef('');

  const current = ladder[index];
  const isLast = index === ladder.length - 1;
  const verdict = state.status === 'done' ? state.evaluation.verdict : null;
  const passed = verdict === 'correct';
  const needsOpinion = question.questionType === 'agree-disagree' || question.questionType === 'discuss-both';

  const advance = (accepted: string) => {
    const next = [...answers];
    next[index] = accepted;
    setAnswers(next);
    reset();
    if (isLast) {
      setDone(true);
      onComplete?.(next);
    } else {
      setIndex(index + 1);
      setDraft('');
    }
  };

  const check = async () => {
    const text = draft.trim();
    if (text.length < 3) return;
    checkedDraft.current = text;
    await run({
      answerType: 'idea_rung',
      language,
      question: question.prompt,
      answer: text,
      requiresPosition: needsOpinion,
      rung: {
        prompt: current.prompt,
        hint: current.hint,
        order: current.order,
        previous: ladder.slice(0, index).map((r, i) => ({ prompt: r.prompt, answer: answers[i] })),
      },
      learner: buildLearnerContext({ mistakes: profile?.writingStudio?.mistakes, task: 2, lessonId, objective }),
    });
  };

  if (done) {
    return (
      <div className="space-y-3">
        <Callout tone="success" title="Your idea is fully built">
          You now have an idea, an explanation, an example and a result. Combine them into one flowing paragraph in the writing area below — link the sentences naturally instead of copying them in order.
        </Callout>
        <div className="space-y-2">
          {ladder.map((rung, i) => (
            <Panel key={rung.id} className="space-y-1 p-3.5">
              <p className="text-xs font-medium text-muted-foreground">{rung.prompt}</p>
              <p className="text-sm" lang="en">{answers[i]}</p>
            </Panel>
          ))}
        </div>
      </div>
    );
  }

  const changedSinceCheck = state.status === 'done' && draft.trim() !== checkedDraft.current;

  return (
    <div className="space-y-4" data-testid="idea-board">
      <Panel variant="muted" className="space-y-1 p-3.5">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">The question</p>
        <p className="text-sm" lang="en">{question.prompt}</p>
      </Panel>

      <ProgressBar value={(index / ladder.length) * 100} label={`Idea ladder: step ${index + 1} of ${ladder.length}`} size="sm" />

      <Panel className="space-y-2.5">
        <p className="text-sm font-medium">{current.prompt}</p>
        <p className="text-xs text-muted-foreground italic">{current.hint}</p>
        <Textarea
          rows={3}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={current.placeholder}
          className="rounded-lg bg-card text-sm"
          lang="en"
          id="idea-rung-answer"
          aria-label={current.prompt}
          disabled={busy}
        />
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={check} disabled={busy || draft.trim().length < 3 || (state.status === 'done' && !changedSinceCheck)} data-testid="idea-check">
            {state.status === 'done' ? <RotateCcw /> : <Check />} {state.status === 'done' ? tx.revise : 'Ask Mino to check this step'}
          </Button>
          {passed && !changedSinceCheck && (
            <Button variant="default" onClick={() => advance(draft.trim())} data-testid="idea-next">
              {isLast ? <Check /> : <ArrowRight />} {isLast ? 'Finish the ladder' : 'Next question'}
            </Button>
          )}
          {verdict && !passed && !changedSinceCheck && (
            <Button variant="ghost" onClick={() => advance(draft.trim())} data-testid="idea-move-on">
              Move on anyway
            </Button>
          )}
          {state.status === 'error' && (
            <Button variant="ghost" onClick={() => advance(draft.trim())} data-testid="idea-move-on-unchecked">
              Move on without Mino's check
            </Button>
          )}
        </div>
        <MinoVerdictPanel state={state} language={language} onRetry={retry} />
      </Panel>

      {index > 0 && (
        <div className="space-y-1.5 border-t pt-3">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">So far</p>
          {ladder.slice(0, index).map((rung, i) => (
            <p key={rung.id} className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{rung.prompt.split('?')[0]}:</span> <span lang="en">{answers[i]}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
