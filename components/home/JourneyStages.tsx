'use client';

import { Check } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { JourneyStageStatus } from '@/lib/engine';
import { cn } from '@/lib/utils';

/** Compact vertical stage list: ✓ done, ● current, ○ upcoming. */
export function JourneyStages({ stages }: { stages: JourneyStageStatus[] }) {
  const { t } = useLocale();
  return (
    <ol className="space-y-2.5">
      {stages.map((s) => (
        <li key={s.id} className="flex items-center gap-3" aria-current={s.state === 'current' ? 'step' : undefined}>
          <span
            aria-hidden
            className={cn(
              'flex size-5 shrink-0 items-center justify-center rounded-full border-2',
              s.state === 'done' && 'border-success bg-success text-white',
              s.state === 'current' && 'border-brand bg-brand-soft',
              s.state === 'upcoming' && 'border-border',
            )}
          >
            {s.state === 'done' && <Check className="size-3" />}
            {s.state === 'current' && <span className="size-2 rounded-full bg-brand" />}
          </span>
          <span className={cn('text-[15px]', s.state === 'current' ? 'font-semibold' : 'text-muted-foreground')}>
            {t(`journey.stages.${s.id}`)}
          </span>
        </li>
      ))}
    </ol>
  );
}
