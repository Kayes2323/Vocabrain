'use client';

import { useEffect, useState } from 'react';
import { PlayCircle, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { LessonAudioStatus } from './useLessonStepAudio';

/** True once, cheaply, without re-subscribing per render. */
function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  } catch {
    return false;
  }
}

/**
 * The narration controls for one slide: Audio ON/OFF (a device-local
 * preference, never part of the student's profile), Play/Pause, Replay, and
 * a quiet "Mino is speaking" indicator. Deliberately small — this sits
 * beside the Trainer Zone, not as a large player that competes with the
 * lesson itself.
 */
export function LessonAudioControls({
  status,
  audioOn,
  onToggleAudio,
  onPlay,
  onPause,
  onReplay,
}: {
  status: LessonAudioStatus;
  audioOn: boolean;
  onToggleAudio: (on: boolean) => void;
  onPlay: () => void;
  onPause: () => void;
  onReplay: () => void;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => setReducedMotion(prefersReducedMotion()), []);

  const hasAudio = status !== 'no-audio';

  return (
    <div className="flex items-center gap-1.5">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={audioOn ? 'Turn narration off' : 'Turn narration on'}
        aria-pressed={audioOn}
        title={audioOn ? 'Audio On — tap to mute Mino’s narration' : 'Audio Off — tap to hear Mino narrate this lesson'}
        onClick={() => onToggleAudio(!audioOn)}
        className="shrink-0"
      >
        {audioOn ? <Volume2 className="size-4" aria-hidden /> : <VolumeX className="size-4 text-muted-foreground" aria-hidden />}
      </Button>

      {hasAudio && audioOn && (
        <>
          {status === 'playing' && (
            <span className="flex items-center gap-1.5 rounded-full bg-brand-soft px-2 py-1 text-xs font-medium text-brand" role="status">
              <span className={reducedMotion ? 'size-1.5 rounded-full bg-brand' : 'size-1.5 rounded-full bg-brand animate-pulse'} aria-hidden />
              Mino is speaking
            </span>
          )}

          {status === 'blocked' && (
            <Button type="button" variant="brand" size="sm" onClick={onPlay} className="h-7 gap-1.5 px-2.5 text-xs">
              <PlayCircle className="size-3.5" aria-hidden /> Play audio
            </Button>
          )}

          {status === 'paused' && (
            <Button type="button" variant="outline" size="sm" onClick={onPlay} className="h-7 gap-1.5 px-2.5 text-xs">
              <PlayCircle className="size-3.5" aria-hidden /> Resume
            </Button>
          )}

          {status === 'playing' && (
            <button type="button" onClick={onPause} aria-label="Pause narration" title="Pause narration" className="text-xs font-medium text-muted-foreground hover:text-foreground">
              Pause
            </button>
          )}

          {(status === 'completed' || status === 'paused' || status === 'playing') && (
            <button type="button" onClick={onReplay} aria-label="Replay this slide's narration" title="Replay this slide's narration" className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
              <RotateCcw className="size-3.5" aria-hidden /> Replay
            </button>
          )}

          {status === 'error' && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground" role="status">
              Narration unavailable for this slide
              <button type="button" onClick={onReplay} className="font-medium text-brand hover:underline">
                Retry
              </button>
            </span>
          )}

          {status === 'loading' && <span className="text-xs text-muted-foreground">Loading narration…</span>}
        </>
      )}
    </div>
  );
}
