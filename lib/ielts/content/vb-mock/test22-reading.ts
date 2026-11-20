import type { ObjectiveSection } from '../../model';

/**
 * Mino Academic Mock Test 22 — Reading. Three original passages written
 * for Mino at IELTS Academic level (40 questions, 60 minutes).
 * Not Cambridge material. All passages, questions and answers are
 * original and were written fresh for this mock test.
 */
export const mock22Reading: ObjectiveSection = {
  skill: 'reading',
  timeLimitMinutes: 60,
  parts: [
    // ------------------------------------------------------------- Passage 1
    {
      id: 'r1',
      number: 1,
      passage: {
        title: 'The History of the Compass',
        paragraphs: [
          {
            id: '1',
            text: 'The compass is one of the most important tools in the history of travel. For thousands of years, sailors and travellers used the sun and the stars to find their way. On a cloudy night, however, the stars could not be seen, and travellers often became lost. The compass changed all that, because it could show the way even when the sky was covered with clouds.',
          },
          {
            id: '2',
            text: 'The first compasses were made in China more than two thousand years ago. They were made from a stone called lodestone, which is a natural magnet. A piece of lodestone was placed on a flat plate, and it always pointed to the south. The Chinese used these early compasses to choose the best place to build a house, and later to find their way across the land.',
          },
          {
            id: '3',
            text: 'By the twelfth century, sailors in China were using compasses at sea. The needle of the compass floated in water, and it pointed to the north. Chinese ships could now sail far from land, and they traded with countries as far away as India and East Africa.',
          },
          {
            id: '4',
            text: 'The compass reached Europe in the thirteenth century, probably on ships from the east. European sailors soon learned to use it, and by the fifteenth century, ships from Portugal and Spain were sailing across the Atlantic Ocean. Without the compass, the long sea journeys of this time would have been much more dangerous, and perhaps impossible.',
          },
          {
            id: '5',
            text: 'In the nineteenth century, the compass was improved again. Iron ships caused a problem, because the iron in the ship changed the direction of the needle. Scientists found ways to correct this error, and they also made compasses that could be read more easily at night.',
          },
          {
            id: '6',
            text: 'Today, the compass is still used, although many ships and aeroplanes use satellites to find their way. A compass needs no power and no signal, and it works even when other systems fail. For walkers, sailors and pilots, the compass remains a simple tool that can save a life.',
          },
        ],
      },
      groups: [
        {
          id: 'm22r-g1',
          type: 'sentence-completion',
          instructions: 'Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          questions: [
            {
              id: 'm22r-q1',
              number: 1,
              prompt: 'The first compasses were made from a stone called ___.',
              answer: { accepted: ['lodestone'] },
              explanation: { text: 'The first compasses were made from a stone called lodestone.', evidence: { paragraphId: '2', quote: 'a stone called lodestone' } },
            },
            {
              id: 'm22r-q2',
              number: 2,
              prompt: 'A piece of lodestone was placed on a flat plate, and it always pointed to the ___.',
              answer: { accepted: ['south'] },
              explanation: { text: 'A piece of lodestone always pointed to the south.', evidence: { paragraphId: '2', quote: 'it always pointed to the south' } },
            },
            {
              id: 'm22r-q3',
              number: 3,
              prompt: 'By the twelfth century, sailors in China were using compasses at ___.',
              answer: { accepted: ['sea'] },
              explanation: { text: 'Sailors in China were using compasses at sea.', evidence: { paragraphId: '3', quote: 'using compasses at sea' } },
            },
            {
              id: 'm22r-q4',
              number: 4,
              prompt: 'The compass reached Europe in the ___ century.',
              answer: { accepted: ['thirteenth'] },
              explanation: { text: 'The compass reached Europe in the thirteenth century.', evidence: { paragraphId: '4', quote: 'in the thirteenth century' } },
            },
            {
              id: 'm22r-q5',
              number: 5,
              prompt: 'A compass needs no ___ and no signal.',
              answer: { accepted: ['power'] },
              explanation: { text: 'A compass needs no power and no signal.', evidence: { paragraphId: '6', quote: 'needs no power and no signal' } },
            },
          ],
        },
        {
          id: 'm22r-g2',
          type: 'true-false-not-given',
          instructions:
            'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
          questions: [
            {
              id: 'm22r-q6',
              number: 6,
              prompt: 'For thousands of years, travellers used the sun and the stars to find their way.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'For thousands of years, sailors and travellers used the sun and the stars to find their way.', evidence: { paragraphId: '1', quote: 'used the sun and the stars to find their way' } },
            },
            {
              id: 'm22r-q7',
              number: 7,
              prompt: 'The first compasses were made in Europe.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'The first compasses were made in China.', evidence: { paragraphId: '2', quote: 'The first compasses were made in China' } },
            },
            {
              id: 'm22r-q8',
              number: 8,
              prompt: 'Chinese ships traded with countries as far away as India and East Africa.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'Chinese ships traded with countries as far away as India and East Africa.', evidence: { paragraphId: '3', quote: 'as far away as India and East Africa' } },
            },
            {
              id: 'm22r-q9',
              number: 9,
              prompt: 'Iron ships made compasses more accurate.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'Iron ships caused a problem, because the iron changed the direction of the needle.', evidence: { paragraphId: '5', quote: 'the iron in the ship changed the direction of the needle' } },
            },
            {
              id: 'm22r-q10',
              number: 10,
              prompt: 'All ships today use satellites to find their way.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: { text: 'The passage says many ships and aeroplanes use satellites, not all of them.', evidence: { paragraphId: '6', quote: 'many ships and aeroplanes use satellites' } },
            },
          ],
        },
        {
          id: 'm22r-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm22r-q11',
              number: 11,
              prompt: 'What did the Chinese first use early compasses for?',
              options: [
                { id: 'A', text: 'to choose the best place to build a house' },
                { id: 'B', text: 'to sail across the Atlantic Ocean' },
                { id: 'C', text: 'to trade with Europe' },
                { id: 'D', text: 'to find the stars' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The Chinese used early compasses to choose the best place to build a house.',
                evidence: { paragraphId: '2', quote: 'to choose the best place to build a house' },
              },
            },
            {
              id: 'm22r-q12',
              number: 12,
              prompt: 'What problem did iron ships cause for compasses?',
              options: [
                { id: 'A', text: 'The iron changed the direction of the needle.' },
                { id: 'B', text: 'The compass became too heavy.' },
                { id: 'C', text: 'The compass stopped working at night.' },
                { id: 'D', text: 'The compass could not be read.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The iron in the ship changed the direction of the needle.',
                evidence: { paragraphId: '5', quote: 'the iron in the ship changed the direction of the needle' },
              },
            },
            {
              id: 'm22r-q13',
              number: 13,
              prompt: 'Why is the compass still useful today?',
              options: [
                { id: 'A', text: 'It is cheaper than satellites.' },
                { id: 'B', text: 'It needs no power and no signal.' },
                { id: 'C', text: 'It can show the stars.' },
                { id: 'D', text: 'It works only on land.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'A compass needs no power and no signal.',
                evidence: { paragraphId: '6', quote: 'needs no power and no signal' },
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
        title: 'The Science of Laughter',
        paragraphs: [
          {
            id: 'A',
            labelled: true,
            text: 'Laughter is something that almost everyone does, and almost everyone enjoys. A baby laughs for the first time when it is about four months old, and adults laugh many times every day. Yet laughter is not as simple as it seems, and scientists have spent many years trying to understand why we laugh and what laughter does to the body.',
          },
          {
            id: 'B',
            labelled: true,
            text: 'Laughter is a social act. People laugh far more often when they are with other people than when they are alone. In one study, researchers found that people were thirty times more likely to laugh when they were talking with friends than when they were alone. Most laughter is not caused by jokes: it is caused by ordinary talk between friends.',
          },
          {
            id: 'C',
            labelled: true,
            text: 'Laughter also has effects on the body. When we laugh, we take in more air, and the heart beats faster. After laughing, the muscles relax, and people feel calmer. Some doctors believe that laughter can help people who are ill, because it reduces stress and helps the body to fight disease.',
          },
          {
            id: 'D',
            labelled: true,
            text: 'Another idea is that laughter helps groups of people to stay together. Long ago, early humans lived in small groups, and they needed to trust each other. Laughter may have been a way to show that a person was friendly and safe. Today, people who laugh together often feel closer to each other.',
          },
          {
            id: 'E',
            labelled: true,
            text: 'Laughter may also help us to learn. Children laugh when they play, and play is how children learn about the world. Some teachers use jokes and funny stories in class, because they find that children remember more when they are laughing.',
          },
          {
            id: 'F',
            labelled: true,
            text: 'Not all scientists agree. Some think that laughter is simply the result of the brain working when it hears something surprising. They point out that it is hard to test ideas about laughter, because laughter is different in every culture, and people often laugh when they do not know why.',
          },
          {
            id: 'G',
            labelled: true,
            text: 'In conclusion, laughter remains a mystery in some ways. It may help the body, help groups to stay together, or help us to learn. Or it may have no special purpose at all. What is certain is that laughter is a normal part of human life, and that most people laugh every day, whether they know why or not.',
          },
        ],
      },
      groups: [
        {
          id: 'm22r-g4',
          type: 'matching-headings',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings below.',
          optionsTitle: 'List of Headings',
          options: [
            { id: 'i', text: 'Laughter and other people' },
            { id: 'ii', text: 'Laughter and the body' },
            { id: 'iii', text: 'Laughter helps groups stay together' },
            { id: 'iv', text: 'Laughter and learning' },
            { id: 'v', text: 'Laughter may have no purpose' },
            { id: 'vi', text: 'Why babies laugh' },
            { id: 'vii', text: 'How to make people laugh' },
            { id: 'viii', text: 'Laughter in history' },
          ],
          questions: [
            {
              id: 'm22r-q14',
              number: 14,
              prompt: 'Paragraph B',
              answer: { accepted: ['i'] },
              explanation: { text: 'The paragraph is about laughter as a social act, with other people.', evidence: { paragraphId: 'B', quote: 'Laughter is a social act' } },
            },
            {
              id: 'm22r-q15',
              number: 15,
              prompt: 'Paragraph C',
              answer: { accepted: ['ii'] },
              explanation: { text: 'The paragraph is about the effects of laughter on the body.', evidence: { paragraphId: 'C', quote: 'Laughter also has effects on the body' } },
            },
            {
              id: 'm22r-q16',
              number: 16,
              prompt: 'Paragraph D',
              answer: { accepted: ['iii'] },
              explanation: { text: 'The paragraph is about laughter helping groups of people to stay together.', evidence: { paragraphId: 'D', quote: 'laughter helps groups of people to stay together' } },
            },
            {
              id: 'm22r-q17',
              number: 17,
              prompt: 'Paragraph E',
              answer: { accepted: ['iv'] },
              explanation: { text: 'The paragraph is about laughter helping us to learn.', evidence: { paragraphId: 'E', quote: 'Laughter may also help us to learn' } },
            },
            {
              id: 'm22r-q18',
              number: 18,
              prompt: 'Paragraph F',
              answer: { accepted: ['v'] },
              explanation: { text: 'The paragraph is about the idea that laughter may have no special purpose.', evidence: { paragraphId: 'F', quote: 'laughter is simply the result of the brain working' } },
            },
          ],
        },
        {
          id: 'm22r-g5',
          type: 'table-completion',
          instructions: 'Complete the table below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          table: {
            headers: ['Idea about laughter', 'Detail'],
            rows: [
              ['Social', 'People were thirty times more likely to laugh when talking with {{19}}'],
              ['Body', 'After laughing, the {{20}} relax'],
              ['Groups', 'Laughter may have been a way to show that a person was friendly and {{21}}'],
              ['Learning', 'Some teachers use jokes and funny {{22}} in class'],
            ],
          },
          questions: [
            { id: 'm22r-q19', number: 19, answer: { accepted: ['friends'] }, explanation: { text: 'People were thirty times more likely to laugh when talking with friends.', evidence: { paragraphId: 'B', quote: 'talking with friends' } } },
            { id: 'm22r-q20', number: 20, answer: { accepted: ['muscles'] }, explanation: { text: 'After laughing, the muscles relax.', evidence: { paragraphId: 'C', quote: 'the muscles relax' } } },
            { id: 'm22r-q21', number: 21, answer: { accepted: ['safe'] }, explanation: { text: 'Laughter may have been a way to show that a person was friendly and safe.', evidence: { paragraphId: 'D', quote: 'friendly and safe' } } },
            { id: 'm22r-q22', number: 22, answer: { accepted: ['stories'] }, explanation: { text: 'Some teachers use jokes and funny stories in class.', evidence: { paragraphId: 'E', quote: 'funny stories in class' } } },
          ],
        },
        {
          id: 'm22r-g6',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO things does the writer say about laughter in general?',
          choose: 2,
          options: [
            { id: 'A', text: 'A baby laughs for the first time when it is about four months old.' },
            { id: 'B', text: 'Laughter is a normal part of human life.' },
            { id: 'C', text: 'Adults never laugh.' },
            { id: 'D', text: 'Scientists know for certain why we laugh.' },
            { id: 'E', text: 'Laughter happens only when people are alone.' },
          ],
          questions: [
            { id: 'm22r-q23', number: 23, answer: { accepted: ['A'] }, explanation: { text: 'A baby laughs for the first time when it is about four months old.', evidence: { paragraphId: 'A', quote: 'A baby laughs for the first time when it is about four months old' } } },
            { id: 'm22r-q24', number: 24, answer: { accepted: ['B'] }, explanation: { text: 'Laughter is a normal part of human life.', evidence: { paragraphId: 'G', quote: 'laughter is a normal part of human life' } } },
          ],
        },
        {
          id: 'm22r-g7',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO things does the writer say about the effects of laughter on the body?',
          choose: 2,
          options: [
            { id: 'A', text: 'When we laugh, we take in more air.' },
            { id: 'B', text: 'After laughing, the muscles relax.' },
            { id: 'C', text: 'Laughter makes the heart beat more slowly.' },
            { id: 'D', text: 'Laughter makes people feel more stressed.' },
            { id: 'E', text: 'Laughter stops people from breathing.' },
          ],
          questions: [
            { id: 'm22r-q25', number: 25, answer: { accepted: ['A'] }, explanation: { text: 'When we laugh, we take in more air.', evidence: { paragraphId: 'C', quote: 'we take in more air' } } },
            { id: 'm22r-q26', number: 26, answer: { accepted: ['B'] }, explanation: { text: 'After laughing, the muscles relax.', evidence: { paragraphId: 'C', quote: 'the muscles relax' } } },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 3
    {
      id: 'r3',
      number: 3,
      passage: {
        title: 'How Cities Deal with Flooding',
        paragraphs: [
          {
            id: '1',
            text: "Many of the world's great cities were built beside rivers or on the coast, because water was needed for drinking, for farming and for trade. Today, those same cities face a growing danger: flooding. As the climate changes, heavy rain falls more often, and the sea level rises slowly every year. In the last twenty years, floods have damaged homes, shops and roads in cities from London to Bangkok.",
          },
          {
            id: '2',
            text: 'The oldest way to stop a flood is to build a wall. For hundreds of years, cities have built walls, or levees, along their rivers. A levee is a long bank of earth or stone that holds the water back. Levees work well against small floods, but a very large flood can break through a levee, and the water that follows can be more dangerous than the flood itself.',
          },
          {
            id: '3',
            text: "A newer idea is to give the river more room. In the Netherlands, engineers have moved levees further from the river, so that the river has a wide area where it can flood safely. Fields and parks in this area are allowed to flood in winter, and they dry out again in summer. This idea, called 'room for the river', has been copied in other countries.",
          },
          {
            id: '4',
            text: 'Cities are also learning to live with water in a different way. In Copenhagen, the capital of Denmark, new parks have been built that can hold water when it rains heavily. On a dry day, the park is a place where children play football. After heavy rain, the same park becomes a shallow lake, and the water is held there until it can drain away slowly.',
          },
          {
            id: '5',
            text: 'Another answer is to change the ground itself. In many cities, the ground is covered with roads and pavements, so rain cannot sink into the earth. The water runs off the hard ground and into the drains, which can quickly become full. Some cities now use special pavements that let water pass through, and they plant more trees, whose roots help the ground to take in water.',
          },
          {
            id: '6',
            text: 'In my view, the best answer is not one wall or one park, but many small answers together. A city that uses levees, parks, and special pavements is safer than a city that depends on a single wall. Floods cannot always be stopped, but a city that is ready for water will suffer less damage when the water comes.',
          },
          {
            id: '7',
            text: 'The cost of these ideas is high, and some cities cannot pay for them. Yet the cost of doing nothing is higher: every flood destroys homes and businesses, and every flood costs a city money. In the end, the cities that plan for floods will be the cities that survive them.',
          },
        ],
      },
      groups: [
        {
          id: 'm22r-g8',
          type: 'yes-no-not-given',
          instructions:
            'Do the following statements agree with the claims of the writer in Reading Passage 3? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
          questions: [
            {
              id: 'm22r-q27',
              number: 27,
              prompt: "Many great cities were built beside rivers or on the coast.",
              answer: { accepted: ['YES'] },
              explanation: { text: "Many of the world's great cities were built beside rivers or on the coast.", evidence: { paragraphId: '1', quote: "were built beside rivers or on the coast" } },
            },
            {
              id: 'm22r-q28',
              number: 28,
              prompt: 'A very large flood can break through a levee.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'A very large flood can break through a levee.', evidence: { paragraphId: '2', quote: 'a very large flood can break through a levee' } },
            },
            {
              id: 'm22r-q29',
              number: 29,
              prompt: 'In the Netherlands, engineers have moved levees closer to the river.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'In the Netherlands, engineers have moved levees further from the river.', evidence: { paragraphId: '3', quote: 'moved levees further from the river' } },
            },
            {
              id: 'm22r-q30',
              number: 30,
              prompt: 'In Copenhagen, new parks can hold water when it rains heavily.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'In Copenhagen, new parks have been built that can hold water when it rains heavily.', evidence: { paragraphId: '4', quote: 'can hold water when it rains heavily' } },
            },
            {
              id: 'm22r-q31',
              number: 31,
              prompt: 'The writer believes a single wall is the best answer to flooding.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'The writer believes the best answer is many small answers together, not one wall.', evidence: { paragraphId: '6', quote: 'the best answer is not one wall or one park, but many small answers together' } },
            },
          ],
        },
        {
          id: 'm22r-g9',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm22r-q32',
              number: 32,
              prompt: 'What is a levee?',
              options: [
                { id: 'A', text: 'a long bank of earth or stone that holds the water back' },
                { id: 'B', text: 'a park that can hold water' },
                { id: 'C', text: 'a special pavement' },
                { id: 'D', text: 'a kind of drain' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'A levee is a long bank of earth or stone that holds the water back.',
                evidence: { paragraphId: '2', quote: 'a long bank of earth or stone that holds the water back' },
              },
            },
            {
              id: 'm22r-q33',
              number: 33,
              prompt: "What happens to fields and parks in the 'room for the river' area?",
              options: [
                { id: 'A', text: 'They are allowed to flood in winter.' },
                { id: 'B', text: 'They are covered with roads.' },
                { id: 'C', text: 'They are used for farming all year.' },
                { id: 'D', text: 'They are closed to the public.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Fields and parks in this area are allowed to flood in winter.',
                evidence: { paragraphId: '3', quote: 'are allowed to flood in winter' },
              },
            },
            {
              id: 'm22r-q34',
              number: 34,
              prompt: 'What happens to a park in Copenhagen after heavy rain?',
              options: [
                { id: 'A', text: 'It becomes a shallow lake.' },
                { id: 'B', text: 'It is closed for a month.' },
                { id: 'C', text: 'It is used for football.' },
                { id: 'D', text: 'It drains away in a few minutes.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'After heavy rain, the same park becomes a shallow lake.',
                evidence: { paragraphId: '4', quote: 'the same park becomes a shallow lake' },
              },
            },
            {
              id: 'm22r-q35',
              number: 35,
              prompt: 'What does the writer say about the cost of dealing with floods?',
              options: [
                { id: 'A', text: 'The cost of doing nothing is higher.' },
                { id: 'B', text: 'The ideas cost nothing.' },
                { id: 'C', text: 'Cities should not spend money on floods.' },
                { id: 'D', text: 'Floods cost cities nothing.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The cost of doing nothing is higher.',
                evidence: { paragraphId: '7', quote: 'the cost of doing nothing is higher' },
              },
            },
          ],
        },
        {
          id: 'm22r-g10',
          type: 'matching-sentence-endings',
          instructions: 'Complete each sentence with the correct ending, A–H.',
          optionsTitle: 'List of Endings',
          options: [
            { id: 'A', text: 'further from the river.' },
            { id: 'B', text: 'but after heavy rain, the same park becomes a shallow lake.' },
            { id: 'C', text: 'because the ground is covered with roads and pavements.' },
            { id: 'D', text: 'is safer than a city that depends on a single wall.' },
            { id: 'E', text: 'but a very large flood can break through a levee.' },
            { id: 'F', text: 'have been copied in other countries.' },
            { id: 'G', text: 'costs a city money.' },
            { id: 'H', text: 'rises slowly every year.' },
          ],
          questions: [
            { id: 'm22r-q36', number: 36, prompt: 'Levees work well against small floods,', answer: { accepted: ['E'] }, explanation: { text: 'Levees work well against small floods, but a very large flood can break through a levee.', evidence: { paragraphId: '2', quote: 'a very large flood can break through a levee' } } },
            { id: 'm22r-q37', number: 37, prompt: 'In the Netherlands, engineers have moved levees', answer: { accepted: ['A'] }, explanation: { text: 'In the Netherlands, engineers have moved levees further from the river.', evidence: { paragraphId: '3', quote: 'moved levees further from the river' } } },
            { id: 'm22r-q38', number: 38, prompt: 'On a dry day, a park in Copenhagen is a place where children play football,', answer: { accepted: ['B'] }, explanation: { text: 'On a dry day, the park is a place where children play football. After heavy rain, the same park becomes a shallow lake.', evidence: { paragraphId: '4', quote: 'the same park becomes a shallow lake' } } },
            { id: 'm22r-q39', number: 39, prompt: 'In many cities, rain cannot sink into the earth,', answer: { accepted: ['C'] }, explanation: { text: 'In many cities, rain cannot sink into the earth because the ground is covered with roads and pavements.', evidence: { paragraphId: '5', quote: 'the ground is covered with roads and pavements' } } },
            { id: 'm22r-q40', number: 40, prompt: 'A city that uses levees, parks, and special pavements', answer: { accepted: ['D'] }, explanation: { text: 'A city that uses levees, parks, and special pavements is safer than a city that depends on a single wall.', evidence: { paragraphId: '6', quote: 'is safer than a city that depends on a single wall' } } },
          ],
        },
      ],
    },
  ],
};
