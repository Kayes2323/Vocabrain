import { CHART_DATASETS } from '../charts';
import type { Lesson } from '../types';

/**
 * Task 1 Academy — Module 8 ("Complete Task 1 Writing"), the capstone
 * module: putting paraphrase, overview and body paragraphs together into
 * one complete, 150-word response under real exam conditions.
 */
export const task1FullPracticeLesson: Lesson = {
  id: 'task1-full-practice',
  task: 'task1',
  moduleId: 'task1-m8',
  title: 'Putting a Full Response Together',
  objective: 'Combine a paraphrased introduction, a focused overview and well-developed body paragraphs into one complete, 150-word Task 1 response.',
  estMinutes: 22,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: "Today's goal",
      trainerMessage:
        "Hi, Mino here. You've practised the overview and body paragraphs separately — today we put them together into one complete response, the way you'll actually write it on test day: about 150 words in roughly 20 minutes.",
    },
    {
      id: 'explain',
      kind: 'explain',
      title: 'The four-part shape',
      trainerMessage:
        'A complete Task 1 response has four parts: an introduction that paraphrases the question in your own words (one sentence), an overview that names the general trend and the one or two most striking features (two to three sentences), and two body paragraphs that group the remaining data logically and make real comparisons. No opinions anywhere — Task 1 is reporting, not arguing.',
      material: {
        type: 'text',
        paragraphs: [
          "The introduction should not copy the question. If the prompt says 'The chart shows the main method of travelling to work...', your introduction paraphrases it: 'The chart illustrates how people commuted to work in one city in 2010 and 2023.'",
          'The overview comes next, separated from the body paragraphs by a blank line, and names the big picture only — no individual figures.',
          'Body paragraphs then group the data (for example: methods that declined vs. methods that grew) and compare figures precisely, using the language from the Vocabulary and Grammar module.',
        ],
      },
    },
    {
      id: 'demonstrate',
      kind: 'demonstrate',
      title: 'A complete short response',
      trainerMessage: 'Here is a full response at roughly the right length. Notice the four parts and how little repetition there is.',
      material: {
        type: 'examples',
        weak:
          'The chart shows the main method of travelling to work in one city in 2010 and 2023. Car was 52% in 2010 and 38% in 2023. Bus was 24% in 2010 and 21% in 2023. Bicycle was 6% in 2010 and 19% in 2023. Train was 11% in 2010 and 15% in 2023. Walking was 7% in both years.',
        good:
          'The chart illustrates how people commuted to work in one city in 2010 and 2023.\n\nOverall, car use declined while cycling grew substantially; the other methods changed only slightly, and walking remained completely unchanged.\n\nCar remained the most common method in both years, but its share fell markedly from 52% to 38%. Bicycle use showed the opposite pattern, more than tripling from just 6% to 19% over the same period — the largest relative change of any method.\n\nBus and train use were comparatively stable, declining and rising only slightly to 21% and 15% respectively, while walking stayed fixed at 7% throughout.',
        note: 'The weak version just repeats every figure for every method in order — it has no introduction paraphrase, no overview, and no grouping. The good version paraphrases the question, gives a genuine overview with no numbers, then groups the methods (declining vs. growing vs. stable) and compares precisely.',
      },
    },
    {
      id: 'check',
      kind: 'check',
      title: 'Quick check',
      trainerMessage: 'One quick question before we practise.',
      check: {
        prompt: 'What is the correct order of parts in a complete Task 1 response?',
        options: [
          'Overview, introduction, body paragraphs',
          'Introduction, body paragraphs, overview',
          'Introduction, overview, body paragraphs',
          'Body paragraphs, introduction, overview',
        ],
        correctIndex: 2,
        explain: 'A paraphrased introduction comes first, then the overview (the big picture, separated by a blank line), and the body paragraphs with the grouped detail come last.',
      },
    },
    {
      id: 'guided',
      kind: 'guided',
      title: 'Plan before you write',
      trainerMessage:
        "This is the same chart used in the Vocabulary and Grammar module, now for a full response. Work through these planning questions before you write — they map directly onto your introduction, overview and two body paragraphs.",
      material: {
        type: 'chart-board',
        dataset: CHART_DATASETS['commute-methods'],
        tasks: [
          { id: 'overview-trend', order: 1, prompt: 'What is the single biggest change across the whole chart, worth leading your overview with?', modelAnswer: 'Bicycle use grew dramatically while car use declined noticeably; the rest changed only slightly.', belongsIn: 'overview' },
          { id: 'group-decline', order: 2, prompt: 'Which method changed the most in percentage points, and by how much?', modelAnswer: 'Car use fell the most, from 52% to 38%, a drop of 14 percentage points.', belongsIn: 'body' },
          { id: 'group-grow', order: 3, prompt: 'Which method grew the most in relative terms (as a multiple of its own 2010 figure)?', modelAnswer: 'Bicycle use more than tripled, from 6% to 19%.', belongsIn: 'body' },
          { id: 'stable', order: 4, prompt: 'Which method did not change at all, and which two changed only slightly?', modelAnswer: 'Walking stayed fixed at 7%; bus and train both changed only slightly (24% to 21%, and 11% to 15%).', belongsIn: 'body' },
        ],
      },
    },
    {
      id: 'review',
      kind: 'review',
      title: 'Before you write',
      trainerMessage:
        'You now have all four parts planned: a paraphrase, an overview (the bicycle/car story), and two body paragraphs (the big changes, and the stable methods). Write the complete response now, in about 20 minutes — at least 150 words, with a blank line between your overview and each body paragraph.',
    },
  ],
  finalPrompt: {
    title: 'Write a complete Task 1 response',
    instructions:
      'The chart below shows the main method of travelling to work in one city in 2010 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. You should spend about 20 minutes on this task. Write at least 150 words.',
    minWords: 150,
    chartId: 'commute-methods',
  },
};
