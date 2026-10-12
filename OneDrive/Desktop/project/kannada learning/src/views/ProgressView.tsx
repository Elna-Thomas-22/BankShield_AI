import React from 'react';
import type { UserProgress } from '../types';
import { ProgressBar } from '../components/common/ProgressBar';
import { Flame, Star, Trophy, BookOpen, PenTool, CheckCircle2, Award } from 'lucide-react';

interface ProgressViewProps {
  userProgress: UserProgress;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ userProgress }) => {
  const lettersLearnedCount = userProgress.learnedLetters.length;
  const totalLetters = 49;
  const wordsLearnedCount = userProgress.learnedWords.length;
  const totalWords = 500;
  const quizzesDone = userProgress.completedQuizzes.length;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Level & XP Header Card */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-amber-400 text-amber-950 rounded-3xl flex items-center justify-center font-extrabold text-2xl shadow-md shrink-0">
              <Award className="w-10 h-10 text-amber-950" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                Current Level
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                Level {userProgress.level} — Beginner Scholar
              </h2>
              <p className="text-xs text-emerald-100 font-medium mt-0.5">
                Keep learning daily to unlock Level 2: Kannada Reader
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl text-center">
              <span className="text-[10px] font-bold uppercase text-emerald-200 block">Streak</span>
              <span className="text-xl font-extrabold text-amber-300 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 fill-amber-300" />
                {userProgress.streakDays} Days
              </span>
            </div>

            <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl text-center">
              <span className="text-[10px] font-bold uppercase text-emerald-200 block">Total XP</span>
              <span className="text-xl font-extrabold text-emerald-300 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-emerald-300" />
                {userProgress.xp} XP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Statistics Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Letters Progress */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Letters Learned</span>
            <BookOpen className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-3xl font-extrabold text-emerald-950 mb-3">
            {lettersLearnedCount} / {totalLetters}
          </h3>
          <ProgressBar progress={(lettersLearnedCount / totalLetters) * 100} showPercentage={false} />
        </div>

        {/* Words Progress */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Words Learned</span>
            <Trophy className="w-5 h-5 text-amber-500" />
          </div>
          <h3 className="text-3xl font-extrabold text-emerald-950 mb-3">
            {wordsLearnedCount} / {totalWords}
          </h3>
          <ProgressBar progress={(wordsLearnedCount / totalWords) * 100} color="amber" showPercentage={false} />
        </div>

        {/* Quizzes Completed */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Quizzes Passed</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-3xl font-extrabold text-emerald-950 mb-1">
            {quizzesDone} Quizzes
          </h3>
          <p className="text-xs text-emerald-800 font-semibold">86% Average Accuracy</p>
        </div>

        {/* Writing Practice */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Writing Traces</span>
            <PenTool className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-3xl font-extrabold text-emerald-950 mb-1">
            {userProgress.writingPracticed.length} Characters
          </h3>
          <p className="text-xs text-gray-500 font-medium">Canvas Tracing Completed</p>
        </div>

      </div>

    </div>
  );
};
