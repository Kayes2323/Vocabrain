import type { Lesson } from '../types';
import {
  LG01_GUIDED_TASKS,
  LG02_GUIDED_TASKS,
  LG03_GUIDED_TASKS,
  LG04_GUIDED_TASKS,
  LG05_GUIDED_TASKS,
  LINE_GRAPH_DATASETS,
} from '../line-graphs';

/**
 * Line Graph Mastery — Visual-Specific Training, Course 01. A dedicated,
 * self-contained course taking a learner from reading one simple line to
 * analysing four complex series and writing a complete, accurate Task 1
 * report — reusing the same Lesson/LessonRunner engine as every other Task 1
 * lesson, never a separate writing engine. Mino uses "আপনি" throughout this
 * course, by this course's own design (its earlier Bangla lessons use
 * "তুমি" — a known, previously flagged difference left for the product
 * owner to resolve, not altered here).
 */
export const lineGraphMasteryLesson: Lesson = {
  id: 'line-graph-mastery',
  task: 'task1',
  moduleId: 'task1-visual-line-graphs',
  title: 'Line Graph Mastery',
  objective: {
    en: 'Build the analysis and writing skills needed for an accurate line-graph Task 1 report: reading a chart methodically, grouping related lines, choosing the two or three features that matter, and writing them up with correct comparison and trend language.',
    bn: 'একটা line graph নিয়ে সঠিক Task 1 report লেখার জন্য দরকারি analysis আর writing skill তৈরি করা — একটা chart পদ্ধতিগতভাবে পড়া, related line-গুলো group করা, সবচেয়ে গুরুত্বপূর্ণ দুই বা তিনটা feature বেছে নেওয়া, আর সঠিক comparison ও trend-এর ভাষা দিয়ে সেগুলো লিখে ফেলা।',
  },
  estMinutes: 55,
  steps: [
    // ---------------------------------------------------------------- method
    {
      id: 'method',
      kind: 'intro',
      title: { en: 'The eight-step method', bn: 'আট-ধাপের method' },
      trainerMessage: {
        en: "Hi, I'm Mino. In this course, you'll go from one simple line to four complex ones, finishing with your own timed report. Every chart — simple or complex — gets read the same reliable way. Learn this method once, and it works on any line graph you see on test day.",
        bn: 'হাই, আমি Mino। এই course-এ আপনি একটা সাধারণ line থেকে শুরু করে চারটা জটিল line পর্যন্ত এগোবেন, শেষে নিজের একটা timed report লিখে। প্রতিটা chart — সহজ হোক বা জটিল — একই নির্ভরযোগ্য পদ্ধতিতে পড়া হয়। এই method একবার শিখে নিলে, exam-এর দিন যে line graph-ই আসুক, এটা কাজ করবে।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'READ: chart title, X-axis, Y-axis, unit, time range, year intervals, legend, and the number of data series. IDENTIFY: what is being measured, in what unit, over what period, and how many lines there are. TRACE: for each line — starting value, ending value, overall direction, highest point, lowest point, turning points, and any stable or fluctuating stretch.',
            bn: 'READ: chart-এর title, X-axis, Y-axis, unit, সময়ের range, বছরের interval, legend, আর data series-এর সংখ্যা। IDENTIFY: কী measure করা হচ্ছে, কোন unit-এ, কোন সময়কালে, আর কতগুলো line আছে। TRACE: প্রতিটা line-এর জন্য — starting value, ending value, overall direction, সবচেয়ে বেশি value, সবচেয়ে কম value, turning point, আর কোনো stable বা fluctuating অংশ।',
          },
          {
            en: 'COMPARE: which line rises, which falls, which stays stable, which grows fastest, which ends highest or lowest, and whether lines meet, cross, or move apart. GROUP: lines with similar behaviour go together in the same body paragraph — grouping follows the actual data, never a fixed formula.',
            bn: 'COMPARE: কোন line বাড়ছে, কোনটা কমছে, কোনটা স্থির আছে, কোনটা সবচেয়ে দ্রুত বাড়ছে, কোনটা সবচেয়ে বেশি বা কম দিয়ে শেষ হচ্ছে, আর line-গুলো একে অপরের সাথে মিলছে, crossing করছে, নাকি দূরে চলে যাচ্ছে। GROUP: একইরকম behaviour-এর line-গুলোকে একই body paragraph-এ রাখুন — grouping আসলে data অনুযায়ী হয়, কোনো fixed formula অনুযায়ী না।',
          },
          {
            en: "OVERVIEW: select only the two or three most important overall features — never every number. WRITE: Introduction, Overview, Body paragraph 1, Body paragraph 2. CHECK: every figure, year, unit and series name; trend direction; tense; articles; subject–verb agreement; repetition; and word count. Never invent a cause or prediction the graph does not show.",
            bn: 'OVERVIEW: সবচেয়ে গুরুত্বপূর্ণ দুই বা তিনটা overall feature বেছে নিন — প্রতিটা সংখ্যা না। WRITE: Introduction, Overview, Body paragraph 1, Body paragraph 2। CHECK: প্রতিটা figure, বছর, unit আর series-এর নাম; trend-এর direction; tense; article; subject–verb agreement; repetition; আর word count। graph-এ যা দেখানো হয়নি এমন কোনো cause বা prediction কখনো বানিয়ে লিখবেন না।',
          },
        ],
      },
    },

    // ---------------------------------------------------------------- stage 1
    {
      id: 'stage1-single-line',
      kind: 'guided',
      title: { en: 'Stage 1: Single-Line Graph', bn: 'Stage 1: একটি Line Graph' },
      trainerMessage: {
        en: "Let's start with one simple line graph. Your job here isn't to memorise every year separately — it's to understand the movement of the whole line. First look at the starting point, then the ending point. Then find the highest value, the biggest change, and anywhere the trend's direction shifted. A line that rises, then stays almost flat, then falls — that whole pattern is the chart's main story. Now let's work it out together.",
        bn: 'প্রথমে একটি line graph দিয়ে শুরু করি।\n\nএখানে আপনার কাজ হলো প্রতিটি বছর আলাদা করে মুখস্থ করা নয়। পুরো line-টার movement বোঝা।\n\nপ্রথমে starting point দেখুন। তারপর ending point। এরপর সবচেয়ে বেশি value, সবচেয়ে বড় change এবং যেখানে trend-এর direction বদলেছে, সেগুলো খুঁজে বের করুন।\n\nএকটা line উঠেছে, তারপর প্রায় স্থির হয়েছে, শেষে নেমেছে — এই পুরো pattern-টাই graph-এর মূল story।\n\nচলুন, এবার নিজে খুঁজে বের করি।',
      },
      material: { type: 'chart-board', dataset: LINE_GRAPH_DATASETS['lg-01-electricity'], tasks: LG01_GUIDED_TASKS },
    },
    {
      id: 'stage1-review',
      kind: 'review',
      title: { en: 'Stage 1 model answer and error clinic', bn: 'Stage 1-এর model answer আর error clinic' },
      trainerMessage: {
        en: "Here's a complete model answer. Below it, look at a few common mistakes too, so you don't repeat them.",
        bn: 'এটাই একটা সম্পূর্ণ model answer। নিচে সাধারণ কিছু ভুলও দেখুন, যাতে একই ভুল না হয়।',
      },
      material: {
        type: 'text',
        paragraphs: [
          'The line graph illustrates average monthly household electricity consumption in Linton between 2012 and 2022, measured in kilowatt-hours. Overall, consumption increased considerably during most of the period, reaching a peak in 2020 before declining moderately in the final two years. The most substantial growth occurred between 2014 and 2018, whereas the figure changed very little from 2018 to 2020. In 2012, the average household used 240 kWh per month. This figure rose to 260 kWh in 2014 before climbing more noticeably to 295 kWh in 2016. By 2018, consumption had reached 330 kWh, representing an increase of 90 kWh from the starting point. It then edged up by just five kWh to a peak of 335 kWh in 2020. During the final two years, the average fell by 25 kWh to 310 kWh. Despite this decline, the 2022 figure remained 70 kWh higher than the level recorded at the beginning of the period.',
          { en: '❌ "Electricity consumption was increased from 240 to 260 kWh." → ✅ "Electricity consumption increased from 240 to 260 kWh."', bn: '❌ "Electricity consumption was increased from 240 to 260 kWh." → ✅ "Electricity consumption increased from 240 to 260 kWh." — "increase" নিজেই একটা intransitive verb; এটাকে passive করার দরকার নেই।' },
          { en: '❌ "Consumption reached at 335 kWh." → ✅ "Consumption reached 335 kWh."', bn: '❌ "Consumption reached at 335 kWh." → ✅ "Consumption reached 335 kWh." — "reach" এর পরে "at" বসে না।' },
          { en: '❌ "The number of electricity was 335." → ✅ "Consumption stood at 335 kWh."', bn: '❌ "The number of electricity was 335." → ✅ "Consumption stood at 335 kWh." — "electricity" একটা uncountable পরিমাণ, "the number of" দিয়ে বলা যায় না, আর unit-টাও (kWh) বলতে হবে।' },
          { en: '❌ "Consumption increased continuously throughout the period." → ✅ "Consumption increased overall, despite a fall at the end."', bn: '❌ "Consumption increased continuously throughout the period." → ✅ "Consumption increased overall, despite a fall at the end." — শেষ দুই বছরে আসলে একটা পতন হয়েছে, তাই "continuously" সঠিক না।' },
        ],
      },
      check: {
        prompt: 'Which of these four sentences is grammatically correct and ready to use in a Task 1 response?',
        options: [
          'Electricity consumption was increased from 240 to 260 kWh.',
          'Electricity consumption increased from 240 to 260 kWh.',
          'Consumption reached at 335 kWh.',
          'The number of electricity was 335.',
        ],
        correctIndex: 1,
        explain: {
          en: '"Increase" is already intransitive and needs no passive form, so option 2 is correct as it stands. Option 1 wrongly makes it passive ("was increased"); option 3 adds an unnecessary "at" after "reached"; option 4 treats the uncountable noun "electricity" as something you can count ("the number of") and drops the unit.',
          bn: '"Increase" নিজেই intransitive, তাই passive করার দরকার নেই — option 2 যেমন আছে তেমনই সঠিক। Option 1 ভুলভাবে একে passive করেছে ("was increased"); option 3 "reached"-এর পরে অতিরিক্ত "at" যুক্ত করেছে; option 4 uncountable noun "electricity"-কে countable ("the number of") হিসেবে treat করেছে আর unit-টাও বাদ দিয়েছে।',
        },
      },
    },

    // ---------------------------------------------------------------- stage 2
    {
      id: 'stage2-two-lines',
      kind: 'guided',
      title: { en: 'Stage 2: Two-Line Graph', bn: 'Stage 2: দুটি Line Graph' },
      trainerMessage: {
        en: "Now the chart has two lines. Understanding one line's movement is no longer enough — you need to understand the relationship between the two. Are they moving in the same direction? Or is one rising while the other falls? Are they getting closer together? Has there been a crossing point anywhere? A point where the two lines swap ranking is often an important overview feature.",
        bn: 'এবার graph-এ দুটি line আছে।\n\nএখানে শুধু একটি line-এর movement বুঝলেই হবে না। আপনাকে দুটি line-এর relationship বুঝতে হবে।\n\nদুটো line কি একই দিকে যাচ্ছে? নাকি একটির value বাড়ছে, অন্যটির কমছে?\n\nতারা কি একে অপরের কাছাকাছি আসছে? কোথাও কি crossing হয়েছে?\n\nবিশেষ করে যেখানে দুটি line-এর ranking বদলায়, সেটি অনেক সময় একটি গুরুত্বপূর্ণ overview feature হয়।',
      },
      material: { type: 'chart-board', dataset: LINE_GRAPH_DATASETS['lg-02-metro-bus'], tasks: LG02_GUIDED_TASKS },
    },
    {
      id: 'stage2-review',
      kind: 'review',
      title: { en: 'Stage 2 model answer and error clinic', bn: 'Stage 2-এর model answer আর error clinic' },
      trainerMessage: {
        en: "See how two opposite trends are described together in one response.",
        bn: 'দুটি বিপরীত trend একসাথে কীভাবে বর্ণনা করা হয়, দেখুন।',
      },
      material: {
        type: 'text',
        paragraphs: [
          'The line graph compares annual passenger journeys on the metro and bus networks in Eastford between 2010 and 2030, with figures given in millions. Overall, metro use increased steadily, while the number of journeys made by bus declined throughout the period. The two figures became almost equal in 2020, after which the metro overtook buses and finished as the more widely used mode of transport. In 2010, buses carried 62 million passengers, nearly twice the metro total of 32 million. Bus use then fell gradually, reaching 58 million in 2015 and 50 million in 2020. By contrast, metro journeys grew from 32 million to 39 million in 2015, before reaching 48 million in 2020. At this point, the difference between the two networks had narrowed to just two million journeys. The trends continued in opposite directions thereafter. In 2025, metro usage stood at 60 million, compared with 43 million for buses. By 2030, the metro figure had risen to 72 million, whereas bus journeys had dropped further to 38 million. Consequently, the metro ended the period with a lead of 34 million journeys.',
          { en: '❌ "Metro was increased while bus was decreased." → ✅ "Metro use increased, while bus use decreased."', bn: '❌ "Metro was increased while bus was decreased." → ✅ "Metro use increased, while bus use decreased." — এখানেও "increase"/"decrease" passive লাগবে না।' },
          { en: '❌ "The metro crossed the bus." → ✅ "Metro journeys overtook bus journeys."', bn: '❌ "The metro crossed the bus." → ✅ "Metro journeys overtook bus journeys." — দুটো সংখ্যা একে অপরকে ছাড়িয়ে যাওয়া বোঝাতে "overtake" ব্যবহার করুন, "cross" সাধারণত এভাবে বলা হয় না।' },
          { en: '❌ "Both were same in 2020." → ✅ "The figures were almost equal in 2020."', bn: '❌ "Both were same in 2020." → ✅ "The figures were almost equal in 2020." — ২০২০-তে সংখ্যাগুলো ঠিক একইরকম না (৪৮ বনাম ৫০), তাই "almost equal" বেশি সঠিক, আর "same" একা noun ছাড়া বসে না।' },
          { en: '❌ "Bus passengers decreased by 38 million." → ✅ "Bus passengers fell to 38 million, a decrease of 24 million."', bn: '❌ "Bus passengers decreased by 38 million." → ✅ "Bus passengers fell to 38 million, a decrease of 24 million." — ৩৮ মিলিয়ন হলো শেষ figure, কমার পরিমাণ না; কমার পরিমাণ হলো ৬২−৩৮=২৪ মিলিয়ন।' },
        ],
      },
      check: {
        prompt: 'Which sentence correctly describes the metro and bus data?',
        options: [
          'Metro was increased while bus was decreased.',
          'Bus passengers decreased by 38 million.',
          'Metro use increased, while bus use decreased.',
          'The metro crossed the bus.',
        ],
        correctIndex: 2,
        explain: {
          en: 'Option 3 is accurate and correctly formed. Option 1 wrongly passivises "increase"/"decrease". Option 2 confuses the ending figure (38 million) with the size of the decrease, which was actually 24 million (62 − 38). Option 4 uses "crossed" where "overtook" is the standard Task 1 way to describe one series passing another.',
          bn: 'Option 3 সঠিক আর ঠিকভাবে তৈরি। Option 1 ভুলভাবে "increase"/"decrease"-কে passive করেছে। Option 2 শেষ figure-টাকে (৩৮ মিলিয়ন) কমার পরিমাণ মনে করছে, কিন্তু আসল কমার পরিমাণ হলো ২৪ মিলিয়ন (৬২ − ৩৮)। Option 4-এ "crossed" ব্যবহার করা হয়েছে, যেখানে একটা series আরেকটাকে ছাড়িয়ে যাওয়া বোঝাতে standard Task 1 শব্দ হলো "overtook"।',
        },
      },
    },

    // ---------------------------------------------------------------- stage 3
    {
      id: 'stage3-three-lines',
      kind: 'guided',
      title: { en: 'Stage 3: Three-Line Graph', bn: 'Stage 3: তিনটি Line Graph' },
      trainerMessage: {
        en: "This chart has three lines. But there is no rule that your report must have three separate, disconnected paragraphs. Lines that show similar behaviour can be discussed together. In this chart, coal and renewable energy move in opposite directions, while gas is comparatively stable. So try grouping the data by the relationship between the movements, not just line by line.",
        bn: 'এখানে তিনটি line আছে। কিন্তু আপনার report-এ তিনটি আলাদা, বিচ্ছিন্ন paragraph লিখতে হবে — এমন কোনো নিয়ম নেই।\n\nযে line-গুলো একই রকম behaviour দেখায়, সেগুলো একসঙ্গে আলোচনা করা যায়।\n\nএই graph-এ coal এবং renewable energy বিপরীত দিকে যাচ্ছে। Gas তুলনামূলকভাবে স্থির।\n\nসুতরাং data-কে শুধু line অনুযায়ী নয়, movement-এর relationship অনুযায়ী group করার চেষ্টা করুন।',
      },
      material: { type: 'chart-board', dataset: LINE_GRAPH_DATASETS['lg-03-electricity-sources'], tasks: LG03_GUIDED_TASKS },
    },
    {
      id: 'stage3-review',
      kind: 'review',
      title: { en: 'Stage 3 model answer and error clinic', bn: 'Stage 3-এর model answer আর error clinic' },
      trainerMessage: {
        en: 'See how the three lines are grouped into two body paragraphs.',
        bn: 'তিনটি line-কে দুইটা body paragraph-এ কীভাবে group করা হয়েছে, দেখুন।',
      },
      material: {
        type: 'text',
        paragraphs: [
          "The line graph illustrates the proportions of electricity generated from coal, gas and renewable sources in Ardin between 2005 and 2025. Overall, coal's share declined substantially, while renewable energy became increasingly important. Gas generation, in contrast, remained relatively stable and changed only slightly. By the end of the period, renewables had become the largest source of electricity. In 2005, coal accounted for 58% of total electricity generation, making it the dominant source. Its share then fell consistently, reaching 45% in 2015 and declining further to 29% by 2025. Renewable energy followed the opposite pattern. Starting at just 12%, its contribution doubled to 24% by 2015 and then climbed more rapidly to 43% in the final year. Gas accounted for 30% in 2005 and increased marginally to a peak of 32% in 2010. Thereafter, its share gradually slipped, standing at 28% in 2025. Renewables overtook gas between 2015 and 2020, while their share surpassed that of coal between 2020 and 2025. These changes resulted in a complete shift in the ranking of the three sources.",
          { en: '❌ "Renewables was increased." → ✅ "The share of renewable electricity increased."', bn: '❌ "Renewables was increased." → ✅ "The share of renewable electricity increased." — "renewables" plural subject-এর সাথে "was" বসে না, আর passive-এর দরকারও নেই।' },
          { en: '❌ "Coal was the most highest source." → ✅ "Coal had the highest share."', bn: '❌ "Coal was the most highest source." → ✅ "Coal had the highest share." — "most" আর "-est" একসাথে double superlative, যা ভুল।' },
          { en: '❌ "Gas stayed exactly the same." → ✅ "Gas remained relatively stable."', bn: '❌ "Gas stayed exactly the same." → ✅ "Gas remained relatively stable." — gas-এর value ৩০% থেকে ৩২%, পরে ২৮%-এ বদলেছে, তাই "exactly the same" সঠিক না।' },
          { en: '❌ "Renewables overtook coal in 2020." → ✅ "Renewables overtook coal between 2020 and 2025."', bn: '❌ "Renewables overtook coal in 2020." → ✅ "Renewables overtook coal between 2020 and 2025." — ২০২০-তে renewables ৩৩%, coal ৩৭% — তখনও coal বেশি; ২০২৫-এ renewables ৪৩% গিয়ে coal-এর ২৯%-কে ছাড়িয়ে যায়।' },
        ],
      },
      check: {
        prompt: 'Which sentence is both factually and grammatically correct?',
        options: [
          'Renewables was increased.',
          'Coal was the most highest source.',
          'The share of renewable electricity increased.',
          'Renewables overtook coal in 2020.',
        ],
        correctIndex: 2,
        explain: {
          en: 'Option 3 is correct. Option 1 has a subject–verb agreement error and an unneeded passive. Option 2 is a double superlative ("most" + "-est"). Option 4 is factually wrong: in 2020 renewables (33%) were still behind coal (37%); renewables did not overtake coal until the 2020–2025 interval, when they reached 43% against coal\'s 29%.',
          bn: 'Option 3 সঠিক। Option 1-এ subject–verb agreement ভুল আছে আর একটা অপ্রয়োজনীয় passive। Option 2 একটা double superlative ("most" + "-est")। Option 4 ভুল তথ্য: ২০২০-তে renewables (৩৩%) তখনও coal-এর (৩৭%) পেছনে ছিল; renewables আসলে coal-কে ছাড়িয়ে যায় ২০২০-২০২৫ এই সময়ে, যখন এটা ৪৩%-এ পৌঁছায় আর coal নামে ২৯%-এ।',
        },
      },
    },

    // ---------------------------------------------------------------- stage 4
    {
      id: 'stage4-fluctuation',
      kind: 'guided',
      title: { en: 'Stage 4: Fluctuating Line Graph', bn: 'Stage 4: ওঠানামা করা Line Graph' },
      trainerMessage: {
        en: "There's an important point about this chart. A line can rise and fall repeatedly, but that doesn't mean there's no overall trend. You need to look at short-term movement and the overall direction across the whole period as two separate things. Identify the peaks and troughs — but don't write every small fluctuation into your report. Select the turning points that actually matter.",
        bn: 'এই graph-এ একটা গুরুত্বপূর্ণ বিষয় আছে।\n\nএকটি line বারবার উঠতে এবং নামতে পারে। কিন্তু তার মানে এই নয় যে overall trend নেই।\n\nআপনাকে short-term movement এবং পুরো সময়ের overall direction — দুটো আলাদা করে দেখতে হবে।\n\nPeak এবং trough চিহ্নিত করুন। কিন্তু প্রতিটি ছোট ওঠানামা report-এ লিখবেন না। গুরুত্বপূর্ণ turning point-গুলো বেছে নিন।',
      },
      material: { type: 'chart-board', dataset: LINE_GRAPH_DATASETS['lg-04-cocoa-price'], tasks: LG04_GUIDED_TASKS },
    },
    {
      id: 'stage4-review',
      kind: 'review',
      title: { en: 'Stage 4 model answer and error clinic', bn: 'Stage 4-এর model answer আর error clinic' },
      trainerMessage: {
        en: 'See how the overall trend is described despite the repeated fluctuations.',
        bn: 'ওঠানামা থাকা সত্ত্বেও overall trend কীভাবে বর্ণনা করা হয়, দেখুন।',
      },
      material: {
        type: 'text',
        paragraphs: [
          'The line graph illustrates changes in the average wholesale price of cocoa beans in Meridian from 2010 to 2024, measured in US dollars per kilogram. Overall, the price fluctuated considerably throughout the period, but followed an upward trend. It reached its highest point in 2020 before falling, then recovered to finish below that peak but well above its initial level. In 2010, cocoa beans cost an average of $2.8 per kilogram. The price rose to $3.6 in 2012, but subsequently fell to $2.9 in 2014. It then increased sharply to $4.5 in 2016, before declining again to $3.7 two years later. A similar pattern continued in the second half of the period. The price climbed to a peak of $5.2 per kilogram in 2020, the highest figure shown. It then dropped to $4.1 in 2022 before recovering to $4.8 by 2024. Despite these repeated falls and recoveries, the final figure was $2.0 higher than the starting price, demonstrating a substantial overall increase.',
          { en: '❌ "Price was volatile dramatically every year." → ✅ "The price fluctuated considerably throughout the period."', bn: '❌ "Price was volatile dramatically every year." → ✅ "The price fluctuated considerably throughout the period." — "volatile dramatically" একটা অস্বাভাবিক adverb-adjective জোড়া; আর data প্রতি বছরের নয়, কয়েক বছর পরপরের।' },
          { en: '❌ "The price fell down to 2.9." → ✅ "The price fell to $2.9 per kg."', bn: '❌ "The price fell down to 2.9." → ✅ "The price fell to $2.9 per kg." — "fell down" redundant (down বাদ দিন), আর unit ($/kg) উল্লেখ করা জরুরি।' },
          { en: '❌ "The graph was unstable." → ✅ "The price showed considerable fluctuations."', bn: '❌ "The graph was unstable." → ✅ "The price showed considerable fluctuations." — graph নিজে "unstable" হয় না; যেটা ওঠানামা করে সেটা হলো price।' },
          { en: '❌ "It recovered back again." → ✅ "It recovered."', bn: '❌ "It recovered back again." → ✅ "It recovered." — "back" আর "again" দুটোই "recover"-এর মধ্যেই আছে, একসাথে ব্যবহার redundant।' },
        ],
      },
      check: {
        prompt: 'Which sentence correctly and naturally describes the cocoa price trend?',
        options: [
          'Price was volatile dramatically every year.',
          'The graph was unstable.',
          'The price fluctuated considerably throughout the period.',
          'It recovered back again.',
        ],
        correctIndex: 2,
        explain: {
          en: 'Option 3 is natural and accurate. Option 1 pairs an adverb and adjective unnaturally and overstates how often the price changed. Option 2 wrongly says the graph itself was "unstable" rather than the price it shows. Option 4 is redundant — "recovered" already means it went back up.',
          bn: 'Option 3 স্বাভাবিক আর নির্ভুল। Option 1-এ adverb আর adjective অস্বাভাবিকভাবে জোড়া লাগানো আছে, আর price কতবার বদলেছে সেটাও বাড়িয়ে বলা হয়েছে। Option 2 ভুলভাবে বলছে graph নিজে "unstable", আসলে যেটা দেখানো হচ্ছে সেই price-টা ওঠানামা করেছে। Option 4 redundant — "recovered" মানেই তো আগের অবস্থায় ফিরে যাওয়া।',
        },
      },
    },

    // ---------------------------------------------------------------- stage 5
    {
      id: 'stage5-four-lines',
      kind: 'guided',
      title: { en: 'Stage 5: Four-Line Graph', bn: 'Stage 5: চারটি Line Graph' },
      trainerMessage: {
        en: "Now the chart has four lines. The biggest challenge is making sure an important feature doesn't get lost while trying to report everything. First, group the lines by trend. Which line is rising fastest? Which is falling? Which is stable? Which overtakes another? Then decide which two or three features belong in the overview. A good writer never describes every line equally — they select the chart's most important information.",
        bn: 'এবার graph-এ চারটি line আছে। সবচেয়ে বড় challenge হলো — সবকিছু report-এ লিখতে গিয়ে যেন গুরুত্বপূর্ণ feature হারিয়ে না যায়।\n\nপ্রথমে trend অনুযায়ী group করুন।\n\nকোন line দ্রুত বাড়ছে? কোনটি কমছে? কোনটি স্থির আছে? কোনটি অন্য line-কে অতিক্রম করছে?\n\nতারপর ঠিক করুন কোন দুই বা তিনটি feature overview-তে যাবে।\n\nএকজন ভালো writer প্রতিটি line সমানভাবে বর্ণনা করেন না। তিনি graph-এর সবচেয়ে গুরুত্বপূর্ণ information বেছে নেন।',
      },
      material: { type: 'chart-board', dataset: LINE_GRAPH_DATASETS['lg-05-four-regions'], tasks: LG05_GUIDED_TASKS },
    },
    {
      id: 'stage5-review',
      kind: 'review',
      title: { en: 'Stage 5 model answer and error clinic', bn: 'Stage 5-এর model answer আর error clinic' },
      trainerMessage: {
        en: 'See what a coherent, selective report looks like with four lines.',
        bn: 'চারটা line নিয়ে একটা সুসংগত, সিলেক্টিভ report কেমন দেখায়, দেখুন।',
      },
      material: {
        type: 'text',
        paragraphs: [
          'The line graph compares the proportions of adults meeting a weekly physical-activity target in four regions between 2000 and 2025. Overall, Region D experienced the most substantial increase, while Region B showed a steady decline. Region C remained almost unchanged, whereas Region A recorded a more moderate rise. By 2025, Region D had the highest proportion among the four areas. In 2000, Region B had the largest figure, at 60%, compared with 45% in Region C and 35% in Region A. Region D started much lower, at just 20%. Over the following 15 years, the figure for Region D increased steadily to 46%, matching Region A\'s level in 2015. It then climbed further, overtaking Region B between 2015 and 2020. The remaining regions followed different patterns. Region B declined consistently from 60% to 40% over the period, while Region A rose gradually from 35% to 52%. In contrast, Region C varied only slightly, remaining within the narrow range of 45% to 47%. By 2025, Region D had reached 63%, the highest final figure, while Region B had fallen to 40%, the lowest.',
          { en: '❌ "Region D was more increased than others." → ✅ "Region D experienced the largest increase."', bn: '❌ "Region D was more increased than others." → ✅ "Region D experienced the largest increase." — "more increased" একটা ভুল double comparative; increase নিজেই degree বহন করে না এভাবে।' },
          { en: '❌ "Region C was constant." → ✅ "Region C remained relatively stable."', bn: '❌ "Region C was constant." → ✅ "Region C remained relatively stable." — Region C-এর value (৪৫, ৪৬, ৪৫, ৪৭, ৪৬, ৪৭) একটু একটু বদলেছে, পুরোপুরি "constant" ছিল না।' },
          { en: '❌ "Region D passed Region B in 2015." → ✅ "Region D overtook Region B between 2015 and 2020."', bn: '❌ "Region D passed Region B in 2015." → ✅ "Region D overtook Region B between 2015 and 2020." — ২০১৫-তে Region D ৪৬%, Region B ৪৮% — তখনও B এগিয়ে; D আসলে B-কে ছাড়ায় ২০১৫-২০২০-এর মধ্যে।' },
          { en: '❌ "All four regions increased." → ✅ "Three regions increased, while Region B declined."', bn: '❌ "All four regions increased." → ✅ "Three regions increased, while Region B declined." — Region B আসলে ৬০% থেকে ৪০%-এ কমেছে, Region C মোটামুটি স্থির ছিল।' },
        ],
      },
      check: {
        prompt: 'Which sentence correctly describes what happened in this four-region chart?',
        options: [
          'Region D was more increased than others.',
          'Region D passed Region B in 2015.',
          'Region D experienced the largest increase.',
          'All four regions increased.',
        ],
        correctIndex: 2,
        explain: {
          en: 'Option 3 is correct and naturally phrased. Option 1 is a faulty double comparative. Option 2 gives the wrong year — in 2015 Region D (46%) was still behind Region B (48%); the overtake happened between 2015 and 2020. Option 4 is factually wrong, since Region B declined and Region C stayed almost flat.',
          bn: 'Option 3 সঠিক আর স্বাভাবিকভাবে বলা। Option 1 একটা ভুল double comparative। Option 2 ভুল বছর বলছে — ২০১৫-তে Region D (৪৬%) তখনও Region B-এর (৪৮%) পেছনে ছিল; overtake টা হয়েছে ২০১৫-২০২০-এর মধ্যে। Option 4 ভুল তথ্য, কারণ Region B কমেছে আর Region C প্রায় স্থির ছিল।',
        },
      },
    },

    // ---------------------------------------------------------------- language bank
    {
      id: 'language-bank',
      kind: 'explain',
      title: { en: 'Line graph language bank', bn: 'Line graph-এর ভাষার bank' },
      trainerMessage: {
        en: 'This vocabulary is grouped by function, not as a list of interchangeable synonyms. Use each word to match the real size and speed of the change shown — never call a small increase "dramatically".',
        bn: 'এই vocabulary গুলো function অনুযায়ী ভাগ করা — আলাদা আলাদা synonym-এর তালিকা না। প্রতিটা শব্দ ব্যবহার করুন change-এর আসল আকার আর গতি অনুযায়ী; যেকোনো ছোট বৃদ্ধিকে "dramatically" বলবেন না।',
      },
      material: {
        type: 'vocab',
        items: [
          { phrase: 'rise / increase / climb / grow', use: { en: 'Upward movement — "The figure rose from 240 to 310 kWh."', bn: 'উপরের দিকে movement — "The figure rose from 240 to 310 kWh."' } },
          { phrase: 'fall / decrease / decline / drop', use: { en: 'Downward movement — "Coal\'s share fell from 58% to 29%."', bn: 'নিচের দিকে movement — "Coal\'s share fell from 58% to 29%."' } },
          { phrase: 'dip / plunge', use: { en: 'A small fall (dip) or a very sharp fall (plunge) — pick based on the actual size of the change.', bn: 'একটা ছোট পতন (dip) বা খুব তীক্ষ্ণ পতন (plunge) — change-এর আসল আকার অনুযায়ী বেছে নিন।' } },
          { phrase: 'remain stable / remain relatively unchanged', use: { en: 'Little or no change over time.', bn: 'সময়ের সাথে প্রায় কোনো পরিবর্তন নেই।' } },
          { phrase: 'level off', use: { en: 'Movement becomes flatter after a previous rise or fall — not the same as "plateau".', bn: 'আগের বৃদ্ধি বা পতনের পর movement আরও সমান হয়ে যায় — "plateau"-এর মতো একই না।' } },
          { phrase: 'plateau', use: { en: 'A period where the value stays at a similar level, typically after reaching a high point.', bn: 'একটা সময়কাল যখন value প্রায় একই level-এ থাকে, সাধারণত একটা উচ্চ বিন্দুতে পৌঁছানোর পর।' } },
          { phrase: 'fluctuate / vary', use: { en: 'Repeated rises and falls, without a single clear direction in the short term.', bn: 'অল্প সময়ের মধ্যে একক কোনো পরিষ্কার direction ছাড়া বারবার ওঠা-নামা।' } },
          { phrase: 'peak at / reach a peak of', use: { en: 'The highest point a line reaches — "The price peaked at $5.2 in 2020."', bn: 'একটা line যে সবচেয়ে বেশি point-এ পৌঁছায় — "The price peaked at $5.2 in 2020."' } },
          { phrase: 'bottom out at / hit a low of', use: { en: 'The lowest point a line reaches.', bn: 'একটা line যে সবচেয়ে কম point-এ পৌঁছায়।' } },
          { phrase: 'recover / rebound', use: { en: 'Rising again after a fall.', bn: 'একটা পতনের পর আবার বেড়ে যাওয়া।' } },
          { phrase: 'overtake / surpass', use: { en: 'One line passing another in value — "Renewables overtook coal between 2020 and 2025."', bn: 'একটা line value-এ আরেকটাকে ছাড়িয়ে যাওয়া — "Renewables overtook coal between 2020 and 2025."' } },
          { phrase: 'catch up with / converge', use: { en: 'Two lines becoming closer in value.', bn: 'দুটো line-এর value একে অপরের কাছাকাছি চলে আসা।' } },
          { phrase: 'diverge / widen the gap / narrow the gap', use: { en: 'Two lines moving further apart, or the gap between them shrinking.', bn: 'দুটো line একে অপরের থেকে দূরে চলে যাওয়া, বা তাদের মধ্যের ফারাক কমে যাওয়া।' } },
          { phrase: 'slightly / gradually / steadily / sharply / substantially', use: { en: 'Degree and speed words — match the word to the real size and speed of the change shown, never by habit.', bn: 'মাত্রা আর গতির শব্দ — এই শব্দ-গুলো দেখানো change-এর আসল আকার আর গতি অনুযায়ী ব্যবহার করুন, অভ্যাসবশত না।' } },
        ],
      },
    },

    // ---------------------------------------------------------------- common mistakes
    {
      id: 'common-mistakes',
      kind: 'review',
      title: { en: 'Common line graph mistakes', bn: 'Line graph-এ সাধারণ ভুল' },
      trainerMessage: {
        en: 'These are the mistakes that come up most often across all five stages. Run through this checklist once before you write.',
        bn: 'পাঁচটা stage মিলিয়ে এই ভুলগুলো সবচেয়ে বেশি দেখা যায়। লেখার আগে এই checklist-টা একবার মনে করুন।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'Reporting every data point instead of selecting key features; writing a separate paragraph for every single line without any real comparison; confusing the highest point with the largest increase (they are often different years); and saying a line increased continuously when it actually fluctuated.',
            bn: 'প্রতিটা key feature বেছে নেওয়ার বদলে প্রতিটা data point report করা; প্রতিটা line-এর জন্য আলাদা paragraph লেখা, কোনো real comparison ছাড়াই; সবচেয়ে বেশি value আর সবচেয়ে বড় increase গুলিয়ে ফেলা (এগুলো প্রায়ই আলাদা বছর); আর একটা line আসলে fluctuate করলেও এটাকে "continuously increased" বলে ফেলা।',
          },
          {
            en: 'Missing a crossover entirely, or reporting the wrong year for one; reversing the start and end values by mistake; confusing a unit (%, kWh, $) with a plain count; using the present tense for a completed historical period; describing a cause the graph does not show; repeating the overview word-for-word in a later paragraph; and reaching for an intensifier like "dramatically" for a change that was actually small.',
            bn: 'একটা crossover-ই মিস করা, বা এর বছরটা ভুল বলা; শুরু আর শেষের value উল্টে ফেলা; একটা unit (%, kWh, $) আর একটা সাধারণ সংখ্যা গুলিয়ে ফেলা; একটা সম্পন্ন অতীত সময়কালের জন্য present tense ব্যবহার করা; graph-এ না থাকা একটা কারণ বর্ণনা করা; overview-টা পরের কোনো paragraph-এ একই কথা দিয়ে আবার বলা; আর একটা ছোট change-এর জন্য "dramatically"-এর মতো intensifier ব্যবহার করা।',
          },
        ],
      },
    },

    // ---------------------------------------------------------------- readiness
    {
      id: 'readiness',
      kind: 'independent',
      title: { en: 'Ready for the independent test', bn: 'Independent test-এর জন্য প্রস্তুত' },
      trainerMessage: {
        en: "You've now finished five stages — from one line to four complex ones. Next, a new, unseen four-series chart is coming. Give yourself 20 minutes, write at least 150 words — Introduction, Overview, and two Body paragraphs. There are no guided questions this time; apply the whole method you learned across the five stages on your own.",
        bn: 'আপনি এখন পাঁচটা stage শেষ করেছেন — একটা line থেকে চারটা জটিল line পর্যন্ত। এবার একটা নতুন, আগে না দেখা চার-series chart আসবে। নিজেকে ২০ মিনিট সময় দিন, অন্তত ১৫০ শব্দ লিখুন — Introduction, Overview, আর দুইটা Body paragraph। এবার কোনো guided question নেই; আগের পাঁচ stage-এ শেখা পুরো method-টা নিজে প্রয়োগ করুন।',
      },
    },
  ],
  finalPrompt: {
    title: { en: 'Independent Line Graph Test', bn: 'Independent Line Graph Test' },
    instructions: {
      en: 'The line graph below shows the proportion of households using four different home-heating methods in Dalton Borough between 2000 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      bn: 'নিচের line graph-টা দেখায় Dalton Borough-তে ২০০০ থেকে ২০২৫ সালের মধ্যে চারটা আলাদা home-heating পদ্ধতি ব্যবহারকারী household-এর অনুপাত। তথ্যগুলো বেছে নিয়ে আর main feature report করে summarise করুন, আর যেখানে প্রয়োজন সেখানে comparison করুন। অন্তত ১৫০ শব্দ লিখুন।',
    },
    minWords: 150,
    chartId: 'lg-06-independent-test',
  },
};
