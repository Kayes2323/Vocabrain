'use client';

import { cn } from '@/lib/utils';

interface FlashcardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  revealed: boolean;
  onToggle: () => void;
  hint: string;
}

/** Recall-first card: the student tries to remember, then taps to check. */
export function Flashcard({ front, back, revealed, onToggle, hint }: FlashcardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={revealed}
      className={cn(
        'flex min-h-64 w-full flex-col items-center justify-center gap-4 rounded-2xl border bg-card px-6 py-10 text-center shadow-[0_1px_2px_rgb(15_23_42/0.04)] transition-colors',
        'hover:border-foreground/15 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40',
      )}
    >
      {front}
      {revealed ? <div className="w-full border-t pt-5">{back}</div> : <span className="text-sm text-muted-foreground">{hint}</span>}
    </button>
  );
}
