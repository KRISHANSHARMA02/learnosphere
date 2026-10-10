import ClientPage from '@/components/client/government-exams_slug_subslug';

export async function generateMetadata({ params }) {
  const { subslug } = await params;
  const titleMap = {
    "study-notes": "UPSC Study Notes & Preparation Material",
  };

 const title = titleMap[subslug] || "Learnosphere";

  return { title };
}

export default function Page(props) {
  return <ClientPage {...props} />;
}