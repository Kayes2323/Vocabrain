/** Line Graph Mastery: dataset integrity, figure accuracy, routing fix, and lesson structure.
 * Run: npx tsx scripts/test-line-graph-mastery.ts */
import assert from 'node:assert/strict';
import { CHART_DATASETS } from '../lib/writing-studio/charts';
import { TASK1_VISUALS } from '../lib/writing-studio/content';
import {
  LG01_GUIDED_TASKS,
  LG02_GUIDED_TASKS,
  LG03_GUIDED_TASKS,
  LG04_GUIDED_TASKS,
  LG05_GUIDED_TASKS,
  LINE_GRAPH_DATASETS,
} from '../lib/writing-studio/line-graphs';
import { getLesson } from '../lib/writing-studio/lessons';
import { lineGraphMasteryLesson as lesson } from '../lib/writing-studio/lessons/line-graph-mastery';
import { localize, type ChartDataset } from '../lib/writing-studio/types';

let passed = 0;
const test = (name: string, fn: () => void) => {
  try {
    fn();
    passed++;
    console.log(`PASS ${name}`);
  } catch (e) {
    console.log(`FAIL ${name}\n  ${(e as Error).message}`);
    process.exitCode = 1;
  }
};

// ---------------------------------------------------------------- structural integrity (Part 12, general)

const ids = Object.values(LINE_GRAPH_DATASETS).map((d) => d.id);
test('every dataset id is unique', () => {
  assert.equal(new Set(ids).size, ids.length);
});

Object.values(LINE_GRAPH_DATASETS).forEach((d) => {
  test(`${d.id}: every series has exactly one value per category, and a unit is present`, () => {
    assert.ok(d.unit.length > 0, 'missing unit');
    d.series.forEach((s) => {
      assert.equal(s.values.length, d.categories.length, `${s.name} has ${s.values.length} values for ${d.categories.length} categories`);
      assert.ok(s.values.every((v) => Number.isFinite(v)), `${s.name} has a missing/non-numeric value`);
    });
  });
});

// ---------------------------------------------------------------- LG-01 (Part 12)

{
  const d = LINE_GRAPH_DATASETS['lg-01-electricity'];
  const v = (year: string) => d.series[0].values[d.categories.indexOf(year)];
  test('LG-01: highest value is 335 in 2020', () => {
    assert.equal(Math.max(...d.series[0].values), 335);
    assert.equal(v('2020'), 335);
  });
  test('LG-01: largest point-to-point increase is +35 kWh, 2016→2018', () => {
    const diffs = d.categories.slice(1).map((y, i) => v(y) - v(d.categories[i]));
    assert.equal(Math.max(...diffs), 35);
    assert.equal(v('2018') - v('2016'), 35);
  });
  test('LG-01: final value is 310 in 2022', () => {
    assert.equal(v('2022'), 310);
  });
}

// ---------------------------------------------------------------- LG-02 (Part 12)

{
  const d = LINE_GRAPH_DATASETS['lg-02-metro-bus'];
  const metro = d.series.find((s) => s.name === 'Metro')!;
  const bus = d.series.find((s) => s.name === 'Bus')!;
  const at = (s: typeof metro, year: string) => s.values[d.categories.indexOf(year)];
  test('LG-02: Bus starts at 62 million, Metro starts at 32 million', () => {
    assert.equal(at(bus, '2010'), 62);
    assert.equal(at(metro, '2010'), 32);
  });
  test('LG-02: figures are closest in 2020 — 50 (bus) vs 48 (metro)', () => {
    assert.equal(at(bus, '2020'), 50);
    assert.equal(at(metro, '2020'), 48);
    const gaps = d.categories.map((y) => Math.abs(at(bus, y) - at(metro, y)));
    assert.equal(Math.min(...gaps), gaps[d.categories.indexOf('2020')]);
  });
  test('LG-02: Metro overtakes Bus between 2020 and 2025, not before', () => {
    assert.ok(at(metro, '2020') < at(bus, '2020'));
    assert.ok(at(metro, '2025') > at(bus, '2025'));
  });
  test('LG-02: Metro ends at 72 million, Bus ends at 38 million', () => {
    assert.equal(at(metro, '2030'), 72);
    assert.equal(at(bus, '2030'), 38);
  });
}

// ---------------------------------------------------------------- LG-03 (Part 12)

{
  const d = LINE_GRAPH_DATASETS['lg-03-electricity-sources'];
  const coal = d.series.find((s) => s.name === 'Coal')!;
  const gas = d.series.find((s) => s.name === 'Gas')!;
  const ren = d.series.find((s) => s.name === 'Renewables')!;
  const at = (s: typeof coal, year: string) => s.values[d.categories.indexOf(year)];
  test('LG-03: the three shares total 100% in every year', () => {
    d.categories.forEach((y) => assert.equal(at(coal, y) + at(gas, y) + at(ren, y), 100, `year ${y}`));
  });
  test('LG-03: Coal falls from 58% to 29%', () => {
    assert.equal(at(coal, '2005'), 58);
    assert.equal(at(coal, '2025'), 29);
  });
  test('LG-03: Renewables rise from 12% to 43%', () => {
    assert.equal(at(ren, '2005'), 12);
    assert.equal(at(ren, '2025'), 43);
  });
  test('LG-03: Renewables overtake Gas between 2015 and 2020, not before', () => {
    assert.ok(at(ren, '2015') < at(gas, '2015'));
    assert.ok(at(ren, '2020') > at(gas, '2020'));
  });
  test('LG-03: Renewables overtake Coal between 2020 and 2025, not before', () => {
    assert.ok(at(ren, '2020') < at(coal, '2020'));
    assert.ok(at(ren, '2025') > at(coal, '2025'));
  });
}

// ---------------------------------------------------------------- LG-04 (Part 12)

{
  const d = LINE_GRAPH_DATASETS['lg-04-cocoa-price'];
  const v = (year: string) => d.series[0].values[d.categories.indexOf(year)];
  test('LG-04: highest value is $5.2/kg in 2020, lowest is $2.8/kg in 2010', () => {
    assert.equal(Math.max(...d.series[0].values), 5.2);
    assert.equal(v('2020'), 5.2);
    assert.equal(Math.min(...d.series[0].values), 2.8);
    assert.equal(v('2010'), 2.8);
  });
  test('LG-04: final value is $4.8/kg in 2024', () => {
    assert.equal(v('2024'), 4.8);
  });
}

// ---------------------------------------------------------------- LG-05 (Part 12)

{
  const d = LINE_GRAPH_DATASETS['lg-05-four-regions'];
  const a = d.series.find((s) => s.name === 'Region A')!;
  const b = d.series.find((s) => s.name === 'Region B')!;
  const c = d.series.find((s) => s.name === 'Region C')!;
  const dd = d.series.find((s) => s.name === 'Region D')!;
  const at = (s: typeof a, year: string) => s.values[d.categories.indexOf(year)];
  test('LG-05: Region B starts highest at 60%', () => {
    assert.equal(at(b, '2000'), 60);
    assert.equal(Math.max(...d.series.map((s) => at(s, '2000'))), 60);
  });
  test('LG-05: Region D ends highest at 63%', () => {
    assert.equal(at(dd, '2025'), 63);
    assert.equal(Math.max(...d.series.map((s) => at(s, '2025'))), 63);
  });
  test('LG-05: Region C stays within 45%-47% throughout', () => {
    d.categories.forEach((y) => {
      const val = at(c, y);
      assert.ok(val >= 45 && val <= 47, `Region C was ${val} in ${y}`);
    });
  });
  test('LG-05: Region D matches Region A in 2015 at 46%', () => {
    assert.equal(at(dd, '2015'), 46);
    assert.equal(at(a, '2015'), 46);
  });
  test('LG-05: Region D overtakes Region B between 2015 and 2020, not before', () => {
    assert.ok(at(dd, '2015') < at(b, '2015'));
    assert.ok(at(dd, '2020') > at(b, '2020'));
  });
  test('LG-05: Region B ends at 40%', () => {
    assert.equal(at(b, '2025'), 40);
  });
}

// ---------------------------------------------------------------- LG-06 (independent test) — internal consistency only; never shown to the learner beforehand

{
  const d = LINE_GRAPH_DATASETS['lg-06-independent-test'];
  test('LG-06 is registered in CHART_DATASETS for the final-task chart lookup', () => {
    assert.equal(CHART_DATASETS['lg-06-independent-test'], d);
  });
  test('LG-06 has four series: a decline, a rise, a near-stable line, and a steep rise with crossovers', () => {
    assert.equal(d.series.length, 4);
    const gas = d.series.find((s) => s.name === 'Mains gas')!;
    const oil = d.series.find((s) => s.name === 'Oil')!;
    const elec = d.series.find((s) => s.name === 'Electric storage heating')!;
    const pump = d.series.find((s) => s.name === 'Heat pumps')!;
    assert.ok(gas.values[0] > gas.values.at(-1)!, 'gas should decline');
    assert.ok(elec.values[0] < elec.values.at(-1)!, 'electric storage should rise');
    const oilRange = Math.max(...oil.values) - Math.min(...oil.values);
    assert.ok(oilRange <= 1, `oil should be stable, range was ${oilRange}`);
    assert.ok(pump.values[0] < pump.values.at(-1)!, 'heat pumps should rise');
    // crossover vs gas, between 2015 and 2020
    const i2015 = d.categories.indexOf('2015');
    const i2020 = d.categories.indexOf('2020');
    assert.ok(pump.values[i2015] < gas.values[i2015] && pump.values[i2020] > gas.values[i2020], 'heat pumps should overtake gas between 2015 and 2020');
    assert.ok(pump.values[i2015] < elec.values[i2015] && pump.values[i2020] > elec.values[i2020], 'heat pumps should overtake electric storage between 2015 and 2020');
  });
}

// ---------------------------------------------------------------- guided task sets match their datasets

[
  ['lg-01-electricity', LG01_GUIDED_TASKS],
  ['lg-02-metro-bus', LG02_GUIDED_TASKS],
  ['lg-03-electricity-sources', LG03_GUIDED_TASKS],
  ['lg-04-cocoa-price', LG04_GUIDED_TASKS],
  ['lg-05-four-regions', LG05_GUIDED_TASKS],
].forEach(([id, tasks]) => {
  test(`${id}: guided tasks have unique ids and order, with model answers never blank`, () => {
    const t = tasks as { id: string; order: number; modelAnswer: string }[];
    assert.equal(new Set(t.map((x) => x.id)).size, t.length);
    assert.deepEqual(
      t.map((x) => x.order),
      t.map((_, i) => i + 1),
    );
    t.forEach((x) => assert.ok(x.modelAnswer.trim().length > 0));
  });
});

// ---------------------------------------------------------------- lesson structure & routing

test('lesson is registered under its own id and routes as task1', () => {
  assert.equal(lesson.id, 'line-graph-mastery');
  assert.equal(lesson.task, 'task1');
  assert.equal(getLesson('line-graph-mastery'), lesson);
});

test('every guided step embeds the matching dataset directly (not by id lookup)', () => {
  const chartSteps = lesson.steps.filter((s) => s.material?.type === 'chart-board');
  assert.equal(chartSteps.length, 5);
  const datasetIds = chartSteps.map((s) => (s.material as { type: 'chart-board'; dataset: ChartDataset }).dataset.id);
  assert.deepEqual(datasetIds, ['lg-01-electricity', 'lg-02-metro-bus', 'lg-03-electricity-sources', 'lg-04-cocoa-price', 'lg-05-four-regions']);
});

test('final prompt uses the unseen LG-06 chart, is a full 150-word Task 1 report, and never embeds a model answer', () => {
  assert.equal(lesson.finalPrompt.chartId, 'lg-06-independent-test');
  assert.equal(lesson.finalPrompt.minWords, 150);
  assert.ok(!lesson.finalPrompt.skillFocus);
  assert.ok(!('modelAnswer' in lesson.finalPrompt));
});

test("lesson.title and course identity stay in English ('Line Graph Mastery' is a course name, not translated)", () => {
  assert.equal(localize('en', lesson.title), 'Line Graph Mastery');
  assert.equal(localize('bn', lesson.title), 'Line Graph Mastery');
});

test('the Line Graphs visual-training card now points at the dedicated lesson, not the generic chart-analysis board', () => {
  const visual = TASK1_VISUALS.find((v) => v.id === 'line-graphs');
  assert.equal(visual?.builtLessonId, 'line-graph-mastery');
});

console.log(`\n${passed} passed`);
