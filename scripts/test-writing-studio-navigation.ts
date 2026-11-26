// Writing Studio navigation model: routes, statuses, the continue target, chart-type honesty and the validated way back.
//   npx tsx scripts/test-writing-studio-navigation.ts
import assert from 'node:assert/strict';
import { TASK1_MODULES, TASK1_VISUALS, TASK2_MODULES } from '../lib/writing-studio/content';
import { getLesson } from '../lib/writing-studio/lessons';
import {
  chartTypeHref,
  chartTypeState,
  continueHref,
  continueModule,
  examHref,
  learnHref,
  lessonHref,
  lessonStatus,
  mistakesHref,
  moduleHref,
  moduleStatus,
  practiceHref,
  resolveLessonBack,
  taskHref,
  visualHubHref,
} from '../lib/writing-studio/navigation';
import { progressForTask } from '../components/writing-studio/nav/MistakeRevision';
import { deriveMistakeCategories } from '../lib/writing-studio/progress';
import type { WritingStudioProgress } from '../lib/models';
import type { VisualTrainingArea } from '../lib/writing-studio/types';

let passed = 0;
function test(name: string, fn: () => void) {
  fn();
  passed++;
  console.log('PASS', name);
}

const empty: WritingStudioProgress = { lessons: {}, practice: [], mistakes: [], exams: [] };
const done = (ids: string[], task: 1 | 2 = 1): WritingStudioProgress => ({ ...empty, lessons: Object.fromEntries(ids.map((id, i) => [id, { task, completedAt: new Date(2026, 0, 1 + i).toISOString(), attempts: 1, lastBand: 6, bestBand: 6 }])) });

test('the hierarchy of routes', () => {
  assert.equal(taskHref('task1'), '/ielts/writing-studio/task1');
  assert.equal(learnHref('task1'), '/ielts/writing-studio/task1/learn');
  assert.equal(learnHref('task2'), '/ielts/writing-studio/task2/learn');
  assert.equal(visualHubHref(), '/ielts/writing-studio/task1/learn/visual-information');
  assert.equal(chartTypeHref('line-graphs'), '/ielts/writing-studio/task1/learn/visual-information/line-graphs');
  assert.equal(mistakesHref('task2'), '/ielts/writing-studio/task2/mistakes');
  assert.equal(practiceHref('task1'), '/ielts/writing-studio/task1/chart-analysis-board');
  assert.equal(practiceHref('task2'), '/ielts/writing-studio/task2/idea-development-board');
  assert.equal(examHref('task1'), '/ielts/writing-studio/exam/task1');
  assert.equal(examHref('task2'), '/ielts/writing-studio/exam/task2');
  assert.equal(lessonHref('task1', 'task1-understanding'), '/ielts/writing-studio/task1/lesson/task1-understanding');
});

test('the course libraries are the existing module registries: 7 for Task 1, 9 for Task 2, ids untouched', () => {
  assert.equal(TASK1_MODULES.length, 7);
  assert.equal(TASK2_MODULES.length, 9);
  assert.deepEqual(TASK1_MODULES.map((m) => m.builtLessonId), ['task1-understanding', 'visual-information', 'task1-introduction', 'overview-writing', 'body-paragraphs', 'task1-vocab-grammar', 'task1-complete-writing']);
  for (const m of [...TASK1_MODULES, ...TASK2_MODULES]) assert.ok(getLesson(m.builtLessonId!), `${m.id} -> a registered lesson`);
});

test('Module 2 opens the nested hub; every other module opens its own lesson', () => {
  assert.equal(moduleHref('task1', TASK1_MODULES[1]), visualHubHref());
  assert.equal(moduleHref('task1', TASK1_MODULES[0]), '/ielts/writing-studio/task1/lesson/task1-understanding?from=learn');
  assert.equal(moduleHref('task2', TASK2_MODULES[0]), '/ielts/writing-studio/task2/lesson/task2-understanding?from=learn');
  assert.equal(TASK1_MODULES.filter((m) => moduleHref('task1', m) === visualHubHref()).length, 1, 'the core lecture is reachable through one card only');
});

test('statuses come from real completion; "in progress" only from a started, unfinished lesson', () => {
  const m = TASK1_MODULES[0];
  assert.equal(moduleStatus(empty, m), 'not-started');
  assert.equal(moduleStatus(empty, m, { 'task1-understanding': 1 }), 'in-progress');
  assert.equal(moduleStatus(done(['task1-understanding']), m, { 'task1-understanding': 1 }), 'completed', 'completion wins over a started marker');
  assert.equal(lessonStatus(empty, undefined), 'not-started');
});

test('continue: nothing for a new learner; the started lesson first; otherwise the next uncompleted module', () => {
  assert.equal(continueModule(TASK1_MODULES, empty), undefined);
  assert.equal(continueModule(TASK1_MODULES, empty, { 'body-paragraphs': 5 })!.builtLessonId, 'body-paragraphs');
  assert.equal(continueModule(TASK1_MODULES, empty, { 'body-paragraphs': 5, 'task1-introduction': 9 })!.builtLessonId, 'task1-introduction', 'most recent started lesson');
  assert.equal(continueModule(TASK1_MODULES, done(['task1-understanding']))!.builtLessonId, 'visual-information');
  assert.equal(continueModule(TASK1_MODULES, done(TASK1_MODULES.map((m) => m.builtLessonId!))), undefined, 'everything completed: nothing to continue');
  assert.equal(continueHref('task1', TASK1_MODULES[1]), '/ielts/writing-studio/task1/lesson/visual-information?from=visual');
});

test('Line Graphs and Bar Charts are courses today; every other chart type is an honest preview', () => {
  assert.equal(TASK1_VISUALS.length, 7);
  const COURSES = new Set(['line-graphs', 'bar-charts']);
  for (const v of TASK1_VISUALS) assert.equal(chartTypeState(v), COURSES.has(v.id) ? 'course' : 'preview', v.id);
  const lg = TASK1_VISUALS.find((v) => v.id === 'line-graphs')!;
  assert.equal(lg.courseLessonId, 'line-graph-mastery');
  assert.ok(getLesson('line-graph-mastery'));
  assert.equal(resolveLessonBack('task1', 'line-graph-mastery', 'visual').href, '/ielts/writing-studio/task1/learn/visual-information/line-graphs');
  assert.equal(resolveLessonBack('task2', 'line-graph-mastery', 'visual').href, '/ielts/writing-studio/task2/learn');
  const bc = TASK1_VISUALS.find((v) => v.id === 'bar-charts')!;
  assert.equal(bc.courseLessonId, 'bar-chart-mastery');
  assert.ok(getLesson('bar-chart-mastery'));
  assert.equal(resolveLessonBack('task1', 'bar-chart-mastery', 'visual').href, '/ielts/writing-studio/task1/learn/visual-information/bar-charts');
});

test('a chart type becomes a course only through its own registered lesson id', () => {
  const area = (courseLessonId?: string): VisualTrainingArea => ({ id: 'x', title: 'X', description: 'x', courseLessonId });
  assert.equal(chartTypeState(area('overview-writing')), 'course', 'a registered lesson id enables the course (future authoring)');
  assert.equal(chartTypeState(area('not-a-lesson')), 'preview', 'an unregistered id stays a preview');
  assert.equal(chartTypeState(area(undefined)), 'preview');
});

test('back navigation follows the hierarchy and a direct link has a sensible parent', () => {
  assert.equal(resolveLessonBack('task1', 'overview-writing', 'learn').href, '/ielts/writing-studio/task1/learn');
  assert.equal(resolveLessonBack('task1', 'overview-writing', null).href, '/ielts/writing-studio/task1/learn');
  assert.equal(resolveLessonBack('task2', 'idea-development', undefined).href, '/ielts/writing-studio/task2/learn');
  assert.equal(resolveLessonBack('task1', 'visual-information', 'visual').href, visualHubHref());
  assert.equal(resolveLessonBack('task1', 'visual-information', null).href, visualHubHref(), 'the core lecture returns to its hub even from a direct link');
  assert.equal(resolveLessonBack('task1', 'overview-writing', 'mistakes').href, '/ielts/writing-studio/task1/mistakes');
  assert.equal(resolveLessonBack('task2', 'idea-development', 'progress').href, '/ielts/writing-studio/progress');
  assert.equal(resolveLessonBack('task2', 'idea-development', 'visual').href, '/ielts/writing-studio/task2/learn', '"visual" is only for the Task 1 core lecture');
});

test('the return destination is never taken from the URL: only fixed origins are accepted', () => {
  for (const evil of ['https://evil.example', '//evil.example', '/ielts/writing-studio/progress', 'javascript:alert(1)', '../../x', '', 'LEARN', 'learn ']) {
    const b = resolveLessonBack('task1', 'overview-writing', evil);
    assert.equal(b.href, '/ielts/writing-studio/task1/learn', `ignored: ${evil}`);
  }
});

test('Mistake Revision per task is a view over the stored history: nothing is changed, the other task is not mixed in', () => {
  const rec = (task: 1 | 2, category: string) => ({ at: '2026-01-01T00:00:00.000Z', task, source: 'local' as const, category, quote: 'q', fix: 'f', why: 'w' });
  const progress: WritingStudioProgress = { ...empty, mistakes: [rec(1, 'Overview'), rec(1, 'Overview'), rec(2, 'Thesis'), rec(1, 'Tense')] };
  const before = JSON.stringify(progress);
  const t1 = deriveMistakeCategories(progressForTask(progress, 'task1'), { task1: TASK1_MODULES, task2: TASK2_MODULES });
  const t2 = deriveMistakeCategories(progressForTask(progress, 'task2'), { task1: TASK1_MODULES, task2: TASK2_MODULES });
  assert.deepEqual(t1.map((c) => c.label).sort(), ['Overview (Task 1)', 'Tense (Task 1)']);
  assert.deepEqual(t2.map((c) => c.label), ['Thesis (Task 2)']);
  assert.equal(t1.find((c) => c.label.startsWith('Overview'))!.occurrences, 2);
  assert.equal(JSON.stringify(progress), before, 'the stored history is untouched');
  assert.equal(deriveMistakeCategories(progress, { task1: TASK1_MODULES, task2: TASK2_MODULES }).length, 3, 'the combined Progress page still shows both tasks');
});

console.log(`\n${passed} passed`);
