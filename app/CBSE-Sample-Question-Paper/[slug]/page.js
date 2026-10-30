import DataTable from "./slugData";
import { getSamplePapersPDF } from "@/src/lib/actions/sample_papers_data_fetch";
import { redirect, notFound } from "next/navigation";

export const revalidate = 60; // ✅ re-fetch every 60s

export default async function SamplePapersPDF({ params }) {
  const { slug } = await params;

  if (!slug) notFound();

  const data = await getSamplePapersPDF(slug);

  if (!data || data.length === 0) {
    notFound();
  }

  return <DataTable data={data} slug={slug} />;
}
