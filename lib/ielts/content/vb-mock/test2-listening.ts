import type { ListeningAudio, ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 2 — Listening. Original content written for
 * Mino in the style and difficulty of the IELTS Listening test
 * (4 parts, 40 questions). Not Cambridge material.
 *
 * Content: evening photography course enrolment (Part 1), heritage railway
 * open day (Part 2), students discussing a food-waste project (Part 3),
 * lecture on the importance of coastal wetlands (Part 4).
 *
 * Line counts verified against the supplied package: Part 1 has 27 lines,
 * Part 2 has 12, Part 3 has 26, Part 4 has 12.
 */
const rec = (partId: string) => recorded('vb-mock-2', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock2Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Enrolling in an evening photography course',
      audio: {
        intro: 'Part 1. You will hear a woman phoning a community centre to enrol in an evening photography course. First, you have some time to look at questions 1 to 10.',
        noun: 'conversation',
        ...rec('l1'),
        // Questions 1–5 are answered by line 13; the break comes before the class-time question.
        sets: [
          { questions: '1 to 5', fromLine: 0 },
          { questions: '6 to 10', fromLine: 14 },
        ],
        script: [
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: 'Good afternoon, Westbrook Community Centre. How can I help you?' },
          { speaker: 'Mark', voice: M, accent: 'en-GB', text: "Hello. I'm calling because I'd like to enrol in your evening photography course. I saw the advertisement last week, but I wanted to check a few details before registering." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "Of course. We have a few places left. I'll just complete the enrolment form. Could I have your full name first?" },
          { speaker: 'Mark', voice: M, accent: 'en-GB', text: "Certainly. My first name is Mark, and my surname is Bennett. That's B-E-N-N-E-T-T." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "Thank you. And what's your home address?" },
          { speaker: 'Mark', voice: M, accent: 'en-GB', text: "It's 42 Meadow Lane. Meadow is M-E-A-D-O-W." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: 'Right, 42 Meadow Lane. Could I also have a contact number?' },
          { speaker: 'Mark', voice: M, accent: 'en-GB', text: "Yes. It's 07700 912684." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: 'Let me repeat that: 07700 912684.' },
          { speaker: 'Mark', voice: M, accent: 'en-GB', text: "That's correct." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: 'Now, the next course begins on the fourteenth of June. Does that date suit you?' },
          { speaker: 'Mark', voice: M, accent: 'en-GB', text: 'Yes, that should be fine. I was initially hoping to start a week earlier, but the fourteenth is perfectly convenient.' },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: 'Excellent. Classes take place once a week, on Tuesdays.' },
          { speaker: 'Mark', voice: M, accent: 'en-GB', text: 'Tuesdays are fine. I used to have a regular meeting on that evening, but it has recently been moved to Thursday.' },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: 'Good. The class begins at six fifteen in the evening and finishes at eight.' },
          { speaker: 'Mark', voice: M, accent: 'en-GB', text: "That's ideal. I can get here directly after work." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "The full course fee is forty-eight pounds. That includes all six weekly sessions, but you'll need to bring your own camera." },
          { speaker: 'Mark', voice: M, accent: 'en-GB', text: "No problem. I've got a digital camera already. Would you describe the course as suitable for complete beginners?" },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "We have two groups. The beginner group is for people who have never used a camera beyond automatic settings. The other group is called improver level. It's designed for people who understand basic settings and want to develop their skills." },
          { speaker: 'Mark', voice: M, accent: 'en-GB', text: "In that case, I'd prefer the improver group. I've taken quite a few photographs, and I know how to adjust the focus and exposure, although I still need practice." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "That sounds appropriate. For the first class, please bring a notebook as well as your camera. We'll provide the printed course materials." },
          { speaker: 'Mark', voice: M, accent: 'en-GB', text: "All right. I'll make sure I bring one." },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: 'Before I finish the form, could you tell me where you heard about the course?' },
          { speaker: 'Mark', voice: M, accent: 'en-GB', text: 'I first noticed it on a poster at my workplace. It was on the noticeboard near the staff kitchen.' },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "Excellent. I'll record that as workplace noticeboard. I'll send you a confirmation email this afternoon." },
          { speaker: 'Mark', voice: M, accent: 'en-GB', text: 'Thank you very much. I look forward to the course.' },
          { speaker: 'Priya', voice: W, accent: 'en-GB', text: "You're welcome. We look forward to seeing you in June." },
        ],
      },
      groups: [
        {
          id: 'm2l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 1, number: true },
          template:
            'EVENING PHOTOGRAPHY COURSE — ENROLMENT FORM\nSurname: {{1}}\nAddress: 42 {{2}} Lane\nContact number: {{3}}\nCourse starting date: {{4}} June\nClass day: {{5}}\nClass time: {{6}} p.m.\nCourse fee: £{{7}}\nStudent\'s current level: {{8}}\nItem to bring to the first class: {{9}}\nWhere the student heard about the course: {{10}}',
          questions: [
            { id: 'm2l-q1', number: 1, answer: { accepted: ['Bennett'] }, explanation: { text: 'The surname is spelled out: B-E-N-N-E-T-T.', evidence: { quote: "My first name is Mark, and my surname is Bennett. That's B-E-N-N-E-T-T." } } },
            { id: 'm2l-q2', number: 2, answer: { accepted: ['Meadow'] }, explanation: { text: 'The street name is spelled out: M-E-A-D-O-W.', evidence: { quote: "It's 42 Meadow Lane. Meadow is M-E-A-D-O-W." } } },
            {
              id: 'm2l-q3',
              number: 3,
              answer: { accepted: ['07700912684', '07700 912684', '07700 912 684'] },
              explanation: { text: 'Mark gives his contact number and confirms it when Priya repeats it.', evidence: { quote: "Yes. It's 07700 912684." } },
            },
            {
              id: 'm2l-q4',
              number: 4,
              answer: { accepted: ['14', '14th', 'fourteenth'] },
              explanation: { text: 'The course begins on the fourteenth of June; a week earlier was only what Mark had hoped for.', evidence: { quote: 'Now, the next course begins on the fourteenth of June.' } },
            },
            {
              id: 'm2l-q5',
              number: 5,
              answer: { accepted: ['Tuesdays', 'Tuesday'] },
              explanation: { text: 'Classes are once a week, on Tuesdays; Thursday is when his old meeting moved to.', evidence: { quote: 'Excellent. Classes take place once a week, on Tuesdays.' } },
            },
            {
              id: 'm2l-q6',
              number: 6,
              answer: { accepted: ['6:15', '6.15'] },
              explanation: { text: 'The class begins at six fifteen; eight is when it finishes.', evidence: { quote: 'Good. The class begins at six fifteen in the evening and finishes at eight.' } },
            },
            {
              id: 'm2l-q7',
              number: 7,
              answer: { accepted: ['48'] },
              explanation: { text: 'The full course fee is forty-eight pounds.', evidence: { quote: 'The full course fee is forty-eight pounds.' } },
            },
            {
              id: 'm2l-q8',
              number: 8,
              answer: { accepted: ['improver'] },
              explanation: { text: 'Mark chooses the improver group; the beginner group is for people who have never used a camera beyond automatic settings.', evidence: { quote: "In that case, I'd prefer the improver group." } },
            },
            {
              id: 'm2l-q9',
              number: 9,
              answer: { accepted: ['notebook'] },
              explanation: { text: 'He must bring a notebook as well as his camera; printed materials are provided.', evidence: { quote: 'For the first class, please bring a notebook as well as your camera.' } },
            },
            {
              id: 'm2l-q10',
              number: 10,
              answer: { accepted: ['workplace'] },
              explanation: { text: 'Mark first noticed the course on a poster at his workplace.', evidence: { quote: 'I first noticed it on a poster at my workplace.' } },
            },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 2
    {
      id: 'l2',
      number: 2,
      title: 'A heritage railway open day',
      audio: {
        intro: 'Part 2. You will hear a visitor information officer talking to visitors at a heritage railway open day. First, you have some time to look at questions 11 to 20.',
        noun: 'talk',
        ...rec('l2'),
        // Questions 11–15 are answered by line 5; the break comes before the facilities are described.
        sets: [
          { questions: '11 to 15', fromLine: 0 },
          { questions: '16 to 20', fromLine: 6 },
        ],
        script: [
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: "Good morning, everyone, and welcome to the Westbrook Heritage Railway. My name is Sarah, and I'll be giving you some information about today's open day before you explore the site." },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: 'The railway is more than a hundred years old. One interesting fact is that the site was not originally constructed as a railway station. Before the railway arrived, the main building was used as a water pumping station. It supplied water to several nearby communities. Later, when the railway network expanded, the building was converted into a station and goods depot.' },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: "You'll notice that the northern platform is closed today. Some visitors have asked whether this is because of the heavy rain we had last week. In fact, the weather hasn't caused any damage. The platform is simply being resurfaced as part of a safety improvement programme. We expect the work to be completed next month." },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: "Now, let's talk about transport. There is a large car park about ten minutes' walk from the main entrance. A free shuttle bus runs regularly between that car park and the entrance. Its purpose is to make access easier, particularly for families and visitors who have difficulty walking. Please remember that the shuttle does not travel into the town centre or to other museums." },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: "We have activities for visitors of all ages. Adults may enjoy the guided engineering talk in the exhibition hall, while people interested in the railway's history can explore the old photographs and documents. For younger visitors, the most popular activity is our model railway workshop. Children can assemble simple sections of a model track and learn how miniature trains work. The activity is supervised, and all materials are provided." },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: "Tickets can be purchased in advance through our website. If you haven't booked, you can also buy them on the day at the station office, which is located beside the main waiting room. Please don't try to buy tickets from the shuttle bus driver; the driver is responsible only for transport." },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: "There are several other facilities around the site. If you'd like to understand how railway movements were controlled in the past, visit the signal cabin. It contains the original levers and control equipment, and volunteers will demonstrate how they were used." },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: 'The engine shed is another popular place. This is where our volunteers work on the restoration of old locomotives. You can watch them carrying out repairs, although visitors must remain behind the marked safety line.' },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: "If you're interested in the history of the railway, the exhibition hall contains a large collection of historical photographs, maps and railway documents. Some of the photographs show how the local area changed when the railway first opened." },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: 'For anyone bringing a packed lunch, the picnic lawn is the best place to sit outdoors. There are several benches, and visitors are welcome to use the open space.' },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: 'Finally, if you would like a quiet walk, follow the riverside path. It runs alongside the water and provides a pleasant view of the old railway bridge. Please stay on the marked route, as some areas near the riverbank are uneven.' },
          { speaker: 'Sarah', voice: W, accent: 'en-GB', text: 'We hope you enjoy your visit. If you need further information, our staff at the station office will be happy to help.' },
        ],
      },
      groups: [
        {
          id: 'm2l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm2l-q11',
              number: 11,
              prompt: 'What was the railway site originally used for?',
              options: [
                { id: 'A', text: 'A goods storage centre' },
                { id: 'B', text: 'A water pumping station' },
                { id: 'C', text: 'A passenger railway station' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The main building was used as a water pumping station before the railway arrived.',
                evidence: { quote: 'the main building was used as a water pumping station' },
                distractors: { C: 'The site was not originally constructed as a railway station.' },
              },
            },
            {
              id: 'm2l-q12',
              number: 12,
              prompt: 'Why will visitors be unable to use the northern platform?',
              options: [
                { id: 'A', text: 'It is being resurfaced.' },
                { id: 'B', text: 'It is being used for a private event.' },
                { id: 'C', text: 'It has been damaged by heavy rain.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The platform is being resurfaced as part of a safety improvement programme.',
                evidence: { quote: 'The platform is simply being resurfaced as part of a safety improvement programme.' },
                distractors: { C: "The weather hasn't caused any damage." },
              },
            },
            {
              id: 'm2l-q13',
              number: 13,
              prompt: 'What is the main purpose of the free shuttle bus?',
              options: [
                { id: 'A', text: 'To take visitors to a nearby museum' },
                { id: 'B', text: 'To connect the town centre with the railway station' },
                { id: 'C', text: 'To transport visitors between the car park and the entrance' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'The shuttle runs between the car park and the entrance to make access easier.',
                evidence: { quote: 'A free shuttle bus runs regularly between that car park and the entrance.' },
                distractors: { A: 'The shuttle does not travel to other museums.', B: 'The shuttle does not travel into the town centre.' },
              },
            },
            {
              id: 'm2l-q14',
              number: 14,
              prompt: 'Which activity is particularly suitable for children?',
              options: [
                { id: 'A', text: 'A model railway workshop' },
                { id: 'B', text: 'A guided walk along the tracks' },
                { id: 'C', text: 'A talk about railway engineering' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'For younger visitors, the most popular activity is the model railway workshop.',
                evidence: { quote: 'For younger visitors, the most popular activity is our model railway workshop.' },
                distractors: { C: 'Adults may enjoy the guided engineering talk.' },
              },
            },
            {
              id: 'm2l-q15',
              number: 15,
              prompt: 'Where can visitors buy tickets on the day?',
              options: [
                { id: 'A', text: 'At the main entrance' },
                { id: 'B', text: 'At the station office' },
                { id: 'C', text: 'On the shuttle bus' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Tickets can be bought on the day at the station office, beside the main waiting room.',
                evidence: { quote: "you can also buy them on the day at the station office" },
                distractors: { C: "Please don't try to buy tickets from the shuttle bus driver." },
              },
            },
          ],
        },
        {
          id: 'm2l-g3',
          type: 'matching',
          instructions: 'Which facility is suitable for each activity? Choose FIVE answers from the box.',
          optionsTitle: 'Facilities',
          options: [
            { id: 'A', text: 'Ticket office' },
            { id: 'B', text: 'Engine shed' },
            { id: 'C', text: 'Riverside path' },
            { id: 'D', text: 'Picnic lawn' },
            { id: 'E', text: 'Signal cabin' },
            { id: 'F', text: 'Exhibition hall' },
          ],
          questions: [
            { id: 'm2l-q16', number: 16, prompt: 'Seeing the equipment used to control train movements', answer: { accepted: ['E'] }, explanation: { text: 'The signal cabin contains the original levers and control equipment.', evidence: { quote: 'visit the signal cabin. It contains the original levers and control equipment' } } },
            { id: 'm2l-q17', number: 17, prompt: 'Watching volunteers repair an old locomotive', answer: { accepted: ['B'] }, explanation: { text: 'Volunteers work on the restoration of old locomotives in the engine shed.', evidence: { quote: 'You can watch them carrying out repairs' } } },
            { id: 'm2l-q18', number: 18, prompt: 'Looking at historical railway photographs', answer: { accepted: ['F'] }, explanation: { text: 'The exhibition hall holds a large collection of historical photographs.', evidence: { quote: 'the exhibition hall contains a large collection of historical photographs' } } },
            { id: 'm2l-q19', number: 19, prompt: 'Eating a packed lunch outdoors', answer: { accepted: ['D'] }, explanation: { text: 'The picnic lawn is the best place to sit outdoors with a packed lunch.', evidence: { quote: 'the picnic lawn is the best place to sit outdoors' } } },
            { id: 'm2l-q20', number: 20, prompt: 'Taking a walk beside the water', answer: { accepted: ['C'] }, explanation: { text: 'The riverside path runs alongside the water.', evidence: { quote: 'follow the riverside path. It runs alongside the water' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'A university project on food waste',
      audio: {
        intro: 'Part 3. You will hear two university students, Maya and Daniel, discussing a project on food waste. First, you have some time to look at questions 21 to 30.',
        noun: 'discussion',
        ...rec('l3'),
        // Single set: the Q26–30 evidence (breakfast repeat, plate sizes, cost percentages, quotation, remove comparison) occurs in the transcript BEFORE the Q25 presentation evidence (bar chart + comments), so two sets would fail the evidence-in-own-set check.
        sets: [{ questions: '21 to 30', fromLine: 0 }],
        script: [
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: 'Hi, Daniel. Have you had a chance to look through the figures from our first week of food-waste measurements?' },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'Yes, I went through them yesterday. I think we have enough information to identify some patterns, although there are a few problems we need to discuss.' },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "Agreed. Just to remind ourselves, our main aim is to measure how much food students actually discard in the university cafeteria. We aren't trying to investigate their general attitudes towards healthy eating. That would require a different type of project." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'Exactly. We wanted to collect direct measurements rather than rely entirely on what students say they throw away.' },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: 'The first day was more difficult than I expected. Remember when we arrived to weigh the lunch waste? Some of the bins had already been emptied by the cleaning staff.' },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "Yes. That meant we couldn't include all the discarded food in our measurements. We had arranged the collection time badly, so we'll need to be more careful next time." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: 'At least we managed to collect enough information to see some interesting patterns. One thing that surprised me was how much waste came from side dishes. I expected most of the discarded food to be the main meals, but vegetables and other side items made up a surprisingly large proportion.' },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'I noticed that too. I was also surprised by how different the results were between lunch and breakfast, but the side-dish figures were particularly interesting.' },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "There's another issue with the information about plate sizes. We have two different descriptions in our notes, and I'm not sure which one is accurate." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "We shouldn't guess. The catering manager should have the official information. I can speak to her tomorrow and check the details." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: 'Good idea. That will make the report more reliable.' },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'What about the estimated cost of the discarded food? The figures are a little difficult to understand because the total amounts vary depending on the type of meal.' },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: 'I think we should present the figures as percentages. That would make it easier for readers to compare the different categories without getting distracted by the individual prices.' },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'That makes sense. We also have some useful comments from students explaining why they leave food uneaten.' },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "We should include one short quotation in that section. A student's own words could help explain the figures, provided we choose a comment that represents a common reason." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'Yes, but what about the comparison with other university campuses? I thought we could include a section on that.' },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "I looked into it, but we don't have enough time to collect reliable information from other universities. We would need to contact their catering departments and use similar measurement methods." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'So should we keep a brief comparison based on published figures?' },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "I'd rather remove that section. The figures may have been collected differently, and comparing them could be misleading. We can mention it as a possible direction for future research." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'Fair enough. We should also think about the breakfast measurements. We only collected those on Monday, so it might not represent a normal weekday.' },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "I agree. Let's repeat the measurement on another weekday. That should give us a better basis for comparison." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'Great. So, once we have the extra measurements and the confirmed plate information, we can prepare the final presentation.' },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "I've been thinking about that. A bar chart would make the main findings easy to understand, but I don't think charts alone will tell the whole story." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'I agree. We can combine the bar chart with a few selected student comments. That way, the audience can see both the numerical results and some of the reasons behind them.' },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "Perfect. I'll start preparing the slides, and you can contact the catering manager." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "Sounds good. Let's meet again on Friday to review everything." },
        ],
      },
      groups: [
        {
          id: 'm2l-g4',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm2l-q21',
              number: 21,
              prompt: "What is the main aim of Maya and Daniel's project?",
              options: [
                { id: 'A', text: "To investigate students' attitudes towards healthy eating" },
                { id: 'B', text: 'To measure how much food is discarded in the university cafeteria' },
                { id: 'C', text: 'To compare the prices of meals in different university cafeterias' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Their aim is to measure how much food students actually discard in the cafeteria.',
                evidence: { quote: 'our main aim is to measure how much food students actually discard in the university cafeteria' },
                distractors: { A: "They explicitly say they aren't trying to investigate attitudes towards healthy eating." },
              },
            },
            {
              id: 'm2l-q22',
              number: 22,
              prompt: 'What problem did the students experience when collecting their initial data?',
              options: [
                { id: 'A', text: 'Some bins were emptied before the food could be weighed.' },
                { id: 'B', text: 'Several students refused to answer their questions.' },
                { id: 'C', text: 'The cafeteria staff used different weighing machines.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'When they arrived to weigh the lunch waste, some bins had already been emptied by the cleaning staff.',
                evidence: { quote: 'Some of the bins had already been emptied by the cleaning staff.' },
                distractors: { B: 'No student refusals are mentioned.', C: 'No different weighing machines are mentioned.' },
              },
            },
            {
              id: 'm2l-q23',
              number: 23,
              prompt: 'What did Maya find surprising about the preliminary results?',
              options: [
                { id: 'A', text: 'Most waste came from drinks.' },
                { id: 'B', text: 'Students discarded more food at breakfast than at lunch.' },
                { id: 'C', text: 'Side dishes accounted for a large proportion of the waste.' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'Maya was surprised by how much waste came from side dishes, not the main meals.',
                evidence: { quote: 'One thing that surprised me was how much waste came from side dishes.' },
                distractors: { B: 'Daniel mentions the lunch/breakfast difference, but Maya’s surprise was the side dishes.' },
              },
            },
            {
              id: 'm2l-q24',
              number: 24,
              prompt: 'What does Daniel suggest they do about the uncertain information on plate sizes?',
              options: [
                { id: 'A', text: 'Remove the information from the report.' },
                { id: 'B', text: 'Check the details with the catering manager.' },
                { id: 'C', text: 'Ask students to estimate the size of their plates.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Daniel says the catering manager should have the official information and he can check the details with her.',
                evidence: { quote: 'The catering manager should have the official information. I can speak to her tomorrow and check the details.' },
                distractors: { A: 'Removing a section is what they decide for the campus comparison, not for plate sizes.' },
              },
            },
            {
              id: 'm2l-q25',
              number: 25,
              prompt: 'How have the students decided to present their main findings?',
              options: [
                { id: 'A', text: 'Through a bar chart supported by selected student comments' },
                { id: 'B', text: 'Through a written report containing only numerical data' },
                { id: 'C', text: 'Through a series of photographs with no written explanation' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'They will combine the bar chart with a few selected student comments.',
                evidence: { quote: 'We can combine the bar chart with a few selected student comments.' },
                distractors: { B: 'Maya says charts alone will not tell the whole story.' },
              },
            },
          ],
        },
        {
          id: 'm2l-g5',
          type: 'matching',
          instructions: 'What action have the students decided to take for each part of their project? Choose FIVE answers from the box.',
          optionsTitle: 'Actions',
          options: [
            { id: 'A', text: 'Repeat the measurement on another weekday' },
            { id: 'B', text: 'Remove the section from the report' },
            { id: 'C', text: 'Check the information with the catering manager' },
            { id: 'D', text: 'Present the figures as percentages' },
            { id: 'E', text: 'Include a short student quotation' },
            { id: 'F', text: 'Compare the findings with another campus' },
          ],
          questions: [
            { id: 'm2l-q26', number: 26, prompt: 'Breakfast waste figures', answer: { accepted: ['A'] }, explanation: { text: 'Breakfast was only measured on Monday, so they will repeat it on another weekday.', evidence: { quote: "Let's repeat the measurement on another weekday." } } },
            { id: 'm2l-q27', number: 27, prompt: 'Information about plate sizes', answer: { accepted: ['C'] }, explanation: { text: 'Daniel will check the plate-size details with the catering manager.', evidence: { quote: 'I can speak to her tomorrow and check the details.' } } },
            { id: 'm2l-q28', number: 28, prompt: 'Estimated cost of discarded food', answer: { accepted: ['D'] }, explanation: { text: 'The cost figures will be presented as percentages so categories can be compared.', evidence: { quote: 'I think we should present the figures as percentages.' } } },
            { id: 'm2l-q29', number: 29, prompt: 'Reasons students leave food uneaten', answer: { accepted: ['E'] }, explanation: { text: 'One short student quotation will be included in that section.', evidence: { quote: 'We should include one short quotation in that section.' } } },
            { id: 'm2l-q30', number: 30, prompt: 'Comparison with other university campuses', answer: { accepted: ['B'] }, explanation: { text: 'Maya would rather remove the comparison section because the figures may have been collected differently.', evidence: { quote: "I'd rather remove that section." } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'The importance of coastal wetlands',
      audio: {
        intro: 'Part 4. You will hear a lecture on the importance of coastal wetlands. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Dr. Lewis', voice: M, accent: 'en-GB', text: "Today, we're going to examine the importance of coastal wetlands and consider why these environments deserve greater attention in conservation planning." },
          { speaker: 'Dr. Lewis', voice: M, accent: 'en-GB', text: 'Coastal wetlands include areas such as salt marshes, tidal flats and mangrove forests. Although they may appear quite different, they perform several important environmental functions.' },
          { speaker: 'Dr. Lewis', voice: M, accent: 'en-GB', text: 'First, wetlands provide natural protection against coastal forces. When waves approach the shore, wetland vegetation and the surrounding landscape help absorb some of their energy. This can reduce the impact of strong waves on nearby land and communities. Wetlands also trap sediment carried by rivers and tides. As this material settles, it can help maintain the shape and stability of the coastal environment.' },
          { speaker: 'Dr. Lewis', voice: M, accent: 'en-GB', text: 'A second important feature is the ability of many wetland plants to survive in difficult environmental conditions. Some coastal wetlands contain water with high levels of salt. Plants living there have developed ways of dealing with this environment. Their root systems are also important because they help hold the soil together. This reduces the amount of material that can be washed away by moving water.' },
          { speaker: 'Dr. Lewis', voice: M, accent: 'en-GB', text: 'Wetlands are equally valuable as wildlife habitats. They provide a nursery area for many young fish. In these relatively sheltered environments, young fish can find food and protection before moving into deeper waters. Wetlands also support a wide variety of birds, insects and other animals. Some birds use these areas as feeding grounds during seasonal migration.' },
          { speaker: 'Dr. Lewis', voice: M, accent: 'en-GB', text: 'Another important function relates to climate regulation. Wetland soils can store large quantities of carbon. In some cases, this carbon remains stored in the soil for long periods. When wetlands are drained or damaged, however, some of the stored carbon may be released into the atmosphere.' },
          { speaker: 'Dr. Lewis', voice: M, accent: 'en-GB', text: 'Wetlands can also play a role in water management. Their natural structure helps slow the movement of water across the landscape. This can reduce the effects of poor drainage in coastal areas, particularly after periods of heavy rainfall. However, wetlands cannot prevent all flooding, and their effectiveness depends on their size, condition and location.' },
          { speaker: 'Dr. Lewis', voice: M, accent: 'en-GB', text: 'Despite these benefits, coastal wetlands face several threats. One major problem is water pollution from nearby settlements. Wastewater and other pollutants may enter rivers and eventually reach wetland environments. Agricultural activity and construction can create additional pressure.' },
          { speaker: 'Dr. Lewis', voice: M, accent: 'en-GB', text: 'Conservation work is therefore essential. In some places, restoration projects have helped damaged wetlands recover. These projects may involve reintroducing suitable plant species, improving water flow and removing materials that interfere with natural processes.' },
          { speaker: 'Dr. Lewis', voice: M, accent: 'en-GB', text: 'However, restoration is not simply a matter of planting vegetation and leaving the area alone. Long-term monitoring is needed to assess changes in wetland health. Scientists may measure plant growth, water quality and the number of animal species present. This information helps them understand whether a restoration project is achieving its objectives.' },
          { speaker: 'Dr. Lewis', voice: M, accent: 'en-GB', text: 'Finally, successful conservation plans must include regular maintenance of the area. Local communities, environmental organisations and government agencies may all have a role to play. Protecting wetlands requires long-term cooperation rather than a single short-term project.' },
          { speaker: 'Dr. Lewis', voice: M, accent: 'en-GB', text: 'To conclude, coastal wetlands are valuable not only because they support wildlife, but also because they protect coastlines, store carbon and contribute to water management. Their conservation should therefore be considered an important part of sustainable coastal development.' },
        ],
      },
      groups: [
        {
          id: 'm2l-g6',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'COASTAL WETLANDS\n\n1. Protection from natural forces\n- Wetlands help absorb the energy of incoming {{31}}.\n- They trap sediment carried by rivers and tides.\n\n2. Environmental conditions\n- Many wetland plants can survive in water containing high levels of {{32}}.\n- Their extensive {{33}} systems help hold the soil together.\n\n3. Importance for wildlife\n- Wetlands provide a {{34}} area for many young fish.\n- They also support birds and other wildlife.\n\n4. Climate and water management\n- Wetland soils can store large amounts of {{35}}.\n- Natural wetlands can reduce the effects of poor {{36}} in coastal areas.\n\n5. Threats and conservation\n- One major threat is water {{37}} from nearby settlements.\n- Successful {{38}} projects may help damaged wetlands recover.\n- Long-term {{39}} is needed to assess changes in wetland health.\n- Conservation plans must include regular {{40}} of the area.',
          questions: [
            { id: 'm2l-q31', number: 31, answer: { accepted: ['waves'] }, explanation: { text: 'When waves approach the shore, wetland vegetation helps absorb some of their energy.', evidence: { quote: 'When waves approach the shore, wetland vegetation and the surrounding landscape help absorb some of their energy.' } } },
            { id: 'm2l-q32', number: 32, answer: { accepted: ['salt'] }, explanation: { text: 'Some coastal wetlands contain water with high levels of salt.', evidence: { quote: 'Some coastal wetlands contain water with high levels of salt.' } } },
            { id: 'm2l-q33', number: 33, answer: { accepted: ['root'] }, explanation: { text: 'Their root systems help hold the soil together.', evidence: { quote: 'Their root systems are also important because they help hold the soil together.' } } },
            { id: 'm2l-q34', number: 34, answer: { accepted: ['nursery'] }, explanation: { text: 'Wetlands provide a nursery area for many young fish.', evidence: { quote: 'They provide a nursery area for many young fish.' } } },
            { id: 'm2l-q35', number: 35, answer: { accepted: ['carbon'] }, explanation: { text: 'Wetland soils can store large quantities of carbon.', evidence: { quote: 'Wetland soils can store large quantities of carbon.' } } },
            { id: 'm2l-q36', number: 36, answer: { accepted: ['drainage'] }, explanation: { text: 'Wetlands can reduce the effects of poor drainage in coastal areas.', evidence: { quote: 'This can reduce the effects of poor drainage in coastal areas' } } },
            { id: 'm2l-q37', number: 37, answer: { accepted: ['pollution'] }, explanation: { text: 'Water pollution from nearby settlements is a major threat.', evidence: { quote: 'One major problem is water pollution from nearby settlements.' } } },
            { id: 'm2l-q38', number: 38, answer: { accepted: ['restoration'] }, explanation: { text: 'Restoration projects have helped damaged wetlands recover.', evidence: { quote: 'restoration projects have helped damaged wetlands recover' } } },
            { id: 'm2l-q39', number: 39, answer: { accepted: ['monitoring'] }, explanation: { text: 'Long-term monitoring is needed to assess changes in wetland health.', evidence: { quote: 'Long-term monitoring is needed to assess changes in wetland health.' } } },
            { id: 'm2l-q40', number: 40, answer: { accepted: ['maintenance'] }, explanation: { text: 'Conservation plans must include regular maintenance of the area.', evidence: { quote: 'successful conservation plans must include regular maintenance of the area' } } },
          ],
        },
      ],
    },
  ],
};
