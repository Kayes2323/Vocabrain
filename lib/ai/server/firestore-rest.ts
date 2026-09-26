import { firebaseProjectId, usingFirebaseEmulator } from './config';

/**
 * Minimal Firestore REST reader that acts AS the student: every request
 * carries their Firebase ID token, so Firestore Security Rules apply exactly
 * as in the app. Mino can never read another student's data or bypass rules.
 */
type FirestoreValue = {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
  booleanValue?: boolean;
  nullValue?: null;
  timestampValue?: string;
  arrayValue?: { values?: FirestoreValue[] };
  mapValue?: { fields?: Record<string, FirestoreValue> };
};

export function decodeValue(v: FirestoreValue): unknown {
  if ('stringValue' in v) return v.stringValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('timestampValue' in v) return v.timestampValue;
  if ('arrayValue' in v) return (v.arrayValue?.values ?? []).map(decodeValue);
  if ('mapValue' in v) return decodeFields(v.mapValue?.fields ?? {});
  return null;
}

export function decodeFields(fields: Record<string, FirestoreValue>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, decodeValue(v)]));
}

function base() {
  const host = usingFirebaseEmulator() ? 'http://127.0.0.1:8080' : 'https://firestore.googleapis.com';
  return `${host}/v1/projects/${firebaseProjectId()}/databases/(default)/documents`;
}

async function get(path: string, idToken: string) {
  const res = await fetch(`${base()}/${path}`, {
    headers: { Authorization: `Bearer ${idToken}` },
    signal: AbortSignal.timeout(6000),
    cache: 'no-store',
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`firestore ${res.status}`);
  return res.json();
}

/** One document under the student's own users/{uid} tree. */
export async function readOwnDoc(uid: string, idToken: string, subPath = ''): Promise<Record<string, unknown> | null> {
  const data = await get(`users/${encodeURIComponent(uid)}${subPath ? `/${subPath}` : ''}`, idToken);
  return data?.fields ? decodeFields(data.fields) : data ? {} : null;
}

/** A collection under the student's own users/{uid} tree. */
export async function listOwnCollection(uid: string, idToken: string, collection: string, pageSize = 300) {
  const data = await get(`users/${encodeURIComponent(uid)}/${collection}?pageSize=${pageSize}`, idToken);
  return ((data?.documents ?? []) as { name: string; fields?: Record<string, FirestoreValue> }[]).map((d) => ({
    id: d.name.split('/').pop()!,
    ...decodeFields(d.fields ?? {}),
  }));
}

export function encodeValue(v: unknown): FirestoreValue {
  if (v === null || v === undefined) return { nullValue: null };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(encodeValue) } };
  if (typeof v === 'object') {
    return { mapValue: { fields: Object.fromEntries(Object.entries(v as object).filter(([, x]) => x !== undefined).map(([k, x]) => [k, encodeValue(x)])) } };
  }
  if (typeof v === 'number') return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (typeof v === 'boolean') return { booleanValue: v };
  return { stringValue: String(v) };
}

/**
 * Replaces one document under the student's own users/{uid} tree, as the
 * student (their token), so the same Security Rules as the app apply.
 */
export async function writeOwnDoc(
  uid: string,
  idToken: string,
  subPath: string,
  data: Record<string, unknown>,
  /** Only update these top-level fields; others stay as they are. */
  onlyFields?: string[],
): Promise<void> {
  const fields = (encodeValue(data) as { mapValue: { fields: Record<string, FirestoreValue> } }).mapValue.fields;
  const mask = onlyFields ? `?${onlyFields.map((f) => `updateMask.fieldPaths=${encodeURIComponent(f)}`).join('&')}` : '';
  const res = await fetch(`${base()}/users/${encodeURIComponent(uid)}/${subPath}${mask}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${idToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields }),
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) throw new Error(`firestore write ${res.status}`);
}
