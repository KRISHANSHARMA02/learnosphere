import DataTable from "./slugDetails";
import { getSamplePapers } from "@/src/lib/actions/sample_papers_data_fetch";

export default async function SamplePapersPage({ params }) {
  const { slug } = await params;

  if (!slug) return <p>Slug missing</p>;

  const data = await getSamplePapers(slug);


  if (!data || data.length === 0) return <p>No sample papers found</p>;

  return <DataTable data={data} />;
}


export async function generateMetadata({ params }) {
  const { slug } = await params;
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

  
  const title = titleMap[slug] || "Learnosphere";
  const description = descriptionMap[slug] || "Practice CBSE sample papers for Classes 1 to 12 and prepare effectively for exams with useful questions, revision material and study resources.";

  return { title, description };
}