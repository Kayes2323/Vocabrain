import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { authenticate } from '@/lib/ai/server/auth';
import { LIMITS } from '@/lib/ai/server/config';
import { HTTP_STATUS, MinoError } from '@/lib/ai/server/errors';
import { runMino } from '@/lib/ai/server/mino/orchestrator';
import { getProvider } from '@/lib/ai/server/providers';
import { checkRateLimit } from '@/lib/ai/server/rate-limit';
import { MINO_CAPABILITIES } from '@/lib/ai/capabilities';
import type { MinoAskResponse, MinoCapabilityId, MinoErrorCode } from '@/lib/ai/types';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const requestSchema = z.object({
  message: z.string().trim().min(1).max(LIMITS.messageChars),
  language: z.enum(['en', 'bn']),
  history: z
    .array(z.object({ role: z.enum(['user', 'assistant']), content: z.string().max(LIMITS.messageChars * 2) }))
    .max(40)
    .default([]),
  // Accepted for compatibility but not used for facts: the server reads the
  // student's data itself (see lib/ai/server/mino/snapshot.ts).
  userContext: z.record(z.string(), z.unknown()).optional(),
  capability: z
    .string()
    .refine((c) => MINO_CAPABILITIES.some((m) => m.id === c))
    .optional(),
  tzOffsetMinutes: z.number().int().min(-720).max(840).optional(),
});

function fail(code: MinoErrorCode) {
  return NextResponse.json<MinoAskResponse>({ ok: false, error: code }, { status: HTTP_STATUS[code] });
}

export async function POST(request: NextRequest) {
  const started = Date.now();
  let uid: string | undefined;
  try {
    // The UID comes only from the verified Firebase ID token, never from the body.
    const student = await authenticate(request.headers.get('authorization'));
    uid = student.uid;

    const parsed = requestSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return fail('invalid_request');

    checkRateLimit(student.uid);

    const provider = getProvider();
    if (!provider) throw new MinoError('not_configured', 'no provider key');

    const { message, language, history, capability, tzOffsetMinutes } = parsed.data;
    const { response, metadata } = await runMino(provider, {
      student,
      message,
      language,
      history,
      capability: capability as MinoCapabilityId | undefined,
      tzOffsetMinutes,
    });

    // Log usage only: never the key, message text or reply.
    console.info('[mino]', JSON.stringify({ status: 'ok', model: metadata.model, tier: metadata.tier, latencyMs: metadata.latencyMs, usage: metadata.usage, tools: metadata.toolCalls.map((t) => t.name) }));
    return NextResponse.json<MinoAskResponse>({ ok: true, response, metadata });
  } catch (error) {
    const code: MinoErrorCode = error instanceof MinoError ? error.code : 'unavailable';
    console.warn('[mino]', JSON.stringify({ status: code, detail: error instanceof MinoError ? error.detail : 'unexpected', uid: uid ? 'present' : 'none', latencyMs: Date.now() - started }));
    if (!(error instanceof MinoError)) console.error('[mino] unexpected', error instanceof Error ? error.message : 'unknown');
    return fail(code);
  }
}
