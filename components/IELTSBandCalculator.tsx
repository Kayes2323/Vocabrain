'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BandScoreData {
  listeningScore: number;
  readingScore: number;
  writingScore: number;
  speakingScore: number;
  vocabularyLevel: number;
}

export default function IELTSBandCalculator() {
  const [scores, setScores] = useState<BandScoreData>({
    listeningScore: 6,
    readingScore: 6,
    writingScore: 6,
    speakingScore: 6,
    vocabularyLevel: 6,
  });

  const [showResults, setShowResults] = useState(false);

  const calculateOverallBand = () => {
    const average =
      (scores.listeningScore +
        scores.readingScore +
        scores.writingScore +
        scores.speakingScore) /
      4;

    // IELTS bands are in 0.5 increments
    return Math.round(average * 2) / 2;
  };

  const getBandDescription = (band: number): string => {
    if (band <= 4) return 'Limited User';
    if (band <= 5) return 'Modest User';
    if (band <= 6) return 'Competent User';
    if (band <= 7) return 'Proficient User';
    if (band <= 8) return 'Upper Intermediate';
    return 'Expert Proficiency';
  };

  const handleScoreChange = (field: keyof BandScoreData, value: number) => {
    setScores(prev => ({ ...prev, [field]: value }));
  };

  const overallBand = calculateOverallBand();
  const vocabularyPercentage = (scores.vocabularyLevel / 9) * 100;

  const getBandColor = (band: number): string => {
    if (band <= 4) return 'bg-red-500';
    if (band <= 5) return 'bg-orange-500';
    if (band <= 6) return 'bg-yellow-500';
    if (band <= 7) return 'bg-blue-500';
    if (band <= 8) return 'bg-purple-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            IELTS Band Score Calculator
          </h1>
          <p className="text-slate-600">
            Estimate your IELTS band score based on your performance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Listening Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-slate-700">
                      Band Level
                    </label>
                    <span className="text-2xl font-bold text-blue-600">
                      {scores.listeningScore}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="9"
                    step="0.5"
                    value={scores.listeningScore}
                    onChange={(e) =>
                      handleScoreChange(
                        'listeningScore',
                        parseFloat(e.target.value)
                      )
                    }
                    className="w-full"
                  />
                  <p className="text-xs text-slate-500">
                    Estimated words understood:{' '}
                    {Math.round((scores.listeningScore / 9) * 5000)}+
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reading Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-slate-700">
                      Band Level
                    </label>
                    <span className="text-2xl font-bold text-green-600">
                      {scores.readingScore}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="9"
                    step="0.5"
                    value={scores.readingScore}
                    onChange={(e) =>
                      handleScoreChange('readingScore', parseFloat(e.target.value))
                    }
                    className="w-full"
                  />
                  <p className="text-xs text-slate-500">
                    Reading comprehension level: {getBandDescription(scores.readingScore)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Writing Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-slate-700">
                      Band Level
                    </label>
                    <span className="text-2xl font-bold text-purple-600">
                      {scores.writingScore}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="9"
                    step="0.5"
                    value={scores.writingScore}
                    onChange={(e) =>
                      handleScoreChange('writingScore', parseFloat(e.target.value))
                    }
                    className="w-full"
                  />
                  <p className="text-xs text-slate-500">
                    Writing proficiency: {getBandDescription(scores.writingScore)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Speaking Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-slate-700">
                      Band Level
                    </label>
                    <span className="text-2xl font-bold text-orange-600">
                      {scores.speakingScore}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="9"
                    step="0.5"
                    value={scores.speakingScore}
                    onChange={(e) =>
                      handleScoreChange('speakingScore', parseFloat(e.target.value))
                    }
                    className="w-full"
                  />
                  <p className="text-xs text-slate-500">
                    Fluency level: {getBandDescription(scores.speakingScore)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <CardHeader>
                <CardTitle>Vocabulary Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold">Band Level</label>
                    <span className="text-2xl font-bold">{scores.vocabularyLevel}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="9"
                    step="0.5"
                    value={scores.vocabularyLevel}
                    onChange={(e) =>
                      handleScoreChange('vocabularyLevel', parseFloat(e.target.value))
                    }
                    className="w-full"
                  />
                  <p className="text-xs text-white/90">
                    Estimated vocabulary mastery: {Math.round(vocabularyPercentage)}%
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="sticky top-8">
            <Card className={`${getBandColor(overallBand)} text-white shadow-2xl`}>
              <CardHeader>
                <CardTitle>Overall IELTS Band</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-6xl font-bold mb-2">{overallBand}</p>
                  <p className="text-xl font-semibold">
                    {getBandDescription(overallBand)}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Listening</span>
                      <span className="text-sm font-bold">
                        {scores.listeningScore}
                      </span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2">
                      <div
                        className="bg-white rounded-full h-2 transition-all"
                        style={{ width: `${(scores.listeningScore / 9) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Reading</span>
                      <span className="text-sm font-bold">{scores.readingScore}</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2">
                      <div
                        className="bg-white rounded-full h-2 transition-all"
                        style={{ width: `${(scores.readingScore / 9) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Writing</span>
                      <span className="text-sm font-bold">{scores.writingScore}</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2">
                      <div
                        className="bg-white rounded-full h-2 transition-all"
                        style={{ width: `${(scores.writingScore / 9) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Speaking</span>
                      <span className="text-sm font-bold">{scores.speakingScore}</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2">
                      <div
                        className="bg-white rounded-full h-2 transition-all"
                        style={{ width: `${(scores.speakingScore / 9) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Vocabulary</span>
                      <span className="text-sm font-bold">
                        {scores.vocabularyLevel}
                      </span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2">
                      <div
                        className="bg-white rounded-full h-2 transition-all"
                        style={{ width: `${(scores.vocabularyLevel / 9) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/30 pt-6">
                  <h3 className="font-bold mb-2">Recommendations:</h3>
                  <ul className="text-sm space-y-1 text-white/90">
                    {scores.listeningScore < 7 && (
                      <li>• Focus on listening skills and vocabulary retention</li>
                    )}
                    {scores.readingScore < 7 && (
                      <li>• Practice reading comprehension exercises</li>
                    )}
                    {scores.writingScore < 7 && (
                      <li>• Work on essay structure and grammar</li>
                    )}
                    {scores.speakingScore < 7 && (
                      <li>• Practice fluency and pronunciation</li>
                    )}
                    {scores.vocabularyLevel < 7 && (
                      <li>• Master more Band 7+ vocabulary words</li>
                    )}
                    {overallBand >= 7 && (
                      <li className="text-green-200">✓ Great progress! Keep practicing!</li>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
