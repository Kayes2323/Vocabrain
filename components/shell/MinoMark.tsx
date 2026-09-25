import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Mino's avatar: a restrained indigo mark, used wherever Mino speaks. */
export function MinoMark({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-[oklch(0.45_0.2_290)] text-brand-foreground shadow-sm',
        size === 'sm' && 'size-7 [&_svg]:size-3.5',
        size === 'md' && 'size-9 [&_svg]:size-4',
        size === 'lg' && 'size-14 [&_svg]:size-6',
        className,
      )}
    >
      <Sparkles />
    </span>
  );
}
