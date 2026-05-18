'use client';

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { IELTSWord, IELTS_VOCABULARY } from '@/lib/ielts-vocabulary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ADMIN_EMAIL = 'aakayes99@gmail.com';

interface AdminPanelProps {
  user: User | null;
  onClose: () => void;
}

export default function AdminPanel({ user, onClose }: AdminPanelProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [words, setWords] = useState<IELTSWord[]>(IELTS_VOCABULARY);
  const [filteredWords, setFilteredWords] = useState<IELTSWord[]>(IELTS_VOCABULARY);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBand, setSelectedBand] = useState<'all' | 6 | 7 | 8 | 9>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingWord, setEditingWord] = useState<IELTSWord | null>(null);
  const [formData, setFormData] = useState<Partial<IELTSWord>>({
    word: '',
    pronunciation: '',
    definition: '',
    example: '',
    synonyms: [],
    antonyms: [],
    partOfSpeech: 'noun',
    bandLevel: 6,
    category: '',
    memoryTip: '',
    exampleSentence: '',
  });

  // Check if user is admin
  useEffect(() => {
    setIsAdmin(user?.email === ADMIN_EMAIL);
  }, [user]);

  // Filter words based on search and band
  useEffect(() => {
    let filtered = words;

    if (selectedBand !== 'all') {
      filtered = filtered.filter(w => w.bandLevel === selectedBand);
    }

    if (searchTerm) {
      filtered = filtered.filter(w =>
        w.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.definition.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredWords(filtered);
  }, [searchTerm, selectedBand, words]);

  // Handle form submission
  const handleSaveWord = () => {
    if (!formData.word || !formData.definition) {
      alert('Please fill in required fields');
      return;
    }

    if (editingWord) {
      // Update existing word
      setWords(words.map(w => w.id === editingWord.id ? { ...editingWord, ...formData } as IELTSWord : w));
      setEditingWord(null);
    } else {
      // Add new word
      const newWord: IELTSWord = {
        id: `word_${Date.now()}`,
        word: formData.word || '',
        pronunciation: formData.pronunciation || '',
        definition: formData.definition || '',
        example: formData.example || '',
        synonyms: formData.synonyms || [],
        antonyms: formData.antonyms || [],
        partOfSpeech: formData.partOfSpeech as any || 'noun',
        bandLevel: (formData.bandLevel as 6 | 7 | 8 | 9) || 6,
        category: formData.category || '',
        memoryTip: formData.memoryTip || '',
        exampleSentence: formData.exampleSentence || '',
      };
      setWords([...words, newWord]);
    }

    // Reset form
    setFormData({
      word: '',
      pronunciation: '',
      definition: '',
      example: '',
      synonyms: [],
      antonyms: [],
      partOfSpeech: 'noun',
      bandLevel: 6,
      category: '',
      memoryTip: '',
      exampleSentence: '',
    });
    setShowForm(false);
  };

  // Handle delete word
  const handleDeleteWord = (id: string) => {
    if (confirm('Are you sure you want to delete this word?')) {
      setWords(words.filter(w => w.id !== id));
    }
  };

  // Handle edit word
  const handleEditWord = (word: IELTSWord) => {
    setEditingWord(word);
    setFormData(word);
    setShowForm(true);
  };

  if (!isAdmin) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Access Denied</h2>
          <p className="text-gray-600 mb-6">
            Only administrators can access this panel. Please contact support if you believe this is an error.
          </p>
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col z-50 overflow-hidden">
      <div className="flex-1 overflow-auto bg-white">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Admin Panel - Vocabulary Manager</h1>
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>

          {/* Add Word Button */}
          <div className="mb-6">
            <Button
              onClick={() => {
                setShowForm(true);
                setEditingWord(null);
                setFormData({
                  word: '',
                  pronunciation: '',
                  definition: '',
                  example: '',
                  synonyms: [],
                  antonyms: [],
                  partOfSpeech: 'noun',
                  bandLevel: 6,
                  category: '',
                  memoryTip: '',
                  exampleSentence: '',
                });
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              Add New Word
            </Button>
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <div className="bg-gray-50 p-6 rounded-lg mb-8 border-2 border-blue-500">
              <h3 className="text-2xl font-bold mb-4">{editingWord ? 'Edit Word' : 'Add New Word'}</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Word"
                  value={formData.word || ''}
                  onChange={(e) => setFormData({ ...formData, word: e.target.value })}
                  className="col-span-2"
                />
                <Input
                  placeholder="Pronunciation"
                  value={formData.pronunciation || ''}
                  onChange={(e) => setFormData({ ...formData, pronunciation: e.target.value })}
                />
                <select
                  value={formData.bandLevel || 6}
                  onChange={(e) => setFormData({ ...formData, bandLevel: parseInt(e.target.value) as 6 | 7 | 8 | 9 })}
                  className="px-3 py-2 border rounded"
                >
                  <option value="6">Band 6</option>
                  <option value="7">Band 7</option>
                  <option value="8">Band 8</option>
                  <option value="9">Band 9</option>
                </select>
                <textarea
                  placeholder="Definition"
                  value={formData.definition || ''}
                  onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
                  className="col-span-2 px-3 py-2 border rounded"
                  rows={2}
                />
                <Input
                  placeholder="Category"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="col-span-2"
                />
                <textarea
                  placeholder="Example"
                  value={formData.example || ''}
                  onChange={(e) => setFormData({ ...formData, example: e.target.value })}
                  className="col-span-2 px-3 py-2 border rounded"
                  rows={2}
                />
                <textarea
                  placeholder="Memory Tip"
                  value={formData.memoryTip || ''}
                  onChange={(e) => setFormData({ ...formData, memoryTip: e.target.value })}
                  className="col-span-2 px-3 py-2 border rounded"
                  rows={2}
                />
                <textarea
                  placeholder="Example Sentence"
                  value={formData.exampleSentence || ''}
                  onChange={(e) => setFormData({ ...formData, exampleSentence: e.target.value })}
                  className="col-span-2 px-3 py-2 border rounded"
                  rows={2}
                />
                <div className="col-span-2 flex gap-2">
                  <Button onClick={handleSaveWord} className="flex-1 bg-green-600 hover:bg-green-700">
                    Save Word
                  </Button>
                  <Button
                    onClick={() => {
                      setShowForm(false);
                      setEditingWord(null);
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Search and Filter */}
          <div className="bg-gray-100 p-4 rounded-lg mb-6 flex gap-4">
            <Input
              placeholder="Search words..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <select
              value={selectedBand}
              onChange={(e) => setSelectedBand(e.target.value as any)}
              className="px-3 py-2 border rounded"
            >
              <option value="all">All Bands</option>
              <option value="6">Band 6</option>
              <option value="7">Band 7</option>
              <option value="8">Band 8</option>
              <option value="9">Band 9</option>
            </select>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-gray-600 font-semibold">Total Words</p>
              <p className="text-3xl font-bold text-blue-600">{words.length}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-gray-600 font-semibold">Band 6 (Basic)</p>
              <p className="text-3xl font-bold text-green-600">{words.filter(w => w.bandLevel === 6).length}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <p className="text-gray-600 font-semibold">Band 7-8 (Upper)</p>
              <p className="text-3xl font-bold text-yellow-600">{words.filter(w => w.bandLevel >= 7 && w.bandLevel <= 8).length}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <p className="text-gray-600 font-semibold">Band 9 (Expert)</p>
              <p className="text-3xl font-bold text-purple-600">{words.filter(w => w.bandLevel === 9).length}</p>
            </div>
          </div>

          {/* Words Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 text-left">Word</th>
                  <th className="border p-2 text-left">Definition</th>
                  <th className="border p-2 text-left">Band</th>
                  <th className="border p-2 text-left">Category</th>
                  <th className="border p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWords.map(word => (
                  <tr key={word.id} className="border hover:bg-gray-100">
                    <td className="border p-2 font-semibold text-blue-600">{word.word}</td>
                    <td className="border p-2 text-gray-700">{word.definition}</td>
                    <td className="border p-2">
                      <span className={`px-2 py-1 rounded text-white font-bold ${
                        word.bandLevel === 6 ? 'bg-green-600' :
                        word.bandLevel === 7 ? 'bg-yellow-600' :
                        word.bandLevel === 8 ? 'bg-orange-600' :
                        'bg-purple-600'
                      }`}>
                        Band {word.bandLevel}
                      </span>
                    </td>
                    <td className="border p-2">{word.category}</td>
                    <td className="border p-2 text-center flex gap-2 justify-center">
                      <Button
                        onClick={() => handleEditWord(word)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteWord(word.id)}
                        size="sm"
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredWords.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-xl">No words found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
