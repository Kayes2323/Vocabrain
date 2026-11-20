import type { SpeakingSection, WritingSection } from '../../model';

/**
 * Mino Academic Mock Test 21 — Writing and Speaking. Original tasks in the format and difficulty of IELTS Academic. Task 1 data is illustrative and written for practice. Not Cambridge material.
 */
export const mock21Writing: WritingSection = {
  skill: 'writing',
  timeLimitMinutes: 60,
  tasks: [
    {
      id: 'w1',
      task: 1,
      prompt:
        'The graph below shows the number of tourists visiting a city in summer and in winter between 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data: {
        caption: 'Tourists visiting the city in summer and in winter, 2010–2020 (thousands)',
        headers: ['Year', 'Summer', 'Winter'],
        rows: [
          ['2010', '420', '180'],
          ['2013', '480', '210'],
          ['2016', '550', '260'],
          ['2020', '610', '340'],
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
        'Some people think that young people should spend their free time doing volunteer work. Others believe that young people should use their free time to relax and enjoy themselves.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.',
      minWords: 250,
      suggestedMinutes: 40,
    },
  ],
};

export const mock21Speaking: SpeakingSection = {
  skill: 'speaking',
  parts: [
    {
      id: 's1',
      part: 1,
      topic: 'Helping people',
      questions: [
        'Do you often help other people? Why or why not?',
        'Who do you usually help? Why?',
        'When was the last time you helped someone? What did you do?',
        'Do you like helping people? Why or why not?',
        'Do people in your country help strangers? Why or why not?',
        'What kind of help do old people need most? Why?',
        'Did your parents teach you to help others? How?',
        'Do you think children should learn to help others at school? Why or why not?',
      ],
    },
    {
      id: 's2',
      part: 2,
      topic: 'A time when you helped someone',
      questions: [],
      cueCard: {
        task: 'Describe a time when you helped someone.',
        points: ['who you helped', 'what you did', 'when it happened'],
        closing: 'and explain how you felt.',
      },
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      id: 's3',
      part: 3,
      topic: 'Helping others in society',
      questions: [
        'Why do you think some people like to help others?',
        'Do you think the government should encourage people to volunteer? Why or why not?',
        'Should rich people give money to help poor people? Why or why not?',
        'How can schools encourage children to help others?',
        'Do you think people help each other more today than in the past? Why or why not?',
        'What do you think society would be like if nobody helped anyone? Why?',
      ],
    },
  ],
};
