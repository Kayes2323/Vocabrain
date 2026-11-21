import { createPrivateKey } from 'node:crypto';
import { cert, deleteApp, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

/**
 * Server-only Firebase Admin SDK setup (payments and entitlements).
 *
 * The Admin SDK bypasses Firestore Security Rules, so it is only ever used on
 * the server, behind code that has verified who is calling. Credentials come
 * from ONE environment variable, FIREBASE_SERVICE_ACCOUNT: the service-account
 * JSON, either raw or base64-encoded (base64 is preferred on Vercel because the
 * private key's newlines survive). Credentials are never committed, logged or
 * returned to a client: errors carry a fixed code and a fixed message only.
 *
 * Local development and tests use the Firebase emulators instead, which need
 * no credentials. The emulator is refused on Vercel so it can never be used by
 * mistake in a deployment.
 */
if (typeof window !== 'undefined') throw new Error('lib/server/firebase-admin must only be imported on the server');

type Env = Record<string, string | undefined>;

export type AdminConfigErrorCode =
  | 'missing_credentials'
  | 'invalid_credentials'
  | 'incomplete_credentials'
  | 'missing_project_id'
  | 'project_mismatch'
  | 'emulator_in_production';

const MESSAGES: Record<AdminConfigErrorCode, string> = {
  missing_credentials: 'FIREBASE_SERVICE_ACCOUNT is not set',
  invalid_credentials: 'FIREBASE_SERVICE_ACCOUNT is not valid service-account JSON (raw or base64)',
  incomplete_credentials: 'FIREBASE_SERVICE_ACCOUNT is missing project_id, client_email or private_key',
  missing_project_id: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set',
  project_mismatch: 'FIREBASE_SERVICE_ACCOUNT belongs to a different project than NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  emulator_in_production: 'Firebase emulator hosts are set on Vercel; refusing to use them',
};

/** Thrown for any Admin setup problem. The message is fixed text: it never contains a credential value. */
export class AdminConfigError extends Error {
  readonly code: AdminConfigErrorCode;
  constructor(code: AdminConfigErrorCode) {
    super(MESSAGES[code]);
    this.name = 'AdminConfigError';
    this.code = code;
  }
}

export const isAdminConfigError = (error: unknown): error is AdminConfigError => error instanceof AdminConfigError;

export interface ServiceAccountFields {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

const nonEmptyString = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0;

/**
 * Reads the FIREBASE_SERVICE_ACCOUNT value: raw JSON or base64 of that JSON.
 * Throws AdminConfigError; the error never includes the input.
 */
export function parseServiceAccount(raw: string | undefined): ServiceAccountFields {
  const value = raw?.trim();
  if (!value) throw new AdminConfigError('missing_credentials');

  let text = value;
  if (!value.startsWith('{')) {
    // Not JSON, so it must be base64 of JSON (Buffer is lenient, so check what came out).
    text = Buffer.from(value, 'base64').toString('utf8').trim();
    if (!text.startsWith('{')) throw new AdminConfigError('invalid_credentials');
  }

  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    throw new AdminConfigError('invalid_credentials');
  }
  if (!json || typeof json !== 'object' || Array.isArray(json)) throw new AdminConfigError('invalid_credentials');

  const { type, project_id, client_email, private_key } = json as Record<string, unknown>;
  if (type !== undefined && type !== 'service_account') throw new AdminConfigError('invalid_credentials');
  if (!nonEmptyString(project_id) || !nonEmptyString(client_email) || !nonEmptyString(private_key)) {
    throw new AdminConfigError('incomplete_credentials');
  }

  // Env tools often store the key with literal "\n" instead of real newlines.
  const privateKey = private_key.replace(/\\n/g, '\n');
  try {
    createPrivateKey(privateKey); // Catches a truncated or mangled key now, not at the first request.
  } catch {
    throw new AdminConfigError('invalid_credentials');
  }
  return { projectId: project_id.trim(), clientEmail: client_email.trim(), privateKey };
}

export type AdminConfig =
  | { mode: 'emulator'; projectId: string }
  | ({ mode: 'credentials' } & ServiceAccountFields);

/** Decides how to start the Admin SDK from the environment. Pure: no SDK, no network. */
export function resolveAdminConfig(env: Env = process.env): AdminConfig {
  const emulator = Boolean(env.FIRESTORE_EMULATOR_HOST?.trim() || env.FIREBASE_AUTH_EMULATOR_HOST?.trim());
  if (emulator && env.VERCEL) throw new AdminConfigError('emulator_in_production');

  const projectId = env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim();

  if (emulator) {
    if (!projectId) throw new AdminConfigError('missing_project_id');
    return { mode: 'emulator', projectId };
  }

  const account = parseServiceAccount(env.FIREBASE_SERVICE_ACCOUNT);
  if (!projectId) throw new AdminConfigError('missing_project_id');
  // A key for another project (for example a test key in production) must never be used silently.
  if (account.projectId !== projectId) throw new AdminConfigError('project_mismatch');
  return { mode: 'credentials', ...account };
}

const APP_NAME = 'mino-admin';

interface AdminState {
  app?: App;
  auth?: Auth;
  db?: Firestore;
}

// Kept on globalThis so hot reload and warm serverless instances reuse one SDK instance.
const holder = globalThis as typeof globalThis & { __minoAdmin?: AdminState };
const state = (): AdminState => (holder.__minoAdmin ??= {});

/**
 * The one Admin app for this process. Created on first use, then reused.
 * A bad configuration throws AdminConfigError every time and is never cached,
 * so fixing the environment takes effect without a restart in development.
 */
export function getAdminApp(env: Env = process.env): App {
  const s = state();
  if (s.app) return s.app;

  const existing = getApps().find((a) => a.name === APP_NAME);
  if (existing) return (s.app = existing);

  const config = resolveAdminConfig(env);
  try {
    s.app = initializeApp(
      config.mode === 'emulator'
        ? { projectId: config.projectId }
        : {
            projectId: config.projectId,
            credential: cert({ projectId: config.projectId, clientEmail: config.clientEmail, privateKey: config.privateKey }),
          },
      APP_NAME,
    );
  } catch {
    // The SDK's own message may echo credential details, so it is not passed on.
    throw new AdminConfigError('invalid_credentials');
  }
  return s.app;
}

export function getAdminAuth(env: Env = process.env): Auth {
  const s = state();
  return (s.auth ??= getAuth(getAdminApp(env)));
}

export function getAdminDb(env: Env = process.env): Firestore {
  const s = state();
  return (s.db ??= getFirestore(getAdminApp(env)));
}

/** Tests only: closes the Admin app so the next call builds a fresh one. */
export async function resetAdminForTests(): Promise<void> {
  const app = getApps().find((a) => a.name === APP_NAME);
  holder.__minoAdmin = {};
  if (app) await deleteApp(app);
}
