import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 15 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material.
 */

const rec = (partId: string) => recorded('vb-mock-15', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock15Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Booking a driving lesson by phone',
      audio: {
        intro: "Part 1. You will hear a man booking a driving lesson by phone. First, you have some time to look at questions 1 to 6.",
        noun: 'conversation',
        ...rec('l1'),
        sets: [
          { questions: '1 to 6', fromLine: 0 },
          { questions: '7 to 10', fromLine: 15 },
        ],
        script: [
          { speaker: 'Instructor', voice: W, accent: 'en-GB', text: "Good morning. City Driving School. This is Anna speaking. How can I help you?" },
          { speaker: 'Mr Patel', voice: M, accent: 'en-GB', text: "Hello. I would like to book some driving lessons, please." },
          { speaker: 'Instructor', voice: W, accent: 'en-GB', text: "Of course. Could I take your full name, please?" },
          { speaker: 'Mr Patel', voice: M, accent: 'en-GB', text: "Yes, my name is Raj Patel." },
          { speaker: 'Instructor', voice: W, accent: 'en-GB', text: "Thank you, Mr Patel. Have you had any driving lessons before?" },
          { speaker: 'Mr Patel', voice: M, accent: 'en-GB', text: "No, I have never had a driving lesson before." },
          { speaker: 'Instructor', voice: W, accent: 'en-GB', text: "I see. What is your telephone number, please?" },
          { speaker: 'Mr Patel', voice: M, accent: 'en-GB', text: "My mobile number is oh seven nine double one, three four five, six seven eight." },
          { speaker: 'Instructor', voice: W, accent: 'en-GB', text: "Oh seven nine double one, three four five, six seven eight. Thank you. When would you like your first lesson?" },
          { speaker: 'Mr Patel', voice: M, accent: 'en-GB', text: "I would like my first lesson on Monday the ninth of March, at ten o'clock in the morning." },
          { speaker: 'Instructor', voice: W, accent: 'en-GB', text: "Monday the ninth of March, at ten o'clock. How many lessons would you like to book?" },
          { speaker: 'Mr Patel', voice: M, accent: 'en-GB', text: "I would like to book ten lessons." },
          { speaker: 'Instructor', voice: W, accent: 'en-GB', text: "Ten lessons. Each lesson lasts one hour, and the cost is thirty-five pounds per lesson." },
          { speaker: 'Mr Patel', voice: M, accent: 'en-GB', text: "Thirty-five pounds per lesson. Where will the lesson start?" },
          { speaker: 'Instructor', voice: W, accent: 'en-GB', text: "The lesson will start outside your home, at 42 Green Street." },
          { speaker: 'Mr Patel', voice: M, accent: 'en-GB', text: "42 Green Street. What kind of car will I drive?" },
          { speaker: 'Instructor', voice: W, accent: 'en-GB', text: "You will drive a small white car with two pedals for the instructor." },
          { speaker: 'Mr Patel', voice: M, accent: 'en-GB', text: "A small white car. Do I need to bring anything to the first lesson?" },
          { speaker: 'Instructor', voice: W, accent: 'en-GB', text: "Yes, please bring your driving licence and your glasses, if you wear glasses." },
          { speaker: 'Mr Patel', voice: M, accent: 'en-GB', text: "I wear glasses, so I will bring my glasses and my driving licence." },
          { speaker: 'Instructor', voice: W, accent: 'en-GB', text: "Good. I will send you a letter with the time of your first lesson and the name of your instructor." },
          { speaker: 'Mr Patel', voice: M, accent: 'en-GB', text: "Thank you. What is the name of my instructor?" },
          { speaker: 'Instructor', voice: W, accent: 'en-GB', text: "Your instructor is Mr Brown, and he has taught driving for fifteen years." },
          { speaker: 'Mr Patel', voice: M, accent: 'en-GB', text: "Thank you very much for your help." },
          { speaker: 'Instructor', voice: W, accent: 'en-GB', text: "You are welcome, Mr Patel. Goodbye." },
          { speaker: 'Mr Patel', voice: M, accent: 'en-GB', text: "Goodbye." },
        ],
      },
      groups: [
        {
          id: 'm15l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 1, number: true },
          template:
            'DRIVING LESSON BOOKING\nFamily name: {{1}}\nTelephone number: {{2}}\nFirst lesson: {{3}}\nNumber of lessons booked: {{4}}\nCost per lesson: {{5}}\nLesson starts at: {{6}}',
          questions: [
            { id: 'm15l-q1', number: 1, answer: { accepted: ['Patel'] }, explanation: { text: 'His name is Raj Patel.', evidence: { quote: 'my name is Raj Patel' } } },
            { id: 'm15l-q2', number: 2, answer: { accepted: ['07911345678'] }, explanation: { text: 'His mobile number is oh seven nine double one, three four five, six seven eight.', evidence: { quote: 'oh seven nine double one, three four five, six seven eight' } } },
            { id: 'm15l-q3', number: 3, answer: { accepted: ['Monday 9 March', '9 March', 'Monday the ninth of March'] }, explanation: { text: 'His first lesson is on Monday the ninth of March.', evidence: { quote: 'on Monday the ninth of March' } } },
            { id: 'm15l-q4', number: 4, answer: { accepted: ['ten', '10'] }, explanation: { text: 'He would like to book ten lessons.', evidence: { quote: 'I would like to book ten lessons' } } },
            { id: 'm15l-q5', number: 5, answer: { accepted: ['thirty-five pounds', '35 pounds', '£35'] }, explanation: { text: 'The cost is thirty-five pounds per lesson.', evidence: { quote: 'thirty-five pounds per lesson' } } },
            { id: 'm15l-q6', number: 6, answer: { accepted: ['42 Green Street'] }, explanation: { text: 'The lesson will start outside his home, at 42 Green Street.', evidence: { quote: 'at 42 Green Street' } } },
          ],
        },
        {
          id: 'm15l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm15l-q7',
              number: 7,
              prompt: 'What kind of car will Mr Patel drive?',
              options: [
                { id: 'A', text: 'a small white car' },
                { id: 'B', text: 'a large blue car' },
                { id: 'C', text: 'a small red car' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'He will drive a small white car with two pedals for the instructor.',
                evidence: { quote: 'You will drive a small white car' },
              },
            },
            {
              id: 'm15l-q8',
              number: 8,
              prompt: 'What should Mr Patel bring to his first lesson?',
              options: [
                { id: 'A', text: 'his driving licence and his glasses' },
                { id: 'B', text: 'his driving licence and his passport' },
                { id: 'C', text: 'his glasses and his money' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'He should bring his driving licence and his glasses.',
                evidence: { quote: 'bring your driving licence and your glasses' },
              },
            },
            {
              id: 'm15l-q9',
              number: 9,
              prompt: 'What is the name of Mr Patel’s instructor?',
              options: [
                { id: 'A', text: 'Mr Brown' },
                { id: 'B', text: 'Mr Green' },
                { id: 'C', text: 'Mr White' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'His instructor is Mr Brown.',
                evidence: { quote: 'Your instructor is Mr Brown' },
              },
            },
            {
              id: 'm15l-q10',
              number: 10,
              prompt: 'How long has Mr Brown taught driving?',
              options: [
                { id: 'A', text: 'for five years' },
                { id: 'B', text: 'for ten years' },
                { id: 'C', text: 'for fifteen years' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'Mr Brown has taught driving for fifteen years.',
                evidence: { quote: 'he has taught driving for fifteen years' },
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
      title: 'Talk about a beach clean-up project',
      audio: {
        intro: 'Part 2. You will hear an organiser talking about a beach clean-up project. First, you have some time to look at questions 11 to 14.',
        noun: 'talk',
        ...rec('l2'),
        sets: [
          { questions: '11 to 14', fromLine: 0 },
          { questions: '15 to 20', fromLine: 4 },
        ],
        script: [
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "Good morning, everyone, and welcome to the Seaside Beach Clean-Up. My name is Laura, and I am the organiser of the clean-up this year." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "The beach clean-up began five years ago, in 2021, when only thirty people came to help, and this year more than two hundred volunteers will take part." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "The clean-up will take place on Saturday the seventh of June, from nine o'clock in the morning until one o'clock in the afternoon." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "Volunteers do not need to pay anything to take part, but they should bring gloves and a water bottle." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "The first area of the beach is the north beach, where volunteers will collect plastic bottles and bags from the sand." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "Next to the north beach, there is the rock pool area, where volunteers will look for fishing nets and ropes between the rocks." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "Near the car park, there is the picnic area, where volunteers will put all the rubbish they collect into large green bags." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "There is also a learning tent, where children can learn about sea animals and how plastic harms them." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "Finally, there is the café by the beach, where volunteers can have a free drink and a sandwich after the clean-up." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "Please remember that you should wear strong shoes, because there are sharp shells on the beach, and you should not touch any glass." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "Thank you for coming to the Seaside Beach Clean-Up. I hope you enjoy helping the beach and the sea animals. Have a wonderful day!" },
        ],
      },
      groups: [
        {
          id: 'm15l-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm15l-q11',
              number: 11,
              prompt: 'When did the beach clean-up begin?',
              options: [
                { id: 'A', text: 'in 2021' },
                { id: 'B', text: 'in 2019' },
                { id: 'C', text: 'in 2016' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The beach clean-up began five years ago, in 2021.',
                evidence: { quote: 'began five years ago, in 2021' },
              },
            },
            {
              id: 'm15l-q12',
              number: 12,
              prompt: 'How many volunteers will take part this year?',
              options: [
                { id: 'A', text: 'thirty' },
                { id: 'B', text: 'one hundred' },
                { id: 'C', text: 'more than two hundred' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'This year more than two hundred volunteers will take part.',
                evidence: { quote: 'more than two hundred volunteers will take part' },
              },
            },
            {
              id: 'm15l-q13',
              number: 13,
              prompt: 'When will the clean-up take place?',
              options: [
                { id: 'A', text: 'on Friday the sixth of June' },
                { id: 'B', text: 'on Saturday the seventh of June' },
                { id: 'C', text: 'on Sunday the eighth of June' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The clean-up will take place on Saturday the seventh of June.',
                evidence: { quote: 'on Saturday the seventh of June' },
              },
            },
            {
              id: 'm15l-q14',
              number: 14,
              prompt: 'What should volunteers bring?',
              options: [
                { id: 'A', text: 'gloves and a water bottle' },
                { id: 'B', text: 'food and a tent' },
                { id: 'C', text: 'money and a camera' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Volunteers should bring gloves and a water bottle.',
                evidence: { quote: 'they should bring gloves and a water bottle' },
              },
            },
          ],
        },
        {
          id: 'm15l-g4',
          type: 'matching',
          instructions: 'What is said about each of the following? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 15–20.',
          optionsTitle: 'Features',
          options: [
            { id: 'A', text: 'It is where volunteers will collect plastic bottles and bags from the sand.' },
            { id: 'B', text: 'It is where volunteers will look for fishing nets and ropes between the rocks.' },
            { id: 'C', text: 'It is where volunteers will put all the rubbish they collect into large green bags.' },
            { id: 'D', text: 'It is where children can learn about sea animals and how plastic harms them.' },
            { id: 'E', text: 'It is where volunteers can have a free drink and a sandwich after the clean-up.' },
            { id: 'F', text: 'You should wear strong shoes there, because there are sharp shells on the beach.' },
            { id: 'G', text: 'Volunteers must pay to take part.' },
            { id: 'H', text: 'The clean-up began ten years ago.' },
          ],
          questions: [
            { id: 'm15l-q15', number: 15, prompt: 'North beach', answer: { accepted: ['A'] }, explanation: { text: 'The north beach is where volunteers will collect plastic bottles and bags from the sand.', evidence: { quote: 'where volunteers will collect plastic bottles and bags from the sand' } } },
            { id: 'm15l-q16', number: 16, prompt: 'Rock pool area', answer: { accepted: ['B'] }, explanation: { text: 'The rock pool area is where volunteers will look for fishing nets and ropes between the rocks.', evidence: { quote: 'where volunteers will look for fishing nets and ropes between the rocks' } } },
            { id: 'm15l-q17', number: 17, prompt: 'Picnic area', answer: { accepted: ['C'] }, explanation: { text: 'The picnic area is where volunteers will put all the rubbish they collect into large green bags.', evidence: { quote: 'where volunteers will put all the rubbish they collect into large green bags' } } },
            { id: 'm15l-q18', number: 18, prompt: 'Learning tent', answer: { accepted: ['D'] }, explanation: { text: 'The learning tent is where children can learn about sea animals and how plastic harms them.', evidence: { quote: 'where children can learn about sea animals and how plastic harms them' } } },
            { id: 'm15l-q19', number: 19, prompt: 'Café', answer: { accepted: ['E'] }, explanation: { text: 'The café is where volunteers can have a free drink and a sandwich after the clean-up.', evidence: { quote: 'where volunteers can have a free drink and a sandwich after the clean-up' } } },
            { id: 'm15l-q20', number: 20, prompt: 'Strong shoes', answer: { accepted: ['F'] }, explanation: { text: 'Volunteers should wear strong shoes, because there are sharp shells on the beach.', evidence: { quote: 'you should wear strong shoes, because there are sharp shells on the beach' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Two students discussing a history essay on the Romans',
      audio: {
        intro: 'Part 3. You will hear two students, Emma and Lucas, discussing a history essay on the Romans. First, you have some time to look at questions 21 to 25.',
        noun: 'discussion',
        ...rec('l3'),
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 10 },
        ],
        script: [
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Hi, Lucas. Have you started your history essay about the Romans?" },
          { speaker: 'Lucas', voice: M, accent: 'en-GB', text: "Yes, I have started the essay, Emma. I have written about Roman roads and Roman baths." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Roman roads and Roman baths. How long does the essay have to be?" },
          { speaker: 'Lucas', voice: M, accent: 'en-GB', text: "The essay has to be two thousand words long, and we have to give it to Mrs Carter on Friday." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Two thousand words. What is the most interesting thing you have found about the Romans?" },
          { speaker: 'Lucas', voice: M, accent: 'en-GB', text: "The most interesting thing is that the Romans built more than eighty thousand kilometres of roads across Europe." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Eighty thousand kilometres of roads! Did the Romans build anything else?" },
          { speaker: 'Lucas', voice: M, accent: 'en-GB', text: "Yes, the Romans also built aqueducts, which carried water to their towns and cities." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Aqueducts. How many books have you read for the essay?" },
          { speaker: 'Lucas', voice: M, accent: 'en-GB', text: "I have read three books, and I have used the library and the internet." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Three books. What will you write about next?" },
          { speaker: 'Lucas', voice: M, accent: 'en-GB', text: "Next, I will write about Roman food, because the Romans ate bread, olives and fish." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Roman food. Who else is writing an essay about the Romans?" },
          { speaker: 'Lucas', voice: M, accent: 'en-GB', text: "Sara is writing an essay about Roman houses, because she is interested in how Roman families lived." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Sara. What about the introduction? What should we put in the introduction?" },
          { speaker: 'Lucas', voice: M, accent: 'en-GB', text: "I think we should put the dates of the Roman Empire in the introduction, from 27 BC to 476 AD." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Good idea. What about the conclusion? What should we write in the conclusion?" },
          { speaker: 'Lucas', voice: M, accent: 'en-GB', text: "I think we should write that the Romans changed Europe, because their roads, laws and language are still important today." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Good. When should we finish the essay?" },
          { speaker: 'Lucas', voice: M, accent: 'en-GB', text: "We should finish the essay on Thursday, so we can check it before we give it to Mrs Carter on Friday." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Good. I will write about Roman schools on Thursday morning." },
          { speaker: 'Lucas', voice: M, accent: 'en-GB', text: "Good. And I will bring my three books to the library tomorrow." },
        ],
      },
      groups: [
        {
          id: 'm15l-g5',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm15l-q21',
              number: 21,
              prompt: 'What has Lucas written about so far?',
              options: [
                { id: 'A', text: 'Roman roads and Roman baths' },
                { id: 'B', text: 'Roman food and Roman schools' },
                { id: 'C', text: 'Roman houses and Roman laws' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Lucas has written about Roman roads and Roman baths.',
                evidence: { quote: 'I have written about Roman roads and Roman baths' },
              },
            },
            {
              id: 'm15l-q22',
              number: 22,
              prompt: 'How long does the essay have to be?',
              options: [
                { id: 'A', text: 'one thousand words' },
                { id: 'B', text: 'two thousand words' },
                { id: 'C', text: 'three thousand words' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The essay has to be two thousand words long.',
                evidence: { quote: 'two thousand words long' },
              },
            },
            {
              id: 'm15l-q23',
              number: 23,
              prompt: 'What is the most interesting thing Lucas has found about the Romans?',
              options: [
                { id: 'A', text: 'The Romans built more than eighty thousand kilometres of roads across Europe.' },
                { id: 'B', text: 'The Romans built more than eighty thousand kilometres of walls across Europe.' },
                { id: 'C', text: 'The Romans built more than eighty thousand kilometres of canals across Europe.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The Romans built more than eighty thousand kilometres of roads across Europe.',
                evidence: { quote: 'the Romans built more than eighty thousand kilometres of roads across Europe' },
              },
            },
            {
              id: 'm15l-q24',
              number: 24,
              prompt: 'What did aqueducts do?',
              options: [
                { id: 'A', text: 'They carried water to Roman towns and cities.' },
                { id: 'B', text: 'They carried food to Roman towns and cities.' },
                { id: 'C', text: 'They carried soldiers to Roman towns and cities.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Aqueducts carried water to Roman towns and cities.',
                evidence: { quote: 'aqueducts, which carried water to their towns and cities' },
              },
            },
            {
              id: 'm15l-q25',
              number: 25,
              prompt: 'How many books has Lucas read for the essay?',
              options: [
                { id: 'A', text: 'two books' },
                { id: 'B', text: 'three books' },
                { id: 'C', text: 'four books' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Lucas has read three books.',
                evidence: { quote: 'I have read three books' },
              },
            },
          ],
        },
        {
          id: 'm15l-g6',
          type: 'matching',
          instructions: 'What was agreed about each of the following? Choose FIVE answers from the box and write the correct letter, A–F, next to Questions 26–30.',
          optionsTitle: 'Decisions',
          options: [
            { id: 'A', text: 'He will write about Roman food next.' },
            { id: 'B', text: 'She is writing an essay about Roman houses.' },
            { id: 'C', text: 'They should put the dates of the Roman Empire in the introduction.' },
            { id: 'D', text: 'They should write that the Romans changed Europe in the conclusion.' },
            { id: 'E', text: 'They should finish the essay on Thursday.' },
            { id: 'F', text: 'He will bring his three books to the library tomorrow.' },
          ],
          questions: [
            { id: 'm15l-q26', number: 26, prompt: 'Lucas', answer: { accepted: ['A'] }, explanation: { text: 'Lucas will write about Roman food next.', evidence: { quote: 'I will write about Roman food' } } },
            { id: 'm15l-q27', number: 27, prompt: 'Sara', answer: { accepted: ['B'] }, explanation: { text: 'Sara is writing an essay about Roman houses.', evidence: { quote: 'Sara is writing an essay about Roman houses' } } },
            { id: 'm15l-q28', number: 28, prompt: 'Introduction', answer: { accepted: ['C'] }, explanation: { text: 'They should put the dates of the Roman Empire in the introduction.', evidence: { quote: 'we should put the dates of the Roman Empire in the introduction' } } },
            { id: 'm15l-q29', number: 29, prompt: 'Conclusion', answer: { accepted: ['D'] }, explanation: { text: 'They should write that the Romans changed Europe in the conclusion.', evidence: { quote: 'we should write that the Romans changed Europe' } } },
            { id: 'm15l-q30', number: 30, prompt: 'Finishing the essay', answer: { accepted: ['E'] }, explanation: { text: 'They should finish the essay on Thursday.', evidence: { quote: 'We should finish the essay on Thursday' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Lecture: the human immune system',
      audio: {
        intro: 'Part 4. You will hear a lecture about the human immune system. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Good morning. Today I am going to talk about the human immune system, which protects the body from illness." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "The immune system is a group of cells and organs that work together to fight germs, such as bacteria and viruses, that enter the body." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "The first part of the immune system is the skin, which stops germs from entering the body, and the second part is the white blood cells, which attack germs inside the body." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "White blood cells are made in the bone marrow, which is inside the bones, and they travel around the body in the blood." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "When germs enter the body, the white blood cells find them quickly, and they kill the germs by eating them or by making chemicals called antibodies." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Antibodies are special chemicals that stick to germs and help the white blood cells to find and kill them more easily." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "After an illness, the body remembers the germs, and if the same germs enter the body again, the body can fight them more quickly. This is called immunity." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Vaccines help the immune system in the same way: a vaccine teaches the body to recognise a germ, so the body can fight the germ before it makes a person ill." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "However, the immune system can sometimes make mistakes, and it can attack the body itself. This can cause illnesses such as diabetes and arthritis." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In conclusion, the human immune system is very important, because without it, even a small cut could cause a serious illness. That brings us to the end of the lecture." },
        ],
      },
      groups: [
        {
          id: 'm15l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'THE HUMAN IMMUNE SYSTEM\nWhat does it do?\n• the immune system protects the body from {{31}}\n• it is a group of {{32}} and organs that work together to fight germs\n• germs, such as {{33}} and viruses, enter the body\n• the skin stops germs from {{34}} the body\n• white blood cells attack germs {{35}} the body\nWhere are white blood cells made?\n• white blood cells are made in the bone {{36}}\n• they travel around the body in the {{37}}\nHow do they kill germs?\n• they kill germs by eating them or by making chemicals called {{38}}\nAfter an illness\n• the body remembers the germs. This is called {{39}}\nVaccines\n• a vaccine teaches the body to {{40}} a germ',
          questions: [
            { id: 'm15l-q31', number: 31, answer: { accepted: ['illness'] }, explanation: { text: 'The immune system protects the body from illness.', evidence: { quote: 'protects the body from illness' } } },
            { id: 'm15l-q32', number: 32, answer: { accepted: ['cells'] }, explanation: { text: 'The immune system is a group of cells and organs.', evidence: { quote: 'a group of cells and organs' } } },
            { id: 'm15l-q33', number: 33, answer: { accepted: ['bacteria'] }, explanation: { text: 'Germs include bacteria and viruses.', evidence: { quote: 'such as bacteria and viruses' } } },
            { id: 'm15l-q34', number: 34, answer: { accepted: ['entering'] }, explanation: { text: 'The skin stops germs from entering the body.', evidence: { quote: 'stops germs from entering the body' } } },
            { id: 'm15l-q35', number: 35, answer: { accepted: ['inside'] }, explanation: { text: 'White blood cells attack germs inside the body.', evidence: { quote: 'attack germs inside the body' } } },
            { id: 'm15l-q36', number: 36, answer: { accepted: ['marrow'] }, explanation: { text: 'White blood cells are made in the bone marrow.', evidence: { quote: 'made in the bone marrow' } } },
            { id: 'm15l-q37', number: 37, answer: { accepted: ['blood'] }, explanation: { text: 'White blood cells travel around the body in the blood.', evidence: { quote: 'travel around the body in the blood' } } },
            { id: 'm15l-q38', number: 38, answer: { accepted: ['antibodies'] }, explanation: { text: 'White blood cells kill germs by making chemicals called antibodies.', evidence: { quote: 'chemicals called antibodies' } } },
            { id: 'm15l-q39', number: 39, answer: { accepted: ['immunity'] }, explanation: { text: 'After an illness, the body remembers the germs. This is called immunity.', evidence: { quote: 'This is called immunity' } } },
            { id: 'm15l-q40', number: 40, answer: { accepted: ['recognise'] }, explanation: { text: 'A vaccine teaches the body to recognise a germ.', evidence: { quote: 'teaches the body to recognise a germ' } } },
          ],
        },
      ],
    },
  ],
};
