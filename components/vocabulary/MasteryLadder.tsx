import { ChevronRight } from 'lucide-react';
import { MASTERY_LEVELS, MASTERY_LEVEL_INFO } from '@/lib/models';
import { cn } from '@/lib/utils';

/** The learning model, shown so students understand what "knowing a word" means. */
export function MasteryLadder({ className }: { className?: string }) {
  return (
    <ol className={cn('flex flex-wrap items-center gap-x-1 gap-y-2 text-sm', className)} aria-label="Vocabulary mastery levels">
      {MASTERY_LEVELS.map((level, i) => (
        <li key={level} className="flex items-center gap-1">
          <span
            title={MASTERY_LEVEL_INFO[level].description}
            className={cn(
              'rounded-full px-2.5 py-1 font-medium',
              i === MASTERY_LEVELS.length - 1 ? 'bg-success-soft text-success' : 'bg-muted text-muted-foreground',
            )}
          >
            {MASTERY_LEVEL_INFO[level].label}
          </span>
          {i < MASTERY_LEVELS.length - 1 && <ChevronRight className="size-3.5 text-muted-foreground/60" aria-hidden />}
        </li>
      ))}
    </ol>
  );
}
