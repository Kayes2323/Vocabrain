'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Captions, CaptionsOff, Check, Mic, MicOff, Pencil, Volume2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Callout, Panel, ProgressBar } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { isMobileDevice, useSpeechRecognition, type SpeechError } from '@/components/practice/useSpeechRecognition';
import {
  answerStatus,
  countSpokenWords,
  examinerLines,
  examinerScript,
  goTo,
  isSpeechLevel,
  nextNoiseFloor,
  RESUME_LINE,
  setResponse,
  SPEAKING_MIN_WORDS,
  submit,
  type ExaminerTurn,
  type PracticeTest,
  type SpeakingSection,
  type TestSession,
} from '@/lib/ielts';
import { cn } from '@/lib/utils';
import { openMic, preloadClips, sayLine, sleep, stopSpeaking, unlockAudio, voicesReady, type Mic as MicHandle } from './examinerVoice';
import { formatClock } from './labels';

type Stage = 'check' | 'running' | 'trouble';
type Who = 'examiner' | 'you' | 'prep' | 'idle';
type Check = 'idle' | 'listening' | 'ok' | 'failed';
/** Why the test stopped or the check failed; each has its own advice. */
type Trouble = SpeechError | 'silent' | 'unheard';

/** Reading time after the examiner finishes, before the microphone opens. */
const BEAT_MS = 700;
/** Speech-to-text delivers its last words a moment after it is told to stop. */
const TRAILING_MS = 600;
/** Words that show the check was heard. */
const CHECK_WORDS = 3;
/** How long the check waits to be heard before it says so. */
const CHECK_MS = 12_000;
/** After this long with nothing heard, the screen says so while the answer is still open. */
const HINT_MS = 6000;
/** Answers in a row with nothing heard before the test pauses instead of carrying on without the student. */
const MAX_MISSES = 2;

/**
 * Speaking test, the way the real one runs: the examiner asks aloud, the
 * microphone opens by itself, the answer ends when the student stops talking,
 * and the next question follows. There are no buttons between questions.
 *
 * What the student says is only ever read by the browser's speech-to-text, so
 * the test proves that works before it starts, shows what it hears, and stops
 * to say so if it stops working, instead of finishing a test nobody heard.
 */
export function ExaminerSpeaking({
  test,
  session,
  setSession,
  save,
  saveFinal,
  clipFor,
  onUseTyping,
}: {
  test: PracticeTest;
  session: TestSession;
  setSession: React.Dispatch<React.SetStateAction<TestSession | null>>;
  save: (s: TestSession) => Promise<void>;
  saveFinal: (s: TestSession) => Promise<void>;
  /** The recorded clip for a line in the voice the student chose (none: the browser voice reads it). */
  clipFor: (line: string) => string | undefined;
  /** Carry on with the tap-and-type version, keeping the answers so far. */
  onUseTyping: () => void;
}) {
  const { t } = useLocale();
  const router = useRouter();
  const script = useMemo(() => examinerScript(test.sections.speaking as SpeakingSection), [test]);
  const speech = useSpeechRecognition('en-US', { keepAlive: true });
  const { start: speechStart, stop: speechStop } = speech;

  const [stage, setStage] = useState<Stage>('check');
  const [check, setCheck] = useState<Check>('idle');
  const [trouble, setTrouble] = useState<Trouble>('silent');
  const [hasMeter, setHasMeter] = useState(false);
  const [level, setLevel] = useState(0);
  const [who, setWho] = useState<Who>('idle');
  const [caption, setCaption] = useState('');
  const [captions, setCaptions] = useState(false);
  const [hearing, setHearing] = useState('');
  const [hint, setHint] = useState(false);
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
  const speechError = useRef<SpeechError | null>(null);
  speechError.current = speech.error;
  const latest = useRef(session);
  latest.current = session;

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      stopSpeaking();
      speechStop();
      mic.current?.close();
      mic.current = null;
    };
    // `speech.stop` is stable; this only runs on mount and unmount.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    void save(session);
  }, [session.responses, session.currentNumber]); // eslint-disable-line react-hooks/exhaustive-deps

  // Download the chosen voice's clips while the student checks their microphone.
  useEffect(() => {
    const paths = examinerLines(script).map(clipFor).filter((p): p is string => Boolean(p));
    void preloadClips(paths);
  }, [script, clipFor]);

  // A loudness meter helps end answers sooner and shows the mic is live, but only where a second
  // capture is safe. Phones give one microphone to one user at a time: opening it here could
  // silence the speech-to-text, which is the part that matters. There, speech-to-text runs alone.
  useEffect(() => {
    if (isMobileDevice()) return;
    let cancelled = false;
    openMic()
      .then((m) => {
        if (cancelled || !alive.current) return m.close();
        mic.current = m;
        setHasMeter(true);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  /** Starts the check. Runs inside the student's tap, which phones require before they will listen. */
  const startCheck = () => {
    unlockAudio();
    setCheck('listening');
    speechStart();
  };

  // The check passes only when speech-to-text itself returns words.
  useEffect(() => {
    if (stage !== 'check' || check !== 'listening') return;
    const t0 = performance.now();
    const id = window.setInterval(() => {
      const rms = mic.current?.level() ?? 0;
      setLevel(rms);
      if (!isSpeechLevel(rms, floor.current)) floor.current = nextNoiseFloor(floor.current, rms);
      if (countSpokenWords(transcript.current) >= CHECK_WORDS) {
        speechStop();
        setCheck('ok');
      } else if (speechError.current) {
        speechStop();
        setTrouble(speechError.current);
        setCheck('failed');
      } else if (performance.now() - t0 > CHECK_MS) {
        speechStop();
        setTrouble('silent');
        setCheck('failed');
      }
    }, 150);
    return () => window.clearInterval(id);
  }, [stage, check, speechStop]);

  /** The student's turn: open the speech-to-text, end the answer when the rules say so. */
  const listen = useCallback(
    (turn: ExaminerTurn) =>
      new Promise<{ text: string; seconds: number; failure?: SpeechError }>((resolve) => {
        transcript.current = '';
        speechStart();
        setWho('you');
        setCaption('');
        setHearing('');
        setHint(false);
        const t0 = performance.now();
        let lastActive = t0;
        let firstSpeech = 0;
        let spoke = false;
        let loud = 0;
        let seen = '';

        const id = window.setInterval(() => {
          if (!alive.current) {
            window.clearInterval(id);
            speechStop();
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
          if (text !== seen) setHearing(text);
          if (loud >= 2 || (text && text !== seen)) {
            if (!spoke) firstSpeech = now;
            spoke = true;
            lastActive = now;
          }
          seen = text;
          setHint(!text && now - t0 > HINT_MS);

          // The speech service says it cannot work: no point waiting out the answer.
          const failure = speechError.current && speechError.current !== 'failed' ? speechError.current : undefined;
          const status = failure ? 'no-speech' : answerStatus({ part: turn.part, limitSeconds: turn.limitSeconds, elapsedMs: now - t0, spoke, silenceMs: now - lastActive });
          if (status === 'continue') return;
          window.clearInterval(id);
          speechStop();
          const seconds = spoke ? Math.max(1, Math.round((lastActive - firstSpeech) / 1000)) : 0;
          window.setTimeout(() => resolve({ text: transcript.current.trim(), seconds, failure }), TRAILING_MS);
        }, 200);
      }),
    [speechStart, speechStop],
  );

  const begin = useCallback(async () => {
    if (started.current) return;
    started.current = true;
    unlockAudio();
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
        await sayLine(line, () => !alive.current, clipFor(line));
        await sleep(250);
      }
      return alive.current;
    };

    /** Stops the test where it is and explains why, with the way back to the first unheard question. */
    const pause = (reason: Trouble, rewindTo: number) => {
      working = goTo(working, rewindTo + 1);
      setSession(working);
      setWho('idle');
      setHint(false);
      setTrouble(reason);
      started.current = false;
      setCheck('idle');
      setStage('trouble');
    };

    if (!(await say(startAt > 0 ? [RESUME_LINE] : script.opening))) return;

    let misses = 0;
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

      // A blocked or missing microphone cannot be waited out.
      if (answer.failure) return pause(answer.failure, i);

      working = goTo(setResponse(working, turn.key, answer.text, answer.seconds), Math.min(i + 2, turns.length));
      setSession(working);
      setWho('idle');
      setCaption('');
      setHearing('');
      setHint(false);

      // Two answers in a row with nothing heard: stop now, not twenty minutes later.
      misses = answer.text ? 0 : misses + 1;
      if (misses >= MAX_MISSES) return pause('silent', i - misses + 1);
      await sleep(BEAT_MS);
    }

    if (!(await say(script.closing))) return;
    mic.current?.close();
    mic.current = null;

    // Too little to assess: do not hand the student an empty result; let them put it right.
    if (countSpokenWords(Object.values(working.responses ?? {}).join(' ')) < SPEAKING_MIN_WORDS) return pause('unheard', 0);

    const done = submit(working, test);
    await saveFinal(done).catch((e) => console.error('[tests] Save failed', e));
    setSession(done);
  }, [script, listen, setSession, saveFinal, test, clipFor]);

  const leave = () => {
    stopSpeaking();
    router.push('/ielts/tests');
  };

  const turn = script.turns[turnIndex];
  const progress = (turnIndex / script.turns.length) * 100;

  if (stage === 'trouble') {
    return (
      <Shell onLeave={leave} title={t('skills.speaking')} progress={progress}>
        <Panel className="w-full space-y-4 text-center" data-testid="examiner-trouble" data-reason={trouble}>
          <MicOff className="mx-auto size-8 text-muted-foreground" aria-hidden />
          <h1 className="text-xl font-semibold">{t(trouble === 'unheard' ? 'tests.speaking.examiner.unheardTitle' : 'tests.speaking.examiner.pausedTitle')}</h1>
          <p className="text-sm text-muted-foreground">{t(trouble === 'unheard' ? 'tests.speaking.examiner.unheardBody' : 'tests.speaking.examiner.pausedBody')}</p>
          <p className="rounded-xl bg-muted/50 px-3 py-2 text-left text-sm">{t(`tests.speaking.examiner.advice.${trouble === 'unheard' ? 'silent' : trouble}`)}</p>
          <div className="flex flex-col gap-2">
            <Button onClick={() => setStage('check')} data-testid="examiner-recheck">
              {t('tests.speaking.examiner.recheck')}
            </Button>
            <Button variant="outline" onClick={onUseTyping} data-testid="examiner-type">
              {t('tests.speaking.examiner.typeInstead')}
            </Button>
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
        <div className="w-full space-y-6 text-center" data-testid="examiner-check" data-check={check}>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">{t('tests.speaking.examiner.checkTitle')}</h1>
            <p className="text-sm text-muted-foreground">{t('tests.speaking.examiner.checkBody')}</p>
          </div>

          <Panel className="space-y-3">
            {hasMeter && check === 'listening' && <LevelBars level={level} />}
            {check === 'idle' && (
              <Button size="lg" className="w-full" onClick={startCheck} data-testid="examiner-test-mic">
                <Mic /> {t('tests.speaking.examiner.testMic')}
              </Button>
            )}
            {check === 'listening' && (
              <div className="space-y-2" data-testid="examiner-heard">
                <p className="text-sm font-medium">{t('tests.speaking.examiner.sayThis')}</p>
                <p className="min-h-10 rounded-xl bg-muted/50 px-3 py-2 text-sm" lang="en" aria-live="polite">
                  {speech.transcript ? t('tests.speaking.examiner.heardText', { text: speech.transcript }) : t('tests.speaking.examiner.listeningNow')}
                </p>
              </div>
            )}
            {check === 'ok' && (
              <p className="flex items-center justify-center gap-1.5 text-sm font-medium text-success" data-testid="examiner-heard-ok">
                <Check className="size-4" aria-hidden /> {t('tests.speaking.examiner.checkOk')}
              </p>
            )}
            {check === 'failed' && (
              <div className="space-y-3 text-left" data-testid="examiner-check-failed" data-reason={trouble}>
                <Callout tone="warning">{t(`tests.speaking.examiner.advice.${trouble === 'unheard' ? 'silent' : trouble}`)}</Callout>
                <Button className="w-full" onClick={startCheck} data-testid="examiner-test-again">
                  {t('tests.tryAgain')}
                </Button>
              </div>
            )}
          </Panel>

          {check === 'ok' && (
            <>
              <ul className="space-y-1.5 text-left text-sm text-muted-foreground">
                <li>{t('tests.speaking.examiner.rule1')}</li>
                <li>{t('tests.speaking.examiner.rule2')}</li>
                <li>{t('tests.speaking.examiner.rule3')}</li>
              </ul>
              <Button size="lg" className="w-full" onClick={() => void begin()} data-testid="examiner-begin">
                {t('tests.speaking.examiner.begin')}
              </Button>
            </>
          )}

          <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={onUseTyping} data-testid="examiner-type">
            {t('tests.speaking.examiner.typeInstead')}
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

        {who === 'you' && (
          <div className="w-full space-y-2" data-testid="examiner-hearing">
            {hearing ? (
              <p className="rounded-xl bg-muted/50 px-4 py-3 text-center text-sm text-muted-foreground" lang="en">
                <span className="mb-0.5 block text-xs font-medium uppercase">{t('tests.speaking.examiner.hearingLabel')}</span>
                {hearing.length > 160 ? `…${hearing.slice(-160)}` : hearing}
              </p>
            ) : (
              hint && (
                <div data-testid="examiner-hint">
                  <Callout tone="warning">{t('tests.speaking.examiner.hint')}</Callout>
                </div>
              )
            )}
          </div>
        )}

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
        className={cn('absolute inset-0 rounded-full transition-transform duration-150', listening ? 'bg-destructive/15 motion-safe:animate-pulse' : who === 'examiner' ? 'bg-brand-soft motion-safe:animate-pulse' : 'bg-muted')}
        style={{ transform: `scale(${scale})` }}
      />
      <span className={cn('relative flex size-24 items-center justify-center rounded-full', listening ? 'bg-destructive text-white' : who === 'examiner' ? 'bg-brand text-brand-foreground' : 'bg-card text-muted-foreground shadow-sm')}>
        {listening ? <Mic className="size-9" /> : <Volume2 className="size-9" />}
      </span>
    </div>
  );
}

function LevelBars({ level }: { level: number }) {
  const lit = Math.min(12, Math.round(level * 60));
  return (
    <div className="flex h-10 items-end justify-center gap-1" aria-hidden data-testid="examiner-level">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} className={cn('w-2 rounded-full transition-colors', i < lit ? 'bg-success' : 'bg-muted')} style={{ height: `${30 + i * 6}%` }} />
      ))}
    </div>
  );
}
