'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  idleLife,
  isDoubleBlink,
  MINO_STAR_MIN_PX,
  MINO_TIMING,
  motionAllowed,
  nextBlinkDelay,
  nextSparkleDelay,
  reactionDuration,
  reactionForTransition,
  type MinoMode,
  type MinoReaction,
} from '@/lib/mino/motion';

export type { MinoMode, MinoReaction } from '@/lib/mino/motion';

const SIZE = { xs: 20, sm: 28, md: 36, lg: 56, xl: 72, '2xl': 96 } as const;
export type MinoSize = keyof typeof SIZE;

const REACT_EVENT = 'mino:react';

/**
 * Ask every visible, animated Mino for a one-shot reaction (a feature opened →
 * "blink", an answer or a finished task → "success", something important →
 * "attention"). Purely visual: nothing else listens to it.
 */
export function minoReact(reaction: MinoReaction) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<MinoReaction>(REACT_EVENT, { detail: reaction }));
}

/**
 * Mino, the companion: the canonical mark (soft square, two eyes, the star)
 * with a little life on top. The drawing never changes; only motion is added.
 *
 * - static: never moves.
 * - idle: an occasional, organic blink; the star sparkles rarely.
 * - thinking: Mino glances around (no spinner); leaving it plays blink + sparkle.
 * - welcome: drop in, dip, tilt, a little roll/hop, settle, blink, sparkle, wordmark (~1.45 s).
 * - success / attention / celebrate / sparkle: a one-shot on entering the mode, then idle life.
 *   celebrate = a small hop and rock, then a sparkle.
 *
 * Motion stops for prefers-reduced-motion, data-saver, when off-screen and when the tab is hidden.
 */
export function Mino({
  mode = 'idle',
  size = 'md',
  animated = true,
  wordmark = false,
  listen,
  className,
}: {
  mode?: MinoMode;
  size?: MinoSize;
  animated?: boolean;
  /** Show the "Mino" wordmark under the face (the star doubles as the dot of the i). */
  wordmark?: boolean;
  /** React to minoReact() events (default: any non-static mode). */
  listen?: boolean;
  className?: string;
}) {
  const px = SIZE[size];
  const root = useRef<HTMLSpanElement>(null);
  const prevMode = useRef<MinoMode>(mode);
  // Live flags read by timers without re-rendering.
  const state = useRef({ allowed: false, mode, timers: new Set<ReturnType<typeof setTimeout>>() });
  state.current.mode = mode;

  // Environment → allowed; schedules the idle life only while allowed.
  useEffect(() => {
    const el = root.current;
    if (!el || !animated || mode === 'static') {
      el?.setAttribute('data-motion', 'off');
      return;
    }
    const s = state.current;
    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        s.timers.delete(id);
        fn();
      }, ms);
      s.timers.add(id);
    };
    const clearAll = () => {
      s.timers.forEach(clearTimeout);
      s.timers.clear();
    };

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
    let onScreen = true;

    const blink = () => {
      if (!s.allowed) return;
      el.setAttribute('data-blink', '');
      later(() => el.removeAttribute('data-blink'), MINO_TIMING.blinkClosed);
    };
    const scheduleBlink = () =>
      later(() => {
        if (idleLife(s.mode).blink && !el.hasAttribute('data-react')) {
          blink();
          if (isDoubleBlink()) later(blink, MINO_TIMING.blinkClosed + MINO_TIMING.doubleBlinkGap);
        }
        scheduleBlink();
      }, nextBlinkDelay());
    const scheduleSparkle = () =>
      later(() => {
        if (idleLife(s.mode).sparkle && !el.hasAttribute('data-react')) play(el, 'sparkle', later);
        scheduleSparkle();
      }, nextSparkleDelay());

    const update = () => {
      const allowed = motionAllowed({ animated, reducedMotion: Boolean(reduced?.matches), saveData, visible: onScreen && !document.hidden });
      if (allowed === s.allowed) return;
      s.allowed = allowed;
      el.setAttribute('data-motion', allowed ? 'on' : 'off');
      clearAll();
      el.removeAttribute('data-blink');
      if (allowed) {
        scheduleBlink();
        scheduleSparkle();
      }
    };

    const io = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver((entries) => {
          onScreen = entries[entries.length - 1]?.isIntersecting ?? true;
          update();
        })
      : null;
    io?.observe(el);
    document.addEventListener('visibilitychange', update);
    reduced?.addEventListener?.('change', update);
    s.allowed = false;
    update();

    // One-shot reactions requested anywhere in the app.
    const onReact = (e: Event) => {
      const r = (e as CustomEvent<MinoReaction>).detail;
      if (!s.allowed) return;
      if (r === 'blink') blink();
      else play(el, r, later, blink);
    };
    const listening = listen ?? true;
    if (listening) window.addEventListener(REACT_EVENT, onReact);

    // A one-shot mode shown from the start (e.g. "attention" on a card) plays once when Mino can move.
    if (s.allowed && (mode === 'attention' || mode === 'success' || mode === 'celebrate' || mode === 'sparkle')) {
      later(() => play(el, mode, later, blink), 400);
    }
    // Welcome starts with the first paint (data-react is rendered); end it on time, or at once if Mino may not move.
    if (el.getAttribute('data-react') === 'welcome') {
      if (s.allowed) later(() => el.removeAttribute('data-react'), MINO_TIMING.welcome);
      else el.removeAttribute('data-react');
    }

    return () => {
      io?.disconnect();
      document.removeEventListener('visibilitychange', update);
      reduced?.removeEventListener?.('change', update);
      if (listening) window.removeEventListener(REACT_EVENT, onReact);
      clearAll();
      s.allowed = false;
    };
    // The welcome/idle loop is set up once per animated/static switch; mode changes are handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animated, mode === 'static', listen]);

  // Mode transitions play their one-shot (e.g. thinking → idle: the answer is ready).
  useEffect(() => {
    const from = prevMode.current;
    prevMode.current = mode;
    const el = root.current;
    const s = state.current;
    if (!el || from === mode || !s.allowed) return;
    const r = reactionForTransition(from, mode);
    if (!r) return;
    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        s.timers.delete(id);
        fn();
      }, ms);
      s.timers.add(id);
    };
    play(el, r, later, () => {
      el.setAttribute('data-blink', '');
      later(() => el.removeAttribute('data-blink'), MINO_TIMING.blinkClosed);
    });
  }, [mode]);

  const star = px >= MINO_STAR_MIN_PX;
  return (
    <span
      ref={root}
      className={cn('mino inline-flex shrink-0 flex-col items-center', className)}
      data-mino-mode={mode}
      data-motion="off"
      {...(mode === 'welcome' && animated ? { 'data-react': 'welcome' } : {})}
      aria-hidden
    >
      <svg viewBox="0 0 48 48" width={px} height={px} className={cn('mino-mark', mode === 'thinking' && 'mino-thinking')}>
        <g className="mino-body">
          <rect x="2" y="2" width="44" height="44" rx="15" className="fill-brand" />
        </g>
        <g className="mino-eyes">
          <rect className="mino-eye fill-brand-foreground" x="15" y="18" width="5" height="10" rx="2.5" />
          <rect className="mino-eye fill-brand-foreground" x="28" y="18" width="5" height="10" rx="2.5" />
        </g>
        {star && (
          <path
            className="mino-glint fill-brand-foreground"
            opacity={0.9}
            d="M36 8.5l1.1 2.9 2.9 1.1-2.9 1.1L36 16.5l-1.1-2.9L32 12.5l2.9-1.1z"
          />
        )}
      </svg>
      {wordmark && <MinoWordmark px={px} />}
    </span>
  );
}

/**
 * "Mino": the wordmark in the app's type. The dot of the i is Mino's star
 * (same four-point shape), so the spark reads as part of the name.
 */
export function MinoWordmark({ px = 72, className }: { px?: number; className?: string }) {
  // Wordmark scales with the face: ~0.36× the face, never below 18px.
  const fontSize = Math.max(18, Math.round(px * 0.36));
  return (
    <span className={cn('mino-wordmark mt-[0.35em] font-semibold tracking-tight text-foreground', className)} style={{ fontSize, lineHeight: 1.1 }}>
      M
      <span className="relative inline-block">
        {'ı'}
        <svg
          viewBox="32 8.5 8 8"
          className="mino-wordmark-star absolute left-1/2 fill-brand"
          style={{ width: '0.3em', height: '0.3em', top: '0.02em', transform: 'translateX(-50%)' }}
          aria-hidden
        >
          <path d="M36 8.5l1.1 2.9 2.9 1.1-2.9 1.1L36 16.5l-1.1-2.9L32 12.5l2.9-1.1z" />
        </svg>
      </span>
      no
    </span>
  );
}

/** Plays a one-shot reaction: sets data-react (restarting its CSS animation), clears it after. */
function play(el: HTMLElement, r: MinoReaction, later: (fn: () => void, ms: number) => void, blink?: () => void) {
  el.removeAttribute('data-react');
  // Force a reflow so the same reaction can replay back to back.
  void el.getBoundingClientRect();
  el.setAttribute('data-react', r);
  const ms = reactionDuration(r);
  // Success blinks at once; celebrate blinks after the hop lands.
  if (r === 'success' && blink) blink();
  if (r === 'celebrate' && blink) later(blink, 560);
  later(() => {
    if (el.getAttribute('data-react') === r) el.removeAttribute('data-react');
  }, ms);
}
