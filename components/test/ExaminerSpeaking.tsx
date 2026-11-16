'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Captions, CaptionsOff, Check, Mic, MicOff, Pencil, Volume2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Callout, Panel, ProgressBar } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useSpeechRecognition } from '@/components/practice/useSpeechRecognition';
import {
  answerStatus,
  examinerScript,
  goTo,
  isSpeechLevel,
  nextNoiseFloor,
  setResponse,
  submit,
  type ExaminerTurn,
  type PracticeTest,
  type SpeakingSection,
  type TestSession,
} from '@/lib/ielts';
import { cn } from '@/lib/utils';
import { openMic, sayLine, sleep, stopSpeaking, voicesReady, type Mic as MicHandle } from './examinerVoice';
import { formatClock } from './labels';

type Stage = 'check' | 'running' | 'unheard';
type Who = 'examiner' | 'you' | 'prep' | 'idle';

/** Reading time after the examiner finishes, before the microphone opens. */
const BEAT_MS = 700;
/** Speech-to-text delivers its last words a moment after it is told to stop. */
const TRAILING_MS = 600;
const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

/**
 * Speaking test, the way the real one runs: the examiner asks aloud, the
 * microphone opens by itself, the answer ends when the student stops talking,
 * and the next question follows. There are no buttons between questions.
 */
export function ExaminerSpeaking({
  test,
  session,
  setSession,
  save,
  saveFinal,
  onRestart,
}: {
  test: PracticeTest;
  session: TestSession;
  setSession: React.Dispatch<React.SetStateAction<TestSession | null>>;
  save: (s: TestSession) => Promise<void>;
  saveFinal: (s: TestSession) => Promise<void>;
  onRestart: () => void;
}) {
  const { t } = useLocale();
  const router = useRouter();
  const script = useMemo(() => examinerScript(test.sections.speaking as SpeakingSection), [test]);
  const speech = useSpeechRecognition('en-US', { keepAlive: true });

  const [stage, setStage] = useState<Stage>('check');
  const [micState, setMicState] = useState<'opening' | 'ready' | 'blocked'>('opening');
  const [heard, setHeard] = useState(false);
  const [level, setLevel] = useState(0);
  const [who, setWho] = useState<Who>('idle');
  const [caption, setCaption] = useState('');
  const [captions, setCaptions] = useState(false);
  const [turnIndex, setTurnIndex] = useState(() => Math.min(Math.max(session.currentNumber - 1, 0), script.turns.length - 1));
  const [cardVisible, setCardVisible] = useState(false);
  const [prepLeft, setPrepLeft] = useState(0);
  const [notes, setNotes] = useState('');

  const alive = useRef(true);
  const started = useRef(false);
  const mic = useRef<MicHandle | null>(null);
  const floor = useRef(0.01);
  const transcript = useRef('');
  transcript.current = speech.transcript;
  const latest = useRef(session);
  latest.current = session;

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      stopSpeaking();
      speech.stop();
      mic.current?.close();
      mic.current = null;
    };
    // `speech.stop` is stable; this only runs on mount and unmount.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    void save(session);
  }, [session.responses, session.currentNumber]); // eslint-disable-line react-hooks/exhaustive-deps

  // Microphone check: ask for access up front and let the student see it hear them.
  useEffect(() => {
    let cancelled = false;
    openMic()
      .then((m) => {
        if (cancelled || !alive.current) return m.close();
        mic.current = m;
        setMicState('ready');
      })
      .catch(() => !cancelled && setMicState('blocked'));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (stage !== 'check' || micState !== 'ready') return;
    const id = window.setInterval(() => {
      const rms = mic.current?.level() ?? 0;
      setLevel(rms);
      if (isSpeechLevel(rms, floor.current)) setHeard(true);
      else floor.current = nextNoiseFloor(floor.current, rms);
    }, 100);
    return () => window.clearInterval(id);
  }, [stage, micState]);

  /** The student's turn: open the speech-to-text, end the answer when the rules say so. */
  const listen = useCallback(
    (turn: ExaminerTurn) =>
      new Promise<{ text: string; seconds: number }>((resolve) => {
        transcript.current = '';
        speech.start();
        setWho('you');
        setCaption('');
        const t0 = performance.now();
        let lastActive = t0;
        let firstSpeech = 0;
        let spoke = false;
        let loud = 0;
        let seen = '';

        const id = window.setInterval(() => {
          if (!alive.current) {
            window.clearInterval(id);
            speech.stop();
            return resolve({ text: '', seconds: 0 });
          }
          const now = performance.now();
          const rms = mic.current?.level() ?? 0;
          setLevel(rms);
          // Two loud frames in a row count as a voice; a single click or knock does not.
          if (isSpeechLevel(rms, floor.current)) loud++;
          else {
            loud = 0;
            floor.current = nextNoiseFloor(floor.current, rms);
          }
          const text = transcript.current;
          if (loud >= 2 || (text && text !== seen)) {
            if (!spoke) firstSpeech = now;
            spoke = true;
            lastActive = now;
          }
          seen = text;

          const status = answerStatus({ part: turn.part, limitSeconds: turn.limitSeconds, elapsedMs: now - t0, spoke, silenceMs: now - lastActive });
          if (status === 'continue') return;
          window.clearInterval(id);
          speech.stop();
          const seconds = spoke ? Math.max(1, Math.round((lastActive - firstSpeech) / 1000)) : 0;
          window.setTimeout(() => resolve({ text: transcript.current.trim(), seconds }), TRAILING_MS);
        }, 200);
      }),
    [speech],
  );

  const begin = useCallback(async () => {
    if (started.current) return;
    started.current = true;
    await voicesReady();
    if (!alive.current) return;
    setStage('running');

    const { turns } = script;
    const startAt = Math.min(Math.max(latest.current.currentNumber - 1, 0), turns.length - 1);
    let working = latest.current;

    const say = async (lines: string[], onLine?: (line: string) => void) => {
      for (const line of lines) {
        if (!alive.current) return false;
        onLine?.(line);
        setWho('examiner');
        setCaption(line);
        await sayLine(line, () => !alive.current);
        await sleep(250);
      }
      return alive.current;
    };

    if (!(await say(startAt > 0 ? ["Let's carry on."] : script.opening))) return;

    for (let i = startAt; i < turns.length; i++) {
      const turn = turns[i];
      setTurnIndex(i);
      setCardVisible(false);
      setNotes('');
      const cardLine = turn.cueCard ? turn.lead[turn.lead.length - 1] : undefined;
      if (!(await say(turn.lead, (line) => line === cardLine && setCardVisible(true)))) return;

      if (turn.cueCard) {
        setWho('prep');
        setCaption('');
        for (let left = turn.prepSeconds; left > 0; left--) {
          if (!alive.current) return;
          setPrepLeft(left);
          await sleep(1000);
        }
        if (!(await say(turn.afterPrep))) return;
      }

      await sleep(BEAT_MS);
      if (!alive.current) return;
      const answer = await listen(turn);
      if (!alive.current) return;

      working = goTo(setResponse(working, turn.key, answer.text, answer.seconds), Math.min(i + 2, turns.length));
      setSession(working);
      setWho('idle');
      setCaption('');
      await sleep(BEAT_MS);
    }

    if (!(await say(script.closing))) return;
    mic.current?.close();
    mic.current = null;

    // Nothing was picked up: there is nothing to assess, so do not submit an empty attempt.
    if (wordCount(Object.values(working.responses ?? {}).join(' ')) < 8) return setStage('unheard');

    const done = submit(working, test);
    await saveFinal(done).catch((e) => console.error('[tests] Save failed', e));
    setSession(done);
  }, [script, listen, setSession, saveFinal, test]);

  const leave = () => {
    stopSpeaking();
    router.push('/ielts/tests');
  };

  const turn = script.turns[turnIndex];
  const progress = (turnIndex / script.turns.length) * 100;

  if (stage === 'unheard') {
    return (
      <Shell onLeave={leave} title={t('skills.speaking')} progress={100}>
        <Panel className="w-full space-y-4 text-center" data-testid="examiner-unheard">
          <MicOff className="mx-auto size-8 text-muted-foreground" aria-hidden />
          <h1 className="text-xl font-semibold">{t('tests.speaking.examiner.unheardTitle')}</h1>
          <p className="text-sm text-muted-foreground">{t('tests.speaking.examiner.unheardBody')}</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button onClick={onRestart}>{t('tests.tryAgain')}</Button>
            <Button variant="ghost" onClick={leave}>
              {t('tests.exit')}
            </Button>
          </div>
        </Panel>
      </Shell>
    );
  }

  if (stage === 'check') {
    return (
      <Shell onLeave={leave} title={t('skills.speaking')} progress={0}>
        <div className="w-full space-y-6 text-center" data-testid="examiner-check">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">{t('tests.speaking.examiner.checkTitle')}</h1>
            <p className="text-sm text-muted-foreground">{t('tests.speaking.examiner.checkBody')}</p>
          </div>

          {micState === 'blocked' ? (
            <Callout tone="warning">{t('tests.speaking.micDenied')}</Callout>
          ) : (
            <Panel className="space-y-3">
              <LevelBars level={level} active={micState === 'ready'} />
              <p className={cn('flex items-center justify-center gap-1.5 text-sm', heard ? 'font-medium text-success' : 'text-muted-foreground')} data-testid="examiner-heard">
                {heard ? <Check className="size-4" aria-hidden /> : <Mic className="size-4" aria-hidden />}
                {heard ? t('tests.speaking.examiner.checkHeard') : t('tests.speaking.examiner.checkSay')}
              </p>
            </Panel>
          )}

          <ul className="space-y-1.5 text-left text-sm text-muted-foreground">
            <li>{t('tests.speaking.examiner.rule1')}</li>
            <li>{t('tests.speaking.examiner.rule2')}</li>
            <li>{t('tests.speaking.examiner.rule3')}</li>
          </ul>

          <Button size="lg" className="w-full" disabled={micState !== 'ready'} onClick={() => void begin()} data-testid="examiner-begin">
            {t('tests.speaking.examiner.begin')}
          </Button>
        </div>
      </Shell>
    );
  }

  const status: Record<Who, string> = {
    examiner: t('tests.speaking.examiner.speaking'),
    you: t('tests.speaking.examiner.yourTurn'),
    prep: t('tests.speaking.examiner.preparing'),
    idle: '',
  };

  return (
    <Shell
      onLeave={leave}
      title={`${t('skills.speaking')} · ${t('tests.speaking.partN', { n: turn.part })}`}
      progress={progress}
      right={
        <Button variant="ghost" size="icon" aria-pressed={captions} aria-label={captions ? t('tests.speaking.examiner.captionsOff') : t('tests.speaking.examiner.captionsOn')} onClick={() => setCaptions((c) => !c)}>
          {captions ? <Captions /> : <CaptionsOff />}
        </Button>
      }
    >
      <div className="flex w-full flex-col items-center gap-6" data-testid="examiner-live" data-who={who} data-turn={turn.key}>
        <Avatar who={who} level={level} />
        <p className="min-h-6 text-sm font-medium text-muted-foreground" role="status" aria-live="polite" data-testid="examiner-status">
          {who === 'prep' ? `${status.prep} · ${formatClock(prepLeft)}` : status[who]}
        </p>

        {captions && caption && (
          <p className="rounded-xl bg-muted/50 px-4 py-3 text-center text-[15px]" lang="en" data-testid="examiner-caption">
            {caption}
          </p>
        )}

        {turn.cueCard && cardVisible && (
          <Panel className="w-full space-y-2" lang="en" data-testid="examiner-cue">
            <p className="text-xs font-semibold text-muted-foreground uppercase">{t('tests.speaking.cueCard')}</p>
            <p className="text-lg font-semibold">{turn.cueCard.task}</p>
            <p className="text-sm">You should say:</p>
            <ul className="list-disc space-y-0.5 pl-5 text-sm">
              {turn.cueCard.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            {turn.cueCard.closing && <p className="text-sm">{turn.cueCard.closing}</p>}
          </Panel>
        )}

        {turn.cueCard && who === 'prep' && (
          <label className="block w-full space-y-1.5">
            <span className="flex items-center gap-1.5 text-sm font-medium">
              <Pencil className="size-4" aria-hidden /> {t('tests.speaking.notes')}
            </span>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} lang="en" />
          </label>
        )}
      </div>
    </Shell>
  );
}

function Shell({ children, onLeave, title, progress, right }: { children: React.ReactNode; onLeave: () => void; title: string; progress: number; right?: React.ReactNode }) {
  const { t } = useLocale();
  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-background">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-2 sm:px-4">
        <Button variant="ghost" size="icon" aria-label={t('tests.exit')} onClick={onLeave}>
          <X />
        </Button>
        <p className="min-w-0 flex-1 truncate text-sm font-semibold">{title}</p>
        {right}
      </header>
      <ProgressBar value={progress} label={title} size="sm" className="rounded-none" />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-10">{children}</div>
      </div>
    </div>
  );
}

/** The examiner: calm while speaking, listening (and moving with the student's voice) on their turn. */
function Avatar({ who, level }: { who: Who; level: number }) {
  const listening = who === 'you';
  const scale = listening ? 1 + Math.min(level * 5, 0.45) : 1;
  return (
    <div className="relative flex size-36 items-center justify-center" aria-hidden>
      <span
        className={cn('absolute inset-0 rounded-full transition-transform duration-150', listening ? 'bg-destructive/15' : who === 'examiner' ? 'bg-brand-soft motion-safe:animate-pulse' : 'bg-muted')}
        style={{ transform: `scale(${scale})` }}
      />
      <span className={cn('relative flex size-24 items-center justify-center rounded-full', listening ? 'bg-destructive text-white' : who === 'examiner' ? 'bg-brand text-brand-foreground' : 'bg-card text-muted-foreground shadow-sm')}>
        {listening ? <Mic className="size-9" /> : <Volume2 className="size-9" />}
      </span>
    </div>
  );
}

function LevelBars({ level, active }: { level: number; active: boolean }) {
  const lit = active ? Math.min(12, Math.round(level * 60)) : 0;
  return (
    <div className="flex h-10 items-end justify-center gap-1" aria-hidden data-testid="examiner-level">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} className={cn('w-2 rounded-full transition-colors', i < lit ? 'bg-success' : 'bg-muted')} style={{ height: `${30 + i * 6}%` }} />
      ))}
    </div>
  );
}
