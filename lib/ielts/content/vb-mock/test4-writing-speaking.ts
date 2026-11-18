import type { SpeakingSection, WritingSection } from '../../model';

/**
 * Mino Academic Mock Test 4 — Writing and Speaking. Original tasks in the format and difficulty of IELTS Academic. Task 1 data is illustrative and written for practice. Not Cambridge material.
 */
export const mock4Writing: WritingSection = {
  skill: 'writing',
  timeLimitMinutes: 60,
  tasks: [
    {
      id: 'w1',
      task: 1,
      prompt:
        'The bar chart below shows the number of people taking part in three sports (swimming, cycling and running) in one town in 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data: {
        caption: 'Number of people taking part in three sports in one town, 2010 and 2020',
        headers: ['Sport', '2010', '2020'],
        rows: [
          ['Swimming', '1,200', '1,650'],
          ['Cycling', '800', '1,900'],
          ['Running', '1,500', '1,350'],
          ['Total', '3,500', '4,900'],
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
        'Some people think that all school children should learn to play a musical instrument. Others believe that music lessons should be optional, and children should be free to choose other activities.\n\nDiscuss both these views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.',
      minWords: 250,
      suggestedMinutes: 40,
    },
  ],
};

export const mock4Speaking: SpeakingSection = {
  skill: 'speaking',
  parts: [
    {
      id: 's1',
      part: 1,
      topic: 'Food · Travel',
      questions: [
        'What kind of food do you enjoy eating most?',
        'Do you prefer cooking at home or eating out, and why?',
        'Is there a traditional dish in your country that you like?',
        'Has your taste in food changed since you were a child?',
        'Do you enjoy travelling?',
        'What kind of places do you like to visit when you travel?',
        'Do you prefer to travel alone or with other people?',
        'How do you usually prepare for a trip?',
      ],
    },
    {
      id: 's2',
      part: 2,
      topic: 'A place you would like to visit',
      questions: [],
      cueCard: {
        task: 'Describe a place you would like to visit.',
        points: ['where the place is', 'what you would do there', 'who you would go with'],
        closing: 'and explain why you would like to visit this place.',
      },
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      id: 's3',
      part: 3,
      topic: 'Travel and tourism',
      questions: [
        'What are the main benefits of tourism for a country?',
        'Do you think tourism can cause problems for local people? Why or why not?',
        'Is it better to travel within your own country or to travel abroad?',
        'How has tourism changed in your country in recent years?',
        'What can be done to reduce the negative effects of tourism on the environment?',
        'Do you think people will travel more or less in the future? Why?',
      ],
    },
  ],
};
