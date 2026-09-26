import type { DocumentGuide, DocumentKind } from '@/lib/models';

/**
 * How to prepare each document — general guidance that holds everywhere.
 * Word limits, formats, attestation and translation rules differ by
 * university and country: those belong in `countryNotes` (sourced) or on the
 * university's own page, never here.
 */
export const DOCUMENT_GUIDES: DocumentGuide[] = [
  {
    kind: 'cv',
    builder: 'cv',
    what: { en: 'A short summary of your education, experience and skills.', bn: 'তোমার পড়াশোনা, কাজের অভিজ্ঞতা আর দক্ষতার ছোট সারাংশ।' },
    why: { en: 'Admissions teams use it to see your background at a glance.', bn: 'Admission team এক নজরে তোমার background বুঝতে এটা দেখে।' },
    contains: [
      { en: 'Contact details', bn: 'যোগাযোগের তথ্য' },
      { en: 'Education, newest first, with results', bn: 'পড়াশোনা — নতুনটা আগে, result-সহ' },
      { en: 'Work, research, projects or volunteering', bn: 'কাজ, research, project বা volunteering' },
      { en: 'Skills, languages and awards', bn: 'দক্ষতা, ভাষা আর পুরস্কার' },
    ],
    mistakes: [
      { en: 'Too long, or full of things that don’t matter for the program', bn: 'অনেক লম্বা, বা program-এর সাথে সম্পর্কহীন জিনিসে ভরা' },
      { en: 'Dates or results that don’t match your certificates', bn: 'তারিখ বা result certificate-এর সাথে মেলে না' },
    ],
    checklist: [
      { en: 'Every date and result matches your documents', bn: 'প্রতিটা তারিখ আর result কাগজের সাথে মেলে' },
      { en: 'Follows the format the university asks for, if any', bn: 'University কোনো format চাইলে সেটা মানা হয়েছে' },
      { en: 'Checked for spelling mistakes', bn: 'বানান ভুল দেখে নেওয়া হয়েছে' },
    ],
  },
  {
    kind: 'sop',
    builder: 'sop',
    what: { en: 'A personal essay: why this subject, why this university, why you.', bn: 'নিজের লেখা essay: কেন এই subject, কেন এই university, কেন তুমি।' },
    why: { en: 'It shows your motivation and plans — things grades can’t show.', bn: 'এটা তোমার আগ্রহ আর পরিকল্পনা দেখায় — যা result দেখাতে পারে না।' },
    contains: [
      { en: 'What drew you to the subject', bn: 'Subject-টার প্রতি আগ্রহ কীভাবে এলো' },
      { en: 'What you have done so far (study, projects, work)', bn: 'এখন পর্যন্ত কী করেছো (পড়া, project, কাজ)' },
      { en: 'Why this program and university fit you', bn: 'এই program আর university কেন তোমার সাথে মেলে' },
      { en: 'Your plans after the degree', bn: 'Degree শেষে তোমার পরিকল্পনা' },
    ],
    mistakes: [
      { en: 'Copying a template or someone else’s SOP', bn: 'Template বা অন্যের SOP কপি করা' },
      { en: 'Sending the same SOP to every university without changes', bn: 'কিছু না বদলে সব university-তে একই SOP পাঠানো' },
      { en: 'Ignoring the word limit the university gives', bn: 'University-র দেওয়া word limit না মানা' },
    ],
    checklist: [
      { en: 'Written by you, in your own words', bn: 'তোমার নিজের কথায়, নিজে লেখা' },
      { en: 'Names this program and university specifically', bn: 'এই program আর university-র নাম নির্দিষ্ট করে বলা' },
      { en: 'Within the university’s word or page limit', bn: 'University-র word বা page limit-এর মধ্যে' },
    ],
  },
  {
    kind: 'lor',
    builder: 'lor',
    what: { en: 'Letters from teachers or employers who know your work.', bn: 'যে শিক্ষক বা অফিসের মানুষ তোমার কাজ জানেন, তাঁদের লেখা চিঠি।' },
    why: { en: 'They confirm your abilities from someone else’s point of view.', bn: 'অন্য কারো চোখে তোমার সক্ষমতা নিশ্চিত করে।' },
    contains: [
      { en: 'How the writer knows you, and for how long', bn: 'লেখক তোমাকে কীভাবে আর কতদিন চেনেন' },
      { en: 'Specific examples of your work or character', bn: 'তোমার কাজ বা স্বভাবের নির্দিষ্ট উদাহরণ' },
      { en: 'The writer’s contact details and signature', bn: 'লেখকের যোগাযোগের তথ্য আর স্বাক্ষর' },
    ],
    mistakes: [
      { en: 'Asking too late', bn: 'খুব দেরিতে চাওয়া' },
      { en: 'Writing the letter yourself for someone to sign', bn: 'নিজে লিখে অন্যকে দিয়ে সই করানো' },
    ],
    checklist: [
      { en: 'Asked at least a few weeks before the deadline', bn: 'Deadline-এর অন্তত কয়েক সপ্তাহ আগে চাওয়া হয়েছে' },
      { en: 'Sent the way each university asks (upload, email or portal)', bn: 'প্রতিটা university যেভাবে চায় সেভাবে পাঠানো (upload, email বা portal)' },
    ],
  },
  {
    kind: 'transcript',
    what: { en: 'Official records of your subjects and results.', bn: 'তোমার subject আর result-এর official রেকর্ড।' },
    why: { en: 'Universities check your academic level from them.', bn: 'University এগুলো থেকে তোমার পড়াশোনার মান যাচাই করে।' },
    contains: [{ en: 'All years of the qualification you apply with', bn: 'যে qualification দিয়ে apply করছো তার সব বছর' }],
    mistakes: [{ en: 'Missing years or unofficial copies', bn: 'কোনো বছর বাদ পড়া বা unofficial copy' }],
    checklist: [
      { en: 'Issued or certified by your institution', bn: 'তোমার প্রতিষ্ঠানের দেওয়া বা সত্যায়িত' },
      { en: 'Translated or attested if the university asks for it', bn: 'University চাইলে অনুবাদ বা attestation করা' },
    ],
  },
  {
    kind: 'certificate',
    what: { en: 'Certificates for the qualifications you completed (e.g. SSC, HSC, bachelor’s).', bn: 'যে qualification শেষ করেছো তার certificate (যেমন SSC, HSC, bachelor’s)।' },
    why: { en: 'They prove you finished the qualification.', bn: 'প্রমাণ করে যে qualification শেষ করেছো।' },
    contains: [{ en: 'Your name exactly as in your passport', bn: 'তোমার নাম — passport-এ যেভাবে আছে ঠিক সেভাবে' }],
    mistakes: [{ en: 'Name spelled differently from the passport', bn: 'Passport-এর চেয়ে আলাদা বানানে নাম' }],
    checklist: [{ en: 'Copies are clear and complete', bn: 'Copy পরিষ্কার আর পুরো' }],
  },
  {
    kind: 'passport',
    what: { en: 'Your passport.', bn: 'তোমার passport।' },
    why: { en: 'Needed to apply, for the visa and to travel.', bn: 'Apply, visa আর যাতায়াত — সবখানে লাগে।' },
    contains: [{ en: 'The photo page, clearly scanned', bn: 'ছবির পাতা, পরিষ্কার scan' }],
    mistakes: [{ en: 'A passport that expires during your studies', bn: 'পড়ার মধ্যেই মেয়াদ শেষ হয়ে যায় এমন passport' }],
    checklist: [{ en: 'Valid for long enough — check the official visa page for the rule', bn: 'যথেষ্ট মেয়াদ আছে — নিয়মটা official visa page-এ দেখে নাও' }],
  },
  {
    kind: 'financial',
    what: { en: 'Papers that show how you will pay for your studies and living.', bn: 'পড়া আর থাকার খরচ কীভাবে দেবে, তার কাগজপত্র।' },
    why: { en: 'Visas and some universities ask for proof of funds.', bn: 'Visa আর কিছু university টাকার প্রমাণ চায়।' },
    contains: [
      { en: 'Bank statements or a sponsor’s letter', bn: 'Bank statement বা sponsor-এর চিঠি' },
      { en: 'Scholarship or loan letters, if any', bn: 'Scholarship বা loan-এর চিঠি, থাকলে' },
    ],
    mistakes: [{ en: 'Guessing the amount — use the figure on the official visa page', bn: 'টাকার পরিমাণ আন্দাজে ধরা — official visa page-এর অঙ্কটা ব্যবহার করো' }],
    checklist: [{ en: 'Amount and format match the official requirement', bn: 'পরিমাণ আর format official requirement-এর সাথে মেলে' }],
  },
  {
    kind: 'english-test',
    what: { en: 'Your IELTS (or other accepted test) result.', bn: 'তোমার IELTS (বা গ্রহণযোগ্য অন্য test)-এর result।' },
    why: { en: 'Shows you can study in English.', bn: 'প্রমাণ করে তুমি English-এ পড়তে পারবে।' },
    contains: [{ en: 'Overall score and each skill', bn: 'Overall score আর প্রতিটা skill' }],
    mistakes: [{ en: 'A result that expires before you apply — check how long it is accepted', bn: 'Apply-এর আগেই মেয়াদ শেষ — কতদিন গ্রহণযোগ্য দেখে নাও' }],
    checklist: [{ en: 'Meets each program’s overall and per-skill minimum', bn: 'প্রতিটা program-এর overall আর প্রতি skill-এর minimum পূরণ করে' }],
  },
  {
    kind: 'portfolio',
    what: { en: 'Samples of your work, for creative or design programs.', bn: 'তোমার কাজের নমুনা — creative বা design program-এর জন্য।' },
    why: { en: 'Some programs judge your ability from your work.', bn: 'কিছু program তোমার কাজ দেখে সক্ষমতা বিচার করে।' },
    contains: [{ en: 'Your best, most relevant pieces', bn: 'তোমার সেরা আর প্রাসঙ্গিক কাজগুলো' }],
    mistakes: [{ en: 'Too many pieces of mixed quality', bn: 'মিশ্র মানের অনেক বেশি কাজ' }],
    checklist: [{ en: 'Format and size as the program asks', bn: 'Program যেমন চায় সেই format আর size' }],
  },
];

export const documentGuide = (kind: DocumentKind | string) => DOCUMENT_GUIDES.find((g) => g.kind === kind);
