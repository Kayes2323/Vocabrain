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
  title: { en: 'Body Paragraph Development', bn: 'Body Paragraph (মূল অনুচ্ছেদ) তৈরি করা' },
  objective:
    'Turn chart data into a developed body paragraph: group related information, select the figures that matter, compare accurately, support each claim with evidence, and connect ideas — without data dumping or invented causes.',
  estMinutes: 32,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: { en: 'What Makes a Strong Body Paragraph?', bn: 'একটা জোরালো Body Paragraph-এ কী থাকে?' },
      trainerMessage: {
        en: 'Welcome to Lesson 05: Body Paragraph Development. You have already learned how to identify the main features of a chart and write an overview. Now we move to the next stage: explaining the important details accurately and logically. An overview tells the reader what matters most. A body paragraph shows the evidence behind those observations. Today, you will learn how to organise information instead of simply copying numbers from a chart.',
        bn: 'Lesson 05: Body Paragraph Development-এ স্বাগতম। তুমি ইতিমধ্যে শিখেছ chart-এর মূল feature চিনতে আর Overview লিখতে। এবার পরের ধাপ: গুরুত্বপূর্ণ detail-গুলো সঠিক আর যৌক্তিকভাবে ব্যাখ্যা করা। Overview পাঠককে বলে কোনটা সবচেয়ে গুরুত্বপূর্ণ। Body Paragraph সেই observation-গুলোর পেছনের প্রমাণ দেখায়। আজকে তুমি শিখবে কীভাবে শুধু chart থেকে সংখ্যা copy না করে, তথ্যকে সাজাতে হয়।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'A Task 1 response usually contains: an introduction (what the visual shows), an overview (the most important patterns and features), and body paragraph(s) (relevant details, figures and comparisons supporting those patterns).',
            bn: 'একটা Task 1 response-এ সাধারণত থাকে: একটা introduction (visual-টা কী দেখাচ্ছে), একটা overview (সবচেয়ে গুরুত্বপূর্ণ pattern আর feature), আর body paragraph (সেই pattern-গুলোকে support করার জন্য প্রাসঙ্গিক detail, figure আর comparison)।',
          },
          { en: 'Remember: overview = the big picture. Body paragraphs = the supporting details.', bn: 'মনে রাখবে: overview = বড় ছবিটা। Body paragraph = সেটার supporting detail।' },
          { en: "Today's process: Select → Group → Compare → Support → Connect.", bn: 'আজকের process: Select → Group → Compare → Support → Connect।' },
          {
            en: "Diagnostic question. A chart shows that Denmark's renewable electricity share increased from 14% to 62% between 2000 and 2020.",
            bn: 'Diagnostic question। একটা chart দেখাচ্ছে যে Denmark-এর renewable electricity share ২০০০ থেকে ২০২০ সালের মধ্যে ১৪% থেকে ৬২%-এ বেড়েছে।',
          },
        ],
      },
      check: {
        prompt: { en: 'Which sentence is most suitable for a body paragraph?', bn: 'কোন বাক্যটা body paragraph-এর জন্য সবচেয়ে উপযুক্ত?' },
        options: [
          'Overall, Denmark experienced the most significant growth.',
          'The chart illustrates renewable electricity generation in three countries.',
          "Denmark's share rose from 14% in 2000 to 62% in 2020, representing an increase of 48 percentage points.",
        ],
        correctIndex: 2,
        explain: {
          en: "\"Denmark's share rose from 14% in 2000 to 62% in 2020, representing an increase of 48 percentage points.\" is the body-paragraph sentence: it gives specific evidence and a precise comparison. \"Overall, Denmark experienced the most significant growth.\" is an overview-style statement. \"The chart illustrates renewable electricity generation in three countries.\" is an introduction-style statement.",
          bn: '"Denmark\'s share rose from 14% in 2000 to 62% in 2020, representing an increase of 48 percentage points." — এটাই body-paragraph-এর বাক্য: এটা নির্দিষ্ট evidence আর একটা সুনির্দিষ্ট comparison দেয়। "Overall, Denmark experienced the most significant growth." — এটা একটা overview-ধরনের statement। "The chart illustrates renewable electricity generation in three countries." — এটা একটা introduction-ধরনের statement।',
        },
      },
    },
    {
      id: 'overview-vs-body',
      kind: 'explain',
      title: { en: 'Overview vs. Body Paragraph', bn: 'Overview বনাম Body Paragraph' },
      trainerMessage: {
        en: 'A common mistake is writing the same information twice: first in the overview and then again in the body paragraph. The two sections are connected, but they have different purposes.',
        bn: 'একটা common ভুল হলো একই তথ্য দুইবার লেখা: প্রথমে overview-তে, তারপর আবার body paragraph-এ। এই দুইটা অংশ একে অপরের সাথে connected, কিন্তু তাদের উদ্দেশ্য আলাদা।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'Using the renewable electricity chart. Overview example: "Overall, Denmark recorded the highest proportion of renewable electricity throughout the period and experienced the strongest growth. The other two countries also increased their shares, although their growth was more moderate." This summarises the big picture.',
            bn: 'renewable electricity chart-টা ব্যবহার করে। Overview-এর উদাহরণ: "Overall, Denmark recorded the highest proportion of renewable electricity throughout the period and experienced the strongest growth. The other two countries also increased their shares, although their growth was more moderate." এটা বড় ছবিটা summarise করে।',
          },
          {
            en: 'Body paragraph example: "Denmark\'s share increased steadily from 14% in 2000 to 62% in 2020, a rise of 48 percentage points. This final figure was more than four times its initial level. By comparison, Country B rose from 6% to 27%, while Country C increased more gradually from 9% to 16%." This provides specific evidence and meaningful comparisons.',
            bn: 'Body paragraph-এর উদাহরণ: "Denmark\'s share increased steadily from 14% in 2000 to 62% in 2020, a rise of 48 percentage points. This final figure was more than four times its initial level. By comparison, Country B rose from 6% to 27%, while Country C increased more gradually from 9% to 16%." এটা নির্দিষ্ট evidence আর অর্থপূর্ণ comparison দেয়।',
          },
          {
            en: 'Important: a body paragraph should develop relevant information. It should not repeat the overview word for word.',
            bn: 'গুরুত্বপূর্ণ: body paragraph-এ প্রাসঙ্গিক তথ্য develop করতে হবে। এটা overview-কে হুবহু repeat করা উচিত না।',
          },
        ],
      },
      check: {
        prompt: { en: 'Which information belongs primarily in the body paragraph?', bn: 'কোন তথ্যটা মূলত body paragraph-এ থাকা উচিত?' },
        options: [
          'Specific figures showing how the pattern developed.',
          'The overall pattern across the chart.',
          'A general statement about what the chart is about.',
        ],
        correctIndex: 0,
        explain: {
          en: 'Specific figures and detailed comparisons belong in the body. The overall pattern belongs in the overview, and a statement about what the chart shows belongs in the introduction.',
          bn: 'নির্দিষ্ট figure আর বিস্তারিত comparison body paragraph-এ থাকে। সামগ্রিক pattern overview-তে থাকে, আর chart কী দেখাচ্ছে তার statement introduction-এ থাকে।',
        },
      },
    },
    {
      id: 'read-dataset',
      kind: 'guided',
      title: { en: 'Understand the Chart Before Writing', bn: 'লেখার আগে Chart-টা বোঝো' },
      trainerMessage: {
        en: 'Before you write, identify the categories, years, units and important movements. The unit is percentage of total electricity generation, and the figures are illustrative training data, not real national statistics. Every statement in your paragraph must be supported by the chart. Take care not to confuse percentage with percentage points, an increase of 48 percentage points with an increase of 48%, a final value with a total increase, or a trend shown by the chart with a possible explanation for it.',
        bn: 'লেখার আগে, category, year, unit আর গুরুত্বপূর্ণ movement-গুলো চিহ্নিত করো। unit হলো percentage of total electricity generation, আর figure-গুলো illustrative training data, আসল national statistics না। তোমার paragraph-এর প্রতিটা statement chart দিয়ে support করতে হবে। খেয়াল রেখো যেন percentage আর percentage points গুলিয়ে না ফেলো, 48 percentage points বৃদ্ধিকে 48% বৃদ্ধির সাথে, একটা final value-কে total increase-এর সাথে, অথবা chart-এ দেখানো trend-কে তার সম্ভাব্য ব্যাখ্যার সাথে।',
      },
      material: {
        type: 'chart-board',
        dataset: CHART_DATASETS['renewable-electricity'],
        tasks: [
          {
            id: 'highest-2000',
            order: 1,
            prompt: { en: 'Which country had the highest figure in 2000?', bn: '২০০০ সালে কোন দেশের figure সবচেয়ে বেশি ছিল?' },
            modelAnswer: 'Denmark, at 14%.',
            belongsIn: 'body',
          },
          {
            id: 'highest-2020',
            order: 2,
            prompt: { en: 'Which country had the highest figure in 2020?', bn: '২০২০ সালে কোন দেশের figure সবচেয়ে বেশি ছিল?' },
            modelAnswer: 'Denmark, at 62%.',
            belongsIn: 'body',
          },
          {
            id: 'largest-increase',
            order: 3,
            prompt: { en: 'Which country experienced the largest absolute increase, and by how much?', bn: 'কোন দেশে সবচেয়ে বড় absolute increase হয়েছে, আর কত?' },
            modelAnswer: 'Denmark, increasing by 48 percentage points (from 14% to 62%).',
            belongsIn: 'body',
          },
          {
            id: 'smallest-increase',
            order: 4,
            prompt: { en: 'Which country had the smallest absolute increase, and by how much?', bn: 'কোন দেশে সবচেয়ে কম absolute increase হয়েছে, আর কত?' },
            modelAnswer: 'Country C, increasing by 7 percentage points (from 9% to 16%).',
            belongsIn: 'body',
          },
          {
            id: 'b-vs-c',
            order: 5,
            prompt: { en: 'How did the relationship between Country B and Country C change?', bn: 'Country B আর Country C-র মধ্যে সম্পর্কটা কীভাবে বদলেছে?' },
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
      title: { en: 'Group Before You Write', bn: 'লেখার আগে Group করো' },
      trainerMessage: {
        en: 'A strong paragraph is not a random collection of observations. It has an organising principle. You can group information in different ways, depending on the chart.',
        bn: 'একটা জোরালো paragraph হলো random observation-এর স্তূপ না। এতে একটা organising principle থাকে। chart অনুযায়ী তুমি বিভিন্নভাবে তথ্য group করতে পারো।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'Method 1 — group by similar behaviour: categories that increased, decreased or remained stable. Method 2 — group by magnitude: a dominant or unusually high category, lower categories, categories with moderate values. Method 3 — group by time period: earlier years, later years, a period when the pattern changed. Method 4 — group by contrast: one category grew rapidly, another increased gradually, a third remained relatively stable.',
            bn: 'Method 1 — একই রকম behaviour দিয়ে group করা: যেসব category বেড়েছে, কমেছে বা একই ছিল। Method 2 — magnitude দিয়ে group করা: একটা dominant বা অস্বাভাবিক বেশি category, কম category, আর মাঝারি value-এর category। Method 3 — time period দিয়ে group করা: আগের বছরগুলো, পরের বছরগুলো, যে সময় pattern বদলেছে। Method 4 — contrast দিয়ে group করা: একটা category দ্রুত বেড়েছে, আরেকটা ধীরে বেড়েছে, তৃতীয়টা তুলনামূলকভাবে স্থির ছিল।',
          },
          {
            en: 'Applied to our dataset, a sensible grouping could be: Group A — Denmark: it started at 14%, increased at every recorded point, reached 62% in 2020, and had the highest value throughout.',
            bn: 'আমাদের dataset-এ প্রয়োগ করলে, একটা sensible grouping হতে পারে: Group A — Denmark: এটা শুরু হয়েছিল 14% দিয়ে, প্রতিটা recorded point-এ বেড়েছে, ২০২০-এ 62%-এ পৌঁছেছে, আর পুরো সময় জুড়ে সবচেয়ে বেশি value ছিল।',
          },
          {
            en: 'Group B — Country B and Country C: both started below Denmark and both increased over the period. Country B grew more strongly, whereas Country C increased more gradually, and Country B moved ahead of Country C by 2010.',
            bn: 'Group B — Country B আর Country C: দুটোই Denmark-এর চেয়ে কম থেকে শুরু করেছিল আর দুটোই সময়ের সাথে বেড়েছে। Country B আরও জোরালোভাবে বেড়েছে, যেখানে Country C আরও ধীরে বেড়েছে, আর Country B ২০১০ সালের মধ্যে Country C-কে ছাড়িয়ে গিয়েছিল।',
          },
        ],
      },
      check: {
        prompt: { en: 'Which grouping best represents the dataset?', bn: 'কোন grouping dataset-টাকে সবচেয়ে ভালোভাবে represent করে?' },
        options: [
          'Group all three countries together without considering their differences.',
          'Discuss Denmark separately, then compare Country B and Country C.',
          'Discuss the years in alphabetical order.',
        ],
        correctIndex: 1,
        explain: {
          en: "Denmark's values and growth distinguish it from the other two countries. Country B and Country C provide a useful comparison because their starting positions and subsequent growth differ. (Other groupings, such as by time period, can also be defensible if they stay accurate and coherent.)",
          bn: 'Denmark-এর value আর growth একে বাকি দুই দেশ থেকে আলাদা করে। Country B আর Country C একটা useful comparison দেয় কারণ তাদের শুরুর position আর পরের growth আলাদা। (সময়কাল অনুযায়ী group করার মতো অন্য grouping-ও defensible হতে পারে, যদি সেটা সঠিক আর coherent থাকে।)',
        },
      },
    },
    {
      id: 'select-details',
      kind: 'explain',
      title: { en: 'Not Every Number Deserves a Sentence', bn: 'প্রতিটা সংখ্যার জন্য আলাদা বাক্য দরকার নেই' },
      trainerMessage: {
        en: 'You do not need to describe every number in the chart. You need to select the figures that make your comparison clear. A paragraph with ten numbers can still be weak if the reader cannot understand why those numbers matter.',
        bn: 'chart-এর প্রতিটা সংখ্যা বর্ণনা করার দরকার নেই। তোমার তোমার comparison-টা স্পষ্ট করে এমন figure বেছে নিতে হবে। দশটা সংখ্যা থাকা একটা paragraph-ও দুর্বল হতে পারে, যদি পাঠক বুঝতে না পারে কেন ওই সংখ্যাগুলো গুরুত্বপূর্ণ।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'The five-question selection test. 1. Does the figure support the main point of the paragraph? 2. Does it help demonstrate a trend or comparison? 3. Is it important enough to include? 4. Is it accurate and correctly attributed? 5. Does it add information rather than repeat something already stated?',
            bn: 'পাঁচ-প্রশ্নের selection test। ১. figure-টা কি paragraph-এর মূল point-কে support করছে? ২. এটা কি কোনো trend বা comparison দেখাতে সাহায্য করছে? ৩. এটা কি include করার মতো যথেষ্ট গুরুত্বপূর্ণ? ৪. এটা কি সঠিক আর সঠিক category-কে attribute করা? ৫. এটা কি নতুন তথ্য যোগ করছে, নাকি আগে বলা কিছু repeat করছে?',
          },
          {
            en: 'Weak selection: "Denmark was 14% in 2000, 21% in 2005, 33% in 2010, 48% in 2015 and 62% in 2020." This is accurate but reads like a list.',
            bn: 'দুর্বল selection: "Denmark was 14% in 2000, 21% in 2005, 33% in 2010, 48% in 2015 and 62% in 2020." এটা সঠিক কিন্তু একটা তালিকার মতো লাগছে।',
          },
          {
            en: 'Better selection: "Denmark\'s share rose steadily from 14% in 2000 to 62% in 2020." This uses the starting and ending values to support the overall change. You may include intermediate values when they demonstrate an important development.',
            bn: 'ভালো selection: "Denmark\'s share rose steadily from 14% in 2000 to 62% in 2020." এটা শুরু আর শেষের value ব্যবহার করে overall change support করছে। মাঝের value-গুলো তখনই যোগ করতে পারো, যখন সেগুলো কোনো গুরুত্বপূর্ণ উন্নতি দেখায়।',
          },
        ],
      },
      check: {
        prompt: {
          en: "Which detail is most useful when demonstrating Denmark's overall increase?",
          bn: 'Denmark-এর overall increase দেখাতে কোন detail-টা সবচেয়ে বেশি কাজে লাগে?',
        },
        options: [
          'Only the 2005 figure.',
          "A list of all three countries' values in 2000.",
          'Its starting and ending figures, with the time period.',
        ],
        correctIndex: 2,
        explain: {
          en: 'The starting and ending values directly demonstrate the scale of the change. Intermediate figures can be added if they support a more specific point, such as steady growth.',
          bn: 'শুরু আর শেষের value সরাসরি পরিবর্তনের মাত্রা দেখায়। মাঝের figure-গুলো তখন যোগ করা যায় যখন সেগুলো steady growth-এর মতো কোনো নির্দিষ্ট point-কে support করে।',
        },
      },
    },
    {
      id: 'comparisons',
      kind: 'explain',
      title: { en: 'Comparison Is More Than Mentioning Two Numbers', bn: 'Comparison মানে শুধু দুটো সংখ্যা উল্লেখ করা না' },
      trainerMessage: {
        en: 'A comparison explains the relationship between two or more pieces of information. Simply placing two numbers in the same sentence does not automatically create a meaningful comparison.',
        bn: 'একটা comparison দুই বা তার বেশি তথ্যের মধ্যে সম্পর্ক ব্যাখ্যা করে। শুধু একই বাক্যে দুটো সংখ্যা বসালেই সেটা একটা অর্থপূর্ণ comparison হয়ে যায় না।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'Weak: "Country B was 6% in 2000. Country C was 9% in 2000." Better: "Country C initially had a higher share than Country B, at 9% compared with 6%."',
            bn: 'দুর্বল: "Country B was 6% in 2000. Country C was 9% in 2000." ভালো: "Country C initially had a higher share than Country B, at 9% compared with 6%."',
          },
          {
            en: 'Weak: "Country B was 27% in 2020. Country C was 16% in 2020." Better: "By 2020, Country B had moved ahead of Country C, reaching 27% compared with 16%."',
            bn: 'দুর্বল: "Country B was 27% in 2020. Country C was 16% in 2020." ভালো: "By 2020, Country B had moved ahead of Country C, reaching 27% compared with 16%."',
          },
          {
            en: 'Useful comparison language: compared with, whereas, while, by contrast, respectively, higher than, lower than, more than four times its initial level (for Denmark: 62 against 14).',
            bn: 'কাজের comparison language: compared with, whereas, while, by contrast, respectively, higher than, lower than, more than four times its initial level (Denmark-এর জন্য: 62 against 14)।',
          },
          {
            en: 'Accuracy rule: use "respectively" only when the order of the figures clearly matches the order of the categories.',
            bn: 'নির্ভুলতার নিয়ম: "respectively" তখনই ব্যবহার করো যখন figure-এর order category-র order-এর সাথে স্পষ্টভাবে মিলে যায়।',
          },
        ],
      },
      check: {
        prompt: { en: 'Which sentence makes the most meaningful comparison?', bn: 'কোন বাক্যটা সবচেয়ে অর্থপূর্ণ comparison করে?' },
        options: [
          'Country C initially led Country B by 3 percentage points, but Country B had moved ahead by 2010.',
          'Country B was 6% and Country C was 9%.',
          'Country B and Country C both had percentages.',
        ],
        correctIndex: 0,
        explain: {
          en: 'It explains how the relationship changed over time and supports the comparison with accurate figures (9% against 6% in 2000; 12% against 11% in 2010).',
          bn: 'এটা ব্যাখ্যা করে সময়ের সাথে সম্পর্কটা কীভাবে বদলেছে, আর সঠিক figure দিয়ে comparison-টা support করে (২০০০-এ 9% against 6%; ২০১০-এ 12% against 11%)।',
        },
      },
    },
    {
      id: 'support-evidence',
      kind: 'explain',
      title: { en: 'Every Important Claim Needs Evidence', bn: 'প্রতিটা গুরুত্বপূর্ণ claim-এর evidence দরকার' },
      trainerMessage: {
        en: 'A body paragraph should not contain unsupported statements. If you say that one category grew considerably faster, you should be able to show the reader why.',
        bn: 'একটা body paragraph-এ unsupported statement থাকা উচিত না। যদি তুমি বলো একটা category অনেক বেশি দ্রুত বেড়েছে, তাহলে পাঠককে সেটা কেন বলছ তা দেখাতে পারতে হবে।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'Claim: "Denmark experienced the strongest growth." Supporting evidence: "Its share rose by 48 percentage points, from 14% to 62%, compared with increases of 21 points in Country B and 7 points in Country C." The evidence makes the claim verifiable.',
            bn: 'Claim: "Denmark experienced the strongest growth." Supporting evidence: "Its share rose by 48 percentage points, from 14% to 62%, compared with increases of 21 points in Country B and 7 points in Country C." এই evidence claim-টাকে verifiable করে তোলে।',
          },
          { en: 'Three rules: 1. Make the comparison first. 2. Select the figures that support it. 3. Explain the relationship clearly.', bn: 'তিনটা নিয়ম: ১. প্রথমে comparison করো। ২. সেটাকে support করে এমন figure বেছে নাও। ৩. সম্পর্কটা স্পষ্টভাবে ব্যাখ্যা করো।' },
          {
            en: 'Do not invent reasons. Incorrect: "Denmark\'s renewable electricity increased because the government invested more money." The chart does not provide information about government investment. Better: "Denmark\'s share increased substantially over the period." This reports only what the chart demonstrates.',
            bn: 'কারণ বানিয়ে নিও না। ভুল: "Denmark\'s renewable electricity increased because the government invested more money." chart সরকারের investment নিয়ে কোনো তথ্য দেয় না। ভালো: "Denmark\'s share increased substantially over the period." এটা শুধু chart যা দেখায় তাই report করে।',
          },
        ],
      },
      check: {
        prompt: { en: 'The chart shows Country B increasing from 6% to 27%. Which claim is supported?', bn: 'chart দেখাচ্ছে Country B 6% থেকে 27%-এ বেড়েছে। কোন claim-টা support করা হয়েছে?' },
        options: [
          'Country B increased because its government introduced new policies.',
          "Country B's share increased by 21 percentage points.",
          'Country B became more environmentally responsible.',
        ],
        correctIndex: 1,
        explain: {
          en: 'The chart supports the numerical change (27 − 6 = 21 percentage points). It does not reveal the cause or intentions behind it.',
          bn: 'chart সংখ্যাগত পরিবর্তনটা support করে (27 − 6 = 21 percentage points)। এটা এর পেছনের কারণ বা উদ্দেশ্য প্রকাশ করে না।',
        },
      },
    },
    {
      id: 'paragraph-structure',
      kind: 'explain',
      title: { en: 'How to Develop One Body Paragraph', bn: 'একটা Body Paragraph কীভাবে Develop করবে' },
      trainerMessage: {
        en: 'A body paragraph needs a clear direction. The reader should understand what you are discussing and why the details belong together. This is a planning framework, not a compulsory four-sentence formula: you can combine functions in one sentence or use more sentences when necessary.',
        bn: 'একটা body paragraph-এর একটা স্পষ্ট দিক দরকার। পাঠকের বোঝা উচিত তুমি কী নিয়ে আলোচনা করছ আর কেন detail-গুলো একসাথে গেছে। এটা একটা planning framework, বাধ্যতামূলক চার-বাক্যের formula না: প্রয়োজনে তুমি এক বাক্যে একাধিক function একসাথে করতে পারো, বা বেশি বাক্যও ব্যবহার করতে পারো।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: '1. Main comparison or organising sentence: introduce the group or relationship you are describing. 2. Supporting detail: provide the most useful figures. 3. Comparison or development: explain how the categories differ or how their values changed. 4. Closing detail or link: add a relevant final observation that completes the comparison.',
            bn: '১. মূল comparison বা organising বাক্য: যে group বা সম্পর্ক তুমি বর্ণনা করছ সেটার পরিচয় দাও। ২. Supporting detail: সবচেয়ে কাজের figure-গুলো দাও। ৩. Comparison বা development: category-গুলো কীভাবে আলাদা বা তাদের value কীভাবে বদলেছে তা ব্যাখ্যা করো। ৪. Closing detail বা link: comparison-টা সম্পূর্ণ করে এমন একটা প্রাসঙ্গিক শেষ observation যোগ করো।',
          },
          {
            en: 'Worked example: "Denmark recorded the highest proportion throughout the period, with its share rising steadily from 14% in 2000 to 62% in 2020. This represented an increase of 48 percentage points and meant that its final figure was more than four times the initial level. Although Country B also experienced substantial growth, increasing from 6% to 27%, Country C rose more gradually from 9% to 16%."',
            bn: 'একটা worked example: "Denmark recorded the highest proportion throughout the period, with its share rising steadily from 14% in 2000 to 62% in 2020. This represented an increase of 48 percentage points and meant that its final figure was more than four times the initial level. Although Country B also experienced substantial growth, increasing from 6% to 27%, Country C rose more gradually from 9% to 16%."',
          },
          {
            en: "Why it works: one clear organising idea (Denmark's leading position and growth); accurate supporting figures; a meaningful comparison with the other countries; no invented explanations; and no unnecessary repetition of the overview.",
            bn: 'কেন এটা কাজ করে: একটা স্পষ্ট organising idea (Denmark-এর leading position আর growth); সঠিক supporting figure; বাকি দেশগুলোর সাথে একটা অর্থপূর্ণ comparison; কোনো বানানো ব্যাখ্যা নেই; আর overview-এর অপ্রয়োজনীয় repetition নেই।',
          },
        ],
      },
      check: {
        prompt: { en: "What should a body paragraph's first sentence usually help establish?", bn: 'একটা body paragraph-এর প্রথম বাক্য সাধারণত কী স্থাপন করতে সাহায্য করে?' },
        options: [
          'An unrelated fact from the chart.',
          "The writer's personal opinion.",
          'The group, trend or comparison that the paragraph will develop.',
        ],
        correctIndex: 2,
        explain: {
          en: 'The opening should give the paragraph direction. It does not need a memorised phrase or a fixed sentence pattern.',
          bn: 'শুরুর বাক্যটা paragraph-কে একটা দিক দেওয়া উচিত। এর জন্য কোনো মুখস্থ phrase বা নির্দিষ্ট বাক্য-pattern লাগে না।',
        },
      },
    },
    {
      id: 'cohesion',
      kind: 'explain',
      title: { en: 'Connect Ideas Naturally', bn: 'স্বাভাবিকভাবে Idea Connect করো' },
      trainerMessage: {
        en: 'A paragraph can contain accurate sentences and still feel disconnected. Cohesion helps the reader follow the relationship between them. However, adding linking words everywhere does not automatically improve writing.',
        bn: 'একটা paragraph-এ সঠিক বাক্য থাকার পরও disconnected মনে হতে পারে। Cohesion পাঠককে বাক্যগুলোর মধ্যের সম্পর্ক বুঝতে সাহায্য করে। তবে, সবখানে linking word বসালেই লেখা automatically ভালো হয়ে যায় না।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'Useful relationships. Contrast: whereas, while, by contrast, compared with. Addition: also, similarly, in addition. Time: initially, by 2010, over the following years, by the end of the period. Reference: this figure, this increase, the corresponding proportion.',
            bn: 'কাজের সম্পর্ক। Contrast: whereas, while, by contrast, compared with। Addition: also, similarly, in addition। Time: initially, by 2010, over the following years, by the end of the period। Reference: this figure, this increase, the corresponding proportion।',
          },
          {
            en: 'Weak example: "Denmark increased. Moreover, Country B increased. Furthermore, Country C increased. In addition, Denmark was highest."',
            bn: 'দুর্বল উদাহরণ: "Denmark increased. Moreover, Country B increased. Furthermore, Country C increased. In addition, Denmark was highest."',
          },
          {
            en: 'Better example: "Denmark\'s share rose sharply throughout the period, whereas Country C experienced a much more gradual increase. Country B followed a stronger upward trend than Country C and had moved ahead of it by 2010." The second example connects the information through meaningful relationships, not excessive linking words.',
            bn: 'ভালো উদাহরণ: "Denmark\'s share rose sharply throughout the period, whereas Country C experienced a much more gradual increase. Country B followed a stronger upward trend than Country C and had moved ahead of it by 2010." দ্বিতীয় উদাহরণটা অর্থপূর্ণ সম্পর্ক দিয়ে তথ্য connect করে, অতিরিক্ত linking word দিয়ে না।',
          },
        ],
      },
      check: {
        prompt: { en: 'Which option uses cohesion more naturally?', bn: 'কোন option-টা cohesion আরও স্বাভাবিকভাবে ব্যবহার করে?' },
        options: [
          '"Country B grew more strongly than Country C, while Denmark remained well ahead of both."',
          '"Moreover, furthermore, in addition, Denmark increased."',
          '"Firstly, secondly, thirdly, the chart has countries."',
        ],
        correctIndex: 0,
        explain: {
          en: 'It uses contrast and comparison to connect the data. Cohesion should express a genuine relationship, not pile up linking words.',
          bn: 'এটা তথ্য connect করতে contrast আর comparison ব্যবহার করে। Cohesion একটা আসল সম্পর্ক প্রকাশ করা উচিত, শুধু linking word জমানো না।',
        },
      },
    },
    {
      id: 'common-mistakes',
      kind: 'demonstrate',
      title: { en: 'Body Paragraph Mistake Clinic', bn: 'Body Paragraph Mistake Clinic' },
      trainerMessage: {
        en: "Let's examine the mistakes that prevent an otherwise accurate paragraph from becoming a well-developed one. Then you will check whether you can spot four of them.",
        bn: 'চলো দেখি সেই ভুলগুলো যেগুলোর কারণে একটা অন্যথায় সঠিক paragraph ভালোভাবে develop হতে পারে না। তারপর তুমি চেক করবে এগুলোর মধ্যে চারটা ধরতে পারো কিনা।',
      },
      material: {
        type: 'vocab',
        items: [
          {
            phrase: 'Mistake 1 — Data dumping',
            use: {
              en: 'Weak: "Denmark was 14%, 21%, 33%, 48% and 62%." Problem: the figures are listed without explaining their relationship. Improvement: "Denmark\'s share rose steadily from 14% to 62%."',
              bn: 'দুর্বল: "Denmark was 14%, 21%, 33%, 48% and 62%." সমস্যা: figure-গুলো তাদের সম্পর্ক ব্যাখ্যা না করে শুধু তালিকা করা হয়েছে। উন্নতি: "Denmark\'s share rose steadily from 14% to 62%."',
            },
          },
          {
            phrase: 'Mistake 2 — Repeating the overview',
            use: {
              en: 'Weak: "Overall, Denmark had the highest figure and the others increased." Problem: this repeats the broad summary without developing it. Improvement: add the specific values and comparisons that support the observation.',
              bn: 'দুর্বল: "Overall, Denmark had the highest figure and the others increased." সমস্যা: এটা বড় summary-টা develop না করে শুধু repeat করছে। উন্নতি: observation-টাকে support করে এমন নির্দিষ্ট value আর comparison যোগ করো।',
            },
          },
          {
            phrase: 'Mistake 3 — Unsupported causes',
            use: {
              en: 'Weak: "Country B grew because of better government policies." Problem: the chart does not show why the figures changed. Improvement: report the observed increase without inventing its cause.',
              bn: 'দুর্বল: "Country B grew because of better government policies." সমস্যা: figure কেন বদলেছে chart সেটা দেখায় না। উন্নতি: কারণ না বানিয়ে শুধু দেখা increase-টা report করো।',
            },
          },
          {
            phrase: 'Mistake 4 — Incorrect comparisons',
            use: {
              en: 'Weak: "Country B was 27% higher than Country C in 2020." Problem: this is ambiguous and confuses a value of 27% with a relative difference (the gap is 11 percentage points). Improvement: "Country B stood at 27%, compared with 16% in Country C."',
              bn: 'দুর্বল: "Country B was 27% higher than Country C in 2020." সমস্যা: এটা অস্পষ্ট আর 27% value-কে একটা relative difference-এর সাথে গুলিয়ে ফেলে (আসল gap 11 percentage points)। উন্নতি: "Country B stood at 27%, compared with 16% in Country C."',
            },
          },
          {
            phrase: 'Mistake 5 — Repetition',
            use: {
              en: 'Weak: "Denmark increased. Denmark rose. Denmark went up." Problem: the same observation is repeated without adding information. Improvement: combine the trend with relevant evidence and comparison.',
              bn: 'দুর্বল: "Denmark increased. Denmark rose. Denmark went up." সমস্যা: একই observation নতুন তথ্য ছাড়া বারবার বলা হচ্ছে। উন্নতি: trend-টাকে প্রাসঙ্গিক evidence আর comparison-এর সাথে combine করো।',
            },
          },
          {
            phrase: 'Mistake 6 — Wrong figures or attribution',
            use: {
              en: 'Weak: "Country C reached 27% in 2020." Problem: 27% belongs to Country B. Country C reached 16%. Improvement: always verify the category, year and value before writing.',
              bn: 'দুর্বল: "Country C reached 27% in 2020." সমস্যা: 27% আসলে Country B-র। Country C পৌঁছেছিল 16%-এ। উন্নতি: লেখার আগে সবসময় category, year আর value যাচাই করো।',
            },
          },
        ],
      },
    },
    {
      id: 'clinic',
      kind: 'check',
      title: { en: 'Mistake Clinic (1 of 4)', bn: 'Mistake Clinic (১ এর ৪)' },
      trainerMessage: { en: 'A learner writes: "Country C increased because people preferred clean energy."', bn: 'একজন learner লিখেছে: "Country C increased because people preferred clean energy."' },
      check: {
        prompt: { en: 'What is wrong?', bn: 'এখানে কী ভুল আছে?' },
        options: [
          'The figure for Country C is missing.',
          'An unsupported cause has been invented.',
          'The sentence is in the wrong tense.',
          'It repeats the introduction.',
        ],
        correctIndex: 1,
        explain: {
          en: 'The chart shows that Country C increased, not why. A Task 1 paragraph must not invent reasons or attribute motives to people.',
          bn: 'chart দেখায় Country C বেড়েছে, কিন্তু কেন বেড়েছে তা দেখায় না। একটা Task 1 paragraph-এ কারণ বানানো বা মানুষের motive-কে দায়ী করা যাবে না।',
        },
      },
    },
    {
      id: 'clinic-2',
      kind: 'check',
      title: { en: 'Mistake Clinic (2 of 4)', bn: 'Mistake Clinic (২ এর ৪)' },
      trainerMessage: { en: 'A learner writes: "Denmark was 14%, 21%, 33%, 48% and 62%."', bn: 'একজন learner লিখেছে: "Denmark was 14%, 21%, 33%, 48% and 62%."' },
      check: {
        prompt: { en: 'What is missing?', bn: 'এখানে কী বাদ পড়েছে?' },
        options: [
          'The figures for Country B and Country C only.',
          'An opinion about renewable energy.',
          'A clear explanation of the trend and a meaningful comparison.',
          'A reason for the increase.',
        ],
        correctIndex: 2,
        explain: {
          en: 'The figures are accurate, but they are only listed. The reader needs to know what they show (a steady rise) and how that compares with the other countries. An opinion or a reason would add unsupported content.',
          bn: 'figure-গুলো সঠিক, কিন্তু শুধু তালিকা করা হয়েছে। পাঠকের জানা দরকার এগুলো কী দেখাচ্ছে (একটা steady rise) আর বাকি দেশগুলোর সাথে এটা কীভাবে তুলনা হয়। একটা opinion বা কারণ unsupported content যোগ করবে।',
        },
      },
    },
    {
      id: 'clinic-3',
      kind: 'check',
      title: { en: 'Mistake Clinic (3 of 4)', bn: 'Mistake Clinic (৩ এর ৪)' },
      trainerMessage: { en: 'A learner writes: "Country C reached 27% in 2020."', bn: 'একজন learner লিখেছে: "Country C reached 27% in 2020."' },
      check: {
        prompt: { en: 'What is wrong?', bn: 'এখানে কী ভুল আছে?' },
        options: [
          'The figure is attributed to the wrong country; Country C was 16%.',
          'The year is wrong: Country C reached 27% in 2015.',
          'Percentage points should be used instead of percentages.',
          'Nothing; the statement is accurate.',
        ],
        correctIndex: 0,
        explain: {
          en: 'In 2020, 27% belongs to Country B; Country C was 16% (and only 13% in 2015). Always verify the category, year and value before writing.',
          bn: '২০২০ সালে 27% আসলে Country B-র; Country C ছিল 16% (আর ২০১৫-এ মাত্র 13%)। লেখার আগে সবসময় category, year আর value যাচাই করো।',
        },
      },
    },
    {
      id: 'clinic-4',
      kind: 'check',
      title: { en: 'Mistake Clinic (4 of 4)', bn: 'Mistake Clinic (৪ এর ৪)' },
      trainerMessage: {
        en: 'A learner writes, in a body paragraph: "Overall, Denmark was the highest and increased."',
        bn: 'একজন learner একটা body paragraph-এ লিখেছে: "Overall, Denmark was the highest and increased."',
      },
      check: {
        prompt: { en: 'Why is this weak in a body paragraph?', bn: 'একটা body paragraph-এ এটা কেন দুর্বল?' },
        options: [
          'It uses a linking word.',
          'It is too long.',
          'It repeats a broad overview instead of developing the data with supporting details.',
          'It describes the wrong chart.',
        ],
        correctIndex: 2,
        explain: {
          en: 'It makes a general statement that belongs in the overview. A body paragraph should add the supporting figures and comparisons, for example the rise from 14% to 62%.',
          bn: 'এটা একটা general statement দেয় যেটা overview-তে থাকা উচিত। একটা body paragraph-এ supporting figure আর comparison যোগ করা উচিত, যেমন 14% থেকে 62%-এ বৃদ্ধি।',
        },
      },
    },
    {
      id: 'plan-paragraph',
      kind: 'guided',
      title: { en: 'Build Your Paragraph Plan', bn: 'তোমার Paragraph-এর Plan তৈরি করো' },
      trainerMessage: {
        en: 'Before writing, create a short plan. Do not start by writing full sentences. Work through four planning tasks on the chart: choose a focus, select evidence, order your ideas, and spot an unsupported statement.',
        bn: 'লেখার আগে, একটা ছোট plan তৈরি করো। পুরো বাক্য লেখা দিয়ে শুরু করো না। chart-টার ওপর চারটা planning task কাজ করো: একটা focus বেছে নাও, evidence বেছে নাও, তোমার idea-গুলো order করো, আর একটা unsupported statement খুঁজে বের করো।',
      },
      material: {
        type: 'chart-board',
        dataset: CHART_DATASETS['renewable-electricity'],
        tasks: [
          {
            id: 'plan-focus',
            order: 1,
            prompt: {
              en: 'Task 1 — Choose the paragraph focus. Which focus would create a coherent paragraph? A: Denmark\'s dominant position and growth, compared with the other countries. B: Randomly describing one figure from each year. C: Explaining why the countries adopted renewable electricity.',
              bn: 'Task 1 — Paragraph-এর focus বেছে নাও। কোন focus একটা coherent paragraph তৈরি করবে? A: Denmark-এর dominant position আর growth, বাকি দেশগুলোর সাথে তুলনা করে। B: প্রতি বছর থেকে random একটা figure বর্ণনা করা। C: কেন দেশগুলো renewable electricity নিয়েছে তা ব্যাখ্যা করা।',
            },
            modelAnswer:
              'A. It gives the paragraph one organising idea that the chart supports. B has no organising idea and C needs information the chart does not contain.',
            belongsIn: 'body',
          },
          {
            id: 'plan-evidence',
            order: 2,
            prompt: {
              en: 'Task 2 — Select supporting figures. For Denmark (14% to 62%), Country B (6% to 27%) and Country C (9% to 16%), say what each comparison demonstrates.',
              bn: 'Task 2 — Supporting figure বেছে নাও। Denmark (14% থেকে 62%), Country B (6% থেকে 27%) আর Country C (9% থেকে 16%)-এর জন্য, প্রতিটা comparison কী দেখাচ্ছে তা বলো।',
            },
            modelAnswer:
              'Denmark: the highest final figure and the largest increase. Country B: substantial growth. Country C: more gradual growth.',
            belongsIn: 'body',
          },
          {
            id: 'plan-order',
            order: 3,
            prompt: {
              en: 'Task 3 — Create a logical sequence. Put these in order: 1. Compare Country B\'s growth with Country C\'s. 2. Introduce Denmark\'s leading position. 3. Support the comparison with starting and ending values.',
              bn: 'Task 3 — একটা যৌক্তিক sequence তৈরি করো। এগুলোকে order করো: ১. Country B-র growth-এর সাথে Country C-র তুলনা করা। ২. Denmark-এর leading position পরিচয় করানো। ৩. শুরু আর শেষের value দিয়ে comparison-টা support করা।',
            },
            modelAnswer: '2, then 3, then 1: introduce Denmark\'s leading position, support it with starting and ending values, then compare Country B\'s growth with Country C\'s.',
            belongsIn: 'body',
          },
          {
            id: 'plan-unsupported',
            order: 4,
            prompt: {
              en: 'Task 4 — Identify the unsupported statement: "Country B overtook Country C because its government invested more in renewable energy." What is wrong with it?',
              bn: 'Task 4 — unsupported statement-টা খুঁজে বের করো: "Country B overtook Country C because its government invested more in renewable energy." এখানে কী সমস্যা আছে?',
            },
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
      title: { en: 'Learn from a Complete Example', bn: 'একটা পূর্ণ উদাহরণ থেকে শেখো' },
      trainerMessage: { en: 'Read both paragraphs about the same chart. Notice what changed, not just the wording.', bn: 'একই chart নিয়ে দুটো paragraph পড়ো। শুধু শব্দ না, কী বদলেছে সেটা খেয়াল করো।' },
      material: {
        type: 'examples',
        weak:
          'Denmark was 14% in 2000 and 21% in 2005. Country B was 6% and 8%. Country C was 9% and 10%. In 2010 Denmark was 33%, Country B was 12% and Country C was 11%. All countries increased. Denmark was the highest.',
        good:
          "Denmark consistently recorded the highest proportion of renewable electricity, with its share rising from 14% in 2000 to 62% in 2020. This 48-percentage-point increase was substantially greater than the rises recorded by Country B and Country C. Country B's figure climbed from 6% to 27%, whereas Country C experienced more gradual growth, reaching 16% from an initial 9%. Consequently, Country B had moved ahead of Country C by 2010 and widened the gap to 11 percentage points by the end of the period.",
        note: {
          en: 'The weak paragraph presents data mechanically, makes limited comparisons, ends on a sentence that repeats an obvious observation, and has no clear organising structure. The developed paragraph is stronger because it has a clear organising idea, figures that support each comparison, an explained relationship between Country B and Country C, precise language, and no claim to know why the figures changed.',
          bn: 'দুর্বল paragraph-টা তথ্য যান্ত্রিকভাবে উপস্থাপন করে, সীমিত comparison করে, একটা স্পষ্ট observation repeat করে শেষ হয়, আর এর কোনো স্পষ্ট organising structure নেই। developed paragraph-টা শক্তিশালী কারণ এতে একটা স্পষ্ট organising idea আছে, প্রতিটা comparison-কে support করে এমন figure আছে, Country B আর Country C-র মধ্যে সম্পর্ক ব্যাখ্যা করা আছে, সুনির্দিষ্ট ভাষা আছে, আর figure কেন বদলেছে তা জানার কোনো দাবি নেই।',
        },
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
