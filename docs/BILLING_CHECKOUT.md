# Secure checkout (Task 3.3)

`POST /api/stripe/checkout` starts a Stripe Checkout session for the signed-in student. **It never grants
Premium.** Premium is written only by the Stripe webhook (Task 3.4), after a verified payment.

All rules are in `lib/billing/checkout.ts` (pure, dependencies injected). The route, token verifier, Firestore
store and Stripe adapter are thin wiring: `app/api/stripe/checkout/route.ts`, `lib/server/checkout-*.ts`,
`lib/server/billing-store.ts`, `lib/billing/stripe-checkout-client.ts`.

## Order of checks

1. **Switches** (`lib/billing/checkout-gate.ts`), before anything else: `STRIPE_CHECKOUT_ENABLED` must be exactly
   `"true"`; the key must be a Stripe secret key; a live key (`sk_live_`/`rk_live_`) also needs `STRIPE_ALLOW_LIVE`
   exactly `"true"`. Both default to off. Disabled requests do not read the body or touch Firebase or Stripe.
2. **Identity**: `Authorization: Bearer <Firebase ID token>`, verified with the Admin SDK including revocation.
   The uid (and the email, used only to prefill Stripe) come from the verified token.
3. **Body**: exactly `{ "plan": "monthly" | "yearly" }`. Any other field (`userId`, `email`, `priceId`, ...) is 400.
4. **Server configuration**: both Price IDs valid and different; `NEXT_PUBLIC_APP_URL` is https (http only for localhost, never on Vercel).
5. **Cooldown**: one attempt per student per 10 s, claimed in a Firestore transaction (so simultaneous clicks cannot both pass).
6. **Customer**: `billing/{uid}.stripeCustomerId` if present (its Stripe `metadata.firebaseUid` must equal the uid, else the request fails and nothing is created); otherwise a customer is created with `metadata.firebaseUid` and saved by uid. **Customers are never looked up by email.**
7. **One live subscription**: an existing customer with a subscription in `active`, `trialing` or `past_due` gets 409.
8. **Session**: mode `subscription`, the allowlisted Price, `client_reference_id` and metadata (on the session and the subscription) set to the verified uid. `success_url` is `/profile?checkout=success` with no session id: the page may only say "processing".

## Responses

Success: `200 { "url": "https://checkout.stripe.com/..." }`. Errors: `{ "error": "<fixed message>", "code": "<code>" }`, never a Stripe message, key, token or email.

| code | status | meaning |
| --- | --- | --- |
| `checkout_disabled`, `live_payments_disabled` | 503 | a server switch is off |
| `billing_unavailable` | 503 | server misconfiguration (key, Price IDs, app URL, Firebase Admin) or Stripe rejected our key |
| `unauthenticated`, `token_expired` | 401 | missing, invalid, revoked or expired token |
| `invalid_request`, `invalid_plan` | 400 | body is not exactly a valid `{ plan }` |
| `too_many_requests` | 429 | cooldown (`Retry-After` seconds) |
| `already_subscribed` | 409 | a live subscription exists |
| `payment_provider_unavailable` | 503 | Stripe unreachable or rate limiting (`Retry-After: 5`) |
| `payment_provider_error`, `internal_error` | 502 / 500 | anything else |

## Firestore written by checkout (server only, Admin SDK, closed to clients by the default-deny rule)

* `billing/{uid}`: `stripeCustomerId`, `lastCheckoutAtMs`, `createdAt`, `updatedAt`
* `stripeCustomers/{customerId}`: `uid`, `createdAt`

Checkout never writes `subscriptions/*`. No rules change was needed.

## Known limits

* The cooldown applies to every attempt, including one that ends in an error from Stripe.
* Two checkout sessions opened before either is paid can both complete; the webhook (Task 3.4) must detect and flag a second live subscription.
* A subscription set to cancel at period end still counts as live until it ends, so the student cannot buy again until then.
* The session URL must be on `https://checkout.stripe.com/`; a Stripe custom checkout domain would need that check widened.
* Real Stripe has not been exercised from this environment. Tests use the real SDK against a local mock server and a fake client.
