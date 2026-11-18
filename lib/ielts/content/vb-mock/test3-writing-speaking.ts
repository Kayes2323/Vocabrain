import type { SpeakingSection, WritingSection } from '../../model';

/**
 * Mino Academic Mock Test 3 — Writing and Speaking. Original tasks in the format and difficulty of IELTS Academic. Task 1 data is illustrative and written for practice. Not Cambridge material. Follows the Cambridge 19 Test 1 format (same timing and task types).
 */
export const mock3Writing: WritingSection = {
  skill: 'writing',
  timeLimitMinutes: 60,
  tasks: [
    {
      id: 'w1',
      task: 1,
      prompt:
        'The table below shows the average amount of money spent each month on four categories by three different types of household in one country. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data: {
        caption: 'Average monthly household spending, by household type (US dollars)',
        headers: ['Category', 'Single-person household', 'Couple with no children', 'Family with children'],
        rows: [
          ['Food and groceries', '320', '480', '650'],
          ['Housing and utilities', '950', '1,100', '1,350'],
          ['Transport', '180', '260', '380'],
          ['Leisure and entertainment', '150', '220', '310'],
          ['Total', '1,600', '2,060', '2,690'],
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
        "Some people believe that working from home is better for employees and employers than working in an office. Others believe that working in an office is more productive and better for people's careers.\n\nDiscuss both these views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      suggestedMinutes: 40,
    },
  ],
};

export const mock3Speaking: SpeakingSection = {
  skill: 'speaking',
  parts: [
    {
      id: 's1',
      part: 1,
      topic: 'Weather · Reading',
      questions: [
        'What kind of weather do you like most?',
        'Does the weather affect your mood or your plans?',
        'Which season do you enjoy most in your country, and why?',
        'Do you prefer hot weather or cold weather?',
        'Do you enjoy reading?',
        'What kind of books do you usually read?',
        'Did you read much when you were a child?',
        'Do you prefer reading paper books or reading on a screen?',
      ],
    },
    {
      id: 's2',
      part: 2,
      topic: 'A skill you would like to learn',
      questions: [],
      cueCard: {
        task: 'Describe a skill you would like to learn.',
        points: ['what the skill is', 'how you would learn it', 'why you want to learn it'],
        closing: 'and explain how learning this skill would help you in the future.',
      },
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      id: 's3',
      part: 3,
      topic: 'Learning new skills',
      questions: [
        'Why do you think some adults find it difficult to learn new skills?',
        'Is it easier for children or for adults to learn a new skill? Why?',
        'How important is it for people to keep learning throughout their working lives?',
        'Do you think schools should teach more practical skills, such as cooking or managing money?',
        'Some people say that learning online is just as effective as learning in a classroom. What is your opinion?',
        'How do you think the skills people need for work will change in the future?',
      ],
    },
  ],
};
