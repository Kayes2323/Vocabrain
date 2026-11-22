import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { assessWritingStudioTask } from '@/lib/ai/server/assess';
import { authenticate } from '@/lib/ai/server/auth';
import { HTTP_STATUS, MinoError } from '@/lib/ai/server/errors';
import { getProvider } from '@/lib/ai/server/providers';
import { checkRateLimit } from '@/lib/ai/server/rate-limit';
import type { MinoErrorCode } from '@/lib/ai/types';
import type { TaskFeedback } from '@/lib/ielts';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const bodySchema = z.object({
  task: z.union([z.literal(1), z.literal(2)]),
  prompt: z.string().trim().min(1).max(2000),
  minWords: z.number().int().min(1).max(500),
  chart: z
    .object({
      caption: z.string().max(200),
      headers: z.array(z.string().max(60)).max(10),
      rows: z.array(z.array(z.string().max(60)).max(10)).max(30),
    })
    .optional(),
  text: z.string().trim().min(1).max(4000),
  language: z.enum(['en', 'bn']),
});

export type WritingStudioFeedbackResponse = { ok: true; feedback: TaskFeedback } | { ok: false; error: MinoErrorCode };
const fail = (code: MinoErrorCode) => NextResponse.json<WritingStudioFeedbackResponse>({ ok: false, error: code }, { status: HTTP_STATUS[code] });

/**
 * Mino Writing Studio: real AI assessment of one practice answer (a lesson's
 * final task, a practice board, or one exam-mode task). Signed-in students
 * only; the text is assessed, never treated as instructions.
 */
export async function POST(request: NextRequest) {
  const started = Date.now();
  try {
    const student = await authenticate(request.headers.get('authorization'));
    const parsed = bodySchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return fail('invalid_request');
    const { task, prompt, minWords, chart, text, language } = parsed.data;
    checkRateLimit(student.uid);
    const provider = getProvider();
    if (!provider) throw new MinoError('not_configured', 'no provider key');
    const { feedback, model } = await assessWritingStudioTask(provider, { task, prompt, minWords, chart }, text, language);
    console.info('[mino-writing-studio]', JSON.stringify({ status: 'ok', task, model, band: feedback.band, latencyMs: Date.now() - started }));
    return NextResponse.json<WritingStudioFeedbackResponse>({ ok: true, feedback });
  } catch (error) {
    const code: MinoErrorCode = error instanceof MinoError ? error.code : 'unavailable';
    console.warn('[mino-writing-studio]', JSON.stringify({ status: code, latencyMs: Date.now() - started }));
    return fail(code);
  }
}
