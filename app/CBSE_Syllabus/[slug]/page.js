import ClientPage from '@/components/client/CBSE_Syllabus_slug';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const titleMap = {
    "class11-cbse-syllabus-2025-26": "CBSE Class 11 Syllabus 2025-26 | Learnosphere",
    "class1-cbse-syllabus-2025-26": "CBSE Class 1 Syllabus 2025-26 | Learnosphere",
    "class3-cbse-syllabus-2025-26": "CBSE Class 3 Syllabus 2025-26 | Learnosphere",
    "class12-cbse-syllabus-2025-26": "CBSE Class 12 Syllabus 2025-26 | Learnosphere",
    "class4-cbse-syllabus-2025-26": "CBSE Class 4 Syllabus 2025-26 | Learnosphere",
    "class6-cbse-syllabus-2025-26": "CBSE Class 6 Syllabus 2025-26 | Learnosphere",
    "class9-cbse-syllabus-2025-26": "CBSE Class 9 Syllabus 2025-26 | Learnosphere",
  };

  
  const title = titleMap[slug] || "Learnosphere";
  
  return { title };
}

export default function Page(props) {
  return <ClientPage {...props} />;
}