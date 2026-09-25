import { Check } from 'lucide-react';
import { JOURNEY_STAGES } from '@/lib/engine';
import { cn } from '@/lib/utils';

/** Vertical stage list with a clear "You are here" marker. */
export function JourneyTimeline({ currentIndex }: { currentIndex: number }) {
  return (
    <ol className="relative space-y-0" aria-label="Study abroad journey">
      {JOURNEY_STAGES.map((stage, i) => {
        const done = i < currentIndex;
        const current = i === currentIndex;
        const last = i === JOURNEY_STAGES.length - 1;
        return (
          <li key={stage.id} className="relative flex gap-3.5 pb-4 last:pb-0" aria-current={current ? 'step' : undefined}>
            {!last && (
              <span
                aria-hidden
                className={cn('absolute top-7 left-[11px] h-[calc(100%-1.25rem)] w-0.5', done ? 'bg-success' : 'bg-border')}
              />
            )}
            <span
              aria-hidden
              className={cn(
                'relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-semibold',
                done && 'border-success bg-success text-white',
                current && 'border-brand bg-brand-soft text-brand',
                !done && !current && 'border-border bg-card text-muted-foreground',
              )}
            >
              {done ? <Check className="size-3.5" /> : i + 1}
            </span>
            <div className="flex min-w-0 flex-1 items-center justify-between gap-3 pt-0.5">
              <span className={cn('text-[15px]', current ? 'font-semibold' : 'text-muted-foreground')}>{stage.title}</span>
              {current && (
                <span className="rounded-full bg-brand px-2.5 py-0.5 text-xs font-medium text-brand-foreground">
                  You are here
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
