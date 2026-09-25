import type { PracticeTest } from '../../model';

/**
 * Vocab Brain Practice Test 1: original content written for Vocab Brain in an
 * IELTS Academic style. Used to develop and test the engine; not Cambridge material.
 */
export const practiceTest1: PracticeTest = {
  id: 'vb-practice-1',
  bookId: 'vb-practice',
  number: 1,
  title: 'Practice Test 1',
  module: 'academic',
  source: 'Vocab Brain',
  sourceType: 'vocab-brain-original',
  licenseStatus: 'original',
  dateAdded: '2026-09-26',
  sections: {
    reading: {
      skill: 'reading',
      timeLimitMinutes: 40,
      parts: [
        {
          id: 'r1',
          number: 1,
          passage: {
            title: 'Farming Above the Streets',
            paragraphs: [
              {
                id: 'A',
                labelled: true,
                text: 'In many crowded cities, the only unused land is found high above the streets. Over the past two decades, rooftop farms have appeared on warehouses, schools and apartment blocks from Singapore to New York. Supporters argue that these farms can shorten the distance between producer and consumer, since vegetables grown on a roof may be sold in a shop on the ground floor of the same building.',
              },
              {
                id: 'B',
                labelled: true,
                text: 'Building a farm on a roof, however, is far from simple. Engineers must first confirm that the structure can carry the extra weight of soil, water and equipment. Wet soil is surprisingly heavy, and many older buildings were never designed to support it. For this reason, a large number of rooftop growers use lightweight growing mixtures or hydroponic systems, in which plants grow in water enriched with nutrients rather than in soil.',
              },
              {
                id: 'C',
                labelled: true,
                text: "The environmental benefits have been studied closely. A layer of plants acts as insulation, keeping the rooms below cooler in summer. Researchers in Montreal found that a planted roof reduced the building's summer energy use for cooling by roughly a quarter. Plants also absorb rainwater, which lowers the risk of city drains overflowing during heavy storms.",
              },
              {
                id: 'D',
                labelled: true,
                text: 'Yet the economic picture is less encouraging. Most rooftop farms produce relatively small harvests, and the cost of installation is high. Many of the best-known projects depend on grants from city governments or on selling premium produce to restaurants. A study of farms in three American cities found that fewer than half made a profit within their first five years.',
              },
              {
                id: 'E',
                labelled: true,
                text: 'For this reason, some experts believe the true value of rooftop farming lies in education rather than food production. Schools that run rooftop gardens report that pupils become more willing to try fresh vegetables, and community farms often offer workshops on cooking and nutrition. In this sense, the farms may change how city residents think about food, even if they never feed a city.',
              },
            ],
          },
          groups: [
            {
              id: 'r1-g1',
              type: 'matching-headings',
              instructions: 'Reading Passage 1 has five paragraphs, A–E. Choose the correct heading for paragraphs B–E from the list of headings below.',
              optionsTitle: 'List of Headings',
              options: [
                { id: 'i', text: 'A lesson in more than growing food' },
                { id: 'ii', text: 'The weight problem and how growers avoid it' },
                { id: 'iii', text: 'Why rooftop farms are spreading' },
                { id: 'iv', text: 'Benefits for the building and the city' },
                { id: 'v', text: 'Struggling to pay their way' },
                { id: 'vi', text: 'A short history of city farming' },
                { id: 'vii', text: 'Choosing the right vegetables' },
              ],
              questions: [
                {
                  id: 'r1-q1',
                  number: 1,
                  prompt: 'Paragraph B',
                  answer: { accepted: ['ii'] },
                  explanation: {
                    text: 'The paragraph is about whether roofs can carry the weight, and the lighter systems growers use instead of soil.',
                    evidence: { paragraphId: 'B', quote: 'Engineers must first confirm that the structure can carry the extra weight of soil, water and equipment.' },
                  },
                },
                {
                  id: 'r1-q2',
                  number: 2,
                  prompt: 'Paragraph C',
                  answer: { accepted: ['iv'] },
                  explanation: {
                    text: 'Insulation helps the building; absorbing rainwater helps the city’s drains. Both are environmental benefits.',
                    evidence: { paragraphId: 'C', quote: 'The environmental benefits have been studied closely.' },
                  },
                },
                {
                  id: 'r1-q3',
                  number: 3,
                  prompt: 'Paragraph D',
                  answer: { accepted: ['v'] },
                  explanation: {
                    text: 'The main idea is money: small harvests, high costs, dependence on grants, few profitable farms. “Pay their way” means earn enough to cover costs.',
                    evidence: { paragraphId: 'D', quote: 'Yet the economic picture is less encouraging.' },
                  },
                },
                {
                  id: 'r1-q4',
                  number: 4,
                  prompt: 'Paragraph E',
                  answer: { accepted: ['i'] },
                  explanation: {
                    text: 'The paragraph argues the farms’ value is education, not food production.',
                    evidence: { paragraphId: 'E', quote: 'the true value of rooftop farming lies in education rather than food production' },
                    distractors: { iii: 'Paragraph A, not E, explains where rooftop farms have appeared.' },
                  },
                },
              ],
            },
            {
              id: 'r1-g2',
              type: 'true-false-not-given',
              instructions:
                'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
              questions: [
                {
                  id: 'r1-q5',
                  number: 5,
                  prompt: 'In hydroponic systems, plants are grown without soil.',
                  answer: { accepted: ['TRUE'] },
                  explanation: {
                    text: 'The passage says plants grow “in water … rather than in soil”, which means the same as “without soil”.',
                    evidence: { paragraphId: 'B', quote: 'plants grow in water enriched with nutrients rather than in soil' },
                  },
                },
                {
                  id: 'r1-q6',
                  number: 6,
                  prompt: 'The Montreal study found that a planted roof cut the energy used for summer cooling by about 25 percent.',
                  answer: { accepted: ['TRUE'] },
                  explanation: {
                    text: '“Roughly a quarter” is a paraphrase of “about 25 percent”.',
                    evidence: { paragraphId: 'C', quote: "reduced the building's summer energy use for cooling by roughly a quarter" },
                  },
                },
                {
                  id: 'r1-q7',
                  number: 7,
                  prompt: 'More than half of the farms in the American study made a profit within five years.',
                  answer: { accepted: ['FALSE'] },
                  explanation: {
                    text: 'The passage says fewer than half made a profit, so the statement contradicts it.',
                    evidence: { paragraphId: 'D', quote: 'fewer than half made a profit within their first five years' },
                  },
                },
                {
                  id: 'r1-q8',
                  number: 8,
                  prompt: 'Restaurants prefer vegetables from rooftop farms to vegetables from traditional farms.',
                  answer: { accepted: ['NOT GIVEN'] },
                  explanation: {
                    text: 'Restaurants buy premium produce from rooftop farms, but the passage never compares this with traditional farms.',
                    evidence: { paragraphId: 'D', quote: 'selling premium produce to restaurants' },
                    distractors: { TRUE: 'Selling to restaurants does not mean restaurants prefer it.' },
                  },
                },
              ],
            },
            {
              id: 'r1-g3',
              type: 'summary-completion',
              instructions: 'Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.',
              wordLimit: { words: 1 },
              template:
                'Rooftop farms can help keep buildings cool because plants work as a form of {{9}}. They also take in {{10}}, which reduces pressure on city drains. However, installation is expensive, and many projects rely on {{11}} from local governments. Some experts argue that the farms’ main value is {{12}}.',
              questions: [
                {
                  id: 'r1-q9',
                  number: 9,
                  answer: { accepted: ['insulation'] },
                  explanation: { text: '“Keep buildings cool” matches “keeping the rooms below cooler”.', evidence: { paragraphId: 'C', quote: 'A layer of plants acts as insulation' } },
                },
                {
                  id: 'r1-q10',
                  number: 10,
                  answer: { accepted: ['rainwater'] },
                  explanation: { text: '“Take in” is a paraphrase of “absorb”.', evidence: { paragraphId: 'C', quote: 'Plants also absorb rainwater' } },
                },
                {
                  id: 'r1-q11',
                  number: 11,
                  answer: { accepted: ['grants'] },
                  explanation: { text: '“Rely on” matches “depend on”; “local governments” matches “city governments”.', evidence: { paragraphId: 'D', quote: 'depend on grants from city governments' } },
                },
                {
                  id: 'r1-q12',
                  number: 12,
                  answer: { accepted: ['education'] },
                  explanation: { text: '“Main value” matches “true value”.', evidence: { paragraphId: 'E', quote: 'the true value of rooftop farming lies in education' } },
                },
              ],
            },
          ],
        },
        {
          id: 'r2',
          number: 2,
          passage: {
            title: 'The Bicycle’s Long Road',
            paragraphs: [
              {
                id: '1',
                text: 'The first machine recognised as a bicycle appeared in Germany in 1817. Invented by Karl Drais, the “running machine” had two wheels but no pedals; riders pushed it along with their feet. It was made almost entirely of wood and attracted attention mainly as a fashionable novelty for wealthy young men.',
              },
              {
                id: '2',
                text: 'Pedals arrived in the 1860s, when French makers attached them directly to the front wheel. Because one turn of the pedals produced one turn of the wheel, designers made the front wheel larger and larger to increase speed. The result was the high-wheeler, whose front wheel could be more than 1.5 metres tall. Riding it was exciting but dangerous: a small stone could throw the rider forward over the handlebars.',
              },
              {
                id: '3',
                text: 'The so-called safety bicycle, introduced in England in 1885, solved this problem. It used a chain to connect the pedals to the rear wheel, which meant that both wheels could be the same modest size. Soon afterwards, air-filled rubber tyres made riding far more comfortable. By the 1890s, cycling had become a craze in Europe and North America.',
              },
              {
                id: '4',
                text: 'Historians argue that the bicycle’s social effects were remarkable. For the first time, ordinary workers could travel several kilometres to find jobs without paying for a horse or a train ticket. The bicycle also gave many women a new independence, and it encouraged changes in clothing, as long skirts were replaced by more practical designs.',
              },
              {
                id: '5',
                text: 'Today, city planners are rediscovering the bicycle. Dedicated cycle lanes, bike-sharing schemes and electric bicycles have made cycling attractive to people who would once have driven. However, planners warn that infrastructure alone is not enough; people also need to feel safe on the road before they will change their habits.',
              },
            ],
          },
          groups: [
            {
              id: 'r2-g1',
              type: 'multiple-choice',
              instructions: 'Choose the correct letter, A, B, C or D.',
              questions: [
                {
                  id: 'r2-q13',
                  number: 13,
                  prompt: 'The first bicycle, built in 1817,',
                  options: [
                    { id: 'A', text: 'had pedals attached to the front wheel.' },
                    { id: 'B', text: 'was moved by the rider’s feet on the ground.' },
                    { id: 'C', text: 'was popular with factory workers.' },
                    { id: 'D', text: 'was made mainly of metal.' },
                  ],
                  answer: { accepted: ['B'] },
                  explanation: {
                    text: 'Riders “pushed it along with their feet”.',
                    evidence: { paragraphId: '1', quote: 'riders pushed it along with their feet' },
                    distractors: { A: 'Pedals on the front wheel came in the 1860s.', C: 'It was a novelty for wealthy young men.', D: 'It was made almost entirely of wood.' },
                  },
                },
                {
                  id: 'r2-q14',
                  number: 14,
                  prompt: 'Why did designers make the front wheel of the high-wheeler larger?',
                  options: [
                    { id: 'A', text: 'to make the bicycle safer' },
                    { id: 'B', text: 'to carry heavier riders' },
                    { id: 'C', text: 'to increase speed' },
                    { id: 'D', text: 'to reduce the cost' },
                  ],
                  answer: { accepted: ['C'] },
                  explanation: {
                    text: 'One pedal turn equalled one wheel turn, so a bigger wheel went further, and faster, with each turn.',
                    evidence: { paragraphId: '2', quote: 'designers made the front wheel larger and larger to increase speed' },
                    distractors: { A: 'The high-wheeler was dangerous, not safer.' },
                  },
                },
                {
                  id: 'r2-q15',
                  number: 15,
                  prompt: 'What does the writer say about city planners today?',
                  options: [
                    { id: 'A', text: 'They believe cycle lanes are all that is needed.' },
                    { id: 'B', text: 'They think electric bicycles are dangerous.' },
                    { id: 'C', text: 'They recognise that people must feel safe.' },
                    { id: 'D', text: 'They want to ban cars from city centres.' },
                  ],
                  answer: { accepted: ['C'] },
                  explanation: {
                    text: 'Planners say people “need to feel safe on the road”.',
                    evidence: { paragraphId: '5', quote: 'people also need to feel safe on the road before they will change their habits' },
                    distractors: { A: 'The opposite: “infrastructure alone is not enough”.' },
                  },
                },
              ],
            },
            {
              id: 'r2-g2',
              type: 'multiple-choice-multi',
              instructions: 'Choose TWO letters, A–E.',
              stem: 'Which TWO social effects of the bicycle are mentioned in the passage?',
              choose: 2,
              options: [
                { id: 'A', text: 'Workers could look for jobs further from home.' },
                { id: 'B', text: 'Train companies lost passengers.' },
                { id: 'C', text: 'Women gained more independence.' },
                { id: 'D', text: 'Horses were no longer used in cities.' },
                { id: 'E', text: 'Roads were built to a higher standard.' },
              ],
              questions: [
                {
                  id: 'r2-q16',
                  number: 16,
                  answer: { accepted: ['A'] },
                  explanation: { text: 'Workers could travel several kilometres to find jobs.', evidence: { paragraphId: '4', quote: 'ordinary workers could travel several kilometres to find jobs' }, distractors: { B: 'Train tickets are mentioned, but not lost passengers.' } },
                },
                {
                  id: 'r2-q17',
                  number: 17,
                  answer: { accepted: ['C'] },
                  explanation: { text: 'The bicycle gave many women a new independence.', evidence: { paragraphId: '4', quote: 'The bicycle also gave many women a new independence' } },
                },
              ],
            },
            {
              id: 'r2-g3',
              type: 'sentence-completion',
              instructions: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.',
              wordLimit: { words: 2, number: true },
              questions: [
                {
                  id: 'r2-q18',
                  number: 18,
                  prompt: 'The running machine was invented by ___.',
                  answer: { accepted: ['(Karl) Drais'] },
                  explanation: { text: 'The inventor is named in the first paragraph.', evidence: { paragraphId: '1', quote: 'Invented by Karl Drais' } },
                },
                {
                  id: 'r2-q19',
                  number: 19,
                  prompt: 'On the safety bicycle, a ___ linked the pedals to the back wheel.',
                  answer: { accepted: ['chain'] },
                  explanation: { text: '“Linked” is a paraphrase of “connect”; “back wheel” of “rear wheel”.', evidence: { paragraphId: '3', quote: 'It used a chain to connect the pedals to the rear wheel' } },
                },
                {
                  id: 'r2-q20',
                  number: 20,
                  prompt: 'Riding became more comfortable after the introduction of ___.',
                  answer: { accepted: ['(rubber) tyres', '(rubber) tires', 'air-filled tyres', 'air-filled tires'] },
                  explanation: {
                    text: '“Air-filled rubber tyres” is three words, so it breaks the limit; “rubber tyres” or “air-filled tyres” fits.',
                    evidence: { paragraphId: '3', quote: 'air-filled rubber tyres made riding far more comfortable' },
                  },
                },
              ],
            },
            {
              id: 'r2-g4',
              type: 'table-completion',
              instructions: 'Complete the table below. Choose ONE WORD AND/OR A NUMBER from the passage for each answer.',
              wordLimit: { words: 1, number: true },
              table: {
                headers: ['Design', 'Date', 'Key feature'],
                rows: [
                  ['Running machine', '{{21}}', 'no pedals'],
                  ['High-wheeler', '1860s onwards', 'very large {{22}} wheel'],
                  ['Safety bicycle', '{{23}}', 'chain drive, same-sized wheels'],
                  ['Cycling craze', '{{24}}', 'Europe and North America'],
                ],
              },
              questions: [
                { id: 'r2-q21', number: 21, answer: { accepted: ['1817'] }, explanation: { text: 'The first bicycle appeared in 1817.', evidence: { paragraphId: '1', quote: 'appeared in Germany in 1817' } } },
                { id: 'r2-q22', number: 22, answer: { accepted: ['front'] }, explanation: { text: 'Designers made the front wheel larger.', evidence: { paragraphId: '2', quote: 'designers made the front wheel larger and larger' } } },
                { id: 'r2-q23', number: 23, answer: { accepted: ['1885'] }, explanation: { text: 'The safety bicycle was introduced in 1885.', evidence: { paragraphId: '3', quote: 'introduced in England in 1885' } } },
                { id: 'r2-q24', number: 24, answer: { accepted: ['1890s'] }, explanation: { text: 'Cycling became a craze by the 1890s.', evidence: { paragraphId: '3', quote: 'By the 1890s, cycling had become a craze' } } },
              ],
            },
          ],
        },
      ],
    },
    writing: {
      skill: 'writing',
      timeLimitMinutes: 60,
      tasks: [
        {
          id: 'w1',
          task: 1,
          prompt:
            'The table below shows the percentage of journeys made by bicycle in four cities in 2005 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
          minWords: 150,
          suggestedMinutes: 20,
        },
        {
          id: 'w2',
          task: 2,
          prompt:
            'Some people believe that cities should use rooftops to grow food, while others think rooftops should be used for solar panels. Discuss both views and give your own opinion.',
          minWords: 250,
          suggestedMinutes: 40,
        },
      ],
    },
    speaking: {
      skill: 'speaking',
      parts: [
        { id: 's1', part: 1, topic: 'Your neighbourhood', questions: ['Where do you live?', 'What do you like about your neighbourhood?', 'Is it easy to get around by bicycle where you live?'] },
        {
          id: 's2',
          part: 2,
          topic: 'A useful skill',
          questions: [],
          cueCard: {
            task: 'Describe a useful skill you learned as a child.',
            points: ['what the skill is', 'who taught you', 'how you learned it'],
            closing: 'and explain why it is useful to you.',
          },
          prepSeconds: 60,
          speakSeconds: 120,
        },
        { id: 's3', part: 3, topic: 'Learning skills', questions: ['Which skills should schools teach that they do not teach now?', 'Is it better to learn practical skills from parents or from teachers?'] },
      ],
    },
  },
};
