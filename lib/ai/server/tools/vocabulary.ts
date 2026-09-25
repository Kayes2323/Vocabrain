import { listOwnCollection } from '../firestore-rest';
import type { MinoTool } from './types';

type Word = Record<string, any>;

function compact(w: Word) {
  const history = (w.recallHistory ?? []) as { exercise: string; correct: boolean }[];
  return {
    word: w.word,
    meaning: w.meaning || undefined,
    meaningBn: w.meaningBn || undefined,
    originalSentence: w.originalSentence,
    synonyms: (w.synonyms ?? []).slice(0, 3),
    collocations: (w.collocations ?? []).slice(0, 3),
    status: w.status,
    recalls: `${w.successfulRecallCount ?? 0}/${w.recallCount ?? 0} correct`,
    missedInARow: w.consecutiveFailures ?? 0,
    recentMissedExercises: history.slice(-6).filter((h) => !h.correct).map((h) => h.exercise),
    usedInWriting: w.writingUsageCount ?? 0,
    usedInSpeaking: w.speakingUsageCount ?? 0,
    nextReviewAt: w.nextReviewAt,
    source: w.source?.title,
  };
}

/** The student's saved words (their Brain) with recall and usage history. */
export const getVocabulary: MinoTool = {
  declaration: {
    name: 'getVocabulary',
    description:
      "Look up the student's saved vocabulary (their 'Brain'). With `word`, returns that word's meaning, original sentence, recall history, missed exercise types and Writing/Speaking usage. Without `word`, returns totals, words due today and the words they find hardest.",
    parameters: {
      type: 'object',
      properties: {
        word: { type: 'string', description: 'A specific English word to look up, e.g. "substantial".' },
      },
    },
  },
  async run({ uid, idToken }, args) {
    const words = (await listOwnCollection(uid, idToken, 'vocabulary')) as Word[];
    const now = new Date().toISOString();
    const query = typeof args.word === 'string' ? args.word.trim().toLowerCase() : '';
    if (query) {
      const match = words.find((w) => w.lemma === query || w.word?.toLowerCase() === query || w.id === query);
      return match ? { saved: true, ...compact(match) } : { saved: false, word: query };
    }
    const hardest = [...words]
      .filter((w) => (w.consecutiveFailures ?? 0) > 0 || (w.recallCount ?? 0) > (w.successfulRecallCount ?? 0))
      .sort((a, b) => (b.consecutiveFailures ?? 0) - (a.consecutiveFailures ?? 0))
      .slice(0, 8)
      .map(compact);
    const byStatus: Record<string, number> = {};
    words.forEach((w) => (byStatus[w.status] = (byStatus[w.status] ?? 0) + 1));
    return {
      total: words.length,
      dueToday: words.filter((w) => w.nextReviewAt && w.nextReviewAt <= now).length,
      byStatus,
      hardest,
      recentlySaved: [...words]
        .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
        .slice(0, 5)
        .map((w) => w.word),
    };
  },
};
