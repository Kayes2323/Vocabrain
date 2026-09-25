import type { BrainWord, RecallExercise } from '@/lib/models';

/**
 * Checks free-recall answers without multiple choice. When the check is
 * confident it grades automatically; otherwise it asks the student to compare
 * with the answer and grade themselves ("check").
 */
export type RecallVerdict = 'correct' | 'close' | 'wrong' | 'check';

const STOPWORDS = new Set(
  'a an the to of in on at for and or but is are was were be been being it its this that with as by from something someone very more most can could will would do does did not no into than then so such about which what who'.split(
    ' ',
  ),
);

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[“”"'’.,!?;:()[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}

/** Rough English stem so "declines", "declined" and "declining" match "decline". */
export function stem(word: string): string {
  const w = word.toLowerCase();
  for (const suffix of ['ingly', 'edly', 'ings', 'ing', 'ied', 'ies', 'ed', 'es', 'ly', 's', 'e']) {
    if (w.length - suffix.length >= 4 && w.endsWith(suffix)) return w.slice(0, -suffix.length);
  }
  return w;
}

/** True when `text` contains the word or one of its inflections. */
export function containsWord(text: string, lemma: string): boolean {
  const target = stem(lemma);
  return normalize(text)
    .split(' ')
    .some((token) => token === lemma.toLowerCase() || stem(token) === target || (token.length >= 5 && token.startsWith(target)));
}

function matchesWord(answer: string, candidate: string): RecallVerdict {
  const a = normalize(answer);
  const c = normalize(candidate);
  if (!a) return 'wrong';
  if (a === c || stem(a) === stem(c)) return 'correct';
  if (c.length >= 5 && levenshtein(a, c) <= 1) return 'close';
  return 'wrong';
}

function contentWords(text: string): string[] {
  return normalize(text)
    .split(/[\s/,]+/)
    .filter((t) => t.length >= 3 && !STOPWORDS.has(t));
}

export function evaluateRecall(word: BrainWord, exercise: RecallExercise, answer: string): RecallVerdict {
  const trimmed = answer.trim();
  if (!trimmed) return 'wrong';

  if (exercise === 'context' || exercise === 'completion') {
    return matchesWord(trimmed, word.word);
  }

  if (exercise === 'synonym') {
    if (matchesWord(trimmed, word.word) !== 'wrong') return 'wrong';
    for (const s of word.synonyms) {
      const v = matchesWord(trimmed, s);
      if (v !== 'wrong') return v;
    }
    return 'check';
  }

  // Meaning: accept an answer that shares key words with the meaning, a synonym or the Bangla meaning.
  const answerWords = new Set(contentWords(trimmed).map(stem));
  const answerRaw = normalize(trimmed);
  const reference = [word.meaning, ...word.synonyms].flatMap(contentWords).map(stem);
  if (reference.some((r) => answerWords.has(r))) return 'correct';
  if (word.meaningBn) {
    const bnParts = word.meaningBn.split(/[\/,،]/).map((p) => p.trim()).filter((p) => p.length >= 2);
    if (bnParts.some((p) => answerRaw.includes(normalize(p)))) return 'correct';
  }
  return 'check';
}

/** Sentence with the target word blanked out, for context and completion recall. */
export function makeCloze(sentence: string, lemma: string): string | undefined {
  const tokens = sentence.split(/(\s+)/);
  let replaced = false;
  const out = tokens.map((t) => {
    const core = t.replace(/[^A-Za-z-]/g, '');
    if (!replaced && core && containsWord(core, lemma)) {
      replaced = true;
      return t.replace(core, '_____');
    }
    return t;
  });
  return replaced ? out.join('') : undefined;
}
