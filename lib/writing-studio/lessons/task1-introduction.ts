import type { Lesson } from '../types';

/**
 * Task 1 Academy — Module 3 ("Introduction Writing"). A single, narrow
 * skill: paraphrasing the question accurately — changing structure and
 * vocabulary without adding or losing information — and avoiding the two
 * common mistakes of copying the question or slipping in an opinion.
 */
export const task1IntroductionLesson: Lesson = {
  id: 'task1-introduction',
  task: 'task1',
  moduleId: 'task1-m3',
  title: 'Writing a Clear Introduction',
  objective: 'Paraphrase a Task 1 question accurately in one sentence, without copying it and without adding an opinion.',
  estMinutes: 10,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: "Today's goal",
      trainerMessage:
        "Hi — it's Mino. Your introduction is one sentence, but examiners notice immediately if it is just the question copied word for word. Let's fix that in this short lesson.",
    },
    {
      id: 'explain',
      kind: 'explain',
      title: 'What "paraphrase" really means',
      trainerMessage:
        'A real paraphrase changes the structure and the vocabulary while keeping exactly the same information — nothing added, nothing lost. Swapping one or two words for synonyms is not enough; the sentence needs a different shape too.',
      material: {
        type: 'text',
        paragraphs: [
          'Two reliable techniques: change the grammar (active becomes passive, or a clause becomes a noun phrase), and change the vocabulary (use a synonym that still means exactly the same thing in context — "shows" can become "illustrates" or "presents").',
          'Whatever technique you use, check afterwards that you have not added information that was not in the question, and not accidentally left any part of it out.',
        ],
      },
    },
    {
      id: 'demonstrate',
      kind: 'demonstrate',
      title: 'Copy vs. paraphrase',
      trainerMessage: 'The question is: "The chart below shows the main method of travelling to work in one city in 2010 and 2023." Here are two attempts at an introduction.',
      material: {
        type: 'examples',
        weak: 'The chart below shows the main method of travelling to work in one city in 2010 and 2023.',
        good: 'The bar chart illustrates how people in one city travelled to work, comparing the years 2010 and 2023.',
        note: 'The weak version is simply copied — examiners can tell instantly and it adds nothing. The good version keeps every piece of information (method of travel, one city, both years) but changes the sentence structure and several words.',
      },
    },
    {
      id: 'check',
      kind: 'check',
      title: 'Quick check',
      trainerMessage: 'One quick question before we practise.',
      check: {
        prompt: 'Which change makes a sentence a genuine paraphrase rather than a copy?',
        options: [
          'Replacing "the" with "a" throughout',
          'Changing both the sentence structure and the vocabulary, while keeping the same information',
          'Adding your own opinion about the topic',
          'Making the sentence shorter by leaving out a detail',
        ],
        correctIndex: 1,
        explain: 'A real paraphrase changes both structure and wording, with no information added or lost. Leaving out a detail or adding an opinion are both separate mistakes, not paraphrasing.',
      },
    },
    {
      id: 'guided',
      kind: 'guided',
      title: 'Useful shifts to try',
      trainerMessage:
        'Here are a few reliable phrase swaps and structure shifts. Try spotting which one is used in the good example above before you write your own.',
      material: {
        type: 'vocab',
        items: [
          { phrase: 'illustrates / presents / compares', use: 'Safe synonyms for "shows" at the start of an introduction.' },
          { phrase: 'the + noun (e.g. "the main method of travel")', use: 'Turn a verb phrase from the question into a noun phrase to change the sentence shape.' },
          { phrase: 'comparing X and Y', use: 'A compact way to state two years, groups or categories without repeating "in" twice.' },
          { phrase: 'how/what/the way [clause]', use: 'Turn a direct statement into an indirect one — "shows the method" becomes "shows how people travelled".' },
        ],
      },
    },
    {
      id: 'review',
      kind: 'review',
      title: 'Before you write',
      trainerMessage:
        'One sentence, your own structure, your own words, the same information, no opinion. That is the whole job.',
    },
  ],
  finalPrompt: {
    title: 'Paraphrase this question',
    instructions:
      'Paraphrase this Task 1 question in one sentence: "The table below gives information about the number of visitors to four museums in one city in 2015 and 2023." Change the structure and the vocabulary — do not copy the sentence, and do not add any opinion or extra information. Then add a short second sentence naming which technique you used (a structure shift, a vocabulary swap, or both).',
    minWords: 30,
  },
};
