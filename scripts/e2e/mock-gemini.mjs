// A local stand-in for the Gemini API, used only by the E2E tests.
// The app talks to it through GEMINI_API_BASE_URL; no real key is involved.
//
// - Foundation sentence checks (JSON mode): a tense slip such as "have went …
//   yesterday" gets the tense-specific feedback ONLY when the server's prompt
//   carried the tense rules, so the test proves the prompt, not just the mock.
// - Mino chat: calls getFoundationProgress first, then answers and quotes the
//   challenge result lines from the student snapshot in the system prompt.
// - Article tasks ("I am student at an university") get article feedback only
//   when the prompt carried the article rules.
// - Agreement tasks ("… of schools have improved", "My father work …") get
//   subject–verb feedback only when the prompt carried the agreement rules.
// - Preposition tasks ("rose with 35 …", "in 7 am") get preposition feedback
//   only when the prompt carried the preposition rules.
// - Connector tasks ("Although …, but …", a stand-alone "Because …") get
//   linking feedback only when the prompt carried the connector rules.
// - Complex-sentence tasks ("who she works", "When I will finish") get clause
//   feedback only when the prompt carried the complex-sentence rules.
// - Punctuation tasks ("My mothers cooking", a lower-case "i am") get
//   punctuation feedback only when the prompt carried the punctuation rules.
import http from 'node:http';
import fs from 'node:fs';

const PORT = Number(process.env.MOCK_GEMINI_PORT ?? 4010);
const LOG = process.env.MOCK_GEMINI_LOG;

http
  .createServer((req, res) => {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      const b = JSON.parse(body || '{}');
      const system = b.systemInstruction?.parts?.map((p) => p.text).join('\n') ?? '';
      if (LOG) fs.appendFileSync(LOG, JSON.stringify({ system: system.slice(0, 4000), tools: (b.tools?.[0]?.functionDeclarations ?? []).map((f) => f.name) }) + '\n');
      const reply = (parts) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ candidates: [{ content: { role: 'model', parts }, finishReason: 'STOP' }], usageMetadata: { promptTokenCount: 10, candidatesTokenCount: 5, totalTokenCount: 15 } }));
      };

      if (b.generationConfig?.responseMimeType === 'application/json' && /Word meaning in context/.test(system)) {
        // Reading word lookups: a contextual meaning for the clicked word, in the prompt's JSON shape.
        const text = b.contents?.[0]?.parts?.[0]?.text ?? '';
        const word = (text.match(/<word>([\s\S]*?)<\/word>/) ?? [])[1] ?? '';
        const sentence = (text.match(/<sentence>([\s\S]*?)<\/sentence>/) ?? [])[1] ?? '';
        const known = {
          female: { pos: 'adjective', bn: 'স্ত্রী / মাদি', en: 'of the sex that lays eggs or gives birth' },
        };
        const k = known[word.toLowerCase()] ?? { pos: 'word', bn: `“${word}” শব্দের অর্থ`, en: `the meaning of "${word}" here` };
        return reply([{ text: JSON.stringify({
          word,
          lemma: word.toLowerCase(),
          partOfSpeech: k.pos,
          bn: k.bn,
          en: k.en,
          contextBn: `এই বাক্যে “${word}” মানে ${k.bn}।`,
          contextEn: `Here "${word}" means ${k.en}. (${sentence.length} chars of context)`,
          example: `An example with ${word}.`,
          exampleBn: `${word} দিয়ে একটা উদাহরণ।`,
        }) }]);
      }
      if (b.generationConfig?.responseMimeType === 'application/json') {
        const student = (b.contents?.[0]?.parts?.[0]?.text.match(/<student>([\s\S]*)<\/student>/) ?? [])[1] ?? '';
        const bn = /natural Bangla/.test(system);
        const tenseRules = /Tense feedback \(target: /.test(system);
        if (tenseRules && /\bhave went\b/i.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: false,
            corrected: student.replace(/\bhave went\b/i, 'went'),
            feedback: bn ? 'ভালো চেষ্টা! এখানে দুটো আলাদা সমস্যা আছে।' : 'Good try! There are two separate problems here.',
            fixes: [{
              quote: 'have went',
              fix: 'went',
              why: bn
                ? "'yesterday' একটা শেষ হওয়া সময়, তাই Past Simple লাগবে। আর 'have went' form-টা কখনোই ঠিক না: 'went' অথবা 'have gone'।"
                : "'yesterday' is a finished time, so use the Past Simple: 'went'. Also, 'have went' is never a correct form — it is 'went' or 'have gone'.",
            }],
            practice: { sentence: 'Last week we ___ (visit) Sylhet.', answers: ['visited'] },
          }) }]);
        }
        const articleRules = /Article feedback \(target: /.test(system);
        if (articleRules && /\bam student\b/i.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: false,
            corrected: student.replace(/\bam student\b/i, 'am a student').replace(/\ban university\b/i, 'a university'),
            feedback: bn ? 'ভালো চেষ্টা! দুটো article ঠিক করতে হবে।' : 'Good try! Two articles need fixing.',
            fixes: [
              { quote: 'am student', fix: 'am a student', why: bn ? "'student' গোনা যায় এমন একটা জিনিস, তাই আগে 'a' লাগবে।" : "'student' is one countable thing, so it needs 'a'." },
              ...(/\ban university\b/i.test(student) ? [{ quote: 'an university', fix: 'a university', why: bn ? "'university' শুরু হয় 'ইউ' sound দিয়ে — consonant sound, তাই 'a'।" : "'university' starts with a 'yoo' sound — a consonant sound, so 'a'." }] : []),
            ],
            practice: { sentence: 'My uncle is ___ engineer.', answers: ['an'] },
          }) }]);
        }
        const agreementRules = /Subject–verb agreement feedback \(target: /.test(system);
        if (agreementRules && /\bhave improved\b/i.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: false,
            corrected: student.replace(/\bhave improved\b/i, 'has improved'),
            feedback: bn ? 'ভালো চেষ্টা! একটা verb আসল subject-এর সাথে মিলছে না।' : 'Good try! One verb does not agree with its real subject.',
            fixes: [{ quote: 'have improved', fix: 'has improved', why: bn ? "আসল subject হলো 'the quality' (একটা), 'schools' না — তাই 'has'।" : "The real subject is 'the quality' (one), not 'schools' — so 'has'." }],
            practice: { sentence: 'The price of vegetables ___ gone up.', answers: ['has'] },
          }) }]);
        }
        if (agreementRules && /\bfather work\b/i.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: false,
            corrected: student.replace(/\bfather work\b/i, 'father works'),
            feedback: bn ? 'ভালো চেষ্টা! একজন মানুষ হলে verb-এ -s লাগবে।' : 'Good try! One person needs verb + s.',
            fixes: [{ quote: 'father work', fix: 'father works', why: bn ? "'my father' একজন (he), তাই verb + s: 'works'।" : "'my father' is one person (he), so verb + s: 'works'." }],
            practice: { sentence: 'My mother ___ (cook) every evening.', answers: ['cooks'] },
          }) }]);
        }
        const prepositionRules = /Preposition feedback \(target: /.test(system);
        if (prepositionRules && /\brose with\b/i.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: false,
            corrected: student.replace(/\brose with\b/i, 'rose by'),
            feedback: bn ? 'ভালো চেষ্টা! এই সংখ্যাটা পরিবর্তন, তাই by লাগবে।' : 'Good try! This number is the change, so it needs by.',
            fixes: [{ quote: 'rose with', fix: 'rose by', why: bn ? "৩৫ point হলো পরিবর্তনের পরিমাণ (change), তাই 'rose by'।" : "35 points is the size of the change, so 'rose by'." }],
            practice: { sentence: 'Sales fell ___ 10% last year.', answers: ['by'] },
          }) }]);
        }
        if (prepositionRules && /\bin 7 am\b/i.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: false,
            corrected: student.replace(/\bin 7 am\b/i, 'at 7 am'),
            feedback: bn ? 'ভালো চেষ্টা! ঘড়ির সময়ে at লাগে।' : 'Good try! Clock times take at.',
            fixes: [{ quote: 'in 7 am', fix: 'at 7 am', why: bn ? "৭টা একটা নির্দিষ্ট সময়-বিন্দু, তাই 'at 7 am'।" : "7 am is an exact point in time, so 'at 7 am'." }],
            practice: { sentence: 'The class starts ___ 9 am.', answers: ['at'] },
          }) }]);
        }
        const connectorRules = /Connector feedback \(target: /.test(system);
        if (connectorRules && /\bAlthough\b[^.]*,\s*but\b/i.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: false,
            corrected: student.replace(/,\s*but\b/i, ','),
            feedback: bn ? 'ভালো চেষ্টা! একটা বিপরীতে একটাই contrast word লাগে।' : 'Good try! One contrast needs only one contrast word.',
            fixes: [{ quote: 'expensive, but many', fix: 'expensive, many', why: bn ? "'Although' আগেই বিপরীত দেখায় (যদিও … কিন্তু-র মতো দুটো লাগে না), তাই 'but' বাদ দিন।" : "'Although' already shows the contrast — use one contrast word, so remove 'but'." }],
            practice: { sentence: '___ it was raining, we played football.', answers: ['although', 'though', 'even though'] },
          }) }]);
        }
        if (connectorRules && /\.\s*Because\b/.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: false,
            corrected: student.replace(/\.\s*Because\b/, ' because'),
            feedback: bn ? 'ভালো চেষ্টা! because-অংশটা একা sentence হতে পারে না।' : 'Good try! The because-part cannot stand alone.',
            fixes: [{ quote: 'cities. Because there', fix: 'cities because there are more jobs', why: bn ? 'একা "Because …." একটা ভাঙা sentence; মূল clause-এর সাথে জুড়ুন।' : 'A stand-alone "Because …." is a fragment; attach it to the main clause.' }],
            practice: { sentence: 'I take the metro ___ it is faster.', answers: ['because', 'since', 'as'] },
          }) }]);
        }
        const complexRules = /Complex-sentence feedback \(target: /.test(system);
        if (complexRules && /\bwho (he|she|they) (\w+)/i.test(student)) {
          const [, , verb] = student.match(/\bwho (he|she|they) (\w+)/i);
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: false,
            corrected: student.replace(/\bwho (he|she|they) /i, 'who '),
            feedback: bn ? 'ভালো চেষ্টা! relative clause-এ subject দুইবার এসেছে।' : 'Good try! The relative clause has its subject twice.',
            fixes: [{ quote: `who she ${verb}`, fix: `who ${verb}`, why: bn ? "'who' নিজেই subject, তাই 'she' বাদ দিন (বাংলার 'যে …, সে …' থেকে আসে)।" : "'who' is already the subject, so remove 'she'." }],
            practice: { sentence: 'The man ___ lives next door is a pilot.', answers: ['who', 'that'] },
          }) }]);
        }
        if (complexRules && /\bWhen I will\b/i.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: false,
            corrected: student.replace(/\bWhen I will (\w+)/i, 'When I $1'),
            feedback: bn ? 'ভালো চেষ্টা! when-এর পরে will বসে না।' : 'Good try! No will after when.',
            fixes: [{ quote: 'When I will finish', fix: 'When I finish', why: bn ? 'ভবিষ্যতের time clause-এ present simple: "When I finish …, I will …"।' : 'A future time clause takes the present simple: "When I finish …, I will …".' }],
            practice: { sentence: 'I will call you as soon as I ___ (arrive).', answers: ['arrive'] },
          }) }]);
        }
        const punctuationRules = /Punctuation feedback \(target: /.test(system);
        if (punctuationRules && /\bmothers cooking\b/.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: false,
            corrected: student.replace(/\bmothers cooking\b/, 'mother’s cooking'),
            feedback: bn ? 'ভালো চেষ্টা! মালিকানায় apostrophe লাগবে।' : 'Good try! Possession needs an apostrophe.',
            fixes: [{ quote: 'mothers cooking', fix: 'mother’s cooking', why: bn ? "একজন owner (mother) → mother’s; বাংলার 'মায়ের'-এর মতো।" : 'One owner (your mother) → mother’s.' }],
            practice: { sentence: 'My ___ (father) car is blue.', answers: ['father’s', "father's"] },
          }) }]);
        }
        if (punctuationRules && /(^|[.?!]\s+)i am\b/.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: false,
            corrected: student.replace(/(^|[.?!]\s+)i am\b/, '$1I am'),
            feedback: bn ? 'ভালো চেষ্টা! I আর sentence-এর প্রথম word সবসময় capital।' : 'Good try! I and the first word are always capitals.',
            fixes: [{ quote: 'i am interested', fix: 'I am interested', why: bn ? 'বাংলায় capital নেই, কিন্তু English-এ I সবসময় capital।' : 'The pronoun I is always a capital letter.' }],
            practice: { sentence: 'My brother and ___ (i) share a room.', answers: ['I'] },
          }) }]);
        }
        const commonErrorRules = /Common-error feedback \(target: /.test(system);
        if (commonErrorRules && /\binformations\b/.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: false,
            corrected: student.replace(/\binformations\b/, 'information'),
            feedback: bn ? 'ভালো চেষ্টা! information-এ -s বসে না।' : 'Good try! information never takes -s.',
            fixes: [{ quote: 'some informations about', fix: 'some information about', why: bn ? 'UNCOUNTABLE: information uncountable — বাংলার "তথ্যগুলো"-র মতো -s বসে না।' : 'UNCOUNTABLE: information is uncountable, so no -s.' }],
            practice: { sentence: 'How much ___ (luggage) can I bring?', answers: ['luggage'] },
          }) }]);
        }
        if (commonErrorRules && /\bdo (a lot of )?mistakes\b/.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: false,
            corrected: student.replace(/\bdo (a lot of )?mistakes\b/, (m, a) => `make ${a ?? ''}mistakes`),
            feedback: bn ? 'ভালো চেষ্টা! mistake-এর সাথে make বসে।' : 'Good try! mistakes take make.',
            fixes: [{ quote: 'do a lot of mistakes', fix: 'make a lot of mistakes', why: bn ? 'COLLOCATION: বাংলায় "ভুল করা", কিন্তু English-এ make a mistake।' : 'COLLOCATION: make a mistake, not do.' }],
            practice: { sentence: 'I need to ___ a decision soon.', answers: ['make'] },
          }) }]);
        }
        const vocabularyRules = /Vocabulary feedback \(target: /.test(system);
        if (vocabularyRules && /\baccess of\b/.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: true,
            corrected: student.replace(/\baccess of\b/, 'access to'),
            feedback: bn ? 'ভালো চেষ্টা! access-এর পরে to বসে।' : 'Good try! access is followed by to.',
            fixes: [{ quote: 'access of mobile internet', fix: 'access to mobile internet', why: bn ? 'PATTERN: access to — বাংলার "সুযোগ-এর" থেকে of আসে।' : 'PATTERN: the word after access is to.' }],
            practice: { sentence: 'Tourism contributes ___ the local economy.', answers: ['to'] },
          }) }]);
        }
        if (vocabularyRules && /\blots of kids\b/i.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: true,
            corrected: student.replace(/\b[Ll]ots of kids\b/, 'many children'),
            feedback: bn ? 'ভালো চেষ্টা! Task 2-এ formal word লাগে।' : 'Good try! Task 2 needs formal words.',
            fixes: [{ quote: 'lots of kids', fix: 'Many children', why: bn ? 'REGISTER: essay-তে kids আর lots of informal।' : 'REGISTER: kids and lots of are informal in an essay.' }],
            practice: { sentence: 'Applicants must ___ a visa before travelling.', answers: ['obtain'] },
          }) }]);
        }
        const ieltsFactRules = /IELTS facts feedback \(target: /.test(system);
        if (ieltsFactRules && /General Training for my master/.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: true,
            corrected: student.replace(/General Training for my master/, 'IELTS Academic for my master'),
            feedback: bn ? 'ভালো চেষ্টা! University-র জন্য সাধারণত Academic লাগে।' : 'Good try! University study usually needs Academic.',
            fixes: [{ quote: 'General Training for my master’s degree', fix: 'Academic for my master’s degree', why: bn ? 'University study usually needs Academic — official requirement দেখুন।' : 'University study usually needs Academic — check the official requirement.' }],
            practice: { sentence: 'For a degree, universities usually ask for IELTS ___.', answers: ['Academic'] },
          }) }]);
        }
        if (ieltsFactRules && /easier and gives higher scores/.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: true,
            corrected: student.replace(/because it is easier and gives higher scores/, 'because I type faster than I write'),
            feedback: bn ? 'ভালো চেষ্টা! দুই format-এর scoring একই।' : 'Good try! Both formats use the same scoring.',
            fixes: [{ quote: 'it is easier and gives higher scores', fix: 'Neither format is easier', why: bn ? 'Neither format is easier: একই content আর scoring।' : 'Neither format is easier: same content and scoring.' }],
            practice: { sentence: 'In computer Listening you get ___ minutes to check your answers.', answers: ['2', 'two'] },
          }) }]);
        }
        const listeningRules = /IELTS Listening feedback \(target: /.test(system);
        if (listeningRules && /\btwice\b/.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: true,
            corrected: student.replace(/\btwice\b/, 'once'),
            feedback: bn ? 'ভালো চেষ্টা! Test-এ প্রতিটা recording একবারই বাজে।' : 'Good try! In the test each recording is heard once.',
            fixes: [{ quote: 'play each recording twice', fix: 'play each recording once', why: bn ? 'Each recording is heard once — pause ছাড়া practice করুন।' : 'Each recording is heard once, so practise without replays.' }],
            practice: { sentence: 'In IELTS Listening, each recording is heard ___.', answers: ['once'] },
          }) }]);
        }
        if (listeningRules && /Exactly, a survey is too slow/.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: true,
            corrected: student.replace('Exactly, a survey is too slow', 'I’m not so sure, a survey is too slow'),
            feedback: bn ? 'ভালো চেষ্টা! "Exactly" একমত বোঝায়।' : 'Good try! "Exactly" shows agreement.',
            fixes: [{ quote: 'Exactly, a survey is too slow', fix: 'I’m not so sure — a survey is too slow', why: bn ? 'দ্বিমতের জন্য "I’m not so sure" বলুন।' : 'To reject the idea, use "I’m not so sure".' }],
            practice: { sentence: 'To show agreement, a speaker might say "___."', answers: ['Exactly', 'True'] },
          }) }]);
        }
        const readingRules = /IELTS Reading feedback \(target: /.test(system);
        if (readingRules && /10 extra minutes/.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: true,
            corrected: student.replace(' and then use 10 extra minutes to transfer my answers', ', writing my answers as I go'),
            feedback: bn ? 'ভালো চেষ্টা! Reading-এ answer transfer-এর জন্য আলাদা সময় নেই।' : 'Good try! Reading has no extra time to transfer answers.',
            fixes: [{ quote: 'use 10 extra minutes to transfer my answers', fix: 'write my answers within the 60 minutes', why: bn ? 'Reading-এ no extra time to transfer — ৬০ মিনিটের মধ্যেই লিখুন।' : 'There is no extra time to transfer answers in Reading, so write them within the 60 minutes.' }],
            practice: { sentence: 'IELTS Reading gives ___ extra time to transfer answers.', answers: ['no'] },
          }) }]);
        }
        if (readingRules && /Heading: One family in Khulna/.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: true,
            corrected: student.replace('Heading: One family in Khulna', 'Heading: Coastal villages turn to rainwater'),
            feedback: bn ? 'ভালো চেষ্টা! Khulna-র পরিবার শুধু একটা উদাহরণ।' : 'Good try! The Khulna family is only an example.',
            fixes: [{ quote: 'Heading: One family in Khulna', fix: 'Heading: Coastal villages turn to rainwater', why: bn ? '"for example" দেখায় এটা উদাহরণ — heading পুরো paragraph-এর মূল idea ধরবে।' : '"for example" shows it is an example; the heading must cover the whole paragraph.' }],
            practice: { sentence: 'A heading should match the main ___ of the paragraph.', answers: ['idea'] },
          }) }]);
        }
        const writingRules = /IELTS Writing feedback \(target: /.test(system);
        if (writingRules && /40 minutes on Task 1/.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: true,
            corrected: student.replace('40 minutes on Task 1 and 20 minutes on Task 2', 'about 20 minutes on Task 1 and about 40 minutes on Task 2'),
            feedback: bn ? 'ভালো চেষ্টা! সময়টা উল্টো হয়ে গেছে।' : 'Good try! The times are the wrong way round.',
            fixes: [{ quote: '40 minutes on Task 1 and 20 minutes on Task 2', fix: 'about 20 minutes on Task 1 and about 40 minutes on Task 2', why: bn ? 'Task 2 counts for more — এতে প্রায় ৪০ মিনিট দিন।' : 'Task 2 counts for more, so give it about 40 minutes.' }],
            practice: { sentence: 'Spend about ___ minutes on Task 2.', answers: ['40', 'forty'] },
          }) }]);
        }
        if (writingRules && /University fees are too high/.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: false,
            corrected: 'Some people think universities should teach only job-related subjects, while others prefer a wide range. In my opinion, universities should offer a wide range of subjects.',
            feedback: bn ? 'ভালো চেষ্টা! প্রশ্নটা fee নিয়ে নয়, university কী পড়াবে তা নিয়ে।' : 'Good try! The question is about what universities should teach, not fees.',
            fixes: [{ quote: 'University fees are too high for many families', fix: 'Some people think universities should teach only job-related subjects', why: bn ? 'প্রশ্নের বাইরে — দুই view আর আপনার মতামত দিন।' : 'Off-topic: give both views and your opinion.' }],
            practice: { sentence: 'Discuss ___ views and give your own opinion.', answers: ['both'] },
          }) }]);
        }
        const speakingRules = /IELTS Speaking feedback \(target: /.test(system);
        if (speakingRules && /30 minutes on a computer/.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: true,
            corrected: student.replace('30 minutes on a computer', '11–14 minutes, face to face with an examiner'),
            feedback: bn ? 'ভালো চেষ্টা! Speaking examiner-এর সাথে সামনাসামনি হয়।' : 'Good try! Speaking is with an examiner, in person.',
            fixes: [{ quote: '30 minutes on a computer', fix: '11–14 minutes, face to face with an examiner', why: bn ? 'Speaking is face to face with an examiner — computer-delivered IELTS-এও।' : 'Speaking is face to face with an examiner, even in computer-delivered IELTS.' }],
            practice: { sentence: 'IELTS Speaking has ___ parts.', answers: ['3', 'three'] },
          }) }]);
        }
        if (speakingRules && /I like my village/.test(student)) {
          return reply([{ text: JSON.stringify({
            verdict: 'needs-work',
            usesTarget: false,
            corrected: 'Many young people move to cities because most jobs and universities are there. It’s likely that this will change a little as more people work online.',
            feedback: bn ? 'ভালো চেষ্টা! Part 3-এ সাধারণ মানুষ নিয়ে বলুন।' : 'Good try! In Part 3, talk about people in general.',
            fixes: [{ quote: 'I like my village', fix: 'Many young people move to cities because most jobs are there', why: bn ? 'প্রশ্নটা সাধারণ — কারণসহ মতামত আর ভবিষ্যৎ নিয়ে অনুমান দিন।' : 'The question is general: give a reason and a prediction.' }],
            practice: { sentence: 'It’s ___ that more people will work from home.', answers: ['likely', 'possible'] },
          }) }]);
        }
        const bad = /\b(go|am learning)\b/.test(student);
        return reply([{ text: JSON.stringify({
          verdict: bad ? 'needs-work' : 'correct',
          usesTarget: true,
          corrected: student,
          feedback: bad ? (bn ? 'ভালো চেষ্টা! একটা ছোট পরিবর্তন দরকার।' : 'Good try! One small change here.') : bn ? 'দারুণ! একদম ঠিক।' : 'Great work — correct!',
          fixes: [],
          practice: bad ? { sentence: 'My sister ___ (live) in Sylhet.', answers: ['lives'] } : null,
        }) }]);
      }

      const last = b.contents.at(-1);
      const fr = last.parts.find((p) => p.functionResponse);
      if (!fr) return reply([{ functionCall: { name: 'getFoundationProgress', args: {} } }]);
      const lines = system.match(/[A-Za-z–? ]*Final Mastery Challenge: [^\n]*/g);
      return reply([{ text: `Mock Mino: ${lines ? lines.map((x) => x.trim()).join(' | ') : 'no challenge result in the snapshot'}` }]);
    });
  })
  .listen(PORT, () => console.log(`mock gemini on ${PORT}`));
