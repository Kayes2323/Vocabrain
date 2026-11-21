import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 10 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material. Final test of the Easy Series 1–10.
 *
 * Content: booking a ferry journey (Part 1), an introduction to a public
 * library (Part 2), two university students organising a charity book fair
 * (Part 3), a lecture on the formation and development of volcanic islands
 * (Part 4).
 *
 * DEFECT FOUND IN THE SUPPLIED PACKAGE — fixed minimally, with reporting
 * (do not silently change): Q10. The package's answer key says C ("Return
 * the following day"), but the transcript says "please remain in the
 * terminal and wait for an announcement" — the correct answer is A ("Wait
 * for an announcement"). The package's own QC table even cites "Wait for
 * an announcement" as the evidence for Q10 while listing C as the answer.
 * Implemented as A.
 *
 * Q31: the package also listed "the Earth's crust" as an accepted answer,
 * but that is three words under a two-word limit, so the scorer could only
 * ever reject it. The alternative was dropped; "Earth's crust" stands.
 */

const rec = (partId: string) => recorded('vb-mock-10', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock10Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Booking a ferry journey',
      audio: {
        intro: 'Part 1. You will hear a passenger phoning a ferry company to book a journey. First, you have some time to look at questions 1 to 10.',
        noun: 'conversation',
        ...rec('l1'),
        // Questions 1–5 are answered by line 13; the break comes before the departure time.
        sets: [
          { questions: '1 to 5', fromLine: 0 },
          { questions: '6 to 10', fromLine: 14 },
        ],
        script: [
          { speaker: 'Booking officer', voice: W, accent: 'en-GB', text: 'Good morning, Bluewater Ferries. How may I help you?' },
          { speaker: 'Passenger', voice: M, accent: 'en-GB', text: "Hello. I'd like to book a ferry ticket for next month. I'll be travelling with my car." },
          { speaker: 'Booking officer', voice: W, accent: 'en-GB', text: "Certainly. I'll need a few details. Could I have your surname, please?" },
          { speaker: 'Passenger', voice: M, accent: 'en-GB', text: "It's Clarke. C-L-A-R-K-E." },
          { speaker: 'Booking officer', voice: W, accent: 'en-GB', text: "Thank you. And what's your contact telephone number?" },
          { speaker: 'Passenger', voice: M, accent: 'en-GB', text: "It's 07763 482 915." },
          { speaker: 'Booking officer', voice: W, accent: 'en-GB', text: 'Let me repeat that: 07763 482 915.' },
          { speaker: 'Passenger', voice: M, accent: 'en-GB', text: "Yes, that's correct." },
          { speaker: 'Booking officer', voice: W, accent: 'en-GB', text: 'When would you like to travel?' },
          { speaker: 'Passenger', voice: M, accent: 'en-GB', text: 'On the twenty-second of August, please.' },
          { speaker: 'Booking officer', voice: W, accent: 'en-GB', text: 'Fine. We have several ticket types. Are you looking for a standard passenger ticket or a flexible ticket?' },
          { speaker: 'Passenger', voice: M, accent: 'en-GB', text: 'A flexible ticket, please. I might need to change the return journey.' },
          { speaker: 'Booking officer', voice: W, accent: 'en-GB', text: 'No problem. And what vehicle will you be bringing?' },
          { speaker: 'Passenger', voice: M, accent: 'en-GB', text: 'A small car. The registration number is KT62 RVM.' },
          { speaker: 'Booking officer', voice: W, accent: 'en-GB', text: "Thank you. I've entered that. The ferry departs at quarter to nine in the morning." },
          { speaker: 'Passenger', voice: M, accent: 'en-GB', text: 'Right. How early should we arrive?' },
          { speaker: 'Booking officer', voice: W, accent: 'en-GB', text: 'We recommend arriving thirty minutes before departure. That gives you enough time for vehicle checks and boarding.' },
          { speaker: 'Passenger', voice: M, accent: 'en-GB', text: 'Understood. Where do we collect the boarding passes?' },
          { speaker: 'Booking officer', voice: W, accent: 'en-GB', text: 'You can collect them at the ticket office inside the terminal. Please have your booking reference ready.' },
          { speaker: 'Passenger', voice: M, accent: 'en-GB', text: 'Okay. Does the ticket include anything on board?' },
          { speaker: 'Booking officer', voice: W, accent: 'en-GB', text: 'Yes. Every passenger receives a reserved seat as part of the ticket price. Meals and private cabins are available separately.' },
          { speaker: 'Passenger', voice: M, accent: 'en-GB', text: "That's good to know. What happens if the weather is bad and the ferry is delayed?" },
          { speaker: 'Booking officer', voice: W, accent: 'en-GB', text: 'In that situation, please remain in the terminal and wait for an announcement. Our staff will provide updated departure information.' },
          { speaker: 'Passenger', voice: M, accent: 'en-GB', text: "Fine. I think that's everything." },
          { speaker: 'Booking officer', voice: W, accent: 'en-GB', text: "Excellent. I'll send your booking confirmation by text message shortly." },
          { speaker: 'Passenger', voice: M, accent: 'en-GB', text: 'Thank you very much.' },
          { speaker: 'Booking officer', voice: W, accent: 'en-GB', text: "You're welcome. Have a pleasant journey." },
        ],
      },
      groups: [
        {
          id: 'm10l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          wordLimit: { words: 2, number: true },
          template:
            'Ferry Booking Form\nPassenger\'s surname: {{1}}\nContact telephone number: {{2}}\nDate of travel: {{3}}\nType of ticket: {{4}}\nVehicle registration number: {{5}}',
          questions: [
            { id: 'm10l-q1', number: 1, answer: { accepted: ['Clarke'] }, explanation: { text: 'The surname is spelled out: C-L-A-R-K-E.', evidence: { quote: "It's Clarke. C-L-A-R-K-E." } } },
            {
              id: 'm10l-q2',
              number: 2,
              answer: { accepted: ['07763 482 915', '07763482915'] },
              explanation: { text: 'The passenger gives the number, and the booking officer repeats it back: 07763 482 915. Spaces may be ignored.', evidence: { quote: 'Let me repeat that: 07763 482 915.' } },
            },
            {
              id: 'm10l-q3',
              number: 3,
              answer: { accepted: ['22 August', 'August 22'] },
              explanation: { text: 'The passenger wants to travel on the twenty-second of August.', evidence: { quote: 'On the twenty-second of August, please.' } },
            },
            {
              id: 'm10l-q4',
              number: 4,
              answer: { accepted: ['Flexible', 'Flexible ticket'] },
              explanation: { text: 'The passenger chooses a flexible ticket, in case the return journey needs changing.', evidence: { quote: 'A flexible ticket, please.' } },
            },
            {
              id: 'm10l-q5',
              number: 5,
              answer: { accepted: ['KT62 RVM', 'KT62RVM'] },
              explanation: { text: 'The registration number of the small car is KT62 RVM.', evidence: { quote: 'The registration number is KT62 RVM.' } },
            },
          ],
        },
        {
          id: 'm10l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm10l-q6',
              number: 6,
              prompt: 'What time does the ferry depart?',
              options: [
                { id: 'A', text: '8:15 a.m.' },
                { id: 'B', text: '8:45 a.m.' },
                { id: 'C', text: '9:15 a.m.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The ferry departs at quarter to nine in the morning, which is 8:45 a.m.',
                evidence: { quote: 'The ferry departs at quarter to nine in the morning.' },
                distractors: { A: 'Quarter to nine is 8:45, not 8:15.', C: 'Quarter to nine is 8:45, not 9:15.' },
              },
            },
            {
              id: 'm10l-q7',
              number: 7,
              prompt: 'How early should passengers arrive before departure?',
              options: [
                { id: 'A', text: '20 minutes' },
                { id: 'B', text: '30 minutes' },
                { id: 'C', text: '45 minutes' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Passengers should arrive thirty minutes before departure, for vehicle checks and boarding.',
                evidence: { quote: 'We recommend arriving thirty minutes before departure.' },
              },
            },
            {
              id: 'm10l-q8',
              number: 8,
              prompt: 'Where can passengers collect their boarding passes?',
              options: [
                { id: 'A', text: 'At the ticket office' },
                { id: 'B', text: 'At the vehicle entrance' },
                { id: 'C', text: 'At the information desk' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Boarding passes are collected at the ticket office inside the terminal.',
                evidence: { quote: 'You can collect them at the ticket office inside the terminal.' },
              },
            },
            {
              id: 'm10l-q9',
              number: 9,
              prompt: 'What is included in the ticket price?',
              options: [
                { id: 'A', text: 'A meal' },
                { id: 'B', text: 'A reserved seat' },
                { id: 'C', text: 'A cabin' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Every passenger receives a reserved seat as part of the ticket price. Meals and private cabins are available separately.',
                evidence: { quote: 'Every passenger receives a reserved seat as part of the ticket price.' },
                distractors: { A: 'Meals are available separately.', C: 'Private cabins are available separately.' },
              },
            },
            {
              id: 'm10l-q10',
              number: 10,
              prompt: 'What should passengers do if the weather causes a delay?',
              options: [
                { id: 'A', text: 'Wait for an announcement' },
                { id: 'B', text: 'Contact the police' },
                { id: 'C', text: 'Return the following day' },
              ],
              // CORRECTED from the supplied package (which said C): the transcript says to remain in the
              // terminal and wait for an announcement. See the file header.
              answer: { accepted: ['A'] },
              explanation: {
                text: 'If the ferry is delayed by bad weather, passengers should remain in the terminal and wait for an announcement.',
                evidence: { quote: 'please remain in the terminal and wait for an announcement' },
                distractors: { B: 'Nobody suggests contacting the police.', C: 'Passengers are told to wait in the terminal, not to return the following day.' },
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
      title: 'Introduction to a public library',
      audio: {
        intro: 'Part 2. You will hear a librarian welcoming visitors and explaining the services available at a public library. First, you have some time to look at questions 11 to 20.',
        noun: 'talk',
        ...rec('l2'),
        // Questions 11–15 are answered by line 5; the break comes before the different areas are described.
        sets: [
          { questions: '11 to 15', fromLine: 0 },
          { questions: '16 to 20', fromLine: 6 },
        ],
        script: [
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: "Good afternoon, everyone. Welcome to Westfield Public Library. My name is Helen, and I'll introduce some of the facilities and activities available here." },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: "Our library has recently launched a programme called Reading Together. Its main aim is to encourage people of different ages to read more regularly. We organise activities for children, teenagers and adults. Although we occasionally hold writing workshops, professional writing training isn't the main purpose of the programme." },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: 'We also provide a service for people who find it difficult to visit the building. Members who qualify can receive free home delivery of books. This is particularly useful for older residents and people with limited mobility. We don\'t currently offer telephone reading lessons, but members can access a range of online resources.' },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: "One of our most popular weekly activities is the children's storytelling session. It takes place every Saturday at half past two in the afternoon. Children can listen to stories and take part in simple activities afterwards." },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: 'There are a few rules to remember when using the library. You are welcome to use mobile phones in the entrance area, but please keep them silent in the reading rooms. Photography is permitted in most public areas, although permission may be required for special exhibitions. Drinks, however, must not be taken into the archive room because some of the documents are extremely old and easily damaged.' },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: "If you're a new member, you can register at the reception desk near the main entrance. Staff will help you complete the application form and explain how to borrow books." },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: 'Now, let me tell you about some of the different areas.' },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: 'The Newspaper Section contains current newspapers as well as selected older editions. If you\'re researching events from the past, you may find this section useful.' },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: 'For public discussions, lectures and community events, we use the Community Hall. It can accommodate quite a large group and is available for selected local organisations.' },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: "The Local History Room contains photographs, maps and documents relating to the development of Westfield. It is an excellent place for anyone interested in the town's past." },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: "If you'd like to improve your computer skills, visit the Digital Learning Centre. There are computers available, and staff can help visitors learn basic digital skills." },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: 'Finally, the Quiet Study Room is designed for people who need a peaceful place to concentrate. Please remember to keep conversations to a minimum in that area.' },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: 'We hope you enjoy using the library.' },
        ],
      },
      groups: [
        {
          id: 'm10l-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm10l-q11',
              number: 11,
              prompt: "What is the main aim of the library's new programme?",
              options: [
                { id: 'A', text: 'To encourage people of different ages to read' },
                { id: 'B', text: 'To provide professional writing courses' },
                { id: 'C', text: 'To sell books at reduced prices' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The Reading Together programme aims to encourage people of different ages to read more regularly.',
                evidence: { quote: 'Its main aim is to encourage people of different ages to read more regularly.' },
                distractors: { B: 'Writing workshops are held occasionally, but professional writing training is not the main purpose.' },
              },
            },
            {
              id: 'm10l-q12',
              number: 12,
              prompt: 'Which service is available to people who cannot visit the library?',
              options: [
                { id: 'A', text: 'Free home delivery of books' },
                { id: 'B', text: 'Online meetings with authors' },
                { id: 'C', text: 'Telephone reading lessons' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Members who qualify can receive free home delivery of books; telephone reading lessons are not currently offered.',
                evidence: { quote: 'Members who qualify can receive free home delivery of books.' },
                distractors: { C: "We don't currently offer telephone reading lessons" },
              },
            },
            {
              id: 'm10l-q13',
              number: 13,
              prompt: "When does the children's storytelling session begin?",
              options: [
                { id: 'A', text: '2:00 p.m.' },
                { id: 'B', text: '2:30 p.m.' },
                { id: 'C', text: '3:00 p.m.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: "The children's storytelling session takes place every Saturday at half past two in the afternoon.",
                evidence: { quote: 'It takes place every Saturday at half past two in the afternoon.' },
              },
            },
            {
              id: 'm10l-q14',
              number: 14,
              prompt: 'What are visitors asked not to do in the archive room?',
              options: [
                { id: 'A', text: 'Use mobile phones' },
                { id: 'B', text: 'Take photographs' },
                { id: 'C', text: 'Bring drinks' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'Drinks must not be taken into the archive room because some documents are extremely old and easily damaged.',
                evidence: { quote: 'Drinks, however, must not be taken into the archive room' },
                distractors: { A: 'Mobile phones may be used in the entrance area.', B: 'Photography is permitted in most public areas.' },
              },
            },
            {
              id: 'm10l-q15',
              number: 15,
              prompt: 'Where can new members register?',
              options: [
                { id: 'A', text: 'At the reception desk' },
                { id: 'B', text: 'In the reading room' },
                { id: 'C', text: 'At the computer area' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'New members can register at the reception desk near the main entrance.',
                evidence: { quote: 'you can register at the reception desk near the main entrance' },
              },
            },
          ],
        },
        {
          id: 'm10l-g4',
          type: 'matching',
          instructions: 'Which library area is the best place for each activity? Choose the correct letter, A–F.',
          optionsTitle: 'Library areas',
          options: [
            { id: 'A', text: 'Local History Room' },
            { id: 'B', text: "Children's Corner" },
            { id: 'C', text: 'Digital Learning Centre' },
            { id: 'D', text: 'Quiet Study Room' },
            { id: 'E', text: 'Community Hall' },
            { id: 'F', text: 'Newspaper Section' },
          ],
          questions: [
            { id: 'm10l-q16', number: 16, prompt: 'Read old newspapers', answer: { accepted: ['F'] }, explanation: { text: 'The Newspaper Section contains current newspapers as well as selected older editions.', evidence: { quote: 'The Newspaper Section contains current newspapers as well as selected older editions.' } } },
            { id: 'm10l-q17', number: 17, prompt: 'Attend a public discussion', answer: { accepted: ['E'] }, explanation: { text: 'The Community Hall is used for public discussions, lectures and community events.', evidence: { quote: 'For public discussions, lectures and community events, we use the Community Hall.' } } },
            { id: 'm10l-q18', number: 18, prompt: 'Research the history of the town', answer: { accepted: ['A'] }, explanation: { text: "The Local History Room contains photographs, maps and documents relating to the development of Westfield, the town's past.", evidence: { quote: "It is an excellent place for anyone interested in the town's past." } } },
            { id: 'm10l-q19', number: 19, prompt: 'Use computers to learn new digital skills', answer: { accepted: ['C'] }, explanation: { text: 'The Digital Learning Centre has computers, and staff help visitors learn basic digital skills.', evidence: { quote: "visit the Digital Learning Centre. There are computers available, and staff can help visitors learn basic digital skills." } } },
            { id: 'm10l-q20', number: 20, prompt: 'Study without being disturbed', answer: { accepted: ['D'] }, explanation: { text: 'The Quiet Study Room is designed for people who need a peaceful place to concentrate.', evidence: { quote: 'Finally, the Quiet Study Room is designed for people who need a peaceful place to concentrate.' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Two university students organising a charity book fair',
      audio: {
        intro: 'Part 3. You will hear two university students, Sarah and Tom, discussing plans for a charity book fair. First, you have some time to look at questions 21 to 30.',
        noun: 'discussion',
        ...rec('l3'),
        // Questions 21–25 are answered by line 15; the break comes before the tasks are divided up.
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 18 },
        ],
        script: [
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: 'Tom, have you checked the responses from our student survey?' },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: 'Yes, I finished them this morning. There are some useful results.' },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: "Great. Before we organise everything, let's make sure we're clear about the purpose of the event. We're raising money for the local homeless shelter, aren't we?" },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "That's right. The shelter needs support, and the book fair should be a practical way for students to contribute." },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: 'I think it\'s a good idea. What did students say about the books?' },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "The most interesting result was that many students were interested in second-hand books. Some said they'd be happy to buy them if the prices were reasonable." },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: "That's encouraging. I thought most people would ask for new books, especially textbooks." },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "A few did, but second-hand books were clearly more popular than I expected." },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: 'We also discussed having an online auction. Should we still consider that?' },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "I don't think so. We couldn't work out the delivery costs accurately. Different books would need different packaging, and some buyers might live quite far away." },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: "Fair enough. It could become complicated. Let's keep the event on campus." },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: 'Agreed. How can we attract more visitors?' },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: 'We could advertise through social media. The university student groups have quite a large following, so we might reach people quickly.' },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "That's probably better than printing hundreds of leaflets." },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: "Exactly. I'm happy to prepare some posts." },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "Before we finalise the arrangements, I have one concern. The room we've been offered might be too small. If lots of students come, there won't be enough space for everyone to move around comfortably." },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: "That's a good point. We should ask whether the larger hall is available." },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "I'll contact the venue manager about that." },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: "Let's divide the other tasks. I'll contact the local shelter and confirm how they would like to receive the money." },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "Good. I'll sort and label the donated books. We should separate fiction, non-fiction and academic books." },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: "Perfect. I'll prepare the promotional posts as well." },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: 'And we can arrange the tables together on the morning of the event.' },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: 'Yes, both of us should be there early.' },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "After the fair, I'll count the money and prepare a record of the total." },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: "I'll check the figures with you before we send the donation." },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "Excellent. I think we've got a good plan." },
        ],
      },
      groups: [
        {
          id: 'm10l-g5',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm10l-q21',
              number: 21,
              prompt: 'What is the main purpose of the book fair?',
              options: [
                { id: 'A', text: 'To raise money for a local homeless shelter' },
                { id: 'B', text: 'To help students publish their own books' },
                { id: 'C', text: 'To introduce international publishers' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The book fair is raising money for the local homeless shelter.',
                evidence: { quote: "We're raising money for the local homeless shelter, aren't we?" },
              },
            },
            {
              id: 'm10l-q22',
              number: 22,
              prompt: 'What did the students learn from their survey?',
              options: [
                { id: 'A', text: 'Most students prefer buying new books' },
                { id: 'B', text: 'Many students are interested in second-hand books' },
                { id: 'C', text: 'Students mainly want academic textbooks' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The survey showed many students were interested in second-hand books; only a few asked for new books or textbooks.',
                evidence: { quote: 'many students were interested in second-hand books' },
                distractors: { A: 'Sarah expected people to ask for new books, but the survey said otherwise.', C: 'A few students mentioned textbooks, but second-hand books were clearly more popular.' },
              },
            },
            {
              id: 'm10l-q23',
              number: 23,
              prompt: 'Why did they decide not to organise an online auction?',
              options: [
                { id: 'A', text: 'They lacked enough volunteers' },
                { id: 'B', text: 'The university did not allow online payments' },
                { id: 'C', text: 'Delivery costs would be difficult to calculate' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'They could not work out the delivery costs accurately — different books would need different packaging, and some buyers might live far away.',
                evidence: { quote: "We couldn't work out the delivery costs accurately." },
              },
            },
            {
              id: 'm10l-q24',
              number: 24,
              prompt: 'What does Sarah suggest doing to attract more visitors?',
              options: [
                { id: 'A', text: 'Advertising through social media' },
                { id: 'B', text: 'Distributing leaflets in every classroom' },
                { id: 'C', text: 'Inviting a famous author' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Sarah suggests advertising through social media, where the university student groups have a large following.',
                evidence: { quote: 'We could advertise through social media.' },
                distractors: { B: 'Tom says social media is probably better than printing hundreds of leaflets.' },
              },
            },
            {
              id: 'm10l-q25',
              number: 25,
              prompt: 'What is Tom concerned about?',
              options: [
                { id: 'A', text: 'The quality of the donated books' },
                { id: 'B', text: 'The size of the available venue' },
                { id: 'C', text: 'The number of volunteers' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Tom is concerned the room they have been offered might be too small if lots of students come.',
                evidence: { quote: 'The room we\'ve been offered might be too small.' },
              },
            },
          ],
        },
        {
          id: 'm10l-g6',
          type: 'matching',
          instructions: 'Who will be responsible for each task? Choose the correct letter, A, B or C.',
          optionsTitle: 'Responsibility',
          options: [
            { id: 'A', text: 'Sarah' },
            { id: 'B', text: 'Tom' },
            { id: 'C', text: 'Both students' },
          ],
          questions: [
            { id: 'm10l-q26', number: 26, prompt: 'Contact the local shelter', answer: { accepted: ['A'] }, explanation: { text: 'Sarah will contact the local shelter and confirm how they would like to receive the money.', evidence: { quote: "I'll contact the local shelter" } } },
            { id: 'm10l-q27', number: 27, prompt: 'Sort and label the donated books', answer: { accepted: ['B'] }, explanation: { text: 'Tom will sort and label the donated books, separating fiction, non-fiction and academic books.', evidence: { quote: "I'll sort and label the donated books." } } },
            { id: 'm10l-q28', number: 28, prompt: 'Prepare promotional posts', answer: { accepted: ['A'] }, explanation: { text: 'Sarah will prepare the promotional posts.', evidence: { quote: "I'll prepare the promotional posts as well." } } },
            { id: 'm10l-q29', number: 29, prompt: 'Arrange the tables at the venue', answer: { accepted: ['C'] }, explanation: { text: 'They will arrange the tables together on the morning of the event.', evidence: { quote: 'we can arrange the tables together on the morning of the event' } } },
            { id: 'm10l-q30', number: 30, prompt: 'Count the money after the event', answer: { accepted: ['B'] }, explanation: { text: 'Tom will count the money after the fair and prepare a record of the total.', evidence: { quote: "After the fair, I'll count the money" } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'The formation and development of volcanic islands',
      audio: {
        intro: 'Part 4. You will hear a lecture about the formation and development of volcanic islands. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Today we're going to examine how volcanic islands form and how they change over time." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Volcanic islands can develop when molten rock rises from beneath the Earth's crust. In some places, this material moves through cracks in the ocean floor and reaches the surface." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: 'An underwater volcano may begin as a small opening in the seabed. During repeated eruptions, layers of volcanic material gradually accumulate. Eventually, the volcano may grow high enough to rise above sea level, forming an island.' },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "When molten rock reaches the Earth's surface, it is called lava. As it cools, it becomes solid rock. Over many years, repeated eruptions can change the shape and size of the island." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: 'Many volcanoes have a large bowl-shaped opening at their top. This feature is called a crater. It may contain volcanic material, water or, in some cases, a small lake.' },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: 'Volcanic islands do not remain unchanged after their formation. Weathering gradually breaks down rocks, and volcanic ash can contribute to the development of relatively fertile soil. This can support the growth of plants and, eventually, farming.' },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Some volcanic islands also benefit from geothermal energy. Heat from beneath the Earth's surface can be used to produce electricity or provide heating for buildings. This is particularly useful in places where underground temperatures are high." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: 'Tourism is another important part of the economy of some volcanic islands. Visitors are attracted by dramatic landscapes, natural hot springs and opportunities to explore volcanic environments. These activities can support the local tourism industry and create employment.' },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: 'However, volcanic islands also face environmental challenges. Coastal erosion can become more serious when strong waves and heavy rainfall remove material from beaches and cliffs.' },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: 'Scientists monitor volcanic activity using instruments that measure changes in ground movement. Small movements may provide useful information about what is happening beneath the surface.' },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: 'People living near active volcanoes need reliable information and emergency plans. These arrangements help protect local communities if an eruption occurs.' },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: 'Volcanic islands are fascinating natural environments, but understanding their risks is essential for people who live and work there.' },
        ],
      },
      groups: [
        {
          id: 'm10l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write NO MORE THAN TWO WORDS for each answer.',
          wordLimit: { words: 2 },
          template:
            'Volcanic Islands\nFormation\n• Volcanic islands can form when molten rock rises from beneath the {{31}}.\n• An underwater {{32}} may eventually build up enough material to reach the sea surface.\n• During an eruption, hot liquid rock that reaches the surface is called {{33}}.\n• A large bowl-shaped opening at the top of a volcano is known as a {{34}}.\nDevelopment\n• Volcanic ash can break down and create relatively {{35}} soil.\n• Some islands use underground heat to generate {{36}}.\n• Volcanic landscapes can attract visitors and support the {{37}} industry.\nEnvironmental challenges\n• Heavy rainfall can increase the risk of coastal {{38}}.\n• Scientists use special instruments to monitor changes in ground {{39}}.\n• Emergency plans help protect local {{40}} during volcanic activity.',
          questions: [
            // Q31: the package's marking note also accepts "the Earth's crust" (3 words), but the app
            // enforces NO MORE THAN TWO WORDS on the typed answer, so that alternative can never score.
            // Kept as supplied; see the file header. Primary answer "Earth's crust" is correct.
            { id: 'm10l-q31', number: 31, answer: { accepted: ["Earth's crust"] }, explanation: { text: 'Molten rock rises from beneath the Earth\'s crust.', evidence: { quote: "molten rock rises from beneath the Earth's crust" } } },
            { id: 'm10l-q32', number: 32, answer: { accepted: ['volcano', 'underwater volcano'] }, explanation: { text: 'An underwater volcano may grow high enough to rise above sea level, forming an island.', evidence: { quote: 'An underwater volcano may begin as a small opening in the seabed.' } } },
            { id: 'm10l-q33', number: 33, answer: { accepted: ['lava'] }, explanation: { text: "When molten rock reaches the Earth's surface, it is called lava.", evidence: { quote: 'it is called lava' } } },
            { id: 'm10l-q34', number: 34, answer: { accepted: ['crater'] }, explanation: { text: 'A large bowl-shaped opening at the top of a volcano is called a crater.', evidence: { quote: 'This feature is called a crater.' } } },
            { id: 'm10l-q35', number: 35, answer: { accepted: ['fertile'] }, explanation: { text: 'Volcanic ash can contribute to the development of relatively fertile soil.', evidence: { quote: 'relatively fertile soil' } } },
            { id: 'm10l-q36', number: 36, answer: { accepted: ['electricity'] }, explanation: { text: "Heat from beneath the Earth's surface can be used to produce electricity.", evidence: { quote: 'can be used to produce electricity' } } },
            { id: 'm10l-q37', number: 37, answer: { accepted: ['tourism'] }, explanation: { text: 'Visitors attracted by volcanic landscapes support the local tourism industry.', evidence: { quote: 'These activities can support the local tourism industry' } } },
            { id: 'm10l-q38', number: 38, answer: { accepted: ['erosion'] }, explanation: { text: 'Coastal erosion can become more serious when strong waves and heavy rainfall remove material from beaches and cliffs.', evidence: { quote: 'Coastal erosion can become more serious' } } },
            { id: 'm10l-q39', number: 39, answer: { accepted: ['movement', 'ground movement'] }, explanation: { text: 'Instruments measure changes in ground movement.', evidence: { quote: 'instruments that measure changes in ground movement' } } },
            { id: 'm10l-q40', number: 40, answer: { accepted: ['communities'] }, explanation: { text: 'Emergency plans help protect local communities if an eruption occurs.', evidence: { quote: 'These arrangements help protect local communities' } } },
          ],
        },
      ],
    },
  ],
};
