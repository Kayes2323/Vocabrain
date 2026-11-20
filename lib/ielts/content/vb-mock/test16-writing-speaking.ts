import type { SpeakingSection, WritingSection } from '../../model';

/**
 * Mino Academic Mock Test 16 — Writing and Speaking. Original tasks in the format and difficulty of IELTS Academic. Task 1 data is illustrative and written for practice. Not Cambridge material.
 */
export const mock16Writing: WritingSection = {
  skill: 'writing',
  timeLimitMinutes: 60,
  tasks: [
    {
      id: 'w1',
      task: 1,
      prompt:
        'The diagram below shows how bread is made. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data: {
        caption: 'How bread is made (stages of the process)',
        headers: ['Stage', 'What happens'],
        rows: [
          ['1', 'Wheat is grown in fields, and it is cut and collected when it is ready.'],
          ['2', 'The wheat is taken to a mill, where it is cleaned and ground into flour.'],
          ['3', 'The flour is mixed with water, salt and yeast in a large bowl to make dough.'],
          ['4', 'The dough is left to rise for one hour, so that it becomes bigger and softer.'],
          ['5', 'The dough is cut into pieces, and each piece is shaped into a loaf.'],
          ['6', 'The loaves are baked in a hot oven for about thirty minutes.'],
          ['7', 'The bread is taken out of the oven, it is left to cool, and then it is packed and sent to shops.'],
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
        'Some people think that art, such as painting and music, is not important in education, and that schools should spend more time on subjects such as maths and science. Others think that art is an important part of education.\n\nDiscuss both these views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.',
      minWords: 250,
      suggestedMinutes: 40,
    },
  ],
};

export const mock16Speaking: SpeakingSection = {
  skill: 'speaking',
  parts: [
    {
      id: 's1',
      part: 1,
      topic: 'Neighbours',
      questions: [
        'Do you know your neighbours well? Why or why not?',
        'What do you like most about your neighbours? Why?',
        'Do you think it is important to have good neighbours? Why or why not?',
        'How often do you talk to your neighbours?',
        'What kind of things do neighbours help each other with?',
        'Do you think people today know their neighbours better or worse than people in the past? Why?',
        'Would you like to live in a place where you know all your neighbours? Why or why not?',
        'What problems can neighbours have with each other?',
      ],
    },
    {
      id: 's2',
      part: 2,
      topic: 'A person you admire',
      questions: [],
      cueCard: {
        task: 'Describe a person you admire.',
        points: ['who the person is', 'how you know this person', 'what this person has done'],
        closing: 'and explain why you admire this person.',
      },
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      id: 's3',
      part: 3,
      topic: 'Role models',
      questions: [
        'What kind of people do young people admire today? Why?',
        'Do you think famous people make good role models? Why or why not?',
        'How are role models today different from role models in the past?',
        'Should parents be role models for their children? Why or why not?',
        'Do you think teachers can be role models for their students? Why or why not?',
        'What can society do to help young people find good role models?',
      ],
    },
  ],
};
