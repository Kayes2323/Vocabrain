'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, Square, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Callout, Panel, ProgressBar, ScreenSkeleton } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useSpeechRecognition } from '@/components/practice/useSpeechRecognition';
import { goTo, setResponse, submit, type PracticeTest, type ProductiveFeedback, type SpeakingSection, type TestSession } from '@/lib/ielts';
import { cn } from '@/lib/utils';
import { FeedbackView, useAssessment } from './FeedbackView';
import { formatClock } from './labels';
import { TestIntro } from './TestIntro';
import { useTestSession } from './useTestSession';

interface Step {
  key: string;
  part: 1 | 2 | 3;
  topic: string;
  question: string;
  cueCard?: { task: string; points: string[]; closing?: string };
  prepSeconds: number;
  limitSeconds: number;
}

/** Longest answer allowed per part before recording stops by itself. */
const LIMITS = { 1: 60, 2: 120, 3: 90 } as const;

function stepsFor(section: SpeakingSection): Step[] {
  return section.parts.flatMap((p): Step[] =>
    p.cueCard
      ? [{ key: `${p.id}-0`, part: p.part, topic: p.topic, question: p.cueCard.task, cueCard: p.cueCard, prepSeconds: p.prepSeconds ?? 60, limitSeconds: p.speakSeconds ?? LIMITS[2] }]
      : p.questions.map((q, i) => ({ key: `${p.id}-${i}`, part: p.part, topic: p.topic, question: q, prepSeconds: 0, limitSeconds: LIMITS[p.part] })),
  );
}

export function SpeakingRunner({ test }: { test: PracticeTest }) {
  const section = test.sections.speaking as SpeakingSection;
  const steps = useMemo(() => stepsFor(section), [section]);
  const { t } = useLocale();
  const { session, setSession, resumable, start, retry, save, saveFinal } = useTestSession(test, 'speaking');
  const onFeedback = useCallback((feedback: ProductiveFeedback) => setSession((s) => (s ? { ...s, feedback } : s)), [setSession]);
  const { state, retry: retryAssessment } = useAssessment(session, onFeedback);

  if (!session) {
    if (resumable === undefined) return <ScreenSkeleton />;
    return (
      <TestIntro
        test={test}
        skill="speaking"
        stats={[
          [t('tests.speaking.parts'), String(section.parts.length)],
          [t('tests.speaking.questions'), String(steps.length)],
          [t('tests.speaking.length'), t('common.minutes', { n: 11 })],
        ]}
        bullets={[t('tests.speaking.introFlow'), t('tests.speaking.introPrivacy')]}
        resumable={resumable}
        onStart={start}
      />
    );
  }

  if (session.status === 'submitted') {
    return <FeedbackView test={test} session={session} state={state} onRetryAssessment={retryAssessment} onRetryTest={retry} />;
  }

  return <ActiveSpeaking test={test} steps={steps} session={session} setSession={setSession} save={save} saveFinal={saveFinal} />;
}

type Phase = 'ready' | 'prep' | 'recording' | 'review';

function ActiveSpeaking({
  test,
  steps,
  session,
  setSession,
  save,
  saveFinal,
}: {
  test: PracticeTest;
  steps: Step[];
  session: TestSession;
  setSession: React.Dispatch<React.SetStateAction<TestSession | null>>;
  save: (s: TestSession) => Promise<void>;
  saveFinal: (s: TestSession) => Promise<void>;
}) {
  const { t } = useLocale();
  const router = useRouter();
  const index = Math.min(Math.max(session.currentNumber - 1, 0), steps.length - 1);
  const step = steps[index];
  const saved = session.responses?.[step.key];
  const [phase, setPhaseState] = useState<Phase>(saved !== undefined ? 'review' : 'ready');
  const [seconds, setSeconds] = useState(0);
  // Reset the clock together with the phase so a new phase never sees the old time.
  const setPhase = useCallback((p: Phase) => {
    setSeconds(0);
    setPhaseState(p);
  }, []);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [micError, setMicError] = useState(false);
  const [notes, setNotes] = useState('');
  const speech = useSpeechRecognition('en-US', { keepAlive: true });
  const recorder = useRef<MediaRecorder | null>(null);
  const startedAt = useRef(0);
  const latest = useRef(session);
  latest.current = session;

  useEffect(() => {
    void save(session);
  }, [session.responses, session.currentNumber]); // eslint-disable-line react-hooks/exhaustive-deps

  // Timers: preparation counts down; recording counts up to the part's limit.
  useEffect(() => {
    if (phase !== 'prep' && phase !== 'recording') return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  const beginRecording = useCallback(async () => {
    setPhase('recording');
    startedAt.current = Date.now();
    if (speech.supported) speech.start();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      rec.ondataavailable = (e) => chunks.push(e.data);
      rec.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        setAudioUrl(URL.createObjectURL(new Blob(chunks, { type: rec.mimeType })));
      };
      rec.start();
      recorder.current = rec;
    } catch {
      setMicError(true);
    }
  }, [speech, setPhase]);

  const stopRecording = useCallback(() => {
    speech.stop();
    if (recorder.current?.state === 'recording') recorder.current.stop();
    recorder.current = null;
    const spoken = Math.round((Date.now() - startedAt.current) / 1000);
    setSession((s) => (s ? setResponse(s, step.key, s.responses?.[step.key] ?? '', spoken) : s));
    setPhase('review');
  }, [speech, setSession, step.key, setPhase]);

  useEffect(() => {
    if (phase === 'prep' && seconds >= step.prepSeconds) void beginRecording();
    if (phase === 'recording' && seconds >= step.limitSeconds) stopRecording();
  }, [phase, seconds, step, beginRecording, stopRecording]);

  // Speech-to-text fills the transcript while recording; the student may correct it afterwards.
  useEffect(() => {
    if (phase === 'recording' && speech.transcript) setSession((s) => (s ? setResponse(s, step.key, speech.transcript) : s));
  }, [speech.transcript, phase, setSession, step.key]);

  const nextStep = async () => {
    if (index < steps.length - 1) {
      setSession((s) => (s ? goTo(s, index + 2) : s));
      setPhase('ready');
      setAudioUrl(null);
      setNotes('');
      return;
    }
    const done = submit(latest.current, test);
    await saveFinal(done).catch((e) => console.error('[tests] Save failed', e));
    setSession(done);
  };

  const transcript = session.responses?.[step.key] ?? '';
  const canType = !speech.supported || micError;

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-background">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-2 sm:px-4">
        <Button variant="ghost" size="icon" aria-label={t('tests.exit')} onClick={() => router.push('/ielts/tests')}>
          <X />
        </Button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            {t('skills.speaking')} · {t('tests.speaking.partN', { n: step.part })}
          </p>
          <p className="truncate text-xs text-muted-foreground">{t('tests.speaking.questionOf', { n: index + 1, total: steps.length })}</p>
        </div>
      </header>
      <ProgressBar value={((index + (phase === 'review' ? 1 : 0)) / steps.length) * 100} label={t('tests.speaking.questionOf', { n: index + 1, total: steps.length })} size="sm" className="rounded-none" />

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-xl space-y-6 px-4 py-8">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {t('tests.speaking.partN', { n: step.part })} · {step.topic}
          </p>
          {step.cueCard ? (
            <Panel className="space-y-2" lang="en">
              <p className="text-xs font-semibold text-muted-foreground uppercase">{t('tests.speaking.cueCard')}</p>
              <p className="text-lg font-semibold">{step.cueCard.task}</p>
              <p className="text-sm">You should say:</p>
              <ul className="list-disc space-y-0.5 pl-5 text-sm">
                {step.cueCard.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {step.cueCard.closing && <p className="text-sm">{step.cueCard.closing}</p>}
            </Panel>
          ) : (
            <h1 className="text-2xl font-semibold text-balance" lang="en">
              {step.question}
            </h1>
          )}

          {phase === 'ready' && (
            <Button size="lg" className="w-full" onClick={() => (step.prepSeconds ? setPhase('prep') : void beginRecording())}>
              <Mic /> {step.prepSeconds ? t('tests.speaking.prep', { time: formatClock(step.prepSeconds) }) : t('tests.speaking.startAnswer')}
            </Button>
          )}

          {phase === 'prep' && (
            <div className="space-y-3">
              <p className="text-center text-3xl font-semibold tabular-nums" role="timer">
                {formatClock(step.prepSeconds - seconds)}
              </p>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t('tests.speaking.notes')} rows={4} lang="en" />
              <Button size="lg" className="w-full" onClick={() => void beginRecording()}>
                <Mic /> {t('tests.speaking.startSpeaking')}
              </Button>
            </div>
          )}

          {phase === 'recording' && (
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-destructive">
                <span className="size-2.5 animate-pulse rounded-full bg-destructive" /> {t('tests.speaking.recording')}
              </div>
              <p className="text-3xl font-semibold tabular-nums" role="timer">
                {formatClock(seconds)} <span className="text-base text-muted-foreground">/ {formatClock(step.limitSeconds)}</span>
              </p>
              {transcript && (
                <p className="rounded-xl bg-muted/50 p-3 text-left text-sm" lang="en">
                  {transcript}
                </p>
              )}
              <Button size="lg" variant="outline" className="w-full" onClick={stopRecording}>
                <Square /> {t('tests.speaking.stop')}
              </Button>
            </div>
          )}

          {phase === 'review' && (
            <div className="space-y-4">
              {audioUrl && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{t('tests.speaking.playback')}</p>
                  <audio controls src={audioUrl} className="w-full" />
                </div>
              )}
              {(micError || !speech.supported) && <Callout tone="warning">{micError ? t('tests.speaking.micDenied') : t('tests.speaking.noSpeech')}</Callout>}
              <label className="block space-y-1.5">
                <span className="text-sm font-medium">{canType && !transcript ? t('tests.speaking.typeInstead') : t('tests.speaking.transcript')}</span>
                <Textarea
                  value={transcript}
                  onChange={(e) => setSession((s) => (s ? setResponse(s, step.key, e.target.value) : s))}
                  rows={5}
                  lang="en"
                  spellCheck={false}
                />
              </label>
              <div className={cn('flex gap-2')}>
                <Button variant="outline" onClick={() => setPhase('ready')}>
                  <Mic /> {t('tests.tryAgain')}
                </Button>
                <Button className="flex-1" onClick={() => void nextStep()}>
                  {index < steps.length - 1 ? t('tests.speaking.next') : t('tests.speaking.finish')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
