import { NextResponse } from 'next/server';
import { firebaseProjectId, geminiApiKey, MODEL_CHAINS } from '@/lib/ai/server/config';

export const dynamic = 'force-dynamic';

/** Configuration check without secrets: booleans and model names only. */
export function GET() {
  return NextResponse.json({
    provider: process.env.MINO_AI_PROVIDER || 'gemini',
    aiKeyConfigured: Boolean(geminiApiKey()),
    firebaseProjectConfigured: Boolean(firebaseProjectId()),
    models: MODEL_CHAINS,
  });
}
