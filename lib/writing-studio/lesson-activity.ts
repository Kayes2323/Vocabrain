'use client';
/**
 * Which Writing Studio lessons the learner has started but not finished, so the course library can say "In progress" and
 * offer a real "Continue". A lesson's COMPLETION is the learner's profile record (unchanged); the lesson runner keeps no
 * step-level state, so "started" is only a small per-device marker: { lessonId: lastActivityMs } in localStorage. It never
 * touches the profile, scores or progress schema, and it is safe to lose (the card just says "Start" again).
 */
import { useEffect, useState } from 'react';
import type { StartedLessons } from './navigation';

export const STARTED_LESSONS_KEY = 'mino.ws.startedLessons';
const EVENT = 'mino:ws-started';

export function readStartedLessons(): StartedLessons {
  try {
    const raw = JSON.parse(localStorage.getItem(STARTED_LESSONS_KEY) ?? '{}') as unknown;
    if (!raw || typeof raw !== 'object') return {};
    return Object.fromEntries(Object.entries(raw as Record<string, unknown>).filter(([, v]) => typeof v === 'number')) as StartedLessons;
  } catch {
    return {};
  }
}

/** Record that the learner has moved into a lesson (called when they advance past its first step). */
export function markLessonStarted(lessonId: string): void {
  try {
    localStorage.setItem(STARTED_LESSONS_KEY, JSON.stringify({ ...readStartedLessons(), [lessonId]: Date.now() }));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // Storage blocked: lessons simply stay "Start".
  }
}

/** The started-lessons map for rendering (empty on the server and first paint, so there is no hydration mismatch). */
export function useStartedLessons(): StartedLessons {
  const [started, setStarted] = useState<StartedLessons>({});
  useEffect(() => {
    const sync = () => setStarted(readStartedLessons());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);
  return started;
}
