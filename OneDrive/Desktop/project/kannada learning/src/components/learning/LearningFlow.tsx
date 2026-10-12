import React, { useState, useMemo } from 'react';
import type { AlphabetItem } from '../../types';
import { AudioButton } from '../common/AudioButton';
import { WritingCanvas } from './WritingCanvas';
import { CheckCircle2, ArrowRight, Sparkles, Volume2, Eye, PenTool, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LearningFlowProps {
  items: AlphabetItem[];
  onFinish: (learnedIds: string[]) => void;
  onCancel: () => void;
}

export const LearningFlow: React.FC<LearningFlowProps> = ({
  items,
  onFinish,
  onCancel
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(1); // 1 to 7
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizSuccess, setQuizSuccess] = useState<boolean | null>(null);

  const item = items[currentIndex] || items[0];

  const quizOptions = useMemo(() => {
    const rawOptions = [item.transliteration, 'Ma', 'Pa', 'Ta'];
    const unique = Array.from(new Set(rawOptions));
    const seed = item.id.charCodeAt(0) || 1;
    return unique.sort((a, b) => ((a.charCodeAt(0) * seed) % 5) - ((b.charCodeAt(0) * seed) % 5));
  }, [item.transliteration, item.id]);

  const steps = [
    { num: 1, label: 'See', icon: Eye },
    { num: 2, label: 'Listen', icon: Volume2 },
    { num: 3, label: 'Repeat', icon: Volume2 },
    { num: 4, label: 'Write', icon: PenTool },
    { num: 5, label: 'Practice', icon: Sparkles },
    { num: 6, label: 'Quiz', icon: HelpCircle },
    { num: 7, label: 'Complete', icon: CheckCircle2 }
  ];

  const handleNextStep = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
      if (currentStep === 6) {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      }
    } else {
      // Progress to next item or finish
      if (currentIndex < items.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setCurrentStep(1);
        setQuizSelected(null);
        setQuizSuccess(null);
      } else {
        onFinish(items.map((i) => i.id));
      }
    }
  };

  const handleQuizAnswer = (option: string) => {
    setQuizSelected(option);
    const isCorrect = option === item.transliteration;
    setQuizSuccess(isCorrect);
    if (isCorrect) {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-emerald-100 max-w-2xl mx-auto my-4">
      
      {/* Top Stepper Progress Indicator */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Guided Lesson ({currentIndex + 1} of {items.length})
          </span>
          <h2 className="text-xl font-extrabold text-emerald-950">
            Learning <span className="kannada-text text-amber-600 font-extrabold text-2xl ml-1">{item.character}</span> ({item.transliteration})
          </h2>
        </div>
        <button
          onClick={onCancel}
          className="text-xs font-semibold text-gray-400 hover:text-gray-600"
        >
          Exit Lesson
        </button>
      </div>

      {/* 7-Step Horizontal Visual Pipeline */}
      <div className="flex items-center justify-between mb-8 px-2 overflow-x-auto no-scrollbar py-2">
        {steps.map((step) => {
          const isActive = currentStep === step.num;
          const isDone = currentStep > step.num;
          const Icon = step.icon;
          return (
            <div key={step.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md scale-110'
                      : isDone
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Icon className="w-4 h-4" />}
                </div>
                <span
                  className={`text-[10px] font-bold mt-1 ${
                    isActive ? 'text-emerald-900' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {step.num < 7 && (
                <div
                  className={`w-6 sm:w-10 h-0.5 mx-1 transition-colors ${
                    currentStep > step.num ? 'bg-emerald-400' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content Container */}
      <div className="min-h-[260px] flex flex-col items-center justify-center py-4 bg-emerald-50/40 rounded-3xl p-6 border border-emerald-100">
        
        {/* Step 1: See */}
        {currentStep === 1 && (
          <div className="text-center animate-celebrate">
            <span className="text-xs font-bold uppercase text-emerald-700 tracking-wider block mb-2">
              Step 1 — Look closely at the letter
            </span>
            <h1 className="kannada-text text-8xl font-extrabold text-emerald-950 mb-2">
              {item.character}
            </h1>
            <p className="text-xl font-bold text-amber-800">{item.transliteration}</p>
            <p className="text-sm text-gray-600 mt-1">Pronounced as: "{item.pronunciation}"</p>
          </div>
        )}

        {/* Step 2: Listen */}
        {currentStep === 2 && (
          <div className="text-center animate-celebrate">
            <span className="text-xs font-bold uppercase text-emerald-700 tracking-wider block mb-4">
              Step 2 — Listen carefully to the sound
            </span>
            <h1 className="kannada-text text-7xl font-extrabold text-emerald-950 mb-6">
              {item.character}
            </h1>
            <AudioButton
              id={`step2_${item.id}`}
              textToSpeak={item.character}
              audioUrl={item.audioUrl}
              label="Click to Listen Sound"
              size="lg"
              variant="primary"
            />
          </div>
        )}

        {/* Step 3: Repeat */}
        {currentStep === 3 && (
          <div className="text-center animate-celebrate">
            <span className="text-xs font-bold uppercase text-emerald-700 tracking-wider block mb-3">
              Step 3 — Listen & Repeat Out Loud 🗣️
            </span>
            <AudioButton
              id={`step3_${item.id}`}
              textToSpeak={item.character}
              audioUrl={item.audioUrl}
              label="Replay Sound"
              size="md"
              variant="secondary"
              className="mb-4"
            />
            <p className="text-lg font-extrabold text-emerald-950 mb-1">
              Say out loud: "{item.transliteration}"
            </p>
            <p className="text-xs text-gray-500">
              Speak clearly to build muscle memory and confidence!
            </p>
          </div>
        )}

        {/* Step 4: Write */}
        {currentStep === 4 && (
          <div className="w-full">
            <WritingCanvas
              targetCharacter={item.character}
              transliteration={item.transliteration}
              audioText={item.character}
            />
          </div>
        )}

        {/* Step 5: Practice (Example Word) */}
        {currentStep === 5 && (
          <div className="text-center animate-celebrate">
            <span className="text-xs font-bold uppercase text-emerald-700 tracking-wider block mb-2">
              Step 5 — Learn an Example Word
            </span>
            <h3 className="kannada-text text-5xl font-extrabold text-emerald-950 my-2">
              {item.character} — {item.exampleWord}
            </h3>
            <p className="text-lg font-bold text-amber-800">
              {item.exampleTransliteration} = {item.exampleMeaningEnglish}
            </p>
            <AudioButton
              id={`step5_${item.id}`}
              textToSpeak={`${item.character}, ${item.exampleWord}`}
              size="sm"
              variant="primary"
              className="mt-4"
            />
          </div>
        )}

        {/* Step 6: Quiz */}
        {currentStep === 6 && (
          <div className="text-center w-full max-w-md animate-celebrate">
            <span className="text-xs font-bold uppercase text-emerald-700 tracking-wider block mb-3">
              Step 6 — Quick Check Quiz
            </span>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              What is the correct pronunciation of:
            </p>
            <h3 className="kannada-text text-6xl font-extrabold text-emerald-950 mb-6">
              {item.character}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {quizOptions.map((opt) => {
                  const isSelected = quizSelected === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleQuizAnswer(opt)}
                      className={`p-3 rounded-2xl font-bold text-base border transition-all cursor-pointer ${
                        isSelected
                          ? quizSuccess
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                            : 'bg-red-500 text-white border-red-500'
                          : 'bg-white hover:bg-emerald-100/60 text-emerald-950 border-emerald-200'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
            </div>

            {quizSuccess === true && (
              <p className="text-sm font-bold text-emerald-700 mt-4 animate-bounce">
                Correct! 🎉 Great job!
              </p>
            )}
            {quizSuccess === false && (
              <p className="text-sm font-bold text-red-600 mt-4">
                Not quite! Try again!
              </p>
            )}
          </div>
        )}

        {/* Step 7: Complete */}
        {currentStep === 7 && (
          <div className="text-center animate-celebrate">
            <Sparkles className="w-16 h-16 text-amber-400 fill-amber-400 mx-auto mb-2 animate-bounce" />
            <h2 className="text-3xl font-extrabold text-emerald-950 mb-1">
              Letter Completed! 🎉
            </h2>
            <p className="text-base text-gray-700 font-medium">
              You mastered <span className="kannada-text font-bold text-emerald-800 text-xl">{item.character}</span> ({item.transliteration})!
            </p>
            <span className="inline-block bg-amber-100 text-amber-900 border border-amber-300 font-bold px-4 py-1.5 rounded-full text-sm mt-3">
              +15 XP Earned ⭐
            </span>
          </div>
        )}

      </div>

      {/* Next Step Button Bar */}
      <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
        <button
          onClick={handleNextStep}
          disabled={currentStep === 6 && quizSuccess !== true}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-base rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <span>{currentStep === 7 ? (currentIndex === items.length - 1 ? 'Finish Lesson 🎉' : 'Next Letter →') : 'Continue →'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
