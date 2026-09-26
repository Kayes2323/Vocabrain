// A local stand-in for the Gemini API, used only by the E2E tests.
// The app talks to it through GEMINI_API_BASE_URL; no real key is involved.
//
// - Foundation sentence checks (JSON mode): a tense slip such as "have went …
//   yesterday" gets the tense-specific feedback ONLY when the server's prompt
//   carried the tense rules, so the test proves the prompt, not just the mock.
// - Mino chat: calls getFoundationProgress first, then answers and quotes the
//   Tenses challenge line from the student snapshot in the system prompt.
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
      const line = system.match(/Tenses Final Mastery Challenge: [^\n]*/)?.[0];
      return reply([{ text: `Mock Mino: ${line ?? 'no Tenses challenge in the snapshot'}` }]);
    });
  })
  .listen(PORT, () => console.log(`mock gemini on ${PORT}`));
