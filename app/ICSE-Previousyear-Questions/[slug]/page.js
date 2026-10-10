import ClientPage from '@/components/client/ICSE-Previousyear-Questions_slug';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const titleMap = {
    "ICSE-Class-10-Maths-Previous-Year-Paper": "ICSE Class 10 Maths Previous Year Paper | Learnosphere",
    "ISC-Class-12-Maths-Previous-Year-Question-Papers": "ISC Class 12 Maths Previous Year Papers | Learnosphere",
  };

  
  const title = titleMap[slug] || "Learnosphere";
  
  return { title };
}

export default function Page(props) {
  return <ClientPage {...props} />;
}