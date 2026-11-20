import type { SpeakingSection, WritingSection } from '../../model';

/**
 * Mino Academic Mock Test 17 — Writing and Speaking. Original tasks in the format and difficulty of IELTS Academic. Task 1 data is illustrative and written for practice. Not Cambridge material.
 */
export const mock17Writing: WritingSection = {
  skill: 'writing',
  timeLimitMinutes: 60,
  tasks: [
    {
      id: 'w1',
      task: 1,
      prompt:
        'The table below shows the percentage of journeys made by different kinds of public transport in two cities in 2024. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data: {
        caption: 'Public transport in Greentown and Lakeview, 2024 (per cent of journeys)',
        headers: ['Mode of transport', 'Greentown', 'Lakeview'],
        rows: [
          ['Bus', '45 per cent', '30 per cent'],
          ['Train', '25 per cent', '40 per cent'],
          ['Tram', '20 per cent', '15 per cent'],
          ['Bicycle', '10 per cent', '15 per cent'],
        ],
        note: 'Illustrative table written for practice.',
      },
      minWords: 150,
      suggestedMinutes: 20,
    },
    {
      id: 'w2',
      task: 2,
      prompt:
        'Some people think that the government should provide free healthcare for everyone. To what extent do you agree or disagree with this view?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.',
      minWords: 250,
      suggestedMinutes: 40,
    },
  ],
};

export const mock17Speaking: SpeakingSection = {
  skill: 'speaking',
  parts: [
    {
      id: 's1',
      part: 1,
      topic: 'Holidays',
      questions: [
        'Do you like holidays? Why or why not?',
        'Where do you usually go on holiday? Why?',
        'Do you prefer to go on holiday with your family or with your friends? Why?',
        'What do you usually do on holiday?',
        'How often do you go on holiday?',
        'Do you think holidays are important? Why or why not?',
        'What kind of holiday would you like to take in the future? Why?',
        'Do you prefer holidays in your own country or holidays in other countries? Why?',
      ],
    },
    {
      id: 's2',
      part: 2,
      topic: 'A holiday you remember',
      questions: [],
      cueCard: {
        task: 'Describe a holiday you remember.',
        points: ['where you went', 'who you went with', 'what you did there'],
        closing: 'and explain why you remember this holiday.',
      },
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      id: 's3',
      part: 3,
      topic: 'Work-life balance',
      questions: [
        'Why is it important for people to have a good work-life balance?',
        'Do you think people today have a good work-life balance? Why or why not?',
        'What can employers do to help their workers have a better work-life balance?',
        'How can holidays help people to have a better work-life balance?',
        'Do you think young people and older people have different ideas about work-life balance? Why or why not?',
        'What will work-life balance be like in the future? Why?',
      ],
    },
  ],
};
