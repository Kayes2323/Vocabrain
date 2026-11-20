import type { ObjectiveSection } from '../../model';

/**
 * Mino Academic Mock Test 15 — Reading. Three original passages written
 * for Mino at IELTS Academic level (40 questions, 60 minutes).
 * Not Cambridge material. All passages, questions and answers are
 * original and were written fresh for this mock test.
 */
export const mock15Reading: ObjectiveSection = {
  skill: 'reading',
  timeLimitMinutes: 60,
  parts: [
    // ------------------------------------------------------------- Passage 1
    {
      id: 'r1',
      number: 1,
      passage: {
        title: 'The History of the Olympic Games',
        paragraphs: [
          {
            id: '1',
            text: 'The ancient Olympic Games began in Olympia in Greece, in 776 BC. Athletes from Greek cities took part in the Games, and the only event in the first Games was a running race of about 200 metres. At first, the Games were a small religious festival, but they soon became the most important sporting event in the Greek world.',
          },
          {
            id: '2',
            text: 'The Games were held every four years for nearly twelve centuries. Athletes competed in running, jumping, throwing and wrestling, and the winners were given a crown made from olive leaves. The ancient Games finally stopped in 393 AD, when the Roman emperor Theodosius closed the temples at Olympia.',
          },
          {
            id: '3',
            text: 'The modern Olympic Games began more than 1,500 years later. A Frenchman called Pierre de Coubertin believed that sport could bring countries together, and he worked hard to bring back the Games. The first modern Games were held in Athens in 1896, with 241 athletes from 14 countries taking part in 43 events.',
          },
          {
            id: '4',
            text: 'Women first took part in the Olympic Games in Paris in 1900. Only twenty-two women took part in those Games, in tennis and golf, but today about half of all Olympic athletes are women. The Games have also grown in other ways: in Athens in 1896, there were only 241 athletes, but in recent Games there have been more than 10,000 athletes from more than 200 countries.',
          },
          {
            id: '5',
            text: 'Some Olympic traditions are new. The five Olympic rings, in blue, yellow, black, green and red, stand for the five continents of the world. The Olympic flame is lit in Olympia and carried to the city where the Games are held. The torch relay, in which runners carry the flame across countries, was first used at the Berlin Games in 1936.',
          },
          {
            id: '6',
            text: 'Today, the Olympic Games are the biggest sporting event in the world. Billions of people watch the Games on television, and the host city spends many years preparing stadiums, roads and hotels for the athletes and visitors. The Games have changed a great deal since the first running race in Olympia, but their idea has stayed the same: to bring the best athletes in the world together in fair competition.',
          },
        ],
      },
      groups: [
        {
          id: 'm15r-g1',
          type: 'sentence-completion',
          instructions: 'Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          questions: [
            {
              id: 'm15r-q1',
              number: 1,
              prompt: 'The ancient Olympic Games began in ___ in Greece.',
              answer: { accepted: ['Olympia'] },
              explanation: { text: 'The ancient Olympic Games began in Olympia in Greece.', evidence: { paragraphId: '1', quote: 'began in Olympia in Greece' } },
            },
            {
              id: 'm15r-q2',
              number: 2,
              prompt: 'The Games were held every ___ years.',
              answer: { accepted: ['four'] },
              explanation: { text: 'The Games were held every four years.', evidence: { paragraphId: '2', quote: 'held every four years' } },
            },
            {
              id: 'm15r-q3',
              number: 3,
              prompt: 'The ancient Games stopped in ___ AD.',
              answer: { accepted: ['393'] },
              explanation: { text: 'The ancient Games stopped in 393 AD.', evidence: { paragraphId: '2', quote: 'stopped in 393 AD' } },
            },
            {
              id: 'm15r-q4',
              number: 4,
              prompt: 'The first modern Olympic Games were held in ___ in 1896.',
              answer: { accepted: ['Athens'] },
              explanation: { text: 'The first modern Games were held in Athens in 1896.', evidence: { paragraphId: '3', quote: 'held in Athens in 1896' } },
            },
            {
              id: 'm15r-q5',
              number: 5,
              prompt: 'Women first took part in the Olympic Games in Paris in ___.',
              answer: { accepted: ['1900'] },
              explanation: { text: 'Women first took part in the Olympic Games in Paris in 1900.', evidence: { paragraphId: '4', quote: 'in Paris in 1900' } },
            },
          ],
        },
        {
          id: 'm15r-g2',
          type: 'true-false-not-given',
          instructions:
            'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
          questions: [
            {
              id: 'm15r-q6',
              number: 6,
              prompt: 'The ancient Olympic Games began in 776 BC.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'The ancient Olympic Games began in Olympia in Greece, in 776 BC.', evidence: { paragraphId: '1', quote: 'in 776 BC' } },
            },
            {
              id: 'm15r-q7',
              number: 7,
              prompt: 'The ancient Games lasted for more than 1,000 years.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'The Games were held every four years for nearly twelve centuries.', evidence: { paragraphId: '2', quote: 'for nearly twelve centuries' } },
            },
            {
              id: 'm15r-q8',
              number: 8,
              prompt: 'The first modern Olympic Games were held in Paris.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'The first modern Games were held in Athens in 1896.', evidence: { paragraphId: '3', quote: 'held in Athens in 1896' } },
            },
            {
              id: 'm15r-q9',
              number: 9,
              prompt: 'More than 300 athletes took part in the first modern Olympic Games.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'The first modern Games had 241 athletes.', evidence: { paragraphId: '3', quote: 'with 241 athletes from 14 countries' } },
            },
            {
              id: 'm15r-q10',
              number: 10,
              prompt: 'The Olympic rings were designed by Pierre de Coubertin.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: { text: 'The passage says the five Olympic rings stand for the five continents, but it does not say who designed them.', evidence: { paragraphId: '5', quote: 'The five Olympic rings, in blue, yellow, black, green and red, stand for the five continents of the world' } },
            },
          ],
        },
        {
          id: 'm15r-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm15r-q11',
              number: 11,
              prompt: 'Why did Pierre de Coubertin want to bring back the Olympic Games?',
              options: [
                { id: 'A', text: 'He believed that sport could bring countries together.' },
                { id: 'B', text: 'He wanted to become a famous athlete.' },
                { id: 'C', text: 'He wanted to build new stadiums in Paris.' },
                { id: 'D', text: 'He wanted to stop wars between countries.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Pierre de Coubertin believed that sport could bring countries together.',
                evidence: { paragraphId: '3', quote: 'believed that sport could bring countries together' },
              },
            },
            {
              id: 'm15r-q12',
              number: 12,
              prompt: 'What was first used at the Berlin Games in 1936?',
              options: [
                { id: 'A', text: 'the five Olympic rings' },
                { id: 'B', text: 'the torch relay' },
                { id: 'C', text: 'the Olympic flame' },
                { id: 'D', text: 'women taking part in the Games' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The torch relay was first used at the Berlin Games in 1936.',
                evidence: { paragraphId: '5', quote: 'was first used at the Berlin Games in 1936' },
              },
            },
            {
              id: 'm15r-q13',
              number: 13,
              prompt: 'What does the writer say about the Olympic Games today?',
              options: [
                { id: 'A', text: 'They are the biggest sporting event in the world.' },
                { id: 'B', text: 'They are only watched by people in the host city.' },
                { id: 'C', text: 'They have fewer athletes than in 1896.' },
                { id: 'D', text: 'They are held every two years.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Today, the Olympic Games are the biggest sporting event in the world.',
                evidence: { paragraphId: '6', quote: 'the biggest sporting event in the world' },
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
        title: 'How Forests Help the Planet',
        paragraphs: [
          {
            id: 'A',
            labelled: true,
            text: 'Forests cover about 31 per cent of the land on Earth. They grow in almost every part of the world, from cold forests in the north to hot rainforests near the equator. Forests are important for the planet in many ways, and without them, life on Earth would be very different.',
          },
          {
            id: 'B',
            labelled: true,
            text: 'First, forests help the air that we breathe. Trees take in carbon dioxide from the air and store the carbon in their wood, leaves and roots. In this way, forests slow down climate change, because carbon dioxide is one of the gases that makes the Earth warmer. Trees also give out oxygen, which people and animals need to breathe.',
          },
          {
            id: 'C',
            labelled: true,
            text: 'Second, forests are a home for animals and plants. More than half of the world’s land species live in forests, including many birds, insects and mammals. Rainforests are especially rich in life: although they cover only a small part of the land, they are home to about half of all the species on Earth.',
          },
          {
            id: 'D',
            labelled: true,
            text: 'Third, forests help with water. When it rains, trees catch the rain on their leaves, and their roots hold water in the soil. The water then slowly flows into rivers and lakes, so people have water to drink and to use on their farms. Forests also make rain: water from trees rises into the air and forms clouds, which bring rain to the land.',
          },
          {
            id: 'E',
            labelled: true,
            text: 'Fourth, forests protect the soil. The roots of trees hold the soil in place, so that it is not washed away by rain or blown away by wind. Without forests, heavy rain can wash away the soil that farmers need to grow food, and it can also cause floods in towns and villages below the hills.',
          },
          {
            id: 'F',
            labelled: true,
            text: 'However, forests are in danger. About ten million hectares of forest are lost each year, because trees are cut down to make space for farms and towns, and for wood and paper. Fires also destroy large areas of forest, especially in hot, dry summers. When forests are lost, the animals that live in them lose their homes, and the carbon stored in the trees goes back into the air.',
          },
          {
            id: 'G',
            labelled: true,
            text: 'What can be done to help forests? One answer is to plant new trees, and many countries now plant millions of trees every year. Another answer is to protect the forests that are left, by making laws against cutting down trees and by giving local people other ways to earn money. People can also help by using less paper and wood, and by choosing products that come from forests that are looked after carefully.',
          },
        ],
      },
      groups: [
        {
          id: 'm15r-g4',
          type: 'matching-headings',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings below.',
          optionsTitle: 'List of Headings',
          options: [
            { id: 'i', text: 'How forests help the air' },
            { id: 'ii', text: 'A home for animals and plants' },
            { id: 'iii', text: 'Forests and water' },
            { id: 'iv', text: 'How forests protect the soil' },
            { id: 'v', text: 'The danger to forests' },
            { id: 'vi', text: 'What forests are' },
            { id: 'vii', text: 'What we can do to help forests' },
            { id: 'viii', text: 'Forests in cold countries' },
          ],
          questions: [
            {
              id: 'm15r-q14',
              number: 14,
              prompt: 'Paragraph B',
              answer: { accepted: ['i'] },
              explanation: { text: 'The paragraph says that forests help the air that we breathe.', evidence: { paragraphId: 'B', quote: 'forests help the air that we breathe' } },
            },
            {
              id: 'm15r-q15',
              number: 15,
              prompt: 'Paragraph C',
              answer: { accepted: ['ii'] },
              explanation: { text: 'The paragraph says that forests are a home for animals and plants.', evidence: { paragraphId: 'C', quote: 'forests are a home for animals and plants' } },
            },
            {
              id: 'm15r-q16',
              number: 16,
              prompt: 'Paragraph D',
              answer: { accepted: ['iii'] },
              explanation: { text: 'The paragraph says that forests help with water.', evidence: { paragraphId: 'D', quote: 'forests help with water' } },
            },
            {
              id: 'm15r-q17',
              number: 17,
              prompt: 'Paragraph E',
              answer: { accepted: ['iv'] },
              explanation: { text: 'The paragraph says that forests protect the soil.', evidence: { paragraphId: 'E', quote: 'forests protect the soil' } },
            },
            {
              id: 'm15r-q18',
              number: 18,
              prompt: 'Paragraph F',
              answer: { accepted: ['v'] },
              explanation: { text: 'The paragraph says that forests are in danger.', evidence: { paragraphId: 'F', quote: 'forests are in danger' } },
            },
          ],
        },
        {
          id: 'm15r-g5',
          type: 'table-completion',
          instructions: 'Complete the table below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          table: {
            headers: ['Topic', 'Detail'],
            rows: [
              ['Land covered by forests', 'Forests cover about {{19}} per cent of the land on Earth'],
              ['Air', 'Trees take in carbon {{20}} from the air'],
              ['Animals and plants', 'More than half of the world’s land {{21}} live in forests'],
              ['Loss of forest', 'About {{22}} million hectares of forest are lost each year'],
            ],
          },
          questions: [
            { id: 'm15r-q19', number: 19, answer: { accepted: ['31'] }, explanation: { text: 'Forests cover about 31 per cent of the land on Earth.', evidence: { paragraphId: 'A', quote: 'cover about 31 per cent of the land' } } },
            { id: 'm15r-q20', number: 20, answer: { accepted: ['dioxide'] }, explanation: { text: 'Trees take in carbon dioxide from the air.', evidence: { paragraphId: 'B', quote: 'take in carbon dioxide' } } },
            { id: 'm15r-q21', number: 21, answer: { accepted: ['species'] }, explanation: { text: 'More than half of the world’s land species live in forests.', evidence: { paragraphId: 'C', quote: 'land species live in forests' } } },
            { id: 'm15r-q22', number: 22, answer: { accepted: ['ten', '10'] }, explanation: { text: 'About ten million hectares of forest are lost each year.', evidence: { paragraphId: 'F', quote: 'About ten million hectares of forest are lost each year' } } },
          ],
        },
        {
          id: 'm15r-g6',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO things do forests do, according to the passage?',
          choose: 2,
          options: [
            { id: 'A', text: 'They take in carbon dioxide from the air.' },
            { id: 'B', text: 'They give homes to animals and plants.' },
            { id: 'C', text: 'They make the air warmer.' },
            { id: 'D', text: 'They use less paper and wood.' },
            { id: 'E', text: 'They stop all rain from falling.' },
          ],
          questions: [
            { id: 'm15r-q23', number: 23, answer: { accepted: ['A'] }, explanation: { text: 'Trees take in carbon dioxide from the air.', evidence: { paragraphId: 'B', quote: 'take in carbon dioxide from the air' } } },
            { id: 'm15r-q24', number: 24, answer: { accepted: ['B'] }, explanation: { text: 'Forests are a home for animals and plants.', evidence: { paragraphId: 'C', quote: 'forests are a home for animals and plants' } } },
          ],
        },
        {
          id: 'm15r-g7',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO dangers for forests does the writer mention in paragraph F?',
          choose: 2,
          options: [
            { id: 'A', text: 'Trees are cut down to make space for farms and towns.' },
            { id: 'B', text: 'Fires destroy large areas of forest.' },
            { id: 'C', text: 'Forests make too much rain.' },
            { id: 'D', text: 'Too many trees are planted every year.' },
            { id: 'E', text: 'Animals eat all the leaves of the trees.' },
          ],
          questions: [
            { id: 'm15r-q25', number: 25, answer: { accepted: ['A'] }, explanation: { text: 'Trees are cut down to make space for farms and towns.', evidence: { paragraphId: 'F', quote: 'trees are cut down to make space for farms and towns' } } },
            { id: 'm15r-q26', number: 26, answer: { accepted: ['B'] }, explanation: { text: 'Fires destroy large areas of forest.', evidence: { paragraphId: 'F', quote: 'Fires also destroy large areas of forest' } } },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 3
    {
      id: 'r3',
      number: 3,
      passage: {
        title: 'The Rise of Online Learning',
        paragraphs: [
          {
            id: '1',
            text: 'Twenty years ago, most students learned in a classroom, with a teacher and other students. Today, millions of people learn online: they study at home, on a computer, and they watch lessons, read notes and take tests on the internet. Online learning has grown very quickly, and it is now a normal part of education in many countries.',
          },
          {
            id: '2',
            text: 'There are many reasons why online learning is popular. Students can study at home and at any time, so they can learn while they work or look after their families. Online courses are often cheaper than classroom courses, because there is no need to travel to a school or to pay for a large building. Students can also choose from courses all over the world, not only from schools near their homes.',
          },
          {
            id: '3',
            text: 'However, online learning also has problems. Students need a good internet connection and a computer, and not all students have these things. Students also need to be good at managing their own time, because there is no teacher in the room to tell them to work. Some students find it hard to study alone, and they miss talking to other students and to their teacher face to face.',
          },
          {
            id: '4',
            text: 'Online learning grew very quickly during the COVID-19 pandemic in 2020. Schools and universities closed, and learning moved online almost overnight. Teachers had to learn how to teach on the internet, and students had to learn how to study at home. Many schools were not ready for this change, but they had no choice: online learning was the only way to continue teaching.',
          },
          {
            id: '5',
            text: 'Today, many universities offer online courses. Some students study fully online, and they never go to a university building. Other students mix online learning with classroom learning: they watch some lessons on the internet and go to the university for other lessons. This mix of online and classroom learning is called blended learning, and it is becoming more and more common.',
          },
          {
            id: '6',
            text: 'There are still problems to solve. Not all students have a computer or the internet at home, and some subjects, such as medicine, are hard to teach online. Some students also worry that they learn less online than in a classroom, because it is easy to stop paying attention when nobody is watching. Schools and universities are working on these problems, but they have not solved all of them yet.',
          },
          {
            id: '7',
            text: 'In my view, online learning will continue to grow, because it is useful for so many people. However, the best way to learn is a mix of online learning and classroom learning: students can use the internet to study at their own speed, and they can go to a classroom to talk to their teacher and to other students. In the future, most students will probably learn in this way.',
          },
        ],
      },
      groups: [
        {
          id: 'm15r-g8',
          type: 'yes-no-not-given',
          instructions:
            'Do the following statements agree with the claims of the writer in Reading Passage 3? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
          questions: [
            {
              id: 'm15r-q27',
              number: 27,
              prompt: 'Millions of people now learn online.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Today, millions of people learn online.', evidence: { paragraphId: '1', quote: 'millions of people learn online' } },
            },
            {
              id: 'm15r-q28',
              number: 28,
              prompt: 'Online learning is always cheaper than classroom learning.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'Online courses are often cheaper than classroom courses, not always.', evidence: { paragraphId: '2', quote: 'Online courses are often cheaper than classroom courses' } },
            },
            {
              id: 'm15r-q29',
              number: 29,
              prompt: 'Online learning grew very quickly during the COVID-19 pandemic.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Online learning grew very quickly during the COVID-19 pandemic in 2020.', evidence: { paragraphId: '4', quote: 'Online learning grew very quickly during the COVID-19 pandemic' } },
            },
            {
              id: 'm15r-q30',
              number: 30,
              prompt: 'All universities now offer only online courses.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'Many universities offer online courses, and other students mix online learning with classroom learning.', evidence: { paragraphId: '5', quote: 'Other students mix online learning with classroom learning' } },
            },
            {
              id: 'm15r-q31',
              number: 31,
              prompt: 'Online learning is more popular in Asia than in Europe.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: { text: 'The writer does not compare the popularity of online learning in Asia and Europe.', evidence: { paragraphId: '7', quote: 'online learning will continue to grow' } },
            },
          ],
        },
        {
          id: 'm15r-g9',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm15r-q32',
              number: 32,
              prompt: 'What is one reason why online learning is popular?',
              options: [
                { id: 'A', text: 'Students can study at home and at any time.' },
                { id: 'B', text: 'Students do not need a computer.' },
                { id: 'C', text: 'Students never have to take tests.' },
                { id: 'D', text: 'Students do not need to manage their own time.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Students can study at home and at any time.',
                evidence: { paragraphId: '2', quote: 'Students can study at home and at any time' },
              },
            },
            {
              id: 'm15r-q33',
              number: 33,
              prompt: 'What is one problem with online learning?',
              options: [
                { id: 'A', text: 'Students need to be good at managing their own time.' },
                { id: 'B', text: 'Students have to travel to school every day.' },
                { id: 'C', text: 'Online courses are always more expensive.' },
                { id: 'D', text: 'Students cannot choose courses from other countries.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Students need to be good at managing their own time.',
                evidence: { paragraphId: '3', quote: 'Students also need to be good at managing their own time' },
              },
            },
            {
              id: 'm15r-q34',
              number: 34,
              prompt: 'What happened in 2020?',
              options: [
                { id: 'A', text: 'Schools and universities closed, and learning moved online.' },
                { id: 'B', text: 'Online learning stopped completely.' },
                { id: 'C', text: 'All students bought new computers.' },
                { id: 'D', text: 'Teachers stopped teaching.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Schools and universities closed, and learning moved online almost overnight.',
                evidence: { paragraphId: '4', quote: 'Schools and universities closed, and learning moved online' },
              },
            },
            {
              id: 'm15r-q35',
              number: 35,
              prompt: "What is the writer's view?",
              options: [
                { id: 'A', text: 'The best way to learn is a mix of online learning and classroom learning.' },
                { id: 'B', text: 'All learning should be online.' },
                { id: 'C', text: 'All learning should be in a classroom.' },
                { id: 'D', text: 'Online learning will soon disappear.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The best way to learn is a mix of online learning and classroom learning.',
                evidence: { paragraphId: '7', quote: 'the best way to learn is a mix of online learning and classroom learning' },
              },
            },
          ],
        },
        {
          id: 'm15r-g10',
          type: 'matching-sentence-endings',
          instructions: 'Complete each sentence with the correct ending, A–H.',
          optionsTitle: 'List of Endings',
          options: [
            { id: 'A', text: 'students can study at home and at any time.' },
            { id: 'B', text: 'students need a good internet connection.' },
            { id: 'C', text: 'schools closed and learning moved online.' },
            { id: 'D', text: 'some students study fully online and others mix online learning with classroom learning.' },
            { id: 'E', text: 'online learning will continue to grow.' },
            { id: 'F', text: 'online courses are always free.' },
            { id: 'G', text: 'all students have a computer and the internet.' },
            { id: 'H', text: 'classroom learning has disappeared completely.' },
          ],
          questions: [
            { id: 'm15r-q36', number: 36, prompt: 'Online learning is popular because', answer: { accepted: ['A'] }, explanation: { text: 'Online learning is popular because students can study at home and at any time.', evidence: { paragraphId: '2', quote: 'Students can study at home and at any time' } } },
            { id: 'm15r-q37', number: 37, prompt: 'One problem with online learning is that', answer: { accepted: ['B'] }, explanation: { text: 'One problem with online learning is that students need a good internet connection.', evidence: { paragraphId: '3', quote: 'Students need a good internet connection' } } },
            { id: 'm15r-q38', number: 38, prompt: 'During the COVID-19 pandemic in 2020,', answer: { accepted: ['C'] }, explanation: { text: 'During the COVID-19 pandemic in 2020, schools and universities closed, and learning moved online.', evidence: { paragraphId: '4', quote: 'Schools and universities closed, and learning moved online' } } },
            { id: 'm15r-q39', number: 39, prompt: 'Today, many universities offer online courses, and', answer: { accepted: ['D'] }, explanation: { text: 'Today, many universities offer online courses, and some students study fully online.', evidence: { paragraphId: '5', quote: 'Some students study fully online' } } },
            { id: 'm15r-q40', number: 40, prompt: 'In the writer’s view,', answer: { accepted: ['E'] }, explanation: { text: 'In the writer’s view, online learning will continue to grow.', evidence: { paragraphId: '7', quote: 'online learning will continue to grow' } } },
          ],
        },
      ],
    },
  ],
};
