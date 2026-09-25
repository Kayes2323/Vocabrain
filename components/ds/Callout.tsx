import { Info, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TONE_SOFT, type Tone } from './tone';

/** Inline notice for trust, source and status messages. */
export function Callout({
  tone = 'neutral',
  icon: Icon = Info,
  title,
  children,
  className,
}: {
  tone?: Tone;
  icon?: LucideIcon;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex gap-3 rounded-xl p-4 text-sm', TONE_SOFT[tone], className)} role="note">
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div className="space-y-0.5 text-foreground/80">
        {title && <p className="font-medium text-foreground">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}
