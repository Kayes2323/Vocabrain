import { collection, doc, getDoc, getDocs, query, setDoc, where, type Firestore } from 'firebase/firestore';
import type { IELTSSkillId, TestSession } from '@/lib/ielts';
import { readJSON, writeJSON } from './local-store';

/**
 * Persistence for test attempts. Guests use localStorage; signed-in students
 * use users/{uid}/testSessions/{sessionId}. Saves are serialised per session,
 * latest-wins, so answering quickly never writes out of order.
 */
export interface TestSessionRepository {
  get(userId: string, id: string): Promise<TestSession | null>;
  /** The unfinished attempt at this test/skill, to resume after a refresh. */
  findActive(userId: string, testId: string, skill: IELTSSkillId): Promise<TestSession | null>;
  list(userId: string): Promise<TestSession[]>;
  save(userId: string, session: TestSession): Promise<void>;
  /** Writes now and resolves when stored (before asking the server to read it). */
  saveNow(userId: string, session: TestSession): Promise<void>;
}

/** Firestore rejects undefined; a JSON round-trip also drops any class instances. */
const clean = (s: TestSession): TestSession => JSON.parse(JSON.stringify(s));
const newestFirst = (a: TestSession, b: TestSession) => b.updatedAt.localeCompare(a.updatedAt);
const isActive = (s: TestSession, testId: string, skill: IELTSSkillId) => s.testId === testId && s.skill === skill && s.status === 'in-progress';

const localKey = (userId: string) => `vocabbrain:testSessions:${userId}`;
const readLocal = (userId: string) => readJSON<Record<string, TestSession>>(localKey(userId)) ?? {};

export const localTestSessionRepository: TestSessionRepository = {
  async get(userId, id) {
    return readLocal(userId)[id] ?? null;
  },
  async findActive(userId, testId, skill) {
    return Object.values(readLocal(userId)).filter((s) => isActive(s, testId, skill)).sort(newestFirst)[0] ?? null;
  },
  async list(userId) {
    return Object.values(readLocal(userId)).sort(newestFirst);
  },
  async save(userId, session) {
    writeJSON(localKey(userId), { ...readLocal(userId), [session.id]: clean(session) });
  },
  async saveNow(userId, session) {
    writeJSON(localKey(userId), { ...readLocal(userId), [session.id]: clean(session) });
  },
};

export function createFirestoreTestSessionRepository(db: Firestore): TestSessionRepository {
  const col = (userId: string) => collection(db, 'users', userId, 'testSessions');
  const pending = new Map<string, TestSession>();
  const writing = new Set<string>();

  const pump = async (userId: string, id: string) => {
    if (writing.has(id)) return;
    writing.add(id);
    try {
      for (let next = pending.get(id); next; next = pending.get(id)) {
        pending.delete(id);
        try {
          await setDoc(doc(col(userId), id), clean(next));
        } catch (error) {
          console.error('[tests] Save failed', error);
        }
      }
    } finally {
      writing.delete(id);
    }
  };

  return {
    async get(userId, id) {
      const snap = await getDoc(doc(col(userId), id));
      return snap.exists() ? (snap.data() as TestSession) : null;
    },
    async findActive(userId, testId, skill) {
      const snap = await getDocs(query(col(userId), where('testId', '==', testId), where('status', '==', 'in-progress')));
      return snap.docs.map((d) => d.data() as TestSession).filter((s) => isActive(s, testId, skill)).sort(newestFirst)[0] ?? null;
    },
    async list(userId) {
      const snap = await getDocs(col(userId));
      return snap.docs.map((d) => d.data() as TestSession).sort(newestFirst);
    },
    async save(userId, session) {
      pending.set(session.id, session);
      void pump(userId, session.id);
    },
    async saveNow(userId, session) {
      pending.delete(session.id);
      while (writing.has(session.id)) await new Promise((r) => setTimeout(r, 50));
      await setDoc(doc(col(userId), session.id), clean(session));
    },
  };
}
