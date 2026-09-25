import Link from 'next/link';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconBadge } from './IconBadge';
import type { Tone } from './tone';

interface ListRowProps {
  title: string;
  description?: React.ReactNode;
  icon?: LucideIcon;
  iconTone?: Tone;
  trailing?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  muted?: boolean;
}

/** A tappable row. Use inside <RowGroup> for grouped lists. */
export function ListRow({ title, description, icon, iconTone = 'neutral', trailing, href, onClick, muted }: ListRowProps) {
  const content = (
    <>
      {icon && <IconBadge icon={icon} tone={iconTone} />}
      <div className="min-w-0 flex-1">
        <p className={cn('font-medium leading-snug', muted && 'text-muted-foreground')}>{title}</p>
        {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      {trailing}
      {(href || onClick) && <ChevronRight className="size-4 shrink-0 text-muted-foreground/70" aria-hidden />}
    </>
  );
  const className =
    'flex min-h-16 w-full items-center gap-3.5 px-4 py-3 text-left transition-colors hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-none';

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {content}
      </button>
    );
  }
  return <div className={cn(className, 'hover:bg-transparent')}>{content}</div>;
}

export function RowGroup({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('divide-y overflow-hidden rounded-2xl border bg-card', className)}>{children}</div>
  );
}
