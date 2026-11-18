import type { SpeakingSection, WritingSection } from '../../model';

/**
 * Mino Academic Mock Test 13 — Writing and Speaking. Original tasks in the format and difficulty of IELTS Academic. Task 1 data is illustrative and written for practice. Not Cambridge material.
 */
export const mock13Writing: WritingSection = {
  skill: 'writing',
  timeLimitMinutes: 60,
  tasks: [
    {
      id: 'w1',
      task: 1,
      prompt:
        'The diagram below shows how rain is formed. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data: {
        caption: 'How rain is formed (the water cycle)',
        headers: ['Stage', 'What happens'],
        rows: [
          ['1', 'The sun heats the water in seas, lakes and rivers.'],
          ['2', 'The water changes into water vapour and rises into the air. This is called evaporation.'],
          ['3', 'As the water vapour rises, it cools down and changes into tiny drops of water. This is called condensation.'],
          ['4', 'The tiny drops of water join together to form clouds.'],
          ['5', 'When the drops of water in the clouds become heavy, they fall to the ground as rain. This is called precipitation.'],
          ['6', 'The rainwater flows into rivers and seas, and the cycle begins again.'],
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
        'Some people think that parents should limit the amount of time their children spend looking at screens, such as phones, tablets and televisions. Others think that children should be free to use screens as much as they like.\n\nTo what extent do you agree or disagree with the idea that parents should limit their children\'s screen time?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.',
      minWords: 250,
      suggestedMinutes: 40,
    },
  ],
};

export const mock13Speaking: SpeakingSection = {
  skill: 'speaking',
  parts: [
    {
      id: 's1',
      part: 1,
      topic: 'Shopping',
      questions: [
        'Do you enjoy shopping? Why or why not?',
        'What do you usually buy when you go shopping?',
        'Do you prefer to go shopping alone or with other people? Why?',
        'How often do you go shopping?',
        'What is your favourite shop? Why do you like it?',
        'Do you like shopping for clothes? Why or why not?',
        'Have you ever bought something online? What did you buy?',
        'Do you think shopping is a good way to spend free time? Why or why not?',
      ],
    },
    {
      id: 's2',
      part: 2,
      topic: 'A shop you like',
      questions: [],
      cueCard: {
        task: 'Describe a shop you like.',
        points: ['where the shop is', 'what the shop sells', 'how often you go to this shop'],
        closing: 'and explain why you like this shop.',
      },
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      id: 's3',
      part: 3,
      topic: 'Shopping online vs in-store',
      questions: [
        'Why do you think more people are shopping online today than in the past?',
        'What are the advantages of shopping online compared with shopping in a shop?',
        'What are the disadvantages of shopping online?',
        'Do you think small shops in towns will disappear in the future? Why or why not?',
        'How can shops in towns encourage more people to visit them?',
        'Do you think people will still go to shops in the future, or will everyone shop online? Why?',
      ],
    },
  ],
};
