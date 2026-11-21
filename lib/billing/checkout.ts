import { createHash } from 'node:crypto';
import { BILLING_INTERVALS, loadPriceConfig, resolveCheckoutPrice, type BillingInterval } from './plans';
import { evaluateCheckoutGate } from './checkout-gate';

/**
 * Secure checkout, as a plain function with its dependencies injected, so every
 * rule below is tested without Next.js, Firebase or the Stripe network.
 *
 * What it guarantees:
 *  - Payments are off unless the server switches allow them (checked first).
 *  - The caller is identified ONLY by a verified Firebase ID token. The body may contain
 *    exactly { plan }. A userId, email or Price ID from the browser is rejected, never used.
 *  - The Price ID comes from the server allowlist (billing domain), never from the request.
 *  - The Stripe Customer is tied to the Firebase UID (billing/{uid} + metadata), never found by email.
 *  - A student who already has a live subscription cannot start another.
 *  - Requests are rate-limited per student by a transactional cooldown.
 *  - Nothing here grants Premium. Premium comes only from the Stripe webhook (Task 3.4).
 *  - Errors are fixed messages with a code. No Stripe message, token, email or key is returned or logged.
 */

export const CHECKOUT_COOLDOWN_MS = 10_000;
const MAX_BODY_CHARS = 1024;

/** A subscription in one of these statuses blocks a second checkout. */
export const BLOCKING_SUBSCRIPTION_STATUSES = ['active', 'trialing', 'past_due'] as const;

export type CheckoutErrorCode =
  | 'checkout_disabled'
  | 'live_payments_disabled'
  | 'billing_unavailable'
  | 'unauthenticated'
  | 'token_expired'
  | 'invalid_request'
  | 'invalid_plan'
  | 'too_many_requests'
  | 'already_subscribed'
  | 'payment_provider_unavailable'
  | 'payment_provider_error'
  | 'internal_error';

const ERRORS: Record<CheckoutErrorCode, { status: number; message: string }> = {
  checkout_disabled: { status: 503, message: 'Payments are not available yet.' },
  live_payments_disabled: { status: 503, message: 'Payments are not available yet.' },
  billing_unavailable: { status: 503, message: 'Payments are not available right now.' },
  unauthenticated: { status: 401, message: 'Please sign in to continue.' },
  token_expired: { status: 401, message: 'Your session has expired. Please sign in again.' },
  invalid_request: { status: 400, message: 'The request is not valid.' },
  invalid_plan: { status: 400, message: 'Please choose a valid plan.' },
  too_many_requests: { status: 429, message: 'Please wait a few seconds and try again.' },
  already_subscribed: { status: 409, message: 'You already have an active Premium subscription.' },
  payment_provider_unavailable: { status: 503, message: 'The payment service is busy. Please try again in a moment.' },
  payment_provider_error: { status: 502, message: 'We could not start checkout. Please try again later.' },
  internal_error: { status: 500, message: 'Something went wrong. Please try again later.' },
};

export interface VerifiedUser {
  uid: string;
  /** From the verified token only; used to prefill Stripe, never to identify anyone. */
  email?: string;
}

/** Thrown by the token verifier. `config` and `unavailable` are server-side problems, not the caller's fault. */
export class CheckoutAuthError extends Error {
  constructor(readonly kind: 'expired' | 'invalid' | 'unavailable' | 'config') {
    super(`checkout auth: ${kind}`);
    this.name = 'CheckoutAuthError';
  }
}

export type CustomerLookup = { state: 'active'; firebaseUid: string | null } | { state: 'gone' };

export interface BillingStore {
  /**
   * In one transaction: refuse if this student started a checkout within `cooldownMs`, otherwise
   * record the attempt. Returns the Stripe customer id already mapped to the student, if any.
   */
  claimCheckout(uid: string, nowMs: number, cooldownMs: number): Promise<{ ok: true; customerId: string | null } | { ok: false; retryAfterMs: number }>;
  /**
   * In one transaction: map the student to `customerId` unless a concurrent request already did
   * (compared with `expectedCurrent`). Returns the customer id that is now mapped.
   */
  saveCustomer(uid: string, customerId: string, expectedCurrent: string | null): Promise<string>;
}

export interface StripeCheckoutClient {
  retrieveCustomer(customerId: string): Promise<CustomerLookup>;
  createCustomer(input: { uid: string; email?: string }, idempotencyKey: string): Promise<string>;
  listSubscriptionStatuses(customerId: string): Promise<string[]>;
  createCheckoutSession(
    input: { customerId: string; uid: string; interval: BillingInterval; priceId: string; successUrl: string; cancelUrl: string },
    idempotencyKey: string,
  ): Promise<{ url: string | null }>;
}

export type LogFields = Record<string, string | number | boolean | undefined>;

export interface CheckoutDeps {
  env: Record<string, string | undefined>;
  /** Wall clock in milliseconds. */
  now: () => number;
  verifyIdToken: (idToken: string) => Promise<VerifiedUser>;
  store: BillingStore;
  stripe: StripeCheckoutClient;
  /** Structured, secret-free logging. Only codes and counts: never tokens, emails, ids or payloads. */
  log: (event: string, fields?: LogFields) => void;
}

export interface CheckoutInput {
  authorization: string | null;
  /** Read lazily so a disabled or unauthenticated request never reads the body. */
  readBody: () => Promise<string>;
}

export type CheckoutResult =
  | { status: 200; body: { url: string }; headers: Record<string, string> }
  | { status: number; body: { error: string; code: CheckoutErrorCode }; headers: Record<string, string> };

class CheckoutFailure extends Error {
  constructor(
    readonly code: CheckoutErrorCode,
    readonly headers: Record<string, string> = {},
  ) {
    super(code);
  }
}

const fail = (code: CheckoutErrorCode, headers?: Record<string, string>) => new CheckoutFailure(code, headers);

/** Maps a thrown Stripe SDK error to a safe code. Duck-typed on `type` so it needs no Stripe import. */
function classifyStripeError(error: unknown): { code: CheckoutErrorCode; fields: LogFields } | null {
  if (typeof error !== 'object' || error === null) return null;
  const e = error as { type?: unknown; code?: unknown; requestId?: unknown; statusCode?: unknown };
  if (typeof e.type !== 'string' || !e.type.startsWith('Stripe')) return null;
  const fields: LogFields = {
    stripeType: e.type,
    stripeCode: typeof e.code === 'string' ? e.code : undefined,
    requestId: typeof e.requestId === 'string' ? e.requestId : undefined,
    httpStatus: typeof e.statusCode === 'number' ? e.statusCode : undefined,
  };
  switch (e.type) {
    case 'StripeConnectionError':
    case 'StripeRateLimitError':
      return { code: 'payment_provider_unavailable', fields };
    case 'StripeAuthenticationError':
    case 'StripePermissionError':
      return { code: 'billing_unavailable', fields };
    default:
      return { code: 'payment_provider_error', fields };
  }
}

/** The validated public origin of the app, from the server environment (never from the request). */
export function appOrigin(env: Record<string, string | undefined>): string | null {
  const raw = env.NEXT_PUBLIC_APP_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    const localhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
    if (url.protocol === 'https:' || (url.protocol === 'http:' && localhost && !env.VERCEL)) return url.origin;
  } catch {
    // fall through
  }
  return null;
}

const shortHash = (value: string) => createHash('sha256').update(value).digest('hex').slice(0, 12);

/** Exactly { plan: <something> }; returns the plan value, or null for anything else. */
function parseBody(text: string): { plan: unknown } | null {
  if (text.length === 0 || text.length > MAX_BODY_CHARS) return null;
  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    return null;
  }
  if (typeof json !== 'object' || json === null || Array.isArray(json)) return null;
  const keys = Object.keys(json);
  if (keys.length !== 1 || keys[0] !== 'plan') return null; // userId, email, priceId, anything extra: rejected
  return { plan: (json as { plan: unknown }).plan };
}

export async function handleCheckout(input: CheckoutInput, deps: CheckoutDeps): Promise<CheckoutResult> {
  try {
    return await run(input, deps);
  } catch (error) {
    let code: CheckoutErrorCode;
    let headers: Record<string, string> = {};
    if (error instanceof CheckoutFailure) {
      code = error.code;
      headers = error.headers;
    } else if (error instanceof CheckoutAuthError) {
      code = error.kind === 'expired' ? 'token_expired' : error.kind === 'invalid' ? 'unauthenticated' : 'billing_unavailable';
      deps.log('checkout_auth_error', { kind: error.kind });
    } else {
      const stripe = classifyStripeError(error);
      if (stripe) {
        code = stripe.code;
        deps.log('checkout_stripe_error', { code, ...stripe.fields });
      } else {
        code = 'internal_error';
        deps.log('checkout_internal_error', { name: error instanceof Error ? error.name : typeof error });
      }
    }
    if (code === 'payment_provider_unavailable') headers = { 'Retry-After': '5', ...headers };
    const { status, message } = ERRORS[code];
    return { status, body: { error: message, code }, headers };
  }
}

async function run(input: CheckoutInput, deps: CheckoutDeps): Promise<CheckoutResult> {
  const { env, now, stripe, store, log } = deps;

  // 1. Payments are off unless the server says otherwise. Nothing else happens before this.
  const gate = evaluateCheckoutGate(env);
  if (!gate.ok) {
    if (gate.code === 'billing_unavailable') log('checkout_gate', { reason: 'no_valid_stripe_key' });
    throw fail(gate.code);
  }

  // 2. Who is asking: the verified token, nothing else.
  const token = input.authorization?.match(/^Bearer\s+(\S+)$/i)?.[1];
  if (!token) throw fail('unauthenticated');
  const user = await deps.verifyIdToken(token);
  if (typeof user?.uid !== 'string' || user.uid.length === 0) throw fail('unauthenticated');

  // 3. What they asked for: exactly { plan }.
  const body = parseBody(await input.readBody());
  if (!body) throw fail('invalid_request');
  if (!(BILLING_INTERVALS as readonly unknown[]).includes(body.plan)) throw fail('invalid_plan');

  // 4. The server's own configuration.
  const prices = loadPriceConfig(env);
  if (!prices.ok) {
    log('checkout_config', { reason: 'price_config', problems: prices.issues.map((i) => `${i.envVar}:${i.code}`).join(',') });
    throw fail('billing_unavailable');
  }
  const origin = appOrigin(env);
  if (!origin) {
    log('checkout_config', { reason: 'app_url' });
    throw fail('billing_unavailable');
  }
  const price = resolveCheckoutPrice(prices.config, body.plan);
  if (!price.ok) throw fail('invalid_plan');

  // 5. Cooldown (transactional, so two quick clicks cannot both pass).
  const claimedAt = now();
  const claim = await store.claimCheckout(user.uid, claimedAt, CHECKOUT_COOLDOWN_MS);
  if (!claim.ok) throw fail('too_many_requests', { 'Retry-After': String(Math.max(1, Math.ceil(claim.retryAfterMs / 1000))) });

  // 6. The Stripe customer for this Firebase user (by UID mapping, never by email).
  let customerId = claim.customerId;
  let freshCustomer = false;
  if (customerId) {
    const found = await stripe.retrieveCustomer(customerId);
    if (found.state === 'active') {
      if (found.firebaseUid !== user.uid) {
        // The stored customer belongs to someone else (or has no owner tag): never use it.
        log('checkout_customer_mismatch');
        throw fail('internal_error');
      }
    } else {
      customerId = null; // deleted in Stripe: make a new one
    }
  }
  if (!customerId) {
    const created = await stripe.createCustomer({ uid: user.uid, email: user.email }, `mino-customer-${user.uid}-${shortHash(user.email ?? '')}`);
    customerId = await store.saveCustomer(user.uid, created, claim.customerId);
    freshCustomer = customerId === created;
    if (!freshCustomer) log('checkout_customer_race_lost');
  }

  // 7. One live subscription per student.
  if (!freshCustomer) {
    const statuses = await stripe.listSubscriptionStatuses(customerId);
    if (statuses.some((s) => (BLOCKING_SUBSCRIPTION_STATUSES as readonly string[]).includes(s))) throw fail('already_subscribed');
  }

  // 8. The session. Premium is NOT granted here; the success page only says "processing".
  const session = await stripe.createCheckoutSession(
    {
      customerId,
      uid: user.uid,
      interval: price.interval,
      priceId: price.priceId,
      successUrl: `${origin}/profile?checkout=success`,
      cancelUrl: `${origin}/profile?checkout=cancelled`,
    },
    `mino-checkout-${user.uid}-${claimedAt}`,
  );
  if (typeof session.url !== 'string' || !session.url.startsWith('https://checkout.stripe.com/')) {
    log('checkout_bad_session_url');
    throw fail('payment_provider_error');
  }

  log('checkout_session_created', { interval: price.interval, mode: gate.mode });
  return { status: 200, body: { url: session.url }, headers: {} };
}
