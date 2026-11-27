import type { Lesson } from '../types';
import {
  ACCOMMODATION_DATA_READING_TASKS,
  ACCOMMODATION_MISTAKE_TASKS,
  ACCOMMODATION_PLANNING_TASKS,
  ACCOMMODATION_SENTENCE_TASKS,
  ACCOMMODATION_TREND_TASKS,
  ACCOMMODATION_WRITING_TASKS,
  CAMBRIDGE_13_T2_OWNED_RENTED,
} from '../bar-charts';

/**
 * Bar Chart Mastery — Lesson 02: "Long-term Changes and Reversing Trends".
 * Cambridge IELTS 13 Academic, Test 2, Writing Task 1 — a genuinely
 * different teaching case from Lesson 01: a DYNAMIC, nine-year comparison
 * with an opposing-trends crossover (1971) and a late-decade reversal
 * (2001-2011), rather than Lesson 01's single-year static comparison. Every
 * chart-board question here is evaluated by the same Mino AI evaluator
 * Lesson 01 introduced (lib/ai/server/assess/chart-answer.ts) — no new
 * evaluation engine.
 */
export const barChartMasteryLesson2: Lesson = {
  id: 'bar-chart-mastery-2',
  task: 'task1',
  moduleId: 'task1-visual-bar-charts',
  title: 'Long-term Changes and Reversing Trends',
  objective: {
    en: 'Read a dynamic, multi-year grouped bar chart: recognise opposing long-term trends, identify a crossover point and a late reversal, and write a complete, accurate Task 1 report from a real Cambridge IELTS chart.',
    bn: 'একটা dynamic, multi-year grouped bar chart পড়া: বিপরীতমুখী long-term trend চিহ্নিত করা, একটা crossover point আর একটা late reversal খুঁজে বের করা, আর একটা real Cambridge IELTS chart থেকে একটা সম্পূর্ণ, নির্ভুল Task 1 report লেখা।',
  },
  estMinutes: 55,
  steps: [
    // ---------------------------------------------------------------- 1. welcome
    {
      id: 'welcome',
      kind: 'intro',
      title: { en: 'Understanding Long-term Bar Chart Changes', bn: 'Long-term Bar Chart পরিবর্তন বোঝা' },
      trainerMessage: {
        en: "Welcome! In the previous lesson, we learned how to compare different groups within a bar chart. Now we'll look at a slightly different kind of chart. Here, the same two things — owned accommodation and rented accommodation — are shown changing across several years. There's something important in this chart: as one category rose, the other fell. And in one particular year, the two categories became exactly equal. So it's not enough to just see which is higher or lower — you need to understand when things changed, where the two trends met, and what happened at the very end. Let's learn it step by step.",
        bn: 'স্বাগতম! আগের lesson-এ আমরা শিখেছি কীভাবে একটি Bar Chart থেকে বিভিন্ন group-এর মধ্যে তুলনা করতে হয়। এবার আমরা একটু ভিন্ন ধরনের chart দেখব। এখানে একই দুটি বিষয়—owned accommodation এবং rented accommodation—বিভিন্ন বছরের মধ্যে কীভাবে পরিবর্তিত হয়েছে, তা দেখানো হয়েছে। এই chart-এ একটি গুরুত্বপূর্ণ বিষয় আছে: একটি category বাড়ার সঙ্গে সঙ্গে অন্য category কমেছে। আবার একটি নির্দিষ্ট বছরে দুটি category সমান হয়ে গেছে। তাই শুধু বেশি বা কম দেখলেই হবে না। কখন পরিবর্তন হয়েছে, কোথায় দুটি trend মিলেছে এবং শেষ দিকে কী পরিবর্তন ঘটেছে—সেগুলোও বুঝতে হবে। চলুন, ধাপে ধাপে শিখি।',
      },
    },

    // ---------------------------------------------------------------- 2. chart structure
    {
      id: 'chart-structure',
      kind: 'explain',
      title: { en: 'Understand What the Chart Shows', bn: 'Chart কী দেখাচ্ছে বুঝুন' },
      trainerMessage: {
        en: 'First, separate out the chart\'s own facts before comparing anything.',
        bn: 'তুলনা করার আগে প্রথমে chart-এর নিজের তথ্যগুলো আলাদা করে বুঝে নিন।',
      },
      material: {
        type: 'text',
        paragraphs: [
          { en: 'Title: what is being compared? Households in England and Wales that owned or rented their accommodation, from 1918 to 2011.', bn: 'Title: কী তুলনা করা হচ্ছে? England আর Wales-এর household, যারা নিজেদের accommodation-এ owned বা rented ছিল, 1918 থেকে 2011 পর্যন্ত।' },
          { en: 'X-axis: nine specific years — 1918, 1939, 1953, 1961, 1971, 1981, 1991, 2001, 2011. These years are NOT evenly spaced; the gap between them varies (21 years, then 14, then 8, and so on).', bn: 'X-axis: নয়টা নির্দিষ্ট বছর — 1918, 1939, 1953, 1961, 1971, 1981, 1991, 2001, 2011। এই বছরগুলো সমান দূরত্বে নেই; তাদের মধ্যের ব্যবধান আলাদা আলাদা (21 বছর, তারপর 14, তারপর 8, এভাবে)।' },
          { en: 'Y-axis: percentage of households, not the number of houses.', bn: 'Y-axis: household-এর percentage, বাড়ির সংখ্যা না।' },
          { en: 'Series: Owned accommodation (households that own where they live) and Rented accommodation (households that rent). These two are complementary — they always add up to 100%.', bn: 'Series: Owned accommodation (যেসব household নিজেদের বাসস্থানে থাকে) আর Rented accommodation (যেসব household ভাড়া বাসায় থাকে)। এই দুইটা complementary — সবসময় যোগ করলে 100% হয়।' },
        ],
      },
    },
    {
      id: 'chart-structure-check',
      kind: 'check',
      title: { en: 'Quick check', bn: 'Quick check' },
      trainerMessage: {
        en: 'Answer in Bangla or English — only the information matters here.',
        bn: 'বাংলা বা English-এ উত্তর দিন — এখানে শুধু তথ্যটাই গুরুত্বপূর্ণ।',
      },
      check: {
        prompt: 'What does the vertical (Y) axis measure in this chart?',
        options: [
          'The number of houses built each year',
          'The percentage of households in each type of accommodation',
          'The average rent paid per household',
          'The population of England and Wales',
        ],
        correctIndex: 1,
        explain: {
          en: 'The Y-axis is a percentage of households, not a count of houses, a price, or a population figure — a value like 22 means 22% of households, never 22 houses or 22 people.',
          bn: 'Y-axis হলো household-এর percentage, বাড়ির সংখ্যা, দাম, বা population figure না — 22 মানে 22% household, কখনো 22-টা বাড়ি বা 22 জন মানুষ না।',
        },
      },
    },

    // ---------------------------------------------------------------- 3. opposing trends
    {
      id: 'opposing-trends',
      kind: 'guided',
      title: { en: 'Discover the Two Opposing Trends', bn: 'দুটি বিপরীতমুখী Trend আবিষ্কার করুন' },
      trainerMessage: {
        en: "Now look at the movement of each series. Ownership started low but rose over the long term. Renting started high but fell over the long term — the two series moved in opposite directions. But near the end, both show a slight reversal: after 2001, ownership fell and renting rose.",
        bn: 'এবার দুটি series-এর movement লক্ষ্য করুন। Owned accommodation-এর percentage শুরুতে কম ছিল, কিন্তু দীর্ঘ সময় ধরে বেড়েছে। অন্যদিকে rented accommodation-এর percentage শুরুতে অনেক বেশি ছিল, কিন্তু সময়ের সঙ্গে কমেছে — দুটি series বিপরীত দিকে পরিবর্তিত হয়েছে। তবে শেষের দিকে দুটিতেই সামান্য reversal দেখা যায়: 2001 সালের পর ownership কমেছে এবং renting বেড়েছে।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_13_T2_OWNED_RENTED, tasks: [ACCOMMODATION_TREND_TASKS[0], ACCOMMODATION_TREND_TASKS[1]] },
    },
    {
      id: 'opposing-trends-vocab',
      kind: 'explain',
      title: { en: 'Language for Long-term Change', bn: 'Long-term পরিবর্তনের ভাষা' },
      trainerMessage: {
        en: "Here is the vocabulary this chart needs. Don't insert these mechanically — match the word to what the data actually does.",
        bn: 'এই chart-এর জন্য দরকারি vocabulary এখানে দেওয়া হলো। এগুলো যান্ত্রিকভাবে বসাবেন না — data আসলে কী করছে তার সাথে শব্দ মিলিয়ে ব্যবহার করুন।',
      },
      material: {
        type: 'vocab',
        items: [
          { phrase: 'rose steadily / increased gradually', use: { en: 'A long, sustained rise — fits ownership from 1918 to 2001.', bn: 'একটা দীর্ঘ, ধারাবাহিক বৃদ্ধি — ownership-এর 1918 থেকে 2001 পর্যন্ত movement-এর জন্য উপযুক্ত।' } },
          { phrase: 'declined / fell considerably', use: { en: 'A long, sustained fall — fits renting from 1918 to 2001.', bn: 'একটা দীর্ঘ, ধারাবাহিক পতন — renting-এর 1918 থেকে 2001 পর্যন্ত movement-এর জন্য উপযুক্ত।' } },
          { phrase: 'remained stable / showed little variation', use: { en: 'Almost no change — fits 1939 to 1953, where both figures moved by only one percentage point.', bn: 'প্রায় কোনো পরিবর্তন নেই — 1939 থেকে 1953-এর জন্য উপযুক্ত, যেখানে দুটো figure-ই মাত্র এক percentage point বদলেছে।' } },
          { phrase: 'reached a peak', use: { en: 'The single highest point — ownership at 69% in 2001.', bn: 'একক সর্বোচ্চ point — ownership 69% ছিল 2001-এ।' } },
          { phrase: 'experienced a slight decline / showed a modest recovery', use: { en: 'A small reversal after a long trend — fits both series between 2001 and 2011.', bn: 'একটা দীর্ঘ trend-এর পর ছোট একটা reversal — দুটো series-এরই 2001 থেকে 2011 পর্যন্ত movement-এর জন্য উপযুক্ত।' } },
          { phrase: 'moved in opposite directions', use: { en: 'Describes the overall relationship between the two series throughout almost the entire period.', bn: 'প্রায় পুরো সময়কাল জুড়ে দুটো series-এর মধ্যের সম্পর্ক বর্ণনা করে।' } },
        ],
      },
    },
    {
      id: 'opposing-trends-check',
      kind: 'check',
      title: { en: 'Quick check', bn: 'Quick check' },
      trainerMessage: { en: 'One more check before we find the crossover point.', bn: 'Crossover point খোঁজার আগে আরেকটা check।' },
      check: {
        prompt: 'Did both categories continue in the same direction all the way until 2011?',
        options: [
          'Yes, ownership kept rising and renting kept falling right until 2011.',
          "No — both showed a reversal between 2001 and 2011.",
          'No, the chart does not contain any data after 1991.',
        ],
        correctIndex: 1,
        explain: {
          en: 'Ownership rose until its 2001 peak (69%) but then fell to 64% by 2011; renting fell until its 2001 low (31%) but then rose to 36% by 2011. Both reversed in the final decade — the chart does include 2011 data.',
          bn: 'Ownership বেড়েছে 2001-এর peak (69%) পর্যন্ত, কিন্তু তারপর 2011-এ 64%-এ নেমে এসেছে; renting কমেছে 2001-এর সর্বনিম্ন (31%) পর্যন্ত, কিন্তু তারপর 2011-এ 36%-এ বেড়েছে। দুটোই শেষ দশকে reverse হয়েছে — chart-এ 2011-এর data আছে।',
        },
      },
    },

    // ---------------------------------------------------------------- 4. crossover
    {
      id: 'crossover',
      kind: 'guided',
      title: { en: 'The Most Important Turning Point', bn: 'সবচেয়ে গুরুত্বপূর্ণ Turning Point' },
      trainerMessage: {
        en: "This chart's single most important feature is 1971. In that year, owned and rented accommodation were exactly equal, at 50% each — a crossover point. Before 1971, renting was higher; after 1971, ownership was higher. This is worth naming directly in your overview.",
        bn: 'এই chart-এর সবচেয়ে গুরুত্বপূর্ণ feature হলো 1971 সাল। এই বছরে owned এবং rented accommodation—দুটির percentage সমান ছিল, অর্থাৎ 50% — একটা crossover point। এর আগে rented accommodation-এর percentage বেশি ছিল। এরপর owned accommodation-এর percentage বেশি হয়ে যায়। এই পরিবর্তনটি overview-তে সরাসরি উল্লেখ করার মতো গুরুত্বপূর্ণ।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_13_T2_OWNED_RENTED, tasks: [ACCOMMODATION_DATA_READING_TASKS[2], ACCOMMODATION_TREND_TASKS[2]] },
      hint: {
        en: 'Common mistake: "Owned accommodation was always higher than rented accommodation" is wrong — ownership was LOWER initially, became equal in 1971, and was higher only afterwards.',
        bn: 'সাধারণ ভুল: "Owned accommodation was always higher than rented accommodation" — এটা ভুল। Ownership শুরুতে কম ছিল, 1971-এ সমান হয়েছে, আর তারপরেই শুধু বেশি হয়েছে।',
      },
    },

    // ---------------------------------------------------------------- 5. stability and reversal
    {
      id: 'stability-and-reversal',
      kind: 'guided',
      title: { en: 'Look Beyond the Main Trend', bn: 'মূল Trend-এর বাইরেও দেখুন' },
      trainerMessage: {
        en: "Looking at the overall trend from start to finish is not enough. Notice where change was very small (1939–1953: ownership moved just 31% to 32%, renting just 69% to 68%), where each series reached its peak or lowest point (both in 2001), and whether the trend reversed in the final decade. But you don't need to write every small change — select what matters.",
        bn: 'শুধু শুরু থেকে শেষ পর্যন্ত overall trend দেখলেই যথেষ্ট নয়। লক্ষ্য করুন কোথায় পরিবর্তন খুব কম হয়েছে (1939–1953: ownership মাত্র 31% থেকে 32%, renting মাত্র 69% থেকে 68%), কোথায় প্রতিটা series তার peak বা সর্বনিম্ন point-এ পৌঁছেছে (দুটোই 2001-এ), আর শেষ দশকে trend উল্টে গেছে কি না। তবে সব ছোট পরিবর্তন লেখার প্রয়োজন নেই — গুরুত্বপূর্ণ বিষয় বেছে নিন।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_13_T2_OWNED_RENTED, tasks: [ACCOMMODATION_DATA_READING_TASKS[3], ACCOMMODATION_TREND_TASKS[3], ACCOMMODATION_DATA_READING_TASKS[4]] },
    },

    // ---------------------------------------------------------------- 6. key features
    {
      id: 'key-features',
      kind: 'guided',
      title: { en: 'Choose What Deserves to Be Written', bn: 'কোনটা লেখার যোগ্য বেছে নিন' },
      trainerMessage: {
        en: "An overview needs the opposing long-term trends, the 1971 crossover, the 2001 peak/low point, and the final-decade reversal — not a description of how many years are on the chart or what colour the bars are. You don't need to describe every year independently.",
        bn: 'একটা overview-তে দরকার বিপরীতমুখী long-term trend, 1971-এর crossover, 2001-এর peak/সর্বনিম্ন point, আর শেষ দশকের reversal — chart-এ কয়টা বছর আছে বা bar-এর রং কী, সেটা না। প্রতিটা বছর আলাদা করে বর্ণনা করার দরকার নেই।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'A — Ownership generally increased while renting declined. B — The two categories were equal in 1971. C — Both categories showed a small reversal in the final decade. D — The chart contains nine year categories. E — The chart uses two shades of grey.\n\nA, B and C are genuine data features and belong in the overview. D and E describe the chart\'s structure, not its content — they do not belong in a Task 1 response at all.',
            bn: 'A — Ownership generally increased while renting declined. B — The two categories were equal in 1971. C — Both categories showed a small reversal in the final decade. D — The chart contains nine year categories. E — The chart uses two shades of grey.\n\nA, B আর C আসল data feature, এগুলো overview-তে থাকা উচিত। D আর E chart-এর structure বর্ণনা করছে, এর content না — এগুলো Task 1 response-এ একদমই থাকা উচিত না।',
          },
        ],
      },
    },

    // ---------------------------------------------------------------- 7. grouping
    {
      id: 'grouping',
      kind: 'guided',
      title: { en: 'Organise the Information Logically', bn: 'তথ্য যৌক্তিকভাবে সাজান' },
      trainerMessage: {
        en: "Don't write a separate sentence for every year. Group data that shows the same kind of movement or comparison together. 1971 is a natural dividing point, since that is exactly where the two percentages become equal — so Paragraph 1 can cover 1918 to 1971, and Paragraph 2 can cover 1971 to 2011. This is a recommended grouping, not the only acceptable one.",
        bn: 'প্রতিটা year আলাদা করে একটা বাক্য লিখবেন না। যেসব তথ্য একই ধরনের movement বা comparison দেখায়, সেগুলো একসঙ্গে group করুন। 1971 সালটি একটা স্বাভাবিক dividing point, কারণ এই বছরেই দুটো percentage সমান হয়েছে — তাই Paragraph 1-এ 1918 থেকে 1971 আর Paragraph 2-এ 1971 থেকে 2011 কভার করা যেতে পারে। এটা একটা recommended grouping, একমাত্র গ্রহণযোগ্য উপায় না।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_13_T2_OWNED_RENTED, tasks: ACCOMMODATION_PLANNING_TASKS },
    },

    // ---------------------------------------------------------------- 8. identify the mistake
    {
      id: 'identify-mistake',
      kind: 'guided',
      title: { en: 'Identify the Mistake', bn: 'ভুল চিহ্নিত করুন' },
      trainerMessage: {
        en: 'Decide whether each statement below is accurate, and explain why — in Bangla or English.',
        bn: 'নিচের প্রতিটা statement সঠিক কিনা ঠিক করুন, আর কেন তা ব্যাখ্যা করুন — বাংলা বা English-এ।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_13_T2_OWNED_RENTED, tasks: ACCOMMODATION_MISTAKE_TASKS },
    },

    // ---------------------------------------------------------------- 9. sentence construction (English required)
    {
      id: 'sentence-construction',
      kind: 'guided',
      title: { en: 'Sentence Construction', bn: 'বাক্য গঠন' },
      trainerMessage: {
        en: 'Now write each of these as one English sentence — your final Task 1 response is written in English, so practise it here.',
        bn: 'এখন প্রতিটা এক-একটা English sentence হিসেবে লিখুন — আপনার শেষ Task 1 response English-এ লিখতে হয়, তাই এখানে অনুশীলন করুন।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_13_T2_OWNED_RENTED, tasks: ACCOMMODATION_SENTENCE_TASKS },
    },

    // ---------------------------------------------------------------- 10-11. writing checkpoints
    {
      id: 'write-introduction',
      kind: 'guided',
      title: { en: 'Paraphrase the Task', bn: 'Task Paraphrase করুন' },
      trainerMessage: {
        en: 'The introduction identifies the chart, both categories, the location and the period — nothing more. Write it in English.',
        bn: 'Introduction-এ chart-টা identify হয়, দুটো category, location, আর period বলা হয় — এর বেশি কিছু না। এটা English-এ লিখুন।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_13_T2_OWNED_RENTED, tasks: [ACCOMMODATION_WRITING_TASKS[0]] },
    },
    {
      id: 'write-overview',
      kind: 'guided',
      title: { en: 'Summarise the Main Changes', bn: 'মূল পরিবর্তনগুলো Summarise করুন' },
      trainerMessage: {
        en: 'Cover the main direction, the relationship between the two series, the crossover, and the final reversal — in English.',
        bn: 'মূল direction, দুটো series-এর মধ্যের সম্পর্ক, crossover, আর শেষের reversal কভার করুন — English-এ।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_13_T2_OWNED_RENTED, tasks: [ACCOMMODATION_WRITING_TASKS[1]] },
    },

    // ---------------------------------------------------------------- 12. model answer
    {
      id: 'model-answer',
      kind: 'review',
      title: { en: 'A Complete Task 1 Response', bn: 'একটা সম্পূর্ণ Task 1 Response' },
      trainerMessage: {
        en: 'Compare this complete response with the chart above. This is a Mino-authored teaching answer, not an official Cambridge model — use it to see how the parts fit together, never to copy word for word.',
        bn: 'উপরের chart-টার সাথে এই সম্পূর্ণ response-টা মিলিয়ে দেখুন। এটা Mino-র তৈরি একটা teaching answer, কোনো official Cambridge model answer না — এটা দিয়ে দেখুন অংশগুলো কীভাবে একসাথে ফিট হয়, হুবহু copy করার জন্য না।',
      },
      material: {
        type: 'text',
        paragraphs: [
          'The bar chart compares the percentages of households in England and Wales that owned or rented their accommodation between 1918 and 2011.',
          'Overall, home ownership increased substantially while renting declined, with the two figures becoming equal in 1971. Ownership then became the dominant form of accommodation, although this pattern reversed slightly in the final decade.',
          'In 1918, only 22% of households owned their accommodation, whereas the figure for renting stood at 78%. Ownership then rose to 31% in 1939 and changed very little by 1953, when it reached 32%. Over the same period, renting remained relatively stable, falling slightly from 69% to 68%. The gap continued to narrow, and by 1971 both categories accounted for exactly half of all households.',
          'After 1971, the proportion of owner-occupied households continued to increase, reaching 60% in 1981 and 68% in 1991, before peaking at 69% in 2001. Renting followed the opposite pattern, falling to 40%, 32% and then 31% in those respective years. However, this movement was partly reversed by 2011, when ownership declined to 64% while renting recovered to 36%.',
          { en: 'Word count: 178 words. Every figure above matches the source dataset exactly; the overview names the opposing trends, the 1971 crossover and the final reversal without listing every individual year; the two body paragraphs split at 1971, the chart\'s own natural dividing point.', bn: 'Word count: ১৭৮ শব্দ। উপরের প্রতিটা figure source dataset-এর সাথে হুবহু মিলছে; overview-তে বিপরীতমুখী trend, 1971-এর crossover আর শেষের reversal বলা হয়েছে, প্রতিটা বছর আলাদা করে না লিখে; দুটো body paragraph 1971-এ ভাগ হয়েছে, যেটা chart-এরই নিজস্ব স্বাভাবিক dividing point।' },
        ],
      },
    },

    // ---------------------------------------------------------------- 13. readiness
    {
      id: 'readiness',
      kind: 'independent',
      title: { en: 'Write Your Own Complete Report', bn: 'নিজের সম্পূর্ণ Report লিখুন' },
      trainerMessage: {
        en: "Now write a complete Task 1 response yourself. Before you start: identify the chart's overall trend, find the important turning point, group the data into two body paragraphs, then write your Introduction, Overview and Body Paragraphs — and check your grammar and data accuracy at the end. If you want to time yourself, use 20 minutes.",
        bn: 'এখন আপনি নিজে সম্পূর্ণ Task 1 response লিখুন। শুরুর আগে: Chart-এর overall trend শনাক্ত করুন, গুরুত্বপূর্ণ turning point খুঁজুন, দুটো body paragraph-এর জন্য data group করুন, তারপর Introduction, Overview আর Body Paragraphs লিখুন — আর শেষে grammar ও data accuracy পরীক্ষা করুন। সময় ধরে practice করতে চাইলে 20 মিনিট ব্যবহার করতে পারেন।',
      },
    },
  ],
  finalPrompt: {
    // Mino's own standard Task 1 instruction wording — the literal original
    // Cambridge task-prompt text was never supplied to this implementation.
    title: { en: 'Independent Report: Owned and Rented Accommodation', bn: 'Independent Report: Owned and Rented Accommodation' },
    instructions: {
      en: 'The bar chart below shows the percentage of households in England and Wales that owned or rented their accommodation between 1918 and 2011. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      bn: 'নিচের bar chart-টা দেখায় England আর Wales-এ 1918 থেকে 2011 পর্যন্ত owned বা rented accommodation-এ থাকা household-এর percentage। তথ্যগুলো বেছে নিয়ে আর main feature report করে summarise করুন, আর যেখানে প্রয়োজন সেখানে comparison করুন। অন্তত ১৫০ শব্দ লিখুন।',
    },
    minWords: 150,
    chartId: 'cambridge-13-t2-owned-rented-accommodation',
  },
};
