'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { answerQuestion, PROFILE_QUESTIONS, profileAnswer, type ProfileAnswer, type ProfileQuestionId } from '@/lib/abroad/profile-questions';
import type { GradeScale } from '@/lib/models';
import { cn } from '@/lib/utils';

const CURRENCIES = ['BDT', 'KRW', 'USD', 'EUR', 'GBP', 'CAD', 'AUD'] as const;

/**
 * One profile question, asked in place: the student answers, it is saved to
 * their profile, and the feature that asked carries on. `onDone` fires after
 * saving or skipping; the answer is never required.
 */
export function ProfileQuestion({
  id,
  onDone,
  inline = false,
  className,
}: {
  id: ProfileQuestionId;
  onDone?: (saved: boolean) => void;
  /** Inline = no card chrome (used inside the profile page). */
  inline?: boolean;
  className?: string;
}) {
  const { t } = useLocale();
  const { profile, updateProfile } = useProfile();
  const q = PROFILE_QUESTIONS[id];
  const current = profile ? profileAnswer(profile.abroad, id) : undefined;
  const [text, setText] = useState(typeof current === 'string' || typeof current === 'number' ? String(current) : '');
  const [amount, setAmount] = useState(current && typeof current === 'object' && 'amount' in current ? String(current.amount) : '');
  const [currency, setCurrency] = useState<string>(current && typeof current === 'object' && 'currency' in current ? current.currency : 'BDT');
  const [scale, setScale] = useState<GradeScale>(current && typeof current === 'object' && 'scale' in current ? current.scale : 'cgpa-4');
  const [invalid, setInvalid] = useState(false);
  if (!profile) return null;

  const save = (value: ProfileAnswer) => {
    const next = answerQuestion(profile.abroad, id, value);
    if (next === profile.abroad) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    updateProfile((p) => ({ ...p, abroad: answerQuestion(p.abroad, id, value) }));
    onDone?.(true);
  };
  const label = t(`sa.profileQ.${id}.q`);

  return (
    <div className={cn(!inline && 'space-y-3 rounded-2xl border border-brand/30 bg-brand-soft/40 p-4', inline && 'space-y-2.5', className)} data-question={id}>
      {!inline && <p className="font-semibold">{label}</p>}
      {q.kind === 'choice' && (
        <div className="flex flex-wrap gap-1.5" role="group" aria-label={label}>
          {q.options!.map((o) => (
            <button
              key={o}
              type="button"
              aria-pressed={current === o}
              onClick={() => save(o)}
              className={cn('h-9 rounded-full px-3.5 text-sm', current === o ? 'bg-foreground text-background' : 'border bg-card')}
            >
              {t(`sa.profileQ.${id}.options.${o}`)}
            </button>
          ))}
        </div>
      )}
      {(q.kind === 'text' || q.kind === 'number') && (
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            save(q.kind === 'number' ? Number(text) : text);
          }}
        >
          <Input aria-label={label} value={text} inputMode={q.kind === 'number' ? 'decimal' : 'text'} onChange={(e) => setText(e.target.value)} className="h-10 max-w-xs bg-card" />
          <Button type="submit" size="sm" className="h-10">
            {t('sa.profileQ.save')}
          </Button>
        </form>
      )}
      {q.kind === 'grade' && (
        <form
          className="flex flex-wrap gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            save({ value: Number(text), scale });
          }}
        >
          <select aria-label={label} value={scale} onChange={(e) => setScale(e.target.value as GradeScale)} className="h-10 rounded-lg border bg-card px-3 text-sm">
            {q.options!.map((o) => (
              <option key={o} value={o}>
                {t(`sa.profileQ.result.options.${o}`)}
              </option>
            ))}
          </select>
          <Input aria-label={t('sa.profileQ.amount')} value={text} inputMode="decimal" onChange={(e) => setText(e.target.value)} className="h-10 w-28 bg-card" />
          <Button type="submit" size="sm" className="h-10">
            {t('sa.profileQ.save')}
          </Button>
        </form>
      )}
      {q.kind === 'money' && (
        <form
          className="flex flex-wrap gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            save({ amount: Number(amount.replace(/[^\d.]/g, '')), currency });
          }}
        >
          <select aria-label={t('sa.profileQ.currency')} value={currency} onChange={(e) => setCurrency(e.target.value)} className="h-10 rounded-lg border bg-card px-3 text-sm">
            {CURRENCIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <Input aria-label={t('sa.profileQ.amount')} value={amount} inputMode="numeric" onChange={(e) => setAmount(e.target.value)} className="h-10 w-36 bg-card" />
          <Button type="submit" size="sm" className="h-10">
            {t('sa.profileQ.save')}
          </Button>
        </form>
      )}
      {invalid && <p className="text-xs text-warning">✕</p>}
      {!inline && onDone && (
        <button type="button" className="text-xs text-muted-foreground underline-offset-2 hover:underline" onClick={() => onDone(false)}>
          {t('sa.profileQ.skip')}
        </button>
      )}
    </div>
  );
}
