'use client';

import Link from 'next/link';
import { ArrowRight, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel } from '@/components/ds';
import { useBrain } from '@/components/providers/BrainProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { brainSummary } from '@/lib/engine';

/** "My Brain" at a glance: saved, due today, and words the student can actually use. */
export function BrainSummaryPanel() {
  const { t, n } = useLocale();
  const brain = useBrain();
  const s = brainSummary(brain.words);
  const active = s.byStatus.active + s.byStatus.strong + s.byStatus.mastered;

  return (
    <Panel className="space-y-4">
      <div className="flex items-center gap-2">
        <BrainCircuit className="size-5 text-brand" aria-hidden />
        <p className="font-semibold">{t('brain.title')}</p>
      </div>
      <p className="text-[15px] text-pretty">
        {s.total === 0 ? t('brain.summaryEmpty') : t('brain.summary', { total: s.total, active })}
      </p>
      <div className="grid grid-cols-3 gap-2">
        {[
          [t('brain.stats.saved'), s.total],
          [t('brain.stats.due'), s.due],
          [t('brain.stats.active'), active],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-muted/60 px-3 py-2.5">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-lg font-semibold tabular-nums">{n(value as number)}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        {s.due > 0 ? (
          <Button asChild>
            <Link href="/review">
              {t('home.startReview')} <ArrowRight />
            </Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/ielts/reading">{t('brain.emptyCta')}</Link>
          </Button>
        )}
        <Button asChild variant="outline">
          <Link href="/ielts/vocabulary/notebook">{t('brain.open')}</Link>
        </Button>
      </div>
    </Panel>
  );
}
