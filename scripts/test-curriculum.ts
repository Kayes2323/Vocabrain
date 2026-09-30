// Unit tests: the IELTS curriculum (one learning path), Continue Learning,
// the seven-stage journey and honest progress numbers.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  completeLesson, CURRICULUM, DIAGNOSTIC_ITEMS, findLesson, lessonPlace, lessonState, MODULES, nextAction, nextLesson, PARALLEL_LESSONS, PATH_LESSONS,
  saveInProgress, scoreDiagnostic, stageLessons, getStage, validateCurriculum, FOUNDATION_TOPICS, getTopic, lessonBySlug, lessonHref, lessonSlug, LEGACY_TOPICS, lessonBySlugAnywhere,
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

test('Start Here: the seven IELTS basics in order, Academic-first', () => {
  const sh = getStage('start-here').steps.filter((s) => s.lessons?.length);
  assert.deepEqual(
    sh.map((s) => s.title.en),
    ['What is IELTS?', 'Why do you need IELTS?', 'What is Academic IELTS?', 'The four skills', 'IELTS test structure', 'How Band Scores work', 'How to prepare for IELTS'],
  );
  assert.deepEqual(START, ['ib-10', 'ib-11', 'ib-1', 'ib-2', 'ib-3', 'ib-4', 'ib-5', 'ib-6', 'ib-7', 'ib-8', 'ib-9']);
  // Mino prepares students for IELTS Academic: General Training is not taught as a path.
  const text = JSON.stringify(MODULES.flatMap((m) => m.lessons));
  assert.doesNotMatch(text, /General Training|\bGT\b/);
});

test('English Foundation: 24 topics in a usable-English order, then the review', () => {
  const ef = getStage('english-foundation').steps;
  assert.deepEqual(
    ef.filter((s) => !s.parallel).map((s) => s.title.en),
    [
      'How English Sentences Work', 'Parts of Speech', 'Nouns', 'Pronouns', 'Verbs', 'Helping Verbs', 'Subject + Verb + Object', 'Statements, Negatives & Questions',
      'Articles', 'Present Simple', 'Present Continuous', 'Past Simple', 'Future Basics', 'Subject–Verb Agreement', 'Adjectives', 'Adverbs', 'Prepositions',
      'Connectors', 'Compound Sentences', 'Complex Sentences', 'More Tenses & Tense Review', 'Punctuation & Capitalisation', 'Common Errors', 'Foundation Review',
    ],
  );
  assert.equal(ef.at(-1)!.parallel, true, 'Vocabulary Foundation runs alongside');
  const before = (a: string, b: string) => assert.ok(at(a) < at(b), `${a} before ${b}`);
  before('ib-9', 'sb-1'); // Start Here first
  before('sb-5', 'po-1'); // sentences before word classes
  before('pvb-1', 'pvb-2'); // verbs before helping verbs
  before('pvb-2', 'sb-10'); // helping verbs before negatives and questions
  before('sb-6', 'sb-10'); // simple sentences before negatives and questions
  before('sb-10', 'ar-1');
  before('t-2', 't-3'); // A1 tenses: present simple → continuous → past → future…
  before('t-3', 't-4');
  before('t-4', 't-8');
  before('t-8', 'sva-1'); // …before agreement and the rest
  before('pa-1', 'pv-1'); // adjectives before adverbs
  before('sb-7', 'sb-8'); // compound before complex
  before('cx-9', 't-6'); // perfect tenses (A2/B1) after the sentence work
  before('t-5', 't-7'); // past continuous before past perfect
  before('t-12', 'pu-1');
  const lessons = stageLessons(getStage('english-foundation'));
  assert.equal(lessons[0], 'sb-1');
  assert.equal(lessons.at(-1), 'pl-8', 'English Foundation ends with the review labs');
  before('pl-8', 'ls-1'); // IELTS skills after English Foundation
  before('sp-1', 'ls-2'); // Skill Building after the skill basics
  assert.ok(PARALLEL_LESSONS.every((id) => id.startsWith('vc-')), 'Vocabulary Foundation runs alongside');
  assert.equal(lessonPlace('ib-1')!.stage.id, 'start-here');
  assert.equal(lessonPlace('ls-3')!.stage.id, 'skill-building');
});

test('prerequisites follow the curriculum: the lesson before, inside the same topic', () => {
  const fp: FoundationProgress = { lessons: {}, errors: {}, concepts: {}, mistakes: [], days: {} };
  const state = (id: string) => {
    const f = findLesson(id)!;
    return lessonState(f.module, f.lesson, fp);
  };
  for (const topic of FOUNDATION_TOPICS) assert.equal(state(topic.lessons![0]), 'available', `${topic.id} opens with an open lesson`);
  assert.equal(state('t-3'), 'available', 'Present Continuous does not wait for the module order');
  assert.equal(state('t-2'), 'locked', 'Present Simple comes after "Understanding Time"');
  assert.equal(state('sb-10'), 'available', 'the new lesson opens where the path reaches it');
  const after = completeLesson(fp, 't-1', 90, NOW);
  assert.equal(lessonState(findLesson('t-2')!.module, findLesson('t-2')!.lesson, after), 'available');
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
  assert.deepEqual(continueLearning(p), { kind: 'lesson', lessonId: 'ib-10', stage: 'start-here' });
  assert.deepEqual(nextAction(p.foundation, NOW), { kind: 'lesson', lessonId: 'ib-10' });
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
  assert.equal(nextLesson(fp)!.lesson.id, 'ls-1');
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
  assert.match(read('components/progress/ProgressDashboard.tsx'), /learningStats/);
  assert.match(read('components/home/JourneyCard.tsx'), /useContinue/);
  assert.match(read('lib/engine/daily-plan.ts'), /nextLesson/);
  assert.match(read('lib/ai/server/mino/snapshot.ts'), /continueLearning/);
});

test('routes: /ielts/foundation/<topic> and /ielts/foundation/<topic>/<lesson>, unique and clash-free', () => {
  const ids = FOUNDATION_TOPICS.map((t) => t.id);
  assert.deepEqual(ids.slice(0, 7), ['what-is-ielts', 'why-ielts', 'academic-ielts', 'four-skills', 'test-structure', 'band-scores', 'how-to-prepare']);
  assert.deepEqual(ids.slice(7, 15), ['sentence-basics', 'parts-of-speech', 'noun', 'pronoun', 'verbs', 'helping-verbs', 'subject-verb-object', 'statements-negatives-questions']);
  const modules = MODULES.map((m) => m.id);
  assert.ok(ids.filter((id) => modules.includes(id)).every((id) => getTopic(id)), 'a topic that shares a module id is the topic page');
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
  assert.equal(lessonHref('t-2'), '/ielts/foundation/present-simple/present-simple');
  assert.equal(lessonHref('t-6'), '/ielts/foundation/tenses/present-perfect', 'More Tenses keeps the old tenses URL');
  assert.equal(lessonHref('ib-1'), '/ielts/foundation/academic-ielts/academic-ielts-the-test-for-university-study');
  assert.equal(lessonHref('ls-1'), '/ielts/foundation/lesson/ls-1', 'lessons outside the topic stages keep their page');
  // Links saved before the new order still find their lesson.
  assert.deepEqual(Object.keys(LEGACY_TOPICS).map((k) => getTopic(LEGACY_TOPICS[k])?.id), ['verbs', 'subject-verb-object', 'adjectives']);
  assert.equal(lessonBySlugAnywhere(lessonSlug('pvb-2')), 'pvb-2');
  assert.equal(lessonBySlugAnywhere('present-simple'), 't-2');
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

test('IELTS hub: plan, progress, learn, practice, test, tools — no learning path or stats block', () => {
  const hub = readFileSync('app/(app)/ielts/page.tsx', 'utf8');
  assert.doesNotMatch(hub, /LearningPath|ContinueCard|learningStats|ielts\.path\./, 'the journey timeline and progress block are gone from the page');
  const order = ['hub-plan', 'hub-learn', 'hub-practice', 'hub-test', 'hub-tools'].map((id) => hub.indexOf(`id="${id}"`));
  assert.ok(order.every((i, k) => i > 0 && (k === 0 || i > order[k - 1])), `sections in order: ${order}`);
  assert.match(hub, /<PlanHubCard/, 'My IELTS Plan comes first');
  const card = readFileSync('components/plan/PlanHubCard.tsx', 'utf8');
  assert.ok(card.includes('href="/ielts/plan"') && card.includes('href="/ielts/progress"'), 'the plan card opens the plan and links Progress separately');
});

console.log(`\n${passed} passed`);
