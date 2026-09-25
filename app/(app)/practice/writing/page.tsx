'use client';

import { Suspense } from 'react';
import { WritingPractice } from '@/components/practice/WritingPractice';

export default function WritingPracticePage() {
  return (
    <Suspense>
      <WritingPractice />
    </Suspense>
  );
}
