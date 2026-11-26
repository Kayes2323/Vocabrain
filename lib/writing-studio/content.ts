import type { ExamTaskContent, ModuleSummary, VisualTrainingArea } from './types';

/**
 * Task 1 Academy curriculum: seven modules, numbered 1-7 (the seven
 * visual-specific training areas are listed separately below). Module 7
 * ("Complete Task 1 Writing") is the capstone and points at the
 * 'task1-complete-writing' lesson. The earlier capstone lesson
 * 'task1-full-practice' is still registered in the lesson registry so existing
 * progress records and direct links keep working, but it no longer has an
 * Academy card.
 */
export const TASK1_MODULES: ModuleSummary[] = [
  {
    id: 'task1-m1',
    number: 1,
    title: { en: 'Understanding IELTS Writing Task 1', bn: 'IELTS Writing Task 1 বোঝা' },
    description: {
      en: 'What Task 1 asks for, Task Achievement, and the basic response structure.',
      bn: 'Task 1 আসলে কী চায়, Task Achievement কী, আর response-এর basic structure কেমন হয়।',
    },
    builtLessonId: 'task1-understanding',
  },
  {
    id: 'task1-m2',
    number: 2,
    title: { en: 'Understanding Visual Information', bn: 'Visual Information বোঝা' },
    description: {
      en: 'Reading line graphs, bar charts, pie charts, tables, maps and process diagrams.',
      bn: 'Line graph, bar chart, pie chart, table, map আর process diagram পড়তে শেখা।',
    },
    builtLessonId: 'visual-information',
  },
  {
    id: 'task1-m3',
    number: 3,
    title: { en: 'Introduction Writing', bn: 'Introduction লেখা' },
    description: {
      en: 'Paraphrasing the question and writing a clear, accurate introduction.',
      bn: 'প্রশ্নটা নিজের ভাষায় paraphrase করা আর একটা স্পষ্ট, সঠিক introduction লেখা।',
    },
    builtLessonId: 'task1-introduction',
  },
  {
    id: 'task1-m4',
    number: 4,
    title: { en: 'Overview Mastery', bn: 'Overview-তে দক্ষতা' },
    description: {
      en: 'Identifying the main trends and writing a strong, focused overview.',
      bn: 'মূল trend-গুলো চিহ্নিত করা আর একটা জোরালো, focused overview লেখা।',
    },
    builtLessonId: 'overview-writing',
  },
  {
    id: 'task1-m5',
    number: 5,
    title: { en: 'Body Paragraph Development', bn: 'Body Paragraph তৈরি করা' },
    description: {
      en: 'Grouping data, making comparisons, and reporting figures with purpose.',
      bn: 'তথ্য group করা, comparison করা, আর উদ্দেশ্য অনুযায়ী figure উল্লেখ করা।',
    },
    builtLessonId: 'body-paragraphs',
  },
  {
    id: 'task1-m6',
    number: 6,
    title: { en: 'Vocabulary and Grammar for Task 1', bn: 'Task 1-এর জন্য Vocabulary আর Grammar' },
    description: {
      en: 'Trend language, comparison language, tense choice and sentence variety.',
      bn: 'Trend-এর ভাষা, comparison-এর ভাষা, tense বেছে নেওয়া আর বাক্যে বৈচিত্র্য।',
    },
    builtLessonId: 'task1-vocab-grammar',
  },
  {
    id: 'task1-m7',
    number: 7,
    title: { en: 'Complete Task 1 Writing', bn: 'সম্পূর্ণ Task 1 লেখা' },
    description: {
      en: 'Combine analysis, an accurate introduction, an overview, body paragraphs and precise language into one complete, coherent response.',
      bn: 'Analysis, সঠিক introduction, overview, body paragraph আর নির্ভুল ভাষা — সবকিছু মিলিয়ে একটা সম্পূর্ণ, সুসংগত response তৈরি করা।',
    },
    builtLessonId: 'task1-complete-writing',
  },
];

export const TASK1_VISUALS: VisualTrainingArea[] = [
  { id: 'line-graphs', title: 'Line Graphs', description: 'Trends over time, rate of change, and crossing lines.', builtLessonId: 'line-graph-mastery', courseLessonId: 'line-graph-mastery' },
  { id: 'bar-charts', title: 'Bar Charts', description: 'Comparing categories at one or more points in time.' },
  { id: 'pie-charts', title: 'Pie Charts', description: 'Proportions, the largest/smallest share, and changes between two charts.' },
  { id: 'tables', title: 'Tables', description: 'Selecting what matters from a dense grid of numbers.' },
  { id: 'mixed-charts', title: 'Mixed Charts', description: 'Combining two chart types that describe the same topic.' },
  { id: 'maps', title: 'Maps', description: 'Describing change between two versions of the same place.' },
  { id: 'process-diagrams', title: 'Process Diagrams', description: 'Describing stages, sequence language, and passive voice.' },
];

/** Task 2 Academy curriculum (spec §7, Modules 1–9). */
export const TASK2_MODULES: ModuleSummary[] = [
  { id: 'task2-m1', number: 1, title: 'Understanding IELTS Writing Task 2', description: 'Essay structure and the four assessment criteria.', builtLessonId: 'task2-understanding' },
  { id: 'task2-m2', number: 2, title: 'Understanding Question Types', description: 'Agree/Disagree, Discuss Both Views, Advantages/Disadvantages, Problem/Solution and more.', builtLessonId: 'question-types' },
  { id: 'task2-m3', number: 3, title: 'Question Analysis', description: 'Finding the topic, the exact requirement, and avoiding off-topic answers.', builtLessonId: 'question-analysis' },
  { id: 'task2-m4', number: 4, title: 'Idea Generation', description: 'Generating, selecting and testing ideas before you start writing.', builtLessonId: 'idea-generation' },
  { id: 'task2-m5', number: 5, title: 'Paragraph Development', description: 'The IDEA → EXPLANATION → EXAMPLE → RESULT framework.', builtLessonId: 'idea-development' },
  { id: 'task2-m6', number: 6, title: 'Introduction and Conclusion', description: 'Paraphrasing, thesis statements, and a conclusion that matches your position.', builtLessonId: 'intro-conclusion' },
  { id: 'task2-m7', number: 7, title: 'Vocabulary and Grammar', description: 'Academic vocabulary, paraphrasing, complex sentences and cohesive devices.', builtLessonId: 'task2-vocab-grammar' },
  { id: 'task2-m8', number: 8, title: 'Full Essay Writing', description: 'Combining every part into a complete, timed essay.', builtLessonId: 'task2-full-practice' },
  { id: 'task2-m9', number: 9, title: 'High-Level Writing Performance', description: 'Argument depth, precision and accuracy for Band 7–8 as a learning goal.', builtLessonId: 'high-level-writing' },
];

export const EXAM_CONTENT: Record<'task1' | 'task2', ExamTaskContent> = {
  task1: {
    task: 'task1',
    title: 'Writing Task 1',
    instructions: 'You should spend about 20 minutes on this task. Write at least 150 words.',
    prompt:
      'The chart below shows the main method of travelling to work in one city in 2010 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    minWords: 150,
    minutes: 20,
    chartId: 'commute-methods',
  },
  task2: {
    task: 'task2',
    title: 'Writing Task 2',
    instructions: 'You should spend about 40 minutes on this task. Write at least 250 words.',
    prompt:
      'Some people believe that saving money is essential for young people, while others think that young people should be free to spend their income as they wish. Discuss both views and give your own opinion.',
    minWords: 250,
    minutes: 40,
  },
};
