// Line Graph Mastery — five original training datasets (LG-01 to LG-05) plus
// one unseen dataset for the independent test (LG-06), all authored for this
// course. Figures are illustrative Mino training data, not real-world
// statistics and not Cambridge material. Every claimed peak, trough,
// crossover and point-to-point change below is checked against the raw
// series by scripts/test-line-graph-mastery.ts — change a number here only
// alongside that test.

import type { ChartBoardTask, ChartDataset } from './types';

export const LINE_GRAPH_DATASETS: Record<string, ChartDataset> = {
  'lg-01-electricity': {
    id: 'lg-01-electricity',
    kind: 'line',
    title: 'Average monthly household electricity consumption in Linton, 2012–2022',
    unit: 'kWh per household per month',
    categories: ['2012', '2014', '2016', '2018', '2020', '2022'],
    series: [{ name: 'Consumption', color: 'var(--chart-1)', values: [240, 260, 295, 330, 335, 310] }],
    note: 'Figures are original Mino training data, written for this course — not real statistics for any city.',
  },
  'lg-02-metro-bus': {
    id: 'lg-02-metro-bus',
    kind: 'line',
    title: 'Annual passenger journeys on the metro and bus networks in Eastford, 2010–2030',
    unit: 'million journeys per year',
    categories: ['2010', '2015', '2020', '2025', '2030'],
    series: [
      { name: 'Metro', color: 'var(--chart-1)', values: [32, 39, 48, 60, 72] },
      { name: 'Bus', color: 'var(--chart-2)', values: [62, 58, 50, 43, 38] },
    ],
    note: 'Figures are original Mino training data, written for this course — not real transport statistics.',
  },
  'lg-03-electricity-sources': {
    id: 'lg-03-electricity-sources',
    kind: 'line',
    title: 'Shares of electricity generated from three sources in Ardin, 2005–2025',
    unit: '% of total electricity generation',
    categories: ['2005', '2010', '2015', '2020', '2025'],
    series: [
      { name: 'Coal', color: 'var(--chart-1)', values: [58, 52, 45, 37, 29] },
      { name: 'Gas', color: 'var(--chart-2)', values: [30, 32, 31, 30, 28] },
      { name: 'Renewables', color: 'var(--chart-3)', values: [12, 16, 24, 33, 43] },
    ],
    note: 'Figures are original Mino training data, written for this course — not real national statistics. The three shares total 100% in every year shown.',
  },
  'lg-04-cocoa-price': {
    id: 'lg-04-cocoa-price',
    kind: 'line',
    title: 'Average wholesale price of cocoa beans in Meridian, 2010–2024',
    unit: 'US$ per kg',
    categories: ['2010', '2012', '2014', '2016', '2018', '2020', '2022', '2024'],
    series: [{ name: 'Price', color: 'var(--chart-1)', values: [2.8, 3.6, 2.9, 4.5, 3.7, 5.2, 4.1, 4.8] }],
    note: 'Figures are original Mino training data, written for this course — not real commodity prices.',
  },
  'lg-05-four-regions': {
    id: 'lg-05-four-regions',
    kind: 'line',
    title: 'Proportion of adults meeting a weekly physical-activity target in four regions, 2000–2025',
    unit: '% of adults',
    categories: ['2000', '2005', '2010', '2015', '2020', '2025'],
    series: [
      { name: 'Region A', color: 'var(--chart-1)', values: [35, 38, 42, 46, 49, 52] },
      { name: 'Region B', color: 'var(--chart-2)', values: [60, 56, 52, 48, 44, 40] },
      { name: 'Region C', color: 'var(--chart-3)', values: [45, 46, 45, 47, 46, 47] },
      { name: 'Region D', color: 'var(--chart-4)', values: [20, 27, 35, 46, 55, 63] },
    ],
    note: 'Figures are original Mino training data, written for this course — not real health statistics.',
  },
  /**
   * The unseen independent-test dataset (spec Part 10). Never shown during
   * the five guided levels; freshly written for this test alone, with a
   * stable line (Oil), a clear decline (Mains gas), a clear rise (Electric
   * storage heating) and a steep rise with two crossovers (Heat pumps —
   * passes Electric storage between 2015–2020, and passes Mains gas in the
   * same interval).
   */
  'lg-06-independent-test': {
    id: 'lg-06-independent-test',
    kind: 'line',
    title: 'Proportion of households using four home-heating methods in Dalton Borough, 2000–2025',
    unit: '% of households',
    categories: ['2000', '2005', '2010', '2015', '2020', '2025'],
    series: [
      { name: 'Mains gas', color: 'var(--chart-1)', values: [62, 56, 46, 34, 24, 16] },
      { name: 'Oil', color: 'var(--chart-2)', values: [9, 10, 9, 9, 10, 9] },
      { name: 'Electric storage heating', color: 'var(--chart-3)', values: [8, 11, 15, 19, 22, 25] },
      { name: 'Heat pumps', color: 'var(--chart-4)', values: [1, 3, 8, 18, 30, 46] },
    ],
    note: 'Figures are original Mino training data, written for this course — not real statistics for any borough.',
  },
};

// ---------------------------------------------------------------- guided questions

/** Stage 1 — LG-01, single line: growth, plateau and decline. */
export const LG01_GUIDED_TASKS: ChartBoardTask[] = [
  { id: 'lg01-q1', order: 1, prompt: 'What is being measured, and in which unit?', modelAnswer: 'Average monthly electricity consumption per household, measured in kWh.', belongsIn: 'introduction' },
  { id: 'lg01-q2', order: 2, prompt: 'What was the overall direction of the line?', modelAnswer: 'It increased overall, although it declined slightly at the end.', belongsIn: 'overview' },
  { id: 'lg01-q3', order: 3, prompt: 'When did consumption reach its highest point?', modelAnswer: '2020, at 335 kWh.', belongsIn: 'body' },
  { id: 'lg01-q4', order: 4, prompt: 'During which interval was the largest increase recorded?', modelAnswer: '2016–2018, increasing from 295 to 330 kWh, a rise of 35 kWh.', belongsIn: 'body' },
  { id: 'lg01-q5', order: 5, prompt: 'Which period showed almost no change?', modelAnswer: '2018–2020, when consumption rose by only 5 kWh.', belongsIn: 'body' },
  { id: 'lg01-q6', order: 6, prompt: 'What are the two most important features for the overview?', modelAnswer: 'Consumption increased substantially overall and peaked in 2020; it then fell slightly, while remaining above the 2012 level.', belongsIn: 'overview' },
];

/** Stage 2 — LG-02, two lines: opposite trends and crossover. */
export const LG02_GUIDED_TASKS: ChartBoardTask[] = [
  { id: 'lg02-q1', order: 1, prompt: 'Which transport method was more popular in 2010?', modelAnswer: 'Bus, with 62 million journeys compared with 32 million on the metro.', belongsIn: 'body' },
  { id: 'lg02-q2', order: 2, prompt: 'How did the two trends move?', modelAnswer: 'Metro use rose steadily, whereas bus use fell steadily.', belongsIn: 'overview' },
  { id: 'lg02-q3', order: 3, prompt: 'When were the two figures closest?', modelAnswer: '2020, when metro recorded 48 million and bus 50 million.', belongsIn: 'body' },
  { id: 'lg02-q4', order: 4, prompt: 'Between which two recorded years did the metro overtake buses?', modelAnswer: 'Between 2020 and 2025.', belongsIn: 'overview' },
  { id: 'lg02-q5', order: 5, prompt: 'Which network had the larger figure in 2030, and by how much?', modelAnswer: 'Metro, by 34 million journeys.', belongsIn: 'body' },
];

/** Stage 3 — LG-03, three lines: grouping and ranking changes. */
export const LG03_GUIDED_TASKS: ChartBoardTask[] = [
  { id: 'lg03-q1', order: 1, prompt: 'Which source had the largest share in 2005?', modelAnswer: 'Coal, at 58%.', belongsIn: 'body' },
  { id: 'lg03-q2', order: 2, prompt: 'Which source increased most over the whole period?', modelAnswer: 'Renewables, rising from 12% to 43%.', belongsIn: 'overview' },
  { id: 'lg03-q3', order: 3, prompt: 'Which source changed the least?', modelAnswer: 'Gas, which stayed within a narrow 28%–32% range throughout.', belongsIn: 'body' },
  { id: 'lg03-q4', order: 4, prompt: 'Between which periods did renewables overtake gas?', modelAnswer: 'Between 2015 and 2020.', belongsIn: 'body' },
  { id: 'lg03-q5', order: 5, prompt: 'Between which periods did renewables overtake coal?', modelAnswer: 'Between 2020 and 2025.', belongsIn: 'overview' },
  { id: 'lg03-q6', order: 6, prompt: 'How can the three lines be grouped into two body paragraphs?', modelAnswer: "Coal's decline and renewables' rise as the two major opposing trends in one paragraph; gas's comparative stability in the other.", belongsIn: 'overview' },
];

/** Stage 4 — LG-04, fluctuation: peaks, troughs and recovery. */
export const LG04_GUIDED_TASKS: ChartBoardTask[] = [
  { id: 'lg04-q1', order: 1, prompt: 'What was the overall trend despite the repeated fluctuations?', modelAnswer: 'An overall upward trend — the final price was well above the starting price despite several rises and falls.', belongsIn: 'overview' },
  { id: 'lg04-q2', order: 2, prompt: 'In which year was the highest price recorded?', modelAnswer: '2020, at $5.2 per kg.', belongsIn: 'body' },
  { id: 'lg04-q3', order: 3, prompt: 'Which two years show notable falls after increases?', modelAnswer: '2014 (after the 2012 rise) and 2022 (after the 2020 peak).', belongsIn: 'body' },
  { id: 'lg04-q4', order: 4, prompt: 'Did every peak represent a new all-time high?', modelAnswer: 'No — 2016 ($4.5) was a local peak but still below the 2020 peak ($5.2); only 2020 was the highest point of the whole period.', belongsIn: 'body' },
  { id: 'lg04-q5', order: 5, prompt: 'How did the final value compare with the initial value?', modelAnswer: 'The final 2024 price ($4.8) was $2.0 higher than the 2010 starting price ($2.8).', belongsIn: 'overview' },
  { id: 'lg04-q6', order: 6, prompt: 'Why would a purely "rising trend" description be incomplete?', modelAnswer: 'Because the price fell several times along the way (2012→2014, 2016→2018, 2020→2022); the overview must mention the fluctuation as well as the overall direction.', belongsIn: 'overview' },
];

/** Stage 5 — LG-05, four lines: complex comparison and selective reporting. */
export const LG05_GUIDED_TASKS: ChartBoardTask[] = [
  { id: 'lg05-q1', order: 1, prompt: 'Which region started with the highest percentage?', modelAnswer: 'Region B, at 60% in 2000.', belongsIn: 'body' },
  { id: 'lg05-q2', order: 2, prompt: 'Which region ended with the highest percentage?', modelAnswer: 'Region D, at 63% in 2025.', belongsIn: 'overview' },
  { id: 'lg05-q3', order: 3, prompt: 'Which region changed very little?', modelAnswer: 'Region C, which stayed within a narrow 45%–47% range throughout.', belongsIn: 'body' },
  { id: 'lg05-q4', order: 4, prompt: 'Which region showed the strongest overall increase?', modelAnswer: 'Region D, rising from 20% to 63%.', belongsIn: 'overview' },
  { id: 'lg05-q5', order: 5, prompt: 'Which two regions followed opposite directions?', modelAnswer: 'Region D (rising steadily) and Region B (declining steadily from 60% to 40%).', belongsIn: 'overview' },
  { id: 'lg05-q6', order: 6, prompt: 'Which lines should be grouped in the first body paragraph?', modelAnswer: "Region D's sharp rise and Region B's steady decline, since they move in opposite directions and both change substantially.", belongsIn: 'body' },
  { id: 'lg05-q7', order: 7, prompt: 'Which series deserves separate treatment because its pattern is unusual?', modelAnswer: "Region A's moderate, steady rise and Region C's near-stability — grouped together in the second paragraph as the two gentler, less dramatic patterns.", belongsIn: 'body' },
];
