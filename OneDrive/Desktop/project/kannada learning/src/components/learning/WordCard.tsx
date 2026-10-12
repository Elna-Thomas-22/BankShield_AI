import type { WordItem } from '../../types';
import { AudioButton } from '../common/AudioButton';
import { BookmarkButton } from '../common/BookmarkButton';

interface WordCardProps {
  word: WordItem;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const WordCard: React.FC<WordCardProps> = ({
  word,
  isSaved,
  onToggleSave
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md border border-emerald-100/80 transition-all flex flex-col justify-between relative group">
      
      {/* Category Pill & Color Hex / Icon Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {word.icon && <span className="text-2xl">{word.icon}</span>}
          {word.colorHex && (
            <span
              className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
              style={{ backgroundColor: word.colorHex }}
              title={word.meaningEnglish}
            />
          )}
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
            {word.category}
          </span>
        </div>

        <BookmarkButton
          itemId={word.id}
          isBookmarked={isSaved}
          onToggle={onToggleSave}
          size="sm"
        />
      </div>

      {/* Main Word Display */}
      <div className="text-center my-3">
        <h3 className="kannada-text text-4xl sm:text-5xl font-extrabold text-emerald-950 mb-1.5 group-hover:scale-105 transition-transform duration-200">
          {word.word}
        </h3>
        <span className="inline-block bg-amber-50 text-amber-900 border border-amber-200/80 px-3.5 py-1 rounded-full font-bold text-sm">
          {word.transliteration}
        </span>
      </div>

      {/* Meanings */}
      <div className="bg-gray-50/80 rounded-2xl p-3.5 my-3 text-center border border-gray-100">
        <p className="text-base font-bold text-gray-800">{word.meaningEnglish}</p>
        <p className="kannada-text text-xs text-gray-500 font-medium mt-0.5">
          {word.meaningKannada}
        </p>
      </div>

      {/* Example Sentence if provided */}
      {word.exampleSentence && (
        <div className="bg-emerald-50/60 rounded-2xl p-3 mb-4 border border-emerald-100/80 text-left">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 block mb-0.5">
            Example Sentence
          </span>
          <p className="kannada-text text-sm font-bold text-emerald-950">
            {word.exampleSentence.kannada}
          </p>
          <p className="text-xs font-semibold text-emerald-800">
            {word.exampleSentence.transliteration}
          </p>
          <p className="text-xs text-gray-600 italic">
            "{word.exampleSentence.english}"
          </p>
        </div>
      )}

      {/* Audio Button */}
      <div className="pt-2 border-t border-gray-100">
        <AudioButton
          id={`word_${word.id}`}
          textToSpeak={word.word}
          audioUrl={word.audioUrl}
          size="md"
          variant="primary"
          className="w-full"
        />
      </div>

    </div>
  );
};
