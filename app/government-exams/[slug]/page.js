import ClientPage from '@/components/client/government-exams_slug';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const titleMap = {
    "railway": "Railway Exam Preparation & Study Material",
    "ssc": "SSC Exam Preparation & Study Material",
  };

  
const title = titleMap[slug] || "Learnosphere";
  
  return { title };
}

export default function Page(props) {
  return <ClientPage {...props} />;
}