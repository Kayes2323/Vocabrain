# Localization (বাংলা + English)

Vocab Brain's first users are Bangladeshi students. Every screen works in **Bangla** and **English**.

## How it works

```
lib/i18n/locales/en.ts     Source of truth and fallback
lib/i18n/locales/bn.ts     Typed as LocaleDictionary: a missing key fails type-checking
lib/i18n/translate.ts      Lookup, {var} interpolation, locale number formatting
lib/i18n/message.ts        Message { key, vars }: what engines return instead of strings
components/providers/LocaleProvider.tsx   useLocale(): t, list, m, n, locale, setLocale
```

- Components never hard-code UI text: `t('home.today')`, `list('login.pillars')`.
- Business logic (`lib/engine`) returns `Message` objects; the UI renders them with `m(message)`.
- Numbers passed as `number` are localised (`৩` in Bangla). Band scores are passed as pre-formatted
  strings (`"7.0"`) and stay in Latin digits, as on an IELTS Test Report Form.
- Language is chosen on the first onboarding screen, stored on the device and in the profile, and can be
  changed from Profile → Settings or the login screen toggle.
- Adding a language: add `locales/<code>.ts` typed as `LocaleDictionary`, register it in `lib/i18n/index.ts`
  and add the code to the `Locale` type.

## Bangla copy guidelines

Tone: a helpful senior or mentor. Casual `তুমি`, short sentences, supportive. Not childish, not slang-heavy,
never the tone of a government form.

| Avoid | Use |
| --- | --- |
| আপনার আজকের নির্ধারিত শিক্ষামূলক কার্যক্রম | আজকের কাজ |
| আপনার বর্তমান অগ্রগতির হার | তুমি এখন পর্যন্ত যতটুকু এগিয়েছো |
| পরবর্তী কার্যক্রম শুরু করুন | চলো শুরু করি |
| আপনার কাঙ্ক্ষিত ফলাফল অর্জনের জন্য… | তোমার target-এ যেতে… |

**Keep these in English**, even in Bangla mode: IELTS, Listening, Reading, Writing, Speaking, Writing Task 1/2,
Speaking Part 1/2/3, Band Score, Target Score, Mock Test, Vocabulary, Grammar, Pronunciation, Essay, Task,
Feedback, Score, Study Plan, Study Abroad, University, Scholarship, SOP, CV, LOR, Application, Visa, Deadline,
Intake, Profile, Dashboard, Mino.

Mix Bangla and English where it reads naturally ("তোমার Writing এখনো target থেকে 1.0 Band পিছিয়ে"), not
everywhere. In English mode, use short, simple international English.
