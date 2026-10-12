import type { ConversationItem } from '../types';

export const KANNADA_CONVERSATIONS: ConversationItem[] = [
  {
    id: 'conv_family',
    category: 'family',
    title: 'Family Conversation',
    titleKannada: 'ಕುಟುಂಬದ ಮಾತುಕತೆ',
    description: 'Everyday dialogue between family members at home.',
    icon: '👨‍👩‍👧',
    lines: [
      {
        id: 'cf_1',
        speaker: 'A (Child)',
        kannada: 'ಅಮ್ಮ, ಊಟ ಆಯಿತಾ?',
        transliteration: 'Amma, oota aayitaa?',
        english: 'Mom, did you eat?'
      },
      {
        id: 'cf_2',
        speaker: 'B (Mother)',
        kannada: 'ಹೌದು, ಆಯಿತು. ನೀನು ಊಟ ಮಾಡಿದ್ಯಾ?',
        transliteration: 'Howdu, aayitu. Neenu oota maadidyaa?',
        english: 'Yes, I did. Did you eat?'
      },
      {
        id: 'cf_3',
        speaker: 'A (Child)',
        kannada: 'ಇಲ್ಲ ಅಮ್ಮ, ಈಗ ತಿನ್ನುತ್ತೇನೆ.',
        transliteration: 'Illa Amma, eega thinnuttene.',
        english: 'No Mom, I will eat now.'
      },
      {
        id: 'cf_4',
        speaker: 'B (Mother)',
        kannada: 'ಬಾ, ಬಿಸಿ ಅನ್ನ ತಗೋ.',
        transliteration: 'Baa, bisi anna tago.',
        english: 'Come, take hot rice.'
      }
    ]
  },
  {
    id: 'conv_friends',
    category: 'friends',
    title: 'Friends Meeting',
    titleKannada: 'ಸ್ನೇಹಿತರ ಭೇಟಿ',
    description: 'Casual greeting between good friends.',
    icon: '🤝',
    lines: [
      {
        id: 'cfr_1',
        speaker: 'Friend A',
        kannada: 'ಹೇಗಿದ್ದೀಯ?',
        transliteration: 'Hegiddiya?',
        english: 'How are you?'
      },
      {
        id: 'cfr_2',
        speaker: 'Friend B',
        kannada: 'ಚೆನ್ನಾಗಿದ್ದೀನಿ! ನೀನು ಹೇಗಿದ್ದೀಯ?',
        transliteration: 'Chennagiddini! Neenu hegiddiya?',
        english: 'I am fine! How are you?'
      },
      {
        id: 'cfr_3',
        speaker: 'Friend A',
        kannada: 'ನಾನೂ ಚೆನ್ನಾಗಿದ್ದೀನಿ. ಇಂದು ಏನು ಪ್ಲಾನ್?',
        transliteration: 'Naanoo chennagiddini. Indu enu plan?',
        english: 'I am also good. What is the plan today?'
      },
      {
        id: 'cfr_4',
        speaker: 'Friend B',
        kannada: 'ಕಾಫಿ ಕುಡಿಯೋಣ ಬಾ!',
        transliteration: 'Coffee kudiyoona baa!',
        english: 'Come, let’s have coffee!'
      }
    ]
  },
  {
    id: 'conv_teacher',
    category: 'teacher',
    title: 'Teacher & Student',
    titleKannada: 'ಗುರು ಮತ್ತು ಶಿಷ್ಯ',
    description: 'Respectful dialogue between student and teacher.',
    icon: '🏫',
    lines: [
      {
        id: 'ct_1',
        speaker: 'Student',
        kannada: 'ನಮಸ್ಕಾರ ಸರ್.',
        transliteration: 'Namaskara sir.',
        english: 'Hello sir.'
      },
      {
        id: 'ct_2',
        speaker: 'Teacher',
        kannada: 'ನಮಸ್ಕಾರ. ಒಳಗೆ ಬಾ.',
        transliteration: 'Namaskara. Olage baa.',
        english: 'Hello. Come inside.'
      },
      {
        id: 'ct_3',
        speaker: 'Student',
        kannada: 'ಸರ್, ನನಗೆ ಈ ಪಾಠ ಅರ್ಥವಾಗಿಲ್ಲ.',
        transliteration: 'Sir, nanage ee paatha arthavaagilla.',
        english: 'Sir, I did not understand this lesson.'
      },
      {
        id: 'ct_4',
        speaker: 'Teacher',
        kannada: 'ತೊಂದರೆಯಿಲ್ಲ, ನಾನು ಮತ್ತೆ ಹೇಳಿಕೊಡುತ್ತೇನೆ.',
        transliteration: 'Tondareyilla, naanu matte helikoduttene.',
        english: 'No problem, I will teach you again.'
      }
    ]
  },
  {
    id: 'conv_neighbour',
    category: 'neighbour',
    title: 'Neighbour Conversation',
    titleKannada: 'ನೆರೆಯವರ ಮಾತುಕತೆ',
    description: 'Polite small talk with a neighbour.',
    icon: '🏡',
    lines: [
      {
        id: 'cn_1',
        speaker: 'Neighbour A',
        kannada: 'ನಮಸ್ಕಾರ, ಹೇಗಿದ್ದೀರಾ?',
        transliteration: 'Namaskara, hegiddira?',
        english: 'Hello, how are you?'
      },
      {
        id: 'cn_2',
        speaker: 'Neighbour B',
        kannada: 'ನಮಸ್ಕಾರ, ನಾವು ಚೆನ್ನಾಗಿದ್ದೀವೆ. ನೀವು ಹೇಗಿದ್ದೀರಾ?',
        transliteration: 'Namaskara, naavu chennagiddive. Neavu hegiddira?',
        english: 'Hello, we are fine. How are you?'
      },
      {
        id: 'cn_3',
        speaker: 'Neighbour A',
        kannada: 'ಮನೆಯಲ್ಲಿ ಎಲ್ಲರೂ ಸೌಖ್ಯವೇ?',
        transliteration: 'Maneyalli ellaroo saukhyave?',
        english: 'Is everyone well at home?'
      },
      {
        id: 'cn_4',
        speaker: 'Neighbour B',
        kannada: 'ಹೌದು, ಎಲ್ಲರೂ ಕ್ಷೇಮವಾಗಿದ್ದಾರೆ.',
        transliteration: 'Howdu, ellaroo ksemavaagiddaare.',
        english: 'Yes, everyone is doing well.'
      }
    ]
  },
  {
    id: 'conv_market',
    category: 'market',
    title: 'At the Market',
    titleKannada: 'ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ',
    description: 'Buying vegetables or goods from a vendor.',
    icon: '🛒',
    lines: [
      {
        id: 'cm_1',
        speaker: 'Customer',
        kannada: 'ಅಣ್ಣಾ, ನನಗೆ ಒಂದು ಕಿಲೋ ಟೊಮೇಟೊ ಬೇಕು.',
        transliteration: 'Anna, nanage ondu kilo tomato beku.',
        english: 'Brother, I need one kilogram of tomatoes.'
      },
      {
        id: 'cm_2',
        speaker: 'Vendor',
        kannada: 'ಸರಿ ಸ್ವಾಮಿ, ತಾಜಾ ಟೊಮೇಟೊ ಇದೆ.',
        transliteration: 'Sari swaami, taajaa tomato ide.',
        english: 'Sure sir, fresh tomatoes are available.'
      },
      {
        id: 'cm_3',
        speaker: 'Customer',
        kannada: 'ಎಷ್ಟು?',
        transliteration: 'Eshtu?',
        english: 'How much is it?'
      },
      {
        id: 'cm_4',
        speaker: 'Vendor',
        kannada: 'ಒಂದು ಕಿಲೋ ಮೂವತ್ತು ರೂಪಾಯಿ.',
        transliteration: 'Ondu kilo moovattu roopaayi.',
        english: '30 rupees per kilogram.'
      }
    ]
  },
  {
    id: 'conv_delivery',
    category: 'delivery',
    title: 'Food Delivery',
    titleKannada: 'ಆಹಾರ ವಿತರಣೆ',
    description: 'Talking to a food delivery partner.',
    icon: '🛵',
    lines: [
      {
        id: 'cd_1',
        speaker: 'Customer',
        kannada: 'ಹಲೋ, ನನ್ನ ಆರ್ಡರ್ ಎಲ್ಲಿದೆ?',
        transliteration: 'Hello, nanna order ellide?',
        english: 'Hello, where is my order?'
      },
      {
        id: 'cd_2',
        speaker: 'Delivery Driver',
        kannada: 'ಸಾರ್, ನಾನು ನಿಮ್ಮ ಗೇಟ್ ಹತ್ತಿರ ಇದ್ದೇನೆ.',
        transliteration: 'Sir, naanu nimma gate hattira iddene.',
        english: 'Sir, I am near your gate.'
      },
      {
        id: 'cd_3',
        speaker: 'Customer',
        kannada: 'ಸರಿ, ನಾನು ಕೆಳಗೆ ಬರುತ್ತೇನೆ.',
        transliteration: 'Sari, naanu kelage buruttene.',
        english: 'Okay, I will come downstairs.'
      }
    ]
  },
  {
    id: 'conv_travel',
    category: 'travel',
    title: 'Travel & Bus',
    titleKannada: 'ಪ್ರಯಾಣ ಮತ್ತು ಬಸ್',
    description: 'Asking about bus route and station.',
    icon: '🚌',
    lines: [
      {
        id: 'ctrav_1',
        speaker: 'Passenger',
        kannada: 'ಕ್ಷಮಿಸಿ, ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?',
        transliteration: 'Kshamisi, bus nildaana ellide?',
        english: 'Excuse me, where is the bus stop?'
      },
      {
        id: 'ctrav_2',
        speaker: 'Local Person',
        kannada: 'ಮುಂದೆ ಹೋಗಿ, ಎಡಕ್ಕೆ ತಿರುಗಿ.',
        transliteration: 'Munde hogi, edakke tirugi.',
        english: 'Go straight, then turn left.'
      },
      {
        id: 'ctrav_3',
        speaker: 'Passenger',
        kannada: 'ಮೆಜೆಸ್ಟಿಕ್‌ಗೆ ಬಸ್ ಸಿಗುತ್ತಾ?',
        transliteration: 'Majestic ge bus sigutthaa?',
        english: 'Will I get a bus to Majestic?'
      },
      {
        id: 'ctrav_4',
        speaker: 'Local Person',
        kannada: 'ಹೌದು, ಪ್ರತಿಯೊಂದು ಐದು ನಿಮಿಷಕ್ಕೆ ಬಸ್ ಇದೆ.',
        transliteration: 'Howdu, pratiyondu aidu nimishakke bus ide.',
        english: 'Yes, there is a bus every 5 minutes.'
      }
    ]
  },
  {
    id: 'conv_directions',
    category: 'directions',
    title: 'Asking Directions',
    titleKannada: 'ದಾರಿ ಕೇಳುವುದು',
    description: 'Navigating through the city.',
    icon: '📍',
    lines: [
      {
        id: 'cdir_1',
        speaker: 'Traveler',
        kannada: 'ರೈಲು ನಿಲ್ದಾಣ ಹೇಗೆ ಹೋಗಬೇಕು?',
        transliteration: 'Railu nildaana hege hogabeku?',
        english: 'How do I go to the railway station?'
      },
      {
        id: 'cdir_2',
        speaker: 'Bystander',
        kannada: 'ನೇರವಾಗಿ ಹೋಗಿ, ಸಿಗ್ನಲ್ ಹತ್ತಿರ ಬಲಕ್ಕೆ ತಿರುಗಿ.',
        transliteration: 'Neeravaagi hogi, signal hattira balakke tirugi.',
        english: 'Go straight and turn right at the traffic signal.'
      },
      {
        id: 'cdir_3',
        speaker: 'Traveler',
        kannada: 'ತುಂಬಾ ದೂರವಿದೆಯಾ?',
        transliteration: 'Thumba dooravidheyaa?',
        english: 'Is it very far?'
      },
      {
        id: 'cdir_4',
        speaker: 'Bystander',
        kannada: 'ಇಲ್ಲ, ಕೇವಲ ಹತ್ತು ನಿಮಿಷದ ದಾರಿ.',
        transliteration: 'Illa, kevala hattu nimishada daari.',
        english: 'No, just a 10-minute walk.'
      }
    ]
  },
  {
    id: 'conv_introductions',
    category: 'introductions',
    title: 'Basic Introductions',
    titleKannada: 'ಸ್ವಯಂ ಪರಿಚಯ',
    description: 'Introducing yourself in Kannada.',
    icon: '🙋‍♂️',
    lines: [
      {
        id: 'cintro_1',
        speaker: 'Person A',
        kannada: 'ನಮಸ್ಕಾರ! ನಿಮ್ಮ ಹೆಸರೇನು?',
        transliteration: 'Namaskara! Nimma hesarenu?',
        english: 'Hello! What is your name?'
      },
      {
        id: 'cintro_2',
        speaker: 'Person B',
        kannada: 'ನಮಸ್ಕಾರ, ನನ್ನ ಹೆಸರು ರಾಹುಲ್.',
        transliteration: 'Namaskara, nanna hesaru Rahul.',
        english: 'Hello, my name is Rahul.'
      },
      {
        id: 'cintro_3',
        speaker: 'Person A',
        kannada: 'ನೀವು ಎಲ್ಲಿಂದ ಬಂದಿದ್ದೀರಿ?',
        transliteration: 'Neavu ellinda bandiddiri?',
        english: 'Where are you from?'
      },
      {
        id: 'cintro_4',
        speaker: 'Person B',
        kannada: 'ನಾನು ಬೆಂಗಳೂರಿನಿಂದ ಬಂದಿದ್ದೇನೆ. ನಾನು ಕನ್ನಡ ಕಲಿಯುತ್ತಿದ್ದೇನೆ!',
        transliteration: 'Naanu Bengaluru ninnda bandiddene. Naanu Kannada kaliyuttiddene!',
        english: 'I am from Bengaluru. I am learning Kannada!'
      }
    ]
  },
  {
    id: 'conv_cab',
    category: 'travel',
    title: 'Auto / Cab Ride',
    titleKannada: 'ಆಟೋ ಪ್ರಯಾಣ',
    description: 'Hailing an auto rickshaw.',
    icon: '🛺',
    lines: [
      {
        id: 'ccab_1',
        speaker: 'Passenger',
        kannada: 'ಆಟೋ! ಎಂ.ಜಿ. ರೋಡ್‌ಗೆ ಬರುತ್ತೀರಾ?',
        transliteration: 'Auto! M.G. Road ge barutteera?',
        english: 'Auto! Will you come to MG Road?'
      },
      {
        id: 'ccab_2',
        speaker: 'Auto Driver',
        kannada: 'ಬರುತ್ತೇನೆ ಸ್ವಾಮಿ, ಬನ್ನಿ.',
        transliteration: 'Baruttene swaami, banni.',
        english: 'Yes sir, come in.'
      },
      {
        id: 'ccab_3',
        speaker: 'Passenger',
        kannada: 'ಮೀಟರ್ ಹಾಕ್ತಿರಾ?',
        transliteration: 'Meter haaktira?',
        english: 'Will you put the meter?'
      },
      {
        id: 'ccab_4',
        speaker: 'Auto Driver',
        kannada: 'ಹೌದು, ಮೀಟರ್ ಪ್ರಕಾರವೇ.',
        transliteration: 'Howdu, meter prakaarave.',
        english: 'Yes, according to the meter only.'
      }
    ]
  }
];
