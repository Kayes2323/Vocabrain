import { cn } from '@/lib/utils';
import { TONE_SOLID, type Tone } from './tone';

interface ProgressBarProps {
  /** 0-100 */
  value: number;
  label: string;
  tone?: Tone;
  size?: 'sm' | 'md';
  className?: string;
}

export function ProgressBar({ value, label, tone = 'brand', size = 'md', className }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      className={cn('w-full overflow-hidden rounded-full bg-muted', size === 'sm' ? 'h-1.5' : 'h-2', className)}
    >
      <div
        className={cn('h-full rounded-full transition-[width] duration-500', TONE_SOLID[tone])}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
