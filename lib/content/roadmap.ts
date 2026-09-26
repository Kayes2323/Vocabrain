import type { RoadmapStepDef } from '@/lib/models';

/**
 * The 16-step roadmap every country starts from. Steps are general guidance,
 * not country facts: anything that differs by country (a test, a portal, a
 * fee) belongs in that country's sourced `roadmap` override, never here.
 * `{code}` in an href is filled with the country code.
 */
export const ROADMAP_TEMPLATE: RoadmapStepDef[] = [
  {
    id: 'goal',
    stage: 'discover',
    title: { en: 'Set your study goal', bn: 'পড়াশোনার লক্ষ্য ঠিক করো' },
    description: {
      en: 'Degree level, subject and when you want to start. Everything else is planned from this.',
      bn: 'কোন degree, কোন subject, কবে শুরু করতে চাও। বাকি সব plan এটা থেকেই হবে।',
    },
    action: { label: { en: 'Edit my goal', bn: 'লক্ষ্য বদলাও' }, href: '/setup/abroad' },
  },
  {
    id: 'country',
    stage: 'choose-country',
    title: { en: 'Choose your dream country', bn: 'স্বপ্নের দেশ বেছে নাও' },
    description: {
      en: 'One active country keeps your plan focused. You can keep others on your shortlist.',
      bn: 'একটা দেশ বেছে নিলে plan গোছানো থাকে। বাকিগুলো shortlist-এ রাখতে পারো।',
    },
    action: { label: { en: 'Compare countries', bn: 'দেশগুলো মিলিয়ে দেখো' }, href: '/abroad/countries' },
  },
  {
    id: 'eligibility',
    stage: 'eligibility',
    title: { en: 'Check admission requirements', bn: 'Admission requirement দেখে নাও' },
    description: {
      en: 'Compare your grades, subject background and English with the official requirements of your programs.',
      bn: 'তোমার result, আগের subject আর English — program-গুলোর official requirement-এর সাথে মিলিয়ে দেখো।',
    },
    action: { label: { en: 'Open admission info', bn: 'Admission তথ্য খোলো' }, href: '/abroad/countries/{code}?tab=apply' },
    minoPrompt: { en: 'What should I check to know if I am eligible?', bn: 'আমি eligible কিনা বুঝতে কী কী দেখা দরকার?' },
  },
  {
    id: 'budget',
    stage: 'eligibility',
    title: { en: 'Plan your budget', bn: 'Budget ঠিক করো' },
    description: {
      en: 'Tuition, living costs and the money you may need to show. Only use official figures with a source.',
      bn: 'Tuition, থাকা-খাওয়ার খরচ আর যে টাকা দেখাতে হতে পারে। শুধু source-সহ official হিসাব ধরো।',
    },
    action: { label: { en: 'See money facts', bn: 'টাকা-পয়সার তথ্য দেখো' }, href: '/abroad/countries/{code}?tab=money' },
    documents: ['financial'],
    minoPrompt: { en: 'Help me plan my study abroad budget.', bn: 'আমার বিদেশে পড়ার budget plan করতে সাহায্য করো।' },
  },
  {
    id: 'programs',
    stage: 'program',
    title: { en: 'Research programs', bn: 'Program খুঁজে দেখো' },
    description: {
      en: 'Find programs in your subject and read their official pages: modules, language, fees, intake.',
      bn: 'তোমার subject-এর program খোঁজো আর official page পড়ো: কী পড়ায়, কোন ভাষায়, fee, intake।',
    },
    action: { label: { en: 'Find universities', bn: 'University খোঁজো' }, href: '/abroad/universities?country={code}' },
  },
  {
    id: 'shortlist',
    stage: 'program',
    title: { en: 'Shortlist universities', bn: 'University shortlist করো' },
    description: {
      en: 'Pick a balanced list: a few ambitious choices, a few good matches and at least one safer option.',
      bn: 'একটা ভারসাম্যের list বানাও: কয়েকটা কঠিন, কয়েকটা মানানসই, অন্তত একটা নিরাপদ option।',
    },
    action: { label: { en: 'My university shortlist', bn: 'আমার University shortlist' }, href: '/abroad/universities?country={code}' },
    minoPrompt: { en: 'How do I build a balanced university shortlist?', bn: 'ভারসাম্যের University shortlist কীভাবে বানাবো?' },
  },
  {
    id: 'english',
    stage: 'english',
    title: { en: 'Reach your English score', bn: 'English score-এ পৌঁছাও' },
    description: {
      en: 'Prepare for IELTS (or the test your programs accept) until you reach the score they ask for.',
      bn: 'IELTS-এর (বা তোমার program যে test নেয়) প্রস্তুতি নাও, যতক্ষণ না চাওয়া score-এ পৌঁছাও।',
    },
    action: { label: { en: 'Open IELTS preparation', bn: 'IELTS প্রস্তুতি খোলো' }, href: '/ielts' },
    documents: ['english-test'],
  },
  {
    id: 'academic-docs',
    stage: 'documents',
    title: { en: 'Collect academic documents', bn: 'শিক্ষাগত কাগজ জোগাড় করো' },
    description: {
      en: 'Transcripts and certificates, with translations or attestations if your universities ask for them.',
      bn: 'Transcript আর certificate — university চাইলে অনুবাদ বা attestation-সহ।',
    },
    action: { label: { en: 'Check my documents', bn: 'আমার কাগজপত্র দেখো' }, href: '/abroad/documents' },
    documents: ['transcript', 'certificate'],
  },
  {
    id: 'sop-cv',
    stage: 'documents',
    title: { en: 'Write your SOP and CV', bn: 'SOP আর CV লেখো' },
    description: {
      en: 'Your statement of purpose explains why this program and why you. Keep the CV short and factual.',
      bn: 'SOP বোঝায় কেন এই program আর কেন তুমি। CV ছোট আর সত্যি তথ্যে রাখো।',
    },
    action: { label: { en: 'Check my documents', bn: 'আমার কাগজপত্র দেখো' }, href: '/abroad/documents' },
    documents: ['sop', 'cv'],
    minoPrompt: { en: 'Help me plan my statement of purpose.', bn: 'আমার SOP-এর plan করতে সাহায্য করো।' },
  },
  {
    id: 'lor',
    stage: 'documents',
    title: { en: 'Ask for recommendation letters', bn: 'Recommendation letter চাও' },
    description: {
      en: 'Ask teachers or employers early and give them time. Check how each university wants them sent.',
      bn: 'শিক্ষক বা অফিসের কাউকে আগে থেকে বলো, সময় দাও। প্রতিটা university কীভাবে চায় দেখে নাও।',
    },
    action: { label: { en: 'Check my documents', bn: 'আমার কাগজপত্র দেখো' }, href: '/abroad/documents' },
    documents: ['lor'],
  },
  {
    id: 'passport',
    stage: 'documents',
    title: { en: 'Passport and financial papers', bn: 'Passport আর টাকার কাগজ' },
    description: {
      en: 'Make sure your passport stays valid long enough, and prepare the bank or sponsor documents you will need.',
      bn: 'Passport-এর মেয়াদ যথেষ্ট আছে কিনা দেখো, আর দরকারি bank বা sponsor-এর কাগজ গুছিয়ে রাখো।',
    },
    action: { label: { en: 'Check my documents', bn: 'আমার কাগজপত্র দেখো' }, href: '/abroad/documents' },
    documents: ['passport', 'financial'],
  },
  {
    id: 'scholarships',
    stage: 'apply',
    title: { en: 'Apply for scholarships', bn: 'Scholarship-এ apply করো' },
    description: {
      en: 'Many scholarships close before admissions do. Check each one’s official deadline.',
      bn: 'অনেক scholarship admission-এর আগেই বন্ধ হয়। প্রতিটার official deadline দেখে নাও।',
    },
    action: { label: { en: 'Find scholarships', bn: 'Scholarship খোঁজো' }, href: '/abroad/scholarships?country={code}' },
    minoPrompt: { en: 'Which scholarships should I look at first?', bn: 'কোন scholarship আগে দেখা উচিত?' },
  },
  {
    id: 'submit',
    stage: 'apply',
    title: { en: 'Submit your applications', bn: 'Application জমা দাও' },
    description: {
      en: 'Apply through each university’s official portal before its deadline. Keep a copy of everything you send.',
      bn: 'প্রতিটা university-র official portal দিয়ে deadline-এর আগে apply করো। যা পাঠাও তার copy রাখো।',
    },
    action: { label: { en: 'See deadlines', bn: 'Deadline দেখো' }, href: '/abroad/deadlines?country={code}' },
  },
  {
    id: 'offer',
    stage: 'offer',
    title: { en: 'Receive and accept an offer', bn: 'Offer পাও আর গ্রহণ করো' },
    description: {
      en: 'Read the conditions carefully, accept before the reply date, and pay any deposit the offer asks for.',
      bn: 'শর্তগুলো মন দিয়ে পড়ো, reply date-এর আগে গ্রহণ করো, আর offer-এ deposit চাইলে দাও।',
    },
    minoPrompt: { en: 'I got an offer. What should I check before accepting?', bn: 'আমি offer পেয়েছি। গ্রহণের আগে কী দেখবো?' },
  },
  {
    id: 'visa',
    stage: 'visa',
    title: { en: 'Apply for your student visa', bn: 'Student visa-র জন্য apply করো' },
    description: {
      en: 'Follow the official immigration website only. Book early: appointments and processing take time.',
      bn: 'শুধু official immigration website মেনে চলো। আগেভাগে book করো: appointment আর processing-এ সময় লাগে।',
    },
    action: { label: { en: 'Start visa preparation', bn: 'Visa প্রস্তুতি শুরু করো' }, href: '/abroad/visa/{code}' },
    documents: ['passport', 'financial'],
  },
  {
    id: 'travel',
    stage: 'travel',
    title: { en: 'Prepare to travel', bn: 'যাওয়ার প্রস্তুতি নাও' },
    description: {
      en: 'Accommodation, flights, insurance and what to do in your first weeks.',
      bn: 'থাকার জায়গা, flight, insurance আর প্রথম কয়েক সপ্তাহে কী করবে।',
    },
    action: { label: { en: 'Pre-departure checklist', bn: 'যাওয়ার আগের checklist' }, href: '/abroad/pre-departure' },
  },
];
