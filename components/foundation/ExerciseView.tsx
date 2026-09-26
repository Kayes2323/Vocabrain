'use client';

import { useMemo, useState } from 'react';
import { Check, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLocale } from '@/components/providers/LocaleProvider';
import { expectedAnswer, gradeExercise, normaliseAnswer, shuffledWords, type Exercise, type L } from '@/lib/foundation';
import { cn } from '@/lib/utils';
import { useText } from './useFoundation';

export interface ExerciseResult {
  answer: string;
  /** null for self-checked writing. */
  correct: boolean | null;
}

/**
 * One exercise. With `feedback`, the student checks their answer and sees the
 * explanation before moving on (lessons); without it, they just move on (diagnostic).
 */
/** Why the student's specific wrong answer is wrong, when the content explains it. */
function whyWrong(exercise: Exercise, answer: string): L | undefined {
  if (exercise.type === 'choice') return exercise.why?.[answer];
  if (exercise.type === 'gap' || exercise.type === 'correct') return exercise.why?.[normaliseAnswer(answer)];
  return undefined;
}

export function ExerciseView({
  exercise,
  feedback = true,
  onAnswer,
  onDone,
  doneLabel,
  initial,
}: {
  exercise: Exercise;
  feedback?: boolean;
  /** Called as soon as the answer is checked (so it is saved even if the student leaves). */
  onAnswer?: (result: ExerciseResult) => void;
  onDone: (result: ExerciseResult) => void;
  doneLabel: string;
  /** An answer already given (resuming a lesson): shown as checked. */
  initial?: ExerciseResult;
}) {
  const { t } = useLocale();
  const text = useText();
  const [answer, setAnswer] = useState(initial?.answer ?? (exercise.type === 'correct' ? (exercise.sentence ?? '') : ''));
  const [picked, setPicked] = useState<number[]>([]);
  const [checked, setChecked] = useState<ExerciseResult | null>(initial ?? null);
  const words = useMemo(() => (exercise.type === 'order' ? shuffledWords(exercise.id, exercise.answer) : []), [exercise]);

  const value = exercise.type === 'order' ? (initial && picked.length === 0 ? initial.answer : picked.map((i) => words[i]).join(' ')) : answer;
  const ready = exercise.type === 'order' ? picked.length === words.length : value.trim().length > 0;

  const check = () => {
    const result = { answer: value, correct: gradeExercise(exercise, value) };
    onAnswer?.(result);
    if (feedback) setChecked(result);
    else onDone(result);
  };

  const locked = checked !== null;

  return (
    <div className="space-y-5" data-exercise-id={exercise.id}>
      <p className="text-[15px] font-medium">{text(exercise.prompt)}</p>
      {exercise.sentence && exercise.type !== 'correct' && (
        <p className="rounded-xl bg-muted/60 px-4 py-3 text-lg leading-relaxed" lang="en">
          {exercise.sentence}
        </p>
      )}

      {exercise.type === 'choice' && (
        <div role="radiogroup" className="grid gap-2">
          {exercise.options.map((o) => {
            const selected = answer === o;
            const right = locked && o === exercise.answer;
            const wrong = locked && selected && o !== exercise.answer;
            return (
              <button
                key={o}
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={locked}
                onClick={() => setAnswer(o)}
                lang="en"
                className={cn(
                  'flex min-h-12 items-center justify-between gap-3 rounded-xl border bg-card px-4 py-2.5 text-left transition-colors',
                  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40',
                  selected && !locked && 'border-brand ring-1 ring-brand',
                  right && 'border-success bg-success/10',
                  wrong && 'border-destructive bg-destructive/10',
                  !locked && !selected && 'hover:border-foreground/20',
                )}
              >
                <span>{o}</span>
                {right && <Check className="size-4 text-success" aria-hidden />}
                {wrong && <X className="size-4 text-destructive" aria-hidden />}
              </button>
            );
          })}
        </div>
      )}

      {exercise.type === 'gap' && (
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={locked}
          placeholder={t('foundation.lesson.typeHere')}
          aria-label={t('foundation.lesson.typeHere')}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          lang="en"
          className="h-12 text-base"
          onKeyDown={(e) => e.key === 'Enter' && ready && !locked && check()}
        />
      )}

      {exercise.type === 'correct' && (
        <div className="space-y-2">
          <p className="rounded-xl bg-muted/60 px-4 py-3 text-lg leading-relaxed text-muted-foreground line-through decoration-destructive/50" lang="en">
            {exercise.sentence}
          </p>
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={locked}
            aria-label={t('foundation.lesson.rewriteHere')}
            spellCheck={false}
            lang="en"
            rows={2}
            className="text-base"
          />
        </div>
      )}

      {exercise.type === 'order' && (
        <div className="space-y-3">
          <div
            className="flex min-h-14 flex-wrap items-center gap-2 rounded-xl border border-dashed p-3"
            aria-label={t('foundation.lesson.tapWords')}
            aria-live="polite"
          >
            {picked.length === 0 && <span className="text-sm text-muted-foreground">{t('foundation.lesson.tapWords')}</span>}
            {picked.map((i, pos) => (
              <button
                key={`${i}-${pos}`}
                type="button"
                disabled={locked}
                onClick={() => setPicked((p) => p.filter((_, k) => k !== pos))}
                className="rounded-lg border bg-brand-soft px-3 py-1.5 font-medium"
                lang="en"
              >
                {words[i]}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {words.map((w, i) =>
              picked.includes(i) ? null : (
                <button
                  key={i}
                  type="button"
                  disabled={locked}
                  onClick={() => setPicked((p) => [...p, i])}
                  className="rounded-lg border bg-card px-3 py-1.5 font-medium hover:border-foreground/30"
                  lang="en"
                >
                  {w}
                </button>
              ),
            )}
            {picked.length > 0 && !locked && (
              <Button variant="ghost" size="sm" onClick={() => setPicked([])}>
                <RotateCcw /> {t('foundation.lesson.clear')}
              </Button>
            )}
          </div>
        </div>
      )}

      {exercise.type === 'write' && (
        <div className="space-y-3">
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={locked}
            placeholder={t('foundation.lesson.writeHere')}
            aria-label={t('foundation.lesson.writeHere')}
            lang="en"
            rows={3}
            className="text-base"
          />
          {locked && (
            <div className="space-y-3 rounded-xl border p-4 text-sm">
              <p>
                <span className="font-semibold">{t('foundation.lesson.model')}: </span>
                <span lang="en">{exercise.model}</span>
              </p>
              <div className="space-y-1.5">
                <p className="font-semibold">{t('foundation.lesson.checklist')}</p>
                {exercise.checklist.map((c, i) => (
                  <label key={i} className="flex items-center gap-2">
                    <input type="checkbox" className="size-4 accent-primary" /> {text(c)}
                  </label>
                ))}
              </div>
              <p className="text-muted-foreground">{text(exercise.explanation)}</p>
            </div>
          )}
        </div>
      )}

      {checked && exercise.type !== 'write' && (
        <div
          role="status"
          className={cn('space-y-2 rounded-xl p-4 text-sm', checked.correct ? 'bg-success/10' : 'bg-amber-500/10')}
        >
          <p className="flex items-center gap-1.5 font-semibold">
            {checked.correct ? <Check className="size-4 text-success" aria-hidden /> : <X className="size-4 text-destructive" aria-hidden />}
            {checked.correct ? t('foundation.lesson.correct') : t('foundation.lesson.notQuite')}
          </p>
          {!checked.correct && (
            <div className="space-y-1" lang="en">
              {exercise.type !== 'choice' && checked.answer && (
                <p className="text-muted-foreground">
                  ✗ <span className="line-through decoration-destructive/60">{checked.answer}</span>
                </p>
              )}
              <p className="font-medium">✓ {expectedAnswer(exercise)}</p>
            </div>
          )}
          {!checked.correct && whyWrong(exercise, checked.answer) && (
            <p>
              <span className="font-medium">{t('foundation.lesson.whyWrong')} </span>
              {text(whyWrong(exercise, checked.answer)!)}
            </p>
          )}
          {text(exercise.explanation) && <p className="text-foreground/80">{text(exercise.explanation)}</p>}
        </div>
      )}

      <div className="flex justify-end">
        {checked ? (
          <Button size="lg" onClick={() => onDone(checked)}>
            {doneLabel}
          </Button>
        ) : (
          <Button size="lg" disabled={!ready} onClick={check}>
            {!feedback ? doneLabel : exercise.type === 'write' ? t('foundation.lesson.compare') : t('foundation.lesson.check')}
          </Button>
        )}
      </div>
    </div>
  );
}
