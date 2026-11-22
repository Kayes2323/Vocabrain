import { ArrowRight, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, Panel, Section, StatusChip } from '@/components/ds';
import { cn } from '@/lib/utils';
import type { EssayFeedback } from '@/lib/writing-studio/feedback';

const CATEGORY_TONE: Record<string, 'brand' | 'warning' | 'danger' | 'neutral'> = {
  'Task response': 'brand',
  'Coherence & cohesion': 'warning',
  Grammar: 'danger',
  Vocabulary: 'warning',
  Mechanics: 'neutral',
};

/**
 * Zone D — the Feedback Zone. Shows what the student did right, exactly
 * what to fix and why, then lets them retry rather than handing back a
 * fully rewritten answer (spec §5D, §11).
 */
export function FeedbackPanel({
  feedback,
  onRetry,
  onContinue,
}: {
  feedback: EssayFeedback;
  onRetry: () => void;
  onContinue?: () => void;
}) {
  return (
    <div className="space-y-5">
      <Callout tone="neutral" icon={Sparkles} title="Prototype feedback, not a real IELTS score">
        These checks run locally in your browser — word count, linking words, a clear position, and a few common grammar
        slips. The indicative band below is a rough guide for practice, not an examiner's assessment.
      </Callout>

      <Panel className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Indicative band (practice only)</p>
          <p className="text-2xl font-semibold">{feedback.indicativeBand.toFixed(1)}</p>
        </div>
        <StatusChip tone={feedback.meetsLength ? 'success' : 'warning'}>
          {feedback.wordCount}/{feedback.minWords} words
        </StatusChip>
      </Panel>

      {feedback.strengths.length > 0 && (
        <Section title="What you did well" variant="label">
          <ul className="space-y-2">
            {feedback.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {feedback.mistakes.length > 0 && (
        <Section title="Fix these" variant="label">
          <div className="space-y-2.5">
            {feedback.mistakes.map((m, i) => (
              <Panel key={i} className="space-y-1.5 p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <StatusChip tone={CATEGORY_TONE[m.category] ?? 'neutral'}>{m.category}</StatusChip>
                </div>
                <p className="text-sm" lang="en">
                  <span className="rounded bg-destructive-soft px-1 py-0.5 line-through decoration-destructive/60">{m.quote}</span>{' '}
                  <ArrowRight className="inline size-3.5 text-muted-foreground" /> <span className="font-medium">{m.fix}</span>
                </p>
                <p className="text-sm text-muted-foreground">{m.why}</p>
              </Panel>
            ))}
          </div>
        </Section>
      )}

      {feedback.suggestions.length > 0 && (
        <Section title="Worth trying" variant="label">
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {feedback.suggestions.map((s, i) => (
              <li key={i}>→ {s}</li>
            ))}
          </ul>
        </Section>
      )}

      <div className={cn('flex flex-col gap-2 sm:flex-row', onContinue && 'sm:justify-between')}>
        <Button variant="outline" onClick={onRetry}>
          <RotateCcw /> Rewrite and try again
        </Button>
        {onContinue && (
          <Button onClick={onContinue}>
            Continue <ArrowRight />
          </Button>
        )}
      </div>
    </div>
  );
}
