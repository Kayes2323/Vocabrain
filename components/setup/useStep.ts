'use client';

import { useState } from 'react';

/** Step index state for a StepFlow, optionally starting at a named step. */
export function useStep<T extends string>(steps: readonly T[], initial?: string | null) {
  const start = initial ? Math.max(0, steps.indexOf(initial as T)) : 0;
  const [index, setIndex] = useState(start);
  return {
    index,
    step: steps[index],
    number: index + 1,
    total: steps.length,
    isLast: index === steps.length - 1,
    next: () => setIndex((i) => Math.min(i + 1, steps.length - 1)),
    back: index > 0 ? () => setIndex((i) => i - 1) : undefined,
  };
}
