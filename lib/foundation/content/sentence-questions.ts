import type { Concept, Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Statements, negatives and questions (English Foundation, after Subject + Verb
 * + Object): turning one sentence into its negative and its question with be,
 * do/does and can — the three patterns every Speaking Part 1 answer and every
 * Writing sentence relies on. Original Mino content.
 */

export const SENTENCE_QUESTION_CONCEPTS: Concept[] = [
  { id: 'sb-questions', title: l('Statements, negatives and questions', 'Statement, negative আর প্রশ্ন'), lessonId: 'sb-10', tag: 'sentence-structure' },
];

const C = 'sb-questions';
const P = { tag: 'sentence-structure' as const };

export const sbQuestions: Lesson = {
  id: 'sb-10',
  format: 'v2',
  concept: C,
  title: l('Statements, negatives and questions', 'Statement, negative আর প্রশ্ন'),
  why: l(
    'Every Speaking Part 1 question is a question you must understand, and every answer is a statement or a negative. One sentence, three shapes: "She works." "She doesn’t work." "Does she work?"',
    'Speaking Part 1-এর প্রতিটা প্রশ্ন আপনাকে বুঝতে হয়, আর প্রতিটা উত্তর একটা statement বা negative। একটাই sentence, তিনটা রূপ: "She works." "She doesn’t work." "Does she work?"',
  ),
  minutes: 8,
  difficulty: 'easy',
  skill: 'grammar',
  steps: [
    {
      kind: 'concept',
      title: l('One sentence, three shapes', 'একটা sentence, তিনটা রূপ'),
      body: l(
        'A statement says something is true. A negative says it is not true. A question asks. English makes negatives and questions with a helping word: be (am, is, are), do / does, or a modal like can.',
        'Statement বলে কিছু সত্য। Negative বলে সেটা সত্য না। প্রশ্ন জানতে চায়। English-এ negative আর প্রশ্ন বানাতে একটা helping word লাগে: be (am, is, are), do / does, অথবা can-এর মতো modal।',
      ),
      points: [
        l('With be: add not after be for a negative (She is not ready). Put be before the subject for a question (Is she ready?).', 'be থাকলে: negative-এর জন্য be-এর পরে not (She is not ready)। প্রশ্নের জন্য be যায় subject-এর আগে (Is she ready?)।'),
        l('With other verbs: use do / does. Negative: She does not work. Question: Does she work? After do / does the main verb has no -s.', 'অন্য verb থাকলে: do / does লাগে। Negative: She does not work। প্রশ্ন: Does she work? do / does-এর পরে main verb-এ -s থাকে না।'),
        l('With can (and other modals): can not → cannot / can’t; question: Can you swim? No do / does here.', 'can (আর অন্য modal) থাকলে: cannot / can’t; প্রশ্ন: Can you swim? এখানে do / does লাগে না।'),
        l('Wh-questions put the question word first: Where do you live? What does your father do? Why is it important?', 'Wh-প্রশ্নে question word সবার আগে: Where do you live? What does your father do? Why is it important?'),
      ],
    },
    {
      kind: 'examples',
      title: l('The same idea, three ways', 'একই idea, তিনভাবে'),
      items: [
        { en: 'I live in Dhaka. → I don’t live in Dhaka. → Do you live in Dhaka?', note: l('do + base verb', 'do + মূল verb') },
        { en: 'My sister works in a bank. → She doesn’t work in a bank. → Does she work in a bank?', note: l('works → does … work (the -s moves to does)', 'works → does … work (-s চলে যায় does-এ)') },
        { en: 'The city is crowded. → It isn’t crowded. → Is the city crowded?', note: l('be moves before the subject', 'be চলে যায় subject-এর আগে') },
        { en: 'He can cook. → He can’t cook. → Can he cook?', note: l('modal: no do / does', 'modal: do / does লাগে না') },
        { en: 'Where do you study? What does your brother do?', note: l('question word + do / does + subject + verb', 'question word + do / does + subject + verb') },
      ],
    },
    {
      kind: 'discover',
      title: l('Spot the helper', 'Helper-টা খুঁজুন'),
      items: [
        { en: 'Is your hometown big?', note: l('be first', 'আগে be') },
        { en: 'Does your family live near you?', note: l('does + base verb', 'does + মূল verb') },
        { en: 'Can you play any instruments?', note: l('modal first', 'আগে modal') },
      ],
      question: l('What do all three questions have in common?', 'তিনটা প্রশ্নেই কী মিল?'),
      options: [
        l('A helping word comes before the subject', 'Subject-এর আগে একটা helping word বসে'),
        l('The main verb comes first', 'Main verb সবার আগে বসে'),
        l('They all use "do"', 'সবগুলোতে "do" আছে'),
      ],
      answer: 0,
      pattern: l('Question = helping word (be / do / does / can) + subject + the rest. Negative = subject + helping word + not + the rest.', 'প্রশ্ন = helping word (be / do / does / can) + subject + বাকি অংশ। Negative = subject + helping word + not + বাকি অংশ।'),
    },
    {
      kind: 'ielts',
      title: l('Where this matters in IELTS', 'IELTS-এ কোথায় কাজে লাগে'),
      uses: [
        { skill: 'speaking', example: 'Examiner: "Do you work or are you a student?" → "I’m a student. I don’t work yet."', note: l('Part 1 questions use do and be; answer with the same helper.', 'Part 1-এর প্রশ্নে do আর be থাকে; একই helper দিয়ে উত্তর দিন।') },
        { skill: 'writing', example: 'Many people do not have access to clean water.', note: l('In Task 2, write "do not / does not" in full.', 'Task 2-এ "do not / does not" পুরোটা লিখুন।') },
        { skill: 'listening', example: '"Does the course include accommodation?" "No, it doesn’t."', note: l('Short answers with the helper often carry the answer.', 'Helper দিয়ে ছোট উত্তরেই প্রায়ই আসল উত্তর থাকে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common mistakes', 'Common ভুল'),
      items: [
        { wrong: 'She don’t like tea.', right: 'She doesn’t like tea.', why: l('he / she / it → does / doesn’t.', 'he / she / it → does / doesn’t।') },
        { wrong: 'Does he works here?', right: 'Does he work here?', why: l('After does, the main verb has no -s.', 'does-এর পরে main verb-এ -s থাকে না।') },
        { wrong: 'You are from Sylhet?', right: 'Are you from Sylhet?', why: l('In a question, be comes before the subject.', 'প্রশ্নে be বসে subject-এর আগে।') },
        { wrong: 'Where you live?', right: 'Where do you live?', why: l('A wh-question still needs do / does.', 'Wh-প্রশ্নেও do / does লাগে।') },
      ],
    },
    {
      kind: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('sb-10-p1', C, { ...P, prompt: l('Choose the negative.', 'Negative-টা বেছে নিন।'), sentence: 'He plays cricket.', options: ['He doesn’t play cricket.', 'He don’t play cricket.', 'He doesn’t plays cricket.'], answer: 'He doesn’t play cricket.', explanation: l('he → doesn’t + base verb.', 'he → doesn’t + মূল verb।'), why: { 'He don’t play cricket.': l('With he / she / it use doesn’t.', 'he / she / it-এর সাথে doesn’t।'), 'He doesn’t plays cricket.': l('After doesn’t, no -s.', 'doesn’t-এর পরে -s নেই।') } }),
        choice('sb-10-p2', C, { ...P, prompt: l('Choose the correct question.', 'সঠিক প্রশ্নটা বেছে নিন।'), options: ['Is your city expensive?', 'Your city is expensive?', 'Does your city is expensive?'], answer: 'Is your city expensive?', explanation: l('be + subject: Is your city …?', 'be + subject: Is your city …?'), why: { 'Your city is expensive?': l('In a written question, be comes before the subject.', 'লেখা প্রশ্নে be বসে subject-এর আগে।'), 'Does your city is expensive?': l('Do not use does with be.', 'be-এর সাথে does বসে না।') } }),
        choice('sb-10-p3', C, { ...P, prompt: l('Choose the right helper.', 'ঠিক helper-টা বেছে নিন।'), sentence: '______ your parents live with you?', options: ['Do', 'Does', 'Are'], answer: 'Do', explanation: l('parents = they → Do.', 'parents = they → Do।'), why: { Does: l('Does is for he / she / it.', 'Does হলো he / she / it-এর জন্য।'), Are: l('"live" is a main verb, so we need do, not be.', '"live" একটা main verb, তাই be না, do লাগে।') } }),
        choice('sb-10-p4', C, { ...P, prompt: l('Choose the correct wh-question.', 'সঠিক wh-প্রশ্নটা বেছে নিন।'), options: ['What do you do in your free time?', 'What you do in your free time?', 'What does you do in your free time?'], answer: 'What do you do in your free time?', explanation: l('question word + do + you + base verb.', 'question word + do + you + মূল verb।'), why: { 'What you do in your free time?': l('The helper do is missing.', 'Helper do বাদ পড়েছে।'), 'What does you do in your free time?': l('you → do, not does.', 'you → do, does না।') } }),
        choice('sb-10-p5', C, { ...P, prompt: l('Choose the negative.', 'Negative-টা বেছে নিন।'), sentence: 'I can drive.', options: ['I can’t drive.', 'I don’t can drive.', 'I can not to drive.'], answer: 'I can’t drive.', explanation: l('Modal + not: can’t / cannot.', 'Modal + not: can’t / cannot।'), why: { 'I don’t can drive.': l('No do with modals.', 'Modal-এর সাথে do বসে না।'), 'I can not to drive.': l('No "to" after can.', 'can-এর পরে "to" বসে না।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Now without options', 'এবার option ছাড়া'),
      exercises: [
        gap('sb-10-r1', C, { ...P, prompt: l('Write the missing helper.', 'বাদ পড়া helper লিখুন।'), sentence: '___ your brother study at university?', accepted: ['Does'], explanation: l('your brother = he → Does.', 'your brother = he → Does।'), why: { do: l('He / she / it → does.', 'He / she / it → does।') } }),
        gap('sb-10-r2', C, { ...P, prompt: l('Make it negative (one word, short form).', 'Negative করুন (একটা word, ছোট রূপ)।'), sentence: 'My hometown ___ very big.', accepted: ['isn’t', "isn't", 'is not'], explanation: l('be + not: isn’t.', 'be + not: isn’t।') }),
        spot('sb-10-r3', C, { ...P, sentence: 'Does your sister likes cooking?', wrong: 'likes', accepted: ['like'], explanation: l('Does + base verb: like.', 'Does + মূল verb: like।') }),
        correct('sb-10-r4', C, { ...P, prompt: l('Correct the question.', 'প্রশ্নটা ঠিক করুন।'), sentence: 'Where you work?', accepted: ['Where do you work?'], explanation: l('Where + do + you + work.', 'Where + do + you + work।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        order('sb-10-c1', C, { ...P, prompt: l('Build the question.', 'প্রশ্নটা সাজান।'), answer: 'Does your family live in Dhaka?', explanation: l('Does + subject + base verb.', 'Does + subject + মূল verb।') }),
        spot('sb-10-c2', C, { ...P, sentence: 'Many students does not have a quiet place to study.', wrong: 'does', accepted: ['do'], fixOptions: ['do', 'is', 'are'], explanation: l('students = they → do not.', 'students = they → do not।') }),
        choice('sb-10-c3', C, { ...P, prompt: l('Examiner: "Do you enjoy cooking?" Choose the best short answer.', 'Examiner: "Do you enjoy cooking?" সবচেয়ে ভালো ছোট উত্তর বেছে নিন।'), options: ['Yes, I do. I cook most weekends.', 'Yes, I am. I cook most weekends.', 'Yes, I enjoy. I cook most weekends.'], answer: 'Yes, I do. I cook most weekends.', explanation: l('Answer with the same helper: Do you …? → Yes, I do.', 'একই helper দিয়ে উত্তর: Do you …? → Yes, I do।'), why: { 'Yes, I am. I cook most weekends.': l('The question used do, not be.', 'প্রশ্নে be না, do ছিল।'), 'Yes, I enjoy. I cook most weekends.': l('"enjoy" needs an object; the short answer is "Yes, I do."', '"enjoy"-এর পরে object লাগে; ছোট উত্তর "Yes, I do."') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Use it yourself', 'নিজে ব্যবহার করুন'),
      exercises: [
        write('sb-10-y1', C, {
          ...P,
          prompt: l('Answer this Speaking Part 1 question in 2–3 sentences, with one negative: "Do you work or are you a student?"', 'এই Speaking Part 1 প্রশ্নের উত্তর ২–৩টা sentence-এ দিন, একটা negative সহ: "Do you work or are you a student?"'),
          model: 'I’m a student. I study accounting at a college in Chattogram. I don’t have a job yet, but I help at my uncle’s shop on Fridays.',
          task: 'The student answers "Do you work or are you a student?" in 2–3 sentences with at least one negative. Check be and do/does in statements and negatives (am/is/are not; don\'t/doesn\'t + base verb), the base verb after do/does, and word order. Praise a clear short answer.',
          target: l('Statements and negatives with be and do', 'be আর do দিয়ে statement আর negative'),
          checklist: [l('A short, direct answer first', 'প্রথমে একটা ছোট, সরাসরি উত্তর'), l('One negative: don’t / doesn’t / am not', 'একটা negative: don’t / doesn’t / am not'), l('Base verb after do / does', 'do / does-এর পরে মূল verb')],
          explanation: l('I’m a student … I don’t have a job yet.', 'I’m a student … I don’t have a job yet.'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('be: She is ready. → She isn’t ready. → Is she ready?', 'be: She is ready. → She isn’t ready. → Is she ready?'),
        l('Other verbs: She works. → She doesn’t work. → Does she work? (no -s after does)', 'অন্য verb: She works. → She doesn’t work. → Does she work? (does-এর পরে -s নেই)'),
        l('Modals: He can cook. → He can’t cook. → Can he cook?', 'Modal: He can cook. → He can’t cook. → Can he cook?'),
      ],
    },
  ],
};
