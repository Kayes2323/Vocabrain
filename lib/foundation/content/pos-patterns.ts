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
  'sv-agreement': { title: l('Subject–verb agreement', 'Subject–verb agreement'), modules: ['parts-of-speech', 'tenses', 'agreement'], unit: 'lab' },
  'verb-form': { title: l('Verb form after helping verbs', 'Helping verb-এর পরে verb form'), modules: ['parts-of-speech', 'tenses'], unit: 'verb' },
  'noun-count': { title: l('Countable and uncountable nouns', 'Countable আর uncountable noun'), modules: ['parts-of-speech', 'articles'], unit: 'noun' },
  'pronoun-form': { title: l('Pronoun forms (he/she, its/it’s, their/there)', 'Pronoun form (he/she, its/it’s, their/there)'), modules: ['parts-of-speech'], unit: 'pronoun' },
  'prep-choice': { title: l('Choosing the preposition', 'সঠিক preposition বাছা'), modules: ['parts-of-speech', 'prepositions'], unit: 'preposition' },
  'conj-logic': { title: l('Joining ideas with the right word', 'ঠিক word দিয়ে idea জোড়া'), modules: ['parts-of-speech', 'connectors'], unit: 'conjunction' },
  'past-vs-perfect': { title: l('Past Simple or Present Perfect', 'Past Simple নাকি Present Perfect'), modules: ['tenses'] },
  'simple-vs-continuous': { title: l('Simple or continuous', 'Simple নাকি continuous'), modules: ['tenses'] },
  'tense-time': { title: l('Time words decide the tense', 'Time word-ই tense ঠিক করে'), modules: ['tenses'] },
  'missing-article': { title: l('A missing a / an / the', 'বাদ পড়া a / an / the'), modules: ['articles'] },
  'general-the': { title: l('"the" with things in general', 'সাধারণ অর্থে "the"'), modules: ['articles'] },
  'a-an-sound': { title: l('a or an by the sound', 'Sound দেখে a নাকি an'), modules: ['articles'] },
  'sva-compound': { title: l('Two subjects: and, or, nor', 'দুটো subject: and, or, nor'), modules: ['agreement'] },
  'sva-indefinite': { title: l('everyone, each, every and group nouns', 'everyone, each, every আর group noun'), modules: ['agreement'] },
  'sva-long-subject': { title: l('Finding the real subject in long subjects', 'লম্বা subject-এ আসল subject খোঁজা'), modules: ['agreement'] },
  'sva-quantity': { title: l('Amounts, numbers and percentages', 'পরিমাণ, সংখ্যা আর শতাংশ'), modules: ['agreement'] },
  'prep-time-words': { title: l('Prepositions of time (in / on / at, for / since)', 'সময়ের preposition (in / on / at, for / since)'), modules: ['prepositions'] },
  'prep-place-words': { title: l('Prepositions of place and movement', 'জায়গা আর চলাচলের preposition'), modules: ['prepositions'] },
  'prep-word-partner': { title: l('Word partners (depend on, interested in)', 'Word partner (depend on, interested in)'), modules: ['prepositions'] },
  'prep-data-words': { title: l('Prepositions for data (by, to, at)', 'Data-র preposition (by, to, at)'), modules: ['prepositions'] },
  'prep-extra': { title: l('Extra or missing prepositions (discuss about, reach to)', 'অতিরিক্ত বা বাদ পড়া preposition (discuss about, reach to)'), modules: ['prepositions'] },
  'conn-meaning': { title: l('A connector that doesn’t match the logic', 'যুক্তির সাথে না মেলা connector'), modules: ['connectors'] },
  'conn-double': { title: l('Two linkers for one link (although … but)', 'একটা যোগসূত্রে দুটো linker (although … but)'), modules: ['connectors'] },
  'conn-form': { title: l('Connector grammar and punctuation', 'Connector-এর grammar আর punctuation'), modules: ['connectors'] },
  'conn-fragment': { title: l('Half sentences (Because … . on its own)', 'অর্ধেক sentence (একা Because … .)'), modules: ['connectors'] },
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
    recognise: l('Look at the next word. If it is a noun (measures, rise, city), the gap describes a thing → adjective.', 'পরের word দেখুন। সেটা noun হলে (measures, rise, city) gap-টা একটা জিনিসকে describe করছে → adjective।'),
    avoid: l('Before writing -ly, ask: "what am I describing?" Thing → adjective. Action → adverb.', '-ly লেখার আগে জিজ্ঞেস করুন: "আমি কী describe করছি?" জিনিস → adjective। কাজ → adverb।'),
  },
  'adverb>adjective': {
    rule: l(
      'Is it describing a verb (how, how much)? Then use an adverb: rose sharply, work effectively, increased significantly. Adverbs also describe adjectives: extremely important.',
      'Word-টা কি একটা verb-কে describe করছে (কীভাবে, কতটা)? তাহলে adverb: rose sharply, work effectively, increased significantly। Adverb adjective-কেও describe করে: extremely important।',
    ),
    why: l('In Bangla the same word often works for both ("দ্রুত"), so English -ly is easy to forget.', 'বাংলায় একই word দুই কাজেই চলে ("দ্রুত"), তাই English-এ -ly ভুলে যাওয়া সহজ।'),
    recognise: l('Find the verb. If your word tells how or how much it happened (rose ___, work ___), you need -ly.', 'Verb-টা খুঁজে বের করুন। আপনার word যদি বলে কাজটা কীভাবে বা কতটা হলো (rose ___, work ___), তাহলে -ly লাগবে।'),
    avoid: l('In Task 1, check every trend verb: rose / fell / increased + an adverb (sharply, slightly, steadily).', 'Task 1-এ প্রতিটা trend verb দেখুন: rose / fell / increased + adverb (sharply, slightly, steadily)।'),
  },
  'noun>verb': {
    rule: l(
      'After a / the / my / this, and between "the" and "of", you need a noun: the development of, a decision, my improvement.',
      'a / the / my / this-এর পরে, আর "the" ও "of"-এর মাঝে noun লাগে: the development of, a decision, my improvement।',
    ),
    why: l('You know the idea as an action (develop, decide), so the verb comes first to mind.', 'Idea-টা আপনি কাজ হিসেবে চেনেন (develop, decide), তাই verb-টাই আগে মাথায় আসে।'),
    recognise: l('a / the / my / this / of before the gap → the gap is a thing → noun (-ment, -tion, -ence).', 'Gap-এর আগে a / the / my / this / of → gap-টা একটা জিনিস → noun (-ment, -tion, -ence)।'),
    avoid: l('Learn the family together: develop → development, decide → decision, improve → improvement.', 'পুরো family একসাথে শিখুন: develop → development, decide → decision, improve → improvement।'),
  },
  'verb>noun': {
    rule: l(
      'After to / can / should / must / will, you need a verb: we should protect, to improve, can succeed.',
      'to / can / should / must / will-এর পরে verb লাগে: we should protect, to improve, can succeed।',
    ),
    why: l('Academic writing uses many nouns, so a noun (improvement, success) can feel "more IELTS" even where a verb is needed.', 'Academic writing-এ অনেক noun থাকে, তাই verb দরকার এমন জায়গাতেও noun (improvement, success) বেশি "IELTS-মার্কা" মনে হয়।'),
    recognise: l('to / can / should / must / will right before the gap → base verb.', 'Gap-এর ঠিক আগে to / can / should / must / will → base verb।'),
    avoid: l('After every should / must in your essay, read the next word: it must be an action.', 'Essay-তে প্রতিটা should / must-এর পরের word পড়ুন: সেটা অবশ্যই একটা কাজ হবে।'),
  },
  'noun>adjective': {
    rule: l(
      'The name of a thing or idea is a noun: the beauty of the city, economic growth → the economy. Adjectives describe; nouns name.',
      'কোনো জিনিস বা idea-র নাম হলো noun: the beauty of the city, economic growth → the economy। Adjective describe করে; noun নাম দেয়।',
    ),
    why: l('Adjectives and nouns of one family look alike (economic / economy, beautiful / beauty).', 'একই family-র adjective আর noun দেখতে কাছাকাছি (economic / economy, beautiful / beauty)।'),
    recognise: l('If nothing comes after it and it is the subject or object, it names something → noun.', 'পরে কোনো noun না থাকলে আর এটা subject বা object হলে, এটা কিছুর নাম → noun।'),
    avoid: l('Ask: "is there a noun after it that it describes?" No noun → you probably need the noun form.', 'জিজ্ঞেস করুন: "এর পরে কি এমন noun আছে যাকে এটা describe করছে?" না থাকলে সম্ভবত noun form লাগবে।'),
  },
  'adjective>noun': {
    rule: l(
      'To describe a noun, use the adjective form: a beautiful city, economic benefits, a successful business.',
      'Noun-কে describe করতে adjective form লাগে: a beautiful city, economic benefits, a successful business।',
    ),
    why: l('You remember the noun (success, economy) better than its adjective.', 'Noun-টা (success, economy) adjective-এর চেয়ে বেশি মনে থাকে।'),
    recognise: l('Word + noun (___ benefits, a ___ business) → the first word describes → adjective.', 'Word + noun (___ benefits, a ___ business) → প্রথম word describe করছে → adjective।'),
    avoid: l('Learn adjective endings: -ful, -ic, -al, -ous, -ive, -able.', 'Adjective ending শিখুন: -ful, -ic, -al, -ous, -ive, -able।'),
  },
  'sv-agreement': {
    rule: l(
      'Find the real subject, then match the verb: he/she/it + verb-s (He goes). "The number of…", "Everyone", "Each" are singular (is). "People", "children", "a number of…" are plural (are).',
      'আসল subject খুঁজে verb মেলান: he/she/it + verb-s (He goes)। "The number of…", "Everyone", "Each" singular (is)। "People", "children", "a number of…" plural (are)।',
    ),
    why: l('Bangla verbs do not change for "he" in the same way, and long subjects hide the real subject (The number of students… are ✗).', 'বাংলায় "he"-র জন্য verb একইভাবে বদলায় না, আর লম্বা subject আসল subject-কে লুকিয়ে ফেলে (The number of students… are ✗)।'),
    recognise: l('Cover the "of …" part: "The number (of students) is". Ask: one thing or many?', '"of …" অংশটা ঢেকে দিন: "The number (of students) is"। জিজ্ঞেস করুন: একটা না অনেকগুলো?'),
    avoid: l('After writing a sentence, underline its subject and its verb. Do they match?', 'Sentence লেখার পরে subject আর verb-এর নিচে দাগ দিন। মিলছে কি?'),
  },
  'verb-form': {
    rule: l(
      'can / should / must / will / do / does / did + base verb (can speak, does work). be + -ing or past participle (is increasing, was built), never be + base verb (is increase ✗).',
      'can / should / must / will / do / does / did + base verb (can speak, does work)। be + -ing বা past participle (is increasing, was built), কখনো be + base verb না (is increase ✗)।',
    ),
    why: l('The "-s" rule for he/she is fresh in your mind, so it slips in after can and does too (can speaks ✗).', 'he/she-এর "-s" নিয়ম মাথায় থাকে, তাই can আর does-এর পরেও চলে আসে (can speaks ✗)।'),
    recognise: l('Look at the word before the verb: a modal or do/does → base form. A form of be → -ing or -ed/3rd form.', 'Verb-এর আগের word দেখুন: modal বা do/does → base form। be-এর কোনো form → -ing বা -ed/3rd form।'),
    avoid: l('Only the first verb changes. After it, the second verb has a fixed form.', 'শুধু প্রথম verb বদলায়। তার পরের verb-এর form নির্দিষ্ট।'),
  },
  'noun-count': {
    rule: l(
      'Uncountable nouns (information, advice, equipment, research, furniture) have no plural and take much / less. Countable nouns take many / fewer and need a / the / plural: many students, a job.',
      'Uncountable noun (information, advice, equipment, research, furniture)-এর plural নেই, সাথে much / less বসে। Countable noun-এর সাথে many / fewer, আর a / the / plural লাগে: many students, a job।',
    ),
    why: l('Some nouns are countable in Bangla but uncountable in English (তথ্যগুলো → information).', 'কিছু noun বাংলায় গোনা যায় কিন্তু English-এ uncountable (তথ্যগুলো → information)।'),
    recognise: l('Can you say "one ___, two ___s"? If not (one information ✗), it is uncountable.', '"one ___, two ___s" বলা যায়? না গেলে (one information ✗) এটা uncountable।'),
    avoid: l('Keep a short list of IELTS uncountables: information, advice, research, equipment, traffic, pollution, knowledge.', 'IELTS-এর uncountable-এর ছোট একটা list রাখুন: information, advice, research, equipment, traffic, pollution, knowledge।'),
  },
  'pronoun-form': {
    rule: l(
      'Subject I / he / she / they; object me / him / her / them. its = belonging to it; it’s = it is. their = belonging to them; there = place / there is; they’re = they are.',
      'Subject I / he / she / they; object me / him / her / them। its = এটার; it’s = it is। their = তাদের; there = ওখানে / there is; they’re = they are।',
    ),
    why: l('Bangla "সে" is both he and she, and its / it’s and their / there sound the same.', 'বাংলায় "সে" মানে he আর she দুটোই, আর its / it’s, their / there শুনতে একই।'),
    recognise: l('Replace with the long form: "it is own culture" ✗ → so it must be "its". "they are children" ✗ → "their".', 'লম্বা form বসিয়ে দেখুন: "it is own culture" ✗ → তাই "its"। "they are children" ✗ → "their"।'),
    avoid: l('Before submitting, search your text for it’s, their, there and he/she and test each one.', 'জমা দেওয়ার আগে লেখায় it’s, their, there আর he/she খুঁজে প্রতিটা পরীক্ষা করুন।'),
  },
  'prep-choice': {
    rule: l(
      'Time: in (months, years), on (days, dates), at (times). Partners: depend on, focus on, discuss (no preposition). Data: rose by 5% (the change), rose to 50% (the new level), peaked at 70%.',
      'সময়: in (মাস, বছর), on (দিন, তারিখ), at (সময়)। সাথী: depend on, focus on, discuss (preposition ছাড়া)। Data: rose by 5% (পরিবর্তন), rose to 50% (নতুন মান), peaked at 70%।',
    ),
    why: l('Prepositions rarely translate one-to-one from Bangla (এর উপর নির্ভর → depend on, not depend of).', 'Preposition বাংলা থেকে এক-এক করে অনুবাদ হয় না (এর উপর নির্ভর → depend on, depend of না)।'),
    recognise: l('Look at the word before (depend, focus, rise) and after (a day, a time, a number). They choose the preposition.', 'আগের word (depend, focus, rise) আর পরের word (দিন, সময়, সংখ্যা) দেখুন। ওরাই preposition ঠিক করে।'),
    avoid: l('Learn verbs with their partner as one chunk: depend on, focus on, result in, lead to.', 'Verb-কে তার সাথী সহ একটা chunk হিসেবে শিখুন: depend on, focus on, result in, lead to।'),
  },
  'conj-logic': {
    rule: l(
      'because = reason; so = result; but / although = contrast; however starts a new sentence (However, …); despite + noun / -ing (despite the rain).',
      'because = কারণ; so = ফলাফল; but / although = বিপরীত; however নতুন sentence শুরু করে (However, …); despite + noun / -ing (despite the rain)।',
    ),
    why: l('The ideas are right but the link word says the wrong relation (reason vs result, contrast vs addition).', 'Idea ঠিক আছে, কিন্তু জোড়ার word ভুল সম্পর্ক বলছে (কারণ বনাম ফলাফল, বিপরীত বনাম যোগ)।'),
    recognise: l('Say the two ideas with "and that is why" or "but surprisingly". Which one sounds true?', 'দুটো idea "and that is why" বা "but surprisingly" দিয়ে বলুন। কোনটা সত্যি শোনায়?'),
    avoid: l('Choose the relation first (reason, result, contrast), then the word.', 'আগে সম্পর্ক ঠিক করুন (কারণ, ফলাফল, বিপরীত), তারপর word।'),
  },
  'past-vs-perfect': {
    rule: l(
      'A finished time (yesterday, last year, in 2019, ago, when I was…) → Past Simple: I visited Sylhet last year. No finished time, or a link to now (since, for, ever, never, yet, already, recently) → Present Perfect: I have visited Sylhet twice.',
      'শেষ হয়ে যাওয়া সময় (yesterday, last year, in 2019, ago, when I was…) → Past Simple: I visited Sylhet last year। শেষ সময় নেই, বা এখনের সাথে যোগ আছে (since, for, ever, never, yet, already, recently) → Present Perfect: I have visited Sylhet twice।',
    ),
    why: l('Bangla "আমি গিয়েছি" and "আমি গেলাম" both feel like "have gone", so students add "have" even when a finished time is there ("I have gone yesterday").', 'বাংলায় "আমি গিয়েছি" আর "আমি গেলাম" দুটোই "have gone"-এর মতো লাগে, তাই শেষ হওয়া সময় থাকলেও "have" বসে যায় ("I have gone yesterday")।'),
    recognise: l('Look for a time word. Can you answer "When exactly?" with a finished time? Then it is Past Simple.', 'Time word খুঁজুন। "ঠিক কখন?"-এর উত্তরে শেষ হওয়া সময় আছে? তাহলে Past Simple।'),
    avoid: l('In Task 1, past years → Past Simple. Use Present Perfect only for "since…", "in recent years" or experience.', 'Task 1-এ অতীতের বছর → Past Simple। Present Perfect শুধু "since…", "in recent years" বা অভিজ্ঞতার জন্য।'),
  },
  'simple-vs-continuous': {
    rule: l(
      'Routines, permanent facts and states (know, like, want, believe, own) → simple: I work in a bank. I know him. Right now, temporary situations and changing trends → continuous: I am working late this week. Prices are rising.',
      'রুটিন, স্থায়ী সত্য আর অবস্থা (know, like, want, believe, own) → simple: I work in a bank। I know him। এই মুহূর্ত, সাময়িক অবস্থা আর বদলাতে থাকা trend → continuous: I am working late this week। Prices are rising।',
    ),
    why: l('Bangla uses "করছি" for both "I work" and "I am working", so the -ing form feels natural everywhere.', 'বাংলায় "I work" আর "I am working" দুটোতেই "করছি" চলে, তাই -ing সব জায়গায় স্বাভাবিক লাগে।'),
    recognise: l('Ask: is it happening now or only for a while? → continuous. Is it always, usually, or a state? → simple.', 'জিজ্ঞেস করুন: এখন হচ্ছে বা কিছুদিনের জন্য? → continuous। সবসময়, সাধারণত, নাকি একটা অবস্থা? → simple।'),
    avoid: l('Never put -ing on know, understand, believe, want, own, need. For your job or home, use simple unless it is temporary.', 'know, understand, believe, want, own, need-এ কখনো -ing না। চাকরি বা বাসার কথায় simple, যদি না সেটা সাময়িক হয়।'),
  },
  'tense-time': {
    rule: l(
      'The time words choose the tense: yesterday, last…, ago, in 2010 → past; now, at the moment, these days → present continuous; every day, usually → present simple; since, for, so far → present perfect; tomorrow, next…, by 2030 → future; by the time + past → past perfect.',
      'Time word-ই tense বেছে দেয়: yesterday, last…, ago, in 2010 → past; now, at the moment, these days → present continuous; every day, usually → present simple; since, for, so far → present perfect; tomorrow, next…, by 2030 → future; by the time + past → past perfect।',
    ),
    why: l('Bangla verbs change less for time, so the time word often feels like enough ("Yesterday I go").', 'বাংলায় verb সময়ের সাথে কম বদলায়, তাই মনে হয় time word-ই যথেষ্ট ("Yesterday I go")।'),
    recognise: l('Underline the time word first. Then check that the verb agrees with it.', 'আগে time word-এর নিচে দাগ দিন। তারপর দেখুন verb তার সাথে মেলে কিনা।'),
    avoid: l('When you proofread, read only the time words and verbs together: "in 2015 … increased", "since 2015 … has increased".', 'Proofread করার সময় শুধু time word আর verb একসাথে পড়ুন: "in 2015 … increased", "since 2015 … has increased"।'),
  },  'missing-article': {
    rule: l(
      'One countable thing never stands alone. Put a / an before it when it is new or one of many (I am a student, there was a rise), and "the" when the reader knows which one (the number of, the highest, the chart).',
      'গোনা যায় এমন একটা জিনিস একা দাঁড়ায় না। নতুন বা অনেকের একটা হলে a / an (I am a student, there was a rise), আর পাঠক জানলে কোনটা, তখন "the" (the number of, the highest, the chart)।',
    ),
    why: l('Bangla needs nothing before a noun ("আমি ছাত্র", "গ্রাফটি দেখায়"), and marks "the" after it (-টা, -টি), so the English word before the noun gets lost.', 'বাংলায় noun-এর আগে কিছু লাগে না ("আমি ছাত্র", "গ্রাফটি দেখায়"), আর "the"-এর কাজ হয় পরে (-টা, -টি), তাই English-এ noun-এর আগের word-টা হারিয়ে যায়।'),
    recognise: l('Find each singular noun (student, graph, number, rise). Is there a / an / the / my / this before it? If not, one is missing.', 'প্রতিটা একবচন noun খুঁজুন (student, graph, number, rise)। আগে কি a / an / the / my / this আছে? না থাকলে একটা বাদ পড়েছে।'),
    avoid: l('Proofread nouns only: singular + countable → add a / an (new) or the (known). In Task 1, "The chart shows the number of…" every time.', 'শুধু noun-গুলো proofread করুন: একবচন + গোনা যায় → a / an (নতুন) বা the (চেনা) বসান। Task 1-এ প্রতিবার "The chart shows the number of…"।'),
  },
  'general-the': {
    rule: l(
      'Talking about things in general? Plural and uncountable nouns take NO article: Education is important. Cars cause pollution. Use "the" only for a particular thing or group: the education system in Bangladesh, the cars in my street.',
      'সাধারণভাবে বলছেন? Plural আর uncountable noun-এ article লাগে না: Education is important। Cars cause pollution। শুধু নির্দিষ্ট জিনিস বা দলের জন্য "the": the education system in Bangladesh, the cars in my street।',
    ),
    why: l('"The" feels formal and academic, like "শিক্ষাব্যবস্থা", so it gets added to general ideas in Task 2. Languages and city names get it too (the English, the Dhaka).', '"The" formal আর academic মনে হয়, যেন "শিক্ষাব্যবস্থা", তাই Task 2-এ সাধারণ ধারণায় বসে যায়। ভাষা আর শহরের নামেও বসে (the English, the Dhaka)।'),
    recognise: l('Ask "which one?". If the answer is "all of them / in general", there is no "the". Also no "the" with languages, most names and "most + plural".', '"কোনটা?" জিজ্ঞেস করুন। উত্তর "সবগুলো / সাধারণভাবে" হলে "the" না। ভাষা, বেশিরভাগ নাম আর "most + plural"-এও "the" না।'),
    avoid: l('In Task 2, start general statements with the noun itself: Technology…, Children…, Pollution…, Governments…', 'Task 2-এ সাধারণ বক্তব্য noun দিয়েই শুরু করুন: Technology…, Children…, Pollution…, Governments…'),
  },
  'a-an-sound': {
    rule: l(
      'Say the next word: a vowel SOUND → an (an hour, an MBA, an 8% rise); a consonant SOUND → a (a university, a European, a one-year course). The sound decides, not the letter.',
      'পরের word-টা বলুন: vowel SOUND → an (an hour, an MBA, an 8% rise); consonant SOUND → a (a university, a European, a one-year course)। অক্ষর না, sound ঠিক করে।',
    ),
    why: l('Bangla spelling follows the sound, so we trust the letter. In English, "u" can sound like "yoo" and "h" can be silent.', 'বাংলা বানান উচ্চারণ মেনে চলে, তাই আমরা অক্ষরের উপর ভরসা করি। English-এ "u" "ইউ" শোনাতে পারে আর "h" নীরব থাকতে পারে।'),
    recognise: l('Look for u-, eu-, one-, h- and numbers (8, 11, 18) after a / an.', 'a / an-এর পরে u-, eu-, one-, h- আর সংখ্যা (8, 11, 18) খেয়াল করুন।'),
    avoid: l('Before writing a or an, whisper the next word — including adjectives and numbers.', 'a বা an লেখার আগে পরের word-টা মনে মনে বলুন — adjective আর সংখ্যাও।'),
  },
  'sva-compound': {
    rule: l(
      'A and B → plural (My brother and I are). With or / nor, either … or, neither … nor → the verb agrees with the NEARER subject (Neither the teacher nor the students are; Either my sisters or my mother is).',
      'A and B → plural (My brother and I are)। or / nor, either … or, neither … nor → verb কাছের subject-এর সাথে মেলে (Neither the teacher nor the students are; Either my sisters or my mother is)।',
    ),
    why: l('Bangla "আর" and "অথবা" don’t change the verb, so two subjects can feel like one — and with "or" we tend to follow the first subject instead of the nearer one.', 'বাংলায় "আর" বা "অথবা" verb বদলায় না, তাই দুটো subject একটা মনে হয় — আর "or"-এর সাথে আমরা কাছেরটা না মেনে প্রথম subject মেনে ফেলি।'),
    recognise: l('Look for and / or / nor / either / neither in the subject. "and" → count them: two or more. "or / nor" → point to the subject right before the verb.', 'Subject-এ and / or / nor / either / neither খুঁজুন। "and" → গুনুন: দুই বা বেশি। "or / nor" → verb-এর ঠিক আগের subject দেখুন।'),
    avoid: l('With "or / nor", put the plural subject last: "Neither my father nor my brothers smoke" sounds natural and is easy to check.', '"or / nor"-এ plural subject শেষে রাখুন: "Neither my father nor my brothers smoke" স্বাভাবিক শোনায় আর যাচাই করা সহজ।'),
  },
  'sva-indefinite': {
    rule: l(
      'everyone, everybody, someone, nobody, nothing, each, every + noun → singular (Everyone has, Each student gets). Group nouns (family, team, government) usually take a singular verb. people, police, children → plural.',
      'everyone, everybody, someone, nobody, nothing, each, every + noun → singular (Everyone has, Each student gets)। Group noun (family, team, government) সাধারণত singular verb নেয়। people, police, children → plural।',
    ),
    why: l('"সবাই" and "প্রত্যেকে" mean many people, so a plural verb feels right. In English, every- and each- words are grammatically singular.', '"সবাই" আর "প্রত্যেকে" মানে অনেক মানুষ, তাই plural verb ঠিক মনে হয়। English-এ every- আর each- word grammar-এ singular।'),
    recognise: l('Spot every-, some-, any-, no- + one / body / thing, and "each (of)". Replace them with "he" or "it" in your head.', 'every-, some-, any-, no- + one / body / thing আর "each (of)" খুঁজুন। মনে মনে "he" বা "it" দিয়ে বদলে দেখুন।'),
    avoid: l('After everyone / each, write has / is / verb + s — then check the next pronoun (their is fine: Everyone has their own phone).', 'everyone / each-এর পরে has / is / verb + s লিখুন — তারপর পরের pronoun দেখুন (their চলে: Everyone has their own phone)।'),
  },
  'sva-long-subject': {
    rule: l(
      'In a long subject, the verb agrees with the HEAD word, not the noun just before the verb. Skip "of …", "with …", "in …" and "who / which …": The quality (of schools) has improved; One (of my friends) is; Students (who work) have less time.',
      'লম্বা subject-এ verb মূল word-এর সাথে মেলে, verb-এর ঠিক আগের noun-এর সাথে না। "of …", "with …", "in …" আর "who / which …" বাদ দিন: The quality (of schools) has improved; One (of my friends) is; Students (who work) have less time।',
    ),
    why: l('In Bangla the verb comes at the end, so the last noun you hear feels like the subject. English long subjects put another noun right next to the verb.', 'বাংলায় verb শেষে আসে, তাই শেষে শোনা noun-কে subject মনে হয়। English-এর লম্বা subject-এ verb-এর ঠিক পাশে আরেকটা noun থাকে।'),
    recognise: l('Put brackets around of / with / in phrases and who / which clauses. What is left before the verb is the real subject.', 'of / with / in phrase আর who / which clause-কে bracket-এ রাখুন। Verb-এর আগে যা থাকে, সেটাই আসল subject।'),
    avoid: l('In Task 1 and Task 2, underline the first noun of each subject and match the verb to it. Inside a who-clause, match the verb to the noun before "who".', 'Task 1 আর Task 2-এ প্রতিটা subject-এর প্রথম noun-এর নিচে দাগ দিন আর verb সেটার সাথে মেলান। who-clause-এর ভেতরে verb "who"-এর আগের noun-এর সাথে মেলান।'),
  },
  'sva-quantity': {
    rule: l(
      'the number of → singular (has); a number of → plural (have). X% of / half of / most of + noun → follow that noun (40% of the land is; 40% of students are). An amount of money, time or distance → singular (Ten thousand taka is enough). There is / are → the noun after it.',
      'the number of → singular (has); a number of → plural (have)। X% of / half of / most of + noun → সেই noun অনুযায়ী (40% of the land is; 40% of students are)। টাকা, সময় বা দূরত্বের পরিমাণ → singular (Ten thousand taka is enough)। There is / are → পরের noun অনুযায়ী।',
    ),
    why: l('Task 1 subjects are full of plurals (students, countries, years), so the verb follows the plural noun instead of "the number" or "the percentage".', 'Task 1-এর subject-এ অনেক plural থাকে (students, countries, years), তাই verb "the number" বা "the percentage"-এর বদলে plural noun মেনে ফেলে।'),
    recognise: l('the number / the percentage / the proportion / the amount → one figure. a number of → several. With X% of, look at the noun after "of".', 'the number / the percentage / the proportion / the amount → একটা সংখ্যা। a number of → কয়েকটা। X% of-এ "of"-এর পরের noun দেখুন।'),
    avoid: l('Learn the Task 1 frames: "The number of … has risen", "The figures for … were", "X% of the population was".', 'Task 1-এর frame শিখুন: "The number of … has risen", "The figures for … were", "X% of the population was"।'),
  },
  'prep-time-words': {
    rule: l(
      'in = long periods (in 2020, in May, in the morning) · on = one day (on Friday, on 16 December) · at = a point (at 7 pm, at night). for + a length (for three years) · since + a start (since 2019) · X ago. No preposition before this / next / last / every.',
      'in = লম্বা সময় (in 2020, in May, in the morning) · on = একটা দিন (on Friday, on 16 December) · at = একটা বিন্দু (at 7 pm, at night)। for + দৈর্ঘ্য (for three years) · since + শুরু (since 2019) · X ago। this / next / last / every-এর আগে preposition না।',
    ),
    why: l('Bangla marks every time with one ending (২০২০-এ, সোমবারে, পাঁচটায়), and "থেকে" / "আগে" become "since five years" and "before two years".', 'বাংলায় সব সময় একটা ending দিয়ে বোঝানো হয় (২০২০-এ, সোমবারে, পাঁচটায়), আর "থেকে" / "আগে" হয়ে যায় "since five years" আর "before two years"।'),
    recognise: l('Look at the time word: how big is it (year / day / clock)? Is it a length or a starting point?', 'সময়ের word-টা দেখুন: কত বড় (বছর / দিন / ঘড়ি)? এটা দৈর্ঘ্য নাকি শুরুর বিন্দু?'),
    avoid: l('Picture the triangle in → on → at, and ask "how long?" (for) or "since when?" (since) before you write.', 'লেখার আগে in → on → at ত্রিভুজ কল্পনা করুন, আর জিজ্ঞেস করুন "কতক্ষণ?" (for) নাকি "কবে থেকে?" (since)।'),
  },
  'prep-place-words': {
    rule: l(
      'in = inside an area or space (in Dhaka, in the room, in a car) · on = a surface or level (on the wall, on the 3rd floor, on the bus) · at = a point or activity place (at the gate, at home, at work). go to · arrive in (city) / at (building), never arrive to.',
      'in = এলাকা বা জায়গার ভেতরে (in Dhaka, in the room, in a car) · on = উপরিতল বা স্তর (on the wall, on the 3rd floor, on the bus) · at = বিন্দু বা কাজের জায়গা (at the gate, at home, at work)। go to · arrive in (শহর) / at (building), কখনো arrive to না।',
    ),
    why: l('One Bangla ending (-এ / -তে) covers ঘরে, টেবিলে and স্টেশনে, so "at Dhaka" and "in the second floor" sound right.', 'বাংলার একটা ending (-এ / -তে) ঘরে, টেবিলে আর স্টেশনে সব বোঝায়, তাই "at Dhaka" আর "in the second floor" ঠিক মনে হয়।'),
    recognise: l('Ask about the place: a space around you, a surface / level, or a point?', 'জায়গাটা নিয়ে জিজ্ঞেস করুন: চারপাশে জায়গা, উপরিতল / স্তর, নাকি একটা বিন্দু?'),
    avoid: l('Learn the fixed ones as chunks: live in + city, on + floor, at home / work / school, on the bus, in a car.', 'নির্দিষ্টগুলো chunk হিসেবে শিখুন: live in + শহর, on + floor, at home / work / school, on the bus, in a car।'),
  },
  'prep-word-partner': {
    rule: l(
      'Some words always take the same preposition: interested in, good at, afraid of, responsible for, depend on, focus on, listen to, wait for, an effect / impact on, a reason for, a solution to, access to.',
      'কিছু word সবসময় একই preposition নেয়: interested in, good at, afraid of, responsible for, depend on, focus on, listen to, wait for, an effect / impact on, a reason for, a solution to, access to।',
    ),
    why: l('We translate Bangla endings word by word ("এর উপর নির্ভর" → depend of, "সাথে বিয়ে" → married with).', 'আমরা বাংলার ending শব্দে শব্দে অনুবাদ করি ("এর উপর নির্ভর" → depend of, "সাথে বিয়ে" → married with)।'),
    recognise: l('Look at the word BEFORE the preposition (depend, interested, effect). It chooses the preposition, not the meaning.', 'Preposition-এর আগের word দেখুন (depend, interested, effect)। অর্থ না, ওই word-ই preposition ঠিক করে।'),
    avoid: l('Learn and write the chunk, never the word alone: write "depend on" in your notes, not "depend".', 'একা word না, chunk শিখুন আর লিখুন: note-এ "depend" না, "depend on" লিখুন।'),
  },
  'prep-data-words': {
    rule: l(
      'rise / fall by + the size of the change · to + the new level · peak / stand at + a level · from X to Y · between X and Y · a rise of (amount) in (thing) · reach + number (no preposition).',
      'rise / fall by + পরিবর্তনের পরিমাণ · to + নতুন মান · peak / stand at + একটা মান · from X to Y · between X and Y · a rise of (পরিমাণ) in (জিনিস) · reach + সংখ্যা (preposition না)।',
    ),
    why: l('Bangla "১০% বেড়ে ৫০% হয়েছে" has one pattern, so "increased with 10%" and "rose by 50%" (meaning to) appear in reports.', 'বাংলা "১০% বেড়ে ৫০% হয়েছে"-তে একটাই pattern, তাই report-এ "increased with 10%" আর "rose by 50%" (to বোঝাতে) চলে আসে।'),
    recognise: l('For every number, ask: is this the change, the new level, or a peak?', 'প্রতিটা সংখ্যার জন্য জিজ্ঞেস করুন: এটা পরিবর্তন, নতুন মান, নাকি সর্বোচ্চ বিন্দু?'),
    avoid: l('Check your Task 1 numbers against the chart: "by" + difference, "to" + the number on the chart.', 'Task 1-এর সংখ্যা chart-এর সাথে মেলান: "by" + পার্থক্য, "to" + chart-এর সংখ্যা।'),
  },
  'prep-extra': {
    rule: l(
      'No preposition after: discuss, reach, enter, emphasise, affect, influence, attend, marry, approach; go / come home; this / next / last / every. But: listen to, wait for, depend on.',
      'এগুলোর পরে preposition না: discuss, reach, enter, emphasise, affect, influence, attend, marry, approach; go / come home; this / next / last / every। কিন্তু: listen to, wait for, depend on।',
    ),
    why: l('Bangla "নিয়ে", "-এ", "-তে" feel like they need an English word, so we add about, to, into, on.', 'বাংলা "নিয়ে", "-এ", "-তে"-র জন্য English word লাগবে মনে হয়, তাই about, to, into, on বসিয়ে ফেলি।'),
    recognise: l('After discuss, reach, enter, emphasise and affect, the object comes straight after the verb.', 'discuss, reach, enter, emphasise আর affect-এর পরে object সরাসরি verb-এর পরে বসে।'),
    avoid: l('Proofread for these verbs and delete the extra word: discuss the issue, reach Dhaka, go home.', 'এই verb-গুলো খুঁজে অতিরিক্ত word মুছে দিন: discuss the issue, reach Dhaka, go home।'),
  },
  'conn-meaning': {
    rule: l(
      'Choose the connector by the logic between the ideas: adding (also, in addition), contrast (but, however, although, whereas), cause (because, due to), result (so, therefore, as a result), example (for example, such as). Task 1 compares (while, whereas, overall); it does not give causes.',
      'Idea-গুলোর মধ্যে যুক্তি দেখে connector বাছুন: যোগ (also, in addition), বিপরীত (but, however, although, whereas), কারণ (because, due to), ফলাফল (so, therefore, as a result), উদাহরণ (for example, such as)। Task 1 তুলনা করে (while, whereas, overall); কারণ দেয় না।',
    ),
    why: l('Connectors get added to sound academic ("Moreover" everywhere) instead of being chosen for the logic.', 'যুক্তি দেখে বাছার বদলে academic শোনাতে connector বসানো হয় (সব জায়গায় "Moreover")।'),
    recognise: l('Cover the connector and read the two ideas: same direction, opposite, cause, result or example?', 'Connector ঢেকে দুটো idea পড়ুন: একই দিকে, বিপরীত, কারণ, ফলাফল, নাকি উদাহরণ?'),
    avoid: l('Decide the relationship first, then pick a word from that group — and use fewer connectors.', 'আগে সম্পর্কটা ঠিক করুন, তারপর সেই দল থেকে word বাছুন — আর connector কম দিন।'),
  },
  'conn-double': {
    rule: l(
      'One linker per link: Although X, Y (not "Although X, but Y") · Because X, Y or X, so Y (not "Because X, so Y") · such as (not "for example such as").',
      'প্রতিটা যোগসূত্রে একটা linker: Although X, Y ("Although X, but Y" না) · Because X, Y বা X, so Y ("Because X, so Y" না) · such as ("for example such as" না)।',
    ),
    why: l('Bangla needs both halves of a pair — "যদিও … কিন্তু", "যেহেতু … তাই" — so English gets two linkers.', 'বাংলায় জোড়ার দুই অংশই লাগে — "যদিও … কিন্তু", "যেহেতু … তাই" — তাই English-এ দুটো linker বসে যায়।'),
    recognise: l('If a sentence starts with Although / Because / Since, look for but / so / therefore later — delete it.', 'Sentence Although / Because / Since দিয়ে শুরু হলে পরে but / so / therefore খুঁজুন — মুছে দিন।'),
    avoid: l('Write the pair as English does: either "Although X, Y." or "X, but Y."', 'English যেভাবে লেখে সেভাবে লিখুন: হয় "Although X, Y." নয়তো "X, but Y."'),
  },
  'conn-form': {
    rule: l(
      'Conjunctions join after a comma (, but / , so) · although / because + clause · despite / because of / due to / as well as + noun or -ing · However, / Therefore, / As a result, start a new sentence (or follow a semicolon) — never just a comma before them. also goes before the main verb.',
      'Conjunction comma-র পরে জোড়ে (, but / , so) · although / because + clause · despite / because of / due to / as well as + noun বা -ing · However, / Therefore, / As a result, নতুন sentence শুরু করে (বা semicolon-এর পরে) — আগে শুধু comma কখনো না। also মূল verb-এর আগে।',
    ),
    why: l('Bangla "তবে", "তাই" join clauses with a comma, so ", however" and ", therefore" feel right; "সত্ত্বেও" takes a full clause, so "despite it was" feels right.', 'বাংলায় "তবে", "তাই" comma দিয়ে clause জোড়ে, তাই ", however" আর ", therefore" ঠিক মনে হয়; "সত্ত্বেও"-র সাথে পূর্ণ clause বসে, তাই "despite it was" ঠিক মনে হয়।'),
    recognise: l('Find however / therefore / moreover: is there only a comma before it? Find despite / because of: is a verb clause after it?', 'however / therefore / moreover খুঁজুন: আগে কি শুধু comma? despite / because of খুঁজুন: পরে কি verb-সহ clause?'),
    avoid: l('Put a full stop before sentence connectors, or switch to but / so. After despite, use a noun (despite the rain).', 'Sentence connector-এর আগে full stop দিন, বা but / so-তে বদলান। despite-এর পরে noun (despite the rain)।'),
  },
  'conn-fragment': {
    rule: l(
      'A because-, although- or such as-part cannot stand alone as a written sentence. Attach it to a main clause: "I chose this course because it is practical."',
      'because-, although- বা such as-অংশ লিখিত sentence হিসেবে একা দাঁড়াতে পারে না। মূল clause-এর সাথে জুড়ুন: "I chose this course because it is practical."',
    ),
    why: l('In Bangla, "কেন?" is answered with "কারণ …" alone, and that habit becomes "Because it is cheap." in essays.', 'বাংলায় "কেন?"-র উত্তর একা "কারণ …" দিয়ে দেওয়া হয়, আর সেই অভ্যাস essay-তে "Because it is cheap." হয়ে যায়।'),
    recognise: l('A sentence that starts with Because / Although / Such as and has no second clause is a fragment.', 'Because / Although / Such as দিয়ে শুরু হওয়া sentence-এ দ্বিতীয় clause না থাকলে সেটা ভাঙা sentence।'),
    avoid: l('Replace the full stop before "because" with nothing: join it to the sentence before.', '"because"-এর আগের full stop সরিয়ে দিন: আগের sentence-এর সাথে জুড়ে দিন।'),
  },
};

/** The short rule shown before a targeted fix, by pattern key. */
export const POS_PAIR_RULES: Record<string, L> = Object.fromEntries(Object.entries(POS_FIX_GUIDE).map(([k, g]) => [k, g.rule]));
