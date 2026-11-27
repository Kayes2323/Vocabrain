import type { Lesson } from '../types';
import { BAR_CHART_GUIDED_TASKS, BAR_CHART_STRUCTURE_TASKS, BAR_CHART_WRITING_TASKS, CAMBRIDGE_12_T1_PHYSICAL_ACTIVITY } from '../bar-charts';

const byId = (ids: string[]) => BAR_CHART_GUIDED_TASKS.filter((t) => ids.includes(t.id));

/**
 * Bar Chart Mastery — Visual-Specific Training, Course 02. The only Task 1
 * visual-specific course built from a real published exam chart (Cambridge
 * IELTS 12 Academic, Test 1) rather than original Mino data; every figure
 * here traces to lib/writing-studio/bar-charts.ts's one dataset. Every
 * chart-board question in this lesson is real-evaluated by Mino's AI
 * (lib/ai/server/assess/chart-answer.ts) — this course is also the first
 * consumer of that fix (the Visual Analysis Board used to mark every
 * submitted answer "correct" regardless of its content; see that file and
 * ChartAnalysisBoard.tsx for the fix itself, which also applies to every
 * earlier lesson using the same board).
 */
export const barChartMasteryLesson: Lesson = {
  id: 'bar-chart-mastery',
  task: 'task1',
  moduleId: 'task1-visual-bar-charts',
  title: 'Bar Chart Mastery',
  objective: {
    en: 'Read a static grouped bar chart accurately, tell a static comparison apart from a time-series trend, compare two groups across several categories, and write a complete, accurate Task 1 report from a real Cambridge IELTS chart.',
    bn: 'একটা static grouped bar chart নির্ভুলভাবে পড়া, static comparison আর time-series trend-এর মধ্যে পার্থক্য বোঝা, কয়েকটা category জুড়ে দুটো group তুলনা করা, আর একটা real Cambridge IELTS chart থেকে একটা সম্পূর্ণ, নির্ভুল Task 1 report লেখা।',
  },
  estMinutes: 50,
  steps: [
    // ---------------------------------------------------------------- 1. welcome
    {
      id: 'welcome',
      kind: 'intro',
      title: { en: 'Understanding Bar Charts', bn: 'Bar Chart বোঝা' },
      trainerMessage: {
        en: "Welcome! In Line Graphs we saw how data changes over time. Now we'll learn Bar Charts. A bar chart sometimes compares different categories, sometimes compares several groups within the same category, and sometimes shows data from different years. In today's first graph, we'll compare men's and women's physical activity across different age groups. So it's not enough to just look at a bar's height — you need to understand whose bar it is, what unit is used, and which comparison matters most. Let's begin.",
        bn: 'স্বাগতম! Line Graph-এ আমরা সময়ের সঙ্গে data কীভাবে পরিবর্তিত হয়, সেটা দেখেছি। এখন আমরা শিখব Bar Chart। Bar Chart-এ কখনও বিভিন্ন category তুলনা করা হয়, কখনও একই category-তে একাধিক group তুলনা করা হয়, আবার কখনও বিভিন্ন বছরের তথ্যও দেখানো হয়। আজকের প্রথম graph-এ আমরা পুরুষ ও নারীর physical activity বিভিন্ন বয়সের group-এ তুলনা করব। তাই শুধু bar-এর উচ্চতা দেখলেই হবে না। কোন bar কোন group-এর, কী unit ব্যবহার হয়েছে, এবং কোন comparison সবচেয়ে গুরুত্বপূর্ণ—সেগুলো বুঝতে হবে। চলুন, শুরু করি।',
      },
    },

    // ---------------------------------------------------------------- 2. chart structure (teaching)
    {
      id: 'chart-structure',
      kind: 'explain',
      title: { en: 'Read the Chart Before Comparing', bn: 'তুলনার আগে Chart পড়ুন' },
      trainerMessage: {
        en: "Before comparing any figures, read the chart's own structure first — title, axes, unit and legend.",
        bn: 'কোনো figure তুলনা করার আগে, প্রথমে chart-এর নিজের structure পড়ুন — title, axis, unit আর legend।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'Title: read it first. Here it tells us three things — Location: Australia, Year: 2010, Subject: regular physical activity among men and women.',
            bn: 'Title: প্রথমেই এটা পড়ুন। এখানে তিনটি বিষয় বলা আছে — Location: Australia, Year: 2010, Subject: regular physical activity among men and women.',
          },
          {
            en: 'X-axis: six age groups — 15 to 24, 25 to 34, 35 to 44, 45 to 54, 55 to 64, 65 and over. These are the categories; each one has two bars, Male and Female.',
            bn: 'X-axis: ছয়টি age group — 15 to 24, 25 to 34, 35 to 44, 45 to 54, 55 to 64, 65 and over। এগুলো হলো categories; প্রতিটিতে দুটো bar আছে, Male আর Female।',
          },
          {
            en: 'Y-axis: percentage, 0 to 60. A taller bar means a higher percentage — but never guess a value from height alone; use the tooltip or the exact figure.',
            bn: 'Y-axis: percentage, 0 থেকে 60। bar যত লম্বা, percentage তত বেশি — কিন্তু শুধু উচ্চতা দেখে value অনুমান করবেন না; tooltip বা exact figure ব্যবহার করুন।',
          },
          {
            en: 'Unit: percentage (%). 52.8 means 52.8%, never 52.8 million or 52.8 people — getting the unit wrong is a common Task 1 mistake.',
            bn: 'Unit: percentage (%)। 52.8 মানে 52.8%, কখনো 52.8 million বা 52.8 people না — unit ভুল করা Task 1-এ একটা সাধারণ ভুল।',
          },
          {
            en: 'Legend: shows which colour is Male and which is Female. Always check the legend before reading a bar\'s value.',
            bn: 'Legend: কোন রঙ Male আর কোনটা Female, সেটা দেখায়। একটা bar-এর value পড়ার আগে সবসময় legend দেখে নিন।',
          },
        ],
      },
    },
    // ---------------------------------------------------------------- 3. chart structure (check)
    {
      id: 'chart-structure-check',
      kind: 'check',
      title: { en: 'Quick knowledge check', bn: 'Quick knowledge check' },
      trainerMessage: {
        en: 'Answer in Bangla or English — only the information matters here.',
        bn: 'বাংলা বা English-এ উত্তর দিন — এখানে শুধু তথ্যটাই গুরুত্বপূর্ণ।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_12_T1_PHYSICAL_ACTIVITY, tasks: BAR_CHART_STRUCTURE_TASKS },
    },

    // ---------------------------------------------------------------- 4. static vs time-series
    {
      id: 'static-vs-timeseries',
      kind: 'check',
      title: { en: 'Static Chart or Time-Series Chart?', bn: 'Static Chart নাকি Time-Series Chart?' },
      trainerMessage: {
        en: "An important distinction. A line graph often shows several years, so we describe a rise, a fall or a change over time. This bar chart shows only 2010 — the age groups change, but time does not. Never describe these age groups as a time sequence.",
        bn: 'একটা গুরুত্বপূর্ণ বিষয় বুঝতে হবে। Line Graph-এ অনেক সময় বিভিন্ন বছরের data থাকে, তখন আমরা সময়ের সঙ্গে বৃদ্ধি, হ্রাস বা পরিবর্তন বর্ণনা করি। কিন্তু এই Bar Chart-এ শুধু 2010 সালের তথ্য — age group পরিবর্তন হচ্ছে, সময় না। এই age group-গুলোকে কখনো সময়ের ধারাবাহিকতা হিসেবে বর্ণনা করবেন না।',
      },
      check: {
        prompt: 'Which of these three statements correctly describes the chart?',
        options: [
          'The chart shows how physical activity changed between 2010 and 2015.',
          'The chart compares the percentages of men and women across six age groups in 2010.',
          'The chart shows the number of people exercising every year.',
        ],
        correctIndex: 1,
        explain: {
          en: 'Option 2 is correct. Option 1 invents a second year (2015) that the chart does not contain — this is the "treating categories as years" mistake. Option 3 gets both the unit wrong (percentage, not a headcount) and wrongly implies the chart covers multiple years ("every year").',
          bn: 'Option 2 সঠিক। Option 1 একটা দ্বিতীয় বছর (2015) বানিয়ে ফেলেছে, যেটা chart-এ নেই — এটাই "categories-কে years হিসেবে treat করা" ভুল। Option 3 দুটো ভুল করেছে: unit ভুল (percentage, headcount না) আর ভুলভাবে বোঝাচ্ছে chart একাধিক বছরের ("every year") তথ্য দেখাচ্ছে।',
        },
      },
    },

    // ---------------------------------------------------------------- 5. read and compare
    {
      id: 'read-compare',
      kind: 'guided',
      title: { en: 'How to Read the Bars Accurately', bn: 'নির্ভুলভাবে Bar পড়া' },
      trainerMessage: {
        en: "Now let's read the actual values. For each age group, look at the Male bar first, then the Female bar, then compare — never guess, use the exact figure or the tooltip.",
        bn: 'এখন আমরা actual value পড়ব। প্রতিটি age group-এ প্রথমে Male-এর value দেখুন, তারপর Female-এর value, এরপর তুলনা করুন — অনুমান না করে exact figure বা tooltip ব্যবহার করুন।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_12_T1_PHYSICAL_ACTIVITY, tasks: byId(['bc-q1-highest-male', 'bc-q2-lowest-male', 'bc-q3-highest-female', 'bc-q4-lowest-female', 'bc-q5-gender-count']) },
    },

    // ---------------------------------------------------------------- 6. biggest/smallest differences
    {
      id: 'compare-differences',
      kind: 'guided',
      title: { en: 'Find the Biggest and Smallest Differences', bn: 'সবচেয়ে বড় আর ছোট পার্থক্য খুঁজুন' },
      trainerMessage: {
        en: 'Listing only the highest and lowest value is not enough analysis. Find where the gap between the two groups is largest, and where it is almost zero — this makes your overview and body paragraphs far more informative. Use "percentage points" for an absolute gap like this, never "percent" — a 13-point gap is not a 13% increase.',
        bn: 'শুধু highest আর lowest value লিখলেই ভালো analysis হয় না। দুটো group-এর মধ্যে কোথায় সবচেয়ে বেশি পার্থক্য আর কোথায় প্রায় সমান, সেটা খুঁজে বের করুন — এটা আপনার overview আর body paragraph-কে আরও informative করে। এই ধরনের absolute পার্থক্যের জন্য "percentage points" ব্যবহার করুন, "percent" না — ১৩-point gap মানে ১৩% বৃদ্ধি না।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_12_T1_PHYSICAL_ACTIVITY, tasks: byId(['bc-q6-only-male-higher', 'bc-q7-largest-gap', 'bc-q8-closest']) },
    },

    // ---------------------------------------------------------------- 7. overview features
    {
      id: 'overview-features',
      kind: 'guided',
      title: { en: 'Find the Main Features for Your Overview', bn: 'Overview-এর জন্য মূল feature খুঁজুন' },
      trainerMessage: {
        en: "The overview is one of the most important parts of Task 1. You don't write every value here — just the two or three most important features, standing back from the detail.",
        bn: 'Overview হলো Task 1-এর সবচেয়ে গুরুত্বপূর্ণ অংশগুলোর একটি। এখানে সব value লিখতে হয় না — শুধু সবচেয়ে গুরুত্বপূর্ণ দুই বা তিনটা feature, detail থেকে একটু পিছিয়ে এসে।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_12_T1_PHYSICAL_ACTIVITY, tasks: byId(['bc-q9-overview-features']) },
    },

    // ---------------------------------------------------------------- 8. grouping (teaching only)
    {
      id: 'grouping',
      kind: 'explain',
      title: { en: 'Organise Your Comparisons', bn: 'তুলনাগুলো সাজানো' },
      trainerMessage: {
        en: "Now let's learn how to organise a body paragraph. A common mistake is writing a separate sentence for every age group, which turns the answer into a list. Instead, group related information together.",
        bn: 'এখন আমরা শিখব কীভাবে body paragraph সাজাতে হয়। একটি সাধারণ ভুল হলো প্রতিটি age group নিয়ে আলাদা আলাদা বাক্য লেখা, এতে উত্তরটি list-এর মতো হয়ে যায়। তার পরিবর্তে সম্পর্কযুক্ত তথ্য একসঙ্গে group করুন।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'A workable grouping for this chart: Body Paragraph 1 — the two youngest groups (15–24, 25–34), where the only reversal in the whole chart happens. Body Paragraph 2 — the four remaining, older groups (35–44 to 65 and over), where women stay ahead throughout, though the gap narrows sharply in the oldest group.',
            bn: 'এই chart-এর জন্য একটা কার্যকর grouping: Body Paragraph 1 — দুটো সবচেয়ে কম বয়সী group (15–24, 25–34), যেখানে পুরো chart-এর একমাত্র reversal ঘটে। Body Paragraph 2 — বাকি চারটা বয়স্ক group (35–44 থেকে 65 and over), যেখানে নারীরা পুরোটাই এগিয়ে থাকে, যদিও সবচেয়ে বয়স্ক group-এ গ্যাপ হঠাৎ কমে যায়।',
          },
          {
            en: 'This grouping is only one acceptable approach — IELTS Task 1 does not mandate one fixed grouping. Whatever you choose, it should logically match the chart\'s own data and comparisons.',
            bn: 'এই grouping শুধু একটি গ্রহণযোগ্য approach। IELTS Task 1-এ একটিই নির্দিষ্ট grouping বাধ্যতামূলক নয়। আপনার grouping যেন chart-এর data ও comparison-এর সঙ্গে যৌক্তিকভাবে মেলে।',
          },
        ],
      },
    },

    // ---------------------------------------------------------------- 9-11. writing checkpoints (English required)
    {
      id: 'write-introduction',
      kind: 'guided',
      title: { en: 'Paraphrase the Chart Description', bn: 'Chart-এর description Paraphrase করুন' },
      trainerMessage: {
        en: "In the introduction, paraphrase the chart's question or description in your own words — no new analysis or detail here. Clarify three things: what is being compared, where, and in which year. This one must be written in English — it is the actual sentence your Task 1 response will use.",
        bn: 'Introduction-এ chart-এর প্রশ্ন বা description নিজের ভাষায় লিখতে হয় — নতুন analysis বা detail দেওয়ার প্রয়োজন নেই। তিনটি বিষয় পরিষ্কার করুন: কী তুলনা করা হচ্ছে, কোথায়, আর কোন বছরে। এটা English-এ লিখতে হবে — এটাই আপনার Task 1 response-এ আসল বাক্য হিসেবে ব্যবহার হবে।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_12_T1_PHYSICAL_ACTIVITY, tasks: [BAR_CHART_WRITING_TASKS[0]] },
    },
    {
      id: 'write-overview',
      kind: 'guided',
      title: { en: 'Summarise the Main Features', bn: 'মূল feature-গুলো Summarise করুন' },
      trainerMessage: {
        en: "Your goal in the overview is to present the big picture. You don't need every age group's value here — choose which group led, where the exception was, and which comparison is most significant. Write it in English.",
        bn: 'Overview-তে আপনার লক্ষ্য হলো chart-এর বড় ছবিটি তুলে ধরা। এখানে প্রতিটি age group-এর value লেখার প্রয়োজন নেই — কোন group এগিয়ে ছিল, কোথায় exception ছিল, আর কোন comparison সবচেয়ে উল্লেখযোগ্য তা বেছে নিন। এটা English-এ লিখুন।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_12_T1_PHYSICAL_ACTIVITY, tasks: [BAR_CHART_WRITING_TASKS[1]] },
    },
    {
      id: 'write-body-paragraphs',
      kind: 'guided',
      title: { en: 'Support Your Overview with Data', bn: 'Overview-কে Data দিয়ে Support করুন' },
      trainerMessage: {
        en: 'Now explain the overview with exact data, using comparisons and appropriate linking language. Keep related information in one paragraph — not just number after number. Both paragraphs must be written in English.',
        bn: 'এখন overview-এর কথাগুলো exact data দিয়ে ব্যাখ্যা করুন, comparison আর উপযুক্ত linking language ব্যবহার করে। একটা paragraph-এ সম্পর্কযুক্ত তথ্য রাখুন — শুধু একের পর এক number না। দুটো paragraph-ই English-এ লিখতে হবে।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_12_T1_PHYSICAL_ACTIVITY, tasks: [BAR_CHART_WRITING_TASKS[2], BAR_CHART_WRITING_TASKS[3]] },
    },

    // ---------------------------------------------------------------- 12. complete model answer
    {
      id: 'model-answer',
      kind: 'review',
      title: { en: 'See How Everything Comes Together', bn: 'সবকিছু একসাথে কেমন দেখায়' },
      trainerMessage: {
        en: 'Compare this complete response with the chart above. This is a Mino-authored teaching answer, not an officially scored Cambridge model — use it to see how introduction, overview and body paragraphs fit together, never to copy word for word.',
        bn: 'উপরের chart-টার সাথে এই সম্পূর্ণ response-টা মিলিয়ে দেখুন। এটা Mino-র তৈরি একটা teaching answer, কোনো officially scored Cambridge model answer না — এটা দিয়ে দেখুন introduction, overview আর body paragraph কীভাবে একসাথে ফিট হয়, হুবহু copy করার জন্য না।',
      },
      material: {
        type: 'text',
        paragraphs: [
          'The bar chart compares the proportions of Australian men and women in six different age groups who engaged in regular physical activity in 2010.',
          'Overall, women recorded higher levels of physical activity than men in five of the six age groups. Men had a higher figure only among 15- to 24-year-olds, while the largest difference between the sexes was seen in the 35–44 age group.',
          'Among the youngest participants, men recorded a higher figure, at 52.8%, compared with 47.7% for women. However, the pattern was reversed in the 25–34 age group, where the female proportion stood at 48.9%, against 42.2% for males.',
          'Women also had higher participation rates in all the remaining age groups. The most substantial difference occurred among those aged 35–44, with 52.5% of women being active compared with 39.5% of men. Female participation then peaked at 53.3% among 45–54-year-olds, before remaining almost unchanged at 53.0% in the 55–64 group. In the oldest category, the figures were very similar, at 47.1% for women and 46.7% for men.',
          { en: 'Word count: 169 words. Every figure above matches the chart exactly, the overview names the dominant pattern and its one exception, the two body paragraphs group related age categories rather than listing every number in sequence, and nothing here describes the age groups as a time series.', bn: 'Word count: ১৬৯ শব্দ। উপরের প্রতিটা figure chart-এর সাথে হুবহু মিলছে, overview-তে dominant pattern আর এর একমাত্র exception বলা হয়েছে, দুটো body paragraph প্রতিটা number ধারাবাহিকভাবে না লিখে সম্পর্কযুক্ত age category-কে group করেছে, আর এখানে কোথাও age group-গুলোকে time series হিসেবে বর্ণনা করা হয়নি।' },
        ],
      },
    },

    // ---------------------------------------------------------------- 13. common mistakes
    {
      id: 'common-mistakes',
      kind: 'review',
      title: { en: 'Avoid These Bar Chart Mistakes', bn: 'এই Bar Chart ভুলগুলো এড়িয়ে চলুন' },
      trainerMessage: {
        en: "Here are the mistakes that come up most often with a static grouped bar chart like this one.",
        bn: 'এই ধরনের static grouped bar chart-এ সবচেয়ে বেশি যে ভুলগুলো দেখা যায়, সেগুলো এখানে দেওয়া হলো।',
      },
      material: {
        type: 'text',
        paragraphs: [
          { en: '❌ "The figures increased from 15–24 to 65 and over." → ✅ "The figures differed across the six age groups."', bn: '❌ "The figures increased from 15–24 to 65 and over." → ✅ "The figures differed across the six age groups." — প্রথমটা ভুলভাবে age group-কে একটা সময়ের ধারাবাহিকতা মনে করাচ্ছে, যদিও chart-এ কোনো time trend নেই।' },
          { en: '❌ "52.8 million men exercised." → ✅ "52.8% of men in the 15–24 age group were physically active."', bn: '❌ "52.8 million men exercised." → ✅ "52.8% of men in the 15–24 age group were physically active." — unit ভুল; chart percentage দেখাচ্ছে, মানুষের সংখ্যা না।' },
          { en: 'Ignoring the legend can swap a male value for a female one by accident — always identify the data series before reading a bar.', bn: 'Legend উপেক্ষা করলে ভুলবশত একটা male value-কে female হিসেবে report করে ফেলতে পারেন — একটা bar পড়ার আগে সবসময় data series চিহ্নিত করুন।' },
          { en: 'Writing every number in the overview makes it read like a list — keep the overview focused on the two or three dominant features only.', bn: 'Overview-তে প্রতিটা number লিখলে সেটা list-এর মতো পড়তে হয় — overview-কে শুধু দুই-তিনটা dominant feature-এ সীমাবদ্ধ রাখুন।' },
          { en: 'Always check every reported figure against the chart and the dataset before submitting — an inaccurate number costs Task Achievement marks even in an otherwise well-written answer.', bn: 'জমা দেওয়ার আগে প্রতিটা reported figure chart আর dataset-এর সাথে মিলিয়ে দেখুন — একটা ভুল number অন্যথায় ভালো লেখা একটা answer-এও Task Achievement-এর নম্বর কাটে।' },
          { en: '❌ "Women exceeded men by 13 percent." → ✅ "Women exceeded men by 13 percentage points." — an absolute gap between two percentages is reported in percentage points, never plain "percent".', bn: '❌ "Women exceeded men by 13 percent." → ✅ "Women exceeded men by 13 percentage points." — দুইটা percentage-এর মধ্যে absolute gap বোঝাতে percentage points ব্যবহার করুন, শুধু "percent" না।' },
          { en: 'Describing a static, single-year chart as a time series is one of the most common structural mistakes with this chart type — always identify the year(s) and the nature of the categories before writing a word.', bn: 'একটা static, একক-বছরের chart-কে time series হিসেবে বর্ণনা করা এই ধরনের chart-এর সবচেয়ে সাধারণ structural ভুল — লেখা শুরুর আগে সবসময় বছর আর category-গুলোর প্রকৃতি চিহ্নিত করুন।' },
        ],
      },
    },

    // ---------------------------------------------------------------- 14. recap
    {
      id: 'recap',
      kind: 'review',
      title: { en: 'What You Have Learned', bn: 'আপনি যা শিখলেন' },
      trainerMessage: {
        en: "Congratulations! You can now read a static grouped bar chart, compare data, and build a complete Task 1 response. Remember: understand title, axes, unit and legend first; never describe a static comparison as a time-series trend; find the highest, lowest and most significant differences; focus your overview on the main features; group related data in body paragraphs; and use every figure accurately. Reading a model answer alone will not build the skill — you need to write, get feedback, and try again.",
        bn: 'অভিনন্দন! আপনি এখন একটি Static Grouped Bar Chart পড়তে, data তুলনা করতে এবং সম্পূর্ণ Task 1 response তৈরি করতে শিখেছেন। মনে রাখবেন: প্রথমে title, axes, unit এবং legend বুঝবেন; static comparison-কে time-series trend হিসেবে বর্ণনা করবেন না; highest, lowest এবং গুরুত্বপূর্ণ difference খুঁজে বের করবেন; overview-তে main feature তুলে ধরবেন; body paragraph-এ related data group করবেন; আর প্রতিটি figure সঠিকভাবে ব্যবহার করবেন। শুধু model answer পড়লেই দক্ষতা তৈরি হবে না — নিজে লিখে feedback নিয়ে আবার চেষ্টা করতে হবে।',
      },
    },

    // ---------------------------------------------------------------- 15. readiness
    {
      id: 'readiness',
      kind: 'independent',
      title: { en: 'Your Turn — Write the Complete Report', bn: 'আপনার পালা — সম্পূর্ণ Report লিখুন' },
      trainerMessage: {
        en: "Now write a complete Task 1 response yourself: Introduction, Overview, Body Paragraph 1, Body Paragraph 2. Your goal is not just to state numbers, but to build correct comparisons from understanding the data. If you want to time yourself, use 20 minutes.",
        bn: 'এখন আপনি নিজে সম্পূর্ণ Task 1 response লিখুন। আপনার উত্তরে থাকবে: Introduction, Overview, Body Paragraph 1, Body Paragraph 2। আপনার লক্ষ্য হলো শুধু number লেখা নয়, বরং data বুঝে সঠিক comparison তৈরি করা। সময় ধরে practice করতে চাইলে 20 মিনিট ব্যবহার করতে পারেন।',
      },
    },
  ],
  finalPrompt: {
    // This is Mino's own standard Task 1 instruction wording, not a quoted
    // Cambridge question — the literal original task-prompt text was never
    // supplied to this implementation (see bar-charts.ts's header comment).
    title: { en: 'Independent Bar Chart Test', bn: 'Independent Bar Chart Test' },
    instructions: {
      en: 'The bar chart below shows the percentage of Australian men and women in six age groups who did regular physical activity in 2010. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      bn: 'নিচের bar chart-টা দেখায় ছয়টি age group-এ ২০১০ সালে regular physical activity করা Australian পুরুষ আর নারীর percentage। তথ্যগুলো বেছে নিয়ে আর main feature report করে summarise করুন, আর যেখানে প্রয়োজন সেখানে comparison করুন। অন্তত ১৫০ শব্দ লিখুন।',
    },
    minWords: 150,
    chartId: 'cambridge-12-t1-physical-activity',
  },
};
