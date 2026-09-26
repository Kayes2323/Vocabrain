// Mino's long-term memory: a few short notes the student shared that help
// later (users/{uid}/mino/memory). Not a transcript. Shared by server and UI.
export const MEMORY_CATEGORIES = ['goal', 'preference', 'concern', 'strength', 'struggle', 'context'] as const;
export type MemoryCategory = (typeof MEMORY_CATEGORIES)[number];

export interface MemoryNote {
  id: string;
  category: MemoryCategory;
  text: string;
  at: string;
}

export interface MinoMemoryDoc {
  notes: MemoryNote[];
  updatedAt: string;
}

export const MEMORY_LIMITS = { notes: 15, noteChars: 160 } as const;

/** Adds a note: trims, skips near-duplicates, and drops the oldest past the cap. */
export function addNote(doc: MinoMemoryDoc | null, category: MemoryCategory, text: string, now = new Date()): { doc: MinoMemoryDoc; added: boolean } {
  const clean = text.replace(/\s+/g, ' ').trim().slice(0, MEMORY_LIMITS.noteChars);
  const notes = doc?.notes ?? [];
  const same = (a: string) => a.toLowerCase().replace(/[^\p{L}\p{N} ]/gu, '');
  if (!clean || notes.some((n) => same(n.text) === same(clean))) return { doc: doc ?? { notes, updatedAt: now.toISOString() }, added: false };
  const note: MemoryNote = { id: `n${now.getTime().toString(36)}${Math.random().toString(36).slice(2, 5)}`, category, text: clean, at: now.toISOString() };
  return { doc: { notes: [...notes, note].slice(-MEMORY_LIMITS.notes), updatedAt: now.toISOString() }, added: true };
}

// Recent conversation, so a refresh or next visit continues the thread.
// Kept for a week and trimmed to the last messages; never an archive.
export interface StoredChatMessage {
  role: 'user' | 'assistant';
  content: string;
  actions?: string[];
}

export interface MinoConversationDoc {
  messages: StoredChatMessage[];
  updatedAt: string;
}

export const CONVERSATION_LIMITS = { messages: 20, chars: 2000, days: 7 } as const;
