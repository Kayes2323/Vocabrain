import { CHART_DATASETS } from '../charts';
import type { Lesson } from '../types';

/**
 * Task 1 Academy — Module 6 ("Vocabulary and Grammar for Task 1"). Teaches
 * accurate trend verbs, magnitude and pace, percentage points versus relative
 * change, comparison structures, tense chosen by time reference, core Task 1
 * grammar, and natural collocations — all through the 'commute-methods'
 * dataset (illustrative training data, not real statistics). Every figure,
 * calculation and answer key below is checked against that dataset by
 * scripts/test-task1-vocab-grammar.ts.
 *
 * Content rules this lesson follows: accuracy before variety; no claim about
 * HOW a figure moved between two data points (the chart has only 2010 and
 * 2023, so "steadily"/"gradually"/"sharply" are taught as language to use
 * only when the data shows it, and examples that need them are labelled as
 * being for a different, multi-year chart); "significant" is ordinary
 * descriptive language here, never a statistical claim; and tense follows the
 * time reference, not the mere presence of past dates.
 *
 * The closing exercise is a paragraph-only skill drill (skillFocus +
 * checkScope), so it never produces or stores a full-task IELTS band.
 *
 * Runner notes: a LessonStep carries exactly one CheckQuestion, so each
 * teaching section carries its own check and the six-question error clinic is
 * six consecutive check steps; the closing reflection sits with the final
 * task (the runner shows the written feedback and "Lesson complete" screens
 * after it).
 */
export const task1VocabGrammarLesson: Lesson = {
  id: 'task1-vocab-grammar',
  task: 'task1',
  moduleId: 'task1-m6',
  title: { en: 'Vocabulary and Grammar Mastery', bn: 'Vocabulary আর Grammar-এ দক্ষতা' },
  objective:
    'Describe trends, compare data and write accurately: choose precise trend verbs, describe magnitude without exaggeration, keep percentage points and percentages apart, control tense, articles, agreement and prepositions, and apply it all in one accurate body paragraph.',
  estMinutes: 32,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: { en: 'Why Language Accuracy Matters', bn: 'ভাষার নির্ভুলতা কেন গুরুত্বপূর্ণ' },
      trainerMessage: {
        en: "Welcome to Lesson 06. You already know how to understand a chart, write an introduction, identify an overview and develop a body paragraph. Now we will improve the language you use to communicate that information. Many learners repeatedly use phrases such as 'went up', 'went down', 'a lot', 'very high' and 'very low'. Others try to use advanced vocabulary without understanding its exact meaning. Both approaches create problems. Today, you will learn how to choose words that describe the actual data, compare figures accurately and control your grammar. Remember: IELTS Writing is not a competition to use the most difficult words. Your goal is to communicate accurate information clearly and naturally.",
        bn: "Lesson 06-এ স্বাগতম। তুমি এতদিনে জানো কীভাবে একটা chart বুঝতে হয়, একটা introduction লিখতে হয়, overview চিনতে হয় আর একটা body paragraph develop করতে হয়। এবার আমরা সেই তথ্য জানানোর ভাষাটাকে আরও ভালো করব। অনেক learner বারবার 'went up', 'went down', 'a lot', 'very high' আর 'very low'-এর মতো phrase ব্যবহার করে। আবার কেউ কেউ সঠিক অর্থ না বুঝেই advanced vocabulary ব্যবহার করার চেষ্টা করে। দুই পদ্ধতিতেই সমস্যা হয়। আজ তুমি শিখবে কীভাবে আসল data বর্ণনা করার জন্য সঠিক শব্দ বেছে নিতে হয়, figure-গুলো নির্ভুলভাবে তুলনা করতে হয়, আর grammar control করতে হয়। মনে রাখবে: IELTS Writing সবচেয়ে কঠিন শব্দ ব্যবহার করার প্রতিযোগিতা না। তোমার লক্ষ্য হলো সঠিক তথ্য স্পষ্ট আর স্বাভাবিকভাবে জানানো।",
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'A strong Task 1 response requires accurate vocabulary, appropriate grammatical structures, correct data descriptions, meaningful comparisons, consistent tense, and clear, natural sentences. Accuracy comes before variety: a simple accurate sentence is better than an impressive but inaccurate one.',
            bn: 'একটা শক্তিশালী Task 1 response-এর জন্য দরকার সঠিক vocabulary, উপযুক্ত grammatical structure, সঠিক data বর্ণনা, অর্থবহ comparison, সামঞ্জস্যপূর্ণ tense, আর স্পষ্ট, স্বাভাবিক বাক্য। variety-র আগে accuracy: একটা সহজ কিন্তু সঠিক বাক্য, একটা impressive কিন্তু ভুল বাক্যের চেয়ে ভালো।',
          },
          { en: 'Weak: "Car went down a lot and bicycle went up a lot."', bn: 'দুর্বল: "Car went down a lot and bicycle went up a lot."' },
          { en: 'Improved: "Car use declined, whereas bicycle use increased substantially."', bn: 'উন্নত: "Car use declined, whereas bicycle use increased substantially."' },
          {
            en: 'More precise: "Car use fell by 14 percentage points, whereas bicycle use rose by 13 percentage points."',
            bn: 'আরও নির্ভুল: "Car use fell by 14 percentage points, whereas bicycle use rose by 13 percentage points."',
          },
          {
            en: 'The final version is more informative because it gives the exact magnitude of each change. All figures in this lesson come from one chart: the percentage of commuters using five methods of travel in one city, 2010 and 2023 (illustrative training data).',
            bn: 'শেষ version-টা বেশি তথ্যবহুল, কারণ এটা প্রতিটা পরিবর্তনের নির্ভুল magnitude দেয়। এই lesson-এর সব figure একটাই chart থেকে নেওয়া: একটা শহরে পাঁচটা transport পদ্ধতি ব্যবহারকারী commuter-দের percentage, ২০১০ আর ২০২৩ সালে (illustrative training data)।',
          },
        ],
      },
      check: {
        prompt: { en: 'Which sentence communicates the data most precisely?', bn: 'কোন বাক্যটা data সবচেয়ে নির্ভুলভাবে জানায়?' },
        options: [
          'Car use became bad and bicycle use became good.',
          'Car use changed a lot and bicycle use changed a lot.',
          'Car use declined by 14 percentage points, while bicycle use increased by 13 percentage points.',
        ],
        correctIndex: 2,
        explain: {
          en: 'The last sentence describes the direction and exact magnitude of both changes. The first expresses opinions, and the second is too vague to tell the reader anything.',
          bn: 'শেষ বাক্যটা দুটো পরিবর্তনেরই direction আর নির্ভুল magnitude বর্ণনা করে। প্রথমটা opinion প্রকাশ করছে, আর দ্বিতীয়টা এতই vague যে এটা পাঠককে কিছুই জানাচ্ছে না।',
        },
      },
    },
    {
      id: 'trend-verbs',
      kind: 'explain',
      title: { en: 'Trend Verbs: Describing Direction', bn: 'Trend Verb: Direction বর্ণনা করা' },
      trainerMessage: {
        en: 'Your first task is to identify the direction of a change. Did the figure increase, decrease, remain stable or fluctuate? Choose the verb that matches the actual movement. Do not select a word simply because it sounds academic.',
        bn: 'তোমার প্রথম কাজ হলো পরিবর্তনের direction চিহ্নিত করা। figure-টা কি বেড়েছে, কমেছে, একই থেকেছে, না ওঠানামা করেছে? আসল movement-এর সাথে মেলে এমন verb বেছে নাও। শুধু academic শোনায় বলে কোনো শব্দ বেছে নিও না।',
      },
      material: {
        type: 'vocab',
        items: [
          {
            phrase: 'A. Upward movement',
            use: {
              en: 'increased, rose, climbed, grew. Examples: "Bicycle use increased from 6% to 19%." "Train use rose from 11% to 15%." These verbs can often describe upward movement, but always check the context and the grammatical structure.',
              bn: 'increased, rose, climbed, grew। উদাহরণ: "Bicycle use increased from 6% to 19%." "Train use rose from 11% to 15%." এই verb-গুলো প্রায়ই upward movement বর্ণনা করতে পারে, তবে সবসময় context আর grammatical structure চেক করো।',
            },
          },
          {
            phrase: 'B. Downward movement',
            use: {
              en: 'decreased, fell, declined, dropped. Examples: "Car use fell from 52% to 38%." "Bus use declined slightly from 24% to 21%."',
              bn: 'decreased, fell, declined, dropped। উদাহরণ: "Car use fell from 52% to 38%." "Bus use declined slightly from 24% to 21%."',
            },
          },
          {
            phrase: 'C. No significant change',
            use: {
              en: 'remained stable, remained unchanged, stayed constant, remained relatively steady. Examples: "Walking remained unchanged at 7%." "Walking stayed at 7% in both years." Do not use "remained stable" when the figure changed substantially.',
              bn: 'remained stable, remained unchanged, stayed constant, remained relatively steady। উদাহরণ: "Walking remained unchanged at 7%." "Walking stayed at 7% in both years." figure যদি অনেকটা বদলে যায় তাহলে "remained stable" ব্যবহার করো না।',
            },
          },
          {
            phrase: 'D. Fluctuation',
            use: {
              en: 'fluctuated, experienced fluctuations, varied. Use these when a figure moves up and down during the period — which needs data from several points in time. Do not use "fluctuated" to describe a simple continuous increase.',
              bn: 'fluctuated, experienced fluctuations, varied। এগুলো তখনই ব্যবহার করো যখন একটা figure সময়ের মধ্যে ওঠানামা করে — যার জন্য একাধিক সময়-বিন্দুর data দরকার। একটা সাধারণ ধারাবাহিক বৃদ্ধি বোঝাতে "fluctuated" ব্যবহার করো না।',
            },
          },
          {
            phrase: 'E. Highest and lowest points',
            use: {
              en: 'reached a peak of, peaked at, reached its lowest point at, hit a low of. These need a real high or low point in the available data. Do not invent a peak or a lowest point from incomplete information.',
              bn: 'reached a peak of, peaked at, reached its lowest point at, hit a low of। এগুলোর জন্য available data-তে আসল একটা high বা low point থাকতে হবে। অসম্পূর্ণ তথ্য থেকে কোনো peak বা lowest point বানিয়ে নিও না।',
            },
          },
        ],
      },
      check: {
        prompt: { en: 'Which sentence accurately describes the bicycle figures?', bn: 'কোন বাক্যটা bicycle-এর figure সঠিকভাবে বর্ণনা করে?' },
        options: [
          'Bicycle use increased from 6% to 19%.',
          'Bicycle use remained stable at 19%.',
          'Bicycle use declined from 6% to 19%.',
        ],
        correctIndex: 0,
        explain: {
          en: 'The figure increased by 13 percentage points. The second option is incorrect because the figure changed, and the third describes the direction incorrectly.',
          bn: 'figure-টা ১৩ percentage point বেড়েছে। দ্বিতীয় option ভুল, কারণ figure-টা বদলেছে, আর তৃতীয়টা direction ভুলভাবে বর্ণনা করছে।',
        },
      },
    },
    {
      id: 'magnitude-pace',
      kind: 'explain',
      title: { en: 'Magnitude and Pace', bn: 'Magnitude আর Pace' },
      trainerMessage: {
        en: 'Describing direction is not enough. A useful Task 1 sentence can also explain how large or how fast a change was. Compare increased, increased slightly, increased gradually, increased sharply and increased substantially: they do not communicate exactly the same thing.',
        bn: 'শুধু direction বর্ণনা করলেই হবে না। একটা কাজের Task 1 বাক্য এটাও বলতে পারে যে পরিবর্তনটা কতটা বড় বা কত দ্রুত হয়েছিল। increased, increased slightly, increased gradually, increased sharply আর increased substantially তুলনা করে দেখো: এগুলো ঠিক একই জিনিস বলে না।',
      },
      material: {
        type: 'vocab',
        items: [
          {
            phrase: 'A. Small changes',
            use: { en: 'slightly, marginally, modestly. Example: "Bus use declined slightly from 24% to 21%."', bn: 'slightly, marginally, modestly। উদাহরণ: "Bus use declined slightly from 24% to 21%."' },
          },
          {
            phrase: 'B. Large changes',
            use: {
              en: 'considerably, substantially, significantly, sharply, dramatically. Example: "Bicycle use increased substantially from 6% to 19%."',
              bn: 'considerably, substantially, significantly, sharply, dramatically। উদাহরণ: "Bicycle use increased substantially from 6% to 19%."',
            },
          },
          {
            phrase: 'C. Gradual movement',
            use: {
              en: 'gradually, steadily, progressively. These describe how a change developed over time, so they need evidence from several points in time. Example for a line graph with yearly figures (not this chart): "Sales increased steadily every year."',
              bn: 'gradually, steadily, progressively। এগুলো বোঝায় একটা পরিবর্তন সময়ের সাথে কীভাবে হয়েছে, তাই এর জন্য একাধিক সময়-বিন্দুর প্রমাণ লাগে। বছরভিত্তিক figure-সহ line graph-এর জন্য উদাহরণ (এই chart-এর না): "Sales increased steadily every year."',
            },
          },
          {
            phrase: 'D. Rapid movement',
            use: {
              en: 'rapidly, sharply, steeply. These also describe pace, so use them when the data shows a pronounced change over a short interval. Example for a line graph with yearly figures (not this chart): "Sales rose sharply between 2019 and 2020."',
              bn: 'rapidly, sharply, steeply। এগুলোও pace বর্ণনা করে, তাই যখন data কম সময়ের মধ্যে স্পষ্ট পরিবর্তন দেখায় তখনই ব্যবহার করো। বছরভিত্তিক figure-সহ line graph-এর জন্য উদাহরণ (এই chart-এর না): "Sales rose sharply between 2019 and 2020."',
            },
          },
          {
            phrase: 'E. Stability',
            use: { en: 'remained virtually unchanged, stayed almost constant, showed little variation.', bn: 'remained virtually unchanged, stayed almost constant, showed little variation।' },
          },
          {
            phrase: 'Important distinctions',
            use: {
              en: '"Steadily" describes a consistent pattern. "Gradually" describes slow development. "Sharply" describes a pronounced change. "Slightly" describes a small magnitude. "Dramatically" should only be used when the data supports a very substantial change — do not add it to every increase.',
              bn: '"Steadily" একটা consistent pattern বোঝায়। "Gradually" ধীর development বোঝায়। "Sharply" একটা স্পষ্ট পরিবর্তন বোঝায়। "Slightly" ছোট magnitude বোঝায়। "Dramatically" তখনই ব্যবহার করা উচিত যখন data সত্যিই অনেক বড় পরিবর্তন দেখায় — প্রতিটা বৃদ্ধির সাথে এটা জুড়ে দিও না।',
            },
          },
          {
            phrase: 'Two accuracy warnings',
            use: {
              en: 'This chart has only two time points, 2010 and 2023, so it gives no evidence about what happened in between: do not call a change gradual, steady or sharp here — describe its size instead ("increased substantially", "declined slightly"). Also, "significantly" is ordinary descriptive language for a large change; do not use it to imply a statistical claim.',
              bn: 'এই chart-এ শুধু দুইটা সময়-বিন্দু আছে, ২০১০ আর ২০২৩, তাই মাঝখানে কী হয়েছে তার কোনো প্রমাণ নেই: তাই এখানে কোনো পরিবর্তনকে gradual, steady বা sharp বোলো না — বরং এর size বর্ণনা করো ("increased substantially", "declined slightly")। আর "significantly" একটা বড় পরিবর্তনের জন্য সাধারণ বর্ণনামূলক ভাষা; এটা দিয়ে কোনো statistical claim বোঝাতে যেও না।',
            },
          },
        ],
      },
      check: {
        prompt: { en: 'Which description is most suitable for the change in bus use from 24% to 21%?', bn: 'bus use-এর ২৪% থেকে ২১%-এ পরিবর্তনের জন্য কোন বর্ণনাটা সবচেয়ে উপযুক্ত?' },
        options: ['It increased dramatically.', 'It declined slightly.', 'It remained completely unchanged.'],
        correctIndex: 1,
        explain: { en: 'The decrease was only 3 percentage points, so it is accurate to describe it as a slight decline.', bn: 'হ্রাসটা মাত্র ৩ percentage point ছিল, তাই এটাকে একটা slight decline বলা নির্ভুল।' },
      },
    },
    {
      id: 'percentage-points',
      kind: 'explain',
      title: { en: 'Percentage vs Percentage Points', bn: 'Percentage বনাম Percentage Points' },
      trainerMessage: {
        en: 'This is a very important accuracy lesson. Many candidates confuse percentage change with percentage-point change. If you make this mistake, your sentence can communicate the wrong mathematical meaning even when your grammar is perfect.',
        bn: 'এটা accuracy-র একটা খুব গুরুত্বপূর্ণ lesson। অনেক candidate percentage change আর percentage-point change গুলিয়ে ফেলে। এই ভুল করলে, grammar নিখুঁত হলেও তোমার বাক্য ভুল mathematical অর্থ জানাতে পারে।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'A figure increases from 6% to 19%. Percentage-point change: 19 − 6 = 13 percentage points. Relative percentage increase: (19 − 6) ÷ 6 × 100 = approximately 216.7%.',
            bn: 'একটা figure ৬% থেকে ১৯%-এ বেড়েছে। Percentage-point change: ১৯ − ৬ = ১৩ percentage points। Relative percentage increase: (১৯ − ৬) ÷ ৬ × ১০০ = প্রায় ২১৬.৭%।',
          },
          {
            en: 'Correct: "Bicycle use increased by 13 percentage points." Also correct: "Bicycle use increased by approximately 216.7% relative to its initial figure." Incorrect: "Bicycle use increased by 13%." The difference between 6% and 19% is 13 percentage points, not 13 percent.',
            bn: 'সঠিক: "Bicycle use increased by 13 percentage points." এটাও সঠিক: "Bicycle use increased by approximately 216.7% relative to its initial figure." ভুল: "Bicycle use increased by 13%." ৬% আর ১৯%-এর মধ্যে পার্থক্যটা ১৩ percentage points, ১৩ percent না।',
          },
          {
            en: 'Another example: car use decreases from 52% to 38%. Percentage-point decrease: 52 − 38 = 14 percentage points. Relative percentage decrease: 14 ÷ 52 × 100 = approximately 26.9%. Correct: "Car use fell by 14 percentage points." Also correct: "Car use decreased by approximately 26.9% relative to its 2010 level."',
            bn: 'আরেকটা উদাহরণ: car use ৫২% থেকে ৩৮%-এ কমেছে। Percentage-point decrease: ৫২ − ৩৮ = ১৪ percentage points। Relative percentage decrease: ১৪ ÷ ৫২ × ১০০ = প্রায় ২৬.৯%। সঠিক: "Car use fell by 14 percentage points." এটাও সঠিক: "Car use decreased by approximately 26.9% relative to its 2010 level."',
          },
          {
            en: 'Teaching rule: when describing the arithmetic difference between two percentages, use percentage points. When describing the proportional change relative to the starting figure, use percentage change. Do not calculate relative changes unless they are relevant and the starting figure is clear.',
            bn: 'নিয়ম: দুটো percentage-এর মধ্যে arithmetic পার্থক্য বর্ণনা করতে percentage points ব্যবহার করো। শুরুর figure-এর তুলনায় proportional পরিবর্তন বর্ণনা করতে percentage change ব্যবহার করো। relative change তখনই হিসাব করো যখন সেটা প্রাসঙ্গিক আর শুরুর figure স্পষ্ট।',
          },
        ],
      },
      check: {
        prompt: { en: 'Bicycle use increased from 6% to 19%. What is the percentage-point increase?', bn: 'Bicycle use ৬% থেকে ১৯%-এ বেড়েছে। percentage-point increase কত?' },
        options: ['216.7 percentage points.', '13 percentage points.', '13%.'],
        explain: {
          en: '19 − 6 = 13 percentage points. Approximately 216.7% is the relative percentage increase, not the percentage-point difference, and "13%" would wrongly mix the two.',
          bn: '১৯ − ৬ = ১৩ percentage points। প্রায় ২১৬.৭% হলো relative percentage increase, percentage-point পার্থক্য না, আর "13%" দুটোকে ভুলভাবে মিশিয়ে ফেলবে।',
        },
        correctIndex: 1,
      },
    },
    {
      id: 'comparison-language',
      kind: 'explain',
      title: 'Comparison Language',
      trainerMessage:
        'A Task 1 response should not describe every category separately without connecting the information. Comparisons help readers understand the relationship between figures.',
      material: {
        type: 'vocab',
        items: [
          {
            phrase: 'A. Basic comparison',
            use: 'higher than, lower than, greater than, less than, similar to. Examples: "Car use was higher than bicycle use in both years." "Walking remained at the same level in 2010 and 2023."',
          },
          {
            phrase: 'B. Contrast',
            use: 'whereas, while, in contrast, by comparison, compared with. Examples: "Car use declined, whereas bicycle use increased." "Compared with car use, bicycle use followed an upward trend."',
          },
          {
            phrase: 'C. Multiples',
            use: 'twice as high as, three times as high as, more than double, approximately half as much as. Example: "Bicycle use in 2023 was more than three times its 2010 level." Check: 19 ÷ 6 ≈ 3.17.',
          },
          {
            phrase: 'D. Similar magnitude',
            use: 'approximately the same as, roughly equal to, a comparable figure. Use these only when the values genuinely support the comparison.',
          },
          {
            phrase: 'E. Difference',
            use: 'a difference of, exceeded by, was X percentage points higher than. Example: "In 2023, car use exceeded bicycle use by 19 percentage points." Check: 38 − 19 = 19 percentage points.',
          },
          {
            phrase: 'Important grammar',
            use: '"Whereas" and "while" connect contrasting clauses. Correct: "Car use declined, whereas bicycle use increased." Incorrect: "Whereas car use declined. Bicycle use increased." — the first part is a sentence fragment, because "whereas" introduces a dependent clause that needs a main clause.',
          },
        ],
      },
      check: {
        prompt: 'Which sentence correctly compares car and bicycle use?',
        options: [
          'Car use declined, whereas bicycle use increase.',
          'Car use declined whereas bicycle use increasing.',
          'Car use declined, whereas bicycle use increased.',
        ],
        correctIndex: 2,
        explain:
          'Both clauses have correctly formed past-tense verbs. The first option has an incorrect verb form, while the second lacks a correctly formed finite verb in the second clause.',
      },
    },
    {
      id: 'tense-control',
      kind: 'explain',
      title: 'Tense Control: Choose Based on Time',
      trainerMessage:
        'One of the most common grammar mistakes in Task 1 is inconsistent tense. However, there is an important rule: do not use past tense automatically for every chart. Choose the tense according to the time reference and the information being described.',
      material: {
        type: 'text',
        paragraphs: [
          'A. Completed past period — use past simple for completed events and changes. "Car use declined between 2010 and 2023." "Bicycle use increased from 6% to 19%."',
          'B. Present information — use present simple when describing what a visual shows, or current facts. "The chart illustrates the proportion of commuters using different transport methods." "The diagram shows how the recycling process works."',
          'C. Future projections — use future forms or appropriate reporting structures for projected figures. For a chart that contains projections (a different chart from this one): "The figure is projected to rise to 40% by 2030." "The proportion is expected to increase over the next decade."',
          'D. Mixed time periods — a visual may contain past data and future projections. Hypothetical example, not from this chart: "Sales declined between 2010 and 2020, but they are projected to rise slightly by 2030."',
          'E. Timeless descriptions — some descriptions of the visual, or of general processes, use present simple even when the chart contains historical data. "The chart compares five transport methods."',
          'Important: do not assume that every verb in a Task 1 response must be past tense merely because the chart includes past dates. The tense must match the specific statement: completed changes in the past, but what the chart shows, in the present.',
        ],
      },
      check: {
        prompt: 'Which sentence uses tense appropriately?',
        options: [
          'Car use declined between 2010 and 2023, while the chart illustrates five transport methods.',
          'Car use declines between 2010 and 2023, according to the completed historical data.',
          'Car use had decline between 2010 and 2023.',
        ],
        correctIndex: 0,
        explain:
          "\"Car use declined between 2010 and 2023, while the chart illustrates five transport methods.\" is correct: \"declined\" is past simple for a completed historical change, and \"illustrates\" is present simple for what the chart shows. \"Car use declines between 2010 and 2023, according to the completed historical data.\" is incorrect, because present simple does not suit a completed historical change. \"Car use had decline between 2010 and 2023.\" is incorrect: \"had decline\" is not a valid verb form. Past perfect would be \"had declined\", but past perfect is not needed in this sentence.",
      },
    },
    {
      id: 'structures',
      kind: 'explain',
      title: 'Grammatical Structures for Task 1',
      trainerMessage:
        'Good vocabulary alone cannot produce a strong paragraph. You also need sentence structures that communicate relationships accurately. Avoid forcing complex sentences: the goal is clarity and grammatical control.',
      material: {
        type: 'vocab',
        items: [
          { phrase: 'A. From … to', use: 'Starting and ending values. "Car use fell from 52% to 38%."' },
          { phrase: 'B. By', use: 'The amount of change. "Car use fell by 14 percentage points."' },
          { phrase: 'C. At', use: 'A value at a particular point. "Walking remained at 7%."' },
          { phrase: 'D. Respectively', use: 'Two or more values that correspond to two or more items in the same order. "Car and bicycle use stood at 38% and 19%, respectively, in 2023."' },
          { phrase: 'E. While / whereas', use: 'Contrasting information. "Car use declined, while bicycle use increased."' },
          {
            phrase: 'F. Although / despite',
            use: '"Although car use declined, it remained the most common method." "Despite a substantial increase, bicycle use remained below car use in 2023." Grammar: although + subject + verb; despite + noun or gerund. Incorrect: "Despite car use declined…" Correct: "Despite the decline in car use…"',
          },
          { phrase: 'G. Compared with', use: '"Compared with 2010, bicycle use was substantially higher in 2023."' },
          { phrase: 'H. Relative clauses', use: '"The category that recorded the largest increase was bicycle use."' },
        ],
      },
      check: {
        prompt: 'Which sentence correctly uses "despite"?',
        options: [
          'Despite car use declined, it remained the most common method.',
          'Despite declined car use, it remained the most common method.',
          'Despite the decline in car use, it remained the most common method.',
        ],
        correctIndex: 2,
        explain: '"Despite" is followed by a noun phrase or a gerund, and "the decline in car use" is a correct noun phrase.',
      },
    },
    {
      id: 'articles-agreement',
      kind: 'explain',
      title: 'Articles, Plurals and Subject–Verb Agreement',
      trainerMessage:
        'Small grammatical errors can make an otherwise good sentence sound unnatural. You need to control articles, singular and plural forms, and subject–verb agreement.',
      material: {
        type: 'text',
        paragraphs: [
          'A. Articles. Correct: "The chart illustrates the percentage of commuters." Correct: "A significant increase occurred." Incorrect: "Chart illustrates percentage of commuters." Singular countable nouns generally need an article or another determiner.',
          'B. Countable and uncountable nouns. Use: the number of commuters, the amount of electricity, the proportion of households, the percentage of people. Do not write "the amount of commuters".',
          'C. Singular and plural. Correct: "Three categories increased." Incorrect: "Three category increased." Correct: "The figure was higher." Incorrect: "The figures was higher."',
          'D. Subject–verb agreement. Correct: "The percentage of commuters increased." Correct: "The number of visitors was higher." The head noun determines the verb form, not the nearest noun: "the number of" takes a singular verb, whereas "a number of" is a plural expression ("A number of commuters were…").',
          'E. Prepositions. Common patterns: increased from 10% to 20%; increased by 10 percentage points; remained at 7%; declined between 2010 and 2023; was higher than; was similar to. "From" = starting point, "to" = ending point, "by" = amount of change, "at" = specific value.',
        ],
      },
      check: {
        prompt: 'Which sentence is grammatically correct?',
        options: [
          'The number of commuters were higher in 2023.',
          'The number of commuters was higher in 2023.',
          'The amount of commuters was higher in 2023.',
        ],
        correctIndex: 1,
        explain:
          '"Number" is used with countable nouns such as commuters, and the head noun "number" is singular, so "was" is correct. "Amount" is wrong with a countable noun, and "were" does not agree with the singular head noun.',
      },
    },
    {
      id: 'sentence-variety',
      kind: 'explain',
      title: 'Sentence Variety Without Overcomplication',
      trainerMessage:
        'Many learners believe that a high-level response must contain long sentences. That is not true. Vary sentence structures when they help communicate relationships. Do not combine unrelated information simply to make a sentence longer.',
      material: {
        type: 'text',
        paragraphs: [
          'Weak repetition: "Car use fell. Bicycle use increased. Bus use fell. Train use increased." Improved: "Car and bus use declined, whereas bicycle and train use increased." More detailed: "Car use fell by 14 percentage points, while bicycle use rose by 13 percentage points over the same period."',
          'Sentence patterns. 1. Simple: "Walking remained unchanged at 7%." 2. Compound: "Car use declined, but bicycle use increased." 3. Complex: "Although car use declined, it remained the most common method." 4. Comparative: "Bicycle use in 2023 was more than three times its initial level." 5. Participle: "Recording the largest increase, bicycle use rose from 6% to 19%."',
          'Use a participle structure only when its subject and relationship are clear. Do not create dangling modifiers: the subject of the main clause must be the thing that "records" the increase.',
        ],
      },
      check: {
        prompt: 'Which sentence is clear and grammatically accurate?',
        options: [
          'Although car use declined, it remained the most common method.',
          'Although car use declined, but it remained the most common method.',
          'Although declined car use, it remained the most common method.',
        ],
        correctIndex: 0,
        explain:
          '"Although" already introduces the contrast, so an additional "but" is unnecessary and incorrect. The third option has an incomplete clause with no subject and verb after "although".',
      },
    },
    {
      id: 'collocations',
      kind: 'explain',
      title: 'Collocations and Natural Academic Language',
      trainerMessage:
        'Some words may be grammatically possible but unnatural in academic writing. Learn common word combinations rather than memorising isolated vocabulary.',
      material: {
        type: 'text',
        paragraphs: [
          'Natural combinations: a sharp increase, a gradual decline, a slight decrease, a significant difference, a steady rise, a considerable proportion, remained relatively stable, reached a peak, recorded the highest figure, accounted for the largest share. (Words about pace — sharp, gradual, steady — still need data that shows the pace.)',
          'Natural: "The chart shows a substantial increase in bicycle use." Natural: "Bicycle use increased substantially."',
          'The grammatical difference: adjective + noun ("a substantial increase") versus verb + adverb ("increased substantially"). An adjective modifies a noun; an adverb modifies a verb.',
          'Incorrect or awkward expressions: "a big up", "more higher", "increased up", "fell down by lower", "a lot of percentage points" when an exact figure is available, "the most highest".',
        ],
      },
      check: {
        prompt: 'Which expression is natural and grammatically correct?',
        options: [
          'A substantially increase in bicycle use.',
          'A more higher increase in bicycle use.',
          'A substantial increase in bicycle use.',
        ],
        correctIndex: 2,
        explain:
          '"Substantial" is an adjective modifying the noun "increase". "Substantially" is an adverb and cannot directly modify a noun in this construction, and "more higher" is a double comparative.',
      },
    },
    {
      id: 'improve-paragraph',
      kind: 'demonstrate',
      title: 'Demonstration: Improve a Weak Paragraph',
      trainerMessage:
        'Now we will combine everything. First, read a weak paragraph. Then examine the improved version and understand exactly what changed.',
      material: {
        type: 'examples',
        weak: 'Car use go down from 52% to 38%. Bicycle use go up a lot from 6% to 19%. Bus use also go down. Walking was same. Car was more higher than bicycle.',
        good: 'Car use declined from 52% in 2010 to 38% in 2023, a decrease of 14 percentage points. By contrast, bicycle use increased substantially from 6% to 19%, representing a rise of 13 percentage points. Bus use fell slightly from 24% to 21%, whereas walking remained unchanged at 7%. Despite its decline, car use continued to be the most common transport method in 2023.',
        note: 'What changed: 1. "go down" became "declined" (a more precise trend verb). 2. "go up a lot" became "increased substantially" (a more natural, accurate expression of magnitude). 3. "go" became past-tense verbs, because these are completed historical changes. 4. "from 52% to 38%" gained "a decrease of 14 percentage points" (an accurate calculation). 5. "Car was more higher than bicycle" was removed: the incorrect comparative is gone, and the improved paragraph states the real ranking instead ("car use continued to be the most common transport method"). 6. "Walking was same" became "walking remained unchanged at 7%" (a natural collocation with supporting data). 7. "By contrast" and "whereas" connect the information logically. The improved paragraph is not better because it contains difficult words. It is better because the language is precise, grammatical and supported by the chart.',
      },
    },
    {
      id: 'guided-practice',
      kind: 'guided',
      title: 'Guided Practice: Improve the Sentences',
      trainerMessage:
        'Now it is your turn. You will improve sentences one by one. Focus on meaning first, then grammar and vocabulary. Write your own improved version, check it, and compare with the possible answer — other grammatically correct and factually accurate rewrites are also acceptable.',
      material: {
        type: 'chart-board',
        dataset: CHART_DATASETS['commute-methods'],
        tasks: [
          {
            id: 'task-a',
            order: 1,
            prompt: 'Task A — Trend verb. Improve: "Bicycle use went up from 6% to 19%."',
            modelAnswer: 'Bicycle use increased from 6% to 19%. (Other accurate verbs such as "rose" or "grew" are also fine.)',
            belongsIn: 'body',
          },
          {
            id: 'task-b',
            order: 2,
            prompt: 'Task B — Magnitude. Improve: "Bus use went down a little."',
            modelAnswer: 'Bus use declined slightly from 24% to 21%.',
            belongsIn: 'body',
          },
          {
            id: 'task-c',
            order: 3,
            prompt: 'Task C — Percentage points. Improve: "Car use decreased by 14%."',
            modelAnswer: 'Car use decreased by 14 percentage points. (From 52% to 38%: 52 − 38 = 14.)',
            belongsIn: 'body',
          },
          {
            id: 'task-d',
            order: 4,
            prompt: 'Task D — Comparison. Improve: "Car use was more higher than bicycle use."',
            modelAnswer: 'Car use was higher than bicycle use. ("Higher" is already the comparative form.)',
            belongsIn: 'body',
          },
          {
            id: 'task-e',
            order: 5,
            prompt: 'Task E — Tense. Improve: "Walking remains unchanged between 2010 and 2023."',
            modelAnswer: 'Walking remained unchanged between 2010 and 2023. (A completed historical period needs past simple.)',
            belongsIn: 'body',
          },
          {
            id: 'task-f',
            order: 6,
            prompt: 'Task F — Sentence structure. Improve: "Car use declined. Bicycle use increased."',
            modelAnswer: 'Car use declined, whereas bicycle use increased.',
            belongsIn: 'body',
          },
        ],
      },
    },
    {
      id: 'clinic',
      kind: 'check',
      title: 'Error Clinic (1 of 6): Wrong Trend Direction',
      trainerMessage: 'Each question shows one common error. The sentence is: "Car use increased from 52% to 38%."',
      check: {
        prompt: 'What is the problem?',
        options: [
          'The sentence uses the wrong direction.',
          'The sentence uses an incorrect article.',
          'The sentence uses the wrong plural form.',
        ],
        correctIndex: 0,
        explain: 'The figure decreased from 52% to 38%, so "increased" gives the wrong direction.',
      },
    },
    {
      id: 'clinic-2',
      kind: 'check',
      title: 'Error Clinic (2 of 6): Percentage-Point Error',
      trainerMessage: 'The sentence is: "Bicycle use increased by 13% from 6% to 19%."',
      check: {
        prompt: 'What is the most accurate correction?',
        options: [
          'Bicycle use decreased by 13 percentage points.',
          'Bicycle use increased by 13 percentage points.',
          'Bicycle use remained stable.',
        ],
        correctIndex: 1,
        explain: '19 − 6 = 13 percentage points. The direction is an increase, and "13%" would wrongly mix percentage points with percentages.',
      },
    },
    {
      id: 'clinic-3',
      kind: 'check',
      title: 'Error Clinic (3 of 6): Tense Inconsistency',
      trainerMessage: 'The sentence is: "Car use declined, while bicycle use increases."',
      check: {
        prompt: 'Which correction is appropriate for this completed historical period?',
        options: ['bicycle use increasing', 'bicycle use increase', 'bicycle use increased'],
        correctIndex: 2,
        explain: 'Both changes describe completed historical data, so past simple is appropriate for both clauses.',
      },
    },
    {
      id: 'clinic-4',
      kind: 'check',
      title: 'Error Clinic (4 of 6): Comparative Grammar',
      trainerMessage: 'The sentence is: "Car use was more higher than bicycle use."',
      check: {
        prompt: 'Which is correct?',
        options: [
          'Car use was more highest than bicycle use.',
          'Car use was most higher than bicycle use.',
          'Car use was higher than bicycle use.',
        ],
        correctIndex: 2,
        explain: '"Higher" is already the comparative form of "high", so do not add "more" or "most".',
      },
    },
    {
      id: 'clinic-5',
      kind: 'check',
      title: 'Error Clinic (5 of 6): Preposition',
      trainerMessage: 'The sentence is: "Car use declined at 14 percentage points."',
      check: {
        prompt: 'Which correction is appropriate?',
        options: [
          'Car use declined by 14 percentage points.',
          'Car use declined from 14 percentage points.',
          'Car use declined to 14 percentage points.',
        ],
        correctIndex: 0,
        explain: '"By" identifies the amount of change. "From" identifies the starting value, while "to" identifies the ending value.',
      },
    },
    {
      id: 'clinic-6',
      kind: 'check',
      title: 'Error Clinic (6 of 6): Despite / Although',
      trainerMessage: 'Last clinic question: choose the grammatically correct sentence.',
      check: {
        prompt: 'Which sentence is grammatically correct?',
        options: [
          'Despite car use declined, it remained the most common method.',
          'Although car use declined, it remained the most common method.',
          'Despite declined car use, it remained the most common method.',
        ],
        correctIndex: 1,
        explain:
          '"Although" introduces a clause containing a subject and a verb. "Despite" requires a noun phrase or gerund in this construction, as in "Despite the decline in car use…".',
      },
    },
    {
      id: 'language-checklist',
      kind: 'review',
      title: 'Your Personal Language Checklist',
      trainerMessage: 'Before writing a Task 1 response, ask yourself these questions. You will use them in the final exercise.',
      material: {
        type: 'text',
        paragraphs: [
          'Vocabulary: Did I choose verbs that match the direction of change? Did I exaggerate the magnitude? Did I repeat the same verb unnecessarily? Are my collocations natural?',
          'Data accuracy: Did I distinguish percentages from percentage points? Are all figures correct? Did I avoid unsupported comparisons?',
          'Grammar: Is my tense appropriate for the time reference? Are my subjects and verbs in agreement? Are singular and plural forms correct? Have I used articles where necessary? Are my prepositions accurate? Are my comparative structures correct?',
          'Sentence quality: Are my sentences clear? Have I connected related information? Have I avoided unnecessary complexity? Does every comparison have a clear meaning?',
        ],
      },
    },
    {
      id: 'independent-practice',
      kind: 'independent',
      title: 'Final Independent Practice',
      trainerMessage:
        'Now write one body paragraph on your own, using the commute chart. This is a targeted vocabulary and grammar exercise, not a complete Task 1 response, and there is no exam time limit. Accuracy comes before variety.',
      material: {
        type: 'text',
        paragraphs: [
          'The chart: the percentage of commuters using five methods of travel in one city, 2010 and 2023. Car: 52% then 38%. Bus: 24% then 21%. Bicycle: 6% then 19%. Train: 11% then 15%. Walking: 7% then 7%.',
          'Suggested structure (not a required formula): sentence 1 describes the most important decline; sentence 2 contrasts it with the largest increase; sentence 3 adds a comparison or supporting detail; sentence 4 describes another relevant category or a stable feature. Other coherent structures are accepted.',
          'Suggested length: approximately 80–100 words — a flexible practice target, not a hard IELTS rule.',
          'After you finish, reflect: 1. Which language error did you make most often? 2. Which new expression did you use accurately? 3. What will you check before writing your next Task 1 paragraph?',
        ],
      },
    },
  ],
  finalPrompt: {
    title: 'Write with Precise Vocabulary and Grammar',
    instructions:
      'Write one coherent Task 1 body paragraph of approximately 80–100 words describing the main changes and comparisons in the chart. Your paragraph should: describe at least one increase and one decrease; include an accurate comparison; use appropriate trend vocabulary; use at least one accurate magnitude or percentage-point expression; maintain appropriate tense; use grammatically correct sentence structures; include accurate supporting data; and avoid unsupported explanations or opinions. Do not write a complete Task 1 response. This is a targeted vocabulary and grammar exercise.',
    minWords: 80,
    chartId: 'commute-methods',
    skillFocus: 'Task 1 vocabulary precision and grammatical accuracy',
    checkScope: 'paragraph-only',
  },
};
