import type { AIMessage, AIProvider, MinoContext, MinoResponseMetadata, ModelTier } from '../../types';
import { LIMITS } from '../config';
import { runTool, toolDeclarations } from '../tools';
import { buildSystemPrompt } from './prompt';

export interface MinoTurn {
  student: { uid: string; idToken: string };
  message: string;
  history: AIMessage[];
  language: 'en' | 'bn';
  userContext?: MinoContext;
}

/** Keeps only the most recent turns within the short-term memory budget. */
function trimHistory(history: AIMessage[]): AIMessage[] {
  const recent = history.slice(-LIMITS.historyTurns);
  const kept: AIMessage[] = [];
  let chars = 0;
  for (let i = recent.length - 1; i >= 0; i--) {
    chars += recent[i].content.length;
    if (chars > LIMITS.historyChars) break;
    kept.unshift(recent[i]);
  }
  // Gemini expects the conversation to start with a user turn.
  while (kept[0]?.role === 'assistant') kept.shift();
  return kept;
}

/** Mino → AI service → provider. One student message in, one reply out. */
export async function runMino(provider: AIProvider, turn: MinoTurn): Promise<{ response: string; metadata: MinoResponseMetadata }> {
  const tier: ModelTier = 'fast';
  const started = Date.now();
  const ctx = { uid: turn.student.uid, idToken: turn.student.idToken };

  const result = await provider.run({
    system: buildSystemPrompt(turn.language, turn.userContext),
    messages: [...trimHistory(turn.history), { role: 'user', content: turn.message }],
    tier,
    maxOutputTokens: LIMITS.maxOutputTokens,
    tools: toolDeclarations,
    runTool: (name, args) => runTool(ctx, name, args as Record<string, unknown>),
    maxToolRounds: LIMITS.maxToolRounds,
  });

  return {
    response: result.text,
    metadata: {
      model: result.model,
      tier,
      latencyMs: Date.now() - started,
      toolCalls: result.toolCalls,
      usage: result.usage,
    },
  };
}
