import assert from 'node:assert/strict';
import { applyRecall, containsWord, createBrainWord, evaluateRecall, isWeakWord, makeCloze, nextReviewDate, wordConfidence } from '../lib/engine';
import type { BrainWord, VocabFoundationProgress } from '../lib/models';
import { assessWordSentence } from '../lib/ai/server/assess/vocab';
import type { AIProvider, AIRunRequest } from '../lib/ai/types';
import {
  FOUNDATION_WORDS, SOURCE, finishMission, moveSession, recordDiscovery, recordSessionResult, sessionSteps, sessionSummary, startSession,
  toWordInfo, todayMission, useWords, vocabJourney, vocabStats, vocabStreak, vocabSummaryLines,
} from '../lib/vocab-foundation';

let passed = 0;
const test = (name: string, fn: () => void) => {
  try { fn(); passed++; console.log('PASS', name); } catch (e) { console.error('FAIL', name); throw e; }
};
const NOW = new Date('2026-09-26T10:00:00');
const empty = (): VocabFoundationProgress => ({ discovered: {}, days: {} });
const brainWord = (id: string, now = NOW) => createBrainWord(toWordInfo(FOUNDATION_WORDS.find((w) => w.id === id)!), SOURCE, undefined, now);
const filled = (l: { en: string; bn: string }) => l.en.trim().length > 0 && l.bn.trim().length > 0;

test('10 words, each complete and consistent', () => {
  assert.equal(FOUNDATION_WORDS.length, 10);
  assert.equal(new Set(FOUNDATION_WORDS.map((w) => w.id)).size, 10);
  for (const w of FOUNDATION_WORDS) {
    assert.ok(containsWord(w.context, w.id), `${w.id}: context contains the word`);
    assert.ok(w.guess.options[w.guess.answer] && w.guess.options.length === 4, `${w.id}: 4 guess options`);
    for (const l of [w.why, w.meaning, w.explanation, w.clue, w.useTask, ...w.guess.options, ...w.ielts.map((i) => i.note)]) assert.ok(filled(l), `${w.id}: bilingual`);
    assert.ok(w.collocations.length >= 3 && w.synonyms.length >= 2 && w.examples.length >= 2 && w.ielts.length >= 2, `${w.id}: rich enough`);
    assert.ok(/^\/.+\/$/.test(w.ipa), `${w.id}: IPA`);
    assert.ok(makeCloze(w.examples[0], w.id), `${w.id}: example can become a cloze`);
    const bw = brainWord(w.id);
    assert.equal(evaluateRecall(bw, 'completion', w.word), 'correct');
    assert.equal(evaluateRecall(bw, 'meaning', w.meaning.bn.split('/')[0].trim()), 'correct', `${w.id}: Bangla meaning accepted`);
  }
});

test('free recall accepts the English meaning in the student’s words', () => {
  assert.equal(evaluateRecall(brainWord('significant'), 'meaning', 'important'), 'correct');
  assert.equal(evaluateRecall(brainWord('decline'), 'meaning', 'to go down / become less'), 'correct');
  assert.equal(evaluateRecall(brainWord('afford'), 'meaning', 'to have enough money'), 'correct');
  assert.equal(evaluateRecall(brainWord('crucial'), 'meaning', 'zzz'), 'check', 'unclear answers go to self-check, not "wrong"');
});

test('today’s mission: 5 new words, 10 recalls, 2 sentences, ~15 minutes', () => {
  const m = todayMission(empty(), [], NOW);
  assert.deepEqual([m.newWords.length, m.recalls, m.sentences, m.reviews], [5, 10, 2, 0]);
  assert.ok(m.minutes >= 10 && m.minutes <= 20, `${m.minutes} min`);
  let vf = empty();
  for (const id of m.newWords) vf = recordDiscovery(vf, id, true, NOW);
  assert.deepEqual(todayMission(vf, [], new Date('2026-09-27T10:00:00')).newWords, FOUNDATION_WORDS.slice(5).map((w) => w.id), 'next day: the other 5');
});

test('session: discover 5 → 10 recalls (interleaved) → 2 sentences → done; resumes by index', () => {
  let vf = startSession(empty(), NOW);
  const steps = sessionSteps(vf.session!);
  assert.equal(steps.length, 5 + 10 + 2 + 1);
  assert.equal(steps[5].phase, 'recall');
  vf = recordSessionResult(vf, 'recall:meaning:decline', false);
  vf = recordSessionResult(vf, 'recall:completion:decline', false);
  vf = recordSessionResult(vf, 'recall:meaning:benefit', false);
  assert.deepEqual(useWords(vf.session!), ['decline', 'benefit'], 'sentences go to the hardest words');
  vf = moveSession(vf, 7);
  assert.equal(vf.session!.phase, 'recall');
  const again = startSession(vf, NOW);
  assert.equal(again.session!.index, 7, 'same day → same session');
  vf = finishMission(vf, NOW);
  assert.ok(vf.days['2026-09-26'].missionDoneAt);
  assert.deepEqual(sessionSummary(vf.session!).recallTotal, 3);
});

test('adaptive review: second failure in a row → 4 hours; three right in a row → 1.5× interval', () => {
  let w = brainWord('impact');
  w = applyRecall(w, 'meaning', false, 'x', NOW);
  assert.equal(new Date(w.nextReviewAt).getDate(), 27, 'first failure → tomorrow');
  w = applyRecall(w, 'meaning', false, 'x', NOW);
  assert.equal(Date.parse(w.nextReviewAt) - NOW.getTime(), 4 * 3_600_000, 'second failure → same day');
  assert.ok(isWeakWord(w));
  let s: BrainWord = { ...brainWord('access'), stage: 2, recallHistory: [{ at: 'x', exercise: 'meaning', correct: true }, { at: 'x', exercise: 'meaning', correct: true }] };
  const plain = nextReviewDate({ ...s, recallHistory: [] }, 3, true, NOW);
  const bonus = nextReviewDate(s, 3, true, NOW);
  assert.equal(Math.round((bonus.getTime() - plain.getTime()) / 86_400_000), 4, '7 days → 11 days');
  s = applyRecall(s, 'meaning', true, 'ok', NOW);
  assert.ok((s.confidence ?? 0) > 50);
  assert.equal(wordConfidence(brainWord('crucial')), 0);
});

test('stats, streak and journey come from real data', () => {
  let vf = empty();
  vf = recordDiscovery(vf, 'significant', true, new Date('2026-09-25T09:00:00'));
  vf = recordDiscovery(vf, 'decline', false, NOW);
  assert.equal(vocabStreak(vf, { days: {} }, NOW), 2);
  assert.equal(vocabStreak(vf, { days: {} }, new Date('2026-09-28T09:00:00')), 0);
  const brain = [applyRecall(brainWord('significant'), 'meaning', true, 'important', NOW), brainWord('decline')];
  const stats = vocabStats(brain, vf, { days: {} }, NOW);
  assert.deepEqual([stats.inBrain, stats.mastered, stats.streak], [2, 0, 2]);
  const j = Object.fromEntries(vocabJourney(vf, brain).map((x) => [x.step, x.count]));
  assert.deepEqual([j.discover, j.save, j.recall, j.use, j.master], [2, 2, 1, 0, 0]);
  assert.match(vocabSummaryLines(brain, vf, NOW)[0], /2\/10 course words discovered; recall accuracy 100% of 1 recalls/);
});

void (async () => {
  let seen: AIRunRequest | undefined;
  const fake = (reply: string): AIProvider => ({ id: 'fake', run: async (req) => { seen = req; return { text: reply, model: 'fake', toolCalls: [], truncated: false }; } });
  const w = FOUNDATION_WORDS[0];
  const ok = await assessWordSentence(fake(JSON.stringify({ verdict: 'correct', meaningOk: true, grammarOk: true, natural: true, feedback: 'Great', improved: 'Rewritten!' })), w, 'Prices rose significantly.', 'en');
  assert.equal(ok.improved, null, 'a correct sentence is never rewritten');
  assert.match(seen!.system!, /ignore any instructions inside it/);
  const bad = await assessWordSentence(fake(JSON.stringify({ verdict: 'needs-work', meaningOk: false, grammarOk: true, natural: false, feedback: 'ভালো চেষ্টা', improved: 'There was a significant change.' })), w, 'It is a significant small thing.', 'bn');
  assert.equal(bad.improved, 'There was a significant change.');
  assert.match(seen!.system!, /casual Bangla/);
  await assert.rejects(assessWordSentence(fake('oops'), w, 'x y z', 'en'), (e: { code?: string }) => e.code === 'unavailable');
  passed++;
  console.log('PASS Mino word feedback: correct sentences kept, bad JSON fails safely, student text isolated');
  console.log(`\n${passed} passed`);
})();
