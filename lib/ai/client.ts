import { auth } from '@/lib/firebase';
import type { MinoAskRequest, MinoAskResponse } from './types';

/**
 * Browser-side entry point to Mino. All AI calls go through /api/mino with
 * the student's Firebase ID token; the server derives the UID from it.
 */
export async function askMino(request: MinoAskRequest): Promise<MinoAskResponse> {
  const user = auth?.currentUser;
  if (!user) return { ok: false, error: 'unauthenticated' };
  try {
    const token = await user.getIdToken();
    const res = await fetch('/api/mino', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(request),
    });
    const body = (await res.json().catch(() => null)) as MinoAskResponse | null;
    return body ?? { ok: false, error: 'unavailable' };
  } catch {
    return { ok: false, error: 'unavailable' };
  }
}

/** Asks Mino to assess a submitted Writing/Speaking attempt (signed-in students only). */
export async function assessSession(
  sessionId: string,
  language: 'en' | 'bn',
): Promise<{ ok: true; feedback: import('@/lib/ielts').ProductiveFeedback } | { ok: false; error: import('./types').MinoErrorCode }> {
  const user = auth?.currentUser;
  if (!user) return { ok: false, error: 'unauthenticated' };
  try {
    const token = await user.getIdToken();
    const res = await fetch('/api/mino/assess', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ sessionId, language }),
    });
    return (await res.json().catch(() => ({ ok: false, error: 'unavailable' }))) as never;
  } catch {
    return { ok: false, error: 'unavailable' };
  }
}

/** Mino Writing Studio: real assessment of one practice answer (signed-in students only). */
export async function writingStudioFeedback(
  input: { task: 1 | 2; prompt: string; minWords: number; chart?: { caption: string; headers: string[]; rows: string[][] }; skillFocus?: string; checkScope?: 'full' | 'overview-only' | 'paragraph-only' | 'introduction-only' },
  text: string,
  language: 'en' | 'bn',
): Promise<{ ok: true; feedback: import('@/lib/ielts').TaskFeedback } | { ok: false; error: import('./types').MinoErrorCode }> {
  const user = auth?.currentUser;
  if (!user) return { ok: false, error: 'unauthenticated' };
  try {
    const token = await user.getIdToken();
    const res = await fetch('/api/mino/writing-studio-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...input, text, language }),
    });
    return (await res.json().catch(() => ({ ok: false, error: 'unavailable' }))) as never;
  } catch {
    return { ok: false, error: 'unavailable' };
  }
}

/** Mino's feedback on a student's own Foundation sentence. */
export async function foundationFeedback(
  lessonId: string,
  exerciseId: string,
  text: string,
  language: 'en' | 'bn',
): Promise<{ ok: true; feedback: import('./server/assess/foundation').FoundationFeedback } | { ok: false; error: import('./types').MinoErrorCode }> {
  const user = auth?.currentUser;
  if (!user) return { ok: false, error: 'unauthenticated' };
  try {
    const token = await user.getIdToken();
    const res = await fetch('/api/mino/foundation-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ lessonId, exerciseId, text, language }),
    });
    return (await res.json().catch(() => ({ ok: false, error: 'unavailable' }))) as never;
  } catch {
    return { ok: false, error: 'unavailable' };
  }
}

/** Mino's feedback on a sentence with a Vocabulary Foundation word. */
export async function vocabFeedback(
  wordId: string,
  text: string,
  language: 'en' | 'bn',
): Promise<{ ok: true; feedback: import('./server/assess/vocab').VocabFeedback } | { ok: false; error: import('./types').MinoErrorCode }> {
  const user = auth?.currentUser;
  if (!user) return { ok: false, error: 'unauthenticated' };
  try {
    const token = await user.getIdToken();
    const res = await fetch('/api/mino/vocab-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ wordId, text, language }),
    });
    return (await res.json().catch(() => ({ ok: false, error: 'unavailable' }))) as never;
  } catch {
    return { ok: false, error: 'unavailable' };
  }
}

/** Mino explains one word of a reading passage in its sentence (signed-in students only). */
export async function wordMeaning(
  passageId: string,
  word: string,
  sentence: string,
): Promise<{ ok: true; meaning: import('./server/assess/word-meaning').WordMeaning; cached: boolean } | { ok: false; error: import('./types').MinoErrorCode }> {
  const user = auth?.currentUser;
  if (!user) return { ok: false, error: 'unauthenticated' };
  try {
    const token = await user.getIdToken();
    const res = await fetch('/api/mino/word-meaning', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ passageId, word, sentence }),
    });
    return (await res.json().catch(() => ({ ok: false, error: 'unavailable' }))) as never;
  } catch {
    return { ok: false, error: 'unavailable' };
  }
}

/**
 * Mino Answer Evaluation Engine: ask Mino to evaluate one learner answer by
 * meaning (signed-in students only). Resolves to an error — never to a guessed
 * verdict — when the evaluation cannot be completed, so callers keep the
 * learner's answer and offer a retry. Aborts after `timeoutMs` (default 40 s).
 */
export async function evaluateAnswer(
  request: import('@/lib/mino-eval/types').EvaluationRequest,
  options: { signal?: AbortSignal; timeoutMs?: number } = {},
): Promise<import('@/lib/mino-eval/types').EvaluationResponse> {
  const user = auth?.currentUser;
  if (!user) return { ok: false, error: 'unauthenticated' };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeoutMs ?? 40_000);
  const onAbort = () => controller.abort();
  options.signal?.addEventListener('abort', onAbort);
  try {
    const token = await user.getIdToken();
    const res = await fetch('/api/mino/evaluate-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(request),
      signal: controller.signal,
    });
    return (await res.json().catch(() => ({ ok: false, error: 'unavailable' }))) as never;
  } catch (e) {
    return { ok: false, error: controller.signal.aborted && !options.signal?.aborted ? 'timeout' : 'unavailable' };
  } finally {
    clearTimeout(timer);
    options.signal?.removeEventListener('abort', onAbort);
  }
}
