import type { SpeakingSection, WritingSection } from '../../model';

/**
 * Mino Academic Mock Test 11 — Writing and Speaking. Original tasks in the format and difficulty of IELTS Academic. Task 1 data is illustrative and written for practice. Not Cambridge material.
 */
export const mock11Writing: WritingSection = {
  skill: 'writing',
  timeLimitMinutes: 60,
  tasks: [
    {
      id: 'w1',
      task: 1,
      prompt:
        'The maps below show the changes to a town centre between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data: {
        caption: 'Changes to a town centre, 2000 and 2020',
        headers: ['Feature', '2000', '2020'],
        rows: [
          ['Market square', 'in the centre of the town', 'in the centre of the town, with a new cafe area'],
          ['Library', 'on the north side of the square', 'on the north side of the square, made larger'],
          ['Cinema', 'on the east side of the square', 'closed and replaced by a shopping centre'],
          ['Car park', 'to the south of the square', 'moved to the east of the town, next to the new bus station'],
          ['Bus station', 'to the west of the square', 'new bus station built to the east of the town'],
          ['Park', 'a small park to the south-west', 'a larger park to the south-west, with a playground'],
          ['Shops on Main Street', 'small shops along both sides', 'many small shops replaced by larger shops and restaurants'],
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
        'Some people think that museums should be free for everyone to visit. Others believe that museums should charge visitors, so that they can pay for their work and stay open.\n\nTo what extent do you agree or disagree that museums should be free for everyone?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.',
      minWords: 250,
      suggestedMinutes: 40,
    },
  ],
};

export const mock11Speaking: SpeakingSection = {
  skill: 'speaking',
  parts: [
    {
      id: 's1',
      part: 1,
      topic: 'Seasons and clothes',
      questions: [
        'What is your favourite season of the year? Why?',
        'How does the weather change in your country during the year?',
        'Do you prefer hot weather or cold weather? Why?',
        'What kind of clothes do you usually wear in summer?',
        'What kind of clothes do you usually wear in winter?',
        'Do you like buying new clothes for each season? Why or why not?',
        'Has the way you dress changed since you were a child? Why or why not?',
        'Do people in your country wear traditional clothes on special days? Why or why not?',
      ],
    },
    {
      id: 's2',
      part: 2,
      topic: 'A historic building you have visited',
      questions: [],
      cueCard: {
        task: 'Describe a historic building you have visited.',
        points: ['where the building is', 'what the building looks like', 'what you did there'],
        closing: 'and explain why this historic building was interesting to you.',
      },
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      id: 's3',
      part: 3,
      topic: 'Preserving history',
      questions: [
        'Why is it important to preserve historic buildings?',
        'Should governments spend money on repairing old buildings, or is it better to build new ones? Why?',
        'Do young people in your country care about history? Why or why not?',
        'How can schools help children to learn about the history of their country?',
        'What problems can happen when too many tourists visit historic places?',
        'Do you think historic buildings should be used for modern purposes, such as shops or hotels? Why or why not?',
      ],
    },
  ],
};
