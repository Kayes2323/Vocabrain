import type { SpeakingSection, WritingSection } from '../../model';

/**
 * Mino Academic Mock Test 2 — Writing and Speaking. Original tasks in
 * the format and difficulty of IELTS Academic. Task 1 data is illustrative and
 * written for practice. Not Cambridge material.
 */
export const mock2Writing: WritingSection = {
  skill: 'writing',
  timeLimitMinutes: 60,
  tasks: [
    {
      id: 'w1',
      task: 1,
      prompt:
        'The table below shows how people in four different age groups spent an average 24-hour day on seven kinds of activity in one country. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data: {
        caption: 'Average time spent on daily activities, by age group (hours per day)',
        headers: ['Activity', 'Aged 16-24', 'Aged 25-44', 'Aged 45-64', 'Aged 65 and over'],
        rows: [
          ['Sleep', '8.5', '7.5', '7.5', '8.5'],
          ['Paid work or study', '5.5', '7.0', '6.0', '0.5'],
          ['Housework and caring', '1.0', '2.5', '2.0', '3.0'],
          ['Screen-based leisure', '3.5', '2.0', '2.5', '4.0'],
          ['Exercise and sport', '1.5', '0.5', '0.5', '0.5'],
          ['Socialising and hobbies', '2.0', '1.0', '1.5', '2.5'],
          ['Eating, travel and other', '2.0', '3.5', '4.0', '5.0'],
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
        "Some people believe that universities should concentrate on teaching practical skills that prepare students for particular jobs. Others believe that the main purpose of a university is to give students a broad academic education, whatever career they choose later.\n\nDiscuss both these views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      suggestedMinutes: 40,
    },
  ],
};

export const mock2Speaking: SpeakingSection = {
  skill: 'speaking',
  parts: [
    {
      id: 's1',
      part: 1,
      topic: 'Hometown · Cooking',
      questions: [
        'Where is your hometown?',
        'What do you like most about living there?',
        'Has your hometown changed much since you were a child?',
        'Would you recommend your hometown to visitors? Why, or why not?',
        'Do you often cook at home?',
        'Who taught you how to cook?',
        'Do you prefer eating at home or eating in restaurants?',
        'Is there a dish you would like to learn to cook in the future?',
      ],
    },
    {
      id: 's2',
      part: 2,
      topic: 'A place where you go to relax',
      questions: [],
      cueCard: {
        task: 'Describe a place where you like to go when you want to relax.',
        points: ['where the place is', 'how often you go there', 'what you do there'],
        closing: 'and explain why this place helps you to relax.',
      },
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      id: 's3',
      part: 3,
      topic: 'Relaxation and public spaces',
      questions: [
        'What kinds of places do people in your country usually go to in order to relax?',
        'Do you think people prefer to relax alone or with other people? Why?',
        'Why do some people find it hard to relax, even when they have free time?',
        'How important is it for a city to have parks and other green spaces?',
        'Some people say that modern technology has made it harder for us to switch off. What is your opinion?',
        'How do you think the way people spend their free time will change over the next few decades?',
      ],
    },
  ],
};
