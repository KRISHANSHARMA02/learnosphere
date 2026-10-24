import ClientPage from '@/components/client/government-exams_slug_subslug';

export async function generateMetadata({ params }) {
  const { slug, subslug } = await params;
  const key = `${slug}/${subslug}`;
  const titleMap = {
    "upsc/study-notes": "UPSC Study Notes for Civil Services Preparation",
    "study-notes": "UPSC Study Notes for Civil Services Preparation",
  };
  const descriptionMap = {
    "upsc/study-notes": "Explore UPSC study notes covering important topics and concepts to support revision and preparation for Civil Services examinations.",
    "study-notes": "Explore UPSC study notes covering important topics and concepts to support revision and preparation for Civil Services examinations.",
  };

  const title = titleMap[key] || titleMap[subslug] || "Learnosphere";
  const description = descriptionMap[key] || descriptionMap[subslug] || "Study notes and revision resources for government examinations.";

  return { title, description };
}

export default function Page(props) {
  return <ClientPage {...props} />;
}
