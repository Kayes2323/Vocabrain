import type { SpeakingSection, WritingSection } from '../../model';

/**
 * Mino Academic Mock Test 22 — Writing and Speaking. Original tasks in the format and difficulty of IELTS Academic. Task 1 data is illustrative and written for practice. Not Cambridge material.
 */
export const mock22Writing: WritingSection = {
  skill: 'writing',
  timeLimitMinutes: 60,
  tasks: [
    {
      id: 'w1',
      task: 1,
      prompt:
        'The chart below shows the number of visitors to three museums in a city in 2015 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data: {
        caption: 'Visitors to three museums in a city, 2015 and 2025 (thousands)',
        headers: ['Museum', '2015', '2025'],
        rows: [
          ['History Museum', '120', '210'],
          ['Art Gallery', '90', '160'],
          ['Science Museum', '150', '260'],
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
        'Some people think that children should start learning a foreign language at primary school. Others believe that it is better for children to start learning a foreign language when they are older.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.',
      minWords: 250,
      suggestedMinutes: 40,
    },
  ],
};

export const mock22Speaking: SpeakingSection = {
  skill: 'speaking',
  parts: [
    {
      id: 's1',
      part: 1,
      topic: 'Learning new things',
      questions: [
        'Do you enjoy learning new things? Why or why not?',
        'What is the last new thing you learned? How did you learn it?',
        'Do you prefer to learn new things alone or with other people? Why?',
        'Is it easy or difficult for you to learn a new skill? Why?',
        'What new skill would you like to learn in the future? Why?',
        'Do you think old people can learn new things easily? Why or why not?',
        'How do people in your country usually learn new skills? Why?',
        'Did your school teach you useful skills for life? Why or why not?',
      ],
    },
    {
      id: 's2',
      part: 2,
      topic: 'A skill you taught someone',
      questions: [],
      cueCard: {
        task: 'Describe a skill you taught someone.',
        points: ['who you taught', 'what the skill was', 'how you taught them'],
        closing: 'and explain how you felt.',
      },
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      id: 's3',
      part: 3,
      topic: 'Teaching others',
      questions: [
        'Why do you think some people enjoy teaching others?',
        'Do you think everyone can be a good teacher? Why or why not?',
        'What qualities should a good teacher have? Why?',
        'Should parents teach their children practical skills at home? Why or why not?',
        'Do you think people learn better from teachers or from the internet? Why?',
        'How has the way people learn new skills changed in recent years? Why?',
      ],
    },
  ],
};
