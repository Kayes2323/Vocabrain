import type { AIMessage, AIProvider, MinoCapabilityId, MinoResponseMetadata, ModelTier } from '../../types';
import { LIMITS } from '../config';
import { runTool, toolDeclarations } from '../tools';
import { buildSystemPrompt } from './prompt';
import { buildStudentSnapshot } from './snapshot';

export interface MinoTurn {
  student: { uid: string; idToken: string };
  message: string;
  history: AIMessage[];
  language: 'en' | 'bn';
  capability?: MinoCapabilityId;
  /** Student's UTC offset in minutes, for "today" and days-to-test. */
  tzOffsetMinutes?: number;
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

  // Facts come from the database, never from the browser. If the read fails,
  // Mino is told plainly that it has no data rather than guessing.
  const snapshot = await buildStudentSnapshot(turn.student, turn.tzOffsetMinutes).catch((error) => {
    console.warn('[mino] snapshot failed', (error as Error).message);
    return 'STUDENT SNAPSHOT: unavailable right now. You do not know this student\'s data; do not guess it.';
  });

  const result = await provider.run({
    system: buildSystemPrompt({ language: turn.language, snapshot, capability: turn.capability }),
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
