import type { ObjectiveSection } from '../../model';

/**
 * Mino Academic Mock Test 5 — Reading. Three original passages written
 * for Mino at IELTS Academic level (40 questions, 60 minutes).
 * Not Cambridge material. All passages, questions and answers are
 * original and were written fresh for this mock test.
 */
export const mock5Reading: ObjectiveSection = {
  skill: 'reading',
  timeLimitMinutes: 60,
  parts: [
    // ------------------------------------------------------------- Passage 1
    {
      id: 'r1',
      number: 1,
      passage: {
        title: 'Honeybees and Their Importance',
        paragraphs: [
          {
            id: '1',
            text: 'Honeybees are small insects, but they play a very large part in the way we eat. As they fly from flower to flower in search of food, they carry pollen on their bodies, and in doing so they pollinate the plants they visit. Without this pollination, many plants could not produce fruit or seeds. Scientists estimate that about one third of the food crops grown around the world depend, at least in part, on pollination by bees. Apples, almonds, strawberries and many vegetables would be far scarcer, and far more expensive, without them.',
          },
          {
            id: '2',
            text: 'A honeybee colony is a highly organised community. At its centre is a single queen, who may live for several years. She is the only bee in the colony that lays eggs, and she can lay more than a thousand eggs in a single day during the summer. Around her are tens of thousands of worker bees, all female, who do almost all the work of the colony. They clean the hive, feed the young bees, guard the entrance and fly out to collect food. The third kind of bee, the drone, is male; drones do no work in the hive, and their only role is to mate with a new queen.',
          },
          {
            id: '3',
            text: 'Worker bees collect two things from flowers: nectar, a sweet liquid that they turn into honey, and pollen, which provides the protein that young bees need to grow. Finding good flowers is not left to chance. When a worker bee finds a rich source of food, she returns to the hive and performs a waggle dance on the wall of the hive. The direction and length of the dance tell other bees the direction of the flowers and how far away they are. In this way, a whole colony can quickly learn where the best food can be found.',
          },
          {
            id: '4',
            text: 'The value of this work to farmers is enormous. Many fruit farmers rent hives from beekeepers and place them in their orchards while the trees are in flower, so that the bees will pollinate the blossom. A single hive can pollinate a large area, and the fruit that results is often larger and more regular in shape. In some regions, whole industries depend on bees in this way: in California, for example, almond growers need millions of hives each spring, and beekeepers travel hundreds of miles with their hives to meet the demand.',
          },
          {
            id: '5',
            text: 'Yet honeybees are in trouble. Their numbers have fallen in many countries over the past thirty years, and scientists have identified several causes. One is the varroa mite, a tiny parasite that attacks honeybees and spreads disease through the colony. Another is the loss of wild flowers, as meadows are ploughed up or covered in buildings, leaving bees with less food. A third cause is the use of pesticides on farms: some pesticides can affect a bee’s memory and its ability to find its way home, so that bees that fly out to collect food never return.',
          },
          {
            id: '6',
            text: 'The fall in bee numbers matters for more than honey. If there are too few bees to pollinate crops, harvests fall, and food prices rise. Wild plants also suffer, because many of them depend on bees in the same way as farm crops do. When wild flowers fail to set seed, the birds and insects that feed on them also decline, and the loss spreads through the whole food chain. Protecting bees is therefore not only about saving one insect; it is about protecting the wider natural world on which farming depends.',
          },
          {
            id: '7',
            text: 'There is much that can be done to help. Farmers can leave strips of wild flowers at the edges of their fields, and gardeners can plant flowers that bloom at different times of the year, so that bees have food from spring to autumn. Beekeepers are learning new ways to control the varroa mite, and scientists are breeding bees that are better able to resist it. Above all, people can use fewer pesticides, or choose kinds that are less harmful to bees. If these steps are taken widely, honeybee numbers may recover — and with them, the harvests that depend on bees.',
          },
        ],
      },
      groups: [
        {
          id: 'm5r-g1',
          type: 'sentence-completion',
          instructions: 'Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          questions: [
            {
              id: 'm5r-q1',
              number: 1,
              prompt: 'The queen is the only bee in the colony that lays ___.',
              answer: { accepted: ['eggs'] },
              explanation: { text: 'The queen is the only bee in the colony that lays eggs.', evidence: { paragraphId: '2', quote: 'She is the only bee in the colony that lays eggs' } },
            },
            {
              id: 'm5r-q2',
              number: 2,
              prompt: 'Worker bees collect nectar and ___ from flowers.',
              answer: { accepted: ['pollen'] },
              explanation: { text: 'Worker bees collect nectar and pollen from flowers.', evidence: { paragraphId: '3', quote: 'Worker bees collect two things from flowers: nectar, a sweet liquid that they turn into honey, and pollen' } },
            },
            {
              id: 'm5r-q3',
              number: 3,
              prompt: 'Bees tell other bees where food is by performing a ___ dance.',
              answer: { accepted: ['waggle'] },
              explanation: { text: 'A worker bee performs a waggle dance to show other bees where food is.', evidence: { paragraphId: '3', quote: 'performs a waggle dance on the wall of the hive' } },
            },
            {
              id: 'm5r-q4',
              number: 4,
              prompt: 'Many fruit farmers ___ hives to pollinate their crops.',
              answer: { accepted: ['rent'] },
              explanation: { text: 'Many fruit farmers rent hives from beekeepers and place them in their orchards.', evidence: { paragraphId: '4', quote: 'Many fruit farmers rent hives from beekeepers' } },
            },
            {
              id: 'm5r-q5',
              number: 5,
              prompt: 'The varroa mite is a tiny ___ that attacks honeybees.',
              answer: { accepted: ['parasite'] },
              explanation: { text: 'The varroa mite is a tiny parasite that attacks honeybees.', evidence: { paragraphId: '5', quote: 'the varroa mite, a tiny parasite that attacks honeybees' } },
            },
          ],
        },
        {
          id: 'm5r-g2',
          type: 'true-false-not-given',
          instructions:
            'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
          questions: [
            {
              id: 'm5r-q6',
              number: 6,
              prompt: 'About one third of the world’s food crops depend, at least in part, on pollination by bees.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'About one third of food crops depend, at least in part, on pollination by bees.', evidence: { paragraphId: '1', quote: 'about one third of the food crops grown around the world depend, at least in part, on pollination by bees' } },
            },
            {
              id: 'm5r-q7',
              number: 7,
              prompt: 'All the bees in a colony are able to lay eggs.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'Only the queen lays eggs; workers and drones do not.', evidence: { paragraphId: '2', quote: 'She is the only bee in the colony that lays eggs' } },
            },
            {
              id: 'm5r-q8',
              number: 8,
              prompt: 'Honeybees were first kept by farmers in North America.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: {
                text: 'The passage says nothing about where honeybees were first kept.',
                evidence: { paragraphId: '2', quote: 'A honeybee colony is a highly organised community' },
                distractors: { TRUE: 'No place or date for the first keeping of bees is given.' },
              },
            },
            {
              id: 'm5r-q9',
              number: 9,
              prompt: 'Some pesticides can harm bees by affecting their ability to find their way home.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'Some pesticides can affect a bee’s memory and its ability to find its way home.', evidence: { paragraphId: '5', quote: 'some pesticides can affect a bee’s memory and its ability to find its way home' } },
            },
            {
              id: 'm5r-q10',
              number: 10,
              prompt: 'The number of honeybee colonies has risen in every country in recent years.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'Bee numbers have fallen in many countries over the past thirty years, not risen everywhere.', evidence: { paragraphId: '5', quote: 'Their numbers have fallen in many countries over the past thirty years' } },
            },
          ],
        },
        {
          id: 'm5r-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm5r-q11',
              number: 11,
              prompt: 'According to the writer, why do fruit farmers rent hives?',
              options: [
                { id: 'A', text: 'To produce honey for sale.' },
                { id: 'B', text: 'To pollinate the blossom in their orchards.' },
                { id: 'C', text: 'To control insect pests.' },
                { id: 'D', text: 'To attract tourists to their farms.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Farmers rent hives and place them in orchards while trees are in flower, so the bees will pollinate the blossom.',
                evidence: { paragraphId: '4', quote: 'so that the bees will pollinate the blossom' },
                distractors: { A: 'Honey is made by the bees, but farmers rent hives for pollination.' },
              },
            },
            {
              id: 'm5r-q12',
              number: 12,
              prompt: 'What does the writer say about the waggle dance in paragraph 3?',
              options: [
                { id: 'A', text: 'It tells other bees the direction of flowers and how far away they are.' },
                { id: 'B', text: 'It is performed only by the queen bee.' },
                { id: 'C', text: 'It warns other bees of danger.' },
                { id: 'D', text: 'It is learned by young bees from older bees.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The direction and length of the dance tell other bees the direction of the flowers and how far away they are.',
                evidence: { paragraphId: '3', quote: 'The direction and length of the dance tell other bees the direction of the flowers and how far away they are' },
              },
            },
            {
              id: 'm5r-q13',
              number: 13,
              prompt: 'What point does the writer make in paragraph 7 about helping honeybees?',
              options: [
                { id: 'A', text: 'Planting flowers that bloom at different times of the year can give bees food from spring to autumn.' },
                { id: 'B', text: 'Honeybees no longer need any help from people.' },
                { id: 'C', text: 'Pesticides should be used more often on farms.' },
                { id: 'D', text: 'Beekeeping should be left entirely to scientists.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Gardeners can plant flowers that bloom at different times of the year, so bees have food from spring to autumn.',
                evidence: { paragraphId: '7', quote: 'gardeners can plant flowers that bloom at different times of the year, so that bees have food from spring to autumn' },
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
        title: 'The Rise of Electric Cars',
        paragraphs: [
          {
            id: 'A',
            labelled: true,
            text: 'Electric cars are no longer a rare sight. In many cities, they now make up a large share of new cars sold, and their numbers on the roads are growing every year. Governments in several countries have announced that the sale of new petrol and diesel cars will be banned in the 2030s or 2040s, and car makers are spending billions of pounds developing new electric models. Yet the electric car is not a new idea at all: the first electric cars were built more than a hundred years ago, and for a short time they were more popular than petrol cars.',
          },
          {
            id: 'B',
            labelled: true,
            text: 'In the early 1900s, electric cars were common in American cities. They were quiet, clean and easy to drive, and they did not need to be started by hand, as early petrol cars did. But they had one serious weakness: their batteries were heavy, and they could only travel a short distance before they needed to be recharged. Petrol cars, by contrast, could travel much further, and petrol could be bought at filling stations that were opening all over the country. By the 1920s, cheap petrol and better roads had made the petrol car the clear winner, and electric cars almost disappeared.',
          },
          {
            id: 'C',
            labelled: true,
            text: 'The return of the electric car has been made possible by better batteries. Modern cars use lithium-ion batteries, which are far lighter and more powerful than the batteries of a century ago. As factories have produced more of them, their cost has fallen sharply: the price of a battery pack has dropped by more than three quarters in the past fifteen years. At the same time, the distance a car can travel on one charge has grown. Many new models can now travel more than 300 miles on a single charge, which is enough for most journeys, and even for long trips with one stop to recharge.',
          },
          {
            id: 'D',
            labelled: true,
            text: 'Charging an electric car is very different from filling a petrol car. Most owners charge their cars at home, overnight, using a charger fitted in a garage or on the outside wall of a house. This is usually the cheapest way to charge, and the car is ready each morning. For longer journeys, drivers use public chargers, which are now found at motorway services, in car parks and on city streets. A fast charger can add about 100 miles of range in about thirty minutes, so a driver can stop for a coffee while the car charges.',
          },
          {
            id: 'E',
            labelled: true,
            text: 'One of the main reasons for encouraging electric cars is the environment. An electric car produces no exhaust emissions while it is being driven, so it does not add polluting gases to the air in towns and cities. This can improve the air that people breathe, especially in places where traffic is heavy. However, the picture is not entirely simple. The electricity used to charge the car may come from coal or gas power stations, and making the batteries uses a great deal of energy. An electric car is therefore cleanest when it is charged with electricity from wind, sun or water power.',
          },
          {
            id: 'F',
            labelled: true,
            text: 'Despite their rapid growth, electric cars still face several problems. The first is price: even though prices have fallen, most electric cars still cost more to buy than a similar petrol car. The second is charging: in rural areas, and in towns where many people live in flats without a garage, there are still too few public chargers, and drivers worry about finding one when they need it. The third problem is the supply of raw materials. Batteries need lithium and cobalt, which are mined in only a few countries, and mining them can damage the land and use large amounts of water.',
          },
          {
            id: 'G',
            labelled: true,
            text: 'The future of the electric car will depend on solving these problems, and on what governments decide to do. Several countries have already promised money to build more chargers, and car makers are working on new kinds of batteries that use cheaper materials and charge more quickly. If prices continue to fall and charging becomes as easy as buying petrol, electric cars may soon become the normal choice for most drivers. The change would be one of the biggest in the history of transport — and it would bring back, in a new form, a kind of car that first appeared more than a century ago.',
          },
        ],
      },
      groups: [
        {
          id: 'm5r-g4',
          type: 'matching-headings',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings below.',
          optionsTitle: 'List of Headings',
          options: [
            { id: 'i', text: 'Why electric cars disappeared a century ago' },
            { id: 'ii', text: 'Cheaper batteries and longer journeys' },
            { id: 'iii', text: 'How cars are charged' },
            { id: 'iv', text: 'The environmental case — and its limits' },
            { id: 'v', text: 'Problems that still need solving' },
            { id: 'vi', text: 'Why electric cars are more comfortable to drive' },
            { id: 'vii', text: 'The history of the petrol engine' },
            { id: 'viii', text: 'Why governments support electric cars' },
          ],
          questions: [
            {
              id: 'm5r-q14',
              number: 14,
              prompt: 'Paragraph B',
              answer: { accepted: ['i'] },
              explanation: { text: 'The paragraph explains why electric cars lost to petrol cars in the 1920s and almost disappeared.', evidence: { paragraphId: 'B', quote: 'electric cars almost disappeared' } },
            },
            {
              id: 'm5r-q15',
              number: 15,
              prompt: 'Paragraph C',
              answer: { accepted: ['ii'] },
              explanation: { text: 'The paragraph describes cheaper lithium-ion batteries and a range of more than 300 miles.', evidence: { paragraphId: 'C', quote: 'their cost has fallen sharply' } },
            },
            {
              id: 'm5r-q16',
              number: 16,
              prompt: 'Paragraph D',
              answer: { accepted: ['iii'] },
              explanation: { text: 'The paragraph describes charging at home overnight and at public fast chargers.', evidence: { paragraphId: 'D', quote: 'Most owners charge their cars at home, overnight' } },
            },
            {
              id: 'm5r-q17',
              number: 17,
              prompt: 'Paragraph E',
              answer: { accepted: ['iv'] },
              explanation: { text: 'The paragraph gives the environmental benefits of electric cars, then notes that electricity may come from coal or gas.', evidence: { paragraphId: 'E', quote: 'However, the picture is not entirely simple' } },
            },
            {
              id: 'm5r-q18',
              number: 18,
              prompt: 'Paragraph F',
              answer: { accepted: ['v'] },
              explanation: { text: 'The paragraph lists the problems that remain: price, charging and raw materials.', evidence: { paragraphId: 'F', quote: 'electric cars still face several problems' } },
            },
          ],
        },
        {
          id: 'm5r-g5',
          type: 'table-completion',
          instructions: 'Complete the table below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          table: {
            headers: ['Topic', 'Detail'],
            rows: [
              ['Batteries', 'Many new models can travel more than {{19}} miles on a single charge'],
              ['Charging', 'A fast charger can add about 100 miles of range in about {{20}} minutes'],
              ['Environment', 'An electric car produces no exhaust {{21}} while it is being driven'],
              ['Materials', 'Batteries need lithium and {{22}}'],
            ],
          },
          questions: [
            { id: 'm5r-q19', number: 19, answer: { accepted: ['300'] }, explanation: { text: 'Many new models can travel more than 300 miles on a single charge.', evidence: { paragraphId: 'C', quote: 'more than 300 miles on a single charge' } } },
            { id: 'm5r-q20', number: 20, answer: { accepted: ['thirty', '30'] }, explanation: { text: 'A fast charger can add about 100 miles of range in about thirty minutes.', evidence: { paragraphId: 'D', quote: 'in about thirty minutes' } } },
            { id: 'm5r-q21', number: 21, answer: { accepted: ['emissions'] }, explanation: { text: 'An electric car produces no exhaust emissions while it is being driven.', evidence: { paragraphId: 'E', quote: 'produces no exhaust emissions while it is being driven' } } },
            { id: 'm5r-q22', number: 22, answer: { accepted: ['cobalt'] }, explanation: { text: 'Batteries need lithium and cobalt.', evidence: { paragraphId: 'F', quote: 'Batteries need lithium and cobalt' } } },
          ],
        },
        {
          id: 'm5r-g6',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO improvements in electric car batteries are mentioned in paragraph C?',
          choose: 2,
          options: [
            { id: 'A', text: 'Batteries have become much cheaper.' },
            { id: 'B', text: 'Cars can now travel further on one charge.' },
            { id: 'C', text: 'Batteries never need to be replaced.' },
            { id: 'D', text: 'Batteries are now made without any metals.' },
            { id: 'E', text: 'Batteries can be charged in one minute.' },
          ],
          questions: [
            { id: 'm5r-q23', number: 23, answer: { accepted: ['A'] }, explanation: { text: 'The price of a battery pack has dropped by more than three quarters in fifteen years.', evidence: { paragraphId: 'C', quote: 'their cost has fallen sharply' } } },
            { id: 'm5r-q24', number: 24, answer: { accepted: ['B'] }, explanation: { text: 'Many new models can now travel more than 300 miles on a single charge.', evidence: { paragraphId: 'C', quote: 'the distance a car can travel on one charge has grown' }, distractors: { E: 'Fast charging is described in paragraph D, not as a one-minute charge.' } } },
          ],
        },
        {
          id: 'm5r-g7',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO problems for electric cars are mentioned in paragraph F?',
          choose: 2,
          options: [
            { id: 'A', text: 'Most electric cars still cost more to buy than a similar petrol car.' },
            { id: 'B', text: 'There are still too few public chargers in some areas.' },
            { id: 'C', text: 'Electric cars are too slow for motorways.' },
            { id: 'D', text: 'Electric cars produce more exhaust emissions than petrol cars.' },
            { id: 'E', text: 'Electric cars cannot be driven in cold weather.' },
          ],
          questions: [
            { id: 'm5r-q25', number: 25, answer: { accepted: ['A'] }, explanation: { text: 'Most electric cars still cost more to buy than a similar petrol car.', evidence: { paragraphId: 'F', quote: 'most electric cars still cost more to buy than a similar petrol car' } } },
            { id: 'm5r-q26', number: 26, answer: { accepted: ['B'] }, explanation: { text: 'In rural areas and in towns where people live in flats, there are still too few public chargers.', evidence: { paragraphId: 'F', quote: 'there are still too few public chargers' } } },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 3
    {
      id: 'r3',
      number: 3,
      passage: {
        title: 'Should Children Learn to Code?',
        paragraphs: [
          {
            id: '1',
            text: 'In many countries, schools are now asking whether children should learn to code — that is, to write the instructions that tell a computer what to do. Some people say coding is as important as reading and mathematics, and that every child should learn it from an early age. Others say it is a waste of valuable school time, and that children would be better spending that time on the subjects that have always mattered most. The debate is often presented as a simple choice between teaching coding and not teaching it, but, as this essay will argue, that choice misses the real question: what kind of coding should children learn, and how much time should it take?',
          },
          {
            id: '2',
            text: 'The case for teaching coding is easy to understand. Computers now play a part in almost every job, from farming to medicine, and people who understand how computers work are likely to have more choices in their working lives. Supporters also argue that coding teaches children to think logically and solve problems step by step. When a child writes a program, they must break a large task into small parts, test each part, and find and correct their mistakes. These are skills that can be used in many other subjects, and in adult life, even by people who never become professional programmers.',
          },
          {
            id: '3',
            text: 'Research offers some support for this view. Several studies have found that children who learn to code do better in mathematics and in problem-solving tests than children who do not. The benefit seems to be greatest when coding is taught in short, regular lessons that are clearly linked to what children are learning in mathematics and science. Long lessons that focus only on learning the rules of a difficult programming language, by contrast, show little benefit, and they are the ones that children enjoy least.',
          },
          {
            id: '4',
            text: 'Those who oppose teaching coding argue that it is not as useful as its supporters claim. Many jobs, they point out, will never require anyone to write computer code, and new tools powered by artificial intelligence can now write simple programs for people. They also worry about screen time: children already spend many hours each day looking at screens, and more time in front of a computer at school may harm their eyesight, their sleep and their ability to concentrate. In this view, schools should protect children from screens, not add to the time they spend looking at them.',
          },
          {
            id: '5',
            text: 'There is, however, a serious problem with the way coding is often taught. Many teachers have had little or no training in coding, and they may know little more about it than the children they teach. In schools in richer areas, children may have their own computers and fast internet, while in poorer areas a whole class may have to share a few old machines. Coding lessons, in this view, do not level the playing field; they make the differences between children larger, just as homework can do when some children get far more help at home than others.',
          },
          {
            id: '6',
            text: 'Another difficulty is that the school day is already full. A child who has lessons in reading, mathematics, science, history and a foreign language has very little free time left, and adding coding lessons can push the day too far. Teachers in different subjects may each demand more time, without knowing what the others are asking for. The result is a crowded timetable that leaves children tired and anxious, and that can make them dislike school itself. It is hardly surprising that many parents welcome the idea of leaving coding out of the curriculum altogether.',
          },
          {
            id: '7',
            text: 'In my view, the answer is not to teach every child to become a professional programmer, but to teach the basics of coding to all children, in short lessons that focus on ideas rather than on difficult language. Children should learn how computers follow instructions, how to break a problem into steps, and how to test whether their solution works. These lessons should start at around the age of ten, when children are old enough to think in steps, and they should be taught by teachers who have been given proper training and good materials.',
          },
          {
            id: '8',
            text: 'The real question, then, is not whether children should learn to code, but what kind of coding is taught, and how much time it takes. A short lesson that makes a child think, solve a problem or build something simple can be worth far more than an hour spent memorising the rules of a programming language. If schools keep only that kind of coding, and drop the rest, children will have time to learn the other subjects that matter, and coding will stop being a source of argument in so many homes. Teaching it badly would waste children’s time; not teaching it at all would leave them unprepared for the world they will live in.',
          },
        ],
      },
      groups: [
        {
          id: 'm5r-g8',
          type: 'yes-no-not-given',
          instructions:
            'Do the following statements agree with the claims of the writer in Reading Passage 3? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
          questions: [
            {
              id: 'm5r-q27',
              number: 27,
              prompt: 'Supporters of coding believe it helps children learn to think logically and solve problems step by step.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Supporters argue that coding teaches children to think logically and solve problems step by step.', evidence: { paragraphId: '2', quote: 'coding teaches children to think logically and solve problems step by step' } },
            },
            {
              id: 'm5r-q28',
              number: 28,
              prompt: 'Research shows that coding lessons improve children’s results in every school subject.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'Research found benefits in mathematics and problem-solving tests, not in every school subject.', evidence: { paragraphId: '3', quote: 'children who learn to code do better in mathematics and in problem-solving tests' } },
            },
            {
              id: 'm5r-q29',
              number: 29,
              prompt: 'The writer believes that every child should become a professional programmer.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'The writer says the answer is not to teach every child to become a professional programmer.', evidence: { paragraphId: '7', quote: 'the answer is not to teach every child to become a professional programmer' } },
            },
            {
              id: 'm5r-q30',
              number: 30,
              prompt: 'Coding was first taught in schools in the 1980s.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: {
                text: 'The passage says nothing about when coding was first taught in schools.',
                evidence: { paragraphId: '1', quote: 'In many countries, schools are now asking whether children should learn to code' },
                distractors: { YES: 'No date for the first teaching of coding is given anywhere in the passage.' },
              },
            },
            {
              id: 'm5r-q31',
              number: 31,
              prompt: 'The writer thinks teachers in all schools are well trained to teach coding.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'The writer says many teachers have had little or no training in coding.', evidence: { paragraphId: '5', quote: 'Many teachers have had little or no training in coding' } },
            },
          ],
        },
        {
          id: 'm5r-g9',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm5r-q32',
              number: 32,
              prompt: 'What does the research described in paragraph 3 suggest?',
              options: [
                { id: 'A', text: 'Children who learn to code do better in mathematics and in problem-solving tests.' },
                { id: 'B', text: 'Coding lessons bring the greatest benefit when they are very long.' },
                { id: 'C', text: 'Coding replaces the need to learn mathematics.' },
                { id: 'D', text: 'Coding has no effect on children’s learning.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Children who learn to code do better in mathematics and in problem-solving tests.',
                evidence: { paragraphId: '3', quote: 'children who learn to code do better in mathematics and in problem-solving tests than children who do not' },
                distractors: { B: 'Long lessons that focus only on the rules of a difficult language show little benefit.' },
              },
            },
            {
              id: 'm5r-q33',
              number: 33,
              prompt: 'Why does the writer mention tools powered by artificial intelligence in paragraph 4?',
              options: [
                { id: 'A', text: 'To show that writing computer code may be less useful than supporters claim.' },
                { id: 'B', text: 'To show that artificial intelligence will replace all teachers.' },
                { id: 'C', text: 'To argue that schools should buy more computers.' },
                { id: 'D', text: 'To prove that children enjoy using artificial intelligence.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'New AI tools can now write simple programs for people, so coding may be less useful than supporters claim.',
                evidence: { paragraphId: '4', quote: 'new tools powered by artificial intelligence can now write simple programs for people' },
              },
            },
            {
              id: 'm5r-q34',
              number: 34,
              prompt: 'According to the writer, what should schools teach in paragraph 7?',
              options: [
                { id: 'A', text: 'The basics of coding to all children, in short lessons that focus on ideas.' },
                { id: 'B', text: 'Advanced programming to older pupils only.' },
                { id: 'C', text: 'The rules of a difficult programming language in long lessons.' },
                { id: 'D', text: 'Coding only to children who want to become professional programmers.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Schools should teach the basics of coding to all children, in short lessons that focus on ideas rather than on difficult language.',
                evidence: { paragraphId: '7', quote: 'to teach the basics of coding to all children, in short lessons that focus on ideas rather than on difficult language' },
              },
            },
            {
              id: 'm5r-q35',
              number: 35,
              prompt: 'Which of the following best summarises the writer’s view?',
              options: [
                { id: 'A', text: 'Coding should be taught to all children, but only in short lessons that focus on ideas, with the rest dropped.' },
                { id: 'B', text: 'Coding should never be taught in schools.' },
                { id: 'C', text: 'Coding should be taught exactly as it is taught now.' },
                { id: 'D', text: 'Coding should replace reading and mathematics in schools.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Schools should keep only short, idea-focused coding lessons and drop the rest.',
                evidence: { paragraphId: '8', quote: 'If schools keep only that kind of coding, and drop the rest' },
                distractors: { B: 'The writer says not teaching coding at all would leave children unprepared.' },
              },
            },
          ],
        },
        {
          id: 'm5r-g10',
          type: 'matching-sentence-endings',
          instructions: 'Complete each sentence with the correct ending, A–H.',
          optionsTitle: 'List of Endings',
          options: [
            { id: 'A', text: 'think logically and solve problems step by step.' },
            { id: 'B', text: 'spend less time on reading and mathematics.' },
            { id: 'C', text: 'the time children spend in front of a screen.' },
            { id: 'D', text: 'a child’s ability to write computer programs for a living.' },
            { id: 'E', text: 'what kind of coding is taught, and how much time it takes.' },
            { id: 'F', text: 'schools in richer areas.' },
            { id: 'G', text: 'short lessons that focus on ideas rather than on difficult language.' },
            { id: 'H', text: 'every child in the country at the same age.' },
          ],
          questions: [
            { id: 'm5r-q36', number: 36, prompt: 'Learning to code can help children to', answer: { accepted: ['A'] }, explanation: { text: 'Coding teaches children to think logically and solve problems step by step.', evidence: { paragraphId: '2', quote: 'coding teaches children to think logically and solve problems step by step' } } },
            { id: 'm5r-q37', number: 37, prompt: 'One argument against teaching coding is that it increases', answer: { accepted: ['C'] }, explanation: { text: 'Opponents worry about screen time and more time in front of a computer at school.', evidence: { paragraphId: '4', quote: 'more time in front of a computer at school may harm their eyesight' } } },
            { id: 'm5r-q38', number: 38, prompt: 'The writer believes schools should replace long coding lessons with', answer: { accepted: ['G'] }, explanation: { text: 'Schools should teach the basics in short lessons that focus on ideas rather than on difficult language.', evidence: { paragraphId: '7', quote: 'in short lessons that focus on ideas rather than on difficult language' } } },
            { id: 'm5r-q39', number: 39, prompt: 'According to the writer, the real question about coding is not whether to teach it, but', answer: { accepted: ['E'] }, explanation: { text: 'The real question is what kind of coding is taught, and how much time it takes.', evidence: { paragraphId: '8', quote: 'The real question, then, is not whether children should learn to code, but what kind of coding is taught, and how much time it takes' } } },
            { id: 'm5r-q40', number: 40, prompt: 'Access to computers and coding lessons is often better in', answer: { accepted: ['F'] }, explanation: { text: 'In schools in richer areas, children may have their own computers and fast internet.', evidence: { paragraphId: '5', quote: 'In schools in richer areas, children may have their own computers and fast internet' } } },
          ],
        },
      ],
    },
  ],
};
