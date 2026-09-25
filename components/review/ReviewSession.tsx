'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, CircleAlert, PartyPopper, Sparkles, X, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState, ProgressBar, ScreenSkeleton } from '@/components/ds';
import { meanings } from '@/components/brain/meaning';
import { MinoSays } from '@/components/mino/MinoSays';
import { useBrain } from '@/components/providers/BrainProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { useLeave } from '@/components/setup/useLeave';
import {
  diagnoseWord,
  dueWords,
  evaluateRecall,
  makeCloze,
  markActivityDone,
  nextExercise,
  type RecallVerdict,
} from '@/lib/engine';
import type { BrainWord, RecallExercise } from '@/lib/models';
import { cn } from '@/lib/utils';

const SESSION_LIMIT = 20;

interface Card {
  id: string;
  exercise: RecallExercise;
  retry?: boolean;
}

function buildCard(word: BrainWord, focus?: string | null): Card {
  const problem = focus ?? diagnoseWord(word)?.problem;
  let exercise = nextExercise(word, problem);
  if ((exercise === 'context' && !word.originalSentence) || (exercise === 'completion' && !word.exampleSentence)) exercise = 'meaning';
  if (exercise === 'context' && !makeCloze(word.originalSentence!, word.lemma)) exercise = 'meaning';
  if (exercise === 'completion' && !makeCloze(word.exampleSentence!, word.lemma)) exercise = 'meaning';
  if (exercise === 'meaning' && !word.meaning && !word.meaningBn && word.originalSentence) exercise = 'context';
  return { id: word.id, exercise };
}

export function ReviewSession() {
  const params = useSearchParams();
  const router = useRouter();
  const leave = useLeave('/');
  const { t, locale, n } = useLocale();
  const brain = useBrain();
  const { profile, updateProfile } = useProfile();

  const [queue, setQueue] = useState<Card[] | null>(null);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [verdict, setVerdict] = useState<RecallVerdict | 'dontknow' | null>(null);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [started, setStarted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const due = useMemo(() => dueWords(brain.words), [brain.words]);
  const failedCount = due.filter((w) => w.consecutiveFailures > 0).length;

  // Build the queue once, when the Brain has loaded.
  useEffect(() => {
    if (brain.loading || queue !== null) return;
    const only = params.get('word');
    const focus = params.get('focus');
    if (only) {
      const w = brain.get(only);
      setQueue(w ? [buildCard(w, focus)] : []);
      setStarted(true);
    } else {
      setQueue(due.slice(0, SESSION_LIMIT).map((w) => buildCard(w)));
    }
  }, [brain.loading, brain, queue, params, due]);

  useEffect(() => {
    if (started && verdict === null) inputRef.current?.focus();
  }, [started, index, verdict]);

  if (brain.loading || queue === null || !profile) return <ScreenSkeleton />;

  const name = profile.displayName;
  const close = () => leave();

  if (queue.length === 0) {
    const practiceAnyway = [...brain.words].sort((a, b) => a.stage - b.stage).slice(0, 5);
    return (
      <div className="mx-auto max-w-lg px-4 py-10">
        <EmptyState
          icon={CheckCircle2}
          title={brain.words.length === 0 ? t('review.emptyBrainTitle') : t('review.nothingDueTitle')}
          description={brain.words.length === 0 ? t('review.emptyBrainBody') : t('review.nothingDueBody')}
          action={
            <div className="flex flex-col gap-2 sm:flex-row">
              {practiceAnyway.length > 0 ? (
                <Button
                  onClick={() => {
                    setQueue(practiceAnyway.map((w) => buildCard(w)));
                    setStarted(true);
                  }}
                >
                  {t('review.practiceAnyway')}
                </Button>
              ) : (
                <Button asChild>
                  <Link href="/ielts/reading">{t('brain.emptyCta')}</Link>
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
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center gap-8 px-4 py-10">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight">{t('review.title')}</h1>
          <MinoSays>
            {name ? `${name}, ` : ''}
            {failedCount > 0 ? t('review.introFailed', { n: queue.length, failed: failedCount }) : t('review.intro', { n: queue.length })}
          </MinoSays>
          <p className="text-sm text-muted-foreground">{t('review.how')}</p>
        </div>
        <div className="space-y-2">
          <Button size="lg" className="w-full" onClick={() => setStarted(true)}>
            {t('review.start')}
          </Button>
          <Button variant="ghost" className="w-full text-muted-foreground" onClick={close}>
            {t('common.back')}
          </Button>
        </div>
      </div>
    );
  }

  const finished = index >= queue.length;
  if (finished) {
    const ids = Object.keys(results);
    const correct = ids.filter((id) => results[id]).length;
    return (
      <div className="mx-auto max-w-lg px-4 py-10">
        <EmptyState
          icon={PartyPopper}
          title={t('review.doneTitle')}
          description={t('review.doneBody', { correct, total: ids.length })}
          action={
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild>
                <Link href="/practice/writing">{t('review.nextWriting')}</Link>
              </Button>
              <Button variant="outline" onClick={() => router.push('/')}>
                {t('nav.home')}
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
    card.exercise === 'context'
      ? makeCloze(word.originalSentence ?? '', word.lemma)
      : card.exercise === 'completion'
        ? makeCloze(word.exampleSentence ?? '', word.lemma)
        : undefined;

  const record = async (correct: boolean) => {
    // Only the first attempt in a session counts towards the result summary.
    setResults((r) => (card.id in r ? r : { ...r, [card.id]: correct }));
    await brain.recordRecall(word.id, card.exercise, correct, answer);
    if (!correct && !card.retry) setQueue((q) => [...(q ?? []), { ...buildCard(word), retry: true }]);
  };

  const check = async () => {
    const v = evaluateRecall(word, card.exercise, answer);
    setVerdict(v);
    if (v === 'correct' || v === 'close') await record(true);
    if (v === 'wrong') await record(false);
  };

  const dontKnow = async () => {
    setVerdict('dontknow');
    await record(false);
  };

  const next = () => {
    const last = index + 1 >= queue.length;
    if (last) updateProfile((p) => markActivityDone(p, 'vocabulary'));
    setAnswer('');
    setVerdict(null);
    setIndex(index + 1);
  };

  const answerBlock = (
    <div className="space-y-1 rounded-xl bg-muted/70 px-4 py-3 text-[15px]">
      {card.exercise === 'synonym' ? (
        <p>
          <span className="font-semibold">{word.word}</span> ≈ {word.synonyms.join(', ')}
        </p>
      ) : card.exercise === 'meaning' ? (
        <>
          <p className="font-semibold">{word.word}</p>
          {primary && <p>{primary}</p>}
          {secondary && <p className="text-sm text-muted-foreground">{secondary}</p>}
        </>
      ) : (
        <p lang="en">{card.exercise === 'context' ? word.originalSentence : word.exampleSentence}</p>
      )}
    </div>
  );

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4">
      <div className="flex h-14 items-center gap-2">
        <Button variant="ghost" size="icon" onClick={close} aria-label={t('common.close')}>
          <X />
        </Button>
        <ProgressBar value={(index / queue.length) * 100} label={t('review.title')} size="sm" className="flex-1" />
        <span className="w-12 text-right text-sm text-muted-foreground tabular-nums">
          {n(index + 1)}/{n(queue.length)}
        </span>
      </div>

      <div className="flex-1 space-y-6 pt-6 pb-8">
        <p className="text-sm font-medium text-brand">{t(`review.type.${card.exercise}`)}</p>

        {card.exercise === 'meaning' && <h1 className="text-2xl font-semibold text-balance">{t('review.q.meaning', { word: word.word })}</h1>}
        {card.exercise === 'synonym' && <h1 className="text-2xl font-semibold text-balance">{t('review.q.synonym', { word: word.word })}</h1>}
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
            else next();
          }}
          className="space-y-3"
        >
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

          {verdict === null ? (
            <div className="grid grid-cols-[1fr_auto] gap-2">
              <Button type="submit" size="lg" disabled={!answer.trim()}>
                {t('review.check')}
              </Button>
              <Button type="button" variant="ghost" size="lg" onClick={dontKnow}>
                {t('review.dontKnow')}
              </Button>
            </div>
          ) : (
            <div className="space-y-3" aria-live="polite">
              {verdict === 'correct' && (
                <p className="flex items-center gap-2 font-medium text-success">
                  <CheckCircle2 className="size-5" /> {t('review.correct')}
                </p>
              )}
              {verdict === 'close' && (
                <p className="flex items-center gap-2 font-medium text-success">
                  <CheckCircle2 className="size-5" /> {t('review.close')}
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
              {verdict === 'check' ? (
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={async () => {
                      await record(false);
                      next();
                    }}
                  >
                    {t('review.selfNo')}
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    onClick={async () => {
                      await record(true);
                      next();
                    }}
                  >
                    {t('review.selfYes')}
                  </Button>
                </div>
              ) : (
                <Button type="submit" size="lg" className="w-full">
                  {index + 1 >= queue.length ? t('review.finish') : t('review.next')}
                </Button>
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
