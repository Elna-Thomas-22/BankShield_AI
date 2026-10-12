import type { NumberItem } from '../types';

export const KANNADA_NUMBERS: NumberItem[] = [
  { id: 'num_0', number: 0, kannadaNumeral: '೦', kannadaWord: 'ಶೂನ್ಯ', transliteration: 'Shoonya', englishWord: 'Zero' },
  { id: 'num_1', number: 1, kannadaNumeral: '೧', kannadaWord: 'ಒಂದು', transliteration: 'Ondu', englishWord: 'One' },
  { id: 'num_2', number: 2, kannadaNumeral: '೨', kannadaWord: 'ಎರಡು', transliteration: 'Eradu', englishWord: 'Two' },
  { id: 'num_3', number: 3, kannadaNumeral: '೩', kannadaWord: 'ಮೂರು', transliteration: 'Mooru', englishWord: 'Three' },
  { id: 'num_4', number: 4, kannadaNumeral: '೪', kannadaWord: 'ನಾಲ್ಕು', transliteration: 'Naalku', englishWord: 'Four' },
  { id: 'num_5', number: 5, kannadaNumeral: '೫', kannadaWord: 'ಐದು', transliteration: 'Aidu', englishWord: 'Five' },
  { id: 'num_6', number: 6, kannadaNumeral: '೬', kannadaWord: 'ಆರು', transliteration: 'Aaru', englishWord: 'Six' },
  { id: 'num_7', number: 7, kannadaNumeral: '೭', kannadaWord: 'ಏಳು', transliteration: 'Eelu', englishWord: 'Seven' },
  { id: 'num_8', number: 8, kannadaNumeral: '೮', kannadaWord: 'ಎಂಟು', transliteration: 'Emtu', englishWord: 'Eight' },
  { id: 'num_9', number: 9, kannadaNumeral: '೯', kannadaWord: 'ಒಂಬತ್ತು', transliteration: 'Ombattu', englishWord: 'Nine' },
  { id: 'num_10', number: 10, kannadaNumeral: '೧೦', kannadaWord: 'ಹತ್ತು', transliteration: 'Hattu', englishWord: 'Ten' },

  // 11 to 20
  { id: 'num_11', number: 11, kannadaNumeral: '೧೧', kannadaWord: 'ಹನ್ನೊಂದು', transliteration: 'Hannondu', englishWord: 'Eleven' },
  { id: 'num_12', number: 12, kannadaNumeral: '೧೨', kannadaWord: 'ಹನ್ನೆರಡು', transliteration: 'Hanneradu', englishWord: 'Twelve' },
  { id: 'num_13', number: 13, kannadaNumeral: '೧೩', kannadaWord: 'ಹದಿಮೂರು', transliteration: 'Hadimooru', englishWord: 'Thirteen' },
  { id: 'num_14', number: 14, kannadaNumeral: '೧೪', kannadaWord: 'ಹದಿನಾಲ್ಕು', transliteration: 'Hadinaalku', englishWord: 'Fourteen' },
  { id: 'num_15', number: 15, kannadaNumeral: '೧೫', kannadaWord: 'ಹದಿನೈದು', transliteration: 'Hadinaidu', englishWord: 'Fifteen' },
  { id: 'num_16', number: 16, kannadaNumeral: '೧೬', kannadaWord: 'ಹದಿನಾರು', transliteration: 'Hadinaaru', englishWord: 'Sixteen' },
  { id: 'num_17', number: 17, kannadaNumeral: '೧೭', kannadaWord: 'ಹದಿನೇಳು', transliteration: 'Hadineelu', englishWord: 'Seventeen' },
  { id: 'num_18', number: 18, kannadaNumeral: '೧೮', kannadaWord: 'ಹದಿನೆಂಟು', transliteration: 'Hadinemtu', englishWord: 'Eighteen' },
  { id: 'num_19', number: 19, kannadaNumeral: '೧೯', kannadaWord: 'ಹತ್ತೊಂಬತ್ತು', transliteration: 'Hattombattu', englishWord: 'Nineteen' },
  { id: 'num_20', number: 20, kannadaNumeral: '೨೦', kannadaWord: 'ಇಪ್ಪತ್ತು', transliteration: 'Ippattu', englishWord: 'Twenty' },

  // Key Tens up to 100
  { id: 'num_30', number: 30, kannadaNumeral: '೩೦', kannadaWord: 'ಮೂವತ್ತು', transliteration: 'Moovattu', englishWord: 'Thirty' },
  { id: 'num_40', number: 40, kannadaNumeral: '೪೦', kannadaWord: 'ನಲವತ್ತು', transliteration: 'Nalavattu', englishWord: 'Forty' },
  { id: 'num_50', number: 50, kannadaNumeral: '೫೦', kannadaWord: 'ಐವತ್ತು', transliteration: 'Aivattu', englishWord: 'Fifty' },
  { id: 'num_60', number: 60, kannadaNumeral: '೬೦', kannadaWord: 'ಅರವತ್ತು', transliteration: 'Aravattu', englishWord: 'Sixty' },
  { id: 'num_70', number: 70, kannadaNumeral: '೭೦', kannadaWord: 'ಎಪ್ಪತ್ತು', transliteration: 'Eppattu', englishWord: 'Seventy' },
  { id: 'num_80', number: 80, kannadaNumeral: '೮೦', kannadaWord: 'ಎಂಬತ್ತು', transliteration: 'Embattu', englishWord: 'Eighty' },
  { id: 'num_90', number: 90, kannadaNumeral: '೯೦', kannadaWord: 'ತೊಂಬತ್ತು', transliteration: 'Tombattu', englishWord: 'Ninety' },
  { id: 'num_100', number: 100, kannadaNumeral: '೧೦೦', kannadaWord: 'ನೂರು', transliteration: 'Nooru', englishWord: 'One Hundred' },
  { id: 'num_500', number: 500, kannadaNumeral: '೫೦೦', kannadaWord: 'ಐನೂರು', transliteration: 'Ainooru', englishWord: 'Five Hundred' },
  { id: 'num_1000', number: 1000, kannadaNumeral: '೧೦೦೦', kannadaWord: 'ಸಾಹಸ್ರ / ಸಾವಿರ', transliteration: 'Saavira', englishWord: 'One Thousand' }
];
