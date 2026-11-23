'use client';

import { AlertTriangle, CheckCircle2, CircleAlert, CircleX, Lightbulb, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, Panel, StatusChip } from '@/components/ds';
import { MinoMark } from '@/components/shell/MinoMark';
import { cn } from '@/lib/utils';
import { STATUS_TEXT, verdictLabel, verdictTone, type EvalLang } from '@/lib/mino-eval/labels';
import type { MinoEvaluation } from '@/lib/mino-eval/types';
import type { EvaluationState } from './useMinoEvaluation';

const ICON = { success: CheckCircle2, warning: CircleAlert, destructive: CircleX, neutral: Sparkles } as const;

/** Mino's verdict on one answer: what the verdict is, why, what to fix, and the next step. */
export function EvaluationView({ evaluation, language = 'en', className }: { evaluation: MinoEvaluation; language?: EvalLang; className?: string }) {
  const tx = STATUS_TEXT[language];
  const tone = verdictTone(evaluation.verdict);
  const Icon = ICON[tone];
  return (
    <div
      className={cn('space-y-3', className)}
      data-testid="mino-verdict"
      data-verdict={evaluation.verdict}
      data-source={evaluation.source}
      data-answer-type={evaluation.answerType}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <MinoMark size="sm" />
        <Icon className={cn('size-5 shrink-0', tone === 'success' && 'text-success', tone === 'destructive' && 'text-destructive', tone === 'warning' && 'text-warning')} aria-hidden />
        <p className="text-[15px] font-semibold" data-testid="mino-verdict-label">
          {verdictLabel(evaluation.verdict, evaluation.answerType, language)}
        </p>
        <StatusChip tone={tone === 'destructive' ? 'danger' : tone}>{evaluation.source === 'objective' ? 'Checked instantly' : 'Mino evaluation'}</StatusChip>
      </div>

      <p className="text-sm leading-relaxed" data-testid="mino-explanation">
        {evaluation.explanation}
      </p>

      {evaluation.strengths.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{tx.strengths}</p>
          <ul className="space-y-1">
            {evaluation.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {evaluation.issues.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{tx.issues}</p>
          {evaluation.issues.map((issue, i) => (
            <Panel key={i} variant="muted" className="space-y-1 p-3 text-sm" data-testid="mino-issue">
              {issue.quote && (
                <p className="text-muted-foreground">
                  <span className="text-xs font-medium uppercase">{tx.quoteHeading}: </span>
                  <q lang="en" className="text-foreground">{issue.quote}</q>
                </p>
              )}
              <p className="font-medium">{issue.problem}</p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">{tx.why}: </span>
                {issue.why}
              </p>
              {issue.fix && (
                <p>
                  <span className="font-medium">{tx.fix}: </span>
                  <span lang="en">{issue.fix}</span>
                </p>
              )}
            </Panel>
          ))}
        </div>
      )}

      {evaluation.correction && (
        <Panel className="space-y-1 p-3 text-sm" data-testid="mino-correction">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{tx.correction}</p>
          <p lang="en">{evaluation.correction}</p>
        </Panel>
      )}

      {evaluation.hint && (
        <p className="flex items-start gap-2 text-sm text-muted-foreground" data-testid="mino-hint">
          <Lightbulb className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>
            <span className="font-medium text-foreground">{tx.hint}: </span>
            {evaluation.hint}
          </span>
        </p>
      )}

      <p className="flex items-start gap-2 text-sm font-medium" data-testid="mino-next-action">
        <ArrowRight className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
        <span>
          <span className="text-muted-foreground">{tx.next}: </span>
          {evaluation.nextAction}
        </span>
      </p>
    </div>
  );
}

/**
 * The full Mino evaluation experience for an async evaluation: a restrained
 * thinking state while Mino works (honest status text, no fake progress), the
 * verdict when it arrives, or a clear failure with a retry — never a guessed
 * verdict. The learner's answer stays wherever the caller keeps it.
 */
export function MinoVerdictPanel({
  state,
  language = 'en',
  onRetry,
  className,
}: {
  state: EvaluationState;
  language?: EvalLang;
  onRetry?: () => void;
  className?: string;
}) {
  const tx = STATUS_TEXT[language];
  if (state.status === 'idle') return null;

  if (state.status === 'evaluating') {
    return (
      <Panel variant="brand" className={cn('flex items-center gap-3', className)} role="status" aria-live="polite" data-testid="mino-evaluating">
        <MinoMark size="md" thinking />
        <div className="space-y-0.5">
          <p className="text-sm font-medium">{tx.checking}</p>
          {state.slow && <p className="text-xs text-muted-foreground">{tx.stillChecking}</p>}
        </div>
      </Panel>
    );
  }

  if (state.status === 'error') {
    return (
      <div className={className} data-testid="mino-eval-error">
        <Callout tone="warning" icon={AlertTriangle} title={tx.failed}>
          <p>{tx.answerKept}</p>
          {onRetry && (
            <Button size="sm" variant="outline" className="mt-2" onClick={onRetry} data-testid="mino-eval-retry">
              {tx.retry}
            </Button>
          )}
        </Callout>
      </div>
    );
  }

  return (
    <Panel className={cn('p-4', className)} data-testid="mino-evaluation">
      <EvaluationView evaluation={state.evaluation} language={language} />
    </Panel>
  );
}
