import type { Lesson } from '../types';

/**
 * Task 1 Academy — Module 6 ("Vocabulary and Grammar for Task 1"). Trend
 * verbs, pace-of-change language, comparison structures, and past-tense
 * consistency — then a short, gradeable rewrite task.
 */
export const task1VocabGrammarLesson: Lesson = {
  id: 'task1-vocab-grammar',
  task: 'task1',
  moduleId: 'task1-m6',
  title: 'Precise Trend and Comparison Language',
  objective: 'Replace plain, repeated verbs and vague amounts with precise trend verbs, pace language and comparison structures, in consistent past tense.',
  estMinutes: 14,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: "Today's goal",
      trainerMessage:
        "Hi, Mino again. A lot of Task 1 writing leans on 'went up' and 'went down' for every single change. Today we'll build a sharper toolkit — precise trend verbs, pace language, and comparison structures — and fix the tense slip that catches almost everyone.",
    },
    {
      id: 'explain',
      kind: 'explain',
      title: 'Three things to upgrade',
      trainerMessage:
        "First, trend verbs: 'rose', 'climbed', 'increased' instead of always 'went up'; 'fell', 'declined', 'dropped' instead of always 'went down'. Second, pace: 'rose sharply', 'increased gradually', 'remained steady' tell the reader how fast, not just which direction. Third, comparison: 'more than double', 'roughly the same as', 'in contrast to' are more precise than 'bigger' or 'a lot more'. And because the chart reports the past, every verb describing it should stay in the past tense — switching to the present mid-paragraph is one of the most common Task 1 slips.",
      material: {
        type: 'vocab',
        items: [
          { phrase: 'rose / climbed / increased', use: 'Trend verbs for upward movement — vary them instead of repeating "went up" every sentence.' },
          { phrase: 'fell / declined / dropped', use: 'Trend verbs for downward movement — same idea, for "went down".' },
          { phrase: 'rose sharply / increased gradually / remained steady', use: 'Pace language: how fast or how little the change was, not just the direction.' },
          { phrase: 'more than double / roughly the same as / in contrast to', use: 'Comparison structures that state a precise relationship between two figures, rather than a vague "much more" or "a lot less".' },
          { phrase: 'had risen / had already reached', use: 'Past perfect, for a figure that reached a point before another past event in the same sentence.' },
        ],
      },
    },
    {
      id: 'demonstrate',
      kind: 'demonstrate',
      title: 'Plain vs. precise',
      trainerMessage: 'Same facts, two versions. Notice the verbs, the pace words, and the tense.',
      material: {
        type: 'examples',
        weak: 'The number went up a lot between 2000 and 2010. Then it goes up a bit more slowly after that.',
        good:
          'The figure rose sharply between 2000 and 2010, before increasing only gradually for the remainder of the period.',
        note: "The weak version repeats 'went up', gives no sense of pace beyond 'a lot', and switches to the present tense ('goes up') partway through. The good version varies the trend verb, names the pace explicitly with 'sharply' and 'gradually', and keeps the past tense throughout.",
      },
    },
    {
      id: 'check',
      kind: 'check',
      title: 'Quick check',
      trainerMessage: 'One quick question before we practise.',
      check: {
        prompt: 'Which sentence has a tense problem?',
        options: [
          'The figure climbed steadily between 2010 and 2020.',
          'Sales had already reached their peak before the recession began.',
          'Car use fell sharply, while cycling rises at the same time.',
          'Bus use remained roughly stable throughout the period.',
        ],
        correctIndex: 2,
        explain: '"Car use fell sharply" is correctly in the past tense, but "cycling rises" switches to the present — it should be "cycling rose", since both changes are being reported from the same past chart.',
      },
    },
    {
      id: 'guided',
      kind: 'guided',
      title: 'Rewrite these with sharper language',
      trainerMessage:
        "Here are three plain sentences from a weak Task 1 response. Read how each one could be rewritten with a precise trend verb, a pace word, or a comparison structure — then you'll do the same for your own final task.",
      material: {
        type: 'examples',
        weak: '1) The number of car users went down a lot. 2) Train use went up and bus use also went up, by about the same amount. 3) Walking stayed about the same the whole time.',
        good:
          "1) Car use declined sharply. 2) Train use and bus use both rose, by roughly the same amount. 3) Walking remained steady throughout the period.",
        note: "Each rewrite does one job: (1) swaps 'went down a lot' for a precise verb + pace word; (2) swaps a vague 'about the same amount' comparison for 'roughly the same amount' and removes the repeated 'went up'; (3) swaps 'stayed about the same' for 'remained steady', a standard pace phrase for an unchanging figure.",
      },
    },
    {
      id: 'review',
      kind: 'review',
      title: 'Before you write',
      trainerMessage:
        "You've now seen trend verbs, pace language, comparison structures and the past-tense rule in action. Rewrite the three plain sentences below using this toolkit — aim for a different trend verb, a pace word, or a comparison structure in each one, and keep everything in the past tense.",
    },
  ],
  finalPrompt: {
    title: 'Rewrite with precise language',
    instructions:
      'Rewrite these three plain sentences using precise trend verbs, pace language or comparison structures, keeping every verb in the past tense: 1) "The number of visitors went up a lot in the first year." 2) "Online sales went up while in-store sales went down, by about the same amount." 3) "Average prices stayed about the same for most of the period."',
    minWords: 40,
  },
};
