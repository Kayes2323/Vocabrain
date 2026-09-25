// Server-only: imported by API routes, never by client components.
import { MINO } from '@/lib/constants';
import type { AIProvider, MinoContext } from './types';

/**
 * Returns the configured provider, or null when none is set up. Add a provider
 * by implementing AIProvider in lib/ai/providers/ and selecting it here via
 * MINO_AI_PROVIDER. Keys are read from server env vars only.
 */
export function getMinoProvider(): AIProvider | null {
  const id = process.env.MINO_AI_PROVIDER;
  if (!id) return null;
  // No provider is wired yet (Phase 4).
  return null;
}

export function buildMinoSystemPrompt(context: MinoContext): string {
  return [
    `You are ${MINO.name}, ${MINO.role.toLowerCase()} inside Vocab Brain.`,
    'You guide one student through IELTS preparation, vocabulary mastery and study-abroad planning.',
    'Always end with the next concrete actions the student should take.',
    'Never present uncertain study-abroad, visa or immigration information as fact; point to the official source.',
    'Encourage accurate, appropriate and natural vocabulary, not complexity for its own sake.',
    'Band scores you mention are estimates, never official IELTS results.',
    'Never invent achievements, experiences or facts about the student.',
    context.language === 'bn'
      ? 'Reply in friendly, casual Bangla (তুমি), like a helpful senior. Keep IELTS terms such as Listening, Reading, Writing Task 2, Band Score, Mock Test, Visa and Deadline in English.'
      : 'Reply in clear, simple English.',
    `Student context (JSON): ${JSON.stringify(context)}`,
  ].join('\n');
}
