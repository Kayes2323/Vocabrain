/**
 * Mino API check against the Firebase emulators with a mocked Gemini.
 * Run: pnpm emulators:exec "npx tsx scripts/test-mino-api.mts" (see package.json).
 */
process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR = 'true';
process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||= 'demo-vocabbrain';
process.env.GEMINI_API_KEY = 'test-key-not-real';

const PROJECT = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const realFetch = globalThis.fetch;
const geminiBodies: any[] = [];
let geminiMode: 'tool' | 'busy' | 'retired' | 'weak' = 'tool';
let toolName = 'getVocabulary';
let toolArgs: Record<string, unknown> | null = null;

globalThis.fetch = (async (input: any, init?: any) => {
  const url = String(input);
  if (url.startsWith('https://generativelanguage.googleapis.com')) {
    if (init?.headers?.['x-goog-api-key'] !== 'test-key-not-real') throw new Error('key header missing');
    if (url.includes('?key=')) throw new Error('key must not be in URL');
    const body = JSON.parse(init.body);
    geminiBodies.push(body);
    if (geminiMode === 'busy') return new Response('{}', { status: 429 });
    if (geminiMode === 'retired' && url.includes('/gemini-3.5-flash-lite:')) return new Response('{}', { status: 404 });
    const last = body.contents.at(-1);
    const answered = last.parts.some((p: any) => p.functionResponse);
    const parts = answered
      ? [{ text: `substantial মানে অনেক বা উল্লেখযোগ্য। TOOL=${JSON.stringify(last.parts[0].functionResponse.response.result)}` }]
      : [{ functionCall: { name: toolName, args: toolArgs ?? (toolName === 'getVocabulary' ? { word: 'substantial' } : {}) } }];
    return Response.json({
      candidates: [{ content: { role: 'model', parts }, finishReason: 'STOP' }],
      usageMetadata: { promptTokenCount: 100, candidatesTokenCount: 20, totalTokenCount: 120 },
    });
  }
  return realFetch(input, init);
}) as typeof fetch;

const { POST } = await import('../app/api/mino/route');

async function signUp(email: string) {
  const res = await realFetch(`http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: 'secret123', returnSecureToken: true }),
  });
  const j = await res.json();
  return { uid: j.localId as string, token: j.idToken as string };
}

async function seedWord(uid: string, word: string) {
  const res = await realFetch(`http://127.0.0.1:8080/v1/projects/${PROJECT}/databases/(default)/documents/users/${uid}/vocabulary/${word}`, {
    method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer owner' },
    body: JSON.stringify({ fields: { word: { stringValue: word }, meaning: { stringValue: `meaning of ${word}` }, status: { stringValue: 'learning' } } }),
  });
  if (!res.ok) throw new Error(`seed failed ${res.status}`);
}

const call = (body: unknown, token?: string) =>
  POST(new Request('http://localhost/api/mino', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(body),
  }) as any);

let failed = 0;
const check = (name: string, ok: boolean, extra?: unknown) => {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`, ok ? '' : extra ?? '');
  if (!ok) failed++;
};

const a = await signUp(`a${Date.now()}@test.com`);
const b = await signUp(`b${Date.now()}@test.com`);
await seedWord(a.uid, 'substantial');
// Profile + one submitted Reading test for A: the snapshot must come from here, not from the browser.
const put = (path: string, fields: unknown) =>
  realFetch(`http://127.0.0.1:8080/v1/projects/${PROJECT}/databases/(default)/documents/${path}`, {
    method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer owner' }, body: JSON.stringify({ fields }),
  });
const num = (n: number) => ({ doubleValue: n });
const str = (s: string) => ({ stringValue: s });
await put(`users/${a.uid}`, {
  uid: str(a.uid), name: str('Rafi'), preferredLanguage: str('bn'),
  app: { mapValue: { fields: {
    goal: str('ielts'), language: str('bn'),
    ielts: { mapValue: { fields: { targetBand: num(7), currentBands: { mapValue: { fields: { reading: num(6.5), listening: num(6) } } } } } },
  } } },
});
await put(`users/${a.uid}/testSessions/s1`, {
  id: str('s1'), testId: str('vb-practice-1'), skill: str('reading'), status: str('submitted'), submittedAt: str('2026-09-20T10:00:00Z'),
  result: { mapValue: { fields: {
    correct: { integerValue: '10' }, total: { integerValue: '24' },
    byType: { arrayValue: { values: [
      { mapValue: { fields: { type: str('matching-headings'), correct: { integerValue: '1' }, total: { integerValue: '4' } } } },
      { mapValue: { fields: { type: str('true-false-not-given'), correct: { integerValue: '3' }, total: { integerValue: '4' } } } },
    ] } },
  } } },
});
await seedWord(b.uid, 'secretword');

const msg = { message: 'substantial মানে কী?', language: 'bn', history: [] };

let res = await call(msg);
check('no token → 401 unauthenticated', res.status === 401 && (await res.json()).error === 'unauthenticated');

res = await call(msg, 'garbage');
check('bad token → 401', res.status === 401);

res = await call({ ...msg, message: '' }, a.token);
check('empty message → 400', res.status === 400);

res = await call({ ...msg, uid: b.uid }, a.token);
const body = await res.json();
check('ok response', res.status === 200 && body.ok === true, body);
check('tool read own word', body.response?.includes('meaning of substantial'), body.response);
check('body uid ignored (no other student data)', !JSON.stringify(body).includes('secretword'));
check('metadata (usage summed over tool rounds)', body.metadata?.toolCalls?.[0]?.name === 'getVocabulary' && body.metadata.usage?.totalTokens === 240 && body.metadata.model, body.metadata);
const system: string = geminiBodies[0].systemInstruction.parts[0].text;
if (process.env.PRINT_PROMPT) console.log(system);
check('system prompt Bangla + tools sent', system.includes('Bangla') && geminiBodies[0].tools[0].functionDeclarations.length >= 5);
check('snapshot from database: target, bands, missing skills', system.includes('IELTS target: 7.0') && system.includes('reading 6.5') && system.includes('speaking no data'), system.slice(system.indexOf('STUDENT SNAPSHOT'), system.indexOf('STUDENT SNAPSHOT') + 600));
check('snapshot: test result and weakest question type', system.includes('Practice tests completed: 1') && system.includes('No practice-test data for: listening, writing, speaking'));
check('snapshot: vocabulary and today', system.includes('Vocabulary (Brain): 1 saved') && /TODAY: \d{4}-\d{2}-\d{2}/.test(system));
check('snapshot never includes another student', !system.includes('secretword'));

// Rules still protect other students even with a valid token.
const cross = await realFetch(`http://127.0.0.1:8080/v1/projects/${PROJECT}/databases/(default)/documents/users/${b.uid}/vocabulary/secretword`, { headers: { Authorization: `Bearer ${a.token}` } });
check('cross-user Firestore read denied', cross.status === 403, cross.status);

// A real submitted test (scored by the engine) for student B: getWeakAreas must analyse it.
const ielts = await import('../lib/ielts/index.ts');
const content = await import('../lib/ielts/content/index.ts');
const I = (ielts as any).default ?? ielts;
const C = (content as any).default ?? content;
const t1 = C.getTest('vb-practice-1');
let sess = I.createSession(t1, 'reading');
for (const [k, v] of Object.entries({ 'r1-q1': 'iii', 'r1-q2': 'vi', 'r1-q3': 'v', 'r1-q4': 'i', 'r1-q8': 'TRUE', 'r1-q10': 'rainwatter' })) sess = I.setAnswer(sess, k, v);
sess = I.submit(sess, t1);
const enc = (v: unknown): unknown =>
  v === null ? { nullValue: null }
  : Array.isArray(v) ? { arrayValue: { values: v.map(enc) } }
  : typeof v === 'object' ? { mapValue: { fields: Object.fromEntries(Object.entries(v as object).map(([k, x]) => [k, enc(x)])) } }
  : typeof v === 'number' ? (Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v })
  : typeof v === 'boolean' ? { booleanValue: v } : { stringValue: String(v) };
await put(`users/${b.uid}/testSessions/${sess.id}`, (enc(JSON.parse(JSON.stringify(sess))) as any).mapValue.fields);
geminiMode = 'tool';
toolName = 'getWeakAreas';
res = await call(msg, b.token);
const weak = await res.json();
check('getWeakAreas analyses real answers with evidence', res.status === 200 && weak.response.includes('Matching Headings') && weak.response.includes('rainwatter') && weak.response.includes('not-given-confusion'), weak.response);
toolName = 'getTestHistory';
res = await call(msg, b.token);
const hist = await res.json();
check('getTestHistory lists the attempt', hist.response.includes('Practice Test 1') && hist.response.includes('/24'), hist.response?.slice(0, 200));
toolName = 'suggestActions';
toolArgs = { actions: ['review', 'hack-the-planet', 'study-plan'] };
res = await call(msg, b.token);
const act = await res.json();
check('suggestActions → whitelisted buttons only', JSON.stringify(act.metadata?.actions) === '["review","study-plan"]', act.metadata);
check('everyday chat uses the fast model', act.metadata?.tier === 'fast');
toolName = 'getStudyPlan';
toolArgs = { days: 14 };
res = await call({ ...msg, message: 'আমার জন্য একটা 14 দিনের routine বানাও' }, a.token);
const plan = await res.json();
check('plan request uses the smart model', plan.metadata?.tier === 'smart' && plan.metadata?.model === 'gemini-3.5-flash', plan.metadata);
check('getStudyPlan returns a data-based plan', plan.response.includes('"horizonDays":14') && plan.response.includes('Vocabulary Review') && plan.response.includes('/ielts/plan'), plan.response?.slice(0, 300));
toolName = 'rememberAboutStudent';
toolArgs = { category: 'concern', note: 'Freezes in Speaking Part 2 after 30 seconds' };
res = await call(msg, a.token);
const mem = await (await realFetch(`http://127.0.0.1:8080/v1/projects/${PROJECT}/databases/(default)/documents/users/${a.uid}/mino/memory`, { headers: { Authorization: 'Bearer owner' } })).json();
check('rememberAboutStudent writes the note as the student', res.status === 200 && JSON.stringify(mem).includes('Freezes in Speaking Part 2'), JSON.stringify(mem).slice(0, 200));
toolArgs = { category: 'context', note: 'My bkash password is 1234' };
res = await call(msg, a.token);
check('sensitive notes are refused', (await res.json()).response.includes('Sensitive information is never stored'));
toolArgs = null;
toolName = 'getVocabulary';
geminiBodies.length = 0;
await call(msg, a.token);
check('memory notes appear in the next snapshot', geminiBodies[0].systemInstruction.parts[0].text.includes('[concern] Freezes in Speaking Part 2'));

geminiMode = 'retired';
res = await call(msg, a.token);
const fb = await res.json();
check('retired model → falls back to next model', res.status === 200 && fb.metadata?.model === 'gemini-3.1-flash-lite', fb.metadata ?? fb);

geminiMode = 'busy';
res = await call(msg, a.token);
check('provider 429 → provider_busy 503', res.status === 503 && (await res.json()).error === 'provider_busy');

delete process.env.GEMINI_API_KEY;
res = await call(msg, a.token);
check('no key → not_configured', (await res.json()).error === 'not_configured');

process.exit(failed ? 1 : 0);
