import type { ObjectiveSection } from '../../model';

/**
 * Mino Academic Mock Test 17 — Reading. Three original passages written
 * for Mino at IELTS Academic level (40 questions, 60 minutes).
 * Not Cambridge material. All passages, questions and answers are
 * original and were written fresh for this mock test.
 */
export const mock17Reading: ObjectiveSection = {
  skill: 'reading',
  timeLimitMinutes: 60,
  parts: [
    // ------------------------------------------------------------- Passage 1
    {
      id: 'r1',
      number: 1,
      passage: {
        title: 'The History of Shipbuilding',
        paragraphs: [
          {
            id: '1',
            text: 'People have built boats for thousands of years. The first boats were made from wood, and they were used for fishing and for travelling on rivers. Later, people built bigger boats, called ships, and they used them to carry goods across the sea.',
          },
          {
            id: '2',
            text: 'In the ancient world, the Egyptians built ships from wood, and they used them to travel on the River Nile. The Greeks and the Romans also built ships, and they used them for trade and for war. These ships had sails, and some of them also had rows of men who moved the ship with long wooden poles, called oars.',
          },
          {
            id: '3',
            text: 'In the Middle Ages, ships became bigger and stronger. In Europe, ships called galleons were built with three masts and many sails, and they could cross the Atlantic Ocean. These ships carried goods such as spices, silk and silver between Europe, Asia and America.',
          },
          {
            id: '4',
            text: 'In the nineteenth century, ships changed again. New ships were made from iron and steel, and they had engines that used steam. Steamships did not need wind, so they could travel faster and they could keep to a plan, even when the weather was bad.',
          },
          {
            id: '5',
            text: 'In the twentieth century, ships became much bigger. Large ships, called tankers, carried oil across the world, and container ships carried boxes of goods from one country to another. Modern ships also have computers, and they use them to find the best way across the sea.',
          },
          {
            id: '6',
            text: 'Today, shipbuilding is still an important industry, and many ships are built in Asia. People are now trying to build ships that use less fuel and make less pollution, so that the sea stays clean for the fish and for the people who live near the coast.',
          },
        ],
      },
      groups: [
        {
          id: 'm17r-g1',
          type: 'sentence-completion',
          instructions: 'Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          questions: [
            {
              id: 'm17r-q1',
              number: 1,
              prompt: 'The first boats were made from ___.',
              answer: { accepted: ['wood'] },
              explanation: { text: 'The first boats were made from wood.', evidence: { paragraphId: '1', quote: 'were made from wood' } },
            },
            {
              id: 'm17r-q2',
              number: 2,
              prompt: 'The Egyptians used ships to travel on the River ___.',
              answer: { accepted: ['Nile'] },
              explanation: { text: 'The Egyptians used ships to travel on the River Nile.', evidence: { paragraphId: '2', quote: 'travel on the River Nile' } },
            },
            {
              id: 'm17r-q3',
              number: 3,
              prompt: 'In the Middle Ages, ships called galleons had three ___.',
              answer: { accepted: ['masts'] },
              explanation: { text: 'Galleons were built with three masts and many sails.', evidence: { paragraphId: '3', quote: 'built with three masts' } },
            },
            {
              id: 'm17r-q4',
              number: 4,
              prompt: 'In the nineteenth century, new ships had engines that used ___.',
              answer: { accepted: ['steam'] },
              explanation: { text: 'New ships had engines that used steam.', evidence: { paragraphId: '4', quote: 'engines that used steam' } },
            },
            {
              id: 'm17r-q5',
              number: 5,
              prompt: 'Large ships, called tankers, carried ___ across the world.',
              answer: { accepted: ['oil'] },
              explanation: { text: 'Large ships, called tankers, carried oil across the world.', evidence: { paragraphId: '5', quote: 'tankers, carried oil across the world' } },
            },
          ],
        },
        {
          id: 'm17r-g2',
          type: 'true-false-not-given',
          instructions:
            'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
          questions: [
            {
              id: 'm17r-q6',
              number: 6,
              prompt: 'The first boats were used for fishing and for travelling on rivers.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'The first boats were used for fishing and for travelling on rivers.', evidence: { paragraphId: '1', quote: 'used for fishing and for travelling on rivers' } },
            },
            {
              id: 'm17r-q7',
              number: 7,
              prompt: 'The Greeks and the Romans used their ships for trade and for war.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'The Greeks and the Romans used their ships for trade and for war.', evidence: { paragraphId: '2', quote: 'they used them for trade and for war' } },
            },
            {
              id: 'm17r-q8',
              number: 8,
              prompt: 'Galleons could cross the Atlantic Ocean.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'Galleons could cross the Atlantic Ocean.', evidence: { paragraphId: '3', quote: 'they could cross the Atlantic Ocean' } },
            },
            {
              id: 'm17r-q9',
              number: 9,
              prompt: 'Steamships needed wind to travel.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'Steamships did not need wind.', evidence: { paragraphId: '4', quote: 'Steamships did not need wind' } },
            },
            {
              id: 'm17r-q10',
              number: 10,
              prompt: 'Shipbuilding in Asia began in the twentieth century.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: { text: 'The passage does not say when shipbuilding in Asia began.', evidence: { paragraphId: '6', quote: 'many ships are built in Asia' } },
            },
          ],
        },
        {
          id: 'm17r-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm17r-q11',
              number: 11,
              prompt: 'Why did people build bigger boats called ships?',
              options: [
                { id: 'A', text: 'to carry goods across the sea' },
                { id: 'B', text: 'to travel on rivers' },
                { id: 'C', text: 'to catch fish in rivers' },
                { id: 'D', text: 'to cross the Atlantic Ocean' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'People built bigger boats, called ships, and they used them to carry goods across the sea.',
                evidence: { paragraphId: '1', quote: 'they used them to carry goods across the sea' },
              },
            },
            {
              id: 'm17r-q12',
              number: 12,
              prompt: 'What did galleons carry?',
              options: [
                { id: 'A', text: 'oil and computers' },
                { id: 'B', text: 'spices, silk and silver' },
                { id: 'C', text: 'wood and iron' },
                { id: 'D', text: 'fish and fruit' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Galleons carried goods such as spices, silk and silver.',
                evidence: { paragraphId: '3', quote: 'These ships carried goods such as spices, silk and silver' },
              },
            },
            {
              id: 'm17r-q13',
              number: 13,
              prompt: 'What does the writer say about ships today?',
              options: [
                { id: 'A', text: 'People are trying to build ships that use less fuel and make less pollution.' },
                { id: 'B', text: 'Ships no longer use computers.' },
                { id: 'C', text: 'All ships are built in Europe.' },
                { id: 'D', text: 'Ships do not carry oil any more.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'People are now trying to build ships that use less fuel and make less pollution.',
                evidence: { paragraphId: '6', quote: 'People are now trying to build ships that use less fuel and make less pollution' },
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
        title: 'The Benefits of Walking',
        paragraphs: [
          {
            id: 'A',
            labelled: true,
            text: 'Walking is one of the oldest and simplest ways for people to move. People have walked for thousands of years, long before cars, trains and planes were made. Today, many people still walk every day, to go to school, to go to work, or to go to the shops.',
          },
          {
            id: 'B',
            labelled: true,
            text: 'Walking is good for the body. When people walk, their heart works harder, and their muscles become stronger. Doctors say that walking for thirty minutes every day can help people to stay healthy, and it can lower the chance of some diseases, such as heart disease.',
          },
          {
            id: 'C',
            labelled: true,
            text: 'Walking is also good for the mind. When people walk in a park or in the countryside, they feel calm, and they forget their worries for a short time. Some people say that they have their best ideas when they are walking, because walking helps them to think.',
          },
          {
            id: 'D',
            labelled: true,
            text: 'Walking is good for towns and cities too. When more people walk, there are fewer cars on the roads, so the air is cleaner and the streets are quieter. In some cities, new paths have been built for people who walk, and cars are not allowed in the centre of the city.',
          },
          {
            id: 'E',
            labelled: true,
            text: 'However, many people do not walk enough. In many countries, people travel everywhere by car, even when the place is near their home. Some people say that they do not have time to walk, and other people say that the roads near their home are not safe for walking.',
          },
          {
            id: 'F',
            labelled: true,
            text: 'There are many ways to walk more. One way is to walk to school or to work, if the place is not too far away. Another way is to get off the bus one stop early, and walk the rest of the way. People can also walk with friends, so that walking is more fun.',
          },
          {
            id: 'G',
            labelled: true,
            text: 'In conclusion, walking is a simple way to stay healthy, to feel calm and to help the town where you live. If more people walk every day, they will be healthier, and their towns will be cleaner and quieter.',
          },
        ],
      },
      groups: [
        {
          id: 'm17r-g4',
          type: 'matching-headings',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings below.',
          optionsTitle: 'List of Headings',
          options: [
            { id: 'i', text: 'How people moved in the past' },
            { id: 'ii', text: 'Walking is good for the body' },
            { id: 'iii', text: 'Walking is good for the mind' },
            { id: 'iv', text: 'Walking is good for towns and cities' },
            { id: 'v', text: 'Many people do not walk enough' },
            { id: 'vi', text: 'Ways to walk more' },
            { id: 'vii', text: 'Walking in the countryside' },
            { id: 'viii', text: 'Why walking is dangerous' },
          ],
          questions: [
            {
              id: 'm17r-q14',
              number: 14,
              prompt: 'Paragraph B',
              answer: { accepted: ['ii'] },
              explanation: { text: 'The paragraph says that walking is good for the body.', evidence: { paragraphId: 'B', quote: 'Walking is good for the body' } },
            },
            {
              id: 'm17r-q15',
              number: 15,
              prompt: 'Paragraph C',
              answer: { accepted: ['iii'] },
              explanation: { text: 'The paragraph says that walking is also good for the mind.', evidence: { paragraphId: 'C', quote: 'Walking is also good for the mind' } },
            },
            {
              id: 'm17r-q16',
              number: 16,
              prompt: 'Paragraph D',
              answer: { accepted: ['iv'] },
              explanation: { text: 'The paragraph says that walking is good for towns and cities too.', evidence: { paragraphId: 'D', quote: 'Walking is good for towns and cities too' } },
            },
            {
              id: 'm17r-q17',
              number: 17,
              prompt: 'Paragraph E',
              answer: { accepted: ['v'] },
              explanation: { text: 'The paragraph says that many people do not walk enough.', evidence: { paragraphId: 'E', quote: 'many people do not walk enough' } },
            },
            {
              id: 'm17r-q18',
              number: 18,
              prompt: 'Paragraph F',
              answer: { accepted: ['vi'] },
              explanation: { text: 'The paragraph says that there are many ways to walk more.', evidence: { paragraphId: 'F', quote: 'There are many ways to walk more' } },
            },
          ],
        },
        {
          id: 'm17r-g5',
          type: 'table-completion',
          instructions: 'Complete the table below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          table: {
            headers: ['Topic', 'Detail'],
            rows: [
              ['Walking every day', 'Walking for {{19}} minutes every day can help people to stay healthy'],
              ['The heart', 'When people walk, their {{20}} works harder'],
              ['Cars', 'When more people walk, there are fewer {{21}} on the roads'],
              ['Walking to work', 'People can get off the bus one stop {{22}}, and walk the rest of the way'],
            ],
          },
          questions: [
            { id: 'm17r-q19', number: 19, answer: { accepted: ['thirty'] }, explanation: { text: 'Walking for thirty minutes every day can help people to stay healthy.', evidence: { paragraphId: 'B', quote: 'walking for thirty minutes every day' } } },
            { id: 'm17r-q20', number: 20, answer: { accepted: ['heart'] }, explanation: { text: 'When people walk, their heart works harder.', evidence: { paragraphId: 'B', quote: 'their heart works harder' } } },
            { id: 'm17r-q21', number: 21, answer: { accepted: ['cars'] }, explanation: { text: 'When more people walk, there are fewer cars on the roads.', evidence: { paragraphId: 'D', quote: 'there are fewer cars on the roads' } } },
            { id: 'm17r-q22', number: 22, answer: { accepted: ['early'] }, explanation: { text: 'People can get off the bus one stop early, and walk the rest of the way.', evidence: { paragraphId: 'F', quote: 'get off the bus one stop early' } } },
          ],
        },
        {
          id: 'm17r-g6',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO things does the writer say about walking and the mind?',
          choose: 2,
          options: [
            { id: 'A', text: 'Walking helps people to think.' },
            { id: 'B', text: 'Walking makes people feel calm.' },
            { id: 'C', text: 'Walking makes people stronger.' },
            { id: 'D', text: 'Walking helps people to sleep.' },
            { id: 'E', text: 'Walking makes the air cleaner.' },
          ],
          questions: [
            { id: 'm17r-q23', number: 23, answer: { accepted: ['A'] }, explanation: { text: 'Walking helps people to think.', evidence: { paragraphId: 'C', quote: 'walking helps them to think' } } },
            { id: 'm17r-q24', number: 24, answer: { accepted: ['B'] }, explanation: { text: 'When people walk in a park or in the countryside, they feel calm.', evidence: { paragraphId: 'C', quote: 'they feel calm' } } },
          ],
        },
        {
          id: 'm17r-g7',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO ways of walking more does the writer mention in paragraph F?',
          choose: 2,
          options: [
            { id: 'A', text: 'Walk to school or to work.' },
            { id: 'B', text: 'Get off the bus one stop early.' },
            { id: 'C', text: 'Walk in the countryside.' },
            { id: 'D', text: 'Drive to work.' },
            { id: 'E', text: 'Walk alone at night.' },
          ],
          questions: [
            { id: 'm17r-q25', number: 25, answer: { accepted: ['A'] }, explanation: { text: 'One way is to walk to school or to work.', evidence: { paragraphId: 'F', quote: 'walk to school or to work' } } },
            { id: 'm17r-q26', number: 26, answer: { accepted: ['B'] }, explanation: { text: 'Another way is to get off the bus one stop early.', evidence: { paragraphId: 'F', quote: 'get off the bus one stop early' } } },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 3
    {
      id: 'r3',
      number: 3,
      passage: {
        title: 'Why Do People Move Abroad?',
        paragraphs: [
          {
            id: '1',
            text: 'Every year, millions of people leave their home country and move to another country. Some people move because they want a better job, and other people move because they want to study. Some people move because life is difficult in their home country, and they hope for a better life in a new country.',
          },
          {
            id: '2',
            text: 'Work is one of the most common reasons for moving abroad. In many countries, there are not enough jobs, or the jobs do not pay enough money. People who move for work often send money home to their families, and this money helps their families to buy food, to pay for school, and to build a house.',
          },
          {
            id: '3',
            text: 'Study is another common reason for moving abroad. Many young people move to another country to study at a university, because they want to learn a new language, or because they want to study a subject that is not taught in their home country. After they finish their studies, some of them stay in the new country, and others go back home.',
          },
          {
            id: '4',
            text: 'Some people move abroad because of problems in their home country. In some countries, there is war, and people must leave their homes to stay safe. In other countries, there is not enough food, because the land is dry and the rain does not come. These people move because they have no choice.',
          },
          {
            id: '5',
            text: 'However, moving to a new country is not easy. People who move abroad must learn a new language, and they must find a new home and a new job. They may also feel sad, because they miss their family and their friends, and the food and the music of their home country.',
          },
          {
            id: '6',
            text: 'There are also problems for the countries where people move to. In some towns, there are not enough houses or schools for all the new people, and some local people worry that there will not be enough jobs for them. However, new people also bring new ideas, new food and new skills, and they can help the town to grow.',
          },
          {
            id: '7',
            text: 'In my view, people should be free to move to another country, because moving can give people a better life, and it can help both their home country and their new country. Countries should help people who move, by teaching them the language and by helping them to find work. In this way, moving abroad can be good for everyone.',
          },
        ],
      },
      groups: [
        {
          id: 'm17r-g8',
          type: 'yes-no-not-given',
          instructions:
            'Do the following statements agree with the claims of the writer in Reading Passage 3? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
          questions: [
            {
              id: 'm17r-q27',
              number: 27,
              prompt: 'Many people move abroad because they want a better job.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Some people move because they want a better job.', evidence: { paragraphId: '1', quote: 'Some people move because they want a better job' } },
            },
            {
              id: 'm17r-q28',
              number: 28,
              prompt: 'People who move for work often send money home to their families.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'People who move for work often send money home to their families.', evidence: { paragraphId: '2', quote: 'People who move for work often send money home to their families' } },
            },
            {
              id: 'm17r-q29',
              number: 29,
              prompt: 'Most young people who study abroad stay in the new country.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'After they finish their studies, some of them stay in the new country, and others go back home.', evidence: { paragraphId: '3', quote: 'some of them stay in the new country, and others go back home' } },
            },
            {
              id: 'm17r-q30',
              number: 30,
              prompt: 'People who move because of war have no choice.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'These people move because they have no choice.', evidence: { paragraphId: '4', quote: 'These people move because they have no choice' } },
            },
            {
              id: 'm17r-q31',
              number: 31,
              prompt: 'People who move abroad earn more money than people who stay at home.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: { text: 'The writer does not compare the money of people who move abroad and people who stay at home.', evidence: { paragraphId: '7', quote: 'moving can give people a better life' } },
            },
          ],
        },
        {
          id: 'm17r-g9',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm17r-q32',
              number: 32,
              prompt: 'What does the writer say about people who move for work?',
              options: [
                { id: 'A', text: 'They often send money home to their families.' },
                { id: 'B', text: 'They never go back home.' },
                { id: 'C', text: 'They do not need to learn a new language.' },
                { id: 'D', text: 'They always find a good job.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'People who move for work often send money home to their families.',
                evidence: { paragraphId: '2', quote: 'People who move for work often send money home to their families' },
              },
            },
            {
              id: 'm17r-q33',
              number: 33,
              prompt: 'Why do some young people move abroad to study?',
              options: [
                { id: 'A', text: 'They want to learn a new language.' },
                { id: 'B', text: 'They want to leave their families.' },
                { id: 'C', text: 'They want to work in a factory.' },
                { id: 'D', text: 'They want to learn to drive.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Many young people move to another country to study, because they want to learn a new language.',
                evidence: { paragraphId: '3', quote: 'because they want to learn a new language' },
              },
            },
            {
              id: 'm17r-q34',
              number: 34,
              prompt: 'What is one problem for the countries where people move to?',
              options: [
                { id: 'A', text: 'There are not enough houses or schools for all the new people.' },
                { id: 'B', text: 'New people do not bring new ideas.' },
                { id: 'C', text: 'Local people do not want new food.' },
                { id: 'D', text: 'There are too many jobs.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'In some towns, there are not enough houses or schools for all the new people.',
                evidence: { paragraphId: '6', quote: 'there are not enough houses or schools for all the new people' },
              },
            },
            {
              id: 'm17r-q35',
              number: 35,
              prompt: "What is the writer's view?",
              options: [
                { id: 'A', text: 'People should be free to move to another country.' },
                { id: 'B', text: 'People should never move abroad.' },
                { id: 'C', text: 'Countries should not help people who move.' },
                { id: 'D', text: 'Moving abroad is good only for rich people.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'In the writer\'s view, people should be free to move to another country.',
                evidence: { paragraphId: '7', quote: 'people should be free to move to another country' },
              },
            },
          ],
        },
        {
          id: 'm17r-g10',
          type: 'matching-sentence-endings',
          instructions: 'Complete each sentence with the correct ending, A–H.',
          optionsTitle: 'List of Endings',
          options: [
            { id: 'A', text: 'often send money home to their families.' },
            { id: 'B', text: 'because they want to learn a new language.' },
            { id: 'C', text: 'because the land is dry and the rain does not come.' },
            { id: 'D', text: 'must learn a new language.' },
            { id: 'E', text: 'by teaching them the language and by helping them to find work.' },
            { id: 'F', text: 'do not need to find a new home.' },
            { id: 'G', text: 'because the rain comes every day.' },
            { id: 'H', text: 'by teaching them to drive a car.' },
          ],
          questions: [
            { id: 'm17r-q36', number: 36, prompt: 'People who move for work', answer: { accepted: ['A'] }, explanation: { text: 'People who move for work often send money home to their families.', evidence: { paragraphId: '2', quote: 'often send money home to their families' } } },
            { id: 'm17r-q37', number: 37, prompt: 'Many young people move to another country to study', answer: { accepted: ['B'] }, explanation: { text: 'Many young people move to another country to study, because they want to learn a new language.', evidence: { paragraphId: '3', quote: 'because they want to learn a new language' } } },
            { id: 'm17r-q38', number: 38, prompt: 'In some countries, there is not enough food', answer: { accepted: ['C'] }, explanation: { text: 'In some countries, there is not enough food, because the land is dry and the rain does not come.', evidence: { paragraphId: '4', quote: 'because the land is dry and the rain does not come' } } },
            { id: 'm17r-q39', number: 39, prompt: 'People who move abroad', answer: { accepted: ['D'] }, explanation: { text: 'People who move abroad must learn a new language.', evidence: { paragraphId: '5', quote: 'must learn a new language' } } },
            { id: 'm17r-q40', number: 40, prompt: 'Countries should help people who move', answer: { accepted: ['E'] }, explanation: { text: 'Countries should help people who move, by teaching them the language and by helping them to find work.', evidence: { paragraphId: '7', quote: 'by teaching them the language and by helping them to find work' } } },
          ],
        },
      ],
    },
  ],
};
