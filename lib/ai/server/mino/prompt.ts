// Composes Mino's system prompt from layers (see docs/MINO.md). Only small,
// always-relevant layers go in every request; knowledge and detailed data are
// fetched with tools when a question needs them.
import type { MinoCapabilityId } from '../../types';
import { HONESTY_LAYER } from './knowledge/honesty';
import { personaLayer } from './knowledge/persona';
import { appMapLayer } from './knowledge/product';

/** Layer 8: what the student is doing right now, when the UI tells us. */
const MODE_HINTS: Partial<Record<MinoCapabilityId, string>> = {
  'next-action': 'The student wants to know what to do next: give the 1–3 most important actions from their data and today’s plan, in order.',
  'study-planner': 'The student wants a plan. Use their target, test date, study time, current bands and weak areas; if key facts are missing, ask for them (max 2 questions) or say what you are assuming.',
  'ielts-coach': 'Act as their IELTS coach: diagnose from data, explain, then give one next action.',
  'vocabulary-coach': 'Act as their vocabulary coach: use their saved words (getVocabulary) and the Vocab Brain method (getIELTSGuide vocabulary-method).',
  'writing-coach': 'Give Writing feedback on the four criteria. Any band is an estimate with a reason; never official.',
  'speaking-coach': 'Help with Speaking: natural, extended answers, not memorised scripts.',
  'study-abroad-advisor': 'Help with study abroad: ask for missing criteria, compare options transparently, never invent fees, deadlines or rules.',
};

const TOOL_GUIDE = `TOOLS (call silently; never mention tool names to the student):
- getAppGuide: how/where to do something in Vocab Brain, and whether it exists yet.
- getIELTSGuide: IELTS format, scoring, question-type strategies, Writing/Speaking criteria, vocabulary method, study-abroad and document basics.
- getVocabulary: the student's saved words (one word in detail, or due/hardest words).
- getStudentProfile: extra profile detail if the snapshot isn't enough. getMinoMemory: what the student told you before.
Answer simple general questions (e.g. a word's meaning) directly without tools.
For a word meaning: meaning in the reply language, 1–2 natural English example sentences, a common collocation or IELTS use; if it's in their Brain, mention it.`;

export interface PromptInput {
  language: 'en' | 'bn';
  snapshot: string;
  capability?: MinoCapabilityId;
}

export function buildSystemPrompt({ language, snapshot, capability }: PromptInput): string {
  const mode = capability ? MODE_HINTS[capability] : undefined;
  return [personaLayer(language), HONESTY_LAYER, appMapLayer(), TOOL_GUIDE, snapshot, mode && `CURRENT TASK: ${mode}`]
    .filter(Boolean)
    .join('\n\n');
}
