/**
 * The 8-module Listening Lab curriculum tree, as data.
 *
 * Every skill below is `status: 'planned'`: no lesson, audio or exercise
 * exists for it yet. That is a true statement about this build, not a
 * placeholder to be hidden — docs/DESIGN_SYSTEM.md's "Honest states" rule
 * applies to Mino's knowledge of the app as much as to the UI, so nothing
 * here is upgraded to `'in-development'` or `'available'` until Phase 2+
 * actually ships lessons for it (`scripts/test-listening-lab.ts` enforces
 * that every status here is still one of the three valid values and that no
 * module quietly claims more than its skills do).
 */
import type { Module } from './model';

export const LISTENING_MODULES: Module[] = [
  {
    id: 'sound-recognition',
    number: 1,
    title: { en: 'Sound Recognition Lab', bn: 'Sound Recognition Lab' },
    purpose: {
      en: 'Hear spoken English the way it is actually spoken, not the way it is spelled.',
      bn: 'English যেভাবে স্পেল করা হয় না, যেভাবে আসলে বলা হয়, সেভাবে শোনার অভ্যাস।',
    },
    status: 'planned',
    skills: [
      { id: 'connected-speech', title: { en: 'Connected Speech', bn: 'Connected Speech' }, outcome: { en: 'Follow words that run into each other without a gap.', bn: 'শব্দগুলো একসাথে মিলে গেলেও বুঝতে পারা।' }, status: 'planned' },
      { id: 'linking-sounds', title: { en: 'Linking Sounds', bn: 'Linking Sounds' }, outcome: { en: 'Recognise a consonant linking into the next vowel ("turn it off" → "turnitoff").', bn: 'একটা শব্দের শেষ শব্দ পরের শব্দের শুরুর সাথে জোড়া লাগলে ধরতে পারা।' }, status: 'planned' },
      { id: 'weak-forms', title: { en: 'Weak Forms', bn: 'Weak Forms' }, outcome: { en: 'Hear "to", "for", "and" reduced to a short, unstressed sound.', bn: '"to", "for", "and"-এর মতো শব্দ দ্রুত আর হালকাভাবে বলা হলেও ধরতে পারা।' }, status: 'planned' },
      { id: 'reduced-pronunciation', title: { en: 'Reduced Pronunciation', bn: 'Reduced Pronunciation' }, outcome: { en: 'Follow a vowel shortened to a neutral "uh" sound in fast speech.', bn: 'দ্রুত কথায় vowel ছোট হয়ে "uh"-এর মতো শোনালেও বুঝতে পারা।' }, status: 'planned' },
      { id: 'contractions', title: { en: 'Contractions', bn: 'Contractions' }, outcome: { en: 'Hear "I\'ll", "we\'d", "can\'t" as one syllable, not two words.', bn: '"I\'ll", "we\'d", "can\'t"-কে একটা শব্দের মতো শুনে বুঝতে পারা।' }, status: 'planned' },
      { id: 'word-boundaries', title: { en: 'Word Boundaries', bn: 'Word Boundaries' }, outcome: { en: 'Split a run of connected speech back into the right separate words.', bn: 'দ্রুত বলা একটা বাক্যকে ঠিক কোন কোন শব্দে ভাগ করা যায় সেটা বোঝা।' }, status: 'planned' },
      { id: 'syllable-recognition', title: { en: 'Syllable Recognition', bn: 'Syllable Recognition' }, outcome: { en: 'Count and place the syllables of a word heard, not read.', bn: 'শোনা শব্দের syllable কয়টা আর কোথায়, সেটা বোঝা।' }, status: 'planned' },
      { id: 'word-stress', title: { en: 'Word Stress', bn: 'Word Stress' }, outcome: { en: 'Tell two similar words apart by which syllable is stressed.', bn: 'কোন syllable-এ জোর দেওয়া হয়েছে, সেটা দিয়ে কাছাকাছি শোনা দুটো শব্দ আলাদা করা।' }, status: 'planned' },
      { id: 'sentence-stress', title: { en: 'Sentence Stress', bn: 'Sentence Stress' }, outcome: { en: 'Find the one or two words in a sentence the speaker means to highlight.', bn: 'একটা বাক্যে speaker আসলে কোন শব্দটার ওপর জোর দিচ্ছে, সেটা ধরা।' }, status: 'planned' },
      { id: 'intonation', title: { en: 'Intonation', bn: 'Intonation' }, outcome: { en: 'Use rising/falling pitch to tell a question from a statement, or sense doubt vs certainty.', bn: 'গলার স্বরের ওঠানামা দিয়ে প্রশ্ন বনাম statement, বা সন্দেহ বনাম নিশ্চয়তা আলাদা করা।' }, status: 'planned' },
      { id: 'difficult-vowels', title: { en: 'Difficult Vowel Sounds', bn: 'Difficult Vowel Sounds' }, outcome: { en: 'Tell apart vowel sounds that Bangla speakers often confuse (e.g. /ɪ/ vs /iː/, /ʊ/ vs /uː/).', bn: 'যে vowel sound-গুলো Bangla speaker-রা গুলিয়ে ফেলেন, সেগুলো আলাদা করে শোনা।' }, status: 'planned' },
      { id: 'difficult-consonants', title: { en: 'Difficult Consonant Sounds', bn: 'Difficult Consonant Sounds' }, outcome: { en: 'Tell apart consonant sounds that are easy to confuse (e.g. /v/ vs /w/, /θ/ vs /t/).', bn: 'গুলিয়ে ফেলা হয় এমন consonant sound আলাদা করে শোনা।' }, status: 'planned' },
      { id: 'number-recognition', title: { en: 'Number Recognition', bn: 'Number Recognition' }, outcome: { en: 'Catch numbers, dates, prices and times correctly the first time, heard once.', bn: 'একবার শুনেই number, date, price, time ঠিকভাবে ধরতে পারা।' }, status: 'planned' },
      { id: 'similar-sounding-words', title: { en: 'Similar-Sounding Words', bn: 'Similar-Sounding Words' }, outcome: { en: 'Tell apart words that sound alike but mean differently (e.g. "thirteen"/"thirty").', bn: 'শুনতে কাছাকাছি কিন্তু অর্থে ভিন্ন শব্দ আলাদা করা (যেমন "thirteen" বনাম "thirty")।' }, status: 'planned' },
      { id: 'fast-speech-processing', title: { en: 'Fast Speech Processing', bn: 'Fast Speech Processing' }, outcome: { en: 'Keep up with natural, non-slowed speech without losing the thread.', bn: 'স্বাভাবিক গতির কথা, যেটা ধীর করা হয়নি, সেটা ফলো করতে পারা, মাঝখানে হারিয়ে না গিয়ে।' }, status: 'planned' },
    ],
  },
  {
    id: 'paraphrase-vocabulary',
    number: 2,
    title: { en: 'Paraphrase & Vocabulary Lab', bn: 'Paraphrase & Vocabulary Lab' },
    purpose: {
      en: 'Recognise that the audio almost never uses the question\'s exact words — only its meaning.',
      bn: 'Audio সাধারণত question-এর হুবহু শব্দ ব্যবহার করে না — অর্থটাই একই থাকে। এটা ধরতে শেখা।',
    },
    status: 'planned',
    skills: [
      { id: 'synonym-recognition', title: { en: 'Synonym Recognition', bn: 'Synonym Recognition' }, outcome: { en: 'Match a question word to its synonym in the audio, in context.', bn: 'Question-এর একটা শব্দকে audio-র synonym-এর সাথে, প্রসঙ্গ বুঝে মেলানো।' }, status: 'planned' },
      { id: 'phrase-to-phrase', title: { en: 'Phrase-to-Phrase Paraphrasing', bn: 'Phrase-to-Phrase Paraphrasing' }, outcome: { en: 'Match a whole question phrase to a differently-worded audio phrase with the same meaning.', bn: 'Question-এর পুরো একটা phrase-কে audio-র ভিন্ন শব্দে বলা কিন্তু একই অর্থের phrase-এর সাথে মেলানো।' }, status: 'planned' },
      { id: 'verb-paraphrasing', title: { en: 'Verb Paraphrasing', bn: 'Verb Paraphrasing' }, outcome: { en: 'Recognise an action described with a different verb than the question used.', bn: 'Question-এর verb-এর বদলে audio-তে ভিন্ন verb দিয়ে একই action বলা হলে ধরতে পারা।' }, status: 'planned' },
      { id: 'noun-paraphrasing', title: { en: 'Noun Paraphrasing', bn: 'Noun Paraphrasing' }, outcome: { en: 'Recognise a thing or idea named with a different noun or noun phrase.', bn: 'একই বস্তু বা ধারণা ভিন্ন noun বা noun phrase দিয়ে বলা হলে ধরতে পারা।' }, status: 'planned' },
      { id: 'adjective-paraphrasing', title: { en: 'Adjective Paraphrasing', bn: 'Adjective Paraphrasing' }, outcome: { en: 'Recognise a quality described with a different adjective of similar meaning.', bn: 'একই গুণ ভিন্ন adjective দিয়ে বলা হলে বুঝতে পারা।' }, status: 'planned' },
      { id: 'academic-paraphrasing', title: { en: 'Academic Paraphrasing', bn: 'Academic Paraphrasing' }, outcome: { en: 'Recognise everyday question wording restated in Part 4\'s more academic register.', bn: 'সাধারণভাবে লেখা question, Part 4-এ academic ভাষায় বলা হলে চিনতে পারা।' }, status: 'planned' },
      { id: 'contextual-meaning', title: { en: 'Contextual Meaning', bn: 'Contextual Meaning' }, outcome: { en: 'Use surrounding context to confirm a paraphrase, not the paraphrase alone.', bn: 'শুধু শব্দ মেলানো না, চারপাশের কথা দিয়ে অর্থটা নিশ্চিত করা।' }, status: 'planned' },
      { id: 'meaning-without-keyword', title: { en: 'Meaning Recognition Without Exact Keyword Matching', bn: 'Meaning Recognition Without Exact Keyword Matching' }, outcome: { en: 'Find the answer when no word in the audio matches the question at all.', bn: 'Question-এর কোনো শব্দ audio-তে হুবহু না থাকলেও উত্তর খুঁজে বের করা।' }, status: 'planned' },
      { id: 'question-to-audio-mapping', title: { en: 'Question-to-Audio Mapping', bn: 'Question-to-Audio Mapping' }, outcome: { en: 'Track which part of the audio a given question is answered in, in real time.', bn: 'একটা question আসলে audio-র কোন অংশে উত্তর পাচ্ছে, সেটা বাস্তব সময়ে ট্র্যাক করা।' }, status: 'planned' },
      { id: 'advanced-paraphrase', title: { en: 'Advanced Paraphrase Recognition', bn: 'Advanced Paraphrase Recognition' }, outcome: { en: 'Handle paraphrase stacked with a distractor or an opinion change in the same sentence.', bn: 'একই বাক্যে paraphrase, distractor, আর opinion change একসাথে থাকলেও সামলাতে পারা।' }, status: 'planned' },
    ],
  },
  {
    id: 'question-type-mastery',
    number: 3,
    title: { en: 'Question Type Mastery', bn: 'Question Type Mastery' },
    purpose: {
      en: 'Build a separate, reliable method for each of the 13 IELTS Listening question types.',
      bn: 'IELTS Listening-এর ১৩টা question type-এর প্রতিটার জন্য আলাদা, নির্ভরযোগ্য পদ্ধতি তৈরি করা।',
    },
    status: 'planned',
    skills: [
      { id: 'multiple-choice', title: { en: 'Multiple Choice', bn: 'Multiple Choice' }, outcome: { en: 'Read all options before listening and eliminate distractors as they are mentioned.', bn: 'শোনার আগেই সব option পড়ে রাখা, তারপর distractor বলা হলে বাদ দেওয়া।' }, status: 'planned', questionTypes: ['multiple-choice'] },
      { id: 'multiple-answer', title: { en: 'Multiple Answer Selection', bn: 'Multiple Answer Selection' }, outcome: { en: 'Track which options are confirmed and which are still open across a long turn.', bn: 'একটা লম্বা audio-তে কোন option নিশ্চিত হলো আর কোনটা এখনও খোলা, সেটা ট্র্যাক করা।' }, status: 'planned', questionTypes: ['multiple-choice-multi'] },
      { id: 'matching', title: { en: 'Matching', bn: 'Matching' }, outcome: { en: 'Match a list of items to a shorter list of options heard in a different order.', bn: 'একটা তালিকা, যেটা শোনার ক্রমে আসে না, তার সাথে ছোট option list মেলানো।' }, status: 'planned', questionTypes: ['matching'] },
      { id: 'form-completion', title: { en: 'Form Completion', bn: 'Form Completion' }, outcome: { en: 'Predict the word type (name, number, address part) each blank needs before it is said.', bn: 'প্রতিটা blank-এ কী ধরনের শব্দ (নাম, সংখ্যা, ঠিকানা) লাগবে, বলার আগেই আন্দাজ করা।' }, status: 'planned', questionTypes: ['form-completion'] },
      { id: 'note-completion', title: { en: 'Note Completion', bn: 'Note Completion' }, outcome: { en: 'Follow a note\'s structure to predict what comes next in each gap.', bn: 'Note-এর গঠন দেখে প্রতিটা gap-এ কী আসতে পারে, সেটা আগে থেকে ধরা।' }, status: 'planned', questionTypes: ['note-completion'] },
      { id: 'table-completion', title: { en: 'Table Completion', bn: 'Table Completion' }, outcome: { en: 'Use row and column headers to know exactly what each blank is asking for.', bn: 'Row আর column-এর header দেখে প্রতিটা blank আসলে কী চাইছে, সেটা বোঝা।' }, status: 'planned', questionTypes: ['table-completion'] },
      { id: 'flow-chart-completion', title: { en: 'Flow-chart Completion', bn: 'Flow-chart Completion' }, outcome: { en: 'Follow a described process step by step and fill each stage in order.', bn: 'বর্ণনা করা একটা process ধাপে ধাপে ফলো করে, প্রতিটা ধাপ ক্রম ঠিক রেখে পূরণ করা।' }, status: 'planned', questionTypes: ['flow-chart-completion'] },
      { id: 'summary-completion', title: { en: 'Summary Completion', bn: 'Summary Completion' }, outcome: { en: 'Use the summary\'s own paraphrase to predict each answer\'s word type before listening.', bn: 'Summary-র নিজের paraphrase দেখে, শোনার আগেই প্রতিটা উত্তরের word type আন্দাজ করা।' }, status: 'planned', questionTypes: ['summary-completion'] },
      { id: 'sentence-completion', title: { en: 'Sentence Completion', bn: 'Sentence Completion' }, outcome: { en: 'Use the sentence\'s own grammar to know what kind of word must fill the gap.', bn: 'বাক্যের নিজের grammar দেখে gap-এ কী ধরনের শব্দ লাগবে, সেটা বোঝা।' }, status: 'planned', questionTypes: ['sentence-completion'] },
      { id: 'short-answer', title: { en: 'Short Answer Questions', bn: 'Short Answer Questions' }, outcome: { en: 'Answer within the stated word limit without adding unnecessary words.', bn: 'দেওয়া word limit-এর মধ্যে, বাড়তি শব্দ ছাড়া উত্তর দেওয়া।' }, status: 'planned', questionTypes: ['short-answer'] },
      { id: 'map-labelling', title: { en: 'Map Labelling', bn: 'Map Labelling' }, outcome: { en: 'Follow spoken directions on a map and track the current position as it moves.', bn: 'Map-এ বলা দিকনির্দেশ অনুসরণ করা আর বর্তমান position ট্র্যাক করা।' }, status: 'planned', questionTypes: ['plan-map-diagram-labelling'], parts: [2] },
      { id: 'plan-labelling', title: { en: 'Plan Labelling', bn: 'Plan Labelling' }, outcome: { en: 'Follow a described layout of rooms or areas and place each label correctly.', bn: 'একটা জায়গার ঘর বা অংশের বর্ণনা শুনে ঠিক জায়গায় label বসানো।' }, status: 'planned', questionTypes: ['plan-map-diagram-labelling'], parts: [2] },
      { id: 'diagram-labelling', title: { en: 'Diagram Labelling', bn: 'Diagram Labelling' }, outcome: { en: 'Match spoken part-names to the correct position on a labelled diagram.', bn: 'বলা part-এর নাম diagram-এর ঠিক position-এর সাথে মেলানো।' }, status: 'planned', questionTypes: ['plan-map-diagram-labelling'], parts: [4] },
    ],
  },
  {
    id: 'part3-conversation',
    number: 4,
    title: { en: 'Part 3 Advanced Conversation Lab', bn: 'Part 3 Advanced Conversation Lab' },
    purpose: {
      en: 'Track who said what, whether they still think it, and what they finally decided — not just spot keywords.',
      bn: 'কে কী বলল, এখনও সেটাই মনে করে কি না, আর শেষে কী সিদ্ধান্ত নিল — এটা ট্র্যাক করা, শুধু keyword খোঁজা নয়।',
    },
    status: 'planned',
    skills: [
      { id: 'multiple-speaker-identification', title: { en: 'Multiple Speaker Identification', bn: 'Multiple Speaker Identification' }, outcome: { en: 'Tell two or three speakers apart by voice from the first few seconds.', bn: 'শুরুর কয়েক সেকেন্ডেই দুই বা তিন speaker-কে গলা শুনে আলাদা করা।' }, status: 'planned', parts: [3] },
      { id: 'speaker-tracking', title: { en: 'Speaker Tracking', bn: 'Speaker Tracking' }, outcome: { en: 'Keep track of who is speaking through a long turn without losing it.', bn: 'একটা লম্বা কথার মাঝে কে বলছে, সেটা হারিয়ে না ফেলা।' }, status: 'planned', parts: [3] },
      { id: 'opinion-recognition', title: { en: 'Opinion Recognition', bn: 'Opinion Recognition' }, outcome: { en: 'Recognise when a speaker is stating a personal opinion, not a fact.', bn: 'Speaker কখন নিজের মতামত বলছে, আর কখন সত্যি তথ্য বলছে, সেটা আলাদা করা।' }, status: 'planned', parts: [3] },
      { id: 'agreement-disagreement', title: { en: 'Agreement and Disagreement', bn: 'Agreement and Disagreement' }, outcome: { en: 'Recognise clear agreement and disagreement, including polite or indirect disagreement.', bn: 'স্পষ্ট agreement আর disagreement ধরা, নরম বা ঘুরিয়ে বলা disagreement-ও।' }, status: 'planned', parts: [3] },
      { id: 'partial-agreement', title: { en: 'Partial Agreement', bn: 'Partial Agreement' }, outcome: { en: 'Recognise "yes, but…" as agreeing with one part and not another.', bn: '"হ্যাঁ, কিন্তু…" ধরনের কথা যে একটা অংশে একমত আর আরেকটায় না, সেটা ধরা।' }, status: 'planned', parts: [3] },
      { id: 'opinion-changes', title: { en: 'Opinion Changes', bn: 'Opinion Changes' }, outcome: { en: 'Notice when a speaker changes their mind mid-conversation.', bn: 'কথার মাঝে speaker মত বদলালে সেটা খেয়াল করা।' }, status: 'planned', parts: [3] },
      { id: 'initial-idea-vs-final-decision', title: { en: 'Initial Idea vs Final Decision', bn: 'Initial Idea vs Final Decision' }, outcome: { en: 'Answer with the final decision, not the first idea mentioned and later dropped.', bn: 'প্রথমে বলা আর পরে বাদ দেওয়া idea না, শেষ সিদ্ধান্ত দিয়ে উত্তর দেওয়া।' }, status: 'planned', parts: [3] },
      { id: 'distractor-recognition', title: { en: 'Distractor Recognition', bn: 'Distractor Recognition' }, outcome: { en: 'Recognise a plausible-sounding option raised and then rejected.', bn: 'শুনতে ঠিক মনে হওয়া একটা option আসলে পরে বাতিল হয়ে গেলে সেটা ধরা।' }, status: 'planned', parts: [3] },
      { id: 'rejected-options', title: { en: 'Rejected Options', bn: 'Rejected Options' }, outcome: { en: 'Hold on to the exact language a speaker uses to reject an option.', bn: 'একটা option বাতিল করার সময় speaker ঠিক কোন ভাষা ব্যবহার করে, সেটা মনে রাখা।' }, status: 'planned', parts: [3] },
      { id: 'similar-sounding-options', title: { en: 'Similar-Sounding Options', bn: 'Similar-Sounding Options' }, outcome: { en: 'Tell apart two answer options that sound almost the same.', bn: 'শুনতে প্রায় একই রকম দুটো option আলাদা করা।' }, status: 'planned', parts: [3] },
      { id: 'part3-paraphrase-detection', title: { en: 'Paraphrase Detection', bn: 'Paraphrase Detection' }, outcome: { en: 'Recognise a question\'s idea restated across two speakers\' exchange.', bn: 'একটা question-এর ধারণা দুই speaker-এর কথার মধ্যে ছড়িয়ে থাকলেও ধরতে পারা।' }, status: 'planned', parts: [3] },
      { id: 'fast-dialogue-processing', title: { en: 'Fast Dialogue Processing', bn: 'Fast Dialogue Processing' }, outcome: { en: 'Follow natural back-and-forth speech, including interruptions, at test speed.', bn: 'স্বাভাবিক গতিতে একজনের কথার মাঝে আরেকজন ঢুকে পড়া সহ, কথোপকথন ফলো করা।' }, status: 'planned', parts: [3] },
      { id: 'answer-timing', title: { en: 'Answer Timing', bn: 'Answer Timing' }, outcome: { en: 'Choose the right moment to lock in an answer instead of too early.', bn: 'খুব আগেই সিদ্ধান্ত না নিয়ে, ঠিক সময়ে উত্তর নিশ্চিত করা।' }, status: 'planned', parts: [3] },
      { id: 'matching-opinions', title: { en: 'Matching Opinions', bn: 'Matching Opinions' }, outcome: { en: 'Match each speaker to their own opinion when options list several views.', bn: 'একাধিক মতামতের মধ্যে কোনটা কোন speaker-এর, সেটা মেলানো।' }, status: 'planned', parts: [3] },
      { id: 'reference-tracking', title: { en: 'Reference Tracking', bn: 'Reference Tracking' }, outcome: { en: 'Resolve "it", "that" and "this one" to the thing a speaker means.', bn: '"it", "that", "this one"-এর মতো শব্দ আসলে কী বোঝাচ্ছে, সেটা ঠিকভাবে ধরা।' }, status: 'planned', parts: [3] },
      { id: 'part3-multiple-choice-strategies', title: { en: 'Multiple Choice Strategies', bn: 'Multiple Choice Strategies' }, outcome: { en: 'Combine speaker tracking, distractor recognition and timing into one method for Part 3 MCQs.', bn: 'Speaker tracking, distractor recognition আর timing — এই তিনটা মিলিয়ে Part 3 MCQ-র একটা পদ্ধতি তৈরি করা।' }, status: 'planned', parts: [3], questionTypes: ['multiple-choice', 'multiple-choice-multi'] },
    ],
  },
  {
    id: 'part4-lecture',
    number: 5,
    title: { en: 'Part 4 Academic Lecture Lab', bn: 'Part 4 Academic Lecture Lab' },
    purpose: {
      en: 'Follow one long academic monologue, predict its structure and keep spelling exact under time pressure.',
      bn: 'একটা লম্বা academic lecture ফলো করা, এর গঠন আগে থেকে ধরা, আর সময়ের চাপেও spelling ঠিক রাখা।',
    },
    status: 'planned',
    skills: [
      { id: 'lecture-structure', title: { en: 'Lecture Structure Recognition', bn: 'Lecture Structure Recognition' }, outcome: { en: 'Recognise the usual shape of an academic lecture: intro, main points, examples, summary.', bn: 'Academic lecture-এর স্বাভাবিক গঠন চেনা: শুরু, মূল পয়েন্ট, উদাহরণ, সারসংক্ষেপ।' }, status: 'planned', parts: [4] },
      { id: 'introduction-topic-prediction', title: { en: 'Introduction and Topic Prediction', bn: 'Introduction and Topic Prediction' }, outcome: { en: 'Use the opening sentences to predict what the lecture will cover.', bn: 'শুরুর কথা শুনে lecture-এ কী আসবে, সেটা আগে থেকে আন্দাজ করা।' }, status: 'planned', parts: [4] },
      { id: 'signposting-words', title: { en: 'Signposting Words', bn: 'Signposting Words' }, outcome: { en: 'Use "however", "in addition", "for example" to know what kind of information is coming.', bn: '"however", "in addition", "for example"-এর মতো শব্দ দিয়ে বোঝা পরে কী ধরনের তথ্য আসছে।' }, status: 'planned', parts: [4] },
      { id: 'academic-vocabulary', title: { en: 'Academic Vocabulary', bn: 'Academic Vocabulary' }, outcome: { en: 'Recognise common academic/lecture vocabulary by ear, not only in writing.', bn: 'সাধারণ academic/lecture vocabulary শুনে চেনা, শুধু লেখায় না।' }, status: 'planned', parts: [4] },
      { id: 'part4-note-completion', title: { en: 'Note Completion', bn: 'Note Completion' }, outcome: { en: 'Fill lecture notes using the gap\'s position in the outline to predict its content.', bn: 'Outline-এ gap-টা কোথায় আছে, সেটা দেখে lecture note-এর ফাঁকা জায়গা পূরণ করা।' }, status: 'planned', parts: [4], questionTypes: ['note-completion'] },
      { id: 'part4-sentence-completion', title: { en: 'Sentence Completion', bn: 'Sentence Completion' }, outcome: { en: 'Fill a sentence gap that must agree with the lecture\'s own grammar.', bn: 'Lecture-এর নিজের grammar মিলিয়ে বাক্যের গ্যাপ পূরণ করা।' }, status: 'planned', parts: [4], questionTypes: ['sentence-completion'] },
      { id: 'word-formation', title: { en: 'Word Formation', bn: 'Word Formation' }, outcome: { en: 'Write the correct word form (noun/verb/adjective) the gap\'s grammar needs.', bn: 'Gap-এর grammar অনুযায়ী ঠিক word form (noun/verb/adjective) লেখা।' }, status: 'planned', parts: [4] },
      { id: 'singular-plural', title: { en: 'Singular and Plural', bn: 'Singular and Plural' }, outcome: { en: 'Write singular or plural exactly as heard, never guessed from context alone.', bn: 'শোনা অনুযায়ী ঠিক singular না plural লেখা, শুধু আন্দাজে না।' }, status: 'planned', parts: [4] },
      { id: 'part4-spelling-accuracy', title: { en: 'Spelling Accuracy', bn: 'Spelling Accuracy' }, outcome: { en: 'Spell academic and technical words correctly from how they sound.', bn: 'Academic আর technical শব্দ শুনে ঠিক spelling লেখা।' }, status: 'planned', parts: [4] },
      { id: 'technical-terminology', title: { en: 'Technical Terminology', bn: 'Technical Terminology' }, outcome: { en: 'Recognise subject-specific terms (biology, geography, history, …) by ear.', bn: 'বিষয়-নির্দিষ্ট (biology, geography, history ইত্যাদি) পরিভাষা শুনে চেনা।' }, status: 'planned', parts: [4] },
      { id: 'part4-number-recognition', title: { en: 'Number Recognition', bn: 'Number Recognition' }, outcome: { en: 'Catch dates, statistics and measurements inside a long academic sentence.', bn: 'লম্বা academic বাক্যের মধ্যে date, statistic, measurement ধরা।' }, status: 'planned', parts: [4] },
      { id: 'long-sentence-processing', title: { en: 'Long Sentence Processing', bn: 'Long Sentence Processing' }, outcome: { en: 'Hold the main point of a long, multi-clause academic sentence while it is spoken.', bn: 'একটা লম্বা, কয়েক ধারার academic বাক্য বলার সময় এর মূল কথা মনে রাখা।' }, status: 'planned', parts: [4] },
      { id: 'lecture-information-tracking', title: { en: 'Lecture Information Tracking', bn: 'Lecture Information Tracking' }, outcome: { en: 'Keep track of which point in the outline is being discussed right now.', bn: 'এখন outline-এর কোন পয়েন্ট নিয়ে কথা হচ্ছে, সেটা ট্র্যাক করা।' }, status: 'planned', parts: [4] },
      { id: 'answer-prediction', title: { en: 'Answer Prediction', bn: 'Answer Prediction' }, outcome: { en: 'Predict the word type and rough meaning of an answer before it is said.', bn: 'উত্তরটা বলার আগেই এর word type আর মোটামুটি অর্থ আন্দাজ করা।' }, status: 'planned', parts: [4] },
      { id: 'part4-distractor-recognition', title: { en: 'Distractor Recognition', bn: 'Distractor Recognition' }, outcome: { en: 'Recognise a lecturer mentioning something only to contrast it with the real answer.', bn: 'Lecturer একটা কথা শুধু তুলনা করার জন্য বলছে, আসল উত্তর না — সেটা ধরা।' }, status: 'planned', parts: [4] },
    ],
  },
  {
    id: 'accent-speed',
    number: 6,
    title: { en: 'Accent & Speed Training', bn: 'Accent & Speed Training' },
    purpose: {
      en: 'Build comfort with natural British, Australian, New Zealand and American speech, at increasing speed and complexity.',
      bn: 'স্বাভাবিক British, Australian, New Zealand আর American কথার সাথে অভ্যস্ত হওয়া, ধাপে ধাপে গতি আর জটিলতা বাড়িয়ে।',
    },
    status: 'planned',
    skills: [
      { id: 'british-english', title: { en: 'British English', bn: 'British English' }, outcome: { en: 'Follow natural British speech comfortably.', bn: 'স্বাভাবিক British কথা সহজে বুঝতে পারা।' }, status: 'planned' },
      { id: 'australian-english', title: { en: 'Australian English', bn: 'Australian English' }, outcome: { en: 'Follow natural Australian speech comfortably.', bn: 'স্বাভাবিক Australian কথা সহজে বুঝতে পারা।' }, status: 'planned' },
      { id: 'new-zealand-english', title: { en: 'New Zealand English', bn: 'New Zealand English' }, outcome: { en: 'Follow natural New Zealand speech comfortably.', bn: 'স্বাভাবিক New Zealand কথা সহজে বুঝতে পারা।' }, status: 'planned' },
      { id: 'american-english', title: { en: 'American English', bn: 'American English' }, outcome: { en: 'Follow natural American speech comfortably.', bn: 'স্বাভাবিক American কথা সহজে বুঝতে পারা।' }, status: 'planned' },
      { id: 'speed-progression', title: { en: 'Speed Progression', bn: 'Speed Progression' }, outcome: { en: 'Move from clear, comfortable speech through to realistic academic speed without losing comprehension.', bn: 'পরিষ্কার, ধীর কথা থেকে শুরু করে বাস্তব academic গতি পর্যন্ত, না হারিয়ে বুঝতে পারা।' }, status: 'planned' },
    ],
  },
  {
    id: 'spelling-accuracy',
    number: 7,
    title: { en: 'Spelling & Answer Accuracy Lab', bn: 'Spelling & Answer Accuracy Lab' },
    purpose: {
      en: 'Stop losing marks on answers that were heard correctly but written wrong.',
      bn: 'ঠিকভাবে শুনেও লেখায় ভুল হয়ে মার্ক হারানো — এটা বন্ধ করা।',
    },
    status: 'planned',
    skills: [
      { id: 'common-spelling-errors', title: { en: 'Common Spelling Errors', bn: 'Common Spelling Errors' }, outcome: { en: 'Avoid the specific spelling mistakes Bangla-speaking learners make most often.', bn: 'Bangla-ভাষী শিক্षार्थীরা যেসব spelling ভুল সবচেয়ে বেশি করেন, সেগুলো এড়ানো।' }, status: 'planned' },
      { id: 'spelling-similar-sounding-words', title: { en: 'Similar-Sounding Words', bn: 'Similar-Sounding Words' }, outcome: { en: 'Write the correct one of two similar-sounding words from context, not sound alone.', bn: 'শুধু আওয়াজ না, প্রসঙ্গ দিয়ে কাছাকাছি শোনা দুটো শব্দের মধ্যে ঠিকটা লেখা।' }, status: 'planned' },
      { id: 'spelling-singular-plural', title: { en: 'Singular and Plural', bn: 'Singular and Plural' }, outcome: { en: 'Write the "s" (or its absence) exactly as heard.', bn: 'যেমন শোনা গেছে, ঠিক সেভাবে "s" লেখা বা না লেখা।' }, status: 'planned' },
      { id: 'word-endings', title: { en: 'Word Endings', bn: 'Word Endings' }, outcome: { en: 'Catch and write word endings (-ed, -ing, -s) that are easy to miss in fast speech.', bn: 'দ্রুত কথায় মিস হয়ে যাওয়া word ending (-ed, -ing, -s) ধরে লেখা।' }, status: 'planned' },
      { id: 'verb-forms', title: { en: 'Verb Forms', bn: 'Verb Forms' }, outcome: { en: 'Write the correct verb form (tense, agreement) the context requires.', bn: 'প্রসঙ্গ অনুযায়ী ঠিক verb form (tense, agreement) লেখা।' }, status: 'planned' },
      { id: 'noun-forms', title: { en: 'Noun Forms', bn: 'Noun Forms' }, outcome: { en: 'Write the correct noun form the grammar of the gap requires.', bn: 'Gap-এর grammar অনুযায়ী ঠিক noun form লেখা।' }, status: 'planned' },
      { id: 'numbers-and-dates', title: { en: 'Numbers and Dates', bn: 'Numbers and Dates' }, outcome: { en: 'Write numbers and dates in an accepted IELTS format without digit or format errors.', bn: 'Number আর date, IELTS-এ মেনে নেওয়া format-এ, কোনো digit বা format ভুল না করে লেখা।' }, status: 'planned' },
      { id: 'names-and-addresses', title: { en: 'Names and Addresses', bn: 'Names and Addresses' }, outcome: { en: 'Spell names and addresses letter-by-letter when spelled aloud, including corrections.', bn: 'নাম আর ঠিকানা, letter-by-letter spell করা হলে, correction সহ ঠিকভাবে লেখা।' }, status: 'planned', parts: [1] },
      { id: 'british-spelling', title: { en: 'British Spelling Variations', bn: 'British Spelling Variations' }, outcome: { en: 'Use British spelling (colour, centre, organise) consistently, as the test expects.', bn: 'Test যেমন চায়, British spelling (colour, centre, organise) ঠিকভাবে ব্যবহার করা।' }, status: 'planned' },
      { id: 'word-limit-compliance', title: { en: 'Word-Limit Compliance', bn: 'Word-Limit Compliance' }, outcome: { en: 'Stay within the stated word limit every time, without losing meaning.', bn: 'অর্থ না হারিয়ে, প্রতিবার দেওয়া word limit-এর মধ্যে থাকা।' }, status: 'planned' },
      { id: 'completion-grammar', title: { en: 'Grammar in Completion Answers', bn: 'Grammar in Completion Answers' }, outcome: { en: 'Make a completion answer fit the grammar of the sentence it completes.', bn: 'যে বাক্য পূরণ করা হচ্ছে, তার grammar-এর সাথে উত্তরটা মিলিয়ে লেখা।' }, status: 'planned' },
    ],
  },
  {
    id: 'exam-simulation',
    number: 8,
    title: { en: 'Exam Simulation & Performance Lab', bn: 'Exam Simulation & Performance Lab' },
    purpose: {
      en: 'Practise under real test conditions and read a personal performance record — no hints, no replay, no shortcuts.',
      bn: 'আসল test-এর নিয়মে practice করা আর নিজের performance-এর রেকর্ড দেখা — কোনো hint, replay বা shortcut ছাড়া।',
    },
    status: 'planned',
    skills: [
      { id: 'section-wise-practice', title: { en: 'Section-wise Practice', bn: 'Section-wise Practice' }, outcome: { en: 'Practise one part at a time under timed conditions.', bn: 'একবারে একটা part, সময় ধরে practice করা।' }, status: 'planned' },
      { id: 'full-length-simulation', title: { en: 'Full-length Listening Simulations', bn: 'Full-length Listening Simulations' }, outcome: { en: 'Sit a complete 4-part, 40-question test exactly like exam day.', bn: 'Exam day-র মতোই, পুরো ৪-part, ৪০-question test দেওয়া।' }, status: 'planned' },
      { id: 'prediction-training', title: { en: 'Prediction Training', bn: 'Prediction Training' }, outcome: { en: 'Use preview time to predict answers before any audio plays.', bn: 'Audio শুরু হওয়ার আগে, preview-এর সময়টা দিয়ে উত্তর আন্দাজ করা।' }, status: 'planned' },
      { id: 'question-transition', title: { en: 'Question Transition Training', bn: 'Question Transition Training' }, outcome: { en: 'Move cleanly from one question to the next without losing the next one\'s start.', bn: 'এক question থেকে পরেরটায় যাওয়ার সময় পরেরটার শুরু মিস না করা।' }, status: 'planned' },
      { id: 'concentration-recovery', title: { en: 'Concentration Recovery', bn: 'Concentration Recovery' }, outcome: { en: 'Recover and rejoin after losing focus on one question, instead of losing several.', bn: 'একটা question-এ মনোযোগ হারালেও, পরেরগুলো না হারিয়ে ফিরে আসা।' }, status: 'planned' },
      { id: 'answer-transfer-checking', title: { en: 'Answer Transfer and Checking', bn: 'Answer Transfer and Checking' }, outcome: { en: 'Use the checking time to verify spelling and word limits without second-guessing correct answers.', bn: 'সঠিক উত্তর নিয়ে না ভেবে, checking time-টা spelling আর word limit যাচাইয়ে ব্যবহার করা।' }, status: 'planned' },
      { id: 'performance-analytics', title: { en: 'Personal Performance Analytics', bn: 'Personal Performance Analytics' }, outcome: { en: 'Read a personal record of accuracy, timing and recurring error codes over time.', bn: 'সময়ের সাথে নিজের accuracy, timing আর বারবার হওয়া error code-এর রেকর্ড দেখা।' }, status: 'planned' },
    ],
  },
];

export const findModule = (id: string): Module | undefined => LISTENING_MODULES.find((m) => m.id === id);

export const findSkill = (moduleId: string, skillId: string): { module: Module; skill: Module['skills'][number] } | undefined => {
  const module = findModule(moduleId);
  const skill = module?.skills.find((s) => s.id === skillId);
  return module && skill ? { module, skill } : undefined;
};

/** `${moduleId}:${skillId}` reference used by `PartDashboard.skillRefs`. */
export const resolveSkillRef = (ref: string) => {
  const [moduleId, skillId] = ref.split(':');
  return findSkill(moduleId, skillId);
};
