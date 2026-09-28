// Quality checks for the IELTS Reading Library: every passage, question and
// vocabulary entry must pass these before release.
// Run: npx -y tsx scripts/test-reading-library.ts
import assert from 'node:assert/strict';
import {
  LEXICON, LEX_LIST, LIBRARY, flatten, gradeGap, gradeMulti, marksFor, modelAnswer, nextPassage, normalize, optionsFor, questionCount,
  scorePassage, segmentParagraph, suggestedLevel, vocabView, vocabWordInfo, wordCount,
} from '../lib/content/reading-library';
import type { GapGroup, LibraryPassage, ReadingLibraryProgress } from '../lib/content/reading-library';

let passed = 0;
/** PARTIAL=1 while the library is being written: skip the whole-library counts. */
const PARTIAL = process.env.PARTIAL === '1';
function test(name: string, fn: () => void, whole = false) {
  if (whole && PARTIAL) return;
  try {
    fn();
    passed++;
    console.log('PASS', name);
  } catch (e) {
    console.error('FAIL', name);
    console.error(e);
    process.exit(1);
  }
}

const BN = /[ঀ-৿]/;
const INFORMAL = /তুমি|তোমার|তোমাকে|তোমাদের|তুই|তোর|তোকে/;
const flat = (s: string) => normalize(s).replace(/[“”"]/g, '"');
const text = (p: LibraryPassage) => p.paragraphs.join('\n');
const words = (p: LibraryPassage) => text(p).split(/\s+/).filter(Boolean).length;
const LIMITS = { foundation: [380, 700], intermediate: [600, 1000], advanced: [750, 1150] } as const;
const MIN_Q = { foundation: 10, intermediate: 12, advanced: 13 } as const;

test('the library: 20 original passages, 6 Foundation · 8 Intermediate · 6 Advanced, no repeated topic', () => {
  assert.equal(LIBRARY.length, 20);
  const by = (l: string) => LIBRARY.filter((p) => p.level === l).length;
  assert.deepEqual([by('foundation'), by('intermediate'), by('advanced')], [6, 8, 6]);
  assert.equal(new Set(LIBRARY.map((p) => p.id)).size, 20);
  assert.equal(new Set(LIBRARY.map((p) => p.topic)).size, 20, 'every topic is different');
  assert.equal(new Set(LIBRARY.map((p) => p.title)).size, 20);
}, true);

test('passages: length by level, 4+ paragraphs, clean text', () => {
  for (const p of LIBRARY) {
    const [min, max] = LIMITS[p.level];
    const n = words(p);
    assert.ok(n >= min && n <= max, `${p.id}: ${n} words (want ${min}–${max} for ${p.level})`);
    assert.ok(p.paragraphs.length >= 4 && p.paragraphs.length <= 8, `${p.id}: ${p.paragraphs.length} paragraphs`);
    assert.doesNotMatch(text(p), /\s{2,}|\s[,.;:]/, `${p.id}: spacing`);
    assert.doesNotMatch(text(p), /Cambridge/i, `${p.id}: no Cambridge material or claims`);
  }
});

test('lexicon: every word defined once, bilingual, with an example and a Bangla example', () => {
  assert.equal(LEX_LIST.length, Object.keys(LEXICON).length, `duplicate lemmas: ${LEX_LIST.map((e) => e.lemma).filter((l, i, a) => a.indexOf(l) !== i)}`);
  for (const e of LEX_LIST) {
    assert.equal(e.lemma, e.lemma.toLowerCase(), e.lemma);
    assert.ok(e.pos && e.en && e.example, `${e.lemma}: fields`);
    assert.ok(BN.test(e.bn) && BN.test(e.exampleBn), `${e.lemma}: Bangla meaning and example`);
    assert.ok(['core', 'useful', 'advanced'].includes(e.tier), e.lemma);
    assert.doesNotMatch(e.bn + e.exampleBn, INFORMAL, `${e.lemma}: respectful Bangla`);
    assert.ok(e.example.split(/\s+/).length >= 4, `${e.lemma}: a real example sentence`);
  }
  const used = new Set(LIBRARY.flatMap((p) => p.vocab.map((x) => x.lemma)));
  for (const e of LEX_LIST) assert.ok(used.has(e.lemma), `${e.lemma} is defined but never used`);
});

test('passage vocabulary: 20+ words each, in the lexicon, found in the text, with a Bangla context meaning', () => {
  let reused = 0;
  for (const p of LIBRARY) {
    assert.ok(p.vocab.length >= 20, `${p.id}: ${p.vocab.length} vocabulary items`);
    assert.equal(new Set(p.vocab.map((x) => x.lemma)).size, p.vocab.length, `${p.id}: a word listed twice`);
    const tiers = new Set(p.vocab.map((x) => LEXICON[x.lemma]?.tier));
    assert.ok(tiers.has('core') && tiers.has('useful'), `${p.id}: core and useful words`);
    for (const x of p.vocab) {
      assert.ok(LEXICON[x.lemma], `${p.id}: "${x.lemma}" is not in the lexicon`);
      assert.ok(x.match.length > 0);
      for (const form of x.match) {
        const re = new RegExp(`(?<![A-Za-z])${form.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![A-Za-z])`, 'i');
        assert.match(text(p), re, `${p.id}: "${form}" (${x.lemma}) is not in the passage`);
      }
      assert.ok(x.ctx.en && BN.test(x.ctx.bn), `${p.id}: ${x.lemma} context meaning`);
      assert.doesNotMatch(x.ctx.bn + (x.sense?.bn ?? ''), INFORMAL, `${p.id}: ${x.lemma} respectful Bangla`);
      if (x.sense?.bn) assert.ok(BN.test(x.sense.bn));
    }
  }
  const uses = new Map<string, number>();
  for (const x of LIBRARY.flatMap((p) => p.vocab)) uses.set(x.lemma, (uses.get(x.lemma) ?? 0) + 1);
  reused = [...uses.values()].filter((n) => n > 1).length;
  if (!PARTIAL) assert.ok(reused >= 15, `words are reused across passages (${reused})`);
});

test('questions: IELTS mix per passage, unique ids, valid answers and options', () => {
  const ids = new Set<string>();
  for (const p of LIBRARY) {
    assert.ok(questionCount(p) >= MIN_Q[p.level], `${p.id}: ${questionCount(p)} questions (want ${MIN_Q[p.level]}+)`);
    const types = new Set(p.groups.map((g) => (g.kind === 'multi' ? 'multi' : g.type)));
    assert.ok(types.size >= 3, `${p.id}: ${types.size} question types`);
    for (const q of flatten(p)) {
      assert.ok(!ids.has(q.id), `duplicate question id ${q.id}`);
      ids.add(q.id);
      const ex = q.kind === 'multi' ? q.group.item.explain : q.item.explain;
      assert.ok(ex.en && BN.test(ex.bn), `${q.id}: bilingual explanation`);
      assert.doesNotMatch(ex.bn, INFORMAL, `${q.id}: respectful Bangla`);
      if (q.kind === 'select') {
        const opts = optionsFor(p, q.group, q.item).map((o) => o.value);
        assert.ok(opts.includes(q.item.answer), `${q.id}: answer "${q.item.answer}" is not an option`);
        assert.equal(new Set(opts).size, opts.length, `${q.id}: duplicate options`);
        if (q.group.type === 'mcq') assert.ok(opts.length >= 3, `${q.id}: at least 3 options`);
      }
      if (q.kind === 'multi') {
        const opts = q.group.item.options.map((o) => o.value);
        assert.ok(q.group.item.answers.every((a) => opts.includes(a)) && q.group.item.answers.length === 2 && opts.length >= 5, `${q.id}: Choose TWO`);
      }
      if (q.kind === 'gap') {
        const g: GapGroup = q.group;
        for (const a of q.item.accepted) assert.ok(wordCount(a) <= g.maxWords, `${q.id}: "${a}" breaks the ${g.maxWords}-word limit`);
        assert.ok(flat(text(p)).includes(normalize(q.item.accepted[0])), `${q.id}: "${q.item.accepted[0]}" must be words from the passage`);
        if (g.type === 'sentence') assert.match(q.item.prompt ?? '', /___/, `${q.id}: sentence gap`);
        if (g.type === 'short') assert.match(q.item.prompt ?? '', /\?$/, `${q.id}: a question`);
        if (g.type === 'summary' || g.type === 'note' || g.type === 'table') {
          const src = JSON.stringify(g.lines ?? g.table);
          assert.equal(src.split(`[[${q.id}]]`).length - 1, 1, `${q.id}: placeholder appears once`);
        }
      }
    }
    for (const g of p.groups) {
      if (g.kind === 'select' && g.type === 'headings') assert.ok((g.options?.length ?? 0) > g.items.length, `${p.id}: more headings than paragraphs`);
      if (g.kind === 'select' && (g.type === 'names' || g.type === 'headings')) assert.ok(g.options, `${p.id}: a list to choose from`);
    }
  }
});

test('evidence: every answer except NOT GIVEN is proved by words copied from the passage', () => {
  for (const p of LIBRARY) {
    for (const q of flatten(p)) {
      const ev = q.kind === 'multi' ? q.group.item.evidence : q.item.evidence;
      const ng = q.kind === 'select' && q.item.answer === 'NOT GIVEN';
      if (!ng) assert.ok(ev, `${q.id}: evidence`);
      if (ev) assert.ok(flat(text(p)).includes(flat(ev)), `${q.id}: evidence "${ev}" is not in ${p.id}`);
    }
  }
});

test('answer balance: TRUE / FALSE / NOT GIVEN and YES / NO / NOT GIVEN are all used; MCQ answers vary', () => {
  const all = LIBRARY.flatMap((p) => flatten(p));
  const tf = all.filter((q) => q.kind === 'select' && q.group.type === 'tfng').map((q) => modelAnswer(q));
  const yn = all.filter((q) => q.kind === 'select' && q.group.type === 'ynng').map((q) => modelAnswer(q));
  for (const a of ['TRUE', 'FALSE', 'NOT GIVEN']) assert.ok(tf.filter((x) => x === a).length >= 5, `TFNG uses ${a}`);
  for (const a of ['YES', 'NO', 'NOT GIVEN']) assert.ok(yn.filter((x) => x === a).length >= 3, `YNNG uses ${a}`);
  const mcq = all.filter((q) => q.kind === 'select' && q.group.type === 'mcq').map((q) => modelAnswer(q));
  for (const a of ['A', 'B', 'C', 'D']) assert.ok(mcq.filter((x) => x === a).length >= 3, `MCQ answer ${a} is used`);
  const types = new Set<string>(LIBRARY.flatMap((p) => p.groups.map((g) => (g.kind === 'multi' ? 'multi' : g.type))));
  for (const t of ['mcq', 'tfng', 'ynng', 'headings', 'info', 'names', 'sentence', 'summary', 'note', 'table', 'short', 'multi']) assert.ok(types.has(t), `the library uses ${t}`);
}, true);

test('grading: model answers score full marks; blanks, wrong words and word-limit breaks score zero', () => {
  for (const p of LIBRARY) {
    const model = Object.fromEntries(
      flatten(p).map((q) => [q.id, q.kind === 'multi' ? q.group.item.answers.join(',') : q.kind === 'select' ? q.item.answer : q.item.accepted[0]]),
    );
    assert.deepEqual(scorePassage(p, model), { correct: questionCount(p), total: questionCount(p) }, p.id);
    assert.equal(scorePassage(p, {}).correct, 0, p.id);
  }
  const p = LIBRARY.find((x) => x.groups.some((g) => g.kind === 'gap' && g.maxWords === 1))!;
  const g = p.groups.find((x): x is GapGroup => x.kind === 'gap' && x.maxWords === 1)!;
  const item = g.items[0];
  assert.equal(gradeGap(g, item, `  ${item.accepted[0].toUpperCase()}. `).correct, true, 'case, spaces and a full stop are ignored');
  assert.deepEqual(gradeGap(g, item, `the ${item.accepted[0]}`), { correct: false, reason: 'limit' });
  assert.deepEqual(gradeGap(g, item, ''), { correct: false, reason: 'blank' });
  const m = LIBRARY.flatMap((x) => x.groups).find((x) => x.kind === 'multi');
  if (!PARTIAL) assert.ok(m, 'a Choose TWO question exists');
  if (m && m.kind === 'multi') {
    const [a, b] = m.item.answers;
    const wrong = m.item.options.map((o) => o.value).find((o) => !m.item.answers.includes(o))!;
    assert.equal(gradeMulti(m, `${b},${a}`), 2, 'any order');
    assert.equal(gradeMulti(m, `${a},${wrong}`), 1, 'one mark per correct letter');
    assert.equal(gradeMulti(m, `${a},${b},${wrong}`), 0, 'more letters than asked scores nothing');
  }
  const q = flatten(LIBRARY[0])[0];
  assert.equal(marksFor(q, undefined), 0);
});

test('vocabulary in the reader: spans rebuild the paragraph, longer phrases win, context meaning is shown and saved', () => {
  for (const p of LIBRARY) {
    for (const para of p.paragraphs) {
      const segs = segmentParagraph(para, p.vocab);
      assert.equal(segs.map((s) => s.text).join(''), para, `${p.id}: segments rebuild the text`);
    }
    const found = new Set(p.paragraphs.flatMap((para) => segmentParagraph(para, p.vocab).filter((s) => s.vocab).map((s) => s.vocab!.lemma)));
    for (const x of p.vocab) assert.ok(found.has(x.lemma), `${p.id}: "${x.lemma}" is clickable`);
  }
  const segs = segmentParagraph('It fell in turn, and turned.', [
    { lemma: 'turn', match: ['turn'], ctx: { en: 'x', bn: 'ক' } },
    { lemma: 'in turn', match: ['in turn'], ctx: { en: 'x', bn: 'ক' } },
  ]);
  assert.deepEqual(segs.filter((s) => s.vocab).map((s) => s.text), ['in turn'], 'the phrase wins; "turned" is not "turn"');
  // Context meaning: a sense-specific meaning replaces the default.
  const withSense = LIBRARY.flatMap((p) => p.vocab).find((x) => x.sense?.bn && x.sense.bn !== LEXICON[x.lemma].bn)!;
  const view = vocabView(LEXICON[withSense.lemma], withSense);
  assert.equal(view.bn, withSense.sense!.bn);
  assert.notEqual(view.bn, LEXICON[withSense.lemma].bn);
  const info = vocabWordInfo(view);
  assert.equal(info.meaningBn, withSense.sense!.bn, 'the saved word keeps the meaning it had in the passage');
  assert.equal(info.lemma, withSense.lemma);
});

test('levels: a guide, not a lock — the suggested level moves on after 3 checked passages', () => {
  const done = (ids: string[]): Record<string, ReadingLibraryProgress> =>
    Object.fromEntries(ids.map((id) => [id, { answers: {}, checked: true, updatedAt: '2026-09-28' }]));
  assert.equal(suggestedLevel(LIBRARY, undefined), 'foundation');
  assert.equal(nextPassage(LIBRARY, undefined).level, 'foundation');
  const f = LIBRARY.filter((p) => p.level === 'foundation').map((p) => p.id);
  assert.equal(suggestedLevel(LIBRARY, done(f.slice(0, 2))), 'foundation');
  assert.equal(suggestedLevel(LIBRARY, done(f.slice(0, 3))), 'intermediate');
  assert.equal(nextPassage(LIBRARY, done(f.slice(0, 3))).level, 'intermediate');
  const i = LIBRARY.filter((p) => p.level === 'intermediate').map((p) => p.id);
  assert.equal(suggestedLevel(LIBRARY, done([...f.slice(0, 3), ...i.slice(0, 3)])), 'advanced');
}, true);

test('respectful Bangla everywhere in the library', () => {
  assert.doesNotMatch(JSON.stringify(LIBRARY), INFORMAL);
  assert.doesNotMatch(JSON.stringify(LEX_LIST), INFORMAL);
});

console.log(`\n${passed} passed`);
