import React, { useState } from 'react';
import type { QuizQuestion } from '../../types';
import { AudioButton } from '../common/AudioButton';
import { MatchingQuiz } from './MatchingQuiz';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizCardProps {
  question: QuizQuestion;
  currentStepIndex: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  currentStepIndex,
  totalQuestions,
  onAnswer
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (question.type === 'match_following') {
    return (
      <MatchingQuiz
        question={question}
        onComplete={(isCorrect) => onAnswer(isCorrect)}
      />
    );
  }

  const handleSelectOption = (id: string) => {
    if (submitted) return;
    setSelectedOptionId(id);
  };

  const handleSubmit = () => {
    if (!selectedOptionId || submitted) return;
    setSubmitted(true);

    const selectedOpt = question.options?.find((o) => o.id === selectedOptionId);
    const isCorrect = selectedOpt?.isCorrect || false;

    if (isCorrect) {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    }
  };

  const handleNext = () => {
    const selectedOpt = question.options?.find((o) => o.id === selectedOptionId);
    const isCorrect = selectedOpt?.isCorrect || false;
    onAnswer(isCorrect);
    setSelectedOptionId(null);
    setSubmitted(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-emerald-100 max-w-xl mx-auto my-4">
      
      {/* Top Question Progress Counter */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Question {currentStepIndex + 1} of {totalQuestions}
        </span>
        <span className="text-xs font-semibold text-gray-500">
          Difficulty: {question.difficulty}
        </span>
      </div>

      {/* Main Target Display (Audio / Large Kannada glyph) */}
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-extrabold text-emerald-950 mb-3">
          {question.question}
        </h3>

        {question.kannadaTarget && (
          <div className="my-4">
            <span className="kannada-text text-6xl sm:text-7xl font-extrabold text-emerald-950 bg-emerald-50/60 px-8 py-3 rounded-3xl border border-emerald-100 inline-block shadow-xs">
              {question.kannadaTarget}
            </span>
          </div>
        )}

        {question.type === 'listen_select' && (
          <div className="my-6">
            <AudioButton
              id={`quiz_listen_${question.id}`}
              textToSpeak={question.kannadaTarget || question.question}
              audioUrl={question.audioUrl}
              label="🔊 Tap to Listen Audio"
              size="lg"
              variant="primary"
            />
          </div>
        )}
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {question.options?.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          let optionStyle = 'bg-emerald-50/40 hover:bg-emerald-100/60 border-emerald-200 text-emerald-950';

          if (isSelected) {
            optionStyle = 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-102';
          }

          if (submitted) {
            if (opt.isCorrect) {
              optionStyle = 'bg-emerald-600 text-white border-emerald-600 shadow-md font-bold';
            } else if (isSelected && !opt.isCorrect) {
              optionStyle = 'bg-red-500 text-white border-red-500 shadow-md';
            } else {
              optionStyle = 'bg-gray-100 text-gray-400 border-gray-200 opacity-60';
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(opt.id)}
              disabled={submitted}
              className={`p-4 rounded-2xl font-bold text-lg border transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
            >
              <span className={opt.text.match(/[\u0C80-\u0CFF]/) ? 'kannada-text text-2xl' : ''}>
                {opt.text}
              </span>
              {submitted && opt.isCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
              {submitted && isSelected && !opt.isCorrect && <XCircle className="w-5 h-5 text-white" />}
            </button>
          );
        })}
      </div>

      {/* Action Submit / Next Bar */}
      <div className="flex justify-end pt-4 border-t border-gray-100">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOptionId}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-base rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-base rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <span>Next Question</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>

    </div>
  );
};
