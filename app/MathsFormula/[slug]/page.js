import ClientPage from '@/components/client/MathsFormula_slug';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const titleMap = {
    "Maths-Formulas-For-Class-12": "Class 12 Maths Formulas",
  };

  
const title = titleMap[slug] || "Learnosphere";
  
  return { title };
}

export default function Page(props) {
  return <ClientPage {...props} />;
}