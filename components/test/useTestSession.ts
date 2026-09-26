'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createSession, type IELTSSkillId, type PracticeTest, type TestSession } from '@/lib/ielts';
import { readJSON } from '@/lib/services/local-store';
import { useTestSessions } from './useTestSessions';

// The clock is also kept on the device every second, so a refresh resumes the
// timer exactly even if the last background save did not finish.
export const clockKey = (id: string) => `vocabbrain:testClock:${id}`;
const readClock = (id: string) => Number(readJSON<number>(clockKey(id)) ?? 0);
const withLocalClock = (s: TestSession): TestSession =>
  s.status === 'in-progress' ? { ...s, elapsedSeconds: Math.min(s.timeLimitSeconds, Math.max(s.elapsedSeconds, readClock(s.id))) } : s;

/**
 * Loads, starts, resumes and persists one attempt at a test skill. Shared by
 * every runner (Reading, Listening, Writing, Speaking).
 */
export function useTestSession(test: PracticeTest, skill: IELTSSkillId) {
  const router = useRouter();
  const params = useSearchParams();
  const { repository, userId } = useTestSessions();
  const [session, setSession] = useState<TestSession | null>(null);
  const [resumable, setResumable] = useState<TestSession | null | undefined>(undefined);
  // Submitted attempts are final (rules forbid edits), so each is saved once, when it is submitted here.
  const finalised = useRef(new Set<string>());

  useEffect(() => {
    if (session?.status === 'submitted' && !finalised.current.has(session.id)) {
      finalised.current.add(session.id);
      void repository.save(userId, session);
    }
  }, [session, repository, userId]);

  // The attempt named in the URL when the page opened. Read once: later URL
  // updates come from this hook and must not reload over live answers.
  const [initialId] = useState(() => params.get('session'));

  useEffect(() => {
    let cancelled = false;
    const id = initialId;
    (id ? repository.get(userId, id) : repository.findActive(userId, test.id, skill))
      .then((found) => {
        if (cancelled) return;
        if (found?.status === 'submitted') finalised.current.add(found.id);
        if (found && (id || found.status === 'submitted')) setSession(withLocalClock(found));
        else setResumable(found && withLocalClock(found));
      })
      .catch((error) => {
        console.error('[tests] Load failed', error);
        if (!cancelled) setResumable(null);
      });
    return () => {
      cancelled = true;
    };
  }, [repository, userId, test.id, skill, initialId]);

  const save = useCallback((s: TestSession) => repository.save(userId, s), [repository, userId]);

  /** Saves a submitted attempt immediately (e.g. before the server reads it). */
  const saveFinal = useCallback(
    async (s: TestSession) => {
      finalised.current.add(s.id);
      await repository.saveNow(userId, s);
    },
    [repository, userId],
  );

  const start = (existing?: TestSession) => {
    const next = existing ?? createSession(test, skill);
    setSession(next);
    if (!existing) void repository.save(userId, next);
    router.replace(`/ielts/tests/${test.id}/${skill}?session=${next.id}`, { scroll: false });
  };

  const retry = () => {
    setResumable(null);
    setSession(null);
    router.replace(`/ielts/tests/${test.id}/${skill}`, { scroll: false });
  };

  return { session, setSession, resumable, start, retry, save, saveFinal };
}
