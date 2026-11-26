'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import type { MinoCoachPose } from '@/lib/mino/coach';
import { MinoCoachRig } from './rig/MinoCoachRig';
import type { MinoRigController } from './rig/coach-rig-controller';
import { WELCOME_SEQUENCE, WELCOME_TOTAL_MS, rigStateHoldMs } from './rig/coach-preview-state';
import { MinoCoachMascotLegacy } from './MinoCoachMascotLegacy';
import { registerMinoPresence } from '@/lib/mino/living-bus';

export type { MinoCoachPose } from '@/lib/mino/coach';

/** Width in px (the rig is wider than tall: a 1200x1088 stage). */
const SIZE = { xs: 64, sm: 96, md: 150, lg: 210, xl: 300 } as const;
export type MinoCoachSize = keyof typeof SIZE;

/** The static rest-pose frame shown while the 21 layer images load (same box and aspect as the rig: no layout shift). */
export const MINO_POSTER_SRC = '/mino/coach/poster.webp';

/** Poses whose entrance plays from outside the box: the rig is clipped to its own box for these. */
const isOpeningPose = (p: MinoCoachPose) => p === 'welcome' || p === 'enter';

/** How long a one-shot pose takes on the rig, so `onPoseSettle` fires when Mino is back at rest. Held poses return 0. */
function poseSettleMs(pose: MinoCoachPose): number {
  switch (pose) {
    case 'welcome':
      return WELCOME_TOTAL_MS;
    case 'enter':
      return rigStateHoldMs('entrance') + rigStateHoldMs('landing');
    case 'greeting':
      return rigStateHoldMs('greeting');
    case 'success':
      return rigStateHoldMs('success');
    case 'encouraging':
      return rigStateHoldMs('encouraging');
    default:
      return 0;
  }
}

/**
 * The shared full-body Mino Coach mascot used in every learning area (Writing Task 1, Task 2, My Brain, lesson
 * panels, the "reading your answer" screen). It renders the approved layered artwork as a real rig
 * (components/mino/rig): independent arms, eyes, mouth, pencil and notebook driven by one imperative controller, so
 * animation never re-renders React. There is exactly one implementation of the character; hosts only choose a pose.
 *
 * The public API is the original one (pose / size / onPoseSettle / className); `onController` additionally hands out
 * the controller for review tooling. Poses map onto the existing 10-state machine:
 *   welcome -> the opening "Soft Roll-In & Pencil Salute": entrance -> landing -> greeting -> idle (~1.4 s)
 *   enter -> entrance + landing · speaking · explaining · thinking · writing · success · encouraging · idle -> the same states.
 * One-shot poses settle back to idle (onPoseSettle fires); held poses wait for the caller. The opening plays when the
 * mascot is mounted with that pose, never on a re-render. Motion pauses off-screen, on a hidden tab, under
 * prefers-reduced-motion or data-saver — the character still renders, it just stops moving.
 *
 * Loading: the box (aspect ratio) is reserved immediately and a static poster of Mino is shown until every layer has
 * decoded, then the live rig takes over (and the opening starts). If the artwork cannot be loaded the original SVG
 * mascot is shown instead.
 */
export function MinoCoachMascot({
  pose = 'idle',
  size = 'md',
  onPoseSettle,
  onController,
  className,
  px,
  live = true,
  decorative = false,
}: {
  pose?: MinoCoachPose;
  size?: MinoCoachSize;
  /** Called once a one-shot pose has finished and the mascot has returned to idle. */
  onPoseSettle?: () => void;
  /** Review tooling only: receives the rig controller once the artwork is ready (and null when it goes away). */
  onController?: (controller: MinoRigController | null) => void;
  className?: string;
  /** Exact width in px (overrides `size`): for compact placements such as the navigation button. */
  px?: number;
  /**
   * false → only the static poster (no 21-layer download, nothing animates). The decorative surfaces use it until the
   * page is idle, and permanently under reduced motion / data saver. Flipping it to true mounts the live rig.
   */
  live?: boolean;
  /**
   * A purely decorative placement (the navigation button, the Home card): it does not count as a teaching Mino, so it
   * never stops the decorative rotation. Teaching / reacting surfaces leave this false and are registered as "present".
   */
  decorative?: boolean;
}) {
  const ctrl = useRef<MinoRigController | null>(null);
  const poseRef = useRef(pose);
  poseRef.current = pose;
  const settleRef = useRef(onPoseSettle);
  settleRef.current = onPoseSettle;
  const controllerCb = useRef(onController);
  controllerCb.current = onController;
  const applied = useRef<MinoCoachPose | null>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  // A teaching / reacting Mino on screen has priority over the decorative rotation (lib/mino/living-bus.ts).
  useEffect(() => (decorative ? undefined : registerMinoPresence()), [decorative]);

  const apply = useCallback((p: MinoCoachPose) => {
    const c = ctrl.current;
    if (!c) return;
    applied.current = p;
    switch (p) {
      case 'enter':
        c.playSequence(['entrance', 'landing']);
        break;
      case 'welcome':
        c.playSequence(WELCOME_SEQUENCE);
        break;
      case 'greeting':
      case 'idle':
      case 'speaking':
      case 'explaining':
      case 'thinking':
      case 'writing':
      case 'success':
      case 'encouraging':
        c.play(p);
        break;
    }
  }, []);

  // Play the requested pose whenever it changes (once the artwork is ready) — never on a plain re-render.
  useEffect(() => {
    if (ready && applied.current !== pose) apply(pose);
  }, [pose, ready, apply]);

  // One-shot poses settle back to idle on their own; the caller is told once Mino is at rest again.
  useEffect(() => {
    if (!ready) return;
    const ms = poseSettleMs(pose);
    if (ms <= 0) return;
    const id = setTimeout(() => settleRef.current?.(), ms);
    return () => clearTimeout(id);
  }, [pose, ready]);

  useEffect(() => () => controllerCb.current?.(null), []);

  if (failed) return <MinoCoachMascotLegacy pose={pose === 'greeting' ? 'welcome' : pose} size={size === 'xs' ? 'sm' : size} onPoseSettle={onPoseSettle} className={className} />;

  return (
    <span className={cn('relative inline-block shrink-0 align-top', className)} // px width + max-width (not a percentage width): the box keeps its size even inside a shrink-to-fit wrapper such as the violet aura
      style={{ width: px ?? SIZE[size], maxWidth: '100%' }} data-mino-coach="rig" data-pose={pose} data-loaded={ready ? 'true' : 'false'} aria-hidden>
      {live && (
        <MinoCoachRig
          clip={isOpeningPose(pose)}
          onReady={(c) => {
            ctrl.current = c;
            apply(poseRef.current); // same tick as the rig becoming visible: no idle flash before an opening
            setReady(true);
            controllerCb.current?.(c);
          }}
          onFail={() => setFailed(true)}
        />
      )}
      {/* Static Mino while loading. Opening poses wait a beat before showing it, so a cached/fast load never flashes it. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="mino-poster" data-ready={ready ? 'true' : 'false'} data-opening={isOpeningPose(pose) ? 'true' : 'false'} src={MINO_POSTER_SRC} alt="" aria-hidden draggable={false} decoding="async" fetchPriority="high" />
    </span>
  );
}
