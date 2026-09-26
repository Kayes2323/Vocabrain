import type { Exercise, L, Lesson } from '../model';

/** Tenses module: the review test (t-12). Lessons 3–11 are v2 in tenses-core.ts and tenses-apply.ts. Original Vocab Brain content. */

const l = (en: string, bn: string): L => ({ en, bn });
const practice = (exercises: Exercise[], title = l('Practice', 'Practice')) => ({ kind: 'practice' as const, title, exercises });
const recall = (...points: L[]) => ({ kind: 'recall' as const, title: l('Remember', 'মনে রাখো'), points });
const ielts = (uses: Extract<Lesson['steps'][number], { kind: 'ielts' }>['uses']) => ({
  kind: 'ielts' as const,
  title: l('IELTS connection', 'IELTS-এ কোথায় লাগবে'),
  uses,
});

export const tensesLessons2: Lesson[] = [
  // ------------------------------------------------------------------ 12
  {
    id: 't-12',
    kind: 'test',
    title: l('Tenses review test', 'Tenses review test'),
    why: l('Check what you have learned. Your mistakes here decide what Mino suggests you review.', 'কী শিখলে যাচাই করো। এখানের ভুল দেখেই Mino ঠিক করবে কী review করতে বলবে।'),
    minutes: 12,
    difficulty: 'medium',
    skill: 'grammar',
    steps: [
      {
        kind: 'concept',
        title: l('How this test works', 'এই test কীভাবে চলবে'),
        body: l(
          '12 questions from every lesson in this module. You see the answer after each question. Score 80% or more to complete the module; if you score less, Mino will suggest short reviews for the tenses you missed.',
          'এই module-এর সব lesson থেকে ১২টা প্রশ্ন। প্রতিটা প্রশ্নের পরে answer দেখবে। ৮০% বা বেশি পেলে module শেষ; কম পেলে যেগুলো ভুল হয়েছে, Mino সেই tense-গুলোর ছোট review suggest করবে।',
        ),
      },
      practice(
        [
          { id: 't-12-e1', type: 'choice', tag: 'agreement', concept: 'present-simple', prompt: l('Choose the correct form.', 'সঠিক form বাছো।'), sentence: 'My father ___ the newspaper every morning.', options: ['read', 'reads', 'is read'], answer: 'reads', explanation: l('Habit + "my father" (he) → reads.', 'অভ্যাস + "my father" (he) → reads।') },
          { id: 't-12-e2', type: 'choice', tag: 'tense', concept: 'present-continuous', prompt: l('Choose the correct form.', 'সঠিক form বাছো।'), sentence: 'Please be quiet — the baby ___.', options: ['sleeps', 'is sleeping', 'slept'], answer: 'is sleeping', explanation: l('Happening now → present continuous.', 'এখন হচ্ছে → present continuous।') },
          { id: 't-12-e3', type: 'gap', tag: 'tense', concept: 'past-simple', prompt: l('Past simple of "grow".', '"grow"-এর past simple।'), sentence: 'The city ___ rapidly in the 1990s.', accepted: ['grew'], explanation: l('grow → grew.', 'grow → grew।') },
          { id: 't-12-e4', type: 'choice', tag: 'tense', concept: 'past-continuous', prompt: l('Choose the correct form.', 'সঠিক form বাছো।'), sentence: 'While she ___, her phone rang.', options: ['was driving', 'drove', 'drives'], answer: 'was driving', explanation: l('"While" + action in progress → was driving.', '"While" + চলমান কাজ → was driving।') },
          { id: 't-12-e5', type: 'choice', tag: 'tense', concept: 'present-perfect', prompt: l('Choose the correct form.', 'সঠিক form বাছো।'), sentence: 'Internet use ___ dramatically since 2010.', options: ['increased', 'has increased', 'is increasing'], answer: 'has increased', explanation: l('"since 2010" → present perfect.', '"since 2010" → present perfect।') },
          { id: 't-12-e6', type: 'correct', tag: 'tense', concept: 'present-perfect', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'), sentence: 'She has finished her degree in 2021.', accepted: ['She finished her degree in 2021.'], explanation: l('"in 2021" is finished → past simple.', '"in 2021" শেষ → past simple।') },
          { id: 't-12-e7', type: 'gap', tag: 'tense', concept: 'past-perfect', prompt: l('Past perfect of "leave".', '"leave"-এর past perfect।'), sentence: 'By the time we arrived, the bus ___.', accepted: ['had left', 'had already left'], explanation: l('Before we arrived → had left.', 'আমরা পৌঁছানোর আগে → had left।') },
          { id: 't-12-e8', type: 'choice', tag: 'tense', concept: 'future', prompt: l('Choose the correct form.', 'সঠিক form বাছো।'), sentence: 'The number of users ___ to double by 2030.', options: ['is expected', 'expects', 'expected'], answer: 'is expected', explanation: l('Projection → "is expected to".', 'Projection → "is expected to"।') },
          { id: 't-12-e9', type: 'correct', tag: 'tense', concept: 'future', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'), sentence: 'If it will rain tomorrow, we will stay at home.', accepted: ['If it rains tomorrow, we will stay at home.', "If it rains tomorrow, we'll stay at home."], explanation: l('"If" + present for the future: "If it rains".', 'ভবিষ্যৎ বোঝাতে "If" + present: "If it rains"।') },
          { id: 't-12-e10', type: 'choice', tag: 'tense', concept: 'past-simple', prompt: l('Choose the correct Task 1 sentence.', 'সঠিক Task 1 sentence বাছো।'), options: ['Exports reached a peak of 80 tonnes in 2016.', 'Exports reach a peak of 80 tonnes in 2016.', 'Exports have reached a peak of 80 tonnes in 2016.'], answer: 'Exports reached a peak of 80 tonnes in 2016.', explanation: l('Finished year → past simple.', 'শেষ হওয়া বছর → past simple।') },
          { id: 't-12-e11', type: 'correct', tag: 'agreement', concept: 'present-simple', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করো।'), sentence: 'Everyone in my family enjoy cricket.', accepted: ['Everyone in my family enjoys cricket.'], explanation: l('"Everyone" is singular → enjoys.', '"Everyone" singular → enjoys।') },
          { id: 't-12-e12', type: 'choice', tag: 'tense', concept: 'present-perfect', prompt: l('Examiner: "Have you ever been abroad?"', 'Examiner: "Have you ever been abroad?"'), options: ['Yes, I have been to India twice.', 'Yes, I go to India twice.', 'Yes, I have gone to India last year.'], answer: 'Yes, I have been to India twice.', explanation: l('Experience (no finished time) → present perfect "have been".', 'অভিজ্ঞতা (শেষ হওয়া সময় নেই) → present perfect "have been"।') },
        ],
        l('Review test', 'Review test'),
      ),
      recall(
        l('Time words decide the tense.', 'সময়ের শব্দ tense ঠিক করে।'),
        l('Next: your mistakes become short reviews on your dashboard.', 'পরের ধাপ: তোমার ভুলগুলো dashboard-এ ছোট review হয়ে আসবে।'),
      ),
    ],
  },
];
