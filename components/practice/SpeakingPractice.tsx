'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BrainCircuit, CheckCircle2, Mic, Square, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Callout, EmptyState, ScreenSkeleton } from '@/components/ds';
import { MinoSays } from '@/components/mino/MinoSays';
import { EvaluationView, MinoVerdictPanel } from '@/components/mino-eval/MinoVerdictPanel';
import { useMinoEvaluation } from '@/components/mino-eval/useMinoEvaluation';
import type { MinoEvaluation } from '@/lib/mino-eval/types';
import { useBrain } from '@/components/providers/BrainProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { useLeave } from '@/components/setup/useLeave';
import { containsWord, hasUsableMeaning, markActivityDone, speakingPrompt } from '@/lib/engine';
import { MeaningEditor } from '@/components/brain/MeaningEditor';
import { useBrainGate } from '@/components/brain/BrainGate';
import { cn } from '@/lib/utils';
import { PracticeShell } from './PracticeShell';
import { pickWord } from './pickWord';
import { useSpeechRecognition } from './useSpeechRecognition';

type Phase = 'answer' | 'selfcheck' | 'result';
type Outcome = { kind: 'missing' } | { kind: 'mino'; correct: boolean } | { kind: 'fallback'; correct: boolean };

export function SpeakingPractice() {
  const params = useSearchParams();
  const leave = useLeave('/');
  const { t, locale } = useLocale();
  const brain = useBrain();
  const { updateProfile } = useProfile();
  const speech = useSpeechRecognition('en-US');
  const mino = useMinoEvaluation();
  const [minoEval, setMinoEval] = useState<MinoEvaluation | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [requested, setRequested] = useState<string | null>(params.get('word'));
  const [typing, setTyping] = useState(false);
  const [phase, setPhase] = useState<Phase>('answer');
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const gate = useBrainGate();
  if (gate) return gate;
  const word = pickWord(brain.words, 'speaking', requested, done);

  if (!word) {
    return (
      <PracticeShell title={t('practice.speakingTitle')} onClose={() => leave()}>
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
      <PracticeShell title={t('practice.speakingTitle')} onClose={() => leave()}>
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

  const prompt = speakingPrompt(word, done.length);
  const answer = speech.transcript;

  const record = async (correct: boolean, feedback: string[] = []) => {
    await brain.recordUsage(word.id, { mode: 'speaking', text: answer, correct, feedback }).catch(() => undefined);
    updateProfile((p) => markActivityDone(p, 'speaking'));
  };

  const applyEvaluation = (evaluation: MinoEvaluation) => {
    setMinoEval(evaluation);
    const correct = evaluation.verdict === 'correct';
    setOutcome({ kind: 'mino', correct });
    setPhase('result');
    void record(correct);
  };

  // The word's literal presence in the transcript is an instant, objective check.
  // Whether it was used CORRECTLY (meaning, grammar) is judged by Mino from the
  // transcript — never a self-report, and pronunciation is never inferred from text
  // (see the speaking_usage rubric). On failure the panel below offers Retry or an
  // explicit, labelled local check.
  const submit = async () => {
    speech.stop();
    if (!containsWord(answer, word.lemma)) {
      setOutcome({ kind: 'missing' });
      setPhase('result');
      void record(false, ['practice.speaking.missing']);
      return;
    }
    const evaluation = await mino.run({
      answerType: 'speaking_usage',
      language: locale === 'bn' ? 'bn' : 'en',
      question: t(prompt.key, prompt.vars),
      answer: answer.trim(),
      vocab: {
        word: word.word,
        partOfSpeech: word.partOfSpeech,
        meaning: word.meaning || undefined,
        meaningBn: word.meaningBn || undefined,
        synonyms: word.synonyms.slice(0, 12),
        collocations: word.collocations.slice(0, 12),
      },
      learner: { lessonId: 'speaking-practice', objective: 'Use a saved word correctly while speaking', recentMistakes: [] },
    });
    if (evaluation) applyEvaluation(evaluation);
  };

  const selfCheckInstead = () => {
    mino.reset();
    setPhase('selfcheck');
  };

  const confirmSelfCheck = (natural: boolean) => {
    setOutcome({ kind: 'fallback', correct: natural });
    setPhase('result');
    void record(natural, [natural ? 'practice.speaking.natural' : 'practice.speaking.unnatural']);
  };

  const reset = (nextWord: boolean) => {
    if (nextWord) {
      setDone((d) => [...d, word.id]);
      setRequested(null);
    }
    speech.setTranscript('');
    setPhase('answer');
    setOutcome(null);
    setMinoEval(null);
    mino.reset();
  };

  return (
    <PracticeShell title={t('practice.speakingTitle')} onClose={() => leave()}>
      <div className="space-y-3">
        <p className="text-sm font-medium text-brand">Speaking Part 1 · {t('practice.targetWord', { word: word.word })}</p>
        <h1 className="text-2xl font-semibold text-balance" lang="en">
          {t(prompt.key, prompt.vars)}
        </h1>
        <p className="text-sm text-muted-foreground">{t('practice.speakHint', { word: word.word })}</p>
      </div>

      {phase === 'answer' && (
        <div className="space-y-4">
          {speech.supported && !typing ? (
            <div className="flex flex-col items-center gap-3 py-2">
              <button
                type="button"
                onClick={speech.listening ? speech.stop : speech.start}
                aria-pressed={speech.listening}
                aria-label={speech.listening ? t('practice.stop') : t('practice.record')}
                className={cn(
                  'flex size-20 items-center justify-center rounded-full text-white shadow-md transition-transform active:scale-95',
                  speech.listening ? 'animate-pulse bg-destructive' : 'bg-brand',
                )}
              >
                {speech.listening ? <Square className="size-7" /> : <Mic className="size-8" />}
              </button>
              <p className="text-sm text-muted-foreground">{speech.listening ? t('practice.listening') : t('practice.tapToSpeak')}</p>
            </div>
          ) : (
            <Callout>{speech.supported ? t('practice.typeInstead') : t('practice.noMic')}</Callout>
          )}

          {speech.error && <Callout tone="warning">{t(speech.error === 'permission' ? 'practice.micPermission' : 'practice.micFailed')}</Callout>}

          {(typing || !speech.supported || answer) && (
            <Textarea
              rows={4}
              lang="en"
              value={answer}
              onChange={(e) => speech.setTranscript(e.target.value)}
              placeholder={t('practice.transcriptPlaceholder')}
              aria-label={t('practice.yourAnswer')}
              className="rounded-xl bg-card text-base"
            />
          )}

          {(mino.state.status === 'evaluating' || mino.state.status === 'error') && (
            <div className="space-y-2">
              <MinoVerdictPanel state={mino.state} language={locale === 'bn' ? 'bn' : 'en'} onRetry={() => void mino.retry().then((ev) => ev && applyEvaluation(ev))} />
              {mino.state.status === 'error' && (
                <Button type="button" variant="ghost" size="sm" onClick={selfCheckInstead} data-testid="speaking-practice-self-check">
                  {locale === 'bn' ? 'নিজে মিলিয়ে দেখব (Mino যাচাই করেনি)' : 'Check it myself instead (not evaluated by Mino)'}
                </Button>
              )}
            </div>
          )}

          <Button size="lg" className="w-full" onClick={submit} disabled={answer.trim().length < 3 || mino.busy}>
            {t('practice.checkAnswer')}
          </Button>
          {speech.supported && !typing && (
            <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => setTyping(true)}>
              {t('practice.typeInsteadButton')}
            </Button>
          )}
        </div>
      )}

      {phase === 'selfcheck' && (
        <div className="space-y-4">
          <p className="flex items-center gap-2 font-medium text-success">
            <CheckCircle2 className="size-5" /> {t('practice.speaking.usedIt', { word: word.word })}
          </p>
          <p className="rounded-xl bg-muted/70 px-4 py-3 text-[15px]" lang="en">
            {answer}
          </p>
          <p className="text-xs text-muted-foreground">{locale === 'bn' ? 'Mino যাচাই করতে পারেনি — এটি নিজে মিলিয়ে দেখা, মূল্যায়ন নয়।' : 'Mino could not evaluate this — this is your own check, not a Mino evaluation.'}</p>
          <p className="font-medium">{t('practice.speaking.naturalQuestion')}</p>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="lg" onClick={() => confirmSelfCheck(false)}>
              {t('practice.speaking.notReally')}
            </Button>
            <Button size="lg" onClick={() => confirmSelfCheck(true)}>
              {t('practice.speaking.yes')}
            </Button>
          </div>
        </div>
      )}

      {phase === 'result' && outcome && (
        <div className="space-y-4" aria-live="polite">
          {outcome.kind === 'missing' && (
            <p className="flex items-center gap-2 font-medium text-destructive">
              <XCircle className="size-5" /> {t('practice.speaking.notUsed', { word: word.word })}
            </p>
          )}
          {outcome.kind === 'mino' && minoEval ? (
            <div className="rounded-xl border bg-card p-4" data-testid="speaking-practice-mino-evaluation">
              <EvaluationView evaluation={minoEval} language={locale === 'bn' ? 'bn' : 'en'} />
            </div>
          ) : (
            <MinoSays>
              {t(`practice.speaking.${outcome.kind === 'missing' ? 'missing' : outcome.correct ? 'natural' : 'unnatural'}`, {
                word: word.word,
                collocation: word.collocations[0] ?? word.word,
              })}
            </MinoSays>
          )}
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="lg" onClick={() => reset(false)}>
              {t('practice.tryAgain')}
            </Button>
            <Button size="lg" onClick={() => reset(true)}>
              {t('practice.nextWord')}
            </Button>
          </div>
          <Button variant="ghost" className="w-full" onClick={() => leave()}>
            {t('practice.done')}
          </Button>
        </div>
      )}
    </PracticeShell>
  );
}
