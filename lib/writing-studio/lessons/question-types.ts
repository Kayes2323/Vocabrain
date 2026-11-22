import type { Lesson } from '../types';

/**
 * Task 2 Academy — Module 2 ("Understanding Question Types"): the main
 * question types and what each one actually requires the essay to DO
 * differently. Ends with a short structure-planning task, not a quiz —
 * the quiz is the check step.
 */
export const questionTypesLesson: Lesson = {
  id: 'question-types',
  task: 'task2',
  moduleId: 'task2-m2',
  title: 'Understanding Question Types',
  objective: 'Recognise the main Task 2 question types and plan the right structure for each one before writing a word.',
  estMinutes: 14,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: "Today's goal",
      trainerMessage:
        "Hi, Mino again. Most Task 2 problems start before the writing even begins — with the question type misread. Today you'll learn to spot which type you're facing and what structure it actually demands.",
    },
    {
      id: 'explain',
      kind: 'explain',
      title: 'The five common types',
      trainerMessage:
        'Each type needs a different structure, not just different content. Getting the type wrong usually means your structure is wrong too, however good your English is.',
      material: {
        type: 'text',
        paragraphs: [
          'Agree / Disagree: "To what extent do you agree or disagree?" — needs ONE clear, consistent position held from the introduction to the conclusion. A "partly agree" position is fine, but it must stay the same position throughout.',
          'Discuss Both Views: "Discuss both these views and give your own opinion." — needs a paragraph genuinely covering EACH view (not just your own side), plus your opinion, usually in the conclusion or woven through.',
          'Advantages / Disadvantages: needs balanced coverage of both, often with your view on which outweighs the other if the question asks for it.',
          'Problem / Solution: "What problems does this cause, and what solutions can you suggest?" — needs real problems paired with real, specific solutions, not just more problems.',
          'Two-Part Questions: two direct questions in one prompt — both must be answered, usually one per body paragraph.',
        ],
      },
    },
    {
      id: 'demonstrate',
      kind: 'demonstrate',
      title: 'Matching structure to type',
      trainerMessage: 'Same general topic, two different question types — notice how the required structure changes completely.',
      material: {
        type: 'examples',
        weak:
          'Question: "Discuss both views and give your own opinion" on remote work. Weak plan: Paragraph 1 — why I think remote work is good. Paragraph 2 — more reasons I think remote work is good.',
        good:
          'Same question. Good plan: Paragraph 1 — the view that remote work increases flexibility and wellbeing (genuinely developed, not dismissed). Paragraph 2 — the view that remote work weakens teamwork and company culture (also genuinely developed). Conclusion — my own opinion, weighing both.',
        note: 'The weak plan ignores the word "both" and only argues one side — this is a structural failure, not a language one. The good plan gives each view real space before adding an opinion.',
      },
    },
    {
      id: 'check',
      kind: 'check',
      title: 'Quick check',
      trainerMessage: 'One quick question before we practise.',
      check: {
        prompt: 'A question asks "What problems does this cause, and what solutions can you suggest?" What structure mistake is most common here?',
        options: [
          'Writing too many problems and no solutions, or solutions that do not match the problems raised',
          'Using too many linking words',
          'Writing a conclusion that is too short',
          'Choosing an opinion that disagrees with the majority view',
        ],
        correctIndex: 0,
        explain: 'Problem/Solution questions are commonly answered with problems only, or with solutions that do not actually fix the problems named earlier in the essay — both break the task, regardless of language quality.',
      },
    },
    {
      id: 'guided',
      kind: 'guided',
      title: 'Identify the type, then plan',
      trainerMessage:
        "Read this question and work out which type it is before deciding on a structure. Ask yourself: does it want one position held throughout, both views covered, advantages and disadvantages, a problem paired with a solution, or two separate questions answered?",
      material: {
        type: 'text',
        paragraphs: [
          'Question: "Many museums and historical sites are mainly visited by tourists rather than local people. Why might this be? What can be done to encourage more local people to visit them?"',
          'This is a Two-Part Question — it directly asks "why" and "what can be done", so the essay needs a paragraph genuinely answering each part, not one long answer that blurs the two together.',
        ],
      },
    },
    {
      id: 'review',
      kind: 'review',
      title: 'Before you write',
      trainerMessage:
        "You now have a method: read the question, name its type, then choose the structure that type requires before writing anything. That one habit prevents most Task Response problems before they start.",
    },
  ],
  finalPrompt: {
    title: 'Name the type and plan the structure',
    instructions:
      'For this question — "Some people think the government should pay for healthcare for every citizen. Others believe individuals should pay for their own healthcare. Discuss both views and give your own opinion." — write one sentence naming the question type, then one sentence stating exactly how many paragraphs you would plan and what each one would cover.',
    minWords: 50,
  },
};
