import type { GunithaksharaItem } from '../types';

export const VOWEL_SIGNS = [
  { vowel: 'ಅ', sign: '', transliteration: 'a', sound: 'ka' },
  { vowel: 'ಆ', sign: 'ಾ', transliteration: 'aa', sound: 'kaa' },
  { vowel: 'ಇ', sign: 'ಿ', transliteration: 'i', sound: 'ki' },
  { vowel: 'ಈ', sign: 'ೀ', transliteration: 'ee', sound: 'kee' },
  { vowel: 'ಉ', sign: 'ು', transliteration: 'u', sound: 'ku' },
  { vowel: 'ಊ', sign: 'ೂ', transliteration: 'oo', sound: 'koo' },
  { vowel: 'ಋ', sign: 'ೃ', transliteration: 'ru', sound: 'kru' },
  { vowel: 'ಎ', sign: 'ೆ', transliteration: 'e', sound: 'ke' },
  { vowel: 'ಏ', sign: 'ೇ', transliteration: 'ee', sound: 'kae' },
  { vowel: 'ಐ', sign: 'ೈ', transliteration: 'ai', sound: 'kai' },
  { vowel: 'ಒ', sign: 'ೊ', transliteration: 'o', sound: 'ko' },
  { vowel: 'ಓ', sign: 'ೋ', transliteration: 'oo', sound: 'koh' },
  { vowel: 'ಔ', sign: 'ೌ', transliteration: 'au', sound: 'kau' },
  { vowel: 'ಅಂ', sign: 'ಂ', transliteration: 'am', sound: 'kam' },
  { vowel: 'ಅಃ', sign: 'ಃ', transliteration: 'aha', sound: 'kah' }
];

const BASE_CONSONANTS = [
  { char: 'ಕ', name: 'Ka', prefix: 'k' },
  { char: 'ಖ', name: 'Kha', prefix: 'kh' },
  { char: 'ಗ', name: 'Ga', prefix: 'g' },
  { char: 'ಘ', name: 'Gha', prefix: 'gh' },
  { char: 'ಚ', name: 'Cha', prefix: 'ch' },
  { char: 'ಛ', name: 'Chha', prefix: 'chh' },
  { char: 'ಜ', name: 'Ja', prefix: 'j' },
  { char: 'ಝ', name: 'Jha', prefix: 'jh' },
  { char: 'ಟ', name: 'Ta', prefix: 't' },
  { char: 'ಡ', name: 'Da', prefix: 'd' },
  { char: 'ತ', name: 'Tha', prefix: 'th' },
  { char: 'ದ', name: 'Da (soft)', prefix: 'd' },
  { char: 'ನ', name: 'Na', prefix: 'n' },
  { char: 'ಪ', name: 'Pa', prefix: 'p' },
  { char: 'ಫ', name: 'Pha', prefix: 'ph' },
  { char: 'ಬ', name: 'Ba', prefix: 'b' },
  { char: 'ಭ', name: 'Bha', prefix: 'bh' },
  { char: 'ಮ', name: 'Ma', prefix: 'm' },
  { char: 'ಯ', name: 'Ya', prefix: 'y' },
  { char: 'ರ', name: 'Ra', prefix: 'r' },
  { char: 'ಲ', name: 'La', prefix: 'l' },
  { char: 'ವ', name: 'Va', prefix: 'v' },
  { char: 'ಸ', name: 'Sa', prefix: 's' },
  { char: 'ಹ', name: 'Ha', prefix: 'h' },
  { char: 'ಳ', name: 'Lla', prefix: 'll' }
];

// Map of explicit overrides for accurate font representation in Kannada script
const GUNITHAKSHARA_OVERRIDES: Record<string, Record<string, string>> = {
  'ಕ': {
    'ಅ': 'ಕ', 'ಆ': 'ಕಾ', 'ಇ': 'ಕಿ', 'ಈ': 'ಕೀ', 'ಉ': 'ಕು', 'ಊ': 'ಕೂ', 'ಋ': 'ಕೃ',
    'ಎ': 'ಕೆ', 'ಏ': 'ಕೇ', 'ಐ': 'ಕೈ', 'ಒ': 'ಕೊ', 'ಓ': 'ಕೋ', 'ಔ': 'ಕೌ', 'ಅಂ': 'ಕಂ', 'ಅಃ': 'ಕಃ'
  },
  'ಗ': {
    'ಅ': 'ಗ', 'ಆ': 'ಗಾ', 'ಇ': 'ಗಿ', 'ಈ': 'ಗೀ', 'ಉ': 'ಗು', 'ಊ': 'ಗೂ', 'ಋ': 'ಗೃ',
    'ಎ': 'ಗೆ', 'ಏ': 'ಗೇ', 'ಐ': 'ಗೈ', 'ಒ': 'ಗೊ', 'ಓ': 'ಗೋ', 'ಔ': 'ಗೌ', 'ಅಂ': 'ಗಂ', 'ಅಃ': 'ಗಃ'
  },
  'ಮ': {
    'ಅ': 'ಮ', 'ಆ': 'ಮಾ', 'ಇ': 'ಮಿ', 'ಈ': 'ಮೀ', 'ಉ': 'ಮು', 'ಊ': 'ಮೂ', 'ಋ': 'ಮೃ',
    'ಎ': 'ಮೆ', 'ಏ': 'ಮೇ', 'ಐ': 'ಮೈ', 'ಒ': 'ಮೊ', 'ಓ': 'ಮೋ', 'ಔ': 'ಮೌ', 'ಅಂ': 'ಮಂ', 'ಅಃ': 'ಮಃ'
  },
  'ರ': {
    'ಅ': 'ರ', 'ಆ': 'ರಾ', 'ಇ': 'ರಿ', 'ಈ': 'ರೀ', 'ಉ': 'ರು', 'ಊ': 'ರೂ', 'ಋ': 'ರೃ',
    'ಎ': 'ರೆ', 'ಏ': 'ರೇ', 'ಐ': 'ರೈ', 'ಒ': 'ರೊ', 'ಓ': 'ರೋ', 'ಔ': 'ರೌ', 'ಅಂ': 'ರಂ', 'ಅಃ': 'ರಃ'
  }
};

export const GUNITHAKSHARA_DATA: GunithaksharaItem[] = BASE_CONSONANTS.map((c) => {
  const combinations = VOWEL_SIGNS.map((v) => {
    let combined = '';
    if (GUNITHAKSHARA_OVERRIDES[c.char] && GUNITHAKSHARA_OVERRIDES[c.char][v.vowel]) {
      combined = GUNITHAKSHARA_OVERRIDES[c.char][v.vowel];
    } else {
      combined = v.vowel === 'ಅ' ? c.char : `${c.char}${v.sign}`;
    }

    const transliteration = `${c.prefix}${v.transliteration}`;
    return {
      vowel: v.vowel,
      vowelSign: v.sign,
      combined,
      transliteration,
      pronunciation: `${c.name} + ${v.vowel} sound (${transliteration})`
    };
  });

  return {
    consonant: c.char,
    consonantName: c.name,
    combinations
  };
});
