import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe-server';

// This is an API route, not a page - don't try to generate static HTML
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { userId, email, plan } = await request.json();

    if (!userId || !email || !plan) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Pricing
    const prices: Record<string, { amount: number; interval: string }> = {
      monthly: { amount: 499, interval: 'month' }, // $4.99
      yearly: { amount: 3999, interval: 'year' },   // $39.99
    };

    const priceInfo = prices[plan];
    if (!priceInfo) {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      );
    }

    // Create or get Stripe customer
    let customer;
    const existingCustomers = await getStripe().customers.list({
      email: email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await getStripe().customers.create({
        email: email,
        metadata: {
          firebaseUserId: userId,
        },
      });
    }

    // Create checkout session
    const session = await getStripe().checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Vocabrain Premium',
              description: `Premium access to all IELTS vocabulary lessons and features (${plan})`,
              images: ['https://vocabrain.com/logo.png'], // Replace with actual logo
            },
            unit_amount: priceInfo.amount,
            recurring: {
              interval: priceInfo.interval as 'month' | 'year',
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?cancelled=true`,
      metadata: {
        firebaseUserId: userId,
        plan: plan,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('[v0] Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
