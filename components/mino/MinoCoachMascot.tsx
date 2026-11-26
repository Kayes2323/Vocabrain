'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motionAllowed } from '@/lib/mino/motion';
import { poseHoldMs, type MinoCoachPose } from '@/lib/mino/coach';

export type { MinoCoachPose } from '@/lib/mino/coach';

const SIZE = { sm: 72, md: 120, lg: 180, xl: 240 } as const;
export type MinoCoachSize = keyof typeof SIZE;

/**
 * The full-body Mino Coach mascot: a separate component from the canonical
 * small mark (components/mino/Mino.tsx), which stays untouched. Same brand
 * identity (purple body, same brand tokens), same character everywhere —
 * only the pose changes between learning areas, never the drawing itself.
 *
 * Built as one layered SVG with independently animated parts (body, mask,
 * both eyes, mouth, both arms, pencil, notebook + spiral, backpack + straps
 * + tag, feet, sparkles), moved entirely by CSS keyframes keyed off
 * `data-pose` (see app/globals.css) — the same hand-written-CSS approach as
 * the small mark, so no animation library is introduced.
 *
 * One-shot poses ('enter' | 'success' | 'encouraging' | 'welcome') play once
 * and settle back to 'idle'; 'speaking' | 'explaining' | 'thinking' hold
 * until the caller changes the pose. Motion pauses off-screen, on a hidden
 * tab, under prefers-reduced-motion or data-saver — the character still
 * renders, it just stops moving.
 */
export function MinoCoachMascot({
  pose = 'idle',
  size = 'md',
  onPoseSettle,
  className,
}: {
  pose?: MinoCoachPose;
  size?: MinoCoachSize;
  /** Called once a one-shot pose has finished and the mascot has returned to idle. */
  onPoseSettle?: () => void;
  className?: string;
}) {
  const px = SIZE[size];
  const root = useRef<HTMLSpanElement>(null);
  const settleRef = useRef(onPoseSettle);
  settleRef.current = onPoseSettle;

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

  // One-shot poses settle back to idle on their own; the caller finds out via onPoseSettle.
  useEffect(() => {
    const ms = poseHoldMs(pose);
    if (ms <= 0) return;
    const id = setTimeout(() => settleRef.current?.(), ms);
    return () => clearTimeout(id);
  }, [pose]);

  return (
    <span ref={root} className={cn('mino-coach relative inline-flex shrink-0', className)} data-pose={pose} data-motion="off" aria-hidden>
      <svg viewBox="0 0 200 240" width={px} height={(px * 240) / 200} className="mino-coach-mark">
        <ellipse className="coach-shadow fill-foreground/10" cx="100" cy="228" rx="48" ry="8" />

        <g className="coach-backpack">
          <path className="coach-backpack-strap fill-none stroke-amber-900/70" strokeWidth="7" strokeLinecap="round" d="M62,96 C40,110 34,140 38,168" />
          <rect className="coach-backpack-body fill-amber-800" x="16" y="150" width="46" height="56" rx="14" />
          <rect className="coach-backpack-pocket fill-amber-900/40" x="24" y="166" width="30" height="20" rx="8" />
          <rect className="coach-backpack-tag fill-brand" x="30" y="140" width="18" height="12" rx="4" />
        </g>

        <g className="coach-feet">
          <ellipse className="coach-foot fill-neutral-900" cx="78" cy="214" rx="16" ry="10" />
          <ellipse className="coach-foot fill-neutral-900" cx="124" cy="214" rx="16" ry="10" />
        </g>

        <g className="coach-body">
          <path
            className="coach-body-shape fill-brand"
            d="M100,20 C142,20 172,52 172,106 C172,160 148,204 100,204 C52,204 28,160 28,106 C28,52 58,20 100,20 Z"
          />
        </g>

        <g className="coach-arm coach-arm-right">
          <path className="coach-arm-limb fill-none stroke-brand" strokeWidth="26" strokeLinecap="round" d="M160,114 Q188,138 168,172" />
          <circle className="coach-hand fill-brand" cx="168" cy="174" r="15" />
          <g className="coach-notebook">
            <rect className="fill-brand-foreground stroke-foreground/10" x="146" y="156" width="42" height="48" rx="5" />
            <circle className="fill-foreground/30" cx="150" cy="164" r="2" />
            <circle className="fill-foreground/30" cx="150" cy="174" r="2" />
            <circle className="fill-foreground/30" cx="150" cy="184" r="2" />
            <circle className="fill-foreground/30" cx="150" cy="194" r="2" />
            <line className="stroke-foreground/15" x1="158" y1="166" x2="182" y2="166" strokeWidth="2" />
            <line className="stroke-foreground/15" x1="158" y1="176" x2="182" y2="176" strokeWidth="2" />
            <line className="stroke-foreground/15" x1="158" y1="186" x2="178" y2="186" strokeWidth="2" />
          </g>
        </g>

        <g className="coach-arm coach-arm-left">
          <path className="coach-arm-limb fill-none stroke-brand" strokeWidth="26" strokeLinecap="round" d="M40,114 Q12,138 32,172" />
          <circle className="coach-hand fill-brand" cx="32" cy="174" r="15" />
          <g className="coach-pencil">
            <rect className="fill-yellow-500" x="24" y="124" width="12" height="46" rx="3" transform="rotate(18 30 146)" />
            <path className="fill-neutral-800" d="M24,124 l12,0 l-6,-12 Z" transform="rotate(18 30 146)" />
            <rect className="fill-pink-200" x="24" y="166" width="12" height="8" rx="2" transform="rotate(18 30 146)" />
          </g>
        </g>

        <g className="coach-mask">
          <path
            className="coach-mask-shape fill-brand-foreground"
            d="M68,66 C68,50 82,40 100,40 C118,40 132,50 132,66 C132,94 126,118 119,144 C115,160 109,170 100,180 C91,170 85,160 81,144 C74,118 68,94 68,66 Z"
          />
          <g className="coach-eyes">
            <circle className="coach-eye coach-eye-left fill-foreground" cx="84" cy="92" r="9" />
            <path className="coach-eye-right fill-none stroke-foreground" strokeWidth="4.5" strokeLinecap="round" d="M108,90 Q116,98 124,90" />
          </g>
          <g className="coach-mouth">
            <path className="coach-mouth-closed fill-none stroke-foreground" strokeWidth="3.5" strokeLinecap="round" d="M91,128 Q100,134 109,128" />
            <ellipse className="coach-mouth-open fill-foreground" cx="100" cy="130" rx="7" ry="9" />
          </g>
        </g>

        <g className="coach-sparkles">
          <path className="coach-sparkle coach-sparkle-1 fill-amber-400" d="M150,34 l3,8 8,3 -8,3 -3,8 -3,-8 -8,-3 8,-3z" />
          <path className="coach-sparkle coach-sparkle-2 fill-amber-400" d="M54,48 l2.4,6.4 6.4,2.4 -6.4,2.4 -2.4,6.4 -2.4,-6.4 -6.4,-2.4 6.4,-2.4z" />
        </g>
      </svg>
    </span>
  );
}
