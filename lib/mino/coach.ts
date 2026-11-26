/**
 * Mino Coach: one shared full-body mascot, reused across every learning area.
 * This module only decides which learning area the learner is in and which
 * pose/behaviour follows from that — kept pure so it can be tested without a
 * browser. The character drawing itself lives in MinoCoachMascot; its motion
 * lives in CSS (app/globals.css), following the same convention as the
 * canonical small mark in lib/mino/motion.ts.
 */

/** Every learning area the shared coach currently understands. */
export const MINO_COACH_AREAS = ['task1', 'task2', 'my-brain'] as const;
export type MinoCoachArea = (typeof MINO_COACH_AREAS)[number];

/** Visual poses the mascot can hold. The identity (body/mask/props) never changes between them. */
export const MINO_COACH_POSES = ['idle', 'enter', 'welcome', 'speaking', 'explaining', 'thinking', 'writing', 'success', 'encouraging'] as const;
export type MinoCoachPose = (typeof MINO_COACH_POSES)[number];

/**
 * The learning events a host screen can report. These map onto poses, but
 * are kept distinct from them: a screen says *what happened*, not *how to
 * look* — so the same event vocabulary works everywhere coaches appear.
 */
export const MINO_COACH_EVENTS = ['idle', 'enter', 'speaking', 'explaining', 'thinking', 'writing', 'success', 'struggle'] as const;
export type MinoCoachEvent = (typeof MINO_COACH_EVENTS)[number];

/** The pose a reported event implies. One small, total mapping — easy to audit, easy to test. */
export function poseForEvent(event: MinoCoachEvent): MinoCoachPose {
  switch (event) {
    case 'enter':
      return 'enter';
    case 'speaking':
      return 'speaking';
    case 'explaining':
      return 'explaining';
    case 'thinking':
      return 'thinking';
    case 'writing':
      return 'writing';
    case 'success':
      return 'success';
    case 'struggle':
      return 'encouraging';
    case 'idle':
      return 'idle';
  }
}

/** How long a one-shot pose (not idle/thinking, which hold until the event changes) plays before settling, ms. */
export function poseHoldMs(pose: MinoCoachPose): number {
  switch (pose) {
    case 'enter':
      return 1300;
    case 'success':
      return 1100;
    case 'encouraging':
      return 1400;
    case 'welcome':
      return 1300;
    default:
      return 0; // idle / speaking / explaining / thinking hold until the caller changes the event
  }
}

/**
 * The device-local key a learning area's first-entry welcome is remembered
 * under, mirroring LocaleProvider's `vocabbrain:locale` convention: a plain
 * localStorage flag, not a new Firestore field, so it never touches synced
 * profile data or the vocabulary/recall/scoring schema.
 */
export function welcomeStorageKey(area: MinoCoachArea): string {
  return `vocabbrain:mino-coach-welcome-seen:${area}`;
}
