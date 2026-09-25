import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
  /** Shows a back link to this href. */
  backHref?: string;
  backLabel?: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, backHref, backLabel = 'Back', action, className }: PageHeaderProps) {
  return (
    <header className={cn('mb-6 space-y-3', className)}>
      {backHref && (
        <Link
          href={backHref}
          className="-ml-1 inline-flex h-9 items-center gap-1 rounded-lg pr-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="size-4" aria-hidden />
          {backLabel}
        </Link>
      )}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">{title}</h1>
          {subtitle && <p className="text-[15px] text-muted-foreground text-pretty">{subtitle}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </header>
  );
}
