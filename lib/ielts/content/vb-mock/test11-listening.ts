import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 11 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material.
 */

const rec = (partId: string) => recorded('vb-mock-11', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock11Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Changing a flight booking by phone',
      audio: {
        intro: 'Part 1. You will hear a man changing a flight booking by phone. First, you have some time to look at questions 1 to 6.',
        noun: 'conversation',
        ...rec('l1'),
        sets: [
          { questions: '1 to 6', fromLine: 0 },
          { questions: '7 to 10', fromLine: 15 },
        ],
        script: [
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Good morning, Skyways Airlines. This is Emma speaking. How can I help you?" },
          { speaker: 'Mr Bennett', voice: M, accent: 'en-GB', text: "Hello. I would like to change my flight booking, please." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Of course. Could I take your booking reference, please?" },
          { speaker: 'Mr Bennett', voice: M, accent: 'en-GB', text: "Yes, it is S, K, Y, four, seven, two, nine." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "S, K, Y, four, seven, two, nine. And could I take your name, please?" },
          { speaker: 'Mr Bennett', voice: M, accent: 'en-GB', text: "Yes, my name is David Bennett." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Thank you, Mr Bennett. Which flight would you like to change?" },
          { speaker: 'Mr Bennett', voice: M, accent: 'en-GB', text: "I would like to change my flight to Rome on the fifteenth of November." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "The fifteenth of November, to Rome. What would you like to change?" },
          { speaker: 'Mr Bennett', voice: M, accent: 'en-GB', text: "I would like to change it to the seventeenth of November, in the morning." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "The seventeenth of November, in the morning. Is there a reason for the change?" },
          { speaker: 'Mr Bennett', voice: M, accent: 'en-GB', text: "Yes, my meeting in Rome has been moved to the eighteenth of November." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "I see. There is a flight on the seventeenth of November at nine o'clock in the morning." },
          { speaker: 'Mr Bennett', voice: M, accent: 'en-GB', text: "Nine o'clock in the morning. That is perfect. How much will it cost to change the flight?" },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "The change will cost thirty-five pounds, and your new ticket will be sent to you by email." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Could I take your telephone number, please, in case we need to contact you?" },
          { speaker: 'Mr Bennett', voice: M, accent: 'en-GB', text: "Yes, my mobile number is oh seven nine four, six one two, eight three five." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Oh seven nine four, six one two, eight three five. Would you like a window seat or an aisle seat on the new flight?" },
          { speaker: 'Mr Bennett', voice: M, accent: 'en-GB', text: "I would like a window seat, please." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "A window seat. Would you like a vegetarian meal on the flight?" },
          { speaker: 'Mr Bennett', voice: M, accent: 'en-GB', text: "Yes, please. I would like a vegetarian meal." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "I will add a vegetarian meal to your booking. Is there anything else?" },
          { speaker: 'Mr Bennett', voice: M, accent: 'en-GB', text: "Yes. Can I take an extra bag on the flight?" },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Yes, you can take an extra bag, but it will cost twenty pounds." },
          { speaker: 'Mr Bennett', voice: M, accent: 'en-GB', text: "Twenty pounds. That is fine. Thank you very much for your help." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "You are welcome, Mr Bennett. Your new ticket will be sent to you by email. Goodbye." },
          { speaker: 'Mr Bennett', voice: M, accent: 'en-GB', text: "Goodbye." },
        ],
      },
      groups: [
        {
          id: 'm11l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 1, number: true },
          template:
            'SKYWAYS AIRLINES – CHANGE OF BOOKING\nName: David {{1}}\nBooking reference: {{2}}\nFlight to: {{3}}\nNew date: {{4}} November\nNew time: {{5}} in the morning\nChange fee: £{{6}}',
          questions: [
            { id: 'm11l-q1', number: 1, answer: { accepted: ['Bennett'] }, explanation: { text: 'His name is David Bennett.', evidence: { quote: 'my name is David Bennett' } } },
            { id: 'm11l-q2', number: 2, answer: { accepted: ['SKY4729'] }, explanation: { text: 'The booking reference is S, K, Y, four, seven, two, nine.', evidence: { quote: 'S, K, Y, four, seven, two, nine' } } },
            { id: 'm11l-q3', number: 3, answer: { accepted: ['Rome'] }, explanation: { text: 'The flight is to Rome.', evidence: { quote: 'my flight to Rome on the fifteenth of November' } } },
            { id: 'm11l-q4', number: 4, answer: { accepted: ['17', 'seventeenth'] }, explanation: { text: 'The new date is the seventeenth of November.', evidence: { quote: 'to the seventeenth of November' } } },
            { id: 'm11l-q5', number: 5, answer: { accepted: ['9', 'nine'] }, explanation: { text: 'The new flight is at nine o\'clock in the morning.', evidence: { quote: 'at nine o\'clock in the morning' } } },
            { id: 'm11l-q6', number: 6, answer: { accepted: ['35', 'thirty-five'] }, explanation: { text: 'The change will cost thirty-five pounds.', evidence: { quote: 'The change will cost thirty-five pounds' } } },
          ],
        },
        {
          id: 'm11l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm11l-q7',
              number: 7,
              prompt: 'Why does the agent ask for Mr Bennett\'s telephone number?',
              options: [
                { id: 'A', text: 'to send him his new ticket' },
                { id: 'B', text: 'in case they need to contact him' },
                { id: 'C', text: 'to change his booking' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The agent asks for the number in case they need to contact him.',
                evidence: { quote: 'in case we need to contact you' },
              },
            },
            {
              id: 'm11l-q8',
              number: 8,
              prompt: 'Which seat would Mr Bennett like on the new flight?',
              options: [
                { id: 'A', text: 'a window seat' },
                { id: 'B', text: 'an aisle seat' },
                { id: 'C', text: 'a middle seat' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Mr Bennett would like a window seat.',
                evidence: { quote: 'I would like a window seat, please' },
              },
            },
            {
              id: 'm11l-q9',
              number: 9,
              prompt: 'What kind of meal would Mr Bennett like on the flight?',
              options: [
                { id: 'A', text: 'a meat meal' },
                { id: 'B', text: 'a vegetarian meal' },
                { id: 'C', text: 'no meal' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Mr Bennett would like a vegetarian meal.',
                evidence: { quote: 'I would like a vegetarian meal' },
              },
            },
            {
              id: 'm11l-q10',
              number: 10,
              prompt: 'How much will it cost to take an extra bag on the flight?',
              options: [
                { id: 'A', text: 'ten pounds' },
                { id: 'B', text: 'twenty pounds' },
                { id: 'C', text: 'thirty-five pounds' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'An extra bag will cost twenty pounds.',
                evidence: { quote: 'it will cost twenty pounds' },
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
      title: 'Guide at an art gallery',
      audio: {
        intro: 'Part 2. You will hear a guide talking to visitors at an art gallery. First, you have some time to look at questions 11 to 14.',
        noun: 'talk',
        ...rec('l2'),
        sets: [
          { questions: '11 to 14', fromLine: 0 },
          { questions: '15 to 20', fromLine: 4 },
        ],
        script: [
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Good afternoon, everyone, and welcome to the Riverside Art Gallery. My name is Anna, and I will be your guide today." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "The gallery was opened in nineteen ninety-two, and it is open every day except Monday, from ten o'clock in the morning until six o'clock in the evening." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "More than one hundred thousand people visit the gallery every year, and entry to the gallery is free." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Please do not touch the paintings, and please do not use flash photography, because the light can damage the paintings." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "We will begin in Room One, where you can see portraits painted in the eighteenth century." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Next, we will visit Room Two, where you can see landscapes of the English countryside." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "After Room Two, we will go to Room Three, where you can see modern sculptures made from metal and glass." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Then we will visit Room Four, where you can see photographs of the city taken over the last fifty years." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "From Room Four, we will go to Room Five, where you can see paintings by local artists, and you can buy prints of these paintings in the gallery shop." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Finally, we will end our visit in the cafe, where you can enjoy a cup of tea and look out over the river." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "That is the end of my talk. If you have any questions, please come and find me. Thank you, and enjoy your visit." },
        ],
      },
      groups: [
        {
          id: 'm11l-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm11l-q11',
              number: 11,
              prompt: 'When was the Riverside Art Gallery opened?',
              options: [
                { id: 'A', text: 'in nineteen eighty-two' },
                { id: 'B', text: 'in nineteen ninety-two' },
                { id: 'C', text: 'in two thousand and two' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The gallery was opened in nineteen ninety-two.',
                evidence: { quote: 'was opened in nineteen ninety-two' },
              },
            },
            {
              id: 'm11l-q12',
              number: 12,
              prompt: 'On which day is the gallery closed?',
              options: [
                { id: 'A', text: 'on Sunday' },
                { id: 'B', text: 'on Monday' },
                { id: 'C', text: 'on Saturday' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The gallery is open every day except Monday.',
                evidence: { quote: 'open every day except Monday' },
              },
            },
            {
              id: 'm11l-q13',
              number: 13,
              prompt: 'How much does it cost to enter the gallery?',
              options: [
                { id: 'A', text: 'ten pounds' },
                { id: 'B', text: 'five pounds' },
                { id: 'C', text: 'nothing, entry is free' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'Entry to the gallery is free.',
                evidence: { quote: 'entry to the gallery is free' },
              },
            },
            {
              id: 'm11l-q14',
              number: 14,
              prompt: 'What are visitors asked not to do?',
              options: [
                { id: 'A', text: 'touch the paintings' },
                { id: 'B', text: 'talk to the guide' },
                { id: 'C', text: 'visit the cafe' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Visitors are asked not to touch the paintings.',
                evidence: { quote: 'do not touch the paintings' },
              },
            },
          ],
        },
        {
          id: 'm11l-g4',
          type: 'matching',
          instructions: 'What is said about each of the following places in the gallery? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 15–20.',
          optionsTitle: 'Features',
          options: [
            { id: 'A', text: 'Visitors can see portraits painted in the eighteenth century.' },
            { id: 'B', text: 'Visitors can see landscapes of the English countryside.' },
            { id: 'C', text: 'Visitors can see modern sculptures made from metal and glass.' },
            { id: 'D', text: 'Visitors can see photographs of the city taken over the last fifty years.' },
            { id: 'E', text: 'Visitors can see paintings by local artists.' },
            { id: 'F', text: 'Visitors can enjoy a cup of tea and look out over the river.' },
            { id: 'G', text: 'It sells tickets for concerts in the evening.' },
            { id: 'H', text: 'It is closed for repairs at the moment.' },
          ],
          questions: [
            { id: 'm11l-q15', number: 15, prompt: 'Room One', answer: { accepted: ['A'] }, explanation: { text: 'In Room One you can see portraits painted in the eighteenth century.', evidence: { quote: 'you can see portraits painted in the eighteenth century' } } },
            { id: 'm11l-q16', number: 16, prompt: 'Room Two', answer: { accepted: ['B'] }, explanation: { text: 'In Room Two you can see landscapes of the English countryside.', evidence: { quote: 'you can see landscapes of the English countryside' } } },
            { id: 'm11l-q17', number: 17, prompt: 'Room Three', answer: { accepted: ['C'] }, explanation: { text: 'In Room Three you can see modern sculptures made from metal and glass.', evidence: { quote: 'you can see modern sculptures made from metal and glass' } } },
            { id: 'm11l-q18', number: 18, prompt: 'Room Four', answer: { accepted: ['D'] }, explanation: { text: 'In Room Four you can see photographs of the city taken over the last fifty years.', evidence: { quote: 'you can see photographs of the city taken over the last fifty years' } } },
            { id: 'm11l-q19', number: 19, prompt: 'Room Five', answer: { accepted: ['E'] }, explanation: { text: 'In Room Five you can see paintings by local artists.', evidence: { quote: 'you can see paintings by local artists' } } },
            { id: 'm11l-q20', number: 20, prompt: 'Cafe', answer: { accepted: ['F'] }, explanation: { text: 'In the cafe you can enjoy a cup of tea and look out over the river.', evidence: { quote: 'you can enjoy a cup of tea and look out over the river' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Two students discussing a survey on shopping habits',
      audio: {
        intro: 'Part 3. You will hear two students, Emma and Liam, discussing a survey on shopping habits. First, you have some time to look at questions 21 to 25.',
        noun: 'discussion',
        ...rec('l3'),
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 14 },
        ],
        script: [
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Hi, Liam. Have you finished our survey on shopping habits?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "Yes, I have looked at the answers from two hundred students at our college." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Two hundred students. What did you find out first?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "First, I found that most students shop online at least once a week." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "That is interesting. What do they buy online?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "Most of them buy clothes and books online, and only a few buy food online." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "What about the shops in town? Do students still go there?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "Yes, about half of the students go to the shops in town every week, mainly to buy food and to meet their friends." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "How much money do students spend on shopping every month?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "On average, students spend about eighty pounds a month on shopping, and most of that money is spent on clothes." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "That is a lot of money. Do students use cash or cards to pay?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "Most students pay by card, and only a few pay by cash." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "What is the most surprising thing you found in the survey?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "The most surprising thing is that most students do not plan their shopping: they buy things when they see them in a shop or online." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "We have to present our results on Friday the twentieth of November, and each student will speak for five minutes." },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "Friday the twentieth of November. Who will speak first?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "I will speak first, and I will talk about what students buy online." },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "Good. I will speak second, and I will talk about how much money students spend." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "What about Mia? I think she should make the charts for our presentation." },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "Yes, and Ben can be in charge of the slides." },
        ],
      },
      groups: [
        {
          id: 'm11l-g5',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm11l-q21',
              number: 21,
              prompt: 'How many students answered the survey?',
              options: [
                { id: 'A', text: 'one hundred students' },
                { id: 'B', text: 'two hundred students' },
                { id: 'C', text: 'three hundred students' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Liam looked at the answers from two hundred students.',
                evidence: { quote: 'the answers from two hundred students' },
              },
            },
            {
              id: 'm11l-q22',
              number: 22,
              prompt: 'What do most students buy online?',
              options: [
                { id: 'A', text: 'clothes and books' },
                { id: 'B', text: 'food and drink' },
                { id: 'C', text: 'computers and phones' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Most of them buy clothes and books online.',
                evidence: { quote: 'Most of them buy clothes and books online' },
              },
            },
            {
              id: 'm11l-q23',
              number: 23,
              prompt: 'How much money do students spend on shopping every month, on average?',
              options: [
                { id: 'A', text: 'about fifty pounds' },
                { id: 'B', text: 'about eighty pounds' },
                { id: 'C', text: 'about one hundred pounds' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'On average, students spend about eighty pounds a month on shopping.',
                evidence: { quote: 'students spend about eighty pounds a month on shopping' },
              },
            },
            {
              id: 'm11l-q24',
              number: 24,
              prompt: 'How do most students pay for their shopping?',
              options: [
                { id: 'A', text: 'by cash' },
                { id: 'B', text: 'by card' },
                { id: 'C', text: 'by cheque' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Most students pay by card.',
                evidence: { quote: 'Most students pay by card' },
              },
            },
            {
              id: 'm11l-q25',
              number: 25,
              prompt: 'What is the most surprising thing Liam found in the survey?',
              options: [
                { id: 'A', text: 'Most students do not plan their shopping.' },
                { id: 'B', text: 'Most students never shop online.' },
                { id: 'C', text: 'Most students spend all their money on food.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Most students do not plan their shopping: they buy things when they see them.',
                evidence: { quote: 'most students do not plan their shopping' },
              },
            },
          ],
        },
        {
          id: 'm11l-g6',
          type: 'matching',
          instructions: 'What was agreed about each part of the presentation plan? Choose FIVE answers from the box and write the correct letter, A–F, next to Questions 26–30.',
          optionsTitle: 'Decisions',
          options: [
            { id: 'A', text: 'She will speak first and talk about what students buy online.' },
            { id: 'B', text: 'He will speak second and talk about how much money students spend.' },
            { id: 'C', text: 'She will make the charts for the presentation.' },
            { id: 'D', text: 'He will be in charge of the slides.' },
            { id: 'E', text: 'It will be on Friday the twentieth of November.' },
            { id: 'F', text: 'She will write about shopping in other countries.' },
          ],
          questions: [
            { id: 'm11l-q26', number: 26, prompt: 'Emma', answer: { accepted: ['A'] }, explanation: { text: 'Emma will speak first, and she will talk about what students buy online.', evidence: { quote: 'I will speak first, and I will talk about what students buy online' } } },
            { id: 'm11l-q27', number: 27, prompt: 'Liam', answer: { accepted: ['B'] }, explanation: { text: 'Liam will speak second, and he will talk about how much money students spend.', evidence: { quote: 'I will speak second, and I will talk about how much money students spend' } } },
            { id: 'm11l-q28', number: 28, prompt: 'Mia', answer: { accepted: ['C'] }, explanation: { text: 'Mia should make the charts for the presentation.', evidence: { quote: 'she should make the charts for our presentation' } } },
            { id: 'm11l-q29', number: 29, prompt: 'Ben', answer: { accepted: ['D'] }, explanation: { text: 'Ben can be in charge of the slides.', evidence: { quote: 'Ben can be in charge of the slides' } } },
            { id: 'm11l-q30', number: 30, prompt: 'The presentation', answer: { accepted: ['E'] }, explanation: { text: 'The students have to present their results on Friday the twentieth of November.', evidence: { quote: 'present our results on Friday the twentieth of November' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Lecture: earthquakes',
      audio: {
        intro: 'Part 4. You will hear a lecture about earthquakes. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Good morning. Today I am going to talk about earthquakes: what causes them, where they happen, and how scientists try to predict them." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "An earthquake happens when the ground suddenly moves, and this movement is caused by rocks deep under the surface of the Earth breaking and moving." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "The surface of the Earth is made up of large pieces of rock, called plates, which move very slowly, about as fast as your fingernails grow." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Most earthquakes happen at the edges of these plates, where the plates push against each other or move apart." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "The place deep under the ground where the rocks first break is called the focus, and the place on the surface directly above the focus is called the epicentre." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Scientists measure the size of an earthquake on a scale called the Richter scale, and a strong earthquake can measure more than seven on this scale." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "It is very difficult to predict exactly when an earthquake will happen, and scientists cannot say the day or the hour when the next earthquake will come." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "However, scientists can say which places are most at risk, and they can study the history of earthquakes in a place to see how often they happen there." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In countries where earthquakes are common, buildings are now made stronger, so that they do not fall down when the ground moves, and people are taught what to do when they feel the ground move." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In conclusion, earthquakes are a natural part of our planet, but with careful planning, we can reduce the damage they cause. That brings us to the end of the lecture." },
        ],
      },
      groups: [
        {
          id: 'm11l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'EARTHQUAKES\nWhat causes an earthquake\n• an earthquake happens when the ground suddenly {{31}}\n• this movement is caused by rocks deep under the {{32}} of the Earth breaking and moving\n• the surface of the Earth is made up of large pieces of rock, called {{33}}\n• most earthquakes happen at the {{34}} of these plates\nThe focus and the epicentre\n• the place deep under the ground where the rocks first break is called the {{35}}\n• the place on the surface directly above the focus is called the {{36}}\nMeasuring earthquakes\n• scientists measure the size of an earthquake on a scale called the {{37}} scale\nPredicting earthquakes\n• it is very difficult to {{38}} exactly when an earthquake will happen\n• scientists can say which places are most at {{39}}\nReducing damage\n• in countries where earthquakes are common, buildings are now made {{40}}, so that they do not fall down',
          questions: [
            { id: 'm11l-q31', number: 31, answer: { accepted: ['moves'] }, explanation: { text: 'An earthquake happens when the ground suddenly moves.', evidence: { quote: 'the ground suddenly moves' } } },
            { id: 'm11l-q32', number: 32, answer: { accepted: ['surface'] }, explanation: { text: 'The movement is caused by rocks deep under the surface of the Earth.', evidence: { quote: 'deep under the surface of the Earth' } } },
            { id: 'm11l-q33', number: 33, answer: { accepted: ['plates'] }, explanation: { text: 'The surface of the Earth is made up of large pieces of rock, called plates.', evidence: { quote: 'large pieces of rock, called plates' } } },
            { id: 'm11l-q34', number: 34, answer: { accepted: ['edges'] }, explanation: { text: 'Most earthquakes happen at the edges of these plates.', evidence: { quote: 'at the edges of these plates' } } },
            { id: 'm11l-q35', number: 35, answer: { accepted: ['focus'] }, explanation: { text: 'The place where the rocks first break is called the focus.', evidence: { quote: 'is called the focus' } } },
            { id: 'm11l-q36', number: 36, answer: { accepted: ['epicentre'] }, explanation: { text: 'The place on the surface directly above the focus is called the epicentre.', evidence: { quote: 'is called the epicentre' } } },
            { id: 'm11l-q37', number: 37, answer: { accepted: ['Richter'] }, explanation: { text: 'Scientists measure the size of an earthquake on a scale called the Richter scale.', evidence: { quote: 'called the Richter scale' } } },
            { id: 'm11l-q38', number: 38, answer: { accepted: ['predict'] }, explanation: { text: 'It is very difficult to predict exactly when an earthquake will happen.', evidence: { quote: 'to predict exactly when an earthquake will happen' } } },
            { id: 'm11l-q39', number: 39, answer: { accepted: ['risk'] }, explanation: { text: 'Scientists can say which places are most at risk.', evidence: { quote: 'which places are most at risk' } } },
            { id: 'm11l-q40', number: 40, answer: { accepted: ['stronger'] }, explanation: { text: 'Buildings are now made stronger, so that they do not fall down.', evidence: { quote: 'buildings are now made stronger' } } },
          ],
        },
      ],
    },
  ],
};
