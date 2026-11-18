'use client';

import { useSearchParams } from 'next/navigation';
import { testSkills } from '@/lib/ielts/content';
import type { IELTSSkillId, PracticeTest } from '@/lib/ielts';

/** The order of exam day. */
export const FULL_MOCK_ORDER: IELTSSkillId[] = ['listening', 'reading', 'writing', 'speaking'];

export const fullMockHref = (testId: string, skill: IELTSSkillId) => `/ielts/tests/${testId}/${skill}?full=1`;

/**
 * Whether this section is being taken as part of a Full Mock Test (the Full Mock
 * Test pages link here with ?full=1), and where to go next. Outside a full test
 * every section behaves as a stand-alone practice test.
 */
export function useFullMock(test: PracticeTest, skill: IELTSSkillId) {
  const asked = useSearchParams().get('full') === '1';
  const skills = FULL_MOCK_ORDER.filter((s) => testSkills(test).includes(s));
  const full = asked && skills.length === 4;
  const index = skills.indexOf(skill);
  const nextSkill = skills[index + 1] as IELTSSkillId | undefined;
  return {
    full,
    /** 1-based position in the exam. */
    step: index + 1,
    count: skills.length,
    overviewHref: `/ielts/full-mock-test/${test.id}`,
    resultHref: `/ielts/full-mock-test/${test.id}/result`,
    nextSkill,
    nextHref: nextSkill ? fullMockHref(test.id, nextSkill) : undefined,
  };
}
