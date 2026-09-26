import type { SpeakingSection, WritingSection } from '../../model';

/**
 * Vocab Brain Academic Mock Test 1 — Writing and Speaking. Original tasks in
 * the format and difficulty of IELTS Academic. Task 1 data is illustrative and
 * written for practice. Not Cambridge material.
 */
export const mock1Writing: WritingSection = {
  skill: 'writing',
  timeLimitMinutes: 60,
  tasks: [
    {
      id: 'w1',
      task: 1,
      prompt:
        'The table below shows how households in one country spent their money on five categories in 1995, 2010 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data: {
        caption: 'Average household spending by category (% of total spending)',
        headers: ['Category', '1995', '2010', '2025'],
        rows: [
          ['Housing', '24%', '29%', '34%'],
          ['Food', '31%', '24%', '18%'],
          ['Transport', '14%', '17%', '16%'],
          ['Leisure', '9%', '12%', '10%'],
          ['Communication', '2%', '6%', '11%'],
          ['Other', '20%', '12%', '11%'],
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
        'In many countries, young people now spend several years studying or working abroad before returning home.\n\nDo the advantages of this trend outweigh the disadvantages for their home countries?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.',
      minWords: 250,
      suggestedMinutes: 40,
    },
  ],
};

export const mock1Speaking: SpeakingSection = {
  skill: 'speaking',
  parts: [
    {
      id: 's1',
      part: 1,
      topic: 'Work or studies · Keeping in touch',
      questions: [
        'Do you work or are you a student?',
        'What do you enjoy most about your work or studies?',
        'Is there anything you would like to change about it?',
        'How do you usually keep in touch with your friends?',
        'Do you prefer sending messages or making phone calls? Why?',
        'Did you keep in touch with people differently when you were a child?',
        'Is there anyone you would like to get back in touch with?',
      ],
    },
    {
      id: 's2',
      part: 2,
      topic: 'A piece of advice',
      questions: [],
      cueCard: {
        task: 'Describe a piece of advice you received that turned out to be useful.',
        points: ['who gave you the advice', 'what the advice was', 'when you received it'],
        closing: 'and explain why it turned out to be useful.',
      },
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      id: 's3',
      part: 3,
      topic: 'Advice and decision-making',
      questions: [
        'Who do young people in your country usually go to for advice?',
        'Why do some people find it difficult to accept advice from others?',
        'Is advice from the internet as reliable as advice from people we know?',
        'Do you think older people always give better advice than younger people?',
        'Should important decisions, such as choosing a career, be made by young people alone or with their families?',
      ],
    },
  ],
};
