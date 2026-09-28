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
  'cx-fragment-runon': { title: l('Fragments and run-on sentences', 'ভাঙা sentence আর run-on'), modules: ['complex-sentences'] },
  'cx-comma': { title: l('Commas with clauses', 'Clause-এর সাথে comma'), modules: ['complex-sentences'] },
  'cx-clause-form': { title: l('Purpose and reason clauses (to, so that)', 'উদ্দেশ্য আর কারণের clause (to, so that)'), modules: ['complex-sentences'] },
  'cx-clause-tense': { title: l('Tenses in when / if clauses', 'when / if clause-এ tense'), modules: ['complex-sentences'] },
  'cx-relative-form': { title: l('Relative clauses (who, which, no repeated pronoun)', 'Relative clause (who, which, pronoun আবার না)'), modules: ['complex-sentences'] },
  'cx-word-order': { title: l('Word order in indirect questions', 'Indirect question-এ word order'), modules: ['complex-sentences'] },
  'pn-capitals': { title: l('Capital letters', 'Capital letter'), modules: ['punctuation'] },
  'pn-end-mark': { title: l('Full stops and question marks', 'Full stop আর question mark'), modules: ['punctuation'] },
  'pn-run-on': { title: l('Comma splices and run-on sentences', 'Comma splice আর run-on sentence'), modules: ['punctuation'] },
  'pn-comma-use': { title: l('Where commas go (and where they don’t)', 'Comma কোথায় বসে (আর কোথায় না)'), modules: ['punctuation'] },
  'pn-apostrophes': { title: l('Apostrophes (’s, s’, its / it’s)', 'Apostrophe (’s, s’, its / it’s)'), modules: ['punctuation'] },
  'pn-colon-semi': { title: l('Colons and semicolons', 'Colon আর semicolon'), modules: ['punctuation'] },
  'ce-translation': { title: l('Word-for-word translation (I am agree, give an exam)', 'Word ধরে অনুবাদ (I am agree, give an exam)'), modules: ['common-errors'] },
  'ce-uncountable': { title: l('Uncountable nouns (informations, advices)', 'Uncountable noun (informations, advices)'), modules: ['common-errors'] },
  'ce-plural-form': { title: l('Plurals after numbers and one of the …', 'সংখ্যা আর one of the …-এর পরে plural'), modules: ['common-errors'] },
  'ce-collocation-pair': { title: l('Collocations (make / do / take, heavy rain)', 'Collocation (make / do / take, heavy rain)'), modules: ['common-errors'] },
  'ce-confused-pair': { title: l('Confusing pairs (say / tell, lend / borrow, rise / raise)', 'গুলিয়ে যাওয়া জোড়া (say / tell, lend / borrow, rise / raise)'), modules: ['common-errors'] },
  'ce-redundant': { title: l('Saying it twice (return back, more better)', 'দুবার বলা (return back, more better)'), modules: ['common-errors'] },
  'voc-word-pattern': { title: l('Word patterns (afford to, access to, benefit from)', 'Word pattern (afford to, access to, benefit from)'), modules: ['vocabulary-foundation'] },
  'voc-context-clue': { title: l('Meaning from context and word parts', 'Context আর word-এর অংশ থেকে অর্থ'), modules: ['vocabulary-foundation'] },
  'voc-synonym-fit': { title: l('Synonyms that fit (paraphrasing)', 'মানানসই synonym (paraphrasing)'), modules: ['vocabulary-foundation'] },
  'voc-register-mix': { title: l('Formal or informal words for the task', 'Task অনুযায়ী formal বা informal word'), modules: ['vocabulary-foundation'] },
  'voc-vague-word': { title: l('Vague words (good, bad, thing, very)', 'অস্পষ্ট word (good, bad, thing, very)'), modules: ['vocabulary-foundation'] },
  'voc-form-tone': { title: l('Word form and tone (affect / effect, economic)', 'Word form আর সুর (affect / effect, economic)'), modules: ['vocabulary-foundation'] },
  'ib-version-fact': { title: l('Academic or General Training', 'Academic না General Training'), modules: ['ielts-intro'] },
  'ib-format-fact': { title: l('Test format and timing', 'Test-এর format আর সময়'), modules: ['ielts-intro'] },
  'ib-delivery-fact': { title: l('Computer or paper', 'Computer না paper'), modules: ['ielts-intro'] },
  'ib-band-calc': { title: l('Band Scores and the overall', 'Band Score আর overall'), modules: ['ielts-intro'] },
  'ib-marking-fact': { title: l('How each skill is marked', 'প্রতিটা skill কীভাবে নম্বর পায়'), modules: ['ielts-intro'] },
  'ib-requirement': { title: l('Reading requirements and planning', 'Requirement পড়া আর plan'), modules: ['ielts-intro'] },
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
  'cx-fragment-runon': {
    rule: l(
      'Every sentence needs a main clause (subject + verb that can stand alone). Two main clauses need a full stop, a semicolon or a joining word (, and / , but / , so / because) — never a comma alone. A because- / which- / although-part cannot stand alone.',
      'প্রতিটা sentence-এ মূল clause লাগে (একা দাঁড়াতে পারে এমন subject + verb)। দুটো মূল clause-এ full stop, semicolon বা জোড়ার word লাগে (, and / , but / , so / because) — শুধু comma কখনো না। because- / which- / although-অংশ একা দাঁড়াতে পারে না।',
    ),
    why: l('Written Bangla joins many clauses with commas and lets "কারণ …" stand alone, so English sentences run on or break off.', 'লিখিত বাংলায় অনেক clause comma দিয়ে জোড়া আর "কারণ …" একা দাঁড়ায়, তাই English sentence হয় টানা চলে নয়তো ভেঙে যায়।'),
    recognise: l('Count the subject + verb pairs between full stops. Two main clauses with only a comma = run-on; a clause that starts with because / which and nothing else = fragment.', 'Full stop-এর মাঝে subject + verb জোড়া গুনুন। শুধু comma-সহ দুটো মূল clause = run-on; because / which দিয়ে শুরু আর কিছু নেই = ভাঙা sentence।'),
    avoid: l('Build sentences one clause at a time, and join each new main clause with and / but / so / because or a full stop.', 'এক এক clause করে sentence বানান, আর প্রতিটা নতুন মূল clause and / but / so / because বা full stop দিয়ে জোড়ুন।'),
  },
  'cx-comma': {
    rule: l(
      'Dependent clause first → comma after it (When it rains, …). Relative clauses: extra information → commas + who / which (never that); which one? → no commas.',
      'নির্ভরশীল clause আগে → তার পরে comma (When it rains, …)। Relative clause: বাড়তি তথ্য → comma + who / which (কখনো that না); কোনটা? → comma না।',
    ),
    why: l('Bangla uses commas freely and has no defining / non-defining split, so commas land in random places.', 'বাংলায় comma স্বাধীনভাবে বসে আর defining / non-defining ভাগ নেই, তাই comma এলোমেলো জায়গায় পড়ে।'),
    recognise: l('Does the clause tell you WHICH one? No commas. Is it an extra fact about a name or the only one? Commas.', 'Clause কি বলে কোনটা? Comma না। নাম বা একমাত্রটা সম্পর্কে বাড়তি তথ্য? Comma।'),
    avoid: l('After a name (Dhaka, my mother), use ", which / who …,". Put a comma after an if / when / because-clause that comes first.', 'নামের পরে (Dhaka, my mother) ", which / who …," দিন। শুরুতে if / when / because-clause থাকলে তার পরে comma দিন।'),
  },
  'cx-clause-form': {
    rule: l(
      'Purpose + verb → to / in order to + base verb (to study). Purpose + clause → so that + subject + can / could + base verb. Reason → because / since + clause. Contrast → although + clause (no but).',
      'উদ্দেশ্য + verb → to / in order to + base verb (to study)। উদ্দেশ্য + clause → so that + subject + can / could + base verb। কারণ → because / since + clause। বিপরীত → although + clause (but না)।',
    ),
    why: l('"পড়ার জন্য" feels like "for study", and "যাতে … পারি" becomes "so that I can to".', '"পড়ার জন্য" মনে হয় "for study", আর "যাতে … পারি" হয়ে যায় "so that I can to"।'),
    recognise: l('Is there a verb after for? Change it to to. Is there "to" after can / could? Remove it.', 'for-এর পরে verb আছে? to-তে বদলান। can / could-এর পরে "to" আছে? বাদ দিন।'),
    avoid: l('Learn the frames: to + verb, so that + subject + can + verb, for + noun.', 'Frame শিখুন: to + verb, so that + subject + can + verb, for + noun।'),
  },
  'cx-clause-tense': {
    rule: l(
      'After when / after / before / until / as soon as / if / unless, use the present for the future (When I finish, …; If it rains, …). Imagined: If + past, would + base verb — never "if … would".',
      'when / after / before / until / as soon as / if / unless-এর পরে ভবিষ্যতের জন্য present (When I finish, …; If it rains, …)। কল্পিত: If + past, would + base verb — কখনো "if … would" না।',
    ),
    why: l('Bangla marks the future in both halves ("যখন আমি শেষ করব, আমি যাব"), so "When I will finish" feels natural.', 'বাংলায় দুই অংশেই ভবিষ্যৎ ("যখন আমি শেষ করব, আমি যাব"), তাই "When I will finish" স্বাভাবিক মনে হয়।'),
    recognise: l('Find when / if / until / as soon as: is there will or would right after it? That is the error.', 'when / if / until / as soon as খুঁজুন: ঠিক পরে কি will বা would আছে? ওটাই ভুল।'),
    avoid: l('Keep will / would in the main clause only.', 'will / would শুধু মূল clause-এ রাখুন।'),
  },
  'cx-relative-form': {
    rule: l(
      'who (people), which (things), that (both, no commas), whose (possession), where (places). The relative word replaces the pronoun: the man who lives (not who he lives), the book that I read (not that I read it).',
      'who (মানুষ), which (জিনিস), that (দুটোই, comma ছাড়া), whose (মালিকানা), where (জায়গা)। Relative word pronoun-এর জায়গা নেয়: the man who lives (who he lives না), the book that I read (that I read it না)।',
    ),
    why: l('Bangla puts the describing clause before the noun and repeats it ("যে লোকটা …, সে …"), so English gets two subjects.', 'বাংলায় বর্ণনার clause noun-এর আগে বসে আর আবার বলা হয় ("যে লোকটা …, সে …"), তাই English-এ দুটো subject চলে আসে।'),
    recognise: l('After who / which / that, is there another he / she / it / they? After the clause, is the subject repeated (", he is")?', 'who / which / that-এর পরে কি আবার he / she / it / they আছে? Clause-এর পরে কি subject আবার এসেছে (", he is")?'),
    avoid: l('Read the clause without the relative word: it should be missing exactly one word (he / it / his / there).', 'Relative word ছাড়া clause পড়ুন: ঠিক একটা word বাদ থাকা উচিত (he / it / his / there)।'),
  },
  'cx-word-order': {
    rule: l(
      'Inside a sentence, a question becomes a statement: question word (or if / whether) + subject + verb, with no do / does / did: I don’t know where she lives; Can you tell me what time it is?',
      'Sentence-এর ভেতরে প্রশ্ন statement হয়: question word (বা if / whether) + subject + verb, do / does / did ছাড়া: I don’t know where she lives; Can you tell me what time it is?',
    ),
    why: l('Bangla keeps the same word order in "স্টেশন কোথায়?" and "জানি না স্টেশন কোথায়", so question order stays inside statements.', 'বাংলায় "স্টেশন কোথায়?" আর "জানি না স্টেশন কোথায়"-এ একই word order, তাই statement-এর ভেতরে প্রশ্নের order থেকে যায়।'),
    recognise: l('After know / tell me / wonder / sure / clear, look for is / does / should BEFORE the subject.', 'know / tell me / wonder / sure / clear-এর পরে subject-এর আগে is / does / should আছে কিনা দেখুন।'),
    avoid: l('Put the subject first, then the verb; drop do / does / did; use if / whether for yes / no.', 'আগে subject, তারপর verb; do / does / did বাদ দিন; হ্যাঁ / না-র জন্য if / whether।'),
  },
  'pn-capitals': {
    rule: l(
      'Capital letters: the first word of a sentence, the pronoun I, names of people and places, days, months, festivals, languages and nationalities. Small letters: seasons, school subjects (except languages) and general nouns (a university, the government).',
      'Capital letter: sentence-এর প্রথম word, pronoun I, মানুষ আর জায়গার নাম, দিন, মাস, উৎসব, ভাষা আর জাতীয়তা। ছোট হাতের: ঋতু, বিষয় (ভাষা ছাড়া) আর সাধারণ noun (a university, the government)।',
    ),
    why: l('Bangla script has no capital letters, and typing on a phone in lower case makes "i" and "dhaka" automatic.', 'বাংলা লিপিতে capital letter নেই, আর phone-এ ছোট হাতের অক্ষরে লেখায় "i" আর "dhaka" অভ্যাস হয়ে যায়।'),
    recognise: l('Scan the start of every sentence, every "I", and every name, day, month and language.', 'প্রতিটা sentence-এর শুরু, প্রতিটা "I", আর প্রতিটা নাম, দিন, মাস আর ভাষা দেখুন।'),
    avoid: l('Do one proofreading pass only for capitals: first words, I, names.', 'শুধু capital-এর জন্য একবার proofread করুন: প্রথম word, I, নাম।'),
  },
  'pn-end-mark': {
    rule: l(
      'Every sentence ends with a full stop or a question mark. Use ? only for direct questions and "Could you …?" requests; indirect questions inside statements (I wonder where he is.) end with a full stop.',
      'প্রতিটা sentence full stop বা question mark দিয়ে শেষ হয়। ? শুধু সরাসরি প্রশ্ন আর "Could you …?" অনুরোধে; statement-এর ভেতরে indirect question (I wonder where he is.) full stop দিয়ে শেষ হয়।',
    ),
    why: l('Bangla ends sentences with the দাঁড়ি (।), which gets forgotten when typing English, and a sentence that feels like a question in Bangla keeps its "?".', 'বাংলায় দাঁড়ি (।) দিয়ে sentence শেষ হয়, যেটা English type করার সময় বাদ পড়ে, আর বাংলায় প্রশ্নের মতো শোনানো sentence-এ "?" থেকে যায়।'),
    recognise: l('Look at the last character of every sentence. Does the WHOLE sentence ask something, or does it report?', 'প্রতিটা sentence-এর শেষ অক্ষর দেখুন। পুরো sentence কি কিছু জিজ্ঞেস করে, নাকি জানায়?'),
    avoid: l('After I wonder / I asked / I don’t know / I would like to know, always end with a full stop.', 'I wonder / I asked / I don’t know / I would like to know-এর পরে সবসময় full stop দিন।'),
  },
  'pn-run-on': {
    rule: l(
      'Two complete sentences cannot be joined by a comma alone. Use a full stop, a semicolon, or a comma + and / but / so.',
      'দুটো পূর্ণ sentence শুধু comma দিয়ে জোড়া যায় না। Full stop, semicolon, বা comma + and / but / so দিন।',
    ),
    why: l('Bangla uses a comma for every pause, and long Bangla sentences join many ideas before one দাঁড়ি.', 'বাংলায় প্রতিটা বিরতিতে comma বসে, আর লম্বা বাংলা sentence একটা দাঁড়ির আগে অনেক idea জোড়ে।'),
    recognise: l('For each comma, check the words on both sides: if both have a subject + verb and no joining word, it is a splice.', 'প্রতিটা comma-র দুই পাশের word দেখুন: দুই দিকেই subject + verb আর জোড়ার word না থাকলে সেটা splice।'),
    avoid: l('When in doubt, use a full stop and start a new sentence with a capital.', 'সন্দেহ হলে full stop দিয়ে capital দিয়ে নতুন sentence শুরু করুন।'),
  },
  'pn-comma-use': {
    rule: l(
      'Commas help in lists (A, B and C), after an opening phrase or clause (In 2010, …), before and / but / so joining two clauses, and around extra information. Never between a subject and its verb, and never before a that-clause.',
      'Comma সাহায্য করে তালিকায় (A, B and C), শুরুর phrase বা clause-এর পরে (In 2010, …), দুটো clause জোড়া and / but / so-এর আগে, আর বাড়তি তথ্যের চারপাশে। Subject আর তার verb-এর মাঝে, বা that-clause-এর আগে কখনো না।',
    ),
    why: l('English commas follow grammar; Bangla commas follow breathing, so they land after long subjects and before "that".', 'English comma grammar মেনে চলে; বাংলা comma শ্বাস মেনে চলে, তাই লম্বা subject-এর পরে আর "that"-এর আগে বসে যায়।'),
    recognise: l('Name the job of each comma: list, opening, before a joining word, or extra information. If it has none of these jobs, delete it.', 'প্রতিটা comma-র কাজ বলুন: তালিকা, শুরু, জোড়ার word-এর আগে, বা বাড়তি তথ্য। কোনো কাজ না থাকলে মুছে দিন।'),
    avoid: l('Put the comma BEFORE but / so (not after), and write numbers as 12,500.', 'but / so-এর আগে comma দিন (পরে না), আর সংখ্যা লিখুন 12,500।'),
  },
  'pn-apostrophes': {
    rule: l(
      'One owner → ’s (my father’s shop) · plural owner ending in s → s’ (the students’ results) · plural without s → ’s (children’s). No apostrophe in plurals, decades (1990s) or its / yours / theirs. it’s = it is.',
      'একজন মালিক → ’s (my father’s shop) · s-এ শেষ হওয়া plural মালিক → s’ (the students’ results) · s ছাড়া plural → ’s (children’s)। Plural, দশক (1990s) বা its / yours / theirs-এ apostrophe না। it’s = it is।',
    ),
    why: l('Bangla shows possession with endings (রহিমের) and has no apostrophe, so it is dropped from possessives and added to plurals.', 'বাংলায় মালিকানা ending দিয়ে বোঝানো হয় (রহিমের) আর apostrophe নেই, তাই মালিকানা থেকে বাদ পড়ে আর plural-এ বসে যায়।'),
    recognise: l('For every word ending in s, ask: is something owned? More than one owner? Or is it just a plural?', 's-এ শেষ হওয়া প্রতিটা word-এর জন্য জিজ্ঞেস করুন: কিছুর মালিকানা? একাধিক মালিক? নাকি শুধু plural?'),
    avoid: l('Test it’s by saying "it is" — if that sounds wrong, write its.', '"it is" বলে it’s যাচাই করুন — ভুল শোনালে its লিখুন।'),
  },
  'pn-colon-semi': {
    rule: l(
      'Colon: after a complete sentence, before a list or explanation (never straight after are / include). Semicolon: between two closely related complete sentences, or before however / therefore (small letter after it).',
      'Colon: পূর্ণ sentence-এর পরে, তালিকা বা ব্যাখ্যার আগে (are / include-এর ঠিক পরে কখনো না)। Semicolon: ঘনিষ্ঠ সম্পর্কের দুটো পূর্ণ sentence-এর মাঝে, বা however / therefore-এর আগে (পরে ছোট হাতের অক্ষর)।',
    ),
    why: l('Colons and semicolons are rarely taught in Bangla-medium schools, so they are used as decoration or as commas.', 'বাংলা মাধ্যম স্কুলে colon আর semicolon কম শেখানো হয়, তাই এগুলো সাজসজ্জা বা comma হিসেবে ব্যবহার হয়।'),
    recognise: l('Before a colon, could the sentence end with a full stop? Before and after a semicolon, are there two full sentences?', 'Colon-এর আগে কি sentence full stop দিয়ে শেষ হতে পারত? Semicolon-এর আগে আর পরে কি দুটো পূর্ণ sentence?'),
    avoid: l('Use at most one colon and one semicolon per essay, and only when you are sure.', 'Essay-তে সর্বোচ্চ একটা colon আর একটা semicolon, আর শুধু নিশ্চিত হলে।'),
  },
  'ce-translation': {
    rule: l(
      'Learn the English phrase, not the Bangla words: I agree · it depends on · take / sit an exam · take medicine · turn on / off the light · my cousin · I am from Khulna.',
      'বাংলা word না, English phrase-টা শিখুন: I agree · it depends on · take / sit an exam · take medicine · turn on / off the light · my cousin · I am from Khulna।',
    ),
    why: l('Bangla says আমি একমত, পরীক্ষা দেওয়া, ওষুধ খাওয়া, লাইট জ্বালানো, cousin ভাই — translated word by word they become "am agree", "give an exam", "eat medicine", "open the light", "cousin brother".', 'বাংলায় আমি একমত, পরীক্ষা দেওয়া, ওষুধ খাওয়া, লাইট জ্বালানো, cousin ভাই — word ধরে অনুবাদ করলে হয় "am agree", "give an exam", "eat medicine", "open the light", "cousin brother"।'),
    recognise: l('Look for am / is before agree or depend, and for give / eat / open with exams, medicine and machines.', 'agree বা depend-এর আগে am / is, আর exam, ওষুধ, যন্ত্রের সাথে give / eat / open খুঁজুন।'),
    avoid: l('When a sentence came to you in Bangla first, check the verb: is it the verb English uses with this noun?', 'Sentence আগে বাংলায় মাথায় এলে verb যাচাই করুন: এই noun-এর সাথে English কি এই verb-ই ব্যবহার করে?'),
  },
  'ce-uncountable': {
    rule: l(
      'Uncountable nouns have no -s, no a / an and a singular verb: information, advice, knowledge, research, evidence, feedback, equipment, furniture, luggage, homework, news, traffic, progress, accommodation. Use much / less / some / a lot of, or a piece of.',
      'Uncountable noun-এ -s নেই, a / an নেই, singular verb: information, advice, knowledge, research, evidence, feedback, equipment, furniture, luggage, homework, news, traffic, progress, accommodation। much / less / some / a lot of, বা a piece of ব্যবহার করুন।',
    ),
    why: l('Bangla can add গুলো / সমূহ to any noun (তথ্যগুলো), so "informations" feels natural. English decides by the word, not the idea.', 'বাংলায় যেকোনো noun-এ গুলো / সমূহ বসে (তথ্যগুলো), তাই "informations" স্বাভাবিক লাগে। English-এ word ঠিক করে, idea না।'),
    recognise: l('Check every noun from the list: is there an -s, an a / an, many or a plural verb?', 'তালিকার প্রতিটা noun যাচাই করুন: -s, a / an, many বা plural verb আছে কি?'),
    avoid: l('Keep a list of the 15 uncountable nouns and learn them with much: much information, much research.', '১৫টা uncountable noun-এর তালিকা রাখুন আর much দিয়ে শিখুন: much information, much research।'),
  },
  'ce-plural-form': {
    rule: l(
      'Plural after numbers above one, many, several, a few, both, the number of and one of the …; singular after a / one / each / every / another. Describers stay singular: a two-week course. people and children are already plural.',
      'এক-এর বেশি সংখ্যা, many, several, a few, both, the number of আর one of the …-এর পরে plural; a / one / each / every / another-এর পরে singular। বর্ণনা singular থাকে: a two-week course। people আর children নিজেই plural।',
    ),
    why: l('Bangla drops the plural after numbers and quantifiers (দুই বছর, অনেক ছাত্র) because the number already shows it. English still marks it.', 'বাংলায় সংখ্যা আর quantifier-এর পরে plural চিহ্ন বাদ যায় (দুই বছর, অনেক ছাত্র), কারণ সংখ্যাই বুঝিয়ে দেয়। English-এ তবু চিহ্ন লাগে।'),
    recognise: l('Find every number and quantifier and look at the noun right after it.', 'প্রতিটা সংখ্যা আর quantifier খুঁজে ঠিক পরের noun দেখুন।'),
    avoid: l('In Task 1, circle each number while proofreading and check the -s after it.', 'Task 1 proofread করার সময় প্রতিটা সংখ্যা চিহ্নিত করে পরের -s যাচাই করুন।'),
  },
  'ce-collocation-pair': {
    rule: l(
      'make a mistake / decision / progress / money · do homework / research / exercise / a job · take a break / a photo / action / part in · have an effect on · pay attention · heavy rain / traffic · high price / cost.',
      'make a mistake / decision / progress / money · do homework / research / exercise / a job · take a break / a photo / action / part in · have an effect on · pay attention · heavy rain / traffic · high price / cost।',
    ),
    why: l('Bangla uses করা for make, do and take, and বেশি for heavy, high and strong, so one Bangla word has several English partners.', 'বাংলায় make, do আর take-এ "করা", আর heavy, high, strong-এ "বেশি" — তাই একটা বাংলা word-এর কয়েকটা English জোড়া।'),
    recognise: l('Look at every make / do / take / have and every adjective before rain, traffic, price and cost.', 'প্রতিটা make / do / take / have আর rain, traffic, price, cost-এর আগের adjective দেখুন।'),
    avoid: l('Learn new nouns with their verb: not "decision" but "make a decision".', 'নতুন noun verb-সহ শিখুন: শুধু "decision" না, "make a decision"।'),
  },
  'ce-confused-pair': {
    rule: l(
      'tell + person, say + words · lend TO, borrow FROM · teach someone, learn from someone · rise (no object), raise something · hear / listen to · lose a thing, miss a bus or class.',
      'tell + মানুষ, say + কথা · lend TO, borrow FROM · teach someone, learn from someone · rise (object নেই), raise something · hear / listen to · জিনিস lose, bus বা class miss।',
    ),
    why: l('Bangla has one verb for each pair (বলা, ধার, শেখা, শোনা, হারানো) and shows the direction with other words; English puts the direction inside the verb.', 'বাংলায় প্রতিটা জোড়ার জন্য একটা verb (বলা, ধার, শেখা, শোনা, হারানো), আর দিক বোঝায় অন্য word দিয়ে; English-এ দিক verb-এর ভেতরেই।'),
    recognise: l('Ask who gives and who receives, and whether the verb has an object.', 'জিজ্ঞেস করুন কে দেয়, কে নেয়, আর verb-এর object আছে কি না।'),
    avoid: l('In Task 1, use rise / fall for trends; use raise / reduce only when someone changes something.', 'Task 1-এ trend-এর জন্য rise / fall; কেউ কিছু বদলালে তবেই raise / reduce।'),
  },
  'ce-redundant': {
    rule: l(
      'Say each idea once: return, repeat, reply (no back / again) · discuss, emphasise, mention, enter, reach (no about / on / into / to) · one comparative (better, not more better) · the reason is that · it / they / this instead of repeating a noun.',
      'প্রতিটা idea একবার বলুন: return, repeat, reply (back / again না) · discuss, emphasise, mention, enter, reach (about / on / into / to না) · comparative একটা (better, more better না) · the reason is that · noun বারবার না বলে it / they / this।',
    ),
    why: l('Bangla doubles for emphasis (ফিরে আসা, আবার বলা), uses নিয়ে after আলোচনা and says বেশি ভালো, so the doubled English sounds complete.', 'বাংলায় জোর দিতে দ্বিগুণ বলা হয় (ফিরে আসা, আবার বলা), আলোচনা-র পরে নিয়ে বসে আর "বেশি ভালো" বলা হয়, তাই দ্বিগুণ English সম্পূর্ণ লাগে।'),
    recognise: l('Read each verb: does the next word repeat its meaning? Read each comparative: is there more + -er?', 'প্রতিটা verb পড়ুন: পরের word কি একই অর্থ আবার বলে? প্রতিটা comparative পড়ুন: more + -er আছে কি?'),
    avoid: l('If you can remove a word and the meaning stays the same, remove it.', 'একটা word বাদ দিলে অর্থ একই থাকলে বাদ দিন।'),
  },
  'voc-word-pattern': {
    rule: l(
      'Learn each word with the words that follow it: afford to + verb · access to · contribute to · benefit from (verb) / the benefit of (noun) · an impact on · the consequences of.',
      'প্রতিটা word পরের word-সহ শিখুন: afford to + verb · access to · contribute to · benefit from (verb) / the benefit of (noun) · an impact on · the consequences of।',
    ),
    why: l('Word lists give one Bangla meaning (access = সুযোগ), so the English pattern is guessed from Bangla ("সুযোগ-এর" → access of).', 'Word-এর তালিকায় একটা বাংলা অর্থ থাকে (access = সুযোগ), তাই English pattern বাংলা থেকে আন্দাজ করা হয় ("সুযোগ-এর" → access of)।'),
    recognise: l('After every new word, look at the next small word (to, of, from, on): is it the one English uses?', 'প্রতিটা নতুন word-এর পরের ছোট word (to, of, from, on) দেখুন: English কি এটাই ব্যবহার করে?'),
    avoid: l('Save words to your Brain with a full example sentence, not just a Bangla meaning.', 'শুধু বাংলা অর্থ না, পুরো উদাহরণ sentence-সহ word Brain-এ save করুন।'),
  },
  'voc-context-clue': {
    rule: l(
      'Guess from clues: a definition (, or / that is), an example (such as), a contrast (unlike, but) or a result (so … that); and from word parts: un- / dis- not, re- again, over- / under- too much / too little, -less without, -able can be.',
      'সংকেত থেকে আন্দাজ করুন: সংজ্ঞা (, or / that is), উদাহরণ (such as), বিপরীত (unlike, but) বা ফল (so … that); আর word-এর অংশ থেকে: un- / dis- না, re- আবার, over- / under- অতিরিক্ত / অপর্যাপ্ত, -less ছাড়া, -able করা যায়।',
    ),
    why: l('Many students learned to translate every word, so one unknown word stops their reading and the clues around it are missed.', 'অনেকে প্রতিটা word অনুবাদ করতে শিখেছেন, তাই একটা অজানা word-এ পড়া থেমে যায় আর আশেপাশের সংকেত চোখ এড়িয়ে যায়।'),
    recognise: l('Read the sentence before and after the word, and split the word into prefix + root + suffix.', 'Word-এর আগের আর পরের sentence পড়ুন, আর word-টাকে prefix + মূল + suffix-এ ভাগ করুন।'),
    avoid: l('In Reading, aim for the general meaning (positive or negative, more or less) and keep going.', 'Reading-এ সাধারণ অর্থ ধরুন (ভালো না খারাপ, বেশি না কম) আর এগিয়ে যান।'),
  },
  'voc-synonym-fit': {
    rule: l(
      'A synonym must keep the meaning, the strength and the grammar: rose (no object) not raised · should not must · foreign not strange · shows that not describes that. Or paraphrase by changing the form (increased → an increase in) or the structure.',
      'Synonym-কে অর্থ, জোর আর grammar রাখতে হবে: raised না rose (object নেই) · must না should · strange না foreign · describes that না shows that। বা form (increased → an increase in) বা গঠন বদলে paraphrase করুন।',
    ),
    why: l('A Bangla–English dictionary lists several English words for one Bangla word (বিদেশি → foreign, strange, alien), so any of them seems right.', 'বাংলা–English dictionary-তে একটা বাংলা word-এর কয়েকটা English word থাকে (বিদেশি → foreign, strange, alien), তাই যেকোনোটা ঠিক মনে হয়।'),
    recognise: l('Put the new word back into the sentence: does it still say exactly the same thing, with the same grammar?', 'নতুন word sentence-এ বসিয়ে দেখুন: হুবহু একই কথা বলে, একই grammar-এ?'),
    avoid: l('Keep technical words (primary school, emissions) and change the words around them.', 'Technical word (primary school, emissions) রাখুন, আশেপাশের word বদলান।'),
  },
  'voc-register-mix': {
    rule: l(
      'Task 2 and Academic Task 1 are formal: children, many / a large number of, obtain, increase, extremely, address a problem. Speaking and letters to friends can use natural informal words. Never in writing: gonna, gotta, stuff, u.',
      'Task 2 আর Academic Task 1 formal: children, many / a large number of, obtain, increase, extremely, address a problem। Speaking আর বন্ধুকে letter-এ স্বাভাবিক informal word চলে। লেখায় কখনো না: gonna, gotta, stuff, u।',
    ),
    why: l('Everyday English is learned from films and chat (informal), and essay English from memorised phrases, so the two get mixed.', 'দৈনন্দিন English শেখা হয় সিনেমা আর chat থেকে (informal), আর essay-র English মুখস্থ phrase থেকে, তাই দুটো মিশে যায়।'),
    recognise: l('Look for kids, stuff, a lot of, get, go up, really and phrasal verbs in essays; and for heavy memorised phrases in Speaking.', 'Essay-তে kids, stuff, a lot of, get, go up, really আর phrasal verb খুঁজুন; আর Speaking-এ ভারী মুখস্থ phrase।'),
    avoid: l('Before writing, ask: who is reading this — an examiner or a friend?', 'লেখার আগে জিজ্ঞেস করুন: কে পড়বেন — examiner না বন্ধু?'),
  },
  'voc-vague-word': {
    rule: l(
      'Replace general words with precise ones: good → beneficial / effective · bad → harmful / severe · thing → factor / aspect / drawback · people → residents / employees. Strong adjectives (crucial, essential, vital, enormous) take no very.',
      'সাধারণ word-এর বদলে নির্দিষ্ট word: good → beneficial / effective · bad → harmful / severe · thing → factor / aspect / drawback · people → residents / employees। জোরালো adjective (crucial, essential, vital, enormous)-এর সাথে very না।',
    ),
    why: l('ভালো, খারাপ and জিনিস cover a huge range in Bangla, so good, bad and thing feel complete in English.', 'বাংলায় ভালো, খারাপ আর জিনিস অনেক কিছু বোঝায়, তাই English-এ good, bad আর thing সম্পূর্ণ মনে হয়।'),
    recognise: l('Circle good, bad, nice, thing, stuff and very in your answer, and ask "what kind?" or "which?".', 'উত্তরে good, bad, nice, thing, stuff আর very চিহ্নিত করুন, আর জিজ্ঞেস করুন "কী রকম?" বা "কোনটা?"।'),
    avoid: l('Learn topic words in pairs: advantage / drawback, beneficial / harmful, increase / decline.', 'Topic word জোড়ায় শিখুন: advantage / drawback, beneficial / harmful, increase / decline।'),
  },
  'voc-form-tone': {
    rule: l(
      'Check the form and the feeling: affect (verb) / effect (noun) · economic (about the economy) / economical (saves money) · advice (n) / advise (v) · significant (adj) / significantly (adv) · consequence and notorious lean negative, benefit and renowned are positive.',
      'Form আর অনুভূতি যাচাই করুন: affect (verb) / effect (noun) · economic (অর্থনীতি-সংক্রান্ত) / economical (সাশ্রয়ী) · advice (n) / advise (v) · significant (adj) / significantly (adv) · consequence আর notorious নেতিবাচক, benefit আর renowned ইতিবাচক।',
    ),
    why: l('One Bangla meaning (অর্থনৈতিক, ফলাফল) covers several English words, so the difference in form and tone is hidden.', 'একটা বাংলা অর্থ (অর্থনৈতিক, ফলাফল) কয়েকটা English word বোঝায়, তাই form আর সুরের পার্থক্য লুকিয়ে থাকে।'),
    recognise: l('Ask what job the gap needs (noun after "the", verb after "can", adverb after a verb) and whether the result is good or bad.', 'জিজ্ঞেস করুন জায়গাটার কী কাজ ("the"-এর পরে noun, "can"-এর পরে verb, verb-এর পরে adverb), আর ফলটা ভালো না খারাপ।'),
    avoid: l('If you are not sure of a new word in the exam, use a word you know well.', 'Exam-এ নতুন word নিয়ে নিশ্চিত না হলে ভালো করে জানা word ব্যবহার করুন।'),
  },
  'ib-version-fact': {
    rule: l('Listening and Speaking are the same in both versions; Reading and Writing differ. Academic is usually for university study, General Training often for work, training or migration — the organisation’s official requirement decides. Academic Writing Task 1 describes visual information; General Training Task 1 is a letter.', 'দুই version-এ Listening আর Speaking একই; Reading আর Writing আলাদা। Academic সাধারণত university-র জন্য, General Training প্রায়ই কাজ, training বা migration-এর জন্য — প্রতিষ্ঠানের official requirement ঠিক করে। Academic Writing Task 1-এ visual তথ্যের বর্ণনা; General Training Task 1 একটা letter।'),
    why: l('Advice from friends or agents ("GT is easier", "any IELTS is fine") replaces the official requirement.', 'বন্ধু বা agent-এর পরামর্শ ("GT সহজ", "যেকোনো IELTS চলবে") official requirement-এর জায়গা নিয়ে নেয়।'),
    recognise: l('Before booking, ask: what is my purpose, and what does the official page of my university, employer or visa authority say?', 'Book করার আগে জিজ্ঞেস করুন: আমার উদ্দেশ্য কী, আর আমার university, employer বা visa কর্তৃপক্ষের official page কী বলে?'),
    avoid: l('Save the official requirement link and read it again just before you book.', 'Official requirement-এর link save করুন আর book করার ঠিক আগে আবার পড়ুন।'),
  },
  'ib-format-fact': {
    rule: l('Listening: 4 parts, 40 questions, about 30 minutes, heard once. Reading: 3 sections, 40 questions, 60 minutes, no extra transfer time. Writing: 60 minutes — Task 1 at least 150 words (~20 min), Task 2 at least 250 words (~40 min, counts for more). Speaking: 11–14 minutes, 3 parts, face to face.', 'Listening: ৪ part, ৪০ প্রশ্ন, প্রায় ৩০ মিনিট, একবার শোনা। Reading: ৩ section, ৪০ প্রশ্ন, ৬০ মিনিট, উত্তর তোলার আলাদা সময় নেই। Writing: ৬০ মিনিট — Task 1 কমপক্ষে ১৫০ word (~২০ মিনিট), Task 2 কমপক্ষে ২৫০ word (~৪০ মিনিট, গুরুত্ব বেশি)। Speaking: ১১–১৪ মিনিট, ৩ part, মুখোমুখি।'),
    why: l('Practice without timing hides how the real test feels, so numbers are guessed or mixed up.', 'সময় ছাড়া practice-এ আসল test কেমন তা বোঝা যায় না, তাই সংখ্যা আন্দাজ করা হয় বা গুলিয়ে যায়।'),
    recognise: l('For each skill, say the parts, the questions and the minutes from memory.', 'প্রতিটা skill-এর part, প্রশ্ন আর মিনিট মুখস্থ বলুন।'),
    avoid: l('Always practise full sections at the real timing.', 'সবসময় আসল সময়ে পূর্ণ section practice করুন।'),
  },
  'ib-delivery-fact': {
    rule: l('Computer-delivered and paper-based IELTS have the same content, timing and scoring; Speaking is face to face in both. On computer you type and see a word count; on paper you write by hand. Paper Listening gives 10 minutes to transfer answers; computer Listening gives 2 minutes to check.', 'Computer-delivered আর paper-based IELTS-এর content, সময় আর scoring একই; দুটোতেই Speaking মুখোমুখি। Computer-এ type করেন আর word count দেখেন; paper-এ হাতে লেখেন। Paper Listening-এ উত্তর তোলার ১০ মিনিট; computer Listening-এ যাচাইয়ের ২ মিনিট।'),
    why: l('Rumours say one format is easier; in fact only the way of answering changes.', 'গুজব বলে একটা format সহজ; আসলে শুধু উত্তর দেওয়ার ধরন বদলায়।'),
    recognise: l('Ask: do I type or handwrite faster and more accurately?', 'জিজ্ঞেস করুন: আমি type করে না হাতে লিখে দ্রুত আর নির্ভুল?'),
    avoid: l('Practise in the format you will take; check dates and result times on the official website.', 'যে format-এ দেবেন সেটায় practice করুন; তারিখ আর result-এর সময় official website-এ দেখুন।'),
  },
  'ib-band-calc': {
    rule: l('Bands are 0–9 in half bands. Overall = the average of the four bands, rounded to the nearest half band: an average ending in .25 rounds up to .5, one ending in .75 rounds up to the next whole band. Requirements often add a minimum for each skill.', 'Band 0–9, half band-সহ। Overall = চারটা band-এর গড়, কাছের half band-এ: .25-এ শেষ হলে বেড়ে .5, .75-এ শেষ হলে বেড়ে পরের পূর্ণ band। Requirement প্রায়ই প্রতিটা skill-এর সর্বনিম্ন যোগ করে।'),
    why: l('Many students think the overall is the lowest band, or forget the per-skill minimum.', 'অনেকে ভাবেন overall মানে সবচেয়ে কম band, বা প্রতি skill-এর সর্বনিম্ন ভুলে যান।'),
    recognise: l('Add the four bands, divide by 4, then round to the nearest half band.', 'চারটা band যোগ করুন, 4 দিয়ে ভাগ করুন, তারপর কাছের half band-এ round করুন।'),
    avoid: l('Always check both the overall and every skill minimum.', 'সবসময় overall আর প্রতিটা skill-এর সর্বনিম্ন দুটোই দেখুন।'),
  },
  'ib-marking-fact': {
    rule: l('Listening and Reading: one mark per correct answer, out of 40, converted to a band; spelling and word limits count. Writing: Task Achievement / Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy, equally weighted; Task 2 counts for more. Speaking: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation, equally weighted.', 'Listening আর Reading: প্রতি সঠিক উত্তরে এক নম্বর, ৪০-এর মধ্যে, band-এ রূপান্তর; বানান আর word-এর সীমা গোনা হয়। Writing: Task Achievement / Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy, সমান গুরুত্ব; Task 2-এর গুরুত্ব বেশি। Speaking: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation, সমান গুরুত্ব।'),
    why: l('Myths like "long essays and rare words get high bands" hide what is really marked.', '"লম্বা essay আর কঠিন word-এ বেশি band"-এর মতো ভুল ধারণা আসলে কী গোনা হয় তা লুকিয়ে রাখে।'),
    recognise: l('For each piece of advice, ask: which criterion does this improve?', 'প্রতিটা পরামর্শের জন্য জিজ্ঞেস করুন: এটা কোন criteria উন্নত করে?'),
    avoid: l('Plan practice criterion by criterion, starting with your weakest.', 'Criteria ধরে ধরে practice plan করুন, সবচেয়ে দুর্বলটা দিয়ে শুরু।'),
  },
  'ib-requirement': {
    rule: l('A requirement usually has a version, an overall band, a minimum for each skill and how recent the result must be (many organisations accept about two years). Both the overall and every minimum must be met. Fees, dates, result times and retakes: the official IELTS or test centre website only. Mino scores are practice estimates.', 'Requirement-এ সাধারণত থাকে version, overall band, প্রতি skill-এর সর্বনিম্ন আর result কত পুরোনো চলবে (অনেক প্রতিষ্ঠান প্রায় দুই বছর)। Overall আর প্রতিটা সর্বনিম্ন — দুটোই পূরণ করতে হয়। Fee, তারিখ, result-এর সময় আর retake: শুধু official IELTS বা test centre-এর website। Mino-র score practice-এর অনুমান।'),
    why: l('Old posts and friends’ requirements replace the organisation’s current official page.', 'পুরোনো post আর বন্ধুর requirement প্রতিষ্ঠানের বর্তমান official page-এর জায়গা নিয়ে নেয়।'),
    recognise: l('Read the requirement line by line: version, overall, minimums, how recent.', 'Requirement লাইন ধরে পড়ুন: version, overall, সর্বনিম্ন, কত পুরোনো।'),
    avoid: l('Check the official page before booking, and aim slightly above every minimum.', 'Book-এর আগে official page দেখুন, আর প্রতিটা সর্বনিম্নের একটু ওপরে লক্ষ্য রাখুন।'),
  },
};

/** The short rule shown before a targeted fix, by pattern key. */
export const POS_PAIR_RULES: Record<string, L> = Object.fromEntries(Object.entries(POS_FIX_GUIDE).map(([k, g]) => [k, g.rule]));
