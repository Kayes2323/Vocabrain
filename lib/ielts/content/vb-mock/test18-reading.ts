import type { ObjectiveSection } from '../../model';

/**
 * Mino Academic Mock Test 18 — Reading. Three original passages written
 * for Mino at IELTS Academic level (40 questions, 60 minutes).
 * Not Cambridge material. All passages, questions and answers are
 * original and were written fresh for this mock test.
 */
export const mock18Reading: ObjectiveSection = {
  skill: 'reading',
  timeLimitMinutes: 60,
  parts: [
    // ------------------------------------------------------------- Passage 1
    {
      id: 'r1',
      number: 1,
      passage: {
        title: 'The History of the Telephone',
        paragraphs: [
          {
            id: '1',
            text: 'People have used telephones for almost one hundred and fifty years. The first telephone was made in 1876, and it could carry the sound of a voice along a wire. Before the telephone, people sent messages by letter, and a letter could take many days to reach another town.',
          },
          {
            id: '2',
            text: 'The first telephone was made by Alexander Graham Bell, a scientist from Scotland who lived in America. Bell worked with his helper, Thomas Watson, and in 1876, Bell spoke to Watson on the telephone, and Watson heard his voice in another room.',
          },
          {
            id: '3',
            text: 'In the early years, telephones were only in the homes of rich people and in offices. People had to speak to an operator, who joined the wires together so that two people could talk. Later, people could dial a number, and the telephone joined the wires without an operator.',
          },
          {
            id: '4',
            text: 'In the twentieth century, telephones became smaller and cheaper, and many homes had a telephone. People could call their friends and their families in other towns and in other countries, and they did not need to write a letter.',
          },
          {
            id: '5',
            text: 'In the nineteen eighties, the first mobile telephones were made. These telephones were big and heavy, and they cost a lot of money. Later, mobile telephones became smaller, and they could also send short messages, called texts.',
          },
          {
            id: '6',
            text: 'Today, almost everyone has a mobile telephone, and people use it to call, to send messages, to take photographs and to find information on the internet. The telephone has changed a great deal, but it is still used for the same thing: to help people to talk to each other.',
          },
        ],
      },
      groups: [
        {
          id: 'm18r-g1',
          type: 'sentence-completion',
          instructions: 'Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          questions: [
            {
              id: 'm18r-q1',
              number: 1,
              prompt: 'The first telephone was made in ___.',
              answer: { accepted: ['1876'] },
              explanation: { text: 'The first telephone was made in 1876.', evidence: { paragraphId: '1', quote: 'was made in 1876' } },
            },
            {
              id: 'm18r-q2',
              number: 2,
              prompt: 'Bell worked with his helper, Thomas ___.',
              answer: { accepted: ['Watson'] },
              explanation: { text: 'Bell worked with his helper, Thomas Watson.', evidence: { paragraphId: '2', quote: 'his helper, Thomas Watson' } },
            },
            {
              id: 'm18r-q3',
              number: 3,
              prompt: 'In the early years, people had to speak to an ___.',
              answer: { accepted: ['operator'] },
              explanation: { text: 'People had to speak to an operator.', evidence: { paragraphId: '3', quote: 'speak to an operator' } },
            },
            {
              id: 'm18r-q4',
              number: 4,
              prompt: 'Later, people could dial a ___.',
              answer: { accepted: ['number'] },
              explanation: { text: 'Later, people could dial a number.', evidence: { paragraphId: '3', quote: 'could dial a number' } },
            },
            {
              id: 'm18r-q5',
              number: 5,
              prompt: 'The first mobile telephones were big and ___.',
              answer: { accepted: ['heavy'] },
              explanation: { text: 'The first mobile telephones were big and heavy.', evidence: { paragraphId: '5', quote: 'big and heavy' } },
            },
          ],
        },
        {
          id: 'm18r-g2',
          type: 'true-false-not-given',
          instructions:
            'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
          questions: [
            {
              id: 'm18r-q6',
              number: 6,
              prompt: 'The first telephone could carry the sound of a voice along a wire.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'The first telephone could carry the sound of a voice along a wire.', evidence: { paragraphId: '1', quote: 'could carry the sound of a voice along a wire' } },
            },
            {
              id: 'm18r-q7',
              number: 7,
              prompt: 'Bell was a scientist from Scotland who lived in America.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'Bell was a scientist from Scotland who lived in America.', evidence: { paragraphId: '2', quote: 'a scientist from Scotland who lived in America' } },
            },
            {
              id: 'm18r-q8',
              number: 8,
              prompt: 'In the early years, telephones were only in the homes of rich people.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'In the early years, telephones were in the homes of rich people and in offices.', evidence: { paragraphId: '3', quote: 'only in the homes of rich people and in offices' } },
            },
            {
              id: 'm18r-q9',
              number: 9,
              prompt: 'The first mobile telephones could send short messages.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'Only later could mobile telephones send short messages.', evidence: { paragraphId: '5', quote: 'Later, mobile telephones became smaller, and they could also send short messages' } },
            },
            {
              id: 'm18r-q10',
              number: 10,
              prompt: 'The first telephone was made in France.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: { text: 'The passage does not say where the first telephone was made, only when it was made.', evidence: { paragraphId: '1', quote: 'The first telephone was made in 1876' } },
            },
          ],
        },
        {
          id: 'm18r-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm18r-q11',
              number: 11,
              prompt: 'What could people do when telephones became smaller and cheaper in the twentieth century?',
              options: [
                { id: 'A', text: 'call their friends and families in other towns and countries' },
                { id: 'B', text: 'send letters more quickly' },
                { id: 'C', text: 'watch films on the telephone' },
                { id: 'D', text: 'speak to an operator' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'People could call their friends and their families in other towns and in other countries.',
                evidence: { paragraphId: '4', quote: 'People could call their friends and their families in other towns and in other countries' },
              },
            },
            {
              id: 'm18r-q12',
              number: 12,
              prompt: 'What were the first mobile telephones like?',
              options: [
                { id: 'A', text: 'big and heavy' },
                { id: 'B', text: 'small and light' },
                { id: 'C', text: 'cheap and small' },
                { id: 'D', text: 'big and cheap' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The first mobile telephones were big and heavy.',
                evidence: { paragraphId: '5', quote: 'These telephones were big and heavy' },
              },
            },
            {
              id: 'm18r-q13',
              number: 13,
              prompt: 'What does the writer say about telephones today?',
              options: [
                { id: 'A', text: 'People use them to call, to send messages, to take photographs and to find information.' },
                { id: 'B', text: 'People only use them to make calls.' },
                { id: 'C', text: 'People do not use them to talk to each other.' },
                { id: 'D', text: 'They are only in the homes of rich people.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'People use the telephone to call, to send messages, to take photographs and to find information on the internet.',
                evidence: { paragraphId: '6', quote: 'people use it to call, to send messages, to take photographs and to find information on the internet' },
              },
            },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 2
    {
      id: 'r2',
      number: 2,
      passage: {
        title: 'Deserts and Their Wildlife',
        paragraphs: [
          {
            id: 'A',
            labelled: true,
            text: 'Deserts are places where very little rain falls. In a desert, less than twenty-five centimetres of rain falls in a year, and the land is dry for most of the year. The biggest desert in the world is the Sahara, in Africa, and there are also large deserts in Asia, Australia and America.',
          },
          {
            id: 'B',
            labelled: true,
            text: 'Desert animals have learned to live with very little water. Camels can live for many days without water, and they store fat in their humps. The fennec fox, a small fox with very big ears, lives in the Sahara, and it hunts for food at night.',
          },
          {
            id: 'C',
            labelled: true,
            text: 'Desert plants also store water. A cactus stores water in its thick stem, and it has sharp spines to stop animals from eating it. Other desert plants have roots that grow deep into the ground to find water.',
          },
          {
            id: 'D',
            labelled: true,
            text: 'Many desert animals are active at night. In the day, the desert is very hot, and the sun can hurt animals and plants. At night, the desert is cool, so animals come out to look for food, and plants open their flowers.',
          },
          {
            id: 'E',
            labelled: true,
            text: 'People also live in deserts. In the Sahara, some people, called nomads, move from place to place with their camels and their goats, and they look for water and grass for their animals. Other people live in towns near water, and they grow food with water from deep wells.',
          },
          {
            id: 'F',
            labelled: true,
            text: 'Deserts are growing bigger. In some parts of the world, the land near a desert is becoming dry, because there is less rain and because people use too much water. When the land becomes dry, plants die, and animals have no food.',
          },
          {
            id: 'G',
            labelled: true,
            text: 'In conclusion, deserts are dry and difficult places, but many animals, plants and people live there. If we use water carefully and look after the land, deserts can stay home to the animals and plants that live there.',
          },
        ],
      },
      groups: [
        {
          id: 'm18r-g4',
          type: 'matching-headings',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings below.',
          optionsTitle: 'List of Headings',
          options: [
            { id: 'i', text: 'What is a desert' },
            { id: 'ii', text: 'Animals of the desert' },
            { id: 'iii', text: 'Plants that store water' },
            { id: 'iv', text: 'Life at night' },
            { id: 'v', text: 'People who live in deserts' },
            { id: 'vi', text: 'Deserts are growing' },
            { id: 'vii', text: 'Deserts and the sea' },
            { id: 'viii', text: 'Why deserts are cold' },
          ],
          questions: [
            {
              id: 'm18r-q14',
              number: 14,
              prompt: 'Paragraph B',
              answer: { accepted: ['ii'] },
              explanation: { text: 'The paragraph is about desert animals.', evidence: { paragraphId: 'B', quote: 'Desert animals have learned to live with very little water' } },
            },
            {
              id: 'm18r-q15',
              number: 15,
              prompt: 'Paragraph C',
              answer: { accepted: ['iii'] },
              explanation: { text: 'The paragraph is about desert plants that store water.', evidence: { paragraphId: 'C', quote: 'Desert plants also store water' } },
            },
            {
              id: 'm18r-q16',
              number: 16,
              prompt: 'Paragraph D',
              answer: { accepted: ['iv'] },
              explanation: { text: 'The paragraph is about life at night in the desert.', evidence: { paragraphId: 'D', quote: 'Many desert animals are active at night' } },
            },
            {
              id: 'm18r-q17',
              number: 17,
              prompt: 'Paragraph E',
              answer: { accepted: ['v'] },
              explanation: { text: 'The paragraph is about people who live in deserts.', evidence: { paragraphId: 'E', quote: 'People also live in deserts' } },
            },
            {
              id: 'm18r-q18',
              number: 18,
              prompt: 'Paragraph F',
              answer: { accepted: ['vi'] },
              explanation: { text: 'The paragraph is about deserts growing bigger.', evidence: { paragraphId: 'F', quote: 'Deserts are growing bigger' } },
            },
          ],
        },
        {
          id: 'm18r-g5',
          type: 'table-completion',
          instructions: 'Complete the table below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          table: {
            headers: ['Topic', 'Detail'],
            rows: [
              ['Rain in a desert', 'Less than {{19}} centimetres of rain falls in a desert in a year'],
              ['Camels', 'Camels can live for many days without {{20}}'],
              ['Cactus', 'A cactus stores water in its thick {{21}}'],
              ['Night animals', 'Many desert animals are active at {{22}}'],
            ],
          },
          questions: [
            { id: 'm18r-q19', number: 19, answer: { accepted: ['twenty-five'] }, explanation: { text: 'Less than twenty-five centimetres of rain falls in a desert in a year.', evidence: { paragraphId: 'A', quote: 'less than twenty-five centimetres of rain falls in a year' } } },
            { id: 'm18r-q20', number: 20, answer: { accepted: ['water'] }, explanation: { text: 'Camels can live for many days without water.', evidence: { paragraphId: 'B', quote: 'Camels can live for many days without water' } } },
            { id: 'm18r-q21', number: 21, answer: { accepted: ['stem'] }, explanation: { text: 'A cactus stores water in its thick stem.', evidence: { paragraphId: 'C', quote: 'A cactus stores water in its thick stem' } } },
            { id: 'm18r-q22', number: 22, answer: { accepted: ['night'] }, explanation: { text: 'Many desert animals are active at night.', evidence: { paragraphId: 'D', quote: 'Many desert animals are active at night' } } },
          ],
        },
        {
          id: 'm18r-g6',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO things does the writer say about camels?',
          choose: 2,
          options: [
            { id: 'A', text: 'They can live for many days without water.' },
            { id: 'B', text: 'They store fat in their humps.' },
            { id: 'C', text: 'They hunt for food at night.' },
            { id: 'D', text: 'They live in the sea.' },
            { id: 'E', text: 'They sleep during the day.' },
          ],
          questions: [
            { id: 'm18r-q23', number: 23, answer: { accepted: ['A'] }, explanation: { text: 'Camels can live for many days without water.', evidence: { paragraphId: 'B', quote: 'Camels can live for many days without water' } } },
            { id: 'm18r-q24', number: 24, answer: { accepted: ['B'] }, explanation: { text: 'Camels store fat in their humps.', evidence: { paragraphId: 'B', quote: 'they store fat in their humps' } } },
          ],
        },
        {
          id: 'm18r-g7',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO things does the writer say about desert plants?',
          choose: 2,
          options: [
            { id: 'A', text: 'They store water in their stems.' },
            { id: 'B', text: 'Their roots grow deep to find water.' },
            { id: 'C', text: 'They grow big leaves.' },
            { id: 'D', text: 'They move from place to place.' },
            { id: 'E', text: 'They live in the sea.' },
          ],
          questions: [
            { id: 'm18r-q25', number: 25, answer: { accepted: ['A'] }, explanation: { text: 'A cactus stores water in its thick stem.', evidence: { paragraphId: 'C', quote: 'A cactus stores water in its thick stem' } } },
            { id: 'm18r-q26', number: 26, answer: { accepted: ['B'] }, explanation: { text: 'Other desert plants have roots that grow deep into the ground to find water.', evidence: { paragraphId: 'C', quote: 'roots that grow deep into the ground to find water' } } },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 3
    {
      id: 'r3',
      number: 3,
      passage: {
        title: 'The Case for a Four-Day Working Week',
        paragraphs: [
          {
            id: '1',
            text: 'Many people work five days each week, from Monday to Friday, and they rest for two days at the weekend. Now, some people think that workers should work for only four days each week, and rest for three days. This idea is called the four-day working week, and more companies are trying it.',
          },
          {
            id: '2',
            text: 'The idea of a shorter working week is not new. A hundred years ago, most people worked for six days each week. Then, in 1926, Henry Ford gave his workers a five-day week, and other companies soon did the same thing.',
          },
          {
            id: '3',
            text: 'People who like the four-day week say that it is good for workers. Workers feel less stress, because they have one more day to rest, and they have more time with their families. Workers also have more time to do exercise, and this can help them to stay healthy.',
          },
          {
            id: '4',
            text: 'The four-day week can also be good for companies. In some companies, workers do the same work in less time, because they work harder when they know that they will have a longer weekend. Companies also have fewer sick days, and it is easier for them to find new workers.',
          },
          {
            id: '5',
            text: 'However, there are problems with the four-day week. Some jobs cannot stop for three days each week, because hospitals and shops must stay open every day. In some jobs, workers may work longer hours on four days, and they may feel tired at the end of the day.',
          },
          {
            id: '6',
            text: 'In 2022, there was a test in Britain with sixty-one companies. The workers kept the same pay, and they worked for four days each week. At the end of the test, most companies said that the work stayed the same, and most workers said that they felt happier.',
          },
          {
            id: '7',
            text: 'In my view, the four-day working week is a good idea for many jobs, but it is not a good idea for every job. Companies should try the four-day week slowly, and they should listen to their workers. In this way, more workers can have a better life, and companies can still do their work well.',
          },
        ],
      },
      groups: [
        {
          id: 'm18r-g8',
          type: 'yes-no-not-given',
          instructions:
            'Do the following statements agree with the claims of the writer in Reading Passage 3? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
          questions: [
            {
              id: 'm18r-q27',
              number: 27,
              prompt: 'The idea of a shorter working week is new.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'The idea of a shorter working week is not new.', evidence: { paragraphId: '2', quote: 'The idea of a shorter working week is not new' } },
            },
            {
              id: 'm18r-q28',
              number: 28,
              prompt: 'Henry Ford gave his workers a five-day week in 1926.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'In 1926, Henry Ford gave his workers a five-day week.', evidence: { paragraphId: '2', quote: 'in 1926, Henry Ford gave his workers a five-day week' } },
            },
            {
              id: 'm18r-q29',
              number: 29,
              prompt: 'Workers in a four-day week have more time with their families.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Workers have more time with their families.', evidence: { paragraphId: '3', quote: 'they have more time with their families' } },
            },
            {
              id: 'm18r-q30',
              number: 30,
              prompt: 'All companies can use a four-day week.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'Some jobs cannot stop for three days each week.', evidence: { paragraphId: '5', quote: 'Some jobs cannot stop for three days each week' } },
            },
            {
              id: 'm18r-q31',
              number: 31,
              prompt: 'The test in Britain lasted for two years.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: { text: 'The writer does not say how long the test in Britain lasted.', evidence: { paragraphId: '6', quote: 'there was a test in Britain with sixty-one companies' } },
            },
          ],
        },
        {
          id: 'm18r-g9',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm18r-q32',
              number: 32,
              prompt: 'What does the writer say about workers in a four-day week?',
              options: [
                { id: 'A', text: 'They feel less stress and have more time with their families.' },
                { id: 'B', text: 'They work six days each week.' },
                { id: 'C', text: 'They earn less money.' },
                { id: 'D', text: 'They never feel tired.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Workers feel less stress, and they have more time with their families.',
                evidence: { paragraphId: '3', quote: 'Workers feel less stress' },
              },
            },
            {
              id: 'm18r-q33',
              number: 33,
              prompt: 'What do some companies find when workers have a four-day week?',
              options: [
                { id: 'A', text: 'Workers do the same work in less time.' },
                { id: 'B', text: 'Workers do less work.' },
                { id: 'C', text: 'Companies have more sick days.' },
                { id: 'D', text: 'It is harder to find new workers.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'In some companies, workers do the same work in less time.',
                evidence: { paragraphId: '4', quote: 'workers do the same work in less time' },
              },
            },
            {
              id: 'm18r-q34',
              number: 34,
              prompt: 'What is one problem with the four-day week?',
              options: [
                { id: 'A', text: 'Workers may work longer hours on four days and feel tired.' },
                { id: 'B', text: 'Hospitals and shops close for three days each week.' },
                { id: 'C', text: 'Workers have less time with their families.' },
                { id: 'D', text: 'Companies have more sick days.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'In some jobs, workers may work longer hours on four days, and they may feel tired at the end of the day.',
                evidence: { paragraphId: '5', quote: 'workers may work longer hours on four days' },
              },
            },
            {
              id: 'm18r-q35',
              number: 35,
              prompt: "What is the writer's view?",
              options: [
                { id: 'A', text: 'The four-day working week is a good idea for many jobs, but not for every job.' },
                { id: 'B', text: 'The four-day working week is a good idea for every job.' },
                { id: 'C', text: 'The four-day working week is a bad idea for all jobs.' },
                { id: 'D', text: 'Companies should never try the four-day week.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The writer thinks the four-day working week is a good idea for many jobs, but not for every job.',
                evidence: { paragraphId: '7', quote: 'the four-day working week is a good idea for many jobs, but it is not a good idea for every job' },
              },
            },
          ],
        },
        {
          id: 'm18r-g10',
          type: 'matching-sentence-endings',
          instructions: 'Complete each sentence with the correct ending, A–H.',
          optionsTitle: 'List of Endings',
          options: [
            { id: 'A', text: 'gave his workers a five-day week in 1926.' },
            { id: 'B', text: 'have more time with their families.' },
            { id: 'C', text: 'do the same work in less time.' },
            { id: 'D', text: 'cannot stop for three days each week.' },
            { id: 'E', text: 'kept the same pay.' },
            { id: 'F', text: 'work longer hours on four days.' },
            { id: 'G', text: 'because they want more holidays.' },
            { id: 'H', text: 'by working on Saturdays.' },
          ],
          questions: [
            { id: 'm18r-q36', number: 36, prompt: 'Henry Ford', answer: { accepted: ['A'] }, explanation: { text: 'Henry Ford gave his workers a five-day week in 1926.', evidence: { paragraphId: '2', quote: 'Henry Ford gave his workers a five-day week' } } },
            { id: 'm18r-q37', number: 37, prompt: 'Workers in a four-day week', answer: { accepted: ['B'] }, explanation: { text: 'Workers in a four-day week have more time with their families.', evidence: { paragraphId: '3', quote: 'they have more time with their families' } } },
            { id: 'm18r-q38', number: 38, prompt: 'Workers in some companies', answer: { accepted: ['C'] }, explanation: { text: 'Workers in some companies do the same work in less time.', evidence: { paragraphId: '4', quote: 'workers do the same work in less time' } } },
            { id: 'm18r-q39', number: 39, prompt: 'Some jobs, such as work in hospitals', answer: { accepted: ['D'] }, explanation: { text: 'Some jobs cannot stop for three days each week.', evidence: { paragraphId: '5', quote: 'Some jobs cannot stop for three days each week' } } },
            { id: 'm18r-q40', number: 40, prompt: 'Workers in the test in Britain', answer: { accepted: ['E'] }, explanation: { text: 'Workers in the test in Britain kept the same pay.', evidence: { paragraphId: '6', quote: 'The workers kept the same pay' } } },
          ],
        },
      ],
    },
  ],
};
