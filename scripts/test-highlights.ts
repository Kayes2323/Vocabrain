/** Highlight and note checks (pure). Run: npm run test:highlights */
import assert from 'node:assert/strict';
import { addHighlight, addNote, annotationAt, clearRange, fullyHighlighted, normalise, restore, setNote, touching, type Annotation } from '../lib/ielts/annotations';

let passed = 0;
const test = (name: string, fn: () => void) => {
  try {
    fn();
    passed++;
    console.log(`PASS ${name}`);
  } catch (e) {
    console.log(`FAIL ${name}\n  ${(e as Error).message}`);
    process.exitCode = 1;
  }
};

const TEXT = 'The cork oak can lose its outer bark without being harmed. Cork is harvested in summer.';
const span = (s: number, e: number) => ({ s, e });
const pairs = (list: Annotation[]) => list.map((a) => [a.s, a.e, a.note ?? null]);

test('highlights that overlap or touch join into one; separate ones stay apart', () => {
  let list = addHighlight([], span(4, 12), TEXT);
  list = addHighlight(list, span(10, 20), TEXT);
  list = addHighlight(list, span(20, 24), TEXT);
  list = addHighlight(list, span(40, 50), TEXT);
  assert.deepEqual(pairs(list), [[4, 24, null], [40, 50, null]]);
  assert.equal(list[0].q, TEXT.slice(4, 24));
});

test('empty and reversed selections add nothing', () => {
  assert.deepEqual(addHighlight([], span(5, 5), TEXT), []);
  assert.deepEqual(normalise([{ s: 9, e: 3, q: '' }]), []);
});

test('a note keeps its own range even where it overlaps a highlight', () => {
  let list = addHighlight([], span(4, 20), TEXT);
  list = addNote(list, span(8, 12), TEXT, 'check this');
  assert.deepEqual(pairs(list), [[4, 20, null], [8, 12, 'check this']]);
  list = addHighlight(list, span(18, 30), TEXT);
  assert.deepEqual(pairs(list), [[4, 30, null], [8, 12, 'check this']]);
});

test('editing a note changes only its words; an empty note removes it', () => {
  const list = addNote(addHighlight([], span(0, 3), TEXT), span(8, 12), TEXT, 'first');
  assert.deepEqual(pairs(setNote(list, span(8, 12), 'second')), [[0, 3, null], [8, 12, 'second']]);
  assert.deepEqual(pairs(setNote(list, span(8, 12), '   ')), [[0, 3, null]]);
  assert.deepEqual(pairs(setNote(list, span(9, 12), 'nothing here')), pairs(list), 'only the exact range is edited');
});

test('clearing removes the selected stretch from a highlight (splitting it) and any note it touches', () => {
  const base = addHighlight([], span(5, 30), TEXT);
  assert.deepEqual(pairs(clearRange(base, span(10, 15), TEXT)), [[5, 10, null], [15, 30, null]]);
  assert.deepEqual(pairs(clearRange(base, span(0, 8), TEXT)), [[8, 30, null]]);
  assert.deepEqual(pairs(clearRange(base, span(5, 30), TEXT)), []);
  assert.deepEqual(pairs(clearRange(base, span(40, 50), TEXT)), [[5, 30, null]], 'away from any highlight nothing changes');
  const withNote = addNote(base, span(8, 12), TEXT, 'n');
  assert.deepEqual(pairs(clearRange(withNote, span(10, 11), TEXT)), [[5, 10, null], [11, 30, null]], 'the note touched is removed whole');
});

test('what a selection touches, whether it is all highlighted, and what lies under a point', () => {
  const list = addNote(addHighlight([], span(5, 10), TEXT), span(20, 25), TEXT, 'x');
  assert.equal(touching(list, span(8, 22)).length, 2);
  assert.equal(touching(list, span(10, 20)).length, 0, 'meeting only at an edge is not touching');
  assert.equal(fullyHighlighted(list, span(6, 9)), true);
  assert.equal(fullyHighlighted(list, span(6, 12)), false);
  assert.equal(fullyHighlighted(list, span(20, 24)), false, 'a note is not a highlight');
  assert.equal(annotationAt(list, 22)?.note, 'x');
  assert.equal(annotationAt(list, 7)?.note, undefined);
  assert.equal(annotationAt(list, 15), undefined);
});

test('stored annotations find their place again when the text shifts, and are dropped when it is gone', () => {
  const list = addNote(addHighlight([], span(4, 12), TEXT), span(46, 58), TEXT, 'harmed?');
  const shifted = `Question 3. ${TEXT}`;
  const back = restore(list, shifted);
  assert.deepEqual(back.map((a) => shifted.slice(a.s, a.e)), [TEXT.slice(4, 12), TEXT.slice(46, 58)]);
  assert.equal(back[1].note, 'harmed?');
  assert.deepEqual(restore(list, TEXT).length, 2, 'unchanged text keeps everything');
  assert.deepEqual(restore(list, 'Something else entirely.'), []);
});

console.log(`\n${passed} passed`);
