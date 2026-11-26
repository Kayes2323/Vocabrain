'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Headphones, Pause, Play, RotateCcw, RotateCw, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/providers/LocaleProvider';
import { READ_SECONDS, type ObjectiveSection } from '@/lib/ielts';
import { cn } from '@/lib/utils';
import { formatClock } from './labels';
import { holdMinoCalm } from '@/lib/mino/living-bus';

/** True when every part has a narrated recording, which a student can wind back and skip through. */
export const canPractiseByPart = (section: ObjectiveSection) => section.parts.every((p) => p.audio?.src && p.audio.narrated);

/**
 * Listening in practice mode: your own pace. Play, pause, go back or forward ten
 * seconds, drag to any point, skip the reading time, and jump to any part.
 */
export function PracticeListeningPlayer({ section, onPartStart }: { section: ObjectiveSection; onPartStart: (part: number) => void }) {
  const { t } = useLocale();
  const [part, setPart] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [clock, setClock] = useState({ t: 0, d: 0 });
  const audio = useRef<HTMLAudioElement | null>(null);
  const onPartRef = useRef(onPartStart);
  onPartRef.current = onPartStart;

  const current = section.parts[part];
  const src = current.audio!.src!;
  const cues = useMemo(() => current.audio!.cues ?? [], [current]);

  // One audio element per part; switching part replaces it.
  useEffect(() => {
    const a = new Audio(src);
    audio.current = a;
    let calm: (() => void) | undefined; // Mino's decorative motion stays calm while this plays
    const hush = () => { calm ??= holdMinoCalm(); };
    const unhush = () => { calm?.(); calm = undefined; };
    setPlaying(false);
    setClock({ t: 0, d: 0 });
    a.onloadedmetadata = () => setClock((c) => ({ ...c, d: a.duration || 0 }));
    a.ontimeupdate = () => setClock({ t: a.currentTime, d: a.duration || 0 });
    a.onplay = () => { setPlaying(true); hush(); };
    a.onpause = () => { setPlaying(false); unhush(); };
    a.onended = () => { setPlaying(false); unhush(); };
    return () => {
      unhush();
      a.pause();
      a.onplay = a.onpause = a.onended = a.ontimeupdate = a.onloadedmetadata = null;
    };
  }, [src]);

  const choose = useCallback((n: number) => {
    setPart(n);
    onPartRef.current(n);
  }, []);

  // Show the first part's questions when the player opens.
  useEffect(() => {
    onPartRef.current(0);
  }, []);

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) void a.play().catch(() => undefined);
    else a.pause();
  };
  const seek = (to: number) => {
    const a = audio.current;
    if (!a) return;
    a.currentTime = Math.max(0, Math.min(a.duration || to, to));
    setClock((c) => ({ ...c, t: a.currentTime }));
  };

  const cue = [...cues].reverse().find((c) => c.at <= clock.t);
  const readLeft = cue?.kind === 'read' ? READ_SECONDS - (clock.t - cue.at) : 0;
  const nextListen = cues.find((c) => c.kind === 'listen' && c.at > clock.t);
  const finished = clock.d > 0 && clock.t >= clock.d - 0.3;
  let label = t('tests.listening.playing', { n: current.number });
  if (readLeft > 0) label = t('tests.listening.prep', { time: formatClock(Math.ceil(readLeft)) });
  else if (cue?.kind === 'check') label = t('tests.listening.check', { time: formatClock(Math.max(0, Math.ceil(clock.d - clock.t))) });
  if (finished) label = t('tests.practice.partEnded', { n: current.number });

  return (
    <div className="shrink-0 space-y-2 border-b bg-muted/40 px-3 py-2 sm:px-4" role="region" aria-label={t('tests.listening.player')} data-testid="practice-player">
      <div className="flex items-center gap-2">
        <Headphones className="size-5 shrink-0 text-muted-foreground" aria-hidden />
        <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto" role="tablist">
          {section.parts.map((p, i) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={i === part}
              data-testid={`practice-part-${p.number}`}
              onClick={() => choose(i)}
              className={cn('shrink-0 rounded-md px-3 py-1.5 text-sm font-medium', i === part ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground hover:bg-muted')}
            >
              {t('tests.partShort', { n: p.number })}
            </button>
          ))}
        </div>
        <p className="hidden text-sm font-medium sm:block" aria-live="polite">
          {label}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline" aria-label={t('tests.practice.back')} onClick={() => seek(clock.t - 10)}>
          <RotateCcw />
        </Button>
        <Button size="sm" onClick={toggle} data-testid="practice-toggle" className="min-w-24">
          {playing ? <Pause /> : <Play />} {playing ? t('tests.listening.pause') : t('tests.listening.play')}
        </Button>
        <Button size="icon" variant="outline" aria-label={t('tests.practice.forward')} onClick={() => seek(clock.t + 10)}>
          <RotateCw />
        </Button>
        <input
          type="range"
          min={0}
          max={Math.max(1, Math.floor(clock.d))}
          step={1}
          value={Math.floor(clock.t)}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label={t('tests.practice.seek')}
          className="h-2 min-w-0 flex-1 accent-[var(--brand)]"
        />
        <span className="w-24 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
          {formatClock(Math.floor(clock.t))} / {formatClock(Math.floor(clock.d))}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium sm:hidden" aria-live="polite">
          {label}
        </p>
        <div className="flex gap-2">
          {readLeft > 0 && nextListen && (
            <Button size="sm" variant="outline" data-testid="practice-skip-reading" onClick={() => seek(nextListen.at)}>
              <SkipForward /> {t('tests.practice.skipReading')}
            </Button>
          )}
          {finished && part < section.parts.length - 1 && (
            <Button size="sm" variant="brand" data-testid="practice-next-part" onClick={() => choose(part + 1)}>
              {t('tests.practice.nextPart', { n: section.parts[part + 1].number })}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
