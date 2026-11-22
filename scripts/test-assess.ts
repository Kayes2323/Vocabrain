/** Writing/Speaking assessment checks with a fake AI (no network). Run: pnpm test:assess */
import assert from 'node:assert/strict';
import { assessSpeaking, assessWriting, assessWritingStudioTask } from '../lib/ai/server/assess';
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
    assert.match(calls[0].system, /friendly, respectful Bangla \(always "আপনি"/);
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

  await test('writing studio: free-standing task gets real criteria, chart data reaches the prompt, hallucinated quotes removed', async () => {
    calls.length = 0;
    const answer = `Overall, electricity use rose in both cities. ${essay(60)}`;
    const { feedback, model } = await assessWritingStudioTask(
      fake(() => ({
        criteria: [
          { criterion: 'Task Achievement', band: 6, comment: 'ok' },
          { criterion: 'Coherence & Cohesion', band: 6.5, comment: 'ok' },
          { criterion: 'Lexical Resource', band: 6, comment: 'ok' },
          { criterion: 'Grammatical Range & Accuracy', band: 6, comment: 'ok' },
        ],
        strengths: ['Clear overview'],
        mistakes: [{ quote: 'Overall, electricity use rose', fix: 'Overall, electricity use increased', why: 'repeated verb' }, { quote: 'a sentence that was never written', fix: 'x', why: 'hallucinated' }],
        actions: ['Add one more comparison'],
        vocabulary: [{ word: 'surged', tip: 'use for a sudden rise' }],
        betterSentences: [{ original: 'electricity use rose', improved: 'electricity consumption climbed' }],
      })),
      { task: 1, prompt: 'Describe the chart.', minWords: 40, chart: { caption: 'Electricity use', headers: ['', '2010', '2020'], rows: [['City A', '10%', '20%']] } },
      answer,
      'en',
    );
    assert.match(calls[0].messages[0].content, /Electricity use/, 'chart caption reached the prompt');
    assert.match(calls[0].messages[0].content, /City A/, 'chart row reached the prompt');
    assert.equal(feedback.criteria.length, 4);
    assert.equal(feedback.band, 6.0, 'mean of the four bands, rounded to nearest half');
    assert.equal(feedback.mistakes.length, 1, 'the hallucinated quote was dropped');
    assert.equal(model, 'fake-smart');
  });

  await test('writing studio: a very short answer is not sent to the AI', async () => {
    calls.length = 0;
    const { feedback, model } = await assessWritingStudioTask(fake(() => ({})), { task: 2, prompt: 'Discuss.', minWords: 250 }, 'Too short.', 'en');
    assert.equal(calls.length, 0);
    assert.equal(feedback.band, null);
    assert.equal(model, 'none');
  });

  await test('writing studio: skillFocus reaches the system prompt and tells the model what to judge and what to ignore', async () => {
    calls.length = 0;
    const answer = `The two line graphs illustrate the mean monthly temperature and the amount of rainfall recorded in two cities across a twelve-month period.`;
    await assessWritingStudioTask(
      fake(() => ({ criteria: [{ criterion: 'Task Achievement', band: 6, comment: 'ok' }] })),
      { task: 1, prompt: 'Paraphrase the question.', minWords: 20, skillFocus: 'Paraphrasing accuracy for a Task 1 introduction' },
      answer,
      'en',
    );
    assert.equal(calls.length, 1);
    assert.match(calls[0].system, /Paraphrasing accuracy for a Task 1 introduction/, 'the named skill reaches the prompt');
    assert.match(calls[0].system, /TARGETED SKILL DRILL/);
    assert.match(calls[0].system, /Do NOT penalise.*missing overview.*missing body paragraphs.*missing chart figures.*word count/, 'tells the model what not to penalise');
  });

  await test('writing studio: an overview-only skill drill is judged on the data (trend, direction, attribution, unsupported claims), not on paraphrasing', async () => {
    calls.length = 0;
    const answer = `Car use remained the most common way to travel to work despite falling noticeably, while cycling rose sharply and narrowed the gap.`;
    const { feedback } = await assessWritingStudioTask(
      fake(() => ({ criteria: [{ criterion: 'Task Achievement', band: 7, comment: 'ok' }] })),
      {
        task: 1,
        prompt: 'Write the main message of the chart.',
        minWords: 20,
        chart: { caption: 'Main method of travelling to work, 2010 and 2023 (% of commuters)', headers: ['Method', '2010', '2023'], rows: [['Car', '52', '38'], ['Bicycle', '6', '19']] },
        skillFocus: 'Chart interpretation and key-feature selection',
        checkScope: 'overview-only',
      },
      answer,
      'en',
    );
    const sys = calls[0].system;
    assert.match(sys, /Chart interpretation and key-feature selection/);
    assert.match(sys, /accuracy of the main trend/);
    assert.match(sys, /correct direction of change and correct attribution/);
    assert.match(sys, /percentage points confused with percentage growth/);
    assert.match(sys, /missing introduction, missing body paragraphs, missing detailed figures/, 'tells the model what not to penalise');
    assert.doesNotMatch(sys, /accurate paraphrasing/, 'must not fall back to the introduction/paraphrase drill wording');
    assert.match(calls[0].messages[0].content as string, /Car \| 52 \| 38/, 'the chart data reaches the model so claims can be checked');
    assert.equal(feedback.band, null, 'still never a band');
  });

  await test('writing studio: a drill with checkScope introduction-only (Lesson 01) keeps the original paraphrase wording', async () => {
    calls.length = 0;
    await assessWritingStudioTask(
      fake(() => ({ criteria: [{ criterion: 'Task Achievement', band: 6, comment: 'ok' }] })),
      { task: 1, prompt: 'Paraphrase.', minWords: 20, skillFocus: 'Paraphrasing accuracy for a Task 1 introduction', checkScope: 'introduction-only' },
      `The two line graphs illustrate the mean monthly temperature and the amount of rainfall recorded in two cities across a twelve-month period.`,
      'en',
    );
    assert.match(calls[0].system, /accurate paraphrasing/);
    assert.match(calls[0].system, /Do NOT penalise.*missing overview.*missing body paragraphs.*missing chart figures/);
  });

  await test('writing studio: an introduction-only drill asks the model to judge genuine paraphrase vs copying and accepts restated dates', async () => {
    calls.length = 0;
    await assessWritingStudioTask(
      fake(() => ({ criteria: [{ criterion: 'Task Achievement', band: 6, comment: 'ok' }] })),
      { task: 1, prompt: 'Write an accurate introduction.', minWords: 18, skillFocus: 'Task 1 introduction paraphrasing accuracy', checkScope: 'introduction-only' },
      'The bar chart compares the proportions of commuters travelling by five different forms of transport in one city in 2010 and 2023.',
      'en',
    );
    const sys = calls[0].system;
    assert.match(sys, /Task 1 introduction paraphrasing accuracy/);
    assert.match(sys, /genuine paraphrase or mostly the question's own wording copied back/);
    assert.match(sys, /Restating the question's own dates is correct, not an added figure/);
    assert.match(sys, /Do NOT penalise.*missing overview.*missing body paragraphs.*missing chart figures.*word count/);
  });

  await test('writing studio: skillFocus never produces a stored band, even if the AI ignores the instruction and returns real-looking bands', async () => {
    calls.length = 0;
    const answer = `The two line graphs illustrate the mean monthly temperature and the amount of rainfall recorded in two cities across a twelve-month period.`;
    const { feedback } = await assessWritingStudioTask(
      fake(() => ({
        // A non-compliant model that ignores "set band to null" — the server must still zero it out.
        criteria: [
          { criterion: 'Task Achievement', band: 7, comment: 'Accurate paraphrase.' },
          { criterion: 'Coherence & Cohesion', band: 6.5, comment: 'ok' },
          { criterion: 'Lexical Resource', band: 6, comment: 'ok' },
          { criterion: 'Grammatical Range & Accuracy', band: 7, comment: 'ok' },
        ],
      })),
      { task: 1, prompt: 'Paraphrase the question.', minWords: 20, skillFocus: 'Paraphrasing accuracy for a Task 1 introduction' },
      answer,
      'en',
    );
    assert.equal(feedback.band, null, 'band must be forced to null for a skill drill regardless of what the model returned');
    assert.ok(feedback.criteria.every((c) => c.band === null), 'every criterion band must be forced to null too');
  });

  await test('writing studio: omitting skillFocus is fully backward-compatible with the original full-task prompt and scoring', async () => {
    calls.length = 0;
    const answer = `Overall, electricity use rose in both cities. ${essay(60)}`;
    const { feedback } = await assessWritingStudioTask(
      fake(() => ({
        criteria: [
          { criterion: 'Task Achievement', band: 6, comment: 'ok' },
          { criterion: 'Coherence & Cohesion', band: 6.5, comment: 'ok' },
          { criterion: 'Lexical Resource', band: 6, comment: 'ok' },
          { criterion: 'Grammatical Range & Accuracy', band: 6, comment: 'ok' },
        ],
      })),
      { task: 1, prompt: 'Describe the chart.', minWords: 40 },
      answer,
      'en',
    );
    assert.match(calls[0].system, /UNDER the minimum|Assess ONE Academic Writing Task/, 'the original full-task system prompt is still used');
    assert.ok(!calls[0].system.includes('TARGETED SKILL DRILL'), 'the skill-drill prompt must not leak into a normal task');
    assert.equal(feedback.band, 6.0, 'a real band is still produced and kept when there is no skillFocus');
  });

  console.log(`\n${passed} passed`);
}
void main();
