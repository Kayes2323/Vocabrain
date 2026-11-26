/**
 * Wording of the Writing Studio navigation screens (home, task modes, Learn Mode, Visual Information, chart types,
 * Mistake Revision). Every entry is an `L10n` — resolved with `localize(locale, …)` exactly like the lesson content —
 * so the Studio keeps one bilingual mechanism. Lesson, module and chart titles are NOT here: they come from
 * lib/writing-studio/content.ts and the lesson registry.
 */
import type { L10n } from './types';

const t = (en: string, bn: string): L10n => ({ en, bn });

export const WS_COPY = {
  studioTitle: t('Mino Writing Studio', 'Mino Writing Studio'),
  studioSubtitle: t('Choose a task to start.', 'কোন Task নিয়ে কাজ করবেন, বেছে নিন।'),
  home: t('Writing Studio', 'Writing Studio'),
  task1Title: t('Writing Task 1', 'Writing Task 1'),
  task1Blurb: t('Visual information: charts, graphs and report writing.', 'Visual information: chart, graph আর report লেখা।'),
  task2Title: t('Writing Task 2', 'Writing Task 2'),
  task2Blurb: t('Essay writing, idea development and argument structure.', 'Essay লেখা, idea develop করা আর argument সাজানো।'),
  lessonsOf: t('{done} of {total} lessons', '{total}টির মধ্যে {done}টি lesson'),
  resume: t('Continue', 'চালিয়ে যান'),
  resumeLine: t('Continue: {title}', 'চালিয়ে যান: {title}'),

  // Level 2
  modeLearn: t('Learn Mode', 'Learn Mode'),
  modeLearnSub: t('Step-by-step lessons from Mino', 'Mino-র সাথে ধাপে ধাপে lesson'),
  modePractice: t('Practice Mode', 'Practice Mode'),
  modePracticeSub: t('Interactive exercises with feedback and retry', 'Interactive exercise, feedback আর আবার চেষ্টা'),
  modeExam: t('Exam Simulation', 'Exam Simulation'),
  modeExamSub1: t('Timed Task 1 writing · 20 minutes', 'সময় ধরে Task 1 লেখা · 20 মিনিট'),
  modeExamSub2: t('Timed Task 2 essay · 40 minutes', 'সময় ধরে Task 2 essay · 40 মিনিট'),
  modeMistakes: t('Mistake Revision', 'Mistake Revision'),
  modeMistakesSub: t('Practise from your own recorded mistakes', 'আপনার নিজের ভুল থেকে practice'),
  summaryLessons: t('Lessons', 'Lesson'),
  summaryPractice: t('Practice', 'Practice'),
  summaryLevel: t('Level', 'Level'),
  viewProgress: t('View full progress', 'পুরো progress দেখুন'),

  // Level 3: Learn Mode
  learnTitle: t('Learn Mode', 'Learn Mode'),
  learnSubtitle: t('{n} modules, one step at a time.', '{n}টি module, এক ধাপ করে।'),
  continueTitle: t('Continue where you left off', 'যেখান থেকে থেমেছিলেন, সেখান থেকে চালিয়ে যান'),
  statusNotStarted: t('Not started', 'শুরু হয়নি'),
  statusInProgress: t('In progress', 'চলছে'),
  statusCompleted: t('Completed', 'সম্পন্ন'),
  actionStart: t('Start', 'শুরু করুন'),
  actionContinue: t('Continue', 'চালিয়ে যান'),
  actionRevisit: t('Revisit', 'আবার দেখুন'),
  moduleN: t('Module {n}', 'Module {n}'),

  // Visual Information hub
  visualTitle: t('Visual Information', 'Visual Information'),
  visualSubtitle: t('Read the lecture first, then train chart by chart.', 'আগে lecture পড়ুন, তারপর chart ধরে ধরে training করুন।'),
  coreLecture: t('Core lecture', 'মূল lecture'),
  coreSteps: t('{n} teaching steps', '{n}টি teaching step'),
  chartTraining: t('Chart-type training', 'Chart অনুযায়ী training'),
  chartTrainingNote: t('Each chart type has its own area. Courses are added one by one.', 'প্রতিটি chart type-এর নিজস্ব জায়গা আছে। Course একটা একটা করে যোগ হচ্ছে।'),
  chartPreview: t('Preview', 'Preview'),
  chartCourse: t('Course', 'Course'),

  // Chart-type screen
  chartPreviewTitle: t('Preview — course coming soon', 'Preview — course শীঘ্রই আসছে'),
  chartPreviewBody: t('This chart type does not have its own lessons yet. Nothing on this screen is a finished course.', 'এই chart type-এর নিজস্ব lesson এখনো তৈরি হয়নি। এই screen-এ কোনো সম্পূর্ণ course নেই।'),
  chartReadLecture: t('Read the core lecture first', 'আগে মূল lecture পড়ুন'),
  chartStartCourse: t('Start this course', 'এই course শুরু করুন'),
  chartBack: t('Visual Information', 'Visual Information'),

  // Mistake Revision
  mistakesTitle: t('Mistake Revision', 'Mistake Revision'),
  mistakesSubtitle: t('Built from the mistakes Mino recorded in your Task {n} writing.', 'আপনার Task {n} লেখায় Mino যে ভুলগুলো ধরেছে, সেগুলো থেকে তৈরি।'),
  mistakesEmpty: t('Nothing recorded for this task yet. Finish a lesson, a practice board or a timed test and your mistakes will appear here.', 'এই Task-এ এখনো কোনো ভুল জমা হয়নি। একটা lesson, practice board বা timed test শেষ করলে এখানে ভুলগুলো দেখা যাবে।'),
  mistakesCount: t('{n} recorded', '{n}টি জমা হয়েছে'),
  practiseAgain: t('Practise this again', 'এটা আবার practice করুন'),
  back: t('Back', 'ফিরে যান'),
} satisfies Record<string, L10n>;

export type WsCopyKey = keyof typeof WS_COPY;

/** Resolves a copy entry for a locale, filling `{placeholders}`. */
export function wsText(locale: 'en' | 'bn', key: WsCopyKey, vars?: Record<string, string | number>): string {
  const raw = WS_COPY[key];
  const text = typeof raw === 'string' ? raw : raw[locale];
  return vars ? text.replace(/\{(\w+)\}/g, (m, k: string) => (vars[k] === undefined ? m : String(vars[k]))) : text;
}
