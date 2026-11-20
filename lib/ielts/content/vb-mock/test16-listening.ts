import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 16 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material.
 */

const rec = (partId: string) => recorded('vb-mock-16', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock16Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Reporting a faulty product by phone',
      audio: {
        intro: "Part 1. You will hear a man reporting a faulty product by phone. First, you have some time to look at questions 1 to 6.",
        noun: 'conversation',
        ...rec('l1'),
        sets: [
          { questions: '1 to 6', fromLine: 0 },
          { questions: '7 to 10', fromLine: 16 },
        ],
        script: [
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "Good morning. Home Appliances Customer Service. This is Helen speaking. How can I help you?" },
          { speaker: 'Mr Hughes', voice: M, accent: 'en-GB', text: "Hello. I would like to report a faulty product, please." },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "Of course. Could I take your full name, please?" },
          { speaker: 'Mr Hughes', voice: M, accent: 'en-GB', text: "Yes, my name is David Hughes." },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "Thank you, Mr Hughes. What is the product?" },
          { speaker: 'Mr Hughes', voice: M, accent: 'en-GB', text: "It is an electric kettle." },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "An electric kettle. When did you buy the kettle?" },
          { speaker: 'Mr Hughes', voice: M, accent: 'en-GB', text: "I bought the kettle on the fifth of May." },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "The fifth of May. What is your telephone number, please?" },
          { speaker: 'Mr Hughes', voice: M, accent: 'en-GB', text: "My mobile number is oh seven eight double nine, two three four, five six seven." },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "Oh seven eight double nine, two three four, five six seven. Thank you. How much did the kettle cost?" },
          { speaker: 'Mr Hughes', voice: M, accent: 'en-GB', text: "The kettle cost forty-five pounds." },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "Forty-five pounds. What is wrong with the kettle?" },
          { speaker: 'Mr Hughes', voice: M, accent: 'en-GB', text: "The kettle does not switch off when the water boils." },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "The kettle does not switch off when the water boils. That sounds dangerous." },
          { speaker: 'Mr Hughes', voice: M, accent: 'en-GB', text: "Yes, it is dangerous. I would like a new kettle, please." },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "I understand. I will send you a new kettle, and you can return the old kettle in the same box." },
          { speaker: 'Mr Hughes', voice: M, accent: 'en-GB', text: "Thank you. When will the new kettle arrive?" },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "The new kettle will arrive on Friday, and it will be delivered by a courier." },
          { speaker: 'Mr Hughes', voice: M, accent: 'en-GB', text: "On Friday. Do I need to pay for the delivery?" },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "No, the delivery is free, because the kettle is still under guarantee." },
          { speaker: 'Mr Hughes', voice: M, accent: 'en-GB', text: "Good. How long is the guarantee?" },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "The guarantee lasts for two years from the date you bought the kettle." },
          { speaker: 'Mr Hughes', voice: M, accent: 'en-GB', text: "Two years. Thank you very much for your help." },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "You are welcome, Mr Hughes. Goodbye." },
          { speaker: 'Mr Hughes', voice: M, accent: 'en-GB', text: "Goodbye." },
        ],
      },
      groups: [
        {
          id: 'm16l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 1, number: true },
          template:
            'FAULTY PRODUCT REPORT\nFamily name: {{1}}\nProduct: {{2}}\nTelephone number: {{3}}\nDate bought: {{4}}\nPrice: {{5}}\nFault: the kettle does not {{6}}',
          questions: [
            { id: 'm16l-q1', number: 1, answer: { accepted: ['Hughes'] }, explanation: { text: 'His name is David Hughes.', evidence: { quote: 'my name is David Hughes' } } },
            { id: 'm16l-q2', number: 2, answer: { accepted: ['kettle'] }, explanation: { text: 'The product is an electric kettle.', evidence: { quote: 'It is an electric kettle' } } },
            { id: 'm16l-q3', number: 3, answer: { accepted: ['07899234567'] }, explanation: { text: 'His mobile number is oh seven eight double nine, two three four, five six seven.', evidence: { quote: 'oh seven eight double nine, two three four, five six seven' } } },
            { id: 'm16l-q4', number: 4, answer: { accepted: ['5 May', 'fifth of May'] }, explanation: { text: 'He bought the kettle on the fifth of May.', evidence: { quote: 'on the fifth of May' } } },
            { id: 'm16l-q5', number: 5, answer: { accepted: ['forty-five pounds', '45 pounds', '£45'] }, explanation: { text: 'The kettle cost forty-five pounds.', evidence: { quote: 'The kettle cost forty-five pounds' } } },
            { id: 'm16l-q6', number: 6, answer: { accepted: ['switch off'] }, explanation: { text: 'The kettle does not switch off when the water boils.', evidence: { quote: 'does not switch off when the water boils' } } },
          ],
        },
        {
          id: 'm16l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm16l-q7',
              number: 7,
              prompt: 'What will the company send Mr Hughes?',
              options: [
                { id: 'A', text: 'a new kettle' },
                { id: 'B', text: 'a new box' },
                { id: 'C', text: 'a new guarantee' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The company will send him a new kettle.',
                evidence: { quote: 'I will send you a new kettle' },
              },
            },
            {
              id: 'm16l-q8',
              number: 8,
              prompt: 'When will the new kettle arrive?',
              options: [
                { id: 'A', text: 'on Monday' },
                { id: 'B', text: 'on Wednesday' },
                { id: 'C', text: 'on Friday' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'The new kettle will arrive on Friday.',
                evidence: { quote: 'will arrive on Friday' },
              },
            },
            {
              id: 'm16l-q9',
              number: 9,
              prompt: 'How much will Mr Hughes pay for the delivery?',
              options: [
                { id: 'A', text: 'nothing' },
                { id: 'B', text: 'five pounds' },
                { id: 'C', text: 'forty-five pounds' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The delivery is free, because the kettle is still under guarantee.',
                evidence: { quote: 'the delivery is free' },
              },
            },
            {
              id: 'm16l-q10',
              number: 10,
              prompt: 'How long is the guarantee?',
              options: [
                { id: 'A', text: 'for one year' },
                { id: 'B', text: 'for two years' },
                { id: 'C', text: 'for five years' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The guarantee lasts for two years.',
                evidence: { quote: 'lasts for two years' },
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
      title: 'Talk about a local theatre',
      audio: {
        intro: 'Part 2. You will hear a theatre manager talking about a local theatre. First, you have some time to look at questions 11 to 14.',
        noun: 'talk',
        ...rec('l2'),
        sets: [
          { questions: '11 to 14', fromLine: 0 },
          { questions: '15 to 20', fromLine: 4 },
        ],
        script: [
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "Good afternoon, everyone, and welcome to the Riverside Theatre. My name is Kate, and I am the manager of the theatre." },
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "The theatre opened in 1985, and this year more than fifty thousand people will visit the theatre." },
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "The theatre is open from Tuesday to Sunday, and the evening shows start at half past seven." },
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "Tickets cost between ten and thirty pounds, and children under twelve can watch the afternoon shows for free." },
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "The first area is the main hall, where the audience sits to watch plays and concerts." },
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "Next to the main hall, there is the cafe, where visitors can have a drink and a cake before the show." },
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "Near the entrance, there is the box office, where visitors can buy tickets and ask about the shows." },
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "There is also a small museum, where visitors can learn about the history of the theatre and see old costumes." },
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "Finally, there is the garden behind the theatre, where visitors can walk and rest between the shows." },
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "Please remember that you should arrive thirty minutes before the show, because the doors close five minutes before it starts." },
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "Thank you for coming to the Riverside Theatre. I hope you enjoy the show. Have a wonderful evening!" },
        ],
      },
      groups: [
        {
          id: 'm16l-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm16l-q11',
              number: 11,
              prompt: 'When did the Riverside Theatre open?',
              options: [
                { id: 'A', text: 'in 1985' },
                { id: 'B', text: 'in 1975' },
                { id: 'C', text: 'in 1995' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The theatre opened in 1985.',
                evidence: { quote: 'The theatre opened in 1985' },
              },
            },
            {
              id: 'm16l-q12',
              number: 12,
              prompt: 'How many people will visit the theatre this year?',
              options: [
                { id: 'A', text: 'more than five thousand' },
                { id: 'B', text: 'more than fifty thousand' },
                { id: 'C', text: 'more than five hundred thousand' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'This year more than fifty thousand people will visit the theatre.',
                evidence: { quote: 'more than fifty thousand people will visit the theatre' },
              },
            },
            {
              id: 'm16l-q13',
              number: 13,
              prompt: 'When do the evening shows start?',
              options: [
                { id: 'A', text: 'at half past six' },
                { id: 'B', text: 'at half past seven' },
                { id: 'C', text: 'at half past eight' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The evening shows start at half past seven.',
                evidence: { quote: 'the evening shows start at half past seven' },
              },
            },
            {
              id: 'm16l-q14',
              number: 14,
              prompt: 'What do children under twelve pay for the afternoon shows?',
              options: [
                { id: 'A', text: 'nothing' },
                { id: 'B', text: 'ten pounds' },
                { id: 'C', text: 'thirty pounds' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Children under twelve can watch the afternoon shows for free.',
                evidence: { quote: 'children under twelve can watch the afternoon shows for free' },
              },
            },
          ],
        },
        {
          id: 'm16l-g4',
          type: 'matching',
          instructions: 'What is said about each of the following? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 15–20.',
          optionsTitle: 'Features',
          options: [
            { id: 'A', text: 'It is where the audience sits to watch plays and concerts.' },
            { id: 'B', text: 'It is where visitors can have a drink and a cake before the show.' },
            { id: 'C', text: 'It is where visitors can buy tickets and ask about the shows.' },
            { id: 'D', text: 'It is where visitors can learn about the history of the theatre and see old costumes.' },
            { id: 'E', text: 'It is where visitors can walk and rest between the shows.' },
            { id: 'F', text: 'You should arrive thirty minutes before the show, because the doors close five minutes before it starts.' },
            { id: 'G', text: 'Tickets cost between ten and thirty pounds.' },
            { id: 'H', text: 'The theatre opened in 1995.' },
          ],
          questions: [
            { id: 'm16l-q15', number: 15, prompt: 'Main hall', answer: { accepted: ['A'] }, explanation: { text: 'The main hall is where the audience sits to watch plays and concerts.', evidence: { quote: 'where the audience sits to watch plays and concerts' } } },
            { id: 'm16l-q16', number: 16, prompt: 'Cafe', answer: { accepted: ['B'] }, explanation: { text: 'The cafe is where visitors can have a drink and a cake before the show.', evidence: { quote: 'where visitors can have a drink and a cake before the show' } } },
            { id: 'm16l-q17', number: 17, prompt: 'Box office', answer: { accepted: ['C'] }, explanation: { text: 'The box office is where visitors can buy tickets and ask about the shows.', evidence: { quote: 'where visitors can buy tickets and ask about the shows' } } },
            { id: 'm16l-q18', number: 18, prompt: 'Museum', answer: { accepted: ['D'] }, explanation: { text: 'The museum is where visitors can learn about the history of the theatre and see old costumes.', evidence: { quote: 'where visitors can learn about the history of the theatre and see old costumes' } } },
            { id: 'm16l-q19', number: 19, prompt: 'Garden', answer: { accepted: ['E'] }, explanation: { text: 'The garden is where visitors can walk and rest between the shows.', evidence: { quote: 'where visitors can walk and rest between the shows' } } },
            { id: 'm16l-q20', number: 20, prompt: 'Arriving early', answer: { accepted: ['F'] }, explanation: { text: 'Visitors should arrive thirty minutes before the show.', evidence: { quote: 'you should arrive thirty minutes before the show' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Two students planning a school trip to a farm',
      audio: {
        intro: 'Part 3. You will hear two students, Sophie and Ben, planning a school trip to a farm. First, you have some time to look at questions 21 to 25.',
        noun: 'discussion',
        ...rec('l3'),
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 13 },
        ],
        script: [
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Hi, Ben. Have you planned our school trip to the farm?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "Yes, I have planned the trip, Sophie. We will visit Greenfield Farm on Friday the twelfth of June." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Friday the twelfth of June. How will we travel to the farm?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "We will travel to the farm by bus, and the bus will leave school at nine o'clock in the morning." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Nine o'clock. How much will the trip cost?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "The trip will cost twelve pounds, and the price includes lunch at the farm." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Twelve pounds. What will we do first at the farm?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "First, we will feed the animals, because the farmer will show us the cows and the sheep." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Feed the animals. What will we do after lunch?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "After lunch, we will pick fruit in the orchard, and we will learn how apples grow." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Pick fruit. How many students will go on the trip?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "Thirty students will go on the trip, and two teachers will go with us." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Thirty students. What should we bring to the farm?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "We should bring a raincoat and strong shoes, because we will walk in the fields." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "A raincoat and strong shoes. Who will take photographs of the trip?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "Mia will take photographs of the trip, because she has a new camera." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Mia. What about the report? What should we write in the report?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "I think we should write about the animals in the report, because we will learn a lot about them." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Good idea. What about the poster? What should we put on the poster?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "I think we should put photographs of the farm on the poster, because the photographs will show what we did." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Good. When should we finish the report?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "We should finish the report on Monday, so we can show it to the class on Tuesday." },
        ],
      },
      groups: [
        {
          id: 'm16l-g5',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm16l-q21',
              number: 21,
              prompt: 'When will the students visit Greenfield Farm?',
              options: [
                { id: 'A', text: 'on Friday the twelfth of June' },
                { id: 'B', text: 'on Friday the twelfth of July' },
                { id: 'C', text: 'on Saturday the thirteenth of June' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'They will visit Greenfield Farm on Friday the twelfth of June.',
                evidence: { quote: 'We will visit Greenfield Farm on Friday the twelfth of June' },
              },
            },
            {
              id: 'm16l-q22',
              number: 22,
              prompt: 'How will the students travel to the farm?',
              options: [
                { id: 'A', text: 'by train' },
                { id: 'B', text: 'by bus' },
                { id: 'C', text: 'by car' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'They will travel to the farm by bus.',
                evidence: { quote: 'We will travel to the farm by bus' },
              },
            },
            {
              id: 'm16l-q23',
              number: 23,
              prompt: 'How much will the trip cost?',
              options: [
                { id: 'A', text: 'ten pounds' },
                { id: 'B', text: 'twelve pounds' },
                { id: 'C', text: 'twenty pounds' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The trip will cost twelve pounds.',
                evidence: { quote: 'The trip will cost twelve pounds' },
              },
            },
            {
              id: 'm16l-q24',
              number: 24,
              prompt: 'What will the students do first at the farm?',
              options: [
                { id: 'A', text: 'feed the animals' },
                { id: 'B', text: 'pick fruit in the orchard' },
                { id: 'C', text: 'have lunch at the farm' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'First, they will feed the animals.',
                evidence: { quote: 'First, we will feed the animals' },
              },
            },
            {
              id: 'm16l-q25',
              number: 25,
              prompt: 'How many students will go on the trip?',
              options: [
                { id: 'A', text: 'twenty students' },
                { id: 'B', text: 'thirty students' },
                { id: 'C', text: 'forty students' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Thirty students will go on the trip.',
                evidence: { quote: 'Thirty students will go on the trip' },
              },
            },
          ],
        },
        {
          id: 'm16l-g6',
          type: 'matching',
          instructions: 'What was agreed about each of the following? Choose FIVE answers from the box and write the correct letter, A–F, next to Questions 26–30.',
          optionsTitle: 'Decisions',
          options: [
            { id: 'A', text: 'They should bring a raincoat and strong shoes.' },
            { id: 'B', text: 'She will take photographs of the trip.' },
            { id: 'C', text: 'They should write about the animals in the report.' },
            { id: 'D', text: 'They should put photographs of the farm on the poster.' },
            { id: 'E', text: 'They should finish the report on Monday.' },
            { id: 'F', text: 'They will feed the animals first.' },
          ],
          questions: [
            { id: 'm16l-q26', number: 26, prompt: 'What to bring', answer: { accepted: ['A'] }, explanation: { text: 'They should bring a raincoat and strong shoes.', evidence: { quote: 'We should bring a raincoat and strong shoes' } } },
            { id: 'm16l-q27', number: 27, prompt: 'Mia', answer: { accepted: ['B'] }, explanation: { text: 'Mia will take photographs of the trip.', evidence: { quote: 'Mia will take photographs of the trip' } } },
            { id: 'm16l-q28', number: 28, prompt: 'Report', answer: { accepted: ['C'] }, explanation: { text: 'They should write about the animals in the report.', evidence: { quote: 'we should write about the animals in the report' } } },
            { id: 'm16l-q29', number: 29, prompt: 'Poster', answer: { accepted: ['D'] }, explanation: { text: 'They should put photographs of the farm on the poster.', evidence: { quote: 'we should put photographs of the farm on the poster' } } },
            { id: 'm16l-q30', number: 30, prompt: 'Finishing the report', answer: { accepted: ['E'] }, explanation: { text: 'They should finish the report on Monday.', evidence: { quote: 'We should finish the report on Monday' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Lecture: the history of radio',
      audio: {
        intro: 'Part 4. You will hear a lecture about the history of radio. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Good morning. Today I am going to talk about the history of radio, which changed the way people get news and music." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Radio began in the late nineteenth century, when scientists learned how to send signals through the air without wires." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In 1895, an Italian inventor called Guglielmo Marconi sent the first radio signal over a distance of about two kilometres." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In 1901, Marconi sent a radio signal across the Atlantic Ocean, from England to Canada, and this showed that radio could work over very long distances." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "The first radio stations began in the 1920s, and they played music and read the news to people at home." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "By the 1930s, many families had a radio at home, and they listened to the news, music and plays in the evening." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "During the Second World War, radio was very important, because governments used radio to send news and messages to people in other countries." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In the 1950s, television became popular, but radio did not disappear, because people could listen to radio in their cars and at work." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Today, many people listen to radio on the internet, and they can listen to stations from all over the world." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In conclusion, radio has changed a great deal in more than one hundred years, but it is still an important part of our lives. That brings us to the end of the lecture." },
        ],
      },
      groups: [
        {
          id: 'm16l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'THE HISTORY OF RADIO\nWhat did radio change?\n• radio changed the way people get {{31}} and music\n• scientists learned how to send signals through the air without {{32}}\nMarconi\n• in {{33}}, Marconi sent the first radio signal over a distance of about two kilometres\n• in 1901, Marconi sent a radio signal across the Atlantic Ocean, from England to {{34}}\nRadio stations\n• the first radio stations began in the {{35}}\n• families listened to the news, music and {{36}} in the evening\nRadio in the war\n• governments used radio to send news and {{37}} to people in other countries\nRadio today\n• people could listen to radio in their cars and at {{38}}\n• today, many people listen to radio on the {{39}}\nConclusion\n• radio is still an important part of our {{40}}',
          questions: [
            { id: 'm16l-q31', number: 31, answer: { accepted: ['news'] }, explanation: { text: 'Radio changed the way people get news and music.', evidence: { quote: 'get news and music' } } },
            { id: 'm16l-q32', number: 32, answer: { accepted: ['wires'] }, explanation: { text: 'Scientists learned how to send signals through the air without wires.', evidence: { quote: 'without wires' } } },
            { id: 'm16l-q33', number: 33, answer: { accepted: ['1895'] }, explanation: { text: 'In 1895, Marconi sent the first radio signal.', evidence: { quote: 'In 1895, an Italian inventor' } } },
            { id: 'm16l-q34', number: 34, answer: { accepted: ['Canada'] }, explanation: { text: 'Marconi sent a radio signal from England to Canada.', evidence: { quote: 'from England to Canada' } } },
            { id: 'm16l-q35', number: 35, answer: { accepted: ['1920s'] }, explanation: { text: 'The first radio stations began in the 1920s.', evidence: { quote: 'began in the 1920s' } } },
            { id: 'm16l-q36', number: 36, answer: { accepted: ['plays'] }, explanation: { text: 'Families listened to the news, music and plays in the evening.', evidence: { quote: 'music and plays in the evening' } } },
            { id: 'm16l-q37', number: 37, answer: { accepted: ['messages'] }, explanation: { text: 'Governments used radio to send news and messages to people in other countries.', evidence: { quote: 'send news and messages' } } },
            { id: 'm16l-q38', number: 38, answer: { accepted: ['work'] }, explanation: { text: 'People could listen to radio in their cars and at work.', evidence: { quote: 'in their cars and at work' } } },
            { id: 'm16l-q39', number: 39, answer: { accepted: ['internet'] }, explanation: { text: 'Today, many people listen to radio on the internet.', evidence: { quote: 'listen to radio on the internet' } } },
            { id: 'm16l-q40', number: 40, answer: { accepted: ['lives'] }, explanation: { text: 'Radio is still an important part of our lives.', evidence: { quote: 'important part of our lives' } } },
          ],
        },
      ],
    },
  ],
};
