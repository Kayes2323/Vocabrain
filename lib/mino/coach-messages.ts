/**
 * Mino Coach's dialogue: deterministic, hand-written lines per learning area,
 * never a live model call for simple character speech. Bangla always
 * addresses the learner as আপনি (never তুমি/তুই). English and Bangla carry
 * the same meaning but are written separately, not machine-translated —
 * IELTS terms (Overview, Body Paragraph, Essay, Thesis Statement, Vocabulary,
 * Grammar…) are kept in English in both, matching the rest of the app.
 */
import type { MinoCoachArea, MinoCoachEvent } from './coach';

export type CoachText = { en: string; bn: string };
export function coachText(locale: 'en' | 'bn', value: CoachText): string {
  return value[locale];
}

/** The learner-facing role label shown next to the mascot, per area. */
export const COACH_ROLE: Record<MinoCoachArea, CoachText> = {
  task1: { en: 'Writing Task 1 Coach', bn: 'Writing Task 1 কোচ' },
  task2: { en: 'Essay Writing Coach', bn: 'Essay Writing কোচ' },
  'my-brain': { en: 'Vocabulary & Revision Coach', bn: 'Vocabulary ও Revision কোচ' },
};

/**
 * First-entry welcome dialogue, shown once per area per device (see
 * lib/mino/coach.ts welcomeStorageKey) via a replay/skip-able overlay.
 * Task 1's Bangla line is the exact approved script — do not edit it.
 */
export const COACH_WELCOME: Record<MinoCoachArea, CoachText> = {
  task1: {
    bn: 'হ্যালো! আমি Mino—আপনার Writing Task 1 শেখার সঙ্গী। চার্ট, Overview কিংবা Body Paragraph কঠিন লাগছে? চিন্তা করবেন না। আপনি নিশ্চিন্তে শুরু করুন। আমি ধাপে ধাপে বুঝিয়ে দেব কীভাবে তথ্য বিশ্লেষণ করবেন, গুরুত্বপূর্ণ তুলনা বেছে নেবেন, আর পরিষ্কারভাবে লিখবেন। আপনার লেখা দেখে ভুলগুলো চিহ্নিত করে সহজভাবে বুঝিয়ে দেব, এবং কীভাবে উন্নতি করবেন সেটাও দেখাব। আপনি শুধু নিয়মিত অনুশীলন করুন—Writing Task 1 শেখার প্রতিটি ধাপে আপনাকে গাইড করার দায়িত্ব আমার। চলুন, শুরু করি!',
    en: "Hello! I'm Mino — your Writing Task 1 coach. Charts, Overviews or Body Paragraphs feeling difficult? Don't worry. You can start with an easy mind. I'll walk you through how to read the data, choose the comparisons that matter, and write about them clearly. I'll look at what you write, point out the mistakes in plain language, and show you how to improve them. You just need to practise regularly — guiding you through every step of Writing Task 1 is my job. Let's get started!",
  },
  task2: {
    en: "Hello! I'm Mino — your Essay Writing coach for Task 2. Understanding the question, building an argument, and structuring a full essay can feel like a lot at once. We'll take it one step at a time: understand what the question is really asking, develop your ideas properly, and put them into clear paragraphs. I'll check your essays and explain what to fix, not just what's wrong. Let's begin.",
    bn: 'হ্যালো! আমি Mino—আপনার Task 2 Essay Writing-এর সঙ্গী। প্রশ্ন বোঝা, যুক্তি তৈরি করা, আর পুরো essay-র গঠন—একসঙ্গে অনেক কিছু মনে হতে পারে। আমরা ধাপে ধাপে এগোব: প্রশ্নটা আসলে কী জানতে চাইছে বুঝব, ধারণাগুলো ঠিকভাবে develop করব, আর পরিষ্কার paragraph-এ সাজাব। আপনার essay দেখে কী ঠিক করতে হবে তা বুঝিয়ে দেব—শুধু ভুল ধরিয়ে দেব না। চলুন, শুরু করি।',
  },
  'my-brain': {
    en: "Hi, I'm Mino — your vocabulary and revision coach here in My Brain. Saving a word is only the start; real memory comes from recalling it again later, in your own words. I'll check your recall attempts, accept honest alternatives (English, Bangla, or Romanized Bangla), and let you know gently when something needs another look. No pressure — we'll revisit words exactly when you need to.",
    bn: 'হাই, আমি Mino—এখানে My Brain-এ আপনার vocabulary ও revision-এর সঙ্গী। শব্দ সংরক্ষণ করাটাই শেষ কথা নয়; আসল মনে রাখা হয় পরে নিজের ভাষায় আবার মনে করতে পারলে। আপনার recall চেষ্টাগুলো আমি দেখব, সৎ বিকল্প উত্তর (English, Bangla অথবা Romanized Bangla) মেনে নেব, আর কিছু আবার দেখার দরকার হলে নরমভাবে জানিয়ে দেব। চাপ নেই—যখন দরকার, ঠিক তখনই আমরা শব্দগুলো আবার দেখব।',
  },
};

/** Short, context-appropriate lines for ordinary in-area moments (not the one-time welcome). */
const AREA_EVENT_LINES: Record<MinoCoachArea, Partial<Record<MinoCoachEvent, CoachText>>> = {
  task1: {
    explaining: { en: "Let's see which change in this chart matters most.", bn: 'চলুন, এই চার্টে সবচেয়ে গুরুত্বপূর্ণ পরিবর্তনটি কোনটি সেটা খুঁজে দেখি।' },
    thinking: { en: 'Reading your Overview against the data…', bn: 'আপনার Overview-টা তথ্যের সঙ্গে মিলিয়ে দেখছি…' },
    success: { en: 'Good — that comparison is exactly the kind an Overview needs.', bn: 'দারুণ — এই ধরনের তুলনাই একটা Overview-তে দরকার।' },
    struggle: { en: "Don't worry. We'll break this chart down together, one feature at a time.", bn: 'চিন্তা করবেন না। আমরা এই চার্টটা একসঙ্গে, ধাপে ধাপে বুঝে নেব।' },
  },
  task2: {
    explaining: { en: "First, let's be sure what the question is really asking.", bn: 'প্রথমে, প্রশ্নটা আসলে কী জানতে চাইছে সেটা নিশ্চিত হয়ে নিই।' },
    thinking: { en: 'Checking how well this paragraph supports your main idea…', bn: 'এই paragraph আপনার main idea-কে কতটা সমর্থন করছে সেটা দেখছি…' },
    success: { en: "Good — that's a real argument, not just a restatement.", bn: 'দারুণ — এটা একটা প্রকৃত argument, শুধু পুনরাবৃত্তি নয়।' },
    struggle: { en: 'A small mistake here. Let me show you why it happened.', bn: 'এখানে একটি ছোট ভুল হয়েছে। কেন হয়েছে, সেটা আমি বুঝিয়ে দিচ্ছি।' },
  },
  'my-brain': {
    explaining: { en: "Try recalling this word in your own words before checking the meaning.", bn: 'অর্থটা দেখার আগে শব্দটা নিজের ভাষায় মনে করার চেষ্টা করুন।' },
    thinking: { en: 'Checking your answer against the meaning…', bn: 'আপনার উত্তরটা অর্থের সঙ্গে মিলিয়ে দেখছি…' },
    success: { en: "Well done — you recalled that on your own.", bn: 'দারুণ — আপনি এটা নিজে থেকেই মনে করতে পেরেছেন।' },
    struggle: { en: "That's fine — we'll practise this word again soon.", bn: 'ঠিক আছে — আমরা এই শব্দটা শিগগিরই আবার অনুশীলন করব।' },
  },
};

/** A short, context-appropriate line for a reported event, or undefined when that area has none for it (e.g. idle). */
export function coachLineFor(area: MinoCoachArea, event: MinoCoachEvent): CoachText | undefined {
  return AREA_EVENT_LINES[area][event];
}
