import { readOwnDoc } from '../firestore-rest';
import type { MinoTool } from './types';

/** The student's goals and IELTS status from users/{uid}. */
export const getStudentProfile: MinoTool = {
  declaration: {
    name: 'getStudentProfile',
    description:
      "Get the student's name, language, goal, IELTS target, current estimated bands, study time and test date. Use when advice depends on their goals or level.",
    parameters: { type: 'object', properties: {} },
  },
  async run({ uid, idToken }) {
    const doc = await readOwnDoc(uid, idToken);
    if (!doc) return { found: false };
    const app = (doc.app ?? {}) as Record<string, any>;
    return {
      name: doc.name || undefined,
      preferredLanguage: doc.preferredLanguage,
      goal: app.goal,
      targetBand: doc.targetIELTSScore ?? app.ielts?.targetBand,
      estimatedOverall: doc.currentIELTSLevel,
      estimatedBands: app.ielts?.currentBands,
      estimateIsOfficial: false,
      weeklyStudyHours: app.ielts?.weeklyStudyHours,
      testDate: app.ielts?.testDate,
      studyAbroad: doc.studyAbroadGoal ?? undefined,
    };
  },
};
