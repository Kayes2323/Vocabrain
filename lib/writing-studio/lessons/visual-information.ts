import type { Lesson } from '../types';
import { CHART_DATASETS } from '../charts';

/**
 * Task 1 Academy — Module 2 ("Understanding Visual Information"). The skill
 * that must come before any writing: READ → UNDERSTAND → COMPARE → SELECT →
 * THEN WRITE. Covers a chart's structure, units, period/categories, legend,
 * trend-versus-static, direction of change, percentage points versus
 * relative growth, and selecting key features — all anchored to the
 * 'commute-methods' dataset (illustrative training data, not real
 * statistics). Every figure quoted below must agree with that dataset;
 * scripts/test-visual-information.ts checks this.
 *
 * The lesson's closing exercise is a targeted skill drill (skillFocus +
 * checkScope), so it never produces or stores a full-task IELTS band.
 */
export const visualInformationLesson: Lesson = {
  id: 'visual-information',
  task: 'task1',
  moduleId: 'task1-m2',
  title: {
    en: 'Understanding Visual Information — Read Before You Write',
    bn: 'Visual Information বোঝা — লেখার আগে পড়ো',
  },
  objective: 'Learn to identify what is measured, what is compared, what changes, and which features matter most.',
  estMinutes: 20,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: { en: 'Read Before You Write', bn: 'লেখার আগে পড়ো' },
      trainerMessage: {
        en: "Hi, welcome back. In the previous lesson, you learned what IELTS Academic Writing Task 1 asks you to do. Today, we are developing the skill that must come before writing: understanding the visual itself. Imagine receiving a chart in the IELTS exam. You immediately start writing because you want to save time. But you misunderstand the unit, miss the main trend or compare the wrong categories. Your grammar may be excellent, but your description will still be inaccurate. Today, I want you to develop one habit: never write before you understand what the visual is telling you.",
        bn: 'হাই, আবার স্বাগতম। আগের lesson-এ তুমি শিখেছ IELTS Academic Writing Task 1 আসলে কী চায়। আজ আমরা এমন একটা skill develop করব যেটা লেখার আগে দরকার: visual-টা নিজে বোঝা। ধরো, IELTS exam-এ তুমি একটা chart পেলে। সময় বাঁচানোর জন্য সাথে সাথে লেখা শুরু করলে। কিন্তু unit ভুল বুঝলে, মূল trend মিস করলে, বা ভুল category তুলনা করলে — তোমার grammar চমৎকার হলেও description ভুল হয়ে যাবে। আজ আমি চাই তুমি একটা habit গড়ো: visual-টা কী বলছে না বুঝে কখনো লিখো না।',
      },
    },
    {
      id: 'visual-anatomy',
      kind: 'explain',
      title: { en: 'Understand the Parts of a Chart', bn: 'Chart-এর অংশগুলো বোঝো' },
      trainerMessage: {
        en: 'Before reading individual values, inspect the structure of the visual. Every label provides information. Missing one can change your entire interpretation.',
        bn: 'আলাদা আলাদা value পড়ার আগে, visual-টার structure দেখো। প্রতিটা label-ই তথ্য দেয়। একটা মিস করলে তোমার পুরো interpretation বদলে যেতে পারে।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'Start with the title. It tells you the subject of the visual. Then inspect the labels and categories. These tell you what is being measured or compared.',
            bn: 'প্রথমে title দেখো। এটা visual-টার subject বলে দেয়। তারপর label আর category দেখো। এগুলো বলে কী measure বা compare করা হচ্ছে।',
          },
          {
            en: 'For a typical graph, the horizontal axis (x-axis) often shows time periods or categories, while the vertical axis (y-axis) often shows the measured quantity. However, always read the actual labels instead of assuming what an axis represents.',
            bn: 'সাধারণত একটা graph-এ horizontal axis (x-axis) সময় বা category দেখায়, আর vertical axis (y-axis) দেখায় measured quantity। তবে axis কী represent করছে সেটা ধরে না নিয়ে, সবসময় আসল label পড়ো।',
          },
          {
            en: "A legend explains what each colour, line, symbol or bar represents. If a chart contains several countries or groups, confusing the legend can lead you to report one group's figures as another group's.",
            bn: 'legend বলে দেয় প্রতিটা রং, line, symbol বা bar কী represent করছে। chart-এ একাধিক দেশ বা group থাকলে, legend গুলিয়ে ফেললে একটা group-এর figure অন্য group-এর বলে report করে ফেলতে পারো।',
          },
          {
            en: 'Your first job is not to describe the chart. It is to understand its structure.',
            bn: 'তোমার প্রথম কাজ chart describe করা না। প্রথম কাজ হলো এর structure বোঝা।',
          },
        ],
      },
    },
    {
      id: 'units',
      kind: 'explain',
      title: { en: 'What Exactly Is Being Measured?', bn: 'আসলে কী measure করা হচ্ছে?' },
      trainerMessage: {
        en: 'One of the easiest ways to misread a chart is to notice the number but ignore its unit. A value of 40 does not tell you much until you know what 40 represents.',
        bn: 'chart ভুল পড়ার সবচেয়ে সহজ একটা উপায় হলো সংখ্যাটা দেখা কিন্তু এর unit উপেক্ষা করা। ৪০ কী represent করছে সেটা না জানলে শুধু "40" সংখ্যাটা তেমন কিছু বলে না।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'A chart might measure percentages, numbers of people, money, hours, tonnes, kilometres or another quantity. The same numerical value can represent completely different things depending on its unit.',
            bn: 'একটা chart percentage, মানুষের সংখ্যা, টাকা, ঘণ্টা, টন, কিলোমিটার বা অন্য কোনো quantity measure করতে পারে। একই সংখ্যা তার unit অনুযায়ী সম্পূর্ণ ভিন্ন জিনিস represent করতে পারে।',
          },
          {
            en: 'For example, 40% means forty out of every hundred. It is not automatically the same as 40 people. Similarly, $40 is a monetary amount, not a percentage.',
            bn: 'যেমন, 40% মানে প্রতি একশোতে চল্লিশ। এটা এমনিতেই 40 জন মানুষের সমান না। একইভাবে, $40 একটা টাকার পরিমাণ, কোনো percentage না।',
          },
          {
            en: "In our commuting chart, the unit is '% of commuters'. Therefore, 52 means that 52% of commuters used cars in 2010. It does not mean 52 individual people.",
            bn: "আমাদের commuting chart-এ unit হলো '% of commuters'। তাই 52 মানে হলো 2010 সালে 52% commuter car ব্যবহার করেছে। এর মানে 52 জন মানুষ না।",
          },
          {
            en: 'Always identify the unit before interpreting a value. Never silently change the unit when writing.',
            bn: 'একটা value interpret করার আগে সবসময় এর unit চিহ্নিত করো। লেখার সময় চুপচাপ unit বদলে ফেলবে না।',
          },
          { en: 'Correct: "Car use accounted for 52% of commuters in 2010."', bn: 'সঠিক: "Car use accounted for 52% of commuters in 2010."' },
          { en: 'Incorrect: "There were 52 car users in 2010."', bn: 'ভুল: "There were 52 car users in 2010."' },
          { en: 'Why? The chart reports a percentage, not an absolute number of people.', bn: 'কেন? chart-টা একটা percentage report করছে, মানুষের absolute সংখ্যা না।' },
        ],
      },
    },
    {
      id: 'time-categories',
      kind: 'explain',
      title: { en: 'What Is Being Compared?', bn: 'কী comparison করা হচ্ছে?' },
      trainerMessage: {
        en: 'Now identify the period or categories. Are you comparing years, months, countries, age groups or different methods? The answer determines what kind of description is appropriate.',
        bn: 'এবার period বা category চিহ্নিত করো। তুমি কি বছর, মাস, দেশ, বয়সের group, নাকি ভিন্ন ভিন্ন method তুলনা করছ? এই উত্তরটাই ঠিক করে কোন ধরনের description উপযুক্ত।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'A chart covering 2000 to 2020 shows a time-based comparison. A chart comparing five cities in one year shows differences between categories, not necessarily change over time.',
            bn: '2000 থেকে 2020 পর্যন্ত একটা chart সময়ের সাথে পরিবর্তনের comparison দেখায়। আবার একই বছরে পাঁচটা শহর তুলনা করা chart category-র মধ্যে পার্থক্য দেখায়, সময়ের সাথে পরিবর্তন না।',
          },
          {
            en: 'Look carefully at the starting and ending dates. Do not accidentally reverse them. A rise from 2010 to 2023 is not the same as a fall from 2023 to 2010.',
            bn: 'শুরু আর শেষের তারিখ ভালোভাবে দেখো। ভুলে এগুলো উল্টে ফেলো না। 2010 থেকে 2023-এ একটা বৃদ্ধি, 2023 থেকে 2010-এ পতনের মতো না।',
          },
          {
            en: 'In our commuting chart, the two periods are 2010 and 2023. This allows us to compare how the proportions changed between those years.',
            bn: 'আমাদের commuting chart-এ দুইটা period হলো 2010 আর 2023। এর মাধ্যমে আমরা দেখতে পারি proportion-গুলো এই বছরগুলোর মধ্যে কীভাবে বদলেছে।',
          },
          {
            en: 'If a chart shows only one year, do not invent a trend. You can compare categories, but you cannot claim that something increased over time without evidence from another period.',
            bn: 'একটা chart যদি শুধু একটা বছর দেখায়, তাহলে trend বানিয়ে বোলো না। তুমি category তুলনা করতে পারো, কিন্তু অন্য period-এর প্রমাণ ছাড়া কিছু সময়ের সাথে বেড়েছে এমন claim করতে পারবে না।',
          },
        ],
      },
    },
    {
      id: 'legend',
      kind: 'explain',
      title: { en: 'Know Which Data Belongs to Which Group', bn: 'কোন data কোন group-এর, সেটা জানো' },
      trainerMessage: {
        en: 'When a visual contains multiple lines, colours or groups, the legend becomes essential. You must know which data series you are reading before making a comparison.',
        bn: 'যখন একটা visual-এ একাধিক line, রং বা group থাকে, তখন legend খুবই গুরুত্বপূর্ণ হয়ে ওঠে। comparison করার আগে তোমাকে জানতে হবে তুমি কোন data series পড়ছ।',
      },
      material: {
        type: 'examples',
        good:
          'In the commuting chart, the first series represents 2010 and the second represents 2023. Car use can therefore be compared as 52% in 2010 against 38% in 2023.',
        weak: 'Car use was 52% in 2023 and 38% in 2010.',
        note: {
          en: 'The weak example reverses the two series. The numbers are real values from the chart, but the years have been assigned incorrectly. Accurate data attribution matters as much as accurate numbers.',
          bn: 'এই weak example-এ দুইটা series উল্টে ফেলা হয়েছে। সংখ্যাগুলো chart-এর আসল value, কিন্তু বছরগুলো ভুলভাবে বসানো হয়েছে। সঠিক সংখ্যার মতোই, সঠিক data attribution-ও গুরুত্বপূর্ণ।',
        },
      },
    },
    {
      id: 'trend-or-static',
      kind: 'demonstrate',
      title: { en: 'Does This Visual Actually Show a Trend?', bn: 'এই visual-টা কি আসলেই একটা trend দেখাচ্ছে?' },
      trainerMessage: {
        en: 'Not every visual shows a trend. You must first decide whether the visual shows change over time or a comparison at a particular point.',
        bn: 'প্রতিটা visual trend দেখায় না। প্রথমে ঠিক করতে হবে visual-টা সময়ের সাথে পরিবর্তন দেখাচ্ছে, নাকি একটা নির্দিষ্ট সময়ের comparison।',
      },
      material: {
        type: 'examples',
        good:
          'A line graph showing renewable electricity generation in 2000, 2005, 2010, 2015 and 2020 can show how the figures changed over time.',
        weak: 'A pie chart showing the market shares of five companies in 2020 proves that Company A has grown over time.',
        note: {
          en: 'The pie chart shows one point in time. Without another year or a separate time-based comparison, it cannot prove growth. You can say Company A had the largest share in 2020, but not that it grew. Dynamic visuals often include time-based data. Static visuals may compare categories at one point in time. Maps and process diagrams have their own logic: maps show spatial changes or differences, while process diagrams show stages or sequences. Do not force rising and falling trend language onto every visual.',
          bn: 'এই pie chart-টা একটা মাত্র সময়ের মুহূর্ত দেখায়। আরেকটা বছর বা আলাদা সময়ের comparison ছাড়া এটা বৃদ্ধি প্রমাণ করতে পারে না। তুমি বলতে পারো Company A-এর 2020-এ সবচেয়ে বড় share ছিল, কিন্তু এটা বেড়েছে বলতে পারবে না। Dynamic visual-এ প্রায়ই সময়ভিত্তিক data থাকে। Static visual একটা মুহূর্তে category তুলনা করতে পারে। Map আর process diagram-এর নিজস্ব logic আছে: map স্থানগত পরিবর্তন বা পার্থক্য দেখায়, আর process diagram ধাপ বা sequence দেখায়। প্রতিটা visual-এর ওপর জোর করে rising/falling trend-এর ভাষা চাপিয়ে দিও না।',
        },
      },
    },
    {
      id: 'comparison',
      kind: 'explain',
      title: { en: 'Identify the Direction and Relationship', bn: 'Direction আর relationship চিহ্নিত করো' },
      trainerMessage: {
        en: 'Once you understand the structure, units and periods, you can start comparing the data. Look for increases, decreases, stability, the highest value, the lowest value and relationships between categories.',
        bn: 'structure, unit আর period বুঝে গেলে, এবার data comparison শুরু করতে পারো। বৃদ্ধি, হ্রাস, স্থিতিশীলতা, সর্বোচ্চ value, সর্বনিম্ন value, আর category-র মধ্যে সম্পর্ক খুঁজে বের করো।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'An increase means a value became higher. A decrease means it became lower. Stability means it remained unchanged or changed very little. A mixed pattern means different categories moved in different directions.',
            bn: 'বৃদ্ধি মানে value বেড়েছে। হ্রাস মানে value কমেছে। স্থিতিশীলতা মানে একই আছে বা খুব সামান্য বদলেছে। mixed pattern মানে ভিন্ন ভিন্ন category ভিন্ন দিকে গেছে।',
          },
          {
            en: 'In our chart, car use fell from 52% to 38%. Bicycle use rose from 6% to 19%. Bus use declined slightly from 24% to 21%. Train use increased from 11% to 15%, while walking remained unchanged at 7%.',
            bn: 'আমাদের chart-এ car use 52% থেকে 38%-এ কমেছে। Bicycle use 6% থেকে 19%-এ বেড়েছে। Bus use সামান্য কমে 24% থেকে 21%-এ এসেছে। Train use 11% থেকে 15%-এ বেড়েছে, আর walking 7%-এ অপরিবর্তিত থেকেছে।',
          },
          {
            en: 'Do not describe a small change as dramatic. Do not call a value stable if it changed substantially. Your wording must match the size and direction of the actual change.',
            bn: 'একটা ছোট পরিবর্তনকে dramatic বলো না। আবার যদি value অনেক বদলে যায়, সেটাকে stable বোলো না। তোমার ভাষা আসল পরিবর্তনের মাপ আর দিকের সাথে মিলতে হবে।',
          },
          {
            en: 'Also distinguish the highest value from the fastest-growing value. Car use remained the largest category in 2023, while bicycle use experienced the greatest relative growth.',
            bn: 'সর্বোচ্চ value আর সবচেয়ে দ্রুত বৃদ্ধি পাওয়া value — এই দুইটাকেও আলাদা করে দেখো। 2023-এ Car use সবচেয়ে বড় category হয়েই ছিল, অথচ bicycle use-এ সবচেয়ে বেশি relative বৃদ্ধি হয়েছে।',
          },
        ],
      },
    },
    {
      id: 'change-types',
      kind: 'demonstrate',
      title: { en: 'Two Different Ways to Describe Change', bn: 'পরিবর্তন বর্ণনা করার দুইটা আলাদা উপায়' },
      trainerMessage: {
        en: 'This distinction is important. Students often confuse percentage-point change with percentage growth. These are not interchangeable.',
        bn: 'এই পার্থক্যটা গুরুত্বপূর্ণ। অনেক student percentage-point change আর percentage growth গুলিয়ে ফেলে। এই দুইটা একই জিনিস না।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'Percentage-point change is calculated by subtracting the original percentage from the final percentage.',
            bn: 'Percentage-point change বের করা হয় শেষের percentage থেকে শুরুর percentage বিয়োগ করে।',
          },
          { en: 'For bicycle use: 19% − 6% = an increase of 13 percentage points.', bn: 'Bicycle use-এর জন্য: 19% − 6% = 13 percentage point বৃদ্ধি।' },
          {
            en: 'Relative percentage growth compares the change with the original value. For bicycle use: (19 − 6) ÷ 6 × 100 ≈ 216.7% growth.',
            bn: 'Relative percentage growth পরিবর্তনটাকে শুরুর value-র সাথে তুলনা করে। Bicycle use-এর জন্য: (19 − 6) ÷ 6 × 100 ≈ 216.7% growth।',
          },
          {
            en: 'Therefore, bicycle use rose by 13 percentage points, which represents approximately 217% relative growth. Saying it increased by 13% would be inaccurate.',
            bn: 'তাই, bicycle use 13 percentage point বেড়েছে, যেটা প্রায় 217% relative growth represent করে। শুধু "13% বেড়েছে" বলাটা ভুল হবে।',
          },
          {
            en: 'For Task 1, you do not need to calculate relative growth every time. Use the type of comparison that accurately communicates the data. When describing a change between two percentages, percentage points are often the clearest option.',
            bn: 'Task 1-এ প্রতিবার relative growth হিসাব করার দরকার নেই। data-টা সঠিকভাবে বোঝায় এমন comparison ব্যবহার করো। দুইটা percentage-এর মধ্যে পরিবর্তন বর্ণনা করার সময়, percentage point প্রায়ই সবচেয়ে স্পষ্ট option।',
          },
          {
            en: 'Accuracy rule: never label a difference of 13 percentage points as a 13% increase unless the relative calculation supports that statement.',
            bn: 'নির্ভুলতার নিয়ম: relative হিসাব সেটাকে সমর্থন না করলে, 13 percentage point-এর পার্থক্যকে কখনো "13% বৃদ্ধি" বলবে না।',
          },
        ],
      },
    },
    {
      id: 'key-features',
      kind: 'explain',
      title: 'What Deserves Your Attention?',
      trainerMessage:
        'A chart may contain many values, but a good Task 1 response does not describe every single one. You must select the most significant information.',
      material: {
        type: 'text',
        paragraphs: [
          'Look for the biggest overall patterns: the highest or lowest category, the largest increase or decrease, an unchanged value, an unusual difference, or a clear contrast between groups.',
          'A strong overview gives the reader the main message of the visual. It does not become a list of numbers.',
          'For our commuting chart, two highly significant features are that car use remained the most common method in both years despite a considerable decline, while bicycle use rose sharply and narrowed the gap.',
          'Walking remained unchanged, but that is a secondary feature. It may be useful in a body paragraph, but it is not necessarily the most important headline.',
          'Selection is not the same as ignoring data randomly. You select information because it helps explain the most important patterns.',
        ],
      },
    },
    {
      id: 'guided-analysis',
      kind: 'guided',
      title: 'Read the Commuting Chart Step by Step',
      trainerMessage:
        'Now you will apply the method to a real chart inside Mino. Do not rush. Answer each question using the chart itself, not your memory or guesswork.',
      material: {
        type: 'chart-board',
        dataset: CHART_DATASETS['commute-methods'],
        tasks: [
          {
            id: 'identify-unit',
            order: 1,
            prompt: 'What is being measured, and what is the unit?',
            modelAnswer: 'The chart compares the main methods of travelling to work, measured as a percentage of commuters.',
            belongsIn: 'overview',
          },
          {
            id: 'identify-period',
            order: 2,
            prompt: 'Which two years are being compared?',
            modelAnswer: 'The chart compares 2010 and 2023.',
            belongsIn: 'overview',
          },
          {
            id: 'car-direction',
            order: 3,
            prompt: 'How did car use change between the two years? Include the correct figures.',
            modelAnswer: 'Car use fell from 52% in 2010 to 38% in 2023, a decrease of 14 percentage points.',
            belongsIn: 'body',
          },
          {
            id: 'bicycle-direction',
            order: 4,
            prompt: 'Which method experienced the largest relative increase, and what were its starting and ending values?',
            modelAnswer: 'Bicycle use experienced the largest relative increase, rising from 6% in 2010 to 19% in 2023.',
            belongsIn: 'body',
          },
          {
            id: 'stable-category',
            order: 5,
            prompt: 'Which category remained unchanged?',
            modelAnswer: 'Walking remained unchanged at 7% in both years.',
            belongsIn: 'body',
          },
          {
            id: 'headline',
            order: 6,
            prompt: 'What is the most important overall pattern that a reader should notice?',
            modelAnswer: 'Car use remained the most common commuting method despite declining, while bicycle use rose sharply and narrowed the gap.',
            belongsIn: 'overview',
          },
        ],
      },
    },
    // The step-11 "clinic" is four questions. A LessonStep carries exactly one
    // CheckQuestion and the runner renders one per step, so the clinic is four
    // consecutive check steps rather than a new schema field.
    {
      id: 'misreading-clinic',
      kind: 'check',
      title: 'Can You Spot the Misreading? (1 of 4)',
      trainerMessage:
        "Let's test whether you can catch mistakes that may look convincing but misrepresent the chart.",
      check: {
        prompt: "The chart measures the percentage of commuters. A student writes: 'There were 52 car users in 2010.' What is wrong?",
        options: [
          'The sentence uses too many words.',
          'The student changed a percentage into an absolute number.',
          'The student should use past perfect tense.',
          'The student should describe the weather.',
        ],
        correctIndex: 1,
        explain: 'The chart reports 52% of commuters, not 52 individual people. The unit must remain accurate.',
      },
    },
    {
      id: 'misreading-clinic-2',
      kind: 'check',
      title: 'Can You Spot the Misreading? (2 of 4)',
      trainerMessage: 'Next: direction and size of change. Check the subtraction before you choose.',
      check: {
        prompt: 'Car use fell from 52% in 2010 to 38% in 2023. Which statement is accurate?',
        options: [
          'Car use increased by 14 percentage points.',
          'Car use decreased by 14 percentage points.',
          'Car use decreased by 14%.',
          'Car use remained stable.',
        ],
        correctIndex: 1,
        explain: '52 − 38 = 14 percentage points. The direction is downward, so it is a decrease.',
      },
    },
    {
      id: 'misreading-clinic-3',
      kind: 'check',
      title: 'Can You Spot the Misreading? (3 of 4)',
      trainerMessage: 'Now a stable category. Match your wording to what actually happened.',
      check: {
        prompt: 'Walking accounted for 7% in both 2010 and 2023. Which description is most accurate?',
        options: [
          'Walking use rose sharply.',
          'Walking use fell considerably.',
          'Walking use remained unchanged.',
          'Walking became the most popular method.',
        ],
        correctIndex: 2,
        explain: 'The value is exactly 7% in both years, so it remained unchanged.',
      },
    },
    {
      id: 'misreading-clinic-4',
      kind: 'check',
      title: 'Can You Spot the Misreading? (4 of 4)',
      trainerMessage: 'Last one: choose the interpretation that a reader could rely on.',
      check: {
        prompt: 'Which is the strongest overall interpretation of the commuting chart?',
        options: [
          'Every commuting method increased between 2010 and 2023.',
          'Car use remained the largest category, while bicycle use rose substantially.',
          'Walking became the most popular commuting method.',
          'The chart proves that the government encouraged cycling.',
        ],
        correctIndex: 1,
        explain: 'Option 2 accurately identifies two major patterns. Option 4 invents a cause that the chart does not provide.',
      },
    },
    {
      id: 'independent-review',
      kind: 'review',
      title: 'Your Chart-Reading Checklist',
      trainerMessage:
        'You have now practised reading the chart before writing. Your next job is to apply the same method independently. A strong writer does not simply notice numbers; a strong writer understands what those numbers mean.',
      material: {
        type: 'text',
        paragraphs: [
          'Before writing any Task 1 response, ask yourself: What is the subject? What is the unit? Which periods or categories are shown? What does each series represent? Is the visual showing change over time or a static comparison?',
          'Then ask: What increased? What decreased? What remained stable? Which category is highest or lowest? Which one or two patterns are most significant?',
          'Finally, check your interpretation. Have you reversed a year? Confused a percentage with a number? Mixed up percentage points and percentage growth? Added a cause or opinion that the visual never stated?',
          'You are ready to write only when you can explain the main message of the visual accurately in your own words.',
        ],
      },
    },
  ],
  finalPrompt: {
    title: 'Write the Main Message of the Chart',
    instructions:
      'Using the commuting chart you have just analysed, write a concise two-sentence overview of its most significant features. Your overview should: identify the main pattern in car use; identify the major change in bicycle use; use the correct direction of change; preserve the correct categories and time comparison; avoid listing every figure; and avoid unsupported explanations or personal opinions. Do not write an introduction or body paragraph. Focus only on communicating the main message accurately.',
    minWords: 20,
    chartId: 'commute-methods',
    skillFocus: 'Chart interpretation and key-feature selection',
    checkScope: 'overview-only',
  },
};
