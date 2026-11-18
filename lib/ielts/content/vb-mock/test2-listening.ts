import type { ListeningAudio, ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 2 — Listening. Original content written for
 * Mino in the style and difficulty of the IELTS Listening test
 * (4 parts, 40 questions). Not Cambridge material.
 */
const rec = (partId: string) => recorded('vb-mock-2', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock2Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Booking a holiday cottage',
      audio: {
        intro: 'Part 1. You will hear a man phoning a holiday company to book a cottage. First, you have some time to look at questions 1 to 6.',
        noun: 'conversation',
        ...rec('l1'),
        // Questions 1–6 are answered by line 16; the break comes before the questions about what is included.
        sets: [
          { questions: '1 to 6', fromLine: 0 },
          { questions: '7 to 10', fromLine: 17 },
        ],
        script: [
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Good afternoon, Bramble Cove Cottages, Sophie speaking. How can I help?" },
          { speaker: 'Callum', voice: M, accent: 'en-GB', text: "Hello. I'd like to book a cottage for a week this summer, please. A colleague recommended one called Heron's Rest." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Lovely, that's a popular one. I'll just take a few details first. Could I have your name?" },
          { speaker: 'Callum', voice: M, accent: 'en-GB', text: "Yes, it's Callum Whitaker." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Could you spell your surname for me?" },
          { speaker: 'Callum', voice: M, accent: 'en-GB', text: "Sure. W, H, I, double T, A, K, E, R." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Thanks. And what's your postcode, so we can post out the confirmation?" },
          { speaker: 'Callum', voice: M, accent: 'en-GB', text: "It's B, R, four, seven, T, N." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Great. And a phone number, please?" },
          { speaker: 'Callum', voice: M, accent: 'en-GB', text: "Well, my landline's about to be disconnected, so please use my mobile. It's oh seven seven eight one, two six five, four nine three." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Oh seven seven eight one, two six five, four nine three. Perfect. Now, which dates were you thinking of?" },
          { speaker: 'Callum', voice: M, accent: 'en-GB', text: "I was hoping to arrive on the twelfth of July." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "I'm afraid Heron's Rest is taken that week. All our cottages change over on Saturdays, and the next free Saturday is the nineteenth of July. How many people are in your party?" },
          { speaker: 'Callum', voice: M, accent: 'en-GB', text: "The nineteenth is fine. There'll be five of us, two adults and three children." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Then Heron's Rest is too small, I'm afraid, because it only sleeps four. But the cottage next door, Kestrel, sleeps six, and it's free that week." },
          { speaker: 'Callum', voice: M, accent: 'en-GB', text: "Oh, that sounds ideal. We'll take Kestrel. How much is it for the week?" },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Normally it's five hundred and thirty pounds in July, but there's a discount for early bookings, so you'd pay four hundred and ninety-five." },
          { speaker: 'Callum', voice: M, accent: 'en-GB', text: "That's very reasonable. Does the price include everything?" },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "It includes heating and bed linen. Towels aren't provided, so you'd need to bring your own, and firewood can be bought at the farm shop if you want to use the stove." },
          { speaker: 'Callum', voice: M, accent: 'en-GB', text: "Good to know. We'd also like to bring our dog. Is that allowed?" },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Heron's Rest doesn't take pets at all, but Kestrel allows one dog, for an extra charge of thirty pounds." },
          { speaker: 'Callum', voice: M, accent: 'en-GB', text: "That's fine. How does the payment work?" },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "We take a deposit of twenty per cent today. The balance used to be due on arrival, but we changed that this year, so you pay the rest six weeks before you arrive." },
          { speaker: 'Callum', voice: M, accent: 'en-GB', text: "OK. And what about collecting the key? Do we have to call at the farm shop?" },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Some guests do, but the owners are away that month, so the key will be in a small safe by the cottage door. We'll text you the code the day before you travel." },
          { speaker: 'Callum', voice: M, accent: 'en-GB', text: "Brilliant, that's easier. What time can we get in on the Saturday?" },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "You can get in from four o'clock on the Saturday, and you need to leave by ten in the morning a week later. If you arrive early, there's a nice café in the village where you can wait." },
          { speaker: 'Callum', voice: M, accent: 'en-GB', text: "Lovely. Is there anywhere nearby for buying supplies when we get there?" },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "There's a small supermarket about two miles away, and the farm shop sells fresh bread and eggs every morning." },
          { speaker: 'Callum', voice: M, accent: 'en-GB', text: "Great. Right, shall I give you my card details now?" },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Yes, please, and then I'll send everything by post and by email. Thank you for choosing Bramble Cove, and I hope you have a lovely holiday." },
        ],
      },
      groups: [
        {
          id: 'm2l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 1, number: true },
          template:
            'BRAMBLE COVE COTTAGES – BOOKING FORM\nName: Callum {{1}}\nPostcode: {{2}}\nMobile: {{3}}\nArrival date: {{4}} July\nCottage booked: {{5}}\nPrice for the week: £{{6}}',
          questions: [
            { id: 'm2l-q1', number: 1, answer: { accepted: ['Whitaker'] }, explanation: { text: 'The surname is spelled out: W-H-I-double T-A-K-E-R.', evidence: { quote: 'W, H, I, double T, A, K, E, R.' } } },
            { id: 'm2l-q2', number: 2, answer: { accepted: ['BR4 7TN', 'BR47TN'] }, explanation: { text: 'The postcode is read out letter by letter and digit by digit.', evidence: { quote: "It's B, R, four, seven, T, N." } } },
            {
              id: 'm2l-q3',
              number: 3,
              answer: { accepted: ['07781 265493', '07781265493', '07781 265 493', '0778 1265493'] },
              explanation: { text: 'Callum asks for his mobile to be used because his landline is about to be disconnected.', evidence: { quote: "please use my mobile. It's oh seven seven eight one, two six five, four nine three." } },
            },
            {
              id: 'm2l-q4',
              number: 4,
              answer: { accepted: ['19', '19th', 'nineteenth'] },
              explanation: { text: 'The 12th is not available; the next free Saturday is the 19th.', evidence: { quote: 'the next free Saturday is the nineteenth of July' } },
            },
            {
              id: 'm2l-q5',
              number: 5,
              answer: { accepted: ['Kestrel'] },
              explanation: { text: "Heron's Rest is too small for five people, so Callum takes the cottage next door.", evidence: { quote: "We'll take Kestrel." } },
            },
            {
              id: 'm2l-q6',
              number: 6,
              answer: { accepted: ['495'] },
              explanation: { text: 'The normal price is £530, but the early-booking discount brings it to £495.', evidence: { quote: "so you'd pay four hundred and ninety-five" } },
            },
          ],
        },
        {
          id: 'm2l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm2l-q7',
              number: 7,
              prompt: 'Which of these is included in the price?',
              options: [
                { id: 'A', text: 'towels' },
                { id: 'B', text: 'bed linen' },
                { id: 'C', text: 'firewood' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Heating and bed linen are included.',
                evidence: { quote: 'It includes heating and bed linen.' },
                distractors: { A: 'Towels are not provided.', C: 'Firewood has to be bought at the farm shop.' },
              },
            },
            {
              id: 'm2l-q8',
              number: 8,
              prompt: 'What does the agent say about dogs?',
              options: [
                { id: 'A', text: 'They are not allowed in either cottage.' },
                { id: 'B', text: 'One dog is allowed for an extra fee.' },
                { id: 'C', text: 'They must be kept outdoors.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Kestrel allows one dog, for a charge of £30.',
                evidence: { quote: 'Kestrel allows one dog, for an extra charge of thirty pounds' },
                distractors: { A: "Only Heron's Rest refuses pets." },
              },
            },
            {
              id: 'm2l-q9',
              number: 9,
              prompt: 'When must the balance of the payment be made?',
              options: [
                { id: 'A', text: 'today' },
                { id: 'B', text: 'on the day of arrival' },
                { id: 'C', text: 'six weeks before arrival' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'The rule has changed: the balance is no longer paid on arrival.',
                evidence: { quote: 'so you pay the rest six weeks before you arrive' },
                distractors: { A: 'Only the 20 per cent deposit is paid today.', B: 'That was the old rule, changed this year.' },
              },
            },
            {
              id: 'm2l-q10',
              number: 10,
              prompt: 'Where will the key be?',
              options: [
                { id: 'A', text: 'at the farm shop' },
                { id: 'B', text: 'in a safe by the cottage door' },
                { id: 'C', text: 'with the owners' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Some guests use the farm shop, but this month the owners are away and the key is in a safe.',
                evidence: { quote: 'the key will be in a small safe by the cottage door' },
                distractors: { A: 'This is what some guests do, but not in July.', C: 'The owners are away that month.' },
              },
            },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 2
    {
      id: 'l2',
      number: 2,
      title: 'Marlow Bay Harbour Walk',
      audio: {
        intro: 'Part 2. You will hear a guide talking to a group of visitors at the start of a harbour walk. First, you have some time to look at questions 11 to 20.',
        noun: 'talk',
        ...rec('l2'),
        // Questions 11–14 are answered by line 4; the break comes before the route is described.
        sets: [
          { questions: '11 to 14', fromLine: 0 },
          { questions: '15 to 20', fromLine: 5 },
        ],
        script: [
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Good morning, everyone, and welcome to the Marlow Bay Harbour Walk. My name's Jack, and I'll be your guide today. Before we set off, let me tell you a bit about the place and about how the walk works." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Most visitors assume the harbour grew up around fishing, and fishing is certainly still part of life here. But it was the export of wool that made this town wealthy in the eighteen hundreds. Huge sheep stations inland sent their wool here, and ships carried it to England." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "For well over a century, big cargo ships used the harbour. That stopped in two thousand and ten. Some people blame the shallow water, but the channel has been dredged regularly, so that wasn't the problem. The real reason was that a much larger port was built twelve kilometres up the coast, and the shipping companies moved there." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "The old wharves could have fallen into ruin, but local people stepped in. A lottery grant paid for the repair of the Customs House, but the bulk of the money for the restoration, more than two million dollars, came from donations by residents and former residents." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "The leaflet says the walk takes two hours, but with a group of our size we'll manage it in about ninety minutes. It's mostly flat, so you don't need to worry about the paths." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Right, let's make a start at the Customs House, the sandstone building just behind me. It's now the Maritime Museum, and tickets cost eight dollars, which is well worth it for the model ships alone. Please stay together and keep to the marked path, and if you have any questions, just ask as we go along." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Next, we walk along to the Fish Quay. Fish is landed here early every morning, but the thing to remember is the Saturday market. Every Saturday from seven until noon, stalls fill the whole quay, selling everything from crabs to cheese." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Beyond the quay is the Boatshed. This used to be open only in the summer months, but it now operates all year, and you can hire rowing boats or kayaks by the hour if you fancy a paddle." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "At the end of the breakwater stands the Lighthouse. It's no longer in use, but climbing the hundred and twelve steps is worth it, because from the top you get the finest view in the whole bay, all the way to the headland on a clear day." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "On the way back, you'll see the Ferry Wharf. I'm sorry to say it's closed at the moment, because the timber decking is being replaced. It should reopen next month, and in the meantime the ferries leave from the jetty by the car park." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "By the way, if anyone needs the toilets, there are public ones next to the Fish Quay, and a small kiosk opposite the Boatshed where you can buy hot drinks and sandwiches." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Our last stop is the Memorial Garden, which honours sailors who were lost at sea. It's a peaceful spot, and there's no charge to go in, so do come back later if you'd like more time. Right, if you're all ready, let's begin." },
        ],
      },
      groups: [
        {
          id: 'm2l-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm2l-q11',
              number: 11,
              prompt: 'What made the town wealthy in the nineteenth century?',
              options: [
                { id: 'A', text: 'fishing' },
                { id: 'B', text: 'exporting wool' },
                { id: 'C', text: 'carrying passengers' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Wool exports, not fishing, made the town rich.',
                evidence: { quote: 'it was the export of wool that made this town wealthy in the eighteen hundreds' },
                distractors: { A: 'Fishing is still important, but it did not create the wealth.' },
              },
            },
            {
              id: 'm2l-q12',
              number: 12,
              prompt: 'Why did large cargo ships stop using the harbour?',
              options: [
                { id: 'A', text: 'The water had become too shallow.' },
                { id: 'B', text: 'The wharves were damaged.' },
                { id: 'C', text: 'A larger port had been built nearby.' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'The shipping companies moved to a bigger port up the coast.',
                evidence: { quote: 'a much larger port was built twelve kilometres up the coast' },
                distractors: { A: 'Some people blame shallow water, but the channel has been dredged.' },
              },
            },
            {
              id: 'm2l-q13',
              number: 13,
              prompt: 'Most of the money for the restoration came from',
              options: [
                { id: 'A', text: 'a lottery grant.' },
                { id: 'B', text: 'donations from local people.' },
                { id: 'C', text: 'museum tickets.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: '“The bulk of the money” = most of the money. The lottery grant covered only the Customs House repairs.',
                evidence: { quote: 'came from donations by residents and former residents' },
                distractors: { A: 'The grant paid only for the Customs House.' },
              },
            },
            {
              id: 'm2l-q14',
              number: 14,
              prompt: 'How long will today’s walk take?',
              options: [
                { id: 'A', text: 'one hour' },
                { id: 'B', text: 'ninety minutes' },
                { id: 'C', text: 'two hours' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The leaflet says two hours, but this small group will be quicker.',
                evidence: { quote: "we'll manage it in about ninety minutes" },
                distractors: { C: 'This is the time given in the leaflet, not today’s time.' },
              },
            },
          ],
        },
        {
          id: 'm2l-g4',
          type: 'matching',
          instructions: 'What is said about each of the following places on the walk? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 15–20.',
          optionsTitle: 'Features',
          options: [
            { id: 'A', text: 'It is now a museum.' },
            { id: 'B', text: 'It is closed for repairs.' },
            { id: 'C', text: 'It hosts a weekly market.' },
            { id: 'D', text: 'It offers the best view.' },
            { id: 'E', text: 'Visitors can hire boats there.' },
            { id: 'F', text: 'It is free to enter.' },
            { id: 'G', text: 'It is open only in summer.' },
            { id: 'H', text: 'It was rebuilt after a fire.' },
          ],
          questions: [
            { id: 'm2l-q15', number: 15, prompt: 'Customs House', answer: { accepted: ['A'] }, explanation: { text: 'It is now the Maritime Museum; tickets are not free.', evidence: { quote: "It's now the Maritime Museum" }, distractors: { F: 'Tickets cost eight dollars.' } } },
            { id: 'm2l-q16', number: 16, prompt: 'Fish Quay', answer: { accepted: ['C'] }, explanation: { text: 'A market fills the quay every Saturday.', evidence: { quote: 'the thing to remember is the Saturday market' } } },
            { id: 'm2l-q17', number: 17, prompt: 'Boatshed', answer: { accepted: ['E'] }, explanation: { text: 'Rowing boats and kayaks can be hired.', evidence: { quote: 'you can hire rowing boats or kayaks by the hour' }, distractors: { G: 'It used to open only in summer, but now operates all year.' } } },
            { id: 'm2l-q18', number: 18, prompt: 'Lighthouse', answer: { accepted: ['D'] }, explanation: { text: 'The view from the top is “the finest”.', evidence: { quote: 'from the top you get the finest view in the whole bay' } } },
            { id: 'm2l-q19', number: 19, prompt: 'Ferry Wharf', answer: { accepted: ['B'] }, explanation: { text: 'The decking is being replaced, so it is closed.', evidence: { quote: "it's closed at the moment, because the timber decking is being replaced" } } },
            { id: 'm2l-q20', number: 20, prompt: 'Memorial Garden', answer: { accepted: ['F'] }, explanation: { text: '“No charge to go in” = free to enter.', evidence: { quote: "there's no charge to go in" } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Tutorial on a field study report',
      audio: {
        intro: 'Part 3. You will hear a biology student, Priya, discussing a draft field study report with her tutor, Dr Hayes. First, you have some time to look at questions 21 to 30.',
        noun: 'discussion',
        ...rec('l3'),
        // Questions 21–25 are answered by line 10; the break comes before the report is reviewed section by section.
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 11 },
        ],
        script: [
          { speaker: 'Dr Hayes', voice: M, accent: 'en-GB', text: "Come in, Priya. Right, I've had a look at the draft of your field study report. Before we go through it, remind me what made you choose roadside verges? Was it something from my lecture on grassland?" },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "Partly, but not really. Your lecture helped with the background, but the idea itself came from my daily cycle to campus. Some verges are left uncut and some are mown every few weeks, and I noticed how different the flowers looked." },
          { speaker: 'Dr Hayes', voice: M, accent: 'en-GB', text: "Good, I like a project that grows out of real observation. And the fieldwork itself? You planned twelve sites, didn't you?" },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "Yes, but I only managed eight in the end. The council gave me permission without any trouble, and the equipment was fine, but there was so much rain in May that I couldn't get to the others before the grass was cut." },
          { speaker: 'Dr Hayes', voice: M, accent: 'en-GB', text: "That's a pity, but eight is acceptable if you say so clearly. Now, the quadrats. You used half-metre squares." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "I wondered if one-metre quadrats would have been better. And whether I put them too near the road." },
          { speaker: 'Dr Hayes', voice: M, accent: 'en-GB', text: "No, half a metre is perfectly suitable for vegetation of this height, and you kept a sensible distance from the traffic. So that's fine." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "Oh, good. What surprised me most was the results. I'd assumed the verges that were never cut would have the most species, but the ones mown once a year had more." },
          { speaker: 'Dr Hayes', voice: M, accent: 'en-GB', text: "Which is a well-known pattern, actually, though it's nice that you found it yourself. I wonder if soil type might explain some of it. Have you checked the council's soil maps?" },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "No, I haven't. I thought about repeating the survey in autumn, to see if that changes things." },
          { speaker: 'Dr Hayes', voice: M, accent: 'en-GB', text: "There isn't time for that before the deadline. Use the soil maps instead. They're free online, and it would strengthen your discussion considerably." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "OK, I'll do that. Shall we go through the report section by section?" },
          { speaker: 'Dr Hayes', voice: M, accent: 'en-GB', text: "Yes. The introduction first. You make several claims about pollinators, but you don't cite anything. You need to add some references there." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "I thought it might be too long, to be honest." },
          { speaker: 'Dr Hayes', voice: M, accent: 'en-GB', text: "No, the length is about right. Then the site description. Readers can't picture where your eight sites are, so a map would help enormously." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "I do have one from the council website. Is that allowed?" },
          { speaker: 'Dr Hayes', voice: M, accent: 'en-GB', text: "As long as you acknowledge the source. Now the methods. You chose your sites along the cycle route, but you don't say why. You should explain your reasoning in a sentence or two." },
          { speaker: 'Dr Hayes', voice: M, accent: 'en-GB', text: "The results are where I have the biggest concern. You've used a pie chart to compare species numbers across sites, and that really doesn't work. A bar chart would be much clearer." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "I'll change it. I wasn't sure about the long tables of raw counts. They take up three pages." },
          { speaker: 'Dr Hayes', voice: M, accent: 'en-GB', text: "Move those to an appendix, and keep only a summary table in the main text. Right, send me a revised draft by Friday." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "I will. Thanks very much, Dr Hayes." },
        ],
      },
      groups: [
        {
          id: 'm2l-g5',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm2l-q21',
              number: 21,
              prompt: 'Why did Priya choose roadside verges for her study?',
              options: [
                { id: 'A', text: 'She wanted to follow up a point from a lecture.' },
                { id: 'B', text: 'A friend suggested the idea.' },
                { id: 'C', text: 'She had noticed differences herself.' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'The idea came from seeing different verges on her daily cycle.',
                evidence: { quote: 'I noticed how different the flowers looked' },
                distractors: { A: 'The lecture helped with the background only; “partly, but not really”.' },
              },
            },
            {
              id: 'm2l-q22',
              number: 22,
              prompt: 'What problem affected Priya’s fieldwork?',
              options: [
                { id: 'A', text: 'bad weather' },
                { id: 'B', text: 'difficulty getting permission' },
                { id: 'C', text: 'faulty equipment' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Heavy rain in May meant she could visit only eight of twelve sites.',
                evidence: { quote: 'there was so much rain in May' },
                distractors: { B: 'The council gave permission without trouble.', C: 'The equipment was fine.' },
              },
            },
            {
              id: 'm2l-q23',
              number: 23,
              prompt: 'What does Dr Hayes say about the quadrats Priya used?',
              options: [
                { id: 'A', text: 'They were a suitable size.' },
                { id: 'B', text: 'They were too close to the road.' },
                { id: 'C', text: 'There were not enough of them.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'He says half a metre was perfectly suitable and the distance from traffic was sensible.',
                evidence: { quote: 'half a metre is perfectly suitable for vegetation of this height' },
                distractors: { B: 'Priya wondered about this, but Dr Hayes says the distance was sensible.' },
              },
            },
            {
              id: 'm2l-q24',
              number: 24,
              prompt: 'What surprised Priya about her results?',
              options: [
                { id: 'A', text: 'Uncut verges had the most species.' },
                { id: 'B', text: 'Verges mown once a year had the most species.' },
                { id: 'C', text: 'There was no difference between the sites.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'She had expected uncut verges to be richest, but verges mown once a year had more species.',
                evidence: { quote: 'the ones mown once a year had more' },
                distractors: { A: 'This is what she had assumed, not what she found.' },
              },
            },
            {
              id: 'm2l-q25',
              number: 25,
              prompt: 'What does Dr Hayes advise Priya to do next?',
              options: [
                { id: 'A', text: 'repeat the survey in autumn' },
                { id: 'B', text: 'ask a statistician for help' },
                { id: 'C', text: 'look at information about soil' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'He suggests the free online soil maps. Repeating the survey is Priya’s idea, which he rejects.',
                evidence: { quote: 'Use the soil maps instead.' },
                distractors: { A: 'There is not enough time before the deadline.' },
              },
            },
          ],
        },
        {
          id: 'm2l-g6',
          type: 'matching',
          instructions: 'What advice does Dr Hayes give about each part of the report? Choose FIVE answers from the box and write the correct letter, A–F, next to Questions 26–30.',
          optionsTitle: 'Advice',
          options: [
            { id: 'A', text: 'include a map' },
            { id: 'B', text: 'make it shorter' },
            { id: 'C', text: 'add references' },
            { id: 'D', text: 'move it to an appendix' },
            { id: 'E', text: 'explain a decision' },
            { id: 'F', text: 'use a different type of chart' },
          ],
          questions: [
            { id: 'm2l-q26', number: 26, prompt: 'introduction', answer: { accepted: ['C'] }, explanation: { text: 'Her claims about pollinators are not supported by any citations.', evidence: { quote: 'You need to add some references there.' }, distractors: { B: 'Priya thinks it may be too long, but the length is about right.' } } },
            { id: 'm2l-q27', number: 27, prompt: 'description of the sites', answer: { accepted: ['A'] }, explanation: { text: 'Readers cannot picture where the sites are.', evidence: { quote: 'a map would help enormously' } } },
            { id: 'm2l-q28', number: 28, prompt: 'methods', answer: { accepted: ['E'] }, explanation: { text: 'She does not say why she chose sites along the cycle route.', evidence: { quote: 'You should explain your reasoning in a sentence or two.' } } },
            { id: 'm2l-q29', number: 29, prompt: 'results', answer: { accepted: ['F'] }, explanation: { text: 'A pie chart does not suit the comparison; a bar chart would be clearer.', evidence: { quote: 'A bar chart would be much clearer.' } } },
            { id: 'm2l-q30', number: 30, prompt: 'tables of raw counts', answer: { accepted: ['D'] }, explanation: { text: 'The long tables go in an appendix, with only a summary table in the main text.', evidence: { quote: 'Move those to an appendix' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Lecture: what we know about sleep',
      audio: {
        intro: 'Part 4. You will hear a lecture about sleep research. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Good morning. Today's lecture is about sleep, something we spend about a third of our lives doing, yet which scientists understood very poorly until quite recently. In the next half hour I'll look at the history of sleep research, at what happens during the night, and at what the consequences of poor sleep can be." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "For most of history, and well into the nineteen-fifties, sleep was regarded as a passive state, a kind of daily shutdown in which the brain simply switched off. That view changed in nineteen fifty-three, when a researcher in Chicago noticed that sleeping volunteers sometimes showed rapid eye movements. By recording these, the team discovered REM sleep, a stage in which the brain is almost as active as when we are awake." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "A night's sleep is not a single block. It is made up of cycles, each lasting roughly ninety minutes, and most adults pass through four or five cycles every night. Dreaming is most vivid during REM sleep, and during this stage the body's muscles are temporarily paralysed, which prevents us from acting out our dreams." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "So what is sleep for? Several explanations exist. During deep sleep, which dominates the first half of the night, the body repairs tissue and strengthens the immune system. Memory is another important function. In one well-known experiment, students who learned a list of vocabulary and then slept performed far better the next day than those who stayed awake, even though both groups had the same amount of time to study." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "The costs of too little sleep are serious. Most people notice they feel irritable, but the most dangerous effect is on concentration. Studies of drivers show that after being awake for eighteen hours, reaction times become as poor as if they had been drinking alcohol." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Teenagers deserve a special mention. During adolescence the body clock shifts, so that young people naturally fall asleep later than children or adults, and also wake later. Some schools have responded by starting lessons an hour later, and the main benefit they report is better attendance, though exam results have also improved slightly." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "A short word about naps. A nap of twenty minutes can improve alertness, but longer naps often leave people feeling groggy, because they wake from deep sleep. For that reason, some employers now provide quiet rooms where staff can rest briefly during the working day." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Finally, some practical advice. Many people believe a hot drink or a glass of wine helps them sleep, but the evidence is weak. What does seem to matter is avoiding bright screens in the hour before bed, because the light delays the release of melatonin, the hormone that makes us feel sleepy. That's all for today." },
        ],
      },
      groups: [
        {
          id: 'm2l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'SLEEP RESEARCH\nEarly views\n• until the 1950s, sleep was thought to be a {{31}} state\n• 1953: REM sleep discovered by recording {{32}} movements\nThe sleep cycle\n• each cycle lasts about {{33}} minutes\n• in REM sleep the body’s {{34}} are temporarily paralysed\nFunctions of sleep\n• during deep sleep the body repairs {{35}}\n• students who slept after learning {{36}} remembered more\n• lack of sleep mainly affects {{37}}, especially in drivers\nTeenagers\n• body clock means teenagers fall asleep {{38}} than adults\n• schools with later starts report better {{39}}\nAdvice\n• avoid screens before bed: light delays the release of {{40}}',
          questions: [
            { id: 'm2l-q31', number: 31, answer: { accepted: ['passive'] }, explanation: { text: 'Sleep was seen as a passive state, a shutdown of the brain.', evidence: { quote: 'sleep was regarded as a passive state' } } },
            { id: 'm2l-q32', number: 32, answer: { accepted: ['eye', 'eyes'] }, explanation: { text: 'The researchers recorded the rapid eye movements of sleepers.', evidence: { quote: 'sleeping volunteers sometimes showed rapid eye movements' } } },
            { id: 'm2l-q33', number: 33, answer: { accepted: ['ninety', '90'] }, explanation: { text: 'Each cycle lasts roughly ninety minutes; the four or five cycles are a different figure.', evidence: { quote: 'each lasting roughly ninety minutes' } } },
            { id: 'm2l-q34', number: 34, answer: { accepted: ['muscles'] }, explanation: { text: 'The muscles are paralysed so we do not act out our dreams.', evidence: { quote: "the body's muscles are temporarily paralysed" } } },
            { id: 'm2l-q35', number: 35, answer: { accepted: ['tissue', 'tissues'] }, explanation: { text: 'Deep sleep repairs tissue and strengthens the immune system.', evidence: { quote: 'the body repairs tissue' } } },
            { id: 'm2l-q36', number: 36, answer: { accepted: ['vocabulary'] }, explanation: { text: 'Students who slept after learning a list of vocabulary did better.', evidence: { quote: 'students who learned a list of vocabulary and then slept performed far better' } } },
            { id: 'm2l-q37', number: 37, answer: { accepted: ['concentration'] }, explanation: { text: 'Irritability is mentioned, but concentration is “the most dangerous effect”.', evidence: { quote: 'the most dangerous effect is on concentration' } } },
            { id: 'm2l-q38', number: 38, answer: { accepted: ['later'] }, explanation: { text: 'The body clock shifts so teenagers naturally fall asleep later.', evidence: { quote: 'young people naturally fall asleep later than children or adults' } } },
            { id: 'm2l-q39', number: 39, answer: { accepted: ['attendance'] }, explanation: { text: 'Better attendance is the main benefit; exam results improved only slightly.', evidence: { quote: 'the main benefit they report is better attendance' } } },
            { id: 'm2l-q40', number: 40, answer: { accepted: ['melatonin'] }, explanation: { text: 'Screen light delays the release of melatonin.', evidence: { quote: 'the light delays the release of melatonin' } } },
          ],
        },
      ],
    },
  ],
};
