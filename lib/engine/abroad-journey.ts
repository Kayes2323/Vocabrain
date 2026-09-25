import { MONTHS } from '@/lib/constants';
import type { StudyAbroadProfile, UserProfile } from '@/lib/models';
import { ieltsJourney } from './journey';

export const ABROAD_STAGE_IDS = [
  'goal',
  'destination',
  'ielts',
  'university',
  'scholarship',
  'application',
  'visa',
  'departure',
] as const;
export type AbroadStageId = (typeof ABROAD_STAGE_IDS)[number];

export function hasAbroadGoal(abroad: StudyAbroadProfile): boolean {
  return Boolean(abroad.degreeLevel || abroad.targetIntake);
}

export function formatIntake(abroad: StudyAbroadProfile): string | undefined {
  const intake = abroad.targetIntake;
  if (!intake?.month || !intake.year) return undefined;
  return `${MONTHS[intake.month - 1]} ${intake.year}`;
}

export interface AbroadJourney {
  stages: { id: AbroadStageId; state: 'done' | 'current' | 'upcoming' }[];
  currentIndex: number;
  /** Completed stages out of the total, as a percentage. */
  percent: number;
}

/**
 * Study Abroad journey. A stage is done only when its completion rule is met:
 * goal = degree or intake set; destination = at least one chosen country;
 * IELTS = the IELTS journey reached Target Ready. Later stages complete once
 * shortlists, scholarships, applications and visa tracking exist.
 */
export function abroadJourney(profile: UserProfile): AbroadJourney {
  const done: Record<AbroadStageId, boolean> = {
    goal: hasAbroadGoal(profile.abroad),
    destination: (profile.abroad.preferredCountryCodes?.length ?? 0) > 0,
    ielts: ieltsJourney(profile).current === 'target-ready' && ieltsJourney(profile).percent === 100,
    university: false,
    scholarship: false,
    application: false,
    visa: false,
    departure: false,
  };
  const currentIndex = Math.max(0, ABROAD_STAGE_IDS.findIndex((id) => !done[id]));
  const completed = ABROAD_STAGE_IDS.filter((id) => done[id]).length;
  return {
    currentIndex,
    percent: Math.round((completed / ABROAD_STAGE_IDS.length) * 100),
    stages: ABROAD_STAGE_IDS.map((id, i) => ({
      id,
      state: done[id] ? 'done' : i === currentIndex ? 'current' : 'upcoming',
    })),
  };
}
