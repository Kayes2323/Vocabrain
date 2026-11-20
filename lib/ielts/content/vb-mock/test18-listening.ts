import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 18 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material.
 */

const rec = (partId: string) => recorded('vb-mock-18', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock18Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Asking about a job vacancy by phone',
      audio: {
        intro: "Part 1. You will hear a man asking about a job vacancy by phone. First, you have some time to look at questions 1 to 6.",
        noun: 'conversation',
        ...rec('l1'),
        sets: [
          { questions: '1 to 6', fromLine: 0 },
          { questions: '7 to 10', fromLine: 15 },
        ],
        script: [
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Good morning. Greenfield Bookshop. This is Anna speaking. How can I help you?" },
          { speaker: 'Mr Davies', voice: M, accent: 'en-GB', text: "Hello. My name is Tom Davies, and I am calling about the job for a shop assistant." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Of course. Could I take your family name, please?" },
          { speaker: 'Mr Davies', voice: M, accent: 'en-GB', text: "Yes, my family name is Davies." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Thank you, Mr Davies. What is your first name?" },
          { speaker: 'Mr Davies', voice: M, accent: 'en-GB', text: "My first name is Tom." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Tom. What is your telephone number, please?" },
          { speaker: 'Mr Davies', voice: M, accent: 'en-GB', text: "My mobile number is oh seven eight one two three four five six nine oh." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Oh seven eight one two three four five six nine oh. Thank you. Which job are you asking about?" },
          { speaker: 'Mr Davies', voice: M, accent: 'en-GB', text: "I am asking about the job for a shop assistant." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "The shop assistant job. On which day would you like to work?" },
          { speaker: 'Mr Davies', voice: M, accent: 'en-GB', text: "I would like to work on Saturday, please." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Saturday. How many hours would you like to work each week?" },
          { speaker: 'Mr Davies', voice: M, accent: 'en-GB', text: "I would like to work twenty hours each week." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Twenty hours each week. Do you have any questions about the job?" },
          { speaker: 'Mr Davies', voice: M, accent: 'en-GB', text: "Yes. How much is the pay for the job?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "The pay is twelve pounds an hour." },
          { speaker: 'Mr Davies', voice: M, accent: 'en-GB', text: "Twelve pounds an hour. Do I need experience for the job?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "No, you do not need experience for the job. We will train you." },
          { speaker: 'Mr Davies', voice: M, accent: 'en-GB', text: "That is good. When is the closing date for the job?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "The closing date is the thirtieth of June." },
          { speaker: 'Mr Davies', voice: M, accent: 'en-GB', text: "The thirtieth of June. Where will the interview be?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "The interview will be at the bookshop, in the office upstairs." },
          { speaker: 'Mr Davies', voice: M, accent: 'en-GB', text: "At the bookshop. Thank you very much for your help." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "You are welcome, Mr Davies. Goodbye." },
          { speaker: 'Mr Davies', voice: M, accent: 'en-GB', text: "Goodbye." },
        ],
      },
      groups: [
        {
          id: 'm18l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 1, number: true },
          template:
            "JOB VACANCY ENQUIRY\nFamily name: {{1}}\nFirst name: {{2}}\nTelephone number: {{3}}\nJob: {{4}}\nWorking day: {{5}}\nHours per week: {{6}}",
          questions: [
            { id: 'm18l-q1', number: 1, answer: { accepted: ['Davies'] }, explanation: { text: 'His family name is Davies.', evidence: { quote: 'my family name is Davies' } } },
            { id: 'm18l-q2', number: 2, answer: { accepted: ['Tom'] }, explanation: { text: 'His first name is Tom.', evidence: { quote: 'My first name is Tom' } } },
            { id: 'm18l-q3', number: 3, answer: { accepted: ['07812345690'] }, explanation: { text: 'His mobile number is oh seven eight one two three four five six nine oh.', evidence: { quote: 'oh seven eight one two three four five six nine oh' } } },
            { id: 'm18l-q4', number: 4, answer: { accepted: ['assistant'] }, explanation: { text: 'He is asking about the job for a shop assistant.', evidence: { quote: 'the job for a shop assistant' } } },
            { id: 'm18l-q5', number: 5, answer: { accepted: ['Saturday'] }, explanation: { text: 'He would like to work on Saturday.', evidence: { quote: 'I would like to work on Saturday' } } },
            { id: 'm18l-q6', number: 6, answer: { accepted: ['twenty', '20'] }, explanation: { text: 'He would like to work twenty hours each week.', evidence: { quote: 'I would like to work twenty hours each week' } } },
          ],
        },
        {
          id: 'm18l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm18l-q7',
              number: 7,
              prompt: 'How much is the pay for the job?',
              options: [
                { id: 'A', text: 'ten pounds an hour' },
                { id: 'B', text: 'twelve pounds an hour' },
                { id: 'C', text: 'fifteen pounds an hour' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The pay is twelve pounds an hour.',
                evidence: { quote: 'The pay is twelve pounds an hour' },
              },
            },
            {
              id: 'm18l-q8',
              number: 8,
              prompt: 'What experience does Mr Davies need for the job?',
              options: [
                { id: 'A', text: 'no experience' },
                { id: 'B', text: 'two years of experience' },
                { id: 'C', text: 'five years of experience' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'He does not need experience for the job.',
                evidence: { quote: 'you do not need experience for the job' },
              },
            },
            {
              id: 'm18l-q9',
              number: 9,
              prompt: 'When is the closing date for the job?',
              options: [
                { id: 'A', text: 'the thirtieth of June' },
                { id: 'B', text: 'the thirtieth of July' },
                { id: 'C', text: 'the third of June' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The closing date is the thirtieth of June.',
                evidence: { quote: 'The closing date is the thirtieth of June' },
              },
            },
            {
              id: 'm18l-q10',
              number: 10,
              prompt: 'Where will the interview be?',
              options: [
                { id: 'A', text: 'at the bookshop' },
                { id: 'B', text: 'at the library' },
                { id: 'C', text: 'on the telephone' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The interview will be at the bookshop.',
                evidence: { quote: 'The interview will be at the bookshop' },
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
      title: 'Talk about a flower show',
      audio: {
        intro: 'Part 2. You will hear an organiser talking about a flower show. First, you have some time to look at questions 11 to 14.',
        noun: 'talk',
        ...rec('l2'),
        sets: [
          { questions: '11 to 14', fromLine: 0 },
          { questions: '15 to 20', fromLine: 4 },
        ],
        script: [
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "Good morning, everyone, and welcome to the Spring Flower Show. My name is Helen, and I am the organiser of the show." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "The show opened in 1998, and this year more than twelve thousand people will visit the show." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "The show is open every day from nine o'clock in the morning until five o'clock in the evening." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "Tickets cost eight pounds for adults, and children under twelve can visit the show for free." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "The first place is the rose garden, where visitors can see more than two hundred kinds of roses and take photographs." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "Next to the rose garden, there is the vegetable garden, where visitors can learn how to grow vegetables at home." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "Near the vegetable garden, there is the flower competition, where visitors can see the best flowers and vote for their favourite flower." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "There is also a tea room, where visitors can drink tea and eat cakes made with flowers." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "Finally, there is the plant shop, where visitors can buy plants and seeds to take home." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "There is also a children's garden, where children can plant seeds and learn about flowers." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "Thank you for coming to the Spring Flower Show. I hope you enjoy your visit. Have a wonderful day!" },
        ],
      },
      groups: [
        {
          id: 'm18l-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm18l-q11',
              number: 11,
              prompt: 'When did the Spring Flower Show open?',
              options: [
                { id: 'A', text: 'in 1998' },
                { id: 'B', text: 'in 1989' },
                { id: 'C', text: 'in 2008' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The show opened in 1998.',
                evidence: { quote: 'The show opened in 1998' },
              },
            },
            {
              id: 'm18l-q12',
              number: 12,
              prompt: 'How many people will visit the show this year?',
              options: [
                { id: 'A', text: 'more than twelve thousand' },
                { id: 'B', text: 'more than two thousand' },
                { id: 'C', text: 'more than twenty thousand' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'This year more than twelve thousand people will visit the show.',
                evidence: { quote: 'more than twelve thousand people will visit the show' },
              },
            },
            {
              id: 'm18l-q13',
              number: 13,
              prompt: 'What do children under twelve pay to visit the show?',
              options: [
                { id: 'A', text: 'nothing' },
                { id: 'B', text: 'eight pounds' },
                { id: 'C', text: 'five pounds' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Children under twelve can visit the show for free.',
                evidence: { quote: 'children under twelve can visit the show for free' },
              },
            },
            {
              id: 'm18l-q14',
              number: 14,
              prompt: 'When does the show close?',
              options: [
                { id: 'A', text: "at five o'clock in the evening" },
                { id: 'B', text: "at six o'clock in the evening" },
                { id: 'C', text: "at nine o'clock in the evening" },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The show is open until five o\'clock in the evening.',
                evidence: { quote: 'until five o\'clock in the evening' },
              },
            },
          ],
        },
        {
          id: 'm18l-g4',
          type: 'matching',
          instructions: 'What is said about each of the following? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 15–20.',
          optionsTitle: 'Features',
          options: [
            { id: 'A', text: 'It is where visitors can see more than two hundred kinds of roses and take photographs.' },
            { id: 'B', text: 'It is where visitors can learn how to grow vegetables at home.' },
            { id: 'C', text: 'It is where visitors can see the best flowers and vote for their favourite flower.' },
            { id: 'D', text: 'It is where visitors can drink tea and eat cakes made with flowers.' },
            { id: 'E', text: 'It is where visitors can buy plants and seeds to take home.' },
            { id: 'F', text: 'It is where children can plant seeds and learn about flowers.' },
            { id: 'G', text: 'Tickets cost eight pounds for adults.' },
            { id: 'H', text: 'The show opened in 1989.' },
          ],
          questions: [
            { id: 'm18l-q15', number: 15, prompt: 'Rose garden', answer: { accepted: ['A'] }, explanation: { text: 'The rose garden is where visitors can see more than two hundred kinds of roses and take photographs.', evidence: { quote: 'where visitors can see more than two hundred kinds of roses and take photographs' } } },
            { id: 'm18l-q16', number: 16, prompt: 'Vegetable garden', answer: { accepted: ['B'] }, explanation: { text: 'The vegetable garden is where visitors can learn how to grow vegetables at home.', evidence: { quote: 'where visitors can learn how to grow vegetables at home' } } },
            { id: 'm18l-q17', number: 17, prompt: 'Flower competition', answer: { accepted: ['C'] }, explanation: { text: 'The flower competition is where visitors can see the best flowers and vote for their favourite flower.', evidence: { quote: 'where visitors can see the best flowers and vote for their favourite flower' } } },
            { id: 'm18l-q18', number: 18, prompt: 'Tea room', answer: { accepted: ['D'] }, explanation: { text: 'The tea room is where visitors can drink tea and eat cakes made with flowers.', evidence: { quote: 'where visitors can drink tea and eat cakes made with flowers' } } },
            { id: 'm18l-q19', number: 19, prompt: 'Plant shop', answer: { accepted: ['E'] }, explanation: { text: 'The plant shop is where visitors can buy plants and seeds to take home.', evidence: { quote: 'where visitors can buy plants and seeds to take home' } } },
            { id: 'm18l-q20', number: 20, prompt: "Children's garden", answer: { accepted: ['F'] }, explanation: { text: "The children's garden is where children can plant seeds and learn about flowers.", evidence: { quote: 'where children can plant seeds and learn about flowers' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Two students planning a radio programme',
      audio: {
        intro: 'Part 3. You will hear two students, Emma and Liam, planning a radio programme. First, you have some time to look at questions 21 to 25.',
        noun: 'discussion',
        ...rec('l3'),
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 13 },
        ],
        script: [
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Hi, Liam. Have you started planning our radio programme?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "Yes, I have started planning the programme, Emma. We will make a radio programme about music in our town." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Music in our town. What will we talk about first?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "First, we will talk about the school band, because the band will play at the school concert next month." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "The school band. Where will we find information about the band?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "We will find information in the music room, and the music teacher will show us photographs of the band." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Photographs of the band. Who will we talk to about music in the town?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "We will talk to Mrs Allen, because she is a singer, and she knows a lot about music in the town." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Mrs Allen. What will we do after we visit the music room?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "After we visit the music room, we will visit the concert hall, and we will learn how a concert is planned." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "The concert hall. How long will the programme be?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "The programme will be thirty minutes long, and we will play it on Friday the nineteenth of June." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Thirty minutes. What should we put in the programme?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "I think we should put an interview with Mrs Allen in the programme, because she is a singer." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Good idea. What about the music? What should we do with the music?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "I think we should play music by the school band in the programme, because the music will show what the band can do." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Good. Who will present the programme?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "I will present the programme, because I am good at talking." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "You will present the programme. When should we finish the programme?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "We should finish the programme on Wednesday, so we can practise on Thursday." },
        ],
      },
      groups: [
        {
          id: 'm18l-g5',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm18l-q21',
              number: 21,
              prompt: 'What will the radio programme be about?',
              options: [
                { id: 'A', text: 'music in their town' },
                { id: 'B', text: 'the history of their town' },
                { id: 'C', text: 'sport in their town' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'They will make a radio programme about music in their town.',
                evidence: { quote: 'We will make a radio programme about music in our town' },
              },
            },
            {
              id: 'm18l-q22',
              number: 22,
              prompt: 'What will the students talk about first?',
              options: [
                { id: 'A', text: 'the school band' },
                { id: 'B', text: 'the concert hall' },
                { id: 'C', text: 'the music room' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'First, they will talk about the school band.',
                evidence: { quote: 'First, we will talk about the school band' },
              },
            },
            {
              id: 'm18l-q23',
              number: 23,
              prompt: 'Where will the students find information about the band?',
              options: [
                { id: 'A', text: 'in the music room' },
                { id: 'B', text: 'in the concert hall' },
                { id: 'C', text: 'in the library' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'They will find information in the music room.',
                evidence: { quote: 'We will find information in the music room' },
              },
            },
            {
              id: 'm18l-q24',
              number: 24,
              prompt: 'Who will the students talk to about music in the town?',
              options: [
                { id: 'A', text: 'Mrs Allen' },
                { id: 'B', text: 'the music teacher' },
                { id: 'C', text: 'the head teacher' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'They will talk to Mrs Allen.',
                evidence: { quote: 'We will talk to Mrs Allen' },
              },
            },
            {
              id: 'm18l-q25',
              number: 25,
              prompt: 'How long will the programme be?',
              options: [
                { id: 'A', text: 'twenty minutes' },
                { id: 'B', text: 'thirty minutes' },
                { id: 'C', text: 'sixty minutes' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The programme will be thirty minutes long.',
                evidence: { quote: 'The programme will be thirty minutes long' },
              },
            },
          ],
        },
        {
          id: 'm18l-g6',
          type: 'matching',
          instructions: 'What was agreed about each of the following? Choose FIVE answers from the box and write the correct letter, A–F, next to Questions 26–30.',
          optionsTitle: 'Decisions',
          options: [
            { id: 'A', text: 'They should put an interview with Mrs Allen in the programme.' },
            { id: 'B', text: 'They should play music by the school band in the programme.' },
            { id: 'C', text: 'He will present the programme.' },
            { id: 'D', text: 'They should finish the programme on Wednesday.' },
            { id: 'E', text: 'They can practise on Thursday.' },
            { id: 'F', text: 'They will visit the concert hall first.' },
          ],
          questions: [
            { id: 'm18l-q26', number: 26, prompt: 'Interview', answer: { accepted: ['A'] }, explanation: { text: 'They should put an interview with Mrs Allen in the programme.', evidence: { quote: 'we should put an interview with Mrs Allen in the programme' } } },
            { id: 'm18l-q27', number: 27, prompt: 'Music', answer: { accepted: ['B'] }, explanation: { text: 'They should play music by the school band in the programme.', evidence: { quote: 'we should play music by the school band in the programme' } } },
            { id: 'm18l-q28', number: 28, prompt: 'Presenter', answer: { accepted: ['C'] }, explanation: { text: 'Liam will present the programme.', evidence: { quote: 'I will present the programme' } } },
            { id: 'm18l-q29', number: 29, prompt: 'Finishing the programme', answer: { accepted: ['D'] }, explanation: { text: 'They should finish the programme on Wednesday.', evidence: { quote: 'We should finish the programme on Wednesday' } } },
            { id: 'm18l-q30', number: 30, prompt: 'Practising', answer: { accepted: ['E'] }, explanation: { text: 'They can practise on Thursday.', evidence: { quote: 'we can practise on Thursday' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Lecture: the history of the internet',
      audio: {
        intro: 'Part 4. You will hear a lecture about the history of the internet. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Good morning. Today I am going to talk about the history of the internet, the system that lets computers around the world share information." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "The internet began in the nineteen sixties, when scientists in America wanted computers to share information with each other." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In 1969, the first computers were joined together in a small network, and the first message was sent from one computer to another." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In the nineteen eighties, a scientist called Tim Berners-Lee worked at a laboratory in Switzerland, and he had an idea for the World Wide Web." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "The World Wide Web lets people find information on the internet, and it uses pages that are joined together by links." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In the nineteen nineties, the internet grew quickly, and many people began to use email to send messages to friends and to work." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Today, people use the internet for many things, and they can buy food, watch films and learn new skills on the internet." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "However, some people worry about the internet, because they think that people spend too much time on the internet." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In the future, the internet may help doctors to treat patients, and it may help students to learn at home." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In conclusion, the internet has changed a great deal in more than fifty years, but it is still a new system. That brings us to the end of the lecture." },
        ],
      },
      groups: [
        {
          id: 'm18l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'THE HISTORY OF THE INTERNET\nWhat is the internet?\n• the internet is the system that lets computers share {{31}} around the world\n• the internet began in the nineteen {{32}}, when scientists wanted computers to share information\nThe first network\n• in 1969, the first computers were joined together in a small {{33}}\n• the first message was sent from one computer to another\nThe World Wide Web\n• a scientist called Tim {{34}} worked at a laboratory in Switzerland\n• the World Wide Web uses pages that are joined together by {{35}}\nThe internet in the 1990s\n• many people began to use {{36}} to send messages to friends and to work\nThe internet today\n• people can buy food, watch films and learn new {{37}} on the internet\n• some people think that people spend too much {{38}} on the internet\nThe internet in the future\n• the internet may help doctors to treat {{39}}\nConclusion\n• the internet is still a {{40}} system',
          questions: [
            { id: 'm18l-q31', number: 31, answer: { accepted: ['information'] }, explanation: { text: 'The internet is the system that lets computers share information.', evidence: { quote: 'lets computers around the world share information' } } },
            { id: 'm18l-q32', number: 32, answer: { accepted: ['sixties'] }, explanation: { text: 'The internet began in the nineteen sixties.', evidence: { quote: 'began in the nineteen sixties' } } },
            { id: 'm18l-q33', number: 33, answer: { accepted: ['network'] }, explanation: { text: 'The first computers were joined together in a small network.', evidence: { quote: 'joined together in a small network' } } },
            { id: 'm18l-q34', number: 34, answer: { accepted: ['Berners-Lee'] }, explanation: { text: 'A scientist called Tim Berners-Lee worked at a laboratory in Switzerland.', evidence: { quote: 'a scientist called Tim Berners-Lee' } } },
            { id: 'm18l-q35', number: 35, answer: { accepted: ['links'] }, explanation: { text: 'The World Wide Web uses pages that are joined together by links.', evidence: { quote: 'joined together by links' } } },
            { id: 'm18l-q36', number: 36, answer: { accepted: ['email'] }, explanation: { text: 'Many people began to use email to send messages.', evidence: { quote: 'began to use email' } } },
            { id: 'm18l-q37', number: 37, answer: { accepted: ['skills'] }, explanation: { text: 'People can learn new skills on the internet.', evidence: { quote: 'learn new skills on the internet' } } },
            { id: 'm18l-q38', number: 38, answer: { accepted: ['time'] }, explanation: { text: 'Some people think that people spend too much time on the internet.', evidence: { quote: 'people spend too much time on the internet' } } },
            { id: 'm18l-q39', number: 39, answer: { accepted: ['patients'] }, explanation: { text: 'The internet may help doctors to treat patients.', evidence: { quote: 'help doctors to treat patients' } } },
            { id: 'm18l-q40', number: 40, answer: { accepted: ['new'] }, explanation: { text: 'The internet is still a new system.', evidence: { quote: 'it is still a new system' } } },
          ],
        },
      ],
    },
  ],
};
