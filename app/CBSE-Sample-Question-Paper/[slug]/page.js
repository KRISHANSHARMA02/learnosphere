import DataTable from "./slugData";
import { getSamplePapersPDF } from "@/src/lib/actions/sample_papers_data_fetch";
import { redirect, notFound } from "next/navigation";

export const revalidate = 60; // ✅ re-fetch every 60s

export default async function SamplePapersPDF({ params }) {
  const { slug } = await params;

  if (!slug) notFound();

  if (
    slug === "Cbse-Class-12-Maths-Sample-Paper-Set-1" ||
    slug === "Cbse-Maths-Sample-Paper-Class-12-Set-1"
  ) {
    redirect("https://learnosphere.s3.ap-south-1.amazonaws.com/sample-papers/1784788166904_Applied-Maths-SQP.pdf");
  }

  const data = await getSamplePapersPDF(slug);

  if (!data || data.length === 0) {
    notFound();
  }

  return <DataTable data={data} slug={slug} />;
}
