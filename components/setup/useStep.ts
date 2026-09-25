'use client';

import { useState } from 'react';

/**
 * Step state for a StepFlow. When opened at a named step (`?step=`), the flow
 * asks only that question: the Information Gap System asks one thing at a time.
 */
export function useStep<T extends string>(steps: readonly T[], initial?: string | null) {
  const single = initial ? steps.includes(initial as T) : false;
  const [index, setIndex] = useState(single ? steps.indexOf(initial as T) : 0);
  const active = single ? [steps[index]] : steps;
  const position = single ? 0 : index;
  return {
    index,
    step: steps[index],
    number: position + 1,
    total: active.length,
    isLast: single || index === steps.length - 1,
    next: () => setIndex((i) => Math.min(i + 1, steps.length - 1)),
    back: !single && index > 0 ? () => setIndex((i) => i - 1) : undefined,
  };
}
