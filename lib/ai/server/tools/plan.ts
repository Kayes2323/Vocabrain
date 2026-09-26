import { brainSummary, buildStudyPlan, PLAN_HORIZONS } from '@/lib/engine';
import { getTranslator, type Message } from '@/lib/i18n';
import { analyseTests, type TestSession } from '@/lib/ielts';
import { getTest } from '@/lib/ielts/content';
import type { BrainWord } from '@/lib/models';
import { withProfileDefaults } from '@/lib/services/profile-repository';
import { listOwnCollection, readOwnDoc } from '../firestore-rest';
import { studentNow } from '../mino/snapshot';
import type { MinoTool } from './types';

/** The same multi-day plan the student sees at IELTS → My IELTS Plan. */
export const getStudyPlan: MinoTool = {
  declaration: {
    name: 'getStudyPlan',
    description:
      "Build the student's study plan from their real data (target, bands, test date, study time, weak test areas, due words): minutes per day, focus areas with reasons, phases, the first week day by day, and assumptions for missing data. The student can open it in the app (study-plan button). Explain it; don't invent a different structure.",
    parameters: {
      type: 'object',
      properties: {
        days: { type: 'integer', description: `Plan length in days: ${PLAN_HORIZONS.join(', ')}. Omit to plan until the test date (or 30 days).` },
      },
    },
  },
  async run(ctx, args) {
    const now = studentNow(ctx.tzOffsetMinutes);
    const [doc, words, sessions] = await Promise.all([
      readOwnDoc(ctx.uid, ctx.idToken),
      listOwnCollection(ctx.uid, ctx.idToken, 'vocabulary').catch(() => []),
      listOwnCollection(ctx.uid, ctx.idToken, 'testSessions').catch(() => []),
    ]);
    if (!doc) return { found: false, note: 'No profile yet: ask the student to finish onboarding first.' };
    const profile = withProfileDefaults(ctx.uid, (doc.app ?? {}) as never);
    const analysis = analyseTests(sessions as unknown as TestSession[], getTest);
    const brain = brainSummary(words as unknown as BrainWord[], now);
    const days = typeof args.days === 'number' ? args.days : 'test';
    const plan = buildStudyPlan(
      profile,
      days,
      {
        weakAreas: analysis.weakAreas.map((w) => ({ skill: w.skill, label: w.label, accuracy: w.accuracy })),
        brain,
        testedSkills: [...new Set(analysis.attempts.map((a) => a.skill))],
      },
      now,
    );
    const t = getTranslator('en').t;
    const text = (m: Message) => t(m.key, m.vars);
    return {
      horizonDays: plan.horizonDays,
      from: plan.startDate,
      to: plan.endDate,
      testDate: plan.testDate ?? 'not set',
      minutesPerDay: plan.minutesPerDay,
      studyDaysPerWeek: plan.studyDaysPerWeek,
      focus: plan.focus.map((f) => `${f.kind} ${f.weight}%: ${f.reason.map(text).join(' ')}`),
      phases: plan.phases.map((p) => `${p.id}: day ${p.fromDay}–${p.toDay}`),
      firstWeek: plan.days.slice(0, 7).map((d) => (d.rest ? `${d.date}: rest` : `${d.date}: ${d.blocks.map((b) => `${text(b.title)} ${b.minutes}m`).join(' + ')}`)),
      assumptions: plan.assumptions.map(text),
      openInApp: '/ielts/plan',
      rule: 'Plans guide practice; never promise a band score.',
    };
  },
};
