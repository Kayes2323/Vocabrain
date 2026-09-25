import { cn } from '@/lib/utils';
import { TONE_SOFT, type Tone } from './tone';

export function StatusChip({
  tone = 'neutral',
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex h-6 shrink-0 items-center gap-1 rounded-full px-2.5 text-xs font-medium whitespace-nowrap',
        TONE_SOFT[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
