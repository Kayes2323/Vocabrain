/** Writing/Speaking assessment checks with a fake AI (no network). Run: pnpm test:assess */
import assert from 'node:assert/strict';
import { assessSpeaking, assessWriting } from '../lib/ai/server/assess';
import type { AIProvider, AIRunRequest } from '../lib/ai/types';
import { createSession, setResponse, submit, writingOverall } from '../lib/ielts';
import { getTest } from '../lib/ielts/content';

let passed = 0;
const test = async (name: string, fn: () => Promise<void>) => {
  try {
    await fn();
    passed++;
    console.log(`PASS ${name}`);
  } catch (e) {
    console.log(`FAIL ${name}\n  ${(e as Error).message}`);
    process.exitCode = 1;
  }
};

const calls: AIRunRequest[] = [];
const fake = (reply: (req: AIRunRequest) => unknown): AIProvider => ({
  id: 'fake',
  async run(req) {
    calls.push(req);
    const r = reply(req);
    return { text: typeof r === 'string' ? r : JSON.stringify(r), model: 'fake-smart', toolCalls: [], truncated: false };
  },
});

const t1 = getTest('vb-practice-1')!;
const essay = (n: number) => Array.from({ length: n }, (_, i) => (i % 12 === 11 ? 'cities.' : 'people')).join(' ');
const T2 = `Some people think rooftops should grow food. In my opinion rooftop farms is useful for cities. ${essay(240)}`;

async function main() {
  await test('writing: criteria, weighted overall, hallucinated quotes removed', async () => {
    calls.length = 0;
    let s = createSession(t1, 'writing');
    s = setResponse(s, 'w1', `The table shows cycling in four cities. Overall, cycling rose in most cities. ${essay(150)}`);
    s = setResponse(s, 'w2', T2);
    s = submit(s, t1);
    const f = await assessWriting(
      fake((req) => ({
        criteria: [
          { criterion: req.system.includes('Task Achievement') ? 'Task Achievement' : 'Task Response', band: 6.4, comment: 'ok' },
          { criterion: 'Coherence & Cohesion', band: 6, comment: 'ok' },
          { criterion: 'Lexical Resource', band: 5.5, comment: 'ok' },
          { criterion: 'Grammatical Range & Accuracy', band: 7, comment: 'ok' },
        ],
        strengths: ['Clear position'],
        mistakes: [
          { quote: 'rooftop farms is useful', fix: 'rooftop farms are useful', why: 'subject-verb agreement' },
          { quote: 'this sentence was never written', fix: 'x', why: 'invented' },
        ],
        actions: ['Write one more introduction'],
        vocabulary: [{ word: 'food security', tip: 'use in Task 2' }],
        betterSentences: [{ original: 'In my opinion rooftop farms is useful for cities.', improved: 'In my view, rooftop farms benefit cities.' }],
      })),
      t1,
      s,
      'bn',
    );
    assert.equal(calls.length, 2, 'one call per task');
    assert.ok(calls.every((c) => c.tier === 'smart' && c.json));
    assert.match(calls[0].system, /casual, friendly Bangla/);
    const task2 = f.tasks.find((x) => x.title === 'Task 2')!;
    assert.deepEqual(task2.criteria.map((c) => c.band), [6.5, 6, 5.5, 7], 'bands rounded to half');
    assert.equal(task2.band, 6.5);
    assert.equal(task2.mistakes.length, 1, 'quote not in the essay is dropped');
    assert.equal(task2.betterSentences.length, 1);
    assert.equal(f.overall, writingOverall(f.tasks[0].band, task2.band));
    assert.ok(f.notes.includes('estimate'));
  });

  await test('writing: very short answers are not sent to the AI; under-minimum is flagged', async () => {
    calls.length = 0;
    let s = createSession(t1, 'writing');
    s = setResponse(s, 'w1', 'Too short.');
    s = setResponse(s, 'w2', essay(120));
    const f = await assessWriting(fake(() => ({ criteria: [{ criterion: 'Task Response', band: 5, comment: '' }] })), t1, submit(s, t1), 'en');
    assert.equal(calls.length, 1);
    assert.match(calls[0].system, /UNDER the minimum/);
    assert.equal(f.tasks[0].band, null);
    assert.equal(f.tasks[0].wordCount, 2);
    assert.ok(f.notes.includes('incomplete'));
  });

  await test('writing: invalid AI output becomes a friendly error', async () => {
    let s = createSession(t1, 'writing');
    s = setResponse(s, 'w2', T2);
    await assert.rejects(assessWriting(fake(() => 'not json'), t1, submit(s, t1), 'en'), /unavailable/);
  });

  await test('speaking: pronunciation never scored from text; timing sent', async () => {
    calls.length = 0;
    let s = createSession(t1, 'speaking');
    s = setResponse(s, 's1-0', 'I live in Dhaka, in a busy area near the university with lots of small shops and tea stalls.', 12);
    s = setResponse(s, 's2-0', `A useful skill I learned as a child was cycling. My uncle taught me on a quiet road. ${essay(60)}`, 95);
    s = setResponse(s, 's3-0', 'Schools should teach money skills because young people need them.', 15);
    const f = await assessSpeaking(
      fake(() => ({
        criteria: [
          { criterion: 'Fluency & Coherence', band: 6, comment: 'ok' },
          { criterion: 'Lexical', band: 6.5, comment: 'ok' },
          { criterion: 'Grammatical Range & Accuracy', band: 6, comment: 'ok' },
          { criterion: 'Pronunciation', band: 8, comment: 'great' },
        ],
      })),
      t1,
      submit(s, t1),
      'en',
    );
    assert.match(calls[0].messages[0].content, /words\/min/);
    const pron = f.tasks[0].criteria.find((c) => c.criterion === 'Pronunciation')!;
    assert.equal(pron.band, null);
    assert.equal(f.tasks[0].criteria.find((c) => c.criterion === 'Lexical Resource')!.band, 6.5, 'criterion names normalised');
    assert.equal(f.overall, 6);
    assert.ok(f.notes.includes('transcript-only'));
  });

  await test('speaking: too little speech is not assessed', async () => {
    calls.length = 0;
    const s = setResponse(createSession(t1, 'speaking'), 's1-0', 'Dhaka.', 3);
    const f = await assessSpeaking(fake(() => ({})), t1, submit(s, t1), 'en');
    assert.equal(calls.length, 0);
    assert.equal(f.overall, null);
  });

  console.log(`\n${passed} passed`);
}
void main();
