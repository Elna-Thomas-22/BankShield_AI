import React from 'react';
import type { WordItem } from '../../types';
import { AudioButton } from '../common/AudioButton';
import { BookmarkButton } from '../common/BookmarkButton';
import { Calendar, Sparkles } from 'lucide-react';

interface DailyWordCardProps {
  word: WordItem;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onPractice: (word: WordItem) => void;
}

export const DailyWordCard: React.FC<DailyWordCardProps> = ({
  word,
  isSaved,
  onToggleSave,
  onPractice
}) => {
  return (
    <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
      
      {/* Background Decorative Pattern */}
      <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      {/* Card Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          <span>Word of the Day</span>
        </div>
        <div className="bg-white/20 backdrop-blur-md rounded-full">
          <BookmarkButton
            itemId={word.id}
            isBookmarked={isSaved}
            onToggle={onToggleSave}
            size="sm"
            className="text-white"
          />
        </div>
      </div>

      {/* Main Kannada Word */}
      <div className="text-center my-4 relative z-10">
        <h2 className="kannada-text text-5xl sm:text-6xl font-extrabold mb-1 drop-shadow-sm">
          {word.word}
        </h2>
        <span className="inline-block bg-white text-amber-950 px-4 py-1 rounded-full font-bold text-base shadow-sm">
          {word.transliteration}
        </span>
      </div>

      {/* Meanings */}
      <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 my-4 text-center border border-white/20 relative z-10">
        <p className="text-lg font-bold">{word.meaningEnglish}</p>
        <p className="kannada-text text-xs text-amber-100 font-medium mt-0.5">
          Kannada: {word.meaningKannada}
        </p>

        {word.exampleSentence && (
          <div className="mt-3 pt-3 border-t border-white/15">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200 block">
              Example
            </span>
            <p className="kannada-text font-bold text-sm">
              {word.exampleSentence.kannada}
            </p>
            <p className="text-xs text-amber-100">
              {word.exampleSentence.transliteration} — "{word.exampleSentence.english}"
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2 relative z-10">
        <AudioButton
          id={`daily_${word.id}`}
          textToSpeak={word.word}
          audioUrl={word.audioUrl}
          size="md"
          variant="pill"
          className="flex-1 bg-white hover:bg-amber-50 text-amber-900 shadow-md font-bold"
        />

        <button
          onClick={() => onPractice(word)}
          className="flex items-center gap-1.5 px-4 py-2 bg-amber-900/40 hover:bg-amber-900/60 border border-white/30 text-white font-semibold text-sm rounded-full transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
          Practice
        </button>
      </div>

    </div>
  );
};
