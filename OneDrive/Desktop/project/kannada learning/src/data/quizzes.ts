import type { QuizQuestion } from '../types';

export const KANNADA_QUIZZES: QuizQuestion[] = [
  // ==================== IDENTIFY THE LETTER ====================
  {
    id: 'qz_1',
    type: 'multiple_choice',
    question: 'What is the transliteration of this Kannada letter?',
    kannadaTarget: 'ಕ',
    difficulty: 'beginner',
    category: 'alphabets',
    options: [
      { id: 'o1', text: 'Ka', isCorrect: true },
      { id: 'o2', text: 'Ma', isCorrect: false },
      { id: 'o3', text: 'Pa', isCorrect: false },
      { id: 'o4', text: 'Ta', isCorrect: false }
    ]
  },
  {
    id: 'qz_2',
    type: 'multiple_choice',
    question: 'What sound does this vowel make?',
    kannadaTarget: 'ಅ',
    difficulty: 'beginner',
    category: 'vowels',
    options: [
      { id: 'o1', text: 'A (Short a)', isCorrect: true },
      { id: 'o2', text: 'Ee (Long e)', isCorrect: false },
      { id: 'o3', text: 'Oo (Long u)', isCorrect: false },
      { id: 'o4', text: 'Au', isCorrect: false }
    ]
  },
  {
    id: 'qz_3',
    type: 'multiple_choice',
    question: 'What is the correct sound for this letter?',
    kannadaTarget: 'ಮ',
    difficulty: 'beginner',
    category: 'consonants',
    options: [
      { id: 'o1', text: 'Ma', isCorrect: true },
      { id: 'o2', text: 'Na', isCorrect: false },
      { id: 'o3', text: 'Ya', isCorrect: false },
      { id: 'o4', text: 'Ra', isCorrect: false }
    ]
  },
  {
    id: 'qz_4',
    type: 'multiple_choice',
    question: 'Identify this letter:',
    kannadaTarget: 'ರ',
    difficulty: 'beginner',
    category: 'consonants',
    options: [
      { id: 'o1', text: 'Ra', isCorrect: true },
      { id: 'o2', text: 'La', isCorrect: false },
      { id: 'o3', text: 'Va', isCorrect: false },
      { id: 'o4', text: 'Sa', isCorrect: false }
    ]
  },

  // ==================== CHOOSE THE KANNADA LETTER ====================
  {
    id: 'qz_5',
    type: 'choose_kannada',
    question: 'Which of the following is the Kannada letter for "Ka"?',
    difficulty: 'beginner',
    category: 'alphabets',
    options: [
      { id: 'o1', text: 'ಕ', isCorrect: true },
      { id: 'o2', text: 'ಮ', isCorrect: false },
      { id: 'o3', text: 'ಪ', isCorrect: false },
      { id: 'o4', text: 'ತ', isCorrect: false }
    ]
  },
  {
    id: 'qz_6',
    type: 'choose_kannada',
    question: 'Which character represents the sound "Amma" starting letter (Short A)?',
    difficulty: 'beginner',
    category: 'vowels',
    options: [
      { id: 'o1', text: 'ಅ', isCorrect: true },
      { id: 'o2', text: 'ಆ', isCorrect: false },
      { id: 'o3', text: 'ಇ', isCorrect: false },
      { id: 'o4', text: 'ಉ', isCorrect: false }
    ]
  },
  {
    id: 'qz_7',
    type: 'choose_kannada',
    question: 'Which character is "Na"?',
    difficulty: 'beginner',
    category: 'consonants',
    options: [
      { id: 'o1', text: 'ನ', isCorrect: true },
      { id: 'o2', text: 'ತ', isCorrect: false },
      { id: 'o3', text: 'ದ', isCorrect: false },
      { id: 'o4', text: 'ಧ', isCorrect: false }
    ]
  },

  // ==================== READ THE WORD ====================
  {
    id: 'qz_8',
    type: 'read_word',
    question: 'How do you read this Kannada word?',
    kannadaTarget: 'ಮನೆ',
    difficulty: 'beginner',
    category: 'words',
    options: [
      { id: 'o1', text: 'Mane (House)', isCorrect: true },
      { id: 'o2', text: 'Neeru (Water)', isCorrect: false },
      { id: 'o3', text: 'Amma (Mother)', isCorrect: false },
      { id: 'o4', text: 'Nadi (River)', isCorrect: false }
    ]
  },
  {
    id: 'qz_9',
    type: 'read_word',
    question: 'What is the pronunciation of this word?',
    kannadaTarget: 'ನೀರು',
    difficulty: 'beginner',
    category: 'words',
    options: [
      { id: 'o1', text: 'Neeru', isCorrect: true },
      { id: 'o2', text: 'Haalu', isCorrect: false },
      { id: 'o3', text: 'Kaadu', isCorrect: false },
      { id: 'o4', text: 'Mane', isCorrect: false }
    ]
  },
  {
    id: 'qz_10',
    type: 'read_word',
    question: 'Choose the correct English meaning for this word:',
    kannadaTarget: 'ಪುಸ್ತಕ',
    difficulty: 'intermediate',
    category: 'words',
    options: [
      { id: 'o1', text: 'Book', isCorrect: true },
      { id: 'o2', text: 'Pen', isCorrect: false },
      { id: 'o3', text: 'Door', isCorrect: false },
      { id: 'o4', text: 'Window', isCorrect: false }
    ]
  },

  // ==================== MATCH THE FOLLOWING ====================
  {
    id: 'qz_11',
    type: 'match_following',
    question: 'Match the Kannada words to their English meanings:',
    difficulty: 'beginner',
    category: 'matching',
    matchingPairs: [
      { id: 'p1', leftKannada: 'ಅಮ್ಮ', rightEnglish: 'Mother' },
      { id: 'p2', leftKannada: 'ನೀರು', rightEnglish: 'Water' },
      { id: 'p3', leftKannada: 'ಮನೆ', rightEnglish: 'House' },
      { id: 'p4', leftKannada: 'ಪುಸ್ತಕ', rightEnglish: 'Book' }
    ]
  },
  {
    id: 'qz_12',
    type: 'match_following',
    question: 'Match the colors to their Kannada names:',
    difficulty: 'beginner',
    category: 'colors',
    matchingPairs: [
      { id: 'p1', leftKannada: 'ಕೆಂಪು', rightEnglish: 'Red' },
      { id: 'p2', leftKannada: 'ನೀಲಿ', rightEnglish: 'Blue' },
      { id: 'p3', leftKannada: 'ಹಸಿರು', rightEnglish: 'Green' },
      { id: 'p4', leftKannada: 'ಹಳದಿ', rightEnglish: 'Yellow' }
    ]
  },
  {
    id: 'qz_13',
    type: 'match_following',
    question: 'Match the numbers to their Kannada words:',
    difficulty: 'beginner',
    category: 'numbers',
    matchingPairs: [
      { id: 'p1', leftKannada: 'ಒಂದು', rightEnglish: 'One (1)' },
      { id: 'p2', leftKannada: 'ಎರಡು', rightEnglish: 'Two (2)' },
      { id: 'p3', leftKannada: 'ಮೂರು', rightEnglish: 'Three (3)' },
      { id: 'p4', leftKannada: 'ಐದು', rightEnglish: 'Five (5)' }
    ]
  },

  // ==================== LISTEN AND SELECT ====================
  {
    id: 'qz_14',
    type: 'listen_select',
    question: 'Listen carefully. What letter did you hear?',
    kannadaTarget: 'ಕ',
    difficulty: 'beginner',
    category: 'listening',
    options: [
      { id: 'o1', text: 'ಕ', isCorrect: true },
      { id: 'o2', text: 'ಮ', isCorrect: false },
      { id: 'o3', text: 'ಪ', isCorrect: false },
      { id: 'o4', text: 'ತ', isCorrect: false }
    ]
  },
  {
    id: 'qz_15',
    type: 'listen_select',
    question: 'Listen to the audio. Which word is pronounced?',
    kannadaTarget: 'ನಮಸ್ಕಾರ',
    difficulty: 'intermediate',
    category: 'listening',
    options: [
      { id: 'o1', text: 'ನಮಸ್ಕಾರ (Namaskara)', isCorrect: true },
      { id: 'o2', text: 'ಧನ್ಯವಾದ (Dhanyavaada)', isCorrect: false },
      { id: 'o3', text: 'ಸ್ವಾಗತ (Svaagatha)', isCorrect: false },
      { id: 'o4', text: 'ಶುಭೋದಯ (Shubhodaya)', isCorrect: false }
    ]
  },

  // ==================== GUNITHAKSHARA & OTTAKSHARA ====================
  {
    id: 'qz_16',
    type: 'multiple_choice',
    question: 'Which Gunithakshara represents Ka + I = Ki?',
    kannadaTarget: 'ಕಿ',
    difficulty: 'intermediate',
    category: 'gunithakshara',
    options: [
      { id: 'o1', text: 'ಕಿ', isCorrect: true },
      { id: 'o2', text: 'ಕಾ', isCorrect: false },
      { id: 'o3', text: 'ಕೀ', isCorrect: false },
      { id: 'o4', text: 'ಕು', isCorrect: false }
    ]
  },
  {
    id: 'qz_17',
    type: 'multiple_choice',
    question: 'Identify the Ottakshara (conjunct) in "ಅಕ್ಕ" (Akka):',
    kannadaTarget: 'ಕ್ಕ',
    difficulty: 'intermediate',
    category: 'ottakshara',
    options: [
      { id: 'o1', text: 'ಕ್ಕ (Double K sound)', isCorrect: true },
      { id: 'o2', text: 'ನ್ನ (Double N sound)', isCorrect: false },
      { id: 'o3', text: 'ಮ್ಮ (Double M sound)', isCorrect: false },
      { id: 'o4', text: 'ಲ್ಲ (Double L sound)', isCorrect: false }
    ]
  },

  // ==================== SIMPLE READING TEST ====================
  {
    id: 'qz_18',
    type: 'word_meaning',
    question: 'What does "ಅಪ್ಪ" (Appa) mean?',
    kannadaTarget: 'ಅಪ್ಪ',
    difficulty: 'beginner',
    category: 'family',
    options: [
      { id: 'o1', text: 'Father', isCorrect: true },
      { id: 'o2', text: 'Mother', isCorrect: false },
      { id: 'o3', text: 'Brother', isCorrect: false },
      { id: 'o4', text: 'Sister', isCorrect: false }
    ]
  },
  {
    id: 'qz_19',
    type: 'word_meaning',
    question: 'What vegetable is "ಈರುಳ್ಳಿ" (Eerulli)?',
    kannadaTarget: 'ಈರುಳ್ಳಿ',
    difficulty: 'intermediate',
    category: 'vegetables',
    options: [
      { id: 'o1', text: 'Onion', isCorrect: true },
      { id: 'o2', text: 'Potato', isCorrect: false },
      { id: 'o3', text: 'Tomato', isCorrect: false },
      { id: 'o4', text: 'Garlic', isCorrect: false }
    ]
  },
  {
    id: 'qz_20',
    type: 'word_meaning',
    question: 'What does "ಧನ್ಯವಾದ" (Dhanyavaada) mean?',
    kannadaTarget: 'ಧನ್ಯವಾದ',
    difficulty: 'beginner',
    category: 'phrases',
    options: [
      { id: 'o1', text: 'Thank You', isCorrect: true },
      { id: 'o2', text: 'Welcome', isCorrect: false },
      { id: 'o3', text: 'Good Morning', isCorrect: false },
      { id: 'o4', text: 'Sorry', isCorrect: false }
    ]
  }
];
