import type { ChartDataset } from './types';
import { CAMBRIDGE_12_T1_PHYSICAL_ACTIVITY, CAMBRIDGE_13_T2_OWNED_RENTED, CAMBRIDGE_17_T3_FAMILY_EXPENDITURE } from './bar-charts';
import { LINE_GRAPH_DATASETS } from './line-graphs';

/** Turns a chart dataset into the plain table shape Mino's AI assessment takes as task data. */
export function chartToTable(chart: ChartDataset): { caption: string; headers: string[]; rows: string[][] } {
  return {
    caption: chart.title,
    headers: ['', ...chart.series.map((s) => s.name)],
    rows: chart.categories.map((cat, i) => [cat, ...chart.series.map((s) => `${s.values[i]}${chart.unit}`)]),
  };
}

/**
 * Sample Task 1 chart datasets for the prototype. Original, invented figures
 * — not from a real report — written to have a clear overall trend plus a
 * couple of features worth comparing, as a real Task 1 chart would. The one
 * deliberate exception is 'cambridge-12-t1-physical-activity' below: Bar
 * Chart Mastery's whole premise is an authentic Cambridge IELTS chart, so
 * that one entry is real exam data, sourced and cross-checked as described
 * in bar-charts.ts.
 */
export const CHART_DATASETS: Record<string, ChartDataset> = {
  'renewable-electricity': {
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
  'commute-methods': {
    id: 'commute-methods',
    kind: 'bar',
    title: 'Main method of travelling to work in a city, 2010 and 2023',
    unit: '% of commuters',
    categories: ['Car', 'Bus', 'Bicycle', 'Train', 'Walking'],
    series: [
      { name: '2010', color: 'var(--chart-1)', values: [52, 24, 6, 11, 7] },
      { name: '2023', color: 'var(--chart-2)', values: [38, 21, 19, 15, 7] },
    ],
    note: 'Figures are illustrative, written for this trainer; they are not real city data.',
  },
  // The Line Graph Mastery course's unseen independent-test chart. It is
  // looked up by id here (same as every other final-task chart) rather
  // than embedded in a lesson step, since it is never shown during the
  // five guided levels.
  'lg-06-independent-test': LINE_GRAPH_DATASETS['lg-06-independent-test'],
  'cambridge-12-t1-physical-activity': CAMBRIDGE_12_T1_PHYSICAL_ACTIVITY,
  'cambridge-13-t2-owned-rented-accommodation': CAMBRIDGE_13_T2_OWNED_RENTED,
  'cambridge-17-t3-family-expenditure': CAMBRIDGE_17_T3_FAMILY_EXPENDITURE,
};
