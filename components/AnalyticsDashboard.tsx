'use client';

import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Target, Zap } from 'lucide-react';

// Mock analytics data
const retentionData = [
  { day: 'Mon', retention: 65 },
  { day: 'Tue', retention: 72 },
  { day: 'Wed', retention: 68 },
  { day: 'Thu', retention: 78 },
  { day: 'Fri', retention: 85 },
  { day: 'Sat', retention: 82 },
  { day: 'Sun', retention: 88 },
];

const studyData = [
  { topic: 'Work & Career', words: 20, studied: 18 },
  { topic: 'Education', words: 15, studied: 12 },
  { topic: 'Children & Families', words: 18, studied: 15 },
  { topic: 'Environment', words: 22, studied: 18 },
  { topic: 'Culture & Arts', words: 16, studied: 14 },
];

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-200 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Retention Rate</p>
              <p className="text-3xl font-bold text-blue-600">78%</p>
              <p className="text-xs text-gray-500 mt-1">↑ 5% from last week</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-200 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Words Mastered</p>
              <p className="text-3xl font-bold text-green-600">47/91</p>
              <p className="text-xs text-gray-500 mt-1">52% of total</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-200 rounded-lg">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Study Streak</p>
              <p className="text-3xl font-bold text-purple-600">12 days</p>
              <p className="text-xs text-gray-500 mt-1">Keep it up!</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Retention Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Word Retention (7 days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={retentionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="retention" 
              stroke="#2563eb" 
              strokeWidth={2}
              dot={{ fill: '#2563eb', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Study by Topic */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Study Progress by Topic</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={studyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="topic" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="words" fill="#dbeafe" name="Total Words" />
            <Bar dataKey="studied" fill="#3b82f6" name="Studied" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Weak Areas */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Words Needing Review</h3>
        <div className="space-y-3">
          {[
            { word: 'Pedagogical', accuracy: 45 },
            { word: 'Exacerbated', accuracy: 52 },
            { word: 'Delinquency', accuracy: 58 },
            { word: 'Conurbations', accuracy: 62 },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">{item.word}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${item.accuracy}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-600">{item.accuracy}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Estimated IELTS Score */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Estimated IELTS Vocabulary Level</h3>
        <div className="flex items-end gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Reading</p>
            <p className="text-4xl font-bold text-indigo-600">7.2</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Writing</p>
            <p className="text-4xl font-bold text-indigo-600">6.8</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Speaking</p>
            <p className="text-4xl font-bold text-indigo-600">7.0</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Listening</p>
            <p className="text-4xl font-bold text-indigo-600">7.4</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Based on your progress, you&apos;re on track for an overall IELTS band of 7.1
        </p>
      </Card>
    </div>
  );
}
