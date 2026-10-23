import ClientPage from '@/components/client/government-exams_slug';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const titleMap = {
    "railway": "Indian Railway Jobs: Exams & Syllabus",
    "ssc": "SSC Government Jobs & Exam Preparation Guide",
  };
  const descriptionMap = {
    "railway": "Learn about Indian Railway exams, syllabus topics and recruitment details to prepare for different railway job opportunities.",
    "ssc": "Discover SSC recruitment exams, eligibility details and useful study materials to plan your preparation for government jobs.",
  };

  const title = titleMap[slug] || "Learnosphere";
  const description = descriptionMap[slug] || "Exam preparation guide and study materials for government jobs.";
  
  return { title, description };
}

export default function Page(props) {
  return <ClientPage {...props} />;
}
