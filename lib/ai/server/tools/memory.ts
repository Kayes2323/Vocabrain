import { readOwnDoc } from '../firestore-rest';
import type { MinoTool } from './types';

/**
 * Long-term student memory lives at users/{uid}/mino/memory: a small,
 * curated summary (goals, preferences, key weaknesses, observations), not a
 * transcript. Conversations themselves are short-term and not stored.
 * Writing to memory is a later step; Mino can already read it.
 */
export interface MinoMemory {
  summary?: string;
  goals?: string[];
  preferences?: string[];
  weaknesses?: string[];
  observations?: { at: string; note: string }[];
  updatedAt?: string;
}

export const getMinoMemory: MinoTool = {
  declaration: {
    name: 'getMinoMemory',
    description: 'Read what Mino has noted about this student long-term (preferences, key weaknesses, observations).',
    parameters: { type: 'object', properties: {} },
  },
  async run({ uid, idToken }) {
    const memory = await readOwnDoc(uid, idToken, 'mino/memory');
    return memory ?? { empty: true };
  },
};
