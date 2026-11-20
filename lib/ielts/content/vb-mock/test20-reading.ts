import type { ObjectiveSection } from '../../model';

/**
 * Mino Academic Mock Test 20 — Reading. Three original passages written
 * for Mino at IELTS Academic level (40 questions, 60 minutes).
 * Not Cambridge material. All passages, questions and answers are
 * original and were written fresh for this mock test.
 */
export const mock20Reading: ObjectiveSection = {
  skill: 'reading',
  timeLimitMinutes: 60,
  parts: [
    // ------------------------------------------------------------- Passage 1
    {
      id: 'r1',
      number: 1,
      passage: {
        title: 'The History of the Alphabet and Writing',
        paragraphs: [
          {
            id: '1',
            text: 'Writing is one of the most important inventions in human history. Before people could write, they had to remember everything, and stories and laws were passed from one person to another by speaking. With writing, people could keep records, send messages over long distances, and store knowledge for future generations.',
          },
          {
            id: '2',
            text: 'The first writing was made about five thousand years ago, in a place called Mesopotamia, in the land that is now Iraq. People there pressed pictures into wet clay with a sharp stick. These pictures stood for things like grain, sheep and jars of oil, and they were used to keep records of trade.',
          },
          {
            id: '3',
            text: 'Later, the people of Mesopotamia began to use wedge-shaped marks instead of pictures. This writing is called cuneiform, from the Latin word for wedge. Cuneiform was written on clay tablets, and it was used for more than three thousand years.',
          },
          {
            id: '4',
            text: 'In Egypt, people wrote with pictures called hieroglyphs. Hieroglyphs were carved into stone on the walls of temples and tombs, and they were also painted on paper made from a plant called papyrus. Only a small number of people, called scribes, could read and write hieroglyphs.',
          },
          {
            id: '5',
            text: 'The alphabet was a great change in writing. Instead of a different picture for every word, an alphabet uses a small number of letters, and each letter stands for a sound. The first alphabet was made by traders called the Phoenicians, about three thousand years ago, and it had twenty-two letters.',
          },
          {
            id: '6',
            text: 'The Phoenician alphabet was taken up by the Greeks, who added letters for vowel sounds, and the Romans later changed the Greek letters into the Latin alphabet. The Latin alphabet is the one used for English today, and it is also used for many other languages around the world.',
          },
        ],
      },
      groups: [
        {
          id: 'm20r-g1',
          type: 'sentence-completion',
          instructions: 'Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          questions: [
            {
              id: 'm20r-q1',
              number: 1,
              prompt: 'The first writing was made about five thousand years ago, in a place called ___.',
              answer: { accepted: ['Mesopotamia'] },
              explanation: { text: 'The first writing was made in a place called Mesopotamia.', evidence: { paragraphId: '2', quote: 'in a place called Mesopotamia' } },
            },
            {
              id: 'm20r-q2',
              number: 2,
              prompt: 'The first pictures were pressed into wet ___ with a sharp stick.',
              answer: { accepted: ['clay'] },
              explanation: { text: 'People pressed pictures into wet clay with a sharp stick.', evidence: { paragraphId: '2', quote: 'pressed pictures into wet clay' } },
            },
            {
              id: 'm20r-q3',
              number: 3,
              prompt: 'Cuneiform was written on clay ___.',
              answer: { accepted: ['tablets'] },
              explanation: { text: 'Cuneiform was written on clay tablets.', evidence: { paragraphId: '3', quote: 'written on clay tablets' } },
            },
            {
              id: 'm20r-q4',
              number: 4,
              prompt: 'Hieroglyphs were also painted on paper made from a plant called ___.',
              answer: { accepted: ['papyrus'] },
              explanation: { text: 'Hieroglyphs were painted on paper made from a plant called papyrus.', evidence: { paragraphId: '4', quote: 'paper made from a plant called papyrus' } },
            },
            {
              id: 'm20r-q5',
              number: 5,
              prompt: 'The first alphabet had twenty-two ___.',
              answer: { accepted: ['letters'] },
              explanation: { text: 'The first alphabet had twenty-two letters.', evidence: { paragraphId: '5', quote: 'it had twenty-two letters' } },
            },
          ],
        },
        {
          id: 'm20r-g2',
          type: 'true-false-not-given',
          instructions:
            'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
          questions: [
            {
              id: 'm20r-q6',
              number: 6,
              prompt: 'Before people could write, stories and laws were passed on by speaking.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'Stories and laws were passed from one person to another by speaking.', evidence: { paragraphId: '1', quote: 'stories and laws were passed from one person to another by speaking' } },
            },
            {
              id: 'm20r-q7',
              number: 7,
              prompt: 'The first writing was used to keep records of trade.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'The first pictures were used to keep records of trade.', evidence: { paragraphId: '2', quote: 'they were used to keep records of trade' } },
            },
            {
              id: 'm20r-q8',
              number: 8,
              prompt: 'Cuneiform was used for less than one thousand years.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'Cuneiform was used for more than three thousand years.', evidence: { paragraphId: '3', quote: 'it was used for more than three thousand years' } },
            },
            {
              id: 'm20r-q9',
              number: 9,
              prompt: 'In Egypt, everyone could read and write hieroglyphs.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'Only a small number of people, called scribes, could read and write hieroglyphs.', evidence: { paragraphId: '4', quote: 'Only a small number of people, called scribes, could read and write hieroglyphs' } },
            },
            {
              id: 'm20r-q10',
              number: 10,
              prompt: 'The Phoenicians invented paper.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: { text: 'The passage does not say who invented paper.', evidence: { paragraphId: '5', quote: 'The first alphabet was made by traders called the Phoenicians' } },
            },
          ],
        },
        {
          id: 'm20r-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm20r-q11',
              number: 11,
              prompt: 'What was the first writing used for?',
              options: [
                { id: 'A', text: 'keeping records of trade' },
                { id: 'B', text: 'writing stories for children' },
                { id: 'C', text: 'sending letters to other countries' },
                { id: 'D', text: 'making laws for kings' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The first pictures were used to keep records of trade.',
                evidence: { paragraphId: '2', quote: 'they were used to keep records of trade' },
              },
            },
            {
              id: 'm20r-q12',
              number: 12,
              prompt: 'What does the writer say about the alphabet?',
              options: [
                { id: 'A', text: 'It uses a different picture for every word.' },
                { id: 'B', text: 'It uses a small number of letters, and each letter stands for a sound.' },
                { id: 'C', text: 'It was invented in Egypt.' },
                { id: 'D', text: 'It has more than one hundred letters.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'An alphabet uses a small number of letters, and each letter stands for a sound.',
                evidence: { paragraphId: '5', quote: 'an alphabet uses a small number of letters, and each letter stands for a sound' },
              },
            },
            {
              id: 'm20r-q13',
              number: 13,
              prompt: 'Which alphabet is used for English today?',
              options: [
                { id: 'A', text: 'the Phoenician alphabet' },
                { id: 'B', text: 'the Greek alphabet' },
                { id: 'C', text: 'the Latin alphabet' },
                { id: 'D', text: 'cuneiform' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'The Latin alphabet is the one used for English today.',
                evidence: { paragraphId: '6', quote: 'The Latin alphabet is the one used for English today' },
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
        title: 'The Arctic',
        paragraphs: [
          {
            id: 'A',
            labelled: true,
            text: 'The Arctic is the region around the North Pole. It is a cold and icy place, but it is not empty. About four million people live in the Arctic, in eight countries, and many animals, such as polar bears, seals and whales, live there too. The Arctic Ocean is covered with ice for most of the year, and in winter, there is almost no daylight.',
          },
          {
            id: 'B',
            labelled: true,
            text: 'The ice in the Arctic is changing. In the last forty years, the ice in summer has become much smaller, because the air and the sea are getting warmer. Scientists say that the Arctic is warming twice as fast as the rest of the world. In some years, large areas of sea ice melt in summer, and ships can sail through waters that were once blocked by ice.',
          },
          {
            id: 'C',
            labelled: true,
            text: 'The melting ice is a problem for animals. Polar bears hunt seals on the sea ice, and when the ice melts early, the bears have less time to hunt and less food to eat. Seals also need the ice, because they give birth to their young on the ice, and young seals rest on the ice while their mothers hunt for fish.',
          },
          {
            id: 'D',
            labelled: true,
            text: 'The Arctic is also home to people who have lived there for thousands of years. These people, called the Inuit and other Indigenous peoples, hunt, fish and travel on the ice. They have a deep knowledge of the ice and the weather, and this knowledge is passed from parents to children. Now, as the ice changes, their old ways of travelling and hunting are becoming more dangerous.',
          },
          {
            id: 'E',
            labelled: true,
            text: 'There is another change in the Arctic: more ships and more people are coming. As the ice melts, ships can carry oil, gas and other goods through the Arctic, and the journey is much shorter than the journey through warm seas. However, if a ship has an accident in the icy water, it is very hard to help the people on the ship, because help is far away.',
          },
          {
            id: 'F',
            labelled: true,
            text: 'The Arctic also holds large amounts of oil and gas under the sea. Some countries want to take this oil and gas out of the sea, but many scientists say that this is dangerous. If oil spills into the icy sea, it is very difficult to clean up, and the oil can harm animals and fish for many years.',
          },
          {
            id: 'G',
            labelled: true,
            text: 'In conclusion, the Arctic is changing fast. The ice is melting, animals and people are facing new problems, and more ships are coming to the region. Scientists say that what happens in the Arctic will affect the whole world, because the ice helps to keep the Earth cool, and the melting ice can raise the level of the sea.',
          },
        ],
      },
      groups: [
        {
          id: 'm20r-g4',
          type: 'matching-headings',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings below.',
          optionsTitle: 'List of Headings',
          options: [
            { id: 'i', text: 'The ice is getting smaller' },
            { id: 'ii', text: 'Animals in danger' },
            { id: 'iii', text: 'People of the ice' },
            { id: 'iv', text: 'More ships in the north' },
            { id: 'v', text: 'Oil and gas under the sea' },
            { id: 'vi', text: 'The coldest place on Earth' },
            { id: 'vii', text: 'Life in the Arctic' },
            { id: 'viii', text: 'A short cut for ships' },
          ],
          questions: [
            {
              id: 'm20r-q14',
              number: 14,
              prompt: 'Paragraph B',
              answer: { accepted: ['i'] },
              explanation: { text: 'The paragraph is about the ice getting smaller in summer.', evidence: { paragraphId: 'B', quote: 'the ice in summer has become much smaller' } },
            },
            {
              id: 'm20r-q15',
              number: 15,
              prompt: 'Paragraph C',
              answer: { accepted: ['ii'] },
              explanation: { text: 'The paragraph is about how the melting ice is a problem for animals.', evidence: { paragraphId: 'C', quote: 'The melting ice is a problem for animals' } },
            },
            {
              id: 'm20r-q16',
              number: 16,
              prompt: 'Paragraph D',
              answer: { accepted: ['iii'] },
              explanation: { text: 'The paragraph is about the people who live on the ice.', evidence: { paragraphId: 'D', quote: 'These people, called the Inuit and other Indigenous peoples, hunt, fish and travel on the ice' } },
            },
            {
              id: 'm20r-q17',
              number: 17,
              prompt: 'Paragraph E',
              answer: { accepted: ['iv'] },
              explanation: { text: 'The paragraph is about more ships coming to the Arctic.', evidence: { paragraphId: 'E', quote: 'more ships and more people are coming' } },
            },
            {
              id: 'm20r-q18',
              number: 18,
              prompt: 'Paragraph F',
              answer: { accepted: ['v'] },
              explanation: { text: 'The paragraph is about the oil and gas under the sea.', evidence: { paragraphId: 'F', quote: 'The Arctic also holds large amounts of oil and gas under the sea' } },
            },
          ],
        },
        {
          id: 'm20r-g5',
          type: 'table-completion',
          instructions: 'Complete the table below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          table: {
            headers: ['Change', 'Detail'],
            rows: [
              ['Melting ice', 'The Arctic is warming twice as fast as the rest of the {{19}}'],
              ['Polar bears', 'Polar bears hunt {{20}} on the sea ice'],
              ['Indigenous peoples', 'Their knowledge of the ice and the weather is passed from parents to {{21}}'],
              ['Ships', 'The journey through the Arctic is much {{22}} than the journey through warm seas'],
            ],
          },
          questions: [
            { id: 'm20r-q19', number: 19, answer: { accepted: ['world'] }, explanation: { text: 'The Arctic is warming twice as fast as the rest of the world.', evidence: { paragraphId: 'B', quote: 'twice as fast as the rest of the world' } } },
            { id: 'm20r-q20', number: 20, answer: { accepted: ['seals'] }, explanation: { text: 'Polar bears hunt seals on the sea ice.', evidence: { paragraphId: 'C', quote: 'Polar bears hunt seals on the sea ice' } } },
            { id: 'm20r-q21', number: 21, answer: { accepted: ['children'] }, explanation: { text: 'This knowledge is passed from parents to children.', evidence: { paragraphId: 'D', quote: 'passed from parents to children' } } },
            { id: 'm20r-q22', number: 22, answer: { accepted: ['shorter'] }, explanation: { text: 'The journey through the Arctic is much shorter than the journey through warm seas.', evidence: { paragraphId: 'E', quote: 'the journey is much shorter than the journey through warm seas' } } },
          ],
        },
        {
          id: 'm20r-g6',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO things does the writer say about the sea ice?',
          choose: 2,
          options: [
            { id: 'A', text: 'The ice in summer has become much smaller.' },
            { id: 'B', text: 'Ships can sail through waters that were once blocked by ice.' },
            { id: 'C', text: 'The ice is growing bigger every year.' },
            { id: 'D', text: 'The Arctic is warming more slowly than the rest of the world.' },
            { id: 'E', text: 'There is daylight all winter in the Arctic.' },
          ],
          questions: [
            { id: 'm20r-q23', number: 23, answer: { accepted: ['A'] }, explanation: { text: 'The ice in summer has become much smaller.', evidence: { paragraphId: 'B', quote: 'the ice in summer has become much smaller' } } },
            { id: 'm20r-q24', number: 24, answer: { accepted: ['B'] }, explanation: { text: 'Ships can sail through waters that were once blocked by ice.', evidence: { paragraphId: 'B', quote: 'ships can sail through waters that were once blocked by ice' } } },
          ],
        },
        {
          id: 'm20r-g7',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO things does the writer say about oil and gas in the Arctic?',
          choose: 2,
          options: [
            { id: 'A', text: 'The Arctic holds large amounts of oil and gas under the sea.' },
            { id: 'B', text: 'If oil spills into the icy sea, it is very difficult to clean up.' },
            { id: 'C', text: 'Taking oil out of the sea is safe.' },
            { id: 'D', text: 'Oil spills help animals and fish.' },
            { id: 'E', text: 'No countries want the oil and gas.' },
          ],
          questions: [
            { id: 'm20r-q25', number: 25, answer: { accepted: ['A'] }, explanation: { text: 'The Arctic holds large amounts of oil and gas under the sea.', evidence: { paragraphId: 'F', quote: 'The Arctic also holds large amounts of oil and gas under the sea' } } },
            { id: 'm20r-q26', number: 26, answer: { accepted: ['B'] }, explanation: { text: 'If oil spills into the icy sea, it is very difficult to clean up.', evidence: { paragraphId: 'F', quote: 'If oil spills into the icy sea, it is very difficult to clean up' } } },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 3
    {
      id: 'r3',
      number: 3,
      passage: {
        title: 'The Future of Cities',
        paragraphs: [
          {
            id: '1',
            text: 'By the year 2050, about seven in ten people in the world will live in cities. Today, about half of the people in the world live in cities, and the number is growing every year. Cities give people jobs, schools and hospitals, but they also have problems, such as traffic, dirty air and a lack of homes.',
          },
          {
            id: '2',
            text: 'One problem is traffic. In many large cities, cars move very slowly, and people spend hours every week in traffic jams. Some cities are trying to solve this problem by building better buses and trains, and by making it easier for people to walk or ride bicycles. In the city of Copenhagen, for example, more people ride bicycles than drive cars.',
          },
          {
            id: '3',
            text: 'Another problem is air. Cars and factories make the air dirty, and dirty air can make people ill. In some cities, the government has made rules that stop the dirtiest cars from entering the centre of the city. In London, drivers must pay money to drive into the centre, and this has helped to make the air cleaner.',
          },
          {
            id: '4',
            text: 'A third problem is homes. In many cities, there are not enough homes, and the price of a home is very high. Some cities are building tall buildings with many small flats, and other cities are building new towns near the city, with fast trains to carry people to work.',
          },
          {
            id: '5',
            text: 'Technology may help cities in the future. In some cities, lights and traffic signals are already controlled by computers, and this helps traffic to move more quickly. In the future, driverless cars may carry people around the city, and small flying vehicles may carry people over the traffic. However, these new machines will be expensive, and not everyone will be able to use them.',
          },
          {
            id: '6',
            text: 'Some people think that the city of the future will be greener. There will be more parks, more trees on the roofs of buildings, and more gardens where people can grow food. Green spaces help to clean the air, and they give people a place to walk, play and rest. In Singapore, for example, many buildings have plants growing on their walls and roofs.',
          },
          {
            id: '7',
            text: 'In my view, the city of the future will be different from the city of today, but it will not be perfect. Better buses and trains, cleaner air and more homes will help, but cities will still have problems. The most important thing is to plan cities carefully, so that they are good places for all the people who live in them.',
          },
        ],
      },
      groups: [
        {
          id: 'm20r-g8',
          type: 'yes-no-not-given',
          instructions:
            'Do the following statements agree with the claims of the writer in Reading Passage 3? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
          questions: [
            {
              id: 'm20r-q27',
              number: 27,
              prompt: 'By the year 2050, about seven in ten people in the world will live in cities.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'By 2050, about seven in ten people will live in cities.', evidence: { paragraphId: '1', quote: 'By the year 2050, about seven in ten people in the world will live in cities' } },
            },
            {
              id: 'm20r-q28',
              number: 28,
              prompt: 'In Copenhagen, more people ride bicycles than drive cars.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'In Copenhagen, more people ride bicycles than drive cars.', evidence: { paragraphId: '2', quote: 'more people ride bicycles than drive cars' } },
            },
            {
              id: 'm20r-q29',
              number: 29,
              prompt: 'In London, drivers must pay money to drive into the centre.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'In London, drivers must pay money to drive into the centre.', evidence: { paragraphId: '3', quote: 'In London, drivers must pay money to drive into the centre' } },
            },
            {
              id: 'm20r-q30',
              number: 30,
              prompt: 'Driverless cars are already carrying people around cities.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'Driverless cars may carry people around the city in the future, not now.', evidence: { paragraphId: '5', quote: 'In the future, driverless cars may carry people around the city' } },
            },
            {
              id: 'm20r-q31',
              number: 31,
              prompt: 'In Singapore, many buildings have plants growing on their walls and roofs.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'In Singapore, many buildings have plants growing on their walls and roofs.', evidence: { paragraphId: '6', quote: 'many buildings have plants growing on their walls and roofs' } },
            },
          ],
        },
        {
          id: 'm20r-g9',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm20r-q32',
              number: 32,
              prompt: 'What does the writer say about traffic in many large cities?',
              options: [
                { id: 'A', text: 'People spend hours every week in traffic jams.' },
                { id: 'B', text: 'Traffic is not a problem in cities.' },
                { id: 'C', text: 'All cities have solved the traffic problem.' },
                { id: 'D', text: 'People never drive in cities.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'People spend hours every week in traffic jams.',
                evidence: { paragraphId: '2', quote: 'people spend hours every week in traffic jams' },
              },
            },
            {
              id: 'm20r-q33',
              number: 33,
              prompt: 'What has helped to make the air cleaner in London?',
              options: [
                { id: 'A', text: 'building more roads' },
                { id: 'B', text: 'drivers paying money to drive into the centre' },
                { id: 'C', text: 'stopping all cars in the city' },
                { id: 'D', text: 'building more factories' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Drivers must pay money to drive into the centre, and this has helped to make the air cleaner.',
                evidence: { paragraphId: '3', quote: 'this has helped to make the air cleaner' },
              },
            },
            {
              id: 'm20r-q34',
              number: 34,
              prompt: 'What does the writer say about new technology for cities?',
              options: [
                { id: 'A', text: 'It will be cheap for everyone.' },
                { id: 'B', text: 'Driverless cars and flying vehicles may help, but they will be expensive.' },
                { id: 'C', text: 'Computers already control all traffic in every city.' },
                { id: 'D', text: 'Technology cannot help cities at all.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'These new machines will be expensive, and not everyone will be able to use them.',
                evidence: { paragraphId: '5', quote: 'these new machines will be expensive, and not everyone will be able to use them' },
              },
            },
            {
              id: 'm20r-q35',
              number: 35,
              prompt: "What is the writer's view?",
              options: [
                { id: 'A', text: 'The city of the future will be perfect.' },
                { id: 'B', text: 'Planning cities carefully is the most important thing.' },
                { id: 'C', text: 'Cities should not have parks.' },
                { id: 'D', text: 'People should leave cities.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The most important thing is to plan cities carefully.',
                evidence: { paragraphId: '7', quote: 'The most important thing is to plan cities carefully' },
              },
            },
          ],
        },
        {
          id: 'm20r-g10',
          type: 'matching-sentence-endings',
          instructions: 'Complete each sentence with the correct ending, A–H.',
          optionsTitle: 'List of Endings',
          options: [
            { id: 'A', text: 'spend hours every week in traffic jams.' },
            { id: 'B', text: 'must pay money to drive into the centre.' },
            { id: 'C', text: 'helps traffic to move more quickly.' },
            { id: 'D', text: 'will be expensive, and not everyone will be able to use them.' },
            { id: 'E', text: 'help to clean the air.' },
            { id: 'F', text: 'are good places for all the people who live in them.' },
            { id: 'G', text: 'will be different from the city of today, but it will not be perfect.' },
            { id: 'H', text: 'have plants growing on their walls and roofs.' },
          ],
          questions: [
            { id: 'm20r-q36', number: 36, prompt: 'People in many large cities', answer: { accepted: ['A'] }, explanation: { text: 'People in many large cities spend hours every week in traffic jams.', evidence: { paragraphId: '2', quote: 'people spend hours every week in traffic jams' } } },
            { id: 'm20r-q37', number: 37, prompt: 'In London, drivers', answer: { accepted: ['B'] }, explanation: { text: 'In London, drivers must pay money to drive into the centre.', evidence: { paragraphId: '3', quote: 'drivers must pay money to drive into the centre' } } },
            { id: 'm20r-q38', number: 38, prompt: 'Lights and traffic signals controlled by computers', answer: { accepted: ['C'] }, explanation: { text: 'Lights and traffic signals controlled by computers help traffic to move more quickly.', evidence: { paragraphId: '5', quote: 'this helps traffic to move more quickly' } } },
            { id: 'm20r-q39', number: 39, prompt: 'These new machines', answer: { accepted: ['D'] }, explanation: { text: 'These new machines will be expensive, and not everyone will be able to use them.', evidence: { paragraphId: '5', quote: 'these new machines will be expensive, and not everyone will be able to use them' } } },
            { id: 'm20r-q40', number: 40, prompt: 'The city of the future', answer: { accepted: ['G'] }, explanation: { text: 'The city of the future will be different from the city of today, but it will not be perfect.', evidence: { paragraphId: '7', quote: 'the city of the future will be different from the city of today, but it will not be perfect' } } },
          ],
        },
      ],
    },
  ],
};
