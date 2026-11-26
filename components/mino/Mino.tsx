import type { MinoReaction } from '@/lib/mino/motion';

export type { MinoMode, MinoReaction } from '@/lib/mino/motion';

const REACT_EVENT = 'mino:react';

/**
 * Ask Mino for a one-shot reaction (a feature opened → "blink", a finished task → "success", something important →
 * "attention"). Purely visual and best-effort: the event is dispatched on `window`; any Mino surface may listen.
 *
 * (The old drawn "two-bar" mark that used to live in this file is gone: Mino is now only ever the approved logo
 * (components/brand/MinoLogo.tsx) or the layered mascot (components/mino/MinoCoachMascot.tsx).)
 */
export function minoReact(reaction: MinoReaction) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<MinoReaction>(REACT_EVENT, { detail: reaction }));
}
