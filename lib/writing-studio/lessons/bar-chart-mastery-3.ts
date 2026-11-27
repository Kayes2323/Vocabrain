import type { Lesson } from '../types';
import {
  CAMBRIDGE_17_T3_FAMILY_EXPENDITURE,
  EXPENDITURE_1968_TASKS,
  EXPENDITURE_2018_TASKS,
  EXPENDITURE_DECREASE_TASKS,
  EXPENDITURE_DIFFERENCE_TASKS,
  EXPENDITURE_INCREASE_TASKS,
  EXPENDITURE_KEY_FEATURE_TASKS,
  EXPENDITURE_RANKING_TASKS,
  EXPENDITURE_SENTENCE_TASKS,
  EXPENDITURE_STRUCTURE_TASKS,
  EXPENDITURE_WRITING_TASKS,
} from '../bar-charts';

/**
 * Bar Chart Mastery — Lesson 03: "Changing Family Expenditure (1968-2018)".
 * Cambridge IELTS 17 Academic, Test 3, Writing Task 1 (printed page 72) — a
 * third genuinely different teaching case: unlike Lesson 01 (one year,
 * static) and Lesson 02 (nine years, continuous), this is a PAIRED-YEAR
 * comparison across eight categories, drawn as a HORIZONTAL grouped bar
 * chart (categories on the Y-axis, percentage of weekly income on the
 * X-axis, 0-40% in 5-point steps) — the orientation `WSChart` gained for
 * this lesson. Every chart-board question is evaluated by the same Mino AI
 * evaluator Lesson 01 introduced (lib/ai/server/assess/chart-answer.ts) —
 * no new evaluation engine.
 */
export const barChartMasteryLesson3: Lesson = {
  id: 'bar-chart-family-expenditure-cambridge-17-t3',
  task: 'task1',
  moduleId: 'task1-visual-bar-charts',
  title: 'Changing Family Expenditure (1968-2018)',
  objective: {
    en: 'Read a horizontal, paired-year grouped bar chart: compare two separate years across eight categories, identify the largest increase and decline, group categories logically, and write a complete, accurate Task 1 report from a real Cambridge IELTS chart.',
    bn: 'একটা horizontal, paired-year grouped bar chart পড়া: আটটা category-তে দুটো আলাদা বছর তুলনা করা, সবচেয়ে বড় increase আর decline চিহ্নিত করা, category-গুলো যৌক্তিকভাবে group করা, আর একটা real Cambridge IELTS chart থেকে একটা সম্পূর্ণ, নির্ভুল Task 1 report লেখা।',
  },
  estMinutes: 55,
  steps: [
    // ---------------------------------------------------------------- 1. welcome
    {
      id: 'welcome',
      kind: 'intro',
      title: { en: 'Comparing Spending Across Two Years', bn: 'দুটি বছরে খরচের তুলনা' },
      trainerMessage: {
        en: "Welcome! In earlier lessons we compared different groups and a continuous run of years. Now we'll compare how a family's weekly income was divided across spending categories in two separate years, fifty years apart. It isn't enough to see which category got more money — you need to understand which category's SHARE of income grew, which shrank, and which stayed the same. There's a fifty-year gap between 1968 and 2018 in this chart. Let's understand the chart first.",
        bn: 'স্বাগতম! আগের lesson-গুলোতে আমরা বিভিন্ন group এবং একটা continuous বছরের ধারা তুলনা করেছি। এবার আমরা দেখব পরিবারের weekly income দুটো আলাদা বছরে—যাদের মধ্যে পঞ্চাশ বছরের ব্যবধান—কীভাবে বিভিন্ন খাতে ভাগ হয়েছে। শুধু কোন category-তে বেশি টাকা গেছে তা দেখলেই হবে না। বুঝতে হবে কোন category-র income-এর share বেড়েছে, কোনটার কমেছে, আর কোনটা একই রয়েছে। এই chart-এ 1968 আর 2018 সালের মধ্যে পঞ্চাশ বছরের ব্যবধান। চলুন, প্রথমে chart-টা বুঝে নিই।',
      },
    },

    // ---------------------------------------------------------------- 2. chart structure
    {
      id: 'chart-structure',
      kind: 'guided',
      title: { en: 'Read the Axes and Legend', bn: 'Axis এবং Legend পড়ুন' },
      trainerMessage: {
        en: 'This chart looks different from the earlier ones — the bars run sideways. A normal vertical bar chart has bars rising upward; here, each bar extends from left to right. Each category has two bars: a black one for 1968, and a grey one for 2018. The horizontal axis measures percentage of weekly income, so 35% means about 35% of the family\'s total weekly income, never 35 units of currency or 35 people.',
        bn: 'এই chart-টা আগেরগুলো থেকে আলাদা দেখতে — bar-গুলো পাশাপাশি প্রসারিত। একটা সাধারণ vertical bar chart-এ bar ওপরের দিকে ওঠে; এখানে প্রতিটা bar বাম থেকে ডানে প্রসারিত হয়েছে। প্রতিটা category-র জন্য দুটো bar আছে: কালো bar 1968-এর জন্য, ধূসর bar 2018-এর জন্য। Horizontal axis percentage of weekly income measure করে, তাই 35% মানে পরিবারের total weekly income-এর প্রায় 35% — কখনো 35 টাকা বা 35 জন মানুষ না।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_17_T3_FAMILY_EXPENDITURE, tasks: EXPENDITURE_STRUCTURE_TASKS },
    },

    // ---------------------------------------------------------------- 3. 1968
    {
      id: 'spending-1968',
      kind: 'guided',
      title: { en: 'What Dominated Family Budgets in 1968?', bn: '1968 সালে পরিবারের Budget-এ কী প্রাধান্য পেয়েছিল?' },
      trainerMessage: {
        en: 'Look only at the black 1968 bars first. Food stands out immediately at about 35% — far larger than any other category. Housing and Clothing and footwear were both around 10%. Leisure was about 9%, and Household goods, Personal goods and Transport were each around 8%. Fuel and power was the smallest, at about 6%. One thing is already clear: in 1968, food took up the largest share of a family\'s weekly income by a wide margin.',
        bn: 'প্রথমে শুধু কালো 1968 সালের bar-গুলো দেখুন। Food সবচেয়ে বেশি চোখে পড়ে, প্রায় 35% — অন্য সব category-র চেয়ে অনেক বড়। Housing আর Clothing and footwear দুটোই প্রায় 10% ছিল। Leisure প্রায় 9%, আর Household goods, Personal goods, Transport প্রতিটা প্রায় 8%। Fuel and power সবচেয়ে কম, প্রায় 6%। একটা বিষয় স্পষ্ট — 1968 সালে food পরিবারের weekly income-এর সবচেয়ে বড় অংশ অনেকটা ব্যবধানে দখল করেছিল।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_17_T3_FAMILY_EXPENDITURE, tasks: EXPENDITURE_1968_TASKS },
    },

    // ---------------------------------------------------------------- 4. 2018
    {
      id: 'spending-2018',
      kind: 'guided',
      title: { en: 'How Had Spending Patterns Changed by 2018?', bn: '2018 সালে খরচের ধরন কীভাবে বদলেছে?' },
      trainerMessage: {
        en: 'Now look only at the grey 2018 bars. Leisure is now the largest, at about 22%. Housing is about 19%, and food has fallen to about 17% — third place. Transport is about 14%. Fuel and power and Personal goods are the smallest, both around 4%. Notice the reversal: food was the largest category in 1968, but by 2018 leisure had taken that position. This is an important change worth mentioning in the overview.',
        bn: 'এবার শুধু ধূসর 2018 সালের bar-গুলো দেখুন। Leisure এখন সবচেয়ে বড়, প্রায় 22%। Housing প্রায় 19%, আর food কমে গিয়ে প্রায় 17%-এ নেমেছে — তৃতীয় স্থানে। Transport প্রায় 14%। Fuel and power আর Personal goods সবচেয়ে কম, দুটোই প্রায় 4%। খেয়াল করুন এই reversal: 1968 সালে food সবচেয়ে বড় category ছিল, কিন্তু 2018 সালে সেই জায়গা leisure নিয়ে নিয়েছে। এই পরিবর্তন overview-তে উল্লেখ করার মতো গুরুত্বপূর্ণ।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_17_T3_FAMILY_EXPENDITURE, tasks: EXPENDITURE_2018_TASKS },
    },

    // ---------------------------------------------------------------- 5. increases
    {
      id: 'increases',
      kind: 'guided',
      title: { en: 'Which Categories Took a Larger Share?', bn: 'কোন Category-র Share বেড়েছে?' },
      trainerMessage: {
        en: 'Now compare the two bars side by side for each category, and find where the grey (2018) bar is bigger than the black (1968) bar. Housing rose from about 10% to 19%. Transport rose from about 8% to 14%. Leisure rose from about 9% to 22% — the largest change of all three.',
        bn: 'এবার প্রতিটা category-র দুটো bar পাশাপাশি তুলনা করুন, আর খুঁজুন কোথায় ধূসর (2018) bar কালো (1968) bar-এর চেয়ে বড়। Housing প্রায় 10% থেকে 19%-এ বেড়েছে। Transport প্রায় 8% থেকে 14%-এ বেড়েছে। Leisure প্রায় 9% থেকে 22%-এ বেড়েছে — তিনটার মধ্যে সবচেয়ে বড় পরিবর্তন।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_17_T3_FAMILY_EXPENDITURE, tasks: EXPENDITURE_INCREASE_TASKS },
    },

    // ---------------------------------------------------------------- 6. decreases and stability
    {
      id: 'decreases-and-stability',
      kind: 'guided',
      title: { en: 'Which Categories Took a Smaller Share?', bn: 'কোন Category-র Share কমেছে?' },
      trainerMessage: {
        en: 'Now find the categories whose 2018 bar is smaller. Food fell from about 35% to 17%. Clothing and footwear fell from about 10% to 5%. Personal goods fell from about 8% to 4%. Fuel and power fell from about 6% to 4%. Household goods, meanwhile, stayed at about 8% in both years — it was essentially unchanged. Not every category moved in the same direction.',
        bn: 'এবার খুঁজুন কোন category-র 2018 সালের bar ছোট হয়েছে। Food প্রায় 35% থেকে 17%-এ কমেছে। Clothing and footwear প্রায় 10% থেকে 5%-এ কমেছে। Personal goods প্রায় 8% থেকে 4%-এ কমেছে। Fuel and power প্রায় 6% থেকে 4%-এ কমেছে। এর মধ্যে Household goods দুটো বছরেই প্রায় 8% ছিল — এটা মূলত unchanged। সব category একই দিকে পরিবর্তিত হয়নি।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_17_T3_FAMILY_EXPENDITURE, tasks: EXPENDITURE_DECREASE_TASKS },
    },

    // ---------------------------------------------------------------- 7. differences
    {
      id: 'calculate-differences',
      kind: 'guided',
      title: { en: 'Measure the Change in Percentage Points', bn: 'Percentage Points-এ পরিবর্তন মাপুন' },
      trainerMessage: {
        en: 'Identifying an increase or decrease isn\'t enough — you also need to measure how large the change was. Food went from 35% to 17%: that\'s a difference of about 18 percentage points. Leisure went from 9% to 22%: about 13 percentage points. This is a PERCENTAGE-POINT difference — do not confuse it with a relative percentage change.',
        bn: 'শুধু increase বা decrease চিহ্নিত করলেই হবে না — পরিবর্তনের মাত্রাটাও মাপতে হবে। Food 35% থেকে 17%-এ গেছে: পার্থক্য প্রায় 18 percentage points। Leisure 9% থেকে 22%-এ গেছে: প্রায় 13 percentage points। এটা একটা percentage-point difference — relative percentage change-এর সঙ্গে গুলিয়ে ফেলবেন না।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_17_T3_FAMILY_EXPENDITURE, tasks: EXPENDITURE_DIFFERENCE_TASKS },
      hint: {
        en: 'Common mistake: writing "food fell by 18%" when the correct description is "food fell by approximately 18 percentage points" — these are not the same thing.',
        bn: 'সাধারণ ভুল: "food fell by 18%" লেখা, যেখানে সঠিক বর্ণনা হলো "food fell by approximately 18 percentage points" — এই দুটো একই বিষয় না।',
      },
    },

    // ---------------------------------------------------------------- 8. ranking
    {
      id: 'ranking-comparison',
      kind: 'guided',
      title: { en: 'Understand the Change in Spending Priorities', bn: 'Spending Priority-র পরিবর্তন বুঝুন' },
      trainerMessage: {
        en: 'Now look at the whole chart together. In 1968, food was far ahead of everything else. By 2018, leisure had become the largest category, with housing and food following. It isn\'t just about which categories rose or fell — it is about which category overtook the others. Remember: the chart only shows income allocation, not the reasons behind it. Do not invent a reason for the change.',
        bn: 'এবার পুরো chart-টা একসাথে দেখুন। 1968 সালে food অন্য সবকিছুর চেয়ে অনেক এগিয়ে ছিল। 2018 সালে leisure সবচেয়ে বড় category হয়ে গেছে, এরপর housing আর food। এটা শুধু কোন category বেড়েছে বা কমেছে তা না — কোন category অন্যদের ছাড়িয়ে গেছে, সেটাও গুরুত্বপূর্ণ। মনে রাখবেন: chart শুধু income allocation দেখায়, এর পেছনের কারণ না। পরিবর্তনের জন্য নিজে থেকে কোনো কারণ বানিয়ে লিখবেন না।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_17_T3_FAMILY_EXPENDITURE, tasks: EXPENDITURE_RANKING_TASKS },
    },

    // ---------------------------------------------------------------- 9. key features
    {
      id: 'key-features',
      kind: 'guided',
      title: { en: 'What Belongs in the Overview?', bn: 'Overview-তে কী থাকা উচিত?' },
      trainerMessage: {
        en: 'An overview needs two or three major patterns, not every figure. The strongest features here are: food\'s large decline from the top category, leisure becoming the new leading category, and household goods staying unchanged while several smaller categories fell.',
        bn: 'একটা overview-তে দুই-তিনটা major pattern দরকার, প্রতিটা figure না। এখানে সবচেয়ে গুরুত্বপূর্ণ feature হলো: food-এর top category থেকে বড় পতন, leisure নতুন leading category হয়ে যাওয়া, আর household goods unchanged থাকা অবস্থায় কিছু ছোট category কমে যাওয়া।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_17_T3_FAMILY_EXPENDITURE, tasks: EXPENDITURE_KEY_FEATURE_TASKS },
    },

    // ---------------------------------------------------------------- 10. grouping (text-only)
    {
      id: 'grouping',
      kind: 'guided',
      title: { en: 'Organise the Data Logically', bn: 'Data যৌক্তিকভাবে সাজান' },
      trainerMessage: {
        en: 'Do not write eight separate, unrelated sentences — one for every category. Group by the direction of change instead: one paragraph for categories that increased or stayed the same (leisure, housing, transport, household goods), and one paragraph for categories that declined (food, clothing and footwear, personal goods, fuel and power). This is the recommended grouping for this chart, though other logical groupings can also work.',
        bn: 'আটটা আলাদা, একটার সঙ্গে আরেকটার কোনো সম্পর্ক নেই এমন বাক্য লিখবেন না — প্রতিটা category-র জন্য একটা করে। বরং পরিবর্তনের দিক অনুযায়ী group করুন: একটা paragraph-এ যে category-গুলো বেড়েছে বা একই রয়েছে (leisure, housing, transport, household goods), আর একটা paragraph-এ যেগুলো কমেছে (food, clothing and footwear, personal goods, fuel and power)। এই chart-এর জন্য এটাই recommended grouping, তবে অন্য যৌক্তিক grouping-ও ব্যবহার করা যায়।',
      },
      material: {
        type: 'text',
        paragraphs: [
          { en: 'Body Paragraph 1 (increased or unchanged): Leisure (9% → 22%), Housing (10% → 19%), Transport (8% → 14%), Household goods (8% → 8%).', bn: 'Body Paragraph 1 (বেড়েছে বা একই রয়েছে): Leisure (9% → 22%), Housing (10% → 19%), Transport (8% → 14%), Household goods (8% → 8%)।' },
          { en: 'Body Paragraph 2 (declined): Food (35% → 17%), Clothing and footwear (10% → 5%), Personal goods (8% → 4%), Fuel and power (6% → 4%).', bn: 'Body Paragraph 2 (কমেছে): Food (35% → 17%), Clothing and footwear (10% → 5%), Personal goods (8% → 4%), Fuel and power (6% → 4%)।' },
        ],
      },
    },

    // ---------------------------------------------------------------- 11-12. English sentence-level body paragraph practice
    {
      id: 'body-paragraph-1',
      kind: 'guided',
      title: { en: 'Describe Categories That Increased or Remained Stable', bn: 'যে Category-গুলো বেড়েছে বা অপরিবর্তিত থেকেছে তা বর্ণনা করুন' },
      trainerMessage: {
        en: 'Now write this as an English paragraph. Useful phrases: "rose from ... to ...", "increased substantially", "the proportion allocated to", "by contrast", "remained unchanged".',
        bn: 'এবার এটা একটা English paragraph হিসেবে লিখুন। কাজের phrase: "rose from ... to ...", "increased substantially", "the proportion allocated to", "by contrast", "remained unchanged"।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_17_T3_FAMILY_EXPENDITURE, tasks: [EXPENDITURE_SENTENCE_TASKS[0]] },
    },
    {
      id: 'body-paragraph-2',
      kind: 'guided',
      title: { en: 'Describe Categories That Declined', bn: 'যে Category-গুলো কমেছে তা বর্ণনা করুন' },
      trainerMessage: {
        en: 'Useful phrases for decline: "represented the largest share", "fell to", "was halved", "declining from ... to ...", "decreasing modestly".',
        bn: 'পতনের জন্য কাজের phrase: "represented the largest share", "fell to", "was halved", "declining from ... to ...", "decreasing modestly"।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_17_T3_FAMILY_EXPENDITURE, tasks: [EXPENDITURE_SENTENCE_TASKS[1]] },
    },

    // ---------------------------------------------------------------- 13-14. introduction and overview writing
    {
      id: 'write-introduction',
      kind: 'guided',
      title: { en: 'Paraphrase the Chart Description', bn: 'Chart Description Paraphrase করুন' },
      trainerMessage: {
        en: 'The introduction identifies weekly family income, the eight categories, both years, and percentage allocation — nothing more. Do not explain why spending changed here. Write it in English.',
        bn: 'Introduction-এ identify হয় weekly family income, আটটা category, দুটো বছর, আর percentage allocation — এর বেশি কিছু না। এখানে কেন spending বদলেছে তা ব্যাখ্যা করবেন না। এটা English-এ লিখুন।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_17_T3_FAMILY_EXPENDITURE, tasks: [EXPENDITURE_WRITING_TASKS[0]] },
    },
    {
      id: 'write-overview',
      kind: 'guided',
      title: { en: 'Summarise the Main Features', bn: 'মূল Feature-গুলো Summarise করুন' },
      trainerMessage: {
        en: 'Cover the change in the leading category, the main increases, and the stability/decline pattern — in English, in two or three sentences.',
        bn: 'Leading category-র পরিবর্তন, মূল increase-গুলো, আর stability/decline pattern কভার করুন — English-এ, দুই-তিন বাক্যে।',
      },
      material: { type: 'chart-board', dataset: CAMBRIDGE_17_T3_FAMILY_EXPENDITURE, tasks: [EXPENDITURE_WRITING_TASKS[1]] },
    },

    // ---------------------------------------------------------------- 15. model answer
    {
      id: 'model-answer',
      kind: 'review',
      title: { en: 'A Complete Mino Reference Report', bn: 'একটা সম্পূর্ণ Mino Reference Report' },
      trainerMessage: {
        en: 'Compare this complete response with the chart above. This is a Mino-authored teaching answer based on the Cambridge chart readings, not a published Cambridge answer or an officially awarded Band score — use it to see how the parts fit together, never to copy word for word.',
        bn: 'উপরের chart-এর সাথে এই সম্পূর্ণ response-টা মিলিয়ে দেখুন। এটা Cambridge chart readings-এর ওপর ভিত্তি করে Mino-র তৈরি একটা teaching answer, কোনো published Cambridge answer বা officially awarded Band score না — এটা দিয়ে দেখুন অংশগুলো কীভাবে একসাথে ফিট হয়, হুবহু copy করার জন্য না।',
      },
      material: {
        type: 'text',
        paragraphs: [
          'The bar chart compares the proportions of weekly family income allocated to eight different spending categories in one country in 1968 and 2018.',
          'Overall, food accounted for the largest share of weekly expenditure in 1968, but leisure became the leading category in 2018. The proportions spent on housing and transport also increased, while household goods remained unchanged and several other categories declined.',
          'Spending on leisure rose from approximately 9% of weekly income in 1968 to 22% in 2018, making it the largest category in the latter year. Housing also increased substantially, from around 10% to 19%, while the proportion allocated to transport grew from about 8% to 14%. By contrast, household goods accounted for approximately 8% in both years and therefore remained stable.',
          'Food represented the largest share in 1968, at approximately 35%, but this figure fell to about 17% by 2018. Clothing and footwear expenditure was halved, declining from roughly 10% to 5%, while personal goods fell from around 8% to 4%. Fuel and power also received a smaller share, decreasing modestly from approximately 6% to 4%.',
          { en: 'Word count: 178 words. Every figure above matches the source dataset exactly; the overview names the leading-category change, the main increases and the unchanged category without listing every figure; the two body paragraphs split by direction of change (increased/unchanged vs. declined).', bn: 'Word count: ১৭৮ শব্দ। উপরের প্রতিটা figure source dataset-এর সাথে হুবহু মিলছে; overview-তে leading-category-র পরিবর্তন, মূল increase-গুলো আর unchanged category বলা হয়েছে প্রতিটা figure তালিকা না করে; দুটো body paragraph পরিবর্তনের দিক অনুযায়ী ভাগ হয়েছে (বেড়েছে/অপরিবর্তিত বনাম কমেছে)।' },
        ],
      },
    },

    // ---------------------------------------------------------------- 16. mistake clinic
    {
      id: 'mistake-clinic',
      kind: 'review',
      title: { en: 'Avoid These Mistakes', bn: 'এই ভুলগুলো এড়িয়ে চলুন' },
      trainerMessage: {
        en: "Here are the most common mistakes with this kind of chart.",
        bn: 'এই ধরনের chart-এ সাধারণ ভুলগুলো এখানে দেওয়া হলো।',
      },
      material: {
        type: 'text',
        paragraphs: [
          { en: 'Mistake 1 — treating the values as money: "Families spent 35 pounds on food" is wrong; the chart reports a PERCENTAGE of weekly income, never a currency amount. Better: "Food accounted for approximately 35% of weekly income."', bn: 'ভুল ১ — value-গুলোকে টাকা হিসেবে ধরা: "Families spent 35 pounds on food" ভুল; chart একটা percentage of weekly income report করে, কখনো currency amount না। ভালো: "Food accounted for approximately 35% of weekly income."' },
          { en: 'Mistake 2 — claiming every category declined: "All categories received a smaller share in 2018" is wrong because leisure, housing and transport increased. Better: "While several categories declined, spending on leisure, housing and transport rose."', bn: 'ভুল ২ — সব category কমেছে এমন দাবি করা: "All categories received a smaller share in 2018" ভুল, কারণ leisure, housing আর transport বেড়েছে। ভালো: "While several categories declined, spending on leisure, housing and transport rose."' },
          { en: 'Mistake 3 — ignoring the unchanged category: "Household goods spending increased" is wrong; it stayed at approximately 8% in both years. Better: "The share allocated to household goods remained unchanged at around 8%."', bn: 'ভুল ৩ — unchanged category উপেক্ষা করা: "Household goods spending increased" ভুল; এটা দুটো বছরেই প্রায় 8% ছিল। ভালো: "The share allocated to household goods remained unchanged at around 8%."' },
          { en: 'Mistake 4 — missing the largest change: "Fuel and power showed the greatest decline" is wrong; food fell by far more.', bn: 'ভুল ৪ — সবচেয়ে বড় পরিবর্তন মিস করা: "Fuel and power showed the greatest decline" ভুল; food অনেক বেশি কমেছে।' },
          { en: 'Mistake 5 — confusing percentage points with percent: food fell from 35% to 17%, which is a fall of approximately 18 PERCENTAGE POINTS. Do not automatically call this an "18% fall".', bn: 'ভুল ৫ — percentage points আর percent গুলিয়ে ফেলা: food 35% থেকে 17%-এ পড়েছে, যা প্রায় 18 percentage points-এর পতন। এটাকে স্বয়ংক্রিয়ভাবে "18% fall" বলবেন না।' },
          { en: 'Mistake 6 — writing every category independently: group by common direction instead of producing a list of eight unrelated sentences.', bn: 'ভুল ৬ — প্রতিটা category আলাদাভাবে লেখা: আটটা আলাদা, সম্পর্কহীন বাক্যের তালিকা তৈরি না করে common direction অনুযায়ী group করুন।' },
          { en: 'Mistake 7 — inventing reasons for the change: the chart does not explain WHY expenditure changed. Never add statements about technology, income growth or lifestyle changes as if they were facts from the chart.', bn: 'ভুল ৭ — পরিবর্তনের জন্য কারণ বানানো: chart ব্যাখ্যা করে না কেন expenditure বদলেছে। Technology, income growth বা lifestyle পরিবর্তন সম্পর্কে কোনো statement chart-এর fact হিসেবে কখনো যুক্ত করবেন না।' },
        ],
      },
    },

    // ---------------------------------------------------------------- 17. readiness / independent writing
    {
      id: 'readiness',
      kind: 'independent',
      title: { en: 'Your Turn — Write the Full Report', bn: 'আপনার পালা — সম্পূর্ণ Report লিখুন' },
      trainerMessage: {
        en: 'এবার আপনি নিজে সম্পূর্ণ Task 1 report লিখুন। আপনার উত্তর অন্তত 150 শব্দের হতে হবে। আপনি প্রথমে Introduction লিখবেন, তারপর Overview এবং দুটি Body Paragraph তৈরি করবেন। সব category লেখার চেষ্টা না করে সবচেয়ে গুরুত্বপূর্ণ পরিবর্তনগুলো বেছে নিন। বিশেষভাবে increase, decrease এবং unchanged category-গুলোর সঠিক comparison দেখান। শেষে আপনার data, grammar এবং paragraph organisation আবার যাচাই করুন। সময় ধরে practice করতে চাইলে 20 মিনিট ব্যবহার করতে পারেন.',
        bn: 'এবার আপনি নিজে সম্পূর্ণ Task 1 report লিখুন। আপনার উত্তর অন্তত 150 শব্দের হতে হবে। আপনি প্রথমে Introduction লিখবেন, তারপর Overview এবং দুটি Body Paragraph তৈরি করবেন। সব category লেখার চেষ্টা না করে সবচেয়ে গুরুত্বপূর্ণ পরিবর্তনগুলো বেছে নিন। বিশেষভাবে increase, decrease এবং unchanged category-গুলোর সঠিক comparison দেখান। শেষে আপনার data, grammar এবং paragraph organisation আবার যাচাই করুন। সময় ধরে practice করতে চাইলে 20 মিনিট ব্যবহার করতে পারেন।',
      },
    },
  ],
  finalPrompt: {
    // Mino's own standard Task 1 instruction wording — the literal original
    // Cambridge task-prompt text was never supplied to this implementation.
    title: { en: 'Your Turn — Write the Complete Report', bn: 'আপনার পালা — সম্পূর্ণ Report লিখুন' },
    instructions: {
      en: 'The bar chart below shows the percentage of weekly family income allocated to eight spending categories in 1968 and 2018. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      bn: 'নিচের bar chart-টা দেখায় 1968 আর 2018 সালে আটটা spending category-তে weekly family income-এর percentage কীভাবে ভাগ হয়েছে। তথ্যগুলো বেছে নিয়ে আর main feature report করে summarise করুন, আর যেখানে প্রয়োজন সেখানে comparison করুন। অন্তত ১৫০ শব্দ লিখুন।',
    },
    minWords: 150,
    chartId: 'cambridge-17-t3-family-expenditure',
  },
};
