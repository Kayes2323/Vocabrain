/**
 * Pure state logic for the Mino Coach animation-architecture preview only.
 * Deliberately separate from the production `lib/mino/coach.ts` (which backs
 * the already-shipped mascot in Task 1/Task 2/My Brain) — this module tracks
 * the full 10-state vocabulary from docs/MINO_COACH_CHARACTER_SPEC.md so the
 * animation engineering can be built and reviewed before any production
 * integration decision is made. Kept pure so it can be tested without a
 * browser, same convention as lib/mino/motion.ts.
 */

export const COACH_RIG_STATES = ['idle', 'entrance', 'landing', 'greeting', 'speaking', 'explaining', 'writing', 'thinking', 'success', 'encouraging'] as const;
export type CoachRigState = (typeof COACH_RIG_STATES)[number];

/** One-shot states settle back to 'idle' on their own after this many ms; held states return 0 (they wait for the caller). */
export function rigStateHoldMs(state: CoachRigState): number {
  switch (state) {
    case 'entrance':
      return 1050;
    case 'landing':
      return 420;
    case 'greeting':
      return 1100;
    case 'success':
      return 900;
    case 'encouraging':
      return 1350;
    default:
      return 0; // idle / speaking / explaining / writing / thinking hold until the caller changes state
  }
}

/** The welcome choreography named in the spec: entrance -> landing -> greeting -> speaking -> idle. */
export const WELCOME_SEQUENCE: CoachRigState[] = ['entrance', 'landing', 'greeting', 'speaking'];

/** The lesson-start choreography: idle -> explaining -> writing -> idle. */
export const LESSON_START_SEQUENCE: CoachRigState[] = ['explaining', 'writing'];

/** The evaluation choreography: idle -> thinking -> (success | encouraging) -> idle. */
export function evaluationSequence(outcome: 'success' | 'encouraging'): CoachRigState[] {
  return ['thinking', outcome];
}

/** States that play once and then settle on their own (the others hold until the caller changes them). */
export const RIG_ONE_SHOT_STATES: readonly CoachRigState[] = ['entrance', 'landing', 'greeting', 'success', 'encouraging'];
export const isRigOneShot = (state: CoachRigState): boolean => rigStateHoldMs(state) > 0;

/**
 * States that are defined and keep their CSS/state-machine entry but are deliberately NOT used by the Task 1
 * welcome flow (Revision 2 scope): they stay dormant until a later phase turns them on.
 */
export const RIG_DORMANT_STATES: readonly CoachRigState[] = ['thinking', 'encouraging'];
export const isRigDormant = (state: CoachRigState): boolean => RIG_DORMANT_STATES.includes(state);

/** Where a rig returns after a one-shot settles: the last held state the caller asked for (idle by default). */
export function rigSettleTarget(base: CoachRigState): CoachRigState {
  return isRigOneShot(base) ? 'idle' : base;
}

/** Natural blinking is only allowed while the eyes are not being driven by the state itself. */
export function rigBlinkAllowed(state: CoachRigState): boolean {
  return state !== 'greeting' && state !== 'success' && state !== 'entrance';
}

/** Where a one-shot settles when it is part of a choreography, else back to the base state. */
export function nextInSequence(sequence: readonly CoachRigState[], current: CoachRigState, index: number): { state: CoachRigState; index: number } | null {
  if (index + 1 >= sequence.length) return null;
  void current;
  return { state: sequence[index + 1], index: index + 1 };
}

/** Pointing directions the `explaining` gesture understands (contextual: toward the content on the page). */
export const RIG_POINT_DIRECTIONS = ['left', 'center', 'right'] as const;
export type RigPointDirection = (typeof RIG_POINT_DIRECTIONS)[number];

/** Reduced-motion: one-shots do not animate, they settle quickly so choreographies still advance. */
export const REDUCED_MOTION_SETTLE_MS = 260;
