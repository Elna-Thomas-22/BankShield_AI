export type AlphabetType = 'vowel' | 'consonant';

export interface AlphabetItem {
  id: string;
  character: string;
  type: AlphabetType;
  transliteration: string;
  pronunciation: string;
  exampleWord: string;
  exampleTransliteration: string;
  exampleMeaningEnglish: string;
  exampleMeaningKannada: string;
  audioUrl?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  traceGuide?: string; // Dotted hint description or standard path hint
}

export interface GunithaksharaItem {
  consonant: string;
  consonantName: string;
  combinations: {
    vowel: string;
    vowelSign: string;
    combined: string;
    transliteration: string;
    pronunciation: string;
    exampleWord?: string;
    exampleMeaning?: string;
  }[];
}

export interface OttaksharaItem {
  id: string;
  baseLetter: string;
  ottaksharaSymbol: string;
  combinedGlyph: string;
  transliteration: string;
  pronunciation: string;
  difficulty: 'easy' | 'medium';
  exampleWord: string;
  exampleTransliteration: string;
  exampleMeaning: string;
  audioUrl?: string;
}

export type WordCategory =
  | '2-letter'
  | '3-letter'
  | '4-letter'
  | '5-letter'
  | 'home'
  | 'food'
  | 'body'
  | 'places'
  | 'time'
  | 'actions'
  | 'colors'
  | 'vegetables'
  | 'fruits'
  | 'family'
  | 'numbers';

export interface WordItem {
  id: string;
  word: string;
  transliteration: string;
  pronunciation: string;
  meaningEnglish: string;
  meaningKannada: string;
  category: WordCategory;
  audioUrl?: string;
  exampleSentence?: {
    kannada: string;
    transliteration: string;
    english: string;
  };
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  icon?: string;
  colorHex?: string;
}

export interface NumberItem {
  id: string;
  number: number;
  kannadaNumeral: string;
  kannadaWord: string;
  transliteration: string;
  englishWord: string;
  audioUrl?: string;
}

export interface ConversationLine {
  id: string;
  speaker: string;
  kannada: string;
  transliteration: string;
  english: string;
  audioUrl?: string;
}

export interface ConversationItem {
  id: string;
  category: 'family' | 'friends' | 'teacher' | 'neighbour' | 'market' | 'delivery' | 'travel' | 'directions' | 'introductions';
  title: string;
  titleKannada: string;
  description: string;
  icon: string;
  lines: ConversationLine[];
}

export type QuizType =
  | 'multiple_choice'
  | 'match_following'
  | 'listen_select'
  | 'choose_kannada'
  | 'word_meaning'
  | 'read_word'
  | 'write_letter';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  kannadaText?: string;
}

export interface QuizQuestion {
  id: string;
  type: QuizType;
  question: string;
  subText?: string;
  kannadaTarget?: string;
  audioUrl?: string;
  options?: QuizOption[];
  matchingPairs?: {
    id: string;
    leftKannada: string;
    rightEnglish: string;
  }[];
  correctAnswerId?: string;
  difficulty: 'beginner' | 'intermediate';
  category?: string;
}

export interface UserProgress {
  level: number;
  xp: number;
  dailyGoalMinutes: number;
  todayMinutesSpent: number;
  streakDays: number;
  lastActiveDate: string;
  completedLessons: string[]; // lesson IDs
  learnedLetters: string[]; // letter IDs
  learnedWords: string[]; // word IDs
  completedQuizzes: string[]; // quiz IDs
  savedItems: string[]; // item IDs (letters, words, numbers, conversations)
  writingPracticed: string[];
  kannadaLevel: 'beginner' | 'few_words' | 'reader' | 'speaker';
  learningReason: string;
  audioSpeed: number;
  soundEnabled: boolean;
  darkMode: boolean;
  onboardingCompleted: boolean;
}

export interface CategoryInfo {
  id: string;
  name: string;
  kannadaName: string;
  icon: string;
  count: number;
  color: string;
  description: string;
}
