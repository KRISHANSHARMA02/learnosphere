import ClientPage from '@/components/client/competitive-exams_slug';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const titleMap = {
    "neet": "NEET Preparation, Study Material & Resources | Learnosphere",
    "olympiad": "Olympiad Preparation & Study Material | Learnosphere",
  };

  
 const title = titleMap[slug] || "Learnosphere";
  
  return { title };
}

export default function Page(props) {
  return <ClientPage {...props} />;
}