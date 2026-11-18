import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 10 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material.
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
      title: 'Booking an airport transfer by phone',
      audio: {
        intro: 'Part 1. You will hear a man booking an airport transfer by phone. First, you have some time to look at questions 1 to 7.',
        noun: 'conversation',
        ...rec('l1'),
        sets: [
          { questions: '1 to 7', fromLine: 0 },
          { questions: '8 to 10', fromLine: 16 },
        ],
        script: [
          { speaker: 'Operator', voice: W, accent: 'en-GB', text: "Good afternoon, CityLink Airport Transfers. This is Laura speaking. How can I help you?" },
          { speaker: 'Mr Foster', voice: M, accent: 'en-GB', text: "Hello. I would like to book a taxi to the airport, please." },
          { speaker: 'Operator', voice: W, accent: 'en-GB', text: "Of course. Could I take your name, please?" },
          { speaker: 'Mr Foster', voice: M, accent: 'en-GB', text: "Yes, it is James Foster." },
          { speaker: 'Operator', voice: W, accent: 'en-GB', text: "Could you spell your surname for me, please?" },
          { speaker: 'Mr Foster', voice: M, accent: 'en-GB', text: "Sure. F, O, S, T, E, R." },
          { speaker: 'Operator', voice: W, accent: 'en-GB', text: "Thank you, Mr Foster. What is your address?" },
          { speaker: 'Mr Foster', voice: M, accent: 'en-GB', text: "My address is 14 Rosewood Avenue, Brighton." },
          { speaker: 'Operator', voice: W, accent: 'en-GB', text: "Fourteen Rosewood Avenue, Brighton. And when do you need the taxi?" },
          { speaker: 'Mr Foster', voice: M, accent: 'en-GB', text: "I need it on Friday, the twenty-third of October, at half past five in the morning." },
          { speaker: 'Operator', voice: W, accent: 'en-GB', text: "Friday the twenty-third of October, at half past five in the morning. Which airport are you flying from?" },
          { speaker: 'Mr Foster', voice: M, accent: 'en-GB', text: "I am flying from Gatwick Airport." },
          { speaker: 'Operator', voice: W, accent: 'en-GB', text: "Gatwick Airport. How many passengers will there be?" },
          { speaker: 'Mr Foster', voice: M, accent: 'en-GB', text: "There will be three passengers, and we will have four large suitcases." },
          { speaker: 'Operator', voice: W, accent: 'en-GB', text: "Three passengers and four large suitcases. The price for the journey is forty-two pounds." },
          { speaker: 'Operator', voice: W, accent: 'en-GB', text: "Could I take your telephone number, please, in case we need to contact you?" },
          { speaker: 'Mr Foster', voice: M, accent: 'en-GB', text: "Yes, my mobile number is oh seven eight one, nine two three, four five six." },
          { speaker: 'Operator', voice: W, accent: 'en-GB', text: "Oh seven eight one, nine two three, four five six. And is there anything else?" },
          { speaker: 'Mr Foster', voice: M, accent: 'en-GB', text: "Yes. What time should I be ready?" },
          { speaker: 'Operator', voice: W, accent: 'en-GB', text: "Please be ready at five o'clock in the morning, because the driver will arrive early." },
          { speaker: 'Mr Foster', voice: M, accent: 'en-GB', text: "Five o'clock. Can I pay by card?" },
          { speaker: 'Operator', voice: W, accent: 'en-GB', text: "Yes, you can pay the driver by card, or you can pay by cash." },
          { speaker: 'Mr Foster', voice: M, accent: 'en-GB', text: "Thank you. Can I change the booking if my flight time changes?" },
          { speaker: 'Operator', voice: W, accent: 'en-GB', text: "Yes, you can change the booking free of charge up to twelve hours before the journey." },
          { speaker: 'Mr Foster', voice: M, accent: 'en-GB', text: "That is good. Thank you very much for your help." },
          { speaker: 'Operator', voice: W, accent: 'en-GB', text: "You are welcome, Mr Foster. We look forward to seeing you on Friday. Goodbye." },
          { speaker: 'Mr Foster', voice: M, accent: 'en-GB', text: "Goodbye." },
        ],
      },
      groups: [
        {
          id: 'm10l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 1, number: true },
          template:
            'CITYLINK AIRPORT TRANSFERS – BOOKING FORM\nName: James {{1}}\nAddress: 14 {{2}} Avenue, Brighton\nDate: Friday, {{3}} October\nTime: {{4}} in the morning\nAirport: {{5}} Airport\nPrice: £{{6}}',
          questions: [
            { id: 'm10l-q1', number: 1, answer: { accepted: ['Foster'] }, explanation: { text: 'The surname is spelled out: F-O-S-T-E-R.', evidence: { quote: 'F, O, S, T, E, R.' } } },
            { id: 'm10l-q2', number: 2, answer: { accepted: ['Rosewood'] }, explanation: { text: 'The address is 14 Rosewood Avenue, Brighton.', evidence: { quote: '14 Rosewood Avenue, Brighton' } } },
            { id: 'm10l-q3', number: 3, answer: { accepted: ['23', 'twenty-third'] }, explanation: { text: 'The taxi is needed on Friday, the twenty-third of October.', evidence: { quote: 'the twenty-third of October' } } },
            { id: 'm10l-q4', number: 4, answer: { accepted: ['5.30', 'half past five'] }, explanation: { text: 'The taxi is needed at half past five in the morning.', evidence: { quote: 'at half past five in the morning' } } },
            { id: 'm10l-q5', number: 5, answer: { accepted: ['Gatwick'] }, explanation: { text: 'Mr Foster is flying from Gatwick Airport.', evidence: { quote: 'I am flying from Gatwick Airport' } } },
            { id: 'm10l-q6', number: 6, answer: { accepted: ['42', 'forty-two'] }, explanation: { text: 'The price for the journey is forty-two pounds.', evidence: { quote: 'The price for the journey is forty-two pounds' } } },
          ],
        },
        {
          id: 'm10l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm10l-q7',
              number: 7,
              prompt: 'How many passengers will there be?',
              options: [
                { id: 'A', text: 'two passengers' },
                { id: 'B', text: 'three passengers' },
                { id: 'C', text: 'four passengers' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'There will be three passengers.',
                evidence: { quote: 'There will be three passengers' },
              },
            },
            {
              id: 'm10l-q8',
              number: 8,
              prompt: 'What time should Mr Foster be ready?',
              options: [
                { id: 'A', text: 'at five o\'clock in the morning' },
                { id: 'B', text: 'at half past five in the morning' },
                { id: 'C', text: 'at six o\'clock in the morning' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Mr Foster should be ready at five o\'clock in the morning.',
                evidence: { quote: 'Please be ready at five o\'clock in the morning' },
              },
            },
            {
              id: 'm10l-q9',
              number: 9,
              prompt: 'How can Mr Foster pay for the journey?',
              options: [
                { id: 'A', text: 'by card or by cash' },
                { id: 'B', text: 'by card only' },
                { id: 'C', text: 'by cash only' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'He can pay the driver by card, or he can pay by cash.',
                evidence: { quote: 'you can pay the driver by card, or you can pay by cash' },
              },
            },
            {
              id: 'm10l-q10',
              number: 10,
              prompt: 'When can Mr Foster change the booking free of charge?',
              options: [
                { id: 'A', text: 'up to twelve hours before the journey' },
                { id: 'B', text: 'up to six hours before the journey' },
                { id: 'C', text: 'up to twenty-four hours before the journey' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'He can change the booking free of charge up to twelve hours before the journey.',
                evidence: { quote: 'up to twelve hours before the journey' },
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
      title: 'Talk about a wildlife reserve',
      audio: {
        intro: 'Part 2. You will hear a guide talking to visitors at a wildlife reserve. First, you have some time to look at questions 11 to 14.',
        noun: 'talk',
        ...rec('l2'),
        sets: [
          { questions: '11 to 14', fromLine: 0 },
          { questions: '15 to 20', fromLine: 5 },
        ],
        script: [
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Good morning, everyone, and welcome to Willow Creek Wildlife Reserve. My name is Hannah, and I will be your guide today." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "The reserve was opened in nineteen eighty-five, and it covers an area of more than four hundred square kilometres." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "The reserve is open every day from nine o'clock in the morning until five o'clock in the afternoon." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "More than two hundred thousand people visit the reserve every year, and the best time to see the animals is early in the morning." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Please stay with your group at all times, and do not make loud noises, because this can frighten the animals." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "We will begin at the bird hide, where you can watch more than fifty kinds of birds without disturbing them." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Next, we will walk to the kangaroo field, where you can see the kangaroos eating grass in the early morning." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "After the kangaroo field, we will visit the reptile house, where you can see snakes and lizards from all over Australia." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Then we will stop at the river, where platypuses swim in the clear water." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "From the river, we will go to the koala trees, where you can see koalas sleeping high in the branches." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Finally, we will end our visit at the cafe, where you can buy lunch and enjoy the view over the reserve." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "That is the end of my talk. If you have any questions, please come and find me. Thank you, and enjoy your visit." },
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
              prompt: 'When was Willow Creek Wildlife Reserve opened?',
              options: [
                { id: 'A', text: 'in nineteen seventy-five' },
                { id: 'B', text: 'in nineteen eighty-five' },
                { id: 'C', text: 'in nineteen ninety-five' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The reserve was opened in nineteen eighty-five.',
                evidence: { quote: 'was opened in nineteen eighty-five' },
              },
            },
            {
              id: 'm10l-q12',
              number: 12,
              prompt: 'How large is the reserve?',
              options: [
                { id: 'A', text: 'more than three hundred square kilometres' },
                { id: 'B', text: 'more than four hundred square kilometres' },
                { id: 'C', text: 'more than five hundred square kilometres' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The reserve covers an area of more than four hundred square kilometres.',
                evidence: { quote: 'covers an area of more than four hundred square kilometres' },
              },
            },
            {
              id: 'm10l-q13',
              number: 13,
              prompt: 'What time does the reserve close in the afternoon?',
              options: [
                { id: 'A', text: 'at four o\'clock' },
                { id: 'B', text: 'at five o\'clock' },
                { id: 'C', text: 'at six o\'clock' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The reserve is open until five o\'clock in the afternoon.',
                evidence: { quote: 'until five o\'clock in the afternoon' },
              },
            },
            {
              id: 'm10l-q14',
              number: 14,
              prompt: 'What are visitors asked not to do?',
              options: [
                { id: 'A', text: 'take photographs' },
                { id: 'B', text: 'make loud noises' },
                { id: 'C', text: 'stay with their group' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Visitors are asked not to make loud noises, because this can frighten the animals.',
                evidence: { quote: 'do not make loud noises' },
              },
            },
          ],
        },
        {
          id: 'm10l-g4',
          type: 'matching',
          instructions: 'What is said about each of the following places in the reserve? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 15–20.',
          optionsTitle: 'Features',
          options: [
            { id: 'A', text: 'Visitors can watch more than fifty kinds of birds without disturbing them.' },
            { id: 'B', text: 'Visitors can see kangaroos eating grass in the early morning.' },
            { id: 'C', text: 'Visitors can see snakes and lizards from all over Australia.' },
            { id: 'D', text: 'Platypuses swim in the clear water here.' },
            { id: 'E', text: 'Visitors can see koalas sleeping high in the branches.' },
            { id: 'F', text: 'Visitors can buy lunch and enjoy the view over the reserve.' },
            { id: 'G', text: 'It sells books about animals from many countries.' },
            { id: 'H', text: 'It is closed on Sundays.' },
          ],
          questions: [
            { id: 'm10l-q15', number: 15, prompt: 'Bird hide', answer: { accepted: ['A'] }, explanation: { text: 'At the bird hide you can watch more than fifty kinds of birds without disturbing them.', evidence: { quote: 'you can watch more than fifty kinds of birds without disturbing them' } } },
            { id: 'm10l-q16', number: 16, prompt: 'Kangaroo field', answer: { accepted: ['B'] }, explanation: { text: 'At the kangaroo field you can see the kangaroos eating grass in the early morning.', evidence: { quote: 'you can see the kangaroos eating grass in the early morning' } } },
            { id: 'm10l-q17', number: 17, prompt: 'Reptile house', answer: { accepted: ['C'] }, explanation: { text: 'In the reptile house you can see snakes and lizards from all over Australia.', evidence: { quote: 'you can see snakes and lizards from all over Australia' } } },
            { id: 'm10l-q18', number: 18, prompt: 'River', answer: { accepted: ['D'] }, explanation: { text: 'At the river, platypuses swim in the clear water.', evidence: { quote: 'platypuses swim in the clear water' } } },
            { id: 'm10l-q19', number: 19, prompt: 'Koala trees', answer: { accepted: ['E'] }, explanation: { text: 'At the koala trees you can see koalas sleeping high in the branches.', evidence: { quote: 'you can see koalas sleeping high in the branches' } } },
            { id: 'm10l-q20', number: 20, prompt: 'Cafe', answer: { accepted: ['F'] }, explanation: { text: 'At the cafe you can buy lunch and enjoy the view over the reserve.', evidence: { quote: 'you can buy lunch and enjoy the view over the reserve' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Two students planning a science fair',
      audio: {
        intro: 'Part 3. You will hear two students, Sara and Alex, planning a science fair at their school. First, you have some time to look at questions 21 to 25.',
        noun: 'discussion',
        ...rec('l3'),
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 14 },
        ],
        script: [
          { speaker: 'Sara', voice: W, accent: 'en-GB', text: "Hi, Alex. Have you started planning for the science fair next month?" },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "Yes, I have read the instructions. We have to choose a project about the environment." },
          { speaker: 'Sara', voice: W, accent: 'en-GB', text: "That is the topic. What project should we choose? Do you have any ideas?" },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "I think we should study how much plastic is thrown away in our school every week." },
          { speaker: 'Sara', voice: W, accent: 'en-GB', text: "That sounds interesting. What is our main question?" },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "Our main question is: how much plastic does our school throw away, and where does it come from?" },
          { speaker: 'Sara', voice: W, accent: 'en-GB', text: "Good. How will we collect the information?" },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "We will weigh the plastic in the school bins every day for two weeks." },
          { speaker: 'Sara', voice: W, accent: 'en-GB', text: "That is a good plan. What else will we need?" },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "We will need a large set of scales, some strong bags, and gloves to protect our hands." },
          { speaker: 'Sara', voice: W, accent: 'en-GB', text: "Yes, and we should take photographs of the plastic, so we can show them at the fair." },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "Good idea. How will we show our results?" },
          { speaker: 'Sara', voice: W, accent: 'en-GB', text: "I think we should make a poster with a chart, and we can also make a short video about the project." },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "The science fair will be on the tenth of December, and each team will have ten minutes to present its project." },
          { speaker: 'Sara', voice: W, accent: 'en-GB', text: "The tenth of December. Who will do the talking at the fair?" },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "I will introduce the project, and you will explain the results." },
          { speaker: 'Sara', voice: W, accent: 'en-GB', text: "What about Ben? I think he should answer questions from the visitors." },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "Yes, and Mia can be in charge of the poster and the video." },
          { speaker: 'Sara', voice: W, accent: 'en-GB', text: "Perfect. When shall we start collecting the plastic? I think we should start next Monday." },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "Good idea. I will ask our teacher, Mrs Green, for permission to use the scales." },
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
              prompt: 'What is the topic of the science fair project?',
              options: [
                { id: 'A', text: 'the environment' },
                { id: 'B', text: 'the history of science' },
                { id: 'C', text: 'space travel' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The students have to choose a project about the environment.',
                evidence: { quote: 'choose a project about the environment' },
              },
            },
            {
              id: 'm10l-q22',
              number: 22,
              prompt: 'What do Sara and Alex want to study?',
              options: [
                { id: 'A', text: 'how much plastic is thrown away in their school every week' },
                { id: 'B', text: 'how much paper is used in their school every week' },
                { id: 'C', text: 'how much food is wasted in their school every week' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'They want to study how much plastic is thrown away in their school every week.',
                evidence: { quote: 'how much plastic is thrown away in our school every week' },
              },
            },
            {
              id: 'm10l-q23',
              number: 23,
              prompt: 'What is their main question?',
              options: [
                { id: 'A', text: 'how much plastic the school throws away, and where it comes from' },
                { id: 'B', text: 'how much plastic costs in the shops' },
                { id: 'C', text: 'how plastic is made in factories' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Their main question is how much plastic the school throws away, and where it comes from.',
                evidence: { quote: 'how much plastic does our school throw away, and where does it come from' },
              },
            },
            {
              id: 'm10l-q24',
              number: 24,
              prompt: 'How will they collect the information?',
              options: [
                { id: 'A', text: 'They will weigh the plastic in the school bins every day for two weeks.' },
                { id: 'B', text: 'They will count the plastic bottles in the playground.' },
                { id: 'C', text: 'They will ask every student in the school.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'They will weigh the plastic in the school bins every day for two weeks.',
                evidence: { quote: 'We will weigh the plastic in the school bins every day for two weeks' },
              },
            },
            {
              id: 'm10l-q25',
              number: 25,
              prompt: 'When will the science fair be?',
              options: [
                { id: 'A', text: 'on the tenth of November' },
                { id: 'B', text: 'on the tenth of December' },
                { id: 'C', text: 'on the twentieth of December' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The science fair will be on the tenth of December.',
                evidence: { quote: 'The science fair will be on the tenth of December' },
              },
            },
          ],
        },
        {
          id: 'm10l-g6',
          type: 'matching',
          instructions: 'What was agreed about each part of the science fair plan? Choose FIVE answers from the box and write the correct letter, A–F, next to Questions 26–30.',
          optionsTitle: 'Decisions',
          options: [
            { id: 'A', text: 'He will introduce the project.' },
            { id: 'B', text: 'She will explain the results.' },
            { id: 'C', text: 'He will answer questions from the visitors.' },
            { id: 'D', text: 'She will be in charge of the poster and the video.' },
            { id: 'E', text: 'The students will start collecting the plastic next Monday.' },
            { id: 'F', text: 'She will write about ocean currents.' },
          ],
          questions: [
            { id: 'm10l-q26', number: 26, prompt: 'Alex', answer: { accepted: ['A'] }, explanation: { text: 'Alex will introduce the project.', evidence: { quote: 'I will introduce the project' } } },
            { id: 'm10l-q27', number: 27, prompt: 'Sara', answer: { accepted: ['B'] }, explanation: { text: 'Sara will explain the results.', evidence: { quote: 'you will explain the results' } } },
            { id: 'm10l-q28', number: 28, prompt: 'Ben', answer: { accepted: ['C'] }, explanation: { text: 'Ben will answer questions from the visitors.', evidence: { quote: 'he should answer questions from the visitors' } } },
            { id: 'm10l-q29', number: 29, prompt: 'Mia', answer: { accepted: ['D'] }, explanation: { text: 'Mia will be in charge of the poster and the video.', evidence: { quote: 'Mia can be in charge of the poster and the video' } } },
            { id: 'm10l-q30', number: 30, prompt: 'collecting the plastic', answer: { accepted: ['E'] }, explanation: { text: 'The students will start collecting the plastic next Monday.', evidence: { quote: 'we should start next Monday' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Lecture: the history of cinema',
      audio: {
        intro: 'Part 4. You will hear a lecture about the history of cinema. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Good afternoon. Today I am going to talk about the history of cinema, from the first moving pictures to the films we watch today." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "The first films were made in the eighteen nineties, and they were very short, often less than one minute long." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "These early films had no sound, and they were shown in small halls, where a pianist played music while the film was shown." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "By the nineteen twenties, films had become much longer, and the first cinemas, which could hold hundreds of people, were built in towns and cities." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "The biggest change came in nineteen twenty-seven, when the first film with sound was shown, and audiences could hear the actors speak for the first time." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In the nineteen thirties, colour films became popular, and the first colour films were made using a new kind of film that could show bright colours." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "After the Second World War, television became popular, and many people stopped going to the cinema, so cinemas had to find new ways to bring people back." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "One answer was the wide screen, which made films look bigger and more exciting than television, and another was the growth of cinemas with many screens in one building." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Today, most films are made with digital cameras, and many people watch films at home on computers and phones, as well as in the cinema." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In conclusion, the cinema has changed many times in its history, but it has always been a place where people come together to enjoy a story. That brings us to the end of the lecture." },
        ],
      },
      groups: [
        {
          id: 'm10l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'THE HISTORY OF CINEMA\nEarly films\n• the first films were made in the eighteen {{31}}\n• early films were very {{32}}, often less than one minute long\n• early films had no {{33}}, and a pianist played music while the film was shown\nThe growth of cinema\n• by the nineteen twenties, the first {{34}}, which could hold hundreds of people, were built\n• the first film with sound was shown in nineteen twenty-{{35}}\n• in the nineteen thirties, {{36}} films became popular\nTelevision and change\n• after the Second World War, many people stopped going to the {{37}}\n• one answer was the wide {{38}}, which made films look bigger\n• another was the growth of cinemas with many {{39}} in one building\nToday\n• most films are made with {{40}} cameras',
          questions: [
            { id: 'm10l-q31', number: 31, answer: { accepted: ['nineties'] }, explanation: { text: 'The first films were made in the eighteen nineties.', evidence: { quote: 'made in the eighteen nineties' } } },
            { id: 'm10l-q32', number: 32, answer: { accepted: ['short'] }, explanation: { text: 'The first films were very short, often less than one minute long.', evidence: { quote: 'they were very short' } } },
            { id: 'm10l-q33', number: 33, answer: { accepted: ['sound'] }, explanation: { text: 'Early films had no sound.', evidence: { quote: 'These early films had no sound' } } },
            { id: 'm10l-q34', number: 34, answer: { accepted: ['cinemas'] }, explanation: { text: 'The first cinemas, which could hold hundreds of people, were built in towns and cities.', evidence: { quote: 'the first cinemas, which could hold hundreds of people, were built' } } },
            { id: 'm10l-q35', number: 35, answer: { accepted: ['seven'] }, explanation: { text: 'The first film with sound was shown in nineteen twenty-seven.', evidence: { quote: 'in nineteen twenty-seven' } } },
            { id: 'm10l-q36', number: 36, answer: { accepted: ['colour'] }, explanation: { text: 'In the nineteen thirties, colour films became popular.', evidence: { quote: 'colour films became popular' } } },
            { id: 'm10l-q37', number: 37, answer: { accepted: ['cinema'] }, explanation: { text: 'Many people stopped going to the cinema after television became popular.', evidence: { quote: 'many people stopped going to the cinema' } } },
            { id: 'm10l-q38', number: 38, answer: { accepted: ['screen'] }, explanation: { text: 'One answer was the wide screen, which made films look bigger.', evidence: { quote: 'the wide screen, which made films look bigger' } } },
            { id: 'm10l-q39', number: 39, answer: { accepted: ['screens'] }, explanation: { text: 'Cinemas with many screens in one building grew.', evidence: { quote: 'cinemas with many screens in one building' } } },
            { id: 'm10l-q40', number: 40, answer: { accepted: ['digital'] }, explanation: { text: 'Today, most films are made with digital cameras.', evidence: { quote: 'most films are made with digital cameras' } } },
          ],
        },
      ],
    },
  ],
};
