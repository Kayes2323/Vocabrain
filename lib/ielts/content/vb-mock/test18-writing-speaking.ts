import type { SpeakingSection, WritingSection } from '../../model';

/**
 * Mino Academic Mock Test 18 — Writing and Speaking. Original tasks in the format and difficulty of IELTS Academic. Task 1 data is illustrative and written for practice. Not Cambridge material.
 */
export const mock18Writing: WritingSection = {
  skill: 'writing',
  timeLimitMinutes: 60,
  tasks: [
    {
      id: 'w1',
      task: 1,
      prompt:
        'The maps below show a university campus in 2010 and in 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data: {
        caption: 'A university campus, 2010 and 2025',
        headers: ['Feature', '2010', '2025'],
        rows: [
          ['Main building', 'in the centre of the campus', 'in the centre of the campus, with a new wing on the east side'],
          ['Library', 'to the north of the main building', 'to the north of the main building, made larger'],
          ['Science block', 'to the east of the main building', 'moved to the north-east of the campus, next to the new sports hall'],
          ['Sports hall', 'no sports hall on the campus', 'new sports hall built in the north-east of the campus'],
          ['Student flats', 'to the south of the main building', 'to the south of the main building, with two new blocks'],
          ['Car park', 'to the west of the main building', 'moved to the south-west corner of the campus'],
          ['Lake', 'a small lake in the south-west of the campus', 'a larger lake in the south-west of the campus, with a new cafe beside it'],
          ['Gardens', 'a small garden to the west of the library', 'a larger garden to the west of the library, with new paths'],
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
        'Some people think that parents are responsible for the behaviour of their children. Others believe that schools are responsible for the behaviour of children.\n\nDiscuss both these views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.',
      minWords: 250,
      suggestedMinutes: 40,
    },
  ],
};

export const mock18Speaking: SpeakingSection = {
  skill: 'speaking',
  parts: [
    {
      id: 's1',
      part: 1,
      topic: 'Films and TV',
      questions: [
        'Do you like watching films? Why or why not?',
        'What kind of films do you like? Why?',
        'How often do you watch films?',
        'Do you prefer watching films at the cinema or at home? Why?',
        'Do you like watching TV? Why or why not?',
        'What kind of TV programmes do you like? Why?',
        'Do you prefer watching TV alone or with other people? Why?',
        'Has the way you watch films and TV changed in recent years? Why or why not?',
      ],
    },
    {
      id: 's2',
      part: 2,
      topic: 'A film you enjoyed',
      questions: [],
      cueCard: {
        task: 'Describe a film you enjoyed.',
        points: ['what the film was about', 'when and where you watched it', 'who you watched it with'],
        closing: 'and explain why you enjoyed this film.',
      },
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      id: 's3',
      part: 3,
      topic: 'Cinema and streaming',
      questions: [
        'Do you think cinemas will still be popular in the future? Why or why not?',
        'Why do some people prefer to watch films at home rather than at the cinema?',
        'How has streaming changed the way people watch films and TV?',
        'Do you think streaming services are good for the film industry? Why or why not?',
        'Should children watch a lot of films and TV? Why or why not?',
        'What kind of films do you think will be popular in the future? Why?',
      ],
    },
  ],
};
