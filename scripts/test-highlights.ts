/** Reading-passage highlight checks (pure). Run: npm run test:highlights */
import assert from 'node:assert/strict';
import { addHighlight, clearHighlight, normalise, segmentsOf, touching, type Highlight } from '../lib/ielts/highlights';

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
const h = (p: string, s: number, e: number): Highlight => ({ p, s, e });

test('adding joins overlapping and touching highlights in the same paragraph, and keeps paragraphs apart', () => {
  let list = addHighlight([], h('A', 5, 10));
  list = addHighlight(list, h('A', 8, 14));
  list = addHighlight(list, h('A', 14, 18));
  list = addHighlight(list, h('B', 0, 4));
  list = addHighlight(list, h('A', 30, 35));
  assert.deepEqual(list, [h('A', 5, 18), h('A', 30, 35), h('B', 0, 4)]);
});

test('empty and reversed selections add nothing', () => {
  assert.deepEqual(addHighlight([], h('A', 4, 4)), []);
  assert.deepEqual(normalise([h('A', 9, 3)]), []);
});

test('clearing removes only the selected stretch, splitting a highlight when the selection is in the middle', () => {
  const list = [h('A', 5, 20)];
  assert.deepEqual(clearHighlight(list, h('A', 8, 12)), [h('A', 5, 8), h('A', 12, 20)]);
  assert.deepEqual(clearHighlight(list, h('A', 0, 8)), [h('A', 8, 20)]);
  assert.deepEqual(clearHighlight(list, h('A', 15, 40)), [h('A', 5, 15)]);
  assert.deepEqual(clearHighlight(list, h('A', 5, 20)), []);
  assert.deepEqual(clearHighlight(list, h('B', 5, 20)), list, 'another paragraph is untouched');
  assert.deepEqual(clearHighlight(list, h('A', 25, 30)), list, 'a selection away from any highlight changes nothing');
});

test('a selection that touches highlights finds them', () => {
  const list = [h('A', 5, 10), h('A', 20, 25), h('B', 0, 50)];
  assert.deepEqual(touching(list, h('A', 8, 22)), [h('A', 5, 10), h('A', 20, 25)]);
  assert.deepEqual(touching(list, h('A', 10, 20)), [], 'touching only at the edge is not overlap');
  assert.deepEqual(touching(list, h('C', 0, 9)), []);
});

test('a paragraph is cut into plain and highlighted pieces that put the text back together', () => {
  const text = 'The cork oak can lose its bark without harm.';
  const segs = segmentsOf(text, [h('1', 4, 12), h('2', 0, 3)], '1');
  assert.deepEqual(segs.map((s) => [s.text, s.highlighted]), [['The ', false], ['cork oak', true], [' can lose its bark without harm.', false]]);
  assert.equal(segs.map((s) => s.text).join(''), text);
  assert.deepEqual(segmentsOf(text, [], '1').map((s) => s.highlighted), [false]);
  const whole = segmentsOf(text, [h('1', 0, 999)], '1');
  assert.deepEqual(whole.map((s) => [s.start, s.end, s.highlighted]), [[0, text.length, true]]);
});

console.log(`\n${passed} passed`);
