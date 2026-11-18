import type { SpeakingSection, WritingSection } from '../../model';

/**
 * Mino Academic Mock Test 10 — Writing and Speaking. Original tasks in the format and difficulty of IELTS Academic. Task 1 data is illustrative and written for practice. Not Cambridge material.
 */
export const mock10Writing: WritingSection = {
  skill: 'writing',
  timeLimitMinutes: 60,
  tasks: [
    {
      id: 'w1',
      task: 1,
      prompt:
        'The line graph below shows the population of two cities, Riverton and Lakeside, from 1990 to 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data: {
        caption: 'Population of Riverton and Lakeside, 1990–2020 (millions of people)',
        headers: ['Year', 'Riverton', 'Lakeside'],
        rows: [
          ['1990', '0.8', '1.2'],
          ['1995', '1.0', '1.3'],
          ['2000', '1.4', '1.4'],
          ['2005', '1.9', '1.5'],
          ['2010', '2.4', '1.7'],
          ['2015', '2.8', '1.8'],
          ['2020', '3.2', '2.0'],
        ],
        note: 'Illustrative data written for practice.',
      },
      minWords: 150,
      suggestedMinutes: 20,
    },
    {
      id: 'w2',
      task: 2,
      prompt:
        'Some people believe that governments should spend a lot of money on space exploration. Others think that this money should be spent on more important things on Earth, such as health care and education.\n\nDiscuss both these views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.',
      minWords: 250,
      suggestedMinutes: 40,
    },
  ],
};

export const mock10Speaking: SpeakingSection = {
  skill: 'speaking',
  parts: [
    {
      id: 's1',
      part: 1,
      topic: 'Technology in daily life',
      questions: [
        'What kinds of technology do you use every day?',
        'How has technology changed the way you communicate with friends and family?',
        'Do you use your phone more for work or for entertainment? Why?',
        'What is the most useful app on your phone? Why?',
        'Do you think people spend too much time on their phones? Why or why not?',
        'How do you usually learn to use a new piece of technology?',
        'What technology would you find it hardest to live without? Why?',
        'Do you think older people find new technology difficult to use? Why or why not?',
      ],
    },
    {
      id: 's2',
      part: 2,
      topic: 'An invention that changed people\'s lives',
      questions: [],
      cueCard: {
        task: 'Describe an invention that changed people\'s lives.',
        points: ['what the invention is', 'when it was invented', 'how people used it'],
        closing: 'and explain why this invention changed people\'s lives.',
      },
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      id: 's3',
      part: 3,
      topic: 'Technology and society',
      questions: [
        'How has technology changed the way people work in your country?',
        'Do you think technology has made people\'s lives better or worse overall? Why?',
        'Should children be taught how to use technology at school? Why or why not?',
        'What problems can new technology cause in society?',
        'Do you think robots will replace many jobs in the future? Why or why not?',
        'How can governments help people to use new technology safely?',
      ],
    },
  ],
};
