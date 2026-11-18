import type { ObjectiveSection } from '../../model';

/**
 * Mino Academic Mock Test 10 — Reading. Three original passages written
 * for Mino at IELTS Academic level (40 questions, 60 minutes).
 * Not Cambridge material. All passages, questions and answers are
 * original and were written fresh for this mock test.
 */
export const mock10Reading: ObjectiveSection = {
  skill: 'reading',
  timeLimitMinutes: 60,
  parts: [
    // ------------------------------------------------------------- Passage 1
    {
      id: 'r1',
      number: 1,
      passage: {
        title: 'The Invention of Printing',
        paragraphs: [
          {
            id: '1',
            text: 'For most of human history, books were copied by hand, one at a time, and they were slow to make and very expensive to buy. A single book might take a year to copy, and only rich people, churches and universities could afford to own many books. Then, in the middle of the fifteenth century, a German craftsman called Johannes Gutenberg changed everything. Gutenberg built a printing press with movable type: small pieces of metal, each with a single letter on it, that could be put together to make a page, used to print many copies, and then taken apart and used again.',
          },
          {
            id: '2',
            text: 'Gutenberg was not the first person to print. In China, printers had been using wooden blocks to print books for hundreds of years, and in Korea printers had made movable metal type even earlier. But Gutenberg\'s press was different in two important ways. First, his metal letters were strong and could be used again and again to print thousands of copies. Second, his press worked quickly: a team of workers could print hundreds of pages in a single day, far more than any person could copy by hand.',
          },
          {
            id: '3',
            text: 'The first great book printed by Gutenberg was the Bible, printed in Mainz in about 1455. About one hundred and eighty copies were made, and each one was a work of art, with beautiful letters and pictures added by hand. Today, about fifty copies of the Gutenberg Bible still exist, and they are kept in libraries and museums around the world. A single copy is worth many millions of pounds, not only because it is old, but because it marks the beginning of printed books in Europe.',
          },
          {
            id: '4',
            text: 'Within fifty years of Gutenberg\'s press, printing had spread across Europe. By 1500, there were printing shops in more than two hundred towns and cities, and about twenty million books had been printed. Books became much cheaper, and ordinary people, such as shopkeepers and farmers, could buy them for the first time. Students no longer had to copy books by hand, and they could buy their own copies of the books they needed for their studies.',
          },
          {
            id: '5',
            text: 'Printing changed more than the price of books: it changed what people could know. Before printing, most people learned only what they were told by their teachers or by their priests. After printing, people could read books for themselves, and they could compare one book with another. New ideas spread quickly from town to town and from country to country. Scientists could share their discoveries with other scientists, and people could read about new ideas in medicine, in law and in religion.',
          },
          {
            id: '6',
            text: 'Some people at the time were afraid of printing. They worried that books would spread wrong ideas, and that people would stop believing what they were told by the church. Others said that cheap books would make people lazy, because they would no longer need to remember things. But printing could not be stopped. Within a hundred years, it had changed Europe for ever, and it is hard to imagine the modern world, with its schools, newspapers and libraries, without the printing press.',
          },
        ],
      },
      groups: [
        {
          id: 'm10r-g1',
          type: 'sentence-completion',
          instructions: 'Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          questions: [
            {
              id: 'm10r-q1',
              number: 1,
              prompt: 'Before printing, a single book might take a ___ to copy.',
              answer: { accepted: ['year'] },
              explanation: { text: 'A single book might take a year to copy.', evidence: { paragraphId: '1', quote: 'A single book might take a year to copy' } },
            },
            {
              id: 'm10r-q2',
              number: 2,
              prompt: 'Gutenberg built a printing press with movable ___.',
              answer: { accepted: ['type'] },
              explanation: { text: 'Gutenberg built a printing press with movable type.', evidence: { paragraphId: '1', quote: 'a printing press with movable type' } },
            },
            {
              id: 'm10r-q3',
              number: 3,
              prompt: 'In China, printers had been using wooden ___ to print books.',
              answer: { accepted: ['blocks'] },
              explanation: { text: 'In China, printers had been using wooden blocks to print books for hundreds of years.', evidence: { paragraphId: '2', quote: 'using wooden blocks to print books' } },
            },
            {
              id: 'm10r-q4',
              number: 4,
              prompt: 'The first great book printed by Gutenberg was the ___.',
              answer: { accepted: ['Bible'] },
              explanation: { text: 'The first great book printed by Gutenberg was the Bible.', evidence: { paragraphId: '3', quote: 'The first great book printed by Gutenberg was the Bible' } },
            },
            {
              id: 'm10r-q5',
              number: 5,
              prompt: 'By 1500, about twenty ___ books had been printed in Europe.',
              answer: { accepted: ['million'] },
              explanation: { text: 'By 1500, about twenty million books had been printed.', evidence: { paragraphId: '4', quote: 'about twenty million books had been printed' } },
            },
          ],
        },
        {
          id: 'm10r-g2',
          type: 'true-false-not-given',
          instructions:
            'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
          questions: [
            {
              id: 'm10r-q6',
              number: 6,
              prompt: 'Gutenberg was the first person in the world to print books.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'Gutenberg was not the first person to print: printers in China had used wooden blocks for hundreds of years.', evidence: { paragraphId: '2', quote: 'Gutenberg was not the first person to print' } },
            },
            {
              id: 'm10r-q7',
              number: 7,
              prompt: 'Gutenberg\'s metal letters could be used again and again.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'His metal letters were strong and could be used again and again to print thousands of copies.', evidence: { paragraphId: '2', quote: 'could be used again and again to print thousands of copies' } },
            },
            {
              id: 'm10r-q8',
              number: 8,
              prompt: 'All of the copies of the Gutenberg Bible still exist today.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'About one hundred and eighty copies were made, and about fifty still exist today.', evidence: { paragraphId: '3', quote: 'About one hundred and eighty copies were made' } },
            },
            {
              id: 'm10r-q9',
              number: 9,
              prompt: 'Printing made books cheaper for ordinary people.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'Books became much cheaper, and ordinary people could buy them for the first time.', evidence: { paragraphId: '4', quote: 'Books became much cheaper' } },
            },
            {
              id: 'm10r-q10',
              number: 10,
              prompt: 'Gutenberg himself became a very rich man from his printing press.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: { text: 'The passage does not say whether Gutenberg became rich.', evidence: { paragraphId: '3', quote: 'The first great book printed by Gutenberg was the Bible' } },
            },
          ],
        },
        {
          id: 'm10r-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm10r-q11',
              number: 11,
              prompt: 'Why were books so expensive before printing?',
              options: [
                { id: 'A', text: 'They were copied by hand, one at a time, and they were slow to make.' },
                { id: 'B', text: 'They were made from gold and silver.' },
                { id: 'C', text: 'They were brought from China by ship.' },
                { id: 'D', text: 'They were only sold in churches.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Books were copied by hand, one at a time, and they were slow to make and very expensive to buy.',
                evidence: { paragraphId: '1', quote: 'books were copied by hand, one at a time, and they were slow to make' },
              },
            },
            {
              id: 'm10r-q12',
              number: 12,
              prompt: 'What does the writer say about the Gutenberg Bible today?',
              options: [
                { id: 'A', text: 'About fifty copies still exist, and they are kept in libraries and museums.' },
                { id: 'B', text: 'There is only one copy left in the world.' },
                { id: 'C', text: 'All the copies are kept in one library in Germany.' },
                { id: 'D', text: 'The copies are no longer worth any money.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'About fifty copies of the Gutenberg Bible still exist, and they are kept in libraries and museums around the world.',
                evidence: { paragraphId: '3', quote: 'about fifty copies of the Gutenberg Bible still exist' },
              },
            },
            {
              id: 'm10r-q13',
              number: 13,
              prompt: 'How did printing change what people could know?',
              options: [
                { id: 'A', text: 'People could read books for themselves and compare one book with another.' },
                { id: 'B', text: 'People no longer needed to go to school.' },
                { id: 'C', text: 'People stopped believing everything they read.' },
                { id: 'D', text: 'People could only read books written in German.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'After printing, people could read books for themselves, and they could compare one book with another.',
                evidence: { paragraphId: '5', quote: 'people could read books for themselves, and they could compare one book with another' },
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
        title: 'Protecting Endangered Languages',
        paragraphs: [
          {
            id: 'A',
            labelled: true,
            text: 'There are about seven thousand languages spoken in the world today, but many of them are in danger. A language is called endangered when children stop learning it, and only older people still speak it. Experts say that about half of the languages in the world may disappear in the next hundred years, and that every two weeks, on average, the last speaker of a language dies. When a language dies, we lose more than words: we lose stories, songs, knowledge about plants and animals, and a whole way of seeing the world.',
          },
          {
            id: 'B',
            labelled: true,
            text: 'Languages become endangered for many reasons. In the past, some governments tried to stop people from speaking their own language, and children were punished at school if they used it. In other places, people stopped speaking their language because they believed that a bigger language, such as English or Spanish, would help them to find work and to give their children a better life. When parents stop speaking a language to their children, the language can disappear in a single generation.',
          },
          {
            id: 'C',
            labelled: true,
            text: 'One of the most famous examples of a language that was saved is Welsh, the language of Wales. A hundred years ago, few children spoke Welsh, and many people thought it would soon disappear. But Welsh people worked hard to save it: they opened Welsh-language schools, they started Welsh radio and television, and the government passed laws to protect the language. Today, more than half a million people speak Welsh, and it is taught in every school in Wales.',
          },
          {
            id: 'D',
            labelled: true,
            text: 'Another example is Hawaiian, the language of Hawaii. By the nineteen eighties, only a few hundred people, mostly old people, could speak Hawaiian, and it was not taught in schools. Then families and teachers started Hawaiian-language schools for young children, where lessons were taught only in Hawaiian. These schools, called Punana Leo, which means language nest, were so successful that Hawaiian is now spoken by thousands of people, and it is an official language of Hawaii.',
          },
          {
            id: 'E',
            labelled: true,
            text: 'Today, people are using new technology to save languages. Linguists travel to faraway villages with recorders and cameras, and they record old people telling stories and singing songs in their language. These recordings are put into digital archives, where they can be kept for ever and studied by anyone in the world. Mobile phone apps and online lessons also help young people to learn a language that their grandparents spoke, even if they live far away from the place where the language is spoken.',
          },
          {
            id: 'F',
            labelled: true,
            text: 'But recording a language is not the same as saving it. A language can only stay alive if people speak it every day: at home, at school and at work. This is why many experts say that the most important work is done by families and by local communities. When parents speak a language to their children, and when children can use it with their friends, the language has a future. When they do not, no number of recordings can bring it back to life.',
          },
          {
            id: 'G',
            labelled: true,
            text: 'Saving endangered languages matters for everyone, not only for the people who speak them. Every language holds knowledge that cannot be found in any other language: the names of plants that can be used as medicine, the stories of how people lived in a place for thousands of years, and ways of thinking about the world that are different from our own. If we let these languages disappear, we will all be poorer, and we will never know what we have lost.',
          },
        ],
      },
      groups: [
        {
          id: 'm10r-g4',
          type: 'matching-headings',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings below.',
          optionsTitle: 'List of Headings',
          options: [
            { id: 'i', text: 'Why languages become endangered' },
            { id: 'ii', text: 'A language saved in Wales' },
            { id: 'iii', text: 'A language saved in Hawaii' },
            { id: 'iv', text: 'New technology and saving languages' },
            { id: 'v', text: 'Why recording alone is not enough' },
            { id: 'vi', text: 'The number of languages in the world' },
            { id: 'vii', text: 'The history of the English language' },
            { id: 'viii', text: 'Languages in schools in Europe' },
          ],
          questions: [
            {
              id: 'm10r-q14',
              number: 14,
              prompt: 'Paragraph B',
              answer: { accepted: ['i'] },
              explanation: { text: 'The paragraph describes why languages become endangered.', evidence: { paragraphId: 'B', quote: 'Languages become endangered for many reasons' } },
            },
            {
              id: 'm10r-q15',
              number: 15,
              prompt: 'Paragraph C',
              answer: { accepted: ['ii'] },
              explanation: { text: 'The paragraph describes how Welsh was saved.', evidence: { paragraphId: 'C', quote: 'One of the most famous examples of a language that was saved is Welsh' } },
            },
            {
              id: 'm10r-q16',
              number: 16,
              prompt: 'Paragraph D',
              answer: { accepted: ['iii'] },
              explanation: { text: 'The paragraph describes how Hawaiian was saved.', evidence: { paragraphId: 'D', quote: 'Another example is Hawaiian, the language of Hawaii' } },
            },
            {
              id: 'm10r-q17',
              number: 17,
              prompt: 'Paragraph E',
              answer: { accepted: ['iv'] },
              explanation: { text: 'The paragraph describes how new technology is used to save languages.', evidence: { paragraphId: 'E', quote: 'Today, people are using new technology to save languages' } },
            },
            {
              id: 'm10r-q18',
              number: 18,
              prompt: 'Paragraph F',
              answer: { accepted: ['v'] },
              explanation: { text: 'The paragraph says that recording a language is not the same as saving it.', evidence: { paragraphId: 'F', quote: 'But recording a language is not the same as saving it' } },
            },
          ],
        },
        {
          id: 'm10r-g5',
          type: 'table-completion',
          instructions: 'Complete the table below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          table: {
            headers: ['Language', 'Detail'],
            rows: [
              ['Welsh', 'Today, more than half a {{19}} people speak Welsh'],
              ['Hawaiian', 'The schools are called Punana Leo, which means language {{20}}'],
              ['Endangered languages', 'About {{21}} of the languages in the world may disappear in the next hundred years'],
              ['Recordings', 'Recordings are put into digital {{22}}'],
            ],
          },
          questions: [
            { id: 'm10r-q19', number: 19, answer: { accepted: ['million'] }, explanation: { text: 'Today, more than half a million people speak Welsh.', evidence: { paragraphId: 'C', quote: 'more than half a million people speak Welsh' } } },
            { id: 'm10r-q20', number: 20, answer: { accepted: ['nest'] }, explanation: { text: 'These schools, called Punana Leo, which means language nest, were so successful.', evidence: { paragraphId: 'D', quote: 'which means language nest' } } },
            { id: 'm10r-q21', number: 21, answer: { accepted: ['half'] }, explanation: { text: 'About half of the languages in the world may disappear in the next hundred years.', evidence: { paragraphId: 'A', quote: 'about half of the languages in the world may disappear' } } },
            { id: 'm10r-q22', number: 22, answer: { accepted: ['archives'] }, explanation: { text: 'These recordings are put into digital archives.', evidence: { paragraphId: 'E', quote: 'put into digital archives' } } },
          ],
        },
        {
          id: 'm10r-g6',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO reasons for languages becoming endangered are mentioned in paragraph B?',
          choose: 2,
          options: [
            { id: 'A', text: 'Children were punished at school for using their own language.' },
            { id: 'B', text: 'Parents believed a bigger language would help them to find work.' },
            { id: 'C', text: 'There were too few books in the language.' },
            { id: 'D', text: 'The language had no written form.' },
            { id: 'E', text: 'People moved to another country.' },
          ],
          questions: [
            { id: 'm10r-q23', number: 23, answer: { accepted: ['A'] }, explanation: { text: 'Children were punished at school if they used their own language.', evidence: { paragraphId: 'B', quote: 'children were punished at school if they used it' } } },
            { id: 'm10r-q24', number: 24, answer: { accepted: ['B'] }, explanation: { text: 'People stopped speaking their language because they believed a bigger language would help them to find work.', evidence: { paragraphId: 'B', quote: 'would help them to find work' } } },
          ],
        },
        {
          id: 'm10r-g7',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO things helped to save the Welsh language, according to paragraph C?',
          choose: 2,
          options: [
            { id: 'A', text: 'Welsh-language schools were opened.' },
            { id: 'B', text: 'Welsh radio and television were started.' },
            { id: 'C', text: 'Welsh became the only language of Wales.' },
            { id: 'D', text: 'English was banned in Wales.' },
            { id: 'E', text: 'All Welsh people moved to the countryside.' },
          ],
          questions: [
            { id: 'm10r-q25', number: 25, answer: { accepted: ['A'] }, explanation: { text: 'Welsh people opened Welsh-language schools.', evidence: { paragraphId: 'C', quote: 'they opened Welsh-language schools' } } },
            { id: 'm10r-q26', number: 26, answer: { accepted: ['B'] }, explanation: { text: 'Welsh people started Welsh radio and television.', evidence: { paragraphId: 'C', quote: 'they started Welsh radio and television' } } },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 3
    {
      id: 'r3',
      number: 3,
      passage: {
        title: 'The Gig Economy',
        paragraphs: [
          {
            id: '1',
            text: 'In the past, most people had one job, with one employer, for many years. They worked the same hours every week, and they were paid the same amount every month. Today, that way of working is changing. Millions of people now work in the gig economy: they do short jobs, or gigs, for different companies, often using an app on their phone. A driver may take passengers for a ride-hailing company in the morning, deliver food in the afternoon, and do nothing at all the next day. The work is flexible, but it is also uncertain.',
          },
          {
            id: '2',
            text: 'The gig economy has grown quickly because of technology. Apps can match a worker with a customer in seconds, and they can take payment without cash. For companies, gig workers are cheaper than full-time workers, because the company does not have to pay for holidays, sick pay or pensions. For workers, the work can fit around their other duties: a student can work in the evenings, and a parent can work while the children are at school. In many cities, gig work is now one of the easiest ways to earn money quickly.',
          },
          {
            id: '3',
            text: 'Supporters of gig work say that it gives people freedom. Workers can choose when to work, which jobs to take, and how much to earn. A driver who needs more money can work longer hours, and a worker who wants a day off can simply stay at home. Supporters also say that gig work helps people who cannot find a normal job, for example students, new arrivals in a country, or people who live far from towns. For these people, gig work is better than no work at all.',
          },
          {
            id: '4',
            text: 'Critics of gig work say that the freedom is not real. Workers may be free to choose when to work, they say, but they are not free to choose how much they are paid: the app sets the price, and the worker must accept it or get no work. Workers also have to pay for their own car, bicycle or phone, and for their own fuel. If they are ill, they get no sick pay, and if there is no work, they get no money. Some workers say that they work longer hours than they did in a normal job, but they earn less money.',
          },
          {
            id: '5',
            text: 'Another problem is that gig workers have few rights. In most countries, a full-time worker has the right to a minimum wage, to paid holidays and to protection if they lose their job. A gig worker is usually called an independent worker, not an employee, so the company does not have to give them these rights. In recent years, courts in several countries have decided that some gig workers should be treated as employees, and companies have been told to give them the same rights as other workers. But in many places, the law has not yet caught up with the new way of working.',
          },
          {
            id: '6',
            text: 'Governments are now trying to find a fair way to deal with gig work. Some countries have made new laws that give gig workers a minimum wage and sick pay, while still letting them choose their own hours. Other countries have asked companies to pay into a fund for gig workers, so that workers can get help when they are ill or when they have no work. Companies say that these changes will make gig work more expensive, and that customers will have to pay more. Workers say that the changes do not go far enough, and that they still have too few rights.',
          },
          {
            id: '7',
            text: 'In my view, the gig economy is here to stay, and it will keep growing as more people use apps to buy food, to travel and to find help at home. But it needs fair rules. Workers should be paid enough to live on, and they should have basic rights, such as sick pay and holidays, even if they work in a flexible way. If governments, companies and workers can agree on fair rules, the gig economy could give people both freedom and security. If they cannot, it may become a world of work in which only the companies win.',
          },
        ],
      },
      groups: [
        {
          id: 'm10r-g8',
          type: 'yes-no-not-given',
          instructions:
            'Do the following statements agree with the claims of the writer in Reading Passage 3? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
          questions: [
            {
              id: 'm10r-q27',
              number: 27,
              prompt: 'Gig workers usually work for one employer for many years.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'Gig workers do short jobs for different companies, not one job for one employer for many years.', evidence: { paragraphId: '1', quote: 'they do short jobs, or gigs, for different companies' } },
            },
            {
              id: 'm10r-q28',
              number: 28,
              prompt: 'Apps can match a worker with a customer in seconds.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Apps can match a worker with a customer in seconds.', evidence: { paragraphId: '2', quote: 'Apps can match a worker with a customer in seconds' } },
            },
            {
              id: 'm10r-q29',
              number: 29,
              prompt: 'Most gig workers earn more money than full-time workers.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'Some workers say they work longer hours than they did in a normal job, but they earn less money.', evidence: { paragraphId: '4', quote: 'they earn less money' } },
            },
            {
              id: 'm10r-q30',
              number: 30,
              prompt: 'In every country, gig workers now have the same rights as other workers.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'In many places, the law has not yet caught up with the new way of working.', evidence: { paragraphId: '5', quote: 'in many places, the law has not yet caught up' } },
            },
            {
              id: 'm10r-q31',
              number: 31,
              prompt: 'The writer believes the gig economy will keep growing.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'The writer says the gig economy is here to stay, and it will keep growing.', evidence: { paragraphId: '7', quote: 'it will keep growing as more people use apps' } },
            },
          ],
        },
        {
          id: 'm10r-g9',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm10r-q32',
              number: 32,
              prompt: 'Why do companies prefer gig workers to full-time workers, according to paragraph 2?',
              options: [
                { id: 'A', text: 'Gig workers are cheaper, because the company does not have to pay for holidays, sick pay or pensions.' },
                { id: 'B', text: 'Gig workers work harder than full-time workers.' },
                { id: 'C', text: 'Gig workers do not need to use an app.' },
                { id: 'D', text: 'Gig workers never ask for more money.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'For companies, gig workers are cheaper than full-time workers, because the company does not have to pay for holidays, sick pay or pensions.',
                evidence: { paragraphId: '2', quote: 'the company does not have to pay for holidays, sick pay or pensions' },
              },
            },
            {
              id: 'm10r-q33',
              number: 33,
              prompt: 'What do supporters of gig work say about freedom?',
              options: [
                { id: 'A', text: 'Workers can choose when to work, which jobs to take, and how much to earn.' },
                { id: 'B', text: 'Workers can choose how much they are paid for every job.' },
                { id: 'C', text: 'Workers never have to work at night.' },
                { id: 'D', text: 'Workers can work without a phone.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Workers can choose when to work, which jobs to take, and how much to earn.',
                evidence: { paragraphId: '3', quote: 'Workers can choose when to work, which jobs to take, and how much to earn' },
              },
            },
            {
              id: 'm10r-q34',
              number: 34,
              prompt: 'What do gig workers have to pay for themselves?',
              options: [
                { id: 'A', text: 'their own car, bicycle or phone, and their own fuel' },
                { id: 'B', text: 'their own office and computer' },
                { id: 'C', text: 'their own holidays and pensions' },
                { id: 'D', text: 'their own training courses only' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Workers have to pay for their own car, bicycle or phone, and for their own fuel.',
                evidence: { paragraphId: '4', quote: 'Workers also have to pay for their own car, bicycle or phone, and for their own fuel' },
              },
            },
            {
              id: 'm10r-q35',
              number: 35,
              prompt: 'What does the writer say is needed for the gig economy?',
              options: [
                { id: 'A', text: 'fair rules, so workers are paid enough to live on and have basic rights' },
                { id: 'B', text: 'a ban on all gig work' },
                { id: 'C', text: 'more apps for customers' },
                { id: 'D', text: 'longer working hours for gig workers' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The gig economy needs fair rules: workers should be paid enough to live on, and they should have basic rights.',
                evidence: { paragraphId: '7', quote: 'Workers should be paid enough to live on, and they should have basic rights' },
              },
            },
          ],
        },
        {
          id: 'm10r-g10',
          type: 'matching-sentence-endings',
          instructions: 'Complete each sentence with the correct ending, A–H.',
          optionsTitle: 'List of Endings',
          options: [
            { id: 'A', text: 'the work is flexible, but it is also uncertain.' },
            { id: 'B', text: 'the company does not have to pay for holidays, sick pay or pensions.' },
            { id: 'C', text: 'workers can choose when to work, which jobs to take, and how much to earn.' },
            { id: 'D', text: 'the app sets the price, and the worker must accept it or get no work.' },
            { id: 'E', text: 'the company does not have to give them these rights.' },
            { id: 'F', text: 'workers can get help when they are ill or when they have no work.' },
            { id: 'G', text: 'the gig economy could give people both freedom and security.' },
            { id: 'H', text: 'all gig workers earn more than full-time workers.' },
          ],
          questions: [
            { id: 'm10r-q36', number: 36, prompt: 'Gig work shows that', answer: { accepted: ['A'] }, explanation: { text: 'The work is flexible, but it is also uncertain.', evidence: { paragraphId: '1', quote: 'The work is flexible, but it is also uncertain.' } } },
            { id: 'm10r-q37', number: 37, prompt: 'For companies, gig workers are cheaper because', answer: { accepted: ['B'] }, explanation: { text: 'For companies, gig workers are cheaper because the company does not have to pay for holidays, sick pay or pensions.', evidence: { paragraphId: '2', quote: 'the company does not have to pay for holidays, sick pay or pensions' } } },
            { id: 'm10r-q38', number: 38, prompt: 'Supporters of gig work say that', answer: { accepted: ['C'] }, explanation: { text: 'Supporters say workers can choose when to work, which jobs to take, and how much to earn.', evidence: { paragraphId: '3', quote: 'Workers can choose when to work, which jobs to take, and how much to earn' } } },
            { id: 'm10r-q39', number: 39, prompt: 'Critics of gig work say that', answer: { accepted: ['D'] }, explanation: { text: 'Critics say the app sets the price, and the worker must accept it or get no work.', evidence: { paragraphId: '4', quote: 'the app sets the price, and the worker must accept it or get no work' } } },
            { id: 'm10r-q40', number: 40, prompt: 'If fair rules are agreed,', answer: { accepted: ['G'] }, explanation: { text: 'If governments, companies and workers can agree on fair rules, the gig economy could give people both freedom and security.', evidence: { paragraphId: '7', quote: 'the gig economy could give people both freedom and security' } } },
          ],
        },
      ],
    },
  ],
};
