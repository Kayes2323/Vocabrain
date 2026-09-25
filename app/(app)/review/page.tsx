'use client';

import { Suspense } from 'react';
import { ReviewSession } from '@/components/review/ReviewSession';

export default function ReviewPage() {
  return (
    <Suspense>
      <ReviewSession />
    </Suspense>
  );
}
