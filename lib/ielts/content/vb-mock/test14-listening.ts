import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 14 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material.
 */

const rec = (partId: string) => recorded('vb-mock-14', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock14Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Reporting lost luggage at an airport',
      audio: {
        intro: "Part 1. You will hear a man reporting lost luggage at an airport. First, you have some time to look at questions 1 to 6.",
        noun: 'conversation',
        ...rec('l1'),
        sets: [
          { questions: '1 to 6', fromLine: 0 },
          { questions: '7 to 10', fromLine: 15 },
        ],
        script: [
          { speaker: 'Officer', voice: W, accent: 'en-GB', text: "Good morning. Lost Luggage Office. This is Sarah speaking. How can I help you?" },
          { speaker: 'Mr Thompson', voice: M, accent: 'en-GB', text: "Hello. I have lost my suitcase. I arrived on a flight from Paris this morning, and my suitcase did not arrive with the other bags." },
          { speaker: 'Officer', voice: W, accent: 'en-GB', text: "I am sorry to hear that, sir. Could I take your full name, please?" },
          { speaker: 'Mr Thompson', voice: M, accent: 'en-GB', text: "Yes, my name is James Thompson." },
          { speaker: 'Officer', voice: W, accent: 'en-GB', text: "Thank you, Mr Thompson. Could I have your flight number, please?" },
          { speaker: 'Mr Thompson', voice: M, accent: 'en-GB', text: "Yes, the flight number is BA 249." },
          { speaker: 'Officer', voice: W, accent: 'en-GB', text: "BA 249. Thank you. Can you describe your suitcase, please?" },
          { speaker: 'Mr Thompson', voice: M, accent: 'en-GB', text: "Yes, it is a large blue suitcase with wheels, and it has a red tag on the handle." },
          { speaker: 'Officer', voice: W, accent: 'en-GB', text: "A large blue suitcase with a red tag. How many bags did you check in?" },
          { speaker: 'Mr Thompson', voice: M, accent: 'en-GB', text: "I checked in two bags. One bag arrived, but the suitcase did not arrive." },
          { speaker: 'Officer', voice: W, accent: 'en-GB', text: "Two bags checked in. Could I take your telephone number, please?" },
          { speaker: 'Mr Thompson', voice: M, accent: 'en-GB', text: "Yes, my mobile number is oh seven seven double oh, nine double oh, four six one." },
          { speaker: 'Officer', voice: W, accent: 'en-GB', text: "Oh seven seven double oh, nine double oh, four six one. Thank you. Where are you staying in London?" },
          { speaker: 'Mr Thompson', voice: M, accent: 'en-GB', text: "I am staying at the Park Hotel in Oxford Street." },
          { speaker: 'Officer', voice: W, accent: 'en-GB', text: "The Park Hotel. Thank you, Mr Thompson. Now, can you tell me what is inside the suitcase?" },
          { speaker: 'Mr Thompson', voice: M, accent: 'en-GB', text: "Yes, there are clothes, some books, and a camera in the suitcase." },
          { speaker: 'Officer', voice: W, accent: 'en-GB', text: "Clothes, books and a camera. When did you last see the suitcase?" },
          { speaker: 'Mr Thompson', voice: M, accent: 'en-GB', text: "I last saw the suitcase at the airport in Paris, before I gave it to the man at the check-in desk." },
          { speaker: 'Officer', voice: W, accent: 'en-GB', text: "I see. We will look for your suitcase, and we will telephone you when we find it." },
          { speaker: 'Mr Thompson', voice: M, accent: 'en-GB', text: "Thank you. When will you telephone me?" },
          { speaker: 'Officer', voice: W, accent: 'en-GB', text: "We will telephone you tomorrow morning, before ten o'clock." },
          { speaker: 'Mr Thompson', voice: M, accent: 'en-GB', text: "Tomorrow morning, before ten o'clock. Thank you very much for your help." },
          { speaker: 'Officer', voice: W, accent: 'en-GB', text: "You are welcome, Mr Thompson. Goodbye." },
          { speaker: 'Mr Thompson', voice: M, accent: 'en-GB', text: "Goodbye." },
        ],
      },
      groups: [
        {
          id: 'm14l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 1, number: true },
          template:
            'LOST LUGGAGE REPORT\nPassenger name: James {{1}}\nFlight number: {{2}}\nColour of the missing suitcase: {{3}}\nNumber of bags checked in: {{4}}\nTelephone number: {{5}}\nHotel: {{6}}',
          questions: [
            { id: 'm14l-q1', number: 1, answer: { accepted: ['Thompson'] }, explanation: { text: 'His name is James Thompson.', evidence: { quote: 'my name is James Thompson' } } },
            { id: 'm14l-q2', number: 2, answer: { accepted: ['BA 249', 'BA249'] }, explanation: { text: 'His flight number is BA 249.', evidence: { quote: 'the flight number is BA 249' } } },
            { id: 'm14l-q3', number: 3, answer: { accepted: ['blue'] }, explanation: { text: 'His suitcase is a large blue suitcase.', evidence: { quote: 'a large blue suitcase' } } },
            { id: 'm14l-q4', number: 4, answer: { accepted: ['two', '2'] }, explanation: { text: 'He checked in two bags.', evidence: { quote: 'I checked in two bags' } } },
            { id: 'm14l-q5', number: 5, answer: { accepted: ['07700900461'] }, explanation: { text: 'His mobile number is oh seven seven double oh, nine double oh, four six one.', evidence: { quote: 'oh seven seven double oh, nine double oh, four six one' } } },
            { id: 'm14l-q6', number: 6, answer: { accepted: ['Park Hotel'] }, explanation: { text: 'He is staying at the Park Hotel.', evidence: { quote: 'I am staying at the Park Hotel' } } },
          ],
        },
        {
          id: 'm14l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm14l-q7',
              number: 7,
              prompt: 'What is inside the suitcase?',
              options: [
                { id: 'A', text: 'clothes, books and a camera' },
                { id: 'B', text: 'clothes, shoes and a camera' },
                { id: 'C', text: 'books, a laptop and a camera' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'There are clothes, some books, and a camera in the suitcase.',
                evidence: { quote: 'there are clothes, some books, and a camera in the suitcase' },
              },
            },
            {
              id: 'm14l-q8',
              number: 8,
              prompt: 'Where did Mr Thompson last see his suitcase?',
              options: [
                { id: 'A', text: 'at the airport in Paris, before he gave it to the man at the check-in desk' },
                { id: 'B', text: 'on the plane from Paris' },
                { id: 'C', text: 'at the hotel in London' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'He last saw the suitcase at the airport in Paris.',
                evidence: { quote: 'I last saw the suitcase at the airport in Paris' },
              },
            },
            {
              id: 'm14l-q9',
              number: 9,
              prompt: 'What will the Lost Luggage Office do?',
              options: [
                { id: 'A', text: 'telephone him when they find the suitcase' },
                { id: 'B', text: 'send the suitcase to his hotel' },
                { id: 'C', text: 'give him money for a new suitcase' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The office will telephone him when they find the suitcase.',
                evidence: { quote: 'we will telephone you when we find it' },
              },
            },
            {
              id: 'm14l-q10',
              number: 10,
              prompt: 'When will the office telephone Mr Thompson?',
              options: [
                { id: 'A', text: 'tomorrow morning, before ten o\'clock' },
                { id: 'B', text: 'tomorrow afternoon, after three o\'clock' },
                { id: 'C', text: 'this evening, after six o\'clock' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The office will telephone him tomorrow morning, before ten o\'clock.',
                evidence: { quote: 'We will telephone you tomorrow morning, before ten o\'clock' },
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
      title: 'Talk by a chef about a food festival',
      audio: {
        intro: 'Part 2. You will hear a chef talking about a food festival. First, you have some time to look at questions 11 to 14.',
        noun: 'talk',
        ...rec('l2'),
        sets: [
          { questions: '11 to 14', fromLine: 0 },
          { questions: '15 to 20', fromLine: 4 },
        ],
        script: [
          { speaker: 'Chef', voice: W, accent: 'en-AU', text: "Good afternoon, everyone, and welcome to the Riverside Food Festival. My name is Maria, and I am the head chef of the festival this year." },
          { speaker: 'Chef', voice: W, accent: 'en-AU', text: "The Riverside Food Festival began ten years ago, in 2016, with only twenty food stalls, and this year we have more than one hundred food stalls from twenty different countries." },
          { speaker: 'Chef', voice: W, accent: 'en-AU', text: "The festival will last for three days, from Friday the twelfth of June to Sunday the fourteenth of June, and it will be open from ten o'clock in the morning until nine o'clock in the evening." },
          { speaker: 'Chef', voice: W, accent: 'en-AU', text: "Tickets cost eight pounds for adults, and children under ten can visit the festival for free." },
          { speaker: 'Chef', voice: W, accent: 'en-AU', text: "The main area of the festival is the market, where you can buy fresh bread, cheese, fruit and vegetables from local farmers." },
          { speaker: 'Chef', voice: W, accent: 'en-AU', text: "Next to the market, there is the cooking school, where famous chefs will show you how to cook dishes from different countries." },
          { speaker: 'Chef', voice: W, accent: 'en-AU', text: "In the evening, you can enjoy live music in the music tent, where bands from many countries will play traditional music." },
          { speaker: 'Chef', voice: W, accent: 'en-AU', text: "There is also a children's area, where children can learn to make bread and pizza, and where they can taste food from around the world." },
          { speaker: 'Chef', voice: W, accent: 'en-AU', text: "Finally, there is the picnic area by the river, where you can sit and eat the food you have bought at the festival." },
          { speaker: 'Chef', voice: W, accent: 'en-AU', text: "Please remember that you cannot bring your own food or drink into the festival, but you can buy food and drink at more than one hundred stalls." },
          { speaker: 'Chef', voice: W, accent: 'en-AU', text: "Thank you for coming to the Riverside Food Festival. I hope you enjoy the food, the music and the cooking. Have a wonderful day!" },
        ],
      },
      groups: [
        {
          id: 'm14l-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm14l-q11',
              number: 11,
              prompt: 'When did the Riverside Food Festival begin?',
              options: [
                { id: 'A', text: 'in 2016' },
                { id: 'B', text: 'in 2018' },
                { id: 'C', text: 'in 2020' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The festival began ten years ago, in 2016.',
                evidence: { quote: 'began ten years ago, in 2016' },
              },
            },
            {
              id: 'm14l-q12',
              number: 12,
              prompt: 'How many food stalls are there at the festival this year?',
              options: [
                { id: 'A', text: 'twenty' },
                { id: 'B', text: 'fifty' },
                { id: 'C', text: 'more than one hundred' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'This year there are more than one hundred food stalls.',
                evidence: { quote: 'more than one hundred food stalls' },
              },
            },
            {
              id: 'm14l-q13',
              number: 13,
              prompt: 'How much does a ticket cost for adults?',
              options: [
                { id: 'A', text: 'eight pounds' },
                { id: 'B', text: 'ten pounds' },
                { id: 'C', text: 'twelve pounds' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Tickets cost eight pounds for adults.',
                evidence: { quote: 'Tickets cost eight pounds for adults' },
              },
            },
            {
              id: 'm14l-q14',
              number: 14,
              prompt: 'How long will the festival last?',
              options: [
                { id: 'A', text: 'two days' },
                { id: 'B', text: 'three days' },
                { id: 'C', text: 'four days' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The festival will last for three days.',
                evidence: { quote: 'will last for three days' },
              },
            },
          ],
        },
        {
          id: 'm14l-g4',
          type: 'matching',
          instructions: 'What is said about each of the following? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 15–20.',
          optionsTitle: 'Features',
          options: [
            { id: 'A', text: 'It is where you can buy fresh bread, cheese, fruit and vegetables from local farmers.' },
            { id: 'B', text: 'It is where famous chefs will show you how to cook dishes from different countries.' },
            { id: 'C', text: 'It is where bands from many countries will play traditional music.' },
            { id: 'D', text: 'It is where children can learn to make bread and pizza.' },
            { id: 'E', text: 'It is where you can sit and eat the food you have bought at the festival.' },
            { id: 'F', text: 'You cannot bring your own food or drink there.' },
            { id: 'G', text: 'It costs eight pounds for adults to enter.' },
            { id: 'H', text: 'It began ten years ago, in 2016.' },
          ],
          questions: [
            { id: 'm14l-q15', number: 15, prompt: 'Market', answer: { accepted: ['A'] }, explanation: { text: 'The market is where you can buy fresh bread, cheese, fruit and vegetables from local farmers.', evidence: { quote: 'where you can buy fresh bread, cheese, fruit and vegetables from local farmers' } } },
            { id: 'm14l-q16', number: 16, prompt: 'Cooking school', answer: { accepted: ['B'] }, explanation: { text: 'The cooking school is where famous chefs will show you how to cook dishes from different countries.', evidence: { quote: 'where famous chefs will show you how to cook dishes from different countries' } } },
            { id: 'm14l-q17', number: 17, prompt: 'Music tent', answer: { accepted: ['C'] }, explanation: { text: 'The music tent is where bands from many countries will play traditional music.', evidence: { quote: 'where bands from many countries will play traditional music' } } },
            { id: 'm14l-q18', number: 18, prompt: "Children's area", answer: { accepted: ['D'] }, explanation: { text: "The children's area is where children can learn to make bread and pizza.", evidence: { quote: 'where children can learn to make bread and pizza' } } },
            { id: 'm14l-q19', number: 19, prompt: 'Picnic area', answer: { accepted: ['E'] }, explanation: { text: 'The picnic area is where you can sit and eat the food you have bought at the festival.', evidence: { quote: 'where you can sit and eat the food you have bought at the festival' } } },
            { id: 'm14l-q20', number: 20, prompt: 'Bringing your own food or drink', answer: { accepted: ['F'] }, explanation: { text: 'You cannot bring your own food or drink into the festival.', evidence: { quote: 'you cannot bring your own food or drink into the festival' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Two students planning a drama performance',
      audio: {
        intro: 'Part 3. You will hear two students, Emma and Jack, planning a drama performance. First, you have some time to look at questions 21 to 25.',
        noun: 'discussion',
        ...rec('l3'),
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 10 },
        ],
        script: [
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Hi, Jack. Have you read the play for our drama performance?" },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "Yes, I have read the play, Emma. It is a comedy about a family who move to a small village." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "A comedy. When is our drama performance?" },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "Our drama performance is on Friday the twentieth of June, in the school hall, at seven o'clock in the evening." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Friday the twentieth of June. How many people are in the play?" },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "There are ten people in the play." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Ten people. Who is going to play the mother?" },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "Sarah is going to play the mother, because she is very good at acting." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Sarah. How much will the tickets cost?" },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "The tickets will cost five pounds for adults and three pounds for children." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Five pounds for adults and three pounds for children. Who is going to play the father?" },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "I am going to play the father." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Good. What about the costumes? Who should make them?" },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "I think we should ask Mrs Brown to make the costumes, because she made the costumes for the school play last year." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Good idea. What about the music? Who should choose the music for the play?" },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "I think you should choose the music, Emma, because you play the piano." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Thank you. When should we start practising?" },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "We should start practising next Monday, and we should practise every day after school." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Every day after school. What should we do first?" },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "First, we should read the play together, and then we should choose who will play each part." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Good. I will bring the play to school on Monday." },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "Good. And I will bring a list of the ten people in the play." },
        ],
      },
      groups: [
        {
          id: 'm14l-g5',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm14l-q21',
              number: 21,
              prompt: 'What kind of play is it?',
              options: [
                { id: 'A', text: 'a comedy' },
                { id: 'B', text: 'a tragedy' },
                { id: 'C', text: 'a history play' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The play is a comedy about a family who move to a small village.',
                evidence: { quote: 'It is a comedy about a family' },
              },
            },
            {
              id: 'm14l-q22',
              number: 22,
              prompt: 'When is the drama performance?',
              options: [
                { id: 'A', text: 'Friday the twentieth of June' },
                { id: 'B', text: 'Saturday the twenty-first of June' },
                { id: 'C', text: 'Friday the thirteenth of June' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The drama performance is on Friday the twentieth of June.',
                evidence: { quote: 'on Friday the twentieth of June' },
              },
            },
            {
              id: 'm14l-q23',
              number: 23,
              prompt: 'How many people are in the play?',
              options: [
                { id: 'A', text: 'eight people' },
                { id: 'B', text: 'ten people' },
                { id: 'C', text: 'twelve people' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'There are ten people in the play.',
                evidence: { quote: 'There are ten people in the play' },
              },
            },
            {
              id: 'm14l-q24',
              number: 24,
              prompt: 'Who is going to play the mother?',
              options: [
                { id: 'A', text: 'Emma' },
                { id: 'B', text: 'Mrs Brown' },
                { id: 'C', text: 'Sarah' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'Sarah is going to play the mother.',
                evidence: { quote: 'Sarah is going to play the mother' },
              },
            },
            {
              id: 'm14l-q25',
              number: 25,
              prompt: 'How much will the tickets cost for adults?',
              options: [
                { id: 'A', text: 'three pounds' },
                { id: 'B', text: 'five pounds' },
                { id: 'C', text: 'seven pounds' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The tickets will cost five pounds for adults.',
                evidence: { quote: 'five pounds for adults' },
              },
            },
          ],
        },
        {
          id: 'm14l-g6',
          type: 'matching',
          instructions: 'What was agreed about each of the following? Choose FIVE answers from the box and write the correct letter, A–F, next to Questions 26–30.',
          optionsTitle: 'Decisions',
          options: [
            { id: 'A', text: 'She will choose the music for the play.' },
            { id: 'B', text: 'He will bring a list of the ten people in the play.' },
            { id: 'C', text: 'She will make the costumes for the play.' },
            { id: 'D', text: 'They should start practising next Monday.' },
            { id: 'E', text: 'She will bring the play to school on Monday.' },
            { id: 'F', text: 'He will play the father.' },
          ],
          questions: [
            { id: 'm14l-q26', number: 26, prompt: 'Jack', answer: { accepted: ['F'] }, explanation: { text: 'Jack is going to play the father.', evidence: { quote: 'I am going to play the father' } } },
            { id: 'm14l-q27', number: 27, prompt: 'Mrs Brown', answer: { accepted: ['C'] }, explanation: { text: 'Mrs Brown will make the costumes for the play.', evidence: { quote: 'we should ask Mrs Brown to make the costumes' } } },
            { id: 'm14l-q28', number: 28, prompt: 'Emma', answer: { accepted: ['A'] }, explanation: { text: 'Emma should choose the music for the play.', evidence: { quote: 'you should choose the music' } } },
            { id: 'm14l-q29', number: 29, prompt: 'Practising', answer: { accepted: ['D'] }, explanation: { text: 'They should start practising next Monday.', evidence: { quote: 'We should start practising next Monday' } } },
            { id: 'm14l-q30', number: 30, prompt: 'The play', answer: { accepted: ['E'] }, explanation: { text: 'Emma will bring the play to school on Monday.', evidence: { quote: 'I will bring the play to school on Monday' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Lecture: artificial intelligence',
      audio: {
        intro: 'Part 4. You will hear a lecture about artificial intelligence. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Good morning. Today I am going to talk about artificial intelligence, which is often called AI, and how it is changing our lives." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Artificial intelligence is the ability of a computer to do things that people usually do, such as understanding language, recognising pictures and making decisions." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "The first ideas about artificial intelligence appeared in the 1950s, when scientists began to ask whether a computer could think like a person." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In the 1990s, a computer called Deep Blue beat the world chess champion, Garry Kasparov, and many people began to understand what computers could do." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Today, artificial intelligence is used in many areas of life. For example, doctors use AI to look at pictures of the body and to find illnesses more quickly." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "AI is also used in cars: some cars can now drive themselves on motorways, and they use cameras and computers to see the road and to avoid accidents." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "However, artificial intelligence also has some problems. One problem is that computers can make mistakes, and if a computer makes a mistake in a hospital, the results can be very serious." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Another problem is jobs: some people worry that computers will take their jobs, because a computer can do some kinds of work faster and more cheaply than a person." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In the future, many experts believe that artificial intelligence will become more powerful, and it will be used in schools, hospitals and homes all over the world." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In conclusion, artificial intelligence is changing the world very quickly, but we must use it carefully, and we must remember that computers are tools: they can help people, but they cannot replace people. That brings us to the end of the lecture." },
        ],
      },
      groups: [
        {
          id: 'm14l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'ARTIFICIAL INTELLIGENCE\nWhat is AI?\n• AI is the ability of a computer to do things that people usually do, such as understanding {{31}} and recognising pictures\nEarly history\n• the first ideas about AI appeared in the {{32}}\n• in the 1990s, a computer called Deep {{33}} beat the world chess champion, Garry Kasparov\nAI today\n• doctors use AI to look at pictures of the body and to find {{34}} more quickly\n• some cars can now drive themselves on {{35}}, and they use cameras and computers to see the road and to avoid {{36}}\nProblems\n• computers can make {{37}}, and if a computer makes a mistake in a hospital, the results can be very {{38}}\n• some people worry that computers will take their {{39}}\nThe future\n• in the future, AI will be used in schools, hospitals and {{40}} all over the world',
          questions: [
            { id: 'm14l-q31', number: 31, answer: { accepted: ['language'] }, explanation: { text: 'AI is the ability of a computer to understand language.', evidence: { quote: 'understanding language' } } },
            { id: 'm14l-q32', number: 32, answer: { accepted: ['1950s'] }, explanation: { text: 'The first ideas about artificial intelligence appeared in the 1950s.', evidence: { quote: 'in the 1950s' } } },
            { id: 'm14l-q33', number: 33, answer: { accepted: ['Blue'] }, explanation: { text: 'In the 1990s, a computer called Deep Blue beat the world chess champion.', evidence: { quote: 'a computer called Deep Blue' } } },
            { id: 'm14l-q34', number: 34, answer: { accepted: ['illnesses'] }, explanation: { text: 'Doctors use AI to find illnesses more quickly.', evidence: { quote: 'to find illnesses more quickly' } } },
            { id: 'm14l-q35', number: 35, answer: { accepted: ['motorways'] }, explanation: { text: 'Some cars can now drive themselves on motorways.', evidence: { quote: 'drive themselves on motorways' } } },
            { id: 'm14l-q36', number: 36, answer: { accepted: ['accidents'] }, explanation: { text: 'Cars use cameras and computers to see the road and to avoid accidents.', evidence: { quote: 'to avoid accidents' } } },
            { id: 'm14l-q37', number: 37, answer: { accepted: ['mistakes'] }, explanation: { text: 'Computers can make mistakes.', evidence: { quote: 'computers can make mistakes' } } },
            { id: 'm14l-q38', number: 38, answer: { accepted: ['serious'] }, explanation: { text: 'If a computer makes a mistake in a hospital, the results can be very serious.', evidence: { quote: 'the results can be very serious' } } },
            { id: 'm14l-q39', number: 39, answer: { accepted: ['jobs'] }, explanation: { text: 'Some people worry that computers will take their jobs.', evidence: { quote: 'computers will take their jobs' } } },
            { id: 'm14l-q40', number: 40, answer: { accepted: ['homes'] }, explanation: { text: 'In the future, AI will be used in schools, hospitals and homes all over the world.', evidence: { quote: 'in schools, hospitals and homes' } } },
          ],
        },
      ],
    },
  ],
};
