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
