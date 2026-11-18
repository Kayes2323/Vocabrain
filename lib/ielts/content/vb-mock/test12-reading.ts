import type { ObjectiveSection } from '../../model';

/**
 * Mino Academic Mock Test 12 — Reading. Three original passages written
 * for Mino at IELTS Academic level (40 questions, 60 minutes).
 * Not Cambridge material. All passages, questions and answers are
 * original and were written fresh for this mock test.
 */
export const mock12Reading: ObjectiveSection = {
  skill: 'reading',
  timeLimitMinutes: 60,
  parts: [
    // ------------------------------------------------------------- Passage 1
    {
      id: 'r1',
      number: 1,
      passage: {
        title: 'Lighthouses',
        paragraphs: [
          {
            id: '1',
            text: 'For hundreds of years, lighthouses have stood on rocky coasts and small islands, warning ships of danger and guiding them safely into harbour. Before there were lighthouses, sailors could only find their way by the stars and by the shape of the land, and many ships were lost on dark nights or in bad weather. The first lighthouses were simple fires built on high ground, but over time they became tall stone towers with powerful lights that could be seen from many kilometres away.',
          },
          {
            id: '2',
            text: 'The most famous early lighthouse was built more than two thousand years ago on the island of Pharos, near the city of Alexandria in Egypt. It was more than one hundred metres high, and its fire could be seen by ships far out at sea. The lighthouse at Pharos was so famous that in many languages the word for lighthouse comes from its name. It stood for more than a thousand years, but it was finally destroyed by earthquakes.',
          },
          {
            id: '3',
            text: 'In Britain, the first lighthouses were built in the seventeenth century, and by the nineteenth century there were lighthouses all around the coast. The lights were first made by burning candles or oil lamps, and later by gas lights. In the nineteenth century, a French scientist called Augustin Fresnel designed a special glass lens that made the light much stronger, and this lens was used in lighthouses all over the world.',
          },
          {
            id: '4',
            text: 'The people who looked after lighthouses were called lighthouse keepers. Their work was lonely and often dangerous, because many lighthouses stand on rocks far from land, and the keepers sometimes had to stay there for weeks at a time. They had to keep the light burning all night, clean the glass lens every day, and write down the weather in a book. If the light went out, ships could be lost, so the keepers had to be careful and hard-working.',
          },
          {
            id: '5',
            text: 'In the twentieth century, electric lights replaced oil lamps, and machines began to do the work of the keepers. The last manned lighthouse in Britain was automated in 1998, and today, most lighthouses are controlled by computers from far away. The lights are still important, but ships now also use satellite systems to find their way, and some people have asked whether lighthouses are still needed at all.',
          },
          {
            id: '6',
            text: 'Many old lighthouses are now open to visitors, and some of them have been changed into hotels or museums. People visit them to enjoy the views from the top of the tower and to learn about the lives of the keepers. Even in a world of satellites and computers, lighthouses still have a special place in our hearts: they are a symbol of safety, and they remind us of a time when the sea was more dangerous than it is today.',
          },
        ],
      },
      groups: [
        {
          id: 'm12r-g1',
          type: 'sentence-completion',
          instructions: 'Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          questions: [
            {
              id: 'm12r-q1',
              number: 1,
              prompt: 'The first lighthouses were simple ___ built on high ground.',
              answer: { accepted: ['fires'] },
              explanation: { text: 'The first lighthouses were simple fires built on high ground.', evidence: { paragraphId: '1', quote: 'simple fires built on high ground' } },
            },
            {
              id: 'm12r-q2',
              number: 2,
              prompt: 'The lighthouse at Pharos was more than one hundred ___ high.',
              answer: { accepted: ['metres'] },
              explanation: { text: 'The lighthouse at Pharos was more than one hundred metres high.', evidence: { paragraphId: '2', quote: 'more than one hundred metres high' } },
            },
            {
              id: 'm12r-q3',
              number: 3,
              prompt: 'In many languages, the word for lighthouse comes from the name ___.',
              answer: { accepted: ['Pharos'] },
              explanation: { text: 'In many languages the word for lighthouse comes from the name Pharos.', evidence: { paragraphId: '2', quote: 'on the island of Pharos' } },
            },
            {
              id: 'm12r-q4',
              number: 4,
              prompt: 'The lights were first made by burning candles or ___ lamps.',
              answer: { accepted: ['oil'] },
              explanation: { text: 'The lights were first made by burning candles or oil lamps.', evidence: { paragraphId: '3', quote: 'burning candles or oil lamps' } },
            },
            {
              id: 'm12r-q5',
              number: 5,
              prompt: 'Augustin Fresnel designed a special glass ___ that made the light much stronger.',
              answer: { accepted: ['lens'] },
              explanation: { text: 'Fresnel designed a special glass lens that made the light much stronger.', evidence: { paragraphId: '3', quote: 'a special glass lens' } },
            },
          ],
        },
        {
          id: 'm12r-g2',
          type: 'true-false-not-given',
          instructions:
            'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
          questions: [
            {
              id: 'm12r-q6',
              number: 6,
              prompt: 'The first lighthouses were tall stone towers.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'The first lighthouses were simple fires built on high ground, not tall stone towers.', evidence: { paragraphId: '1', quote: 'The first lighthouses were simple fires built on high ground' } },
            },
            {
              id: 'm12r-q7',
              number: 7,
              prompt: 'The lighthouse at Pharos was destroyed by fire.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'The lighthouse at Pharos was finally destroyed by earthquakes.', evidence: { paragraphId: '2', quote: 'it was finally destroyed by earthquakes' } },
            },
            {
              id: 'm12r-q8',
              number: 8,
              prompt: 'In Britain, the first lighthouses were built in the seventeenth century.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'In Britain, the first lighthouses were built in the seventeenth century.', evidence: { paragraphId: '3', quote: 'the first lighthouses were built in the seventeenth century' } },
            },
            {
              id: 'm12r-q9',
              number: 9,
              prompt: 'Lighthouse keepers only worked during the day.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'Keepers had to keep the light burning all night.', evidence: { paragraphId: '4', quote: 'keep the light burning all night' } },
            },
            {
              id: 'm12r-q10',
              number: 10,
              prompt: 'The last manned lighthouse in Britain was automated in 1998.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'The last manned lighthouse in Britain was automated in 1998.', evidence: { paragraphId: '5', quote: 'The last manned lighthouse in Britain was automated in 1998' } },
            },
          ],
        },
        {
          id: 'm12r-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm12r-q11',
              number: 11,
              prompt: 'Why did sailors need lighthouses, according to paragraph 1?',
              options: [
                { id: 'A', text: 'They helped sailors to find their way on dark nights and in bad weather.' },
                { id: 'B', text: 'They showed sailors where to catch fish.' },
                { id: 'C', text: 'They warned sailors about other ships.' },
                { id: 'D', text: 'They helped sailors to measure the depth of the sea.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Before lighthouses, many ships were lost on dark nights or in bad weather.',
                evidence: { paragraphId: '1', quote: 'many ships were lost on dark nights or in bad weather' },
              },
            },
            {
              id: 'm12r-q12',
              number: 12,
              prompt: 'What did Fresnel design?',
              options: [
                { id: 'A', text: 'a new kind of oil lamp' },
                { id: 'B', text: 'a special glass lens that made the light much stronger' },
                { id: 'C', text: 'a taller stone tower' },
                { id: 'D', text: 'an electric light' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Fresnel designed a special glass lens that made the light much stronger.',
                evidence: { paragraphId: '3', quote: 'designed a special glass lens that made the light much stronger' },
              },
            },
            {
              id: 'm12r-q13',
              number: 13,
              prompt: 'What does the writer say about lighthouses today?',
              options: [
                { id: 'A', text: 'They are no longer used by ships at all.' },
                { id: 'B', text: 'Most of them are now controlled by computers from far away.' },
                { id: 'C', text: 'They are all open to visitors.' },
                { id: 'D', text: 'They have all been changed into hotels.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Today, most lighthouses are controlled by computers from far away.',
                evidence: { paragraphId: '5', quote: 'most lighthouses are controlled by computers from far away' },
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
        title: 'The Psychology of Colour',
        paragraphs: [
          {
            id: 'A',
            labelled: true,
            text: 'Colour is all around us, in our clothes, our homes and the places where we work, and it can change the way we feel without us knowing it. The study of how colour affects the way people feel and behave is called the psychology of colour. For many years, scientists and designers have tried to understand why a red room feels different from a blue room, and why some colours make us feel calm while others make us feel excited.',
          },
          {
            id: 'B',
            labelled: true,
            text: 'Red is the colour most often connected with strong feelings. It is the colour of fire and blood, and it can make the heart beat faster and make people feel more awake. In tests, people who look at red for a short time often do better in tasks that need quick action, such as sports. However, red can also make people feel angry or worried, and for this reason, it is not often used in places where people need to stay calm.',
          },
          {
            id: 'C',
            labelled: true,
            text: 'Blue is often seen as the opposite of red. It is the colour of the sky and the sea, and most people say that blue makes them feel calm and safe. In offices and hospitals, blue is often used on the walls because it can help people to relax and to think clearly. In tests, people who work in blue rooms often do better in tasks that need careful thinking, such as reading and writing.',
          },
          {
            id: 'D',
            labelled: true,
            text: 'Yellow is the colour of sunlight, and it is often connected with happiness and energy. A yellow room can make people feel cheerful, and for this reason, yellow is often used in kitchens and in children\'s rooms. However, too much yellow can be tiring to look at, and some studies have found that people feel more worried in a room that is painted completely yellow.',
          },
          {
            id: 'E',
            labelled: true,
            text: 'Green is the colour of nature, of trees and grass, and it is often connected with health and new life. Hospitals often use green in their rooms because it can make patients feel better, and schools often use green in classrooms because it can help children to feel calm. People who spend time in green places, such as parks and gardens, often say that they feel less worried and more relaxed.',
          },
          {
            id: 'F',
            labelled: true,
            text: 'It is important to remember that the way we feel about colour is not the same for everyone. In some countries, white is the colour of weddings, while in other countries, white is the colour of funerals. In China, red is the colour of good luck, and it is used at weddings and at New Year, while in some other countries, red is the colour of danger. These differences show that culture, as well as nature, shapes the way we see colour.',
          },
          {
            id: 'G',
            labelled: true,
            text: 'Colour is now used in many clever ways by designers and by companies. Shops use warm colours to make people feel welcome, and fast-food restaurants often use red and yellow because these colours can make people feel hungry and eat quickly. Hospitals and schools use calm colours to help people to relax and to learn. By understanding the psychology of colour, we can design better places to live, work and learn, and we can understand a little more about the way our minds work.',
          },
        ],
      },
      groups: [
        {
          id: 'm12r-g4',
          type: 'matching-headings',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings below.',
          optionsTitle: 'List of Headings',
          options: [
            { id: 'i', text: 'A colour that makes people feel strong feelings' },
            { id: 'ii', text: 'A colour that helps people to feel calm' },
            { id: 'iii', text: 'A colour connected with happiness' },
            { id: 'iv', text: 'A colour connected with nature and health' },
            { id: 'v', text: 'Colour means different things in different places' },
            { id: 'vi', text: 'How colour is used by shops and restaurants' },
            { id: 'vii', text: 'The study of colour and feeling' },
            { id: 'viii', text: 'The history of paint and painting' },
          ],
          questions: [
            {
              id: 'm12r-q14',
              number: 14,
              prompt: 'Paragraph B',
              answer: { accepted: ['i'] },
              explanation: { text: 'The paragraph describes red, the colour most often connected with strong feelings.', evidence: { paragraphId: 'B', quote: 'Red is the colour most often connected with strong feelings' } },
            },
            {
              id: 'm12r-q15',
              number: 15,
              prompt: 'Paragraph C',
              answer: { accepted: ['ii'] },
              explanation: { text: 'The paragraph describes blue, which makes most people feel calm and safe.', evidence: { paragraphId: 'C', quote: 'most people say that blue makes them feel calm and safe' } },
            },
            {
              id: 'm12r-q16',
              number: 16,
              prompt: 'Paragraph D',
              answer: { accepted: ['iii'] },
              explanation: { text: 'The paragraph describes yellow, which is often connected with happiness and energy.', evidence: { paragraphId: 'D', quote: 'Yellow is the colour of sunlight, and it is often connected with happiness and energy' } },
            },
            {
              id: 'm12r-q17',
              number: 17,
              prompt: 'Paragraph E',
              answer: { accepted: ['iv'] },
              explanation: { text: 'The paragraph describes green, the colour of nature, which is often connected with health and new life.', evidence: { paragraphId: 'E', quote: 'Green is the colour of nature, of trees and grass, and it is often connected with health and new life' } },
            },
            {
              id: 'm12r-q18',
              number: 18,
              prompt: 'Paragraph F',
              answer: { accepted: ['v'] },
              explanation: { text: 'The paragraph says that the way we feel about colour is not the same for everyone.', evidence: { paragraphId: 'F', quote: 'the way we feel about colour is not the same for everyone' } },
            },
          ],
        },
        {
          id: 'm12r-g5',
          type: 'table-completion',
          instructions: 'Complete the table below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          table: {
            headers: ['Colour', 'Detail'],
            rows: [
              ['Red', 'Red can make the heart beat {{19}}'],
              ['Blue', 'People who work in blue rooms often do better in tasks that need careful {{20}}'],
              ['Yellow', 'Yellow is often used in kitchens and in children\'s {{21}}'],
              ['Green', 'Hospitals often use green because it can make patients feel {{22}}'],
            ],
          },
          questions: [
            { id: 'm12r-q19', number: 19, answer: { accepted: ['faster'] }, explanation: { text: 'Red can make the heart beat faster.', evidence: { paragraphId: 'B', quote: 'make the heart beat faster' } } },
            { id: 'm12r-q20', number: 20, answer: { accepted: ['thinking'] }, explanation: { text: 'People who work in blue rooms often do better in tasks that need careful thinking.', evidence: { paragraphId: 'C', quote: 'tasks that need careful thinking' } } },
            { id: 'm12r-q21', number: 21, answer: { accepted: ['rooms'] }, explanation: { text: 'Yellow is often used in kitchens and in children\'s rooms.', evidence: { paragraphId: 'D', quote: 'in kitchens and in children\'s rooms' } } },
            { id: 'm12r-q22', number: 22, answer: { accepted: ['better'] }, explanation: { text: 'Hospitals often use green because it can make patients feel better.', evidence: { paragraphId: 'E', quote: 'it can make patients feel better' } } },
          ],
        },
        {
          id: 'm12r-g6',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO things does the writer say about the colour red in paragraph B?',
          choose: 2,
          options: [
            { id: 'A', text: 'Red can make the heart beat faster.' },
            { id: 'B', text: 'Red can make people feel angry or worried.' },
            { id: 'C', text: 'Red is often used in hospitals.' },
            { id: 'D', text: 'Red is the colour of the sea.' },
            { id: 'E', text: 'Red makes people feel calm.' },
          ],
          questions: [
            { id: 'm12r-q23', number: 23, answer: { accepted: ['A'] }, explanation: { text: 'Red can make the heart beat faster.', evidence: { paragraphId: 'B', quote: 'it can make the heart beat faster' } } },
            { id: 'm12r-q24', number: 24, answer: { accepted: ['B'] }, explanation: { text: 'Red can also make people feel angry or worried.', evidence: { paragraphId: 'B', quote: 'red can also make people feel angry or worried' } } },
          ],
        },
        {
          id: 'm12r-g7',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO things does the writer say about the colour blue in paragraph C?',
          choose: 2,
          options: [
            { id: 'A', text: 'Blue makes most people feel calm and safe.' },
            { id: 'B', text: 'Blue is often used on the walls in offices and hospitals.' },
            { id: 'C', text: 'Blue is the colour of fire.' },
            { id: 'D', text: 'Blue makes people feel hungry.' },
            { id: 'E', text: 'Blue is often used in fast-food restaurants.' },
          ],
          questions: [
            { id: 'm12r-q25', number: 25, answer: { accepted: ['A'] }, explanation: { text: 'Most people say that blue makes them feel calm and safe.', evidence: { paragraphId: 'C', quote: 'most people say that blue makes them feel calm and safe' } } },
            { id: 'm12r-q26', number: 26, answer: { accepted: ['B'] }, explanation: { text: 'In offices and hospitals, blue is often used on the walls.', evidence: { paragraphId: 'C', quote: 'blue is often used on the walls' } } },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 3
    {
      id: 'r3',
      number: 3,
      passage: {
        title: 'Automation and the Future of Work',
        paragraphs: [
          {
            id: '1',
            text: 'In the last two hundred years, new machines have changed the way people work again and again. In the nineteenth century, machines in factories took over work that people had done by hand. In the twentieth century, computers began to do office work that people had done with paper and pen. Today, a new change is happening: machines that can learn, called artificial intelligence, can now do work that people once thought only humans could do, such as writing, translating and even making medical decisions.',
          },
          {
            id: '2',
            text: 'Many people are worried that machines will take their jobs. It is true that some jobs have already disappeared: there are now very few people who work as lift operators or as typists, because machines and computers do their work. Some experts believe that in the next twenty years, many more jobs will disappear, especially jobs that follow the same steps every day, such as working on a factory line or driving a lorry.',
          },
          {
            id: '3',
            text: 'Other experts are more hopeful. They say that new machines have always taken some jobs away, but they have also created new jobs that no one could have imagined before. When the motor car was invented, jobs for people who looked after horses disappeared, but new jobs appeared for car makers, car mechanics and road builders. In the same way, they say, artificial intelligence will create new jobs for people who build, check and repair intelligent machines.',
          },
          {
            id: '4',
            text: 'There is another question that experts ask: will the new jobs be good jobs? Some of the new jobs created by the internet, such as delivering food by bicycle, are not well paid, and the people who do them often have no holiday and no sick pay. If the new jobs are like this, then many people may have work, but they may still be poor. For this reason, some experts say that governments must make sure that new jobs are safe and fairly paid.',
          },
          {
            id: '5',
            text: 'Machines are also changing the way people work, not only the jobs they do. Many people now work from home, using computers to talk to other people and to send their work to the office. This can be good for workers, because they do not have to travel to work every day, and they can spend more time with their families. But it can also be bad, because people who work at home can feel lonely, and it can be difficult to stop working at the end of the day.',
          },
          {
            id: '6',
            text: 'Schools and colleges will also have to change. In the past, a person could learn one job and do it for their whole life, but in the future, most people will have to learn new skills many times in their lives. For this reason, experts say that schools should teach children how to learn, how to think and how to work with other people, and not only how to remember facts. These skills, they say, are the ones that machines find hardest to copy.',
          },
          {
            id: '7',
            text: 'In my view, machines will not take all our jobs, but they will change what work means. The jobs of the future will be different from the jobs of today, and people who are ready to learn new skills will do best. Governments, schools and companies must work together to help people through this change. If we plan well, the age of intelligent machines could be a time when people work less and live better, and that is a future worth working for.',
          },
        ],
      },
      groups: [
        {
          id: 'm12r-g8',
          type: 'yes-no-not-given',
          instructions:
            'Do the following statements agree with the claims of the writer in Reading Passage 3? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
          questions: [
            {
              id: 'm12r-q27',
              number: 27,
              prompt: 'Machines in factories took over work that people had done by hand in the nineteenth century.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'In the nineteenth century, machines in factories took over work that people had done by hand.', evidence: { paragraphId: '1', quote: 'machines in factories took over work that people had done by hand' } },
            },
            {
              id: 'm12r-q28',
              number: 28,
              prompt: 'All the jobs that disappear will be replaced by better jobs.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: { text: 'The writer says new jobs appeared in the past, but does not say that all lost jobs will be replaced by better jobs.', evidence: { paragraphId: '3', quote: 'new jobs appeared for car makers, car mechanics and road builders' } },
            },
            {
              id: 'm12r-q29',
              number: 29,
              prompt: 'Some new jobs created by the internet are not well paid.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Some of the new jobs created by the internet are not well paid.', evidence: { paragraphId: '4', quote: 'Some of the new jobs created by the internet, such as delivering food by bicycle, are not well paid' } },
            },
            {
              id: 'm12r-q30',
              number: 30,
              prompt: 'Working from home is good for all workers.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'Working from home can also be bad, because people who work at home can feel lonely.', evidence: { paragraphId: '5', quote: 'people who work at home can feel lonely' } },
            },
            {
              id: 'm12r-q31',
              number: 31,
              prompt: 'The writer believes machines will take all our jobs.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'The writer says machines will not take all our jobs.', evidence: { paragraphId: '7', quote: 'machines will not take all our jobs' } },
            },
          ],
        },
        {
          id: 'm12r-g9',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm12r-q32',
              number: 32,
              prompt: 'What does the writer say about jobs in the next twenty years?',
              options: [
                { id: 'A', text: 'All jobs will disappear.' },
                { id: 'B', text: 'Many jobs that follow the same steps every day may disappear.' },
                { id: 'C', text: 'No jobs will disappear.' },
                { id: 'D', text: 'Only office jobs will disappear.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'In the next twenty years, many more jobs will disappear, especially jobs that follow the same steps every day.',
                evidence: { paragraphId: '2', quote: 'many more jobs will disappear, especially jobs that follow the same steps every day' },
              },
            },
            {
              id: 'm12r-q33',
              number: 33,
              prompt: 'What example does the writer give of new jobs created by the motor car?',
              options: [
                { id: 'A', text: 'jobs for people who looked after horses' },
                { id: 'B', text: 'jobs for car makers, car mechanics and road builders' },
                { id: 'C', text: 'jobs for typists and lift operators' },
                { id: 'D', text: 'jobs for food delivery riders' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'New jobs appeared for car makers, car mechanics and road builders.',
                evidence: { paragraphId: '3', quote: 'new jobs appeared for car makers, car mechanics and road builders' },
              },
            },
            {
              id: 'm12r-q34',
              number: 34,
              prompt: 'What problem does the writer mention about working from home?',
              options: [
                { id: 'A', text: 'People have to travel to work every day.' },
                { id: 'B', text: 'People can feel lonely and find it difficult to stop working.' },
                { id: 'C', text: 'People cannot talk to other people by computer.' },
                { id: 'D', text: 'People spend too much time with their families.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'People who work at home can feel lonely, and it can be difficult to stop working at the end of the day.',
                evidence: { paragraphId: '5', quote: 'people who work at home can feel lonely, and it can be difficult to stop working' },
              },
            },
            {
              id: 'm12r-q35',
              number: 35,
              prompt: 'What does the writer say schools should teach children?',
              options: [
                { id: 'A', text: 'only how to remember facts' },
                { id: 'B', text: 'how to learn, how to think and how to work with other people' },
                { id: 'C', text: 'how to build intelligent machines' },
                { id: 'D', text: 'how to work from home' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Schools should teach children how to learn, how to think and how to work with other people.',
                evidence: { paragraphId: '6', quote: 'schools should teach children how to learn, how to think and how to work with other people' },
              },
            },
          ],
        },
        {
          id: 'm12r-g10',
          type: 'matching-sentence-endings',
          instructions: 'Complete each sentence with the correct ending, A–H.',
          optionsTitle: 'List of Endings',
          options: [
            { id: 'A', text: 'new jobs appeared for car makers, car mechanics and road builders.' },
            { id: 'B', text: 'many people may have work, but they may still be poor.' },
            { id: 'C', text: 'they do not have to travel to work every day.' },
            { id: 'D', text: 'people will have to learn new skills many times in their lives.' },
            { id: 'E', text: 'the age of intelligent machines could be a time when people work less and live better.' },
            { id: 'F', text: 'machines find them hardest to copy.' },
            { id: 'G', text: 'jobs for people who looked after horses disappeared.' },
            { id: 'H', text: 'governments must make sure that new jobs are safe and fairly paid.' },
          ],
          questions: [
            { id: 'm12r-q36', number: 36, prompt: 'When the motor car was invented,', answer: { accepted: ['G'] }, explanation: { text: 'When the motor car was invented, jobs for people who looked after horses disappeared.', evidence: { paragraphId: '3', quote: 'jobs for people who looked after horses disappeared' } } },
            { id: 'm12r-q37', number: 37, prompt: 'If the new jobs are not well paid,', answer: { accepted: ['B'] }, explanation: { text: 'If the new jobs are like this, then many people may have work, but they may still be poor.', evidence: { paragraphId: '4', quote: 'many people may have work, but they may still be poor' } } },
            { id: 'm12r-q38', number: 38, prompt: 'Working from home can be good for workers because', answer: { accepted: ['C'] }, explanation: { text: 'Working from home can be good for workers, because they do not have to travel to work every day.', evidence: { paragraphId: '5', quote: 'they do not have to travel to work every day' } } },
            { id: 'm12r-q39', number: 39, prompt: 'In the future, most people', answer: { accepted: ['D'] }, explanation: { text: 'In the future, most people will have to learn new skills many times in their lives.', evidence: { paragraphId: '6', quote: 'most people will have to learn new skills many times in their lives' } } },
            { id: 'm12r-q40', number: 40, prompt: 'If we plan well,', answer: { accepted: ['E'] }, explanation: { text: 'If we plan well, the age of intelligent machines could be a time when people work less and live better.', evidence: { paragraphId: '7', quote: 'the age of intelligent machines could be a time when people work less and live better' } } },
          ],
        },
      ],
    },
  ],
};
