import type { Lesson } from '../types';
import { CHART_DATASETS } from '../charts';

/**
 * Task 1 Academy — Module 2 ("Understanding Visual Information"). Teaches
 * the habit of reading a chart properly — units, period/categories, overall
 * direction, most striking feature — before writing a single sentence.
 */
export const visualInformationLesson: Lesson = {
  id: 'visual-information',
  task: 'task1',
  moduleId: 'task1-m2',
  title: 'Reading a Chart Before You Write',
  objective: 'Read any chart quickly and correctly: units, time period or categories, overall direction, and the single most striking feature.',
  estMinutes: 14,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: "Today's goal",
      trainerMessage:
        "Hi, it's Mino. Today isn't about writing at all — it's about reading. Students who skip this step often misread the chart and lose marks for Task Achievement before they've written a word.",
    },
    {
      id: 'explain',
      kind: 'explain',
      title: 'Four questions, in order',
      trainerMessage:
        'Before writing anything, answer four questions in this order: What are the units? What time period or categories are shown? What is the overall direction? What is the single most striking feature?',
      material: {
        type: 'text',
        paragraphs: [
          'Units matter because mixing up percentages with absolute numbers, or minutes with hours, is an easy way to misreport the data entirely.',
          'The time period or category list tells you what you are comparing — years, cities, methods, age groups. Only once you know the units and the categories should you look for the overall direction (rising, falling, stable, mixed) and the one feature worth leading with.',
        ],
      },
    },
    {
      id: 'demonstrate',
      kind: 'demonstrate',
      title: 'Careful reading vs. careless reading',
      trainerMessage: 'Same chart, two different readings. One of them skipped a step.',
      material: {
        type: 'examples',
        good:
          'This bar chart shows the percentage of commuters using five methods of travel in 2010 and 2023. Car use fell noticeably, while cycling rose more than any other method.',
        weak:
          'This chart shows that more people used cars in 2023, which went up a lot from 2010.',
        note: "The weak reading gets the direction backwards (car use actually fell) because it guessed instead of checking the units and figures carefully. Always check the actual numbers before describing direction.",
      },
    },
    {
      id: 'check',
      kind: 'check',
      title: 'Quick check',
      trainerMessage: 'One quick question before we practise.',
      check: {
        prompt: 'What should you check first, before deciding on the overall direction of a chart?',
        options: [
          'Which vocabulary sounds the most impressive',
          'The units and the time period or categories shown',
          'What you personally think about the topic',
          'How many words you have written so far',
        ],
        correctIndex: 1,
        explain: 'Units and categories come first — without them, "direction" is a guess. Only once you know what is being measured and over what period can you read the trend correctly.',
      },
    },
    {
      id: 'guided',
      kind: 'guided',
      title: 'Read this chart properly',
      trainerMessage:
        "Let's work through the four questions on this chart together. I'll check each answer before you move to the next.",
      material: {
        type: 'chart-board',
        dataset: CHART_DATASETS['commute-methods'],
        tasks: [
          { id: 'units', order: 1, prompt: 'What are the units in this chart, and what two years are being compared?', modelAnswer: 'Percentage of commuters, comparing 2010 and 2023.', belongsIn: 'overview' },
          { id: 'direction-car', order: 2, prompt: 'What happened to car use between 2010 and 2023?', modelAnswer: 'It fell, from 52% to 38%.', belongsIn: 'body' },
          { id: 'direction-bicycle', order: 3, prompt: 'Which method saw the largest relative increase?', modelAnswer: 'Bicycle use, which more than tripled from 6% to 19%.', belongsIn: 'body' },
          { id: 'feature', order: 4, prompt: 'If you could only mention one feature, which is the most striking?', modelAnswer: 'Car use remained the most common method overall, but fell sharply as cycling rose to close the gap.', belongsIn: 'overview' },
        ],
      },
    },
    {
      id: 'review',
      kind: 'review',
      title: 'Before you write',
      trainerMessage:
        "You now have the units, the comparison, the overall direction and the single most striking feature. That is everything a strong overview needs — nothing more.",
    },
  ],
  finalPrompt: {
    title: 'Summarise the most striking feature',
    instructions:
      'In 2–3 sentences, summarise only the single most striking feature of this chart — not a full overview, just that one feature, stated clearly with the correct units and years.',
    minWords: 50,
    chartId: 'commute-methods',
  },
};
