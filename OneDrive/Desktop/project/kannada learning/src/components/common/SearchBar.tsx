import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen } from 'lucide-react';
import { KANNADA_WORDS } from '../../data/words';
import { KANNADA_VOWELS } from '../../data/vowels';
import { KANNADA_CONSONANTS } from '../../data/consonants';
import { KANNADA_NUMBERS } from '../../data/numbers';
import { KANNADA_COLORS } from '../../data/colors';
import { KANNADA_VEGETABLES } from '../../data/vegetables';
import { KANNADA_EVERYDAY_WORDS } from '../../data/everyday';
import { AudioButton } from './AudioButton';
import { BookmarkButton } from './BookmarkButton';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: string[];
  onToggleSave: (id: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  isOpen,
  onClose,
  savedItems,
  onToggleSave
}) => {
  const [query, setQuery] = useState('');

  // Combined searchable index
  const searchableDataset = useMemo(() => {
    const items: Array<{
      id: string;
      kannada: string;
      transliteration: string;
      english: string;
      type: string;
    }> = [];

    KANNADA_VOWELS.forEach((v) =>
      items.push({
        id: v.id,
        kannada: v.character,
        transliteration: v.transliteration,
        english: `Vowel (${v.pronunciation})`,
        type: 'Vowel'
      })
    );

    KANNADA_CONSONANTS.forEach((c) =>
      items.push({
        id: c.id,
        kannada: c.character,
        transliteration: c.transliteration,
        english: `Consonant (${c.pronunciation})`,
        type: 'Consonant'
      })
    );

    KANNADA_WORDS.forEach((w) =>
      items.push({
        id: w.id,
        kannada: w.word,
        transliteration: w.transliteration,
        english: w.meaningEnglish,
        type: `${w.category} Word`
      })
    );

    KANNADA_EVERYDAY_WORDS.forEach((w) =>
      items.push({
        id: w.id,
        kannada: w.word,
        transliteration: w.transliteration,
        english: w.meaningEnglish,
        type: w.category
      })
    );

    KANNADA_NUMBERS.forEach((n) =>
      items.push({
        id: n.id,
        kannada: `${n.kannadaNumeral} (${n.kannadaWord})`,
        transliteration: n.transliteration,
        english: `Number ${n.number} (${n.englishWord})`,
        type: 'Number'
      })
    );

    KANNADA_COLORS.forEach((c) =>
      items.push({
        id: c.id,
        kannada: c.word,
        transliteration: c.transliteration,
        english: c.meaningEnglish,
        type: 'Color'
      })
    );

    KANNADA_VEGETABLES.forEach((v) =>
      items.push({
        id: v.id,
        kannada: v.word,
        transliteration: v.transliteration,
        english: v.meaningEnglish,
        type: 'Vegetable'
      })
    );

    return items;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchableDataset.filter(
      (item) =>
        item.kannada.toLowerCase().includes(q) ||
        item.transliteration.toLowerCase().includes(q) ||
        item.english.toLowerCase().includes(q)
    ).slice(0, 15);
  }, [query, searchableDataset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 animate-celebrate">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-emerald-50/50">
          <Search className="w-6 h-6 text-emerald-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Kannada word, English meaning, or transliteration (e.g. 'water', 'neeru', 'ಅಮ್ಮ')..."
            className="w-full text-base sm:text-lg bg-transparent focus:outline-none text-gray-800 placeholder-gray-400 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm font-semibold text-gray-500 hover:text-emerald-800 hover:bg-emerald-100/60 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[65vh] overflow-y-auto p-4 divide-y divide-gray-100">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-gray-400">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40 text-emerald-600" />
              <p className="font-semibold text-gray-600">Start typing to search dictionary</p>
              <p className="text-xs text-gray-400 mt-1">
                Search in Kannada script, Manglish pronunciation, or English
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <p className="font-semibold text-gray-700 text-lg">No results found for "{query}"</p>
              <p className="text-xs text-gray-400 mt-1">Try searching with a different spelling</p>
            </div>
          ) : (
            results.map((item) => {
              const isSaved = savedItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="py-3.5 px-3 flex items-center justify-between hover:bg-emerald-50/60 rounded-2xl transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="kannada-text text-2xl font-bold text-emerald-950 bg-emerald-100/80 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                      {item.kannada.split(' ')[0]}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="kannada-text font-bold text-lg text-emerald-900">
                          {item.kannada}
                        </span>
                        <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          {item.transliteration}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-600 mt-0.5">
                        {item.english}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <AudioButton
                      id={`src_${item.id}`}
                      textToSpeak={item.kannada}
                      size="sm"
                      variant="secondary"
                    />
                    <BookmarkButton
                      itemId={item.id}
                      isBookmarked={isSaved}
                      onToggle={onToggleSave}
                      size="sm"
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
