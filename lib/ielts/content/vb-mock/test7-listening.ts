import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 7 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material.
 *
 * Content: booking a weekend photography workshop (Part 1), a visit to the
 * Greenfield Science Centre (Part 2), students discussing a presentation on
 * urban cycling (Part 3), lecture on the formation and importance of
 * limestone (Part 4).
 *
 * CONTENT ISSUE — reported, implemented as supplied (do not silently change):
 * Section 4 Q35 and Q36 BOTH have the answer "cement" (Q35: minerals act as
 * a natural cement; Q36: limestone in the production of cement). The
 * package's own QC checklist claims "No accidental answer duplication in
 * Section 4", which is wrong. Both answers are correct per the transcript,
 * so both were implemented exactly as supplied; Kayes/ChatGPT to decide
 * whether Q36 should change.
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
      title: 'Booking a weekend photography workshop',
      audio: {
        intro: 'Part 1. You will hear a woman phoning a community centre to book a place on a photography workshop. First, you have some time to look at questions 1 to 10.',
        noun: 'conversation',
        ...rec('l1'),
        // Questions 1–5 are answered by line 11; the break comes before the workshop details.
        sets: [
          { questions: '1 to 5', fromLine: 0 },
          { questions: '6 to 10', fromLine: 12 },
        ],
        script: [
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: 'Good morning, Riverside Community Centre. How can I help?' },
          { speaker: 'Customer', voice: W, accent: 'en-GB', text: "Hello. I'm calling about the weekend photography workshop. I'd like to book a place." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Certainly. I'll take a few details. Could I have your surname first?" },
          { speaker: 'Customer', voice: W, accent: 'en-GB', text: "Brooks. That's B-R-O-O-K-S." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Thank you, Ms Brooks. And what's the best contact number?" },
          { speaker: 'Customer', voice: W, accent: 'en-GB', text: "It's 07841 5928. Sorry, I should say the full number is 07841 5928 16." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Right, I've got that. Which date would you prefer? We have two Saturday sessions available." },
          { speaker: 'Customer', voice: W, accent: 'en-GB', text: 'The fourteenth of May, please.' },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: 'Fine. And are you interested in general photography or a particular subject?' },
          { speaker: 'Customer', voice: W, accent: 'en-GB', text: "I'd prefer nature photography. I've recently become interested in taking pictures of birds and plants." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: 'Excellent. Have you attended a photography course before?' },
          { speaker: 'Customer', voice: W, accent: 'en-GB', text: "No, this will be my first one. I've used my phone camera quite a lot, but I wouldn't call that proper experience." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "That's absolutely fine. It's designed for beginners. The workshop starts at half past nine in the morning. Please arrive about fifteen minutes earlier." },
          { speaker: 'Customer', voice: W, accent: 'en-GB', text: 'Okay. Is there anything I need to bring?' },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "You should bring a notebook. We'll provide the cameras and other equipment, so there's no need to bring a tripod or a laptop." },
          { speaker: 'Customer', voice: W, accent: 'en-GB', text: 'Great. Where should I go when I arrive?' },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "The group will meet outside the café. It's just to the left of the main reception." },
          { speaker: 'Customer', voice: W, accent: 'en-GB', text: 'I see. And how much do I need to pay?' },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "The total fee is forty pounds. You'll need to pay ten pounds now to confirm your booking. You can pay the remaining thirty pounds on the day, either by card or in cash." },
          { speaker: 'Customer', voice: W, accent: 'en-GB', text: "That's convenient. And do we receive anything afterwards?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Yes. We'll send you a digital collection of photographs taken during the workshop. You can download them from our website." },
          { speaker: 'Customer', voice: W, accent: 'en-GB', text: "Wonderful. I'd like to book my place, then." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "No problem. I'll send you a confirmation email shortly." },
        ],
      },
      groups: [
        {
          id: 'm7l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          wordLimit: { words: 2, number: true },
          template:
            'Weekend Photography Workshop — Registration Form\nSurname: {{1}}\nContact number: {{2}}\nPreferred date: {{3}}\nWorkshop subject: {{4}}\nPrevious experience: {{5}}',
          questions: [
            { id: 'm7l-q1', number: 1, answer: { accepted: ['Brooks'] }, explanation: { text: 'The surname is spelled out: B-R-O-O-K-S.', evidence: { quote: "Brooks. That's B-R-O-O-K-S." } } },
            {
              id: 'm7l-q2',
              number: 2,
              answer: { accepted: ['07841 5928 16', '07841592816'] },
              explanation: { text: 'The customer first gives a shortened number, then corrects it: the full number is 07841 5928 16. The shortened number is not accepted.', evidence: { quote: 'the full number is 07841 5928 16' } },
            },
            {
              id: 'm7l-q3',
              number: 3,
              answer: { accepted: ['14 May', '14th May', '14'] },
              explanation: { text: 'The customer chooses the fourteenth of May.', evidence: { quote: 'The fourteenth of May, please.' } },
            },
            {
              id: 'm7l-q4',
              number: 4,
              answer: { accepted: ['Nature photography'] },
              explanation: { text: 'The customer prefers nature photography, taking pictures of birds and plants.', evidence: { quote: "I'd prefer nature photography." } },
            },
            {
              id: 'm7l-q5',
              number: 5,
              answer: { accepted: ['First-time', 'No experience'] },
              explanation: { text: 'This is her first photography course; she has only used a phone camera and would not call that proper experience.', evidence: { quote: 'this will be my first one' } },
            },
          ],
        },
        {
          id: 'm7l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm7l-q6',
              number: 6,
              prompt: 'What time does the workshop begin?',
              options: [
                { id: 'A', text: '9:00 a.m.' },
                { id: 'B', text: '9:30 a.m.' },
                { id: 'C', text: '10:00 a.m.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The workshop starts at half past nine; participants should arrive about fifteen minutes earlier.',
                evidence: { quote: 'The workshop starts at half past nine in the morning.' },
                distractors: { A: 'Nine o’clock is not mentioned; arriving fifteen minutes early would be 9:15.' },
              },
            },
            {
              id: 'm7l-q7',
              number: 7,
              prompt: 'What should participants bring?',
              options: [
                { id: 'A', text: 'A notebook' },
                { id: 'B', text: 'A laptop' },
                { id: 'C', text: 'A tripod' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Participants should bring a notebook; cameras and other equipment are provided, so there is no need for a tripod or a laptop.',
                evidence: { quote: 'You should bring a notebook.' },
                distractors: { B: 'There is no need to bring a laptop.', C: 'There is no need to bring a tripod.' },
              },
            },
            {
              id: 'm7l-q8',
              number: 8,
              prompt: 'Where will the group meet?',
              options: [
                { id: 'A', text: 'At the main reception' },
                { id: 'B', text: 'Outside the café' },
                { id: 'C', text: 'In the garden' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The group will meet outside the café, just to the left of the main reception.',
                evidence: { quote: 'The group will meet outside the café.' },
                distractors: { A: 'The café is just to the left of the main reception, not the meeting point itself.' },
              },
            },
            {
              id: 'm7l-q9',
              number: 9,
              prompt: 'How can participants pay the remaining fee?',
              options: [
                { id: 'A', text: 'By bank transfer only' },
                { id: 'B', text: 'By card or cash' },
                { id: 'C', text: 'In cash only' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The remaining thirty pounds can be paid on the day, either by card or in cash.',
                evidence: { quote: 'You can pay the remaining thirty pounds on the day, either by card or in cash.' },
              },
            },
            {
              id: 'm7l-q10',
              number: 10,
              prompt: 'What will participants receive after the workshop?',
              options: [
                { id: 'A', text: 'A printed certificate' },
                { id: 'B', text: 'A free camera' },
                { id: 'C', text: 'A digital collection of photographs' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'Participants receive a digital collection of photographs taken during the workshop, downloadable from the website.',
                evidence: { quote: "We'll send you a digital collection of photographs taken during the workshop." },
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
      title: 'A visit to the Greenfield Science Centre',
      audio: {
        intro: 'Part 2. You will hear a guide introducing visitors to a science centre. First, you have some time to look at questions 11 to 20.',
        noun: 'talk',
        ...rec('l2'),
        // Questions 11–15 are answered by line 5; the break comes before the activities are described.
        sets: [
          { questions: '11 to 15', fromLine: 0 },
          { questions: '16 to 20', fromLine: 6 },
        ],
        script: [
          { speaker: 'Guide', voice: M, accent: 'en-GB', text: "Welcome to the Greenfield Science Centre. I'm pleased to see so many visitors here today. Before you explore the building, I'd like to explain a few things about our new exhibition." },
          { speaker: 'Guide', voice: M, accent: 'en-GB', text: "The exhibition is called Science Around Us. Its main purpose is to show how everyday technology works. You'll see how familiar objects, from mobile phones to household appliances, use scientific principles. We do have some historical equipment on display, but that's not the main focus. We also hope the exhibition will encourage curiosity about science, although it isn't specifically a careers event." },
          { speaker: 'Guide', voice: M, accent: 'en-GB', text: "Families with young children often ask which exhibit they should visit first. I'd recommend the water-play table. Children can experiment with floating objects and different water levels. The sound laboratory is interesting too, but some of its activities require more concentration. The planetarium is popular with older children and adults." },
          { speaker: 'Guide', voice: M, accent: 'en-GB', text: "Our live science demonstration takes place at half past eleven. It lasts about twenty minutes, and you don't need to book in advance. Please arrive a few minutes early if you want a seat." },
          { speaker: 'Guide', voice: M, accent: 'en-GB', text: "There are just two important rules. Visitors can take photographs in the entrance hall, but food and drinks must not be taken into the exhibition rooms. You're welcome to ask questions during demonstrations, and our staff are happy to explain anything you find difficult." },
          { speaker: 'Guide', voice: M, accent: 'en-GB', text: "Before you start exploring, please collect a free activity sheet from the information desk. It contains small challenges to complete as you move around the centre. There's an introductory video near the entrance, but watching it is optional. You can also book a planetarium session later if you wish." },
          { speaker: 'Guide', voice: M, accent: 'en-GB', text: 'Now, let me explain where to find some of the activities.' },
          { speaker: 'Guide', voice: M, accent: 'en-GB', text: 'If you’d like to build a simple electric circuit, go to the Discovery Workshop. Staff there will help you connect wires, batteries and small bulbs.' },
          { speaker: 'Guide', voice: M, accent: 'en-GB', text: 'The Space Gallery is on the first floor. It contains models of planets and information about objects beyond our solar system.' },
          { speaker: 'Guide', voice: M, accent: 'en-GB', text: 'For anyone interested in music, the Sound Lab is the right place. You can experiment with different instruments and discover how pitch changes when sound is produced.' },
          { speaker: 'Guide', voice: M, accent: 'en-GB', text: 'The Energy Room contains working examples of solar panels and other renewable energy systems. You can see how sunlight is converted into electricity.' },
          { speaker: 'Guide', voice: M, accent: 'en-GB', text: "Finally, if you need information about wheelchair access, quiet spaces or other facilities, please speak to someone at the Information Desk. They'll be able to help you plan your visit." },
          { speaker: 'Guide', voice: M, accent: 'en-GB', text: 'Enjoy your time at the centre.' },
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
              prompt: "What is the main purpose of the science centre's new exhibition?",
              options: [
                { id: 'A', text: 'To explain how everyday technology works' },
                { id: 'B', text: 'To display historical scientific equipment' },
                { id: 'C', text: 'To promote careers in engineering' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The exhibition, Science Around Us, shows how everyday technology works; historical equipment is on display but is not the main focus, and it is not specifically a careers event.',
                evidence: { quote: 'Its main purpose is to show how everyday technology works.' },
                distractors: { B: 'Some historical equipment is on display, but that is not the main focus.', C: 'The exhibition is not specifically a careers event.' },
              },
            },
            {
              id: 'm7l-q12',
              number: 12,
              prompt: 'Which exhibit is especially suitable for young children?',
              options: [
                { id: 'A', text: 'The sound laboratory' },
                { id: 'B', text: 'The water-play table' },
                { id: 'C', text: 'The planetarium' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The guide recommends the water-play table for young children; the sound laboratory needs more concentration and the planetarium suits older children and adults.',
                evidence: { quote: "I'd recommend the water-play table." },
                distractors: { A: 'Some sound laboratory activities require more concentration.', C: 'The planetarium is popular with older children and adults.' },
              },
            },
            {
              id: 'm7l-q13',
              number: 13,
              prompt: 'When does the live science demonstration take place?',
              options: [
                { id: 'A', text: '11:00 a.m.' },
                { id: 'B', text: '11:30 a.m.' },
                { id: 'C', text: '12:00 noon' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The live science demonstration takes place at half past eleven and lasts about twenty minutes.',
                evidence: { quote: 'Our live science demonstration takes place at half past eleven.' },
              },
            },
            {
              id: 'm7l-q14',
              number: 14,
              prompt: 'What are visitors not allowed to do?',
              options: [
                { id: 'A', text: 'Take photographs in the entrance hall' },
                { id: 'B', text: 'Bring food into the exhibition rooms' },
                { id: 'C', text: 'Ask questions during demonstrations' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Food and drinks must not be taken into the exhibition rooms; photographs in the entrance hall are allowed and questions during demonstrations are welcome.',
                evidence: { quote: 'food and drinks must not be taken into the exhibition rooms' },
                distractors: { A: 'Visitors can take photographs in the entrance hall.', C: 'Visitors are welcome to ask questions during demonstrations.' },
              },
            },
            {
              id: 'm7l-q15',
              number: 15,
              prompt: 'What does the centre recommend visitors do first?',
              options: [
                { id: 'A', text: 'Collect a free activity sheet' },
                { id: 'B', text: 'Watch the introductory video' },
                { id: 'C', text: 'Book a place for the planetarium' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Before exploring, visitors should collect a free activity sheet from the information desk; the video is optional and the planetarium can be booked later.',
                evidence: { quote: 'please collect a free activity sheet from the information desk' },
                distractors: { B: 'Watching the introductory video is optional.', C: 'You can book a planetarium session later if you wish.' },
              },
            },
          ],
        },
        {
          id: 'm7l-g4',
          type: 'matching',
          instructions: 'Which area of the science centre should visitors go to for each activity? Choose the correct letter, A–F.',
          optionsTitle: 'Areas',
          options: [
            { id: 'A', text: 'Energy Room' },
            { id: 'B', text: 'Space Gallery' },
            { id: 'C', text: 'Discovery Workshop' },
            { id: 'D', text: 'Sound Lab' },
            { id: 'E', text: 'Outdoor Garden' },
            { id: 'F', text: 'Information Desk' },
          ],
          questions: [
            { id: 'm7l-q16', number: 16, prompt: 'Build a simple electric circuit', answer: { accepted: ['C'] }, explanation: { text: 'The Discovery Workshop is where visitors build a simple electric circuit.', evidence: { quote: 'If you’d like to build a simple electric circuit, go to the Discovery Workshop.' } } },
            { id: 'm7l-q17', number: 17, prompt: 'Learn about distant planets', answer: { accepted: ['B'] }, explanation: { text: 'The Space Gallery contains models of planets and information about objects beyond our solar system.', evidence: { quote: 'The Space Gallery is on the first floor. It contains models of planets' } } },
            { id: 'm7l-q18', number: 18, prompt: 'Explore how different musical notes are produced', answer: { accepted: ['D'] }, explanation: { text: 'The Sound Lab is where visitors experiment with instruments and discover how pitch changes.', evidence: { quote: 'the Sound Lab is the right place. You can experiment with different instruments and discover how pitch changes' } } },
            { id: 'm7l-q19', number: 19, prompt: 'Observe how solar panels work', answer: { accepted: ['A'] }, explanation: { text: 'The Energy Room contains working examples of solar panels.', evidence: { quote: 'The Energy Room contains working examples of solar panels' } } },
            { id: 'm7l-q20', number: 20, prompt: 'Get information about accessibility', answer: { accepted: ['F'] }, explanation: { text: 'Information about wheelchair access, quiet spaces and other facilities is available at the Information Desk.', evidence: { quote: "please speak to someone at the Information Desk. They'll be able to help you plan your visit." } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Discussing a presentation on urban cycling',
      audio: {
        intro: 'Part 3. You will hear two university students, Maya and Daniel, discussing a presentation on urban cycling. First, you have some time to look at questions 21 to 30.',
        noun: 'discussion',
        ...rec('l3'),
        // Questions 21–25 are answered by line 13; the break comes before the tasks are divided up.
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 14 },
        ],
        script: [
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: 'Have you looked at the survey results yet, Daniel?' },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "Yes, I went through them this morning. I think we've got enough information for the presentation now." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "Good. I was worried we'd need to collect more responses. So, let's make sure we're clear about the main focus. We're looking at cycling in cities, aren't we?" },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "Exactly. Not just the advantages, but also the challenges people face. We can discuss health benefits and environmental effects, but we also need to explain why some people don't feel comfortable cycling." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "That makes sense. I was thinking we could start with the cost of buying a bicycle, but perhaps that's too narrow." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "I agree. Our survey actually gave us something more interesting. A lot of students said they'd consider cycling if the routes were safer. That seems more relevant to our topic." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "Yes, I noticed that too. I expected more people to say they didn't have enough money for a bicycle." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "We did collect some information about bicycle prices, but I don't think we should compare them. The problem was that the information was difficult to collect consistently. Some shops included accessories in their prices, while others didn't." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "Right, so the comparison wouldn't be very reliable. Let's leave that out." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'What if we include a short video showing one of the cycling routes near the university?' },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: 'That could work. It would make the presentation more interesting than just showing statistics.' },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'Exactly. We could show the cycle lane near the library and then the section where cyclists have to share the road with cars.' },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "I like that. My main concern is the survey results, though. We've got several different responses, and I'm not sure how to make them easy for the audience to understand." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'We could organise them into a simple chart. That should make the main findings clearer.' },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "Good idea. Let's divide the tasks. I'll contact the university transport office to ask whether they have any information about the cycle routes." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "Fine. I'll organise the survey results into a chart." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: 'And I’ll write the introduction. I can explain why cycling is becoming an important issue for university students.' },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'That leaves the final checks. We should both check the presentation for mistakes before we submit it.' },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: 'Definitely. We should also practise answering possible questions. The tutor might ask us why we chose certain survey questions.' },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "Agreed. We can practise together after we've finished the slides." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "Let's meet on Thursday afternoon, then." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'Perfect. That should give us enough time.' },
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
              prompt: "What is the main focus of the students' presentation?",
              options: [
                { id: 'A', text: 'The cost of buying bicycles' },
                { id: 'B', text: 'The benefits and challenges of cycling in cities' },
                { id: 'C', text: 'The history of bicycle design' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The presentation looks at cycling in cities — both the advantages and the challenges people face.',
                evidence: { quote: "We're looking at cycling in cities, aren't we?" },
                distractors: { A: 'Starting with the cost of buying a bicycle is considered too narrow.' },
              },
            },
            {
              id: 'm7l-q22',
              number: 22,
              prompt: 'What did the students discover from their initial survey?',
              options: [
                { id: 'A', text: 'Most students cycle every day' },
                { id: 'B', text: 'Many students would consider cycling if routes were safer' },
                { id: 'C', text: 'Students prefer buses to all other forms of transport' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'A lot of students said they would consider cycling if the routes were safer.',
                evidence: { quote: "A lot of students said they'd consider cycling if the routes were safer." },
              },
            },
            {
              id: 'm7l-q23',
              number: 23,
              prompt: 'Why did they decide not to compare bicycle prices?',
              options: [
                { id: 'A', text: 'The information was difficult to collect' },
                { id: 'B', text: 'Their tutor advised them to avoid it' },
                { id: 'C', text: 'The prices were almost identical' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Price information was difficult to collect consistently — some shops included accessories, others did not — so the comparison would not be reliable.',
                evidence: { quote: 'The problem was that the information was difficult to collect consistently.' },
              },
            },
            {
              id: 'm7l-q24',
              number: 24,
              prompt: 'What does Daniel suggest they include in the presentation?',
              options: [
                { id: 'A', text: 'A short video showing a cycling route' },
                { id: 'B', text: 'A list of bicycle repair shops' },
                { id: 'C', text: 'An interview with a professional cyclist' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Daniel suggests including a short video showing one of the cycling routes near the university.',
                evidence: { quote: 'What if we include a short video showing one of the cycling routes near the university?' },
              },
            },
            {
              id: 'm7l-q25',
              number: 25,
              prompt: 'What is Maya concerned about?',
              options: [
                { id: 'A', text: 'Having too many slides' },
                { id: 'B', text: 'Finishing the presentation before the deadline' },
                { id: 'C', text: 'Making the survey results understandable' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: "Maya's main concern is the survey results — several different responses that may be hard for the audience to understand.",
                evidence: { quote: "I'm not sure how to make them easy for the audience to understand." },
              },
            },
          ],
        },
        {
          id: 'm7l-g6',
          type: 'matching',
          instructions: 'Who will be responsible for each task? Choose the correct letter, A, B or C.',
          optionsTitle: 'Responsibility',
          options: [
            { id: 'A', text: 'Maya' },
            { id: 'B', text: 'Daniel' },
            { id: 'C', text: 'Both students' },
          ],
          questions: [
            { id: 'm7l-q26', number: 26, prompt: 'Contact the university transport office', answer: { accepted: ['A'] }, explanation: { text: 'Maya will contact the university transport office about the cycle routes.', evidence: { quote: "I'll contact the university transport office" } } },
            { id: 'm7l-q27', number: 27, prompt: 'Organise the survey results into a chart', answer: { accepted: ['B'] }, explanation: { text: 'Daniel will organise the survey results into a chart.', evidence: { quote: "I'll organise the survey results into a chart." } } },
            { id: 'm7l-q28', number: 28, prompt: 'Write the introduction', answer: { accepted: ['A'] }, explanation: { text: 'Maya will write the introduction.', evidence: { quote: "And I’ll write the introduction." } } },
            { id: 'm7l-q29', number: 29, prompt: 'Check the final presentation for mistakes', answer: { accepted: ['C'] }, explanation: { text: 'They should both check the presentation for mistakes before submitting it.', evidence: { quote: 'We should both check the presentation for mistakes before we submit it.' } } },
            { id: 'm7l-q30', number: 30, prompt: 'Practise answering possible questions', answer: { accepted: ['C'] }, explanation: { text: 'They agree to practise answering possible questions together after finishing the slides.', evidence: { quote: "We can practise together after we've finished the slides." } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'The formation and importance of limestone',
      audio: {
        intro: 'Part 4. You will hear a lecture about the formation and importance of limestone. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "Today we're going to look at limestone, a common natural rock that has many uses in modern society." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: 'Limestone is mainly formed from the remains of sea organisms. Many small marine animals and plants have hard outer shells or skeletons. When these organisms die, their remains gradually collect on the seabed. Over thousands or even millions of years, additional material covers them.' },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: 'As more layers build up, the lower layers are compressed by the weight of the material above them. This process helps turn loose deposits into solid rock. Minerals in the surrounding water can also act as a natural cement, joining the small pieces together. The result is limestone.' },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: 'The appearance of limestone can vary. Some types are light grey or white, while others have a darker colour because of the minerals they contain. In certain areas, limestone contains visible fossils, which provide evidence of ancient marine life.' },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: 'Limestone has several important uses. One of the largest is cement production. When limestone is heated with other materials, it becomes part of the process used to manufacture cement. Cement is then used to make concrete for buildings, bridges and other structures.' },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: 'Limestone is also used in road construction and in the building of bridges. It can be crushed into smaller pieces and used as a construction material. In some places, it is also used in agriculture to improve certain types of soil.' },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: 'However, extracting limestone can have environmental consequences. The process of removing it from the ground is called quarrying. Large quarries can change the appearance of the landscape and affect nearby habitats.' },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: 'Another concern is soil erosion. When vegetation is removed and the ground is disturbed, heavy rainfall may wash away exposed soil. Dust and noise from machinery can also affect nearby communities.' },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: 'For these reasons, companies should take responsibility for restoring damaged sites. Environmental conservation should be considered throughout the quarrying process, not simply after the work has ended. Some former quarries can even be transformed into nature areas or recreational spaces.' },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: 'Limestone is a valuable resource, but its extraction needs to be managed carefully so that its benefits do not come at an unnecessary environmental cost.' },
        ],
      },
      groups: [
        {
          id: 'm7l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write NO MORE THAN TWO WORDS for each answer.',
          wordLimit: { words: 2 },
          template:
            'Limestone: A Natural Rock\nHow it forms\n• Limestone is mainly made from the remains of sea {{31}}.\n• Many of these organisms have hard outer {{32}}.\n• Their remains collect on the {{33}} of ancient seas.\n• Over long periods, layers are compressed by the weight of additional {{34}}.\n• Minerals can act as a natural {{35}}, joining the material together.\nUses of limestone\n• Limestone is an important raw material in the production of {{36}}.\n• It is also used in the construction of roads and {{37}}.\nEnvironmental concerns\n• Removing limestone from the ground is known as {{38}}.\n• Heavy rainfall can increase the risk of soil {{39}} near a quarry.\n• Restoring damaged sites is an important part of environmental {{40}}.',
          questions: [
            { id: 'm7l-q31', number: 31, answer: { accepted: ['organisms'] }, explanation: { text: 'Limestone is mainly formed from the remains of sea organisms.', evidence: { quote: 'Limestone is mainly formed from the remains of sea organisms.' } } },
            { id: 'm7l-q32', number: 32, answer: { accepted: ['shells'] }, explanation: { text: 'Many small marine animals and plants have hard outer shells or skeletons.', evidence: { quote: 'have hard outer shells or skeletons' } } },
            { id: 'm7l-q33', number: 33, answer: { accepted: ['seabed'] }, explanation: { text: 'When the organisms die, their remains gradually collect on the seabed.', evidence: { quote: 'their remains gradually collect on the seabed' } } },
            { id: 'm7l-q34', number: 34, answer: { accepted: ['material'] }, explanation: { text: 'The lower layers are compressed by the weight of the material above them.', evidence: { quote: 'compressed by the weight of the material above them' } } },
            // Q35 and Q36 both have the answer "cement" — see the file header. Both are correct per the transcript and are implemented as supplied.
            { id: 'm7l-q35', number: 35, answer: { accepted: ['cement'] }, explanation: { text: 'Minerals in the surrounding water can act as a natural cement, joining the small pieces together.', evidence: { quote: 'act as a natural cement' } } },
            { id: 'm7l-q36', number: 36, answer: { accepted: ['cement'] }, explanation: { text: 'One of the largest uses of limestone is cement production.', evidence: { quote: 'One of the largest is cement production.' } } },
            { id: 'm7l-q37', number: 37, answer: { accepted: ['bridges'] }, explanation: { text: 'Limestone is used in road construction and in the building of bridges.', evidence: { quote: 'Limestone is also used in road construction and in the building of bridges.' } } },
            { id: 'm7l-q38', number: 38, answer: { accepted: ['quarrying'] }, explanation: { text: 'The process of removing limestone from the ground is called quarrying.', evidence: { quote: 'The process of removing it from the ground is called quarrying.' } } },
            { id: 'm7l-q39', number: 39, answer: { accepted: ['erosion'] }, explanation: { text: 'Soil erosion is a concern when vegetation is removed and heavy rainfall washes away exposed soil.', evidence: { quote: 'Another concern is soil erosion.' } } },
            { id: 'm7l-q40', number: 40, answer: { accepted: ['conservation'] }, explanation: { text: 'Environmental conservation should be considered throughout the quarrying process.', evidence: { quote: 'Environmental conservation should be considered throughout the quarrying process' } } },
          ],
        },
      ],
    },
  ],
};
