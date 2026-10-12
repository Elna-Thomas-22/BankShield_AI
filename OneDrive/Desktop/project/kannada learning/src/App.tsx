import { useState, useEffect } from 'react';
import { loadUserProgress, saveUserProgress } from './services/storageService';
import type { UserProgress, AlphabetItem } from './types';
import { KANNADA_WORDS } from './data/words';
import { audioService } from './services/audioService';

// Common Components
import { Navbar } from './components/common/Navbar';
import { BottomNavigation } from './components/common/BottomNavigation';
import { SearchBar } from './components/common/SearchBar';

// Modals
import { OnboardingModal } from './components/modals/OnboardingModal';
import { SettingsModal } from './components/modals/SettingsModal';

// Learning Flow Modal
import { LearningFlow } from './components/learning/LearningFlow';

// Views
import { HomeView } from './views/HomeView';
import { LearnView } from './views/LearnView';
import { PracticeView } from './views/PracticeView';
import { WordsView } from './views/WordsView';
import { ProgressView } from './views/ProgressView';
import { SavedWordsView } from './views/SavedWordsView';

export function App() {
  const [userProgress, setUserProgress] = useState<UserProgress>(loadUserProgress);
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [learnSubTab, setLearnSubTab] = useState<string>('vowels');

  // Modals & Overlays
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [activeGuidedLessonItems, setActiveGuidedLessonItems] = useState<AlphabetItem[] | null>(null);
  const [overridePracticeLetter, setOverridePracticeLetter] = useState<AlphabetItem | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    saveUserProgress(userProgress);
    audioService.setMuted(!userProgress.soundEnabled);
    audioService.setRate(userProgress.audioSpeed);
  }, [userProgress]);

  // Handle User Progress Updates
  const handleUpdateUserProgress = (updated: Partial<UserProgress>) => {
    setUserProgress((prev) => {
      const next = { ...prev, ...updated };
      saveUserProgress(next);
      return next;
    });
  };

  // Toggle Save / Bookmark
  const handleToggleSave = (id: string) => {
    setUserProgress((prev) => {
      const exists = prev.savedItems.includes(id);
      const nextSaved = exists
        ? prev.savedItems.filter((item) => item !== id)
        : [...prev.savedItems, id];
      const next = { ...prev, savedItems: nextSaved };
      saveUserProgress(next);
      return next;
    });
  };

  // Handle Tab Navigation with Optional Subtab
  const handleNavigate = (tab: string, subTab?: string) => {
    setCurrentTab(tab);
    if (subTab) {
      setLearnSubTab(subTab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start Canvas Practice for specific item
  const handlePracticeWritingItem = (item: AlphabetItem) => {
    setOverridePracticeLetter(item);
    setCurrentTab('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Daily Word Item
  const dailyWord = KANNADA_WORDS[0] || {
    id: 'w2_1',
    word: 'ಮನೆ',
    transliteration: 'Mane',
    pronunciation: 'Ma-ne',
    meaningEnglish: 'House / Home',
    meaningKannada: 'ವಾಸಿಸುವ ಸ್ಥಳ',
    category: '2-letter'
  };

  return (
    <div className="min-h-screen bg-[#fcfaf6] text-gray-800 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Onboarding Modal for First-time users */}
      {!userProgress.onboardingCompleted && (
        <OnboardingModal
          userProgress={userProgress}
          onComplete={(updated) => handleUpdateUserProgress(updated)}
        />
      )}

      {/* Top Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => handleNavigate(tab)}
        userProgress={userProgress}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main App Workspace View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mb-16 md:mb-0">
        
        {/* Guided Lesson Flow Overlay Modal */}
        {activeGuidedLessonItems && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm overflow-y-auto p-4 flex items-center justify-center">
            <div className="w-full max-w-3xl">
              <LearningFlow
                items={activeGuidedLessonItems}
                onCancel={() => setActiveGuidedLessonItems(null)}
                onFinish={(learnedIds) => {
                  handleUpdateUserProgress({
                    xp: userProgress.xp + learnedIds.length * 15,
                    learnedLetters: Array.from(new Set([...userProgress.learnedLetters, ...learnedIds]))
                  });
                  setActiveGuidedLessonItems(null);
                }}
              />
            </div>
          </div>
        )}

        {/* View Switching */}
        {currentTab === 'home' && (
          <HomeView
            userProgress={userProgress}
            dailyWord={dailyWord}
            savedItems={userProgress.savedItems}
            onToggleSave={handleToggleSave}
            onNavigate={(tab, sub) => handleNavigate(tab, sub)}
            onStartGuidedLesson={(items) => setActiveGuidedLessonItems(items)}
          />
        )}

        {currentTab === 'learn' && (
          <LearnView
            initialSubTab={learnSubTab}
            savedItems={userProgress.savedItems}
            onToggleSave={handleToggleSave}
            onPracticeWritingItem={handlePracticeWritingItem}
            onStartGuidedLesson={(items) => setActiveGuidedLessonItems(items)}
          />
        )}

        {currentTab === 'practice' && (
          <PracticeView
            userProgress={userProgress}
            overridePracticeLetter={overridePracticeLetter}
            onRecordQuizCompletion={(earnedXp) => {
              handleUpdateUserProgress({
                xp: userProgress.xp + earnedXp,
                completedQuizzes: [...userProgress.completedQuizzes, `quiz_${Date.now()}`]
              });
            }}
          />
        )}

        {currentTab === 'words' && (
          <WordsView
            savedItems={userProgress.savedItems}
            onToggleSave={handleToggleSave}
          />
        )}

        {currentTab === 'conversations' && (
          <LearnView
            initialSubTab="conversations"
            savedItems={userProgress.savedItems}
            onToggleSave={handleToggleSave}
            onStartGuidedLesson={(items) => setActiveGuidedLessonItems(items)}
          />
        )}

        {currentTab === 'progress' && (
          <ProgressView userProgress={userProgress} />
        )}

        {currentTab === 'saved' && (
          <SavedWordsView
            savedItems={userProgress.savedItems}
            onToggleSave={handleToggleSave}
            onNavigateToLearn={() => handleNavigate('learn')}
          />
        )}

      </main>

      {/* Global Search Modal */}
      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        savedItems={userProgress.savedItems}
        onToggleSave={handleToggleSave}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userProgress={userProgress}
        onUpdate={handleUpdateUserProgress}
      />

      {/* Mobile Bottom Navigation */}
      <BottomNavigation
        currentTab={currentTab}
        onTabChange={(tab) => handleNavigate(tab)}
      />

    </div>
  );
}

export default App;
