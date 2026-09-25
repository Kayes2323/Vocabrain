'use client';

import { useMemo } from 'react';
import { useBrain } from '@/components/providers/BrainProvider';
import { brainSummary, wordsReadyToUse, type MinoBrainContext } from '@/lib/engine';

/** The Brain facts that the plan and Mino need. */
export function useBrainContext(): MinoBrainContext & { loading: boolean } {
  const brain = useBrain();
  return useMemo(() => {
    const s = brainSummary(brain.words);
    const ready = wordsReadyToUse(brain.words, 'writing').find((w) => w.writingUsageCount === 0);
    return { total: s.total, due: s.due, failedLastTime: s.failedLastTime, wordToUse: ready?.word, loading: brain.loading };
  }, [brain.words, brain.loading]);
}
