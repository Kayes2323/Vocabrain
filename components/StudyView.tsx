'use client';

import { useState } from 'react';
import { getLesson } from '@/lib/vocabulary';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, BookOpen } from 'lucide-react';

interface StudyViewProps {
  lessonId: number;
  maxLessonAccess: number;
  isPremium: boolean;
}

export default function StudyView({ lessonId, maxLessonAccess, isPremium }: StudyViewProps) {
  const lesson = getLesson(lessonId);
  const [selectedWordIndex, setSelectedWordIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  if (!lesson) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-600">Lesson not found</p>
      </Card>
    );
  }

  const isLocked = lessonId > maxLessonAccess;

  if (isLocked) {
    return (
      <Card className="p-8 text-center bg-gradient-to-r from-yellow-50 to-orange-50">
        <AlertCircle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Lesson Locked</h3>
        <p className="text-gray-600 mb-4">
          This lesson is only available to Premium members. Upgrade your account to access all lessons.
        </p>
        <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          Upgrade to Premium
        </Button>
      </Card>
    );
  }

  const currentWord = lesson.words[selectedWordIndex];
  const progress = ((selectedWordIndex + 1) / lesson.words.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800">Lesson {lessonId}: {lesson.topic}</h3>
          <p className="text-sm text-gray-600">{selectedWordIndex + 1} of {lesson.words.length}</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Word Card */}
      <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-96 flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">Word</p>
          <h2 className="text-5xl font-bold text-blue-600 mb-8">{currentWord.word}</h2>

          <Button 
            size="lg"
            className="mb-6"
            onClick={() => setShowMeaning(!showMeaning)}
          >
            {showMeaning ? 'Hide' : 'Reveal'} Meaning
          </Button>

          {showMeaning && (
            <div className="bg-white rounded-lg p-6 mt-6 text-left">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-800">English:</span> {currentWord.meaning.split('/')[0]}
              </p>
              {currentWord.meaning.includes('/') && (
                <p className="text-gray-600 mt-2">
                  <span className="font-semibold text-gray-800">Bengali:</span> {currentWord.meaning.split('/')[1]}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-4">
                <span className="font-semibold">Topic:</span> {currentWord.topic}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Word List */}
      <Card className="p-6">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          All Words in This Lesson
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {lesson.words.map((word, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedWordIndex(index);
                setShowMeaning(false);
              }}
              className={`p-3 rounded-lg font-medium transition-all text-sm ${
                index === selectedWordIndex
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          disabled={selectedWordIndex === 0}
          onClick={() => {
            setSelectedWordIndex(Math.max(0, selectedWordIndex - 1));
            setShowMeaning(false);
          }}
        >
          Previous
        </Button>

        <p className="text-gray-600">
          {selectedWordIndex + 1} / {lesson.words.length}
        </p>

        <Button
          disabled={selectedWordIndex === lesson.words.length - 1}
          onClick={() => {
            setSelectedWordIndex(Math.min(lesson.words.length - 1, selectedWordIndex + 1));
            setShowMeaning(false);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
