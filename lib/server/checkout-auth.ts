import { CheckoutAuthError, type VerifiedUser } from '@/lib/billing/checkout';
import { getAdminAuth, isAdminConfigError } from './firebase-admin';

/** Maps whatever the Admin SDK throws to a CheckoutAuthError. The original message is dropped on purpose. */
export function mapAuthError(error: unknown): CheckoutAuthError {
  if (isAdminConfigError(error)) return new CheckoutAuthError('config');
  const code = typeof (error as { code?: unknown } | null)?.code === 'string' ? (error as { code: string }).code : '';
  if (code === 'auth/id-token-expired') return new CheckoutAuthError('expired');
  // Server-side or network trouble is not the caller's fault; everything else about the token is.
  if (!code.startsWith('auth/') || code === 'auth/internal-error' || code === 'auth/network-request-failed' || code === 'auth/service-unavailable') {
    return new CheckoutAuthError('unavailable');
  }
  return new CheckoutAuthError('invalid');
}

/**
 * Verifies a Firebase ID token with the Admin SDK, including revocation, and returns only the uid
 * and email that are inside the verified token.
 */
export async function verifyFirebaseIdToken(idToken: string): Promise<VerifiedUser> {
  try {
    const decoded = await getAdminAuth().verifyIdToken(idToken, true);
    return { uid: decoded.uid, email: typeof decoded.email === 'string' && decoded.email ? decoded.email : undefined };
  } catch (error) {
    throw mapAuthError(error);
  }
}
