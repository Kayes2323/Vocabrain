'use client';
/**
 * Who needs Mino right now. The decorative rotation (components/mino/MinoLivingMascot.tsx) must never compete with a
 * context-specific Mino: a teaching panel, the "reading your answer" loader, the chat answering, a voice playing.
 * Two kinds of claim, both reference-counted and released on unmount/end, so nothing can get stuck "busy":
 *  - presence: a MinoCoachMascot that teaches/reacts is on screen (registered automatically by the mascot);
 *  - calm: something is playing audio/speech (call `holdMinoCalm()` for the duration, release when it ends).
 */
import { useSyncExternalStore } from 'react';

let presence = 0;
let calm = 0;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const once = (fn: () => void) => {
  let done = false;
  return () => {
    if (done) return;
    done = true;
    fn();
  };
};

/** A context-specific Mino is on screen. Returns the release function. */
export function registerMinoPresence(): () => void {
  presence += 1;
  emit();
  return once(() => {
    presence = Math.max(0, presence - 1);
    emit();
  });
}

/** Audio / speech is playing: decorative motion stays calm until released. Returns the release function. */
export function holdMinoCalm(): () => void {
  calm += 1;
  emit();
  return once(() => {
    calm = Math.max(0, calm - 1);
    emit();
  });
}

export const minoContextBusy = (): boolean => presence > 0 || calm > 0;

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

/** React hook: true while any context-specific Mino or audio needs the stage. */
export function useMinoContextBusy(): boolean {
  return useSyncExternalStore(subscribe, minoContextBusy, () => false);
}

/** Test/inspection only. */
export const minoBusyCounts = () => ({ presence, calm });
