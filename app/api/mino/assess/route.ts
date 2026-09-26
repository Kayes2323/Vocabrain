import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { assessSpeaking, assessWriting } from '@/lib/ai/server/assess';
import { authenticate } from '@/lib/ai/server/auth';
import { HTTP_STATUS, MinoError } from '@/lib/ai/server/errors';
import { readOwnDoc, writeOwnDoc } from '@/lib/ai/server/firestore-rest';
import { getProvider } from '@/lib/ai/server/providers';
import { checkRateLimit } from '@/lib/ai/server/rate-limit';
import type { MinoErrorCode } from '@/lib/ai/types';
import type { ProductiveFeedback, TestSession } from '@/lib/ielts';
import { getTest } from '@/lib/ielts/content';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const bodySchema = z.object({
  sessionId: z.string().min(1).max(200).regex(/^[\w-]+$/),
  language: z.enum(['en', 'bn']),
});

export type AssessResponse = { ok: true; feedback: ProductiveFeedback } | { ok: false; error: MinoErrorCode };

const fail = (code: MinoErrorCode) => NextResponse.json<AssessResponse>({ ok: false, error: code }, { status: HTTP_STATUS[code] });

/**
 * Writing/Speaking feedback for a submitted attempt. The text is read from the
 * student's own session in Firestore (as the student), never taken from the
 * request, and the feedback is written back once.
 */
export async function POST(request: NextRequest) {
  const started = Date.now();
  try {
    const student = await authenticate(request.headers.get('authorization'));
    const parsed = bodySchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return fail('invalid_request');
    const { sessionId, language } = parsed.data;

    const session = (await readOwnDoc(student.uid, student.idToken, `testSessions/${sessionId}`)) as TestSession | null;
    if (!session || session.status !== 'submitted' || (session.skill !== 'writing' && session.skill !== 'speaking')) return fail('invalid_request');
    if (session.feedback) return NextResponse.json<AssessResponse>({ ok: true, feedback: session.feedback });

    const test = getTest(session.testId);
    if (!test) return fail('invalid_request');
    checkRateLimit(student.uid);
    const provider = getProvider();
    if (!provider) throw new MinoError('not_configured', 'no provider key');

    const feedback =
      session.skill === 'writing' ? await assessWriting(provider, test, session, language) : await assessSpeaking(provider, test, session, language);
    await writeOwnDoc(student.uid, student.idToken, `testSessions/${sessionId}`, { feedback, updatedAt: new Date().toISOString() }, ['feedback', 'updatedAt']);

    console.info('[mino-assess]', JSON.stringify({ status: 'ok', skill: session.skill, model: feedback.model, overall: feedback.overall, latencyMs: Date.now() - started }));
    return NextResponse.json<AssessResponse>({ ok: true, feedback });
  } catch (error) {
    const code: MinoErrorCode = error instanceof MinoError ? error.code : 'unavailable';
    console.warn('[mino-assess]', JSON.stringify({ status: code, detail: error instanceof MinoError ? error.detail : (error as Error).message, latencyMs: Date.now() - started }));
    return fail(code);
  }
}
