import type { ObjectiveSection } from '../../model';

/**
 * Mino Academic Mock Test 13 — Reading. Three original passages written
 * for Mino at IELTS Academic level (40 questions, 60 minutes).
 * Not Cambridge material. All passages, questions and answers are
 * original and were written fresh for this mock test.
 */
export const mock13Reading: ObjectiveSection = {
  skill: 'reading',
  timeLimitMinutes: 60,
  parts: [
    // ------------------------------------------------------------- Passage 1
    {
      id: 'r1',
      number: 1,
      passage: {
        title: 'The History of Clocks',
        paragraphs: [
          {
            id: '1',
            text: 'People have wanted to know the time for thousands of years. The first clocks were not machines at all: they used the sun, water or sand to measure time. A sundial, for example, uses the shadow of the sun to show the time, but it only works when the sun is shining. A water clock uses water falling slowly from one container to another, and a sand clock, which we now call an hourglass, uses sand falling through a narrow opening.',
          },
          {
            id: '2',
            text: 'The first mechanical clocks were built in Europe in the fourteenth century, and they were very large. They were placed in church towers, and they had no hands at all: they showed the time by ringing a bell every hour. The word clock comes from the Latin word clocca, which means bell. These early clocks were not very accurate, and they could lose as much as fifteen minutes every day.',
          },
          {
            id: '3',
            text: 'In the seventeenth century, a Dutch scientist called Christiaan Huygens built the first pendulum clock, which used a swinging weight called a pendulum to keep time. Pendulum clocks were much more accurate than earlier clocks, and they were soon used in homes all over Europe. In 1656, Huygens built a clock that lost only a few seconds every day.',
          },
          {
            id: '4',
            text: 'In the eighteenth century, a clockmaker called John Harrison built a clock for ships, called a chronometer, which could keep accurate time at sea. This was very important, because sailors needed to know the exact time to find out where their ship was. Harrison\'s chronometer was tested on a long sea journey in 1761, and it lost only a few seconds during the whole journey.',
          },
          {
            id: '5',
            text: 'In the twentieth century, clocks became smaller and cheaper, and almost every home had a clock on the wall or on a table. In 1927, the first electric clock was built, and later, in the 1960s, the first quartz clock was built, which used a small piece of quartz crystal to keep time. Quartz clocks are very accurate, and they are still used in most watches today.',
          },
          {
            id: '6',
            text: 'Today, most people do not look at a clock on the wall to know the time: they look at their phone. Phones get the time from satellites, and they are almost never wrong. However, many people still love old clocks, and beautiful clocks from the past are now kept in museums. Clocks have changed a great deal, but they are still an important part of our lives.',
          },
        ],
      },
      groups: [
        {
          id: 'm13r-g1',
          type: 'sentence-completion',
          instructions: 'Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          questions: [
            {
              id: 'm13r-q1',
              number: 1,
              prompt: 'The first clocks used the sun, ___ or sand to measure time.',
              answer: { accepted: ['water'] },
              explanation: { text: 'The first clocks used the sun, water or sand to measure time.', evidence: { paragraphId: '1', quote: 'they used the sun, water or sand to measure time' } },
            },
            {
              id: 'm13r-q2',
              number: 2,
              prompt: 'A sundial uses the ___ of the sun to show the time.',
              answer: { accepted: ['shadow'] },
              explanation: { text: 'A sundial uses the shadow of the sun to show the time.', evidence: { paragraphId: '1', quote: 'uses the shadow of the sun to show the time' } },
            },
            {
              id: 'm13r-q3',
              number: 3,
              prompt: 'The first mechanical clocks were placed in church ___.',
              answer: { accepted: ['towers'] },
              explanation: { text: 'The first mechanical clocks were placed in church towers.', evidence: { paragraphId: '2', quote: 'placed in church towers' } },
            },
            {
              id: 'm13r-q4',
              number: 4,
              prompt: 'The word clock comes from the Latin word ___, which means bell.',
              answer: { accepted: ['clocca'] },
              explanation: { text: 'The word clock comes from the Latin word clocca, which means bell.', evidence: { paragraphId: '2', quote: 'from the Latin word clocca' } },
            },
            {
              id: 'm13r-q5',
              number: 5,
              prompt: 'In 1656, Huygens built a clock that lost only a few ___ every day.',
              answer: { accepted: ['seconds'] },
              explanation: { text: 'In 1656, Huygens built a clock that lost only a few seconds every day.', evidence: { paragraphId: '3', quote: 'lost only a few seconds every day' } },
            },
          ],
        },
        {
          id: 'm13r-g2',
          type: 'true-false-not-given',
          instructions:
            'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
          questions: [
            {
              id: 'm13r-q6',
              number: 6,
              prompt: 'A sundial works at night.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'A sundial only works when the sun is shining.', evidence: { paragraphId: '1', quote: 'it only works when the sun is shining' } },
            },
            {
              id: 'm13r-q7',
              number: 7,
              prompt: 'The first mechanical clocks had hands to show the time.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'The first mechanical clocks had no hands at all.', evidence: { paragraphId: '2', quote: 'they had no hands at all' } },
            },
            {
              id: 'm13r-q8',
              number: 8,
              prompt: 'Pendulum clocks were more accurate than earlier clocks.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'Pendulum clocks were much more accurate than earlier clocks.', evidence: { paragraphId: '3', quote: 'Pendulum clocks were much more accurate than earlier clocks' } },
            },
            {
              id: 'm13r-q9',
              number: 9,
              prompt: "Harrison's chronometer was tested on a long sea journey in 1761.",
              answer: { accepted: ['TRUE'] },
              explanation: { text: "Harrison's chronometer was tested on a long sea journey in 1761.", evidence: { paragraphId: '4', quote: 'was tested on a long sea journey in 1761' } },
            },
            {
              id: 'm13r-q10',
              number: 10,
              prompt: 'Quartz clocks are still used in most watches today.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'Quartz clocks are still used in most watches today.', evidence: { paragraphId: '5', quote: 'they are still used in most watches today' } },
            },
          ],
        },
        {
          id: 'm13r-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm13r-q11',
              number: 11,
              prompt: "Why was Harrison's chronometer important for sailors?",
              options: [
                { id: 'A', text: 'Sailors needed to know the exact time to find out where their ship was.' },
                { id: 'B', text: 'Sailors needed a clock that could ring a bell every hour.' },
                { id: 'C', text: 'Sailors needed a clock that was cheap to make.' },
                { id: 'D', text: 'Sailors needed a clock that worked with sunlight.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Sailors needed to know the exact time to find out where their ship was.',
                evidence: { paragraphId: '4', quote: 'sailors needed to know the exact time to find out where their ship was' },
              },
            },
            {
              id: 'm13r-q12',
              number: 12,
              prompt: 'When was the first electric clock built?',
              options: [
                { id: 'A', text: 'in 1656' },
                { id: 'B', text: 'in 1761' },
                { id: 'C', text: 'in 1927' },
                { id: 'D', text: 'in the 1960s' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'In 1927, the first electric clock was built.',
                evidence: { paragraphId: '5', quote: 'In 1927, the first electric clock was built' },
              },
            },
            {
              id: 'm13r-q13',
              number: 13,
              prompt: 'What does the writer say about clocks today?',
              options: [
                { id: 'A', text: 'Most people look at their phone to know the time.' },
                { id: 'B', text: 'Most people look at a clock on the wall to know the time.' },
                { id: 'C', text: 'Old clocks are no longer kept in museums.' },
                { id: 'D', text: 'Phones get the time from church towers.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Today, most people do not look at a clock on the wall to know the time: they look at their phone.',
                evidence: { paragraphId: '6', quote: 'they look at their phone' },
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
        title: 'The Amazon Rainforest',
        paragraphs: [
          {
            id: 'A',
            labelled: true,
            text: 'The Amazon rainforest is the largest rainforest in the world. It covers more than five million square kilometres, mostly in Brazil, but also in other countries in South America, such as Peru and Colombia. The rainforest is home to about ten per cent of all the animals and plants in the world, and many of them are found nowhere else on Earth.',
          },
          {
            id: 'B',
            labelled: true,
            text: 'The rainforest is often called the lungs of the Earth, because its trees take in carbon dioxide and give out oxygen. The trees of the Amazon store a huge amount of carbon, and if they are cut down, this carbon is released into the air, which can make the Earth warmer. For this reason, scientists say that protecting the rainforest is one of the best ways to slow down climate change.',
          },
          {
            id: 'C',
            labelled: true,
            text: 'Many people live in the Amazon rainforest, including more than four hundred groups of indigenous people, who have lived there for thousands of years. These people know the forest very well: they know which plants can be used as medicine, and they know how to find food in the forest without damaging it. Their knowledge of the forest is now helping scientists to find new medicines.',
          },
          {
            id: 'D',
            labelled: true,
            text: 'The rainforest is in danger. Every year, large areas of forest are cut down to make space for farms, especially for cattle and for soya, which is used to feed animals. Roads are also built through the forest, and these roads make it easier for people to cut down more trees. In the last fifty years, about seventeen per cent of the Amazon rainforest has been lost.',
          },
          {
            id: 'E',
            labelled: true,
            text: 'The loss of the rainforest is a problem for the whole world, not only for Brazil. When trees are cut down, animals lose their homes, and many kinds of animals and plants may disappear for ever. The rainforest also affects the rain in South America and in other parts of the world: if the forest disappears, some places may become much drier.',
          },
          {
            id: 'F',
            labelled: true,
            text: 'There is some good news. In recent years, the governments of Brazil and other countries have made new laws to protect the forest, and the number of trees cut down each year is now falling. Many people around the world are also trying to help: they buy products that do not damage the forest, and they give money to groups that work to protect it.',
          },
          {
            id: 'G',
            labelled: true,
            text: 'The future of the Amazon rainforest depends on what we do now. If we protect the forest, it can continue to give us clean air, clean water and new medicines for many years. If we do not protect it, we may lose one of the most important places on Earth. The rainforest is not only Brazil\'s forest: it belongs to the whole world.',
          },
        ],
      },
      groups: [
        {
          id: 'm13r-g4',
          type: 'matching-headings',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings below.',
          optionsTitle: 'List of Headings',
          options: [
            { id: 'i', text: 'A forest that helps to slow down climate change' },
            { id: 'ii', text: 'People who have lived in the forest for thousands of years' },
            { id: 'iii', text: 'Why the forest is being cut down' },
            { id: 'iv', text: 'The loss of the forest affects the whole world' },
            { id: 'v', text: 'Good news about protecting the forest' },
            { id: 'vi', text: 'The largest rainforest in the world' },
            { id: 'vii', text: 'The future of the rainforest' },
            { id: 'viii', text: 'The history of farming in South America' },
          ],
          questions: [
            {
              id: 'm13r-q14',
              number: 14,
              prompt: 'Paragraph B',
              answer: { accepted: ['i'] },
              explanation: { text: 'The paragraph says that protecting the rainforest is one of the best ways to slow down climate change.', evidence: { paragraphId: 'B', quote: 'protecting the rainforest is one of the best ways to slow down climate change' } },
            },
            {
              id: 'm13r-q15',
              number: 15,
              prompt: 'Paragraph C',
              answer: { accepted: ['ii'] },
              explanation: { text: 'The paragraph describes indigenous people who have lived in the forest for thousands of years.', evidence: { paragraphId: 'C', quote: 'who have lived there for thousands of years' } },
            },
            {
              id: 'm13r-q16',
              number: 16,
              prompt: 'Paragraph D',
              answer: { accepted: ['iii'] },
              explanation: { text: 'The paragraph says that large areas of forest are cut down to make space for farms.', evidence: { paragraphId: 'D', quote: 'large areas of forest are cut down to make space for farms' } },
            },
            {
              id: 'm13r-q17',
              number: 17,
              prompt: 'Paragraph E',
              answer: { accepted: ['iv'] },
              explanation: { text: 'The paragraph says that the loss of the rainforest is a problem for the whole world.', evidence: { paragraphId: 'E', quote: 'The loss of the rainforest is a problem for the whole world' } },
            },
            {
              id: 'm13r-q18',
              number: 18,
              prompt: 'Paragraph F',
              answer: { accepted: ['v'] },
              explanation: { text: 'The paragraph says that the number of trees cut down each year is now falling.', evidence: { paragraphId: 'F', quote: 'the number of trees cut down each year is now falling' } },
            },
          ],
        },
        {
          id: 'm13r-g5',
          type: 'table-completion',
          instructions: 'Complete the table below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          table: {
            headers: ['Topic', 'Detail'],
            rows: [
              ['Size', 'The rainforest covers more than five million square {{19}}'],
              ['People', 'More than four hundred groups of {{20}} people live in the forest'],
              ['Danger', 'Large areas of forest are cut down to make space for {{21}}'],
              ['Loss', 'In the last fifty years, about seventeen per cent of the rainforest has been {{22}}'],
            ],
          },
          questions: [
            { id: 'm13r-q19', number: 19, answer: { accepted: ['kilometres'] }, explanation: { text: 'The rainforest covers more than five million square kilometres.', evidence: { paragraphId: 'A', quote: 'more than five million square kilometres' } } },
            { id: 'm13r-q20', number: 20, answer: { accepted: ['indigenous'] }, explanation: { text: 'More than four hundred groups of indigenous people live in the forest.', evidence: { paragraphId: 'C', quote: 'more than four hundred groups of indigenous people' } } },
            { id: 'm13r-q21', number: 21, answer: { accepted: ['farms'] }, explanation: { text: 'Large areas of forest are cut down to make space for farms.', evidence: { paragraphId: 'D', quote: 'cut down to make space for farms' } } },
            { id: 'm13r-q22', number: 22, answer: { accepted: ['lost'] }, explanation: { text: 'About seventeen per cent of the Amazon rainforest has been lost.', evidence: { paragraphId: 'D', quote: 'about seventeen per cent of the Amazon rainforest has been lost' } } },
          ],
        },
        {
          id: 'm13r-g6',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO things does the writer say about the trees of the Amazon in paragraph B?',
          choose: 2,
          options: [
            { id: 'A', text: 'Trees take in carbon dioxide and give out oxygen.' },
            { id: 'B', text: 'Trees store a huge amount of carbon.' },
            { id: 'C', text: 'Trees are used to build roads through the forest.' },
            { id: 'D', text: 'Trees give out carbon dioxide and take in oxygen.' },
            { id: 'E', text: 'Trees are found nowhere else on Earth.' },
          ],
          questions: [
            { id: 'm13r-q23', number: 23, answer: { accepted: ['A'] }, explanation: { text: 'Trees take in carbon dioxide and give out oxygen.', evidence: { paragraphId: 'B', quote: 'its trees take in carbon dioxide and give out oxygen' } } },
            { id: 'm13r-q24', number: 24, answer: { accepted: ['B'] }, explanation: { text: 'The trees of the Amazon store a huge amount of carbon.', evidence: { paragraphId: 'B', quote: 'store a huge amount of carbon' } } },
          ],
        },
        {
          id: 'm13r-g7',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO reasons does the writer give for the forest being cut down in paragraph D?',
          choose: 2,
          options: [
            { id: 'A', text: 'To make space for farms.' },
            { id: 'B', text: 'Roads are built through the forest.' },
            { id: 'C', text: 'To find new medicines.' },
            { id: 'D', text: 'To build new towns.' },
            { id: 'E', text: 'Because the weather is dry.' },
          ],
          questions: [
            { id: 'm13r-q25', number: 25, answer: { accepted: ['A'] }, explanation: { text: 'Large areas of forest are cut down to make space for farms.', evidence: { paragraphId: 'D', quote: 'cut down to make space for farms' } } },
            { id: 'm13r-q26', number: 26, answer: { accepted: ['B'] }, explanation: { text: 'Roads are also built through the forest.', evidence: { paragraphId: 'D', quote: 'Roads are also built through the forest' } } },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 3
    {
      id: 'r3',
      number: 3,
      passage: {
        title: 'The Impact of Social Media on Teenagers',
        paragraphs: [
          {
            id: '1',
            text: 'In the last fifteen years, social media has become a very important part of life for teenagers all over the world. Most teenagers now have a phone, and many of them spend several hours every day on apps such as video sites, photo apps and messaging apps. They use these apps to talk to their friends, to share photographs and videos, and to find out what is happening in the world.',
          },
          {
            id: '2',
            text: 'Social media has many good sides. It helps teenagers to stay in touch with friends who live far away, and it helps them to find other people who share their interests, such as music or sport. For teenagers who feel shy, it can be easier to talk to people online than to talk to them in person. Social media can also help teenagers to learn new things: many teenagers use video sites to learn how to play a musical instrument or how to cook.',
          },
          {
            id: '3',
            text: 'However, social media also has some serious problems. One of the biggest problems is that teenagers compare themselves with other people online. They see photographs of people who seem to have perfect lives, and they begin to feel unhappy with their own lives. Studies have found that teenagers who spend a lot of time on social media are more likely to feel worried or sad than teenagers who spend less time online.',
          },
          {
            id: '4',
            text: 'Another problem is that social media can take up a lot of time. Many teenagers say that they plan to look at their phones for only a few minutes, but they end up spending hours on social media every day. This can leave less time for homework, sport and sleep, and some teenagers say that they feel tired at school because they stayed up late using their phones.',
          },
          {
            id: '5',
            text: 'There is also the problem of online bullying. Some teenagers receive unkind messages from other people, and these messages can be seen by many people very quickly. Unlike bullying at school, online bullying can happen at any time, even at night, and it can be difficult to escape from it, because the phone is always with the teenager.',
          },
          {
            id: '6',
            text: 'What can be done about these problems? Many experts say that parents should set clear rules about how much time their children spend on social media, and they should talk to their children about what they see online. Schools can also help, by teaching teenagers how to use social media safely and how to understand that photographs online do not always show real life.',
          },
          {
            id: '7',
            text: 'In my view, social media is neither good nor bad: it depends on how teenagers use it. If teenagers use social media for a short time each day, and if they use it to talk to real friends and to learn new things, it can be a good thing. But if they spend hours on it every day, and if they compare themselves with other people, it can damage their health and their happiness. The important thing is to find a balance.',
          },
        ],
      },
      groups: [
        {
          id: 'm13r-g8',
          type: 'yes-no-not-given',
          instructions:
            'Do the following statements agree with the claims of the writer in Reading Passage 3? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
          questions: [
            {
              id: 'm13r-q27',
              number: 27,
              prompt: 'Most teenagers now have a phone.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Most teenagers now have a phone.', evidence: { paragraphId: '1', quote: 'Most teenagers now have a phone' } },
            },
            {
              id: 'm13r-q28',
              number: 28,
              prompt: 'Social media helps shy teenagers to talk to people online.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'For teenagers who feel shy, it can be easier to talk to people online than to talk to them in person.', evidence: { paragraphId: '2', quote: 'it can be easier to talk to people online than to talk to them in person' } },
            },
            {
              id: 'm13r-q29',
              number: 29,
              prompt: 'Teenagers who spend a lot of time on social media are less likely to feel worried.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'Teenagers who spend a lot of time on social media are more likely to feel worried or sad.', evidence: { paragraphId: '3', quote: 'teenagers who spend a lot of time on social media are more likely to feel worried or sad' } },
            },
            {
              id: 'm13r-q30',
              number: 30,
              prompt: 'Online bullying can only happen during the day.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'Online bullying can happen at any time, even at night.', evidence: { paragraphId: '5', quote: 'online bullying can happen at any time, even at night' } },
            },
            {
              id: 'm13r-q31',
              number: 31,
              prompt: 'The writer believes social media should be banned for teenagers.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: { text: 'The writer says social media is neither good nor bad: it depends on how teenagers use it, and does not say it should be banned.', evidence: { paragraphId: '7', quote: 'social media is neither good nor bad: it depends on how teenagers use it' } },
            },
          ],
        },
        {
          id: 'm13r-g9',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm13r-q32',
              number: 32,
              prompt: 'What does the writer say about teenagers who compare themselves with other people online?',
              options: [
                { id: 'A', text: 'They see photographs of people who seem to have perfect lives, and they begin to feel unhappy with their own lives.' },
                { id: 'B', text: 'They feel happier with their own lives.' },
                { id: 'C', text: 'They stop using social media.' },
                { id: 'D', text: 'They spend less time online.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'They see photographs of people who seem to have perfect lives, and they begin to feel unhappy with their own lives.',
                evidence: { paragraphId: '3', quote: 'they begin to feel unhappy with their own lives' },
              },
            },
            {
              id: 'm13r-q33',
              number: 33,
              prompt: 'What problem does the writer mention about the time teenagers spend on social media?',
              options: [
                { id: 'A', text: 'Teenagers plan to look at their phones for only a few minutes, but they end up spending hours on social media every day.' },
                { id: 'B', text: 'Teenagers spend too little time on social media.' },
                { id: 'C', text: 'Teenagers never look at their phones at night.' },
                { id: 'D', text: 'Teenagers spend more time on homework than on social media.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Many teenagers plan to look at their phones for only a few minutes, but they end up spending hours on social media every day.',
                evidence: { paragraphId: '4', quote: 'they end up spending hours on social media every day' },
              },
            },
            {
              id: 'm13r-q34',
              number: 34,
              prompt: 'What does the writer say schools can do to help?',
              options: [
                { id: 'A', text: 'Schools can teach teenagers how to use social media safely.' },
                { id: 'B', text: 'Schools can ban all phones.' },
                { id: 'C', text: 'Schools can give teenagers more homework.' },
                { id: 'D', text: 'Schools can stop teenagers from talking to their friends.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Schools can help, by teaching teenagers how to use social media safely.',
                evidence: { paragraphId: '6', quote: 'teaching teenagers how to use social media safely' },
              },
            },
            {
              id: 'm13r-q35',
              number: 35,
              prompt: 'What does the writer say in the conclusion?',
              options: [
                { id: 'A', text: 'Social media is neither good nor bad: it depends on how teenagers use it.' },
                { id: 'B', text: 'Social media is always bad for teenagers.' },
                { id: 'C', text: 'Social media is always good for teenagers.' },
                { id: 'D', text: 'Teenagers should never use social media.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Social media is neither good nor bad: it depends on how teenagers use it.',
                evidence: { paragraphId: '7', quote: 'social media is neither good nor bad: it depends on how teenagers use it' },
              },
            },
          ],
        },
        {
          id: 'm13r-g10',
          type: 'matching-sentence-endings',
          instructions: 'Complete each sentence with the correct ending, A–H.',
          optionsTitle: 'List of Endings',
          options: [
            { id: 'A', text: 'they can feel tired at school because they stayed up late using their phones.' },
            { id: 'B', text: 'it can be difficult to escape from it, because the phone is always with the teenager.' },
            { id: 'C', text: 'they should talk to their children about what they see online.' },
            { id: 'D', text: 'it can damage their health and their happiness.' },
            { id: 'E', text: 'they begin to feel unhappy with their own lives.' },
            { id: 'F', text: 'it can be easier to talk to people online than to talk to them in person.' },
            { id: 'G', text: 'they use these apps to talk to their friends, to share photographs and videos, and to find out what is happening in the world.' },
            { id: 'H', text: 'photographs online do not always show real life.' },
          ],
          questions: [
            { id: 'm13r-q36', number: 36, prompt: 'Teenagers use social media apps because', answer: { accepted: ['G'] }, explanation: { text: 'Teenagers use these apps to talk to their friends, to share photographs and videos, and to find out what is happening in the world.', evidence: { paragraphId: '1', quote: 'They use these apps to talk to their friends, to share photographs and videos, and to find out what is happening in the world' } } },
            { id: 'm13r-q37', number: 37, prompt: 'For teenagers who feel shy,', answer: { accepted: ['F'] }, explanation: { text: 'For teenagers who feel shy, it can be easier to talk to people online than to talk to them in person.', evidence: { paragraphId: '2', quote: 'it can be easier to talk to people online than to talk to them in person' } } },
            { id: 'm13r-q38', number: 38, prompt: 'When teenagers compare themselves with other people online,', answer: { accepted: ['E'] }, explanation: { text: 'When teenagers compare themselves with other people online, they begin to feel unhappy with their own lives.', evidence: { paragraphId: '3', quote: 'they begin to feel unhappy with their own lives' } } },
            { id: 'm13r-q39', number: 39, prompt: 'If teenagers stay up late using their phones,', answer: { accepted: ['A'] }, explanation: { text: 'If teenagers stay up late using their phones, they can feel tired at school.', evidence: { paragraphId: '4', quote: 'they feel tired at school because they stayed up late using their phones' } } },
            { id: 'm13r-q40', number: 40, prompt: 'If teenagers spend hours on social media every day,', answer: { accepted: ['D'] }, explanation: { text: 'If teenagers spend hours on social media every day, it can damage their health and their happiness.', evidence: { paragraphId: '7', quote: 'it can damage their health and their happiness' } } },
          ],
        },
      ],
    },
  ],
};
