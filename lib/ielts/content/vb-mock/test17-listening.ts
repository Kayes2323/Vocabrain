import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 17 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material.
 */

const rec = (partId: string) => recorded('vb-mock-17', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock17Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Enrolling children in a swimming class by phone',
      audio: {
        intro: "Part 1. You will hear a man enrolling his daughter in a swimming class by phone. First, you have some time to look at questions 1 to 6.",
        noun: 'conversation',
        ...rec('l1'),
        sets: [
          { questions: '1 to 6', fromLine: 0 },
          { questions: '7 to 10', fromLine: 15 },
        ],
        script: [
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Good morning. Riverside Leisure Centre. This is Anna speaking. How can I help you?" },
          { speaker: 'Mr Walsh', voice: M, accent: 'en-GB', text: "Hello. I would like to enrol my daughter in a swimming class, please." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Of course. Could I take your family name, please?" },
          { speaker: 'Mr Walsh', voice: M, accent: 'en-GB', text: "Yes, my family name is Walsh." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Thank you, Mr Walsh. What is your daughter's first name?" },
          { speaker: 'Mr Walsh', voice: M, accent: 'en-GB', text: "Her first name is Emma." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Emma. How old is Emma?" },
          { speaker: 'Mr Walsh', voice: M, accent: 'en-GB', text: "Emma is eight years old." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Eight years old. What is your telephone number, please?" },
          { speaker: 'Mr Walsh', voice: M, accent: 'en-GB', text: "My mobile number is oh seven seven double oh, nine double oh, four six one." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Oh seven seven double oh, nine double oh, four six one. Thank you. Which class would you like for Emma?" },
          { speaker: 'Mr Walsh', voice: M, accent: 'en-GB', text: "Emma cannot swim very well, so I think the beginners class is best for her." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "The beginners class. On which day would you like the class?" },
          { speaker: 'Mr Walsh', voice: M, accent: 'en-GB', text: "We would like the class on Saturday morning, please." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Saturday morning. The class starts at ten o'clock." },
          { speaker: 'Mr Walsh', voice: M, accent: 'en-GB', text: "Ten o'clock. How long is each lesson?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Each lesson lasts forty-five minutes." },
          { speaker: 'Mr Walsh', voice: M, accent: 'en-GB', text: "Forty-five minutes. What should Emma bring to the first lesson?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Emma should bring a swimming costume and a towel. She does not need goggles for the first lesson." },
          { speaker: 'Mr Walsh', voice: M, accent: 'en-GB', text: "A swimming costume and a towel. How much does the course cost?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "The course costs seventy-five pounds for ten lessons, and you can pay on the first day." },
          { speaker: 'Mr Walsh', voice: M, accent: 'en-GB', text: "Seventy-five pounds. When does the course start?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "The course starts next Saturday, on the twenty-first of June." },
          { speaker: 'Mr Walsh', voice: M, accent: 'en-GB', text: "Next Saturday. Thank you very much for your help." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "You are welcome, Mr Walsh. Goodbye." },
          { speaker: 'Mr Walsh', voice: M, accent: 'en-GB', text: "Goodbye." },
        ],
      },
      groups: [
        {
          id: 'm17l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 1, number: true },
          template:
            "SWIMMING CLASS ENROLMENT\nFamily name: {{1}}\nChild's first name: {{2}}\nTelephone number: {{3}}\nChild's age: {{4}}\nClass day: {{5}}\nClass level: {{6}}",
          questions: [
            { id: 'm17l-q1', number: 1, answer: { accepted: ['Walsh'] }, explanation: { text: 'His family name is Walsh.', evidence: { quote: 'my family name is Walsh' } } },
            { id: 'm17l-q2', number: 2, answer: { accepted: ['Emma'] }, explanation: { text: "His daughter's first name is Emma.", evidence: { quote: 'Her first name is Emma' } } },
            { id: 'm17l-q3', number: 3, answer: { accepted: ['07700900461'] }, explanation: { text: 'His mobile number is oh seven seven double oh, nine double oh, four six one.', evidence: { quote: 'oh seven seven double oh, nine double oh, four six one' } } },
            { id: 'm17l-q4', number: 4, answer: { accepted: ['eight', '8'] }, explanation: { text: 'Emma is eight years old.', evidence: { quote: 'Emma is eight years old' } } },
            { id: 'm17l-q5', number: 5, answer: { accepted: ['Saturday'] }, explanation: { text: 'They would like the class on Saturday morning.', evidence: { quote: 'We would like the class on Saturday morning' } } },
            { id: 'm17l-q6', number: 6, answer: { accepted: ['beginners'] }, explanation: { text: 'The beginners class is best for Emma.', evidence: { quote: 'I think the beginners class is best for her' } } },
          ],
        },
        {
          id: 'm17l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm17l-q7',
              number: 7,
              prompt: 'How long is each lesson?',
              options: [
                { id: 'A', text: '30 minutes' },
                { id: 'B', text: '45 minutes' },
                { id: 'C', text: '60 minutes' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Each lesson lasts forty-five minutes.',
                evidence: { quote: 'Each lesson lasts forty-five minutes' },
              },
            },
            {
              id: 'm17l-q8',
              number: 8,
              prompt: 'What should Emma bring to the first lesson?',
              options: [
                { id: 'A', text: 'a swimming costume and a towel' },
                { id: 'B', text: 'goggles and a towel' },
                { id: 'C', text: 'a swimming hat and goggles' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Emma should bring a swimming costume and a towel.',
                evidence: { quote: 'Emma should bring a swimming costume and a towel' },
              },
            },
            {
              id: 'm17l-q9',
              number: 9,
              prompt: 'How much does the course cost?',
              options: [
                { id: 'A', text: 'sixty pounds' },
                { id: 'B', text: 'seventy-five pounds' },
                { id: 'C', text: 'ninety pounds' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The course costs seventy-five pounds for ten lessons.',
                evidence: { quote: 'The course costs seventy-five pounds' },
              },
            },
            {
              id: 'm17l-q10',
              number: 10,
              prompt: 'When does the course start?',
              options: [
                { id: 'A', text: 'next Monday' },
                { id: 'B', text: 'next Saturday' },
                { id: 'C', text: 'next Sunday' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The course starts next Saturday.',
                evidence: { quote: 'The course starts next Saturday' },
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
      title: 'Talk about a national park',
      audio: {
        intro: 'Part 2. You will hear a ranger talking about a national park. First, you have some time to look at questions 11 to 14.',
        noun: 'talk',
        ...rec('l2'),
        sets: [
          { questions: '11 to 14', fromLine: 0 },
          { questions: '15 to 20', fromLine: 4 },
        ],
        script: [
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "Good morning, everyone, and welcome to Green Valley National Park. My name is Sarah, and I am a ranger in the park." },
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "The park opened in 1978, and this year more than eighty thousand people will visit the park." },
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "The park is open every day from eight o'clock in the morning until six o'clock in the evening." },
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "Tickets cost five pounds for adults, and children under sixteen can visit the park for free." },
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "The first place is the visitor centre, where visitors can get maps and learn about the animals and plants in the park." },
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "Next to the visitor centre, there is the lake, where visitors can watch birds and take photographs." },
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "Near the lake, there is the forest walk, where visitors can walk among tall trees and listen to the birds." },
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "There is also a picnic area, where families can eat lunch and rest in the shade of the trees." },
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "Finally, there is the mountain viewpoint, where visitors can see the whole park and take photographs of the valley." },
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "Please remember that you must stay on the paths in the park, because some animals in the park are dangerous." },
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "Thank you for coming to Green Valley National Park. I hope you enjoy your visit. Have a wonderful day!" },
        ],
      },
      groups: [
        {
          id: 'm17l-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm17l-q11',
              number: 11,
              prompt: 'When did Green Valley National Park open?',
              options: [
                { id: 'A', text: 'in 1978' },
                { id: 'B', text: 'in 1987' },
                { id: 'C', text: 'in 1968' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The park opened in 1978.',
                evidence: { quote: 'The park opened in 1978' },
              },
            },
            {
              id: 'm17l-q12',
              number: 12,
              prompt: 'How many people will visit the park this year?',
              options: [
                { id: 'A', text: 'more than eight thousand' },
                { id: 'B', text: 'more than eighty thousand' },
                { id: 'C', text: 'more than eight hundred thousand' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'This year more than eighty thousand people will visit the park.',
                evidence: { quote: 'more than eighty thousand people will visit the park' },
              },
            },
            {
              id: 'm17l-q13',
              number: 13,
              prompt: 'What do children under sixteen pay to visit the park?',
              options: [
                { id: 'A', text: 'nothing' },
                { id: 'B', text: 'five pounds' },
                { id: 'C', text: 'ten pounds' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Children under sixteen can visit the park for free.',
                evidence: { quote: 'children under sixteen can visit the park for free' },
              },
            },
            {
              id: 'm17l-q14',
              number: 14,
              prompt: 'When does the park close?',
              options: [
                { id: 'A', text: "at five o'clock in the evening" },
                { id: 'B', text: "at six o'clock in the evening" },
                { id: 'C', text: "at eight o'clock in the evening" },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The park is open until six o\'clock in the evening.',
                evidence: { quote: 'until six o\'clock in the evening' },
              },
            },
          ],
        },
        {
          id: 'm17l-g4',
          type: 'matching',
          instructions: 'What is said about each of the following? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 15–20.',
          optionsTitle: 'Features',
          options: [
            { id: 'A', text: 'It is where visitors can get maps and learn about the animals and plants in the park.' },
            { id: 'B', text: 'It is where visitors can watch birds and take photographs.' },
            { id: 'C', text: 'It is where visitors can walk among tall trees and listen to the birds.' },
            { id: 'D', text: 'It is where families can eat lunch and rest in the shade of the trees.' },
            { id: 'E', text: 'It is where visitors can see the whole park and take photographs of the valley.' },
            { id: 'F', text: 'You must stay on the paths in the park, because some animals in the park are dangerous.' },
            { id: 'G', text: 'Tickets cost five pounds for adults.' },
            { id: 'H', text: 'The park opened in 1987.' },
          ],
          questions: [
            { id: 'm17l-q15', number: 15, prompt: 'Visitor centre', answer: { accepted: ['A'] }, explanation: { text: 'The visitor centre is where visitors can get maps and learn about the animals and plants in the park.', evidence: { quote: 'where visitors can get maps and learn about the animals and plants in the park' } } },
            { id: 'm17l-q16', number: 16, prompt: 'Lake', answer: { accepted: ['B'] }, explanation: { text: 'The lake is where visitors can watch birds and take photographs.', evidence: { quote: 'where visitors can watch birds and take photographs' } } },
            { id: 'm17l-q17', number: 17, prompt: 'Forest walk', answer: { accepted: ['C'] }, explanation: { text: 'The forest walk is where visitors can walk among tall trees and listen to the birds.', evidence: { quote: 'where visitors can walk among tall trees and listen to the birds' } } },
            { id: 'm17l-q18', number: 18, prompt: 'Picnic area', answer: { accepted: ['D'] }, explanation: { text: 'The picnic area is where families can eat lunch and rest in the shade of the trees.', evidence: { quote: 'where families can eat lunch and rest in the shade of the trees' } } },
            { id: 'm17l-q19', number: 19, prompt: 'Mountain viewpoint', answer: { accepted: ['E'] }, explanation: { text: 'The mountain viewpoint is where visitors can see the whole park and take photographs of the valley.', evidence: { quote: 'where visitors can see the whole park and take photographs of the valley' } } },
            { id: 'm17l-q20', number: 20, prompt: 'Staying on the paths', answer: { accepted: ['F'] }, explanation: { text: 'Visitors must stay on the paths in the park.', evidence: { quote: 'you must stay on the paths in the park' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Two students discussing a project on local history',
      audio: {
        intro: 'Part 3. You will hear two students, Emma and Liam, discussing a project on local history. First, you have some time to look at questions 21 to 25.',
        noun: 'discussion',
        ...rec('l3'),
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 13 },
        ],
        script: [
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Hi, Liam. Have you started our project on local history?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "Yes, I have started the project, Emma. We will study the history of our town, Millford, in the nineteenth century." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "The nineteenth century. What will we study first?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "First, we will study the old market, because the market was the centre of the town in 1850." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "The old market. Where will we find information about the market?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "We will find information in the town library, and the librarian will show us old photographs and maps." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Old photographs and maps. Who will we talk to about the town?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "We will talk to Mrs Green, because she is ninety years old, and she knows a lot about the town." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Mrs Green. What will we do after we visit the library?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "After we visit the library, we will visit the old mill, and we will learn how flour was made." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "The old mill. How long will the project take?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "The project will take four weeks, and we will give our talk to the class on Friday the twentieth of June." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Four weeks. What should we write in the report?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "I think we should write about the market in the report, because the market was the centre of the town." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Good idea. What about the photographs? What should we do with the photographs?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "I think we should put the photographs on a poster, because the photographs will show what the town looked like." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Good. Who will make the poster?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "I will make the poster, because I am good at drawing." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "You will make the poster. When should we finish the project?" },
          { speaker: 'Liam', voice: M, accent: 'en-GB', text: "We should finish the project on Thursday, so we can practise our talk on Friday." },
        ],
      },
      groups: [
        {
          id: 'm17l-g5',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm17l-q21',
              number: 21,
              prompt: 'What will the students study in their project?',
              options: [
                { id: 'A', text: 'the history of Millford in the nineteenth century' },
                { id: 'B', text: 'the history of Millford in the twentieth century' },
                { id: 'C', text: 'the history of London in the nineteenth century' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'They will study the history of Millford in the nineteenth century.',
                evidence: { quote: 'We will study the history of our town, Millford, in the nineteenth century' },
              },
            },
            {
              id: 'm17l-q22',
              number: 22,
              prompt: 'What will the students study first?',
              options: [
                { id: 'A', text: 'the old market' },
                { id: 'B', text: 'the old mill' },
                { id: 'C', text: 'the town library' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'First, they will study the old market.',
                evidence: { quote: 'First, we will study the old market' },
              },
            },
            {
              id: 'm17l-q23',
              number: 23,
              prompt: 'Where will the students find information about the market?',
              options: [
                { id: 'A', text: 'in the town library' },
                { id: 'B', text: 'in the old mill' },
                { id: 'C', text: 'at Mrs Green\'s house' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'They will find information in the town library.',
                evidence: { quote: 'We will find information in the town library' },
              },
            },
            {
              id: 'm17l-q24',
              number: 24,
              prompt: 'Who will the students talk to about the town?',
              options: [
                { id: 'A', text: 'Mrs Green' },
                { id: 'B', text: 'the librarian' },
                { id: 'C', text: 'the teacher' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'They will talk to Mrs Green.',
                evidence: { quote: 'We will talk to Mrs Green' },
              },
            },
            {
              id: 'm17l-q25',
              number: 25,
              prompt: 'How long will the project take?',
              options: [
                { id: 'A', text: 'two weeks' },
                { id: 'B', text: 'four weeks' },
                { id: 'C', text: 'six weeks' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The project will take four weeks.',
                evidence: { quote: 'The project will take four weeks' },
              },
            },
          ],
        },
        {
          id: 'm17l-g6',
          type: 'matching',
          instructions: 'What was agreed about each of the following? Choose FIVE answers from the box and write the correct letter, A–F, next to Questions 26–30.',
          optionsTitle: 'Decisions',
          options: [
            { id: 'A', text: 'They should write about the market in the report.' },
            { id: 'B', text: 'They should put the photographs on a poster.' },
            { id: 'C', text: 'He will make the poster.' },
            { id: 'D', text: 'They should finish the project on Thursday.' },
            { id: 'E', text: 'They can practise their talk on Friday.' },
            { id: 'F', text: 'They will visit the old mill first.' },
          ],
          questions: [
            { id: 'm17l-q26', number: 26, prompt: 'Report', answer: { accepted: ['A'] }, explanation: { text: 'They should write about the market in the report.', evidence: { quote: 'we should write about the market in the report' } } },
            { id: 'm17l-q27', number: 27, prompt: 'Photographs', answer: { accepted: ['B'] }, explanation: { text: 'They should put the photographs on a poster.', evidence: { quote: 'we should put the photographs on a poster' } } },
            { id: 'm17l-q28', number: 28, prompt: 'Poster', answer: { accepted: ['C'] }, explanation: { text: 'Liam will make the poster.', evidence: { quote: 'I will make the poster' } } },
            { id: 'm17l-q29', number: 29, prompt: 'Finishing the project', answer: { accepted: ['D'] }, explanation: { text: 'They should finish the project on Thursday.', evidence: { quote: 'We should finish the project on Thursday' } } },
            { id: 'm17l-q30', number: 30, prompt: 'Practising the talk', answer: { accepted: ['E'] }, explanation: { text: 'They can practise their talk on Friday.', evidence: { quote: 'we can practise our talk on Friday' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Lecture: genetics',
      audio: {
        intro: 'Part 4. You will hear a lecture about genetics. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Good morning. Today I am going to talk about genetics, the science of how parents pass features to their children." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Genetics began in the nineteenth century, when a scientist called Gregor Mendel studied plants in a garden in Austria." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Mendel studied pea plants, and he found that some features, such as the colour of the flowers, are passed from parents to children." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In 1953, two scientists called Watson and Crick found the shape of DNA, the material that carries information in our bodies." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "DNA is like a set of instructions, and these instructions tell the body how to grow and how to work." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Today, doctors use genetics to learn about diseases, and they can find out if a person may become ill in the future." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Farmers also use genetics to grow better plants, and they can grow plants that need less water." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In the future, genetics may help doctors to treat diseases, and it may help farmers to grow more food." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "However, some people worry about genetics, because they think that this science could be used in the wrong way." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In conclusion, genetics has changed a great deal in more than one hundred years, but it is still a new science. That brings us to the end of the lecture." },
        ],
      },
      groups: [
        {
          id: 'm17l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'GENETICS\nWhat is genetics?\n• genetics is the science of how parents pass {{31}} to their children\n• genetics began in the nineteenth century, when a scientist called Gregor {{32}} studied plants in a garden\nMendel and pea plants\n• Mendel studied {{33}} plants, and he found that some features are passed from parents to children\nDNA\n• in 1953, Watson and Crick found the shape of {{34}}, the material that carries information in our bodies\n• DNA is like a set of {{35}}, and these instructions tell the body how to grow\nGenetics today\n• doctors use genetics to learn about {{36}}\n• farmers use genetics to grow plants that need less {{37}}\nGenetics in the future\n• genetics may help doctors to treat {{38}}\n• some people worry about genetics, because they think that this science could be used in the wrong {{39}}\nConclusion\n• genetics is still a {{40}} science',
          questions: [
            { id: 'm17l-q31', number: 31, answer: { accepted: ['features'] }, explanation: { text: 'Genetics is the science of how parents pass features to their children.', evidence: { quote: 'pass features to their children' } } },
            { id: 'm17l-q32', number: 32, answer: { accepted: ['Mendel'] }, explanation: { text: 'A scientist called Gregor Mendel studied plants in a garden.', evidence: { quote: 'a scientist called Gregor Mendel' } } },
            { id: 'm17l-q33', number: 33, answer: { accepted: ['pea'] }, explanation: { text: 'Mendel studied pea plants.', evidence: { quote: 'Mendel studied pea plants' } } },
            { id: 'm17l-q34', number: 34, answer: { accepted: ['DNA'] }, explanation: { text: 'Watson and Crick found the shape of DNA.', evidence: { quote: 'found the shape of DNA' } } },
            { id: 'm17l-q35', number: 35, answer: { accepted: ['instructions'] }, explanation: { text: 'DNA is like a set of instructions.', evidence: { quote: 'DNA is like a set of instructions' } } },
            { id: 'm17l-q36', number: 36, answer: { accepted: ['diseases'] }, explanation: { text: 'Doctors use genetics to learn about diseases.', evidence: { quote: 'doctors use genetics to learn about diseases' } } },
            { id: 'm17l-q37', number: 37, answer: { accepted: ['water'] }, explanation: { text: 'Farmers can grow plants that need less water.', evidence: { quote: 'plants that need less water' } } },
            { id: 'm17l-q38', number: 38, answer: { accepted: ['diseases'] }, explanation: { text: 'Genetics may help doctors to treat diseases.', evidence: { quote: 'genetics may help doctors to treat diseases' } } },
            { id: 'm17l-q39', number: 39, answer: { accepted: ['way'] }, explanation: { text: 'Some people think that this science could be used in the wrong way.', evidence: { quote: 'could be used in the wrong way' } } },
            { id: 'm17l-q40', number: 40, answer: { accepted: ['new'] }, explanation: { text: 'Genetics is still a new science.', evidence: { quote: 'it is still a new science' } } },
          ],
        },
      ],
    },
  ],
};
