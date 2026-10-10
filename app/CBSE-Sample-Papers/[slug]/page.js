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
    "CBSE-Class-10-Maths-Sample-Paper-Basic-and-Standard": "CBSE Class 10 Maths Sample Paper: Basic & Standard",
    "CBSE-Sample-Papers-for-Class-9-Maths": "CBSE Class 9 Maths Sample Papers ",
    "CBSE-Sample-Papers-for-Class-11-Maths": "CBSE Class 11 Maths Sample Papers ",
  };

  
  const title = titleMap[slug] || "Learnosphere";
  
  return { title };
}