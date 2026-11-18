import type { ObjectiveSection } from '../../model';

/**
 * Mino Academic Mock Test 4 — Reading. Three original passages written
 * for Mino at IELTS Academic level (40 questions, 60 minutes).
 * Not Cambridge material. All passages, questions and answers are
 * original and were written fresh for this mock test.
 */
export const mock4Reading: ObjectiveSection = {
  skill: 'reading',
  timeLimitMinutes: 60,
  parts: [
    // ------------------------------------------------------------- Passage 1
    {
      id: 'r1',
      number: 1,
      passage: {
        title: 'The History of Tea',
        paragraphs: [
          {
            id: '1',
            text: 'Tea is the most widely drunk beverage in the world after water, yet its story began with a single plant in the hills of south-west China. According to an old legend, leaves from a wild tea bush fell into a pot of boiling water belonging to an emperor, and the fragrant drink that resulted was found to be both refreshing and calming. Whether or not the legend is true, tea was certainly drunk in China more than two thousand years ago, first as a medicine and later as an everyday drink. From those early beginnings, it spread slowly across Asia and then, much later, around the world.',
          },
          {
            id: '2',
            text: 'By the seventh century, tea drinking had become a regular part of life in China. Poets wrote about it, monks drank it to stay awake during long hours of prayer, and traders carried dried leaves along mountain roads to Tibet, Korea and Japan. In Japan, tea drinking developed into a formal ceremony, in which every movement, from heating the water to serving the tea, was carried out with great care. The drink was therefore not only a refreshment but also a part of religion, art and social life.',
          },
          {
            id: '3',
            text: 'Tea reached Europe in the seventeenth century, when Dutch and Portuguese ships brought small quantities back from Asia. At first it was extremely expensive, and only wealthy families could afford it. In Britain, tea was sold in coffee houses and in shops run by grocers, and a pound of tea could cost as much as a worker earned in a week. Even so, demand grew rapidly, and by the end of the century tea had become a fashionable drink among the rich.',
          },
          {
            id: '4',
            text: 'The British East India Company soon took control of much of the trade. Its ships sailed to China, where they exchanged silver for chests of tea, and returned to London with cargoes that were sold at auction. The government placed a heavy tax on tea, which made it even more expensive, and smugglers brought in large quantities illegally to avoid paying it. When the tax was finally lowered in 1784, legal sales rose sharply, and tea began to reach ordinary households for the first time.',
          },
          {
            id: '5',
            text: 'As the price fell, tea became the national drink of Britain. Workers drank strong, sweet tea during short breaks in factories and mines, and families gathered around the teapot at the end of the day. The custom of afternoon tea, a light meal of sandwiches and cakes served with tea in the late afternoon, became popular in the homes of the wealthy and was soon copied by others. Tea was no longer a luxury; it was a daily habit, drunk with milk and sugar by millions of people.',
          },
          {
            id: '6',
            text: 'To meet this demand, Britain looked for new places to grow tea. Tea bushes were planted in Assam, in north-east India, and later in Ceylon, now Sri Lanka, and in East Africa. Unlike the small gardens of China, these were large plantations, where hundreds of workers picked leaves by hand and carried them in baskets to factories nearby. The leaves were then dried, rolled and heated to produce black tea, while green tea was made by steaming the leaves soon after picking, to stop them changing colour.',
          },
          {
            id: '7',
            text: 'Today, tea is grown in more than fifty countries, and China and India produce more than half of the world’s crop. Most leaves are still picked by hand, because machines cannot easily choose only the youngest leaves at the tip of each shoot. After picking, the leaves are withered, rolled and dried, and the length of time they are left in the air decides whether the tea will be green, black or somewhere in between. Doctors and scientists continue to study the effects of tea on health, but for most drinkers its appeal is simpler: it is cheap, comforting and part of daily life in many different cultures.',
          },
        ],
      },
      groups: [
        {
          id: 'm4r-g1',
          type: 'sentence-completion',
          instructions: 'Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          questions: [
            {
              id: 'm4r-q1',
              number: 1,
              prompt: 'Monks in China drank tea to stay ___ during long hours of prayer.',
              answer: { accepted: ['awake'] },
              explanation: { text: 'Monks drank tea to stay awake during long hours of prayer.', evidence: { paragraphId: '2', quote: 'monks drank it to stay awake during long hours of prayer' } },
            },
            {
              id: 'm4r-q2',
              number: 2,
              prompt: 'In Japan, tea drinking developed into a formal ___.',
              answer: { accepted: ['ceremony'] },
              explanation: { text: 'In Japan, tea drinking developed into a formal ceremony.', evidence: { paragraphId: '2', quote: 'In Japan, tea drinking developed into a formal ceremony' } },
            },
            {
              id: 'm4r-q3',
              number: 3,
              prompt: 'When tea first reached Europe, only ___ families could afford it.',
              answer: { accepted: ['wealthy'] },
              explanation: { text: 'At first tea was extremely expensive, and only wealthy families could afford it.', evidence: { paragraphId: '3', quote: 'only wealthy families could afford it' } },
            },
            {
              id: 'm4r-q4',
              number: 4,
              prompt: 'Smugglers brought tea into Britain illegally to avoid paying the heavy ___ on it.',
              answer: { accepted: ['tax'] },
              explanation: { text: 'Smugglers brought tea in illegally to avoid paying the heavy tax.', evidence: { paragraphId: '4', quote: 'smugglers brought in large quantities illegally to avoid paying it' } },
            },
            {
              id: 'm4r-q5',
              number: 5,
              prompt: 'Workers drank strong, sweet tea during short ___ in factories and mines.',
              answer: { accepted: ['breaks'] },
              explanation: { text: 'Workers drank strong, sweet tea during short breaks in factories and mines.', evidence: { paragraphId: '5', quote: 'Workers drank strong, sweet tea during short breaks in factories and mines' } },
            },
          ],
        },
        {
          id: 'm4r-g2',
          type: 'true-false-not-given',
          instructions:
            'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
          questions: [
            {
              id: 'm4r-q6',
              number: 6,
              prompt: 'Tea was first used in China as a medicine.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'Tea was first drunk as a medicine and only later as an everyday drink.', evidence: { paragraphId: '1', quote: 'first as a medicine and later as an everyday drink' } },
            },
            {
              id: 'm4r-q7',
              number: 7,
              prompt: 'Tea reached Europe before it reached Japan.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'Traders had already carried tea to Japan long before it reached Europe in the seventeenth century.', evidence: { paragraphId: '3', quote: 'Tea reached Europe in the seventeenth century' } },
            },
            {
              id: 'm4r-q8',
              number: 8,
              prompt: 'In the seventeenth century, a pound of tea could cost as much as a worker earned in a week.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'A pound of tea could cost as much as a worker earned in a week.', evidence: { paragraphId: '3', quote: 'a pound of tea could cost as much as a worker earned in a week' } },
            },
            {
              id: 'm4r-q9',
              number: 9,
              prompt: 'The East India Company made more profit from tea than from any other product.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: {
                text: 'The passage says the Company took control of much of the tea trade, but it gives no information about its profits from tea compared with other products.',
                evidence: { paragraphId: '4', quote: 'The British East India Company soon took control of much of the trade' },
                distractors: { TRUE: 'Control of the trade is mentioned, but no comparison of profits is given.' },
              },
            },
            {
              id: 'm4r-q10',
              number: 10,
              prompt: 'After the tax on tea was lowered in 1784, legal sales of tea fell.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'When the tax was lowered, legal sales rose sharply, not fell.', evidence: { paragraphId: '4', quote: 'When the tax was finally lowered in 1784, legal sales rose sharply' } },
            },
          ],
        },
        {
          id: 'm4r-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm4r-q11',
              number: 11,
              prompt: 'According to the writer, why did smugglers bring tea into Britain illegally?',
              options: [
                { id: 'A', text: 'To avoid paying the heavy tax on tea.' },
                { id: 'B', text: 'Because tea was banned in Britain.' },
                { id: 'C', text: 'Because the East India Company refused to sell tea.' },
                { id: 'D', text: 'Because there was very little demand for tea.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Smugglers brought tea in illegally to avoid paying the heavy tax.',
                evidence: { paragraphId: '4', quote: 'smugglers brought in large quantities illegally to avoid paying it' },
                distractors: { B: 'Tea was not banned; it was taxed and sold legally at auction.' },
              },
            },
            {
              id: 'm4r-q12',
              number: 12,
              prompt: 'What does the writer say about afternoon tea in paragraph 5?',
              options: [
                { id: 'A', text: 'It was a light meal of sandwiches and cakes served with tea.' },
                { id: 'B', text: 'It was invented by workers in factories and mines.' },
                { id: 'C', text: 'It was served only in the homes of the wealthy.' },
                { id: 'D', text: 'It replaced the evening meal for most families.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Afternoon tea was a light meal of sandwiches and cakes served with tea in the late afternoon.',
                evidence: { paragraphId: '5', quote: 'a light meal of sandwiches and cakes served with tea in the late afternoon' },
                distractors: { C: 'It became popular in wealthy homes but was soon copied by others.' },
              },
            },
            {
              id: 'm4r-q13',
              number: 13,
              prompt: 'What point does the writer make in paragraph 7 about tea production today?',
              options: [
                { id: 'A', text: 'All tea leaves are now picked by machine.' },
                { id: 'B', text: 'Most leaves are still picked by hand.' },
                { id: 'C', text: 'China and India produce only a small part of the world’s crop.' },
                { id: 'D', text: 'Green tea and black tea are made from different plants.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Most leaves are still picked by hand, because machines cannot easily choose only the youngest leaves.',
                evidence: { paragraphId: '7', quote: 'Most leaves are still picked by hand, because machines cannot easily choose only the youngest leaves at the tip of each shoot' },
                distractors: { A: 'Machines cannot easily choose only the youngest leaves, so hand picking continues.' },
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
        title: 'The Return of the Wild',
        paragraphs: [
          {
            id: 'A',
            labelled: true,
            text: 'In many parts of Europe, wild animals that disappeared long ago are coming back. Wolves, beavers, lynx and wild boar are returning to forests, rivers and farmland, sometimes on their own and sometimes because people have brought them back. This process is called rewilding: allowing nature to recover in places where it was once pushed aside by farming, hunting and building. Supporters say it can repair damaged landscapes and bring back plants and animals that have been missing for generations. Others worry about what the returning animals will do to farms, forests and the people who live nearby.',
          },
          {
            id: 'B',
            labelled: true,
            text: 'Large wild animals disappeared from much of Europe because they were hunted and because their homes were destroyed. Wolves were hunted for centuries, since farmers feared they would kill sheep and cattle, and by the eighteenth century they had vanished from Britain and from many other countries. Beavers were hunted for their fur and for a substance used in perfume, and by the sixteenth century they too had disappeared from Britain. Forests were also cut down to make fields, so the animals that remained had less food and less shelter. For a long time, the countryside seemed quieter and emptier than it had once been.',
          },
          {
            id: 'C',
            labelled: true,
            text: 'The return of wolves has changed the countryside in ways that few people expected. Wolves hunt deer in large numbers, and with fewer deer eating young shoots, young trees can grow again in places where the forest had stopped renewing itself. As trees and bushes return, they provide food and shelter for birds and insects, and the shade from the trees keeps streams cooler in summer. In some valleys, researchers have counted far more kinds of plants and birds since wolves came back than they did before. The wolf, in other words, does more than hunt: it helps to shape the whole landscape.',
          },
          {
            id: 'D',
            labelled: true,
            text: 'Beavers change the landscape in a different way, by building dams across streams. A beaver family cuts down small trees, carries the branches to the water and packs them together with mud to form a dam. Behind the dam, the water spreads out to form a shallow pond, and in time the pond becomes a wetland, full of frogs, dragonflies and water birds. The dams also hold back water during heavy rain, so floods downstream are smaller and the water arrives more slowly. In dry summers, the ponds store water that would otherwise have flowed away, and this can help both wildlife and nearby farms.',
          },
          {
            id: 'E',
            labelled: true,
            text: 'Not everyone welcomes the returning animals. Wolves sometimes kill sheep, and a single attack can cost a farmer many animals in one night. Beavers can flood fields and damage crops when their dams raise the water level, and they can cut down trees that a farmer planted for timber or fruit. Some people who live near forests say they are afraid to walk alone at dusk, when wolves are most active, and parents worry about children playing near rivers where beavers have built dams. For these people, rewilding is not a romantic idea but a practical problem that affects their work and their daily lives.',
          },
          {
            id: 'F',
            labelled: true,
            text: 'Several ways have been found to reduce these problems. Farmers can use electric fences to protect livestock, and guard dogs can warn them when wolves come close. In some areas, farmers receive compensation for animals that are lost, so that one bad night does not ruin a whole year’s income. When beaver dams threaten a road or a field, wardens can lower the water level with a pipe through the dam, which protects the field while leaving the beavers in place. These methods do not remove every problem, but they allow people and wild animals to live in the same area with far less conflict than before.',
          },
          {
            id: 'G',
            labelled: true,
            text: 'The future of rewilding will depend on careful planning and on the support of local people. Projects work best when farmers, scientists and local councils discuss the plans together before animals are released, and when everyone understands what the animals may do. Some countries now have clear rules about where wolves and beavers can live and who should pay when damage occurs. If those rules are fair, and if the benefits for nature are shared with the people who live beside it, the return of the wild may continue. If not, the animals may once again be driven away.',
          },
        ],
      },
      groups: [
        {
          id: 'm4r-g4',
          type: 'matching-headings',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings below.',
          optionsTitle: 'List of Headings',
          options: [
            { id: 'i', text: 'Why large animals disappeared from the countryside' },
            { id: 'ii', text: 'How wolves have changed the landscape' },
            { id: 'iii', text: 'Small animals that reshape rivers' },
            { id: 'iv', text: 'The costs for farmers and local people' },
            { id: 'v', text: 'Ways of reducing conflict between people and wildlife' },
            { id: 'vi', text: 'The dangers of reintroducing animals too quickly' },
            { id: 'vii', text: 'Why rewilding is cheaper than farming' },
            { id: 'viii', text: 'The history of national parks' },
          ],
          questions: [
            {
              id: 'm4r-q14',
              number: 14,
              prompt: 'Paragraph B',
              answer: { accepted: ['i'] },
              explanation: { text: 'The paragraph explains that wolves and beavers were hunted and their homes destroyed, so they disappeared.', evidence: { paragraphId: 'B', quote: 'Large wild animals disappeared from much of Europe because they were hunted and because their homes were destroyed' } },
            },
            {
              id: 'm4r-q15',
              number: 15,
              prompt: 'Paragraph C',
              answer: { accepted: ['ii'] },
              explanation: { text: 'The paragraph describes how returning wolves reduce deer numbers, allowing trees, birds and insects to return.', evidence: { paragraphId: 'C', quote: 'The return of wolves has changed the countryside in ways that few people expected' } },
            },
            {
              id: 'm4r-q16',
              number: 16,
              prompt: 'Paragraph D',
              answer: { accepted: ['iii'] },
              explanation: { text: 'The paragraph describes how beavers build dams that create ponds and wetlands.', evidence: { paragraphId: 'D', quote: 'Beavers change the landscape in a different way, by building dams across streams' } },
            },
            {
              id: 'm4r-q17',
              number: 17,
              prompt: 'Paragraph E',
              answer: { accepted: ['iv'] },
              explanation: { text: 'The paragraph describes the costs for farmers and local people: lost sheep, flooded fields and damaged crops.', evidence: { paragraphId: 'E', quote: 'Not everyone welcomes the returning animals' } },
            },
            {
              id: 'm4r-q18',
              number: 18,
              prompt: 'Paragraph F',
              answer: { accepted: ['v'] },
              explanation: { text: 'The paragraph describes fences, guard dogs, compensation and pipes through dams as ways to reduce conflict.', evidence: { paragraphId: 'F', quote: 'Several ways have been found to reduce these problems' } },
            },
          ],
        },
        {
          id: 'm4r-g5',
          type: 'table-completion',
          instructions: 'Complete the table below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          table: {
            headers: ['Animal or group', 'What it does', 'What happens'],
            rows: [
              ['Wolves', 'They hunt {{19}} in large numbers', 'Young trees can grow again'],
              ['Beavers', 'They build {{20}} across streams', 'Wetlands form behind them'],
              ['Beavers', 'Their dams hold back {{21}} during heavy rain', 'Floods downstream are smaller'],
              ['Farmers', 'They receive {{22}} for animals that are lost', 'One bad night does not ruin a whole year’s income'],
            ],
          },
          questions: [
            { id: 'm4r-q19', number: 19, answer: { accepted: ['deer'] }, explanation: { text: 'Wolves hunt deer in large numbers.', evidence: { paragraphId: 'C', quote: 'Wolves hunt deer in large numbers' } } },
            { id: 'm4r-q20', number: 20, answer: { accepted: ['dams'] }, explanation: { text: 'Beavers build dams across streams.', evidence: { paragraphId: 'D', quote: 'by building dams across streams' } } },
            { id: 'm4r-q21', number: 21, answer: { accepted: ['water'] }, explanation: { text: 'Beaver dams hold back water during heavy rain.', evidence: { paragraphId: 'D', quote: 'The dams also hold back water during heavy rain' } } },
            { id: 'm4r-q22', number: 22, answer: { accepted: ['compensation'] }, explanation: { text: 'Farmers receive compensation for animals that are lost.', evidence: { paragraphId: 'F', quote: 'farmers receive compensation for animals that are lost' } } },
          ],
        },
        {
          id: 'm4r-g6',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO benefits of returning wolves are mentioned in paragraph C?',
          choose: 2,
          options: [
            { id: 'A', text: 'They hunt deer and reduce their numbers.' },
            { id: 'B', text: 'They bring more tourists to the valleys.' },
            { id: 'C', text: 'They allow young trees to grow again.' },
            { id: 'D', text: 'They remove the need for fences around farms.' },
            { id: 'E', text: 'They make rivers cleaner by building dams.' },
          ],
          questions: [
            { id: 'm4r-q23', number: 23, answer: { accepted: ['A'] }, explanation: { text: 'Wolves hunt deer in large numbers.', evidence: { paragraphId: 'C', quote: 'Wolves hunt deer in large numbers' } } },
            { id: 'm4r-q24', number: 24, answer: { accepted: ['C'] }, explanation: { text: 'With fewer deer eating young shoots, young trees can grow again.', evidence: { paragraphId: 'C', quote: 'with fewer deer eating young shoots, young trees can grow again in places where the forest had stopped renewing itself' }, distractors: { E: 'Building dams is what beavers do, in paragraph D, not wolves.' } } },
          ],
        },
        {
          id: 'm4r-g7',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO problems caused by returning animals are mentioned in paragraph E?',
          choose: 2,
          options: [
            { id: 'A', text: 'Wolves sometimes kill sheep.' },
            { id: 'B', text: 'Beavers can flood fields and damage crops.' },
            { id: 'C', text: 'Rewilding costs more than farming.' },
            { id: 'D', text: 'Beaver dams block roads so cars cannot pass.' },
            { id: 'E', text: 'Returning animals spread disease to people.' },
          ],
          questions: [
            { id: 'm4r-q25', number: 25, answer: { accepted: ['A'] }, explanation: { text: 'Wolves sometimes kill sheep.', evidence: { paragraphId: 'E', quote: 'Wolves sometimes kill sheep, and a single attack can cost a farmer many animals in one night' } } },
            { id: 'm4r-q26', number: 26, answer: { accepted: ['B'] }, explanation: { text: 'Beavers can flood fields and damage crops when their dams raise the water level.', evidence: { paragraphId: 'E', quote: 'Beavers can flood fields and damage crops when their dams raise the water level' } } },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 3
    {
      id: 'r3',
      number: 3,
      passage: {
        title: 'Should Homework Be Banned?',
        paragraphs: [
          {
            id: '1',
            text: 'Homework is one of the most argued-about topics in education. Some parents and teachers say it is an essential part of learning, while others say it causes stress, takes away family time and should be banned altogether. In several countries, schools have tried giving no homework at all, and in others the amount has been cut sharply. The debate is often presented as a simple choice between banning homework and keeping it, but, as this essay will argue, that choice misses the real question: what kind of homework is useful, and how much of it should children be given?',
          },
          {
            id: '2',
            text: 'The case for banning homework is easy to understand. After a long day at school, many children are tired, and homework can take away the time they need to play, rest and spend time with their families. For younger children, homework can also be unfair: children whose parents have time and money can get a great deal of help, while children whose parents work long hours or speak another language at home may get very little. Homework, in this view, does not level the playing field; it makes the differences between children larger.',
          },
          {
            id: '3',
            text: 'Research offers some support for this view, at least for younger children. Several large studies have found that homework brings little benefit to children in primary school, and that extra hours of homework do not lead to better results in reading or mathematics. For older pupils, the picture is different: short, regular homework that practises what was taught in class can help pupils remember it and do better in tests. The benefit, however, depends on the homework being short and clear. Long tasks that take more than an hour a night show little extra benefit, and they are the ones that cause the most stress.',
          },
          {
            id: '4',
            text: 'Those who oppose a ban argue that homework teaches more than facts. When pupils work on their own at home, they learn to organise their time, to keep going when a task is difficult and to take responsibility for their own learning. These are skills they will need at work and in adult life, and supporters say school alone cannot teach them. Homework can also give teachers useful information: if many pupils cannot do a task, the teacher knows the lesson needs to be taught again. Without homework, teachers would have far less idea of what each pupil understands.',
          },
          {
            id: '5',
            text: 'There is, however, a serious problem with the way homework is often set. Many tasks are simply more of the same work pupils did in class, copied from a textbook or printed on a worksheet, with no clear purpose that the pupil can see. When the work is dull, pupils rush through it or copy it from a friend, and they learn almost nothing. Some parents, hoping to help, end up doing the homework themselves, so the finished work tells the teacher nothing about what the child can do alone. In these cases, homework takes time but gives little in return.',
          },
          {
            id: '6',
            text: 'Another difficulty is that homework is often set without thinking about what else pupils must do. A child who has football practice, music lessons and a long journey home may have very little free time left, and homework can push the day too far. Teachers in different subjects may each set a long task on the same evening, without knowing what the others have set. The result is a pile of work that leaves children tired and anxious, and that can make them dislike school itself. It is hardly surprising that many families welcome the idea of a ban.',
          },
          {
            id: '7',
            text: 'In my view, the answer is not a complete ban, but a sharp limit on homework, especially for younger children. Primary schools should give no regular homework at all, apart from reading for pleasure and short tasks that pupils enjoy and can finish on their own. Secondary schools should set homework that is short, purposeful and clearly linked to the lesson, and teachers should agree on a limit for each evening so that no pupil faces a pile of work from five different subjects. Homework should also be checked in a way that helps pupils improve, rather than simply marked with a score.',
          },
          {
            id: '8',
            text: 'The real question, then, is not whether homework should be banned, but what kind of homework is set, and how much of it there is. A short task that makes a pupil think, practise a skill or read something interesting can be worth far more than an hour of copying from a textbook. If schools keep only that kind of homework, and drop the rest, children will have time to play, rest and learn, and homework will stop being a source of argument in so many homes. Banning it altogether would throw away something useful; keeping it as it is would waste children’s time.',
          },
        ],
      },
      groups: [
        {
          id: 'm4r-g8',
          type: 'yes-no-not-given',
          instructions:
            'Do the following statements agree with the claims of the writer in Reading Passage 3? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
          questions: [
            {
              id: 'm4r-q27',
              number: 27,
              prompt: 'Supporters of homework believe it helps pupils learn to organise their time and take responsibility for their own learning.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Supporters say homework teaches pupils to organise their time and take responsibility for their own learning.', evidence: { paragraphId: '4', quote: 'they learn to organise their time, to keep going when a task is difficult and to take responsibility for their own learning' } },
            },
            {
              id: 'm4r-q28',
              number: 28,
              prompt: 'Research suggests that homework brings little benefit to children in primary school.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Several large studies found homework brings little benefit to children in primary school.', evidence: { paragraphId: '3', quote: 'homework brings little benefit to children in primary school' } },
            },
            {
              id: 'm4r-q29',
              number: 29,
              prompt: 'The writer believes that all homework should be banned for children of every age.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'The writer argues for a sharp limit, not a complete ban.', evidence: { paragraphId: '7', quote: 'the answer is not a complete ban, but a sharp limit on homework' } },
            },
            {
              id: 'm4r-q30',
              number: 30,
              prompt: 'Homework was first introduced in schools in the nineteenth century.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: {
                text: 'The passage discusses homework today but says nothing about when it was first introduced.',
                evidence: { paragraphId: '1', quote: 'Homework is one of the most argued-about topics in education' },
                distractors: { YES: 'No date for the introduction of homework is given anywhere in the passage.' },
              },
            },
            {
              id: 'm4r-q31',
              number: 31,
              prompt: 'The writer thinks parents should do their children’s homework for them.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'The writer criticises parents doing homework themselves, because the finished work then tells the teacher nothing about what the child can do alone.', evidence: { paragraphId: '5', quote: 'Some parents, hoping to help, end up doing the homework themselves, so the finished work tells the teacher nothing about what the child can do alone' } },
            },
          ],
        },
        {
          id: 'm4r-g9',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm4r-q32',
              number: 32,
              prompt: 'What does the research described in paragraph 3 suggest?',
              options: [
                { id: 'A', text: 'Homework brings the greatest benefit to children in primary school.' },
                { id: 'B', text: 'Homework brings little benefit to younger children, but short, regular homework can help older pupils.' },
                { id: 'C', text: 'Long homework tasks always lead to better results in tests.' },
                { id: 'D', text: 'Homework has no effect on pupils of any age.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Homework brings little benefit to primary children, while short, regular homework can help older pupils remember and do better in tests.',
                evidence: { paragraphId: '3', quote: 'short, regular homework that practises what was taught in class can help pupils remember it and do better in tests' },
                distractors: { C: 'Long tasks that take more than an hour a night show little extra benefit.' },
              },
            },
            {
              id: 'm4r-q33',
              number: 33,
              prompt: 'Why does the writer mention parents doing their children’s homework in paragraph 5?',
              options: [
                { id: 'A', text: 'To show that parents should spend more time helping with homework.' },
                { id: 'B', text: 'To show that badly set homework may tell the teacher nothing about what a child can do alone.' },
                { id: 'C', text: 'To argue that teachers should set more homework.' },
                { id: 'D', text: 'To prove that children never do their own homework.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'When parents do the homework, the finished work tells the teacher nothing about what the child can do alone.',
                evidence: { paragraphId: '5', quote: 'so the finished work tells the teacher nothing about what the child can do alone' },
                distractors: { A: 'The writer presents parents doing homework as a problem, not as something to encourage.' },
              },
            },
            {
              id: 'm4r-q34',
              number: 34,
              prompt: 'According to the writer, what should primary schools give as homework in paragraph 7?',
              options: [
                { id: 'A', text: 'Long tasks from five different subjects every evening.' },
                { id: 'B', text: 'No regular homework at all, apart from reading for pleasure and short tasks pupils can finish on their own.' },
                { id: 'C', text: 'Homework that is marked only with a score.' },
                { id: 'D', text: 'The same homework as secondary schools.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Primary schools should give no regular homework apart from reading for pleasure and short tasks pupils can finish on their own.',
                evidence: { paragraphId: '7', quote: 'Primary schools should give no regular homework at all, apart from reading for pleasure and short tasks that pupils enjoy and can finish on their own' },
                distractors: { A: 'The writer wants teachers to agree a limit so no pupil faces a pile of work from five different subjects.' },
              },
            },
            {
              id: 'm4r-q35',
              number: 35,
              prompt: 'Which of the following best summarises the writer’s view?',
              options: [
                { id: 'A', text: 'Homework should be banned completely for all children.' },
                { id: 'B', text: 'Homework should be kept exactly as it is now.' },
                { id: 'C', text: 'Homework should be limited to short, purposeful tasks, and the rest should be dropped.' },
                { id: 'D', text: 'Homework should be replaced by longer school days.' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'Schools should keep only short, purposeful homework and drop the rest.',
                evidence: { paragraphId: '8', quote: 'If schools keep only that kind of homework, and drop the rest, children will have time to play, rest and learn' },
                distractors: { A: 'The writer says banning homework altogether would throw away something useful.' },
              },
            },
          ],
        },
        {
          id: 'm4r-g10',
          type: 'matching-sentence-endings',
          instructions: 'Complete each sentence with the correct ending, A–H.',
          optionsTitle: 'List of Endings',
          options: [
            { id: 'A', text: 'children in primary school.' },
            { id: 'B', text: 'the amount of time children spend with their families.' },
            { id: 'C', text: 'short, purposeful tasks that pupils can complete on their own.' },
            { id: 'D', text: 'a child’s own learning and progress.' },
            { id: 'E', text: 'what kind of homework is set, and how much of it there is.' },
            { id: 'F', text: 'every school in the country at the same time.' },
            { id: 'G', text: 'longer holidays for all pupils.' },
            { id: 'H', text: 'teachers who set homework every day.' },
          ],
          questions: [
            { id: 'm4r-q36', number: 36, prompt: 'Research suggests that homework brings little benefit to', answer: { accepted: ['A'] }, explanation: { text: 'Several large studies found homework brings little benefit to children in primary school.', evidence: { paragraphId: '3', quote: 'homework brings little benefit to children in primary school' } } },
            { id: 'm4r-q37', number: 37, prompt: 'One argument for banning homework is that it reduces', answer: { accepted: ['B'] }, explanation: { text: 'Homework can take away the time children need to play, rest and spend time with their families.', evidence: { paragraphId: '2', quote: 'homework can take away the time they need to play, rest and spend time with their families' } } },
            { id: 'm4r-q38', number: 38, prompt: 'Homework that pupils cannot do alone may fail to show', answer: { accepted: ['D'] }, explanation: { text: 'When parents do the homework, the finished work tells the teacher nothing about what the child can do alone.', evidence: { paragraphId: '5', quote: 'the finished work tells the teacher nothing about what the child can do alone' } } },
            { id: 'm4r-q39', number: 39, prompt: 'The writer believes schools should replace much homework with', answer: { accepted: ['C'] }, explanation: { text: 'Schools should keep short, purposeful homework and drop the rest; primary pupils should have short tasks they can finish on their own.', evidence: { paragraphId: '7', quote: 'short tasks that pupils enjoy and can finish on their own' } } },
            { id: 'm4r-q40', number: 40, prompt: 'According to the writer, the real question about homework is not whether to ban it, but', answer: { accepted: ['E'] }, explanation: { text: 'The real question is what kind of homework is set, and how much of it there is.', evidence: { paragraphId: '8', quote: 'The real question, then, is not whether homework should be banned, but what kind of homework is set, and how much of it there is' } } },
          ],
        },
      ],
    },
  ],
};
