import type { Concept, Exercise, L, Lesson } from '../model';

/**
 * Module 2 — Tenses for IELTS, lessons 3–6 (v1 format; 1–2 are in tenses-v2.ts). Original Vocab Brain lessons. Tenses are taught
 * through IELTS tasks (Task 1 data, Speaking about experience, time changes in
 * Listening and Reading), not memorised tables.
 */

const l = (en: string, bn: string): L => ({ en, bn });

export const TENSE_CONCEPTS: Concept[] = [
  { id: 'time', title: l('Understanding Time', 'সময় বোঝা'), lessonId: 't-1', tag: 'tense' },
  { id: 'present-simple', title: l('Present Simple', 'Present Simple'), lessonId: 't-2', tag: 'tense' },
  { id: 'present-continuous', title: l('Present Continuous', 'Present Continuous'), lessonId: 't-3', tag: 'tense' },
  { id: 'past-simple', title: l('Past Simple', 'Past Simple'), lessonId: 't-4', tag: 'tense' },
  { id: 'past-continuous', title: l('Past Continuous', 'Past Continuous'), lessonId: 't-5', tag: 'tense' },
  { id: 'present-perfect', title: l('Present Perfect', 'Present Perfect'), lessonId: 't-6', tag: 'tense' },
  { id: 'past-perfect', title: l('Past Perfect', 'Past Perfect'), lessonId: 't-7', tag: 'tense' },
  { id: 'future', title: l('Future forms', 'Future forms'), lessonId: 't-8', tag: 'tense' },
  { id: 'present-perfect-continuous', title: l('Present Perfect Continuous', 'Present Perfect Continuous'), lessonId: 't-13', tag: 'tense' },
];

const practice = (exercises: Exercise[]) => ({ kind: 'practice' as const, title: l('Practice', 'Practice'), exercises });
const recall = (...points: L[]) => ({ kind: 'recall' as const, title: l('Remember', 'মনে রাখো'), points });
const ielts = (uses: Extract<Lesson['steps'][number], { kind: 'ielts' }>['uses']) => ({
  kind: 'ielts' as const,
  title: l('IELTS connection', 'IELTS-এ কোথায় লাগবে'),
  uses,
});

/** The v1 lessons 3–6 were rebuilt in the v2 format (tenses-core.ts). */
export const tensesLessons: Lesson[] = [];
