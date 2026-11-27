// Bar Chart Mastery — real Cambridge IELTS exam charts, not invented ones:
// Mino training data for every other Visual-Specific Training course is
// original and illustrative, but this course's whole premise is authentic
// published exam sources, so the figures below are the datasets given by the
// product owner and cross-checked against accessible transcriptions of the
// Cambridge charts — never a substitute, paraphrase or AI-generated chart.
//
// Lesson 01 — Cambridge IELTS 12 Academic, Test 1, Writing Task 1
//   (CAMBRIDGE_12_T1_PHYSICAL_ACTIVITY, one year — a static comparison).
// Lesson 02 — Cambridge IELTS 13 Academic, Test 2, Writing Task 1
//   (CAMBRIDGE_13_T2_OWNED_RENTED, nine years — a dynamic, time-based
//   comparison with a crossover and a late-decade reversal).
//
// Content-integrity rules the owner set for this course (do not relax these
// when adding content later): never invent a second chart attributed to a
// source that wasn't actually supplied; never replace a chart with a
// generated illustration; every displayed value must be traceable to its
// dataset below; the literal original Cambridge task-prompt wording was
// never supplied to this implementation for either lesson, so each final
// task's instructions are Mino's own standard Task 1 phrasing, not a quoted
// Cambridge question.
//
// SOURCE VERIFICATION NOTE (Lesson 02 / Cambridge 13 T2): the nine-year
// table below is the transcription the product owner supplied. I have not
// been given the original Cambridge page image to visually cross-check it
// against — that check (comparing every value against the original chart,
// per this lesson's own Part A instruction) still needs to happen before
// this is treated as fully source-verified. The table IS internally
// consistent (owned % + rented % = 100 in every one of the nine years,
// exactly as the two series are described as complementary), which is a
// real but partial check — it would catch a one-sided transcription error,
// not a value copied wrong from both columns at once, nor a wrong *source*
// page. Flagged here rather than silently treated as verified.

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

// ====================================================================
// Lesson 02 — Cambridge IELTS 13 Academic, Test 2, Writing Task 1
// "Households owning and renting accommodation in England and Wales,
// 1918 to 2011" (printed book page 51). Nine year categories; the two
// series are complementary (owned % + rented % = 100 in every year).
// ====================================================================

export const CAMBRIDGE_13_T2_OWNED_RENTED: ChartDataset = {
  id: 'cambridge-13-t2-owned-rented-accommodation',
  kind: 'bar',
  title: 'Households owning and renting accommodation in England and Wales, 1918 to 2011',
  unit: '%',
  categories: ['1918', '1939', '1953', '1961', '1971', '1981', '1991', '2001', '2011'],
  series: [
    { name: 'Owned accommodation', color: 'var(--chart-1)', values: [22, 31, 32, 42, 50, 60, 68, 69, 64] },
    { name: 'Rented accommodation', color: 'var(--chart-2)', values: [78, 69, 68, 58, 50, 40, 32, 31, 36] },
  ],
  note: 'Source: Cambridge IELTS 13 Academic, Test 2, Writing Task 1. The nine years are not evenly spaced — do not read the intervals as equal decades. The two series total 100% in every year shown.',
};

/** Exercise 1 — Data Reading (bare-figure recall; accepts "22", "22%", "22 percent" etc. via acceptableAlternatives). */
export const ACCOMMODATION_DATA_READING_TASKS: ChartBoardTask[] = [
  {
    id: 'acc-e1-q1-owned-1918', order: 1,
    prompt: 'What percentage of households owned their accommodation in 1918?',
    modelAnswer: 'In 1918, 22% of households owned their accommodation.',
    acceptableAlternatives: ['22%', '22 percent', '22', 'Twenty-two percent.'],
    belongsIn: 'body',
  },
  {
    id: 'acc-e1-q2-rented-1918', order: 2,
    prompt: 'What percentage rented in 1918?',
    modelAnswer: 'In 1918, 78% of households rented their accommodation.',
    acceptableAlternatives: ['78%', '78 percent', '78'],
    belongsIn: 'body',
  },
  {
    id: 'acc-e1-q3-equal-year', order: 3,
    prompt: 'In which year did the two figures become equal?',
    modelAnswer: 'The two figures became equal in 1971, at 50% each.',
    acceptableAlternatives: ['1971', 'In 1971.'],
    belongsIn: 'overview',
  },
  {
    id: 'acc-e1-q4-owned-2001', order: 4,
    prompt: 'What was the ownership percentage in 2001?',
    modelAnswer: 'Ownership stood at 69% in 2001, its peak.',
    acceptableAlternatives: ['69%', '69 percent', '69'],
    belongsIn: 'body',
  },
  {
    id: 'acc-e1-q5-rented-2011', order: 5,
    prompt: 'What was the renting percentage in 2011?',
    modelAnswer: 'Renting had recovered to 36% by 2011.',
    acceptableAlternatives: ['36%', '36 percent', '36'],
    belongsIn: 'body',
  },
];

/** Exercise 2 — Trend Interpretation (concept-level, allows approximations per Part F). */
export const ACCOMMODATION_TREND_TASKS: ChartBoardTask[] = [
  {
    id: 'acc-e2-q1-ownership-trend', order: 1,
    prompt: 'Describe the overall trend in ownership.',
    modelAnswer: 'Ownership generally increased, from 22% in 1918 to a peak of 69% in 2001, before falling to 64% in 2011.',
    acceptableAlternatives: ['It rose overall from 22% to a high of 69%, then dropped slightly to 64%.', 'Ownership increased for most of the period and declined only at the very end.'],
    evaluationCriteria: ['Identifies the overall rise, not just the final value', 'Identifies 2001 (69%) as the peak, not 2011'],
    belongsIn: 'overview',
  },
  {
    id: 'acc-e2-q2-renting-trend', order: 2,
    prompt: 'Describe the overall trend in renting.',
    modelAnswer: 'Renting generally declined, from 78% in 1918 to a low of 31% in 2001, before recovering to 36% in 2011.',
    acceptableAlternatives: ['It fell overall from 78% to a low of 31%, then rose slightly to 36%.'],
    evaluationCriteria: ['Identifies the overall decline', 'Identifies 2001 (31%) as the lowest point'],
    belongsIn: 'overview',
  },
  {
    id: 'acc-e2-q3-1971', order: 3,
    prompt: 'What happened in 1971?',
    modelAnswer: 'The two percentages became equal, at 50% each — the chart\'s crossover point.',
    acceptableAlternatives: ['Ownership and renting were both 50%.', 'The two categories met at the same figure.'],
    belongsIn: 'overview',
  },
  {
    id: 'acc-e2-q4-reversal', order: 4,
    prompt: 'What happened between 2001 and 2011?',
    modelAnswer: 'Ownership fell from 69% to 64% while renting rose from 31% to 36% — a partial reversal of the long-term trend.',
    acceptableAlternatives: ['Ownership decreased and renting increased in the final decade.'],
    evaluationCriteria: ['States both directions (ownership down, renting up)', 'Does not claim this reversal continues the earlier trend — it is an opposite movement'],
    belongsIn: 'overview',
  },
];

/** Exercise 3 — Identify the Mistake (accuracy judgement + reasoning, Mode 1). */
export const ACCOMMODATION_MISTAKE_TASKS: ChartBoardTask[] = [
  {
    id: 'acc-e3-a-continuous', order: 1,
    prompt: 'Is this statement accurate? "Home ownership increased continuously from 1918 to 2011." Explain why or why not.',
    modelAnswer: 'Incorrect — ownership rose until 2001 (69%) but then declined to 64% by 2011, so the increase was not continuous.',
    acceptableAlternatives: ['Inaccurate, because it fell in the last decade.', 'No — there was a decline after 2001.'],
    belongsIn: 'body',
  },
  {
    id: 'acc-e3-b-1918-renting', order: 2,
    prompt: 'Is this statement accurate? "Renting was more common than ownership in 1918." Explain why or why not.',
    modelAnswer: 'Correct — in 1918, renting was 78% against only 22% for ownership.',
    acceptableAlternatives: ['Yes, true, because 78% rented versus 22% owned.'],
    belongsIn: 'body',
  },
  {
    id: 'acc-e3-c-1971-equal', order: 3,
    prompt: 'Is this statement accurate? "The two categories were equal in 1971." Explain why or why not.',
    modelAnswer: 'Correct — both figures were exactly 50% in 1971.',
    acceptableAlternatives: ['Yes, true — 50% each.'],
    belongsIn: 'overview',
  },
  {
    id: 'acc-e3-d-2011-peak', order: 4,
    prompt: 'Is this statement accurate? "Ownership reached its highest point in 2011." Explain why or why not.',
    modelAnswer: 'Incorrect — ownership peaked in 2001 at 69%; by 2011 it had fallen to 64%.',
    acceptableAlternatives: ['No, false — the real peak was 2001, not 2011.'],
    belongsIn: 'body',
  },
  {
    id: 'acc-e3-e-final-decade', order: 5,
    prompt: 'Is this statement accurate? "Both categories moved in opposite directions during the final decade." Explain why or why not.',
    modelAnswer: 'Correct — between 2001 and 2011, ownership fell (69% to 64%) while renting rose (31% to 36%).',
    acceptableAlternatives: ['Yes, true — one went down while the other went up.'],
    belongsIn: 'overview',
  },
];

/** Exercise 4 — Sentence Construction (English required — Mode 2). */
export const ACCOMMODATION_SENTENCE_TASKS: ChartBoardTask[] = [
  {
    id: 'acc-e4-q1-gap-1918', order: 1,
    prompt: 'Write one English sentence describing the initial gap in 1918.',
    modelAnswer: 'In 1918, only 22% of households owned their accommodation, compared with 78% that rented.',
    requiredLanguage: 'en',
    evaluationCriteria: ['Reports both figures (22% and 78%) correctly for 1918', 'Makes a direct comparison (e.g. "compared with", "whereas")'],
    belongsIn: 'body',
  },
  {
    id: 'acc-e4-q2-equality-1971', order: 2,
    prompt: 'Write one English sentence describing the equality in 1971.',
    modelAnswer: 'By 1971, the two figures had converged, with exactly half of all households in each type of accommodation.',
    requiredLanguage: 'en',
    evaluationCriteria: ['States that the two figures were equal (50% each) in 1971'],
    belongsIn: 'overview',
  },
  {
    id: 'acc-e4-q3-peak-2001', order: 3,
    prompt: 'Write one English sentence describing the ownership peak in 2001.',
    modelAnswer: 'Home ownership reached its highest level in 2001, at 69%.',
    requiredLanguage: 'en',
    evaluationCriteria: ['States 69% and 2001 together as the peak'],
    belongsIn: 'body',
  },
  {
    id: 'acc-e4-q4-reversal-2011', order: 4,
    prompt: 'Write one English sentence describing the final reversal in 2011.',
    modelAnswer: 'However, this trend partly reversed by 2011, when ownership fell to 64% while renting recovered to 36%.',
    requiredLanguage: 'en',
    evaluationCriteria: ['Reports both 2011 figures (64% and 36%)', 'Signals the reversal (e.g. "however", "partly reversed")'],
    belongsIn: 'body',
  },
];

/** Exercise 5 — Paragraph Planning (one open grouping-rationale question, Mode 1). */
export const ACCOMMODATION_PLANNING_TASKS: ChartBoardTask[] = [
  {
    id: 'acc-e5-grouping', order: 1,
    prompt: 'Which years would you put in each of your two body paragraphs, and why?',
    modelAnswer: 'Paragraph 1: 1918, 1939, 1953, 1961, 1971 (renting dominant, narrowing gap, ending at equality). Paragraph 2: 1971, 1981, 1991, 2001, 2011 (ownership dominant, peaking in 2001, then a late reversal).',
    acceptableAlternatives: ['Split at 1971 since that is where the two lines cross.'],
    evaluationCriteria: ['Any coherent split is acceptable if it is justified by an actual pattern in the data (e.g. the 1971 crossover), not just an arbitrary even split'],
    belongsIn: 'overview',
  },
];

/** Writing-production checkpoints for the complete report (introduction + overview), mirroring Lesson 01's pattern. */
export const ACCOMMODATION_WRITING_TASKS: ChartBoardTask[] = [
  {
    id: 'acc-w-introduction', order: 1,
    prompt: 'Write your own introduction for this chart (1–2 sentences). Paraphrase — do not copy a model sentence.',
    modelAnswer: 'The bar chart compares the percentages of households in England and Wales that owned or rented their accommodation between 1918 and 2011.',
    requiredLanguage: 'en',
    evaluationCriteria: [
      'Accurately represents the chart topic (owned vs rented accommodation)',
      'Includes the location (England and Wales) and the period (1918 to 2011)',
      'Does not add any data, trend or opinion — that belongs later',
      'Grammatically correct, natural paraphrasing (not a word-for-word copy of the model)',
    ],
    belongsIn: 'introduction',
  },
  {
    id: 'acc-w-overview', order: 2,
    prompt: 'Write a two-to-three-sentence overview: the overall direction of both series, the 1971 crossover, and the final-decade reversal — not every individual year.',
    modelAnswer:
      'Overall, home ownership increased substantially while renting declined, with the two figures becoming equal in 1971. Ownership then became the dominant form of accommodation, although this pattern reversed slightly in the final decade.',
    requiredLanguage: 'en',
    evaluationCriteria: [
      'States the two opposing long-term trends',
      'States the 1971 crossover',
      'States the final-decade reversal (ownership down, renting up by 2011)',
      'Does not list every individual year\'s figures',
      'Grammatically correct English',
    ],
    belongsIn: 'overview',
  },
];

