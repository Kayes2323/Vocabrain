'use client';

import { StatusChip, type Tone } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { WordStatus } from '@/lib/models';

const TONES: Record<WordStatus, Tone> = {
  new: 'neutral',
  learning: 'warning',
  recalling: 'brand',
  active: 'brand',
  strong: 'success',
  mastered: 'success',
};

export function WordStatusChip({ status }: { status: WordStatus }) {
  const { t } = useLocale();
  return <StatusChip tone={TONES[status]}>{t(`brain.status.${status}`)}</StatusChip>;
}
