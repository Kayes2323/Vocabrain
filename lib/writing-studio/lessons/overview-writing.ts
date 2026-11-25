import type { Lesson } from '../types';
import { CHART_DATASETS } from '../charts';

/**
 * Task 1 Academy — Module 4 ("Overview Mastery"). Teaches the overview as an
 * analytical summary — Select → Compare → Group → Summarise — rather than a
 * fixed opening phrase. Everything is anchored to the 'commute-methods'
 * dataset (illustrative training data, not real statistics); every figure and
 * every answer key below is checked against it by
 * scripts/test-overview-writing.ts.
 *
 * The first chart-board in this lesson is also what the standalone "Visual
 * Analysis Board" page (task1/chart-analysis-board) renders, so it is
 * deliberately a chart-reading board.
 *
 * The closing exercise is an overview-only skill drill (skillFocus +
 * checkScope), so it never produces or stores a full-task IELTS band.
 *
 * Runner notes: a LessonStep carries exactly one CheckQuestion, so a group of
 * checks is a run of consecutive check steps, and the lesson's closing
 * reflection sits before the writing task (the runner shows the written
 * feedback and "Lesson complete" screens after it).
 */
export const overviewWritingLesson: Lesson = {
  id: 'overview-writing',
  task: 'task1',
  moduleId: 'task1-m4',
  title: { en: 'Overview Mastery', bn: 'Overview-তে দক্ষতা' },
  objective:
    'Identify, select, compare and synthesise the main features of an IELTS Academic Task 1 visual into a clear, accurate overview — without listing every figure or inventing reasons.',
  estMinutes: 30,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: { en: 'Welcome: What Are We Learning Today?', bn: 'স্বাগতম: আজ আমরা কী শিখব?' },
      trainerMessage: {
        en: 'Welcome to Lesson 04: Overview Mastery. In the previous lesson, you learned how to write an introduction by accurately paraphrasing the question. Now you will learn one of the most important skills in IELTS Academic Writing Task 1: writing an overview. Imagine that someone gives you a chart containing several categories and many figures. They do not have time to study every number. They ask you: "What are the most important things I should notice?" Your job is to answer that question. That is the purpose of an overview.',
        bn: 'Lesson 04: Overview Mastery-তে স্বাগতম। আগের lesson-এ তুমি শিখেছিলে কীভাবে প্রশ্নটা সঠিকভাবে paraphrase করে একটা Introduction লিখতে হয়। এখন তুমি শিখবে IELTS Academic Writing Task 1-এর সবচেয়ে গুরুত্বপূর্ণ skill-গুলোর একটা: Overview লেখা। ধরো, কেউ তোমাকে এমন একটা chart দিল যেখানে অনেকগুলো category আর অনেক figure আছে। তার হাতে প্রতিটা সংখ্যা পড়ার সময় নেই। সে তোমাকে জিজ্ঞেস করল: "সবচেয়ে গুরুত্বপূর্ণ জিনিসগুলো কী, যেগুলো আমার খেয়াল করা উচিত?" তোমার কাজ হলো সেই প্রশ্নের উত্তর দেওয়া। এটাই একটা Overview-এর উদ্দেশ্য।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'By the end of this lesson, you will be able to identify the main features of a visual and summarise them without describing every detail.',
            bn: 'এই lesson শেষে, তুমি একটা visual-এর মূল feature-গুলো চিহ্নিত করতে পারবে আর প্রতিটা detail না বলে সেগুলো summarise করতে পারবে।',
          },
          {
            en: 'An overview is an analytical summary of the most important information in a visual. It is not a second introduction, a list of every number, a detailed description of each category, an explanation of why something happened, a personal opinion, or a conclusion with recommendations.',
            bn: 'Overview হলো একটা visual-এর সবচেয়ে গুরুত্বপূর্ণ তথ্যের একটা analytical summary। এটা দ্বিতীয় একটা Introduction না, প্রতিটা সংখ্যার তালিকা না, প্রতিটা category-র বিস্তারিত বর্ণনা না, কেন কিছু হলো তার ব্যাখ্যা না, ব্যক্তিগত মতামত না, আর recommendation সহ কোনো conclusion-ও না।',
          },
          { en: 'Let us begin with one diagnostic question.', bn: 'চলো, একটা diagnostic প্রশ্ন দিয়ে শুরু করি।' },
        ],
      },
      check: {
        prompt: {
          en: 'A chart shows five categories over two years. What should an overview mainly describe?',
          bn: 'একটা chart-এ দুই বছরের পাঁচটা category দেখানো হয়েছে। একটা Overview মূলত কী বর্ণনা করা উচিত?',
        },
        options: [
          'Every figure shown in the chart.',
          'The most important patterns and comparisons.',
          'The reasons why the figures changed.',
          "The writer's personal opinion.",
        ],
        correctIndex: 1,
        explain: {
          en: 'An overview identifies the most important features. It does not reproduce all the data or invent reasons for changes.',
          bn: 'Overview সবচেয়ে গুরুত্বপূর্ণ feature-গুলো চিহ্নিত করে। এটা সব data আবার লেখে না, বা পরিবর্তনের কারণ বানিয়ে বলে না।',
        },
      },
    },
    {
      id: 'overview-role',
      kind: 'explain',
      title: { en: 'Understand the Role of an Overview', bn: 'Overview-এর ভূমিকাটা বুঝে নাও' },
      trainerMessage: {
        en: 'A standard IELTS Academic Task 1 response usually contains an introduction, an overview and body paragraph(s). Each section has a different job. Read this example carefully, then tell me which sentence does the overview\'s job.',
        bn: 'একটা standard IELTS Academic Task 1 response-এ সাধারণত একটা Introduction, একটা Overview, আর এক বা একাধিক Body Paragraph থাকে। প্রতিটা অংশের কাজ আলাদা। এই example-টা মন দিয়ে পড়ো, তারপর বলো কোন বাক্যটা Overview-এর কাজ করছে।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'Introduction: what does the visual show? Overview: what are the most important things it reveals? Body paragraphs: what are the relevant details and figures?',
            bn: 'Introduction: visual-টা কী দেখাচ্ছে? Overview: এটা সবচেয়ে গুরুত্বপূর্ণ কী কী জিনিস প্রকাশ করছে? Body paragraph: কোন কোন প্রাসঙ্গিক detail আর figure আছে?',
          },
          {
            en: 'Question description: "The chart compares the percentages of commuters using five different transport methods in one city in 2010 and 2023."',
            bn: 'প্রশ্নের বিবরণ: "The chart compares the percentages of commuters using five different transport methods in one city in 2010 and 2023."',
          },
          {
            en: 'Introduction: "The bar chart compares the proportions of commuters who used five forms of transport in a city in 2010 and 2023." This identifies the visual.',
            bn: 'Introduction: "The bar chart compares the proportions of commuters who used five forms of transport in a city in 2010 and 2023." এটা visual-টা কী, তা চিহ্নিত করে।',
          },
          {
            en: 'A possible overview: "Overall, cars remained the most commonly used transport method, although their share declined. By contrast, cycling became considerably more popular, while walking remained unchanged." This tells the reader what matters most.',
            bn: 'একটা সম্ভাব্য overview: "Overall, cars remained the most commonly used transport method, although their share declined. By contrast, cycling became considerably more popular, while walking remained unchanged." এটা পাঠককে বলে দেয় সবচেয়ে গুরুত্বপূর্ণ জিনিসটা কী।',
          },
          {
            en: 'Notice what the overview does: it identifies the dominant category, identifies a major change, highlights a stable category, and avoids listing all the figures.',
            bn: 'লক্ষ্য করো overview-টা কী করছে: এটা dominant category চিহ্নিত করে, একটা বড় পরিবর্তন চিহ্নিত করে, একটা স্থির category তুলে ধরে, আর সব figure তালিকা করা এড়িয়ে যায়।',
          },
        ],
      },
      check: {
        prompt: { en: 'Which sentence performs the role of an overview?', bn: 'কোন বাক্যটা একটা Overview-এর কাজ করছে?' },
        options: [
          'The bar chart compares five transport methods in 2010 and 2023.',
          'Car use fell, but it remained the leading transport method, while cycling recorded the most substantial increase.',
          'Car use was 52% in 2010 and 38% in 2023.',
        ],
        correctIndex: 1,
        explain: {
          en: 'The first sentence is an introduction: it only identifies the visual. The third is a specific data detail for a body paragraph. The second summarises the main features.',
          bn: 'প্রথম বাক্যটা একটা Introduction: এটা শুধু visual-টা কী তা চিহ্নিত করে। তৃতীয়টা একটা body paragraph-এর জন্য একটা নির্দিষ্ট data detail। দ্বিতীয়টা মূল feature-গুলো summarise করে।',
        },
      },
    },
    {
      id: 'read-chart',
      kind: 'guided',
      title: { en: 'Read the Chart Before Selecting Features', bn: 'Feature বেছে নেওয়ার আগে Chart-টা পড়ো' },
      trainerMessage: {
        en: 'Before writing, read the whole chart. Check how many categories there are, what is measured, which years are compared, which value is highest and lowest, and what increased, decreased or stayed the same. Do not start writing after noticing only the first two figures. Answer each question from the chart itself.',
        bn: 'লেখা শুরু করার আগে, পুরো chart-টা পড়ো। দেখো কয়টা category আছে, কী measure করা হচ্ছে, কোন কোন বছর তুলনা করা হচ্ছে, কোন value সবচেয়ে বেশি আর কোনটা সবচেয়ে কম, আর কোনটা বাড়লো, কমলো বা একই রইলো। শুধু প্রথম দুইটা figure দেখেই লেখা শুরু করো না। প্রতিটা প্রশ্নের উত্তর chart থেকেই দাও।',
      },
      material: {
        type: 'chart-board',
        dataset: CHART_DATASETS['commute-methods'],
        tasks: [
          {
            id: 'scope',
            order: 1,
            prompt: {
              en: 'What is being measured, how many categories are shown, and which two years are compared?',
              bn: 'কী measure করা হচ্ছে, কয়টা category দেখানো হয়েছে, আর কোন দুইটা বছর তুলনা করা হচ্ছে?',
            },
            modelAnswer: 'The chart measures the percentage of commuters using each of five transport methods in one city, and it compares 2010 and 2023.',
            belongsIn: 'overview',
          },
          {
            id: 'highest-2010',
            order: 2,
            prompt: { en: 'Which method had the highest percentage in 2010, and what was the figure?', bn: '২০১০ সালে কোন পদ্ধতির percentage সবচেয়ে বেশি ছিল, আর figure-টা কত ছিল?' },
            modelAnswer: 'Car, at 52%.',
            belongsIn: 'overview',
          },
          {
            id: 'lowest-2010',
            order: 3,
            prompt: { en: 'Which method had the lowest percentage in 2010?', bn: '২০১০ সালে কোন পদ্ধতির percentage সবচেয়ে কম ছিল?' },
            modelAnswer: 'Bicycle, at 6%.',
            belongsIn: 'body',
          },
          {
            id: 'unchanged',
            order: 4,
            prompt: { en: 'Which method had exactly the same percentage in both years?', bn: 'কোন পদ্ধতির percentage দুই বছরেই ঠিক একই ছিল?' },
            modelAnswer: 'Walking, at 7% in both 2010 and 2023.',
            belongsIn: 'body',
          },
          {
            id: 'directions',
            order: 5,
            prompt: { en: 'Which methods increased, which decreased, and which stayed the same?', bn: 'কোন কোন পদ্ধতি বেড়েছে, কোনগুলো কমেছে, আর কোনটা একই রয়ে গেছে?' },
            modelAnswer:
              'Bicycle (6% to 19%) and train (11% to 15%) increased. Car (52% to 38%) and bus (24% to 21%) decreased. Walking stayed the same at 7%.',
            belongsIn: 'body',
          },
        ],
      },
    },
    {
      id: 'main-vs-minor',
      kind: 'explain',
      title: { en: 'Main Features Versus Minor Details', bn: 'মূল Feature বনাম ছোটখাটো Detail' },
      trainerMessage: {
        en: 'Not every piece of information in a chart deserves space in an overview. Some features are more important because they reveal the overall pattern.',
        bn: 'একটা chart-এর প্রতিটা তথ্যই Overview-তে জায়গা পাওয়ার যোগ্য না। কিছু feature বেশি গুরুত্বপূর্ণ, কারণ সেগুলো overall pattern প্রকাশ করে।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'A main feature may be the highest or lowest category, a substantial increase or decrease, a category that remains stable, a clear contrast between two groups, a major change in ranking, or a dominant pattern across the visual.',
            bn: 'একটা মূল feature হতে পারে সবচেয়ে বেশি বা সবচেয়ে কম category, একটা বড় ধরনের বৃদ্ধি বা হ্রাস, একটা স্থির category, দুই group-এর মধ্যে একটা স্পষ্ট contrast, ranking-এ একটা বড় পরিবর্তন, অথবা পুরো visual জুড়ে একটা dominant pattern।',
          },
          {
            en: 'A minor detail may be a small difference that does not change the overall picture, a single figure with little comparative importance, a detail better explained in a body paragraph, or a category that adds little to the overall summary.',
            bn: 'একটা ছোটখাটো detail হতে পারে এমন একটা ছোট পার্থক্য যা overall picture বদলায় না, একটা একক figure যার comparative গুরুত্ব কম, এমন একটা detail যা body paragraph-এ ভালোভাবে ব্যাখ্যা করা যায়, অথবা এমন একটা category যা overall summary-তে খুব কম যোগ করে।',
          },
          {
            en: 'In the commute chart, the main features are: car use declined but remained the highest; bicycle use increased substantially; walking remained unchanged. Other relevant observations are that bus use decreased slightly and train use increased. These are accurate, but an overview has limited space, so the writer should prioritise the strongest patterns.',
            bn: 'commute chart-এ, মূল feature-গুলো হলো: car-এর ব্যবহার কমেছে কিন্তু সবচেয়ে বেশি রয়ে গেছে; bicycle-এর ব্যবহার অনেকটা বেড়েছে; walking একই রয়ে গেছে। অন্য প্রাসঙ্গিক observation হলো bus-এর ব্যবহার একটু কমেছে আর train-এর ব্যবহার বেড়েছে। এগুলো সঠিক, কিন্তু একটা overview-তে জায়গা সীমিত, তাই লেখকের সবচেয়ে শক্তিশালী pattern-গুলোকে priority দেওয়া উচিত।',
          },
          {
            en: 'Important distinction: "minor" does not mean "unimportant in every possible chart". Importance depends on the visual. A small category could become a main feature if it changed extraordinarily or overtook a previously dominant category. Do not choose features using a fixed rule such as "always mention the highest and lowest".',
            bn: 'গুরুত্বপূর্ণ একটা পার্থক্য: "minor" মানে এই না যে এটা "যেকোনো chart-এই অগুরুত্বপূর্ণ"। গুরুত্ব নির্ভর করে visual-টার উপর। একটা ছোট category-ও মূল feature হয়ে যেতে পারে যদি সেটা অসাধারণভাবে বদলে যায় বা আগের dominant category-কে ছাড়িয়ে যায়। "সবসময় সবচেয়ে বেশি আর সবচেয়ে কম উল্লেখ করো" — এরকম একটা fixed নিয়ম দিয়ে feature বেছে নিও না।',
          },
        ],
      },
      check: {
        prompt: {
          en: 'Here are five observations about the commute chart: 1. Car remained the highest category despite a decline. 2. Bus fell from 24% to 21%. 3. Bicycle increased from 6% to 19%. 4. Walking remained unchanged. 5. Train increased from 11% to 15%. Which two are best treated as supporting details rather than main features?',
          bn: 'commute chart নিয়ে এখানে পাঁচটা observation দেওয়া হলো: ১. Car কমলেও সবচেয়ে বেশি category হিসেবে রয়ে গেছে। ২. Bus ২৪% থেকে ২১%-এ নেমেছে। ৩. Bicycle ৬% থেকে ১৯%-এ বেড়েছে। ৪. Walking একই রয়ে গেছে। ৫. Train ১১% থেকে ১৫%-এ বেড়েছে। কোন দুইটাকে মূল feature না বলে supporting detail হিসেবে ধরা ভালো?',
        },
        options: ['Observations 1 and 3', 'Observations 2 and 5', 'Observations 3 and 4', 'Observations 4 and 5'],
        correctIndex: 1,
        explain: {
          en: 'The car, bicycle and walking patterns create a strong overall summary. The bus and train movements are useful supporting information, but they are less essential to the main overview of this particular chart. Feature selection is a judgement: a different choice can be acceptable if you can justify why it matters.',
          bn: 'Car, bicycle আর walking-এর pattern মিলে একটা জোরালো overall summary তৈরি করে। Bus আর train-এর পরিবর্তন useful supporting তথ্য, কিন্তু এই নির্দিষ্ট chart-এর মূল overview-এর জন্য ততটা জরুরি না। Feature বেছে নেওয়াটা একটা judgement: অন্য একটা choice-ও গ্রহণযোগ্য হতে পারে যদি তুমি ব্যাখ্যা করতে পারো কেন সেটা গুরুত্বপূর্ণ।',
        },
      },
    },
    {
      id: 'trend-types',
      kind: 'explain',
      title: { en: 'Recognise the Main Types of Trends', bn: 'প্রধান Trend-গুলো চিনে নাও' },
      trainerMessage: {
        en: 'A strong overview often describes how information changes or remains unchanged. Learn to recognise these patterns, and do not use strong language such as "dramatically" or "massively" unless the visual supports it.',
        bn: 'একটা জোরালো overview প্রায়ই বর্ণনা করে তথ্য কীভাবে বদলায় বা একই থাকে। এই pattern-গুলো চিনতে শেখো, আর "dramatically" বা "massively"-এর মতো জোরালো শব্দ তখনই ব্যবহার করো যখন visual সেটাকে support করে।',
      },
      material: {
        type: 'vocab',
        items: [
          {
            phrase: '1. Increase',
            use: { en: 'A value becomes higher. Useful language: increased, rose, grew, became more popular, experienced an upward trend.', bn: 'একটা value বেড়ে যায়। Useful language: increased, rose, grew, became more popular, experienced an upward trend।' },
          },
          {
            phrase: '2. Decrease',
            use: { en: 'A value becomes lower. Useful language: decreased, fell, declined, dropped, became less common.', bn: 'একটা value কমে যায়। Useful language: decreased, fell, declined, dropped, became less common।' },
          },
          {
            phrase: '3. Stability',
            use: {
              en: 'A value remains the same or changes very little. Useful language: remained stable, stayed unchanged, showed little change, remained relatively constant.',
              bn: 'একটা value একই থাকে বা খুব সামান্য বদলায়। Useful language: remained stable, stayed unchanged, showed little change, remained relatively constant।',
            },
          },
          {
            phrase: '4. Dominance',
            use: {
              en: 'One category has a higher value than the others. Useful language: remained the leading category, was the most popular option, recorded the highest proportion.',
              bn: 'একটা category-র value বাকিদের চেয়ে বেশি। Useful language: remained the leading category, was the most popular option, recorded the highest proportion।',
            },
          },
          {
            phrase: '5. Significant change',
            use: {
              en: 'A category experiences a particularly noticeable change. Useful language: increased substantially, experienced the largest rise, saw a marked decline.',
              bn: 'একটা category-তে বিশেষভাবে লক্ষণীয় একটা পরিবর্তন ঘটে। Useful language: increased substantially, experienced the largest rise, saw a marked decline।',
            },
          },
          {
            phrase: 'Applied to the commute chart',
            use: {
              en: 'Car: decrease, but remained dominant. Bus: slight decrease. Bicycle: substantial increase. Train: increase. Walking: stability.',
              bn: 'Car: কমেছে, কিন্তু dominant রয়ে গেছে। Bus: সামান্য কমেছে। Bicycle: অনেকটা বেড়েছে। Train: বেড়েছে। Walking: স্থির।',
            },
          },
        ],
      },
    },
    {
      id: 'trend-check',
      kind: 'check',
      title: { en: 'Identify the Trend (1 of 3)', bn: 'Trend চিহ্নিত করো (১/৩)' },
      trainerMessage: { en: 'Choose the best description of what happened in the commute chart.', bn: 'commute chart-এ কী হয়েছে তার সবচেয়ে ভালো বর্ণনাটা বেছে নাও।' },
      check: {
        prompt: { en: 'Bicycle use rose from 6% to 19%.', bn: 'Bicycle-এর ব্যবহার ৬% থেকে ১৯%-এ বেড়েছে।' },
        options: ['It remained stable.', 'It experienced a substantial increase.', 'It declined slightly.'],
        correctIndex: 1,
        explain: { en: 'The value more than tripled (a rise of 13 percentage points), so "a substantial increase" is accurate.', bn: 'value তিনগুণেরও বেশি হয়ে গেছে (১৩ percentage point বৃদ্ধি), তাই "a substantial increase" বলাটা সঠিক।' },
      },
    },
    {
      id: 'trend-check-2',
      kind: 'check',
      title: { en: 'Identify the Trend (2 of 3)', bn: 'Trend চিহ্নিত করো (২/৩)' },
      trainerMessage: { en: 'Next one.', bn: 'পরেরটা।' },
      check: {
        prompt: { en: 'Walking remained at 7%.', bn: 'Walking ৭%-এ রয়ে গেছে।' },
        options: ['It fluctuated considerably.', 'It experienced a decline.', 'It remained unchanged.'],
        correctIndex: 2,
        explain: { en: 'The value is exactly 7% in both years, so it remained unchanged. Nothing fluctuated or declined.', bn: 'দুই বছরেই value ঠিক ৭%, তাই এটা অপরিবর্তিত রয়ে গেছে। এখানে কোনো ওঠানামা বা হ্রাস হয়নি।' },
      },
    },
    {
      id: 'trend-check-3',
      kind: 'check',
      title: { en: 'Identify the Trend (3 of 3)', bn: 'Trend চিহ্নিত করো (৩/৩)' },
      trainerMessage: { en: 'One more — this time the trend and the ranking together.', bn: 'আরেকটা — এবার trend আর ranking একসাথে।' },
      check: {
        prompt: {
          en: 'Car use fell from 52% to 38%, but was still the highest category in 2023.',
          bn: 'Car-এর ব্যবহার ৫২% থেকে ৩৮%-এ নেমেছে, কিন্তু ২০২৩ সালেও এটা সবচেয়ে বেশি category হিসেবে রয়ে গেছে।',
        },
        options: [
          'It declined while retaining its leading position.',
          'It became the least popular method.',
          'It remained completely unchanged.',
        ],
        correctIndex: 0,
        explain: {
          en: 'Car use fell (a decrease) but 38% was still higher than every other category in 2023, so it stayed the leading method.',
          bn: 'Car-এর ব্যবহার কমেছে (একটা decrease) কিন্তু ২০২৩ সালে ৩৮% বাকি সব category-র চেয়ে বেশি ছিল, তাই এটা leading পদ্ধতি হিসেবেই রয়ে গেছে।',
        },
      },
    },
    {
      id: 'comparisons',
      kind: 'explain',
      title: { en: 'Identify Meaningful Comparisons', bn: 'গুরুত্বপূর্ণ Comparison চিহ্নিত করো' },
      trainerMessage: {
        en: 'A weak overview often describes categories separately. A stronger overview compares them, showing a relationship between contrasting trends.',
        bn: 'একটা দুর্বল overview প্রায়ই category-গুলোকে আলাদা আলাদাভাবে বর্ণনা করে। একটা জোরালো overview সেগুলোকে তুলনা করে, বিপরীত trend-গুলোর মধ্যে একটা সম্পর্ক দেখায়।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'Weak: "Car use decreased. Bicycle use increased." Stronger: "While car use declined, cycling became considerably more popular." The second version shows a relationship between two contrasting trends.',
            bn: 'দুর্বল: "Car use decreased. Bicycle use increased." জোরালো: "While car use declined, cycling became considerably more popular." দ্বিতীয় version-টা দুইটা বিপরীত trend-এর মধ্যে একটা সম্পর্ক দেখায়।',
          },
          {
            en: 'Useful comparison structures include: while, whereas, by contrast, compared with, in contrast to, despite, although. Use them accurately — a comparison should connect information that genuinely contrasts.',
            bn: 'কাজে লাগার মতো comparison structure: while, whereas, by contrast, compared with, in contrast to, despite, although। এগুলো সঠিকভাবে ব্যবহার করো — একটা comparison এমন তথ্যকে connect করা উচিত যা সত্যিকারের বিপরীত।',
          },
          {
            en: 'Worked example. Observation 1: car use fell from 52% to 38%. Observation 2: bicycle use rose from 6% to 19%. Combined overview idea: "Car use declined, whereas cycling became considerably more popular." This is more efficient than treating each category as an unrelated fact.',
            bn: 'একটা worked example। Observation ১: car-এর ব্যবহার ৫২% থেকে ৩৮%-এ নেমেছে। Observation ২: bicycle-এর ব্যবহার ৬% থেকে ১৯%-এ বেড়েছে। মিলিয়ে overview idea: "Car use declined, whereas cycling became considerably more popular." প্রতিটা category-কে আলাদা, অসম্পর্কিত fact হিসেবে ধরার চেয়ে এটা বেশি কার্যকর।',
          },
        ],
      },
      check: {
        prompt: { en: 'Which sentence combines the information most effectively?', bn: 'কোন বাক্যটা তথ্যগুলো সবচেয়ে কার্যকরভাবে একত্র করেছে?' },
        options: [
          'Cars were 52% and then 38%. Bicycles were 6% and then 19%.',
          'Car use declined, whereas cycling experienced a substantial increase.',
          'Cars and bicycles were interesting transport methods.',
        ],
        correctIndex: 1,
        explain: {
          en: 'It accurately connects the opposing trends without unnecessary data listing or opinion. The first is a data list; the third gives an opinion and no information.',
          bn: 'এটা অপ্রয়োজনীয় data তালিকা বা মতামত ছাড়াই বিপরীত trend-গুলোকে সঠিকভাবে connect করে। প্রথমটা একটা data list; তৃতীয়টা একটা মতামত দেয় আর কোনো তথ্য দেয় না।',
        },
      },
    },
    {
      id: 'select-features',
      kind: 'explain',
      title: { en: 'Select the Most Important Features', bn: 'সবচেয়ে গুরুত্বপূর্ণ Feature বেছে নাও' },
      trainerMessage: {
        en: 'This is the central analytical skill of the lesson. You may notice many accurate observations, but you cannot include all of them in a concise overview. Use the four-question selection test, then try it yourself.',
        bn: 'এটাই এই lesson-এর মূল analytical skill। তুমি হয়তো অনেক সঠিক observation খেয়াল করবে, কিন্তু একটা সংক্ষিপ্ত overview-তে সেগুলো সব রাখা যাবে না। চার-প্রশ্নের selection test ব্যবহার করো, তারপর নিজে চেষ্টা করো।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'The selection test. 1. Is it prominent — does it stand out in the chart? 2. Is it meaningful — does it help explain the overall pattern? 3. Is it comparative — does it reveal a useful relationship between categories or time periods? 4. Is it accurate — can you support it directly with the chart?',
            bn: 'Selection test। ১. এটা কি prominent — chart-এ কি এটা চোখে পড়ে? ২. এটা কি meaningful — এটা কি overall pattern বুঝতে সাহায্য করে? ৩. এটা কি comparative — এটা কি category বা সময়কালের মধ্যে একটা useful সম্পর্ক দেখায়? ৪. এটা কি accurate — তুমি কি সরাসরি chart দিয়ে এটা support করতে পারো?',
          },
          {
            en: 'For the commute chart: "Car remained highest" is high importance (it identifies the dominant category). "Bicycle increased considerably" is high (the strongest increase). "Walking remained unchanged" is high (a clear contrasting pattern). "Bus declined slightly" and "train increased" are supporting (smaller movements, relevant but less prominent).',
            bn: 'commute chart-এর জন্য: "Car remained highest" উচ্চ গুরুত্বের (এটা dominant category চিহ্নিত করে)। "Bicycle increased considerably" উচ্চ (সবচেয়ে বড় বৃদ্ধি)। "Walking remained unchanged" উচ্চ (একটা স্পষ্ট বিপরীত pattern)। "Bus declined slightly" আর "train increased" সহায়ক (ছোট পরিবর্তন, প্রাসঙ্গিক কিন্তু কম prominent)।',
          },
          {
            en: 'A possible selected set: car remained the dominant method despite a decline; bicycle use rose considerably; walking remained unchanged.',
            bn: 'একটা সম্ভাব্য বেছে নেওয়া সেট: car কমলেও dominant পদ্ধতি রয়ে গেছে; bicycle-এর ব্যবহার অনেকটা বেড়েছে; walking একই রয়ে গেছে।',
          },
          {
            en: 'Warning: do not automatically choose the first three categories, the three biggest numbers, or the first increase, decrease and stable category without considering context. The most important features depend on the visual.',
            bn: 'সতর্কতা: context বিবেচনা না করে স্বয়ংক্রিয়ভাবে প্রথম তিনটা category, সবচেয়ে বড় তিনটা সংখ্যা, বা প্রথম increase, decrease আর stable category বেছে নিও না। সবচেয়ে গুরুত্বপূর্ণ feature নির্ভর করে visual-টার উপর।',
          },
          {
            en: 'Observations. A: Car use declined but remained the highest. B: Bus use fell slightly. C: Bicycle use increased considerably. D: Walking remained unchanged. E: Train use increased moderately. F: The chart shows five transport categories.',
            bn: 'Observation। A: Car-এর ব্যবহার কমেছে কিন্তু সবচেয়ে বেশি রয়ে গেছে। B: Bus-এর ব্যবহার সামান্য কমেছে। C: Bicycle-এর ব্যবহার অনেকটা বেড়েছে। D: Walking একই রয়ে গেছে। E: Train-এর ব্যবহার মাঝারিভাবে বেড়েছে। F: Chart-টা পাঁচটা transport category দেখাচ্ছে।',
          },
        ],
      },
      check: {
        prompt: { en: 'Which three observations (A–F above) best summarise the commute chart?', bn: 'উপরের (A–F) observation-গুলোর মধ্যে কোন তিনটা commute chart-কে সবচেয়ে ভালো summarise করে?' },
        options: ['A, B and E', 'B, C and F', 'A, C and D', 'A, D and F'],
        correctIndex: 2,
        explain: {
          en: 'A identifies the dominant category and its direction of change. C is the strongest increase. D is a stable category that contrasts with the rest. B and E are accurate supporting details but less central to this overview. F describes the visual instead of summarising its findings, which is the introduction\'s job.',
          bn: 'A dominant category আর তার পরিবর্তনের দিক চিহ্নিত করে। C সবচেয়ে বড় বৃদ্ধি। D একটা স্থির category যা বাকিদের সাথে contrast তৈরি করে। B আর E সঠিক supporting detail কিন্তু এই overview-তে ততটা central না। F visual-টা কী তা বর্ণনা করে, এর findings summarise করে না — আর এটা Introduction-এর কাজ।',
        },
      },
    },
    {
      id: 'build-overview',
      kind: 'demonstrate',
      title: { en: 'Build an Overview from Selected Features', bn: 'বেছে নেওয়া Feature থেকে একটা Overview তৈরি করো' },
      trainerMessage: {
        en: 'Now turn your selected observations into a coherent summary. Do not write each observation as an isolated sentence. First group related ideas.',
        bn: 'এখন তোমার বেছে নেওয়া observation-গুলোকে একটা সুসংগত summary-তে রূপান্তর করো। প্রতিটা observation আলাদা একটা বাক্য হিসেবে লিখো না। প্রথমে related idea-গুলোকে group করো।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'Group 1 — dominant category: car remained the most commonly used method despite a decline. Group 2 — contrasting movement: bicycle use increased substantially. Group 3 — stability: walking remained unchanged.',
            bn: 'Group ১ — dominant category: car কমলেও সবচেয়ে বেশি ব্যবহৃত পদ্ধতি রয়ে গেছে। Group ২ — বিপরীত পরিবর্তন: bicycle-এর ব্যবহার অনেকটা বেড়েছে। Group ৩ — স্থিরতা: walking একই রয়ে গেছে।',
          },
          {
            en: 'Worked overview: "Overall, cars remained the most commonly used form of transport, although their share declined over the period. By contrast, cycling became considerably more popular, while walking remained unchanged."',
            bn: 'একটা worked overview: "Overall, cars remained the most commonly used form of transport, although their share declined over the period. By contrast, cycling became considerably more popular, while walking remained unchanged."',
          },
          {
            en: 'Why this works: it identifies the leading category; it describes the direction of change; it highlights the most notable increase; it includes a stable category; it does not list every figure; it does not invent reasons for the changes; and it describes the chart accurately.',
            bn: 'এটা কেন কাজ করে: এটা leading category চিহ্নিত করে; পরিবর্তনের দিক বর্ণনা করে; সবচেয়ে উল্লেখযোগ্য বৃদ্ধিটা তুলে ধরে; একটা স্থির category অন্তর্ভুক্ত করে; প্রতিটা figure তালিকা করে না; পরিবর্তনের কারণ বানিয়ে বলে না; আর chart-টাকে সঠিকভাবে বর্ণনা করে।',
          },
          {
            en: 'Important note: the word "Overall" is optional. The analytical content matters more than the opening phrase.',
            bn: 'গুরুত্বপূর্ণ একটা নোট: "Overall" শব্দটা optional। শুরুর phrase-এর চেয়ে analytical content-টাই বেশি গুরুত্বপূর্ণ।',
          },
          {
            en: 'Here is a weaker attempt: "Overall, car use was 52% in 2010 and 38% in 2023. Bus use was 24% and 21%. Bicycle use was 6% and 19%. Train use was 11% and 15%. Walking was 7% in both years."',
            bn: 'এখানে একটা দুর্বল চেষ্টা দেওয়া হলো: "Overall, car use was 52% in 2010 and 38% in 2023. Bus use was 24% and 21%. Bicycle use was 6% and 19%. Train use was 11% and 15%. Walking was 7% in both years."',
          },
        ],
      },
      check: {
        prompt: { en: 'What is the main weakness of the weaker attempt above?', bn: 'উপরের দুর্বল চেষ্টাটার মূল দুর্বলতা কী?' },
        options: [
          'It contains too many individual figures and reads like a data list.',
          'It invents a reason for the changes.',
          'It describes the wrong location.',
        ],
        correctIndex: 0,
        explain: {
          en: 'Every figure is correct, but the paragraph reads off the data instead of summarising it. Despite starting with "Overall", it never says which category led or which change mattered most.',
          bn: 'প্রতিটা figure সঠিক, কিন্তু paragraph-টা data summarise না করে সেটাকে শুধু পড়ে শোনাচ্ছে। "Overall" দিয়ে শুরু করলেও, এটা কখনো বলে না কোন category সবচেয়ে এগিয়ে বা কোন পরিবর্তনটা সবচেয়ে গুরুত্বপূর্ণ।',
        },
      },
    },
    {
      id: 'write-overview',
      kind: 'explain',
      title: { en: 'Write a Clear One- or Two-Sentence Overview', bn: 'একটা স্পষ্ট এক বা দুই-বাক্যের Overview লেখো' },
      trainerMessage: {
        en: 'A strong overview does not need complicated grammar. It needs accurate feature selection, clear comparison, correct trend language, logical grouping and concise expression. Two sentences are a useful training target, not a universal IELTS rule — a clear one-sentence overview can also be effective.',
        bn: 'একটা জোরালো overview-তে জটিল grammar লাগে না। এর দরকার সঠিক feature selection, স্পষ্ট comparison, সঠিক trend language, logical grouping আর সংক্ষিপ্ত প্রকাশ। দুইটা বাক্য একটা useful training লক্ষ্য, কোনো universal IELTS নিয়ম না — একটা স্পষ্ট এক-বাক্যের overview-ও কার্যকর হতে পারে।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'A useful planning method (not a mandatory formula). Sentence 1: identify the dominant overall pattern or the most important category. Sentence 2: describe the strongest contrasting change or another important feature.',
            bn: 'একটা useful planning পদ্ধতি (কোনো বাধ্যতামূলক formula না)। বাক্য ১: dominant overall pattern বা সবচেয়ে গুরুত্বপূর্ণ category চিহ্নিত করো। বাক্য ২: সবচেয়ে শক্তিশালী বিপরীত পরিবর্তন বা অন্য একটা গুরুত্বপূর্ণ feature বর্ণনা করো।',
          },
          {
            en: 'Example. Sentence 1: "Cars remained the leading transport method, although their share decreased." Sentence 2: "By contrast, cycling became considerably more popular, while walking showed no change."',
            bn: 'উদাহরণ। বাক্য ১: "Cars remained the leading transport method, although their share decreased." বাক্য ২: "By contrast, cycling became considerably more popular, while walking showed no change."',
          },
          {
            en: 'Alternative valid overview: "Although car use fell, it continued to account for the largest proportion of commuters in 2023. Cycling recorded the most substantial increase, whereas walking remained stable." Both versions communicate the main features accurately.',
            bn: 'আরেকটা গ্রহণযোগ্য overview: "Although car use fell, it continued to account for the largest proportion of commuters in 2023. Cycling recorded the most substantial increase, whereas walking remained stable." দুইটা version-ই মূল feature-গুলো সঠিকভাবে প্রকাশ করে।',
          },
          {
            en: 'Avoid these mistakes: writing an introduction again; giving exact figures for every category; repeating the same idea in different words; making unsupported claims; describing only one category; writing a vague sentence such as "There were many changes."',
            bn: 'এই ভুলগুলো এড়িয়ে চলো: আবার একটা Introduction লেখা; প্রতিটা category-র জন্য সঠিক figure দেওয়া; একই idea ভিন্ন শব্দে বারবার বলা; support ছাড়া দাবি করা; শুধু একটা category বর্ণনা করা; "There were many changes."-এর মতো একটা অস্পষ্ট বাক্য লেখা।',
          },
        ],
      },
    },
    {
      id: 'visual-types',
      kind: 'explain',
      title: { en: 'Overviews Across Different Visual Types', bn: 'বিভিন্ন ধরনের Visual-এ Overview' },
      trainerMessage: {
        en: 'The method of identifying main features is transferable, but the features themselves depend on the visual. For a process diagram, the overview usually summarises the overall process rather than describing trends; for a map, it summarises the major changes rather than listing every building.',
        bn: 'মূল feature চিহ্নিত করার পদ্ধতিটা সব জায়গায় কাজে লাগে, কিন্তু feature-গুলো নির্ভর করে visual-টার উপর। একটা process diagram-এর জন্য, overview সাধারণত trend বর্ণনা না করে পুরো process-টা summarise করে; একটা map-এর জন্য, এটা প্রতিটা building তালিকা না করে বড় পরিবর্তনগুলো summarise করে।',
      },
      material: {
        type: 'vocab',
        items: [
          {
            phrase: 'Line graph',
            use: { en: 'Look for the overall direction, highest and lowest points, major rises and falls, stability or fluctuation, and important intersections.', bn: 'খেয়াল করো overall direction, সবচেয়ে বেশি আর সবচেয়ে কম point, বড় উত্থান-পতন, স্থিরতা বা ওঠানামা, আর গুরুত্বপূর্ণ intersection-গুলো।' },
          },
          {
            phrase: 'Bar chart',
            use: { en: 'Look for the leading and lowest categories, major differences, changes between time periods (if shown), and similarities and contrasts.', bn: 'খেয়াল করো leading আর সবচেয়ে কম category, বড় পার্থক্য, সময়কালের মধ্যে পরিবর্তন (যদি দেখানো থাকে), আর মিল আর contrast-গুলো।' },
          },
          {
            phrase: 'Pie chart',
            use: { en: 'Look for the largest and smallest proportions, dominant categories, and major differences between groups or years.', bn: 'খেয়াল করো সবচেয়ে বড় আর সবচেয়ে ছোট proportion, dominant category, আর group বা বছরের মধ্যে বড় পার্থক্য।' },
          },
          {
            phrase: 'Table',
            use: { en: 'Look for the highest and lowest values, consistent patterns, important differences, and significant exceptions.', bn: 'খেয়াল করো সবচেয়ে বেশি আর সবচেয়ে কম value, consistent pattern, গুরুত্বপূর্ণ পার্থক্য, আর উল্লেখযোগ্য ব্যতিক্রম।' },
          },
          {
            phrase: 'Map',
            use: {
              en: 'Look for the major development or transformation, features that disappeared or were added, areas that remained unchanged, and overall changes in land use or layout.',
              bn: 'খেয়াল করো বড় development বা পরিবর্তন, যেসব feature হারিয়ে গেছে বা যোগ হয়েছে, যেসব এলাকা একই রয়ে গেছে, আর land use বা layout-এ overall পরিবর্তন।',
            },
          },
          {
            phrase: 'Process diagram',
            use: { en: 'Look for the starting point and final outcome, the major stages, whether the process is linear or cyclical, and important transformations.', bn: 'খেয়াল করো শুরুর পয়েন্ট আর চূড়ান্ত outcome, প্রধান stage-গুলো, process-টা linear না cyclical, আর গুরুত্বপূর্ণ পরিবর্তনগুলো।' },
          },
          {
            phrase: 'The same principle',
            use: { en: 'Identify the most important information and summarise it accurately.', bn: 'সবচেয়ে গুরুত্বপূর্ণ তথ্যটা চিহ্নিত করো আর সেটা সঠিকভাবে summarise করো।' },
          },
        ],
      },
    },
    {
      id: 'visual-types-check',
      kind: 'check',
      title: { en: 'Transfer Check (1 of 2)', bn: 'Transfer Check (১/২)' },
      trainerMessage: { en: 'Let us check the transfer to other visuals.', bn: 'চলো দেখি অন্য visual-এও এটা কীভাবে কাজে লাগে।' },
      check: {
        prompt: { en: 'In a process diagram, which feature is generally most important for an overview?', bn: 'একটা process diagram-এ, overview-র জন্য সাধারণত কোন feature-টা সবচেয়ে গুরুত্বপূর্ণ?' },
        options: [
          "Every machine's exact position.",
          'The overall sequence and final outcome.',
          "The writer's opinion about the process.",
        ],
        correctIndex: 1,
        explain: {
          en: 'An overview of a process summarises how it runs from start to finish, not the detail of each piece of equipment, and never an opinion.',
          bn: 'একটা process-এর overview সেটা শুরু থেকে শেষ পর্যন্ত কীভাবে চলে তা summarise করে, প্রতিটা যন্ত্রের detail না, আর কখনোই কোনো মতামত না।',
        },
      },
    },
    {
      id: 'visual-types-check-2',
      kind: 'check',
      title: { en: 'Transfer Check (2 of 2)', bn: 'Transfer Check (২/২)' },
      trainerMessage: { en: 'And a map.', bn: 'আর একটা map।' },
      check: {
        prompt: { en: 'In a map comparison, what should the overview focus on?', bn: 'একটা map comparison-এ, overview-টার focus কোথায় থাকা উচিত?' },
        options: ['Every street name.', 'The major transformations and unchanged features.', 'The colour of the map.'],
        correctIndex: 1,
        explain: { en: 'An overview of maps summarises the main changes (and what stayed the same), not every individual label.', bn: 'Map-এর overview মূল পরিবর্তনগুলো (আর কোনটা একই রয়ে গেছে) summarise করে, প্রতিটা আলাদা label না।' },
      },
    },
    {
      id: 'common-errors',
      kind: 'demonstrate',
      title: { en: 'Avoid Common Overview Errors', bn: 'সাধারণ Overview ভুলগুলো এড়িয়ে চলো' },
      trainerMessage: {
        en: 'Here are six common errors, each with the problem and a better version. Notice that every "better" version is built from what the chart actually shows.',
        bn: 'এখানে ছয়টা সাধারণ ভুল দেওয়া হলো, প্রতিটার সমস্যা আর একটা ভালো version-সহ। লক্ষ্য করো প্রতিটা "better" version chart-টা আসলে কী দেখাচ্ছে তার উপর ভিত্তি করে তৈরি।',
      },
      material: {
        type: 'vocab',
        items: [
          {
            phrase: 'Error 1 — Data dumping',
            use: {
              en: 'Weak: "Cars were 52%, buses were 24%, bicycles were 6%, trains were 11%, and walking was 7%." Problem: this lists figures without summarising the overall pattern. Better: "In 2010, cars were the dominant transport method, whereas cycling was the least common."',
              bn: 'দুর্বল: "Cars were 52%, buses were 24%, bicycles were 6%, trains were 11%, and walking was 7%." সমস্যা: এটা overall pattern summarise না করে শুধু figure তালিকা করে। ভালো: "In 2010, cars were the dominant transport method, whereas cycling was the least common."',
            },
          },
          {
            phrase: 'Error 2 — Missing the dominant feature',
            use: {
              en: 'Weak: "Bus use decreased and train use increased." Problem: this ignores the leading category and the strongest change. Better: "Cars remained the most popular option despite a decline, while cycling recorded the strongest increase."',
              bn: 'দুর্বল: "Bus use decreased and train use increased." সমস্যা: এটা leading category আর সবচেয়ে বড় পরিবর্তনটা বাদ দিয়ে দেয়। ভালো: "Cars remained the most popular option despite a decline, while cycling recorded the strongest increase."',
            },
          },
          {
            phrase: 'Error 3 — Incorrect trend',
            use: {
              en: 'Weak: "Car use increased between 2010 and 2023." Problem: the figures show a decline from 52% to 38%. Better: "Car use declined over the period."',
              bn: 'দুর্বল: "Car use increased between 2010 and 2023." সমস্যা: figure-গুলো দেখায় ৫২% থেকে ৩৮%-এ কমেছে। ভালো: "Car use declined over the period."',
            },
          },
          {
            phrase: 'Error 4 — Unsupported explanation',
            use: {
              en: 'Weak: "People used bicycles more because the government built new cycle lanes." Problem: the chart does not explain why the change occurred. Better: "Bicycle use increased considerably."',
              bn: 'দুর্বল: "People used bicycles more because the government built new cycle lanes." সমস্যা: chart-টা কেন পরিবর্তন হলো তার ব্যাখ্যা দেয় না। ভালো: "Bicycle use increased considerably."',
            },
          },
          {
            phrase: 'Error 5 — Overgeneralisation',
            use: {
              en: 'Weak: "All forms of public transport became more popular." Problem: the chart shows bus use decreasing, although train use increased. Better: "Train use increased, whereas bus use declined slightly."',
              bn: 'দুর্বল: "All forms of public transport became more popular." সমস্যা: chart-এ bus-এর ব্যবহার কমতে দেখা যায়, যদিও train-এর ব্যবহার বেড়েছে। ভালো: "Train use increased, whereas bus use declined slightly."',
            },
          },
          {
            phrase: 'Error 6 — Vague overview',
            use: {
              en: 'Weak: "Overall, there were some differences between the years." Problem: it does not identify any actual feature. Better: "Car use declined but remained dominant, while cycling became substantially more popular."',
              bn: 'দুর্বল: "Overall, there were some differences between the years." সমস্যা: এটা আসলে কোনো feature চিহ্নিত করে না। ভালো: "Car use declined but remained dominant, while cycling became substantially more popular."',
            },
          },
        ],
      },
    },
    {
      id: 'guided-analysis',
      kind: 'guided',
      title: { en: 'Guided Practice: Analyse Before Writing', bn: 'Guided Practice: লেখার আগে Analyse করো' },
      trainerMessage: {
        en: 'Now analyse the commute chart in four activities: identify, compare, group, and plan. Answer in your own words, and for the last one explain why your chosen features matter. After you check each answer, compare your reasoning with the model — a different, well-justified choice can also be valid.',
        bn: 'এখন চারটা activity-তে commute chart-টা analyse করো: identify, compare, group, আর plan। নিজের ভাষায় উত্তর দাও, আর শেষটায় ব্যাখ্যা করো কেন তোমার বেছে নেওয়া feature-গুলো গুরুত্বপূর্ণ। প্রতিটা উত্তর check করার পর, তোমার reasoning model-এর সাথে মিলিয়ে দেখো — ভিন্ন কিন্তু যুক্তিসঙ্গত একটা choice-ও গ্রহণযোগ্য হতে পারে।',
      },
      material: {
        type: 'chart-board',
        dataset: CHART_DATASETS['commute-methods'],
        tasks: [
          {
            id: 'identify',
            order: 1,
            prompt: {
              en: 'Activity A — Identify: name (1) the highest category in 2023, (2) the category with the largest increase, and (3) the category that remained unchanged.',
              bn: 'Activity A — Identify: বলো (১) ২০২৩ সালে সবচেয়ে বেশি category কোনটা, (২) সবচেয়ে বড় বৃদ্ধি কোন category-তে, আর (৩) কোন category একই রয়ে গেছে।',
            },
            modelAnswer: 'The highest category in 2023 was car (38%). The largest increase was bicycle (6% to 19%). Walking remained unchanged (7% in both years).',
            belongsIn: 'overview',
          },
          {
            id: 'compare',
            order: 2,
            prompt: { en: 'Activity B — Compare: complete the idea in your own words. "Car use declined, whereas ..."', bn: 'Activity B — Compare: নিজের ভাষায় idea-টা সম্পূর্ণ করো। "Car use declined, whereas ..."' },
            modelAnswer: '"... cycling increased considerably." Any accurate equivalent is fine, for example "cycling became much more popular".',
            belongsIn: 'overview',
          },
          {
            id: 'group',
            order: 3,
            prompt: {
              en: 'Activity C — Group: sort these observations for an overview — car decline, bicycle increase, walking stability, bus decline, train increase. Which belong together as a contrast, which is a separate feature, and which are supporting details?',
              bn: 'Activity C — Group: একটা overview-এর জন্য এই observation-গুলো সাজাও — car-এর হ্রাস, bicycle-এর বৃদ্ধি, walking-এর স্থিরতা, bus-এর হ্রাস, train-এর বৃদ্ধি। কোনগুলো একসাথে একটা contrast হিসেবে যায়, কোনটা আলাদা একটা feature, আর কোনগুলো supporting detail?',
            },
            modelAnswer:
              'Car decline and bicycle increase form a useful contrast. Walking stability is another useful feature. The bus and train changes are supporting details.',
            belongsIn: 'overview',
          },
          {
            id: 'plan',
            order: 4,
            prompt: {
              en: 'Activity D — Plan: choose the best two features for a short overview and explain why each matters. A: car remained dominant despite declining. B: bicycle experienced the strongest increase. C: bus fell from 24% to 21%. D: train rose from 11% to 15%.',
              bn: 'Activity D — Plan: একটা ছোট overview-এর জন্য সবচেয়ে ভালো দুইটা feature বেছে নাও আর ব্যাখ্যা করো কেন প্রতিটা গুরুত্বপূর্ণ। A: car কমলেও dominant রয়ে গেছে। B: bicycle-এ সবচেয়ে বড় বৃদ্ধি হয়েছে। C: bus ২৪% থেকে ২১%-এ নেমেছে। D: train ১১% থেকে ১৫%-এ বেড়েছে।',
            },
            modelAnswer:
              'A and B. Together they give the leading category and its direction, and the clearest contrasting change. Walking stability is an acceptable additional feature; the bus and train figures are supporting details for a body paragraph.',
            belongsIn: 'overview',
          },
        ],
      },
    },
    {
      id: 'clinic',
      kind: 'check',
      title: 'Misconception Clinic (1 of 4)',
      trainerMessage: 'Each question targets a specific error. A learner writes: "Car use was 52% in 2010 and 38% in 2023, while bus use was 24% and 21%."',
      check: {
        prompt: 'What is the main problem?',
        options: [
          'The figures are incorrect.',
          'The response focuses on individual figures instead of the main overall patterns.',
          'The response uses the wrong tense.',
        ],
        correctIndex: 1,
        explain:
          'The figures are accurate, but the statement does not provide a sufficiently broad summary. It should identify the dominant category and significant changes.',
      },
    },
    {
      id: 'clinic-2',
      kind: 'check',
      title: 'Misconception Clinic (2 of 4)',
      trainerMessage: 'A learner writes: "People increasingly chose bicycles because fuel prices became expensive."',
      check: {
        prompt: 'What is wrong?',
        options: [
          'The sentence uses a comparative structure.',
          'The chart does not provide evidence for the cause.',
          'The sentence is too short.',
        ],
        correctIndex: 1,
        explain: 'A Task 1 overview should describe what the visual shows. It must not invent reasons.',
      },
    },
    {
      id: 'clinic-3',
      kind: 'check',
      title: 'Misconception Clinic (3 of 4)',
      trainerMessage: 'A learner writes: "Walking became more popular between 2010 and 2023."',
      check: {
        prompt: 'What is wrong?',
        options: [
          'Walking remained at 7% in both years, so it did not become more popular.',
          'Walking was the highest category.',
          'Walking disappeared in 2023.',
        ],
        correctIndex: 0,
        explain: 'The chart shows 7% in 2010 and 7% in 2023: walking was unchanged. Claiming a rise is a false trend, however fluent the sentence is.',
      },
    },
    {
      id: 'clinic-4',
      kind: 'check',
      title: 'Misconception Clinic (4 of 4)',
      trainerMessage: 'Back to accurate paraphrasing. The original map description is: "The maps show changes to a town centre between 1990 and 2020."',
      check: {
        prompt: 'Which paraphrase preserves the meaning most accurately?',
        options: [
          'The maps illustrate how a town centre changed between 1990 and 2020.',
          'The maps compare the layout of a town centre between 1990 and 2020.',
          'The maps show the construction of new buildings in a town centre.',
        ],
        correctIndex: 0,
        explain:
          'The original says "changes", which can include several types of transformation. "Layout" narrows the meaning to one aspect, while the third option introduces a specific type of change that may not be supported.',
      },
    },
    {
      id: 'reflection',
      kind: 'review',
      title: 'Reflection: Before You Write Your Overview',
      trainerMessage:
        'Before the final exercise, check that you can answer these five questions in your own words. Then compare with the suggested understanding.',
      material: {
        type: 'text',
        paragraphs: [
          '1. What is the main purpose of an overview? — To summarise the most important features.',
          '2. Why should you avoid listing every figure? — Because an overview should synthesise, not reproduce the data.',
          '3. How do you decide which features are most important? — By examining prominence, meaningful change, comparisons and accuracy.',
          '4. What is the difference between describing a change and explaining its cause? — Describing a change reports what the chart shows; explaining a cause introduces a reason that may not be provided.',
          '5. Can a one-sentence overview be effective? — Yes, if it clearly communicates the main features.',
          'You can now identify dominant features, recognise important trends, compare categories, group related observations, and write a concise overview. Remember: do not describe everything you see. Explain what matters most. After the final exercise, your next lesson is Lesson 05 — Body Paragraph Development.',
        ],
      },
    },
    {
      id: 'independent-practice',
      kind: 'independent',
      title: 'Final Independent Practice',
      trainerMessage:
        'Now it is your turn. Study the chart as long as you need — this focused exercise has no exam time limit. Write only the overview: no introduction and no body paragraphs. Think first: what is the biggest pattern, what is the most meaningful comparison, and which details can safely be left out?',
      material: {
        type: 'text',
        paragraphs: [
          'The chart: the percentage of commuters using five transport methods in one city, 2010 and 2023. Car: 52% then 38%. Bus: 24% then 21%. Bicycle: 6% then 19%. Train: 11% then 15%. Walking: 7% then 7%.',
          'Write a clear overview of the chart in approximately two sentences. Identify the most important overall features, include accurate comparisons, highlight the most significant changes, avoid listing every figure, and avoid explaining reasons that are not shown in the chart.',
          'This is an overview-only skill exercise. Model answers are examples, not strings you must reproduce: any accurate overview that identifies the main features and expresses them clearly is acceptable.',
        ],
      },
    },
  ],
  finalPrompt: {
    title: 'Write Your Own Overview',
    instructions:
      'Write a clear overview of the commute chart in approximately two sentences. Your overview should identify the most important overall features, include accurate comparisons, highlight the most significant changes, avoid listing every figure, and avoid explaining reasons that are not shown in the chart. You do not need to write an introduction or body paragraphs. This is an overview-only skill exercise.',
    minWords: 25,
    chartId: 'commute-methods',
    skillFocus: 'Task 1 overview feature selection and synthesis',
    checkScope: 'overview-only',
  },
};
