'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { UserSubscription, getOrCreateSubscription, hasPremiumAccess, getMaxLessonAccess } from '@/lib/subscription-service';
import Dashboard from '@/components/Dashboard';
import StudyView from '@/components/StudyView';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import PremiumPaywall from '@/components/PremiumPaywall';
import LoginView from '@/components/LoginView';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ViewType = 'dashboard' | 'study' | 'analytics';

export default function FirebaseApp() {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [showPaywall, setShowPaywall] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState(1);

  // Auth listener
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && currentUser.email) {
        setUser(currentUser);
        try {
          const sub = await getOrCreateSubscription(currentUser.uid, currentUser.email);
          setSubscription(sub);
        } catch (error) {
          console.error('[v0] Error loading subscription:', error);
        }
      } else {
        setUser(null);
        setSubscription(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Handle lesson selection with paywall check
  const handleSelectLesson = (lessonId: number) => {
    const maxAccess = getMaxLessonAccess(subscription);
    
    if (lessonId > maxAccess && !hasPremiumAccess(subscription)) {
      setShowPaywall(true);
      return;
    }
    
    setSelectedLessonId(lessonId);
    setCurrentView('study');
  };

  const handleLogout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
      setUser(null);
      setSubscription(null);
      setCurrentView('dashboard');
    } catch (error) {
      console.error('[v0] Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-600 animate-spin">
            <div className="w-8 h-8 border-2 border-transparent border-t-white rounded-full" />
          </div>
          <p className="text-gray-600 font-medium">Loading Vocabrain...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginView />;
  }

  const isPremium = hasPremiumAccess(subscription);
  const maxLessonAccess = getMaxLessonAccess(subscription);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar user={user} subscription={subscription} onLogout={handleLogout} />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as ViewType)}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="study">Study</TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              disabled={!isPremium}
            >
              Analytics {!isPremium && <span className="ml-1 text-xs">Pro</span>}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard 
              subscription={subscription}
              onSelectLesson={handleSelectLesson}
              maxLessonAccess={maxLessonAccess}
            />
          </TabsContent>

          <TabsContent value="study">
            <StudyView 
              lessonId={selectedLessonId}
              maxLessonAccess={maxLessonAccess}
              isPremium={isPremium}
            />
          </TabsContent>

          <TabsContent value="analytics">
            {isPremium ? (
              <AnalyticsDashboard />
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Feature</h3>
                <p className="text-gray-600">Upgrade to Premium to access advanced analytics.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {showPaywall && (
        <PremiumPaywall 
          user={user}
          subscription={subscription}
          onClose={() => setShowPaywall(false)}
          onSuccess={() => {
            setShowPaywall(false);
            setCurrentView('study');
          }}
        />
      )}
    </div>
  );
}
