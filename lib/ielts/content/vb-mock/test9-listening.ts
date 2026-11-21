import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 9 — Listening. Original content written for Mino in
 * the style of the IELTS Listening test (4 parts, 40 questions). Not Cambridge
 * material.
 *
 * Content: reporting a lost bag at a railway station (Part 1), a coastal
 * wildlife centre (Part 2), two students planning a local-history podcast
 * (Part 3), a lecture on honeybees (Part 4).
 *
 * Changes made when the supplied package was installed: in Part 3 the survey
 * question and the aim question were swapped, and the editing and introduction
 * tasks were swapped, so every answer comes in the order it is heard; and Q37
 * now says the workers feed it, so only the larva stage fits.
 */
const rec = (partId: string) => recorded('vb-mock-9', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock9Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    {
      id: 'l1',
      number: 1,
      title: "Reporting a lost item at a railway station",
      audio: {
        intro: "Part 1. You will hear a man reporting a lost bag at a railway station. First, you have some time to look at questions 1 to 10.",
        noun: "conversation",
        ...rec('l1'),
        // Questions 1–5 are answered by line 11; the break comes before the office hours.
        sets: [
          { questions: '1 to 5', fromLine: 0 },
          { questions: '6 to 10', fromLine: 12 },
        ],
        script: [
          { speaker: "Staff member", voice: W, accent: 'en-GB', text: "Good morning, Central Railway Station. Lost property office. How can I help?" },
          { speaker: "Passenger", voice: M, accent: 'en-GB', text: "Hello. I think I left a bag on a train yesterday, and I'd like to report it." },
          { speaker: "Staff member", voice: W, accent: 'en-GB', text: "I'm sorry to hear that. I can help you with the report. Could I have your surname first?" },
          { speaker: "Passenger", voice: M, accent: 'en-GB', text: "Yes, it's Harris. H-A-R-R-I-S." },
          { speaker: "Staff member", voice: W, accent: 'en-GB', text: "Thank you. Now, what exactly did you lose?" },
          { speaker: "Passenger", voice: M, accent: 'en-GB', text: "A backpack. It's quite small, not one of those large travel bags." },
          { speaker: "Staff member", voice: W, accent: 'en-GB', text: "All right. Can you describe its colour?" },
          { speaker: "Passenger", voice: M, accent: 'en-GB', text: "It's mainly green, with a black zip." },
          { speaker: "Staff member", voice: W, accent: 'en-GB', text: "That's helpful. Do you remember which train you were travelling on?" },
          { speaker: "Passenger", voice: M, accent: 'en-GB', text: "It was the train going to Northbridge. I left the city at about six yesterday evening." },
          { speaker: "Staff member", voice: W, accent: 'en-GB', text: "And can you remember where you were sitting?" },
          { speaker: "Passenger", voice: M, accent: 'en-GB', text: "Yes, I was in seat 14C. I remember because I had to move my jacket from the next seat." },
          { speaker: "Staff member", voice: W, accent: 'en-GB', text: "Excellent. I'll add those details. Our office opens at half past eight in the morning, so you can come in tomorrow if that's convenient." },
          { speaker: "Passenger", voice: M, accent: 'en-GB', text: "Yes, that should be fine. What do I need to bring?" },
          { speaker: "Staff member", voice: W, accent: 'en-GB', text: "You'll need to bring a photo ID so we can confirm your identity before handing over the item. A train ticket isn't necessary." },
          { speaker: "Passenger", voice: M, accent: 'en-GB', text: "Okay. Where exactly is the office?" },
          { speaker: "Staff member", voice: W, accent: 'en-GB', text: "It's near the main entrance. Look for the row of numbered lockers. Our collection counter is beside locker number four." },
          { speaker: "Passenger", voice: M, accent: 'en-GB', text: "I see. Is there a charge for keeping the bag?" },
          { speaker: "Staff member", voice: W, accent: 'en-GB', text: "Yes. We charge five pounds for storage. That's a standard fee, regardless of the size of the item." },
          { speaker: "Passenger", voice: M, accent: 'en-GB', text: "Fine. And will someone let me know if you find it?" },
          { speaker: "Staff member", voice: W, accent: 'en-GB', text: "Certainly. We'll contact you by email once the item has been identified and registered." },
          { speaker: "Passenger", voice: M, accent: 'en-GB', text: "That's great. Thank you for your help." },
          { speaker: "Staff member", voice: W, accent: 'en-GB', text: "You're welcome. I hope we find your backpack." },
        ],
      },
      groups: [
        {
          id: 'm9l-g1',
          type: 'form-completion',
          instructions: "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
          wordLimit: { words: 2, number: true },
          template: "LOST PROPERTY REPORT\nPassenger's surname: {{1}}\nLost item: {{2}}\nMain colour of the item: {{3}}\nTrain destination: {{4}}\nSeat number: {{5}}",
          questions: [
            { id: 'm9l-q1', number: 1, answer: { accepted: ['Harris'] }, explanation: { text: "The surname is spelled out: H-A-R-R-I-S.", evidence: { quote: "it's Harris. H-A-R-R-I-S." } } },
            { id: 'm9l-q2', number: 2, answer: { accepted: ['backpack'] }, explanation: { text: "He lost a small backpack, not a large travel bag.", evidence: { quote: "A backpack. It's quite small" } } },
            { id: 'm9l-q3', number: 3, answer: { accepted: ['green'] }, explanation: { text: "It is mainly green; the zip is black.", evidence: { quote: "It's mainly green, with a black zip." } } },
            { id: 'm9l-q4', number: 4, answer: { accepted: ['Northbridge'] }, explanation: { text: "He was on the train going to Northbridge.", evidence: { quote: "It was the train going to Northbridge." } } },
            { id: 'm9l-q5', number: 5, answer: { accepted: ['14C'] }, explanation: { text: "He remembers sitting in seat 14C.", evidence: { quote: "I was in seat 14C." } } },
          ],
        },
        {
          id: 'm9l-g2',
          type: 'multiple-choice',
          instructions: "Choose the correct letter, A, B or C.",
          questions: [
            {
              id: 'm9l-q6',
              number: 6,
              prompt: "What time does the lost property office open?",
              options: [{ id: 'A', text: "8:00 a.m." }, { id: 'B', text: "8:30 a.m." }, { id: 'C', text: "9:00 a.m." }],
              answer: { accepted: ['B'] },
              explanation: { text: "Half past eight is eight thirty.", evidence: { quote: "Our office opens at half past eight in the morning" } },
            },
            {
              id: 'm9l-q7',
              number: 7,
              prompt: "What must the passenger bring to collect the item?",
              options: [{ id: 'A', text: "A photograph of the item" }, { id: 'B', text: "A photo ID" }, { id: 'C', text: "A train ticket only" }],
              answer: { accepted: ['B'] },
              explanation: { text: "A photo ID is needed to confirm his identity; a ticket is not necessary.", evidence: { quote: "You'll need to bring a photo ID" }, distractors: { C: "The staff member says a train ticket is not necessary." } },
            },
            {
              id: 'm9l-q8',
              number: 8,
              prompt: "Where should the passenger go to collect the item?",
              options: [{ id: 'A', text: "Platform 2" }, { id: 'B', text: "The ticket office" }, { id: 'C', text: "The counter beside locker 4" }],
              answer: { accepted: ['C'] },
              explanation: { text: "The collection counter is beside locker number four, near the main entrance.", evidence: { quote: "Our collection counter is beside locker number four." } },
            },
            {
              id: 'm9l-q9',
              number: 9,
              prompt: "What is the storage charge?",
              options: [{ id: 'A', text: "\u00a33" }, { id: 'B', text: "\u00a35" }, { id: 'C', text: "\u00a38" }],
              answer: { accepted: ['B'] },
              explanation: { text: "Five pounds, whatever the size of the item.", evidence: { quote: "We charge five pounds for storage." } },
            },
            {
              id: 'm9l-q10',
              number: 10,
              prompt: "How will the office contact the passenger?",
              options: [{ id: 'A', text: "By telephone" }, { id: 'B', text: "By email" }, { id: 'C', text: "By text message" }],
              answer: { accepted: ['B'] },
              explanation: { text: "They will email him once the item is identified and registered.", evidence: { quote: "We'll contact you by email once the item has been identified and registered." } },
            },
          ],
        },
      ],
    },
    {
      id: 'l2',
      number: 2,
      title: "A coastal wildlife centre",
      audio: {
        intro: "Part 2. You will hear a guide welcoming visitors to a coastal wildlife centre. First, you have some time to look at questions 11 to 20.",
        noun: "talk",
        ...rec('l2'),
        // Questions 11–15 are answered by line 5; the break comes before the guide describes the areas.
        sets: [
          { questions: '11 to 15', fromLine: 0 },
          { questions: '16 to 20', fromLine: 6 },
        ],
        script: [
          { speaker: "Guide", voice: W, accent: 'en-GB', text: "Good morning, everyone, and welcome to Seaview Coastal Wildlife Centre. My name is Rachel, and I'll explain how you can make the most of your visit." },
          { speaker: "Guide", voice: W, accent: 'en-GB', text: "Our centre has been operating for more than twenty years. Its main purpose is to protect and care for coastal wildlife. We look after injured animals, support local conservation work and help visitors understand the natural environment. We do offer educational activities, but we aren't a photography school or a boat-trip company." },
          { speaker: "Guide", voice: W, accent: 'en-GB', text: "Families often ask which activity is best for younger children. I'd recommend the tide-pool activity. Children can examine small sea creatures in shallow pools with the help of our staff. The bird identification session is also interesting, although it requires a little more patience. Our advanced photography workshop is designed mainly for adults with some previous experience." },
          { speaker: "Guide", voice: W, accent: 'en-GB', text: "One of the most popular events is our seal-feeding demonstration. It takes place at two o'clock in the afternoon near the main viewing area. Please arrive a few minutes early because the space can become crowded." },
          { speaker: "Guide", voice: W, accent: 'en-GB', text: "There are a few important rules. Visitors are welcome to take photographs in most outdoor areas, but you must not feed the animals yourselves. Our staff are trained to provide the correct food in suitable amounts. You can walk along the marsh trail, provided you stay on the marked path." },
          { speaker: "Guide", voice: W, accent: 'en-GB', text: "If you'd like to attend our guided talk about coastal conservation, you can reserve a place at the information desk. The talk is held twice a day, and staff there will tell you the available times." },
          { speaker: "Guide", voice: W, accent: 'en-GB', text: "Now, let me describe some of the areas you can visit." },
          { speaker: "Guide", voice: W, accent: 'en-GB', text: "The Rescue Room has a large viewing window. You can see rescued seals being cared for, but please remember that the animals need a quiet environment." },
          { speaker: "Guide", voice: W, accent: 'en-GB', text: "The Shell Gallery displays shells collected from different coastal regions. There are examples of many shapes and sizes, together with information about the animals that produced them." },
          { speaker: "Guide", voice: W, accent: 'en-GB', text: "For birdwatching, I recommend the Observation Deck. It's an elevated platform overlooking the water, so you can often see birds resting or searching for food." },
          { speaker: "Guide", voice: W, accent: 'en-GB', text: "If you want to experience the natural coastal landscape, follow the Marsh Trail. It passes through an area of salt marsh, where you can observe plants and small animals in their natural surroundings." },
          { speaker: "Guide", voice: W, accent: 'en-GB', text: "Finally, the Education Room has a short film about marine habitats. It runs every thirty minutes and is suitable for visitors of all ages." },
          { speaker: "Guide", voice: W, accent: 'en-GB', text: "Please enjoy your visit, and remember to ask our staff if you need any assistance." },
        ],
      },
      groups: [
        {
          id: 'm9l-g3',
          type: 'multiple-choice',
          instructions: "Choose the correct letter, A, B or C.",
          questions: [
            {
              id: 'm9l-q11',
              number: 11,
              prompt: "What is the main purpose of the wildlife centre?",
              options: [{ id: 'A', text: "To protect and care for coastal wildlife" }, { id: 'B', text: "To train visitors to become wildlife photographers" }, { id: 'C', text: "To organise boat trips along the coast" }],
              answer: { accepted: ['A'] },
              explanation: { text: "It looks after injured animals and supports conservation; it is not a photography school or a boat company.", evidence: { quote: "Its main purpose is to protect and care for coastal wildlife." } },
            },
            {
              id: 'm9l-q12',
              number: 12,
              prompt: "Which activity is particularly suitable for families with children?",
              options: [{ id: 'A', text: "The bird identification session" }, { id: 'B', text: "The tide-pool activity" }, { id: 'C', text: "The advanced photography workshop" }],
              answer: { accepted: ['B'] },
              explanation: { text: "The tide-pool activity is recommended for younger children; the workshop is for adults.", evidence: { quote: "I'd recommend the tide-pool activity." }, distractors: { C: "The photography workshop is designed mainly for adults." } },
            },
            {
              id: 'm9l-q13',
              number: 13,
              prompt: "When does the seal-feeding demonstration take place?",
              options: [{ id: 'A', text: "1:00 p.m." }, { id: 'B', text: "1:30 p.m." }, { id: 'C', text: "2:00 p.m." }],
              answer: { accepted: ['C'] },
              explanation: { text: "Two o'clock in the afternoon, near the main viewing area.", evidence: { quote: "It takes place at two o'clock in the afternoon" } },
            },
            {
              id: 'm9l-q14',
              number: 14,
              prompt: "What are visitors asked not to do?",
              options: [{ id: 'A', text: "Take photographs near the entrance" }, { id: 'B', text: "Feed the animals themselves" }, { id: 'C', text: "Walk along the marsh trail" }],
              answer: { accepted: ['B'] },
              explanation: { text: "Photographs are welcome outdoors and the marsh trail is open, but feeding is for staff only.", evidence: { quote: "you must not feed the animals yourselves" } },
            },
            {
              id: 'm9l-q15',
              number: 15,
              prompt: "How can visitors reserve a place at the guided talk?",
              options: [{ id: 'A', text: "At the information desk" }, { id: 'B', text: "Through the centre's website only" }, { id: 'C', text: "By speaking to a wildlife keeper" }],
              answer: { accepted: ['A'] },
              explanation: { text: "Places are reserved at the information desk, where staff give the times.", evidence: { quote: "you can reserve a place at the information desk" } },
            },
          ],
        },
        {
          id: 'm9l-g4',
          type: 'matching',
          instructions: "Which area of the centre is suitable for each activity? Choose FIVE answers from the box.",
          optionsTitle: "Areas of the centre",
          options: [{ id: 'A', text: "Observation Deck" }, { id: 'B', text: "Rescue Room" }, { id: 'C', text: "Shell Gallery" }, { id: 'D', text: "Marsh Trail" }, { id: 'E', text: "Education Room" }, { id: 'F', text: "Picnic Area" }],
          questions: [
            { id: 'm9l-q16', number: 16, prompt: "See rescued seals through a viewing window", answer: { accepted: ['B'] }, explanation: { text: "The Rescue Room has the viewing window.", evidence: { quote: "The Rescue Room has a large viewing window." } } },
            { id: 'm9l-q17', number: 17, prompt: "Learn about different types of shells", answer: { accepted: ['C'] }, explanation: { text: "The Shell Gallery displays shells from many regions.", evidence: { quote: "The Shell Gallery displays shells collected from different coastal regions." } } },
            { id: 'm9l-q18', number: 18, prompt: "Watch birds from an elevated position", answer: { accepted: ['A'] }, explanation: { text: "The Observation Deck is the raised platform for birdwatching.", evidence: { quote: "It's an elevated platform overlooking the water" } } },
            { id: 'm9l-q19', number: 19, prompt: "Walk through a natural salt-marsh environment", answer: { accepted: ['D'] }, explanation: { text: "The Marsh Trail crosses the salt marsh.", evidence: { quote: "It passes through an area of salt marsh" } } },
            { id: 'm9l-q20', number: 20, prompt: "Watch a short educational film", answer: { accepted: ['E'] }, explanation: { text: "The Education Room shows a film about marine habitats.", evidence: { quote: "the Education Room has a short film about marine habitats" } } },
          ],
        },
      ],
    },
    {
      id: 'l3',
      number: 3,
      title: "Planning a local-history podcast",
      audio: {
        intro: "Part 3. You will hear two university students planning a podcast about local history. First, you have some time to look at questions 21 to 25.",
        noun: "discussion",
        ...rec('l3'),
        // Questions 21–25 are answered by line 12; the break comes before they divide the work.
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 14 },
        ],
        script: [
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "Daniel, I've read through the survey responses. I think we've got a good idea for the podcast now." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "Great. What did people say?" },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "Quite a few students said they'd enjoy hearing personal memories from people who have lived here for a long time." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "That's interesting. So rather than making it a programme full of dates and historical facts, we can share local history through residents' stories." },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "Exactly. I think that would make the episodes more engaging." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "I agree. We could ask older residents about how the town has changed over the years." },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "Yes. I also thought about interviewing children, but perhaps we shouldn't do that." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "Why not? It could be interesting to hear how younger people see the town." },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "The problem is privacy. We'd need to deal with parental permission and other concerns. It would make the project more complicated than necessary." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "Fair enough. Let's focus on adult residents, then." },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "How should we record the interviews? I thought we might need to hire a studio." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "I don't think that's necessary. We can use a mobile phone with a good recording application. We should test the sound quality first, of course." },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "That could save us money. My main concern is background noise. Some of the people we'll interview may live near busy roads." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "We can choose quieter places, such as a community room or a library meeting space." },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "Good idea. Let's divide the work. I'll contact the local history society and ask whether they can help us find people to interview." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "Perfect. I'll prepare the interview questions. We should keep them open-ended so people can tell their stories naturally." },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "Agreed. When we've found the participants, we should conduct the interviews together. That way, one of us can ask questions while the other checks the recording." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "Yes, we'll both do that. I'll also take responsibility for editing the recorded episodes afterwards." },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "Great. Then I'll write the opening introduction. I can explain the purpose of the podcast and introduce the first guest." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "Sounds like a plan. We should aim to record the first episode next week." },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "Let's do that. I'll contact the society this afternoon." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "Excellent. I'll start preparing the questions." },
        ],
      },
      groups: [
        {
          id: 'm9l-g5',
          type: 'multiple-choice',
          instructions: "Choose the correct letter, A, B or C.",
          questions: [
            {
              id: 'm9l-q21',
              number: 21,
              prompt: "What did the students discover from their initial survey?",
              options: [{ id: 'A', text: "Students were interested in hearing personal memories." }, { id: 'B', text: "Most students already knew the town's history." }, { id: 'C', text: "Students preferred written articles to audio." }],
              answer: { accepted: ['A'] },
              explanation: { text: "The survey showed an appetite for personal memories from long-term residents.", evidence: { quote: "Quite a few students said they'd enjoy hearing personal memories from people who have lived here for a long time." } },
            },
            {
              id: 'm9l-q22',
              number: 22,
              prompt: "What is the main aim of the podcast?",
              options: [{ id: 'A', text: "To explain the development of modern transport" }, { id: 'B', text: "To share local history through residents' stories" }, { id: 'C', text: "To advertise historical buildings to tourists" }],
              answer: { accepted: ['B'] },
              explanation: { text: "Rather than dates and facts, they will tell local history through the residents themselves.", evidence: { quote: "we can share local history through residents' stories" } },
            },
            {
              id: 'm9l-q23',
              number: 23,
              prompt: "Why did they decide not to interview children?",
              options: [{ id: 'A', text: "They could not find enough child participants." }, { id: 'B', text: "The interviews might raise privacy concerns." }, { id: 'C', text: "Their supervisor thought children would give short answers." }],
              answer: { accepted: ['B'] },
              explanation: { text: "Parental permission and privacy would complicate the project.", evidence: { quote: "The problem is privacy. We'd need to deal with parental permission and other concerns." } },
            },
            {
              id: 'm9l-q24',
              number: 24,
              prompt: "What recording method does Daniel suggest?",
              options: [{ id: 'A', text: "Recording interviews using a mobile phone" }, { id: 'B', text: "Hiring a professional recording studio" }, { id: 'C', text: "Using an old cassette recorder" }],
              answer: { accepted: ['A'] },
              explanation: { text: "Maya suggests a studio; Daniel says a mobile phone with a good app will do.", evidence: { quote: "We can use a mobile phone with a good recording application." }, distractors: { B: "Hiring a studio is what Maya suggested and Daniel rejected." } },
            },
            {
              id: 'm9l-q25',
              number: 25,
              prompt: "What is Maya's main concern?",
              options: [{ id: 'A', text: "Finding enough historical photographs" }, { id: 'B', text: "Making the episodes short enough" }, { id: 'C', text: "Reducing background noise in the recordings" }],
              answer: { accepted: ['C'] },
              explanation: { text: "Some interviewees live near busy roads, so background noise worries her.", evidence: { quote: "My main concern is background noise." } },
            },
          ],
        },
        {
          id: 'm9l-g6',
          type: 'matching',
          instructions: "Who will carry out each task? Choose FIVE answers from the box.",
          optionsTitle: "People",
          options: [{ id: 'A', text: "Maya" }, { id: 'B', text: "Daniel" }, { id: 'C', text: "Both students" }],
          questions: [
            { id: 'm9l-q26', number: 26, prompt: "Contact the local history society", answer: { accepted: ['A'] }, explanation: { text: "Maya will ask the society to help find people to interview.", evidence: { quote: "I'll contact the local history society" } } },
            { id: 'm9l-q27', number: 27, prompt: "Prepare the interview questions", answer: { accepted: ['B'] }, explanation: { text: "Daniel will write open-ended questions.", evidence: { quote: "I'll prepare the interview questions." } } },
            { id: 'm9l-q28', number: 28, prompt: "Conduct the interviews", answer: { accepted: ['C'] }, explanation: { text: "They will interview together, one asking while the other checks the recording.", evidence: { quote: "we should conduct the interviews together" } } },
            { id: 'm9l-q29', number: 29, prompt: "Edit the recorded episodes", answer: { accepted: ['B'] }, explanation: { text: "Daniel takes on the editing.", evidence: { quote: "I'll also take responsibility for editing the recorded episodes afterwards." } } },
            { id: 'm9l-q30', number: 30, prompt: "Write the opening introduction", answer: { accepted: ['A'] }, explanation: { text: "Maya will write the introduction and present the first guest.", evidence: { quote: "Then I'll write the opening introduction." } } },
          ],
        },
      ],
    },
    {
      id: 'l4',
      number: 4,
      title: "The life and importance of honeybees",
      audio: {
        intro: "Part 4. You will hear a lecturer talking about honeybees and their role in the environment. First, you have some time to look at questions 31 to 40.",
        noun: "talk",
        ...rec('l4'),
        sets: [
          { questions: '31 to 40', fromLine: 0 },
        ],
        script: [
          { speaker: "Lecturer", voice: M, accent: 'en-GB', text: "Today we're going to learn about honeybees and their important role in natural ecosystems." },
          { speaker: "Lecturer", voice: M, accent: 'en-GB', text: "Honeybees are social insects that live together in colonies. Each colony contains different types of bees, and each has a particular role." },
          { speaker: "Lecturer", voice: M, accent: 'en-GB', text: "One of the most important activities of honeybees is collecting food. They visit flowers to collect nectar, a sweet liquid produced by plants. Bees use nectar as a source of energy, and some of it is stored in the hive and later converted into honey." },
          { speaker: "Lecturer", voice: M, accent: 'en-GB', text: "While visiting flowers, bees also collect pollen. Pollen contains the male reproductive cells of flowering plants. When bees move from one flower to another, they carry pollen between them. This process is called pollination and helps plants reproduce." },
          { speaker: "Lecturer", voice: M, accent: 'en-GB', text: "Pollen often becomes attached to special structures on the bees' legs. These structures allow bees to transport it back to the hive." },
          { speaker: "Lecturer", voice: M, accent: 'en-GB', text: "Inside the hive, honeybees build a complex structure called a honeycomb. They produce wax, which is used to construct the walls of the small cells. These cells store honey and pollen and also provide places where young bees can develop." },
          { speaker: "Lecturer", voice: M, accent: 'en-GB', text: "A colony usually has one queen bee. The queen is the main egg-laying bee and is responsible for producing the next generation of the colony." },
          { speaker: "Lecturer", voice: M, accent: 'en-GB', text: "Most of the daily work is carried out by worker bees. They collect food, clean the hive, care for the young and help protect the colony." },
          { speaker: "Lecturer", voice: M, accent: 'en-GB', text: "The development of a honeybee takes place in several stages. A young bee begins as an egg. It then develops into a larva, which is fed and cared for by worker bees. Later, it changes into a pupa before emerging as an adult." },
          { speaker: "Lecturer", voice: M, accent: 'en-GB', text: "Despite their importance, honeybees face several threats. Some chemicals used in farming, known as pesticides, can harm bees. These chemicals may affect their ability to find food or return to their colonies." },
          { speaker: "Lecturer", voice: M, accent: 'en-GB', text: "Loss of suitable natural environments is another concern. Gardens, wildflower areas and other green spaces provide important habitats where bees can find food and shelter." },
          { speaker: "Lecturer", voice: M, accent: 'en-GB', text: "People can help by planting different kinds of flowers that bloom at different times of the year. This helps maintain biological diversity and provides a more reliable food supply for pollinating insects." },
          { speaker: "Lecturer", voice: M, accent: 'en-GB', text: "Honeybees are small creatures, but their contribution to the environment is enormous." },
        ],
      },
      groups: [
        {
          id: 'm9l-g7',
          type: 'note-completion',
          instructions: "Complete the notes below. Write ONE WORD ONLY for each answer.",
          wordLimit: { words: 1 },
          template: "HONEYBEES\n\nCollecting food\n- Honeybees collect a sweet liquid called {{31}} from flowers.\n- They also carry {{32}} between flowers, which helps plants reproduce.\n- It sticks to special structures on the bees' {{33}}.\n\nThe hive\n- Bees produce {{34}} to build the walls of the honeycomb.\n- The {{35}} is the main egg-laying bee in a colony.\n- Most of the daily work is done by {{36}} bees.\n- A young bee hatches from an egg and becomes a {{37}}, which the workers feed.\n\nThreats and help\n- Farm chemicals known as {{38}} can harm bees.\n- Gardens and wildflower areas provide important {{39}}.\n- Planting flowers that bloom at different times maintains biological {{40}}.",
          questions: [
            { id: 'm9l-q31', number: 31, answer: { accepted: ['nectar'] }, explanation: { text: "Nectar is the sweet liquid they collect from flowers.", evidence: { quote: "They visit flowers to collect nectar, a sweet liquid produced by plants." } } },
            { id: 'm9l-q32', number: 32, answer: { accepted: ['pollen'] }, explanation: { text: "Moving between flowers, bees carry pollen, which pollinates the plants.", evidence: { quote: "they carry pollen between them" } } },
            { id: 'm9l-q33', number: 33, answer: { accepted: ['legs'] }, explanation: { text: "Pollen sticks to special structures on their legs.", evidence: { quote: "Pollen often becomes attached to special structures on the bees' legs." } } },
            { id: 'm9l-q34', number: 34, answer: { accepted: ['wax'] }, explanation: { text: "Wax builds the walls of the honeycomb cells.", evidence: { quote: "They produce wax, which is used to construct the walls of the small cells." } } },
            { id: 'm9l-q35', number: 35, answer: { accepted: ['queen'] }, explanation: { text: "The queen lays the eggs for the next generation.", evidence: { quote: "The queen is the main egg-laying bee" } } },
            { id: 'm9l-q36', number: 36, answer: { accepted: ['worker'] }, explanation: { text: "Worker bees collect food, clean the hive and protect the colony.", evidence: { quote: "Most of the daily work is carried out by worker bees." } } },
            { id: 'm9l-q37', number: 37, answer: { accepted: ['larva'] }, explanation: { text: "An egg becomes a larva, fed by the worker bees, before the pupa stage.", evidence: { quote: "It then develops into a larva, which is fed and cared for by worker bees." } } },
            { id: 'm9l-q38', number: 38, answer: { accepted: ['pesticides'] }, explanation: { text: "Pesticides can stop bees finding food or returning home.", evidence: { quote: "Some chemicals used in farming, known as pesticides, can harm bees." } } },
            { id: 'm9l-q39', number: 39, answer: { accepted: ['habitats'] }, explanation: { text: "Green spaces give bees food and shelter.", evidence: { quote: "provide important habitats where bees can find food and shelter" } } },
            { id: 'm9l-q40', number: 40, answer: { accepted: ['diversity'] }, explanation: { text: "Flowers blooming at different times keep biological diversity up.", evidence: { quote: "This helps maintain biological diversity" } } },
          ],
        },
      ],
    },
  ],
};
