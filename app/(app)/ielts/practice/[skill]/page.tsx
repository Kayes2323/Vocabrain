'use client';

import { notFound, useParams } from 'next/navigation';
import { PRACTICE_SKILLS, SkillPractice, type PracticeSkill } from '@/components/practice/SkillPractice';

/** Listening, Writing or Speaking practice (Reading has its own library at /ielts/reading). */
export default function SkillPracticePage() {
  const { skill } = useParams<{ skill: string }>();
  if (!PRACTICE_SKILLS.includes(skill as PracticeSkill)) notFound();
  return <SkillPractice skill={skill as PracticeSkill} />;
}
