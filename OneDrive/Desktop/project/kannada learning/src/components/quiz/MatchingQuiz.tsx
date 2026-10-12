import React, { useState } from 'react';
import type { QuizQuestion } from '../../types';
import { CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MatchingQuizProps {
  question: QuizQuestion;
  onComplete: (isCorrect: boolean) => void;
}

export const MatchingQuiz: React.FC<MatchingQuizProps> = ({
  question,
  onComplete
}) => {
  const pairs = question.matchingPairs || [];
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongPair, setWrongPair] = useState<boolean>(false);

  // Left items (Kannada)
  const leftItems = pairs.map((p) => ({ id: p.id, text: p.leftKannada }));
  // Right items (English) shuffled or mapped
  const rightItems = pairs.map((p) => ({ id: p.id, text: p.rightEnglish }));

  const handleLeftClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    setSelectedLeft(id);
    setWrongPair(false);
  };

  const handleRightClick = (id: string) => {
    if (!selectedLeft || matchedIds.includes(id)) return;

    if (selectedLeft === id) {
      // Correct Match!
      const newMatched = [...matchedIds, id];
      setMatchedIds(newMatched);
      setSelectedLeft(null);
      setWrongPair(false);

      if (newMatched.length === pairs.length) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        onComplete(true);
      }
    } else {
      // Wrong Match
      setWrongPair(true);
      setTimeout(() => {
        setSelectedLeft(null);
        setWrongPair(false);
      }, 600);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 max-w-xl mx-auto">
      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Match the Following
        </span>
        <h3 className="text-xl font-extrabold text-emerald-950 mt-2">
          {question.question}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Tap a Kannada item on the left, then tap its matching English pair on the right!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Left Kannada Column */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block text-center">
            Kannada
          </span>
          {leftItems.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = selectedLeft === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLeftClick(item.id)}
                disabled={isMatched}
                className={`w-full p-4 rounded-2xl font-bold text-xl sm:text-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isMatched
                    ? 'bg-emerald-100/80 text-emerald-800 border-emerald-300 opacity-70'
                    : isSelected
                    ? wrongPair
                      ? 'bg-red-500 text-white border-red-600 animate-pulse'
                      : 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-102'
                    : 'bg-emerald-50/50 hover:bg-emerald-100/60 text-emerald-950 border-emerald-200'
                }`}
              >
                <span className="kannada-text">{item.text}</span>
                {isMatched && <CheckCircle2 className="w-5 h-5 text-emerald-700" />}
              </button>
            );
          })}
        </div>

        {/* Right English Column */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block text-center">
            English
          </span>
          {rightItems.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleRightClick(item.id)}
                disabled={isMatched || !selectedLeft}
                className={`w-full p-4 rounded-2xl font-bold text-base border transition-all cursor-pointer flex items-center justify-between ${
                  isMatched
                    ? 'bg-emerald-100/80 text-emerald-800 border-emerald-300 opacity-70'
                    : selectedLeft
                    ? 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-300 shadow-xs'
                    : 'bg-gray-50 text-gray-400 border-gray-200'
                }`}
              >
                <span>{item.text}</span>
                {isMatched && <CheckCircle2 className="w-5 h-5 text-emerald-700" />}
              </button>
            );
          })}
        </div>
      </div>

      {matchedIds.length === pairs.length && (
        <div className="mt-6 text-center animate-celebrate">
          <Sparkles className="w-8 h-8 text-amber-500 fill-amber-500 mx-auto mb-1" />
          <p className="font-extrabold text-emerald-800 text-lg">All Matched! Great job! 🎉</p>
        </div>
      )}
    </div>
  );
};
