import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe-server';

// This is an API route, not a page - don't try to generate static HTML
export const dynamic = 'force-dynamic';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

async function handleCheckoutComplete(session: any) {
  const userId = session.metadata?.firebaseUserId;
  const userEmail = session.customer_details?.email;

  if (!userId || !userEmail) {
    console.error('[v0] Missing userId or email in webhook');
    return;
  }

  const stripeCustomerId = session.customer;
  const stripeSubscriptionId = session.subscription;

  try {
    // TODO: Import and call upgradeToPremium here when Firestore is configured
    // This would update the user's subscription status in Firestore
    console.log('[v0] User upgraded to premium:', userId, stripeSubscriptionId);
  } catch (error) {
    console.error('[v0] Error updating subscription:', error);
    throw error;
  }
}

async function handleSubscriptionDeleted(subscription: any) {
  // When subscription is cancelled, you can downgrade user back to free
  console.log('[v0] Subscription cancelled:', subscription.id);
  // TODO: Implement downgrade logic if needed
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event;

  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('[v0] Webhook error:', err.message);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutComplete(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;
      default:
        console.log(`[v0] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[v0] Webhook processing error:', error);
    return NextResponse.json({ error: 'Processing error' }, { status: 500 });
  }
}
