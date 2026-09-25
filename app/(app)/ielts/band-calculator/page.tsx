'use client';

import { BandCalculator } from '@/components/ielts/BandCalculator';
import { PageHeader } from '@/components/ds';

export default function BandCalculatorPage() {
  return (
    <div>
      <PageHeader
        title="Band score calculator"
        subtitle="Estimate your overall band from four skill scores."
        backHref="/ielts"
        backLabel="IELTS"
      />
      <BandCalculator />
    </div>
  );
}
