import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 4 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material.
 *
 * Content: booking a pottery workshop (Part 1), an evening event at a
 * discovery centre (Part 2), students discussing a reusable-cups project
 * (Part 3), lecture on artificial light and nocturnal insects (Part 4).
 *
 * Fixes vs the supplied package (same intended answers, see report):
 * - Part 1 Q5 form cell: the supplied "£5. ___" leaked the question number
 *   into the amount cell. Implemented as "Total fee: £{{5}}", answer 38.
 * - Part 2 Q15 stem: the supplied "What should visitors know about buying
 *   food at the centre?" had two true options (the café does close at 8:30,
 *   before the 9 p.m. finish, AND it is card-only). Stem reworded to ask
 *   about paying, so only C is correct.
 */

const rec = (partId: string) => recorded('vb-mock-4', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock4Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Booking a pottery workshop',
      audio: {
        intro: 'Part 1. You will hear a woman phoning a community arts centre to book a place on a pottery workshop. First, you have some time to look at questions 1 to 10.',
        noun: 'conversation',
        ...rec('l1'),
        // Questions 1–5 are answered by line 14; the break comes before the practical details.
        sets: [
          { questions: '1 to 5', fromLine: 0 },
          { questions: '6 to 10', fromLine: 16 },
        ],
        script: [
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: 'Good morning, Riverside Arts Centre. Rachel speaking. How can I help you?' },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Hello. I'd like to book a place on one of your pottery workshops. I saw the information on your website, but I just wanted to check a few details before paying." },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: "Of course. Is this the Saturday workshop you're interested in?" },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Yes, that's the one. Could you take my details first?" },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: 'Certainly. Can I have your surname, please?' },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Patel. That's P-A-T-E-L." },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: 'Thank you. And have you already made a booking online, or are you starting a new one?' },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "I started one yesterday, but I didn't finish the payment. I've got the reference number here. It's 6842." },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: 'Let me check. Hmm, I can see the booking, but the last digit is actually a seven, not a two. So your reference is 6847.' },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: 'Oh, right. I must have read it incorrectly. Thanks for checking.' },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: 'No problem. Now, the workshop is on the sixteenth of May. Is that the date you wanted?' },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: 'Yes, the sixteenth is perfect.' },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: 'And would you prefer the wheel-throwing session or the hand-building workshop?' },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Hand-building, please. I've never used a pottery wheel before, so I'd rather start with something simpler." },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: "That's a good choice for beginners. The fee is thirty-eight pounds, including the materials and the firing of one finished item." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Great. I was expecting to pay separately for the clay, so that's helpful." },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: "Let me also confirm the practical details. The website says ten o'clock, but that information hasn't been updated. The workshop will actually begin at half past ten." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Half past ten? That's fine. I just wanted to make sure I didn't arrive late." },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: "Please bring an old towel with you. We provide aprons, so there's no need to bring your own." },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: 'An old towel. All right. I have one I can use.' },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: 'One more thing about the entrance. The main entrance on Bridge Street will be closed that morning because of some repair work. You’ll need to come through the side gate on Mill Lane. It’s just around the corner.' },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: 'Is that the gate near the public library?' },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: 'Not quite. The library entrance is on the opposite side. Look for the small blue sign on Mill Lane.' },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: 'Got it.' },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: 'If you need to cancel, you can receive a full refund as long as you contact us at least forty-eight hours before the workshop. After that, we can only offer a transfer if another date is available.' },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "That's reasonable. And when should I expect the confirmation email?" },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: 'We process payments in batches. If you complete the payment today, your confirmation should arrive by Wednesday. It may come earlier, but Wednesday is the latest date we can promise.' },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: "Perfect. I'll make the payment this afternoon." },
          { speaker: 'Rachel', voice: W, accent: 'en-GB', text: 'Thank you. We look forward to seeing you at Riverside Arts Centre.' },
          { speaker: 'Emma', voice: W, accent: 'en-GB', text: 'Thanks for your help. Goodbye.' },
        ],
      },
      groups: [
        {
          id: 'm4l-g1',
          type: 'form-completion',
          instructions: 'Complete the booking form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 1, number: true },
          template:
            'RIVERSIDE ARTS CENTRE — WORKSHOP BOOKING\nCustomer’s surname: {{1}}\nBooking reference: {{2}}\nWorkshop date: {{3}} May\nType of activity: {{4}}\nTotal fee: £{{5}}',
          questions: [
            { id: 'm4l-q1', number: 1, answer: { accepted: ['Patel'] }, explanation: { text: 'The surname is spelled out: P-A-T-E-L.', evidence: { quote: "Patel. That's P-A-T-E-L." } } },
            {
              id: 'm4l-q2',
              number: 2,
              answer: { accepted: ['6847', '6 8 4 7'] },
              explanation: { text: 'Emma reads the reference as 6842, but Rachel corrects the last digit to seven: 6847.', evidence: { quote: 'the last digit is actually a seven, not a two. So your reference is 6847.' } },
            },
            {
              id: 'm4l-q3',
              number: 3,
              answer: { accepted: ['16', '16th', 'sixteenth'] },
              explanation: { text: 'The workshop is on the sixteenth of May.', evidence: { quote: 'the workshop is on the sixteenth of May' } },
            },
            {
              id: 'm4l-q4',
              number: 4,
              answer: { accepted: ['hand-building', 'handbuilding'] },
              explanation: { text: 'Emma chooses hand-building; she has never used a pottery wheel.', evidence: { quote: 'Hand-building, please.' } },
            },
            {
              id: 'm4l-q5',
              number: 5,
              answer: { accepted: ['38'] },
              explanation: { text: 'The fee is thirty-eight pounds, including materials and firing.', evidence: { quote: 'The fee is thirty-eight pounds' } },
            },
          ],
        },
        {
          id: 'm4l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm4l-q6',
              number: 6,
              prompt: 'What time does the workshop actually begin?',
              options: [
                { id: 'A', text: '10:00 a.m.' },
                { id: 'B', text: '10:30 a.m.' },
                { id: 'C', text: '11:00 a.m.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The website says ten o’clock, but that information has not been updated; the workshop actually begins at half past ten.',
                evidence: { quote: 'The workshop will actually begin at half past ten.' },
                distractors: { A: 'Ten o’clock is the time shown on the website, which has not been updated.' },
              },
            },
            {
              id: 'm4l-q7',
              number: 7,
              prompt: 'What should participants bring with them?',
              options: [
                { id: 'A', text: 'An apron' },
                { id: 'B', text: 'An old towel' },
                { id: 'C', text: 'A pair of gloves' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Participants should bring an old towel; the centre provides aprons.',
                evidence: { quote: 'Please bring an old towel with you. We provide aprons' },
                distractors: { A: 'Aprons are provided by the centre, so there is no need to bring one.' },
              },
            },
            {
              id: 'm4l-q8',
              number: 8,
              prompt: 'Where should participants enter the building?',
              options: [
                { id: 'A', text: 'Through the main entrance on Bridge Street' },
                { id: 'B', text: 'Through the side gate on Mill Lane' },
                { id: 'C', text: 'Through the entrance beside the public library' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The main entrance on Bridge Street is closed for repair work; participants must use the side gate on Mill Lane.',
                evidence: { quote: 'You’ll need to come through the side gate on Mill Lane.' },
                distractors: { A: 'The main entrance is closed that morning because of repair work.', C: 'The library entrance is on the opposite side.' },
              },
            },
            {
              id: 'm4l-q9',
              number: 9,
              prompt: 'How early must a participant cancel to receive a full refund?',
              options: [
                { id: 'A', text: '24 hours before the workshop' },
                { id: 'B', text: '48 hours before the workshop' },
                { id: 'C', text: '72 hours before the workshop' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'A full refund is given as long as the participant contacts the centre at least forty-eight hours before the workshop.',
                evidence: { quote: 'you can receive a full refund as long as you contact us at least forty-eight hours before the workshop' },
              },
            },
            {
              id: 'm4l-q10',
              number: 10,
              prompt: 'When will the customer receive the confirmation email?',
              options: [
                { id: 'A', text: 'On Monday' },
                { id: 'B', text: 'On Tuesday' },
                { id: 'C', text: 'On Wednesday' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'The confirmation should arrive by Wednesday at the latest.',
                evidence: { quote: 'your confirmation should arrive by Wednesday' },
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
      title: 'An evening at the discovery centre',
      audio: {
        intro: 'Part 2. You will hear a guide explaining the programme for an evening event at a discovery centre. First, you have some time to look at questions 11 to 20.',
        noun: 'talk',
        ...rec('l2'),
        // Questions 11–14 are answered by line 4; the break comes before the facilities are described.
        sets: [
          { questions: '11 to 14', fromLine: 0 },
          { questions: '15 to 20', fromLine: 5 },
        ],
        script: [
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "Good evening, everyone, and welcome to the Riverside Discovery Centre. I'm Daniel, and I'll explain what is happening during tonight's special evening event." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "The centre usually closes at five, but tonight we're staying open until nine. Your standard evening ticket includes a short guided tour of the main exhibition areas. It doesn't include food or a science activity pack, although both are available separately." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "I'd recommend arriving at about quarter past six. The doors open at six, but the welcome talk begins at half past six, and arriving a little earlier will give you enough time to collect your programme and find a seat. Please don't arrive at quarter to seven, because by then the talk will already be underway." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'We have made one change to the schedule. The water-testing demonstration was originally planned for seven o’clock. However, the equipment needs a little more preparation, so it will now begin at half past seven. It hasn’t been cancelled, and it will still take place in the Activity Workshop.' },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'Families are very welcome. However, children under twelve must remain with an adult throughout the event. We have some activities designed for younger visitors, but children cannot move around the centre independently. There is no special early-arrival rule for them.' },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: "Now, let me explain where you can find some of tonight's activities." },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'If you’re interested in the history of the local area, visit the Archive Room. It contains old photographs, maps and documents showing how the riverside community has changed over the last hundred years. The maps are particularly interesting because you can compare the old streets with the modern town.' },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'For something more practical, go to the Activity Workshop. That’s where you’ll be able to try a simple water-quality test using samples collected from the river earlier today. A member of our science team will guide you through the process.' },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'Later in the evening, if the weather is suitable, we recommend visiting the Riverside Path. A member of our wildlife team will help visitors listen for bats and other animals that become active after sunset. Please keep your voices low so that you don’t disturb them.' },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'The Viewing Deck is another popular place. It offers a clear view across the town, including the old bridge and the buildings on the opposite bank. It’s a good place for photographs, especially after the sun goes down and the lights come on.' },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'Finally, don’t miss the Glasshouse. It’s home to plants from warmer parts of the world. You’ll find tropical leaves, unusual flowers and a small collection of plants that need much higher temperatures than those found outdoors here.' },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'The Main Café will remain open until eight thirty. You can buy sandwiches, hot drinks and a few light snacks there. Please remember that the café accepts card payments only. We are unable to take cash tonight.' },
          { speaker: 'Daniel', voice: M, accent: 'en-GB', text: 'If you need help, our staff will be wearing blue badges. Enjoy the event, and I hope you discover something new.' },
        ],
      },
      groups: [
        {
          id: 'm4l-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm4l-q11',
              number: 11,
              prompt: 'What is included in the standard evening ticket?',
              options: [
                { id: 'A', text: 'A meal in the café' },
                { id: 'B', text: 'A short guided tour' },
                { id: 'C', text: 'A science activity pack' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The standard ticket includes a short guided tour; food and the science activity pack are available separately.',
                evidence: { quote: 'Your standard evening ticket includes a short guided tour of the main exhibition areas.' },
                distractors: { A: 'Food is not included in the standard ticket.', C: 'The science activity pack is available separately, not included.' },
              },
            },
            {
              id: 'm4l-q12',
              number: 12,
              prompt: 'What time does the guide recommend visitors arrive?',
              options: [
                { id: 'A', text: '6:00 p.m.' },
                { id: 'B', text: '6:15 p.m.' },
                { id: 'C', text: '6:45 p.m.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The guide recommends arriving at about quarter past six; the doors open at six and visitors should not arrive at quarter to seven.',
                evidence: { quote: "I'd recommend arriving at about quarter past six." },
                distractors: { A: 'Six o’clock is when the doors open, not the recommended arrival time.', C: 'By quarter to seven the welcome talk is already underway.' },
              },
            },
            {
              id: 'm4l-q13',
              number: 13,
              prompt: 'What change has been made to the water-testing demonstration?',
              options: [
                { id: 'A', text: 'It has been moved to a different room.' },
                { id: 'B', text: 'It will start later than originally planned.' },
                { id: 'C', text: 'It has been replaced by a video.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The demonstration was planned for seven o’clock and will now begin at half past seven, still in the Activity Workshop.',
                evidence: { quote: 'it will now begin at half past seven' },
                distractors: { A: 'It still takes place in the Activity Workshop.', C: 'It has not been cancelled or replaced.' },
              },
            },
            {
              id: 'm4l-q14',
              number: 14,
              prompt: 'What is the rule for children under twelve?',
              options: [
                { id: 'A', text: 'They must stay with an adult.' },
                { id: 'B', text: 'They must book a separate activity.' },
                { id: 'C', text: 'They must arrive before 6:00 p.m.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Children under twelve must remain with an adult throughout the event.',
                evidence: { quote: 'children under twelve must remain with an adult throughout the event' },
                distractors: { C: 'There is no special early-arrival rule for children.' },
              },
            },
            {
              id: 'm4l-q15',
              number: 15,
              // Fixed: the supplied stem ("What should visitors know about buying food at the centre?") had two true options — the café does close at 8:30, before the 9 p.m. finish, and it is card-only. The stem now asks about paying, so only C is correct.
              prompt: 'What should visitors know about paying for food at the centre?',
              options: [
                { id: 'A', text: 'The café closes before the event ends.' },
                { id: 'B', text: 'Only cash is accepted.' },
                { id: 'C', text: 'Payment is by card only.' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'The café accepts card payments only and cannot take cash.',
                evidence: { quote: 'the café accepts card payments only' },
                distractors: { A: 'The café does close at half past eight, but that is about opening hours, not about how to pay.', B: 'Cash is not accepted at all.' },
              },
            },
          ],
        },
        {
          id: 'm4l-g4',
          type: 'matching',
          instructions: 'Which facility should visitors go to for each activity? Choose FIVE answers from the box.',
          optionsTitle: 'Facilities',
          options: [
            { id: 'A', text: 'Glasshouse' },
            { id: 'B', text: 'Archive Room' },
            { id: 'C', text: 'Activity Workshop' },
            { id: 'D', text: 'Viewing Deck' },
            { id: 'E', text: 'Riverside Path' },
            { id: 'F', text: 'Main Café' },
          ],
          questions: [
            { id: 'm4l-q16', number: 16, prompt: 'Looking at historical maps of the area', answer: { accepted: ['B'] }, explanation: { text: 'The Archive Room contains old photographs, maps and documents about the local area.', evidence: { quote: 'visit the Archive Room. It contains old photographs, maps and documents' } } },
            { id: 'm4l-q17', number: 17, prompt: 'Trying a simple water-quality test', answer: { accepted: ['C'] }, explanation: { text: 'The water-quality test takes place in the Activity Workshop.', evidence: { quote: 'go to the Activity Workshop. That’s where you’ll be able to try a simple water-quality test' } } },
            { id: 'm4l-q18', number: 18, prompt: 'Listening for wildlife after sunset', answer: { accepted: ['E'] }, explanation: { text: 'The wildlife team helps visitors listen for bats on the Riverside Path.', evidence: { quote: 'we recommend visiting the Riverside Path. A member of our wildlife team will help visitors listen for bats' } } },
            { id: 'm4l-q19', number: 19, prompt: 'Getting a view across the town', answer: { accepted: ['D'] }, explanation: { text: 'The Viewing Deck offers a clear view across the town.', evidence: { quote: 'The Viewing Deck is another popular place. It offers a clear view across the town' } } },
            { id: 'm4l-q20', number: 20, prompt: 'Seeing plants from warmer climates', answer: { accepted: ['A'] }, explanation: { text: 'The Glasshouse is home to plants from warmer parts of the world.', evidence: { quote: 'don’t miss the Glasshouse. It’s home to plants from warmer parts of the world.' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Discussing a project about reusable cups',
      audio: {
        intro: 'Part 3. You will hear two university students, Nora and Ethan, discussing a project about reusable cups. First, you have some time to look at questions 21 to 30.',
        noun: 'discussion',
        ...rec('l3'),
        // Questions 21–25 are answered by line 15; the break comes before the tasks are divided up.
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 16 },
        ],
        script: [
          { speaker: 'Nora', voice: W, accent: 'en-GB', text: "Hey, Ethan! Have you looked at the survey results yet? I've just opened the spreadsheet, and there are more responses than I expected." },
          { speaker: 'Ethan', voice: M, accent: 'en-GB', text: "Yeah, I checked it this morning. We've got eighty-six completed forms now. Not bad for a project we only started three weeks ago." },
          { speaker: 'Nora', voice: W, accent: 'en-GB', text: "Definitely. I think the interesting part is that we're not simply trying to prove reusable cups are better. We want to understand why students don't use them regularly, even though most of them say they support the idea." },
          { speaker: 'Ethan', voice: M, accent: 'en-GB', text: "Exactly. If we only compare cup prices or calculate how much money cafés make, we'd miss the actual problem. The behaviour is what matters." },
          { speaker: 'Nora', voice: W, accent: 'en-GB', text: 'I noticed something about the responses, though. Most of them came from students who visit the cafés around lunchtime. We collected a few in the afternoon, but almost none in the early morning.' },
          { speaker: 'Ethan', voice: M, accent: 'en-GB', text: "That's true. Our first collection session was outside the main café between twelve and two. We should have spread it across the day. People who buy coffee before lectures might behave differently." },
          { speaker: 'Nora', voice: W, accent: 'en-GB', text: "Right. We can't say the sample represents everyone on campus. We should mention that limitation rather than pretending we've got a perfect picture." },
          { speaker: 'Ethan', voice: M, accent: 'en-GB', text: 'Agreed. What about the discount scheme? I thought that would be the strongest finding.' },
          { speaker: 'Nora', voice: W, accent: 'en-GB', text: "I expected that too. But the responses suggest the discount wasn't the main issue. Quite a few students said they liked saving money, but they simply forgot to bring their cups." },
          { speaker: 'Ethan', voice: M, accent: 'en-GB', text: "Yeah, I do that myself. I leave home in a hurry, and my reusable cup is still sitting on the kitchen table. So even a bigger discount might not solve it." },
          { speaker: 'Nora', voice: W, accent: 'en-GB', text: 'Exactly. Maybe reminders near the café entrances would help. Something simple, like a sign before people join the queue.' },
          { speaker: 'Ethan', voice: M, accent: 'en-GB', text: 'That could work. I also wondered whether the university should ban disposable cups immediately.' },
          { speaker: 'Nora', voice: W, accent: 'en-GB', text: "I don't think we can recommend that. Some students buy drinks unexpectedly, and visitors don't necessarily carry reusable cups. A complete ban would be too sudden." },
          { speaker: 'Ethan', voice: M, accent: 'en-GB', text: 'Fair point. We could suggest making reusable cups available to borrow instead. People could return them after use.' },
          { speaker: 'Nora', voice: W, accent: 'en-GB', text: "I like that idea, but we'd need to know whether the cafés have enough washing facilities. Otherwise, it could create another problem." },
          { speaker: 'Ethan', voice: M, accent: 'en-GB', text: "True. We shouldn't assume the cafés can manage a borrowing system without checking. Let's talk to one of the café managers before we make that recommendation." },
          { speaker: 'Nora', voice: W, accent: 'en-GB', text: 'Good idea. We should also collect the transaction figures. The cafés may be able to tell us how many reusable-cup purchases or discounts they’ve recorded over the last month.' },
          { speaker: 'Ethan', voice: M, accent: 'en-GB', text: "I'll take responsibility for that. I can contact the café office and ask whether they can share those figures." },
          { speaker: 'Nora', voice: W, accent: 'en-GB', text: "Great. I'll speak to the manager about washing facilities and whether a cup-return system would be practical." },
          { speaker: 'Ethan', voice: M, accent: 'en-GB', text: 'What should we do with the questionnaire? I think one of the questions is a bit confusing. It asks whether students use reusable cups regularly, but we never explain what "regularly" means.' },
          { speaker: 'Nora', voice: W, accent: 'en-GB', text: 'I noticed that too. Some people might think it means every day, while others might mean once a week. We should rewrite that question together so everyone understands it in the same way.' },
          { speaker: 'Ethan', voice: M, accent: 'en-GB', text: "Yes, let's do that. Once we've got the extra information, I'll prepare the graphs from the survey results. I'm more comfortable working with the spreadsheet." },
          { speaker: 'Nora', voice: W, accent: 'en-GB', text: "Perfect. I'll write the final recommendations. I'll make sure they reflect the evidence rather than just our personal opinions." },
          { speaker: 'Ethan', voice: M, accent: 'en-GB', text: 'Sounds good. And we should both check the final report before submitting it.' },
          { speaker: 'Nora', voice: W, accent: 'en-GB', text: "Absolutely. We don't want to make a big claim based on a small sample." },
          { speaker: 'Ethan', voice: M, accent: 'en-GB', text: "Right. Let's meet again on Thursday after we've spoken to the café staff." },
          { speaker: 'Nora', voice: W, accent: 'en-GB', text: "Thursday works. I'll send you a message if I get any useful information earlier." },
        ],
      },
      groups: [
        {
          id: 'm4l-g5',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm4l-q21',
              number: 21,
              prompt: 'What is the main aim of their project?',
              options: [
                { id: 'A', text: 'To compare the prices of reusable cups' },
                { id: 'B', text: 'To measure how much money campus cafés earn' },
                { id: 'C', text: 'To understand why students do not regularly use reusable cups' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'The project aims to understand why students do not use reusable cups regularly, even though most support the idea.',
                evidence: { quote: "We want to understand why students don't use them regularly" },
                distractors: { A: 'Comparing cup prices would miss the actual problem — the behaviour is what matters.', B: 'Calculating how much money cafés make is explicitly ruled out.' },
              },
            },
            {
              id: 'm4l-q22',
              number: 22,
              prompt: 'What weakness did Nora notice in their first survey?',
              options: [
                { id: 'A', text: 'Most responses came from students who visited at lunchtime.' },
                { id: 'B', text: 'Too many questions were about the price of drinks.' },
                { id: 'C', text: 'The survey included students from other universities.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Most responses came from students who visit the cafés around lunchtime; almost none came from the early morning.',
                evidence: { quote: 'Most of them came from students who visit the cafés around lunchtime.' },
              },
            },
            {
              id: 'm4l-q23',
              number: 23,
              prompt: 'Why do the students think the discount scheme had limited success?',
              options: [
                { id: 'A', text: 'The discount was too small to attract students.' },
                { id: 'B', text: 'Students often forgot to bring their own cups.' },
                { id: 'C', text: 'Café staff did not explain the scheme properly.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Students liked saving money, but they simply forgot to bring their cups — so even a bigger discount might not solve it.',
                evidence: { quote: 'they simply forgot to bring their cups' },
                distractors: { A: 'Ethan says even a bigger discount might not solve the problem.' },
              },
            },
            {
              id: 'm4l-q24',
              number: 24,
              prompt: 'Which proposal do the students decide NOT to recommend?',
              options: [
                { id: 'A', text: 'Placing reminders near café entrances' },
                { id: 'B', text: 'Making reusable cups available to borrow' },
                { id: 'C', text: 'Immediately banning all disposable cups' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'Nora rejects an immediate ban on disposable cups as too sudden; reminders and a borrowing system are both considered positively.',
                evidence: { quote: 'A complete ban would be too sudden.' },
                distractors: { A: 'Reminders near the entrances are suggested as something that could work.', B: 'Making cups available to borrow is suggested, pending a check on washing facilities.' },
              },
            },
            {
              id: 'm4l-q25',
              number: 25,
              prompt: 'What do they decide to do before writing their final recommendations?',
              options: [
                { id: 'A', text: 'Interview some café staff' },
                { id: 'B', text: 'Repeat the entire survey' },
                { id: 'C', text: 'Compare prices at cafés outside the university' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Before recommending a borrowing system, they agree to talk to a café manager about washing facilities.',
                evidence: { quote: "Let's talk to one of the café managers before we make that recommendation." },
              },
            },
          ],
        },
        {
          id: 'm4l-g6',
          type: 'matching',
          instructions: 'Who will be responsible for each task? Choose the correct letter, A, B or C.',
          optionsTitle: 'Responsibility',
          options: [
            { id: 'A', text: 'Nora' },
            { id: 'B', text: 'Ethan' },
            { id: 'C', text: 'Both Nora and Ethan' },
          ],
          questions: [
            { id: 'm4l-q26', number: 26, prompt: 'Collecting figures about reusable-cup transactions', answer: { accepted: ['B'] }, explanation: { text: 'Ethan takes responsibility for collecting the transaction figures from the café office.', evidence: { quote: "I'll take responsibility for that. I can contact the café office" } } },
            { id: 'm4l-q27', number: 27, prompt: 'Speaking to the café manager about washing facilities', answer: { accepted: ['A'] }, explanation: { text: 'Nora will speak to the manager about washing facilities and the cup-return system.', evidence: { quote: "I'll speak to the manager about washing facilities" } } },
            { id: 'm4l-q28', number: 28, prompt: 'Improving the wording of the questionnaire', answer: { accepted: ['C'] }, explanation: { text: 'They agree to rewrite the confusing question together.', evidence: { quote: 'We should rewrite that question together' } } },
            { id: 'm4l-q29', number: 29, prompt: 'Preparing graphs from the survey results', answer: { accepted: ['B'] }, explanation: { text: 'Ethan will prepare the graphs; he is more comfortable with the spreadsheet.', evidence: { quote: "I'll prepare the graphs from the survey results." } } },
            { id: 'm4l-q30', number: 30, prompt: 'Writing the final recommendations', answer: { accepted: ['A'] }, explanation: { text: 'Nora will write the final recommendations.', evidence: { quote: "I'll write the final recommendations." } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Artificial light and nocturnal insects',
      audio: {
        intro: 'Part 4. You will hear a lecture about the effect of artificial light on nocturnal insects. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Professor Helen Morris', voice: W, accent: 'en-GB', text: 'Good morning. Today we’re going to look at the effect of artificial light on nocturnal insects, particularly moths and other species that are active after sunset.' },
          { speaker: 'Professor Helen Morris', voice: W, accent: 'en-GB', text: 'Artificial lighting has become a normal feature of modern life. Streets, buildings, car parks and gardens are illuminated throughout the night. However, when outdoor lighting is excessive or poorly designed, it contributes to a form of environmental pollution known as light pollution.' },
          { speaker: 'Professor Helen Morris', voice: W, accent: 'en-GB', text: 'To understand why this matters, we need to consider how nocturnal insects navigate. Many moths use the moon as a natural reference point. Because the moon is extremely distant, its apparent position changes very little as an insect flies. This helps the insect maintain a relatively straight direction.' },
          { speaker: 'Professor Helen Morris', voice: W, accent: 'en-GB', text: 'Artificial lights create a very different situation. A nearby lamp appears to move across the insect’s field of vision as the insect changes position. This can interfere with its sense of direction. Instead of continuing along its route, a moth may repeatedly turn towards the lamp and begin flying in circles.' },
          { speaker: 'Professor Helen Morris', voice: W, accent: 'en-GB', text: 'The colour of a light also matters. Research suggests that many insects are particularly attracted to shorter wavelengths, especially blue light. This is one reason why some traditional outdoor lamps attract large numbers of insects.' },
          { speaker: 'Professor Helen Morris', voice: W, accent: 'en-GB', text: 'Lighting technology has changed in recent years. Many buildings now use LED lamps, which can be more energy-efficient. However, not all LED lighting has the same effect on wildlife. Lamps with a warmer colour temperature generally attract fewer insects than those producing a strong blue-white light.' },
          { speaker: 'Professor Helen Morris', voice: W, accent: 'en-GB', text: 'The consequences can be serious. Insects that spend long periods circling a lamp may become exhausted. Some may also be injured when they collide with the lamp or nearby structures. Others become easier targets for predators.' },
          { speaker: 'Professor Helen Morris', voice: W, accent: 'en-GB', text: 'There are wider ecological effects as well. Moths and other night-flying insects visit flowers and help transfer pollen between plants. If their numbers decline, the pollination of certain plants may be affected. This is important because pollination supports the reproduction of many wild plant species.' },
          { speaker: 'Professor Helen Morris', voice: W, accent: 'en-GB', text: 'Artificial lighting can also change the behaviour of animals that feed on insects. For example, bats may gather around bright lamps because insects are attracted to the light. Although this may provide an easy food source in the short term, it can increase the risk of predation for insects and alter normal feeding patterns.' },
          { speaker: 'Professor Helen Morris', voice: W, accent: 'en-GB', text: 'Fortunately, there are practical ways to reduce the problem. First, light fittings should be designed to direct light downwards, towards the ground where it is needed, rather than spreading it into the surrounding sky and vegetation.' },
          { speaker: 'Professor Helen Morris', voice: W, accent: 'en-GB', text: 'Second, choosing warmer-coloured lamps can reduce the number of insects attracted to outdoor lighting. Finally, lights should be switched off when they are not needed. In public spaces, timers and motion sensors can help prevent unnecessary lighting throughout the night.' },
          { speaker: 'Professor Helen Morris', voice: W, accent: 'en-GB', text: 'The aim is not to remove artificial lighting completely. People need safe and well-lit streets. Instead, we should use light more carefully, so that human needs and the natural environment can exist together.' },
        ],
      },
      groups: [
        {
          id: 'm4l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write NO MORE THAN TWO WORDS for each answer.',
          wordLimit: { words: 2 },
          template:
            'ARTIFICIAL LIGHT AND NOCTURNAL INSECTS\nWhy artificial lighting matters\n• Excessive outdoor lighting is a form of {{31}}.\nHow insects respond to light\n• Moths normally use the {{32}} as a navigation reference.\n• Artificial lights can interfere with their sense of {{33}}.\n• Insects are particularly attracted to shorter wavelengths, especially {{34}} light.\n• Lamps with a warmer colour can reduce insect {{35}}.\nEffects on the environment\n• Insects that circle lamps for long periods may become {{36}}.\n• A decline in moth numbers can affect the {{37}} of certain plants.\n• Bright lamps may attract {{38}}, which hunt insects near the light.\nPossible solutions\n• Light fittings should be designed to direct light {{39}}.\n• Outdoor lights should be switched off when they are not {{40}}.',
          questions: [
            { id: 'm4l-q31', number: 31, answer: { accepted: ['light pollution'] }, explanation: { text: 'Excessive outdoor lighting contributes to a form of environmental pollution known as light pollution.', evidence: { quote: 'environmental pollution known as light pollution' } } },
            { id: 'm4l-q32', number: 32, answer: { accepted: ['moon'] }, explanation: { text: 'Many moths use the moon as a natural reference point for navigation.', evidence: { quote: 'Many moths use the moon as a natural reference point.' } } },
            { id: 'm4l-q33', number: 33, answer: { accepted: ['direction'] }, explanation: { text: 'A nearby lamp can interfere with a moth’s sense of direction.', evidence: { quote: 'This can interfere with its sense of direction.' } } },
            { id: 'm4l-q34', number: 34, answer: { accepted: ['blue'] }, explanation: { text: 'Insects are particularly attracted to shorter wavelengths, especially blue light.', evidence: { quote: 'especially blue light' } } },
            { id: 'm4l-q35', number: 35, answer: { accepted: ['attraction'] }, explanation: { text: 'Warmer-coloured lamps attract fewer insects, so they reduce insect attraction.', evidence: { quote: 'Lamps with a warmer colour temperature generally attract fewer insects' } } },
            { id: 'm4l-q36', number: 36, answer: { accepted: ['exhausted'] }, explanation: { text: 'Insects that spend long periods circling a lamp may become exhausted.', evidence: { quote: 'Insects that spend long periods circling a lamp may become exhausted.' } } },
            { id: 'm4l-q37', number: 37, answer: { accepted: ['pollination'] }, explanation: { text: 'If moth numbers decline, the pollination of certain plants may be affected.', evidence: { quote: 'the pollination of certain plants may be affected' } } },
            { id: 'm4l-q38', number: 38, answer: { accepted: ['bats'] }, explanation: { text: 'Bats may gather around bright lamps because insects are attracted to the light.', evidence: { quote: 'bats may gather around bright lamps' } } },
            { id: 'm4l-q39', number: 39, answer: { accepted: ['downwards'] }, explanation: { text: 'Light fittings should be designed to direct light downwards, towards the ground.', evidence: { quote: 'light fittings should be designed to direct light downwards' } } },
            { id: 'm4l-q40', number: 40, answer: { accepted: ['needed'] }, explanation: { text: 'Lights should be switched off when they are not needed.', evidence: { quote: 'lights should be switched off when they are not needed' } } },
          ],
        },
      ],
    },
  ],
};
