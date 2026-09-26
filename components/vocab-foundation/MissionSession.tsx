'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Lightbulb, Plus, Sparkles, Volume2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Panel, ProgressBar, ScreenSkeleton, StatusChip } from '@/components/ds';
import { useBrain } from '@/components/providers/BrainProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { speakWord } from '@/components/reading/speak';
import { vocabFeedback } from '@/lib/ai/client';
import type { VocabFeedback } from '@/lib/ai/server/assess/vocab';
import { checkSentence, createBrainWord, evaluateRecall, makeCloze, type RecallVerdict } from '@/lib/engine';
import { localDateKey } from '@/lib/engine/dates';
import type { BrainWord } from '@/lib/models';
import {
  bumpDay, finishMission, getFoundationWord, moveSession, recordDiscovery, recordSessionResult, sessionSteps, sessionSummary, SOURCE,
  startSession, toWordInfo, type FoundationWord, type SessionStep,
} from '@/lib/vocab-foundation';
import { useText } from '@/components/foundation/useFoundation';
import { cn } from '@/lib/utils';
import { useVocabFoundation } from './useVocabFoundation';

/** The sentence with the target word (any form) highlighted. */
function Highlighted({ sentence, word }: { sentence: string; word: string }) {
  const stem = word.slice(0, Math.max(4, word.length - 2)).toLowerCase();
  return (
    <>
      {sentence.split(/(\s+)/).map((tok, i) =>
        tok.toLowerCase().replace(/[^a-z]/g, '').startsWith(stem) ? (
          <mark key={i} className="rounded bg-brand-soft px-1 font-semibold text-foreground underline decoration-brand decoration-2 underline-offset-4">
            {tok}
          </mark>
        ) : (
          <span key={i}>{tok}</span>
        ),
      )}
    </>
  );
}

// ------------------------------------------------------------------ discover

function DiscoverStep({ fw, onNext }: { fw: FoundationWord; onNext: () => void }) {
  const { t } = useLocale();
  const text = useText();
  const brain = useBrain();
  const { vf, update } = useVocabFoundation();
  const [picked, setPicked] = useState<number | undefined>(undefined);
  const [reveal, setReveal] = useState(1);
  const [justSaved, setJustSaved] = useState(false);
  const saved = brain.has(fw.id);
  const alreadyGuessed = vf?.discovered[fw.id];
  const answered = picked !== undefined || Boolean(alreadyGuessed);

  const pick = (i: number) => {
    setPicked(i);
    update((v) => recordDiscovery(v, fw.id, i === fw.guess.answer));
  };

  const more: [number, string][] = [
    [2, t('vocabFoundation.session.moreExamples')],
    [3, t('vocabFoundation.session.moreSynonyms')],
    [4, t('vocabFoundation.session.moreIelts')],
  ];

  return (
    <div className="space-y-5">
      <Panel className="text-lg leading-8" lang="en">
        <Highlighted sentence={fw.context} word={fw.word} />
      </Panel>

      <div className="space-y-1">
        <p className="text-[17px] font-semibold">{t('vocabFoundation.session.guessPrompt', { word: fw.word })}</p>
        {!answered && <p className="text-sm text-muted-foreground">{t('vocabFoundation.session.guessHint')}</p>}
      </div>
      <div role="radiogroup" className="grid gap-2 sm:grid-cols-2">
        {fw.guess.options.map((o, i) => {
          const isAnswer = answered && i === fw.guess.answer;
          const wrong = picked === i && i !== fw.guess.answer;
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={picked === i}
              disabled={answered}
              onClick={() => pick(i)}
              className={cn(
                'flex min-h-13 items-center gap-3 rounded-xl border bg-card px-4 py-3 text-left text-[15px] transition-colors',
                'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40',
                !answered && 'hover:border-foreground/20',
                isAnswer && 'border-success bg-success/10',
                wrong && 'border-amber-500 bg-amber-500/10',
              )}
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold">{String.fromCharCode(65 + i)}</span>
              <span className="flex-1">{text(o)}</span>
              {isAnswer && <Check className="size-4 text-success" aria-label={t('vocabFoundation.session.correct')} />}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {picked !== undefined && (
            <p role="status" className="text-[15px] font-medium">
              {picked === fw.guess.answer ? t('vocabFoundation.session.guessRight') : t('vocabFoundation.session.guessWrong')}
            </p>
          )}

          {/* 1. Meaning first */}
          <Panel className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-2xl font-semibold tracking-tight" lang="en">{fw.word}</p>
              <span className="text-muted-foreground" lang="en">{fw.ipa}</span>
              <Button variant="ghost" size="icon" aria-label={`${t('vocabFoundation.session.listen')}: ${fw.word}`} onClick={() => speakWord(fw.word)}>
                <Volume2 />
              </Button>
              <StatusChip>{fw.partOfSpeech}</StatusChip>
            </div>
            <p className="text-[17px]">
              <span className="font-semibold">{t('vocabFoundation.session.meaning')}: </span>
              {text(fw.meaning)}
            </p>
            <p className="text-sm text-muted-foreground">{text(fw.explanation)}</p>
          </Panel>

          {/* 2–4. More, one layer at a time */}
          {reveal >= 2 && (
            <Panel className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <p className="text-sm font-semibold text-muted-foreground">{t('vocabFoundation.session.examples')}</p>
              {fw.examples.map((e) => (
                <p key={e} lang="en">
                  <Highlighted sentence={e} word={fw.word} />
                </p>
              ))}
              <p className="pt-1 text-sm font-semibold text-muted-foreground">{t('vocabFoundation.session.collocations')}</p>
              <div className="flex flex-wrap gap-2" lang="en">
                {fw.collocations.map((c) => (
                  <span key={c} className="rounded-full border bg-background px-3 py-1 text-sm">{c}</span>
                ))}
              </div>
            </Panel>
          )}
          {reveal >= 3 && (
            <Panel className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <p className="text-sm font-semibold text-muted-foreground">{t('vocabFoundation.session.synonyms')}</p>
              <p lang="en">{fw.synonyms.join(' · ')}</p>
              {fw.synonymNote && <p className="rounded-lg bg-amber-500/10 p-3 text-sm">{text(fw.synonymNote)}</p>}
              {fw.antonyms?.length ? (
                <p className="text-sm">
                  <span className="font-semibold">{t('vocabFoundation.session.opposites')}: </span>
                  <span lang="en">{fw.antonyms.join(' · ')}</span>
                </p>
              ) : null}
              {fw.family?.length ? (
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold text-muted-foreground">{t('vocabFoundation.session.family')}</p>
                  {fw.family.map((f) => (
                    <p key={f.word} className="text-sm" lang="en">
                      <span className="font-semibold">{f.word}</span> <span className="text-muted-foreground">({f.pos})</span> — {f.example}
                    </p>
                  ))}
                </div>
              ) : null}
            </Panel>
          )}
          {reveal >= 4 && (
            <Panel className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {fw.ielts.map((u) => (
                <div key={u.skill} className="space-y-0.5">
                  <p className="text-xs font-semibold text-brand">{t(`vocabFoundation.word.skill.${u.skill}`)}</p>
                  <p lang="en">“{u.example}”</p>
                  <p className="text-sm text-muted-foreground">{text(u.note)}</p>
                </div>
              ))}
            </Panel>
          )}
          {more
            .filter(([r]) => r === reveal + 1)
            .map(([r, label]) => (
              <Button key={r} variant="outline" className="w-full" onClick={() => setReveal(r)}>
                {label}
              </Button>
            ))}
        </div>
      )}

      {/* The main action stays within thumb reach. */}
      {answered && (
        <div className="sticky bottom-[calc(5rem+env(safe-area-inset-bottom))] z-30 md:bottom-4">
          <div className="space-y-2">
            {justSaved && (
              <p role="status" className="flex items-center justify-center gap-1.5 rounded-full bg-success/15 px-3 py-1.5 text-center text-sm font-medium animate-in fade-in zoom-in-95 duration-300">
                <Check className="size-4 text-success" aria-hidden /> {t('vocabFoundation.session.saved')}
              </p>
            )}
            {saved ? (
              <Button size="lg" className="h-13 w-full text-base shadow-lg" onClick={onNext}>
                {t('vocabFoundation.session.next')} <ArrowRight />
              </Button>
            ) : (
              // Saving is the student's choice: they can move on without it.
              <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-2">
                <Button
                  size="lg"
                  variant="brand"
                  className="h-13 text-base shadow-lg"
                  onClick={async () => {
                    await brain.save(toWordInfo(fw), SOURCE, fw.context);
                    setJustSaved(true);
                  }}
                >
                  <Plus /> {t('vocabFoundation.session.save')}
                </Button>
                <Button size="lg" variant="outline" className="h-13 bg-background text-base shadow-lg" onClick={onNext}>
                  {t('vocabFoundation.session.next')} <ArrowRight />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------------ recall

type RecallState =
  | { stage: 'ask'; attempt: 0 | 1 }
  | { stage: 'self' }
  | { stage: 'result'; correct: boolean; kind: 'first' | 'clue' | 'revealed' | 'close' };

function RecallStep({ fw, kind, onNext }: { fw: FoundationWord; kind: 'meaning' | 'completion'; onNext: () => void }) {
  const { t } = useLocale();
  const text = useText();
  const brain = useBrain();
  const { update } = useVocabFoundation();
  const [answer, setAnswer] = useState('');
  const [state, setState] = useState<RecallState>({ stage: 'ask', attempt: 0 });
  const recorded = useRef(false);
  const word: BrainWord = brain.get(fw.id) ?? createBrainWord(toWordInfo(fw), SOURCE, fw.context);
  const exercise = kind === 'meaning' ? 'meaning' : 'completion';
  const cloze = kind === 'completion' ? makeCloze(fw.examples[0], fw.id) : undefined;

  const record = (correct: boolean) => {
    if (recorded.current) return;
    recorded.current = true;
    // Only words the student chose to save go into the Brain's review schedule.
    if (brain.has(fw.id)) void brain.recordRecall(fw.id, exercise, correct, answer);
    update((v) => bumpDay(recordSessionResult(v, `recall:${kind}:${fw.id}`, correct, answer), { recalls: 1, recallCorrect: correct ? 1 : 0 }));
  };

  const check = (giveUp = false) => {
    const v: RecallVerdict = giveUp ? 'wrong' : evaluateRecall(word, exercise, answer);
    if (state.stage !== 'ask') return;
    if (v === 'correct' || v === 'close') {
      // Right on the first try is a real recall; with a clue it counts as "needs more practice".
      record(state.attempt === 0);
      setState({ stage: 'result', correct: true, kind: state.attempt === 0 ? (v === 'close' ? 'close' : 'first') : 'clue' });
    } else if (v === 'check' && state.attempt === 0) {
      setState({ stage: 'self' });
    } else if (state.attempt === 0) {
      setState({ stage: 'ask', attempt: 1 });
      setAnswer('');
    } else {
      record(false);
      setState({ stage: 'result', correct: false, kind: 'revealed' });
    }
  };

  const clue = kind === 'meaning' ? text(fw.clue) : `${fw.word[0].toUpperCase()}… (${text(fw.meaning)})`;
  const done = state.stage === 'result';

  return (
    <div className="space-y-5">
      {kind === 'meaning' ? (
        <div className="space-y-1">
          <p className="text-2xl font-semibold tracking-tight" lang="en">
            {t('vocabFoundation.session.recallMeaning', { word: fw.word })}
          </p>
          <p className="text-sm text-muted-foreground">{t('vocabFoundation.session.recallMeaningHint')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-[17px] font-semibold">{t('vocabFoundation.session.recallCloze')}</p>
          <Panel className="text-lg leading-8" lang="en">
            {done ? <Highlighted sentence={fw.examples[0]} word={fw.word} /> : cloze}
          </Panel>
        </div>
      )}

      {state.stage === 'ask' && state.attempt === 1 && (
        <div role="status" className="space-y-1.5 rounded-xl bg-amber-500/10 p-4 animate-in fade-in duration-300">
          <p className="font-semibold">{t('vocabFoundation.session.almost')}</p>
          <p className="flex gap-2 text-[15px]">
            <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden />
            <span>
              <span className="font-medium">{t('vocabFoundation.session.clue')}: </span>
              {clue}
            </span>
          </p>
        </div>
      )}

      {!done && state.stage === 'ask' && (
        <div className="space-y-3">
          <Input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={t('vocabFoundation.session.answerPlaceholder')}
            aria-label={t('vocabFoundation.session.answerPlaceholder')}
            className="h-13 text-base"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            onKeyDown={(e) => e.key === 'Enter' && answer.trim() && check()}
          />
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
            <Button variant="ghost" onClick={() => check(true)}>
              {t('vocabFoundation.session.dontRemember')}
            </Button>
            <Button size="lg" disabled={!answer.trim()} onClick={() => check()}>
              {state.attempt === 1 ? t('vocabFoundation.session.tryAgain') : t('vocabFoundation.session.check')}
            </Button>
          </div>
        </div>
      )}

      {state.stage === 'self' && (
        <div className="space-y-3 rounded-xl border p-4 animate-in fade-in duration-300">
          <p>
            <span className="font-semibold">{t('vocabFoundation.session.meaning')}: </span>
            {text(fw.meaning)}
          </p>
          <p className="font-medium">{t('vocabFoundation.session.selfCheck')}</p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => {
                record(true);
                setState({ stage: 'result', correct: true, kind: 'first' });
              }}
            >
              {t('vocabFoundation.session.selfYes')}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                record(false);
                setState({ stage: 'result', correct: false, kind: 'revealed' });
              }}
            >
              {t('vocabFoundation.session.selfNo')}
            </Button>
          </div>
        </div>
      )}

      {done && (
        <div role="status" className={cn('space-y-2 rounded-xl p-4 animate-in fade-in zoom-in-95 duration-300', state.correct ? 'bg-success/10' : 'bg-muted/70')}>
          <p className="flex items-center gap-1.5 font-semibold">
            {state.correct && <Check className="size-4 text-success" aria-hidden />}
            {state.kind === 'first'
              ? t('vocabFoundation.session.correct')
              : state.kind === 'close'
                ? t('vocabFoundation.session.close')
                : state.kind === 'clue'
                  ? t('vocabFoundation.session.withClue')
                  : t('vocabFoundation.session.reveal')}
          </p>
          <p lang="en" className="text-lg font-semibold">{fw.word}</p>
          <p>{text(fw.meaning)}</p>
          <p className="text-sm text-muted-foreground" lang="en">
            <Highlighted sentence={fw.context} word={fw.word} />
          </p>
        </div>
      )}

      {done && (
        <Button size="lg" className="h-13 w-full text-base" onClick={onNext}>
          {t('vocabFoundation.session.continue')} <ArrowRight />
        </Button>
      )}
    </div>
  );
}

// ------------------------------------------------------------------ use

type UseResult =
  | { source: 'mino'; feedback: VocabFeedback; correct: boolean }
  | { source: 'fallback'; guest: boolean; keys: string[]; collocation?: string; correct: boolean };

function UseStep({ fw, onNext }: { fw: FoundationWord; onNext: () => void }) {
  const { t, locale } = useLocale();
  const text = useText();
  const brain = useBrain();
  const { update } = useVocabFoundation();
  const [sentence, setSentence] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UseResult | null>(null);

  const submit = async () => {
    setLoading(true);
    const res = await vocabFeedback(fw.id, sentence.trim(), locale === 'bn' ? 'bn' : 'en');
    let r: UseResult;
    if (res.ok) {
      r = { source: 'mino', feedback: res.feedback, correct: res.feedback.verdict !== 'needs-work' };
    } else {
      // The loop never depends on the AI: a rule-based check keeps it going.
      const word = brain.get(fw.id) ?? createBrainWord(toWordInfo(fw), SOURCE, fw.context);
      const c = checkSentence(word, sentence);
      r = { source: 'fallback', guest: res.error === 'unauthenticated', keys: c.feedback, collocation: c.collocation, correct: c.correct };
    }
    setResult(r);
    setLoading(false);
    if (brain.has(fw.id)) void brain.recordUsage(fw.id, { mode: 'writing', text: sentence.trim(), correct: r.correct, feedback: r.source === 'fallback' ? r.keys : [] });
    update((v) => bumpDay(recordSessionResult(v, `use:${fw.id}`, r.correct, sentence.trim()), { sentences: 1, sentencesCorrect: r.correct ? 1 : 0 }));
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <p className="text-2xl font-semibold tracking-tight">{t('vocabFoundation.session.useTitle')}</p>
        <p className="text-[15px]">
          {t('vocabFoundation.session.useHint', { word: fw.word })} {text(fw.useTask)}
        </p>
      </div>
      <div className="flex flex-wrap gap-2" lang="en">
        {fw.collocations.slice(0, 3).map((c) => (
          <span key={c} className="rounded-full border px-3 py-1 text-sm text-muted-foreground">{c}</span>
        ))}
      </div>
      <Textarea
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
        disabled={Boolean(result) || loading}
        placeholder={t('vocabFoundation.session.sentencePlaceholder')}
        aria-label={t('vocabFoundation.session.sentencePlaceholder')}
        rows={3}
        lang="en"
        className="text-base"
      />
      {!result && (
        <Button size="lg" className="h-13 w-full text-base" disabled={sentence.trim().length < 3 || loading} onClick={submit}>
          <Sparkles className={cn(loading && 'animate-pulse')} /> {loading ? t('vocabFoundation.session.minoChecking') : t('vocabFoundation.session.getFeedback')}
        </Button>
      )}
      {result && (
        <div role="status" className={cn('space-y-2 rounded-xl p-4 animate-in fade-in duration-300', result.correct ? 'bg-success/10' : 'bg-amber-500/10')}>
          {result.source === 'mino' ? (
            <>
              <p className="flex items-center gap-1.5 font-semibold">
                <Sparkles className="size-4 text-brand" aria-hidden /> {t(`vocabFoundation.session.verdict.${result.feedback.verdict}`)}
              </p>
              <p>{result.feedback.feedback}</p>
              {result.feedback.improved && (
                <p>
                  <span className="font-semibold">{t('vocabFoundation.session.improved')}: </span>
                  <span lang="en">{result.feedback.improved}</span>
                </p>
              )}
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">{result.guest ? t('vocabFoundation.session.quickCheckGuest') : t('vocabFoundation.session.quickCheck')}</p>
              {result.keys.map((k) => (
                <p key={k}>{t(k, { word: fw.word, collocation: result.collocation ?? '' })}</p>
              ))}
            </>
          )}
        </div>
      )}
      {result && (
        <Button size="lg" className="h-13 w-full text-base" onClick={onNext}>
          {t('vocabFoundation.session.continue')} <ArrowRight />
        </Button>
      )}
    </div>
  );
}

// ------------------------------------------------------------------ done

function DoneStep() {
  const { t, n } = useLocale();
  const { vf, update } = useVocabFoundation();
  const brain = useBrain();
  const finished = useRef(false);
  useEffect(() => {
    if (finished.current) return;
    finished.current = true;
    update((v) => finishMission(v));
  }, [update]);
  if (!vf?.session) return null;
  const s = sessionSummary(vf.session);
  const due = brain.words.filter((w) => Date.parse(w.nextReviewAt) <= Date.now()).length;
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex size-16 animate-in zoom-in-50 items-center justify-center rounded-full bg-success text-white duration-500" aria-hidden>
        <Check className="size-8" />
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">{t('vocabFoundation.session.doneTitle')}</h1>
      <Panel className="space-y-2 text-left text-[15px]">
        <p>✓ {t('vocabFoundation.session.doneWords', { n: s.words })}</p>
        <p>✓ {t('vocabFoundation.session.doneRecall', { correct: s.recallCorrect, total: s.recallTotal })}</p>
        <p>✓ {t('vocabFoundation.session.doneSentences', { correct: s.sentencesCorrect, total: s.sentencesTotal })}</p>
      </Panel>
      <p className="text-sm text-muted-foreground">{t('vocabFoundation.session.doneNext')}</p>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
        {due > 0 ? (
          <Button asChild size="lg">
            <Link href="/review">{t('vocabFoundation.mission.reviewNow', { n: n(due) })}</Link>
          </Button>
        ) : (
          <Button asChild size="lg">
            <Link href="/ielts/vocabulary/notebook">{t('vocabFoundation.session.seeBrain')}</Link>
          </Button>
        )}
        <Button asChild size="lg" variant="outline">
          <Link href="/ielts/vocabulary/foundation">{t('vocabFoundation.session.backHome')}</Link>
        </Button>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ session

export function MissionSession() {
  const { t } = useLocale();
  const { vf, update } = useVocabFoundation();
  const brain = useBrain();
  const today = localDateKey();
  const ready = vf?.session?.date === today;

  // Start (or keep) today's session; it lives in the profile so it survives refreshes.
  useEffect(() => {
    if (vf && !ready) update((v) => startSession(v));
  }, [vf, ready, update]);

  const session = ready ? vf!.session! : undefined;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const steps = useMemo<SessionStep[]>(() => (session ? sessionSteps(session) : []), [session?.words.join(), session?.index]);

  if (!session || brain.loading) return <ScreenSkeleton />;
  const index = Math.min(session.index, steps.length - 1);
  const step = steps[index];
  const next = () => {
    update((v) => moveSession(v, index + 1));
    window.scrollTo({ top: 0 });
  };
  const fw = step.phase !== 'done' ? getFoundationWord(step.wordId)! : undefined;
  const phaseLabel = t(`vocabFoundation.session.phase.${step.phase}`);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" aria-label={t('vocabFoundation.session.exit')}>
            <Link href="/ielts/vocabulary/foundation">
              <X />
            </Link>
          </Button>
          <p className="flex-1 text-sm font-medium">{phaseLabel}</p>
          <span className="text-xs text-muted-foreground tabular-nums">
            {Math.min(index + 1, steps.length - 1)}/{steps.length - 1}
          </span>
        </div>
        <ProgressBar value={(index / (steps.length - 1)) * 100} label={phaseLabel} size="sm" />
      </div>

      <div key={index} className="animate-in fade-in slide-in-from-right-4 duration-300">
        {step.phase === 'discover' && <DiscoverStep fw={fw!} onNext={next} />}
        {step.phase === 'recall' && <RecallStep fw={fw!} kind={step.kind} onNext={next} />}
        {step.phase === 'use' && <UseStep fw={fw!} onNext={next} />}
        {step.phase === 'done' && <DoneStep />}
      </div>
    </div>
  );
}
