'use client';

import { useEffect, useRef, useState } from 'react';
import { AlertCircle, Loader2, Pause, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { AudioAsset } from '@/lib/listening';
import { holdMinoCalm } from '@/lib/mino/living-bus';

const SPEEDS = [0.75, 0.9, 1, 1.25] as const;

function formatClock(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * The one shared audio player every Listening module stage uses (brief §2):
 * play/pause, replay, speed, a seekable progress bar, explicit loading and
 * error states, and completion tracking via `onComplete`.
 *
 * Deliberately file-agnostic: it never assumes the asset exists. A 404 or a
 * network error surfaces as a real "audio not available yet" state instead
 * of a silent stall — the honest outcome while assets are still pending.
 */
export function AudioLessonPlayer({ asset, onComplete, className }: { asset: AudioAsset; onComplete?: () => void; className?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [playing, setPlaying] = useState(false);
  const [clock, setClock] = useState({ t: 0, d: 0 });
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);
  const completedRef = useRef(false);

  useEffect(() => {
    setState('loading');
    setPlaying(false);
    setClock({ t: 0, d: 0 });
    completedRef.current = false;
    const a = new Audio(asset.path);
    audioRef.current = a;
    let calm: (() => void) | undefined; // Mino's decorative motion stays calm while this plays
    const hush = () => { calm ??= holdMinoCalm(); };
    const unhush = () => { calm?.(); calm = undefined; };
    a.preload = 'metadata';
    a.onloadedmetadata = () => {
      setState('ready');
      setClock((c) => ({ ...c, d: a.duration || 0 }));
    };
    a.onerror = () => setState('error');
    a.ontimeupdate = () => setClock({ t: a.currentTime, d: a.duration || 0 });
    a.onplay = () => { setPlaying(true); hush(); };
    a.onpause = () => { setPlaying(false); unhush(); };
    a.onended = () => {
      setPlaying(false);
      unhush();
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
    };
    return () => {
      unhush();
      a.pause();
      a.src = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asset.path]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a || state !== 'ready') return;
    if (a.paused) void a.play().catch(() => setState('error'));
    else a.pause();
  };
  const replay = () => {
    const a = audioRef.current;
    if (!a || state !== 'ready') return;
    a.currentTime = 0;
    void a.play().catch(() => setState('error'));
  };
  const seek = (fraction: number) => {
    const a = audioRef.current;
    if (!a || state !== 'ready' || !clock.d) return;
    a.currentTime = fraction * clock.d;
  };

  if (state === 'error') {
    return (
      <div className={cn('flex items-center gap-3 rounded-xl border border-dashed p-4 text-sm text-muted-foreground', className)} role="alert">
        <AlertCircle className="size-5 shrink-0 text-muted-foreground" aria-hidden />
        <div>
          <p className="font-medium text-foreground">Audio not available yet</p>
          <p className="mt-0.5">This clip (asset {asset.assetId}) has not been delivered to the app yet.</p>
        </div>
      </div>
    );
  }

  const progress = clock.d > 0 ? clock.t / clock.d : 0;

  return (
    <div className={cn('rounded-xl border bg-card p-4', className)}>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          size="icon"
          variant="brand"
          className="size-11 shrink-0 rounded-full"
          onClick={toggle}
          disabled={state === 'loading'}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {state === 'loading' ? <Loader2 className="size-5 animate-spin" aria-hidden /> : playing ? <Pause className="size-5" aria-hidden /> : <Play className="size-5" aria-hidden />}
        </Button>
        <button
          type="button"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            seek((e.clientX - rect.left) / rect.width);
          }}
          className="relative h-10 flex-1 touch-manipulation"
          aria-label="Seek"
          disabled={state !== 'ready'}
        >
          <span className="absolute inset-y-[18px] left-0 right-0 block h-1.5 overflow-hidden rounded-full bg-muted">
            <span className="block h-full rounded-full bg-brand transition-[width]" style={{ width: `${Math.round(progress * 100)}%` }} />
          </span>
        </button>
        <Button type="button" size="icon" variant="ghost" className="size-9 shrink-0" onClick={replay} disabled={state !== 'ready'} aria-label="Replay from start">
          <RotateCcw className="size-4" aria-hidden />
        </Button>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground tabular-nums">
        <span>
          {formatClock(clock.t)} / {formatClock(clock.d)}
        </span>
        <div className="flex items-center gap-1" role="group" aria-label="Playback speed">
          {SPEEDS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSpeed(s)}
              className={cn('rounded-md px-1.5 py-0.5 text-xs font-medium', speed === s ? 'bg-brand-soft text-brand' : 'text-muted-foreground hover:bg-muted')}
              aria-pressed={speed === s}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
