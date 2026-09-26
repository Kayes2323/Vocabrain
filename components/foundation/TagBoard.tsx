'use client';

import { useState } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { Pos } from '@/lib/foundation';
import { cn } from '@/lib/utils';

type Token = { w: string; pos?: Pos };

/**
 * Tap a word, then its job. In `discover` mode each tag is checked at once
 * (the right job is shown if the guess was wrong); in `exercise` mode tags are
 * checked together when `result` is set.
 */
export function TagBoard({
  tokens,
  choices,
  mode,
  tags,
  onTag,
  result,
}: {
  tokens: Token[];
  choices: Pos[];
  mode: 'discover' | 'exercise';
  tags: Record<number, Pos>;
  onTag: (index: number, pos: Pos) => void;
  /** Exercise mode after checking: show right/wrong per word. */
  result?: boolean;
}) {
  const { t } = useLocale();
  const [current, setCurrent] = useState<number | null>(() => tokens.findIndex((tk) => tk.pos) ?? null);
  const locked = result !== undefined;
  const next = (from: number, done: Record<number, Pos>) => {
    const order = tokens.map((tk, i) => i).filter((i) => tokens[i].pos && !(i in done));
    return order.find((i) => i > from) ?? order[0] ?? null;
  };

  return (
    <div className="space-y-4">
      <p className="flex flex-wrap gap-x-1 gap-y-2 rounded-2xl border bg-card px-4 py-4 text-lg leading-relaxed" lang="en">
        {tokens.map((tk, i) => {
          if (!tk.pos) return <span key={i} className="px-0.5 py-1 text-muted-foreground">{tk.w}</span>;
          const tag = tags[i];
          const shown = mode === 'discover' || locked;
          const right = shown && tag !== undefined && tag === tk.pos;
          const wrong = shown && tag !== undefined && tag !== tk.pos;
          return (
            <button
              key={i}
              type="button"
              disabled={locked || (mode === 'discover' && tag !== undefined)}
              onClick={() => setCurrent(i)}
              aria-pressed={current === i}
              aria-label={tag ? `${tk.w}: ${t(`foundation.pos.${tag}`)}` : tk.w}
              className={cn(
                'inline-grid justify-items-center rounded-lg px-1.5 py-0.5 transition-colors',
                !tag && 'bg-brand-soft/60 underline decoration-brand/40 decoration-dashed underline-offset-4',
                current === i && !locked && 'ring-2 ring-brand',
                tag && !shown && 'bg-muted',
                right && 'bg-success/15',
                wrong && 'bg-destructive/10',
              )}
            >
              <span>{tk.w}</span>
              {tag && (
                <span className={cn('text-[10px] leading-none font-semibold tracking-wide uppercase', right ? 'text-success' : wrong ? 'text-destructive' : 'text-muted-foreground')}>
                  {wrong && mode === 'discover' ? t(`foundation.pos.${tk.pos}`) : t(`foundation.pos.${tag}`)}
                  {wrong && locked ? ` → ${t(`foundation.pos.${tk.pos}`)}` : ''}
                </span>
              )}
            </button>
          );
        })}
      </p>
      {!locked && (
        <div className="grid grid-cols-2 gap-2">
          {choices.map((c) => (
            <button
              key={c}
              type="button"
              disabled={current === null || current < 0}
              onClick={() => {
                if (current === null || current < 0) return;
                onTag(current, c);
                setCurrent(next(current, { ...tags, [current]: c }));
              }}
              className="h-11 rounded-xl border bg-card text-[15px] font-medium transition-colors hover:border-brand/40 hover:bg-brand-soft disabled:opacity-40"
            >
              {t(`foundation.pos.${c}`)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
