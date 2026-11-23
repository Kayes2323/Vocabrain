// A small, per-student, in-memory cache for identical evaluations, so a
// learner who resubmits the same unchanged answer (a retry, a double click)
// gets the result instantly and costs nothing. It is keyed by the student's
// UID as well as the full request, so one student's answer or personalised
// feedback can never be served to another.
import { createHash } from 'node:crypto';
import type { EvaluationRequest, MinoEvaluation } from '@/lib/mino-eval/types';

const TTL_MS = 10 * 60_000;
const MAX = 300;
const store = new Map<string, { at: number; evaluation: MinoEvaluation }>();

export function cacheKey(uid: string, req: EvaluationRequest): string {
  return createHash('sha256').update(uid).update('\u0000').update(JSON.stringify(req)).digest('hex');
}

export function cacheGet(key: string, now = Date.now()): MinoEvaluation | undefined {
  const hit = store.get(key);
  if (!hit) return undefined;
  if (now - hit.at > TTL_MS) {
    store.delete(key);
    return undefined;
  }
  return hit.evaluation;
}

export function cachePut(key: string, evaluation: MinoEvaluation, now = Date.now()) {
  if (store.size >= MAX) {
    const oldest = store.keys().next().value;
    if (oldest !== undefined) store.delete(oldest);
  }
  store.set(key, { at: now, evaluation });
}

export function cacheClear() {
  store.clear();
}
