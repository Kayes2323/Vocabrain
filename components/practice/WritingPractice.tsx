'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { EmptyState, ScreenSkeleton } from '@/components/ds';
import { meanings } from '@/components/brain/meaning';
import { MinoSays } from '@/components/mino/MinoSays';
import { EvaluationView, MinoVerdictPanel } from '@/components/mino-eval/MinoVerdictPanel';
import { useMinoEvaluation } from '@/components/mino-eval/useMinoEvaluation';
import type { MinoEvaluation } from '@/lib/mino-eval/types';
import { useBrain } from '@/components/providers/BrainProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { useLeave } from '@/components/setup/useLeave';
import { checkSentence, hasUsableMeaning, markActivityDone, type UsageCheck } from '@/lib/engine';
import { MeaningEditor } from '@/components/brain/MeaningEditor';
import { useBrainGate } from '@/components/brain/BrainGate';
import { PracticeShell } from './PracticeShell';
import { pickWord } from './pickWord';

type CheckResult = { source: 'mino'; correct: boolean } | { source: 'fallback'; check: UsageCheck };

export function WritingPractice() {
  const params = useSearchParams();
  const leave = useLeave('/');
  const { t, locale } = useLocale();
  const brain = useBrain();
  const { updateProfile } = useProfile();
  const mino = useMinoEvaluation();
  const [minoEval, setMinoEval] = useState<MinoEvaluation | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [requested, setRequested] = useState<string | null>(params.get('word'));
  const [text, setText] = useState('');
  const [result, setResult] = useState<CheckResult | null>(null);

  const gate = useBrainGate();
  if (gate) return gate;
  const word = pickWord(brain.words, 'writing', requested, done);

  if (!word) {
    return (
      <PracticeShell title={t('practice.writingTitle')} onClose={() => leave()}>
        <EmptyState
          icon={BrainCircuit}
          title={t('brain.emptyTitle')}
          description={t('brain.emptyBody')}
          action={
            <Button asChild>
              <Link href="/ielts/reading">{t('brain.emptyCta')}</Link>
            </Button>
          }
        />
      </PracticeShell>
    );
  }

  if (!hasUsableMeaning(word)) {
    return (
      <PracticeShell title={t('practice.writingTitle')} onClose={() => leave()}>
        <MeaningEditor
          word={word}
          onSkip={() => {
            setDone((d) => [...d, word.id]);
            setRequested(null);
          }}
        />
      </PracticeShell>
    );
  }

  const { primary } = meanings(word, locale);

  const record = async (correct: boolean, feedback: string[] = []) => {
    await brain.recordUsage(word.id, { mode: 'writing', text, correct, feedback }).catch(() => undefined);
    updateProfile((p) => markActivityDone(p, 'writing'));
  };

  const applyEvaluation = (evaluation: MinoEvaluation) => {
    setMinoEval(evaluation);
    const correct = evaluation.verdict === 'correct';
    setResult({ source: 'mino', correct });
    void record(correct);
  };

  // Every sentence is evaluated by Mino for meaning, grammar and natural usage —
  // word-presence alone is never enough. On failure the panel below offers Retry
  // (the sentence is kept) or an explicit, labelled local check.
  const check = async () => {
    const evaluation = await mino.run({
      answerType: 'vocab_usage',
      language: locale === 'bn' ? 'bn' : 'en',
      question: `Write a sentence that uses the word "${word.word}" correctly.`,
      answer: text.trim(),
      vocab: {
        word: word.word,
        partOfSpeech: word.partOfSpeech,
        meaning: word.meaning || undefined,
        meaningBn: word.meaningBn || undefined,
        synonyms: word.synonyms.slice(0, 12),
        collocations: word.collocations.slice(0, 12),
      },
      learner: { lessonId: 'writing-practice', objective: 'Use a saved word naturally in an original sentence', recentMistakes: [] },
    });
    if (evaluation) applyEvaluation(evaluation);
  };

  const selfCheckInstead = () => {
    mino.reset();
    const r = checkSentence(word, text);
    setResult({ source: 'fallback', check: r });
    void record(r.correct, r.feedback);
  };

  const nextWord = () => {
    setDone((d) => [...d, word.id]);
    setRequested(null);
    setText('');
    setResult(null);
    setMinoEval(null);
    mino.reset();
  };

  return (
    <PracticeShell title={t('practice.writingTitle')} onClose={() => leave()}>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-balance">{t('practice.writePrompt', { word: word.word })}</h1>
        {primary && <p className="text-muted-foreground">{primary}</p>}
      </div>

      {word.collocations.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{t('practice.naturalPhrases')}</p>
          <div className="flex flex-wrap gap-2">
            {word.collocations.map((c) => (
              <span key={c} className="rounded-full border bg-card px-3 py-1 text-sm" lang="en">
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="sentence" className="sr-only">
          {t('practice.yourSentence')}
        </label>
        <Textarea
          id="sentence"
          rows={4}
          lang="en"
          spellCheck
          value={text}
          readOnly={result !== null}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('practice.sentencePlaceholder')}
          className="rounded-xl bg-card text-base"
        />
      </div>

      {result === null && (mino.state.status === 'evaluating' || mino.state.status === 'error') && (
        <div className="space-y-2">
          <MinoVerdictPanel state={mino.state} language={locale === 'bn' ? 'bn' : 'en'} onRetry={() => void mino.retry().then((ev) => ev && applyEvaluation(ev))} />
          {mino.state.status === 'error' && (
            <Button type="button" variant="ghost" size="sm" onClick={selfCheckInstead} data-testid="writing-practice-self-check">
              {locale === 'bn' ? 'নিজে মিলিয়ে দেখব (Mino যাচাই করেনি)' : 'Check it myself instead (not evaluated by Mino)'}
            </Button>
          )}
        </div>
      )}
      {result === null && mino.state.status !== 'evaluating' && mino.state.status !== 'error' ? (
        <Button size="lg" className="w-full" onClick={check} disabled={text.trim().length < 3}>
          {t('practice.checkSentence')}
        </Button>
      ) : result !== null ? (
        <div className="space-y-4" aria-live="polite">
          {result.source === 'mino' && minoEval ? (
            <div className="rounded-xl border bg-card p-4" data-testid="writing-practice-mino-evaluation">
              <EvaluationView evaluation={minoEval} language={locale === 'bn' ? 'bn' : 'en'} />
            </div>
          ) : result.source === 'fallback' ? (
            <>
              <MinoSays>
                {result.check.feedback
                  .map((key) => t(key, { word: word.word, collocation: result.check.collocation ?? '' }))
                  .join(' ')}
              </MinoSays>
              <p className="text-xs text-muted-foreground">{t('practice.quickCheckNote')}</p>
            </>
          ) : null}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setResult(null);
              }}
            >
              {t('practice.rewrite')}
            </Button>
            <Button size="lg" onClick={nextWord}>
              {t('practice.nextWord')}
            </Button>
          </div>
          <Button variant="ghost" className="w-full" onClick={() => leave()}>
            {t('practice.done')}
          </Button>
        </div>
      ) : null}
    </PracticeShell>
  );
}
