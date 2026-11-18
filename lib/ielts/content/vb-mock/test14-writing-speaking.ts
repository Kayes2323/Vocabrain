import type { SpeakingSection, WritingSection } from '../../model';

/**
 * Mino Academic Mock Test 14 — Writing and Speaking. Original tasks in the format and difficulty of IELTS Academic. Task 1 data is illustrative and written for practice. Not Cambridge material.
 */
export const mock14Writing: WritingSection = {
  skill: 'writing',
  timeLimitMinutes: 60,
  tasks: [
    {
      id: 'w1',
      task: 1,
      prompt:
        'The graph below shows the number of mobile phones sold in three countries (the UK, Japan and Brazil) between 2015 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data: {
        caption: 'Mobile phone sales in the UK, Japan and Brazil, 2015–2025 (millions of phones sold)',
        headers: ['Country', '2015', '2018', '2021', '2025'],
        rows: [
          ['UK', '12', '14', '13', '15'],
          ['Japan', '10', '11', '12', '13'],
          ['Brazil', '8', '11', '14', '17'],
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
        'Some people think that giving longer prison sentences is the best way to reduce crime. Others think that rehabilitation, such as education and job training for prisoners, is a better way to reduce crime.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.',
      minWords: 250,
      suggestedMinutes: 40,
    },
  ],
};

export const mock14Speaking: SpeakingSection = {
  skill: 'speaking',
  parts: [
    {
      id: 's1',
      part: 1,
      topic: 'Animals and pets',
      questions: [
        'Do you like animals? Why or why not?',
        'Have you ever had a pet? What kind of pet was it?',
        'What is the most popular pet in your country? Why do you think this is?',
        'Do you think it is a good idea for children to have a pet? Why or why not?',
        'Are there any animals that you are afraid of? Why?',
        'What wild animals can be seen in your country?',
        'Do you think people should keep wild animals as pets? Why or why not?',
        'Would you like to have a pet in the future? Why or why not?',
      ],
    },
    {
      id: 's2',
      part: 2,
      topic: 'An animal you like',
      questions: [],
      cueCard: {
        task: 'Describe an animal you like.',
        points: ['what the animal is', 'where you see it or where it lives', 'what the animal looks like and what it does'],
        closing: 'and explain why you like this animal.',
      },
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      id: 's3',
      part: 3,
      topic: 'Pets and people',
      questions: [
        'Why do you think many people like to keep pets?',
        'What are the advantages and disadvantages of keeping a pet?',
        'Do you think keeping a pet can help people who feel lonely? Why or why not?',
        'How have attitudes towards pets changed in recent years?',
        'Should the government make laws to protect animals? Why or why not?',
        'Do you think wild animals should be kept in zoos? Why or why not?',
      ],
    },
  ],
};
