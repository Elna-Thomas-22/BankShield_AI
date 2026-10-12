import React from 'react';
import type { UserProgress, WordItem, AlphabetItem } from '../types';
import { DailyWordCard } from '../components/learning/DailyWordCard';
import { ProgressBar } from '../components/common/ProgressBar';
import { CategoryCard } from '../components/learning/CategoryCard';
import { Sparkles, ArrowRight, Flame, Play } from 'lucide-react';
import { KANNADA_VOWELS } from '../data/vowels';

interface HomeViewProps {
  userProgress: UserProgress;
  dailyWord: WordItem;
  savedItems: string[];
  onToggleSave: (id: string) => void;
  onNavigate: (tab: string, categoryFilter?: string) => void;
  onStartGuidedLesson: (items: AlphabetItem[]) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  userProgress,
  dailyWord,
  savedItems,
  onToggleSave,
  onNavigate,
  onStartGuidedLesson
}) => {
  const quickCategories = [
    { id: 'alphabets', title: 'Alphabets', kannadaTitle: 'ಅಕ್ಷರಮಾಲೆ', icon: '🔤', count: '49 Letters' },
    { id: 'writing', title: 'Writing', kannadaTitle: 'ಬರಹ ಅಭ್ಯಾಸ', icon: '✍️', count: 'Canvas Trace' },
    { id: 'gunithakshara', title: 'Gunithakshara', kannadaTitle: 'ಗುಣಿತಾಕ್ಷರ', icon: '🧩', count: '15 Combos' },
    { id: 'ottakshara', title: 'Ottakshara', kannadaTitle: 'ಒತ್ತಕ್ಷರ', icon: '🔗', count: '20 Conjuncts' },
    { id: 'words', title: 'Words', kannadaTitle: 'ಶಬ್ದಕೋಶ', icon: '📖', count: '110+ Words' },
    { id: 'numbers', title: 'Numbers', kannadaTitle: 'ಸಂಖ್ಯೆಗಳು', icon: '🔢', count: '0 to 100' },
    { id: 'colors', title: 'Colors', kannadaTitle: 'ಬಣ್ಣಗಳು', icon: '🎨', count: '13 Palette' },
    { id: 'vegetables', title: 'Vegetables', kannadaTitle: 'ತರಕಾರಿಗಳು', icon: '🥕', count: '20 Items' },
    { id: 'family', title: 'Family', kannadaTitle: 'ಕುಟುಂಬ', icon: '👨‍👩‍👧', count: '15 Members' },
    { id: 'conversations', title: 'Conversations', kannadaTitle: 'ಸಂಭಾಷಣೆ', icon: '💬', count: '10 Dialogues' }
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Greeting & Daily Progress Hero */}
      <section className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-green-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Beginner Path</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-2">
              Namaskara! 👋
            </h1>
            <p className="text-emerald-100 text-base sm:text-lg font-medium max-w-lg">
              Ready to learn Kannada today? Step-by-step easy lessons for complete beginners.
            </p>
          </div>

          {/* Today's Learning Progress Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 sm:min-w-[280px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                Today's Progress
              </span>
              <span className="text-xs font-bold text-amber-300">
                3 of 5 lessons
              </span>
            </div>
            <ProgressBar
              progress={60}
              showPercentage={true}
              color="amber"
              height="md"
            />
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10 text-xs font-semibold text-emerald-100">
              <span>Goal: {userProgress.dailyGoalMinutes} mins</span>
              <span className="flex items-center gap-1 text-amber-300">
                <Flame className="w-4 h-4 fill-amber-300" />
                {userProgress.streakDays} Day Streak!
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid: Continue Learning & Word of the Day */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Continue Learning Large Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 flex flex-col justify-between relative group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Current Lesson
              </span>
              <span className="text-xs font-bold text-amber-700">
                Level 1 — Kannada Basics
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mb-2">
              Kannada Vowels (ಸ್ವರಗಳು)
            </h2>
            <p className="text-sm font-medium text-gray-600 mb-6">
              Learn the 14 foundational vowel sounds: <span className="kannada-text font-bold text-emerald-900 text-lg">ಅ, ಆ, ಇ, ಈ, ಉ, ಊ...</span> with pronunciation & writing practice!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => onNavigate('learn', 'vowels')}
              className="flex-1 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Continue Lesson →</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onStartGuidedLesson(KANNADA_VOWELS)}
              className="py-3.5 px-5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-extrabold text-sm sm:text-base rounded-2xl shadow-sm transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-emerald-800" />
              <span>Step-by-Step Flow</span>
            </button>
          </div>
        </div>

        {/* Word of the Day Card */}
        <div className="lg:col-span-5">
          <DailyWordCard
            word={dailyWord}
            isSaved={savedItems.includes(dailyWord.id)}
            onToggleSave={onToggleSave}
            onPractice={() => onNavigate('practice')}
          />
        </div>

      </section>

      {/* Quick Learning Categories */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-emerald-950">
              Quick Learning Categories
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Explore alphabets, numbers, daily vocabulary, and conversation topics
            </p>
          </div>
          <button
            onClick={() => onNavigate('learn')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {quickCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              title={cat.title}
              kannadaTitle={cat.kannadaTitle}
              icon={cat.icon}
              countText={cat.count}
              onClick={() => onNavigate('learn', cat.id)}
            />
          ))}
        </div>
      </section>

      {/* Beginner Level Path Quick Banner */}
      <section className="bg-amber-50/80 border border-amber-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-500 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-md shrink-0">
            🔥
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-amber-950">
              Daily Practice Routine
            </h3>
            <p className="text-xs sm:text-sm text-amber-900 font-medium mt-0.5">
              Consistent 10 minutes a day builds confidence to read & speak natural Kannada.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('practice')}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm rounded-2xl shadow-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap"
        >
          Start Quiz & Practice →
        </button>
      </section>

    </div>
  );
};
