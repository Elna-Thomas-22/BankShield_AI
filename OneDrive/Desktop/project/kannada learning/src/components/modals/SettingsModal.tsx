import React from 'react';
import type { UserProgress } from '../../types';
import { Settings, Volume2, VolumeX, Gauge, Target, RefreshCw, X } from 'lucide-react';
import { DEFAULT_USER_PROGRESS } from '../../services/storageService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProgress: UserProgress;
  onUpdate: (updated: Partial<UserProgress>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  userProgress,
  onUpdate
}) => {
  if (!isOpen) return null;

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all learning progress? This action cannot be undone.')) {
      onUpdate({ ...DEFAULT_USER_PROGRESS, onboardingCompleted: true });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-emerald-100 animate-celebrate">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-extrabold text-emerald-950">App Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Setting 1: Sound On/Off */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            {userProgress.soundEnabled ? (
              <Volume2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-400" />
            )}
            <div>
              <span className="font-bold text-sm text-gray-800 block">Sound & Audio</span>
              <span className="text-xs text-gray-400">Play pronunciation speech & sound FX</span>
            </div>
          </div>
          <button
            onClick={() => onUpdate({ soundEnabled: !userProgress.soundEnabled })}
            className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${
              userProgress.soundEnabled ? 'bg-emerald-600' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                userProgress.soundEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Setting 2: Pronunciation Speed */}
        <div className="py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5 mb-2">
            <Gauge className="w-5 h-5 text-amber-600" />
            <span className="font-bold text-sm text-gray-800">Pronunciation Speed</span>
          </div>
          <div className="flex items-center gap-2">
            {[0.75, 1.0, 1.25].map((speed) => (
              <button
                key={speed}
                onClick={() => onUpdate({ audioSpeed: speed })}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  userProgress.audioSpeed === speed
                    ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                    : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                {speed === 0.75 ? '0.75x (Slower)' : speed === 1.0 ? '1.0x (Normal)' : '1.25x (Faster)'}
              </button>
            ))}
          </div>
        </div>

        {/* Setting 3: Daily Goal */}
        <div className="py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5 mb-2">
            <Target className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-sm text-gray-800">Daily Goal</span>
          </div>
          <div className="flex items-center gap-2">
            {[5, 10, 15, 20].map((goal) => (
              <button
                key={goal}
                onClick={() => onUpdate({ dailyGoalMinutes: goal })}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  userProgress.dailyGoalMinutes === goal
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                {goal} min
              </button>
            ))}
          </div>
        </div>

        {/* Reset Progress */}
        <div className="pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-600">
            <RefreshCw className="w-4 h-4" />
            <span className="text-xs font-bold">Reset Progress</span>
          </div>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition-colors cursor-pointer"
          >
            Reset All Data
          </button>
        </div>

      </div>
    </div>
  );
};
