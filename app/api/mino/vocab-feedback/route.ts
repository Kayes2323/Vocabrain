import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { assessWordSentence, type VocabFeedback } from '@/lib/ai/server/assess/vocab';
import { authenticate } from '@/lib/ai/server/auth';
import { HTTP_STATUS, MinoError } from '@/lib/ai/server/errors';
import { getProvider } from '@/lib/ai/server/providers';
import { checkRateLimit } from '@/lib/ai/server/rate-limit';
import type { MinoErrorCode } from '@/lib/ai/types';
import { getFoundationWord } from '@/lib/vocab-foundation/words';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const bodySchema = z.object({
  wordId: z.string().min(1).max(40).regex(/^[a-z-]+$/),
  text: z.string().trim().min(3).max(400),
  language: z.enum(['en', 'bn']),
});

export type VocabFeedbackResponse = { ok: true; feedback: VocabFeedback } | { ok: false; error: MinoErrorCode };
const fail = (code: MinoErrorCode) => NextResponse.json<VocabFeedbackResponse>({ ok: false, error: code }, { status: HTTP_STATUS[code] });

/** Mino checks a sentence with a Vocabulary Foundation word. Signed-in students only. */
export async function POST(request: NextRequest) {
  const started = Date.now();
  try {
    const student = await authenticate(request.headers.get('authorization'));
    const parsed = bodySchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return fail('invalid_request');
    const word = getFoundationWord(parsed.data.wordId);
    if (!word) return fail('invalid_request');
    checkRateLimit(student.uid);
    const provider = getProvider();
    if (!provider) throw new MinoError('not_configured', 'no provider key');
    const feedback = await assessWordSentence(provider, word, parsed.data.text, parsed.data.language);
    console.info('[mino-vocab]', JSON.stringify({ status: 'ok', word: word.id, verdict: feedback.verdict, model: feedback.model, latencyMs: Date.now() - started }));
    return NextResponse.json<VocabFeedbackResponse>({ ok: true, feedback });
  } catch (error) {
    const code: MinoErrorCode = error instanceof MinoError ? error.code : 'unavailable';
    console.warn('[mino-vocab]', JSON.stringify({ status: code, latencyMs: Date.now() - started }));
    return fail(code);
  }
}
