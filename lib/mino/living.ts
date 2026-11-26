/**
 * Mino, living: the rules for the *decorative* life of the mascot (the central navigation button) and the pose the
 * Home coach card picks for its message. Pure, so it is tested without a browser (scripts/test-mino-living.ts).
 *
 * There is NO second animation system here. Everything below only chooses WHICH existing rig state
 * (components/mino/rig/coach-preview-state.ts) is requested and WHEN; the one MinoRigController does the moving.
 *
 * The rotation is deterministic (no randomness): idle → greeting → idle → thinking → idle → writing → idle →
 * explaining → idle → encouraging → idle → success → idle → (loop). Every beat is separated by a long, calm idle
 * (breathing + natural blinking, which belong to the rig) so Mino feels alive, never like a repeating GIF.
 */
import type { MinoCoachPose } from './coach';
import { rigStateHoldMs } from '@/components/mino/rig/coach-preview-state';

/** The decorative beats, in order. Every one is an existing rig state (reported, not invented, in the review notes). */
export const LIVING_BEATS = ['greeting', 'thinking', 'writing', 'explaining', 'encouraging', 'success'] as const satisfies readonly MinoCoachPose[];
export type LivingBeat = (typeof LIVING_BEATS)[number];

/** How long Mino rests (idle) before the first beat, and between two beats. Overridable for tests (see `clampDwell`). */
export const LIVING_FIRST_DWELL_MS = 5500;
export const LIVING_BETWEEN_DWELL_MS = 8000;

/** How long a beat stays on screen before the pose returns to idle. One-shots get a small margin over their own settle time. */
export function livingBeatMs(beat: LivingBeat): number {
  switch (beat) {
    case 'greeting':
      return rigStateHoldMs('greeting') + 150;
    case 'encouraging':
      return rigStateHoldMs('encouraging') + 150;
    case 'success':
      return rigStateHoldMs('success') + 150;
    case 'thinking':
      return 2400;
    case 'writing':
      return 2600;
    case 'explaining':
      return 2400;
  }
}

/** One full lap: every beat plus the idle that follows it (the first dwell is not part of a lap). */
export const livingLapMs = (between = LIVING_BETWEEN_DWELL_MS): number => LIVING_BEATS.reduce((sum, b) => sum + livingBeatMs(b) + between, 0);

export const nextBeatIndex = (i: number): number => (i + 1) % LIVING_BEATS.length;

/** A dwell override (tests / review) kept inside a sane range, like the install-prompt delay override. */
export function clampDwell(raw: unknown, fallback: number): number {
  const n = typeof raw === 'string' ? Number(raw) : typeof raw === 'number' ? raw : NaN;
  return Number.isFinite(n) && n >= 0 && n <= 600_000 ? Math.round(n) : fallback;
}

export interface LivingGate {
  /** prefers-reduced-motion: reduce. */
  reducedMotion: boolean;
  /** The browser asked for less data (data saver) or the connection is 2g. */
  saveData: boolean;
  /** The tab is visible. */
  tabVisible: boolean;
  /** The button is on screen (IntersectionObserver; display:none counts as off-screen). */
  onScreen: boolean;
  /** Another Mino surface is teaching, speaking, or thinking right now (see lib/mino/living-bus.ts). */
  contextBusy: boolean;
}

/** Decorative rotation runs only when nothing else needs Mino's attention and nothing makes motion unwelcome. */
export function livingRotationAllowed(g: LivingGate): boolean {
  return !g.reducedMotion && !g.saveData && g.tabVisible && g.onScreen && !g.contextBusy;
}

/** The live rig (21 layers) is only downloaded when motion is welcome; otherwise the static poster is the whole mascot. */
export function livingRigAllowed(g: Pick<LivingGate, 'reducedMotion' | 'saveData'>): boolean {
  return !g.reducedMotion && !g.saveData;
}

/**
 * The pose Mino takes on the Home coach card for its message (one-shot only: it plays once, then Mino is at rest).
 * Warm and welcoming by default; encouraging when the student is behind or something failed; a small success when
 * they are at or past their target.
 */
export function homeCardPose(messageKey: string): MinoCoachPose {
  switch (messageKey) {
    case 'mino.insight.catchUp':
    case 'mino.insight.reviewFailed':
      return 'encouraging';
    case 'mino.insight.atTarget':
    case 'mino.insight.dayDone':
      return 'success';
    default:
      return 'greeting';
  }
}
