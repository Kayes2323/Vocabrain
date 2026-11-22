import { useCallback, useMemo } from 'react';
import { useProfile } from '@/components/providers/ProfileProvider';
import type { ListeningProgress } from '@/lib/models';
import { recordStageVisit, recommendedNext, continueLearning, weakSkills, topErrors, masteryLevel, lessonsCompletedCount, totalMinutesPracticed } from '@/lib/listening';

/**
 * Reads/writes `profile.listening` the same way Foundation reads/writes
 * `profile.foundation` (same provider, same immutable-update pattern) and
 * derives the Personal Trainer dashboard's answers from it — never from a
 * second, separate store.
 */
export function useListening() {
  const { profile, updateProfile } = useProfile();
  const progress = profile?.listening;

  const visitStage = useCallback(
    (lessonId: string, stageId: string, minutes = 1) => {
      updateProfile((p) => ({ ...p, listening: recordStageVisit(p.listening, lessonId, stageId, minutes) }));
    },
    [updateProfile],
  );

  const derived = useMemo(() => {
    if (!progress) return undefined;
    return {
      recommended: recommendedNext(progress),
      resume: continueLearning(progress),
      weak: weakSkills(progress),
      errors: topErrors(progress),
      mastery: masteryLevel(progress),
      lessonsDone: lessonsCompletedCount(progress),
      minutesPracticed: totalMinutesPracticed(progress),
    };
  }, [progress]);

  return { progress: progress as ListeningProgress | undefined, visitStage, ...derived };
}
