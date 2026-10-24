import { notFound } from "next/navigation";
import ResourcePage from "./ResourcePage";
import { validateCbseResourceSlug, getResourceContent } from "./resourceData";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!slug) return { title: "Page Not Found | Learnosphere" };

  const isValid = await validateCbseResourceSlug(slug);
  if (!isValid) {
    return {
      title: "Page Not Found | Learnosphere",
      robots: { index: false, follow: false },
    };
  }

  const content = getResourceContent(slug);
  if (!content) {
    return {
      title: "Page Not Found | Learnosphere",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${content.title} | Learnosphere`,
    description: content.description?.[0] || `Comprehensive CBSE resources for ${content.title}.`,
  };
}

export default async function CbseResourcePage({ params }) {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }

  const isValid = await validateCbseResourceSlug(slug);
  if (!isValid) {
    notFound();
  }

  const content = getResourceContent(slug);
  if (!content) {
    notFound();
  }

  return <ResourcePage slug={slug} initialContent={content} />;
}
