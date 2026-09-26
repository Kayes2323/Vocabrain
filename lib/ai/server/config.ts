// Server-only Mino configuration. Imported by API routes, never by client code.
import type { ModelTier } from '../types';

/**
 * Models per tier, tried in order until one exists for this API key. Google
 * retires models over time; the chain keeps Mino working when one disappears.
 * `MINO_MODEL_FAST` / `MINO_MODEL_SMART` put a specific model first.
 */
const chain = (preferred: string | undefined, defaults: string[]) =>
  [...new Set([preferred?.trim(), ...defaults].filter((m): m is string => Boolean(m)))];

export const MODEL_CHAINS: Record<ModelTier, string[]> = {
  fast: chain(process.env.MINO_MODEL_FAST, ['gemini-3.5-flash-lite', 'gemini-3.1-flash-lite', 'gemini-2.5-flash-lite']),
  // Last resort: the fast model, so deep work still gets an answer when bigger models are overloaded.
  smart: chain(process.env.MINO_MODEL_SMART, ['gemini-3.5-flash', 'gemini-2.5-flash', 'gemini-3.5-flash-lite']),
};

export const LIMITS = {
  /** Max characters in one student message. */
  messageChars: 2000,
  /** Recent turns sent to the model (short-term memory). */
  historyTurns: 10,
  historyChars: 6000,
  /** Newer models think before answering; thinking counts towards this limit. */
  maxOutputTokens: 2048,
  maxToolRounds: 4,
  /** Provider call timeout. */
  timeoutMs: 20_000,
  /** Per-student limits (best effort per server instance; see rate-limit.ts). */
  perMinute: 8,
  perDay: 150,
} as const;

/** Reads the Gemini key. The value is never logged or returned to clients. */
export function geminiApiKey(): string | undefined {
  const key = process.env.GEMINI_API_KEY;
  return key && key.trim() ? key.trim() : undefined;
}

export const firebaseProjectId = () => process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

/** Local development against the Firebase emulators (never on Vercel). */
export const usingFirebaseEmulator = () =>
  process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === 'true' && !process.env.VERCEL;
