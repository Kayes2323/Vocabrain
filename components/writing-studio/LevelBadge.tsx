import { cn } from '@/lib/utils';
import { INDEPENDENCE_LABEL, type IndependenceLevel } from '@/lib/writing-studio/types';

/** The four-level gradual-independence indicator (spec §13). */
export function LevelBadge({ level, className }: { level: IndependenceLevel; className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex gap-1" aria-hidden>
        {([1, 2, 3, 4] as const).map((n) => (
          <span key={n} className={cn('h-1.5 w-5 rounded-full', n <= level ? 'bg-brand' : 'bg-muted')} />
        ))}
      </div>
      <span className="text-xs font-medium text-muted-foreground">
        Level {level} · {INDEPENDENCE_LABEL[level]}
      </span>
    </div>
  );
}
