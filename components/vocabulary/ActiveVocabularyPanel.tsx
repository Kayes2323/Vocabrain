'use client';

import { Panel, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { VocabularySummary } from '@/lib/engine';

/** "You've seen N words, M are active": what the student can actually use. */
export function ActiveVocabularyPanel({ summary }: { summary: VocabularySummary }) {
  const { t, n } = useLocale();
  const dims: { key: string; value?: number }[] = [
    { key: 'recognition', value: summary.seen },
    { key: 'recall', value: summary.active },
    { key: 'writing' },
    { key: 'speaking' },
  ];
  return (
    <Panel className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <p className="font-semibold text-pretty">
          {summary.seen > 0
            ? t('vocabulary.activeSummary', { seen: summary.seen, active: summary.active })
            : t('vocabulary.activeEmpty')}
        </p>
        <StatusChip tone="brand">{t('vocabulary.saved', { n: summary.saved })}</StatusChip>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {dims.map((d) => (
          <div key={d.key} className="rounded-xl bg-muted/60 px-3 py-2.5">
            <p className="text-xs text-muted-foreground">{t(`vocabulary.dims.${d.key}`)}</p>
            <p className="text-lg font-semibold tabular-nums">{d.value === undefined ? t('common.soon') : n(d.value)}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">{t('vocabulary.activeExplain')}</p>
    </Panel>
  );
}
