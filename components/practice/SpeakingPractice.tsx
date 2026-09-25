'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BrainCircuit, CheckCircle2, Mic, Square, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Callout, EmptyState, ScreenSkeleton } from '@/components/ds';
import { MinoSays } from '@/components/mino/MinoSays';
import { useBrain } from '@/components/providers/BrainProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { useLeave } from '@/components/setup/useLeave';
import { containsWord, markActivityDone, speakingPrompt } from '@/lib/engine';
import { cn } from '@/lib/utils';
import { PracticeShell } from './PracticeShell';
import { pickWord } from './pickWord';
import { useSpeechRecognition } from './useSpeechRecognition';

type Phase = 'answer' | 'confirm' | 'result';

export function SpeakingPractice() {
  const params = useSearchParams();
  const leave = useLeave('/');
  const { t } = useLocale();
  const brain = useBrain();
  const { updateProfile } = useProfile();
  const speech = useSpeechRecognition('en-US');
  const [done, setDone] = useState<string[]>([]);
  const [requested, setRequested] = useState<string | null>(params.get('word'));
  const [typing, setTyping] = useState(false);
  const [phase, setPhase] = useState<Phase>('answer');
  const [outcome, setOutcome] = useState<'used' | 'natural' | 'missing' | 'unnatural' | null>(null);

  if (brain.loading) return <ScreenSkeleton />;
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

  const prompt = speakingPrompt(word, done.length);
  const answer = speech.transcript;

  const submit = async () => {
    speech.stop();
    if (!containsWord(answer, word.lemma)) {
      setOutcome('missing');
      setPhase('result');
      await brain.recordUsage(word.id, { mode: 'speaking', text: answer, correct: false, feedback: ['practice.speaking.missing'] });
      updateProfile((p) => markActivityDone(p, 'speaking'));
      return;
    }
    setOutcome('used');
    setPhase('confirm');
  };

  const confirm = async (natural: boolean) => {
    setOutcome(natural ? 'natural' : 'unnatural');
    setPhase('result');
    await brain.recordUsage(word.id, {
      mode: 'speaking',
      text: answer,
      correct: natural,
      feedback: [natural ? 'practice.speaking.natural' : 'practice.speaking.unnatural'],
    });
    updateProfile((p) => markActivityDone(p, 'speaking'));
  };

  const reset = (nextWord: boolean) => {
    if (nextWord) {
      setDone((d) => [...d, word.id]);
      setRequested(null);
    }
    speech.setTranscript('');
    setPhase('answer');
    setOutcome(null);
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

          <Button size="lg" className="w-full" onClick={submit} disabled={answer.trim().length < 3}>
            {t('practice.checkAnswer')}
          </Button>
          {speech.supported && !typing && (
            <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => setTyping(true)}>
              {t('practice.typeInsteadButton')}
            </Button>
          )}
        </div>
      )}

      {phase === 'confirm' && (
        <div className="space-y-4">
          <p className="flex items-center gap-2 font-medium text-success">
            <CheckCircle2 className="size-5" /> {t('practice.speaking.usedIt', { word: word.word })}
          </p>
          <p className="rounded-xl bg-muted/70 px-4 py-3 text-[15px]" lang="en">
            {answer}
          </p>
          <p className="font-medium">{t('practice.speaking.naturalQuestion')}</p>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="lg" onClick={() => confirm(false)}>
              {t('practice.speaking.notReally')}
            </Button>
            <Button size="lg" onClick={() => confirm(true)}>
              {t('practice.speaking.yes')}
            </Button>
          </div>
        </div>
      )}

      {phase === 'result' && outcome && (
        <div className="space-y-4" aria-live="polite">
          {outcome === 'missing' && (
            <p className="flex items-center gap-2 font-medium text-destructive">
              <XCircle className="size-5" /> {t('practice.speaking.notUsed', { word: word.word })}
            </p>
          )}
          <MinoSays>{t(`practice.speaking.${outcome === 'missing' ? 'missing' : outcome}`, { word: word.word, collocation: word.collocations[0] ?? word.word })}</MinoSays>
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
