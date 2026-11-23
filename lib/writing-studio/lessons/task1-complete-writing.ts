import { CHART_DATASETS } from '../charts';
import type { Lesson } from '../types';

/**
 * Task 1 Academy — Lesson 07 ("Complete Task 1 Writing"), the final lesson of
 * the seven-lesson Task 1 curriculum: analyse → plan → introduction →
 * overview → two body paragraphs → one coherent report → review. Everything is
 * anchored to the 'commute-methods' dataset (illustrative training data, not
 * real statistics); every figure, calculation, model paragraph and answer key
 * is checked against it by scripts/test-task1-complete-writing.ts.
 *
 * Content rules: accuracy before variety; the chart has only 2010 and 2023, so
 * no claim about HOW a figure moved between them; no invented causes; no fixed
 * sentence counts, mandatory phrases or paragraph patterns.
 *
 * Unlike Lessons 01–06, the closing exercise is a FULL Task 1 response: it has
 * no skillFocus and its scope is 'full', so it goes through the normal
 * full-task assessment and records an (indicative, never official) band. The
 * four guided tasks and the clinic are skill-building only: they live on the
 * chart-board / check steps and record nothing.
 *
 * Runner notes: a LessonStep carries one CheckQuestion, so each teaching section
 * carries its own check and the six-question clinic is six consecutive check
 * steps. The runner has no timer for lesson final tasks, so the 20-minute limit
 * is stated in the instructions rather than enforced, and it cannot require a
 * correction after feedback (the feedback screen offers "Rewrite and try
 * again"); the closing reflection sits before the writing task because the
 * runner shows feedback and "Lesson complete" after it.
 */
export const task1CompleteWritingLesson: Lesson = {
  id: 'task1-complete-writing',
  task: 'task1',
  moduleId: 'task1-m7',
  title: 'Complete Task 1 Writing',
  objective:
    'Combine analysis, an accurate introduction, a focused overview and logically grouped body paragraphs into one coherent Task 1 report of at least 150 words, then review and improve it.',
  estMinutes: 50,
  steps: [
    {
      id: 'welcome',
      kind: 'intro',
      title: 'From Individual Skills to a Complete Report',
      trainerMessage:
        'Welcome to the final lesson of the Task 1 course. So far, you have practised understanding visual information, writing accurate introductions, identifying main features, developing body paragraphs, and using precise vocabulary and grammar. Now you must combine these skills. A strong response does not simply describe every number. It selects, groups, compares and reports the most relevant information. Here is the key question: can you explain the visual clearly enough that a reader understands its main message without seeing every individual figure?',
      material: {
        type: 'text',
        paragraphs: [
          'By the end of this lesson you should be able to: analyse a visual accurately before writing; write an introduction that accurately paraphrases the task; summarise the most important features in an overview; organise relevant figures into logically grouped body paragraphs; use accurate comparisons, tense, vocabulary and grammar; complete a coherent response of at least 150 words in about 20 minutes; and review and improve your own writing before submission.',
        ],
      },
      check: {
        prompt: 'Which approach best describes a strong Task 1 response?',
        options: [
          'Describe every number in the order it appears.',
          'Select the most important features, summarise the overall picture and support it with relevant data.',
          'Use as many advanced vocabulary words as possible.',
        ],
        correctIndex: 1,
        explain:
          'Task 1 assesses accurate reporting, selection, comparison, organisation and language control — not the number of figures or the number of sophisticated words used.',
      },
    },
    {
      id: 'complete-structure',
      kind: 'explain',
      title: 'One Coherent Report',
      trainerMessage:
        'A complete Task 1 response is not four unrelated pieces of writing. It is one coherent report. Each part has a different job, and none of them is rewarded for unnecessary complexity, memorised phrases or excessive data reporting.',
      material: {
        type: 'text',
        paragraphs: [
          'The shape of the report: Introduction → Overview → Body Paragraph 1 → Body Paragraph 2.',
          'Introduction: what does the visual show? Overview: what are the most important patterns? Body paragraphs: which figures and comparisons support those patterns, grouped logically?',
          'This is a useful shape for this chart, not a rigid template. The number of body paragraphs and how you group the information depend on what the visual shows.',
        ],
      },
    },
    {
      id: 'task-analysis',
      kind: 'explain',
      title: 'Understand the Complete Task',
      trainerMessage:
        'Here is the task you will work on throughout this lesson. Before writing, analyse it: identify the visual, the subject, the unit, the time points and the main features.',
      material: {
        type: 'text',
        paragraphs: [
          'Task: "The chart below compares the percentages of commuters who used five different methods of transport in one city in 2010 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant."',
          'Data (percentage of commuters, illustrative training figures). Car: 52% in 2010, 38% in 2023. Bus: 24% and 21%. Bicycle: 6% and 19%. Train: 11% and 15%. Walking: 7% and 7%.',
          'Analyse before writing. Visual type: comparative bar chart. Subject: transport methods used by commuters. Location: one city. Time points: 2010 and 2023. Unit: percentage of commuters. Categories: five transport methods. Upward changes: bicycle and train. Downward changes: car and bus. Unchanged: walking. Largest category in both years: car. Most notable change: bicycle use increased from 6% to 19%.',
        ],
      },
      check: {
        prompt: 'Which statement is supported by the chart?',
        options: [
          'Bicycle use increased by 13 percentage points.',
          'Bicycle use increased by 13%.',
          'Bicycle use became the most popular transport method in 2023.',
        ],
        correctIndex: 0,
        explain:
          '19 − 6 = 13 percentage points. "13%" would wrongly describe a percentage-point difference as a percentage (the relative increase is approximately 216.7%), and car, not bicycle, remained the largest category in 2023.',
      },
    },
    {
      id: 'planning',
      kind: 'explain',
      title: 'Plan Before You Write',
      trainerMessage:
        'A short planning stage prevents inaccurate or disorganised writing. Use four questions, one for each part of the report.',
      material: {
        type: 'text',
        paragraphs: [
          'The four-part plan. 1. Introduction: what does the chart compare? 2. Overview: what are the two or three most important overall features? 3. Body 1: which related categories can be grouped together? 4. Body 2: what other meaningful categories and comparisons remain?',
          'Worked plan. Introduction: a bar chart; five transport methods; one city; 2010 and 2023; percentages of commuters. Overview: car remained the most popular method despite declining; bicycle use increased substantially; walking was unchanged; train increased while bus declined. Body 1: car 52% to 38%; bus 24% to 21%; compare their downward changes. Body 2: bicycle 6% to 19%; train 11% to 15%; walking 7% to 7%; compare growth and stability.',
          'Do not force every chart into the same paragraph grouping. Group according to the information shown.',
        ],
      },
      check: {
        prompt: 'Why is planning useful?',
        options: [
          'It guarantees a Band 8.',
          'It allows you to avoid using figures.',
          'It helps select, group and organise information before writing.',
        ],
        correctIndex: 2,
        explain:
          'Planning lets you choose the features that matter, group related categories and decide the order of the report before you write. It guarantees no score, and the body paragraphs still need accurate figures.',
      },
    },
    {
      id: 'introduction',
      kind: 'explain',
      title: 'Write the Introduction',
      trainerMessage: 'The introduction tells the reader what the visual presents. It does not describe trends.',
      material: {
        type: 'text',
        paragraphs: [
          'A good introduction identifies the chart or visual; preserves the subject and categories; preserves the location and time period; preserves the measurement; and uses accurate paraphrasing.',
          'Model: "The bar chart illustrates the proportions of commuters using five different forms of transport in a city in 2010 and 2023."',
          'Why it works: "compares" has been paraphrased as "illustrates"; "percentages" has been expressed as "proportions"; and the subject, location, categories and years are retained.',
          'Avoid changing the meaning; adding information that is not shown; copying the task word for word without attempting a natural paraphrase; and replacing precise words with inaccurate synonyms.',
        ],
      },
      check: {
        prompt: 'Which introduction preserves the task accurately?',
        options: [
          'The chart illustrates the number of vehicles sold in five countries.',
          'The bar chart compares the proportions of commuters using five transport methods in one city in 2010 and 2023.',
          'The graph predicts how transport will change in the future.',
        ],
        correctIndex: 1,
        explain:
          'It keeps the chart type, the measurement (proportions), the subject (commuters), the five methods, the one city and both years. The others change the subject or measurement, or add a prediction the chart does not make.',
      },
    },
    {
      id: 'overview',
      kind: 'explain',
      title: 'Write the Overview',
      trainerMessage:
        'The overview gives the reader the main message of the visual. It should identify the most important patterns, not repeat every figure.',
      material: {
        type: 'text',
        paragraphs: [
          'For this chart, useful features include: car use remained the highest, although it declined; bicycle use rose substantially; walking remained unchanged.',
          'Model overview: "Overall, car use remained the most common form of transport despite a decline, while bicycle use recorded the most notable increase. Walking was the only category that remained unchanged."',
          'What makes it effective: it identifies the dominant category; it identifies the most notable change; it includes a meaningful stability feature; and it does not list every number.',
          'There is no mandatory phrase such as "Overall", and no universal rule that an overview must contain exactly two sentences. Accuracy and meaningful feature selection matter more.',
        ],
      },
      check: {
        prompt: 'Which overview best summarises the chart?',
        options: [
          'Overall, car use was 52% in 2010, bus use was 24%, bicycle use was 6%, train use was 11%, and walking was 7%.',
          'Overall, every transport method became more popular.',
          'Overall, car use remained the most popular method despite declining, whereas bicycle use increased considerably and walking remained stable.',
        ],
        correctIndex: 2,
        explain:
          'It names the dominant category, the most notable change and a stable feature without listing every figure. The list of 2010 figures is data dumping, and "every transport method became more popular" is false: car and bus declined and walking was unchanged.',
      },
    },
    {
      id: 'body-1',
      kind: 'explain',
      title: 'Develop Body Paragraph 1',
      trainerMessage:
        'The body paragraphs support the overview with relevant details and comparisons. For this chart, one sensible grouping is the two categories that declined.',
      material: {
        type: 'text',
        paragraphs: [
          'Model paragraph: "Car use fell from 52% in 2010 to 38% in 2023, a decrease of 14 percentage points. Despite this decline, it remained considerably more popular than the other methods in 2023. Bus use also decreased, although the change was smaller, falling from 24% to 21%. Consequently, the gap between car and bus use narrowed from 28 percentage points in 2010 to 17 in 2023."',
          'Why it works: it reports accurate values; it compares the magnitude of the changes; it connects the figures logically; and it avoids unsupported explanations for why the changes occurred.',
        ],
      },
      check: {
        prompt: 'Which sentence reports the car change accurately?',
        options: [
          'Car use decreased by 14 percentage points, from 52% to 38%.',
          'Car use increased by 14 percentage points.',
          'Car use decreased by 14% from 52% to 38%.',
        ],
        correctIndex: 0,
        explain:
          'The difference between 52% and 38% is 14 percentage points, and the direction is a decrease. The relative decrease is approximately 26.9%, so "14%" would mix the two measures.',
      },
    },
    {
      id: 'body-2',
      kind: 'explain',
      title: 'Develop Body Paragraph 2',
      trainerMessage:
        'The second body paragraph should report the remaining relevant information without repeating the overview.',
      material: {
        type: 'text',
        paragraphs: [
          'Model paragraph: "In contrast, bicycle use rose markedly from 6% to 19%, an increase of 13 percentage points, and it overtook train use, which had been higher in 2010. Train use also grew, moving from 11% to 15%. Meanwhile, the proportion of commuters who walked remained unchanged at 7% in both years."',
          'Why it works: it groups two increases and one unchanged category; it uses relevant figures; it provides comparisons without listing irrelevant detail; and it avoids claims about what happened between the two recorded years.',
        ],
      },
      check: {
        prompt: 'Which statement is unsupported?',
        options: [
          'Train use increased from 11% to 15%.',
          'Walking remained at 7% in both recorded years.',
          'Bicycle use increased steadily throughout the entire period.',
        ],
        correctIndex: 2,
        explain:
          'Only two time points are provided, so the chart does not show what happened between them. "Steadily throughout the entire period" claims a pattern the data cannot show.',
      },
    },
    {
      id: 'complete-response',
      kind: 'demonstrate',
      title: 'Build a Coherent Complete Response',
      trainerMessage:
        'Your response should read as one connected report, not four disconnected answers. Use clear paragraph organisation, appropriate reference and linking, consistent tense, accurate comparisons and relevant data, with no invented causes, predictions or explanations. Do not put a linking word into every sentence: use transitions when they clarify a relationship.',
      material: {
        type: 'text',
        paragraphs: [
          'The bar chart illustrates the proportions of commuters using five different forms of transport in a city in 2010 and 2023.',
          'Overall, car use remained the most common form of transport despite a decline, while bicycle use recorded the most notable increase. Walking was the only category that remained unchanged.',
          'Car use fell from 52% in 2010 to 38% in 2023, a decrease of 14 percentage points. Despite this decline, it remained considerably more popular than the other methods in 2023. Bus use also decreased, although the change was smaller, falling from 24% to 21%. Consequently, the gap between car and bus use narrowed from 28 percentage points in 2010 to 17 in 2023.',
          'In contrast, bicycle use rose markedly from 6% to 19%, an increase of 13 percentage points, and it overtook train use, which had been higher in 2010. Train use also grew, moving from 11% to 15%. Meanwhile, the proportion of commuters who walked remained unchanged at 7% in both years.',
          'Important: this is one valid model response, not the only acceptable answer. Other accurate introductions, overviews, groupings and sentence structures also deserve credit.',
        ],
      },
    },
    {
      id: 'time-and-words',
      kind: 'explain',
      title: 'Word Count and Time Management',
      trainerMessage:
        'IELTS Academic Task 1 requires at least 150 words. A practical target is approximately 160–190 words — a planning suggestion, not an official upper limit. Do not sacrifice accuracy to reach a particular word target.',
      material: {
        type: 'text',
        paragraphs: [
          'Suggested 20-minute allocation: analyse and plan — 3 minutes; introduction — 2 minutes; overview — 3 minutes; body paragraphs — 9 minutes; review — 3 minutes.',
        ],
      },
      check: {
        prompt: 'What is the minimum word requirement for IELTS Academic Task 1?',
        options: ['100 words.', '150 words.', '200 words.'],
        correctIndex: 1,
        explain: 'Task 1 requires at least 150 words. Writing fewer costs marks, while a target of 160–190 is only a planning suggestion.',
      },
    },
    {
      id: 'common-problems',
      kind: 'explain',
      title: 'Common Complete-Response Problems',
      trainerMessage: 'Learn to recognise these twelve problems in your own writing.',
      material: {
        type: 'vocab',
        items: [
          { phrase: '1. No clear overview', use: 'The reader is never told the main message.' },
          { phrase: '2. Overview with too many figures', use: 'It lists numbers instead of summarising patterns.' },
          { phrase: '3. Incorrect data or calculations', use: 'Wrong figures, wrong categories, or percentage points confused with percentages.' },
          { phrase: '4. Missing key features', use: 'An important pattern, such as the dominant category or largest change, is never reported.' },
          { phrase: '5. Repetition between overview and body', use: 'The body paragraphs restate the overview without adding supporting detail.' },
          { phrase: '6. Disorganised grouping', use: 'Categories are reported in an order that has no logic.' },
          { phrase: '7. Unsupported explanations or predictions', use: 'Reasons or future trends that the visual does not show.' },
          { phrase: '8. Incorrect tense', use: 'Tense that does not match the time reference.' },
          { phrase: '9. Percentages versus percentage points', use: 'For example, "increased by 13%" for a rise from 6% to 19%.' },
          { phrase: '10. Inaccurate collocations or structures', use: 'Unnatural word combinations or ungrammatical sentences.' },
          { phrase: '11. Fewer than 150 words', use: 'The response is too short to cover the task.' },
          { phrase: '12. Poor paragraph connections', use: 'The paragraphs read as separate pieces, not one report.' },
        ],
      },
      check: {
        prompt: 'A learner writes an accurate introduction and two detailed body paragraphs but has no overview. What is the main problem?',
        options: [
          'The response lacks a clear summary of the main features.',
          'The introduction is automatically invalid.',
          'The learner used too many paragraphs.',
        ],
        correctIndex: 0,
        explain:
          'Without an overview the reader is never told the main message of the visual. The introduction is not invalid, and the number of paragraphs is not the issue.',
      },
    },
    {
      id: 'guided-practice',
      kind: 'guided',
      title: 'Guided Practice: Assemble a Response',
      trainerMessage:
        'Now build the response one part at a time: an introduction, an overview, and two body paragraphs. Write your own version, check it, and compare it with the possible answer — other accurate phrasing and logical groupings are also acceptable. These are skill-building tasks, not full IELTS responses, and they are not scored.',
      material: {
        type: 'chart-board',
        dataset: CHART_DATASETS['commute-methods'],
        tasks: [
          {
            id: 'task-a-introduction',
            order: 1,
            prompt:
              'Task A — Introduction. Write one sentence that accurately paraphrases the task: "The chart below compares the percentages of commuters who used five different methods of transport in one city in 2010 and 2023." Keep the chart type, the five transport methods, commuters, the one city, and both years.',
            modelAnswer:
              'The bar chart illustrates the proportions of commuters using five different forms of transport in a city in 2010 and 2023. (Any accurate paraphrase that keeps those elements is fine.)',
            belongsIn: 'introduction',
          },
          {
            id: 'task-b-overview',
            order: 2,
            prompt:
              'Task B — Overview. Write one or two sentences that identify the dominant category and the most important changes.',
            modelAnswer:
              'Overall, car use remained the most common form of transport despite a decline, while bicycle use recorded the most notable increase. Walking was the only category that remained unchanged.',
            belongsIn: 'overview',
          },
          {
            id: 'task-c-car-bus',
            order: 3,
            prompt: 'Task C — Body paragraph. Write a paragraph comparing car and bus use, with the figures for both years.',
            modelAnswer:
              'Car use fell from 52% to 38%, a decrease of 14 percentage points, whereas bus use declined only slightly, from 24% to 21%. Both declined, but the fall in car use was much larger, so car use remained well ahead of bus use in 2023.',
            belongsIn: 'body',
          },
          {
            id: 'task-d-bicycle-train-walking',
            order: 4,
            prompt: 'Task D — Second body paragraph. Write a paragraph comparing bicycle, train and walking, with the figures for both years.',
            modelAnswer:
              'Bicycle use rose from 6% to 19%, an increase of 13 percentage points, and train use grew from 11% to 15%. Walking, by contrast, remained at 7% in both years.',
            belongsIn: 'body',
          },
        ],
      },
    },
    {
      id: 'clinic',
      kind: 'check',
      title: 'Misconception Clinic (1 of 6): Overview vs Detail',
      trainerMessage: 'Each clinic question tests a different complete-response skill. First: what belongs in an overview?',
      check: {
        prompt: 'Which information belongs in an overview rather than in a list of exact values?',
        options: [
          'The exact figure for every category in both years.',
          'A sentence explaining why commuters changed their habits.',
          'The dominant category and the most notable change, such as car use remaining highest while bicycle use rose most.',
        ],
        correctIndex: 2,
        explain:
          "An overview summarises the main patterns. Exact figures belong in the body paragraphs, selected for relevance rather than listed for every category, and the reason commuters changed their habits is not shown by the chart at all.",
      },
    },
    {
      id: 'clinic-2',
      kind: 'check',
      title: 'Misconception Clinic (2 of 6): Percentage Points vs Relative Change',
      trainerMessage: 'Bicycle use rose from 6% to 19%.',
      check: {
        prompt: 'What is the difference between a 13-percentage-point increase and a 216.7% relative increase?',
        options: [
          'A 13-percentage-point increase is the arithmetic gap between the two percentages (19 − 6), whereas a 216.7% relative increase compares that gap with the starting figure (13 ÷ 6).',
          'They are two names for the same calculation.',
          'One applies to bicycle use and the other applies to car use.',
        ],
        correctIndex: 0,
        explain:
          'Percentage points subtract one percentage from the other; relative change divides that difference by the starting value. They are different calculations, and both describe the same bicycle figures.',
      },
    },
    {
      id: 'clinic-3',
      kind: 'check',
      title: 'Misconception Clinic (3 of 6): Logical Grouping',
      trainerMessage: 'Grouping is a choice about meaning, not a fixed pattern.',
      check: {
        prompt: 'Why might car and bus use be grouped together in one body paragraph?',
        options: [
          'Both were the lowest categories in 2010.',
          'Both declined between 2010 and 2023, so their changes can be compared directly.',
          'Both remained unchanged.',
        ],
        correctIndex: 1,
        explain:
          'Car fell from 52% to 38% and bus from 24% to 21%, so they share a direction and their changes can be compared. Car was actually the highest category in 2010, and neither category was unchanged.',
      },
    },
    {
      id: 'clinic-4',
      kind: 'check',
      title: 'Misconception Clinic (4 of 6): Mixed Tense',
      trainerMessage: 'Consider a response that says "Car use fell … while the chart illustrates …".',
      check: {
        prompt: 'Why can a response use past simple for the changes and present simple for what the chart illustrates?',
        options: [
          'Because tense does not matter in Task 1.',
          'Because every verb in a Task 1 response must be in the same tense.',
          'Past simple reports completed changes between 2010 and 2023, while present simple describes what the chart shows now.',
        ],
        correctIndex: 2,
        explain:
          'Tense follows the time reference of each statement: completed changes take past simple, and a description of the visual itself takes present simple. Tense does matter, and there is no rule that one tense must be used throughout.',
      },
    },
    {
      id: 'clinic-5',
      kind: 'check',
      title: 'Misconception Clinic (5 of 6): Unsupported Pace Claim',
      trainerMessage: 'A learner writes: "Bicycle use increased steadily."',
      check: {
        prompt: 'Why is "bicycle use increased steadily" unsupported by this chart?',
        options: [
          'Because bicycle use did not increase.',
          'The chart gives only two time points, so it shows nothing about how the change developed between them.',
          'Because "steadily" is always an incorrect word in Task 1.',
        ],
        correctIndex: 1,
        explain:
          'Bicycle use did increase (6% to 19%), but "steadily" describes how the change developed, which two data points cannot show. The word is fine when yearly data supports it.',
      },
    },
    {
      id: 'clinic-6',
      kind: 'check',
      title: 'Misconception Clinic (6 of 6): Coherence and Repetition',
      trainerMessage: 'A body paragraph only restates the overview, without adding any supporting figures or comparisons.',
      check: {
        prompt: 'What should the writer do?',
        options: [
          'Add relevant figures and comparisons that develop the overview\'s main points.',
          'Delete the body paragraph and add a conclusion.',
          'Repeat the overview more strongly with advanced vocabulary.',
        ],
        correctIndex: 0,
        explain:
          'A body paragraph should add supporting evidence for the overview: specific figures and comparisons. Task 1 does not need a conclusion, and repeating the overview adds nothing.',
      },
    },
    {
      id: 'self-review',
      kind: 'review',
      title: 'Review and Self-Correction',
      trainerMessage:
        'Before you submit, review your response with this checklist. After you receive feedback, use "Rewrite and try again" to correct at least one meaningful weakness before you move on.',
      material: {
        type: 'text',
        paragraphs: [
          'Task coverage: Have I described the correct visual and subject? Have I preserved the time period and the measurement?',
          'Overview: Have I identified the main features? Does my overview summarise rather than list?',
          'Details: Are all figures accurate? Have I selected relevant comparisons? Are the paragraphs logically grouped?',
          'Language: Are tense and subject–verb agreement accurate? Are comparisons and collocations natural? Have I avoided unsupported claims?',
          'Completion: Is the response at least 150 words? Have I used clear paragraph organisation? Have I left time to review?',
        ],
      },
    },
    {
      id: 'reflection',
      kind: 'review',
      title: 'Reflection',
      trainerMessage:
        'You have now practised the complete IELTS Academic Writing Task 1 process. Your next goal is not to memorise this model. It is to apply the same decision-making process accurately to unfamiliar visuals.',
      material: {
        type: 'text',
        paragraphs: [
          'Think about these questions as you write and again after you read your feedback: 1. Which part of a complete Task 1 response is currently strongest? 2. Which part needs the most improvement? 3. What is one specific error you will watch for in your next practice?',
        ],
      },
    },
    {
      id: 'independent-practice',
      kind: 'independent',
      title: 'Independent Full Task 1 Practice',
      trainerMessage:
        'Now write a complete Task 1 response on your own. This is the one exercise in this lesson that is assessed as a full Task 1 response, so your feedback will include an indicative band. Plan first, write for about 20 minutes, then review with the checklist.',
      material: {
        type: 'text',
        paragraphs: [
          'Task: "The chart below compares the percentages of commuters who used five different methods of transport in one city in 2010 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant."',
          'Data (percentage of commuters, illustrative training figures). Car: 52% then 38%. Bus: 24% then 21%. Bicycle: 6% then 19%. Train: 11% then 15%. Walking: 7% then 7%.',
          'Write a complete response with an introduction, an overview and logically organised body paragraphs. Minimum 150 words; a suggested target is 160–190. Spend about 20 minutes. Do not explain why the figures changed, do not make claims about years or trends the chart does not show, and do not copy the model answer.',
        ],
      },
    },
  ],
  finalPrompt: {
    title: 'Write a Complete Task 1 Response',
    instructions:
      'The chart below compares the percentages of commuters who used five different methods of transport in one city in 2010 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write a complete response with an introduction, an overview, relevant supporting details and meaningful comparisons, reporting the information accurately. You should spend about 20 minutes on this task. Write at least 150 words (a suggested target is 160–190). Do not explain why the figures changed, do not make claims about years or trends the chart does not show, and do not copy the model answer.',
    minWords: 150,
    chartId: 'commute-methods',
    checkScope: 'full',
  },
};
