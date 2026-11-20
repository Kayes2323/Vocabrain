import type { SpeakingSection, WritingSection } from '../../model';

/**
 * Mino Academic Mock Test 15 — Writing and Speaking. Original tasks in the format and difficulty of IELTS Academic. Task 1 data is illustrative and written for practice. Not Cambridge material.
 */
export const mock15Writing: WritingSection = {
  skill: 'writing',
  timeLimitMinutes: 60,
  tasks: [
    {
      id: 'w1',
      task: 1,
      prompt:
        'The chart below shows the number of visitors to four museums in a city in 2015 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data: {
        caption: 'Visitors to four museums in a city, 2015 and 2025 (thousands of visitors per year)',
        headers: ['Museum', '2015', '2025'],
        rows: [
          ['History Museum', '120', '180'],
          ['Art Gallery', '90', '110'],
          ['Science Museum', '150', '210'],
          ['War Museum', '60', '45'],
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
        'In many countries, young people are leaving the countryside to live and work in cities.\n\nWhat are the causes of this? What solutions can you suggest?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.',
      minWords: 250,
      suggestedMinutes: 40,
    },
  ],
};

export const mock15Speaking: SpeakingSection = {
  skill: 'speaking',
  parts: [
    {
      id: 's1',
      part: 1,
      topic: 'Work and study',
      questions: [
        'Do you work or are you a student? What do you do?',
        'What do you like most about your work or your studies? Why?',
        'What is the most difficult part of your work or your studies?',
        'Do you prefer to work or study in the morning or in the evening? Why?',
        'What job would you like to have in the future? Why?',
        'Do you think it is better to work in an office or from home? Why?',
        'What subjects did you enjoy most at school? Why?',
        'Do you think young people today work harder than young people in the past? Why or why not?',
      ],
    },
    {
      id: 's2',
      part: 2,
      topic: 'A job you would like to have',
      questions: [],
      cueCard: {
        task: 'Describe a job you would like to have.',
        points: ['what the job is', 'what you would do in the job', 'what skills you would need for the job'],
        closing: 'and explain why you would like to have this job.',
      },
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      id: 's3',
      part: 3,
      topic: 'Jobs of the future',
      questions: [
        'How do you think jobs will change in the future?',
        'What jobs do you think will be most popular in the future? Why?',
        'Do you think robots and computers will take over many jobs? Why or why not?',
        'What skills will young people need for the jobs of the future?',
        'Do you think people will need to change jobs more often in the future? Why or why not?',
        'Should schools teach students about jobs of the future? Why or why not?',
      ],
    },
  ],
};
