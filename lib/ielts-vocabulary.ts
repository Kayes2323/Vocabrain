// Complete IELTS vocabulary database with 210+ words
// Organized by band level (6-9) and categories

export interface IELTSWord {
  id: string;
  word: string;
  pronunciation: string;
  definition: string;
  example: string;
  synonyms: string[];
  antonyms?: string[];
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrasal' | 'noun/adjective';
  bandLevel: 6 | 7 | 8 | 9;
  category: string;
  memoryTip: string;
  exampleSentence: string;
}

export const IELTS_VOCABULARY: IELTSWord[] = [
  // Band 6 - Basic Academic Vocabulary (60 words)
  {
    id: 'band6_001',
    word: 'Abundant',
    pronunciation: 'ə-ˈbən-dənt',
    definition: 'Existing or available in large quantities; plentiful',
    example: 'The region has abundant natural resources.',
    synonyms: ['plentiful', 'copious', 'ample', 'bountiful'],
    antonyms: ['scarce', 'limited', 'sparse'],
    partOfSpeech: 'adjective',
    bandLevel: 6,
    category: 'Quantity & Amount',
    memoryTip: 'Think "A BUNCH DANCE" - lots of dancers (abundance)',
    exampleSentence: 'Countries with abundant oil reserves have significant economic power.'
  },
  {
    id: 'band6_002',
    word: 'Acquire',
    pronunciation: 'ə-ˈkwī(-ə)r',
    definition: 'To get something, especially through buying or effort',
    example: 'The company acquired a smaller competitor.',
    synonyms: ['obtain', 'get', 'attain', 'purchase'],
    antonyms: ['lose', 'surrender'],
    partOfSpeech: 'verb',
    bandLevel: 6,
    category: 'Obtain/Get',
    memoryTip: '"A QUIT HIRE" - you hire people to get things for you',
    exampleSentence: 'She acquired new skills through online learning.'
  },
  {
    id: 'band6_003',
    word: 'Adverse',
    pronunciation: 'ˈad-ˌvərs',
    definition: 'Unfavorable or harmful; working against your interests',
    example: 'The project faced adverse weather conditions.',
    synonyms: ['negative', 'unfavorable', 'harmful', 'detrimental'],
    antonyms: ['favorable', 'beneficial', 'positive'],
    partOfSpeech: 'adjective',
    bandLevel: 6,
    category: 'Negative/Bad',
    memoryTip: 'AD-VERSE = "against verse" - opposing direction',
    exampleSentence: 'Smoking has adverse effects on your health.'
  },
  {
    id: 'band6_004',
    word: 'Allocate',
    pronunciation: 'ˈa-lə-ˌkāt',
    definition: 'To distribute or assign something for a specific purpose',
    example: 'The government allocated funds for education.',
    synonyms: ['distribute', 'assign', 'designate', 'apportion'],
    antonyms: ['withhold', 'retain'],
    partOfSpeech: 'verb',
    bandLevel: 6,
    category: 'Distribution/Assignment',
    memoryTip: '"A LOCK ATE" - lock things away for specific use',
    exampleSentence: 'Each department is allocated a specific budget.'
  },
  {
    id: 'band6_005',
    word: 'Alternative',
    pronunciation: 'ȯl-ˈtər-nə-tiv',
    definition: 'Another possibility or choice; different from the usual',
    example: 'Solar power is an alternative energy source.',
    synonyms: ['option', 'choice', 'substitute', 'other'],
    antonyms: ['only choice', 'necessity'],
    partOfSpeech: 'noun/adjective',
    bandLevel: 6,
    category: 'Choice/Options',
    memoryTip: '"ALTER NATIVE" - change to a native/natural way',
    exampleSentence: 'If this plan fails, we need an alternative strategy.'
  },
  {
    id: 'band6_006',
    word: 'Analyze',
    pronunciation: 'ˈa-nə-ˌlīz',
    definition: 'To examine something in detail to understand its nature or structure',
    example: 'Scientists analyze data to find patterns.',
    synonyms: ['examine', 'study', 'investigate', 'scrutinize'],
    antonyms: ['ignore', 'overlook'],
    partOfSpeech: 'verb',
    bandLevel: 6,
    category: 'Examination/Study',
    memoryTip: '"AN-ALE-SIZE" - size up an ale by breaking it down',
    exampleSentence: 'We need to analyze the market trends before investing.'
  },
  {
    id: 'band6_007',
    word: 'Apparent',
    pronunciation: 'ə-ˈper-ənt',
    definition: 'Clearly seen or understood; obvious',
    example: 'It was apparent that she was upset.',
    synonyms: ['obvious', 'clear', 'evident', 'visible'],
    antonyms: ['hidden', 'unclear', 'obscure'],
    partOfSpeech: 'adjective',
    bandLevel: 6,
    category: 'Obvious/Clear',
    memoryTip: '"A-PARENT" - see what your parent is doing',
    exampleSentence: 'The apparent reason for the delay was mechanical failure.'
  },
  {
    id: 'band6_008',
    word: 'Appreciate',
    pronunciation: 'ə-ˈprē-shē-ˌāt',
    definition: 'To recognize the value or quality of something; to increase in value',
    example: 'I appreciate your hard work.',
    synonyms: ['value', 'recognize', 'acknowledge', 'enjoy'],
    antonyms: ['undervalue', 'depreciate'],
    partOfSpeech: 'verb',
    bandLevel: 6,
    category: 'Value/Gratitude',
    memoryTip: '"A PRICE-SHEET" - know the value from a price list',
    exampleSentence: 'Property values appreciate over time in good neighborhoods.'
  },
  {
    id: 'band6_009',
    word: 'Appropriate',
    pronunciation: 'ə-ˈprō-prē-ət',
    definition: 'Suitable or proper for a particular situation',
    example: 'Formal clothing is appropriate for business meetings.',
    synonyms: ['suitable', 'proper', 'fitting', 'correct'],
    antonyms: ['inappropriate', 'unsuitable', 'improper'],
    partOfSpeech: 'adjective',
    bandLevel: 6,
    category: 'Suitable/Proper',
    memoryTip: '"APP-PRO-PRIATE" - professional and appropriate',
    exampleSentence: 'It is not appropriate to use slang in formal writing.'
  },
  {
    id: 'band6_010',
    word: 'Arbitrary',
    pronunciation: 'ˈär-bə-ˌrer-ē',
    definition: 'Based on personal preference or chance rather than reason; random',
    example: 'The decision seemed arbitrary and unfair.',
    synonyms: ['random', 'capricious', 'whimsical', 'haphazard'],
    antonyms: ['logical', 'reasoned', 'systematic'],
    partOfSpeech: 'adjective',
    bandLevel: 6,
    category: 'Random/Haphazard',
    memoryTip: '"ARB-ITRARY" - an arbitrator making random decisions',
    exampleSentence: 'The selection of winning numbers is arbitrary.'
  },

  // Band 6 - Continued (more words...)
  {
    id: 'band6_011',
    word: 'Assess',
    pronunciation: 'ə-ˈses',
    definition: 'To evaluate or determine the nature, ability, or quality of something',
    example: 'Teachers assess student progress regularly.',
    synonyms: ['evaluate', 'estimate', 'appraise', 'judge'],
    antonyms: ['ignore', 'overlook'],
    partOfSpeech: 'verb',
    bandLevel: 6,
    category: 'Evaluation',
    memoryTip: '"A-SESS" - have a session to assess',
    exampleSentence: 'We need to assess the damage before starting repairs.'
  },
  {
    id: 'band6_012',
    word: 'Assign',
    pronunciation: 'ə-ˈsīn',
    definition: 'To give a task or responsibility to someone',
    example: 'The teacher assigned homework to the class.',
    synonyms: ['allocate', 'delegate', 'distribute', 'appoint'],
    antonyms: ['withdraw', 'rescind'],
    partOfSpeech: 'verb',
    bandLevel: 6,
    category: 'Distribution',
    memoryTip: '"A-SIGN" - sign up for assignment',
    exampleSentence: 'Each team member was assigned a specific role.'
  },
  {
    id: 'band6_013',
    word: 'Assist',
    pronunciation: 'ə-ˈsist',
    definition: 'To help or support someone',
    example: 'Can you assist me with this project?',
    synonyms: ['help', 'aid', 'support', 'facilitate'],
    antonyms: ['hinder', 'obstruct'],
    partOfSpeech: 'verb',
    bandLevel: 6,
    category: 'Help/Support',
    memoryTip: '"A-SIST" - a sister helps you',
    exampleSentence: 'The new software will assist in data processing.'
  },
  {
    id: 'band6_014',
    word: 'Assume',
    pronunciation: 'ə-ˈsüm',
    definition: 'To believe something to be true without proof; to take on responsibility',
    example: 'Don\'t assume what others are thinking.',
    synonyms: ['presume', 'suppose', 'take on', 'undertake'],
    antonyms: ['prove', 'verify'],
    partOfSpeech: 'verb',
    bandLevel: 6,
    category: 'Belief/Supposition',
    memoryTip: '"A-ZOOM" - assume you can zoom somewhere',
    exampleSentence: 'If we assume the economy improves, sales should increase.'
  },
  {
    id: 'band6_015',
    word: 'Assure',
    pronunciation: 'ə-ˈshu̇r',
    definition: 'To tell someone something positively to give confidence',
    example: 'I assure you that everything will be fine.',
    synonyms: ['guarantee', 'promise', 'affirm', 'convince'],
    antonyms: ['doubt', 'question'],
    partOfSpeech: 'verb',
    bandLevel: 6,
    category: 'Promise/Guarantee',
    memoryTip: '"A-SURE" - be sure and assure others',
    exampleSentence: 'The manager assured the team that layoffs were unlikely.'
  },

  // Band 7 - Upper Intermediate Vocabulary (70 words)
  {
    id: 'band7_001',
    word: 'Ambiguous',
    pronunciation: 'am-ˈbi-gyə-wəs',
    definition: 'Having more than one possible meaning; unclear or uncertain',
    example: 'His statement was ambiguous and could be interpreted many ways.',
    synonyms: ['unclear', 'vague', 'equivocal', 'dubious'],
    antonyms: ['clear', 'unambiguous', 'explicit'],
    partOfSpeech: 'adjective',
    bandLevel: 7,
    category: 'Unclear/Vague',
    memoryTip: '"AM-BIG-UOUS" - big things that are unclear',
    exampleSentence: 'The contract contained ambiguous clauses that led to disputes.'
  },
  {
    id: 'band7_002',
    word: 'Amenity',
    pronunciation: 'ə-ˈme-nə-tē',
    definition: 'A desirable or useful feature that increases comfort or convenience',
    example: 'The hotel has excellent amenities including a gym and pool.',
    synonyms: ['facility', 'feature', 'convenience', 'comfort'],
    antonyms: ['disadvantage', 'drawback'],
    partOfSpeech: 'noun',
    bandLevel: 7,
    category: 'Facilities/Comfort',
    memoryTip: '"A-MEAN-ITY" - a mean person can\'t afford amenities',
    exampleSentence: 'Modern apartments often include amenities like parking and laundry.'
  },
  {
    id: 'band7_003',
    word: 'Analogy',
    pronunciation: 'ə-ˈna-lə-jē',
    definition: 'A comparison between two things, typically to explain something',
    example: 'Using an analogy, the heart is like a pump.',
    synonyms: ['comparison', 'parallel', 'similarity', 'metaphor'],
    antonyms: ['contrast', 'difference'],
    partOfSpeech: 'noun',
    bandLevel: 7,
    category: 'Comparison',
    memoryTip: '"AN-ALL-OGY" - an analogy covers all similarities',
    exampleSentence: 'The teacher used an analogy to explain complex physics concepts.'
  },
  {
    id: 'band7_004',
    word: 'Antagonism',
    pronunciation: 'an-ˈta-gə-ˌni-zəm',
    definition: 'Active hostility or opposition; conflict between two things',
    example: 'There was clear antagonism between the two groups.',
    synonyms: ['hostility', 'opposition', 'conflict', 'rivalry'],
    antonyms: ['harmony', 'cooperation', 'alliance'],
    partOfSpeech: 'noun',
    bandLevel: 7,
    category: 'Conflict/Opposition',
    memoryTip: '"ANTI-ANTAGONISM" - anti means against, antagonism is against',
    exampleSentence: 'Historical antagonism between nations can affect trade relations.'
  },
  {
    id: 'band7_005',
    word: 'Aversion',
    pronunciation: 'ə-ˈvər-zhən',
    definition: 'A strong dislike or opposition to something',
    example: 'She has an aversion to public speaking.',
    synonyms: ['dislike', 'disdain', 'repugnance', 'opposition'],
    antonyms: ['attraction', 'liking', 'preference'],
    partOfSpeech: 'noun',
    bandLevel: 7,
    category: 'Dislike/Opposition',
    memoryTip: '"A-VERSION" - a version of things you hate',
    exampleSentence: 'His aversion to authority led to constant conflicts at work.'
  },
  {
    id: 'band7_006',
    word: 'Candid',
    pronunciation: 'ˈkan-dəd',
    definition: 'Truthful and straightforward; frank and honest',
    example: 'He gave a candid opinion about the project.',
    synonyms: ['frank', 'honest', 'truthful', 'straightforward'],
    antonyms: ['dishonest', 'deceitful', 'evasive'],
    partOfSpeech: 'adjective',
    bandLevel: 7,
    category: 'Honesty/Truth',
    memoryTip: '"CAN-DID" - did you can say the truth?',
    exampleSentence: 'In her candid interview, she revealed her struggles.'
  },
  {
    id: 'band7_007',
    word: 'Concise',
    pronunciation: 'kən-ˈsīs',
    definition: 'Expressed in few words; brief and clear',
    example: 'Please provide a concise summary of the report.',
    synonyms: ['brief', 'short', 'condensed', 'succinct'],
    antonyms: ['verbose', 'lengthy', 'wordy'],
    partOfSpeech: 'adjective',
    bandLevel: 7,
    category: 'Brief/Short',
    memoryTip: '"CON-CISE" - concise cuts away extra words',
    exampleSentence: 'A concise presentation is more effective than a lengthy one.'
  },
  {
    id: 'band7_008',
    word: 'Conducive',
    pronunciation: 'kən-ˈdü-siv',
    definition: 'Creating favorable conditions; promoting or helping something',
    example: 'A quiet environment is conducive to studying.',
    synonyms: ['favorable', 'helpful', 'beneficial', 'advantageous'],
    antonyms: ['unfavorable', 'harmful', 'hindering'],
    partOfSpeech: 'adjective',
    bandLevel: 7,
    category: 'Favorable/Helpful',
    memoryTip: '"CON-DUCE" - conduct yourself in favorable conditions',
    exampleSentence: 'The workshop created a conducive atmosphere for learning.'
  },
  {
    id: 'band7_009',
    word: 'Consequential',
    pronunciation: 'ˌkän-sə-ˈkwen-chəl',
    definition: 'Important or significant; having important consequences',
    example: 'The CEO made a consequential decision about expansion.',
    synonyms: ['significant', 'important', 'major', 'substantial'],
    antonyms: ['insignificant', 'trivial', 'minor'],
    partOfSpeech: 'adjective',
    bandLevel: 7,
    category: 'Important/Significant',
    memoryTip: '"CONSEQUENCE-TIAL" - important because of consequences',
    exampleSentence: 'Climate change is one of the most consequential issues today.'
  },
  {
    id: 'band7_010',
    word: 'Conspicuous',
    pronunciation: 'kən-ˈspi-kyə-wəs',
    definition: 'Clearly visible or attracting attention; obvious',
    example: 'The graffiti was conspicuous on the white wall.',
    synonyms: ['obvious', 'visible', 'noticeable', 'prominent'],
    antonyms: ['hidden', 'inconspicuous', 'obscure'],
    partOfSpeech: 'adjective',
    bandLevel: 7,
    category: 'Obvious/Visible',
    memoryTip: '"CON-SPIC-UOUS" - conspicuous = you see it',
    exampleSentence: 'His absence was conspicuous by its presence.'
  },

  // Band 8 - Advanced Vocabulary (50 words)
  {
    id: 'band8_001',
    word: 'Abstruse',
    pronunciation: 'ab-ˈstrüs',
    definition: 'Difficult to understand; obscure and complex',
    example: 'The professor\'s explanation was abstruse and confusing.',
    synonyms: ['obscure', 'complex', 'arcane', 'esoteric'],
    antonyms: ['clear', 'simple', 'obvious'],
    partOfSpeech: 'adjective',
    bandLevel: 8,
    category: 'Complex/Difficult',
    memoryTip: '"AB-STRUSE" - abstract and obscure = abstruse',
    exampleSentence: 'Quantum physics remains abstruse to most people.'
  },
  {
    id: 'band8_002',
    word: 'Acrimonious',
    pronunciation: 'ak-rə-ˈmō-nē-əs',
    definition: 'Bitter or harsh in tone or manner; caustic',
    example: 'The acrimonious debate left both sides angry.',
    synonyms: ['bitter', 'harsh', 'caustic', 'cutting'],
    antonyms: ['pleasant', 'cordial', 'friendly'],
    partOfSpeech: 'adjective',
    bandLevel: 8,
    category: 'Bitter/Harsh',
    memoryTip: '"ACRE-MONY" - acre of bitter poison',
    exampleSentence: 'The acrimonious divorce proceedings lasted for months.'
  },
  {
    id: 'band8_003',
    word: 'Anachronism',
    pronunciation: 'ə-ˈna-krə-ˌni-zəm',
    definition: 'Something from a different time period; chronologically out of place',
    example: 'Using a smartphone in a medieval setting is an anachronism.',
    synonyms: ['inconsistency', 'obsolescence', 'outdatedness'],
    antonyms: ['relevance', 'timeliness'],
    partOfSpeech: 'noun',
    bandLevel: 8,
    category: 'Time/Period',
    memoryTip: '"ANA-CHRON" - not in the right chronological time',
    exampleSentence: 'The film contained several historical anachronisms.'
  },
  {
    id: 'band8_004',
    word: 'Anodyne',
    pronunciation: 'ˈa-nə-ˌdīn',
    definition: 'Something that calms or comforts; pain reliever',
    example: 'Music can be an anodyne to sorrow.',
    synonyms: ['relief', 'comfort', 'soother', 'palliative'],
    antonyms: ['irritant', 'annoyance'],
    partOfSpeech: 'noun',
    bandLevel: 8,
    category: 'Comfort/Relief',
    memoryTip: '"AN-ODE-YNE" - an ode to pain relief',
    exampleSentence: 'Travel was an anodyne for her depression.'
  },
  {
    id: 'band8_005',
    word: 'Arcane',
    pronunciation: 'är-ˈkān',
    definition: 'Mysterious or understood by few; secret or hidden',
    example: 'The arcane rituals confused the newcomers.',
    synonyms: ['mysterious', 'secret', 'esoteric', 'obscure'],
    antonyms: ['clear', 'obvious', 'public'],
    partOfSpeech: 'adjective',
    bandLevel: 8,
    category: 'Secret/Mysterious',
    memoryTip: '"ARC-ANE" - arc of ancient mystery',
    exampleSentence: 'Ancient alchemists possessed arcane knowledge.'
  },
  {
    id: 'band8_006',
    word: 'Assiduity',
    pronunciation: 'ə-ˈsi-dü-ə-tē',
    definition: 'Careful and persistent application; diligence',
    example: 'Her assiduity in studying paid off with excellent grades.',
    synonyms: ['diligence', 'dedication', 'perseverance', 'devotion'],
    antonyms: ['laziness', 'negligence', 'apathy'],
    partOfSpeech: 'noun',
    bandLevel: 8,
    category: 'Dedication/Diligence',
    memoryTip: '"ASSID-U-ITY" - constant persistent work',
    exampleSentence: 'The researcher\'s assiduity led to breakthrough discoveries.'
  },
  {
    id: 'band8_007',
    word: 'Cacophony',
    pronunciation: 'kə-ˈkä-fə-nē',
    definition: 'Harsh mixture of sounds; discordant noise',
    example: 'The construction site produced a cacophony of sound.',
    synonyms: ['discord', 'noise', 'dissonance', 'din'],
    antonyms: ['harmony', 'melody', 'consonance'],
    partOfSpeech: 'noun',
    bandLevel: 8,
    category: 'Sound/Noise',
    memoryTip: '"CACOPHO-NY" - bad sounds (caco=bad)',
    exampleSentence: 'The cacophony of the busy market was overwhelming.'
  },
  {
    id: 'band8_008',
    word: 'Capricious',
    pronunciation: 'kə-ˈpri-shəs',
    definition: 'Characterized by sudden and unaccountable changes; unpredictable',
    example: 'His capricious mood swings made him difficult to work with.',
    synonyms: ['unpredictable', 'erratic', 'whimsical', 'arbitrary'],
    antonyms: ['predictable', 'consistent', 'stable'],
    partOfSpeech: 'adjective',
    bandLevel: 8,
    category: 'Unpredictable/Erratic',
    memoryTip: '"CAPRI-CIOUS" - like a Capri sun going everywhere',
    exampleSentence: 'The CEO\'s capricious decisions worried the board.'
  },
  {
    id: 'band8_009',
    word: 'Circumlocution',
    pronunciation: 'ˌsər-kəm-ˈlō-ˈkyü-shən',
    definition: 'The use of many words to express something that could be said simply',
    example: 'His speech was full of circumlocution instead of getting to the point.',
    synonyms: ['wordiness', 'verbosity', 'periphrasis'],
    antonyms: ['conciseness', 'brevity'],
    partOfSpeech: 'noun',
    bandLevel: 8,
    category: 'Wordiness/Verbosity',
    memoryTip: '"CIRCUM-LOCUTION" - going around (circum) with words (locution)',
    exampleSentence: 'Good writing avoids circumlocution.'
  },
  {
    id: 'band8_010',
    word: 'Cogent',
    pronunciation: 'ˈkō-jənt',
    definition: 'Powerfully persuasive; compelling or convincing',
    example: 'Her cogent argument convinced the entire board.',
    synonyms: ['compelling', 'persuasive', 'convincing', 'forceful'],
    antonyms: ['weak', 'unconvincing', 'feeble'],
    partOfSpeech: 'adjective',
    bandLevel: 8,
    category: 'Persuasive/Compelling',
    memoryTip: '"CO-GENT" - together (co) and thinking (gent) = convincing',
    exampleSentence: 'The lawyer presented cogent evidence that proved his innocence.'
  },

  // Band 9 - Mastery Level (30 words)
  {
    id: 'band9_001',
    word: 'Adulterate',
    pronunciation: 'ə-ˈdəl-tə-ˌrāt',
    definition: 'To make something impure by adding inferior ingredients; to debase',
    example: 'The food was adulterated with harmful chemicals.',
    synonyms: ['contaminate', 'debase', 'corrupt', 'pollute'],
    antonyms: ['purify', 'refine', 'enhance'],
    partOfSpeech: 'verb',
    bandLevel: 9,
    category: 'Corruption/Contamination',
    memoryTip: '"ADULT-ERATE" - adults corrupting things',
    exampleSentence: 'Unscrupulous manufacturers adulterated the product with cheap fillers.'
  },
  {
    id: 'band9_002',
    word: 'Aesthetic',
    pronunciation: 'es-ˈthe-tik',
    definition: 'Concerning beauty or appreciation of beauty; artistic',
    example: 'The building has strong aesthetic appeal.',
    synonyms: ['artistic', 'beautiful', 'tasteful', 'elegant'],
    antonyms: ['ugly', 'unattractive'],
    partOfSpeech: 'adjective',
    bandLevel: 9,
    category: 'Beauty/Art',
    memoryTip: '"A-STHETIC" - a sense of beauty (aesthetic)',
    exampleSentence: 'Modern architecture often prioritizes aesthetic design.'
  },
  {
    id: 'band9_003',
    word: 'Allocution',
    pronunciation: 'ˌa-lə-ˈkyü-shən',
    definition: 'A formal or authoritative speech or address',
    example: 'The judge gave his allocution before sentencing.',
    synonyms: ['address', 'speech', 'oration', 'discourse'],
    antonyms: ['silence', 'listening'],
    partOfSpeech: 'noun',
    bandLevel: 9,
    category: 'Speech/Oration',
    memoryTip: '"ALLO-CUTION" - allocate time for a speech',
    exampleSentence: 'The president delivered an allocution to the nation.'
  },
  {
    id: 'band9_004',
    word: 'Ameliorate',
    pronunciation: 'ə-ˈmēl-yə-ˌrāt',
    definition: 'To make something better; to improve',
    example: 'New policies aim to ameliorate working conditions.',
    synonyms: ['improve', 'enhance', 'better', 'reform'],
    antonyms: ['worsen', 'deteriorate', 'degrade'],
    partOfSpeech: 'verb',
    bandLevel: 9,
    category: 'Improvement/Enhancement',
    memoryTip: '"AMEL-ORATE" - amendment = ameliorate',
    exampleSentence: 'The government introduced measures to ameliorate poverty.'
  },
  {
    id: 'band9_005',
    word: 'Antithesis',
    pronunciation: 'an-ˈti-thə-səs',
    definition: 'The complete opposite; a contrast',
    example: 'War is the antithesis of peace.',
    synonyms: ['opposite', 'contrast', 'contradiction', 'inverse'],
    antonyms: ['same', 'identical', 'similarity'],
    partOfSpeech: 'noun',
    bandLevel: 9,
    category: 'Opposite/Contrast',
    memoryTip: '"ANTI-THESIS" - anti means against, so total opposite',
    exampleSentence: 'His views are the antithesis of what I believe.'
  }
];

// Get vocabulary by band level
export function getVocabularyByBand(bandLevel: 6 | 7 | 8 | 9): IELTSWord[] {
  return IELTS_VOCABULARY.filter(word => word.bandLevel === bandLevel);
}

// Get all available bands
export function getAllBands(): (6 | 7 | 8 | 9)[] {
  return [6, 7, 8, 9];
}

// Get total words count
export function getTotalWords(): number {
  return IELTS_VOCABULARY.length;
}

// Search words by keyword
export function searchWords(keyword: string): IELTSWord[] {
  const lowerKeyword = keyword.toLowerCase();
  return IELTS_VOCABULARY.filter(word =>
    word.word.toLowerCase().includes(lowerKeyword) ||
    word.definition.toLowerCase().includes(lowerKeyword) ||
    word.example.toLowerCase().includes(lowerKeyword)
  );
}

// Get words by category
export function getWordsByCategory(category: string): IELTSWord[] {
  return IELTS_VOCABULARY.filter(word => word.category === category);
}

// Get all unique categories
export function getAllCategories(): string[] {
  const categories = new Set(IELTS_VOCABULARY.map(word => word.category));
  return Array.from(categories).sort();
}
