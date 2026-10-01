'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import type { Validation } from '@/lib/answers';

/**
 * The lines under a checked typed answer, from the shared validator's result.
 * Right with another accepted wording: says it is acceptable (never implies it
 * was wrong) and names the main answer. Wrong: the student's answer and every
 * accepted answer — short. The ✓ / ✕ heading stays with the caller.
 */
export function AnswerFeedback({ result, showAccepted = true }: { result: Validation; showAccepted?: boolean }) {
  const { t } = useLocale();
  const f = result.feedback;
  if (f.kind === 'accepted') {
    return (
      <div className="space-y-0.5" data-testid="answer-accepted">
        <p>{t('answers.acceptedHere', { answer: f.answer })}</p>
        <p className="text-muted-foreground" lang="en">
          {t('answers.mainAnswer', { answer: f.mainAnswer })}
        </p>
      </div>
    );
  }
  if (f.kind !== 'wrong') return null;
  return (
    <div className="space-y-0.5" data-testid="answer-wrong">
      <p className="text-muted-foreground">
        {t('answers.yourAnswer')}{' '}
        <span lang="en" className="line-through decoration-destructive/60">
          {f.answer}
        </span>
      </p>
      {showAccepted && (
        <p className="font-medium" data-testid="answer-accepted-list">
          {t(f.accepted.length > 1 ? 'answers.acceptedListMany' : 'answers.acceptedList', { list: f.accepted.join(' / ') })}
        </p>
      )}
      {f.nearMiss && <p className="text-muted-foreground">{t('answers.spelling')}</p>}
      {f.overLimit && <p className="text-muted-foreground">{t('answers.overLimit')}</p>}
    </div>
  );
}
