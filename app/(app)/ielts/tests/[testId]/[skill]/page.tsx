'use client';

import { Suspense } from 'react';
import { notFound, useParams } from 'next/navigation';
import { ScreenSkeleton } from '@/components/ds';
import { TestRunner } from '@/components/test/TestRunner';
import { getTest, objectiveSkills } from '@/lib/ielts/content';
import type { ObjectiveSkill } from '@/lib/ielts';

export default function TestRunnerPage() {
  const { testId, skill } = useParams<{ testId: string; skill: string }>();
  const test = getTest(testId);
  if (!test || !objectiveSkills(test).includes(skill as ObjectiveSkill)) notFound();
  return (
    <Suspense fallback={<ScreenSkeleton />}>
      <TestRunner key={`${testId}-${skill}`} test={test} skill={skill as ObjectiveSkill} />
    </Suspense>
  );
}
