import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/ai/server/auth';
import { cacheGet, cacheKey, cachePut } from '@/lib/ai/server/evaluate/cache';
import { evaluateAnswerAI } from '@/lib/ai/server/evaluate';
import { HTTP_STATUS, MinoError } from '@/lib/ai/server/errors';
import { getProvider } from '@/lib/ai/server/providers';
import { checkEvaluationLimit } from '@/lib/ai/server/rate-limit';
import type { MinoErrorCode } from '@/lib/ai/types';
import { evaluationRequestSchema, type EvaluationResponse } from '@/lib/mino-eval/types';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const fail = (code: MinoErrorCode) => NextResponse.json<EvaluationResponse>({ ok: false, error: code }, { status: HTTP_STATUS[code] });

/**
 * Mino Answer Evaluation Engine: evaluates one learner answer whose
 * correctness depends on meaning. Signed-in students only. The learner's text
 * is validated, treated as untrusted data, and never obeyed. There is no local
 * fallback verdict: if the provider fails the caller gets an error and the
 * learner retries, so an unreliable guess is never shown as Mino's evaluation.
 */
export async function POST(request: NextRequest) {
  const started = Date.now();
  try {
    const student = await authenticate(request.headers.get('authorization'));
    const parsed = evaluationRequestSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return fail('invalid_request');
    const req = parsed.data;

    const key = cacheKey(student.uid, req);
    const hit = cacheGet(key);
    if (hit) {
      console.info('[mino-evaluate]', JSON.stringify({ status: 'cache', type: req.answerType, verdict: hit.verdict, latencyMs: Date.now() - started }));
      return NextResponse.json<EvaluationResponse>({ ok: true, evaluation: { ...hit, latencyMs: Date.now() - started } });
    }

    checkEvaluationLimit(student.uid);
    const provider = getProvider();
    if (!provider) throw new MinoError('not_configured', 'no provider key');
    const evaluation = await evaluateAnswerAI(provider, req);
    cachePut(key, evaluation);
    console.info(
      '[mino-evaluate]',
      JSON.stringify({ status: 'ok', type: req.answerType, verdict: evaluation.verdict, model: evaluation.model, modelMs: evaluation.latencyMs, latencyMs: Date.now() - started }),
    );
    return NextResponse.json<EvaluationResponse>({ ok: true, evaluation });
  } catch (error) {
    const code: MinoErrorCode = error instanceof MinoError ? error.code : 'unavailable';
    console.warn('[mino-evaluate]', JSON.stringify({ status: code, latencyMs: Date.now() - started }));
    return fail(code);
  }
}
