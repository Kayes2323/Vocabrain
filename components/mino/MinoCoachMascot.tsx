'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { poseHoldMs, type MinoCoachPose } from '@/lib/mino/coach';
import { MinoCoachRig } from './rig/MinoCoachRig';
import type { MinoRigController } from './rig/coach-rig-controller';
import { WELCOME_SEQUENCE } from './rig/coach-preview-state';
import { MinoCoachMascotLegacy } from './MinoCoachMascotLegacy';

export type { MinoCoachPose } from '@/lib/mino/coach';

/** Width in px (the rig is wider than tall: a 1200x1088 stage). */
const SIZE = { sm: 96, md: 150, lg: 210, xl: 300 } as const;
export type MinoCoachSize = keyof typeof SIZE;

/** How long Mino keeps "speaking" after the welcome choreography before settling back to idle. */
export const WELCOME_SPEAK_MS = 8000;

/**
 * The shared full-body Mino Coach mascot used in every learning area (Writing Task 1, Task 2, My Brain, lesson
 * panels). It renders the approved layered artwork as a real rig (components/mino/rig): independent arms, eyes,
 * mouth, pencil and notebook driven by one imperative controller, so animation never re-renders React.
 *
 * The public API is unchanged from the original SVG mascot (pose / size / onPoseSettle / className), so every host
 * screen keeps working as is. Poses map onto the rig's state machine:
 *   idle -> idle · enter -> entrance + landing · welcome -> entrance, landing, greeting, speaking · speaking ->
 *   speaking · explaining -> explaining · thinking -> thinking · success -> success · encouraging -> encouraging.
 * One-shot poses settle back to idle (onPoseSettle fires); held poses wait for the caller. Motion pauses off-screen,
 * on a hidden tab, under prefers-reduced-motion or data-saver — the character still renders, it just stops moving.
 * If the artwork cannot be loaded, the original SVG mascot is shown instead.
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
  const ctrl = useRef<MinoRigController | null>(null);
  const poseRef = useRef(pose);
  poseRef.current = pose;
  const settleRef = useRef(onPoseSettle);
  settleRef.current = onPoseSettle;
  const applied = useRef<MinoCoachPose | null>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

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
      case 'idle':
      case 'speaking':
      case 'explaining':
      case 'thinking':
      case 'success':
      case 'encouraging':
        c.play(p);
        break;
    }
  }, []);

  // Play the requested pose whenever it changes (once the artwork is ready).
  useEffect(() => {
    if (ready && applied.current !== pose) apply(pose);
  }, [pose, ready, apply]);

  // One-shot poses (and the welcome's speaking tail) settle back to idle on their own; the caller is told.
  useEffect(() => {
    if (!ready) return;
    const ms = pose === 'welcome' ? WELCOME_SPEAK_MS : poseHoldMs(pose);
    if (ms <= 0) return;
    const id = setTimeout(() => {
      if (pose === 'welcome') ctrl.current?.play('idle');
      settleRef.current?.();
    }, ms);
    return () => clearTimeout(id);
  }, [pose, ready]);

  if (failed) return <MinoCoachMascotLegacy pose={pose} size={size} onPoseSettle={onPoseSettle} className={className} />;

  return (
    <span className={cn('relative inline-block shrink-0 align-top', className)} style={{ width: `min(100%, ${SIZE[size]}px)` }} data-mino-coach="rig" data-pose={pose} aria-hidden>
      <MinoCoachRig
        clip={pose === 'welcome' || pose === 'enter'}
        onReady={(c) => {
          ctrl.current = c;
          apply(poseRef.current); // same tick as the rig becoming visible: no idle flash before an entrance
          setReady(true);
        }}
        onFail={() => setFailed(true)}
      />
    </span>
  );
}
