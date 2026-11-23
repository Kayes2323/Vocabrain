import { CHART_DATASETS } from '../charts';
import type { Lesson } from '../types';

/**
 * Task 1 Academy — Module 5 ("Body Paragraph Development"). Teaches the
 * Select → Group → Compare → Support → Connect process for turning chart
 * data into one coherent, evidence-supported body paragraph, on the
 * 'renewable-electricity' dataset (illustrative training data, not real
 * statistics). Every figure and every model answer below is checked against
 * that dataset by scripts/test-body-paragraphs.ts.
 *
 * The closing exercise is a paragraph-only skill drill (skillFocus +
 * checkScope), so it never produces or stores a full-task IELTS band.
 *
 * Runner notes: a LessonStep carries exactly one CheckQuestion, so a group of
 * checks is a run of consecutive check steps, and the closing reflection sits
 * before the writing task (the runner shows the written feedback and "Lesson
 * complete" screens after it).
 */
export const bodyParagraphsLesson: Lesson = {
  id: 'body-paragraphs',
  task: 'task1',
  moduleId: 'task1-m5',
  title: 'Body Paragraph Development',
  objective:
    'Turn chart data into a developed body paragraph: group related information, select the figures that matter, compare accurately, support each claim with evidence, and connect ideas — without data dumping or invented causes.',
  estMinutes: 32,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: 'What Makes a Strong Body Paragraph?',
      trainerMessage:
        'Welcome to Lesson 05: Body Paragraph Development. You have already learned how to identify the main features of a chart and write an overview. Now we move to the next stage: explaining the important details accurately and logically. An overview tells the reader what matters most. A body paragraph shows the evidence behind those observations. Today, you will learn how to organise information instead of simply copying numbers from a chart.',
      material: {
        type: 'text',
        paragraphs: [
          'A Task 1 response usually contains: an introduction (what the visual shows), an overview (the most important patterns and features), and body paragraph(s) (relevant details, figures and comparisons supporting those patterns).',
          'Remember: overview = the big picture. Body paragraphs = the supporting details.',
          'Today\'s process: Select → Group → Compare → Support → Connect.',
          'Diagnostic question. A chart shows that Denmark\'s renewable electricity share increased from 14% to 62% between 2000 and 2020.',
        ],
      },
      check: {
        prompt: 'Which sentence is most suitable for a body paragraph?',
        options: [
          'Overall, Denmark experienced the most significant growth.',
          'The chart illustrates renewable electricity generation in three countries.',
          "Denmark's share rose from 14% in 2000 to 62% in 2020, representing an increase of 48 percentage points.",
        ],
        correctIndex: 2,
        explain:
          "\"Denmark's share rose from 14% in 2000 to 62% in 2020, representing an increase of 48 percentage points.\" is the body-paragraph sentence: it gives specific evidence and a precise comparison. \"Overall, Denmark experienced the most significant growth.\" is an overview-style statement. \"The chart illustrates renewable electricity generation in three countries.\" is an introduction-style statement.",
      },
    },
    {
      id: 'overview-vs-body',
      kind: 'explain',
      title: 'Overview vs. Body Paragraph',
      trainerMessage:
        'A common mistake is writing the same information twice: first in the overview and then again in the body paragraph. The two sections are connected, but they have different purposes.',
      material: {
        type: 'text',
        paragraphs: [
          'Using the renewable electricity chart. Overview example: "Overall, Denmark recorded the highest proportion of renewable electricity throughout the period and experienced the strongest growth. The other two countries also increased their shares, although their growth was more moderate." This summarises the big picture.',
          'Body paragraph example: "Denmark\'s share increased steadily from 14% in 2000 to 62% in 2020, a rise of 48 percentage points. This final figure was more than four times its initial level. By comparison, Country B rose from 6% to 27%, while Country C increased more gradually from 9% to 16%." This provides specific evidence and meaningful comparisons.',
          'Important: a body paragraph should develop relevant information. It should not repeat the overview word for word.',
        ],
      },
      check: {
        prompt: 'Which information belongs primarily in the body paragraph?',
        options: [
          'Specific figures showing how the pattern developed.',
          'The overall pattern across the chart.',
          'A general statement about what the chart is about.',
        ],
        correctIndex: 0,
        explain: 'Specific figures and detailed comparisons belong in the body. The overall pattern belongs in the overview, and a statement about what the chart shows belongs in the introduction.',
      },
    },
    {
      id: 'read-dataset',
      kind: 'guided',
      title: 'Understand the Chart Before Writing',
      trainerMessage:
        'Before you write, identify the categories, years, units and important movements. The unit is percentage of total electricity generation, and the figures are illustrative training data, not real national statistics. Every statement in your paragraph must be supported by the chart. Take care not to confuse percentage with percentage points, an increase of 48 percentage points with an increase of 48%, a final value with a total increase, or a trend shown by the chart with a possible explanation for it.',
      material: {
        type: 'chart-board',
        dataset: CHART_DATASETS['renewable-electricity'],
        tasks: [
          {
            id: 'highest-2000',
            order: 1,
            prompt: 'Which country had the highest figure in 2000?',
            modelAnswer: 'Denmark, at 14%.',
            belongsIn: 'body',
          },
          {
            id: 'highest-2020',
            order: 2,
            prompt: 'Which country had the highest figure in 2020?',
            modelAnswer: 'Denmark, at 62%.',
            belongsIn: 'body',
          },
          {
            id: 'largest-increase',
            order: 3,
            prompt: 'Which country experienced the largest absolute increase, and by how much?',
            modelAnswer: 'Denmark, increasing by 48 percentage points (from 14% to 62%).',
            belongsIn: 'body',
          },
          {
            id: 'smallest-increase',
            order: 4,
            prompt: 'Which country had the smallest absolute increase, and by how much?',
            modelAnswer: 'Country C, increasing by 7 percentage points (from 9% to 16%).',
            belongsIn: 'body',
          },
          {
            id: 'b-vs-c',
            order: 5,
            prompt: 'How did the relationship between Country B and Country C change?',
            modelAnswer:
              'Country C started 3 percentage points ahead in 2000 (9% against 6%). Country B was already slightly ahead by 2010 (12% against 11%) and ended 11 percentage points ahead in 2020 (27% against 16%).',
            belongsIn: 'body',
          },
        ],
      },
    },
    {
      id: 'group-data',
      kind: 'explain',
      title: 'Group Before You Write',
      trainerMessage:
        'A strong paragraph is not a random collection of observations. It has an organising principle. You can group information in different ways, depending on the chart.',
      material: {
        type: 'text',
        paragraphs: [
          'Method 1 — group by similar behaviour: categories that increased, decreased or remained stable. Method 2 — group by magnitude: a dominant or unusually high category, lower categories, categories with moderate values. Method 3 — group by time period: earlier years, later years, a period when the pattern changed. Method 4 — group by contrast: one category grew rapidly, another increased gradually, a third remained relatively stable.',
          'Applied to our dataset, a sensible grouping could be: Group A — Denmark: it started at 14%, increased at every recorded point, reached 62% in 2020, and had the highest value throughout.',
          'Group B — Country B and Country C: both started below Denmark and both increased over the period. Country B grew more strongly, whereas Country C increased more gradually, and Country B moved ahead of Country C by 2010.',
        ],
      },
      check: {
        prompt: 'Which grouping best represents the dataset?',
        options: [
          'Group all three countries together without considering their differences.',
          'Discuss Denmark separately, then compare Country B and Country C.',
          'Discuss the years in alphabetical order.',
        ],
        correctIndex: 1,
        explain:
          "Denmark's values and growth distinguish it from the other two countries. Country B and Country C provide a useful comparison because their starting positions and subsequent growth differ. (Other groupings, such as by time period, can also be defensible if they stay accurate and coherent.)",
      },
    },
    {
      id: 'select-details',
      kind: 'explain',
      title: 'Not Every Number Deserves a Sentence',
      trainerMessage:
        'You do not need to describe every number in the chart. You need to select the figures that make your comparison clear. A paragraph with ten numbers can still be weak if the reader cannot understand why those numbers matter.',
      material: {
        type: 'text',
        paragraphs: [
          'The five-question selection test. 1. Does the figure support the main point of the paragraph? 2. Does it help demonstrate a trend or comparison? 3. Is it important enough to include? 4. Is it accurate and correctly attributed? 5. Does it add information rather than repeat something already stated?',
          'Weak selection: "Denmark was 14% in 2000, 21% in 2005, 33% in 2010, 48% in 2015 and 62% in 2020." This is accurate but reads like a list.',
          'Better selection: "Denmark\'s share rose steadily from 14% in 2000 to 62% in 2020." This uses the starting and ending values to support the overall change. You may include intermediate values when they demonstrate an important development.',
        ],
      },
      check: {
        prompt: "Which detail is most useful when demonstrating Denmark's overall increase?",
        options: [
          'Only the 2005 figure.',
          "A list of all three countries' values in 2000.",
          'Its starting and ending figures, with the time period.',
        ],
        correctIndex: 2,
        explain:
          'The starting and ending values directly demonstrate the scale of the change. Intermediate figures can be added if they support a more specific point, such as steady growth.',
      },
    },
    {
      id: 'comparisons',
      kind: 'explain',
      title: 'Comparison Is More Than Mentioning Two Numbers',
      trainerMessage:
        'A comparison explains the relationship between two or more pieces of information. Simply placing two numbers in the same sentence does not automatically create a meaningful comparison.',
      material: {
        type: 'text',
        paragraphs: [
          'Weak: "Country B was 6% in 2000. Country C was 9% in 2000." Better: "Country C initially had a higher share than Country B, at 9% compared with 6%."',
          'Weak: "Country B was 27% in 2020. Country C was 16% in 2020." Better: "By 2020, Country B had moved ahead of Country C, reaching 27% compared with 16%."',
          'Useful comparison language: compared with, whereas, while, by contrast, respectively, higher than, lower than, more than four times its initial level (for Denmark: 62 against 14).',
          'Accuracy rule: use "respectively" only when the order of the figures clearly matches the order of the categories.',
        ],
      },
      check: {
        prompt: 'Which sentence makes the most meaningful comparison?',
        options: [
          'Country C initially led Country B by 3 percentage points, but Country B had moved ahead by 2010.',
          'Country B was 6% and Country C was 9%.',
          'Country B and Country C both had percentages.',
        ],
        correctIndex: 0,
        explain: 'It explains how the relationship changed over time and supports the comparison with accurate figures (9% against 6% in 2000; 12% against 11% in 2010).',
      },
    },
    {
      id: 'support-evidence',
      kind: 'explain',
      title: 'Every Important Claim Needs Evidence',
      trainerMessage:
        'A body paragraph should not contain unsupported statements. If you say that one category grew considerably faster, you should be able to show the reader why.',
      material: {
        type: 'text',
        paragraphs: [
          'Claim: "Denmark experienced the strongest growth." Supporting evidence: "Its share rose by 48 percentage points, from 14% to 62%, compared with increases of 21 points in Country B and 7 points in Country C." The evidence makes the claim verifiable.',
          'Three rules: 1. Make the comparison first. 2. Select the figures that support it. 3. Explain the relationship clearly.',
          'Do not invent reasons. Incorrect: "Denmark\'s renewable electricity increased because the government invested more money." The chart does not provide information about government investment. Better: "Denmark\'s share increased substantially over the period." This reports only what the chart demonstrates.',
        ],
      },
      check: {
        prompt: 'The chart shows Country B increasing from 6% to 27%. Which claim is supported?',
        options: [
          'Country B increased because its government introduced new policies.',
          "Country B's share increased by 21 percentage points.",
          'Country B became more environmentally responsible.',
        ],
        correctIndex: 1,
        explain: 'The chart supports the numerical change (27 − 6 = 21 percentage points). It does not reveal the cause or intentions behind it.',
      },
    },
    {
      id: 'paragraph-structure',
      kind: 'explain',
      title: 'How to Develop One Body Paragraph',
      trainerMessage:
        'A body paragraph needs a clear direction. The reader should understand what you are discussing and why the details belong together. This is a planning framework, not a compulsory four-sentence formula: you can combine functions in one sentence or use more sentences when necessary.',
      material: {
        type: 'text',
        paragraphs: [
          '1. Main comparison or organising sentence: introduce the group or relationship you are describing. 2. Supporting detail: provide the most useful figures. 3. Comparison or development: explain how the categories differ or how their values changed. 4. Closing detail or link: add a relevant final observation that completes the comparison.',
          'Worked example: "Denmark recorded the highest proportion throughout the period, with its share rising steadily from 14% in 2000 to 62% in 2020. This represented an increase of 48 percentage points and meant that its final figure was more than four times the initial level. Although Country B also experienced substantial growth, increasing from 6% to 27%, Country C rose more gradually from 9% to 16%."',
          'Why it works: one clear organising idea (Denmark\'s leading position and growth); accurate supporting figures; a meaningful comparison with the other countries; no invented explanations; and no unnecessary repetition of the overview.',
        ],
      },
      check: {
        prompt: "What should a body paragraph's first sentence usually help establish?",
        options: [
          'An unrelated fact from the chart.',
          "The writer's personal opinion.",
          'The group, trend or comparison that the paragraph will develop.',
        ],
        correctIndex: 2,
        explain: 'The opening should give the paragraph direction. It does not need a memorised phrase or a fixed sentence pattern.',
      },
    },
    {
      id: 'cohesion',
      kind: 'explain',
      title: 'Connect Ideas Naturally',
      trainerMessage:
        'A paragraph can contain accurate sentences and still feel disconnected. Cohesion helps the reader follow the relationship between them. However, adding linking words everywhere does not automatically improve writing.',
      material: {
        type: 'text',
        paragraphs: [
          'Useful relationships. Contrast: whereas, while, by contrast, compared with. Addition: also, similarly, in addition. Time: initially, by 2010, over the following years, by the end of the period. Reference: this figure, this increase, the corresponding proportion.',
          'Weak example: "Denmark increased. Moreover, Country B increased. Furthermore, Country C increased. In addition, Denmark was highest."',
          'Better example: "Denmark\'s share rose sharply throughout the period, whereas Country C experienced a much more gradual increase. Country B followed a stronger upward trend than Country C and had moved ahead of it by 2010." The second example connects the information through meaningful relationships, not excessive linking words.',
        ],
      },
      check: {
        prompt: 'Which option uses cohesion more naturally?',
        options: [
          '"Country B grew more strongly than Country C, while Denmark remained well ahead of both."',
          '"Moreover, furthermore, in addition, Denmark increased."',
          '"Firstly, secondly, thirdly, the chart has countries."',
        ],
        correctIndex: 0,
        explain: 'It uses contrast and comparison to connect the data. Cohesion should express a genuine relationship, not pile up linking words.',
      },
    },
    {
      id: 'common-mistakes',
      kind: 'demonstrate',
      title: 'Body Paragraph Mistake Clinic',
      trainerMessage:
        "Let's examine the mistakes that prevent an otherwise accurate paragraph from becoming a well-developed one. Then you will check whether you can spot four of them.",
      material: {
        type: 'vocab',
        items: [
          {
            phrase: 'Mistake 1 — Data dumping',
            use: 'Weak: "Denmark was 14%, 21%, 33%, 48% and 62%." Problem: the figures are listed without explaining their relationship. Improvement: "Denmark\'s share rose steadily from 14% to 62%."',
          },
          {
            phrase: 'Mistake 2 — Repeating the overview',
            use: 'Weak: "Overall, Denmark had the highest figure and the others increased." Problem: this repeats the broad summary without developing it. Improvement: add the specific values and comparisons that support the observation.',
          },
          {
            phrase: 'Mistake 3 — Unsupported causes',
            use: 'Weak: "Country B grew because of better government policies." Problem: the chart does not show why the figures changed. Improvement: report the observed increase without inventing its cause.',
          },
          {
            phrase: 'Mistake 4 — Incorrect comparisons',
            use: 'Weak: "Country B was 27% higher than Country C in 2020." Problem: this is ambiguous and confuses a value of 27% with a relative difference (the gap is 11 percentage points). Improvement: "Country B stood at 27%, compared with 16% in Country C."',
          },
          {
            phrase: 'Mistake 5 — Repetition',
            use: 'Weak: "Denmark increased. Denmark rose. Denmark went up." Problem: the same observation is repeated without adding information. Improvement: combine the trend with relevant evidence and comparison.',
          },
          {
            phrase: 'Mistake 6 — Wrong figures or attribution',
            use: 'Weak: "Country C reached 27% in 2020." Problem: 27% belongs to Country B. Country C reached 16%. Improvement: always verify the category, year and value before writing.',
          },
        ],
      },
    },
    {
      id: 'clinic',
      kind: 'check',
      title: 'Mistake Clinic (1 of 4)',
      trainerMessage: 'A learner writes: "Country C increased because people preferred clean energy."',
      check: {
        prompt: 'What is wrong?',
        options: [
          'The figure for Country C is missing.',
          'An unsupported cause has been invented.',
          'The sentence is in the wrong tense.',
          'It repeats the introduction.',
        ],
        correctIndex: 1,
        explain: 'The chart shows that Country C increased, not why. A Task 1 paragraph must not invent reasons or attribute motives to people.',
      },
    },
    {
      id: 'clinic-2',
      kind: 'check',
      title: 'Mistake Clinic (2 of 4)',
      trainerMessage: 'A learner writes: "Denmark was 14%, 21%, 33%, 48% and 62%."',
      check: {
        prompt: 'What is missing?',
        options: [
          'The figures for Country B and Country C only.',
          'An opinion about renewable energy.',
          'A clear explanation of the trend and a meaningful comparison.',
          'A reason for the increase.',
        ],
        correctIndex: 2,
        explain:
          'The figures are accurate, but they are only listed. The reader needs to know what they show (a steady rise) and how that compares with the other countries. An opinion or a reason would add unsupported content.',
      },
    },
    {
      id: 'clinic-3',
      kind: 'check',
      title: 'Mistake Clinic (3 of 4)',
      trainerMessage: 'A learner writes: "Country C reached 27% in 2020."',
      check: {
        prompt: 'What is wrong?',
        options: [
          'The figure is attributed to the wrong country; Country C was 16%.',
          'The year is wrong: Country C reached 27% in 2015.',
          'Percentage points should be used instead of percentages.',
          'Nothing; the statement is accurate.',
        ],
        correctIndex: 0,
        explain: 'In 2020, 27% belongs to Country B; Country C was 16% (and only 13% in 2015). Always verify the category, year and value before writing.',
      },
    },
    {
      id: 'clinic-4',
      kind: 'check',
      title: 'Mistake Clinic (4 of 4)',
      trainerMessage: 'A learner writes, in a body paragraph: "Overall, Denmark was the highest and increased."',
      check: {
        prompt: 'Why is this weak in a body paragraph?',
        options: [
          'It uses a linking word.',
          'It is too long.',
          'It repeats a broad overview instead of developing the data with supporting details.',
          'It describes the wrong chart.',
        ],
        correctIndex: 2,
        explain: 'It makes a general statement that belongs in the overview. A body paragraph should add the supporting figures and comparisons, for example the rise from 14% to 62%.',
      },
    },
    {
      id: 'plan-paragraph',
      kind: 'guided',
      title: 'Build Your Paragraph Plan',
      trainerMessage:
        'Before writing, create a short plan. Do not start by writing full sentences. Work through four planning tasks on the chart: choose a focus, select evidence, order your ideas, and spot an unsupported statement.',
      material: {
        type: 'chart-board',
        dataset: CHART_DATASETS['renewable-electricity'],
        tasks: [
          {
            id: 'plan-focus',
            order: 1,
            prompt:
              'Task 1 — Choose the paragraph focus. Which focus would create a coherent paragraph? A: Denmark\'s dominant position and growth, compared with the other countries. B: Randomly describing one figure from each year. C: Explaining why the countries adopted renewable electricity.',
            modelAnswer:
              'A. It gives the paragraph one organising idea that the chart supports. B has no organising idea and C needs information the chart does not contain.',
            belongsIn: 'body',
          },
          {
            id: 'plan-evidence',
            order: 2,
            prompt:
              'Task 2 — Select supporting figures. For Denmark (14% to 62%), Country B (6% to 27%) and Country C (9% to 16%), say what each comparison demonstrates.',
            modelAnswer:
              'Denmark: the highest final figure and the largest increase. Country B: substantial growth. Country C: more gradual growth.',
            belongsIn: 'body',
          },
          {
            id: 'plan-order',
            order: 3,
            prompt:
              'Task 3 — Create a logical sequence. Put these in order: 1. Compare Country B\'s growth with Country C\'s. 2. Introduce Denmark\'s leading position. 3. Support the comparison with starting and ending values.',
            modelAnswer: '2, then 3, then 1: introduce Denmark\'s leading position, support it with starting and ending values, then compare Country B\'s growth with Country C\'s.',
            belongsIn: 'body',
          },
          {
            id: 'plan-unsupported',
            order: 4,
            prompt: 'Task 4 — Identify the unsupported statement: "Country B overtook Country C because its government invested more in renewable energy." What is wrong with it?',
            modelAnswer:
              'The cause is unsupported. The chart shows the change in values (Country B moved ahead of Country C by 2010), not the reason for it.',
            belongsIn: 'body',
          },
        ],
      },
    },
    {
      id: 'weak-vs-developed',
      kind: 'demonstrate',
      title: 'Learn from a Complete Example',
      trainerMessage: 'Read both paragraphs about the same chart. Notice what changed, not just the wording.',
      material: {
        type: 'examples',
        weak:
          'Denmark was 14% in 2000 and 21% in 2005. Country B was 6% and 8%. Country C was 9% and 10%. In 2010 Denmark was 33%, Country B was 12% and Country C was 11%. All countries increased. Denmark was the highest.',
        good:
          "Denmark consistently recorded the highest proportion of renewable electricity, with its share rising from 14% in 2000 to 62% in 2020. This 48-percentage-point increase was substantially greater than the rises recorded by Country B and Country C. Country B's figure climbed from 6% to 27%, whereas Country C experienced more gradual growth, reaching 16% from an initial 9%. Consequently, Country B had moved ahead of Country C by 2010 and widened the gap to 11 percentage points by the end of the period.",
        note: 'The weak paragraph presents data mechanically, makes limited comparisons, ends on a sentence that repeats an obvious observation, and has no clear organising structure. The developed paragraph is stronger because it has a clear organising idea, figures that support each comparison, an explained relationship between Country B and Country C, precise language, and no claim to know why the figures changed.',
      },
    },
    {
      id: 'plan-before-write',
      kind: 'guided',
      title: 'Plan Before You Write',
      trainerMessage:
        'Now plan your own body paragraph. You will write independently in the final task. Use this planning checklist: What is the main comparison? Which categories belong together? Which figures support the comparison? What is the most useful sequence? Have you avoided unsupported explanations? Are the figures attributed correctly? Then try one mini-check.',
      check: {
        prompt: 'A learner plans to write about Denmark\'s growth. Which evidence is most relevant?',
        options: [
          'Country C: 9% in 2000 and 16% in 2020.',
          'Denmark: 14% in 2000 and 62% in 2020.',
          "The chart's title.",
        ],
        correctIndex: 1,
        explain: 'The figures directly support the chosen paragraph focus. Country C\'s figures would be relevant to a comparison, but not to describing Denmark\'s own growth, and a title is not evidence.',
      },
    },
    {
      id: 'reflection',
      kind: 'review',
      title: 'What Have You Learned?',
      trainerMessage:
        'You have now learned how to turn chart information into a developed body paragraph. Before the final exercise, think about the five reflection questions, then read the closing reminder.',
      material: {
        type: 'text',
        paragraphs: [
          'Remember the five-stage process: Select → Group → Compare → Support → Connect. Do not write a paragraph simply because you have noticed several numbers. First decide what those numbers demonstrate and why they belong together.',
          'Reflection questions. 1. What is the main difference between an overview and a body paragraph? 2. Why should you group data before writing? 3. What makes a comparison meaningful? 4. Why is it dangerous to invent reasons for a trend? 5. Which one improvement will you apply in your next Task 1 response?',
          'A strong body paragraph is not the paragraph with the most numbers. It is the paragraph in which every selected detail has a clear purpose.',
          'After the final exercise, Lesson 05 is complete.',
        ],
      },
    },
    {
      id: 'independent-practice',
      kind: 'independent',
      title: 'Final Skill Assessment',
      trainerMessage:
        'Now write one body paragraph on your own. Look at the chart as long as you need — this focused exercise has no exam time limit. Plan first: what is the organising idea, which categories belong together, and which figures will you use as evidence?',
      material: {
        type: 'text',
        paragraphs: [
          'Chart: Electricity generated from renewable sources in three countries, 2000–2020 (% of total electricity generation). 2000: Denmark 14, Country B 6, Country C 9. 2005: 21, 8, 10. 2010: 33, 12, 11. 2015: 48, 18, 13. 2020: 62, 27, 16.',
          'Write ONE body paragraph describing the relevant details and comparisons in the chart. You may focus on Denmark\'s leading position and compare the growth of Country B and Country C, or choose another defensible grouping if the paragraph remains accurate and coherent.',
          'Suggested length: approximately 70–110 words. This is a learning guide, not a universal IELTS body-paragraph word-count rule. This is a paragraph-development skill exercise, not a complete Task 1 response.',
        ],
      },
    },
  ],
  finalPrompt: {
    title: 'Write One Well-Developed Body Paragraph',
    instructions:
      'Write ONE body paragraph describing the relevant details and comparisons in the chart. Your paragraph should: have a clear organising idea; group related information logically; include accurate figures; make meaningful comparisons; explain the relationship between the categories; avoid simply listing every number; avoid repeating an overview; and avoid invented causes or unsupported claims. You may focus on Denmark\'s leading position and compare the growth of Country B and Country C, or choose another defensible grouping if the paragraph remains accurate and coherent. Suggested length: approximately 70–110 words — a learning guide, not a universal IELTS rule. Do not write an introduction or an overview.',
    minWords: 70,
    chartId: 'renewable-electricity',
    skillFocus: 'Task 1 body paragraph development',
    checkScope: 'paragraph-only',
  },
};
