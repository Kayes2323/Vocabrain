// Unit tests: the IELTS curriculum (one learning path), Continue Learning,
// the seven-stage journey and honest progress numbers.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  completeLesson, CURRICULUM, DIAGNOSTIC_ITEMS, findLesson, lessonPlace, lessonState, MODULES, nextAction, nextLesson, PARALLEL_LESSONS, PATH_LESSONS,
  saveInProgress, scoreDiagnostic, stageLessons, getStage, validateCurriculum, FOUNDATION_TOPICS, getTopic, lessonBySlug, lessonHref, lessonSlug,
} from '../lib/foundation';
import { continueLearning, ieltsJourney, learningStats } from '../lib/engine/journey';
import { en } from '../lib/i18n/locales/en';
import { bn } from '../lib/i18n/locales/bn';
import { emptyProfile, type FoundationProgress, type UserProfile } from '../lib/models';

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
const done = (fp: FoundationProgress, ids: string[]) => ids.reduce((x, id) => completeLesson(x, id, 90, NOW), fp);
const withFp = (p: UserProfile, fp: FoundationProgress): UserProfile => ({ ...p, foundation: fp });
const START = stageLessons(getStage('start-here'));
const at = (id: string) => PATH_LESSONS.indexOf(id);

test('every existing lesson is placed exactly once; nothing new, nothing lost', () => {
  const all = MODULES.flatMap((m) => m.lessons.map((l) => l.id));
  assert.deepEqual(validateCurriculum(all), []);
  assert.equal(PATH_LESSONS.length + PARALLEL_LESSONS.length, all.length);
  assert.deepEqual(CURRICULUM.map((s) => s.level), [0, 1, 2, 3, 4, 5, 6]);
});

test('English Foundation: 16 topic cards in the agreed order, then the review', () => {
  const ef = getStage('english-foundation').steps;
  assert.deepEqual(
    ef.filter((s) => !s.parallel).map((s) => s.title.en),
    [
      'Sentence Basics', 'Parts of Speech', 'Noun', 'Pronoun', 'Verb & Helping Verbs', 'Simple & Compound Sentences', 'Articles', 'Tenses',
      'Subject–Verb Agreement', 'Adjectives & Adverbs', 'Prepositions', 'Connectors', 'Complex Sentences', 'Punctuation & Capitalisation', 'Common Errors', 'Foundation Review',
    ],
  );
  assert.equal(ef.at(-1)!.parallel, true, 'Vocabulary Foundation runs alongside');
  const before = (a: string, b: string) => assert.ok(at(a) < at(b), `${a} before ${b}`);
  before('ib-4', 'sb-1'); // Start Here first
  before('t-5', 't-8'); // inside Tenses: simple forms first…
  before('t-8', 't-6'); // …then the perfect forms
  before('t-12', 'sva-1'); // Tenses (with its review test) before agreement
  const lessons = stageLessons(getStage('english-foundation'));
  assert.equal(lessons.at(-1), 'pl-8', 'English Foundation ends with the review labs');
  before('ce-9', 'ib-5'); // IELTS Basics after English Foundation
  before('sp-1', 'ls-2'); // Skill Building after IELTS Basics
  assert.ok(PARALLEL_LESSONS.every((id) => id.startsWith('vc-')), 'Vocabulary Foundation runs alongside');
  assert.equal(lessonPlace('ib-1')!.stage.id, 'start-here');
  assert.equal(lessonPlace('ls-3')!.stage.id, 'skill-building');
});

test('the path respects every lesson’s prerequisites: walking it, the next lesson is always open', () => {
  let fp: FoundationProgress = { lessons: {}, errors: {}, concepts: {}, mistakes: [], days: {} };
  for (const id of PATH_LESSONS) {
    const { module, lesson } = findLesson(id)!;
    assert.equal(lessonState(module, lesson, fp), 'available', `${id} is open when the path reaches it`);
    assert.equal(nextLesson(fp)!.lesson.id, id, `Continue goes to ${id}`);
    fp = completeLesson(fp, id, 90, NOW);
  }
  assert.ok(PARALLEL_LESSONS.includes(nextLesson(fp)!.lesson.id), 'then the vocabulary track');
});

test('new student: Start Here is current; Continue opens "What IELTS is"', () => {
  const p = emptyProfile('u');
  const j = ieltsJourney(p);
  assert.deepEqual(j.stages.map((s) => s.id), ['start-here', 'english-foundation', 'ielts-basics', 'skill-building', 'practice', 'mock-tests', 'target-ready']);
  assert.deepEqual(j.stages.map((s) => s.state), ['current', 'upcoming', 'upcoming', 'upcoming', 'upcoming', 'upcoming', 'upcoming']);
  assert.equal(j.percent, 0);
  assert.equal(j.stages[0].steps[0].state, 'current');
  assert.deepEqual(continueLearning(p), { kind: 'lesson', lessonId: 'ib-1', stage: 'start-here' });
  assert.deepEqual(nextAction(p.foundation, NOW), { kind: 'lesson', lessonId: 'ib-1' });
});

test('end of Start Here: the English check (optional), then "Start English Foundation"', () => {
  const p = emptyProfile('u');
  const fp = done(p.foundation, START);
  assert.deepEqual(continueLearning(withFp(p, fp)), { kind: 'check', skipLessonId: 'sb-1' });
  assert.equal(nextAction(fp, NOW).kind, 'check');
  const j = ieltsJourney(withFp(p, fp));
  assert.equal(j.stages[0].state, 'done', 'the check is optional: Start Here is done');
  assert.equal(j.current, 'english-foundation');
  // Took the check (average result): the first English Foundation lesson it did not skip.
  const answers = Object.fromEntries(DIAGNOSTIC_ITEMS.slice(0, 4).map((i) => [i.id, i.type === 'choice' || i.type === 'order' ? i.answer : i.accepted[0]]));
  const checked = { ...fp, diagnostic: scoreDiagnostic(answers, NOW) };
  const c = continueLearning(withFp(p, checked));
  assert.equal(c.kind, 'foundation-start');
  assert.equal(lessonPlace((c as { lessonId: string }).lessonId)!.stage.id, 'english-foundation');
  // Skipped the check: one lesson later it is no longer suggested.
  const skipped = done(fp, ['sb-1']);
  assert.deepEqual(continueLearning(withFp(p, skipped)), { kind: 'lesson', lessonId: 'sb-2', stage: 'english-foundation' });
});

test('a strong check counts English Foundation as done; its lessons stay open', () => {
  const p = emptyProfile('u');
  const right = Object.fromEntries(DIAGNOSTIC_ITEMS.map((i) => [i.id, i.type === 'choice' || i.type === 'order' ? i.answer : i.accepted[0]]));
  const fp = { ...done(p.foundation, START), diagnostic: scoreDiagnostic(right, NOW) };
  assert.equal(fp.diagnostic.level, 'strong');
  const j = ieltsJourney(withFp(p, fp));
  const ef = j.stages.find((s) => s.id === 'english-foundation')!;
  assert.equal(ef.state, 'done');
  assert.equal(ef.testedOut, true);
  assert.ok(ef.lessonsDone < ef.lessonsTotal, 'lessons are not reported as completed');
  assert.equal(j.current, 'ielts-basics');
  assert.equal(nextLesson(fp)!.lesson.id, 'ib-5');
  const { module, lesson } = findLesson('ar-1')!;
  assert.equal(lessonState(module, lesson, fp), 'available', 'still open for review');
});

test('resume: an unfinished lesson is always the Continue step', () => {
  const p = emptyProfile('u');
  const fp = saveInProgress(done(p.foundation, START), 't-2', 2, {}, 1, NOW);
  assert.deepEqual(continueLearning(withFp(p, fp)), { kind: 'resume', lessonId: 't-2', stage: 'english-foundation' });
});

test('stages without lessons: Practice, Mock Tests, Target Ready — from real activity only', () => {
  const p = emptyProfile('u');
  const fp = done(p.foundation, PATH_LESSONS);
  let prof = withFp(p, fp);
  let j = ieltsJourney(prof);
  assert.equal(j.current, 'practice');
  const c = continueLearning(prof);
  assert.equal(c.kind, 'step');
  assert.equal((c as { step: { href?: string } }).step.href, '/ielts/foundation', 'grammar practice first');
  prof = { ...prof, study: { ...prof.study, completedTasks: { vocabulary: 5, reading: 5, writing: 5, speaking: 5 } } };
  j = ieltsJourney(prof);
  assert.equal(j.current, 'practice', 'grammar practice still missing');
  const days = { '2026-09-29': { lessons: 0, questions: 0, correct: 0, reviews: 3, quizzes: 2 } };
  prof = { ...prof, foundation: { ...prof.foundation, days } };
  j = ieltsJourney(prof);
  assert.equal(j.current, 'mock-tests');
  prof = { ...prof, study: { ...prof.study, mockTestsCompleted: 2 } };
  assert.equal(ieltsJourney(prof).current, 'target-ready');
  prof = { ...prof, ielts: { ...prof.ielts, targetBand: 6.5, currentBands: { listening: 7, reading: 7, writing: 6, speaking: 6.5 } } };
  const last = ieltsJourney(prof);
  assert.equal(last.percent, 100);
  assert.ok(last.stages.every((s) => s.state === 'done'));
});

test('honest numbers: opening, starting or skipping is not completing', () => {
  const p = emptyProfile('u');
  let prof = withFp(p, saveInProgress(p.foundation, 'ib-1', 3, {}, 1, NOW));
  prof = { ...prof, vocabFoundation: { discovered: { a: {}, b: {}, c: {} } } as unknown as UserProfile['vocabFoundation'] };
  const s = learningStats(prof);
  assert.deepEqual([s.lessonsDone, s.practiceSessions, s.topicsMastered], [0, 0, 0]);
  assert.equal(ieltsJourney(prof).percent, 0, 'an opened lesson and discovered words are not progress');
  const after = learningStats(withFp(p, done(p.foundation, ['ib-1', 'ib-2'])));
  assert.equal(after.lessonsDone, 2);
  assert.equal(after.lessonsTotal, PATH_LESSONS.length + PARALLEL_LESSONS.length);
  const src = readFileSync('components/foundation/FoundationDashboard.tsx', 'utf8');
  assert.doesNotMatch(src, /vocabPct|discovered/, 'Foundation shows vocabulary progress from lessons, not words opened');
});

test('labels exist in English and Bangla; Bangla uses আপনি only', () => {
  for (const d of [en, bn] as unknown as Record<string, Record<string, Record<string, string>>>[]) {
    for (const s of CURRICULUM) assert.ok(d.journey.stages[s.id], `journey.stages.${s.id}`);
  }
  const text = JSON.stringify(CURRICULUM) + JSON.stringify((bn as unknown as Record<string, Record<string, unknown>>).ielts);
  assert.doesNotMatch(text, /তুমি|তোমার|তোমাকে|তোমাদের|তুই|তোর|তোকে|করো\b|দেখো\b|লেখো\b|বলো\b|দেখবে\b|পারবে\b/);
  for (const s of CURRICULUM) for (const st of s.steps) assert.ok(st.title.bn && st.why.bn && st.title.en && st.why.en, st.id);
});

test('one path everywhere: IELTS page, Home, Today and Mino read the same engine', () => {
  const read = (f: string) => readFileSync(f, 'utf8');
  assert.match(read('app/(app)/ielts/page.tsx'), /ContinueCard/);
  assert.match(read('app/(app)/ielts/page.tsx'), /LearningPath/);
  assert.match(read('components/home/JourneyCard.tsx'), /useContinue/);
  assert.match(read('lib/engine/daily-plan.ts'), /nextLesson/);
  assert.match(read('lib/ai/server/mino/snapshot.ts'), /continueLearning/);
});

test('routes: /ielts/foundation/<topic> and /ielts/foundation/<topic>/<lesson>, unique and clash-free', () => {
  const ids = FOUNDATION_TOPICS.map((t) => t.id);
  assert.deepEqual(ids.slice(0, 6), ['sentence-basics', 'parts-of-speech', 'noun', 'pronoun', 'verb-helping-verbs', 'simple-compound-sentences']);
  const reserved = ['lesson', 'diagnostic', 'challenge', 'fix', 'quiz', 'review'];
  assert.ok(ids.every((id) => /^[a-z-]+$/.test(id) && !reserved.includes(id)), 'topic slugs never hit a fixed route');
  for (const topic of FOUNDATION_TOPICS) {
    const slugs = (topic.lessons ?? []).map(lessonSlug);
    assert.equal(new Set(slugs).size, slugs.length, `${topic.id}: lesson slugs are unique`);
    for (const id of topic.lessons ?? []) assert.equal(lessonBySlug(topic, lessonSlug(id)), id);
    // A topic that shares its URL with a unit-based module must not shadow a unit page.
    const units = MODULES.find((m) => m.id === topic.id)?.units?.map((u) => u.id) ?? [];
    assert.ok(slugs.every((sl) => !units.includes(sl)), `${topic.id}: no lesson slug equals a unit id`);
  }
  assert.equal(lessonHref('sb-3'), '/ielts/foundation/sentence-basics/verb');
  assert.equal(lessonHref('t-2'), '/ielts/foundation/tenses/present-simple');
  assert.equal(lessonHref('ib-1'), '/ielts/foundation/lesson/ib-1', 'lessons outside English Foundation keep their page');
  assert.equal(getTopic('sentence-basics')!.lessons!.length, 5);
});

test('Foundation UI: navigation cards, no accordion', () => {
  const cards = readFileSync('components/foundation/TopicCards.tsx', 'utf8');
  assert.doesNotMatch(cards, /aria-expanded|useState|gridTemplateRows|onToggle/, 'topic cards do not expand');
  assert.match(cards, /<Link[\s\S]*href=\{topicHref\(s\.step\)\}/, 'the whole card is a link to the topic page');
  const view = readFileSync('components/foundation/TopicView.tsx', 'utf8');
  assert.match(view, /href=\{lessonHref\(id\)\}/, 'lesson cards link to the lesson page');
  assert.doesNotMatch(view, /aria-expanded|intercept\(/, 'no expanding, no modal before a lesson');
});

console.log(`\n${passed} passed`);
