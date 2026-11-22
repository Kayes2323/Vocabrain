'use client';

import { useState } from 'react';
import { AlertTriangle, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Callout, Panel, ProgressBar } from '@/components/ds';
import { overlapsHeavily } from '@/lib/writing-studio/feedback';
import type { IdeaBoardQuestion } from '@/lib/writing-studio/types';

/**
 * Task 2's flagship interactive feature (spec §7, "Idea Development
 * Trainer"). One rung of the ladder at a time; Mino never writes the
 * paragraph for the student, only asks the next question and flags an
 * answer that mostly repeats the one before it.
 */
export function IdeaDevelopmentBoard({
  question,
  onComplete,
}: {
  question: IdeaBoardQuestion;
  onComplete?: (answers: string[]) => void;
}) {
  const ladder = [...question.ladder].sort((a, b) => a.order - b.order);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(ladder.length).fill(''));
  const [draft, setDraft] = useState('');
  const [warning, setWarning] = useState(false);
  const [done, setDone] = useState(false);

  const current = ladder[index];
  const isLast = index === ladder.length - 1;

  const submitRung = () => {
    const previous = index > 0 ? answers[index - 1] : '';
    if (previous && overlapsHeavily(previous, draft)) {
      setWarning(true);
      return;
    }
    const next = [...answers];
    next[index] = draft;
    setAnswers(next);
    setWarning(false);
    if (isLast) {
      setDone(true);
      onComplete?.(next);
    } else {
      setIndex(index + 1);
      setDraft('');
    }
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

  return (
    <div className="space-y-4">
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
          onChange={(e) => { setDraft(e.target.value); setWarning(false); }}
          placeholder={current.placeholder}
          className="rounded-lg bg-card text-sm"
          lang="en"
        />
        {warning && (
          <Callout tone="warning" icon={AlertTriangle}>
            This looks very close to your last answer. Try to add something new — go one level deeper, rather than restating the same point.
          </Callout>
        )}
        <Button onClick={submitRung} disabled={draft.trim().length < 3} className="w-full sm:w-auto">
          {isLast ? <Check /> : <ArrowRight />} {isLast ? 'Finish the ladder' : 'Next question'}
        </Button>
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
