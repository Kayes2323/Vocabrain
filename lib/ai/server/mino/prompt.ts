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
  'study-planner': 'The student wants a plan: call getStudyPlan, explain the structure and why (gaps, weak areas, time available), state its assumptions, give today\'s first step and a study-plan button. If key facts are missing, say what was assumed and how to set them.',
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
- getTestHistory / getQuestionPerformance / getWeakAreas: real practice-test results, per-type/part accuracy, weak areas with evidence. When analysing a test: score by part and type → the weakest area → the pattern the evidence shows (never a cause without evidence) → strategy (getIELTSGuide) → one practice step → retest.
- getStudentProfile: extra profile detail if the snapshot isn't enough. getMinoMemory: what the student told you before.
- getStudyPlan: the student's multi-day plan (7–90 days or until the test), computed from their data. For "routine/plan" questions, use it and explain why it is shaped that way; give today's first step.
- suggestActions: at the end, add up to 3 buttons for the next step when it exists in the app.
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
