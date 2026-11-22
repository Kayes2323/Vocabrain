import type { Lesson } from '../types';

/**
 * Task 2 Academy — Module 1 ("Understanding IELTS Writing Task 2"): the
 * basic essay shape, the four assessment criteria, and the 250-word /
 * 40-minute constraint. Ends with a short, gradeable introduction task.
 */
export const task2UnderstandingLesson: Lesson = {
  id: 'task2-understanding',
  task: 'task2',
  moduleId: 'task2-m1',
  title: 'Understanding IELTS Writing Task 2',
  objective: 'Know the basic shape every Task 2 essay needs, and the four criteria it is marked against, before learning any single skill in detail.',
  estMinutes: 12,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: "Today's goal",
      trainerMessage:
        "Hi — I'm Mino. Before we get into specific skills, let's agree on the basic shape of a Task 2 essay and how it's actually marked. Everything else in this Academy builds on today's lesson.",
    },
    {
      id: 'explain',
      kind: 'explain',
      title: 'The shape of a Task 2 essay',
      trainerMessage:
        "You have 40 minutes to write at least 250 words. Every essay — whatever the question type — needs an introduction (paraphrase the question, then state your position clearly), two or three body paragraphs (each one developing a single idea, not several), and a conclusion (restate your position, do not add a new argument).",
      material: {
        type: 'text',
        paragraphs: [
          'The four criteria are equally weighted: Task Response (does your essay fully answer what was asked, with a clear position and developed ideas?), Coherence & Cohesion (is it organised into clear paragraphs with ideas linked naturally?), Lexical Resource (is your vocabulary accurate and varied enough?), and Grammatical Range & Accuracy (a mix of sentence structures, mostly error-free).',
          "Under 250 words almost always lowers Task Response, however good the English is — so the word count is not a suggestion, it's part of the task.",
        ],
      },
    },
    {
      id: 'demonstrate',
      kind: 'demonstrate',
      title: 'Clear position vs. no position',
      trainerMessage: 'Here are two introductions to the same question. Read both before deciding which one actually commits to an answer.',
      material: {
        type: 'examples',
        weak:
          'Nowadays, many people have different opinions about whether students should study abroad. This essay will discuss the advantages and disadvantages of this topic and give some information about it.',
        good:
          'Many students today choose to pursue part of their education overseas. While this brings clear benefits such as exposure to new cultures, I believe the financial and emotional costs often outweigh these advantages for most families.',
        note: "The weak version paraphrases the topic but never says what the writer actually thinks — 'discuss the advantages and disadvantages' is not a position. The good version paraphrases and then commits to a clear, specific stance the rest of the essay can follow.",
      },
    },
    {
      id: 'check',
      kind: 'check',
      title: 'Quick check',
      trainerMessage: 'One quick question before we practise.',
      check: {
        prompt: 'Which of these is most likely to lower your Task Response score, even if your grammar is perfect?',
        options: [
          'Using the word "however" twice',
          'Writing 240 words with no clear position stated anywhere',
          'Starting a sentence with "Overall"',
          'Using a semicolon',
        ],
        correctIndex: 1,
        explain: 'Being under the word minimum and never stating a clear position are both Task Response problems — grammar and punctuation choices like the others do not themselves lower your score.',
      },
    },
    {
      id: 'guided',
      kind: 'guided',
      title: 'Paraphrase, then commit',
      trainerMessage:
        'Read this question, then look at how it can be paraphrased and turned into a position in two sentences. Notice that the paraphrase changes the wording but keeps the exact meaning, and the position sentence commits to a side.',
      material: {
        type: 'text',
        paragraphs: [
          'Question: "Some people think governments should spend more money on public transport instead of building new roads. To what extent do you agree or disagree?"',
          'Paraphrase + position: "Whether to prioritise public transport over new roads is a question facing many growing cities. In my view, investing in public transport should clearly come first." Notice the paraphrase avoids copying the question word-for-word, and the second sentence leaves no doubt about which side the writer takes.',
        ],
      },
    },
    {
      id: 'review',
      kind: 'review',
      title: 'Before you write',
      trainerMessage:
        "You now know the shape (intro, body paragraphs, conclusion) and how marking actually works. For your task below, focus only on the introduction — a paraphrase sentence followed by a sentence that clearly commits to a position.",
    },
  ],
  finalPrompt: {
    title: 'Write your introduction',
    instructions:
      'For this question — "Some people believe that university education should be free for all students. Discuss the advantages and disadvantages of this policy." — write a short introduction: one sentence that paraphrases the question, then one sentence that clearly states your own position.',
    minWords: 60,
  },
};
