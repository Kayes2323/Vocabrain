import { ArrowRight, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, Panel, Section, StatusChip } from '@/components/ds';
import { cn } from '@/lib/utils';
import type { UnifiedFeedback } from '@/lib/writing-studio/feedback';

const CATEGORY_TONE: Record<string, 'brand' | 'warning' | 'danger' | 'neutral'> = {
  'Task response': 'brand',
  'Task Achievement': 'brand',
  'Task Response': 'brand',
  'Coherence & cohesion': 'warning',
  'Coherence & Cohesion': 'warning',
  Grammar: 'danger',
  'Grammatical Range & Accuracy': 'danger',
  Vocabulary: 'warning',
  'Lexical Resource': 'warning',
  Mechanics: 'neutral',
};

const FALLBACK_COPY: Record<NonNullable<UnifiedFeedback['fallbackReason']>, string> = {
  unauthenticated: "Mino's real feedback needs you to be signed in — showing this prototype's local practice check instead.",
  not_configured: "Mino's AI feedback isn't configured on this deployment yet — showing this prototype's local practice check instead.",
  rate_limited: "You've used up Mino's feedback requests for now — showing this prototype's local practice check instead.",
  timeout: 'Mino took too long to respond — showing this prototype\'s local practice check instead.',
  provider_busy: "Mino's AI model is busy right now — showing this prototype's local practice check instead.",
  unavailable: "Mino's real feedback wasn't available right now — showing this prototype's local practice check instead.",
  invalid_request: "Mino couldn't assess this answer — showing this prototype's local practice check instead.",
};

/**
 * Zone D — the Feedback Zone. Shows what the student did right, exactly
 * what to fix and why, then lets them retry rather than handing back a
 * fully rewritten answer (spec §5D, §11). Renders either Mino's real AI
 * assessment or, when that isn't available, this prototype's local checks —
 * both clearly labelled, neither presented as a real IELTS score.
 */
export function FeedbackPanel({
  feedback,
  onRetry,
  onContinue,
}: {
  feedback: UnifiedFeedback;
  onRetry: () => void;
  onContinue?: () => void;
}) {
  return (
    <div className="space-y-5">
      {feedback.source === 'ai' ? (
        <Callout tone="neutral" icon={Sparkles} title="Mino's assessment — an estimate, not a real IELTS score">
          Mino judged this answer against the public IELTS criteria. The band below is a practice estimate from an AI
          model, never an official examiner's result.
        </Callout>
      ) : (
        <Callout tone="neutral" icon={Sparkles} title="Local practice check, not a real IELTS score">
          {feedback.fallbackReason ? FALLBACK_COPY[feedback.fallbackReason] : "These checks run locally in your browser — word count, linking words, a clear position, and a few common grammar slips."}
        </Callout>
      )}

      <Panel className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{feedback.source === 'ai' ? "Mino's estimated band" : 'Indicative band (practice only)'}</p>
          <p className="text-2xl font-semibold">{feedback.band !== null ? feedback.band.toFixed(1) : '—'}</p>
        </div>
        <StatusChip tone={feedback.meetsLength ? 'success' : 'warning'}>
          {feedback.wordCount}/{feedback.minWords} words
        </StatusChip>
      </Panel>

      {feedback.criteria && feedback.criteria.length > 0 && (
        <Section title="By criterion" variant="label">
          <div className="grid gap-2 sm:grid-cols-2">
            {feedback.criteria.map((c) => (
              <Panel key={c.criterion} className="space-y-1 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{c.criterion}</p>
                  <span className="text-sm font-semibold tabular-nums">{c.band !== null ? c.band.toFixed(1) : '—'}</span>
                </div>
                {c.comment && <p className="text-xs text-muted-foreground">{c.comment}</p>}
              </Panel>
            ))}
          </div>
        </Section>
      )}

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
                {m.category && (
                  <div className="flex items-center justify-between gap-2">
                    <StatusChip tone={CATEGORY_TONE[m.category] ?? 'neutral'}>{m.category}</StatusChip>
                  </div>
                )}
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

      {feedback.betterSentences && feedback.betterSentences.length > 0 && (
        <Section title="Better ways to say it" variant="label">
          <div className="space-y-2.5">
            {feedback.betterSentences.map((b, i) => (
              <Panel key={i} className="space-y-1 p-3.5 text-sm" lang="en">
                <p className="text-muted-foreground line-through decoration-muted-foreground/50">{b.original}</p>
                <p className="font-medium">{b.improved}</p>
              </Panel>
            ))}
          </div>
        </Section>
      )}

      {feedback.vocabulary && feedback.vocabulary.length > 0 && (
        <Section title="Vocabulary to try" variant="label">
          <div className="space-y-2">
            {feedback.vocabulary.map((v, i) => (
              <p key={i} className="text-sm">
                <span className="font-medium" lang="en">{v.word}</span> — <span className="text-muted-foreground">{v.tip}</span>
              </p>
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
