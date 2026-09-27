import { NO_ARTICLE, NO_ARTICLE_TYPED } from './articles';
import type { FinalItem, FinalPart } from './pos-final';
import { choice, correct, gap, l, order, spot } from './pos-kit';

/**
 * Articles · Final Mastery Challenge. Six parts, 4 items each at levels 1–3;
 * 3 are served per part adaptively (18 questions). Every item carries the
 * article concept it tests, so the report can show results topic by topic.
 * New items, not copied from the lessons. Original Mino content.
 */
const at = <T extends FinalItem>(level: 1 | 2 | 3, e: Omit<T, 'level'>): T => ({ ...e, level }) as T;
const A = { tag: 'article' as const };

export const ARTICLE_FINAL_PARTS: FinalPart[] = [
  {
    id: 'A', title: l('a or an?', 'a নাকি an?'), intro: l('Say the next word, then choose.', 'পরের word-টা বলুন, তারপর বেছে নিন।'),
    items: [
      at(1, choice('afin-a1', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('Choose a or an.', 'a নাকি an বেছে নিন।'), sentence: 'I ate ___ orange after lunch.', options: ['an', 'a'], answer: 'an', explanation: l('"orange" starts with a vowel sound.', '"orange" vowel sound দিয়ে শুরু।') })),
      at(2, choice('afin-a2', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('Choose a or an.', 'a নাকি an বেছে নিন।'), sentence: 'He has ___ unusual name.', options: ['an', 'a'], answer: 'an', explanation: l('"unusual" = "un-": vowel sound → an.', '"unusual" = "আন-": vowel sound → an।') })),
      at(2, choice('afin-a3', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('Choose a or an.', 'a নাকি an বেছে নিন।'), sentence: 'She won ___ award from ___ university in Japan.', options: ['an · a', 'a · an', 'an · an'], answer: 'an · a', explanation: l('"award" (vowel sound) → an; "university" ("yoo") → a.', '"award" (vowel sound) → an; "university" ("ইউ") → a।') })),
      at(3, choice('afin-a4', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('Task 1: choose the correct pair.', 'Task 1: সঠিক জোড়া বেছে নিন।'), sentence: 'There was ___ 80% rise in 2010 and ___ 15% fall in 2011.', options: ['an · a', 'a · an', 'an · an'], answer: 'an · a', explanation: l('"eighty" (vowel sound) → an; "fifteen" (consonant sound) → a.', '"eighty" (vowel sound) → an; "fifteen" (consonant sound) → a।') })),
    ],
  },
  {
    id: 'B', title: l('One of many, or the one?', 'অনেকের একটা, নাকি সেই একটা?'), intro: l('New or known? Choose a / an or the.', 'নতুন নাকি চেনা? a / an নাকি the বেছে নিন।'),
    items: [
      at(1, choice('afin-b1', 'article-a', { ...A, pattern: 'missing-article', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'My cousin works as ___ pilot.', options: ['a', 'the', NO_ARTICLE], answer: 'a', explanation: l('A job → a pilot.', 'পেশা → a pilot।') })),
      at(2, choice('afin-b2', 'article-the', { ...A, prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'We stayed in a hotel near the beach. ___ hotel had a pool.', options: ['The', 'A', NO_ARTICLE], answer: 'The', explanation: l('Second mention → The hotel.', 'দ্বিতীয়বার → The hotel।') })),
      at(2, choice('afin-b3', 'article-the', { ...A, pattern: 'missing-article', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: 'Mount Everest is ___ highest mountain in the world.', options: ['the', 'a', NO_ARTICLE], answer: 'the', explanation: l('Superlative → the highest.', 'Superlative → the highest।') })),
      at(3, choice('afin-b4', 'article-the', { ...A, prompt: l('Which sentence means "several people", not the exact figure?', 'কোন sentence-এর মানে "কয়েকজন মানুষ", নির্দিষ্ট সংখ্যা না?'), options: ['A number of people complained.', 'The number of people complained.', 'Number of people complained.'], answer: 'A number of people complained.', explanation: l('"a number of" = several; "the number of" = the exact figure.', '"a number of" = কয়েকজন; "the number of" = নির্দিষ্ট সংখ্যা।') })),
    ],
  },
  {
    id: 'C', title: l('General or particular?', 'সাধারণ নাকি নির্দিষ্ট?'), intro: l('All of them, or a group we know?', 'সবগুলো, নাকি আমাদের চেনা একটা দল?'),
    items: [
      at(1, choice('afin-c1', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: '___ water is essential for life.', options: [NO_ARTICLE, 'The', 'A'], answer: NO_ARTICLE, explanation: l('Water and life in general → no article.', 'সাধারণভাবে পানি আর জীবন → article না।') })),
      at(2, choice('afin-c2', 'article-the', { ...A, prompt: l('Choose the correct word.', 'সঠিক word বেছে নিন।'), sentence: '___ water in this river is very polluted.', options: ['The', NO_ARTICLE, 'A'], answer: 'The', explanation: l('"in this river" → particular water → The.', '"in this river" → নির্দিষ্ট পানি → The।') })),
      at(2, choice('afin-c3', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Task 2: choose the best sentence.', 'Task 2: সবচেয়ে ভালো sentence বেছে নিন।'), options: ['Young people spend too much time on social media.', 'The young people spend too much time on the social media.', 'A young people spend too much time on social media.'], answer: 'Young people spend too much time on social media.', explanation: l('General statement → no article.', 'সাধারণ বক্তব্য → article না।') })),
      at(3, choice('afin-c4', 'article-zero', { ...A, prompt: l('Reading: "Farmers in the region earn less than they did in 2000." Which statement is supported?', 'Reading: "Farmers in the region earn less than they did in 2000." কোন বক্তব্যটা সমর্থিত?'), options: ['Farmers in one region earn less than before', 'All farmers everywhere earn less', 'The text says nothing about income'], answer: 'Farmers in one region earn less than before', explanation: l('"in the region" limits it to a particular group.', '"in the region" এটাকে নির্দিষ্ট দলে সীমিত করে।') })),
    ],
  },
  {
    id: 'D', title: l('Free recall', 'নিজে লিখুন'), intro: l('Write a, an or the — or - when no article is needed.', 'a, an বা the লিখুন — article না লাগলে -।'),
    items: [
      at(1, gap('afin-d1', 'article-a', { ...A, pattern: 'missing-article', prompt: l('Write a, an or the — or type - if no article is needed.', 'a, an বা the লিখুন — article না লাগলে - লিখুন।'), sentence: 'She bought ___ new laptop for university.', accepted: ['a'], explanation: l('First mention of one laptop → a.', 'একটা laptop-এর প্রথম উল্লেখ → a।') })),
      at(2, gap('afin-d2', 'article-the', { ...A, pattern: 'missing-article', prompt: l('Write a, an or the — or type - if no article is needed.', 'a, an বা the লিখুন — article না লাগলে - লিখুন।'), sentence: 'This is ___ best biryani I have ever eaten.', accepted: ['the'], explanation: l('Superlative → the best.', 'Superlative → the best।') })),
      at(2, gap('afin-d3', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Write a, an or the — or type - if no article is needed.', 'a, an বা the লিখুন — article না লাগলে - লিখুন।'), sentence: 'I think ___ happiness is more important than money.', accepted: NO_ARTICLE_TYPED, explanation: l('Happiness in general → no article.', 'সাধারণভাবে সুখ → article না।'), why: { the: l('You mean happiness in general.', 'আপনি সাধারণভাবে সুখ বোঝাচ্ছেন।') } })),
      at(3, gap('afin-d4', 'article-a-an', { ...A, pattern: 'a-an-sound', prompt: l('Write a, an or the — or type - if no article is needed.', 'a, an বা the লিখুন — article না লাগলে - লিখুন।'), sentence: 'He is ___ honourable man, respected by everyone in the village.', accepted: ['an'], explanation: l('Silent h: "on-ourable" → an.', 'h নীরব: "অনারেবল" → an।') })),
    ],
  },
  {
    id: 'E', title: l('Fix the sentence', 'Sentence ঠিক করুন'), intro: l('Rewrite with the right articles.', 'সঠিক article দিয়ে আবার লিখুন।'),
    items: [
      at(1, correct('afin-e1', 'article-a', { ...A, pattern: 'missing-article', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করুন।'), sentence: 'My father is businessman.', accepted: ['My father is a businessman.'], explanation: l('A job → a businessman.', 'পেশা → a businessman।') })),
      at(2, correct('afin-e2', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Correct the sentence.', 'Sentence-টা ঠিক করুন।'), sentence: 'The children need the love and the care.', accepted: ['Children need love and care.'], explanation: l('General statement → no article.', 'সাধারণ বক্তব্য → article না।') })),
      at(2, spot('afin-e3', 'article-a', { ...A, pattern: 'noun-count', prompt: l('One word breaks this sentence. Tap it and type the fix.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিকটা লিখুন।'), sentence: 'I need an information about the visa process.', wrong: 'an', accepted: ['some'], explanation: l('information is uncountable → some information.', 'information uncountable → some information।') })),
      at(3, correct('afin-e4', 'article-the', { ...A, pattern: 'missing-article', prompt: l('Fix the Task 1 sentence (two articles are missing).', 'Task 1 sentence-টা ঠিক করুন (দুটো article বাদ পড়েছে)।'), sentence: 'Chart shows proportion of people who work from home.', accepted: ['The chart shows the proportion of people who work from home.'], explanation: l('The chart · the proportion of.', 'The chart · the proportion of।') })),
    ],
  },
  {
    id: 'F', title: l('IELTS Writing & Speaking', 'IELTS Writing আর Speaking'), intro: l('Articles in real IELTS sentences.', 'আসল IELTS sentence-এ article।'),
    items: [
      at(1, choice('afin-f1', 'article-a', { ...A, pattern: 'missing-article', prompt: l('Speaking Part 1: "What do you do?" Pick the best answer.', 'Speaking Part 1: "What do you do?" সবচেয়ে ভালো উত্তর বেছে নিন।'), options: ['I’m an accountant at a bank.', 'I’m accountant at bank.', 'I’m the accountant at the bank.'], answer: 'I’m an accountant at a bank.', explanation: l('A job and a first mention → an, a.', 'পেশা আর প্রথম উল্লেখ → an, a।') })),
      at(2, order('afin-f2', 'article-the', { ...A, prompt: l('Build the Task 1 opening.', 'Task 1-এর শুরুর sentence সাজান।'), answer: 'The graph shows the amount of rice exported.', explanation: l('The graph · the amount of.', 'The graph · the amount of।') })),
      at(2, choice('afin-f3', 'article-zero', { ...A, pattern: 'general-the', prompt: l('Task 2: choose the best conclusion.', 'Task 2: সবচেয়ে ভালো conclusion বেছে নিন।'), options: ['In conclusion, governments should invest in renewable energy.', 'In the conclusion, the governments should invest in the renewable energy.', 'In a conclusion, a government should invest in a renewable energy.'], answer: 'In conclusion, governments should invest in renewable energy.', explanation: l('In conclusion · governments, renewable energy (general).', 'In conclusion · governments, renewable energy (সাধারণ)।') })),
      at(3, choice('afin-f4', 'article-the', { ...A, pattern: 'missing-article', prompt: l('Task 1: which sentence has NO article mistakes?', 'Task 1: কোন sentence-এ কোনো article-এর ভুল নেই?'), options: ['The figure reached a peak of 70% in 2015, the highest point in the period.', 'Figure reached the peak of 70% in 2015, a highest point in the period.', 'The figure reached peak of 70% in 2015, highest point in the period.'], answer: 'The figure reached a peak of 70% in 2015, the highest point in the period.', explanation: l('The figure (known) · a peak (trend noun) · the highest (superlative).', 'The figure (চেনা) · a peak (trend noun) · the highest (superlative)।') })),
    ],
  },
];
