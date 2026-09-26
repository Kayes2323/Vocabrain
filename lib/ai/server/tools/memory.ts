import { addNote, MEMORY_CATEGORIES, type MemoryCategory, type MinoMemoryDoc } from '../../memory';
import { readOwnDoc, writeOwnDoc } from '../firestore-rest';
import type { MinoTool } from './types';

/** Reads the student's memory notes (also summarised in the snapshot). */
export async function readMemory(uid: string, idToken: string): Promise<MinoMemoryDoc | null> {
  const doc = (await readOwnDoc(uid, idToken, 'mino/memory')) as Partial<MinoMemoryDoc> | null;
  return doc && Array.isArray(doc.notes) ? { notes: doc.notes, updatedAt: doc.updatedAt ?? '' } : null;
}

const SENSITIVE = /password|passcode|otp|\bpin\b|bkash|nagad|card number|nid|passport no|phone|email|address|religio|health|illness|disease/i;

/** Lets Mino keep a short, useful note the student told it. */
export const rememberAboutStudent: MinoTool = {
  declaration: {
    name: 'rememberAboutStudent',
    description:
      'Save ONE short note (max ~20 words) the student told you that will help future sessions and is not already in their profile: a goal detail, a learning preference, a worry, a strength, a recurring struggle or useful context (e.g. "Afraid of Speaking Part 2; freezes after 30 seconds", "Prefers Bangla explanations with English examples", "Studies after 10pm because of classes"). Never store passwords, contact details, ID numbers, money details, health or religion. Tell the student briefly that you will remember it.',
    parameters: {
      type: 'object',
      properties: {
        category: { type: 'string', enum: [...MEMORY_CATEGORIES], description: 'Kind of note.' },
        note: { type: 'string', description: 'The note, in English, third person, short.' },
      },
      required: ['category', 'note'],
    },
  },
  async run({ uid, idToken }, args) {
    const category = MEMORY_CATEGORIES.includes(args.category as MemoryCategory) ? (args.category as MemoryCategory) : 'context';
    const note = String(args.note ?? '');
    if (SENSITIVE.test(note)) return { saved: false, reason: 'Sensitive information is never stored.' };
    const { doc, added } = addNote(await readMemory(uid, idToken), category, note);
    if (added) await writeOwnDoc(uid, idToken, 'mino/memory', doc as unknown as Record<string, unknown>);
    return { saved: added, notes: doc.notes.length };
  },
};
