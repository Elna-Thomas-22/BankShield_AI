import React from 'react';
import type { AlphabetItem } from '../../types';
import { AudioButton } from '../common/AudioButton';
import { BookmarkButton } from '../common/BookmarkButton';
import { PenTool } from 'lucide-react';

interface LetterCardProps {
  item: AlphabetItem;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onPracticeWriting?: (item: AlphabetItem) => void;
}

export const LetterCard: React.FC<LetterCardProps> = ({
  item,
  isSaved,
  onToggleSave,
  onPracticeWriting
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md border border-emerald-100/80 transition-all flex flex-col justify-between relative group">
      
      {/* Top Bar: Type Badge & Bookmark */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
          {item.type}
        </span>
        <BookmarkButton
          itemId={item.id}
          isBookmarked={isSaved}
          onToggle={onToggleSave}
          size="sm"
        />
      </div>

      {/* Main Dominant Kannada Letter */}
      <div className="my-6 text-center">
        <h2 className="kannada-text text-6xl sm:text-7xl font-extrabold text-emerald-950 group-hover:scale-105 transition-transform duration-200 leading-none mb-2">
          {item.character}
        </h2>
        <div className="inline-block bg-amber-50 text-amber-900 border border-amber-200/80 px-3.5 py-1 rounded-full font-bold text-sm">
          {item.transliteration} <span className="text-gray-400 font-normal">({item.pronunciation})</span>
        </div>
      </div>

      {/* Example Word Section */}
      <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 mb-5">
        <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
          Example Word
        </span>
        <div className="flex items-baseline justify-between">
          <div>
            <span className="kannada-text text-xl font-bold text-emerald-900">
              {item.character} — {item.exampleWord}
            </span>
            <p className="text-sm font-semibold text-emerald-800 mt-0.5">
              {item.exampleTransliteration} <span className="text-gray-500 font-normal">— {item.exampleMeaningEnglish}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
        <AudioButton
          id={`letter_${item.id}`}
          textToSpeak={`${item.character}, ${item.exampleWord}`}
          audioUrl={item.audioUrl}
          size="sm"
          variant="primary"
          className="flex-1"
        />

        {onPracticeWriting && (
          <button
            type="button"
            onClick={() => onPracticeWriting(item)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-colors cursor-pointer"
          >
            <PenTool className="w-3.5 h-3.5" />
            Write
          </button>
        )}
      </div>

    </div>
  );
};
