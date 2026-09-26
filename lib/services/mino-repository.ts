import { deleteDoc, doc, getDoc, setDoc, type Firestore } from 'firebase/firestore';
import { CONVERSATION_LIMITS, type MemoryNote, type MinoConversationDoc, type MinoMemoryDoc, type StoredChatMessage } from '@/lib/ai/memory';

/** Mino's memory notes and the recent conversation, under users/{uid}/mino. */
export function createMinoRepository(db: Firestore, uid: string) {
  const ref = (id: 'memory' | 'conversation') => doc(db, 'users', uid, 'mino', id);

  return {
    async loadMemory(): Promise<MemoryNote[]> {
      const snap = await getDoc(ref('memory'));
      return ((snap.data() as MinoMemoryDoc | undefined)?.notes ?? []).slice();
    },
    async forgetNote(id: string): Promise<MemoryNote[]> {
      const notes = (await this.loadMemory()).filter((n) => n.id !== id);
      await setDoc(ref('memory'), { notes, updatedAt: new Date().toISOString() });
      return notes;
    },
    /** The last conversation, if it is less than a week old. */
    async loadConversation(now = Date.now()): Promise<StoredChatMessage[]> {
      const data = (await getDoc(ref('conversation'))).data() as MinoConversationDoc | undefined;
      if (!data?.updatedAt || now - new Date(data.updatedAt).getTime() > CONVERSATION_LIMITS.days * 86_400_000) return [];
      return data.messages ?? [];
    },
    async saveConversation(messages: StoredChatMessage[]): Promise<void> {
      const trimmed = messages.slice(-CONVERSATION_LIMITS.messages).map((m) => ({
        role: m.role,
        content: m.content.slice(0, CONVERSATION_LIMITS.chars),
        ...(m.actions?.length ? { actions: m.actions } : {}),
      }));
      await setDoc(ref('conversation'), { messages: trimmed, updatedAt: new Date().toISOString() });
    },
    async clearConversation(): Promise<void> {
      await deleteDoc(ref('conversation'));
    },
  };
}

export type MinoRepository = ReturnType<typeof createMinoRepository>;
