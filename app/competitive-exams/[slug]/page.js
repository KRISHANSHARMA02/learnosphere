import ClientPage from '@/components/client/competitive-exams_slug';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const titleMap = {
    "neet": "NEET Exam Guide for Medical Aspirants",
    "olympiad": "Olympiad Exams for Maths, Science & English",
  };
  const descriptionMap = {
    "neet": "Get useful NEET exam information, subject-wise topics and preparation guidance to plan your journey toward medical college.",
    "olympiad": "Learn about Maths, Science and English Olympiads, explore key topics and find useful resources for school-level exam preparation.",
  };

  const title = titleMap[slug] || "Learnosphere";
  const description = descriptionMap[slug] || "Preparation guide and study resources for competitive exams.";
  
  return { title, description };
}

export default function Page(props) {
  return <ClientPage {...props} />;
}
