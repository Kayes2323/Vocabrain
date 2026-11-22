/**
 * The six Mino Listening modules (brief §2–§7). Sound Gym is the only
 * module with real lesson/stage structure in this phase; the other five
 * get their landing page, empty lesson slots and content schema now, and
 * their actual lessons later, through the same `Lesson`/`Stage` shape —
 * never a redesigned UI.
 */
import { SOUND_GYM_STAGE_ORDER, type Lesson, type Module, type Stage } from './model';
import { audioAssetsForLesson } from './audio-manifest';

const speakerLine = (asset: ReturnType<typeof audioAssetsForLesson>[number]) =>
  (asset.speakers ?? []).map((s) => `${s.identity}${s.role ? ` (${s.role})` : ''}`).join(' + ');

const SOUND_GYM_LESSON_DEFS: { number: number; code: string; title: string; titleBn: string; skill: string; skillBn: string }[] = [
  { number: 1, code: 'SG-01', title: 'Word Boundary Detective', titleBn: 'Word Boundary Detective', skill: 'Speech segmentation and word-boundary recognition.', skillBn: 'কথার মধ্যে একটা শব্দ কোথায় শেষ আর পরেরটা কোথায় শুরু, সেটা ধরা।' },
  { number: 2, code: 'SG-02', title: 'Connected Speech Decoder', titleBn: 'Connected Speech Decoder', skill: 'Linking, assimilation, elision, and connected speech.', skillBn: 'Linking, assimilation, elision — শব্দ জোড়া লাগা স্বাভাবিক কথা বোঝা।' },
  { number: 3, code: 'SG-03', title: 'Weak Forms Hunter', titleBn: 'Weak Forms Hunter', skill: 'Schwa, weak forms, strong forms, and sentence stress.', skillBn: 'Schwa, weak form, strong form আর sentence stress ধরা।' },
  { number: 4, code: 'SG-04', title: 'Sound Contrast Lab', titleBn: 'Sound Contrast Lab', skill: 'Vowel discrimination, consonant discrimination, final sounds, and word endings.', skillBn: 'Vowel, consonant, শব্দের শেষের sound আলাদা করা।' },
  { number: 5, code: 'SG-05', title: 'Numbers, Names & Spelling', titleBn: 'Numbers, Names & Spelling', skill: 'Numbers, dates, prices, times, names, spelling, and self-correction.', skillBn: 'Number, date, price, time, name, spelling আর কথার মাঝে নিজের correction ধরা।' },
  { number: 6, code: 'SG-06', title: 'Natural Speech Challenge', titleBn: 'Natural Speech Challenge', skill: 'Integrated natural listening, speaker tracking, accent recognition, and academic listening.', skillBn: 'স্বাভাবিক কথা, speaker tracking, accent আর academic listening — সবকিছু একসাথে।' },
];

/** Builds one Sound Gym lesson's 6 stages, each wired to its real manifest audio asset, content left honestly empty. */
function buildSoundGymLesson(def: (typeof SOUND_GYM_LESSON_DEFS)[number]): Lesson {
  const lessonId = `sg-${String(def.number).padStart(2, '0')}`;
  const assets = audioAssetsForLesson(lessonId);
  const stages: Stage[] = SOUND_GYM_STAGE_ORDER.map((kind, i) => {
    const asset = assets[i];
    return {
      id: `${lessonId}-${kind}`,
      kind,
      audioAssetId: asset?.assetId,
      // Real audio is delivered and wired in (see lib/listening/audio-manifest.ts); the script,
      // questions and answer key for this stage have not been delivered, so `content` stays
      // unset rather than invented. `instructions` carries only facts the production report
      // actually states (speaker, QA status) — never a transcript.
      contentStatus: 'audio-delivered',
      content: asset
        ? {
            instructions: `Voice: ${speakerLine(asset)}. ${asset.productionQA === 'passed' ? 'Production checks passed' : 'Audio delivered, pending a human listening check'} — ${asset.qaNote}`,
          }
        : undefined,
    };
  });
  return {
    id: lessonId,
    moduleId: 'sound-gym',
    number: def.number,
    code: def.code,
    title: { en: def.title, bn: def.titleBn },
    skill: { en: def.skill, bn: def.skillBn },
    objective: { en: `Train: ${def.skill}`, bn: def.skillBn },
    estimatedMinutes: 15,
    difficulty: def.number <= 2 ? 1 : def.number <= 4 ? 2 : 3,
    skillTags: [def.code],
    stages,
    status: 'audio-delivered',
  };
}

const SOUND_GYM_LESSONS: Lesson[] = SOUND_GYM_LESSON_DEFS.map(buildSoundGymLesson);

export const LISTENING_MODULES: Module[] = [
  {
    id: 'sound-gym',
    number: 1,
    title: { en: 'Sound Gym', bn: 'Sound Gym' },
    purpose: {
      en: 'Train your ability to recognise speech sounds, decode natural pronunciation, distinguish similar sounds, and accurately identify spoken information.',
      bn: 'কথা বলা English-এর sound চেনা, স্বাভাবিক উচ্চারণ বোঝা, কাছাকাছি sound আলাদা করা, আর শোনা তথ্য ঠিকভাবে ধরতে পারা।',
    },
    learningAreas: [
      { en: 'Speech segmentation and word boundaries', bn: 'কথার মধ্যে শব্দের সীমা' },
      { en: 'Connected speech: linking, assimilation, elision', bn: 'Connected speech: linking, assimilation, elision' },
      { en: 'Weak forms, strong forms, sentence stress', bn: 'Weak form, strong form, sentence stress' },
      { en: 'Vowel and consonant discrimination', bn: 'Vowel আর consonant আলাদা করা' },
      { en: 'Numbers, names, spelling and self-correction', bn: 'Number, name, spelling আর self-correction' },
      { en: 'Natural speech, speaker tracking, accent recognition', bn: 'স্বাভাবিক কথা, speaker tracking, accent চেনা' },
    ],
    status: 'audio-delivered',
    lessons: SOUND_GYM_LESSONS,
  },
  {
    id: 'speech-decoder',
    number: 2,
    title: { en: 'Speech Decoder', bn: 'Speech Decoder' },
    purpose: { en: 'Understand how natural spoken English is constructed and decoded.', bn: 'স্বাভাবিক কথা বলা English কীভাবে গঠিত হয় আর কীভাবে বোঝা যায়, সেটা শেখা।' },
    learningAreas: [
      { en: 'Sentence structure in spoken English', bn: 'কথা বলার সময় বাক্যের গঠন' },
      { en: 'Reduced expressions', bn: 'Reduced expression' },
      { en: 'Pronoun and reference tracking', bn: 'Pronoun আর reference ট্র্যাক করা' },
      { en: 'Paraphrasing in spoken language', bn: 'কথায় paraphrase' },
      { en: 'Meaning from context', bn: 'প্রসঙ্গ থেকে অর্থ বোঝা' },
      { en: 'Vocabulary recognition in natural speech', bn: 'স্বাভাবিক কথায় vocabulary চেনা' },
      { en: 'Spoken grammar patterns', bn: 'কথা বলার grammar pattern' },
      { en: 'Connecting individual words to overall meaning', bn: 'আলাদা আলাদা শব্দ থেকে পুরো অর্থে পৌঁছানো' },
    ],
    status: 'in-development',
    lessons: [],
  },
  {
    id: 'conversation-intelligence',
    number: 3,
    title: { en: 'Conversation Intelligence', bn: 'Conversation Intelligence' },
    purpose: { en: 'Understand conversations, not just hear individual words.', bn: 'শুধু শব্দ শোনা না, পুরো কথোপকথন বোঝা।' },
    learningAreas: [
      { en: 'Identifying speakers', bn: 'Speaker চেনা' },
      { en: 'Understanding speaker intentions', bn: 'Speaker আসলে কী বলতে চাইছে বোঝা' },
      { en: 'Following turn-taking', bn: 'কে কখন কথা বলছে ফলো করা' },
      { en: 'Recognising agreement and disagreement', bn: 'Agreement আর disagreement ধরা' },
      { en: 'Understanding opinions and attitudes', bn: 'মতামত আর মনোভাব বোঝা' },
      { en: 'Identifying corrections and changes in information', bn: 'তথ্যের correction বা পরিবর্তন ধরা' },
      { en: 'Following discussions with multiple speakers', bn: 'একাধিক speaker-এর আলোচনা ফলো করা' },
      { en: 'Extracting important details from conversations', bn: 'কথোপকথন থেকে গুরুত্বপূর্ণ তথ্য বের করা' },
    ],
    status: 'in-development',
    lessons: [],
  },
  {
    id: 'academic-mind',
    number: 4,
    title: { en: 'Academic Mind', bn: 'Academic Mind' },
    purpose: { en: 'Prepare for academic listening and complex spoken information.', bn: 'Academic listening আর জটিল কথ্য তথ্যের জন্য প্রস্তুত হওয়া।' },
    learningAreas: [
      { en: 'Academic lectures', bn: 'Academic lecture' },
      { en: 'Main ideas and supporting details', bn: 'মূল ধারণা আর supporting detail' },
      { en: 'Lecture structure', bn: 'Lecture-এর গঠন' },
      { en: 'Signposting language', bn: 'Signposting language' },
      { en: 'Cause and effect', bn: 'কারণ ও ফল' },
      { en: 'Comparisons and contrasts', bn: 'তুলনা আর বৈপরীত্য' },
      { en: 'Examples and explanations', bn: 'উদাহরণ আর ব্যাখ্যা' },
      { en: 'Note-taking', bn: 'Note-taking' },
      { en: 'Following complex arguments', bn: 'জটিল যুক্তি ফলো করা' },
      { en: 'Academic vocabulary in context', bn: 'প্রসঙ্গ অনুযায়ী academic vocabulary' },
    ],
    status: 'in-development',
    lessons: [],
  },
  {
    id: 'accent-world',
    number: 5,
    title: { en: 'Accent World', bn: 'Accent World' },
    purpose: { en: 'Improve comprehension across different English accents.', bn: 'বিভিন্ন English accent বোঝার ক্ষমতা বাড়ানো।' },
    learningAreas: [
      { en: 'British English', bn: 'British English' },
      { en: 'Australian English', bn: 'Australian English' },
      { en: 'American English', bn: 'American English' },
      { en: 'Other relevant English varieties', bn: 'অন্য প্রাসঙ্গিক English accent' },
      { en: 'Pronunciation variation', bn: 'উচ্চারণের ভিন্নতা' },
      { en: 'Accent-related vocabulary differences', bn: 'Accent অনুযায়ী vocabulary-র পার্থক্য' },
      { en: 'Natural speaking rhythm', bn: 'কথা বলার স্বাভাবিক rhythm' },
      { en: 'Speaker identification', bn: 'Speaker চেনা' },
      { en: 'Understanding unfamiliar accents without panic', bn: 'অচেনা accent শুনে ঘাবড়ে না যাওয়া' },
    ],
    status: 'in-development',
    lessons: [],
  },
  {
    id: 'ielts-transfer-zone',
    number: 6,
    title: { en: 'IELTS Transfer Zone', bn: 'IELTS Transfer Zone' },
    purpose: {
      en: 'Convert the listening skills built in the other five modules into real IELTS Listening performance.',
      bn: 'বাকি পাঁচটা module-এ শেখা skill, আসল IELTS Listening performance-এ রূপান্তর করা।',
    },
    learningAreas: [
      { en: 'IELTS Listening Section 1–4', bn: 'IELTS Listening Section ১–৪' },
      { en: 'Form, note, table and sentence completion', bn: 'Form, note, table আর sentence completion' },
      { en: 'Multiple choice and matching', bn: 'Multiple choice আর matching' },
      { en: 'Map and plan labelling', bn: 'Map আর plan labelling' },
      { en: 'Short-answer questions', bn: 'Short-answer question' },
      { en: 'Distractor recognition', bn: 'Distractor চেনা' },
      { en: 'Synonym and paraphrase recognition', bn: 'Synonym আর paraphrase চেনা' },
      { en: 'Time management', bn: 'Time management' },
      { en: 'Full-length listening tests', bn: 'পুরো length-এর listening test' },
      { en: 'Performance analysis', bn: 'Performance analysis' },
    ],
    status: 'in-development',
    lessons: [],
  },
];

export const findModule = (id: string) => LISTENING_MODULES.find((m) => m.id === id);
export const findLesson = (lessonId: string) => {
  for (const m of LISTENING_MODULES) {
    const lesson = m.lessons.find((l) => l.id === lessonId);
    if (lesson) return { module: m, lesson };
  }
  return undefined;
};
export const findStage = (lessonId: string, stageId: string) => findLesson(lessonId)?.lesson.stages.find((s) => s.id === stageId);
