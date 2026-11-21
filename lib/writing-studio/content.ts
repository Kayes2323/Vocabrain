import type { AcademyStats, ExamTaskContent, ModuleSummary, MistakeCategory, TaskId, VisualTrainingArea } from './types';

/**
 * Task 1 Academy curriculum (spec §6, Modules 1–6 + 8; Module 7's seven
 * visual types are listed separately below). Only "Overview Mastery"
 * carries a fully built lesson in this prototype; every other module opens
 * a labelled content-preview screen that explains what the finished lesson
 * will contain and links to the one that is built, so nothing is a dead
 * button.
 */
export const TASK1_MODULES: ModuleSummary[] = [
  { id: 'task1-m1', number: 1, title: 'Understanding IELTS Writing Task 1', description: 'What Task 1 asks for, Task Achievement, and the basic response structure.', lessonsTotal: 4, lessonsDone: 4 },
  { id: 'task1-m2', number: 2, title: 'Understanding Visual Information', description: 'Reading line graphs, bar charts, pie charts, tables, maps and process diagrams.', lessonsTotal: 6, lessonsDone: 3 },
  { id: 'task1-m3', number: 3, title: 'Introduction Writing', description: 'Paraphrasing the question and writing a clear, accurate introduction.', lessonsTotal: 3, lessonsDone: 3 },
  { id: 'task1-m4', number: 4, title: 'Overview Mastery', description: 'Identifying the main trends and writing a strong, focused overview.', lessonsTotal: 5, lessonsDone: 1, builtLessonId: 'overview-writing' },
  { id: 'task1-m5', number: 5, title: 'Body Paragraph Development', description: 'Grouping data, making comparisons, and reporting figures with purpose.', lessonsTotal: 5, lessonsDone: 0 },
  { id: 'task1-m6', number: 6, title: 'Vocabulary and Grammar for Task 1', description: 'Trend language, comparison language, tense choice and sentence variety.', lessonsTotal: 6, lessonsDone: 2 },
  { id: 'task1-m8', number: 8, title: 'Complete Task 1 Writing', description: 'Guided, independent and timed practice producing a full response.', lessonsTotal: 4, lessonsDone: 0 },
];

export const TASK1_VISUALS: VisualTrainingArea[] = [
  { id: 'line-graphs', title: 'Line Graphs', description: 'Trends over time, rate of change, and crossing lines.', builtLessonId: 'overview-writing' },
  { id: 'bar-charts', title: 'Bar Charts', description: 'Comparing categories at one or more points in time.' },
  { id: 'pie-charts', title: 'Pie Charts', description: 'Proportions, the largest/smallest share, and changes between two charts.' },
  { id: 'tables', title: 'Tables', description: 'Selecting what matters from a dense grid of numbers.' },
  { id: 'mixed-charts', title: 'Mixed Charts', description: 'Combining two chart types that describe the same topic.' },
  { id: 'maps', title: 'Maps', description: 'Describing change between two versions of the same place.' },
  { id: 'process-diagrams', title: 'Process Diagrams', description: 'Describing stages, sequence language, and passive voice.' },
];

/** Task 2 Academy curriculum (spec §7, Modules 1–9). */
export const TASK2_MODULES: ModuleSummary[] = [
  { id: 'task2-m1', number: 1, title: 'Understanding IELTS Writing Task 2', description: 'Essay structure and the four assessment criteria.', lessonsTotal: 4, lessonsDone: 4 },
  { id: 'task2-m2', number: 2, title: 'Understanding Question Types', description: 'Agree/Disagree, Discuss Both Views, Advantages/Disadvantages, Problem/Solution and more.', lessonsTotal: 5, lessonsDone: 3 },
  { id: 'task2-m3', number: 3, title: 'Question Analysis', description: 'Finding the topic, the exact requirement, and avoiding off-topic answers.', lessonsTotal: 3, lessonsDone: 2 },
  { id: 'task2-m4', number: 4, title: 'Idea Generation', description: 'Generating, selecting and testing ideas before you start writing.', lessonsTotal: 4, lessonsDone: 1 },
  { id: 'task2-m5', number: 5, title: 'Paragraph Development', description: 'The IDEA → EXPLANATION → EXAMPLE → RESULT framework.', lessonsTotal: 5, lessonsDone: 1, builtLessonId: 'idea-development' },
  { id: 'task2-m6', number: 6, title: 'Introduction and Conclusion', description: 'Paraphrasing, thesis statements, and a conclusion that matches your position.', lessonsTotal: 4, lessonsDone: 0 },
  { id: 'task2-m7', number: 7, title: 'Vocabulary and Grammar', description: 'Academic vocabulary, paraphrasing, complex sentences and cohesive devices.', lessonsTotal: 6, lessonsDone: 2 },
  { id: 'task2-m8', number: 8, title: 'Full Essay Writing', description: 'Combining every part into a complete, timed essay.', lessonsTotal: 4, lessonsDone: 0 },
  { id: 'task2-m9', number: 9, title: 'High-Level Writing Performance', description: 'Argument depth, precision and accuracy for Band 7–8 as a learning goal.', lessonsTotal: 4, lessonsDone: 0 },
];

export const ACADEMY_STATS: Record<TaskId, AcademyStats> = {
  task1: { task: 'task1', modulesTotal: TASK1_MODULES.length, lessonsCompleted: TASK1_MODULES.reduce((n, m) => n + m.lessonsDone, 0), lessonsTotal: TASK1_MODULES.reduce((n, m) => n + m.lessonsTotal, 0), practiceSessions: 9, mockTestsTaken: 2, currentLevel: 2, focusAreas: ['Overview writing', 'Comparing categories'] },
  task2: { task: 'task2', modulesTotal: TASK2_MODULES.length, lessonsCompleted: TASK2_MODULES.reduce((n, m) => n + m.lessonsDone, 0), lessonsTotal: TASK2_MODULES.reduce((n, m) => n + m.lessonsTotal, 0), practiceSessions: 6, mockTestsTaken: 1, currentLevel: 2, focusAreas: ['Idea development', 'Linking words'] },
};

/** Mock error-memory data for the Progress & Mistake Revision screen (spec §12). Sample values for the prototype only. */
export const MISTAKE_CATEGORIES: MistakeCategory[] = [
  {
    id: 'subject-verb',
    label: 'Subject–verb agreement',
    occurrences: 12,
    trend: 'down',
    example: { quote: 'The number of students have increased.', why: '"The number of" takes a singular verb, even though "students" is plural.', fix: 'The number of students has increased.' },
    relatedLessonId: 'overview-writing',
  },
  {
    id: 'articles',
    label: 'Articles (a / an / the)',
    occurrences: 9,
    trend: 'flat',
    example: { quote: 'Government should invest in education.', why: 'A general statement about governments in general needs no article, but a specific one often needs "The government".', fix: 'The government should invest in education.' },
  },
  {
    id: 'tense',
    label: 'Tense consistency',
    occurrences: 6,
    trend: 'down',
    example: { quote: 'In 2010, the figure increases sharply.', why: 'Task 1 charts describing the past need the past tense throughout.', fix: 'In 2010, the figure increased sharply.' },
    relatedLessonId: 'overview-writing',
  },
  {
    id: 'prepositions',
    label: 'Prepositions',
    occurrences: 5,
    trend: 'up',
    example: { quote: 'This is depend on the economy.', why: '"Depend" is followed by "on" directly, with no "is" before it.', fix: 'This depends on the economy.' },
  },
  {
    id: 'repeated-ideas',
    label: 'Repeated ideas',
    occurrences: 4,
    trend: 'down',
    example: { quote: 'Saving money helps in emergencies. It also helps when something unexpected happens.', why: 'The second sentence restates the first instead of developing it further.', fix: 'Replace the second sentence with an explanation, example or result.', },
    relatedLessonId: 'idea-development',
  },
];

export const PROGRESS_TREND = [
  { label: '4 weeks ago', band: 5.5 },
  { label: '3 weeks ago', band: 5.5 },
  { label: '2 weeks ago', band: 6.0 },
  { label: 'Last week', band: 6.0 },
  { label: 'This week', band: 6.5 },
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
