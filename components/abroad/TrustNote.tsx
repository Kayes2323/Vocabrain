'use client';

import { ShieldCheck } from 'lucide-react';
import { Callout } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';

export function TrustNote() {
  const { t } = useLocale();
  return (
    <Callout icon={ShieldCheck} title={t('abroad.trustTitle')}>
      {t('abroad.trustBody')}
    </Callout>
  );
}
