/**
 * The Listening Lab error-classification taxonomy (product brief §6).
 *
 * `detectedFrom` is deliberately specific: the brief says "Do not
 * automatically assume the learner's error category based only on the
 * selected wrong answer." A future classifier (Phase 2) must use the
 * question, the audio transcript, the expected answer AND the response
 * pattern (timing, which wrong option, whether the format was wrong but the
 * meaning right) — never the wrong option alone. These definitions are what
 * that classifier will be built against; `scripts/test-listening-lab.ts`
 * checks every code here is actually usable (bilingual, non-empty, unique).
 */
import type { ErrorCodeDefinition, ListeningErrorCode } from './model';

export const LISTENING_ERROR_CODES: ErrorCodeDefinition[] = [
  {
    code: 'DEC',
    name: { en: 'Decoding / Pronunciation Recognition Error', bn: 'Decoding / Pronunciation Recognition Error' },
    detectedFrom: { en: 'The transcript word was never understood as spoken (connected speech, weak form, unfamiliar sound) — confirmed by replaying the exact clip against the transcript.', bn: 'Transcript-এর শব্দটা যেভাবে বলা হয়েছিল, সেভাবে কখনো ধরা পড়েনি — ঠিক ওই clip-টা transcript-এর সাথে মিলিয়ে নিশ্চিত করা হয়।' },
    nextStep: { en: 'A Sound Recognition Lab skill matching the specific sound pattern missed.', bn: 'যে sound pattern মিস হয়েছে, ঠিক সেটার সাথে মেলে এমন একটা Sound Recognition Lab skill।' },
  },
  {
    code: 'PAR',
    name: { en: 'Paraphrase Recognition Error', bn: 'Paraphrase Recognition Error' },
    detectedFrom: { en: 'The relevant audio was heard correctly (confirmed by transcript), but its wording differed from the question and the connection was missed.', bn: 'সংশ্লিষ্ট audio ঠিকভাবেই শোনা হয়েছিল (transcript দিয়ে নিশ্চিত), কিন্তু শব্দ আলাদা হওয়ায় সম্পর্কটা ধরা পড়েনি।' },
    nextStep: { en: 'A Paraphrase & Vocabulary Lab skill matching the paraphrase type missed.', bn: 'যে ধরনের paraphrase মিস হয়েছে, সেটার সাথে মেলে এমন একটা Paraphrase & Vocabulary Lab skill।' },
  },
  {
    code: 'TRP',
    name: { en: 'Distractor Trap', bn: 'Distractor Trap' },
    detectedFrom: { en: 'The chosen (wrong) option was explicitly mentioned in the audio and then corrected, rejected or superseded before the real answer.', bn: 'যে (ভুল) option বেছে নেওয়া হয়েছিল, সেটা audio-তে বলাই হয়েছিল, কিন্তু আসল উত্তরের আগে সেটা correct/বাতিল/পাল্টানো হয়েছিল।' },
    nextStep: { en: 'The relevant Trap Library entry and distractor-recognition practice for that part.', bn: 'সংশ্লিষ্ট Trap Library entry আর ওই part-এর distractor-recognition practice।' },
  },
  {
    code: 'SPK',
    name: { en: 'Speaker Confusion', bn: 'Speaker Confusion' },
    detectedFrom: { en: 'The answer belongs to the other speaker in a Part 3 exchange (confirmed from the transcript\'s speaker labels).', bn: 'Part 3-এর কথোপকথনে উত্তরটা আসলে অন্য speaker-এর (transcript-এর speaker label দিয়ে নিশ্চিত)।' },
    nextStep: { en: 'Speaker Tracking and Multiple Speaker Identification practice.', bn: 'Speaker Tracking আর Multiple Speaker Identification practice।' },
  },
  {
    code: 'TIM',
    name: { en: 'Answer Timing Error', bn: 'Answer Timing Error' },
    detectedFrom: { en: 'The correct answer was present and understood, but recorded response timing shows it was given before the audio reached that point (locked in too early).', bn: 'সঠিক উত্তরটা বোঝা গিয়েছিল, কিন্তু response timing দেখায় audio ওই জায়গায় পৌঁছানোর আগেই উত্তর দেওয়া হয়ে গেছে।' },
    nextStep: { en: 'Answer Timing practice (Part 3) and the whole-test pacing strategy.', bn: 'Answer Timing practice (Part 3) আর পুরো test-এর জন্য pacing strategy।' },
  },
  {
    code: 'ATT',
    name: { en: 'Attention Loss', bn: 'Attention Loss' },
    detectedFrom: { en: 'Several consecutive answers are blank or clearly guessed, with no single sound, paraphrase or trap pattern explaining them.', bn: 'একসাথে কয়েকটা উত্তর খালি বা স্পষ্টভাবে আন্দাজ করা, এর পেছনে কোনো একটা sound, paraphrase বা trap কারণ নেই।' },
    nextStep: { en: 'Concentration Recovery practice.', bn: 'Concentration Recovery practice।' },
  },
  {
    code: 'SPE',
    name: { en: 'Spelling Error', bn: 'Spelling Error' },
    detectedFrom: { en: 'The written answer is phonetically the right word but misspelled (confirmed: meaning matches, spelling does not).', bn: 'লেখা উত্তরটা উচ্চারণে ঠিক শব্দ, কিন্তু spelling ভুল (অর্থ মিলছে, spelling মিলছে না)।' },
    nextStep: { en: 'The Spelling & Answer Accuracy Lab skill matching the specific mistake.', bn: 'যে ভুলটা হয়েছে, সেটার সাথে মেলে এমন একটা Spelling & Answer Accuracy Lab skill।' },
  },
  {
    code: 'GRM',
    name: { en: 'Grammar / Word-Form Error', bn: 'Grammar / Word-Form Error' },
    detectedFrom: { en: 'The right word is written but in the wrong form (tense, singular/plural, part of speech) for the sentence it completes.', bn: 'ঠিক শব্দটাই লেখা হয়েছে, কিন্তু বাক্যের জন্য ভুল form-এ (tense, singular/plural, word class)।' },
    nextStep: { en: 'Grammar in Completion Answers and the matching word-form skill.', bn: 'Grammar in Completion Answers আর সংশ্লিষ্ট word-form skill।' },
  },
  {
    code: 'MAP',
    name: { en: 'Map and Direction Error', bn: 'Map and Direction Error' },
    detectedFrom: { en: 'The wrong label was placed on a map/plan/diagram question specifically (confirmed by question type).', bn: 'ভুলটা হয়েছে map/plan/diagram ধরনের question-এ, ভুল জায়গায় label বসানো হয়েছে।' },
    nextStep: { en: 'Map Labelling or Plan Labelling practice, with direction-language review.', bn: 'Map Labelling বা Plan Labelling practice, direction-language review সহ।' },
  },
  {
    code: 'PRD',
    name: { en: 'Poor Answer Prediction', bn: 'Poor Answer Prediction' },
    detectedFrom: { en: 'The written answer is the wrong word TYPE for the gap (e.g. a verb where a noun was needed) — a prediction failure, not a hearing failure.', bn: 'লেখা উত্তরটা gap-এর জন্য ভুল word TYPE (যেমন noun-এর জায়গায় verb) — এটা শোনার ভুল না, prediction-এর ভুল।' },
    nextStep: { en: 'Prediction Training and the question-type-specific prediction method.', bn: 'Prediction Training আর ওই question type-এর prediction পদ্ধতি।' },
  },
];

export const findErrorCode = (code: ListeningErrorCode): ErrorCodeDefinition | undefined => LISTENING_ERROR_CODES.find((e) => e.code === code);
