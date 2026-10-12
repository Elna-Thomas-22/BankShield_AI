import React, { useState } from 'react';
import { GUNITHAKSHARA_DATA } from '../../data/gunithakshara';
import { AudioButton } from '../common/AudioButton';
import { Sparkles, PenTool } from 'lucide-react';

interface GunithaksharaGridProps {
  onPracticeWriting?: (character: string, transliteration: string) => void;
}

export const GunithaksharaGrid: React.FC<GunithaksharaGridProps> = ({
  onPracticeWriting
}) => {
  const [selectedConsonant, setSelectedConsonant] = useState('ಕ');

  const currentItem =
    GUNITHAKSHARA_DATA.find((g) => g.consonant === selectedConsonant) ||
    GUNITHAKSHARA_DATA[0];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100">
      
      {/* Header & Consonant Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
              Gunithakshara Table
            </h2>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            <strong>Gunithakshara = Consonant + Vowel combinations</strong>. Select a consonant below:
          </p>
        </div>

        {/* Consonant Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {GUNITHAKSHARA_DATA.map((item) => (
            <button
              key={item.consonant}
              onClick={() => setSelectedConsonant(item.consonant)}
              className={`px-3.5 py-2 rounded-2xl font-bold text-lg transition-all cursor-pointer ${
                selectedConsonant === item.consonant
                  ? 'bg-emerald-600 text-white shadow-md scale-105'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/60'
              }`}
            >
              <span className="kannada-text">{item.consonant}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Consonant Banner */}
      <div className="bg-gradient-to-r from-emerald-700 to-green-800 text-white rounded-2xl p-4 sm:p-6 mb-6 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-200">
            Selected Consonant
          </span>
          <h3 className="kannada-text text-4xl sm:text-5xl font-extrabold mt-1">
            {currentItem.consonant} <span className="text-2xl font-normal text-amber-300">({currentItem.consonantName})</span>
          </h3>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-sm font-semibold text-emerald-100 block">
            Full 15 Vowel Combinations
          </span>
          <span className="text-xs text-emerald-200">
            Click any card to hear pronunciation
          </span>
        </div>
      </div>

      {/* Grid of 15 Combinations */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
        {currentItem.combinations.map((comb, index) => (
          <div
            key={index}
            className="bg-emerald-50/40 hover:bg-emerald-100/60 border border-emerald-100 rounded-2xl p-4 text-center transition-all hover:shadow-xs group flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold uppercase text-emerald-700 bg-white border border-emerald-200 px-2 py-0.5 rounded-full inline-block mb-2">
                + {comb.vowel}
              </span>
              <h4 className="kannada-text text-4xl font-extrabold text-emerald-950 mb-1 group-hover:scale-110 transition-transform">
                {comb.combined}
              </h4>
              <p className="text-xs font-bold text-amber-800">
                {comb.transliteration}
              </p>
            </div>

            <div className="mt-4 pt-2 border-t border-emerald-100 flex items-center justify-center gap-1.5">
              <AudioButton
                id={`gunk_${currentItem.consonant}_${comb.combined}`}
                textToSpeak={comb.combined}
                label=""
                size="sm"
                variant="ghost"
              />
              {onPracticeWriting && (
                <button
                  type="button"
                  onClick={() => onPracticeWriting(comb.combined, comb.transliteration)}
                  title="Practice Writing"
                  className="p-1 text-emerald-700 hover:bg-emerald-200/60 rounded-lg transition-colors cursor-pointer"
                >
                  <PenTool className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
