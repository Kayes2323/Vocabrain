import type { Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Complex Sentences, application lessons in the v2 format: cx-7 the
 * complex-sentence mistakes Bangla speakers make, cx-8 combining sentences
 * for IELTS Writing and Speaking with no hints, and cx-9 the module review
 * test. No lesson concept of their own: every question keeps the concept it
 * tests. Original Mino content.
 */
const X = { tag: 'complex-sentence' as const };

// ======================================================================= cx-7
export const cxMistakes: Lesson = {
  id: 'cx-7',
  format: 'v2',
  title: l('Complex-sentence mistakes Bangla speakers make', 'বাংলাভাষীরা complex sentence-এ যে ভুলগুলো করে'),
  why: l('Most broken complex sentences come from a handful of Bangla habits. Name them, and you can find them in your own Task 2 essays.', 'বেশিরভাগ ভাঙা complex sentence কয়েকটা বাংলা অভ্যাস থেকে আসে। এগুলোর নাম জানলে নিজের Task 2 essay-তে খুঁজে পাবেন।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A student’s Part 2 answer', 'একজন শিক্ষার্থীর Part 2 উত্তর'),
      situation: l('"The teacher who she taught me English, she was very kind. When I will finish my degree, I will visit her. I don’t know where does she live now."', '"The teacher who she taught me English, she was very kind. When I will finish my degree, I will visit her. I don’t know where does she live now."'),
      question: l('How many complex-sentence mistakes are there?', 'এখানে complex sentence-এর কয়টা ভুল আছে?'),
      options: ['4', '2', '3'],
      answer: '4',
      diagnose: {
        '4': l('Right: "who she taught" (extra she) · ", she was" (repeated subject) · "When I will finish" (no will) · "where does she live" (question order).', 'ঠিক: "who she taught" (অতিরিক্ত she) · ", she was" (আবার subject) · "When I will finish" (will না) · "where does she live" (প্রশ্নের order)।'),
        '2': l('Look again at the first sentence: it has TWO extra subjects — "who she" and ", she was". Then "When I will" and "where does she live".', 'প্রথম sentence আবার দেখুন: এতে দুটো অতিরিক্ত subject — "who she" আর ", she was"। তারপর "When I will" আর "where does she live"।'),
        '3': l('Close! The first sentence has two errors: "who she taught" and the repeated ", she was".', 'কাছাকাছি! প্রথম sentence-এ দুটো ভুল: "who she taught" আর আবার আসা ", she was"।'),
      },
    },
    {
      kind: 'discover',
      title: l('Where do these slips come from?', 'এই ভুলগুলো কোথা থেকে আসে?'),
      items: [
        { en: 'যে শিক্ষক আমাকে পড়িয়েছেন, তিনি … → The teacher who taught me was …', note: l('Bangla repeats the subject (তিনি)', 'বাংলায় subject আবার আসে (তিনি)') },
        { en: 'যখন আমি শেষ করব → When I finish', note: l('Bangla future in the when-clause', 'when-clause-এ বাংলার ভবিষ্যৎ') },
        { en: 'জানি না সে কোথায় থাকে → I don’t know where she lives.', note: l('Bangla keeps the same order as the question', 'বাংলায় প্রশ্নের মতোই order থাকে') },
        { en: 'দাম বেশি, মানুষ কম কেনে → Prices are high, so people buy less.', note: l('Bangla joins clauses with a comma', 'বাংলায় comma দিয়ে clause জোড়া হয়') },
      ],
      question: l('What is the common cause?', 'সাধারণ কারণটা কী?'),
      options: [
        l('Translating Bangla clause patterns directly into English', 'বাংলার clause pattern সরাসরি English-এ অনুবাদ করা'),
        l('Using sentences that are too short', 'খুব ছোট sentence ব্যবহার করা'),
        l('Not knowing enough vocabulary', 'যথেষ্ট vocabulary না জানা'),
      ],
      answer: 0,
      pattern: l('Bangla habits: repeated subjects, future in time clauses, question order in statements, comma-joined clauses. Check each complex sentence for these four.', 'বাংলার অভ্যাস: আবার আসা subject, time clause-এ ভবিষ্যৎ, statement-এ প্রশ্নের order, comma দিয়ে জোড়া clause। প্রতিটা complex sentence-এ এই চারটা খুঁজুন।'),
    },
    {
      kind: 'concept',
      title: l('The six habits to watch', 'যে ছয়টা অভ্যাসে খেয়াল রাখবেন'),
      body: l(
        'Almost every complex-sentence error by Bangla speakers belongs to one of these six groups.',
        'বাংলাভাষীদের প্রায় সব complex sentence-এর ভুল এই ছয়টা দলের একটায় পড়ে।',
      ),
      points: [
        l('1. Repeated subject or object: The man who he …, The book that I read it, My brother, he is … → remove the extra pronoun.', '১. আবার আসা subject বা object: The man who he …, The book that I read it, My brother, he is … → অতিরিক্ত pronoun বাদ দিন।'),
        l('2. will / would in time and if-clauses: When I will …, If it will …, If I would have … → present / past.', '২. time আর if-clause-এ will / would: When I will …, If it will …, If I would have … → present / past।'),
        l('3. Question order in statements: I don’t know where is he / what should I do → where he is / what I should do.', '৩. Statement-এ প্রশ্নের order: I don’t know where is he / what should I do → where he is / what I should do।'),
        l('4. Run-ons and fragments: clauses joined by commas; a because- / which-part on its own → join with a linker or split.', '৪. Run-on আর ভাঙা sentence: comma দিয়ে জোড়া clause; একা because- / which-অংশ → linker দিয়ে জোড়ুন বা আলাদা করুন।'),
        l('5. Wrong relative word or comma: which for people, that after a comma, where for things → who, which, that / which.', '৫. ভুল relative word বা comma: মানুষের জন্য which, comma-র পরে that, জিনিসের জন্য where → who, which, that / which।'),
        l('6. Purpose and pairs: for + verb, so that … can to, although … but → to + verb, can + verb, one linker.', '৬. উদ্দেশ্য আর জোড়া: for + verb, so that … can to, although … but → to + verb, can + verb, একটা linker।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Before → after', 'আগে → পরে'),
      items: [
        { en: 'My uncle, he lives in Dubai. → My uncle lives in Dubai.', note: l('habit 1: no repeated subject', 'অভ্যাস ১: subject আবার না') },
        { en: 'If I will get a visa, I will go. → If I get a visa, I will go.', note: l('habit 2: no will after if', 'অভ্যাস ২: if-এর পরে will না') },
        { en: 'Tell me what time is it. → Tell me what time it is.', note: l('habit 3: statement order', 'অভ্যাস ৩: statement order') },
        { en: 'I came here for learn English. → I came here to learn English.', note: l('habit 6: to + verb', 'অভ্যাস ৬: to + verb') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'speaking', example: 'The person who inspired me most was my maths teacher.', note: l('Part 2: no "who he", no ", he was".', 'Part 2: "who he" না, ", he was" না।') },
        { skill: 'writing', example: 'If governments invest in education, crime will fall.', note: l('Task 2: If + present, will.', 'Task 2: If + present, will।') },
        { skill: 'reading', example: 'Scientists still do not know how the stones were moved.', note: l('Reading: indirect questions use statement order.', 'Reading: indirect question-এ statement order।') },
        { skill: 'listening', example: 'Could you tell me what the password is?', note: l('Listening: polite requests with statement order.', 'Listening: statement order-সহ ভদ্র অনুরোধ।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'The students who they failed will retake the test.', right: 'The students who failed will retake the test.', why: l('habit 1: who = the subject.', 'অভ্যাস ১: who = subject।') },
        { wrong: 'As soon as I will arrive, I will text you.', right: 'As soon as I arrive, I will text you.', why: l('habit 2: present after as soon as.', 'অভ্যাস ২: as soon as-এর পরে present।') },
        { wrong: 'Nobody knows why did the bridge collapse.', right: 'Nobody knows why the bridge collapsed.', why: l('habit 3: no did, statement order.', 'অভ্যাস ৩: did না, statement order।') },
        { wrong: 'The city was flooded, many people lost their homes.', right: 'The city was flooded, and many people lost their homes.', why: l('habit 4: join two main clauses properly.', 'অভ্যাস ৪: দুটো মূল clause ঠিকমতো জোড়ুন।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('cx-7-p1', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['The girl who won the prize is my cousin.', 'The girl who she won the prize is my cousin.', 'The girl who won the prize, she is my cousin.'], answer: 'The girl who won the prize is my cousin.', explanation: l('No repeated subject.', 'Subject আবার না।'), why: { 'The girl who she won the prize is my cousin.': l('who is the subject — remove she.', 'who-ই subject — she বাদ দিন।'), 'The girl who won the prize, she is my cousin.': l('"যে মেয়েটা …, সে …" — English doesn’t repeat she.', '"যে মেয়েটা …, সে …" — English-এ she আবার আসে না।') } }),
        choice('cx-7-p2', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'If you ___ early, we can have breakfast together.', options: ['come', 'will come', 'would come'], answer: 'come', explanation: l('If + present for a real future.', 'বাস্তব ভবিষ্যতে If + present।'), why: { 'will come': l('"যদি আপনি আসেন / আসবেন" → no will after if.', '"যদি আসেন" → if-এর পরে will না।'), 'would come': l('would goes in the main clause of imagined situations, never after if.', 'would কল্পিত অবস্থার মূল clause-এ বসে, if-এর পরে কখনো না।') } }),
        choice('cx-7-p3', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('Choose the correct ending.', 'সঠিক শেষটা বেছে নিন।'), sentence: 'I can’t remember ___.', options: ['what her name is', 'what is her name', 'what does her name'], answer: 'what her name is', explanation: l('Statement order: what + subject + verb.', 'Statement order: what + subject + verb।'), why: { 'what is her name': l('That is question order; inside a statement → what her name is.', 'এটা প্রশ্নের order; statement-এর ভেতরে → what her name is।'), 'what does her name': l('No does, and a verb is missing.', 'does না, আর verb বাদ পড়েছে।') } }),
        choice('cx-7-p4', 'cx-clause', { ...X, pattern: 'cx-fragment-runon', prompt: l('Which is correctly joined?', 'কোনটা সঠিকভাবে জোড়া?'), options: ['The price of rice rose, so many families bought less.', 'The price of rice rose, many families bought less.', 'The price of rice rose. Which made many families buy less.'], answer: 'The price of rice rose, so many families bought less.', explanation: l('Two main clauses + , so.', 'দুটো মূল clause + , so।'), why: { 'The price of rice rose, many families bought less.': l('Comma splice: add so / and, or use a full stop.', 'Comma splice: so / and যোগ করুন, বা full stop দিন।'), 'The price of rice rose. Which made many families buy less.': l('"Which made …" alone is a fragment: join it with ", which".', 'একা "Which made …" ভাঙা sentence: ", which" দিয়ে জোড়ুন।') } }),
        choice('cx-7-p5', 'cx-adverbial', { ...X, pattern: 'cx-clause-form', prompt: l('Choose the correct sentence.', 'সঠিক sentence বেছে নিন।'), options: ['My sister went to Dhaka to take the IELTS test.', 'My sister went to Dhaka for take the IELTS test.', 'My sister went to Dhaka for to take the IELTS test.'], answer: 'My sister went to Dhaka to take the IELTS test.', explanation: l('Purpose + verb → to.', 'উদ্দেশ্য + verb → to।'), why: { 'My sister went to Dhaka for take the IELTS test.': l('"দেওয়ার জন্য" → to take, not for take.', '"দেওয়ার জন্য" → to take, for take না।'), 'My sister went to Dhaka for to take the IELTS test.': l('"for to" is not used.', '"for to" ব্যবহার হয় না।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('cx-7-r1', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('Write the correct form of the verb in brackets.', 'বন্ধনীর verb-এর সঠিক form লিখুন।'), sentence: 'I will tell you the news when I ___ (see) you tomorrow.', base: 'see', accepted: ['see'], explanation: l('when + present for the future.', 'ভবিষ্যতের জন্য when + present।'), why: { 'will see': l('No will after when.', 'when-এর পরে will না।') } }),
        gap('cx-7-r2', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('Write who or which.', 'who বা which লিখুন।'), sentence: 'The engineer ___ designed the bridge is from Chattogram.', accepted: ['who', 'that'], explanation: l('A person → who.', 'মানুষ → who।'), why: { which: l('which is for things; an engineer is a person.', 'which জিনিসের জন্য; engineer মানুষ।') } }),
        correct('cx-7-r3', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('Correct the sentence (remove the repeated subject).', 'Sentence-টা ঠিক করুন (আবার আসা subject বাদ দিন)।'), sentence: 'My neighbour who works at the bank, he is very helpful.', accepted: ['My neighbour who works at the bank is very helpful.', 'My neighbour, who works at the bank, is very helpful.'], explanation: l('No repeated he.', 'he আবার না।') }),
        correct('cx-7-r4', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('Correct the word order.', 'Word order ঠিক করুন।'), sentence: 'Please tell me what time does the office open.', accepted: ['Please tell me what time the office opens.'], explanation: l('No does; the office opens.', 'does না; the office opens।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('cx-7-c1', 'cx-clause', { ...X, pattern: 'cx-fragment-runon', prompt: l('Which paragraph has NO complex-sentence mistakes?', 'কোন paragraph-এ complex sentence-এর কোনো ভুল নেই?'), options: ['When I finish school, I want to study law, which my father also studied.', 'When I will finish school, I want to study law, which my father also studied it.', 'When I finish school, I want to study law, my father also studied it.'], answer: 'When I finish school, I want to study law, which my father also studied.', explanation: l('No will after when; which replaces it.', 'when-এর পরে will না; which, it-এর জায়গা নেয়।') }),
        spot('cx-7-c2', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'If I had more free time, I will learn to play the guitar.', wrong: 'will', accepted: ['would'], fixOptions: ['would', 'can', 'shall'], explanation: l('If + past → would.', 'If + past → would।') }),
        order('cx-7-c3', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'I don’t know where she works now.', explanation: l('where + subject + verb.', 'where + subject + verb।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a teacher you remember', 'এবার আপনার পালা: মনে রাখার মতো একজন শিক্ষক'),
      exercises: [
        write('cx-7-y1', 'cx-relative', {
          ...X,
          prompt: l('Speaking Part 2: "Describe a teacher who influenced you." Write 3 sentences using who, when (future) and an indirect question (I don’t know where / whether …).', 'Speaking Part 2: "Describe a teacher who influenced you." who, when (ভবিষ্যৎ) আর একটা indirect question (I don’t know where / whether …) ব্যবহার করে ৩টা sentence লিখুন।'),
          model: 'The teacher who influenced me most was Mr Karim, who taught us physics. When I visit my old school next month, I will try to meet him. I don’t know whether he still teaches there.',
          checklist: [l('who + verb (no extra he / she)', 'who + verb (অতিরিক্ত he / she না)'), l('when + present for the future', 'ভবিষ্যতের জন্য when + present'), l('indirect question in statement order', 'statement order-এ indirect question')],
          explanation: l('Check for the six habits before you finish.', 'শেষ করার আগে ছয়টা অভ্যাস খুঁজুন।'),
          task: 'The student writes 3 sentences about a teacher using a relative clause (who), a future time clause (when) and an indirect question. Check complex sentences only, focusing on the typical Bangla-speaker habits: repeated subjects or objects (who he, that … it, "My teacher, he …"); will / would inside time or if-clauses; question order inside statements (where does he live, what should I do); run-ons, comma splices and stand-alone because- / which-fragments; wrong relative words (which for people, that after a comma); purpose with "for + verb" and "so that … can to"; although … but. For each issue name the habit, quote the words and give the fix.',
          target: l('Catch the six complex-sentence habits', 'Complex sentence-এর ছয়টা অভ্যাস ধরুন'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Don’t repeat the subject: The man who lives … is … (no he).', 'Subject আবার দেবেন না: The man who lives … is … (he না)।'),
        l('No will after when / if · statement order in indirect questions.', 'when / if-এর পরে will না · indirect question-এ statement order।'),
        l('Join clauses properly · to + verb for purpose.', 'Clause ঠিকমতো জোড়ুন · উদ্দেশ্যে to + verb।'),
      ],
    },
  ],
};

// ======================================================================= cx-8
export const cxInIelts: Lesson = {
  id: 'cx-8',
  format: 'v2',
  title: l('Combining sentences for IELTS', 'IELTS-এর জন্য sentence জোড়া'),
  why: l('Grammatical Range and Accuracy rewards a mix of simple and complex sentences that are correct. Practise combining short sentences into accurate complex ones, with no hints.', 'Grammatical Range and Accuracy সঠিক simple আর complex sentence-এর মিশ্রণকে পুরস্কৃত করে। Hint ছাড়া ছোট sentence জুড়ে সঠিক complex sentence বানানোর অভ্যাস করুন।'),
  minutes: 12,
  difficulty: 'hard',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('Three short sentences', 'তিনটা ছোট sentence'),
      situation: l('"The government built a metro. The metro opened in 2022. It has reduced traffic." You want ONE accurate sentence.', '"The government built a metro. The metro opened in 2022. It has reduced traffic." একটা সঠিক sentence চান।'),
      question: l('Which is best?', 'কোনটা সবচেয়ে ভালো?'),
      options: ['The metro, which opened in 2022, has reduced traffic.', 'The metro which it opened in 2022, it has reduced traffic.', 'The metro opened in 2022, it has reduced traffic, the government built it.'],
      answer: 'The metro, which opened in 2022, has reduced traffic.',
      diagnose: {
        'The metro, which opened in 2022, has reduced traffic.': l('Right. A non-defining clause adds the date; the main clause gives the key idea. Accurate and concise.', 'ঠিক। Non-defining clause তারিখ যোগ করে; মূল clause মূল idea দেয়। সঠিক আর সংক্ষিপ্ত।'),
        'The metro which it opened in 2022, it has reduced traffic.': l('Two extra "it"s: which replaces it, and the main clause already has "The metro".', 'দুটো অতিরিক্ত "it": which, it-এর জায়গা নেয়, আর মূল clause-এ আগেই "The metro" আছে।'),
        'The metro opened in 2022, it has reduced traffic, the government built it.': l('A run-on: three main clauses joined by commas.', 'একটা run-on: comma দিয়ে জোড়া তিনটা মূল clause।'),
      },
    },
    {
      kind: 'discover',
      title: l('Five ways to combine', 'জোড়ার পাঁচটা উপায়'),
      items: [
        { en: 'Prices rose. People bought less. → Because prices rose, people bought less.', note: l('reason clause', 'কারণের clause') },
        { en: 'The bridge is new. It is very busy. → The bridge, which is new, is very busy.', note: l('relative clause', 'relative clause') },
        { en: 'I will finish. Then I will call you. → When I finish, I will call you.', note: l('time clause', 'time clause') },
        { en: 'Is the course useful? I’m not sure. → I’m not sure whether the course is useful.', note: l('noun clause', 'noun clause') },
        { en: 'He saved money. He wanted a laptop. → He saved money to buy a laptop.', note: l('purpose', 'উদ্দেশ্য') },
      ],
      question: l('What should you aim for in IELTS Writing?', 'IELTS Writing-এ কী লক্ষ্য রাখবেন?'),
      options: [
        l('A mix of accurate simple and complex sentences — not the longest possible sentences', 'সঠিক simple আর complex sentence-এর মিশ্রণ — সম্ভাব্য সবচেয়ে লম্বা sentence না'),
        l('Only complex sentences, as long as possible', 'শুধু complex sentence, যত লম্বা সম্ভব'),
        l('Only simple sentences, to avoid mistakes', 'ভুল এড়াতে শুধু simple sentence'),
      ],
      answer: 0,
      pattern: l('Combine with a purpose: reason, relative, time, noun or purpose clauses. One or two clauses per sentence is plenty; accuracy decides the band.', 'উদ্দেশ্য নিয়ে জোড়ুন: কারণ, relative, সময়, noun বা উদ্দেশ্যের clause। প্রতি sentence-এ এক-দুটো clause যথেষ্ট; accuracy band ঠিক করে।'),
    },
    {
      kind: 'concept',
      title: l('All the rules on one card', 'সব নিয়ম একটা card-এ'),
      body: l(
        'Everything from this module, in the order to check it when you proofread.',
        'এই module-এর সবকিছু, proofread করার সময় যে ক্রমে যাচাই করবেন।',
      ),
      points: [
        l('1. Every sentence has a main clause; two main clauses need . / ; / , and / , but / , so.', '১. প্রতিটা sentence-এ মূল clause; দুটো মূল clause-এ . / ; / , and / , but / , so।'),
        l('2. Adverbial clauses: because / although + clause; to / so that for purpose; no will after when / if; If + past, would for imagined.', '২. Adverbial clause: because / although + clause; উদ্দেশ্যে to / so that; when / if-এর পরে will না; কল্পিততে If + past, would।'),
        l('3. Relative clauses: who / which / that / whose / where; no repeated pronoun; commas for extra information, never that after a comma.', '৩. Relative clause: who / which / that / whose / where; pronoun আবার না; বাড়তি তথ্যে comma, comma-র পরে কখনো that না।'),
        l('4. Noun clauses: statement order after where / what / if / whether; no do / does / did.', '৪. Noun clause: where / what / if / whether-এর পরে statement order; do / does / did না।'),
        l('Why Bangla speakers slip: long Bangla sentences join many clauses with commas and repeat subjects, so direct translation creates run-ons. Build English complex sentences one clause at a time.', 'বাংলাভাষীরা কেন ভুল করে: লম্বা বাংলা sentence-এ অনেক clause comma দিয়ে জোড়া আর subject আবার আসে, তাই সরাসরি অনুবাদে run-on হয়। English complex sentence এক এক clause করে বানান।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Model sentences', 'Model sentence'),
      items: [
        { en: 'Although online learning is flexible, students who lack discipline may fall behind.', note: l('Task 2: contrast + relative clause', 'Task 2: বিপরীত + relative clause') },
        { en: 'The chart, which covers 2000 to 2020, shows how energy use changed.', note: l('Task 1: non-defining + noun clause', 'Task 1: non-defining + noun clause') },
        { en: 'If the government taxed sugary drinks, people would buy fewer of them.', note: l('Task 2: imagined condition', 'Task 2: কল্পিত শর্ত') },
        { en: 'I moved to Dhaka so that I could study at a better university.', note: l('Speaking: purpose', 'Speaking: উদ্দেশ্য') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Task by task', 'Task অনুযায়ী'),
      uses: [
        { skill: 'writing', example: 'Households that owned a computer rose from 20% to 60%, which reflects falling prices.', note: l('Task 1: defining clause + , which.', 'Task 1: defining clause + , which।') },
        { skill: 'listening', example: 'If you miss the first bus, there’s another one that leaves at nine.', note: l('Listening: if-clause + relative clause — the answer (nine) is in the relative clause.', 'Listening: if-clause + relative clause — উত্তর (nine) relative clause-এ।') },
        { skill: 'speaking', example: 'What I enjoy most about my job is that I meet new people every day.', note: l('Part 1 / 3: noun clauses as subject and complement.', 'Part 1 / 3: subject আর complement হিসেবে noun clause।') },
        { skill: 'reading', example: 'The theory, which was first proposed in 1950, remains controversial.', note: l('Reading: skip the part between commas to find the main clause.', 'Reading: মূল clause পেতে comma-র মাঝের অংশ বাদ দিয়ে পড়ুন।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'The graph shows the number of tourists which they visited the city.', right: 'The graph shows the number of tourists who visited the city.', why: l('People → who; no extra they.', 'মানুষ → who; অতিরিক্ত they না।') },
        { wrong: 'If people will recycle more, there will be less waste.', right: 'If people recycle more, there will be less waste.', why: l('No will after if.', 'if-এর পরে will না।') },
        { wrong: 'It is important that why young people should vote.', right: 'It is important that young people vote. / It is clear why young people should vote.', why: l('One clause word: that OR why.', 'একটা clause word: that অথবা why।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: no hints', 'Practice: কোনো hint নেই'),
      exercises: [
        choice('cx-8-p1', 'cx-relative-comma', { ...X, pattern: 'cx-comma', prompt: l('Combine: "The Sundarbans is a mangrove forest. It is home to tigers."', 'জোড়ুন: "The Sundarbans is a mangrove forest. It is home to tigers."'), options: ['The Sundarbans, which is a mangrove forest, is home to tigers.', 'The Sundarbans that is a mangrove forest it is home to tigers.', 'The Sundarbans is a mangrove forest, it is home to tigers.'], answer: 'The Sundarbans, which is a mangrove forest, is home to tigers.', explanation: l('A name + extra information → , which …,', 'নাম + বাড়তি তথ্য → , which …,'), why: { 'The Sundarbans that is a mangrove forest it is home to tigers.': l('Extra information needs commas and which; and "it" repeats the subject.', 'বাড়তি তথ্যে comma আর which লাগে; আর "it" subject আবার বলে।'), 'The Sundarbans is a mangrove forest, it is home to tigers.': l('Comma splice.', 'Comma splice।') } }),
        choice('cx-8-p2', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('Task 2: choose the correct sentence.', 'Task 2: সঠিক sentence বেছে নিন।'), options: ['If more people cycled, cities would be cleaner.', 'If more people would cycle, cities would be cleaner.', 'If more people cycled, cities will be cleaner.'], answer: 'If more people cycled, cities would be cleaner.', explanation: l('Imagined: If + past, would.', 'কল্পিত: If + past, would।'), why: { 'If more people would cycle, cities would be cleaner.': l('No would in the if-clause.', 'if-clause-এ would না।'), 'If more people cycled, cities will be cleaner.': l('If + past → would, not will.', 'If + past → would, will না।') } }),
        choice('cx-8-p3', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('Task 2: choose the correct sentence.', 'Task 2: সঠিক sentence বেছে নিন।'), options: ['Many people wonder whether social media makes us less happy.', 'Many people wonder does social media make us less happy.', 'Many people wonder that whether social media makes us less happy.'], answer: 'Many people wonder whether social media makes us less happy.', explanation: l('wonder + whether + statement order.', 'wonder + whether + statement order।'), why: { 'Many people wonder does social media make us less happy.': l('Indirect question → whether + statement order (no does).', 'Indirect question → whether + statement order (does না)।'), 'Many people wonder that whether social media makes us less happy.': l('that OR whether, not both.', 'that অথবা whether, দুটো না।') } }),
        choice('cx-8-p4', 'cx-adverbial', { ...X, pattern: 'cx-clause-form', prompt: l('Combine: "Some students take part-time jobs. They want to pay their fees."', 'জোড়ুন: "Some students take part-time jobs. They want to pay their fees."'), options: ['Some students take part-time jobs in order to pay their fees.', 'Some students take part-time jobs for pay their fees.', 'Some students take part-time jobs, they want to pay their fees.'], answer: 'Some students take part-time jobs in order to pay their fees.', explanation: l('Purpose → in order to + base verb.', 'উদ্দেশ্য → in order to + base verb।'), why: { 'Some students take part-time jobs for pay their fees.': l('for + verb is not English; use (in order) to pay.', 'for + verb English না; (in order) to pay দিন।'), 'Some students take part-time jobs, they want to pay their fees.': l('Comma splice.', 'Comma splice।') } }),
        choice('cx-8-p5', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('Task 1: choose the correct sentence.', 'Task 1: সঠিক sentence বেছে নিন।'), options: ['The proportion of people who owned a car doubled.', 'The proportion of people which owned a car doubled.', 'The proportion of people who they owned a car doubled.'], answer: 'The proportion of people who owned a car doubled.', explanation: l('People → who; no extra they.', 'মানুষ → who; অতিরিক্ত they না।'), why: { 'The proportion of people which owned a car doubled.': l('People → who (or that).', 'মানুষ → who (বা that)।'), 'The proportion of people who they owned a car doubled.': l('who is the subject — remove they.', 'who-ই subject — they বাদ দিন।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('cx-8-r1', 'cx-relative-comma', { ...X, pattern: 'cx-comma', prompt: l('Write one relative word (after a comma).', 'একটা relative word লিখুন (comma-র পরে)।'), sentence: 'Unemployment fell sharply, ___ helped the economy recover.', accepted: ['which'], explanation: l(', which = the whole previous idea.', ', which = আগের পুরো idea।'), why: { that: l('Never that after a comma.', 'Comma-র পরে কখনো that না।') } }),
        gap('cx-8-r2', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('Write the correct form of the verb in brackets.', 'বন্ধনীর verb-এর সঠিক form লিখুন।'), sentence: 'Unless the city ___ (build) more housing, rents will keep rising.', base: 'build', accepted: ['builds'], explanation: l('unless + present; the city → builds.', 'unless + present; the city → builds।'), why: { 'will build': l('No will after unless.', 'unless-এর পরে will না।'), build: l('the city = it → builds.', 'the city = it → builds।') } }),
        correct('cx-8-r3', 'cx-clause', { ...X, pattern: 'cx-fragment-runon', prompt: l('Combine into one correct sentence with because.', 'because দিয়ে একটা সঠিক sentence-এ জোড়ুন।'), sentence: 'Many people shop online. It is convenient.', accepted: ['Many people shop online because it is convenient.', 'Because it is convenient, many people shop online.'], explanation: l('main clause + because-clause.', 'মূল clause + because-clause।') }),
        spot('cx-8-r4', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('One word is wrong. Tap it and type the right one.', 'একটা word ভুল। সেটায় tap করে সঠিকটা লিখুন।'), sentence: 'It is unclear that the new law will work or not.', wrong: 'that', accepted: ['whether'], explanation: l('"… or not" → whether.', '"… or not" → whether।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('cx-8-c1', 'cx-clause', { ...X, pattern: 'cx-fragment-runon', prompt: l('Which Task 2 paragraph would score best for Grammatical Range and Accuracy?', 'Grammatical Range and Accuracy-তে কোন Task 2 paragraph সবচেয়ে ভালো score পাবে?'), options: ['Cities are growing fast. If governments do not plan carefully, people who move there may end up in poor housing.', 'Cities are growing fast, if governments will not plan, people which move there they live in bad houses.', 'Cities are growing fast, governments do not plan, people move there, they live in bad houses, this is a problem.'], answer: 'Cities are growing fast. If governments do not plan carefully, people who move there may end up in poor housing.', explanation: l('A simple sentence + an accurate complex one.', 'একটা simple sentence + একটা সঠিক complex sentence।') }),
        spot('cx-8-c2', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('One word breaks this Task 1 sentence. Tap it, then fix it.', 'একটা word Task 1 sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'The country where produced the most rice was China.', wrong: 'where', accepted: ['which', 'that'], fixOptions: ['which', 'who', 'whose'], explanation: l('The country did the action (produced) → which / that, not where.', 'দেশটা কাজটা করেছে (produced) → which / that, where না।') }),
        correct('cx-8-c3', 'cx-relative-comma', { ...X, pattern: 'cx-comma', prompt: l('Combine into one sentence with a non-defining clause.', 'Non-defining clause দিয়ে একটা sentence-এ জোড়ুন।'), sentence: 'My father is a farmer. He grows vegetables.', accepted: ['My father, who is a farmer, grows vegetables.'], explanation: l('Only one father → , who …,', 'বাবা একজনই → , who …,') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a Task 2 paragraph', 'এবার আপনার পালা: একটা Task 2 paragraph'),
      exercises: [
        write('cx-8-y1', 'cx-clause', {
          ...X,
          prompt: l('Task 2: "Should university education be free?" Write 3 sentences with no hints: one simple, one with a relative clause, and one with if or although.', 'Task 2: "Should university education be free?" hint ছাড়া ৩টা sentence লিখুন: একটা simple, একটা relative clause-সহ, আর একটা if বা although-সহ।'),
          model: 'University education is expensive in many countries. Students who come from poor families often cannot afford it. If universities were free, more young people could develop their talents.',
          checklist: [l('every sentence has a main clause; no comma splices', 'প্রতিটা sentence-এ মূল clause; comma splice না'), l('relative clause without a repeated pronoun', 'pronoun আবার ছাড়া relative clause'), l('if / although clause with the right tense', 'সঠিক tense-সহ if / although clause')],
          explanation: l('A mix of accurate simple and complex sentences.', 'সঠিক simple আর complex sentence-এর মিশ্রণ।'),
          task: 'The student writes a 3-sentence Task 2 paragraph about free university education with no hints: one simple sentence, one with a relative clause and one with if or although. Check sentence structure and complex sentences: every sentence has a main clause; no run-ons, comma splices or fragments; relative clauses use who / which / that / whose / where correctly with no repeated pronoun, and commas only for extra information (never that after a comma); no will after if / when, If + past with would for imagined situations; although without but; purpose with to / so that; noun clauses in statement order. Praise an accurate mix of sentence types. For each issue quote the words, name the rule and give the fix.',
          target: l('Accurate complex sentences, no hints', 'সঠিক complex sentence, কোনো hint ছাড়া'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Combine with a purpose; one or two clauses per sentence is enough.', 'উদ্দেশ্য নিয়ে জোড়ুন; প্রতি sentence-এ এক-দুটো clause যথেষ্ট।'),
        l('Proofread: main clause? no repeated pronoun? no will after if / when? statement order?', 'Proofread: মূল clause? pronoun আবার না? if / when-এর পরে will না? statement order?'),
        l('Accuracy decides the band — a correct simple sentence beats a broken long one.', 'Accuracy band ঠিক করে — ভাঙা লম্বা sentence-এর চেয়ে সঠিক simple sentence ভালো।'),
      ],
    },
  ],
};

// ======================================================================= cx-9
export const cxReview: Lesson = {
  id: 'cx-9',
  kind: 'test',
  title: l('Complex sentences review test', 'Complex sentences review test'),
  why: l('Check what you have learned. Your mistakes here decide what Mino suggests you review.', 'কী শিখলেন যাচাই করুন। এখানের ভুল দেখেই Mino ঠিক করবে কী review করতে বলবে।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'grammar',
  steps: [
    {
      kind: 'concept',
      title: l('How this test works', 'এই test কীভাবে চলবে'),
      body: l(
        '12 questions from every lesson in this module. Answers and explanations come at the end, not after each question. Score 80% or more to complete the module; if you score less, Mino will suggest short reviews for the clauses you missed.',
        'এই module-এর সব lesson থেকে ১২টা প্রশ্ন। Answer আর ব্যাখ্যা প্রতিটা প্রশ্নের পরে না, শেষে দেখবেন। ৮০% বা বেশি পেলে module শেষ; কম পেলে যে clause-গুলো ভুল হয়েছে, Mino সেগুলোর ছোট review suggest করবে।',
      ),
    },
    {
      kind: 'practice',
      title: l('Part 1: choose', 'Part 1: বেছে নিন'),
      exercises: [
        choice('cx-9-e1', 'cx-clause', { ...X, pattern: 'cx-fragment-runon', prompt: l('Which is a complete, correct sentence?', 'কোনটা পূর্ণ, সঠিক sentence?'), options: ['I stayed inside because it was very hot.', 'Because it was very hot.', 'It was very hot, I stayed inside.'], answer: 'I stayed inside because it was very hot.', explanation: l('main + because-clause.', 'মূল + because-clause।') }),
        choice('cx-9-e2', 'cx-adverbial', { ...X, pattern: 'cx-clause-form', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'She went to the library ___ return some books.', options: ['to', 'for', 'so that'], answer: 'to', explanation: l('Purpose + verb → to.', 'উদ্দেশ্য + verb → to।') }),
        choice('cx-9-e3', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'When the plane ___, please switch off your phone.', options: ['lands', 'will land', 'would land'], answer: 'lands', explanation: l('when + present for the future.', 'ভবিষ্যতের জন্য when + present।') }),
        choice('cx-9-e4', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('Choose the relative word.', 'Relative word বেছে নিন।'), sentence: 'I met a writer ___ books are read in many countries.', options: ['whose', 'who', 'which'], answer: 'whose', explanation: l('Possession → whose.', 'মালিকানা → whose।') }),
        choice('cx-9-e5', 'cx-relative-comma', { ...X, pattern: 'cx-comma', prompt: l('Which is correctly punctuated?', 'কোনটার punctuation ঠিক?'), options: ['Chattogram, which has a big port, is a busy city.', 'Chattogram which has a big port is a busy city.', 'Chattogram, that has a big port, is a busy city.'], answer: 'Chattogram, which has a big port, is a busy city.', explanation: l('A name + extra information → , which …,', 'নাম + বাড়তি তথ্য → , which …,') }),
        choice('cx-9-e6', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('Choose the correct ending.', 'সঠিক শেষটা বেছে নিন।'), sentence: 'Could you tell me ___?', options: ['how much the ticket costs', 'how much does the ticket cost', 'how much costs the ticket'], answer: 'how much the ticket costs', explanation: l('Statement order, no does.', 'Statement order, does না।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Part 2: write and fix', 'Part 2: লিখুন আর ঠিক করুন'),
      exercises: [
        gap('cx-9-e7', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('Write the correct form of the verb in brackets.', 'বন্ধনীর verb-এর সঠিক form লিখুন।'), sentence: 'If I ___ (be) you, I would apply now.', base: 'be', accepted: ['were', 'was'], explanation: l('Imagined → If I were.', 'কল্পিত → If I were।') }),
        gap('cx-9-e8', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('Write who, which, whose or where.', 'who, which, whose বা where লিখুন।'), sentence: 'This is the hospital ___ I was born.', accepted: ['where'], explanation: l('A place + clause → where.', 'জায়গা + clause → where।') }),
        correct('cx-9-e9', 'cx-relative', { ...X, pattern: 'cx-relative-form', prompt: l('Correct the sentence (remove one word).', 'Sentence-টা ঠিক করুন (একটা word বাদ দিন)।'), sentence: 'The phone that I bought it last week is broken.', accepted: ['The phone that I bought last week is broken.', 'The phone I bought last week is broken.'], explanation: l('that replaces it.', 'that, it-এর জায়গা নেয়।') }),
        correct('cx-9-e10', 'cx-noun-clause', { ...X, pattern: 'cx-word-order', prompt: l('Correct the word order.', 'Word order ঠিক করুন।'), sentence: 'I don’t understand why is the shop closed.', accepted: ['I don’t understand why the shop is closed.', "I don't understand why the shop is closed.", 'I do not understand why the shop is closed.'], explanation: l('why + subject + verb.', 'why + subject + verb।') }),
        correct('cx-9-e11', 'cx-time-if', { ...X, pattern: 'cx-clause-tense', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করুন।'), sentence: 'Wait here until the doctor will arrive.', accepted: ['Wait here until the doctor arrives.'], explanation: l('No will after until: until + present.', 'until-এর পরে will না: until + present।') }),
        correct('cx-9-e12', 'cx-clause', { ...X, pattern: 'cx-fragment-runon', prompt: l('Fix the run-on (one word).', 'Run-on ঠিক করুন (একটা word)।'), sentence: 'The rent is low, the flat is small.', accepted: ['The rent is low, but the flat is small.', 'The rent is low. The flat is small.', 'The rent is low; the flat is small.', 'The rent is low, although the flat is small.', 'The rent is low but the flat is small.'], explanation: l('Two main clauses → , but (or a full stop).', 'দুটো মূল clause → , but (বা full stop)।') }),
      ],
    },
    {
      kind: 'ielts',
      title: l('IELTS connection', 'IELTS-এ কোথায় লাগবে'),
      uses: [
        { skill: 'writing', example: 'If governments invested more in schools, students who live in villages would benefit.', note: l('Task 2: imagined condition + relative clause.', 'Task 2: কল্পিত শর্ত + relative clause।') },
        { skill: 'speaking', example: 'I’m not sure what I’ll do when I finish college.', note: l('Part 1: noun clause + time clause.', 'Part 1: noun clause + time clause।') },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Main clause in every sentence; join main clauses properly.', 'প্রতিটা sentence-এ মূল clause; মূল clause ঠিকমতো জোড়ুন।'),
        l('No will after when / if; to + verb for purpose.', 'when / if-এর পরে will না; উদ্দেশ্যে to + verb।'),
        l('Relative word replaces the pronoun; statement order in indirect questions.', 'Relative word pronoun-এর জায়গা নেয়; indirect question-এ statement order।'),
      ],
    },
  ],
};
