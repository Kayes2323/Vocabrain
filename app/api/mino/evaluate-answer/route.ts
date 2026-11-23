import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/ai/server/auth';
import { cacheGet, cacheKey, cachePut } from '@/lib/ai/server/evaluate/cache';
import { evaluateAnswerAI, evaluateVocabMeaningFast } from '@/lib/ai/server/evaluate';
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
const tierOf = (answerType: string) => (answerType === 'vocab_meaning' ? 'lite' : 'full');

/**
 * Logs one evaluation outcome: tier, status, verdict (if any) and latency only — never the
 * learner's answer, never a provider key, never the student's uid. This is the whole of this
 * endpoint's telemetry; it is enough to compute, per tier, success/failure/timeout rates and
 * latency percentiles from log aggregation once this runs against a real provider (see the
 * honesty note in the final report: this sandbox has no provider key, so these fields are
 * never populated with live numbers here).
 */
const logOutcome = (fields: Record<string, unknown>) => console.info('[mino-evaluate]', JSON.stringify(fields));

export async function POST(request: NextRequest) {
  const started = Date.now();
  let answerType: string | undefined;
  try {
    const student = await authenticate(request.headers.get('authorization'));
    const parsed = evaluationRequestSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return fail('invalid_request');
    const req = parsed.data;
    answerType = req.answerType;
    const tier = tierOf(req.answerType);

    const key = cacheKey(student.uid, req);
    const hit = cacheGet(key);
    if (hit) {
      logOutcome({ status: 'cache', type: req.answerType, tier, verdict: hit.verdict, latencyMs: Date.now() - started });
      return NextResponse.json<EvaluationResponse>({ ok: true, evaluation: { ...hit, latencyMs: Date.now() - started } });
    }

    checkEvaluationLimit(student.uid);
    const provider = getProvider();
    if (!provider) throw new MinoError('not_configured', 'no provider key');
    // Tier 2: ordinary vocabulary meaning recall gets the fast, lightweight check — never the
    // full writing-feedback pipeline (Tier 3), which is reserved for sentence/usage/writing/
    // speaking/essay answers that genuinely need structured issues and a correction.
    const evaluation = tier === 'lite' ? await evaluateVocabMeaningFast(provider, req) : await evaluateAnswerAI(provider, req);
    cachePut(key, evaluation);
    logOutcome({ status: 'ok', type: req.answerType, tier, verdict: evaluation.verdict, model: evaluation.model, modelMs: evaluation.latencyMs, latencyMs: Date.now() - started });
    return NextResponse.json<EvaluationResponse>({ ok: true, evaluation });
  } catch (error) {
    const code: MinoErrorCode = error instanceof MinoError ? error.code : 'unavailable';
    // 'timeout' and 'provider_busy' are the codes a real deployment's timeout/failure rate is
    // computed from; they are attributed per tier here so Tier 1 (never reaches this route),
    // Tier 2 and Tier 3 failure rates can be told apart.
    logOutcome({ status: code, type: answerType, tier: answerType ? tierOf(answerType) : undefined, latencyMs: Date.now() - started });
    return fail(code);
  }
}
