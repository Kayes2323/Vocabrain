import type { IELTSSkillId } from './model';

/**
 * Plain-language explanations of what a band means in each skill, shown on the
 * result sheet. Mino's own wording, written for students: what you can typically
 * do at that level and what still gets in the way.
 */
export type DescriberLocale = 'en' | 'bn';
type Level = 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 0;
type Text = Record<DescriberLocale, string>;

export const BAND_DESCRIPTORS: Record<IELTSSkillId, Record<Level, Text>> = {
  listening: {
    0: { en: 'No answers were marked correct, so there is nothing to describe yet. If you submitted early, take the test again and answer as you listen. If you did answer, start with the Listening foundation lessons.', bn: 'কোনো উত্তর সঠিক ধরা হয়নি, তাই এখনও ব্যাখ্যা করার মতো কিছু নেই। তাড়াতাড়ি জমা দিয়ে থাকলে আবার test দিন আর শুনতে শুনতে উত্তর লিখুন। উত্তর দিয়ে থাকলে Listening foundation lesson দিয়ে শুরু করুন।' },
    9: { en: 'You follow any speech with ease, including fast, accented or complex talk, and pick up every detail and implied meaning.', bn: 'দ্রুত, ভিন্ন accent-এর বা জটিল কথাও আপনি অনায়াসে বোঝেন, আর প্রতিটা খুঁটিনাটি ও ইঙ্গিত ধরতে পারেন।' },
    8: { en: 'You follow almost all speech and complex arguments, with only rare slips on very fast or unfamiliar material.', bn: 'প্রায় সব কথা আর জটিল যুক্তি আপনি বোঝেন; খুব দ্রুত বা অচেনা বিষয়ে শুধু কখনও কখনও ভুল হয়।' },
    7: { en: 'You follow extended speech on familiar and academic topics, catch most details and opinions, and cope well when speakers change.', bn: 'চেনা ও academic বিষয়ে লম্বা কথা আপনি বোঝেন, বেশিরভাগ তথ্য ও মতামত ধরেন, আর বক্তা বদলালেও সামলে নেন।' },
    6: { en: 'You follow extended speech and detailed instructions and understand stated facts, attitudes and purposes. Some detail and implied meaning is still missed.', bn: 'লম্বা কথা আর বিস্তারিত নির্দেশ আপনি বোঝেন, সরাসরি বলা তথ্য, মনোভাব ও উদ্দেশ্যও ধরেন। তবে কিছু খুঁটিনাটি ও ইঙ্গিত এখনও বাদ পড়ে।' },
    5: { en: 'You follow the main points of clear speech on familiar topics, but lose detail when the talk is fast, long or full of distractors.', bn: 'চেনা বিষয়ে পরিষ্কার কথার মূল পয়েন্ট বোঝেন, কিন্তু কথা দ্রুত, লম্বা বা বিভ্রান্তিকর হলে খুঁটিনাটি হারিয়ে ফেলেন।' },
    4: { en: 'You understand basic information in slow, clear speech about everyday topics. Much of a longer talk is missed.', bn: 'রোজকার বিষয়ে ধীর, পরিষ্কার কথায় মৌলিক তথ্য বোঝেন। লম্বা কথার বড় অংশ বাদ পড়ে যায়।' },
    3: { en: 'You understand only short, simple everyday messages and isolated details.', bn: 'শুধু ছোট, সহজ, রোজকার বার্তা আর আলাদা আলাদা তথ্য বোঝেন।' },
    2: { en: 'You recognise a few words and very simple phrases.', bn: 'কয়েকটা শব্দ আর খুব সহজ বাক্যাংশ চিনতে পারেন।' },
  },
  reading: {
    0: { en: 'No answers were marked correct, so there is nothing to describe yet. If you submitted early, take the test again and work through each passage. If you did answer, start with the Reading foundation lessons.', bn: 'কোনো উত্তর সঠিক ধরা হয়নি, তাই এখনও ব্যাখ্যা করার মতো কিছু নেই। তাড়াতাড়ি জমা দিয়ে থাকলে আবার test দিন আর প্রতিটা passage ধরে ধরে করুন। উত্তর দিয়ে থাকলে Reading foundation lesson দিয়ে শুরু করুন।' },
    9: { en: 'You read fluently, understand complex and abstract texts in full, and follow implied attitudes and fine shades of meaning.', bn: 'আপনি সাবলীলভাবে পড়েন, জটিল ও বিমূর্ত লেখা পুরোটা বোঝেন, আর ইঙ্গিত ও সূক্ষ্ম অর্থের পার্থক্য ধরেন।' },
    8: { en: 'You understand nearly every text, including complex arguments, and only occasionally misread a very dense or unfamiliar passage.', bn: 'জটিল যুক্তিসহ প্রায় সব লেখা বোঝেন; শুধু খুব ঘন বা অচেনা passage-এ কখনও ভুল পড়েন।' },
    7: { en: 'You understand long academic texts, follow arguments and writers’ views and locate detail, though subtle distinctions can still slip past you.', bn: 'লম্বা academic লেখা, যুক্তি আর লেখকের মত আপনি বোঝেন এবং নির্দিষ্ট তথ্য খুঁজে পান; তবে সূক্ষ্ম পার্থক্য কখনও এড়িয়ে যায়।' },
    6: { en: 'You follow the main ideas of most texts, find specific information and recognise a writer’s purpose. You can miss detail in long or dense passages.', bn: 'বেশিরভাগ লেখার মূল ভাব বোঝেন, নির্দিষ্ট তথ্য খুঁজে পান, লেখকের উদ্দেশ্যও চেনেন। লম্বা বা ঘন passage-এ খুঁটিনাটি বাদ পড়তে পারে।' },
    5: { en: 'You understand the main idea of straightforward texts and find simple facts, but struggle with long texts, paraphrase and opinion questions.', bn: 'সহজ লেখার মূল ভাব বোঝেন আর সহজ তথ্য খুঁজে পান, কিন্তু লম্বা লেখা, paraphrase আর মতামতের প্রশ্নে কষ্ট হয়।' },
    4: { en: 'You understand short, simple texts on familiar topics, but longer academic texts are very difficult.', bn: 'চেনা বিষয়ের ছোট, সহজ লেখা বোঝেন, কিন্তু লম্বা academic লেখা খুব কঠিন লাগে।' },
    3: { en: 'You can pick out familiar words and simple facts from short texts.', bn: 'ছোট লেখা থেকে চেনা শব্দ আর সহজ তথ্য বেছে নিতে পারেন।' },
    2: { en: 'You recognise only isolated words and very short phrases.', bn: 'শুধু আলাদা শব্দ আর খুব ছোট বাক্যাংশ চিনতে পারেন।' },
  },
  writing: {
    0: { en: 'There was too little writing to assess, so there is nothing to describe yet. Take the test again and write a full answer for each task.', bn: 'মূল্যায়ন করার মতো যথেষ্ট লেখা ছিল না, তাই এখনও ব্যাখ্যা করার মতো কিছু নেই। আবার test দিন আর প্রতিটা task-এর পুরো উত্তর লিখুন।' },
    9: { en: 'You write with full control: ideas are fully developed, the organisation is seamless and the language is precise and natural.', bn: 'আপনার লেখায় পূর্ণ নিয়ন্ত্রণ: ভাব সম্পূর্ণ বিকশিত, গঠন নিখুঁত, ভাষা সঠিক ও স্বাভাবিক।' },
    8: { en: 'You write well-organised, fully developed answers with a wide range of language and only rare errors.', bn: 'আপনার উত্তর সুসংগঠিত আর পুরোপুরি বিকশিত, ভাষার বৈচিত্র্য বেশি, ভুল খুব কম।' },
    7: { en: 'You address every part of the task, develop clear arguments and use a good range of structures and vocabulary, with some slips.', bn: 'Task-এর প্রতিটা অংশের উত্তর দেন, স্পষ্ট যুক্তি গড়েন, গঠন ও শব্দভান্ডার ভালো ব্যবহার করেন; কিছু ছোট ভুল থাকে।' },
    6: { en: 'You answer the task and organise ideas into paragraphs with a reasonable range of language. Some points are underdeveloped and errors appear.', bn: 'Task-এর উত্তর দেন, ভাবগুলো paragraph-এ সাজান, মোটামুটি ভালো ভাষা ব্যবহার করেন। কিছু পয়েন্ট অসম্পূর্ণ থাকে আর ভুল দেখা যায়।' },
    5: { en: 'You cover the task only in part, ideas are limited or repeated, and errors in grammar and word choice sometimes make the meaning hard to follow.', bn: 'Task শুধু আংশিক সম্পূর্ণ করেন, ভাব সীমিত বা বারবার একই, আর grammar ও শব্দ বাছাইয়ের ভুলে মাঝে মাঝে অর্থ বোঝা কঠিন হয়।' },
    4: { en: 'You attempt the task, but ideas are hard to follow, the language is basic and errors are frequent.', bn: 'Task-এর চেষ্টা করেন, কিন্তু ভাব অনুসরণ করা কঠিন, ভাষা মৌলিক আর ভুল ঘন ঘন।' },
    3: { en: 'You write only a few connected ideas, with very limited language.', bn: 'মাত্র কয়েকটা সংযুক্ত ভাব লেখেন, ভাষা খুবই সীমিত।' },
    2: { en: 'You produce isolated words or fragments.', bn: 'শুধু আলাদা শব্দ বা অসম্পূর্ণ টুকরো লেখেন।' },
  },
  speaking: {
    0: { en: 'Too little speech was heard to assess, so there is nothing to describe yet. Take the test again in a quiet place and answer every question aloud.', bn: 'মূল্যায়ন করার মতো যথেষ্ট কথা শোনা যায়নি, তাই এখনও ব্যাখ্যা করার মতো কিছু নেই। শান্ত জায়গায় আবার test দিন আর প্রতিটা প্রশ্নের উত্তর মুখে দিন।' },
    9: { en: 'You speak fluently and naturally on any topic, with precise vocabulary and almost no hesitation or errors.', bn: 'যেকোনো বিষয়ে সাবলীল ও স্বাভাবিকভাবে বলেন, শব্দ সঠিক, দ্বিধা বা ভুল প্রায় নেই।' },
    8: { en: 'You speak fluently with only occasional hesitation, a wide vocabulary and rare errors.', bn: 'সাবলীলভাবে বলেন, শুধু মাঝে মাঝে থামেন, শব্দভান্ডার বড়, ভুল কম।' },
    7: { en: 'You speak at length without much effort, use a good range of language and some idiom, and make some errors and hesitations.', bn: 'বিশেষ কষ্ট ছাড়াই লম্বা করে বলেন, ভালো ভাষা আর কিছু idiom ব্যবহার করেন; কিছু ভুল ও থেমে যাওয়া থাকে।' },
    6: { en: 'You are willing to speak at length, though you sometimes lose the thread or hesitate. You mix simple and more complex language, with some mistakes.', bn: 'লম্বা করে বলতে রাজি, যদিও মাঝে মাঝে খেই হারান বা থামেন। সহজ ও একটু জটিল ভাষা মিলিয়ে বলেন, কিছু ভুল হয়।' },
    5: { en: 'You keep going, but rely on repetition, pause to find words and use mostly simple sentences with frequent errors.', bn: 'বলে যেতে পারেন, কিন্তু একই কথা ঘুরিয়ে বলেন, শব্দ খুঁজতে থামেন, বেশিরভাগ সহজ বাক্য ব্যবহার করেন আর ভুল ঘন ঘন হয়।' },
    4: { en: 'You answer in short sentences with frequent pauses, and cannot always be understood.', bn: 'ছোট বাক্যে উত্তর দেন, ঘন ঘন থামেন, আর সবসময় বোঝা যায় না।' },
    3: { en: 'You give very short answers and rely on single words and memorised phrases.', bn: 'খুব ছোট উত্তর দেন, আলাদা শব্দ আর মুখস্থ বাক্যাংশের ওপর নির্ভর করেন।' },
    2: { en: 'You say little beyond isolated words.', bn: 'আলাদা শব্দের বাইরে প্রায় কিছু বলেন না।' },
  },
};

/** What this band means in this skill. A score of 0 gets its own message: there was nothing to measure. */
export function describeBand(skill: IELTSSkillId, band: number | undefined, locale: DescriberLocale): string | undefined {
  if (band === undefined) return undefined;
  const level = (band < 1 ? 0 : Math.min(9, Math.max(2, Math.floor(band)))) as Level;
  return BAND_DESCRIPTORS[skill][level][locale];
}

/** Where a band puts the student, in words. */
export type Standing = 'none' | 'starting' | 'building' | 'developing' | 'solid' | 'strong';

export function standingForBand(band: number): Standing {
  if (band < 1) return 'none';
  if (band < 4) return 'starting';
  if (band < 5.5) return 'building';
  if (band < 6) return 'developing';
  if (band < 7) return 'solid';
  return 'strong';
}

/** Bands still to gain to reach the target (0 once reached), or undefined without a target. */
export function gapToTarget(band: number, target: number | undefined): number | undefined {
  return target === undefined ? undefined : Math.max(0, Math.round((target - band) * 2) / 2);
}
