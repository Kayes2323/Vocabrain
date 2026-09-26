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
