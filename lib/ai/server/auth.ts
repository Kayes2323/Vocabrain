import { createRemoteJWKSet, decodeJwt, jwtVerify } from 'jose';
import { firebaseProjectId, usingFirebaseEmulator } from './config';
import { MinoError } from './errors';

/**
 * Verifies a Firebase ID token and returns the student it belongs to. The uid
 * comes only from the verified token, never from the request body.
 * Uses Google's public signing keys, so no service-account secret is needed.
 */
const GOOGLE_KEYS = createRemoteJWKSet(
  new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'),
);

export interface AuthenticatedStudent {
  uid: string;
  email?: string;
  /** The raw token, used to read the student's own data under Firestore rules. */
  idToken: string;
}

export async function authenticate(authorization: string | null): Promise<AuthenticatedStudent> {
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  const projectId = firebaseProjectId();
  if (!token || !projectId) throw new MinoError('unauthenticated', token ? 'missing project id' : 'missing token');

  try {
    if (usingFirebaseEmulator()) {
      // Emulator tokens are unsigned; only accepted in local development.
      const payload = decodeJwt(token);
      if (!payload.sub) throw new Error('no sub');
      return { uid: payload.sub, email: payload.email as string | undefined, idToken: token };
    }
    const { payload } = await jwtVerify(token, GOOGLE_KEYS, {
      issuer: `https://securetoken.google.com/${projectId}`,
      audience: projectId,
    });
    if (!payload.sub) throw new Error('no sub');
    return { uid: payload.sub, email: payload.email as string | undefined, idToken: token };
  } catch (error) {
    throw new MinoError('unauthenticated', (error as Error).message);
  }
}
