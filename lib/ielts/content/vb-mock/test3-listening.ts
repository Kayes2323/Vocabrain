import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 3 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material. Follows the Cambridge 19 Test 1 format (same timing,
 * counts and question types).
 */

const rec = (partId: string) => recorded('vb-mock-3', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock3Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Reporting a lost library book',
      audio: {
        intro: 'Part 1. You will hear a student phoning a library about a lost book. First, you have some time to look at questions 1 to 6.',
        noun: 'conversation',
        ...rec('l1'),
        // Questions 1–6 are answered by line 13; the break comes before the questions about what happens next.
        sets: [
          { questions: '1 to 6', fromLine: 0 },
          { questions: '7 to 10', fromLine: 14 },
        ],
        script: [
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: "Good morning, Northgate Library. Sarah speaking. How can I help?" },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "Hello. I'm a member of the library, and I'm afraid I've lost a book I borrowed. I'd like to report it, and also reserve another book, if that's possible." },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: "Of course. Let me take a few details first. Could I have your name, please?" },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "Yes, it's Daniel Byrne." },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: "Could you spell your surname for me, please?" },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "Sure. B, Y, R, N, E." },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: "Thank you. And your membership number? It's on your library card." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "Let me see. It's four, eight, two, six, one, three." },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: "Four eight two six one three. Thank you. Now, which book have you lost?" },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "It's called Wildwood. It's a novel about a family who move to a house in the forest." },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: "Wildwood. Let me check. Yes, here it is. It was due back on the twelfth of November, so it's nine days overdue." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "Oh dear. I thought it was due on the twenty-first. How much is the fine?" },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: "It's fifty pence a day, so for nine days that's four pounds fifty." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "That's fine, I'll pay it. And the book I wanted to reserve is called Riverside." },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: "Riverside — I'll check that in a moment. First, about the lost book: you don't need to buy a replacement copy yourself. The fine covers the cost, and we'll order a new copy for the shelves." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "Oh, that's a relief. Is there anything else I need to do about it?" },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: "No, that's everything. Now, Riverside... I'm afraid it's out on loan at the moment. The reader who has it is due to bring it back on Friday, so we should be able to hold it for you from Monday." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "That's great. Could you put my name on it, please?" },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: "Certainly. It's done." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "How do I pay the fine? Can I pay it now, over the phone?" },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: "I'm afraid not. You can pay by card when you come in, or online through your library account. We don't take cash any more." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "I'll pay online, then. That's easier." },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: "Good. One more thing — the book is part of our popular fiction collection, so if you find it at home after all, please bring it back. There's no extra charge if you do." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "I'll have another look, but I think it's gone for good. What time do you close today? I'd like to come in and collect something else." },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: "We're open until six o'clock today. On Saturdays we close at five, but today is a Thursday, so it's six." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "Perfect. I'll come in after my lectures, around half past four." },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: "Lovely. And just so you know, your library card also gives you free access to our online newspapers, which might be useful for your studies." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "I didn't know that. Thanks very much for your help, Sarah." },
          { speaker: 'Librarian', voice: W, accent: 'en-GB', text: "You're welcome, Daniel. We'll see you later today." },
        ],
      },
      groups: [
        {
          id: 'm3l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 1, number: true },
          template:
            'NORTHGATE LIBRARY – LOST BOOK FORM\nName: Daniel {{1}}\nMembership number: {{2}}\nBook due back: {{3}} November\nTitle of lost book: {{4}}\nFine for late return: £{{5}}\nBook to be reserved: {{6}}',
          questions: [
            { id: 'm3l-q1', number: 1, answer: { accepted: ['Byrne'] }, explanation: { text: 'The surname is spelled out: B-Y-R-N-E.', evidence: { quote: 'B, Y, R, N, E.' } } },
            {
              id: 'm3l-q2',
              number: 2,
              answer: { accepted: ['482613', '482 613'] },
              explanation: { text: 'The membership number is read out digit by digit.', evidence: { quote: "It's four, eight, two, six, one, three." } },
            },
            {
              id: 'm3l-q3',
              number: 3,
              answer: { accepted: ['12', '12th', 'twelfth'] },
              explanation: { text: 'The book was due on the 12th, not the 21st as Daniel thought.', evidence: { quote: 'It was due back on the twelfth of November' } },
            },
            {
              id: 'm3l-q4',
              number: 4,
              answer: { accepted: ['Wildwood'] },
              explanation: { text: 'The lost book is a novel called Wildwood.', evidence: { quote: "It's called Wildwood." } },
            },
            {
              id: 'm3l-q5',
              number: 5,
              answer: { accepted: ['4.50', '4.5'] },
              explanation: { text: 'The fine is 50p a day for nine days, which comes to £4.50.', evidence: { quote: "that's four pounds fifty" } },
            },
            {
              id: 'm3l-q6',
              number: 6,
              answer: { accepted: ['Riverside'] },
              explanation: { text: 'Daniel wants to reserve a book called Riverside.', evidence: { quote: 'the book I wanted to reserve is called Riverside' } },
            },
          ],
        },
        {
          id: 'm3l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm3l-q7',
              number: 7,
              prompt: 'What does Daniel need to do about the lost book?',
              options: [
                { id: 'A', text: 'buy a replacement copy himself' },
                { id: 'B', text: 'pay the fine, and the library will order a new copy' },
                { id: 'C', text: 'return the book within a week' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The fine covers the cost, and the library orders the replacement.',
                evidence: { quote: "The fine covers the cost, and we'll order a new copy for the shelves" },
                distractors: { A: 'He does not need to buy a replacement copy himself.' },
              },
            },
            {
              id: 'm3l-q8',
              number: 8,
              prompt: 'How can Daniel pay the fine?',
              options: [
                { id: 'A', text: 'in cash at the library' },
                { id: 'B', text: 'by card in person or online' },
                { id: 'C', text: 'over the phone now' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'He can pay by card when he comes in, or online through his library account.',
                evidence: { quote: 'You can pay by card when you come in, or online through your library account' },
                distractors: { A: 'The library does not take cash any more.', C: 'He cannot pay over the phone.' },
              },
            },
            {
              id: 'm3l-q9',
              number: 9,
              prompt: 'What does the librarian say about ‘Riverside’?',
              options: [
                { id: 'A', text: 'It is on the shelf now.' },
                { id: 'B', text: 'It will be held for Daniel from Monday.' },
                { id: 'C', text: 'It cannot be reserved.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The book is out on loan until Friday, so it can be held from Monday.',
                evidence: { quote: 'we should be able to hold it for you from Monday' },
                distractors: { A: 'It is out on loan at the moment.' },
              },
            },
            {
              id: 'm3l-q10',
              number: 10,
              prompt: 'What time does the library close today?',
              options: [
                { id: 'A', text: '5 pm' },
                { id: 'B', text: '6 pm' },
                { id: 'C', text: '7 pm' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Today is a Thursday, so the library closes at six; five o’clock is the Saturday closing time.',
                evidence: { quote: "We're open until six o'clock today" },
                distractors: { A: 'That is the Saturday closing time.' },
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
      title: 'Harford Museum of Industry',
      audio: {
        intro: 'Part 2. You will hear a guide talking to a group of visitors at a museum. First, you have some time to look at questions 11 to 20.',
        noun: 'talk',
        ...rec('l2'),
        // Questions 11–14 are answered by line 3; the break comes before the tour route is described.
        sets: [
          { questions: '11 to 14', fromLine: 0 },
          { questions: '15 to 20', fromLine: 4 },
        ],
        script: [
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "Good afternoon, everyone, and welcome to the Harford Museum of Industry. My name's Anna, and I'll be showing you round this afternoon. Before we start, let me tell you a little about the building and the museum, and then I'll describe the route we'll take." },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "The museum stands on the site of an old cotton mill, which closed in nineteen sixty-two. Most people think the mill was built for cotton from the start, but it began life as a flour mill, and it was only converted to cotton in eighteen fifty, when the new railway brought raw cotton here from the port." },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "When the mill closed, the building stood empty for almost twenty years. A group of former mill workers campaigned to save it, and in nineteen eighty-one it finally reopened as a museum. Nearly all the money came from the town council, though local businesses gave smaller sums as well." },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "The museum is open every day except Mondays, and entry is free for children under sixteen. Adult tickets cost nine pounds, and that includes a free guidebook." },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "Right, let's begin our tour in the Engine Room, at the far end of this floor. The steam engine there is the largest working engine of its kind in the country, and our engineers start it up at eleven o'clock and three o'clock every day." },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "From there we go upstairs to the Weaving Gallery. This is where you'll see the looms in action, and on Saturdays you can watch our weavers at work and even try weaving a short piece of cloth yourself." },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "Next is the Workers' Cottages, a row of small houses just behind the museum. They have been furnished exactly as they would have been in eighteen ninety, and children love the old kitchen, with its coal fire and its tin bath." },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "Then we come to the Mill Pond. This is a lovely spot for a picnic in summer, but please don't feed the ducks — the bread makes them ill, and the wardens have to clear it away." },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "After the pond, we'll visit the Print Shop, where posters and tickets were printed for the whole town. It's closed this week because the printing press is being repaired, but you can still look through the windows." },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "Our last stop is the Museum Café, in the old packing shed. It serves hot lunches and homemade cakes, and it's open to everyone, so you don't need a museum ticket to eat there." },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "If you need the toilets, they're on the ground floor, next to the shop. The shop sells books and postcards, and every penny it makes goes back into looking after the building." },
          { speaker: 'Guide', voice: W, accent: 'en-GB', text: "That's the end of the introduction. If you're ready, follow me to the Engine Room, and please stay with the group." },
        ],
      },
      groups: [
        {
          id: 'm3l-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm3l-q11',
              number: 11,
              prompt: 'What was the mill first used for?',
              options: [
                { id: 'A', text: 'cotton' },
                { id: 'B', text: 'flour' },
                { id: 'C', text: 'wool' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The mill began as a flour mill and was only later converted to cotton.',
                evidence: { quote: 'it began life as a flour mill' },
                distractors: { A: 'Cotton came later, in 1850.' },
              },
            },
            {
              id: 'm3l-q12',
              number: 12,
              prompt: 'When did the building reopen as a museum?',
              options: [
                { id: 'A', text: '1962' },
                { id: 'B', text: '1981' },
                { id: 'C', text: '1890' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'After standing empty for almost twenty years, it reopened as a museum in 1981.',
                evidence: { quote: 'in nineteen eighty-one it finally reopened as a museum' },
                distractors: { A: 'That is when the mill closed.', C: 'That is the year the cottages are furnished to show.' },
              },
            },
            {
              id: 'm3l-q13',
              number: 13,
              prompt: 'Where did most of the money to save the building come from?',
              options: [
                { id: 'A', text: 'the town council' },
                { id: 'B', text: 'local businesses' },
                { id: 'C', text: 'former mill workers' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: '“Nearly all the money” came from the town council.',
                evidence: { quote: 'Nearly all the money came from the town council' },
                distractors: { B: 'Local businesses gave smaller sums.', C: 'The former workers campaigned to save it, but did not fund it.' },
              },
            },
            {
              id: 'm3l-q14',
              number: 14,
              prompt: 'How much does an adult ticket cost?',
              options: [
                { id: 'A', text: '£6' },
                { id: 'B', text: '£9' },
                { id: 'C', text: 'free' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Adult tickets cost nine pounds; only children under sixteen go in free.',
                evidence: { quote: 'Adult tickets cost nine pounds' },
                distractors: { C: 'Free entry is for children under sixteen only.' },
              },
            },
          ],
        },
        {
          id: 'm3l-g4',
          type: 'matching',
          instructions: 'What is said about each of the following places in the museum? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 15–20.',
          optionsTitle: 'Features',
          options: [
            { id: 'A', text: 'It has the largest working engine in the country.' },
            { id: 'B', text: 'Visitors can try an activity themselves.' },
            { id: 'C', text: 'It shows how people lived in the past.' },
            { id: 'D', text: 'It is a good place for a picnic.' },
            { id: 'E', text: 'It is closed for repairs.' },
            { id: 'F', text: 'You do not need a ticket to use it.' },
            { id: 'G', text: 'It is open only on Saturdays.' },
            { id: 'H', text: 'It sells books and postcards.' },
          ],
          questions: [
            { id: 'm3l-q15', number: 15, prompt: 'Engine Room', answer: { accepted: ['A'] }, explanation: { text: 'Its steam engine is the largest working engine of its kind in the country.', evidence: { quote: 'The steam engine there is the largest working engine of its kind in the country' } } },
            { id: 'm3l-q16', number: 16, prompt: 'Weaving Gallery', answer: { accepted: ['B'] }, explanation: { text: 'Visitors can try weaving a short piece of cloth themselves.', evidence: { quote: 'even try weaving a short piece of cloth yourself' }, distractors: { G: 'Weavers are there on Saturdays, but the gallery itself is not open only on Saturdays.' } } },
            { id: 'm3l-q17', number: 17, prompt: 'Workers’ Cottages', answer: { accepted: ['C'] }, explanation: { text: 'The cottages are furnished as they were in 1890.', evidence: { quote: 'They have been furnished exactly as they would have been in eighteen ninety' } } },
            { id: 'm3l-q18', number: 18, prompt: 'Mill Pond', answer: { accepted: ['D'] }, explanation: { text: 'It is a lovely spot for a picnic in summer.', evidence: { quote: 'This is a lovely spot for a picnic in summer' } } },
            { id: 'm3l-q19', number: 19, prompt: 'Print Shop', answer: { accepted: ['E'] }, explanation: { text: 'It is closed this week while the printing press is repaired.', evidence: { quote: "It's closed this week because the printing press is being repaired" } } },
            { id: 'm3l-q20', number: 20, prompt: 'Museum Café', answer: { accepted: ['F'] }, explanation: { text: 'It is open to everyone, with no museum ticket needed.', evidence: { quote: "you don't need a museum ticket to eat there" }, distractors: { H: 'It is the shop, not the café, that sells books and postcards.' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Planning a group presentation',
      audio: {
        intro: 'Part 3. You will hear two students, Maya and Josh, discussing a group presentation. First, you have some time to look at questions 21 to 30.',
        noun: 'discussion',
        ...rec('l3'),
        // Questions 21–25 are answered by line 8; the break comes before the jobs are shared out.
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 9 },
        ],
        script: [
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "Right, Josh, we've got twenty minutes before the seminar, so let's sort out our group presentation. It's on food waste, and we've got fifteen minutes to present on Thursday." },
          { speaker: 'Josh', voice: M, accent: 'en-AU', text: "OK. I've done some reading, and the numbers are shocking. Did you know that in this country, households throw away about a fifth of the food they buy?" },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "Really? I thought most waste came from supermarkets. I mean, they throw out food that's past its sell-by date, don't they?" },
          { speaker: 'Josh', voice: M, accent: 'en-AU', text: "They do, but households actually waste more than shops and restaurants put together. That's what surprised me most." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "Good, that's a strong opening point. What about the structure? I was thinking we start with the scale of the problem, then the causes, then the solutions." },
          { speaker: 'Josh', voice: M, accent: 'en-AU', text: "That works. For causes, I found that people often buy too much because of special offers — you know, buy one get one free — and then half of it goes off before they use it." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "Yes, and another cause is confusion about dates. Lots of people throw food away when it passes its best-before date, even though it's usually still safe to eat." },
          { speaker: 'Josh', voice: M, accent: 'en-AU', text: "Exactly. And for solutions, the most effective one seems to be meal planning — writing a shopping list and sticking to it. Some studies say it can cut waste by a third." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "That's better than I expected. I thought composting would be the main solution, but that only deals with waste after it's created." },
          { speaker: 'Josh', voice: M, accent: 'en-AU', text: "Right. Now, who's doing what? There are four of us, and Sara and Ben are doing the slides. That leaves the speaking to us." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "I don't mind introducing the topic and explaining the scale of the problem. You could do the causes, and then we can share the solutions and the conclusion." },
          { speaker: 'Josh', voice: M, accent: 'en-AU', text: "Sounds good. How long should each part be? The whole thing is fifteen minutes, so maybe five minutes for the problem, five for the causes, and five for the solutions?" },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "Hmm, the solutions are the most important part, so let's give them a bit longer — say four minutes for the problem, four for the causes, and seven for the solutions." },
          { speaker: 'Josh', voice: M, accent: 'en-AU', text: "OK. And what about questions at the end? The tutor said the audience will ask questions, and we need to be ready." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "I think we should prepare for the obvious one — whether food waste is really worse now than it was fifty years ago. I've got some figures for that." },
          { speaker: 'Josh', voice: M, accent: 'en-AU', text: "Good idea. And we should practise once before Thursday. How about tomorrow afternoon, in the library?" },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "Tomorrow's tricky for me — I've got a lab session until four. Could we do Wednesday morning instead?" },
          { speaker: 'Josh', voice: M, accent: 'en-AU', text: "Wednesday morning works for me. Let's meet at ten, in the study room on the second floor." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "Perfect. Oh, one more thing — Sara asked if we could all wear something smart for the presentation. She thinks it looks more professional." },
          { speaker: 'Josh', voice: M, accent: 'en-AU', text: "I don't mind, but Ben said he hasn't got anything smart. Maybe we just agree to look tidy, rather than formal." },
          { speaker: 'Maya', voice: W, accent: 'en-GB', text: "Fair enough. I'll tell Sara. Right, I'd better go — my seminar starts in five minutes." },
          { speaker: 'Josh', voice: M, accent: 'en-AU', text: "See you Wednesday at ten. Don't forget to send me your notes on the scale of the problem tonight." },
        ],
      },
      groups: [
        {
          id: 'm3l-g5',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm3l-q21',
              number: 21,
              prompt: 'According to Josh, who wastes the most food?',
              options: [
                { id: 'A', text: 'households' },
                { id: 'B', text: 'supermarkets' },
                { id: 'C', text: 'restaurants' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Households waste more than shops and restaurants put together.',
                evidence: { quote: 'households actually waste more than shops and restaurants put together' },
                distractors: { B: 'Maya thought supermarkets wasted most, but Josh corrects her.' },
              },
            },
            {
              id: 'm3l-q22',
              number: 22,
              prompt: 'What does Josh say is one cause of food waste?',
              options: [
                { id: 'A', text: 'People buy too much because of special offers.' },
                { id: 'B', text: 'Food is too expensive.' },
                { id: 'C', text: 'Shops throw away food too early.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Special offers lead people to buy more than they can use before it goes off.',
                evidence: { quote: 'people often buy too much because of special offers' },
              },
            },
            {
              id: 'm3l-q23',
              number: 23,
              prompt: 'What does Maya say about best-before dates?',
              options: [
                { id: 'A', text: 'People throw food away even though it is usually still safe to eat.' },
                { id: 'B', text: 'Shops should remove best-before dates.' },
                { id: 'C', text: 'Best-before dates are always accurate.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Confusion about dates makes people throw away food that is still safe.',
                evidence: { quote: "even though it's usually still safe to eat" },
              },
            },
            {
              id: 'm3l-q24',
              number: 24,
              prompt: 'What does Maya say about composting?',
              options: [
                { id: 'A', text: 'It is the most effective solution.' },
                { id: 'B', text: 'It only deals with waste after it is created.' },
                { id: 'C', text: 'It is too expensive for most people.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Maya expected composting to be the main solution, but it only deals with waste afterwards.',
                evidence: { quote: "that only deals with waste after it's created" },
                distractors: { A: 'Meal planning is the most effective solution, not composting.' },
              },
            },
            {
              id: 'm3l-q25',
              number: 25,
              prompt: 'How much can meal planning cut food waste, according to Josh?',
              options: [
                { id: 'A', text: 'by a fifth' },
                { id: 'B', text: 'by a third' },
                { id: 'C', text: 'by a half' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Some studies say meal planning can cut waste by a third.',
                evidence: { quote: 'Some studies say it can cut waste by a third' },
                distractors: { A: 'A fifth is roughly how much food households throw away, not the saving from meal planning.' },
              },
            },
          ],
        },
        {
          id: 'm3l-g6',
          type: 'matching',
          instructions: 'What was agreed about each part of the presentation? Choose FIVE answers from the box and write the correct letter, A–F, next to Questions 26–30.',
          optionsTitle: 'Decisions',
          options: [
            { id: 'A', text: 'Maya will present it.' },
            { id: 'B', text: 'Josh will present it.' },
            { id: 'C', text: 'Maya and Josh will present it together.' },
            { id: 'D', text: 'Sara and Ben will do it.' },
            { id: 'E', text: 'It will happen on Wednesday morning.' },
            { id: 'F', text: 'It will last seven minutes.' },
          ],
          questions: [
            { id: 'm3l-q26', number: 26, prompt: 'introduction', answer: { accepted: ['A'] }, explanation: { text: 'Maya offers to introduce the topic and explain the scale of the problem.', evidence: { quote: "I don't mind introducing the topic and explaining the scale of the problem" } } },
            { id: 'm3l-q27', number: 27, prompt: 'causes', answer: { accepted: ['B'] }, explanation: { text: 'Maya suggests Josh does the causes section.', evidence: { quote: 'You could do the causes' } } },
            { id: 'm3l-q28', number: 28, prompt: 'solutions', answer: { accepted: ['C'] }, explanation: { text: 'They agree to share the solutions and the conclusion.', evidence: { quote: 'we can share the solutions and the conclusion' } } },
            { id: 'm3l-q29', number: 29, prompt: 'slides', answer: { accepted: ['D'] }, explanation: { text: 'Sara and Ben are doing the slides.', evidence: { quote: 'Sara and Ben are doing the slides' } } },
            { id: 'm3l-q30', number: 30, prompt: 'solutions section', answer: { accepted: ['F'] }, explanation: { text: 'The solutions get the longest slot: seven minutes.', evidence: { quote: 'seven for the solutions' }, distractors: { E: 'Wednesday morning is when they practise, not a part of the presentation.' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Lecture: trees in cities',
      audio: {
        intro: 'Part 4. You will hear a lecture about trees in cities. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "Good morning. Today I'm going to talk about trees in cities — why they matter, and what happens when they disappear. I'll begin with a brief history, then look at the benefits trees bring, and finally consider what cities can do to protect them." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "For most of the nineteenth century, trees were planted in cities mainly for appearance — to make new streets and squares look attractive. It was only in the nineteen-seventies that researchers began to measure what trees actually do, and the results surprised everyone." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "The first benefit is cooling. On a hot day, the temperature in a street with mature trees can be five degrees lower than in a nearby street without them. The shade is part of the reason, but trees also cool the air by releasing water vapour from their leaves, a process called transpiration." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "Trees also improve air quality. Their leaves trap dust and absorb gases such as nitrogen dioxide, which comes mainly from traffic. One study in London found that streets with more trees had noticeably lower levels of this gas, and children living there had fewer breathing problems." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "A third benefit concerns wildlife. A single mature oak can support more than two hundred species of insects, and these in turn attract birds. In one survey, streets with old trees had twice as many bird species as streets where the trees had been replaced by young saplings." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "Despite these benefits, city trees are under threat. The biggest problem is not disease, as many people assume, but the lack of space for roots. Underground, roots need room to spread, and in many cities they are squeezed between pipes and cables, or sealed under concrete." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "So what can be done? Some cities now plant trees in special containers called tree pits, which give roots room to grow. Others have introduced a simple rule: for every tree that is cut down, two new trees must be planted." },
          { speaker: 'Lecturer', voice: W, accent: 'en-GB', text: "To conclude, trees are not decoration. They cool our streets, clean our air, and provide homes for wildlife. If cities are to remain pleasant places to live, protecting their trees must become a priority, not an afterthought." },
        ],
      },
      groups: [
        {
          id: 'm3l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'URBAN TREES\nHistory\n• in the 19th century, trees were planted mainly for {{31}}\n• in the {{32}}, researchers began to measure the effects of trees\nCooling\n• temperature in a tree-lined street can be {{33}} degrees lower\n• trees cool the air by releasing water {{34}} from their leaves\nAir quality\n• leaves trap {{35}} and absorb gases from traffic\n• one gas from traffic is {{36}} dioxide\nWildlife\n• one mature oak can support over 200 species of {{37}}\nThreats\n• the biggest problem for city trees is lack of {{38}} for roots\nSolutions\n• some cities plant trees in containers called tree {{39}}\n• rule in some cities: for every tree cut down, {{40}} new trees must be planted',
          questions: [
            { id: 'm3l-q31', number: 31, answer: { accepted: ['appearance'] }, explanation: { text: 'In the nineteenth century trees were planted to make streets look attractive.', evidence: { quote: 'trees were planted in cities mainly for appearance' } } },
            { id: 'm3l-q32', number: 32, answer: { accepted: ['1970s', 'seventies'] }, explanation: { text: 'Researchers only began measuring what trees do in the nineteen-seventies.', evidence: { quote: 'It was only in the nineteen-seventies that researchers began to measure' } } },
            { id: 'm3l-q33', number: 33, answer: { accepted: ['five', '5'] }, explanation: { text: 'A tree-lined street can be five degrees cooler than a nearby street without trees.', evidence: { quote: 'can be five degrees lower than in a nearby street' } } },
            { id: 'm3l-q34', number: 34, answer: { accepted: ['vapour', 'vapor'] }, explanation: { text: 'Trees cool the air by releasing water vapour from their leaves.', evidence: { quote: 'trees also cool the air by releasing water vapour from their leaves' } } },
            { id: 'm3l-q35', number: 35, answer: { accepted: ['dust'] }, explanation: { text: 'Leaves trap dust and absorb gases.', evidence: { quote: 'Their leaves trap dust and absorb gases' } } },
            { id: 'm3l-q36', number: 36, answer: { accepted: ['nitrogen'] }, explanation: { text: 'The gas named is nitrogen dioxide, which comes mainly from traffic.', evidence: { quote: 'absorb gases such as nitrogen dioxide, which comes mainly from traffic' } } },
            { id: 'm3l-q37', number: 37, answer: { accepted: ['insects', 'insect'] }, explanation: { text: 'A single mature oak supports more than two hundred species of insects.', evidence: { quote: 'A single mature oak can support more than two hundred species of insects' } } },
            { id: 'm3l-q38', number: 38, answer: { accepted: ['space', 'room'] }, explanation: { text: 'The biggest problem is not disease but the lack of space for roots.', evidence: { quote: 'the lack of space for roots' } } },
            { id: 'm3l-q39', number: 39, answer: { accepted: ['pits', 'pit'] }, explanation: { text: 'The containers are called tree pits.', evidence: { quote: 'plant trees in special containers called tree pits' } } },
            { id: 'm3l-q40', number: 40, answer: { accepted: ['two', '2'] }, explanation: { text: 'For every tree cut down, two new trees must be planted.', evidence: { quote: 'for every tree that is cut down, two new trees must be planted' } } },
          ],
        },
      ],
    },
  ],
};
