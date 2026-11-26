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
