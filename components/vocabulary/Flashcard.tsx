'use client';

import { cn } from '@/lib/utils';

interface FlashcardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  revealed: boolean;
  /** Required unless `locked` — a locked card is never clicked, so it has nothing to toggle. */
  onToggle?: () => void;
  hint: string;
  /**
   * When true, the card is a static display: reveal is driven entirely by the
   * caller (e.g. after a genuine recall attempt is checked), not by clicking
   * the card itself. Used wherever a tap-to-reveal would let a learner skip
   * straight past answering.
   */
  locked?: boolean;
}

/** Recall-first card: the student tries to remember, then taps to check. */
export function Flashcard({ front, back, revealed, onToggle, hint, locked }: FlashcardProps) {
  const className = cn(
    'flex min-h-64 w-full flex-col items-center justify-center gap-4 rounded-2xl border bg-card px-6 py-10 text-center shadow-[0_1px_2px_rgb(15_23_42/0.04)] transition-colors',
    !locked && 'hover:border-foreground/15 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40',
  );
  const content = (
    <>
      {front}
      {revealed ? <div className="w-full border-t pt-5">{back}</div> : <span className="text-sm text-muted-foreground">{hint}</span>}
    </>
  );
  if (locked) return <div className={className}>{content}</div>;
  return (
    <button type="button" onClick={onToggle} aria-expanded={revealed} className={className}>
      {content}
    </button>
  );
}
