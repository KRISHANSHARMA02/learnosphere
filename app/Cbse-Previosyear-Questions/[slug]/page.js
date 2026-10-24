import DataTable from "./slugData";
import { getCbsePreviousSlug } from "@/src/lib/actions/sample_papers_data_fetch";

export default async function cbsePreviousPpr({ params }) {
  const { slug } = await params;

  if (!slug) return <p>Slug missing</p>

  const data = await getCbsePreviousSlug(slug);

  
  if (!data || data.length === 0) return <p> No Previous Year Question Paper found</p>;

  return <DataTable data={data} slug={slug} />;

}


export async function generateMetadata({ params }) {
  const { slug } = await params;
  const titleMap = {
    "CBSE-Class-10-Maths-Previous-Year-Papers": "CBSE Class 10 Maths Previous Year Papers",
  };
  const descriptionMap = {
    "CBSE-Class-10-Maths-Previous-Year-Papers": "Download CBSE Class 10 Maths previous year question papers to practise important questions and prepare for board exams.",
  };

  const title = titleMap[slug] || "Learnosphere";
  const description = descriptionMap[slug] || "Download CBSE previous year question papers with solutions.";
  
  return { title, description };
}
