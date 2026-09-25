/**
 * Maps Firebase Auth error codes to i18n keys under `auth.errors`. Raw
 * Firebase messages are never shown to students.
 */
export function authErrorKey(error: unknown): string {
  const code = (error as { code?: string })?.code ?? '';
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/invalid-login-credentials':
    case 'auth/user-not-found':
      return 'auth.errors.credentials';
    case 'auth/invalid-email':
      return 'auth.errors.invalidEmail';
    case 'auth/email-already-in-use':
      return 'auth.errors.exists';
    case 'auth/weak-password':
      return 'auth.errors.weak';
    case 'auth/missing-password':
      return 'auth.errors.missingPassword';
    case 'auth/too-many-requests':
      return 'auth.errors.tooMany';
    case 'auth/network-request-failed':
      return 'auth.errors.network';
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'auth.errors.popup';
    case 'auth/popup-blocked':
      return 'auth.errors.popupBlocked';
    case 'auth/operation-not-allowed':
      return 'auth.errors.notEnabled';
    case 'auth/user-disabled':
      return 'auth.errors.disabled';
    default:
      return 'auth.errors.generic';
  }
}
