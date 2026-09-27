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
      const lines = system.match(/[A-Za-z– ]*Final Mastery Challenge: [^\n]*/g);
      return reply([{ text: `Mock Mino: ${lines ? lines.map((x) => x.trim()).join(' | ') : 'no challenge result in the snapshot'}` }]);
    });
  })
  .listen(PORT, () => console.log(`mock gemini on ${PORT}`));
