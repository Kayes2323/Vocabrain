// Provider-agnostic AI contracts. UI code talks to Mino through these types and
// never imports a vendor SDK, so the model or provider can change freely.

export type MinoCapabilityId =
  | 'next-action'
  | 'study-planner'
  | 'ielts-coach'
  | 'vocabulary-coach'
  | 'writing-coach'
  | 'speaking-coach'
  | 'study-abroad-advisor'
  | 'application-manager'
  | 'sop-assistant'
  | 'cv-assistant'
  | 'lor-assistant'
  | 'interview-coach';

/** A turn in the short-term conversation (what the student sees). */
export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

/** Model tiers. Simple chat uses `fast`; deeper analysis uses `smart`. */
export type ModelTier = 'fast' | 'smart';

/** A function Mino can call. Parameters follow the JSON-schema subset providers share. */
export interface ToolDeclaration {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<
      string,
      | { type: 'string' | 'number' | 'integer' | 'boolean'; description: string; enum?: string[] }
      | { type: 'array'; description: string; items: { type: 'string'; enum?: string[] }; maxItems?: number }
    >;
    required?: string[];
  };
}

export interface ToolCallRecord {
  name: string;
  ok: boolean;
}

export interface AIRunRequest {
  system: string;
  messages: AIMessage[];
  tier: ModelTier;
  maxOutputTokens?: number;
  tools?: ToolDeclaration[];
  /** Executes a tool the model asked for and returns JSON-serialisable data. */
  runTool?: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  /** Upper bound on tool round-trips per request (cost and latency guard). */
  maxToolRounds?: number;
  /** Ask for a JSON object reply (structured assessment). */
  json?: boolean;
  /** Per-call timeout; defaults to LIMITS.timeoutMs. */
  timeoutMs?: number;
  /** Total time allowed including fallbacks to other models. */
  budgetMs?: number;
  signal?: AbortSignal;
}

export interface AIRunResult {
  text: string;
  model: string;
  usage?: { inputTokens?: number; outputTokens?: number; totalTokens?: number };
  toolCalls: ToolCallRecord[];
  /** The model stopped early (e.g. output limit). */
  truncated: boolean;
}

/**
 * An AI provider (Gemini today, others later). Implemented server-side only:
 * API keys never reach the browser. Provider-specific details such as tool
 * call formats stay inside the implementation.
 */
export interface AIProvider {
  id: string;
  run(request: AIRunRequest): Promise<AIRunResult>;
}

/**
 * Structured, serialisable student context. Built on the client from the
 * profile, sent to /api/mino, and turned into the system prompt server-side.
 */
export interface MinoContext {
  /** Reply language. 'bn' means casual Bangla with IELTS terms kept in English. */
  language: 'en' | 'bn';
  goal?: string;
  ielts: {
    targetBand?: number;
    currentBands: Partial<Record<'listening' | 'reading' | 'writing' | 'speaking', number>>;
    estimatedOverall?: number;
    weeksUntilTest?: number;
    weeklyStudyHours?: number;
    journeyStage: string;
    /** Always a self-assessment estimate, never an official score. */
    estimateSource?: 'self-assessment' | 'self-reported';
  };
  vocabulary: {
    lastLessonId?: number;
    savedWordCount: number;
    dueToday: number;
    failedLastTime: number;
  };
  abroad: {
    degreeLevel?: string;
    subject?: string;
    targetIntake?: string;
    preferredCountries?: string[];
  };
}

export interface MinoAskRequest {
  message: string;
  language: 'en' | 'bn';
  /** Recent turns for short-term context (trimmed server-side). */
  history: AIMessage[];
  /** Client-side summary. Treated as hints only; tools read authoritative data. */
  userContext: MinoContext;
  capability?: MinoCapabilityId;
  /** Student's UTC offset in minutes (Bangladesh = 360). */
  tzOffsetMinutes?: number;
}

/** Stable error codes the UI turns into friendly, localised messages. */
export type MinoErrorCode =
  | 'unauthenticated'
  | 'not_configured'
  | 'rate_limited'
  | 'timeout'
  | 'provider_busy'
  | 'invalid_request'
  | 'unavailable';

export interface MinoResponseMetadata {
  /** Buttons to show under the reply (whitelisted app destinations). */
  actions?: import('./actions').MinoActionId[];
  model: string;
  tier: ModelTier;
  latencyMs: number;
  toolCalls: ToolCallRecord[];
  usage?: AIRunResult['usage'];
}

export type MinoAskResponse =
  | { ok: true; response: string; metadata: MinoResponseMetadata }
  | { ok: false; error: MinoErrorCode };
