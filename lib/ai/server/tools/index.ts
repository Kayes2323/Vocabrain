import type { ToolDeclaration } from '../../types';
import { getCountryData, getCountryMatch, getStudyAbroadProfile } from './abroad';
import { suggestActions } from './actions';
import { getFoundationProgress } from './foundation';
import { getAppGuide, getIELTSGuide } from './knowledge';
import { rememberAboutStudent } from './memory';
import { getStudyPlan } from './plan';
import { getStudentProfile } from './profile';
import { getQuestionPerformance, getTestHistory, getWeakAreas } from './tests';
import type { MinoTool, ToolContext } from './types';
import { getVocabulary } from './vocabulary';

/**
 * Mino's tool registry. Add a capability by writing a MinoTool and listing it
 * here. Planned next (M2+): getTestHistory, getQuestionPerformance, getWeakAreas,
 * getProgress, createStudyPlan, createPractice, startRecall, saveVocabulary.
 * Write tools will need explicit confirmation rules before they are enabled.
 */
const TOOLS: MinoTool[] = [
  getStudentProfile,
  getVocabulary,
  rememberAboutStudent,
  getAppGuide,
  getIELTSGuide,
  getTestHistory,
  getQuestionPerformance,
  getWeakAreas,
  getFoundationProgress,
  getStudyPlan,
  getStudyAbroadProfile,
  getCountryData,
  getCountryMatch,
  suggestActions,
];

export const toolDeclarations: ToolDeclaration[] = TOOLS.map((t) => t.declaration);

export function runTool(ctx: ToolContext, name: string, args: Record<string, unknown>) {
  const tool = TOOLS.find((t) => t.declaration.name === name);
  if (!tool) throw new Error(`unknown tool ${name}`);
  return tool.run(ctx, args);
}
