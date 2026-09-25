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
let geminiMode: 'tool' | 'busy' = 'tool';

globalThis.fetch = (async (input: any, init?: any) => {
  const url = String(input);
  if (url.startsWith('https://generativelanguage.googleapis.com')) {
    if (init?.headers?.['x-goog-api-key'] !== 'test-key-not-real') throw new Error('key header missing');
    if (url.includes('?key=')) throw new Error('key must not be in URL');
    const body = JSON.parse(init.body);
    geminiBodies.push(body);
    if (geminiMode === 'busy') return new Response('{}', { status: 429 });
    const last = body.contents.at(-1);
    const answered = last.parts.some((p: any) => p.functionResponse);
    const parts = answered
      ? [{ text: `substantial মানে অনেক বা উল্লেখযোগ্য। TOOL=${JSON.stringify(last.parts[0].functionResponse.response.result)}` }]
      : [{ functionCall: { name: 'getVocabulary', args: { word: 'substantial' } } }];
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
check('system prompt Bangla + tools sent', geminiBodies[0].systemInstruction.parts[0].text.includes('Bangla') && geminiBodies[0].tools[0].functionDeclarations.length >= 3);

// Rules still protect other students even with a valid token.
const cross = await realFetch(`http://127.0.0.1:8080/v1/projects/${PROJECT}/databases/(default)/documents/users/${b.uid}/vocabulary/secretword`, { headers: { Authorization: `Bearer ${a.token}` } });
check('cross-user Firestore read denied', cross.status === 403, cross.status);

geminiMode = 'busy';
res = await call(msg, a.token);
check('provider 429 → provider_busy 503', res.status === 503 && (await res.json()).error === 'provider_busy');

delete process.env.GEMINI_API_KEY;
res = await call(msg, a.token);
check('no key → not_configured', (await res.json()).error === 'not_configured');

process.exit(failed ? 1 : 0);
