import ClientPage from '@/components/client/MathsFormula_slug';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const titleMap = {
    "Maths-Formulas-For-Class-12": "Important Maths Formulas for Class 12",
  };
  const descriptionMap = {
    "Maths-Formulas-For-Class-12": "Get chapter-wise Class 12 Maths formulas for quick revision, problem-solving practice and exam preparation.",
  };

  const title = titleMap[slug] || "Learnosphere";
  const description = descriptionMap[slug] || "Find essential maths formulas for quick revision and exam prep.";
  
  return { title, description };
}

export default function Page(props) {
  return <ClientPage {...props} />;
}
