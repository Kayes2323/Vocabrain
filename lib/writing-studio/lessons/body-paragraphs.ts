import { CHART_DATASETS } from '../charts';
import type { Lesson } from '../types';

/**
 * Task 1 Academy — Module 5 ("Body Paragraph Development"). Teaches grouping
 * data logically, making real comparisons instead of a flat list, and
 * choosing which figures actually matter — then hands the student to the
 * Chart Analysis Board before they write one body paragraph.
 */
export const bodyParagraphsLesson: Lesson = {
  id: 'body-paragraphs',
  task: 'task1',
  moduleId: 'task1-m5',
  title: 'Grouping Data and Making Comparisons',
  objective: 'Group chart data logically and make real comparisons between figures, instead of listing every number in order.',
  estMinutes: 16,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: "Today's goal",
      trainerMessage:
        "Hi, Mino here. Your overview names the big picture — body paragraphs are where the detail lives. Today we'll work on grouping that detail sensibly and comparing it properly, instead of just reading the chart out loud in sentence form.",
    },
    {
      id: 'explain',
      kind: 'explain',
      title: 'Group first, then compare',
      trainerMessage:
        'Before you write a single sentence, decide how to group the data: by category (countries, methods, age groups), by time period (early years vs. later years), or by behaviour (things that rose together, things that stayed flat). Then compare within and across groups instead of marching through the numbers in the order they appear.',
      material: {
        type: 'text',
        paragraphs: [
          "A flat list reads like this: 'Country A was 14%. Country B was 6%. Country C was 9%.' That is just the chart in words — no grouping, no comparison, no real analysis.",
          "A grouped, comparative version picks out a relationship: 'Country A started well ahead of the other two and more than doubled its figure by the end of the period, while Country B and Country C grew far more slowly and stayed close to each other throughout.' That sentence groups B and C together, compares them to A, and uses a precise comparison word ('more than doubled') instead of just stating two figures.",
          "You rarely need every number from the chart. Pick the 3-4 figures that support the comparison you are making, and leave the rest out — examiners reward selection and comparison, not completeness.",
        ],
      },
    },
    {
      id: 'demonstrate',
      kind: 'demonstrate',
      title: 'List vs. grouped comparison',
      trainerMessage: 'Same chart, same data — read both and notice what changed, not just the wording.',
      material: {
        type: 'examples',
        weak:
          'In 2000, Denmark was 14%, Country B was 6% and Country C was 9%. In 2005, Denmark was 21%, Country B was 8% and Country C was 10%. In 2010, Denmark was 33%, Country B was 12% and Country C was 11%.',
        good:
          "Denmark's share rose steadily throughout the period, climbing from 14% in 2000 to 33% by 2010 and reaching 62% by 2020 — more than four times its starting figure. Country B and Country C, by contrast, grew far more gradually and remained within a few percentage points of each other until around 2015, after which Country B's growth accelerated while Country C's levelled off at a little over 10%.",
        note: 'The weak version is a list — three figures per sentence, no relationship between them. The good version groups Denmark separately, compares B and C to each other, and uses precise comparison language ("more than four times", "within a few percentage points", "accelerated") instead of restating every value.',
      },
    },
    {
      id: 'check',
      kind: 'check',
      title: 'Quick check',
      trainerMessage: 'One quick question before we practise.',
      check: {
        prompt: 'Which sentence shows the strongest grouping and comparison, rather than a list of figures?',
        options: [
          'In 2000 the value was 14%, in 2005 it was 21%, and in 2010 it was 33%.',
          'Unlike the other two countries, which grew slowly and stayed close together, Denmark pulled steadily ahead throughout the period.',
          'The chart shows the percentage of renewable electricity in three countries from 2000 to 2020.',
          'Country B was 6% in 2000, 8% in 2005, 12% in 2010, 18% in 2015 and 27% in 2020.',
        ],
        correctIndex: 1,
        explain: 'Only this sentence groups two countries together and compares them to the third, using comparison language ("unlike", "stayed close together", "pulled steadily ahead") rather than simply restating figures in sequence.',
      },
    },
    {
      id: 'guided',
      kind: 'guided',
      title: 'Find the groups and comparisons',
      trainerMessage:
        "Let's work through this chart again, but this time focused on body-paragraph material: which countries behave alike, and which comparisons are worth making. I'll check each answer as you go.",
      material: {
        type: 'chart-board',
        dataset: CHART_DATASETS['renewable-electricity'],
        tasks: [
          { id: 'group', order: 1, prompt: 'Which two countries behave most similarly to each other, and which one stands apart?', modelAnswer: 'Country B and Country C grow at broadly similar, moderate rates; Denmark stands apart with much faster growth.', belongsIn: 'body' },
          { id: 'ratio', order: 2, prompt: "Compare Denmark's 2020 figure to its 2000 figure using a precise ratio or multiple.", modelAnswer: "Denmark's 2020 figure (62%) is more than four times its 2000 figure (14%).", belongsIn: 'body' },
          { id: 'gap', order: 3, prompt: 'How does the gap between Country B and Country C change between 2000 and 2020?', modelAnswer: 'The gap widens from 3 points in 2000 (9% vs 6%) to 11 points in 2020 (27% vs 16%), as Country B overtakes Country C and pulls ahead.', belongsIn: 'body' },
        ],
      },
    },
    {
      id: 'review',
      kind: 'review',
      title: 'Before you write',
      trainerMessage:
        'You now have a grouping (Denmark vs. the other two) and two precise comparisons (a multiple, and a widening gap). Write ONE body paragraph using this material — not a whole response, and not the overview.',
    },
  ],
  finalPrompt: {
    title: 'Write one body paragraph',
    instructions:
      'Using the grouping and comparisons from the Chart Analysis Board, write one well-developed body paragraph (not a full response, and not the overview) that groups the data logically and makes at least one precise comparison.',
    minWords: 70,
    chartId: 'renewable-electricity',
  },
};
