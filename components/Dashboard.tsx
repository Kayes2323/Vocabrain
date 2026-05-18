'use client';

import { UserSubscription } from '@/lib/subscription-service';
import { VOCABULARY_DATA } from '@/lib/vocabulary';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, BookOpen, BarChart3 } from 'lucide-react';

interface DashboardProps {
  subscription: UserSubscription | null;
  onSelectLesson: (lessonId: number) => void;
  maxLessonAccess: number;
}

export default function Dashboard({ subscription, onSelectLesson, maxLessonAccess }: DashboardProps) {
  const isPremium = subscription?.plan === 'premium' || subscription?.isAdmin;

  return (
    <div className="space-y-8">
      {/* Premium Status */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              {isPremium ? '✨ Premium Member' : '📚 Free Member'}
            </h2>
            <p className="text-gray-600">
              {isPremium 
                ? 'You have access to all lessons and premium features'
                : `You can access the first ${maxLessonAccess} lessons. Upgrade to Premium for unlimited access.`
              }
            </p>
          </div>
          {!isPremium && (
            <Button 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
              onClick={() => console.log('Show paywall')}
            >
              Upgrade Now
            </Button>
          )}
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Lessons</p>
              <p className="text-2xl font-bold text-gray-800">{VOCABULARY_DATA.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Accessible Now</p>
              <p className="text-2xl font-bold text-gray-800">{maxLessonAccess}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Words</p>
              <p className="text-2xl font-bold text-gray-800">
                {VOCABULARY_DATA.reduce((sum, lesson) => sum + lesson.words.length, 0)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Lessons Grid */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Available Lessons</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VOCABULARY_DATA.map((lesson) => {
            const isLocked = lesson.lessonId > maxLessonAccess;
            return (
              <Card 
                key={lesson.lessonId} 
                className={`p-6 cursor-pointer transition-all ${
                  isLocked 
                    ? 'bg-gray-50 opacity-60' 
                    : 'bg-white hover:shadow-lg hover:scale-105'
                }`}
                onClick={() => !isLocked && onSelectLesson(lesson.lessonId)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Lesson {lesson.lessonId}</p>
                    <h4 className="text-lg font-semibold text-gray-800">{lesson.topic}</h4>
                  </div>
                  {isLocked && <Lock className="w-5 h-5 text-gray-400" />}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{lesson.words.length} words</p>
                  {isLocked ? (
                    <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                      Premium
                    </span>
                  ) : (
                    <Button size="sm" variant="outline">
                      Start Lesson
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      {!isPremium && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Unlock Full Access</h3>
          <p className="text-gray-600 mb-4">
            Get access to all {VOCABULARY_DATA.length} lessons + analytics + AI practice tests
          </p>
          <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8">
            Upgrade to Premium
          </Button>
        </Card>
      )}
    </div>
  );
}
