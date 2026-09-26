'use client';

import { Suspense } from 'react';
import { notFound, useParams } from 'next/navigation';
import { ScreenSkeleton } from '@/components/ds';
import { SpeakingRunner } from '@/components/test/SpeakingRunner';
import { TestRunner } from '@/components/test/TestRunner';
import { WritingRunner } from '@/components/test/WritingRunner';
import { getTest, testSkills } from '@/lib/ielts/content';
import type { IELTSSkillId } from '@/lib/ielts';

export default function TestRunnerPage() {
  const { testId, skill } = useParams<{ testId: string; skill: string }>();
  const test = getTest(testId);
  if (!test || !testSkills(test).includes(skill as IELTSSkillId)) notFound();
  return (
    <Suspense fallback={<ScreenSkeleton />}>
      {skill === 'writing' ? (
        <WritingRunner key={testId} test={test} />
      ) : skill === 'speaking' ? (
        <SpeakingRunner key={testId} test={test} />
      ) : (
        <TestRunner key={`${testId}-${skill}`} test={test} skill={skill as 'reading' | 'listening'} />
      )}
    </Suspense>
  );
}
