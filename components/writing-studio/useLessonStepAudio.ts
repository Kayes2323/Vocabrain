'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { findLessonStepAudio } from '@/lib/writing-studio/audio-manifest';

const STORAGE_KEY = 'vocabbrain:writingStudioAudioOn';

export type LessonAudioStatus = 'no-audio' | 'idle' | 'loading' | 'playing' | 'paused' | 'blocked' | 'completed' | 'error';

function readStoredOn(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== 'off';
  } catch {
    return true;
  }
}

/**
 * Drives one slide's narration clip, keyed by the real step id (never the
 * array index), so a step reorder or a fast double-render can't play the
 * wrong clip. Cancels the previous clip the instant `stepId`/`active`/
 * `audioOn` changes — before the new one is even looked up — so two clips
 * can never overlap and a stale slide's audio can never start late.
 *
 * The ON/OFF choice is a device-local preference (localStorage), never part
 * of the student's profile/progress — switching it, or switching lessons,
 * never touches `useProfile()`.
 */
export function useLessonStepAudio({ lessonId, stepId, active }: { lessonId: string; stepId: string; active: boolean }) {
  const [audioOn, setAudioOnState] = useState(true);
  const [status, setStatus] = useState<LessonAudioStatus>('idle');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // The single source of truth for "which slide's audio is this callback
  // allowed to act on". Every async callback (canplay, play().then/catch,
  // ended, error) checks this before touching state.
  const activeKeyRef = useRef('');
  // Per-visit only (not persisted): which clips have already played through,
  // so turning audio back on doesn't silently replay a finished clip.
  const completedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    setAudioOnState(readStoredOn());
  }, []);

  const setAudioOn = useCallback((on: boolean) => {
    setAudioOnState(on);
    try {
      window.localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off');
    } catch {
      // Device-local convenience only; nothing breaks if it can't be saved.
    }
  }, []);

  useEffect(() => {
    const key = `${lessonId}:${stepId}`;
    activeKeyRef.current = key;

    // Stop whatever was playing for the previous slide immediately.
    const prev = audioRef.current;
    audioRef.current = null;
    if (prev) {
      prev.onended = null;
      prev.onerror = null;
      prev.oncanplay = null;
      prev.pause();
      prev.src = '';
    }

    if (!active) {
      setStatus('idle');
      return;
    }
    const asset = findLessonStepAudio(lessonId, stepId);
    if (!asset) {
      setStatus('no-audio');
      return;
    }
    if (!audioOn) {
      setStatus('idle');
      return;
    }
    if (completedRef.current.has(key)) {
      setStatus('completed');
      return;
    }

    setStatus('loading');
    const a = new Audio(asset.path);
    audioRef.current = a;
    a.preload = 'auto';
    a.onended = () => {
      if (activeKeyRef.current !== key) return;
      completedRef.current.add(key);
      setStatus('completed');
    };
    a.onerror = () => {
      if (activeKeyRef.current !== key) return;
      setStatus('error');
    };
    a.oncanplay = () => {
      if (activeKeyRef.current !== key || audioRef.current !== a) return;
      a.play().then(
        () => {
          if (activeKeyRef.current !== key || audioRef.current !== a) return;
          setStatus('playing');
        },
        () => {
          // Autoplay was blocked by the browser — expected on a learner's
          // first visit, especially on Android Chrome / iOS Safari.
          if (activeKeyRef.current !== key || audioRef.current !== a) return;
          setStatus('blocked');
        },
      );
    };

    return () => {
      a.onended = null;
      a.onerror = null;
      a.oncanplay = null;
      a.pause();
      a.src = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId, stepId, active, audioOn]);

  const play = useCallback(() => {
    const a = audioRef.current;
    const key = activeKeyRef.current;
    if (!a) return;
    a.play().then(
      () => {
        if (activeKeyRef.current !== key) return;
        setStatus('playing');
      },
      () => {
        if (activeKeyRef.current !== key) return;
        setStatus('blocked');
      },
    );
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setStatus((s) => (s === 'playing' || s === 'blocked' ? 'paused' : s));
  }, []);

  const replay = useCallback(() => {
    const a = audioRef.current;
    const key = activeKeyRef.current;
    if (!a) return;
    completedRef.current.delete(key);
    a.currentTime = 0;
    a.play().then(
      () => {
        if (activeKeyRef.current !== key) return;
        setStatus('playing');
      },
      () => {
        if (activeKeyRef.current !== key) return;
        setStatus('blocked');
      },
    );
  }, []);

  return { status, audioOn, setAudioOn, play, pause, replay };
}
