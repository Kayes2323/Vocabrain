import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 22 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material.
 */

const rec = (partId: string) => recorded('vb-mock-22', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock22Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Joining a book club by phone',
      audio: {
        intro: "Part 1. You will hear a woman joining a book club by phone. First, you have some time to look at questions 1 to 6.",
        noun: 'conversation',
        ...rec('l1'),
        sets: [
          { questions: '1 to 6', fromLine: 0 },
          { questions: '7 to 10', fromLine: 15 },
        ],
        script: [
          { speaker: 'Mr Doyle', voice: M, accent: 'en-GB', text: "Good morning. Riverside Book Club. This is David Doyle speaking. How can I help you?" },
          { speaker: 'Mrs Hughes', voice: W, accent: 'en-GB', text: "Good morning. My name is Anna Hughes, and I would like to join your book club." },
          { speaker: 'Mr Doyle', voice: M, accent: 'en-GB', text: "Of course, Mrs Hughes. Could I take your family name, please?" },
          { speaker: 'Mrs Hughes', voice: W, accent: 'en-GB', text: "Yes, my family name is Hughes." },
          { speaker: 'Mr Doyle', voice: M, accent: 'en-GB', text: "Thank you. What is your first name?" },
          { speaker: 'Mrs Hughes', voice: W, accent: 'en-GB', text: "My first name is Anna." },
          { speaker: 'Mr Doyle', voice: M, accent: 'en-GB', text: "Anna. What is your address, please?" },
          { speaker: 'Mrs Hughes', voice: W, accent: 'en-GB', text: "My address is 24 Garden Street, near the library." },
          { speaker: 'Mr Doyle', voice: M, accent: 'en-GB', text: "24 Garden Street. What is your telephone number?" },
          { speaker: 'Mrs Hughes', voice: W, accent: 'en-GB', text: "My telephone number is oh seven eight one two three four five six seven." },
          { speaker: 'Mr Doyle', voice: M, accent: 'en-GB', text: "Oh seven eight one two three four five six seven. Thank you. When is our first meeting?" },
          { speaker: 'Mrs Hughes', voice: W, accent: 'en-GB', text: "The first meeting is on Thursday the ninth of May." },
          { speaker: 'Mr Doyle', voice: M, accent: 'en-GB', text: "Thursday the ninth of May. How many books do members read each month?" },
          { speaker: 'Mrs Hughes', voice: W, accent: 'en-GB', text: "Members read two books each month." },
          { speaker: 'Mr Doyle', voice: M, accent: 'en-GB', text: "Two books each month. What kind of books does the club read?" },
          { speaker: 'Mrs Hughes', voice: W, accent: 'en-GB', text: "We read modern novels, and sometimes we read books about history." },
          { speaker: 'Mr Doyle', voice: M, accent: 'en-GB', text: "Modern novels. How much is the membership?" },
          { speaker: 'Mrs Hughes', voice: W, accent: 'en-GB', text: "The membership is fifteen pounds a year." },
          { speaker: 'Mr Doyle', voice: M, accent: 'en-GB', text: "Fifteen pounds a year. Where does the club meet?" },
          { speaker: 'Mrs Hughes', voice: W, accent: 'en-GB', text: "The club meets in the library meeting room, on the first floor." },
          { speaker: 'Mr Doyle', voice: M, accent: 'en-GB', text: "In the library meeting room. What will we send you?" },
          { speaker: 'Mrs Hughes', voice: W, accent: 'en-GB', text: "You will send me a welcome letter with the list of books." },
          { speaker: 'Mr Doyle', voice: M, accent: 'en-GB', text: "A welcome letter with the list of books. Thank you, Mrs Hughes. Goodbye." },
          { speaker: 'Mrs Hughes', voice: W, accent: 'en-GB', text: "Thank you very much, Mr Doyle. Goodbye." },
        ],
      },
      groups: [
        {
          id: 'm22l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 2, number: true },
          template:
            "BOOK CLUB MEMBERSHIP\nFamily name: {{1}}\nFirst name: {{2}}\nAddress: {{3}}\nTelephone number: {{4}}\nFirst meeting: {{5}}\nBooks each month: {{6}}",
          questions: [
            { id: 'm22l-q1', number: 1, answer: { accepted: ['Hughes'] }, explanation: { text: 'Her family name is Hughes.', evidence: { quote: 'my family name is Hughes' } } },
            { id: 'm22l-q2', number: 2, answer: { accepted: ['Anna'] }, explanation: { text: 'Her first name is Anna.', evidence: { quote: 'My first name is Anna' } } },
            { id: 'm22l-q3', number: 3, answer: { accepted: ['24 Garden Street'] }, explanation: { text: 'Her address is 24 Garden Street.', evidence: { quote: 'My address is 24 Garden Street' } } },
            { id: 'm22l-q4', number: 4, answer: { accepted: ['0781234567'] }, explanation: { text: 'Her telephone number is oh seven eight one two three four five six seven.', evidence: { quote: 'oh seven eight one two three four five six seven' } } },
            { id: 'm22l-q5', number: 5, answer: { accepted: ['Thursday'] }, explanation: { text: 'The first meeting is on Thursday the ninth of May.', evidence: { quote: 'on Thursday the ninth of May' } } },
            { id: 'm22l-q6', number: 6, answer: { accepted: ['two books'] }, explanation: { text: 'Members read two books each month.', evidence: { quote: 'two books each month' } } },
          ],
        },
        {
          id: 'm22l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm22l-q7',
              number: 7,
              prompt: 'What kind of books does the club read?',
              options: [
                { id: 'A', text: 'modern novels' },
                { id: 'B', text: 'old poems' },
                { id: 'C', text: 'science books' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The club reads modern novels.',
                evidence: { quote: 'We read modern novels' },
              },
            },
            {
              id: 'm22l-q8',
              number: 8,
              prompt: 'How much is the membership?',
              options: [
                { id: 'A', text: 'fifteen pounds a year' },
                { id: 'B', text: 'fifty pounds a year' },
                { id: 'C', text: 'five pounds a year' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The membership is fifteen pounds a year.',
                evidence: { quote: 'The membership is fifteen pounds a year' },
              },
            },
            {
              id: 'm22l-q9',
              number: 9,
              prompt: 'Where does the club meet?',
              options: [
                { id: 'A', text: 'in the library meeting room' },
                { id: 'B', text: 'in the school hall' },
                { id: 'C', text: 'in the town park' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The club meets in the library meeting room.',
                evidence: { quote: 'The club meets in the library meeting room' },
              },
            },
            {
              id: 'm22l-q10',
              number: 10,
              prompt: 'What will the book club send Mrs Hughes?',
              options: [
                { id: 'A', text: 'a welcome letter with the list of books' },
                { id: 'B', text: 'a map of the town' },
                { id: 'C', text: 'a free book' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The club will send her a welcome letter with the list of books.',
                evidence: { quote: 'a welcome letter with the list of books' },
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
      title: 'Guided tour of a historic house',
      audio: {
        intro: 'Part 2. You will hear a guide talking to visitors at a historic house. First, you have some time to look at questions 11 to 14.',
        noun: 'talk',
        ...rec('l2'),
        sets: [
          { questions: '11 to 14', fromLine: 0 },
          { questions: '15 to 20', fromLine: 5 },
        ],
        script: [
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Good morning, everyone, and welcome to Willow House. My name is Emma, and I am your guide today." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Willow House was built in eighteen forty-two, and it was the home of the Carter family for more than one hundred years." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "The house is open every day except Monday, from ten o'clock in the morning to five o'clock in the afternoon." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "More than fifty thousand people visit the house every year, and many of them come from other countries." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "The tour costs eight pounds for adults, and children under twelve can visit the house for free." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "The first room you will see is the kitchen, where the family cooked their meals on a large open fire." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Next, there is the library, where you can see more than three thousand old books." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "After that, there is the garden room, where visitors can look out over the garden and the river." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Then, there is the bedroom, where you can see clothes from the nineteenth century." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Please remember: you must not touch the furniture, and you must not take photographs inside the house." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "At the end of the tour, you can visit the tea room, and the tea room is open from eleven o'clock to four o'clock. Thank you, and enjoy the tour!" },
        ],
      },
      groups: [
        {
          id: 'm22l-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm22l-q11',
              number: 11,
              prompt: 'When was Willow House built?',
              options: [
                { id: 'A', text: 'in eighteen forty-two' },
                { id: 'B', text: 'in nineteen forty-two' },
                { id: 'C', text: 'in eighteen twenty-four' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Willow House was built in eighteen forty-two.',
                evidence: { quote: 'built in eighteen forty-two' },
              },
            },
            {
              id: 'm22l-q12',
              number: 12,
              prompt: 'How many people visit the house every year?',
              options: [
                { id: 'A', text: 'more than five thousand people' },
                { id: 'B', text: 'more than fifty thousand people' },
                { id: 'C', text: 'more than five hundred thousand people' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'More than fifty thousand people visit the house every year.',
                evidence: { quote: 'More than fifty thousand people visit the house every year' },
              },
            },
            {
              id: 'm22l-q13',
              number: 13,
              prompt: 'How much does the tour cost for adults?',
              options: [
                { id: 'A', text: 'eight pounds' },
                { id: 'B', text: 'eighteen pounds' },
                { id: 'C', text: 'free' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The tour costs eight pounds for adults.',
                evidence: { quote: 'The tour costs eight pounds for adults' },
              },
            },
            {
              id: 'm22l-q14',
              number: 14,
              prompt: 'On which days is the house open?',
              options: [
                { id: 'A', text: 'every day' },
                { id: 'B', text: 'every day except Monday' },
                { id: 'C', text: 'only at weekends' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The house is open every day except Monday.',
                evidence: { quote: 'open every day except Monday' },
              },
            },
          ],
        },
        {
          id: 'm22l-g4',
          type: 'matching',
          instructions: 'What is said about each of the following? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 15–20.',
          optionsTitle: 'Features',
          options: [
            { id: 'A', text: 'The family cooked their meals on a large open fire.' },
            { id: 'B', text: 'You can see more than three thousand old books.' },
            { id: 'C', text: 'Visitors can look out over the garden and the river.' },
            { id: 'D', text: 'You can see clothes from the nineteenth century.' },
            { id: 'E', text: 'You must not touch the furniture, and you must not take photographs.' },
            { id: 'F', text: "The tea room is open from eleven o'clock to four o'clock." },
            { id: 'G', text: 'The house is open only on Mondays.' },
            { id: 'H', text: 'The tour costs eighteen pounds.' },
          ],
          questions: [
            { id: 'm22l-q15', number: 15, prompt: 'Kitchen', answer: { accepted: ['A'] }, explanation: { text: 'In the kitchen, the family cooked their meals on a large open fire.', evidence: { quote: 'the family cooked their meals on a large open fire' } } },
            { id: 'm22l-q16', number: 16, prompt: 'Library', answer: { accepted: ['B'] }, explanation: { text: 'In the library, you can see more than three thousand old books.', evidence: { quote: 'more than three thousand old books' } } },
            { id: 'm22l-q17', number: 17, prompt: 'Garden room', answer: { accepted: ['C'] }, explanation: { text: 'In the garden room, visitors can look out over the garden and the river.', evidence: { quote: 'visitors can look out over the garden and the river' } } },
            { id: 'm22l-q18', number: 18, prompt: 'Bedroom', answer: { accepted: ['D'] }, explanation: { text: 'In the bedroom, you can see clothes from the nineteenth century.', evidence: { quote: 'clothes from the nineteenth century' } } },
            { id: 'm22l-q19', number: 19, prompt: 'Rules for visitors', answer: { accepted: ['E'] }, explanation: { text: 'You must not touch the furniture, and you must not take photographs inside the house.', evidence: { quote: 'you must not touch the furniture' } } },
            { id: 'm22l-q20', number: 20, prompt: 'Tea room', answer: { accepted: ['F'] }, explanation: { text: "The tea room is open from eleven o'clock to four o'clock.", evidence: { quote: "the tea room is open from eleven o'clock to four o'clock" } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Two students discussing part-time jobs',
      audio: {
        intro: 'Part 3. You will hear two students, Hannah and Leo, discussing part-time jobs. First, you have some time to look at questions 21 to 25.',
        noun: 'discussion',
        ...rec('l3'),
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 13 },
        ],
        script: [
          { speaker: 'Hannah', voice: W, accent: 'en-GB', text: "Hi, Leo. Have you started planning our talk about part-time jobs?" },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: "Not yet, Hannah. What is the aim of our talk?" },
          { speaker: 'Hannah', voice: W, accent: 'en-GB', text: "The aim is to find out why students take part-time jobs." },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: "Why students take part-time jobs. How many students will we ask?" },
          { speaker: 'Hannah', voice: W, accent: 'en-GB', text: "We will ask sixty students, from different classes in our college." },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: "Sixty students. What questions will we ask them?" },
          { speaker: 'Hannah', voice: W, accent: 'en-GB', text: "First, we will ask how many hours they work each week: five hours, ten hours, or more than fifteen hours." },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: "Five hours, ten hours, or more than fifteen hours. What else will we ask?" },
          { speaker: 'Hannah', voice: W, accent: 'en-GB', text: "We will also ask what kind of job they do, and how much money they earn." },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: "What kind of job they do, and how much money they earn. When will we do the talk?" },
          { speaker: 'Hannah', voice: W, accent: 'en-GB', text: "We will do the talk next week, on Wednesday afternoon." },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: "Wednesday afternoon. Where will we ask the students?" },
          { speaker: 'Hannah', voice: W, accent: 'en-GB', text: "We will ask the students in the college canteen, at lunch time." },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: "In the college canteen, at lunch time. What is the main problem with our plan?" },
          { speaker: 'Hannah', voice: W, accent: 'en-GB', text: "The main problem is that many students work in the evenings, but they are tired after work." },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: "They are tired after work. What should we do about the problem?" },
          { speaker: 'Hannah', voice: W, accent: 'en-GB', text: "I think we should ask the students about Saturday jobs, because this will show when they are free." },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: "Good idea. What else should we do?" },
          { speaker: 'Hannah', voice: W, accent: 'en-GB', text: "I think we should make a chart of the results, because a chart will show the answers clearly." },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: "A chart of the results. Who will make the chart?" },
          { speaker: 'Hannah', voice: W, accent: 'en-GB', text: "I will make the chart, because I am good at making charts." },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: "You will make the chart. When should we finish the talk?" },
          { speaker: 'Hannah', voice: W, accent: 'en-GB', text: "We should finish the talk on Friday, so we can show it to the class next Monday." },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: "Friday. Thank you, Hannah. Let us start now." },
          { speaker: 'Hannah', voice: W, accent: 'en-GB', text: "Good idea, Leo." },
        ],
      },
      groups: [
        {
          id: 'm22l-g5',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm22l-q21',
              number: 21,
              prompt: 'What is the aim of the talk?',
              options: [
                { id: 'A', text: 'to find out why students take part-time jobs' },
                { id: 'B', text: 'to find out how much teachers are paid' },
                { id: 'C', text: 'to find out how to open a college' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The aim is to find out why students take part-time jobs.',
                evidence: { quote: 'The aim is to find out why students take part-time jobs' },
              },
            },
            {
              id: 'm22l-q22',
              number: 22,
              prompt: 'How many students will they ask?',
              options: [
                { id: 'A', text: 'sixteen students' },
                { id: 'B', text: 'sixty students' },
                { id: 'C', text: 'six hundred students' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'They will ask sixty students.',
                evidence: { quote: 'We will ask sixty students' },
              },
            },
            {
              id: 'm22l-q23',
              number: 23,
              prompt: 'What will the students be asked first?',
              options: [
                { id: 'A', text: 'how many hours they work each week' },
                { id: 'B', text: 'how much money they spend' },
                { id: 'C', text: 'where they live' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'First, they will ask how many hours the students work each week.',
                evidence: { quote: 'we will ask how many hours they work each week' },
              },
            },
            {
              id: 'm22l-q24',
              number: 24,
              prompt: 'When will they do the talk?',
              options: [
                { id: 'A', text: 'this week' },
                { id: 'B', text: 'next week, on Wednesday afternoon' },
                { id: 'C', text: 'next year' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'They will do the talk next week, on Wednesday afternoon.',
                evidence: { quote: 'We will do the talk next week, on Wednesday afternoon' },
              },
            },
            {
              id: 'm22l-q25',
              number: 25,
              prompt: 'Where will they ask the students?',
              options: [
                { id: 'A', text: 'in the college canteen, at lunch time' },
                { id: 'B', text: 'in the park, in the afternoon' },
                { id: 'C', text: 'at home, in the evening' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'They will ask the students in the college canteen, at lunch time.',
                evidence: { quote: 'We will ask the students in the college canteen, at lunch time' },
              },
            },
          ],
        },
        {
          id: 'm22l-g6',
          type: 'matching',
          instructions: 'What was agreed about each of the following? Choose FIVE answers from the box and write the correct letter, A–F, next to Questions 26–30.',
          optionsTitle: 'Decisions',
          options: [
            { id: 'A', text: 'Many students work in the evenings, but they are tired after work.' },
            { id: 'B', text: 'They should ask the students about Saturday jobs.' },
            { id: 'C', text: 'They should make a chart of the results.' },
            { id: 'D', text: 'Hannah will make the chart.' },
            { id: 'E', text: 'They should finish the talk on Friday.' },
            { id: 'F', text: 'They will finish the talk next month.' },
          ],
          questions: [
            { id: 'm22l-q26', number: 26, prompt: 'Problem with the plan', answer: { accepted: ['A'] }, explanation: { text: 'The main problem is that many students work in the evenings, but they are tired after work.', evidence: { quote: 'many students work in the evenings, but they are tired after work' } } },
            { id: 'm22l-q27', number: 27, prompt: 'Saturday jobs', answer: { accepted: ['B'] }, explanation: { text: 'They should ask the students about Saturday jobs.', evidence: { quote: 'we should ask the students about Saturday jobs' } } },
            { id: 'm22l-q28', number: 28, prompt: 'Chart', answer: { accepted: ['C'] }, explanation: { text: 'They should make a chart of the results.', evidence: { quote: 'we should make a chart of the results' } } },
            { id: 'm22l-q29', number: 29, prompt: 'Making the chart', answer: { accepted: ['D'] }, explanation: { text: 'Hannah will make the chart.', evidence: { quote: 'I will make the chart' } } },
            { id: 'm22l-q30', number: 30, prompt: 'Finishing the talk', answer: { accepted: ['E'] }, explanation: { text: 'They should finish the talk on Friday.', evidence: { quote: 'We should finish the talk on Friday' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Lecture: how the human eye works',
      audio: {
        intro: 'Part 4. You will hear a lecture about how the human eye works. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "Good morning. Today I am going to talk about how the human eye works, and how we see the world around us." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "The eye is about the size of a small ball, and it sits in a bony hole in the front of the head." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "Light enters the eye through the cornea, which is the clear front part of the eye." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "Behind the cornea is the iris, the coloured part of the eye, which opens and closes to let in more or less light." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "In the middle of the iris is the pupil, a black hole that gets bigger in the dark and smaller in bright light." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "Behind the pupil is the lens, which changes shape to focus the light on the back of the eye." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "The back of the eye is called the retina, and it has millions of tiny cells that change light into messages." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "There are two kinds of cells in the retina: rods, which help us to see in dim light, and cones, which help us to see colours." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "The messages from the retina travel to the brain along a nerve called the optic nerve." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "The brain then puts the messages together, and that is how we see pictures of the world." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "As people get older, the lens becomes less flexible, and it becomes harder to see things that are close to the eye." },
          { speaker: 'Lecturer', voice: W, accent: 'en-AU', text: "In conclusion, the eye is a wonderful part of the body, and it works with the brain to help us see. That brings us to the end of the lecture." },
        ],
      },
      groups: [
        {
          id: 'm22l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'THE HUMAN EYE\nThe parts of the eye\n• light enters the eye through the {{31}}\n• behind the cornea is the {{32}}, the coloured part of the eye\n• in the middle of the iris is the {{33}}, a black hole\n• behind the pupil is the {{34}}, which changes shape\nThe retina and the brain\n• the back of the eye is called the {{35}}\n• the retina has millions of tiny {{36}}\n• rods help us to see in dim {{37}}\n• cones help us to see {{38}}\n• messages travel to the brain along the optic {{39}}\nAgeing\n• as people get older, the lens becomes less {{40}}',
          questions: [
            { id: 'm22l-q31', number: 31, answer: { accepted: ['cornea'] }, explanation: { text: 'Light enters the eye through the cornea.', evidence: { quote: 'through the cornea' } } },
            { id: 'm22l-q32', number: 32, answer: { accepted: ['iris'] }, explanation: { text: 'Behind the cornea is the iris.', evidence: { quote: 'is the iris' } } },
            { id: 'm22l-q33', number: 33, answer: { accepted: ['pupil'] }, explanation: { text: 'In the middle of the iris is the pupil.', evidence: { quote: 'is the pupil' } } },
            { id: 'm22l-q34', number: 34, answer: { accepted: ['lens'] }, explanation: { text: 'Behind the pupil is the lens.', evidence: { quote: 'is the lens' } } },
            { id: 'm22l-q35', number: 35, answer: { accepted: ['retina'] }, explanation: { text: 'The back of the eye is called the retina.', evidence: { quote: 'is called the retina' } } },
            { id: 'm22l-q36', number: 36, answer: { accepted: ['cells'] }, explanation: { text: 'The retina has millions of tiny cells.', evidence: { quote: 'millions of tiny cells' } } },
            { id: 'm22l-q37', number: 37, answer: { accepted: ['light'] }, explanation: { text: 'Rods help us to see in dim light.', evidence: { quote: 'in dim light' } } },
            { id: 'm22l-q38', number: 38, answer: { accepted: ['colours'] }, explanation: { text: 'Cones help us to see colours.', evidence: { quote: 'to see colours' } } },
            { id: 'm22l-q39', number: 39, answer: { accepted: ['nerve'] }, explanation: { text: 'Messages travel to the brain along the optic nerve.', evidence: { quote: 'the optic nerve' } } },
            { id: 'm22l-q40', number: 40, answer: { accepted: ['flexible'] }, explanation: { text: 'As people get older, the lens becomes less flexible.', evidence: { quote: 'becomes less flexible' } } },
          ],
        },
      ],
    },
  ],
};
