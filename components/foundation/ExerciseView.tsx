'use client';

import { useMemo, useState } from 'react';
import { Check, RotateCcw, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLocale } from '@/components/providers/LocaleProvider';
import { foundationFeedback } from '@/lib/ai/client';
import type { FoundationFeedback } from '@/lib/ai/server/assess/foundation';
import { expectedAnswer, formatTags, gradeExercise, normaliseAnswer, parseSpot, parseTags, shuffledWords, type Exercise, type L, type Pos } from '@/lib/foundation';
import { TagBoard } from './TagBoard';
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
  if (exercise.type === 'spot' && parseSpot(answer).index !== exercise.wrong) return undefined;
  return undefined;
}

export function ExerciseView({
  exercise,
  feedback = true,
  onAnswer,
  onDone,
  doneLabel,
  initial,
  lessonId,
  onApplied,
}: {
  exercise: Exercise;
  feedback?: boolean;
  /** Called as soon as the answer is checked (so it is saved even if the student leaves). */
  onAnswer?: (result: ExerciseResult) => void;
  onDone: (result: ExerciseResult) => void;
  doneLabel: string;
  /** An answer already given (resuming a lesson): shown as checked. */
  initial?: ExerciseResult;
  /** With a lesson id, personal-use writing tasks are checked by Mino. */
  lessonId?: string;
  onApplied?: (feedback: FoundationFeedback, text: string) => void;
}) {
  const { t, locale } = useLocale();
  const [mino, setMino] = useState<{ status: 'loading' | 'failed' | 'guest' } | { status: 'done'; feedback: FoundationFeedback } | null>(null);
  const withMino = exercise.type === 'write' && Boolean(exercise.mino) && Boolean(lessonId);
  const askMino = async (text: string) => {
    setMino({ status: 'loading' });
    const res = await foundationFeedback(lessonId!, exercise.id, text, locale === 'bn' ? 'bn' : 'en');
    if (res.ok) {
      setMino({ status: 'done', feedback: res.feedback });
      onApplied?.(res.feedback, text);
    } else setMino({ status: res.error === 'unauthenticated' ? 'guest' : 'failed' });
  };
  const text = useText();
  const [answer, setAnswer] = useState(initial?.answer ?? (exercise.type === 'correct' ? (exercise.sentence ?? '') : ''));
  const [picked, setPicked] = useState<number[]>([]);
  const [tags, setTags] = useState<Record<number, Pos>>(() => (exercise.type === 'tag' && initial ? parseTags(initial.answer) : {}));
  const [spotAt, setSpotAt] = useState<number | null>(() => (exercise.type === 'spot' && initial ? parseSpot(initial.answer).index : null));
  const [fix, setFix] = useState(() => (exercise.type === 'spot' && initial ? parseSpot(initial.answer).fix : ''));
  const [checked, setChecked] = useState<ExerciseResult | null>(initial ?? null);
  const words = useMemo(() => (exercise.type === 'order' ? shuffledWords(exercise.id, exercise.answer) : []), [exercise]);

  const value =
    exercise.type === 'order'
      ? initial && picked.length === 0
        ? initial.answer
        : picked.map((i) => words[i]).join(' ')
      : exercise.type === 'tag'
        ? formatTags(tags)
        : exercise.type === 'spot'
          ? `${spotAt ?? -1}:${fix}`
          : answer;
  const ready =
    exercise.type === 'order'
      ? picked.length === words.length
      : exercise.type === 'tag'
        ? exercise.tokens.every((tk, i) => !tk.pos || tags[i])
        : exercise.type === 'spot'
          ? spotAt !== null && fix.trim().length > 0
          : value.trim().length > 0;

  const check = () => {
    const result = { answer: value, correct: gradeExercise(exercise, value) };
    onAnswer?.(result);
    if (feedback) setChecked(result);
    else onDone(result);
    if (withMino) void askMino(value);
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

      {exercise.type === 'gap' && exercise.base && (
        <p className="text-sm text-muted-foreground">
          <span className="rounded-md bg-brand-soft px-2 py-1 font-semibold text-foreground" lang="en">
            {exercise.base}
          </span>{' '}
          → {t('foundation.lesson.rightForm')}
        </p>
      )}

      {exercise.type === 'tag' && (
        <TagBoard
          tokens={exercise.tokens}
          choices={exercise.choices}
          mode="exercise"
          tags={tags}
          onTag={(i, p) => setTags((cur) => ({ ...cur, [i]: p }))}
          result={checked ? Boolean(checked.correct) : undefined}
        />
      )}

      {exercise.type === 'spot' && (
        <div className="space-y-3">
          <p className="flex flex-wrap gap-x-1 gap-y-1.5 rounded-2xl border bg-card px-3 py-3 text-lg leading-relaxed" lang="en">
            {exercise.words.map((w, i) => {
              const chosen = spotAt === i;
              const actual = locked && i === exercise.wrong;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={locked}
                  onClick={() => {
                    setSpotAt(i);
                    setFix('');
                  }}
                  aria-pressed={chosen}
                  className={cn(
                    'rounded-md px-1 transition-colors',
                    !locked && 'hover:bg-muted',
                    chosen && !locked && 'bg-destructive/10 text-destructive line-through decoration-destructive/60',
                    locked && chosen && i !== exercise.wrong && 'bg-muted',
                    actual && 'bg-destructive/10 line-through decoration-destructive/60',
                  )}
                >
                  {w}
                </button>
              );
            })}
          </p>
          {spotAt !== null && !locked && (
            <div className="space-y-2">
              <p className="text-sm font-medium">{t('foundation.lesson.fixIt', { word: exercise.words[spotAt].replace(/[.,;:!?]+$/, '') })}</p>
              {exercise.fixOptions ? (
                <div role="radiogroup" className="grid gap-2 sm:grid-cols-3">
                  {exercise.fixOptions.map((o) => (
                    <button
                      key={o}
                      type="button"
                      role="radio"
                      aria-checked={fix === o}
                      onClick={() => setFix(o)}
                      lang="en"
                      className={cn('min-h-11 rounded-xl border bg-card px-3 text-left transition-colors', fix === o ? 'border-brand ring-1 ring-brand' : 'hover:border-foreground/20')}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              ) : (
                <Input
                  value={fix}
                  onChange={(e) => setFix(e.target.value)}
                  placeholder={t('foundation.lesson.typeHere')}
                  aria-label={t('foundation.lesson.typeHere')}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  lang="en"
                  className="h-12 text-base"
                  onKeyDown={(e) => e.key === 'Enter' && ready && check()}
                />
              )}
            </div>
          )}
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
          {exercise.mino && (
            <p className="rounded-lg bg-brand-soft px-3 py-2 text-sm">
              <span className="font-semibold">{t('foundation.lesson.target')}: </span>
              {text(exercise.mino.target)}
            </p>
          )}
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
          {locked && withMino && mino && (
            <div role="status" className={cn('space-y-2 rounded-xl p-4 text-sm', mino.status === 'done' ? (mino.feedback.verdict === 'needs-work' ? 'bg-amber-500/10' : 'bg-success/10') : 'bg-muted/60')}>
              <p className="flex items-center gap-1.5 font-semibold">
                <Sparkles className={cn('size-4 text-brand', mino.status === 'loading' && 'animate-pulse')} aria-hidden />
                {mino.status === 'loading'
                  ? t('foundation.lesson.minoChecking')
                  : mino.status === 'guest'
                    ? t('foundation.lesson.minoSignIn')
                    : mino.status === 'failed'
                      ? t('foundation.lesson.minoBusy')
                      : mino.status === 'done'
                        ? t(`foundation.lesson.minoVerdict.${mino.feedback.verdict}`)
                        : ''}
              </p>
              {mino.status === 'done' && (
                <>
                  <p>{mino.feedback.feedback}</p>
                  {mino.feedback.fixes.length > 0 && (
                    <ul className="space-y-1" lang="en">
                      {mino.feedback.fixes.map((f, i) => (
                        <li key={i}>
                          <span className="line-through decoration-destructive/60">{f.quote}</span> → <span className="font-medium">{f.fix}</span>
                          <span className="block text-muted-foreground">{f.why}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {mino.feedback.verdict !== 'correct' && (
                    <p>
                      <span className="font-semibold">{t('foundation.lesson.minoCorrected')}: </span>
                      <span lang="en">{mino.feedback.corrected}</span>
                    </p>
                  )}
                  {mino.feedback.practice && <MinoPractice practice={mino.feedback.practice} />}
                </>
              )}
              {mino.status === 'failed' && (
                <Button size="sm" variant="outline" onClick={() => void askMino(value)}>
                  {t('foundation.lesson.minoRetry')}
                </Button>
              )}
            </div>
          )}
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
              {exercise.type !== 'choice' && exercise.type !== 'tag' && exercise.type !== 'spot' && checked.answer && (
                <p className="text-muted-foreground">
                  ✗ <span className="line-through decoration-destructive/60">{checked.answer}</span>
                </p>
              )}
              <p className="font-medium">✓ {expectedAnswer(exercise)}</p>
              {exercise.type === 'spot' && parseSpot(checked.answer).index !== exercise.wrong && (
                <p className="text-muted-foreground">{t('foundation.lesson.spotWrongWord', { word: exercise.words[exercise.wrong].replace(/[.,;:!?]+$/, '') })}</p>
              )}
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
          <Button size="lg" disabled={mino?.status === 'loading'} onClick={() => onDone(checked)}>
            {doneLabel}
          </Button>
        ) : (
          <Button size="lg" disabled={!ready} onClick={check}>
            {!feedback ? doneLabel : withMino ? t('foundation.lesson.getMino') : exercise.type === 'write' ? t('foundation.lesson.compare') : t('foundation.lesson.check')}
          </Button>
        )}
      </div>
    </div>
  );
}

/** Mino's one-question follow-up on the same point (checked here, not graded). */
function MinoPractice({ practice }: { practice: { sentence: string; answers: string[] } }) {
  const { t } = useLocale();
  const [value, setValue] = useState('');
  const [result, setResult] = useState<boolean | null>(null);
  const [before, after] = practice.sentence.split('___');
  return (
    <div className="space-y-2 rounded-lg border bg-card p-3">
      <p className="font-semibold">{t('foundation.lesson.minoPractice')}</p>
      <form
        className="flex flex-wrap items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (value.trim()) setResult(practice.answers.some((a) => normaliseAnswer(a) === normaliseAnswer(value)));
        }}
      >
        <span lang="en" className="flex flex-wrap items-center gap-1.5">
          {before}
          <Input value={value} onChange={(e) => { setValue(e.target.value); setResult(null); }} aria-label={t('foundation.lesson.typeHere')} lang="en" className="h-9 w-32" autoCapitalize="off" autoCorrect="off" spellCheck={false} />
          {after}
        </span>
        <Button type="submit" size="sm" variant="outline" disabled={!value.trim()}>
          {t('foundation.lesson.check')}
        </Button>
      </form>
      {result !== null && (
        <p className={cn('flex items-center gap-1.5', result ? 'text-success' : 'text-foreground')}>
          {result ? <Check className="size-4" aria-hidden /> : <X className="size-4 text-destructive" aria-hidden />}
          {result ? t('foundation.lesson.minoPracticeRight') : t('foundation.lesson.minoPracticeAnswer', { answer: practice.answers[0] })}
        </p>
      )}
    </div>
  );
}
