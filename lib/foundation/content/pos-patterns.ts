import type { L } from '../model';
import { l } from './pos-kit';

/**
 * Mistake patterns for targeted fixes. Two kinds share one system:
 * - job pairs "expected>chosen" (e.g. adjective>adverb), recorded from `pos` / `wrongPos`;
 * - named patterns (e.g. sv-agreement), recorded from an exercise's `pattern`.
 * Each has a short rule (before the fix) and a guide (after it): why it happens,
 * how to recognise it, how to avoid it.
 */
export interface FixGuide {
  rule: L;
  why: L;
  recognise: L;
  avoid: L;
}

/**
 * Named patterns: their name, the modules whose pages offer the fix (the first
 * is "home") and, for Parts of Speech, the unit that teaches the idea.
 */
export const POS_NAMED_PATTERNS: Record<string, { title: L; modules: string[]; unit?: string }> = {
  'sv-agreement': { title: l('Subject–verb agreement', 'Subject–verb agreement'), modules: ['parts-of-speech', 'tenses'], unit: 'lab' },
  'verb-form': { title: l('Verb form after helping verbs', 'Helping verb-এর পরে verb form'), modules: ['parts-of-speech', 'tenses'], unit: 'verb' },
  'noun-count': { title: l('Countable and uncountable nouns', 'Countable আর uncountable noun'), modules: ['parts-of-speech'], unit: 'noun' },
  'pronoun-form': { title: l('Pronoun forms (he/she, its/it’s, their/there)', 'Pronoun form (he/she, its/it’s, their/there)'), modules: ['parts-of-speech'], unit: 'pronoun' },
  'prep-choice': { title: l('Choosing the preposition', 'সঠিক preposition বাছা'), modules: ['parts-of-speech'], unit: 'preposition' },
  'conj-logic': { title: l('Joining ideas with the right word', 'ঠিক word দিয়ে idea জোড়া'), modules: ['parts-of-speech'], unit: 'conjunction' },
  'past-vs-perfect': { title: l('Past Simple or Present Perfect', 'Past Simple নাকি Present Perfect'), modules: ['tenses'] },
  'simple-vs-continuous': { title: l('Simple or continuous', 'Simple নাকি continuous'), modules: ['tenses'] },
  'tense-time': { title: l('Time words decide the tense', 'Time word-ই tense ঠিক করে'), modules: ['tenses'] },
};

/** Which module page a pattern's fix belongs to ("expected>chosen" pairs are Parts of Speech). */
export const patternModules = (key: string): string[] => POS_NAMED_PATTERNS[key]?.modules ?? ['parts-of-speech'];

/** Exercises of these concepts check the named pattern unless they say otherwise (tagging aside). */
export const CONCEPT_PATTERN: Record<string, string> = {
  'pos-preposition': 'prep-choice',
  'pos-conjunction': 'conj-logic',
  'pos-pronoun': 'pronoun-form',
};

export const POS_FIX_GUIDE: Record<string, FixGuide> = {
  'adjective>adverb': {
    rule: l(
      'Is it describing a noun? Then use an adjective: effective measures, a sharp rise. After be / feel / seem / look, use an adjective too: I feel bad, the results were surprising.',
      'Word-টা কি একটা noun-কে describe করছে? তাহলে adjective: effective measures, a sharp rise। be / feel / seem / look-এর পরেও adjective: I feel bad, the results were surprising।',
    ),
    why: l('"-ly" sounds more formal, so it is easy to add it everywhere. But -ly words describe actions, not things.', '"-ly" বেশি formal শোনায়, তাই সব জায়গায় বসাতে ইচ্ছা করে। কিন্তু -ly word কাজকে describe করে, জিনিসকে না।'),
    recognise: l('Look at the next word. If it is a noun (measures, rise, city), the gap describes a thing → adjective.', 'পরের word দেখো। সেটা noun হলে (measures, rise, city) gap-টা একটা জিনিসকে describe করছে → adjective।'),
    avoid: l('Before writing -ly, ask: "what am I describing?" Thing → adjective. Action → adverb.', '-ly লেখার আগে জিজ্ঞেস করো: "আমি কী describe করছি?" জিনিস → adjective। কাজ → adverb।'),
  },
  'adverb>adjective': {
    rule: l(
      'Is it describing a verb (how, how much)? Then use an adverb: rose sharply, work effectively, increased significantly. Adverbs also describe adjectives: extremely important.',
      'Word-টা কি একটা verb-কে describe করছে (কীভাবে, কতটা)? তাহলে adverb: rose sharply, work effectively, increased significantly। Adverb adjective-কেও describe করে: extremely important।',
    ),
    why: l('In Bangla the same word often works for both ("দ্রুত"), so English -ly is easy to forget.', 'বাংলায় একই word দুই কাজেই চলে ("দ্রুত"), তাই English-এ -ly ভুলে যাওয়া সহজ।'),
    recognise: l('Find the verb. If your word tells how or how much it happened (rose ___, work ___), you need -ly.', 'Verb-টা খুঁজে বের করো। তোমার word যদি বলে কাজটা কীভাবে বা কতটা হলো (rose ___, work ___), তাহলে -ly লাগবে।'),
    avoid: l('In Task 1, check every trend verb: rose / fell / increased + an adverb (sharply, slightly, steadily).', 'Task 1-এ প্রতিটা trend verb দেখো: rose / fell / increased + adverb (sharply, slightly, steadily)।'),
  },
  'noun>verb': {
    rule: l(
      'After a / the / my / this, and between "the" and "of", you need a noun: the development of, a decision, my improvement.',
      'a / the / my / this-এর পরে, আর "the" ও "of"-এর মাঝে noun লাগে: the development of, a decision, my improvement।',
    ),
    why: l('You know the idea as an action (develop, decide), so the verb comes first to mind.', 'Idea-টা তুমি কাজ হিসেবে চেনো (develop, decide), তাই verb-টাই আগে মাথায় আসে।'),
    recognise: l('a / the / my / this / of before the gap → the gap is a thing → noun (-ment, -tion, -ence).', 'Gap-এর আগে a / the / my / this / of → gap-টা একটা জিনিস → noun (-ment, -tion, -ence)।'),
    avoid: l('Learn the family together: develop → development, decide → decision, improve → improvement.', 'পুরো family একসাথে শেখো: develop → development, decide → decision, improve → improvement।'),
  },
  'verb>noun': {
    rule: l(
      'After to / can / should / must / will, you need a verb: we should protect, to improve, can succeed.',
      'to / can / should / must / will-এর পরে verb লাগে: we should protect, to improve, can succeed।',
    ),
    why: l('Academic writing uses many nouns, so a noun (improvement, success) can feel "more IELTS" even where a verb is needed.', 'Academic writing-এ অনেক noun থাকে, তাই verb দরকার এমন জায়গাতেও noun (improvement, success) বেশি "IELTS-মার্কা" মনে হয়।'),
    recognise: l('to / can / should / must / will right before the gap → base verb.', 'Gap-এর ঠিক আগে to / can / should / must / will → base verb।'),
    avoid: l('After every should / must in your essay, read the next word: it must be an action.', 'Essay-তে প্রতিটা should / must-এর পরের word পড়ো: সেটা অবশ্যই একটা কাজ হবে।'),
  },
  'noun>adjective': {
    rule: l(
      'The name of a thing or idea is a noun: the beauty of the city, economic growth → the economy. Adjectives describe; nouns name.',
      'কোনো জিনিস বা idea-র নাম হলো noun: the beauty of the city, economic growth → the economy। Adjective describe করে; noun নাম দেয়।',
    ),
    why: l('Adjectives and nouns of one family look alike (economic / economy, beautiful / beauty).', 'একই family-র adjective আর noun দেখতে কাছাকাছি (economic / economy, beautiful / beauty)।'),
    recognise: l('If nothing comes after it and it is the subject or object, it names something → noun.', 'পরে কোনো noun না থাকলে আর এটা subject বা object হলে, এটা কিছুর নাম → noun।'),
    avoid: l('Ask: "is there a noun after it that it describes?" No noun → you probably need the noun form.', 'জিজ্ঞেস করো: "এর পরে কি এমন noun আছে যাকে এটা describe করছে?" না থাকলে সম্ভবত noun form লাগবে।'),
  },
  'adjective>noun': {
    rule: l(
      'To describe a noun, use the adjective form: a beautiful city, economic benefits, a successful business.',
      'Noun-কে describe করতে adjective form লাগে: a beautiful city, economic benefits, a successful business।',
    ),
    why: l('You remember the noun (success, economy) better than its adjective.', 'Noun-টা (success, economy) adjective-এর চেয়ে বেশি মনে থাকে।'),
    recognise: l('Word + noun (___ benefits, a ___ business) → the first word describes → adjective.', 'Word + noun (___ benefits, a ___ business) → প্রথম word describe করছে → adjective।'),
    avoid: l('Learn adjective endings: -ful, -ic, -al, -ous, -ive, -able.', 'Adjective ending শেখো: -ful, -ic, -al, -ous, -ive, -able।'),
  },
  'sv-agreement': {
    rule: l(
      'Find the real subject, then match the verb: he/she/it + verb-s (He goes). "The number of…", "Everyone", "Each" are singular (is). "People", "children", "a number of…" are plural (are).',
      'আসল subject খুঁজে verb মেলাও: he/she/it + verb-s (He goes)। "The number of…", "Everyone", "Each" singular (is)। "People", "children", "a number of…" plural (are)।',
    ),
    why: l('Bangla verbs do not change for "he" in the same way, and long subjects hide the real subject (The number of students… are ✗).', 'বাংলায় "he"-র জন্য verb একইভাবে বদলায় না, আর লম্বা subject আসল subject-কে লুকিয়ে ফেলে (The number of students… are ✗)।'),
    recognise: l('Cover the "of …" part: "The number (of students) is". Ask: one thing or many?', '"of …" অংশটা ঢেকে দাও: "The number (of students) is"। জিজ্ঞেস করো: একটা না অনেকগুলো?'),
    avoid: l('After writing a sentence, underline its subject and its verb. Do they match?', 'Sentence লেখার পরে subject আর verb-এর নিচে দাগ দাও। মিলছে কি?'),
  },
  'verb-form': {
    rule: l(
      'can / should / must / will / do / does / did + base verb (can speak, does work). be + -ing or past participle (is increasing, was built), never be + base verb (is increase ✗).',
      'can / should / must / will / do / does / did + base verb (can speak, does work)। be + -ing বা past participle (is increasing, was built), কখনো be + base verb না (is increase ✗)।',
    ),
    why: l('The "-s" rule for he/she is fresh in your mind, so it slips in after can and does too (can speaks ✗).', 'he/she-এর "-s" নিয়ম মাথায় থাকে, তাই can আর does-এর পরেও চলে আসে (can speaks ✗)।'),
    recognise: l('Look at the word before the verb: a modal or do/does → base form. A form of be → -ing or -ed/3rd form.', 'Verb-এর আগের word দেখো: modal বা do/does → base form। be-এর কোনো form → -ing বা -ed/3rd form।'),
    avoid: l('Only the first verb changes. After it, the second verb has a fixed form.', 'শুধু প্রথম verb বদলায়। তার পরের verb-এর form নির্দিষ্ট।'),
  },
  'noun-count': {
    rule: l(
      'Uncountable nouns (information, advice, equipment, research, furniture) have no plural and take much / less. Countable nouns take many / fewer and need a / the / plural: many students, a job.',
      'Uncountable noun (information, advice, equipment, research, furniture)-এর plural নেই, সাথে much / less বসে। Countable noun-এর সাথে many / fewer, আর a / the / plural লাগে: many students, a job।',
    ),
    why: l('Some nouns are countable in Bangla but uncountable in English (তথ্যগুলো → information).', 'কিছু noun বাংলায় গোনা যায় কিন্তু English-এ uncountable (তথ্যগুলো → information)।'),
    recognise: l('Can you say "one ___, two ___s"? If not (one information ✗), it is uncountable.', '"one ___, two ___s" বলা যায়? না গেলে (one information ✗) এটা uncountable।'),
    avoid: l('Keep a short list of IELTS uncountables: information, advice, research, equipment, traffic, pollution, knowledge.', 'IELTS-এর uncountable-এর ছোট একটা list রাখো: information, advice, research, equipment, traffic, pollution, knowledge।'),
  },
  'pronoun-form': {
    rule: l(
      'Subject I / he / she / they; object me / him / her / them. its = belonging to it; it’s = it is. their = belonging to them; there = place / there is; they’re = they are.',
      'Subject I / he / she / they; object me / him / her / them। its = এটার; it’s = it is। their = তাদের; there = ওখানে / there is; they’re = they are।',
    ),
    why: l('Bangla "সে" is both he and she, and its / it’s and their / there sound the same.', 'বাংলায় "সে" মানে he আর she দুটোই, আর its / it’s, their / there শুনতে একই।'),
    recognise: l('Replace with the long form: "it is own culture" ✗ → so it must be "its". "they are children" ✗ → "their".', 'লম্বা form বসিয়ে দেখো: "it is own culture" ✗ → তাই "its"। "they are children" ✗ → "their"।'),
    avoid: l('Before submitting, search your text for it’s, their, there and he/she and test each one.', 'জমা দেওয়ার আগে লেখায় it’s, their, there আর he/she খুঁজে প্রতিটা পরীক্ষা করো।'),
  },
  'prep-choice': {
    rule: l(
      'Time: in (months, years), on (days, dates), at (times). Partners: depend on, focus on, discuss (no preposition). Data: rose by 5% (the change), rose to 50% (the new level), peaked at 70%.',
      'সময়: in (মাস, বছর), on (দিন, তারিখ), at (সময়)। সাথী: depend on, focus on, discuss (preposition ছাড়া)। Data: rose by 5% (পরিবর্তন), rose to 50% (নতুন মান), peaked at 70%।',
    ),
    why: l('Prepositions rarely translate one-to-one from Bangla (এর উপর নির্ভর → depend on, not depend of).', 'Preposition বাংলা থেকে এক-এক করে অনুবাদ হয় না (এর উপর নির্ভর → depend on, depend of না)।'),
    recognise: l('Look at the word before (depend, focus, rise) and after (a day, a time, a number). They choose the preposition.', 'আগের word (depend, focus, rise) আর পরের word (দিন, সময়, সংখ্যা) দেখো। ওরাই preposition ঠিক করে।'),
    avoid: l('Learn verbs with their partner as one chunk: depend on, focus on, result in, lead to.', 'Verb-কে তার সাথী সহ একটা chunk হিসেবে শেখো: depend on, focus on, result in, lead to।'),
  },
  'conj-logic': {
    rule: l(
      'because = reason; so = result; but / although = contrast; however starts a new sentence (However, …); despite + noun / -ing (despite the rain).',
      'because = কারণ; so = ফলাফল; but / although = বিপরীত; however নতুন sentence শুরু করে (However, …); despite + noun / -ing (despite the rain)।',
    ),
    why: l('The ideas are right but the link word says the wrong relation (reason vs result, contrast vs addition).', 'Idea ঠিক আছে, কিন্তু জোড়ার word ভুল সম্পর্ক বলছে (কারণ বনাম ফলাফল, বিপরীত বনাম যোগ)।'),
    recognise: l('Say the two ideas with "and that is why" or "but surprisingly". Which one sounds true?', 'দুটো idea "and that is why" বা "but surprisingly" দিয়ে বলো। কোনটা সত্যি শোনায়?'),
    avoid: l('Choose the relation first (reason, result, contrast), then the word.', 'আগে সম্পর্ক ঠিক করো (কারণ, ফলাফল, বিপরীত), তারপর word।'),
  },
  'past-vs-perfect': {
    rule: l(
      'A finished time (yesterday, last year, in 2019, ago, when I was…) → Past Simple: I visited Sylhet last year. No finished time, or a link to now (since, for, ever, never, yet, already, recently) → Present Perfect: I have visited Sylhet twice.',
      'শেষ হয়ে যাওয়া সময় (yesterday, last year, in 2019, ago, when I was…) → Past Simple: I visited Sylhet last year। শেষ সময় নেই, বা এখনের সাথে যোগ আছে (since, for, ever, never, yet, already, recently) → Present Perfect: I have visited Sylhet twice।',
    ),
    why: l('Bangla "আমি গিয়েছি" and "আমি গেলাম" both feel like "have gone", so students add "have" even when a finished time is there ("I have gone yesterday").', 'বাংলায় "আমি গিয়েছি" আর "আমি গেলাম" দুটোই "have gone"-এর মতো লাগে, তাই শেষ হওয়া সময় থাকলেও "have" বসে যায় ("I have gone yesterday")।'),
    recognise: l('Look for a time word. Can you answer "When exactly?" with a finished time? Then it is Past Simple.', 'Time word খোঁজো। "ঠিক কখন?"-এর উত্তরে শেষ হওয়া সময় আছে? তাহলে Past Simple।'),
    avoid: l('In Task 1, past years → Past Simple. Use Present Perfect only for "since…", "in recent years" or experience.', 'Task 1-এ অতীতের বছর → Past Simple। Present Perfect শুধু "since…", "in recent years" বা অভিজ্ঞতার জন্য।'),
  },
  'simple-vs-continuous': {
    rule: l(
      'Routines, permanent facts and states (know, like, want, believe, own) → simple: I work in a bank. I know him. Right now, temporary situations and changing trends → continuous: I am working late this week. Prices are rising.',
      'রুটিন, স্থায়ী সত্য আর অবস্থা (know, like, want, believe, own) → simple: I work in a bank। I know him। এই মুহূর্ত, সাময়িক অবস্থা আর বদলাতে থাকা trend → continuous: I am working late this week। Prices are rising।',
    ),
    why: l('Bangla uses "করছি" for both "I work" and "I am working", so the -ing form feels natural everywhere.', 'বাংলায় "I work" আর "I am working" দুটোতেই "করছি" চলে, তাই -ing সব জায়গায় স্বাভাবিক লাগে।'),
    recognise: l('Ask: is it happening now or only for a while? → continuous. Is it always, usually, or a state? → simple.', 'জিজ্ঞেস করো: এখন হচ্ছে বা কিছুদিনের জন্য? → continuous। সবসময়, সাধারণত, নাকি একটা অবস্থা? → simple।'),
    avoid: l('Never put -ing on know, understand, believe, want, own, need. For your job or home, use simple unless it is temporary.', 'know, understand, believe, want, own, need-এ কখনো -ing না। চাকরি বা বাসার কথায় simple, যদি না সেটা সাময়িক হয়।'),
  },
  'tense-time': {
    rule: l(
      'The time words choose the tense: yesterday, last…, ago, in 2010 → past; now, at the moment, these days → present continuous; every day, usually → present simple; since, for, so far → present perfect; tomorrow, next…, by 2030 → future; by the time + past → past perfect.',
      'Time word-ই tense বেছে দেয়: yesterday, last…, ago, in 2010 → past; now, at the moment, these days → present continuous; every day, usually → present simple; since, for, so far → present perfect; tomorrow, next…, by 2030 → future; by the time + past → past perfect।',
    ),
    why: l('Bangla verbs change less for time, so the time word often feels like enough ("Yesterday I go").', 'বাংলায় verb সময়ের সাথে কম বদলায়, তাই মনে হয় time word-ই যথেষ্ট ("Yesterday I go")।'),
    recognise: l('Underline the time word first. Then check that the verb agrees with it.', 'আগে time word-এর নিচে দাগ দাও। তারপর দেখো verb তার সাথে মেলে কিনা।'),
    avoid: l('When you proofread, read only the time words and verbs together: "in 2015 … increased", "since 2015 … has increased".', 'Proofread করার সময় শুধু time word আর verb একসাথে পড়ো: "in 2015 … increased", "since 2015 … has increased"।'),
  },
};

/** The short rule shown before a targeted fix, by pattern key. */
export const POS_PAIR_RULES: Record<string, L> = Object.fromEntries(Object.entries(POS_FIX_GUIDE).map(([k, g]) => [k, g.rule]));
