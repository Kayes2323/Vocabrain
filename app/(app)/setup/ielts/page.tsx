'use client';

import { Suspense } from 'react';
import { IELTSSetupFlow } from '@/components/setup/IELTSSetupFlow';

export default function IELTSSetupPage() {
  return (
    <Suspense>
      <IELTSSetupFlow />
    </Suspense>
  );
}
