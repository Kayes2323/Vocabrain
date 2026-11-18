import type { SpeakingSection, WritingSection } from '../../model';

/**
 * Mino Academic Mock Test 7 — Writing and Speaking. Original tasks in the format and difficulty of IELTS Academic. Task 1 data is illustrative and written for practice. Not Cambridge material.
 */
export const mock7Writing: WritingSection = {
  skill: 'writing',
  timeLimitMinutes: 60,
  tasks: [
    {
      id: 'w1',
      task: 1,
      prompt:
        'The table below shows the number of students at a university in three departments in 2015 and in 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data: {
        caption: 'Number of students at a university, by department, 2015 and 2025',
        headers: ['Department', '2015', '2025'],
        rows: [
          ['Engineering', '1,200', '1,850'],
          ['Business', '950', '1,400'],
          ['Medicine', '600', '720'],
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
        'Some people think that zoos should be closed because keeping wild animals in cages is cruel. Others believe that zoos play an important part in protecting animals and in educating people.\n\nDiscuss both these views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.',
      minWords: 250,
      suggestedMinutes: 40,
    },
  ],
};

export const mock7Speaking: SpeakingSection = {
  skill: 'speaking',
  parts: [
    {
      id: 's1',
      part: 1,
      topic: 'Sports and exercise',
      questions: [
        'Do you like doing exercise? Why or why not?',
        'What kind of exercise do you usually do?',
        'How often do you do exercise?',
        'Did you do much exercise when you were a child?',
        'What sports are popular in your country?',
        'Do you prefer to exercise alone or with other people? Why?',
        'Do you think schools should give children more time for sport? Why or why not?',
        'Is there a sport you would like to try in the future? Why?',
      ],
    },
    {
      id: 's2',
      part: 2,
      topic: 'A teacher who influenced you',
      questions: [],
      cueCard: {
        task: 'Describe a teacher who influenced you.',
        points: ['who the teacher was', 'what subject they taught', 'when you were taught by them'],
        closing: 'and explain how this teacher influenced you.',
      },
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      id: 's3',
      part: 3,
      topic: 'Education',
      questions: [
        'What makes a good teacher, in your opinion?',
        'Do you think teachers have become more important or less important in recent years? Why?',
        'Should teachers be paid more than they are now? Why or why not?',
        'How has education changed in your country in recent years?',
        'Is it better for children to learn from teachers, or to learn by themselves on the internet? Why?',
        'Do you think the education system will change much in the future? How?',
      ],
    },
  ],
};
