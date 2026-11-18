import type { ObjectiveSection } from '../../model';

/**
 * Mino Academic Mock Test 14 — Reading. Three original passages written
 * for Mino at IELTS Academic level (40 questions, 60 minutes).
 * Not Cambridge material. All passages, questions and answers are
 * original and were written fresh for this mock test.
 */
export const mock14Reading: ObjectiveSection = {
  skill: 'reading',
  timeLimitMinutes: 60,
  parts: [
    // ------------------------------------------------------------- Passage 1
    {
      id: 'r1',
      number: 1,
      passage: {
        title: 'The History of Bridges',
        paragraphs: [
          {
            id: '1',
            text: 'People have built bridges for thousands of years. The first bridges were very simple: a tree across a river, or stones placed in a river so that people could walk across it. These early bridges were not strong, and they could be washed away when the river was high after heavy rain.',
          },
          {
            id: '2',
            text: 'More than two thousand years ago, the Romans began to build stone bridges, and they used arches to hold up the road. Arches are strong and can hold up a heavy road, because the weight of the road pushes down on the arch and the arch pushes the weight out to the sides. One famous Roman bridge is the Pont du Gard in France, which was built about two thousand years ago and carried water across a valley to the town of Nimes.',
          },
          {
            id: '3',
            text: 'For a long time, most bridges were made of wood or stone. Then, in the nineteenth century, engineers began to use iron and steel, which are much stronger than wood or stone. The first iron bridge in the world was built in 1779 at Ironbridge in England, and it is still standing today. Later, steel bridges were built across wide rivers and deep valleys all over the world.',
          },
          {
            id: '4',
            text: 'Another important kind of bridge is the suspension bridge, which hangs from strong steel cables. The most famous suspension bridge in the world is the Golden Gate Bridge in San Francisco, which opened in 1937. When it opened, it was the longest bridge in the world, and it was the first bridge to be painted in the bright orange colour that it still has today.',
          },
          {
            id: '5',
            text: 'Today, the longest bridge in the world is the Danyang-Kunshan Grand Bridge in China. It is 164 kilometres long, and it was opened in 2011. It is a railway bridge, and it carries trains between the cities of Shanghai and Nanjing. Building such a long bridge was very difficult, because the engineers had to build it across rivers, lakes and rice fields.',
          },
          {
            id: '6',
            text: 'In the future, engineers will use new materials, such as very strong steel and carbon fibre, to build even longer bridges. They will also use computers to design bridges that can stand up to strong winds and earthquakes. Bridges have changed a great deal over thousands of years, but they are still one of the most useful things that people build.',
          },
        ],
      },
      groups: [
        {
          id: 'm14r-g1',
          type: 'sentence-completion',
          instructions: 'Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          questions: [
            {
              id: 'm14r-q1',
              number: 1,
              prompt: 'The first bridges were often a tree across a river, or ___.',
              answer: { accepted: ['stones'] },
              explanation: { text: 'The first bridges were a tree across a river, or stones placed in a river.', evidence: { paragraphId: '1', quote: 'a tree across a river, or stones' } },
            },
            {
              id: 'm14r-q2',
              number: 2,
              prompt: 'The Romans used ___ to hold up the road.',
              answer: { accepted: ['arches'] },
              explanation: { text: 'The Romans used arches to hold up the road.', evidence: { paragraphId: '2', quote: 'used arches to hold up the road' } },
            },
            {
              id: 'm14r-q3',
              number: 3,
              prompt: 'The Pont du Gard carried ___ across a valley.',
              answer: { accepted: ['water'] },
              explanation: { text: 'The Pont du Gard carried water across a valley.', evidence: { paragraphId: '2', quote: 'carried water across a valley' } },
            },
            {
              id: 'm14r-q4',
              number: 4,
              prompt: 'The first iron bridge in the world was built in ___.',
              answer: { accepted: ['1779'] },
              explanation: { text: 'The first iron bridge in the world was built in 1779.', evidence: { paragraphId: '3', quote: 'was built in 1779' } },
            },
            {
              id: 'm14r-q5',
              number: 5,
              prompt: 'The Golden Gate Bridge opened in ___.',
              answer: { accepted: ['1937'] },
              explanation: { text: 'The Golden Gate Bridge opened in 1937.', evidence: { paragraphId: '4', quote: 'opened in 1937' } },
            },
          ],
        },
        {
          id: 'm14r-g2',
          type: 'true-false-not-given',
          instructions:
            'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
          questions: [
            {
              id: 'm14r-q6',
              number: 6,
              prompt: 'The first bridges were built by the Romans.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'People built bridges for thousands of years before the Romans began to build stone bridges.', evidence: { paragraphId: '1', quote: 'People have built bridges for thousands of years' } },
            },
            {
              id: 'm14r-q7',
              number: 7,
              prompt: 'The Pont du Gard is in France.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'The Pont du Gard is in France.', evidence: { paragraphId: '2', quote: 'the Pont du Gard in France' } },
            },
            {
              id: 'm14r-q8',
              number: 8,
              prompt: 'The first iron bridge was built in France.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'The first iron bridge was built at Ironbridge in England.', evidence: { paragraphId: '3', quote: 'at Ironbridge in England' } },
            },
            {
              id: 'm14r-q9',
              number: 9,
              prompt: 'The Golden Gate Bridge was the longest bridge in the world when it opened.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'When the Golden Gate Bridge opened, it was the longest bridge in the world.', evidence: { paragraphId: '4', quote: 'it was the longest bridge in the world' } },
            },
            {
              id: 'm14r-q10',
              number: 10,
              prompt: 'The Danyang-Kunshan Grand Bridge is used by trains.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'The Danyang-Kunshan Grand Bridge is a railway bridge and carries trains.', evidence: { paragraphId: '5', quote: 'It is a railway bridge' } },
            },
          ],
        },
        {
          id: 'm14r-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm14r-q11',
              number: 11,
              prompt: 'Why did the Romans use arches in their bridges?',
              options: [
                { id: 'A', text: 'Arches are strong and can hold up a heavy road.' },
                { id: 'B', text: 'Arches are easy to build from wood.' },
                { id: 'C', text: 'Arches were first used in China.' },
                { id: 'D', text: 'Arches are beautiful to look at.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Arches are strong and can hold up a heavy road.',
                evidence: { paragraphId: '2', quote: 'Arches are strong and can hold up a heavy road' },
              },
            },
            {
              id: 'm14r-q12',
              number: 12,
              prompt: 'What is special about the Danyang-Kunshan Grand Bridge?',
              options: [
                { id: 'A', text: 'It is 164 kilometres long.' },
                { id: 'B', text: 'It was built in 1779.' },
                { id: 'C', text: 'It is made of wood.' },
                { id: 'D', text: 'It is in San Francisco.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The Danyang-Kunshan Grand Bridge is 164 kilometres long.',
                evidence: { paragraphId: '5', quote: 'It is 164 kilometres long' },
              },
            },
            {
              id: 'm14r-q13',
              number: 13,
              prompt: 'What does the writer say about bridges in the future?',
              options: [
                { id: 'A', text: 'New materials will allow engineers to build even longer bridges.' },
                { id: 'B', text: 'Bridges will be made only of wood.' },
                { id: 'C', text: 'People will stop building bridges.' },
                { id: 'D', text: 'All bridges will be suspension bridges.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Engineers will use new materials to build even longer bridges.',
                evidence: { paragraphId: '6', quote: 'to build even longer bridges' },
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
        title: 'The Migration of Birds',
        paragraphs: [
          {
            id: 'A',
            labelled: true,
            text: 'Every year, millions of birds fly thousands of kilometres from one part of the world to another. This long journey is called migration. Some birds fly from cold countries in the north to warm countries in the south for the winter, and then they fly back again in the spring. Other birds fly across seas and deserts, and some of them fly without stopping for days.',
          },
          {
            id: 'B',
            labelled: true,
            text: 'Why do birds migrate? The main reason is food. In winter, food is hard to find in the north, because the ground is cold and many insects have died. In the south, the weather is warmer, and there is more food for the birds to eat. Birds also migrate to find safe places to have their young: in the north in summer, there are long days and plenty of food for young birds.',
          },
          {
            id: 'C',
            labelled: true,
            text: 'How do birds find their way on such a long journey? Scientists have found that birds use the sun and the stars to find their way, and they can also feel the magnetic field of the Earth. Young birds learn the route from their parents, and they follow older birds on their first journey. After that, they can remember the route and fly it alone.',
          },
          {
            id: 'D',
            labelled: true,
            text: 'One of the most amazing birds is the Arctic tern, which has the longest migration of any bird. Every year, the Arctic tern flies from the Arctic, near the North Pole, to the Antarctic, near the South Pole, and then back again. It flies about 70,000 kilometres each year, which is further than any other animal on Earth.',
          },
          {
            id: 'E',
            labelled: true,
            text: 'The journey is dangerous for many birds. Storms can blow birds far from their route, and many birds die when they cannot find food or water. Birds also lose their resting places, because wetlands are drained to make space for farms and towns. Tall buildings with bright lights can also be dangerous, because birds fly into them at night.',
          },
          {
            id: 'F',
            labelled: true,
            text: 'Scientists study migration by putting small rings on the legs of birds, and by using small tracking devices that show where the birds fly. This work has taught us a great deal about the routes that birds take and the places where they stop to rest. Without this work, we would know very little about the long journeys of birds.',
          },
          {
            id: 'G',
            labelled: true,
            text: 'The future of bird migration depends on what we do now. If we protect the wetlands and other places where birds rest, and if countries work together to protect the routes that birds fly, migration can continue for many years. Birds do not know about the borders between countries, so the work to protect them must be done by many countries together.',
          },
        ],
      },
      groups: [
        {
          id: 'm14r-g4',
          type: 'matching-headings',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings below.',
          optionsTitle: 'List of Headings',
          options: [
            { id: 'i', text: 'Why birds fly south in winter' },
            { id: 'ii', text: 'How birds find their way' },
            { id: 'iii', text: 'The bird with the longest journey' },
            { id: 'iv', text: 'Dangers on the journey' },
            { id: 'v', text: 'How scientists follow the birds' },
            { id: 'vi', text: 'What migration is' },
            { id: 'vii', text: 'The future of migration' },
            { id: 'viii', text: 'Birds that do not migrate' },
          ],
          questions: [
            {
              id: 'm14r-q14',
              number: 14,
              prompt: 'Paragraph B',
              answer: { accepted: ['i'] },
              explanation: { text: 'The paragraph says that in winter, food is hard to find in the north, so birds fly south.', evidence: { paragraphId: 'B', quote: 'food is hard to find in the north' } },
            },
            {
              id: 'm14r-q15',
              number: 15,
              prompt: 'Paragraph C',
              answer: { accepted: ['ii'] },
              explanation: { text: 'The paragraph says that birds use the sun and the stars to find their way.', evidence: { paragraphId: 'C', quote: 'use the sun and the stars to find their way' } },
            },
            {
              id: 'm14r-q16',
              number: 16,
              prompt: 'Paragraph D',
              answer: { accepted: ['iii'] },
              explanation: { text: 'The paragraph describes the Arctic tern, which has the longest migration of any bird.', evidence: { paragraphId: 'D', quote: 'the longest migration of any bird' } },
            },
            {
              id: 'm14r-q17',
              number: 17,
              prompt: 'Paragraph E',
              answer: { accepted: ['iv'] },
              explanation: { text: 'The paragraph says that the journey is dangerous for many birds.', evidence: { paragraphId: 'E', quote: 'The journey is dangerous for many birds' } },
            },
            {
              id: 'm14r-q18',
              number: 18,
              prompt: 'Paragraph F',
              answer: { accepted: ['v'] },
              explanation: { text: 'The paragraph says that scientists study migration by putting small rings on the legs of birds.', evidence: { paragraphId: 'F', quote: 'Scientists study migration by putting small rings on the legs of birds' } },
            },
          ],
        },
        {
          id: 'm14r-g5',
          type: 'table-completion',
          instructions: 'Complete the table below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          table: {
            headers: ['Topic', 'Detail'],
            rows: [
              ['Arctic tern', 'It flies about {{19}} kilometres each year'],
              ['Young birds', 'They learn the route from their {{20}}'],
              ['Danger', 'Wetlands are drained, so birds lose their resting {{21}}'],
              ['Study', 'Scientists put small {{22}} on the legs of birds'],
            ],
          },
          questions: [
            { id: 'm14r-q19', number: 19, answer: { accepted: ['70,000', '70000'] }, explanation: { text: 'The Arctic tern flies about 70,000 kilometres each year.', evidence: { paragraphId: 'D', quote: 'about 70,000 kilometres each year' } } },
            { id: 'm14r-q20', number: 20, answer: { accepted: ['parents'] }, explanation: { text: 'Young birds learn the route from their parents.', evidence: { paragraphId: 'C', quote: 'Young birds learn the route from their parents' } } },
            { id: 'm14r-q21', number: 21, answer: { accepted: ['places'] }, explanation: { text: 'Birds lose their resting places when wetlands are drained.', evidence: { paragraphId: 'E', quote: 'Birds also lose their resting places' } } },
            { id: 'm14r-q22', number: 22, answer: { accepted: ['rings'] }, explanation: { text: 'Scientists put small rings on the legs of birds.', evidence: { paragraphId: 'F', quote: 'putting small rings on the legs of birds' } } },
          ],
        },
        {
          id: 'm14r-g6',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO things help birds to find their way on their journey?',
          choose: 2,
          options: [
            { id: 'A', text: 'The sun and the stars.' },
            { id: 'B', text: 'The magnetic field of the Earth.' },
            { id: 'C', text: 'Maps made by scientists.' },
            { id: 'D', text: 'Roads and railway lines.' },
            { id: 'E', text: 'Tall buildings with bright lights.' },
          ],
          questions: [
            { id: 'm14r-q23', number: 23, answer: { accepted: ['A'] }, explanation: { text: 'Birds use the sun and the stars to find their way.', evidence: { paragraphId: 'C', quote: 'use the sun and the stars to find their way' } } },
            { id: 'm14r-q24', number: 24, answer: { accepted: ['B'] }, explanation: { text: 'Birds can also feel the magnetic field of the Earth.', evidence: { paragraphId: 'C', quote: 'they can also feel the magnetic field of the Earth' } } },
          ],
        },
        {
          id: 'm14r-g7',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO dangers for birds does the writer mention in paragraph E?',
          choose: 2,
          options: [
            { id: 'A', text: 'Storms can blow birds far from their route.' },
            { id: 'B', text: 'Birds lose their resting places.' },
            { id: 'C', text: 'There is too much food in the south.' },
            { id: 'D', text: 'The weather is too warm.' },
            { id: 'E', text: 'Farmers are friendly to birds.' },
          ],
          questions: [
            { id: 'm14r-q25', number: 25, answer: { accepted: ['A'] }, explanation: { text: 'Storms can blow birds far from their route.', evidence: { paragraphId: 'E', quote: 'Storms can blow birds far from their route' } } },
            { id: 'm14r-q26', number: 26, answer: { accepted: ['B'] }, explanation: { text: 'Birds lose their resting places when wetlands are drained.', evidence: { paragraphId: 'E', quote: 'Birds also lose their resting places' } } },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 3
    {
      id: 'r3',
      number: 3,
      passage: {
        title: 'Should University Be Free?',
        paragraphs: [
          {
            id: '1',
            text: 'In many countries, students must pay a lot of money to go to university. In some countries, the cost is so high that many young people cannot go to university at all. This has led to an important question: should university be free for everyone?',
          },
          {
            id: '2',
            text: 'Supporters of free university say that education is a right, not something that only rich people can buy. They say that free university would help students from poor families, and that if more young people go to university, the country will have more doctors, teachers and engineers. A country with more educated workers, they say, will be richer and stronger.',
          },
          {
            id: '3',
            text: 'Other people disagree. They say that free university would be very expensive for the government. If university were free, the government would have to pay for it, and taxes would have to rise. They also say that some students do not work hard if they do not pay for their education, because they do not feel that they have anything to lose.',
          },
          {
            id: '4',
            text: 'In some countries, university is already free. In Germany and Norway, for example, students pay no fees at university, and the government pays for their education. These countries believe that free university is good for everyone, not only for students. However, even in these countries, the cost of university is very high for the government.',
          },
          {
            id: '5',
            text: 'There is another problem. Even where university is free, students still need money for food and rent, and for books and travel. Many students in Germany and Norway have to work while they study, or they have to borrow money from the bank. So free university does not solve every problem for students.',
          },
          {
            id: '6',
            text: 'What can be done about these problems? One idea is for the government to give money to students from poor families, so that they can pay for university and for their living costs. Another idea is for universities to spend less money, for example by using more online classes. A third idea is for students to pay back the cost of their education slowly, after they start work and earn money.',
          },
          {
            id: '7',
            text: 'In my view, university should be free for students from poor families, but richer students should pay something. This would help poor students to go to university, and it would also mean that the government does not have to pay for everyone. The important thing is to find a balance, so that every young person who wants to go to university can go, whatever their family income.',
          },
        ],
      },
      groups: [
        {
          id: 'm14r-g8',
          type: 'yes-no-not-given',
          instructions:
            'Do the following statements agree with the claims of the writer in Reading Passage 3? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
          questions: [
            {
              id: 'm14r-q27',
              number: 27,
              prompt: 'In many countries, students must pay a lot of money to go to university.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'In many countries, students must pay a lot of money to go to university.', evidence: { paragraphId: '1', quote: 'students must pay a lot of money to go to university' } },
            },
            {
              id: 'm14r-q28',
              number: 28,
              prompt: 'Free university would help students from poor families.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Free university would help students from poor families.', evidence: { paragraphId: '2', quote: 'free university would help students from poor families' } },
            },
            {
              id: 'm14r-q29',
              number: 29,
              prompt: 'If university were free, taxes would fall.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'If university were free, taxes would have to rise.', evidence: { paragraphId: '3', quote: 'taxes would have to rise' } },
            },
            {
              id: 'm14r-q30',
              number: 30,
              prompt: 'In Germany and Norway, students pay no fees at university.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'In Germany and Norway, students pay no fees at university.', evidence: { paragraphId: '4', quote: 'students pay no fees at university' } },
            },
            {
              id: 'm14r-q31',
              number: 31,
              prompt: 'The writer believes university education should be free in every country in the world.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: { text: 'The writer says university should be free for students from poor families, but does not say it should be free in every country.', evidence: { paragraphId: '7', quote: 'university should be free for students from poor families' } },
            },
          ],
        },
        {
          id: 'm14r-g9',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm14r-q32',
              number: 32,
              prompt: 'What do supporters of free university say?',
              options: [
                { id: 'A', text: 'Education is a right, not something that only rich people can buy.' },
                { id: 'B', text: 'Universities should be closed.' },
                { id: 'C', text: 'Only rich people should go to university.' },
                { id: 'D', text: 'Students should pay more money for university.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Supporters say that education is a right, not something that only rich people can buy.',
                evidence: { paragraphId: '2', quote: 'education is a right, not something that only rich people can buy' },
              },
            },
            {
              id: 'm14r-q33',
              number: 33,
              prompt: 'What do opponents say about the cost of free university?',
              options: [
                { id: 'A', text: 'Free university would be very expensive for the government.' },
                { id: 'B', text: 'Free university would be cheap for the government.' },
                { id: 'C', text: 'Free university would cost nothing.' },
                { id: 'D', text: 'Free university would make taxes fall.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Opponents say that free university would be very expensive for the government.',
                evidence: { paragraphId: '3', quote: 'free university would be very expensive for the government' },
              },
            },
            {
              id: 'm14r-q34',
              number: 34,
              prompt: 'What problem does the writer mention about free university in Germany and Norway?',
              options: [
                { id: 'A', text: 'Students still need money for food and rent.' },
                { id: 'B', text: 'Students pay very high fees.' },
                { id: 'C', text: 'Students do not have to study.' },
                { id: 'D', text: 'Students cannot borrow money from the bank.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Even where university is free, students still need money for food and rent.',
                evidence: { paragraphId: '5', quote: 'students still need money for food and rent' },
              },
            },
            {
              id: 'm14r-q35',
              number: 35,
              prompt: "What is the writer's view?",
              options: [
                { id: 'A', text: 'University should be free for students from poor families, but richer students should pay something.' },
                { id: 'B', text: 'All university education should be free for everyone.' },
                { id: 'C', text: 'No young person should go to university.' },
                { id: 'D', text: 'Universities should charge students more money.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'University should be free for students from poor families, but richer students should pay something.',
                evidence: { paragraphId: '7', quote: 'university should be free for students from poor families, but richer students should pay something' },
              },
            },
          ],
        },
        {
          id: 'm14r-g10',
          type: 'matching-sentence-endings',
          instructions: 'Complete each sentence with the correct ending, A–H.',
          optionsTitle: 'List of Endings',
          options: [
            { id: 'A', text: 'the country will have more doctors, teachers and engineers.' },
            { id: 'B', text: 'taxes would have to rise to pay for it.' },
            { id: 'C', text: 'students pay no fees at university.' },
            { id: 'D', text: 'students still need money for food and rent.' },
            { id: 'E', text: 'students from poor families should pay nothing, but richer students should pay something.' },
            { id: 'F', text: 'some students do not work hard if they do not pay for their education.' },
            { id: 'G', text: 'universities could spend less money, for example by using more online classes.' },
            { id: 'H', text: 'education is a right, not something that only rich people can buy.' },
          ],
          questions: [
            { id: 'm14r-q36', number: 36, prompt: 'Supporters of free university say that', answer: { accepted: ['H'] }, explanation: { text: 'Supporters say that education is a right, not something that only rich people can buy.', evidence: { paragraphId: '2', quote: 'education is a right, not something that only rich people can buy' } } },
            { id: 'm14r-q37', number: 37, prompt: 'If more young people go to university,', answer: { accepted: ['A'] }, explanation: { text: 'If more young people go to university, the country will have more doctors, teachers and engineers.', evidence: { paragraphId: '2', quote: 'the country will have more doctors, teachers and engineers' } } },
            { id: 'm14r-q38', number: 38, prompt: 'If university were free,', answer: { accepted: ['B'] }, explanation: { text: 'If university were free, taxes would have to rise to pay for it.', evidence: { paragraphId: '3', quote: 'taxes would have to rise' } } },
            { id: 'm14r-q39', number: 39, prompt: 'In Germany and Norway,', answer: { accepted: ['C'] }, explanation: { text: 'In Germany and Norway, students pay no fees at university.', evidence: { paragraphId: '4', quote: 'students pay no fees at university' } } },
            { id: 'm14r-q40', number: 40, prompt: 'Even where university is free,', answer: { accepted: ['D'] }, explanation: { text: 'Even where university is free, students still need money for food and rent.', evidence: { paragraphId: '5', quote: 'students still need money for food and rent' } } },
          ],
        },
      ],
    },
  ],
};
