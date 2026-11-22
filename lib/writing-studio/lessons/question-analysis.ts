import type { Lesson } from '../types';

/**
 * Task 2 Academy — Module 3 ("Question Analysis"): finding the exact topic
 * AND the exact task requirement, since they are often different — and the
 * most common way students drift off-topic while sounding fluent.
 */
export const questionAnalysisLesson: Lesson = {
  id: 'question-analysis',
  task: 'task2',
  moduleId: 'task2-m3',
  title: 'Question Analysis',
  objective: 'Separate the topic of a question from its exact task requirement, so the essay answers what was actually asked.',
  estMinutes: 12,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: "Today's goal",
      trainerMessage:
        "Hi, it's Mino. A fluent, well-organised essay can still score poorly for one reason: it answers a question slightly different from the one that was asked. Today's lesson is about catching that before you start writing.",
    },
    {
      id: 'explain',
      kind: 'explain',
      title: 'Topic vs. task requirement',
      trainerMessage:
        'Every question has a topic (what it is generally about) and a task requirement (the exact thing you must do with that topic). A question about "technology in schools" might really require you to weigh advantages against disadvantages, not write generally about technology.',
      material: {
        type: 'text',
        paragraphs: [
          "To find the task requirement, look past the topic words to the instruction: 'to what extent do you agree', 'discuss both views', 'what are the causes and effects', 'what problems... what solutions'. That instruction, not the topic, decides what your essay must do.",
          'Going off-topic usually does not look like writing about something unrelated — it looks like writing fluently about the general topic while quietly ignoring the specific instruction.',
        ],
      },
    },
    {
      id: 'demonstrate',
      kind: 'demonstrate',
      title: 'On-topic vs. off-topic',
      trainerMessage: 'Same question, two answers. Both are about the right topic — only one actually does what was asked.',
      material: {
        type: 'examples',
        weak:
          'Question: "Some people think children should start learning a foreign language in primary school rather than secondary school. Discuss the advantages and disadvantages." Off-topic answer: writes generally about why learning foreign languages is useful for children, without ever comparing primary school starting age against secondary school starting age.',
        good:
          'On-topic answer: directly compares starting earlier (primary) versus starting later (secondary) — faster natural acquisition and more exposure time as advantages of starting early, against the cost of taking lesson time from core subjects as a disadvantage.',
        note: 'The off-topic answer is fluent and relevant to the general topic of language learning, but it never engages with the actual comparison the question asks for (primary vs. secondary start). That is a Task Response failure, not a language one.',
      },
    },
    {
      id: 'check',
      kind: 'check',
      title: 'Quick check',
      trainerMessage: 'One quick question before we practise.',
      check: {
        prompt: 'What usually causes a fluent essay to go off-topic?',
        options: [
          'Using too many examples',
          'Writing generally about the topic while ignoring the exact instruction (e.g. "discuss both views", "to what extent")',
          'Writing a short conclusion',
          'Choosing an unpopular opinion',
        ],
        correctIndex: 1,
        explain: 'Going off-topic is almost always about ignoring the specific instruction behind the general topic, not about style, length of conclusion, or which opinion is chosen.',
      },
    },
    {
      id: 'guided',
      kind: 'guided',
      title: 'Separate topic from requirement',
      trainerMessage:
        'Read this question and notice how the topic and the task requirement are written out separately below — that separation is exactly what you need to do for any question before planning your essay.',
      material: {
        type: 'text',
        paragraphs: [
          'Question: "In many countries, the amount of crime committed by young people is increasing. What are the causes of this, and what measures could be taken to reduce it?"',
          'Topic: youth crime. Task requirement: name the causes of rising youth crime AND suggest measures to reduce it — two distinct jobs, each needing its own paragraph, not one general essay about crime.',
        ],
      },
    },
    {
      id: 'review',
      kind: 'review',
      title: 'Before you write',
      trainerMessage:
        "You now have a two-step habit: separate the topic from the exact task requirement before planning anything. Apply it to the question below.",
    },
  ],
  finalPrompt: {
    title: 'Separate topic and requirement',
    instructions:
      'For this question — "Some people believe that unpaid community service should be a compulsory part of high school education. To what extent do you agree or disagree?" — write one sentence stating the topic, and a second sentence stating the exact task requirement in your own words.',
    minWords: 40,
  },
};
