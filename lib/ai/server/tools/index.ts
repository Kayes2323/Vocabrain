import type { ToolDeclaration } from '../../types';
import { getMinoMemory } from './memory';
import { getStudentProfile } from './profile';
import type { MinoTool, ToolContext } from './types';
import { getVocabulary } from './vocabulary';

/**
 * Mino's tool registry. Add a capability by writing a MinoTool and listing it
 * here. Planned next: getTodayPlan, getIELTSResults, getWeakAreas,
 * scheduleReview, createStudyTask, saveVocabulary, getStudyAbroadProfile.
 * Write tools will need explicit confirmation rules before they are enabled.
 */
const TOOLS: MinoTool[] = [getStudentProfile, getVocabulary, getMinoMemory];

export const toolDeclarations: ToolDeclaration[] = TOOLS.map((t) => t.declaration);

export function runTool(ctx: ToolContext, name: string, args: Record<string, unknown>) {
  const tool = TOOLS.find((t) => t.declaration.name === name);
  if (!tool) throw new Error(`unknown tool ${name}`);
  return tool.run(ctx, args);
}
