// Vocabulary Foundation engine: today's mission, journey, stats and the
// mission session. Pure functions over the Brain (users/{uid}/vocabulary) and
// profile.vocabFoundation, so every number comes from real data.
import { dueWords, isWeakWord } from '@/lib/engine/brain';
import { localDateKey } from '@/lib/engine/dates';
import type { BrainWord, StudyProgress, VocabDay, VocabFoundationProgress, VocabSession, WordInfo } from '@/lib/models';
import { FOUNDATION_WORDS, getFoundationWord, type FoundationWord } from './words';

export const NEW_WORDS_PER_DAY = 5;
export const SENTENCES_PER_DAY = 2;
export const REVIEW_WORDS_PER_DAY = 5;

export function toWordInfo(w: FoundationWord): WordInfo {
  return {
    word: w.word,
    lemma: w.id,
    meaning: w.meaning.en,
    meaningBn: w.meaning.bn,
    partOfSpeech: w.partOfSpeech,
    synonyms: w.synonyms,
    antonyms: w.antonyms ?? [],
    collocations: w.collocations,
    exampleSentence: w.examples[0],
    dictionarySource: 'glossary',
  };
}

export const SOURCE = { type: 'lesson' as const, title: 'Vocabulary Foundation' };

export interface Mission {
  newWords: string[];
  recalls: number;
  sentences: number;
  reviews: number;
  minutes: number;
  done: boolean;
}

/** Today's small, finishable mission (about 15 minutes). */
export function todayMission(vf: VocabFoundationProgress, brain: BrainWord[], now = new Date()): Mission {
  const day = vf.days[localDateKey(now)];
  const session = vf.session?.date === localDateKey(now) ? vf.session : undefined;
  const newWords = session?.words ?? FOUNDATION_WORDS.filter((w) => !vf.discovered[w.id]).slice(0, NEW_WORDS_PER_DAY).map((w) => w.id);
  const fresh = new Set(newWords);
  const reviews = Math.min(REVIEW_WORDS_PER_DAY, dueWords(brain, now).filter((w) => !fresh.has(w.id)).length);
  const recalls = newWords.length * 2;
  const sentences = Math.min(SENTENCES_PER_DAY, newWords.length);
  const minutes = Math.max(5, Math.round(newWords.length * 1.5 + recalls * 0.4 + sentences * 2 + reviews * 0.6));
  return { newWords, recalls, sentences, reviews, minutes, done: Boolean(day?.missionDoneAt) };
}

export interface VocabStats {
  inBrain: number;
  mastered: number;
  reviewing: number;
  dueToday: number;
  streak: number;
}

/** Days in a row (ending today or yesterday) with vocabulary work. */
export function vocabStreak(vf: VocabFoundationProgress, study: Pick<StudyProgress, 'days'>, now = new Date()): number {
  const active = (key: string) => {
    const d = vf.days[key];
    return Boolean(d && (d.newWords || d.recalls || d.sentences)) || Boolean(study.days[key]?.done?.includes('vocabulary'));
  };
  let streak = 0;
  const cursor = new Date(now);
  if (!active(localDateKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (active(localDateKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function vocabStats(brain: BrainWord[], vf: VocabFoundationProgress, study: Pick<StudyProgress, 'days'>, now = new Date()): VocabStats {
  return {
    inBrain: brain.length,
    mastered: brain.filter((w) => w.status === 'mastered').length,
    reviewing: brain.filter((w) => w.status !== 'mastered' && w.status !== 'new').length,
    dueToday: dueWords(brain, now).length,
    streak: vocabStreak(vf, study, now),
  };
}

export const JOURNEY_STEPS = ['discover', 'understand', 'save', 'recall', 'use', 'review', 'master'] as const;
export type JourneyStep = (typeof JOURNEY_STEPS)[number];

/** How many of the course words reached each step of the learning loop. */
export function vocabJourney(vf: VocabFoundationProgress, brain: BrainWord[]): { step: JourneyStep; count: number; total: number }[] {
  const total = FOUNDATION_WORDS.length;
  const mine = brain.filter((w) => getFoundationWord(w.id));
  const counts: Record<JourneyStep, number> = {
    discover: Object.keys(vf.discovered).length,
    understand: Object.keys(vf.discovered).length,
    save: mine.length,
    recall: mine.filter((w) => w.successfulRecallCount > 0).length,
    use: mine.filter((w) => w.writingUsageCount + w.speakingUsageCount > 0).length,
    review: mine.filter((w) => w.stage >= 2).length,
    master: mine.filter((w) => w.status === 'mastered').length,
  };
  return JOURNEY_STEPS.map((step) => ({ step, count: Math.min(counts[step], total), total }));
}

// ---------------------------------------------------------------- session

export type SessionStep =
  | { phase: 'discover'; wordId: string }
  | { phase: 'recall'; wordId: string; kind: 'meaning' | 'completion' }
  | { phase: 'use'; wordId: string }
  | { phase: 'done' };

/** The mission as a list of steps: discover each word, 2 recalls per word (interleaved), 2 sentences. */
export function sessionSteps(session: VocabSession): SessionStep[] {
  const words = session.words;
  return [
    ...words.map((wordId): SessionStep => ({ phase: 'discover', wordId })),
    ...words.map((wordId): SessionStep => ({ phase: 'recall', wordId, kind: 'meaning' })),
    ...[...words].reverse().map((wordId): SessionStep => ({ phase: 'recall', wordId, kind: 'completion' })),
    ...useWords(session).map((wordId): SessionStep => ({ phase: 'use', wordId })),
    { phase: 'done' },
  ];
}

/** Sentence challenges go to the words the student found hardest to recall. */
export function useWords(session: VocabSession): string[] {
  const missed = (id: string) => ['meaning', 'completion'].filter((k) => session.results[`recall:${k}:${id}`]?.correct === false).length;
  return [...session.words].sort((a, b) => missed(b) - missed(a)).slice(0, Math.min(SENTENCES_PER_DAY, session.words.length));
}

export function startSession(vf: VocabFoundationProgress, now = new Date()): VocabFoundationProgress {
  const date = localDateKey(now);
  if (vf.session?.date === date) return vf;
  const words = FOUNDATION_WORDS.filter((w) => !vf.discovered[w.id]).slice(0, NEW_WORDS_PER_DAY).map((w) => w.id);
  return { ...vf, session: { date, words, phase: words.length ? 'discover' : 'done', index: 0, results: {} } };
}

export function bumpDay(vf: VocabFoundationProgress, patch: Partial<Omit<VocabDay, 'missionDoneAt'>>, now = new Date()): VocabFoundationProgress {
  const key = localDateKey(now);
  const d: VocabDay = vf.days[key] ?? { newWords: 0, recalls: 0, recallCorrect: 0, sentences: 0, sentencesCorrect: 0 };
  const next = { ...d };
  for (const [k, v] of Object.entries(patch) as [keyof typeof patch, number][]) next[k] = (next[k] ?? 0) + v;
  return { ...vf, days: { ...vf.days, [key]: next } };
}

/** Records the first guess from context and counts the word as discovered. */
export function recordDiscovery(vf: VocabFoundationProgress, wordId: string, guessedRight: boolean, now = new Date()): VocabFoundationProgress {
  if (vf.discovered[wordId]) return vf;
  return bumpDay({ ...vf, discovered: { ...vf.discovered, [wordId]: { at: now.toISOString(), guessedRight } } }, { newWords: 1 }, now);
}

export function recordSessionResult(vf: VocabFoundationProgress, key: string, correct: boolean, answer?: string): VocabFoundationProgress {
  if (!vf.session) return vf;
  return { ...vf, session: { ...vf.session, results: { ...vf.session.results, [key]: { correct, ...(answer ? { answer: answer.slice(0, 300) } : {}) } } } };
}

export function moveSession(vf: VocabFoundationProgress, index: number): VocabFoundationProgress {
  if (!vf.session) return vf;
  const step = sessionSteps(vf.session)[index];
  return { ...vf, session: { ...vf.session, index, phase: step?.phase ?? 'done' } };
}

export function finishMission(vf: VocabFoundationProgress, now = new Date()): VocabFoundationProgress {
  const key = localDateKey(now);
  const d = vf.days[key] ?? { newWords: 0, recalls: 0, recallCorrect: 0, sentences: 0, sentencesCorrect: 0 };
  return { ...vf, days: { ...vf.days, [key]: { ...d, missionDoneAt: d.missionDoneAt ?? now.toISOString() } }, session: vf.session ? { ...vf.session, phase: 'done' } : undefined };
}

/** Summary of today's session from the stored results. */
export function sessionSummary(session: VocabSession) {
  const entries = Object.entries(session.results);
  const recall = entries.filter(([k]) => k.startsWith('recall:'));
  const use = entries.filter(([k]) => k.startsWith('use:'));
  return {
    words: session.words.length,
    recallCorrect: recall.filter(([, r]) => r.correct).length,
    recallTotal: recall.length,
    sentencesCorrect: use.filter(([, r]) => r.correct).length,
    sentencesTotal: use.length,
  };
}

/** Words to show Mino: forgotten recently, used correctly, overall accuracy. */
export function vocabSummaryLines(brain: BrainWord[], vf: VocabFoundationProgress, now = new Date()): string[] {
  const lines: string[] = [];
  const discovered = Object.keys(vf.discovered).length;
  const recalls = brain.reduce((s, w) => s + w.recallCount, 0);
  const right = brain.reduce((s, w) => s + w.successfulRecallCount, 0);
  const weak = brain.filter(isWeakWord);
  const used = brain.filter((w) => w.writingUsageCount + w.speakingUsageCount > 0);
  const month = localDateKey(now).slice(0, 7);
  const savedThisMonth = brain.filter((w) => w.createdAt.slice(0, 7) === month).length;
  lines.push(
    `- Vocabulary Foundation: ${discovered}/${FOUNDATION_WORDS.length} course words discovered; recall accuracy ${recalls ? `${Math.round((right / recalls) * 100)}% of ${recalls} recalls` : 'no recalls yet'}; words used correctly in sentences: ${used.length}; saved this month: ${savedThisMonth}.`,
  );
  if (weak.length) lines.push(`- Weak words (recent recall failures): ${weak.slice(0, 6).map((w) => `${w.word} (${w.consecutiveFailures} failed in a row)`).join(', ')}.`);
  const lastUse = brain.flatMap((w) => w.usageHistory.filter((u) => !u.correct).map((u) => ({ word: w.word, ...u }))).sort((a, b) => b.at.localeCompare(a.at))[0];
  if (lastUse) lines.push(`- Latest sentence that needed work: "${lastUse.text.slice(0, 140)}" (word: ${lastUse.word}).`);
  return lines;
}
