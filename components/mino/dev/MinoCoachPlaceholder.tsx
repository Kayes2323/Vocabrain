'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motionAllowed } from '@/lib/mino/motion';
import { rigStateHoldMs, type CoachRigState } from '../rig/coach-preview-state';
import './mino-coach-rig.css';

export type { CoachRigState } from '../rig/coach-preview-state';

/**
 * PLACEHOLDER ANIMATION RIG — not the Mino character.
 *
 * This component exists only to build and demonstrate the 10-state animation
 * architecture from docs/MINO_COACH_CHARACTER_SPEC.md before real character
 * artwork exists. Every "layer" below is a deliberately plain, labelled grey
 * shape at the proportions/pivots given in that spec's §4 table — never
 * styled to resemble the approved purple/white Mino design, so it can never
 * be mistaken for final artwork if seen out of context.
 *
 * It is completely separate from the shipped, approved
 * components/mino/MinoCoachMascot.tsx (used today in Task 1, Task 2 and My
 * Brain), which this file does not import, modify, or share CSS classes
 * with (own `.mino-coach-rig__` namespace). Swapping in the real layered
 * artwork, once produced, means pointing these same divs at background
 * images — the state machine, pivots and timing should not need to change.
 */
export function MinoCoachPlaceholder({
  state = 'idle',
  onStateSettle,
  className,
}: {
  state?: CoachRigState;
  onStateSettle?: () => void;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const settleRef = useRef(onStateSettle);
  settleRef.current = onStateSettle;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let onScreen = true;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
    const update = () => {
      const allowed = motionAllowed({ animated: true, reducedMotion: Boolean(reduced?.matches), saveData, visible: onScreen && !document.hidden });
      el.setAttribute('data-motion', allowed ? 'on' : 'off');
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
    update();
    return () => {
      io?.disconnect();
      document.removeEventListener('visibilitychange', update);
      reduced?.removeEventListener?.('change', update);
    };
  }, []);

  useEffect(() => {
    const ms = rigStateHoldMs(state);
    if (ms <= 0) return;
    const id = setTimeout(() => settleRef.current?.(), ms);
    return () => clearTimeout(id);
  }, [state]);

  return (
    <div ref={root} className={cn('mino-coach-rig', className)} data-state={state} data-motion="off" role="img" aria-label="Mino Coach animation rig preview (placeholder artwork)">
      <div className="mino-coach-rig__badge">PLACEHOLDER ARTWORK — NOT FINAL</div>
      <div className="mino-coach-rig__stage">
        <span className="mino-coach-rig__layer mino-coach-rig__shadow" />

        <span className="mino-coach-rig__layer mino-coach-rig__backpack">
          <span className="mino-coach-rig__label">backpack</span>
        </span>
        <span className="mino-coach-rig__layer mino-coach-rig__backpack-strap" />
        <span className="mino-coach-rig__layer mino-coach-rig__backpack-tag" />

        <span className="mino-coach-rig__layer mino-coach-rig__feet" />

        <span className="mino-coach-rig__layer mino-coach-rig__body">
          <span className="mino-coach-rig__label">body</span>
        </span>

        <span className="mino-coach-rig__layer mino-coach-rig__arm mino-coach-rig__arm-notebook">
          <span className="mino-coach-rig__layer mino-coach-rig__notebook" />
        </span>
        <span className="mino-coach-rig__layer mino-coach-rig__arm mino-coach-rig__arm-pencil">
          <span className="mino-coach-rig__layer mino-coach-rig__pencil" />
        </span>

        <span className="mino-coach-rig__layer mino-coach-rig__face-mask">
          <span className="mino-coach-rig__label">mask</span>
        </span>

        <span className="mino-coach-rig__layer mino-coach-rig__eyes-open" />
        <span className="mino-coach-rig__layer mino-coach-rig__eyes-closed" />
        <span className="mino-coach-rig__layer mino-coach-rig__eyes-wink" />

        <span className="mino-coach-rig__layer mino-coach-rig__mouth-neutral" />
        <span className="mino-coach-rig__layer mino-coach-rig__mouth-mid" />
        <span className="mino-coach-rig__layer mino-coach-rig__mouth-wide" />

        <svg className="mino-coach-rig__layer mino-coach-rig__writing-stroke" viewBox="0 0 1024 1024" aria-hidden>
          <path d="M700,700 Q758,680 816,700" fill="none" stroke="#6b7280" strokeWidth="6" strokeLinecap="round" pathLength={1} />
        </svg>

        <span className="mino-coach-rig__layer mino-coach-rig__sparkle mino-coach-rig__sparkle-1" />
        <span className="mino-coach-rig__layer mino-coach-rig__sparkle mino-coach-rig__sparkle-2" />
      </div>
    </div>
  );
}
