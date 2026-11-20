import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 21 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material.
 */

const rec = (partId: string) => recorded('vb-mock-21', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock21Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Booking a pitch at a campsite by phone',
      audio: {
        intro: "Part 1. You will hear a woman booking a pitch at a campsite by phone. First, you have some time to look at questions 1 to 6.",
        noun: 'conversation',
        ...rec('l1'),
        sets: [
          { questions: '1 to 6', fromLine: 0 },
          { questions: '7 to 10', fromLine: 15 },
        ],
        script: [
          { speaker: 'Mr Parker', voice: M, accent: 'en-GB', text: "Good morning. Lakeside Campsite. This is Mark Parker speaking. How can I help you?" },
          { speaker: 'Mrs Bailey', voice: W, accent: 'en-GB', text: "Good morning. My name is Susan Bailey, and I would like to book a pitch for my family." },
          { speaker: 'Mr Parker', voice: M, accent: 'en-GB', text: "Of course, Mrs Bailey. Could I take your family name, please?" },
          { speaker: 'Mrs Bailey', voice: W, accent: 'en-GB', text: "Yes, my family name is Bailey." },
          { speaker: 'Mr Parker', voice: M, accent: 'en-GB', text: "Thank you. What is your first name?" },
          { speaker: 'Mrs Bailey', voice: W, accent: 'en-GB', text: "My first name is Susan." },
          { speaker: 'Mr Parker', voice: M, accent: 'en-GB', text: "Susan. What is your address, please?" },
          { speaker: 'Mrs Bailey', voice: W, accent: 'en-GB', text: "My address is 18 Hill Road, near the station." },
          { speaker: 'Mr Parker', voice: M, accent: 'en-GB', text: "18 Hill Road. What is your telephone number?" },
          { speaker: 'Mrs Bailey', voice: W, accent: 'en-GB', text: "My telephone number is oh seven nine four one two three four five six." },
          { speaker: 'Mr Parker', voice: M, accent: 'en-GB', text: "Oh seven nine four one two three four five six. Thank you. When would you like to stay?" },
          { speaker: 'Mrs Bailey', voice: W, accent: 'en-GB', text: "We would like to stay from Friday the twelfth of July to Sunday the fourteenth of July." },
          { speaker: 'Mr Parker', voice: M, accent: 'en-GB', text: "Friday the twelfth of July to Sunday the fourteenth of July. How many people are in your family?" },
          { speaker: 'Mrs Bailey', voice: W, accent: 'en-GB', text: "There are four people in my family: two adults and two children." },
          { speaker: 'Mr Parker', voice: M, accent: 'en-GB', text: "Four people. What type of pitch would you like?" },
          { speaker: 'Mrs Bailey', voice: W, accent: 'en-GB', text: "We would like a large pitch, near the lake." },
          { speaker: 'Mr Parker', voice: M, accent: 'en-GB', text: "A large pitch, near the lake. How will you pay?" },
          { speaker: 'Mrs Bailey', voice: W, accent: 'en-GB', text: "I will pay by card, and the cost is sixty pounds." },
          { speaker: 'Mr Parker', voice: M, accent: 'en-GB', text: "Sixty pounds, by card. Will you bring a tent?" },
          { speaker: 'Mrs Bailey', voice: W, accent: 'en-GB', text: "Yes, we will bring a tent, and we will also bring our dog." },
          { speaker: 'Mr Parker', voice: M, accent: 'en-GB', text: "A tent and a dog. Thank you, Mrs Bailey. We will send you a letter with the booking details." },
          { speaker: 'Mrs Bailey', voice: W, accent: 'en-GB', text: "Thank you very much, Mr Parker. Goodbye." },
          { speaker: 'Mr Parker', voice: M, accent: 'en-GB', text: "Goodbye, Mrs Bailey." },
        ],
      },
      groups: [
        {
          id: 'm21l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 2, number: true },
          template:
            "CAMPSITE BOOKING\nFamily name: {{1}}\nFirst name: {{2}}\nAddress: {{3}}\nTelephone number: {{4}}\nArrival day: {{5}}\nNumber of people: {{6}}",
          questions: [
            { id: 'm21l-q1', number: 1, answer: { accepted: ['Bailey'] }, explanation: { text: 'Her family name is Bailey.', evidence: { quote: 'my family name is Bailey' } } },
            { id: 'm21l-q2', number: 2, answer: { accepted: ['Susan'] }, explanation: { text: 'Her first name is Susan.', evidence: { quote: 'My first name is Susan' } } },
            { id: 'm21l-q3', number: 3, answer: { accepted: ['18 Hill Road'] }, explanation: { text: 'Her address is 18 Hill Road.', evidence: { quote: 'My address is 18 Hill Road' } } },
            { id: 'm21l-q4', number: 4, answer: { accepted: ['0794123456'] }, explanation: { text: 'Her telephone number is oh seven nine four one two three four five six.', evidence: { quote: 'oh seven nine four one two three four five six' } } },
            { id: 'm21l-q5', number: 5, answer: { accepted: ['Friday'] }, explanation: { text: 'They would like to stay from Friday the twelfth of July.', evidence: { quote: 'from Friday the twelfth of July' } } },
            { id: 'm21l-q6', number: 6, answer: { accepted: ['four people'] }, explanation: { text: 'There are four people in her family.', evidence: { quote: 'There are four people in my family' } } },
          ],
        },
        {
          id: 'm21l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm21l-q7',
              number: 7,
              prompt: 'What type of pitch would Mrs Bailey like?',
              options: [
                { id: 'A', text: 'a small pitch, near the road' },
                { id: 'B', text: 'a large pitch, near the lake' },
                { id: 'C', text: 'a large pitch, near the station' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'She would like a large pitch, near the lake.',
                evidence: { quote: 'a large pitch, near the lake' },
              },
            },
            {
              id: 'm21l-q8',
              number: 8,
              prompt: 'What is the cost of the booking?',
              options: [
                { id: 'A', text: 'sixteen pounds' },
                { id: 'B', text: 'sixty pounds' },
                { id: 'C', text: 'seventy pounds' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The cost is sixty pounds.',
                evidence: { quote: 'the cost is sixty pounds' },
              },
            },
            {
              id: 'm21l-q9',
              number: 9,
              prompt: 'How will Mrs Bailey pay?',
              options: [
                { id: 'A', text: 'by cash' },
                { id: 'B', text: 'by card' },
                { id: 'C', text: 'by cheque' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'She will pay by card.',
                evidence: { quote: 'I will pay by card' },
              },
            },
            {
              id: 'm21l-q10',
              number: 10,
              prompt: 'What will the campsite send Mrs Bailey?',
              options: [
                { id: 'A', text: 'a letter with the booking details' },
                { id: 'B', text: 'an email with the booking details' },
                { id: 'C', text: 'a map of the campsite' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The campsite will send her a letter with the booking details.',
                evidence: { quote: 'We will send you a letter with the booking details' },
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
      title: 'Talk about a recycling centre',
      audio: {
        intro: 'Part 2. You will hear a guide talking to visitors at a recycling centre. First, you have some time to look at questions 11 to 14.',
        noun: 'talk',
        ...rec('l2'),
        sets: [
          { questions: '11 to 14', fromLine: 0 },
          { questions: '15 to 20', fromLine: 5 },
        ],
        script: [
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Good morning, everyone, and welcome to the Greenfield Recycling Centre. My name is Karen, and I am your guide today." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "The recycling centre is open every day, from eight o'clock in the morning to six o'clock in the evening." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "More than two thousand tonnes of waste are brought here every month, and most of it is used again." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "The first area you will see is the sorting hall, where workers sort paper, glass and plastic by hand." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "The tour is free, but you must book in advance, and you can book by telephone or on our website." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Next, you will see the compost area, where food waste is turned into compost for gardens." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "After that, there is the reuse shop, where people can buy old furniture and bicycles for a low price." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Then, there is the learning room, where school children can learn about recycling." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Please remember: you must wear a safety helmet in the sorting hall, and you must not take photographs there." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Near the learning room, there is a garden, where visitors can see plants grown in compost." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "At the end of the tour, you can visit the cafe, and the cafe is open from ten o'clock to four o'clock. Thank you, and enjoy the tour!" },
        ],
      },
      groups: [
        {
          id: 'm21l-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm21l-q11',
              number: 11,
              prompt: 'What time does the recycling centre open?',
              options: [
                { id: 'A', text: "eight o'clock in the morning" },
                { id: 'B', text: "nine o'clock in the morning" },
                { id: 'C', text: "seven o'clock in the morning" },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The centre is open from eight o\'clock in the morning.',
                evidence: { quote: "from eight o'clock in the morning" },
              },
            },
            {
              id: 'm21l-q12',
              number: 12,
              prompt: 'How much waste is brought to the centre every month?',
              options: [
                { id: 'A', text: 'more than two hundred tonnes' },
                { id: 'B', text: 'more than two thousand tonnes' },
                { id: 'C', text: 'more than twenty thousand tonnes' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'More than two thousand tonnes of waste are brought here every month.',
                evidence: { quote: 'More than two thousand tonnes of waste are brought here every month' },
              },
            },
            {
              id: 'm21l-q13',
              number: 13,
              prompt: 'What do workers sort in the sorting hall?',
              options: [
                { id: 'A', text: 'paper, glass and plastic' },
                { id: 'B', text: 'food, clothes and wood' },
                { id: 'C', text: 'metal, paper and food' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Workers sort paper, glass and plastic in the sorting hall.',
                evidence: { quote: 'workers sort paper, glass and plastic by hand' },
              },
            },
            {
              id: 'm21l-q14',
              number: 14,
              prompt: 'How much does the tour cost?',
              options: [
                { id: 'A', text: 'five pounds' },
                { id: 'B', text: 'ten pounds' },
                { id: 'C', text: 'free' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'The tour is free.',
                evidence: { quote: 'The tour is free' },
              },
            },
          ],
        },
        {
          id: 'm21l-g4',
          type: 'matching',
          instructions: 'What is said about each of the following? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 15–20.',
          optionsTitle: 'Features',
          options: [
            { id: 'A', text: 'Food waste is turned into compost for gardens.' },
            { id: 'B', text: 'People can buy old furniture and bicycles for a low price.' },
            { id: 'C', text: 'School children can learn about recycling.' },
            { id: 'D', text: 'You must wear a safety helmet and you must not take photographs.' },
            { id: 'E', text: 'Visitors can see plants grown in compost.' },
            { id: 'F', text: 'The cafe is open from ten o\'clock to four o\'clock.' },
            { id: 'G', text: 'The centre is open only on Saturdays.' },
            { id: 'H', text: 'The tour costs ten pounds.' },
          ],
          questions: [
            { id: 'm21l-q15', number: 15, prompt: 'Compost area', answer: { accepted: ['A'] }, explanation: { text: 'In the compost area, food waste is turned into compost for gardens.', evidence: { quote: 'food waste is turned into compost for gardens' } } },
            { id: 'm21l-q16', number: 16, prompt: 'Reuse shop', answer: { accepted: ['B'] }, explanation: { text: 'In the reuse shop, people can buy old furniture and bicycles for a low price.', evidence: { quote: 'people can buy old furniture and bicycles for a low price' } } },
            { id: 'm21l-q17', number: 17, prompt: 'Learning room', answer: { accepted: ['C'] }, explanation: { text: 'In the learning room, school children can learn about recycling.', evidence: { quote: 'school children can learn about recycling' } } },
            { id: 'm21l-q18', number: 18, prompt: 'Safety rules', answer: { accepted: ['D'] }, explanation: { text: 'You must wear a safety helmet in the sorting hall, and you must not take photographs there.', evidence: { quote: 'you must wear a safety helmet in the sorting hall' } } },
            { id: 'm21l-q19', number: 19, prompt: 'Garden', answer: { accepted: ['E'] }, explanation: { text: 'In the garden, visitors can see plants grown in compost.', evidence: { quote: 'visitors can see plants grown in compost' } } },
            { id: 'm21l-q20', number: 20, prompt: 'Cafe', answer: { accepted: ['F'] }, explanation: { text: 'The cafe is open from ten o\'clock to four o\'clock.', evidence: { quote: "the cafe is open from ten o'clock to four o'clock" } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Two students planning a survey on volunteering',
      audio: {
        intro: 'Part 3. You will hear two students, Lily and Oscar, planning a survey on volunteering. First, you have some time to look at questions 21 to 25.',
        noun: 'discussion',
        ...rec('l3'),
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 13 },
        ],
        script: [
          { speaker: 'Lily', voice: W, accent: 'en-GB', text: "Hi, Oscar. Have you started planning our survey on volunteering?" },
          { speaker: 'Oscar', voice: M, accent: 'en-GB', text: "Not yet, Lily. What is the aim of our survey?" },
          { speaker: 'Lily', voice: W, accent: 'en-GB', text: "The aim is to find out why people volunteer in our town." },
          { speaker: 'Oscar', voice: M, accent: 'en-GB', text: "Why people volunteer in our town. How many people will we ask?" },
          { speaker: 'Lily', voice: W, accent: 'en-GB', text: "We will ask eighty people, from different parts of the town." },
          { speaker: 'Oscar', voice: M, accent: 'en-GB', text: "Eighty people. What questions will we ask them?" },
          { speaker: 'Lily', voice: W, accent: 'en-GB', text: "First, we will ask how often they volunteer: every week, every month, or once a year." },
          { speaker: 'Oscar', voice: M, accent: 'en-GB', text: "Every week, every month, or once a year. What else will we ask?" },
          { speaker: 'Lily', voice: W, accent: 'en-GB', text: "We will also ask what kind of work they do, and where they volunteer." },
          { speaker: 'Oscar', voice: M, accent: 'en-GB', text: "What kind of work they do, and where they volunteer. When will we do the survey?" },
          { speaker: 'Lily', voice: W, accent: 'en-GB', text: "We will do the survey next month, on Saturday and Sunday." },
          { speaker: 'Oscar', voice: M, accent: 'en-GB', text: "Saturday and Sunday. Where will we ask the people?" },
          { speaker: 'Lily', voice: W, accent: 'en-GB', text: "We will ask the people in the town library, in the morning." },
          { speaker: 'Oscar', voice: M, accent: 'en-GB', text: "In the town library, in the morning. What is the main problem with our plan?" },
          { speaker: 'Lily', voice: W, accent: 'en-GB', text: "The main problem is that many people volunteer at weekends, but they are busy on Saturdays." },
          { speaker: 'Oscar', voice: M, accent: 'en-GB', text: "They are busy on Saturdays. What should we do about the problem?" },
          { speaker: 'Lily', voice: W, accent: 'en-GB', text: "I think we should ask the people about Sunday mornings, because this will show when they are free." },
          { speaker: 'Oscar', voice: M, accent: 'en-GB', text: "Good idea. What else should we do?" },
          { speaker: 'Lily', voice: W, accent: 'en-GB', text: "I think we should make a poster of the results, because a poster will show the answers clearly." },
          { speaker: 'Oscar', voice: M, accent: 'en-GB', text: "A poster of the results. Who will make the poster?" },
          { speaker: 'Lily', voice: W, accent: 'en-GB', text: "I will make the poster, because I am good at making posters." },
          { speaker: 'Oscar', voice: M, accent: 'en-GB', text: "You will make the poster. When should we finish the survey?" },
          { speaker: 'Lily', voice: W, accent: 'en-GB', text: "We should finish the survey on Monday, so we can write the report next week." },
          { speaker: 'Oscar', voice: M, accent: 'en-GB', text: "Monday. Thank you, Lily. Let us start now." },
          { speaker: 'Lily', voice: W, accent: 'en-GB', text: "Good idea, Oscar." },
        ],
      },
      groups: [
        {
          id: 'm21l-g5',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm21l-q21',
              number: 21,
              prompt: 'What is the aim of the survey?',
              options: [
                { id: 'A', text: 'to find out why people volunteer in our town' },
                { id: 'B', text: 'to find out how much volunteers are paid' },
                { id: 'C', text: 'to find out how to open a library' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The aim is to find out why people volunteer in our town.',
                evidence: { quote: 'The aim is to find out why people volunteer in our town' },
              },
            },
            {
              id: 'm21l-q22',
              number: 22,
              prompt: 'How many people will they ask?',
              options: [
                { id: 'A', text: 'eighteen people' },
                { id: 'B', text: 'eighty people' },
                { id: 'C', text: 'eight hundred people' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'They will ask eighty people.',
                evidence: { quote: 'We will ask eighty people' },
              },
            },
            {
              id: 'm21l-q23',
              number: 23,
              prompt: 'What will the people be asked first?',
              options: [
                { id: 'A', text: 'how often they volunteer' },
                { id: 'B', text: 'how much money they give' },
                { id: 'C', text: 'where they live' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'First, they will ask how often the people volunteer.',
                evidence: { quote: 'we will ask how often they volunteer' },
              },
            },
            {
              id: 'm21l-q24',
              number: 24,
              prompt: 'When will they do the survey?',
              options: [
                { id: 'A', text: 'this week' },
                { id: 'B', text: 'next month, on Saturday and Sunday' },
                { id: 'C', text: 'next year' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'They will do the survey next month, on Saturday and Sunday.',
                evidence: { quote: 'We will do the survey next month, on Saturday and Sunday' },
              },
            },
            {
              id: 'm21l-q25',
              number: 25,
              prompt: 'Where will they ask the people?',
              options: [
                { id: 'A', text: 'in the town library, in the morning' },
                { id: 'B', text: 'in the park, in the afternoon' },
                { id: 'C', text: 'at school, in the evening' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'They will ask the people in the town library, in the morning.',
                evidence: { quote: 'We will ask the people in the town library, in the morning' },
              },
            },
          ],
        },
        {
          id: 'm21l-g6',
          type: 'matching',
          instructions: 'What was agreed about each of the following? Choose FIVE answers from the box and write the correct letter, A–F, next to Questions 26–30.',
          optionsTitle: 'Decisions',
          options: [
            { id: 'A', text: 'Many people volunteer at weekends, but they are busy on Saturdays.' },
            { id: 'B', text: 'They should ask the people about Sunday mornings.' },
            { id: 'C', text: 'They should make a poster of the results.' },
            { id: 'D', text: 'Lily will make the poster.' },
            { id: 'E', text: 'They should finish the survey on Monday.' },
            { id: 'F', text: 'They will finish the survey next month.' },
          ],
          questions: [
            { id: 'm21l-q26', number: 26, prompt: 'Problem with the plan', answer: { accepted: ['A'] }, explanation: { text: 'The main problem is that many people volunteer at weekends, but they are busy on Saturdays.', evidence: { quote: 'many people volunteer at weekends, but they are busy on Saturdays' } } },
            { id: 'm21l-q27', number: 27, prompt: 'Sunday mornings', answer: { accepted: ['B'] }, explanation: { text: 'They should ask the people about Sunday mornings.', evidence: { quote: 'we should ask the people about Sunday mornings' } } },
            { id: 'm21l-q28', number: 28, prompt: 'Poster', answer: { accepted: ['C'] }, explanation: { text: 'They should make a poster of the results.', evidence: { quote: 'we should make a poster of the results' } } },
            { id: 'm21l-q29', number: 29, prompt: 'Making the poster', answer: { accepted: ['D'] }, explanation: { text: 'Lily will make the poster.', evidence: { quote: 'I will make the poster' } } },
            { id: 'm21l-q30', number: 30, prompt: 'Finishing the survey', answer: { accepted: ['E'] }, explanation: { text: 'They should finish the survey on Monday.', evidence: { quote: 'We should finish the survey on Monday' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Lecture: the science of taste',
      audio: {
        intro: 'Part 4. You will hear a lecture about the science of taste. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "Good morning. Today I am going to talk about the science of taste, and how we taste the food we eat." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "There are five basic tastes: sweet, salty, sour, bitter, and a fifth taste called umami." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "The tongue has about ten thousand taste buds, and each taste bud has cells that send messages to the brain." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "Sweet foods, such as sugar, give us energy, and the brain likes sweet tastes because energy helps us to live." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "Salty foods help the body to keep water, but too much salt can make the blood pressure go up." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "Sour foods, such as lemons, have acid in them, and the acid makes the mouth feel sharp." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "Bitter foods can be a warning, because many plants that are bitter are not safe to eat." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "Umami is the taste of foods such as meat, cheese and mushrooms, and it tells the brain that the food has protein." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "Taste is not only in the tongue: the nose also helps, because the smell of food goes up into the nose." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "When you have a cold, food tastes different, because your nose is blocked and you cannot smell the food." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "In the future, scientists hope to learn more about taste, and they hope to make food that is healthy and tasty." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "In conclusion, taste helps us to choose food that is safe and good for us, and it makes eating a pleasure. That brings us to the end of the lecture." },
        ],
      },
      groups: [
        {
          id: 'm21l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'THE SCIENCE OF TASTE\nThe five tastes\n• there are five basic {{31}}\n• the tongue has about ten thousand taste {{32}}\n• each taste bud has {{33}} that send messages to the brain\nSweet and salty\n• sweet foods, such as sugar, give us {{34}}\n• too much salt can make the blood {{35}} go up\nSour and bitter\n• sour foods have {{36}} in them\n• bitter foods can be a {{37}}\nUmami and the nose\n• umami tells the brain that the food has {{38}}\n• the {{39}} also helps us to taste food\n• when you have a {{40}}, food tastes different',
          questions: [
            { id: 'm21l-q31', number: 31, answer: { accepted: ['tastes'] }, explanation: { text: 'There are five basic tastes.', evidence: { quote: 'There are five basic tastes' } } },
            { id: 'm21l-q32', number: 32, answer: { accepted: ['buds'] }, explanation: { text: 'The tongue has about ten thousand taste buds.', evidence: { quote: 'ten thousand taste buds' } } },
            { id: 'm21l-q33', number: 33, answer: { accepted: ['cells'] }, explanation: { text: 'Each taste bud has cells that send messages to the brain.', evidence: { quote: 'each taste bud has cells' } } },
            { id: 'm21l-q34', number: 34, answer: { accepted: ['energy'] }, explanation: { text: 'Sweet foods give us energy.', evidence: { quote: 'give us energy' } } },
            { id: 'm21l-q35', number: 35, answer: { accepted: ['pressure'] }, explanation: { text: 'Too much salt can make the blood pressure go up.', evidence: { quote: 'blood pressure go up' } } },
            { id: 'm21l-q36', number: 36, answer: { accepted: ['acid'] }, explanation: { text: 'Sour foods have acid in them.', evidence: { quote: 'have acid in them' } } },
            { id: 'm21l-q37', number: 37, answer: { accepted: ['warning'] }, explanation: { text: 'Bitter foods can be a warning.', evidence: { quote: 'can be a warning' } } },
            { id: 'm21l-q38', number: 38, answer: { accepted: ['protein'] }, explanation: { text: 'Umami tells the brain that the food has protein.', evidence: { quote: 'the food has protein' } } },
            { id: 'm21l-q39', number: 39, answer: { accepted: ['nose'] }, explanation: { text: 'The nose also helps us to taste food.', evidence: { quote: 'the nose also helps' } } },
            { id: 'm21l-q40', number: 40, answer: { accepted: ['cold'] }, explanation: { text: 'When you have a cold, food tastes different.', evidence: { quote: 'When you have a cold' } } },
          ],
        },
      ],
    },
  ],
};
