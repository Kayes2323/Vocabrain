import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 12 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material.
 */

const rec = (partId: string) => recorded('vb-mock-12', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock12Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: "Registering at a doctor's surgery by phone",
      audio: {
        intro: "Part 1. You will hear a man registering at a doctor's surgery by phone. First, you have some time to look at questions 1 to 6.",
        noun: 'conversation',
        ...rec('l1'),
        sets: [
          { questions: '1 to 6', fromLine: 0 },
          { questions: '7 to 10', fromLine: 15 },
        ],
        script: [
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Good morning, Riverside Medical Centre. This is Sarah speaking. How can I help you?" },
          { speaker: 'Mr Carter', voice: M, accent: 'en-GB', text: "Hello. I would like to register as a new patient at your surgery, please." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Of course. Could I take your full name, please?" },
          { speaker: 'Mr Carter', voice: M, accent: 'en-GB', text: "Yes, my name is James Carter." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Thank you, Mr Carter. Could I take your date of birth, please?" },
          { speaker: 'Mr Carter', voice: M, accent: 'en-GB', text: "Yes, I was born on the twelfth of March, nineteen ninety." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "The twelfth of March, nineteen ninety. And what is your address, please?" },
          { speaker: 'Mr Carter', voice: M, accent: 'en-GB', text: "I live at forty-two Oak Road, in Brighton." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Forty-two Oak Road, in Brighton. Could I take your telephone number, please?" },
          { speaker: 'Mr Carter', voice: M, accent: 'en-GB', text: "Yes, my mobile number is oh seven eight one, three four five, nine six two." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Oh seven eight one, three four five, nine six two. Thank you." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Could I ask why you would like to register with us?" },
          { speaker: 'Mr Carter', voice: M, accent: 'en-GB', text: "Yes, I have just moved to Brighton, and I would like to see a doctor about my back." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "I see. Our next appointment with a doctor is on Thursday the twentieth of November at ten o'clock in the morning." },
          { speaker: 'Mr Carter', voice: M, accent: 'en-GB', text: "Thursday the twentieth of November at ten o'clock. That is fine. Which doctor will I see?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "You will see Doctor Patel. She is our doctor for new patients." },
          { speaker: 'Mr Carter', voice: M, accent: 'en-GB', text: "Thank you. Is there anything I should bring to the appointment?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Yes, please bring your passport and a letter with your address on it, such as a bank letter." },
          { speaker: 'Mr Carter', voice: M, accent: 'en-GB', text: "A passport and a bank letter. Is there anything else I should know?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Yes, the surgery is open from eight o'clock in the morning until six o'clock in the evening, from Monday to Friday." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "If you cannot come to the appointment, please telephone us the day before." },
          { speaker: 'Mr Carter', voice: M, accent: 'en-GB', text: "Thank you very much for your help. I will see you on Thursday the twentieth of November." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "You are welcome, Mr Carter. Goodbye." },
          { speaker: 'Mr Carter', voice: M, accent: 'en-GB', text: "Goodbye." },
        ],
      },
      groups: [
        {
          id: 'm12l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 1, number: true },
          template:
            'RIVERSIDE MEDICAL CENTRE – NEW PATIENT REGISTRATION\nName: James {{1}}\nDate of birth: {{2}} March 1990\nAddress: {{3}} Oak Road, Brighton\nTelephone: {{4}}\nReason for registering: moved to Brighton and a problem with his {{5}}\nFirst appointment: {{6}} the twentieth of November',
          questions: [
            { id: 'm12l-q1', number: 1, answer: { accepted: ['Carter'] }, explanation: { text: 'His name is James Carter.', evidence: { quote: 'my name is James Carter' } } },
            { id: 'm12l-q2', number: 2, answer: { accepted: ['12', 'twelfth'] }, explanation: { text: 'He was born on the twelfth of March, nineteen ninety.', evidence: { quote: 'on the twelfth of March, nineteen ninety' } } },
            { id: 'm12l-q3', number: 3, answer: { accepted: ['42', 'forty-two'] }, explanation: { text: 'He lives at forty-two Oak Road.', evidence: { quote: 'forty-two Oak Road' } } },
            { id: 'm12l-q4', number: 4, answer: { accepted: ['0781345962'] }, explanation: { text: 'His mobile number is oh seven eight one, three four five, nine six two.', evidence: { quote: 'oh seven eight one, three four five, nine six two' } } },
            { id: 'm12l-q5', number: 5, answer: { accepted: ['back'] }, explanation: { text: 'He would like to see a doctor about his back.', evidence: { quote: 'about my back' } } },
            { id: 'm12l-q6', number: 6, answer: { accepted: ['Thursday'] }, explanation: { text: 'The next appointment is on Thursday the twentieth of November.', evidence: { quote: 'on Thursday the twentieth of November' } } },
          ],
        },
        {
          id: 'm12l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm12l-q7',
              number: 7,
              prompt: 'Which doctor will Mr Carter see?',
              options: [
                { id: 'A', text: 'Doctor Patel' },
                { id: 'B', text: 'Doctor Smith' },
                { id: 'C', text: 'Doctor Lee' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Mr Carter will see Doctor Patel.',
                evidence: { quote: 'You will see Doctor Patel' },
              },
            },
            {
              id: 'm12l-q8',
              number: 8,
              prompt: 'What should Mr Carter bring to the appointment?',
              options: [
                { id: 'A', text: 'his passport and a bank letter' },
                { id: 'B', text: 'his driving licence and a photograph' },
                { id: 'C', text: 'his old medical records' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'He should bring his passport and a letter with his address on it, such as a bank letter.',
                evidence: { quote: 'please bring your passport and a letter with your address on it, such as a bank letter' },
              },
            },
            {
              id: 'm12l-q9',
              number: 9,
              prompt: 'When is the surgery open?',
              options: [
                { id: 'A', text: 'from eight o\'clock in the morning until six o\'clock in the evening' },
                { id: 'B', text: 'from nine o\'clock in the morning until five o\'clock in the evening' },
                { id: 'C', text: 'from eight o\'clock in the morning until eight o\'clock in the evening' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The surgery is open from eight o\'clock in the morning until six o\'clock in the evening.',
                evidence: { quote: 'open from eight o\'clock in the morning until six o\'clock in the evening' },
              },
            },
            {
              id: 'm12l-q10',
              number: 10,
              prompt: 'What should Mr Carter do if he cannot come to the appointment?',
              options: [
                { id: 'A', text: 'telephone the surgery the day before' },
                { id: 'B', text: 'send an email on the day of the appointment' },
                { id: 'C', text: 'come to the surgery the next week' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'If he cannot come, he should telephone the surgery the day before.',
                evidence: { quote: 'please telephone us the day before' },
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
      title: 'Talk about a cycling event',
      audio: {
        intro: 'Part 2. You will hear the organiser of a cycling event talking to visitors. First, you have some time to look at questions 11 to 14.',
        noun: 'talk',
        ...rec('l2'),
        sets: [
          { questions: '11 to 14', fromLine: 0 },
          { questions: '15 to 20', fromLine: 4 },
        ],
        script: [
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "Good morning, everyone, and welcome to the City Cycle Festival. My name is Laura, and I am the organiser of the festival." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "The festival will take place on Saturday the twenty-first of June, and more than two thousand people are expected to take part." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "There are three rides to choose from: a ten-kilometre ride for families, a forty-kilometre ride for regular cyclists, and a one-hundred-kilometre ride for experienced cyclists." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "Entry costs fifteen pounds for adults, and children under sixteen can take part for free." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "All the rides will start at the Market Square, and the first ride will leave at nine o'clock in the morning." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "Before your ride begins, you can collect your number and your festival bag at the registration tent." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "The ten-kilometre ride will go through the park, and it will finish at the Market Square." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "The forty-kilometre ride will go through the park and along the river, and it will finish at the Riverside Park." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "The one-hundred-kilometre ride will go through the park, along the river and over the hills, and it will finish at the Riverside Park." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "After the rides, there will be food stalls and music in Riverside Park, and every rider who finishes a ride will receive a medal." },
          { speaker: 'Organiser', voice: W, accent: 'en-AU', text: "If you would like to take part, please sign up on our website before the tenth of June. Thank you, and I hope to see you there." },
        ],
      },
      groups: [
        {
          id: 'm12l-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm12l-q11',
              number: 11,
              prompt: 'When will the City Cycle Festival take place?',
              options: [
                { id: 'A', text: 'on Saturday the twenty-first of June' },
                { id: 'B', text: 'on Sunday the twenty-second of June' },
                { id: 'C', text: 'on Saturday the fourteenth of June' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The festival will take place on Saturday the twenty-first of June.',
                evidence: { quote: 'will take place on Saturday the twenty-first of June' },
              },
            },
            {
              id: 'm12l-q12',
              number: 12,
              prompt: 'How many people are expected to take part in the festival?',
              options: [
                { id: 'A', text: 'more than one thousand people' },
                { id: 'B', text: 'more than two thousand people' },
                { id: 'C', text: 'more than three thousand people' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'More than two thousand people are expected to take part.',
                evidence: { quote: 'more than two thousand people are expected to take part' },
              },
            },
            {
              id: 'm12l-q13',
              number: 13,
              prompt: 'How long is the ride for experienced cyclists?',
              options: [
                { id: 'A', text: 'ten kilometres' },
                { id: 'B', text: 'forty kilometres' },
                { id: 'C', text: 'one-hundred kilometres' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'The ride for experienced cyclists is one-hundred kilometres long.',
                evidence: { quote: 'a one-hundred-kilometre ride for experienced cyclists' },
              },
            },
            {
              id: 'm12l-q14',
              number: 14,
              prompt: 'How much does entry cost for adults?',
              options: [
                { id: 'A', text: 'ten pounds' },
                { id: 'B', text: 'fifteen pounds' },
                { id: 'C', text: 'twenty pounds' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Entry costs fifteen pounds for adults.',
                evidence: { quote: 'Entry costs fifteen pounds for adults' },
              },
            },
          ],
        },
        {
          id: 'm12l-g4',
          type: 'matching',
          instructions: 'What is said about each of the following? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 15–20.',
          optionsTitle: 'Features',
          options: [
            { id: 'A', text: 'It goes through the park and finishes at the Market Square.' },
            { id: 'B', text: 'It goes through the park and along the river and finishes at Riverside Park.' },
            { id: 'C', text: 'It goes through the park, along the river and over the hills and finishes at Riverside Park.' },
            { id: 'D', text: 'Riders can collect their number and their festival bag there.' },
            { id: 'E', text: 'There will be food stalls and music there after the rides.' },
            { id: 'F', text: 'It is where all the rides will start.' },
            { id: 'G', text: 'It costs fifteen pounds for adults to enter.' },
            { id: 'H', text: 'It will take place on Saturday the twenty-first of June.' },
          ],
          questions: [
            { id: 'm12l-q15', number: 15, prompt: 'Ten-kilometre ride', answer: { accepted: ['A'] }, explanation: { text: 'The ten-kilometre ride will go through the park, and it will finish at the Market Square.', evidence: { quote: 'will go through the park, and it will finish at the Market Square' } } },
            { id: 'm12l-q16', number: 16, prompt: 'Forty-kilometre ride', answer: { accepted: ['B'] }, explanation: { text: 'The forty-kilometre ride will go through the park and along the river, and it will finish at the Riverside Park.', evidence: { quote: 'will go through the park and along the river, and it will finish at the Riverside Park' } } },
            { id: 'm12l-q17', number: 17, prompt: 'One-hundred-kilometre ride', answer: { accepted: ['C'] }, explanation: { text: 'The one-hundred-kilometre ride will go through the park, along the river and over the hills, and it will finish at the Riverside Park.', evidence: { quote: 'will go through the park, along the river and over the hills, and it will finish at the Riverside Park' } } },
            { id: 'm12l-q18', number: 18, prompt: 'Market Square', answer: { accepted: ['F'] }, explanation: { text: 'All the rides will start at the Market Square.', evidence: { quote: 'All the rides will start at the Market Square' } } },
            { id: 'm12l-q19', number: 19, prompt: 'Registration tent', answer: { accepted: ['D'] }, explanation: { text: 'Riders can collect their number and their festival bag at the registration tent.', evidence: { quote: 'you can collect your number and your festival bag at the registration tent' } } },
            { id: 'm12l-q20', number: 20, prompt: 'Riverside Park', answer: { accepted: ['E'] }, explanation: { text: 'After the rides, there will be food stalls and music in Riverside Park.', evidence: { quote: 'there will be food stalls and music in Riverside Park' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Two students planning a student magazine',
      audio: {
        intro: 'Part 3. You will hear two students, Sophie and Ben, planning a student magazine. First, you have some time to look at questions 21 to 25.',
        noun: 'discussion',
        ...rec('l3'),
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 10 },
        ],
        script: [
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Hi, Ben. Have you thought about our plan for the new student magazine?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "Yes, I have. I think we should print two hundred copies of the first issue." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Two hundred copies. When should the first issue come out?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "I think it should come out on the first of October, at the start of the new term." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "The first of October. What should we put in the magazine?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "I think we should have news about the college, sports results, and interviews with teachers." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Interviews with teachers is a good idea. Who should we interview first?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "We could interview Mrs Green, the head of the English department, because she is leaving at the end of this term." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Mrs Green is a good choice. How much should the magazine cost?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "I think it should cost one pound, so that most students can afford to buy it." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "One pound is a good price. Who should be the editor of the magazine?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "I think you should be the editor, Sophie, because you are good at writing." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Thank you. What about the photographs? Who should take them?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "I think Tom should take the photographs, because he has a good camera." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Good idea. We need to meet again next week to talk about the articles." },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "Yes, we should meet on Tuesday the sixteenth of September, after our morning classes." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Tuesday the sixteenth of September. What should we do first at the meeting?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "First, I will show everyone the list of articles for the first issue." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Good. I will bring the list of students who want to write for the magazine." },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "And Mia can design the front page of the magazine." },
        ],
      },
      groups: [
        {
          id: 'm12l-g5',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm12l-q21',
              number: 21,
              prompt: 'How many copies of the first issue should they print?',
              options: [
                { id: 'A', text: 'one hundred copies' },
                { id: 'B', text: 'two hundred copies' },
                { id: 'C', text: 'three hundred copies' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Ben thinks they should print two hundred copies of the first issue.',
                evidence: { quote: 'print two hundred copies of the first issue' },
              },
            },
            {
              id: 'm12l-q22',
              number: 22,
              prompt: 'When should the first issue come out?',
              options: [
                { id: 'A', text: 'on the first of September' },
                { id: 'B', text: 'on the first of October' },
                { id: 'C', text: 'on the first of November' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The first issue should come out on the first of October.',
                evidence: { quote: 'come out on the first of October' },
              },
            },
            {
              id: 'm12l-q23',
              number: 23,
              prompt: 'What should the magazine include?',
              options: [
                { id: 'A', text: 'news about the college, sports results, and interviews with teachers' },
                { id: 'B', text: 'news about the town, recipes, and jokes' },
                { id: 'C', text: 'advertisements, comics, and puzzles' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The magazine should have news about the college, sports results, and interviews with teachers.',
                evidence: { quote: 'news about the college, sports results, and interviews with teachers' },
              },
            },
            {
              id: 'm12l-q24',
              number: 24,
              prompt: 'Who should they interview first?',
              options: [
                { id: 'A', text: 'Mrs Green' },
                { id: 'B', text: 'Mr Brown' },
                { id: 'C', text: 'Miss White' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'They could interview Mrs Green, the head of the English department.',
                evidence: { quote: 'interview Mrs Green' },
              },
            },
            {
              id: 'm12l-q25',
              number: 25,
              prompt: 'How much should the magazine cost?',
              options: [
                { id: 'A', text: 'fifty pence' },
                { id: 'B', text: 'one pound' },
                { id: 'C', text: 'two pounds' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The magazine should cost one pound.',
                evidence: { quote: 'it should cost one pound' },
              },
            },
          ],
        },
        {
          id: 'm12l-g6',
          type: 'matching',
          instructions: 'What was agreed about each part of the magazine plan? Choose FIVE answers from the box and write the correct letter, A–F, next to Questions 26–30.',
          optionsTitle: 'Decisions',
          options: [
            { id: 'A', text: 'She will be the editor of the magazine.' },
            { id: 'B', text: 'He will take the photographs for the magazine.' },
            { id: 'C', text: 'She will design the front page of the magazine.' },
            { id: 'D', text: 'He will show everyone the list of articles for the first issue.' },
            { id: 'E', text: 'It will be on Tuesday the sixteenth of September.' },
            { id: 'F', text: 'She will write about sports results.' },
          ],
          questions: [
            { id: 'm12l-q26', number: 26, prompt: 'Sophie', answer: { accepted: ['A'] }, explanation: { text: 'Sophie should be the editor of the magazine.', evidence: { quote: 'you should be the editor' } } },
            { id: 'm12l-q27', number: 27, prompt: 'Ben', answer: { accepted: ['D'] }, explanation: { text: 'Ben will show everyone the list of articles for the first issue.', evidence: { quote: 'I will show everyone the list of articles for the first issue' } } },
            { id: 'm12l-q28', number: 28, prompt: 'Tom', answer: { accepted: ['B'] }, explanation: { text: 'Tom should take the photographs for the magazine.', evidence: { quote: 'Tom should take the photographs' } } },
            { id: 'm12l-q29', number: 29, prompt: 'Mia', answer: { accepted: ['C'] }, explanation: { text: 'Mia can design the front page of the magazine.', evidence: { quote: 'Mia can design the front page' } } },
            { id: 'm12l-q30', number: 30, prompt: 'The meeting', answer: { accepted: ['E'] }, explanation: { text: 'The students should meet on Tuesday the sixteenth of September.', evidence: { quote: 'meet on Tuesday the sixteenth of September' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Lecture: the history of medicine',
      audio: {
        intro: 'Part 4. You will hear a lecture about the history of medicine. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Good morning. Today I am going to talk about the history of medicine: how people treated illness in the past, and how medicine has changed over time." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "A long time ago, people believed that illness was caused by bad spirits, and they tried to make sick people better with songs, dances and special plants." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In ancient Egypt, about four thousand years ago, doctors wrote down their treatments on paper made from plants, which we now call papyrus." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In ancient Greece, a doctor called Hippocrates said that illness was caused by natural things, not by bad spirits, and he wrote about the importance of clean water and good food." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In the Middle Ages, in Europe, many sick people went to hospitals run by the church, and the people who looked after them were often monks and nuns." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In the nineteenth century, a nurse called Florence Nightingale showed that hospitals must be clean, and she said that fresh air and clean water help sick people to get better." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "At about the same time, a scientist called Louis Pasteur showed that tiny living things, which we call germs, can cause illness." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Later, in 1928, a scientist called Alexander Fleming found penicillin, the first antibiotic, which can kill the germs that cause illness." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In the twentieth century, doctors also found ways to stop illness before it starts, and today, millions of children are given vaccines to protect them from diseases such as measles." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In conclusion, medicine has changed a great deal over thousands of years, but one thing has not changed: doctors and nurses still want to help sick people to get better. That brings us to the end of the lecture." },
        ],
      },
      groups: [
        {
          id: 'm12l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'HISTORY OF MEDICINE\nEarly ideas about illness\n• a long time ago, people believed that illness was caused by bad {{31}}\n• in ancient Egypt, doctors wrote down their treatments on {{32}} made from plants\nHippocrates\n• Hippocrates said that illness was caused by {{33}} things, not by bad spirits\n• he wrote about the importance of clean water and good {{34}}\nMedicine in the Middle Ages\n• many sick people went to hospitals run by the {{35}}\n• the people who looked after them were often monks and {{36}}\nMedicine in the nineteenth century\n• Florence Nightingale showed that hospitals must be {{37}}\n• Louis Pasteur showed that tiny living things, called {{38}}, can cause illness\nMedicine in the twentieth century\n• Alexander Fleming found {{39}}, the first antibiotic\n• today, millions of children are given {{40}} to protect them from diseases',
          questions: [
            { id: 'm12l-q31', number: 31, answer: { accepted: ['spirits'] }, explanation: { text: 'A long time ago, people believed that illness was caused by bad spirits.', evidence: { quote: 'caused by bad spirits' } } },
            { id: 'm12l-q32', number: 32, answer: { accepted: ['papyrus'] }, explanation: { text: 'In ancient Egypt, doctors wrote down their treatments on paper made from plants, which we now call papyrus.', evidence: { quote: 'which we now call papyrus' } } },
            { id: 'm12l-q33', number: 33, answer: { accepted: ['natural'] }, explanation: { text: 'Hippocrates said that illness was caused by natural things.', evidence: { quote: 'caused by natural things' } } },
            { id: 'm12l-q34', number: 34, answer: { accepted: ['food'] }, explanation: { text: 'Hippocrates wrote about the importance of clean water and good food.', evidence: { quote: 'clean water and good food' } } },
            { id: 'm12l-q35', number: 35, answer: { accepted: ['church'] }, explanation: { text: 'Many sick people went to hospitals run by the church.', evidence: { quote: 'hospitals run by the church' } } },
            { id: 'm12l-q36', number: 36, answer: { accepted: ['nuns'] }, explanation: { text: 'The people who looked after them were often monks and nuns.', evidence: { quote: 'monks and nuns' } } },
            { id: 'm12l-q37', number: 37, answer: { accepted: ['clean'] }, explanation: { text: 'Florence Nightingale showed that hospitals must be clean.', evidence: { quote: 'hospitals must be clean' } } },
            { id: 'm12l-q38', number: 38, answer: { accepted: ['germs'] }, explanation: { text: 'Louis Pasteur showed that tiny living things, called germs, can cause illness.', evidence: { quote: 'which we call germs' } } },
            { id: 'm12l-q39', number: 39, answer: { accepted: ['penicillin'] }, explanation: { text: 'Alexander Fleming found penicillin, the first antibiotic.', evidence: { quote: 'found penicillin, the first antibiotic' } } },
            { id: 'm12l-q40', number: 40, answer: { accepted: ['vaccines'] }, explanation: { text: 'Today, millions of children are given vaccines to protect them from diseases.', evidence: { quote: 'are given vaccines' } } },
          ],
        },
      ],
    },
  ],
};
