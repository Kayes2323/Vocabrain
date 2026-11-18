import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 7 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material.
 */

const rec = (partId: string) => recorded('vb-mock-7', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock7Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Reporting a lost wallet at a hotel reception',
      audio: {
        intro: 'Part 1. You will hear a man reporting a lost wallet at a hotel reception. First, you have some time to look at questions 1 to 6.',
        noun: 'conversation',
        ...rec('l1'),
        // Questions 1–6 are answered by line 15; the break comes before the guest is asked where he is now.
        sets: [
          { questions: '1 to 6', fromLine: 0 },
          { questions: '7 to 10', fromLine: 16 },
        ],
        script: [
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Good afternoon, Seaview Hotel reception. This is Emma speaking. How can I help you?" },
          { speaker: 'Collins', voice: M, accent: 'en-GB', text: "Hello. I think I left my wallet in my room this morning, and I would like to report it lost." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "I am sorry to hear that. Could I take your name, please?" },
          { speaker: 'Collins', voice: M, accent: 'en-GB', text: "Yes, it is James Collins." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Could you spell your surname for me, please?" },
          { speaker: 'Collins', voice: M, accent: 'en-GB', text: "Sure. C, O, L, L, I, N, S." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "What room number were you staying in?" },
          { speaker: 'Collins', voice: M, accent: 'en-GB', text: "I was in room two one four." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Room two one four. And when did you last see the wallet?" },
          { speaker: 'Collins', voice: M, accent: 'en-GB', text: "I last saw it at breakfast, at about eight o'clock this morning." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "At breakfast. Can you describe the wallet, please?" },
          { speaker: 'Collins', voice: M, accent: 'en-GB', text: "Yes, it is a black leather wallet, with a small silver zip on the front." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "A black leather wallet with a silver zip. What was inside it?" },
          { speaker: 'Collins', voice: M, accent: 'en-GB', text: "There were some banknotes, about fifty pounds, and my driving licence." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Thank you. I will check with housekeeping and call you back. What is the best telephone number to reach you on?" },
          { speaker: 'Collins', voice: M, accent: 'en-GB', text: "My mobile number is oh seven nine double six, three two one, eight nine five." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Oh seven nine double six, three two one, eight nine five. And where are you now?" },
          { speaker: 'Collins', voice: M, accent: 'en-GB', text: "I am at the railway station, waiting for a train to London." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "I see. If we find the wallet, we can send it to your home address. Could you give me that, please?" },
          { speaker: 'Collins', voice: M, accent: 'en-GB', text: "Yes, it is eighteen Park Road, Oxford." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Eighteen Park Road, Oxford. Is there anything else I can do for you?" },
          { speaker: 'Collins', voice: M, accent: 'en-GB', text: "Yes. How long would it take for the wallet to reach me, if you find it?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "We usually send lost items by post, and they arrive in two or three days." },
          { speaker: 'Collins', voice: M, accent: 'en-GB', text: "That is good. Is there a charge for sending it?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "No, there is no charge. We send lost items free of charge." },
          { speaker: 'Collins', voice: M, accent: 'en-GB', text: "Thank you very much for your help." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "You are welcome, Mr Collins. I will call you as soon as we have any news. Goodbye." },
          { speaker: 'Collins', voice: M, accent: 'en-GB', text: "Goodbye." },
        ],
      },
      groups: [
        {
          id: 'm7l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 1, number: true },
          template:
            'SEAVIEW HOTEL – LOST PROPERTY FORM\nName: James {{1}}\nRoom number: {{2}}\nLast seen: at {{3}}\nWallet: {{4}} leather wallet\nMoney inside: about £{{5}}\nTelephone number: {{6}}',
          questions: [
            { id: 'm7l-q1', number: 1, answer: { accepted: ['Collins'] }, explanation: { text: 'The surname is spelled out: C-O-L-L-I-N-S.', evidence: { quote: 'C, O, L, L, I, N, S.' } } },
            { id: 'm7l-q2', number: 2, answer: { accepted: ['214', 'two one four'] }, explanation: { text: 'James Collins was staying in room two one four.', evidence: { quote: 'I was in room two one four.' } } },
            { id: 'm7l-q3', number: 3, answer: { accepted: ['breakfast'] }, explanation: { text: 'He last saw the wallet at breakfast.', evidence: { quote: 'I last saw it at breakfast' } } },
            { id: 'm7l-q4', number: 4, answer: { accepted: ['black'] }, explanation: { text: 'The wallet is a black leather wallet.', evidence: { quote: 'it is a black leather wallet' } } },
            { id: 'm7l-q5', number: 5, answer: { accepted: ['50', 'fifty'] }, explanation: { text: 'There were about fifty pounds inside the wallet.', evidence: { quote: 'about fifty pounds' } } },
            { id: 'm7l-q6', number: 6, answer: { accepted: ['07966321895', '07966 321895'] }, explanation: { text: 'The telephone number is read out digit by digit: 07966 321895.', evidence: { quote: 'oh seven nine double six, three two one, eight nine five' } } },
          ],
        },
        {
          id: 'm7l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm7l-q7',
              number: 7,
              prompt: 'Where is Mr Collins now?',
              options: [
                { id: 'A', text: 'at the hotel' },
                { id: 'B', text: 'at the railway station' },
                { id: 'C', text: 'at home in Oxford' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Mr Collins is at the railway station, waiting for a train to London.',
                evidence: { quote: 'I am at the railway station, waiting for a train to London.' },
              },
            },
            {
              id: 'm7l-q8',
              number: 8,
              prompt: 'What is Mr Collins’s home address?',
              options: [
                { id: 'A', text: 'eighteen Park Road, Oxford' },
                { id: 'B', text: 'eighty Park Road, Oxford' },
                { id: 'C', text: 'eighteen Park Road, London' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'His home address is eighteen Park Road, Oxford.',
                evidence: { quote: 'it is eighteen Park Road, Oxford.' },
              },
            },
            {
              id: 'm7l-q9',
              number: 9,
              prompt: 'How long would it take for the wallet to reach Mr Collins by post?',
              options: [
                { id: 'A', text: 'one day' },
                { id: 'B', text: 'two or three days' },
                { id: 'C', text: 'a week' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Lost items sent by post arrive in two or three days.',
                evidence: { quote: 'they arrive in two or three days' },
              },
            },
            {
              id: 'm7l-q10',
              number: 10,
              prompt: 'What is said about the charge for sending a lost item?',
              options: [
                { id: 'A', text: 'There is no charge.' },
                { id: 'B', text: 'It costs five pounds.' },
                { id: 'C', text: 'It costs ten pounds.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'There is no charge for sending lost items.',
                evidence: { quote: 'there is no charge' },
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
      title: 'Talk at a museum of science',
      audio: {
        intro: 'Part 2. You will hear a guide talking to visitors at a museum of science. First, you have some time to look at questions 11 to 14.',
        noun: 'talk',
        ...rec('l2'),
        // Questions 11–14 are answered by line 4; the break comes before the galleries are described.
        sets: [
          { questions: '11 to 14', fromLine: 0 },
          { questions: '15 to 20', fromLine: 5 },
        ],
        script: [
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Good morning, everyone, and welcome to the City Museum of Science. My name is Laura, and I will be your guide today." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "The museum first opened in nineteen sixty-five, and it now has more than forty thousand objects in its collection." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "The museum is open every day from ten o'clock in the morning until six o'clock in the evening." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Entry to the museum is free, but there is a charge of five pounds for special exhibitions." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Photographs may be taken in most parts of the museum, but please do not use a flash." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Our first gallery is the gallery of transport, where you can see old trains, cars and bicycles." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Next is the gallery of space, where there is a model of the Moon and a real spacesuit worn by an astronaut." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Then there is the gallery of the human body, where you can learn how the heart and the lungs work." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "After that, you can visit the gallery of energy, where you can try simple experiments with wind and water power." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "The gallery of computers is next, and it shows how computers have changed since the nineteen seventies." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Finally, the museum cafe serves hot and cold drinks, and it has a view of the river." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "That is the end of my talk. If you have any questions, please come and find me at the information desk. Thank you, and enjoy your visit." },
        ],
      },
      groups: [
        {
          id: 'm7l-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm7l-q11',
              number: 11,
              prompt: 'When did the museum first open?',
              options: [
                { id: 'A', text: 'in 1955' },
                { id: 'B', text: 'in 1965' },
                { id: 'C', text: 'in 1975' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The museum first opened in nineteen sixty-five.',
                evidence: { quote: 'The museum first opened in nineteen sixty-five' },
              },
            },
            {
              id: 'm7l-q12',
              number: 12,
              prompt: 'How many objects are there in the museum’s collection?',
              options: [
                { id: 'A', text: 'about four thousand objects' },
                { id: 'B', text: 'about forty thousand objects' },
                { id: 'C', text: 'more than forty thousand objects' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'The museum now has more than forty thousand objects in its collection.',
                evidence: { quote: 'more than forty thousand objects in its collection' },
              },
            },
            {
              id: 'm7l-q13',
              number: 13,
              prompt: 'What time does the museum close in the evening?',
              options: [
                { id: 'A', text: 'at five o’clock' },
                { id: 'B', text: 'at six o’clock' },
                { id: 'C', text: 'at seven o’clock' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The museum is open until six o’clock in the evening.',
                evidence: { quote: "until six o'clock in the evening" },
              },
            },
            {
              id: 'm7l-q14',
              number: 14,
              prompt: 'What is the charge for special exhibitions?',
              options: [
                { id: 'A', text: 'three pounds' },
                { id: 'B', text: 'five pounds' },
                { id: 'C', text: 'ten pounds' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'There is a charge of five pounds for special exhibitions.',
                evidence: { quote: 'there is a charge of five pounds for special exhibitions' },
              },
            },
          ],
        },
        {
          id: 'm7l-g4',
          type: 'matching',
          instructions: 'What is said about each of the following places in the museum? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 15–20.',
          optionsTitle: 'Features',
          options: [
            { id: 'A', text: 'Visitors can see old trains, cars and bicycles.' },
            { id: 'B', text: 'There is a model of the Moon and a real spacesuit.' },
            { id: 'C', text: 'Visitors can learn how the heart and the lungs work.' },
            { id: 'D', text: 'Visitors can try simple experiments with wind and water power.' },
            { id: 'E', text: 'It shows how computers have changed since the nineteen seventies.' },
            { id: 'F', text: 'It has a view of the river.' },
            { id: 'G', text: 'It sells books about science.' },
            { id: 'H', text: 'It is closed on Mondays.' },
          ],
          questions: [
            { id: 'm7l-q15', number: 15, prompt: 'Gallery of transport', answer: { accepted: ['A'] }, explanation: { text: 'In the gallery of transport you can see old trains, cars and bicycles.', evidence: { quote: 'you can see old trains, cars and bicycles' } } },
            { id: 'm7l-q16', number: 16, prompt: 'Gallery of space', answer: { accepted: ['B'] }, explanation: { text: 'In the gallery of space there is a model of the Moon and a real spacesuit worn by an astronaut.', evidence: { quote: 'a model of the Moon and a real spacesuit' } } },
            { id: 'm7l-q17', number: 17, prompt: 'Gallery of the human body', answer: { accepted: ['C'] }, explanation: { text: 'In the gallery of the human body you can learn how the heart and the lungs work.', evidence: { quote: 'how the heart and the lungs work' } } },
            { id: 'm7l-q18', number: 18, prompt: 'Gallery of energy', answer: { accepted: ['D'] }, explanation: { text: 'In the gallery of energy you can try simple experiments with wind and water power.', evidence: { quote: 'simple experiments with wind and water power' } } },
            { id: 'm7l-q19', number: 19, prompt: 'Gallery of computers', answer: { accepted: ['E'] }, explanation: { text: 'The gallery of computers shows how computers have changed since the nineteen seventies.', evidence: { quote: 'how computers have changed since the nineteen seventies' } } },
            { id: 'm7l-q20', number: 20, prompt: 'Museum cafe', answer: { accepted: ['F'] }, explanation: { text: 'The museum cafe has a view of the river.', evidence: { quote: 'it has a view of the river' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Two students planning a group assignment on renewable energy',
      audio: {
        intro: 'Part 3. You will hear two students, Emma and Liam, planning a group assignment on renewable energy. First, you have some time to look at questions 21 to 25.',
        noun: 'discussion',
        ...rec('l3'),
        // Questions 21–25 are answered by line 10; the break comes before the students divide up the work.
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 11 },
        ],
        script: [
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Hi, Liam. Shall we start planning our group assignment on renewable energy? It is due in three weeks." },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "Good idea. First, what should our topic be? I think we should write about wind power." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Wind power sounds interesting, but many other groups will choose it. What about solar power instead?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "Solar power is a good idea. It is popular in many countries, and there is a lot of information about it." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Which countries should we look at? I think we should compare Spain and Germany." },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "That sounds good. Spain has a lot of sunshine, and Germany has built many solar panels." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "How long should the assignment be? Our tutor said it should be about two thousand words." },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "Two thousand words. How many people are in our group?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "There are four people in our group, so each person should write about five hundred words." },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "Five hundred words each. When should we meet again to check our work?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "I think we should meet again next Tuesday, in the library, at two o'clock." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Now, who will do what? I think I will write about the history of solar power." },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "Good. I will write about how solar panels work, and I will find some pictures for the assignment." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "What about Maria? I think she should write about the cost of solar power." },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "Yes, and Tom can write about the future of solar power, and he can check our spelling at the end." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Perfect. How shall we share our work? I think we should use a shared document online." },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "Good idea. I will set up the document today and send the link to everyone in the group." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "That sounds good. Let's finish the first part of our work by next Tuesday." },
        ],
      },
      groups: [
        {
          id: 'm7l-g5',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm7l-q21',
              number: 21,
              prompt: 'What topic will the students write about?',
              options: [
                { id: 'A', text: 'wind power' },
                { id: 'B', text: 'solar power' },
                { id: 'C', text: 'water power' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The students decide to write about solar power instead of wind power.',
                evidence: { quote: 'What about solar power instead?' },
              },
            },
            {
              id: 'm7l-q22',
              number: 22,
              prompt: 'Which countries will the students compare?',
              options: [
                { id: 'A', text: 'Spain and Germany' },
                { id: 'B', text: 'Spain and France' },
                { id: 'C', text: 'Germany and Italy' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The students will compare Spain and Germany.',
                evidence: { quote: 'we should compare Spain and Germany' },
              },
            },
            {
              id: 'm7l-q23',
              number: 23,
              prompt: 'How long should the assignment be?',
              options: [
                { id: 'A', text: 'about one thousand words' },
                { id: 'B', text: 'about two thousand words' },
                { id: 'C', text: 'about three thousand words' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The assignment should be about two thousand words.',
                evidence: { quote: 'it should be about two thousand words' },
              },
            },
            {
              id: 'm7l-q24',
              number: 24,
              prompt: 'How many people are in the students’ group?',
              options: [
                { id: 'A', text: 'three people' },
                { id: 'B', text: 'four people' },
                { id: 'C', text: 'five people' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'There are four people in the group.',
                evidence: { quote: 'There are four people in our group' },
              },
            },
            {
              id: 'm7l-q25',
              number: 25,
              prompt: 'When will the students meet again?',
              options: [
                { id: 'A', text: 'next Monday' },
                { id: 'B', text: 'next Tuesday' },
                { id: 'C', text: 'next Wednesday' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The students will meet again next Tuesday, in the library, at two o’clock.',
                evidence: { quote: 'we should meet again next Tuesday' },
              },
            },
          ],
        },
        {
          id: 'm7l-g6',
          type: 'matching',
          instructions: 'What was agreed about each part of the assignment? Choose FIVE answers from the box and write the correct letter, A–F, next to Questions 26–30.',
          optionsTitle: 'Decisions',
          options: [
            { id: 'A', text: 'She will write about the history of solar power.' },
            { id: 'B', text: 'He will write about how solar panels work and find some pictures.' },
            { id: 'C', text: 'She will write about the cost of solar power.' },
            { id: 'D', text: 'He will write about the future of solar power and check the spelling.' },
            { id: 'E', text: 'He will set up a shared document online.' },
            { id: 'F', text: 'She will write about wind power.' },
          ],
          questions: [
            { id: 'm7l-q26', number: 26, prompt: 'Emma', answer: { accepted: ['A'] }, explanation: { text: 'Emma will write about the history of solar power.', evidence: { quote: 'I will write about the history of solar power' } } },
            { id: 'm7l-q27', number: 27, prompt: 'Liam', answer: { accepted: ['B'] }, explanation: { text: 'Liam will write about how solar panels work and find some pictures.', evidence: { quote: 'I will write about how solar panels work' } } },
            { id: 'm7l-q28', number: 28, prompt: 'Maria', answer: { accepted: ['C'] }, explanation: { text: 'Maria will write about the cost of solar power.', evidence: { quote: 'she should write about the cost of solar power' } } },
            { id: 'm7l-q29', number: 29, prompt: 'Tom', answer: { accepted: ['D'] }, explanation: { text: 'Tom will write about the future of solar power and check the spelling.', evidence: { quote: 'Tom can write about the future of solar power' } } },
            { id: 'm7l-q30', number: 30, prompt: 'sharing the work', answer: { accepted: ['E'] }, explanation: { text: 'Liam will set up a shared document online and send the link to everyone.', evidence: { quote: 'I will set up the document today' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Lecture: the human brain and memory',
      audio: {
        intro: 'Part 4. You will hear a lecture about the human brain and memory. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Good morning. Today I am going to talk about the human brain and memory — how we remember things, and why we sometimes forget them." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "The human brain weighs about one point four kilograms, and it has around eighty-six billion nerve cells, which are called neurons." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "When we learn something new, the neurons in our brain form new connections, and the more we practise, the stronger these connections become." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "There are two main kinds of memory. Short-term memory holds information for a short time, usually for about twenty seconds." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Long-term memory can hold information for many years, even for a whole lifetime." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "One reason we forget things is that new information can push out old information, especially when we learn many things in a short time." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Sleep also plays an important part in memory. During sleep, the brain moves information from short-term memory into long-term memory." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Scientists have found that people who sleep for eight hours remember more than people who sleep for only five hours." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Another way to improve your memory is to test yourself. Trying to remember something is more useful than reading it again and again." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In the future, scientists hope to find new ways to help people with memory problems, so that fewer people suffer from losing their memories. That brings us to the end of the lecture." },
        ],
      },
      groups: [
        {
          id: 'm7l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'THE HUMAN BRAIN AND MEMORY\nThe brain\n• the brain weighs about {{31}} kilograms\n• the brain has around eighty-six billion nerve cells, called {{32}}\n• when we {{33}} something new, the neurons form new connections\nKinds of memory\n• short-term memory holds information for about {{34}} seconds\n• long-term memory can hold information for a whole {{35}}\nWhy we forget\n• new information can push out {{36}} information\n• during sleep, the brain moves information into {{37}} memory\n• people who sleep for {{38}} hours remember more\nImproving memory\n• trying to remember something is more useful than {{39}} it again\n• scientists hope to help people with memory problems, so fewer people suffer from losing their {{40}}',
          questions: [
            { id: 'm7l-q31', number: 31, answer: { accepted: ['1.4'] }, explanation: { text: 'The human brain weighs about one point four kilograms.', evidence: { quote: 'weighs about one point four kilograms' } } },
            { id: 'm7l-q32', number: 32, answer: { accepted: ['neurons'] }, explanation: { text: 'The nerve cells are called neurons.', evidence: { quote: 'which are called neurons' } } },
            { id: 'm7l-q33', number: 33, answer: { accepted: ['learn'] }, explanation: { text: 'When we learn something new, the neurons form new connections.', evidence: { quote: 'When we learn something new' } } },
            { id: 'm7l-q34', number: 34, answer: { accepted: ['20', 'twenty'] }, explanation: { text: 'Short-term memory holds information for about twenty seconds.', evidence: { quote: 'usually for about twenty seconds' } } },
            { id: 'm7l-q35', number: 35, answer: { accepted: ['lifetime'] }, explanation: { text: 'Long-term memory can hold information for a whole lifetime.', evidence: { quote: 'even for a whole lifetime' } } },
            { id: 'm7l-q36', number: 36, answer: { accepted: ['old'] }, explanation: { text: 'New information can push out old information.', evidence: { quote: 'can push out old information' } } },
            { id: 'm7l-q37', number: 37, answer: { accepted: ['long-term'] }, explanation: { text: 'During sleep, the brain moves information into long-term memory.', evidence: { quote: 'into long-term memory' } } },
            { id: 'm7l-q38', number: 38, answer: { accepted: ['8', 'eight'] }, explanation: { text: 'People who sleep for eight hours remember more.', evidence: { quote: 'people who sleep for eight hours remember more' } } },
            { id: 'm7l-q39', number: 39, answer: { accepted: ['reading'] }, explanation: { text: 'Trying to remember something is more useful than reading it again.', evidence: { quote: 'than reading it again and again' } } },
            { id: 'm7l-q40', number: 40, answer: { accepted: ['memories'] }, explanation: { text: 'Scientists hope fewer people suffer from losing their memories.', evidence: { quote: 'losing their memories' } } },
          ],
        },
      ],
    },
  ],
};
