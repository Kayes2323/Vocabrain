'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import type { UserSubscription } from '@/lib/subscription-service';

// Dynamically import Firebase components to avoid build-time errors
const FirebaseApp = dynamic(() => import('@/components/FirebaseApp'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-600 animate-spin">
          <div className="w-8 h-8 border-2 border-transparent border-t-white rounded-full" />
        </div>
        <p className="text-gray-600 font-medium">Loading Vocabrain...</p>
      </div>
    </div>
  )
});

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <FirebaseApp />;
}
