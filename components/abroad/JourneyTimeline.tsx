'use client';

import { Check } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { AbroadJourney } from '@/lib/engine';
import { cn } from '@/lib/utils';

/** Study Abroad stages with a clear "You are here" marker. */
export function JourneyTimeline({ journey }: { journey: AbroadJourney }) {
  const { t, n } = useLocale();
  return (
    <ol className="relative" aria-label={t('abroad.journeyTitle')}>
      {journey.stages.map((stage, i) => {
        const last = i === journey.stages.length - 1;
        return (
          <li key={stage.id} className="relative flex gap-3.5 pb-4 last:pb-0" aria-current={stage.state === 'current' ? 'step' : undefined}>
            {!last && (
              <span
                aria-hidden
                className={cn('absolute top-7 left-[11px] h-[calc(100%-1.25rem)] w-0.5', stage.state === 'done' ? 'bg-success' : 'bg-border')}
              />
            )}
            <span
              aria-hidden
              className={cn(
                'relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-semibold',
                stage.state === 'done' && 'border-success bg-success text-white',
                stage.state === 'current' && 'border-brand bg-brand-soft text-brand',
                stage.state === 'upcoming' && 'border-border bg-card text-muted-foreground',
              )}
            >
              {stage.state === 'done' ? <Check className="size-3.5" /> : n(i + 1)}
            </span>
            <div className="flex min-w-0 flex-1 items-center justify-between gap-3 pt-0.5">
              <span className={cn('text-[15px]', stage.state === 'current' ? 'font-semibold' : 'text-muted-foreground')}>
                {t(`abroad.stages.${stage.id}`)}
              </span>
              {stage.state === 'current' && (
                <span className="rounded-full bg-brand px-2.5 py-0.5 text-xs font-medium text-brand-foreground">
                  {t('abroad.youAreHere')}
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
