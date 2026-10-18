import type { Bilingual, SourceRef } from '@/lib/models';
import type { CountryGuide, DegreeGuide, GuideAnswer, GuideCost, GuideDocument, GuideKind, GuideStatus } from '@/lib/abroad/guides';
import {
  IE_DFA_EMBASSIES,
  IE_DFA_VISAS,
  IE_GALWAY_ENTRY,
  IE_GALWAY_PG_FEES,
  IE_HEA_GOIIES,
  IE_ISD_FAQ,
  IE_ISD_FINANCE,
  IE_ISD_GRAD,
  IE_ISD_REGISTER,
  IE_ISD_STUDY,
  IE_ISD_VISA_HOWTO,
  IE_ISD_VISA_LIST,
  IE_READ,
  IE_TCD_ENGLISH,
  IE_TCD_ENTRY,
  IE_TCD_UG_FEES,
  IE_UCC_ENGLISH,
  IE_UCC_UG_FEES,
  IE_UCD_ENGLISH,
  IE_UCD_FEES,
  IE_UCD_HOWTOAPPLY,
} from './ie-sources';

/**
 * Ireland reading guide, researched on its own from Irish official sources
 * (Immigration Service Delivery / irishimmigration.ie — the Department of
 * Justice, Home Affairs and Migration's immigration authority — the
 * Department of Foreign Affairs' ireland.ie, the Higher Education Authority
 * for the Government of Ireland scholarship, and university pages). Nothing
 * is taken from another country's guide. Amounts stay in euros exactly as
 * each source states them and are never converted. It covers English-taught
 * programmes for non-EU/EEA (Bangladeshi) students; Ireland is not in the
 * Schengen area and runs its own, separate visa and immigration system from
 * the rest of the EU.
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
  return {
    id,
    q,
    a,
    sources,
    confidence: 'high',
    ...(o.list ? { list: o.list } : {}),
    ...(o.status ? { status: o.status } : {}),
    ...(o.kind ? { kind: o.kind } : {}),
    ...(o.discrepancy ? { discrepancy: o.discrepancy } : {}),
    ...(o.allDegrees ? { allDegrees: true } : {}),
  };
}

const CHECK_UNI = b(
  "Trinity College Dublin, University College Dublin, University College Cork and University of Galway are not identical: each sets its own English-taught programmes, tuition fee, deadline and entrance requirements. Always check the exact programme on the institution's own admissions page.",
  'Trinity College Dublin, University College Dublin, University College Cork, আর University of Galway একরকম না: প্রতিটি নিজের ইংরেজি-মাধ্যম programme, tuition fee, deadline, আর ভর্তির শর্ত ঠিক করে। প্রতিটি programme-এর জন্য প্রতিষ্ঠানের নিজের admissions page অবশ্যই দেখে নিন।',
);

// ------------------------------------------------------------------ shared answers

const visaRequired = (id: string) =>
  qa(
    id,
    b('Does a Bangladeshi student need a visa to study in Ireland?', 'Bangladesh-এর student-দের Ireland-এ পড়তে visa লাগে কি?'),
    [
      b(
        'Yes. Ireland keeps its own, separate visa system — it is not in the Schengen area, so a Schengen visa does not cover Ireland. Immigration Service Delivery’s own visa/non-visa-required nationalities list does not include Bangladesh, so Bangladeshi nationals are visa-required. For a course lasting more than 3 months you must apply for a long-stay "D" study visa before travelling.',
        'হ্যাঁ। Ireland এর নিজের আলাদা visa system রাখে — এটা Schengen area-র অংশ না, তাই একটা Schengen visa Ireland-কে কভার করে না। Immigration Service Delivery-র নিজের visa/non-visa-required জাতীয়তার তালিকায় Bangladesh নেই, তাই Bangladeshi নাগরিকদের visa লাগে। 3 মাসের বেশি সময়ের একটি course-এর জন্য যাত্রার আগে একটি long-stay "D" study visa-র আবেদন করতে হয়।',
      ),
      b(
        'Ireland has no Embassy in Bangladesh; applications from Bangladesh are handled through the Irish Embassy in New Delhi, India, per the Department of Foreign Affairs’ own embassy list.',
        'Ireland-এর Bangladesh-এ কোনো Embassy নেই; Bangladesh থেকে application Department of Foreign Affairs-এর নিজের embassy তালিকা অনুযায়ী New Delhi, India-র Irish Embassy-র মাধ্যমে হয়।',
      ),
    ],
    [IE_ISD_VISA_LIST, IE_DFA_VISAS, IE_DFA_EMBASSIES],
    { allDegrees: true },
  );

const visaProcess = (id: string) =>
  qa(
    id,
    b('How do you apply for the D study visa, and what does it cost?', 'D study visa-র আবেদন কীভাবে করবেন, আর খরচ কত?'),
    [
      b(
        'Apply online through AVATS (the Automated Visa Application and Tracking System), up to 3 months before your travel date, then print, sign and post the Summary Application Form with your supporting documents to your visa office, embassy or consulate within 30 days. Required documents include your passport, passport photographs, private medical insurance, an application letter, your letter of acceptance, evidence of academic ability, evidence of English (or Irish) language ability, proof of fee payment, and evidence of your finances. Applicants expect a decision within approximately 8 weeks of the application being received, though it can take longer if documents are missing or need verification.',
        'AVATS (Automated Visa Application and Tracking System)-এর মাধ্যমে অনলাইনে আবেদন করুন, যাত্রার তারিখের 3 মাস আগে পর্যন্ত, তারপর Summary Application Form প্রিন্ট করে, সাইন করে, 30 দিনের মধ্যে আপনার সহায়ক document-সহ visa office, embassy বা consulate-এ পোস্ট করুন। প্রয়োজনীয় document-এর মধ্যে আছে passport, passport photograph, private medical insurance, একটি application letter, letter of acceptance, academic ability-র প্রমাণ, English (বা Irish) ভাষার দক্ষতার প্রমাণ, fee payment-এর প্রমাণ, আর টাকার প্রমাণ। আবেদনকারীরা application পাওয়ার প্রায় 8 সপ্তাহের মধ্যে সিদ্ধান্ত আশা করতে পারেন, যদিও document অনুপস্থিত থাকলে বা যাচাই লাগলে বেশি সময় লাগতে পারে।',
      ),
      b(
        'You must be enrolled full-time, daytime, in a programme on the Interim List of Eligible Programmes (ILEP) — part-time or distance-learning courses do not qualify for student permission. The visa application fee is separate from the IRP registration fee; the ISD page on fees should be checked for the current amount, which this guide did not itemise.',
        'আপনাকে Interim List of Eligible Programmes (ILEP)-এ থাকা একটি full-time, daytime programme-এ ভর্তি থাকতে হয় — part-time বা distance-learning course student permission-এর জন্য যোগ্য না। Visa application fee IRP registration fee থেকে আলাদা; বর্তমান পরিমাণের জন্য ISD-র fee page দেখা উচিত, যা এই guide-এ তালিকাভুক্ত করা হয়নি।',
      ),
    ],
    [IE_ISD_VISA_HOWTO, IE_ISD_FAQ],
    { allDegrees: true, status: 'partly-verified', discrepancy: b('The exact current D-visa application fee was not confirmed from an official fee-schedule page read for this guide.', 'ঠিক বর্তমান D-visa application fee এই guide-এর জন্য পড়া কোনো official fee-schedule page থেকে নিশ্চিত হয়নি।') },
  );

const register = (id: string) =>
  qa(
    id,
    b('Do you need to register after you arrive?', 'পৌঁছানোর পর register করতে হয় কি?'),
    [
      b(
        'Yes. All non-EEA students, including visa-exempt ones, staying longer than 90 days must register with Immigration Service Delivery for the first time, by booking an appointment via the Customer Portal to attend the public Registration Office (Burgh Quay, Dublin, for most students). The registration fee is EUR 300. You will receive an Irish Residence Permit (IRP) card showing your "Stamp 2" student permission, which you must keep up to date for the whole time you study in Ireland.',
        'হ্যাঁ। সব non-EEA student, visa-exempt student-সহ, যারা 90 দিনের বেশি থাকেন, তাদের প্রথমবার Immigration Service Delivery-এ register করতে হয়, Customer Portal-এর মাধ্যমে একটি appointment বুক করে public Registration Office-এ (অধিকাংশ student-দের জন্য Burgh Quay, Dublin) যেতে হয়। Registration fee EUR 300। আপনার "Stamp 2" student permission দেখানো একটি Irish Residence Permit (IRP) card পাবেন, যা পড়ার পুরো সময় আপ-টু-ডেট রাখতে হবে।',
      ),
    ],
    [IE_ISD_FAQ, IE_ISD_REGISTER],
    { allDegrees: true },
  );

const stayLimit = (id: string) =>
  qa(
    id,
    b('How long can you stay in Ireland as a student?', 'একজন student হিসেবে Ireland-এ কতদিন থাকা যায়?'),
    [
      b(
        'Up to seven years in total as a student (time from any earlier study in Ireland counts towards this). A new student on full-time English language programmes can get permission for a maximum of two years (three programmes of 8 months each); to stay on as a student after that you must move to a higher education programme on the ILEP.',
        'মোট সাত বছর পর্যন্ত একজন student হিসেবে (Ireland-এ আগের কোনো পড়াও এর মধ্যে গোনা হয়)। Full-time English language programme-এ একজন নতুন student সর্বোচ্চ দুই বছরের permission পেতে পারেন (প্রতিটি 8 মাসের তিনটি programme); এরপর student থাকতে হলে ILEP-এর একটি higher education programme-এ যেতে হয়।',
      ),
    ],
    [IE_ISD_FAQ],
    { allDegrees: true },
  );

const funds = (id: string) =>
  qa(
    id,
    b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'),
    [
      b(
        'If you need a visa (as Bangladeshi applicants do), for a course starting after 1 July 2023 you must show immediate access to at least EUR 10,000 — the official estimated cost of living in Ireland for one academic year — plus at least EUR 10,000 ready access for each subsequent year of study, in addition to course fees for each of those years. For a course shorter than 8 months, the figure is EUR 833 a month or EUR 6,665 total, whichever is lower. Evidence must be an up-to-date, 6-month bank statement on headed paper (yours and/or a sponsor’s, with any large or irregular deposits explained); credit cards are not accepted.',
        'Visa লাগলে (Bangladeshi আবেদনকারীদের মতো), 1 July 2023-এর পরে শুরু হওয়া একটি course-এর জন্য অন্তত EUR 10,000 তাৎক্ষণিক পাওয়ার প্রমাণ দিতে হয় — Ireland-এ এক শিক্ষাবর্ষের থাকার official আনুমানিক খরচ — সঙ্গে পড়ার পরের প্রতি বছরের জন্য অন্তত EUR 10,000 প্রস্তুত থাকা, সেই বছরগুলোর course fee-র উপর। 8 মাসের কম সময়ের একটি course-এর জন্য, সংখ্যাটা মাসে EUR 833 বা মোট EUR 6,665, যেটা কম। প্রমাণ হতে হবে headed paper-এ একটি আপ-টু-ডেট, 6-মাসের bank statement (আপনার আর/বা একজন sponsor-এর, বড় বা অনিয়মিত জমা ব্যাখ্যা করা); credit card গ্রহণযোগ্য না।',
      ),
    ],
    [IE_ISD_FINANCE],
    { allDegrees: true },
  );

const insurance = (id: string) =>
  qa(
    id,
    b('Is health insurance compulsory?', 'Health insurance কি বাধ্যতামূলক?'),
    [
      b(
        'Yes. All non-EEA students coming to Ireland must have private medical insurance, and proof of it is required both at the visa stage and again when you register your permission with Immigration Service Delivery.',
        'হ্যাঁ। Ireland-এ আসা সব non-EEA student-এর private medical insurance থাকতে হয়, আর এর প্রমাণ visa পর্যায়ে এবং Immigration Service Delivery-তে permission register করার সময় আবার লাগে।',
      ),
    ],
    [IE_ISD_FAQ],
    { allDegrees: true },
  );

const work = (id: string) =>
  qa(
    id,
    b('Can you work while studying in Ireland, and how many hours?', 'Ireland-এ পড়ার পাশাপাশি কাজ করা যায় কি, আর কত ঘণ্টা?'),
    [
      b(
        'Yes: you can work up to 20 hours a week during term time. During the holiday periods of June, July, August and September, and between 15 December and 15 January, you can work up to 40 hours a week. This is set out directly on Immigration Service Delivery’s own FAQ page for students.',
        'হ্যাঁ: term time-এ সপ্তাহে 20 ঘণ্টা পর্যন্ত কাজ করা যায়। June, July, August আর September-এর ছুটির সময়, আর 15 December থেকে 15 January-র মধ্যে, সপ্তাহে 40 ঘণ্টা পর্যন্ত কাজ করা যায়। এটা সরাসরি Immigration Service Delivery-র student-দের জন্য নিজের FAQ page-এ বলা আছে।',
      ),
    ],
    [IE_ISD_FAQ],
    { allDegrees: true },
  );

const after = (id: string, level: 'bachelors' | 'masters' | 'phd') =>
  qa(
    id,
    b('Can you stay in Ireland to work after graduating?', 'পড়া শেষে Ireland-এ কাজের জন্য থাকা যায়?'),
    [
      b(
        level === 'bachelors'
          ? 'Yes, through the Third Level Graduate Programme (immigration Stamp 1G). Graduates of a recognised Irish awarding body (including Trinity College Dublin, UCD, UCC and University of Galway) with an NFQ Level 8 honours bachelor’s award get up to twelve months’ permission to seek graduate-level employment and apply for an employment permit. You must apply within 6 months of being notified of your award, while holding a current Stamp 2 and an up-to-date registration card, and pay a EUR 300 registration fee.'
          : 'Yes, through the Third Level Graduate Programme (immigration Stamp 1G). Graduates of a recognised Irish awarding body (including Trinity College Dublin, UCD, UCC and University of Galway) with an NFQ Level 9 or above award (master’s/PhD) get an initial twelve months’ permission, renewable for a further twelve months (up to 24 months total) if you show you are taking active steps to find graduate-level employment, such as job interviews or registering with graduate employment agencies. You must apply within 6 months of being notified of your award, while holding a current Stamp 2 and an up-to-date registration card, and pay a EUR 300 registration fee.',
        level === 'bachelors'
          ? 'হ্যাঁ, Third Level Graduate Programme-এর (immigration Stamp 1G) মাধ্যমে। একটি স্বীকৃত Irish awarding body-র (Trinity College Dublin, UCD, UCC আর University of Galway-সহ) NFQ Level 8 honours bachelor\'s award থাকা graduate-রা graduate-level চাকরি খোঁজা আর একটি employment permit-এর আবেদনের জন্য বারো মাস পর্যন্ত permission পান। Award পাওয়ার কথা জানানোর 6 মাসের মধ্যে আবেদন করতে হয়, একটি বর্তমান Stamp 2 আর আপ-টু-ডেট registration card থাকা অবস্থায়, আর EUR 300 registration fee দিতে হয়।'
          : 'হ্যাঁ, Third Level Graduate Programme-এর (immigration Stamp 1G) মাধ্যমে। একটি স্বীকৃত Irish awarding body-র (Trinity College Dublin, UCD, UCC আর University of Galway-সহ) NFQ Level 9 বা তার বেশি award (master\'s/PhD) থাকা graduate-রা শুরুতে বারো মাসের permission পান, যা আরও বারো মাসের জন্য renew করা যায় (মোট 24 মাস পর্যন্ত) যদি graduate-level চাকরি খোঁজার জন্য সক্রিয় পদক্ষেপ (interview, graduate employment agency-তে নিবন্ধন) দেখাতে পারেন। Award পাওয়ার কথা জানানোর 6 মাসের মধ্যে আবেদন করতে হয়, একটি বর্তমান Stamp 2 আর আপ-টু-ডেট registration card থাকা অবস্থায়, আর EUR 300 registration fee দিতে হয়।',
      ),
      b(
        'Time spent on Stamp 2 (as a student) and Stamp 1G together cannot exceed an aggregate of seven years for a Level 8 graduate, or eight years overall where a Level 9+ re-entry applies; a graduate may access the Programme on no more than two separate occasions.',
        'একজন Level 8 graduate-এর জন্য Stamp 2 (student) আর Stamp 1G-এর সময় মোট সাত বছরের বেশি হতে পারে না, আর Level 9+ re-entry প্রযোজ্য হলে মোট আট বছর; একজন graduate দুইয়ের বেশি বার এই Programme-এ ঢুকতে পারেন না।',
      ),
    ],
    [IE_ISD_GRAD],
  );

const scholarships = (id: string) =>
  qa(
    id,
    b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'),
    [
      b(
        'The Government of Ireland International Education Scholarship (GOI-IES), run by the Higher Education Authority, is genuinely open to Bangladeshi applicants: eligibility is based on having a "domiciliary of origin outside the EU/EEA, Switzerland and the United Kingdom" (only Russian and Belarusian nationals are excluded by nationality), and you apply for it directly online, not through an institution’s nomination as with some other countries’ scholarships. It covers master’s, postgraduate diploma or PhD study (NFQ level 9 or 10) only, giving a EUR 10,000 stipend for one year plus a full fee waiver from the host institution; 60 are awarded each year. You must already hold a conditional or final offer from an eligible Irish institution before applying. The 2026 call closed on 12 March 2026, so check hea.ie for when the next call opens.',
        'Higher Education Authority-র চালানো Government of Ireland International Education Scholarship (GOI-IES) Bangladeshi আবেদনকারীদের জন্য আসলেই খোলা: যোগ্যতা "EU/EEA, Switzerland আর United Kingdom-এর বাইরে domiciliary of origin" (জাতীয়তা দিয়ে শুধু Russian আর Belarusian নাগরিক বাদ)-এর উপর ভিত্তি করে, আর এতে অন্য দেশের কিছু scholarship-এর মতো institution-এর nomination দিয়ে না, সরাসরি অনলাইনে আবেদন করা যায়। এটা শুধু master\'s, postgraduate diploma বা PhD পড়া (NFQ level 9 বা 10) কভার করে, এক বছরের জন্য EUR 10,000 stipend সঙ্গে host institution-এর একটি full fee waiver দিয়ে; প্রতি বছর 60টি দেওয়া হয়। আবেদনের আগে একটি যোগ্য Irish institution-এর conditional বা final offer থাকতে হয়। 2026 call 12 March 2026-এ বন্ধ হয়েছে, তাই পরের call কখন খুলবে তার জন্য hea.ie দেখুন।',
      ),
    ],
    [IE_HEA_GOIIES],
    { status: 'partly-verified', kind: 'guidance' },
  );

// ------------------------------------------------------------------ documents

const ISD = b('Immigration Service Delivery, or your visa office/embassy/consulate.', 'Immigration Service Delivery, বা আপনার visa office/embassy/consulate।');

export const IE_DOCUMENTS: GuideDocument[] = [
  {
    id: 'passport',
    name: b('Passport', 'Passport (পাসপোর্ট)'),
    why: b('Needed for the D study visa application and as your identity document throughout your stay.', 'D study visa আবেদনে আর থাকার পুরো সময় পরিচয়ের document হিসেবে লাগে।'),
    who: ISD,
    when: b('From the visa application through registration and every renewal.', 'Visa আবেদন থেকে registration আর প্রতি renewal পর্যন্ত।'),
    where: b('Submitted with the AVATS Summary Application Form and at the IRP registration appointment.', 'AVATS Summary Application Form-এর সাথে আর IRP registration appointment-এ জমা দিতে হয়।'),
    prepare: b('Keep it valid well beyond your intended stay.', 'প্রত্যাশিত থাকার সময়ের চেয়ে বেশ বেশি valid রাখুন।'),
    groups: ['general', 'visa'],
    sources: [IE_ISD_VISA_HOWTO],
  },
  {
    id: 'acceptance',
    name: b('Letter of acceptance', 'ভর্তির acceptance letter'),
    why: b('Proves your purpose of stay and that your learner-protection arrangements are in place; required for the visa application.', 'থাকার উদ্দেশ্য আর learner-protection arrangement ঠিক আছে প্রমাণ করে; visa আবেদনের জন্য লাগে।'),
    who: b('The Irish institution you applied to.', 'যে Irish institution-এ আবেদন করছেন।'),
    when: b('After admission, before the visa application.', 'ভর্তির পর, visa আবেদনের আগে।'),
    where: b('Submitted with the AVATS Summary Application Form.', 'AVATS Summary Application Form-এর সাথে জমা দিতে হয়।'),
    prepare: b('Must clearly state your learner-protection arrangements, per Immigration Service Delivery’s own requirements for providers.', 'Immigration Service Delivery-র provider-দের জন্য নিজের শর্ত অনুযায়ী এতে learner-protection arrangement স্পষ্টভাবে বলা থাকতে হয়।'),
    groups: ['general', 'visa'],
    sources: [IE_ISD_FAQ],
  },
  {
    id: 'academic',
    name: b('Secondary-school or prior-degree certificates', 'Secondary-school বা আগের degree-র সনদ'),
    why: b('University document (before admission): shows your previous education and academic ability; each institution sets its own foreign-qualification assessment.', 'University-র document (ভর্তির আগে): আগের পড়া আর academic ability দেখায়; প্রতিটি institution নিজস্ব বিদেশি-যোগ্যতা মূল্যায়নের নিয়ম ঠিক করে।'),
    who: b('The institution/programme you apply to.', 'যে institution/programme-এ আবেদন করছেন।'),
    when: b('With your application, by the institution’s own deadline.', 'Institution-এর নিজস্ব শেষ তারিখের মধ্যে আবেদনের সঙ্গে।'),
    where: b('Uploaded to the institution’s own online application system.', 'Institution-এর নিজস্ব online application system-এ upload করতে হয়।'),
    prepare: b('Exact recognition/translation requirements for the Bangladeshi HSC or a Bangladeshi bachelor’s degree were not itemized on an official page read for this guide — ask your chosen institution directly.', 'Bangladeshi HSC বা একটি Bangladeshi bachelor\'s degree-র সঠিক recognition/translation শর্ত এই guide-এর জন্য পড়া কোনো official page-এ তালিকাভুক্ত ছিল না — সরাসরি আপনার বাছা institution-কে জিজ্ঞাসা করুন।'),
    groups: ['general', 'program', 'bangladesh'],
    status: 'not-verified',
    sources: [IE_TCD_ENTRY],
  },
  {
    id: 'english',
    name: b('English proficiency proof', 'ইংরেজি দক্ষতার প্রমাণ'),
    why: b('University document for English-taught programmes; accepted tests and minimum scores are set by each institution (TCD’s standard "Band B" is IELTS 6.5 overall/6.0 each component; UCD and University of Galway both state IELTS 6.5 overall/6.0 each band; UCC’s standard undergraduate requirement is IELTS 6.5 overall/6.0 each band, except Medicine & Health programmes at 6.5/6.5).', 'ইংরেজি-মাধ্যম programme-এর university document; গ্রহণযোগ্য test আর ন্যূনতম score প্রতিটি institution ঠিক করে (TCD-র standard "Band B" হলো IELTS 6.5 overall/6.0 প্রতি component; UCD আর University of Galway দুটোই IELTS 6.5 overall/6.0 প্রতি band বলে; UCC-র standard undergraduate শর্ত IELTS 6.5 overall/6.0 প্রতি band, Medicine & Health programme ছাড়া যেখানে 6.5/6.5)।'),
    who: b('The institution/programme you apply to.', 'যে institution/programme-এ আবেদন করছেন।'),
    when: b('By the programme’s deadline; test results must usually be issued within 2 years of your course start.', 'Programme-এর শেষ তারিখের মধ্যে; test result সাধারণত course শুরুর 2 বছরের মধ্যে ইস্যু করা থাকতে হয়।'),
    where: b('As instructed by the institution’s own admissions page.', 'Institution-এর নিজস্ব admissions page-এর নির্দেশ অনুযায়ী।'),
    prepare: b('Scores differ by programme (e.g. TCD’s "Band C" higher requirement is IELTS 7.0/6.5); always check your own programme.', 'Score programme অনুযায়ী আলাদা (যেমন, TCD-র "Band C" উচ্চতর শর্ত IELTS 7.0/6.5); সবসময় আপনার নিজের programme দেখুন।'),
    groups: ['program'],
    sources: [IE_TCD_ENGLISH, IE_UCD_ENGLISH, IE_UCC_ENGLISH, IE_GALWAY_ENTRY],
  },
  {
    id: 'funds',
    name: b('Proof of sufficient resources', 'পর্যাপ্ত টাকার প্রমাণ'),
    why: b('Visa requirement: a bank statement (yours and/or a sponsor’s) showing at least EUR 10,000 immediately accessible for the first year, plus EUR 10,000 for each later year in addition to course fees.', 'Visa-র শর্ত: একটি bank statement (আপনার আর/বা sponsor-এর) যা প্রথম বছরের জন্য অন্তত EUR 10,000 তাৎক্ষণিক পাওয়ার মতো দেখায়, সঙ্গে course fee-র উপর প্রতি পরের বছরের জন্য EUR 10,000।'),
    who: ISD,
    when: b('With the visa application.', 'Visa আবেদনের সাথে।'),
    where: b('Submitted with the AVATS Summary Application Form.', 'AVATS Summary Application Form-এর সাথে জমা দিতে হয়।'),
    prepare: b('Bank statements must be on headed paper, cover the last 6 months, and show your name, address, account number and type; credit cards are not accepted; large or irregular deposits must be explained.', 'Bank statement headed paper-এ হতে হবে, শেষ 6 মাস কভার করবে, আর আপনার নাম, ঠিকানা, account number আর type দেখাবে; credit card গ্রহণযোগ্য না; বড় বা অনিয়মিত জমা ব্যাখ্যা করতে হবে।'),
    groups: ['visa', 'bangladesh'],
    sources: [IE_ISD_FINANCE],
  },
  {
    id: 'insurance',
    name: b('Private medical insurance', 'Private medical insurance (ব্যক্তিগত চিকিৎসা insurance)'),
    why: b('Compulsory for all non-EEA students coming to Ireland; proof is checked at both the visa stage and registration.', 'Ireland-এ আসা সব non-EEA student-এর জন্য বাধ্যতামূলক; এর প্রমাণ visa পর্যায়ে আর registration-এ দুই জায়গায় checked হয়।'),
    who: b('A private insurer; the policy or acceptance letter must show you are covered.', 'একটি private insurer; policy বা acceptance letter দেখাতে হবে আপনি covered।'),
    when: b('Before applying for the visa, and shown again when you register.', 'Visa আবেদনের আগে, আর register করার সময় আবার দেখাতে হয়।'),
    where: b('Submitted with the AVATS Summary Application Form and at the IRP registration appointment.', 'AVATS Summary Application Form-এর সাথে আর IRP registration appointment-এ জমা দিতে হয়।'),
    prepare: b('Your acceptance letter should also confirm your provider’s learner-protection arrangements, a separate but related requirement.', 'আপনার acceptance letter-এ provider-এর learner-protection arrangement-ও নিশ্চিত থাকা উচিত, একটি আলাদা কিন্তু সম্পর্কিত শর্ত।'),
    groups: ['visa', 'arrival'],
    sources: [IE_ISD_FAQ, IE_ISD_VISA_HOWTO],
  },
  {
    id: 'irp-registration',
    name: b('IRP registration (first-time)', 'IRP registration (প্রথমবার)'),
    why: b('All non-EEA students staying more than 90 days must register with Immigration Service Delivery to get an Irish Residence Permit (IRP) card showing their Stamp 2 permission.', '90 দিনের বেশি থাকা সব non-EEA student-কে Immigration Service Delivery-এ register করতে হয় যাতে তাদের Stamp 2 permission দেখানো একটি Irish Residence Permit (IRP) card পান।'),
    who: b('Immigration Service Delivery’s public Registration Office (Burgh Quay, Dublin, for most students).', 'Immigration Service Delivery-র public Registration Office (অধিকাংশ student-দের জন্য Burgh Quay, Dublin)।'),
    when: b('Within 90 days of arrival, by appointment booked via the Customer Portal.', 'পৌঁছানোর 90 দিনের মধ্যে, Customer Portal-এর মাধ্যমে বুক করা appointment-এ।'),
    where: b('The public Registration Office; a fee of EUR 300 is paid at registration.', 'Public Registration Office; registration-এ EUR 300 fee দিতে হয়।'),
    prepare: b('Bring your passport, visa, acceptance letter, medical insurance and proof of finances.', 'আপনার passport, visa, acceptance letter, medical insurance আর টাকার প্রমাণ সাথে নিয়ে যান।'),
    groups: ['arrival'],
    sources: [IE_ISD_FAQ, IE_ISD_REGISTER],
  },
];

// ------------------------------------------------------------------ costs (EUR, never converted)

const FUNDS_YEAR1: GuideCost = { id: 'funds-living', label: b('Funds to show (official figure, first year)', 'দেখানোর টাকা (official figure, প্রথম বছর)'), value: b('At least EUR 10,000 immediately accessible, the official estimated cost of living for one academic year', 'অন্তত EUR 10,000 তাৎক্ষণিক পাওয়ার মতো, এক শিক্ষাবর্ষের থাকার official আনুমানিক খরচ'), amount: { value: 10000, currency: 'EUR', period: 'year' }, source: IE_ISD_FINANCE };
const REGISTRATION_FEE: GuideCost = { id: 'registration-fee', label: b('IRP first-time registration fee', 'IRP প্রথমবারের registration fee'), value: b('EUR 300, paid at your first registration appointment', 'EUR 300, প্রথম registration appointment-এ দিতে হয়'), amount: { value: 300, currency: 'EUR', period: 'one-time' }, source: IE_ISD_FAQ };
const GRAD_SCHEME_FEE: GuideCost = { id: 'grad-scheme-fee', label: b('Third Level Graduate Programme (Stamp 1G) registration fee', 'Third Level Graduate Programme (Stamp 1G) registration fee'), value: b('EUR 300 per person, to register', 'জনপ্রতি EUR 300, register করার জন্য'), amount: { value: 300, currency: 'EUR', period: 'one-time' }, source: IE_ISD_GRAD };
const UNVERIFIED: GuideCost[] = [
  { id: 'visa-fee', label: b('D study visa application fee', 'D study visa application fee'), value: b('Not itemized from an official fee-schedule page read for this guide — check irishimmigration.ie’s own current visa-fees page before applying', 'এই guide-এর জন্য পড়া কোনো official fee-schedule page থেকে তালিকাভুক্ত হয়নি — আবেদনের আগে irishimmigration.ie-র নিজের বর্তমান visa-fees page দেখুন'), status: 'not-verified', source: IE_ISD_VISA_HOWTO },
  { id: 'living', label: b('Living costs beyond the official EUR 10,000/year funds figure', 'Official EUR 10,000/বছর টাকার সংখ্যার বাইরে থাকা-খাওয়ার খরচ'), value: b('Immigration Service Delivery directs students to their college/university for cost-of-living advice beyond the EUR 10,000 official figure; no further official breakdown (rent, food, transport) was read for this guide', 'Immigration Service Delivery EUR 10,000 official figure-এর বাইরে থাকা-খাওয়ার খরচের পরামর্শের জন্য student-দের college/university-কে দেখতে বলে; এই guide-এর জন্য আর কোনো official ভাঙন (rent, food, transport) পড়া হয়নি'), status: 'not-verified', source: IE_ISD_FAQ },
];

// ------------------------------------------------------------------ common sections

const commonTail = () => [
  { id: 'costs', title: b('Costs', 'খরচ'), items: [{ embed: 'costs' as const }] },
  { id: 'documents', title: b('Documents', 'Documents'), items: [{ embed: 'documents' as const }] },
  {
    id: 'universities',
    title: b('Universities', 'University'),
    items: [
      qa('types', b('Which universities are there?', 'কোন কোন university আছে?'), [b('The examples below — Trinity College Dublin, University College Cork, University College Dublin and University of Galway — are listed alphabetically, not ordered by quality. Tuition, deadlines, entry requirements and scholarships differ at each one, so check the official page.', 'নিচের উদাহরণ — Trinity College Dublin, University College Cork, University College Dublin, আর University of Galway — বর্ণানুক্রমে, মান অনুযায়ী নয়। Tuition, deadline, ভর্তির শর্ত আর scholarship প্রতিটিতে আলাদা, তাই official page দেখুন।')], [IE_TCD_UG_FEES]),
      { embed: 'universities' as const },
    ],
  },
  { id: 'work', title: b('Working while studying', 'পড়ার সময় কাজ'), items: [work('work'), insurance('insurance')] },
  { id: 'visa', title: b('Student visa and registration', 'Student visa আর registration'), items: [visaRequired('visa-required'), visaProcess('visa-process'), register('register'), stayLimit('stay-limit')] },
];

// ------------------------------------------------------------------ Bachelor's

const BACHELORS: DegreeGuide = {
  level: 'bachelors',
  card: b('Apply directly to each university · D study visa + EUR 10,000 funds · Stamp 1G gives 12 months after graduating', 'প্রতিটি university-তে সরাসরি আবেদন · D study visa + EUR 10,000 টাকা · Stamp 1G গ্র্যাজুয়েশনের পর 12 মাস দেয়'),
  intro: b(
    "For an English-taught bachelor's in Ireland, you need a secondary-school certificate the institution recognises for direct entry (or its own Foundation Programme if you do not have one), the institution's own entrance requirements (an English proficiency score; Trinity College Dublin's own 'Band B' standard is IELTS 6.5 overall with 6.0 in each component, and Irish universities generally ask around that level), and your course must be listed on the Interim List of Eligible Programmes (ILEP). As a visa-required Bangladeshi applicant, you apply to the university first, then for a long-stay 'D' study visa once admitted.",
    "Ireland-এ ইংরেজি-মাধ্যম bachelor's-এর জন্য লাগে institution-এর direct entry-র জন্য স্বীকৃত একটি secondary-school সনদ (না থাকলে institution-এর নিজের Foundation Programme), institution-এর নিজস্ব ভর্তির শর্ত (একটি English দক্ষতার score; Trinity College Dublin-এর নিজের 'Band B' standard হলো IELTS 6.5 overall, প্রতি component-এ 6.0, আর Irish university-গুলো সাধারণত এর কাছাকাছি level চায়), আর আপনার course Interim List of Eligible Programmes (ILEP)-এ তালিকাভুক্ত থাকতে হবে। Visa-required Bangladeshi আবেদনকারী হিসেবে, প্রথমে university-তে আবেদন করুন, তারপর ভর্তি হলে একটি long-stay 'D' study visa-র জন্য।",
  ),
  costs: { official: [FUNDS_YEAR1, REGISTRATION_FEE], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Most asked: requirements and HSC', 'সবচেয়ে বেশি জিজ্ঞাসা: শর্ত আর HSC'),
      items: [
        qa(
          'requirements',
          b("What do you need to study a Bachelor's in Ireland from Bangladesh?", "Bangladesh থেকে Ireland-এ Bachelor's পড়তে কী কী লাগে?"),
          [b('A secondary-school certificate the institution accepts for direct entry (or its Foundation Programme if not), the institution’s own English-proficiency score, a place on a course listed on the ILEP, proof of resources of at least EUR 10,000 for the first year, and a D study visa.', 'Institution-এর direct entry-র জন্য স্বীকৃত একটি secondary-school সনদ (না থাকলে Foundation Programme), institution-এর নিজের English-দক্ষতার score, ILEP-এ তালিকাভুক্ত একটি course-এ জায়গা, প্রথম বছরের জন্য অন্তত EUR 10,000 টাকার প্রমাণ, আর একটি D study visa।'), CHECK_UNI],
          [IE_TCD_ENTRY, IE_ISD_FINANCE],
          { status: 'partly-verified' },
        ),
        qa(
          'hsc',
          b('Can you go straight into a Bachelor’s after HSC?', 'HSC শেষ করে কি সরাসরি Bachelor\'s-এ যাওয়া যায়?'),
          [b('Not verified yet for Bangladesh specifically as a single national rule: Trinity College Dublin’s own entry-requirements page accepts the International Baccalaureate, A-levels and several other named national curricula for direct entry, and points applicants to a country-specific page for others, but a dedicated Bangladesh-HSC entry page was not read for this guide — ask your chosen institution directly.', 'Bangladesh-এর জন্য নির্দিষ্টভাবে একটি একক জাতীয় নিয়ম হিসেবে এখনো যাচাই হয়নি: Trinity College Dublin-এর নিজের entry-requirements page International Baccalaureate, A-levels আর বেশ কিছু নামযুক্ত জাতীয় curriculum direct entry-র জন্য গ্রহণ করে, আর অন্যদের জন্য একটি country-specific page দেখায়, কিন্তু এই guide-এর জন্য Bangladesh-HSC-র জন্য আলাদা কোনো entry page পড়া হয়নি — সরাসরি আপনার বাছা institution-কে জিজ্ঞাসা করুন।')],
          [IE_TCD_ENTRY],
          { status: 'not-verified' },
        ),
      ],
    },
    {
      id: 'apply',
      title: b('Applying', 'আবেদন'),
      items: [
        qa(
          'process',
          b('When and how do you apply?', 'কখন আর কীভাবে আবেদন করবেন?'),
          [b('As a non-EU applicant you apply directly to each university’s own online application system (not through the CAO, which is for the Irish Leaving Certificate route). Trinity College Dublin, for example, opens applications on 1 November for September admission the following year; UCD opens undergraduate applications on 1 October for the following September and recommends visa-required applicants apply before 1 July.', 'একজন non-EU আবেদনকারী হিসেবে প্রতিটি university-র নিজস্ব online application system-এ সরাসরি আবেদন করতে হয় (CAO দিয়ে না, যা Irish Leaving Certificate route-এর জন্য)। যেমন, Trinity College Dublin পরের বছরের September admission-এর জন্য 1 November-এ application খোলে; UCD পরের September-এর জন্য undergraduate application 1 October-এ খোলে আর visa-required আবেদনকারীদের 1 July-র আগে আবেদন করার পরামর্শ দেয়।')],
          [IE_TCD_ENTRY, IE_UCD_HOWTOAPPLY],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'language',
      title: b('English and IELTS', 'ইংরেজি আর IELTS'),
      items: [
        qa(
          'english',
          b("How much IELTS do you need for a Bachelor's in Ireland?", "Ireland-এ Bachelor's-এ IELTS কত লাগে?"),
          [b('Not a single national minimum — set per institution. Trinity College Dublin’s standard "Band B" requirement is IELTS 6.5 overall with 6.0 in each component (its higher "Band C" requirement is 7.0/6.5); UCD asks an average of 6.5 overall with a minimum of 6.0 in each band; UCC’s standard undergraduate requirement is also 6.5 overall/6.0 each band (Medicine & Health programmes ask 6.5/6.5); University of Galway asks 6.5 overall with no section below 6.0.', 'একক জাতীয় ন্যূনতম না — প্রতিটি institution ঠিক করে। Trinity College Dublin-এর standard "Band B" শর্ত IELTS 6.5 overall, প্রতি component-এ 6.0 (এর উচ্চতর "Band C" শর্ত 7.0/6.5); UCD গড়ে 6.5 overall আর প্রতি band-এ ন্যূনতম 6.0 চায়; UCC-র standard undergraduate শর্তও 6.5 overall/6.0 প্রতি band (Medicine & Health programme-এ 6.5/6.5 চায়); University of Galway 6.5 overall চায় কোনো section 6.0-এর নিচে না।'), CHECK_UNI],
          [IE_TCD_ENGLISH, IE_UCD_ENGLISH, IE_UCC_ENGLISH, IE_GALWAY_ENTRY],
        ),
      ],
    },
    {
      id: 'tuition',
      title: b('Tuition and scholarships', 'Tuition আর scholarship'),
      items: [
        qa(
          'tuition',
          b("How much is a Bachelor's in Ireland?", "Ireland-এ Bachelor's-এ খরচ কত?"),
          [b('There is no single national non-EU undergraduate fee — each university and each programme sets its own. As one example, Trinity College Dublin’s 2026/27 non-EU Year 1 fee for its Ancient History and Archaeology joint-honours programmes is EUR 22,580; University College Cork’s 2026/27 non-EU undergraduate fees range from about EUR 16,300 (Business and Financial Economics) to EUR 27,000 (most Science, Engineering and Food Science programmes) and up to EUR 52,100 for Medicine/Dentistry; University College Dublin and University of Galway publish their own fee schedules per programme, which were not itemized with a specific figure in this research. See each university’s profile and its own fees page before relying on any single figure.', 'একক জাতীয় non-EU undergraduate fee নেই — প্রতিটি university আর প্রতিটি programme নিজস্ব fee ঠিক করে। একটা উদাহরণ হিসেবে, Trinity College Dublin-এর 2026/27-এর non-EU Year 1 fee Ancient History and Archaeology joint-honours programme-এ EUR 22,580; University College Cork-এর 2026/27-এর non-EU undergraduate fee প্রায় EUR 16,300 (Business and Financial Economics) থেকে EUR 27,000 (অধিকাংশ Science, Engineering and Food Science programme) আর Medicine/Dentistry-এ EUR 52,100 পর্যন্ত; University College Dublin আর University of Galway নিজস্ব fee schedule প্রতি programme প্রকাশ করে, যা এই গবেষণায় একটি নির্দিষ্ট সংখ্যা দিয়ে তালিকাভুক্ত হয়নি। কোনো একটি সংখ্যার উপর নির্ভর করার আগে প্রতিটি university-র profile আর তার নিজের fee page দেখুন।')],
          [IE_TCD_UG_FEES, IE_UCC_UG_FEES],
          { kind: 'estimate', status: 'partly-verified' },
        ),
        scholarships('scholarships'),
      ],
    },
    ...commonTail(),
    { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after', 'bachelors')] },
  ],
};

// ------------------------------------------------------------------ Master's

const MASTERS: DegreeGuide = {
  level: 'masters',
  card: b('A recognised bachelor’s needed · Stamp 1G gives up to 24 months after graduating', 'স্বীকৃত bachelor\'s লাগে · Stamp 1G গ্র্যাজুয়েশনের পর 24 মাস পর্যন্ত দেয়'),
  intro: b(
    "An Irish master's needs a recognised bachelor's degree plus the institution's own requirements. Trinity College Dublin's own postgraduate page, for example, asks for at least a 2.1 honours degree (60%) or an equivalent result from a university in another country, plus English proficiency. You apply directly to each university's own online application system and, as a visa-required Bangladeshi applicant, for a D study visa once admitted; your course must be listed on the ILEP.",
    "একটি Irish master's-এ লাগে স্বীকৃত bachelor's degree সঙ্গে institution-এর নিজস্ব শর্ত। যেমন, Trinity College Dublin-এর নিজের postgraduate page অন্তত একটি 2.1 honours degree (60%) বা অন্য দেশের একটি university-র সমতুল্য result চায়, সঙ্গে English দক্ষতা। প্রতিটি university-র নিজস্ব online application system-এ সরাসরি আবেদন করতে হয় আর, visa-required Bangladeshi আবেদনকারী হিসেবে, ভর্তি হলে একটি D study visa-র জন্য; আপনার course ILEP-এ তালিকাভুক্ত থাকতে হবে।",
  ),
  costs: { official: [FUNDS_YEAR1, REGISTRATION_FEE], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'bachelor',
          b("What do you need for a Master's in Ireland?", "Ireland-এ Master's-এ কী লাগে?"),
          [b('A recognised bachelor’s degree — Trinity College Dublin’s own postgraduate page asks for at least a 2.1 honours degree (60%) or an equivalent result — plus the institution’s own English-proficiency score and two academic (or clinical, where relevant) references. Not verified yet for Bangladesh specifically: how institutions assess a Bangladeshi bachelor’s degree grade against this threshold was not read on an official page.', 'একটি স্বীকৃত bachelor\'s degree — Trinity College Dublin-এর নিজের postgraduate page অন্তত একটি 2.1 honours degree (60%) বা সমতুল্য result চায় — সঙ্গে institution-এর নিজের English-দক্ষতার score আর দুইজন academic (বা প্রয়োজনে clinical) referee। Bangladesh-এর জন্য নির্দিষ্টভাবে এখনো যাচাই হয়নি: institution-গুলো এই threshold-এর বিপরীতে Bangladesh-এর bachelor\'s degree-র grade ঠিক কীভাবে মূল্যায়ন করে, কোনো official page-এ পড়া হয়নি।')],
          [IE_TCD_ENTRY],
          { status: 'partly-verified' },
        ),
      ],
    },
    { id: 'apply', title: b('Applying', 'আবেদন'), items: [qa('process', b('How do you apply?', 'কীভাবে আবেদন করবেন?'), [b('Directly to each university’s own online application system; the exact portal and documents differ by institution and programme.', 'সরাসরি প্রতিটি university-র নিজস্ব online application system-এ; ঠিক portal আর document institution আর programme অনুযায়ী আলাদা।')], [IE_UCD_HOWTOAPPLY], { kind: 'guidance' })] },
    {
      id: 'language',
      title: b('English and IELTS', 'ইংরেজি আর IELTS'),
      items: [
        qa(
          'english',
          b("How much IELTS do you need for a Master's?", "Master's-এ IELTS কত লাগে?"),
          [b('Not a single national minimum — Trinity College Dublin’s standard "Band B" (6.5 overall/6.0 each component) applies to the majority of its undergraduate and postgraduate courses; UCD and University of Galway both state 6.5 overall/6.0 each band generally; always check your own programme.', 'একক জাতীয় ন্যূনতম না — Trinity College Dublin-এর standard "Band B" (6.5 overall/6.0 প্রতি component) এর অধিকাংশ undergraduate আর postgraduate course-এ প্রযোজ্য; UCD আর University of Galway দুটোই সাধারণভাবে 6.5 overall/6.0 প্রতি band বলে; সবসময় আপনার নিজের programme দেখুন।'), CHECK_UNI],
          [IE_TCD_ENGLISH, IE_UCD_ENGLISH, IE_GALWAY_ENTRY],
        ),
      ],
    },
    {
      id: 'tuition',
      title: b('Tuition and scholarships', 'Tuition আর scholarship'),
      items: [
        qa(
          'tuition',
          b("How much is a Master's in Ireland?", "Ireland-এ Master's-এ খরচ কত?"),
          [b('Set per programme, not nationally. University of Galway’s own 2026/27 postgraduate fee schedule lists non-EU master’s fees from about EUR 13,840 (MSc International Accounting and Analytics, pathway B) to roughly EUR 21,640 (several MSc programmes in its College of Business, Public Policy and Law). Trinity College Dublin and UCD publish their own postgraduate fee pages, which were not itemized with a specific figure in this research — check each programme directly.', 'প্রতি programme অনুযায়ী ঠিক হয়, জাতীয়ভাবে না। University of Galway-র নিজের 2026/27-এর postgraduate fee schedule non-EU master\'s fee প্রায় EUR 13,840 (MSc International Accounting and Analytics, pathway B) থেকে প্রায় EUR 21,640 (College of Business, Public Policy and Law-এর কয়েকটি MSc programme) পর্যন্ত তালিকাভুক্ত করে। Trinity College Dublin আর UCD নিজস্ব postgraduate fee page প্রকাশ করে, যা এই গবেষণায় একটি নির্দিষ্ট সংখ্যা দিয়ে তালিকাভুক্ত হয়নি — প্রতিটি programme সরাসরি দেখুন।')],
          [IE_GALWAY_PG_FEES],
          { kind: 'estimate', status: 'partly-verified' },
        ),
        scholarships('scholarships'),
      ],
    },
    ...commonTail(),
    { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after', 'masters')] },
  ],
};

// ------------------------------------------------------------------ PhD

const PHD: DegreeGuide = {
  level: 'phd',
  card: b('A recognised master’s usually needed · Stamp 1G gives up to 24 months after graduating', 'সাধারণত স্বীকৃত master\'s লাগে · Stamp 1G গ্র্যাজুয়েশনের পর 24 মাস পর্যন্ত দেয়'),
  intro: b(
    "An Irish PhD (a 'structured PhD' at most universities) usually needs a recognised master's degree and a supervisor or doctoral programme willing to take you on; a few structured PhDs admit strong bachelor's graduates directly. Apply through the institution's own doctoral-admissions process alongside the D study visa route once admitted; exact entry requirements, funding and application rounds are set by each institution and were not verified here as general national rules.",
    "একটি Irish PhD (অধিকাংশ university-তে একটি 'structured PhD') সাধারণত লাগে স্বীকৃত master's degree আর নিতে ইচ্ছুক একজন supervisor বা doctoral programme; কিছু structured PhD সরাসরি ভালো bachelor's graduate ভর্তি করে। Institution-এর নিজস্ব doctoral-admissions process দিয়ে আবেদন করুন, ভর্তি হলে D study visa route-এর সাথে; সঠিক ভর্তির শর্ত, funding আর আবেদনের সময় প্রতিটি institution ঠিক করে, সাধারণ জাতীয় নিয়ম হিসেবে এখানে যাচাই হয়নি।",
  ),
  costs: { official: [FUNDS_YEAR1, REGISTRATION_FEE], estimates: [...UNVERIFIED] },
  sections: [
    {
      id: 'eligibility',
      title: b('Who can apply', 'কারা আবেদন করতে পারেন'),
      items: [
        qa(
          'position',
          b('How do you get a PhD in Ireland?', 'Ireland-এ কীভাবে PhD পাওয়া যায়?'),
          [
            b('You typically need a recognised master’s degree and a supervisor or structured-PhD programme willing to accept you, often tied to funding. University of Galway, for instance, lists many "Structured PhD" programmes with their own non-EU fee (around EUR 14,500–14,640/year in its 2026/27 schedule). Apply through the institution’s own doctoral-admissions process; exact entry requirements beyond this general shape were not verified here as national rules.', 'সাধারণত লাগে স্বীকৃত master\'s degree আর গ্রহণ করতে ইচ্ছুক একজন supervisor বা structured-PhD programme, প্রায়ই funding-এর সাথে যুক্ত। উদাহরণস্বরূপ, University of Galway তার 2026/27 schedule-এ নিজস্ব non-EU fee-সহ (প্রায় বছরে EUR 14,500–14,640) অনেক "Structured PhD" programme তালিকাভুক্ত করে। Institution-এর নিজস্ব doctoral-admissions process দিয়ে আবেদন করুন; এই সাধারণ ধারার বাইরে সঠিক ভর্তির শর্ত জাতীয় নিয়ম হিসেবে এখানে যাচাই হয়নি।'),
            CHECK_UNI,
          ],
          [IE_GALWAY_PG_FEES],
          { status: 'partly-verified' },
        ),
      ],
    },
    {
      id: 'language',
      title: b('English and IELTS', 'ইংরেজি আর IELTS'),
      items: [
        qa(
          'english',
          b('How much IELTS do you need for a PhD?', 'PhD-তে IELTS কত লাগে?'),
          [b('Not verified yet as a single general rule: each institution’s doctoral school/supervisor states its own English requirement, typically around the same IELTS 6.5/6.0 standard used for other postgraduate programmes.', 'সাধারণ নিয়ম হিসেবে এখনো যাচাই হয়নি: প্রতিটি institution-এর doctoral school/supervisor নিজের English শর্ত দেয়, সাধারণত অন্য postgraduate programme-এ ব্যবহৃত একই IELTS 6.5/6.0 standard-এর কাছাকাছি।')],
          [IE_GALWAY_ENTRY],
          { status: 'partly-verified' },
        ),
      ],
    },
    ...commonTail(),
    { id: 'after', title: b('After your studies', 'পড়া শেষে'), items: [after('after', 'phd')] },
  ],
};

// ------------------------------------------------------------------ the country

export const IE_GUIDE: CountryGuide = {
  code: 'IE',
  checkedAt: IE_READ,
  sourcesPerSection: true,
  intro: b(
    'Ireland is not in the Schengen area and keeps its own, separate visa system: Bangladesh is on Immigration Service Delivery’s visa-required list, so Bangladeshi applicants need a long-stay "D" study visa for any course lasting more than 3 months, applied for via AVATS up to 3 months before travel (Ireland has no Embassy in Bangladesh — applications go through the Irish Embassy in New Delhi). For a visa-required applicant starting a course after 1 July 2023, you must show immediate access to at least EUR 10,000 (the official estimated one-year cost of living) plus EUR 10,000 for each further year in addition to course fees. Private medical insurance is compulsory. After arriving, all non-EEA students staying over 90 days must register with Immigration Service Delivery (EUR 300 fee) for an Irish Residence Permit (IRP) card. During study you may work up to 20 hours a week in term time and up to 40 hours a week in June–September and 15 December–15 January. There is no single national non-EU tuition fee: each university and programme sets its own (examples read for this guide range from about EUR 16,300 to over EUR 50,000 a year depending on the institution and programme). After graduating, the Third Level Graduate Programme (Stamp 1G) lets graduates of a recognised Irish awarding body stay to seek work: 12 months for an NFQ Level 8 honours bachelor’s award, and up to 24 months (12 months initial, renewable once) for a Level 9-or-above (master’s/PhD) award. The Government of Ireland International Education Scholarship (GOI-IES), run by the Higher Education Authority, is genuinely open to Bangladeshi applicants for master’s/PhD study (EUR 10,000 stipend + fee waiver, applied for directly online) — unlike some other countries’ national scholarships, it is not institution-nomination-only, though its 2026 call is closed. This guide is built from Immigration Service Delivery (irishimmigration.ie), the Department of Foreign Affairs (ireland.ie), the Higher Education Authority (hea.ie) and university pages.',
    'Ireland Schengen area-র অংশ না আর এর নিজের আলাদা visa system রাখে: Bangladesh Immigration Service Delivery-র visa-required তালিকায় আছে, তাই Bangladeshi আবেদনকারীদের 3 মাসের বেশি সময়ের কোনো course-এর জন্য একটি long-stay "D" study visa লাগে, যাত্রার 3 মাস আগে পর্যন্ত AVATS-এর মাধ্যমে আবেদন করতে হয় (Ireland-এর Bangladesh-এ কোনো Embassy নেই — application New Delhi-র Irish Embassy-র মাধ্যমে যায়)। 1 July 2023-এর পরে course শুরু করা একজন visa-required আবেদনকারীকে অন্তত EUR 10,000 তাৎক্ষণিক পাওয়ার প্রমাণ দিতে হয় (এক বছরের থাকার official আনুমানিক খরচ), সঙ্গে course fee-র উপর প্রতি পরের বছরের জন্য EUR 10,000। Private medical insurance বাধ্যতামূলক। পৌঁছানোর পর, 90 দিনের বেশি থাকা সব non-EEA student-কে Immigration Service Delivery-এ register করতে হয় (EUR 300 fee) একটি Irish Residence Permit (IRP) card পাওয়ার জন্য। পড়ার সময় term time-এ সপ্তাহে 20 ঘণ্টা আর June–September আর 15 December–15 January-তে সপ্তাহে 40 ঘণ্টা পর্যন্ত কাজ করা যায়। একক কোনো জাতীয় non-EU tuition fee নেই: প্রতিটি university আর programme নিজস্ব fee ঠিক করে (এই guide-এর জন্য পড়া উদাহরণ institution আর programme অনুযায়ী বছরে প্রায় EUR 16,300 থেকে EUR 50,000-এর বেশি পর্যন্ত)। গ্র্যাজুয়েশনের পর, Third Level Graduate Programme (Stamp 1G) একটি স্বীকৃত Irish awarding body-র graduate-দের চাকরি খোঁজার জন্য থাকার অনুমতি দেয়: NFQ Level 8 honours bachelor\'s award-এর জন্য 12 মাস, আর Level 9-বা-তার-বেশি (master\'s/PhD) award-এর জন্য 24 মাস পর্যন্ত (শুরুতে 12 মাস, একবার renewable)। Higher Education Authority-র চালানো Government of Ireland International Education Scholarship (GOI-IES) master\'s/PhD পড়ার জন্য Bangladeshi আবেদনকারীদের জন্য আসলেই খোলা (EUR 10,000 stipend + fee waiver, সরাসরি অনলাইনে আবেদন করা যায়) — অন্য কিছু দেশের জাতীয় scholarship-এর মতো না, এটা institution-nomination-only না, যদিও এর 2026 call বন্ধ। এই guide Immigration Service Delivery (irishimmigration.ie), Department of Foreign Affairs (ireland.ie), Higher Education Authority (hea.ie), আর university page থেকে তৈরি।',
  ),
  overview: [
    qa(
      'mistakes',
      b('Which mistakes should you avoid?', 'কোন ভুলগুলো এড়াবেন?'),
      [b('Points from the official sources:', 'Official source থেকে:')],
      [IE_ISD_VISA_LIST, IE_ISD_FINANCE, IE_ISD_GRAD],
      {
        kind: 'guidance',
        list: [
          b('Assuming a Schengen visa or an EU-citizen route applies — Ireland is not in the Schengen area and runs its own separate visa system, and Bangladesh is a visa-required nationality for Ireland.', 'ধরে নেওয়া যে একটি Schengen visa বা EU-citizen route প্রযোজ্য — Ireland Schengen area-র অংশ না আর এর নিজের আলাদা visa system চালায়, আর Ireland-এর জন্য Bangladesh একটি visa-required জাতীয়তা।'),
          b('Assuming the Third Level Graduate Programme (Stamp 1G) gives the same 24 months to everyone — it gives 12 months for a Level 8 honours bachelor’s award and up to 24 months (renewable) only for a Level 9-or-above award.', 'ধরে নেওয়া যে Third Level Graduate Programme (Stamp 1G) সবাইকে একই 24 মাস দেয় — এটা Level 8 honours bachelor\'s award-এর জন্য 12 মাস দেয় আর শুধু Level 9-বা-তার-বেশি award-এর জন্য 24 মাস (renewable) পর্যন্ত দেয়।'),
          b('Underestimating the proof-of-funds requirement — it is EUR 10,000 for the first year AND EUR 10,000 for each later year, in addition to course fees, not a one-time figure.', 'টাকার প্রমাণের শর্ত কম ধরা — এটা প্রথম বছরের জন্য EUR 10,000 আর প্রতি পরের বছরের জন্য EUR 10,000, course fee-র উপর, একবারের সংখ্যা না।'),
          b('Assuming a single national non-EU tuition figure exists — each university and programme sets its own, and figures vary widely.', 'ধরে নেওয়া যে একটি একক জাতীয় non-EU tuition সংখ্যা আছে — প্রতিটি university আর programme নিজস্ব fee ঠিক করে, আর সংখ্যা অনেক আলাদা।'),
          b('Forgetting the separate IRP registration step and its EUR 300 fee after arriving — the visa only gets you into Ireland; registration (within 90 days) is a further, compulsory step.', 'পৌঁছানোর পর আলাদা IRP registration পদক্ষেপ আর এর EUR 300 fee ভুলে যাওয়া — visa শুধু Ireland-এ ঢুকতে দেয়; registration (90 দিনের মধ্যে) একটি আলাদা, বাধ্যতামূলক পদক্ষেপ।'),
        ],
      },
    ),
  ],
  faqs: [
    qa('requirements', b("What do you need to study a Bachelor's in Ireland from Bangladesh?", "Bangladesh থেকে Ireland-এ Bachelor's পড়তে কী কী লাগে?"), [b('A secondary-school certificate the institution accepts, the institution’s own English-proficiency score, a place on an ILEP-listed course, proof of at least EUR 10,000 for the first year, and a D study visa.', 'Institution-এর স্বীকৃত একটি secondary-school সনদ, institution-এর নিজের English-দক্ষতার score, ILEP-তালিকাভুক্ত একটি course-এ জায়গা, প্রথম বছরের জন্য অন্তত EUR 10,000-এর প্রমাণ, আর একটি D study visa।')], [IE_TCD_ENTRY, IE_ISD_FINANCE], { status: 'partly-verified' }),
    qa('hsc', b('Can you go straight into a Bachelor’s after HSC?', 'HSC শেষ করে কি সরাসরি Bachelor\'s-এ যাওয়া যায়?'), [b('Not verified yet for Bangladesh specifically: each institution assesses foreign secondary certificates for direct-entry recognition itself; a dedicated Bangladesh-HSC page was not read for this guide.', 'Bangladesh-এর জন্য নির্দিষ্টভাবে এখনো যাচাই হয়নি: প্রতিটি institution নিজেই direct-entry স্বীকৃতির জন্য বিদেশি secondary সনদ মূল্যায়ন করে; এই guide-এর জন্য Bangladesh-HSC-র জন্য আলাদা কোনো page পড়া হয়নি।')], [IE_TCD_ENTRY], { status: 'not-verified' }),
    qa('cost', b('How much does it cost to study in Ireland?', 'Ireland-এ পড়াশোনার খরচ কত?'), [b('There is no single national non-EU fee; examples read for this guide range from about EUR 16,300 (UCC, Business and Financial Economics) to EUR 27,000 (UCC, most Science/Engineering programmes) and over EUR 50,000 for Medicine/Dentistry, plus a EUR 10,000/year official funds requirement and a EUR 300 IRP registration fee.', 'একক জাতীয় non-EU fee নেই; এই guide-এর জন্য পড়া উদাহরণ প্রায় EUR 16,300 (UCC, Business and Financial Economics) থেকে EUR 27,000 (UCC, অধিকাংশ Science/Engineering programme) আর Medicine/Dentistry-এ EUR 50,000-এর বেশি পর্যন্ত, সঙ্গে একটি EUR 10,000/বছর official টাকার শর্ত আর একটি EUR 300 IRP registration fee।')], [IE_UCC_UG_FEES, IE_ISD_FINANCE], { status: 'partly-verified' }),
    qa('ielts', b('How much IELTS do you need for Ireland?', 'Ireland-এ IELTS কত লাগে?'), [b('Not a single national minimum; Irish universities generally ask around IELTS 6.5 overall with 6.0 in each band for standard undergraduate/postgraduate entry (TCD’s "Band B"), but set per institution and programme.', 'একক জাতীয় ন্যূনতম না; Irish university-গুলো সাধারণত standard undergraduate/postgraduate ভর্তির জন্য IELTS 6.5 overall, প্রতি band-এ 6.0 চায় (TCD-র "Band B"), কিন্তু institution আর programme অনুযায়ী ঠিক হয়।')], [IE_TCD_ENGLISH], { status: 'partly-verified' }),
    qa('visa', b('What do you need for the D study visa?', 'D study visa-র জন্য কী কী লাগে?'), [b('A place on an ILEP-listed course, your letter of acceptance, private medical insurance, proof of English ability, proof of at least EUR 10,000 for the first year, and the completed AVATS application submitted up to 3 months before travel.', 'ILEP-তালিকাভুক্ত একটি course-এ জায়গা, letter of acceptance, private medical insurance, English দক্ষতার প্রমাণ, প্রথম বছরের জন্য অন্তত EUR 10,000-এর প্রমাণ, আর যাত্রার 3 মাস আগে পর্যন্ত জমা দেওয়া সম্পূর্ণ করা AVATS application।')], [IE_ISD_VISA_HOWTO, IE_ISD_FINANCE]),
    qa('work', b('Can you work while studying in Ireland?', 'Ireland-এ পড়ার পাশাপাশি কাজ করা যায়?'), [b('Yes: up to 20 hours a week in term time, and up to 40 hours a week in June–September and 15 December–15 January.', 'হ্যাঁ: term time-এ সপ্তাহে 20 ঘণ্টা পর্যন্ত, আর June–September আর 15 December–15 January-তে সপ্তাহে 40 ঘণ্টা পর্যন্ত।')], [IE_ISD_FAQ]),
    qa('scholarships', b('Can you get a scholarship?', 'Scholarship পাওয়া যায় কি?'), [b('The Government of Ireland International Education Scholarship (GOI-IES, master’s/PhD, EUR 10,000 + fee waiver) is genuinely open to Bangladeshi applicants by nationality, applied for directly online, though its 2026 call is now closed.', 'Government of Ireland International Education Scholarship (GOI-IES, master\'s/PhD, EUR 10,000 + fee waiver) জাতীয়তার দিক থেকে Bangladeshi আবেদনকারীদের জন্য আসলেই খোলা, সরাসরি অনলাইনে আবেদন করা যায়, যদিও এর 2026 call এখন বন্ধ।')], [IE_HEA_GOIIES], { status: 'partly-verified' }),
    qa('after', b('Can you stay in Ireland after graduating?', 'পড়া শেষে Ireland-এ থাকা যায়?'), [b('Yes, via the Third Level Graduate Programme (Stamp 1G): 12 months for a Level 8 honours bachelor’s award, up to 24 months for a Level 9-or-above (master’s/PhD) award, provided you apply within 6 months of your award notification.', 'হ্যাঁ, Third Level Graduate Programme-এর (Stamp 1G) মাধ্যমে: Level 8 honours bachelor\'s award-এর জন্য 12 মাস, Level 9-বা-তার-বেশি (master\'s/PhD) award-এর জন্য 24 মাস পর্যন্ত, যদি award notification-এর 6 মাসের মধ্যে আবেদন করেন।')], [IE_ISD_GRAD]),
    qa('funds', b('How much money do you need to show?', 'কত টাকা দেখাতে হয়?'), [b('At least EUR 10,000 immediately accessible for the first year, plus EUR 10,000 for each further year, in addition to course fees, shown through a 6-month bank statement (yours and/or a sponsor’s).', 'প্রথম বছরের জন্য অন্তত EUR 10,000 তাৎক্ষণিক পাওয়ার মতো, সঙ্গে প্রতি পরের বছরের জন্য EUR 10,000, course fee-র উপর, একটি 6-মাসের bank statement (আপনার আর/বা sponsor-এর) দিয়ে দেখাতে হয়।')], [IE_ISD_FINANCE]),
    qa('documents', b('Which documents are needed?', 'কী কী documents লাগে?'), [b('Before admission: secondary-school/prior-degree certificates and English proof. At the visa stage: letter of acceptance, proof of finances, private medical insurance. After arrival: IRP registration (EUR 300) within 90 days.', 'ভর্তির আগে: secondary-school/আগের degree-র সনদ আর English প্রমাণ। Visa পর্যায়ে: letter of acceptance, টাকার প্রমাণ, private medical insurance। পৌঁছানোর পরে: 90 দিনের মধ্যে IRP registration (EUR 300)।')], [IE_ISD_VISA_HOWTO, IE_ISD_FAQ]),
    qa('masters', b("What do you need for a Master's?", "Master's-এ কী লাগে?"), [b('A recognised bachelor’s degree (Trinity College Dublin asks for at least a 2.1 honours equivalent) plus the institution’s own English-proficiency score and references; apply directly to the university.', 'একটি স্বীকৃত bachelor\'s degree (Trinity College Dublin অন্তত একটি 2.1 honours সমতুল্য চায়) সঙ্গে institution-এর নিজের English-দক্ষতার score আর referee; সরাসরি university-তে আবেদন করুন।')], [IE_TCD_ENTRY]),
    qa('phd', b('What do you need for a PhD?', 'PhD-তে কী লাগে?'), [b('Usually a recognised master’s degree and a supervisor or structured-PhD place arranged with an institution’s own doctoral programme; entry rules beyond this are set per institution (not verified here as general national rules).', 'সাধারণত একটি স্বীকৃত master\'s degree আর একটি institution-এর নিজের doctoral programme-এর সাথে ঠিক করা একজন supervisor বা structured-PhD জায়গা; এর বাইরে ভর্তির নিয়ম প্রতিটি institution ঠিক করে (সাধারণ জাতীয় নিয়ম হিসেবে এখানে যাচাই হয়নি)।')], [IE_GALWAY_PG_FEES], { status: 'partly-verified' }),
    qa('universities', b('Which universities are there?', 'কোন কোন university আছে?'), [b('Examples on each degree page — Trinity College Dublin, University College Cork, University College Dublin and University of Galway — are listed alphabetically, not ordered by quality.', 'প্রতিটি degree page-এ উদাহরণ — Trinity College Dublin, University College Cork, University College Dublin, আর University of Galway — বর্ণানুক্রমে, মান অনুযায়ী সাজানো নয়।')], [IE_TCD_UG_FEES]),
    qa('bangladesh', b('What should a Bangladeshi student know?', 'Bangladesh-এর student-দের কী জানা দরকার?'), [
      b('Verified for Bangladesh: Immigration Service Delivery’s own visa/non-visa-required nationalities list confirms Bangladesh is visa-required for Ireland, and the Department of Foreign Affairs’ embassy list confirms Ireland has no Embassy in Bangladesh — applications are handled through the Irish Embassy in New Delhi, India. The Government of Ireland International Education Scholarship does not name or exclude Bangladesh, so Bangladeshi master’s/PhD applicants are genuinely eligible by nationality. No official page read gives a Bangladesh-specific visa-document checklist (beyond the general one), a Bangladesh-specific HSC-equivalence rule, or a Bangladesh-specific visa approval-rate figure — these were not verified here.', 'Bangladesh-এর জন্য যাচাই করা: Immigration Service Delivery-র নিজের visa/non-visa-required জাতীয়তার তালিকা নিশ্চিত করে Bangladesh Ireland-এর জন্য visa-required, আর Department of Foreign Affairs-এর embassy তালিকা নিশ্চিত করে Ireland-এর Bangladesh-এ কোনো Embassy নেই — application New Delhi, India-র Irish Embassy-র মাধ্যমে হয়। Government of Ireland International Education Scholarship Bangladesh-কে নাম বা বাদ দেয় না, তাই Bangladeshi master\'s/PhD আবেদনকারীরা জাতীয়তার দিক থেকে আসলেই যোগ্য। পড়া কোনো official page একটি Bangladesh-specific visa-document checklist (সাধারণের বাইরে), একটি Bangladesh-specific HSC-সমতুল্যতার নিয়ম, বা একটি Bangladesh-specific visa approval-rate সংখ্যা দেয় না — এগুলো এখানে যাচাই হয়নি।'),
    ], [IE_ISD_VISA_LIST, IE_DFA_EMBASSIES, IE_HEA_GOIIES], { status: 'partly-verified' }),
  ],
  life: [
    qa('registration', b('What happens when you arrive?', 'পৌঁছানোর পর কী হয়?'), [b('Within 90 days you must register with Immigration Service Delivery (an appointment booked via the Customer Portal, mostly at the Burgh Quay office in Dublin) and pay a EUR 300 fee to get your Irish Residence Permit (IRP) card, which shows your Stamp 2 student permission. Keep it, and your private medical insurance, up to date for the whole time you study.', '90 দিনের মধ্যে Immigration Service Delivery-এ register করতে হয় (Customer Portal-এর মাধ্যমে বুক করা appointment, অধিকাংশ সময় Dublin-এর Burgh Quay office-এ) আর EUR 300 fee দিয়ে আপনার Irish Residence Permit (IRP) card পেতে হয়, যা আপনার Stamp 2 student permission দেখায়। পড়ার পুরো সময় এটা, আর আপনার private medical insurance, আপ-টু-ডেট রাখুন।')], [IE_ISD_FAQ, IE_ISD_REGISTER]),
  ],
  documents: IE_DOCUMENTS,
  degrees: { bachelors: BACHELORS, masters: MASTERS, phd: PHD },
  factors: [
    { id: 'public-tuition', kind: 'estimate', status: 'partly-verified', value: { min: 16300, max: 52100, unit: 'EUR/year', text: b('No single national non-EU fee; university/programme examples read range from about EUR 16,300 to over EUR 50,000 a year.', 'একক জাতীয় non-EU fee নেই; পড়া university/programme উদাহরণ বছরে প্রায় EUR 16,300 থেকে EUR 50,000-এর বেশি পর্যন্ত।') }, source: IE_UCC_UG_FEES },
    { id: 'funds-to-show', kind: 'fact', status: 'verified', value: { min: 10000, unit: 'EUR/year', text: b('At least EUR 10,000 immediately accessible for the first year, plus EUR 10,000 for each further year, per the official figure on irishimmigration.ie.', 'irishimmigration.ie-র official figure অনুযায়ী প্রথম বছরের জন্য অন্তত EUR 10,000 তাৎক্ষণিক পাওয়ার মতো, সঙ্গে প্রতি পরের বছরের জন্য EUR 10,000।') }, source: IE_ISD_FINANCE },
    { id: 'work-during-study', kind: 'fact', status: 'verified', value: { min: 20, max: 40, unit: 'hours/week', text: b('Up to 20 hours a week in term time, up to 40 hours a week in June–September and 15 December–15 January.', 'Term time-এ সপ্তাহে 20 ঘণ্টা পর্যন্ত, June–September আর 15 December–15 January-তে সপ্তাহে 40 ঘণ্টা পর্যন্ত।') }, source: IE_ISD_FAQ },
    { id: 'post-study-stay', kind: 'fact', status: 'verified', value: { min: 12, max: 24, unit: 'months', text: b('12 months for a Level 8 honours bachelor’s award; up to 24 months (12 initial + a 12-month renewal) for a Level 9-or-above (master’s/PhD) award, under the Third Level Graduate Programme (Stamp 1G).', 'Level 8 honours bachelor\'s award-এর জন্য 12 মাস; Level 9-বা-তার-বেশি (master\'s/PhD) award-এর জন্য 24 মাস পর্যন্ত (শুরুতে 12 + একটি 12-মাসের renewal), Third Level Graduate Programme (Stamp 1G)-এর অধীনে।') }, source: IE_ISD_GRAD },
    { id: 'visa-fee', kind: 'fact', status: 'verified', value: { min: 300, unit: 'EUR', text: b('EUR 300 for first-time IRP registration, and EUR 300 again to register the Third Level Graduate Programme (Stamp 1G); the D study visa application fee itself was not itemized from an official fee-schedule page.', 'প্রথমবার IRP registration-এর জন্য EUR 300, আর Third Level Graduate Programme (Stamp 1G) register করতে আবার EUR 300; D study visa application fee নিজে কোনো official fee-schedule page থেকে তালিকাভুক্ত হয়নি।') }, source: IE_ISD_FAQ },
  ],
};
