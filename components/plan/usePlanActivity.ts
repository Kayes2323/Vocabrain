'use client';

import { useEffect, useMemo, useState } from 'react';
import { useBrain } from '@/components/providers/BrainProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { useTestSessions } from '@/components/test/useTestSessions';
import { brainSummary, localDateKey, sectionsByDate, type ActivityContext } from '@/lib/engine';
import type { IELTSSkill } from '@/lib/constants';

/** Submitted test sections by date (loaded once; empty until they arrive). */
export function useTestSections(): Record<string, IELTSSkill[]> {
  const { repository, userId } = useTestSessions();
  const [sections, setSections] = useState<Record<string, IELTSSkill[]>>({});
  useEffect(() => {
    let live = true;
    repository.list(userId).then(
      (sessions) => live && setSections(sectionsByDate(sessions)),
      (e) => console.error('[plan] Test history failed', e),
    );
    return () => {
      live = false;
    };
  }, [repository, userId]);
  return sections;
}

/** Everything the plan needs to know what the student actually did. */
export function usePlanActivity(): ActivityContext | undefined {
  const { profile } = useProfile();
  const brain = useBrain();
  const sections = useTestSections();
  const today = localDateKey();
  const counts = useMemo(() => {
    if (brain.loading) return undefined;
    const s = brainSummary(brain.words);
    return { total: s.total, due: s.due };
  }, [brain.words, brain.loading]);
  return useMemo(() => (profile ? { profile, sections, today, brain: counts } : undefined), [profile, sections, today, counts]);
}
