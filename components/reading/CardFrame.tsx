'use client';

import { cn } from '@/lib/utils';

/**
 * Where a word card sits while reading. It floats over the page (so the
 * passage never moves): a bottom sheet above the tab bar on phones, and a
 * panel beside the passage on wide screens. It scrolls inside itself, so it
 * never runs off the screen.
 */
export function CardFrame({ label, testId, children, className }: { label: string; testId?: string; children: React.ReactNode; className?: string }) {
  return (
    <div
      role="dialog"
      aria-label={label}
      data-testid={testId}
      className="pointer-events-none fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-50 px-3 pb-3 md:bottom-6 md:left-60 xl:inset-x-auto xl:right-6 xl:w-[22rem] xl:px-0 xl:pb-0"
    >
      <div
        className={cn(
          'pointer-events-auto mx-auto max-h-[min(56dvh,34rem)] max-w-lg animate-in overflow-y-auto overscroll-contain rounded-2xl border bg-card p-4 shadow-lg duration-200 slide-in-from-bottom-4 fade-in xl:max-h-[calc(100dvh-8rem)]',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
