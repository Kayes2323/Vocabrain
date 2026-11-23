'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { evaluateAnswer } from '@/lib/ai/client';
import type { MinoErrorCode } from '@/lib/ai/types';
import type { EvaluationRequest, MinoEvaluation } from '@/lib/mino-eval/types';

export type EvaluationState =
  | { status: 'idle' }
  /** `slow` becomes true after a real delay — it is a true state, never a fake progress figure. */
  | { status: 'evaluating'; slow: boolean }
  | { status: 'done'; evaluation: MinoEvaluation }
  | { status: 'error'; error: MinoErrorCode };

const SLOW_AFTER_MS = 6_000;

/**
 * Runs one Mino evaluation at a time and exposes its state. The caller owns the
 * learner's answer, so it is never lost while waiting or when evaluation
 * fails; `retry()` re-sends the last request unchanged. A late reply from an
 * older request is ignored.
 */
export function useMinoEvaluation() {
  const [state, setState] = useState<EvaluationState>({ status: 'idle' });
  const last = useRef<EvaluationRequest | null>(null);
  const ticket = useRef(0);
  const abort = useRef<AbortController | null>(null);
  const slowTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (slowTimer.current) clearTimeout(slowTimer.current);
    slowTimer.current = null;
  };

  const run = useCallback(async (request: EvaluationRequest): Promise<MinoEvaluation | null> => {
    last.current = request;
    const mine = ++ticket.current;
    abort.current?.abort();
    clearTimer();
    const controller = new AbortController();
    abort.current = controller;
    setState({ status: 'evaluating', slow: false });
    slowTimer.current = setTimeout(() => {
      if (ticket.current === mine) setState({ status: 'evaluating', slow: true });
    }, SLOW_AFTER_MS);
    const res = await evaluateAnswer(request, { signal: controller.signal });
    clearTimer();
    if (ticket.current !== mine) return null;
    if (res.ok) {
      setState({ status: 'done', evaluation: res.evaluation });
      return res.evaluation;
    }
    setState({ status: 'error', error: res.error });
    return null;
  }, []);

  const retry = useCallback(() => (last.current ? run(last.current) : Promise.resolve(null)), [run]);

  const reset = useCallback(() => {
    ticket.current++;
    abort.current?.abort();
    clearTimer();
    setState({ status: 'idle' });
  }, []);

  useEffect(
    () => () => {
      ticket.current++;
      abort.current?.abort();
      clearTimer();
    },
    [],
  );

  return { state, run, retry, reset, busy: state.status === 'evaluating' };
}
