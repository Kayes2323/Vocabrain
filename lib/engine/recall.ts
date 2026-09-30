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

  if (exercise === 'context' || exercise === 'completion' || exercise === 'recall-en') {
    const v = matchesWord(trimmed, word.word);
    return v === 'wrong' && word.lemma !== word.word.toLowerCase() ? matchesWord(trimmed, word.lemma) : v;
  }

  // Multiple choice: the answer is the option text; the right one is the word's own meaning.
  if (exercise === 'choice') {
    const own = [word.meaningBn, word.meaning].filter(Boolean).map((m) => normalize(m!));
    return own.includes(normalize(trimmed)) ? 'correct' : 'wrong';
  }

  // Own sentence: it must use the word and be a real sentence; the student then compares with an example.
  if (exercise === 'sentence') {
    return containsWord(trimmed, word.lemma) && normalize(trimmed).split(' ').length >= 5 ? 'check' : 'wrong';
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

/**
 * Four meanings for a "choose the meaning" question: the word's own and three
 * from other saved words, in a stable order per word. Undefined when there are
 * not enough different meanings to choose from.
 */
export function choiceOptions(word: BrainWord, others: BrainWord[], locale: 'en' | 'bn'): string[] | undefined {
  const pick = (w: BrainWord) => (locale === 'bn' ? w.meaningBn || w.meaning : w.meaning || w.meaningBn) || '';
  const own = pick(word);
  if (!own) return undefined;
  const seen = new Set([normalize(own)]);
  const distractors: string[] = [];
  for (const o of [...others].sort((a, b) => a.id.localeCompare(b.id))) {
    const m = pick(o);
    if (o.id === word.id || !m || seen.has(normalize(m))) continue;
    seen.add(normalize(m));
    distractors.push(m);
  }
  if (distractors.length < 3) return undefined;
  // Distractors nearest to the word alphabetically vary between words; position of the answer from the word id.
  const start = [...word.id].reduce((n, c) => n + c.charCodeAt(0), 0);
  const three = [0, 1, 2].map((i) => distractors[(start + i * 7) % distractors.length]).filter((m, i, a) => a.indexOf(m) === i);
  while (three.length < 3) three.push(distractors.find((d) => !three.includes(d))!);
  const options = [...three];
  options.splice(start % 4, 0, own);
  return options;
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
