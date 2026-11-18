import type { ObjectiveSection } from '../../model';

/**
 * Mino Academic Mock Test 9 — Reading. Three original passages written
 * for Mino at IELTS Academic level (40 questions, 60 minutes).
 * Not Cambridge material. All passages, questions and answers are
 * original and were written fresh for this mock test.
 */
export const mock9Reading: ObjectiveSection = {
  skill: 'reading',
  timeLimitMinutes: 60,
  parts: [
    // ------------------------------------------------------------- Passage 1
    {
      id: 'r1',
      number: 1,
      passage: {
        title: 'The Silk Road',
        paragraphs: [
          {
            id: '1',
            text: 'For more than a thousand years, traders carried goods between China and Europe along a network of routes that we now call the Silk Road. The name comes from silk, the most famous product carried along the routes. Silk was made in China, and it was worth a great deal of money in the west, because it was light, soft and beautiful, and because no one outside China knew how to make it. The secret of making silk was kept in China for hundreds of years, and silk cloth was sold for high prices in Rome, in Persia and in many other places.',
          },
          {
            id: '2',
            text: 'The Silk Road was not a single road, but a network of many different routes, on land and by sea, that joined China to the Middle East and to Europe. The land routes crossed hot deserts and high mountains, and the journey from one end to the other could take many months. Few traders travelled the whole way. Instead, goods were passed from one trader to another at towns and markets along the way, and each trader carried them a little further. In this way, silk from China reached Europe, and wool, glass and gold from the west reached China.',
          },
          {
            id: '3',
            text: 'The towns along the Silk Road grew rich from this trade. One of the most famous was Samarkand, in what is now Uzbekistan, where traders from the east met traders from the west to buy and sell their goods. Samarkand became a centre of learning as well as of trade, with fine buildings, schools and libraries. Other towns, such as Kashgar and Dunhuang, grew up where the routes crossed the desert, and they gave water, food and rest to travellers who had crossed the sand.',
          },
          {
            id: '4',
            text: 'The Silk Road carried more than goods: it also carried ideas. Buddhism travelled from India to China along the Silk Road, and it changed the religion and the art of China for ever. Knowledge of paper-making also travelled west along the routes, and later the knowledge of printing and of gunpowder. Travellers on the Silk Road brought back stories of distant lands, and these stories were written down and read by people who would never leave their own homes.',
          },
          {
            id: '5',
            text: 'By the fifteenth century, the Silk Road had become much less important. Traders began to use sea routes instead, because ships could carry far more goods than camels, and the journey by sea was faster and safer. The towns that had grown rich from the land trade became poor, and some of them were left empty in the desert. The desert sand covered their streets and their buildings, and for hundreds of years few people remembered them.',
          },
          {
            id: '6',
            text: 'Today, people are interested in the Silk Road again. Historians study the old routes to learn how people in different parts of the world first met and traded with each other. Tourists visit the old towns along the routes, and walk in the markets where traders once sold silk and spices. The Silk Road reminds us that the world has been connected by trade for a very long time, and that goods, ideas and stories have always travelled further than the people who carried them.',
          },
        ],
      },
      groups: [
        {
          id: 'm9r-g1',
          type: 'sentence-completion',
          instructions: 'Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          questions: [
            {
              id: 'm9r-q1',
              number: 1,
              prompt: 'The Silk Road was named after the most famous ___ carried along the routes.',
              answer: { accepted: ['silk'] },
              explanation: { text: 'The name comes from silk, the most famous product carried along the routes.', evidence: { paragraphId: '1', quote: 'the most famous product carried along the routes' } },
            },
            {
              id: 'm9r-q2',
              number: 2,
              prompt: 'Chinese traders carried silk to the ___, and brought back wool, glass and gold.',
              answer: { accepted: ['west'] },
              explanation: { text: 'Silk from China reached Europe, and wool, glass and gold from the west reached China.', evidence: { paragraphId: '2', quote: 'wool, glass and gold from the west reached China' } },
            },
            {
              id: 'm9r-q3',
              number: 3,
              prompt: 'The land routes crossed hot deserts and high ___.',
              answer: { accepted: ['mountains'] },
              explanation: { text: 'The land routes crossed hot deserts and high mountains.', evidence: { paragraphId: '2', quote: 'crossed hot deserts and high mountains' } },
            },
            {
              id: 'm9r-q4',
              number: 4,
              prompt: 'Buddhism travelled along the Silk Road from ___ to China.',
              answer: { accepted: ['India'] },
              explanation: { text: 'Buddhism travelled from India to China along the Silk Road.', evidence: { paragraphId: '4', quote: 'Buddhism travelled from India to China along the Silk Road' } },
            },
            {
              id: 'm9r-q5',
              number: 5,
              prompt: 'The Silk Road became less important when traders began to use ___ routes.',
              answer: { accepted: ['sea'] },
              explanation: { text: 'Traders began to use sea routes instead, because ships could carry far more goods than camels.', evidence: { paragraphId: '5', quote: 'Traders began to use sea routes instead' } },
            },
          ],
        },
        {
          id: 'm9r-g2',
          type: 'true-false-not-given',
          instructions:
            'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
          questions: [
            {
              id: 'm9r-q6',
              number: 6,
              prompt: 'The Silk Road was a single road from China to Europe.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'The Silk Road was not a single road, but a network of many different routes.', evidence: { paragraphId: '2', quote: 'not a single road, but a network of many different routes' } },
            },
            {
              id: 'm9r-q7',
              number: 7,
              prompt: 'Silk was the only product carried along the Silk Road.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'Many goods were carried, including wool, glass and gold from the west.', evidence: { paragraphId: '2', quote: 'wool, glass and gold from the west reached China' } },
            },
            {
              id: 'm9r-q8',
              number: 8,
              prompt: 'Knowledge of paper-making travelled west along the Silk Road.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'Knowledge of paper-making travelled west along the routes.', evidence: { paragraphId: '4', quote: 'Knowledge of paper-making also travelled west along the routes' } },
            },
            {
              id: 'm9r-q9',
              number: 9,
              prompt: 'The Silk Road was still the main trade route in the sixteenth century.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'By the fifteenth century, the Silk Road had become much less important.', evidence: { paragraphId: '5', quote: 'By the fifteenth century, the Silk Road had become much less important' } },
            },
            {
              id: 'm9r-q10',
              number: 10,
              prompt: 'Modern tourists can visit towns that were once stops on the Silk Road.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'Tourists visit the old towns along the routes today.', evidence: { paragraphId: '6', quote: 'Tourists visit the old towns along the routes' } },
            },
          ],
        },
        {
          id: 'm9r-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm9r-q11',
              number: 11,
              prompt: 'Why was silk so valuable in the west?',
              options: [
                { id: 'A', text: 'It was light, soft and beautiful, and no one outside China knew how to make it.' },
                { id: 'B', text: 'It was the only cloth that could be carried by camel.' },
                { id: 'C', text: 'It was made from gold thread.' },
                { id: 'D', text: 'It was given as a gift by the king of China.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Silk was worth a great deal because it was light, soft and beautiful, and no one outside China knew how to make it.',
                evidence: { paragraphId: '1', quote: 'it was light, soft and beautiful, and because no one outside China knew how to make it' },
              },
            },
            {
              id: 'm9r-q12',
              number: 12,
              prompt: 'What does the writer say about traders on the Silk Road?',
              options: [
                { id: 'A', text: 'Most traders travelled the whole way from China to Europe.' },
                { id: 'B', text: 'Goods were passed from one trader to another along the way.' },
                { id: 'C', text: 'Traders travelled only by sea.' },
                { id: 'D', text: 'Traders never stopped in towns along the way.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Few traders travelled the whole way; goods were passed from one trader to another at towns and markets along the way.',
                evidence: { paragraphId: '2', quote: 'goods were passed from one trader to another at towns and markets along the way' },
              },
            },
            {
              id: 'm9r-q13',
              number: 13,
              prompt: 'Why did traders begin to use sea routes in the fifteenth century?',
              options: [
                { id: 'A', text: 'Ships could carry far more goods than camels, and the journey was faster and safer.' },
                { id: 'B', text: 'The land routes had been closed by law.' },
                { id: 'C', text: 'There were no more camels left in Asia.' },
                { id: 'D', text: 'Silk was no longer wanted in Europe.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Ships could carry far more goods than camels, and the journey by sea was faster and safer.',
                evidence: { paragraphId: '5', quote: 'ships could carry far more goods than camels, and the journey by sea was faster and safer' },
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
        title: 'Coral Reefs',
        paragraphs: [
          {
            id: 'A',
            labelled: true,
            text: 'Coral reefs are among the most colourful places in the sea. They are found in warm, shallow water in the tropics, near the coasts of countries such as Australia, Indonesia and Egypt. A reef may look like a rock, but it is really alive: it is built by millions of tiny animals called coral polyps. Coral reefs cover less than one per cent of the ocean, but they are home to about a quarter of all sea species, including fish, turtles and sharks.',
          },
          {
            id: 'B',
            labelled: true,
            text: 'Coral reefs grow very slowly. Each coral polyp is a tiny animal, no larger than a small coin, and it builds a hard skeleton of limestone around itself. When a polyp dies, its skeleton stays, and new polyps build on top of it. In this way, a reef grows, layer upon layer, over thousands of years. The largest reef in the world is the Great Barrier Reef, off the coast of Australia, which is more than two thousand kilometres long and can be seen from space.',
          },
          {
            id: 'C',
            labelled: true,
            text: 'A reef is a busy home for sea life. Small fish hide among the coral, where larger fish cannot follow them, and they find food in the warm water. Turtles come to reefs to feed on sea grass, and sharks visit to hunt. The coral itself gets most of its food from tiny algae that live inside the polyps: the algae make food from sunlight, and they give the coral its bright colours. Without the algae, the coral would be white and would soon die.',
          },
          {
            id: 'D',
            labelled: true,
            text: 'Coral reefs are important to people as well as to sea animals. Many people who live near the coast catch fish on the reefs, and the fish are an important part of their food. Reefs also bring money from tourism, because people travel from all over the world to dive and to see the bright fish and coral. In addition, reefs protect the coast: when big waves come in from a storm, the reef breaks the waves and makes them smaller, so that houses and fields near the sea are safer.',
          },
          {
            id: 'E',
            labelled: true,
            text: 'Coral reefs are now in danger. The greatest danger is warming water: when the sea becomes too warm, the coral loses the tiny algae that give it colour, and the reef turns white. This is called bleaching, and if the water stays warm for too long, the coral dies. Reefs are also harmed by pollution from farms and cities, which flows into the sea, and by fishing with too many boats, which takes more fish than the reef can replace.',
          },
          {
            id: 'F',
            labelled: true,
            text: 'People are now trying to protect coral reefs. In many countries, parts of the sea have been made into marine protected areas, where fishing is limited or not allowed at all. Scientists are also growing new coral in the sea: they take small pieces of healthy coral, grow them in tanks, and then put them back on the reef. In some places, local people help by planting mangrove trees on the coast, which stop dirty water from reaching the reef.',
          },
          {
            id: 'G',
            labelled: true,
            text: 'Coral reefs can recover if they are given time and care. Scientists have found that a reef that has been damaged by bleaching can grow back in ten to fifteen years, if the water becomes cool again and if people stop harming it. The future of the reefs will depend on whether the world can slow the warming of the oceans. If it can, the reefs may survive for many more thousands of years; if it cannot, one of the most beautiful places on Earth may be lost for ever.',
          },
        ],
      },
      groups: [
        {
          id: 'm9r-g4',
          type: 'matching-headings',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings below.',
          optionsTitle: 'List of Headings',
          options: [
            { id: 'i', text: 'The animals that build reefs' },
            { id: 'ii', text: 'How reefs grow' },
            { id: 'iii', text: 'Life on a reef' },
            { id: 'iv', text: 'Why reefs matter to people' },
            { id: 'v', text: 'Dangers to reefs' },
            { id: 'vi', text: 'Protecting reefs' },
            { id: 'vii', text: 'The history of fishing' },
            { id: 'viii', text: 'Reefs in cold water' },
          ],
          questions: [
            {
              id: 'm9r-q14',
              number: 14,
              prompt: 'Paragraph B',
              answer: { accepted: ['ii'] },
              explanation: { text: 'The paragraph describes how reefs grow, layer upon layer, over thousands of years.', evidence: { paragraphId: 'B', quote: 'a reef grows, layer upon layer, over thousands of years' } },
            },
            {
              id: 'm9r-q15',
              number: 15,
              prompt: 'Paragraph C',
              answer: { accepted: ['iii'] },
              explanation: { text: 'The paragraph describes the sea life that lives on a reef.', evidence: { paragraphId: 'C', quote: 'A reef is a busy home for sea life.' } },
            },
            {
              id: 'm9r-q16',
              number: 16,
              prompt: 'Paragraph D',
              answer: { accepted: ['iv'] },
              explanation: { text: 'The paragraph describes why reefs are important to people.', evidence: { paragraphId: 'D', quote: 'Coral reefs are important to people as well as to sea animals.' } },
            },
            {
              id: 'm9r-q17',
              number: 17,
              prompt: 'Paragraph E',
              answer: { accepted: ['v'] },
              explanation: { text: 'The paragraph describes the dangers that coral reefs now face.', evidence: { paragraphId: 'E', quote: 'Coral reefs are now in danger.' } },
            },
            {
              id: 'm9r-q18',
              number: 18,
              prompt: 'Paragraph F',
              answer: { accepted: ['vi'] },
              explanation: { text: 'The paragraph describes how people are trying to protect coral reefs.', evidence: { paragraphId: 'F', quote: 'People are now trying to protect coral reefs.' } },
            },
          ],
        },
        {
          id: 'm9r-g5',
          type: 'table-completion',
          instructions: 'Complete the table below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          table: {
            headers: ['Subject', 'Detail'],
            rows: [
              ['Coral polyps', 'Polyps build skeletons of {{19}}'],
              ['Great Barrier Reef', 'It is the {{20}} reef in the world'],
              ['Coral reefs', 'Reefs are home to about a {{21}} of all sea species'],
              ['Bleaching', 'Warm water makes coral lose the {{22}} that give it colour'],
            ],
          },
          questions: [
            { id: 'm9r-q19', number: 19, answer: { accepted: ['limestone'] }, explanation: { text: 'Each coral polyp builds a hard skeleton of limestone around itself.', evidence: { paragraphId: 'B', quote: 'builds a hard skeleton of limestone around itself' } } },
            { id: 'm9r-q20', number: 20, answer: { accepted: ['largest'] }, explanation: { text: 'The Great Barrier Reef is the largest reef in the world.', evidence: { paragraphId: 'B', quote: 'The largest reef in the world is the Great Barrier Reef' } } },
            { id: 'm9r-q21', number: 21, answer: { accepted: ['quarter'] }, explanation: { text: 'Coral reefs are home to about a quarter of all sea species.', evidence: { paragraphId: 'A', quote: 'home to about a quarter of all sea species' } } },
            { id: 'm9r-q22', number: 22, answer: { accepted: ['algae'] }, explanation: { text: 'When the sea becomes too warm, the coral loses the tiny algae that give it colour.', evidence: { paragraphId: 'E', quote: 'the coral loses the tiny algae that give it colour' } } },
          ],
        },
        {
          id: 'm9r-g6',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO benefits of coral reefs for people are mentioned in paragraph D?',
          choose: 2,
          options: [
            { id: 'A', text: 'Reefs provide fish that people eat.' },
            { id: 'B', text: 'Reefs protect the coast from big waves.' },
            { id: 'C', text: 'Reefs provide drinking water.' },
            { id: 'D', text: 'Reefs make the sea warmer.' },
            { id: 'E', text: 'Reefs stop all storms from happening.' },
          ],
          questions: [
            { id: 'm9r-q23', number: 23, answer: { accepted: ['A'] }, explanation: { text: 'People who live near the coast catch fish on the reefs, and the fish are an important part of their food.', evidence: { paragraphId: 'D', quote: 'the fish are an important part of their food' } } },
            { id: 'm9r-q24', number: 24, answer: { accepted: ['B'] }, explanation: { text: 'Reefs break big waves and make them smaller, so houses and fields near the sea are safer.', evidence: { paragraphId: 'D', quote: 'the reef breaks the waves and makes them smaller' } } },
          ],
        },
        {
          id: 'm9r-g7',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO actions to protect reefs are mentioned in paragraph F?',
          choose: 2,
          options: [
            { id: 'A', text: 'Making parts of the sea into marine protected areas.' },
            { id: 'B', text: 'Growing new coral and putting it back on the reef.' },
            { id: 'C', text: 'Building more hotels on the coast.' },
            { id: 'D', text: 'Catching more fish on the reef.' },
            { id: 'E', text: 'Closing all beaches to visitors.' },
          ],
          questions: [
            { id: 'm9r-q25', number: 25, answer: { accepted: ['A'] }, explanation: { text: 'Parts of the sea have been made into marine protected areas, where fishing is limited or not allowed at all.', evidence: { paragraphId: 'F', quote: 'parts of the sea have been made into marine protected areas' } } },
            { id: 'm9r-q26', number: 26, answer: { accepted: ['B'] }, explanation: { text: 'Scientists grow new coral in tanks and then put it back on the reef.', evidence: { paragraphId: 'F', quote: 'they take small pieces of healthy coral, grow them in tanks, and then put them back on the reef' } } },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 3
    {
      id: 'r3',
      number: 3,
      passage: {
        title: 'Should School Start Later?',
        paragraphs: [
          {
            id: '1',
            text: 'In most countries, the school day starts early, often at eight o\'clock or half past eight. For many teenagers, this means getting up before seven o\'clock, and often before they have had enough sleep. Scientists who study sleep say that this is a problem, because the body clocks of teenagers change as they grow up: they find it hard to fall asleep early at night, and they find it hard to wake up early in the morning. A teenager who goes to bed at eleven o\'clock and has to get up at six has had only seven hours of sleep, and that is not enough.',
          },
          {
            id: '2',
            text: 'Research into sleep shows that teenagers need eight to ten hours of sleep every night. Sleep is not a waste of time: while we sleep, our brains store what we have learned during the day, and our bodies grow and repair themselves. Teenagers who do not get enough sleep find it hard to pay attention in class, they forget things more easily, and they are more likely to feel unhappy or angry. Some studies have also found that tired teenagers are more likely to have accidents, for example when they are walking to school or riding a bicycle.',
          },
          {
            id: '3',
            text: 'Supporters of a later start say that if school began at nine o\'clock or later, students would arrive more awake and ready to learn. They point to schools that have already made the change. In Seattle, in the United States, schools moved their start time from half past seven to half past eight, and the results were clear: students got more sleep, their grades improved, and fewer students were late or absent. Teachers also said that students could pay more attention in class in the morning.',
          },
          {
            id: '4',
            text: 'Not everyone agrees that a later start is a good idea. One problem is transport: school buses would need to run later, and this would cost more money. Another problem is parents: many parents start work at eight or nine o\'clock, and they would need someone to look after their children in the morning if school started later. After-school activities would also need to move: sports teams and music lessons that now finish at four o\'clock would finish later, and in winter they would finish in the dark.',
          },
          {
            id: '5',
            text: 'Some people also say that a later start would not solve the real problem. Teenagers stay up late, they say, not only because of their body clocks, but also because they spend too much time on their phones and computers at night. If school started later, these teenagers would simply stay up even later, and they would still be tired in the morning. A later start, in this view, is not enough on its own: teenagers also need less homework in the evening, and parents need to set limits on screens at night.',
          },
          {
            id: '6',
            text: 'There are examples of schools that have tried a later start and then changed their minds. In some places, the new start time caused so many problems with buses and after-school activities that the schools went back to the old time after one year. In other places, the later start worked well, and parents, teachers and students were happy with it. The difference, it seems, is whether the whole community agrees on the change, and whether the problems with transport and activities are planned for in advance.',
          },
          {
            id: '7',
            text: 'In my view, schools should start later, at nine o\'clock or later, because the evidence about sleep and learning is too strong to ignore. Teenagers are not lazy when they cannot wake up early: their bodies are telling them that they need more sleep. But a later start will only work if it is planned well. Schools need to talk to parents, to bus companies and to sports clubs before they change the time, and they need to help teenagers to use their evenings better. If that happens, a later start could make school better for everyone.',
          },
        ],
      },
      groups: [
        {
          id: 'm9r-g8',
          type: 'yes-no-not-given',
          instructions:
            'Do the following statements agree with the claims of the writer in Reading Passage 3? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
          questions: [
            {
              id: 'm9r-q27',
              number: 27,
              prompt: 'Teenagers find it hard to fall asleep early at night.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Teenagers find it hard to fall asleep early at night because their body clocks change as they grow up.', evidence: { paragraphId: '1', quote: 'they find it hard to fall asleep early at night' } },
            },
            {
              id: 'm9r-q28',
              number: 28,
              prompt: 'Most teenagers get the sleep they need.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'Many teenagers get up before they have had enough sleep.', evidence: { paragraphId: '1', quote: 'before they have had enough sleep' } },
            },
            {
              id: 'm9r-q29',
              number: 29,
              prompt: 'A later school start has improved grades in every school that has tried it.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: { text: 'The writer gives one example, in Seattle, and also says some schools changed their minds; nothing is said about every school.', evidence: { paragraphId: '3', quote: 'In Seattle, in the United States, schools moved their start time' } },
            },
            {
              id: 'm9r-q30',
              number: 30,
              prompt: 'A later start would make after-school sports impossible.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'After-school activities would need to move to a later time, not stop altogether.', evidence: { paragraphId: '4', quote: 'After-school activities would also need to move' } },
            },
            {
              id: 'm9r-q31',
              number: 31,
              prompt: 'The writer believes schools should start at nine o\'clock or later.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'The writer says schools should start later, at nine o\'clock or later.', evidence: { paragraphId: '7', quote: 'schools should start later, at nine o\'clock or later' } },
            },
          ],
        },
        {
          id: 'm9r-g9',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm9r-q32',
              number: 32,
              prompt: 'How much sleep do teenagers need every night, according to paragraph 2?',
              options: [
                { id: 'A', text: 'six to seven hours' },
                { id: 'B', text: 'seven to eight hours' },
                { id: 'C', text: 'eight to ten hours' },
                { id: 'D', text: 'ten to twelve hours' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'Teenagers need eight to ten hours of sleep every night.',
                evidence: { paragraphId: '2', quote: 'teenagers need eight to ten hours of sleep every night' },
              },
            },
            {
              id: 'm9r-q33',
              number: 33,
              prompt: 'What happened in Seattle when schools started later?',
              options: [
                { id: 'A', text: 'Students got more sleep, their grades improved, and fewer students were late or absent.' },
                { id: 'B', text: 'Students got less sleep and their grades fell.' },
                { id: 'C', text: 'The schools went back to the old time after one year.' },
                { id: 'D', text: 'Parents stopped sending their children to school.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'In Seattle, students got more sleep, their grades improved, and fewer students were late or absent.',
                evidence: { paragraphId: '3', quote: 'students got more sleep, their grades improved, and fewer students were late or absent' },
              },
            },
            {
              id: 'm9r-q34',
              number: 34,
              prompt: 'What problem with transport is mentioned in paragraph 4?',
              options: [
                { id: 'A', text: 'School buses would need to run later, and this would cost more money.' },
                { id: 'B', text: 'There are not enough school buses in the country.' },
                { id: 'C', text: 'School buses are too slow in the morning.' },
                { id: 'D', text: 'School buses cannot run in the dark.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'School buses would need to run later, and this would cost more money.',
                evidence: { paragraphId: '4', quote: 'school buses would need to run later, and this would cost more money' },
              },
            },
            {
              id: 'm9r-q35',
              number: 35,
              prompt: 'What does the writer say is also needed, besides a later start?',
              options: [
                { id: 'A', text: 'Less homework in the evening and limits on screens at night.' },
                { id: 'B', text: 'Longer school holidays.' },
                { id: 'C', text: 'More sports lessons in the morning.' },
                { id: 'D', text: 'Bigger classrooms.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Teenagers also need less homework in the evening, and parents need to set limits on screens at night.',
                evidence: { paragraphId: '5', quote: 'teenagers also need less homework in the evening, and parents need to set limits on screens at night' },
              },
            },
          ],
        },
        {
          id: 'm9r-g10',
          type: 'matching-sentence-endings',
          instructions: 'Complete each sentence with the correct ending, A–H.',
          optionsTitle: 'List of Endings',
          options: [
            { id: 'A', text: 'students can pay more attention in class in the morning.' },
            { id: 'B', text: 'teenagers need eight to ten hours of sleep every night.' },
            { id: 'C', text: 'after-school activities would need to move to a later time.' },
            { id: 'D', text: 'students got more sleep and their grades improved.' },
            { id: 'E', text: 'they find it hard to fall asleep early at night.' },
            { id: 'F', text: 'many parents start work at eight or nine o\'clock.' },
            { id: 'G', text: 'schools should start at nine o\'clock or later.' },
            { id: 'H', text: 'homework should be banned completely.' },
          ],
          questions: [
            { id: 'm9r-q36', number: 36, prompt: 'The body clocks of teenagers show that', answer: { accepted: ['E'] }, explanation: { text: 'Teenagers find it hard to fall asleep early at night because their body clocks change.', evidence: { paragraphId: '1', quote: 'they find it hard to fall asleep early at night' } } },
            { id: 'm9r-q37', number: 37, prompt: 'Research into sleep shows that', answer: { accepted: ['B'] }, explanation: { text: 'Research shows teenagers need eight to ten hours of sleep every night.', evidence: { paragraphId: '2', quote: 'teenagers need eight to ten hours of sleep every night' } } },
            { id: 'm9r-q38', number: 38, prompt: 'A later start for schools shows that', answer: { accepted: ['A'] }, explanation: { text: 'Teachers said students could pay more attention in class in the morning after the later start.', evidence: { paragraphId: '3', quote: 'students could pay more attention in class in the morning' } } },
            { id: 'm9r-q39', number: 39, prompt: 'Moving the school day later shows that', answer: { accepted: ['C'] }, explanation: { text: 'After-school activities would need to move if school started later.', evidence: { paragraphId: '4', quote: 'After-school activities would also need to move' } } },
            { id: 'm9r-q40', number: 40, prompt: 'The writer believes that', answer: { accepted: ['G'] }, explanation: { text: 'The writer believes schools should start at nine o\'clock or later.', evidence: { paragraphId: '7', quote: 'schools should start later, at nine o\'clock or later' } } },
          ],
        },
      ],
    },
  ],
};
