const cbseSampleCustomTitles = {
  "CBSE-Sample-Papers-for-Class-12-Hindi": "CBSE Class 12 Hindi Sample Papers | Learnosphere",
  "CBSE-Sample-Papers-for-Class-12-Political-Science": "CBSE Class 12 Political Science Sample Papers | Learnosphere",
  "CBSE-Sample-Papers-for-Class-12-Biology": "CBSE Class 12 Biology Sample Papers for Practice | Learnosphere",
  "CBSE-Sample-Papers-for-Class-12-Economics": "Class 12 Economics Sample Papers: CBSE Board Practice | Learnosphere",
  "CBSE-Sample-Papers-for-Class-12-Physical-Health-Education": "Class 12 Physical Health Education Sample Papers | Learnosphere",
  "CBSE-Sample-Papers-for-Class-12-Chemistry": "Class 12 Chemistry Sample Papers: CBSE Exam Practice | Learnosphere",
  "CBSE-Class-12-Maths-Sample-Papers": "CBSE Class 12 Maths Sample Papers Collection | Learnosphere",
  "CBSE-Sample-Papers-for-Class-12-Accountancy": "CBSE Class 12 Accountancy Sample Papers | Learnosphere",
  "CBSE-Sample-Papers-for-Class-12-Maths": "Class 12 Maths Sample Papers: Practice Sets for CBSE | Learnosphere",
  "CBSE-Sample-Papers-for-Class-12-Business-Study": "Class 12 Business Studies Sample Papers: CBSE Practice | Learnosphere",
  "CBSE-Sample-Papers-for-Class-12-English": "CBSE Class 12 English Sample Papers for Exam Prep | Learnosphere",
  "CBSE-Sample-Papers-for-Class-12-Physics": "Class 12 Physics Sample Papers: CBSE Board Practice | Learnosphere",
  "CBSE-Sample-Papers-for-Class-8-Maths": "CBSE Class 8 Maths Sample Papers for Practice | Learnosphere"
};

import DataTable from "./slugDetails";
import { getSamplePapers } from "@/src/lib/actions/sample_papers_data_fetch";
import { notFound } from "next/navigation";

export default async function SamplePapersPage({ params }) {
  const { slug } = await params;

  if (!slug) notFound();

  const data = await getSamplePapers(slug);

  if (!data || data.length === 0) {
    notFound();
  }

  return <DataTable data={data} />;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!slug) return { title: "Page Not Found | Learnosphere" };

  const data = await getSamplePapers(slug);
  if (!data || data.length === 0) {
    return {
      title: "Page Not Found | Learnosphere",
    };
  }

  const titleMap = {
    "CBSE-Class-10-Maths-Sample-Paper-Basic-and-Standard": "CBSE Class 10 Maths Sample Paper | Basic & Standard",
    "CBSE-Sample-Papers-for-Class-9-Maths": "CBSE Class 9 Maths Practice Papers & Questions",
    "CBSE-Sample-Papers-for-Class-11-Maths": "CBSE Class 11 Maths Sample Papers | Practice Papers",
  };
  const descriptionMap = {
    "CBSE-Class-10-Maths-Sample-Paper-Basic-and-Standard": "Practice CBSE Class 10 Maths Sample Paper for Basic and Standard levels. Prepare for board exams with useful questions, practice papers and revision resources.",
    "CBSE-Sample-Papers-for-Class-9-Maths": "Explore CBSE Class 9 Maths practice papers to revise important concepts, solve questions and strengthen your mathematics skills before exams.",
    "CBSE-Sample-Papers-for-Class-11-Maths": "Practice CBSE Class 11 Maths Sample Papers with useful questions and revision resources. Strengthen your concepts and prepare effectively for exams.",
  };

  const customTitle = cbseSampleCustomTitles[slug];
  const title = customTitle ? { absolute: customTitle } : (titleMap[slug] || "Learnosphere");
  const description = descriptionMap[slug] || "Practice CBSE sample papers for Classes 1 to 12 and prepare effectively for exams with useful questions, revision material and study resources.";

  return { title, description };
}
