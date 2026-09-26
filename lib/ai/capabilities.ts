import type { MinoCapabilityId } from './types';

export interface MinoCapability {
  id: MinoCapabilityId;
  title: string;
  description: string;
  phase: number;
}

/** Internal registry of Mino capabilities and the roadmap phase that ships each. */
export const MINO_CAPABILITIES: MinoCapability[] = [
  { id: 'next-action', title: 'Next Best Action', description: 'What to do now, in order.', phase: 1 },
  { id: 'study-planner', title: 'Study Planner', description: 'Daily plan, minimum day and catch-up.', phase: 2 },
  { id: 'ielts-coach', title: 'IELTS Mentor', description: 'Plan and advice from the student journey.', phase: 3 },
  { id: 'vocabulary-coach', title: 'Vocabulary Coach', description: 'Meaning, collocation and usage of saved words.', phase: 3 },
  { id: 'writing-coach', title: 'Writing Coach', description: 'Examiner Mode and Teacher Mode for Task 1 and 2.', phase: 3 },
  { id: 'speaking-coach', title: 'Speaking Coach', description: 'Part 1-3 voice practice with feedback.', phase: 3 },
  { id: 'study-abroad-advisor', title: 'Study Abroad Guide', description: 'Country discovery and shortlists.', phase: 4 },
  { id: 'application-manager', title: 'Application & Deadline Assistant', description: 'Tasks and dates across applications.', phase: 5 },
  { id: 'sop-assistant', title: 'SOP Assistant', description: 'Structure and feedback, from true information only.', phase: 5 },
  { id: 'cv-assistant', title: 'CV Assistant', description: 'Academic CV structure and wording.', phase: 5 },
  { id: 'lor-assistant', title: 'LOR Assistant', description: 'Organise recommender information.', phase: 5 },
  { id: 'interview-coach', title: 'Interview Coach', description: 'University, scholarship and visa interview practice.', phase: 6 },
];

/**
 * Quick-start prompts on the Mino screen (copy under `mino.prompts`).
 * `minimumDay` is handled locally: it switches today's plan to 15 minutes.
 */
export const MINO_PROMPT_IDS = ['today', 'writingStuck', 'plan', 'minimumDay'] as const;
export type MinoPromptId = (typeof MINO_PROMPT_IDS)[number];
