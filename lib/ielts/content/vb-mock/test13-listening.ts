import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 13 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material.
 */

const rec = (partId: string) => recorded('vb-mock-13', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock13Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Renting a flat by phone',
      audio: {
        intro: "Part 1. You will hear a man renting a flat by phone. First, you have some time to look at questions 1 to 6.",
        noun: 'conversation',
        ...rec('l1'),
        sets: [
          { questions: '1 to 6', fromLine: 0 },
          { questions: '7 to 10', fromLine: 15 },
        ],
        script: [
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Good morning, City Lets. This is Emma speaking. How can I help you?" },
          { speaker: 'Mr Evans', voice: M, accent: 'en-GB', text: "Hello. I would like to rent a flat in the city centre, please." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Of course. Could I take your full name, please?" },
          { speaker: 'Mr Evans', voice: M, accent: 'en-GB', text: "Yes, my name is David Evans." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Thank you, Mr Evans. Could I take your telephone number, please?" },
          { speaker: 'Mr Evans', voice: M, accent: 'en-GB', text: "Yes, my mobile number is oh seven nine two, four six eight, one three five." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Oh seven nine two, four six eight, one three five. Thank you." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "What kind of flat are you looking for?" },
          { speaker: 'Mr Evans', voice: M, accent: 'en-GB', text: "I would like a flat with two bedrooms, please." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Two bedrooms. What is your budget, please?" },
          { speaker: 'Mr Evans', voice: M, accent: 'en-GB', text: "I can pay up to eight hundred pounds a month." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Up to eight hundred pounds a month. When would you like to move in?" },
          { speaker: 'Mr Evans', voice: M, accent: 'en-GB', text: "I would like to move in on the first of December." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "The first of December. Do you have any pets?" },
          { speaker: 'Mr Evans', voice: M, accent: 'en-GB', text: "No, I do not have any pets." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Thank you. We have a flat in Park Street that may be suitable for you." },
          { speaker: 'Mr Evans', voice: M, accent: 'en-GB', text: "Park Street. How much is the rent for that flat?" },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "The rent is seven hundred and fifty pounds a month, and the deposit is one month's rent." },
          { speaker: 'Mr Evans', voice: M, accent: 'en-GB', text: "Seven hundred and fifty pounds a month. Can I visit the flat this week?" },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Yes, you can visit the flat on Wednesday at three o'clock in the afternoon." },
          { speaker: 'Mr Evans', voice: M, accent: 'en-GB', text: "Wednesday at three o'clock. That is fine. What should I bring to the visit?" },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "Please bring your passport and a letter from your employer." },
          { speaker: 'Mr Evans', voice: M, accent: 'en-GB', text: "A passport and a letter from my employer. Thank you very much for your help." },
          { speaker: 'Agent', voice: W, accent: 'en-GB', text: "You are welcome, Mr Evans. Goodbye." },
          { speaker: 'Mr Evans', voice: M, accent: 'en-GB', text: "Goodbye." },
        ],
      },
      groups: [
        {
          id: 'm13l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 1, number: true },
          template:
            'CITY LETS – FLAT ENQUIRY\nName: David {{1}}\nTelephone: {{2}}\nBedrooms needed: {{3}}\nMaximum rent: {{4}} pounds a month\nMove-in date: the first of {{5}}\nPets: {{6}}',
          questions: [
            { id: 'm13l-q1', number: 1, answer: { accepted: ['Evans'] }, explanation: { text: 'His name is David Evans.', evidence: { quote: 'my name is David Evans' } } },
            { id: 'm13l-q2', number: 2, answer: { accepted: ['0792468135'] }, explanation: { text: 'His mobile number is oh seven nine two, four six eight, one three five.', evidence: { quote: 'oh seven nine two, four six eight, one three five' } } },
            { id: 'm13l-q3', number: 3, answer: { accepted: ['two', '2'] }, explanation: { text: 'He would like a flat with two bedrooms.', evidence: { quote: 'a flat with two bedrooms' } } },
            { id: 'm13l-q4', number: 4, answer: { accepted: ['800', 'eight hundred'] }, explanation: { text: 'He can pay up to eight hundred pounds a month.', evidence: { quote: 'up to eight hundred pounds a month' } } },
            { id: 'm13l-q5', number: 5, answer: { accepted: ['December'] }, explanation: { text: 'He would like to move in on the first of December.', evidence: { quote: 'on the first of December' } } },
            { id: 'm13l-q6', number: 6, answer: { accepted: ['No'] }, explanation: { text: 'He does not have any pets.', evidence: { quote: 'No, I do not have any pets' } } },
          ],
        },
        {
          id: 'm13l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm13l-q7',
              number: 7,
              prompt: 'Which street is the flat in?',
              options: [
                { id: 'A', text: 'Park Street' },
                { id: 'B', text: 'King Street' },
                { id: 'C', text: 'High Street' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The flat is in Park Street.',
                evidence: { quote: 'We have a flat in Park Street' },
              },
            },
            {
              id: 'm13l-q8',
              number: 8,
              prompt: 'How much is the rent for the flat in Park Street?',
              options: [
                { id: 'A', text: 'seven hundred pounds a month' },
                { id: 'B', text: 'seven hundred and fifty pounds a month' },
                { id: 'C', text: 'eight hundred pounds a month' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The rent is seven hundred and fifty pounds a month.',
                evidence: { quote: 'The rent is seven hundred and fifty pounds a month' },
              },
            },
            {
              id: 'm13l-q9',
              number: 9,
              prompt: 'When can Mr Evans visit the flat?',
              options: [
                { id: 'A', text: 'on Wednesday at three o\'clock in the afternoon' },
                { id: 'B', text: 'on Thursday at three o\'clock in the afternoon' },
                { id: 'C', text: 'on Wednesday at ten o\'clock in the morning' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'He can visit the flat on Wednesday at three o\'clock in the afternoon.',
                evidence: { quote: 'you can visit the flat on Wednesday at three o\'clock in the afternoon' },
              },
            },
            {
              id: 'm13l-q10',
              number: 10,
              prompt: 'What should Mr Evans bring to the visit?',
              options: [
                { id: 'A', text: 'his passport and a letter from his employer' },
                { id: 'B', text: 'his driving licence and a photograph' },
                { id: 'C', text: 'his bank letter and his old tenancy agreement' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'He should bring his passport and a letter from his employer.',
                evidence: { quote: 'Please bring your passport and a letter from your employer' },
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
      title: 'Guided tour of a castle',
      audio: {
        intro: 'Part 2. You will hear a guide giving a tour of a castle. First, you have some time to look at questions 11 to 14.',
        noun: 'talk',
        ...rec('l2'),
        sets: [
          { questions: '11 to 14', fromLine: 0 },
          { questions: '15 to 20', fromLine: 4 },
        ],
        script: [
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Good morning, everyone, and welcome to Harwood Castle. My name is Karen, and I am your guide for the tour today." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Harwood Castle was built more than eight hundred years ago, in the twelfth century, and it was the home of the Harwood family for over five hundred years." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "The tour will last for about ninety minutes, and we will visit the Great Hall, the kitchen, the library and the tower." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Tickets cost twelve pounds for adults, and children under twelve can visit the castle for free." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "We will start our tour in the Great Hall, where the family ate their meals and welcomed important visitors." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "The Great Hall has a large fireplace, and on the walls you can see paintings of the Harwood family." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Next, we will visit the kitchen, where the cooks prepared food for more than a hundred people every day." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "After the kitchen, we will go to the library, which has more than three thousand old books." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Finally, we will climb the tower, where you can enjoy a wonderful view of the town and the river." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Photography is not allowed in the library, but you can take photographs in the Great Hall, the kitchen and the tower." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "At the end of the tour, you can visit the castle shop and the tea room, which are open until five o'clock in the afternoon." },
        ],
      },
      groups: [
        {
          id: 'm13l-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm13l-q11',
              number: 11,
              prompt: 'When was Harwood Castle built?',
              options: [
                { id: 'A', text: 'in the twelfth century' },
                { id: 'B', text: 'in the thirteenth century' },
                { id: 'C', text: 'in the fourteenth century' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Harwood Castle was built in the twelfth century.',
                evidence: { quote: 'in the twelfth century' },
              },
            },
            {
              id: 'm13l-q12',
              number: 12,
              prompt: 'How long will the tour last?',
              options: [
                { id: 'A', text: 'about sixty minutes' },
                { id: 'B', text: 'about ninety minutes' },
                { id: 'C', text: 'about one hundred and twenty minutes' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The tour will last for about ninety minutes.',
                evidence: { quote: 'will last for about ninety minutes' },
              },
            },
            {
              id: 'm13l-q13',
              number: 13,
              prompt: 'How much does a ticket cost for adults?',
              options: [
                { id: 'A', text: 'ten pounds' },
                { id: 'B', text: 'twelve pounds' },
                { id: 'C', text: 'fifteen pounds' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Tickets cost twelve pounds for adults.',
                evidence: { quote: 'Tickets cost twelve pounds for adults' },
              },
            },
            {
              id: 'm13l-q14',
              number: 14,
              prompt: 'Whose home was Harwood Castle for over five hundred years?',
              options: [
                { id: 'A', text: 'the Harwood family' },
                { id: 'B', text: 'the king and queen' },
                { id: 'C', text: 'the monks of the town' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The castle was the home of the Harwood family for over five hundred years.',
                evidence: { quote: 'it was the home of the Harwood family' },
              },
            },
          ],
        },
        {
          id: 'm13l-g4',
          type: 'matching',
          instructions: 'What is said about each of the following? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 15–20.',
          optionsTitle: 'Features',
          options: [
            { id: 'A', text: 'It is where the family ate their meals and welcomed important visitors.' },
            { id: 'B', text: 'It is where the cooks prepared food for more than a hundred people every day.' },
            { id: 'C', text: 'It has more than three thousand old books.' },
            { id: 'D', text: 'It is where you can enjoy a wonderful view of the town and the river.' },
            { id: 'E', text: 'Photography is not allowed there.' },
            { id: 'F', text: 'You can visit it at the end of the tour.' },
            { id: 'G', text: 'It costs twelve pounds for adults to enter.' },
            { id: 'H', text: 'It was built more than eight hundred years ago.' },
          ],
          questions: [
            { id: 'm13l-q15', number: 15, prompt: 'Great Hall', answer: { accepted: ['A'] }, explanation: { text: 'The Great Hall is where the family ate their meals and welcomed important visitors.', evidence: { quote: 'where the family ate their meals and welcomed important visitors' } } },
            { id: 'm13l-q16', number: 16, prompt: 'Kitchen', answer: { accepted: ['B'] }, explanation: { text: 'The kitchen is where the cooks prepared food for more than a hundred people every day.', evidence: { quote: 'where the cooks prepared food for more than a hundred people every day' } } },
            { id: 'm13l-q17', number: 17, prompt: 'Library', answer: { accepted: ['C'] }, explanation: { text: 'The library has more than three thousand old books.', evidence: { quote: 'has more than three thousand old books' } } },
            { id: 'm13l-q18', number: 18, prompt: 'Tower', answer: { accepted: ['D'] }, explanation: { text: 'The tower is where you can enjoy a wonderful view of the town and the river.', evidence: { quote: 'where you can enjoy a wonderful view of the town and the river' } } },
            { id: 'm13l-q19', number: 19, prompt: 'Taking photographs in the library', answer: { accepted: ['E'] }, explanation: { text: 'Photography is not allowed in the library.', evidence: { quote: 'Photography is not allowed in the library' } } },
            { id: 'm13l-q20', number: 20, prompt: 'Castle shop', answer: { accepted: ['F'] }, explanation: { text: 'You can visit the castle shop at the end of the tour.', evidence: { quote: 'you can visit the castle shop and the tea room' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Two students discussing a field study on birds',
      audio: {
        intro: 'Part 3. You will hear two students, Anna and Tom, discussing a field study on birds. First, you have some time to look at questions 21 to 25.',
        noun: 'discussion',
        ...rec('l3'),
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 12 },
        ],
        script: [
          { speaker: 'Anna', voice: W, accent: 'en-GB', text: "Hi, Tom. Have you finished writing about our field study on birds?" },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "Not yet. I have written about the birds we saw in the park, but I still need to write about the birds we saw by the river." },
          { speaker: 'Anna', voice: W, accent: 'en-GB', text: "I see. How many different kinds of birds did we see in the park?" },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "We saw twelve different kinds of birds in the park, including robins, blackbirds and blue tits." },
          { speaker: 'Anna', voice: W, accent: 'en-GB', text: "Twelve kinds. And how many did we see by the river?" },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "We saw eight different kinds by the river, including ducks, herons and kingfishers." },
          { speaker: 'Anna', voice: W, accent: 'en-GB', text: "Eight kinds by the river. What was the most common bird in the park?" },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "The most common bird in the park was the blackbird. We counted twenty-five blackbirds." },
          { speaker: 'Anna', voice: W, accent: 'en-GB', text: "Twenty-five blackbirds. What about the river? What was the most common bird there?" },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "The most common bird by the river was the duck. We counted eighteen ducks." },
          { speaker: 'Anna', voice: W, accent: 'en-GB', text: "Eighteen ducks. When did we do the field study?" },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "We did the field study on the tenth of May, and the weather was sunny all day." },
          { speaker: 'Anna', voice: W, accent: 'en-GB', text: "The tenth of May. Who should write the introduction to our report?" },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "I think you should write the introduction, Anna, because you are good at writing." },
          { speaker: 'Anna', voice: W, accent: 'en-GB', text: "Thank you. What about the photographs? Who should choose them?" },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "I think I should choose the photographs, because I took most of them." },
          { speaker: 'Anna', voice: W, accent: 'en-GB', text: "Good idea. When should we finish the report?" },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "We should finish the report by Friday the twenty-third of May, and then we can give it to our teacher, Mrs Hill." },
          { speaker: 'Anna', voice: W, accent: 'en-GB', text: "Friday the twenty-third of May. I will bring the list of birds we saw in the park." },
          { speaker: 'Tom', voice: M, accent: 'en-GB', text: "Good. And I will bring the map of the river where we saw the ducks and the herons." },
        ],
      },
      groups: [
        {
          id: 'm13l-g5',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm13l-q21',
              number: 21,
              prompt: 'How many different kinds of birds did the students see in the park?',
              options: [
                { id: 'A', text: 'eight kinds' },
                { id: 'B', text: 'twelve kinds' },
                { id: 'C', text: 'eighteen kinds' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The students saw twelve different kinds of birds in the park.',
                evidence: { quote: 'twelve different kinds of birds in the park' },
              },
            },
            {
              id: 'm13l-q22',
              number: 22,
              prompt: 'How many different kinds of birds did the students see by the river?',
              options: [
                { id: 'A', text: 'eight kinds' },
                { id: 'B', text: 'twelve kinds' },
                { id: 'C', text: 'twenty-five kinds' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The students saw eight different kinds by the river.',
                evidence: { quote: 'eight different kinds by the river' },
              },
            },
            {
              id: 'm13l-q23',
              number: 23,
              prompt: 'What was the most common bird in the park?',
              options: [
                { id: 'A', text: 'the robin' },
                { id: 'B', text: 'the blackbird' },
                { id: 'C', text: 'the blue tit' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The most common bird in the park was the blackbird.',
                evidence: { quote: 'The most common bird in the park was the blackbird' },
              },
            },
            {
              id: 'm13l-q24',
              number: 24,
              prompt: 'How many blackbirds did the students count in the park?',
              options: [
                { id: 'A', text: 'eighteen blackbirds' },
                { id: 'B', text: 'twenty-five blackbirds' },
                { id: 'C', text: 'twelve blackbirds' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The students counted twenty-five blackbirds.',
                evidence: { quote: 'We counted twenty-five blackbirds' },
              },
            },
            {
              id: 'm13l-q25',
              number: 25,
              prompt: 'What was the most common bird by the river?',
              options: [
                { id: 'A', text: 'the heron' },
                { id: 'B', text: 'the kingfisher' },
                { id: 'C', text: 'the duck' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'The most common bird by the river was the duck.',
                evidence: { quote: 'The most common bird by the river was the duck' },
              },
            },
          ],
        },
        {
          id: 'm13l-g6',
          type: 'matching',
          instructions: 'What was agreed about each part of the report plan? Choose FIVE answers from the box and write the correct letter, A–F, next to Questions 26–30.',
          optionsTitle: 'Decisions',
          options: [
            { id: 'A', text: 'She will write the introduction to the report.' },
            { id: 'B', text: 'He will choose the photographs for the report.' },
            { id: 'C', text: 'She is the teacher who will receive the report.' },
            { id: 'D', text: 'It should be finished by Friday the twenty-third of May.' },
            { id: 'E', text: 'He will bring the map of the river.' },
            { id: 'F', text: 'She will bring the list of birds we saw in the park.' },
          ],
          questions: [
            { id: 'm13l-q26', number: 26, prompt: 'Anna', answer: { accepted: ['A'] }, explanation: { text: 'Anna should write the introduction to the report.', evidence: { quote: 'you should write the introduction' } } },
            { id: 'm13l-q27', number: 27, prompt: 'Tom', answer: { accepted: ['B'] }, explanation: { text: 'Tom should choose the photographs for the report.', evidence: { quote: 'I should choose the photographs' } } },
            { id: 'm13l-q28', number: 28, prompt: 'Mrs Hill', answer: { accepted: ['C'] }, explanation: { text: 'Mrs Hill is the teacher who will receive the report.', evidence: { quote: 'we can give it to our teacher, Mrs Hill' } } },
            { id: 'm13l-q29', number: 29, prompt: 'The report', answer: { accepted: ['D'] }, explanation: { text: 'The report should be finished by Friday the twenty-third of May.', evidence: { quote: 'We should finish the report by Friday the twenty-third of May' } } },
            { id: 'm13l-q30', number: 30, prompt: 'The list of birds we saw in the park', answer: { accepted: ['F'] }, explanation: { text: 'Anna will bring the list of birds we saw in the park.', evidence: { quote: 'I will bring the list of birds we saw in the park' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Lecture: the history of money',
      audio: {
        intro: 'Part 4. You will hear a lecture about the history of money. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Good morning. Today I am going to talk about the history of money: how people paid for things in the past, and how money has changed over time." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "A very long time ago, people did not use money at all. They exchanged things directly: for example, a farmer might give a bag of rice to a fisherman in exchange for some fish." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Later, people began to use shells as money, and in some parts of the world, shells were used to buy food and clothes for thousands of years." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Then, about three thousand years ago, people in China began to use metal coins, and coins were soon used in many other countries as well." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "The first coins were made of bronze, and later, coins were made of silver and gold." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In the seventh century, people in China began to use paper money, and paper money was much lighter and easier to carry than coins." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In the twentieth century, people began to use cheques and credit cards to pay for things, and they did not need to carry a lot of money with them." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Today, many people pay with their phones, and in some countries, people hardly ever use coins or paper money at all." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "However, money is not only coins and notes. In the future, many experts believe that money will be completely digital, and people will pay for everything with their phones or computers." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In conclusion, money has changed a great deal over thousands of years, from shells and coins to paper money and digital payments, but one thing has not changed: people still need a way to pay for the things they want. That brings us to the end of the lecture." },
        ],
      },
      groups: [
        {
          id: 'm13l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'HISTORY OF MONEY\nBefore money\n• a very long time ago, people exchanged things directly: a farmer might give a bag of {{31}} to a fisherman in exchange for some fish\n• later, people began to use {{32}} as money\nThe first coins\n• about three thousand years ago, people in China began to use metal {{33}}\n• the first coins were made of {{34}}\nPaper money\n• in the seventh century, people in China began to use paper {{35}}\n• paper money was much lighter and easier to {{36}} than coins\nMoney in the twentieth century\n• people began to use cheques and credit {{37}} to pay for things\n• they did not need to carry a lot of {{38}} with them\nMoney today and in the future\n• today, many people pay with their {{39}}\n• in the future, many experts believe that money will be completely {{40}}',
          questions: [
            { id: 'm13l-q31', number: 31, answer: { accepted: ['rice'] }, explanation: { text: 'A farmer might give a bag of rice to a fisherman in exchange for some fish.', evidence: { quote: 'a bag of rice' } } },
            { id: 'm13l-q32', number: 32, answer: { accepted: ['shells'] }, explanation: { text: 'Later, people began to use shells as money.', evidence: { quote: 'use shells as money' } } },
            { id: 'm13l-q33', number: 33, answer: { accepted: ['coins'] }, explanation: { text: 'People in China began to use metal coins.', evidence: { quote: 'use metal coins' } } },
            { id: 'm13l-q34', number: 34, answer: { accepted: ['bronze'] }, explanation: { text: 'The first coins were made of bronze.', evidence: { quote: 'made of bronze' } } },
            { id: 'm13l-q35', number: 35, answer: { accepted: ['money'] }, explanation: { text: 'People in China began to use paper money.', evidence: { quote: 'use paper money' } } },
            { id: 'm13l-q36', number: 36, answer: { accepted: ['carry'] }, explanation: { text: 'Paper money was much lighter and easier to carry than coins.', evidence: { quote: 'easier to carry than coins' } } },
            { id: 'm13l-q37', number: 37, answer: { accepted: ['cards'] }, explanation: { text: 'People began to use cheques and credit cards to pay for things.', evidence: { quote: 'cheques and credit cards' } } },
            { id: 'm13l-q38', number: 38, answer: { accepted: ['money'] }, explanation: { text: 'They did not need to carry a lot of money with them.', evidence: { quote: 'carry a lot of money' } } },
            { id: 'm13l-q39', number: 39, answer: { accepted: ['phones'] }, explanation: { text: 'Today, many people pay with their phones.', evidence: { quote: 'pay with their phones' } } },
            { id: 'm13l-q40', number: 40, answer: { accepted: ['digital'] }, explanation: { text: 'In the future, many experts believe that money will be completely digital.', evidence: { quote: 'completely digital' } } },
          ],
        },
      ],
    },
  ],
};
