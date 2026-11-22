import type { Lesson } from '../types';

/**
 * Task 2 Academy — Module 6 ("Introduction and Conclusion"). Teaches a real
 * paraphrase (not a synonym swap), a thesis statement that previews the
 * essay's actual structure, and a conclusion that restates the position
 * without introducing a new argument.
 */
export const introConclusionLesson: Lesson = {
  id: 'intro-conclusion',
  task: 'task2',
  moduleId: 'task2-m6',
  title: 'Introduction and Conclusion',
  objective: 'Write a thesis statement that previews your essay, and a conclusion that restates your position without adding a new argument.',
  estMinutes: 14,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: "Today's goal",
      trainerMessage:
        "Hi, Mino again. Today we're bookending the essay: a paraphrase and thesis that tell the examiner exactly where you're going, and a conclusion that closes it off properly instead of trailing away.",
    },
    {
      id: 'explain',
      kind: 'explain',
      title: 'Paraphrase, thesis, and a clean close',
      trainerMessage:
        'A paraphrase restates the question in different words and structure — not just swapping two or three synonyms into the same sentence shape. Your thesis then states your position AND previews your main points, so the examiner knows what each body paragraph will do before they read it. Your conclusion restates that same position in new words and briefly sums up your reasons. Nothing new is argued here — a conclusion is not the place to introduce a point you have not developed.',
      material: {
        type: 'text',
        paragraphs: [
          "A weak paraphrase keeps the question's sentence structure and only changes a word or two: \"Some people believe saving money is essential for young people\" becomes \"Some individuals believe saving money is essential for young people.\" That is barely different.",
          'A real paraphrase changes the structure: "Whether young people should prioritise saving or have complete freedom over their spending is a question that divides opinion." Same meaning, different shape.',
          'Your conclusion should take roughly the same time as your introduction — one short paragraph, not a rushed final sentence and not a new essay.',
        ],
      },
    },
    {
      id: 'demonstrate',
      kind: 'demonstrate',
      title: 'A conclusion that stays disciplined',
      trainerMessage: 'Same essay, same position — one conclusion breaks the rules, one does not.',
      material: {
        type: 'examples',
        weak:
          'In conclusion, saving money is essential for young people. Another point worth considering is that governments should also teach financial literacy in schools, which would help even more.',
        good:
          'In conclusion, while young people value financial independence, building a habit of saving early protects them from the very emergencies that most threaten that independence. The short-term freedom to spend everything is not worth the long-term risk.',
        note:
          'The weak version restates the position correctly, then introduces a brand-new argument about schools that was never developed in the essay — this confuses the examiner about whether the essay is finished. The good version restates the position in new words and briefly ties the reasoning together, with nothing new.',
      },
    },
    {
      id: 'check',
      kind: 'check',
      title: 'Quick check',
      trainerMessage: 'One quick question before we practise.',
      check: {
        prompt: 'What should a Task 2 conclusion never do?',
        options: [
          'Restate the essay\'s position in different words',
          'Briefly summarise the main reasons already given',
          'Introduce a new argument that was not developed in the body',
          'Take roughly the same length as the introduction',
        ],
        correctIndex: 2,
        explain:
          'A conclusion restates and briefly sums up — it never introduces a new, undeveloped argument. That confuses the examiner about whether the essay is actually finished.',
      },
    },
    {
      id: 'guided',
      kind: 'guided',
      title: 'Useful paraphrase and thesis language',
      trainerMessage:
        "Before you write, here are phrases that help you paraphrase and signpost without sounding mechanical. Read through them, then we'll put them to use.",
      material: {
        type: 'vocab',
        items: [
          { phrase: 'is a question that divides opinion', use: 'Opens a paraphrase of a two-sided debate question, replacing "some people believe... while others think..."' },
          { phrase: 'this essay will argue that...', use: 'A direct, clear way to state your thesis position — use once, in the introduction.' },
          { phrase: 'while... , ...', use: 'Signals you will acknowledge the other side briefly before stating your own position, e.g. "While freedom of choice matters, ..."' },
          { phrase: 'for the reasons outlined above', use: 'A simple, safe way to open a conclusion that refers back to your body paragraphs without repeating them word for word.' },
          { phrase: 'ultimately', use: 'A clean way to restate your final position in the conclusion without sounding repetitive.' },
        ],
      },
    },
    {
      id: 'review',
      kind: 'review',
      title: 'Before you write',
      trainerMessage:
        "You now have the shape: restate the position, sum up briefly, add nothing new. Write the conclusion for the essay position given below — keep it to one paragraph.",
    },
  ],
  finalPrompt: {
    title: 'Write the conclusion',
    instructions:
      'The essay argues: "Saving money is essential for young people, because it protects them from financial emergencies and reduces long-term stress." Write only the conclusion paragraph for this essay — restate the position in different words and briefly sum up the reasoning. Do not introduce any new argument.',
    minWords: 60,
  },
};
