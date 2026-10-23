import ClientPage from '@/components/client/CBSE_Syllabus_slug';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const titleMap = {
    "class1-cbse-syllabus-2025-26": "Class 1 Syllabus 2025–26 | CBSE",
    "class3-cbse-syllabus-2025-26": "Class 3 Syllabus 2025–26 | CBSE Board",
    "class4-cbse-syllabus-2025-26": "Class 4 CBSE Syllabus & Subjects",
    "class6-cbse-syllabus-2025-26": "CBSE Class 6 Syllabus & Curriculum",
    "class9-cbse-syllabus-2025-26": "CBSE Class 9 All Subjects Syllabus",
    "class11-cbse-syllabus-2025-26": "CBSE Class 11 Subject-Wise Syllabus",
    "class12-cbse-syllabus-2025-26": "CBSE 12th Syllabus 2025–26 All Subjects",
  };

  const descriptionMap = {
    "class1-cbse-syllabus-2025-26": "Discover the CBSE Class 1 curriculum with subject-wise chapters and essential topics for primary education.",
    "class3-cbse-syllabus-2025-26": "Discover the CBSE Class 3 syllabus with essential topics and subject-wise details for effective study planning.",
    "class4-cbse-syllabus-2025-26": "Check the Class 4 syllabus for Maths, English, EVS and other subjects with key learning topics.",
    "class6-cbse-syllabus-2025-26": "Get the CBSE Class 6 syllabus with subject-wise topics and chapters to guide students throughout the academic year.",
    "class9-cbse-syllabus-2025-26": "Discover the Class 9 syllabus for all CBSE subjects with chapter details to build concepts and prepare for exams.",
    "class11-cbse-syllabus-2025-26": "Discover the CBSE Class 11 syllabus with subject details and chapter-wise topics to plan your studies.",
    "class12-cbse-syllabus-2025-26": "Explore the CBSE 12th syllabus for all subjects and review chapter-wise topics to organize your board exam studies.",
  };

  const title = titleMap[slug] || "Learnosphere";
  const description = descriptionMap[slug] || "Explore the CBSE syllabus for all classes with subject-wise topics, chapters and curriculum details for exam preparation.";

  return { title, description };
}

export default function Page(props) {
  return <ClientPage {...props} />;
}
