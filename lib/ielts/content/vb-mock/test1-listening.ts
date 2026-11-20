import type { ListeningAudio, ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 1 — Listening. Original content written for
 * Mino in the style and difficulty of the IELTS Listening test
 * (4 parts, 40 questions). Not Cambridge material.
 *
 * Content: community gardening programme (Part 1), Science and Discovery
 * Centre visit (Part 2), students discussing a travel research project
 * (Part 3), lecture on how urban trees affect the environment (Part 4).
 */
const rec = (partId: string) => recorded('vb-mock-1', partId);

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
      title: 'Joining a community gardening programme',
      audio: {
        intro: 'Part 1. You will hear a woman phoning a community garden to join a gardening programme. First, you have some time to look at questions 1 to 10.',
        noun: 'conversation',
        ...rec('l1'),
        // Questions 1–5 are answered by line 13; the break comes before the meeting-time question.
        sets: [
          { questions: '1 to 5', fromLine: 0 },
          { questions: '6 to 10', fromLine: 14 },
        ],
        script: [
          { speaker: 'Helen', voice: W, accent: 'en-GB', text: 'Good morning, Riverside Community Garden. Helen speaking. How can I help you?' },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Hello. I saw a notice about your gardening programme, and I'd like to join if there are still places available." },
          { speaker: 'Helen', voice: W, accent: 'en-GB', text: "Yes, certainly. We're taking new members for the summer season. I'll just need a few details. Could I have your full name?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "It's Emma Collins. C-O-L-L-I-N-S." },
          { speaker: 'Helen', voice: W, accent: 'en-GB', text: 'Thank you. And where are you living at the moment?' },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "At 18 Willow Street. That's W-I-L-L-O-W. It's quite close to the riverside park." },
          { speaker: 'Helen', voice: W, accent: 'en-GB', text: 'Oh, yes, I know the area. Could I have a contact number?' },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "My landline is unreliable, so please use my mobile. It's 07846 295 130." },
          { speaker: 'Helen', voice: W, accent: 'en-GB', text: 'Let me check: 07846 295 130?' },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "That's right." },
          { speaker: 'Helen', voice: W, accent: 'en-GB', text: 'Excellent. Now, our first group meeting is on the third of May. Would that suit you?' },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "I was hoping to start on the tenth, actually. I'll be away during the first week." },
          { speaker: 'Helen', voice: W, accent: 'en-GB', text: "That's no problem. You can join us on the tenth. We usually meet on Saturdays, although the children's group comes on Sundays." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: 'Saturdays are perfect. What time do you normally start?' },
          { speaker: 'Helen', voice: W, accent: 'en-GB', text: 'We meet at half past nine in the morning and finish around midday. People can stay longer if they want to.' },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: 'That sounds good. Is there a membership fee?' },
          { speaker: 'Helen', voice: W, accent: 'en-GB', text: "Yes, it's thirty-two pounds for the whole year. That covers the use of the tools and the cost of seeds. We do ask members to buy their own gloves, though." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Fine. I'm particularly interested in growing vegetables. Do you have a group for that?" },
          { speaker: 'Helen', voice: W, accent: 'en-GB', text: "We do. There's also a flower-arranging group and a small wildlife project, but the vegetable-growing sessions are probably the best place to begin." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "I'd definitely choose that one." },
          { speaker: 'Helen', voice: W, accent: 'en-GB', text: 'Good. You should bring a pair of gardening gloves on your first visit. We can lend you a small hand trowel.' },
          // Fixed: the supplied line was misattributed to Emma (the applicant). Helen asks where Emma saw the notice.
          { speaker: 'Helen', voice: W, accent: 'en-GB', text: 'May I ask where you saw the notice?' },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "I found it on the noticeboard at Central Library. I'd actually gone there to return some books." },
          { speaker: 'Helen', voice: W, accent: 'en-GB', text: "Ah, that's useful to know. I'll make a note of it. We'll send you a confirmation email this afternoon." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: 'Thank you very much. Goodbye.' },
          { speaker: 'Helen', voice: W, accent: 'en-GB', text: 'Goodbye, Emma. We look forward to meeting you.' },
        ],
      },
      groups: [
        {
          id: 'l1-g1',
          type: 'form-completion',
          instructions: 'Complete the registration form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 1, number: true },
          template:
            'RIVERSIDE COMMUNITY GARDEN — REGISTRATION FORM\nApplicant’s name: Emma {{1}}\nHome address: 18 {{2}} Street\nContact number: {{3}}\nPreferred starting date: {{4}} May\nUsual meeting day: {{5}}\nMeeting time: {{6}}\nMembership fee: £{{7}} per year\nSpecial activity chosen: {{8}}\nItem to bring: A pair of {{9}}\nAdvertisement seen at: {{10}} Library',
          questions: [
            { id: 'l1-q1', number: 1, answer: { accepted: ['Collins'] }, explanation: { text: 'The surname is spelled out: C-O-L-L-I-N-S.', evidence: { quote: "It's Emma Collins. C-O-L-L-I-N-S." } } },
            { id: 'l1-q2', number: 2, answer: { accepted: ['Willow'] }, explanation: { text: 'The street name is spelled out: W-I-L-L-O-W.', evidence: { quote: "At 18 Willow Street. That's W-I-L-L-O-W." } } },
            {
              id: 'l1-q3',
              number: 3,
              answer: { accepted: ['07846295130', '07846 295130', '07846 295 130'] },
              explanation: { text: 'Emma rejects the landline and gives her mobile number.', evidence: { quote: "My landline is unreliable, so please use my mobile. It's 07846 295 130." } },
            },
            {
              id: 'l1-q4',
              number: 4,
              answer: { accepted: ['10', '10th', 'tenth'] },
              explanation: { text: 'The third of May was the original meeting date; Emma joins on the tenth.', evidence: { quote: 'I was hoping to start on the tenth, actually.' } },
            },
            {
              id: 'l1-q5',
              number: 5,
              answer: { accepted: ['Saturdays', 'Saturday'] },
              explanation: { text: "Saturdays is the usual meeting day; Sundays is the children's group.", evidence: { quote: "We usually meet on Saturdays, although the children's group comes on Sundays." } },
            },
            {
              id: 'l1-q6',
              number: 6,
              answer: { accepted: ['9:30', '9.30'] },
              explanation: { text: 'The meeting starts at half past nine; midday is when it finishes.', evidence: { quote: 'We meet at half past nine in the morning and finish around midday.' } },
            },
            {
              id: 'l1-q7',
              number: 7,
              answer: { accepted: ['32'] },
              explanation: { text: 'The annual fee is thirty-two pounds.', evidence: { quote: "it's thirty-two pounds for the whole year" } },
            },
            {
              id: 'l1-q8',
              number: 8,
              answer: { accepted: ['vegetables', 'vegetable-growing'] },
              explanation: { text: 'Emma chooses the vegetable-growing sessions; flower arranging and the wildlife project are the other options.', evidence: { quote: 'the vegetable-growing sessions are probably the best place to begin' } },
            },
            {
              id: 'l1-q9',
              number: 9,
              answer: { accepted: ['gloves'] },
              explanation: { text: 'Members bring their own gloves; the centre lends a hand trowel.', evidence: { quote: 'You should bring a pair of gardening gloves on your first visit.' } },
            },
            {
              id: 'l1-q10',
              number: 10,
              answer: { accepted: ['Central'] },
              explanation: { text: 'Emma saw the notice on the noticeboard at Central Library.', evidence: { quote: 'I found it on the noticeboard at Central Library.' } },
            },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 2
    {
      id: 'l2',
      number: 2,
      title: 'A visit to the Science and Discovery Centre',
      audio: {
        intro: 'Part 2. You will hear a guide talking to a group of visitors at a science and discovery centre. First, you have some time to look at questions 11 to 20.',
        noun: 'talk',
        ...rec('l2'),
        // Questions 11–15 are answered by line 5; the break comes before the room-by-room activities.
        sets: [
          { questions: '11 to 15', fromLine: 0 },
          { questions: '16 to 20', fromLine: 6 },
        ],
        script: [
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "Good morning, everyone, and welcome to the Northbridge Science and Discovery Centre. Before you explore the building, I'll give you a little background and explain what's available today." },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "The building itself has an interesting history. Many people think it was once a railway station because of its long entrance hall. In fact, it was a textile factory, producing cloth for local businesses until the late nineteen-seventies. After the factory closed, the building remained empty for nearly twenty years." },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: 'The centre opened in 2001. Last year, however, we had to close for a period of five months. Some visitors assumed we were installing a new exhibition, but the real reason was the condition of the roof. Heavy rain had caused damage, and the repairs were more extensive than expected.' },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "We now run a programme of evening events twice a month. These are not fundraising events, and they are not designed mainly for school groups. Instead, adults can take part in practical experiments, from making simple electrical circuits to testing the strength of different materials. You don't need a science background to join in." },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "Let me mention a few areas that may be especially interesting. The Energy Gallery has displays about electricity and renewable power. The outdoor garden is popular in good weather, but if you're visiting with very young children, I'd recommend the Sound Laboratory. It has large buttons, musical surfaces and safe activities that children can explore independently." },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "Our planetarium show begins at eleven thirty and lasts for about twenty-five minutes. It's quite popular, so please don't go straight to the planetarium entrance. You need to reserve a place at the reception desk first. There's no additional charge, but the room has limited seating." },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "Now, let's look at the activities in the different rooms. The Discovery Room is just beyond the main hall. Here, visitors can work in pairs to build a simple machine using wheels, levers and small weights. It's a good activity for anyone who enjoys making things." },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "The Nature Corner is at the far end of the ground floor. There are several displays about local wildlife, but the most popular activity is using magnifying equipment to observe insects in detail. Please remember that the insects are kept in special containers, so don't open them." },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "Upstairs, you'll find the Media Studio. Visitors can use the computers to create a digital picture, then print a copy to take home. The staff will show you how to use the software." },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: 'The Materials Lab is next door. You can compare wood, plastic, metal and other materials by testing how they respond to pressure and heat. Please follow the instructions carefully, especially when using the heated equipment.' },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "Finally, the Story Space is a quiet room for younger visitors. There are books on the shelves, but the main activity is listening to recorded stories through headphones. You can choose a story from the screen and listen at your own pace." },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "That's the main information. Please enjoy your visit, and ask any member of staff if you need help." },
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
              prompt: 'What was the building originally used for?',
              options: [
                { id: 'A', text: 'A railway station' },
                { id: 'B', text: 'A textile factory' },
                { id: 'C', text: 'A public library' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'It was a textile factory, not a railway station.',
                evidence: { quote: 'In fact, it was a textile factory, producing cloth for local businesses' },
                distractors: { A: 'Many people think it was a railway station because of its long entrance hall.' },
              },
            },
            {
              id: 'l2-q12',
              number: 12,
              prompt: 'Why was the centre closed for several months last year?',
              options: [
                { id: 'A', text: 'The roof needed major repairs.' },
                { id: 'B', text: 'A new exhibition was being prepared.' },
                { id: 'C', text: 'The entrance area was redesigned.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Heavy rain damaged the roof; the repairs took five months.',
                evidence: { quote: 'the real reason was the condition of the roof' },
                distractors: { B: 'Some visitors assumed a new exhibition was being installed.' },
              },
            },
            {
              id: 'l2-q13',
              number: 13,
              prompt: 'What is the main purpose of the centre’s evening events?',
              options: [
                { id: 'A', text: 'To raise money for local schools' },
                { id: 'B', text: 'To introduce visitors to scientific careers' },
                { id: 'C', text: 'To allow adults to try practical experiments' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'Adults take part in practical experiments at the evening events.',
                evidence: { quote: 'adults can take part in practical experiments' },
                distractors: { A: 'These are not fundraising events.', B: 'They are not designed mainly for school groups.' },
              },
            },
            {
              id: 'l2-q14',
              number: 14,
              prompt: 'Which area is most suitable for younger children?',
              options: [
                { id: 'A', text: 'The sound laboratory' },
                { id: 'B', text: 'The outdoor garden' },
                { id: 'C', text: 'The energy gallery' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The Sound Laboratory is recommended for very young children.',
                evidence: { quote: "if you're visiting with very young children, I'd recommend the Sound Laboratory" },
                distractors: { B: 'The outdoor garden is popular in good weather, but is not the recommendation for very young children.' },
              },
            },
            {
              id: 'l2-q15',
              number: 15,
              prompt: 'What should visitors do if they want to join the planetarium show?',
              options: [
                { id: 'A', text: 'Book a place at the reception desk' },
                { id: 'B', text: 'Wait beside the main staircase' },
                { id: 'C', text: 'Collect a ticket from the café' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Visitors must reserve a place at reception; they should not go straight to the planetarium entrance.',
                evidence: { quote: 'You need to reserve a place at the reception desk first.' },
              },
            },
          ],
        },
        {
          id: 'l2-g2',
          type: 'matching',
          instructions: 'Which activity is available in each area? Choose the correct letter, A–F. You may use any letter more than once.',
          optionsTitle: 'Activities',
          options: [
            { id: 'A', text: 'Build a simple machine' },
            { id: 'B', text: 'Listen to recorded stories' },
            { id: 'C', text: 'Observe insects closely' },
            { id: 'D', text: 'Test different materials' },
            { id: 'E', text: 'Create a digital picture' },
            { id: 'F', text: 'Watch a short science film' },
          ],
          questions: [
            { id: 'l2-q16', number: 16, prompt: 'Discovery Room', answer: { accepted: ['A'] }, explanation: { text: 'Visitors build a simple machine with wheels, levers and small weights.', evidence: { quote: 'visitors can work in pairs to build a simple machine' } } },
            { id: 'l2-q17', number: 17, prompt: 'Nature Corner', answer: { accepted: ['C'] }, explanation: { text: 'Magnifying equipment is used to observe insects in detail.', evidence: { quote: 'the most popular activity is using magnifying equipment to observe insects in detail' } } },
            { id: 'l2-q18', number: 18, prompt: 'Media Studio', answer: { accepted: ['E'] }, explanation: { text: 'Visitors use computers to create a digital picture.', evidence: { quote: 'Visitors can use the computers to create a digital picture' } } },
            { id: 'l2-q19', number: 19, prompt: 'Materials Lab', answer: { accepted: ['D'] }, explanation: { text: 'Materials are tested for how they respond to pressure and heat.', evidence: { quote: 'You can compare wood, plastic, metal and other materials by testing how they respond to pressure and heat' } } },
            { id: 'l2-q20', number: 20, prompt: 'Story Space', answer: { accepted: ['B'] }, explanation: { text: 'The main activity is listening to recorded stories through headphones.', evidence: { quote: 'the main activity is listening to recorded stories through headphones' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Students discussing a research project',
      audio: {
        intro: 'Part 3. You will hear two students, Nina and Leo, discussing a research project. First, you have some time to look at questions 21 to 30.',
        noun: 'discussion',
        ...rec('l3'),
        // Questions 21–25 are answered by line 16; the break comes before the sections are organised.
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 17 },
        ],
        script: [
          { speaker: 'Nina', voice: W, accent: 'en-GB', text: 'Have you had a chance to look at the results from our first questionnaire?' },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: "Yes, I went through them last night. There's quite a lot we can use. But before we start writing, I think we should make sure we're still answering the question we agreed on." },
          { speaker: 'Nina', voice: W, accent: 'en-GB', text: 'You mean how students get to campus?' },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: "Exactly. We're not really comparing the cost of public transport, and we're certainly not investigating why people choose this university. We want to understand the ways students travel here and what influences those choices." },
          { speaker: 'Nina', voice: W, accent: 'en-GB', text: "Right. I'm glad you mentioned that. I was looking at the questionnaire again, and I noticed a problem. We included walking, cycling, buses and trains, but we forgot to include shared cars. A few students wrote that in the final comments." },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: "That's true, although I don't think it was the biggest weakness. The main issue was when we handed them out. We did it just before the afternoon lectures, so quite a few people were rushing and didn't have time to complete them properly." },
          { speaker: 'Nina', voice: W, accent: 'en-GB', text: 'That explains some of the incomplete answers. We should distribute the next version at a quieter time.' },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: 'Agreed. What surprised me most was the number of people who cycle. I thought it would be quite low, especially because the campus is on a hill.' },
          { speaker: 'Nina', voice: W, accent: 'en-GB', text: 'I was surprised too, but not by cycling. I expected more students to walk. In fact, several students who live quite close still take the bus.' },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: "Maybe they have heavy bags, or perhaps they simply prefer not to walk. We shouldn't guess. We could ask about that in the next questionnaire." },
          { speaker: 'Nina', voice: W, accent: 'en-GB', text: "Before we collect more responses, though, I think someone should check our questions. We don't want another problem with the wording." },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: "Yes. We could ask students from another university, but they might interpret the questions differently because their campus is arranged differently. I'd rather ask Dr Morgan, our course tutor, to review them." },
          { speaker: 'Nina', voice: W, accent: 'en-GB', text: 'Good idea. She has experience with survey design. Once she approves the revised questionnaire, we can distribute it again.' },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: 'Now, how should we present the findings? A written report would be useful, but we also have to give a short presentation.' },
          { speaker: 'Nina', voice: W, accent: 'en-GB', text: 'I thought about making a video showing the different routes to campus.' },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: "That might take too much time, and it wouldn't really explain the results. What about a few graphs, with some short comments from the students?" },
          { speaker: 'Nina', voice: W, accent: 'en-GB', text: 'Yes, that would show the overall pattern and give the audience a sense of individual experiences. Let’s do that.' },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: 'We still need to organise the sections. First, travel costs. We only have information from a small number of students, so I don’t think we should make a graph from it.' },
          { speaker: 'Nina', voice: W, accent: 'en-GB', text: 'We could ask the finance office for official figures.' },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: "That would be useful. Let's collect additional information rather than leave the section out." },
          { speaker: 'Nina', voice: W, accent: 'en-GB', text: 'Fine. What about walking distances? We have enough responses, but the numbers are a bit difficult to compare.' },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: 'A graph would make that much clearer. We can group the distances into three ranges.' },
          { speaker: 'Nina', voice: W, accent: 'en-GB', text: 'Good. Now, reasons for cycling. We have some interesting comments, but not enough to make a reliable statistical comparison.' },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: "Then let's not force it into a graph. We could include one short quotation that represents a common reason." },
          { speaker: 'Nina', voice: W, accent: 'en-GB', text: 'That works. For bus reliability, I’m not sure our data is strong enough. Some students use the bus every day, while others only use it occasionally.' },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: 'We should ask another student to check that section. Someone who uses the bus regularly might notice something we’ve missed.' },
          { speaker: 'Nina', voice: W, accent: 'en-GB', text: 'Agreed. Finally, the personal experiences. I think we should save those for the end.' },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: 'Yes, but not as the conclusion itself. We can use them just before our final summary, so the audience hears real examples before we finish.' },
          { speaker: 'Nina', voice: W, accent: 'en-GB', text: 'Perfect. I’ll revise the questionnaire and send it to Dr Morgan tomorrow.' },
          { speaker: 'Leo', voice: M, accent: 'en-GB', text: 'Great. I’ll organise the existing results into the graph format.' },
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
              prompt: 'What is the main aim of the students’ project?',
              options: [
                { id: 'A', text: 'To compare the cost of different transport systems' },
                { id: 'B', text: 'To investigate how students travel to campus' },
                { id: 'C', text: 'To find out why students choose particular universities' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'They want to understand how students travel to campus and what influences those choices.',
                evidence: { quote: 'We want to understand the ways students travel here and what influences those choices.' },
                distractors: { A: 'Leo explicitly says they are not comparing the cost of public transport.', C: 'Leo explicitly says they are not investigating why people choose this university.' },
              },
            },
            {
              id: 'l3-q22',
              number: 22,
              // Fixed: the supplied stem credited Nina, but in the transcript Leo identifies timing as the main issue; Nina's stated problem is the missing shared-car option.
              prompt: 'What was the biggest weakness of their first questionnaire?',
              options: [
                { id: 'A', text: 'It included too many personal questions.' },
                { id: 'B', text: 'It was distributed at an unsuitable time.' },
                { id: 'C', text: 'It did not include enough transport options.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The main issue was the timing: handed out just before afternoon lectures, when people were rushing.',
                evidence: { quote: 'The main issue was when we handed them out.' },
                distractors: { C: 'Nina mentions the missing shared-car option, but Leo says timing was the biggest weakness.' },
              },
            },
            {
              id: 'l3-q23',
              number: 23,
              // Fixed: the supplied stem said "both students", but Nina was surprised by the walking pattern, not by cycling.
              prompt: 'What did Leo find surprising about the preliminary results?',
              options: [
                { id: 'A', text: 'Many students walked despite living far away.' },
                { id: 'B', text: 'Cycling was more common than they had expected.' },
                { id: 'C', text: 'Most students used buses only during bad weather.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Leo was surprised by how many people cycle, given the campus is on a hill.',
                evidence: { quote: 'What surprised me most was the number of people who cycle.' },
                distractors: { A: 'Nina was surprised by the walking pattern — she expected more students to walk.' },
              },
            },
            {
              id: 'l3-q24',
              number: 24,
              prompt: 'What does Leo suggest they do before collecting more data?',
              options: [
                { id: 'A', text: 'Ask the course tutor to review the questions' },
                { id: 'B', text: 'Interview students from another university' },
                { id: 'C', text: 'Remove the questions about travel costs' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Leo would rather ask Dr Morgan, the course tutor, to review the questions.',
                evidence: { quote: "I'd rather ask Dr Morgan, our course tutor, to review them." },
                distractors: { B: 'Considered, but rejected: students elsewhere might interpret the questions differently.' },
              },
            },
            {
              id: 'l3-q25',
              number: 25,
              prompt: 'How have the students decided to present their findings?',
              options: [
                { id: 'A', text: 'By using a written report only' },
                { id: 'B', text: 'By combining graphs with selected student comments' },
                { id: 'C', text: 'By showing a video of the journey to campus' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Graphs with short student comments show the pattern and individual experiences.',
                evidence: { quote: 'What about a few graphs, with some short comments from the students?' },
                distractors: { C: 'A video was considered but rejected as too time-consuming.' },
              },
            },
          ],
        },
        {
          id: 'l3-g2',
          type: 'matching',
          instructions: 'What action do the students decide to take for each part of their project? Choose the correct letter, A–F.',
          optionsTitle: 'Actions',
          options: [
            { id: 'A', text: 'Delete the section' },
            { id: 'B', text: 'Collect additional information' },
            { id: 'C', text: 'Present it as a graph' },
            // Fixed: the supplied "Move it to the conclusion" contradicts the transcript ("not as the conclusion itself").
            { id: 'D', text: 'Move it to just before the conclusion' },
            { id: 'E', text: 'Ask another student to check it' },
            { id: 'F', text: 'Include a short quotation' },
          ],
          questions: [
            { id: 'l3-q26', number: 26, prompt: 'Travel costs', answer: { accepted: ['B'] }, explanation: { text: 'They will ask the finance office for official figures instead of leaving the section out.', evidence: { quote: "Let's collect additional information rather than leave the section out." } } },
            { id: 'l3-q27', number: 27, prompt: 'Walking distances', answer: { accepted: ['C'] }, explanation: { text: 'A graph makes the distances easier to compare.', evidence: { quote: 'A graph would make that much clearer.' } } },
            { id: 'l3-q28', number: 28, prompt: 'Reasons for cycling', answer: { accepted: ['F'] }, explanation: { text: 'There is not enough data for a graph, so one short quotation will represent a common reason.', evidence: { quote: 'We could include one short quotation that represents a common reason.' } } },
            { id: 'l3-q29', number: 29, prompt: 'Bus reliability', answer: { accepted: ['E'] }, explanation: { text: 'A regular bus user should check the section.', evidence: { quote: 'We should ask another student to check that section.' } } },
            { id: 'l3-q30', number: 30, prompt: 'Students’ personal experiences', answer: { accepted: ['D'] }, explanation: { text: 'The experiences go just before the final summary, not as the conclusion itself.', evidence: { quote: 'We can use them just before our final summary' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'How urban trees affect the environment',
      audio: {
        intro: 'Part 4. You will hear a lecture on how urban trees affect the environment. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: 'Good afternoon. Today we’re going to look at the role of trees in urban environments. Trees are often planted simply because people like the appearance of streets and parks. However, they also provide several environmental benefits, particularly in towns and cities where buildings, roads and traffic can create difficult conditions.' },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: 'Let’s begin with temperature. During the day, roads and buildings absorb energy from sunlight and become very warm. Trees reduce this effect by providing shade. In particular, they limit the amount of heat absorbed by concrete surfaces, which can otherwise remain warm for hours after sunset.' },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: 'There is another cooling process worth understanding. Trees release water vapour through their leaves. This process is known as transpiration. As water evaporates, it takes energy from the surroundings, helping to lower the temperature of the nearby air. The effect may be especially noticeable in areas with several mature trees.' },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: 'Trees can also influence air quality. Their leaves and branches can capture small particles of dust and other material carried by the wind. Some of these particles come from traffic, construction work and industrial activity. Trees may also absorb certain harmful gases, although the amount depends on the species and the conditions in which they grow.' },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: 'Now let’s consider water management. In areas covered by roads and buildings, rainwater often runs quickly across hard surfaces and enters drains. Tree roots help water enter the soil rather than simply flowing over the ground. This is important because it can reduce the risk of flooding after periods of heavy rain. Of course, trees cannot prevent every flood, but they can form part of a wider drainage strategy.' },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: 'Another benefit concerns wildlife. Trees provide food and shelter for many species of birds. Some produce fruit or seeds, while others attract insects that birds can eat. Older trees are particularly valuable because their trunks may develop hollows. These natural spaces can provide homes for insects, small mammals and even some nesting birds.' },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: 'However, planting trees successfully requires careful planning. A species that grows well in a wet climate may struggle in a dry urban area. For this reason, local climate should be considered before selecting trees. Planners also need to think about the amount of space available, the condition of the soil and the likely size of the tree when it is fully grown.' },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: 'Finally, planting is only the beginning. Young trees need water and protection, especially during their first few years. Damaged branches may need attention, and the surrounding soil should be checked regularly. In other words, successful urban tree programmes depend on long-term maintenance, not simply the number of trees planted in the first year.' },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: 'So, when we evaluate a city’s tree programme, we should look beyond the number of trees. We should also consider their condition, their location and the environmental benefits they actually provide.' },
        ],
      },
      groups: [
        {
          id: 'l4-g1',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'URBAN TREES AND THEIR ENVIRONMENTAL EFFECTS\n\nTemperature\n31. Trees provide shade and reduce the amount of heat absorbed by {{31}} surfaces.\n32. Water released from leaves helps cool the surrounding {{32}}.\n\nAir quality\n33. Leaves can capture small particles of {{33}}.\n34. Trees may also reduce the amount of certain harmful {{34}} in the air.\n\nWater management\n35. Tree roots help water enter the {{35}}.\n36. This can reduce the risk of local {{36}} after heavy rain.\n\nWildlife\n37. Different tree species provide food and {{37}} for birds.\n38. Older trees may contain natural {{38}} where insects and small animals live.\n\nPlanning\n39. Trees should be selected according to the local {{39}}.\n40. Successful planting requires long-term {{40}}.',
          questions: [
            { id: 'l4-q31', number: 31, answer: { accepted: ['concrete'] }, explanation: { text: 'Heat is absorbed by concrete surfaces; trees shade them.', evidence: { quote: 'they limit the amount of heat absorbed by concrete surfaces' } } },
            { id: 'l4-q32', number: 32, answer: { accepted: ['air'] }, explanation: { text: 'Transpiration cools the nearby air.', evidence: { quote: 'helping to lower the temperature of the nearby air' } } },
            { id: 'l4-q33', number: 33, answer: { accepted: ['dust'] }, explanation: { text: 'Leaves capture small particles of dust.', evidence: { quote: 'can capture small particles of dust' } } },
            { id: 'l4-q34', number: 34, answer: { accepted: ['gases'] }, explanation: { text: 'Trees may absorb certain harmful gases.', evidence: { quote: 'Trees may also absorb certain harmful gases' } } },
            { id: 'l4-q35', number: 35, answer: { accepted: ['soil'] }, explanation: { text: 'Roots help water enter the soil instead of running over the ground.', evidence: { quote: 'Tree roots help water enter the soil' } } },
            { id: 'l4-q36', number: 36, answer: { accepted: ['flooding'] }, explanation: { text: 'Better drainage reduces the risk of flooding after heavy rain.', evidence: { quote: 'it can reduce the risk of flooding after periods of heavy rain' } } },
            { id: 'l4-q37', number: 37, answer: { accepted: ['shelter'] }, explanation: { text: 'Trees provide food and shelter for birds.', evidence: { quote: 'Trees provide food and shelter for many species of birds' } } },
            { id: 'l4-q38', number: 38, answer: { accepted: ['hollows'] }, explanation: { text: 'Older trunks develop hollows that house insects and small animals.', evidence: { quote: 'their trunks may develop hollows' } } },
            { id: 'l4-q39', number: 39, answer: { accepted: ['climate'] }, explanation: { text: 'The local climate must be considered before selecting trees.', evidence: { quote: 'local climate should be considered before selecting trees' } } },
            { id: 'l4-q40', number: 40, answer: { accepted: ['maintenance'] }, explanation: { text: 'Success depends on long-term maintenance, not just planting numbers.', evidence: { quote: 'successful urban tree programmes depend on long-term maintenance' } } },
          ],
        },
      ],
    },
  ],
};
