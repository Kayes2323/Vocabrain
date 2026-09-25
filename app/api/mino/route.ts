import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { buildMinoSystemPrompt, getMinoProvider } from '@/lib/ai/server';
import type { MinoAskResponse, MinoContext } from '@/lib/ai/types';

export const dynamic = 'force-dynamic';

const requestSchema = z.object({
  capability: z.string(),
  messages: z
    .array(z.object({ role: z.enum(['user', 'assistant']), content: z.string().max(4000) }))
    .min(1)
    .max(40),
  context: z.record(z.unknown()),
});

function reply(body: MinoAskResponse, status = 200) {
  return NextResponse.json(body, { status });
}

export async function POST(request: NextRequest) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return reply({ ok: false, reason: 'invalid-request', message: 'Invalid request.' }, 400);
  }

  const provider = getMinoProvider();
  if (!provider) {
    return reply({
      ok: false,
      reason: 'unavailable',
      message:
        'Mino’s conversation engine isn’t connected yet. Your personalised next actions above are already live.',
    });
  }

  try {
    const { text } = await provider.complete({
      system: buildMinoSystemPrompt(parsed.data.context as unknown as MinoContext),
      messages: parsed.data.messages,
      maxTokens: 800,
    });
    return reply({ ok: true, reply: text });
  } catch (error) {
    console.error('[mino] provider error', error);
    return reply({ ok: false, reason: 'error', message: 'Mino couldn’t answer just now. Please try again.' }, 502);
  }
}
