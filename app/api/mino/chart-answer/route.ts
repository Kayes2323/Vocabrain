import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { assessChartAnswer, type ChartAnswerFeedback } from '@/lib/ai/server/assess/chart-answer';
import { authenticate } from '@/lib/ai/server/auth';
import { HTTP_STATUS, MinoError } from '@/lib/ai/server/errors';
import { getProvider } from '@/lib/ai/server/providers';
import { checkRateLimit } from '@/lib/ai/server/rate-limit';
import type { MinoErrorCode } from '@/lib/ai/types';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const bodySchema = z.object({
  lessonId: z.string().trim().min(1).max(100),
  stepId: z.string().trim().min(1).max(100),
  chartId: z.string().trim().min(1).max(100),
  chartTitle: z.string().trim().min(1).max(200),
  chartUnit: z.string().trim().max(60),
  questionId: z.string().trim().min(1).max(100),
  question: z.string().trim().min(1).max(600),
  requiredLanguage: z.enum(['bn-or-en', 'en']),
  referenceAnswer: z.string().trim().min(1).max(600),
  acceptableAlternatives: z.array(z.string().max(300)).max(15).default([]),
  evaluationCriteria: z.array(z.string().max(300)).max(10).default([]),
  learnerAnswer: z.string().trim().min(1).max(1000),
});

export type ChartAnswerResponse = { ok: true; feedback: ChartAnswerFeedback } | { ok: false; error: MinoErrorCode };
const fail = (code: MinoErrorCode) => NextResponse.json<ChartAnswerResponse>({ ok: false, error: code }, { status: HTTP_STATUS[code] });

/**
 * Mino checks one Visual Analysis Board answer (a chart-board guided
 * question, in any lesson that uses it). Signed-in students only. This is
 * the real evaluation the board previously skipped — a failure here must
 * never be reported as a correct answer; see chart-answer.ts.
 */
export async function POST(request: NextRequest) {
  const started = Date.now();
  try {
    const student = await authenticate(request.headers.get('authorization'));
    const parsed = bodySchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return fail('invalid_request');
    const { lessonId, stepId, chartId, questionId, ...input } = parsed.data;
    checkRateLimit(student.uid);
    const provider = getProvider();
    if (!provider) throw new MinoError('not_configured', 'no provider key');
    const feedback = await assessChartAnswer(provider, input);
    console.info('[mino-chart-answer]', JSON.stringify({ status: 'ok', lessonId, stepId, chartId, questionId, verdict: feedback.verdict, model: feedback.model, latencyMs: Date.now() - started }));
    return NextResponse.json<ChartAnswerResponse>({ ok: true, feedback });
  } catch (error) {
    const code: MinoErrorCode = error instanceof MinoError ? error.code : 'unavailable';
    console.warn('[mino-chart-answer]', JSON.stringify({ status: code, latencyMs: Date.now() - started }));
    return fail(code);
  }
}
