import type { ExamTaskContent, ModuleSummary, VisualTrainingArea } from './types';

/**
 * Task 1 Academy curriculum (spec §6, Modules 1–6 + 8; Module 7's seven
 * visual types are listed separately below). Only "Overview Mastery"
 * carries a fully built lesson in this prototype; every other module opens
 * a labelled content-preview screen that explains what the finished lesson
 * will contain and links to the one that is built, so nothing is a dead
 * button.
 */
export const TASK1_MODULES: ModuleSummary[] = [
  { id: 'task1-m1', number: 1, title: 'Understanding IELTS Writing Task 1', description: 'What Task 1 asks for, Task Achievement, and the basic response structure.', builtLessonId: 'task1-understanding' },
  { id: 'task1-m2', number: 2, title: 'Understanding Visual Information', description: 'Reading line graphs, bar charts, pie charts, tables, maps and process diagrams.', builtLessonId: 'visual-information' },
  { id: 'task1-m3', number: 3, title: 'Introduction Writing', description: 'Paraphrasing the question and writing a clear, accurate introduction.', builtLessonId: 'task1-introduction' },
  { id: 'task1-m4', number: 4, title: 'Overview Mastery', description: 'Identifying the main trends and writing a strong, focused overview.', builtLessonId: 'overview-writing' },
  { id: 'task1-m5', number: 5, title: 'Body Paragraph Development', description: 'Grouping data, making comparisons, and reporting figures with purpose.', builtLessonId: 'body-paragraphs' },
  { id: 'task1-m6', number: 6, title: 'Vocabulary and Grammar for Task 1', description: 'Trend language, comparison language, tense choice and sentence variety.', builtLessonId: 'task1-vocab-grammar' },
  { id: 'task1-m8', number: 8, title: 'Complete Task 1 Writing', description: 'Guided, independent and timed practice producing a full response.', builtLessonId: 'task1-full-practice' },
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
