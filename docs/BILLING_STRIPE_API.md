# Stripe API version decision (Task 3.2)

**Decision:** billing code uses Stripe API version `2026-04-22.dahlia`, the version the installed
`stripe@22.1.1` SDK is typed for. It is the constant `STRIPE_API_VERSION` in
`lib/billing/stripe-types.ts`. A test asserts it equals `Stripe.API_VERSION` from the SDK, so an SDK
upgrade cannot change it silently.

**Status:** decided and tested in Task 3.2. The Stripe client in `lib/stripe-server.ts` still pins the old
`'2024-11-20' as any`; it is switched to `STRIPE_API_VERSION` in Task 3.3 together with the checkout rewrite.
Until then the existing checkout route reads no subscription fields, so nothing depends on the difference.

## Evidence (all from the installed SDK, not from memory)

| Fact | Where it was checked |
| --- | --- |
| `Stripe.API_VERSION` is `2026-04-22.dahlia` | `node_modules/stripe/cjs/apiVersion.js`; `Stripe.API_VERSION` at runtime |
| The SDK only accepts its own version in `new Stripe(key, { apiVersion })` | `cjs/lib.d.ts`: `apiVersion?: LatestApiVersion` (a single literal). The old pin therefore needed `as any`. A `@ts-expect-error` in `scripts/test-billing-domain.ts` proves `'2024-11-20'` is a type error |
| `Subscription` has no `current_period_end` / `current_period_start` | `cjs/resources/Subscriptions.d.ts` (only list *filters* mention it). SDK changelog 18.0.0 (2025-04-01): "Remove support for `current_period_end` and `current_period_start` on `Subscription`" |
| They live on each subscription item | `cjs/resources/SubscriptionItems.d.ts`: `current_period_end: number`. Changelog 18.0.0: "Add support for ... on `SubscriptionItem`" |
| An invoice names its subscription at `parent.subscription_details.subscription`, with no top-level `subscription` | `cjs/resources/Invoices.d.ts` (`Parent.SubscriptionDetails`); proven by `@ts-expect-error` on `invoice.subscription` |
| The status union has exactly 8 values | `Subscription.Status` in `Subscriptions.d.ts`; `STRIPE_SUBSCRIPTION_STATUSES` is checked against it by the compiler |
| Webhook events are typed per event, e.g. `CustomerSubscriptionUpdatedEvent.data.object: Subscription` | `cjs/resources/Events.d.ts` |

## Why not keep `2024-11-20`

That version predates the basil change (`2025-03-31.basil`). Responses under it carry `current_period_end` on the
subscription and not on its items, and invoices carry a top-level `subscription`. Code written against the SDK's
types (`items.data[0].current_period_end`) would read `undefined` at runtime, and the compiler would not warn
because of the `as any`. Typed shapes and runtime shapes must be the same version.

## Why not just drop the pin

Without an explicit `apiVersion` the SDK still sends its own default, so behaviour is the same today. The
explicit constant makes the version a visible, reviewed choice: a future SDK upgrade changes the default, the
`STRIPE_API_VERSION` test fails, and someone must read the Stripe changelog before billing behaviour changes.

## Webhook payloads

An incoming event's body is rendered in the API version of the **webhook endpoint** (set in the Stripe
Dashboard or CLI), which is independent of the SDK. The design therefore reads only stable fields from the event
itself (`id`, `type`, `created`, the customer id, the subscription id) and retrieves the subscription through the
pinned client to get its authoritative state. The helpers accept both shapes:

* `getSubscriptionPeriodEnd`: item-level `current_period_end` first, older top-level value as fallback.
* `getInvoiceSubscriptionId`: `parent.subscription_details.subscription` first, older `subscription` as fallback.

Create the webhook endpoint with the same API version as `STRIPE_API_VERSION` when possible.

## Upgrading later

1. Read the SDK changelog between versions; run `pnpm typecheck` (the `@ts-expect-error` evidence will flag moved fields).
2. Update `STRIPE_API_VERSION`; `pnpm test:billing` must pass.
3. Re-create or update the webhook endpoint's API version in Stripe before deploying.
