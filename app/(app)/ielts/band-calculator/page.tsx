'use client';

import { BandCalculator } from '@/components/ielts/BandCalculator';
import { PageHeader } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';

export default function BandCalculatorPage() {
  const { t } = useLocale();
  return (
    <div>
      <PageHeader
        title={t('sections.band-calculator.title')}
        subtitle={t('calculator.subtitle')}
        backHref="/ielts"
        backLabel={t('nav.ielts')}
      />
      <BandCalculator />
    </div>
  );
}
