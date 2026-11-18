import type { ObjectiveSection } from '../../model';

/**
 * Mino Academic Mock Test 11 — Reading. Three original passages written
 * for Mino at IELTS Academic level (40 questions, 60 minutes).
 * Not Cambridge material. All passages, questions and answers are
 * original and were written fresh for this mock test.
 */
export const mock11Reading: ObjectiveSection = {
  skill: 'reading',
  timeLimitMinutes: 60,
  parts: [
    // ------------------------------------------------------------- Passage 1
    {
      id: 'r1',
      number: 1,
      passage: {
        title: 'The History of Aviation',
        paragraphs: [
          {
            id: '1',
            text: 'For thousands of years, people had dreamed of flying like birds, and many had tried to build machines that could carry them into the sky. Most of these early machines failed, and some of them were very dangerous. The first successful powered flight took place on the seventeenth of December, 1903, at Kitty Hawk, in North Carolina, in the United States. The plane was built by two brothers, Wilbur and Orville Wright, and it flew for only twelve seconds and travelled just thirty-six metres. It was a very short flight, but it changed the world.',
          },
          {
            id: '2',
            text: 'The Wright brothers were bicycle makers from Ohio, and they had no university education in science or engineering. They learned about flying by watching birds and by testing small gliders, which are planes without engines, on the windy hills near Kitty Hawk. They built their own engine, which was light enough for their plane, and they designed the wings so that the pilot could control the plane in the air. Their careful work, step by step, was the reason their flight succeeded when so many others had failed.',
          },
          {
            id: '3',
            text: 'Within ten years of the Wright brothers\' flight, planes were being used in the First World War. At first, they were used to watch the movements of the enemy, and pilots took photographs of the land below. Later, planes were used to drop bombs and to fight other planes in the air. The war made planes faster and stronger, because governments spent a great deal of money on building better engines and better planes.',
          },
          {
            id: '4',
            text: 'After the war, flying became a way to carry letters and parcels quickly over long distances. In 1927, a young American pilot, Charles Lindbergh, made the first solo flight without stopping across the Atlantic Ocean, from New York to Paris. The flight took him thirty-three hours, and he became famous all over the world. Soon after Lindbergh\'s flight, companies began to carry passengers by air, and people who were rich enough could travel from one country to another in a few hours, instead of spending many days on a ship.',
          },
          {
            id: '5',
            text: 'After the Second World War, a new kind of engine, the jet engine, made planes much faster, and flying became much cheaper. In 1958, the Boeing 707 began carrying passengers, and it became one of the first jet planes to carry large numbers of people across the Atlantic. Ordinary people could now afford to fly on holiday, to visit family in other countries, or to travel for work. Airports grew bigger, planes grew larger, and by the end of the twentieth century, millions of people flew every day.',
          },
          {
            id: '6',
            text: 'Today, flying is a normal part of life for many people, but it also causes problems. Planes use a great deal of fuel, and this adds to the pollution that warms the Earth. Scientists and engineers are now working on new kinds of planes that use less fuel, and some companies are testing electric planes for short flights. It is not yet clear when these planes will carry large numbers of passengers, but many people believe that the next great change in flying will be a cleaner and quieter one.',
          },
        ],
      },
      groups: [
        {
          id: 'm11r-g1',
          type: 'sentence-completion',
          instructions: 'Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          questions: [
            {
              id: 'm11r-q1',
              number: 1,
              prompt: 'The first successful powered flight took place in ___.',
              answer: { accepted: ['1903'] },
              explanation: { text: 'The first successful powered flight took place in 1903.', evidence: { paragraphId: '1', quote: 'on the seventeenth of December, 1903' } },
            },
            {
              id: 'm11r-q2',
              number: 2,
              prompt: 'The first flight travelled just thirty-six ___.',
              answer: { accepted: ['metres'] },
              explanation: { text: 'The first flight travelled just thirty-six metres.', evidence: { paragraphId: '1', quote: 'travelled just thirty-six metres' } },
            },
            {
              id: 'm11r-q3',
              number: 3,
              prompt: 'The Wright brothers were ___ makers from Ohio.',
              answer: { accepted: ['bicycle'] },
              explanation: { text: 'The Wright brothers were bicycle makers from Ohio.', evidence: { paragraphId: '2', quote: 'bicycle makers from Ohio' } },
            },
            {
              id: 'm11r-q4',
              number: 4,
              prompt: 'Lindbergh flew from New York to ___.',
              answer: { accepted: ['Paris'] },
              explanation: { text: 'Lindbergh flew from New York to Paris.', evidence: { paragraphId: '4', quote: 'from New York to Paris' } },
            },
            {
              id: 'm11r-q5',
              number: 5,
              prompt: 'The Boeing 707 began carrying passengers in ___.',
              answer: { accepted: ['1958'] },
              explanation: { text: 'The Boeing 707 began carrying passengers in 1958.', evidence: { paragraphId: '5', quote: 'In 1958, the Boeing 707 began carrying passengers' } },
            },
          ],
        },
        {
          id: 'm11r-g2',
          type: 'true-false-not-given',
          instructions:
            'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
          questions: [
            {
              id: 'm11r-q6',
              number: 6,
              prompt: 'The Wright brothers were the first people to try to fly.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'Many people had tried to build flying machines before the Wright brothers.', evidence: { paragraphId: '1', quote: 'many had tried to build machines' } },
            },
            {
              id: 'm11r-q7',
              number: 7,
              prompt: 'The first successful flight lasted for more than one minute.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'The first flight lasted for only twelve seconds.', evidence: { paragraphId: '1', quote: 'it flew for only twelve seconds' } },
            },
            {
              id: 'm11r-q8',
              number: 8,
              prompt: 'In the First World War, planes were first used to carry passengers.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'At first, planes were used to watch the movements of the enemy.', evidence: { paragraphId: '3', quote: 'they were used to watch the movements of the enemy' } },
            },
            {
              id: 'm11r-q9',
              number: 9,
              prompt: 'Lindbergh\'s flight across the Atlantic took less than a day.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'The flight took him thirty-three hours, which is more than a day.', evidence: { paragraphId: '4', quote: 'The flight took him thirty-three hours' } },
            },
            {
              id: 'm11r-q10',
              number: 10,
              prompt: 'Jet engines made flying cheaper for ordinary people.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'The jet engine made planes much faster, and flying became much cheaper.', evidence: { paragraphId: '5', quote: 'flying became much cheaper' } },
            },
          ],
        },
        {
          id: 'm11r-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm11r-q11',
              number: 11,
              prompt: 'Why did the Wright brothers\' flight succeed when others had failed?',
              options: [
                { id: 'A', text: 'They had a university education in engineering.' },
                { id: 'B', text: 'They worked carefully, step by step, testing gliders and building their own engine.' },
                { id: 'C', text: 'They had a great deal of money from the government.' },
                { id: 'D', text: 'They copied the design of an earlier successful plane.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Their careful work, step by step, was the reason their flight succeeded.',
                evidence: { paragraphId: '2', quote: 'Their careful work, step by step, was the reason their flight succeeded' },
              },
            },
            {
              id: 'm11r-q12',
              number: 12,
              prompt: 'What did Lindbergh do in 1927?',
              options: [
                { id: 'A', text: 'He built the first jet plane.' },
                { id: 'B', text: 'He made the first solo flight without stopping across the Atlantic Ocean.' },
                { id: 'C', text: 'He opened the first airport in New York.' },
                { id: 'D', text: 'He flew around the world in thirty-three hours.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Lindbergh made the first solo flight without stopping across the Atlantic Ocean.',
                evidence: { paragraphId: '4', quote: 'made the first solo flight without stopping across the Atlantic Ocean' },
              },
            },
            {
              id: 'm11r-q13',
              number: 13,
              prompt: 'What does the writer say about the future of flying?',
              options: [
                { id: 'A', text: 'Electric planes will soon carry large numbers of passengers.' },
                { id: 'B', text: 'Flying will become more expensive than travelling by ship.' },
                { id: 'C', text: 'The next great change in flying may be cleaner and quieter planes.' },
                { id: 'D', text: 'People will stop flying because planes use too much fuel.' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'Many people believe that the next great change in flying will be a cleaner and quieter one.',
                evidence: { paragraphId: '6', quote: 'the next great change in flying will be a cleaner and quieter one' },
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
        title: 'The Deep Sea',
        paragraphs: [
          {
            id: 'A',
            labelled: true,
            text: 'The oceans cover more than seventy per cent of the surface of the Earth, and most of that water is deep sea: the dark water below one thousand metres. The deep sea is the largest home for life on Earth, bigger than all the forests and grasslands put together, yet we know less about it than we know about the surface of the Moon. Only a small part of it has ever been seen by human eyes.',
          },
          {
            id: 'B',
            labelled: true,
            text: 'The deep sea is a world without light. Sunlight cannot reach below one thousand metres, so most of the deep sea is in complete darkness. The water is also very cold, close to freezing, and the pressure is enormous: at three thousand metres below the surface, the pressure is three hundred times greater than the pressure on land. Few people could imagine living in such a place, yet millions of animals do.',
          },
          {
            id: 'C',
            labelled: true,
            text: 'Animals in the deep sea have found surprising ways to live without sunlight. The anglerfish carries its own light: a small glowing part on its head that attracts other fish close enough to catch. The giant squid has eyes as large as footballs, which help it to see in the dark. Other animals have no eyes at all, and they find food by feeling the water around them or by following smells in the dark.',
          },
          {
            id: 'D',
            labelled: true,
            text: 'One of the strangest places in the deep sea is found near hot springs on the sea floor, called hydrothermal vents. These vents were first found in 1977, near the Galapagos Islands. Hot water, full of chemicals, rises from cracks in the rocks, and around these vents live animals that are found nowhere else, such as giant tube worms more than two metres long. These animals get their food from chemicals in the water, not from sunlight, and they show that life can exist in places where no sunlight ever reaches.',
          },
          {
            id: 'E',
            labelled: true,
            text: 'Exploring the deep sea is very difficult, because people cannot swim down to it. Scientists explore it in special boats and submersibles, which are small strong vehicles that can carry people down to the sea floor, and in remotely operated vehicles, which are machines controlled from a ship. Even with this technology, scientists have seen only a tiny part of the deep sea, and every time they look in a new place, they find animals that no one has ever seen before.',
          },
          {
            id: 'F',
            labelled: true,
            text: 'The deep sea is now in danger from human activity. Deep-sea mining, which digs up the sea floor to find metals, can destroy the homes of animals that live there. Fishing boats drag heavy nets across the sea floor, and these nets break the slow-growing corals that take hundreds of years to grow. Plastic waste from land also sinks into the deep sea, and it has been found inside animals that live thousands of metres below the surface.',
          },
          {
            id: 'G',
            labelled: true,
            text: 'Studying the deep sea matters for everyone, not only for scientists. Animals in the deep sea may hold the key to new medicines, because they have found ways to live in cold and darkness that no other animals have. The deep sea also helps to control the climate of the whole planet, by taking in heat and carbon dioxide from the air. If we damage the deep sea before we understand it, we may lose things that we can never get back.',
          },
        ],
      },
      groups: [
        {
          id: 'm11r-g4',
          type: 'matching-headings',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings below.',
          optionsTitle: 'List of Headings',
          options: [
            { id: 'i', text: 'The largest home for life on Earth' },
            { id: 'ii', text: 'A world without light' },
            { id: 'iii', text: 'Animals that live without sunlight' },
            { id: 'iv', text: 'Hot water and strange life' },
            { id: 'v', text: 'How scientists explore the deep sea' },
            { id: 'vi', text: 'Dangers to the deep sea' },
            { id: 'vii', text: 'Why the deep sea matters' },
            { id: 'viii', text: 'The history of ships and sailing' },
          ],
          questions: [
            {
              id: 'm11r-q14',
              number: 14,
              prompt: 'Paragraph B',
              answer: { accepted: ['ii'] },
              explanation: { text: 'The paragraph describes the deep sea as a world without light.', evidence: { paragraphId: 'B', quote: 'The deep sea is a world without light' } },
            },
            {
              id: 'm11r-q15',
              number: 15,
              prompt: 'Paragraph C',
              answer: { accepted: ['iii'] },
              explanation: { text: 'The paragraph describes animals that have found ways to live without sunlight.', evidence: { paragraphId: 'C', quote: 'Animals in the deep sea have found surprising ways to live without sunlight' } },
            },
            {
              id: 'm11r-q16',
              number: 16,
              prompt: 'Paragraph D',
              answer: { accepted: ['iv'] },
              explanation: { text: 'The paragraph describes hot springs on the sea floor and the strange animals that live near them.', evidence: { paragraphId: 'D', quote: 'hot springs on the sea floor, called hydrothermal vents' } },
            },
            {
              id: 'm11r-q17',
              number: 17,
              prompt: 'Paragraph E',
              answer: { accepted: ['v'] },
              explanation: { text: 'The paragraph describes how scientists explore the deep sea.', evidence: { paragraphId: 'E', quote: 'Exploring the deep sea is very difficult' } },
            },
            {
              id: 'm11r-q18',
              number: 18,
              prompt: 'Paragraph F',
              answer: { accepted: ['vi'] },
              explanation: { text: 'The paragraph describes how human activity puts the deep sea in danger.', evidence: { paragraphId: 'F', quote: 'The deep sea is now in danger from human activity' } },
            },
          ],
        },
        {
          id: 'm11r-g5',
          type: 'table-completion',
          instructions: 'Complete the table below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          table: {
            headers: ['Topic', 'Detail'],
            rows: [
              ['Sunlight', 'Sunlight cannot reach below one {{19}} metres'],
              ['Hydrothermal vents', 'The vents were first found in {{20}}'],
              ['Tube worms', 'These animals get their food from {{21}} in the water'],
              ['Exploration', 'Scientists explore the deep sea in special boats and {{22}}'],
            ],
          },
          questions: [
            { id: 'm11r-q19', number: 19, answer: { accepted: ['thousand'] }, explanation: { text: 'Sunlight cannot reach below one thousand metres.', evidence: { paragraphId: 'B', quote: 'Sunlight cannot reach below one thousand metres' } } },
            { id: 'm11r-q20', number: 20, answer: { accepted: ['1977'] }, explanation: { text: 'The vents were first found in 1977.', evidence: { paragraphId: 'D', quote: 'These vents were first found in 1977' } } },
            { id: 'm11r-q21', number: 21, answer: { accepted: ['chemicals'] }, explanation: { text: 'These animals get their food from chemicals in the water.', evidence: { paragraphId: 'D', quote: 'get their food from chemicals in the water' } } },
            { id: 'm11r-q22', number: 22, answer: { accepted: ['submersibles'] }, explanation: { text: 'Scientists explore the deep sea in special boats and submersibles.', evidence: { paragraphId: 'E', quote: 'special boats and submersibles' } } },
          ],
        },
        {
          id: 'm11r-g6',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO ways of living without sunlight are mentioned in paragraph C?',
          choose: 2,
          options: [
            { id: 'A', text: 'The anglerfish carries its own light to attract other fish.' },
            { id: 'B', text: 'The giant squid has eyes as large as footballs to see in the dark.' },
            { id: 'C', text: 'Whales sing to each other across long distances.' },
            { id: 'D', text: 'Fish change colour to match the water around them.' },
            { id: 'E', text: 'Sharks swim up to the surface every night to feed.' },
          ],
          questions: [
            { id: 'm11r-q23', number: 23, answer: { accepted: ['A'] }, explanation: { text: 'The anglerfish carries its own light, which attracts other fish close enough to catch.', evidence: { paragraphId: 'C', quote: 'a small glowing part on its head that attracts other fish' } } },
            { id: 'm11r-q24', number: 24, answer: { accepted: ['B'] }, explanation: { text: 'The giant squid has eyes as large as footballs, which help it to see in the dark.', evidence: { paragraphId: 'C', quote: 'eyes as large as footballs, which help it to see in the dark' } } },
          ],
        },
        {
          id: 'm11r-g7',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO dangers to the deep sea are mentioned in paragraph F?',
          choose: 2,
          options: [
            { id: 'A', text: 'Deep-sea mining digs up the sea floor to find metals.' },
            { id: 'B', text: 'Fishing boats drag heavy nets across the sea floor.' },
            { id: 'C', text: 'Too many tourists visit the deep sea in submarines.' },
            { id: 'D', text: 'The water in the deep sea is becoming too warm for fish.' },
            { id: 'E', text: 'Scientists take too many animals from the deep sea.' },
          ],
          questions: [
            { id: 'm11r-q25', number: 25, answer: { accepted: ['A'] }, explanation: { text: 'Deep-sea mining digs up the sea floor to find metals.', evidence: { paragraphId: 'F', quote: 'Deep-sea mining, which digs up the sea floor to find metals' } } },
            { id: 'm11r-q26', number: 26, answer: { accepted: ['B'] }, explanation: { text: 'Fishing boats drag heavy nets across the sea floor.', evidence: { paragraphId: 'F', quote: 'Fishing boats drag heavy nets across the sea floor' } } },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 3
    {
      id: 'r3',
      number: 3,
      passage: {
        title: 'Why People Collect Things',
        paragraphs: [
          {
            id: '1',
            text: 'In almost every country in the world, people collect things: stamps, coins, old toys, football cards, seashells, books, or even bottle tops. Some collections fill a single drawer, while others fill whole rooms, and some collectors spend large amounts of money on a single rare item. Collecting is one of the oldest hobbies in the world, and it is enjoyed by children and by adults, by rich people and by poor people. But why do people collect things, and what makes a collection so important to the person who owns it?',
          },
          {
            id: '2',
            text: 'One reason people collect is memory. A collection can hold the story of a person\'s life. A man who collects stamps from every country he has visited is keeping a record of his travels, and a woman who keeps the toys she played with as a child is keeping a part of her childhood. For many collectors, each object is connected to a person, a place or a time, and looking at the collection is like looking at a photograph album: it brings the past back to life.',
          },
          {
            id: '3',
            text: 'A second reason is learning. Collectors often know a great deal about the things they collect. A person who collects coins may know the history of every coin, the country where it was made, and the king or queen whose face is shown on it. A person who collects old maps may know how the borders of countries have changed over hundreds of years. Collecting gives people a reason to read, to ask questions and to share what they know with other collectors.',
          },
          {
            id: '4',
            text: 'A third reason is the pleasure of finishing a set. Many collections are made of sets: all the stamps from one year, all the coins from one country, or all the cards of one football team. Finding the last missing item in a set can take years, and collectors describe the moment when they find it as one of the happiest moments of their lives. This feeling of finishing something is very strong, and it keeps collectors searching long after they have found most of the things they want.',
          },
          {
            id: '5',
            text: 'Collecting also brings people together. Collectors meet at markets, at fairs and in clubs, where they buy, sell and exchange objects, and where they talk about their collections with people who understand them. For some people, especially older people who live alone, a collectors\' club is the most important part of their social life. In recent years, collectors have also met online, and a person in one country can now exchange objects with a collector on the other side of the world.',
          },
          {
            id: '6',
            text: 'But collecting can also cause problems. A collection can become very expensive, and some collectors spend more money than they can afford. A large collection also needs space, and some collectors fill their homes with boxes until there is no room to live in. Some people collect so much that they cannot stop, and their homes become full of objects they will never use. Doctors say that for a small number of people, collecting can become a problem that needs help, like any other habit that cannot be controlled.',
          },
          {
            id: '7',
            text: 'In my view, collecting is a healthy hobby for most people, as long as it is kept under control. It helps people to learn, to remember and to make friends, and it gives them a reason to be curious about the world. A collection does not have to be valuable to be important: the most valuable thing in a collection is often the story behind it, and the story belongs to the collector alone. The best collections, I believe, are the ones that help us to understand the world a little better, and ourselves a little better too.',
          },
        ],
      },
      groups: [
        {
          id: 'm11r-g8',
          type: 'yes-no-not-given',
          instructions:
            'Do the following statements agree with the claims of the writer in Reading Passage 3? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
          questions: [
            {
              id: 'm11r-q27',
              number: 27,
              prompt: 'Collecting is enjoyed only by rich people.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'Collecting is enjoyed by rich people and by poor people.', evidence: { paragraphId: '1', quote: 'by rich people and by poor people' } },
            },
            {
              id: 'm11r-q28',
              number: 28,
              prompt: 'For many collectors, each object is connected to a person, a place or a time.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'For many collectors, each object is connected to a person, a place or a time.', evidence: { paragraphId: '2', quote: 'each object is connected to a person, a place or a time' } },
            },
            {
              id: 'm11r-q29',
              number: 29,
              prompt: 'Collectors usually know very little about the things they collect.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'Collectors often know a great deal about the things they collect.', evidence: { paragraphId: '3', quote: 'Collectors often know a great deal about the things they collect' } },
            },
            {
              id: 'm11r-q30',
              number: 30,
              prompt: 'Finding the last missing item in a set can take years.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Finding the last missing item in a set can take years.', evidence: { paragraphId: '4', quote: 'Finding the last missing item in a set can take years' } },
            },
            {
              id: 'm11r-q31',
              number: 31,
              prompt: 'The writer believes collecting is a healthy hobby for most people, as long as it is kept under control.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'The writer says collecting is a healthy hobby for most people, as long as it is kept under control.', evidence: { paragraphId: '7', quote: 'collecting is a healthy hobby for most people, as long as it is kept under control' } },
            },
          ],
        },
        {
          id: 'm11r-g9',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm11r-q32',
              number: 32,
              prompt: 'Why do some people collect things from their childhood, according to paragraph 2?',
              options: [
                { id: 'A', text: 'To keep a part of their childhood.' },
                { id: 'B', text: 'To sell them for a large amount of money.' },
                { id: 'C', text: 'To show them to people at work.' },
                { id: 'D', text: 'To win a prize at a collectors\' fair.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'A woman who keeps the toys she played with as a child is keeping a part of her childhood.',
                evidence: { paragraphId: '2', quote: 'keeping a part of her childhood' },
              },
            },
            {
              id: 'm11r-q33',
              number: 33,
              prompt: 'What does the writer say about collectors and learning?',
              options: [
                { id: 'A', text: 'Collecting gives people a reason to read, to ask questions and to share what they know.' },
                { id: 'B', text: 'Collectors learn more at school than other people.' },
                { id: 'C', text: 'Collectors do not like to share what they know.' },
                { id: 'D', text: 'Collecting stops people from reading books.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Collecting gives people a reason to read, to ask questions and to share what they know with other collectors.',
                evidence: { paragraphId: '3', quote: 'Collecting gives people a reason to read, to ask questions and to share what they know' },
              },
            },
            {
              id: 'm11r-q34',
              number: 34,
              prompt: 'What problem can collecting cause, according to paragraph 6?',
              options: [
                { id: 'A', text: 'Collectors may spend more money than they can afford.' },
                { id: 'B', text: 'Collectors may lose all interest in their collections.' },
                { id: 'C', text: 'Collectors may be unable to find other collectors.' },
                { id: 'D', text: 'Collectors may forget the stories behind their objects.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Some collectors spend more money than they can afford.',
                evidence: { paragraphId: '6', quote: 'some collectors spend more money than they can afford' },
              },
            },
            {
              id: 'm11r-q35',
              number: 35,
              prompt: 'What does the writer say is often the most valuable thing in a collection?',
              options: [
                { id: 'A', text: 'the rarest object in the collection' },
                { id: 'B', text: 'the story behind the collection' },
                { id: 'C', text: 'the money the collection is worth' },
                { id: 'D', text: 'the number of objects in the collection' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The writer says the most valuable thing in a collection is often the story behind it.',
                evidence: { paragraphId: '7', quote: 'the most valuable thing in a collection is often the story behind it' },
              },
            },
          ],
        },
        {
          id: 'm11r-g10',
          type: 'matching-sentence-endings',
          instructions: 'Complete each sentence with the correct ending, A–H.',
          optionsTitle: 'List of Endings',
          options: [
            { id: 'A', text: 'it brings the past back to life.' },
            { id: 'B', text: 'it gives them a reason to be curious about the world.' },
            { id: 'C', text: 'they buy, sell and exchange objects.' },
            { id: 'D', text: 'their homes become full of objects they will never use.' },
            { id: 'E', text: 'collectors describe it as one of the happiest moments of their lives.' },
            { id: 'F', text: 'it helps people to learn, to remember and to make friends.' },
            { id: 'G', text: 'a collection does not have to be valuable to be important.' },
            { id: 'H', text: 'collectors never spend any money on their collections.' },
          ],
          questions: [
            { id: 'm11r-q36', number: 36, prompt: 'Looking at a collection is like looking at a photograph album because', answer: { accepted: ['A'] }, explanation: { text: 'Looking at a collection brings the past back to life.', evidence: { paragraphId: '2', quote: 'it brings the past back to life' } } },
            { id: 'm11r-q37', number: 37, prompt: 'When collectors find the last missing item in a set,', answer: { accepted: ['E'] }, explanation: { text: 'Collectors describe finding the last item as one of the happiest moments of their lives.', evidence: { paragraphId: '4', quote: 'collectors describe the moment when they find it as one of the happiest moments of their lives' } } },
            { id: 'm11r-q38', number: 38, prompt: 'At markets, fairs and clubs,', answer: { accepted: ['C'] }, explanation: { text: 'Collectors meet at markets, at fairs and in clubs, where they buy, sell and exchange objects.', evidence: { paragraphId: '5', quote: 'where they buy, sell and exchange objects' } } },
            { id: 'm11r-q39', number: 39, prompt: 'Some people collect so much that', answer: { accepted: ['D'] }, explanation: { text: 'Some people collect so much that they cannot stop, and their homes become full of objects they will never use.', evidence: { paragraphId: '6', quote: 'their homes become full of objects they will never use' } } },
            { id: 'm11r-q40', number: 40, prompt: 'In the writer\'s view, collecting', answer: { accepted: ['F'] }, explanation: { text: 'Collecting helps people to learn, to remember and to make friends.', evidence: { paragraphId: '7', quote: 'It helps people to learn, to remember and to make friends' } } },
          ],
        },
      ],
    },
  ],
};
