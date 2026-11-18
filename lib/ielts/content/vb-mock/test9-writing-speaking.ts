import type { SpeakingSection, WritingSection } from '../../model';

/**
 * Mino Academic Mock Test 9 — Writing and Speaking. Original tasks in the format and difficulty of IELTS Academic. Task 1 data is illustrative and written for practice. Not Cambridge material.
 */
export const mock9Writing: WritingSection = {
  skill: 'writing',
  timeLimitMinutes: 60,
  tasks: [
    {
      id: 'w1',
      task: 1,
      prompt:
        'The diagram below shows how paper is recycled. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data: {
        caption: 'How paper is recycled (stages of the process)',
        headers: ['Stage', 'What happens'],
        rows: [
          ['1', 'Used paper is collected from homes, schools and offices.'],
          ['2', 'The paper is sorted, and things that are not paper, such as plastic and metal, are removed.'],
          ['3', 'The paper is mixed with water and chemicals to make pulp.'],
          ['4', 'The pulp is cleaned, and the ink is removed.'],
          ['5', 'The clean pulp is dried and pressed to make new paper.'],
          ['6', 'The new paper is rolled into large rolls and sent to factories to be made into newspapers, books and boxes.'],
        ],
        note: 'Illustrative diagram description written for practice.',
      },
      minWords: 150,
      suggestedMinutes: 20,
    },
    {
      id: 'w2',
      task: 2,
      prompt:
        'Some people believe that governments should spend more money on public transport than on building new roads for private cars. Others think that improving roads for cars is more important.\n\nDiscuss both these views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.',
      minWords: 250,
      suggestedMinutes: 40,
    },
  ],
};

export const mock9Speaking: SpeakingSection = {
  skill: 'speaking',
  parts: [
    {
      id: 's1',
      part: 1,
      topic: 'Family',
      questions: [
        'How many people are there in your family?',
        'Do you live with your family? Why or why not?',
        'Who are you closest to in your family? Why?',
        'What do you usually do together as a family?',
        'Did you spend a lot of time with your family when you were a child?',
        'Do you think families are smaller now than they were in the past? Why?',
        'What is the most important thing in family life, in your opinion?',
        'Would you like to have a large family in the future? Why or why not?',
      ],
    },
    {
      id: 's2',
      part: 2,
      topic: 'A meal you enjoyed',
      questions: [],
      cueCard: {
        task: 'Describe a meal you enjoyed.',
        points: ['where and when you had this meal', 'who you had the meal with', 'what you ate'],
        closing: 'and explain why you enjoyed this meal.',
      },
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      id: 's3',
      part: 3,
      topic: 'Food and health',
      questions: [
        'Why do you think some people eat unhealthy food even when they know it is bad for them?',
        'Do you think schools should teach children about healthy eating? Why or why not?',
        'Should governments try to make people eat more healthily? How?',
        'Is fast food popular in your country? Why do you think this is?',
        'Do you think people eat more healthily now than they did in the past? Why or why not?',
        'How can people be encouraged to cook at home more often?',
      ],
    },
  ],
};
