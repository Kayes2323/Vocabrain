import type { ObjectiveSection } from '../../model';

/**
 * Mino Academic Mock Test 6 — Reading. Three original passages written
 * for Mino at IELTS Academic level (40 questions, 60 minutes).
 * Not Cambridge material. All passages, questions and answers are
 * original and were written fresh for this mock test.
 */
export const mock6Reading: ObjectiveSection = {
  skill: 'reading',
  timeLimitMinutes: 60,
  parts: [
    // ------------------------------------------------------------- Passage 1
    {
      id: 'r1',
      number: 1,
      passage: {
        title: 'The History of Chocolate',
        paragraphs: [
          {
            id: '1',
            text: 'Chocolate is one of the most popular foods in the world. Every year, people eat millions of tonnes of it, in the form of bars, drinks, cakes and sweets. Yet few of the people who enjoy chocolate know where it comes from, or how it was first made. The story of chocolate begins more than three thousand years ago, in the rainforests of Central America, where the cacao tree grows. The cacao tree produces large pods, and inside each pod are seeds, which we call cocoa beans. It was these beans that people first learned to use, long before chocolate became the sweet food we know today.',
          },
          {
            id: '2',
            text: 'The first people to make a drink from cocoa beans were the Olmecs, who lived in what is now Mexico around 1500 BC. They ground the beans, mixed them with water, and drank the bitter liquid at special ceremonies. Later, the Maya people also made a drink from cocoa beans, which they called xocolatl. They believed that the drink gave them strength, and they used cocoa beans as money: a hundred beans could buy a turkey, and ten beans could buy a rabbit. The Aztecs, who came after the Maya, also valued cocoa highly. Their emperor, Montezuma, was said to drink fifty cups of chocolate a day.',
          },
          {
            id: '3',
            text: 'For the people of Central America, chocolate was not a sweet food at all. The drink they made was bitter, because they did not add sugar, and it was often mixed with chilli or vanilla to give it flavour. It was also drunk cold, not hot. Chocolate was treated as a special drink, for important people and for religious ceremonies, and ordinary people drank it only rarely. The beans themselves were so valuable that they were kept in storehouses and guarded, and stealing cocoa beans was punished severely.',
          },
          {
            id: '4',
            text: 'Chocolate first reached Europe in the sixteenth century, when Spanish ships returned from the Americas carrying cocoa beans. At first, Europeans found the bitter drink unpleasant, but they soon learned to add sugar and milk to it, and to drink it hot. By the seventeenth century, drinking chocolate had become fashionable among rich people in Spain, France and England, and special chocolate houses opened in London, where people met to drink chocolate and talk, much as they met in coffee houses. Chocolate was still very expensive, however, and for two hundred years it remained a luxury that only the rich could afford.',
          },
          {
            id: '5',
            text: 'The change came in the nineteenth century, when new machines made it possible to produce chocolate quickly and cheaply. In 1828, a Dutchman named Coenraad van Houten invented a press that could remove most of the fat, called cocoa butter, from the beans, leaving a powder that mixed easily with water. Then, in 1847, a company in Bristol, in England, made the first chocolate bar by mixing cocoa powder with sugar and cocoa butter. In 1875, a Swiss maker named Daniel Peter added milk to chocolate for the first time, and created milk chocolate, which soon became the most popular kind of all.',
          },
          {
            id: '6',
            text: 'By the twentieth century, chocolate was no longer a luxury. Large factories in Europe and North America made chocolate bars in huge numbers, and they were sold in shops everywhere at prices that ordinary workers could afford. Soldiers in both world wars were given chocolate in their rations, because it was a quick source of energy and it did not go bad easily. Chocolate also became part of everyday celebrations: at Easter, people gave each other chocolate eggs, and at Christmas, chocolate appeared in calendars and in boxes of sweets.',
          },
          {
            id: '7',
            text: 'Today, most of the world’s cocoa is grown in West Africa, where the climate suits the cacao tree. Ghana and Côte d’Ivoire together produce more than half of all the cocoa in the world. Yet the farmers who grow cocoa often earn very little money, and many of them have never tasted chocolate themselves. In recent years, some chocolate makers have begun to pay farmers a fairer price for their beans, and to put a fair trade label on their chocolate, so that buyers can choose chocolate that has been made in a fairer way. The story of chocolate, which began as a bitter drink for kings and priests, has become a story about trade, work and fairness in the modern world.',
          },
        ],
      },
      groups: [
        {
          id: 'm6r-g1',
          type: 'sentence-completion',
          instructions: 'Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          questions: [
            {
              id: 'm6r-q1',
              number: 1,
              prompt: 'The cacao tree produces large ___, and inside each one are seeds.',
              answer: { accepted: ['pods'] },
              explanation: { text: 'The cacao tree produces large pods, and inside each pod are seeds.', evidence: { paragraphId: '1', quote: 'The cacao tree produces large pods' } },
            },
            {
              id: 'm6r-q2',
              number: 2,
              prompt: 'The Maya called their drink made from cocoa beans ___.',
              answer: { accepted: ['xocolatl'] },
              explanation: { text: 'The Maya called their drink xocolatl.', evidence: { paragraphId: '2', quote: 'which they called xocolatl' } },
            },
            {
              id: 'm6r-q3',
              number: 3,
              prompt: 'The Aztec emperor Montezuma was said to drink fifty cups of chocolate a ___.',
              answer: { accepted: ['day'] },
              explanation: { text: 'Montezuma was said to drink fifty cups of chocolate a day.', evidence: { paragraphId: '2', quote: 'drink fifty cups of chocolate a day' } },
            },
            {
              id: 'm6r-q4',
              number: 4,
              prompt: 'In 1828, Coenraad van Houten invented a ___ that could remove most of the fat from the beans.',
              answer: { accepted: ['press'] },
              explanation: { text: 'Van Houten invented a press that could remove most of the fat from the beans.', evidence: { paragraphId: '5', quote: 'invented a press that could remove most of the fat' } },
            },
            {
              id: 'm6r-q5',
              number: 5,
              prompt: 'In 1875, Daniel Peter added ___ to chocolate for the first time.',
              answer: { accepted: ['milk'] },
              explanation: { text: 'Daniel Peter added milk to chocolate for the first time.', evidence: { paragraphId: '5', quote: 'added milk to chocolate for the first time' } },
            },
          ],
        },
        {
          id: 'm6r-g2',
          type: 'true-false-not-given',
          instructions:
            'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
          questions: [
            {
              id: 'm6r-q6',
              number: 6,
              prompt: 'The Maya used cocoa beans as money.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'The Maya used cocoa beans as money: a hundred beans could buy a turkey.', evidence: { paragraphId: '2', quote: 'they used cocoa beans as money' } },
            },
            {
              id: 'm6r-q7',
              number: 7,
              prompt: 'The chocolate drink made in Central America was sweet.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'The drink was bitter, because the people did not add sugar.', evidence: { paragraphId: '3', quote: 'The drink they made was bitter, because they did not add sugar' } },
            },
            {
              id: 'm6r-q8',
              number: 8,
              prompt: 'The Olmecs were the first people in Europe to drink chocolate.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'The Olmecs lived in what is now Mexico, in Central America, not in Europe.', evidence: { paragraphId: '2', quote: 'The first people to make a drink from cocoa beans were the Olmecs, who lived in what is now Mexico' } },
            },
            {
              id: 'm6r-q9',
              number: 9,
              prompt: 'Chocolate houses in London were the first shops to sell chocolate bars.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: {
                text: 'The passage says chocolate houses opened in London, but says nothing about whether they were the first shops to sell chocolate bars.',
                evidence: { paragraphId: '4', quote: 'special chocolate houses opened in London, where people met to drink chocolate and talk' },
                distractors: { TRUE: 'The first chocolate bar was made in Bristol in 1847, long after the chocolate houses opened.' },
              },
            },
            {
              id: 'm6r-q10',
              number: 10,
              prompt: 'Many cocoa farmers have never tasted chocolate themselves.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'Many cocoa farmers have never tasted chocolate themselves.', evidence: { paragraphId: '7', quote: 'many of them have never tasted chocolate themselves' } },
            },
          ],
        },
        {
          id: 'm6r-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm6r-q11',
              number: 11,
              prompt: 'According to the writer, why did drinking chocolate become fashionable in Europe in the seventeenth century?',
              options: [
                { id: 'A', text: 'Because Europeans learned to add sugar and milk to it and drink it hot.' },
                { id: 'B', text: 'Because it became very cheap to produce.' },
                { id: 'C', text: 'Because it was first made in London.' },
                { id: 'D', text: 'Because doctors said it was good for health.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Europeans learned to add sugar and milk to chocolate and drink it hot, and drinking chocolate then became fashionable.',
                evidence: { paragraphId: '4', quote: 'they soon learned to add sugar and milk to it, and to drink it hot' },
                distractors: { B: 'Chocolate remained expensive for two hundred years, until the nineteenth century.' },
              },
            },
            {
              id: 'm6r-q12',
              number: 12,
              prompt: 'What does the writer say about chocolate in paragraph 6?',
              options: [
                { id: 'A', text: 'It was given to soldiers because it was a quick source of energy and did not go bad easily.' },
                { id: 'B', text: 'It was no longer eaten by ordinary people.' },
                { id: 'C', text: 'It became more expensive than it had been before.' },
                { id: 'D', text: 'It was only sold in Europe.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Soldiers were given chocolate because it was a quick source of energy and did not go bad easily.',
                evidence: { paragraphId: '6', quote: 'because it was a quick source of energy and it did not go bad easily' },
              },
            },
            {
              id: 'm6r-q13',
              number: 13,
              prompt: 'What point does the writer make in paragraph 7 about cocoa farming today?',
              options: [
                { id: 'A', text: 'Ghana and Côte d’Ivoire together produce more than half of all the cocoa in the world.' },
                { id: 'B', text: 'Most cocoa is now grown in Central America.' },
                { id: 'C', text: 'Cocoa farmers earn more than chocolate makers.' },
                { id: 'D', text: 'Fair trade labels have solved all the problems of cocoa farmers.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Ghana and Côte d’Ivoire together produce more than half of all the cocoa in the world.',
                evidence: { paragraphId: '7', quote: 'Ghana and Côte d’Ivoire together produce more than half of all the cocoa in the world' },
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
        title: 'The Future of Libraries',
        paragraphs: [
          {
            id: 'A',
            labelled: true,
            text: 'For hundreds of years, the library was one of the most important buildings in a town. It was a quiet place where people went to read, to study, and to borrow books. Today, many people say that libraries are no longer needed. They argue that almost all information is now available on the internet, and that books can be read on a phone or a computer at home. Yet libraries have not disappeared. In many countries, they are busier than ever, and they are changing into something quite different from the libraries of the past.',
          },
          {
            id: 'B',
            labelled: true,
            text: 'The first change is in what libraries lend. Most libraries still lend books, but they now lend much more than books. Visitors can borrow films, music, and audiobooks, and many libraries lend tools, toys, and even musical instruments. Some libraries lend laptops and tablets to people who do not have a computer at home. In this way, the library has become a place where people can try things they cannot afford to buy, rather than simply a store of books.',
          },
          {
            id: 'C',
            labelled: true,
            text: 'The second change is in the building itself. The old library was a place of silence, where talking was not allowed and children were expected to be quiet. The modern library is often a noisy place, full of people talking, working together, and learning. Many libraries now have rooms where students can study in groups, areas where children can play and listen to stories, and cafés where visitors can sit with a coffee and a newspaper. The library has become a meeting place for the whole community, not just a place for serious study.',
          },
          {
            id: 'D',
            labelled: true,
            text: 'The third change is in the help that libraries offer. Librarians no longer spend most of their time putting books back on shelves. Instead, they help people find information, learn new skills, and use computers. Many libraries run free classes in reading, in computer skills, and in finding work. Some offer help with writing a CV, or with filling in forms on the internet. For people who have recently moved to a new country, libraries offer classes in the local language, and a safe place to meet other people.',
          },
          {
            id: 'E',
            labelled: true,
            text: 'Libraries have also changed in the way they reach people who cannot come to the building. Mobile libraries — buses filled with books — have taken books to villages and to small towns for many years. Now, libraries also lend e-books, which readers can download to a phone or a tablet without leaving home. Some libraries send books by post to people who are old or ill, and others have opened small libraries in schools, in hospitals, and even in railway stations, so that books are available where people already are.',
          },
          {
            id: 'F',
            labelled: true,
            text: 'Not everyone is pleased with these changes. Some people miss the quiet library of the past, and they say that a library full of talking, music, and children playing is no longer a library at all. Others worry that libraries are spending too much money on computers, cafés, and classes, and too little on books. They point out that the number of new books bought by libraries has fallen in many countries, and they argue that a library should first of all be a collection of books, and that everything else is less important.',
          },
          {
            id: 'G',
            labelled: true,
            text: 'The future of libraries will depend on finding a balance between the old and the new. Libraries will need to keep buying books, because many people still prefer to read on paper, and because a library without books would lose what makes it special. At the same time, libraries will need to keep changing, because the needs of the people who use them are changing too. If they can do both, libraries may remain at the centre of their communities for many years to come — not as quiet stores of books, but as lively places where people learn, meet, and share.',
          },
        ],
      },
      groups: [
        {
          id: 'm6r-g4',
          type: 'matching-headings',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings below.',
          optionsTitle: 'List of Headings',
          options: [
            { id: 'i', text: 'More than books: what libraries lend today' },
            { id: 'ii', text: 'A noisier building for the whole community' },
            { id: 'iii', text: 'New kinds of help from librarians' },
            { id: 'iv', text: 'Reaching readers outside the library' },
            { id: 'v', text: 'Criticism of the modern library' },
            { id: 'vi', text: 'Why libraries first opened' },
            { id: 'vii', text: 'How libraries choose which books to buy' },
            { id: 'viii', text: 'The cost of building new libraries' },
          ],
          questions: [
            {
              id: 'm6r-q14',
              number: 14,
              prompt: 'Paragraph B',
              answer: { accepted: ['i'] },
              explanation: { text: 'The paragraph describes what libraries lend today: films, music, tools, toys and laptops, as well as books.', evidence: { paragraphId: 'B', quote: 'they now lend much more than books' } },
            },
            {
              id: 'm6r-q15',
              number: 15,
              prompt: 'Paragraph C',
              answer: { accepted: ['ii'] },
              explanation: { text: 'The paragraph describes the modern library as a noisy meeting place for the whole community.', evidence: { paragraphId: 'C', quote: 'The library has become a meeting place for the whole community' } },
            },
            {
              id: 'm6r-q16',
              number: 16,
              prompt: 'Paragraph D',
              answer: { accepted: ['iii'] },
              explanation: { text: 'The paragraph describes the new help librarians offer, such as classes and help with CVs and forms.', evidence: { paragraphId: 'D', quote: 'they help people find information, learn new skills, and use computers' } },
            },
            {
              id: 'm6r-q17',
              number: 17,
              prompt: 'Paragraph E',
              answer: { accepted: ['iv'] },
              explanation: { text: 'The paragraph describes how libraries reach people who cannot come to the building, through mobile libraries and e-books.', evidence: { paragraphId: 'E', quote: 'Libraries have also changed in the way they reach people who cannot come to the building' } },
            },
            {
              id: 'm6r-q18',
              number: 18,
              prompt: 'Paragraph F',
              answer: { accepted: ['v'] },
              explanation: { text: 'The paragraph gives the views of people who are not pleased with the changes to libraries.', evidence: { paragraphId: 'F', quote: 'Not everyone is pleased with these changes' } },
            },
          ],
        },
        {
          id: 'm6r-g5',
          type: 'table-completion',
          instructions: 'Complete the table below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          table: {
            headers: ['Change', 'Detail'],
            rows: [
              ['Lending', 'Libraries now lend films, music, tools, toys and even musical {{19}}'],
              ['Building', 'Many libraries now have rooms where students can study in {{20}}'],
              ['Help', 'Some libraries offer help with writing a {{21}}'],
              ['Reaching readers', 'Some libraries send books by {{22}} to people who are old or ill'],
            ],
          },
          questions: [
            { id: 'm6r-q19', number: 19, answer: { accepted: ['instruments'] }, explanation: { text: 'Libraries lend tools, toys, and even musical instruments.', evidence: { paragraphId: 'B', quote: 'and even musical instruments' } } },
            { id: 'm6r-q20', number: 20, answer: { accepted: ['groups'] }, explanation: { text: 'Many libraries have rooms where students can study in groups.', evidence: { paragraphId: 'C', quote: 'rooms where students can study in groups' } } },
            { id: 'm6r-q21', number: 21, answer: { accepted: ['CV'] }, explanation: { text: 'Some libraries offer help with writing a CV.', evidence: { paragraphId: 'D', quote: 'help with writing a CV' } } },
            { id: 'm6r-q22', number: 22, answer: { accepted: ['post'] }, explanation: { text: 'Some libraries send books by post to people who are old or ill.', evidence: { paragraphId: 'E', quote: 'send books by post to people who are old or ill' } } },
          ],
        },
        {
          id: 'm6r-g6',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO things can visitors borrow from a modern library, according to paragraph B?',
          choose: 2,
          options: [
            { id: 'A', text: 'Laptops and tablets' },
            { id: 'B', text: 'Cars' },
            { id: 'C', text: 'Musical instruments' },
            { id: 'D', text: 'Clothes' },
            { id: 'E', text: 'Houses' },
          ],
          questions: [
            { id: 'm6r-q23', number: 23, answer: { accepted: ['A'] }, explanation: { text: 'Many libraries lend laptops and tablets to people who do not have a computer at home.', evidence: { paragraphId: 'B', quote: 'Some libraries lend laptops and tablets' } } },
            { id: 'm6r-q24', number: 24, answer: { accepted: ['C'] }, explanation: { text: 'Many libraries lend musical instruments.', evidence: { paragraphId: 'B', quote: 'and even musical instruments' } } },
          ],
        },
        {
          id: 'm6r-g7',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO criticisms of the modern library are mentioned in paragraph F?',
          choose: 2,
          options: [
            { id: 'A', text: 'Libraries spend too much money on computers, cafés and classes, and too little on books.' },
            { id: 'B', text: 'Libraries have become too noisy.' },
            { id: 'C', text: 'Libraries are closed on Sundays.' },
            { id: 'D', text: 'Libraries charge too much for membership.' },
            { id: 'E', text: 'Libraries no longer lend books at all.' },
          ],
          questions: [
            { id: 'm6r-q25', number: 25, answer: { accepted: ['A'] }, explanation: { text: 'Critics say libraries spend too much on computers, cafés and classes, and too little on books.', evidence: { paragraphId: 'F', quote: 'libraries are spending too much money on computers, cafés, and classes, and too little on books' } } },
            { id: 'm6r-q26', number: 26, answer: { accepted: ['B'] }, explanation: { text: 'Some people miss the quiet library and dislike a library full of talking, music and children playing.', evidence: { paragraphId: 'F', quote: 'Some people miss the quiet library of the past' } } },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 3
    {
      id: 'r3',
      number: 3,
      passage: {
        title: 'Remote Working: The New Normal?',
        paragraphs: [
          {
            id: '1',
            text: 'For most of the twentieth century, work meant going to an office. Every morning, millions of people travelled to a building in a town or city, sat at a desk, and travelled home again in the evening. Today, that pattern has changed for a large number of workers. Many people now work from home, at least for part of the week, using a computer and the internet to do jobs that were once done only in an office. Some people say that remote working is the future, and that the office will soon disappear. Others say that it is a passing fashion, and that most people will soon return to the office. The truth, as this essay will argue, is more complicated: remote working brings real benefits, but it also creates new problems, and the best answer for most people is probably a mixture of the two.',
          },
          {
            id: '2',
            text: 'The clearest benefit of working from home is time. A worker who does not travel to an office can save an hour or more every day, and that time can be spent with family, on exercise, or on sleep. Remote workers also save money: they spend less on travel, on food bought near the office, and on clothes for work. For employers, there are savings too. A company that allows its workers to work from home may need less office space, and it can employ people who live far away, in places where it would be difficult to find workers locally. In this way, remote working can open up jobs to people in small towns and in the countryside.',
          },
          {
            id: '3',
            text: 'Research offers some support for the view that remote workers are more productive. Several studies have found that people who work from home complete more tasks in a day than people who work in an office, partly because they are interrupted less often by other people, and partly because they can choose the hours when they work best. The benefit seems to be greatest when people work from home for two or three days a week, rather than every day. People who work from home all the time, by contrast, often report feeling lonely, and their work can suffer as a result.',
          },
          {
            id: '4',
            text: 'That feeling of loneliness is one of the main problems of remote working. In an office, workers talk to each other during the day, share ideas, and learn from each other without planning to do so. At home, a worker may speak to no one all day, and new workers, in particular, may find it hard to learn how a company works when they never meet their colleagues in person. Some companies have tried to solve this problem by asking workers to come to the office on the same days each week, so that teams can meet face to face at least once a week.',
          },
          {
            id: '5',
            text: 'There is, however, a serious problem with fairness. Not every job can be done from home. Nurses, bus drivers, shop workers and builders must be present where they work, and they cannot choose to work from home, however much they might like to. If office workers are allowed to work from home while other workers are not, the difference between the two groups can grow larger, and those who must travel to work every day may feel that the system is unfair. Remote working, in this view, does not make work fairer; it makes the differences between workers larger.',
          },
          {
            id: '6',
            text: 'Another difficulty is that the line between work and home can disappear. A worker in an office leaves work behind when they go home in the evening, but a worker at home may find it hard to stop working, because the computer is always there, on the kitchen table or in the corner of the bedroom. Some remote workers report that they work longer hours than they did in the office, and that they find it difficult to relax in the evening. Employers, too, can find it hard to know whether their workers are working well, when they cannot see them, and some have begun to use software to watch what their workers do on their computers — a practice that many workers find unpleasant.',
          },
          {
            id: '7',
            text: 'In my view, the answer is not to end remote working, nor to make everyone work from home all the time. The best arrangement for most office workers is a mixture: two or three days at home, and two or three days in the office. On days at home, workers can do work that needs quiet and concentration, without the journey to the office. On days in the office, they can meet their colleagues, share ideas, and learn from each other. Employers should also give workers a clear right to stop work at the end of the day, so that home remains a place to rest, not just a second office.',
          },
          {
            id: '8',
            text: 'The real question, then, is not whether remote working is good or bad, but how it is organised, and who it is organised for. A system that gives workers some choice, that brings people together in the office at least once a week, and that protects the time when people are not working, can bring the best of both worlds. If companies keep only that kind of remote working, and drop the rest, workers will be happier, and work will be better done. Remote working badly organised would waste the chance that new technology has given us; not using it at all would throw away time, money and freedom that workers will not want to give up.',
          },
        ],
      },
      groups: [
        {
          id: 'm6r-g8',
          type: 'yes-no-not-given',
          instructions:
            'Do the following statements agree with the claims of the writer in Reading Passage 3? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
          questions: [
            {
              id: 'm6r-q27',
              number: 27,
              prompt: 'Remote workers can save an hour or more every day by not travelling to an office.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'A worker who does not travel to an office can save an hour or more every day.', evidence: { paragraphId: '2', quote: 'can save an hour or more every day' } },
            },
            {
              id: 'm6r-q28',
              number: 28,
              prompt: 'Research shows that people who work from home every day are the most productive of all workers.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'The benefit is greatest when people work from home for two or three days a week; those who work from home all the time often feel lonely and their work can suffer.', evidence: { paragraphId: '3', quote: 'The benefit seems to be greatest when people work from home for two or three days a week' } },
            },
            {
              id: 'm6r-q29',
              number: 29,
              prompt: 'The writer believes that all office workers should work from home all the time.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'The writer says the answer is not to make everyone work from home all the time.', evidence: { paragraphId: '7', quote: 'the answer is not to end remote working, nor to make everyone work from home all the time' } },
            },
            {
              id: 'm6r-q30',
              number: 30,
              prompt: 'Remote working began in the 1990s.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: {
                text: 'The passage says nothing about when remote working began.',
                evidence: { paragraphId: '1', quote: 'For most of the twentieth century, work meant going to an office' },
                distractors: { YES: 'No date for the start of remote working is given anywhere in the passage.' },
              },
            },
            {
              id: 'm6r-q31',
              number: 31,
              prompt: 'The writer thinks that using software to watch remote workers is a good idea.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'The writer describes watching software as a practice that many workers find unpleasant.', evidence: { paragraphId: '6', quote: 'a practice that many workers find unpleasant' } },
            },
          ],
        },
        {
          id: 'm6r-g9',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm6r-q32',
              number: 32,
              prompt: 'What does the research described in paragraph 3 suggest?',
              options: [
                { id: 'A', text: 'People who work from home complete more tasks in a day than people who work in an office.' },
                { id: 'B', text: 'People who work from home every day are the happiest workers.' },
                { id: 'C', text: 'Working from home makes no difference to how much work people do.' },
                { id: 'D', text: 'People who work in an office are interrupted less often.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'People who work from home complete more tasks in a day than people who work in an office.',
                evidence: { paragraphId: '3', quote: 'people who work from home complete more tasks in a day than people who work in an office' },
                distractors: { B: 'People who work from home all the time often report feeling lonely.' },
              },
            },
            {
              id: 'm6r-q33',
              number: 33,
              prompt: 'Why does the writer mention nurses, bus drivers and shop workers in paragraph 5?',
              options: [
                { id: 'A', text: 'To show that not every job can be done from home, which raises a problem of fairness.' },
                { id: 'B', text: 'To show that these jobs are better paid than office jobs.' },
                { id: 'C', text: 'To argue that these workers should also work from home.' },
                { id: 'D', text: 'To prove that office workers do less work than other workers.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Nurses, bus drivers and shop workers must be present where they work and cannot choose to work from home.',
                evidence: { paragraphId: '5', quote: 'Not every job can be done from home' },
              },
            },
            {
              id: 'm6r-q34',
              number: 34,
              prompt: 'According to the writer, what should employers do in paragraph 7?',
              options: [
                { id: 'A', text: 'Give workers a clear right to stop work at the end of the day.' },
                { id: 'B', text: 'Make all workers come to the office every day.' },
                { id: 'C', text: 'Use software to watch what workers do on their computers.' },
                { id: 'D', text: 'Close their offices completely.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Employers should give workers a clear right to stop work at the end of the day.',
                evidence: { paragraphId: '7', quote: 'Employers should also give workers a clear right to stop work at the end of the day' },
              },
            },
            {
              id: 'm6r-q35',
              number: 35,
              prompt: 'Which of the following best summarises the writer’s view?',
              options: [
                { id: 'A', text: 'A mixture of working from home and working in the office is best for most office workers.' },
                { id: 'B', text: 'Remote working should be ended completely.' },
                { id: 'C', text: 'Everyone should work from home all the time.' },
                { id: 'D', text: 'Remote working makes no difference to workers or employers.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The best arrangement for most office workers is a mixture: two or three days at home, and two or three days in the office.',
                evidence: { paragraphId: '7', quote: 'The best arrangement for most office workers is a mixture' },
                distractors: { B: 'The writer says the answer is not to end remote working.' },
              },
            },
          ],
        },
        {
          id: 'm6r-g10',
          type: 'matching-sentence-endings',
          instructions: 'Complete each sentence with the correct ending, A–H.',
          optionsTitle: 'List of Endings',
          options: [
            { id: 'A', text: 'save time and money by not travelling to an office.' },
            { id: 'B', text: 'spend more time with their colleagues in the office.' },
            { id: 'C', text: 'the feeling of loneliness.' },
            { id: 'D', text: 'a mixture of days at home and days in the office.' },
            { id: 'E', text: 'how it is organised, and who it is organised for.' },
            { id: 'F', text: 'people in small towns and in the countryside.' },
            { id: 'G', text: 'the line between work and home can disappear.' },
            { id: 'H', text: 'every worker in the country at the same time.' },
          ],
          questions: [
            { id: 'm6r-q36', number: 36, prompt: 'Working from home can help workers to', answer: { accepted: ['A'] }, explanation: { text: 'Remote workers save time and money by not travelling to an office.', evidence: { paragraphId: '2', quote: 'they spend less on travel' } } },
            { id: 'm6r-q37', number: 37, prompt: 'One of the main problems of remote working is', answer: { accepted: ['C'] }, explanation: { text: 'The feeling of loneliness is one of the main problems of remote working.', evidence: { paragraphId: '4', quote: 'That feeling of loneliness is one of the main problems of remote working' } } },
            { id: 'm6r-q38', number: 38, prompt: 'When people work from home, one difficulty is that', answer: { accepted: ['G'] }, explanation: { text: 'The line between work and home can disappear when people work from home.', evidence: { paragraphId: '6', quote: 'the line between work and home can disappear' } } },
            { id: 'm6r-q39', number: 39, prompt: 'According to the writer, the real question about remote working is not whether it is good or bad, but', answer: { accepted: ['E'] }, explanation: { text: 'The real question is how remote working is organised, and who it is organised for.', evidence: { paragraphId: '8', quote: 'The real question, then, is not whether remote working is good or bad, but how it is organised, and who it is organised for' } } },
            { id: 'm6r-q40', number: 40, prompt: 'Remote working can open up jobs to', answer: { accepted: ['F'] }, explanation: { text: 'Remote working can open up jobs to people in small towns and in the countryside.', evidence: { paragraphId: '2', quote: 'remote working can open up jobs to people in small towns and in the countryside' } } },
          ],
        },
      ],
    },
  ],
};
