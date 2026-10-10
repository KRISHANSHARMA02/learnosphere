import DataTable from "./slugData";
import { getCbsePreviousSlug } from "@/src/lib/actions/sample_papers_data_fetch";

export default async function cbsePreviousPpr({ params }) {
  const { slug } = await params;

  if (!slug) return <p>Slug missing</p>

  const data = await getCbsePreviousSlug(slug);

  
  if (!data || data.length === 0) return <p> No Previous Year Question Paper found</p>;

  return <DataTable data={data} />;

}


export async function generateMetadata({ params }) {
  const { slug } = await params;
  const titleMap = {
    "CBSE-Class-10-Maths-Previous-Year-Papers": "CBSE Class 10 Maths Previous Year Papers | Learnosphere",
  };

 const title = titleMap[slug] || "Learnosphere";
  
  return { title };
}
