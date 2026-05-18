'use client';

import { User } from 'firebase/auth';
import { UserSubscription } from '@/lib/subscription-service';
import { Button } from '@/components/ui/button';
import { LogOut, Crown } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  subscription: UserSubscription | null;
  onLogout: () => void;
}

export default function Navbar({ user, subscription, onLogout }: NavbarProps) {
  const isPremium = subscription?.plan === 'premium' || subscription?.isAdmin;

  return (
    <nav className="bg-white shadow-md border-b-2 border-blue-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Vocabrain
          </h1>
          <span className="text-sm text-gray-500">IELTS Vocabulary Trainer</span>
        </div>

        <div className="flex items-center gap-4">
          {isPremium && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1.5 rounded-full">
              <Crown className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-700">Premium</span>
            </div>
          )}
          
          <div className="text-sm text-gray-600">
            <p className="font-medium">{user?.email}</p>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={onLogout}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
