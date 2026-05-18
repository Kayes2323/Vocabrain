'use client';

import { useState, useEffect } from 'react';
import { IELTSWord, getVocabularyByBand } from '@/lib/ielts-vocabulary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface IELTSStudyViewProps {
  bandLevel: 6 | 7 | 8 | 9;
  isPremium: boolean;
  onClose?: () => void;
}

export default function IELTSStudyView({ bandLevel, isPremium, onClose }: IELTSStudyViewProps) {
  const [words, setWords] = useState<IELTSWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studied, setStudied] = useState(new Set<string>());
  const [favorite, setFavorite] = useState(new Set<string>());

  useEffect(() => {
    const bandWords = getVocabularyByBand(bandLevel);
    setWords(bandWords);
  }, [bandLevel]);

  if (words.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading words...</p>
      </div>
    );
  }

  const currentWord = words[currentWordIndex];
  const progress = ((studied.size / words.length) * 100).toFixed(0);

  const handleNext = () => {
    setStudied(new Set(studied).add(currentWord.id));
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setIsFlipped(false);
    }
  };

  const toggleFavorite = () => {
    const newFavorites = new Set(favorite);
    if (newFavorites.has(currentWord.id)) {
      newFavorites.delete(currentWord.id);
    } else {
      newFavorites.add(currentWord.id);
    }
    setFavorite(newFavorites);
  };

  const bandColors = {
    6: 'from-green-500 to-green-600',
    7: 'from-blue-500 to-blue-600',
    8: 'from-purple-500 to-purple-600',
    9: 'from-indigo-500 to-indigo-600',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Band {bandLevel} Vocabulary Study
          </h1>
          {onClose && (
            <Button onClick={onClose} variant="outline">
              Close Study
            </Button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-slate-600">Progress</span>
            <span className="text-sm font-bold text-slate-900">
              {currentWordIndex + 1} / {words.length}
            </span>
          </div>
          <div className="w-full bg-slate-300 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-300"
              style={{ width: `${((currentWordIndex + 1) / words.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-slate-600 mt-1">{progress}% studied</p>
        </div>

        {/* Main Study Card */}
        <div className="mb-8">
          <div
            className={`bg-gradient-to-r ${bandColors[bandLevel]} rounded-xl p-8 text-white shadow-xl cursor-pointer transform transition-all hover:scale-105`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="text-center mb-6">
              <p className="text-sm font-semibold text-white/80 mb-2">
                {isFlipped ? 'DEFINITION & USAGE' : 'WORD'}
              </p>
            </div>

            <div className="min-h-40 flex flex-col justify-center">
              {!isFlipped ? (
                <div>
                  <h2 className="text-5xl font-bold mb-4">{currentWord.word}</h2>
                  <p className="text-xl text-white/90 font-semibold">
                    {currentWord.pronunciation}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-2xl font-bold mb-4">{currentWord.definition}</p>
                  <p className="text-white/90 italic">
                    Example: {currentWord.example}
                  </p>
                </div>
              )}
            </div>

            <p className="text-center text-white/70 text-sm mt-6">
              Click to {isFlipped ? 'see word' : 'see definition'}
            </p>
          </div>
        </div>

        {/* Detailed Information */}
        {isFlipped && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Part of Speech</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-slate-900 capitalize">
                  {currentWord.partOfSpeech}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Category</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-slate-900">{currentWord.category}</p>
              </CardContent>
            </Card>

            {currentWord.synonyms.length > 0 && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-sm">Synonyms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {currentWord.synonyms.map((synonym, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {synonym}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {currentWord.antonyms && currentWord.antonyms.length > 0 && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-sm">Antonyms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {currentWord.antonyms.map((antonym, idx) => (
                      <span
                        key={idx}
                        className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                      >
                        {antonym}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="md:col-span-2 bg-yellow-50 border-2 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-sm text-yellow-900">Memory Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-yellow-900 font-semibold">{currentWord.memoryTip}</p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 bg-green-50 border-2 border-green-200">
              <CardHeader>
                <CardTitle className="text-sm text-green-900">Example Sentence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-900">{currentWord.exampleSentence}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-4 justify-center mb-8">
          <Button
            onClick={handlePrevious}
            disabled={currentWordIndex === 0}
            variant="outline"
            className="px-6"
          >
            Previous
          </Button>

          <Button
            onClick={toggleFavorite}
            className={`px-6 ${
              favorite.has(currentWord.id)
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-slate-600 hover:bg-slate-700'
            }`}
          >
            {favorite.has(currentWord.id) ? '❤️ Favorited' : '🤍 Add to Favorites'}
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentWordIndex === words.length - 1}
            className="px-6 bg-blue-600 hover:bg-blue-700"
          >
            Next
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-2xl font-bold text-blue-600">{studied.size}</p>
            <p className="text-sm text-slate-600">Studied</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-2xl font-bold text-purple-600">{favorite.size}</p>
            <p className="text-sm text-slate-600">Favorites</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-2xl font-bold text-green-600">
              {words.length - currentWordIndex - 1}
            </p>
            <p className="text-sm text-slate-600">Remaining</p>
          </div>
        </div>
      </div>
    </div>
  );
}
