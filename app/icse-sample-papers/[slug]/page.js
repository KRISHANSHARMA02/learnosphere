export const dynamic = 'force-dynamic';
import DataTable from "./slugData";
import { getIcseSamplePapers } from "@/src/lib/actions/sample_papers_data_fetch";

export default async function IcseSamplePapers({ params }) {
  const { slug } = await params;

  if (!slug) return <p>Slug missing</p>;

  const data = await getIcseSamplePapers(slug);


  if (!data || data.length === 0) return <p>No sample papers found</p>;

  return <DataTable data={data} />;
}


export async function generateMetadata({ params }) {
  const { slug } = await params;

  const titleMap = {
    "ICSE-Sample-Papers-for-Class-8-Maths":
      "ICSE Class 8 Maths Sample Papers | Learnosphere",

    "ISC-Sample-Papers-for-Class-11-Maths":
      "ISC Class 11 Maths Sample Papers | Learnosphere",

    "ISC-Sample-Papers-for-Class-12-Maths":
      "ISC Class 12 Maths Sample Papers | Learnosphere",

    "ICSE-Sample-Papers-for-Class-10-Maths":
      "ICSE Class 10 Maths Sample Papers | Learnosphere",
  };

  const title = titleMap[slug] || "Learnosphere";

  return {
    title,
  };
}


