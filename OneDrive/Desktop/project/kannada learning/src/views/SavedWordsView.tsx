import React, { useMemo } from 'react';
import type { WordItem, AlphabetItem } from '../types';
import { KANNADA_WORDS } from '../data/words';
import { KANNADA_VOWELS } from '../data/vowels';
import { KANNADA_CONSONANTS } from '../data/consonants';
import { KANNADA_EVERYDAY_WORDS } from '../data/everyday';
import { KANNADA_COLORS } from '../data/colors';
import { KANNADA_VEGETABLES } from '../data/vegetables';
import { KANNADA_FAMILY } from '../data/family';
import { WordCard } from '../components/learning/WordCard';
import { LetterCard } from '../components/learning/LetterCard';
import { Bookmark, BookOpen } from 'lucide-react';

interface SavedWordsViewProps {
  savedItems: string[];
  onToggleSave: (id: string) => void;
  onNavigateToLearn: () => void;
}

export const SavedWordsView: React.FC<SavedWordsViewProps> = ({
  savedItems,
  onToggleSave,
  onNavigateToLearn
}) => {
  const allWordItems: WordItem[] = useMemo(() => {
    return [
      ...KANNADA_WORDS,
      ...KANNADA_EVERYDAY_WORDS,
      ...KANNADA_COLORS,
      ...KANNADA_VEGETABLES,
      ...KANNADA_FAMILY
    ];
  }, []);

  const savedLetters: AlphabetItem[] = useMemo(() => {
    return [...KANNADA_VOWELS, ...KANNADA_CONSONANTS].filter((l) =>
      savedItems.includes(l.id)
    );
  }, [savedItems]);

  const savedWords: WordItem[] = useMemo(() => {
    return allWordItems.filter((w) => savedItems.includes(w.id));
  }, [savedItems, allWordItems]);

  const isEmpty = savedLetters.length === 0 && savedWords.length === 0;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center">
            <Bookmark className="w-6 h-6 fill-amber-500" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
              My Saved Items
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              {savedLetters.length + savedWords.length} bookmarked items for review
            </p>
          </div>
        </div>
      </div>

      {isEmpty ? (
        /* Empty State (Requirement Section 44) */
        <div className="bg-white rounded-3xl p-12 text-center border border-emerald-100 max-w-md mx-auto my-8">
          <BookOpen className="w-16 h-16 text-emerald-300 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-extrabold text-emerald-950 mb-1">
            No saved words yet
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Words and letters you save will appear here for quick spaced repetition review.
          </p>
          <button
            onClick={onNavigateToLearn}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Start Learning Now →
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Saved Letters */}
          {savedLetters.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-emerald-950">
                Saved Letters ({savedLetters.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {savedLetters.map((l) => (
                  <LetterCard
                    key={l.id}
                    item={l}
                    isSaved={true}
                    onToggleSave={onToggleSave}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Saved Words */}
          {savedWords.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-emerald-950">
                Saved Words ({savedWords.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {savedWords.map((w) => (
                  <WordCard
                    key={w.id}
                    word={w}
                    isSaved={true}
                    onToggleSave={onToggleSave}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
