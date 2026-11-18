import type { ObjectiveSection } from '../../model';

/**
 * Mino Academic Mock Test 3 — Reading. Three original passages written
 * for Mino at IELTS Academic level (40 questions, 60 minutes).
 * Not Cambridge material. Follows the Cambridge 19 Test 1 format
 * (same timing, counts and question types).
 */
export const mock3Reading: ObjectiveSection = {
  skill: 'reading',
  timeLimitMinutes: 60,
  parts: [
    // ------------------------------------------------------------- Passage 1
    {
      id: 'r1',
      number: 1,
      passage: {
        title: 'The Salt That Travelled the World',
        paragraphs: [
          {
            id: '1',
            text: 'For most of human history, salt was far more than something to sprinkle on food. It gave flavour to plain meals, but its greater value lay in preservation. Before modern refrigeration, salt was one of the few ways to keep meat and fish from spoiling, because it draws water out of food and makes it hard for the tiny organisms that cause decay to grow. A community with a reliable supply of salt could store food through winter, feed travellers on long journeys and trade with neighbours who had none. It is not surprising, therefore, that salt was treated as a precious substance in many parts of the world.',
          },
          {
            id: '2',
            text: 'Salt can be obtained in several ways, but the simplest depends on the sun. In hot, dry places, seawater is led into shallow pools, where the sun drives evaporation and leaves a crust of white crystals behind. Workers then rake the crystals into piles and leave them to dry further before they are packed for sale. In cooler climates, people once boiled seawater in large pans over wood fires, a slower and more costly method that used a great deal of fuel. Both methods produce the same result, a mineral that is essential to human life.',
          },
          {
            id: '3',
            text: 'Because salt was needed everywhere but could be made in only a few places, it became an important item of trade. In West Africa, traders carried slabs of salt across the Sahara Desert on camels, exchanging them for gold dust in towns on the southern edge of the desert. Salt cakes were used as currency in some regions, and a block of salt could buy a substantial quantity of grain. The trade routes that carried salt also carried news, ideas and other goods, and towns that grew up along them became centres of learning and commerce.',
          },
          {
            id: '4',
            text: 'The Romans also valued salt highly. The English word salary comes from the Latin word salarium, the money paid to Roman soldiers so that they could buy salt. Roman roads were built partly to move salt from coastal pans and inland mines to towns and army camps, and the state at times controlled its sale and taxed it heavily. Salt was so central to Roman life that a town in central Italy, Ostia, grew rich largely because of the salt pans near its harbour.',
          },
          {
            id: '5',
            text: 'In other parts of the world, salt was dug from the ground. Underground deposits were formed millions of years ago, when ancient seas dried up and left thick layers of rock salt buried under later rocks. In underground mines, miners cut blocks of rock salt from the walls with picks and carried them to the surface in baskets or carts. The work was dark, damp and dangerous, and the tunnels could stretch for many kilometres beneath the earth. Some of these old mines are now open to visitors, who can walk through vast halls carved entirely from salt.',
          },
          {
            id: '6',
            text: 'Modern production is very different. In many mines today, water is pumped deep underground to dissolve the salt, and the resulting solution, known as brine, is brought to the surface through pipes. The brine is then heated, so that the water boils away and pure salt remains. Other mines use machines to cut the rock salt and carry it out on conveyor belts. These methods produce large quantities of salt quickly, and they need far fewer workers than the old hand methods did.',
          },
          {
            id: '7',
            text: 'Today salt is cheap and plentiful, and most people give it little thought. It is used to clear ice from roads in winter, to soften water in factories and to make chemicals as well as to season food. Doctors, however, warn that eating too much salt can raise blood pressure and damage health, and governments in several countries have urged food companies to use less of it in bread, snacks and ready meals. Salt has therefore travelled a long way from the precious substance that was once traded for gold, yet it remains, in small amounts, essential to life.',
          },
        ],
      },
      groups: [
        {
          id: 'm3r-g1',
          type: 'sentence-completion',
          instructions: 'Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          questions: [
            {
              id: 'm3r-q1',
              number: 1,
              prompt: 'Before modern ___, salt was one of the few ways to keep meat and fish from spoiling.',
              answer: { accepted: ['refrigeration'] },
              explanation: { text: 'Salt was used for preservation before modern refrigeration existed.', evidence: { paragraphId: '1', quote: 'Before modern refrigeration, salt was one of the few ways to keep meat and fish from spoiling' } },
            },
            {
              id: 'm3r-q2',
              number: 2,
              prompt: 'In hot, dry places, salt is left behind when the sun drives ___ in shallow pools.',
              answer: { accepted: ['evaporation'] },
              explanation: { text: 'The sun drives evaporation, leaving a crust of salt crystals behind.', evidence: { paragraphId: '2', quote: 'where the sun drives evaporation and leaves a crust of white crystals behind' } },
            },
            {
              id: 'm3r-q3',
              number: 3,
              prompt: 'In some regions of West Africa, salt cakes were used as ___.',
              answer: { accepted: ['currency'] },
              explanation: { text: 'Salt cakes served as a form of money in some regions.', evidence: { paragraphId: '3', quote: 'Salt cakes were used as currency in some regions' } },
            },
            {
              id: 'm3r-q4',
              number: 4,
              prompt: 'In underground mines, ___ cut blocks of rock salt from the walls.',
              answer: { accepted: ['miners'] },
              explanation: { text: 'Miners cut the blocks of rock salt from the mine walls.', evidence: { paragraphId: '5', quote: 'In underground mines, miners cut blocks of rock salt from the walls with picks' } },
            },
            {
              id: 'm3r-q5',
              number: 5,
              prompt: 'In modern mines, water is pumped underground to dissolve salt and bring it to the surface as ___.',
              answer: { accepted: ['brine'] },
              explanation: { text: 'The dissolved salt is brought to the surface as brine.', evidence: { paragraphId: '6', quote: 'the resulting solution, known as brine, is brought to the surface through pipes' } },
            },
          ],
        },
        {
          id: 'm3r-g2',
          type: 'true-false-not-given',
          instructions:
            'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
          questions: [
            {
              id: 'm3r-q6',
              number: 6,
              prompt: 'Salt was used in the past to preserve food.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'Salt was one of the few ways to keep meat and fish from spoiling.', evidence: { paragraphId: '1', quote: 'salt was one of the few ways to keep meat and fish from spoiling' } },
            },
            {
              id: 'm3r-q7',
              number: 7,
              prompt: 'In ancient times, salt was used only to add flavour to food.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'Flavour was only part of its value; preservation was more important.', evidence: { paragraphId: '1', quote: 'It gave flavour to plain meals, but its greater value lay in preservation' } },
            },
            {
              id: 'm3r-q8',
              number: 8,
              prompt: 'The English word salary comes from a Latin word connected with salt.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'Salary comes from salarium, money paid to Roman soldiers so they could buy salt.', evidence: { paragraphId: '4', quote: 'The English word salary comes from the Latin word salarium, the money paid to Roman soldiers so that they could buy salt' } },
            },
            {
              id: 'm3r-q9',
              number: 9,
              prompt: 'Salt from the Sahara was more expensive than salt made from seawater.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: {
                text: 'The passage describes the Saharan salt trade but gives no comparison of prices.',
                evidence: { paragraphId: '3', quote: 'traders carried slabs of salt across the Sahara Desert on camels' },
                distractors: { TRUE: 'The trade is described, but no price comparison is given.' },
              },
            },
            {
              id: 'm3r-q10',
              number: 10,
              prompt: 'Salt is expensive today because it is difficult to produce.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'Salt is now cheap and plentiful, and modern methods produce it quickly in large quantities.', evidence: { paragraphId: '7', quote: 'Today salt is cheap and plentiful' } },
            },
          ],
        },
        {
          id: 'm3r-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm3r-q11',
              number: 11,
              prompt: 'According to the writer, why did salt become an important item of trade?',
              options: [
                { id: 'A', text: 'It could be made easily in every part of the world.' },
                { id: 'B', text: 'It was needed everywhere but could be made in only a few places.' },
                { id: 'C', text: 'It was used mainly as money.' },
                { id: 'D', text: 'Traders wanted to exchange it for gold.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Salt was needed everywhere but could be produced in only a few places.',
                evidence: { paragraphId: '3', quote: 'Because salt was needed everywhere but could be made in only a few places, it became an important item of trade' },
                distractors: { D: 'Gold is mentioned as one thing salt was exchanged for, not as the reason trade began.' },
              },
            },
            {
              id: 'm3r-q12',
              number: 12,
              prompt: 'What does the writer say about the old underground salt mines?',
              options: [
                { id: 'A', text: 'They still produce most of the salt used today.' },
                { id: 'B', text: 'The work inside them was dark, damp and dangerous.' },
                { id: 'C', text: 'Visitors are not allowed to enter them.' },
                { id: 'D', text: 'They were built by the Romans.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Mining was dark, damp and dangerous work.',
                evidence: { paragraphId: '5', quote: 'The work was dark, damp and dangerous' },
                distractors: { C: 'Some old mines are now open to visitors.' },
              },
            },
            {
              id: 'm3r-q13',
              number: 13,
              prompt: 'What point does the writer make in paragraph 7 about salt today?',
              options: [
                { id: 'A', text: 'It is no longer used in food.' },
                { id: 'B', text: 'It is cheap, but eating too much of it can harm health.' },
                { id: 'C', text: 'Governments have banned it in ready meals.' },
                { id: 'D', text: 'It is used only to clear ice from roads.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Salt is now cheap and plentiful, yet doctors warn that too much of it can damage health.',
                evidence: { paragraphId: '7', quote: 'eating too much salt can raise blood pressure and damage health' },
                distractors: { C: 'Governments have urged companies to use less salt, not banned it.' },
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
        title: 'The Return of the Night Train',
        subtitle: 'Sleepers are coming back to European railways — but can they compete with cheap flights?',
        paragraphs: [
          {
            id: 'A',
            labelled: true,
            text: 'For much of the twentieth century, the night train was a familiar part of European travel. Business travellers, students and families would board a sleeper in the evening, eat in the dining car, and wake the next morning in another country. The journey was slow by modern standards, but it saved a hotel bill and turned travelling time into sleeping time. By the early 2000s, however, many of these services had disappeared, pushed out by low-cost airlines and by high-speed trains that could cover the same distance in daylight in a few hours.',
          },
          {
            id: 'B',
            labelled: true,
            text: 'Night trains first appeared in the nineteenth century, when railway companies realised that passengers would pay for a bed on a long journey. The most famous services, such as the trains that ran from Paris to Istanbul, became symbols of luxury travel, with wood-panelled cabins and formal dinners. After the Second World War, the network grew rapidly, linking most European capitals. Then, from the 1990s onwards, the network shrank almost as fast as it had grown. National railway companies closed loss-making routes, and by 2015 only a handful of international sleepers remained.',
          },
          {
            id: 'C',
            labelled: true,
            text: 'One reason for the revival is concern about the environment. A short flight produces far more carbon dioxide per passenger than the same journey by rail, and a growing number of travellers say they want to avoid flying when a train is available. For many passengers, the fare also replaces a hotel night, which makes the higher ticket price easier to accept. Rail companies have noticed the change, and several have announced plans to buy new sleeping carriages.',
          },
          {
            id: 'D',
            labelled: true,
            text: 'Life on board is very different from life on a plane. Passengers in a couchette share a compartment with up to five other people, sleeping on a narrow bunk with a pillow and a blanket provided by the railway. Those who pay more can book a private cabin, sometimes with a washbasin and a small table, and wake to breakfast served in the cabin. The dining car, where it still exists, serves simple hot meals in the evening, and the gentle movement of the train helps many passengers to fall asleep quickly. Most travellers say they arrive feeling rested, even if they have slept less well than they would at home.',
          },
          {
            id: 'E',
            labelled: true,
            text: 'Booking a sleeper is not like booking a flight. Tickets are usually released several months in advance, and the cheapest beds sell first, so travellers who leave it late may find only the most expensive cabins still available. Prices rise as the departure date approaches, and a ticket for one route may be sold by two different railway companies, each with its own website. Experienced travellers advise booking early, checking both companies, and choosing a train that arrives after breakfast time if a shower matters in the morning.',
          },
          {
            id: 'F',
            labelled: true,
            text: 'The return of night trains can also benefit the towns along the route. A train that stops at a small station in the early morning brings passengers who may stay for breakfast, visit a museum or catch a local bus to a nearby village. Hotel owners, cafe owners and taxi drivers in such towns have welcomed the new services, and some local councils have improved station buildings and added signs in several languages. The effect on any single town is small, but across a whole network it can be enough to keep a station open that might otherwise have closed.',
          },
          {
            id: 'G',
            labelled: true,
            text: 'There are still serious problems to solve. Trains can be delayed at borders while locomotives are changed, because different countries use different signalling systems and, in some cases, different track widths. There are too few sleeping carriages to meet demand on popular routes, so some trains sell out weeks in advance. Tickets also remain expensive compared with low-cost flights, and many routes run only a few times a week. Unless railway companies invest in new carriages and governments make it easier to run trains across borders, the revival may remain limited to a small number of popular routes.',
          },
        ],
      },
      groups: [
        {
          id: 'm3r-g4',
          type: 'matching-headings',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings below.',
          optionsTitle: 'List of Headings',
          options: [
            { id: 'i', text: 'Why travellers are choosing the slower option' },
            { id: 'ii', text: 'The cost of building new lines' },
            { id: 'iii', text: 'From luxury travel to decline' },
            { id: 'iv', text: 'What a night on board is actually like' },
            { id: 'v', text: 'The practical problems that remain' },
            { id: 'vi', text: 'How booking a sleeper differs from booking a flight' },
            { id: 'vii', text: 'Benefits for towns along the route' },
            { id: 'viii', text: 'The environmental case for travelling by rail' },
          ],
          questions: [
            {
              id: 'm3r-q14',
              number: 14,
              prompt: 'Paragraph B',
              answer: { accepted: ['iii'] },
              explanation: { text: 'The paragraph traces night trains from luxury services in the nineteenth century to their decline by 2015.', evidence: { paragraphId: 'B', quote: 'Night trains first appeared in the nineteenth century' } },
            },
            {
              id: 'm3r-q15',
              number: 15,
              prompt: 'Paragraph C',
              answer: { accepted: ['viii'] },
              explanation: { text: 'The paragraph gives the environmental reason for the revival: flying produces far more carbon dioxide than rail.', evidence: { paragraphId: 'C', quote: 'A short flight produces far more carbon dioxide per passenger than the same journey by rail' } },
            },
            {
              id: 'm3r-q16',
              number: 16,
              prompt: 'Paragraph D',
              answer: { accepted: ['iv'] },
              explanation: { text: 'The paragraph describes couchettes, cabins, meals and sleep on board.', evidence: { paragraphId: 'D', quote: 'Passengers in a couchette share a compartment with up to five other people' } },
            },
            {
              id: 'm3r-q17',
              number: 17,
              prompt: 'Paragraph E',
              answer: { accepted: ['vi'] },
              explanation: { text: 'The paragraph explains how booking a sleeper differs from booking a flight.', evidence: { paragraphId: 'E', quote: 'Booking a sleeper is not like booking a flight' } },
            },
            {
              id: 'm3r-q18',
              number: 18,
              prompt: 'Paragraph F',
              answer: { accepted: ['vii'] },
              explanation: { text: 'The paragraph is about the benefits night trains bring to towns along the route.', evidence: { paragraphId: 'F', quote: 'The return of night trains can also benefit the towns along the route' } },
            },
          ],
        },
        {
          id: 'm3r-g5',
          type: 'table-completion',
          instructions: 'Complete the table below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          table: {
            headers: ['Part of the journey', 'What happens', 'What travellers should know'],
            rows: [
              ['Evening departure', 'Passengers usually board in the {{19}}', 'They wake up in another country'],
              ['Sleeping', 'A couchette has a narrow {{20}} and a blanket', 'Private cabins cost more'],
              ['Booking', 'Tickets are released several {{21}} in advance', 'Prices rise as the departure date approaches'],
              ['Arrival', 'Some trains stop at small stations in the early {{22}}', 'Passengers may stay for breakfast'],
            ],
          },
          questions: [
            { id: 'm3r-q19', number: 19, answer: { accepted: ['evening'] }, explanation: { text: 'Passengers board a sleeper in the evening.', evidence: { paragraphId: 'A', quote: 'board a sleeper in the evening' } } },
            { id: 'm3r-q20', number: 20, answer: { accepted: ['bunk'] }, explanation: { text: 'A couchette passenger sleeps on a narrow bunk.', evidence: { paragraphId: 'D', quote: 'sleeping on a narrow bunk with a pillow and a blanket provided by the railway' } } },
            { id: 'm3r-q21', number: 21, answer: { accepted: ['months'] }, explanation: { text: 'Tickets are released several months in advance.', evidence: { paragraphId: 'E', quote: 'Tickets are usually released several months in advance' } } },
            { id: 'm3r-q22', number: 22, answer: { accepted: ['morning'] }, explanation: { text: 'Some trains stop at small stations in the early morning.', evidence: { paragraphId: 'F', quote: 'A train that stops at a small station in the early morning brings passengers who may stay for breakfast' } } },
          ],
        },
        {
          id: 'm3r-g6',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO advantages of night trains are mentioned in paragraph C?',
          choose: 2,
          options: [
            { id: 'A', text: 'They produce far less carbon dioxide per passenger than flying.' },
            { id: 'B', text: 'They are always cheaper than flying.' },
            { id: 'C', text: 'The fare can take the place of a hotel night.' },
            { id: 'D', text: 'They run only at night, when trains would otherwise be idle.' },
            { id: 'E', text: 'They are faster than daytime high-speed trains.' },
          ],
          questions: [
            { id: 'm3r-q23', number: 23, answer: { accepted: ['A'] }, explanation: { text: 'A short flight produces far more carbon dioxide per passenger than the same journey by rail.', evidence: { paragraphId: 'C', quote: 'A short flight produces far more carbon dioxide per passenger than the same journey by rail' } } },
            { id: 'm3r-q24', number: 24, answer: { accepted: ['C'] }, explanation: { text: 'The fare replaces a hotel night, which makes the higher ticket price easier to accept.', evidence: { paragraphId: 'C', quote: 'the fare also replaces a hotel night' }, distractors: { B: 'Night train tickets are described as expensive, not always cheaper than flying.' } } },
          ],
        },
        {
          id: 'm3r-g7',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO problems with night trains are mentioned in paragraph G?',
          choose: 2,
          options: [
            { id: 'A', text: 'Trains can be delayed at borders while locomotives are changed.' },
            { id: 'B', text: 'There are too few sleeping carriages to meet demand on popular routes.' },
            { id: 'C', text: 'Night trains are banned in several countries.' },
            { id: 'D', text: 'Passengers cannot buy food on board.' },
            { id: 'E', text: 'Tickets are only sold at stations.' },
          ],
          questions: [
            { id: 'm3r-q25', number: 25, answer: { accepted: ['A'] }, explanation: { text: 'Border delays occur while locomotives are changed.', evidence: { paragraphId: 'G', quote: 'Trains can be delayed at borders while locomotives are changed' } } },
            { id: 'm3r-q26', number: 26, answer: { accepted: ['B'] }, explanation: { text: 'There are too few sleeping carriages to meet demand on popular routes.', evidence: { paragraphId: 'G', quote: 'There are too few sleeping carriages to meet demand on popular routes' } } },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 3
    {
      id: 'r3',
      number: 3,
      passage: {
        title: 'Should Children Learn a Second Language Early?',
        paragraphs: [
          {
            id: '1',
            text: 'In many countries, parents are keen for their children to learn a second language as early as possible. Some enrol toddlers in language classes, others choose schools that teach subjects in English or French from the first year, and a few move abroad so that their children grow up hearing two languages every day. Behind these choices lies a common belief: the earlier a child starts, the better the result will be. That belief is widely shared, but is it supported by the evidence? The answer, as this essay will argue, is more complicated than most parents expect.',
          },
          {
            id: '2',
            text: 'The case for starting early is based largely on the way young brains work. Young children are remarkably good at copying new sounds, and they often develop a natural accent that older learners find hard to achieve. They are also less self-conscious than teenagers, so they are more willing to speak and to make mistakes, and mistakes are an essential part of learning. Supporters of early learning point to adults who moved to another country as children and now speak the language of that country without a foreign accent, as proof that a young start makes a lasting difference.',
          },
          {
            id: '3',
            text: 'Research does offer some support for this view. In one long-term study, researchers followed children who had begun learning a second language before the age of seven and found that, many years later, they spoke with a more natural accent than children who had started after the age of twelve. The same study, however, found no clear advantage for the early starters in vocabulary or in the ability to write correctly. Pronunciation, it seems, is the area where an early start matters most, and even there the difference was modest rather than dramatic.',
          },
          {
            id: '4',
            text: 'Other research suggests that the starting age may matter less than the amount of exposure a child receives. Children who hear and use a second language for several hours every day progress far more quickly than children who have only one short lesson a week, whatever age they begin. A child who starts at eleven but speaks the language daily at home may soon overtake a child who started at five but rarely hears it outside school. In short, regular practice can matter more than an early start, and a late start with plenty of practice can be better than an early start with very little.',
          },
          {
            id: '5',
            text: 'There are also practical difficulties. Many primary schools have too few teachers who are able to teach a language well, and a teacher who is unsure of the language may pass on errors that are hard to correct later. Timetables are already crowded, and adding language lessons means taking time from other subjects, unless the school day is made longer. Some schools solve the problem by teaching other subjects, such as art or sport, through the second language, but that approach only works if the teachers are fluent and the children can follow the lesson.',
          },
          {
            id: '6',
            text: 'A further question concerns a child’s first language. For children from families who speak a minority language at home, school may be the main place where that language is used and valued. If a second language takes over too much of the school day, the first language may be neglected, and with it part of the child’s identity and family life. Supporters of early language learning sometimes overlook this risk, yet for these families it may be the most important issue of all. A good language programme, therefore, should protect time for the first language as well as introducing a second one.',
          },
          {
            id: '7',
            text: 'Where does this leave parents and schools? In my view, early learning is worthwhile, but only if it is done well. A few minutes of songs and games once a week will achieve little, whatever the age of the children. What matters is regular exposure, good teaching and a reason to use the language, whether that is talking to a grandparent, watching films or playing with friends from another country. Early learning should also be introduced without cutting time from other subjects, and without putting pressure on young children to perform.',
          },
          {
            id: '8',
            text: 'The real question, then, is not when children start, but how much good teaching and practice they receive. A child who starts at five and hears the language every day has a genuine advantage, but a child who starts at ten with a skilled teacher and a strong reason to learn can catch up quickly. Parents who want the best for their children should therefore ask not only how early a school starts, but how often the language is used, how well it is taught, and whether the child enjoys it. Age can help, but it is not a substitute for quality.',
          },
        ],
      },
      groups: [
        {
          id: 'm3r-g8',
          type: 'yes-no-not-given',
          instructions:
            'Do the following statements agree with the claims of the writer in Reading Passage 3? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
          questions: [
            {
              id: 'm3r-q27',
              number: 27,
              prompt: 'Many parents believe that starting a second language early will bring better results.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Parents act on the belief that the earlier a child starts, the better the result will be.', evidence: { paragraphId: '1', quote: 'the earlier a child starts, the better the result will be' } },
            },
            {
              id: 'm3r-q28',
              number: 28,
              prompt: 'Young children are usually less afraid than teenagers of making mistakes when they speak.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'Young children are less self-conscious than teenagers and more willing to speak and make mistakes.', evidence: { paragraphId: '2', quote: 'They are also less self-conscious than teenagers, so they are more willing to speak and to make mistakes' } },
            },
            {
              id: 'm3r-q29',
              number: 29,
              prompt: 'The writer believes that the age at which a child starts is the only factor that affects progress.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'The writer argues that regular practice can matter more than an early start.', evidence: { paragraphId: '4', quote: 'regular practice can matter more than an early start' } },
            },
            {
              id: 'm3r-q30',
              number: 30,
              prompt: 'Children who start a second language early always do better than other children in school examinations.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: {
                text: 'The study discussed looked at accent, vocabulary and writing, but said nothing about school examinations in general.',
                evidence: { paragraphId: '3', quote: 'found no clear advantage for the early starters in vocabulary or in the ability to write correctly' },
                distractors: { YES: 'The study found an advantage only for pronunciation, not for examinations.' },
              },
            },
            {
              id: 'm3r-q31',
              number: 31,
              prompt: 'The writer thinks schools should cut time from other subjects to make room for language lessons.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'The writer says early learning should be introduced without cutting time from other subjects.', evidence: { paragraphId: '7', quote: 'without cutting time from other subjects' } },
            },
          ],
        },
        {
          id: 'm3r-g9',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm3r-q32',
              number: 32,
              prompt: 'What does the long-term study described in paragraph 3 suggest?',
              options: [
                { id: 'A', text: 'Early starters had a larger vocabulary than late starters.' },
                { id: 'B', text: 'Early starters spoke with a more natural accent than late starters.' },
                { id: 'C', text: 'Early starters wrote more correctly than late starters.' },
                { id: 'D', text: 'Early starters learned faster in every area.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The early starters had a more natural accent, but no clear advantage in vocabulary or writing.',
                evidence: { paragraphId: '3', quote: 'they spoke with a more natural accent than children who had started after the age of twelve' },
                distractors: { A: 'The study found no clear advantage for early starters in vocabulary.' },
              },
            },
            {
              id: 'm3r-q33',
              number: 33,
              prompt: 'Why does the writer mention children who start at eleven in paragraph 4?',
              options: [
                { id: 'A', text: 'To show that daily use can matter more than starting age.' },
                { id: 'B', text: 'To argue that eleven is the best age to start.' },
                { id: 'C', text: 'To suggest that learning at home is harmful.' },
                { id: 'D', text: 'To prove that early starters always fall behind.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'A child starting at eleven with daily practice may overtake a child who started at five but rarely hears the language.',
                evidence: { paragraphId: '4', quote: 'A child who starts at eleven but speaks the language daily at home may soon overtake a child who started at five' },
                distractors: { B: 'No best age is given; the point is about exposure, not age.' },
              },
            },
            {
              id: 'm3r-q34',
              number: 34,
              prompt: 'According to the writer, what is a main practical problem for primary schools in paragraph 5?',
              options: [
                { id: 'A', text: 'Too few teachers are able to teach a language well.' },
                { id: 'B', text: 'Parents do not support language lessons.' },
                { id: 'C', text: 'Children dislike language lessons.' },
                { id: 'D', text: 'The school day is too short for sport.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Many primary schools have too few teachers who are able to teach a language well.',
                evidence: { paragraphId: '5', quote: 'Many primary schools have too few teachers who are able to teach a language well' },
              },
            },
            {
              id: 'm3r-q35',
              number: 35,
              prompt: 'Which of the following best summarises the writer’s view?',
              options: [
                { id: 'A', text: 'Early learning is useless.' },
                { id: 'B', text: 'Early learning is worthwhile only if it is regular, well taught and enjoyable.' },
                { id: 'C', text: 'Children should start a second language only after the age of twelve.' },
                { id: 'D', text: 'Schools should focus only on the first language.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'What matters is how much good teaching and practice children receive, not age alone.',
                evidence: { paragraphId: '8', quote: 'The real question, then, is not when children start, but how much good teaching and practice they receive' },
                distractors: { C: 'The writer says a child starting at ten can catch up quickly, not that children must wait until twelve.' },
              },
            },
          ],
        },
        {
          id: 'm3r-g10',
          type: 'matching-sentence-endings',
          instructions: 'Complete each sentence with the correct ending, A–H.',
          optionsTitle: 'List of Endings',
          options: [
            { id: 'A', text: 'often develop a more natural accent than those who start later.' },
            { id: 'B', text: 'the amount of time spent using the language mattered more than the starting age.' },
            { id: 'C', text: 'children may learn very little, whatever age they begin.' },
            { id: 'D', text: 'protect time for the first language as well as introducing a second one.' },
            { id: 'E', text: 'how much good teaching and practice they receive.' },
            { id: 'F', text: 'larger classes than other schools provide.' },
            { id: 'G', text: 'tasks that are as difficult as possible.' },
            { id: 'H', text: 'a longer school day for every pupil.' },
          ],
          questions: [
            { id: 'm3r-q36', number: 36, prompt: 'Children who begin a second language before the age of seven', answer: { accepted: ['A'] }, explanation: { text: 'They spoke with a more natural accent than children who started after twelve.', evidence: { paragraphId: '3', quote: 'they spoke with a more natural accent than children who had started after the age of twelve' } } },
            { id: 'm3r-q37', number: 37, prompt: 'Other research suggests that for young learners,', answer: { accepted: ['B'] }, explanation: { text: 'Children with several hours of daily exposure progress far more quickly than those with one short weekly lesson.', evidence: { paragraphId: '4', quote: 'Children who hear and use a second language for several hours every day progress far more quickly than children who have only one short lesson a week' } } },
            { id: 'm3r-q38', number: 38, prompt: 'If lessons are short and infrequent,', answer: { accepted: ['C'] }, explanation: { text: 'A few minutes of songs and games once a week will achieve little.', evidence: { paragraphId: '7', quote: 'A few minutes of songs and games once a week will achieve little' } } },
            { id: 'm3r-q39', number: 39, prompt: 'A good language programme should', answer: { accepted: ['D'] }, explanation: { text: 'A good programme should protect time for the first language as well as introducing a second one.', evidence: { paragraphId: '6', quote: 'should protect time for the first language as well as introducing a second one' } } },
            { id: 'm3r-q40', number: 40, prompt: 'The writer argues that the real question is not when children start, but', answer: { accepted: ['E'] }, explanation: { text: 'The real question is how much good teaching and practice children receive.', evidence: { paragraphId: '8', quote: 'The real question, then, is not when children start, but how much good teaching and practice they receive' } } },
          ],
        },
      ],
    },
  ],
};
