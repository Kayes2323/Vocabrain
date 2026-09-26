// The test library. Add a book by importing it here; the engine and pages need
// no changes. Publisher content (e.g. Cambridge IELTS 11–21) may only be added
// with `sourceType: 'licensed-publisher'` and `licenseStatus: 'licensed'`.
import type { IELTSSkillId, ObjectiveSkill, PracticeTest, TestBook } from '../model';
import { isPublishable } from '../validate';
import { practiceTest1 } from './demo/practice-test-1';

const ALL_BOOKS: TestBook[] = [
  {
    id: 'vb-practice',
    series: 'vocab-brain',
    title: 'Vocab Brain Practice Tests',
    order: 0,
    source: 'Vocab Brain',
    sourceType: 'vocab-brain-original',
    licenseStatus: 'original',
    dateAdded: '2026-09-26',
    tests: [practiceTest1],
  },
];

/** Books students can see: publishable only, newest edition first. */
export const BOOKS: TestBook[] = ALL_BOOKS.filter(isPublishable)
  .map((b) => ({ ...b, tests: b.tests.filter(isPublishable) }))
  .sort((a, b) => b.order - a.order);

export function getBook(id: string): TestBook | undefined {
  return BOOKS.find((b) => b.id === id);
}

export function getTest(id: string): PracticeTest | undefined {
  return BOOKS.flatMap((b) => b.tests).find((t) => t.id === id);
}

/** Skills a test can run in the engine today (objective sections). */
export function objectiveSkills(test: PracticeTest): ObjectiveSkill[] {
  return (['listening', 'reading'] as const).filter((s) => test.sections[s]);
}

export { ALL_BOOKS };

/** Every skill a test has, in test order. */
export function testSkills(test: PracticeTest): IELTSSkillId[] {
  return (['listening', 'reading', 'writing', 'speaking'] as const).filter((s) => test.sections[s]);
}
