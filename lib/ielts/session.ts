// A test attempt, stored at users/{uid}/testSessions/{sessionId}. Pure
// functions only: the UI keeps a session in state and a repository saves it.
import type { ObjectiveSection, ObjectiveSkill, PracticeTest } from './model';
import { answerMode } from './question-types';
import { scoreSection, type Answers, type AnswerValue, type SectionResult } from './scoring';

export type SessionStatus = 'in-progress' | 'submitted';

export interface TestSession {
  id: string;
  testId: string;
  bookId: string;
  skill: ObjectiveSkill;
  status: SessionStatus;
  startedAt: string;
  updatedAt: string;
  submittedAt?: string;
  timeLimitSeconds: number;
  /** Active time spent; the timer pauses while the student is away. */
  elapsedSeconds: number;
  answers: Answers;
  /** Question numbers marked for review. */
  flagged: number[];
  /** Where the student was, restored after a refresh. */
  currentNumber: number;
  /** Submitted because the time ran out. */
  timedOut?: boolean;
  result?: SectionResult;
}

export function createSession(test: PracticeTest, skill: ObjectiveSkill, now = new Date()): TestSession {
  const section = test.sections[skill];
  if (!section) throw new Error(`${test.id} has no ${skill} section`);
  const at = now.toISOString();
  return {
    id: `${test.id}-${skill}-${now.getTime().toString(36)}`,
    testId: test.id,
    bookId: test.bookId,
    skill,
    status: 'in-progress',
    startedAt: at,
    updatedAt: at,
    timeLimitSeconds: section.timeLimitMinutes * 60,
    elapsedSeconds: 0,
    answers: {},
    flagged: [],
    currentNumber: 1,
  };
}

const touch = (s: TestSession, patch: Partial<TestSession>): TestSession => ({ ...s, ...patch, updatedAt: new Date().toISOString() });

export function setAnswer(session: TestSession, key: string, value: AnswerValue): TestSession {
  if (session.status !== 'in-progress') return session;
  const answers = { ...session.answers };
  const empty = Array.isArray(value) ? value.length === 0 : value.trim() === '';
  if (empty) delete answers[key];
  else answers[key] = value;
  return touch(session, { answers });
}

export function toggleFlag(session: TestSession, number: number): TestSession {
  const flagged = session.flagged.includes(number) ? session.flagged.filter((n) => n !== number) : [...session.flagged, number].sort((a, b) => a - b);
  return touch(session, { flagged });
}

export function goTo(session: TestSession, number: number): TestSession {
  return session.currentNumber === number ? session : touch(session, { currentNumber: number });
}

export function tick(session: TestSession, seconds: number): TestSession {
  if (session.status !== 'in-progress') return session;
  return { ...session, elapsedSeconds: Math.min(session.timeLimitSeconds, session.elapsedSeconds + seconds) };
}

export const remainingSeconds = (s: TestSession) => Math.max(0, s.timeLimitSeconds - s.elapsedSeconds);

export function submit(session: TestSession, test: PracticeTest, opts: { timedOut?: boolean } = {}): TestSession {
  if (session.status === 'submitted') return session;
  const section = test.sections[session.skill] as ObjectiveSection;
  return touch(session, {
    status: 'submitted',
    submittedAt: new Date().toISOString(),
    ...(opts.timedOut ? { timedOut: true } : {}),
    result: scoreSection(section, session.answers, test.module),
  });
}

// ---------- navigation helpers ----------

export interface QuestionSlot {
  number: number;
  partId: string;
  /** Answer key: the question id, or the group id for multi-choice groups. */
  answerKey: string;
}

/** Every question number in order, with the part it belongs to and where its answer lives. */
export function questionSlots(section: ObjectiveSection): QuestionSlot[] {
  return section.parts
    .flatMap((part) =>
      part.groups.flatMap((group) =>
        group.questions.map((q) => ({ number: q.number, partId: part.id, answerKey: answerMode(group) === 'multi-choice' ? group.id : q.id })),
      ),
    )
    .sort((a, b) => a.number - b.number);
}

/** A question counts as answered when its slot has a value; multi-choice groups fill in order. */
export function answeredNumbers(section: ObjectiveSection, answers: Answers): Set<number> {
  const done = new Set<number>();
  for (const part of section.parts) {
    for (const group of part.groups) {
      const multi = answerMode(group) === 'multi-choice';
      const picked = multi ? (answers[group.id] as string[] | undefined)?.length ?? 0 : 0;
      group.questions.forEach((q, i) => {
        if (multi ? i < picked : Boolean(answers[q.id])) done.add(q.number);
      });
    }
  }
  return done;
}
