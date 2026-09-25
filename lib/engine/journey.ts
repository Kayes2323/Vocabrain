import type { UserProfile } from '@/lib/models';
import { knownSkillCount, overallBand } from './ielts';

/**
 * The IELTS journey. Every stage has an explicit completion rule based on
 * what the student has actually done, so progress is never an arbitrary number.
 */
export const JOURNEY_STAGE_IDS = ['starting-point', 'foundation', 'skill-building', 'mock-tests', 'target-ready'] as const;
export type JourneyStageId = (typeof JOURNEY_STAGE_IDS)[number];

export const JOURNEY_RULES = {
  /** Completed daily-plan tasks to finish Foundation. */
  foundationTasks: 10,
  /** Completed tasks to finish Skill Building... */
  skillBuildingTasks: 40,
  /** ...including at least this many of each practice kind. */
  skillBuildingPerSkill: 5,
  skillBuildingKinds: ['vocabulary', 'reading', 'writing', 'speaking'] as const,
  /** Full mock tests to finish the Mock Tests stage. */
  mockTests: 2,
} as const;

export interface JourneyStageStatus {
  id: JourneyStageId;
  state: 'done' | 'current' | 'upcoming';
  /** 0-1 progress inside this stage. */
  progress: number;
}

export interface IELTSJourney {
  stages: JourneyStageStatus[];
  current: JourneyStageId;
  /** 0-100, from completed stages plus progress inside the current one. */
  percent: number;
}

function totalTasks(profile: UserProfile): number {
  return Object.values(profile.study.completedTasks).reduce<number>((s, n) => s + (n ?? 0), 0);
}

function stageProgress(id: JourneyStageId, profile: UserProfile): number {
  const { ielts, study } = profile;
  const tasks = totalTasks(profile);
  switch (id) {
    case 'starting-point':
      return ielts.diagnostic ? 1 : knownSkillCount(ielts.currentBands) / 4;
    case 'foundation':
      return Math.min(1, tasks / JOURNEY_RULES.foundationTasks);
    case 'skill-building': {
      const perSkill = JOURNEY_RULES.skillBuildingKinds.map((s) =>
        Math.min(1, (study.completedTasks[s] ?? 0) / JOURNEY_RULES.skillBuildingPerSkill),
      );
      const skillShare = perSkill.reduce((a, b) => a + b, 0) / perSkill.length;
      const taskShare = Math.min(1, tasks / JOURNEY_RULES.skillBuildingTasks);
      return Math.min(skillShare, taskShare);
    }
    case 'mock-tests':
      return Math.min(1, study.mockTestsCompleted / JOURNEY_RULES.mockTests);
    case 'target-ready': {
      const overall = overallBand(ielts.currentBands);
      if (overall === undefined || ielts.targetBand === undefined) return 0;
      return overall >= ielts.targetBand ? 1 : 0;
    }
  }
}

export function ieltsJourney(profile: UserProfile): IELTSJourney {
  let currentIndex = JOURNEY_STAGE_IDS.length - 1;
  const progress = JOURNEY_STAGE_IDS.map((id) => stageProgress(id, profile));
  for (let i = 0; i < progress.length; i++) {
    if (progress[i] < 1) {
      currentIndex = i;
      break;
    }
  }
  const allDone = progress.every((p) => p >= 1);
  const stages: JourneyStageStatus[] = JOURNEY_STAGE_IDS.map((id, i) => ({
    id,
    progress: progress[i],
    state: allDone || i < currentIndex ? 'done' : i === currentIndex ? 'current' : 'upcoming',
  }));
  const percent = allDone
    ? 100
    : Math.round(((currentIndex + progress[currentIndex]) / JOURNEY_STAGE_IDS.length) * 100);
  return { stages, current: JOURNEY_STAGE_IDS[currentIndex], percent };
}
