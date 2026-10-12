import React, { useState, useMemo } from 'react';
import { KANNADA_WORDS } from '../data/words';
import { KANNADA_EVERYDAY_WORDS } from '../data/everyday';
import { KANNADA_COLORS } from '../data/colors';
import { KANNADA_VEGETABLES } from '../data/vegetables';
import { KANNADA_FAMILY } from '../data/family';
import { WordCard } from '../components/learning/WordCard';
import type { WordItem } from '../types';
import { Search } from 'lucide-react';

interface WordsViewProps {
  savedItems: string[];
  onToggleSave: (id: string) => void;
}

export const WordsView: React.FC<WordsViewProps> = ({
  savedItems,
  onToggleSave
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const allWords: WordItem[] = useMemo(() => {
    return [
      ...KANNADA_WORDS,
      ...KANNADA_EVERYDAY_WORDS,
      ...KANNADA_COLORS,
      ...KANNADA_VEGETABLES,
      ...KANNADA_FAMILY
    ];
  }, []);

  const categories = [
    { id: 'all', label: 'All Words' },
    { id: '2-letter', label: '2-Letter Words' },
    { id: '3-letter', label: '3-Letter Words' },
    { id: '4-letter', label: '4-Letter Words' },
    { id: '5-letter', label: '5-Letter Words' },
    { id: 'family', label: 'Family' },
    { id: 'colors', label: 'Colors' },
    { id: 'vegetables', label: 'Vegetables' },
    { id: 'home', label: 'Home' },
    { id: 'food', label: 'Food' },
    { id: 'body', label: 'Body Parts' },
    { id: 'places', label: 'Places' },
    { id: 'time', label: 'Time & Days' },
    { id: 'actions', label: 'Actions' }
  ];

  const filteredWords = useMemo(() => {
    return allWords.filter((w) => {
      const matchCat = selectedCategory === 'all' || w.category === selectedCategory;
      const matchSearch =
        !searchTerm ||
        w.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.meaningEnglish.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [allWords, selectedCategory, searchTerm]);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Search & Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
            Kannada Vocabulary Dictionary
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Showing {filteredWords.length} beginner Kannada words
          </p>
        </div>

        {/* Filter Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search word or meaning..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-2xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-2xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white hover:bg-emerald-50 text-gray-700 border border-emerald-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Words Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredWords.map((word) => (
          <WordCard
            key={word.id}
            word={word}
            isSaved={savedItems.includes(word.id)}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>

    </div>
  );
};
