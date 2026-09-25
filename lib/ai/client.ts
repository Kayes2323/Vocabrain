import type { MinoAskRequest, MinoAskResponse } from './types';

/** Browser-side entry point to Mino. All AI calls go through /api/mino. */
export async function askMino(request: MinoAskRequest): Promise<MinoAskResponse> {
  try {
    const res = await fetch('/api/mino', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    return (await res.json()) as MinoAskResponse;
  } catch {
    return { ok: false, reason: 'error', message: 'Could not reach Mino. Check your connection and try again.' };
  }
}
