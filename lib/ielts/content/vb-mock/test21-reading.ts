import type { ObjectiveSection } from '../../model';

/**
 * Mino Academic Mock Test 21 — Reading. Three original passages written
 * for Mino at IELTS Academic level (40 questions, 60 minutes).
 * Not Cambridge material. All passages, questions and answers are
 * original and were written fresh for this mock test.
 */
export const mock21Reading: ObjectiveSection = {
  skill: 'reading',
  timeLimitMinutes: 60,
  parts: [
    // ------------------------------------------------------------- Passage 1
    {
      id: 'r1',
      number: 1,
      passage: {
        title: 'The Rise of E-sports',
        paragraphs: [
          {
            id: '1',
            text: 'E-sports, or electronic sports, are video games played as a competition. In an e-sports match, two teams of players sit at computers and play a game against each other, while thousands of people watch, either in a large hall or on the internet. Twenty years ago, few people had heard of e-sports. Today, they are watched by millions of people around the world.',
          },
          {
            id: '2',
            text: 'The first video game competitions took place in the nineteen-seventies, when students played simple games in university halls. These early competitions were small, and the winners received only a small prize. In the nineteen-nineties, faster computers and the internet made it possible for people in different countries to play against each other from their own homes.',
          },
          {
            id: '3',
            text: 'The big change came with live video on the internet. From about two thousand and ten, fans could watch matches live, and they could also talk to other fans while they watched. Some of the most popular players became famous, and they earned money from the companies that paid them to play, and from the fans who watched their games.',
          },
          {
            id: '4',
            text: 'Today, the biggest e-sports events fill sports stadiums. In two thousand and nineteen, for example, more than nineteen thousand people watched the final of a game called League of Legends in Paris, and millions more watched on the internet. The winning team received a prize of more than two million dollars.',
          },
          {
            id: '5',
            text: 'Some people say that e-sports are not real sports, because the players sit down and do not run or jump. Others say that e-sports players need the same skills as other sports players: fast hands, good eyes, quick thinking, and the ability to work as a team. Professional players train for many hours every day, and they follow a strict plan for food, sleep and exercise.',
          },
          {
            id: '6',
            text: 'Schools and universities are also becoming interested in e-sports. Some schools now have e-sports teams, and some universities offer money to help good players pay for their studies. Supporters say that e-sports can teach young people how to work in a team and how to stay calm under pressure. Critics worry that young people may spend too much time playing games, and too little time on their school work.',
          },
        ],
      },
      groups: [
        {
          id: 'm21r-g1',
          type: 'sentence-completion',
          instructions: 'Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          questions: [
            {
              id: 'm21r-q1',
              number: 1,
              prompt: 'In an e-sports match, two teams of players sit at ___ and play a game against each other.',
              answer: { accepted: ['computers'] },
              explanation: { text: 'Two teams of players sit at computers and play a game against each other.', evidence: { paragraphId: '1', quote: 'sit at computers' } },
            },
            {
              id: 'm21r-q2',
              number: 2,
              prompt: 'The first video game competitions took place in the ___.',
              answer: { accepted: ['nineteen-seventies'] },
              explanation: { text: 'The first video game competitions took place in the nineteen-seventies.', evidence: { paragraphId: '2', quote: 'took place in the nineteen-seventies' } },
            },
            {
              id: 'm21r-q3',
              number: 3,
              prompt: 'From about two thousand and ten, fans could watch matches ___.',
              answer: { accepted: ['live'] },
              explanation: { text: 'Fans could watch matches live.', evidence: { paragraphId: '3', quote: 'fans could watch matches live' } },
            },
            {
              id: 'm21r-q4',
              number: 4,
              prompt: 'In two thousand and nineteen, more than nineteen thousand people watched the final in ___.',
              answer: { accepted: ['Paris'] },
              explanation: { text: 'More than nineteen thousand people watched the final in Paris.', evidence: { paragraphId: '4', quote: 'in Paris' } },
            },
            {
              id: 'm21r-q5',
              number: 5,
              prompt: 'Professional players train for many hours every day, and they follow a strict plan for food, sleep and ___.',
              answer: { accepted: ['exercise'] },
              explanation: { text: 'They follow a strict plan for food, sleep and exercise.', evidence: { paragraphId: '5', quote: 'food, sleep and exercise' } },
            },
          ],
        },
        {
          id: 'm21r-g2',
          type: 'true-false-not-given',
          instructions:
            'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
          questions: [
            {
              id: 'm21r-q6',
              number: 6,
              prompt: 'Twenty years ago, few people had heard of e-sports.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'Twenty years ago, few people had heard of e-sports.', evidence: { paragraphId: '1', quote: 'Twenty years ago, few people had heard of e-sports' } },
            },
            {
              id: 'm21r-q7',
              number: 7,
              prompt: 'The first video game competitions were large events with big prizes.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'These early competitions were small, and the winners received only a small prize.', evidence: { paragraphId: '2', quote: 'These early competitions were small' } },
            },
            {
              id: 'm21r-q8',
              number: 8,
              prompt: 'The winning team in Paris received a prize of more than two million dollars.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'The winning team received a prize of more than two million dollars.', evidence: { paragraphId: '4', quote: 'a prize of more than two million dollars' } },
            },
            {
              id: 'm21r-q9',
              number: 9,
              prompt: 'E-sports players do not need to work as a team.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'E-sports players need the ability to work as a team.', evidence: { paragraphId: '5', quote: 'the ability to work as a team' } },
            },
            {
              id: 'm21r-q10',
              number: 10,
              prompt: 'All universities now offer money to e-sports players.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: { text: 'The passage says some universities offer money, not all of them.', evidence: { paragraphId: '6', quote: 'some universities offer money to help good players' } },
            },
          ],
        },
        {
          id: 'm21r-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm21r-q11',
              number: 11,
              prompt: 'What helped e-sports to grow from about two thousand and ten?',
              options: [
                { id: 'A', text: 'live video on the internet' },
                { id: 'B', text: 'bigger sports stadiums' },
                { id: 'C', text: 'new laws about video games' },
                { id: 'D', text: 'cheaper computers for schools' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The big change came with live video on the internet.',
                evidence: { paragraphId: '3', quote: 'The big change came with live video on the internet' },
              },
            },
            {
              id: 'm21r-q12',
              number: 12,
              prompt: 'What do critics of e-sports worry about?',
              options: [
                { id: 'A', text: 'that e-sports players earn too much money' },
                { id: 'B', text: 'that young people may spend too much time playing games' },
                { id: 'C', text: 'that stadiums are too small for e-sports events' },
                { id: 'D', text: 'that video games are too easy to play' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Critics worry that young people may spend too much time playing games.',
                evidence: { paragraphId: '6', quote: 'Critics worry that young people may spend too much time playing games' },
              },
            },
            {
              id: 'm21r-q13',
              number: 13,
              prompt: 'What does the writer say about professional e-sports players?',
              options: [
                { id: 'A', text: 'They train for many hours every day.' },
                { id: 'B', text: 'They never exercise.' },
                { id: 'C', text: 'They play only at weekends.' },
                { id: 'D', text: 'They do not earn any money.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Professional players train for many hours every day.',
                evidence: { paragraphId: '5', quote: 'Professional players train for many hours every day' },
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
        title: 'Why We Dream',
        paragraphs: [
          {
            id: 'A',
            labelled: true,
            text: 'Every night, while we sleep, we dream. Most people dream for about two hours every night, although they often forget their dreams when they wake up. Dreams can be happy, frightening or strange, and scientists have studied them for more than a hundred years. Yet no one knows for certain why we dream.',
          },
          {
            id: 'B',
            labelled: true,
            text: 'Dreams happen during a part of sleep called REM sleep. REM stands for rapid eye movement, because the eyes move quickly under the closed eyelids during this kind of sleep. During REM sleep, the brain is almost as active as it is when we are awake, but the body cannot move. Most dreams happen during REM sleep, and if a person is woken during REM sleep, they are more likely to remember a dream.',
          },
          {
            id: 'C',
            labelled: true,
            text: 'One idea is that dreams help us to remember things. During the day, we learn many new things, and the brain needs time to store them. Some scientists think that dreams are a way for the brain to practise what it has learned, and to move important memories into long-term storage. In one study, students who dreamed about a difficult task did better at that task the next day than students who did not dream about it.',
          },
          {
            id: 'D',
            labelled: true,
            text: 'Another idea is that dreams help us to deal with feelings. In dreams, we often meet people we know, and we live through difficult or worrying events. Some scientists believe that dreaming is a safe way to practise dealing with fear, anger or sadness, so that we can deal with these feelings better in real life.',
          },
          {
            id: 'E',
            labelled: true,
            text: 'A third idea is that dreams help the brain to forget things it does not need. Every day, the brain takes in a huge amount of information, and much of it is not important. Some scientists think that dreams are the brain sorting through this information and throwing away what is not needed, so that the brain is ready for the next day.',
          },
          {
            id: 'F',
            labelled: true,
            text: 'Not all scientists agree with these ideas. Some think that dreams have no purpose at all, and that they are simply the result of the brain working while we sleep. They point out that it is very hard to test ideas about dreams, because we cannot see a dream, and we must depend on what people tell us after they wake up.',
          },
          {
            id: 'G',
            labelled: true,
            text: 'In conclusion, dreams remain a mystery. They may help us to remember, to deal with feelings, or to forget what we do not need. Or they may have no purpose at all. What is certain is that dreams are a normal part of sleep, and that most people dream every night, whether they remember their dreams or not.',
          },
        ],
      },
      groups: [
        {
          id: 'm21r-g4',
          type: 'matching-headings',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings below.',
          optionsTitle: 'List of Headings',
          options: [
            { id: 'i', text: 'Dreams and sleep' },
            { id: 'ii', text: 'Dreams help us remember' },
            { id: 'iii', text: 'Dreams help us with feelings' },
            { id: 'iv', text: 'Dreams help us forget' },
            { id: 'v', text: 'Dreams may have no purpose' },
            { id: 'vi', text: 'Why we sleep' },
            { id: 'vii', text: 'A mystery of the night' },
            { id: 'viii', text: 'How to remember dreams' },
          ],
          questions: [
            {
              id: 'm21r-q14',
              number: 14,
              prompt: 'Paragraph B',
              answer: { accepted: ['i'] },
              explanation: { text: 'The paragraph is about dreams and REM sleep.', evidence: { paragraphId: 'B', quote: 'Dreams happen during a part of sleep called REM sleep' } },
            },
            {
              id: 'm21r-q15',
              number: 15,
              prompt: 'Paragraph C',
              answer: { accepted: ['ii'] },
              explanation: { text: 'The paragraph is about dreams helping us to remember things.', evidence: { paragraphId: 'C', quote: 'dreams help us to remember things' } },
            },
            {
              id: 'm21r-q16',
              number: 16,
              prompt: 'Paragraph D',
              answer: { accepted: ['iii'] },
              explanation: { text: 'The paragraph is about dreams helping us to deal with feelings.', evidence: { paragraphId: 'D', quote: 'dreams help us to deal with feelings' } },
            },
            {
              id: 'm21r-q17',
              number: 17,
              prompt: 'Paragraph E',
              answer: { accepted: ['iv'] },
              explanation: { text: 'The paragraph is about dreams helping the brain to forget things it does not need.', evidence: { paragraphId: 'E', quote: 'dreams help the brain to forget things it does not need' } },
            },
            {
              id: 'm21r-q18',
              number: 18,
              prompt: 'Paragraph F',
              answer: { accepted: ['v'] },
              explanation: { text: 'The paragraph is about the idea that dreams may have no purpose at all.', evidence: { paragraphId: 'F', quote: 'dreams have no purpose at all' } },
            },
          ],
        },
        {
          id: 'm21r-g5',
          type: 'table-completion',
          instructions: 'Complete the table below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          table: {
            headers: ['Idea about dreams', 'Detail'],
            rows: [
              ['Remembering', 'Dreams may move important memories into long-term {{19}}'],
              ['Feelings', 'Dreaming is a safe way to practise dealing with fear, anger or {{20}}'],
              ['Forgetting', 'The brain takes in a huge amount of {{21}} every day'],
              ['No purpose', 'We must depend on what people tell us after they wake {{22}}'],
            ],
          },
          questions: [
            { id: 'm21r-q19', number: 19, answer: { accepted: ['storage'] }, explanation: { text: 'Dreams move important memories into long-term storage.', evidence: { paragraphId: 'C', quote: 'into long-term storage' } } },
            { id: 'm21r-q20', number: 20, answer: { accepted: ['sadness'] }, explanation: { text: 'Dreaming is a safe way to practise dealing with fear, anger or sadness.', evidence: { paragraphId: 'D', quote: 'fear, anger or sadness' } } },
            { id: 'm21r-q21', number: 21, answer: { accepted: ['information'] }, explanation: { text: 'The brain takes in a huge amount of information every day.', evidence: { paragraphId: 'E', quote: 'a huge amount of information' } } },
            { id: 'm21r-q22', number: 22, answer: { accepted: ['up'] }, explanation: { text: 'We must depend on what people tell us after they wake up.', evidence: { paragraphId: 'F', quote: 'after they wake up' } } },
          ],
        },
        {
          id: 'm21r-g6',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO things does the writer say about REM sleep?',
          choose: 2,
          options: [
            { id: 'A', text: 'During REM sleep, the brain is almost as active as when we are awake.' },
            { id: 'B', text: 'During REM sleep, the body cannot move.' },
            { id: 'C', text: 'REM sleep happens only once a night.' },
            { id: 'D', text: 'No dreams happen during REM sleep.' },
            { id: 'E', text: 'The eyes do not move during REM sleep.' },
          ],
          questions: [
            { id: 'm21r-q23', number: 23, answer: { accepted: ['A'] }, explanation: { text: 'During REM sleep, the brain is almost as active as it is when we are awake.', evidence: { paragraphId: 'B', quote: 'the brain is almost as active as it is when we are awake' } } },
            { id: 'm21r-q24', number: 24, answer: { accepted: ['B'] }, explanation: { text: 'During REM sleep, the body cannot move.', evidence: { paragraphId: 'B', quote: 'the body cannot move' } } },
          ],
        },
        {
          id: 'm21r-g7',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO things does the writer say about dreams in general?',
          choose: 2,
          options: [
            { id: 'A', text: 'Most people dream for about two hours every night.' },
            { id: 'B', text: 'Dreams are a normal part of sleep.' },
            { id: 'C', text: 'Everyone remembers their dreams.' },
            { id: 'D', text: 'Scientists know for certain why we dream.' },
            { id: 'E', text: 'Dreams happen only when we are awake.' },
          ],
          questions: [
            { id: 'm21r-q25', number: 25, answer: { accepted: ['A'] }, explanation: { text: 'Most people dream for about two hours every night.', evidence: { paragraphId: 'A', quote: 'Most people dream for about two hours every night' } } },
            { id: 'm21r-q26', number: 26, answer: { accepted: ['B'] }, explanation: { text: 'Dreams are a normal part of sleep.', evidence: { paragraphId: 'G', quote: 'dreams are a normal part of sleep' } } },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 3
    {
      id: 'r3',
      number: 3,
      passage: {
        title: 'The History of Board Games',
        paragraphs: [
          {
            id: '1',
            text: 'Board games have been played for thousands of years. Long before computers and televisions, people sat together around a board and played games with pieces, dice and cards. Some of the oldest board games were played in Egypt more than five thousand years ago, and boards and pieces from those games have been found in the tombs of kings.',
          },
          {
            id: '2',
            text: 'One of the oldest games is Senet, from Egypt. Senet was played on a board with thirty squares, and players moved their pieces along the board by throwing sticks. The game was so important that pictures of people playing Senet were painted on the walls of tombs, and a Senet board was often placed in a tomb with the dead person.',
          },
          {
            id: '3',
            text: 'Another old game is chess, which began in India more than one thousand five hundred years ago. At first, the game was called chaturanga, and it was played by four players. The game moved to Persia, where it was called shatranj, and then to Europe, where the rules changed slowly over hundreds of years. Today, chess is played all over the world, and the best players are known in many countries.',
          },
          {
            id: '4',
            text: 'In the nineteenth century, board games became popular in homes in Europe and America. New games were made for families, and they were sold in shops for the first time. One famous game, Monopoly, was first sold in nineteen thirty-five. In Monopoly, players buy and sell houses and hotels, and the player who has the most money at the end wins the game.',
          },
          {
            id: '5',
            text: 'In the twentieth century, board games changed again. After the Second World War, games became cheaper to make, because they could be printed in large numbers. In the nineteen-eighties, video games became popular, and many people thought that board games would disappear. However, board games did not disappear: families still liked to play together, and new games were made every year.',
          },
          {
            id: '6',
            text: 'Today, board games are more popular than ever. Every year, thousands of new board games are made, and many of them are made by small companies. Some games take only ten minutes to play, while others take many hours. Board game cafes, where people can pay to play games and drink coffee, have opened in many cities, and board game competitions are held in many countries.',
          },
          {
            id: '7',
            text: 'In my view, board games will continue to be popular, because they do something that video games cannot do so well: they bring people together in the same room. When people play a board game, they talk, they laugh, and they look at each other. That is the real reason why board games have lasted for thousands of years, and why they will last for many more.',
          },
        ],
      },
      groups: [
        {
          id: 'm21r-g8',
          type: 'yes-no-not-given',
          instructions:
            'Do the following statements agree with the claims of the writer in Reading Passage 3? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
          questions: [
            {
              id: 'm21r-q27',
              number: 27,
              prompt: 'Board games have been played for thousands of years.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Board games have been played for thousands of years.', evidence: { paragraphId: '1', quote: 'Board games have been played for thousands of years' } },
            },
            {
              id: 'm21r-q28',
              number: 28,
              prompt: 'Senet was played on a board with thirty squares.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Senet was played on a board with thirty squares.', evidence: { paragraphId: '2', quote: 'a board with thirty squares' } },
            },
            {
              id: 'm21r-q29',
              number: 29,
              prompt: 'Chess began in Persia.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'Chess began in India, and later moved to Persia.', evidence: { paragraphId: '3', quote: 'chess, which began in India' } },
            },
            {
              id: 'm21r-q30',
              number: 30,
              prompt: 'Board games disappeared in the nineteen-eighties.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'Board games did not disappear in the nineteen-eighties.', evidence: { paragraphId: '5', quote: 'board games did not disappear' } },
            },
            {
              id: 'm21r-q31',
              number: 31,
              prompt: 'Board game cafes have opened in many cities.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Board game cafes have opened in many cities.', evidence: { paragraphId: '6', quote: 'have opened in many cities' } },
            },
          ],
        },
        {
          id: 'm21r-g9',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm21r-q32',
              number: 32,
              prompt: 'Where have boards and pieces from the oldest games been found?',
              options: [
                { id: 'A', text: 'in the tombs of kings' },
                { id: 'B', text: 'in schools' },
                { id: 'C', text: 'in shops' },
                { id: 'D', text: 'in museums in India' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Boards and pieces from those games have been found in the tombs of kings.',
                evidence: { paragraphId: '1', quote: 'have been found in the tombs of kings' },
              },
            },
            {
              id: 'm21r-q33',
              number: 33,
              prompt: 'What happened to chess in Europe?',
              options: [
                { id: 'A', text: 'The rules changed slowly over hundreds of years.' },
                { id: 'B', text: 'The game was forgotten.' },
                { id: 'C', text: 'The game was played by four players.' },
                { id: 'D', text: 'The game was called chaturanga.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'In Europe, the rules changed slowly over hundreds of years.',
                evidence: { paragraphId: '3', quote: 'the rules changed slowly over hundreds of years' },
              },
            },
            {
              id: 'm21r-q34',
              number: 34,
              prompt: 'When was Monopoly first sold?',
              options: [
                { id: 'A', text: 'in nineteen twenty-five' },
                { id: 'B', text: 'in nineteen thirty-five' },
                { id: 'C', text: 'in nineteen forty-five' },
                { id: 'D', text: 'in nineteen fifty-five' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Monopoly was first sold in nineteen thirty-five.',
                evidence: { paragraphId: '4', quote: 'first sold in nineteen thirty-five' },
              },
            },
            {
              id: 'm21r-q35',
              number: 35,
              prompt: "What is the writer's view?",
              options: [
                { id: 'A', text: 'Board games will disappear soon.' },
                { id: 'B', text: 'Board games bring people together in the same room.' },
                { id: 'C', text: 'Video games are better than board games.' },
                { id: 'D', text: 'Board games are too expensive today.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Board games bring people together in the same room.',
                evidence: { paragraphId: '7', quote: 'they bring people together in the same room' },
              },
            },
          ],
        },
        {
          id: 'm21r-g10',
          type: 'matching-sentence-endings',
          instructions: 'Complete each sentence with the correct ending, A–H.',
          optionsTitle: 'List of Endings',
          options: [
            { id: 'A', text: 'were painted on the walls of tombs.' },
            { id: 'B', text: 'was played by four players.' },
            { id: 'C', text: 'buy and sell houses and hotels.' },
            { id: 'D', text: 'became cheaper to make.' },
            { id: 'E', text: 'have opened in many cities.' },
            { id: 'F', text: 'bring people together in the same room.' },
            { id: 'G', text: 'were played in Egypt more than five thousand years ago.' },
            { id: 'H', text: 'take only ten minutes to play.' },
          ],
          questions: [
            { id: 'm21r-q36', number: 36, prompt: 'Some of the oldest board games', answer: { accepted: ['G'] }, explanation: { text: 'Some of the oldest board games were played in Egypt more than five thousand years ago.', evidence: { paragraphId: '1', quote: 'were played in Egypt more than five thousand years ago' } } },
            { id: 'm21r-q37', number: 37, prompt: 'Pictures of people playing Senet', answer: { accepted: ['A'] }, explanation: { text: 'Pictures of people playing Senet were painted on the walls of tombs.', evidence: { paragraphId: '2', quote: 'were painted on the walls of tombs' } } },
            { id: 'm21r-q38', number: 38, prompt: 'In Monopoly, players', answer: { accepted: ['C'] }, explanation: { text: 'In Monopoly, players buy and sell houses and hotels.', evidence: { paragraphId: '4', quote: 'buy and sell houses and hotels' } } },
            { id: 'm21r-q39', number: 39, prompt: 'After the Second World War, games', answer: { accepted: ['D'] }, explanation: { text: 'After the Second World War, games became cheaper to make.', evidence: { paragraphId: '5', quote: 'games became cheaper to make' } } },
            { id: 'm21r-q40', number: 40, prompt: 'Board games', answer: { accepted: ['F'] }, explanation: { text: 'Board games bring people together in the same room.', evidence: { paragraphId: '7', quote: 'bring people together in the same room' } } },
          ],
        },
      ],
    },
  ],
};
