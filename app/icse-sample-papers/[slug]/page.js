export const dynamic = 'force-dynamic';
import DataTable from "./slugData";
import { getIcseSamplePapers } from "@/src/lib/actions/sample_papers_data_fetch";
import { notFound } from "next/navigation";

export default async function IcseSamplePapers({ params }) {
  const { slug } = await params;

  if (!slug) notFound();

  const data = await getIcseSamplePapers(slug);

  if (!data || data.length === 0) {
    notFound();
  }

  return <DataTable data={data} slug={slug} />;
}


export async function generateMetadata({ params }) {
  const { slug } = await params;

  const titleMap = {
    "ICSE-Sample-Papers-for-Class-10-Maths":
      "ICSE Class 10 Mathematics Model Papers",

    "ICSE-Sample-Papers-for-Class-8-Maths":
      "ICSE Class 8 Maths Question Paper Practice",

    "ISC-Sample-Papers-for-Class-11-Maths":
      "Class 11 ISC Maths Sample Question Papers",

    "ISC-Sample-Papers-for-Class-12-Maths":
      "ISC Class 12 Maths Revision & Practice Papers",
  };

  const descriptionMap = {
    "ICSE-Sample-Papers-for-Class-10-Maths":
      "Find Class 10 ICSE Mathematics model papers to practise exam-style questions and build confidence for your board examinations.",

    "ICSE-Sample-Papers-for-Class-8-Maths":
      "Improve accuracy and problem-solving with ICSE Class 8 Maths question papers for regular practice and stronger subject knowledge.",

    "ISC-Sample-Papers-for-Class-11-Maths":
      "Explore ISC Class 11 Maths practice papers to improve problem-solving skills and build a strong foundation for higher-level mathematics.",

    "ISC-Sample-Papers-for-Class-12-Maths":
      "Revise essential Maths topics with ISC Class 12 practice papers and build confidence for your final board examinations.",
  };

  const title = titleMap[slug] || "Learnosphere";
  const description =
    descriptionMap[slug] ||
    "Practice ICSE and ISC sample papers with solutions and revision resources.";

  return {
    title,
    description,
  };
}
