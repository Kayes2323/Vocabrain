import type { ObjectiveSection } from '../../model';

/**
 * Vocab Brain Academic Mock Test 1 — Listening. Original content written for
 * Vocab Brain in the style and difficulty of the IELTS Listening test
 * (4 parts, 40 questions). Not Cambridge material.
 */
const W = 'female' as const;
const M = 'male' as const;

export const mock1Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Short course enrolment',
      audio: {
        intro: 'Part 1. You will hear a man phoning a college to enrol on a short course. First, you have some time to look at questions 1 to 10.',
        script: [
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: 'Good morning, Hartley Community College, enrolment office. How can I help?' },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "Hi. I'd like to sign up for one of your summer courses, the one on digital photography." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Certainly. There are still a few places left. Can I take your name first?" },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "Yes, it's Daniel Ferreira." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: 'Could you spell your surname for me?' },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "Sure. F, E, double R, E, I, R, A." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: 'Thank you. And your address?' },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "It's 27 Castleton Road. That's C, A, S, T, L, E, T, O, N. In Milbrook." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: 'Lovely. And a phone number we can reach you on?' },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "My home number is changing next week, so it's better to use my mobile. That's 0 7 7 2 3, 4 1 9, 8 5 6." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "0 7 7 2 3, 4 1 9, 8 5 6. Great. Now, the course was originally going to begin on the seventh of July, but the tutor is away that week, so the first session is now on the fourteenth." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "The fourteenth of July. That's fine. And is it still on Tuesday evenings? That's what the leaflet said." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "It was Tuesdays last year, but this year all the sessions are on Wednesday evenings, from seven until nine." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'Wednesdays suit me better, actually. Where does it take place? In the main hall?' },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "No, the main hall is being repainted over the summer. You'll be in the library building, room twelve, on the first floor." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'OK. And how much does the course cost?' },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "The full fee is two hundred and ten pounds for non-residents, but as you live in Milbrook you pay the local rate, which is one hundred and eighty-five. That includes all the printing and materials." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'Great. Are there any discounts? A friend mentioned something about that.' },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "We used to offer one to anyone over sixty, but now the only discount is for students in full-time education. Are you a student?" },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "Unfortunately not, I finished university last year. Is there anything I need to bring?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "A camera with manual settings, of course. We provide memory cards, but you'll need to bring your own tripod, because some of the evening sessions are outdoors in low light." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "I've got one of those. Great." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Lastly, we always ask people how they heard about the course. Was it our website?" },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "My friend told me the college runs courses, but it was an advertisement on the radio that actually mentioned photography." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "The radio, OK. That's everything. We'll send a confirmation text to your mobile today." },
        ],
      },
      groups: [
        {
          id: 'l1-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 1, number: true },
          template:
            'HARTLEY COMMUNITY COLLEGE – SHORT COURSE ENROLMENT\nCourse: Digital Photography\nName: Daniel {{1}}\nAddress: 27 {{2}} Road, Milbrook\nMobile: {{3}}\nFirst session: {{4}} July\nSessions held on: {{5}} evenings, 7–9 pm\nLocation: the {{6}} building, Room 12\nCost: £{{7}} (includes materials)\nDiscount available for: {{8}} in full-time education\nStudents must bring: a {{9}}\nHeard about the course from: the {{10}}',
          questions: [
            { id: 'l1-q1', number: 1, answer: { accepted: ['Ferreira'] }, explanation: { text: 'The surname is spelled out: F-E-double R-E-I-R-A.', evidence: { quote: 'F, E, double R, E, I, R, A.' } } },
            { id: 'l1-q2', number: 2, answer: { accepted: ['Castleton'] }, explanation: { text: 'The road name is spelled out.', evidence: { quote: "27 Castleton Road. That's C, A, S, T, L, E, T, O, N." } } },
            {
              id: 'l1-q3',
              number: 3,
              answer: { accepted: ['07723 419856', '07723419856', '07723 419 856', '0772 3419856'] },
              explanation: { text: 'Daniel gives his mobile, not his home number, because the home number is changing.', evidence: { quote: "it's better to use my mobile. That's 0 7 7 2 3, 4 1 9, 8 5 6" } },
            },
            {
              id: 'l1-q4',
              number: 4,
              answer: { accepted: ['14', '14th', 'fourteenth'] },
              explanation: { text: 'The 7th was the original date (a distractor); the first session is now on the 14th.', evidence: { quote: 'the first session is now on the fourteenth' } },
            },
            {
              id: 'l1-q5',
              number: 5,
              answer: { accepted: ['Wednesday', 'Wednesdays'] },
              explanation: { text: 'Tuesday was last year; this year it is Wednesday.', evidence: { quote: 'this year all the sessions are on Wednesday evenings' } },
            },
            {
              id: 'l1-q6',
              number: 6,
              answer: { accepted: ['library'] },
              explanation: { text: 'Daniel suggests the main hall, but it is being repainted.', evidence: { quote: "You'll be in the library building, room twelve" } },
            },
            {
              id: 'l1-q7',
              number: 7,
              answer: { accepted: ['185'] },
              explanation: { text: '£210 is the non-resident fee; Daniel lives in Milbrook, so he pays the local rate.', evidence: { quote: 'you pay the local rate, which is one hundred and eighty-five' } },
            },
            {
              id: 'l1-q8',
              number: 8,
              answer: { accepted: ['students'] },
              explanation: { text: 'The over-sixties discount no longer exists.', evidence: { quote: 'now the only discount is for students in full-time education' } },
            },
            {
              id: 'l1-q9',
              number: 9,
              answer: { accepted: ['tripod'] },
              explanation: { text: 'Memory cards are provided (distractor); students bring a tripod.', evidence: { quote: "you'll need to bring your own tripod" } },
            },
            {
              id: 'l1-q10',
              number: 10,
              answer: { accepted: ['radio'] },
              explanation: { text: 'A friend and the website are mentioned, but the radio advert told him about photography.', evidence: { quote: 'it was an advertisement on the radio that actually mentioned photography' } },
            },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 2
    {
      id: 'l2',
      number: 2,
      title: 'Westmoor Wetland Centre',
      audio: {
        intro: 'Part 2. You will hear a guide talking to a group of visitors at a wetland centre. First, you have some time to look at questions 11 to 20.',
        script: [
          { speaker: 'Guide', voice: M, accent: 'en-AU', text: "Good morning, everyone, and welcome to Westmoor Wetland Centre. Before you set off, I'd like to tell you a little about the site and what you can do here today." },
          { speaker: 'Guide', voice: M, accent: 'en-AU', text: "People often assume that this land was once farmland, and it's true that there are farms all around us. But for most of the last century this whole area was actually a gravel quarry. When the digging stopped in the nineteen-eighties, a company wanted to build a factory here, but local residents campaigned to let the pits fill with water instead, and that's how the lakes you see today were created." },
          { speaker: 'Guide', voice: M, accent: 'en-AU', text: "In the early years the centre depended almost entirely on government grants. Those grants still exist, but they're much smaller now. Your entrance fees help, of course, but by far the largest share of our income today comes from our twelve thousand members, who pay an annual subscription." },
          { speaker: 'Guide', voice: M, accent: 'en-AU', text: "A word about the paths. They're all wide and level, and you're welcome to explore wherever you like at this time of year. However, from November to February some of the lakeside paths are closed, because that's when thousands of ducks and geese arrive to spend the winter here, and they're easily disturbed." },
          { speaker: 'Guide', voice: M, accent: 'en-AU', text: "Many of you will be hoping to see our otters. They're sometimes spotted in the evening, and a few lucky visitors have seen them at lunchtime, but your best chance by far is just after sunrise, before the site gets busy." },
          { speaker: 'Guide', voice: M, accent: 'en-AU', text: "Now, let me take you through the map in your leaflet. Here at the Visitor Centre, as well as the shop, there's a small gallery. At the moment it's showing paintings of local wildlife by children from the village school, so do have a look." },
          { speaker: 'Guide', voice: M, accent: 'en-AU', text: "If you walk north from here you'll reach the Heron Hide. It's very popular with photographers, and you can hire a telescope there for a small fee. There used to be a photography workshop in the hide as well, but unfortunately that's been cancelled this year." },
          { speaker: 'Guide', voice: M, accent: 'en-AU', text: "From the hide, the Reed Walk takes you along a wooden boardwalk. We've set up a trail with puzzles and clues for younger visitors along this path, and there's a small prize at the end." },
          { speaker: 'Guide', voice: M, accent: 'en-AU', text: "At the end of the boardwalk is the Pond Zone. Please don't feed the birds there. The fish in the ponds are sensitive to bread. But every day at eleven and three, one of our wardens leads a guided tour from the Pond Zone around the older lakes." },
          { speaker: 'Guide', voice: M, accent: 'en-AU', text: "The Lookout Tower gives the best views over the whole reserve. You might think it's where the boat trips leave from, because it's close to the water, but the boats actually go from the jetty behind the café. At the bottom of the tower there are tables and benches, so it's a nice place to have a picnic." },
          { speaker: 'Guide', voice: M, accent: 'en-AU', text: "And finally, the Willow Café. As I said, that's where you catch the boats. They run every hour, and tickets can be bought at the café counter. Right, enjoy your visit." },
        ],
      },
      groups: [
        {
          id: 'l2-g1',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'l2-q11',
              number: 11,
              prompt: 'What was the land used for before the wetland centre was created?',
              options: [
                { id: 'A', text: 'farming' },
                { id: 'B', text: 'removing gravel' },
                { id: 'C', text: 'manufacturing' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'It was a gravel quarry.',
                evidence: { quote: 'for most of the last century this whole area was actually a gravel quarry' },
                distractors: { A: 'Farms surround the site; the land itself was not farmland.', C: 'A factory was only planned, never built.' },
              },
            },
            {
              id: 'l2-q12',
              number: 12,
              prompt: 'Most of the centre’s income now comes from',
              options: [
                { id: 'A', text: 'government grants.' },
                { id: 'B', text: 'entrance fees.' },
                { id: 'C', text: 'membership subscriptions.' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: '“The largest share of our income” = most of the income.',
                evidence: { quote: 'by far the largest share of our income today comes from our twelve thousand members' },
                distractors: { A: 'Grants were the main source in the early years; they are smaller now.' },
              },
            },
            {
              id: 'l2-q13',
              number: 13,
              prompt: 'What does the guide say about the lakeside paths?',
              options: [
                { id: 'A', text: 'Some of them are closed for part of the year.' },
                { id: 'B', text: 'They are being made wider.' },
                { id: 'C', text: 'Visitors must stay on them in winter.' },
              ],
              answer: { accepted: ['A'] },
              explanation: { text: 'Some lakeside paths close from November to February.', evidence: { quote: 'from November to February some of the lakeside paths are closed' } },
            },
            {
              id: 'l2-q14',
              number: 14,
              prompt: 'When are visitors most likely to see otters?',
              options: [
                { id: 'A', text: 'early in the morning' },
                { id: 'B', text: 'around midday' },
                { id: 'C', text: 'in the evening' },
              ],
              answer: { accepted: ['A'] },
              explanation: { text: '“Just after sunrise” = early in the morning. Evening and lunchtime are mentioned as less likely.', evidence: { quote: 'your best chance by far is just after sunrise' } },
            },
          ],
        },
        {
          id: 'l2-g2',
          type: 'matching',
          instructions: 'What can visitors do at each of the following places? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 15–20.',
          optionsTitle: 'Activities',
          options: [
            { id: 'A', text: 'join a guided tour' },
            { id: 'B', text: 'feed the birds' },
            { id: 'C', text: 'follow a children’s trail' },
            { id: 'D', text: 'hire equipment' },
            { id: 'E', text: 'see an art exhibition' },
            { id: 'F', text: 'buy boat tickets' },
            { id: 'G', text: 'eat outdoors' },
            { id: 'H', text: 'attend a photography workshop' },
          ],
          questions: [
            { id: 'l2-q15', number: 15, prompt: 'Visitor Centre', answer: { accepted: ['E'] }, explanation: { text: 'The gallery is showing paintings by local children: an art exhibition.', evidence: { quote: "there's a small gallery. At the moment it's showing paintings of local wildlife" } } },
            { id: 'l2-q16', number: 16, prompt: 'Heron Hide', answer: { accepted: ['D'] }, explanation: { text: 'A telescope can be hired.', evidence: { quote: 'you can hire a telescope there for a small fee' }, distractors: { H: 'The photography workshop used to be in the hide but has been cancelled.' } } },
            { id: 'l2-q17', number: 17, prompt: 'Reed Walk', answer: { accepted: ['C'] }, explanation: { text: 'A trail for younger visitors.', evidence: { quote: "We've set up a trail with puzzles and clues for younger visitors" } } },
            { id: 'l2-q18', number: 18, prompt: 'Pond Zone', answer: { accepted: ['A'] }, explanation: { text: 'Guided tours start here. Feeding the birds is not allowed.', evidence: { quote: 'one of our wardens leads a guided tour from the Pond Zone' }, distractors: { B: 'Visitors are asked not to feed the birds there.' } } },
            { id: 'l2-q19', number: 19, prompt: 'Lookout Tower', answer: { accepted: ['G'] }, explanation: { text: 'Tables and benches for a picnic.', evidence: { quote: "there are tables and benches, so it's a nice place to have a picnic" }, distractors: { F: 'Boats leave from behind the café, not the tower.' } } },
            { id: 'l2-q20', number: 20, prompt: 'Willow Café', answer: { accepted: ['F'] }, explanation: { text: 'Boat tickets are sold at the café counter.', evidence: { quote: 'tickets can be bought at the café counter' } } },
          ],
        },
      ],
    },
    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Planning a presentation',
      audio: {
        intro: 'Part 3. You will hear two environmental science students, Maya and Tom, discussing a presentation they are preparing. First, you have some time to look at questions 21 to 30.',
        script: [
          { speaker: 'Tom', voice: M, accent: 'en-US', text: "So, Maya, before we plan the slides, remind me why we went for urban trees in the end. Was it because Dr Price suggested it?" },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "She did mention it as a possible topic, but that's not really why. I did my first-year project on street planting, so we already had a lot of background material and contacts." },
          { speaker: 'Tom', voice: M, accent: 'en-US', text: "Right, that made sense. Now, the survey. I was worried we wouldn't get enough people to fill it in." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "That was never a problem. We had over three hundred responses, and the questions seemed clear, nobody complained. The trouble is that almost all of them came from people living in the city centre, so we can't really say anything about the suburbs." },
          { speaker: 'Tom', voice: M, accent: 'en-US', text: "True. We'll have to mention that as a limitation. What about the study on cooling? The one from Rotterdam." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "The method looked fairly standard to me: thermal sensors on streets with and without trees." },
          { speaker: 'Tom', voice: M, accent: 'en-US', text: "Yes, and it was only published last year, so it's recent. What struck me was the size of the difference. I'd assumed shaded streets might be a degree cooler, but they measured up to four degrees. I really didn't expect that." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "It'll get the audience's attention too. Now, the cost figures. The ones we have are from that tree charity's website, and they're five years old." },
          { speaker: 'Tom', voice: M, accent: 'en-US', text: "The city council publishes planting costs every year, doesn't it? We should use theirs instead." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "Agreed. That's more reliable. And how shall we split the talk? I wondered if one of us should just do the slides and the other do all the speaking." },
          { speaker: 'Tom', voice: M, accent: 'en-US', text: "I'd rather we both speak. Why don't we each present the sections we researched? That's roughly half each anyway." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "Fine. So let's go through the sections. First, the history of city parks." },
          { speaker: 'Tom', voice: M, accent: 'en-US', text: "Honestly, I don't think it adds much. It's interesting, but it's not really about trees and climate." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "I was going to suggest we check with Dr Price, but you're right. Let's just take it out." },
          { speaker: 'Tom', voice: M, accent: 'en-US', text: "Then the cooling effect. The Rotterdam team made a short film with a thermal camera. Could we show part of that?" },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "Yes, a clip of about a minute would be much more powerful than a chart." },
          { speaker: 'Tom', voice: M, accent: 'en-US', text: "Air quality next. At the moment we only give one figure, for particle pollution." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "That's too thin. We need numbers for nitrogen dioxide as well, and a comparison between seasons." },
          { speaker: 'Tom', voice: M, accent: 'en-US', text: "OK. The cost of planting section is fine in content, but it's five slides at the moment." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "Too many. Let's cut it down to two, with the council figures." },
          { speaker: 'Tom', voice: M, accent: 'en-US', text: "And the public opinion survey. I had it near the end." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "I think it'd work better as our opening. Starting with what people in the city actually think gets everyone involved straight away." },
          { speaker: 'Tom', voice: M, accent: 'en-US', text: "Good idea. We'll open with it." },
        ],
      },
      groups: [
        {
          id: 'l3-g1',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'l3-q21',
              number: 21,
              prompt: 'Why did the students choose urban trees as their topic?',
              options: [
                { id: 'A', text: 'Their tutor recommended it.' },
                { id: 'B', text: 'They had read a recent article about it.' },
                { id: 'C', text: 'It was related to Maya’s earlier work.' },
              ],
              answer: { accepted: ['C'] },
              explanation: { text: 'Maya’s first-year project gave them material and contacts.', evidence: { quote: 'I did my first-year project on street planting' }, distractors: { A: 'Dr Price mentioned it, “but that’s not really why”.' } },
            },
            {
              id: 'l3-q22',
              number: 22,
              prompt: 'What problem was there with the survey?',
              options: [
                { id: 'A', text: 'Too few people responded.' },
                { id: 'B', text: 'Most responses came from one area.' },
                { id: 'C', text: 'Some questions were unclear.' },
              ],
              answer: { accepted: ['B'] },
              explanation: { text: 'Almost all responses came from the city centre.', evidence: { quote: 'almost all of them came from people living in the city centre' }, distractors: { A: 'They had over three hundred responses.', C: 'The questions seemed clear.' } },
            },
            {
              id: 'l3-q23',
              number: 23,
              prompt: 'What does Tom say about the Rotterdam study?',
              options: [
                { id: 'A', text: 'Its findings were greater than he had expected.' },
                { id: 'B', text: 'It used an unusual method.' },
                { id: 'C', text: 'It is too old to be useful.' },
              ],
              answer: { accepted: ['A'] },
              explanation: { text: 'He expected one degree; they measured up to four.', evidence: { quote: "I'd assumed shaded streets might be a degree cooler, but they measured up to four degrees" }, distractors: { B: 'The method was standard.', C: 'It was published last year.' } },
            },
            {
              id: 'l3-q24',
              number: 24,
              prompt: 'The students agree that the cost figures should',
              options: [
                { id: 'A', text: 'come from the city council.' },
                { id: 'B', text: 'be taken from the charity website.' },
                { id: 'C', text: 'be left out of the presentation.' },
              ],
              answer: { accepted: ['A'] },
              explanation: { text: 'The charity figures are five years old; the council publishes them every year.', evidence: { quote: "We should use theirs instead." } },
            },
            {
              id: 'l3-q25',
              number: 25,
              prompt: 'How will the students share the presentation?',
              options: [
                { id: 'A', text: 'One will prepare the slides and the other will speak.' },
                { id: 'B', text: 'Each will present the parts they researched.' },
                { id: 'C', text: 'Maya will introduce and Tom will conclude.' },
              ],
              answer: { accepted: ['B'] },
              explanation: { text: '“Each present the sections we researched.”', evidence: { quote: "Why don't we each present the sections we researched?" }, distractors: { A: 'Maya suggests this, but Tom prefers that both speak.' } },
            },
          ],
        },
        {
          id: 'l3-g2',
          type: 'matching',
          instructions: 'What do the students decide to do with each section of their presentation? Choose FIVE answers from the box and write the correct letter, A–F, next to Questions 26–30.',
          optionsTitle: 'Decisions',
          options: [
            { id: 'A', text: 'remove it' },
            { id: 'B', text: 'make it shorter' },
            { id: 'C', text: 'add more data' },
            { id: 'D', text: 'include a video' },
            { id: 'E', text: 'move it to the beginning' },
            { id: 'F', text: 'ask the tutor about it' },
          ],
          questions: [
            { id: 'l3-q26', number: 26, prompt: 'history of city parks', answer: { accepted: ['A'] }, explanation: { text: 'They decide to take it out.', evidence: { quote: "Let's just take it out." }, distractors: { F: 'Maya thinks of asking Dr Price but decides not to.' } } },
            { id: 'l3-q27', number: 27, prompt: 'cooling effect', answer: { accepted: ['D'] }, explanation: { text: 'A clip from the thermal-camera film.', evidence: { quote: 'a clip of about a minute would be much more powerful than a chart' } } },
            { id: 'l3-q28', number: 28, prompt: 'air quality', answer: { accepted: ['C'] }, explanation: { text: 'They need more figures.', evidence: { quote: 'We need numbers for nitrogen dioxide as well' } } },
            { id: 'l3-q29', number: 29, prompt: 'cost of planting', answer: { accepted: ['B'] }, explanation: { text: 'Five slides cut down to two.', evidence: { quote: "Let's cut it down to two" } } },
            { id: 'l3-q30', number: 30, prompt: 'public opinion survey', answer: { accepted: ['E'] }, explanation: { text: 'It becomes the opening.', evidence: { quote: "I think it'd work better as our opening" } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Lecture: a short history of glass',
      audio: {
        intro: 'Part 4. You will hear a lecture on the history of glass-making. First, you have some time to look at questions 31 to 40.',
        script: [
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "Good afternoon. Today I want to trace the history of one of the most ordinary materials around us: glass. We often imagine that glass was first made in Egypt, and the Egyptians certainly became skilled glassmakers. But the earliest objects we have, from around four and a half thousand years ago, come from Mesopotamia, in what is now Iraq." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "Those first pieces were not bottles or cups. Glass containers came much later. Early glass was used almost entirely to make beads, which were traded as valuable decorations, sometimes worth more than gold." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "The great turning point came around fifty B C E, with the invention of glassblowing, probably on the eastern coast of the Mediterranean. Blowing air into molten glass through a tube made production dramatically faster, and for the first time glass became cheap enough for ordinary households, not just the wealthy. The Romans then spread these techniques throughout their empire, from Britain to North Africa." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "Let's move to medieval Europe, and to Venice, which became the centre of fine glass. In twelve ninety-one the city ordered all its glassmakers to move to the nearby island of Murano. You may read that this was to protect trade secrets, and that did become important later. But the original reason was the danger of fire: glass furnaces burned day and night, and Venice was a city of wooden buildings." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "Once on Murano, the glassmakers were treated very well, but they paid a price: they were not permitted to leave the island without permission, so that their skills stayed in Venice. Their most famous product, known as cristallo, was prized above all for its clarity. It was almost as transparent as rock crystal, though it was actually quite fragile." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "Now to the modern era. For centuries, making large, flat windows meant grinding and polishing the glass, which was slow and expensive. In the nineteen-fifties, the British company Pilkington developed the float process. Molten glass is poured onto a bath of molten tin, where it spreads out and floats. People sometimes say lead was used, but it was tin. The result is glass that is perfectly flat, with no need for polishing at all. Almost all window glass is still made this way." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "Finally, where is research heading? Stronger glass for phone screens gets a lot of attention, but the area that I find most promising is glass that can clean itself, using a thin coating that breaks down dirt when sunlight falls on it and then lets rain wash it away. That's all for today." },
        ],
      },
      groups: [
        {
          id: 'l4-g1',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'THE HISTORY OF GLASS\nEarly glass\n• the earliest glass objects come from {{31}}, about 4,500 years ago\n• early glass was used mainly to make {{32}}, not containers\nGlassblowing (around 50 BCE)\n• made glass cheap enough for ordinary {{33}}\n• the Romans spread the technique across their {{34}}\nMedieval Venice\n• glassmakers were moved to Murano because of the risk of {{35}}\n• workers were not allowed to {{36}} the island\n• cristallo was valued for its {{37}}\nModern developments\n• float process (1950s): molten glass floats on a bath of {{38}}\n• produces glass that is completely {{39}} without polishing\n• promising research: glass that can {{40}} itself',
          questions: [
            { id: 'l4-q31', number: 31, answer: { accepted: ['Mesopotamia'] }, explanation: { text: 'Egypt is a distractor.', evidence: { quote: 'the earliest objects we have … come from Mesopotamia' } } },
            { id: 'l4-q32', number: 32, answer: { accepted: ['beads'] }, explanation: { text: 'Containers came much later.', evidence: { quote: 'Early glass was used almost entirely to make beads' } } },
            { id: 'l4-q33', number: 33, answer: { accepted: ['households'] }, explanation: { text: '“Not just the wealthy.”', evidence: { quote: 'glass became cheap enough for ordinary households' } } },
            { id: 'l4-q34', number: 34, answer: { accepted: ['empire'] }, explanation: { text: '“Throughout their empire.”', evidence: { quote: 'The Romans then spread these techniques throughout their empire' } } },
            { id: 'l4-q35', number: 35, answer: { accepted: ['fire', 'fires'] }, explanation: { text: 'Trade secrets mattered later; the original reason was fire.', evidence: { quote: 'the original reason was the danger of fire' } } },
            { id: 'l4-q36', number: 36, answer: { accepted: ['leave'] }, explanation: { text: '“Not permitted to leave” = not allowed to leave.', evidence: { quote: 'they were not permitted to leave the island' } } },
            { id: 'l4-q37', number: 37, answer: { accepted: ['clarity'] }, explanation: { text: '“Prized above all for its clarity.”', evidence: { quote: 'prized above all for its clarity' } } },
            { id: 'l4-q38', number: 38, answer: { accepted: ['tin'] }, explanation: { text: 'Lead is mentioned as a common mistake.', evidence: { quote: 'a bath of molten tin' } } },
            { id: 'l4-q39', number: 39, answer: { accepted: ['flat'] }, explanation: { text: '“Perfectly flat, with no need for polishing.”', evidence: { quote: 'glass that is perfectly flat, with no need for polishing' } } },
            { id: 'l4-q40', number: 40, answer: { accepted: ['clean'] }, explanation: { text: 'Stronger phone glass is mentioned, but self-cleaning glass is “most promising”.', evidence: { quote: 'glass that can clean itself' } } },
          ],
        },
      ],
    },
  ],
};
