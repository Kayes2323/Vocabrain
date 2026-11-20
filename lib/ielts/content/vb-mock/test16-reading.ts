import type { ObjectiveSection } from '../../model';

/**
 * Mino Academic Mock Test 16 — Reading. Three original passages written
 * for Mino at IELTS Academic level (40 questions, 60 minutes).
 * Not Cambridge material. All passages, questions and answers are
 * original and were written fresh for this mock test.
 */
export const mock16Reading: ObjectiveSection = {
  skill: 'reading',
  timeLimitMinutes: 60,
  parts: [
    // ------------------------------------------------------------- Passage 1
    {
      id: 'r1',
      number: 1,
      passage: {
        title: 'The History of Newspapers',
        paragraphs: [
          {
            id: '1',
            text: 'The first printed newspaper appeared in Germany in 1605. It was called Relation, and it was published by Johann Carolus in the city of Strasbourg. Before newspapers, most people got their news by talking to other people, or by reading letters that were written by hand.',
          },
          {
            id: '2',
            text: 'Early newspapers were very different from the newspapers of today. They were small, they had only a few pages, and they were printed once a week. They gave readers news about wars, trade and the weather, but they did not have photographs, and they did not have sports pages.',
          },
          {
            id: '3',
            text: 'In England, the first daily newspaper began in 1702. It was called The Daily Courant, and it had only one page. At first, only rich people could buy newspapers, because they were expensive, and many people could not read. As more children went to school, more people learned to read, and more people wanted to buy newspapers.',
          },
          {
            id: '4',
            text: 'In the nineteenth century, newspapers grew very quickly. New printing machines could print many more copies in less time, and paper became cheaper. Newspapers also became cheaper to buy, so workers could buy them every day. By 1900, millions of people in Britain read a newspaper every morning.',
          },
          {
            id: '5',
            text: 'In the twentieth century, newspapers had to compete with radio and television. People could hear the news on the radio and see it on television, often on the same day that it happened. Newspapers answered by giving readers more photographs, longer stories and the opinions of writers. Many newspapers also began to print colour photographs.',
          },
          {
            id: '6',
            text: 'Today, newspapers face a new change: the internet. Many people now read the news on a computer or a phone, and they do not buy a printed newspaper. Some newspapers have closed, but many have started websites, where readers can read the news for free or pay a small amount each month. Newspapers have changed a great deal since 1605, but they are still an important way for people to learn what is happening in the world.',
          },
        ],
      },
      groups: [
        {
          id: 'm16r-g1',
          type: 'sentence-completion',
          instructions: 'Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          questions: [
            {
              id: 'm16r-q1',
              number: 1,
              prompt: 'The first printed newspaper appeared in ___ in 1605.',
              answer: { accepted: ['Germany'] },
              explanation: { text: 'The first printed newspaper appeared in Germany in 1605.', evidence: { paragraphId: '1', quote: 'appeared in Germany in 1605' } },
            },
            {
              id: 'm16r-q2',
              number: 2,
              prompt: 'The first printed newspaper was called ___.',
              answer: { accepted: ['Relation'] },
              explanation: { text: 'The first printed newspaper was called Relation.', evidence: { paragraphId: '1', quote: 'It was called Relation' } },
            },
            {
              id: 'm16r-q3',
              number: 3,
              prompt: 'Early newspapers were printed once a ___.',
              answer: { accepted: ['week'] },
              explanation: { text: 'Early newspapers were printed once a week.', evidence: { paragraphId: '2', quote: 'printed once a week' } },
            },
            {
              id: 'm16r-q4',
              number: 4,
              prompt: 'The first daily newspaper in England began in ___.',
              answer: { accepted: ['1702'] },
              explanation: { text: 'The first daily newspaper in England began in 1702.', evidence: { paragraphId: '3', quote: 'began in 1702' } },
            },
            {
              id: 'm16r-q5',
              number: 5,
              prompt: 'By 1900, millions of people in Britain read a newspaper every ___.',
              answer: { accepted: ['morning'] },
              explanation: { text: 'By 1900, millions of people in Britain read a newspaper every morning.', evidence: { paragraphId: '4', quote: 'read a newspaper every morning' } },
            },
          ],
        },
        {
          id: 'm16r-g2',
          type: 'true-false-not-given',
          instructions:
            'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
          questions: [
            {
              id: 'm16r-q6',
              number: 6,
              prompt: 'The first printed newspaper appeared in Germany in 1605.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'The first printed newspaper appeared in Germany in 1605.', evidence: { paragraphId: '1', quote: 'appeared in Germany in 1605' } },
            },
            {
              id: 'm16r-q7',
              number: 7,
              prompt: 'Early newspapers had photographs.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'Early newspapers did not have photographs.', evidence: { paragraphId: '2', quote: 'they did not have photographs' } },
            },
            {
              id: 'm16r-q8',
              number: 8,
              prompt: 'The first daily newspaper in England had ten pages.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'The first daily newspaper in England had only one page.', evidence: { paragraphId: '3', quote: 'it had only one page' } },
            },
            {
              id: 'm16r-q9',
              number: 9,
              prompt: 'In the nineteenth century, newspapers became cheaper to buy.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'In the nineteenth century, newspapers also became cheaper to buy.', evidence: { paragraphId: '4', quote: 'Newspapers also became cheaper to buy' } },
            },
            {
              id: 'm16r-q10',
              number: 10,
              prompt: 'Newspapers in Germany are more popular than newspapers in Britain.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: { text: 'The passage does not compare the popularity of newspapers in Germany and Britain.', evidence: { paragraphId: '6', quote: 'Newspapers have changed a great deal since 1605' } },
            },
          ],
        },
        {
          id: 'm16r-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm16r-q11',
              number: 11,
              prompt: 'Why could only rich people buy newspapers at first?',
              options: [
                { id: 'A', text: 'They were expensive.' },
                { id: 'B', text: 'They were printed once a week.' },
                { id: 'C', text: 'They had only one page.' },
                { id: 'D', text: 'They were written in German.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Only rich people could buy newspapers at first, because they were expensive.',
                evidence: { paragraphId: '3', quote: 'because they were expensive' },
              },
            },
            {
              id: 'm16r-q12',
              number: 12,
              prompt: 'What helped newspapers grow in the nineteenth century?',
              options: [
                { id: 'A', text: 'New printing machines could print many more copies in less time.' },
                { id: 'B', text: 'Newspapers began to print colour photographs.' },
                { id: 'C', text: 'People could hear the news on the radio.' },
                { id: 'D', text: 'Newspapers started websites on the internet.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'New printing machines could print many more copies in less time.',
                evidence: { paragraphId: '4', quote: 'New printing machines could print many more copies in less time' },
              },
            },
            {
              id: 'm16r-q13',
              number: 13,
              prompt: 'What does the writer say about newspapers today?',
              options: [
                { id: 'A', text: 'They are still an important way for people to learn what is happening in the world.' },
                { id: 'B', text: 'They have all closed.' },
                { id: 'C', text: 'Nobody reads the news on the internet.' },
                { id: 'D', text: 'They no longer have photographs.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Newspapers are still an important way for people to learn what is happening in the world.',
                evidence: { paragraphId: '6', quote: 'they are still an important way for people to learn what is happening in the world' },
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
        title: 'The Water Crisis',
        paragraphs: [
          {
            id: 'A',
            labelled: true,
            text: 'Water covers about 71 per cent of the surface of the Earth, but most of this water is in the seas, and people cannot drink it. Only about 3 per cent of the water on Earth is fresh water, and most of that fresh water is ice in the cold parts of the world. So the water that people can drink is only a very small part of all the water on Earth.',
          },
          {
            id: 'B',
            labelled: true,
            text: 'The water crisis is the problem that many people do not have enough clean water to drink. Today, about two billion people in the world do not have clean water at home, and they must walk a long way to find water, or they must drink water that is not safe. Every year, many people become ill because they drink dirty water.',
          },
          {
            id: 'C',
            labelled: true,
            text: 'One cause of the water crisis is that more people need water than before. The number of people in the world is growing, and towns and cities are growing too. At the same time, farmers need more water to grow food for all these people. In fact, farming uses about 70 per cent of all the fresh water that people use.',
          },
          {
            id: 'D',
            labelled: true,
            text: 'Another cause is that water is wasted. In many homes, water is wasted when taps are left running, or when showers last a long time. In some countries, old pipes lose a lot of water before it reaches people\'s homes. In hot countries, water is also lost when it dries up in the sun.',
          },
          {
            id: 'E',
            labelled: true,
            text: 'Climate change is making the water crisis worse. In some parts of the world, it rains less than before, and long periods without rain, called droughts, are becoming more common. In other parts of the world, floods damage water pipes and make the water dirty, so people cannot drink it.',
          },
          {
            id: 'F',
            labelled: true,
            text: 'There are many ways to help with the water crisis. One way is to save water: people can take shorter showers, and they can turn off the tap when they brush their teeth. Another way is to use water again: water from washing can be cleaned and used to water plants. Farmers can also help by using new ways of watering their fields, so that less water is wasted.',
          },
          {
            id: 'G',
            labelled: true,
            text: 'Governments can help too. They can build new pipes to carry clean water to towns and villages, and they can make laws to stop factories from putting dirty water into rivers. If people, farmers and governments work together, more people will have clean water to drink, and the water crisis will become smaller.',
          },
        ],
      },
      groups: [
        {
          id: 'm16r-g4',
          type: 'matching-headings',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings below.',
          optionsTitle: 'List of Headings',
          options: [
            { id: 'i', text: 'How much fresh water is there' },
            { id: 'ii', text: 'How many people lack clean water' },
            { id: 'iii', text: 'More people need more water' },
            { id: 'iv', text: 'Water is wasted' },
            { id: 'v', text: 'Climate change makes the problem worse' },
            { id: 'vi', text: 'Ways to help' },
            { id: 'vii', text: 'What governments can do' },
            { id: 'viii', text: 'Water in the seas' },
          ],
          questions: [
            {
              id: 'm16r-q14',
              number: 14,
              prompt: 'Paragraph B',
              answer: { accepted: ['ii'] },
              explanation: { text: 'The paragraph says that about two billion people do not have clean water at home.', evidence: { paragraphId: 'B', quote: 'about two billion people in the world do not have clean water at home' } },
            },
            {
              id: 'm16r-q15',
              number: 15,
              prompt: 'Paragraph C',
              answer: { accepted: ['iii'] },
              explanation: { text: 'The paragraph says that more people need water than before.', evidence: { paragraphId: 'C', quote: 'more people need water than before' } },
            },
            {
              id: 'm16r-q16',
              number: 16,
              prompt: 'Paragraph D',
              answer: { accepted: ['iv'] },
              explanation: { text: 'The paragraph says that water is wasted.', evidence: { paragraphId: 'D', quote: 'water is wasted' } },
            },
            {
              id: 'm16r-q17',
              number: 17,
              prompt: 'Paragraph E',
              answer: { accepted: ['v'] },
              explanation: { text: 'The paragraph says that climate change is making the water crisis worse.', evidence: { paragraphId: 'E', quote: 'Climate change is making the water crisis worse' } },
            },
            {
              id: 'm16r-q18',
              number: 18,
              prompt: 'Paragraph F',
              answer: { accepted: ['vi'] },
              explanation: { text: 'The paragraph says that there are many ways to help with the water crisis.', evidence: { paragraphId: 'F', quote: 'There are many ways to help with the water crisis' } },
            },
          ],
        },
        {
          id: 'm16r-g5',
          type: 'table-completion',
          instructions: 'Complete the table below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          table: {
            headers: ['Topic', 'Detail'],
            rows: [
              ['Fresh water', 'Only about {{19}} per cent of the water on Earth is fresh water'],
              ['Farming', 'Farming uses about {{20}} per cent of all the fresh water that people use'],
              ['People without clean water', 'About {{21}} billion people in the world do not have clean water at home'],
              ['Droughts', 'Long periods without rain, called {{22}}, are becoming more common'],
            ],
          },
          questions: [
            { id: 'm16r-q19', number: 19, answer: { accepted: ['3'] }, explanation: { text: 'Only about 3 per cent of the water on Earth is fresh water.', evidence: { paragraphId: 'A', quote: 'Only about 3 per cent of the water on Earth is fresh water' } } },
            { id: 'm16r-q20', number: 20, answer: { accepted: ['70'] }, explanation: { text: 'Farming uses about 70 per cent of all the fresh water that people use.', evidence: { paragraphId: 'C', quote: 'farming uses about 70 per cent of all the fresh water' } } },
            { id: 'm16r-q21', number: 21, answer: { accepted: ['two', '2'] }, explanation: { text: 'About two billion people in the world do not have clean water at home.', evidence: { paragraphId: 'B', quote: 'about two billion people in the world do not have clean water at home' } } },
            { id: 'm16r-q22', number: 22, answer: { accepted: ['droughts'] }, explanation: { text: 'Long periods without rain, called droughts, are becoming more common.', evidence: { paragraphId: 'E', quote: 'called droughts, are becoming more common' } } },
          ],
        },
        {
          id: 'm16r-g6',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO things does the writer say about farming?',
          choose: 2,
          options: [
            { id: 'A', text: 'Farming uses about 70 per cent of all the fresh water that people use.' },
            { id: 'B', text: 'Farmers need more water to grow food for all these people.' },
            { id: 'C', text: 'Farmers waste water by taking long showers.' },
            { id: 'D', text: 'Farmers build new pipes to carry clean water.' },
            { id: 'E', text: 'Farmers make laws to stop factories from putting dirty water into rivers.' },
          ],
          questions: [
            { id: 'm16r-q23', number: 23, answer: { accepted: ['A'] }, explanation: { text: 'Farming uses about 70 per cent of all the fresh water that people use.', evidence: { paragraphId: 'C', quote: 'farming uses about 70 per cent of all the fresh water that people use' } } },
            { id: 'm16r-q24', number: 24, answer: { accepted: ['B'] }, explanation: { text: 'Farmers need more water to grow food for all these people.', evidence: { paragraphId: 'C', quote: 'farmers need more water to grow food for all these people' } } },
          ],
        },
        {
          id: 'm16r-g7',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO ways of helping with the water crisis does the writer mention in paragraph F?',
          choose: 2,
          options: [
            { id: 'A', text: 'Take shorter showers.' },
            { id: 'B', text: 'Use water again to water plants.' },
            { id: 'C', text: 'Build new pipes to carry clean water.' },
            { id: 'D', text: 'Make laws to stop factories from putting dirty water into rivers.' },
            { id: 'E', text: 'Stop all farming.' },
          ],
          questions: [
            { id: 'm16r-q25', number: 25, answer: { accepted: ['A'] }, explanation: { text: 'People can take shorter showers.', evidence: { paragraphId: 'F', quote: 'people can take shorter showers' } } },
            { id: 'm16r-q26', number: 26, answer: { accepted: ['B'] }, explanation: { text: 'Water from washing can be cleaned and used to water plants.', evidence: { paragraphId: 'F', quote: 'used to water plants' } } },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 3
    {
      id: 'r3',
      number: 3,
      passage: {
        title: 'Should Children Be Taught Cooking at School?',
        paragraphs: [
          {
            id: '1',
            text: 'In many schools today, children learn subjects such as maths, science and history, but they do not learn how to cook. Some people think that cooking should be taught in schools, because it is an important skill for life. Others think that schools should teach only academic subjects, and that children should learn to cook at home.',
          },
          {
            id: '2',
            text: 'Cooking is a skill that everyone needs. People who can cook can make healthy food for themselves and for their families, and they do not need to buy expensive ready-made meals. Young people who leave home to study or to work often find that they cannot cook, and they eat fast food every day, which is bad for their health.',
          },
          {
            id: '3',
            text: 'Teaching cooking at school would also help children to learn about healthy food. In cooking lessons, children could learn which foods are good for them, and how much sugar and salt are in the food that they eat. This knowledge could help them to make better choices about food for the rest of their lives.',
          },
          {
            id: '4',
            text: 'Cooking lessons could also help children in other subjects. When children cook, they must measure amounts of food, so they use maths. They must read a recipe, so they use reading. They must also work with other children, so they learn to work as a team. In this way, cooking lessons can help children to learn many different skills.',
          },
          {
            id: '5',
            text: 'However, some people say that there is not enough time in the school day for cooking lessons. Schools already have many subjects to teach, and teachers have a lot of work to do. These people say that parents should teach their children to cook at home, because parents know what their children like to eat.',
          },
          {
            id: '6',
            text: 'Other people say that cooking lessons would cost too much money. Schools would need to buy cookers, food and other things for the lessons, and they would need to train teachers to teach cooking. In some schools, there is no kitchen, so cooking lessons would be very difficult to start.',
          },
          {
            id: '7',
            text: 'In my view, children should be taught cooking at school, because cooking is an important life skill, and many children do not learn it at home. Schools do not need to teach cooking every day: one lesson each week would be enough. In this way, children could learn to cook healthy food, and they would not lose too much time from other subjects.',
          },
        ],
      },
      groups: [
        {
          id: 'm16r-g8',
          type: 'yes-no-not-given',
          instructions:
            'Do the following statements agree with the claims of the writer in Reading Passage 3? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
          questions: [
            {
              id: 'm16r-q27',
              number: 27,
              prompt: 'Many schools today teach children how to cook.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'In many schools today, children do not learn how to cook.', evidence: { paragraphId: '1', quote: 'they do not learn how to cook' } },
            },
            {
              id: 'm16r-q28',
              number: 28,
              prompt: 'Young people who cannot cook often eat fast food every day.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Young people who cannot cook eat fast food every day.', evidence: { paragraphId: '2', quote: 'they eat fast food every day' } },
            },
            {
              id: 'm16r-q29',
              number: 29,
              prompt: 'Cooking lessons could help children to learn about healthy food.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Teaching cooking at school would help children to learn about healthy food.', evidence: { paragraphId: '3', quote: 'help children to learn about healthy food' } },
            },
            {
              id: 'm16r-q30',
              number: 30,
              prompt: 'Schools would need to buy cookers and food for cooking lessons.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Schools would need to buy cookers, food and other things for the lessons.', evidence: { paragraphId: '6', quote: 'Schools would need to buy cookers, food and other things' } },
            },
            {
              id: 'm16r-q31',
              number: 31,
              prompt: 'Cooking lessons are more popular than maths lessons.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: { text: 'The writer does not compare the popularity of cooking lessons and maths lessons.', evidence: { paragraphId: '7', quote: 'one lesson each week would be enough' } },
            },
          ],
        },
        {
          id: 'm16r-g9',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm16r-q32',
              number: 32,
              prompt: 'What does the writer say about people who can cook?',
              options: [
                { id: 'A', text: 'They can make healthy food for themselves and for their families.' },
                { id: 'B', text: 'They never eat fast food.' },
                { id: 'C', text: 'They do not need to learn maths.' },
                { id: 'D', text: 'They always buy ready-made meals.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'People who can cook can make healthy food for themselves and for their families.',
                evidence: { paragraphId: '2', quote: 'can make healthy food for themselves and for their families' },
              },
            },
            {
              id: 'm16r-q33',
              number: 33,
              prompt: 'How could cooking lessons help children in other subjects?',
              options: [
                { id: 'A', text: 'They must measure amounts of food, so they use maths.' },
                { id: 'B', text: 'They must watch television.' },
                { id: 'C', text: 'They must write long essays.' },
                { id: 'D', text: 'They must learn a new language.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'When children cook, they must measure amounts of food, so they use maths.',
                evidence: { paragraphId: '4', quote: 'they must measure amounts of food, so they use maths' },
              },
            },
            {
              id: 'm16r-q34',
              number: 34,
              prompt: 'What is one problem with cooking lessons, according to some people?',
              options: [
                { id: 'A', text: 'There is not enough time in the school day.' },
                { id: 'B', text: 'Children do not like food.' },
                { id: 'C', text: 'Teachers do not like cooking.' },
                { id: 'D', text: 'Parents do not want cooking lessons.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Some people say that there is not enough time in the school day for cooking lessons.',
                evidence: { paragraphId: '5', quote: 'there is not enough time in the school day for cooking lessons' },
              },
            },
            {
              id: 'm16r-q35',
              number: 35,
              prompt: "What is the writer's view?",
              options: [
                { id: 'A', text: 'Children should be taught cooking at school.' },
                { id: 'B', text: 'Cooking should only be taught at home.' },
                { id: 'C', text: 'Schools should teach cooking every day.' },
                { id: 'D', text: 'Cooking lessons cost too much money.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'In the writer\'s view, children should be taught cooking at school.',
                evidence: { paragraphId: '7', quote: 'children should be taught cooking at school' },
              },
            },
          ],
        },
        {
          id: 'm16r-g10',
          type: 'matching-sentence-endings',
          instructions: 'Complete each sentence with the correct ending, A–H.',
          optionsTitle: 'List of Endings',
          options: [
            { id: 'A', text: 'can make healthy food for themselves and for their families.' },
            { id: 'B', text: 'which foods are good for them.' },
            { id: 'C', text: 'they use maths.' },
            { id: 'D', text: 'in the school day for cooking lessons.' },
            { id: 'E', text: 'would be enough.' },
            { id: 'F', text: 'they eat fast food every day.' },
            { id: 'G', text: 'schools would need to buy cookers, food and other things.' },
            { id: 'H', text: 'children should learn to cook at home.' },
          ],
          questions: [
            { id: 'm16r-q36', number: 36, prompt: 'People who can cook', answer: { accepted: ['A'] }, explanation: { text: 'People who can cook can make healthy food for themselves and for their families.', evidence: { paragraphId: '2', quote: 'can make healthy food for themselves and for their families' } } },
            { id: 'm16r-q37', number: 37, prompt: 'In cooking lessons, children could learn', answer: { accepted: ['B'] }, explanation: { text: 'In cooking lessons, children could learn which foods are good for them.', evidence: { paragraphId: '3', quote: 'children could learn which foods are good for them' } } },
            { id: 'm16r-q38', number: 38, prompt: 'When children cook, they must measure amounts of food, so', answer: { accepted: ['C'] }, explanation: { text: 'When children cook, they must measure amounts of food, so they use maths.', evidence: { paragraphId: '4', quote: 'they must measure amounts of food, so they use maths' } } },
            { id: 'm16r-q39', number: 39, prompt: 'Some people say that there is not enough time', answer: { accepted: ['D'] }, explanation: { text: 'Some people say that there is not enough time in the school day for cooking lessons.', evidence: { paragraphId: '5', quote: 'there is not enough time in the school day for cooking lessons' } } },
            { id: 'm16r-q40', number: 40, prompt: "In the writer's view, one lesson each week", answer: { accepted: ['E'] }, explanation: { text: "In the writer's view, one lesson each week would be enough.", evidence: { paragraphId: '7', quote: 'one lesson each week would be enough' } } },
          ],
        },
      ],
    },
  ],
};
