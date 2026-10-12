import React, { useState } from 'react';
import type { AlphabetItem } from '../types';
import { KANNADA_VOWELS } from '../data/vowels';
import { KANNADA_CONSONANTS } from '../data/consonants';
import { KANNADA_WORDS } from '../data/words';
import { KANNADA_NUMBERS } from '../data/numbers';
import { KANNADA_COLORS } from '../data/colors';
import { KANNADA_VEGETABLES } from '../data/vegetables';
import { KANNADA_FAMILY } from '../data/family';
import { KANNADA_EVERYDAY_WORDS } from '../data/everyday';
import { KANNADA_CONVERSATIONS } from '../data/conversations';
import { OTTAKSHARA_DATA } from '../data/ottakshara';
import { LetterCard } from '../components/learning/LetterCard';
import { WordCard } from '../components/learning/WordCard';
import { GunithaksharaGrid } from '../components/learning/GunithaksharaGrid';
import { OttaksharaCard } from '../components/learning/OttaksharaCard';
import { ConversationCard } from '../components/learning/ConversationCard';
import { Play } from 'lucide-react';

interface LearnViewProps {
  initialSubTab?: string;
  savedItems: string[];
  onToggleSave: (id: string) => void;
  onPracticeWritingItem?: (item: AlphabetItem) => void;
  onStartGuidedLesson: (items: AlphabetItem[]) => void;
}

export const LearnView: React.FC<LearnViewProps> = ({
  initialSubTab = 'vowels',
  savedItems,
  onToggleSave,
  onPracticeWritingItem,
  onStartGuidedLesson
}) => {
  const [activeTab, setActiveTab] = useState(initialSubTab);

  const navTabs = [
    { id: 'vowels', label: 'Vowels (ಸ್ವರಗಳು)' },
    { id: 'consonants', label: 'Consonants (ವ್ಯಂಜನಗಳು)' },
    { id: 'gunithakshara', label: 'Gunithakshara (ಗುಣಿತಾಕ್ಷರ)' },
    { id: 'ottakshara', label: 'Ottakshara (ಒತ್ತಕ್ಷರ)' },
    { id: 'words', label: 'Words (ಶಬ್ದಕೋಶ)' },
    { id: 'numbers', label: 'Numbers (ಸಂಖ್ಯೆಗಳು)' },
    { id: 'colors', label: 'Colors (ಬಣ್ಣಗಳು)' },
    { id: 'vegetables', label: 'Vegetables (ತರಕಾರಿಗಳು)' },
    { id: 'family', label: 'Family (ಕುಟುಂಬ)' },
    { id: 'everyday', label: 'Everyday (ದೈನಂದಿನ)' },
    { id: 'conversations', label: 'Conversations (ಸಂಭಾಷಣೆ)' }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Category Tabs Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 border-b border-gray-200">
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md scale-102'
                  : 'bg-white hover:bg-emerald-50 text-gray-700 border border-emerald-100'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ==================== VOWELS SECTION ==================== */}
      {activeTab === 'vowels' && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-50/80 p-6 rounded-3xl border border-emerald-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-white border border-emerald-200 px-3 py-1 rounded-full">
                Level 1 — Kannada Vowels
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-2">
                ಸ್ವರಗಳು (Swaragalu — 14 Vowels)
              </h2>
              <p className="text-sm font-medium text-gray-600 mt-1">
                Learn basic vowel sounds, pronunciation & tracing for each letter.
              </p>
            </div>
            <button
              onClick={() => onStartGuidedLesson(KANNADA_VOWELS)}
              className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer self-start sm:self-center"
            >
              <Play className="w-4 h-4 fill-current" />
              Start Guided Lesson (1→7 Steps)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {KANNADA_VOWELS.map((item) => (
              <LetterCard
                key={item.id}
                item={item}
                isSaved={savedItems.includes(item.id)}
                onToggleSave={onToggleSave}
                onPracticeWriting={onPracticeWritingItem}
              />
            ))}
          </div>
        </section>
      )}

      {/* ==================== CONSONANTS SECTION ==================== */}
      {activeTab === 'consonants' && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-50/80 p-6 rounded-3xl border border-emerald-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-white border border-emerald-200 px-3 py-1 rounded-full">
                Level 1 — Kannada Consonants
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-2">
                ವ್ಯಂಜನಗಳು (Vyanjanagalu — 34 Consonants)
              </h2>
              <p className="text-sm font-medium text-gray-600 mt-1">
                Master Ka-varga, Cha-varga, Ta-varga, Pa-varga & Avargiya consonants.
              </p>
            </div>
            <button
              onClick={() => onStartGuidedLesson(KANNADA_CONSONANTS)}
              className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer self-start sm:self-center"
            >
              <Play className="w-4 h-4 fill-current" />
              Start Guided Consonant Lesson
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {KANNADA_CONSONANTS.map((item) => (
              <LetterCard
                key={item.id}
                item={item}
                isSaved={savedItems.includes(item.id)}
                onToggleSave={onToggleSave}
                onPracticeWriting={onPracticeWritingItem}
              />
            ))}
          </div>
        </section>
      )}

      {/* ==================== GUNITHAKSHARA SECTION ==================== */}
      {activeTab === 'gunithakshara' && (
        <GunithaksharaGrid
          onPracticeWriting={(char, trans) => {
            if (onPracticeWritingItem) {
              onPracticeWritingItem({
                id: `gunk_${char}`,
                character: char,
                type: 'consonant',
                transliteration: trans,
                pronunciation: trans,
                exampleWord: char,
                exampleTransliteration: trans,
                exampleMeaningEnglish: 'Combination',
                exampleMeaningKannada: 'ಗುಣಿತಾಕ್ಷರ'
              });
            }
          }}
        />
      )}

      {/* ==================== OTTAKSHARA SECTION ==================== */}
      {activeTab === 'ottakshara' && (
        <section className="space-y-6">
          <div className="bg-emerald-50/80 p-6 rounded-3xl border border-emerald-100">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-white border border-emerald-200 px-3 py-1 rounded-full">
              Level 2 — Conjunct Letters
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-2">
              ಒತ್ತಕ್ಷರ (Ottakshara — Combined Consonant Sounds)
            </h2>
            <p className="text-sm font-medium text-gray-600 mt-1">
              Learn double consonant blends like <strong>ಕ್ಕ (kka), ನ್ನ (nna), ಮ್ಮ (mma), ತ್ರ (tra), ಗ್ರ (gra)</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {OTTAKSHARA_DATA.map((item) => (
              <OttaksharaCard
                key={item.id}
                item={item}
                isSaved={savedItems.includes(item.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        </section>
      )}

      {/* ==================== WORDS SECTION ==================== */}
      {activeTab === 'words' && (
        <section className="space-y-6">
          <div className="bg-emerald-50/80 p-6 rounded-3xl border border-emerald-100">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-white border border-emerald-200 px-3 py-1 rounded-full">
              Level 3 — Word Building
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-2">
              ಕನ್ನಡ ಶಬ್ದಕೋಶ (Kannada Vocabulary — 2, 3, 4, 5-Letter Words)
            </h2>
            <p className="text-sm font-medium text-gray-600 mt-1">
              Simple beginner Kannada words with Manglish pronunciation & example sentences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {KANNADA_WORDS.map((w) => (
              <WordCard
                key={w.id}
                word={w}
                isSaved={savedItems.includes(w.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        </section>
      )}

      {/* ==================== NUMBERS SECTION ==================== */}
      {activeTab === 'numbers' && (
        <section className="space-y-6">
          <div className="bg-amber-50/80 p-6 rounded-3xl border border-amber-200">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-white border border-amber-200 px-3 py-1 rounded-full">
              Level 4 — Numbers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 mt-2">
              ಸಂಖ್ಯೆಗಳು (Numbers — 0 to 100+)
            </h2>
            <p className="text-sm font-medium text-amber-900 mt-1">
              Kannada numerals ೦, ೧, ೨, ೩... with word pronunciations (ಒಂದು, ಎರಡು, ಮೂರು).
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {KANNADA_NUMBERS.map((n) => (
              <div
                key={n.id}
                className="bg-white rounded-3xl p-5 border border-emerald-100 text-center shadow-xs hover:shadow-md transition-all"
              >
                <span className="text-xs font-bold text-gray-400 block">{n.englishWord} ({n.number})</span>
                <h3 className="kannada-text text-5xl font-extrabold text-emerald-950 my-1">
                  {n.kannadaNumeral}
                </h3>
                <p className="kannada-text font-bold text-lg text-emerald-900">{n.kannadaWord}</p>
                <p className="text-xs font-semibold text-amber-700">{n.transliteration}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================== COLORS SECTION ==================== */}
      {activeTab === 'colors' && (
        <section className="space-y-6">
          <div className="bg-emerald-50/80 p-6 rounded-3xl border border-emerald-100">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
              ಬಣ್ಣಗಳು (Colors)
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {KANNADA_COLORS.map((c) => (
              <WordCard
                key={c.id}
                word={c}
                isSaved={savedItems.includes(c.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        </section>
      )}

      {/* ==================== VEGETABLES SECTION ==================== */}
      {activeTab === 'vegetables' && (
        <section className="space-y-6">
          <div className="bg-emerald-50/80 p-6 rounded-3xl border border-emerald-100">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
              ತರಕಾರಿಗಳು (Vegetables)
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {KANNADA_VEGETABLES.map((v) => (
              <WordCard
                key={v.id}
                word={v}
                isSaved={savedItems.includes(v.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        </section>
      )}

      {/* ==================== FAMILY SECTION ==================== */}
      {activeTab === 'family' && (
        <section className="space-y-6">
          <div className="bg-emerald-50/80 p-6 rounded-3xl border border-emerald-100">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
              ಕುಟುಂಬದ ಸದಸ್ಯರು (Family Members)
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {KANNADA_FAMILY.map((f) => (
              <WordCard
                key={f.id}
                word={f}
                isSaved={savedItems.includes(f.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        </section>
      )}

      {/* ==================== EVERYDAY VOCABULARY SECTION ==================== */}
      {activeTab === 'everyday' && (
        <section className="space-y-6">
          <div className="bg-emerald-50/80 p-6 rounded-3xl border border-emerald-100">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
              ದೈನಂದಿನ ಪದಗಳು (Everyday Vocabulary)
            </h2>
            <p className="text-sm text-gray-600">Home, Food, Body parts, Places, Time & Common Actions.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {KANNADA_EVERYDAY_WORDS.map((e) => (
              <WordCard
                key={e.id}
                word={e}
                isSaved={savedItems.includes(e.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        </section>
      )}

      {/* ==================== CONVERSATIONS SECTION ==================== */}
      {activeTab === 'conversations' && (
        <section className="space-y-6">
          <div className="bg-emerald-50/80 p-6 rounded-3xl border border-emerald-100">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-white border border-emerald-200 px-3 py-1 rounded-full">
              Level 5 — Speaking Confidence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-2">
              ಕನ್ನಡ ಸಂಭಾಷಣೆ (Simple Daily Conversations)
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Family, Friends, Teacher, Neighbour, Market, Food Delivery, Travel & Directions.
            </p>
          </div>

          <div className="space-y-6">
            {KANNADA_CONVERSATIONS.map((conv) => (
              <ConversationCard key={conv.id} conversation={conv} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
