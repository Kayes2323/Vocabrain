import type { MinoCapabilityId } from './types';

export interface MinoCapability {
  id: MinoCapabilityId;
  title: string;
  description: string;
  phase: number;
}

export const MINO_CAPABILITIES: MinoCapability[] = [
  { id: 'next-action', title: 'Next Action', description: 'What to do now, in order.', phase: 4 },
  { id: 'ielts-coach', title: 'IELTS Coach', description: 'Your plan, adjusted as you improve.', phase: 4 },
  { id: 'vocabulary-coach', title: 'Vocabulary Coach', description: 'Words from your reading, reviewed at the right time.', phase: 4 },
  { id: 'writing-coach', title: 'Writing Coach', description: 'Feedback on Task 1 and Task 2.', phase: 7 },
  { id: 'speaking-coach', title: 'Speaking Coach', description: 'Voice practice with feedback.', phase: 7 },
  { id: 'study-abroad-advisor', title: 'Study Abroad Advisor', description: 'Countries and courses that fit your goals.', phase: 5 },
  { id: 'scholarship-assistant', title: 'Scholarship Assistant', description: 'Funding you may be eligible for.', phase: 6 },
  { id: 'application-manager', title: 'Application Manager', description: 'Deadlines and tasks across applications.', phase: 6 },
  { id: 'interview-coach', title: 'Interview Coach', description: 'University, scholarship and visa interview practice.', phase: 7 },
];

/** Prompts shown as quick starts on the Mino screen. */
export const MINO_SUGGESTED_PROMPTS = [
  'What should I study today?',
  'My Writing is stuck at 5.5. What should I do?',
  'I want to study Computer Science abroad. What should I prepare?',
  'What should I do next?',
];
