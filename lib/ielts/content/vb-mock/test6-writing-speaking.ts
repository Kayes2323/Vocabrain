import type { SpeakingSection, WritingSection } from '../../model';

/**
 * Mino Academic Mock Test 6 — Writing and Speaking. Original tasks in the format and difficulty of IELTS Academic. Task 1 data is illustrative and written for practice. Not Cambridge material.
 */
export const mock6Writing: WritingSection = {
  skill: 'writing',
  timeLimitMinutes: 60,
  tasks: [
    {
      id: 'w1',
      task: 1,
      prompt:
        'The two pie charts below show the sources of energy used in the country of Westland in 2000 and in 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data: {
        caption: 'Sources of energy in Westland, 2000 and 2020 (% of all energy)',
        headers: ['Energy source', '2000', '2020'],
        rows: [
          ['Coal', '40%', '25%'],
          ['Gas', '25%', '30%'],
          ['Oil', '20%', '10%'],
          ['Nuclear power', '10%', '15%'],
          ['Renewable energy', '5%', '20%'],
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
        'Some people think that cars should be banned from city centres. Others believe that this would cause more problems than it solves.\n\nTo what extent do you agree or disagree with banning cars from city centres?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.',
      minWords: 250,
      suggestedMinutes: 40,
    },
  ],
};

export const mock6Speaking: SpeakingSection = {
  skill: 'speaking',
  parts: [
    {
      id: 's1',
      part: 1,
      topic: 'Daily routine',
      questions: [
        'What time do you usually get up in the morning?',
        'What do you usually have for breakfast?',
        'What do you usually do in the morning?',
        'What time do you usually go to bed?',
        'Do you have the same routine every day, or does it change?',
        'What part of your daily routine do you enjoy most, and why?',
        'Is there anything in your daily routine you would like to change?',
        'How has your daily routine changed in recent years?',
      ],
    },
    {
      id: 's2',
      part: 2,
      topic: 'A gift you received',
      questions: [],
      cueCard: {
        task: 'Describe a gift you received.',
        points: ['what the gift was', 'who gave it to you', 'when you received it'],
        closing: 'and explain why this gift was special to you.',
      },
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      id: 's3',
      part: 3,
      topic: 'Gift-giving customs',
      questions: [
        'What kinds of gifts do people in your country usually give on birthdays?',
        'Is it better to give money as a gift, or to choose a gift yourself? Why?',
        'Do you think people spend too much money on gifts nowadays? Why or why not?',
        'How have gift-giving customs changed in your country in recent years?',
        'Is it important to give expensive gifts to show that you care? Why or why not?',
        'Do you think giving gifts will become less important in the future? Why or why not?',
      ],
    },
  ],
};
