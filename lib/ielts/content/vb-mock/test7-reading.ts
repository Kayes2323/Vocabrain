import type { ObjectiveSection } from '../../model';

/**
 * Mino Academic Mock Test 7 — Reading. Three original passages written
 * for Mino at IELTS Academic level (40 questions, 60 minutes).
 * Not Cambridge material. All passages, questions and answers are
 * original and were written fresh for this mock test.
 */
export const mock7Reading: ObjectiveSection = {
  skill: 'reading',
  timeLimitMinutes: 60,
  parts: [
    // ------------------------------------------------------------- Passage 1
    {
      id: 'r1',
      number: 1,
      passage: {
        title: 'The Coffee Trade',
        paragraphs: [
          {
            id: '1',
            text: 'Coffee is one of the most popular drinks in the world. Every day, people drink more than two billion cups of it, in cafes, in offices and at home. Yet few of the people who enjoy coffee know where it comes from, or how the beans in their cup reach them. The story of coffee begins in the highlands of Ethiopia, in East Africa, where coffee plants grow wild in the forests. According to an old story, a goat herder noticed that his goats became lively after eating the red fruit of a certain tree. He tried the fruit himself, and found that it gave him energy too. Whether or not the story is true, coffee plants were first grown for their fruit in Ethiopia, and from there the drink slowly spread to other parts of the world.',
          },
          {
            id: '2',
            text: 'From Ethiopia, coffee travelled to Yemen, across the Red Sea, where it was grown on terraced hillsides and sold in the port of Mocha. By the fifteenth century, coffee houses had opened in cities across the Middle East, where people met to drink coffee, talk, and play games. Coffee then reached Europe in the seventeenth century, carried by traders from Venice, and coffee houses soon opened in London, Paris and Vienna. At first, some people were worried about the new drink, and a few rulers tried to ban it, saying that it made people talk too much and think too much. The bans did not work, however, and coffee houses became popular meeting places for writers, traders and politicians.',
          },
          {
            id: '3',
            text: 'There are two main kinds of coffee plant grown for trade today. Arabica coffee, which grows best in high, cool places, has a mild flavour and is the more expensive of the two. Robusta coffee, which grows in lower, hotter places, has a stronger, more bitter taste, and it is often used in instant coffee. Most of the coffee grown in the world is Arabica, but Robusta is cheaper to grow, because the plants are tougher and produce more beans. A coffee plant takes about three years to produce its first fruit, and the fruit, which is called a cherry, is usually picked by hand, because the cherries on one plant do not all become ripe at the same time.',
          },
          {
            id: '4',
            text: 'Today, Brazil is the largest producer of coffee in the world, growing about a third of all the coffee that is traded. Vietnam is the second largest producer, and it grows mostly Robusta coffee. Other important producers include Colombia, Ethiopia and Indonesia. Most coffee is grown on small farms, often by families who own only a few hectares of land. The farmers pick the cherries, dry them in the sun, and sell the dried beans to traders, who send them to factories in other countries, where the beans are roasted and packed. Roasting is a skilled job, because a small change in heat or time can change the taste of the coffee completely.',
          },
          {
            id: '5',
            text: 'Although coffee is worth billions of dollars every year, the farmers who grow it often earn very little money. The price that farmers receive for their beans can change sharply from one year to the next, depending on the weather and on how much coffee is grown in other countries. In a bad year, a farmer may receive less money for a sack of beans than it cost to grow them. Some farmers have joined fair trade groups, which promise them a fixed minimum price for their coffee, and a little extra money to spend on schools, clean water, or roads in their villages. Buyers who choose coffee with a fair trade label pay a little more, so that the farmers receive a fairer share of the money.',
          },
          {
            id: '6',
            text: 'Coffee growing also faces a serious problem from climate change. Coffee plants need the right amount of rain, and they do not grow well when temperatures rise too high. In many coffee-growing areas, the weather has become hotter and drier in recent years, and some farms have had to move to higher land, where the air is cooler. Scientists say that by the year 2050, about half of the land now used for growing Arabica coffee may no longer be suitable for it. Farmers are trying to find new kinds of coffee plant that can grow in hotter weather, and some are planting shade trees among their coffee plants, to keep the soil cool and wet. The future of coffee, which began as a wild plant in the forests of Ethiopia, will depend on whether farmers can find ways to grow it in a warming world.',
          },
        ],
      },
      groups: [
        {
          id: 'm7r-g1',
          type: 'sentence-completion',
          instructions: 'Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          questions: [
            {
              id: 'm7r-q1',
              number: 1,
              prompt: 'Coffee plants grow wild in the forests of the highlands of ___.',
              answer: { accepted: ['Ethiopia'] },
              explanation: { text: 'Coffee plants grow wild in the highlands of Ethiopia.', evidence: { paragraphId: '1', quote: 'in the highlands of Ethiopia, in East Africa' } },
            },
            {
              id: 'm7r-q2',
              number: 2,
              prompt: 'In the fifteenth century, coffee was sold in the port of ___.',
              answer: { accepted: ['Mocha'] },
              explanation: { text: 'Coffee was sold in the port of Mocha in Yemen.', evidence: { paragraphId: '2', quote: 'sold in the port of Mocha' } },
            },
            {
              id: 'm7r-q3',
              number: 3,
              prompt: 'Arabica coffee has a mild flavour and is the more ___ of the two main kinds.',
              answer: { accepted: ['expensive'] },
              explanation: { text: 'Arabica coffee has a mild flavour and is the more expensive of the two kinds.', evidence: { paragraphId: '3', quote: 'is the more expensive of the two' } },
            },
            {
              id: 'm7r-q4',
              number: 4,
              prompt: 'The fruit of the coffee plant, which is called a ___, is usually picked by hand.',
              answer: { accepted: ['cherry'] },
              explanation: { text: 'The fruit of the coffee plant is called a cherry, and it is usually picked by hand.', evidence: { paragraphId: '3', quote: 'the fruit, which is called a cherry, is usually picked by hand' } },
            },
            {
              id: 'm7r-q5',
              number: 5,
              prompt: 'Brazil grows about a ___ of all the coffee that is traded in the world.',
              answer: { accepted: ['third'] },
              explanation: { text: 'Brazil grows about a third of all the coffee that is traded.', evidence: { paragraphId: '4', quote: 'growing about a third of all the coffee that is traded' } },
            },
          ],
        },
        {
          id: 'm7r-g2',
          type: 'true-false-not-given',
          instructions:
            'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
          questions: [
            {
              id: 'm7r-q6',
              number: 6,
              prompt: 'Coffee was first grown for its fruit in Ethiopia.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'Coffee plants were first grown for their fruit in Ethiopia.', evidence: { paragraphId: '1', quote: 'coffee plants were first grown for their fruit in Ethiopia' } },
            },
            {
              id: 'm7r-q7',
              number: 7,
              prompt: 'Some rulers tried to ban coffee because they thought it made people talk too much.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'A few rulers tried to ban coffee, saying that it made people talk too much and think too much.', evidence: { paragraphId: '2', quote: 'a few rulers tried to ban it, saying that it made people talk too much and think too much' } },
            },
            {
              id: 'm7r-q8',
              number: 8,
              prompt: 'Robusta coffee is more expensive than Arabica coffee.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'Arabica is the more expensive of the two kinds, and Robusta is cheaper to grow.', evidence: { paragraphId: '3', quote: 'Arabica coffee, which grows best in high, cool places, has a mild flavour and is the more expensive of the two' } },
            },
            {
              id: 'm7r-q9',
              number: 9,
              prompt: 'Vietnam is the largest producer of coffee in the world.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'Brazil is the largest producer, and Vietnam is the second largest producer.', evidence: { paragraphId: '4', quote: 'Vietnam is the second largest producer' } },
            },
            {
              id: 'm7r-q10',
              number: 10,
              prompt: 'All coffee farmers in Brazil have joined fair trade groups.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: {
                text: 'The passage says some farmers have joined fair trade groups, but says nothing about farmers in Brazil in particular.',
                evidence: { paragraphId: '5', quote: 'Some farmers have joined fair trade groups' },
                distractors: { TRUE: 'The passage only says that some farmers have joined fair trade groups.' },
              },
            },
          ],
        },
        {
          id: 'm7r-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm7r-q11',
              number: 11,
              prompt: 'According to the writer, why is Robusta coffee cheaper to grow than Arabica coffee?',
              options: [
                { id: 'A', text: 'Because the plants are tougher and produce more beans.' },
                { id: 'B', text: 'Because it grows in high, cool places.' },
                { id: 'C', text: 'Because it is picked by machine.' },
                { id: 'D', text: 'Because it needs more rain.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Robusta is cheaper to grow because the plants are tougher and produce more beans.',
                evidence: { paragraphId: '3', quote: 'Robusta is cheaper to grow, because the plants are tougher and produce more beans' },
              },
            },
            {
              id: 'm7r-q12',
              number: 12,
              prompt: 'What does the writer say about fair trade groups in paragraph 5?',
              options: [
                { id: 'A', text: 'They promise farmers a fixed minimum price and extra money for their villages.' },
                { id: 'B', text: 'They buy all the coffee grown in Brazil.' },
                { id: 'C', text: 'They make coffee cheaper for buyers.' },
                { id: 'D', text: 'They roast and pack the coffee beans.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Fair trade groups promise a fixed minimum price, and a little extra money to spend on schools, clean water, or roads.',
                evidence: { paragraphId: '5', quote: 'which promise them a fixed minimum price for their coffee' },
              },
            },
            {
              id: 'm7r-q13',
              number: 13,
              prompt: 'What point does the writer make in paragraph 6 about the future of coffee?',
              options: [
                { id: 'A', text: 'About half of the land now used for Arabica coffee may no longer be suitable by 2050.' },
                { id: 'B', text: 'Coffee will no longer be grown in Ethiopia.' },
                { id: 'C', text: 'Farmers have stopped growing coffee because of climate change.' },
                { id: 'D', text: 'Shade trees have solved all the problems of coffee farming.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'By 2050, about half of the land now used for growing Arabica coffee may no longer be suitable for it.',
                evidence: { paragraphId: '6', quote: 'about half of the land now used for growing Arabica coffee may no longer be suitable for it' },
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
        title: 'Greening the Desert',
        paragraphs: [
          {
            id: 'A',
            labelled: true,
            text: 'Deserts cover about a fifth of the land on Earth, and they are growing. Every year, dry land in many countries turns into desert, as trees are cut down, soil is washed away, and rain becomes less reliable. This process, which is called desertification, threatens the homes and farms of hundreds of millions of people. In the past, people thought that deserts could not be changed, and that the only answer was to move away. Today, however, scientists and farmers in many countries are trying a different answer: they are trying to turn desert back into green land.',
          },
          {
            id: 'B',
            labelled: true,
            text: 'One of the largest projects of this kind is in China, where a wall of trees is being planted across the north of the country. The project, which began in 1978, is often called the Great Green Wall, and its aim is to stop the desert from spreading into farmland and towns. Millions of trees have been planted, and in some areas the sand has stopped moving, and grass and crops have begun to grow again. The project has not been a complete success: in dry areas, many of the young trees died because there was not enough water for them, and some scientists say that planting trees in the wrong places can use up water that farmers need for their crops.',
          },
          {
            id: 'C',
            labelled: true,
            text: 'A second way of greening the desert is to use water more carefully. In Israel, a dry country where water is scarce, farmers have developed a method called drip irrigation, in which water is sent through pipes to the roots of each plant, drop by drop. This method uses far less water than watering whole fields, and it allows farmers to grow fruit and vegetables in land that was once desert. Drip irrigation is now used in many dry countries, and it has helped farmers in parts of Africa and India to grow food where little food grew before.',
          },
          {
            id: 'D',
            labelled: true,
            text: 'A third method is to change the soil itself. In the Sahara, the largest hot desert in the world, some farmers mix clay into the sandy soil, so that the soil can hold water for longer. Others plant special grasses whose roots hold the sand together and stop it from blowing away. In Niger, a country in West Africa, farmers have planted millions of trees on their farms, not in a single wall, but mixed in with their crops. The trees give shade, their leaves fall and make the soil richer, and their roots bring water up from deep underground. As a result, farmers in Niger now grow more food than they did thirty years ago.',
          },
          {
            id: 'E',
            labelled: true,
            text: 'Scientists have also found a surprising helper in the fight against the desert: a small animal. In parts of Australia, farmers have noticed that land where wombats dig their burrows stays greener for longer after rain. The burrows break up the hard ground, so that rain can sink into the soil instead of running away, and seeds can grow in the loose earth. In other dry places, ants and termites do a similar job, carrying leaves underground and making small holes that let water into the soil. These animals do not green the desert on their own, but they show that nature itself can help, if it is given the chance.',
          },
          {
            id: 'F',
            labelled: true,
            text: 'Not everyone is sure that greening the desert is a good idea. Some scientists warn that planting trees in dry places can do more harm than good, because trees drink a lot of water, and in a dry land that water may be needed for drinking or for growing food. Others point out that many greening projects have failed because they were too large, too costly, or planned without asking the people who live there. A project that looks good on a map may fail in real life, if local farmers do not want it, or if there is no money to look after the trees once they are planted.',
          },
          {
            id: 'G',
            labelled: true,
            text: 'The future of desert greening will depend on choosing the right method for each place, and on working with the people who live there. Small projects, planned with local farmers and using little water, have often worked better than large projects planned far away. If scientists, farmers and governments can work together in this way, dry land that is now desert may become green again — not everywhere, and not quickly, but in enough places to make a real difference to the people who live there.',
          },
        ],
      },
      groups: [
        {
          id: 'm7r-g4',
          type: 'matching-headings',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings below.',
          optionsTitle: 'List of Headings',
          options: [
            { id: 'i', text: 'A wall of trees in China' },
            { id: 'ii', text: 'Using less water to grow food' },
            { id: 'iii', text: 'Changing the soil and planting trees on farms' },
            { id: 'iv', text: 'Help from animals' },
            { id: 'v', text: 'Doubts about greening the desert' },
            { id: 'vi', text: 'The history of the Sahara desert' },
            { id: 'vii', text: 'How deserts first formed' },
            { id: 'viii', text: 'The cost of building new towns' },
          ],
          questions: [
            {
              id: 'm7r-q14',
              number: 14,
              prompt: 'Paragraph B',
              answer: { accepted: ['i'] },
              explanation: { text: 'The paragraph describes the wall of trees planted across the north of China.', evidence: { paragraphId: 'B', quote: 'a wall of trees is being planted across the north of the country' } },
            },
            {
              id: 'm7r-q15',
              number: 15,
              prompt: 'Paragraph C',
              answer: { accepted: ['ii'] },
              explanation: { text: 'The paragraph describes drip irrigation, which uses far less water than watering whole fields.', evidence: { paragraphId: 'C', quote: 'This method uses far less water than watering whole fields' } },
            },
            {
              id: 'm7r-q16',
              number: 16,
              prompt: 'Paragraph D',
              answer: { accepted: ['iii'] },
              explanation: { text: 'The paragraph describes changing the soil and planting trees mixed in with crops in Niger.', evidence: { paragraphId: 'D', quote: 'farmers have planted millions of trees on their farms, not in a single wall, but mixed in with their crops' } },
            },
            {
              id: 'm7r-q17',
              number: 17,
              prompt: 'Paragraph E',
              answer: { accepted: ['iv'] },
              explanation: { text: 'The paragraph describes how wombats, ants and termites help the land stay greener.', evidence: { paragraphId: 'E', quote: 'Scientists have also found a surprising helper in the fight against the desert: a small animal' } },
            },
            {
              id: 'm7r-q18',
              number: 18,
              prompt: 'Paragraph F',
              answer: { accepted: ['v'] },
              explanation: { text: 'The paragraph gives doubts about greening the desert, including the risk that trees use too much water.', evidence: { paragraphId: 'F', quote: 'Not everyone is sure that greening the desert is a good idea' } },
            },
          ],
        },
        {
          id: 'm7r-g5',
          type: 'table-completion',
          instructions: 'Complete the table below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          table: {
            headers: ['Method', 'Detail'],
            rows: [
              ['Great Green Wall', 'The project began in {{19}}'],
              ['Drip irrigation', 'Water is sent through {{20}} to the roots of each plant'],
              ['Soil in the Sahara', 'Farmers mix {{21}} into the sandy soil'],
              ['Animals in Australia', 'Wombats dig {{22}} that break up the hard ground'],
            ],
          },
          questions: [
            { id: 'm7r-q19', number: 19, answer: { accepted: ['1978'] }, explanation: { text: 'The Great Green Wall project began in 1978.', evidence: { paragraphId: 'B', quote: 'The project, which began in 1978' } } },
            { id: 'm7r-q20', number: 20, answer: { accepted: ['pipes'] }, explanation: { text: 'In drip irrigation, water is sent through pipes to the roots of each plant.', evidence: { paragraphId: 'C', quote: 'water is sent through pipes to the roots of each plant' } } },
            { id: 'm7r-q21', number: 21, answer: { accepted: ['clay'] }, explanation: { text: 'Some farmers mix clay into the sandy soil, so that the soil can hold water for longer.', evidence: { paragraphId: 'D', quote: 'some farmers mix clay into the sandy soil' } } },
            { id: 'm7r-q22', number: 22, answer: { accepted: ['burrows'] }, explanation: { text: 'Wombats dig burrows that break up the hard ground.', evidence: { paragraphId: 'E', quote: 'land where wombats dig their burrows stays greener for longer' } } },
          ],
        },
        {
          id: 'm7r-g6',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO problems with the Great Green Wall project in China are mentioned in paragraph B?',
          choose: 2,
          options: [
            { id: 'A', text: 'Many young trees died because there was not enough water.' },
            { id: 'B', text: 'Planting trees in the wrong places can use up water that farmers need.' },
            { id: 'C', text: 'The trees made the desert spread faster.' },
            { id: 'D', text: 'Local farmers refused to plant any trees.' },
            { id: 'E', text: 'The project cost more than any other project in China.' },
          ],
          questions: [
            { id: 'm7r-q23', number: 23, answer: { accepted: ['A'] }, explanation: { text: 'In dry areas, many of the young trees died because there was not enough water for them.', evidence: { paragraphId: 'B', quote: 'many of the young trees died because there was not enough water for them' } } },
            { id: 'm7r-q24', number: 24, answer: { accepted: ['B'] }, explanation: { text: 'Some scientists say planting trees in the wrong places can use up water that farmers need for their crops.', evidence: { paragraphId: 'B', quote: 'planting trees in the wrong places can use up water that farmers need for their crops' } } },
          ],
        },
        {
          id: 'm7r-g7',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO benefits do the trees planted by farmers in Niger bring, according to paragraph D?',
          choose: 2,
          options: [
            { id: 'A', text: 'They give shade.' },
            { id: 'B', text: 'Their leaves fall and make the soil richer.' },
            { id: 'C', text: 'They stop all rain from falling.' },
            { id: 'D', text: 'They provide wood for building houses.' },
            { id: 'E', text: 'They keep wild animals away from the crops.' },
          ],
          questions: [
            { id: 'm7r-q25', number: 25, answer: { accepted: ['A'] }, explanation: { text: 'The trees give shade, and their leaves fall and make the soil richer.', evidence: { paragraphId: 'D', quote: 'The trees give shade, their leaves fall and make the soil richer' } } },
            { id: 'm7r-q26', number: 26, answer: { accepted: ['B'] }, explanation: { text: 'The leaves of the trees fall and make the soil richer.', evidence: { paragraphId: 'D', quote: 'their leaves fall and make the soil richer' } } },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 3
    {
      id: 'r3',
      number: 3,
      passage: {
        title: 'Animal Intelligence',
        paragraphs: [
          {
            id: '1',
            text: 'For a long time, people believed that only humans could think, plan and solve problems. Animals, it was thought, acted only by instinct, doing what nature had taught them without any real thought. In the last fifty years, however, scientists have learned that many animals are far cleverer than people once believed. Birds make tools, dolphins call each other by name, and elephants remember friends they have not seen for years. The study of animal intelligence has changed the way we think about the minds of other animals — and about our own minds as well.',
          },
          {
            id: '2',
            text: 'One of the most surprising examples comes from crows. In the wild, New Caledonian crows make tools from sticks and leaves, bending a stick into a hook to pull insects out of holes in trees. In tests in laboratories, crows have solved problems that young children find difficult. In one famous test, a crow had to drop stones into a tube of water to raise the level of the water, so that it could reach a piece of food floating on top. The crow worked out what to do after watching another crow do it once, and some crows solved the problem on their first try, without any help at all.',
          },
          {
            id: '3',
            text: 'Dolphins also show signs of clever thinking. Each dolphin has its own special whistle, which works like a name: other dolphins use it to call that dolphin, and the dolphin answers when it hears its own whistle. Dolphins can also learn to understand simple signs made by their trainers, and they can remember what they have learned for many years. In the wild, dolphins work together to catch fish, driving the fish into shallow water, where they are easier to catch. Some scientists believe that dolphins are among the most intelligent animals in the sea, second only to humans in the way they communicate with each other.',
          },
          {
            id: '4',
            text: 'Elephants are known for their memory. In Africa, older elephants remember the places where water can be found in a dry year, and they lead their groups to water that younger elephants have never seen. Elephants also seem to remember other elephants: when two elephants that have lived apart for many years meet again, they greet each other with excitement, touching trunks and making low sounds. Some scientists think that elephants feel sadness when a member of their group dies, because they have been seen standing quietly beside the body, and returning to the same place years later.',
          },
          {
            id: '5',
            text: 'The octopus is another animal that has surprised scientists. It has no bones, and it can change the colour and shape of its body in a second, to hide from other animals or to frighten them away. In laboratories, octopuses have learned to open jars to get food, and to find their way through mazes. One octopus in an aquarium in New Zealand learned to climb out of its tank at night, crawl across the floor, and climb into another tank to eat the fish there, before returning to its own tank by morning. The keepers only found out what was happening when they set up a camera to watch the octopus at night.',
          },
          {
            id: '6',
            text: 'Not all scientists agree about what these examples mean. Some say that animals are truly intelligent, and that they think in ways that are not so different from our own. Others say that we should be careful: an animal may do something clever without understanding what it is doing, in the same way that a computer can win a game of chess without understanding the game. These scientists say that we should not judge animal intelligence by how much animals are like humans, but by how well they solve the problems of their own lives, in their own world. A bee, for example, can find its way home over many miles using the position of the sun, which is a skill that most humans do not have.',
          },
          {
            id: '7',
            text: 'In my view, the study of animal intelligence has two important lessons for us. The first is that intelligence takes many forms, and that an animal does not need to speak, write, or use tools like ours to be clever. The second is that we should treat animals with more care and respect, because an animal that can think, remember and feel is not just a machine that acts by instinct. If we accept that other animals have minds of their own, then the way we keep animals in zoos and on farms, and the way we use them in tests, should change. Understanding animal intelligence, in the end, is not only about animals: it is about what kind of people we want to be.',
          },
        ],
      },
      groups: [
        {
          id: 'm7r-g8',
          type: 'yes-no-not-given',
          instructions:
            'Do the following statements agree with the claims of the writer in Reading Passage 3? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
          questions: [
            {
              id: 'm7r-q27',
              number: 27,
              prompt: 'People once believed that animals acted only by instinct.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Animals, it was thought, acted only by instinct, without any real thought.', evidence: { paragraphId: '1', quote: 'Animals, it was thought, acted only by instinct' } },
            },
            {
              id: 'm7r-q28',
              number: 28,
              prompt: 'All crows can solve the stone-and-water problem on their first try.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'Some crows solved the problem on their first try, not all crows.', evidence: { paragraphId: '2', quote: 'some crows solved the problem on their first try' } },
            },
            {
              id: 'm7r-q29',
              number: 29,
              prompt: 'The writer believes that animals should be treated with more care and respect.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'We should treat animals with more care and respect, because an animal that can think, remember and feel is not just a machine.', evidence: { paragraphId: '7', quote: 'we should treat animals with more care and respect' } },
            },
            {
              id: 'm7r-q30',
              number: 30,
              prompt: 'Dolphins are the most intelligent animals in the sea.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: {
                text: 'Some scientists believe dolphins are among the most intelligent animals in the sea, second only to humans in communication, but the writer does not say they are the most intelligent.',
                evidence: { paragraphId: '3', quote: 'Some scientists believe that dolphins are among the most intelligent animals in the sea' },
                distractors: { YES: 'The passage says dolphins are among the most intelligent, not the most intelligent.' },
              },
            },
            {
              id: 'm7r-q31',
              number: 31,
              prompt: 'The writer thinks that the way animals are kept in zoos and on farms should change.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'If we accept that other animals have minds of their own, then the way we keep animals in zoos and on farms should change.', evidence: { paragraphId: '7', quote: 'the way we keep animals in zoos and on farms, and the way we use them in tests, should change' } },
            },
          ],
        },
        {
          id: 'm7r-g9',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm7r-q32',
              number: 32,
              prompt: 'What does the writer say about New Caledonian crows in paragraph 2?',
              options: [
                { id: 'A', text: 'They bend a stick into a hook to pull insects out of holes in trees.' },
                { id: 'B', text: 'They can only solve problems after many weeks of training.' },
                { id: 'C', text: 'They live only in laboratories.' },
                { id: 'D', text: 'They cannot remember what they have learned.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'New Caledonian crows make tools from sticks and leaves, bending a stick into a hook to pull insects out of holes in trees.',
                evidence: { paragraphId: '2', quote: 'bending a stick into a hook to pull insects out of holes in trees' },
              },
            },
            {
              id: 'm7r-q33',
              number: 33,
              prompt: 'How do dolphins work together to catch fish, according to paragraph 3?',
              options: [
                { id: 'A', text: 'By driving the fish into shallow water, where they are easier to catch.' },
                { id: 'B', text: 'By using stones to trap the fish.' },
                { id: 'C', text: 'By calling the fish with a special whistle.' },
                { id: 'D', text: 'By waiting for the fish to come to them.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Dolphins drive the fish into shallow water, where they are easier to catch.',
                evidence: { paragraphId: '3', quote: 'driving the fish into shallow water, where they are easier to catch' },
              },
            },
            {
              id: 'm7r-q34',
              number: 34,
              prompt: 'What did the octopus in New Zealand do at night?',
              options: [
                { id: 'A', text: 'It climbed out of its tank, ate fish in another tank, and returned by morning.' },
                { id: 'B', text: 'It opened jars to get food for other octopuses.' },
                { id: 'C', text: 'It changed colour to frighten the keepers.' },
                { id: 'D', text: 'It escaped from the aquarium and never returned.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The octopus climbed out of its tank at night, crawled across the floor, and climbed into another tank to eat the fish there, before returning to its own tank by morning.',
                evidence: { paragraphId: '5', quote: 'learned to climb out of its tank at night, crawl across the floor, and climb into another tank to eat the fish there' },
              },
            },
            {
              id: 'm7r-q35',
              number: 35,
              prompt: 'What point do some scientists make in paragraph 6 about judging animal intelligence?',
              options: [
                { id: 'A', text: 'We should judge animals by how well they solve the problems of their own lives, not by how much they are like humans.' },
                { id: 'B', text: 'Animals can only be intelligent if they can speak and write.' },
                { id: 'C', text: 'Computers are more intelligent than any animal.' },
                { id: 'D', text: 'Bees are the most intelligent animals of all.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'We should not judge animal intelligence by how much animals are like humans, but by how well they solve the problems of their own lives.',
                evidence: { paragraphId: '6', quote: 'we should not judge animal intelligence by how much animals are like humans, but by how well they solve the problems of their own lives' },
              },
            },
          ],
        },
        {
          id: 'm7r-g10',
          type: 'matching-sentence-endings',
          instructions: 'Complete each sentence with the correct ending, A–H.',
          optionsTitle: 'List of Endings',
          options: [
            { id: 'A', text: 'they can raise the level of the water to reach food.' },
            { id: 'B', text: 'they can lead their groups to water in a dry year.' },
            { id: 'C', text: 'they can change the colour and shape of their body in a second.' },
            { id: 'D', text: 'they can find their way home using the position of the sun.' },
            { id: 'E', text: 'they can understand simple signs made by their trainers.' },
            { id: 'F', text: 'they can win a game of chess.' },
            { id: 'G', text: 'they can speak like humans.' },
            { id: 'H', text: 'they can fly over many miles.' },
          ],
          questions: [
            { id: 'm7r-q36', number: 36, prompt: 'By dropping stones into a tube of water, crows show that', answer: { accepted: ['A'] }, explanation: { text: 'A crow dropped stones into a tube of water to raise the level of the water, so that it could reach a piece of food floating on top.', evidence: { paragraphId: '2', quote: 'to raise the level of the water, so that it could reach a piece of food floating on top' } } },
            { id: 'm7r-q37', number: 37, prompt: 'Dolphins show that', answer: { accepted: ['E'] }, explanation: { text: 'Dolphins can learn to understand simple signs made by their trainers.', evidence: { paragraphId: '3', quote: 'Dolphins can also learn to understand simple signs made by their trainers' } } },
            { id: 'm7r-q38', number: 38, prompt: 'Older elephants show that', answer: { accepted: ['B'] }, explanation: { text: 'Older elephants remember where water can be found in a dry year, and they lead their groups to water.', evidence: { paragraphId: '4', quote: 'they lead their groups to water that younger elephants have never seen' } } },
            { id: 'm7r-q39', number: 39, prompt: 'Octopuses show that', answer: { accepted: ['C'] }, explanation: { text: 'The octopus can change the colour and shape of its body in a second.', evidence: { paragraphId: '5', quote: 'it can change the colour and shape of its body in a second' } } },
            { id: 'm7r-q40', number: 40, prompt: 'Bees show that', answer: { accepted: ['D'] }, explanation: { text: 'A bee can find its way home over many miles using the position of the sun.', evidence: { paragraphId: '6', quote: 'A bee, for example, can find its way home over many miles using the position of the sun' } } },
          ],
        },
      ],
    },
  ],
};
