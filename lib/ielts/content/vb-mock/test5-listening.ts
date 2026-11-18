import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 5 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material.
 */

const rec = (partId: string) => recorded('vb-mock-5', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock5Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Booking a hotel room by phone',
      audio: {
        intro: 'Part 1. You will hear a man phoning a hotel to book a room. First, you have some time to look at questions 1 to 6.',
        noun: 'conversation',
        ...rec('l1'),
        // Questions 1–6 are answered by line 15; the break comes before breakfast is discussed.
        sets: [
          { questions: '1 to 6', fromLine: 0 },
          { questions: '7 to 10', fromLine: 16 },
        ],
        script: [
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Good afternoon, Riverside Hotel. This is Claire speaking. How can I help you?" },
          { speaker: 'James', voice: M, accent: 'en-GB', text: "Hello. I'd like to book a room for next month, please." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Of course. Could I take your name, please?" },
          { speaker: 'James', voice: M, accent: 'en-GB', text: "Yes, it's James Carter." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Could you spell your surname for me, please?" },
          { speaker: 'James', voice: M, accent: 'en-GB', text: "Sure. C, A, R, T, E, R." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Thank you. And what date would you like to arrive?" },
          { speaker: 'James', voice: M, accent: 'en-GB', text: "On the fifteenth of June." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "The fifteenth of June. And how many nights will you be staying?" },
          { speaker: 'James', voice: M, accent: 'en-GB', text: "Three nights, please — until the eighteenth of June." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Three nights. And what type of room would you like?" },
          { speaker: 'James', voice: M, accent: 'en-GB', text: "A double room, please." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "A double room. And how many guests will there be?" },
          { speaker: 'James', voice: M, accent: 'en-GB', text: "Just two of us — my wife and I." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Two guests. Could I have a telephone number, in case we need to contact you?" },
          { speaker: 'James', voice: M, accent: 'en-GB', text: "Yes, it's oh seven seven double oh, nine double oh, four six one." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Thank you. Now, would you like breakfast included in the price?" },
          { speaker: 'James', voice: M, accent: 'en-GB', text: "Yes, please. What time is breakfast served?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Breakfast is served from seven o'clock until ten o'clock in the restaurant on the ground floor." },
          { speaker: 'James', voice: M, accent: 'en-GB', text: "That's good. Is there a car park at the hotel?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Yes, there is a car park behind the hotel, and parking is free for guests." },
          { speaker: 'James', voice: M, accent: 'en-GB', text: "That's very helpful. What time can we check in?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "You can check in from three o'clock in the afternoon." },
          { speaker: 'James', voice: M, accent: 'en-GB', text: "And what time do we need to check out?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Please check out by eleven o'clock in the morning." },
          { speaker: 'James', voice: M, accent: 'en-GB', text: "I see. Is there a swimming pool at the hotel?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Yes, there is a small indoor pool, and it's open from seven in the morning until nine in the evening." },
          { speaker: 'James', voice: M, accent: 'en-GB', text: "Thank you. I'll look forward to our stay." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "You're welcome, Mr Carter. We'll send you a confirmation email today. Goodbye." },
          { speaker: 'James', voice: M, accent: 'en-GB', text: "Goodbye." },
        ],
      },
      groups: [
        {
          id: 'm5l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 1, number: true },
          template:
            'RIVERSIDE HOTEL – BOOKING FORM\nGuest name: James {{1}}\nArrival date: {{2}} June\nNumber of nights: {{3}}\nType of room: {{4}}\nNumber of guests: {{5}}\nTelephone number: {{6}}',
          questions: [
            { id: 'm5l-q1', number: 1, answer: { accepted: ['Carter'] }, explanation: { text: 'The surname is spelled out: C-A-R-T-E-R.', evidence: { quote: 'C, A, R, T, E, R.' } } },
            { id: 'm5l-q2', number: 2, answer: { accepted: ['15', '15th', 'fifteenth'] }, explanation: { text: 'James will arrive on the fifteenth of June.', evidence: { quote: 'On the fifteenth of June.' } } },
            { id: 'm5l-q3', number: 3, answer: { accepted: ['3', 'three'] }, explanation: { text: 'James will stay for three nights.', evidence: { quote: 'Three nights, please' } } },
            { id: 'm5l-q4', number: 4, answer: { accepted: ['double'] }, explanation: { text: 'James asks for a double room.', evidence: { quote: 'A double room, please.' } } },
            { id: 'm5l-q5', number: 5, answer: { accepted: ['2', 'two'] }, explanation: { text: 'There will be two guests: James and his wife.', evidence: { quote: 'Just two of us' } } },
            { id: 'm5l-q6', number: 6, answer: { accepted: ['07700900461', '07700 900461'] }, explanation: { text: 'The telephone number is read out digit by digit: 07700 900461.', evidence: { quote: "it's oh seven seven double oh, nine double oh, four six one." } } },
          ],
        },
        {
          id: 'm5l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm5l-q7',
              number: 7,
              prompt: 'What time is breakfast served?',
              options: [
                { id: 'A', text: 'from six o’clock until nine o’clock' },
                { id: 'B', text: 'from seven o’clock until ten o’clock' },
                { id: 'C', text: 'from eight o’clock until eleven o’clock' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Breakfast is served from seven o’clock until ten o’clock.',
                evidence: { quote: "Breakfast is served from seven o'clock until ten o'clock" },
              },
            },
            {
              id: 'm5l-q8',
              number: 8,
              prompt: 'Where is the hotel car park?',
              options: [
                { id: 'A', text: 'in front of the hotel' },
                { id: 'B', text: 'behind the hotel' },
                { id: 'C', text: 'under the hotel' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'There is a car park behind the hotel, and parking is free for guests.',
                evidence: { quote: 'there is a car park behind the hotel' },
              },
            },
            {
              id: 'm5l-q9',
              number: 9,
              prompt: 'What time can guests check in?',
              options: [
                { id: 'A', text: 'from one o’clock in the afternoon' },
                { id: 'B', text: 'from three o’clock in the afternoon' },
                { id: 'C', text: 'from five o’clock in the afternoon' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Guests can check in from three o’clock in the afternoon.',
                evidence: { quote: "You can check in from three o'clock in the afternoon." },
              },
            },
            {
              id: 'm5l-q10',
              number: 10,
              prompt: 'Until what time is the swimming pool open in the evening?',
              options: [
                { id: 'A', text: 'until seven o’clock' },
                { id: 'B', text: 'until eight o’clock' },
                { id: 'C', text: 'until nine o’clock' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'The pool is open until nine in the evening.',
                evidence: { quote: "it's open from seven in the morning until nine in the evening" },
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
      title: 'Guided tour of a botanical garden',
      audio: {
        intro: 'Part 2. You will hear a guide talking to a group of visitors at a botanical garden. First, you have some time to look at questions 11 to 14.',
        noun: 'talk',
        ...rec('l2'),
        // Questions 11–14 are answered by line 4; the break comes before the garden tour begins.
        sets: [
          { questions: '11 to 14', fromLine: 0 },
          { questions: '15 to 20', fromLine: 5 },
        ],
        script: [
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Good morning, everyone, and welcome to Greenvale Botanical Garden. My name's Anna, and I'll be your guide today." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "The garden first opened in nineteen fifty-two, and it now covers more than forty hectares of land." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Tickets cost twelve pounds for adults, and children under sixteen can come in free." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "The garden is open every day from nine o'clock in the morning until six o'clock in the evening." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Before we start, please take a map from the desk by the entrance — it shows all the main paths and the places I will mention." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Our first stop is the Rose Garden, which has more than two hundred kinds of roses. It is at its best in June, when most of the roses are in flower." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Next is the Tropical House, a large glass building where the temperature is kept at twenty-eight degrees all year round. Many of the plants here come from rainforests." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Then we will visit the Herb Garden, where visitors can smell and touch the plants. The herbs grown here are still used in cooking and in medicine." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "After that, we will walk to the Lake, where you can see ducks, swans and herons. Please do not feed the birds, as the food people bring can make them ill." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "The Children's Garden is next, with a maze and a small playground. Children can learn about plants by following the trail of wooden signs." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Finally, the Garden Café is near the entrance. It serves light lunches and cakes, and it is open to everyone, not just to garden visitors." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "That's the end of my talk. If you have any questions, please ask me now, or at the information desk. Enjoy your visit." },
        ],
      },
      groups: [
        {
          id: 'm5l-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm5l-q11',
              number: 11,
              prompt: 'When did the botanical garden first open?',
              options: [
                { id: 'A', text: 'in 1852' },
                { id: 'B', text: 'in 1952' },
                { id: 'C', text: 'in 1962' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The garden first opened in nineteen fifty-two.',
                evidence: { quote: 'The garden first opened in nineteen fifty-two' },
              },
            },
            {
              id: 'm5l-q12',
              number: 12,
              prompt: 'How much does a ticket cost for an adult?',
              options: [
                { id: 'A', text: '£10' },
                { id: 'B', text: '£12' },
                { id: 'C', text: '£15' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Tickets cost twelve pounds for adults.',
                evidence: { quote: 'Tickets cost twelve pounds for adults' },
              },
            },
            {
              id: 'm5l-q13',
              number: 13,
              prompt: 'What are the garden’s opening hours?',
              options: [
                { id: 'A', text: 'from eight o’clock until five o’clock' },
                { id: 'B', text: 'from nine o’clock until six o’clock' },
                { id: 'C', text: 'from ten o’clock until seven o’clock' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The garden is open every day from nine o’clock until six o’clock.',
                evidence: { quote: "The garden is open every day from nine o'clock in the morning until six o'clock in the evening." },
              },
            },
            {
              id: 'm5l-q14',
              number: 14,
              prompt: 'What should visitors take before the tour starts?',
              options: [
                { id: 'A', text: 'a map' },
                { id: 'B', text: 'a ticket' },
                { id: 'C', text: 'a camera' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Visitors should take a map from the desk by the entrance.',
                evidence: { quote: 'please take a map from the desk by the entrance' },
              },
            },
          ],
        },
        {
          id: 'm5l-g4',
          type: 'matching',
          instructions: 'What is said about each of the following places in the garden? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 15–20.',
          optionsTitle: 'Features',
          options: [
            { id: 'A', text: 'It has more than two hundred kinds of roses.' },
            { id: 'B', text: 'It is kept at twenty-eight degrees all year round.' },
            { id: 'C', text: 'Visitors can smell and touch the plants.' },
            { id: 'D', text: 'Visitors are asked not to feed the birds.' },
            { id: 'E', text: 'Children can learn about plants by following a trail of wooden signs.' },
            { id: 'F', text: 'It is open to everyone, not just to garden visitors.' },
            { id: 'G', text: 'It has a shop selling seeds.' },
            { id: 'H', text: 'It is closed in winter.' },
          ],
          questions: [
            { id: 'm5l-q15', number: 15, prompt: 'Rose Garden', answer: { accepted: ['A'] }, explanation: { text: 'The Rose Garden has more than two hundred kinds of roses.', evidence: { quote: 'has more than two hundred kinds of roses' } } },
            { id: 'm5l-q16', number: 16, prompt: 'Tropical House', answer: { accepted: ['B'] }, explanation: { text: 'The temperature in the Tropical House is kept at twenty-eight degrees all year round.', evidence: { quote: 'the temperature is kept at twenty-eight degrees all year round' } } },
            { id: 'm5l-q17', number: 17, prompt: 'Herb Garden', answer: { accepted: ['C'] }, explanation: { text: 'In the Herb Garden, visitors can smell and touch the plants.', evidence: { quote: 'visitors can smell and touch the plants' } } },
            { id: 'm5l-q18', number: 18, prompt: 'Lake', answer: { accepted: ['D'] }, explanation: { text: 'Visitors are asked not to feed the birds at the Lake.', evidence: { quote: 'Please do not feed the birds' } } },
            { id: 'm5l-q19', number: 19, prompt: 'Children’s Garden', answer: { accepted: ['E'] }, explanation: { text: 'Children can learn about plants by following the trail of wooden signs.', evidence: { quote: 'Children can learn about plants by following the trail of wooden signs.' } } },
            { id: 'm5l-q20', number: 20, prompt: 'Garden Café', answer: { accepted: ['F'] }, explanation: { text: 'The café is open to everyone, not just to garden visitors.', evidence: { quote: 'it is open to everyone, not just to garden visitors' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Two students discussing a research project on ocean plastic',
      audio: {
        intro: 'Part 3. You will hear two students, Emma and Liam, discussing a research project on ocean plastic. First, you have some time to look at questions 21 to 25.',
        noun: 'discussion',
        ...rec('l3'),
        // Questions 21–25 are answered by line 9; the break comes before the practical arrangements are agreed.
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 10 },
        ],
        script: [
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Hi, Liam. Shall we start planning our research project on ocean plastic? We have to present our findings next month." },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "Good idea. First, what is our main question? I think we should ask how plastic waste reaches the sea." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "That sounds good. What did you find out about where most of the plastic comes from?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "I was surprised. About eighty per cent of the plastic in the sea comes from land, not from ships." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Really? And how much plastic enters the sea every year?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "About eight million tonnes a year. I expected it to be much less than that." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "That's a huge amount. Which animals are most affected?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "Sea turtles are badly affected, because they often mistake plastic bags for jellyfish, which they eat." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "And what about the smallest pieces of plastic, the microplastics?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "They are found in fish and in shellfish, and scientists are still studying whether they are harmful to people who eat them." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Right. Now, how shall we collect our own information? I thought we could do a survey of students at our college." },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "Good idea. A survey would be quick, and we could ask about how students use and recycle plastic." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "What about the presentation? I think we should use photographs of the beach near here, to show the problem clearly." },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "Yes, and I'll make the charts from the survey results, so we can show the numbers in the presentation." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Perfect. And who will speak first in the presentation?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "You can speak first, and I'll answer the questions at the end, if that's OK." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "That sounds fair. Let's meet again on Friday to look at the survey results together." },
        ],
      },
      groups: [
        {
          id: 'm5l-g5',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm5l-q21',
              number: 21,
              prompt: 'What is the main question of the students’ research project?',
              options: [
                { id: 'A', text: 'how plastic waste reaches the sea' },
                { id: 'B', text: 'how fish eat plastic' },
                { id: 'C', text: 'how ships pollute the sea' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The main question is how plastic waste reaches the sea.',
                evidence: { quote: 'we should ask how plastic waste reaches the sea' },
              },
            },
            {
              id: 'm5l-q22',
              number: 22,
              prompt: 'What percentage of the plastic in the sea comes from land?',
              options: [
                { id: 'A', text: 'about 20 per cent' },
                { id: 'B', text: 'about 50 per cent' },
                { id: 'C', text: 'about 80 per cent' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'About eighty per cent of the plastic in the sea comes from land.',
                evidence: { quote: 'About eighty per cent of the plastic in the sea comes from land' },
                distractors: { A: 'That would be the share from ships, not from land.' },
              },
            },
            {
              id: 'm5l-q23',
              number: 23,
              prompt: 'How much plastic enters the sea every year?',
              options: [
                { id: 'A', text: 'about eight million tonnes' },
                { id: 'B', text: 'about eighty million tonnes' },
                { id: 'C', text: 'about eight hundred thousand tonnes' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'About eight million tonnes of plastic enter the sea every year.',
                evidence: { quote: 'About eight million tonnes a year.' },
              },
            },
            {
              id: 'm5l-q24',
              number: 24,
              prompt: 'Which animals are most affected by plastic waste?',
              options: [
                { id: 'A', text: 'sea turtles' },
                { id: 'B', text: 'dolphins' },
                { id: 'C', text: 'penguins' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Sea turtles are badly affected, because they often mistake plastic bags for jellyfish.',
                evidence: { quote: 'Sea turtles are badly affected' },
              },
            },
            {
              id: 'm5l-q25',
              number: 25,
              prompt: 'Where are microplastics found?',
              options: [
                { id: 'A', text: 'in fish and in shellfish' },
                { id: 'B', text: 'only in seaweed' },
                { id: 'C', text: 'only on beaches' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Microplastics are found in fish and in shellfish.',
                evidence: { quote: 'They are found in fish and in shellfish' },
              },
            },
          ],
        },
        {
          id: 'm5l-g6',
          type: 'matching',
          instructions: 'What was agreed about each part of the research project? Choose FIVE answers from the box and write the correct letter, A–F, next to Questions 26–30.',
          optionsTitle: 'Decisions',
          options: [
            { id: 'A', text: 'They will do a survey of students.' },
            { id: 'B', text: 'They will use photographs of the beach.' },
            { id: 'C', text: 'Liam will make the charts.' },
            { id: 'D', text: 'Emma will speak first.' },
            { id: 'E', text: 'They will meet again on Friday.' },
            { id: 'F', text: 'They will visit a recycling centre.' },
          ],
          questions: [
            { id: 'm5l-q26', number: 26, prompt: 'method of collecting information', answer: { accepted: ['A'] }, explanation: { text: 'They will do a survey of students at their college.', evidence: { quote: 'we could do a survey of students at our college' } } },
            { id: 'm5l-q27', number: 27, prompt: 'pictures for the presentation', answer: { accepted: ['B'] }, explanation: { text: 'They will use photographs of the beach near here in the presentation.', evidence: { quote: 'we should use photographs of the beach near here' } } },
            { id: 'm5l-q28', number: 28, prompt: 'charts', answer: { accepted: ['C'] }, explanation: { text: 'Liam will make the charts from the survey results.', evidence: { quote: "I'll make the charts from the survey results" } } },
            { id: 'm5l-q29', number: 29, prompt: 'first speaker', answer: { accepted: ['D'] }, explanation: { text: 'Emma will speak first in the presentation.', evidence: { quote: 'You can speak first' } } },
            { id: 'm5l-q30', number: 30, prompt: 'next meeting', answer: { accepted: ['E'] }, explanation: { text: 'They will meet again on Friday to look at the survey results together.', evidence: { quote: "Let's meet again on Friday" } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Lecture: the history of the bicycle',
      audio: {
        intro: 'Part 4. You will hear a lecture about the history of the bicycle. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "Good morning. Today I'm going to talk about the history of the bicycle — how it began, and how it became the machine we ride today." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "The first bicycle appeared in eighteen seventeen, when a German inventor, Karl Drais, built a wooden machine with two wheels. It had no pedals, so the rider pushed it along with his feet." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "The machine was made of wood, and it was very heavy to push, so it was not popular for long." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "In the eighteen-sixties, pedals were added to the front wheel in France, and riders could then travel much faster than before." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "The next big change came in eighteen eighty-five, when the Rover safety bicycle was built in Britain. It had two wheels of the same size, and a chain that drove the back wheel." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "The chain was important, because it allowed the rider to travel further with less effort, and the bicycle became much safer to ride." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "In eighteen eighty-eight, John Boyd Dunlop invented the pneumatic tyre, a rubber tyre filled with air. It made riding far more comfortable than riding on solid rubber tyres." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "By the eighteen-nineties, the bicycle was cheap enough for ordinary workers to buy, and millions of people used it to travel to work." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "In the twentieth century, the bicycle changed again. Gears were added, so riders could climb hills more easily, and the frame was made of steel, and later of aluminium." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "Today, the bicycle is used all over the world, not only for travel and sport, but also for carrying goods in towns and cities. That brings us to the end of the lecture." },
        ],
      },
      groups: [
        {
          id: 'm5l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'HISTORY OF THE BICYCLE\nThe first bicycle\n• the first bicycle appeared in {{31}}\n• the machine was made of {{32}}\n• it had no {{33}}\nPedals and the safety bicycle\n• pedals were added to the {{34}} wheel\n• the Rover safety bicycle was built in {{35}}\n• it used a {{36}} to drive the back wheel\nTyres and later changes\n• in 1888, Dunlop invented the pneumatic {{37}}\n• by the 1890s, the bicycle was cheap enough for ordinary {{38}} to buy\n• gears were added, so riders could climb {{39}} more easily\n• today, the bicycle is also used for carrying {{40}} in towns and cities',
          questions: [
            { id: 'm5l-q31', number: 31, answer: { accepted: ['1817'] }, explanation: { text: 'The first bicycle appeared in 1817.', evidence: { quote: 'The first bicycle appeared in eighteen seventeen' } } },
            { id: 'm5l-q32', number: 32, answer: { accepted: ['wood'] }, explanation: { text: 'The first machine was made of wood.', evidence: { quote: 'The machine was made of wood' } } },
            { id: 'm5l-q33', number: 33, answer: { accepted: ['pedals'] }, explanation: { text: 'The first bicycle had no pedals.', evidence: { quote: 'It had no pedals' } } },
            { id: 'm5l-q34', number: 34, answer: { accepted: ['front'] }, explanation: { text: 'Pedals were added to the front wheel in France.', evidence: { quote: 'pedals were added to the front wheel' } } },
            { id: 'm5l-q35', number: 35, answer: { accepted: ['1885'] }, explanation: { text: 'The Rover safety bicycle was built in 1885.', evidence: { quote: 'in eighteen eighty-five' } } },
            { id: 'm5l-q36', number: 36, answer: { accepted: ['chain'] }, explanation: { text: 'The safety bicycle used a chain to drive the back wheel.', evidence: { quote: 'a chain that drove the back wheel' } } },
            { id: 'm5l-q37', number: 37, answer: { accepted: ['tyre', 'tire'] }, explanation: { text: 'Dunlop invented the pneumatic tyre in 1888.', evidence: { quote: 'invented the pneumatic tyre' } } },
            { id: 'm5l-q38', number: 38, answer: { accepted: ['workers'] }, explanation: { text: 'By the 1890s the bicycle was cheap enough for ordinary workers to buy.', evidence: { quote: 'cheap enough for ordinary workers to buy' } } },
            { id: 'm5l-q39', number: 39, answer: { accepted: ['hills'] }, explanation: { text: 'Gears were added so riders could climb hills more easily.', evidence: { quote: 'climb hills more easily' } } },
            { id: 'm5l-q40', number: 40, answer: { accepted: ['goods'] }, explanation: { text: 'Today the bicycle is also used for carrying goods in towns and cities.', evidence: { quote: 'carrying goods in towns and cities' } } },
          ],
        },
      ],
    },
  ],
};
