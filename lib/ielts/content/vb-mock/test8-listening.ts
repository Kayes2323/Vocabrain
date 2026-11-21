import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 8 — Listening. Original content written for Mino in
 * the style of the IELTS Listening test (4 parts, 40 questions). Not Cambridge
 * material.
 *
 * Content: reserving a hotel room (Part 1), a walking tour of a historic town
 * (Part 2), two students planning a project on sleep and concentration (Part 3),
 * a lecture on trees in towns and cities (Part 4).
 *
 * Defects fixed when the supplied package was installed: Q25 was keyed to Emma's
 * worry about participants although the question asks about James, who worries
 * about the analysis; Q24 asked what Emma suggests although James proposes the
 * online forms, so it now asks what the students decide; and Q34 asked for the
 * word after "birds and other" with "insects" as the key, so the note now reads
 * "birds, insects and other ___" and the answer is "small animals", as heard.
 */
const rec = (partId: string) => recorded('vb-mock-8', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock8Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    {
      id: 'l1',
      number: 1,
      title: "Reserving a hotel room",
      audio: {
        intro: "Part 1. You will hear a man phoning a hotel to reserve a room. First, you have some time to look at questions 1 to 10.",
        noun: "conversation",
        ...rec('l1'),
        // Questions 1–5 are answered by line 12; the break comes before the breakfast price.
        sets: [
          { questions: '1 to 5', fromLine: 0 },
          { questions: '6 to 10', fromLine: 13 },
        ],
        script: [
          { speaker: "Receptionist", voice: W, accent: 'en-GB', text: "Good afternoon, Lakeside Hotel. How can I help you?" },
          { speaker: "Customer", voice: M, accent: 'en-GB', text: "Hello. I'd like to reserve a room for next month." },
          { speaker: "Receptionist", voice: W, accent: 'en-GB', text: "Certainly. I'll just take some details. Could I have your surname, please?" },
          { speaker: "Customer", voice: M, accent: 'en-GB', text: "It's Morgan. M-O-R-G-A-N." },
          { speaker: "Receptionist", voice: W, accent: 'en-GB', text: "Thank you. And how many guests will be staying?" },
          { speaker: "Customer", voice: M, accent: 'en-GB', text: "Two adults. It's just for me and my wife." },
          { speaker: "Receptionist", voice: W, accent: 'en-GB', text: "Fine. When would you like to arrive?" },
          { speaker: "Customer", voice: M, accent: 'en-GB', text: "On the eighteenth of June. We'll stay for three nights." },
          { speaker: "Receptionist", voice: W, accent: 'en-GB', text: "All right. We have standard rooms and family rooms available. What type would you prefer?" },
          { speaker: "Customer", voice: M, accent: 'en-GB', text: "A standard double room, please. We don't need anything particularly large." },
          { speaker: "Receptionist", voice: W, accent: 'en-GB', text: "No problem. Do you have any special requests?" },
          { speaker: "Customer", voice: M, accent: 'en-GB', text: "Yes, if possible, we'd like a room with a balcony. We enjoy sitting outside in the evening." },
          { speaker: "Receptionist", voice: W, accent: 'en-GB', text: "I'll add that to your request. I can't guarantee it, but we'll do our best." },
          { speaker: "Customer", voice: M, accent: 'en-GB', text: "Thank you. Is breakfast included in the room price?" },
          { speaker: "Receptionist", voice: W, accent: 'en-GB', text: "No, breakfast is optional. It costs ten pounds per person." },
          { speaker: "Customer", voice: M, accent: 'en-GB', text: "That's reasonable. We'll probably have it each morning." },
          { speaker: "Receptionist", voice: W, accent: 'en-GB', text: "Excellent. Our check-in time begins at two o'clock in the afternoon. If you arrive earlier, you can leave your luggage with us." },
          { speaker: "Customer", voice: M, accent: 'en-GB', text: "That's helpful. And is there somewhere to park the car?" },
          { speaker: "Receptionist", voice: W, accent: 'en-GB', text: "Yes. We have a small car park behind the building. It's free for hotel guests." },
          { speaker: "Customer", voice: M, accent: 'en-GB', text: "Great. One more thing. We might arrive quite late because we're driving from another city." },
          { speaker: "Receptionist", voice: W, accent: 'en-GB', text: "That's fine. If you arrive after ten p.m., please use the side entrance. The main doors are locked at that time, but the side entrance remains available for registered guests." },
          { speaker: "Customer", voice: M, accent: 'en-GB', text: "Understood. How will I know that the booking has been confirmed?" },
          { speaker: "Receptionist", voice: W, accent: 'en-GB', text: "I'll send a confirmation email to the address you provide." },
          { speaker: "Customer", voice: M, accent: 'en-GB', text: "Perfect. Thank you for your help." },
          { speaker: "Receptionist", voice: W, accent: 'en-GB', text: "You're welcome. We look forward to seeing you in June." },
        ],
      },
      groups: [
        {
          id: 'm8l-g1',
          type: 'form-completion',
          instructions: "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
          wordLimit: { words: 2, number: true },
          template: "HOTEL RESERVATION FORM\nGuest's surname: {{1}}\nNumber of guests: {{2}}\nArrival date: {{3}}\nType of room: {{4}}\nSpecial request: {{5}}",
          questions: [
            { id: 'm8l-q1', number: 1, answer: { accepted: ['Morgan'] }, explanation: { text: "The surname is spelled out: M-O-R-G-A-N.", evidence: { quote: "It's Morgan. M-O-R-G-A-N." } } },
            { id: 'm8l-q2', number: 2, answer: { accepted: ['two', '2'] }, explanation: { text: "Two adults: the caller and his wife.", evidence: { quote: "Two adults. It's just for me and my wife." } } },
            { id: 'm8l-q3', number: 3, answer: { accepted: ['18 June', '18th June', 'June 18'] }, explanation: { text: "They arrive on the eighteenth of June for three nights.", evidence: { quote: "On the eighteenth of June." } } },
            { id: 'm8l-q4', number: 4, answer: { accepted: ['standard double'] }, explanation: { text: "He asks for a standard double rather than a family room.", evidence: { quote: "A standard double room, please." } } },
            { id: 'm8l-q5', number: 5, answer: { accepted: ['balcony'] }, explanation: { text: "The one request is a room with a balcony.", evidence: { quote: "we'd like a room with a balcony" } } },
          ],
        },
        {
          id: 'm8l-g2',
          type: 'multiple-choice',
          instructions: "Choose the correct letter, A, B or C.",
          questions: [
            {
              id: 'm8l-q6',
              number: 6,
              prompt: "How much does breakfast cost per person?",
              options: [{ id: 'A', text: "\u00a38" }, { id: 'B', text: "\u00a310" }, { id: 'C', text: "\u00a312" }],
              answer: { accepted: ['B'] },
              explanation: { text: "Breakfast is not included; it is ten pounds each.", evidence: { quote: "It costs ten pounds per person." } },
            },
            {
              id: 'm8l-q7',
              number: 7,
              prompt: "What time can guests check in?",
              options: [{ id: 'A', text: "1:00 p.m." }, { id: 'B', text: "2:00 p.m." }, { id: 'C', text: "3:00 p.m." }],
              answer: { accepted: ['B'] },
              explanation: { text: "Check-in starts at two; earlier arrivals can leave luggage.", evidence: { quote: "Our check-in time begins at two o'clock in the afternoon." } },
            },
            {
              id: 'm8l-q8',
              number: 8,
              prompt: "Where is the hotel's car park?",
              options: [{ id: 'A', text: "Behind the building" }, { id: 'B', text: "Opposite the hotel" }, { id: 'C', text: "Underground" }],
              answer: { accepted: ['A'] },
              explanation: { text: "A small free car park behind the building.", evidence: { quote: "We have a small car park behind the building." } },
            },
            {
              id: 'm8l-q9',
              number: 9,
              prompt: "What should the guest do if arriving after 10 p.m.?",
              options: [{ id: 'A', text: "Call the hotel" }, { id: 'B', text: "Use the side entrance" }, { id: 'C', text: "Collect a key from reception" }],
              answer: { accepted: ['B'] },
              explanation: { text: "The main doors are locked then, but the side entrance stays open to guests.", evidence: { quote: "If you arrive after ten p.m., please use the side entrance." } },
            },
            {
              id: 'm8l-q10',
              number: 10,
              prompt: "How will the hotel confirm the reservation?",
              options: [{ id: 'A', text: "By text message" }, { id: 'B', text: "By email" }, { id: 'C', text: "By post" }],
              answer: { accepted: ['B'] },
              explanation: { text: "A confirmation email goes to the address he gives.", evidence: { quote: "I'll send a confirmation email to the address you provide." } },
            },
          ],
        },
      ],
    },
    {
      id: 'l2',
      number: 2,
      title: "A walking tour of a historic town",
      audio: {
        intro: "Part 2. You will hear a guide introducing a walking tour of a historic town. First, you have some time to look at questions 11 to 20.",
        noun: "talk",
        ...rec('l2'),
        // Questions 11–15 are answered by line 6; the break comes before the places to visit.
        sets: [
          { questions: '11 to 15', fromLine: 0 },
          { questions: '16 to 20', fromLine: 7 },
        ],
        script: [
          { speaker: "Peter", voice: M, accent: 'en-GB', text: "Good morning, everyone, and welcome to our historic town walking tour. My name is Peter, and I'll be your guide today." },
          { speaker: "Peter", voice: M, accent: 'en-GB', text: "Our tour focuses mainly on the history of local architecture. We'll look at buildings from different periods and discuss how their designs have changed over time. The town also has an interesting industrial history, and several famous writers have visited it, but those aren't the main subjects of today's tour." },
          { speaker: "Peter", voice: M, accent: 'en-GB', text: "Before we begin, a few practical points. If anyone arrives late, please wait near the main gate. I'll return there briefly after the first part of the tour, so you won't need to search for the group." },
          { speaker: "Peter", voice: M, accent: 'en-GB', text: "Our first stop is the Old Hall. It was built more than two hundred years ago and originally served as a hospital. It later became a public meeting place and is now used for exhibitions." },
          { speaker: "Peter", voice: M, accent: 'en-GB', text: "We'll then pass St Mary's Church. It's one of the oldest buildings in the town, although it has never been used as a hospital. The Stone House, which is further along the street, was once a private home belonging to a wealthy merchant." },
          { speaker: "Peter", voice: M, accent: 'en-GB', text: "Next, we'll visit the central market. It's a popular place for local residents, especially at weekends. You may notice that the market is closed on Mondays. This is because the traders hold a weekly meeting to discuss supplies and other business matters." },
          { speaker: "Peter", voice: M, accent: 'en-GB', text: "The walk lasts about two hours, and some of the streets are quite uneven. I strongly recommend wearing comfortable walking shoes. You might want to bring a camera, too, but that's entirely optional. There are caf\u00e9s along the route if you need a drink." },
          { speaker: "Peter", voice: M, accent: 'en-GB', text: "Now, let me explain a few locations that you may want to explore after the tour." },
          { speaker: "Peter", voice: M, accent: 'en-GB', text: "The Old Library has an interesting collection of historical maps. Some show how the town looked before the railway was built." },
          { speaker: "Peter", voice: M, accent: 'en-GB', text: "If you'd like a good view of the river and the surrounding hills, walk across the Riverside Bridge. It's particularly attractive in the late afternoon." },
          { speaker: "Peter", voice: M, accent: 'en-GB', text: "The Clock Tower is famous for its musical clock. Every hour, it plays a short melody that can be heard across the square." },
          { speaker: "Peter", voice: M, accent: 'en-GB', text: "For traditional local products, visit the Market Square. You'll find handmade items, local food and small craft stalls there." },
          { speaker: "Peter", voice: M, accent: 'en-GB', text: "Finally, if you'd prefer somewhere peaceful to relax, the Public Gardens are a good choice. There are benches beneath the trees and colourful flower displays throughout the summer." },
          { speaker: "Peter", voice: M, accent: 'en-GB', text: "I hope you enjoy exploring the town." },
        ],
      },
      groups: [
        {
          id: 'm8l-g3',
          type: 'multiple-choice',
          instructions: "Choose the correct letter, A, B or C.",
          questions: [
            {
              id: 'm8l-q11',
              number: 11,
              prompt: "What is the main theme of the walking tour?",
              options: [{ id: 'A', text: "The town's industrial development" }, { id: 'B', text: "The history of local architecture" }, { id: 'C', text: "The lives of famous writers" }],
              answer: { accepted: ['B'] },
              explanation: { text: "Industry and writers are mentioned, but the tour is about architecture.", evidence: { quote: "Our tour focuses mainly on the history of local architecture." }, distractors: { A: "The industrial history is mentioned but is not the subject of the tour." } },
            },
            {
              id: 'm8l-q12',
              number: 12,
              prompt: "What should visitors do if they arrive late?",
              options: [{ id: 'A', text: "Wait near the main gate" }, { id: 'B', text: "Contact the guide" }, { id: 'C', text: "Join the group at the market" }],
              answer: { accepted: ['A'] },
              explanation: { text: "Peter returns to the main gate after the first part of the tour.", evidence: { quote: "If anyone arrives late, please wait near the main gate." } },
            },
            {
              id: 'm8l-q13',
              number: 13,
              prompt: "Which building was originally used as a hospital?",
              options: [{ id: 'A', text: "The Old Hall" }, { id: 'B', text: "St Mary's Church" }, { id: 'C', text: "The Stone House" }],
              answer: { accepted: ['A'] },
              explanation: { text: "The church was never a hospital and the Stone House was a merchant's home.", evidence: { quote: "It was built more than two hundred years ago and originally served as a hospital." }, distractors: { B: "Peter says St Mary's Church has never been used as a hospital." } },
            },
            {
              id: 'm8l-q14',
              number: 14,
              prompt: "Why is the central market closed on Mondays?",
              options: [{ id: 'A', text: "It is cleaned and maintained" }, { id: 'B', text: "The traders hold a weekly meeting" }, { id: 'C', text: "The building is used for private events" }],
              answer: { accepted: ['B'] },
              explanation: { text: "The traders meet weekly to discuss supplies and business.", evidence: { quote: "This is because the traders hold a weekly meeting to discuss supplies and other business matters." } },
            },
            {
              id: 'm8l-q15',
              number: 15,
              prompt: "What does the guide recommend visitors bring?",
              options: [{ id: 'A', text: "A camera" }, { id: 'B', text: "Comfortable walking shoes" }, { id: 'C', text: "A bottle of water" }],
              answer: { accepted: ['B'] },
              explanation: { text: "The streets are uneven; a camera is optional and there are caf\u00e9s for drinks.", evidence: { quote: "I strongly recommend wearing comfortable walking shoes." }, distractors: { A: "Peter says a camera is entirely optional." } },
            },
          ],
        },
        {
          id: 'm8l-g4',
          type: 'matching',
          instructions: "Which place is described in each way? Choose FIVE answers from the box.",
          optionsTitle: "Places in the town",
          options: [{ id: 'A', text: "Clock Tower" }, { id: 'B', text: "Riverside Bridge" }, { id: 'C', text: "Old Library" }, { id: 'D', text: "Market Square" }, { id: 'E', text: "Town Museum" }, { id: 'F', text: "Public Gardens" }],
          questions: [
            { id: 'm8l-q16', number: 16, prompt: "A collection of old maps", answer: { accepted: ['C'] }, explanation: { text: "The Old Library keeps historical maps of the town.", evidence: { quote: "The Old Library has an interesting collection of historical maps." } } },
            { id: 'm8l-q17', number: 17, prompt: "A view of the river and surrounding hills", answer: { accepted: ['B'] }, explanation: { text: "The Riverside Bridge gives the view, best in late afternoon.", evidence: { quote: "If you'd like a good view of the river and the surrounding hills, walk across the Riverside Bridge." } } },
            { id: 'm8l-q18', number: 18, prompt: "A clock that plays a short melody", answer: { accepted: ['A'] }, explanation: { text: "The Clock Tower plays a melody every hour.", evidence: { quote: "The Clock Tower is famous for its musical clock." } } },
            { id: 'm8l-q19', number: 19, prompt: "A place to see traditional local products", answer: { accepted: ['D'] }, explanation: { text: "Market Square has handmade items, local food and craft stalls.", evidence: { quote: "For traditional local products, visit the Market Square." } } },
            { id: 'm8l-q20', number: 20, prompt: "A quiet area with benches and flowers", answer: { accepted: ['F'] }, explanation: { text: "The Public Gardens have benches under the trees and flower displays.", evidence: { quote: "the Public Gardens are a good choice" } } },
          ],
        },
      ],
    },
    {
      id: 'l3',
      number: 3,
      title: "A student project on sleep and concentration",
      audio: {
        intro: "Part 3. You will hear two university students planning a research project about sleep. First, you have some time to look at questions 21 to 25.",
        noun: "discussion",
        ...rec('l3'),
        // Questions 21–25 are answered by line 15; the break comes before they divide the work.
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 17 },
        ],
        script: [
          { speaker: "Emma", voice: W, accent: 'en-GB', text: "James, have you finished looking at the results from our preliminary survey?" },
          { speaker: "James", voice: M, accent: 'en-GB', text: "Almost. I've checked most of the responses. There are some interesting patterns." },
          { speaker: "Emma", voice: W, accent: 'en-GB', text: "Good. I think we should confirm the main aim before we start collecting more information. We're investigating how sleep affects students' concentration, right?" },
          { speaker: "James", voice: M, accent: 'en-GB', text: "Yes, exactly. We want to understand whether students who sleep well find it easier to concentrate during lectures and study sessions." },
          { speaker: "Emma", voice: W, accent: 'en-GB', text: "That sounds clear. I originally thought we could compare sleeping habits in different countries, but that would make the project much bigger." },
          { speaker: "James", voice: M, accent: 'en-GB', text: "I agree. We don't have enough time or resources for an international comparison." },
          { speaker: "Emma", voice: W, accent: 'en-GB', text: "What did you notice in the preliminary survey?" },
          { speaker: "James", voice: M, accent: 'en-GB', text: "One thing stood out. Many students said they use their phones just before going to sleep. I wasn't expecting that many people to do it." },
          { speaker: "Emma", voice: W, accent: 'en-GB', text: "Neither was I. I thought students might have more regular sleeping times, but the responses were quite different." },
          { speaker: "James", voice: M, accent: 'en-GB', text: "We also included some questions about diet in the first draft." },
          { speaker: "Emma", voice: W, accent: 'en-GB', text: "Yes, but I think we should remove those. They were quite personal, and some students seemed uncomfortable answering them." },
          { speaker: "James", voice: M, accent: 'en-GB', text: "That's a fair point. We'll keep the questions focused on sleep and concentration." },
          { speaker: "Emma", voice: W, accent: 'en-GB', text: "How should we collect the main responses? We could use printed questionnaires, but that might take too much time." },
          { speaker: "James", voice: M, accent: 'en-GB', text: "I was thinking of using online forms. Students can complete them on their phones, and the answers will be easier to organise." },
          { speaker: "Emma", voice: W, accent: 'en-GB', text: "That's a good idea. My only concern is whether enough people will take part." },
          { speaker: "James", voice: M, accent: 'en-GB', text: "Actually, I was more worried about analysing the information afterwards. We may get a lot of different responses." },
          { speaker: "Emma", voice: W, accent: 'en-GB', text: "We can deal with that when we get to it. Let's divide the work." },
          { speaker: "James", voice: M, accent: 'en-GB', text: "Fine. I'll prepare the online questionnaire." },
          { speaker: "Emma", voice: W, accent: 'en-GB', text: "Great. I'll ask students in the library if they'd be willing to participate." },
          { speaker: "James", voice: M, accent: 'en-GB', text: "Once we've collected the responses, I'll organise the research data into categories." },
          { speaker: "Emma", voice: W, accent: 'en-GB', text: "Then I'll write the conclusion, based on what we discover." },
          { speaker: "James", voice: M, accent: 'en-GB', text: "Sounds good. We should both review the final report before submitting it." },
          { speaker: "Emma", voice: W, accent: 'en-GB', text: "Definitely. We can check whether our conclusions actually match the results." },
          { speaker: "James", voice: M, accent: 'en-GB', text: "Let's aim to finish everything by the end of next week." },
          { speaker: "Emma", voice: W, accent: 'en-GB', text: "Agreed." },
        ],
      },
      groups: [
        {
          id: 'm8l-g5',
          type: 'multiple-choice',
          instructions: "Choose the correct letter, A, B or C.",
          questions: [
            {
              id: 'm8l-q21',
              number: 21,
              prompt: "What is the main aim of their research?",
              options: [{ id: 'A', text: "To investigate how sleep affects students' concentration" }, { id: 'B', text: "To compare sleeping habits in different countries" }, { id: 'C', text: "To examine the causes of sleep disorders" }],
              answer: { accepted: ['A'] },
              explanation: { text: "An international comparison was considered and dropped as too big.", evidence: { quote: "We're investigating how sleep affects students' concentration, right?" }, distractors: { B: "Emma raises the international comparison, then rules it out." } },
            },
            {
              id: 'm8l-q22',
              number: 22,
              prompt: "What did their preliminary survey suggest?",
              options: [{ id: 'A', text: "Most students sleep fewer than five hours." }, { id: 'B', text: "Many students use their phones before sleeping." }, { id: 'C', text: "Students usually go to bed at the same time." }],
              answer: { accepted: ['B'] },
              explanation: { text: "Both were surprised how many students use phones at bedtime.", evidence: { quote: "Many students said they use their phones just before going to sleep." } },
            },
            {
              id: 'm8l-q23',
              number: 23,
              prompt: "Why did they decide not to include questions about diet?",
              options: [{ id: 'A', text: "They had already collected enough information." }, { id: 'B', text: "Their supervisor asked them to remove them." }, { id: 'C', text: "The questions were too personal." }],
              answer: { accepted: ['C'] },
              explanation: { text: "Students were uncomfortable answering them.", evidence: { quote: "They were quite personal, and some students seemed uncomfortable answering them." } },
            },
            {
              id: 'm8l-q24',
              number: 24,
              prompt: "What do the students decide to use to collect responses?",
              options: [{ id: 'A', text: "Printed questionnaires" }, { id: 'B', text: "A mobile application" }, { id: 'C', text: "Online forms" }],
              answer: { accepted: ['C'] },
              explanation: { text: "James proposes online forms and Emma agrees; printed forms would take too long.", evidence: { quote: "I was thinking of using online forms." }, distractors: { A: "Emma mentions printed questionnaires, then says they would take too much time." } },
            },
            {
              id: 'm8l-q25',
              number: 25,
              prompt: "What is James worried about?",
              options: [{ id: 'A', text: "Getting enough participants" }, { id: 'B', text: "Analysing the collected information" }, { id: 'C', text: "Completing the project presentation" }],
              answer: { accepted: ['B'] },
              explanation: { text: "Getting enough people is Emma's concern; James worries about the analysis.", evidence: { quote: "Actually, I was more worried about analysing the information afterwards." }, distractors: { A: "That is the concern Emma raises, not James." } },
            },
          ],
        },
        {
          id: 'm8l-g6',
          type: 'matching',
          instructions: "Who will carry out each task? Choose FIVE answers from the box.",
          optionsTitle: "People",
          options: [{ id: 'A', text: "Emma" }, { id: 'B', text: "James" }, { id: 'C', text: "Both students" }],
          questions: [
            { id: 'm8l-q26', number: 26, prompt: "Prepare the online questionnaire", answer: { accepted: ['B'] }, explanation: { text: "James takes the questionnaire.", evidence: { quote: "I'll prepare the online questionnaire." } } },
            { id: 'm8l-q27', number: 27, prompt: "Ask students in the library to take part", answer: { accepted: ['A'] }, explanation: { text: "Emma will recruit in the library.", evidence: { quote: "I'll ask students in the library if they'd be willing to participate." } } },
            { id: 'm8l-q28', number: 28, prompt: "Organise the research data", answer: { accepted: ['B'] }, explanation: { text: "James will sort the responses into categories.", evidence: { quote: "I'll organise the research data into categories." } } },
            { id: 'm8l-q29', number: 29, prompt: "Write the conclusion", answer: { accepted: ['A'] }, explanation: { text: "Emma writes the conclusion from the findings.", evidence: { quote: "Then I'll write the conclusion, based on what we discover." } } },
            { id: 'm8l-q30', number: 30, prompt: "Review the final report", answer: { accepted: ['C'] }, explanation: { text: "Both will check the report before submitting it.", evidence: { quote: "We should both review the final report before submitting it." } } },
          ],
        },
      ],
    },
    {
      id: 'l4',
      number: 4,
      title: "The role of trees in towns and cities",
      audio: {
        intro: "Part 4. You will hear a lecturer talking about the role of trees in towns and cities. First, you have some time to look at questions 31 to 40.",
        noun: "talk",
        ...rec('l4'),
        sets: [
          { questions: '31 to 40', fromLine: 0 },
        ],
        script: [
          { speaker: "Lecturer", voice: W, accent: 'en-GB', text: "Today we'll explore why trees are important in towns and cities, and why urban planners need to protect them." },
          { speaker: "Lecturer", voice: W, accent: 'en-GB', text: "Trees provide several environmental benefits. One of the most important is their ability to absorb carbon dioxide from the atmosphere during photosynthesis. They use sunlight to convert this gas into energy, while releasing oxygen." },
          { speaker: "Lecturer", voice: W, accent: 'en-GB', text: "Trees also help regulate temperature. Their leaves provide shade, which reduces the surface temperature of roads, pavements and nearby buildings. In areas with many trees, people may experience more comfortable conditions during hot weather." },
          { speaker: "Lecturer", voice: W, accent: 'en-GB', text: "Another benefit comes from their root systems. Tree roots help the ground absorb rainwater. This can reduce the amount of water flowing across streets and lower the risk of local flooding." },
          { speaker: "Lecturer", voice: W, accent: 'en-GB', text: "Trees also support wildlife. They provide habitats for birds, insects and other small animals. Some species depend on urban trees for food, shelter and nesting sites." },
          { speaker: "Lecturer", voice: W, accent: 'en-GB', text: "There are benefits for people as well. Parks and tree-lined streets offer opportunities for physical exercise, including walking, running and cycling. Access to green spaces can also improve people's general well-being." },
          { speaker: "Lecturer", voice: W, accent: 'en-GB', text: "Research suggests that spending time in natural surroundings may reduce feelings of stress. Even a short walk through a green area can help people feel calmer." },
          { speaker: "Lecturer", voice: W, accent: 'en-GB', text: "Trees can also make busy streets more pleasant. Along roads with heavy traffic, trees may help reduce noise by acting as a natural barrier. Although they cannot eliminate traffic noise completely, they can make some urban areas more comfortable." },
          { speaker: "Lecturer", voice: W, accent: 'en-GB', text: "However, urban trees require proper care. Young trees need regular watering, particularly during dry weather when their roots have not yet developed fully." },
          { speaker: "Lecturer", voice: W, accent: 'en-GB', text: "Maintenance is also essential. Damaged branches should be removed through careful pruning. This helps keep trees healthy and reduces the risk of branches falling during storms." },
          { speaker: "Lecturer", voice: W, accent: 'en-GB', text: "Finally, planting trees should be part of a long-term city plan. Authorities need to consider which species are suitable for local conditions, how much space trees require and how they will be maintained in the future." },
          { speaker: "Lecturer", voice: W, accent: 'en-GB', text: "Urban trees are not simply decorative features. They are an important part of a healthy and sustainable city." },
        ],
      },
      groups: [
        {
          id: 'm8l-g7',
          type: 'note-completion',
          instructions: "Complete the notes below. Write NO MORE THAN TWO WORDS for each answer.",
          wordLimit: { words: 2 },
          template: "TREES IN TOWNS AND CITIES\n\nEnvironment\n- Trees absorb {{31}} from the atmosphere during photosynthesis.\n- Their leaves give shade and reduce the surface {{32}} of roads and buildings.\n- Tree roots help the ground absorb {{33}} after rain.\n- Trees provide habitats for birds, insects and other {{34}}.\n\nPeople\n- Parks and tree-lined streets offer places for physical {{35}}.\n- Time in green spaces may reduce feelings of {{36}}.\n- Along busy roads, trees can help reduce traffic {{37}}.\n\nCare\n- Young trees need regular {{38}} in dry weather.\n- Damaged branches should be removed by careful {{39}}.\n- Planting should be part of a long-term city {{40}}.",
          questions: [
            { id: 'm8l-q31', number: 31, answer: { accepted: ['carbon dioxide'] }, explanation: { text: "Photosynthesis takes carbon dioxide from the air and releases oxygen.", evidence: { quote: "their ability to absorb carbon dioxide from the atmosphere during photosynthesis" } } },
            { id: 'm8l-q32', number: 32, answer: { accepted: ['temperature'] }, explanation: { text: "Shade lowers the surface temperature of roads, pavements and buildings.", evidence: { quote: "Their leaves provide shade, which reduces the surface temperature of roads, pavements and nearby buildings." } } },
            { id: 'm8l-q33', number: 33, answer: { accepted: ['rainwater'] }, explanation: { text: "Roots help the ground take in rainwater, lowering flood risk.", evidence: { quote: "Tree roots help the ground absorb rainwater." } } },
            { id: 'm8l-q34', number: 34, answer: { accepted: ['small animals'] }, explanation: { text: "Birds, insects and other small animals live in urban trees.", evidence: { quote: "They provide habitats for birds, insects and other small animals." } } },
            { id: 'm8l-q35', number: 35, answer: { accepted: ['exercise'] }, explanation: { text: "Parks and tree-lined streets are used for walking, running and cycling.", evidence: { quote: "Parks and tree-lined streets offer opportunities for physical exercise" } } },
            { id: 'm8l-q36', number: 36, answer: { accepted: ['stress'] }, explanation: { text: "Time in natural surroundings may lower stress.", evidence: { quote: "spending time in natural surroundings may reduce feelings of stress" } } },
            { id: 'm8l-q37', number: 37, answer: { accepted: ['noise'] }, explanation: { text: "Trees act as a natural barrier against traffic noise.", evidence: { quote: "trees may help reduce noise by acting as a natural barrier" } } },
            { id: 'm8l-q38', number: 38, answer: { accepted: ['watering'] }, explanation: { text: "Young trees need watering while their roots develop.", evidence: { quote: "Young trees need regular watering" } } },
            { id: 'm8l-q39', number: 39, answer: { accepted: ['pruning'] }, explanation: { text: "Careful pruning removes damaged branches.", evidence: { quote: "Damaged branches should be removed through careful pruning." } } },
            { id: 'm8l-q40', number: 40, answer: { accepted: ['plan'] }, explanation: { text: "Planting belongs in a long-term city plan.", evidence: { quote: "planting trees should be part of a long-term city plan" } } },
          ],
        },
      ],
    },
  ],
};
