import React, { useEffect } from 'react';
import { Trophy, RotateCcw, ArrowRight, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizResultProps {
  score: number;
  total: number;
  xpEarned: number;
  onTryAgain: () => void;
  onContinue: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({
  score,
  total,
  xpEarned,
  onTryAgain,
  onContinue
}) => {
  const accuracy = Math.round((score / Math.max(1, total)) * 100);

  useEffect(() => {
    if (accuracy >= 60) {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    }
  }, [accuracy]);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-emerald-100 max-w-lg mx-auto text-center animate-celebrate my-6">
      <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
        <Trophy className="w-10 h-10 fill-amber-400" />
      </div>

      <h2 className="text-3xl font-extrabold text-emerald-950 mb-1">
        {accuracy >= 80 ? '🎉 Excellent Job!' : accuracy >= 50 ? '👏 Great Effort!' : '💪 Keep Practicing!'}
      </h2>
      <p className="text-sm font-semibold text-gray-500 mb-6">
        Quiz Completed Successfully
      </p>

      {/* Accuracy & Score Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
          <span className="text-xs font-bold uppercase text-emerald-700 block">Score</span>
          <span className="text-2xl font-extrabold text-emerald-950">{score} / {total}</span>
        </div>
        <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl">
          <span className="text-xs font-bold uppercase text-amber-700 block">Accuracy</span>
          <span className="text-2xl font-extrabold text-amber-950">{accuracy}%</span>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
          <span className="text-xs font-bold uppercase text-emerald-700 block">XP Earned</span>
          <span className="text-2xl font-extrabold text-emerald-900 flex items-center justify-center gap-1">
            <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
            +{xpEarned}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={onTryAgain}
          className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
        <button
          onClick={onContinue}
          className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Continue Learning</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
