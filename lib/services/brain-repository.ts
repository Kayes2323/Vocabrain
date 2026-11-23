import { collection, deleteDoc, doc, getDocFromServer, onSnapshot, runTransaction, setDoc, type Firestore } from 'firebase/firestore';
import type { BrainWord } from '@/lib/models';
import { assertValidBrainWord } from '@/lib/engine/brain-validate';

/**
 * Persistence for the student's Brain. The UI depends only on this interface:
 * guests use localStorage, signed-in students use
 * users/{uid}/vocabulary/{wordId} in Firestore.
 */
export interface SnapshotMeta {
  /** True when the list came from the device cache, not (yet) from the server. An empty cached list proves nothing. */
  fromCache: boolean;
}

export interface BrainRepository {
  /** Streams the full word list; returns an unsubscribe function. A failure is reported, never turned into an empty list. */
  subscribe(userId: string, onChange: (words: BrainWord[], meta: SnapshotMeta) => void, onError?: (e: unknown) => void): () => void;
  put(userId: string, word: BrainWord): Promise<void>;
  /** Writes the word only if no document with that id exists yet. Resolves true when it wrote. Never overwrites progress. */
  putIfAbsent(userId: string, word: BrainWord): Promise<boolean>;
  /** Which of these ids exist on the authoritative store right now (a failure rejects; it never answers "none"). */
  confirm(userId: string, wordIds: string[]): Promise<string[]>;
  remove(userId: string, wordId: string): Promise<void>;
}

const localKey = (userId: string) => `vocabbrain:brain:${userId}`;
const localListeners = new Map<string, Set<(words: BrainWord[], meta: SnapshotMeta) => void>>();

function readLocal(userId: string): BrainWord[] {
  try {
    const raw = window.localStorage.getItem(localKey(userId));
    return raw ? (JSON.parse(raw) as BrainWord[]) : [];
  } catch {
    return [];
  }
}

/** A guest's words live in localStorage; if it cannot be written the caller must hear about it. */
function writeLocal(userId: string, words: BrainWord[]) {
  window.localStorage.setItem(localKey(userId), JSON.stringify(words));
  localListeners.get(userId)?.forEach((fn) => fn(words, { fromCache: false }));
}

export const localBrainRepository: BrainRepository = {
  subscribe(userId, onChange) {
    const set = localListeners.get(userId) ?? new Set();
    set.add(onChange);
    localListeners.set(userId, set);
    onChange(readLocal(userId), { fromCache: false });
    return () => set.delete(onChange);
  },
  async put(userId, word) {
    assertValidBrainWord(word);
    const words = readLocal(userId).filter((w) => w.id !== word.id);
    writeLocal(userId, [...words, word]);
  },
  async putIfAbsent(userId, word) {
    assertValidBrainWord(word);
    const words = readLocal(userId);
    if (words.some((w) => w.id === word.id)) return false;
    writeLocal(userId, [...words, word]);
    return true;
  },
  async confirm(userId, wordIds) {
    const have = new Set(readLocal(userId).map((w) => w.id));
    return wordIds.filter((id) => have.has(id));
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
  // JSON round-trip drops undefined fields, which Firestore rejects.
  const clean = (word: BrainWord) => JSON.parse(JSON.stringify(word)) as BrainWord;
  return {
    subscribe(userId, onChange, onError) {
      return onSnapshot(
        col(userId),
        { includeMetadataChanges: true },
        (snap) => onChange(snap.docs.map((d) => ({ ...(d.data() as BrainWord), id: d.id })), { fromCache: snap.metadata.fromCache }),
        (error) => onError?.(error),
      );
    },
    async put(userId, word) {
      assertValidBrainWord(word);
      await setDoc(doc(col(userId), word.id), clean(word));
    },
    async putIfAbsent(userId, word) {
      assertValidBrainWord(word);
      const ref = doc(col(userId), word.id);
      return runTransaction(db, async (tx) => {
        if ((await tx.get(ref)).exists()) return false;
        tx.set(ref, clean(word));
        return true;
      });
    },
    async confirm(userId, wordIds) {
      const found = await Promise.all(wordIds.map(async (id) => ((await getDocFromServer(doc(col(userId), id))).exists() ? id : null)));
      return found.filter((id): id is string => id !== null);
    },
    async remove(userId, wordId) {
      await deleteDoc(doc(col(userId), wordId));
    },
  };
}
