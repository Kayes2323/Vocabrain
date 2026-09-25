import type { ID, ISODate } from './common';

export type Pillar = 'ielts' | 'vocabulary' | 'abroad' | 'profile';

/** One concrete thing the student should do next. The core unit of Mino. */
export interface NextAction {
  id: string;
  pillar: Pillar;
  title: string;
  reason: string;
  href: string;
  cta: string;
  /** Lower runs first. */
  priority: number;
  estimatedMinutes?: number;
}

export interface MinoMessage {
  id: ID;
  role: 'student' | 'mino';
  text: string;
  createdAt: ISODate;
}

export interface MinoConversation {
  id: ID;
  userId: ID;
  messages: MinoMessage[];
  createdAt: ISODate;
}

export interface MinoRecommendation {
  id: ID;
  userId: ID;
  actions: NextAction[];
  generatedAt: ISODate;
  /** "rules" today; an AI capability later. */
  generatedBy: 'rules' | 'ai';
}
