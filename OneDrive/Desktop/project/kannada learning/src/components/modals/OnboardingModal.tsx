import React, { useState } from 'react';
import type { UserProgress } from '../../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface OnboardingModalProps {
  userProgress: UserProgress;
  onComplete: (updated: Partial<UserProgress>) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  onComplete
}) => {
  const [level, setLevel] = useState<UserProgress['kannadaLevel']>('beginner');
  const [reason, setReason] = useState('Daily conversation');
  const [goal, setGoal] = useState(10);

  const levels = [
    { id: 'beginner', title: 'I am completely new', desc: 'Cannot read or speak Kannada yet' },
    { id: 'few_words', title: 'I know a few words', desc: 'Can recognize basic greetings' },
    { id: 'reader', title: 'I can read Kannada', desc: 'Want to speak fluently' },
    { id: 'speaker', title: 'I can speak a little Kannada', desc: 'Want to refine reading & writing' }
  ];

  const reasons = [
    'Daily conversation',
    'Travel & Commute',
    'Work & Office',
    'Friends & Colleagues',
    'Family & Partners',
    'General learning'
  ];

  const goals = [5, 10, 15, 20];

  const handleSubmit = () => {
    onComplete({
      kannadaLevel: level,
      learningReason: reason,
      dailyGoalMinutes: goal,
      onboardingCompleted: true
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-emerald-100 animate-celebrate overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-emerald-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-3 shadow-md">
            <Sparkles className="w-8 h-8 text-amber-300 fill-amber-300" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
            Welcome to Kannada Buddy 👋
          </h2>
          <p className="text-sm font-medium text-emerald-700 mt-1">
            Let’s customize your beginner Kannada learning path!
          </p>
        </div>

        {/* Question 1: Kannada Level */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            1. What is your current Kannada level?
          </label>
          <div className="space-y-2">
            {levels.map((item) => (
              <button
                key={item.id}
                onClick={() => setLevel(item.id as UserProgress['kannadaLevel'])}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  level === item.id
                    ? 'bg-emerald-100/80 border-emerald-600 text-emerald-950 font-bold shadow-xs'
                    : 'bg-gray-50 hover:bg-emerald-50/50 border-gray-200 text-gray-700'
                }`}
              >
                <div className="font-bold text-sm">{item.title}</div>
                <div className="text-xs text-gray-500 font-normal">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Question 2: Learning Reason */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            2. Why are you learning Kannada?
          </label>
          <div className="grid grid-cols-2 gap-2">
            {reasons.map((r) => (
              <button
                key={r}
                onClick={() => setReason(r)}
                className={`p-3 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                  reason === r
                    ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                    : 'bg-gray-50 hover:bg-amber-50 text-gray-700 border-gray-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Question 3: Daily Goal */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            3. Choose your daily learning goal:
          </label>
          <div className="flex items-center justify-between gap-2">
            {goals.map((g) => (
              <button
                key={g}
                onClick={() => setGoal(g)}
                className={`flex-1 py-3 rounded-2xl text-sm font-extrabold border transition-all cursor-pointer ${
                  goal === g
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                    : 'bg-gray-50 text-emerald-900 border-gray-200 hover:bg-emerald-50'
                }`}
              >
                {g} min
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base rounded-2xl shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Start Learning Kannada →</span>
          <ArrowRight className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
};
