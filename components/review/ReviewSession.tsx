'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, CircleAlert, Sparkles, X, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState, ProgressBar, ScreenSkeleton } from '@/components/ds';
import { meanings } from '@/components/brain/meaning';
import { useWhen } from '@/components/brain/useWhen';
import { MinoSays } from '@/components/mino/MinoSays';
import { useBrain } from '@/components/providers/BrainProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { useLeave } from '@/components/setup/useLeave';
import {
  brainSummary,
  choiceOptions,
  diagnoseWord,
  dueWords,
  evaluateRecall,
  makeCloze,
  markActivityDone,
  nextExercise,
  type RecallVerdict,
} from '@/lib/engine';
import type { BrainWord, Locale, RecallExercise, RecallRating } from '@/lib/models';
import { cn } from '@/lib/utils';

const SESSION_LIMIT = 20;

interface Card {
  id: string;
  exercise: RecallExercise;
  /** Choose-the-meaning options. */
  options?: string[];
  retry?: boolean;
}

/** The recall format for a word, falling back when the word lacks what the format needs. */
function buildCard(word: BrainWord, all: BrainWord[], locale: Locale, focus?: string | null): Card {
  const options = choiceOptions(word, all, locale === 'bn' ? 'bn' : 'en');
  const problem = focus ?? diagnoseWord(word)?.problem;
  let exercise = nextExercise(word, problem, options ? 3 : 0);
  if (exercise === 'context' && !(word.originalSentence && makeCloze(word.originalSentence, word.lemma))) exercise = word.meaningBn ? 'recall-en' : 'meaning';
  if (exercise === 'completion' && !(word.exampleSentence && makeCloze(word.exampleSentence, word.lemma))) exercise = word.meaningBn ? 'recall-en' : 'meaning';
  if (exercise === 'meaning' && !word.meaning && !word.meaningBn && word.originalSentence) exercise = 'context';
  return { id: word.id, exercise, ...(exercise === 'choice' ? { options } : {}) };
}

type Verdict = RecallVerdict | 'dontknow';

/**
 * Today's Recall: the student retrieves each due word from memory (question →
 * answer → check), sees the answer, and — when useful — says how hard it was.
 * Correctness drives the schedule; the rating only tunes it.
 */
export function ReviewSession() {
  const params = useSearchParams();
  const router = useRouter();
  const leave = useLeave('/ielts/vocabulary/notebook');
  const { t, locale, n } = useLocale();
  const when = useWhen();
  const brain = useBrain();
  const { profile, updateProfile } = useProfile();

  const [queue, setQueue] = useState<Card[] | null>(null);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [hint, setHint] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [started, setStarted] = useState(false);
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  const due = useMemo(() => dueWords(brain.words), [brain.words]);
  const failedCount = due.filter((w) => w.consecutiveFailures > 0).length;

  // Build the queue once, when the Brain has loaded.
  useEffect(() => {
    if (brain.loading || queue !== null) return;
    const only = params.get('word');
    const focus = params.get('focus');
    if (only) {
      const w = brain.get(only);
      setQueue(w ? [buildCard(w, brain.words, locale, focus)] : []);
      setStarted(true);
    } else {
      setQueue(due.slice(0, SESSION_LIMIT).map((w) => buildCard(w, brain.words, locale)));
    }
  }, [brain.loading, brain, queue, params, due, locale]);

  useEffect(() => {
    if (started && verdict === null) inputRef.current?.focus();
  }, [started, index, verdict]);

  if (brain.loading || queue === null || !profile) return <ScreenSkeleton />;

  const close = () => leave();

  if (queue.length === 0) {
    const practiceAnyway = [...brain.words].sort((a, b) => a.stage - b.stage).slice(0, 5);
    const next = brainSummary(brain.words).nextDueAt;
    return (
      <div className="mx-auto max-w-lg px-4 py-10" data-testid="recall-empty">
        <EmptyState
          icon={CheckCircle2}
          title={brain.words.length === 0 ? t('review.emptyBrainTitle') : t('review.nothingDueTitle')}
          description={
            brain.words.length === 0 ? t('review.emptyBrainBody') : `${t('review.nothingDueBody')}${next ? ` ${t('brain.page.recallNext', { when: when(next) })}` : ''}`
          }
          action={
            <div className="flex flex-col gap-2 sm:flex-row">
              {practiceAnyway.length > 0 ? (
                <Button
                  onClick={() => {
                    setQueue(practiceAnyway.map((w) => buildCard(w, brain.words, locale)));
                    setStarted(true);
                  }}
                >
                  {t('review.practiceAnyway')}
                </Button>
              ) : (
                <Button asChild>
                  <Link href="/ielts/reading">{t('brain.page.emptyCta')}</Link>
                </Button>
              )}
              <Button variant="outline" onClick={close}>
                {t('common.back')}
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  if (!started) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center gap-8 px-4 py-10" data-testid="recall-intro">
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight">{t('review.title')}</h1>
          <p className="text-lg">{failedCount > 0 ? t('review.introFailed', { n: n(queue.length), failed: n(failedCount) }) : t('review.intro', { n: n(queue.length) })}</p>
          <p className="text-[15px] text-muted-foreground">{t('review.how')}</p>
        </div>
        <div className="space-y-2">
          <Button size="lg" className="w-full" onClick={() => setStarted(true)} data-testid="recall-begin">
            {t('review.start')}
          </Button>
          <Button variant="ghost" className="w-full text-muted-foreground" onClick={close}>
            {t('common.back')}
          </Button>
        </div>
      </div>
    );
  }

  if (index >= queue.length) {
    const ids = Object.keys(results);
    const correct = ids.filter((id) => results[id]).length;
    const next = brainSummary(brain.words).nextDueAt;
    return (
      <div className="mx-auto max-w-lg px-4 py-10" data-testid="recall-done-screen">
        <EmptyState
          icon={CheckCircle2}
          title={t('review.doneTitle')}
          description={`${t('review.doneBody', { correct: n(correct), total: n(ids.length) })}${next ? ` ${t('brain.page.recallNext', { when: when(next) })}` : ''}`}
          action={
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button onClick={() => router.push('/ielts/vocabulary/notebook')}>{t('review.backToBrain')}</Button>
              <Button asChild variant="outline">
                <Link href="/practice/writing">{t('review.nextWriting')}</Link>
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  const card = queue[index];
  const word = brain.get(card.id);
  if (!word) {
    // The word was removed mid-session.
    return (
      <div className="mx-auto max-w-lg px-4 py-10">
        <Button onClick={() => setIndex(index + 1)}>{t('review.next')}</Button>
      </div>
    );
  }
  const { primary, secondary } = meanings(word, locale);
  const cloze =
    card.exercise === 'context' ? makeCloze(word.originalSentence ?? '', word.lemma) : card.exercise === 'completion' ? makeCloze(word.exampleSentence ?? '', word.lemma) : undefined;
  const last = index + 1 >= queue.length;

  const record = async (correct: boolean, rating?: RecallRating) => {
    // Only the first attempt in a session counts towards the result summary.
    setResults((r) => (card.id in r ? r : { ...r, [card.id]: correct && rating !== 'again' }));
    await brain.recordRecall(word.id, card.exercise, correct, answer, rating);
    if ((!correct || rating === 'again') && !card.retry) setQueue((q) => [...(q ?? []), { ...buildCard(word, brain.words, locale), retry: true }]);
  };

  const next = () => {
    if (last) updateProfile((p) => markActivityDone(p, 'vocabulary'));
    setAnswer('');
    setVerdict(null);
    setHint(false);
    setIndex(index + 1);
  };

  const check = async () => {
    const v = evaluateRecall(word, card.exercise, answer);
    // An own sentence without the word (or too short) is not a wrong answer yet: ask for a full sentence.
    if (card.exercise === 'sentence' && v === 'wrong') {
      setHint(true);
      return;
    }
    setVerdict(v);
    if (v === 'wrong') await record(false);
  };

  const rate = async (rating: RecallRating) => {
    await record(verdict === 'correct' || verdict === 'close' || (verdict === 'check' && rating !== 'again'), rating);
    next();
  };

  const dontKnow = async () => {
    setVerdict('dontknow');
    await record(false);
  };

  const answerBlock = (
    <div className="space-y-1 rounded-xl bg-muted/70 px-4 py-3 text-[15px]" data-testid="recall-answer-block">
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-lg font-semibold" lang="en">
          {word.word}
        </span>
        {word.partOfSpeech && <span className="text-xs text-muted-foreground italic">{word.partOfSpeech}</span>}
      </p>
      {primary && <p>{primary}</p>}
      {secondary && <p className="text-sm text-muted-foreground">{secondary}</p>}
      {card.exercise === 'synonym' && word.synonyms.length > 0 && <p className="text-sm">≈ {word.synonyms.join(', ')}</p>}
      {(card.exercise === 'context' || card.exercise === 'completion') && (
        <p className="pt-1 text-sm text-foreground/80" lang="en">
          {card.exercise === 'context' ? word.originalSentence : word.exampleSentence}
        </p>
      )}
      {card.exercise === 'sentence' && word.exampleSentence && (
        <p className="pt-1 text-sm text-foreground/80">
          <span className="text-muted-foreground">{t('review.sentenceCompare')} </span>
          <span lang="en">{word.exampleSentence}</span>
        </p>
      )}
    </div>
  );

  const ratings: RecallRating[] = verdict === 'check' ? ['again', 'hard', 'good', 'easy'] : ['hard', 'good', 'easy'];

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4" data-testid="recall-session">
      <div className="flex h-14 items-center gap-2">
        <Button variant="ghost" size="icon" onClick={close} aria-label={t('common.close')}>
          <X />
        </Button>
        <ProgressBar value={(index / queue.length) * 100} label={t('review.title')} size="sm" className="flex-1" />
        <span className="w-12 text-right text-sm text-muted-foreground tabular-nums">
          {n(index + 1)}/{n(queue.length)}
        </span>
      </div>

      <div key={index} className="flex-1 space-y-6 pt-6 pb-8" data-recall-word={word.id} data-recall-format={card.exercise}>
        <p className="text-sm font-medium text-brand">{t(`review.type.${card.exercise}`)}</p>

        {/* Question first. */}
        {(card.exercise === 'meaning' || card.exercise === 'choice') && <h1 className="text-2xl font-semibold text-balance">{t('review.q.meaning', { word: word.word })}</h1>}
        {card.exercise === 'synonym' && <h1 className="text-2xl font-semibold text-balance">{t('review.q.synonym', { word: word.word })}</h1>}
        {card.exercise === 'sentence' && <h1 className="text-2xl font-semibold text-balance">{t('review.q.sentence', { word: word.word })}</h1>}
        {card.exercise === 'recall-en' && (
          <div className="space-y-3">
            <p className="rounded-xl border bg-card px-4 py-4 text-2xl font-semibold" data-testid="recall-prompt">
              {word.meaningBn}
            </p>
            <h1 className="text-lg font-medium">{t('review.q.recallEn')}</h1>
          </div>
        )}
        {cloze && (
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold text-balance">{t('review.q.cloze')}</h1>
            <p className="rounded-xl border bg-card px-4 py-3 text-lg" lang="en">
              {cloze}
            </p>
            {primary && <p className="text-sm text-muted-foreground">{t('review.hintMeaning', { meaning: primary })}</p>}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (verdict === null) void check();
            else if (verdict === 'wrong' || verdict === 'dontknow') next();
            else void rate('good');
          }}
          className="space-y-3"
        >
          {/* Then the answer area. */}
          {card.exercise === 'choice' && card.options ? (
            <div role="radiogroup" aria-label={t('review.answer')} className="grid gap-2">
              {card.options.map((o, i) => {
                const own = o === (locale === 'bn' ? word.meaningBn || word.meaning : word.meaning || word.meaningBn);
                const selected = answer === o;
                return (
                  <button
                    key={o}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={o}
                    disabled={verdict !== null}
                    onClick={() => setAnswer(o)}
                    className={cn(
                      'flex min-h-12 items-center gap-3 rounded-xl border bg-card px-3 py-2.5 text-left text-[15px] transition-colors',
                      selected && verdict === null && 'border-brand ring-1 ring-brand',
                      verdict !== null && own && 'border-success bg-success/10',
                      verdict !== null && selected && !own && 'border-destructive bg-destructive/10',
                    )}
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold text-muted-foreground" aria-hidden>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{o}</span>
                  </button>
                );
              })}
            </div>
          ) : card.exercise === 'sentence' ? (
            <>
              <label htmlFor="recall-answer" className="sr-only">
                {t('review.answer')}
              </label>
              <textarea
                id="recall-answer"
                ref={inputRef}
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  setHint(false);
                }}
                readOnly={verdict !== null}
                rows={3}
                lang="en"
                placeholder={t('review.placeholderSentence')}
                className="w-full rounded-xl border bg-card px-4 py-3 text-base outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
              />
              {hint && (
                <p className="text-sm text-warning" role="status">
                  {t('review.sentenceHint', { word: word.word })}
                </p>
              )}
            </>
          ) : (
            <>
              <label htmlFor="recall-answer" className="sr-only">
                {t('review.answer')}
              </label>
              <input
                id="recall-answer"
                ref={inputRef}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                readOnly={verdict !== null}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                placeholder={card.exercise === 'meaning' ? t('review.placeholderMeaning') : t('review.placeholderWord')}
                className={cn(
                  'h-12 w-full rounded-xl border bg-card px-4 text-base outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40',
                  (verdict === 'correct' || verdict === 'close') && 'border-success',
                  (verdict === 'wrong' || verdict === 'dontknow') && 'border-destructive',
                )}
              />
            </>
          )}

          {/* Then the action. */}
          {verdict === null ? (
            <div className="grid grid-cols-[1fr_auto] gap-2">
              <Button type="submit" size="lg" disabled={!answer.trim()} data-testid="recall-check">
                {t('review.check')}
              </Button>
              <Button type="button" variant="ghost" size="lg" onClick={dontKnow}>
                {t('review.dontKnow')}
              </Button>
            </div>
          ) : (
            <div className="space-y-3" aria-live="polite" data-verdict={verdict}>
              {(verdict === 'correct' || verdict === 'close') && (
                <p className="flex items-center gap-2 font-medium text-success">
                  <CheckCircle2 className="size-5" /> {verdict === 'correct' ? t('review.correct') : t('review.close')}
                </p>
              )}
              {(verdict === 'wrong' || verdict === 'dontknow') && (
                <p className="flex items-center gap-2 font-medium text-destructive">
                  <XCircle className="size-5" /> {t('review.wrong')}
                </p>
              )}
              {verdict === 'check' && (
                <p className="flex items-center gap-2 font-medium">
                  <CircleAlert className="size-5 text-warning" /> {t('review.selfCheck')}
                </p>
              )}
              {answerBlock}
              {card.exercise === 'sentence' && (
                <Link href={`/practice/writing?word=${word.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-brand">
                  <Sparkles className="size-4" aria-hidden /> {t('review.sentenceMino')}
                </Link>
              )}
              {verdict === 'wrong' || verdict === 'dontknow' ? (
                <Button type="submit" size="lg" className="w-full" data-testid="recall-next">
                  {last ? t('review.finish') : t('review.next')}
                </Button>
              ) : (
                <div className="space-y-1.5">
                  <p className="text-xs text-muted-foreground">{t('review.rateHint')}</p>
                  <div className={cn('grid gap-2', ratings.length === 4 ? 'grid-cols-4' : 'grid-cols-3')} data-testid="recall-ratings">
                    {ratings.map((r) => (
                      <Button
                        key={r}
                        type="button"
                        size="lg"
                        variant={r === 'good' ? 'default' : 'outline'}
                        className="px-1"
                        onClick={() => void rate(r)}
                        data-rating={r}
                      >
                        {t(`review.rate.${r}`)}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </form>

        {verdict !== null && diagnoseWord(word) && (
          <MinoSays>
            <Sparkles className="mr-1 inline size-4 text-brand" />
            {t(`diagnosis.${diagnoseWord(word)!.problem}.message`, { word: word.word })}
          </MinoSays>
        )}
      </div>
    </div>
  );
}
