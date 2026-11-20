import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 20 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material.
 */

const rec = (partId: string) => recorded('vb-mock-20', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock20Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Arranging a home repair visit by phone',
      audio: {
        intro: "Part 1. You will hear a woman arranging a home repair visit by phone. First, you have some time to look at questions 1 to 6.",
        noun: 'conversation',
        ...rec('l1'),
        sets: [
          { questions: '1 to 6', fromLine: 0 },
          { questions: '7 to 10', fromLine: 15 },
        ],
        script: [
          { speaker: 'Mr Hall', voice: M, accent: 'en-GB', text: "Good morning. City Repairs. This is David Hall speaking. How can I help you?" },
          { speaker: 'Mrs Thompson', voice: W, accent: 'en-GB', text: "Good morning. My name is Helen Thompson, and I need a repair in my kitchen." },
          { speaker: 'Mr Hall', voice: M, accent: 'en-GB', text: "Of course, Mrs Thompson. Could I take your family name, please?" },
          { speaker: 'Mrs Thompson', voice: W, accent: 'en-GB', text: "Yes, my family name is Thompson." },
          { speaker: 'Mr Hall', voice: M, accent: 'en-GB', text: "Thank you. What is your first name?" },
          { speaker: 'Mrs Thompson', voice: W, accent: 'en-GB', text: "My first name is Helen." },
          { speaker: 'Mr Hall', voice: M, accent: 'en-GB', text: "Helen. What is your address, please?" },
          { speaker: 'Mrs Thompson', voice: W, accent: 'en-GB', text: "My address is 24 Green Street, near the park." },
          { speaker: 'Mr Hall', voice: M, accent: 'en-GB', text: "24 Green Street. What is your telephone number?" },
          { speaker: 'Mrs Thompson', voice: W, accent: 'en-GB', text: "My telephone number is oh seven seven eight one two three four five six." },
          { speaker: 'Mr Hall', voice: M, accent: 'en-GB', text: "Oh seven seven eight one two three four five six. Thank you. What is the problem in your kitchen?" },
          { speaker: 'Mrs Thompson', voice: W, accent: 'en-GB', text: "The problem is a broken tap, and water is coming out of the tap all the time." },
          { speaker: 'Mr Hall', voice: M, accent: 'en-GB', text: "A broken tap. When can our repair worker visit you?" },
          { speaker: 'Mrs Thompson', voice: W, accent: 'en-GB', text: "He can visit on Friday morning, after nine o'clock." },
          { speaker: 'Mr Hall', voice: M, accent: 'en-GB', text: "Friday morning, after nine o'clock. How long will the repair take?" },
          { speaker: 'Mrs Thompson', voice: W, accent: 'en-GB', text: "I think the repair will take about two hours." },
          { speaker: 'Mr Hall', voice: M, accent: 'en-GB', text: "About two hours. What is the cost of the repair?" },
          { speaker: 'Mrs Thompson', voice: W, accent: 'en-GB', text: "The cost is forty-five pounds, and I will pay by card." },
          { speaker: 'Mr Hall', voice: M, accent: 'en-GB', text: "Forty-five pounds, by card. Will you be at home on Friday morning?" },
          { speaker: 'Mrs Thompson', voice: W, accent: 'en-GB', text: "Yes, I will be at home all morning." },
          { speaker: 'Mr Hall', voice: M, accent: 'en-GB', text: "Thank you, Mrs Thompson. Our repair worker is called Paul, and he will call you before he comes." },
          { speaker: 'Mrs Thompson', voice: W, accent: 'en-GB', text: "Thank you very much, Mr Hall. Goodbye." },
          { speaker: 'Mr Hall', voice: M, accent: 'en-GB', text: "Goodbye, Mrs Thompson." },
        ],
      },
      groups: [
        {
          id: 'm20l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 2, number: true },
          template:
            "HOME REPAIR\nFamily name: {{1}}\nFirst name: {{2}}\nAddress: {{3}}\nTelephone number: {{4}}\nProblem: {{5}}\nVisit: {{6}}",
          questions: [
            { id: 'm20l-q1', number: 1, answer: { accepted: ['Thompson'] }, explanation: { text: 'Her family name is Thompson.', evidence: { quote: 'my family name is Thompson' } } },
            { id: 'm20l-q2', number: 2, answer: { accepted: ['Helen'] }, explanation: { text: 'Her first name is Helen.', evidence: { quote: 'My first name is Helen' } } },
            { id: 'm20l-q3', number: 3, answer: { accepted: ['24 Green Street'] }, explanation: { text: 'Her address is 24 Green Street.', evidence: { quote: 'My address is 24 Green Street' } } },
            { id: 'm20l-q4', number: 4, answer: { accepted: ['0778123456'] }, explanation: { text: 'Her telephone number is oh seven seven eight one two three four five six.', evidence: { quote: 'oh seven seven eight one two three four five six' } } },
            { id: 'm20l-q5', number: 5, answer: { accepted: ['broken tap'] }, explanation: { text: 'The problem is a broken tap.', evidence: { quote: 'The problem is a broken tap' } } },
            { id: 'm20l-q6', number: 6, answer: { accepted: ['Friday morning'] }, explanation: { text: 'The repair worker can visit on Friday morning.', evidence: { quote: 'He can visit on Friday morning' } } },
          ],
        },
        {
          id: 'm20l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm20l-q7',
              number: 7,
              prompt: 'How long will the repair take?',
              options: [
                { id: 'A', text: 'one hour' },
                { id: 'B', text: 'about two hours' },
                { id: 'C', text: 'three hours' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The repair will take about two hours.',
                evidence: { quote: 'the repair will take about two hours' },
              },
            },
            {
              id: 'm20l-q8',
              number: 8,
              prompt: 'What is the cost of the repair?',
              options: [
                { id: 'A', text: 'twenty-five pounds' },
                { id: 'B', text: 'forty-five pounds' },
                { id: 'C', text: 'fifty-four pounds' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The cost is forty-five pounds.',
                evidence: { quote: 'The cost is forty-five pounds' },
              },
            },
            {
              id: 'm20l-q9',
              number: 9,
              prompt: 'How will Mrs Thompson pay for the repair?',
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
              id: 'm20l-q10',
              number: 10,
              prompt: 'What will Paul do before he comes?',
              options: [
                { id: 'A', text: 'call Mrs Thompson' },
                { id: 'B', text: 'send her a letter' },
                { id: 'C', text: 'send her an email' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Paul will call Mrs Thompson before he comes.',
                evidence: { quote: 'he will call you before he comes' },
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
      title: 'Talk about a local festival',
      audio: {
        intro: 'Part 2. You will hear the organiser of a local festival talking to visitors. First, you have some time to look at questions 11 to 14.',
        noun: 'talk',
        ...rec('l2'),
        sets: [
          { questions: '11 to 14', fromLine: 0 },
          { questions: '15 to 20', fromLine: 5 },
        ],
        script: [
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "Good afternoon, everyone, and welcome to the Riverside Festival. My name is Anna, and I am the organiser of the festival this year." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "The Riverside Festival takes place every year in June, and this year it will take place on Saturday the twentieth of June." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "The festival starts at ten o'clock in the morning, and it finishes at nine o'clock in the evening." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "This year, more than five thousand people will come to the festival, and there will be music, food and games for children." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "Tickets cost five pounds for adults, and children under twelve can come in for free." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "The first event is the opening parade, which starts at the market square and finishes at the river." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "Next, there will be a concert in the park, with three local bands and a choir from the school." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "After the concert, you can visit the food market, where you can try food from ten different countries." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "In the afternoon, there will be a boat race on the river, and the fastest boat will win a prize of two hundred pounds." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "Near the river, there is a children's area, where children can paint pictures and play games." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "At the end of the day, there will be fireworks over the river, and the fireworks will start at nine o'clock. Thank you, and enjoy the festival!" },
        ],
      },
      groups: [
        {
          id: 'm20l-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm20l-q11',
              number: 11,
              prompt: 'When will the festival take place this year?',
              options: [
                { id: 'A', text: 'on Saturday the twentieth of June' },
                { id: 'B', text: 'on Sunday the twentieth of June' },
                { id: 'C', text: 'on Saturday the tenth of June' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The festival will take place on Saturday the twentieth of June.',
                evidence: { quote: 'on Saturday the twentieth of June' },
              },
            },
            {
              id: 'm20l-q12',
              number: 12,
              prompt: 'What time does the festival finish?',
              options: [
                { id: 'A', text: 'ten o\'clock in the morning' },
                { id: 'B', text: 'nine o\'clock in the evening' },
                { id: 'C', text: 'five o\'clock in the afternoon' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The festival finishes at nine o\'clock in the evening.',
                evidence: { quote: 'it finishes at nine o\'clock in the evening' },
              },
            },
            {
              id: 'm20l-q13',
              number: 13,
              prompt: 'How many people will come to the festival this year?',
              options: [
                { id: 'A', text: 'more than three thousand people' },
                { id: 'B', text: 'more than five thousand people' },
                { id: 'C', text: 'more than five hundred people' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'More than five thousand people will come to the festival.',
                evidence: { quote: 'more than five thousand people will come to the festival' },
              },
            },
            {
              id: 'm20l-q14',
              number: 14,
              prompt: 'How much do tickets cost for adults?',
              options: [
                { id: 'A', text: 'five pounds' },
                { id: 'B', text: 'ten pounds' },
                { id: 'C', text: 'free' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Tickets cost five pounds for adults.',
                evidence: { quote: 'Tickets cost five pounds for adults' },
              },
            },
          ],
        },
        {
          id: 'm20l-g4',
          type: 'matching',
          instructions: 'What is said about each of the following? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 15–20.',
          optionsTitle: 'Features',
          options: [
            { id: 'A', text: 'It starts at the market square and finishes at the river.' },
            { id: 'B', text: 'It has three local bands and a choir from the school.' },
            { id: 'C', text: 'You can try food from ten different countries.' },
            { id: 'D', text: 'The fastest boat will win a prize of two hundred pounds.' },
            { id: 'E', text: 'Children can paint pictures and play games.' },
            { id: 'F', text: 'The fireworks will start at nine o\'clock.' },
            { id: 'G', text: 'Tickets cost ten pounds for adults.' },
            { id: 'H', text: 'The festival takes place in winter.' },
          ],
          questions: [
            { id: 'm20l-q15', number: 15, prompt: 'Opening parade', answer: { accepted: ['A'] }, explanation: { text: 'The opening parade starts at the market square and finishes at the river.', evidence: { quote: 'starts at the market square and finishes at the river' } } },
            { id: 'm20l-q16', number: 16, prompt: 'Concert in the park', answer: { accepted: ['B'] }, explanation: { text: 'The concert has three local bands and a choir from the school.', evidence: { quote: 'with three local bands and a choir from the school' } } },
            { id: 'm20l-q17', number: 17, prompt: 'Food market', answer: { accepted: ['C'] }, explanation: { text: 'At the food market, you can try food from ten different countries.', evidence: { quote: 'where you can try food from ten different countries' } } },
            { id: 'm20l-q18', number: 18, prompt: 'Boat race', answer: { accepted: ['D'] }, explanation: { text: 'In the boat race, the fastest boat will win a prize of two hundred pounds.', evidence: { quote: 'the fastest boat will win a prize of two hundred pounds' } } },
            { id: 'm20l-q19', number: 19, prompt: "Children's area", answer: { accepted: ['E'] }, explanation: { text: 'In the children\'s area, children can paint pictures and play games.', evidence: { quote: 'where children can paint pictures and play games' } } },
            { id: 'm20l-q20', number: 20, prompt: 'Fireworks', answer: { accepted: ['F'] }, explanation: { text: 'The fireworks will start at nine o\'clock.', evidence: { quote: 'the fireworks will start at nine o\'clock' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Two students planning a survey on transport',
      audio: {
        intro: 'Part 3. You will hear two students, Emma and Jack, planning a survey on transport. First, you have some time to look at questions 21 to 25.',
        noun: 'discussion',
        ...rec('l3'),
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 13 },
        ],
        script: [
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Hi, Jack. Have you started planning our survey on transport?" },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "Not yet, Emma. What is the aim of our survey?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "The aim is to find out how students travel to college." },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "How students travel to college. How many students will we ask?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "We will ask one hundred students, from different classes." },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "One hundred students. What questions will we ask them?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "First, we will ask how they travel to college: by bus, by train, by car, or on foot." },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "By bus, by train, by car, or on foot. What else will we ask?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "We will also ask how long their journey takes, and how much it costs." },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "How long the journey takes, and how much it costs. When will we do the survey?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "We will do the survey next week, on Monday and Tuesday." },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "Monday and Tuesday. Where will we ask the students?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "We will ask the students in the college hall, at lunchtime." },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "In the college hall, at lunchtime. What is the main problem with our plan?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "The main problem is that many students travel by bus, but the bus is often late." },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "The bus is often late. What should we do about the problem?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "I think we should ask the students about the bus times, because this will show how late the buses are." },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "Good idea. What else should we do?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "I think we should make a chart of the results, because a chart will show the answers clearly." },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "A chart of the results. Who will make the chart?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "I will make the chart, because I am good at making charts." },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "You will make the chart. When should we finish the survey?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "We should finish the survey on Friday, so we can write the report next week." },
          { speaker: 'Jack', voice: M, accent: 'en-GB', text: "Friday. Thank you, Emma. Let us start now." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Good idea, Jack." },
        ],
      },
      groups: [
        {
          id: 'm20l-g5',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm20l-q21',
              number: 21,
              prompt: 'What is the aim of the survey?',
              options: [
                { id: 'A', text: 'to find out how students travel to college' },
                { id: 'B', text: 'to find out how much a bus ticket costs' },
                { id: 'C', text: 'to find out how to drive a car' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The aim is to find out how students travel to college.',
                evidence: { quote: 'The aim is to find out how students travel to college' },
              },
            },
            {
              id: 'm20l-q22',
              number: 22,
              prompt: 'How many students will they ask?',
              options: [
                { id: 'A', text: 'fifty students' },
                { id: 'B', text: 'one hundred students' },
                { id: 'C', text: 'two hundred students' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'They will ask one hundred students.',
                evidence: { quote: 'We will ask one hundred students' },
              },
            },
            {
              id: 'm20l-q23',
              number: 23,
              prompt: 'What will the students be asked first?',
              options: [
                { id: 'A', text: 'how they travel to college' },
                { id: 'B', text: 'how much their journey costs' },
                { id: 'C', text: 'where they live' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'First, they will ask how the students travel to college.',
                evidence: { quote: 'we will ask how they travel to college' },
              },
            },
            {
              id: 'm20l-q24',
              number: 24,
              prompt: 'When will they do the survey?',
              options: [
                { id: 'A', text: 'this week' },
                { id: 'B', text: 'next week, on Monday and Tuesday' },
                { id: 'C', text: 'next month' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'They will do the survey next week, on Monday and Tuesday.',
                evidence: { quote: 'We will do the survey next week, on Monday and Tuesday' },
              },
            },
            {
              id: 'm20l-q25',
              number: 25,
              prompt: 'Where will they ask the students?',
              options: [
                { id: 'A', text: 'in the college hall, at lunchtime' },
                { id: 'B', text: 'in the library, in the morning' },
                { id: 'C', text: 'on the bus, in the evening' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'They will ask the students in the college hall, at lunchtime.',
                evidence: { quote: 'We will ask the students in the college hall, at lunchtime' },
              },
            },
          ],
        },
        {
          id: 'm20l-g6',
          type: 'matching',
          instructions: 'What was agreed about each of the following? Choose FIVE answers from the box and write the correct letter, A–F, next to Questions 26–30.',
          optionsTitle: 'Decisions',
          options: [
            { id: 'A', text: 'Many students travel by bus, but the bus is often late.' },
            { id: 'B', text: 'They should ask the students about the bus times.' },
            { id: 'C', text: 'They should make a chart of the results.' },
            { id: 'D', text: 'Emma will make the chart.' },
            { id: 'E', text: 'They should finish the survey on Friday.' },
            { id: 'F', text: 'They will finish the survey next week.' },
          ],
          questions: [
            { id: 'm20l-q26', number: 26, prompt: 'Problem with the plan', answer: { accepted: ['A'] }, explanation: { text: 'The main problem is that many students travel by bus, but the bus is often late.', evidence: { quote: 'many students travel by bus, but the bus is often late' } } },
            { id: 'm20l-q27', number: 27, prompt: 'Bus times', answer: { accepted: ['B'] }, explanation: { text: 'They should ask the students about the bus times.', evidence: { quote: 'we should ask the students about the bus times' } } },
            { id: 'm20l-q28', number: 28, prompt: 'Chart', answer: { accepted: ['C'] }, explanation: { text: 'They should make a chart of the results.', evidence: { quote: 'we should make a chart of the results' } } },
            { id: 'm20l-q29', number: 29, prompt: 'Making the chart', answer: { accepted: ['D'] }, explanation: { text: 'Emma will make the chart.', evidence: { quote: 'I will make the chart' } } },
            { id: 'm20l-q30', number: 30, prompt: 'Finishing the survey', answer: { accepted: ['E'] }, explanation: { text: 'They should finish the survey on Friday.', evidence: { quote: 'We should finish the survey on Friday' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Lecture: the history of the universe',
      audio: {
        intro: 'Part 4. You will hear a lecture about the history of the universe. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Good morning. Today I am going to talk about the history of the universe, from the beginning of time to the present day." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "About fourteen billion years ago, the universe began with a very hot and very small point, and this beginning is called the Big Bang." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In the first second, the universe grew very quickly, and it became hot and full of light." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "After about three hundred thousand years, the universe became cool enough for atoms to form, and the first light could travel freely." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "About two hundred million years later, the first stars were born, and these stars made light and heat." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "The first stars were very large, and when they died, they made new things, such as carbon and oxygen." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "About five billion years ago, our Sun was born, and the planets around the Sun, including the Earth, were formed from dust and rock." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Life on Earth began about four billion years ago, in the sea, and the first living things were very small." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "About sixty-six million years ago, a large rock from space hit the Earth, and the dinosaurs died." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Today, scientists study the universe with telescopes, and the largest telescopes can see light from very far away." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In the future, scientists hope to learn more about the universe, and they hope to find out if there is life on other planets." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In conclusion, the universe is about fourteen billion years old, and its history is a story of stars, planets and life. That brings us to the end of the lecture." },
        ],
      },
      groups: [
        {
          id: 'm20l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'THE HISTORY OF THE UNIVERSE\nThe beginning\n• the universe began with a very hot and very small {{31}}\n• in the first second, the universe grew very {{32}}\n• after about three hundred thousand years, the universe became cool enough for {{33}} to form\nThe first stars\n• the first stars were born about two hundred million years {{34}}\n• when the first stars died, they made new things, such as {{35}} and oxygen\nOur Sun and the Earth\n• our Sun was born about five billion years {{36}}\n• the planets were formed from {{37}} and rock\n• life on Earth began about four billion years ago, in the {{38}}\nThe end of the dinosaurs\n• a large {{39}} from space hit the Earth\nThe future\n• scientists hope to find out if there is life on other {{40}}',
          questions: [
            { id: 'm20l-q31', number: 31, answer: { accepted: ['point'] }, explanation: { text: 'The universe began with a very hot and very small point.', evidence: { quote: 'a very hot and very small point' } } },
            { id: 'm20l-q32', number: 32, answer: { accepted: ['quickly'] }, explanation: { text: 'In the first second, the universe grew very quickly.', evidence: { quote: 'the universe grew very quickly' } } },
            { id: 'm20l-q33', number: 33, answer: { accepted: ['atoms'] }, explanation: { text: 'The universe became cool enough for atoms to form.', evidence: { quote: 'cool enough for atoms to form' } } },
            { id: 'm20l-q34', number: 34, answer: { accepted: ['later'] }, explanation: { text: 'The first stars were born about two hundred million years later.', evidence: { quote: 'About two hundred million years later' } } },
            { id: 'm20l-q35', number: 35, answer: { accepted: ['carbon'] }, explanation: { text: 'When the first stars died, they made new things, such as carbon and oxygen.', evidence: { quote: 'such as carbon and oxygen' } } },
            { id: 'm20l-q36', number: 36, answer: { accepted: ['ago'] }, explanation: { text: 'Our Sun was born about five billion years ago.', evidence: { quote: 'About five billion years ago' } } },
            { id: 'm20l-q37', number: 37, answer: { accepted: ['dust'] }, explanation: { text: 'The planets were formed from dust and rock.', evidence: { quote: 'formed from dust and rock' } } },
            { id: 'm20l-q38', number: 38, answer: { accepted: ['sea'] }, explanation: { text: 'Life on Earth began in the sea.', evidence: { quote: 'in the sea' } } },
            { id: 'm20l-q39', number: 39, answer: { accepted: ['rock'] }, explanation: { text: 'A large rock from space hit the Earth.', evidence: { quote: 'a large rock from space hit the Earth' } } },
            { id: 'm20l-q40', number: 40, answer: { accepted: ['planets'] }, explanation: { text: 'Scientists hope to find out if there is life on other planets.', evidence: { quote: 'life on other planets' } } },
          ],
        },
      ],
    },
  ],
};
