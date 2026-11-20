import type { ObjectiveSection } from '../../model';

/**
 * Mino Academic Mock Test 19 — Reading. Three original passages written
 * for Mino at IELTS Academic level (40 questions, 60 minutes).
 * Not Cambridge material. All passages, questions and answers are
 * original and were written fresh for this mock test.
 */
export const mock19Reading: ObjectiveSection = {
  skill: 'reading',
  timeLimitMinutes: 60,
  parts: [
    // ------------------------------------------------------------- Passage 1
    {
      id: 'r1',
      number: 1,
      passage: {
        title: 'The History of Animation',
        paragraphs: [
          {
            id: '1',
            text: 'Animation is the art of making pictures move. Today, animated films are made with computers, but the first animated pictures were made more than a hundred years ago, with drawings and photographs. The history of animation is a story of new machines, new artists and new ideas.',
          },
          {
            id: '2',
            text: 'The first moving pictures were made in the nineteenth century, with a machine called a zoetrope. A zoetrope was a round box with small pictures inside it. When the box turned round, the pictures seemed to move. People watched the moving pictures through small holes in the side of the box.',
          },
          {
            id: '3',
            text: 'In 1906, an American artist called J. Stuart Blackton made the first animated film, called Humorous Phases of Funny Faces. In the film, Blackton drew faces on a blackboard, and the faces seemed to move. The film was only three minutes long, but it showed that drawings could move on film.',
          },
          {
            id: '4',
            text: 'In the 1920s, a young artist called Walt Disney began to make short animated films. In 1928, Disney made Steamboat Willie, the first cartoon with sound. In the film, a mouse called Mickey Mouse whistled and played music, and people in cinemas could hear the sound at the same time as they watched the pictures.',
          },
          {
            id: '5',
            text: 'In 1937, Disney made Snow White and the Seven Dwarfs, the first long animated film. The film took three years to make, and more than seven hundred artists worked on it. The film was a great success, and it showed that people would pay to watch a long animated film in the cinema.',
          },
          {
            id: '6',
            text: 'In the 1990s, computers changed animation. In 1995, a company called Pixar made Toy Story, the first long film made only with computers. Today, most animated films are made with computers, but artists still draw the characters first, and the best animated films still tell a good story.',
          },
        ],
      },
      groups: [
        {
          id: 'm19r-g1',
          type: 'sentence-completion',
          instructions: 'Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          questions: [
            {
              id: 'm19r-q1',
              number: 1,
              prompt: 'A zoetrope was a round ___ with small pictures inside it.',
              answer: { accepted: ['box'] },
              explanation: { text: 'A zoetrope was a round box with small pictures inside it.', evidence: { paragraphId: '2', quote: 'a round box with small pictures inside it' } },
            },
            {
              id: 'm19r-q2',
              number: 2,
              prompt: 'Blackton drew faces on a ___.',
              answer: { accepted: ['blackboard'] },
              explanation: { text: 'Blackton drew faces on a blackboard.', evidence: { paragraphId: '3', quote: 'drew faces on a blackboard' } },
            },
            {
              id: 'm19r-q3',
              number: 3,
              prompt: 'Steamboat Willie was the first cartoon with ___.',
              answer: { accepted: ['sound'] },
              explanation: { text: 'Steamboat Willie was the first cartoon with sound.', evidence: { paragraphId: '4', quote: 'the first cartoon with sound' } },
            },
            {
              id: 'm19r-q4',
              number: 4,
              prompt: 'Snow White and the Seven Dwarfs took ___ years to make.',
              answer: { accepted: ['three'] },
              explanation: { text: 'The film took three years to make.', evidence: { paragraphId: '5', quote: 'took three years to make' } },
            },
            {
              id: 'm19r-q5',
              number: 5,
              prompt: 'Toy Story was the first long film made only with ___.',
              answer: { accepted: ['computers'] },
              explanation: { text: 'Toy Story was the first long film made only with computers.', evidence: { paragraphId: '6', quote: 'the first long film made only with computers' } },
            },
          ],
        },
        {
          id: 'm19r-g2',
          type: 'true-false-not-given',
          instructions:
            'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
          questions: [
            {
              id: 'm19r-q6',
              number: 6,
              prompt: 'The first animated pictures were made with drawings and photographs.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'The first animated pictures were made with drawings and photographs.', evidence: { paragraphId: '1', quote: 'the first animated pictures were made more than a hundred years ago, with drawings and photographs' } },
            },
            {
              id: 'm19r-q7',
              number: 7,
              prompt: 'People watched the moving pictures in a zoetrope through small holes in the side of the box.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'People watched the moving pictures through small holes in the side of the box.', evidence: { paragraphId: '2', quote: 'People watched the moving pictures through small holes in the side of the box' } },
            },
            {
              id: 'm19r-q8',
              number: 8,
              prompt: 'Humorous Phases of Funny Faces was thirty minutes long.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'The film was only three minutes long.', evidence: { paragraphId: '3', quote: 'The film was only three minutes long' } },
            },
            {
              id: 'm19r-q9',
              number: 9,
              prompt: 'More than seven hundred artists worked on Snow White and the Seven Dwarfs.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'More than seven hundred artists worked on the film.', evidence: { paragraphId: '5', quote: 'more than seven hundred artists worked on it' } },
            },
            {
              id: 'm19r-q10',
              number: 10,
              prompt: 'Walt Disney made Steamboat Willie in France.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: { text: 'The passage does not say where Steamboat Willie was made.', evidence: { paragraphId: '4', quote: 'In 1928, Disney made Steamboat Willie' } },
            },
          ],
        },
        {
          id: 'm19r-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm19r-q11',
              number: 11,
              prompt: 'What did the zoetrope do?',
              options: [
                { id: 'A', text: 'It made small pictures seem to move when the box turned round.' },
                { id: 'B', text: 'It made films with sound.' },
                { id: 'C', text: 'It drew faces on a blackboard.' },
                { id: 'D', text: 'It made long films with computers.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'When the box turned round, the pictures seemed to move.',
                evidence: { paragraphId: '2', quote: 'When the box turned round, the pictures seemed to move' },
              },
            },
            {
              id: 'm19r-q12',
              number: 12,
              prompt: 'What was new about Steamboat Willie?',
              options: [
                { id: 'A', text: 'It was the first long animated film.' },
                { id: 'B', text: 'It was the first cartoon with sound.' },
                { id: 'C', text: 'It was made only with computers.' },
                { id: 'D', text: 'It was three minutes long.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Steamboat Willie was the first cartoon with sound.',
                evidence: { paragraphId: '4', quote: 'the first cartoon with sound' },
              },
            },
            {
              id: 'm19r-q13',
              number: 13,
              prompt: 'What does the writer say about animated films today?',
              options: [
                { id: 'A', text: 'Artists no longer draw the characters first.' },
                { id: 'B', text: 'Most animated films are made with computers, but artists still draw the characters first.' },
                { id: 'C', text: 'Animated films no longer tell a good story.' },
                { id: 'D', text: 'No animated films are made with computers.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Most animated films are made with computers, but artists still draw the characters first.',
                evidence: { paragraphId: '6', quote: 'most animated films are made with computers, but artists still draw the characters first' },
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
        title: 'The Future of Food',
        paragraphs: [
          {
            id: 'A',
            labelled: true,
            text: 'By the year 2050, there will be almost ten billion people in the world, and all of these people will need food. At the same time, the land where farmers grow food is becoming smaller, because towns are growing bigger and because the weather is changing. Scientists say that we must find new ways to grow food, or many people will not have enough to eat.',
          },
          {
            id: 'B',
            labelled: true,
            text: 'One new way to grow food is in vertical farms. A vertical farm is a building where plants grow in rows, one above another, under electric lights. Vertical farms use much less water than normal farms, and they can grow food all year, in any weather. However, vertical farms use a lot of electricity, and they are expensive to build.',
          },
          {
            id: 'C',
            labelled: true,
            text: 'Another new food is meat made in a laboratory. Scientists take a small number of cells from a cow or a chicken, and they grow these cells into meat. This meat tastes like normal meat, but no animal is killed to make it. Laboratory meat is still very expensive, but scientists think that it will become cheaper in the next ten years.',
          },
          {
            id: 'D',
            labelled: true,
            text: 'Insects may also become an important food in the future. In many parts of Asia and Africa, people already eat insects, and insects are rich in protein. Farmers can grow insects with very little land and water, and insects make much less gas that warms the planet than cows do.',
          },
          {
            id: 'E',
            labelled: true,
            text: 'Some people think that we should eat less meat and more plants. Meat uses a lot of land and water, because farmers must grow food for animals as well as for people. If people ate more beans, lentils and vegetables, farmers could grow food for more people on the same land.',
          },
          {
            id: 'F',
            labelled: true,
            text: 'There are problems with these new foods. Many people do not want to eat insects or meat made in a laboratory, because the food seems strange to them. Governments must also make new rules about these foods, to make sure that they are safe to eat.',
          },
          {
            id: 'G',
            labelled: true,
            text: 'In conclusion, the food of the future will probably be very different from the food of today. Vertical farms, laboratory meat and insects may all help to feed ten billion people, but only if people are ready to try new foods and if farmers can grow these foods cheaply.',
          },
        ],
      },
      groups: [
        {
          id: 'm19r-g4',
          type: 'matching-headings',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings below.',
          optionsTitle: 'List of Headings',
          options: [
            { id: 'i', text: 'The problem of feeding more people' },
            { id: 'ii', text: 'Farming inside buildings' },
            { id: 'iii', text: 'Meat without animals' },
            { id: 'iv', text: 'Small animals as food' },
            { id: 'v', text: 'Eating more plants' },
            { id: 'vi', text: 'Why new foods are difficult to accept' },
            { id: 'vii', text: 'Food from the sea' },
            { id: 'viii', text: 'Cooking in the future' },
          ],
          questions: [
            {
              id: 'm19r-q14',
              number: 14,
              prompt: 'Paragraph B',
              answer: { accepted: ['ii'] },
              explanation: { text: 'The paragraph is about vertical farms, where plants grow inside a building.', evidence: { paragraphId: 'B', quote: 'A vertical farm is a building where plants grow in rows' } },
            },
            {
              id: 'm19r-q15',
              number: 15,
              prompt: 'Paragraph C',
              answer: { accepted: ['iii'] },
              explanation: { text: 'The paragraph is about meat made in a laboratory, without killing an animal.', evidence: { paragraphId: 'C', quote: 'no animal is killed to make it' } },
            },
            {
              id: 'm19r-q16',
              number: 16,
              prompt: 'Paragraph D',
              answer: { accepted: ['iv'] },
              explanation: { text: 'The paragraph is about insects as food.', evidence: { paragraphId: 'D', quote: 'Insects may also become an important food in the future' } },
            },
            {
              id: 'm19r-q17',
              number: 17,
              prompt: 'Paragraph E',
              answer: { accepted: ['v'] },
              explanation: { text: 'The paragraph is about eating less meat and more plants.', evidence: { paragraphId: 'E', quote: 'we should eat less meat and more plants' } },
            },
            {
              id: 'm19r-q18',
              number: 18,
              prompt: 'Paragraph F',
              answer: { accepted: ['vi'] },
              explanation: { text: 'The paragraph is about problems with new foods, including people not wanting to eat them.', evidence: { paragraphId: 'F', quote: 'Many people do not want to eat insects or meat made in a laboratory' } },
            },
          ],
        },
        {
          id: 'm19r-g5',
          type: 'table-completion',
          instructions: 'Complete the table below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          table: {
            headers: ['New food', 'Detail'],
            rows: [
              ['Vertical farms', 'Plants grow in rows, one above another, under electric {{19}}'],
              ['Laboratory meat', 'Scientists grow meat from a small number of {{20}} from an animal'],
              ['Insects', 'Insects are rich in {{21}}'],
              ['Plants', 'Farmers could grow food for more people if people ate more beans, lentils and {{22}}'],
            ],
          },
          questions: [
            { id: 'm19r-q19', number: 19, answer: { accepted: ['lights'] }, explanation: { text: 'In a vertical farm, plants grow under electric lights.', evidence: { paragraphId: 'B', quote: 'under electric lights' } } },
            { id: 'm19r-q20', number: 20, answer: { accepted: ['cells'] }, explanation: { text: 'Scientists take a small number of cells from a cow or a chicken.', evidence: { paragraphId: 'C', quote: 'take a small number of cells from a cow or a chicken' } } },
            { id: 'm19r-q21', number: 21, answer: { accepted: ['protein'] }, explanation: { text: 'Insects are rich in protein.', evidence: { paragraphId: 'D', quote: 'insects are rich in protein' } } },
            { id: 'm19r-q22', number: 22, answer: { accepted: ['vegetables'] }, explanation: { text: 'If people ate more beans, lentils and vegetables, farmers could grow food for more people.', evidence: { paragraphId: 'E', quote: 'more beans, lentils and vegetables' } } },
          ],
        },
        {
          id: 'm19r-g6',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO things does the writer say about vertical farms?',
          choose: 2,
          options: [
            { id: 'A', text: 'They use much less water than normal farms.' },
            { id: 'B', text: 'They can grow food all year, in any weather.' },
            { id: 'C', text: 'They are cheap to build.' },
            { id: 'D', text: 'They grow food in the sea.' },
            { id: 'E', text: 'They need no electricity.' },
          ],
          questions: [
            { id: 'm19r-q23', number: 23, answer: { accepted: ['A'] }, explanation: { text: 'Vertical farms use much less water than normal farms.', evidence: { paragraphId: 'B', quote: 'Vertical farms use much less water than normal farms' } } },
            { id: 'm19r-q24', number: 24, answer: { accepted: ['B'] }, explanation: { text: 'Vertical farms can grow food all year, in any weather.', evidence: { paragraphId: 'B', quote: 'they can grow food all year, in any weather' } } },
          ],
        },
        {
          id: 'm19r-g7',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO things does the writer say about insects as food?',
          choose: 2,
          options: [
            { id: 'A', text: 'Insects are rich in protein.' },
            { id: 'B', text: 'Farmers can grow insects with very little land and water.' },
            { id: 'C', text: 'Insects are eaten by everyone in the world.' },
            { id: 'D', text: 'Insects make more gas that warms the planet than cows do.' },
            { id: 'E', text: 'Insects are expensive to grow.' },
          ],
          questions: [
            { id: 'm19r-q25', number: 25, answer: { accepted: ['A'] }, explanation: { text: 'Insects are rich in protein.', evidence: { paragraphId: 'D', quote: 'insects are rich in protein' } } },
            { id: 'm19r-q26', number: 26, answer: { accepted: ['B'] }, explanation: { text: 'Farmers can grow insects with very little land and water.', evidence: { paragraphId: 'D', quote: 'Farmers can grow insects with very little land and water' } } },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 3
    {
      id: 'r3',
      number: 3,
      passage: {
        title: 'The Psychology of Happiness',
        paragraphs: [
          {
            id: '1',
            text: 'What makes people happy? For a long time, many people thought that money was the answer. If a person had more money, they could buy more things, and they would be happier. However, in the last fifty years, psychologists have studied happiness, and they have found that the answer is more difficult than this.',
          },
          {
            id: '2',
            text: 'In the 1970s, an American psychologist called Philip Brickman studied people who had won a large amount of money in a lottery. He found that one year after winning, these people were not much happier than other people. Brickman said that people quickly become used to a new life, and they soon want more. He called this idea the hedonic treadmill.',
          },
          {
            id: '3',
            text: 'Other studies have found that money can help people to be happy, but only up to a point. When people have enough money for food, a home and health care, more money does not make them much happier. In one study in America, people who earned more than seventy-five thousand dollars a year were not much happier than people who earned seventy-five thousand dollars a year.',
          },
          {
            id: '4',
            text: 'If money is not the answer, what does make people happy? One important thing is good relationships with other people. People who have close friends and a happy family are usually happier than people who are alone. Spending time with friends, talking and laughing together, can make people feel happy for a long time.',
          },
          {
            id: '5',
            text: 'Another important thing is doing things that have meaning. People feel happy when they help other people, when they learn something new, or when they work towards a goal that is important to them. For example, a study found that people who gave money to other people felt happier than people who spent the same money on themselves.',
          },
          {
            id: '6',
            text: 'Health is also important for happiness. People who exercise often and sleep well are usually happier than people who do not. Exercise helps the body to make chemicals that make people feel good, and a good night of sleep helps people to feel calm and ready for the next day.',
          },
          {
            id: '7',
            text: 'In my view, happiness does not come from one thing alone. Money, friends, meaningful work and good health all play a part, but the most important thing is how people spend their time. People who spend time with others, help others and look after their health are more likely to be happy than people who only try to earn more money.',
          },
        ],
      },
      groups: [
        {
          id: 'm19r-g8',
          type: 'yes-no-not-given',
          instructions:
            'Do the following statements agree with the claims of the writer in Reading Passage 3? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
          questions: [
            {
              id: 'm19r-q27',
              number: 27,
              prompt: 'For a long time, many people thought that money was the answer to happiness.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Many people thought that money was the answer.', evidence: { paragraphId: '1', quote: 'many people thought that money was the answer' } },
            },
            {
              id: 'm19r-q28',
              number: 28,
              prompt: 'One year after winning the lottery, the winners were much happier than other people.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'One year after winning, these people were not much happier than other people.', evidence: { paragraphId: '2', quote: 'these people were not much happier than other people' } },
            },
            {
              id: 'm19r-q29',
              number: 29,
              prompt: 'People who earn more than seventy-five thousand dollars a year are much happier than people who earn seventy-five thousand dollars a year.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'People who earned more than seventy-five thousand dollars a year were not much happier than people who earned seventy-five thousand dollars a year.', evidence: { paragraphId: '3', quote: 'were not much happier than people who earned seventy-five thousand dollars a year' } },
            },
            {
              id: 'm19r-q30',
              number: 30,
              prompt: 'People who have close friends and a happy family are usually happier than people who are alone.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'People who have close friends and a happy family are usually happier than people who are alone.', evidence: { paragraphId: '4', quote: 'People who have close friends and a happy family are usually happier than people who are alone' } },
            },
            {
              id: 'm19r-q31',
              number: 31,
              prompt: 'Exercise helps the body to make chemicals that make people feel good.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Exercise helps the body to make chemicals that make people feel good.', evidence: { paragraphId: '6', quote: 'Exercise helps the body to make chemicals that make people feel good' } },
            },
          ],
        },
        {
          id: 'm19r-g9',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm19r-q32',
              number: 32,
              prompt: 'What did Philip Brickman find about lottery winners?',
              options: [
                { id: 'A', text: 'One year after winning, they were not much happier than other people.' },
                { id: 'B', text: 'One year after winning, they were much happier than other people.' },
                { id: 'C', text: 'They never wanted more money.' },
                { id: 'D', text: 'They gave all their money to other people.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'One year after winning, the lottery winners were not much happier than other people.',
                evidence: { paragraphId: '2', quote: 'one year after winning, these people were not much happier than other people' },
              },
            },
            {
              id: 'm19r-q33',
              number: 33,
              prompt: 'What does the writer say about money and happiness?',
              options: [
                { id: 'A', text: 'More money always makes people much happier.' },
                { id: 'B', text: 'Money can help up to a point, but more money after that does not make people much happier.' },
                { id: 'C', text: 'Money never helps people to be happy.' },
                { id: 'D', text: 'People need no money to be happy.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Money can help people to be happy, but only up to a point.',
                evidence: { paragraphId: '3', quote: 'money can help people to be happy, but only up to a point' },
              },
            },
            {
              id: 'm19r-q34',
              number: 34,
              prompt: 'What does the writer say about giving money to other people?',
              options: [
                { id: 'A', text: 'People who gave money to other people felt happier than people who spent the same money on themselves.' },
                { id: 'B', text: 'People who gave money to other people felt less happy.' },
                { id: 'C', text: 'People never give money to other people.' },
                { id: 'D', text: 'Giving money to other people makes people unhappy.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'People who gave money to other people felt happier than people who spent the same money on themselves.',
                evidence: { paragraphId: '5', quote: 'people who gave money to other people felt happier than people who spent the same money on themselves' },
              },
            },
            {
              id: 'm19r-q35',
              number: 35,
              prompt: "What is the writer's view?",
              options: [
                { id: 'A', text: 'Happiness comes only from earning more money.' },
                { id: 'B', text: 'Happiness comes only from good health.' },
                { id: 'C', text: 'Happiness does not come from one thing alone, but how people spend their time matters most.' },
                { id: 'D', text: 'Happiness is impossible to study.' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'Happiness does not come from one thing alone, and the most important thing is how people spend their time.',
                evidence: { paragraphId: '7', quote: 'happiness does not come from one thing alone' },
              },
            },
          ],
        },
        {
          id: 'm19r-g10',
          type: 'matching-sentence-endings',
          instructions: 'Complete each sentence with the correct ending, A–H.',
          optionsTitle: 'List of Endings',
          options: [
            { id: 'A', text: 'called this idea the hedonic treadmill.' },
            { id: 'B', text: 'were not much happier than people who earned seventy-five thousand dollars a year.' },
            { id: 'C', text: 'are usually happier than people who are alone.' },
            { id: 'D', text: 'felt happier than people who spent the same money on themselves.' },
            { id: 'E', text: 'helps people to feel calm and ready for the next day.' },
            { id: 'F', text: 'are more likely to be happy than people who only try to earn more money.' },
            { id: 'G', text: 'were much happier than other people.' },
            { id: 'H', text: 'never wanted more money.' },
          ],
          questions: [
            { id: 'm19r-q36', number: 36, prompt: 'Philip Brickman', answer: { accepted: ['A'] }, explanation: { text: 'Brickman called this idea the hedonic treadmill.', evidence: { paragraphId: '2', quote: 'He called this idea the hedonic treadmill' } } },
            { id: 'm19r-q37', number: 37, prompt: 'People who earned more than seventy-five thousand dollars a year', answer: { accepted: ['B'] }, explanation: { text: 'People who earned more than seventy-five thousand dollars a year were not much happier than people who earned seventy-five thousand dollars a year.', evidence: { paragraphId: '3', quote: 'were not much happier than people who earned seventy-five thousand dollars a year' } } },
            { id: 'm19r-q38', number: 38, prompt: 'People who have close friends and a happy family', answer: { accepted: ['C'] }, explanation: { text: 'People who have close friends and a happy family are usually happier than people who are alone.', evidence: { paragraphId: '4', quote: 'are usually happier than people who are alone' } } },
            { id: 'm19r-q39', number: 39, prompt: 'People who gave money to other people', answer: { accepted: ['D'] }, explanation: { text: 'People who gave money to other people felt happier than people who spent the same money on themselves.', evidence: { paragraphId: '5', quote: 'felt happier than people who spent the same money on themselves' } } },
            { id: 'm19r-q40', number: 40, prompt: 'People who spend time with others, help others and look after their health', answer: { accepted: ['F'] }, explanation: { text: 'People who spend time with others, help others and look after their health are more likely to be happy.', evidence: { paragraphId: '7', quote: 'are more likely to be happy than people who only try to earn more money' } } },
          ],
        },
      ],
    },
  ],
};
