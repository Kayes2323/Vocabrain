import { MONTHS } from '@/lib/constants';
import type { StudyAbroadProfile, UserProfile } from '@/lib/models';

export interface JourneyStage {
  id: string;
  title: string;
}

export const JOURNEY_STAGES: JourneyStage[] = [
  { id: 'ielts', title: 'IELTS preparation' },
  { id: 'countries', title: 'Country shortlist' },
  { id: 'universities', title: 'University shortlist' },
  { id: 'documents', title: 'Documents' },
  { id: 'sop', title: 'Statement of purpose' },
  { id: 'lor', title: 'Recommendation letters' },
  { id: 'application', title: 'Applications' },
  { id: 'offer', title: 'Offer' },
  { id: 'funding', title: 'Funding' },
  { id: 'visa', title: 'Visa' },
  { id: 'departure', title: 'Departure' },
];

export function hasAbroadGoal(abroad: StudyAbroadProfile): boolean {
  return Boolean(abroad.degreeLevel || abroad.targetIntake);
}

export function formatIntake(abroad: StudyAbroadProfile): string | undefined {
  const intake = abroad.targetIntake;
  if (!intake?.month || !intake.year) return undefined;
  return `${MONTHS[intake.month - 1]} ${intake.year}`;
}

export interface JourneyStatus {
  currentIndex: number;
  current: JourneyStage;
  /** 0-100. Completed stages over total. */
  percent: number;
}

/**
 * Where the student is on the journey. Until applications and documents are
 * tracked (Phase 6), everyone is at the IELTS stage and 0% is shown honestly.
 */
export function journeyStatus(_profile: UserProfile): JourneyStatus {
  const currentIndex = 0;
  return {
    currentIndex,
    current: JOURNEY_STAGES[currentIndex],
    percent: Math.round((currentIndex / JOURNEY_STAGES.length) * 100),
  };
}
