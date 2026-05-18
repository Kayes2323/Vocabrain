// Vocabulary data for Vocabrain
export interface VocabWord {
  word: string;
  meaning: string;
  topic: string;
  example?: string;
}

export interface Lesson {
  lessonId: number;
  topic: string;
  words: VocabWord[];
}

// Complete vocabulary organized by lessons/topics
export const VOCABULARY_DATA: Lesson[] = [
  {
    lessonId: 1,
    topic: "Work & Career",
    words: [
      { word: "Enhance", meaning: "বৃদ্ধি করা / উন্নত করা", topic: "Work & Career" },
      { word: "Substantial", meaning: "উল্লেখযোগ্য / বিশাল", topic: "Work & Career" },
      { word: "Productivity", meaning: "কাজের দক্ষতা", topic: "Work & Career" },
      { word: "Drawback", meaning: "অসুবিধা / ত্রুটি", topic: "Work & Career" },
      { word: "Subsidising", meaning: "ভর্তুকি দেওয়া", topic: "Work & Career" },
      { word: "Pursuits", meaning: "লক্ষ্যের পেছনে ছোটা / শখ", topic: "Work & Career" },
      { word: "Increments", meaning: "ধাপে ধাপে বেতন বৃদ্ধি", topic: "Work & Career" },
      { word: "Perks", meaning: "চাকরির বাড়তি সুযোগ-সুবিধা", topic: "Work & Career" },
      { word: "Financial rewards", meaning: "আর্থিক পুরস্কার / প্রণোদনা", topic: "Work & Career" },
      { word: "Incentives", meaning: "উৎসাহ বাড়ানোর সুবিধা", topic: "Work & Career" },
    ],
  },
  {
    lessonId: 2,
    topic: "Education",
    words: [
      { word: "Crucial", meaning: "অত্যন্ত গুরুত্বপূর্ণ", topic: "Education" },
      { word: "Autonomous learning", meaning: "নিজে নিজে শেখা", topic: "Education" },
      { word: "Despite", meaning: "সত্ত্বেও", topic: "Education" },
      { word: "Conventional", meaning: "প্রচলিত / গতানুগতিক", topic: "Education" },
      { word: "Pedagogical", meaning: "শিক্ষাগত / শিক্ষাপদ্ধতি সংক্রান্ত", topic: "Education" },
      { word: "Incorporated", meaning: "অন্তর্ভুক্ত", topic: "Education" },
      { word: "Assessment", meaning: "মূল্যায়ন", topic: "Education" },
      { word: "Coordinate", meaning: "সমন্বয় করা", topic: "Education" },
      { word: "Synthesizing", meaning: "সংশ্লেষণ করা", topic: "Education" },
      { word: "Assimilating", meaning: "আয়ত্ত করা / গ্রহণ করা", topic: "Education" },
    ],
  },
  {
    lessonId: 3,
    topic: "Children & Families",
    words: [
      { word: "Influence", meaning: "প্রভাব খাটানো", topic: "Children & Families" },
      { word: "Foster parents", meaning: "পালক পিতামাতা", topic: "Children & Families" },
      { word: "Exclusively", meaning: "শুধুমাত্র / এককভাবে", topic: "Children & Families" },
      { word: "Absorb", meaning: "শোষণ করা", topic: "Children & Families" },
      { word: "Conventions", meaning: "রীতি-নীতি / প্রচলিত প্রথা", topic: "Children & Families" },
      { word: "Codes of conduct", meaning: "আচরণবিধি", topic: "Children & Families" },
      { word: "Truancy", meaning: "বিনা অনুমতিতে স্কুল না যাওয়া", topic: "Children & Families" },
      { word: "Delinquency", meaning: "কিশোর অপরাধ", topic: "Children & Families" },
      { word: "Victim", meaning: "ভুক্তভোগী", topic: "Children & Families" },
      { word: "Abduction", meaning: "অপহরণ", topic: "Children & Families" },
    ],
  },
  {
    lessonId: 4,
    topic: "Environment",
    words: [
      { word: "Contamination", meaning: "দূষণ", topic: "Environment" },
      { word: "Rectify", meaning: "সংশোধন করা", topic: "Environment" },
      { word: "Biosphere", meaning: "জীবমণ্ডল", topic: "Environment" },
      { word: "Emissions", meaning: "নির্গমন", topic: "Environment" },
      { word: "Pollutant", meaning: "দূষক", topic: "Environment" },
      { word: "Particles", meaning: "কণা", topic: "Environment" },
      { word: "Run-off", meaning: "গড়িয়ে যাওয়া পানি", topic: "Environment" },
      { word: "Aquifers", meaning: "ভূগর্ভস্থ পানিস্তর", topic: "Environment" },
      { word: "Filtration", meaning: "ছাঁকন প্রক্রিয়া", topic: "Environment" },
      { word: "Tainted", meaning: "দূষিত / কলঙ্কিত", topic: "Environment" },
    ],
  },
  {
    lessonId: 5,
    topic: "Culture & Arts",
    words: [
      { word: "Preserving", meaning: "সংরক্ষণ করা", topic: "Culture & Arts" },
      { word: "Admirable", meaning: "প্রশংসনীয়", topic: "Culture & Arts" },
      { word: "Objective", meaning: "লক্ষ্য / নিরপেক্ষ", topic: "Culture & Arts" },
      { word: "Evolves", meaning: "বিকশিত হওয়া", topic: "Culture & Arts" },
      { word: "Rapidly", meaning: "দ্রুতগতিতে", topic: "Culture & Arts" },
      { word: "Rituals", meaning: "ধর্মীয় আচার-অনুষ্ঠান", topic: "Culture & Arts" },
      { word: "Transmitting", meaning: "এক প্রজন্ম থেকে অন্যে দেওয়া", topic: "Culture & Arts" },
      { word: "Mythologies", meaning: "পৌরাণিক কাহিনী", topic: "Culture & Arts" },
      { word: "Evokes", meaning: "স্মৃতি জাগিয়ে তোলা", topic: "Culture & Arts" },
      { word: "Medieval", meaning: "মধ্যযুগীয়", topic: "Culture & Arts" },
    ],
  },
  {
    lessonId: 6,
    topic: "Health & Sport",
    words: [
      { word: "Stem", meaning: "উৎপন্ন হওয়া", topic: "Health & Sport" },
      { word: "Remedies", meaning: "প্রতিকার", topic: "Health & Sport" },
      { word: "Sedentary", meaning: "অলস / নিষ্ক্রিয় জীবনযাত্রা", topic: "Health & Sport" },
      { word: "Incline", meaning: "প্রবণতা থাকা", topic: "Health & Sport" },
      { word: "Obesity", meaning: "স্থূলতা", topic: "Health & Sport" },
      { word: "Inadequate", meaning: "অপর্যাপ্ত", topic: "Health & Sport" },
      { word: "Strain", meaning: "চাপ / টান", topic: "Health & Sport" },
      { word: "Eyesight", meaning: "দৃষ্টিশক্তি", topic: "Health & Sport" },
      { word: "Excessive", meaning: "অতিরিক্ত", topic: "Health & Sport" },
      { word: "Impairment", meaning: "ত্রুটি / বিকলতা", topic: "Health & Sport" },
    ],
  },
];

export const getTotalLessons = (): number => VOCABULARY_DATA.length;
export const getLesson = (lessonId: number): Lesson | undefined => 
  VOCABULARY_DATA.find(lesson => lesson.lessonId === lessonId);
