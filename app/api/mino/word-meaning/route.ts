import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { explainWord, type WordMeaning } from '@/lib/ai/server/assess/word-meaning';
import { authenticate } from '@/lib/ai/server/auth';
import { HTTP_STATUS, MinoError } from '@/lib/ai/server/errors';
import { getProvider } from '@/lib/ai/server/providers';
import { checkWordLookupLimit } from '@/lib/ai/server/rate-limit';
import type { MinoErrorCode } from '@/lib/ai/types';
import { getPassage } from '@/lib/content/passages';
import { getLibraryPassage } from '@/lib/content/reading-library';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const bodySchema = z.object({
  passageId: z.string().min(1).max(80).regex(/^[a-z0-9-]+$/),
  word: z.string().trim().min(1).max(40).regex(/^[A-Za-z][A-Za-z'’-]*$/),
  sentence: z.string().trim().min(1).max(600),
});

export type WordMeaningResponse = { ok: true; meaning: WordMeaning; cached: boolean } | { ok: false; error: MinoErrorCode };
const fail = (code: MinoErrorCode) => NextResponse.json<WordMeaningResponse>({ ok: false, error: code }, { status: HTTP_STATUS[code] });

/**
 * Explanations are the same for every student, so one server instance keeps
 * the most recent ones: the same word in the same sentence costs one AI call.
 */
const CACHE_MAX = 3000;
const cache = new Map<string, WordMeaning>();
function remember(key: string, value: WordMeaning) {
  cache.delete(key);
  cache.set(key, value);
  if (cache.size > CACHE_MAX) cache.delete(cache.keys().next().value!);
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Mino explains one word of a reading passage in its sentence. Signed-in
 * students only; the sentence must really be in that passage, so this cannot
 * be used as a general-purpose AI endpoint.
 */
export async function POST(request: NextRequest) {
  const started = Date.now();
  try {
    const student = await authenticate(request.headers.get('authorization'));
    const parsed = bodySchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return fail('invalid_request');
    const { passageId, word, sentence } = parsed.data;
    const paragraphs = getLibraryPassage(passageId)?.paragraphs ?? getPassage(passageId)?.paragraphs;
    if (!paragraphs || !paragraphs.some((p) => p.includes(sentence))) return fail('invalid_request');
    if (!new RegExp(`(?<![A-Za-z])${escape(word)}(?![A-Za-z])`, 'i').test(sentence)) return fail('invalid_request');

    const key = `${passageId}\n${word.toLowerCase()}\n${sentence}`;
    const hit = cache.get(key);
    if (hit) {
      remember(key, hit);
      return NextResponse.json<WordMeaningResponse>({ ok: true, meaning: hit, cached: true });
    }
    checkWordLookupLimit(student.uid);
    const provider = getProvider();
    if (!provider) throw new MinoError('not_configured', 'no provider key');
    const { model, ...meaning } = await explainWord(provider, word, sentence);
    remember(key, meaning);
    console.info('[mino-word]', JSON.stringify({ status: 'ok', model, latencyMs: Date.now() - started }));
    return NextResponse.json<WordMeaningResponse>({ ok: true, meaning, cached: false });
  } catch (error) {
    const code: MinoErrorCode = error instanceof MinoError ? error.code : 'unavailable';
    console.warn('[mino-word]', JSON.stringify({ status: code, latencyMs: Date.now() - started }));
    return fail(code);
  }
}
