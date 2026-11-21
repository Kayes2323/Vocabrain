/**
 * Firebase Admin setup: configuration validation and singleton (pure, no network),
 * then a smoke test against the Firebase emulators (Admin write, transaction, ID token verification).
 * Run: pnpm test:admin   (starts the Auth + Firestore emulators itself)
 * Uses a throwaway RSA key made in this script. No real credential is read or needed.
 */
import assert from 'node:assert/strict';
import { generateKeyPairSync } from 'node:crypto';
import { getApps } from 'firebase-admin/app';
import {
  AdminConfigError,
  getAdminApp,
  getAdminAuth,
  getAdminDb,
  isAdminConfigError,
  parseServiceAccount,
  resetAdminForTests,
  resolveAdminConfig,
  type AdminConfigErrorCode,
} from '../lib/server/firebase-admin.ts';

process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||= 'demo-vocabbrain';
const PROJECT = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

let passed = 0;
let skipped = 0;
async function test(name: string, fn: () => void | Promise<void>) {
  try {
    await fn();
    passed++;
    console.log(`PASS ${name}`);
  } catch (error) {
    console.log(`FAIL ${name}\n  ${(error as Error).message}`);
    process.exitCode = 1;
  }
}

function throwsCode(fn: () => unknown, code: AdminConfigErrorCode) {
  try {
    fn();
  } catch (error) {
    assert.ok(isAdminConfigError(error), `expected AdminConfigError, got ${(error as Error)?.name}`);
    assert.equal((error as AdminConfigError).code, code);
    return error as AdminConfigError;
  }
  assert.fail(`expected AdminConfigError(${code}), nothing was thrown`);
}

// ---------- fixtures: a throwaway key, never a real credential ----------
const { privateKey: PEM } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  publicKeyEncoding: { type: 'spki', format: 'pem' },
});
const EMAIL = 'billing-test@demo-test.iam.gserviceaccount.com';
const account = (over: Record<string, unknown> = {}) => ({ type: 'service_account', project_id: 'demo-test', client_email: EMAIL, private_key: PEM, ...over });
const raw = (over?: Record<string, unknown>) => JSON.stringify(account(over));
const b64 = (over?: Record<string, unknown>) => Buffer.from(raw(over)).toString('base64');
const env = (extra: Record<string, string | undefined> = {}) => ({ NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'demo-test', FIREBASE_SERVICE_ACCOUNT: b64(), ...extra });

// ---------- credential parsing ----------
await test('raw JSON is accepted', () => {
  const a = parseServiceAccount(raw());
  assert.deepEqual([a.projectId, a.clientEmail], ['demo-test', EMAIL]);
  assert.equal(a.privateKey, PEM);
});
await test('base64 JSON is accepted', () => assert.equal(parseServiceAccount(b64()).projectId, 'demo-test'));
await test('a private key with literal \\n (common in env tools) is repaired', () => {
  assert.equal(parseServiceAccount(raw({ private_key: PEM.replace(/\n/g, '\\n') })).privateKey, PEM);
});
await test('surrounding whitespace is ignored', () => assert.equal(parseServiceAccount(`\n  ${b64()}  \n`).projectId, 'demo-test'));
for (const v of [undefined, '', '   ']) {
  await test(`missing value ${JSON.stringify(v)} → missing_credentials`, () => void throwsCode(() => parseServiceAccount(v), 'missing_credentials'));
}
for (const [name, value] of [
  ['plain text', 'not a credential'],
  ['broken JSON', '{"project_id": '],
  ['base64 of text', Buffer.from('hello').toString('base64')],
  ['JSON array', '[]'],
  ['JSON null as base64', Buffer.from('null').toString('base64')],
  ['wrong type', raw({ type: 'authorized_user' })],
  ['garbage key', raw({ private_key: 'not a pem' })],
  ['truncated key', raw({ private_key: PEM.slice(0, 120) })],
] as const) {
  await test(`${name} → invalid_credentials`, () => void throwsCode(() => parseServiceAccount(value), 'invalid_credentials'));
}
for (const field of ['project_id', 'client_email', 'private_key']) {
  await test(`missing ${field} → incomplete_credentials`, () => void throwsCode(() => parseServiceAccount(raw({ [field]: undefined })), 'incomplete_credentials'));
  await test(`blank ${field} → incomplete_credentials`, () => void throwsCode(() => parseServiceAccount(raw({ [field]: '  ' })), 'incomplete_credentials'));
}

// ---------- configuration decisions ----------
await test('credentials mode when the key and project match', () => {
  const c = resolveAdminConfig(env());
  assert.equal(c.mode, 'credentials');
  assert.equal(c.projectId, 'demo-test');
});
await test('no project id → missing_project_id', () => void throwsCode(() => resolveAdminConfig(env({ NEXT_PUBLIC_FIREBASE_PROJECT_ID: undefined })), 'missing_project_id'));
await test('key for a different project → project_mismatch', () => void throwsCode(() => resolveAdminConfig(env({ NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'other-project' })), 'project_mismatch'));
await test('no credentials and no emulator → missing_credentials', () => void throwsCode(() => resolveAdminConfig(env({ FIREBASE_SERVICE_ACCOUNT: undefined })), 'missing_credentials'));
await test('emulator mode needs no credentials, only a project id', () => {
  assert.deepEqual(resolveAdminConfig({ NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'demo-x', FIRESTORE_EMULATOR_HOST: '127.0.0.1:8080' }), { mode: 'emulator', projectId: 'demo-x' });
  assert.equal(resolveAdminConfig({ NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'demo-x', FIREBASE_AUTH_EMULATOR_HOST: '127.0.0.1:9099' }).mode, 'emulator');
});
await test('emulator mode without a project id → missing_project_id', () => void throwsCode(() => resolveAdminConfig({ FIRESTORE_EMULATOR_HOST: '127.0.0.1:8080' }), 'missing_project_id'));
await test('emulator hosts win over credentials (never touches a real project by accident)', () => {
  assert.equal(resolveAdminConfig(env({ FIRESTORE_EMULATOR_HOST: '127.0.0.1:8080' })).mode, 'emulator');
});
for (const host of ['FIRESTORE_EMULATOR_HOST', 'FIREBASE_AUTH_EMULATOR_HOST']) {
  await test(`${host} on Vercel is refused → emulator_in_production`, () => {
    throwsCode(() => resolveAdminConfig(env({ [host]: '127.0.0.1:1', VERCEL: '1' })), 'emulator_in_production');
  });
}

// ---------- secrets never appear in errors ----------
await test('error text and JSON never contain the key, the email or the project id', () => {
  const body = PEM.split('\n')[1];
  const errors: AdminConfigError[] = [
    throwsCode(() => parseServiceAccount(raw({ private_key: PEM.slice(0, 120) })), 'invalid_credentials'),
    throwsCode(() => parseServiceAccount(raw({ project_id: '' })), 'incomplete_credentials'),
    throwsCode(() => resolveAdminConfig(env({ NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'other-project' })), 'project_mismatch'),
  ];
  for (const error of errors) {
    const shown = `${error.message} ${error.stack ?? ''} ${JSON.stringify(error)}`;
    for (const secret of [body, EMAIL, 'demo-test', b64()]) assert.ok(!shown.includes(secret), `leaked into: ${error.code}`);
  }
});

// ---------- singleton ----------
await resetAdminForTests();
await test('a bad configuration throws, is not cached, and a later good one works', async () => {
  assert.throws(() => getAdminApp({}), (e) => isAdminConfigError(e));
  assert.equal(getApps().length, 0, 'nothing initialised by the failed attempt');
  const app = getAdminApp(env());
  assert.ok(app);
  assert.equal(getApps().length, 1);
});
await test('getAdminApp / getAdminAuth / getAdminDb always return the same instances', () => {
  assert.equal(getAdminApp(env()), getAdminApp(env()));
  assert.equal(getAdminAuth(env()), getAdminAuth(env()));
  assert.equal(getAdminDb(env()), getAdminDb(env()));
  assert.equal(getApps().length, 1);
});
await test('after the module cache is lost (hot reload) the existing app is reused, not duplicated', () => {
  const before = getAdminApp(env());
  delete (globalThis as { __minoAdmin?: unknown }).__minoAdmin;
  assert.equal(getAdminApp(env()), before);
  assert.equal(getApps().length, 1);
});
await test('credentials mode builds the app without any network call', async () => {
  const realFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = (async () => {
    calls++;
    throw new Error('network is not allowed here');
  }) as typeof fetch;
  try {
    await resetAdminForTests();
    getAdminApp(env());
    getAdminAuth(env());
    getAdminDb(env());
  } finally {
    globalThis.fetch = realFetch;
  }
  assert.equal(calls, 0);
});
await resetAdminForTests();

// ---------- emulator smoke test (skipped unless the emulators are running) ----------
const FIRESTORE = process.env.FIRESTORE_EMULATOR_HOST;
const AUTH = process.env.FIREBASE_AUTH_EMULATOR_HOST;
if (!FIRESTORE || !AUTH) {
  skipped = 5;
  console.log('SKIP emulator tests (run `pnpm test:admin` so the emulators are started)');
} else {
  const db = () => getAdminDb();
  const signUp = async () => {
    const res = await fetch(`http://${AUTH}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake-key`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: `admin-test-${Date.now()}@example.com`, password: 'a-test-password-123', returnSecureToken: true }),
    });
    assert.ok(res.ok, `emulator sign-up failed: ${res.status}`);
    return (await res.json()) as { idToken: string; localId: string; email: string };
  };
  const unsignedToken = (claims: Record<string, unknown>) => {
    const part = (o: unknown) => Buffer.from(JSON.stringify(o)).toString('base64url');
    return `${part({ alg: 'none', typ: 'JWT' })}.${part(claims)}.`;
  };

  await test('emulator: Admin writes where Security Rules deny every client (subscriptions update)', async () => {
    const ref = db().doc(`subscriptions/admin-smoke-${Date.now()}`);
    await ref.set({ userId: 'u', plan: 'premium' });
    await ref.update({ plan: 'free' }); // rules say `update: false` for clients
    assert.equal((await ref.get()).data()?.plan, 'free');
  });

  await test('emulator: concurrent transactions do not lose updates', async () => {
    const ref = db().doc(`billing/admin-txn-${Date.now()}`);
    await ref.set({ n: 0 });
    await Promise.all(
      Array.from({ length: 8 }, () =>
        db().runTransaction(async (tx) => {
          const snap = await tx.get(ref);
          tx.update(ref, { n: (snap.data()?.n ?? 0) + 1 });
        }),
      ),
    );
    assert.equal((await ref.get()).data()?.n, 8);
  });

  await test('emulator: a real ID token verifies and yields the uid and email from the token', async () => {
    const { idToken, localId, email } = await signUp();
    const decoded = await getAdminAuth().verifyIdToken(idToken);
    assert.equal(decoded.uid, localId);
    assert.equal(decoded.email, email);
  });

  await test('emulator: garbage and empty tokens are rejected', async () => {
    for (const bad of ['garbage', '', 'a.b.c']) await assert.rejects(getAdminAuth().verifyIdToken(bad));
  });

  await test('emulator: an expired token is rejected', async () => {
    const now = Math.floor(Date.now() / 1000);
    const token = unsignedToken({
      iss: `https://securetoken.google.com/${PROJECT}`,
      aud: PROJECT,
      sub: 'expired-user',
      iat: now - 7200,
      auth_time: now - 7200,
      exp: now - 3600,
      firebase: { identities: {}, sign_in_provider: 'password' },
    });
    await assert.rejects(getAdminAuth().verifyIdToken(token), (e: { code?: string }) => {
      console.log(`     (rejected with ${e.code})`);
      return true;
    });
  });
}

console.log(`\n${passed} passed${skipped ? `, ${skipped} skipped` : ''}`);
await resetAdminForTests();
