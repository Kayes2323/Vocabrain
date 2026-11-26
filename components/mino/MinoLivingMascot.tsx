'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { MinoCoachMascot } from './MinoCoachMascot';
import type { MinoCoachPose } from '@/lib/mino/coach';
import { useMinoContextBusy } from '@/lib/mino/living-bus';
import {
  clampDwell,
  LIVING_BEATS,
  LIVING_BETWEEN_DWELL_MS,
  LIVING_FIRST_DWELL_MS,
  livingBeatMs,
  livingRigAllowed,
  livingRotationAllowed,
  nextBeatIndex,
} from '@/lib/mino/living';

/** Test/review override of the idle dwell (ms, 0–600000), same convention as the install-prompt delay. */
export const LIVING_DWELL_KEY = 'mino.livingDwellMs';

function readDwellOverride(): number | null {
  try {
    const raw = localStorage.getItem(LIVING_DWELL_KEY);
    return raw === null ? null : clampDwell(raw, -1) >= 0 ? clampDwell(raw, -1) : null;
  } catch {
    return null;
  }
}

/**
 * Motion preferences, live. Until they have been read on the client the answer is "unknown": no rig is mounted and
 * nothing moves, so a student who asked for reduced motion / data saver never downloads the rig "just for a moment"
 * (and the server and first client render agree: poster only).
 */
interface MotionPrefs { known: boolean; reducedMotion: boolean; saveData: boolean }
function useMotionPrefs(): MotionPrefs {
  const [prefs, setPrefs] = useState<MotionPrefs>({ known: false, reducedMotion: false, saveData: false });
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string; addEventListener?: (t: string, f: () => void) => void; removeEventListener?: (t: string, f: () => void) => void } }).connection;
    const sync = () => setPrefs({ known: true, reducedMotion: Boolean(mq?.matches), saveData: Boolean(c?.saveData) || c?.effectiveType === 'slow-2g' || c?.effectiveType === '2g' });
    sync();
    mq?.addEventListener?.('change', sync);
    c?.addEventListener?.('change', sync);
    return () => {
      mq?.removeEventListener?.('change', sync);
      c?.removeEventListener?.('change', sync);
    };
  }, []);
  return prefs;
}

/** true once preferences are known AND motion is welcome. false under reduced motion / data saver (static poster of the same artwork, no rig download) and before they are known. */
export function useMinoRigAllowed(): boolean {
  const p = useMotionPrefs();
  return p.known && livingRigAllowed(p);
}

/** True while the box is on screen (display:none and scrolled-away both count as off-screen) and the tab is visible. */
function useOnScreen(ref: React.RefObject<HTMLElement | null>): { onScreen: boolean; tabVisible: boolean } {
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    let io: IntersectionObserver | null = null;
    if (el && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver((entries) => setOnScreen(entries[entries.length - 1]?.isIntersecting ?? true));
      io.observe(el);
    }
    const vis = () => setTabVisible(!document.hidden);
    vis();
    document.addEventListener('visibilitychange', vis);
    return () => {
      io?.disconnect();
      document.removeEventListener('visibilitychange', vis);
    };
  }, [ref]);
  return { onScreen, tabVisible };
}

/** Wait for the page to be idle (never block first paint / hydration), at most `maxMs`. Returns a cancel function. */
function whenIdle(run: () => void, maxMs: number): () => void {
  const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
  if (w.requestIdleCallback) {
    const id = w.requestIdleCallback(run, { timeout: maxMs });
    return () => w.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(run, Math.min(maxMs, 1200));
  return () => window.clearTimeout(id);
}

/**
 * Mino as a living companion in a compact, decorative placement (the central navigation button).
 *
 * It reuses the ONE shared character: MinoCoachMascot → MinoCoachRig → MinoRigController. This component only decides
 * which existing state to request and when (rules in lib/mino/living.ts):
 *  - at rest Mino breathes and blinks (the rig's own idle);
 *  - now and then it plays one beat: greeting → thinking → writing → explaining → encouraging → success, one per
 *    long idle, deterministic, always returning to idle;
 *  - a teaching / reacting Mino elsewhere on screen, playing audio or speech, reduced motion, data saver, a hidden tab
 *    or an off-screen button all stop the rotation (and it resumes calmly afterwards);
 *  - the 21-layer rig is only downloaded once the page is idle (and never under reduced motion / data saver, where the
 *    static poster of the same artwork is the mascot). One timer, cleaned up on unmount.
 */
export function MinoLivingMascot({ px, className, style }: { px: number; className?: string; style?: React.CSSProperties }) {
  const box = useRef<HTMLSpanElement>(null);
  const prefs = useMotionPrefs();
  const { reducedMotion, saveData } = prefs;
  const contextBusy = useMinoContextBusy();
  const { onScreen, tabVisible } = useOnScreen(box);
  const [live, setLive] = useState(false);
  const [pose, setPose] = useState<MinoCoachPose>('idle');
  const beat = useRef(0);

  const rigOk = prefs.known && livingRigAllowed({ reducedMotion, saveData });
  // Download the rig once the page is idle (and only while it is visible and motion is welcome).
  useEffect(() => {
    if (!rigOk || live) return;
    return whenIdle(() => {
      if (!document.hidden) setLive(true);
    }, 3000);
  }, [rigOk, live]);

  const rotate = live && livingRotationAllowed({ reducedMotion, saveData, tabVisible, onScreen, contextBusy });
  useEffect(() => {
    if (!rotate) {
      setPose('idle');
      return;
    }
    const override = readDwellOverride();
    const first = override ?? LIVING_FIRST_DWELL_MS;
    const between = override ?? LIVING_BETWEEN_DWELL_MS;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const rest = (ms: number) => {
      timer = setTimeout(() => {
        const b = LIVING_BEATS[beat.current];
        setPose(b);
        timer = setTimeout(() => {
          setPose('idle');
          beat.current = nextBeatIndex(beat.current);
          rest(between);
        }, livingBeatMs(b));
      }, ms);
    };
    rest(first);
    return () => clearTimeout(timer); // paused, hidden, busy or unmounted: nothing keeps running
  }, [rotate]);

  return (
    <span ref={box} className={cn('relative inline-block', className)} style={{ width: px, height: Math.round(px * 0.908), ...style }} data-testid="mino-living" data-living={rotate ? 'rotating' : 'calm'}>
      <MinoCoachMascot px={px} pose={pose} live={live} decorative className="absolute inset-0 !align-baseline" />
    </span>
  );
}
