import type { Lesson } from '../types';

/**
 * Task 1 Academy — Module 4 ("Overview Mastery"), the example lesson the
 * prototype brief asks for. Follows the ten-step teaching loop: intro,
 * explain, demonstrate, check understanding, guided practice (the Chart
 * Analysis Board), then an independent writing task.
 */
export const overviewWritingLesson: Lesson = {
  id: 'overview-writing',
  task: 'task1',
  moduleId: 'task1-m4',
  title: 'Writing a Strong Overview',
  objective: 'Write a clear overview that names the one or two biggest features of a chart, without listing every number.',
  estMinutes: 15,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: "Today's goal",
      trainerMessage:
        "Hi — I'm Mino. Today we're working on the overview: the short paragraph that comes right after your introduction in Task 1. It's worth more than people think, so let's get it right.",
    },
    {
      id: 'explain',
      kind: 'explain',
      title: 'What an overview actually is',
      trainerMessage:
        'An overview stands back from the detail and names the one or two biggest patterns in the chart — the overall trend, the highest and lowest points, or the clearest comparison. It never repeats every number; that belongs in your body paragraphs.',
      material: {
        type: 'text',
        paragraphs: [
          'Examiners look for the overview first, separate from the introduction and body. A response with no overview is capped for Task Achievement, however good the detail is.',
          'A strong overview usually does two things: it states the general direction (rising, falling, stable, mixed), and it picks out whatever is most striking — the biggest number, the biggest change, or the clearest difference between categories.',
        ],
      },
    },
    {
      id: 'demonstrate',
      kind: 'demonstrate',
      title: 'Good overview vs. weak overview',
      trainerMessage: 'Here are two overviews for the same chart. Read both before you decide which is which.',
      material: {
        type: 'examples',
        good:
          'Overall, renewable electricity generation rose in all three countries between 2000 and 2020, with Denmark increasing the most dramatically to become the clear leader by the end of the period.',
        weak:
          'In 2000, Denmark was 14%, Country B was 6% and Country C was 9%. In 2005 Denmark was 21%, Country B was 8%... ',
        note: "The weak version just reads off numbers in order — that's a list, not an overview. The good version names the direction and the single biggest feature, with no individual-year data at all.",
      },
    },
    {
      id: 'check',
      kind: 'check',
      title: 'Quick check',
      trainerMessage: 'One quick question before we practise.',
      check: {
        prompt: 'Which of these belongs in an overview rather than a body paragraph?',
        options: [
          'The exact figure for 2015 in each country',
          'The general trend and the single most striking feature',
          'A sentence introducing what the chart shows',
          'A comparison of every pair of years',
        ],
        correctIndex: 1,
        explain: 'The overview is for the big picture only — general direction plus the most striking feature. Individual-year figures and pairwise comparisons belong in the body paragraphs; the "what the chart shows" sentence belongs in the introduction.',
      },
    },
    {
      id: 'guided',
      kind: 'guided',
      title: 'Read the chart before you write',
      trainerMessage:
        "Before writing anything, let's understand this chart properly. Work through the tasks on the board — I'll check each answer as you go.",
      material: {
        type: 'chart-board',
        dataset: {
          id: 'renewable-electricity',
          kind: 'line',
          title: 'Electricity generated from renewable sources in three countries, 2000–2020',
          unit: '% of total electricity generation',
          categories: ['2000', '2005', '2010', '2015', '2020'],
          series: [
            { name: 'Denmark', color: 'var(--chart-1)', values: [14, 21, 33, 48, 62] },
            { name: 'Country B', color: 'var(--chart-2)', values: [6, 8, 12, 18, 27] },
            { name: 'Country C', color: 'var(--chart-3)', values: [9, 10, 11, 13, 16] },
          ],
          note: 'Figures are illustrative, written for this trainer; they are not real national statistics.',
        },
        tasks: [
          { id: 'highest', order: 1, prompt: 'Which country reaches the highest figure, and in which year?', modelAnswer: 'Denmark, in 2020, at 62%.', belongsIn: 'overview' },
          { id: 'lowest', order: 2, prompt: 'Which country starts the lowest, in 2000?', modelAnswer: 'Country B, at 6%.', belongsIn: 'body' },
          { id: 'trend', order: 3, prompt: 'What is the overall trend across all three countries?', modelAnswer: 'All three rose steadily over the whole period.', belongsIn: 'overview' },
          { id: 'compare', order: 4, prompt: 'How does the gap between Denmark and the other two countries change over time?', modelAnswer: 'The gap widens — Denmark pulls further ahead, especially after 2010.', belongsIn: 'overview' },
          { id: 'feature', order: 5, prompt: 'Which single feature is the most striking one to lead your overview with?', modelAnswer: "Denmark's rise to become the clear leader by 2020.", belongsIn: 'overview' },
        ],
      },
    },
    {
      id: 'review',
      kind: 'review',
      title: 'Before you write',
      trainerMessage:
        "Good work. You now have exactly what an overview needs: the general trend, and the one feature worth leading with. Write 2-3 sentences — nothing about individual years from 2005 or 2010, save those for the body paragraphs.",
    },
  ],
  finalPrompt: {
    title: 'Write your overview',
    instructions:
      'Using what you identified on the Chart Analysis Board, write a 2–3 sentence overview for this chart. Do not include individual-year figures — save those for body paragraphs.',
    minWords: 40,
    chartId: 'renewable-electricity',
  },
};
