import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  DE_CSP,
  DE_DAAD_ADMISSION_DB,
  DE_DAAD_BD_BACHELOR,
  DE_DAAD_BD_MASTER,
  DE_DAAD_BD_PHD,
  DE_DAAD_EPOS,
  DE_DAAD_SCHOLARSHIP_DB,
  DE_DEUTSCHLANDSTIPENDIUM,
  DE_EMBASSY_FAQ,
  DE_EMBASSY_NATIONAL,
  DE_EMBASSY_STUDY,
  DE_EMBASSY_VFS_MASTER,
  DE_MIIG_REGISTRATION,
  DE_MIIG_SKILLED_ACT,
  DE_MIIG_VISA_STUDY,
  DE_MIIG_WORK,
  DE_READ,
  DE_RWTH_FAQ,
  DE_SIG_FUNDING,
  DE_STUTTGART_FEES,
  DE_UNIASSIST_DEADLINES,
} from './de-sources';

/**
 * Germany reading guide, researched on its own from German official sources
 * (German Embassy Dhaka, DAAD / DAAD Bangladesh, Make it in Germany, uni-assist,
 * the universities). Nothing here is taken from another country's guide.
 * Where two official sources differ, both are cited and the answer says so.
 */

const b = (en: string, bn: string): Bilingual => ({ en, bn });

interface Opts {
  list?: Bilingual[];
  status?: GuideStatus;
  kind?: GuideKind;
  discrepancy?: Bilingual;
  allDegrees?: boolean;
}
function qa(id: string, q: Bilingual, a: Bilingual[], sources: SourceRef[], o: Opts = {}): GuideAnswer {
  const high = sources.some((s) => s.url?.includes('diplo.de') || s.url?.includes('make-it-in-germany') || s.sourceType === 'official-university');
  return {
    id,
    q,
    a,
    sources,
    confidence: high ? 'high' : 'medium',
    ...(o.list ? { list: o.list } : {}),
    ...(o.status ? { status: o.status } : {}),
    ...(o.kind ? { kind: o.kind } : {}),
    ...(o.discrepancy ? { discrepancy: o.discrepancy } : {}),
    ...(o.allDegrees ? { allDegrees: true } : {}),
  };
}

// ------------------------------------------------------------------ shared answers (same rule for every degree)

const UNIS_DECIDE = b(
  'Every German university is autonomous: each program sets its own admission criteria, so always check the program’s own page.',
  'জার্মানির প্রতিটি university স্বাধীন: প্রতিটি program নিজের ভর্তির শর্ত ঠিক করে, তাই সবসময় program-এর নিজের page দেখে নিন।',
);

const blockedAccount = (id: string) =>
  qa(
    id,
    b('How much money must you show for the visa?', 'Visa-র জন্য কত টাকা দেখাতে হবে?'),
    [
      b(
        'The German Embassy Dhaka asks for proof that you can pay for your studies, in one of three ways: a blocked account ("Sperrkonto") in Germany in your name with at least EUR 11,904, from which you can take EUR 992 a month; a confirmation of a scholarship; or a formal sponsorship letter ("Verpflichtungserklärung") from a sponsor living in Germany.',
        'German Embassy Dhaka পড়াশোনার খরচ চালানোর প্রমাণ চায়, তিনভাবে দেওয়া যায়: জার্মানিতে আপনার নামে blocked account ("Sperrkonto"), যেখানে অন্তত EUR 11,904 থাকবে আর মাসে EUR 992 তোলা যাবে; scholarship-এর confirmation; অথবা জার্মানিতে থাকা sponsor-এর formal sponsorship letter ("Verpflichtungserklärung")।',
      ),
      b(
        'If you have a scholarship paying a monthly amount, the Embassy says it can be counted towards your living costs, so the blocked amount may be lower.',
        'মাসিক টাকার scholarship থাকলে Embassy বলে, সেটা থাকা-খাওয়ার খরচের মধ্যে ধরা যায়, তাই blocked account-এ কম টাকা লাগতে পারে।',
      ),
      b('The amount is reviewed from time to time; check the Embassy page before you open the account.', 'অঙ্কটা মাঝে মাঝে বদলায়; account খোলার আগে Embassy-র page দেখে নিন।'),
    ],
    [DE_EMBASSY_STUDY, DE_EMBASSY_FAQ],
    { allDegrees: true },
  );

const aps = (id: string) =>
  qa(
    id,
    b('Is APS required for Bangladesh?', 'Bangladesh থেকে APS লাগে কি?'),
    [
      b(
        'No. The German Embassy Dhaka says it does not use an APS office, and you do not apply through another country’s APS office (for example India).',
        'না। German Embassy Dhaka বলে, তারা APS office ব্যবহার করে না, আর অন্য দেশের APS office (যেমন India) দিয়েও আবেদন করতে হয় না।',
      ),
    ],
    [DE_EMBASSY_FAQ],
    { allDegrees: true },
  );

const englishProof = (id: string, extra: Bilingual[] = [], sources: SourceRef[] = []) =>
  qa(
    id,
    b('Do you need IELTS?', 'IELTS লাগবে কি?'),
    [
      b(
        'For an English-taught program, usually yes: the German Embassy Dhaka asks for proof of English (TOEFL or IELTS) for English-speaking programs, unless you completed a bachelor’s degree in Australia, the UK or the US. It accepts TELC, TOEFL and IELTS, and other ALTE-certified tests; certificates must be taken in person, and online certificates are generally not accepted.',
        'English-এ পড়ানো program-এ সাধারণত হ্যাঁ: German Embassy Dhaka English program-এর জন্য English-এর প্রমাণ (TOEFL বা IELTS) চায়, যদি না আপনি Australia, UK বা US থেকে bachelor’s করে থাকেন। তারা TELC, TOEFL, IELTS আর অন্য ALTE-স্বীকৃত test নেয়; পরীক্ষা সশরীরে দিতে হবে, online certificate সাধারণত গ্রহণ করা হয় না।',
      ),
      b(
        'There is no single national IELTS score. Each university sets the score for its program; the sources we read give no one number for everyone.',
        'সবার জন্য একটা জাতীয় IELTS score নেই। প্রতিটি university তার program-এর score ঠিক করে; আমরা যে source পড়েছি, তাতে সবার জন্য একটা score নেই।',
      ),
      ...extra,
    ],
    [DE_EMBASSY_STUDY, DE_EMBASSY_FAQ, ...sources],
    { status: 'partly-verified' },
  );

const germanProof = (id: string, extra: Bilingual[] = [], sources: SourceRef[] = []) =>
  qa(
    id,
    b('Do you need German?', 'German ভাষা লাগবে কি?'),
    [
      b(
        'For a German-taught program, yes: universities ask for very good German, certified by standardised exams such as TestDaF or DSH. For the visa, the German Embassy Dhaka recommends "Zertifikat B1" with a "good" result or higher for German-speaking programs.',
        'German-এ পড়ানো program-এ হ্যাঁ: university খুব ভালো German চায়, TestDaF বা DSH-এর মতো standard পরীক্ষা দিয়ে প্রমাণ করতে হয়। Visa-র জন্য German Embassy Dhaka German program-এর ক্ষেত্রে "good" বা তার বেশি ফলসহ "Zertifikat B1" থাকা ভালো বলে।',
      ),
      ...extra,
      b(
        'For an English-taught program German is not an admission requirement in general, but DAAD notes that knowing German helps with daily life, internships and work.',
        'English program-এ সাধারণত German ভর্তির শর্ত নয়, তবে DAAD বলে German জানা থাকলে দৈনন্দিন জীবন, internship আর কাজে সুবিধা হয়।',
      ),
    ],
    [DE_EMBASSY_STUDY, ...sources],
  );

const tuition = (id: string, level: 'bachelors' | 'masters') =>
  qa(
    id,
    b('How much is tuition? Are public universities tuition-free?', 'Tuition fee কত? Public university কি বিনা tuition-এ?'),
    [
      b(
        level === 'bachelors'
          ? 'As a rule, state (public) universities do not charge tuition fees for bachelor’s programs. A few states charge fees for a second degree or if you study much longer than the standard period.'
          : 'As a rule, state (public) universities do not charge tuition fees for many master’s programs; some master’s programs do charge. A few states charge fees for a second degree or if you study much longer than the standard period.',
        level === 'bachelors'
          ? 'সাধারণ নিয়মে রাষ্ট্রীয় (public) university bachelor’s-এ tuition নেয় না। কয়েকটি রাজ্য দ্বিতীয় degree-র জন্য বা নির্ধারিত সময়ের অনেক বেশি পড়লে fee নেয়।'
          : 'সাধারণ নিয়মে রাষ্ট্রীয় (public) university অনেক master’s program-এ tuition নেয় না; কিছু master’s program fee নেয়। কয়েকটি রাজ্য দ্বিতীয় degree-র জন্য বা নির্ধারিত সময়ের অনেক বেশি পড়লে fee নেয়।',
      ),
      b(
        'The exception: the state of Baden-Württemberg charges non-EU students EUR 1,500 per semester (for example the University of Stuttgart). Private universities mostly charge high fees.',
        'ব্যতিক্রম: Baden-Württemberg রাজ্য non-EU student-দের কাছ থেকে প্রতি semester-এ EUR 1,500 নেয় (যেমন University of Stuttgart)। Private university বেশিরভাগই অনেক বেশি fee নেয়।',
      ),
      b(
        'Every student also pays a semester contribution (see "Semester fee" below).',
        'এর বাইরে প্রত্যেক student-কে semester contribution দিতে হয় (নিচে "Semester fee" দেখুন)।',
      ),
    ],
    [DE_SIG_FUNDING, DE_STUTTGART_FEES],
  );

const semesterFee = (id: string) =>
  qa(
    id,
    b('What is the semester fee?', 'Semester fee কী?'),
    [
      b(
        'All students pay a semester contribution when they enrol and before each new semester. It pays for student services (Studierendenwerk) and the student body (AStA), and often includes a public transport ticket ("Semesterticket"). DAAD gives a range of about EUR 70 to 430, depending on the university.',
        'সব student ভর্তির সময় আর প্রতিটি নতুন semester-এর আগে semester contribution দেন। এটা student services (Studierendenwerk) আর student body (AStA)-র জন্য, আর অনেক জায়গায় এর মধ্যে গণপরিবহনের ticket ("Semesterticket") থাকে। DAAD বলে, university অনুযায়ী প্রায় EUR 70 থেকে 430।',
      ),
    ],
    [DE_SIG_FUNDING, DE_DAAD_BD_BACHELOR, DE_DAAD_BD_MASTER],
    {
      allDegrees: true,
      discrepancy: b(
        'DAAD Bangladesh gives "around EUR 300" (bachelor page) and "around EUR 100–300" (master page), while Study in Germany (DAAD) gives about EUR 70–430. The real amount is on your university’s page.',
        'DAAD Bangladesh বলে "প্রায় EUR 300" (bachelor page) আর "প্রায় EUR 100–300" (master page); Study in Germany (DAAD) বলে প্রায় EUR 70–430। আসল অঙ্ক আপনার university-র page-এ।',
      ),
    },
  );

const livingCost = (id: string) =>
  qa(
    id,
    b('How much is the living cost?', 'থাকা-খাওয়ার খরচ কত?'),
    [
      b(
        'Study in Germany (DAAD) says students need on average EUR 900–1,200 a month, depending on the city; rent is usually EUR 290–560, and above average in cities such as Cologne, Munich, Hamburg, Düsseldorf and Frankfurt.',
        'Study in Germany (DAAD) বলে, শহর অনুযায়ী student-দের মাসে গড়ে EUR 900–1,200 লাগে; ভাড়া সাধারণত EUR 290–560, আর Cologne, Munich, Hamburg, Düsseldorf ও Frankfurt-এর মতো শহরে গড়ের চেয়ে বেশি।',
      ),
      b(
        'Public health insurance costs about EUR 110 a month if you are 30 or younger (or have not yet studied more than 14 semesters).',
        '৩০ বছর বা তার কম বয়স হলে (বা ১৪ semester-এর বেশি না পড়ে থাকলে) public health insurance-এ মাসে প্রায় EUR 110 লাগে।',
      ),
    ],
    [DE_SIG_FUNDING, DE_DAAD_BD_BACHELOR],
    {
      kind: 'estimate',
      allDegrees: true,
      discrepancy: b(
        'DAAD Bangladesh gives about EUR 1,150 a month (based on a 2023 Deutsches Studentenwerk survey); Study in Germany gives EUR 900–1,200. Both are estimates.',
        'DAAD Bangladesh বলে মাসে প্রায় EUR 1,150 (২০২৩-এর Deutsches Studentenwerk survey অনুযায়ী); Study in Germany বলে EUR 900–1,200। দুটোই আনুমানিক।',
      ),
    },
  );

const howToApply = (id: string, extra: Bilingual[] = []) =>
  qa(
    id,
    b('Do you apply directly or through uni-assist?', 'সরাসরি আবেদন নাকি uni-assist দিয়ে?'),
    [
      b(
        'It depends on the university: the program page says whether you apply to the university directly or through uni-assist. uni-assist screens applications and forwards them to its member universities for a fee; member universities often do not accept direct applications. uni-assist has no office in Bangladesh.',
        'এটা university-র উপর নির্ভর করে: program page-এ লেখা থাকে সরাসরি university-তে নাকি uni-assist দিয়ে আবেদন। uni-assist fee নিয়ে আবেদন যাচাই করে সদস্য university-তে পাঠায়; সদস্য university অনেক সময় সরাসরি আবেদন নেয় না। Bangladesh-এ uni-assist-এর কোনো office নেই।',
      ),
      ...extra,
    ],
    [DE_DAAD_BD_BACHELOR, DE_UNIASSIST_DEADLINES],
    { allDegrees: true },
  );

const whenToApply = (id: string, extra: Bilingual[] = []) =>
  qa(
    id,
    b('When should you apply? What are the intakes?', 'কখন আবেদন করবেন? Intake কখন?'),
    [
      b(
        'The academic year has two semesters: winter (October–March) and summer (April–September), so there are two intakes. Not every program starts in both.',
        'শিক্ষাবর্ষে দুটো semester: winter (October–March) আর summer (April–September), তাই intake দুটো। সব program দুটোতেই শুরু হয় না।',
      ),
      b(
        'uni-assist says the deadline is often 15 July for the winter semester and 15 January for the summer semester, but many universities set earlier deadlines (for example for master’s programs or the Studienkolleg). It recommends applying at least 8 weeks before the deadline.',
        'uni-assist বলে, winter semester-এর জন্য deadline প্রায়ই 15 July আর summer semester-এর জন্য 15 January, তবে অনেক university আগের deadline দেয় (যেমন master’s বা Studienkolleg-এর জন্য)। Deadline-এর অন্তত ৮ সপ্তাহ আগে আবেদন করতে বলে।',
      ),
      ...extra,
    ],
    [DE_DAAD_BD_BACHELOR, DE_UNIASSIST_DEADLINES],
    { allDegrees: true },
  );

const admissionTime = (id: string) =>
  qa(
    id,
    b('How long does admission take?', 'Admission পেতে কত সময় লাগে?'),
    [
      b(
        'Not verified yet. The official sources we read do not give one processing time for university admission; it differs by university and by whether you apply through uni-assist.',
        'এখনো যাচাই হয়নি। আমরা যে official source পড়েছি, তাতে admission-এর একটা নির্দিষ্ট সময় দেওয়া নেই; university অনুযায়ী আর uni-assist দিয়ে আবেদন করছেন কিনা তার উপর নির্ভর করে।',
      ),
    ],
    [DE_UNIASSIST_DEADLINES],
    { status: 'not-verified', allDegrees: true },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying? How many hours?', 'পড়ার সময় কাজ করা যায় কি? কত ঘণ্টা?'),
    [
      b(
        'Yes. Students from outside the EU may work up to 140 full days or 280 half days a year (a day of up to four hours counts as half a day), or alternatively up to 20 hours a week as a working student. During the semester break they can work without these restrictions.',
        'হ্যাঁ। EU-র বাইরের student-রা বছরে সর্বোচ্চ 140 পূর্ণ দিন বা 280 অর্ধদিন কাজ করতে পারেন (৪ ঘণ্টা পর্যন্ত কাজ অর্ধদিন ধরা হয়), অথবা working student হিসেবে সপ্তাহে সর্বোচ্চ 20 ঘণ্টা। Semester break-এ এই সীমা থাকে না।',
      ),
      b(
        'To renew your residence permit you must still show that you can support yourself.',
        'Residence permit নবায়নের সময়ও নিজের খরচ চালাতে পারার প্রমাণ দেখাতে হয়।',
      ),
    ],
    [DE_MIIG_WORK, DE_MIIG_SKILLED_ACT, DE_MIIG_VISA_STUDY],
    { allDegrees: true },
  );

const afterGraduation = (id: string, status?: GuideStatus) =>
  qa(
    id,
    b('Can you stay in Germany after graduation?', 'Graduation-এর পরে জার্মানিতে থাকা যায় কি?'),
    [
      b(
        'Yes. After successfully completing your degree you can apply for a residence permit to look for a job, for up to 18 months, and you may work in any job during that time.',
        'হ্যাঁ। Degree সফলভাবে শেষ করলে চাকরি খোঁজার জন্য সর্বোচ্চ ১৮ মাসের residence permit-এর আবেদন করা যায়, আর এই সময়ে যেকোনো কাজ করা যায়।',
      ),
      b(
        'Once you find qualified employment, you can switch to a residence permit for skilled workers or an EU Blue Card. Graduates of German universities can apply for a settlement permit after working in Germany for more than two years.',
        'যোগ্যতা অনুযায়ী চাকরি পেলে skilled worker-এর residence permit বা EU Blue Card-এ বদলানো যায়। জার্মান university-র graduate-রা জার্মানিতে দুই বছরের বেশি কাজ করার পর settlement permit-এর আবেদন করতে পারেন।',
      ),
    ],
    [DE_MIIG_VISA_STUDY, DE_DAAD_BD_BACHELOR],
    status ? { status } : { allDegrees: true },
  );

const visaTime = (id: string, dhakaNote: Bilingual, daadSource: SourceRef, daadText: Bilingual) =>
  qa(
    id,
    b('How long does the visa take? Is there a waiting time?', 'Visa-তে কত সময় লাগে? অপেক্ষার সময় আছে কি?'),
    [
      b(
        'The German Embassy Dhaka says processing takes around 4 weeks once your application is complete, and that a visa can only be issued within 3 months of your arrival date in Germany.',
        'German Embassy Dhaka বলে, আবেদন সম্পূর্ণ হলে processing-এ প্রায় ৪ সপ্তাহ লাগে, আর জার্মানিতে পৌঁছানোর তারিখের ৩ মাসের মধ্যেই শুধু visa দেওয়া হয়।',
      ),
      dhakaNote,
    ],
    [DE_EMBASSY_STUDY, DE_EMBASSY_NATIONAL, DE_EMBASSY_FAQ, daadSource],
    {
      status: 'needs-review',
      discrepancy: b(`The Embassy gives around 4 weeks of processing; ${daadText.en}`, `Embassy বলে processing-এ প্রায় ৪ সপ্তাহ; ${daadText.bn}`),
    },
  );

const WAITING_TIME = b(
  'Before that there is a waiting time for an appointment. The Embassy’s notice on its new Consular Services Portal (January 2025) said the waiting time for bachelor’s and master’s students without a German or European scholarship stood at more than 27 months; its FAQ now says it cannot give an estimate. Scholarship holders (German or EU public funding) and PhD candidates count as "qualified students" and are processed sooner.',
  'তার আগে appointment-এর জন্য অপেক্ষা করতে হয়। নতুন Consular Services Portal নিয়ে Embassy-র notice-এ (January 2025) বলা ছিল, German বা European scholarship ছাড়া bachelor’s ও master’s student-দের অপেক্ষার সময় ২৭ মাসেরও বেশি; এখনকার FAQ বলে, তারা কোনো অনুমান দিতে পারছে না। জার্মান বা EU-র সরকারি অর্থে scholarship পাওয়া student আর PhD candidate-রা "qualified student" হিসেবে আগে সুযোগ পান।',
);

const bangladeshKnow = (id: string) =>
  qa(
    id,
    b('What should a Bangladeshi student know before applying?', 'আবেদনের আগে Bangladesh-এর student-দের কী জানা দরকার?'),
    [
      WAITING_TIME,
      b(
        'You register for the visa on the Consular Services Portal and upload all documents; only applicants with a valid admission letter can register. Master’s applications are taken in by VFS (since 2 January 2025); the Embassy’s staff decide every visa.',
        'Visa-র জন্য Consular Services Portal-এ register করে সব document upload করতে হয়; শুধু বৈধ admission letter থাকলেই register করা যায়। Master’s-এর আবেদন নেয় VFS (২ January ২০২৫ থেকে); প্রতিটি visa-র সিদ্ধান্ত নেন Embassy-র কর্মকর্তারা।',
      ),
      b(
        'Documents in Bengali need an English or German translation, and the Embassy may ask for extra documents or have certificates verified for an additional fee. APS is not used in Bangladesh.',
        'বাংলায় লেখা document-এর English বা German অনুবাদ লাগবে, আর Embassy বাড়তি document চাইতে বা বাড়তি fee নিয়ে certificate যাচাই করাতে পারে। Bangladesh-এ APS নেই।',
      ),
    ],
    [DE_EMBASSY_STUDY, DE_EMBASSY_FAQ, DE_CSP],
    { status: 'needs-review', allDegrees: true },
  );

// ------------------------------------------------------------------ documents (each explained once)

const E = DE_EMBASSY_STUDY;
export const DE_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Passport', 'Passport'),
    why: b('Your identity and travel document; the visa is placed in it.', 'আপনার পরিচয় ও ভ্রমণের document; visa এতেই লাগানো হয়।'),
    who: b('German Embassy Dhaka (visa); later the German authorities.', 'German Embassy Dhaka (visa); পরে জার্মান কর্তৃপক্ষ।'),
    when: b('At the visa application, and again after arrival.', 'Visa আবেদনের সময়, আর পৌঁছানোর পরেও।'),
    where: b('Visa appointment (Embassy or VFS).', 'Visa appointment (Embassy বা VFS)।'),
    prepare: b('Issued within the last 10 years, with at least two empty pages and no observations on the data page, plus an A4 copy of the data page.', 'গত ১০ বছরের মধ্যে ইস্যু করা, অন্তত দুটি খালি পাতা, data page-এ কোনো মন্তব্য নেই; সঙ্গে data page-এর A4 copy।'),
    groups: ['general', 'visa', 'arrival'],
    sources: [E],
  },
  {
    id: 'admission',
    name: b('Admission letter (Zulassungsbescheid)', 'Admission letter (Zulassungsbescheid)'),
    why: b('Shows that a German university or institution has accepted you.', 'দেখায় যে জার্মান university বা প্রতিষ্ঠান আপনাকে ভর্তি নিয়েছে।'),
    who: b('German Embassy Dhaka; you need it to register on the Consular Services Portal.', 'German Embassy Dhaka; Consular Services Portal-এ register করতেও লাগে।'),
    when: b('After the university admits you, before registering for the visa.', 'University ভর্তি নেওয়ার পরে, visa-র জন্য register করার আগে।'),
    where: b('Uploaded on the Consular Services Portal and brought to the appointment.', 'Consular Services Portal-এ upload করে appointment-এ নিয়ে যাবেন।'),
    prepare: b('The letter itself; for master’s visa applications the Embassy rejects applications without it.', 'Letter-টি নিজেই; master’s visa-র ক্ষেত্রে এটা ছাড়া আবেদন সঙ্গে সঙ্গে বাতিল হয়।'),
    groups: ['visa', 'bangladesh'],
    sources: [E, DE_EMBASSY_VFS_MASTER],
  },
  {
    id: 'hsc',
    name: b('HSC certificate and mark sheets', 'HSC সনদ ও mark sheet'),
    why: b('Your school-leaving qualification, which decides your route into a bachelor’s (Studienkolleg or direct).', 'আপনার স্কুল শেষের যোগ্যতা; এতে ঠিক হয় bachelor’s-এ ঢোকার পথ (Studienkolleg না সরাসরি)।'),
    who: b('The university or uni-assist, and the German Embassy Dhaka.', 'University বা uni-assist, আর German Embassy Dhaka।'),
    when: b('With the university application, and again for the visa.', 'University-র আবেদনের সঙ্গে, আবার visa-র জন্যও।'),
    where: b('University / uni-assist; visa appointment.', 'University বা uni-assist-এ; visa appointment-এ।'),
    prepare: b('Certificate and mark sheets from the Education Board, with English or German translations if needed.', 'শিক্ষা বোর্ডের সনদ ও mark sheet, দরকার হলে English বা German অনুবাদসহ।'),
    groups: ['general', 'visa', 'bangladesh'],
    sources: [E, DE_DAAD_BD_BACHELOR],
  },
  {
    id: 'degree-certificates',
    name: b('Degree certificates and transcripts', 'Degree সনদ ও transcript'),
    why: b('Proof of your previous studies in the relevant field.', 'সংশ্লিষ্ট বিষয়ে আগের পড়াশোনার প্রমাণ।'),
    who: b('The university or uni-assist, and the German Embassy Dhaka.', 'University বা uni-assist, আর German Embassy Dhaka।'),
    when: b('With the university application, and again for the visa.', 'University-র আবেদনের সঙ্গে, আবার visa-র জন্যও।'),
    where: b('University / uni-assist; visa appointment.', 'University বা uni-assist-এ; visa appointment-এ।'),
    prepare: b('Bachelor’s (and for a PhD, master’s) certificates and transcripts, translated if they are not in English or German.', 'Bachelor’s (PhD-র জন্য master’s-ও) সনদ ও transcript; English বা German-এ না হলে অনুবাদসহ।'),
    groups: ['general', 'visa'],
    degrees: ['masters', 'phd'],
    sources: [E],
  },
  {
    id: 'language',
    name: b('Language certificate (IELTS / TOEFL / German)', 'ভাষার certificate (IELTS / TOEFL / German)'),
    why: b('Shows you can follow the program in its teaching language.', 'দেখায় যে program-এর ভাষায় আপনি পড়তে পারবেন।'),
    who: b('The university (its own score), and the German Embassy Dhaka.', 'University (তার নিজের score), আর German Embassy Dhaka।'),
    when: b('Usually with the university application; again for the visa.', 'সাধারণত university-র আবেদনের সঙ্গে; আবার visa-র জন্যও।'),
    where: b('University / uni-assist; visa appointment.', 'University বা uni-assist-এ; visa appointment-এ।'),
    prepare: b('A test taken in person (the Embassy generally does not accept online certificates): TOEFL, IELTS, TELC or another ALTE-certified test; for German programs e.g. TestDaF or DSH.', 'সশরীরে দেওয়া পরীক্ষা (Embassy সাধারণত online certificate নেয় না): TOEFL, IELTS, TELC বা অন্য ALTE-স্বীকৃত test; German program-এর জন্য যেমন TestDaF বা DSH।'),
    groups: ['program', 'visa'],
    sources: [E, DE_EMBASSY_FAQ],
  },
  {
    id: 'motivation',
    name: b('Letter of motivation', 'Letter of motivation'),
    why: b('The Embassy uses it to understand your study plan.', 'Embassy এটা দিয়ে আপনার পড়াশোনার পরিকল্পনা বোঝে।'),
    who: b('German Embassy Dhaka (universities may ask for their own).', 'German Embassy Dhaka (university-ও নিজের জন্য চাইতে পারে)।'),
    when: b('For the visa application.', 'Visa আবেদনের সময়।'),
    where: b('Visa appointment.', 'Visa appointment-এ।'),
    prepare: b('Answer the Embassy’s questions: what you studied and why, the content of those studies, what you want to study now and why, why Germany, and your plans after the degree.', 'Embassy-র প্রশ্নের উত্তর দিন: আগে কী পড়েছেন ও কেন, সেই পড়ার বিষয়বস্তু, এখন কী পড়তে চান ও কেন, কেন জার্মানি, আর degree শেষে কী করতে চান।'),
    groups: ['visa'],
    sources: [E],
  },
  {
    id: 'cv',
    name: b('CV (with employment history)', 'CV (চাকরির ইতিহাসসহ)'),
    why: b('Shows your education and work history.', 'আপনার শিক্ষা ও কাজের ইতিহাস দেখায়।'),
    who: b('German Embassy Dhaka; many programs ask for one too.', 'German Embassy Dhaka; অনেক program-ও চায়।'),
    when: b('For the visa application (and often the university application).', 'Visa আবেদনের সময় (অনেক সময় university-র আবেদনেও)।'),
    where: b('Visa appointment; university / uni-assist.', 'Visa appointment-এ; university বা uni-assist-এ।'),
    prepare: b('Include jobs and, if possible, references.', 'চাকরির তথ্য দিন, সম্ভব হলে reference-ও।'),
    groups: ['visa', 'program'],
    sources: [E],
  },
  {
    id: 'funds',
    name: b('Proof of financial means (blocked account, scholarship or sponsor)', 'আর্থিক সামর্থ্যের প্রমাণ (blocked account, scholarship বা sponsor)'),
    why: b('Shows you can pay for your studies and living in Germany.', 'দেখায় যে জার্মানিতে পড়া ও থাকার খরচ আপনি চালাতে পারবেন।'),
    who: b('German Embassy Dhaka; later the foreigners authority when you renew your permit.', 'German Embassy Dhaka; পরে permit নবায়নের সময় foreigners authority।'),
    when: b('Before the visa application.', 'Visa আবেদনের আগে।'),
    where: b('Visa appointment.', 'Visa appointment-এ।'),
    prepare: b('A blocked account with at least EUR 11,904 (EUR 992 a month), a scholarship confirmation, or a formal sponsorship letter (Verpflichtungserklärung) from a sponsor living in Germany.', 'অন্তত EUR 11,904 (মাসে EUR 992)-এর blocked account, scholarship-এর confirmation, অথবা জার্মানিতে থাকা sponsor-এর formal sponsorship letter (Verpflichtungserklärung)।'),
    groups: ['visa'],
    sources: [E],
  },
  {
    id: 'travel-insurance',
    name: b('Travel health insurance', 'Travel health insurance'),
    why: b('Covers you from arrival until you enrol and take out student insurance.', 'পৌঁছানো থেকে ভর্তি হয়ে student insurance নেওয়া পর্যন্ত আপনাকে cover করে।'),
    who: b('German Embassy Dhaka.', 'German Embassy Dhaka (জার্মান দূতাবাস)।'),
    when: b('For the visa application.', 'Visa আবেদনের সময়।'),
    where: b('Visa appointment.', 'Visa appointment-এ।'),
    prepare: b('Valid from arrival in Germany to the date of enrolment, for at least 3 months.', 'জার্মানিতে পৌঁছানো থেকে enrolment-এর তারিখ পর্যন্ত, অন্তত ৩ মাস।'),
    groups: ['visa'],
    sources: [E],
  },
  {
    id: 'visa-form',
    name: b('Visa application form, declaration and photo', 'Visa application form, declaration ও ছবি'),
    why: b('The formal application for the national (long-stay) visa.', 'National (দীর্ঘমেয়াদি) visa-র আনুষ্ঠানিক আবেদন।'),
    who: b('German Embassy Dhaka.', 'German Embassy Dhaka (জার্মান দূতাবাস)।'),
    when: b('At the visa appointment.', 'Visa appointment-এর সময়।'),
    where: b('Visa appointment (Embassy or VFS).', 'Visa appointment (Embassy বা VFS)।'),
    prepare: b('The VIDEX application form and declaration, signed; one biometric photo (35 × 45 mm) not older than 6 months; the visa fee.', 'Sign করা VIDEX application form ও declaration; ৬ মাসের পুরনো নয় এমন একটি biometric ছবি (35 × 45 mm); visa fee।'),
    groups: ['visa'],
    sources: [E, DE_EMBASSY_VFS_MASTER],
  },
  {
    id: 'translations',
    name: b('English or German translations', 'English বা German অনুবাদ'),
    why: b('The Embassy needs to read every document.', 'Embassy-কে প্রতিটি document পড়তে হয়।'),
    who: b('German Embassy Dhaka.', 'German Embassy Dhaka (জার্মান দূতাবাস)।'),
    when: b('With the visa documents.', 'Visa-র document-এর সঙ্গে।'),
    where: b('Visa appointment.', 'Visa appointment-এ।'),
    prepare: b('Every document in Bengali (or another language) with an English or German translation; do not submit both versions, and prefer German.', 'বাংলা (বা অন্য ভাষার) প্রতিটি document-এর English বা German অনুবাদ; দুটো একসাথে দেবেন না, German হলে ভালো।'),
    groups: ['bangladesh', 'visa'],
    sources: [E],
  },
  {
    id: 'supervisor-letter',
    name: b('Supervisor’s acceptance or PhD letter', 'Supervisor-এর acceptance বা PhD letter'),
    why: b('Shows a supervisor or doctoral program has accepted you.', 'দেখায় যে একজন supervisor বা PhD program আপনাকে নিয়েছে।'),
    who: b('The university; the German Embassy Dhaka ("scholarship or PhD letter, if applicable").', 'University; German Embassy Dhaka ("প্রযোজ্য হলে scholarship বা PhD letter")।'),
    when: b('Before applying to the university and the visa.', 'University ও visa-র আবেদনের আগে।'),
    where: b('University; visa appointment.', 'University-তে; visa appointment-এ।'),
    prepare: b('The letter of acceptance from your supervisor.', 'আপনার supervisor-এর দেওয়া letter of acceptance।'),
    groups: ['program', 'visa'],
    degrees: ['phd'],
    sources: [DE_DAAD_BD_PHD, E],
  },
  {
    id: 'address-registration',
    name: b('Address registration (Anmeldung)', 'ঠিকানা নিবন্ধন (Anmeldung)'),
    why: b('Everyone living in Germany must register their address.', 'জার্মানিতে যিনিই থাকেন, তাঁকে ঠিকানা register করতে হয়।'),
    who: b('Residents’ Registration Office of your town.', 'আপনার শহরের Residents’ Registration Office।'),
    when: b('Within two weeks of moving in.', 'বাসায় ওঠার দুই সপ্তাহের মধ্যে।'),
    where: b('In Germany.', 'জার্মানিতে।'),
    prepare: b('Your passport and the confirmation from your landlord (ask the office which documents it needs).', 'Passport আর বাড়িওয়ালার confirmation (কোন document লাগবে তা office-কে জিজ্ঞেস করুন)।'),
    groups: ['arrival'],
    status: 'partly-verified',
    sources: [DE_MIIG_REGISTRATION],
  },
  {
    id: 'residence-permit',
    name: b('Residence permit for study', 'পড়াশোনার residence permit'),
    why: b('Your visa is replaced by a residence permit for your studies.', 'পড়াশোনার জন্য visa-র জায়গায় residence permit নিতে হয়।'),
    who: b('The local foreigners authority (Ausländerbehörde).', 'স্থানীয় foreigners authority (Ausländerbehörde)।'),
    when: b('Within the first three months of your stay (DAAD).', 'থাকার প্রথম তিন মাসের মধ্যে (DAAD)।'),
    where: b('In Germany.', 'জার্মানিতে।'),
    prepare: b('It is usually issued for an initial two years; you must show again that you can support yourself when you renew it.', 'সাধারণত প্রথমবার দুই বছরের জন্য দেওয়া হয়; নবায়নের সময় আবার নিজের খরচ চালানোর প্রমাণ দেখাতে হয়।'),
    groups: ['arrival'],
    sources: [DE_DAAD_BD_BACHELOR, DE_MIIG_VISA_STUDY, DE_MIIG_WORK],
  },
];

// ------------------------------------------------------------------ costs

const d = (n: number) => n;
const OFFICIAL_ALL: GuideCost[] = [
  {
    id: 'blocked-account',
    label: b('Money to show for the visa (blocked account)', 'Visa-র জন্য দেখানোর টাকা (blocked account)'),
    value: b('EUR 11,904 for one year (EUR 992 per month)', 'এক বছরের জন্য EUR 11,904 (মাসে EUR 992)'),
    amount: { value: d(11904), currency: 'EUR', period: 'year' },
    appliesTo: b('Student visa applicants at the German Embassy Dhaka', 'German Embassy Dhaka-য় student visa-র আবেদনকারী'),
    note: b('Not a fee: it is your own money, released month by month.', 'এটা fee নয়: আপনার নিজের টাকা, মাসে মাসে তোলা যায়।'),
    source: DE_EMBASSY_STUDY,
  },
  {
    id: 'bw-tuition',
    label: b('Tuition in Baden-Württemberg (non-EU students)', 'Baden-Württemberg-এ tuition (non-EU student)'),
    value: b('EUR 1,500 per semester', 'প্রতি semester-এ EUR 1,500'),
    amount: { value: d(1500), currency: 'EUR', period: 'semester' },
    appliesTo: b('Public universities in Baden-Württemberg only; most other states charge no tuition for these programs', 'শুধু Baden-Württemberg-এর public university; অন্য বেশিরভাগ রাজ্যে এসব program-এ tuition নেই'),
    source: DE_SIG_FUNDING,
  },
  {
    id: 'stuttgart',
    label: b('University of Stuttgart (non-EU students)', 'University of Stuttgart (non-EU student)'),
    value: b('EUR 1,500 tuition + EUR 184 semester fee, per semester', 'প্রতি semester-এ EUR 1,500 tuition + EUR 184 semester fee'),
    amount: { value: d(1684), currency: 'EUR', period: 'semester' },
    appliesTo: b('One university as an example', 'উদাহরণ হিসেবে একটি university'),
    source: DE_STUTTGART_FEES,
  },
  {
    id: 'visa-fee',
    label: b('National visa fee (German Embassy Dhaka)', 'National visa fee (German Embassy Dhaka)'),
    value: b('EUR 75 for adults, paid in taka and in cash; not refunded if the visa is refused', 'প্রাপ্তবয়স্কদের EUR 75, টাকায় নগদে দিতে হয়; visa না পেলে ফেরত দেওয়া হয় না'),
    amount: { value: d(75), currency: 'EUR', period: 'one-time' },
    appliesTo: b('Adult national visa applicants', 'প্রাপ্তবয়স্ক national visa আবেদনকারী'),
    source: DE_EMBASSY_NATIONAL,
  },
];
const ESTIMATES: GuideCost[] = [
  { id: 'living', label: b('Living cost', 'থাকা-খাওয়ার খরচ'), value: b('EUR 900–1,200 per month', 'মাসে EUR 900–1,200'), amount: { value: 900, max: 1200, currency: 'EUR', period: 'month' }, source: DE_SIG_FUNDING },
  {
    id: 'living-daad-bd',
    label: b('Living cost (DAAD Bangladesh)', 'থাকা-খাওয়ার খরচ (DAAD Bangladesh)'),
    value: b('About EUR 1,150 per month', 'মাসে প্রায় EUR 1,150'),
    amount: { value: 1150, currency: 'EUR', period: 'month' },
    note: b('Based on a 2023 Deutsches Studentenwerk survey; rent EUR 410, food EUR 198, health insurance EUR 100 of it.', '২০২৩-এর Deutsches Studentenwerk survey অনুযায়ী; এর মধ্যে ভাড়া EUR 410, খাবার EUR 198, health insurance EUR 100।'),
    source: DE_DAAD_BD_BACHELOR,
  },
  { id: 'rent', label: b('Accommodation', 'থাকার জায়গা'), value: b('EUR 290–560 per month', 'মাসে EUR 290–560'), amount: { value: 290, max: 560, currency: 'EUR', period: 'month' }, note: b('Above average in Cologne, Munich, Hamburg, Düsseldorf and Frankfurt.', 'Cologne, Munich, Hamburg, Düsseldorf ও Frankfurt-এ গড়ের চেয়ে বেশি।'), source: DE_SIG_FUNDING },
  { id: 'semester-fee', label: b('Semester fee', 'Semester fee'), value: b('About EUR 70–430 per semester', 'প্রতি semester-এ প্রায় EUR 70–430'), amount: { value: 70, max: 430, currency: 'EUR', period: 'semester' }, note: b('Depends on the university; often includes a transport ticket.', 'University অনুযায়ী আলাদা; অনেক সময় যাতায়াতের ticket থাকে।'), source: DE_SIG_FUNDING },
  { id: 'insurance', label: b('Public health insurance', 'Public health insurance'), value: b('About EUR 110 per month (age 30 or under)', 'মাসে প্রায় EUR 110 (বয়স ৩০ বা কম)'), amount: { value: 110, currency: 'EUR', period: 'month' }, source: DE_SIG_FUNDING },
];

// ------------------------------------------------------------------ degree guides

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('3–4 years · Studienkolleg or 1 year of university first', '৩–৪ বছর · আগে Studienkolleg বা ১ বছর university'),
  intro: b(
    'A bachelor’s in Germany generally takes 3–4 years. From Bangladesh, the HSC alone does not give direct admission: most students first complete a Studienkolleg (and its exam) or one year of university study at home.',
    'জার্মানিতে bachelor’s সাধারণত ৩–৪ বছরের। Bangladesh থেকে শুধু HSC দিয়ে সরাসরি ভর্তি হয় না: বেশিরভাগ student-কে আগে Studienkolleg (আর তার পরীক্ষা) বা দেশে এক বছর university-তে পড়তে হয়।',
  ),
  costs: { official: OFFICIAL_ALL, estimates: ESTIMATES },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'who',
          b('Can you apply with the HSC?', 'HSC দিয়ে আবেদন করা যায় কি?'),
          [
            b(
              'Not directly. DAAD Bangladesh says a class-12 certificate from the Bangladeshi boards does not give direct admission to a German university. You are eligible for a bachelor’s if you have one of these:',
              'সরাসরি নয়। DAAD Bangladesh বলে, Bangladesh-এর বোর্ডের class-12 সনদ দিয়ে জার্মান university-তে সরাসরি ভর্তি হয় না। নিচের যেকোনো একটি থাকলে bachelor’s-এ আবেদন করা যায়:',
            ),
          ],
          [DE_DAAD_BD_BACHELOR],
          {
            list: [
              b('The Studienkolleg and its assessment exam (Feststellungsprüfung, FSP) in Germany', 'জার্মানিতে Studienkolleg আর তার মূল্যায়ন পরীক্ষা (Feststellungsprüfung, FSP)'),
              b('One completed academic year at a university at home in the relevant subject (subject-specific admission)', 'দেশে সংশ্লিষ্ট বিষয়ে university-তে এক শিক্ষাবর্ষ শেষ করা (বিষয়ভিত্তিক ভর্তি)'),
              b('IB, GCE or a similar internationally recognised examination with the required subjects', 'প্রয়োজনীয় বিষয়সহ IB, GCE বা একই ধরনের আন্তর্জাতিক পরীক্ষা'),
            ],
          },
        ),
        qa(
          'studienkolleg',
          b('What is the Studienkolleg?', 'Studienkolleg কী?'),
          [
            b(
              'A full-time preparatory course in Germany (about 32 hours a week, usually up to two semesters) that ends with the Feststellungsprüfung (FSP). You apply directly or through uni-assist, and sit an entrance exam in Germany. Studienkollegs at state universities charge no tuition.',
              'জার্মানিতে একটি full-time প্রস্তুতিমূলক course (সপ্তাহে প্রায় ৩২ ঘণ্টা, সাধারণত দুই semester পর্যন্ত), শেষে Feststellungsprüfung (FSP)। সরাসরি বা uni-assist দিয়ে আবেদন করবেন, আর জার্মানিতে একটি ভর্তি পরীক্ষা দেবেন। রাষ্ট্রীয় university-র Studienkolleg-এ tuition নেই।',
            ),
            b(
              'Courses follow your subject: M (medicine, biology), T (maths, science, technology), W (business, economics, social sciences), G (humanities), S (languages); universities of applied sciences have their own courses. Passing the FSP does not guarantee a place: you still apply to the university.',
              'বিষয় অনুযায়ী course: M (medicine, biology), T (গণিত, বিজ্ঞান, প্রযুক্তি), W (business, অর্থনীতি, সমাজবিজ্ঞান), G (মানবিক), S (ভাষা); university of applied sciences-এর আলাদা course আছে। FSP পাস করলেই ভর্তি নিশ্চিত নয়: university-তে আলাদা আবেদন করতে হয়।',
            ),
            b(
              'Most Studienkollegs teach in German; English-taught ones are few, and their students then apply for the fewer English-taught bachelor’s programs.',
              'বেশিরভাগ Studienkolleg German-এ পড়ায়; English-এ পড়ানো Studienkolleg কম, আর সেখান থেকে তুলনামূলক কম English bachelor’s program-এ আবেদন করতে হয়।',
            ),
          ],
          [DE_DAAD_BD_BACHELOR],
          {
            discrepancy: b(
              'DAAD Bangladesh gives two German levels for the Studienkolleg on the same page: "approx. B2" for admission, and "approx. B1" in its language section. Check the Studienkolleg you apply to.',
              'DAAD Bangladesh একই page-এ Studienkolleg-এর জন্য দুই রকম German level দেয়: ভর্তির জন্য "প্রায় B2", আর ভাষার অংশে "প্রায় B1"। যে Studienkolleg-এ আবেদন করবেন, সেখানে দেখে নিন।',
            ),
          },
        ),
        qa(
          'grades',
          b('What grades are needed?', 'কত grade লাগে?'),
          [
            b(
              'Not verified yet. The official sources we read give no national minimum grade; each program sets its own criteria. DAAD’s admission database gives a non-binding check of whether your certificates make you eligible.',
              'এখনো যাচাই হয়নি। আমরা যে official source পড়েছি, তাতে জাতীয় কোনো minimum grade নেই; প্রতিটি program নিজের শর্ত ঠিক করে। আপনার সনদ দিয়ে আবেদন করা যায় কিনা, DAAD-এর admission database-এ বাধ্যবাধকতাহীন একটা যাচাই করতে পারেন।',
            ),
          UNIS_DECIDE,
          ],
          [DE_DAAD_ADMISSION_DB, DE_DAAD_BD_BACHELOR],
          { status: 'not-verified' },
        ),
        aps('aps'),
      ],
    },
    {
      id: 'language',
      title: b('Language', 'ভাষা'),
      items: [
        qa(
          'english-programs',
          b('Can you study in English?', 'English-এ পড়া যায় কি?'),
          [
            b(
              'Yes, but there are fewer options: DAAD Bangladesh counts around 300 English-taught bachelor’s courses against around 2,000 in German.',
              'হ্যাঁ, তবে সুযোগ কম: DAAD Bangladesh-এর হিসাবে English-এ প্রায় ৩০০টি bachelor’s course, আর German-এ প্রায় ২,০০০টি।',
            ),
          ],
          [DE_DAAD_BD_BACHELOR],
        ),
        englishProof('ielts'),
        germanProof('german'),
      ],
    },
    {
      id: 'costs',
      title: b('Costs and money to show', 'খরচ ও দেখানোর টাকা'),
      items: [tuition('tuition', 'bachelors'), semesterFee('semester-fee'), livingCost('living'), blockedAccount('funds'), { embed: 'costs' }],
    },
    { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' }] },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        howToApply('how'),
        whenToApply('when', [
          b(
            'DAAD Bangladesh’s timeline for a winter start: research from October, check programs January–March, apply March–June, and apply for the visa as soon as you have the admission letter.',
            'Winter-এ শুরু করতে DAAD Bangladesh-এর সময়সূচি: October থেকে খোঁজখবর, January–March-এ program দেখা, March–June-এ আবেদন, আর admission letter পাওয়ামাত্র visa-র আবেদন।',
          ),
        ]),
        admissionTime('admission-time'),
      ],
    },
    {
      id: 'scholarships',
      title: b('Scholarships', 'Scholarship'),
      items: [
        { embed: 'scholarships' },
        qa(
          'daad',
          b('Does DAAD fund bachelor’s students?', 'DAAD কি bachelor’s-এ scholarship দেয়?'),
          [b('Generally not: DAAD Bangladesh says DAAD funding is available in principle for research, that is master’s, PhD and above. Search the DAAD scholarship database for other options.', 'সাধারণত না: DAAD Bangladesh বলে, DAAD-এর funding মূলত research-এর জন্য, অর্থাৎ master’s, PhD ও তার উপরে। অন্য সুযোগের জন্য DAAD-এর scholarship database দেখুন।')],
          [DE_DAAD_BD_BACHELOR, DE_DAAD_SCHOLARSHIP_DB],
        ),
      ],
    },
    {
      id: 'universities',
      title: b('Universities', 'University'),
      items: [
        qa(
          'types',
          b('What types of universities are there?', 'কী ধরনের university আছে?'),
          [
            b(
              'Universities and universities of technology (TU) are research-oriented, offer a wide range of subjects and can award doctorates. Universities of applied sciences (HAW / FH) are practice-oriented, mainly in engineering, business, social sciences and design, with strong links to industry; they do not award doctorates.',
              'University আর university of technology (TU) গবেষণাভিত্তিক, অনেক বিষয় পড়ায় আর PhD দিতে পারে। University of applied sciences (HAW / FH) ব্যবহারিকভিত্তিক, মূলত engineering, business, সমাজবিজ্ঞান ও design পড়ায়, শিল্পের সঙ্গে ঘনিষ্ঠ যোগাযোগ; এরা PhD দেয় না।',
            ),
            b('DAAD says no single university is ahead of all others, neither in one subject nor across all subjects; this guide does not order universities by quality either.', 'DAAD বলে, এক বিষয়ে বা সব বিষয় মিলিয়ে কোনো একটি university সবার চেয়ে এগিয়ে নয়; এই guide-ও মান অনুযায়ী university সাজায় না।'),
          ],
          [DE_DAAD_BD_BACHELOR],
        ),
        { embed: 'universities' },
      ],
    },
    { id: 'work', title: b('Part-time work', 'Part-time কাজ'), items: [work('work')] },
    {
      id: 'visa',
      title: b('Visa', 'Visa'),
      items: [
        qa(
          'visa-type',
          b('Which visa, and where do you apply?', 'কোন visa, আর কোথায় আবেদন?'),
          [
            b(
              'A national (long-stay, "D") visa for study, from the German Embassy Dhaka. Register on the Consular Services Portal first; only applicants with a valid admission letter can register, and all documents are uploaded there.',
              'পড়াশোনার জন্য national (দীর্ঘমেয়াদি, "D") visa, German Embassy Dhaka থেকে। আগে Consular Services Portal-এ register করবেন; শুধু বৈধ admission letter থাকলেই register করা যায়, আর সব document সেখানে upload করতে হয়।',
            ),
            b(
              'Bachelor’s applicants from the Embassy’s older waiting list get a document-submission e-mail from the Embassy and then an appointment at the Embassy, where they submit documents and biometrics (fingerprints). The Embassy decides the visa.',
              'Embassy-র পুরনো waiting list-এর bachelor’s আবেদনকারীরা Embassy থেকে document জমার e-mail পান, তারপর Embassy-তে appointment, সেখানে document আর biometrics (আঙুলের ছাপ) জমা দেন। Visa-র সিদ্ধান্ত নেয় Embassy।',
            ),
          ],
          [DE_EMBASSY_STUDY, DE_CSP],
        ),
        visaTime(
          'visa-time',
          WAITING_TIME,
          DE_DAAD_BD_BACHELOR,
          b('DAAD Bangladesh’s bachelor page says the visa procedure "can take around two months".', 'DAAD Bangladesh-এর bachelor page বলে visa-র প্রক্রিয়ায় "প্রায় দুই মাস" লাগতে পারে।'),
        ),
        bangladeshKnow('bangladesh'),
      ],
    },
    { id: 'after', title: b('After graduation', 'Graduation-এর পরে'), items: [afterGraduation('after')] },
  ],
};

const MASTERS: DegreeGuide = {
  level: 'masters',
  card: b("after a 4-year bachelor's · 2,000+ English programs", '৪ বছরের bachelor’s শেষে · ২,০০০+ English program'),
  intro: b(
    'A 4-year bachelor’s from Bangladesh is treated at par with a German bachelor’s, so most German universities consider you eligible for a master’s if you meet their other criteria. Over 2,000 international programs teach in English.',
    'Bangladesh-এর ৪ বছরের bachelor’s জার্মান bachelor’s-এর সমান ধরা হয়, তাই অন্য শর্ত পূরণ করলে বেশিরভাগ জার্মান university master’s-এ আবেদনযোগ্য মনে করে। ২,০০০-এর বেশি international program English-এ পড়ায়।',
  ),
  costs: { official: OFFICIAL_ALL, estimates: ESTIMATES },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b('What academic qualification do you need?', 'কোন শিক্ষাগত যোগ্যতা লাগে?'),
          [
            b(
              'A bachelor’s degree. DAAD Bangladesh says a four-year bachelor’s from Bangladesh is treated at par with a German bachelor’s; with a three-year bachelor’s, contact the course coordinator before applying.',
              'একটি bachelor’s degree। DAAD Bangladesh বলে, Bangladesh-এর চার বছরের bachelor’s জার্মান bachelor’s-এর সমান; তিন বছরের bachelor’s হলে আবেদনের আগে course coordinator-এর সঙ্গে যোগাযোগ করুন।',
            ),
            UNIS_DECIDE,
          ],
          [DE_DAAD_BD_MASTER],
        ),
        qa(
          'related',
          b('Must your bachelor’s be in a related subject? What grades?', 'Bachelor’s কি সংশ্লিষ্ট বিষয়ে হতে হবে? কত grade?'),
          [
            b(
              'Not verified yet. The official sources we read set no national rule on related subjects or a minimum grade; each program decides. Some universities also ask for TOEFL / IELTS / GRE / GMAT scores (GMAT, for example, for economics or law).',
              'এখনো যাচাই হয়নি। আমরা যে official source পড়েছি, তাতে সংশ্লিষ্ট বিষয় বা minimum grade নিয়ে কোনো জাতীয় নিয়ম নেই; প্রতিটি program নিজে ঠিক করে। কিছু university TOEFL / IELTS / GRE / GMAT score-ও চায় (যেমন economics বা law-তে GMAT)।',
            ),
          ],
          [DE_DAAD_BD_MASTER],
          { status: 'not-verified' },
        ),
        aps('aps'),
      ],
    },
    {
      id: 'language',
      title: b('Language', 'ভাষা'),
      items: [
        qa(
          'english-programs',
          b('Can you study in English?', 'English-এ পড়া যায় কি?'),
          [b('Yes. DAAD Bangladesh says Germany offers over 2,000 international programs with English as the sole or main language; a few ask you to learn some German during the master’s.', 'হ্যাঁ। DAAD Bangladesh বলে, জার্মানিতে ২,০০০-এর বেশি international program পুরোপুরি বা মূলত English-এ; কয়েকটিতে master’s চলাকালীন কিছু German শিখতে হয়।')],
          [DE_DAAD_BD_MASTER],
        ),
        englishProof('ielts'),
        germanProof('german', [], [DE_DAAD_BD_MASTER]),
      ],
    },
    {
      id: 'costs',
      title: b('Costs and money to show', 'খরচ ও দেখানোর টাকা'),
      items: [tuition('tuition', 'masters'), semesterFee('semester-fee'), livingCost('living'), blockedAccount('funds'), { embed: 'costs' }],
    },
    { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' }] },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        howToApply('how', [
          b(
            'Some universities ask for a preliminary review documentation (VPD) from uni-assist, which you then submit to the university yourself before its deadline.',
            'কিছু university uni-assist-এর preliminary review documentation (VPD) চায়; সেটা deadline-এর আগে আপনাকে নিজে university-তে জমা দিতে হয়।',
          ),
        ]),
        whenToApply('when'),
        admissionTime('admission-time'),
      ],
    },
    {
      id: 'scholarships',
      title: b('Scholarships', 'Scholarship'),
      items: [
        { embed: 'scholarships' },
        qa(
          'daad-master',
          b('Which DAAD scholarships are there for a master’s?', 'Master’s-এর জন্য DAAD-এর কোন scholarship আছে?'),
          [b('DAAD Bangladesh lists the Helmut-Schmidt-Programme (Master’s scholarships for Public Policy and Good Governance) and the development-related postgraduate courses (EPOS, above). The DAAD scholarship database has the full list.', 'DAAD Bangladesh-এর তালিকায় আছে Helmut-Schmidt-Programme (Public Policy and Good Governance-এ master’s scholarship) আর development-related postgraduate courses (EPOS, উপরে)। পুরো তালিকা DAAD-এর scholarship database-এ।')],
          [DE_DAAD_BD_MASTER, DE_DAAD_SCHOLARSHIP_DB],
        ),
      ],
    },
    {
      id: 'universities',
      title: b('Universities', 'University'),
      items: [
        qa(
          'types',
          b('University or university of applied sciences?', 'University নাকি university of applied sciences?'),
          [b('Universities and TUs are research-oriented and can award doctorates; universities of applied sciences (HAW / FH) are practice-oriented and do not award doctorates, but a master’s from a HAW in principle lets you apply for a PhD at a university.', 'University আর TU গবেষণাভিত্তিক, PhD দিতে পারে; university of applied sciences (HAW / FH) ব্যবহারিকভিত্তিক, PhD দেয় না, তবে HAW-এর master’s দিয়ে নীতিগতভাবে university-তে PhD-র আবেদন করা যায়।')],
          [DE_DAAD_BD_BACHELOR],
        ),
        { embed: 'universities' },
      ],
    },
    { id: 'work', title: b('Part-time work', 'Part-time কাজ'), items: [work('work')] },
    {
      id: 'visa',
      title: b('Visa', 'Visa'),
      items: [
        qa(
          'visa-type',
          b('Which visa, and where do you apply?', 'কোন visa, আর কোথায় আবেদন?'),
          [
            b(
              'A national (long-stay, "D") visa for study. Register on the Consular Services Portal; since 2 January 2025 master’s applications are taken in by VFS, where you submit your documents and biometrics. VFS does not decide: the Embassy’s staff decide every visa.',
              'পড়াশোনার জন্য national (দীর্ঘমেয়াদি, "D") visa। Consular Services Portal-এ register করবেন; ২ January ২০২৫ থেকে master’s-এর আবেদন নেয় VFS, সেখানে document আর biometrics জমা দেবেন। সিদ্ধান্ত VFS নেয় না: প্রতিটি visa-র সিদ্ধান্ত নেন Embassy-র কর্মকর্তারা।',
            ),
          ],
          [DE_EMBASSY_STUDY, DE_EMBASSY_FAQ, DE_CSP],
        ),
        visaTime(
          'visa-time',
          WAITING_TIME,
          DE_DAAD_BD_BACHELOR,
          b('DAAD Bangladesh says the visa procedure "can take around two months".', 'DAAD Bangladesh বলে visa-র প্রক্রিয়ায় "প্রায় দুই মাস" লাগতে পারে।'),
        ),
        bangladeshKnow('bangladesh'),
      ],
    },
    { id: 'after', title: b('After graduation', 'Graduation-এর পরে'), items: [afterGraduation('after')] },
  ],
};

const PHD: DegreeGuide = {
  level: 'phd',
  card: b('3–5 years · supervisor or structured program', '৩–৫ বছর · supervisor বা structured program'),
  intro: b(
    'A PhD in Germany follows one of two routes: an individual doctorate with a supervisor (about 3–5 years) or a structured doctoral program, largely in English (about three years). A master’s from Bangladesh is treated at par with a German master’s.',
    'জার্মানিতে PhD দুই পথে হয়: একজন supervisor-এর অধীনে individual doctorate (প্রায় ৩–৫ বছর), অথবা structured doctoral program, বেশিরভাগ English-এ (প্রায় তিন বছর)। Bangladesh-এর master’s জার্মান master’s-এর সমান ধরা হয়।',
  ),
  costs: { official: OFFICIAL_ALL.filter((c) => c.id === 'blocked-account' || c.id === 'visa-fee'), estimates: ESTIMATES },
  sections: [
    {
      id: 'eligibility',
      title: b('Routes and eligibility', 'পথ ও যোগ্যতা'),
      items: [
        qa(
          'routes',
          b('What are the two routes to a PhD?', 'PhD-র দুটো পথ কী?'),
          [
            b(
              'Individual doctorate: you find a supervisor (Doktorvater / Doktormutter) at a German university who agrees to guide your research; it offers a lot of freedom and takes about 3–5 years.',
              'Individual doctorate: জার্মান university-তে একজন supervisor (Doktorvater / Doktormutter) খুঁজবেন, যিনি আপনার গবেষণা তত্ত্বাবধানে রাজি; এতে স্বাধীনতা বেশি, সময় লাগে প্রায় ৩–৫ বছর।',
            ),
            b(
              'Structured doctoral program: internationally oriented, largely in English, supervised by several professors, about three years.',
              'Structured doctoral program: আন্তর্জাতিকমুখী, বেশিরভাগ English-এ, কয়েকজন শিক্ষকের তত্ত্বাবধানে, প্রায় তিন বছর।',
            ),
          ],
          [DE_DAAD_BD_PHD],
        ),
        qa(
          'master',
          b("Do you need a master's degree?", "Master's degree লাগবে কি?"),
          [
            b('DAAD Bangladesh says a master’s from Bangladesh is treated at par with a German master’s. The exact eligibility is set by the university you apply to.', 'DAAD Bangladesh বলে, Bangladesh-এর master’s জার্মান master’s-এর সমান। সঠিক যোগ্যতা যে university-তে আবেদন করবেন, সে ঠিক করে।'),
          ],
          [DE_DAAD_BD_PHD],
        ),
        qa(
          'supervisor',
          b('How do you find a supervisor?', 'Supervisor কীভাবে খুঁজবেন?'),
          [
            b(
              'Shortlist universities, professors or structured programs in your field (DAAD points to databases of graduate schools, DFG research training groups and International Max Planck Research Schools). Then contact the potential supervisor in good time, with a brief, well-structured message and an overview of your research proposal, your background and your goals, and get a letter of acceptance.',
              'আপনার বিষয়ে university, professor বা structured program-এর তালিকা করুন (DAAD graduate school, DFG research training group আর International Max Planck Research School-এর database দেখায়)। তারপর সময় থাকতে সম্ভাব্য supervisor-কে সংক্ষিপ্ত, গোছানো message পাঠান, সঙ্গে research proposal-এর সারসংক্ষেপ, আপনার background আর লক্ষ্য; তারপর letter of acceptance নিন।',
            ),
          ],
          [DE_DAAD_BD_PHD],
          { kind: 'guidance' },
        ),
        qa(
          'proposal',
          b('Do you need a research proposal?', 'Research proposal লাগবে কি?'),
          [
            b(
              'Partly verified. DAAD Bangladesh advises sending a potential supervisor an overview of your research proposal. Whether a full proposal is a formal admission requirement, and in what form, is set by each university and program.',
              'আংশিক যাচাই করা। DAAD Bangladesh সম্ভাব্য supervisor-কে research proposal-এর সারসংক্ষেপ পাঠাতে বলে। পূর্ণ proposal আনুষ্ঠানিক ভর্তির শর্ত কিনা, আর কোন আকারে, তা প্রতিটি university ও program ঠিক করে।',
            ),
          ],
          [DE_DAAD_BD_PHD],
          { status: 'partly-verified' },
        ),
        aps('aps'),
      ],
    },
    {
      id: 'language',
      title: b('Language', 'ভাষা'),
      items: [
        qa(
          'language',
          b('Do you need IELTS or German?', 'IELTS নাকি German লাগবে?'),
          [
            b(
              'Some universities ask for TOEFL or IELTS scores; some ask for good German depending on your research subject, certified by TestDaF or DSH. Structured programs are largely taught in English.',
              'কিছু university TOEFL বা IELTS score চায়; গবেষণার বিষয় অনুযায়ী কেউ কেউ ভালো German চায়, TestDaF বা DSH দিয়ে প্রমাণ করতে হয়। Structured program বেশিরভাগ English-এ।',
            ),
            b(
              'For the visa, the German Embassy Dhaka asks for proof of English for English-speaking programs and recommends "Zertifikat B1" with a good result for German-speaking ones.',
              'Visa-র জন্য German Embassy Dhaka English program-এ English-এর প্রমাণ চায়, আর German program-এ ভালো ফলসহ "Zertifikat B1" থাকা ভালো বলে।',
            ),
          ],
          [DE_DAAD_BD_PHD, DE_EMBASSY_STUDY],
        ),
      ],
    },
    {
      id: 'funding',
      title: b('Funding and costs', 'Funding ও খরচ'),
      items: [
        { embed: 'scholarships' },
        qa(
          'phd-tuition',
          b('Is there tuition for a PhD?', 'PhD-তে tuition আছে কি?'),
          [
            b(
              'Not verified yet for doctoral candidates. The sources we read state the no-tuition rule for bachelor’s and many master’s programs at state universities; ask your university about fees and the semester contribution for doctoral candidates.',
              'PhD-র জন্য এখনো যাচাই হয়নি। আমরা যে source পড়েছি, তাতে রাষ্ট্রীয় university-তে bachelor’s আর অনেক master’s-এ tuition না থাকার কথা আছে; PhD-র fee আর semester contribution নিয়ে আপনার university-কে জিজ্ঞেস করুন।',
            ),
          ],
          [DE_SIG_FUNDING],
          { status: 'not-verified' },
        ),
        livingCost('living'),
        blockedAccount('funds'),
        { embed: 'costs' },
      ],
    },
    { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' }] },
    { id: 'universities', title: b('Universities', 'University'), items: [{ embed: 'universities' }] },
    {
      id: 'work',
      title: b('Part-time work', 'Part-time কাজ'),
      items: [
        qa(
          'work',
          b('Can you work during a PhD?', 'PhD চলাকালীন কাজ করা যায় কি?'),
          [
            b(
              'If you hold a residence permit for study purposes, the student rule applies: up to 140 full days or 280 half days a year, or up to 20 hours a week as a working student. Rules for doctoral candidates who come as researchers or employees are different and are not verified here yet.',
              'পড়াশোনার উদ্দেশ্যে residence permit থাকলে student-দের নিয়ম প্রযোজ্য: বছরে সর্বোচ্চ 140 পূর্ণ দিন বা 280 অর্ধদিন, অথবা working student হিসেবে সপ্তাহে সর্বোচ্চ 20 ঘণ্টা। গবেষক বা কর্মচারী হিসেবে আসা PhD candidate-দের নিয়ম আলাদা, যা এখানে এখনো যাচাই হয়নি।',
            ),
          ],
          [DE_MIIG_WORK, DE_MIIG_VISA_STUDY],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'visa',
      title: b('Visa', 'Visa'),
      items: [
        qa(
          'visa-type',
          b('Which visa, and where do you apply?', 'কোন visa, আর কোথায় আবেদন?'),
          [
            b(
              'Register on the Consular Services Portal. PhD candidates who are not researchers under section 18d of the Residence Act count as "qualified students" and are processed straight after registration, without the long student waiting list. Researchers under section 18d follow a separate route (not covered here).',
              'Consular Services Portal-এ register করবেন। Residence Act-এর section 18d-এর আওতায় গবেষক নন এমন PhD candidate-রা "qualified student", তাঁদের আবেদন register-এর পরেই processing হয়, student-দের দীর্ঘ waiting list ছাড়াই। Section 18d-এর গবেষকদের পথ আলাদা (এখানে নেই)।',
            ),
          ],
          [DE_EMBASSY_STUDY, DE_EMBASSY_FAQ, DE_CSP],
        ),
        qa(
          'visa-time',
          b('How long does the visa take?', 'Visa-তে কত সময় লাগে?'),
          [
            b(
              'The German Embassy Dhaka says student visas take around 4 weeks to process once the application is complete, and a visa is only issued within 3 months of your arrival date.',
              'German Embassy Dhaka বলে, আবেদন সম্পূর্ণ হলে student visa-র processing-এ প্রায় ৪ সপ্তাহ লাগে, আর পৌঁছানোর তারিখের ৩ মাসের মধ্যেই শুধু visa দেওয়া হয়।',
            ),
          ],
          [DE_EMBASSY_STUDY, DE_DAAD_BD_PHD],
          {
            status: 'needs-review',
            discrepancy: b('The Embassy gives around 4 weeks; DAAD Bangladesh’s PhD page says the procedure can take 8 to 12 weeks.', 'Embassy বলে প্রায় ৪ সপ্তাহ; DAAD Bangladesh-এর PhD page বলে প্রক্রিয়ায় ৮ থেকে ১২ সপ্তাহ লাগতে পারে।'),
          },
        ),
      ],
    },
    { id: 'after', title: b('After the PhD', 'PhD-র পরে'), items: [afterGraduation('after', 'partly-verified')] },
  ],
};

// ------------------------------------------------------------------ the country

export const DE_GUIDE: CountryGuide = {
  code: 'DE',
  checkedAt: DE_READ,
  sourcesPerSection: true,
  intro: b(
    'Germany’s state universities generally charge no tuition for bachelor’s and many master’s programs, and many master’s and doctoral programs are taught in English. From Bangladesh, the route into a bachelor’s and the visa waiting time need careful planning. This guide is built from German official sources.',
    'জার্মানির রাষ্ট্রীয় university সাধারণত bachelor’s আর অনেক master’s-এ tuition নেয় না, আর অনেক master’s ও PhD English-এ পড়ানো হয়। Bangladesh থেকে bachelor’s-এ ঢোকার পথ আর visa-র অপেক্ষার সময় নিয়ে ভালোভাবে পরিকল্পনা করতে হয়। এই guide জার্মান official source থেকে তৈরি।',
  ),
  overview: [
    qa(
      'why',
      b('What does Germany offer international students?', 'International student-দের জন্য জার্মানিতে কী আছে?'),
      [
        b(
          'State universities generally charge no tuition for bachelor’s and many master’s programs (Baden-Württemberg is the exception for non-EU students); over 2,000 master’s programs and around 300 bachelor’s courses are taught in English; students may work part-time; and graduates can stay up to 18 months to look for a job.',
          'রাষ্ট্রীয় university সাধারণত bachelor’s আর অনেক master’s-এ tuition নেয় না (non-EU student-দের জন্য Baden-Württemberg ব্যতিক্রম); ২,০০০-এর বেশি master’s আর প্রায় ৩০০ bachelor’s course English-এ; পড়ার সময় part-time কাজ করা যায়; আর graduation-এর পরে চাকরি খুঁজতে ১৮ মাস থাকা যায়।',
        ),
      ],
      [DE_SIG_FUNDING, DE_DAAD_BD_BACHELOR, DE_DAAD_BD_MASTER, DE_MIIG_VISA_STUDY],
    ),
    qa(
      'system',
      b('How does the university system work?', 'University ব্যবস্থা কেমন?'),
      [
        b(
          'There are universities and universities of technology (research-oriented, can award doctorates) and universities of applied sciences (practice-oriented, no doctorates). Every university is autonomous and sets its own admission criteria.',
          'আছে university ও university of technology (গবেষণাভিত্তিক, PhD দিতে পারে) আর university of applied sciences (ব্যবহারিকভিত্তিক, PhD দেয় না)। প্রতিটি university স্বাধীন, নিজের ভর্তির শর্ত নিজে ঠিক করে।',
        ),
      ],
      [DE_DAAD_BD_BACHELOR],
    ),
    qa(
      'calendar',
      b('When does the academic year run?', 'শিক্ষাবর্ষ কখন?'),
      [b('Two semesters: winter (October–March) and summer (April–September), so there are two intakes.', 'দুটো semester: winter (October–March) আর summer (April–September), তাই intake দুটো।')],
      [DE_DAAD_BD_BACHELOR],
    ),
    qa(
      'degrees',
      b('How long is each degree?', 'কোন degree কত বছরের?'),
      [b('Bachelor’s: generally 3–4 years. PhD: about 3–5 years for an individual doctorate, about three years in a structured program. Master’s program length is set by each program.', 'Bachelor’s: সাধারণত ৩–৪ বছর। PhD: individual doctorate-এ প্রায় ৩–৫ বছর, structured program-এ প্রায় তিন বছর। Master’s-এর মেয়াদ প্রতিটি program ঠিক করে।')],
      [DE_DAAD_BD_BACHELOR, DE_DAAD_BD_PHD],
    ),
    qa(
      'languages',
      b('Which languages can you study in?', 'কোন ভাষায় পড়া যায়?'),
      [b('German and English. German-taught programs need very good German (TestDaF, DSH); English-taught programs need proof of English. Most programs, especially bachelor’s, are in German.', 'German আর English। German program-এ খুব ভালো German লাগে (TestDaF, DSH); English program-এ English-এর প্রমাণ লাগে। বেশিরভাগ program, বিশেষ করে bachelor’s, German-এ।')],
      [DE_DAAD_BD_BACHELOR, DE_DAAD_BD_MASTER],
    ),
    qa(
      'admission',
      b('How does admission work?', 'ভর্তির নিয়ম কেমন?'),
      [
        b(
          'You apply to each university directly or through uni-assist, as the program says. From Bangladesh: bachelor’s applicants usually need a Studienkolleg or a year of university first; a 4-year bachelor’s is accepted as equal for a master’s; a master’s for a PhD.',
          'Program যেমন বলে, সরাসরি university-তে বা uni-assist দিয়ে আবেদন করবেন। Bangladesh থেকে: bachelor’s-এর জন্য সাধারণত আগে Studienkolleg বা এক বছর university; master’s-এর জন্য ৪ বছরের bachelor’s সমান ধরা হয়; PhD-র জন্য master’s।',
        ),
      ],
      [DE_DAAD_BD_BACHELOR, DE_DAAD_BD_MASTER, DE_DAAD_BD_PHD],
    ),
  ],
  faqs: [
    qa('who', b('Who can apply for a bachelor’s from Bangladesh?', 'Bangladesh থেকে bachelor’s-এ কারা আবেদন করতে পারেন?'), [b('With the HSC alone you cannot enter directly: you need the Studienkolleg and its exam (FSP), one completed year at a university at home in the relevant subject, or an IB / GCE with the right subjects.', 'শুধু HSC দিয়ে সরাসরি ভর্তি হয় না: লাগবে Studienkolleg আর তার পরীক্ষা (FSP), দেশে সংশ্লিষ্ট বিষয়ে এক বছর university, অথবা প্রয়োজনীয় বিষয়সহ IB / GCE।')], [DE_DAAD_BD_BACHELOR]),
    qa('masters', b('What do you need for a master’s?', 'Master’s-এ কী লাগে?'), [b('A bachelor’s degree; a 4-year bachelor’s from Bangladesh is treated as equal to a German one. With a 3-year bachelor’s, ask the course coordinator first.', 'একটি bachelor’s degree; Bangladesh-এর ৪ বছরের bachelor’s জার্মানটির সমান ধরা হয়। ৩ বছরের bachelor’s হলে আগে course coordinator-কে জিজ্ঞেস করুন।')], [DE_DAAD_BD_MASTER]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('A master’s degree and, for an individual doctorate, a supervisor who accepts you; or admission to a structured doctoral program.', 'একটি master’s degree, আর individual doctorate-এর জন্য একজন supervisor-এর সম্মতি; অথবা structured doctoral program-এ ভর্তি।')], [DE_DAAD_BD_PHD]),
    qa('grades', b('What grades are normally required?', 'সাধারণত কত grade লাগে?'), [b('Not verified yet. No national minimum is given in the official sources we read; each program sets its own.', 'এখনো যাচাই হয়নি। আমরা যে official source পড়েছি, তাতে জাতীয় কোনো minimum নেই; প্রতিটি program নিজে ঠিক করে।')], [DE_DAAD_ADMISSION_DB], { status: 'not-verified' }),
    qa('ielts', b('Is IELTS required?', 'IELTS লাগে কি?'), [b('For English-taught programs, usually yes: the German Embassy Dhaka asks for TOEFL / IELTS (or another in-person ALTE test) for English-speaking programs. The score is set by each university; there is no national score.', 'English program-এ সাধারণত হ্যাঁ: German Embassy Dhaka English program-এর জন্য TOEFL / IELTS (বা অন্য সশরীরের ALTE test) চায়। Score প্রতিটি university ঠিক করে; জাতীয় কোনো score নেই।')], [DE_EMBASSY_STUDY, DE_EMBASSY_FAQ], { status: 'partly-verified' }),
    qa('german', b('Is German required?', 'German লাগে কি?'), [b('For German-taught programs and most Studienkollegs, yes (TestDaF / DSH for universities; the Embassy recommends B1 with a good result for German-speaking programs). For English-taught programs, not in general.', 'German program আর বেশিরভাগ Studienkolleg-এ হ্যাঁ (university-র জন্য TestDaF / DSH; German program-এর জন্য Embassy ভালো ফলসহ B1 থাকা ভালো বলে)। English program-এ সাধারণত না।')], [DE_DAAD_BD_BACHELOR, DE_EMBASSY_STUDY]),
    qa('english', b('Can you study in English?', 'English-এ পড়া যায় কি?'), [b('Yes: over 2,000 international master’s programs and around 300 bachelor’s courses are taught in English (DAAD Bangladesh).', 'হ্যাঁ: ২,০০০-এর বেশি international master’s program আর প্রায় ৩০০ bachelor’s course English-এ (DAAD Bangladesh)।')], [DE_DAAD_BD_BACHELOR, DE_DAAD_BD_MASTER]),
    qa('tuition', b('Are public universities tuition-free?', 'Public university কি বিনা tuition-এ?'), [b('As a rule, state universities charge no tuition for bachelor’s and many master’s programs. Exception: Baden-Württemberg charges non-EU students EUR 1,500 per semester. Private universities mostly charge high fees.', 'সাধারণ নিয়মে রাষ্ট্রীয় university bachelor’s আর অনেক master’s-এ tuition নেয় না। ব্যতিক্রম: Baden-Württemberg non-EU student-দের কাছ থেকে প্রতি semester-এ EUR 1,500 নেয়। Private university বেশিরভাগই অনেক বেশি fee নেয়।')], [DE_SIG_FUNDING]),
    qa('semester-fee', b('What semester fees exist?', 'কী কী semester fee আছে?'), [b('A semester contribution for student services and the student body, often with a transport ticket: about EUR 70–430 per semester depending on the university (an estimate range).', 'Student services আর student body-র জন্য semester contribution, অনেক সময় যাতায়াতের ticket-সহ: university অনুযায়ী প্রতি semester-এ প্রায় EUR 70–430 (আনুমানিক range)।')], [DE_SIG_FUNDING], { kind: 'estimate' }),
    qa('living', b('What is the estimated living cost?', 'আনুমানিক থাকা-খাওয়ার খরচ কত?'), [b('An estimate: EUR 900–1,200 a month (Study in Germany) or about EUR 1,150 a month (DAAD Bangladesh). Rent is usually EUR 290–560.', 'আনুমানিক: মাসে EUR 900–1,200 (Study in Germany) বা প্রায় EUR 1,150 (DAAD Bangladesh)। ভাড়া সাধারণত EUR 290–560।')], [DE_SIG_FUNDING, DE_DAAD_BD_BACHELOR], { kind: 'estimate' }),
    qa('funds', b('How much money must you prove? What is the blocked account?', 'কত টাকা দেখাতে হবে? Blocked account কী?'), [b('The German Embassy Dhaka asks for a blocked account in Germany in your name with at least EUR 11,904, from which you can take EUR 992 a month; a scholarship confirmation or a formal sponsorship letter from a sponsor in Germany are the alternatives.', 'German Embassy Dhaka জার্মানিতে আপনার নামে অন্তত EUR 11,904-এর blocked account চায়, যা থেকে মাসে EUR 992 তোলা যায়; বিকল্প হলো scholarship-এর confirmation বা জার্মানিতে থাকা sponsor-এর formal sponsorship letter।')], [DE_EMBASSY_STUDY]),
    qa('documents', b('What documents are required?', 'কী কী documents লাগে?'), [b('For the visa: passport, admission letter, HSC certificate and mark sheets, previous degree certificates and transcripts, language certificate, letter of motivation, CV, travel health insurance, proof of finances, the application form and photo, and translations. Each degree guide explains every document once.', 'Visa-র জন্য: passport, admission letter, HSC সনদ ও mark sheet, আগের degree-র সনদ ও transcript, ভাষার certificate, letter of motivation, CV, travel health insurance, আর্থিক প্রমাণ, application form ও ছবি, আর অনুবাদ। প্রতিটি degree guide-এ প্রতিটি document একবার করে ব্যাখ্যা করা আছে।')], [DE_EMBASSY_STUDY]),
    qa('bangladesh', b('Does Bangladesh have additional requirements?', 'Bangladesh-এর জন্য বাড়তি কিছু আছে কি?'), [b('Yes: you register on the Consular Services Portal (admission letter required), documents in Bengali need English or German translations, the Embassy may verify certificates for an extra fee, and there is a long waiting time for appointments.', 'হ্যাঁ: Consular Services Portal-এ register করতে হয় (admission letter লাগে), বাংলা document-এর English বা German অনুবাদ লাগে, Embassy বাড়তি fee নিয়ে certificate যাচাই করাতে পারে, আর appointment-এর জন্য দীর্ঘ অপেক্ষা আছে।')], [DE_EMBASSY_STUDY, DE_EMBASSY_FAQ, DE_CSP]),
    qa('aps', b('Is APS required?', 'APS লাগে কি?'), [b('No. The German Embassy Dhaka does not use an APS office, and you do not apply through another country’s APS office.', 'না। German Embassy Dhaka APS office ব্যবহার করে না, আর অন্য দেশের APS office দিয়েও আবেদন করতে হয় না।')], [DE_EMBASSY_FAQ]),
    qa('apply-how', b('Do you apply directly or through a platform?', 'সরাসরি আবেদন নাকি platform দিয়ে?'), [b('Either directly to the university or through uni-assist, depending on the university; uni-assist member universities often do not accept direct applications. uni-assist has no office in Bangladesh.', 'University অনুযায়ী সরাসরি অথবা uni-assist দিয়ে; uni-assist-এর সদস্য university অনেক সময় সরাসরি আবেদন নেয় না। Bangladesh-এ uni-assist-এর office নেই।')], [DE_DAAD_BD_BACHELOR, DE_UNIASSIST_DEADLINES]),
    qa('when', b('When should you apply? What are the intakes?', 'কখন আবেদন করবেন? Intake কখন?'), [b('Two intakes: winter (from October) and summer (from April). Deadlines are often 15 July for winter and 15 January for summer, but many programs set earlier ones. uni-assist advises applying at least 8 weeks early.', 'দুটো intake: winter (October থেকে) আর summer (April থেকে)। Deadline প্রায়ই winter-এর জন্য 15 July আর summer-এর জন্য 15 January, তবে অনেক program আগের deadline দেয়। uni-assist অন্তত ৮ সপ্তাহ আগে আবেদন করতে বলে।')], [DE_DAAD_BD_BACHELOR, DE_UNIASSIST_DEADLINES]),
    qa('admission-time', b('How long does admission take?', 'Admission-এ কত সময় লাগে?'), [b('Not verified yet: no single processing time is given in the official sources we read.', 'এখনো যাচাই হয়নি: আমরা যে official source পড়েছি, তাতে নির্দিষ্ট কোনো সময় দেওয়া নেই।')], [DE_UNIASSIST_DEADLINES], { status: 'not-verified' }),
    qa('visa', b('What is the student visa process, and where do you apply?', 'Student visa-র প্রক্রিয়া কী, কোথায় আবেদন?'), [b('A national (D) visa from the German Embassy Dhaka: register on the Consular Services Portal and upload your documents, then submit documents and biometrics at your appointment (master’s: at VFS; bachelor’s from the older list: at the Embassy). The fee is EUR 75, paid in taka in cash.', 'German Embassy Dhaka থেকে national (D) visa: Consular Services Portal-এ register করে document upload করবেন, তারপর appointment-এ document আর biometrics জমা (master’s: VFS-এ; পুরনো list-এর bachelor’s: Embassy-তে)। Fee EUR 75, টাকায় নগদে।')], [DE_EMBASSY_STUDY, DE_EMBASSY_NATIONAL, DE_CSP]),
    qa('visa-time', b('How long does the visa take?', 'Visa-তে কত সময় লাগে?'), [b('Around 4 weeks of processing once the application is complete (German Embassy Dhaka), but there is a long waiting time for an appointment first, except for "qualified students" (German / EU-funded scholarship holders and PhD candidates).', 'আবেদন সম্পূর্ণ হলে processing-এ প্রায় ৪ সপ্তাহ (German Embassy Dhaka), তবে তার আগে appointment-এর জন্য দীর্ঘ অপেক্ষা, শুধু "qualified student"-দের (জার্মান / EU-র সরকারি scholarship পাওয়া আর PhD candidate) ছাড়া।')], [DE_EMBASSY_STUDY, DE_EMBASSY_FAQ], { status: 'needs-review' }),
    qa('work', b('Can international students work? How many hours?', 'International student কি কাজ করতে পারে? কত ঘণ্টা?'), [b('Yes: up to 140 full days or 280 half days a year, or up to 20 hours a week as a working student; no limit during semester breaks.', 'হ্যাঁ: বছরে সর্বোচ্চ 140 পূর্ণ দিন বা 280 অর্ধদিন, অথবা working student হিসেবে সপ্তাহে সর্বোচ্চ 20 ঘণ্টা; semester break-এ সীমা নেই।')], [DE_MIIG_WORK, DE_MIIG_SKILLED_ACT]),
    qa('after', b('Can you stay in Germany after graduation?', 'Graduation-এর পরে থাকা যায় কি?'), [b('Yes: a residence permit to look for a job for up to 18 months (any job allowed meanwhile), then a skilled-worker permit or EU Blue Card once you have a qualified job.', 'হ্যাঁ: চাকরি খুঁজতে সর্বোচ্চ ১৮ মাসের residence permit (এই সময়ে যেকোনো কাজ করা যায়), তারপর যোগ্যতা অনুযায়ী চাকরি পেলে skilled-worker permit বা EU Blue Card।')], [DE_MIIG_VISA_STUDY]),
    qa('universities', b('What are the main types of universities?', 'প্রধান কী ধরনের university আছে?'), [b('Research universities and universities of technology (can award doctorates), and universities of applied sciences (practice-oriented, no doctorates). This guide does not order them by quality.', 'গবেষণাভিত্তিক university ও university of technology (PhD দিতে পারে), আর university of applied sciences (ব্যবহারিকভিত্তিক, PhD দেয় না)। এই guide মান অনুযায়ী সাজায় না।')], [DE_DAAD_BD_BACHELOR]),
    qa('scholarships', b('Are scholarships available?', 'Scholarship পাওয়া যায় কি?'), [b('Mostly for master’s and PhD: DAAD funding is in principle for research (master’s, PhD and above), for example EPOS for graduates with two years of work experience. The Deutschlandstipendium pays EUR 300 a month. The DAAD scholarship database lists more.', 'মূলত master’s আর PhD-র জন্য: DAAD-এর funding মূলত research-এর জন্য (master’s, PhD ও তার উপরে), যেমন দুই বছরের কাজের অভিজ্ঞতাসম্পন্ন graduate-দের জন্য EPOS। Deutschlandstipendium মাসে EUR 300 দেয়। আরও আছে DAAD-এর scholarship database-এ।')], [DE_DAAD_BD_BACHELOR, DE_DAAD_EPOS, DE_DEUTSCHLANDSTIPENDIUM, DE_DAAD_SCHOLARSHIP_DB]),
    bangladeshKnow('know'),
  ],
  life: [
    qa(
      'accommodation',
      b('Where do students live?', 'Student-রা কোথায় থাকেন?'),
      [b('In student halls of residence run by the Studierendenwerk (low cost and popular), in shared flats (Wohngemeinschaft, WG) where you have your own room, or in private apartments. Start looking early.', 'Studierendenwerk-এর student hall-এ (খরচ কম, জনপ্রিয়), shared flat-এ (Wohngemeinschaft, WG), যেখানে নিজের একটা ঘর থাকে, বা private apartment-এ। আগে থেকেই খোঁজ শুরু করুন।')],
      [DE_DAAD_BD_BACHELOR],
    ),
    qa(
      'transport',
      b('How do students get around?', 'Student-রা কীভাবে যাতায়াত করেন?'),
      [b('At many universities the semester fee includes a "Semesterticket" for local public transport, and at participating institutions it is valid throughout Germany ("Deutschland-Semesterticket"). Elsewhere you may buy it separately.', 'অনেক university-তে semester fee-র মধ্যে স্থানীয় গণপরিবহনের "Semesterticket" থাকে, আর অংশগ্রহণকারী প্রতিষ্ঠানে এটা সারা জার্মানিতে চলে ("Deutschland-Semesterticket")। অন্যত্র আলাদা কিনতে হতে পারে।')],
      [DE_SIG_FUNDING],
    ),
    qa(
      'health',
      b('What about health insurance?', 'Health insurance কেমন?'),
      [b('You need health insurance to enrol. Public insurance costs about EUR 110 a month if you are 30 or younger (or up to 14 semesters of study); after that at least EUR 166. For the visa you need travel health insurance until enrolment.', 'ভর্তির জন্য health insurance লাগে। ৩০ বছর বা কম বয়সে (বা ১৪ semester পর্যন্ত) public insurance-এ মাসে প্রায় EUR 110; তারপর অন্তত EUR 166। Visa-র জন্য enrolment পর্যন্ত travel health insurance লাগে।')],
      [DE_SIG_FUNDING, DE_EMBASSY_STUDY],
    ),
    qa(
      'arrival',
      b('What must you do after arriving?', 'পৌঁছানোর পরে কী করতে হবে?'),
      [b('Register your address within two weeks of moving in, and get your residence permit from the foreigners authority within the first three months. Residence permits for study are usually issued for an initial two years.', 'বাসায় ওঠার দুই সপ্তাহের মধ্যে ঠিকানা register করুন, আর প্রথম তিন মাসের মধ্যে foreigners authority থেকে residence permit নিন। পড়াশোনার residence permit সাধারণত প্রথমবার দুই বছরের জন্য দেওয়া হয়।')],
      [DE_MIIG_REGISTRATION, DE_DAAD_BD_BACHELOR, DE_MIIG_VISA_STUDY],
    ),
    qa(
      'cities',
      b('Which cities are more expensive?', 'কোন শহরে খরচ বেশি?'),
      [b('Rents are above average in cities such as Cologne, Munich, Hamburg, Düsseldorf and Frankfurt. Costs depend on whether you live in a large city or a small town.', 'Cologne, Munich, Hamburg, Düsseldorf ও Frankfurt-এর মতো শহরে ভাড়া গড়ের চেয়ে বেশি। বড় শহরে নাকি ছোট শহরে থাকছেন, তার উপর খরচ নির্ভর করে।')],
      [DE_SIG_FUNDING],
    ),
    qa(
      'language-life',
      b('Should you learn German anyway?', 'তবুও কি German শেখা উচিত?'),
      [b('DAAD advises it: life is not limited to campus, and German helps with internships, travel and working in Germany later. Universities offer German courses, and you can start at the Goethe-Institut before you leave.', 'DAAD শেখার পরামর্শ দেয়: জীবন শুধু campus-এ সীমাবদ্ধ নয়, আর German জানলে internship, ঘোরাঘুরি আর পরে জার্মানিতে কাজে সুবিধা হয়। University German course দেয়, আর যাওয়ার আগে Goethe-Institut-এ শুরু করতে পারেন।')],
      [DE_DAAD_BD_BACHELOR],
      { kind: 'guidance' },
    ),
  ],
  documents: DE_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'fact', status: 'verified', degrees: ['bachelors', 'masters'], value: { min: 0, max: 1500, unit: 'EUR/semester', text: b('Generally none at state universities; EUR 1,500 per semester for non-EU students in Baden-Württemberg.', 'রাষ্ট্রীয় university-তে সাধারণত নেই; Baden-Württemberg-এ non-EU student-দের প্রতি semester-এ EUR 1,500।') }, source: DE_SIG_FUNDING },
    { id: 'public-tuition', kind: 'fact', status: 'not-verified', degrees: ['phd'] },
    { id: 'funds-to-show', kind: 'fact', status: 'verified', value: { min: 11904, unit: 'EUR/year', text: b('EUR 11,904 a year (EUR 992 a month) in a blocked account.', 'Blocked account-এ বছরে EUR 11,904 (মাসে EUR 992)।') }, source: DE_EMBASSY_STUDY },
    { id: 'living-cost', kind: 'estimate', status: 'verified', value: { min: 900, max: 1200, unit: 'EUR/month', text: b('EUR 900–1,200 a month (estimate).', 'মাসে EUR 900–1,200 (আনুমানিক)।') }, source: DE_SIG_FUNDING },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { max: 20, unit: 'hours/week', text: b('140 full / 280 half days a year, or 20 hours a week.', 'বছরে 140 পূর্ণ / 280 অর্ধদিন, অথবা সপ্তাহে 20 ঘণ্টা।') }, source: DE_MIIG_WORK },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { max: 18, unit: 'months', text: b('Up to 18 months to look for a job.', 'চাকরি খুঁজতে সর্বোচ্চ ১৮ মাস।') }, source: DE_MIIG_VISA_STUDY },
    { id: 'english-programs', kind: 'fact', status: 'verified', degrees: ['bachelors'], value: { min: 300, unit: 'courses', text: b('Around 300 English-taught bachelor’s courses.', 'প্রায় ৩০০ English bachelor’s course।') }, source: DE_DAAD_BD_BACHELOR },
    { id: 'english-programs', kind: 'fact', status: 'verified', degrees: ['masters'], value: { min: 2000, unit: 'programs', text: b('Over 2,000 English-taught international programs.', '২,০০০-এর বেশি English international program।') }, source: DE_DAAD_BD_MASTER },
    { id: 'visa-fee', kind: 'fact', status: 'verified', value: { min: 75, unit: 'EUR', text: b('EUR 75 (adults), paid in taka.', 'EUR 75 (প্রাপ্তবয়স্ক), টাকায়।') }, source: DE_EMBASSY_NATIONAL },
  ],
};
