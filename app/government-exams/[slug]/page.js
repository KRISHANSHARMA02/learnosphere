const govExamsCustomTitles = {
  "railway": "Railway Exam Preparation – NTPC, Group D, ALP & JE | Learnosphere",
  "banking": "Banking Exam Preparation for IBPS and PO Aspirants | Learnosphere",
  "state-psc": "State PSC and Other Government Exams Preparation | Learnosphere",
  "upsc": "UPSC Exam Preparation for IAS Aspirants | Learnosphere"
};

import ClientPage from '@/components/client/government-exams_slug';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const titleMap = {
    "railway": "Railway Exam Preparation – NTPC, Group D, ALP & JE | Learnosphere",
    "ssc": "SSC Government Jobs & Exam Preparation Guide",
  };
  const descriptionMap = {
    "railway": "Explore railway exam preparation resources, RRB NTPC, Group D, ALP and JE syllabus, eligibility, study material and practice questions.",
    "ssc": "Discover SSC recruitment exams, eligibility details and useful study materials to plan your preparation for government jobs.",
  };

  const customTitle = govExamsCustomTitles[slug];
  const title = customTitle ? { absolute: customTitle } : (titleMap[slug] || "Learnosphere");
  const description = descriptionMap[slug] || "Exam preparation guide and study materials for government jobs.";
  
  return { title, description };
}

export default function Page(props) {
  return <ClientPage {...props} />;
}
