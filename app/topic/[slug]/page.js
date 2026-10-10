import TopicClient from "@/components/TopicClient";
import { notFound } from "next/navigation";
import { getImportantTopics } from "@/src/lib/actions/sample_papers_data_fetch";

export default async function Page({ params }) {
  const { slug } = await params;

  // SERVER-SIDE FETCH
  const data = await getImportantTopics(slug);

  // If no data → 404
  if (!data) return notFound();

  return <TopicClient slug={slug} initialData={data} />;
}