'use client';

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { UserSubscription, hasPremiumAccess } from '@/lib/subscription-service';
import { getVocabularyByBand, getAllBands, IELTSWord } from '@/lib/ielts-vocabulary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface IELTSDashboardProps {
  user: User | null;
  subscription: UserSubscription | null;
  onSelectLesson: (bandLevel: 6 | 7 | 8 | 9) => void;
}

export default function IELTSDashboard({ user, subscription, onSelectLesson }: IELTSDashboardProps) {
  const isPremium = hasPremiumAccess(subscription);
  const [wordCounts, setWordCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    // Calculate word counts per band
    const counts: Record<number, number> = {};
    const bands: (6 | 7 | 8 | 9)[] = [6, 7, 8, 9];
    bands.forEach(band => {
      counts[band] = getVocabularyByBand(band).length;
    });
    setWordCounts(counts);
  }, []);

  const bands = [
    {
      level: 6,
      title: 'Band 6 - Competent User',
      color: 'from-green-500 to-green-600',
      description: 'Essential vocabulary for basic communication',
      locked: false,
    },
    {
      level: 7 as const,
      title: 'Band 7 - Proficient User',
      color: 'from-blue-500 to-blue-600',
      description: 'Advanced vocabulary for effective communication',
      locked: !isPremium,
    },
    {
      level: 8 as const,
      title: 'Band 8 - Mastery Level',
      color: 'from-purple-500 to-purple-600',
      description: 'Expert vocabulary for sophisticated discussion',
      locked: !isPremium,
    },
    {
      level: 9 as const,
      title: 'Band 9 - Expert Proficiency',
      color: 'from-indigo-500 to-indigo-600',
      description: 'Master command of vocabulary and nuance',
      locked: !isPremium,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            IELTS Vocabulary Master
          </h1>
          <p className="text-xl text-slate-600 mb-2">
            Build your IELTS vocabulary from Band 6 to Band 9
          </p>
          <p className="text-slate-500">
            {isPremium ? 'Premium: Access to all bands' : 'Free: Band 6 only available'}
          </p>
        </div>

        {/* User Stats */}
        {user && (
          <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-600">User</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-900">{user.email?.split('@')[0]}</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-600">Subscription</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${isPremium ? 'text-purple-600' : 'text-slate-400'}`}>
                  {isPremium ? 'Premium' : 'Free Tier'}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-600">Total Words</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600">
                  {isPremium ? '150+' : '40+'}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Band Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {bands.map((band) => (
            <div key={band.level} className="group cursor-pointer">
              <div
                className={`bg-gradient-to-r ${band.color} rounded-lg p-8 text-white shadow-lg transform transition-all hover:scale-105 ${
                  band.locked ? 'opacity-60' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">{band.title}</h3>
                    <p className="text-white/90">{band.description}</p>
                  </div>
                  {band.locked && (
                    <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                      Premium
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="text-white/80">
                    <p className="text-sm">Total Vocabulary Words</p>
                    <p className="text-3xl font-bold">{wordCounts[band.level] || 0}+</p>
                  </div>
                  <Button
                    onClick={() => onSelectLesson(band.level)}
                    disabled={band.locked}
                    className={`${
                      band.locked
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-white text-slate-900 hover:bg-slate-100 font-semibold'
                    }`}
                  >
                    {band.locked ? 'Unlock Now' : 'Study Now'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Premium Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Unlimited Lessons',
                description: 'Access all vocabulary bands from 6 to 9',
                icon: '📚',
              },
              {
                title: 'Advanced Analytics',
                description: 'Track progress and identify weak words',
                icon: '📊',
              },
              {
                title: 'AI Practice Tests',
                description: 'Generated tests based on your performance',
                icon: '🤖',
              },
              {
                title: 'Band Score Calculator',
                description: 'Estimate your IELTS band score',
                icon: '📈',
              },
              {
                title: 'Memory Tips',
                description: 'Clever mnemonics for difficult words',
                icon: '🧠',
              },
              {
                title: 'Certificates',
                description: 'Get certificates upon lesson completion',
                icon: '🏆',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-6 rounded-lg border-2 border-slate-200 hover:border-blue-500 transition-all"
              >
                <p className="text-4xl mb-3">{feature.icon}</p>
                <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        {!isPremium && (
          <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Unlock Premium Access</h2>
            <p className="text-lg mb-6 text-white/90">
              Get access to all 150+ IELTS vocabulary words, analytics, and premium study tools
            </p>
            <Button className="bg-white text-purple-600 hover:bg-slate-100 font-bold text-lg px-8 py-3">
              Upgrade to Premium
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
