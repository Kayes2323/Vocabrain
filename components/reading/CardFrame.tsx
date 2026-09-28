'use client';

import { cn } from '@/lib/utils';

/**
 * Where a word card sits while reading. It floats over the page (so the
 * passage never moves): a bottom sheet above the tab bar on phones, and a
 * panel beside the passage on very wide screens. It scrolls inside itself, so it
 * never runs off the screen.
 */
export function CardFrame({ label, testId, children, className }: { label: string; testId?: string; children: React.ReactNode; className?: string }) {
  return (
    <div
      role="dialog"
      aria-label={label}
      data-testid={testId}
      data-reading-card=""
      className="pointer-events-none fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-50 px-3 pb-3 md:bottom-6 md:left-60 2xl:inset-x-auto 2xl:right-8 2xl:w-[22rem] 2xl:px-0 2xl:pb-0"
    >
      <div
        className={cn(
          'pointer-events-auto mx-auto max-h-[min(56dvh,34rem)] max-w-lg animate-in overflow-y-auto overscroll-contain rounded-2xl border bg-card p-4 shadow-lg duration-200 slide-in-from-bottom-4 fade-in 2xl:max-h-[calc(100dvh-8rem)]',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * If the word the student tapped ends up behind the card, scroll just enough
 * to show it above the card. Text never moves inside the page.
 */
let pending: number[] = [];

/** Stops any visibility checks still waiting from an earlier tap (a newer tap or a closed card). */
export function stopKeepingVisible() {
  pending.forEach((t) => window.clearTimeout(t));
  pending = [];
}

export function keepWordVisible(word: HTMLElement | null) {
  stopKeepingVisible();
  if (!word) return;
  const check = () => {
    const card = document.querySelector<HTMLElement>('[data-reading-card] > div');
    if (!card) return;
    const w = word.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    const overlapsX = w.right > c.left && w.left < c.right;
    if (!overlapsX || w.bottom <= c.top - 12) return;
    // An absolute target (not a relative step), so repeated checks during a smooth scroll never overshoot.
    const wordBottom = w.bottom + window.scrollY;
    window.scrollTo({ top: Math.max(0, wordBottom - c.top + 24), behavior: 'smooth' });
  };
  // Check again as the card fills in (loading → meaning makes it taller).
  pending = [260, 700, 1300, 2500].map((ms) => window.setTimeout(check, ms));
}
