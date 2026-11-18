import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 9 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material.
 */

const rec = (partId: string) => recorded('vb-mock-9', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock9Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Enrolling in a language course by phone',
      audio: {
        intro: 'Part 1. You will hear a man enrolling in a language course by phone. First, you have some time to look at questions 1 to 6.',
        noun: 'conversation',
        ...rec('l1'),
        // Questions 1–6 are answered by line 14; the break comes before the caller is asked if there is anything else.
        sets: [
          { questions: '1 to 6', fromLine: 0 },
          { questions: '7 to 10', fromLine: 16 },
        ],
        script: [
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "Good morning, Greenfield Language School. This is Emma speaking. How can I help you?" },
          { speaker: 'David', voice: M, accent: 'en-GB', text: "Hello. I would like to enrol in an English course, please." },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "Of course. Could I take your name, please?" },
          { speaker: 'David', voice: M, accent: 'en-GB', text: "Yes, it is David Carter." },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "Could you spell your surname for me, please?" },
          { speaker: 'David', voice: M, accent: 'en-GB', text: "Sure. C, A, R, T, E, R." },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "Thank you, Mr Carter. How old are you?" },
          { speaker: 'David', voice: M, accent: 'en-GB', text: "I am twenty-two years old." },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "Twenty-two. What is your first language?" },
          { speaker: 'David', voice: M, accent: 'en-GB', text: "My first language is Spanish." },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "Spanish. Which course would you like to take?" },
          { speaker: 'David', voice: M, accent: 'en-GB', text: "I would like to take the evening course, please." },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "The evening course. The classes are on Tuesdays and Thursdays, from six o'clock to eight o'clock in the evening." },
          { speaker: 'David', voice: M, accent: 'en-GB', text: "That is good. How much does the course cost?" },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "The course costs two hundred and fifty pounds for ten weeks." },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "Could I take your telephone number, please?" },
          { speaker: 'David', voice: M, accent: 'en-GB', text: "Yes, my mobile number is oh seven nine two, three four five, eight one seven." },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "Oh seven nine two, three four five, eight one seven. And is there anything else?" },
          { speaker: 'David', voice: M, accent: 'en-GB', text: "Yes. When does the course start?" },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "The course starts on the fifteenth of September." },
          { speaker: 'David', voice: M, accent: 'en-GB', text: "The fifteenth of September. Do I need to buy any books?" },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "No, all the books are included in the course fee, and you can use the school library for free." },
          { speaker: 'David', voice: M, accent: 'en-GB', text: "That is good. Is there a test before the course starts?" },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "Yes, there is a short test on the first day, to find the right class for you." },
          { speaker: 'David', voice: M, accent: 'en-GB', text: "Thank you very much for your help." },
          { speaker: 'Advisor', voice: W, accent: 'en-GB', text: "You are welcome, Mr Carter. We look forward to seeing you in September. Goodbye." },
          { speaker: 'David', voice: M, accent: 'en-GB', text: "Goodbye." },
        ],
      },
      groups: [
        {
          id: 'm9l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 1, number: true },
          template:
            'GREENFIELD LANGUAGE SCHOOL – ENROLMENT FORM\nName: David {{1}}\nAge: {{2}}\nFirst language: {{3}}\nCourse: {{4}} course\nDays: {{5}} and Thursdays\nCourse fee: £{{6}}',
          questions: [
            { id: 'm9l-q1', number: 1, answer: { accepted: ['Carter'] }, explanation: { text: 'The surname is spelled out: C-A-R-T-E-R.', evidence: { quote: 'C, A, R, T, E, R.' } } },
            { id: 'm9l-q2', number: 2, answer: { accepted: ['22', 'twenty-two'] }, explanation: { text: 'David is twenty-two years old.', evidence: { quote: 'I am twenty-two years old' } } },
            { id: 'm9l-q3', number: 3, answer: { accepted: ['Spanish'] }, explanation: { text: 'David\'s first language is Spanish.', evidence: { quote: 'My first language is Spanish' } } },
            { id: 'm9l-q4', number: 4, answer: { accepted: ['evening'] }, explanation: { text: 'David would like to take the evening course.', evidence: { quote: 'I would like to take the evening course' } } },
            { id: 'm9l-q5', number: 5, answer: { accepted: ['Tuesdays'] }, explanation: { text: 'The classes are on Tuesdays and Thursdays.', evidence: { quote: 'on Tuesdays and Thursdays' } } },
            { id: 'm9l-q6', number: 6, answer: { accepted: ['250', 'two hundred and fifty'] }, explanation: { text: 'The course costs two hundred and fifty pounds for ten weeks.', evidence: { quote: 'costs two hundred and fifty pounds for ten weeks' } } },
          ],
        },
        {
          id: 'm9l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm9l-q7',
              number: 7,
              prompt: 'When does the course start?',
              options: [
                { id: 'A', text: 'on the fifteenth of September' },
                { id: 'B', text: 'on the fifteenth of October' },
                { id: 'C', text: 'on the fifth of September' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The course starts on the fifteenth of September.',
                evidence: { quote: 'The course starts on the fifteenth of September.' },
              },
            },
            {
              id: 'm9l-q8',
              number: 8,
              prompt: 'What is included in the course fee?',
              options: [
                { id: 'A', text: 'all the books' },
                { id: 'B', text: 'lunch every day' },
                { id: 'C', text: 'transport to the school' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'All the books are included in the course fee.',
                evidence: { quote: 'all the books are included in the course fee' },
              },
            },
            {
              id: 'm9l-q9',
              number: 9,
              prompt: 'What can students use for free?',
              options: [
                { id: 'A', text: 'the school library' },
                { id: 'B', text: 'the computer room' },
                { id: 'C', text: 'the sports hall' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Students can use the school library for free.',
                evidence: { quote: 'you can use the school library for free' },
              },
            },
            {
              id: 'm9l-q10',
              number: 10,
              prompt: 'What happens on the first day of the course?',
              options: [
                { id: 'A', text: 'There is a short test.' },
                { id: 'B', text: 'There is a party for new students.' },
                { id: 'C', text: 'Students choose their books.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'There is a short test on the first day, to find the right class for each student.',
                evidence: { quote: 'there is a short test on the first day' },
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
      title: 'Talk by a park ranger',
      audio: {
        intro: 'Part 2. You will hear a park ranger talking to visitors in a national park. First, you have some time to look at questions 11 to 14.',
        noun: 'talk',
        ...rec('l2'),
        // Questions 11–14 are answered by line 4; the break comes before the places on the walk are described.
        sets: [
          { questions: '11 to 14', fromLine: 0 },
          { questions: '15 to 20', fromLine: 5 },
        ],
        script: [
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "Good morning, everyone, and welcome to Pinewood National Park. My name is Karen, and I am one of the park rangers here." },
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "The park was first opened in nineteen sixty-two, and it covers an area of more than two hundred square kilometres." },
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "The park is open every day from eight o'clock in the morning until six o'clock in the evening." },
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "More than a million people visit the park every year, and the most popular time to visit is in the summer." },
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "Please stay on the paths at all times, and do not feed the animals, because human food can make them ill." },
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "We will start at the visitor centre, where you can see a film about the history of the park and buy maps and guides." },
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "Next, we will walk to the lake, where you can see many different kinds of birds, including ducks and herons." },
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "After the lake, we will visit the old forest, where some of the trees are more than three hundred years old." },
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "Then we will stop at the waterfall, which is the highest waterfall in the region." },
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "From the waterfall, we will go to the mountain viewpoint, where you can see the whole park on a clear day." },
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "Finally, we will end our walk at the picnic area, where you can rest and eat your lunch." },
          { speaker: 'Ranger', voice: W, accent: 'en-AU', text: "That is the end of my talk. If you have any questions, please come and find me. Thank you, and enjoy your visit." },
        ],
      },
      groups: [
        {
          id: 'm9l-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm9l-q11',
              number: 11,
              prompt: 'When was Pinewood National Park first opened?',
              options: [
                { id: 'A', text: 'in nineteen fifty-two' },
                { id: 'B', text: 'in nineteen sixty-two' },
                { id: 'C', text: 'in nineteen seventy-two' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The park was first opened in nineteen sixty-two.',
                evidence: { quote: 'first opened in nineteen sixty-two' },
              },
            },
            {
              id: 'm9l-q12',
              number: 12,
              prompt: 'How large is the park?',
              options: [
                { id: 'A', text: 'more than one hundred square kilometres' },
                { id: 'B', text: 'more than two hundred square kilometres' },
                { id: 'C', text: 'more than three hundred square kilometres' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The park covers an area of more than two hundred square kilometres.',
                evidence: { quote: 'covers an area of more than two hundred square kilometres' },
              },
            },
            {
              id: 'm9l-q13',
              number: 13,
              prompt: 'What time does the park close in the evening?',
              options: [
                { id: 'A', text: 'at five o\'clock' },
                { id: 'B', text: 'at six o\'clock' },
                { id: 'C', text: 'at seven o\'clock' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The park is open until six o\'clock in the evening.',
                evidence: { quote: 'until six o\'clock in the evening' },
              },
            },
            {
              id: 'm9l-q14',
              number: 14,
              prompt: 'What are visitors asked not to do?',
              options: [
                { id: 'A', text: 'take photographs' },
                { id: 'B', text: 'feed the animals' },
                { id: 'C', text: 'walk on the paths' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Visitors are asked not to feed the animals, because human food can make them ill.',
                evidence: { quote: 'do not feed the animals' },
              },
            },
          ],
        },
        {
          id: 'm9l-g4',
          type: 'matching',
          instructions: 'What is said about each of the following places in the park? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 15–20.',
          optionsTitle: 'Features',
          options: [
            { id: 'A', text: 'Visitors can see a film about the history of the park and buy maps and guides.' },
            { id: 'B', text: 'Visitors can see many different kinds of birds.' },
            { id: 'C', text: 'Some of the trees here are more than three hundred years old.' },
            { id: 'D', text: 'It is the highest waterfall in the region.' },
            { id: 'E', text: 'Visitors can see the whole park on a clear day.' },
            { id: 'F', text: 'Visitors can rest and eat their lunch here.' },
            { id: 'G', text: 'It sells food from many different countries.' },
            { id: 'H', text: 'It is closed on Mondays.' },
          ],
          questions: [
            { id: 'm9l-q15', number: 15, prompt: 'Visitor centre', answer: { accepted: ['A'] }, explanation: { text: 'At the visitor centre you can see a film about the history of the park and buy maps and guides.', evidence: { quote: 'you can see a film about the history of the park and buy maps and guides' } } },
            { id: 'm9l-q16', number: 16, prompt: 'Lake', answer: { accepted: ['B'] }, explanation: { text: 'At the lake you can see many different kinds of birds.', evidence: { quote: 'you can see many different kinds of birds' } } },
            { id: 'm9l-q17', number: 17, prompt: 'Old forest', answer: { accepted: ['C'] }, explanation: { text: 'In the old forest, some of the trees are more than three hundred years old.', evidence: { quote: 'some of the trees are more than three hundred years old' } } },
            { id: 'm9l-q18', number: 18, prompt: 'Waterfall', answer: { accepted: ['D'] }, explanation: { text: 'The waterfall is the highest waterfall in the region.', evidence: { quote: 'the highest waterfall in the region' } } },
            { id: 'm9l-q19', number: 19, prompt: 'Mountain viewpoint', answer: { accepted: ['E'] }, explanation: { text: 'From the mountain viewpoint you can see the whole park on a clear day.', evidence: { quote: 'you can see the whole park on a clear day' } } },
            { id: 'm9l-q20', number: 20, prompt: 'Picnic area', answer: { accepted: ['F'] }, explanation: { text: 'At the picnic area you can rest and eat your lunch.', evidence: { quote: 'you can rest and eat your lunch' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Two students planning a debate',
      audio: {
        intro: 'Part 3. You will hear two students, Chloe and Noah, planning a debate about mobile phones in schools. First, you have some time to look at questions 21 to 25.',
        noun: 'discussion',
        ...rec('l3'),
        // Questions 21–25 are answered by line 13; the break comes before the students divide up the speaking.
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 14 },
        ],
        script: [
          { speaker: 'Chloe', voice: W, accent: 'en-GB', text: "Hi, Noah. Have you started preparing for our debate next week?" },
          { speaker: 'Noah', voice: M, accent: 'en-GB', text: "Yes, I have read the topic. We have to debate whether mobile phones should be banned in schools." },
          { speaker: 'Chloe', voice: W, accent: 'en-GB', text: "That is the topic. Which side are we on? Are we for or against the ban?" },
          { speaker: 'Noah', voice: M, accent: 'en-GB', text: "We are against the ban. We have to argue that mobile phones should not be banned in schools." },
          { speaker: 'Chloe', voice: W, accent: 'en-GB', text: "Good. What is our strongest argument?" },
          { speaker: 'Noah', voice: M, accent: 'en-GB', text: "I think our strongest argument is that phones can help students to learn, because they can look up information quickly." },
          { speaker: 'Chloe', voice: W, accent: 'en-GB', text: "I agree. What is our second argument?" },
          { speaker: 'Noah', voice: M, accent: 'en-GB', text: "Our second argument is that phones help parents to contact their children in an emergency." },
          { speaker: 'Chloe', voice: W, accent: 'en-GB', text: "That is a good point. What will the other team say?" },
          { speaker: 'Noah', voice: M, accent: 'en-GB', text: "They will probably say that phones distract students in class and stop them from learning." },
          { speaker: 'Chloe', voice: W, accent: 'en-GB', text: "Yes, and they may say that phones can be used to cheat in exams." },
          { speaker: 'Noah', voice: M, accent: 'en-GB', text: "How can we answer that? I think we can say that schools can collect phones during exams." },
          { speaker: 'Chloe', voice: W, accent: 'en-GB', text: "Good idea. How long will the debate last?" },
          { speaker: 'Noah', voice: M, accent: 'en-GB', text: "The debate will last forty minutes, and each speaker will have five minutes to speak." },
          { speaker: 'Chloe', voice: W, accent: 'en-GB', text: "Forty minutes. Who will speak first for our team?" },
          { speaker: 'Noah', voice: M, accent: 'en-GB', text: "I will speak first, and you will speak second." },
          { speaker: 'Chloe', voice: W, accent: 'en-GB', text: "What about Mia? I think she should speak last and give our final argument." },
          { speaker: 'Noah', voice: M, accent: 'en-GB', text: "Yes, and Jack can be our timekeeper and take notes during the debate." },
          { speaker: 'Chloe', voice: W, accent: 'en-GB', text: "Perfect. When shall we meet to practise? I think we should meet in the library on Monday." },
          { speaker: 'Noah', voice: M, accent: 'en-GB', text: "Good idea. I will book a study room in the library for Monday afternoon." },
        ],
      },
      groups: [
        {
          id: 'm9l-g5',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm9l-q21',
              number: 21,
              prompt: 'What is the topic of the debate?',
              options: [
                { id: 'A', text: 'whether mobile phones should be banned in schools' },
                { id: 'B', text: 'whether students should have more homework' },
                { id: 'C', text: 'whether school should start later' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The students have to debate whether mobile phones should be banned in schools.',
                evidence: { quote: 'whether mobile phones should be banned in schools' },
              },
            },
            {
              id: 'm9l-q22',
              number: 22,
              prompt: 'Which side are Chloe and Noah on in the debate?',
              options: [
                { id: 'A', text: 'They are for the ban.' },
                { id: 'B', text: 'They are against the ban.' },
                { id: 'C', text: 'They have not decided yet.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Chloe and Noah are against the ban.',
                evidence: { quote: 'We are against the ban' },
              },
            },
            {
              id: 'm9l-q23',
              number: 23,
              prompt: 'What is the students\' strongest argument?',
              options: [
                { id: 'A', text: 'Phones can help students to learn.' },
                { id: 'B', text: 'Phones are cheap to buy.' },
                { id: 'C', text: 'Phones can take good photographs.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Their strongest argument is that phones can help students to learn.',
                evidence: { quote: 'phones can help students to learn' },
              },
            },
            {
              id: 'm9l-q24',
              number: 24,
              prompt: 'What is the students\' second argument?',
              options: [
                { id: 'A', text: 'Phones help parents to contact their children in an emergency.' },
                { id: 'B', text: 'Phones help students to play games.' },
                { id: 'C', text: 'Phones help teachers to take the register.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Their second argument is that phones help parents to contact their children in an emergency.',
                evidence: { quote: 'phones help parents to contact their children in an emergency' },
              },
            },
            {
              id: 'm9l-q25',
              number: 25,
              prompt: 'How long will the debate last?',
              options: [
                { id: 'A', text: 'twenty minutes' },
                { id: 'B', text: 'forty minutes' },
                { id: 'C', text: 'sixty minutes' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The debate will last forty minutes.',
                evidence: { quote: 'The debate will last forty minutes' },
              },
            },
          ],
        },
        {
          id: 'm9l-g6',
          type: 'matching',
          instructions: 'What was agreed about each part of the debate plan? Choose FIVE answers from the box and write the correct letter, A–F, next to Questions 26–30.',
          optionsTitle: 'Decisions',
          options: [
            { id: 'A', text: 'He will speak first.' },
            { id: 'B', text: 'She will speak second.' },
            { id: 'C', text: 'She will speak last and give the final argument.' },
            { id: 'D', text: 'He will be the timekeeper and take notes during the debate.' },
            { id: 'E', text: 'The students will meet in the library on Monday.' },
            { id: 'F', text: 'She will write about ocean currents.' },
          ],
          questions: [
            { id: 'm9l-q26', number: 26, prompt: 'Noah', answer: { accepted: ['A'] }, explanation: { text: 'Noah will speak first.', evidence: { quote: 'I will speak first' } } },
            { id: 'm9l-q27', number: 27, prompt: 'Chloe', answer: { accepted: ['B'] }, explanation: { text: 'Chloe will speak second.', evidence: { quote: 'you will speak second' } } },
            { id: 'm9l-q28', number: 28, prompt: 'Mia', answer: { accepted: ['C'] }, explanation: { text: 'Mia will speak last and give the final argument.', evidence: { quote: 'she should speak last and give our final argument' } } },
            { id: 'm9l-q29', number: 29, prompt: 'Jack', answer: { accepted: ['D'] }, explanation: { text: 'Jack will be the timekeeper and take notes during the debate.', evidence: { quote: 'Jack can be our timekeeper and take notes during the debate' } } },
            { id: 'm9l-q30', number: 30, prompt: 'practising for the debate', answer: { accepted: ['E'] }, explanation: { text: 'The students will meet in the library on Monday to practise.', evidence: { quote: 'we should meet in the library on Monday' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Lecture: climate change and the oceans',
      audio: {
        intro: 'Part 4. You will hear a lecture about climate change and the oceans. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Good afternoon. Today I am going to talk about climate change and the oceans, and about how the two are connected." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "The oceans cover about seventy-one per cent of the surface of the Earth, and they hold about ninety-seven per cent of all the water on the planet." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "The oceans have taken in about ninety per cent of the extra heat from global warming, and this has made the water warmer." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Warmer water can hold less oxygen, and this makes life harder for many kinds of fish." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "The oceans have also taken in about a quarter of the carbon dioxide that people have put into the air." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "When carbon dioxide mixes with sea water, it makes the water more acidic, and this can damage coral reefs and shellfish." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "As the water gets warmer, it also takes up more space, and this is one reason why the level of the sea is rising." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Scientists say that the level of the sea has risen by about twenty centimetres since nineteen hundred, and it may rise by another metre by the year twenty-one hundred." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Rising sea levels are a danger to people who live near the coast, and about six hundred million people live in low coastal areas." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "There are two main things we can do: we can reduce the amount of carbon dioxide we produce, and we can protect coastal areas such as mangrove forests." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In conclusion, the oceans are not separate from the climate: they are part of it, and looking after them is part of looking after our planet. That brings us to the end of the lecture." },
        ],
      },
      groups: [
        {
          id: 'm9l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'CLIMATE CHANGE AND THE OCEANS\nThe oceans\n• the oceans cover about {{31}} per cent of the surface of the Earth\n• the oceans hold about {{32}} per cent of all the water on the planet\n• the oceans have taken in about {{33}} per cent of the extra heat from global warming\nEffects\n• warmer water can hold less {{34}}\n• carbon dioxide makes the water more {{35}}\n• this can damage coral {{36}} and shellfish\nSea levels\n• the sea level has risen by about {{37}} centimetres since nineteen hundred\n• it may rise by another {{38}} by the year twenty-one hundred\n• about {{39}} million people live in low coastal areas\nAction\n• protect coastal areas such as mangrove {{40}}',
          questions: [
            { id: 'm9l-q31', number: 31, answer: { accepted: ['71', 'seventy-one'] }, explanation: { text: 'The oceans cover about seventy-one per cent of the surface of the Earth.', evidence: { quote: 'cover about seventy-one per cent of the surface of the Earth' } } },
            { id: 'm9l-q32', number: 32, answer: { accepted: ['97', 'ninety-seven'] }, explanation: { text: 'The oceans hold about ninety-seven per cent of all the water on the planet.', evidence: { quote: 'hold about ninety-seven per cent of all the water on the planet' } } },
            { id: 'm9l-q33', number: 33, answer: { accepted: ['90', 'ninety'] }, explanation: { text: 'The oceans have taken in about ninety per cent of the extra heat from global warming.', evidence: { quote: 'taken in about ninety per cent of the extra heat' } } },
            { id: 'm9l-q34', number: 34, answer: { accepted: ['oxygen'] }, explanation: { text: 'Warmer water can hold less oxygen.', evidence: { quote: 'Warmer water can hold less oxygen' } } },
            { id: 'm9l-q35', number: 35, answer: { accepted: ['acidic'] }, explanation: { text: 'Carbon dioxide makes the water more acidic.', evidence: { quote: 'makes the water more acidic' } } },
            { id: 'm9l-q36', number: 36, answer: { accepted: ['reefs'] }, explanation: { text: 'More acidic water can damage coral reefs and shellfish.', evidence: { quote: 'damage coral reefs and shellfish' } } },
            { id: 'm9l-q37', number: 37, answer: { accepted: ['20', 'twenty'] }, explanation: { text: 'The sea level has risen by about twenty centimetres since nineteen hundred.', evidence: { quote: 'risen by about twenty centimetres since nineteen hundred' } } },
            { id: 'm9l-q38', number: 38, answer: { accepted: ['metre'] }, explanation: { text: 'The sea level may rise by another metre by the year twenty-one hundred.', evidence: { quote: 'rise by another metre by the year twenty-one hundred' } } },
            { id: 'm9l-q39', number: 39, answer: { accepted: ['600', 'six hundred'] }, explanation: { text: 'About six hundred million people live in low coastal areas.', evidence: { quote: 'about six hundred million people live in low coastal areas' } } },
            { id: 'm9l-q40', number: 40, answer: { accepted: ['forests'] }, explanation: { text: 'We can protect coastal areas such as mangrove forests.', evidence: { quote: 'protect coastal areas such as mangrove forests' } } },
          ],
        },
      ],
    },
  ],
};
