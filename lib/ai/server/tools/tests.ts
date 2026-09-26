import { analyseTests, QUESTION_TYPE_LABELS, type TestSession } from '@/lib/ielts';
import { getTest } from '@/lib/ielts/content';
import { listOwnCollection } from '../firestore-rest';
import type { MinoTool, ToolContext } from './types';

async function loadSessions({ uid, idToken }: ToolContext): Promise<TestSession[]> {
  return (await listOwnCollection(uid, idToken, 'testSessions')) as unknown as TestSession[];
}

const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;

/** Submitted practice tests, newest first; with sessionId, one test's mistakes in detail. */
export const getTestHistory: MinoTool = {
  declaration: {
    name: 'getTestHistory',
    description:
      "The student's submitted practice tests (newest first): date, test, skill, score, band estimate (full tests only), time used. With sessionId (or latest=true), also returns that test's per-part and per-type scores and every wrong answer with the correct answer and explanation.",
    parameters: {
      type: 'object',
      properties: {
        sessionId: { type: 'string', description: 'A test attempt id from the history list.' },
        latest: { type: 'boolean', description: 'Return detail for the most recent test.' },
      },
    },
  },
  async run(ctx, args) {
    const sessions = await loadSessions(ctx);
    const { attempts } = analyseTests(sessions, getTest);
    if (attempts.length === 0) return { tests: [], note: 'No submitted practice tests yet.' };
    const list = attempts.slice(0, 10).map((a) => ({
      sessionId: a.sessionId,
      date: a.submittedAt.slice(0, 10),
      test: a.testTitle,
      skill: a.skill,
      score: `${a.correct}/${a.total}`,
      accuracy: `${a.accuracy}%`,
      estimatedBand: a.estimatedBand ?? 'n/a (not a full 40-question section)',
      timeUsed: clock(a.timeUsedSeconds),
      timedOut: a.timedOut,
    }));
    const id = typeof args.sessionId === 'string' ? args.sessionId : args.latest ? attempts[0].sessionId : undefined;
    const session = id ? sessions.find((s) => s.id === id && s.status === 'submitted') : undefined;
    if (!session?.result) return { tests: list };

    const test = getTest(session.testId);
    const questions = new Map(
      (test?.sections[session.skill]?.parts ?? []).flatMap((p) => p.groups.flatMap((g) => g.questions.map((q) => [q.id, q] as const))),
    );
    const r = session.result;
    return {
      tests: list,
      detail: {
        sessionId: session.id,
        test: test?.title ?? session.testId,
        skill: session.skill,
        score: `${r.correct}/${r.total}`,
        byPart: r.byPart.map((p) => `${session.skill === 'reading' ? 'Passage' : 'Part'} ${p.number}: ${p.correct}/${p.total}`),
        byType: r.byType.map((x) => `${QUESTION_TYPE_LABELS[x.type]}: ${x.correct}/${x.total}`),
        wrong: r.questions
          .filter((q) => !q.correct)
          .map((q) => {
            const content = questions.get(q.questionId);
            return {
              q: q.number,
              type: QUESTION_TYPE_LABELS[q.type],
              statement: content?.prompt,
              given: q.unanswered ? '(blank)' : q.given,
              correct: q.expected[0]?.replace(/[()]/g, ''),
              flags: [q.nearMiss && 'spelling slip', q.overLimit && 'over word limit'].filter(Boolean),
              why: content?.explanation?.text,
              evidence: content?.explanation?.evidence?.quote,
              trap: q.given ? content?.explanation?.distractors?.[q.given] : undefined,
            };
          }),
      },
    };
  },
};

export const getQuestionPerformance: MinoTool = {
  declaration: {
    name: 'getQuestionPerformance',
    description:
      'Accuracy per question type and per part/passage across all submitted practice tests, with the latest test for comparison. Use to answer "which question types am I weak at?" or "am I improving?".',
    parameters: {
      type: 'object',
      properties: { skill: { type: 'string', enum: ['reading', 'listening'], description: 'Limit to one skill.' } },
    },
  },
  async run(ctx, args) {
    const a = analyseTests(await loadSessions(ctx), getTest);
    const skill = args.skill === 'reading' || args.skill === 'listening' ? args.skill : undefined;
    const pick = <T extends { skill: string }>(xs: T[]) => (skill ? xs.filter((x) => x.skill === skill) : xs);
    return {
      dataNote: a.dataNote,
      byType: pick(a.byType).map((x) => ({
        skill: x.skill,
        type: x.label,
        overall: `${x.correct}/${x.total} (${x.accuracy}%)`,
        answered: `${x.attemptedCorrect}/${x.attempted} correct of the questions answered`,
        latestTest: `${x.latest.correct}/${x.latest.total}`,
        tests: x.tests,
      })),
      byPart: pick(a.byPart).map((p) => ({ skill: p.skill, part: p.part, overall: `${p.correct}/${p.total} (${p.accuracy}%)` })),
      scoresOverTime: a.attempts.slice().reverse().map((x) => `${x.submittedAt.slice(0, 10)} ${x.testTitle} ${x.skill}: ${x.accuracy}%`),
    };
  },
};

export const getWeakAreas: MinoTool = {
  declaration: {
    name: 'getWeakAreas',
    description:
      "The student's weakest question types and parts from real test answers, each with accuracy, how much data it rests on (confidence), mistake patterns with concrete evidence (spelling slips, word limit, NOT GIVEN confusion, known distractor traps, blanks, running out of time) and the strategy topic to explain. Use before diagnosing or recommending practice.",
    parameters: { type: 'object', properties: {} },
  },
  async run(ctx) {
    const a = analyseTests(await loadSessions(ctx), getTest);
    return {
      dataNote: a.dataNote,
      weakAreas: a.weakAreas.map((w) => ({
        skill: w.skill,
        area: w.label,
        accuracy: `${w.correct}/${w.total} correct of the questions answered (${w.accuracy}%)`,
        confidence: w.confidence,
        patternsHere: w.patterns,
        strategyTopic: w.guideTopic,
      })),
      patterns: a.patterns,
      rule: 'Only name causes that appear in patterns/evidence. If confidence is low, say it is an early signal and suggest another test.',
    };
  },
};
