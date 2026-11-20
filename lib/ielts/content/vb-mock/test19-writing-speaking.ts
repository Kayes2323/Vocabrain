import type { SpeakingSection, WritingSection } from '../../model';

/**
 * Mino Academic Mock Test 19 — Writing and Speaking. Original tasks in the format and difficulty of IELTS Academic. Task 1 data is illustrative and written for practice. Not Cambridge material.
 */
export const mock19Writing: WritingSection = {
  skill: 'writing',
  timeLimitMinutes: 60,
  tasks: [
    {
      id: 'w1',
      task: 1,
      prompt:
        'The chart below shows energy consumption by sector in a country in 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data: {
        caption: 'Energy consumption by sector, 2010 and 2020 (per cent of total energy use)',
        headers: ['Sector', '2010', '2020'],
        rows: [
          ['Industry', '35 per cent', '28 per cent'],
          ['Transport', '25 per cent', '30 per cent'],
          ['Homes', '22 per cent', '20 per cent'],
          ['Services', '18 per cent', '22 per cent'],
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
        'Some people believe that rich people should pay more tax than poor people. To what extent do you agree or disagree with this opinion?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.',
      minWords: 250,
      suggestedMinutes: 40,
    },
  ],
};

export const mock19Speaking: SpeakingSection = {
  skill: 'speaking',
  parts: [
    {
      id: 's1',
      part: 1,
      topic: 'Health and fitness',
      questions: [
        'Do you think you are a healthy person? Why or why not?',
        'What do you do to stay healthy?',
        'How often do you exercise?',
        'What kind of exercise do you like? Why?',
        'Do you think people in your country are healthy? Why or why not?',
        'What do you usually eat for breakfast?',
        'Do you think fast food is popular in your country? Why or why not?',
        'Has your lifestyle changed in recent years? Why or why not?',
      ],
    },
    {
      id: 's2',
      part: 2,
      topic: 'A healthy habit you have',
      questions: [],
      cueCard: {
        task: 'Describe a healthy habit you have.',
        points: ['what the habit is', 'when you started this habit', 'how you keep this habit'],
        closing: 'and explain why this habit is good for you.',
      },
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      id: 's3',
      part: 3,
      topic: 'Health and lifestyle',
      questions: [
        'Why do some people find it difficult to stay healthy?',
        'Do you think governments should do more to help people stay healthy? Why or why not?',
        'How has the way people exercise changed in recent years?',
        'Do you think children today are less healthy than children in the past? Why or why not?',
        'Should schools teach children about healthy eating? Why or why not?',
        'What do you think will change about the way people live in the future? Why?',
      ],
    },
  ],
};
