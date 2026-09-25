'use client';

import { Suspense } from 'react';
import { SpeakingPractice } from '@/components/practice/SpeakingPractice';

export default function SpeakingPracticePage() {
  return (
    <Suspense>
      <SpeakingPractice />
    </Suspense>
  );
}
