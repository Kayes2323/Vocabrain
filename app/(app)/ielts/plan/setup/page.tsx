'use client';

import { Suspense } from 'react';
import { ScreenSkeleton } from '@/components/ds';
import { PlanSetupFlow } from '@/components/plan/PlanSetupFlow';

export default function MyPlanSetupPage() {
  return (
    <Suspense fallback={<ScreenSkeleton />}>
      <PlanSetupFlow />
    </Suspense>
  );
}
