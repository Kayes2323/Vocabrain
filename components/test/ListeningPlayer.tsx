'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Headphones, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { ObjectiveSection, ScriptLine } from '@/lib/ielts';
import { readJSON, writeJSON } from '@/lib/services/local-store';
import { cn } from '@/lib/utils';
import { formatClock } from './labels';

/** Seconds to read the questions before each part, and to check answers after it. */
const PREP_SECONDS = 20;
const CHECK_SECONDS = 10;
const RATE = 0.95;

type Voice = Pick<ScriptLine, 'voice' | 'accent'> & { speaker: string };
type Step =
  | { kind: 'say'; part: number; text: string; voice: Voice }
  | { kind: 'wait'; part: number; seconds: number; reason: 'prep' | 'check' }
  | { kind: 'audio'; part: number; src: string };

const NARRATOR: Voice = { speaker: 'narrator', voice: 'female', accent: 'en-GB' };

/** Short sentences keep browser speech reliable (long utterances can stop early). */
const sentences = (text: string) => (text.match(/[^.!?…]+(?:[.!?…]+["”’)]*|$)/g) ?? []).map((s) => s.trim()).filter(Boolean);

function buildSteps(section: ObjectiveSection): Step[] {
  const steps: Step[] = [];
  section.parts.forEach((p, part) => {
    const audio = p.audio;
    for (const s of sentences(audio?.intro || `Part ${p.number}.`)) steps.push({ kind: 'say', part, text: s, voice: NARRATOR });
    steps.push({ kind: 'wait', part, seconds: PREP_SECONDS, reason: 'prep' });
    if (audio?.src) steps.push({ kind: 'audio', part, src: audio.src });
    else for (const line of audio?.script ?? []) for (const s of sentences(line.text)) steps.push({ kind: 'say', part, text: s, voice: line });
    if (part < section.parts.length - 1) steps.push({ kind: 'wait', part, seconds: CHECK_SECONDS, reason: 'check' });
    else steps.push({ kind: 'say', part, text: 'That is the end of the listening test. You now have some time to check your answers.', voice: NARRATOR });
  });
  return steps;
}

const FEMALE = /female|woman|samantha|karen|moira|tessa|serena|kate|susan|libby|sonia|natasha|aria|jenny|zira|hazel|fiona|victoria|allison|ava|joanna|emma|amy|olivia|catherine|matilda|nicky|martha|emily|heera|neerja/i;
const MALE = /\bmale\b|daniel|arthur|oliver|george|ryan|william|guy|david|mark|alex|fred|thomas|james|lee|gordon|aaron|rishi|reed|brian|russell|william|prabhat/i;

/** Picks a browser voice for a speaker: matching accent and gender when available; pitch tells speakers apart. */
function voiceFor(voices: SpeechSynthesisVoice[], v: Voice, speakers: string[]) {
  const lang = (x: SpeechSynthesisVoice) => x.lang.replace('_', '-');
  const english = voices.filter((x) => lang(x).startsWith('en'));
  const accent = english.filter((x) => lang(x) === (v.accent ?? 'en-GB'));
  const pool = accent.length ? accent : english;
  const isFemale = (x: SpeechSynthesisVoice) => FEMALE.test(x.name);
  const isMale = (x: SpeechSynthesisVoice) => !isFemale(x) && MALE.test(x.name);
  const gendered = pool.filter(v.voice === 'female' ? isFemale : isMale);
  const same = gendered.length ? gendered : pool;
  const index = Math.max(0, speakers.indexOf(v.speaker));
  const voice = same.length ? same[index % same.length] : undefined;
  // Without a matching voice, pitch carries gender; each speaker gets a slight shift.
  const base = gendered.length ? 1 : v.voice === 'female' ? 1.15 : 0.8;
  return { voice, pitch: base + ((index % 3) - 1) * 0.06 };
}

type Saved = { step: number; offset?: number };
type Status = 'ready' | 'playing' | 'paused' | 'done' | 'unsupported';

/**
 * Plays a Listening section once, like the computer-delivered test: part intro,
 * time to read the questions, the recording (or the script read aloud by the
 * browser), then time to check. Position is saved, so a refresh continues from
 * the same sentence instead of replaying.
 */
export function ListeningPlayer({
  sessionId,
  section,
  onPartStart,
}: {
  sessionId: string;
  section: ObjectiveSection;
  /** Called when the audio moves on to a new part (0-based), to show its questions. */
  onPartStart: (part: number) => void;
}) {
  const { t } = useLocale();
  const steps = useMemo(() => buildSteps(section), [section]);
  const speakers = useMemo(() => [...new Set(section.parts.flatMap((p) => p.audio?.script?.map((l) => l.speaker) ?? []))], [section]);
  const key = `vb-listen:${sessionId}`;
  const saved = useRef<Saved>(readJSON<Saved>(key) ?? { step: 0 });
  const [step, setStep] = useState(saved.current.step);
  const [status, setStatus] = useState<Status>(saved.current.step >= steps.length ? 'done' : 'ready');
  const [waitLeft, setWaitLeft] = useState(0);
  const run = useRef(0);
  const audioEl = useRef<HTMLAudioElement | null>(null);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const voices = useRef<SpeechSynthesisVoice[]>([]);
  const lastPart = useRef(steps[Math.min(saved.current.step, steps.length - 1)]?.part ?? 0);
  const onPartRef = useRef(onPartStart);
  onPartRef.current = onPartStart;

  const needsSpeech = steps.some((s) => s.kind === 'say');
  useEffect(() => {
    if (!needsSpeech) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setStatus('unsupported');
      return;
    }
    const load = () => (voices.current = window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load);
  }, [needsSpeech]);

  const persist = useCallback((s: Saved) => {
    saved.current = s;
    writeJSON(key, s);
  }, [key]);

  const play = useCallback(
    (s: Step, id: number) =>
      new Promise<void>((resolve) => {
        if (s.kind === 'say') {
          const u = new SpeechSynthesisUtterance(s.text);
          const { voice, pitch } = voiceFor(voices.current, s.voice, speakers);
          if (voice) u.voice = voice;
          u.lang = voice?.lang ?? s.voice.accent ?? 'en-GB';
          u.pitch = pitch;
          u.rate = RATE;
          // Some browsers occasionally never fire `end`: move on after a generous limit.
          const guard = window.setTimeout(resolve, 4000 + s.text.length * 150);
          u.onend = u.onerror = () => {
            window.clearTimeout(guard);
            resolve();
          };
          utterance.current = u;
          window.speechSynthesis.speak(u);
        } else if (s.kind === 'wait') {
          let left = s.seconds;
          setWaitLeft(left);
          const timer = window.setInterval(() => {
            left -= 1;
            setWaitLeft(left);
            if (left <= 0 || run.current !== id) {
              window.clearInterval(timer);
              resolve();
            }
          }, 1000);
        } else {
          const a = new Audio(s.src);
          audioEl.current = a;
          a.currentTime = saved.current.offset ?? 0;
          a.ontimeupdate = () => persist({ step: saved.current.step, offset: a.currentTime });
          a.onended = a.onerror = () => resolve();
          a.onpause = () => run.current !== id && resolve();
          void a.play().catch(() => resolve());
        }
      }),
    [speakers, persist],
  );

  const runFrom = useCallback(
    async (from: number) => {
      const id = ++run.current;
      setStatus('playing');
      for (let i = from; i < steps.length; i++) {
        if (run.current !== id) return;
        const s = steps[i];
        if (i !== saved.current.step) persist({ step: i });
        setStep(i);
        if (s.part !== lastPart.current || i === 0) {
          lastPart.current = s.part;
          onPartRef.current(s.part);
        }
        await play(s, id);
        if (run.current !== id) return;
      }
      persist({ step: steps.length });
      setStep(steps.length);
      setStatus('done');
    },
    [steps, play, persist],
  );

  const stop = useCallback(() => {
    run.current++;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    audioEl.current?.pause();
  }, []);

  const pause = useCallback(() => {
    stop();
    setStatus('paused');
  }, [stop]);

  // Pause with the timer when the page is hidden, and stop speaking when leaving.
  useEffect(() => {
    const onHide = () => document.visibilityState === 'hidden' && status === 'playing' && pause();
    document.addEventListener('visibilitychange', onHide);
    return () => document.removeEventListener('visibilitychange', onHide);
  }, [status, pause]);
  useEffect(() => stop, [stop]);

  const current = steps[Math.min(step, steps.length - 1)];
  const partNumber = section.parts[current?.part ?? 0]?.number ?? 1;
  const progress = Math.round((Math.min(step, steps.length) / steps.length) * 100);

  let label: string;
  if (status === 'unsupported') label = t('tests.listening.unsupported');
  else if (status === 'done') label = t('tests.listening.done');
  else if (status === 'ready') label = step === 0 ? t('tests.listening.ready') : t('tests.listening.resumeHint');
  else if (status === 'paused') label = t('tests.listening.paused');
  else if (current?.kind === 'wait')
    label = t(current.reason === 'prep' ? 'tests.listening.prep' : 'tests.listening.check', { time: formatClock(Math.max(0, waitLeft)) });
  else label = t('tests.listening.playing', { n: partNumber });

  return (
    <div className="flex shrink-0 items-center gap-3 border-b bg-muted/40 px-3 py-2 sm:px-4" role="region" aria-label={t('tests.listening.player')}>
      <Headphones className="size-5 shrink-0 text-muted-foreground" aria-hidden />
      <div className="min-w-0 flex-1 space-y-1">
        <p className="line-clamp-2 text-sm leading-snug font-medium" aria-live="polite">
          {label}
        </p>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden>
          <div className={cn('h-full rounded-full bg-primary transition-[width]', status === 'done' && 'bg-emerald-500')} style={{ width: `${progress}%` }} />
        </div>
      </div>
      {status === 'playing' && (
        <Button size="sm" variant="outline" onClick={pause}>
          <Pause /> <span className="hidden sm:inline">{t('tests.listening.pause')}</span>
        </Button>
      )}
      {(status === 'ready' || status === 'paused') && (
        <Button size="sm" onClick={() => void runFrom(saved.current.step)}>
          <Play /> {step === 0 && status === 'ready' ? t('tests.listening.play') : t('tests.listening.resume')}
        </Button>
      )}
    </div>
  );
}
