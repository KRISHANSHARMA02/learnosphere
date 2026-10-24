import DataTable from "./slugData";
import { getCbsePrevQuePpr } from "@/src/lib/actions/sample_papers_data_fetch";

export default async function CbsePYQ({ params }) {
  const { slug } = await params;
  if (!slug) return <p>Slug missing</p>;

  const data = await getCbsePrevQuePpr(slug);

  if (!data || data.length === 0) return <p>No Previous year papers found</p>;
   
  return <DataTable data={data} slug={slug} />;

}