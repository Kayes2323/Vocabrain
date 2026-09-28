/** Mino word-meaning checks with a fake AI (no network). Run: pnpm test:word-meaning */
import assert from 'node:assert/strict';
import { WORD_MEANING_MARKER, explainWord } from '../lib/ai/server/assess/word-meaning';
import { checkWordLookupLimit, WORD_LIMITS } from '../lib/ai/server/rate-limit';
import type { AIProvider, AIRunRequest } from '../lib/ai/types';
import { tokenize } from '../components/reading/tokenize';
import { LIBRARY, segmentParagraph } from '../lib/content/reading-library';

let passed = 0;
const test = async (name: string, fn: () => Promise<void> | void) => {
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
const fake = (reply: unknown): AIProvider => ({
  id: 'fake',
  async run(req) {
    calls.push(req);
    return { text: typeof reply === 'string' ? reply : JSON.stringify(reply), model: 'fake-fast', toolCalls: [], truncated: false };
  },
});

const good = {
  word: 'bank',
  lemma: 'bank',
  partOfSpeech: 'noun',
  bn: 'নদীর তীর',
  en: 'the land along the side of a river',
  contextBn: 'এই বাক্যে "bank" মানে নদীর তীর।',
  contextEn: 'Here "bank" means the side of the river.',
  example: 'We sat on the bank of the river.',
  exampleBn: 'আমরা নদীর তীরে বসেছিলাম।',
};

void (async () => {
  await test('explainWord: parses the JSON and returns the contextual meaning', async () => {
    const r = await explainWord(fake(good), 'bank', 'They walked along the bank of the river.');
    assert.equal(r.bn, 'নদীর তীর');
    assert.equal(r.partOfSpeech, 'noun');
    assert.equal(r.model, 'fake-fast');
  });

  await test('explainWord: the prompt asks for the meaning in THIS sentence only, fast tier, JSON', async () => {
    const req = calls[calls.length - 1];
    assert.ok(req.system.includes(WORD_MEANING_MARKER));
    assert.match(req.system, /ONLY the one that fits this sentence/);
    assert.match(req.system, /never "তুমি"/);
    assert.equal(req.tier, 'fast');
    assert.equal(req.json, true);
    assert.match(req.messages[0].content, /<word>bank<\/word>/);
    assert.match(req.messages[0].content, /<sentence>They walked along the bank of the river\.<\/sentence>/);
  });

  await test('explainWord: code fences are tolerated', async () => {
    const r = await explainWord(fake('```json\n' + JSON.stringify(good) + '\n```'), 'bank', 'x bank x');
    assert.equal(r.lemma, 'bank');
  });

  await test('explainWord: invalid or incomplete JSON is an error, never a half card', async () => {
    await assert.rejects(explainWord(fake('not json'), 'bank', 'x bank x'));
    await assert.rejects(explainWord(fake({ ...good, bn: '' }), 'bank', 'x bank x'));
  });

  await test('word lookups have their own limit', () => {
    const uid = `t-${Date.now()}`;
    for (let i = 0; i < WORD_LIMITS.perMinute; i++) checkWordLookupLimit(uid, 1_000_000 + i);
    assert.throws(() => checkWordLookupLimit(uid, 1_000_000 + 100));
    assert.doesNotThrow(() => checkWordLookupLimit(uid, 1_000_000 + 61_000));
  });

  await test('every word of every library passage is a clickable token (key words or plain words)', () => {
    for (const p of LIBRARY) {
      for (const para of p.paragraphs) {
        const clickable = segmentParagraph(para, p.vocab).flatMap((seg) => (seg.vocab ? [seg.text] : tokenize(seg.text).filter((t) => t.isWord).map((t) => t.text)));
        const letters = (xs: string[]) => xs.join('').replace(/[^A-Za-z]/g, '');
        assert.equal(letters(clickable), para.replace(/[^A-Za-z]/g, ''), `${p.id}: a word is not clickable`);
      }
    }
  });

  console.log(`\n${passed} passed`);
})();
