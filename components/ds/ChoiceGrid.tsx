'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Choice<T extends string | number> {
  value: T;
  label: string;
  description?: string;
}

interface ChoiceGridProps<T extends string | number> {
  label: string;
  options: Choice<T>[];
  value: T | undefined;
  onChange: (value: T) => void;
  columns?: 1 | 2 | 3;
}

/** Large single-select options for one-decision screens. */
export function ChoiceGrid<T extends string | number>({ label, options, value, onChange, columns = 2 }: ChoiceGridProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn('grid gap-2.5', columns === 1 && 'grid-cols-1', columns === 2 && 'grid-cols-2', columns === 3 && 'grid-cols-3')}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative flex min-h-14 flex-col justify-center rounded-xl border bg-card px-4 py-3 text-left transition-all',
              'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40',
              selected ? 'border-brand ring-1 ring-brand' : 'hover:border-foreground/20',
            )}
          >
            <span className="font-medium">{option.label}</span>
            {option.description && <span className="text-sm text-muted-foreground">{option.description}</span>}
            {selected && (
              <Check className="absolute top-1/2 right-3 size-4 -translate-y-1/2 text-brand" aria-hidden />
            )}
          </button>
        );
      })}
    </div>
  );
}
