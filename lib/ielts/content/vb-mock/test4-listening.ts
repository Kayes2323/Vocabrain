import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 4 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material.
 */

const rec = (partId: string) => recorded('vb-mock-4', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock4Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Reporting a missing parcel',
      audio: {
        intro: 'Part 1. You will hear a customer phoning a delivery company about a parcel that never arrived. First, you have some time to look at questions 1 to 6.',
        noun: 'conversation',
        ...rec('l1'),
        // Questions 1–6 are answered by line 17; the break comes before the tracking is checked.
        sets: [
          { questions: '1 to 6', fromLine: 0 },
          { questions: '7 to 10', fromLine: 18 },
        ],
        script: [
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: "Good morning, Swiftline Delivery. This is Rachel speaking. How can I help?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Hello. I'm calling about a parcel that never arrived. I ordered it online, and it was supposed to be delivered last week." },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: "I'm sorry to hear that. Let me take a few details. Could I have your name, please?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Yes, it's Emma Collins." },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: "Could you spell your surname for me, please?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Sure. C, O, L, L, I, N, S." },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: "Thank you. And your order number? It should be in the email we sent you." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Let me check. It's seven, three, nine, four, five, one." },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: "Seven three nine four five one. Thank you. Now, when was the parcel sent?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "I think it was sent on the tenth of November — that's the date in the email." },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: "Let me check our records. It actually left our warehouse on the ninth of November, not the tenth." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Oh, right — the ninth, then." },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: "And what was in the parcel?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "It was books — three novels I ordered as a birthday present." },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: "And what was the value of the parcel?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Forty-five pounds." },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: "Thank you. And which town was it being delivered to?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Oakfield. That's where I live." },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: "Oakfield, thank you. Now let me check the tracking information for you." },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: "The tracking says the parcel was delivered last Tuesday, and it was signed for." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "But I was at work all day on Tuesday, and there was no card through the door. Nobody signed for anything at my house." },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: "I see. The signature isn't clear on our system. The first thing we'll do is speak to the driver who was on that round, and ask him where he left the parcel." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "That sounds sensible. Will you send a replacement straight away?" },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: "I'm afraid not. We only send a replacement once we've finished checking with the driver. If we can't find the parcel, then we'll send a new one, or give you a refund." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "I see. Is there anything I should do in the meantime?" },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: "Yes — could you check with your neighbours, please? Sometimes a driver leaves a parcel with a neighbour, and forgets to leave a card." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Of course, I'll ask them this evening." },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: "Thank you. I'll phone you back with an update by Friday." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "By Friday — that's good. Thank you for your help, Rachel." },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: "You're welcome, Emma. Goodbye." },
        ],
      },
      groups: [
        {
          id: 'm4l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 1, number: true },
          template:
            'SWIFTLINE DELIVERY – MISSING PARCEL FORM\nCustomer name: Emma {{1}}\nOrder number: {{2}}\nDate parcel was sent: {{3}} November\nContents of parcel: {{4}}\nValue of parcel: £{{5}}\nDelivery town: {{6}}',
          questions: [
            { id: 'm4l-q1', number: 1, answer: { accepted: ['Collins'] }, explanation: { text: 'The surname is spelled out: C-O-L-L-I-N-S.', evidence: { quote: 'C, O, L, L, I, N, S.' } } },
            {
              id: 'm4l-q2',
              number: 2,
              answer: { accepted: ['739451', '739 451'] },
              explanation: { text: 'The order number is read out digit by digit.', evidence: { quote: "It's seven, three, nine, four, five, one." } },
            },
            {
              id: 'm4l-q3',
              number: 3,
              answer: { accepted: ['9', '9th', 'ninth'] },
              explanation: { text: 'The parcel left the warehouse on the 9th, not the 10th as Emma first thought.', evidence: { quote: 'It actually left our warehouse on the ninth of November, not the tenth' } },
            },
            {
              id: 'm4l-q4',
              number: 4,
              answer: { accepted: ['books'] },
              explanation: { text: 'The parcel contained three novels.', evidence: { quote: 'It was books — three novels I ordered as a birthday present.' } },
            },
            {
              id: 'm4l-q5',
              number: 5,
              answer: { accepted: ['45'] },
              explanation: { text: 'The value of the parcel was forty-five pounds.', evidence: { quote: 'Forty-five pounds.' } },
            },
            {
              id: 'm4l-q6',
              number: 6,
              answer: { accepted: ['Oakfield'] },
              explanation: { text: 'The parcel was being delivered to Oakfield, where Emma lives.', evidence: { quote: "Oakfield. That's where I live." } },
            },
          ],
        },
        {
          id: 'm4l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm4l-q7',
              number: 7,
              prompt: 'According to the tracking information, what happened to the parcel?',
              options: [
                { id: 'A', text: 'It is still at the depot.' },
                { id: 'B', text: 'It was delivered last Tuesday.' },
                { id: 'C', text: 'It was returned to the sender.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The tracking says the parcel was delivered last Tuesday and signed for.',
                evidence: { quote: 'The tracking says the parcel was delivered last Tuesday, and it was signed for.' },
              },
            },
            {
              id: 'm4l-q8',
              number: 8,
              prompt: 'What will the company do first?',
              options: [
                { id: 'A', text: 'send a replacement parcel' },
                { id: 'B', text: 'speak to the driver' },
                { id: 'C', text: 'give Emma a refund' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The first step is to speak to the driver who was on that round.',
                evidence: { quote: "The first thing we'll do is speak to the driver who was on that round" },
                distractors: { A: 'A replacement is only sent once the check with the driver is finished.', C: 'A refund is only given if the parcel cannot be found.' },
              },
            },
            {
              id: 'm4l-q9',
              number: 9,
              prompt: 'What does Rachel ask Emma to do?',
              options: [
                { id: 'A', text: 'check with her neighbours' },
                { id: 'B', text: 'wait at home all day' },
                { id: 'C', text: 'phone the shop she ordered from' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Rachel asks Emma to check with her neighbours, in case the driver left the parcel with one of them.',
                evidence: { quote: 'could you check with your neighbours, please?' },
              },
            },
            {
              id: 'm4l-q10',
              number: 10,
              prompt: 'When will Rachel phone Emma back?',
              options: [
                { id: 'A', text: 'tomorrow' },
                { id: 'B', text: 'by Friday' },
                { id: 'C', text: 'next Monday' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Rachel says she will phone back with an update by Friday.',
                evidence: { quote: "I'll phone you back with an update by Friday." },
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
      title: 'A new sports centre',
      audio: {
        intro: 'Part 2. You will hear a manager talking to a group of visitors at a new sports centre. First, you have some time to look at questions 11 to 20.',
        noun: 'talk',
        ...rec('l2'),
        // Questions 11–14 are answered by line 4; the break comes before the facilities are described.
        sets: [
          { questions: '11 to 14', fromLine: 0 },
          { questions: '15 to 20', fromLine: 5 },
        ],
        script: [
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "Good morning, everyone, and welcome to Brookfield Sports Centre. My name's Tom, and I'm the manager here. Before you look around, let me tell you a little about the centre." },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "The centre opened six months ago, in March. The building work was finished last year, but we needed a few more months to fit out the changing rooms and the café." },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "Membership costs thirty-two pounds a month. A day ticket costs eight pounds, and students pay twenty-five pounds a month, but that rate is only for full-time students." },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "Before your first visit, please fill in the health form on our website. It only takes five minutes, and we need it before you can use any of the facilities." },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "For parking, please use the car park behind the library, which is free for centre users. Our own car park is small, and it's usually full by nine o'clock in the morning." },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "Let's start with the Main Hall, our largest room. It's used for badminton and basketball, and at weekends you can hire it for private events, like birthday parties." },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "Next is the swimming pool. It's twenty-five metres long, and the water is kept at twenty-nine degrees. We run swimming lessons for children here on Saturday mornings." },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "Then there's the Fitness Studio. We run more than forty classes a week here — everything from yoga to high-intensity training — and all the classes are led by qualified instructors." },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "The climbing wall is twelve metres high, the tallest in the county. It's very popular, but beginners must always climb with an instructor — you can't climb on your own until you've passed a safety test." },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "We also have two squash courts. They're very busy in the evenings, so you need to book a court at least a day in advance, either online or at reception." },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "Finally, the café is on the ground floor. It serves hot food and drinks, and it's open to everyone — you don't need to be a member to eat there." },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "That's the end of my talk. If you have any questions, please ask me or one of the staff at reception. Enjoy your visit." },
        ],
      },
      groups: [
        {
          id: 'm4l-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm4l-q11',
              number: 11,
              prompt: 'When did the sports centre open?',
              options: [
                { id: 'A', text: 'last month' },
                { id: 'B', text: 'six months ago' },
                { id: 'C', text: 'last year' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The centre opened six months ago, in March.',
                evidence: { quote: 'The centre opened six months ago, in March.' },
                distractors: { C: 'Last year is when the building work was finished, not when the centre opened.' },
              },
            },
            {
              id: 'm4l-q12',
              number: 12,
              prompt: 'How much does monthly membership cost?',
              options: [
                { id: 'A', text: '£25' },
                { id: 'B', text: '£32' },
                { id: 'C', text: '£8' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Membership costs thirty-two pounds a month.',
                evidence: { quote: 'Membership costs thirty-two pounds a month.' },
                distractors: { A: 'That is the monthly rate for full-time students.', C: 'That is the price of a day ticket.' },
              },
            },
            {
              id: 'm4l-q13',
              number: 13,
              prompt: 'What must visitors do before their first visit?',
              options: [
                { id: 'A', text: 'fill in a health form on the website' },
                { id: 'B', text: 'bring a passport' },
                { id: 'C', text: 'book a class' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Visitors must fill in the health form on the website before they can use the facilities.',
                evidence: { quote: 'please fill in the health form on our website' },
              },
            },
            {
              id: 'm4l-q14',
              number: 14,
              prompt: 'Where should visitors park?',
              options: [
                { id: 'A', text: 'in the centre’s own car park' },
                { id: 'B', text: 'in the car park behind the library' },
                { id: 'C', text: 'on the street outside the centre' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Visitors should use the car park behind the library, which is free for centre users.',
                evidence: { quote: 'please use the car park behind the library, which is free for centre users' },
                distractors: { A: 'The centre’s own car park is small and usually full by nine o’clock.' },
              },
            },
          ],
        },
        {
          id: 'm4l-g4',
          type: 'matching',
          instructions: 'What is said about each of the following facilities in the sports centre? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 15–20.',
          optionsTitle: 'Features',
          options: [
            { id: 'A', text: 'It can be hired for private events.' },
            { id: 'B', text: 'It offers lessons for children.' },
            { id: 'C', text: 'It runs more than forty classes a week.' },
            { id: 'D', text: 'Beginners must climb with an instructor.' },
            { id: 'E', text: 'It must be booked at least a day in advance.' },
            { id: 'F', text: 'You do not need to be a member to use it.' },
            { id: 'G', text: 'It is open until ten o’clock every night.' },
            { id: 'H', text: 'It has a sauna.' },
          ],
          questions: [
            { id: 'm4l-q15', number: 15, prompt: 'Main Hall', answer: { accepted: ['A'] }, explanation: { text: 'At weekends the Main Hall can be hired for private events such as birthday parties.', evidence: { quote: 'you can hire it for private events, like birthday parties' } } },
            { id: 'm4l-q16', number: 16, prompt: 'Swimming Pool', answer: { accepted: ['B'] }, explanation: { text: 'Swimming lessons for children run at the pool on Saturday mornings.', evidence: { quote: 'We run swimming lessons for children here on Saturday mornings.' } } },
            { id: 'm4l-q17', number: 17, prompt: 'Fitness Studio', answer: { accepted: ['C'] }, explanation: { text: 'More than forty classes a week run in the Fitness Studio.', evidence: { quote: 'We run more than forty classes a week here' } } },
            { id: 'm4l-q18', number: 18, prompt: 'Climbing Wall', answer: { accepted: ['D'] }, explanation: { text: 'Beginners must always climb with an instructor.', evidence: { quote: 'beginners must always climb with an instructor' } } },
            { id: 'm4l-q19', number: 19, prompt: 'Squash Courts', answer: { accepted: ['E'] }, explanation: { text: 'A squash court needs to be booked at least a day in advance.', evidence: { quote: 'you need to book a court at least a day in advance' } } },
            { id: 'm4l-q20', number: 20, prompt: 'Café', answer: { accepted: ['F'] }, explanation: { text: 'The café is open to everyone, with no membership needed.', evidence: { quote: "you don't need to be a member to eat there" } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Planning a field trip to a wind farm',
      audio: {
        intro: 'Part 3. You will hear two students, Priya and Sam, discussing a field trip to a wind farm. First, you have some time to look at questions 21 to 30.',
        noun: 'discussion',
        ...rec('l3'),
        // Questions 21–25 are answered by line 8; the break comes before the practical arrangements are agreed.
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 9 },
        ],
        script: [
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "Right, Sam, let's plan our class field trip to Hillside Wind Farm. The teacher wants us to organise it ourselves, so we need to agree on the details today." },
          { speaker: 'Sam', voice: M, accent: 'en-GB', text: "Good idea. The main reason for going is to see how the turbines work — it's much better than just reading about them in a textbook." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "How far away is the wind farm?" },
          { speaker: 'Sam', voice: M, accent: 'en-GB', text: "It's about forty-five miles from here. I thought it was only twenty miles, but I checked the map, and it's forty-five. It takes about an hour and a half by road." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "What did you find out about the turbines themselves?" },
          { speaker: 'Sam', voice: M, accent: 'en-GB', text: "Each turbine can power about fifteen hundred homes. I was surprised — I expected it to be about five hundred." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "And what about the weather? We'll be out on a hilltop all morning." },
          { speaker: 'Sam', voice: M, accent: 'en-GB', text: "We need to take warm clothes and waterproof jackets. It will probably be sunny, but it's always windy up there, and it can feel very cold." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "Good point. And the main aim is to collect data for our report — wind speeds and the number of turbines — not just to take photographs." },
          { speaker: 'Sam', voice: M, accent: 'en-GB', text: "Right. Now, transport. The train station is five miles from the farm, so a train wouldn't work. Let's go by coach — the coach can drop us right at the entrance." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "That makes sense. What day shall we go? The farm is closed to visitors on Fridays, so let's go on Thursday, when the teacher is free." },
          { speaker: 'Sam', voice: M, accent: 'en-GB', text: "Thursday it is. What about lunch? There's no café at the farm, so everyone will need to bring a packed lunch." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "I'll put that in the letter to parents. And the permission forms — I'll collect them from everyone by Wednesday." },
          { speaker: 'Sam', voice: M, accent: 'en-GB', text: "Good. And after the trip, one of us needs to present our findings to the class. I'll do that, on Monday, if that's OK with you." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "Perfect. Let's tell the teacher we've agreed everything." },
        ],
      },
      groups: [
        {
          id: 'm4l-g5',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm4l-q21',
              number: 21,
              prompt: 'What is the main reason for visiting the wind farm?',
              options: [
                { id: 'A', text: 'to see how the turbines work' },
                { id: 'B', text: 'to study the birds that live there' },
                { id: 'C', text: 'to learn about solar power' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The main reason is to see how the turbines work, rather than just reading about them.',
                evidence: { quote: 'The main reason for going is to see how the turbines work' },
              },
            },
            {
              id: 'm4l-q22',
              number: 22,
              prompt: 'How far away is the wind farm?',
              options: [
                { id: 'A', text: '20 miles' },
                { id: 'B', text: '45 miles' },
                { id: 'C', text: '90 miles' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The wind farm is about forty-five miles away.',
                evidence: { quote: "It's about forty-five miles from here." },
                distractors: { A: 'That is what Sam first thought, before he checked the map.' },
              },
            },
            {
              id: 'm4l-q23',
              number: 23,
              prompt: 'What surprised Sam about the turbines?',
              options: [
                { id: 'A', text: 'Each turbine can power about 1,500 homes.' },
                { id: 'B', text: 'Each turbine is over 100 metres tall.' },
                { id: 'C', text: 'The turbines make no noise at all.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Sam was surprised that each turbine can power about fifteen hundred homes; he had expected about five hundred.',
                evidence: { quote: 'Each turbine can power about fifteen hundred homes.' },
                distractors: { B: 'The height of the turbines is not mentioned.' },
              },
            },
            {
              id: 'm4l-q24',
              number: 24,
              prompt: 'What does Sam say about the weather on the trip?',
              options: [
                { id: 'A', text: 'Students need warm clothes and waterproof jackets.' },
                { id: 'B', text: 'The trip will be cancelled if it rains.' },
                { id: 'C', text: 'It will be hot all day.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Even if it is sunny, the hilltop is windy and can feel very cold, so warm, waterproof clothing is needed.',
                evidence: { quote: 'We need to take warm clothes and waterproof jackets.' },
              },
            },
            {
              id: 'm4l-q25',
              number: 25,
              prompt: 'What is the main aim of the visit?',
              options: [
                { id: 'A', text: 'to collect data for a report' },
                { id: 'B', text: 'to take photographs for a display' },
                { id: 'C', text: 'to interview the farm workers' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The main aim is to collect data for their report — wind speeds and the number of turbines.',
                evidence: { quote: 'the main aim is to collect data for our report' },
                distractors: { B: 'Taking photographs is not the main aim.' },
              },
            },
          ],
        },
        {
          id: 'm4l-g6',
          type: 'matching',
          instructions: 'What was agreed about each part of the field trip? Choose FIVE answers from the box and write the correct letter, A–F, next to Questions 26–30.',
          optionsTitle: 'Decisions',
          options: [
            { id: 'A', text: 'They will go by coach.' },
            { id: 'B', text: 'They will go by train.' },
            { id: 'C', text: 'The trip will be on Thursday.' },
            { id: 'D', text: 'Students will bring a packed lunch.' },
            { id: 'E', text: 'Priya will collect the permission forms.' },
            { id: 'F', text: 'Sam will present the findings to the class.' },
          ],
          questions: [
            { id: 'm4l-q26', number: 26, prompt: 'transport', answer: { accepted: ['A'] }, explanation: { text: 'They will go by coach, which can drop them at the entrance; the train station is five miles from the farm.', evidence: { quote: "Let's go by coach — the coach can drop us right at the entrance." }, distractors: { B: 'A train would not work, because the station is five miles from the farm.' } } },
            { id: 'm4l-q27', number: 27, prompt: 'day of the trip', answer: { accepted: ['C'] }, explanation: { text: 'They will go on Thursday, when the teacher is free; the farm is closed to visitors on Fridays.', evidence: { quote: "let's go on Thursday, when the teacher is free" } } },
            { id: 'm4l-q28', number: 28, prompt: 'lunch', answer: { accepted: ['D'] }, explanation: { text: 'There is no café at the farm, so everyone needs to bring a packed lunch.', evidence: { quote: 'everyone will need to bring a packed lunch' } } },
            { id: 'm4l-q29', number: 29, prompt: 'permission forms', answer: { accepted: ['E'] }, explanation: { text: 'Priya will collect the permission forms from everyone by Wednesday.', evidence: { quote: "I'll collect them from everyone by Wednesday." } } },
            { id: 'm4l-q30', number: 30, prompt: 'presentation of findings', answer: { accepted: ['F'] }, explanation: { text: 'Sam will present their findings to the class on Monday.', evidence: { quote: "I'll do that, on Monday, if that's OK with you." } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Lecture: the history of photography',
      audio: {
        intro: 'Part 4. You will hear a lecture about the history of photography. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "Good morning. Today I'm going to talk about the history of photography — how it began, how it changed, and how we take photographs today." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "The first permanent photograph was taken in eighteen twenty-six, by a French inventor called Niépce. His photograph needed a very long exposure — the plate stayed in the camera for several hours." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "Like all early photographs, it was in black and white. Thirteen years later, in eighteen thirty-nine, another Frenchman, Daguerre, announced a new process, the daguerreotype. Some books say eighteen thirty-seven, but the announcement was in eighteen thirty-nine." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "The daguerreotype produced a clear image on a metal plate coated with silver. It was expensive, so at first only rich people could afford to have their portrait taken." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "The next important step was paper. In the eighteen-forties, Talbot's calotype process allowed photographs to be printed on paper, so many copies could be made from a single negative." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "Then, in eighteen eighty-eight, the Kodak company introduced a simple camera that used roll film. Some people say eighteen ninety, but it was eighteen eighty-eight. For the first time, ordinary people could take photographs themselves." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "Colour photography existed in the early nineteen-hundreds, but it was expensive. It was only in the nineteen-sixties that colour photography became common, and most family photographs were in colour." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "The next big change was digital. The first digital cameras appeared in the nineteen-nineties. They needed no film, and the photographs were stored as files on a memory card." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "Today, most photographs are taken on mobile phones, not on cameras. We take more photographs in a day than people took in a whole year a century ago. That brings us to the end of the lecture." },
        ],
      },
      groups: [
        {
          id: 'm4l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'HISTORY OF PHOTOGRAPHY\nBeginnings\n• the first permanent photograph was taken in {{31}}\n• the first photographs needed an exposure of several {{32}}\n• early photographs were in black and {{33}}\nThe daguerreotype\n• the process was announced in France in {{34}}\n• plates were coated with {{35}}\nPaper photographs\n• the calotype allowed photographs to be printed on {{36}}\n• the Kodak camera, introduced in 1888, used roll {{37}}\nColour and digital\n• in the 1960s, {{38}} photography became common\n• the first {{39}} cameras appeared in the 1990s\n• today, most photographs are taken on {{40}}',
          questions: [
            { id: 'm4l-q31', number: 31, answer: { accepted: ['1826'] }, explanation: { text: 'The first permanent photograph was taken in 1826.', evidence: { quote: 'The first permanent photograph was taken in eighteen twenty-six' } } },
            { id: 'm4l-q32', number: 32, answer: { accepted: ['hours'] }, explanation: { text: 'The first photograph needed an exposure of several hours.', evidence: { quote: 'the plate stayed in the camera for several hours' } } },
            { id: 'm4l-q33', number: 33, answer: { accepted: ['white'] }, explanation: { text: 'All early photographs were in black and white.', evidence: { quote: 'it was in black and white' } } },
            { id: 'm4l-q34', number: 34, answer: { accepted: ['1839'] }, explanation: { text: 'Daguerre announced the daguerreotype in 1839, not 1837 as some books say.', evidence: { quote: 'the announcement was in eighteen thirty-nine' } } },
            { id: 'm4l-q35', number: 35, answer: { accepted: ['silver'] }, explanation: { text: 'The daguerreotype image was on a metal plate coated with silver.', evidence: { quote: 'on a metal plate coated with silver' } } },
            { id: 'm4l-q36', number: 36, answer: { accepted: ['paper'] }, explanation: { text: 'The calotype allowed photographs to be printed on paper.', evidence: { quote: 'allowed photographs to be printed on paper' } } },
            { id: 'm4l-q37', number: 37, answer: { accepted: ['film'] }, explanation: { text: 'The Kodak camera introduced in 1888 used roll film.', evidence: { quote: 'introduced a simple camera that used roll film' } } },
            { id: 'm4l-q38', number: 38, answer: { accepted: ['colour', 'color'] }, explanation: { text: 'Colour photography became common in the 1960s.', evidence: { quote: 'colour photography became common' } } },
            { id: 'm4l-q39', number: 39, answer: { accepted: ['digital'] }, explanation: { text: 'The first digital cameras appeared in the 1990s.', evidence: { quote: 'The first digital cameras appeared in the nineteen-nineties.' } } },
            { id: 'm4l-q40', number: 40, answer: { accepted: ['phones', 'phone'] }, explanation: { text: 'Today most photographs are taken on mobile phones.', evidence: { quote: 'most photographs are taken on mobile phones' } } },
          ],
        },
      ],
    },
  ],
};
