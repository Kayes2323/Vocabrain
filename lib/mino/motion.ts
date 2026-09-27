/**
 * Mino's motion rules, kept pure so they can be tested without a browser.
 * The canonical look never changes; motion only adds life on top of it.
 */

export const MINO_MODES = ['static', 'idle', 'thinking', 'welcome', 'success', 'attention', 'celebrate', 'sparkle'] as const;
export type MinoMode = (typeof MINO_MODES)[number];

/** One-shot reactions any visible Mino can play, then it returns to its mode. */
export const MINO_REACTIONS = ['blink', 'sparkle', 'success', 'attention', 'celebrate'] as const;
export type MinoReaction = (typeof MINO_REACTIONS)[number];

/** Timings (ms). Short and quiet: a blink is ~150 ms, the welcome ~1.45 s. */
export const MINO_TIMING = {
  blinkClosed: 140,
  /** Gap between blinks: organic, never a fixed beat. */
  blinkMin: 2800,
  blinkMax: 7200,
  /** A second, quick blink now and then (like people do). */
  doubleBlinkChance: 0.18,
  doubleBlinkGap: 220,
  /** The star sparkles rarely while idle. */
  sparkleMin: 11000,
  sparkleMax: 22000,
  sparkle: 700,
  success: 900,
  attention: 1400,
  /** A little hop and rock, then a sparkle. */
  celebrate: 950,
  /** Drop in → dip → tilt → roll/hop → settle → blink → sparkle → wordmark. */
  welcome: 1450,
} as const;

/** A random value in [min, max) from a 0–1 random source (injectable for tests). */
const between = (min: number, max: number, r: number) => min + (max - min) * r;

/** Next idle blink: 2.8–7.2 s, randomised so it never feels mechanical. */
export function nextBlinkDelay(random: () => number = Math.random): number {
  return Math.round(between(MINO_TIMING.blinkMin, MINO_TIMING.blinkMax, random()));
}

/** Whether this blink is followed by a quick second one. */
export function isDoubleBlink(random: () => number = Math.random): boolean {
  return random() < MINO_TIMING.doubleBlinkChance;
}

/** Next idle sparkle of the star: rare (11–22 s). */
export function nextSparkleDelay(random: () => number = Math.random): number {
  return Math.round(between(MINO_TIMING.sparkleMin, MINO_TIMING.sparkleMax, random()));
}

export interface MotionEnvironment {
  /** The component's `animated` prop. */
  animated: boolean;
  /** prefers-reduced-motion: reduce. */
  reducedMotion: boolean;
  /** Data-saver / low-power hint (navigator.connection.saveData). */
  saveData: boolean;
  /** On screen (IntersectionObserver) and the tab is visible. */
  visible: boolean;
}

/** Whether Mino may move at all right now. Off-screen, reduced motion or data-saver → still. */
export function motionAllowed(env: MotionEnvironment): boolean {
  return env.animated && !env.reducedMotion && !env.saveData && env.visible;
}

/** Modes that keep the natural idle life (blinks, rare sparkle) running. */
export function idleLife(mode: MinoMode): { blink: boolean; sparkle: boolean } {
  switch (mode) {
    case 'idle':
    case 'welcome':
    case 'success':
    case 'attention':
    case 'celebrate':
    case 'sparkle':
      return { blink: true, sparkle: mode === 'idle' || mode === 'sparkle' };
    // Thinking has its own eye motion; static never moves.
    default:
      return { blink: false, sparkle: false };
  }
}

/** The one-shot reaction a mode change should play (e.g. an answer arrived: thinking → idle). */
export function reactionForTransition(from: MinoMode, to: MinoMode): MinoReaction | null {
  if (from === 'thinking' && to !== 'thinking' && to !== 'static') return 'success';
  if (to === 'success' && from !== 'success') return 'success';
  if (to === 'attention' && from !== 'attention') return 'attention';
  if (to === 'celebrate' && from !== 'celebrate') return 'celebrate';
  if (to === 'sparkle' && from !== 'sparkle') return 'sparkle';
  return null;
}

/** The star is part of the face from this size up (as in the canonical mark). */
export const MINO_STAR_MIN_PX = 28;

/** One-shot length for a reaction (ms). */
export function reactionDuration(r: MinoReaction): number {
  switch (r) {
    case 'success':
      return MINO_TIMING.success;
    case 'attention':
      return MINO_TIMING.attention;
    case 'celebrate':
      return MINO_TIMING.celebrate;
    case 'sparkle':
      return MINO_TIMING.sparkle;
    default:
      return MINO_TIMING.blinkClosed;
  }
}
