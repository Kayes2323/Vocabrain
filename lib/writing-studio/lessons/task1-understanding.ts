import type { Lesson } from '../types';

/**
 * Task 1 Academy — Module 1 ("Understanding IELTS Writing Task 1"). Sets up
 * what the task actually asks for before any chart work: describe/summarise
 * data objectively, no opinion, within the basic introduction → overview →
 * body shape, in 150+ words and about 20 minutes.
 */
export const task1UnderstandingLesson: Lesson = {
  id: 'task1-understanding',
  task: 'task1',
  moduleId: 'task1-m1',
  title: 'Understanding IELTS Writing Task 1',
  objective: 'Know exactly what Task 1 is asking for, so every later lesson builds on the right foundation.',
  estMinutes: 10,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: "Today's goal",
      trainerMessage:
        "Hi — I'm Mino. Before we touch a single chart, let's be clear on what Task 1 actually wants from you. Most early mistakes come from misunderstanding the task itself, not from weak English.",
    },
    {
      id: 'explain',
      kind: 'explain',
      title: 'What Task 1 is — and is not',
      trainerMessage:
        'Task 1 gives you a chart, table, map or diagram and asks you to describe or summarise it objectively. It is not an essay: you never give your opinion, and you never explain why the data looks the way it does unless the task tells you to.',
      material: {
        type: 'text',
        paragraphs: [
          'You have about 20 minutes and must write at least 150 words. The response is marked on four equally-weighted criteria: Task Achievement (did you cover the key features accurately, with an overview?), Coherence & Cohesion (is it organised and linked?), Lexical Resource (is your vocabulary accurate and varied?) and Grammatical Range & Accuracy.',
          'The basic shape is always the same: an introduction that paraphrases the question, an overview that names the one or two biggest patterns, and body paragraphs that report the supporting detail with real figures.',
        ],
      },
    },
    {
      id: 'demonstrate',
      kind: 'demonstrate',
      title: 'On-task vs. off-task',
      trainerMessage: 'Here are two openings written for the same chart about electricity use. Only one of them is actually doing what Task 1 asks.',
      material: {
        type: 'examples',
        good:
          'The line graph compares the proportion of electricity generated from renewable sources in three countries between 2000 and 2020.',
        weak:
          'In my opinion, countries should use more renewable electricity because it is better for the environment, and I think this chart proves it.',
        note: 'The weak version gives an opinion and argues a case — that is Task 2 behaviour. Task 1 only ever reports what the chart shows, in neutral, objective language.',
      },
    },
    {
      id: 'check',
      kind: 'check',
      title: 'Quick check',
      trainerMessage: 'One quick question before we practise.',
      check: {
        prompt: 'Which of these is appropriate in a Task 1 response?',
        options: [
          'Explaining why you think the trend happened',
          'Giving your opinion on whether the trend is good or bad',
          'Reporting the overall trend and the key figures objectively',
          'Suggesting what should be done about the data',
        ],
        correctIndex: 2,
        explain: 'Task 1 is a reporting task: you describe what the chart shows, objectively, with no opinion, no speculation about causes, and no recommendations.',
      },
    },
    {
      id: 'guided',
      kind: 'guided',
      title: 'Spot the problem',
      trainerMessage:
        "Let's look more closely at why that weak example fails, and practise fixing a sentence that makes the same mistake.",
      material: {
        type: 'examples',
        weak: 'I believe the government should invest more in renewables, which would help the environment a lot.',
        good: 'Renewable electricity generation increased in all three countries shown, with the sharpest rise seen in Denmark.',
        note: 'Notice the fix is not about grammar — both sentences are grammatically fine. The fix is about task type: remove the opinion and the recommendation, and report only what the data shows.',
      },
    },
    {
      id: 'review',
      kind: 'review',
      title: 'Before you write',
      trainerMessage:
        'Keep this rule in mind for every Task 1 response from now on: if a sentence could appear in a persuasive essay, it probably does not belong here. Report; do not argue.',
    },
  ],
  finalPrompt: {
    title: 'Paraphrase the question',
    instructions:
      'Here is a Task 1 question: "The chart below shows the main method of travelling to work in one city in 2010 and 2023." Write your own introduction paraphrasing this question — change the structure and vocabulary but keep the same information — then add one more sentence saying what your introduction deliberately leaves out (any opinion, any individual figures, any explanation of causes).',
    minWords: 50,
  },
};
