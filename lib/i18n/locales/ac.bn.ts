import type { acEn } from './ac.en';

type Shape<T> = { [K in keyof T]: T[K] extends string ? string : Shape<T[K]> };

/** Academic path copy (বাংলা). আপনি-সম্বোধন, ছোট বাক্য; subject আর level-এর নাম English-এ। */
export const acBn: Shape<typeof acEn> = {
  label: 'Academic',
  title: 'প্রতিটি concept, পুরোপুরি আয়ত্তে',
  intro: 'একের পর এক chapter শেষ করা নয়। আপনি কী জানেন Mino আগে সেটা দেখবে, ঘাটতিগুলো আগে ঠিক করবে, তারপর শেখাবে যতক্ষণ না সত্যিই বোঝেন।',
  firstSubject: {
    heading: 'প্রথম বিষয়',
    level: 'HSC',
    name: 'Higher Mathematics',
    status: 'তৈরি হচ্ছে',
    body: 'প্রথম concept-গুলো তৈরি হয়ে HSC syllabus-এর সাথে মিলিয়ে দেখা হলে এখানেই খুলবে।',
  },
  method: {
    heading: 'Mino যেভাবে শেখাবে',
    steps: {
      check: 'আপনি কী জানেন, আগে সেটা দেখা',
      repair: 'যে ঘাটতি আটকে রাখে, আগে সেটা ঠিক করা',
      learn: 'শেখা, অনুশীলন করা, কাজে লাগানো',
      review: 'পাকাপাকি মনে না থাকা পর্যন্ত review',
    },
  },
  nothingYet: 'এখনো কোনো lesson নেই, তাই দেখানোর মতো progress-ও নেই। Progress আসবে আপনার আসল উত্তর থেকে।',
  switchToIelts: 'IELTS-এর প্রস্তুতিও নিচ্ছেন? IELTS Academic খুলুন',
};
