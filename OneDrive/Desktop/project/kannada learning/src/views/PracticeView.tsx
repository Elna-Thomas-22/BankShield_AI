import React, { useState } from 'react';
import type { AlphabetItem, UserProgress } from '../types';
import { KANNADA_QUIZZES } from '../data/quizzes';
import { KANNADA_VOWELS } from '../data/vowels';
import { KANNADA_CONSONANTS } from '../data/consonants';
import { QuizCard } from '../components/quiz/QuizCard';
import { QuizResult } from '../components/quiz/QuizResult';
import { WritingCanvas } from '../components/learning/WritingCanvas';
import { PenTool, HelpCircle, Volume2, BookOpen, Repeat, Sparkles } from 'lucide-react';

interface PracticeViewProps {
  userProgress: UserProgress;
  onRecordQuizCompletion: (xp: number) => void;
  overridePracticeLetter?: AlphabetItem | null;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  userProgress,
  onRecordQuizCompletion,
  overridePracticeLetter
}) => {
  const [practiceMode, setPracticeMode] = useState<'hub' | 'quiz' | 'writing'>(
    overridePracticeLetter ? 'writing' : 'hub'
  );
  const [quizCategoryFilter, setQuizCategoryFilter] = useState<string>('all');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Selected letter for writing canvas mode
  const [selectedWritingLetter, setSelectedWritingLetter] = useState<AlphabetItem>(
    overridePracticeLetter || KANNADA_VOWELS[0]
  );

  const activeQuestions =
    quizCategoryFilter === 'all'
      ? KANNADA_QUIZZES
      : KANNADA_QUIZZES.filter((q) => q.category === quizCategoryFilter || q.type === quizCategoryFilter);

  const startQuiz = (filter: string) => {
    setQuizCategoryFilter(filter);
    setCurrentQuizIndex(0);
    setQuizScore(0);
    setQuizFinished(false);
    setPracticeMode('quiz');
  };

  const handleQuizAnswer = (isCorrect: boolean) => {
    let newScore = quizScore;
    if (isCorrect) {
      newScore = quizScore + 1;
      setQuizScore(newScore);
    }

    if (currentQuizIndex < activeQuestions.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      setQuizFinished(true);
      const earnedXp = Math.round((newScore / activeQuestions.length) * 50);
      onRecordQuizCompletion(earnedXp);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Practice Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
              <span>Interactive Practice Hub</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Test Your Kannada Skills
            </h1>
            <p className="text-amber-100 text-sm font-medium mt-1">
              Writing canvas, matching pairs, listening tests & reading quizzes.
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white">
                ⭐ {userProgress.xp} XP
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white">
                🔥 {userProgress.streakDays} Day Streak
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white">
                🎯 {userProgress.completedQuizzes.length} Quizzes Completed
              </span>
            </div>
          </div>

          {practiceMode !== 'hub' && (
            <button
              onClick={() => setPracticeMode('hub')}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
            >
              ← Back to Hub
            </button>
          )}
        </div>
      </div>

      {/* HUB MODE: Category Options */}
      {practiceMode === 'hub' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* 1. Writing Canvas Practice */}
          <div
            onClick={() => setPracticeMode('writing')}
            className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <PenTool className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-emerald-950 group-hover:text-emerald-700">
                ✍️ Writing Practice Canvas
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Trace Kannada vowels, consonants & numbers on interactive touch canvas.
              </p>
            </div>
          </div>

          {/* 2. Letter Quiz */}
          <div
            onClick={() => startQuiz('alphabets')}
            className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-emerald-950 group-hover:text-amber-700">
                🔤 Letter Recognition Quiz
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Identify Kannada characters (ಅ, ಆ, ಕ, ಗ, ಮ...) and matching sounds.
              </p>
            </div>
          </div>

          {/* 3. Listening Quiz */}
          <div
            onClick={() => startQuiz('listening')}
            className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Volume2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-emerald-950 group-hover:text-emerald-700">
                🔊 Listen & Select Quiz
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Listen to audio pronunciations and select the correct Kannada word/letter.
              </p>
            </div>
          </div>

          {/* 4. Match the Following Quiz */}
          <div
            onClick={() => startQuiz('matching')}
            className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Repeat className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-emerald-950 group-hover:text-amber-700">
                🧩 Match Kannada & English
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Tap matching pairs for words, colors, numbers & daily phrases.
              </p>
            </div>
          </div>

          {/* 5. Reading Quiz */}
          <div
            onClick={() => startQuiz('words')}
            className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-emerald-950 group-hover:text-emerald-700">
                📖 Word Reading Test
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Test your reading comprehension on 2 to 5-letter beginner words.
              </p>
            </div>
          </div>

          {/* 6. All Master Quiz */}
          <div
            onClick={() => startQuiz('all')}
            className="bg-gradient-to-br from-emerald-600 to-green-700 text-white rounded-3xl p-6 border border-emerald-600 shadow-md hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-amber-300 fill-amber-300" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold">
                ⭐ Ultimate Beginner Quiz
              </h3>
              <p className="text-xs text-emerald-100 font-medium mt-1">
                Mixed quick-fire questions from all categories to earn +50 XP!
              </p>
            </div>
          </div>

        </div>
      )}

      {/* WRITING CANVAS MODE */}
      {practiceMode === 'writing' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-3xl border border-emerald-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Select Character to Trace:
            </label>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {[...KANNADA_VOWELS, ...KANNADA_CONSONANTS].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedWritingLetter(item)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-base transition-all cursor-pointer ${
                    selectedWritingLetter.id === item.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-900 border border-emerald-100 hover:bg-emerald-100'
                  }`}
                >
                  <span className="kannada-text">{item.character}</span>
                </button>
              ))}
            </div>
          </div>

          <WritingCanvas
            targetCharacter={selectedWritingLetter.character}
            transliteration={selectedWritingLetter.transliteration}
            audioText={selectedWritingLetter.character}
          />
        </div>
      )}

      {/* QUIZ MODE */}
      {practiceMode === 'quiz' && (
        <div>
          {!quizFinished ? (
            <QuizCard
              question={activeQuestions[currentQuizIndex]}
              currentStepIndex={currentQuizIndex}
              totalQuestions={activeQuestions.length}
              onAnswer={handleQuizAnswer}
            />
          ) : (
            <QuizResult
              score={quizScore}
              total={activeQuestions.length}
              xpEarned={Math.round((quizScore / activeQuestions.length) * 50)}
              onTryAgain={() => startQuiz(quizCategoryFilter)}
              onContinue={() => setPracticeMode('hub')}
            />
          )}
        </div>
      )}

    </div>
  );
};
