import type { Lesson } from '../model';
import { choice, correct, gap, l, order, spot, write } from './pos-kit';

/**
 * Connectors, application lessons in the v2 format: cn-7 the linking
 * mistakes Bangla speakers make, cn-8 connectors in IELTS Writing and
 * Speaking with no hints, and cn-9 the module review test. No lesson concept
 * of their own: every question keeps the concept it tests. Original Mino content.
 */
const C = { tag: 'connector' as const };

// ======================================================================= cn-7
export const connMistakes: Lesson = {
  id: 'cn-7',
  format: 'v2',
  title: l('Linking mistakes Bangla speakers make', 'বাংলাভাষীরা linking-এ যে ভুলগুলো করে'),
  why: l('A handful of linking habits come straight from Bangla sentence patterns. Once you can name them, you can find them in your own essays.', 'কয়েকটা linking অভ্যাস সরাসরি বাংলা sentence pattern থেকে আসে। এগুলোর নাম জানলে নিজের essay-তে খুঁজে পাবেন।'),
  minutes: 11,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A student’s Task 2 paragraph', 'একজন শিক্ষার্থীর Task 2 paragraph'),
      situation: l('"Although cities have more jobs, but life is expensive there. Because rent is very high. In other hand, villages are cheaper."', '"Although cities have more jobs, but life is expensive there. Because rent is very high. In other hand, villages are cheaper."'),
      question: l('How many linking mistakes are there?', 'এখানে linking-এর কয়টা ভুল আছে?'),
      options: ['3', '1', '2'],
      answer: '3',
      diagnose: {
        '3': l('Right: Although … but (two contrast words) · "Because rent is very high." (a fragment) · "In other hand" (→ On the other hand).', 'ঠিক: Although … but (দুটো contrast word) · "Because rent is very high." (ভাঙা sentence) · "In other hand" (→ On the other hand)।'),
        '1': l('Look again: "Although … but", a stand-alone "Because …." and "In other hand" are all errors.', 'আবার দেখুন: "Although … but", একা "Because …." আর "In other hand" — তিনটাই ভুল।'),
        '2': l('Close! The one most people miss is "Because rent is very high." — it has no main clause.', 'কাছাকাছি! বেশিরভাগ মানুষ "Because rent is very high." মিস করে — এর কোনো মূল clause নেই।'),
      },
    },
    {
      kind: 'discover',
      title: l('Where do these slips come from?', 'এই ভুলগুলো কোথা থেকে আসে?'),
      items: [
        { en: 'যদিও দাম বেশি, কিন্তু মান ভালো → Although it is expensive, the quality is good.', note: l('"যদিও … কিন্তু" → only one word in English', '"যদিও … কিন্তু" → English-এ একটাই word') },
        { en: 'কারণ ভাড়া বেশি। → … because rent is high.', note: l('"কারণ …" alone → attach it to the main clause', 'একা "কারণ …" → মূল clause-এর সাথে জুড়ুন') },
        { en: 'দাম বেশি, তাই কম বিক্রি হয়। → Prices are high, so sales are low. / … high. Therefore, …', note: l('"তাই" with a comma → so (not ", therefore")', 'comma-র সাথে "তাই" → so (", therefore" না)') },
        { en: 'অন্যদিকে → On the other hand', note: l('fixed phrase with on and the', 'on আর the-সহ fixed phrase') },
      ],
      question: l('What is the common cause?', 'সাধারণ কারণটা কী?'),
      options: [
        l('Bangla linking patterns (pairs, stand-alone কারণ, comma + তাই) copied into English', 'বাংলার linking pattern (জোড়া, একা কারণ, comma + তাই) English-এ কপি করা'),
        l('English has too many connectors to learn', 'English-এ শেখার মতো অনেক বেশি connector'),
        l('Writing too quickly', 'খুব দ্রুত লেখা'),
      ],
      answer: 0,
      pattern: l('Bangla uses pairs and loose clauses; English uses ONE linker per link and full sentences. Check for pairs, fragments and comma splices.', 'বাংলায় জোড়া আর আলগা clause; English-এ প্রতিটা যোগসূত্রে একটা linker আর পূর্ণ sentence। জোড়া, ভাঙা sentence আর comma splice খুঁজুন।'),
    },
    {
      kind: 'concept',
      title: l('The six linking habits to watch', 'যে ছয়টা linking অভ্যাসে খেয়াল রাখবেন'),
      body: l(
        'Almost every linking error by Bangla speakers belongs to one of these groups.',
        'বাংলাভাষীদের প্রায় সব linking ভুল এই দলগুলোর একটায় পড়ে।',
      ),
      points: [
        l('1. Pairs: Although … but, Because … so, Since … therefore → keep one word.', '১. জোড়া: Although … but, Because … so, Since … therefore → একটা word রাখুন।'),
        l('2. Fragments: "Because it is cheap." / "Such as rice and fish." standing alone → attach to a main clause.', '২. ভাঙা sentence: একা "Because it is cheap." / "Such as rice and fish." → মূল clause-এর সাথে জুড়ুন।'),
        l('3. Comma splices: ", however …", ", therefore …", ", moreover …" → full stop or semicolon, or use but / so / and.', '৩. Comma splice: ", however …", ", therefore …", ", moreover …" → full stop বা semicolon, অথবা but / so / and।'),
        l('4. Wrong form after the word: despite + clause, because of + clause, as well as + clause → although / because / as well as + -ing.', '৪. Word-এর পরে ভুল form: despite + clause, because of + clause, as well as + clause → although / because / as well as + -ing।'),
        l('5. Translated phrases: In other hand, At last (for the final point), For example such as → On the other hand, Finally, such as.', '৫. অনুবাদ করা phrase: In other hand, At last (শেষ point-এ), For example such as → On the other hand, Finally, such as।'),
        l('6. Wrong logic or overuse: Moreover before a contrast, a connector at the start of every sentence → match the logic, link with this / which.', '৬. ভুল যুক্তি বা অতিরিক্ত ব্যবহার: বিপরীতের আগে Moreover, প্রতিটা sentence-এর শুরুতে connector → যুক্তি মেলান, this / which দিয়ে জোড়ুন।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Before → after', 'আগে → পরে'),
      items: [
        { en: 'Because the bus was late, so I walked. → Because the bus was late, I walked.', note: l('habit 1: one word', 'অভ্যাস ১: একটা word') },
        { en: 'I like Sylhet. Because it is green. → I like Sylhet because it is green.', note: l('habit 2: attach the clause', 'অভ্যাস ২: clause জুড়ুন') },
        { en: 'It rained, therefore we stayed in. → It rained, so we stayed in.', note: l('habit 3: a conjunction after a comma', 'অভ্যাস ৩: comma-র পরে conjunction') },
        { en: 'Despite it was late, we worked. → Although it was late, we worked.', note: l('habit 4: a clause needs although', 'অভ্যাস ৪: clause-এ although') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Where this shows up in IELTS', 'IELTS-এ কোথায় আসে'),
      uses: [
        { skill: 'writing', example: 'Although many people own cars, public transport is still popular.', note: l('Task 2: one contrast word, no but.', 'Task 2: একটা contrast word, but না।') },
        { skill: 'speaking', example: 'I prefer villages because they’re quieter, so I visit my grandparents often.', note: l('Part 1: because + reason, so + result — each once.', 'Part 1: because + কারণ, so + ফলাফল — প্রতিটা একবার।') },
        { skill: 'reading', example: 'On the other hand, critics argue that the policy is too expensive.', note: l('Reading: On the other hand introduces the opposing view.', 'Reading: On the other hand বিপরীত মত আনে।') },
        { skill: 'listening', example: 'The main hall is closed; however, the library is open.', note: l('Listening: the useful detail follows however.', 'Listening: কাজের তথ্য however-এর পরে আসে।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Though the room was small but it was clean.', right: 'Though the room was small, it was clean.', why: l('habit 1: one contrast word.', 'অভ্যাস ১: একটা contrast word।') },
        { wrong: 'Many students work part-time. Because fees are high.', right: 'Many students work part-time because fees are high.', why: l('habit 2: no stand-alone because-clause.', 'অভ্যাস ২: একা because-clause না।') },
        { wrong: 'Crime has fallen, moreover people feel safer.', right: 'Crime has fallen. Moreover, people feel safer.', why: l('habit 3: no comma splice.', 'অভ্যাস ৩: comma splice না।') },
        { wrong: 'In other hand, some people disagree.', right: 'On the other hand, some people disagree.', why: l('habit 5: the fixed phrase.', 'অভ্যাস ৫: fixed phrase।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: easy → harder', 'Practice: সহজ → কঠিন'),
      exercises: [
        choice('cn-7-p1', 'conn-contrast', { ...C, pattern: 'conn-double', prompt: l('Which sentence is correct?', 'কোন sentence-টা ঠিক?'), options: ['Even though it was expensive, we bought it.', 'Even though it was expensive, but we bought it.', 'Even though it was expensive, however we bought it.'], answer: 'Even though it was expensive, we bought it.', explanation: l('One contrast word per contrast.', 'প্রতিটা বিপরীতে একটা contrast word।'), why: { 'Even though it was expensive, but we bought it.': l('"যদিও … কিন্তু" → remove but.', '"যদিও … কিন্তু" → but বাদ দিন।'), 'Even though it was expensive, however we bought it.': l('even though and however both mark the contrast; keep one.', 'even though আর however দুটোই বিপরীত দেখায়; একটা রাখুন।') } }),
        choice('cn-7-p2', 'conn-cause', { ...C, pattern: 'conn-fragment', prompt: l('Which is a complete sentence?', 'কোনটা পূর্ণ sentence?'), options: ['People move to cities because there are more jobs.', 'Because there are more jobs in cities.', 'Such as more jobs in cities.'], answer: 'People move to cities because there are more jobs.', explanation: l('because-clause + main clause.', 'because-clause + মূল clause।'), why: { 'Because there are more jobs in cities.': l('No main clause: who does what because of this?', 'মূল clause নেই: এর কারণে কে কী করে?'), 'Such as more jobs in cities.': l('such as needs a noun before it in a full sentence.', 'such as-এর আগে একটা পূর্ণ sentence-এ noun লাগে।') } }),
        choice('cn-7-p3', 'conn-cause', { ...C, pattern: 'conn-form', prompt: l('Choose the correct way to join.', 'জোড়ার সঠিক উপায় বেছে নিন।'), sentence: 'The price went up ___ fewer people bought it.', options: [', so', ', therefore', ', moreover'], answer: ', so', explanation: l('After a comma, join with a conjunction (so).', 'Comma-র পরে conjunction (so) দিয়ে জোড়ুন।'), why: { ', therefore': l('"তাই" after a comma → so. Therefore needs a full stop or a semicolon before it.', 'comma-র পরে "তাই" → so। Therefore-এর আগে full stop বা semicolon লাগে।'), ', moreover': l('moreover adds; this is a result. And it cannot follow a comma.', 'moreover যোগ করে; এটা ফলাফল। আর comma-র পরে বসে না।') } }),
        choice('cn-7-p4', 'conn-contrast', { ...C, pattern: 'conn-form', prompt: l('Choose the correct phrase.', 'সঠিক phrase বেছে নিন।'), sentence: '___, online learning can be lonely.', options: ['On the other hand', 'In other hand', 'On other hand'], answer: 'On the other hand', explanation: l('On the other hand.', 'On the other hand।'), why: { 'In other hand': l('"অন্যদিকে" → On the other hand.', '"অন্যদিকে" → On the other hand।'), 'On other hand': l('The fixed phrase needs "the".', 'Fixed phrase-এ "the" লাগে।') } }),
        choice('cn-7-p5', 'conn-cause', { ...C, pattern: 'conn-form', prompt: l('Choose the correct form.', 'সঠিক form বেছে নিন।'), sentence: 'The event was postponed because of ___.', options: ['the storm', 'it was stormy', 'the storm was coming'], answer: 'the storm', explanation: l('because of + noun.', 'because of + noun।'), why: { 'it was stormy': l('A clause needs because (because it was stormy).', 'Clause-এর জন্য because (because it was stormy)।'), 'the storm was coming': l('This is a clause; with because of use a noun: the coming storm.', 'এটা clause; because of-এর সাথে noun: the coming storm।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('cn-7-r1', 'conn-cause', { ...C, pattern: 'conn-form', prompt: l('Write one conjunction.', 'একটা conjunction লিখুন।'), sentence: 'The café was full, ___ we ate at home.', accepted: ['so'], explanation: l('A result after a comma → so.', 'Comma-র পরে ফলাফল → so।'), why: { therefore: l('therefore cannot follow a comma; use so.', 'therefore comma-র পরে বসে না; so দিন।') } }),
        gap('cn-7-r2', 'conn-contrast', { ...C, pattern: 'conn-form', prompt: l('Write the missing word: On ___ other hand.', 'বাদ পড়া word লিখুন: On ___ other hand।'), sentence: 'Cars are convenient. On ___ other hand, they are expensive to run.', accepted: ['the'], explanation: l('On the other hand.', 'On the other hand।') }),
        correct('cn-7-r3', 'conn-cause', { ...C, pattern: 'conn-fragment', prompt: l('Join the fragment to the main clause.', 'ভাঙা অংশটা মূল clause-এর সাথে জুড়ুন।'), sentence: 'I enjoy cooking. Because it helps me relax.', accepted: ['I enjoy cooking because it helps me relax.'], explanation: l('main clause + because-clause.', 'মূল clause + because-clause।') }),
        correct('cn-7-r4', 'conn-contrast', { ...C, pattern: 'conn-double', prompt: l('Correct the sentence (remove one word).', 'Sentence-টা ঠিক করুন (একটা word বাদ দিন)।'), sentence: 'Although the test was short, but it was difficult.', accepted: ['Although the test was short, it was difficult.', 'The test was short, but it was difficult.'], explanation: l('One contrast word per contrast.', 'প্রতিটা বিপরীতে একটা contrast word।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('cn-7-c1', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('Which paragraph has NO linking mistakes?', 'কোন paragraph-এ linking-এর কোনো ভুল নেই?'), options: ['Rents are high in Dhaka. As a result, many students share flats, which saves money.', 'Rents are high in Dhaka, as a result many students share flats. Because it saves money.', 'Because rents are high in Dhaka, so many students share flats, which saves money.'], answer: 'Rents are high in Dhaka. As a result, many students share flats, which saves money.', explanation: l('No comma splice, no fragment, no pair.', 'Comma splice নেই, ভাঙা sentence নেই, জোড়া নেই।') }),
        spot('cn-7-c2', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('One word breaks this sentence. Tap it, then fix it.', 'একটা word sentence-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'The library is quiet, therefore many students study there.', wrong: 'therefore', accepted: ['so'], fixOptions: ['so', 'moreover', 'however'], explanation: l('After a comma → so (or ". Therefore,").', 'Comma-র পরে → so (বা ". Therefore,")।') }),
        order('cn-7-c3', 'conn-contrast', { ...C, pattern: 'conn-double', prompt: l('Build the sentence.', 'Sentence-টা সাজান।'), answer: 'Although the flat is small, it is very bright.', explanation: l('Although + clause, main clause — no but.', 'Although + clause, মূল clause — but না।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: city or village?', 'এবার আপনার পালা: শহর নাকি গ্রাম?'),
      exercises: [
        write('cn-7-y1', 'conn-contrast', {
          ...C,
          prompt: l('Task 2: "Is life better in a city or a village?" Write 3 sentences using although, because and On the other hand — with no pairs, no fragments and no comma splices.', 'Task 2: "Is life better in a city or a village?" although, because আর On the other hand ব্যবহার করে ৩টা sentence লিখুন — জোড়া, ভাঙা sentence আর comma splice ছাড়া।'),
          model: 'Although cities offer more jobs, they are crowded and expensive. Many people still move there because good schools are nearby. On the other hand, village life is calmer and healthier.',
          checklist: [l('Although …, … (no but)', 'Although …, … (but না)'), l('because-clause attached to a main clause', 'because-clause মূল clause-এর সাথে জোড়া'), l('On the other hand, + new sentence', 'On the other hand, + নতুন sentence')],
          explanation: l('Check for the six habits before you finish.', 'শেষ করার আগে ছয়টা অভ্যাস খুঁজুন।'),
          task: 'The student writes 3 Task 2 sentences comparing city and village life with although, because and On the other hand. Check linking only, focusing on the typical Bangla-speaker habits: pairs (although … but, because … so, since … therefore); stand-alone fragments ("Because …." or "Such as …."); comma splices before however / therefore / moreover / as a result; the wrong form after a linker (despite / because of + clause, as well as + clause); translated phrases (In other hand, At last for the final point, For example such as); and a connector that does not match the logic. For each issue name the habit, quote the words and give the fix.',
          target: l('Catch the six linking habits', 'ছয়টা linking অভ্যাস ধরুন'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('One linker per link: not "Although … but", not "Because … so".', 'প্রতিটা যোগসূত্রে একটা linker: "Although … but" না, "Because … so" না।'),
        l('No fragments: attach because- and such as- parts to a main clause.', 'ভাঙা sentence না: because- আর such as- অংশ মূল clause-এর সাথে জুড়ুন।'),
        l('", so" but ". Therefore," · On the other hand · Finally (not At last).', '", so" কিন্তু ". Therefore," · On the other hand · Finally (At last না)।'),
      ],
    },
  ],
};

// ======================================================================= cn-8
export const connInIelts: Lesson = {
  id: 'cn-8',
  format: 'v2',
  title: l('Connectors in IELTS Writing and Speaking', 'IELTS Writing আর Speaking-এ connector'),
  why: l('Coherence and Cohesion is a quarter of your Writing score. Practise choosing the right linker in real Task 1, Task 2 and Speaking answers, with no hints.', 'Coherence and Cohesion আপনার Writing score-এর এক-চতুর্থাংশ। আসল Task 1, Task 2 আর Speaking উত্তরে hint ছাড়া সঠিক linker বাছার অভ্যাস করুন।'),
  minutes: 12,
  difficulty: 'hard',
  skill: 'writing',
  steps: [
    {
      kind: 'hook',
      title: l('A Task 1 comparison', 'একটা Task 1 তুলনা'),
      situation: l('Coffee sales rose by 20%, and tea sales fell by 10%. You want one sentence that compares them.', 'Coffee বিক্রি ২০% বেড়েছে, আর tea বিক্রি ১০% কমেছে। দুটো তুলনা করে একটা sentence চান।'),
      question: l('Which sentence is best?', 'কোন sentence সবচেয়ে ভালো?'),
      options: ['Coffee sales rose by 20%, whereas tea sales fell by 10%.', 'Coffee sales rose by 20%. Moreover, tea sales fell by 10%.', 'Coffee sales rose by 20%, therefore tea sales fell by 10%.'],
      answer: 'Coffee sales rose by 20%, whereas tea sales fell by 10%.',
      diagnose: {
        'Coffee sales rose by 20%, whereas tea sales fell by 10%.': l('Right. whereas / while compares two opposite trends in one sentence — ideal for Task 1.', 'ঠিক। whereas / while একটা sentence-এ দুটো বিপরীত trend তুলনা করে — Task 1-এর জন্য আদর্শ।'),
        'Coffee sales rose by 20%. Moreover, tea sales fell by 10%.': l('Moreover adds a similar point. Rising vs falling is a contrast → whereas / while / However.', 'Moreover একই রকম point যোগ করে। বাড়া বনাম কমা বিপরীত → whereas / while / However।'),
        'Coffee sales rose by 20%, therefore tea sales fell by 10%.': l('The chart does not say one caused the other, and therefore cannot follow a comma. Task 1 reports; it does not guess causes.', 'Chart বলে না একটা অন্যটার কারণ, আর therefore comma-র পরে বসে না। Task 1 জানায়; কারণ অনুমান করে না।'),
      },
    },
    {
      kind: 'discover',
      title: l('The right linkers for each task', 'প্রতিটা task-এর সঠিক linker'),
      items: [
        { en: 'Task 1: while / whereas · similarly · in contrast · overall', note: l('compare and summarise data — no causes, no opinions', 'data তুলনা আর সারাংশ — কারণ না, মতামত না') },
        { en: 'Task 2: however · therefore · as a result · for example · in conclusion', note: l('argue, give reasons and examples, conclude', 'যুক্তি, কারণ আর উদাহরণ, উপসংহার') },
        { en: 'Speaking: and · but · so · because · actually · I mean', note: l('short, natural spoken linkers', 'ছোট, স্বাভাবিক মৌখিক linker') },
      ],
      question: l('Why is "Moreover, …" usually unnatural in Speaking?', 'Speaking-এ "Moreover, …" সাধারণত অস্বাভাবিক কেন?'),
      options: [
        l('It is a formal written connector; spoken answers flow better with and, but, so, because', 'এটা formal লিখিত connector; মৌখিক উত্তর and, but, so, because দিয়ে ভালো চলে'),
        l('It is grammatically wrong', 'এটা grammar-এ ভুল'),
        l('Examiners never understand it', 'Examiner কখনো বোঝেন না'),
      ],
      answer: 0,
      pattern: l('Match the linker to the task: Task 1 compares (while, whereas, similarly), Task 2 argues (however, therefore, for example), Speaking flows (and, but, so, because).', 'Task অনুযায়ী linker: Task 1 তুলনা করে (while, whereas, similarly), Task 2 যুক্তি দেয় (however, therefore, for example), Speaking প্রবাহিত হয় (and, but, so, because)।'),
    },
    {
      kind: 'concept',
      title: l('All the rules on one card', 'সব নিয়ম একটা card-এ'),
      body: l(
        'Everything from this module, in the order to check it when you proofread.',
        'এই module-এর সবকিছু, proofread করার সময় যে ক্রমে যাচাই করবেন।',
      ),
      points: [
        l('1. Logic: add (also, in addition) · contrast (but, however, although, whereas) · cause (because, due to) · result (so, therefore, as a result) · example (for example, such as).', '১. যুক্তি: যোগ (also, in addition) · বিপরীত (but, however, although, whereas) · কারণ (because, due to) · ফলাফল (so, therefore, as a result) · উদাহরণ (for example, such as)।'),
        l('2. Grammar: , but / , so · Although / Because + clause, · . However, / ; therefore, · Despite / Due to + noun.', '২. Grammar: , but / , so · Although / Because + clause, · . However, / ; therefore, · Despite / Due to + noun।'),
        l('3. One linker per link; no fragments; no comma splices.', '৩. প্রতিটা যোগসূত্রে একটা linker; ভাঙা sentence না; comma splice না।'),
        l('4. Task fit: Task 1 → while / whereas / overall (no causes, no opinion); Task 2 → one or two connectors per paragraph + this / which; Speaking → and, but, so, because.', '৪. Task অনুযায়ী: Task 1 → while / whereas / overall (কারণ না, মতামত না); Task 2 → প্রতি paragraph-এ এক-দুটো connector + this / which; Speaking → and, but, so, because।'),
        l('Why Bangla speakers slip: under time pressure we fall back on Bangla pairs and "তাই" with a comma, and we add formal connectors to sound academic. A 60-second proofread for linkers catches most of this.', 'বাংলাভাষীরা কেন ভুল করে: সময়ের চাপে বাংলার জোড়া আর comma-র সাথে "তাই"-তে ফিরে যাই, আর academic শোনাতে formal connector বাড়াই। Linker-এর জন্য ৬০ সেকেন্ডের proofread বেশিরভাগ ভুল ধরে।'),
      ],
    },
    {
      kind: 'examples',
      title: l('Model sentences', 'Model sentence'),
      items: [
        { en: 'In 2000, most people travelled by bus, while by 2020 the car was the most popular option.', note: l('Task 1: while compares two points in time', 'Task 1: while দুটো সময় তুলনা করে') },
        { en: 'Some argue that exams cause stress. However, they also motivate students to study.', note: l('Task 2: However, for the other side', 'Task 2: অন্য দিকের জন্য However,') },
        { en: 'I’d love to visit Japan, but it’s quite expensive, so I’m saving up.', note: l('Speaking: but, so', 'Speaking: but, so') },
        { en: 'Similarly, the number of cyclists doubled.', note: l('Task 1: Similarly adds a matching trend', 'Task 1: Similarly মেলে এমন trend যোগ করে') },
      ],
    },
    {
      kind: 'ielts',
      title: l('Task by task', 'Task অনুযায়ী'),
      uses: [
        { skill: 'writing', example: 'Overall, spending on housing rose, whereas spending on clothing declined.', note: l('Task 1 overview: Overall + whereas.', 'Task 1 overview: Overall + whereas।') },
        { skill: 'speaking', example: 'Actually, I don’t cook much, because I live in a hostel.', note: l('Part 1: natural spoken linking.', 'Part 1: স্বাভাবিক মৌখিক linking।') },
        { skill: 'reading', example: 'In contrast, the northern region saw little change.', note: l('Reading: In contrast signals a comparison — useful for matching features.', 'Reading: In contrast তুলনা বোঝায় — matching feature প্রশ্নে কাজে লাগে।') },
        { skill: 'listening', example: 'We were going to meet on Monday, but instead we’ll meet on Tuesday.', note: l('Listening: but instead signals the real answer.', 'Listening: but instead আসল উত্তর বোঝায়।') },
      ],
    },
    {
      kind: 'mistakes',
      title: l('Common Mistake Lab', 'Common Mistake Lab'),
      items: [
        { wrong: 'Car use rose. Therefore, bus use fell. (Task 1)', right: 'Car use rose, whereas bus use fell.', why: l('Task 1 compares; it does not claim causes.', 'Task 1 তুলনা করে; কারণ দাবি করে না।') },
        { wrong: 'Moreover, I like football. Furthermore, I play cricket. (Speaking)', right: 'I like football, and I play cricket too.', why: l('Speaking: natural linkers, not written ones.', 'Speaking: লিখিত না, স্বাভাবিক linker।') },
        { wrong: 'Firstly, … Secondly, … Thirdly, … Fourthly, … (in one paragraph)', right: 'Use sequence words for main points only, and link details with this / which.', why: l('Too many sequence words sound mechanical.', 'অনেক বেশি ক্রমের word mechanical শোনায়।') },
      ],
    },
    {
      kind: 'practice',
      mode: 'practice',
      title: l('Practice: no hints', 'Practice: কোনো hint নেই'),
      exercises: [
        choice('cn-8-p1', 'conn-contrast', { ...C, pattern: 'conn-meaning', prompt: l('Task 1: choose the linker.', 'Task 1: linker বেছে নিন।'), sentence: 'Rice production increased in Asia, ___ it remained stable in Africa.', options: ['while', 'because', 'moreover'], answer: 'while', explanation: l('Comparing two regions → while / whereas.', 'দুটো অঞ্চলের তুলনা → while / whereas।'), why: { because: l('Task 1 does not claim that one caused the other.', 'Task 1 দাবি করে না যে একটা অন্যটার কারণ।'), moreover: l('moreover adds a similar point and cannot follow a comma.', 'moreover একই রকম point যোগ করে আর comma-র পরে বসে না।') } }),
        choice('cn-8-p2', 'conn-example', { ...C, pattern: 'conn-meaning', prompt: l('Task 1: choose the start of the overview.', 'Task 1: overview-এর শুরু বেছে নিন।'), options: ['Overall, sales of electric cars rose sharply.', 'In conclusion, electric cars are the future.', 'To sum up my opinion, sales rose.'], answer: 'Overall, sales of electric cars rose sharply.', explanation: l('Overall + the main trend, no opinion.', 'Overall + মূল trend, মতামত না।'), why: { 'In conclusion, electric cars are the future.': l('An opinion — not allowed in Task 1.', 'মতামত — Task 1-এ চলে না।'), 'To sum up my opinion, sales rose.': l('Task 1 has no opinion.', 'Task 1-এ কোনো মতামত নেই।') } }),
        choice('cn-8-p3', 'conn-cause', { ...C, pattern: 'conn-meaning', prompt: l('Task 2: choose the linker.', 'Task 2: linker বেছে নিন।'), sentence: 'Many rivers are polluted. ___, fish stocks have declined.', options: ['As a result', 'However', 'For example'], answer: 'As a result', explanation: l('The decline is a result of pollution.', 'কমে যাওয়া দূষণের ফলাফল।'), why: { However: l('There is no contrast: the second idea is an effect.', 'কোনো বিপরীত নেই: দ্বিতীয় idea একটা প্রভাব।'), 'For example': l('The decline is not an example of pollution; it is a result.', 'কমে যাওয়া দূষণের উদাহরণ না; ফলাফল।') } }),
        choice('cn-8-p4', 'conn-add', { ...C, pattern: 'conn-meaning', prompt: l('Speaking: which answer sounds most natural?', 'Speaking: কোন উত্তর সবচেয়ে স্বাভাবিক শোনায়?'), options: ['I love reading, and I also enjoy long walks, so weekends are my favourite time.', 'Moreover, I love reading. Furthermore, I enjoy walks. Therefore, weekends are my favourite.', 'I love reading. In addition to that, furthermore, I enjoy walks.'], answer: 'I love reading, and I also enjoy long walks, so weekends are my favourite time.', explanation: l('Spoken linkers: and, also, so.', 'মৌখিক linker: and, also, so।'), why: { 'Moreover, I love reading. Furthermore, I enjoy walks. Therefore, weekends are my favourite.': l('Formal written connectors sound memorised in Speaking.', 'Formal লিখিত connector Speaking-এ মুখস্থ শোনায়।'), 'I love reading. In addition to that, furthermore, I enjoy walks.': l('Two adding connectors together, and too formal for speaking.', 'দুটো যোগের connector একসাথে, আর speaking-এর জন্য খুব formal।') } }),
        choice('cn-8-p5', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('Task 2: which sentence is correctly punctuated?', 'Task 2: কোন sentence-এর punctuation ঠিক?'), options: ['Fast food is cheap; however, it is often unhealthy.', 'Fast food is cheap, however, it is often unhealthy.', 'Fast food is cheap however it is often unhealthy.'], answer: 'Fast food is cheap; however, it is often unhealthy.', explanation: l('; however, — semicolon before, comma after.', '; however, — আগে semicolon, পরে comma।'), why: { 'Fast food is cheap, however, it is often unhealthy.': l('A comma before however makes a comma splice.', 'however-এর আগে comma দিলে comma splice হয়।'), 'Fast food is cheap however it is often unhealthy.': l('No punctuation: two sentences run together.', 'Punctuation নেই: দুটো sentence একসাথে।') } }),
      ],
    },
    {
      kind: 'practice',
      mode: 'recall',
      title: l('Active recall: no options', 'Active recall: কোনো option নেই'),
      exercises: [
        gap('cn-8-r1', 'conn-contrast', { ...C, pattern: 'conn-meaning', prompt: l('Task 1: write one word to compare two trends.', 'Task 1: দুটো trend তুলনা করতে একটা word লিখুন।'), sentence: 'Imports doubled, ___ exports stayed the same.', accepted: ['while', 'whereas', 'but'], explanation: l('Comparing → while / whereas.', 'তুলনা → while / whereas।'), why: { so: l('Task 1 does not say one trend caused the other.', 'Task 1 বলে না একটা trend অন্যটার কারণ।') } }),
        gap('cn-8-r2', 'conn-add', { ...C, pattern: 'conn-meaning', prompt: l('Task 1: write one word that adds a matching trend.', 'Task 1: মেলে এমন trend যোগ করার একটা word লিখুন।'), sentence: 'Bus use fell by 10%. ___, train use dropped by 12%.', accepted: ['similarly', 'likewise'], explanation: l('A matching trend → Similarly,', 'মেলে এমন trend → Similarly,'), why: { however: l('Both fell: no contrast → Similarly.', 'দুটোই কমেছে: বিপরীত না → Similarly।') } }),
        correct('cn-8-r3', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('Fix the Task 2 sentence (punctuation around the connector).', 'Task 2 sentence-টা ঠিক করুন (connector-এর চারপাশের punctuation)।'), sentence: 'Tourism brings money, as a result local businesses grow.', accepted: ['Tourism brings money. As a result, local businesses grow.', 'Tourism brings money; as a result, local businesses grow.', 'Tourism brings money, so local businesses grow.'], explanation: l('. As a result, / ; as a result, / , so', '. As a result, / ; as a result, / , so') }),
        spot('cn-8-r4', 'conn-cause', { ...C, pattern: 'conn-meaning', prompt: l('One word breaks the logic. Tap it and type the right one.', 'একটা word যুক্তি ভাঙছে। Tap করে সঠিকটা লিখুন।'), sentence: 'I didn’t sleep well, although I felt tired in the exam.', wrong: 'although', accepted: ['so'], explanation: l('Feeling tired is the result → so.', 'ক্লান্ত লাগা ফলাফল → so।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Mini challenge', 'Mini challenge'),
      exercises: [
        choice('cn-8-c1', 'conn-cohesion', { ...C, pattern: 'conn-meaning', prompt: l('Which Task 2 paragraph would score best for Coherence and Cohesion?', 'Coherence and Cohesion-এ কোন Task 2 paragraph সবচেয়ে ভালো score পাবে?'), options: ['Online classes save time. However, they can be isolating, which may affect students’ motivation. This is why many colleges now mix online and face-to-face teaching.', 'Firstly, online classes save time. Moreover, they are isolating. Furthermore, motivation falls. In addition, colleges mix teaching.', 'Online classes save time, however they are isolating, therefore motivation falls, moreover colleges mix teaching.'], answer: 'Online classes save time. However, they can be isolating, which may affect students’ motivation. This is why many colleges now mix online and face-to-face teaching.', explanation: l('Accurate logic, correct punctuation, natural referencing.', 'সঠিক যুক্তি, সঠিক punctuation, স্বাভাবিক referencing।') }),
        spot('cn-8-c2', 'conn-example', { ...C, pattern: 'conn-meaning', prompt: l('One word breaks this Task 1 overview. Tap it, then fix it.', 'একটা word Task 1 overview-টা ভাঙছে। Tap করে ঠিক করুন।'), sentence: 'Therefore, the number of visitors rose in all three museums.', wrong: 'Therefore', accepted: ['Overall'], fixOptions: ['Overall', 'Moreover', 'However'], explanation: l('A Task 1 summary of trends → Overall,', 'Task 1-এর trend সারাংশ → Overall,') }),
        correct('cn-8-c3', 'conn-contrast', { ...C, pattern: 'conn-double', prompt: l('Fix the Task 2 sentence (two linking errors).', 'Task 2 sentence-টা ঠিক করুন (দুটো linking-এর ভুল)।'), sentence: 'Although many people drive, but in other hand buses are cheaper.', accepted: ['Although many people drive, buses are cheaper.', 'Many people drive. On the other hand, buses are cheaper.', 'Many people drive, but buses are cheaper.'], explanation: l('One contrast linker; "On the other hand".', 'একটা contrast linker; "On the other hand"।') }),
      ],
    },
    {
      kind: 'practice',
      mode: 'personal',
      title: l('Your turn: a Task 2 paragraph', 'এবার আপনার পালা: একটা Task 2 paragraph'),
      exercises: [
        write('cn-8-y1', 'conn-cohesion', {
          ...C,
          prompt: l('Task 2: "Should children use smartphones?" Write 3 sentences with no hints: a point, the other side, and your view. Use at most two connectors and at least one this / which.', 'Task 2: "Should children use smartphones?" hint ছাড়া ৩টা sentence লিখুন: একটা point, অন্য দিক, আর আপনার মত। সর্বোচ্চ দুটো connector আর অন্তত একটা this / which ব্যবহার করুন।'),
          model: 'Smartphones help children learn, since they give instant access to information. However, many children spend hours on games, which can affect their sleep. This is why I believe parents should set clear limits.',
          checklist: [l('connectors that match the logic (cause, contrast)', 'যুক্তির সাথে মেলে এমন connector (কারণ, বিপরীত)'), l('correct punctuation — no comma splices, no fragments', 'সঠিক punctuation — comma splice না, ভাঙা sentence না'), l('this / which to link without extra connectors', 'বাড়তি connector ছাড়া জুড়তে this / which')],
          explanation: l('Accurate, natural linking beats many connectors.', 'অনেক connector-এর চেয়ে সঠিক, স্বাভাবিক linking ভালো।'),
          task: 'The student writes a 3-sentence Task 2 paragraph about children and smartphones, with no hints. Check linking and cohesion only: every connector matches the logic (addition, contrast, cause, result, example); grammar and punctuation around each linker (, but / , so; Although / Because + clause with a comma if first; . However, / ; therefore, — no comma splices; despite / due to + noun); one linker per link (no although … but); no stand-alone fragments; natural referencing with this / these + noun and ", which"; no more connectors than needed. For each issue quote the words, name the rule and give the fix; praise natural linking.',
          target: l('Every linker, no hints', 'প্রতিটা linker, কোনো hint ছাড়া'),
        }),
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Task 1: while / whereas / similarly / overall — no causes, no opinions.', 'Task 1: while / whereas / similarly / overall — কারণ না, মতামত না।'),
        l('Task 2: one or two connectors per paragraph + this / which.', 'Task 2: প্রতি paragraph-এ এক-দুটো connector + this / which।'),
        l('Speaking: and, but, so, because — keep formal connectors for writing.', 'Speaking: and, but, so, because — formal connector লেখার জন্য রাখুন।'),
      ],
    },
  ],
};

// ======================================================================= cn-9
export const connReview: Lesson = {
  id: 'cn-9',
  kind: 'test',
  title: l('Connectors review test', 'Connectors review test'),
  why: l('Check what you have learned. Your mistakes here decide what Mino suggests you review.', 'কী শিখলেন যাচাই করুন। এখানের ভুল দেখেই Mino ঠিক করবে কী review করতে বলবে।'),
  minutes: 10,
  difficulty: 'medium',
  skill: 'writing',
  steps: [
    {
      kind: 'concept',
      title: l('How this test works', 'এই test কীভাবে চলবে'),
      body: l(
        '12 questions from every lesson in this module. You see the answer after each question. Score 80% or more to complete the module; if you score less, Mino will suggest short reviews for the connectors you missed.',
        'এই module-এর সব lesson থেকে ১২টা প্রশ্ন। প্রতিটা প্রশ্নের পরে answer দেখবেন। ৮০% বা বেশি পেলে module শেষ; কম পেলে যে connector-গুলো ভুল হয়েছে, Mino সেগুলোর ছোট review suggest করবে।',
      ),
    },
    {
      kind: 'practice',
      title: l('Part 1: choose', 'Part 1: বেছে নিন'),
      exercises: [
        choice('cn-9-e1', 'conn-add', { ...C, pattern: 'conn-form', prompt: l('Choose the correct sentence.', 'সঠিক sentence বেছে নিন।'), options: ['The flat also has a balcony.', 'The flat has also a balcony.', 'Also, the flat has a balcony also.'], answer: 'The flat also has a balcony.', explanation: l('also before the main verb.', 'মূল verb-এর আগে also।') }),
        choice('cn-9-e2', 'conn-contrast', { ...C, pattern: 'conn-form', prompt: l('Choose the word.', 'Word বেছে নিন।'), sentence: '___ the long queue, we got tickets.', options: ['Despite', 'Although', 'But'], answer: 'Despite', explanation: l('+ noun → despite.', '+ noun → despite।') }),
        choice('cn-9-e3', 'conn-cause', { ...C, pattern: 'conn-meaning', prompt: l('Choose the word.', 'Word বেছে নিন।'), sentence: 'The road was blocked, ___ we took another route.', options: ['so', 'because', 'although'], answer: 'so', explanation: l('A result → so.', 'ফলাফল → so।') }),
        choice('cn-9-e4', 'conn-example', { ...C, pattern: 'conn-form', prompt: l('Choose the word.', 'Word বেছে নিন।'), sentence: 'Many sports, ___ cricket and football, are popular here.', options: ['such as', 'for example,', 'at last'], answer: 'such as', explanation: l('+ nouns inside the sentence → such as.', 'Sentence-এর ভেতরে + noun → such as।') }),
        choice('cn-9-e5', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('Which is correctly punctuated?', 'কোনটার punctuation ঠিক?'), options: ['It was late. Therefore, we took a taxi.', 'It was late, therefore we took a taxi.', 'It was late therefore, we took a taxi.'], answer: 'It was late. Therefore, we took a taxi.', explanation: l('. Therefore, + new sentence.', '. Therefore, + নতুন sentence।') }),
        choice('cn-9-e6', 'conn-cohesion', { ...C, pattern: 'conn-form', prompt: l('Choose the word.', 'Word বেছে নিন।'), sentence: 'The town built a new hospital, ___ has saved many lives.', options: ['which', 'who', 'this'], answer: 'which', explanation: l(', which refers to the previous idea.', ', which আগের idea-কে বোঝায়।') }),
      ],
    },
    {
      kind: 'practice',
      title: l('Part 2: write and fix', 'Part 2: লিখুন আর ঠিক করুন'),
      exercises: [
        gap('cn-9-e7', 'conn-add', { ...C, pattern: 'conn-meaning', prompt: l('Write too or either.', 'too বা either লিখুন।'), sentence: 'She doesn’t drink coffee, and I don’t ___.', accepted: ['either'], explanation: l('Negative → either.', 'Negative → either।') }),
        gap('cn-9-e8', 'conn-cause', { ...C, pattern: 'conn-form', prompt: l('Write two words for a cause + noun.', 'কারণ + noun-এর জন্য দুটো word লিখুন।'), sentence: 'The train was late ___ a signal failure.', accepted: ['due to', 'because of', 'owing to'], explanation: l('+ noun → due to / because of.', '+ noun → due to / because of।') }),
        correct('cn-9-e9', 'conn-contrast', { ...C, pattern: 'conn-double', prompt: l('Correct the sentence (remove one word).', 'Sentence-টা ঠিক করুন (একটা word বাদ দিন)।'), sentence: 'Although the hotel was cheap, but it was clean.', accepted: ['Although the hotel was cheap, it was clean.', 'The hotel was cheap, but it was clean.'], explanation: l('One contrast word.', 'একটা contrast word।') }),
        correct('cn-9-e10', 'conn-cause', { ...C, pattern: 'conn-fragment', prompt: l('Join the fragment to the main clause.', 'ভাঙা অংশটা মূল clause-এর সাথে জুড়ুন।'), sentence: 'I walk to college. Because it is close.', accepted: ['I walk to college because it is close.'], explanation: l('main clause + because-clause.', 'মূল clause + because-clause।') }),
        correct('cn-9-e11', 'conn-example', { ...C, pattern: 'conn-meaning', prompt: l('Correct the last sentence (the final point).', 'শেষ sentence-টা ঠিক করুন (শেষ point)।'), sentence: 'At last, it is safe.', accepted: ['Finally, it is safe.', 'Lastly, it is safe.'], explanation: l('Last point → Finally / Lastly.', 'শেষ point → Finally / Lastly।') }),
        correct('cn-9-e12', 'conn-grammar', { ...C, pattern: 'conn-form', prompt: l('Fix the comma splice.', 'Comma splice ঠিক করুন।'), sentence: 'The course is short, however it is intensive.', accepted: ['The course is short. However, it is intensive.', 'The course is short; however, it is intensive.', 'The course is short, but it is intensive.'], explanation: l('. However, / ; however, / , but', '. However, / ; however, / , but') }),
      ],
    },
    {
      kind: 'ielts',
      title: l('IELTS connection', 'IELTS-এ কোথায় লাগবে'),
      uses: [
        { skill: 'writing', example: 'Car use rose, whereas bus use fell. Overall, private transport grew.', note: l('Task 1: whereas, Overall.', 'Task 1: whereas, Overall।') },
        { skill: 'speaking', example: 'I like my job, but it’s tiring, so I relax at weekends.', note: l('Part 1: but, so.', 'Part 1: but, so।') },
      ],
    },
    {
      kind: 'recall',
      title: l('Remember', 'মনে রাখুন'),
      points: [
        l('Choose by logic: add, contrast, cause, result, example.', 'যুক্তি দেখে বাছুন: যোগ, বিপরীত, কারণ, ফলাফল, উদাহরণ।'),
        l('Choose the grammar: , but · Although + clause, · . However, · Despite + noun.', 'Grammar বাছুন: , but · Although + clause, · . However, · Despite + noun।'),
        l('One linker per link, no fragments, and link with this / which.', 'প্রতিটা যোগসূত্রে একটা linker, ভাঙা sentence না, আর this / which দিয়ে জোড়ুন।'),
      ],
    },
  ],
};
