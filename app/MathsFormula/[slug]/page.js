const mathsFormulaCustomTitles = {
  "Maths-Formulas-For-Class-6": "Maths Formulas for Class 6: Quick Reference | Learnosphere",
  "Maths-Formulas-For-Class-7": "Class 7 Maths Formulas for Quick Revision | Learnosphere",
  "Maths-Formulas-For-Class-8": "Maths Formulas for Class 8 Students | Learnosphere",
  "Maths-Formulas-For-Class-9": "Class 9 Maths Formulas Handy List | Learnosphere",
  "Maths-Formulas-For-Class-10": "Class 10 Maths Formulas for CBSE Board Revision | Learnosphere",
  "Maths-Formulas-For-Class-11": "Maths Formulas for Class 11: Revision Reference | Learnosphere"
};

import ClientPage from '@/components/client/MathsFormula_slug';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const titleMap = {
    "Maths-Formulas-For-Class-12": "Important Maths Formulas for Class 12",
  };
  const descriptionMap = {
    "Maths-Formulas-For-Class-12": "Get chapter-wise Class 12 Maths formulas for quick revision, problem-solving practice and exam preparation.",
  };

  const customTitle = mathsFormulaCustomTitles[slug];
  const title = customTitle ? { absolute: customTitle } : (titleMap[slug] || "Learnosphere");
  const description = descriptionMap[slug] || "Find essential maths formulas for quick revision and exam prep.";
  
  return { title, description };
}

export default function Page(props) {
  return <ClientPage {...props} />;
}
