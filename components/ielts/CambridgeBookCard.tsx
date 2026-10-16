import Link from 'next/link';
import { StatusChip } from '@/components/ds';
import { cn } from '@/lib/utils';
import type { CambridgeBookMeta } from '@/lib/ielts/content/cambridge-catalog';

/**
 * One book in the Cambridge library grid. No cover art (none is licensed) —
 * a clean typographic card with the edition number, title and an honest
 * availability badge computed from real linked content, never invented.
 */
export function CambridgeBookCard({
  book,
  availableCount,
  academicLabel,
  availableLabel,
  comingSoonLabel,
  className,
}: {
  book: CambridgeBookMeta;
  /** How many of this book's 4 tests are actually launchable right now. */
  availableCount: number;
  academicLabel: string;
  availableLabel: string;
  comingSoonLabel: string;
  className?: string;
}) {
  const available = availableCount > 0;
  return (
    <Link
      href={`/ielts/cambridge/${book.id}`}
      className={cn(
        'group flex flex-col gap-3 rounded-2xl border bg-card p-4 text-left transition-colors',
        'hover:border-foreground/15 hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:scale-[0.99]',
        className,
      )}
      data-card
    >
      <div className="flex items-center justify-between gap-2">
        <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted text-base font-semibold tabular-nums">
          {book.edition}
        </span>
        <StatusChip tone={available ? 'success' : 'neutral'}>{available ? availableLabel : comingSoonLabel}</StatusChip>
      </div>
      <div className="min-w-0">
        <p className="font-medium leading-snug">{book.title}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{academicLabel}</p>
      </div>
    </Link>
  );
}
