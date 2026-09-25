import type { MinoErrorCode } from '../types';

/** An expected failure with a stable code for the UI. Never carries secrets. */
export class MinoError extends Error {
  constructor(
    public readonly code: MinoErrorCode,
    /** Internal detail for server logs only. */
    public readonly detail?: string,
  ) {
    super(code);
  }
}

export const HTTP_STATUS: Record<MinoErrorCode, number> = {
  unauthenticated: 401,
  not_configured: 503,
  rate_limited: 429,
  timeout: 504,
  provider_busy: 503,
  invalid_request: 400,
  unavailable: 502,
};
