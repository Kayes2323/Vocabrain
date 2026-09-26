import type { L } from '../model';
import { l } from './pos-kit';
import { FINAL_PARTS, type FinalPart } from './pos-final';
import { TENSE_FINAL_PARTS } from './tenses-final';

/**
 * Final Mastery Challenges, one per module that has one. They share one engine
 * (adaptive picking, report, persistence): Parts of Speech stores its result in
 * `posFinal` (unchanged), every other challenge in `finals[id]`.
 */
export interface ChallengeDef {
  id: string;
  moduleId: string;
  title: L;
  tagline: L;
  mark: string;
  minutes: number;
  parts: FinalPart[];
  /** Concepts the challenge covers: its starting level comes from them. */
  concepts: string[];
  /** How the report groups results: by the word job (Parts of Speech) or by concept (tense by tense). */
  areas: 'pos' | 'concept';
}

export const CHALLENGES: ChallengeDef[] = [
  {
    id: 'pos', moduleId: 'parts-of-speech', mark: '★', minutes: 25, areas: 'pos',
    title: l('Final Mastery Challenge', 'Final Mastery Challenge'), tagline: l('30 items, one report', '৩০টা item, একটা report'),
    parts: FINAL_PARTS,
    concepts: ['pos-noun', 'pos-verb', 'pos-adjective', 'pos-adverb', 'pos-forms', 'pos-pronoun', 'pos-preposition', 'pos-conjunction', 'pos-interjection', 'pos-ielts', 'pos-lab'],
  },
  {
    id: 'tenses', moduleId: 'tenses', mark: 'T★', minutes: 20, areas: 'concept',
    title: l('Tenses Final Mastery Challenge', 'Tenses Final Mastery Challenge'), tagline: l('24 adaptive questions, a tense-by-tense report', '২৪টা adaptive প্রশ্ন, tense ধরে ধরে report'),
    parts: TENSE_FINAL_PARTS,
    concepts: ['present-simple', 'present-continuous', 'past-simple', 'past-continuous', 'present-perfect', 'present-perfect-continuous', 'past-perfect', 'future'],
  },
];

export const getChallenge = (id: string) => CHALLENGES.find((c) => c.id === id);
export const challengeForModule = (moduleId: string) => CHALLENGES.find((c) => c.moduleId === moduleId);
