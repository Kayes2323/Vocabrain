// Provider-agnostic AI contracts. UI code talks to Mino through these types and
// never imports a vendor SDK, so the model or provider can change freely.

export type MinoCapabilityId =
  | 'next-action'
  | 'ielts-coach'
  | 'vocabulary-coach'
  | 'writing-coach'
  | 'speaking-coach'
  | 'study-abroad-advisor'
  | 'university-assistant'
  | 'scholarship-assistant'
  | 'application-manager'
  | 'interview-coach';

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AICompletionRequest {
  system: string;
  messages: AIMessage[];
  maxTokens?: number;
}

export interface AICompletionResult {
  text: string;
}

/** Implemented server-side only (API keys never reach the browser). */
export interface AIProvider {
  id: string;
  complete(request: AICompletionRequest): Promise<AICompletionResult>;
}

/**
 * Structured, serialisable student context. Built on the client from the
 * profile, sent to /api/mino, and turned into the system prompt server-side.
 */
export interface MinoContext {
  ielts: {
    targetBand?: number;
    currentBands: Partial<Record<'listening' | 'reading' | 'writing' | 'speaking', number>>;
    estimatedOverall?: number;
    weeksUntilTest?: number;
    weeklyStudyHours?: number;
  };
  vocabulary: {
    lastLessonId?: number;
    savedWordCount: number;
  };
  abroad: {
    degreeLevel?: string;
    subject?: string;
    targetIntake?: string;
    preferredCountries?: string[];
  };
}

export interface MinoAskRequest {
  capability: MinoCapabilityId;
  messages: AIMessage[];
  context: MinoContext;
}

export type MinoAskResponse =
  | { ok: true; reply: string }
  | { ok: false; reason: 'unavailable' | 'invalid-request' | 'error'; message: string };
