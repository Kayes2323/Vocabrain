import type { SpeakingSection, WritingSection } from '../../model';

/**
 * Mino Academic Mock Test 20 — Writing and Speaking. Original tasks in the format and difficulty of IELTS Academic. Task 1 data is illustrative and written for practice. Not Cambridge material.
 */
export const mock20Writing: WritingSection = {
  skill: 'writing',
  timeLimitMinutes: 60,
  tasks: [
    {
      id: 'w1',
      task: 1,
      prompt:
        'The graph below shows the birth rate in two countries between 1990 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data: {
        caption: 'Birth rate in Country A and Country B, 1990–2020 (births per 1,000 people)',
        headers: ['Year', 'Country A', 'Country B'],
        rows: [
          ['1990', '18.5', '12.4'],
          ['2000', '16.2', '11.8'],
          ['2010', '14.0', '12.9'],
          ['2020', '12.1', '14.3'],
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
        'Some people think that the best way to reduce traffic congestion is to build more roads. Others believe that improving public transport is a better solution.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.',
      minWords: 250,
      suggestedMinutes: 40,
    },
  ],
};

export const mock20Speaking: SpeakingSection = {
  skill: 'speaking',
  parts: [
    {
      id: 's1',
      part: 1,
      topic: 'Colours',
      questions: [
        'What is your favourite colour? Why?',
        'What colour do you like to wear? Why?',
        'Do you think colours affect people\'s feelings? Why or why not?',
        'What colour is the room you live in? Do you like it?',
        'Do you think men and women like different colours? Why or why not?',
        'What colour would you choose for a new car? Why?',
        'Has your favourite colour changed since you were a child? Why or why not?',
        'Do you think the colour of a building is important? Why or why not?',
      ],
    },
    {
      id: 's2',
      part: 2,
      topic: 'A painting or photograph you like',
      questions: [],
      cueCard: {
        task: 'Describe a painting or a photograph you like.',
        points: ['what the painting or photograph is', 'where you saw it', 'what it shows'],
        closing: 'and explain why you like it.',
      },
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      id: 's3',
      part: 3,
      topic: 'Art and society',
      questions: [
        'Why do you think art is important in society?',
        'Do you think the government should spend money on art? Why or why not?',
        'Should children learn art at school? Why or why not?',
        'How has art changed in recent years?',
        'Do you think photographs are as valuable as paintings? Why or why not?',
        'What do you think art will be like in the future? Why?',
      ],
    },
  ],
};
