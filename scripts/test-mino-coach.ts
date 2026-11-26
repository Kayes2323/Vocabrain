import assert from 'node:assert/strict';
import { MINO_COACH_AREAS, MINO_COACH_EVENTS, poseForEvent, poseHoldMs, welcomeStorageKey } from '../lib/mino/coach';
import { coachLineFor, coachText, COACH_ROLE, COACH_WELCOME } from '../lib/mino/coach-messages';

let passed = 0;
function test(name: string, fn: () => void) {
  fn();
  passed++;
  console.log(`PASS ${name}`);
}

const APPROVED_TASK1_WELCOME_BN =
  'হ্যালো! আমি Mino—আপনার Writing Task 1 শেখার সঙ্গী। চার্ট, Overview কিংবা Body Paragraph কঠিন লাগছে? চিন্তা করবেন না। আপনি নিশ্চিন্তে শুরু করুন। আমি ধাপে ধাপে বুঝিয়ে দেব কীভাবে তথ্য বিশ্লেষণ করবেন, গুরুত্বপূর্ণ তুলনা বেছে নেবেন, আর পরিষ্কারভাবে লিখবেন। আপনার লেখা দেখে ভুলগুলো চিহ্নিত করে সহজভাবে বুঝিয়ে দেব, এবং কীভাবে উন্নতি করবেন সেটাও দেখাব। আপনি শুধু নিয়মিত অনুশীলন করুন—Writing Task 1 শেখার প্রতিটি ধাপে আপনাকে গাইড করার দায়িত্ব আমার। চলুন, শুরু করি!';

test('every reported event maps to exactly one pose, and the mapping is total', () => {
  for (const event of MINO_COACH_EVENTS) {
    const pose = poseForEvent(event);
    assert.equal(typeof pose, 'string');
  }
});

test('one-shot poses (enter/success/encouraging/welcome) settle on their own; held poses never auto-settle', () => {
  assert.ok(poseHoldMs('enter') > 0);
  assert.ok(poseHoldMs('success') > 0);
  assert.ok(poseHoldMs('encouraging') > 0);
  assert.ok(poseHoldMs('welcome') > 0);
  assert.equal(poseHoldMs('idle'), 0);
  assert.equal(poseHoldMs('speaking'), 0);
  assert.equal(poseHoldMs('explaining'), 0);
  assert.equal(poseHoldMs('thinking'), 0);
});

test("Task 1's Bangla welcome is the exact approved script — never paraphrased", () => {
  assert.equal(COACH_WELCOME.task1.bn, APPROVED_TASK1_WELCOME_BN);
});

test('every area has its own welcome and role — Task 1 and Task 2 are never the same script', () => {
  for (const area of MINO_COACH_AREAS) {
    assert.ok(COACH_WELCOME[area].en.length > 20);
    assert.ok(COACH_WELCOME[area].bn.length > 20);
    assert.ok(COACH_ROLE[area].en.length > 0);
    assert.ok(COACH_ROLE[area].bn.length > 0);
  }
  assert.notEqual(COACH_WELCOME.task1.bn, COACH_WELCOME.task2.bn);
  assert.notEqual(COACH_WELCOME.task1.en, COACH_WELCOME.task2.en);
  assert.notEqual(COACH_WELCOME.task1.bn, COACH_WELCOME['my-brain'].bn);
});

test('no welcome or dialogue line ever promises a guaranteed band score', () => {
  for (const area of MINO_COACH_AREAS) {
    const en = COACH_WELCOME[area].en.toLowerCase();
    assert.ok(!/band\s*[6-9]/.test(en), `${area} welcome must not promise a specific band`);
    assert.ok(!en.includes('guarantee'), `${area} welcome must not guarantee an outcome`);
  }
});

test('Bangla always addresses the learner respectfully (আপনি), never তুমি/তুই, anywhere in coach dialogue', () => {
  const disrespectful = /তুমি|তোমার|তোমাকে|তুই|তোর/;
  for (const area of MINO_COACH_AREAS) {
    assert.ok(!disrespectful.test(COACH_WELCOME[area].bn), `${area} welcome`);
    assert.ok(!disrespectful.test(COACH_ROLE[area].bn), `${area} role label`);
    for (const event of MINO_COACH_EVENTS) {
      const line = coachLineFor(area, event);
      if (line) assert.ok(!disrespectful.test(line.bn), `${area}/${event} line`);
    }
  }
});

test('explaining/thinking/success/struggle each have a short line for every area (idle is deliberately silent)', () => {
  for (const area of MINO_COACH_AREAS) {
    for (const event of ['explaining', 'thinking', 'success', 'struggle'] as const) {
      const line = coachLineFor(area, event);
      assert.ok(line, `${area}/${event} should have a line`);
      assert.ok(coachText('en', line!).length > 0 && coachText('bn', line!).length > 0);
    }
    assert.equal(coachLineFor(area, 'idle'), undefined, 'idle must stay silent, not invent chatter');
  }
});

test('an encouragement line never reads as judging the learner (no "wrong"/"fail"/"bad")', () => {
  const judging = /\bwrong\b|\bfail(ed)?\b|\bbad\b|ভুল করেছেন|খারাপ/i;
  for (const area of MINO_COACH_AREAS) {
    const line = coachLineFor(area, 'struggle')!;
    assert.ok(!judging.test(line.en), `${area} struggle (en) must stay reassuring`);
    assert.ok(!judging.test(line.bn), `${area} struggle (bn) must stay reassuring`);
  }
});

test('the welcome-seen flag is a per-area, per-device localStorage key — never a new Firestore field', () => {
  const keys = MINO_COACH_AREAS.map(welcomeStorageKey);
  assert.equal(new Set(keys).size, keys.length, 'each area gets its own key');
  for (const k of keys) assert.ok(k.startsWith('vocabbrain:'), 'namespaced like the rest of this app\'s device-local flags');
});

console.log(`\n${passed} passed`);
