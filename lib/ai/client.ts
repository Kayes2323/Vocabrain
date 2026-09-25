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
