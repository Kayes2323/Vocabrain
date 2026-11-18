import type { SpeakingSection, WritingSection } from '../../model';

/**
 * Mino Academic Mock Test 12 — Writing and Speaking. Original tasks in the format and difficulty of IELTS Academic. Task 1 data is illustrative and written for practice. Not Cambridge material.
 */
export const mock12Writing: WritingSection = {
  skill: 'writing',
  timeLimitMinutes: 60,
  tasks: [
    {
      id: 'w1',
      task: 1,
      prompt:
        'The bar chart below shows the percentage of household energy use from different sources in 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data: {
        caption: 'Household energy use by source, 2010 and 2020',
        headers: ['Energy source', '2010', '2020'],
        rows: [
          ['Gas', '45%', '35%'],
          ['Electricity', '25%', '30%'],
          ['Oil', '15%', '10%'],
          ['Coal', '10%', '5%'],
          ['Renewable sources', '5%', '20%'],
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
        'Tourism brings money to a country, but it can also damage the places that tourists visit. Some people think the benefits of tourism are greater than the damage it causes, while others think the damage is greater than the benefits.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.',
      minWords: 250,
      suggestedMinutes: 40,
    },
  ],
};

export const mock12Speaking: SpeakingSection = {
  skill: 'speaking',
  parts: [
    {
      id: 's1',
      part: 1,
      topic: 'Weekends',
      questions: [
        'Do you usually have free time at the weekend? What do you usually do?',
        'Do you prefer to stay at home at the weekend or go out? Why?',
        'What did you do last weekend?',
        'Do you like weekends more than weekdays? Why or why not?',
        'Do you usually spend your weekends with your family or with your friends? Why?',
        'What is your favourite thing to do at the weekend? Why?',
        'Do you think weekends are long enough? Why or why not?',
        'Has the way you spend your weekends changed since you were a child? Why or why not?',
      ],
    },
    {
      id: 's2',
      part: 2,
      topic: 'A sport you like watching',
      questions: [],
      cueCard: {
        task: 'Describe a sport you like watching.',
        points: ['what the sport is', 'where and when you watch it', 'who you watch it with'],
        closing: 'and explain why you enjoy watching this sport.',
      },
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      id: 's3',
      part: 3,
      topic: 'Sport and health',
      questions: [
        'Why do you think some people like watching sport more than playing it?',
        'Do you think watching sport is good for people\'s health? Why or why not?',
        'Should schools spend more time on sport? Why or why not?',
        'How can governments encourage more people to do sport?',
        'Do you think professional sportspeople are good role models for young people? Why or why not?',
        'Will people in the future do more sport, or less sport? Why?',
      ],
    },
  ],
};
