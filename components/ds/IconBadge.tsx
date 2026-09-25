import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TONE_SOFT, type Tone } from './tone';

export function IconBadge({
  icon: Icon,
  tone = 'neutral',
  size = 'md',
  className,
}: {
  icon: LucideIcon;
  tone?: Tone;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-xl',
        size === 'sm' && 'size-8 [&_svg]:size-4',
        size === 'md' && 'size-10 [&_svg]:size-5',
        size === 'lg' && 'size-12 rounded-2xl [&_svg]:size-6',
        TONE_SOFT[tone],
        className,
      )}
    >
      <Icon />
    </span>
  );
}
