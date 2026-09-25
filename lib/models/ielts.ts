import type { IELTSSkill } from '@/lib/constants';
import type { ID, ISODate } from './common';

export type PlanPhaseId = 'foundation' | 'skill-building' | 'timed-practice' | 'mock-tests' | 'final-prep';

export interface IELTSPlanPhase {
  id: PlanPhaseId;
  title: string;
  startWeek: number;
  endWeek: number;
}

/** Minutes per skill per study day. Rebalanced as skill tracking improves. */
export type SkillAllocation = Partial<Record<IELTSSkill | 'vocabulary', number>>;

export interface IELTSPlan {
  id: ID;
  userId: ID;
  createdAt: ISODate;
  totalWeeks: number;
  phases: IELTSPlanPhase[];
  dailyAllocation: SkillAllocation;
  /** Why the plan changed last, shown to the student ("Writing +10 min"). */
  lastAdjustment?: { at: ISODate; reason: string };
}

export interface IELTSActivity {
  id: ID;
  userId: ID;
  skill: IELTSSkill | 'vocabulary';
  kind: 'practice' | 'mock-test' | 'lesson' | 'review';
  minutes: number;
  score?: number;
  completedAt: ISODate;
}

export interface WritingAttempt {
  id: ID;
  userId: ID;
  task: 'task1' | 'task2';
  prompt: string;
  response: string;
  targetWordIds?: ID[];
  estimatedBand?: number;
  submittedAt: ISODate;
}

export interface SpeakingAttempt {
  id: ID;
  userId: ID;
  part: 1 | 2 | 3;
  prompt: string;
  transcript?: string;
  audioUrl?: string;
  targetWordIds?: ID[];
  estimatedBand?: number;
  submittedAt: ISODate;
}
