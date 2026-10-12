import React from 'react';
import { Sparkles, Flame, Star, Search, Bookmark, Settings } from 'lucide-react';
import type { UserProgress } from '../../types';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  userProgress: UserProgress;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  userProgress,
  onOpenSearch,
  onOpenSettings
}) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'learn', label: 'Learn' },
    { id: 'practice', label: 'Practice' },
    { id: 'words', label: 'Words' },
    { id: 'conversations', label: 'Conversations' },
    { id: 'progress', label: 'Progress' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Tagline */}
          <div
            onClick={() => onTabChange('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 fill-emerald-300 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl text-emerald-950 tracking-tight">
                  Kannada<span className="text-emerald-600">Buddy</span>
                </span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  Beginner
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-medium text-emerald-700/80 hidden sm:block">
                Learn Kannada • Read Kannada • Speak Kannada
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`px-3.5 py-2 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-100/80 text-emerald-900 shadow-xs'
                      : 'text-gray-600 hover:text-emerald-800 hover:bg-emerald-50/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Status Badges & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Streak Badge */}
            <div
              title={`${userProgress.streakDays} Day Streak`}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-amber-50 border border-amber-200/80 rounded-full text-amber-800 font-bold text-xs sm:text-sm shadow-xs"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
              <span>{userProgress.streakDays}d</span>
            </div>

            {/* XP Badge */}
            <div
              title={`${userProgress.xp} Total XP`}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-emerald-50 border border-emerald-200/80 rounded-full text-emerald-800 font-bold text-xs sm:text-sm shadow-xs"
            >
              <Star className="w-4 h-4 text-emerald-500 fill-emerald-500" />
              <span>{userProgress.xp} XP</span>
            </div>

            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              title="Search Kannada Vocabulary"
              className="p-2 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Bookmarks Button */}
            <button
              onClick={() => onTabChange('saved')}
              title="My Saved Words"
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                currentTab === 'saved'
                  ? 'bg-amber-100 text-amber-700'
                  : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50'
              }`}
            >
              <Bookmark className="w-5 h-5" />
            </button>

            {/* Settings Button */}
            <button
              onClick={onOpenSettings}
              title="Settings"
              className="p-2 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
