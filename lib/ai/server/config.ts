// Server-only Mino configuration. Imported by API routes, never by client code.
import type { ModelTier } from '../types';

/**
 * Model per tier, changeable without code changes. Defaults favour low cost:
 * `fast` for everyday chat, `smart` for deeper analysis (Phase 4+).
 */
export const MODELS: Record<ModelTier, string> = {
  fast: process.env.MINO_MODEL_FAST || 'gemini-2.5-flash-lite',
  smart: process.env.MINO_MODEL_SMART || 'gemini-2.5-flash',
};

export const LIMITS = {
  /** Max characters in one student message. */
  messageChars: 2000,
  /** Recent turns sent to the model (short-term memory). */
  historyTurns: 10,
  historyChars: 6000,
  maxOutputTokens: 1024,
  maxToolRounds: 3,
  /** Provider call timeout. */
  timeoutMs: 25_000,
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
