import ClientPage from '@/components/client/competitive-exams_slug_subslug';

export async function generateMetadata({ params }) {
const { subslug } = await params;
  const titleMap = {
    "study-notes": "NEET Study Notes & Preparation Material",
  };

  
 const title = titleMap[subslug] || "Learnosphere";
  
  return { title };
}

export default function Page(props) {
  return <ClientPage {...props} />;
}