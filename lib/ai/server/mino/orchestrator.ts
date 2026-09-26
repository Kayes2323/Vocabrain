import type { AIMessage, AIProvider, MinoCapabilityId, MinoResponseMetadata, ModelTier } from '../../types';
import { LIMITS } from '../config';
import { runTool, toolDeclarations } from '../tools';
import type { ToolContext } from '../tools/types';
import { isMinoAction } from '../../actions';
import { MinoError } from '../errors';
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
/** Deeper work (plans, analysis, Writing/Speaking feedback) uses the smart model; everyday chat stays fast and cheap. */
// Chat stays on the fast model: it answers in seconds and is rarely overloaded.
// Only explicit plan/feedback coaching asks for the bigger model, and falls back
// to the fast one if that is busy.
const SMART_CAPABILITIES = new Set<MinoCapabilityId>(['study-planner', 'writing-coach', 'speaking-coach']);

export function chooseTier(turn: Pick<MinoTurn, 'capability' | 'message'>): ModelTier {
  return turn.capability && SMART_CAPABILITIES.has(turn.capability) ? 'smart' : 'fast';
}

export async function runMino(provider: AIProvider, turn: MinoTurn): Promise<{ response: string; metadata: MinoResponseMetadata }> {
  const tier = chooseTier(turn);
  const started = Date.now();
  const ctx: ToolContext = { uid: turn.student.uid, idToken: turn.student.idToken, actions: [], tzOffsetMinutes: turn.tzOffsetMinutes };

  // Facts come from the database, never from the browser. If the read fails,
  // Mino is told plainly that it has no data rather than guessing.
  const snapshot = await buildStudentSnapshot(turn.student, turn.tzOffsetMinutes).catch((error) => {
    console.warn('[mino] snapshot failed', (error as Error).message);
    return 'STUDENT SNAPSHOT: unavailable right now. You do not know this student\'s data; do not guess it.';
  });

  const request = {
    system: buildSystemPrompt({ language: turn.language, snapshot, capability: turn.capability }),
    messages: [...trimHistory(turn.history), { role: 'user' as const, content: turn.message }],
    maxOutputTokens: LIMITS.maxOutputTokens,
    tools: toolDeclarations,
    runTool: (name: string, args: unknown) => runTool(ctx, name, args as Record<string, unknown>),
    maxToolRounds: LIMITS.maxToolRounds,
  };
  // A busy or slow model can fail mid-conversation (after tool calls), where the
  // provider can't switch models. Then the whole turn is retried once on the
  // fast chain; tools are read-only or idempotent, so repeating them is safe.
  let result;
  let usedTier: ModelTier = tier;
  try {
    result = await provider.run({ ...request, tier, timeoutMs: 18_000, budgetMs: tier === 'smart' ? 24_000 : 30_000 });
  } catch (error) {
    const transient = error instanceof MinoError && (error.code === 'provider_busy' || error.code === 'timeout');
    if (!transient) throw error;
    console.warn('[mino] retrying turn on the fast model', JSON.stringify({ tier, reason: (error as MinoError).code }));
    usedTier = 'fast';
    result = await provider.run({ ...request, tier: 'fast', timeoutMs: 15_000, budgetMs: 25_000 });
  }

  return {
    response: result.text,
    metadata: {
      model: result.model,
      tier: usedTier,
      latencyMs: Date.now() - started,
      toolCalls: result.toolCalls,
      usage: result.usage,
      ...(ctx.actions?.length ? { actions: ctx.actions.filter(isMinoAction) } : {}),
    },
  };
}
