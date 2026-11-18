import type { ObjectiveSection } from '../../model';
import { recorded } from './recorded';

/**
 * Mino Academic Mock Test 6 — Listening. Original content written for Mino in
 * the style and difficulty of the IELTS Listening test (4 parts, 40 questions).
 * Not Cambridge material.
 */

const rec = (partId: string) => recorded('vb-mock-6', partId);

const W = 'female' as const;
const M = 'male' as const;

export const mock6Listening: ObjectiveSection = {
  skill: 'listening',
  timeLimitMinutes: 40,
  parts: [
    // ---------------------------------------------------------------- Part 1
    {
      id: 'l1',
      number: 1,
      title: 'Joining a gym by phone',
      audio: {
        intro: 'Part 1. You will hear a man phoning a leisure centre to join the gym. First, you have some time to look at questions 1 to 6.',
        noun: 'conversation',
        ...rec('l1'),
        // Questions 1–6 are answered by line 14; the break comes before the opening hours are discussed.
        sets: [
          { questions: '1 to 6', fromLine: 0 },
          { questions: '7 to 10', fromLine: 15 },
        ],
        script: [
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Good morning, Riverside Leisure Centre. This is Sarah speaking. How can I help you?" },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "Hello. I'd like to join the gym, please." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Of course. Could I take your name, please?" },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "Yes, it's Alex Morgan." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Could you spell your surname for me, please?" },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "Sure. M, O, R, G, A, N." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Thank you. And what is your date of birth?" },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "The twenty-third of March, nineteen ninety-eight." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "The twenty-third of March, nineteen ninety-eight. And what is your address?" },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "Forty-two Hill Street, Brighton." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Forty-two Hill Street, Brighton. Could I have a telephone number, please?" },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "Yes, it's oh seven nine double one, eight three four, five six two." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Thank you. Now, which membership would you like? We have a monthly membership and an annual membership." },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "I'd like the monthly membership, please." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "The monthly membership costs thirty-five pounds a month." },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "That sounds fine. What time does the gym open?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "The gym opens at six o'clock in the morning and closes at ten o'clock at night." },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "Is there a swimming pool at the leisure centre?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Yes, there is a twenty-five-metre pool, and it is open to gym members all day." },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "That's good. Are there any fitness classes?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Yes, there are classes every day, including yoga on Monday and Wednesday evenings, and a spinning class on Saturday mornings." },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "Do I need to book the classes in advance?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Yes, please book online or at reception at least a day before the class." },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "I see. Is there a car park?" },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "Yes, there is a large car park behind the centre, and parking is free for members." },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "Thank you very much. I'll come in tomorrow to pay and collect my membership card." },
          { speaker: 'Receptionist', voice: W, accent: 'en-GB', text: "You're welcome, Mr Morgan. We look forward to seeing you tomorrow. Goodbye." },
          { speaker: 'Alex', voice: M, accent: 'en-GB', text: "Goodbye." },
        ],
      },
      groups: [
        {
          id: 'm6l-g1',
          type: 'form-completion',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          wordLimit: { words: 1, number: true },
          template:
            'RIVERSIDE LEISURE CENTRE – GYM MEMBERSHIP FORM\nName: Alex {{1}}\nDate of birth: {{2}} March 1998\nAddress: {{3}} Hill Street, Brighton\nTelephone number: {{4}}\nMembership: {{5}}\nMonthly cost: £{{6}}',
          questions: [
            { id: 'm6l-q1', number: 1, answer: { accepted: ['Morgan'] }, explanation: { text: 'The surname is spelled out: M-O-R-G-A-N.', evidence: { quote: 'M, O, R, G, A, N.' } } },
            { id: 'm6l-q2', number: 2, answer: { accepted: ['23', '23rd', 'twenty-third'] }, explanation: { text: 'Alex was born on the twenty-third of March.', evidence: { quote: 'The twenty-third of March, nineteen ninety-eight.' } } },
            { id: 'm6l-q3', number: 3, answer: { accepted: ['42', 'forty-two'] }, explanation: { text: 'Alex lives at forty-two Hill Street.', evidence: { quote: 'Forty-two Hill Street, Brighton.' } } },
            { id: 'm6l-q4', number: 4, answer: { accepted: ['07911834562', '07911 834562'] }, explanation: { text: 'The telephone number is read out digit by digit: 07911 834562.', evidence: { quote: "it's oh seven nine double one, eight three four, five six two." } } },
            { id: 'm6l-q5', number: 5, answer: { accepted: ['monthly'] }, explanation: { text: 'Alex chooses the monthly membership.', evidence: { quote: "I'd like the monthly membership, please." } } },
            { id: 'm6l-q6', number: 6, answer: { accepted: ['35', 'thirty-five'] }, explanation: { text: 'The monthly membership costs thirty-five pounds a month.', evidence: { quote: 'The monthly membership costs thirty-five pounds a month.' } } },
          ],
        },
        {
          id: 'm6l-g2',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm6l-q7',
              number: 7,
              prompt: 'What time does the gym open in the morning?',
              options: [
                { id: 'A', text: 'at five o’clock' },
                { id: 'B', text: 'at six o’clock' },
                { id: 'C', text: 'at seven o’clock' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The gym opens at six o’clock in the morning.',
                evidence: { quote: "The gym opens at six o'clock in the morning" },
              },
            },
            {
              id: 'm6l-q8',
              number: 8,
              prompt: 'How long is the swimming pool?',
              options: [
                { id: 'A', text: 'twenty metres' },
                { id: 'B', text: 'twenty-five metres' },
                { id: 'C', text: 'fifty metres' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'There is a twenty-five-metre pool at the leisure centre.',
                evidence: { quote: 'there is a twenty-five-metre pool' },
              },
            },
            {
              id: 'm6l-q9',
              number: 9,
              prompt: 'On which days is the yoga class held in the evening?',
              options: [
                { id: 'A', text: 'Monday and Wednesday' },
                { id: 'B', text: 'Tuesday and Thursday' },
                { id: 'C', text: 'Saturday and Sunday' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Yoga is held on Monday and Wednesday evenings.',
                evidence: { quote: 'yoga on Monday and Wednesday evenings' },
              },
            },
            {
              id: 'm6l-q10',
              number: 10,
              prompt: 'When should members book a fitness class?',
              options: [
                { id: 'A', text: 'at least a day before the class' },
                { id: 'B', text: 'on the day of the class' },
                { id: 'C', text: 'at least a week before the class' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'Members should book at least a day before the class.',
                evidence: { quote: 'at least a day before the class' },
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
      title: 'Talk about a local farmers’ market',
      audio: {
        intro: 'Part 2. You will hear a woman talking to visitors about a local farmers’ market. First, you have some time to look at questions 11 to 14.',
        noun: 'talk',
        ...rec('l2'),
        // Questions 11–14 are answered by line 4; the break comes before the stalls are described.
        sets: [
          { questions: '11 to 14', fromLine: 0 },
          { questions: '15 to 20', fromLine: 5 },
        ],
        script: [
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "Good morning, everyone, and welcome to the Riverside Farmers' Market. My name is Helen, and I am one of the organisers of the market." },
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "The market first opened in two thousand and eight, and it is now held every Saturday morning in the town square." },
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "There are more than sixty stalls at the market, selling food from farms in the local area." },
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "The market opens at eight o'clock in the morning and closes at one o'clock in the afternoon." },
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "Entry to the market is free, and dogs are welcome, but they must be kept on a lead." },
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "Our first stall is the bread stall, where you can buy bread baked that morning, as well as cakes and biscuits." },
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "Next is the cheese stall, which sells more than thirty kinds of cheese, most of them made on farms within twenty miles of here." },
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "Then there is the vegetable stall, where all the vegetables are grown without chemicals and are picked the day before the market." },
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "After that, you can visit the flower stall, which sells bunches of flowers grown in the gardens of local people." },
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "The honey stall is next, and the beekeeper there will let you taste the different kinds of honey before you buy." },
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "Finally, the market café serves hot drinks and soup, and it uses vegetables from the market in its cooking." },
          { speaker: 'Presenter', voice: W, accent: 'en-AU', text: "That is the end of my talk. If you have any questions, please come and find me at the information stall. Thank you, and enjoy the market." },
        ],
      },
      groups: [
        {
          id: 'm6l-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm6l-q11',
              number: 11,
              prompt: 'When did the farmers’ market first open?',
              options: [
                { id: 'A', text: 'in 1998' },
                { id: 'B', text: 'in 2008' },
                { id: 'C', text: 'in 2018' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The market first opened in two thousand and eight.',
                evidence: { quote: 'The market first opened in two thousand and eight' },
              },
            },
            {
              id: 'm6l-q12',
              number: 12,
              prompt: 'How many stalls are there at the market?',
              options: [
                { id: 'A', text: 'about forty stalls' },
                { id: 'B', text: 'about sixty stalls' },
                { id: 'C', text: 'more than sixty stalls' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'There are more than sixty stalls at the market.',
                evidence: { quote: 'There are more than sixty stalls at the market' },
              },
            },
            {
              id: 'm6l-q13',
              number: 13,
              prompt: 'What time does the market close?',
              options: [
                { id: 'A', text: 'at twelve o’clock' },
                { id: 'B', text: 'at one o’clock' },
                { id: 'C', text: 'at two o’clock' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The market closes at one o’clock in the afternoon.',
                evidence: { quote: "closes at one o'clock in the afternoon" },
              },
            },
            {
              id: 'm6l-q14',
              number: 14,
              prompt: 'What is said about dogs at the market?',
              options: [
                { id: 'A', text: 'Dogs are not allowed.' },
                { id: 'B', text: 'Dogs are welcome, but they must be kept on a lead.' },
                { id: 'C', text: 'Dogs must stay outside the market.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Dogs are welcome, but they must be kept on a lead.',
                evidence: { quote: 'dogs are welcome, but they must be kept on a lead' },
              },
            },
          ],
        },
        {
          id: 'm6l-g4',
          type: 'matching',
          instructions: 'What is said about each of the following places at the market? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 15–20.',
          optionsTitle: 'Features',
          options: [
            { id: 'A', text: 'It sells bread baked that morning.' },
            { id: 'B', text: 'It sells more than thirty kinds of cheese.' },
            { id: 'C', text: 'The vegetables are grown without chemicals.' },
            { id: 'D', text: 'It sells flowers grown in local gardens.' },
            { id: 'E', text: 'Visitors can taste the honey before they buy.' },
            { id: 'F', text: 'It uses vegetables from the market in its cooking.' },
            { id: 'G', text: 'It sells meat from local farms.' },
            { id: 'H', text: 'It is open on Sundays as well.' },
          ],
          questions: [
            { id: 'm6l-q15', number: 15, prompt: 'Bread stall', answer: { accepted: ['A'] }, explanation: { text: 'The bread stall sells bread baked that morning.', evidence: { quote: 'bread baked that morning' } } },
            { id: 'm6l-q16', number: 16, prompt: 'Cheese stall', answer: { accepted: ['B'] }, explanation: { text: 'The cheese stall sells more than thirty kinds of cheese.', evidence: { quote: 'sells more than thirty kinds of cheese' } } },
            { id: 'm6l-q17', number: 17, prompt: 'Vegetable stall', answer: { accepted: ['C'] }, explanation: { text: 'The vegetables at the vegetable stall are grown without chemicals.', evidence: { quote: 'the vegetables are grown without chemicals' } } },
            { id: 'm6l-q18', number: 18, prompt: 'Flower stall', answer: { accepted: ['D'] }, explanation: { text: 'The flower stall sells bunches of flowers grown in the gardens of local people.', evidence: { quote: 'grown in the gardens of local people' } } },
            { id: 'm6l-q19', number: 19, prompt: 'Honey stall', answer: { accepted: ['E'] }, explanation: { text: 'The beekeeper will let visitors taste the different kinds of honey before they buy.', evidence: { quote: 'will let you taste the different kinds of honey before you buy' } } },
            { id: 'm6l-q20', number: 20, prompt: 'Market café', answer: { accepted: ['F'] }, explanation: { text: 'The market café uses vegetables from the market in its cooking.', evidence: { quote: 'it uses vegetables from the market in its cooking' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 3
    {
      id: 'l3',
      number: 3,
      title: 'Two students planning a charity event',
      audio: {
        intro: 'Part 3. You will hear two students, Sophie and Ben, planning a charity event. First, you have some time to look at questions 21 to 25.',
        noun: 'discussion',
        ...rec('l3'),
        // Questions 21–25 are answered by line 10; the break comes before the publicity plans are discussed.
        sets: [
          { questions: '21 to 25', fromLine: 0 },
          { questions: '26 to 30', fromLine: 11 },
        ],
        script: [
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Hi, Ben. Shall we start planning the charity event for next month? We need to raise money for the children's hospital." },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "Good idea. First, what kind of event should we organise? I think a concert would be popular." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "A concert sounds good, but it would be expensive to organise. What about a sponsored walk instead?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "A sponsored walk is a good idea. It would be cheaper, and lots of people could take part." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Where should the walk start? I think we should start at the park and finish at the town hall." },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "That sounds good. The walk would be about five miles long, so most people could finish it in two hours." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "When should we hold the event? I think Saturday the twelfth of October would be a good day." },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "Saturday the twelfth of October. What time should the walk start?" },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "I think we should start at ten o'clock in the morning." },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "Ten o'clock. And how much money do we hope to raise?" },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Our target is two thousand pounds. If fifty people take part, and each person raises forty pounds, we will reach it." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Now, how shall we tell people about the event? I think we should put posters up around the college." },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "Good idea. Posters are cheap, and we could also ask the local newspaper to write about the event." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "What about food and drink? I think we should sell cakes and hot drinks at the town hall when the walk finishes." },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "Yes, and I'll ask the college café if they can lend us some tables and chairs for the day." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "Perfect. And who will collect the money from the walkers?" },
          { speaker: 'Ben', voice: M, accent: 'en-GB', text: "You can collect the money, and I'll count it and take it to the bank, if that's OK." },
          { speaker: 'Sophie', voice: W, accent: 'en-GB', text: "That sounds fair. Let's meet again on Wednesday to check how many people have signed up." },
        ],
      },
      groups: [
        {
          id: 'm6l-g5',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B or C.',
          questions: [
            {
              id: 'm6l-q21',
              number: 21,
              prompt: 'What kind of charity event will the students organise?',
              options: [
                { id: 'A', text: 'a concert' },
                { id: 'B', text: 'a sponsored walk' },
                { id: 'C', text: 'a football match' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The students decide on a sponsored walk instead of a concert.',
                evidence: { quote: 'What about a sponsored walk instead?' },
              },
            },
            {
              id: 'm6l-q22',
              number: 22,
              prompt: 'How long will the walk be?',
              options: [
                { id: 'A', text: 'about three miles' },
                { id: 'B', text: 'about five miles' },
                { id: 'C', text: 'about ten miles' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The walk would be about five miles long.',
                evidence: { quote: 'The walk would be about five miles long' },
              },
            },
            {
              id: 'm6l-q23',
              number: 23,
              prompt: 'On which day will the event be held?',
              options: [
                { id: 'A', text: 'Saturday the twelfth of October' },
                { id: 'B', text: 'Sunday the twelfth of October' },
                { id: 'C', text: 'Saturday the nineteenth of October' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The event will be held on Saturday the twelfth of October.',
                evidence: { quote: 'Saturday the twelfth of October would be a good day' },
              },
            },
            {
              id: 'm6l-q24',
              number: 24,
              prompt: 'What time will the walk start?',
              options: [
                { id: 'A', text: 'at nine o’clock in the morning' },
                { id: 'B', text: 'at ten o’clock in the morning' },
                { id: 'C', text: 'at eleven o’clock in the morning' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The walk will start at ten o’clock in the morning.',
                evidence: { quote: "we should start at ten o'clock in the morning" },
              },
            },
            {
              id: 'm6l-q25',
              number: 25,
              prompt: 'How much money do the students hope to raise?',
              options: [
                { id: 'A', text: 'one thousand pounds' },
                { id: 'B', text: 'two thousand pounds' },
                { id: 'C', text: 'five thousand pounds' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The students’ target is two thousand pounds.',
                evidence: { quote: 'Our target is two thousand pounds.' },
              },
            },
          ],
        },
        {
          id: 'm6l-g6',
          type: 'matching',
          instructions: 'What was agreed about each part of the charity event? Choose FIVE answers from the box and write the correct letter, A–F, next to Questions 26–30.',
          optionsTitle: 'Decisions',
          options: [
            { id: 'A', text: 'They will put posters up around the college.' },
            { id: 'B', text: 'They will ask the local newspaper to write about the event.' },
            { id: 'C', text: 'They will sell cakes and hot drinks at the town hall.' },
            { id: 'D', text: 'Ben will ask the college café to lend tables and chairs.' },
            { id: 'E', text: 'Sophie will collect the money and Ben will take it to the bank.' },
            { id: 'F', text: 'They will hire a band to play at the town hall.' },
          ],
          questions: [
            { id: 'm6l-q26', number: 26, prompt: 'publicity', answer: { accepted: ['A'] }, explanation: { text: 'They will put posters up around the college.', evidence: { quote: 'we should put posters up around the college' } } },
            { id: 'm6l-q27', number: 27, prompt: 'newspaper', answer: { accepted: ['B'] }, explanation: { text: 'They will ask the local newspaper to write about the event.', evidence: { quote: 'we could also ask the local newspaper to write about the event' } } },
            { id: 'm6l-q28', number: 28, prompt: 'food and drink', answer: { accepted: ['C'] }, explanation: { text: 'They will sell cakes and hot drinks at the town hall when the walk finishes.', evidence: { quote: 'we should sell cakes and hot drinks at the town hall' } } },
            { id: 'm6l-q29', number: 29, prompt: 'tables and chairs', answer: { accepted: ['D'] }, explanation: { text: 'Ben will ask the college café to lend tables and chairs for the day.', evidence: { quote: "I'll ask the college café if they can lend us some tables and chairs" } } },
            { id: 'm6l-q30', number: 30, prompt: 'money', answer: { accepted: ['E'] }, explanation: { text: 'Sophie will collect the money, and Ben will count it and take it to the bank.', evidence: { quote: 'You can collect the money' } } },
          ],
        },
      ],
    },

    // ---------------------------------------------------------------- Part 4
    {
      id: 'l4',
      number: 4,
      title: 'Lecture: volcanoes',
      audio: {
        intro: 'Part 4. You will hear a lecture about volcanoes. First, you have some time to look at questions 31 to 40.',
        noun: 'lecture',
        ...rec('l4'),
        sets: [{ questions: '31 to 40', fromLine: 0 }],
        script: [
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Good morning. Today I'm going to talk about volcanoes — what they are, why they erupt, and what happens when they do." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "A volcano is a mountain with an opening in the top, called a crater, through which hot rock, ash and gas can escape from inside the Earth." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Under the Earth's crust, rock is so hot that it melts and forms a thick liquid called magma. When the pressure becomes too great, the magma rises to the surface." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "When magma reaches the surface, it is called lava. Lava can be as hot as one thousand two hundred degrees, and it flows slowly down the sides of the volcano." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "The most famous eruption in history took place in the year seventy-nine, when Mount Vesuvius erupted in Italy and buried the Roman town of Pompeii under ash." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "More than two thousand years later, archaeologists are still digging in Pompeii, and they have found houses, shops and streets that were buried in a single day." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Volcanoes are not only dangerous. The ash from an eruption can make the soil around a volcano very fertile, so farmers often grow crops on the sides of old volcanoes." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Volcanic ash can also affect the whole world. In eighteen fifteen, the eruption of Mount Tambora in Indonesia threw so much ash into the air that the following year became known as the year without a summer." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "Today, scientists watch volcanoes with instruments that measure small earthquakes and changes in the shape of the mountain, so that people can be warned before an eruption." },
          { speaker: 'Lecturer', voice: M, accent: 'en-GB', text: "In the future, scientists hope to predict eruptions more accurately, so that fewer lives are lost when volcanoes erupt. That brings us to the end of the lecture." },
        ],
      },
      groups: [
        {
          id: 'm6l-g7',
          type: 'note-completion',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          wordLimit: { words: 1 },
          template:
            'VOLCANOES\nWhat is a volcano?\n• a volcano has an opening in the top, called a {{31}}\n• hot rock under the Earth’s crust melts and forms {{32}}\n• when magma reaches the surface, it is called {{33}}\n• lava can be as hot as {{34}} degrees\nFamous eruptions\n• Mount Vesuvius erupted in the year {{35}}\n• the eruption buried the Roman town of {{36}}\n• ash from an eruption can make the soil very {{37}}\n• in {{38}}, Mount Tambora erupted in Indonesia\nWatching volcanoes\n• scientists measure small {{39}}\n• scientists hope to predict eruptions more accurately, so that fewer {{40}} are lost',
          questions: [
            { id: 'm6l-q31', number: 31, answer: { accepted: ['crater'] }, explanation: { text: 'A volcano has an opening in the top, called a crater.', evidence: { quote: 'called a crater' } } },
            { id: 'm6l-q32', number: 32, answer: { accepted: ['magma'] }, explanation: { text: 'Hot rock melts and forms a thick liquid called magma.', evidence: { quote: 'forms a thick liquid called magma' } } },
            { id: 'm6l-q33', number: 33, answer: { accepted: ['lava'] }, explanation: { text: 'When magma reaches the surface, it is called lava.', evidence: { quote: 'it is called lava' } } },
            { id: 'm6l-q34', number: 34, answer: { accepted: ['1200'] }, explanation: { text: 'Lava can be as hot as one thousand two hundred degrees.', evidence: { quote: 'as hot as one thousand two hundred degrees' } } },
            { id: 'm6l-q35', number: 35, answer: { accepted: ['79'] }, explanation: { text: 'Mount Vesuvius erupted in the year seventy-nine.', evidence: { quote: 'in the year seventy-nine' } } },
            { id: 'm6l-q36', number: 36, answer: { accepted: ['Pompeii'] }, explanation: { text: 'The eruption buried the Roman town of Pompeii under ash.', evidence: { quote: 'buried the Roman town of Pompeii' } } },
            { id: 'm6l-q37', number: 37, answer: { accepted: ['fertile'] }, explanation: { text: 'Ash from an eruption can make the soil around a volcano very fertile.', evidence: { quote: 'can make the soil around a volcano very fertile' } } },
            { id: 'm6l-q38', number: 38, answer: { accepted: ['1815'] }, explanation: { text: 'Mount Tambora erupted in eighteen fifteen.', evidence: { quote: 'In eighteen fifteen, the eruption of Mount Tambora' } } },
            { id: 'm6l-q39', number: 39, answer: { accepted: ['earthquakes'] }, explanation: { text: 'Scientists measure small earthquakes.', evidence: { quote: 'measure small earthquakes' } } },
            { id: 'm6l-q40', number: 40, answer: { accepted: ['lives'] }, explanation: { text: 'Scientists hope to predict eruptions more accurately, so that fewer lives are lost.', evidence: { quote: 'fewer lives are lost' } } },
          ],
        },
      ],
    },
  ],
};
