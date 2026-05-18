'use client';

import { useState } from 'react';
import { User } from 'firebase/auth';
import { UserSubscription } from '@/lib/subscription-service';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Check, Sparkles, Zap, TrendingUp } from 'lucide-react';

interface PremiumPaywallProps {
  user: User | null;
  subscription: UserSubscription | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PremiumPaywall({ user, subscription, onClose, onSuccess }: PremiumPaywallProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (plan: 'monthly' | 'yearly') => {
    if (!user?.uid || !user?.email) {
      alert('Please log in first');
      return;
    }

    setLoading(true);
    try {
      // Call checkout API
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          email: user.email,
          plan: plan,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe checkout
      // Note: You'll need to install @stripe/react-stripe-js and use loadStripe
      const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      if (!stripePublishableKey) {
        throw new Error('Stripe publishable key not configured');
      }

      // For now, we'll show a message about what should happen
      window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
    } catch (error) {
      console.error('[v0] Checkout error:', error);
      alert(error instanceof Error ? error.message : 'Failed to process checkout');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: BookOpen, label: 'Unlimited Lessons', included: true },
    { icon: TrendingUp, label: 'Advanced Analytics', included: true },
    { icon: Zap, label: 'AI Practice Tests', included: true },
    { icon: Sparkles, label: 'Personalized Paths', included: true },
    { icon: Check, label: 'Certificates', included: true },
    { icon: Check, label: 'Priority Support', included: true },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl">
        <div className="p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <h2 className="text-3xl font-bold text-gray-800">Unlock Premium</h2>
            </div>
            <p className="text-gray-600">
              Get unlimited access to all lessons, analytics, and AI features
            </p>
          </div>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Monthly Plan */}
            <Card
              className={`p-6 cursor-pointer border-2 transition-all ${
                selectedPlan === 'monthly'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPlan('monthly')}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">Monthly</h3>
                <input
                  type="radio"
                  checked={selectedPlan === 'monthly'}
                  onChange={() => setSelectedPlan('monthly')}
                  className="w-4 h-4"
                />
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-2">$4.99<span className="text-lg text-gray-600">/month</span></p>
              <p className="text-sm text-gray-600">Perfect for trying premium features</p>
            </Card>

            {/* Yearly Plan */}
            <Card
              className={`p-6 cursor-pointer border-2 transition-all relative ${
                selectedPlan === 'yearly'
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPlan('yearly')}
            >
              <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                Save 40%
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">Yearly</h3>
                <input
                  type="radio"
                  checked={selectedPlan === 'yearly'}
                  onChange={() => setSelectedPlan('yearly')}
                  className="w-4 h-4"
                />
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-2">$39.99<span className="text-lg text-gray-600">/year</span></p>
              <p className="text-sm text-gray-600">Only $3.33/month billed annually</p>
            </Card>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h4 className="font-semibold text-gray-800 mb-4">Premium includes:</h4>
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Calculation */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-gray-800">
                {selectedPlan === 'monthly' ? '$4.99' : '$39.99'}
              </span>
            </div>
            <div className="flex items-center justify-between font-semibold text-lg">
              <span className="text-gray-800">Total</span>
              <span className="text-blue-600">
                {selectedPlan === 'monthly' ? '$4.99' : '$39.99'}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Billing: {selectedPlan === 'monthly' ? 'Monthly' : 'Yearly'}</p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => handleCheckout(selectedPlan)}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 text-lg font-semibold"
            >
              {loading ? 'Processing...' : `Upgrade to Premium - ${selectedPlan === 'monthly' ? '$4.99' : '$39.99'}`}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full"
              disabled={loading}
            >
              Maybe Later
            </Button>
          </div>

          {/* Trust Info */}
          <p className="text-xs text-gray-500 text-center mt-4">
            ✓ Secure payment with Stripe • Cancel anytime • 30-day money-back guarantee
          </p>
        </div>
      </Card>
    </div>
  );
}

// Import BookOpen icon
import { BookOpen } from 'lucide-react';
