// Bar Chart Mastery — Cambridge IELTS 12 Academic, Test 1, Writing Task 1.
// This is a real exam chart, not an invented one: Mino training data for
// every other Visual-Specific Training course is original and illustrative,
// but this course's whole premise (Part A of its spec) is an authentic
// published source, so the figures below are the dataset given by the
// product owner and cross-checked against accessible transcriptions of the
// Cambridge chart — not a substitute, paraphrase or AI-generated chart.
//
// Content-integrity rules the owner set for this course (do not relax these
// when adding content later): this is the ONLY chart dataset for the course;
// never invent a second Cambridge-attributed chart; never replace the chart
// with a generated illustration; every displayed value must be traceable to
// this dataset; the literal original Cambridge task-prompt wording is NOT
// reproduced here (it was never supplied to this implementation), so the
// final task's instructions below are Mino's own standard Task 1 phrasing,
// not a quoted Cambridge question.

import type { ChartBoardTask, ChartDataset } from './types';

export const CAMBRIDGE_12_T1_PHYSICAL_ACTIVITY: ChartDataset = {
  id: 'cambridge-12-t1-physical-activity',
  kind: 'bar',
  title: 'Percentage of Australian men and women doing regular physical activity: 2010',
  unit: '%',
  categories: ['15 to 24', '25 to 34', '35 to 44', '45 to 54', '55 to 64', '65 and over'],
  series: [
    { name: 'Male', color: 'var(--chart-1)', values: [52.8, 42.2, 39.5, 43.1, 45.1, 46.7] },
    { name: 'Female', color: 'var(--chart-2)', values: [47.7, 48.9, 52.5, 53.3, 53.0, 47.1] },
  ],
  note: 'Source: Cambridge IELTS 12 Academic, Test 1, Writing Task 1 (one year, 2010 — a static comparison, not a time series).',
};

// ---------------------------------------------------------------- guided questions
// One flat, ordered sequence for the whole course (the lesson splits them
// across steps by slicing this array — there is only ever this one
// question bank, so a fact is never asked about, or answered, twice with
// different wording).

export const BAR_CHART_GUIDED_TASKS: ChartBoardTask[] = [
  {
    id: 'bc-q1-highest-male', order: 1,
    prompt: 'Which age group recorded the highest percentage of male participation?',
    modelAnswer: 'Male participation was highest among those aged 15–24, at 52.8%.',
    acceptableAlternatives: ['15–24', 'The 15–24 age group.', 'Men aged 15–24.', '15–24-year-old men.', '১৫–২৪ বছর বয়সী পুরুষেরা।'],
    belongsIn: 'body',
  },
  {
    id: 'bc-q2-lowest-male', order: 2,
    prompt: 'Which age group had the lowest male participation rate?',
    modelAnswer: 'The lowest figure for men was recorded in the 35–44 age group, at 39.5%.',
    acceptableAlternatives: ['35–44', 'The 35–44 age group.', 'Men aged 35 to 44.', '৩৫–৪৪ বছর বয়সী পুরুষেরা।'],
    belongsIn: 'body',
  },
  {
    id: 'bc-q3-highest-female', order: 3,
    prompt: 'At what age did female participation reach its highest level?',
    modelAnswer: 'Female participation peaked at 53.3% among those aged 45–54.',
    acceptableAlternatives: ['45–54', 'Women aged 45–54.', '53.3% among women aged 45–54.', '৪৫–৫৪ বছর বয়সীদের মধ্যে।'],
    belongsIn: 'body',
  },
  {
    id: 'bc-q4-lowest-female', order: 4,
    prompt: 'Which age group had the lowest female participation rate?',
    modelAnswer: 'The lowest female figure was 47.1%, among those aged 65 and over.',
    acceptableAlternatives: ['65 and over', 'Women aged 65 and over.', 'The oldest age group.', '৬৫ বা তার বেশি বয়সী নারীরা।'],
    belongsIn: 'body',
  },
  {
    id: 'bc-q5-gender-count', order: 5,
    prompt: 'In how many age groups was female participation higher than male participation?',
    modelAnswer: 'Women recorded higher participation rates in five of the six age categories.',
    acceptableAlternatives: ['Five.', '5 out of 6.', 'All except the youngest age group.', 'পাঁচটি age group-এ।'],
    evaluationCriteria: ['Correctly identifies that 15–24 is the one exception, not just the count'],
    belongsIn: 'overview',
  },
  {
    id: 'bc-q6-only-male-higher', order: 6,
    prompt: 'Which age group was the only one in which the male figure was higher than the female figure?',
    modelAnswer: '15–24 — the only age group where men (52.8%) were ahead of women (47.7%).',
    acceptableAlternatives: ['15–24', 'The youngest age group.', 'Men aged 15–24.'],
    belongsIn: 'overview',
  },
  {
    id: 'bc-q7-largest-gap', order: 7,
    prompt: 'Which age group showed the largest difference between male and female participation, and how large was it?',
    modelAnswer: 'The widest gender gap was in the 35–44 age group: 52.5% − 39.5% = 13 percentage points.',
    acceptableAlternatives: ['35–44, 13 percentage points.', '35 to 44, a 13-point gap.', '35–44 age group-এ, 13 percentage points।'],
    evaluationCriteria: ['States the gap using "percentage points", not "percent" or "%" (a 13-point gap is not a 13% increase)'],
    belongsIn: 'overview',
  },
  {
    id: 'bc-q8-closest', order: 8,
    prompt: 'Which age group had the most similar participation rates for men and women?',
    modelAnswer: '65 and over: 47.1% − 46.7% = a gap of only 0.4 percentage points.',
    acceptableAlternatives: ['65 and over', 'The oldest age group.', 'People aged 65 and over.', 'The 65+ group.'],
    belongsIn: 'overview',
  },
  {
    id: 'bc-q9-overview-features', order: 9,
    prompt: 'Which statement best describes the overall comparison shown in the whole chart?',
    modelAnswer:
      'Overall, women were more physically active than men in five of the six age groups, with the only exception being those aged 15 to 24. The widest gender gap occurred among 35- to 44-year-olds, while the figures were almost identical in the oldest group.',
    acceptableAlternatives: [
      'Women were ahead in most age groups except the youngest; the biggest gap was in the 35–44 group and the smallest in the oldest group.',
    ],
    evaluationCriteria: [
      'Identifies the dominant pattern (women ahead in most groups)',
      'Mentions the 15–24 exception',
      'Mentions the 35–44 group as the largest gap',
      'Does not simply list every individual figure',
    ],
    belongsIn: 'overview',
  },
];

/** Steps 2's five-question quick knowledge check (chart structure, not data values — Part C §Step 02). */
export const BAR_CHART_STRUCTURE_TASKS: ChartBoardTask[] = [
  {
    id: 'bc-s-xaxis', order: 1,
    prompt: 'What does the X-axis represent in this chart?',
    modelAnswer: 'The X-axis shows six age groups, from 15 to 24 up to 65 and over.',
    acceptableAlternatives: ['Six age groups.', 'The different age groups.', 'ছয়টি age group।'],
    belongsIn: 'introduction',
  },
  {
    id: 'bc-s-yaxis', order: 2,
    prompt: 'What does the Y-axis measure, and what is the unit?',
    modelAnswer: 'The Y-axis measures the percentage (%) of people doing regular physical activity, from 0 to 60.',
    acceptableAlternatives: ['Percentage of people doing regular physical activity.', 'Percentage (%).', 'Percentage, একটা ০ থেকে ৬০ scale-এ।'],
    belongsIn: 'introduction',
  },
  {
    id: 'bc-s-series', order: 3,
    prompt: 'How many data series does this chart show, and what are they?',
    modelAnswer: 'Two: Male and Female.',
    acceptableAlternatives: ['Male and Female.', 'দুইটা — Male আর Female।'],
    belongsIn: 'introduction',
  },
  {
    id: 'bc-s-static', order: 4,
    prompt: 'Does this chart show how physical activity changed over several years?',
    modelAnswer: 'No — the chart presents data for 2010 only; it is a static comparison across age groups, not a time series.',
    acceptableAlternatives: ['No, it is only 2010 data.', 'No — একটাই বছর, ২০১০।', 'না, এটা শুধু ২০১০ সালের তথ্য।'],
    evaluationCriteria: ['Clearly says "no" — a "yes" here is a core misunderstanding of the chart, even if everything else in the answer is well written'],
    belongsIn: 'introduction',
  },
];

/**
 * Writing-production checkpoints (Part C §Steps 08-10): unlike every task
 * above, these require an actual English sentence — Mode 2, not a concept
 * check — so each sets `requiredLanguage: 'en'`.
 */
export const BAR_CHART_WRITING_TASKS: ChartBoardTask[] = [
  {
    id: 'bc-w-introduction', order: 1,
    prompt: 'Write your own introduction for this chart (1–2 sentences). Paraphrase — do not copy a model sentence.',
    modelAnswer: 'The bar chart compares the proportions of Australian men and women in six different age groups who engaged in regular physical activity in 2010.',
    requiredLanguage: 'en',
    evaluationCriteria: [
      'Accurately represents the chart topic (physical activity)',
      'Includes both men and women',
      'Includes the location (Australia) and year (2010)',
      'Does not add any data, trend or opinion — that belongs later',
      'Grammatically correct, natural paraphrasing (not a word-for-word copy of the model)',
    ],
    belongsIn: 'introduction',
  },
  {
    id: 'bc-w-overview', order: 2,
    prompt: 'Write a two-sentence overview: the dominant pattern, the exception, and the most significant gap — not every figure.',
    modelAnswer:
      'Overall, women recorded higher levels of physical activity than men in five of the six age groups. Men had a higher figure only among 15- to 24-year-olds, while the largest difference between the sexes was seen in the 35–44 age group.',
    requiredLanguage: 'en',
    evaluationCriteria: [
      'States the dominant pattern (women higher in most groups)',
      'States the 15–24 exception',
      'States the 35–44 group as the largest gap',
      'Does not list every individual figure',
      'Grammatically correct English',
    ],
    belongsIn: 'overview',
  },
  {
    id: 'bc-w-body1', order: 3,
    prompt: 'Body Paragraph 1 — the two youngest age groups (15–24 and 25–34): report the figures and the reversal between them.',
    modelAnswer:
      'Among the youngest participants, men recorded a higher figure, at 52.8%, compared with 47.7% for women. However, the pattern was reversed in the 25–34 age group, where the female proportion stood at 48.9%, against 42.2% for males.',
    requiredLanguage: 'en',
    evaluationCriteria: ['Reports 52.8% and 47.7% for the 15–24 group', 'Reports 48.9% and 42.2% for the 25–34 group', 'Signals the reversal between the two groups (e.g. "however", "by contrast")'],
    belongsIn: 'body',
  },
  {
    id: 'bc-w-body2', order: 4,
    prompt: 'Body Paragraph 2 — the four remaining age groups (35–44 to 65 and over): report the figures and the trend.',
    modelAnswer:
      'Women also had higher participation rates in all the remaining age groups. The most substantial difference occurred among those aged 35–44, with 52.5% of women being active compared with 39.5% of men. Female participation then peaked at 53.3% among 45–54-year-olds, before remaining almost unchanged at 53.0% in the 55–64 group. In the oldest category, the figures were very similar, at 47.1% for women and 46.7% for men.',
    requiredLanguage: 'en',
    evaluationCriteria: [
      'Reports 52.5%/39.5% for 35–44',
      'Reports 53.3% for 45–54',
      'Reports 53.0% for 55–64',
      'Reports 47.1%/46.7% for 65 and over',
      'Signals that the gap narrows sharply in the oldest group',
    ],
    belongsIn: 'body',
  },
];
