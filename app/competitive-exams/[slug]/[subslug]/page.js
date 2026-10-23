import ClientPage from '@/components/client/competitive-exams_slug_subslug';

export async function generateMetadata({ params }) {
  const { slug, subslug } = await params;
  const key = `${slug}/${subslug}`;
  const titleMap = {
    "neet/study-notes": "NEET Revision Notes for Medical Aspirants",
    "study-notes": "NEET Revision Notes for Medical Aspirants",
  };
  const descriptionMap = {
    "neet/study-notes": "Revise Physics, Chemistry and Biology with NEET notes designed to help you review key concepts and organise your study routine.",
    "study-notes": "Revise Physics, Chemistry and Biology with NEET notes designed to help you review key concepts and organise your study routine.",
  };

  const title = titleMap[key] || titleMap[subslug] || "Learnosphere";
  const description = descriptionMap[key] || descriptionMap[subslug] || "Revision notes and study materials for competitive exams.";
  
  return { title, description };
}

export default function Page(props) {
  return <ClientPage {...props} />;
}
