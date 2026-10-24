import ClientPage from '@/components/client/ICSE-Previousyear-Questions_slug';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const titleMap = {
    "ICSE-Class-10-Maths-Previous-Year-Paper": "ICSE Class 10 Maths Previous Year Papers",
    "ISC-Class-12-Maths-Previous-Year-Question-Papers": "ISC Class 12 Maths Previous Year Papers",
  };

  const descriptionMap = {
    "ICSE-Class-10-Maths-Previous-Year-Paper": "Practise ICSE Class 10 Maths previous year question papers to review important questions and prepare for board exams.",
    "ISC-Class-12-Maths-Previous-Year-Question-Papers": "Practise ISC Class 12 Maths previous year question papers to revise important concepts and prepare for board exams.",
  };

  const title = titleMap[slug] || "Learnosphere";
  const description = descriptionMap[slug] || "Download and practice ICSE and ISC previous year question papers with solutions.";
  
  return { title, description };
}

export default function Page(props) {
  return <ClientPage {...props} />;
}
