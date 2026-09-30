// Unit tests: My Brain recall formats, spaced review with ratings, mastery,
// and the Reading Vocabulary ↔ My Brain connection.
import assert from 'node:assert/strict';
import {
  REVIEW_INTERVAL_DAYS, applyRecall, applyUsage, brainGroup, brainSummary, choiceOptions, createBrainWord, evaluateRecall, isDue, nextExercise, wordId,
} from '../lib/engine';
import { LEXICON, LIBRARY, vocabView, vocabWordInfo } from '../lib/content/reading-library';
import { readingVocabulary, sentenceFor } from '../lib/content/reading-library/vocab-list';
import type { BrainWord, WordInfo } from '../lib/models';

let passed = 0;
const test = (name: string, fn: () => void) => {
  try {
    fn();
    passed++;
    console.log('PASS', name);
  } catch (e) {
    console.error('FAIL', name);
    throw e;
  }
};

const NOW = new Date('2026-09-30T10:00:00');
const DAY = 86_400_000;
const info = (lemma: string, over: Partial<WordInfo> = {}): WordInfo => ({
  word: lemma, lemma, meaning: `meaning of ${lemma}`, meaningBn: `${lemma}-এর অর্থ`, partOfSpeech: 'adjective', synonyms: ['plentiful'], antonyms: [], collocations: [],
  exampleSentence: `The region has an ${lemma} supply of water.`, dictionarySource: 'glossary', ...over,
});
const word = (lemma: string, over: Partial<WordInfo> = {}, sentence = `Water is ${lemma} here.`) =>
  createBrainWord(info(lemma, over), { type: 'reading-passage', title: 'Passage 1', passageId: LIBRARY[0].id }, sentence, NOW);
const days = (w: BrainWord) => Math.round((new Date(w.nextReviewAt).getTime() - new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()).getTime()) / DAY);
const correctN = (w: BrainWord, times: number) => {
  let x = w;
  for (let i = 0; i < times; i++) x = applyRecall(x, 'recall-en', true, x.word, NOW);
  return x;
};

test('recall formats move from recognition to production as the word gets stronger', () => {
  const w = word('abundant');
  assert.equal(nextExercise(w, undefined, 3), 'choice', 'a new word starts with recognising its meaning');
  assert.equal(nextExercise(w, undefined, 0), 'meaning', 'without 3 other meanings there is no multiple choice');
  assert.equal(nextExercise({ ...w, stage: 1 }), 'recall-en', 'then Bangla → English');
  assert.equal(nextExercise({ ...w, stage: 1, meaningBn: undefined }), 'meaning', 'no Bangla meaning → type the meaning');
  assert.ok(['context', 'completion', 'recall-en'].includes(nextExercise({ ...w, stage: 2 })), 'then the word in a sentence');
  const late = [0, 1, 2, 3].map((k) => nextExercise({ ...w, stage: 5, recallCount: k }));
  assert.ok(late.includes('sentence') && new Set(late).size > 1, 'well-known words: own sentence, rotated with other formats');
  assert.equal(nextExercise({ ...w, stage: 5 }, 'meaning'), 'meaning', 'a known problem still wins');
});

test('answers are checked from memory: Bangla → English, multiple choice, own sentence', () => {
  const w = word('abundant');
  assert.equal(evaluateRecall(w, 'recall-en', 'abundant'), 'correct');
  assert.equal(evaluateRecall(w, 'recall-en', 'abundent'), 'close', 'one typo is close (counts as recalled)');
  assert.equal(evaluateRecall(w, 'recall-en', 'plentiful'), 'wrong', 'a synonym is not the word');
  assert.equal(evaluateRecall(w, 'choice', w.meaningBn!), 'correct');
  assert.equal(evaluateRecall(w, 'choice', 'অন্য কিছু'), 'wrong');
  assert.equal(evaluateRecall(w, 'sentence', 'Fresh fruit is abundant in summer markets.'), 'check', 'a real sentence → compare and rate');
  assert.equal(evaluateRecall(w, 'sentence', 'abundant'), 'wrong', 'too short');
  assert.equal(evaluateRecall(w, 'sentence', 'There is a lot of water in the region.'), 'wrong', 'the word must be used');
});

test('choose-the-meaning options: the right meaning plus three others, stable, no duplicates', () => {
  const words = ['abundant', 'decline', 'scarce', 'vital', 'rapid'].map((l) => word(l));
  const opts = choiceOptions(words[0], words, 'bn')!;
  assert.equal(opts.length, 4);
  assert.equal(new Set(opts).size, 4);
  assert.ok(opts.includes(words[0].meaningBn!));
  assert.deepEqual(choiceOptions(words[0], words, 'bn'), opts, 'same options every time for the same word');
  assert.equal(choiceOptions(words[0], words.slice(0, 3), 'bn'), undefined, 'fewer than 3 other meanings → no choice question');
  assert.ok(choiceOptions(words[0], words, 'en')!.includes(words[0].meaning), 'English meanings in English');
});

test('spaced review: correct answers push the next review further; wrong ones bring the word back soon', () => {
  const w = word('abundant');
  assert.ok(isDue(w, NOW), 'a new word gets its first recall on the day it is saved');
  let x = w;
  const gaps: number[] = [];
  for (let i = 0; i < 4; i++) {
    x = applyRecall(x, 'recall-en', true, 'abundant', NOW);
    gaps.push(days(x));
  }
  assert.deepEqual(gaps.slice(0, 2), [REVIEW_INTERVAL_DAYS[0], REVIEW_INTERVAL_DAYS[1]]);
  assert.ok(gaps.every((g, i) => i === 0 || g > gaps[i - 1]), `intervals grow: ${gaps}`);
  const wrong = applyRecall(x, 'recall-en', false, 'xyz', NOW);
  assert.equal(wrong.stage, 0);
  assert.equal(days(wrong), 1, 'wrong → tomorrow');
  const again = applyRecall(wrong, 'recall-en', false, 'xyz', NOW);
  assert.ok(new Date(again.nextReviewAt).getTime() - NOW.getTime() <= 4 * 3_600_000 + 1000, 'wrong twice in a row → in 4 hours');
});

test('ratings tune the schedule; the answer itself stays the main signal', () => {
  const x = correctN(word('abundant'), 2); // stage 2
  const good = applyRecall(x, 'context', true, 'abundant', NOW, 'good');
  const hard = applyRecall(x, 'context', true, 'abundant', NOW, 'hard');
  const easy = applyRecall(x, 'context', true, 'abundant', NOW, 'easy');
  assert.equal(good.stage, 3);
  assert.equal(hard.stage, 2, 'Hard: stays at its step');
  assert.ok(days(hard) < days(good) && days(good) < days(easy), `hard ${days(hard)} < good ${days(good)} < easy ${days(easy)}`);
  const again = applyRecall(x, 'meaning', true, 'x', NOW, 'again');
  assert.equal(again.stage, 0, 'Again = not recalled');
  assert.equal(again.consecutiveFailures, 1);
  const wrongEasy = applyRecall(x, 'recall-en', false, 'xyz', NOW, 'easy');
  assert.equal(wrongEasy.stage, 0, 'a wrong answer is wrong even if rated Easy');
  assert.equal(good.recallHistory.at(-1)!.rating, 'good');
});

test('mastered means repeated recall over time AND use — never from saving, viewing or one right answer', () => {
  const w = word('abundant');
  assert.equal(brainGroup(w), 'new');
  assert.equal(brainGroup(correctN(w, 1)), 'learning', 'one right answer → learning');
  const recalledOnly = correctN(w, 6);
  assert.equal(brainGroup(recalledOnly), 'learning', 'recalled many times but never used → not mastered yet');
  let used = applyUsage(recalledOnly, { mode: 'writing', text: 'Water is abundant.', correct: true }, NOW);
  used = applyUsage(used, { mode: 'speaking', text: 'It is abundant.', correct: true }, NOW);
  assert.equal(used.status, 'mastered');
  assert.equal(brainGroup(used), 'mastered');
});

test('My Brain summary: words, due today, learning, mastered, and the next review when nothing is due', () => {
  const a = word('abundant');
  const b = correctN(word('decline'), 1);
  const s = brainSummary([a, b], NOW);
  assert.deepEqual([s.total, s.due, s.learning, s.mastered], [2, 1, 1, 0]);
  assert.equal(s.nextDueAt, undefined, 'something is due, so no "next review" line');
  const later = brainSummary([b], NOW);
  assert.equal(later.due, 0);
  assert.equal(later.nextDueAt, b.nextReviewAt);
  assert.deepEqual([brainSummary([], NOW).total, brainSummary([], NOW).due], [0, 0]);
});

test('Reading Vocabulary: words of opened passages, one Brain entry per word, no duplicates', () => {
  const [p1, p2] = LIBRARY;
  assert.deepEqual(readingVocabulary(undefined, []), { fresh: [], saved: [] }, 'nothing opened → nothing listed');
  const progress = { [p1.id]: { answers: {}, updatedAt: '2026-09-29T10:00:00Z' }, [p2.id]: { answers: {}, updatedAt: '2026-09-30T09:00:00Z' } };
  const rv = readingVocabulary(progress, []);
  assert.equal(rv.fresh[0].passage.id, p2.id, 'most recently opened passage first');
  assert.equal(new Set(rv.fresh.map((w) => w.id)).size, rv.fresh.length, 'each word once');
  const expected = new Set([...p1.vocab, ...p2.vocab].filter((v) => LEXICON[v.lemma]).map((v) => wordId(v.lemma)));
  assert.equal(rv.fresh.length, expected.size);

  // Save one: it leaves "new" and appears as saved, under the SAME id.
  const first = rv.fresh[0];
  assert.ok(first.sentence && new RegExp(first.view.lemma.split(' ')[0], 'i').test(first.sentence), 'the passage sentence is kept');
  const saved = createBrainWord(vocabWordInfo(first.view), { type: 'reading-passage', title: first.passage.title, passageId: first.passage.id }, first.sentence, NOW);
  assert.equal(saved.id, first.id, 'Reading, My Brain and Recall use one id');
  const after = readingVocabulary(progress, [saved]);
  assert.ok(!after.fresh.some((w) => w.id === first.id));
  assert.deepEqual(after.saved.map((w) => w.id), [first.id]);
  assert.equal(after.saved[0].source.passageId, first.passage.id, 'source passage retained');
  assert.equal(wordId('Decline'), wordId('decline'), 'the same word saved twice maps to one entry');
});

test('sentenceFor finds the passage sentence that uses the word', () => {
  const p = LIBRARY[0];
  for (const v of p.vocab.slice(0, 5)) {
    const s = sentenceFor(p, v.match.length ? v.match : [v.lemma]);
    assert.ok(s && s.length > 10, `${v.lemma}: sentence found`);
  }
  const lex = LEXICON[p.vocab[0].lemma];
  assert.equal(vocabView(lex, p.vocab[0]).lemma, p.vocab[0].lemma);
});

console.log(`\n${passed} passed`);
