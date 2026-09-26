import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { assessFoundationSentence, type FoundationFeedback } from '@/lib/ai/server/assess/foundation';
import { authenticate } from '@/lib/ai/server/auth';
import { HTTP_STATUS, MinoError } from '@/lib/ai/server/errors';
import { getProvider } from '@/lib/ai/server/providers';
import { checkRateLimit } from '@/lib/ai/server/rate-limit';
import type { MinoErrorCode } from '@/lib/ai/types';
import { findLesson } from '@/lib/foundation/content';
import type { WriteExercise } from '@/lib/foundation/model';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const bodySchema = z.object({
  lessonId: z.string().min(1).max(40).regex(/^[\w-]+$/),
  exerciseId: z.string().min(1).max(60).regex(/^[\w-]+$/),
  text: z.string().trim().min(3).max(600),
  language: z.enum(['en', 'bn']),
});

export type FoundationFeedbackResponse = { ok: true; feedback: FoundationFeedback } | { ok: false; error: MinoErrorCode };
const fail = (code: MinoErrorCode) => NextResponse.json<FoundationFeedbackResponse>({ ok: false, error: code }, { status: HTTP_STATUS[code] });

/** Mino checks a student's own sentence for a Foundation personal-use task. Signed-in students only. */
export async function POST(request: NextRequest) {
  const started = Date.now();
  try {
    const student = await authenticate(request.headers.get('authorization'));
    const parsed = bodySchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return fail('invalid_request');
    const { lessonId, exerciseId, text, language } = parsed.data;
    const lesson = findLesson(lessonId)?.lesson;
    const exercise = lesson?.steps.flatMap((s) => (s.kind === 'practice' ? s.exercises : [])).find((e) => e.id === exerciseId);
    if (!exercise || exercise.type !== 'write' || !exercise.mino) return fail('invalid_request');
    checkRateLimit(student.uid);
    const provider = getProvider();
    if (!provider) throw new MinoError('not_configured', 'no provider key');
    const feedback = await assessFoundationSentence(provider, exercise as WriteExercise, text, language);
    console.info('[mino-foundation]', JSON.stringify({ status: 'ok', exerciseId, verdict: feedback.verdict, model: feedback.model, latencyMs: Date.now() - started }));
    return NextResponse.json<FoundationFeedbackResponse>({ ok: true, feedback });
  } catch (error) {
    const code: MinoErrorCode = error instanceof MinoError ? error.code : 'unavailable';
    console.warn('[mino-foundation]', JSON.stringify({ status: code, latencyMs: Date.now() - started }));
    return fail(code);
  }
}
