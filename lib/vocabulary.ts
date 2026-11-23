// Vocabulary data for Mino
export interface VocabWord {
  word: string;
  meaning: string;
  topic: string;
  example?: string;
  /** Extra, curated exact-answer variants (an English paraphrase, a reliable
   * Romanized Bangla spelling of the meaning), accepted instantly alongside the
   * canonical Bangla meaning. AI-authored with care; not independently human-reviewed. */
  acceptedAnswers?: string[];
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
      { word: "Enhance", meaning: "বৃদ্ধি করা / উন্নত করা", topic: "Work & Career", acceptedAnswers: ['to increase or improve something', 'britti kora', 'unnoto kora'] },
      { word: "Substantial", meaning: "উল্লেখযোগ্য / বিশাল", topic: "Work & Career", acceptedAnswers: ['large enough to be important', 'ullekhjogyo', 'bishal'] },
      { word: "Productivity", meaning: "কাজের দক্ষতা", topic: "Work & Career", acceptedAnswers: ['how efficiently work gets done', 'kajer dokkhota'] },
      { word: "Drawback", meaning: "অসুবিধা / ত্রুটি", topic: "Work & Career", acceptedAnswers: ['a disadvantage or negative point', 'oshubidha', 'truti'] },
      { word: "Subsidising", meaning: "ভর্তুকি দেওয়া", topic: "Work & Career", acceptedAnswers: ['paying part of the cost to make it cheaper', 'vorturki deoya'] },
      { word: "Pursuits", meaning: "লক্ষ্যের পেছনে ছোটা / শখ", topic: "Work & Career", acceptedAnswers: ['activities you spend your time on, like hobbies', 'shokh'] },
      { word: "Increments", meaning: "ধাপে ধাপে বেতন বৃদ্ধি", topic: "Work & Career", acceptedAnswers: ['small regular increases in salary', 'dhape dhape beton briddhi'] },
      { word: "Perks", meaning: "চাকরির বাড়তি সুযোগ-সুবিধা", topic: "Work & Career", acceptedAnswers: ['extra benefits that come with a job', 'chakrir bartir shujog shubidha'] },
      { word: "Financial rewards", meaning: "আর্থিক পুরস্কার / প্রণোদনা", topic: "Work & Career", acceptedAnswers: ['money given as a reward', 'arthik puroshkar'] },
      { word: "Incentives", meaning: "উৎসাহ বাড়ানোর সুবিধা", topic: "Work & Career", acceptedAnswers: ['something offered to encourage people to do more', 'utshaho barhanor shubidha'] },
    ],
  },
  {
    lessonId: 2,
    topic: "Education",
    words: [
      { word: "Crucial", meaning: "অত্যন্ত গুরুত্বপূর্ণ", topic: "Education", acceptedAnswers: ['extremely important', 'ottonto gurutupurno'] },
      { word: "Autonomous learning", meaning: "নিজে নিজে শেখা", topic: "Education", acceptedAnswers: ['learning by yourself, without being taught directly', 'nije nije shekha'] },
      { word: "Despite", meaning: "সত্ত্বেও", topic: "Education", acceptedAnswers: ['even though; in spite of', 'sotteo'] },
      { word: "Conventional", meaning: "প্রচলিত / গতানুগতিক", topic: "Education", acceptedAnswers: ['traditional or usual', 'procholito'] },
      { word: "Pedagogical", meaning: "শিক্ষাগত / শিক্ষাপদ্ধতি সংক্রান্ত", topic: "Education", acceptedAnswers: ['relating to teaching methods', 'shikkhagoto'] },
      { word: "Incorporated", meaning: "অন্তর্ভুক্ত", topic: "Education", acceptedAnswers: ['included as part of something', 'ontorvukto'] },
      { word: "Assessment", meaning: "মূল্যায়ন", topic: "Education", acceptedAnswers: ['the process of judging someone\'s ability or work', 'mullayon'] },
      { word: "Coordinate", meaning: "সমন্বয় করা", topic: "Education", acceptedAnswers: ['to organize different parts to work together', 'shomonnoy kora'] },
      { word: "Synthesizing", meaning: "সংশ্লেষণ করা", topic: "Education", acceptedAnswers: ['combining different ideas into one', 'shongsleshon kora'] },
      { word: "Assimilating", meaning: "আয়ত্ত করা / গ্রহণ করা", topic: "Education", acceptedAnswers: ['fully understanding and absorbing new information', 'ayotto kora'] },
    ],
  },
  {
    lessonId: 3,
    topic: "Children & Families",
    words: [
      { word: "Influence", meaning: "প্রভাব খাটানো", topic: "Children & Families", acceptedAnswers: ['to affect how someone thinks or acts', 'probhab khatano'] },
      { word: "Foster parents", meaning: "পালক পিতামাতা", topic: "Children & Families", acceptedAnswers: ['parents who raise a child that is not biologically theirs', 'palok pitamata'] },
      { word: "Exclusively", meaning: "শুধুমাত্র / এককভাবে", topic: "Children & Families", acceptedAnswers: ['only, and nothing else', 'shudhumatro'] },
      { word: "Absorb", meaning: "শোষণ করা", topic: "Children & Families", acceptedAnswers: ['to take something in fully', 'shoshon kora'] },
      { word: "Conventions", meaning: "রীতি-নীতি / প্রচলিত প্রথা", topic: "Children & Families", acceptedAnswers: ['accepted ways of behaving in society', 'riti niti'] },
      { word: "Codes of conduct", meaning: "আচরণবিধি", topic: "Children & Families", acceptedAnswers: ['official rules about how to behave', 'acharonbidhi'] },
      { word: "Truancy", meaning: "বিনা অনুমতিতে স্কুল না যাওয়া", topic: "Children & Families", acceptedAnswers: ['staying away from school without permission', 'bina onumotite school na jaoya'] },
      { word: "Delinquency", meaning: "কিশোর অপরাধ", topic: "Children & Families", acceptedAnswers: ['crime committed by young people', 'kishore oporadh'] },
      { word: "Victim", meaning: "ভুক্তভোগী", topic: "Children & Families", acceptedAnswers: ['a person harmed by an event or crime', 'vuktovogi'] },
      { word: "Abduction", meaning: "অপহরণ", topic: "Children & Families", acceptedAnswers: ['the crime of taking someone away by force', 'opohoron'] },
    ],
  },
  {
    lessonId: 4,
    topic: "Environment",
    words: [
      { word: "Contamination", meaning: "দূষণ", topic: "Environment", acceptedAnswers: ['the process of making something dirty or impure', 'dushon'] },
      { word: "Rectify", meaning: "সংশোধন করা", topic: "Environment", acceptedAnswers: ['to fix or correct a mistake', 'shongshodhon kora'] },
      { word: "Biosphere", meaning: "জীবমণ্ডল", topic: "Environment", acceptedAnswers: ['the part of Earth where living things exist', 'jibomondol'] },
      { word: "Emissions", meaning: "নির্গমন", topic: "Environment", acceptedAnswers: ['gases or substances released into the air', 'nirgomon'] },
      { word: "Pollutant", meaning: "দূষক", topic: "Environment", acceptedAnswers: ['a substance that causes pollution', 'dushok'] },
      { word: "Particles", meaning: "কণা", topic: "Environment", acceptedAnswers: ['very small pieces of matter', 'kona'] },
      { word: "Run-off", meaning: "গড়িয়ে যাওয়া পানি", topic: "Environment", acceptedAnswers: ['water that flows off the land after rain', 'gariye jaoya pani'] },
      { word: "Aquifers", meaning: "ভূগর্ভস্থ পানিস্তর", topic: "Environment", acceptedAnswers: ['underground layers of water-bearing rock', 'vugorbosto pani stor'] },
      { word: "Filtration", meaning: "ছাঁকন প্রক্রিয়া", topic: "Environment", acceptedAnswers: ['the process of removing impurities by passing through a filter', 'chakon prokriya'] },
      { word: "Tainted", meaning: "দূষিত / কলঙ্কিত", topic: "Environment", acceptedAnswers: ['made impure or spoiled', 'dushito'] },
    ],
  },
  {
    lessonId: 5,
    topic: "Culture & Arts",
    words: [
      { word: "Preserving", meaning: "সংরক্ষণ করা", topic: "Culture & Arts", acceptedAnswers: ['keeping something safe from damage or change', 'shongrokkhon kora'] },
      { word: "Admirable", meaning: "প্রশংসনীয়", topic: "Culture & Arts", acceptedAnswers: ['deserving respect or approval', 'proshongsonio'] },
      { word: "Objective", meaning: "লক্ষ্য / নিরপেক্ষ", topic: "Culture & Arts", acceptedAnswers: ['a goal; or not influenced by personal feelings', 'lokkho'] },
      { word: "Evolves", meaning: "বিকশিত হওয়া", topic: "Culture & Arts", acceptedAnswers: ['develops gradually over time', 'bikoshito hoya'] },
      { word: "Rapidly", meaning: "দ্রুতগতিতে", topic: "Culture & Arts", acceptedAnswers: ['very quickly', 'drutogotite'] },
      { word: "Rituals", meaning: "ধর্মীয় আচার-অনুষ্ঠান", topic: "Culture & Arts", acceptedAnswers: ['traditional ceremonies, often religious', 'dhormiyo achar anushthan'] },
      { word: "Transmitting", meaning: "এক প্রজন্ম থেকে অন্যে দেওয়া", topic: "Culture & Arts", acceptedAnswers: ['passing something from one generation to the next', 'ek projonmo theke onne deoya'] },
      { word: "Mythologies", meaning: "পৌরাণিক কাহিনী", topic: "Culture & Arts", acceptedAnswers: ['traditional stories about gods and heroes', 'pouranik kahini'] },
      { word: "Evokes", meaning: "স্মৃতি জাগিয়ে তোলা", topic: "Culture & Arts", acceptedAnswers: ['brings a feeling or memory to mind', 'sriti jagiye tola'] },
      { word: "Medieval", meaning: "মধ্যযুগীয়", topic: "Culture & Arts", acceptedAnswers: ['relating to the Middle Ages', 'moddhojugio'] },
    ],
  },
  {
    lessonId: 6,
    topic: "Health & Sport",
    words: [
      { word: "Stem", meaning: "উৎপন্ন হওয়া", topic: "Health & Sport", acceptedAnswers: ['to come from or be caused by something', 'utponno hoya'] },
      { word: "Remedies", meaning: "প্রতিকার", topic: "Health & Sport", acceptedAnswers: ['treatments or solutions for a problem', 'protikar'] },
      { word: "Sedentary", meaning: "অলস / নিষ্ক্রিয় জীবনযাত্রা", topic: "Health & Sport", acceptedAnswers: ['involving a lot of sitting and very little exercise', 'nishkrio jibonjatra'] },
      { word: "Incline", meaning: "প্রবণতা থাকা", topic: "Health & Sport", acceptedAnswers: ['to tend or lean towards doing something', 'probonota thaka'] },
      { word: "Obesity", meaning: "স্থূলতা", topic: "Health & Sport", acceptedAnswers: ['the condition of being extremely overweight', 'sthulota'] },
      { word: "Inadequate", meaning: "অপর্যাপ্ত", topic: "Health & Sport", acceptedAnswers: ['not enough'] },
      { word: "Strain", meaning: "চাপ / টান", topic: "Health & Sport", acceptedAnswers: ['physical or mental pressure', 'chap'] },
      { word: "Eyesight", meaning: "দৃষ্টিশক্তি", topic: "Health & Sport", acceptedAnswers: ['the ability to see', 'drishtishokti'] },
      { word: "Excessive", meaning: "অতিরিক্ত", topic: "Health & Sport", acceptedAnswers: ['more than what is needed or reasonable', 'otirikto'] },
      { word: "Impairment", meaning: "ত্রুটি / বিকলতা", topic: "Health & Sport", acceptedAnswers: ['a reduction or loss of a bodily function', 'bikolota'] },
    ],
  },
];

export const getTotalLessons = (): number => VOCABULARY_DATA.length;
export const getLesson = (lessonId: number): Lesson | undefined => 
  VOCABULARY_DATA.find(lesson => lesson.lessonId === lessonId);
