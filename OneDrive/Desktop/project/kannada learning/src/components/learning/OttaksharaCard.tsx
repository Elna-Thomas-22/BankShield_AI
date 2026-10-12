import React from 'react';
import type { OttaksharaItem } from '../../types';
import { AudioButton } from '../common/AudioButton';
import { BookmarkButton } from '../common/BookmarkButton';

interface OttaksharaCardProps {
  item: OttaksharaItem;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const OttaksharaCard: React.FC<OttaksharaCardProps> = ({
  item,
  isSaved,
  onToggleSave
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md border border-emerald-100 flex flex-col justify-between group">
      
      {/* Top Difficulty Badge & Bookmark */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
            item.difficulty === 'easy'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}
        >
          {item.difficulty} Conjunct
        </span>
        <BookmarkButton
          itemId={item.id}
          isBookmarked={isSaved}
          onToggle={onToggleSave}
          size="sm"
        />
      </div>

      {/* Main Combined Ottakshara Glyph */}
      <div className="text-center my-4">
        <h3 className="kannada-text text-5xl font-extrabold text-emerald-950 group-hover:scale-105 transition-transform duration-200 mb-1">
          {item.combinedGlyph}
        </h3>
        <p className="text-sm font-bold text-amber-800">
          {item.transliteration} <span className="text-gray-500 font-normal">({item.pronunciation})</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Base: <span className="kannada-text font-bold text-gray-700">{item.baseLetter}</span> + Subscript: <span className="kannada-text font-bold text-gray-700">{item.ottaksharaSymbol}</span>
        </p>
      </div>

      {/* Example Word */}
      <div className="bg-emerald-50/60 rounded-2xl p-3.5 mb-4 border border-emerald-100 text-center">
        <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider block mb-0.5">
          Example Word
        </span>
        <span className="kannada-text text-xl font-bold text-emerald-950">
          {item.exampleWord}
        </span>
        <p className="text-xs font-semibold text-emerald-800">
          {item.exampleTransliteration} — <span className="text-gray-600 font-normal">{item.exampleMeaning}</span>
        </p>
      </div>

      {/* Audio Button */}
      <div className="pt-2 border-t border-gray-100">
        <AudioButton
          id={`ott_${item.id}`}
          textToSpeak={`${item.combinedGlyph}, ${item.exampleWord}`}
          audioUrl={item.audioUrl}
          size="sm"
          variant="primary"
          className="w-full"
        />
      </div>

    </div>
  );
};
