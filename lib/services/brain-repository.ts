import { collection, deleteDoc, doc, onSnapshot, setDoc, type Firestore } from 'firebase/firestore';
import type { BrainWord } from '@/lib/models';
import { readJSON, writeJSON } from './local-store';

/**
 * Persistence for the student's Brain. The UI depends only on this interface:
 * guests use localStorage, signed-in students use
 * users/{uid}/vocabulary/{wordId} in Firestore.
 */
export interface BrainRepository {
  /** Streams the full word list; returns an unsubscribe function. */
  subscribe(userId: string, onChange: (words: BrainWord[]) => void, onError?: (e: unknown) => void): () => void;
  put(userId: string, word: BrainWord): Promise<void>;
  remove(userId: string, wordId: string): Promise<void>;
}

const localKey = (userId: string) => `vocabbrain:brain:${userId}`;
const localListeners = new Map<string, Set<(words: BrainWord[]) => void>>();

function readLocal(userId: string): BrainWord[] {
  return readJSON<BrainWord[]>(localKey(userId)) ?? [];
}

function writeLocal(userId: string, words: BrainWord[]) {
  writeJSON(localKey(userId), words);
  localListeners.get(userId)?.forEach((fn) => fn(words));
}

export const localBrainRepository: BrainRepository = {
  subscribe(userId, onChange) {
    const set = localListeners.get(userId) ?? new Set();
    set.add(onChange);
    localListeners.set(userId, set);
    onChange(readLocal(userId));
    return () => set.delete(onChange);
  },
  async put(userId, word) {
    const words = readLocal(userId).filter((w) => w.id !== word.id);
    writeLocal(userId, [...words, word]);
  },
  async remove(userId, wordId) {
    writeLocal(
      userId,
      readLocal(userId).filter((w) => w.id !== wordId),
    );
  },
};

export function createFirestoreBrainRepository(db: Firestore): BrainRepository {
  const col = (userId: string) => collection(db, 'users', userId, 'vocabulary');
  return {
    subscribe(userId, onChange, onError) {
      return onSnapshot(
        col(userId),
        (snap) => onChange(snap.docs.map((d) => ({ ...(d.data() as BrainWord), id: d.id }))),
        (error) => onError?.(error),
      );
    },
    async put(userId, word) {
      // JSON round-trip drops undefined fields, which Firestore rejects.
      await setDoc(doc(col(userId), word.id), JSON.parse(JSON.stringify(word)));
    },
    async remove(userId, wordId) {
      await deleteDoc(doc(col(userId), wordId));
    },
  };
}
