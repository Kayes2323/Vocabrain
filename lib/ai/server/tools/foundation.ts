import { findLesson, getConcept } from '@/lib/foundation/content';
import { dailyGoal, levelProgress, nextAction, reviewDue, topicSummary, REVIEW_WINDOW_DAYS } from '@/lib/foundation/progress';
import { withProfileDefaults } from '@/lib/services/profile-repository';
import { readOwnDoc } from '../firestore-rest';
import { studentNow } from '../mino/snapshot';
import type { MinoTool } from './types';

/** The student's IELTS Foundation data: topics, mistakes, review and next step. Read-only, own data only. */
export const getFoundationProgress: MinoTool = {
  declaration: {
    name: 'getFoundationProgress',
    description:
      "The student's IELTS Foundation course data from their stored answers: foundation check result, lessons completed with scores, per-topic accuracy (strong / weak / review), topics due for review (repeated recent mistakes), their latest mistakes (question, their answer, correct answer, category), today's goal and the one recommended next step with its link. Use it before talking about the student's grammar or Foundation progress. Never state a number that is not in this data.",
    parameters: {
      type: 'object',
      properties: {
        mistakes: { type: 'integer', description: 'How many recent mistakes to return (default 10, max 30).' },
        concept: { type: 'string', description: 'Only mistakes for this concept (e.g. present-perfect).' },
      },
    },
  },
  async run(ctx, args) {
    const now = studentNow(ctx.tzOffsetMinutes);
    const doc = await readOwnDoc(ctx.uid, ctx.idToken);
    if (!doc) return { found: false, note: 'No profile yet.' };
    const profile = withProfileDefaults(ctx.uid, (doc.app ?? {}) as never);
    const fp = profile.foundation;
    const n = Math.min(30, Math.max(1, typeof args.mistakes === 'number' ? args.mistakes : 10));
    const concept = typeof args.concept === 'string' ? args.concept : undefined;
    const action = nextAction(fp, now);
    const goal = dailyGoal(profile, now);
    const link =
      action.kind === 'check' ? '/ielts/foundation/diagnostic'
      : action.kind === 'review' ? `/ielts/foundation/review/${action.concept}`
      : action.kind === 'lesson' || action.kind === 'resume' ? `/ielts/foundation/lesson/${action.lessonId}`
      : action.kind === 'quiz' ? `/ielts/foundation/quiz/${action.moduleId}`
      : '/ielts/tests';
    return {
      check: fp.diagnostic
        ? { date: fp.diagnostic.completedAt.slice(0, 10), level: fp.diagnostic.level, percent: fp.diagnostic.percent, areas: fp.diagnostic.areas, lessonsSkipped: fp.diagnostic.skippedLessons?.length ?? 0 }
        : 'not taken',
      level1ProgressPercent: levelProgress(1, fp),
      lessons: Object.entries(fp.lessons).map(([id, r]) => ({ lesson: findLesson(id)?.lesson.title.en ?? id, bestScore: r.best, lastScore: r.score, attempts: r.attempts, date: r.completedAt.slice(0, 10) })),
      unfinishedLesson: fp.inProgress ? findLesson(fp.inProgress.lessonId)?.lesson.title.en : null,
      topics: topicSummary(fp, now).map((x) => ({ topic: getConcept(x.concept)?.title.en ?? x.concept, id: x.concept, accuracy: `${x.accuracy}%`, answers: x.attempts, status: x.status, recentMistakes: x.recentMistakes })),
      reviewDue: reviewDue(fp, now).map((x) => ({ topic: getConcept(x.concept)?.title.en, id: x.concept, mistakes: x.count, window: `${REVIEW_WINDOW_DAYS} days`, link: `/ielts/foundation/review/${x.concept}` })),
      recentMistakes: fp.mistakes
        .filter((m) => !concept || m.concept === concept)
        .slice(-n)
        .reverse()
        .map((m) => ({ date: m.at.slice(0, 10), where: m.source, question: m.prompt, answered: m.answer, correct: m.correctAnswer, category: m.tag, topic: m.concept })),
      today: { goal: `${goal.lessons} lessons + ${goal.questions} questions`, done: `${goal.doneLessons} lessons, ${goal.doneQuestions} questions` },
      nextStep: { kind: action.kind, link },
      rule: 'Only use these numbers. If something is not here, say you do not have that data yet.',
    };
  },
};
