import { DEGREE_LEVELS } from '@/lib/constants';
import { formatIntake, overallBand, weeksUntilTest } from '@/lib/engine';
import { getCountry } from '@/lib/content/countries';
import type { UserProfile } from '@/lib/models';
import type { MinoContext } from './types';

export function buildMinoContext(profile: UserProfile): MinoContext {
  const { ielts, abroad, vocabulary } = profile;
  return {
    ielts: {
      targetBand: ielts.targetBand,
      currentBands: { ...ielts.currentBands },
      estimatedOverall: overallBand(ielts.currentBands),
      weeksUntilTest: weeksUntilTest(ielts),
      weeklyStudyHours: ielts.weeklyStudyHours,
    },
    vocabulary: {
      lastLessonId: vocabulary.lastLessonId,
      savedWordCount: vocabulary.savedWordIds.length,
    },
    abroad: {
      degreeLevel: DEGREE_LEVELS.find((d) => d.id === abroad.degreeLevel)?.label,
      subject: abroad.subject,
      targetIntake: formatIntake(abroad),
      preferredCountries: abroad.preferredCountryCodes?.map((c) => getCountry(c)?.name ?? c),
    },
  };
}
