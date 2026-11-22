import type { Lesson } from '../types';

/**
 * Task 2 Academy — Module 7 ("Vocabulary and Grammar"). Academic word choice,
 * paraphrasing by changing structure (not just synonyms), and one correctly
 * used complex sentence rather than several linkers piled on top of each other.
 */
export const task2VocabGrammarLesson: Lesson = {
  id: 'task2-vocab-grammar',
  task: 'task2',
  moduleId: 'task2-m7',
  title: 'Academic Vocabulary and Complex Sentences',
  objective: 'Replace informal word choices with academic ones, and build one correct complex sentence instead of stacking several linkers.',
  estMinutes: 14,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: "Today's goal",
      trainerMessage:
        "Hi, it's Mino. Lexical Resource and Grammatical Range both reward control, not decoration. Today: swapping informal words for precise academic ones, and building ONE complex sentence correctly rather than several simple ones joined badly.",
    },
    {
      id: 'explain',
      kind: 'explain',
      title: 'Precision over decoration',
      trainerMessage:
        'Informal words like "a lot of", "kids", "stuff" and "things" cost marks in an academic essay — not because they are wrong, but because they are vague. A complex sentence joins one main idea with one subordinate idea using a word like "although", "because" or "if" — it is not about length, and piling up three linkers in one sentence usually creates a run-on, not a stronger sentence.',
      material: {
        type: 'text',
        paragraphs: [
          'Paraphrasing is also a grammar skill, not just a vocabulary swap: changing a verb into a noun form (reduce → a reduction in), or an active sentence into a passive one, counts as a real paraphrase even when several words stay the same.',
          'One well-built complex sentence, fully correct, is worth more than three short simple sentences bolted together with "and" and "so".',
        ],
      },
    },
    {
      id: 'demonstrate',
      kind: 'demonstrate',
      title: 'Simple vs. a correct complex sentence',
      trainerMessage: 'Same idea — one version is informal and choppy, one is a single, correctly built complex sentence.',
      material: {
        type: 'examples',
        weak: "A lot of kids spend too much time on their phones and this is bad and it affects their school work, so parents should limit it.",
        good:
          'Although many students rely on smartphones for study, excessive use can undermine academic performance, which is why parents should set clear limits.',
        note:
          'The weak version uses informal words ("kids", "a lot of") and strings three simple ideas together with "and... so". The good version uses one subordinator ("although") plus one relative clause ("which is why") to join the same ideas into a single, controlled sentence — note it does NOT stack "although" and "but" together, which is the most common version of this mistake.',
      },
    },
    {
      id: 'check',
      kind: 'check',
      title: 'Quick check',
      trainerMessage: 'One quick question before we practise.',
      check: {
        prompt: 'What usually goes wrong when a student piles up several linking words in one sentence?',
        options: [
          'The sentence becomes too short',
          'It creates a run-on sentence instead of a stronger one',
          'It automatically raises the band score',
          'It removes the need for an example',
        ],
        correctIndex: 1,
        explain:
          'Stacking linkers ("and... so... but") usually produces a run-on sentence with unclear logic. One subordinator used correctly is stronger than three linkers used loosely.',
      },
    },
    {
      id: 'guided',
      kind: 'guided',
      title: 'Informal to academic',
      trainerMessage:
        "Here are common informal choices and the academic alternative examiners expect to see. Read through them, then rewrite the sentences below.",
      material: {
        type: 'vocab',
        items: [
          { phrase: 'a lot of / lots of', use: 'Replace with "a significant number of" or "a considerable amount of" depending on countable/uncountable.' },
          { phrase: 'kids', use: 'Replace with "children" or "young people" in an academic essay.' },
          { phrase: 'things / stuff', use: 'Replace with the specific noun you actually mean — "factors", "measures", "resources".' },
          { phrase: 'get better / get worse', use: 'Replace with "improve" / "deteriorate" for a more precise, academic verb.' },
          { phrase: 'really / very', use: 'Replace with a single stronger adjective — "significant", "severe", "considerable" — instead of an intensifier.' },
        ],
      },
    },
    {
      id: 'review',
      kind: 'review',
      title: 'Before you write',
      trainerMessage:
        "You now have the academic alternatives and one way to join ideas correctly. Rewrite the sentences below, swapping every informal word for an academic one and joining each pair into one correct complex sentence.",
    },
  ],
  finalPrompt: {
    title: 'Rewrite academically',
    instructions:
      'Rewrite these two simple, informal sentences as academic, complex sentences (one subordinator per sentence, no stacked linkers): "A lot of kids spend too much time on their phones and it is bad for their grades." and "Things got worse for small shops because a lot of people buy stuff online now."',
    minWords: 50,
  },
};
