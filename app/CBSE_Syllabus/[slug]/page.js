import { buildCanonicalUrl } from '@/src/utils/canonicalHelper';
import ClientPage from '@/components/client/CBSE_Syllabus_slug';
import { backendFetch } from '@/src/helper/appbackend_api';

const cbseSyllabusCustomTitles = {
  "class2-cbse-syllabus-2025-26": "CBSE Class 2 Syllabus 2025-26: Subjects and Topics | Learnosphere",
  "class7-cbse-syllabus-2025-26": "CBSE Class 7 Syllabus 2025-26: Subject-Wise Topics | Learnosphere",
  "class10-cbse-syllabus-2025-26": "CBSE Class 10 Syllabus 2025-26: Board Exam Topics | Learnosphere",
  "class8-cbse-syllabus-2025-26": "CBSE Class 8 Syllabus 2025-26: Chapters by Subject | Learnosphere",
  "class5-cbse-syllabus-2025-26": "CBSE Class 5 Syllabus 2025-26 Overview | Learnosphere"
};

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

  const customTitle = cbseSyllabusCustomTitles[slug];
  const title = customTitle ? { absolute: customTitle } : (titleMap[slug] || "Learnosphere");
  const description = descriptionMap[slug] || "Explore the CBSE syllabus for all classes with subject-wise topics, chapters and curriculum details for exam preparation.";

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(["CBSE_Syllabus", slug]),
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const classMatch = slug?.match(/class(\d+)/i);
  const className = classMatch ? classMatch[1] : null;

  let initialSyllabus = null;
  if (className) {
    try {
      const res = await backendFetch(`/api/route/getSyllabusByClass?className=${className}`);
      if (Array.isArray(res) && res.length > 0) {
        initialSyllabus = res[0];
      } else if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
        initialSyllabus = res.data[0];
      }
    } catch (err) {
      console.error("Server fetch syllabus error:", err);
    }
  }

  return <ClientPage initialSyllabus={initialSyllabus} slug={slug} />;
}
