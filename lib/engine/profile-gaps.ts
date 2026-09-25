import type { UserProfile } from '@/lib/models';
import { knownSkillCount } from './ielts';

export type ProfileGapId = 'onboarding' | 'target' | 'startingPoint' | 'studyTime' | 'testDate' | 'intake';

export interface ProfileGap {
  id: ProfileGapId;
  /** i18n keys: `gaps.<id>.title` and `gaps.<id>.why`. */
  href: string;
}

/**
 * Information Gap System: the single next piece of information worth asking
 * for, in order of usefulness. Never asks for everything at once.
 */
export function nextProfileGap(profile: UserProfile): ProfileGap | undefined {
  const { ielts, abroad, goal } = profile;
  if (!profile.onboardedAt) return { id: 'onboarding', href: '/onboarding' };
  if (ielts.targetBand === undefined) return { id: 'target', href: '/setup/ielts?step=target' };
  if (!ielts.diagnostic && knownSkillCount(ielts.currentBands) < 4) return { id: 'startingPoint', href: '/ielts/diagnostic' };
  if (!ielts.weeklyStudyHours) return { id: 'studyTime', href: '/setup/ielts?step=time' };
  if (!ielts.testDate && !ielts.testDateUnknown) return { id: 'testDate', href: '/setup/ielts?step=date' };
  if (goal === 'abroad' && !abroad.targetIntake) return { id: 'intake', href: '/setup/abroad' };
  return undefined;
}
