import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 3 — Listening. Original content written for
 * Mino in the style of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material.
 *
 * Content: joining a local library (Part 1), a botanical garden welcome talk
 * (Part 2), students discussing a cycling research project (Part 3), a lecture
 * on rooftop gardens (Part 4).
 *
 * Changes made when the supplied package was installed: Part 1 lists the type
 * of membership before the fee (the recording gives them in that order); in
 * Part 3 the unsupported "bad weather" item was replaced by "comparing results
 * with another university", the matching task moved to Q25–29 and the
 * presentation question to Q30, so every answer comes in the order heard.
 */
const rec = (partId: string) => recorded('vb-mock-3', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock3Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    {
      id: 'l1',
      number: 1,
      title: 'Joining a local library',
      audio: {
        intro: 'Part 1. You will hear a man phoning a public library to become a member. First, you have some time to look at questions 1 to 10.',
        noun: 'conversation',
        ...rec('l1'),
        // Questions 1–5 are answered by line 15; the break comes before the activity-time question.
        sets: [
          { questions: '1 to 5', fromLine: 0 },
          { questions: '6 to 10', fromLine: 16 },
        ],
        script: [
          { speaker: "Helen", voice: W, accent: 'en-GB', text: "Good morning, Riverside Public Library. How may I help you?" },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "Hello. I'd like to become a member. I moved to this area recently, and I'd like to use the library facilities." },
          { speaker: "Helen", voice: W, accent: 'en-GB', text: "Certainly. We have several types of membership. I can take your details now. Could I have your full name, please?" },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "Yes, my first name is Daniel, and my surname is Carter. That's C-A-R-T-E-R." },
          { speaker: "Helen", voice: W, accent: 'en-GB', text: "Thank you, Mr Carter. And what's your address?" },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "It's 16 Oak Street. That's O-A-K, like the tree." },
          { speaker: "Helen", voice: W, accent: 'en-GB', text: "Right, 16 Oak Street. Could I have a telephone number?" },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "Of course. It's 07911 638420." },
          { speaker: "Helen", voice: W, accent: 'en-GB', text: "Let me check that: 07911 638420." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "Yes, that's correct." },
          { speaker: "Helen", voice: W, accent: 'en-GB', text: "Now, when would you like your membership to begin? You can choose any date from the first of July onwards." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "I'd prefer the twenty-second of July. I'll be travelling before then, so that date would be more convenient." },
          { speaker: "Helen", voice: W, accent: 'en-GB', text: "No problem. I'll put down the twenty-second of July." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "Thank you." },
          { speaker: "Helen", voice: W, accent: 'en-GB', text: "We also organise a number of activities for members. Some people come for book discussions, while others attend our creative writing sessions. Do you have a preferred day?" },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "Thursday would be best for me. I work late on Mondays and Wednesdays, but Thursday evenings are usually free." },
          { speaker: "Helen", voice: W, accent: 'en-GB', text: "All right. Most of our activities take place in the evening. Would six thirty suit you?" },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "Actually, could I come at seven? I finish work at six, and I need a little time to travel here." },
          { speaker: "Helen", voice: W, accent: 'en-GB', text: "Certainly. I'll record seven p.m. as your preferred time." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "Great." },
          { speaker: "Helen", voice: W, accent: 'en-GB', text: "Are you applying for a standard adult membership or a student membership?" },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "Student membership, please. I'm currently studying at the local college." },
          { speaker: "Helen", voice: W, accent: 'en-GB', text: "In that case, the annual fee is twenty-five pounds. The standard adult fee is thirty-two pounds, so the student option is a little cheaper." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "That's fine." },
          { speaker: "Helen", voice: W, accent: 'en-GB', text: "When you come to collect your membership card, please bring proof of your student status. A student identity card is perfectly acceptable." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "All right. I'll bring my college ID." },
          { speaker: "Helen", voice: W, accent: 'en-GB', text: "One last question. Where did you hear about the library?" },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "I saw an article in the local newsletter. It mentioned the new study area and the weekend reading programme." },
          { speaker: "Helen", voice: W, accent: 'en-GB', text: "Excellent. I'll record local newsletter. Your membership card should be ready in three working days." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "Thank you for your help." },
          { speaker: "Helen", voice: W, accent: 'en-GB', text: "You're welcome. We look forward to seeing you." },
        ],
      },
      groups: [
        {
          id: 'm3l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          wordLimit: { words: 2, number: true },
          template: "RIVERSIDE PUBLIC LIBRARY \u2014 MEMBERSHIP APPLICATION\nSurname: {{1}}\nAddress: 16 {{2}} Street\nTelephone number: {{3}}\nMembership starting date: {{4}} July\nPreferred day for activities: {{5}}\nPreferred activity time: {{6}} p.m.\nType of membership requested: {{7}}\nAnnual membership fee: \u00a3{{8}}\nDocument to bring when collecting the card: {{9}}\nWhere the applicant heard about the library: {{10}}",
          questions: [
            { id: 'm3l-q1', number: 1, answer: { accepted: ['Carter'] }, explanation: { text: "The surname is spelled out: C-A-R-T-E-R.", evidence: { quote: "my surname is Carter. That's C-A-R-T-E-R." } } },
            { id: 'm3l-q2', number: 2, answer: { accepted: ['Oak'] }, explanation: { text: "The street name is spelled out: O-A-K.", evidence: { quote: "It's 16 Oak Street. That's O-A-K, like the tree." } } },
            { id: 'm3l-q3', number: 3, answer: { accepted: ['07911638420', '07911 638420', '07911 638 420'] }, explanation: { text: "Daniel gives his number and confirms it when Helen repeats it.", evidence: { quote: "It's 07911 638420." } } },
            { id: 'm3l-q4', number: 4, answer: { accepted: ['22', '22nd', 'twenty-second'] }, explanation: { text: "He prefers the twenty-second of July; the first of July is only the earliest possible date.", evidence: { quote: "I'd prefer the twenty-second of July." } } },
            { id: 'm3l-q5', number: 5, answer: { accepted: ['Thursday', 'Thursdays'] }, explanation: { text: "He works late on Mondays and Wednesdays, so Thursday is best.", evidence: { quote: "Thursday would be best for me." } } },
            { id: 'm3l-q6', number: 6, answer: { accepted: ['7', '7.00', '7:00', 'seven'] }, explanation: { text: "Helen suggests six thirty, but Daniel asks to come at seven.", evidence: { quote: "Actually, could I come at seven?" } } },
            { id: 'm3l-q7', number: 7, answer: { accepted: ['student'] }, explanation: { text: "He asks for student membership, not standard adult membership.", evidence: { quote: "Student membership, please." } } },
            { id: 'm3l-q8', number: 8, answer: { accepted: ['25', '\u00a325'] }, explanation: { text: "The student fee is twenty-five pounds; thirty-two pounds is the standard adult fee.", evidence: { quote: "the annual fee is twenty-five pounds." } } },
            { id: 'm3l-q9', number: 9, answer: { accepted: ['student ID', 'student identity card', 'college ID', 'ID card', 'student card', 'ID', 'identity card'] }, explanation: { text: "Helen says a student identity card is acceptable, and Daniel says he will bring his college ID.", evidence: { quote: "I'll bring my college ID." } } },
            { id: 'm3l-q10', number: 10, answer: { accepted: ['newsletter', 'local newsletter'] }, explanation: { text: "He saw an article in the local newsletter.", evidence: { quote: "I saw an article in the local newsletter." } } },
          ],
        },
      ],
    },
    {
      id: 'l2',
      number: 2,
      title: 'A visit to a botanical garden',
      audio: {
        intro: 'Part 2. You will hear a guide giving a welcome talk to visitors at a botanical garden. First, you have some time to look at questions 11 to 20.',
        noun: 'talk',
        ...rec('l2'),
        // Questions 11–15 are answered by line 5; the break comes before the guide describes the facilities.
        sets: [
          { questions: '11 to 15', fromLine: 0 },
          { questions: '16 to 20', fromLine: 6 },
        ],
        script: [
          { speaker: "Rachel", voice: W, accent: 'en-GB', text: "Good morning, everyone, and welcome to Greenfield Botanical Garden. My name is Rachel, and I'll give you a brief introduction before you begin exploring the grounds." },
          { speaker: "Rachel", voice: W, accent: 'en-GB', text: "Our garden has been open to the public for nearly forty years. However, the site has a much longer history. Before the garden was established, this land was used as a fruit farm. Local farmers grew apples, pears and several other varieties of fruit here. Some of the older trees from that period are still part of our collection." },
          { speaker: "Rachel", voice: W, accent: 'en-GB', text: "You may have noticed that the main glasshouse is currently closed. We apologise for the inconvenience. Some visitors have assumed that this is because of a plant disease, but that is not the case. We are replacing the ventilation equipment to improve temperature and humidity control. The work should be completed within the next few weeks." },
          { speaker: "Rachel", voice: W, accent: 'en-GB', text: "For those who would like to explore independently, we offer an audio guide. It is available in several languages and can be collected from the visitor centre. Its main purpose is to help visitors follow a self-guided route through the garden. At each marked stop, the recording provides information about the plants and the surrounding environment." },
          { speaker: "Rachel", voice: W, accent: 'en-GB', text: "Families with children may be interested in our weekend activities. There are several options, but one of the most popular is the seed-planting session. Children can choose from a selection of seeds and plant them in small containers to take home. It is a simple activity, but it helps them understand how plants grow." },
          { speaker: "Rachel", voice: W, accent: 'en-GB', text: "If you haven't purchased your ticket in advance, you can buy one when you arrive at the visitor centre. It is located just inside the main entrance. The caf\u00e9 sells refreshments, but it does not sell admission tickets." },
          { speaker: "Rachel", voice: W, accent: 'en-GB', text: "Let me now describe some of the main facilities." },
          { speaker: "Rachel", voice: W, accent: 'en-GB', text: "The Tropical House contains plants that normally grow in warm, humid environments. You will find several species that are native to rainforests, including large-leaved plants and climbing varieties." },
          { speaker: "Rachel", voice: W, accent: 'en-GB', text: "Next to it is the Herb Garden. This area contains herbs that are commonly used in cooking. Information boards explain how different herbs can be used to add flavour to food, and staff occasionally demonstrate simple recipes." },
          { speaker: "Rachel", voice: W, accent: 'en-GB', text: "The Wildlife Pond is a good place to observe small animals and insects. Look carefully around the water's edge, where you may see dragonflies and other insects. Please do not try to catch them." },
          { speaker: "Rachel", voice: W, accent: 'en-GB', text: "If you are interested in learning more about gardening, visit the Learning Pavilion. This indoor space is used for educational workshops and practical demonstrations. Some sessions are suitable for beginners, while others are designed for experienced gardeners." },
          { speaker: "Rachel", voice: W, accent: 'en-GB', text: "The Rose Garden is particularly attractive during the summer months. It contains several varieties of roses, including some older types that are no longer commonly grown." },
          { speaker: "Rachel", voice: W, accent: 'en-GB', text: "Finally, don't miss the Orchard. It contains traditional fruit trees, including different varieties of apple and pear. Some of these trees are over fifty years old." },
          { speaker: "Rachel", voice: W, accent: 'en-GB', text: "We hope you enjoy your visit. Please remember to follow the signs and avoid entering any areas marked as staff-only." },
        ],
      },
      groups: [
        {
          id: 'm3l-g2',
          type: 'multiple-choice',
          instructions: "Choose the correct letter, A, B or C.",
          questions: [
            {
              id: 'm3l-q11',
              number: 11,
              prompt: "What was the botanical garden site used for before it became a public garden?",
              options: [{ id: 'A', text: "A fruit farm" }, { id: 'B', text: "A public park" }, { id: 'C', text: "A research laboratory" }],
              answer: { accepted: ['A'] },
              explanation: { text: "Before the garden was established, the land was used as a fruit farm.", evidence: { quote: "this land was used as a fruit farm." } },
            },
            {
              id: 'm3l-q12',
              number: 12,
              prompt: "Why is the main glasshouse temporarily closed?",
              options: [{ id: 'A', text: "Some plants have been affected by disease." }, { id: 'B', text: "The ventilation equipment is being replaced." }, { id: 'C', text: "A new collection of plants is being installed." }],
              answer: { accepted: ['B'] },
              explanation: { text: "Disease is ruled out; the ventilation equipment is being replaced.", evidence: { quote: "We are replacing the ventilation equipment to improve temperature and humidity control." } },
            },
            {
              id: 'm3l-q13',
              number: 13,
              prompt: "What is the main purpose of the garden's audio guide?",
              options: [{ id: 'A', text: "To explain how the plants are cultivated" }, { id: 'B', text: "To provide information about the garden's history only" }, { id: 'C', text: "To help visitors follow a self-guided route" }],
              answer: { accepted: ['C'] },
              explanation: { text: "Its main purpose is to help visitors follow a self-guided route.", evidence: { quote: "Its main purpose is to help visitors follow a self-guided route through the garden." } },
            },
            {
              id: 'm3l-q14',
              number: 14,
              prompt: "Which activity is especially recommended for children?",
              options: [{ id: 'A', text: "Painting flower pots" }, { id: 'B', text: "Planting seeds" }, { id: 'C', text: "Identifying different types of trees" }],
              answer: { accepted: ['B'] },
              explanation: { text: "The seed-planting session is one of the most popular weekend activities.", evidence: { quote: "one of the most popular is the seed-planting session." } },
            },
            {
              id: 'm3l-q15',
              number: 15,
              prompt: "Where should visitors go if they want to buy tickets on arrival?",
              options: [{ id: 'A', text: "The education centre" }, { id: 'B', text: "The main caf\u00e9" }, { id: 'C', text: "The visitor centre" }],
              answer: { accepted: ['C'] },
              explanation: { text: "Tickets are sold at the visitor centre; the caf\u00e9 does not sell them.", evidence: { quote: "you can buy one when you arrive at the visitor centre." } },
            },
          ],
        },
        {
          id: 'm3l-g3',
          type: 'matching',
          instructions: "Which place in the garden is suitable for each activity? Choose FIVE answers from the box.",
          optionsTitle: "Places in the garden",
          options: [{ id: 'A', text: "Tropical House" }, { id: 'B', text: "Herb Garden" }, { id: 'C', text: "Wildlife Pond" }, { id: 'D', text: "Learning Pavilion" }, { id: 'E', text: "Rose Garden" }, { id: 'F', text: "Orchard" }],
          questions: [
            { id: 'm3l-q16', number: 16, prompt: "Seeing plants that normally grow in rainforests", answer: { accepted: ['A'] }, explanation: { text: "The Tropical House has several species native to rainforests.", evidence: { quote: "several species that are native to rainforests" } } },
            { id: 'm3l-q17', number: 17, prompt: "Learning how herbs are used in cooking", answer: { accepted: ['B'] }, explanation: { text: "The Herb Garden has boards explaining how herbs add flavour to food.", evidence: { quote: "Information boards explain how different herbs can be used to add flavour to food" } } },
            { id: 'm3l-q18', number: 18, prompt: "Observing insects that live near water", answer: { accepted: ['C'] }, explanation: { text: "Dragonflies and other insects can be seen around the Wildlife Pond.", evidence: { quote: "where you may see dragonflies and other insects" } } },
            { id: 'm3l-q19', number: 19, prompt: "Taking part in an indoor educational workshop", answer: { accepted: ['D'] }, explanation: { text: "The Learning Pavilion is the indoor space for educational workshops.", evidence: { quote: "This indoor space is used for educational workshops and practical demonstrations." } } },
            { id: 'm3l-q20', number: 20, prompt: "Seeing varieties of traditional fruit trees", answer: { accepted: ['F'] }, explanation: { text: "The Orchard contains traditional fruit trees.", evidence: { quote: "It contains traditional fruit trees, including different varieties of apple and pear." } } },
          ],
        },
      ],
    },
    {
      id: 'l3',
      number: 3,
      title: 'A university project on cycling to campus',
      audio: {
        intro: 'Part 3. You will hear two university students discussing a research project about cycling to campus. First, you have some time to look at questions 21 to 24.',
        noun: 'discussion',
        ...rec('l3'),
        // Questions 21–24 are answered by line 9; the break comes before the students move on to bicycle storage.
        sets: [
          { questions: '21 to 24', fromLine: 0 },
          { questions: '25 to 30', fromLine: 11 },
        ],
        script: [
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "Hi, Daniel. I've looked through the questionnaire results. We have some useful information, but I think we need to discuss a few things before we prepare the final report." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "I agree. First, I think we should make the purpose of the project clear. We're not simply counting bicycles on campus or comparing transport costs. Our main aim is to investigate why some students cycle to campus while others choose not to." },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "Exactly. We want to understand the factors that influence their decisions, such as distance, safety and the availability of bicycle facilities." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "We originally expected around two hundred responses, but we received considerably fewer. At first, I thought there might have been a technical problem with the online form." },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "I checked that. The form was working properly. I think the timing was the problem. We sent the questionnaire out during the examination period, when many students were too busy to respond." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "That makes sense. We should have waited until the semester break or at least until the exams were over." },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "There are still some interesting results, though. One thing that surprised me was the number of students who mentioned secure bicycle parking as a major concern. I thought distance would be the most important factor." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "I wasn't surprised by the parking issue. Several students have told me that they worry about their bicycles being stolen. We should investigate that more carefully." },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "How do you think we should do that?" },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "We could observe the bicycle parking areas, but that wouldn't tell us how many thefts have actually been reported. I suggest asking campus security for their records of reported bicycle thefts." },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "Good idea. That would give us more reliable information than simply asking people what they think." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "What about the information on bicycle storage? We have some photographs, but we don't know how many secure storage spaces are officially available." },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "The facilities manager should have those details. We should contact that office and confirm the number of spaces before including it in the report." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "Agreed. We also asked students how far they usually travel to reach campus. I think those figures could be useful." },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "Yes. Rather than listing every individual distance, we can present the information as a chart. That will make the different distance groups easier to compare." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "What should we do with the comments about road safety?" },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "Some of the comments are quite detailed. I think we should include a short quotation from one student. It explains the problem clearly without taking up too much space." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "That's a good approach. We should make sure the quotation doesn't identify the student." },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "Of course. There is also the question about the cost of maintaining a bicycle. We didn't collect enough information about repairs and replacement parts." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "Could we estimate the cost using prices from local bicycle shops?" },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "We could, but that wouldn't tell us what students actually spend. I'd prefer to collect additional information from a few students who cycle regularly." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "All right. We can do that next week." },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "What about comparing our results with another university?" },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "That might be interesting, but I don't think we have enough time. Their campus layout and transport facilities could be quite different." },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "I agree. We should focus on our own university and perhaps mention comparisons as a possibility for future research." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "So, for the presentation, what format do you think would work best?" },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "A map showing the main cycling routes around the campus would be useful. We can add a few selected student comments to explain why those routes are popular or unpopular." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "That sounds more engaging than a presentation made up entirely of tables." },
          { speaker: "Maya", voice: W, accent: 'en-GB', text: "Great. I'll prepare the map, and you can contact campus security and the facilities manager." },
          { speaker: "Daniel", voice: M, accent: 'en-GB', text: "Perfect. Let's meet again on Monday to review our progress." },
        ],
      },
      groups: [
        {
          id: 'm3l-g4',
          type: 'multiple-choice',
          instructions: "Choose the correct letter, A, B or C.",
          questions: [
            {
              id: 'm3l-q21',
              number: 21,
              prompt: "What is the main aim of the students' research project?",
              options: [{ id: 'A', text: "To compare the cost of cycling with public transport" }, { id: 'B', text: "To investigate why students do or do not cycle to campus" }, { id: 'C', text: "To measure the number of bicycles used on campus each day" }],
              answer: { accepted: ['B'] },
              explanation: { text: "The aim is to find out why some students cycle and others do not; counting bicycles and comparing costs are ruled out.", evidence: { quote: "Our main aim is to investigate why some students cycle to campus while others choose not to." } },
            },
            {
              id: 'm3l-q22',
              number: 22,
              prompt: "Why did the students receive fewer questionnaire responses than expected?",
              options: [{ id: 'A', text: "The questionnaire was sent out during the examination period." }, { id: 'B', text: "The online form was difficult to access." }, { id: 'C', text: "The questions were too personal." }],
              answer: { accepted: ['A'] },
              explanation: { text: "The form worked properly; the questionnaire went out during the examination period.", evidence: { quote: "We sent the questionnaire out during the examination period, when many students were too busy to respond." } },
            },
            {
              id: 'm3l-q23',
              number: 23,
              prompt: "What surprised Maya about the initial findings?",
              options: [{ id: 'A', text: "Many students were willing to cycle long distances." }, { id: 'B', text: "Most students preferred cycling in the evening." }, { id: 'C', text: "Secure bicycle parking was a major concern for many students." }],
              answer: { accepted: ['C'] },
              explanation: { text: "Maya expected distance to matter most, but many students mentioned secure parking.", evidence: { quote: "One thing that surprised me was the number of students who mentioned secure bicycle parking as a major concern." } },
            },
            {
              id: 'm3l-q24',
              number: 24,
              prompt: "What does Daniel suggest they do to investigate bicycle theft?",
              options: [{ id: 'A', text: "Interview students who have stopped cycling." }, { id: 'B', text: "Ask campus security for records of reported thefts." }, { id: 'C', text: "Observe the bicycle parking areas during the day." }],
              answer: { accepted: ['B'] },
              explanation: { text: "Observing would not show how many thefts were reported, so he suggests asking campus security.", evidence: { quote: "I suggest asking campus security for their records of reported bicycle thefts." } },
            },
          ],
        },
        {
          id: 'm3l-g5',
          type: 'matching',
          instructions: "What action have the students decided to take for each part of their project? Choose FIVE answers from the box.",
          optionsTitle: "Actions",
          options: [{ id: 'A', text: "Estimate it using prices from local bicycle shops" }, { id: 'B', text: "Collect additional information" }, { id: 'C', text: "Consult the facilities manager" }, { id: 'D', text: "Present the information as a chart" }, { id: 'E', text: "Include a short student quotation" }, { id: 'F', text: "Mention it as a possibility for future research" }],
          questions: [
            { id: 'm3l-q25', number: 25, prompt: "Information about bicycle storage", answer: { accepted: ['C'] }, explanation: { text: "The facilities manager should have the number of official storage spaces.", evidence: { quote: "The facilities manager should have those details." } } },
            { id: 'm3l-q26', number: 26, prompt: "Students' usual travelling distances", answer: { accepted: ['D'] }, explanation: { text: "They will show the distances as a chart rather than list every one.", evidence: { quote: "we can present the information as a chart." } } },
            { id: 'm3l-q27', number: 27, prompt: "Students' concerns about road safety", answer: { accepted: ['E'] }, explanation: { text: "A short quotation from one student explains the problem clearly.", evidence: { quote: "I think we should include a short quotation from one student." } } },
            { id: 'm3l-q28', number: 28, prompt: "The cost of maintaining a bicycle", answer: { accepted: ['B'] }, explanation: { text: "Shop prices would not show what students spend, so they will collect more information from regular cyclists.", evidence: { quote: "I'd prefer to collect additional information from a few students who cycle regularly." } } },
            { id: 'm3l-q29', number: 29, prompt: "Comparing the results with another university", answer: { accepted: ['F'] }, explanation: { text: "There is not enough time, so comparison is only a possibility for future research.", evidence: { quote: "perhaps mention comparisons as a possibility for future research." } } },
          ],
        },
        {
          id: 'm3l-g6',
          type: 'multiple-choice',
          instructions: "Choose the correct letter, A, B or C.",
          questions: [
            {
              id: 'm3l-q30',
              number: 30,
              prompt: "How have the students decided to present the main findings?",
              options: [{ id: 'A', text: "Using a map of cycling routes supported by selected student comments" }, { id: 'B', text: "Using a series of photographs with short captions" }, { id: 'C', text: "Using a written report containing only statistical tables" }],
              answer: { accepted: ['A'] },
              explanation: { text: "A map of the main cycling routes, with a few selected student comments.", evidence: { quote: "A map showing the main cycling routes around the campus would be useful." } },
            },
          ],
        },
      ],
    },
    {
      id: 'l4',
      number: 4,
      title: 'The benefits of rooftop gardens',
      audio: {
        intro: 'Part 4. You will hear a lecturer talking about rooftop gardens in modern cities. First, you have some time to look at questions 31 to 40.',
        noun: 'talk',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: "Professor Adams", voice: M, accent: 'en-GB', text: "Today, we're going to discuss rooftop gardens and their potential benefits in modern cities." },
          { speaker: "Professor Adams", voice: M, accent: 'en-GB', text: "As urban areas become more densely populated, the amount of available green space often decreases. Rooftop gardens offer one way of introducing vegetation into places where ground-level space is limited. They can be installed on some residential buildings, offices and public facilities, although careful planning is essential." },
          { speaker: "Professor Adams", voice: M, accent: 'en-GB', text: "One important benefit is temperature control. Roofs are often exposed to direct sunlight for long periods, and this can cause buildings to become very warm. A suitable layer of vegetation can provide thermal insulation, reducing the amount of heat that enters the building. In some cases, this may also reduce the need for air conditioning." },
          { speaker: "Professor Adams", voice: M, accent: 'en-GB', text: "Rooftop gardens can also help manage rainwater. Plants and growing materials absorb part of the rainfall rather than allowing all of it to flow immediately into drainage systems. This can reduce surface runoff, especially during periods of heavy rain. However, the amount of water retained depends on the design and depth of the growing material." },
          { speaker: "Professor Adams", voice: M, accent: 'en-GB', text: "Another benefit relates to urban wildlife. Green roofs can create habitats for a range of small animals and insects. In areas where natural green spaces are limited, even a relatively small garden can provide an additional place for insects to feed and shelter." },
          { speaker: "Professor Adams", voice: M, accent: 'en-GB', text: "Flowering plants are particularly useful because they attract pollinators, including bees and butterflies. These animals play an important role in the reproduction of many plant species. By choosing a variety of flowering plants, designers can provide food sources across different seasons." },
          { speaker: "Professor Adams", voice: M, accent: 'en-GB', text: "However, rooftop gardens cannot be installed on every building without assessment. The roof structure must be strong enough to support the additional weight of soil, plants, equipment and water. Engineers therefore need to examine the building before construction begins." },
          { speaker: "Professor Adams", voice: M, accent: 'en-GB', text: "Water supply is another important consideration. Although rainfall may provide some of the water plants need, dry periods can create difficulties. A suitable irrigation system may be necessary, particularly during the early stages of plant growth. Some gardens use drip irrigation, which delivers water directly to the base of plants and can reduce unnecessary water loss." },
          { speaker: "Professor Adams", voice: M, accent: 'en-GB', text: "Plant selection also requires careful thought. Native species are often a good choice because they are generally adapted to local environmental conditions. They may require less intensive care than some imported varieties and can support local wildlife." },
          { speaker: "Professor Adams", voice: M, accent: 'en-GB', text: "A mixture of plant species can also increase biodiversity. Rather than covering the entire roof with a single type of plant, designers can introduce different heights, structures and flowering periods. This creates a more varied environment." },
          { speaker: "Professor Adams", voice: M, accent: 'en-GB', text: "Finally, rooftop gardens require long-term management. Regular maintenance is necessary to keep the garden healthy. This may include removing unwanted plants, checking drainage systems and replacing damaged vegetation." },
          { speaker: "Professor Adams", voice: M, accent: 'en-GB', text: "There are also legal requirements to consider. Designers must follow local building regulations, including rules related to structural safety, access and fire protection. These requirements may vary from one city to another." },
          { speaker: "Professor Adams", voice: M, accent: 'en-GB', text: "In conclusion, rooftop gardens can provide environmental and social benefits, but they are not simply decorative features. Their success depends on suitable design, appropriate plant selection and responsible long-term management." },
        ],
      },
      groups: [
        {
          id: 'm3l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template: "ROOFTOP GARDENS\n\nBenefits\n- Layers of plants can provide thermal {{31}} for buildings.\n- Rooftop gardens absorb rainwater and reduce surface {{32}}.\n- Green roofs can create habitats for small animals and {{33}}.\n- Flowering plants attract {{34}}, including bees and butterflies.\n\nRequirements\n- The roof structure must be strong enough to support the additional {{35}}.\n- A suitable {{36}} system may be needed during dry periods.\n- Choosing {{37}} species can improve the chances of successful growth.\n- A variety of plants can increase local {{38}}.\n- Regular {{39}} is necessary to keep the garden healthy.\n- Designers must also follow local building {{40}}.",
          questions: [
            { id: 'm3l-q31', number: 31, answer: { accepted: ['insulation'] }, explanation: { text: "A layer of vegetation provides thermal insulation.", evidence: { quote: "A suitable layer of vegetation can provide thermal insulation" } } },
            { id: 'm3l-q32', number: 32, answer: { accepted: ['runoff'] }, explanation: { text: "Plants absorb part of the rainfall, which reduces surface runoff.", evidence: { quote: "This can reduce surface runoff" } } },
            { id: 'm3l-q33', number: 33, answer: { accepted: ['insects'] }, explanation: { text: "Green roofs provide habitats for small animals and insects.", evidence: { quote: "Green roofs can create habitats for a range of small animals and insects." } } },
            { id: 'm3l-q34', number: 34, answer: { accepted: ['pollinators'] }, explanation: { text: "Flowering plants attract pollinators, including bees and butterflies.", evidence: { quote: "they attract pollinators, including bees and butterflies." } } },
            { id: 'm3l-q35', number: 35, answer: { accepted: ['weight'] }, explanation: { text: "The roof must support the additional weight of soil, plants, equipment and water.", evidence: { quote: "The roof structure must be strong enough to support the additional weight of soil, plants, equipment and water." } } },
            { id: 'm3l-q36', number: 36, answer: { accepted: ['irrigation'] }, explanation: { text: "A suitable irrigation system may be necessary in dry periods.", evidence: { quote: "A suitable irrigation system may be necessary" } } },
            { id: 'm3l-q37', number: 37, answer: { accepted: ['native'] }, explanation: { text: "Native species are often a good choice.", evidence: { quote: "Native species are often a good choice" } } },
            { id: 'm3l-q38', number: 38, answer: { accepted: ['biodiversity'] }, explanation: { text: "A mixture of plant species can increase biodiversity.", evidence: { quote: "A mixture of plant species can also increase biodiversity." } } },
            { id: 'm3l-q39', number: 39, answer: { accepted: ['maintenance'] }, explanation: { text: "Regular maintenance keeps the garden healthy.", evidence: { quote: "Regular maintenance is necessary to keep the garden healthy." } } },
            { id: 'm3l-q40', number: 40, answer: { accepted: ['regulations'] }, explanation: { text: "Designers must follow local building regulations.", evidence: { quote: "Designers must follow local building regulations" } } },
          ],
        },
      ],
    },
  ],
};
