import type { UserProgress } from '../types';

const STORAGE_KEY = 'kannada_buddy_progress_v1';

export const DEFAULT_USER_PROGRESS: UserProgress = {
  level: 1,
  xp: 0,
  dailyGoalMinutes: 10,
  todayMinutesSpent: 6,
  streakDays: 4,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: ['vowels_intro', 'consonants_ka_group'],
  learnedLetters: ['v_a', 'v_aa', 'v_i', 'c_ka', 'c_ga', 'c_ma'],
  learnedWords: ['w2_1', 'w2_2', 'w2_3', 'w3_1', 'ev_f1'],
  completedQuizzes: ['qz_1', 'qz_2'],
  savedItems: ['w2_1', 'v_a'],
  writingPracticed: ['v_a', 'c_ka'],
  kannadaLevel: 'beginner',
  learningReason: 'Daily conversation',
  audioSpeed: 1.0,
  soundEnabled: true,
  darkMode: false,
  onboardingCompleted: false
};

export const loadUserProgress = (): UserProgress => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Check streak continuity
      const today = new Date().toISOString().split('T')[0];
      const last = parsed.lastActiveDate;
      
      if (last && last !== today) {
        const lastDate = new Date(last);
        const currentDate = new Date(today);
        const diffDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
        
        if (diffDays > 1) {
          // Streak broken
          parsed.streakDays = 1;
        } else if (diffDays === 1) {
          // Continuous day
          parsed.streakDays = (parsed.streakDays || 0) + 1;
        }
        parsed.lastActiveDate = today;
      }
      return { ...DEFAULT_USER_PROGRESS, ...parsed };
    }
  } catch (err) {
    console.warn('Failed to load user progress from LocalStorage:', err);
  }
  return DEFAULT_USER_PROGRESS;
};

export const saveUserProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.warn('Failed to save user progress to LocalStorage:', err);
  }
};
