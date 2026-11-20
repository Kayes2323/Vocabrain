import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 19 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material.
 */

const rec = (partId: string) => recorded('vb-mock-19', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock19Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Complaining about noisy neighbours by phone',
      audio: {
        intro: "Part 1. You will hear a woman complaining about noisy neighbours by phone. First, you have some time to look at questions 1 to 6.",
        noun: 'conversation',
        ...rec('l1'),
        sets: [
          { questions: '1 to 6', fromLine: 0 },
          { questions: '7 to 10', fromLine: 15 },
        ],
        script: [
          { speaker: 'Mr Reed', voice: M, accent: 'en-GB', text: "Good afternoon. Northfield Housing Office. This is James Reed speaking. How can I help you?" },
          { speaker: 'Mrs Patel', voice: W, accent: 'en-GB', text: "Good afternoon. My name is Aisha Patel, and I am calling about the noise from my neighbours." },
          { speaker: 'Mr Reed', voice: M, accent: 'en-GB', text: "I am sorry to hear that, Mrs Patel. Could I take your family name, please?" },
          { speaker: 'Mrs Patel', voice: W, accent: 'en-GB', text: "Yes, my family name is Patel." },
          { speaker: 'Mr Reed', voice: M, accent: 'en-GB', text: "Thank you, Mrs Patel. What is your first name?" },
          { speaker: 'Mrs Patel', voice: W, accent: 'en-GB', text: "My first name is Aisha." },
          { speaker: 'Mr Reed', voice: M, accent: 'en-GB', text: "Aisha. What is your telephone number, please?" },
          { speaker: 'Mrs Patel', voice: W, accent: 'en-GB', text: "My telephone number is oh seven nine four six two eight one three five seven." },
          { speaker: 'Mr Reed', voice: M, accent: 'en-GB', text: "Oh seven nine four six two eight one three five seven. Thank you. Which flat do your neighbours live in?" },
          { speaker: 'Mrs Patel', voice: W, accent: 'en-GB', text: "They live in the flat above mine, flat number twelve." },
          { speaker: 'Mr Reed', voice: M, accent: 'en-GB', text: "Flat twelve. When is the noise worst?" },
          { speaker: 'Mrs Patel', voice: W, accent: 'en-GB', text: "The noise is worst at night, after eleven o'clock." },
          { speaker: 'Mr Reed', voice: M, accent: 'en-GB', text: "After eleven o'clock. How long has this problem lasted?" },
          { speaker: 'Mrs Patel', voice: W, accent: 'en-GB', text: "This problem has lasted for three weeks now." },
          { speaker: 'Mr Reed', voice: M, accent: 'en-GB', text: "Three weeks. What kind of noise is it?" },
          { speaker: 'Mrs Patel', voice: W, accent: 'en-GB', text: "It is loud music, and sometimes I hear shouting late at night." },
          { speaker: 'Mr Reed', voice: M, accent: 'en-GB', text: "Loud music and shouting. Have you spoken to your neighbours about the noise?" },
          { speaker: 'Mrs Patel', voice: W, accent: 'en-GB', text: "Yes, I spoke to them twice, but the noise did not stop." },
          { speaker: 'Mr Reed', voice: M, accent: 'en-GB', text: "I understand. We will send a letter to your neighbours, and we will visit them next week." },
          { speaker: 'Mrs Patel', voice: W, accent: 'en-GB', text: "Thank you. When will you visit them?" },
          { speaker: 'Mr Reed', voice: M, accent: 'en-GB', text: "We will visit them on Tuesday morning." },
          { speaker: 'Mrs Patel', voice: W, accent: 'en-GB', text: "Tuesday morning. Thank you very much for your help." },
          { speaker: 'Mr Reed', voice: M, accent: 'en-GB', text: "You are welcome, Mrs Patel. Goodbye." },
          { speaker: 'Mrs Patel', voice: W, accent: 'en-GB', text: "Goodbye." },
        ],
      },
      groups: [
        {
          id: 'm19l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 2, number: true },
          template:
            "NOISE COMPLAINT\nFamily name: {{1}}\nFirst name: {{2}}\nTelephone number: {{3}}\nNeighbours live in flat: {{4}}\nNoise is worst: {{5}}\nProblem has lasted: {{6}}",
          questions: [
            { id: 'm19l-q1', number: 1, answer: { accepted: ['Patel'] }, explanation: { text: 'Her family name is Patel.', evidence: { quote: 'my family name is Patel' } } },
            { id: 'm19l-q2', number: 2, answer: { accepted: ['Aisha'] }, explanation: { text: 'Her first name is Aisha.', evidence: { quote: 'My first name is Aisha' } } },
            { id: 'm19l-q3', number: 3, answer: { accepted: ['07946281357'] }, explanation: { text: 'Her telephone number is oh seven nine four six two eight one three five seven.', evidence: { quote: 'oh seven nine four six two eight one three five seven' } } },
            { id: 'm19l-q4', number: 4, answer: { accepted: ['12', 'twelve'] }, explanation: { text: 'Her neighbours live in flat number twelve.', evidence: { quote: 'flat number twelve' } } },
            { id: 'm19l-q5', number: 5, answer: { accepted: ['night'] }, explanation: { text: 'The noise is worst at night.', evidence: { quote: 'The noise is worst at night' } } },
            { id: 'm19l-q6', number: 6, answer: { accepted: ['three weeks'] }, explanation: { text: 'The problem has lasted for three weeks.', evidence: { quote: 'This problem has lasted for three weeks now' } } },
          ],
        },
        {
          id: 'm19l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm19l-q7',
              number: 7,
              prompt: 'What kind of noise does Mrs Patel hear?',
              options: [
                { id: 'A', text: 'cars and traffic' },
                { id: 'B', text: 'loud music and shouting' },
                { id: 'C', text: 'dogs barking' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'She hears loud music, and sometimes shouting late at night.',
                evidence: { quote: 'It is loud music, and sometimes I hear shouting late at night' },
              },
            },
            {
              id: 'm19l-q8',
              number: 8,
              prompt: 'How many times has Mrs Patel spoken to her neighbours about the noise?',
              options: [
                { id: 'A', text: 'once' },
                { id: 'B', text: 'twice' },
                { id: 'C', text: 'three times' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'She spoke to them twice.',
                evidence: { quote: 'I spoke to them twice' },
              },
            },
            {
              id: 'm19l-q9',
              number: 9,
              prompt: 'What will the housing office do first?',
              options: [
                { id: 'A', text: 'send a letter to the neighbours' },
                { id: 'B', text: 'call the police' },
                { id: 'C', text: 'visit the neighbours tomorrow' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The office will send a letter to the neighbours, and then visit them next week.',
                evidence: { quote: 'We will send a letter to your neighbours' },
              },
            },
            {
              id: 'm19l-q10',
              number: 10,
              prompt: 'When will the housing office visit the neighbours?',
              options: [
                { id: 'A', text: 'on Monday morning' },
                { id: 'B', text: 'on Tuesday morning' },
                { id: 'C', text: 'on Tuesday evening' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'They will visit them on Tuesday morning.',
                evidence: { quote: 'We will visit them on Tuesday morning' },
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
      title: 'Talk by a mountain guide',
      audio: {
        intro: 'Part 2. You will hear a mountain guide talking to a group of walkers. First, you have some time to look at questions 11 to 14.',
        noun: 'talk',
        ...rec('l2'),
        sets: [
          { questions: '11 to 14', fromLine: 0 },
          { questions: '15 to 20', fromLine: 4 },
        ],
        script: [
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Good morning, everyone, and welcome to Mount Harrow. My name is Sarah, and I am your mountain guide for today." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Mount Harrow is one thousand eight hundred and forty metres high, and it is the highest mountain in this part of the country." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "We will walk for about five hours today, and we will stop for lunch at the lake, about halfway up the mountain." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "The walk is not difficult, but you must wear strong shoes, and you should bring a warm jacket, because the weather can change quickly." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "The first stop is the old stone bridge, where you can see the river below and take photographs of the valley." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Next, we will pass the pine forest, where you can see red deer and many kinds of birds." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "After the forest, we will reach the waterfall, where the water falls more than fifty metres into a deep pool." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Near the top of the mountain, there is a small stone hut, where walkers can rest and shelter from the wind." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "At the top, on a clear day, you can see the sea in the west and three other mountains in the east." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Please stay with the group, and do not leave the path, because the ground near the edge of the mountain is dangerous." },
          { speaker: 'Guide', voice: W, accent: 'en-AU', text: "Thank you for listening. Let us begin our walk, and enjoy the mountain!" },
        ],
      },
      groups: [
        {
          id: 'm19l-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm19l-q11',
              number: 11,
              prompt: 'How high is Mount Harrow?',
              options: [
                { id: 'A', text: 'one thousand eight hundred and forty metres' },
                { id: 'B', text: 'one thousand four hundred and eighty metres' },
                { id: 'C', text: 'one thousand eight hundred and four metres' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Mount Harrow is one thousand eight hundred and forty metres high.',
                evidence: { quote: 'one thousand eight hundred and forty metres high' },
              },
            },
            {
              id: 'm19l-q12',
              number: 12,
              prompt: 'How long will the walk take today?',
              options: [
                { id: 'A', text: 'about three hours' },
                { id: 'B', text: 'about five hours' },
                { id: 'C', text: 'about seven hours' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'They will walk for about five hours today.',
                evidence: { quote: 'We will walk for about five hours today' },
              },
            },
            {
              id: 'm19l-q13',
              number: 13,
              prompt: 'What should walkers bring with them?',
              options: [
                { id: 'A', text: 'a tent' },
                { id: 'B', text: 'a map' },
                { id: 'C', text: 'a warm jacket' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'Walkers should bring a warm jacket.',
                evidence: { quote: 'you should bring a warm jacket' },
              },
            },
            {
              id: 'm19l-q14',
              number: 14,
              prompt: 'Why should walkers bring a warm jacket?',
              options: [
                { id: 'A', text: 'because the weather can change quickly' },
                { id: 'B', text: 'because it will rain all day' },
                { id: 'C', text: 'because the mountain is very cold at night' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Walkers should bring a warm jacket because the weather can change quickly.',
                evidence: { quote: 'because the weather can change quickly' },
              },
            },
          ],
        },
        {
          id: 'm19l-g4',
          type: 'matching',
          instructions: 'What is said about each of the following? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 15–20.',
          optionsTitle: 'Features',
          options: [
            { id: 'A', text: 'It is where you can see the river below and take photographs of the valley.' },
            { id: 'B', text: 'It is where you can see red deer and many kinds of birds.' },
            { id: 'C', text: 'It is where the water falls more than fifty metres into a deep pool.' },
            { id: 'D', text: 'It is where walkers can rest and shelter from the wind.' },
            { id: 'E', text: 'It is where you can see the sea in the west and three other mountains in the east.' },
            { id: 'F', text: 'Walkers must stay with the group and not leave the path.' },
            { id: 'G', text: 'The walk takes about seven hours.' },
            { id: 'H', text: 'It is the highest mountain in the country.' },
          ],
          questions: [
            { id: 'm19l-q15', number: 15, prompt: 'Old stone bridge', answer: { accepted: ['A'] }, explanation: { text: 'At the old stone bridge, you can see the river below and take photographs of the valley.', evidence: { quote: 'where you can see the river below and take photographs of the valley' } } },
            { id: 'm19l-q16', number: 16, prompt: 'Pine forest', answer: { accepted: ['B'] }, explanation: { text: 'In the pine forest, you can see red deer and many kinds of birds.', evidence: { quote: 'where you can see red deer and many kinds of birds' } } },
            { id: 'm19l-q17', number: 17, prompt: 'Waterfall', answer: { accepted: ['C'] }, explanation: { text: 'At the waterfall, the water falls more than fifty metres into a deep pool.', evidence: { quote: 'where the water falls more than fifty metres into a deep pool' } } },
            { id: 'm19l-q18', number: 18, prompt: 'Stone hut', answer: { accepted: ['D'] }, explanation: { text: 'In the stone hut, walkers can rest and shelter from the wind.', evidence: { quote: 'where walkers can rest and shelter from the wind' } } },
            { id: 'm19l-q19', number: 19, prompt: 'Top of the mountain', answer: { accepted: ['E'] }, explanation: { text: 'At the top, you can see the sea in the west and three other mountains in the east.', evidence: { quote: 'you can see the sea in the west and three other mountains in the east' } } },
            { id: 'm19l-q20', number: 20, prompt: 'Path', answer: { accepted: ['F'] }, explanation: { text: 'Walkers must stay with the group and not leave the path.', evidence: { quote: 'do not leave the path' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Two students discussing a chemistry experiment',
      audio: {
        intro: 'Part 3. You will hear two students, Sophie and Ben, discussing a chemistry experiment. First, you have some time to look at questions 21 to 25.',
        noun: 'discussion',
        ...rec('l3'),
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 13 },
        ],
        script: [
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Hi, Ben. Have you finished writing up our chemistry experiment?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "Not yet, Sophie. I have written the first part, about the aim of the experiment, but I still need to write the results." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "The aim. What was the aim of our experiment?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "The aim was to find out how temperature changes the speed of a chemical reaction." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "How temperature changes the speed of a reaction. What did we do first?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "First, we mixed two liquids in a beaker, and we heated the mixture slowly." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "We heated the mixture slowly. What temperature did we start at?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "We started at twenty degrees, and we measured the time it took for the colour to change." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Twenty degrees. What happened when the temperature went up?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "When the temperature went up, the colour changed more quickly, and at sixty degrees, the colour changed in ten seconds." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "At sixty degrees, the colour changed in ten seconds. What did we use to measure the temperature?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "We used a thermometer, and we wrote the temperature in a table every ten seconds." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Every ten seconds. What was the main problem with the experiment?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "The main problem was that the thermometer was not very accurate, so some of our results were not clear." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "The thermometer was not very accurate. What should we do about the problem in our report?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "I think we should say that we need a better thermometer next time, because a better thermometer would give clearer results." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Good idea. What else should we put in the report?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "I think we should put a graph of the results in the report, because a graph will show the pattern more clearly." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "A graph of the results. Who will draw the graph?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "I will draw the graph, because I am good at drawing graphs." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "You will draw the graph. When should we finish the report?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "We should finish the report on Friday, so we can give it to Dr Carter on Monday." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Friday. Thank you, Ben. Let us start writing now." },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "Good idea, Sophie." },
        ],
      },
      groups: [
        {
          id: 'm19l-g5',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm19l-q21',
              number: 21,
              prompt: 'What was the aim of the experiment?',
              options: [
                { id: 'A', text: 'to find out how temperature changes the speed of a chemical reaction' },
                { id: 'B', text: 'to find out how to make a new liquid' },
                { id: 'C', text: 'to find out how to use a thermometer' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The aim was to find out how temperature changes the speed of a chemical reaction.',
                evidence: { quote: 'The aim was to find out how temperature changes the speed of a chemical reaction' },
              },
            },
            {
              id: 'm19l-q22',
              number: 22,
              prompt: 'What did the students do first?',
              options: [
                { id: 'A', text: 'they heated water in a beaker' },
                { id: 'B', text: 'they mixed two liquids in a beaker' },
                { id: 'C', text: 'they measured the colour of a liquid' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'First, they mixed two liquids in a beaker.',
                evidence: { quote: 'First, we mixed two liquids in a beaker' },
              },
            },
            {
              id: 'm19l-q23',
              number: 23,
              prompt: 'What temperature did the students start at?',
              options: [
                { id: 'A', text: 'ten degrees' },
                { id: 'B', text: 'twenty degrees' },
                { id: 'C', text: 'sixty degrees' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'They started at twenty degrees.',
                evidence: { quote: 'We started at twenty degrees' },
              },
            },
            {
              id: 'm19l-q24',
              number: 24,
              prompt: 'At sixty degrees, how long did the colour take to change?',
              options: [
                { id: 'A', text: 'ten seconds' },
                { id: 'B', text: 'twenty seconds' },
                { id: 'C', text: 'sixty seconds' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'At sixty degrees, the colour changed in ten seconds.',
                evidence: { quote: 'the colour changed in ten seconds' },
              },
            },
            {
              id: 'm19l-q25',
              number: 25,
              prompt: 'What did the students use to measure the temperature?',
              options: [
                { id: 'A', text: 'a ruler' },
                { id: 'B', text: 'a stopwatch' },
                { id: 'C', text: 'a thermometer' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'They used a thermometer.',
                evidence: { quote: 'We used a thermometer' },
              },
            },
          ],
        },
        {
          id: 'm19l-g6',
          type: 'matching',
          instructions: 'What was agreed about each of the following? Choose FIVE answers from the box and write the correct letter, A–F, next to Questions 26–30.',
          optionsTitle: 'Decisions',
          options: [
            { id: 'A', text: 'The thermometer was not very accurate.' },
            { id: 'B', text: 'They need a better thermometer next time.' },
            { id: 'C', text: 'They should put a graph of the results in the report.' },
            { id: 'D', text: 'Ben will draw the graph.' },
            { id: 'E', text: 'They should finish the report on Friday.' },
            { id: 'F', text: 'They will finish the report on Monday.' },
          ],
          questions: [
            { id: 'm19l-q26', number: 26, prompt: 'Problem with the experiment', answer: { accepted: ['A'] }, explanation: { text: 'The main problem was that the thermometer was not very accurate.', evidence: { quote: 'the thermometer was not very accurate' } } },
            { id: 'm19l-q27', number: 27, prompt: 'Better thermometer', answer: { accepted: ['B'] }, explanation: { text: 'They need a better thermometer next time.', evidence: { quote: 'we need a better thermometer next time' } } },
            { id: 'm19l-q28', number: 28, prompt: 'Graph', answer: { accepted: ['C'] }, explanation: { text: 'They should put a graph of the results in the report.', evidence: { quote: 'we should put a graph of the results in the report' } } },
            { id: 'm19l-q29', number: 29, prompt: 'Drawing the graph', answer: { accepted: ['D'] }, explanation: { text: 'Ben will draw the graph.', evidence: { quote: 'I will draw the graph' } } },
            { id: 'm19l-q30', number: 30, prompt: 'Finishing the report', answer: { accepted: ['E'] }, explanation: { text: 'They should finish the report on Friday.', evidence: { quote: 'We should finish the report on Friday' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Lecture: the deep ocean',
      audio: {
        intro: 'Part 4. You will hear a lecture about the deep ocean. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Good morning. Today I am going to talk about the deep ocean, the part of the sea that is more than one thousand metres below the surface." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "The deep ocean is the largest place on Earth where animals live, but it is also one of the least known places, because it is dark and very cold." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Sunlight cannot reach the deep ocean, so no plants can grow there, and the water is only about four degrees." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Many animals in the deep ocean make their own light, and they use this light to find food and to talk to other animals." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "One animal, the anglerfish, has a light on its head, and it uses this light to catch small fish." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "The deep ocean is also home to very large animals, and the blue whale, the largest animal in the world, can dive more than five hundred metres deep." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In the deep ocean, there are mountains, and the tallest mountain under the sea is more than ten thousand metres high." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Scientists study the deep ocean with special ships and with robots, and these robots can take photographs and bring back samples of water." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "However, the deep ocean is in danger, because plastic and other rubbish fall into the sea, and some animals eat the plastic and die." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In the future, scientists hope to learn more about the deep ocean, and they hope to find new medicines in animals that live there." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In conclusion, the deep ocean is a dark and cold place, but it is full of life, and it is important for the whole planet. That brings us to the end of the lecture." },
        ],
      },
      groups: [
        {
          id: 'm19l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'THE DEEP OCEAN\nWhat is the deep ocean?\n• the deep ocean is the largest place on Earth where {{31}} live\n• sunlight cannot reach the deep ocean, so no {{32}} can grow there\n• the water is only about {{33}} degrees\nLife in the deep ocean\n• many animals in the deep ocean make their own {{34}}\n• the anglerfish has a light on its {{35}}\n• the blue whale can dive more than five hundred metres {{36}}\n• the tallest mountain under the sea is more than ten thousand metres {{37}}\nStudying the deep ocean\n• scientists study the deep ocean with special ships and with {{38}}\nThe deep ocean in danger\n• some animals eat the {{39}} and die\nThe future\n• scientists hope to find new {{40}} in animals that live there',
          questions: [
            { id: 'm19l-q31', number: 31, answer: { accepted: ['animals'] }, explanation: { text: 'The deep ocean is the largest place on Earth where animals live.', evidence: { quote: 'largest place on Earth where animals live' } } },
            { id: 'm19l-q32', number: 32, answer: { accepted: ['plants'] }, explanation: { text: 'No plants can grow in the deep ocean.', evidence: { quote: 'no plants can grow there' } } },
            { id: 'm19l-q33', number: 33, answer: { accepted: ['four'] }, explanation: { text: 'The water is only about four degrees.', evidence: { quote: 'the water is only about four degrees' } } },
            { id: 'm19l-q34', number: 34, answer: { accepted: ['light'] }, explanation: { text: 'Many animals in the deep ocean make their own light.', evidence: { quote: 'make their own light' } } },
            { id: 'm19l-q35', number: 35, answer: { accepted: ['head'] }, explanation: { text: 'The anglerfish has a light on its head.', evidence: { quote: 'has a light on its head' } } },
            { id: 'm19l-q36', number: 36, answer: { accepted: ['deep'] }, explanation: { text: 'The blue whale can dive more than five hundred metres deep.', evidence: { quote: 'can dive more than five hundred metres deep' } } },
            { id: 'm19l-q37', number: 37, answer: { accepted: ['high'] }, explanation: { text: 'The tallest mountain under the sea is more than ten thousand metres high.', evidence: { quote: 'more than ten thousand metres high' } } },
            { id: 'm19l-q38', number: 38, answer: { accepted: ['robots'] }, explanation: { text: 'Scientists study the deep ocean with special ships and with robots.', evidence: { quote: 'with special ships and with robots' } } },
            { id: 'm19l-q39', number: 39, answer: { accepted: ['plastic'] }, explanation: { text: 'Some animals eat the plastic and die.', evidence: { quote: 'some animals eat the plastic and die' } } },
            { id: 'm19l-q40', number: 40, answer: { accepted: ['medicines'] }, explanation: { text: 'Scientists hope to find new medicines in animals that live there.', evidence: { quote: 'find new medicines in animals that live there' } } },
          ],
        },
      ],
    },
  ],
};
