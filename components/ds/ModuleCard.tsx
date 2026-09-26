import Link from 'next/link';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Soft section colours. One tint per section, not per card. */
export type Tint = 'brand' | 'lavender' | 'blue' | 'green' | 'yellow' | 'neutral';

const TINT_ICON: Record<Tint, string> = {
  brand: 'bg-brand text-brand-foreground',
  lavender: 'bg-tint-lavender text-tint-lavender-fg',
  blue: 'bg-tint-blue text-tint-blue-fg',
  green: 'bg-tint-green text-tint-green-fg',
  yellow: 'bg-tint-yellow text-tint-yellow-fg',
  neutral: 'bg-muted text-muted-foreground',
};

const TINT_BAR: Record<Tint, string> = {
  brand: 'bg-brand',
  lavender: 'bg-tint-lavender-fg',
  blue: 'bg-tint-blue-fg',
  green: 'bg-tint-green-fg',
  yellow: 'bg-tint-yellow-fg',
  neutral: 'bg-muted-foreground',
};

interface ModuleCardProps {
  title: string;
  subtitle?: React.ReactNode;
  icon: LucideIcon;
  tint?: Tint;
  /** 0–100. Shown as a thin bar when set. */
  progress?: number;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  /** Small element at the end (a band chip, a count). Keep it quiet. */
  trailing?: React.ReactNode;
  /** The recommended next card gets a soft brand outline. */
  highlight?: boolean;
  className?: string;
}

/** A compact, tappable card for a module, skill or section. */
export function ModuleCard({ title, subtitle, icon: Icon, tint = 'lavender', progress, href, onClick, trailing, highlight, className }: ModuleCardProps) {
  const content = (
    <>
      <span aria-hidden className={cn('flex size-10 shrink-0 items-center justify-center rounded-xl [&_svg]:size-5', TINT_ICON[tint])}>
        <Icon />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium leading-snug">{title}</span>
        {subtitle && <span className="mt-0.5 block truncate text-sm text-muted-foreground">{subtitle}</span>}
        {progress !== undefined && (
          <span className="mt-2 flex items-center gap-2">
            <span
              role="progressbar"
              aria-label={title}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              className="h-1 flex-1 overflow-hidden rounded-full bg-muted"
            >
              <span className={cn('block h-full rounded-full transition-[width] duration-500', TINT_BAR[tint])} style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} />
            </span>
            <span className="text-xs text-muted-foreground tabular-nums">{Math.round(progress)}%</span>
          </span>
        )}
      </span>
      {trailing}
      <ChevronRight className="size-4 shrink-0 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </>
  );
  const cls = cn(
    'group flex min-h-[4.5rem] w-full min-w-0 items-center gap-3.5 rounded-2xl border bg-card px-4 py-3 text-left transition-colors',
    'hover:border-foreground/15 hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:scale-[0.99]',
    highlight && 'border-brand/40 bg-brand-soft/60 hover:bg-brand-soft',
    className,
  );
  return (
    <Link href={href} onClick={onClick} className={cls} data-card>
      {content}
    </Link>
  );
}

/** Cards in one column on phones, two or three on wider screens. */
export function CardGrid({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3', className)}>{children}</div>;
}
