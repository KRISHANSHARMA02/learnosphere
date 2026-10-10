import ResourcePage from "./ResourcePage";

export default async function CbseResourcePage({ params }) {
  const { slug } = await params;
  if (!slug) return <p>Resource not found</p>;
  return <ResourcePage slug={slug} />;
}
