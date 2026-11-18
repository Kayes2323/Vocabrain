import type { SpeakingSection, WritingSection } from '../../model';

/**
 * Mino Academic Mock Test 5 — Writing and Speaking. Original tasks in the format and difficulty of IELTS Academic. Task 1 data is illustrative and written for practice. Not Cambridge material.
 */
export const mock5Writing: WritingSection = {
  skill: 'writing',
  timeLimitMinutes: 60,
  tasks: [
    {
      id: 'w1',
      task: 1,
      prompt:
        'The line graph below shows the number of tourist arrivals in the town of Millford over a five-year period, from 2019 to 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data: {
        caption: 'Tourist arrivals in Millford, 2019–2023 (thousands of visitors)',
        headers: ['Year', '2019', '2020', '2021', '2022', '2023'],
        rows: [
          ['Visitors from within the country', '120', '45', '60', '110', '150'],
          ['Visitors from overseas', '80', '20', '35', '70', '110'],
          ['Total visitors', '200', '65', '95', '180', '260'],
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
        'Some people think that young people should go to university after leaving school. Others believe that it is better for them to start work straight away.\n\nDiscuss both these views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.',
      minWords: 250,
      suggestedMinutes: 40,
    },
  ],
};

export const mock5Speaking: SpeakingSection = {
  skill: 'speaking',
  parts: [
    {
      id: 's1',
      part: 1,
      topic: 'Home and your town',
      questions: [
        'Do you live in a house or a flat?',
        'What do you like most about your home?',
        'Is there anything you would like to change about your home?',
        'What is your favourite room in your home, and why?',
        'Do you think your town is a good place to live?',
        'What do you like most about your town?',
        'Is there anything you dislike about your town?',
        'How has your town changed in recent years?',
      ],
    },
    {
      id: 's2',
      part: 2,
      topic: 'A book you have enjoyed',
      questions: [],
      cueCard: {
        task: 'Describe a book you have enjoyed.',
        points: ['what the book is about', 'when you read it', 'why you enjoyed it'],
        closing: 'and explain what you learned from reading it.',
      },
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      id: 's3',
      part: 3,
      topic: 'Reading habits',
      questions: [
        'Do people in your country read more or less than they did in the past? Why?',
        'What are the main benefits of reading books, compared with watching television?',
        'Do you think children should be encouraged to read more? How?',
        'Is it better to read books on paper or on a screen? Why?',
        'How has the internet changed the way people read?',
        'Do you think people will still read printed books in the future? Why or why not?',
      ],
    },
  ],
};
